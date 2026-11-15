function Eo(t, a) {
  if ("street" === t) {
    vo(60, 30, "255,170,210", 0.35, 46);
    const t = a % 2300 > 140 && Math.sin(a / 70) > -0.85 ? 1 : 0.15;
    (Gt(152, 26, 16, "255,70,190", 0.2 * t), Gt(176, 38, 10, "90,220,255", 0.16 * (1 - 0.5 * t)));
    const e = ((a + 1500) % 7600) / 7600;
    if (e < 0.34) {
      const t = 216 - (e / 0.34) * 262;
      ((ft.fillStyle = "rgba(255,240,200,.09)"),
        ft.beginPath(),
        ft.moveTo(t - 1, 91),
        ft.lineTo(t - 70, 84),
        ft.lineTo(t - 70, 101),
        ft.closePath(),
        ft.fill(),
        pt("#07050e", t - 3, 88, 26, 7),
        pt("#1a1430", t + 2, 85, 15, 4),
        pt("#2a2448", t + 3, 85.5, 6, 2),
        pt("#2a2448", t + 10, 85.5, 5, 2),
        pt("#05040a", t, 94, 4, 2),
        pt("#05040a", t + 17, 94, 4, 2),
        pt("#fff4c0", t - 3, 90, 2, 1.5),
        Gt(t - 3, 91, 9, "255,240,200", 0.55),
        pt("#ff3030", t + 22, 89, 1.5, 1),
        Gt(t + 22, 89, 4, "255,40,40", 0.4));
      for (let a = 0; a < 6; a++) pt("rgba(255,240,200,.25)", t - 6 - 9 * a, 99 + (a % 2), 4, 0.5);
    }
    for (let t = 0; t < 22; t++) {
      const e = (a / 320 + r(t, 3)) % 1,
        o = r(t, 4) * dt,
        n = 86 + 20 * r(t, 5);
      if (e < 0.28) {
        const t = 0.55 * (1 - e / 0.28);
        (pt("rgba(200,210,255," + t + ")", o - 7 * e, n - 3 * e, 0.5, 0.5),
          pt("rgba(200,210,255," + t + ")", o + 7 * e, n - 3 * e, 0.5, 0.5),
          pt("rgba(200,210,255," + 0.6 * t + ")", o - 1, n, 2, 0.5));
      }
    }
    for (let t = 0; t < 4; t++) {
      const e = 24 + 0 * t + 4 * Math.sin(a / 140 + 2 * t),
        o = 34 + 3 * Math.cos(a / 170 + t);
      t < 2 && pt("#d8c8a8", e + (t ? 48 : 0), o, 0.5, 0.5);
    }
    [
      [25, "255,214,140", 3],
      [120, "255,214,140", 3],
      [56, "255,140,190", 5],
      [176, "255,190,90", 4],
      [150, "255,80,200", 2],
    ].forEach(([t, e, o], n) => {
      for (let l = 91; l < 107; l += 0.5) {
        if (r(2 * l + 31 * n, (a / 110) | 0) < 0.38) continue;
        const s = 1 - (l - 91) / 16;
        pt(
          "rgba(" + e + "," + 0.42 * s + ")",
          t + 1.3 * Math.sin(1.4 * l + a / 180 + n) - (o * s) / 2,
          l,
          o * s + 0.5,
          0.5,
        );
      }
    });
    for (let t = 0; t < 7; t++) {
      const e = ((a / 26 + 15 * t) % 100) / 100;
      pt(
        "rgba(210,215,235," + 0.22 * (1 - e) + ")",
        102 + 3 * Math.sin(6 * e + t) - 4 * e,
        98 - 26 * e,
        3 + 9 * e,
        2 + 5 * e,
      );
    }
    wo(6, "255,170,120", 0.06, 88, 106, a);
  } else if ("poster" === t) {
    for (let t = 0; t < 12; t++) {
      const e = 24 + 144 * r(t, 1),
        o = 0.004 + 0.009 * r(t, 2),
        n = ((a * o + 130 * r(t, 3)) % 130) - 12;
      (pt("rgba(220,230,255,.18)", e, n - 9, 0.5, 9),
        pt("rgba(240,250,255,.7)", e - 0.25, n, 1, 1.2),
        pt("rgba(255,255,255,.9)", e, n, 0.5, 0.5));
    }
    for (let t = 0; t < 30; t++) {
      const a = r(t, 11) * dt,
        e = r(t, 12) * bt;
      pt("rgba(255,255,255,.18)", a, e, 0.5, 0.5);
    }
    const t = 96 + 18 * Math.sin(a / 190),
      e = 7 + 4 * Math.cos(a / 130),
      o = ((a / 50) | 0) % 2;
    (pt("#3a2c26", t, e, 1.5, 1),
      pt("#8a7a68", t - 1 - 0.5 * o, e - 0.5, 1, 0.5),
      pt("#8a7a68", t + 1.5, e - 0.5, 1, 0.5),
      a % 3400 < 110 && ((a / 40) | 0) % 2 && pt("rgba(0,0,12,.3)", 0, 0, dt, bt),
      vo(96, -2, "255,200,140", 0.25, 40));
  } else if ("call" === t) {
    const t = a % 6100;
    t < 160 &&
      ((t / 45) | 0) % 2 == 0 &&
      (pt("rgba(200,215,255,.16)", 0, 0, dt, bt),
      ko(30 + 40 * r((a / 6100) | 0, 5), 0, 3 + ((a / 6100) | 0)));
    for (let t = 0; t < 10; t++) {
      const e = 92 * r(t, 21) + 2,
        o = ((a * (0.006 + 0.008 * r(t, 22)) + 120 * r(t, 23)) % 120) - 10;
      (pt("rgba(200,225,255,.22)", e, o - 7, 0.5, 7),
        pt("rgba(230,245,255,.6)", e - 0.25, o, 1, 1));
    }
    (pt("rgba(120,220,255,.05)", 0, (a / 14) % bt, dt, 2), wo(5, "80,200,255", 0.05, 10, 100, a));
  } else if ("pod" === t) {
    for (let t = 0; t < 16; t++) {
      const e = 0.012 + 0.02 * r(t, 31),
        o = 94 - ((a * e + 80 * r(t, 32)) % 74),
        n = 88 + 16 * r(t, 33) + 1.5 * Math.sin(a / 380 + t);
      (pt("rgba(190,255,230,.55)", n, o, 1, 1), pt("rgba(255,255,255,.7)", n, o, 0.5, 0.5));
    }
    const t = 22 + ((a / 28) % 68);
    (pt("rgba(120,255,210,.3)", 78, t, 36, 0.5), Gt(96, t, 10, "120,255,210", 0.12));
    for (let t = 0; t < 20; t++) {
      const e = (r(t, 41) * dt + 6 * Math.sin(a / 1600 + t) + dt) % dt,
        o = (r(t, 42) * bt - 0.004 * a * (1 + (t % 3)) + 432) % bt;
      pt("rgba(170,255,230,.35)", e, o, 0.5, 0.5);
    }
    vo(96, 10, "150,255,220", 0.18, 36);
  } else if ("lab" === t) {
    const t = a % 1700;
    if (t < 700) {
      const a = 150,
        e = 8;
      for (let o = 0; o < 14; o++) {
        const n = t / 700,
          l = a + 30 * (r(o, 51) - 0.5) * n,
          s = e + n * n * 60 * (0.5 + r(o, 52)) + 4 * r(o, 53);
        pt(o % 3 ? "#ffd060" : "#fff4c0", l, s, 0.5, 0.5 + n);
      }
      Gt(a, e, 8, "255,200,100", 0.5 * (1 - t / 700));
    }
    for (let t = 0; t < 5; t++) {
      const e = (a / 90 + 29 * t) % 100;
      pt(
        "rgba(60,40,50," + 0.12 * (1 - e / 100) + ")",
        ((41 * t + 0.01 * a) % dt) + 4 * Math.sin(e / 10),
        8 + 0.3 * e,
        10 + e / 6,
        4 + e / 14,
      );
    }
    for (let t = 0; t < 8; t++)
      if (Math.sin(a / 200 + 3 * t) > 0.92) {
        const a = r(t, 61) * dt,
          e = 88 + 14 * r(t, 62);
        (pt("#ffffff", a, e, 0.5, 0.5), Gt(a, e, 3, "255,255,255", 0.5));
      }
  } else if ("out" === t) {
    const t = a % 5800;
    t < 200 &&
      ((t / 50) | 0) % 2 == 0 &&
      (pt("rgba(190,255,200,.13)", 0, 0, dt, bt),
      ko(40 + 110 * r((a / 5800) | 0, 9), 0, 11 + ((a / 5800) | 0)));
    for (let t = 0; t < 3; t++) {
      const e = ((a / 28 + 80 * t) % 260) - 30,
        o = 14 + 7 * t + 3 * Math.sin(a / 300 + t),
        r = ((a / 110 + t) | 0) % 2;
      (pt("#0a0612", e, o, 2, 1),
        pt("#0a0612", e - 2 - r, o - 1 + 2 * r, 2, 1),
        pt("#0a0612", e + 2 + r, o - 1 + 2 * r, 2, 1));
    }
    for (let t = 0; t < 4; t++) {
      const e = a / 2600 + 1.7 * t;
      (ft.save(),
        (ft.globalCompositeOperation = "lighter"),
        (ft.fillStyle = "rgba(170,255,200,.035)"),
        ft.beginPath(),
        ft.moveTo(30 + 44 * t, 92),
        ft.lineTo(30 + 44 * t + 90 * Math.cos(e) - 12, -10),
        ft.lineTo(30 + 44 * t + 90 * Math.cos(e) + 12, -10),
        ft.closePath(),
        ft.fill(),
        ft.restore());
    }
    wo(6, "150,255,120", 0.06, 70, 106, a);
  } else if ("rock" === t) {
    if (a < 5600)
      for (let t = 0; t < 7; t++) {
        const e = (a / 30 + 40 * t) % 260,
          o = 150 - e + 20 * r(t, 71),
          n = 40 - 0.15 * e + 2 * Math.sin(a / 200 + t);
        Ao(o, n, ((a / 120 + t) | 0) % 2);
      }
    if (a > 5500) {
      const t = Math.min(1, (a - 5500) / 2500);
      for (let e = 0; e < 10; e++) {
        const o = 6 + 22 * t + 10 * r(e, 81),
          n = 20 + 18 * e + 4 * Math.sin(a / 900 + e),
          l = 100 - 8 * t - 10 * r(e, 82);
        ((ft.globalAlpha = 0.35 * t),
          ut(0 | n, 0 | l, 0 | o, e % 2 ? "#8a8494" : "#b8b0c0"),
          (ft.globalAlpha = 1));
      }
      [40, 90, 140].forEach((e) =>
        vo(
          e,
          88 - (Math.max(0, a - 5500) * Math.max(0, a - 5500)) / 3500,
          "255,200,120",
          0.4 * t,
          30,
        ),
      );
    }
    vo(176, 28, "255,180,120", 0.2, 50);
  } else if ("left" === t) {
    for (let t = 0; t < 3; t++) {
      const e = (a / 1200 + 0.37 * t) % 1;
      if (e < 0.12) {
        const a = e / 0.12,
          o = 20 + 60 * t + 40 * a,
          r = 10 + 9 * t + 12 * a;
        for (let t = 0; t < 6; t++)
          pt(
            "rgba(255,255,255," + 0.8 * (1 - a) * (1 - t / 6) + ")",
            o - 2 * t,
            r - 0.6 * t,
            1,
            0.5,
          );
      }
    }
    (Gt(96, 54, 58, "90,170,255", 0.1 + 0.04 * Math.sin(a / 800)),
      vo(150, 16, "255,240,210", 0.3, 60));
  } else if ("wake" === t) {
    for (let t = 0; t < 24; t++) {
      const e = 70 + 60 * r(t, 91) + 5 * Math.sin(a / 1100 + t),
        o = (92 * r(t, 92) + 0.004 * a * (1 + (t % 3))) % 92;
      pt("rgba(255,250,210," + (0.25 + 0.25 * Math.sin(a / 500 + t)) + ")", e, o, 0.5, 0.5);
    }
    (vo(100, 2, "255,240,180", 0.3, 56), wo(4, "200,255,160", 0.05, 70, 104, a));
  }
  if ("pod" === t || "wake" === t || "lab" === t) {
    (ft.save(), (ft.globalCompositeOperation = "lighter"));
    for (let e = 0; e < 5; e++) {
      const o = 0.035 + 0.02 * Math.sin(a / 1300 + 1.7 * e),
        r = 60 + 16 * e;
      ((ft.fillStyle = "lab" === t ? "rgba(255,120,90," + o + ")" : "rgba(200,255,220," + o + ")"),
        ft.beginPath(),
        ft.moveTo(r, 0),
        ft.lineTo(r + 8, 0),
        ft.lineTo(r - 14 + 6 * e, bt),
        ft.lineTo(r - 26 + 6 * e, bt),
        ft.closePath(),
        ft.fill());
    }
    ft.restore();
  }
  if ("out" === t || "street" === t || "rock" === t)
    for (let e = 0; e < 3; e++) {
      const o = ((0.008 * a * (e + 1) + 70 * e) % 272) - 40,
        r = 94 + 3 * e;
      ft.globalAlpha = 0.08 + 0.03 * e;
      for (let e = 0; e < 6; e++)
        pt(
          "street" === t ? "#c0a0d8" : "rock" === t ? "#d8b0a0" : "#a0d8b0",
          o + 9 * e,
          r + 1.5 * Math.sin(a / 700 + e),
          14,
          5,
        );
      ft.globalAlpha = 1;
    }
  {
    const t = (a % 9e3) / 9e3;
    if (t < 0.25) {
      const a = 0.12 * Math.sin((t / 0.25) * Math.PI);
      (ft.save(), (ft.globalCompositeOperation = "lighter"));
      const e = ft.createLinearGradient(0, 0, 60, 0);
      (e.addColorStop(0, "rgba(255,160,90," + a + ")"),
        e.addColorStop(1, "rgba(255,160,90,0)"),
        (ft.fillStyle = e),
        ft.fillRect(0, 0, 60, bt),
        ft.restore());
    }
  }
  (ft.save(),
    (ft.globalCompositeOperation = "lighter"),
    (ft.globalAlpha = 0.05),
    (ft.fillStyle = "#ff2040"),
    ft.fillRect(0, 0, 1, bt),
    (ft.fillStyle = "#20e0ff"),
    ft.fillRect(191, 0, 1, bt),
    ft.restore(),
    (function (t) {
      const a = Mo[t];
      if (!a) return;
      const e = ft.createLinearGradient(0, 0, 0, bt);
      (e.addColorStop(0, a[0]),
        e.addColorStop(1, a[1]),
        ft.save(),
        (ft.globalCompositeOperation = "soft-light"),
        (ft.globalAlpha = a[2]),
        (ft.fillStyle = e),
        ft.fillRect(0, 0, dt, bt),
        ft.restore());
    })(t));
}
async function playDoorCut() {
  ((Xt = 0),
    (Qt = 0),
    (Zt = ""),
    (ot.hidden = !1),
    (ot.style.zIndex = "40"),
    (it.hidden = !0),
    (nt.hidden = !0),
    ct.classList.remove("on"),
    (Jt = 1),
    (jt = 1),
    lo(),
    Object.assign(yo, { side: 0, flip: 0, z: 1, zx: 96, zy: 54, tz: 1, tx: 96, ty: 54 }),
    aa("door"),
    requestAnimationFrame(se));
  try {
    (await ea(0),
      await ta(7300),
      await ra($t, "Mmph-! What the...?"),
      await ra($t, "It is soaked... and crumpled."),
      await ea(1),
      oa(),
      aa("paper"),
      await ea(0),
      await ta(1200),
      await ra($t, "A bulletin... someone printed a warning."),
      Object.assign(yo, { tz: 1.7, tx: 96, ty: 30 }),
      await ta(1200),
      await ra("", '"ANIMALS AND WILDLIFE TURNED ON US. HELP US!"'),
      Object.assign(yo, { tz: 2.1, tx: 96, ty: 70 }),
      await ta(1300),
      await ra(
        "",
        "Below it, documentation: photos, field notes, dates. Wolves in packs. Birds that attack on sight. Day by day, every species turned.",
      ),
      Object.assign(yo, { tz: 1, tx: 96, ty: 54 }),
      await ta(900),
      await ra($t, "There is something on the back."),
      (yo.flip = performance.now()),
      await ta(1700),
      Object.assign(yo, { tz: 1.45, tx: 96, ty: 48 }),
      await ta(900),
      await ra("", '"THE PEOPLE HAVE LEFT EARTH. EVERYONE WENT TO MARS TO SURVIVE."'),
      Object.assign(yo, { tz: 1, tx: 96, ty: 54 }),
      await ra($t, "Mars...? They all left?"),
      await ra($t, "...And they left me behind."),
      await ta(900),
      await ea(1));
  } catch (t) {
    0 !== t && console.error(t);
  }
  (oa(), ct.classList.remove("on"), (ot.hidden = !0), (ot.style.zIndex = ""));
}
function To(t) {
  (Me(t, {
    g: ["#0c1218", "#142030", "#1c3044", "#244056"],
    s0: "#04080c",
    lit: "#3a6a8a",
    wain: "#0e1822",
    ceil: "#04070a",
    pipe: ["#1e2c3c", "#2a3c50", "#18222e"],
    lamps: [40, 300],
    lamp: "#aaffee",
    lampc: "#6affc8",
    floor: ["#1a2430", "#10161e", "#080b10"],
    fl: "#2a5070",
  }),
    [
      [104, 0],
      [212, 1],
    ].forEach(([a, e]) => {
      (t.rect(a - 2, 34, 60, 104, "#020608"),
        t.grad(38, 134, ["#a8f0b8", "#4aa86a", "#1f5a3a"], a, a + 56, 0.9));
      for (let o = 0; o < 22; o++)
        t.rect(
          a + 48 * r(o, e),
          40 + 88 * r(o, e + 3),
          (6 + 8 * r(o, 2)) | 0,
          4,
          r(o, 5) < 0.5 ? [60, 160, 80] : [130, 220, 110],
        );
      (t.rect(a + 26, 34, 3, 104, "#020608"),
        t.rect(a - 2, 82, 60, 3, "#020608"),
        t.light(a + 28, 90, 70, "#e8ffb0", 0.7));
    }),
    t.poly(
      [
        [104, 138],
        [160, 138],
        [190, 186],
        [70, 186],
      ],
      [200, 255, 170, 0.1],
    ),
    t.poly(
      [
        [212, 138],
        [268, 138],
        [300, 186],
        [190, 186],
      ],
      [200, 255, 170, 0.1],
    ),
    [[20], [304]].forEach(([a], e) => {
      (t.rect(a - 2, 38, 68, 140, "#04080c"),
        t.rect(a, 46, 64, 122, [120, 255, 210], 0.1),
        t.rect(a + 2, 140, 60, 28, "#2a8a56", 0.5),
        t.rect(a + 2, 150, 60, 4, "#6aff9a", 0.3),
        [
          [a + 10, 52, a + 24, 100, a + 16, 150],
          [a + 50, 48, a + 38, 90, a + 48, 130],
        ].forEach((a) => {
          (t.line(a[0], a[1], a[2], a[3], "#ffffff", 0.8),
            t.line(a[2], a[3], a[4], a[5], "#ffffff", 0.6));
        }));
      for (let o = 0; o < 5; o++)
        t.poly(
          [
            [a + 4 + 12 * o, 46],
            [a + 10 + 12 * o, 46],
            [a + 7 + 12 * o, 56 + 8 * r(o, e)],
          ],
          [170, 240, 225, 0.6],
        );
      (xe(t, a - 6, 30, 76, 12, "#1a2a38", "#6a8aa0", "#04080c"),
        xe(t, a - 6, 170, 76, 10, "#1a2a38", "#6a8aa0", "#04080c"),
        Ga(t, a - 6, 30, 76, 14, e + 90),
        ve(t, a + 8, 42, a + 2, 150, 4, 3 * e + 700, 2),
        ve(t, a + 56, 42, a + 62, 160, -4, 3 * e + 701, 3));
    }),
    xe(t, 168, 60, 48, 86, "#14202a", "#4a6a80", "#02060a"),
    t.rect(172, 64, 40, 78, "#0a121a"),
    t.rect(191, 64, 2, 78, "#02060a"));
  for (let a = 72; a < 140; a += 14) t.rect(174, a, 36, 1, "#2a4050");
  (t.rect(180, 36, 32, 12, "#3a0a0a"),
    t.rect(182, 38, 28, 8, "#ff3a2a", 0.85),
    t.light(196, 42, 40, "#ff3a2a", 0.5));
  for (let a = 0; a < 4; a++) {
    const e = 150 + 7 * a;
    t.line(e, 60, e - 12, 150, "#02060a", 0.8);
  }
  [
    [24, 140],
    [296, 140],
  ].forEach(([a], e) => {
    (xe(t, a, 140, 64, 5, "#6a7a8a", "#d8e8f4", "#2a3846"),
      t.rect(a + 4, 145, 3, 40, "#34445a"),
      t.rect(a + 57, 145, 3, 40, "#34445a"),
      t.rect(a, 118, 64, 1, "#8aa0b0"));
    for (let e = 0; e <= 64; e += 12) t.rect(a + e, 118, 2, 22, "#6a7a8a");
    Ga(t, a, 138, 64, 8, e + 95);
  });
  for (let a = 0; a < 3; a++)
    t.disc(100 + 70 * a, 198, 22, (t, a) =>
      (t * t) / 484 + (a * a) / 60 < 1 ? [60, 200, 110] : null,
    );
  (t.light(130, 200, 60, "#6aff9a", 0.4, 0.5),
    t.light(270, 200, 60, "#6aff9a", 0.4, 0.5),
    we(t, 33, { n: 15, len: 100 }));
}
function So(t) {
  (Me(t, {
    g: ["#0e1214", "#161e22", "#1e2a2e", "#26363a"],
    s0: "#05080a",
    lit: "#4a6a6a",
    wain: "#10181a",
    ceil: "#040708",
    pipe: ["#2a2420", "#3a3028", "#221c18"],
    lamps: [134],
    lamp: "#ffd8a0",
    lampc: "#ffb060",
    floor: ["#1c2224", "#12181a", "#090c0e"],
    fl: "#3a5052",
  }),
    xe(t, 42, 84, 64, 86, "#151c1e", "#5a7478", "#04080a"),
    xe(t, 48, 90, 52, 78, "#3c4c52", "#8aa4a8", "#141c20"),
    t.rect(52, 96, 44, 30, "#2e3c42"),
    t.rect(52, 96, 44, 1, "#6a8488", 0.6),
    t.rect(52, 132, 44, 32, "#2e3c42"),
    t.rect(52, 132, 44, 1, "#6a8488", 0.6),
    t.rect(90, 124, 6, 12, "#3a3020"),
    t.rect(91, 125, 4, 10, "#c8a85a"),
    t.rect(91, 125, 4, 2, "#f0d890"),
    t.speck(48, 90, 52, 78, [120, 66, 34], 90, 5, 0.55),
    t.speck(48, 140, 52, 28, [70, 40, 24], 60, 9, 0.6));
  for (let a = 0; a < 3; a++) t.rect(49, 98 + 30 * a, 3, 6, "#1a2224");
  (t.rect(54, 100, 42, 24, [236, 214, 96]),
    t.rect(54, 100, 42, 1, [255, 240, 160]),
    t.rect(54, 123, 42, 1, [150, 130, 50]),
    t.poly(
      [
        [90, 124],
        [96, 124],
        [96, 118],
      ],
      [190, 166, 70],
    ),
    t.rect(73, 98, 4, 4, [200, 60, 50]),
    t.rect(54, 76, 40, 7, "#0a0e10"),
    t.rect(56, 78, 36, 3, "#a82a22", 0.9),
    xe(t, 214, 140, 44, 28, "#4a3a26", "#a08450", "#1a1208"),
    t.line(216, 142, 256, 166, "#2a1e10", 0.8),
    t.line(256, 142, 216, 166, "#2a1e10", 0.8),
    xe(t, 226, 116, 30, 24, "#5a4428", "#a88a54", "#22180a"),
    t.rect(226, 128, 30, 1, "#2a1e10"),
    xe(t, 280, 128, 24, 40, "#2a4a58", "#6aa0b0", "#0a1a20"),
    t.rect(280, 138, 24, 2, "#0a1a20"),
    t.rect(280, 156, 24, 2, "#0a1a20"),
    t.rect(286, 144, 12, 8, [236, 214, 96]),
    t.poly(
      [
        [288, 151],
        [292, 145],
        [296, 151],
      ],
      [20, 20, 20],
    ),
    t.rect(170, 24, 5, 120, "#3a3028"),
    t.rect(170, 24, 1, 120, "#6a5a48"),
    t.rect(166, 90, 13, 5, "#221c18"),
    t.rect(356, 88, 28, 82, "#05100e"),
    t.rect(352, 84, 4, 86, "#2a3a3c"),
    t.rect(352, 84, 32, 4, "#2a3a3c"),
    t.light(372, 128, 46, "#9affc0", 0.45));
  for (let a = 0; a < 4; a++) t.rect(360 + 6 * a, 160 - 6 * a, 24 - 6 * a, 2, "#3a5050");
  (Ga(t, 40, 160, 70, 10, 61),
    Ga(t, 350, 150, 34, 18, 62),
    we(t, 71, { n: 7, len: 56 }),
    t.fog(0, 150, 384, 214, "#c8d8c0", 0.3, 31, 34, 8, 0.14));
}
function Co(t, a) {
  const e = 320 * a,
    o = (t) => 2 * t - e;
  Me(t, {
    g: ["#12100c", "#1c1812", "#262018", "#30281e"],
    s0: "#060504",
    lit: "#6a5a40",
    wain: "#16120c",
    ceil: "#060504",
    pipe: ["#2a2a2e", "#3a3a40", "#1e1e22"],
    lamps: a ? [60, 220] : [100, 260],
    lamp: "#ffe0a0",
    lampc: "#ffb860",
    floor: ["#22201c", "#161412", "#0a0908"],
    fl: "#4a4030",
  });
  const n = (a, e, n) => {
    const l = o(a),
      s = o(e);
    s < -10 ||
      l > 330 ||
      ([l, s - 4].forEach((a) => {
        (t.rect(a, 36, 4, 132, "#3a3e44"),
          t.rect(a, 36, 1, 132, "#7a8088"),
          t.rect(a + 3, 36, 1, 132, "#14161a"));
        for (let e = 44; e < 168; e += 10) t.rect(a + 1, e, 2, 2, "#14161a");
      }),
      t.line(l + 2, 40, s - 2, 92, "#2a2e34", 0.7),
      t.line(s - 2, 40, l + 2, 92, "#2a2e34", 0.7),
      [52, 96, 140].forEach((a, e) => {
        let o = l + 7,
          c = 0;
        for (; o < s - 24;) {
          const l = 18 + ((12 * r(n + 7 * e, c)) | 0),
            s = 15 + ((13 * r(n + 5 * e, c + 3)) | 0),
            i = r(n + e, c + 9) < 0.45;
          (r(n + 3 * e, c + 5) > 0.22 &&
            (i
              ? (xe(t, o, a - s, l, s, "#4a5560", "#9aa8b4", "#1a2028"),
                t.rect(o + 2, a - s + 3, l - 4, 1, "#2a323c"),
                t.rect(o + 2, a - 4, l - 4, 1, "#2a323c"))
              : (xe(t, o, a - s, l, s, "#5a4428", "#a88a54", "#22180a"),
                t.rect(o, a - s + (s >> 1), l, 1, "#2a1e10"),
                t.line(o + 1, a - s + 1, o + l - 2, a - 2, "#2a1e10", 0.5)),
            t.rect(o + (l >> 1) - 2, a - s + (s >> 1) - 1, 5, 5, "#1a1408"),
            t.rect(o + (l >> 1) - 1, a - s + (s >> 1), 3, 3, "#d8b040"),
            t.rect(o + (l >> 1) - 1, a - s + (s >> 1) - 3, 3, 2, "#9a9aa2"),
            r(n, c + e) < 0.35 && t.rect(o + 2, a - 7, 8, 4, "#e8e0c0")),
            (o += l + 3),
            c++);
        }
        (t.rect(l, a, s - l, 4, "#5a4a34"),
          t.rect(l, a, s - l, 1, "#9a8458"),
          t.rect(l, a + 3, s - l, 1, "#1e160c"),
          Ga(t, l, a - 2, s - l, 4, n + e));
      }));
  };
  (n(34, 110, 3),
    n(126, 206, 9),
    n(222, 300, 15),
    [
      [133, 16],
      [223, 16],
    ].forEach(([a, e], r) => {
      const n = o(a);
      (xe(t, n, 140, 2 * e, 28, "#46525e", "#98a6b2", "#161c24"),
        t.rect(n + 2, 146, 2 * e - 4, 1, "#2a323c"),
        t.rect(n + 2, 160, 2 * e - 4, 1, "#2a323c"),
        t.rect(n + e - 4, 150, 8, 8, "#1a1408"),
        t.rect(n + e - 3, 152, 6, 5, "#d8b040"),
        t.rect(n + e - 2, 148, 4, 4, "#9a9aa2"),
        t.rect(n + e - 1, 149, 2, 3, "#46525e"));
    }));
  {
    const a = o(156);
    xe(t, a, 134, 80, 34, "#5a5226", "#c8b448", "#1a1608");
    for (let e = 0; e < 80; e += 8)
      t.poly(
        [
          [a + e, 134],
          [a + e + 4, 134],
          [a + e + 8, 140],
          [a + e + 4, 140],
        ],
        [20, 18, 10],
      );
    (t.rect(a, 134, 80, 1, "#f0e070"),
      t.poly(
        [
          [a - 2, 134],
          [a + 82, 134],
          [a + 78, 128],
          [a + 4, 126],
        ],
        [110, 100, 44],
      ),
      t.line(a + 4, 126, a + 78, 128, "#e0cc5a"),
      t.rect(a, 133, 80, 1, "#0a0804"),
      t.rect(a + 4, 145, 72, 13, [232, 208, 64]),
      t.rect(a + 4, 145, 72, 1, [255, 240, 150]),
      t.rect(a + 4, 157, 72, 1, [120, 100, 30]),
      t.poly(
        [
          [a + 8, 165],
          [a + 14, 160],
          [a + 20, 165],
        ],
        [232, 208, 64],
      ),
      t.rect(a + 13, 162, 2, 2, [20, 18, 10]),
      t.light(a + 40, 130, 30, "#c8ff70", 0.35));
  }
  {
    const a = o(302);
    (xe(t, a, 86, 36, 84, "#151c1e", "#5a7478", "#04080a"),
      t.rect(a + 4, 90, 28, 78, "#0a1614"),
      t.light(a + 18, 130, 40, "#9affc0", 0.35),
      t.rect(a + 2, 78, 32, 7, "#0a0e10"),
      t.rect(a + 4, 80, 28, 3, "#3aa85a", 0.9));
  }
  {
    const a = o(8);
    xe(t, a, 160, 40, 8, "#4a3a26", "#8a7048", "#1a1208");
    for (let e = 0; e < 4; e++) t.rect(a + 2 + 10 * e, 163, 6, 5, "#0a0806");
  }
  for (let e = 0; e < 5; e++) {
    const o = 320 * r(e, a + 4),
      n = 26;
    for (let a = 0; a < 10; a++)
      t.line(o, n, o + 3 * (a - 5), n + 10 + 8 * r(a, e), "#8a8a80", 0.25);
  }
  (we(t, 13 * a + 5, { n: 5, len: 44 }),
    t.fog(0, 150, 384, 214, "#d8c8a0", 0.3, 7 * a + 3, 34, 8, 0.13));
}
((() => {
  for (const t of ["street", "poster", "call", "pod", "lab", "out", "rock", "left", "wake"]) {
    const a = le[t];
    a &&
      (le[t] = (e) => {
        (a(e),
          ft.save(),
          ft.setTransform(2, 0, 0, 2, 0, 0),
          (ft.imageSmoothingEnabled = !1),
          Eo(t, e),
          ft.restore());
      });
  }
})(),
  (le.door = function (t) {
    const a = 5e3,
      e = t > a ? 3.2 * Math.sin(Math.min(1, (t - a) / 420) * Math.PI) : 0,
      o = xo((t - a - 500) / 1500);
    (wt(1.03 + 2 * o, 96 + 27 * o, 54 + 9 * o),
      t > a &&
        t < 5380 &&
        ft.translate(((4 * Math.random()) | 0) - 2, ((3 * Math.random()) | 0) - 1),
      Mt("doorCity", _e));
    for (let a = 0; a < 4; a++) {
      const e = 0.05 + 0.03 * Math.sin(t / 1100 + a);
      ((ft.fillStyle = "rgba(255,246,200," + e + ")"),
        ft.beginPath(),
        ft.moveTo(40, 47),
        ft.lineTo(52 + 30 * a, 110),
        ft.lineTo(64 + 34 * a, 110),
        ft.closePath(),
        ft.fill());
    }
    to(t, $e);
    for (let a = 0; a < 5; a++) {
      const e = ((t / (28 + 6 * a) + 61 * a) % 240) - 24,
        o = 12 + 6 * a + 3 * Math.sin(t / 300 + a),
        r = ((t / 120 + a) | 0) % 2;
      (pt("#1a2422", e, o, 1, 1),
        pt("#1a2422", e - 1 - r, o - 1 + r, 1, 1),
        pt("#1a2422", e + 1 + r, o - 1 + r, 1, 1));
    }
    for (let a = 0; a < 22; a++) {
      const e = 232 - ((t * (0.05 + 0.05 * r(a, 3)) + 300 * r(a, 1)) % 252),
        o = (r(a, 2) * bt + 6 * Math.sin(t / 400 + a) + 0.006 * t) % bt;
      pt(a % 3 ? "#6ab04a" : "#c8b050", e, o, 1.5, 1);
    }
    for (let a = 0; a < 16; a++) {
      const e = 0.3 + 0.4 * Math.sin(t / 300 + 1.7 * a);
      pt(
        "rgba(255,250,200," + Math.max(0, e) + ")",
        r(a, 5) * dt + 5 * Math.sin(t / 900 + a),
        30 + 60 * r(a, 6),
        0.5,
        0.5,
      );
    }
    const n = xo((t - 700) / 1300),
      l = Ze,
      s = l.x / 2,
      c = l.y / 2,
      i = l.w / 2,
      f = l.h / 2,
      h = i * (1 - 0.82 * n);
    if ((n > 0 && Gt(s + i / 2, c + 0.7 * f, 20, "120,200,150", 0.12 * n), h > 0.5)) {
      const a = (function (t) {
        if (Xe) return Xe;
        const a = Lt();
        Je(a, { x: 0, y: 0, w: t.w, h: t.h }, 17);
        const e = document.createElement("canvas");
        ((e.width = 384),
          (e.height = 216),
          e.getContext("2d").putImageData(new ImageData(a.d, 384, 216), 0, 0));
        const o = document.createElement("canvas");
        return ((o.width = t.w), (o.height = t.h), o.getContext("2d").drawImage(e, 0, 0), (Xe = o));
      })(l);
      if (
        ((ft.imageSmoothingEnabled = !1),
        ft.drawImage(a, 0, 0, l.w, l.h, s, c, h, f),
        pt("rgba(0,0,0," + 0.55 * n + ")", s, c, h, f),
        pt("rgba(10,6,4,.6)", s + h - 0.5, c, 0.5, f),
        n > 0 && n < 0.6)
      )
        for (let a = 0; a < 5; a++)
          pt(
            "rgba(150,90,50,.8)",
            s + h - 1 + 3 * r(a, (t / 40) | 0),
            c + 0.3 * f + 7 * a + ((t / 10) % 8),
            0.5,
            0.5,
          );
    }
    (ao(t, s - 3, s + i + 3, c - 4, 98, 7, 3), ao(t, 130, 190, 23, 97, 4, 9));
    const d = xo((t - 1800) / 1700),
      b = t > 1800 && t < 3500;
    if (
      (n > 0.45 &&
        Ma(150 - 30 * d + e, 97 + 3 * d, qt, 0, -1, {
          s: 2,
          pose:
            t > a
              ? t < 5380
                ? Aa("hurt")
                : Aa("grab", (t / 500) & 1)
              : b
                ? Aa("walk", (t / 65) & 7)
                : Aa("idle", (t / 600) & 1),
        }),
      t > 2100 && t < a)
    ) {
      const a = (t - 2100) / 2900,
        e = a < 0.78 ? (a / 0.78) * 0.62 : 0.62 + 0.38 * Math.pow((a - 0.78) / 0.22, 2.2),
        o = 1 - e,
        r = o * o * o * -26 + 3 * o * o * e * 84 + 3 * o * e * e * 26 + e * e * e * 123,
        n = o * o * o * 20 + 3 * o * o * e * -26 + 3 * o * e * e * 92 + e * e * e * 63,
        l = Math.max(0, 1 - 5 * Math.max(0, a - 0.8)),
        s = r + 3.5 * Math.sin(17 * a) * l,
        c = n + 2.6 * Math.sin(23 * a + 1) * l,
        i = (1.1 * Math.sin(7 * a) + 0.25 * Math.sin(19 * a)) * l - 0.12 * (1 - l),
        f = l * Math.cos(15 * a) + (1 - l),
        h = 0.62 + 0.38 * Math.pow(a, 2);
      if (
        (ft.save(),
        ft.translate(s, c),
        ft.rotate(i),
        ft.scale(
          h * (Math.abs(f) < 0.18 ? 0.18 * Math.sign(f || 1) : f),
          h * (0.86 + 0.14 * Math.abs(Math.sin(31 * a))),
        ),
        mo(15, 18, t, 4, 1),
        ft.restore(),
        a > 0.78)
      )
        for (let t = 1; t < 5; t++)
          pt(
            "rgba(255,255,255," + (((a - 0.78) / 0.22) * 0.3) / t + ")",
            s - 6 * t,
            c - 1.5 * t,
            4,
            0.5,
          );
      if (a < 0.8)
        for (let a = 0; a < 3; a++) {
          const e = (t / 400 + 0.33 * a) % 1;
          pt(
            "rgba(220,240,255," + 0.35 * (1 - e) + ")",
            s + 4 * Math.sin(2 * a + t / 300),
            c + 4 + 10 * e,
            0.5,
            1,
          );
        }
    }
    if (t >= a) {
      const o = Math.min(1, (t - a) / 160),
        r = 1 - o;
      (ft.save(),
        ft.translate(123.5 + e, 63),
        ft.rotate(0.03 * Math.sin(t / 70) * o - 0.1),
        ft.scale(1 + 0.32 * r, 1 - 0.26 * r),
        mo(17, 20, t, 7, 1),
        ft.restore());
      for (let a = 0; a < 3; a++) {
        const e = ((t + 400 * a) % 1200) / 1200;
        pt("rgba(220,240,255," + 0.8 * (1 - e) + ")", 119 + 4 * a, 73 + 30 * e, 0.5, 1.2);
      }
      const n = t - a;
      if ((n < 200 && pt("rgba(255,255,255," + 0.5 * (1 - n / 200) + ")", 0, 0, dt, bt), n < 300))
        for (let t = 0; t < 10; t++) {
          const a = (t / 10) * 6.28,
            e = 4 + n / 20;
          pt("rgba(210,235,255,.8)", 123 + Math.cos(a) * e, 63 + Math.sin(a) * e * 0.8, 0.6, 0.6);
        }
      if (n < 900) {
        const t = 1 + 0.4 * Math.min(1, n / 120);
        (ft.save(),
          ft.translate(91, 43),
          ft.rotate(-0.18),
          ft.scale(t, t),
          io("FWAP!", -4, "#1a0a04", 6),
          io("FWAP!", -5, "#ffe070", 6),
          ft.restore());
        for (let t = 0; t < 8; t++) {
          const a = (t / 8) * 6.28,
            e = 6 + n / 40;
          pt("#fff6c0", 123 + Math.cos(a) * e, 63 + Math.sin(a) * e, 1.2, 1.2);
        }
      }
    }
    eo(t, 30, 0.22);
    for (let a = 0; a < dt; a += 2) {
      const e = 4 + 7 * r(a, 17),
        o = 1.4 * Math.sin(t / 600 + 0.25 * a);
      for (let t = 0; t < e; t += 1.5)
        pt(t > 0.7 * e ? "#7ac85a" : "#1a4a22", a + o * (t / e), 106 - t, 1, 1.6);
      r(a, 19) < 0.2 && pt("rgba(235,255,245,.8)", a + o, 106 - e, 0.5, 0.5);
    }
  }),
  (le.paper = function (t) {
    (ft.save(),
      wt(1.5, 120, 56),
      Mt("doorCity", _e),
      to(t, $e),
      ft.restore(),
      pt("rgba(4,10,8,.55)", 0, 0, dt, bt),
      re(t, 18, "255,240,190", 0.006),
      (yo.z += 0.04 * (yo.tz - yo.z)),
      (yo.zx += 0.04 * (yo.tx - yo.zx)),
      (yo.zy += 0.04 * (yo.ty - yo.zy)),
      ft.save(),
      wt(yo.z, yo.zx, yo.zy));
    const a = yo.flip ? xo((performance.now() - yo.flip) / 1100) : 0,
      e = a > 0.5 ? 1 : 0,
      o = Math.max(0.03, Math.abs(Math.cos(a * Math.PI)));
    (ft.save(),
      ft.translate(96, 54 + 0.6 * Math.sin(t / 800)),
      ft.rotate(0.012 * Math.sin(t / 1300) - 0.015),
      ft.scale(o, 1),
      (function (t, a) {
        const e = (function () {
            const t = [],
              a = (t, a) => 1.8 * (r(5, 7 * t + a) - 0.5),
              e = 16;
            for (let o = 0; o <= e; o++) t.push([(116 * o) / e - 58, -49 + a(o, 1)]);
            for (let o = 1; o <= e; o++) t.push([58 + a(o, 2), (98 * o) / e - 49]);
            for (let o = 15; o >= 0; o--) t.push([(116 * o) / e - 58, 49 + a(o, 3)]);
            for (let o = 15; o > 0; o--) t.push([-58 + a(o, 4), (98 * o) / e - 49]);
            return t.map(([t, a], e) => {
              const o = t + 58 + (49 - a);
              return o < 18
                ? [t + 0.5 * (18 - o) + 2.5 * (r(5, e) - 0.5), a - 0.5 * (18 - o)]
                : [t, a];
            });
          })(),
          o = lo();
        (ft.save(),
          ft.translate(2.5, 3.5),
          so(e),
          (ft.fillStyle = "rgba(0,0,0,.45)"),
          ft.fill(),
          ft.restore(),
          ft.save(),
          so(e),
          ft.clip(),
          (ft.imageSmoothingEnabled = !1),
          ft.drawImage(t ? o.b : o.f, -58, -49, 116, 98),
          ft.save(),
          (ft.globalAlpha = 0.09),
          ft.scale(-1, 1),
          (co = 1),
          (t ? po : uo)(a),
          (co = 0),
          ft.restore(),
          t ? uo(a) : po(a),
          ft.save(),
          t && ft.scale(-1, 1),
          ft.drawImage(o.s, -58, -49, 116, 98),
          ft.restore(),
          [
            [-44, -30],
            [12, -42],
            [46, 6],
            [-30, 30],
            [8, 20],
            [-12, -20],
          ].forEach(([t, a]) => {
            (pt("rgba(80,60,40,.3)", t, a + 0.8, 2, 0.6),
              pt("rgba(255,255,255,.45)", t, a, 2, 1.2),
              pt("#ffffff", t + 0.3, a + 0.2, 0.6, 0.5));
          }),
          ft.restore(),
          so(e),
          (ft.strokeStyle = "rgba(110,84,50,.7)"),
          (ft.lineWidth = 0.45),
          ft.stroke());
      })(e, t));
    const n = q.sk[qt.sk][1];
    ([-1, 1].forEach((t) => {
      const a = 57 * t;
      (pt("#1a0e08", a - 3.5, -9, 7, 19),
        pt("#1a0e08", a - 4.5, -6, 9, 14),
        pt(n, a - 3, -8.5, 6, 18),
        pt(n, a - 4, -5.5, 8, 12.5),
        pt("rgba(0,0,0,.3)", a + (t > 0 ? 1.5 : -4), -5.5, 2.5, 12.5),
        pt("rgba(255,255,255,.2)", a - 2.5, -8.5, 5, 1),
        pt("rgba(0,0,0,.22)", a - 4, -1, 8, 0.5),
        pt("rgba(0,0,0,.22)", a - 4, 3.5, 8, 0.5),
        pt("#f4e0d2", a - 1.5, -7.5, 3, 2.2),
        pt("rgba(150,90,70,.5)", a - 1.5, -5.3, 3, 0.4));
    }),
      ft.restore(),
      ft.restore(),
      eo(t, 40, 0.3));
    for (let a = 0; a < 6; a++) {
      const e = r(a, 61) * dt,
        o = r(a, 62) * bt,
        n = 0.08 + 0.05 * Math.sin(t / 700 + a);
      Gt(e, o, 10 + 2 * a, "200,230,255", n);
    }
  }));
const Ro = [
    { x: 22, y: 122, w: 36 },
    { x: 68, y: 98, w: 32 },
    { x: 110, y: 74, w: 104 },
    { x: 236, y: 74, w: 104 },
    { x: 350, y: 98, w: 32 },
    { x: 392, y: 122, w: 36 },
  ],
  GM = { on: !1 },
  Po = 1.45;
