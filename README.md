# diet-cli

一个基于 `oclif` + `TypeScript` + `better-sqlite3` 的命令行工具，用来记录每日饮食并按关键词检索历史记录。

## 功能

- 记录 4 类饮食：`breakfast`、`lunch`、`dinner`、`snack`
- 保存每条记录的时间、标题、食物和三大营养素（以及热量）
- 支持按关键词检索，且可按餐别/时间范围过滤
- 本地 SQLite 持久化，无需额外服务

## 环境要求

- Node.js `>= 18`
- npm（或兼容的包管理器）

## 快速开始（本地开发）

```bash
npm install
npm run build
```

运行 CLI：

```bash
node bin/run.js --help
```

开发模式（直接跑 TypeScript）：

```bash
node bin/dev.js --help
```

## 安装为全局命令（可选）

如果已发布到 npm：

```bash
npm i -g @xiejiapeng/diet-cli
diet --help
```

如果你在本地联调，也可以在仓库里执行：

```bash
npm link
diet --help
```

## 命令用法

### 1) 新增饮食记录

4 个命令共享同一套参数：

- `diet add:breakfast FOOD`
- `diet add:lunch FOOD`
- `diet add:dinner FOOD`
- `diet add:snack FOOD`

必填 flags：

- `--title`：记录标题
- `--at`：进食时间（例如 `"2026-03-31 12:30"`）
- `--calories`：热量（kcal，整数，`>= 0`）
- `--protein`：蛋白质（g，整数，`>= 0`）
- `--carbs`：碳水（g，整数，`>= 0`）
- `--fat`：脂肪（g，整数，`>= 0`）

示例：

```bash
diet add:breakfast "oatmeal" \
  --title "Oatmeal with banana" \
  --at "2026-03-31 08:00" \
  --calories 420 \
  --protein 18 \
  --carbs 62 \
  --fat 11
```

### 2) 搜索饮食记录

```bash
diet search KEYWORD [--meal breakfast|lunch|dinner|snack] [--from "..."] [--to "..."]
```

- `KEYWORD`：在 `title` 或 `food` 中模糊匹配（不区分大小写）
- `--meal`：按餐别过滤
- `--from`：起始时间（包含边界）
- `--to`：结束时间（包含边界）

示例：

```bash
diet search "beef"
diet search "salmon" --meal dinner --from "2026-03-30 00:00" --to "2026-03-31 23:59"
```

## 项目脚本

- `npm run build`：清理并编译到 `dist`
- `npm run prepack`：生成 oclif manifest + README
- `npm run postpack`：删除 `oclif.manifest.json`

## 技术栈

- `TypeScript`
- `oclif`
- `better-sqlite3`

## License

MIT
