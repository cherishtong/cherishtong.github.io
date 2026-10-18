import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { satteriKatex } from './src/lib/markdown/satteri-katex';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://cherishtong.github.io',
  output: 'static',
  trailingSlash: 'ignore',
  compressHTML: true,
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: satteri({
      features: {
        math: true,
      },
      // satteri-katex 必须跑在 MDAST 阶段，避免被 Astro 的代码高亮器抢先处理
      mdastPlugins: [satteriKatex()],
    }),
    shikiConfig: {
      theme: 'vitesse-dark',
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
