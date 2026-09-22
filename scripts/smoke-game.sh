#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
codex_home="${CODEX_HOME:-$HOME/.codex}"
pwcli="$codex_home/skills/playwright/scripts/playwright_cli.sh"
base_url="${LOST_PAGES_SMOKE_URL:-http://127.0.0.1:5173}"

if ! command -v npx >/dev/null 2>&1; then
  echo "npx is required" >&2
  exit 1
fi

run_eval() {
  "$pwcli" eval "$1" \
    | awk '/^### Result/{getline; print; exit}' \
    | sed 's/^"//; s/"$//; s/\\"/"/g'
}

for number in 01 02 03 04 05 06 07 08; do
  "$pwcli" open "$base_url/?page=page${number}&play=1" >/dev/null
  snapshot="$(run_eval 'JSON.stringify({canvas:document.querySelectorAll("canvas").length,pause:!!document.querySelector("[data-game-pause]"),scene:window.__lostPagesGameTest?.sceneId})')"
  echo "page${number} load ${snapshot}"
  grep -q '"canvas":1' <<<"$snapshot"
  grep -q '"pause":true' <<<"$snapshot"
  grep -q "\"scene\":\"page${number}\"" <<<"$snapshot"

  "$pwcli" eval 'window.__lostPagesGameTest.setManualClock(true)' >/dev/null
  before="$(run_eval 'JSON.stringify(window.__lostPagesGameTest.snapshot())')"
  "$pwcli" keydown ArrowUp >/dev/null
  delta_snapshot="$(run_eval '(() => { window.__lostPagesGameTest.advance(250); return JSON.stringify(window.__lostPagesGameTest.snapshot()); })()')"
  "$pwcli" keyup ArrowUp >/dev/null
  echo "page${number} delta ${delta_snapshot}"
  grep -q '"paused":false' <<<"$delta_snapshot"
  node --input-type=module -e 'const a=JSON.parse(process.argv[1]),b=JSON.parse(process.argv[2]); if(b.clock.ticks-a.clock.ticks!==15 || Math.abs(a.player.z-b.player.z-0.775)>0.002) process.exit(1)' "$before" "$delta_snapshot"

  "$pwcli" eval '(() => { document.querySelector("button[aria-label=\"Pause\"]")?.click(); return "clicked"; })()' >/dev/null
  paused_snapshot="$(run_eval 'JSON.stringify(window.__lostPagesGameTest?.snapshot())')"
  echo "page${number} pause ${paused_snapshot}"
  grep -q '"paused":true' <<<"$paused_snapshot"
  after_pause="$(run_eval '(() => { window.__lostPagesGameTest.advance(1000); return JSON.stringify(window.__lostPagesGameTest.snapshot()); })()')"
  test "$paused_snapshot" = "$after_pause"
done

echo "game smoke: PASS (route loading, exact elapsed movement, pause freeze only; not eight-game completion)"
