/* CHAPTER 2: ON FOOT
   Quest: reach the radio station. You walk LEFT from the lab street, along the road, onto the highway,
   where the giant mutated spider from the opening cutscene (Ea variant 2) hunts you down. Side-view chase:
   wrecked cars are solid (jump onto them), the spider spits webs and a red arc + target shows where each
   web will land. A web hit costs a heart and sticks you in place; touching a landed web sticks you too.
   Reach the tunnel on the far left: the spider is too big to follow. */
const C2_FLOOR = 92,
  C2_SP_S = 1.35 /* spider draw scale: about twice the player's height */,
  C2_SP_HEAD = 76 /* anchor -> tips of the front legs, in room px (measured from Ea at this scale) */,
  C2_TUNNEL = 52; /* tunnel mouth: right edge of the portal */
const C2_CAR = {
  sedan: [38, 19],
  hatch: [34, 17],
  van: [44, 24],
  truck: [62, 29],
  bus: [76, 28],
};
const C2_COLS = ["#8a3a26", "#3a6a5a", "#2a5a8a", "#a8862a", "#6a6e70", "#b8b4a4", "#5a3a5a"];
const c2NewCar = (x, k, i) => ({
  x,
  k,
  w: C2_CAR[k][0],
  h: C2_CAR[k][1],
  c: C2_COLS[i % C2_COLS.length],
  f: i % 2 ? 1 : -1,
  s: i,
  burn: i % 4 === 1,
});
function c2HighwayCars() {
  const seq = [
      "sedan",
      "van",
      "hatch",
      "truck",
      "sedan",
      "bus",
      "hatch",
      "van",
      "sedan",
      "truck",
      "hatch",
      "bus",
    ],
    cars = [];
  let x = 1300;
  for (let i = 0; x > 150; i++) {
    const k = seq[i % seq.length],
      c = c2NewCar(x - C2_CAR[k][0], k, i + 3);
    if (c.x < 120) break;
    cars.push(c);
    x = c.x - (46 + 40 * r(i, 57));
  }
  return cars;
}
const C2 = {
  street: {
    name: "CITY STREET",
    L: "road",
    R: null,
    W: 384,
    cars: [c2NewCar(196, "sedan", 0)],
    seeds: [21, 22],
  },
  road: {
    name: "THE ROAD",
    L: "highway",
    R: "street",
    W: 576,
    cars: [c2NewCar(430, "hatch", 1), c2NewCar(292, "van", 2), c2NewCar(120, "sedan", 4)],
    seeds: [31, 32, 33],
  },
  highway: {
    name: "HIGHWAY",
    L: null,
    R: "road",
    W: 1536,
    cars: c2HighwayCars(),
    seeds: [41, 42, 43, 44],
  },
};
for (const k in C2) {
  const d = C2[k];
  rooms[k] = {
    name: d.name,
    L: d.L,
    R: d.R,
    W: d.W,
    crates: [],
    items: [],
    ints: [],
    plats: d.cars.map((c) => ({ x: c.x, y: C2_FLOOR - c.h, w: c.w })),
  };
}
Object.assign(Ne, {
  street: ["255,170,110", 0, 0],
  road: ["255,170,110", 0, 0],
  highway: ["255,160,100", 0, 0],
});
Object.assign(De, {
  street: { c: "160,100,70", l: "255,176,110", a: 0.14, dk: 0.3 },
  road: { c: "150,100,70", l: "255,170,104", a: 0.15, dk: 0.32 },
  highway: { c: "150,96,66", l: "255,164,100", a: 0.17, dk: 0.36 },
});

/* chase state: null outside the highway */
let ch2 = null;

