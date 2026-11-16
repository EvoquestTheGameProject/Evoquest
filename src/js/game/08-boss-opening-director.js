/* ===== BOSS-ROOM OPENING: cinematic director ===== */
const $DL = [
  [0, 0, "", "THE FIRE EXIT. SEALED FROM THE OTHER SIDE."],
  [0, 75, "", "SOMETHING IS SCRATCHING BACK."],
  [0, 150, "p", "...Okay. Let's see what this venom can do."],
  [1, 0, "", "THE VENOM EATS THROUGH THE STEEL."],
  [1, 80, "p", "Come on... come on..."],
  [1, 128, "", ""],
  [2, 0, "", ""],
  [3, 80, "", "THE DOOR BUCKLES... AND GIVES."],
  [4, 0, "p", "...Here goes nothing."],
  [5, 36, "p", "Snakes... everywhere."],
  [5, 135, "", "THEY DON'T MOVE LIKE ANIMALS. THEY MOVE LIKE THEY'RE WAITING."],
  [5, 235, "p", "Stay quiet. Just keep walking."],
  [6, 16, "p", "And what is THAT?"],
  [6, 84, "", "A TAIL. THICKER THAN A TREE TRUNK."],
  [7, 12, "p", "It's... enormous."],
  [8, 55, "p", "...It was only the tail."],
  [8, 108, "", "THEN WHY IS THE FLOOR STILL SHAKING?"],
  [8, 152, "p", "Oh no."],
  [9, 0, "", ""],
];
let $TT = null;
const $dk = (a, b, x) => Math.max(0, Math.min(1, (x - a) / (b - a)));
function $dSay(d, w, x) {
  ((d.who = w), (d.txt = x), (d.cp = 0), (d.lc = 0));
}
function $dT(a) {
  const d =
    a.d ||
    (a.d = {
      z: 1,
      fx: 96,
      fy: 54,
      tz: 1,
      tfx: 96,
      tfy: 54,
      cx: null,
      bar: 0,
      tbar: 1,
      who: "",
      txt: "",
      cp: 0,
      lc: 0,
      fl: 0,
      flc: "255,255,255",
      red: 0,
      warn: 0,
      eyes: 0,
      eyes2: 0,
      imp: 0,
      hits: 0,
      fired: {},
    });
  const ph = a.ph,
    t = a.t,
    ev = (p, n, fn) => {
      const k = "E" + p + "_" + n;
      ph === p && t === n && !d.fired[k] && ((d.fired[k] = 1), fn());
    };
  $DL.forEach((L, i) => {
    const k = "L" + i;
    L[0] === ph && L[1] === t && !d.fired[k] && ((d.fired[k] = 1), $dSay(d, L[2], L[3]));
  });
  const dx = 185.5 - camX,
    dy = 284 - camY,
    px = player.x - camX,
    py = player.y - 22 - camY,
    rnd = Math.random;
  let tz = 1,
    tx = 96,
    ty = 54,
    boss = null;
  if (ph === 0) {
    ((tz = 1.08 + 0.22 * $dk(0, 230, t)),
      (tx = 0.55 * dx + 0.45 * px),
      (ty = 0.55 * dy + 0.45 * py),
      (d.red = 0.5 + 0.5 * Math.sin(tick / 9)),
      ev(0, 18, () => {
        ($sx("scratch"), (shake = Math.max(shake, 2)), (d.eyes = 1));
      }),
      ev(0, 60, () => {
        d.eyes = 0;
      }),
      ev(0, 84, () => {
        ($sx("scratch"), (d.eyes = 1));
      }),
      ev(0, 104, () => $sx("scratch")),
      ev(0, 130, () => {
        ((d.eyes = 0), $sx("creak"));
      }),
      t >= 70 && t % 52 == 0 && $sx("heart"));
  } else if (ph === 1) {
    ((tz = 1.3 + 0.25 * $dk(0, 145, t)),
      (tx = dx),
      (ty = dy),
      (d.red = 0.4 + 0.4 * Math.sin(tick / 9)),
      t % 14 == 0 && $sx("sizzle"),
      t % 3 == 0 &&
        addFx({
          k: "smoke",
          x: 182 + 6 * rnd(),
          y: 284 + 10 * (rnd() - 0.5),
          vx: -0.15,
          vy: -0.4 - 0.3 * rnd(),
          r: 1.5 + 2 * rnd(),
          c: "170,255,190",
          life: 26,
        }),
      t % 8 == 0 && sparks(185.5, 284, 2, ["#b06aff", "#e8d0ff"], 1, 0.08, 12),
      ev(1, 55, () => {
        ($sx("creak"), (shake = Math.max(shake, 3)));
      }),
      ev(1, 100, () => {
        ($sx("creak"), (shake = Math.max(shake, 4)));
      }),
      t > 110 && t % 10 == 0 && (shake = Math.max(shake, 3)),
      t % 52 == 0 && $sx("heart"));
  } else if (ph === 2) {
    ((tz = 1.15),
      (tx = 0.6 * px + 0.4 * dx),
      (ty = 0.6 * py + 0.4 * dy),
      (d.red = 0.25 + 0.2 * Math.sin(tick / 9)));
  } else if (ph === 3) {
    ((tz = 1.3), (tx = 0.5 * (dx + px)), (ty = 0.5 * (dy + py)), (d.red = 0.3));
    if (a.hits > d.hits) {
      d.hits = a.hits;
      const n = a.hits;
      ((d.imp = 0.1 + 0.06 * n),
        (d.z += d.imp),
        (d.fl = 3 === n ? 1 : 0.28),
        (d.flc = 3 === n ? "210,255,220" : "255,240,200"),
        $sx("doorhit"),
        $sx("debris"));
      for (let i = 0; i < 10 + 6 * n; i++)
        parts.push({
          x: 181 + 8 * rnd(),
          y: 270 + 30 * rnd(),
          vx: (rnd() - 0.15) * (1 + n),
          vy: -2 * rnd(),
          g: 0.12,
          life: 40,
          c: i % 2 ? "#6a7884" : "#3a444c",
          s: 1.5,
        });
      (addFx({ k: "ring", x: 187, y: 285, r0: 3, r1: 14 + 10 * n, c: "#d8ffd8", life: 14 }),
        3 === n &&
          ((hitStop = Math.max(hitStop, 12)),
          (shake = 26),
          (d.tz = 1),
          addFx({ k: "ring", x: 187, y: 285, r0: 4, r1: 46, c: "#ffffff", life: 20 }),
          addFx({ k: "flash", x: 187, y: 285, r: 40, c: "200,255,200", a: 0.9, life: 14 })));
    }
  } else if (ph === 4 || ph === 45) {
    ((tz = 1.05), (tx = px), (ty = py), (d.red = 0));
  } else if (ph === 5) {
    ((tz = 1.04), (tx = px), (ty = py));
    ev(5, 0, () => {
      ((roomBanner = 0),
        ($TT = { a: "EXIT LAB", b: "WHERE CONTAINMENT FAILED", t: 0, c: "#ffe070" }),
        (d.eyes2 = 1),
        $sx("title"));
    });
    const far = Math.max(0, roomW() - 192),
      fol = Math.max(0, Math.min(far, player.x - 96)),
      bell = Math.sin(Math.PI * $dk(20, 150, t));
    d.cx = t >= 20 && t <= 150 ? fol + (far - fol) * bell : null;
  } else if (ph === 6) {
    ((d.cx = t >= 8 ? Math.max(0, roomW() - 192) : null),
      (tz = 1.05 + 0.15 * $dk(0, 90, t)),
      (tx = 96),
      (ty = 70));
    (ev(6, 0, () => {
      ($sx("stinger"), $sx("rumble"), (d.fl = 0.35), (d.flc = "255,60,60"));
    }),
      ev(6, 40, () => $sx("slither")),
      t % 4 == 0 &&
        parts.push({
          x: camX + 192 * rnd(),
          y: camY + 2,
          vx: 0.2 * (rnd() - 0.5),
          vy: 0.4 + 0.4 * rnd(),
          g: 0.01,
          life: 70,
          c: "#8a8a7a",
          s: 1,
        }),
      (shake = Math.max(shake, 2)),
      t % 36 == 0 && $sx("heart"));
  } else if (ph === 7) {
    ((d.cx = null),
      (tz = 1.1),
      (tx = px),
      (ty = py),
      t % 30 == 0 && $sx("heart"),
      t % 5 == 0 &&
        parts.push({
          x: camX + 192 * rnd(),
          y: camY + 2,
          vx: 0.2 * (rnd() - 0.5),
          vy: 0.4 + 0.4 * rnd(),
          g: 0.01,
          life: 70,
          c: "#8a8a7a",
          s: 1,
        }));
  } else if (ph === 8) {
    const bx = 0.6 * roomW() - camX,
      by = floorY() - 30 - camY,
      p = $dk(110, 190, t);
    ((tz = 1.05 + 0.4 * p), (tx = px * (1 - p) + bx * p), (ty = py * (1 - p) + by * p));
    (ev(8, 100, () => $sx("rumble")),
      ev(8, 122, () => {
        ((d.warn = 70), $sx("siren"));
      }),
      ev(8, 172, () => {
        ((d.fl = 0.6), (d.flc = "255,80,80"), $sx("stinger"));
      }),
      t >= 100 &&
        ((shake = Math.max(shake, Math.min(10, 2 + (t - 100) / 10))),
        t % 3 == 0 &&
          parts.push({
            x: camX + 192 * rnd(),
            y: camY + 2,
            vx: 0.3 * (rnd() - 0.5),
            vy: 0.5 + 0.5 * rnd(),
            g: 0.02,
            life: 70,
            c: "#9a9a8a",
            s: 1 + (rnd() < 0.3),
          })));
  } else if (ph === 9) {
    try {
      snakeBoss && (boss = snakePose(snakeBoss).head);
    } catch (e) {}
    const mt2 = snakeBoss ? snakeBoss.t : 0;
    (boss
      ? ((tx = boss.x - camX),
        (ty = boss.y - camY),
        (tz = mt2 >= 165 ? 1.05 : 1.45 + 0.35 * $dk(0, 150, mt2)))
      : ((tx = px), (ty = py), (tz = 1.2)),
      mt2 === 2 && !d.fired.b2 && ((d.fired.b2 = 1), $sx("rumble")),
      mt2 >= 20 &&
        mt2 < 150 &&
        mt2 % 6 == 0 &&
        ((shake = Math.max(shake, 8)),
        parts.push({
          x: snakeBoss.x + 30 * (rnd() - 0.5) * 2,
          y: floorY() - 2,
          vx: 2 * (rnd() - 0.5),
          vy: -1 - 2 * rnd(),
          g: 0.1,
          life: 30,
          c: "#aab4c4",
          s: 1.5,
        })),
      mt2 === 60 &&
        !d.fired.b60 &&
        ((d.fired.b60 = 1),
        $sx("slam"),
        (shake = Math.max(shake, 14)),
        boss &&
          addFx({
            k: "ring",
            x: boss.x,
            y: floorY(),
            r0: 4,
            r1: 60,
            c: "#ffe0a0",
            life: 20,
            sq: 0.2,
          })),
      mt2 === 120 &&
        !d.fired.b120 &&
        ((d.fired.b120 = 1),
        $sx("roar"),
        $sx("slam"),
        $sx("title"),
        (shake = 30),
        (d.fl = 0.85),
        (d.flc = "255,255,255"),
        (d.imp = 0.45),
        (d.z += 0.45),
        ($TT = { a: "MUTATED SNAKE", b: "GUARDIAN OF THE EXIT", t: 0, c: "#ff5a6a", boss: 1 }),
        boss &&
          [0, 1, 2].forEach((i) =>
            addFx({
              k: "ring",
              x: boss.x,
              y: boss.y,
              r0: 3 + 3 * i,
              r1: 50 + 22 * i,
              c: i ? "#ff9a9a" : "#ffffff",
              life: 22 + 8 * i,
            }),
          )),
      mt2 >= 170 && (d.tbar = 0));
  }
  ((d.tz = tz),
    (d.tfx = ph <= 3 ? 192 : 0.55 * tx + 0.45 * 96),
    (d.tfy = ph <= 3 ? 0.5 * ty + 0.5 * 54 : 0.55 * ty + 0.45 * 54));
  const k = 0.07;
  ((d.z += (d.tz - d.z) * k),
    (d.fx += (d.tfx - d.fx) * k),
    (d.fy += (d.tfy - d.fy) * k),
    (d.bar += (d.tbar - d.bar) * 0.07),
    (d.fl *= 0.9),
    d.warn > 0 && d.warn--);
  if (d.txt && d.cp < d.txt.length) {
    d.cp += 0.85;
    const c = Math.floor(d.cp);
    c !== d.lc &&
      ((d.lc = c),
      /[a-z0-9]/i.test(d.txt[c - 1] || "") && c % 3 == 0 && $sx("blip", d.who, d.txt[c - 1]));
  }
}

