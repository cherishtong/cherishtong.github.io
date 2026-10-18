# 墨纸山河 · Cherish Tong

一个以故宫色谱、书法与山水为底色的个人网站。使用 Astro 7 + pnpm workspace 构建，内容以 Markdown / MDX 为主，后续会加入 React、Vue 等前端框架的实验页面。

## 技术栈

- **Astro 7**：静态输出，部署到 GitHub Pages
- **pnpm workspace**：monorepo
- **Tailwind CSS 4**：通过 `@tailwindcss/vite` 接入
- **Sätteri + KaTeX**：构建时渲染数学公式
- **Content Collections**：博客、文档、项目
- **Pagefind**：站内搜索（后续接入）
- **React / Vue**：前端框架实验室（后续接入）

## 目录结构

```txt
.
├─ apps/
│  └─ web/                  # Astro 站点，唯一部署产物
│     ├─ public/
│     ├─ src/
│     │  ├─ components/
│     │  │  ├─ background/  # 可替换的山水背景组件
│     │  │  └─ site/        # Header、Footer、StubPage
│     │  ├─ content/        # blog / docs / projects
│     │  ├─ layouts/
│     │  ├─ pages/
│     │  ├─ styles/         # 主题 token 与全局样式
│     │  └─ content.config.ts
│     └─ astro.config.ts
├─ packages/
│  └─ config/               # 共享配置
├─ pnpm-workspace.yaml
└─ package.json
```

## 本地开发

需要 Node >= 22.22 和 pnpm 12。

```bash
pnpm install
pnpm dev
```

默认地址：<http://localhost:4321/>

## 常用命令

```bash
pnpm dev            # 启动开发服务器
pnpm build          # 构建到 apps/web/dist
pnpm preview        # 预览构建结果
pnpm check          # Astro 类型检查
pnpm format         # Prettier 格式化
pnpm format:check   # 检查格式
```

## 页面

- `/` 首页
- `/blog` 博客（建设中）
- `/docs` 文档（建设中）
- `/projects` 项目（建设中）
- `/lab` 前端框架实验室（建设中）
- `/about` 关于（建设中）
- `/styleguide` 风格指南：颜色、字体、组件、文章排版、表单
- `/404` 404 页面

## 主题

主题名为 **墨纸山河 / Ink & Vermilion**。

- 主色：宣纸 `#F3EDE1`、墨色 `#211E1A`、宫墙红 `#8C1F28`
- 辅助色：鎏金 `#B08D57`、石青 `#2F5D62`、石绿 `#4F6B57`、琉璃黄 `#B8862B`
- 正文：思源宋体 17px / 1.95
- 题字与印章：Ma Shan Zheng
- 背景：`src/components/background/LandscapeBackdrop.astro`，固定山水层，后续可整体替换

## 部署

推送到 `master` 后，GitHub Actions 会：

1. 安装依赖
2. 构建 `apps/web`
3. 上传 `apps/web/dist`
4. 发布到 GitHub Pages

站点地址：<https://cherishtong.github.io>
