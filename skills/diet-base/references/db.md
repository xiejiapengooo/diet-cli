# +db

用于定位和检查本地 SQLite 数据文件。

## 数据目录

默认数据库路径：

```bash
${XDG_DATA_HOME:-$HOME/.local/share}/diet/diet.db
```

在当前环境可用以下命令快速查看：

```bash
DATA_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/diet"
DB_PATH="$DATA_DIR/diet.db"
echo "$DB_PATH"
```

如用户设置了 `XDG_DATA_HOME`，路径会自动跟随该变量变化。

## 快速检查

```bash
DATA_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/diet"
DB_PATH="$DATA_DIR/diet.db"
ls -la "$DATA_DIR"
sqlite3 "$DB_PATH" ".tables"
sqlite3 "$DB_PATH" "select * from diet order by id desc limit 20;"
```

## 隔离测试（推荐）

为了不污染用户真实数据，可临时指定独立数据目录：

```bash
XDG_DATA_HOME=/tmp/diet-skill-check diet add:snack "nuts" --title "test" --at "2026-04-02 16:00" --calories 180 --protein 6 --carbs 8 --fat 14
XDG_DATA_HOME=/tmp/diet-skill-check diet search "nuts"
```
