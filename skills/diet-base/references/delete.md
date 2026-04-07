# +delete

用于按记录 ID 删除饮食记录。

## 命令模板

```bash
diet delete <id>
```

## 示例

```bash
diet delete 12
```

## 输出行为

- 删除成功：`Record #<id> deleted`
- 记录不存在：`Record #<id> not found`

## 使用建议

- 删除前可先用 `+search` 确认目标记录 ID
- 批量删除时串行执行，避免并发写入冲突
