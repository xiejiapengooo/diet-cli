# +add

用于新增饮食记录。四类命令共享同一套参数：

- `add:breakfast`
- `add:lunch`
- `add:dinner`
- `add:snack`

## 命令模板

```bash
diet add:<meal> "<food>" \
  --title "<title>" \
  --at "YYYY-MM-DD HH:mm" \
  --calories <int>=0 \
  --protein <int>=0 \
  --carbs <int>=0 \
  --fat <int>=0
```

## 示例

```bash
diet add:breakfast "oatmeal" \
  --title "Oatmeal with banana" \
  --at "2026-03-31 08:00" \
  --calories 420 \
  --protein 18 \
  --carbs 62 \
  --fat 11
```

## 参数规则

- `food` 为位置参数，必填
- `--title`、`--at`、`--calories`、`--protein`、`--carbs`、`--fat` 全部必填
- 四个营养数字必须 `>= 0`，否则会报错 `--<name> must be >= 0`
- `--at` 需要是可被 `new Date(...)` 解析的时间字符串

## 输出解析

成功时通常输出：

```text
Added <meal> #<id>
Food: <food>
EatAt: <at>
```

向用户回报时，至少包含 `<meal>`、`<id>`、`Food`、`EatAt`。
