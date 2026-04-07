# +install

用于确认本轮应使用哪个命令入口，并验证其功能与当前项目一致。

## 1) 解析命令入口（生成 `DIET_CMD`）

```bash
if [ -f "./bin/run.js" ]; then
  DIET_CMD='node bin/run.js'
elif command -v diet >/dev/null 2>&1; then
  DIET_CMD='diet'
else
  echo "diet command not found"
  exit 1
fi

echo "$DIET_CMD"
```

## 2) 校验命令可用性

```bash
eval "$DIET_CMD --help"
eval "$DIET_CMD add --help"
eval "$DIET_CMD search --help"
eval "$DIET_CMD delete --help"
eval "$DIET_CMD user:timezone --help"
```

如果以上命令都可执行，说明可以直接进入业务流程。

## 3) 识别“旧版全局 diet”并处理

症状：`diet --help` 看不到 `delete` 或 `user:timezone`，或 `add` 不是 `--meal/--foods` 风格。

可选修复：

```bash
npm i -g @xiejiapeng/diet-cli
diet --help
```

如果你就在项目仓库内，优先使用：

```bash
node bin/run.js --help
```
