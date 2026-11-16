/* CHAPTER 2 WORLD: the burned-out city, plus trees and vines you can climb.
   - Trees have two branches (one-way platforms) and a vine hanging from the high one. Sign gantries cross the
     highway with a beam you can reach by climbing their vines.
   - Hold UP / JUMP next to a vine to climb it, DOWN / USE to slide, LEFT or RIGHT to let go.
   - Some vines and branches are rotten. They give a split second of warning (creak, shaking), then SNAP.
   - Falling from a tree, vine or gantry costs hearts by how far you drop. Cars and normal jumps are safe. */
const C2_F = {};
let c2sup = 0,
  c2tree = 0,
  c2air = 0,
  c2hint = 0,
  c2snapped = 0;

function c2Flora(id, d) {
  const f = (C2_F[id] = { trees: [], vines: [], branches: [], gantries: [], smoke: [] }),
    plats = rooms[id].plats,
    sd = 5 * d.seeds[0],
    add = (b) => {
      b.p = { x: b.side < 0 ? b.x - b.len : b.x, y: C2_FLOOR - b.h, w: b.len, br: b };
      plats.push(b.p);
      f.branches.push(b);
    },
    vine = (x, top, len, rot, dir, s) =>
      f.vines.push({
        x,
        top,
        len,
        rot: rot ? 1 : 0,
        dir,
        s,
        t: 0,
        snapY: top + len * (0.15 + 0.7 * r(s, 9)),
        broken: 0,
      }),
    n = id === "highway" ? 9 : id === "road" ? 3 : 2,
    span = (d.W - 300) / n;
  for (let i = 0; i < n; i++) {
    const x = Math.round(170 + span * (i + 0.5) + (r(i, sd) - 0.5) * span * 0.5),
      side = r(i, sd + 2) < 0.5 ? -1 : 1,
      t = {
        x,
        side,
        dead: r(i, sd + 1) < (id === "highway" ? 0.5 : 0.3),
        top: 72 + 14 * r(i, sd + 3),
        s: sd + i,
      },
      low = {
        x,
        side,
        h: 30 + 4 * r(i, sd + 4),
        len: 26 + 8 * r(i, sd + 5),
        rot: 0,
        load: 0,
        snapT: 0,
        gone: 0,
      },
      up = {
        x,
        side: -side,
        h: 52 + 8 * r(i, sd + 6),
        len: 30 + 10 * r(i, sd + 7),
        rot: r(i, sd + 8) < 0.4 ? 1 : 0,
        load: 0,
        snapT: 40 + ((70 * r(i, sd + 9)) | 0),
        gone: 0,
      };
    t.br = [low, up];
    add(low);
    add(up);
    vine(
      x + up.side * up.len,
      C2_FLOOR - up.h,
      up.h - 6,
      r(i, sd + 10) < 0.45,
      -up.side,
      sd + 3 * i,
    );
    f.trees.push(t);
  }
  if (id === "highway")
    [470, 880, 1230].forEach((gx, k) => {
      const g = { x: gx, w: 104, h: 72, k },
        a = r(gx, 3) < 0.5;
      f.gantries.push(g);
      plats.push({ x: gx, y: C2_FLOOR - g.h, w: g.w, gan: 1 });
      vine(gx + 7, C2_FLOOR - g.h, g.h - 6, a, 1, gx);
      vine(gx + g.w - 7, C2_FLOOR - g.h, g.h - 6, !a && r(gx, 4) < 0.7, -1, gx + 1);
    });
  f.smoke = {
    street: [
      [90, 60],
      [300, 66],
    ],
    road: [
      [150, 64],
      [420, 60],
    ],
    highway: [
      [260, 64],
      [640, 60],
      [1010, 66],
      [1380, 62],
    ],
  }[id];
}
for (const k in C2) c2Flora(k, C2[k]);

