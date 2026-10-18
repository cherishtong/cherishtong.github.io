---
title: 终端：Alacritty 与 mintty
description: Linux / macOS 用 Alacritty，Windows 用 mintty；两套终端共用 Matrix Green 主题与 Cascadia Mono。
section: 终端
order: 2
updatedDate: 2026-10-19
---

赵无为的终端分成两条线：

- **Linux / macOS：Alacritty 0.17+**
- **Windows：mintty（MSYS2 原生终端）**

两边都使用 **Cascadia Mono**，默认主题都是 **Matrix Green**，并通过 fish 的 `theme` 命令一起切换。

## Alacritty（Linux / macOS）

源码在 `~/.dot/alacritty`，实际读取 `${XDG_CONFIG_HOME:-~/.config}/alacritty/`。

```text
~/.dot/alacritty/
├─ alacritty.toml
├─ themes/
│  ├─ current.toml
│  ├─ matrix-green.toml
│  └─ gruvbox-light.toml
├─ install.sh
└─ README.md
```

设计取向：

- 不写死 Shell，使用平台默认 `$SHELL`；
- 字体 Cascadia Mono，字号 11.5；
- 无内边距，`opacity = 0.92`；
- OSC 52 只允许写剪贴板，不允许读；
- 光标为细线、不闪烁，和 VS Code 保持一致；
- 主题由 `themes/current.toml` 导入，`theme` 命令负责更新。

安装：

```bash
sh ~/.dot/alacritty/install.sh
sh ~/.dot/alacritty/install.sh --force   # 已有配置时先备份
```

脚本会用 `alacritty migrate --dry-run` 校验配置，检查 Cascadia Mono，创建软链接，并把旧配置备份为 `alacritty.bak-时间戳`。

常用快捷键：

| 操作        | 键                              |
| ----------- | ------------------------------- |
| 复制 / 粘贴 | `Ctrl+Shift+C` / `Ctrl+Shift+V` |
| 搜索        | `Ctrl+Shift+F` / `Ctrl+Shift+B` |
| 字号        | `Ctrl+=` / `Ctrl+-` / `Ctrl+0`  |
| Vi 模式     | `Ctrl+Shift+Space`              |
| 新窗口      | `Ctrl+Shift+N`                  |
| 清空历史    | `Ctrl+Shift+K`                  |

## mintty（Windows）

Windows 下 tmux / fish 的中文输入走 mintty。原因是 mintty 是 MSYS2 原生终端，不走 ConPTY。

```text
~/.dot/mintty/
├─ config
├─ install.ps1
└─ README.md
```

配置要点：

- 字体 Cascadia Mono 12；
- 背景 `#050805`，正文 `#00e676`，光标 `#00ff41`；
- 16 色与 Alacritty 的 Matrix Green 一致；
- 竖线光标、不闪烁、50000 行回滚、120×32；
- `Term=xterm-256color`。

安装：

```powershell
powershell -ExecutionPolicy Bypass -File "$HOME\.dot\mintty\install.ps1"
powershell -ExecutionPolicy Bypass -File "$HOME\.dot\mintty\install.ps1" -Force
```

脚本会链接配置，并在开始菜单创建 **tmux (mintty)** 快捷方式：

```text
C:\msys64\usr\bin\mintty.exe -c C:\Users\Administrator\.dot\mintty\config -e /usr/bin/tmux new -A -s main
```

会话名用 ASCII 的 `main`，避免中文经过 Windows 命令行传参时出现 GBK 乱码；进入 tmux 后再改成中文：

```bash
tmux rename-session 工作
```

## 两边怎么选

| 场景                                 | 选择                        |
| ------------------------------------ | --------------------------- |
| Linux / macOS 日常终端               | Alacritty                   |
| Windows 下跑 tmux / fish / 中文输入  | mintty                      |
| Windows 原生程序（PowerShell / CMD） | 系统自带控制台              |
| 想在 Windows 用 ConPTY 终端跑 tmux   | 改用 WSL，不要用 MSYS2 tmux |

## 排障

- **Alacritty 配置语法**：`alacritty migrate --dry-run --config-file ~/.dot/alacritty/alacritty.toml`
- **字体没生效**：确认 Cascadia Mono 已安装，重启终端；字体和 Shell 不会热加载。
- **主题没变**：确认 `themes/current.toml` 存在，执行 `theme matrix-green` 或重启 Alacritty。
- **Windows 中文输入丢失**：确认用的是 `C:\msys64\usr\bin\mintty.exe`，不要用 Git for Windows 自带的 mintty。
- **透明太重**：把 `alacritty.toml` 里的 `opacity` 改成 `1.0`。
