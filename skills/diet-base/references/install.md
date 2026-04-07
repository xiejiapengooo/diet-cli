# +install

用于确认 `diet` 命令可用。若未安装，自动安装后再继续。

## 1) 未安装则自动安装

```bash
if ! command -v diet >/dev/null 2>&1; then
  npm i -g @xiejiapeng/diet-cli
  hash -r
fi

echo "diet command is ready"
```

## 2) 简单校验

```bash
diet --help
```

如果以上命令可执行，说明可以直接进入业务流程。
