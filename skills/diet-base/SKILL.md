---
name: diet-base
version: 0.1.0
description: "基于 diet 命令，完成时区设置与饮食记录增删查，实现日常饮食记录与检索"
metadata:
  requires:
    bins: ["diet"]
---

# diet-cli 使用

该 Skill 用于让 AI agent 通过已安装的 `diet` 命令完成日常饮食记录与检索。

## 适用场景

- 用户说："帮我记录今天午饭/晚饭"
- 用户说："查一下这几天吃过什么"
- 用户说："删掉某条错误记录"
- 用户说："用 diet 命令添加一条零食"
- 用户说："按晚餐和日期范围筛选记录"

## 执行原则

1. 先按 [`+check-update`](./references/check-update.md) 检查 `diet` 版本
2. 若版本不一致，先尝试自动安装目标版本；若安装失败、npm 无对应版本或安装后仍不一致，则立即停止并告知用户
3. 版本检查通过后按 [`+install`](./references/install.md) 检查 `diet` 命令可用
4. `add` / `search` 依赖用户时区配置；首次执行前先走 [`+timezone`](./references/timezone.md)
5. 写后读串行执行，避免 SQLite `database is locked`

## 命令面向

- `add`：`--meal --foods --at --calories --protein --carbs --fat`
- `search`：`search [KEYWORD] [--meal] [--from] [--to]`
- `delete`：`delete ID`
- `user:timezone`：`user:timezone "Asia/Shanghai"`

## Shortcuts（按推荐顺序）

- [`+check-update`](./references/check-update.md) - 校验版本并尝试自动安装；失败则停止并提示
- [`+install`](./references/install.md) - 用户安装与命令可用性检查
- [`+timezone`](./references/timezone.md) - 初始化或更新用户时区
- [`+message`](./references/message.md) - 收集用户饮食信息并生成参数
- [`+add`](./references/add.md) - 新增饮食记录（四类餐别）
- [`+search`](./references/search.md) - 按关键词/餐别/时间范围检索记录（关键词可省略）
- [`+delete`](./references/delete.md) - 按记录 ID 删除
- [`+db`](./references/db.md) - 定位和检查本地 SQLite 数据库

## 标准流程

### Step 1: 解析可执行命令

先按 [`+check-update`](./references/check-update.md) 检查版本：不一致先尝试自动安装，若失败则停止并告知用户；通过后再按 [`+install`](./references/install.md) 确认 `diet` 可直接调用。

### Step 2: 确认时区配置

首次使用或时区变化时，按 [`+timezone`](./references/timezone.md) 执行。

### Step 3: 执行用户任务

- 收集用户饮食信息：走 [`+message`](./references/message.md)
- 记录饮食：走 [`+add`](./references/add.md)
- 查历史记录：走 [`+search`](./references/search.md)
- 删除记录：走 [`+delete`](./references/delete.md)
- 看数据文件：走 [`+db`](./references/db.md)

## 输出约定

- 将结果以可阅读的形式向用户回报。
