# +check-update

用于检查 `skills/diet-base/SKILL.md` 中声明的 `version` 是否与本机 `diet --version` 一致；不一致时尝试安装目标版本。若安装失败或安装后仍不一致，则停止后续操作并告知用户。

## 何时执行（提速重点）

- 当前会话第一次调用 `diet add/search/delete` 前执行一次即可
- 仅在以下情况重新执行：
  - 用户明确要求“检查/升级版本”
  - 出现 `diet: command not found`
  - 版本相关异常（输出版本解析失败、命令行为异常）
- 不需要在每次 `add/search/delete` 前都执行

## 检查与自动安装脚本

```bash
SKILL_FILE="skills/diet-base/SKILL.md"
PACKAGE_NAME="@xiejiapeng/diet-cli"

SKILL_VERSION="$(
  sed -nE 's/^version:[[:space:]]*([0-9]+\.[0-9]+\.[0-9]+).*/\1/p' "$SKILL_FILE" | head -n 1
)"

if [ -z "$SKILL_VERSION" ]; then
  echo "Cannot parse version from $SKILL_FILE"
  exit 1
fi

CURRENT_VERSION=""
CURRENT_DISPLAY="not installed"

if command -v diet >/dev/null 2>&1; then
  RAW_VERSION="$(diet --version 2>/dev/null | head -n 1)"
  CURRENT_VERSION="$(printf '%s' "$RAW_VERSION" | sed -nE 's|^.*/([0-9]+\.[0-9]+\.[0-9]+).*|\1|p' | head -n 1)"
  if [ -n "$CURRENT_VERSION" ]; then
    CURRENT_DISPLAY="$CURRENT_VERSION"
  else
    CURRENT_DISPLAY="unknown (${RAW_VERSION:-no output})"
  fi
fi

if [ "$CURRENT_VERSION" = "$SKILL_VERSION" ]; then
  echo "diet version check passed: $CURRENT_DISPLAY"
  exit 0
fi

TARGET_PACKAGE="${PACKAGE_NAME}@${SKILL_VERSION}"

if ! npm i -g "$TARGET_PACKAGE"; then
  cat <<MSG
[Diet CLI 自动安装失败]
- 目标版本: $SKILL_VERSION
- 当前版本: $CURRENT_DISPLAY

请检查 npm 网络和权限后重试：
npm i -g $TARGET_PACKAGE
MSG
  exit 1
fi

hash -r

RAW_VERSION="$(diet --version 2>/dev/null | head -n 1)"
CURRENT_VERSION="$(printf '%s' "$RAW_VERSION" | sed -nE 's|^.*/([0-9]+\.[0-9]+\.[0-9]+).*|\1|p' | head -n 1)"
if [ -n "$CURRENT_VERSION" ]; then
  CURRENT_DISPLAY="$CURRENT_VERSION"
else
  CURRENT_DISPLAY="unknown (${RAW_VERSION:-no output})"
fi

if [ "$CURRENT_VERSION" != "$SKILL_VERSION" ]; then
  cat <<MSG
[Diet CLI 版本检查未通过]
- 期望版本: $SKILL_VERSION
- 当前版本: ${CURRENT_VERSION:-unknown}
- 原因: 自动安装后版本仍不一致

请手动执行以下命令后重试：
npm i -g ${PACKAGE_NAME}@${SKILL_VERSION}
MSG
  exit 1
fi

echo "diet version check passed: $CURRENT_DISPLAY"
```

## 说明

- 当前版本匹配时，不触发网络请求。
- 不匹配时直接安装目标版本，避免额外 `npm view` 往返。
- 失败回报需包含：期望版本、当前版本（如可获取）、失败原因、下一步命令。
