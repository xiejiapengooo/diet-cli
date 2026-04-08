# +search

用于检索饮食记录；可按关键词检索，也可按餐别和时间范围过滤。

## 命令模板

```bash
diet search "<keyword>" \
  [--meal breakfast|lunch|dinner|snack] \
  [--from "YYYY-MM-DD HH:mm"] \
  [--to "YYYY-MM-DD HH:mm"]

diet search \
  [--meal breakfast|lunch|dinner|snack] \
  [--from "YYYY-MM-DD HH:mm"] \
  [--to "YYYY-MM-DD HH:mm"]
```

## 示例

```bash
diet search "beef"
diet search --from "2026-04-07 00:00" --to "2026-04-07 23:59"
diet search "salmon" --meal dinner --from "2026-03-30 00:00" --to "2026-03-31 23:59"
```

## 过滤策略

- 关键词仅匹配 `foods` 字段（`LIKE ... COLLATE NOCASE`）
- 若不传任何过滤条件（不传 keyword、meal、from、to），会返回全部记录
- `--from` 和 `--to` 是包含边界的时间过滤
- 结果按 `eat_at DESC` 倒序输出
- 执行前必须已设置用户时区（命令会读取 `user.json`）

## 输出行为

- 有结果：输出 ASCII 表格，列包括 `id/meal/eat_at/foods/kcal/P(g)/C(g)/F(g)`
- 无结果：输出 `No matched records.`

## 注意事项

- `--from` 或 `--to` 时间格式不合法会报错：
  - `--from must be a valid datetime, e.g. "2026-03-31 12:30"`
  - `--to must be a valid datetime, e.g. "2026-03-31 12:30"`
