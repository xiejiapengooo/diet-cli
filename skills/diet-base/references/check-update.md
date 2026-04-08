# +check-update

用于检查 `skills/diet-base/SKILL.md` 中声明的 `version` 是否与本机 `diet --version` 一致；不一致则自动安装升级到目标版本。

## 自动升级脚本

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

DIET_VERSION=""
if command -v diet >/dev/null 2>&1; then
  DIET_VERSION="$(
    diet --version 2>/dev/null | sed -nE 's|^.*/([0-9]+\.[0-9]+\.[0-9]+).*|\1|p' | head -n 1
  )"
fi

if [ -z "$DIET_VERSION" ] || [ "$DIET_VERSION" != "$SKILL_VERSION" ]; then
  npm i -g "${PACKAGE_NAME}@${SKILL_VERSION}"
  hash -r
  DIET_VERSION="$(
    diet --version 2>/dev/null | sed -nE 's|^.*/([0-9]+\.[0-9]+\.[0-9]+).*|\1|p' | head -n 1
  )"
fi

if [ "$DIET_VERSION" != "$SKILL_VERSION" ]; then
  echo "diet version mismatch: expected=$SKILL_VERSION actual=${DIET_VERSION:-unknown}"
  exit 1
fi

echo "diet version is aligned: $DIET_VERSION"
```

## 说明

- `diet` 未安装时，会被视为版本不匹配并自动安装。
- 为确保与 Skill 约定一致，安装时固定为 `SKILL.md` 的版本号。
- 执行完成后会再次校验版本，避免“安装成功但版本仍不一致”。