/* ---------- backdrops: the overgrown city painter, stitched into wide rooms ---------- */
function c2Backdrop(id) {
  const d = C2[id],
    cv = document.createElement("canvas");
  cv.width = 2 * d.W;
  cv.height = 216;
  const g = cv.getContext("2d"),
    tiles = d.seeds.map((seed, i) =>
      Ae((t) => {
        Ye(t, 0, 184, {
          hs: id === "street" ? 1.2 : 1,
          seed,
          grassH: id === "highway" ? 10 : 18,
          sun: 60 + 70 * i,
          bh: id === "highway" ? 0.8 : 1.1,
          puddles: id === "highway" ? [] : [[90 + 40 * i, 204, 30, 4]],
          cars: [],
        });
        c2Apoc(t, i);
        id === "highway"
          ? (c2Deck(t, i), c2Ground(t, i))
          : (t.fog(0, 150, 384, 216, "#d8f0c0", 0.3, seed, 34, 8, 0.2), c2Ground(t, i));
      }),
    );
  /* tiles overlap by 48 px and cross-fade, so the sky and skyline have no seams */
  const OV = 48,
    mask = document.createElement("canvas");
  mask.width = 384;
  mask.height = 216;
  for (let i = 0; i * (384 - OV) < 2 * d.W; i++) {
    const m = mask.getContext("2d");
    m.globalCompositeOperation = "source-over";
    m.clearRect(0, 0, 384, 216);
    m.drawImage(tiles[i % tiles.length], 0, 0);
    if (i) {
      const gr = m.createLinearGradient(0, 0, 384, 0);
      gr.addColorStop(0, "rgba(0,0,0,0)");
      gr.addColorStop(OV / 384, "rgba(0,0,0,1)");
      gr.addColorStop(1, "rgba(0,0,0,1)");
      m.globalCompositeOperation = "destination-in";
      m.fillStyle = gr;
      m.fillRect(0, 0, 384, 216);
    }
    g.drawImage(mask, i * (384 - OV), 0);
  }
  if (id === "highway") {
    g.drawImage(Ae(c2Tower), 0, 0);
    g.drawImage(
      Ae((t) => c2Tunnel(t)),
      0,
      0,
    );
    g.font = '10px "Press Start 2P",monospace';
    g.textBaseline = "top";
    g.fillStyle = "#d8e8d8";
    g.fillText("TUNNEL", 30, 48);
    g.fillStyle = "#c83a2a";
    g.fillText("STILL HERE", 128, 170);
  }
  return cv;
}
/* highway deck: concrete barrier behind, cracked asphalt with lane marks in front */
function c2Deck(t, i) {
  t.rect(0, 166, 384, 18, "#7e8278");
  t.rect(0, 166, 384, 2, "#b8bcae");
  t.rect(0, 182, 384, 2, "#4a4e48");
  for (let x = (i * 17) % 48; x < 384; x += 48) t.rect(x, 168, 1, 14, "#5a5e56");
  for (let k = 0; k < 40; k++)
    t.rect(384 * r(k, 70 + i), 168 + 14 * r(k, 80 + i), 2, 1, "#6a6e64", 0.6);
  for (let k = 0; k < 9; k++) {
    const x = 384 * r(k, 90 + i),
      L = 4 + 10 * r(k, 91 + i);
    for (let y = 0; y < L; y++)
      t.rect(x + Math.sin(y * 0.7 + k) * 1.2, 166 + y, 1, 1, y % 3 ? [44, 110, 50] : [90, 170, 70]);
  }
  t.rect(0, 184, 384, 32, "#34383a");
  for (let k = 0; k < 220; k++)
    t.rect(
      384 * r(k, 100 + i),
      184 + 32 * r(k, 110 + i),
      1,
      1,
      r(k, 120) < 0.5 ? "#2a2e30" : "#44484a",
    );
  for (let x = (i * 31) % 40; x < 384; x += 40) t.rect(x, 199, 18, 2, "#c8b44a", 0.7);
  t.rect(0, 185, 384, 1, "#56595a");
  for (let k = 0; k < 6; k++) {
    let x = 384 * r(k, 130 + i),
      y = 186 + 20 * r(k, 131 + i);
    for (let s = 0; s < 12; s++) {
      t.rect(x, y, 1, 1, "#1e2224");
      x += 1 + (r(s, k + 140) < 0.5 ? 0 : 1);
      y += r(s, k + 150) < 0.5 ? -1 : 1;
    }
  }
  for (let k = 0; k < 18; k++) {
    const x = 384 * r(k, 160 + i),
      hh = 2 + 5 * r(k, 161 + i);
    t.rect(x, 184 - hh, 1, hh, [70, 150, 60]);
    t.rect(x + 1, 185 - hh * 0.7, 1, hh * 0.7, [40, 110, 50]);
  }
}
/* the tunnel the spider cannot fit into (left end of the highway) */
function c2Tunnel(t) {
  t.rect(0, 40, 112, 144, "#6e7068");
  t.rect(0, 40, 112, 4, "#a8ab9e");
  for (let y = 48; y < 184; y += 12) t.rect(0, y, 112, 1, "#5a5c54");
  t.rect(0, 64, 96, 120, "#06070a");
  for (let y = 64; y < 184; y++) {
    const k = (y - 64) / 120;
    t.rect(96 - 6 * (1 - k), y, 6 * (1 - k) + 1, 1, "#22242a");
  }
  for (let k = 0; k < 10; k++) t.rect(10 + 8 * k, 76 + 9 * (k % 3), 2, 2, "#ffcf6a", 0.25);
  t.rect(18, 46, 72, 12, "#1c4a2a");
  t.rect(19, 47, 70, 10, "#2a6a3a");
  for (let k = 0; k < 26; k++) {
    const x = 112 * r(k, 170),
      L = 6 + 30 * r(k, 171);
    for (let y = 0; y < L; y++)
      t.rect(x + Math.sin(y * 0.5 + k) * 1.5, 40 + y, 1, 1, y % 4 ? [34, 100, 46] : [100, 190, 80]);
  }
  t.rect(0, 184, 112, 32, "#2a2c2e", 0.6);
}

