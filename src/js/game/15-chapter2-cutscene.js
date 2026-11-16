/* CHAPTER 2 INTRO CUTSCENE (plays the first time you step onto the highway, about 23 seconds, skippable).
   Letterbox bars, scripted camera (walk, whip-pan to the radio tower, pan back, push-in on the player, pull-out),
   typed dialogue in the player's voice, birds, a car alarm that cuts out, a rumble, a shadow, and the spider's
   leap from the broken overpass. It ends with the chase already set up. */
let c2cut = null,
  c2seen = false;
const C2_SCRIPT = [
  [30, "No traffic. No people. Not one car has|moved on this road since the evacuation.", 175],
  [190, "The radio station. The last broadcast|came from there. Someone might be alive.", 340],
  [570, "There! The tower's light is still blinking.|Somebody kept the power on.", 745],
  [1010, "...What was that?", 1110],
];
const ez = (k) => k * k * (3 - 2 * k),
  c2Lerp = (a, b, k) => a + (b - a) * k;

function c2CutStart() {
  c2seen = true;
  c2cut = {
    t: 0,
    ax: 0,
    cx: null,
    z: 1,
    fx: 96,
    fy: 70,
    bar: 0,
    flash: 0,
    red: 0,
    rumble: 0,
    cap: null,
    birds: [],
    sp: null,
    cam0: 0,
  };
  player.face = -1;
  keys.l = keys.r = keys.s = keys.u = 0;
  toast("");
  qs("#cskip").hidden = false;
  updateGuide();
}
function c2CutEnd() {
  const c = c2cut;
  if (!c) return;
  c2cut = null;
  qs("#cskip").hidden = true;
  player.face = 1;
  ch2.heard = 1;
  ch2.sp = {
    x: player.x + 100 + C2_SP_HEAD,
    t: 0,
    cd: 110,
    st: "chase",
    pause: c.t > 1280 ? 40 : 70,
  };
  keys.l = keys.r = keys.s = keys.u = 0;
  jumpBuf = punchBuf = useBuf = shootBuf = 0;
  toast("<b>RUN!</b><br>Jump on the cars. The red mark shows where its web lands.", 3600);
  updateGuide();
}
qs("#cskip").onclick = () => (c2cut ? c2CutEnd() : skipCine());

