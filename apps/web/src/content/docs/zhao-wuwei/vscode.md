---
title: VS Code
description: Vitesse Black 主题、Cascadia Mono 字体、fish 默认终端，以及 dotfiles 与 Settings Sync 的取舍。
section: 编辑器
order: 5
updatedDate: 2026-10-19
---

VS Code 配置在 `~/.dot/vscode/settings.json`，通过安装脚本链接到平台的 User 目录。

## 路径映射

| 平台    | VS Code 读取                                            |
| ------- | ------------------------------------------------------- |
| Windows | `%APPDATA%\Code\User\settings.json`                     |
| Linux   | `${XDG_CONFIG_HOME:-~/.config}/Code/User/settings.json` |
| macOS   | `~/Library/Application Support/Code/User/settings.json` |

## 安装

Windows：

```powershell
powershell -ExecutionPolicy Bypass -File "$HOME\.dot\vscode\install.ps1"
powershell -ExecutionPolicy Bypass -File "$HOME\.dot\vscode\install.ps1" -Force
powershell -ExecutionPolicy Bypass -File "$HOME\.dot\vscode\install.ps1" -Insiders
```

Linux / macOS：

```bash
sh ~/.dot/vscode/install.sh
sh ~/.dot/vscode/install.sh --force
```

脚本会在 `code` 命令可用时安装两个扩展：

- `antfu.theme-vitesse` —— Vitesse Black 主题
- `antfu.icons-carbon` —— Carbon 图标

安装后重启 VS Code，或执行 `Developer: Reload Window`。

## 主要设置

```jsonc
"workbench.colorTheme": "Vitesse Black",
"window.zoomLevel": 1,
"editor.fontFamily": "'Cascadia Mono', 'Cascadia Code', Consolas, monospace",
"editor.fontSize": 13,
"editor.lineHeight": 1.6,
"editor.fontLigatures": false,
"editor.cursorStyle": "line",
"editor.cursorBlinking": "solid",
"editor.minimap.enabled": false,
"files.eol": "\n",
```

- `window.zoomLevel` 的步进是 20%：`1` 比默认大 20%，`-0.5` 比默认小 10%，`0` 是默认。
- 编辑器和终端都用 Cascadia Mono，和 Alacritty 保持一致。
- 关闭 minimap、开启 bracket pair guides，保持界面干净。

## 默认终端

Windows 使用 MSYS2 fish：

```jsonc
"terminal.integrated.profiles.windows": {
  "MSYS2 fish": {
    "path": "C:\\msys64\\usr\\bin\\fish.exe",
    "args": ["-l"],
    "env": {
      "MSYSTEM": "UCRT64",
      "MSYS2_PATH_TYPE": "inherit"
    }
  }
},
"terminal.integrated.defaultProfile.windows": "MSYS2 fish",
```

Linux / macOS 使用名为 `fish` 的 profile。如果 VS Code 从桌面启动时 PATH 里没有 fish，改成绝对路径，例如 `/opt/homebrew/bin/fish`（Apple Silicon）或 `/usr/local/bin/fish`。

## Settings Sync

这台机器登录了 VS Code 账号，而 `settings.json` 又是软链接到 `~/.dot`，所以要先决定「谁是配置的源头」。

### 方案 A（推荐）：dotfiles 作为源头

1. 命令面板执行 `Settings Sync: Configure`
2. 取消勾选 **Settings**（keybindings 如果在 dotfiles 里也取消）
3. 保留 **Extensions**（以及 `UI State`，按需）
4. 执行 `Settings Sync: Sync Now`

这样设置通过 Git 同步 `~/.dot`，VS Code 只负责把扩展同步到其他机器；Windows 专用的 fish 路径也不会被带到 Linux / macOS。

### 方案 B：让云同步接管 settings

1. 断开 `settings.json` 软链接，改成普通文件（先备份 dot 里的版本）
2. 命令面板 → `Settings Sync: Configure` → 勾选 **Settings**
3. `Settings Sync: Sync Now` → 选择 **Merge**，不要选 Replace

代价：`~/.dot/vscode/settings.json` 不再是实际生效的文件，只作为备份。

## 注意

- `settings.json` 是软链接；如果 VS Code 写入时把它替换成了普通文件，重跑安装脚本即可恢复。
- 安装脚本只处理默认 profile；自定义 profile 的设置需要单独链接。
- 中文界面由 `ms-ceintl.vscode-language-pack-zh-hans` 提供，和主题无关。
