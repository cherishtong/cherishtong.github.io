import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
    }),
});

const docs = defineCollection({
  loader: glob({ base: './src/content/docs', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.string().default('文档'),
    group: z.string().default(''),
    order: z.number().default(99),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      stack: z.array(z.string()).default([]),
      repo: z.url().optional(),
      demo: z.string().optional(),
      status: z.enum(['active', 'archived', 'wip']).default('active'),
      period: z.string().optional(),
      featured: z.boolean().default(false),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog, docs, projects };
