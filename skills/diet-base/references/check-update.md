# +check-update

用于检查 `skills/diet-base/SKILL.md` 中声明的 `version` 是否与本机 `diet --version` 一致；不一致时先尝试自动安装目标版本。若安装失败、npm 无对应版本，或安装后仍不一致，则立即停止后续操作，并以可阅读形式告知用户。

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

if ! command -v diet >/dev/null 2>&1; then
    CURRENT_VERSION=""
    CURRENT_DISPLAY="not installed"
    return
  fi

  RAW_VERSION="$(diet --version 2>/dev/null | head -n 1)"
  CURRENT_VERSION="$(printf '%s' "$RAW_VERSION" | sed -nE 's|^.*/([0-9]+\.[0-9]+\.[0-9]+).*|\1|p' | head -n 1)"
  if [ -n "$CURRENT_VERSION" ]; then
    CURRENT_DISPLAY="$CURRENT_VERSION"
  else
    CURRENT_DISPLAY="unknown (${RAW_VERSION:-no output})"
  fi

if [ "$CURRENT_VERSION" != "$SKILL_VERSION" ]; then
  TARGET_PACKAGE="${PACKAGE_NAME}@${SKILL_VERSION}"

  if ! npm view "$TARGET_PACKAGE" version >/dev/null 2>&1; then
    cat <<MSG
[Diet CLI 版本检查未通过]
- 期望版本: $SKILL_VERSION
- 当前版本: $CURRENT_DISPLAY
- 原因: npm 中不存在 $TARGET_PACKAGE
MSG
    exit 1
  fi

  if ! npm i -g "$TARGET_PACKAGE"; then
    cat <<MSG
[Diet CLI 自动安装失败]
- 目标版本: $SKILL_VERSION

请检查 npm 登录、网络和权限后重试：
npm i -g $TARGET_PACKAGE
MSG
    exit 1
  fi

  hash -r
  read_current_version
fi

if [ "$CURRENT_VERSION" != "$SKILL_VERSION" ]; then
  cat <<MSG
[Diet CLI 版本检查未通过]
- 期望版本: $SKILL_VERSION
- 当前版本: ${CURRENT_DISPLAY:-unknown}
- 原因: 自动安装后版本仍不一致

请手动执行以下命令后重试：
npm i -g ${PACKAGE_NAME}@${SKILL_VERSION}
MSG
  exit 1
fi

echo "diet version check passed: $CURRENT_DISPLAY"
```

## 说明

- 若当前版本与 `SKILL.md` 不一致，会先尝试自动安装目标版本。
- 只要出现以下任一情况，必须中止流程，不能继续执行 `install/timezone/add/search/delete`：
  - npm 无该版本
  - 自动安装失败
  - 自动安装后版本仍不一致
- 对用户回报时应保持可读、包含：期望版本、当前版本（如可获取）、失败原因、下一步命令。
