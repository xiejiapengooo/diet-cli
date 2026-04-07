# +timezone

用于初始化或更新用户时区。

说明：统一使用已安装的 `diet` 命令。

## 命令模板

```bash
diet user:timezone "Asia/Shanghai"
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
