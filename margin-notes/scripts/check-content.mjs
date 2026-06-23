// Content check: a friendly reminder tool for review posts.
// Run with: npm run check
// It does NOT fail the build (the build itself enforces required fields).
// It lists reviews, flags stale ones, and reminds you what to re-verify.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'src/content/blog';
const STALE_DAYS = 180;

function walk(dir) {
  let files = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) files = files.concat(walk(p));
    else if (name.endsWith('.md')) files.push(p);
  }
  return files;
}

function field(fm, key) {
  const m = fm.match(new RegExp('^' + key + ':\\s*(.+)$', 'm'));
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
}

const today = new Date();
let reviews = 0;
const notes = [];

for (const file of walk(ROOT)) {
  const text = readFileSync(file, 'utf8');
  const fm = text.split('---')[1] || '';
  if (field(fm, 'type') !== 'review') continue;
  reviews++;

  const updated = field(fm, 'updated') || field(fm, 'date');
  if (!updated) {
    notes.push(`MISSING updated date  ${file}`);
    continue;
  }
  const days = Math.round((today - new Date(updated)) / 86400000);
  if (days > STALE_DAYS) {
    notes.push(`STALE (${days} days)      ${file}`);
  }
}

console.log(`\nChecked ${reviews} review post(s).\n`);
if (notes.length) {
  console.log('Needs attention:');
  for (const n of notes) console.log('  - ' + n);
} else {
  console.log('All reviews are fresh.');
}
console.log('\nBefore re-publishing any review, please re-check:');
console.log('  - prices and whether each option still exists');
console.log('  - that every link in "sources" still opens');
console.log('  - that "weakerThan" and "missed" are still true');
console.log('  - bump the "updated" date once you have\n');
