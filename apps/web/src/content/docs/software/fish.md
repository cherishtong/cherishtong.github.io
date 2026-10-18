---
title: fish 速查
description: fish 的交互功能、常用命令、语法与快捷键速查。
category: 软件
order: 1
updatedDate: 2026-10-19
---

fish 是一个对交互体验很友好的 shell：自动建议、语法高亮、补全、缩写和历史搜索都是内置的。它不完全兼容 POSIX，所以不要把 bash 脚本直接当成 fish 脚本运行。

## 快速开始

```fish
fish --version          # 版本
fish -c 'echo $version' # 执行一条命令
fish_config             # 打开浏览器配置界面
help                    # 打开文档
help set                # 查看 set 的文档
man set                 # man 页
```

## 常用快捷键

默认是 **Emacs 模式**。下表中的 `Ctrl` / `Alt` 在 macOS 上是 `Control` / `Option`。

### 通用

| 快捷键                | 作用                                      |
| --------------------- | ----------------------------------------- |
| `Tab`                 | 补全当前 token；有多个候选时打开 pager    |
| `Shift+Tab`           | 补全并进入 pager 搜索                     |
| `←` / `→`             | 左右移动一个字符；行尾按 `→` 接受自动建议 |
| `Alt+←` / `Alt+→`     | 左右移动一个词；空行时切换目录历史        |
| `Ctrl+←` / `Ctrl+→`   | 左右移动一个 token                        |
| `Shift+←` / `Shift+→` | 按“大词”左右移动                          |
| `↑` / `↓`             | 按当前输入搜索历史                        |
| `Alt+↑` / `Alt+↓`     | 按当前 token 搜索历史                     |
| `Enter`               | 执行；命令不完整时换行                    |
| `Alt+Enter`           | 在光标处插入换行                          |
| `Ctrl+C`              | 中断当前命令                              |
| `Ctrl+D`              | 删除右侧字符；空行时退出 fish             |
| `Ctrl+Z`              | 挂起当前任务                              |
| `Ctrl+L`              | 清屏                                      |
| `Ctrl+U`              | 删除光标到行首                            |
| `Ctrl+K`              | 删除光标到行尾                            |
| `Ctrl+W`              | 删除前一个路径片段                        |
| `Alt+Backspace`       | 删除前一个词                              |
| `Ctrl+Backspace`      | 删除前一个参数                            |
| `Ctrl+X` / `Ctrl+V`   | 复制当前命令行 / 粘贴                     |
| `Ctrl+Space`          | 插入空格，不展开缩写                      |

### 历史、补全与编辑

| 快捷键              | 作用                                                  |
| ------------------- | ----------------------------------------------------- |
| `Ctrl+R`            | 打开历史 pager；再按 `Ctrl+R` 往前翻，`Ctrl+S` 往后翻 |
| `Ctrl+A` / `Ctrl+E` | 行首 / 行尾                                           |
| `Ctrl+B` / `Ctrl+F` | 左 / 右一个字符                                       |
| `Alt+B` / `Alt+F`   | 左 / 右一个词                                         |
| `Ctrl+P` / `Ctrl+N` | 上 / 下一条历史                                       |
| `Ctrl+T`            | 交换光标前两个字符                                    |
| `Alt+T`             | 交换前两个词                                          |
| `Alt+C` / `Alt+U`   | 当前词首字母大写 / 全大写                             |
| `Ctrl+Z` / `Ctrl+_` | 撤销上一次行编辑                                      |
| `Alt+/`             | 重做                                                  |
| `Alt+E` / `Alt+V`   | 用外部编辑器编辑当前命令行                            |
| `Alt+S`             | 在命令前加 `sudo`                                     |
| `Alt+H` / `F1`      | 查看当前命令的 man 页                                 |
| `Alt+L`             | 列出当前目录内容                                      |
| `Alt+O`             | 用 pager 打开光标下的文件                             |
| `Alt+P`             | 把当前命令输出接到 `less`                             |
| `Alt+W`             | 显示光标下命令的简短说明                              |

### Vi 模式

默认不是 Vi 模式。需要时执行：

```fish
fish_vi_key_bindings
```

