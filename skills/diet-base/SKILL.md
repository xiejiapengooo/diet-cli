---
name: diet-base
version: 0.0.1
description: ""
metadata:
  requires:
    bins: ["diet"]
---

# diet-cli 使用工作流（已安装 CLI）

该 Skill 用于让 AI agent 通过用户已安装的 `diet` 命令完成日常记录和检索。

## 适用场景

- 用户说："帮我记录今天午饭/晚饭"
- 用户说："查一下这几天吃过什么"
- 用户说："用 diet 命令添加一条零食"
- 用户说："按晚餐和日期范围筛选记录"

## 执行原则

1. 默认使用已安装命令：`diet ...`
2. 执行前先用 `diet --help` 或 `diet add --help` 快速确认命令可用
3. 先写后查时串行执行，避免 SQLite `database is locked`

## Shortcuts

- [`+install`](./references/install.md) - 用户安装与命令可用性检查
- [`+add`](./references/add.md) - 新增饮食记录（四类餐别）
- [`+search`](./references/search.md) - 按关键词/餐别/时间范围检索记录
- [`+db`](./references/db.md) - 定位和检查本地 SQLite 数据库
- [`+message`](./references/message.md) - 收集用户饮食信息，并规范输出

## 标准流程

### Step 1: 确认已安装命令

按 [`+install`](./references/install.md) 执行，确保 `diet --help` 可输出完整命令。

### Step 2: 执行用户任务

- 收集用户饮食信息：走 [`+message`](./references/message.md)
- 记录饮食：走 [`+add`](./references/add.md)
- 查历史记录：走 [`+search`](./references/search.md)
- 看数据文件：走 [`+db`](./references/db.md)

## 输出约定

- 对写入结果给出简短确认：新增餐别、时间、食物、记录 ID
- 对检索结果优先展示原始表格；如无结果，明确输出 `No matched records.`
- 若用户使用相对时间，在最终回复里补充本次执行用到的绝对时间字符串