function c2Birds(n, x, y, vx, vy) {
  for (let i = 0; i < n; i++)
    c2cut.birds.push({
      x: x + 40 * (Math.random() - 0.5),
      y: y + 14 * (Math.random() - 0.5),
      vx: vx * (0.6 + Math.random() * 0.8),
      vy: vy * (0.5 + Math.random()),
      p: Math.random() * 6,
    });
}
function c2CutUpdate() {
  const c = c2cut,
    t = ++c.t,
    W = roomW(),
    fl = C2_FLOOR,
    cl = (x) => Math.max(0, Math.min(W - 192, x)),
    follow = cl(player.x - 96),
    chase = cl(player.x - 56);
  c.ax = t < 300 ? -0.5 : 0;
  c.bar += ((t < 1360 ? 32 : 0) - c.bar) * 0.07;
  c.flash > 0 && c.flash--;
  c.red *= 0.97;
  /* captions, typed in the player's voice */
  for (const [t0, txt, t1] of C2_SCRIPT) {
    t === t0 && (c.cap = { txt, n: 0 });
    t === t1 && (c.cap = null);
  }
  if (c.cap) {
    const o = Math.floor(c.cap.n);
    c.cap.n += 0.6;
    for (let i = o; i < Math.floor(c.cap.n) && i < c.cap.txt.length; i++)
      c.cap.txt[i] !== "|" && $sx("blip", "p", c.cap.txt[i]);
  }
  /* camera: follow, whip-pan left to the tower, hold, pan back, push in, pull out and shift for the reveal */
  t === 300 && (c.cam0 = camX);
  c.cx =
    t < 300
      ? null
      : t < 540
        ? c.cam0 * (1 - ez((t - 300) / 240))
        : t < 760
          ? 0
          : t < 1000
            ? follow * ez((t - 760) / 240)
            : t < 1170
              ? follow
              : t < 1330
                ? c2Lerp(follow, chase + 36, ez(Math.min(1, (t - 1170) / 90)))
                : c2Lerp(chase + 36, chase, ez(Math.min(1, (t - 1330) / 70)));
  c.z =
    t < 1060
      ? 1
      : t < 1150
        ? 1 + 0.8 * ez((t - 1060) / 90)
        : t < 1170
          ? 1.8
          : 1.8 - 0.8 * ez(Math.min(1, (t - 1170) / 90));
  c.fx = player.x - camX;
  c.fy = player.y - 24;
  /* birds around the tower, and the ambient beats */
  t === 560 && c2Birds(16, 70, 52, -1.4, -0.7);
  t === 560 && $sx("flutter");
  t >= 760 && t < 1060 && t % 14 === 0 && $sx("alarm");
  if (t >= 940 && t < 1060) {
    c.rumble = Math.min(1, (t - 940) / 60);
    shake = Math.max(shake, 2 + Math.round(5 * c.rumble));
    t % 20 === 0 && $sx("rumble");
    t % 3 === 0 &&
      parts.push({
        x: camX + 192 * Math.random(),
        y: 0,
        vx: 0,
        vy: 0.5,
        g: 0.01,
        life: 100,
        c: Math.random() < 0.5 ? "#6a5a50" : "#8a7a70",
        s: 1,
      });
  }
  if (t === 1060) {
    c.rumble = 0;
    player.face = 1;
    c2Birds(18, player.x, 44, 0.5, -1.7);
    c2Birds(8, player.x - 60, 50, -0.5, -1.5);
    $sx("flutter");
  }
  (t === 1100 || t === 1130) &&
    ($sx("boom"), (shake = t === 1130 ? 14 : 8), (c.rumble = 0.5), smoke(player.x + 40, fl, 6, -1));
  t === 1112 && (c.rumble = 0);
  /* the leap */
  if (t === 1160) {
    $sx("whoosh");
    c.sp = { x: player.x + 340, oy: 140, t: 0, k: 0 };
  }
  if (c.sp && t < 1250) {
    const k = Math.max(0, (t - 1170) / 80),
      lx = player.x + 100 + C2_SP_HEAD;
    c.sp.k = k;
    c.sp.t = 3;
    c.sp.x = c2Lerp(player.x + 340, lx, ez(Math.min(1, k)));
    c.sp.oy = 140 * Math.pow(1 - Math.min(1, k), 1.5) + 22 * Math.sin(Math.PI * Math.min(1, k));
  }
  if (t === 1250) {
    c.sp.x = player.x + 100 + C2_SP_HEAD;
    c.sp.oy = 0;
    c.flash = 6;
    c.rumble = 1;
    shake = 30;
    $sx("slam");
    $sx("crash");
    smoke(c.sp.x - 60, fl, 10, -1);
    smoke(c.sp.x - 20, fl, 10, 1);
    addFx({ k: "ring", x: c.sp.x - 40, y: fl, r0: 4, r1: 70, c: "#ffe0a0", life: 20, sq: 0.18 });
    sparks(c.sp.x - 50, fl - 2, 24, ["#aab4c4", "#6a7480", "#ffe0a0"], 2.4, 0.14, 26);
  }
  t === 1262 && (c.rumble = 0.3);
  t === 1285 && ($sx("spiderscreech"), (c.red = 1), (shake = Math.max(shake, 12)));
  t === 1300 && $sx("stinger");
  if (c.sp && t >= 1250) c.sp.t = t - 1250 + 3;
  /* birds */
  c.birds = c.birds.filter((b) => {
    b.x += b.vx;
    b.y += b.vy + 0.25 * Math.sin(b.p + t / 3);
    b.vy -= 0.004;
    return b.y > -30 && b.x > -30 && b.x < W + 30;
  });
  t >= 1420 && c2CutEnd();
}

