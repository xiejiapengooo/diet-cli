# +timezone

用于检查并按需初始化或更新用户时区。

说明：统一使用已安装的 `diet` 命令。默认策略是先检查用户是否已有时区配置，已有则直接复用，不重复设置；未配置时通过询问用户位置来确定时区。不要把执行环境中的默认时区（如 `Asia/Shanghai`）当作用户时区。

## 执行步骤

1. 先检查用户时区配置：

```bash
DATA_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/diet"
USER_JSON="$DATA_DIR/user.json"
[ -f "$USER_JSON" ] && cat "$USER_JSON" || echo '{}'
```

2. 根据检查结果处理：
   - 若存在有效 `timezone`（例如 `"timezone": "America/Los_Angeles"`），直接继续后续步骤，不重复执行 `user:timezone`。
   - 若不存在、为空，或出现无效时区报错，则先询问用户位置（至少国家+城市；必要时补充州/省），据此确定 IANA 时区后再执行设置命令。
   - 推荐提问：`请告诉我你当前所在的国家和城市（必要时补充州/省），我先帮你设置正确时区再继续。`
   - 若用户明确要求更换时区，也先确认其当前位置（或目标位置）并映射为 IANA 时区后执行设置。
   - 若位置存在歧义（同名城市或跨多个时区），先向用户补充确认再设置，避免写入错误时区。
   - 若用户尚未给出位置，不要猜测时区，不要直接执行 `user:timezone`。

3. 将位置映射为 IANA 时区后，执行设置命令：

```bash
diet user:timezone "<IANA_TIMEZONE_FROM_LOCATION>"
```

4. 需要重试设置的典型报错：
   - `Set user timezone first, e.g. diet user:timezone "<IANA_TIMEZONE>".`
   - `invalid user timezone "...". Please run user:timezone again.`

## 检查结果示例

已配置：

```json
{
  "timezone": "America/Los_Angeles"
}
```

未配置：

```json
{}
```
