# +timezone

用于初始化或更新用户时区。`add` 和 `search` 在当前实现中都依赖该配置。

说明：`$DIET_CMD` 来自 `+install`，实际可替换为 `diet` 或 `node bin/run.js`。

## 命令模板

```bash
$DIET_CMD user:timezone "Asia/Shanghai"
```

## 何时执行

- 首次使用 `add` / `search` 前
- 用户明确更换时区
- 出现以下报错时：
  - `Set user timezone first, e.g. diet user:timezone "Asia/Shanghai".`
  - `invalid user timezone "...". Please run user:timezone again.`

## 快速检查

```bash
DATA_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/diet"
cat "$DATA_DIR/user.json"
```

期望格式：

```json
{
  "timezone": "Asia/Shanghai"
}
```