/* ---------- drawing ---------- */
function c2CutWorld() {
  const c = c2cut;
  if (!c) return;
  c.birds.forEach((b) => {
    const f = Math.sin(tick / 2 + b.p) * 1.2;
    fill("#0c0a0a", b.x - 0.5, b.y, 1.5, 0.8);
    fill("#0c0a0a", b.x - 2.5, b.y - f, 2, 0.5);
    fill("#0c0a0a", b.x + 1, b.y - f, 2, 0.5);
  });
  if (c.sp) {
    const k = Math.min(1, c.sp.oy / 140);
    Ft(c.sp.x - 36, C2_FLOOR + 1, 60 + 40 * (1 - k), 0.85 * (1 - 0.7 * k));
    c2Spider(c.sp);
    c.t >= 1250 &&
      c.t < 1420 &&
      glow(c.sp.x - 64, C2_FLOOR - 44, 12 + 8 * c.red, "255,50,30", 0.45 + 0.4 * c.red);
  }
}
function c2CutCam() {
  const c = c2cut;
  if (!c || c.z === 1) return;
  const z = c.z;
  ctx.translate(c.fx * (1 - z), c.fy * (1 - z));
  ctx.scale(z, z);
}
function c2CutHud() {
  const c = c2cut;
  if (!c) return;
  const B = c.bar,
    t = c.t,
    big = (s, y, size, col, a) => {
      ctx.font = size + 'px "Press Start 2P",monospace';
      ctx.textBaseline = "top";
      const w = ctx.measureText(s).width;
      ctx.globalAlpha = a;
      ctx.fillStyle = "#000";
      ctx.fillText(s, 192 - w / 2 + 1, y + 1);
      ctx.fillStyle = col;
      ctx.fillText(s, 192 - w / 2, y);
      ctx.globalAlpha = 1;
    };
  c.red > 0.02 &&
    ((ctx.fillStyle = "rgba(170,10,10," + 0.28 * c.red + ")"), ctx.fillRect(0, 0, 384, 216));
  c.flash > 0 &&
    ((ctx.fillStyle = "rgba(255,255,255," + 0.7 * (c.flash / 6) + ")"),
    ctx.fillRect(0, 0, 384, 216));
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 384, B);
  ctx.fillRect(0, 216 - B, 384, B);
  if (t > 40 && t < 200) {
    const a = Math.min(1, (t - 40) / 25, (200 - t) / 25);
    big("THE HIGHWAY", 216 - B - 38, 10, "#ffe070", a);
    big("RADIO STATION: 4 MILES", 216 - B - 22, 6, "#9be7ff", a);
  }
  if (c.cap) {
    const lines = c.cap.txt.slice(0, Math.floor(c.cap.n)).split("|");
    ctx.font = '6px "Press Start 2P",monospace';
    ctx.textBaseline = "top";
    ctx.fillStyle = "#8fffd1";
    ctx.fillText((playerName || "YOU").toUpperCase(), 12, 216 - B + 3);
    ctx.font = '8px "Press Start 2P",monospace';
    ctx.fillStyle = "#f4f8ff";
    lines.forEach((l, i) => ctx.fillText(l, 12, 216 - B + 12 + 10 * i));
  }
  if (t >= 1300 && t < 1400) {
    const a = Math.min(1, (t - 1300) / 8, (1400 - t) / 18),
      p = 1 + 0.06 * Math.sin(t / 3);
    ctx.save();
    ctx.translate(192, 96);
    ctx.scale(p, p);
    ctx.translate(-192, -96);
    big("RUN!", 76, 40, "#ff4a3a", a);
    ctx.restore();
  }
}

GM.c2.cut = () => c2cut && { t: c2cut.t, cx: c2cut.cx, z: c2cut.z, bar: c2cut.bar, sp: !!c2cut.sp };
GM.c2.skip = () => c2CutEnd();
GM.c2.seen = () => c2seen;
