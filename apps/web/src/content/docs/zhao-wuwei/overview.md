---
title: 配置总览
description: 赵无为的跨平台 dotfiles：一套配置，Windows、Linux、macOS 共用。
section: 总览
order: 1
updatedDate: 2026-10-19
---

赵无为的 dotfiles 放在 `~/.dot`。Windows、Linux、macOS 共用同一份源文件；每台机器只需要执行一次对应的安装脚本，把配置链接到应用真正读取的位置。

## 平台分工

| 场景               | 方案                        | 说明                                          |
| ------------------ | --------------------------- | --------------------------------------------- |
| Windows 终端       | **mintty + tmux + fish**    | MSYS2 原生终端，中文输入正常                  |
| Linux / macOS 终端 | **Alacritty + tmux + fish** | 跨平台配置，主题由 `themes/current.toml` 提供 |
| 终端复用           | **tmux**                    | Windows 走 MSYS2，Linux / macOS 原生          |
| Windows 原生程序   | 系统自带控制台              | PowerShell / CMD                              |
| 编辑器             | **VS Code**                 | Vitesse Black + Cascadia Mono                 |
| AI 终端            | **OpenCode**                | matrix 主题，键盘滚动                         |

## 为什么 Windows 不用 Alacritty 跑 tmux

Alacritty 在 Windows 上通过 **ConPTY** 启动 MSYS2 / Cygwin 程序，而 ConPTY 不会把 Windows IME 提交的中文正确传给 Cygwin 程序。表现就是：tmux 里输入不了中文。

mintty 是 MSYS2 原生终端，有自己的 PTY，所以 IME 正常。结论：

- Windows 下 tmux / fish 用 **mintty**；
- 不要把 MSYS2 的 tmux 放进 ConPTY 类终端；
- 如果一定要用 ConPTY，把 tmux 放进 **WSL**（Linux PTY）。

## 目录结构

```text
~/.dot/
├─ alacritty/      # Linux / macOS：alacritty.toml + themes/ + install.sh
├─ fish/           # fish：config.fish + themes/ + install.ps1 / install.sh
├─ mintty/         # Windows：mintty config + install.ps1
├─ opencode/       # OpenCode：cli.json + themes/ + install.ps1 / install.sh
├─ tmux/           # tmux：tmux.conf + install.ps1 / install.sh
├─ vscode/         # VS Code：settings.json + install.ps1 / install.sh
├─ README.md
└─ AGENTS.md
```

每个应用目录都有自己的 `README.md`。真正的源文件只放 `~/.dot/<app>/`，安装脚本负责链接或生成到应用实际读取的位置。

## 路径映射

| 应用      | 实际读取                                             | dotfiles 源文件                          |
| --------- | ---------------------------------------------------- | ---------------------------------------- |
| Alacritty | `${XDG_CONFIG_HOME:-~/.config}/alacritty/`           | `~/.dot/alacritty/`                      |
| fish      | `~/.config/fish/config.fish`                         | `~/.dot/fish/config.fish`（通过 loader） |
| mintty    | `%USERPROFILE%\.config\mintty\config`、`~/.minttyrc` | `~/.dot/mintty/config`                   |
| tmux      | `~/.tmux.conf`                                       | `~/.dot/tmux/tmux.conf`                  |
| VS Code   | 平台 User 目录下的 `settings.json`                   | `~/.dot/vscode/settings.json`            |
| OpenCode  | `~/.config/opencode/cli.json`                        | `~/.dot/opencode/cli.json`               |

## 默认主题

当前默认主题是 **Matrix Green**：黑底、荧光绿、青色路径、黄色参数。

| 元素 | 颜色      |
| ---- | --------- |
| 背景 | `#050805` |
| 正文 | `#00e676` |
| 命令 | `#00ff41` |
| 路径 | `#00ffd5` |
| 参数 | `#e5ff5b` |
| 注释 | `#008f11` |
| 错误 | `#ff5555` |
| 选区 | `#003b12` |

在 fish 里执行：

```fish
theme                 # 列出主题
theme matrix-green    # 黑底荧光绿
theme gruvbox-light   # Gruvbox Light
```

`theme` 会同时更新 fish 和 Alacritty 的当前主题，尽量保持两边一致。

## 快速开始

Windows（MSYS2 / Cygwin）：

```powershell
powershell -ExecutionPolicy Bypass -File "$HOME\.dot\fish\install.ps1"
powershell -ExecutionPolicy Bypass -File "$HOME\.dot\tmux\install.ps1"
powershell -ExecutionPolicy Bypass -File "$HOME\.dot\mintty\install.ps1"
powershell -ExecutionPolicy Bypass -File "$HOME\.dot\vscode\install.ps1"
powershell -ExecutionPolicy Bypass -File "$HOME\.dot\opencode\install.ps1"
```

Linux / macOS / WSL：

```bash
sh ~/.dot/fish/install.sh
sh ~/.dot/tmux/install.sh
sh ~/.dot/alacritty/install.sh
sh ~/.dot/vscode/install.sh
sh ~/.dot/opencode/install.sh
```

详细说明见：

- [终端：Alacritty 与 mintty](/docs/zhao-wuwei/terminal/)
- [fish Shell](/docs/zhao-wuwei/fish/)
- [tmux](/docs/zhao-wuwei/tmux/)
- [VS Code](/docs/zhao-wuwei/vscode/)
- [OpenCode](/docs/zhao-wuwei/opencode/)
- [安装、同步与排障](/docs/zhao-wuwei/maintenance/)

## 几条约定

- 修改 `~/.dot/<app>/` 里的源文件，不要直接改 `%APPDATA%` 或 `~/.config` 里的链接文件。
- 安装脚本必须幂等；已有配置会先备份，再替换。
- 机器专用的路径、字体回退、Shell 路径，写进本机覆盖文件或安装脚本，不硬编码进跨平台主配置。
- 不提交 secrets、SSH 私钥、token、cookie、本机内网地址和备份文件。
- 配置统一 UTF-8；`.sh`、`.fish`、`.toml`、`.json`、`.jsonc` 用 LF，`.ps1` 用 CRLF。
