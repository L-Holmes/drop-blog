import { getCollection, type CollectionEntry } from 'astro:content';
import { LOCALES, type Locale } from '../consts';

export type Post = {
  category: string;
  slug: string;
  locale: Locale;
  entry: CollectionEntry<'blog'>;
};

// Turn each file path (recipes/banana-bread/en) into structured info.
export async function getPosts(): Promise<Post[]> {
  const entries = await getCollection('blog');
  const posts = entries
    .map((entry) => {
      const parts = entry.id.replace(/\.md$/, '').split('/');
      const locale = parts.pop() as Locale;
      const slug = parts.pop() as string;
      const category = parts.join('/');
      return { category, slug, locale, entry };
    })
    .filter((p) => (LOCALES as readonly string[]).includes(p.locale));

  // Forced honesty: a post marked `type: review` MUST carry the fields that
  // make a review trustworthy. Missing any of them fails the build.
  const errors: string[] = [];
  for (const p of posts) {
    const d = p.entry.data;
    if (d.type !== 'review') continue;
    const where = `${p.category}/${p.slug}/${p.locale}`;
    if (!d.updated) errors.push(`${where}: review needs an "updated" date`);
    if (!d.tested) errors.push(`${where}: review needs "tested" (how you tested it)`);
    if (d.rating === undefined) errors.push(`${where}: review needs a "rating" (0–5)`);
    if (!d.weakerThan) errors.push(`${where}: review needs "weakerThan" (where others do it better)`);
    if (!d.missed) errors.push(`${where}: review needs "missed" (what you didn't test / may have got wrong)`);
    if (!d.pros || d.pros.length < 1) errors.push(`${where}: review needs at least 1 item in "pros"`);
    if (!d.cons || d.cons.length < 2) errors.push(`${where}: review needs at least 2 honest items in "cons"`);
  }
  if (errors.length) {
    throw new Error('Review checklist not met:\n  - ' + errors.join('\n  - '));
  }

  return posts;
}

export type InfoPage = {
  slug: string;
  locale: Locale;
  order: number;
  entry: CollectionEntry<'info'>;
};

// Info / legal pages live at: src/content/info/<slug>/<locale>.md
export async function getInfo(): Promise<InfoPage[]> {
  const entries = await getCollection('info');
  return entries
    .map((entry) => {
      const parts = entry.id.replace(/\.md$/, '').split('/');
      const locale = parts.pop() as Locale;
      const slug = parts.join('/');
      return { slug, locale, order: entry.data.order ?? 99, entry };
    })
    .filter((p) => (LOCALES as readonly string[]).includes(p.locale))
    .sort((a, b) => a.order - b.order);
}
