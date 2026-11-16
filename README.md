# EvoQuest

A browser game that ships as **one self-contained HTML file**: `EvoQuest_Cinematic_Edition_v48 2.html`
(works offline, in artifact viewers, from `file://`, anywhere an HTML file opens).

The source lives in `src/` as many small files. `build.js` stitches them back into that single file.

```
npm install        # once: lets the build compact the shipped JS (optional, see below)
npm run build      # node build.js  -> rewrites the single HTML file
npm run check      # build + compile every inline script + make sure the committed HTML is up to date
npm run format     # prettier over src/ (optional, needs `npm install`)
```

Always commit the rebuilt HTML together with your `src/` change (`npm run check` fails if they differ).

## Layout

```
src/
  index.html                  page markup + the order of everything ({{css:..}}, {{js:..}}, {{main}} includes)
  css/base.css, overrides.css the two <style> blocks
  assets/                     binary files, inlined at build time as base64 (menu-music.mp3, boss PNGs,
                              press-start-2p.woff2 pixel font + its OFL license)
  js/
    audio/music.js            menu music: seamless loop, fades, mute button, iOS audio unlock/fallbacks
    audio/sfx.js              procedural sound-effect engine (no audio files) + `SFX.p(name)`
    save/bridge.js            save/load transfer: backups, repair, export/import, save codes, "Download Game + Progress"
    main/*.js                 game script, part 1: global scope (menu, intro, character creator, cutscenes)
    game/*.js                 game script, part 2: the in-game closure (rooms, input, update loop, combat, boss, render)
build.js                      assembler
tools/check.js                sanity checks
```

### Where things are

| Feature | File |
| --- | --- |
| Startup disclaimer + Claude intro | `js/main/00-boot-intro.js` |
| Lab home screen + holographic PLAY NOW projector | `js/main/01-menu-background.js` |
| DNA -> dividing-cells zoom intro | `js/main/02-intro-zoom.js` |
| Saved players, character creator | `js/main/03-…`, `04-…` |
| Cutscene canvas / sequencer / scene painters / timelines | `js/main/05-…` to `14-…` |
| Rooms, items, crafting bench, input, update loop | `js/game/01-…` to `06-…` |
| Boss-room opening cinematic ("director") | `js/game/08-boss-opening-director.js` |
| Combat, snake boss, game render, dev tools | `js/game/09-…` to `12-…` |
| Chapter 2: rooms, cars, spider chase, webs, tunnel escape | `js/game/13-chapter2.js` |
| Chapter 2 world: burned-out scenery, trees, climbable vines/branches that snap, fall damage | `js/game/14-chapter2-world.js` |
| Chapter 2 intro cutscene (letterbox, camera, dialogue, spider leap) | `js/game/15-chapter2-cutscene.js` |

## Shipped file is compacted

With `acorn` installed (`npm install`), the build strips formatting whitespace from the shipped JS. It only does so when
the compacted code parses to the exact same syntax tree; otherwise it ships the readable code. `node build.js --pretty`
builds the readable version for debugging. `src/` is always the readable source.
CSS comments and layout whitespace are always stripped (no dependency needed). The page loads nothing from the
internet: the pixel font, music and images are all inlined, so strict viewers (in-app file previews) cannot block them.
The menu music is a 16 kHz / 24 kbps mono MP3: the track is low-passed below 6 kHz, so a higher rate only adds size.

## Rules that keep the single file working

* **Files are concatenated in filename order** (`01-`, `02-`, …). Add a new file by choosing a number.
* `js/main/*` all share one global scope; `js/game/*` are the *body of one function* (the build wraps them in
  `(()=>{ … })();`), so they share that scope. A file is therefore a slice of a larger program, not a module.
  Do not split a function across files, and keep every file ending on a complete statement.
* The original code was minified. The important shared names are now readable (`player`, `room`, `snakeBoss`, `cine`,
  `inv`, `hp`, `ammo`, `update()`, `render()`, `enterRoom()`, `spawnBoss()`, `hurtPlayer()`, `say()`, `setScene()`, `ctx`, …);
  local variables inside functions are still short (`t`, `a`, `e`).
* **Do not reorder the scripts in `src/index.html`.** `save/bridge.js` rebuilds the page for "Download Game + Progress"
  and expects the game script to be the script right after it, last in the body.
* Never put the text `</script` inside a script (the build fails if you do).
* Assets: write `"@@B64:file.ext@@"` (base64 text) or `"@@DATAURI:png:file.png@@"` in a JS string and drop the file in `src/assets/`.

## Verification of the split

The first build from `src/` was byte-identical to the original single file. After formatting, every JS file was checked to
have an identical syntax tree, and the original and rebuilt games were rendered side by side with seeded randomness and a
manual clock: all intro frames and all boss-cutscene frames were pixel-identical.
