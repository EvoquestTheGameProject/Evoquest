# EvoQuest

A browser game that ships as **one self-contained HTML file**: `EvoQuest_Cinematic_Edition_v52_0_0.html`
(works offline, in artifact viewers, from `file://`, anywhere an HTML file opens).

The source lives in `src/` as many files. `build.js` stitches them back into that single file.

```
npm run build      # node build.js  -> rewrites the single HTML file (no dependencies needed)
npm run check      # build + compile every inline script + make sure the committed HTML is up to date
npm run format     # prettier over src/ (optional, needs `npm install`)
```

Always commit the rebuilt HTML together with your `src/` change (`npm run check` fails if they differ).

## What's in v52.0.0

This replaces the old v48 copy. Since v48 the game gained:

* **Chapter 2, part 3:** the wiring puzzle, the burning road chase, the forest camp, the dream and the river valley.
* **Chapter 3:** the cargo port and ship (crowbar crafting, radar steering through a storm, the propeller and generator
  repairs), Ridge Tower Island, the tower's control and generator rooms, the dead satellites, the trapdoor and the hidden
  lab with its archive.
* **The time-machine memory:** a cinematic with its own effects compositor (bloom, light trails, colour split, flashes,
  screen shake), played on the opening cutscene's engine.
* **The scientist's hypothesis:** after the memory, a lamp comes on in the lab's corner. Dr. Morrow's notebook holds a
  hypothesis (the Evolution sends its monsters to guard the time machine parts), followed by an interactive lesson on what a
  hypothesis is: IF/THEN/BECAUSE, putting the scientific method in order, and a three-question quiz.
* **The way back:** after the lesson, climb out of the lab and sail home on the RIDGE LINK 7. A cinematic shows the
  city burning from the water and the Evolved bursting out of nowhere: a wrecked car and a road tunnel. Then walk through the
  City Harbor at night: the same city as chapter 2, painted with its own painters and graded to night, with a real
  screen-space light map (fires, lamps and the growth cut light into the dark and light the player), mutated people
  and beasts, and the evacuation barricade being smashed open.
* Real lighting in the hidden lab and the tower's control and generator rooms; Dr. Morrow drawn with the game's own
  character sprite.
* **A cinematic finish on every chapter 1 and 2 cutscene:** bloom, per-scene colour grading, drifting light leaks, film
  grain, a soft vignette, a gentle handheld camera and a light flash on each cut; in-game cutscenes get bloom, grain and a
  vignette, and gameplay a light bloom.
* The journal, quality-of-life, no-zoom and controller (gamepad) scripts, and a new menu track.

## Layout

```
src/
  index.html                  page markup + the order of everything ({{css:..}}, {{js:..}}, {{main}} includes)
  css/base.css, overrides.css, extra.css   the <style> blocks
  assets/                     binary files, inlined at build time as base64 (menu-music.mp3, boss PNGs)
  js/
    diag.js                   on-screen error reporting for restricted viewers
    audio/music.js            menu music: seamless loop, fades, mute button, iOS audio unlock/fallbacks
    audio/sfx.js              procedural sound-effect engine (no audio files) + `SFX.p(name)`
    save/bridge.js            save/load transfer: backups, repair, export/import, save codes, "Download Game + Progress"
    main/00-global.js         game script, part 1: global scope (menu, intro, character creator, cutscene engine)
    game/00-core.js           game script, part 2: the in-game closure (rooms, input, update loop, combat, boss, chapter 2)
    game/20-NN-*.js           the chapter modules, in load order (see below)
    game/90-core-tail.js      the end of the in-game closure
    journal.js                the NOTES journal: achievements and key ideas
    qol.js, nozoom.js, pad.js quality-of-life tweaks, pinch/zoom blocking, gamepad support
build.js                      assembler
tools/check.js                sanity checks
```

### Chapter modules (`src/js/game/20-NN-*.js`)

| Files | What they hold |
| --- | --- |
| `c3_1` to `c3_8` | Chapter 2 part 3: the wiring puzzle, burning road chase, forest camp, dream, dev tools |
| `c4_1` to `c4_13` | The river valley, water filtering, crowbar crafting, the cargo port |
| `c5_1` to `c5_5` | Chapter 3: the ship, radar, propeller and generator repairs |
| `c6_1` | Art pass: painted forests, trees, roads, ship grime |
| `c7_1` to `c7_4` | Ridge Tower Island, the tower control room and the generator repair |
| `c9_1` | The dead satellites, the trapdoor under the rug and the hidden lab's archive |
| `c9_2` | The time-machine memory cinematic and its effects compositor |
| `c9_3` | The scientist in the corner, his notebook's hypothesis and the hypothesis lesson |
| `c10_1` | The way back: the quest back to the ship and the city harbor's scripted moments |
| `c10_2` | The city at night: painted tiles and buildings, the barricade, the Evolved, the light map, tower-room lighting |
| `c10_3` | The voyage-home cinematic |
| `c11_1` | Cinematic finish for the chapter 1 and 2 cutscenes and in-game cutscenes (bloom, grading, light leaks, grain, vignette, handheld camera; `window.__evoNoFx=1` turns it off) |

## Rules that keep the single file working

* **Files are concatenated in filename order** (`00-`, `20-NN-`, `90-`). Add a new file by choosing a number.
* `js/main/*` all share one global scope; `js/game/*` are the *body of one function* (the build wraps them in
  `(()=>{ … })();`), so they share that scope. A file is therefore a slice of a larger program, not a module.
  Do not split a function across files, and keep every file ending on a complete statement.
* The chapter modules wrap earlier hooks (`{const _a=fn;fn=function(){…;return _a();};}`), so their order matters.
* Identifier names in `00-global.js` and `00-core.js` are short because the original code was minified.
* **Do not reorder the scripts in `src/index.html`.** `save/bridge.js` rebuilds the page for "Download Game + Progress"
  and expects the game script to be the script right after it.
* Never put the text `</script` inside a script (the build fails if you do).
* Assets: write `"@@B64:file.ext@@"` (base64 text) or `"@@DATAURI:png:file.png@@"` in a JS string and drop the file in `src/assets/`.

## Verification

The build from `src/` is byte-identical to the tested single file. Before release it was played through in a headless
browser at desktop and phone sizes: every room, saving and continuing in every chapter 3 room, the full memory cinematic,
and the whole scientist and hypothesis flow, with no script errors.
