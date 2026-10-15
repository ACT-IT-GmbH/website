import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('ACT! IT GmbH'),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    source: z.string().url().optional(),
    lang: z.enum(['de', 'en']).default('de'),
  }),
});

export const collections = { blog };
