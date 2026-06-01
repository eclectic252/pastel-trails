#!/bin/zsh
set -euo pipefail

SCRIPT_DIR="${0:A:h}"
cd "$SCRIPT_DIR"

echo "Rebuilding bundled local content..."
node scripts/build-local-content.mjs
echo
echo "Done. Reload index.html in your browser."