| 模式     | 常用键                                                                                             |
| -------- | -------------------------------------------------------------------------------------------------- |
| 命令模式 | `h` `l` 左右，`i` / `a` 插入，`v` 可视，`dd` 删行，`D` 删到行尾，`p` 粘贴，`u` 撤销，`Ctrl+R` 重做 |
| 命令模式 | `/` 历史 pager，`gg` / `G` 行首 / 行尾，`:q` 退出                                                  |
| 插入模式 | `Esc` 回命令模式，`Ctrl+N` 接受自动建议                                                            |
| 可视模式 | `h` `j` `k` `l` 扩展选择，`y` 复制，`d` / `x` 剪切，`~` 切换大小写                                 |

切回默认 Emacs 模式：

```fish
fish_default_key_bindings
```

## 常用命令

| 命令                                | 作用                                           |
| ----------------------------------- | ---------------------------------------------- |
| `set -gx NAME value`                | 设置全局导出变量（当前会话）                   |
| `set -U NAME value`                 | 设置 universal 变量（持久化到 fish_variables） |
| `set -e NAME`                       | 删除变量                                       |
| `set -q NAME`                       | 判断变量是否存在                               |
| `abbr -a gco git checkout`          | 添加缩写                                       |
| `abbr -l` / `abbr -e gco`           | 列出 / 删除缩写                                |
| `fish_add_path ~/.local/bin`        | 添加 PATH，自动去重                            |
| `funced name`                       | 交互式编辑函数                                 |
| `funcsave name`                     | 保存函数到 `~/.config/fish/functions/`         |
| `functions -n`                      | 列出所有函数名                                 |
| `history`                           | 查看历史                                       |
| `history search make`               | 搜索历史                                       |
| `history delete --exact make`       | 删除历史条目                                   |
| `math '2 + 2'`                      | 计算表达式                                     |
| `string match -q '*.md' $file`      | 字符串匹配                                     |
| `string replace foo bar $text`      | 字符串替换                                     |
| `string split ',' $text`            | 字符串切分                                     |
| `string join ',' $items`            | 字符串拼接                                     |
| `status is-interactive`             | 是否交互式 shell                               |
| `status current-command`            | 当前前台命令                                   |
| `type ls`                           | 查看命令类型                                   |
| `command -v git`                    | 查看命令路径                                   |
| `fish_key_reader`                   | 查询按键对应的绑定名                           |
| `fish_indent`                       | 格式化 fish 脚本                               |
| `fish_update_completions`           | 更新 man 页补全                                |
| `source ~/.config/fish/config.fish` | 重新加载配置                                   |

## 语法速查

```fish
# 变量
set -l name world
echo "hello $name"

# 命令替换
set files (ls)
echo $files[1]

# 条件执行
command1; and command2
command1; or command2

# 条件
if test -f config.fish
    echo yes
else
    echo no
end

# 循环
for file in *.md
    echo $file
end

while test -n "$name"
    echo $name
    set name ''
end

# 函数
function greet --argument-names name
    echo "hello $name"
end

# switch
switch $argv[1]
    case start
        echo start
    case '*'
        echo other
end
```

## 配置文件

| 路径                                | 用途                                 |
| ----------------------------------- | ------------------------------------ |
| `~/.config/fish/config.fish`        | 主配置                               |
| `~/.config/fish/conf.d/*.fish`      | 分片配置，按文件名顺序加载           |
| `~/.config/fish/functions/*.fish`   | 自动加载的函数                       |
| `~/.config/fish/completions/*.fish` | 命令补全                             |
| `~/.config/fish/fish_variables`     | universal 变量，机器相关，不建议提交 |
| `~/.local/share/fish/fish_history`  | 命令历史                             |

## 常用配置

```fish
# 关闭自动建议
set -g fish_autosuggestion_enabled 0

# 关闭欢迎语
set -g fish_greeting ''

# 每次启动加载主题
if test -f ~/.config/fish/themes/current.fish
    source ~/.config/fish/themes/current.fish
end

# 常用缩写
abbr -a gs 'git status'
abbr -a gd 'git diff'
abbr -a ll 'ls -lah'
```

## 排障

```fish
fish --no-execute ~/.config/fish/config.fish
fish -c 'echo $__fish_config_dir'
fish -c 'echo $fish_key_bindings'
fish_key_reader
```

- 配置没生效：确认 `~/.config/fish/config.fish` 是 loader，指向真正的配置。
- 颜色不对：检查 `fish_color_*` 变量和当前主题。
- 按键冲突：用 `fish_key_reader` 看终端实际发送的序列，再用 `bind` 修改。
