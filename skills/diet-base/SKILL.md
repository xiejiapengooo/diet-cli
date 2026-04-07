---
name: diet-base
version: 0.1.0
description: "基于 diet-cli 当前实现，完成时区设置与饮食记录增删查。"
metadata:
  requires:
    bins: ["node", "diet"]
---

# diet-cli 使用工作流（项目版 / 安装版兼容）

该 Skill 用于让 AI agent 通过当前项目命令完成日常饮食记录与检索，兼容两种运行方式：

- 项目内运行：`node bin/run.js ...`
- 用户已安装命令：`diet ...`

## 适用场景

- 用户说："帮我记录今天午饭/晚饭"
- 用户说："查一下这几天吃过什么"
- 用户说："删掉某条错误记录"
- 用户说："用 diet 命令添加一条零食"
- 用户说："按晚餐和日期范围筛选记录"

## 执行原则（与当前源码一致）

1. 先按 [`+install`](./references/install.md) 解析本轮 `DIET_CMD`：
   - 优先项目内 `node bin/run.js`
   - 其次 PATH 中的 `diet`
2. `add` / `search` 依赖用户时区配置；首次执行前先走 [`+timezone`](./references/timezone.md)
3. 写后读串行执行，避免 SQLite `database is locked`
4. 所有相对时间词（今天/昨天/明天）都转换为绝对时间字符串再传给命令

## 命令面向

- `add`：`--meal --foods --at --calories --protein --carbs --fat`
- `search`：`search KEYWORD [--meal] [--from] [--to]`
- `delete`：`delete ID`
- `user:timezone`：`user:timezone "Asia/Shanghai"`

## Shortcuts（按推荐顺序）

- [`+install`](./references/install.md) - 用户安装与命令可用性检查
- [`+timezone`](./references/timezone.md) - 初始化或更新用户时区
- [`+message`](./references/message.md) - 收集用户饮食信息并生成参数
- [`+add`](./references/add.md) - 新增饮食记录（四类餐别）
- [`+search`](./references/search.md) - 按关键词/餐别/时间范围检索记录
- [`+delete`](./references/delete.md) - 按记录 ID 删除
- [`+db`](./references/db.md) - 定位和检查本地 SQLite 数据库

## 标准流程

### Step 1: 解析可执行命令

按 [`+install`](./references/install.md) 执行，拿到 `DIET_CMD`。

### Step 2: 确认时区配置

首次使用或时区变化时，按 [`+timezone`](./references/timezone.md) 执行。

### Step 3: 执行用户任务

- 收集用户饮食信息：走 [`+message`](./references/message.md)
- 记录饮食：走 [`+add`](./references/add.md)
- 查历史记录：走 [`+search`](./references/search.md)
- 删除记录：走 [`+delete`](./references/delete.md)
- 看数据文件：走 [`+db`](./references/db.md)

## 输出约定

- 新增成功时优先提取 JSON 输出中的 `id / meal_type / eat_at / foods`
- 检索结果优先保留 CLI 原始表格；无结果时明确 `No matched records.`
- 删除操作明确回显 `Record #<id> deleted` 或 `Record #<id> not found`
- 若使用相对时间，在最终回复里补充本次执行的绝对时间字符串