function $dTitle() {
  const c = $TT;
  if (!c) return;
  const u = ++c.t;
  if (u > 200) {
    $TT = null;
    return;
  }
  const al = Math.min(1, u / 12, (200 - u) / 20);
  if (al <= 0) return;
  const hh = c.boss ? 30 : 24,
    fs = c.boss ? 9 : 8,
    f = fs + 'px "Press Start 2P",monospace';
  (ctx.save(),
    (ctx.globalAlpha = al),
    fill("rgba(0,0,0,.55)", 0, 40, 192, hh),
    fill(c.c, 0, 40, 192, 0.5),
    fill(c.c, 0, 40 + hh - 0.5, 192, 0.5));
  const n = Math.min(c.a.length, Math.floor(u / 3)),
    s = c.a.slice(0, n),
    x = Math.round(96 - (fs * c.a.length) / 2);
  (text(s, x + 1, (c.boss ? 45 : 46) + 1, "#000", f),
    text(s, x, c.boss ? 45 : 46, c.boss ? "#ffffff" : "#fff6d0", f));
  if (u > 26) {
    const b = c.b.slice(0, Math.floor((u - 26) / 2));
    text(
      b,
      Math.round(96 - 2 * c.b.length),
      c.boss ? 61 : 58,
      c.c,
      '4px "Press Start 2P",monospace',
    );
  }
  ctx.restore();
}
function $dCam() {
  const d = cine.d;
  (ctx.translate(d.fx, d.fy), ctx.scale(d.z, d.z), ctx.translate(-d.fx, -d.fy));
}
function $dOv() {
  const a = cine,
    d = a.d;
  if (!d) {
    (fill("#000", 0, 0, 192, 10), fill("#000", 0, 98, 192, 10));
    return;
  }
  const ph = a.ph,
    T = tick;
  /* world-space effects (still inside the camera zoom) */
  if (d.eyes && ph <= 1)
    for (const [ox, sl] of [
      [182, 0],
      [187.5, 1],
    ]) {
      const ex = ox - camX,
        ey = 274 - camY,
        bl = (T >> 3) % 9 == 0 ? 0 : 1;
      (glow(ex + 1.5, ey + 1, 8, "255,190,30", 0.55),
        bl &&
          (fill("#ffd23a", ex, ey, 3, 2),
          fill("#fff2a0", ex, ey, 3, 0.5),
          fill("#1a0a00", ex + 1.2, ey, 0.7, 2)));
    }
  if (d.eyes2 && room === "exitlab")
    for (let i = 0; i < 14; i++) {
      const x = 24 + r(i, 81) * 400,
        y = 14 + r(i, 82) * 84,
        bl = ((T >> 3) + i * 7) % 23 == 0 ? 0 : 1,
        al = (0.25 + 0.25 * Math.sin(T / 40 + i)) * bl;
      if (al <= 0.02) continue;
      const ex = x - camX,
        ey = y - camY;
      ((ctx.globalAlpha = al),
        fill(i % 3 ? "#ffd23a" : "#ff4a3a", ex, ey, 1.5, 1),
        fill(i % 3 ? "#ffd23a" : "#ff4a3a", ex + 3.5, ey, 1.5, 1),
        (ctx.globalAlpha = 1));
    }
  if (room === "exitlab" && ((ph === 8 && a.t > 110) || ph === 9)) {
    const p = ph === 9 ? 1 : $dk(110, 190, a.t),
      bx = 0.6 * roomW() - camX,
      y = floorY() - camY + 1;
    glow(bx, y, 34, "90,255,140", 0.28 * p);
    for (let i = 0; i < 16; i++) {
      const ox = (i - 8) * 4 + 3 * Math.sin(i * 2.3),
        len = 3 + 4 * r(i, 5) * p;
      (fill("#04060a", bx + ox, y, 1.5, len * p * (0.5 + r(i, 6))),
        fill("#04060a", bx + ox + 1, y + len * 0.5 * p, 1, len * 0.5 * p));
    }
  }
  /* undo the camera zoom for screen-space overlays */
  (ctx.save(), ctx.translate(d.fx, d.fy), ctx.scale(1 / d.z, 1 / d.z), ctx.translate(-d.fx, -d.fy));
  if (d.fl > 0.01)
    ((ctx.fillStyle = "rgba(" + d.flc + "," + Math.min(1, d.fl).toFixed(3) + ")"),
      ctx.fillRect(0, 0, 192, 108));
  if (d.red > 0 && ph <= 3)
    ((ctx.fillStyle = "rgba(255,20,40," + (0.05 + 0.09 * d.red).toFixed(3) + ")"),
      ctx.fillRect(0, 0, 192, 108));
  {
    const g = ctx.createRadialGradient(96, 54, 34, 96, 54, 118);
    (g.addColorStop(0, "rgba(0,0,0,0)"),
      g.addColorStop(1, "rgba(0,0,10," + (0.45 + 0.15 * Math.sin(T / 20)).toFixed(2) + ")"),
      (ctx.fillStyle = g),
      ctx.fillRect(0, 0, 192, 108));
  }
  /* WARNING banner */
  if (d.warn > 0) {
    const w = d.warn,
      al = Math.min(1, w / 10, (70 - w) / 8),
      off = (T * 1.6) % 16;
    ((ctx.globalAlpha = Math.max(0, al) * 0.92), fill("#1a0508", 0, 36, 192, 22));
    for (let i = -1; i < 14; i++)
      (fill("#ffcc20", i * 16 + off - 16, 36, 8, 2), fill("#ffcc20", i * 16 - off + 16, 56, 8, 2));
    if ((T >> 2) % 2) {
      text("WARNING", 96 - 14 * 3.5, 41, "#ff3a3a", '7px "Press Start 2P",monospace');
      text(
        "BIOHAZARD SIGNATURE DETECTED",
        96 - 28 * 2,
        51,
        "#ffd0d0",
        '4px "Press Start 2P",monospace',
      );
    }
    ctx.globalAlpha = 1;
  }
  $dTitle();
  /* letterbox + dialogue */
  const Bh = Math.round(13 * Math.max(0, d.bar));
  if (Bh > 0) {
    (fill("#000", 0, 0, 192, Bh),
      fill("#000", 0, 108 - Bh, 192, Bh),
      fill("rgba(255,255,255,.12)", 0, 108 - Bh, 192, 0.5),
      fill("rgba(255,255,255,.12)", 0, Bh - 0.5, 192, 0.5));
    if (d.txt && Bh >= 12) {
      const f = '4px "Press Start 2P",monospace',
        pl = d.who === "p",
        nm = pl
          ? String(playerName || "YOU")
              .toUpperCase()
              .slice(0, 10)
          : "",
        pre = pl ? nm + ": " : "",
        cap1 = 46 - pre.length,
        words = d.txt.split(" "),
        rows = ["", ""];
      let ri = 0;
      for (const w of words) {
        const lim = ri ? 46 : cap1;
        if ((rows[ri] + (rows[ri] ? " " : "") + w).length > lim && ri < 1) ri++;
        rows[ri] += (rows[ri] ? " " : "") + w;
      }
      const full = pre + rows[0] + (rows[1] ? "\n" + rows[1] : ""),
        n = Math.floor(d.cp) + (pl ? pre.length : 0);
      let y0 = 108 - Bh + 2.5,
        sh = 0;
      const col = pl ? "#e8f2ff" : "#b8c8ff",
        tx0 = pl ? 0 : Math.round(96 - 2 * Math.max(rows[0].length, rows[1].length));
      const draw = (s, x, y, c) => {
        (text(s, x + 1, y + 1, "#000", f), text(s, x, y, c, f));
      };
      const r0 = pre + rows[0],
        r0v = r0.slice(0, Math.max(0, n)),
        r1v = rows[1].slice(0, Math.max(0, n - r0.length));
      if (pl) {
        draw(r0v.slice(0, pre.length), 4, y0, "#9aff9a");
        draw(r0v.slice(pre.length), 4 + 4 * pre.length, y0, col);
      } else draw(r0v, tx0, y0, col);
      rows[1] && draw(r1v, pl ? 4 : tx0, y0 + 5, col);
    }
  }
  ctx.restore();
}
