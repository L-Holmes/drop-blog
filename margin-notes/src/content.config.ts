import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Every blog post is a markdown file at:
//   src/content/blog/<category>/<post>/<locale>.md
// Markdown is rendered by Astro's built-in remark + rehype pipeline
// (the standard, well-maintained markdown toolchain) — no extra libraries.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    // A post should have a picture or, at the very least, an emoji.
    // Use `emoji` for a quick badge, or `image` for a path/URL to a picture.
    emoji: z.string().optional(),
    image: z.string().optional(),

    // Freshness: shown as "Last updated". Falls back to `date` if absent.
    updated: z.coerce.date().optional(),

    // Mark a post as a review to switch on the honest "verdict" template.
    // When type === 'review', the honesty fields below are REQUIRED — the
    // build fails with a clear message if any are missing (see lib/content.ts).
    type: z.enum(['article', 'review']).default('article'),
    rating: z.number().min(0).max(5).optional(),   // out of 5
    tested: z.string().optional(),                 // how we tested (methodology)
    pros: z.array(z.string()).optional(),
    cons: z.array(z.string()).optional(),          // be honest — at least two
    weakerThan: z.string().optional(),             // where others do it better
    missed: z.string().optional(),                 // what we didn't test / may have missed

    // Optional score grid (testers down the side, options across the top).
    scores: z
      .object({
        items: z.array(z.string()),
        rows: z.array(z.object({ label: z.string(), values: z.array(z.number()) })),
        max: z.number().default(5),
      })
      .optional(),

    // Optional real references (articles, papers, official guidance).
    sources: z.array(z.object({ title: z.string(), url: z.string().url() })).optional(),
  }),
});

const info = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/info' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(99),
  }),
});

export const collections = { blog, info };
