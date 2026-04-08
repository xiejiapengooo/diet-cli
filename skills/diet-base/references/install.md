# +install

用于确认 `diet` 命令可用。

说明：这里仅做可用性校验，不做版本检查（版本检查请走 [`+check-update`](./check-update.md)）。

## 1) 命令存在性检查

```bash
command -v diet
```

若不存在，则按 [`+check-update`](./check-update.md) 执行安装/修复后再继续。

## 2) 简单可执行校验

```bash
diet --help
```

如果以上命令可执行，说明可以直接进入业务流程。
