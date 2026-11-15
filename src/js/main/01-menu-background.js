const $sx = (...a) => {
  try {
    window.SFX && window.SFX.p(...a);
  } catch (e) {}
};
const t = (t) => document.querySelector(t),
  a = t("#bg"),
  e = a.getContext("2d"),
  o = matchMedia("(prefers-reduced-motion:reduce)").matches,
  r = (t, a) => {
    const e = 43758.5453 * Math.sin(12.9898 * t + 78.233 * a);
    return e - Math.floor(e);
  },
  n = (t, a, o, r, n) => {
    ((e.fillStyle = t), e.fillRect(a, o, r, n));
  },
  l = (t, a, e, o) => {
    for (let r = -e; r <= e; r++) {
      const l = 0 | Math.sqrt(e * e - r * r + 0.6 * e);
      n(o, t - l, a + r, 2 * l + 1, 1);
    }
  };
let s,
  c,
  i,
  f,
  h,
  d,
  b,
  g = 0;
const p = (t) => 1 + ((Math.round(t) >> 1) << 1);
function u() {
  ((i = Math.max(3, Math.round(Math.min(innerWidth, innerHeight) / 150))),
    (s = Math.ceil(innerWidth / i)),
    (c = Math.ceil(innerHeight / i)),
    (a.width = s),
    (a.height = c),
    (f = (0.655 * c) | 0));
  const t = (0.32 * c) | 0,
    e = f - t,
    o = s >> 1;
  h = p(Math.max(12, Math.min(26, 0.24 * e)));
  const r = p(0.68 * h),
    n = (h >> 1) + (r >> 1) + 6;
  d = [
    { cx: o - n, top: f - Math.round(0.8 * e), w: r, liq: "#2f7bff", hi: "#9be7ff", lv: 0.38 },
    { cx: o + n, top: f - Math.round(0.7 * e), w: r, liq: "#1fb8a6", hi: "#a8fff0", lv: 0.3 },
    { cx: o, top: t, w: h, liq: "#16705a", hi: "#5dffb0", lv: 0.16, main: 1 },
  ];
  const l = ((g = 5), () => (g = (16807 * g) % 2147483647) / 2147483647);
  var g;
  b = Array.from({ length: Math.ceil(s / 4) }, () => [l() * s, l() * f, 0.1 + 0.2 * l()]);
}
function m(t, a) {
  const e = t.w >> 1,
    o = t.cx - e,
    s = f - 1,
    c = s - e,
    i = t.top + (((c - t.top) * t.lv) | 0),
    d = "#7fcbe8";
  n(d, o, t.top, t.w, c - t.top + 1);
  for (let a = 1; a <= e; a++) {
    const o = 0 | Math.sqrt(e * e - a * a + 0.6 * e);
    n(d, t.cx - o, c + a, 2 * o + 1, 1);
  }
  (n("#0a1a2c", o + 1, t.top + 1, t.w - 2, i - t.top - 1), n(t.liq, o + 1, i, t.w - 2, c - i + 1));
  for (let a = 1; a < e; a++) {
    const o = 0 | Math.sqrt((e - 1) ** 2 - a * a + 0.6 * e);
    n(t.liq, t.cx - o, c + a, 2 * o + 1, 1);
  }
  if ((n(t.hi, o + 1, i, t.w - 2, 1), t.main)) {
    const e = Math.max(2, 0.17 * h),
      o = (h - 4) / 2 - 1.6 * e,
      c = i + 3 * e + 1,
      f = s - 3 * e - 1;
    for (let s = 0; s < 7; s++) {
      const i = a / (5 + 3 * r(s, 1)) + r(s, 2),
        h = Math.floor(i),
        d = i - h,
        b = 1.2 * (r(s, h + 3) - 0.5),
        g = t.cx + 2 * (r(s, h) - 0.5) * o + Math.sin(0.8 * a + s),
        p = c + r(s + 9, h) * (f - c) + Math.cos(0.6 * a + 2 * s),
        u = e * (d < 0.06 ? d / 0.06 : d > 0.94 ? (1 - d) / 0.06 : 1);
      if (u < 1) continue;
      let m;
      if (d < 0.45) m = [[g, p, u * (0.7 + (0.5 * d) / 0.45)]];
      else {
        const t = Math.min(1, (d - 0.45) / 0.35),
          a = d < 0.8 ? t * e * 1.3 : e * (1.3 + (0.8 * (d - 0.8)) / 0.2),
          o = u * (1.2 - 0.15 * t);
        m = [
          [g - Math.sin(b) * a, p - Math.cos(b) * a, o],
          [g + Math.sin(b) * a, p + Math.cos(b) * a, o],
        ];
      }
      (m.forEach(([t, a, e]) => l(0 | t, 0 | a, Math.round(e), "#8be86b")),
        m.forEach(([t, a, e]) => l(0 | t, 0 | a, Math.max(1, Math.round(e) - 1), "#eaffb0")),
        m.forEach(([t, a]) => n("#2f8f4f", 0 | t, 0 | a, 1, 1)));
    }
  }
  const b = c + e - i - 4;
  for (let e = 0; e < 4; e++)
    n(
      "#d6fff0",
      t.cx + Math.round((r(e, t.cx) - 0.5) * (t.w - 6) + Math.sin(2 * a + e)),
      (s - 2 - ((a * (4 + 1.3 * e) + 17 * e) % b)) | 0,
      1,
      1,
    );
  (n("#e6faff", o + 2, t.top + 3, 1, Math.max(1, c - t.top - 5)),
    n("#bfeaff", o - 1, t.top, t.w + 2, 2));
}
const MF = {
    G: "111100101101111",
    O: "010101101101010",
    D: "110101101101110",
    M: "101111111101101",
    R: "110101110101101",
    N: "111101101101101",
    I: "111010010010111",
    P: "111101111100100",
    L: "100100100100111",
    A: "010101111101101",
    Y: "101101010010010",
    W: "101101111111101",
  },
  MN2 = [".##", ".#.", ".#.", "##.", "##."],
  MK = Object.keys(MF);
