#!/usr/bin/env bash
# LeafSense backend launcher — WSL/Linux equivalent of start.ps1.
#
# Creates a dedicated venv (.venv) on first run, installs requirements.txt
# into it, then serves the model on port 8001 — NOT the default 8000 that
# main.py's `if __name__ == "__main__":` block hardcodes, because LeafSense
# runs alongside InsightAI-RAG, whose own backend also defaults to port
# 8000. InsightAI's config already expects the vision service at
# http://localhost:8001.
#
# Uses only the .venv it manages; never installs TensorFlow into any
# shared/global Python environment.
#
# Usage:
#   ./start.sh            # foreground (Ctrl+C stops the server)
#   ./start.sh --daemon   # background with logs at .venv/leafsense.log
#   ./start.sh --status   # show whether LeafSense is listening on :8001

set -euo pipefail

# Resolve this script's real path (follow symlinks) so we can cd into the
# backend dir regardless of where the script is invoked from.
SCRIPT_SRC="${BASH_SOURCE[0]}"
while [ -h "$SCRIPT_SRC" ]; do
  DIR="$(cd -P "$(dirname "$SCRIPT_SRC")" >/dev/null 2>&1 && pwd)"
  SCRIPT_SRC="$(readlink "$SCRIPT_SRC")"
  [[ "$SCRIPT_SRC" != /* ]] && SCRIPT_SRC="$DIR/$SCRIPT_SRC"
done
BACKEND_DIR="$(cd -P "$(dirname "$SCRIPT_SRC")" >/dev/null 2>&1 && pwd)"
VENV_DIR="$BACKEND_DIR/.venv"
VENV_PYTHON="$VENV_DIR/bin/python"
VENV_UVICORN="$VENV_DIR/bin/uvicorn"
REQUIREMENTS="$BACKEND_DIR/requirements.txt"
PORT=8001
LOG_FILE="$VENV_DIR/leafsense.log"

# --- Find a Python 3.9-3.13 interpreter (TensorFlow 2.21 constraint) ---
find_usable_python() {
  local v
  for v in python3.13 python3.12 python3.11 python3.10 python3.9 python3; do
    if command -v "$v" >/dev/null 2>&1; then
      local ver
      ver="$("$v" -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")' 2>/dev/null || true)"
      if [[ "$ver" =~ ^3\.(9|1[0-3])$ ]]; then
        echo "$v"
        return 0
      fi
    fi
  done
  return 1
}

case "${1:-}" in
  --status)
    if curl -sf -m 2 "http://localhost:$PORT/ping" >/dev/null 2>&1; then
      echo "LeafSense is RUNNING on http://localhost:$PORT"
      exit 0
    fi
    echo "LeafSense is NOT running on http://localhost:$PORT"
    exit 1
    ;;
  --daemon)
    # Re-exec ourselves in the background, detached from this terminal.
    nohup "$0" >/dev/null 2>&1 &
    echo "LeafSense starting in background (log: $LOG_FILE)"
    exit 0
    ;;
esac

PYTHON_BIN="$(find_usable_python || true)"
if [ -z "$PYTHON_BIN" ]; then
  echo "No Python 3.9-3.13 interpreter found. TensorFlow 2.21 (LeafSense's backend requirement) doesn't support other versions." >&2
  echo "Install one, e.g.  sudo apt install python3.12" >&2
  exit 1
fi

# --- Create the venv if it doesn't exist ---
if [ ! -x "$VENV_PYTHON" ]; then
  echo "Creating dedicated virtual environment at $VENV_DIR ..."
  "$PYTHON_BIN" -m venv "$VENV_DIR"
fi

# --- Install requirements into the venv (never globally) ---
echo "Installing LeafSense backend requirements into $VENV_DIR ..."
"$VENV_PYTHON" -m pip install -q -r "$REQUIREMENTS"
"$VENV_PYTHON" -m pip install -q psutil 2>/dev/null || true

# --- Serve on port 8001 (not 8000, which InsightAI-RAG's backend uses) ---
cd "$BACKEND_DIR"
echo "Starting LeafSense on http://localhost:$PORT ..."
echo "LeafSense log: $LOG_FILE"

exec "$VENV_UVICORN" main:app --host localhost --port "$PORT"