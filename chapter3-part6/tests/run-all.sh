#!/bin/sh
# Headless end-to-end checks for Chapter 3, Part 6. Needs Playwright with Chromium (NODE_PATH must find it).
# Each script boots the built game with the test hooks on (window.__evoP6Test), jumps into a stage with the dev tools and
# drives it; "no errors" at the end of a script means no page errors were raised.
cd "$(dirname "$0")" || exit 1
for t in [0-9]*.js; do echo "== $t"; node "$t" || exit 1; done
