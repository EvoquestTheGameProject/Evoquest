function me(t, a) {
  const e = t + a;
  if (ue[e]) return ue[e];
  const o = document.createElement("canvas");
  o.width = o.height = 24;
  const r = o.getContext("2d"),
    n = (t, a, e, o, n) => {
      ((r.fillStyle = Array.isArray(t) ? "rgb(" + t.map(Math.round).join(",") + ")" : t),
        r.fillRect(a, e, o, n));
    },
    l = "#0a0c14",
    s = ge(a, 0.55),
    c = a,
    i = pe(a, 0.35),
    f = pe(a, 0.6);
  if ("bottle" === t)
    (n(l, 9, 1, 6, 5),
      n("#3a4060", 10, 2, 4, 3),
      n("#7a82a8", 10, 2, 4, 1),
      n(l, 8, 6, 8, 3),
      n("#b8c8e0", 9, 6, 6, 3),
      n(l, 4, 9, 16, 14),
      n("#2a3040", 5, 10, 14, 12),
      n(f, 5, 13, 14, 9),
      n(i, 5, 13, 14, 9),
      n(c, 6, 13, 9, 9),
      n(s, 7, 13, 2, 8),
      n("#ffffffaa", 7, 12, 1, 1),
      n("#0006", 16, 13, 3, 9),
      n("#f6f2dc", 7, 15, 10, 6),
      n(l, 7, 15, 10, 1),
      n(l, 7, 20, 10, 1),
      n("#d82a1a", 9, 16, 6, 1),
      n(l, 10, 17, 4, 2),
      n("#e8c020", 11, 17, 2, 1),
      n(l, 11, 19, 2, 1),
      n(s, 6, 11, 12, 1),
      n(l, 4, 22, 16, 1));
  else if ("jug" === t)
    (n(l, 8, 1, 8, 4),
      n("#cfe8ff", 9, 2, 6, 2),
      n(l, 6, 5, 12, 3),
      n("#cfe8ff", 7, 5, 10, 2),
      n(l, 3, 8, 18, 15),
      n("#2a4a70", 4, 9, 16, 13),
      n(i, 4, 12, 16, 10),
      n(c, 5, 12, 12, 10),
      n(s, 6, 12, 2, 9),
      n("#0006", 17, 12, 3, 10),
      n(l, 19, 10, 4, 2),
      n(l, 22, 10, 2, 8),
      n(l, 19, 17, 4, 2),
      n("#eaf6ff", 6, 15, 10, 5),
      n("#2a7ad8", 10, 16, 2, 3),
      n("#2a7ad8", 9, 18, 4, 1),
      n(s, 5, 10, 14, 1),
      n(l, 3, 22, 18, 1));
  else if ("shaker" === t) {
    (n(l, 5, 1, 14, 7), n("#9aa0b8", 6, 2, 12, 5), n("#d8dcee", 6, 2, 12, 1));
    for (let t = 0; t < 4; t++) n("#2a2e40", 8 + 3 * t, 4, 1, 1);
    (n(l, 3, 8, 18, 15),
      n("#3a4258", 4, 9, 16, 13),
      n("#f4f4ff", 5, 11, 14, 11),
      n("#cfd2e8", 5, 17, 14, 5),
      n("#ffffff", 6, 11, 2, 10),
      n("#8a90ac", 16, 11, 3, 11),
      n(l, 7, 13, 10, 5),
      n("#d82a3a", 8, 14, 8, 3),
      n("#fff", 9, 15, 6, 1),
      n(l, 3, 22, 18, 1));
  } else if ("goggles" === t)
    (n(l, 0, 8, 24, 8),
      n("#6a3a1a", 1, 9, 22, 6),
      n("#9a5a2a", 1, 9, 22, 1),
      n(l, 2, 5, 9, 14),
      n(l, 13, 5, 9, 14),
      n("#2a3a50", 3, 6, 7, 12),
      n("#2a3a50", 14, 6, 7, 12),
      n(a, 4, 7, 5, 10),
      n(a, 15, 7, 5, 10),
      n(i, 4, 13, 5, 4),
      n(i, 15, 13, 5, 4),
      n(s, 4, 7, 2, 6),
      n(s, 15, 7, 2, 6),
      n("#fff", 5, 8, 1, 3),
      n("#fff", 16, 8, 1, 3),
      n(l, 11, 10, 2, 4));
  else if ("box" === t)
    (n(l, 2, 2, 20, 21),
      n(a, 3, 3, 18, 19),
      n(s, 3, 3, 18, 1),
      n(i, 3, 19, 18, 3),
      n(i, 18, 3, 3, 16),
      n("#fff6e0", 5, 7, 14, 8),
      n(l, 5, 7, 14, 1),
      n(l, 5, 14, 14, 1),
      n("#2a6ad8", 7, 9, 10, 2),
      n("#d82a1a", 7, 12, 6, 1),
      n(l, 2, 22, 20, 1));
  else if ("sugar" === t)
    (n(l, 3, 2, 18, 3),
      n("#ff9ac0", 4, 3, 16, 1),
      n(l, 2, 5, 20, 18),
      n("#f4f4ff", 3, 6, 18, 16),
      n("#cfd2e8", 17, 6, 4, 16),
      n("#ffffff", 4, 6, 2, 15),
      n("#ff6a9a", 6, 10, 12, 7),
      n("#ffd0e0", 8, 12, 8, 3),
      n("#fff", 9, 13, 2, 1),
      n(l, 2, 22, 20, 1));
  else if ("gloves" === t)
    (n(l, 4, 10, 15, 12),
      n(a, 5, 11, 13, 10),
      [5, 9, 13, 17].forEach((t, e) => {
        (n(l, t - 1, 2 + (e % 3 == 1 ? -1 : 1) + (3 == e ? 3 : 0), 4, 9),
          n(a, t, 3 + (e % 3 == 1 ? -1 : 1) + (3 == e ? 3 : 0), 2, 8));
      }),
      n(l, 1, 13, 5, 6),
      n(a, 2, 14, 3, 4),
      n(s, 6, 12, 2, 7),
      n(i, 15, 12, 3, 9),
      n("#e8f4ff", 6, 21, 12, 2),
      n(l, 5, 23, 14, 1));
  else if ("rod" === t) {
    for (let t = 0; t < 19; t++) n(l, 2 + t, 19 - t, 4, 4);
    for (let t = 0; t < 19; t++)
      (n("#cfe8ff", 3 + t, 20 - t, 2, 2), t % 3 == 0 && n("#ffffff", 3 + t, 20 - t, 1, 1));
    n("#7ac8e8", 16, 6, 3, 3);
  } else if ("strip" === t)
    (n(l, 7, 1, 10, 22),
      n("#f4f0dc", 8, 2, 8, 20),
      [
        ["#e83a3a", 3],
        ["#e8883a", 7],
        ["#e8d83a", 11],
        ["#5ac85a", 15],
        ["#3a6ae8", 19],
      ].forEach(([t, a]) => {
        (n(t, 8, a, 8, 3), n("#ffffff55", 8, a, 8, 1));
      }),
      n("#fff", 9, 2, 1, 19),
      n("#b8b098", 15, 2, 1, 20));
  else if ("vial" === t)
    (n(l, 9, 1, 6, 4),
      n("#8a6a4a", 10, 2, 4, 2),
      n(l, 8, 5, 8, 18),
      n("#2a2040", 9, 6, 6, 16),
      n(c, 9, 10, 6, 12),
      n(s, 10, 10, 1, 11),
      n(i, 13, 10, 2, 12),
      n("#ffffffaa", 10, 7, 1, 2),
      n(l, 10, 14, 4, 5),
      n("#e8e0c0", 11, 15, 2, 3),
      n("#1a1a1a", 11, 16, 2, 1));
  else if ("canister" === t)
    (n(l, 8, 0, 8, 4),
      n("#8a94ac", 9, 1, 6, 2),
      n(l, 5, 4, 14, 19),
      n("#5a6478", 6, 5, 12, 17),
      n("#9aa4bc", 6, 5, 3, 17),
      n("#2a3040", 15, 5, 3, 17),
      n("#3a4258", 6, 8, 12, 1),
      n("#3a4258", 6, 19, 12, 1),
      n(l, 9, 10, 6, 9),
      n(c, 10, 11, 4, 7),
      n(s, 10, 11, 1, 7),
      n("#e8d040", 7, 6, 3, 2));
  else if ("barrel" === t) {
    (n(l, 1, 8, 22, 8),
      n("#6a7488", 2, 9, 20, 6),
      n("#aab4c8", 2, 9, 20, 1),
      n("#2a3040", 2, 14, 20, 1),
      n(l, 19, 6, 4, 12),
      n("#8a94ac", 20, 7, 2, 10),
      n("#c8d0e0", 20, 7, 2, 1));
    for (let t = 0; t < 4; t++) n("#3a4258", 4 + 3 * t, 9, 1, 6);
    n(l, 0, 10, 2, 4);
  } else if ("handle" === t) {
    (n(l, 5, 3, 14, 7),
      n("#4a5468", 6, 4, 12, 5),
      n("#8a94ac", 6, 4, 12, 1),
      n(l, 8, 9, 9, 14),
      n("#3a2a1c", 9, 10, 7, 12),
      n("#5a4430", 9, 10, 2, 12),
      n("#1e140c", 14, 10, 2, 12));
    for (let t = 0; t < 4; t++) n("#1e140c", 10, 12 + 3 * t, 5, 1);
    (n(l, 16, 9, 5, 5), n("#c8a85a", 17, 10, 3, 3));
  } else if ("blaster" === t)
    (n(l, 1, 9, 22, 7),
      n("#6a7488", 2, 10, 20, 5),
      n("#aab4c8", 2, 10, 20, 1),
      n("#2a3040", 2, 14, 20, 1),
      n(l, 20, 7, 4, 11),
      n("#8a94ac", 21, 8, 2, 9),
      n(l, 7, 1, 9, 9),
      n("#5a6478", 8, 2, 7, 7),
      n(c, 9, 3, 5, 5),
      n(s, 9, 3, 1, 5),
      n("#ffffff", 10, 4, 1, 1),
      n(l, 4, 15, 7, 9),
      n("#3a2a1c", 5, 16, 5, 7),
      n("#5a4430", 5, 16, 2, 7),
      n(l, 11, 15, 4, 4),
      n("#c8a85a", 12, 16, 2, 2));
  else if ("gun" === t) {
    (n(l, 1, 4, 23, 9),
      n(l, 3, 12, 16, 3),
      n(l, 9, 14, 8, 5),
      n(l, 2, 12, 9, 12),
      n("#3b4256", 2, 5, 21, 7),
      n("#6a7690", 2, 5, 21, 2),
      n("#aab4cc", 3, 5, 18, 1),
      n("#1a1e2a", 2, 11, 21, 1),
      n("#262b3a", 16, 6, 7, 5),
      n("#0a0c14", 23, 6, 1, 4),
      n("#1a1e2a", 22, 7, 1, 3));
    for (let t = 5; t < 11; t += 2) (n("#14171f", t, 7, 1, 4), n("#8a94ac", t + 1, 7, 1, 4));
    (n("#0c0e16", 13, 7, 4, 2),
      n("#d8dcec", 14, 7, 2, 1),
      n("#e8e8f4", 3, 3, 2, 2),
      n("#e8e8f4", 20, 3, 2, 2),
      n("#ff5a3a", 21, 3, 1, 1),
      n("#4a5268", 4, 12, 14, 2),
      n("#7a86a0", 4, 12, 14, 1),
      n("#0c0e16", 11, 14, 6, 4),
      n("#3b4256", 11, 14, 6, 1),
      n("#1a1e2a", 12, 15, 1, 2),
      n("#c8ccdc", 13, 15, 1, 2),
      n("#2a2418", 3, 13, 8, 10),
      n(a, 4, 14, 6, 8),
      n("#5a4a2a", 4, 14, 1, 8),
      n("#14100a", 9, 14, 1, 8));
    for (let t = 15; t < 22; t += 2) (n("#14100a", 5, t, 4, 1), n("#8a7448", 5, t + 1, 4, 1));
    (n("#3bf08a", 9, 8, 1, 2), n("#3bf08a55", 8, 7, 3, 4), n("#fff", 9, 8, 1, 1));
  } else
    "potion" === t &&
      (n(l, 8, 1, 8, 4),
      n("#9a6a3a", 9, 1, 6, 3),
      n("#c8905a", 9, 1, 6, 1),
      n(l, 9, 5, 6, 5),
      n("#cfe8ff", 10, 5, 4, 5),
      n(l, 5, 10, 14, 3),
      n(l, 2, 13, 20, 10),
      n("#2a4a3a", 3, 14, 18, 8),
      n(c, 3, 15, 18, 7),
      n(s, 4, 15, 3, 6),
      n("#eaffea", 5, 15, 1, 3),
      n("#0a5a1a", 3, 20, 18, 2),
      n(i, 17, 15, 4, 6),
      n("#fff", 14, 17, 2, 2),
      n("#d8ffd8", 8, 18, 2, 2),
      n(s, 9, 12, 6, 2),
      n(l, 2, 22, 20, 1));
  return (ue[e] = o.toDataURL());
}
const ye = [[255, 134, 208], [255, 226, 110], null, null, [190, 160, 255], null];
function xe(t, a, e, o, r, n, l, s) {
  (t.rect(a, e, o, r, n),
    t.rect(a, e, o, 1, l),
    t.rect(a, e, 1, r, l, 0.55),
    t.rect(a, e + r - 1, o, 1, s),
    t.rect(a + o - 1, e, 1, r, s, 0.75));
}
function Me(t, a) {
  const e = 384;
  t.grad(0, 168, a.g);
  for (let o = 0; o < e; o += 64) {
    (t.rect(o, 0, 2, 168, a.s0), t.rect(o + 2, 0, 1, 168, a.lit, 0.55));
    for (let e = 14; e < 160; e += 26) (t.px(o + 6, e, a.lit), t.px(o + 58, e, a.lit));
  }
  for (let o = 0; o < e; o += 64)
    for (let e = 28; e < 132; e += 34)
      (t.rect(o + 12, e, 40, 24, a.s0, 0.4), t.rect(o + 12, e, 40, 1, a.lit, 0.4));
  (t.rect(0, 140, e, 28, a.wain), t.rect(0, 140, e, 1, a.lit));
  for (let o = 0; o < e; o += 16) t.rect(o, 141, 1, 27, a.s0, 0.45);
  (t.rect(0, 166, e, 2, a.s0), t.rect(0, 0, e, 24, a.ceil), t.rect(0, 24, e, 1, a.lit));
  for (let o = 0; o < 3; o++) {
    const r = 4 + 6 * o;
    (t.rect(0, r, e, 4, a.pipe[o]), t.rect(0, r, e, 1, a.lit), t.rect(0, r + 3, e, 1, a.s0));
    for (let n = 20 + 30 * o; n < e; n += 70)
      (t.rect(n, r - 1, 5, 6, a.pipe[(o + 1) % 3]), t.rect(n, r - 1, 5, 1, a.lit));
  }
  (a.lamps.forEach((e) => {
    (t.rect(e, 26, 34, 3, a.s0),
      t.rect(e + 2, 29, 30, 2, a.lamp),
      t.light(e + 17, 34, 64, a.lampc, 0.5));
  }),
    t.grad(168, 216, a.floor));
  for (let e = -16; e <= 16; e++) t.line(192 + 18 * e, 168, 192 + 60 * e, 216, a.fl, 0.5);
  ([168, 174, 182, 193, 207].forEach((o) => {
    (t.rect(0, o, e, 1, a.fl, 0.5), t.rect(0, o + 1, e, 1, a.s0, 0.4));
  }),
    t.rect(0, 168, e, 1, a.lit, 0.7));
}
function we(t, a, e) {
  const o = 384,
    n = (e = e || {}).n || 14;
  for (let l = 0; l < n; l++)
    Ba(t, r(l, a) * o, 22, (30 + r(l, a + 1) * (e.len || 110)) | 0, 3.7 * l + a, ye[l % 6]);
  for (let l = 0; l < n; l++) {
    const n = r(l, a) * o,
      s = (30 + r(l, a + 1) * (e.len || 110)) | 0;
    Fa(t, n, 22 + s, 3.5 + 3 * r(l, 5), 7 * l + a);
  }
  for (let e = 0; e < 6; e++)
    Ga(t, r(e, a + 3) * o * 0.9, 138, (40 + 50 * r(e, a + 4)) | 0, 16, e + a);
  for (let e = 0; e < 4; e++) Ga(t, r(e, a + 5) * o * 0.9, 164, 60, 10, e + a + 9);
  for (let e = 0; e < o; e += 3) {
    const o = (2 + 8 * r(e, a + 60)) | 0;
    if (r(e, a + 61) < 0.4 + (e < 60 || e > 320 ? 0.3 : 0))
      for (let n = 0; n < o; n++)
        t.px(
          e + (n > 0.6 * o ? 1 : 0),
          214 - n - 26 * r(e, a + 63),
          Ct([20, 86, 46], [118, 210, 96], n / o),
        );
  }
  [
    [14, 200],
    [360, 202],
    [110, 210],
    [250, 208],
    [60, 212],
    [320, 212],
    [190, 214],
  ].forEach(([e, o], n) => Da(t, e, o, 14 + 8 * r(n, 3), 3 * n + a, [20, 90, 50], [120, 220, 100]));
  for (let e = 0; e < 7; e++)
    Fa(t, 10 + 60 * e + 14 * r(e, 4), 200 + 14 * r(e, 5), 10 + 9 * r(e, 6), 11 * e + a);
  for (let e = 0; e < 10; e++) {
    const n = r(e, a + 71) * o,
      l = 178 + 34 * r(e, a + 72),
      s = r(e, 73) < 0.5 ? [255, 226, 120] : [255, 150, 210];
    (t.rect(n, l - 4, 1, 4, [40, 110, 50]),
      t.rect(n - 1, l - 6, 3, 3, s),
      t.px(n, l - 5, [255, 250, 200]));
  }
  for (let e = 0; e < 4; e++) {
    let n = r(e, a + 31) * o,
      l = 172 + 36 * r(e, a + 32);
    const s = n < 192 ? 1 : -1;
    for (let a = 0; a < 50; a++) {
      ((n += s * (0.9 + 0.6 * r(e, a))), (l += 0.5 * Math.sin(0.2 * a + e)));
      const o = 0 | Math.max(1, 3 - a / 18);
      for (let a = 0; a < o; a++) t.px(n, l + a, a ? [10, 50, 30] : [60, 120, 60]);
    }
  }
  (t.fog(0, 150, o, 214, "#a8ffc8", 0.4, a, 34, 8, 0.16),
    t.light(60, 0, 170, "#d8ff9a", 0.7),
    t.light(330, 0, 150, "#d8ff9a", 0.5),
    t.light(190, 214, 90, "#9affc0", 0.35, 0.6));
}
function ve(t, a, e, o, n, l, s, c, i) {
  for (let f = 0; f <= 70; f++) {
    const h = f / 70,
      d = a + (o - a) * h + 2 * Math.sin(9 * h + s),
      b = e + (n - e) * h + Math.sin(h * Math.PI) * l,
      g = r(s, f) < 0.3 ? [96, 190, 86] : [26, 96, 52];
    if (
      (t.rect(d, b, c, c, g),
      t.rect(d, b + c, c, 1, [8, 44, 26]),
      t.rect(d, b, c, 1, [120, 214, 104], 0.8),
      f % 5 == 2)
    ) {
      const a = r(s, f + 3) < 0.5 ? -1 : 1;
      (t.rect(d + 3 * a, b - 1, 3, 2, [70, 170, 80]),
        t.rect(d + 4 * a, b - 2, 2, 1, [130, 226, 110]),
        r(s, f) < 0.2 && t.rect(d + 3 * a, b, 2, 2, i || [255, 134, 208]));
    }
  }
}
function ke(t, a) {
  const e = document.createElement("canvas");
  ((e.width = 384), (e.height = 216));
  const o = ft;
  ((ft = e.getContext("2d")), Ht(a), (ft = o));
  const r = t.getContext("2d");
  (r.setTransform(1, 0, 0, 1, 0, 0), r.drawImage(e, 0, 0));
}
function Ae(t) {
  const a = document.createElement("canvas");
  ((a.width = 384), (a.height = 216));
  const e = ft;
  return ((ft = a.getContext("2d")), Ht(t), (ft = e), a);
}
const Ee = (t, a, e, o, n, l) => {
    const s = ["#58d878", "#d85a8a", "#58a8e8", "#a858d8", "#e8c858", "#58e8c8", "#e85858"];
    for (let c = 0; c < o; c++) {
      const o = s[(7 * r(c, n)) | 0],
        i = (l || 10) + ((5 * r(c, n + 2)) | 0),
        f = a + 8 * c;
      (t.rect(f, e - i, 6, i, "#0a0c14"),
        t.rect(f + 1, e - i + 1, 4, i - 1, o),
        t.rect(f + 1, e - i + 1, 1, i - 2, ge(o, 0.6)),
        t.rect(f + 4, e - i + 2, 1, i - 3, pe(o, 0.4)),
        t.rect(f + 2, e - i - 2, 2, 2, "#0a0c14"));
    }
  },
  Te = [
    [5, 6, 7, 14, 15, 16, 17],
    [4, 5, 6, 12, 13, 14],
    [6, 7, 8, 15, 16, 17],
  ],
  Se = [],
  Ce = (() => {
    const t = [{ x: 4, y: 40, w: 34 }],
      a = Te,
      e = [
        [24, 40],
        [178, 128],
        [14, 216],
      ];
    return (
      [
        [38, 6, 44],
        [158, -6, 132],
        [34, 6, 220],
      ].forEach(([o, r, n], l) => {
        const s = a[l],
          c = [];
        for (let t = 0; t < 22; t++) c.push({ k: t, x: o + t * r, y: n + 4 * t, w: 6 });
        const i = [];
        s.slice()
          .sort((t, a) => t - a)
          .forEach((t) => {
            const a = i[i.length - 1];
            a && a[a.length - 1] === t - 1 ? a.push(t) : i.push([t]);
          });
        const f = {};
        (i.forEach((t) => {
          const a = t.map((t) => c[t].x),
            o = Math.min(...a),
            r = Math.max(...a) + 6,
            n = t.map((t) => c[t].y),
            s = c.find((t) => t.x + 6 === o),
            i = c.find((t) => t.x === r);
          (s && (f[s.k] = { x: s.x, w: 4, br: "R" }),
            i && (f[i.k] = { x: i.x + 2, w: 4, br: "L" }),
            Se.push({
              fi: l,
              lo: o - 2,
              hi: r + 2,
              y0: Math.min(...n),
              y1: Math.max(...n),
              cx: (o + r) / 2,
              top: e[l],
            }));
        }),
          c.forEach((a) => {
            s.includes(a.k) ||
              t.push(f[a.k] ? Object.assign({ y: a.y }, f[a.k]) : { x: a.x, y: a.y, w: a.w });
          }),
          0 === l && t.push({ x: 166, y: 128, w: 24 }),
          1 === l && t.push({ x: 2, y: 216, w: 30 }),
          2 === l && t.push({ x: 166, y: 304, w: 24 }));
      }),
      t
    );
  })(),
  Re = [
    [38, 44, 164, 128],
    [158, 132, 32, 216],
    [34, 220, 160, 304],
  ],
  Pe = [
    { x: 30, y: 288, w: 22 },
    { x: 6, y: 272, w: 22 },
    { x: 30, y: 256, w: 22 },
    { x: 6, y: 240, w: 22 },
    { x: 28, y: 226, w: 14 },
  ];