/* ---------- backdrop pieces (painted into the room texture) ---------- */
function c2Apoc(t, i) {
  for (let y = 0; y < 184; y++) {
    const up = Math.max(0, 1 - y / 110),
      low = Math.max(0, (y - 40) / 144);
    up > 0 && t.rect(0, y, 384, 1, "#1a100c", 0.62 * up);
    t.rect(0, y, 384, 1, "#c8501c", 0.42 * low * low);
  }
  for (let k = 0; k < 16; k++) {
    const x = 384 * r(k, 300 + i),
      y = 96 + 52 * r(k, 310 + i);
    t.rect(x - 1, y - 1, 4, 4, "#ff7020", 0.16);
    t.rect(x, y, 2, 2, "#ffa040", 0.9);
  }
  const ox = 30 + 200 * r(i, 320),
    oy = 118 + 8 * r(i, 321),
    ow = 120 + 60 * r(i, 330);
  for (let p = ox + 10; p < ox + ow - 8; p += 34)
    t.rect(p, oy + 5, 5, 184 - oy - 5, "#262a2c", 0.8);
  t.rect(ox, oy, ow, 5, "#2a2e30", 0.9);
  t.rect(ox, oy, ow, 1, "#4a5054", 0.9);
  for (let k = 0; k < 5; k++)
    t.line(ox + ow + k * 2, oy + 4, ox + ow + k * 2 + (k % 2 ? 4 : -2), oy + 12 + k * 3, "#5a3a22");
  t.rect(ox - 4, oy - 2, ow + 16, 60, "#9ab0a8", 0.12);
  t.rect(0, 150, 384, 34, "#2a1c16", 0.22);
}
function c2Ground(t, i) {
  for (let k = 0; k < 2; k++) {
    const x = 40 + 300 * r(k, 170 + i),
      w = 22 + 14 * r(k, 171 + i);
    for (let y = 0; y < 5; y++) t.rect(x + y, 190 + y * 2, w - 2 * y, 2, "#17191a");
    t.rect(x, 189, w, 1, "#5a5e5e");
    for (let b = 0; b < 4; b++)
      t.line(x + 3 + b * 5, 190, x + 6 + b * 5, 183 - 2 * (b % 2), "#6a3a22");
  }
  for (let k = 0; k < 26; k++)
    t.rect(
      384 * r(k, 180 + i),
      186 + 26 * r(k, 181 + i),
      1 + 3 * r(k, 182 + i),
      1 + 2 * r(k, 183 + i),
      r(k, 184) < 0.5 ? "#4e5250" : "#3a3e3c",
    );
  const tx = 40 + 240 * r(i, 185);
  t.rect(tx, 168, 2, 16, "#5a5e60");
  t.rect(tx + 54, 168, 2, 16, "#5a5e60");
  for (let x = 0; x < 54; x += 2)
    t.rect(tx + x, 174 + (x * 3) / 54, 2, 2, (x >> 1) % 2 ? "#e8a020" : "#1a1a1a");
  for (let k = 0; k < 3; k++) {
    const x = 384 * r(k, 190 + i);
    for (let y = 0; y < 5; y++)
      t.rect(x - y, 186 + 18 * r(k, 191 + i) + y, 14 + 2 * y, 1, "#0e0f10", 0.35);
  }
}
/* the radio tower on the far hill beyond the tunnel */
function c2Tower(t) {
  const x = 190,
    base = 150,
    top = 40;
  t.rect(x - 22, top, 44, base - top, "#9ab0aa", 0.1);
  for (let y = top; y < base; y++) {
    const w = 2 + (12 * (y - top)) / (base - top);
    t.rect(x - w / 2, y, 1, 1, "#34403f");
    t.rect(x + w / 2, y, 1, 1, "#34403f");
    y % 9 === 0 && t.rect(x - w / 2, y, w + 1, 1, "#34403f");
    y % 18 === 0 && t.line(x - w / 2, y, x + w / 2, y + 9, "#34403f");
    y % 18 === 9 && t.line(x + w / 2, y, x - w / 2, y + 9, "#34403f");
  }
  t.rect(x, top - 10, 1, 12, "#34403f");
  t.rect(x - 15, base, 30, 6, "#2e363a");
  t.rect(x - 15, base, 30, 1, "#56666a");
}