/* ---------- drawing ---------- */
const c2Mix = (a, b, k) => {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const x = p(a),
    y = p(b);
  return "rgb(" + x.map((v, i) => Math.round(v + (y[i] - v) * k)).join(",") + ")";
};
function c2Car(c) {
  if (c.x < camX - 90 || c.x > camX + 270) return;
  const j =
    c2cut && c2cut.rumble ? Math.round(Math.sin(tick * 1.9 + c.s * 2.1) * 1.4 * c2cut.rumble) : 0;
  j && (ctx.save(), ctx.translate(0, j));
  c2CarBody(c);
  c.burn && c2Fire(c);
  j && ctx.restore();
}
function c2CarBody(c) {
  const g = C2_FLOOR,
    x = c.x,
    w = c.w,
    h = c.h,
    lite = c2Mix(c.c, "#ffffff", 0.3),
    dark = c2Mix(c.c, "#000000", 0.45),
    rust = c2Mix(c.c, "#6a3a1a", 0.6);
  Ft(x + w / 2, g + 1, w * 0.62, 0.5);
  const bodyTop = c.k === "van" || c.k === "bus" ? g - h : g - Math.round(h * 0.58);
  if (c.k === "truck") {
    const cabW = 18,
      cabX = c.f > 0 ? x : x + w - cabW,
      boxX = c.f > 0 ? x + cabW + 1 : x;
    fill(dark, boxX, g - h, w - cabW - 1, h - 3);
    fill(c2Mix(c.c, "#c8c4b4", 0.5), boxX + 1, g - h + 1, w - cabW - 3, h - 5);
    for (let k = 4; k < w - cabW - 3; k += 6)
      fill(c2Mix(c.c, "#8a8678", 0.5), boxX + k, g - h + 2, 1, h - 7);
    fill(lite, boxX, g - h, w - cabW - 1, 1);
    fill(c.c, cabX, g - Math.round(h * 0.72), cabW, Math.round(h * 0.72) - 3);
    fill("#10161c", cabX + (c.f > 0 ? 2 : 6), g - Math.round(h * 0.72) + 2, 10, 6);
    fill("rgba(200,230,240,.35)", cabX + (c.f > 0 ? 3 : 7), g - Math.round(h * 0.72) + 3, 3, 1);
    fill(lite, cabX, g - Math.round(h * 0.72), cabW, 1);
  } else {
    fill(dark, x, bodyTop, w, g - 3 - bodyTop);
    fill(c.c, x + 1, bodyTop + 1, w - 2, g - 5 - bodyTop);
    fill(lite, x + 1, bodyTop, w - 2, 1);
    if (c.k === "van" || c.k === "bus") {
      const step = c.k === "bus" ? 10 : 12;
      for (let k = 4; k < w - 6; k += step) {
        fill("#10161c", x + k, bodyTop + 3, step - 4, 6);
        r(k, c.s) < 0.6 && fill("rgba(200,230,240,.3)", x + k + 1, bodyTop + 4, 2, 1);
      }
      c.k === "bus" && fill(c2Mix(c.c, "#e8d070", 0.5), x + 1, bodyTop + 11, w - 2, 2);
    } else {
      const cx = x + w * 0.22,
        cw = w * 0.56,
        ch = h - (g - bodyTop);
      for (let k = 0; k < ch; k++) {
        const ins = Math.round(((ch - k) / ch) * 3);
        fill(k === 0 ? lite : dark, cx + ins, g - h + k, cw - 2 * ins, 1);
      }
      fill("#10161c", cx + 3, g - h + 2, cw / 2 - 4, ch - 2);
      fill("#10161c", cx + cw / 2 + 1, g - h + 2, cw / 2 - 4, ch - 2);
      fill("rgba(200,230,240,.3)", cx + 4, g - h + 3, 2, 1);
    }
  }
  for (let k = 0; k < 5; k++)
    fill(
      rust,
      x + 2 + (w - 6) * r(k, c.s + 30),
      bodyTop + 2 + 5 * r(k, c.s + 31),
      2 + 2 * r(k, c.s + 32),
      1 + r(k, c.s + 33),
    );
  [x + 5, x + w - 11].forEach((wx) => {
    fill("#121418", wx, g - 6, 7, 6);
    fill("#4a4e52", wx + 2, g - 4, 3, 2);
  });
  for (let k = 0; k < 4; k++) {
    const vx = x + 3 + (w - 6) * r(k, c.s + 40),
      L = 3 + 6 * r(k, c.s + 41),
      top = c.k === "truck" ? g - h : g - h;
    for (let y = 0; y < L; y++)
      fill(y % 3 ? "#2a6a30" : "#4a9a3a", vx + Math.sin(y + k) * 0.8, top + y, 1, 1);
  }
}
function c2Spider(sp) {
  ctx.save();
  ctx.translate(Math.round(2 * sp.x) / 2, C2_FLOOR + 1 - (sp.oy || 0));
  ctx.scale(-1, 1);
  window.Ea(0, 0, C2_SP_S, sp.t * 36, 2);
  ctx.restore();
}
const c2Mouth = (sp) => [sp.x - 66, C2_FLOOR - 44];
const c2At = (w, k) => [
  w.sx + (w.tx - w.sx) * k,
  w.sy + (w.ty - w.sy) * k - (34 + 0.12 * Math.abs(w.tx - w.sx)) * Math.sin(Math.PI * k),
];
function c2Draw() {
  const d = C2[room];
  if (!d) return;
  c2Scenery(d);
  d.cars.forEach(c2Car);
  c2CutWorld();
  if (!ch2) return;
  ch2.patches.forEach((p) => {
    const a = Math.min(1, p.life / 60) * (p.used ? 0.45 : 1);
    ctx.globalAlpha = a;
    ctx.strokeStyle = "#eef4f0";
    ctx.lineWidth = 0.5;
    for (let k = 0; k < 8; k++) {
      const an = (k / 8) * Math.PI;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - 0.5);
      ctx.lineTo(p.x + Math.cos(an) * p.w * 0.55, p.y - 0.5 - Math.sin(an) * 4);
      ctx.stroke();
    }
    for (let k = 1; k <= 3; k++) {
      ctx.beginPath();
      ctx.ellipse(p.x, p.y - 0.5, (p.w * 0.55 * k) / 3, (4 * k) / 3, 0, Math.PI, 2 * Math.PI);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  });
  if (ch2.sp) c2Spider(ch2.sp);
  ch2.webs.forEach((w) => {
    if (w.t < w.tele) {
      /* telegraph: the red trajectory and the landing point */
      const k = w.t / w.tele,
        pulse = 0.5 + 0.5 * Math.sin(tick / 2.5),
        [mx, my] = c2Mouth(ch2.sp || { x: w.sx + C2_SP_HEAD });
      const ww = { sx: mx, sy: my, tx: w.tx, ty: w.ty };
      for (let s = 1; s < 22; s++) {
        if ((s + (tick >> 2)) % 3 === 0) continue;
        const [x, y] = c2At(ww, s / 22);
        fill("rgba(255,50,50," + (0.25 + 0.55 * k) + ")", x - 0.5, y - 0.5, 1, 1);
      }
      ctx.globalAlpha = 0.25 + 0.35 * k;
      fill("#ff2020", w.tx - 9, w.ty - 1, 18, 1);
      ctx.globalAlpha = 0.5 + 0.5 * pulse;
      for (let s = 0; s < 32; s++) {
        const an = (s / 32) * 6.283;
        fill("#ff3a3a", w.tx + Math.cos(an) * (6 + 2 * k), w.ty - 0.5 + Math.sin(an) * 1.6, 1, 0.5);
      }
      ctx.globalAlpha = 1;
      pulse > 0.4 &&
        (fill("#2a0000", w.tx - 1.5, w.ty - 16, 3, 9),
        fill("#ff4040", w.tx - 1, w.ty - 15.5, 2, 5),
        fill("#ff4040", w.tx - 1, w.ty - 9.5, 2, 2));
      glow(w.tx, w.ty, 10, "255,40,40", 0.25 + 0.3 * k);
    } else {
      const [x, y] = c2At(w, Math.min(1, (w.t - w.tele) / w.T));
      if (ch2.sp) {
        const [mx, my] = c2Mouth(ch2.sp);
        ctx.strokeStyle = "rgba(235,240,235,.45)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.quadraticCurveTo((mx + x) / 2, Math.min(my, y) - 10, x, y);
        ctx.stroke();
      }
      fill("#f4f8f4", x - 2, y - 2, 4, 4);
      fill("#c8d0cc", x - 1, y + 1, 2, 1);
      glow(x, y, 6, "230,240,235", 0.4);
    }
  });
  if (ch2.stuck > 0) {
    ctx.strokeStyle = "rgba(240,246,240,.8)";
    ctx.lineWidth = 0.5;
    for (let k = 0; k < 5; k++) {
      ctx.beginPath();
      ctx.moveTo(player.x - 6 + 3 * k, player.y);
      ctx.lineTo(player.x + 5 - 2.5 * k, player.y - 8 - 5 * k);
      ctx.stroke();
    }
  }
}
function c2Arrow() {
  modal || won || dead || c2cut || (ch2 && ch2.sp) || vo(camX + 18, 56, -1);
}

