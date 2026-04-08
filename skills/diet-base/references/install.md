# +install

用于确认 `diet` 命令可用。

说明：版本对齐逻辑统一放在 [`+check-update`](./check-update.md)，这里先执行它，再做可用性校验。

## 1) 先对齐版本（自动升级）

按 [`+check-update`](./check-update.md) 执行。

## 2) 简单校验

```bash
diet --help
```

如果以上命令可执行，说明可以直接进入业务流程。
