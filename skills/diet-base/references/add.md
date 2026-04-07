# +add

用于新增饮食记录（当前实现为单命令 `add --meal ...`）。

说明：`$DIET_CMD` 来自 `+install`，实际可替换为 `diet` 或 `node bin/run.js`。

## 命令模板

```bash
$DIET_CMD add \
  --meal breakfast|lunch|dinner|snack \
  --foods "<food-list>" \
  --at "YYYY-MM-DD HH:mm" \
  --calories <int>=0 \
  --protein <int>=0 \
  --carbs <int>=0 \
  --fat <int>=0
```

## 示例

```bash
$DIET_CMD add \
  --meal breakfast \
  --foods "oatmeal(one bowl) + banana(one)" \
  --at "2026-03-31 08:00" \
  --calories 420 \
  --protein 18 \
  --carbs 62 \
  --fat 11
```

## 参数规则

- `--meal`、`--foods`、`--at`、`--calories`、`--protein`、`--carbs`、`--fat` 全部必填
- `--foods` 去首尾空格后不能为空，否则报错 `--foods cannot be empty`
- 四个营养数字必须 `>= 0`，否则会报错 `--<name> must be >= 0`
- `--at` 需要是合法时间字符串（如 `"2026-03-31 12:30"`）
- 执行前必须已设置用户时区，否则会提示：
  - `Set user timezone first, e.g. diet user:timezone "Asia/Shanghai".`

## 输出解析

成功时输出 JSON，例如：

```json
{
  "id": 12,
  "calories": 420,
  "carbs": 62,
  "fat": 11,
  "protein": 18,
  "create_at": "2026-04-07T09:05:00.000Z",
  "eat_at": "2026-03-31T00:00:00.000Z",
  "foods": "oatmeal(one bowl) + banana(one)",
  "meal_type": "breakfast"
}
```

向用户回报时，至少包含 `id`、`meal_type`、`eat_at`、`foods`。
