import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders'; // 不适用于旧版 API

const wuwei = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/wuwei" }),
  schema: z.object({
    title: z.string()
  }),
});

export const collections = { wuwei };