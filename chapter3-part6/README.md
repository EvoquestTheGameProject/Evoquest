# Chapter 3, Part 6: the Evolved trail, the Dome, the dark route and the second chamber

This adds the next part of the story to **EvoQuest Cinematic Edition v52.2.0**. The result is
`../EvoQuest_Cinematic_Edition_v52_3_0.html`, still one self-contained HTML file.

The v52 game is a single file built from a much newer source than `src/` in the repository root (which still builds v48),
so this part lives in its own folder and is **inserted into the v52.2.0 file at build time**:

```
node build.js            # base/…v52_2_0.html + src/*.js + patch/journal.js  ->  ../EvoQuest_Cinematic_Edition_v52_3_0.html
tests/run-all.sh         # headless end-to-end checks (Playwright + Chromium)
```

`build.js` inserts `src/*.js` (filename order) at the end of the game's main script, inside the game closure, exactly where every
earlier chapter part sits, so the code can use the engine's own hooks (`c7Step`, `c7Use`, `c7Back`, `c7Tint`, `c5Cut`, …).
It also syntax-checks the result, so a typo cannot ship as a blank screen. Do not put the text `</script` inside a source file.

## The story, step by step

After "Back to the City" (the old end card is gone) the quest continues:

1. **Follow the Evolved** (`02-follow.js`, room `fol`). A line of Evolved walks west through the burning streets, toward a time
   machine part. Stay behind them without being caught:
   * stand beside a wreck and press **USE** to hide (you vanish; only your eyes peek out);
   * the **last one turns round** now and then (a growl and a "!" first, then a red cone): be hidden or out of range;
   * **watchers on the roofs** sweep the street with red eye-beams: cross between sweeps, or hide;
   * **broken glass** crunches and makes a noise: jump over it; **a gunshot** is the loudest noise of all;
   * if they get far ahead they wait; if you get too close or are seen for about a second you are caught (Retry = last waypoint).
2. **The Dome** (`03-dome.js`, room `dome`). A hall of flesh, car parts and rubble. The Evolved scatter into burrows and the big one
   walks into a pulsing wall of flesh, which opens for it and closes. You can't follow. Read the green **EMERGENCY ROUTE** sign and
   **pry the hatch** off with the crowbar: a heartbeat mini-game (pull in the green "relaxed" window after the second beat; 4 bolts).
   The hatch springs shut behind you.
3. **The emergency route** (`04-dark.js`, room `dark`). Total darkness, stairs, gaps and pads, on a tall scrolling room.
   * **SCREAM** (F / K / the SHOOT button): the sound ripples out and the echo draws walls, stairs and gaps for a moment;
   * **TAP** (J / the PUNCH button): tap ahead with the crowbar; **touch pads** in the floor glow when tapped:
     red = armed (stepping on one zaps you), so jump them;
   * a **locker** that only the echo shows holds a VHS tape; at the end, three pads play three notes: tap them from the
     **lowest to the highest** (the carved bars near the door hint at it) to open the door.
4. **The second chamber** (`06-lab.js`, `07-bench.js`, room `slab`). Containment tubes with the Evolved (different body parts), a
   **clean workbench**, supply shelves, a media room with a **TV**, and a test range.
   * Take the Venom Blaster **apart** on the workbench (four steps, in a safe order).
   * Search for 8 parts and craft an **Upgrade Core** at the bench:
     `Pressure Chamber (pipe+gauge+gasket)` + `Injector Core (syringes+coil+ampoule)` = `Venom Reactor`;
     `Catalyst Cell (gland+power cell)`; `Reactor + Catalyst` = `Upgrade Core`. (The gland needs the crowbar; the power locker
     needs the keycard from the desk. A blueprint on the wall shows the tree.)
   * Find **6 VHS tapes** and play them on the TV. Most are blurred and hard to read; adjust the **tracking** to sharpen them.
   * Choose **one** of three weapons for the Upgrade Core plus the old barrel, grip and canister.
5. **The new weapons** (`08-weapons.js`), working in every room of this part:
   | Weapon | Role | How it works |
   | --- | --- | --- |
   | **Venom Gusher** | single high-health target | thick fast stream, poison **stacks** on the target, ignores armour, hold to keep firing |
   | **Evo Sweeper** | explosive crowd control | arcing venom bomb, **area explosion**, then a lingering venom cloud |
   | **Hypervex** | marksman, keeps distance | near-instant **piercing** shot, hits harder with distance, **headshots** double, laser sight |

   Anything that wants to be shot adds itself to `P6W.tg` (the test range does: an armoured Brute, a Swarm of pods and a Far
   target). Ammo refills slowly over time and at the rack on the range. Finish the calibration for the weapon you chose and
   the part ends with a summary card ("what you did / what you learned"), as the earlier parts do.

## Where things are

| File | What |
| --- | --- |
| `01-core.js` | state (`S.p6` inside the chapter 3 island state, so it is saved with the game), rooms, helpers, tiny Web Audio synth, hiding, retry |
| `02-follow.js` | the stealth street, covers, watchers, glass, cutscenes, the hook into the end of the city part |
| `03-dome.js` | the Dome art, the flesh wall, the heartbeat pry mini-game, the descent |
| `04-dark.js` | the dark route: floor profile (`P6_KSEG`), echo renderer, pads, tone lock, falls |
| `05-items.js` | all new items, icons (24x24 pixel art) and info cards |
| `06-lab.js` | the lab art (tubes and subjects, props), searchable spots (`P6_LSPOT`), guide and arrow |
| `07-bench.js` | the workbench screen, recipes (`P6_REC`), the weapon picker and weapon art, the TV and tapes (`P6_TAPEDATA`) |
| `08-weapons.js` | the three weapons, targets, the test range |
| `09-end.js` | the closing cutscene and the end card |
| `99-debug.js` | developer-menu buttons ("CHAPTER 3: THE EVOLVED TRAIL") and the optional test hooks |
| `patch/journal.js` | research notes, achievements and an "Evolved" creature entry for the journal |

## Notes

* All cutscene keys start with `c5` because the engine routes cutscenes by prefix.
* The new rooms carry the `c7` flag, so every older hook hands over to the new code only in these rooms.
* Stairs in the dark route are real steps (3.6 units); the engine reads the floor height from `rooms.dark.fy`, which is a getter.
* Saves: `c2Save` stores checkpoints (the streets after each waypoint, the Dome, every landing of the dark route, the lab). The old
  end card state (`cend`) resumes straight into the new cutscene.
* Test hooks (`window.__evoP6`) exist only with `#p6test` in the address or `window.__evoP6Test` set before the game loads.
