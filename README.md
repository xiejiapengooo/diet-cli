# diet-cli

一个饮食记录命令行工具，支持本地离线记录和查询每日饮食数据。

## Features

- `diet user:timezone`：设置用户时区（`add/search` 前必需）
- `diet add`：新增饮食记录（早餐/午餐/晚餐/加餐）
- `diet search`：搜索饮食记录
- `diet delete`：按记录 ID 删除记录
- 数据本地存储在 SQLite，不依赖远程服务

## Install

### For Agent

```bash
npx skills add xiejiapengoooo/diet-cli
```

### For Human

```bash
npm i -g @xiejiapeng/diet-cli
```

安装后检查：

```bash
diet --help
```

## Quick Start

1. 设置时区（首次使用必做）：

```bash
diet user:timezone "Asia/Shanghai"
```

2. 添加一条记录：

```bash
diet add \
  --meal breakfast \
  --foods "oatmeal(one bowl) + banana(one)" \
  --at "2026-04-07 08:00" \
  --calories 420 \
  --protein 18 \
  --carbs 62 \
  --fat 11
```

3. 查询记录：

```bash
diet search "banana"
diet search --from "2026-04-07 00:00" --to "2026-04-07 23:59"
diet search "salmon" --meal dinner --from "2026-03-30 00:00" --to "2026-03-31 23:59"
```

4. 删除记录：

```bash
diet delete 12
```

