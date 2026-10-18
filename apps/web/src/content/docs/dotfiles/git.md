---
title: Git 配置
description: 常用别名、默认分支、提交前的几个小检查。
section: dotfiles
order: 2
updatedDate: 2026-10-01
---

## 基础配置

```bash
git config --global init.defaultBranch main
git config --global pull.rebase true
git config --global fetch.prune true
git config --global diff.algorithm histogram
```

## 常用别名

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.lg "log --oneline --graph --decorate --all"
git config --global alias.last "log -1 HEAD --stat"
```

## 提交前

我习惯在提交前跑一遍：

```bash
pnpm check
pnpm build
git diff --check
```

如果是文档站，再本地打开构建产物看一眼。能自动化的交给 CI，不能自动化的用眼睛。

## 关于分支

个人站这种项目，`master` 保持可部署，重构放到单独分支；旧版本打 tag，不靠记忆回滚。这次从 dashboard 重构成现在这个样子，旧站就留在 `legacy` tag 里。
