---
title: 墨纸山河
summary: 这个个人站本身：Astro 7 + pnpm monorepo + 故宫色谱 + 一张可替换的山水背景。
stack: [Astro, Tailwind CSS, TypeScript, pnpm]
repo: https://github.com/cherishtong/cherishtong.github.io
demo: /
status: active
period: '2026'
featured: true
---

## 想解决什么

原来的站是一个整页水合的 Vue dashboard，能展示组件，但不像一个可以长期写字的地方。这次把它拆成三件事：

- 内容：博客、文档、项目
- 设计：墨纸山河主题，故宫色谱与书法
- 实验：React / Vue 的框架实验室

## 技术选择

用 Astro 7 的静态输出，内容页尽量不加载框架运行时；需要交互的 Lab 页面再用 islands。数学公式在构建时用 Sätteri + KaTeX 渲染，搜索结果用 Pagefind 在构建后生成索引。

背景是独立的 `LandscapeBackdrop.astro`，里面的山水、长城、六十四卦和日月都可以整体替换。

## 下一步

补完文档和项目详情，加入 Pagefind 搜索、RSS，再把 React 和 Vue 的 Lab 示例放进来。
