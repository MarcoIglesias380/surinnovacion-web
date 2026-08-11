#!/usr/bin/env bash
set -u

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

ok() { printf "${GREEN}[OK]${NC}    %s\n" "$1"; }
warn() { printf "${YELLOW}[WARN]${NC}  %s\n" "$1"; }
fail() { printf "${RED}[FAIL]${NC}  %s\n" "$1"; }

EXIT_CODE=0

echo "== 1. Archivos base del arnes =="
for f in AGENTS.md CHECKPOINTS.md feature_list.json progress/current.md progress/history.md docs/architecture.md docs/conventions.md docs/verification.md; do
  if [ -f "$f" ]; then
    ok "Existe $f"
  else
    fail "Falta $f"
    EXIT_CODE=1
  fi
done

echo ""
echo "== 2. feature_list.json =="
if command -v python3 >/dev/null 2>&1; then
  python3 - <<'PY'
import json
import sys

try:
    with open("feature_list.json", "r", encoding="utf-8") as fh:
        data = json.load(fh)
    valid = set(data.get("rules", {}).get("valid_status", [])) or {"pending", "in_progress", "done", "blocked"}
    features = data["features"]
    in_progress = [f for f in features if f.get("status") == "in_progress"]
    if len(in_progress) > 1:
        print(f"[FAIL]  Hay {len(in_progress)} features in_progress; maximo 1")
        sys.exit(1)
    for feature in features:
        status = feature.get("status")
        if status not in valid:
            print(f"[FAIL]  Estado invalido en feature {feature.get('id')}: {status}")
            sys.exit(1)
        if not feature.get("acceptance"):
            print(f"[FAIL]  Feature {feature.get('id')} no tiene acceptance")
            sys.exit(1)
    print(f"[OK]    feature_list.json valido ({len(features)} features)")
except Exception as exc:
    print(f"[FAIL]  feature_list.json invalido: {exc}")
    sys.exit(1)
PY
  if [ $? -ne 0 ]; then EXIT_CODE=1; fi
else
  warn "python3 no disponible; se omite validacion JSON"
fi

echo ""
echo "== 3. Estado del repo =="
if [ -d .git ]; then
  git status --short || true
  branch="$(git branch --show-current 2>/dev/null || true)"
  if [ -n "$branch" ]; then
    echo "Branch: $branch"
  else
    warn "Git existe, pero no hay branch activa detectable"
  fi
else
  warn "Git no esta inicializado"
fi

echo ""
echo "== 4. Verificacion Next.js =="
for cmd in "npm run lint" "npm run typecheck"; do
  echo "-- $cmd"
  if eval "$cmd"; then
    ok "$cmd paso"
  else
    fail "$cmd fallo"
    EXIT_CODE=1
  fi
done

if [ "${RUN_BUILD:-0}" = "1" ]; then
  echo "-- npm run build"
  if npm run build; then
    ok "npm run build paso"
  else
    fail "npm run build fallo"
    EXIT_CODE=1
  fi
else
  warn "Build omitido por defecto. Ejecuta RUN_BUILD=1 ./init.sh para cierre de feature."
fi

echo ""
echo "== 5. Resumen =="
if [ $EXIT_CODE -eq 0 ]; then
  ok "Arnes listo para trabajar"
else
  fail "Arnes con errores; resolver antes de avanzar"
fi

exit $EXIT_CODE
