---
title: 安装、同步与排障
description: 修改 dotfiles 的工作流、各平台安装命令、校验方式与安全约定。
category: 赵无为配置
group: 维护
order: 7
updatedDate: 2026-10-19
---

## 编辑工作流

1. 修改 `~/.dot/<app>/` 里的源文件，不要直接改 `%APPDATA%`、`~/.config` 里的链接文件。
2. 运行对应平台的安装脚本，让链接 / 生成文件更新。
3. 重新加载或重启应用。
4. 机器专用的值写进本机覆盖文件或安装脚本，不要硬编码进跨平台主配置。

## 安装命令

| 应用      | Windows                | Linux / macOS          |
| --------- | ---------------------- | ---------------------- |
| fish      | `fish\install.ps1`     | `fish/install.sh`      |
| tmux      | `tmux\install.ps1`     | `tmux/install.sh`      |
| mintty    | `mintty\install.ps1`   | —                      |
| Alacritty | —                      | `alacritty/install.sh` |
| VS Code   | `vscode\install.ps1`   | `vscode/install.sh`    |
| OpenCode  | `opencode\install.ps1` | `opencode/install.sh`  |

Windows 通用写法：

```powershell
powershell -ExecutionPolicy Bypass -File "$HOME\.dot\<app>\install.ps1"
```

Linux / macOS：

```bash
sh ~/.dot/<app>/install.sh
```

已有自己的配置时加 `-Force` / `--force`，脚本会先备份再替换。

## 校验

```bash
# Alacritty
alacritty migrate --dry-run --config-file ~/.dot/alacritty/alacritty.toml

# tmux
tmux -L dot-test -f ~/.dot/tmux/tmux.conf new-session -d
tmux -L dot-test kill-server

# fish
fish -n ~/.dot/fish/config.fish

# shell 脚本
sh -n ~/.dot/<app>/install.sh
```

Windows 下校验 JSON / PowerShell：

```powershell
Get-Content -Raw .\vscode\settings.json | ConvertFrom-Json

[System.Management.Automation.Language.Parser]::ParseFile(
  "$PWD\vscode\install.ps1", [ref]$null, [ref]$errors)
```

## 新机器检查清单

1. 安装 MSYS2（Windows）或 Alacritty / fish（Linux / macOS）。
2. Clone `~/.dot`。
3. 运行对应应用的安装脚本。
4. Windows：确认 mintty 快捷方式、tmux 的 MSYS2 home、VS Code 的 fish profile。
5. 检查主题：`theme matrix-green`，确认 fish / Alacritty 颜色一致。
6. 检查字体：Cascadia Mono 是否安装。
7. 检查中文输入：Windows 下用 mintty 打开 tmux，输入中文验证。
8. 检查 VS Code：设置是否为链接文件，扩展是否安装。

## 主题一致性

- Alacritty：`alacritty/themes/current.toml`
- fish：`fish/themes/current.fish`
- tmux 状态栏：`tmux/tmux.conf` 里的 Matrix Green 色值
- VS Code：Vitesse Black
- OpenCode：内置 `matrix`

Matrix Green 的色值以 `alacritty/themes/matrix-green.toml` 为准：

| 元素 | 色值      |
| ---- | --------- |
| 背景 | `#050805` |
| 正文 | `#00e676` |
| 命令 | `#00ff41` |
| 路径 | `#00ffd5` |
| 参数 | `#e5ff5b` |
| 注释 | `#008f11` |
| 错误 | `#ff5555` |
| 选区 | `#003b12` |

## 约定与安全

- 配置文件 UTF-8；`.sh`、`.fish`、`.toml`、`.json`、`.jsonc` 用 LF，`.ps1` 用 CRLF。
- 不提交 secrets、SSH 私钥、token、cookie。
- 不提交机器专用的 `local.*` 文件和备份文件。
- 安装脚本必须幂等；目标已存在且不是本仓库创建的内容时，先备份再替换。
- 文档使用中文；新增应用目录必须带 `README.md`。
- Git 分支 `main`，提交信息使用 conventional commits，例如 `feat(tmux): ...`、`fix(mintty): ...`。
- 不 force push，除非明确要求。

## 常见问题

- **配置改了没生效**：确认应用读取的是链接文件；Windows 上 VS Code / OpenCode 可能把链接替换成普通文件，重跑安装脚本。
- **Windows 中文输入丢失**：用 mintty，不要用 ConPTY 类终端跑 MSYS2 tmux。
- **`C:\Users\...` 出现在 tmux 状态栏**：关闭自动重命名，手动 `tmux rename-window`。
- **OpenCode 滚轮不工作**：用键盘滚动，或改用 mintty + tmux。
- **VS Code 云同步覆盖本地设置**：按「Settings Sync」页面的方案 A 处理，让 dotfiles 作为源头。
