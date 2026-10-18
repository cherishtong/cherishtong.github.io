# 墨纸山河 · Cherish Tong

一个以故宫色谱、书法与山水为底色的个人网站。使用 Astro 7 + pnpm workspace 构建，内容以 Markdown / MDX 为主，并用 React、Vue 做框架示例。

## 技术栈

- **Astro 7**：静态输出，部署到 GitHub Pages
- **pnpm workspace**：monorepo
- **Tailwind CSS 4**：通过 `@tailwindcss/vite` 接入
- **Sätteri + KaTeX**：构建时渲染数学公式
- **Content Collections**：博客、文档、项目
- **Pagefind**：构建后生成静态搜索索引
- **React 19 / Vue 3.5**：Lab 的 islands 示例
- **Shiki**：代码高亮

## 目录结构

```txt
.
├─ apps/
│  └─ web/                       # Astro 站点，唯一部署产物
│     ├─ public/
│     ├─ src/
│     │  ├─ components/
│     │  │  ├─ background/       # 可替换的山水背景组件
│     │  │  ├─ content/          # PostCard
│     │  │  ├─ docs/             # DocsSidebar
│     │  │  ├─ lab/              # React / Vue 示例组件
│     │  │  └─ site/             # Header、Footer、StubPage
│     │  ├─ content/             # blog / docs / projects
│     │  ├─ layouts/             # BaseLayout、DocsLayout
│     │  ├─ lib/markdown/        # 自写 Sätteri KaTeX 插件
│     │  ├─ pages/
│     │  ├─ styles/              # 主题 token 与全局样式
│     │  └─ content.config.ts
│     └─ astro.config.ts
├─ packages/
│  ├─ config/                    # 共享 tsconfig
│  ├─ lab-react/                 # React 示例包（预留）
│  └─ lab-vue/                   # Vue 示例包（预留）
├─ pnpm-workspace.yaml
└─ package.json
```

当前 Lab 页面为了配合 Astro 的框架集成，直接使用 `apps/web/src/components/lab` 下的组件；`packages/lab-*` 保留为后续抽包和独立构建的位置。

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
pnpm build          # Astro 构建 + Pagefind 索引
pnpm preview        # 预览构建结果
pnpm check          # Astro 类型检查
pnpm format         # Prettier 格式化
pnpm format:check   # 检查格式
```

## 页面

| 路由                  | 内容                                       |
| --------------------- | ------------------------------------------ |
| `/`                   | 首页                                       |
| `/blog`               | 博客列表                                   |
| `/blog/[...slug]`     | 博客详情，支持 KaTeX、代码高亮             |
| `/blog/tags/[tag]`    | 标签页                                     |
| `/docs`               | 文档首页                                   |
| `/docs/[...slug]`     | 文档详情，带侧边栏与本页目录               |
| `/projects`           | 项目列表                                   |
| `/projects/[...slug]` | 项目详情                                   |
| `/lab`                | 框架实验室                                 |
| `/lab/react/counter`  | React 19 计数器                            |
| `/lab/vue/counter`    | Vue 3.5 计数器                             |
| `/search`             | Pagefind 搜索（构建后可用）                |
| `/about`              | 关于                                       |
| `/styleguide`         | 风格指南：颜色、字体、组件、文章排版、表单 |
| `/rss.xml`            | RSS                                        |
| `/404`                | 404 页面                                   |

## 主题

主题名为 **墨纸山河 / Ink & Vermilion**。

- 主色：宣纸 `#F3EDE1`、墨色 `#211E1A`、宫墙红 `#8C1F28`
- 辅助色：鎏金 `#B08D57`、石青 `#2F5D62`、石绿 `#4F6B57`、琉璃黄 `#B8862B`
- 正文：思源宋体 17px / 1.95
- 题字与印章：Ma Shan Zheng
- 背景：`apps/web/src/components/background/LandscapeBackdrop.astro`
  - 固定山水层：群山、长城、烽火台、六十四卦、日月、飞鸟、云雾
  - 背景自己的 CSS 变量也在组件内，换背景时整体替换即可

## 搜索

Pagefind 在 `astro build` 之后索引 `dist`。开发模式下 `/search` 会提示构建后再用；生产构建会自动生成：

```txt
apps/web/dist/pagefind/
```

## 部署

推送到 `master` 后，GitHub Actions 会：

1. 安装依赖
2. 构建 `apps/web`（含 Pagefind）
3. 上传 `apps/web/dist`
4. 发布到 GitHub Pages

站点地址：<https://cherishtong.github.io>

## 旧版本

重构前的版本保留在 `legacy` tag，当前新版本在 `rebuild/astro7` 分支上完成。
