---
title: 编辑器与终端
description: Neovim、VS Code、Windows Terminal 和一点字体设置。
section: 工具
order: 1
updatedDate: 2026-10-01
---

## Neovim

日常写 Markdown 和改配置用 Neovim，插件尽量少：

- `telescope.nvim`：找文件、搜内容
- `nvim-treesitter`：语法高亮
- `mason.nvim`：LSP 和格式化
- `oil.nvim`：像编辑文本一样管理文件
- `which-key.nvim`：忘了快捷键时救急

主题用偏暖的深色，和网站的玄墨底接近。

## VS Code

写前端项目时还是会开 VS Code，主要是调试和 DevTools 方便。常用设置：

```json
{
  "editor.fontFamily": "'JetBrains Mono', 'Cascadia Code', Consolas, monospace",
  "editor.fontLigatures": true,
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "files.eol": "\n"
}
```

## 终端

Windows 上用 Windows Terminal + PowerShell 7 / Git Bash，字体用 JetBrains Mono。中英混排时等宽字体的中文回退很重要，否则行高会跳。

```json
{
  "profiles": {
    "defaults": {
      "font": {
        "face": "JetBrains Mono",
        "size": 11
      },
      "opacity": 96
    }
  }
}
```

## 一点偏好

- 能键盘完成的事情不碰鼠标
- 主题只留一套亮色、一套暗色
- 终端透明度不要低于 90%，否则看日志很累
- 配置文件进 Git，但密钥不进
