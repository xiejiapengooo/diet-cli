# +install

用于确认用户安装版 `diet` CLI 可直接调用。

## 1) 检查命令是否可用

```bash
diet --help
diet add --help
diet search --help
```

如果以上命令可执行，说明 agent 可直接调用该 CLI。

## 2) 命令不可用时（用户侧安装）

```bash
npm i -g @xiejiapeng/diet-cli
diet --help
```
