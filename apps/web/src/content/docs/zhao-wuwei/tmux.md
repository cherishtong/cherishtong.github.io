---
title: tmux
description: 跨平台 tmux：真彩色、鼠标、扩展键、fish 默认 shell 与 Matrix Green 状态栏。
section: 终端
order: 4
updatedDate: 2026-10-19
---

tmux 配置在 `~/.dot/tmux/tmux.conf`，Windows 通过 MSYS2 / Cygwin 使用，Linux / macOS 原生可用。

## 主要设置

- `default-terminal tmux-256color` + RGB：保留真彩色
- `mouse on`：选中 pane、点击 OpenCode 界面、滚轮滚动
- `history-limit 50000`：加大回滚
- `escape-time 10`：减少 Escape / Alt 延迟
- `extended-keys on` + `terminal-features extkeys`：转发 Ctrl+Shift / Alt，OpenCode 的 Shift+Enter 需要
- `set-clipboard on` + `allow-passthrough on`：OSC 52 复制、OpenCode / Neovim 兼容
- 默认 shell 优先 fish：`/usr/bin/fish`、`/opt/homebrew/bin/fish`、`/usr/local/bin/fish`
- 状态栏：Matrix Green + 中文（`会话`、窗口列表、时间）
- 关闭自动重命名：Windows 下 `pane_current_command` 可能返回被空格截断的路径

## 安装

Windows（PowerShell）：

```powershell
powershell -ExecutionPolicy Bypass -File "$HOME\.dot\tmux\install.ps1"
powershell -ExecutionPolicy Bypass -File "$HOME\.dot\tmux\install.ps1" -Force
```

Linux / macOS / WSL / MSYS2：

```bash
sh ~/.dot/tmux/install.sh
sh ~/.dot/tmux/install.sh --force
```

脚本会：

1. 把 `tmux.conf` 链接为 `$HOME/.tmux.conf`（无法创建链接时退化为复制）；
2. Windows 脚本还会链接 MSYS2 / Cygwin 自己的 home；
3. 用独立 socket 验证配置；
4. 如果已有 tmux server，立即 `source-file` 生效。

## Windows 上的 MSYS2 home

Windows 没有原生 tmux，tmux 来自 MSYS2 / Cygwin，而它的 `$HOME` 通常不是 `C:\Users\<你>`：

```text
Windows profile : C:\Users\Administrator
MSYS2 home      : C:\msys64\home\Administrator
```

所以 `install.ps1` 会在两个位置都建链接。确认 tmux 实际使用的 home：

```bash
tmux show-environment -g HOME
```

## 立即生效

```bash
tmux source-file ~/.tmux.conf
```

让所有会话都使用新配置（会结束现有会话）：

```bash
tmux kill-server
tmux new -s main
```

验证：

```bash
tmux show-options -g status-style    # bg=#050805,fg=#00e676
tmux show-options -g mouse           # on
tmux show-options -sg extended-keys  # on
tmux show-options -g default-shell   # fish 路径
```

## 快捷键与 OpenCode

OpenCode 默认使用 `Ctrl+X` 作为 leader。如果 OpenCode 里的 `Ctrl+B` 被 tmux 抢走，可以改用 `Ctrl+Space` 作为 tmux 前缀：

```bash
unbind C-b
set -g prefix C-Space
bind C-Space send-prefix
```

## Windows 中文输入

tmux 本身对 UTF-8 是干净的。Windows 下「tmux 里输入不了中文」通常是终端链路的问题：

```text
终端 -> ConPTY -> MSYS2/Cygwin (tmux, fish) -> pane
```

- 终端通过 ConPTY 启动 MSYS2 程序时，Windows IME 提交的文本可能丢失；
- tmux / fish 是 MSYS2 程序，正好落在这条链路上；
- mintty 是 MSYS2 原生终端（不走 ConPTY），所以 IME 正常。

快速定位：

1. **不开 tmux**，在终端里的 fish 里执行：

   ```sh
   cat > /c/msys64/tmp/x.txt
   # 输入中文，Ctrl+C
   hexdump -C /c/msys64/tmp/x.txt
   ```

   如果是空的 → 问题在终端 / MSYS2 层，不是 tmux。

2. **用空 tmux 配置**：
   ```sh
   tmux -L t -f /dev/null new -s t
   ```
   如果这里可以、当前配置不行 → 是 `extended-keys` / `extkeys` 干扰，可以针对性关闭。

可用方案：**mintty + tmux**。用 MSYS2 的 mintty，不要用 Git for Windows 自带的：

```powershell
C:\msys64\usr\bin\mintty.exe -c C:\Users\Administrator\.dot\mintty\config -e /usr/bin/tmux new -A -s main
```

其他方案：WSL2 + tmux（Linux PTY，最稳）；原生 Windows 程序不经过 MSYS2 时 IME 通常正常。
