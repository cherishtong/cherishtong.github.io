import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from "@astrojs/tailwind";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: 'https://china-zhaotong.github.io',
  integrations: [starlight({
    title: '赵无为',
    customCss: [
    // 你的 Tailwind 基础样式的相对路径
    './src/tailwind.css'],
    defaultLocale: 'root',
    locales: {
      root: {
        label: '简体中文',
        lang: 'zh-CN'
      },
    },
   
    logo: {
      src: './src/assets/logo/logo.svg'
    },
    social: {
      github: 'https://github.com/withastro/starlight'
    },
    sidebar: [{
      label: 'Guides',
      items: [
      // Each item here is one entry in the navigation menu.
      {
        label: 'Example Guide',
        link: '/guides/example/'
      }]
    }, {
      label: 'Reference',
      autogenerate: {
        directory: 'reference'
      }
    }, {
      label: '数据库知识',
      autogenerate: {
        directory: '数据库知识'
      }
    }]
  }), tailwind({
    // 禁用默认的基础样式
    applyBaseStyles: false
  }), vue()]
});