/* ---------- guide / quest ---------- */
function c2Guide() {
  qs("#gg h4 span").textContent = "QUEST";
  const q = "<b>Reach the radio station.</b><br>The way is hard. ";
  qs("#ggb").innerHTML =
    room === "street"
      ? q + "No car, no bus: you go on foot. Head LEFT."
      : room === "road"
        ? q + "Follow the road LEFT to the highway. Jump onto wrecks, or climb vines (hold UP)."
        : ch2 && ch2.sp
          ? "<b>RUN!</b><br>Jump on the cars. A red arc and mark show where the web lands: be somewhere else."
          : ch2 && ch2.heard
            ? "<b>Something is coming…</b><br>Keep moving LEFT."
            : q + "Cross the highway. Keep heading LEFT.";
}

/* ---------- save / start ---------- */
function c2Save(at) {
  try {
    localStorage.setItem(
      checkpointKey(),
      JSON.stringify({
        v: 1,
        ch: 2,
        at,
        inv: inv.filter((t) => t !== "potion"),
        got: [...got],
        hasGun,
        worn,
        gloved,
        hasGoggles,
      }),
    );
  } catch (t) {}
}
function c2Start(at) {
  c2seen = false;
  c2cut = null;
  const keep = {
    inv: inv.filter((t) => t !== "potion"),
    got: [...got],
    hasGun,
    worn,
    gloved,
    hasGoggles,
  };
  resetGame();
  ((inv = keep.inv), (got = new Set(keep.got)), (hasGun = keep.hasGun), (ammo = 4));
  ((worn = keep.worn), (gloved = keep.gloved), (hasGoggles = keep.hasGoggles));
  ((stage = 3), (exitOpen = !0), (bossDone = !0), (bossOpen = !0), (potionUsed = !0), (Tt = !0));
  enterRoom(at || "street", "R");
  c2Save(at || "street");
  (at || "street") === "street" &&
    toast(
      "<b>CHAPTER 2: ON FOOT</b><br>No cars run anymore. The radio station is far to the LEFT.",
      4200,
    );
  (updateBag(), updateGuide(), updateHud());
}
function c2Resume(cp) {
  inv = cp.inv || [];
  got = new Set(cp.got || []);
  hasGun = !!cp.hasGun;
  worn = !!cp.worn;
  gloved = !!cp.gloved;
  hasGoggles = !!cp.hasGoggles;
  c2Start(C2[cp.at] ? cp.at : "street");
}
function c2Enter(id) {
  document.body.classList.toggle("ch2", !!C2[id]);
  player.climb = null;
  c2air = 0;
  ch2 =
    id === "highway"
      ? { t: 0, heard: 0, sp: null, webs: [], patches: [], stuck: 0, n: 0, end: 0 }
      : null;
  id === "highway" && c2Save("highway");
  id === "highway" && !c2seen
    ? c2CutStart()
    : id === "highway" && toast("<b>THE HIGHWAY</b><br>Keep heading left.", 2200);
  id === "road" && setTimeout(() => backdrops.highway || backdrop("highway"), 600);
}