/* ---------- drawing ---------- */
function c2Smoke(f) {
  f.smoke.forEach((s, i) => {
    if (s[0] < camX - 70 || s[0] > camX + 260) return;
    for (let k = 0; k < 16; k++) {
      const a = ((tick * 0.35 + k * 12 + i * 31) % 192) / 192,
        sz = 2 + a * 11;
      ctx.globalAlpha = 0.34 * (1 - a) * Math.min(1, a * 6);
      fill(
        k % 3 ? "#2e2826" : "#4a403c",
        s[0] + a * 34 + 3 * Math.sin(tick / 50 + k + i) - sz / 2,
        s[1] - a * 78 - sz / 2,
        sz,
        sz * 0.8,
      );
    }
  });
  ctx.globalAlpha = 1;
}
function c2Fire(c) {
  const top = C2_FLOOR - c.h,
    n = Math.max(3, Math.floor(c.w / 7));
  for (let k = 0; k < n; k++) {
    const x = c.x + 4 + (k * (c.w - 8)) / (n - 1),
      ph = tick / 3.2 + k * 1.7 + c.s,
      h = 6 + 4 * Math.sin(ph) + 3 * Math.sin(ph * 2.3 + 1);
    fill("#d8421c", x - 1.5, top - h, 3, h + 1);
    fill("#ff8a30", x - 1, top - h * 0.7, 2, h * 0.7);
    fill("#ffd868", x - 0.5, top - h * 0.4, 1, h * 0.4);
  }
  glow(c.x + c.w / 2, top - 3, c.w * 0.8, "255,140,50", 0.3 + 0.1 * Math.sin(tick / 5 + c.s));
  for (let k = 0; k < 3; k++) {
    const a = ((tick * 0.6 + k * 40 + c.s * 13) % 90) / 90;
    fill(
      "#ffb050",
      c.x + 4 + (c.w - 8) * r(k, c.s) + 5 * Math.sin(a * 6 + k),
      top - 4 - a * 34,
      0.5,
      0.5,
    );
  }
}
function c2Gantry(g) {
  if (g.x < camX - 130 || g.x > camX + 260) return;
  const y = C2_FLOOR - g.h;
  [g.x, g.x + g.w - 4].forEach((px) => {
    fill("#3a3e40", px, y, 4, g.h);
    fill("#5a5e60", px, y, 1, g.h);
    for (let k = 0; k < 5; k++) fill("#6a3a22", px + 1, y + 8 + 13 * k + 3 * r(k, g.x), 2, 3);
  });
  fill("#4a4e50", g.x - 4, y, g.w + 8, 4);
  fill("#6a6e70", g.x - 4, y, g.w + 8, 1);
  for (let k = 0; k < 10; k++) fill("#2a2c2e", g.x + 2 + k * 10, y + 2, 1, 1);
  fill("#0e2a1c", g.x + 25, y + 5, 54, 21);
  fill("#1c4a30", g.x + 26, y + 6, 52, 19);
  fill("#d8e8d8", g.x + 26, y + 6, 52, 1);
  text("RADIO STN", g.x + 29, y + 9, "#e8f0e8", '4px "Press Start 2P",monospace');
  text(
    ["4", "2", "1"][g.k] + " MI <",
    g.x + 35,
    y + 17,
    "#ffe070",
    '4px "Press Start 2P",monospace',
  );
  for (let k = 0; k < 14; k++) fill("#5a3a22", g.x + 28 + 3.5 * k, y + 22 + 2 * r(k, g.x), 1, 2);
}
function c2Twigs(x, y, L, s) {
  ctx.strokeStyle = "#1c1612";
  ctx.lineWidth = 0.6;
  for (let k = 0; k < 5; k++) {
    const a = -0.4 - (k * 2.3) / 5 + 0.2 * Math.sin(s + k),
      ex = x + Math.cos(a) * L * 1.2,
      ey = y + Math.sin(a) * L * 1.2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(ex, ey);
    ctx.lineTo(ex + Math.cos(a + 0.6) * L * 0.5, ey + Math.sin(a + 0.6) * L * 0.5);
    ctx.moveTo(ex, ey);
    ctx.lineTo(ex + Math.cos(a - 0.5) * L * 0.5, ey + Math.sin(a - 0.5) * L * 0.5);
    ctx.stroke();
  }
}
function c2Crown(x, y, rad, s) {
  for (let k = 0; k < 7; k++) {
    const a = (k / 7) * 6.283,
      cx = x + Math.cos(a) * rad * 0.8 + 1.5 * Math.sin(tick / 90 + k + s),
      cy = y + Math.sin(a) * rad * 0.5;
    ctx.fillStyle = k % 2 ? "#2a6a30" : "#3a8a3a";
    ctx.beginPath();
    ctx.arc(cx, cy, rad * 0.55, 0, 7);
    ctx.fill();
  }
  ctx.fillStyle = "#5aaa4a";
  ctx.beginPath();
  ctx.arc(x - rad * 0.25, y - rad * 0.3, rad * 0.35, 0, 7);
  ctx.fill();
}
function c2Branch(t, b) {
  const y = C2_FLOOR - b.h,
    stub = b.gone ? 6 : b.len,
    warn = b.rot && !b.gone && b.load > b.snapT - 16,
    jx = warn ? (Math.random() - 0.5) * 1.2 : 0,
    jy = warn ? (Math.random() - 0.5) * 1.2 : 0,
    col = b.rot ? "#6a5a48" : t.dead ? "#26201a" : "#3a2a1c",
    hi = b.rot ? "#9a8a70" : t.dead ? "#3a3028" : "#5a4430";
  for (let s = 0; s < stub; s++) {
    const xx = b.side < 0 ? b.x - s - 1 : b.x + s,
      th = 3 - 1.6 * (s / b.len);
    fill(col, xx + jx, y + jy, 1, th);
    fill(hi, xx + jx, y + jy, 1, 1);
  }
  if (b.gone) {
    for (let k = 0; k < 3; k++) fill("#9a8a70", b.x + b.side * (5 + k), y - 1 + k, 1, 1);
    return;
  }
  if (b.rot)
    for (let k = 0; k < 3; k++) {
      const s = b.len * (0.25 + 0.25 * k);
      fill("#2a2218", b.side < 0 ? b.x - s : b.x + s, y + 1, 1, 2);
    }
  const tx = b.side < 0 ? b.x - b.len : b.x + b.len;
  t.dead ? c2Twigs(tx, y, 5, b.h + b.len) : c2Crown(tx, y - 1, 6, b.h + b.len);
}
function c2Tree(t) {
  if (t.x < camX - 80 || t.x > camX + 270) return;
  const g = C2_FLOOR,
    dark = t.dead ? "#1c1612" : "#2a1e14",
    lite = t.dead ? "#2e2620" : "#4a3624";
  Ft(t.x, g + 1, 14, 0.4);
  for (let y = 0; y < t.top; y++) {
    const w = 5 - 2 * (y / t.top) + (y < 5 ? 2 - y * 0.4 : 0),
      lean = Math.sin(y / 18 + t.s) * 0.8;
    fill(dark, t.x - w / 2 + lean, g - y, w, 1);
    fill(lite, t.x - w / 2 + lean, g - y, 1, 1);
  }
  t.br.forEach((b) => c2Branch(t, b));
  t.dead ? c2Twigs(t.x, g - t.top, 8, t.s) : c2Crown(t.x, g - t.top, 12, t.s);
}
function c2Vine(v) {
  if (v.x < camX - 20 || v.x > camX + 212) return;
  const sw = (y) =>
    Math.sin(tick / 40 + v.s) * 1.3 * (y / v.len) +
    (player.climb === v ? Math.sin(tick / 6) * 0.4 : 0);
  if (v.broken) {
    for (let y = 0; y < 7; y++) fill("#2a4a2a", v.x + Math.sin(y) * 0.6, v.top + y, 1, 1);
    return;
  }
  const warn = v.rot && player.climb === v && player.y <= v.snapY + 14;
  for (let y = 0; y < v.len; y++) {
    const x = v.x + sw(y) + (warn ? (Math.random() - 0.5) * 1.4 : 0);
    fill(
      v.rot ? (y % 4 ? "#5a5428" : "#7a6a34") : y % 4 ? "#1f5a2c" : "#2f7a3a",
      x,
      v.top + y,
      1,
      1,
    );
    y % 6 === 3 &&
      fill(v.rot ? "#6a6030" : "#3a9a46", x + (y % 12 === 3 ? 1 : -2), v.top + y, 2, 1);
    v.rot && y % 17 === 9 && fill("#2a2410", x, v.top + y, 1, 2);
    !v.rot && y % 11 === 5 && fill("#ff86d0", x + 1, v.top + y, 1, 1);
  }
}
/* warm smoky grade over everything in the world, ash drifting through the air */
function c2Tint() {
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = "rgb(226,186,158)";
  ctx.fillRect(0, 0, 192, 108);
  ctx.globalCompositeOperation = "source-over";
  const gr = ctx.createLinearGradient(0, 0, 0, 108);
  gr.addColorStop(0, "rgba(24,14,10,.42)");
  gr.addColorStop(0.45, "rgba(24,14,10,0)");
  gr.addColorStop(1, "rgba(140,50,12,.2)");
  ctx.fillStyle = gr;
  ctx.fillRect(0, 0, 192, 108);
  ctx.restore();
}
function c2Ash() {
  for (let k = 0; k < 64; k++) {
    const sp = 0.25 + 0.15 * (k % 3),
      x = camX + ((((r(k, 1) * 230 - tick * sp) % 230) + 230) % 230) - 19,
      y = ((r(k, 2) * 130 + tick * (0.18 + 0.1 * (k % 4))) % 130) - 10;
    fill(
      k % 9 === 0 ? "#ff9a40" : "rgba(214,204,194,.6)",
      x,
      y,
      k % 5 === 0 ? 1 : 0.5,
      k % 5 === 0 ? 1 : 0.5,
    );
  }
}
function c2Scenery(d) {
  const f = C2_F[room];
  c2Smoke(f);
  f.gantries.forEach(c2Gantry);
  f.trees.forEach(c2Tree);
  f.vines.forEach(c2Vine);
  c2Ash();
  if (room === "highway" && camX < 170) {
    const on = tick % 100 < 16;
    on && (fill("#ff3030", 94, 14.5, 2, 2), glow(95, 15.5, 12, "255,40,40", 0.55));
    glow(95, 15.5, 5, "255,40,40", 0.12);
  }
}

