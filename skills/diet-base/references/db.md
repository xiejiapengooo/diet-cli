# +db

用于定位和检查本地 SQLite 数据与时区配置文件。

## 数据目录

默认目录：

```bash
${XDG_DATA_HOME:-$HOME/.local/share}/diet
```

默认文件：

```bash
${XDG_DATA_HOME:-$HOME/.local/share}/diet/diet.db
${XDG_DATA_HOME:-$HOME/.local/share}/diet/user.json
```

如用户设置了 `XDG_DATA_HOME`，路径会随之变化。

## 快速检查

```bash
DATA_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/diet"
DB_PATH="$DATA_DIR/diet.db"
USER_CONFIG="$DATA_DIR/user.json"

ls -la "$DATA_DIR"
sqlite3 "$DB_PATH" ".tables"
sqlite3 "$DB_PATH" "select * from diet order by id desc limit 20;"
cat "$USER_CONFIG"
```

## 隔离测试（推荐）

为了不污染真实数据，可临时指定独立目录：

```bash
XDG_DATA_HOME=/tmp/diet-skill-check diet user:timezone "Asia/Shanghai"
XDG_DATA_HOME=/tmp/diet-skill-check diet add --meal snack --foods "nuts(30g)" --at "2026-04-02 16:00" --calories 180 --protein 6 --carbs 8 --fat 14
XDG_DATA_HOME=/tmp/diet-skill-check diet search "nuts"
```
