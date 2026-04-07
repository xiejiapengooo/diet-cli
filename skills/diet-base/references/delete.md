# +delete

用于按记录 ID 删除饮食记录。

说明：`$DIET_CMD` 来自 `+install`，实际可替换为 `diet` 或 `node bin/run.js`。

## 命令模板

```bash
$DIET_CMD delete <id>
```

## 示例

```bash
$DIET_CMD delete 12
```

## 输出行为

- 删除成功：`Record #<id> deleted`
- 删除成功（部分构建版本）：`Deleted record #<id>.`
- 记录不存在：`Record #<id> not found`
- 记录不存在（部分构建版本）：`record #<id> not found`（并以错误退出）

## 使用建议

- 删除前可先用 `+search` 确认目标记录 ID
- 批量删除时串行执行，避免并发写入冲突