function Ie(t, a, e, o, r, n) {
  (t.rect(a - 0.6 * o, e - 5 * o, 1.2 * o, 5 * o, "#d8d0b8"),
    t.rect(a - 0.6 * o, e - 5 * o, 0.4 * o, 5 * o, "#fff4d8", 0.6),
    t.poly(
      [
        [a - 4.2 * o, e - 4.6 * o],
        [a - 3.4 * o, e - 7.4 * o],
        [a - 1 * o, e - 9 * o],
        [a + 1.6 * o, e - 9 * o],
        [a + 3.6 * o, e - 7.4 * o],
        [a + 4.4 * o, e - 4.6 * o],
      ],
      r,
    ),
    t.poly(
      [
        [a - 4.2 * o, e - 4.6 * o],
        [a + 4.4 * o, e - 4.6 * o],
        [a + 3 * o, e - 3.8 * o],
        [a - 3 * o, e - 3.8 * o],
      ],
      "#2a1a18",
      0.7,
    ),
    t.rect(a - 2.4 * o, e - 7.6 * o, o, o, "#fff0d0"),
    t.rect(a + 0.8 * o, e - 8.2 * o, 0.8 * o, 0.8 * o, "#fff0d0"),
    t.rect(a + 2 * o, e - 6.4 * o, 0.8 * o, 0.8 * o, "#fff0d0"),
    t.light(a, e - 6 * o, 9 * o, n, 0.4, 0.6));
}
function Oe(t, a, e, o, n) {
  const l = n || [
      ["#e8683a", "#ff9a4a"],
      ["#4ad0c0", "#7affe0"],
      ["#c860e0", "#e89aff"],
      ["#e8d860", "#fff08a"],
    ],
    s = 2 + ((3 * r(o, 1)) | 0);
  for (let n = 0; n < s; n++) {
    const c = l[(o + n) % l.length];
    Ie(t, a + 6 * n - 3 * s + 3 * r(o, n + 5), e + (n % 2), 0.9 + 0.9 * r(o, n + 9), c[0], c[1]);
  }
}
function Le(t, a, e, o, r, n) {
  const l = Math.cos(r),
    s = Math.sin(r);
  (t.line(a, e, a + l * o, e + s * o, "#6aa8b0", 0.85),
    t.line(a, e - 1, a + l * o, e - 1 + s * o, "#cfeff2", 0.55),
    t.line(a, e + 1, a + l * o, e + 1 + s * o, "#e8ffff", 0.35));
  const c = a + l * o,
    i = e + s * o;
  n
    ? t.poly(
        [
          [c, i - 2],
          [c + 2, i - 4],
          [c + 3, i - 1],
          [c + 5, i - 3],
          [c + 4, i + 1],
          [c + 1, i + 2],
        ],
        [210, 245, 250, 0.75],
      )
    : t.rect(c - 1, i - 1, 2, 3, "#9ac8d0");
}
function He(t, a, e, o, r) {
  (t.disc(a, e, o, (t, a) =>
    (t * t) / (o * o) + (a * a) / (0.2 * o * (0.2 * o)) < 1 ? [r[0], r[1], r[2], 0.72] : null,
  ),
    t.light(
      a,
      e - 1,
      1.5 * o,
      "#" + ((1 << 24) | (r[0] << 16) | (r[1] << 8) | r[2]).toString(16).slice(1),
      0.55,
      0.5,
    ));
}
function Ne(t, a, e, o, n) {
  for (let l = 0; l < 22; l++) {
    const s = a + r(n, l) * o,
      c = e + 5 * r(n, l + 40);
    (t.poly(
      [
        [s, c],
        [s + 3, c + 1],
        [s + 1, c - 2],
      ],
      [225, 250, 255, 0.85],
    ),
      l % 4 == 0 && t.px(s + 1, c - 1, "#ffffff"));
  }
}
function De(t) {
  const a = Te[t].slice().sort((t, a) => t - a),
    e = [];
  a.forEach((t) => {
    const a = e[e.length - 1];
    a && a[a.length - 1] === t - 1 ? a.push(t) : e.push([t]);
  });
  const o = [];
  let r = 0;
  return (
    e.forEach((t) => {
      (o.push([r, t[0] - 0.4]), (r = t[t.length - 1] + 1.4));
    }),
    o.push([r, 21]),
    o
  );
}
