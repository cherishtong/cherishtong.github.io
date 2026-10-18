---
title: Shell 配置
description: zsh、starship 与一组够用就好的别名。
section: dotfiles
order: 1
updatedDate: 2026-10-01
---

## 为什么用 zsh

不是因为 fish 不好，而是因为大部分服务器上默认只有 bash 或 zsh。把本地环境保持得离服务器近一点，远程排错会少一层心智负担。

```zsh
# ~/.zshrc
export EDITOR=nvim
export VISUAL=nvim

alias ll='ls -lah'
alias gs='git status'
alias gd='git diff'
alias gc='git commit'
alias ..='cd ..'
alias ...='cd ../..'
```

## Starship

提示符用 Starship，配置尽量短：

```toml
# ~/.config/starship.toml
format = """
$directory$git_branch$git_status$nodejs$python$cmd_duration
$character"""

[character]
success_symbol = "[➜](bold #8c1f28)"
error_symbol = "[➜](bold #b91c1c)"
```

颜色用了宫墙红，和这个站的主题是同一套。终端不需要很花，能一眼看出目录、分支和上一条命令的状态就够了。

## 一点习惯

- `Ctrl-R` 搜历史，`fzf` 可选
- 长命令先写在注释里再执行
- 不在 `.zshrc` 里堆业务逻辑，能放脚本就放脚本
- dotfiles 单独一个仓库，安装脚本保持幂等
