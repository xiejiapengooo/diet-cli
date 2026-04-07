# +message

用于收集并标准化 `add` 命令所需参数。

说明：`$DIET_CMD` 来自 `+install`，实际可替换为 `diet` 或 `node bin/run.js`。

## 目标字段

`add` 命令必须拿到以下字段：

1. `meal`：`breakfast|lunch|dinner|snack`
2. `foods`：食物文本（可含份量）
3. `at`：绝对时间字符串（`YYYY-MM-DD HH:mm`）
4. `calories`：整数，`>= 0`
5. `protein`：整数，`>= 0`
6. `carbs`：整数，`>= 0`
7. `fat`：整数，`>= 0`

## 对话策略

- 一次最多问 1 到 2 个问题，优先补缺失必填项
- 已提供信息不重复问
- 能从上下文推断就不问
- 涉及“今天/昨天/明天”等相对时间，必须转换为绝对时间

## 自动推断规则

`时间 -> meal`

- `06:00-10:59` -> `breakfast`
- `11:00-14:59` -> `lunch`
- `17:00-21:59` -> `dinner`
- 其他 -> `snack`

`默认值`

- 若用户没给时间：使用会话当前时间并对齐到分钟
- 若用户没给份量：写成常见份量（如 `1 bowl` / `1 cup` / `100g`）

## 时间规则（必须）

1. 先用用户时区解释时间词（若未明确，使用会话时区）
2. 生成绝对时间字符串给 `--at`
3. 执行后在回复中回显绝对时间，避免歧义

示例（当前日期：`2026-04-07`）：

- 今天早餐 8 点 -> `2026-04-07 08:00`
- 明天中午 12:30 -> `2026-04-08 12:30`
- 昨晚 7 点 -> `2026-04-06 19:00`

## 输出模板（供 +add 使用）

```text
meal: breakfast
foods: oatmeal(one bowl) + banana(one)
at: 2026-04-07 08:00
calories: 420
protein: 18
carbs: 62
fat: 11
```

## 组装命令

```bash
$DIET_CMD add \
  --meal "<meal>" \
  --foods "<foods>" \
  --at "<at>" \
  --calories <calories> \
  --protein <protein> \
  --carbs <carbs> \
  --fat <fat>
```
