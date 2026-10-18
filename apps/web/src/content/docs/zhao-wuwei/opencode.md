---
title: OpenCode
description: OpenCode CLI 的 matrix 主题、键盘滚动、session sidebar 与配置同步范围。
category: 赵无为配置
group: 编辑器
order: 6
updatedDate: 2026-10-19
---

OpenCode 的 CLI 配置在 `~/.dot/opencode/cli.json`，通过安装脚本链接到 OpenCode 的官方路径。

## 路径映射

| 平台          | OpenCode 读取                                     | 实际文件                   |
| ------------- | ------------------------------------------------- | -------------------------- |
| Windows       | `%USERPROFILE%\.config\opencode\cli.json`         | `~/.dot/opencode/cli.json` |
| Linux / macOS | `${XDG_CONFIG_HOME:-~/.config}/opencode/cli.json` | `~/.dot/opencode/cli.json` |

`themes/` 也会链接到 OpenCode 的 `themes/` 目录。

## 安装

Windows：

```powershell
powershell -ExecutionPolicy Bypass -File "$HOME\.dot\opencode\install.ps1"
powershell -ExecutionPolicy Bypass -File "$HOME\.dot\opencode\install.ps1" -Force
```

Linux / macOS / WSL：

```bash
sh ~/.dot/opencode/install.sh
sh ~/.dot/opencode/install.sh --force
```

脚本会优先创建符号链接；系统不允许时退回硬链接，再不行就复制并提示。

## 当前配置

```json
{
  "$schema": "https://opencode.ai/v2/cli.json",
  "theme": {
    "name": "matrix",
    "mode": "dark"
  },
  "animations": false,
  "session": {
    "scrollbar": true,
    "sidebar": "hide"
  }
}
```

- **matrix**：黑底荧光绿，和终端主题一致；
- **animations: false**：减少 TUI 动画，响应更快；
- **sidebar: hide**：默认隐藏右侧 session sidebar，需要时按 `Ctrl+X` 然后 `B` 切换。

## 键盘滚动

| 操作                  | 键                                          |
| --------------------- | ------------------------------------------- |
| 上 / 下一页           | `PageUp` / `PageDown`，或 `Alt+U` / `Alt+D` |
| 上 / 下半页           | `Ctrl+Alt+U` / `Ctrl+Alt+D`                 |
| 上 / 下一行           | `Alt+K` / `Alt+J`                           |
| 跳到第一条 / 最后一条 | `Home` / `End`，或 `Ctrl+Alt+G`             |

Windows 下经过 ConPTY 的终端（如 Alacritty）里，鼠标滚轮可能传不到 OpenCode 的 TUI；用键盘滚动即可，或者使用 mintty + tmux。

## 主题

当前使用 OpenCode 内置的 `matrix` 主题。切换方式：

```text
/themes
```

或 `Ctrl+P` → **Open settings** → **Theme**。

如果想让 OpenCode 直接采样终端调色板，可以把 `theme.name` 改成 `system`；是否能采样取决于终端是否支持颜色查询，Alacritty 上不保证。

## 什么会被同步

会同步：

- `cli.json`
- `themes/*.json`
- 可选的 `opencode.json` / `opencode.jsonc`（如果以后添加，安装脚本会自动链接）

不会同步：

- `~/.config/opencode/service.json`：后台服务注册信息，属于本机运行时状态
- 登录凭据、会话数据库、缓存
- 项目自己的 `opencode.json` / `.opencode/`

## 注意

- OpenCode 在设置界面修改 `cli.json` 时，如果它用「写临时文件再替换」的方式保存，符号链接 / 硬链接可能会被替换成普通文件。发现改完不同步时，重新执行一次安装脚本。
- 修改 `~/.dot/opencode/cli.json` 后，可以运行 `opencode reload`，或重启 OpenCode。
- `themes/` 里的文件名就是主题名，例如 `themes/matrix-green.json` 会出现在 `/themes` 里。
