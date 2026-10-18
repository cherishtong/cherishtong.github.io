---
title: tmux 速查
description: tmux 的会话、窗口、窗格、复制模式与常用命令速查。
category: 软件
order: 2
updatedDate: 2026-10-19
---

tmux 是终端复用器：一个终端窗口里可以开多个会话、窗口和窗格，断开 SSH 后任务还能继续跑。

默认前缀键是 **`Ctrl+b`**。下文的 `Prefix` 都表示先按 `Ctrl+b`，再按后面的键。

## 会话 Sessions

| 操作                | 命令 / 快捷键                             |
| ------------------- | ----------------------------------------- |
| 新建会话            | `tmux new -s name`                        |
| 新建或接入同名会话  | `tmux new -A -s main`                     |
| 列出会话            | `tmux ls` / `tmux list-sessions`          |
| 接入会话            | `tmux attach -t name` 或 `tmux a -t name` |
| 分离会话            | `Prefix d`                                |
| 重命名会话          | `Prefix $`                                |
| 选择会话            | `Prefix s`                                |
| 上一个 / 下一个会话 | `Prefix (` / `Prefix )`                   |
| 上一个活动会话      | `Prefix L`                                |
| 关闭当前会话        | `Prefix :` 然后 `kill-session`            |
| 关闭指定会话        | `tmux kill-session -t name`               |
| 关闭所有会话        | `tmux kill-server`                        |

## 窗口 Windows

| 操作                   | 快捷键                  |
| ---------------------- | ----------------------- |
| 新建窗口               | `Prefix c`              |
| 重命名窗口             | `Prefix ,`              |
| 关闭窗口               | `Prefix &`              |
| 下一个 / 上一个窗口    | `Prefix n` / `Prefix p` |
| 切换到指定编号         | `Prefix 0` … `Prefix 9` |
| 上一个活动窗口         | `Prefix l`              |
| 列出窗口               | `Prefix w`              |
| 查找窗口               | `Prefix f`              |
| 把当前窗格拆成独立窗口 | `Prefix !`              |
| 移动窗口               | `Prefix .`              |

## 窗格 Panes

| 操作               | 快捷键                              |
| ------------------ | ----------------------------------- |
| 左右拆分           | `Prefix %`                          |
| 上下拆分           | `Prefix "`                          |
| 在窗格间移动       | `Prefix` + 方向键                   |
| 切换到下一个窗格   | `Prefix o`                          |
| 上一个活动窗格     | `Prefix ;`                          |
| 关闭窗格           | `Prefix x`                          |
| 最大化 / 还原窗格  | `Prefix z`                          |
| 显示窗格编号       | `Prefix q`                          |
| 按编号选择窗格     | `Prefix q` 然后按数字               |
| 左右交换窗格       | `Prefix {` / `Prefix }`             |
| 切换布局           | `Prefix Space`                      |
| 调整窗格大小       | `Prefix` + 方向键（按住可连续调整） |
| 把窗格拆成独立窗口 | `Prefix !`                          |

## 复制模式 Copy Mode

| 操作                | 快捷键                                        |
| ------------------- | --------------------------------------------- |
| 进入复制模式        | `Prefix [`                                    |
| 粘贴缓冲区          | `Prefix ]`                                    |
| 开始选择            | `Space`                                       |
| 复制选中内容        | `Enter`                                       |
| 退出复制模式        | `q`                                           |
| 跳到顶部 / 底部     | `g` / `G`                                     |
| 移动光标            | `h` `j` `k` `l`                               |
| 翻页                | `Ctrl+u` / `Ctrl+d`，或 `PageUp` / `PageDown` |
| 向前搜索            | `/`                                           |
| 向后搜索            | `?`                                           |
| 下一个 / 上一个匹配 | `n` / `N`                                     |
| 清除选择            | `Esc`                                         |

## 命令模式与杂项

| 操作           | 快捷键                                     |
| -------------- | ------------------------------------------ |
| 进入命令模式   | `Prefix :`                                 |
| 查看所有快捷键 | `Prefix ?`                                 |
| 显示时间       | `Prefix t`                                 |
| 查看消息       | `Prefix ~`                                 |
| 开启鼠标       | `Prefix :` 然后 `set -g mouse on`          |
| 重载配置       | `Prefix :` 然后 `source-file ~/.tmux.conf` |

## 常用命令

| 命令                                    | 作用                     |
| --------------------------------------- | ------------------------ |
| `tmux new -s name`                      | 新建命名会话             |
| `tmux new -A -s main`                   | 新建或接入 `main`        |
| `tmux ls`                               | 列出会话                 |
| `tmux a -t name`                        | 接入会话                 |
| `tmux kill-session -t name`             | 关闭会话                 |
| `tmux kill-server`                      | 关闭所有会话             |
| `tmux rename-session name`              | 重命名当前会话           |
| `tmux rename-window name`               | 重命名当前窗口           |
| `tmux split-window -h`                  | 左右拆分                 |
| `tmux split-window -v`                  | 上下拆分                 |
| `tmux source-file ~/.tmux.conf`         | 重新加载配置             |
| `tmux show-options -g`                  | 查看全局选项             |
| `tmux set -g mouse on`                  | 开启鼠标                 |
| `tmux list-keys`                        | 列出所有键位             |
| `tmux list-commands`                    | 列出所有命令             |
| `tmux info`                             | 显示会话、窗口、窗格信息 |
| `tmux capture-pane -p`                  | 输出当前窗格可见内容     |
| `tmux send-keys -t name:0.0 'ls' Enter` | 向指定窗格发送按键       |
| `tmux -V`                               | 查看版本                 |

## 配置速查

配置文件：`~/.tmux.conf`。

```text
set -g default-terminal "tmux-256color"
set -ag terminal-overrides ",xterm-256color:RGB"
set -g history-limit 50000
set -g escape-time 10
set -g mouse on
set -g set-clipboard on
set -g allow-passthrough on
set -g extended-keys on
set -as terminal-features "xterm*:extkeys"
set -g status-style "bg=#050805,fg=#00e676"
```

如果 `Ctrl+b` 和 OpenCode 等程序的快捷键冲突，可以把前缀改成 `Ctrl+Space`：

```text
unbind C-b
set -g prefix C-Space
bind C-Space send-prefix
```

修改后重载：

```bash
tmux source-file ~/.tmux.conf
```

如果重载不生效，或者要结束现有会话：

```bash
tmux kill-server
tmux new -s main
```

## 典型工作流

```bash
# 新建或接入主会话
tmux new -A -s main

# 左右拆分，一边写代码一边跑命令
# Prefix %，然后在新窗格里执行
pnpm dev

# 临时最大化当前窗格看日志
# Prefix z

# 断开但不结束任务
# Prefix d

# 回来
tmux a -t main
```

## 验证

```bash
tmux show-options -g status-style
tmux show-options -g mouse
tmux show-options -sg extended-keys
tmux list-keys | head
```

- 状态栏颜色不对：检查 `status-style`。
- 鼠标不能点：确认 `mouse on`。
- 复制不到系统剪贴板：确认终端支持 OSC 52，且 `set-clipboard on`。
- Windows 下中文输入异常：用 mintty 打开 tmux，不要用 ConPTY 类终端跑 MSYS2 的 tmux。