function mtx(w, x, y, c, sc) {
  for (let k = 0; k < w.length; k++) {
    const g = MF[(sc && sc[k]) || w[k]];
    for (let q = 0; q < 15; q++) "1" === g[q] && n(c, x + 4 * k + (q % 3), y + ((q / 3) | 0), 1, 1);
  }
}
function mon(tm) {
  const $T = o ? 0 : tm / 1000,
    $pw = 20,
    $ph = 20,
    $xc = Math.min(Math.round(0.9 * s), s - ($pw >> 1) - 4),
    $by = f - 1,
    $q = window.__eqRead ? window.__eqRead() : { l: 0, b: [0, 0, 0, 0, 0] },
    $l = $q.l,
    $bob = o ? 0 : Math.round(Math.sin(2 * $T)),
    $ey = $by - 6,
    $pb = $ey - 9 + $bob,
    $pt = $pb - $ph,
    $x0 = $xc - ($pw >> 1),
    $cy = $pt + $ph / 2,
    $dip = !o && r(($T * 30) | 0, 11) < 0.05,
    $fa = $dip ? 0.35 : 0.84 + 0.16 * Math.sin(37 * $T),
    $gb = !o && r(($T * 9) | 0, 7) < 0.2,
    $big = !o && r(($T * 9) | 0, 5) < 0.07,
    $j = $gb ? Math.round((r(($T * 40) | 0, 2) - 0.5) * (0.5 + $big) * 6) : 0,
    $pu = 0.65 + 0.35 * Math.sin(4.2 * $T);
  /* beam */
  e.globalCompositeOperation = "lighter";
  let $g = e.createLinearGradient(0, $ey, 0, $pb);
  ($g.addColorStop(0, "rgba(110,240,255," + (0.38 * $fa).toFixed(3) + ")"),
    $g.addColorStop(1, "rgba(110,240,255," + (0.05 * $fa).toFixed(3) + ")"),
    (e.fillStyle = $g),
    e.beginPath(),
    e.moveTo($xc - 4, $ey),
    e.lineTo($xc + 4, $ey),
    e.lineTo($xc + $pw / 2, $pb),
    e.lineTo($xc - $pw / 2, $pb),
    e.closePath(),
    e.fill());
  const $rr = $pw * 1.6,
    $rg = e.createRadialGradient($xc, $cy, 0, $xc, $cy, $rr);
  ($rg.addColorStop(0, "rgba(90,230,255," + ((0.08 + 0.22 * $l) * $fa).toFixed(3) + ")"),
    $rg.addColorStop(1, "rgba(90,230,255,0)"),
    (e.fillStyle = $rg),
    e.fillRect($xc - $rr, $cy - $rr, 2 * $rr, 2 * $rr));
  const $eg = e.createRadialGradient($xc, $ey, 0, $xc, $ey, 12);
  ($eg.addColorStop(0, "rgba(150,250,255," + (0.45 * $pu).toFixed(3) + ")"),
    $eg.addColorStop(1, "rgba(150,250,255,0)"),
    (e.fillStyle = $eg),
    e.fillRect($xc - 12, $ey - 12, 24, 24),
    (e.globalCompositeOperation = "source-over"));
  /* rising scan rings + particles inside the beam */
  for (let k = 0; k < 4; k++) {
    const $p = ($T * 0.7 + k / 4) % 1,
      $y = ($ey - $p * ($ey - $pb)) | 0,
      $hw = (4 + ($pw / 2 - 4) * $p) | 0,
      $a = (1 - $p) * 0.75 * $fa;
    (n("rgba(150,250,255," + $a.toFixed(2) + ")", $xc - $hw, $y, 2 * $hw + 1, 1),
      n("rgba(220,255,255," + Math.min(1, 1.3 * $a).toFixed(2) + ")", $xc - $hw, $y, 2, 1),
      n("rgba(220,255,255," + Math.min(1, 1.3 * $a).toFixed(2) + ")", $xc + $hw - 1, $y, 2, 1));
  }
  if (!o)
    for (let k = 0; k < 10; k++) {
      const $p = ($T * (0.25 + 0.2 * r(k, 3)) + r(k, 4)) % 1,
        $hw = 4 + ($pw / 2 - 4) * $p,
        $px = ($xc + (2 * r(k, 6) - 1) * $hw * 0.9) | 0,
        $py = ($ey - $p * ($ey - $pb)) | 0;
      n("rgba(200,255,255," + ((1 - $p) * 0.9).toFixed(2) + ")", $px, $py, 1, 1);
    }
  /* device */
  (n("#0b1424", $xc - 8, $by - 4, 17, 5),
    n("#1d2c48", $xc - 7, $by - 5, 15, 5),
    n("#5f78a3", $xc - 7, $by - 5, 15, 1),
    n("#2a3f66", $xc - 7, $by - 4, 15, 1),
    n("#0e1829", $xc - 7, $by - 1, 15, 1));
  for (let k = 0; k < 3; k++) n("#0b1424", $xc + 1 + 2 * k, $by - 3, 1, 2);
  (n(Math.sin(6 * $T) > 0 ? "#3aff9a" : "#145a38", $xc - 6, $by - 3, 1, 1),
    n(Math.sin(4 * $T + 2) > 0 ? "#ff6ad0" : "#5a1a48", $xc - 4, $by - 3, 1, 1),
    n("#7fe8ff", $xc - 6, $by - 2, 3, 1));
  (n("#0a1a2c", $xc - 5, $ey + 0, 11, 1),
    n("rgba(140,250,255," + (0.55 + 0.45 * $pu).toFixed(2) + ")", $xc - 4, $ey, 9, 1),
    n("rgba(255,255,255," + $pu.toFixed(2) + ")", $xc - 2, $ey, 5, 1),
    n("#5f78a3", $xc - 5, $ey + 1, 11, 1));
  /* panel */
  (n("rgba(3,10,22,.58)", $x0, $pt, $pw, $ph),
    n("rgba(60,220,255," + (0.14 * $fa).toFixed(3) + ")", $x0, $pt, $pw, $ph));
  for (let k = 1; k < $ph; k += 2) n("rgba(0,40,60,.24)", $x0, $pt + k, $pw, 1);
  const $bc = "rgba(140,248,255," + (0.95 * $fa).toFixed(2) + ")";
  [
    [0, 0, 1, 1],
    [$pw - 1, 0, -1, 1],
    [0, $ph - 1, 1, -1],
    [$pw - 1, $ph - 1, -1, -1],
  ].forEach(([cx, cy, dx, dy]) => {
    for (let k = 0; k < 4; k++)
      (n($bc, $x0 + cx + dx * k, $pt + cy, 1, 1), n($bc, $x0 + cx, $pt + cy + dy * k, 1, 1));
  });
  (n("rgba(140,248,255," + (0.3 * $fa).toFixed(2) + ")", $x0 + 4, $pt, $pw - 8, 1),
    n("rgba(140,248,255," + (0.3 * $fa).toFixed(2) + ")", $x0 + 4, $pt + $ph - 1, $pw - 8, 1));
  for (let k = 0; k < 4; k++) {
    const $h = 2 + (o ? 1 : Math.round(2 + 2 * Math.sin(3 * $T + 2 * k)));
    (n("rgba(140,248,255," + (0.7 * $fa).toFixed(2) + ")", $x0 - 3, $pt + 3 + 5 * k, $h, 1),
      n(
        "rgba(140,248,255," + (0.7 * $fa).toFixed(2) + ")",
        $x0 + $pw + 3 - $h,
        $pt + 3 + 5 * k,
        $h,
        1,
      ));
  }
  const $sw = $big
      ? ["PLAY", "NOW"].map((w) =>
          [...w]
            .map((c, k) =>
              r(($T * 25) | 0, k + 9) < 0.45 ? MK[(MK.length * r(($T * 25) | 0, k + 3)) | 0] : c,
            )
            .join(""),
        )
      : ["PLAY", "NOW"],
    $ta = Math.min(1, $fa + 0.1),
    $px = $x0 + 3 + $j,
    $nx = $x0 + 5 - $j,
    $sp = 1 + ($gb ? 1 : 0);
  (mtx("PLAY", $px + $sp, $pt + 2, "rgba(255,60,90," + (0.6 * $fa).toFixed(2) + ")", $sw[0]),
    mtx("PLAY", $px - $sp, $pt + 2, "rgba(60,255,220," + (0.6 * $fa).toFixed(2) + ")", $sw[0]),
    mtx("PLAY", $px, $pt + 2, "rgba(225,255,255," + $ta.toFixed(2) + ")", $sw[0]));
  (mtx("NOW", $nx + $sp, $pt + 8, "rgba(255,60,90," + (0.6 * $fa).toFixed(2) + ")", $sw[1]),
    mtx("NOW", $nx - $sp, $pt + 8, "rgba(60,255,220," + (0.6 * $fa).toFixed(2) + ")", $sw[1]),
    mtx("NOW", $nx, $pt + 8, "rgba(225,255,255," + $ta.toFixed(2) + ")", $sw[1]));
  const $pl = $l > 0.05 && !o ? 0.75 + 0.25 * Math.sin(8 * $T) : 0.55;
  for (let z = 0; z < 5; z++)
    for (let w = 0; w < 3; w++)
      "#" === MN2[z][w] &&
        n("rgba(255,160,230," + ($pl * $fa).toFixed(2) + ")", $x0 + 2 + w, $pt + 14 + z, 1, 1);
  for (let k = 0; k < 4; k++) {
    const $h = 1 + Math.round(($q.b[k] || 0) * 4);
    n(
      k % 2 ? "rgba(74,255,200," + $fa.toFixed(2) + ")" : "rgba(58,255,154," + $fa.toFixed(2) + ")",
      $x0 + $pw - 13 + 3 * k,
      $pt + $ph - 2 - $h,
      2,
      $h,
    );
  }
  if ($gb) {
    for (let k = 0; k < ($big ? 5 : 2); k++) {
      const $y = $pt + ((r(($T * 40) | 0, k + 3) * $ph) | 0),
        $w = 4 + ((r(($T * 40) | 0, k + 6) * ($pw - 4)) | 0);
      n(
        k % 2 ? "rgba(255,70,120,.55)" : "rgba(120,255,240,.6)",
        $x0 + ((r(($T * 40) | 0, k + 8) * ($pw - $w)) | 0),
        $y,
        $w,
        1,
      );
    }
    $big && n("rgba(160,255,255,.14)", $x0, $pt, $pw, $ph);
  }
  n("rgba(190,255,255,.45)", $x0, $pt + ((($T * 14) % $ph) | 0), $pw, 1);
  /* orbit ring with comet dot */
  for (let k = 0; k < 48; k++) {
    const $an = (k / 48) * 6.2832 + (o ? 0 : 0.9 * $T),
      $d = Math.sin($an),
      $ox = $xc + Math.round(Math.cos($an) * ($pw / 2 + 4)),
      $oy = $cy + Math.round($d * 3);
    if ($d < 0 && $ox > $x0 - 1 && $ox < $x0 + $pw) continue;
    n("rgba(140,248,255," + ((0.18 + 0.22 * ($d + 1)) * $fa).toFixed(2) + ")", $ox, $oy, 1, 1);
  }
  {
    const $an = o ? 0 : 2.2 * $T,
      $d = Math.sin($an);
    if (!(
      $d < 0 &&
      Math.abs(Math.cos($an)) < ($pw / 2 + 4) / ($pw / 2 + 4) &&
      Math.abs(Math.cos($an) * ($pw / 2 + 4)) < $pw / 2
    )) {
      n(
        "rgba(255,255,255," + $fa.toFixed(2) + ")",
        $xc + Math.round(Math.cos($an) * ($pw / 2 + 4)) - 1,
        $cy + Math.round($d * 3),
        2,
        2,
      );
    }
  }
  /* floating music notes */
  if ($l > 0.04 && !o)
    for (let k = 0; k < 3; k++) {
      const $ph2 = ($T * 0.35 + k / 3) % 1,
        $nx2 = $x0 + 2 + ((r(k, 5) * ($pw - 6)) | 0) + Math.round(2 * Math.sin(2 * $T + k * 2.1)),
        $ny = ($pt - 5 - $ph2 * 14) | 0,
        $a = Math.min(1, $l * 2) * (1 - $ph2) * Math.min(1, 6 * $ph2) * 0.8,
        $col = ["255,160,230", "110,230,255", "255,226,110"][k];
      for (let z = 0; z < 5; z++)
        for (let w = 0; w < 3; w++)
          "#" === MN2[z][w] &&
            n("rgba(" + $col + "," + $a.toFixed(2) + ")", $nx2 + w, $ny + z, 1, 1);
    }
}
function y(t) {
  const i = (o ? 0 : t / 16.7) / 60,
    h = s >> 1,
    u = f - ((0.32 * c) | 0);
  (n("#0c1a2b", 0, 0, s, c), n("#08111f", 0, 0, s, (0.12 * c) | 0), n("#10233a", 0, 0, 0, 0));
  for (let t = 0; t < s; t += 10) n("#10233a", t, 0, 1, f);
  for (let t = 0; t < f; t += 10) n("#10233a", 0, t, s, 1);
  const y = !(g > 0 && Math.sin(40 * g) > 0);
  (n(y ? "#dff6ff" : "#5b7690", (0.25 * s) | 0, 1, (0.5 * s) | 0, 2),
    [
      [1, "rgba(60,255,170,.05)"],
      [0.7, "rgba(60,255,170,.05)"],
      [0.45, "rgba(60,255,170,.06)"],
    ].forEach(([t, a]) => l(h, (f - 0.5 * u) | 0, (u * t) | 0, a)),
    y &&
      ((e.fillStyle = "rgba(200,240,255,.045)"),
      e.beginPath(),
      e.moveTo(0.27 * s, 3),
      e.lineTo(0.73 * s, 3),
      e.lineTo(0.92 * s, f),
      e.lineTo(0.08 * s, f),
      e.fill()));
  for (let t = 0; t < 2; t++) {
    const a = t ? (0.7 * s) | 0 : (0.05 * s) | 0,
      e = (0.25 * s) | 0,
      o = f - ((0.98 * u) | 0),
      l = Math.max(5, (0.15 * u) | 0);
    n("rgba(6,14,26,.7)", a, o, e, 3 * l + 3);
    for (let s = 0; s < 3; s++) {
      const c = o + l * (s + 1);
      (n("#2a3f5e", a, c, e, 1), n("#3d5680", a, c, e, 0.5));
      for (let o = 0; o < e / 5; o++) {
        if (r(o + 30 * t, s) < 0.4) continue;
        const e = a + 2 + 5 * o,
          i = 2 + ((r(o, s + t) * (l - 3)) | 0),
          f = ["#2f7bff", "#1fb8a6", "#8be86b", "#c860e0"][(4 * r(o, 3 * s + t)) | 0];
        (n("#7fcbe8", e, c - i, 3, i),
          n(f, e, c - i + 1, 3, i - 1),
          n("rgba(255,255,255,.5)", e, c - i + 1, 1, 1));
      }
    }
  }
  ([(0.2 * s) | 0, (0.73 * s) | 0].forEach((t, a) => {
    const e = Math.max(14, (0.08 * s) | 0),
      o = Math.max(9, (0.62 * e) | 0),
      l = (0.16 * c) | 0;
    (n("#04080e", t - 1, l - 1, e + 2, o + 2), n(a ? "#071c26" : "#0a2218", t, l, e, o));
    for (let s = 0; s < o - 2; s += 2) {
      const o = (r(s + ((3 * i) | 0), a) * (e - 4)) | 0;
      n(a ? "#3ad8ff" : "#5aff8a", t + 2, l + 1 + s, o, 1);
    }
    (n("rgba(255,255,255,.1)", t, l, e, 1), n("#2a3f5e", (t + e / 2 - 1) | 0, l + o + 1, 2, 3));
  }),
    m(d[0], i),
    m(d[1], i),
    m(d[2], i),
    (e.globalCompositeOperation = "lighter"),
    d.forEach((t) => {
      const a = 1.7 * t.w,
        o = f - 0.32 * (f - t.top),
        r = e.createRadialGradient(t.cx, o, 0, t.cx, o, a);
      (r.addColorStop(0, t.liq + "3a"),
        r.addColorStop(1, t.liq + "00"),
        (e.fillStyle = r),
        e.fillRect(t.cx - a, o - a, 2 * a, 2 * a));
    }),
    (e.globalCompositeOperation = "source-over"));
  const x = d[0].cx - (d[0].w >> 1) - 2,
    M = d[1].cx + (d[1].w >> 1) + 3 - x,
    w = f - Math.round(0.2 * u);
  (n("#4a5f82", x, w, M, 2),
    n("#8aa2c4", x, w, M, 1),
    n("#4a5f82", x, w, 2, f - w),
    n("#4a5f82", x + M - 2, w, 2, f - w),
    n("#16233a", 0, f, s, c - f),
    n("#4a5f82", 0, f, s, 3),
    n("#8aa2c4", 0, f, s, 1));
  {
    const t = Math.min(c - f - 3, f);
    (e.save(),
      e.translate(0, 2 * f + 3),
      e.scale(1, -1),
      (e.globalAlpha = 0.17),
      e.drawImage(a, 0, f - t, s, t, 0, f - t, s, t),
      e.restore());
    for (let t = f + 3; t < c; t += 2) n("rgba(22,35,58,.35)", 0, t, s, 1);
  }
  for (let t = 0; t < s; t += 34) (n("#0e1829", t, f + 4, 1, c), n("#6f87ab", t + 4, f + 10, 1, 6));
  (((t, a, e) => {
    const o = f - e,
      r = (0.4 * e) | 0;
    (n("#7fcbe8", t, o, 1, e),
      n("#7fcbe8", t + a - 1, o, 1, e),
      n("#7fcbe8", t, f - 1, a, 1),
      n("#2f7bff", t + 1, o + r, a - 2, e - 1 - r),
      n("#d6fff0", t + 1, o + r, a - 2, 1));
  })((0.08 * s) | 0, p(0.2 * u), Math.round(0.28 * u)),
    mon(t),
    o ||
      b.forEach((t) => {
        ((t[1] -= t[2]), t[1] < 0 && (t[1] = f));
      }),
    (e.fillStyle = "rgba(155,231,255,.5)"),
    b.forEach((t) => e.fillRect(0 | t[0], 0 | t[1], 1, 1)),
    !o && g <= 0 && Math.random() < 0.002 && (g = 1),
    g > 0 && (n("rgba(2,6,20," + 0.4 * g + ")", 0, 0, s, c), (g -= 0.03)));
}
const x = t("#ld"),
  M = t("#lt"),
  w = t("#bar"),
  v = t("#dna"),
  k = v.getContext("2d"),
  A = () => {
    const t = Math.max(
      2,
      Math.min(
        Math.floor((innerHeight * (innerWidth > innerHeight ? 0.62 : 0.44)) / 96),
        Math.floor((0.8 * innerWidth) / 64),
        7,
      ),
    );
    ((v.style.width = 64 * t + "px"), (v.style.height = 96 * t + "px"));
  };