/* ---------- the chase ---------- */
const c2Surface = (x) => {
  let y = C2_FLOOR;
  for (const c of C2[room].cars)
    x > c.x + 1 && x < c.x + c.w - 1 && (y = Math.min(y, C2_FLOOR - c.h));
  return y;
};
function c2Die(h, p) {
  if (dead || Eo.god) return;
  ((hp = 0), (dead = !0), $sx("die"), updateHud());
  qs("#gd").querySelector("h3").textContent = h;
  qs("#gd").querySelector("p").textContent = p;
  qs("#gd").hidden = !1;
}
const C2_TIP =
  "Keep running LEFT. Jump onto the cars instead of stopping at them, never stand on a red mark when the web lands, and stay out of old webs: getting stuck lets it catch up.";
function c2Hurt() {
  player.climb = null;
  hurtPlayer(1);
  player.kbv = -1.6;
  dead &&
    ((qs("#gd").querySelector("h3").textContent = "WEBBED"),
    (qs("#gd").querySelector("p").textContent = C2_TIP));
}
function c2Update() {
  if (!C2[room]) return;
  c2WorldUpdate();
  const c = ch2;
  if (!c || room !== "highway") return;
  if (c2cut) return void c2CutUpdate();
  c.t++;
  c.stuck > 0 && c.stuck--;
  /* the noise, then the spider */
  if (!c.heard && player.x < roomW() - 170) {
    ((c.heard = 1), (c.ht = 0), (shake = 12), $sx("rumble"), $sx("growl"));
    toast("<i>…what was that?</i><br>Something huge is moving behind you.", 2600);
    updateGuide();
  }
  if (c.heard && !c.sp && ++c.ht > 150) {
    c.sp = { x: Math.min(roomW() + 40, player.x + 130 + C2_SP_HEAD), t: 0, cd: 110, st: "chase" };
    ((shake = 20), $sx("spiderscreech"), smoke(camX + 190, C2_FLOOR, 10, -1));
    toast("<b>RUN!</b><br>Jump on the cars. The red mark shows where its web lands.", 3600);
    updateGuide();
  }
  const sp = c.sp;
  if (sp) {
    sp.t++;
    const head = sp.x - C2_SP_HEAD,
      gap = head - player.x;
    if (sp.st === "chase") {
      sp.pause > 0 ? sp.pause-- : (sp.x -= gap > 90 ? 1.75 : gap > 45 ? 1.26 : 1.12);
      sp.t % 13 === 0 && $sx("skitter");
      sp.t % 26 === 0 && (shake = Math.max(shake, 2));
      if (sp.x - C2_SP_HEAD < C2_TUNNEL + 10) {
        ((sp.x = C2_TUNNEL + 10 + C2_SP_HEAD), (sp.st = "blocked"), (sp.bt = 0));
        ((shake = 18), $sx("crash"), $sx("spiderscreech"));
        sparks(C2_TUNNEL + 8, C2_FLOOR - 30, 16, ["#aab4c4", "#6a7480"], 2, 0.12, 24);
      }
      if (gap < 4 && player.y > C2_FLOOR - 60)
        c2Die("THE SPIDER GOT YOU", "It was faster for one moment. " + C2_TIP);
      /* web attacks */
      if (--sp.cd <= 0 && player.x > 110) {
        const lead = 0.7 * player.vx * 72,
          aim = (dx) => {
            const tx = Math.max(C2_TUNNEL + 30, Math.min(head - 30, player.x + lead + dx)),
              el = player.y < C2_FLOOR - 24 || player.climb;
            c.webs.push({
              tx,
              ty: el ? player.y - 8 : c2Surface(tx),
              el,
              t: 0,
              tele: 40,
              T: 32,
              sx: 0,
              sy: 0,
            });
          };
        (aim(6 * (Math.random() - 0.5)), c.n++ >= 4 && Math.random() < 0.45 && aim(-34));
        sp.cd = Math.max(80, 140 - c.n * 6);
        $sx("hiss");
      }
    } else (sp.bt++, sp.bt % 40 === 0 && ($sx("spiderscreech"), (shake = 6)));
  }
  c.webs = c.webs.filter((w) => {
    w.t++;
    if (w.t === w.tele) {
      const [mx, my] = sp ? c2Mouth(sp) : [w.tx + 60, C2_FLOOR - 20];
      ((w.sx = mx), (w.sy = my), $sx("web"));
    }
    if (w.t <= w.tele) return !0;
    const k = (w.t - w.tele) / w.T,
      [x, y] = c2At(w, Math.min(1, k));
    if (k > 0.45 && Math.abs(x - player.x) < 5 && y > player.y - 32 && y < player.y + 1) {
      (c2Hurt(),
        (c.stuck = 36),
        $sx("websplat"),
        sparks(x, y, 10, ["#eef4f0", "#c8d0cc"], 1.4, 0.1, 16));
      return !1;
    }
    if (k >= 1) {
      w.el || c.patches.push({ x: w.tx, y: w.ty, w: 20, life: 480, used: 0 });
      ($sx("websplat"), sparks(w.tx, w.ty - 1, 10, ["#eef4f0", "#c8d0cc"], 1.3, 0.12, 18));
      return !1;
    }
    return !0;
  });
  c.patches = c.patches.filter((p) => {
    p.life--;
    if (
      !p.used &&
      player.on &&
      Math.abs(player.y - p.y) < 1.5 &&
      Math.abs(player.x - p.x) < p.w / 2 + 1
    ) {
      ((p.used = 1), (c.stuck = 36), $sx("stuck"));
      c.warned ||
        ((c.warned = 1),
        toast("<b>STUCK IN THE WEB!</b><br>Jump over webs, don't land in them.", 2000));
    }
    return p.life > 0;
  });
  /* the tunnel: the spider cannot follow */
  if (!c.end && player.x < 28) {
    ((c.end = 1), (won = 2), (keys.l = keys.r = keys.s = 0), $sx("success"));
    ((fadeTo = 1),
      (onFaded = () => {
        ((qs("#c2w").hidden = !1), (fadeNow = 1), (fadeTo = 1));
      }));
  }
}
/* physics hooks: webs slow you to a crawl, wrecks are solid from the sides */
function c2Pre() {
  ch2 && ch2.stuck > 0 && ((player.vx *= 0.15), player.vy < 0 && (player.vy = 0));
  const v = player.climb;
  if (!v) return;
  if (player.vx) {
    player.climb = null;
    player.vy = -1.6;
    player.kb = 6;
    player.kbv = 1.2 * Math.sign(player.vx);
  } else {
    player.x = v.x;
    player.vy = keys.u ? -0.85 : useBuf > 0 ? 1.5 : 0;
  }
}
function c2Walls(x0) {
  const d = C2[room];
  if (!d) return;
  for (const c of d.cars) {
    const top = C2_FLOOR - c.h;
    if (player.y > top + 0.5 && player.x > c.x - 3 && player.x < c.x + c.w + 3)
      player.x =
        x0 <= c.x - 3 || (x0 < c.x + c.w / 2 && !(x0 >= c.x + c.w + 3)) ? c.x - 3 : c.x + c.w + 3;
  }
}
function c2Retry() {
  c2seen = true;
  ((qs("#gd").hidden = !0), (dead = !1), (hp = 5), (invuln = 60), (player.kb = 0), (shots = []));
  ((fadeNow = 1), (fadeTo = 0));
  (enterRoom("highway", "R"), updateHud(), updateGuide());
}

/* chapter buttons */
qs("#wNext").onclick = () => c2Start("street");
qs("#c2Again").onclick = () => ((qs("#c2w").hidden = !0), (won = 0), c2Retry());
qs("#c2Menu").onclick = () => ((qs("#c2w").hidden = !0), ee());
GM.ch2 = () =>
  ch2 && {
    heard: ch2.heard,
    sp: ch2.sp && { x: ch2.sp.x, st: ch2.sp.st, head: ch2.sp.x - C2_SP_HEAD },
    webs: ch2.webs.map((w) => ({ tx: w.tx, ty: w.ty, t: w.t, tele: w.tele, T: w.T })),
    patches: ch2.patches.map((p) => ({ x: p.x, y: p.y, used: p.used })),
    stuck: ch2.stuck,
    end: ch2.end,
  };
GM.c2 = {
  paint: (id) => {
    const t = performance.now();
    return (delete backdrops[id], backdrop(id), performance.now() - t);
  },
  start: c2Start,
  flora: (id) => C2_F[id],
  dbg: () => ({ sup: c2sup, tree: c2tree, air: c2air }),
  cars: (id) => C2[id].cars,
  surface: (x) => c2Surface(x),
};