/* ---------- climbing, snapping and falling ---------- */
function c2Standing() {
  const f = C2_F[room];
  if (!player.on || !f) return 0;
  for (const p of rooms[room].plats)
    if (
      (p.br || p.gan) &&
      !p.gone &&
      Math.abs(player.y - p.y) < 0.6 &&
      player.x > p.x - 3 &&
      player.x < p.x + p.w + 3
    )
      return p;
  return 0;
}
function c2Snap(v) {
  v.broken = 1;
  player.climb = null;
  player.vy = 0.4;
  $sx("snap");
  shake = Math.max(shake, 7);
  sparks(v.x, player.y - 12, 12, ["#3a8a3a", "#7a6a34", "#d8c890"], 1.6, 0.14, 20);
  c2snapped++ || toast("<b>SNAP!</b><br>That one was rotten. Look out below.", 2600);
}
function c2Break(b) {
  b.gone = 1;
  b.p.gone = 1;
  $sx("snap");
  shake = Math.max(shake, 8);
  const x = b.side < 0 ? b.x - b.len / 2 : b.x + b.len / 2;
  sparks(x, C2_FLOOR - b.h, 16, ["#6a5a48", "#9a8a70", "#2a2218"], 1.8, 0.16, 22);
  c2snapped++ || toast("<b>SNAP!</b><br>That branch was rotten. Look out below.", 2600);
}
function c2Fall(n) {
  if (Eo.god || dead) return;
  hp -= n;
  invuln = 60;
  hurtFlash = 16;
  hitStop = Math.max(hitStop, 3);
  shake = Math.min(18, 6 + 3 * n);
  $sx("hurt");
  smoke(player.x - 3, player.y, 5, -1);
  smoke(player.x + 3, player.y, 5, 1);
  addFx({ k: "ring", x: player.x, y: player.y, r0: 2, r1: 16, c: "#ff8a8a", life: 14, sq: 0.3 });
  updateHud();
  hp <= 0
    ? (c2Die(
        "YOU FELL",
        "Rotten wood gives no warning you can count on. Test the way up: vines and branches that look dry can snap. Drop the last stretch yourself, or stay on the cars.",
      ),
      (hp = 0))
    : toast("<b>OUCH!</b> You fell: -" + n + " &#9829;", 2000);
}
function c2WorldUpdate() {
  const f = C2_F[room];
  if (!f || dead) return;
  const cut = c2cut,
    free = !cut && !(ch2 && ch2.stuck > 0);
  if (!player.climb && keys.u && free)
    for (const v of f.vines)
      if (
        !v.broken &&
        Math.abs(player.x - v.x) < 4.5 &&
        player.y > v.top + 8 &&
        player.y < v.top + v.len + 10
      ) {
        ((player.climb = v),
          (player.x = v.x),
          (player.vx = player.vy = 0),
          (v.t = 0),
          $sx("click"));
        break;
      }
  const v = player.climb;
  if (v) {
    coyote = 0;
    jumpBuf = 0;
    if (v.broken) player.climb = null;
    else {
      if (v.rot && player.y <= v.snapY + 14) {
        v.t++ || ($sx("creak"), (shake = Math.max(shake, 2)));
        (player.y <= v.snapY || v.t > 40) && c2Snap(v);
      }
      if (player.climb && player.on && !keys.u) player.climb = null;
      else if (player.climb && player.y <= v.top + 3)
        ((player.climb = null), (player.vy = -2.6), (player.kb = 7), (player.kbv = v.dir));
    }
  }
  /* fall damage: measured from where you last had support (over 34 px hurts), and only for falls that began in a tree,
     on a vine or on a gantry (jumping between cars is free) */
  if (player.climb || player.on) {
    if (player.on && c2air) {
      const d = player.y - c2sup;
      c2air = 0;
      c2tree && d > 34 && c2Fall(Math.floor((d - 34) / 20) + 1);
    }
    if (player.climb || player.on) {
      c2sup = player.y;
      c2tree = player.climb ? 1 : c2Standing() ? 1 : 0;
    }
    player.climb && (c2air = 1);
  } else c2air = 1;
  for (const b of f.branches) {
    if (b.gone || !b.rot) continue;
    const on =
      player.on &&
      Math.abs(player.y - b.p.y) < 0.6 &&
      player.x > b.p.x - 3 &&
      player.x < b.p.x + b.p.w + 3;
    b.load = on ? b.load + 1 : Math.max(0, b.load - 2);
    b.load === b.snapT - 16 && ($sx("creak"), (shake = Math.max(shake, 2)));
    b.load >= b.snapT && c2Break(b);
  }
  /* a hint the first time a vine is close */
  if (!c2hint && !cut && f.vines.some((q) => !q.broken && Math.abs(q.x - player.x) < 34)) {
    c2hint = 1;
    toast(
      "<b>VINES</b><br>Hold UP / JUMP next to a vine to climb. DOWN slides, LEFT / RIGHT lets go. Rotten ones SNAP!",
      4600,
    );
  }
}
