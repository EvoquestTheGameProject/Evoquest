function lo() {
  if (no) return no;
  const t = () => {
      const t = document.createElement("canvas");
      return ((t.width = oo), (t.height = ro), t);
    },
    a = [];
  for (let t = 0; t < 15; t++) {
    const e = r(t, 301) * Math.PI;
    a.push([
      Math.cos(e),
      Math.sin(e),
      r(t, 302) * oo,
      r(t, 303) * ro,
      (r(t, 304) < 0.5 ? -1 : 1) * (0.35 + 0.8 * r(t, 305)),
    ]);
  }
  const e = t(),
    o = e.getContext("2d"),
    n = o.createImageData(oo, ro),
    l = n.data;
  for (let t = 0; t < ro; t++)
    for (let e = 0; e < oo; e++) {
      let o = 0,
        r = 0,
        n = 0;
      for (const [l, s, c, i, f] of a) {
        const a = (e - c) * -s + (t - i) * l,
          h = a > 0 ? 1 : -1;
        ((o += f * h * -s), (r += f * h * l), Math.abs(a) < 0.7 && (n = Math.max(n, Math.abs(f))));
      }
      const s = Math.round(0.55 * (0.6 * -o - 0.8 * r) * 2.6 + 0.9 * (Et(e, t) - 0.5)),
        c = 4 * (t * oo + e);
      n > 0.6
        ? ((l[c] = 50), (l[c + 1] = 34), (l[c + 2] = 18), (l[c + 3] = 42))
        : s > 0
          ? ((l[c] = 255), (l[c + 1] = 252), (l[c + 2] = 236), (l[c + 3] = 24 * Math.min(3, s)))
          : s < 0 &&
            ((l[c] = 62), (l[c + 1] = 42), (l[c + 2] = 22), (l[c + 3] = 26 * Math.min(4, -s)));
    }
  o.putImageData(n, 0, 0);
  const s = (a, e) => {
    const o = t(),
      n = o.getContext("2d"),
      l = n.createImageData(oo, ro),
      s = l.data,
      c = St(e),
      i = [
        [0.25, 0.72, 0.16],
        [0.78, 0.3, 0.12],
        [0.6, 0.82, 0.09],
      ].map(([t, e, o]) => [t * oo + 30 * (r(a, 1) - 0.5), e * ro + 30 * (r(a, 2) - 0.5), o * oo]);
    for (let t = 0; t < ro; t++)
      for (let e = 0; e < oo; e++) {
        const o = It(e / 16, t / 16, a),
          n = Math.min(e, t, oo - e, ro - t) / 34,
          l = 4 * (t * oo + e);
        let f = Ct(c, [184, 146, 90], Rt(0.55 * (1 - Math.min(1, n)) + 0.5 * (o - 0.5)));
        const h = It(e / 34, t / 30, a + 3);
        h > 0.6 && (f = Ct(f, [150, 148, 132], h > 0.63 ? 0.32 : 0.5));
        for (const [o, r, n] of i) {
          const l = Math.hypot(e - o, 1.2 * (t - r)) / n + 0.25 * (Pt(e / 9, t / 9, a + 5) - 0.5);
          l < 1 && (f = Ct(f, [160, 120, 70], l > 0.9 ? 0.45 : 0.1));
        }
        It(e / 5, t / 5, a + 8) > 0.74 && n < 0.6 && (f = Ct(f, [70, 110, 60], 0.55));
        const d = 14 * (r(e, t + a) - 0.5);
        ((s[l] = f[0] + d), (s[l + 1] = f[1] + d), (s[l + 2] = f[2] + d), (s[l + 3] = 255));
      }
    return (n.putImageData(l, 0, 0), o);
  };
  return (no = { s: e, f: s(31, "#ece2c4"), b: s(47, "#e4d8b8") });
}
const so = (t) => {
  (ft.beginPath(),
    t.forEach((t, a) => (a ? ft.lineTo(t[0], t[1]) : ft.moveTo(t[0], t[1]))),
    ft.closePath());
};
let co = 0;
const io = (t, a, e, o, r, n) => {
  ((ft.font = o + 'px "Press Start 2P"'), (ft.textBaseline = "top"));
  const l = void 0 === r ? -ft.measureText(t).width / 2 : r;
  (n && ((ft.fillStyle = n), ft.fillText(t, l + 0.35, a + 0.45), ft.fillText(t, l - 0.2, a + 0.2)),
    (ft.fillStyle = e),
    ft.fillText(t, l, a));
};
function fo(t, a, e, o, r, n) {
  (ft.save(),
    ft.translate(t + 18, a + 14),
    ft.rotate(e),
    pt("rgba(40,30,20,.35)", -17, -12, 36, 30),
    pt("#f4efe2", -18, -13, 36, 30),
    pt("#d8d0bc", -18, 16, 36, 1),
    o(-16, -11, n),
    io(r, 12.2, "#3a2e22", 2.1, -16),
    pt("rgba(240,220,140,.55)", -6, -15, 12, 4),
    pt("rgba(255,255,255,.25)", -6, -15, 12, 1),
    ft.restore());
}
function ho(t, a, e) {
  (pt("#1a221c", t, a, 32, 22),
    pt("#2e3a2c", t, a + 15, 32, 7),
    pt("rgba(150,190,170,.18)", t, a, 32, 8),
    [
      [4, 12, 16, 6],
      [18, 9, 7, 6],
      [22, 7, 4, 4],
      [3, 10, 3, 3],
      [5, 18, 2, 4],
      [9, 18, 2, 4],
      [15, 18, 2, 4],
      [19, 17, 2, 5],
    ].forEach((e) => pt("#080a08", t + e[0], a + e[1], e[2], e[3])),
    pt("#080a08", t + 23, a + 5, 1.5, 2),
    pt("#080a08", t + 25, a + 11, 4, 2),
    pt("#ff3a2a", t + 24, a + 9, 1, 1),
    co || Gt(t + 24.5, a + 9.5, 4, "255,60,40", 0.5 + 0.3 * Math.sin(e / 200)),
    [
      [30, 13],
      [29, 15],
    ].forEach(([e, o]) => pt("#080a08", t + e - 2, a + o, 3, 1)));
  for (let e = 0; e < 3; e++) pt("#080a08", t + 2 + 4 * e, a + 14 - e, 3, 3);
  pt("rgba(255,255,255,.07)", t, a, 32, 22);
}
function bo(t, a, e) {
  (pt("#262e38", t, a, 32, 22),
    pt("rgba(170,190,210,.18)", t, a, 32, 8),
    pt("#d8d0b0", t + 25, a + 3, 5, 5));
  const o = co ? 0 : 2 * Math.sin(e / 160);
  ([
    [10, 10, 12, 4],
    [6, 6 - o, 8, 4],
    [2, 3 - o, 6, 3],
    [20, 6 - o, 6, 4],
    [26, 3 - o, 5, 3],
  ].forEach((e) => pt("#0a0c10", t + e[0], a + e[1], e[2], e[3])),
    pt("#0a0c10", t + 20, a + 9, 4, 3),
    pt("#e8b020", t + 23.5, a + 10, 2, 1),
    pt("#ff3a2a", t + 21.5, a + 9.5, 1, 1),
    pt("#0a0c10", t + 12, a + 14, 1, 4),
    pt("#0a0c10", t + 16, a + 14, 1, 4),
    pt("rgba(255,255,255,.07)", t, a, 32, 22));
}
function go(t, a) {
  t.forEach((t, e) => {
    const o = 6 + 14 * r(e, t);
    (pt("rgba(255,250,232,.22)", t, a, 1.3, o),
      pt("rgba(90,60,30,.14)", t - 0.4, a + 1, 0.4, o - 1),
      pt("rgba(90,60,30,.14)", t + 1.3, a + 1, 0.4, o - 2));
  });
}
function po(t) {
  (io("EMERGENCY BULLETIN", -45, "#3e3024", 4, void 0, "rgba(62,48,36,.25)"),
    pt("#4a3a2a", -53, -39.5, 106, 0.6),
    pt("#4a3a2a", -53, -38.4, 106, 0.3),
    io("ISSUE 211 . CITY RELIEF NETWORK", -37.3, "#5a4a3a", 1.9),
    ["ANIMALS AND", "WILDLIFE TURNED", "ON US"].forEach((t, a) =>
      io(t, 7.2 * a - 33.5, "#8e1410", 6, void 0, "rgba(150,30,20,.3)"),
    ),
    io("HELP US!", -11.8, "#b81810", 9, void 0, "rgba(180,30,20,.35)"));
  for (let t = 0; t < 8; t++) {
    const a = 9.4 * t - 35 + 3 * r(t, 3),
      e = 2 + 6 * r(t, 4);
    (pt("rgba(160,20,14,.85)", a, -3, 1, e), pt("rgba(160,20,14,.85)", a - 0.25, -3 + e, 1.5, 1));
  }
  (fo(-54, 2, -0.06, ho, "FIG.1 WOLF PACK", t),
    fo(-16, 3, 0.05, bo, "FIG.2 RAPTOR", t),
    [
      "FIELD NOTES:",
      "DAY 1  DEER",
      "DAY 4  BEARS",
      "DAY 9  BIRDS",
      "DAY 12 ALL",
      "OF THEM.",
    ].forEach((t, a) => io(t, 2 + 4 * a, a ? "#3a2e22" : "#7a1a12", 2.4, 23)),
    pt("rgba(120,20,14,.7)", 22, 24.5, 30, 0.5));
  for (let t = 0; t < 4; t++) pt("rgba(60,46,34,.5)", -53, 35 + 3.3 * t, 40 + 58 * r(t, 9), 1.1);
  (go([-40, -6, 30], -36),
    ft.save(),
    ft.translate(36, 40),
    ft.rotate(-0.2),
    (ft.strokeStyle = "rgba(180,30,20,.7)"),
    (ft.lineWidth = 0.8),
    ft.strokeRect(-17, -5, 34, 9),
    ft.strokeRect(-16, -4, 32, 7),
    io("DOCUMENTED", -2.8, "rgba(180,30,20,.75)", 3.2),
    ft.restore());
}
function uo(t) {
  (io("FINAL NOTICE", -44, "#2a2018", 6, void 0, "rgba(42,32,24,.3)"),
    pt("#2a2018", -53, -36, 106, 0.6),
    ut(-40, -22, 6, "#3a7ab8"),
    pt("#4aa850", -43, -25, 4, 3),
    pt("#4aa850", -38, -20, 3, 2),
    (ft.strokeStyle = "rgba(60,40,30,.7)"),
    ft.setLineDash([1.5, 1.5]),
    (ft.lineWidth = 0.5),
    ft.beginPath(),
    ft.moveTo(-33, -24),
    ft.quadraticCurveTo(0, -38, 28, -24),
    ft.stroke(),
    ft.setLineDash([]),
    (function () {
      for (let t = -9; t <= 9; t++) {
        const a = Math.sqrt(81 - t * t);
        (pt("#a8401e", 38 - a, -22 + t, 2 * a, 1),
          pt("#d8642c", 38 - a, -22 + t, 1.1 * a, 1),
          pt("#f09048", 38 - 0.8 * a, -22 + t, 0.45 * a, 1));
      }
      (pt("#7a2a14", 35.3, -23.8, 4.5, 2.25),
        pt("#7a2a14", 38.9, -18.85, 3.6, 1.8),
        pt("#fff0e0", 36.2, -30.5, 3.6, 1));
    })());
  const a = co ? 30 : (t / 30) % 60;
  (pt("#e8e0d0", -30 + a, -29 - 8 * Math.sin((a / 60) * Math.PI), 3, 1.5),
    ["THE PEOPLE HAVE", "LEFT EARTH."].forEach((t, a) =>
      io(t, 7 * a - 8, "#2a2018", 5, void 0, "rgba(42,32,24,.25)"),
    ),
    ["EVERYONE WENT TO", "MARS TO SURVIVE."].forEach((t, a) =>
      io(t, 9 + 7 * a, "#8e1410", 5, void 0, "rgba(150,30,20,.3)"),
    ),
    io("DO NOT WAIT FOR RESCUE. NO MORE SHIPS.", 28, "#3a2e22", 2.2),
    go([-20, 14, 40], -6),
    ft.save(),
    ft.translate(28, 40),
    ft.rotate(0.18),
    (ft.strokeStyle = "rgba(180,30,20,.7)"),
    (ft.lineWidth = 0.8),
    ft.strokeRect(-18, -5, 36, 9),
    ft.strokeRect(-17, -4, 34, 7),
    io("EVACUATED", -2.8, "rgba(180,30,20,.75)", 3.4),
    ft.restore());
}
function mo(t, a, e, o, n) {
  const l = lo(),
    s = [];
  for (let e = 0; e < 12; e++) {
    const n = (e / 12) * 6.283 + 0.26,
      l = Math.cos(n),
      c = Math.sin(n),
      i = 0.78 + 0.3 * r(o, e);
    s.push([
      ((Math.sign(l) * Math.pow(Math.abs(l), 0.4) * t) / 2) * i,
      ((Math.sign(c) * Math.pow(Math.abs(c), 0.4) * a) / 2) * i,
    ]);
  }
  const c = n ? Math.sin(e / 55) : 0;
  (n &&
    ((s[11] = [s[11][0] + 1.5 * c, s[11][1] - 1.5 - 2 * c]),
    (s[0] = [s[0][0] + 1 + c, s[0][1] - c])),
    ft.save(),
    ft.translate(1, 1.5),
    so(s),
    (ft.fillStyle = "rgba(0,0,0,.4)"),
    ft.fill(),
    ft.restore(),
    ft.save(),
    so(s),
    ft.clip(),
    (ft.imageSmoothingEnabled = !1),
    ft.drawImage(l.f, 0, 0, oo, 117.6, -t / 2, -a / 2, t, a),
    pt("rgba(142,20,16,.8)", 0.36 * -t, 0.36 * -a, 0.72 * t, 1.3),
    pt("rgba(142,20,16,.8)", 0.28 * -t, 0.36 * -a + 2.2, 0.56 * t, 1),
    pt("rgba(184,24,16,.85)", 0.3 * -t, 0.1 * -a, 0.6 * t, 1.6));
  for (let e = 0; e < 3; e++)
    pt("rgba(60,46,34,.55)", 0.36 * -t, 0.12 * a + 1.8 * e, t * (0.4 + 0.3 * r(e, o)), 0.6);
  if (
    (ft.drawImage(l.s, (37 * o) % 120, (23 * o) % 90, 69.6, 58.8, -t / 2, -a / 2, t, a),
    (ft.globalAlpha = 0.6),
    ft.drawImage(l.s, (37 * o) % 120, (23 * o) % 90, 69.6, 58.8, -t / 2, -a / 2, t, a),
    (ft.globalAlpha = 1),
    pt("rgba(40,24,10,.28)", -t / 2, -a / 2, 0.16 * t, a),
    pt("rgba(40,24,10,.22)", t / 2 - 0.14 * t, -a / 2, 0.14 * t, a),
    pt("rgba(255,255,240,.25)", -t / 2 + 0.18 * t, -a / 2, 0.08 * t, a),
    ft.restore(),
    n)
  ) {
    const t = s[11],
      a = s[0];
    (ft.beginPath(),
      ft.moveTo(t[0], t[1]),
      ft.lineTo(a[0], a[1]),
      ft.lineTo(a[0] - 2.5 - c, a[1] + 3.5),
      ft.closePath(),
      (ft.fillStyle = "#d2c6a2"),
      ft.fill(),
      (ft.strokeStyle = "rgba(90,70,40,.6)"),
      (ft.lineWidth = 0.3),
      ft.stroke());
  }
  (so(s), (ft.strokeStyle = "rgba(110,84,50,.6)"), (ft.lineWidth = 0.3), ft.stroke());
}
const yo = { side: 0, flip: 0, z: 1, zx: 96, zy: 54, tz: 1, tx: 96, ty: 54 },
  xo = (t) => (t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t)),
  Mo = {
    street: ["#7a2aa8", "#ff8a5a", 0.2],
    poster: ["#ffb070", "#3a1a48", 0.16],
    call: ["#2a60ff", "#3affd0", 0.14],
    pod: ["#2affc0", "#10305a", 0.16],
    lab: ["#ff4030", "#2a1030", 0.16],
    out: ["#6aff90", "#101a38", 0.18],
    rock: ["#ff9a50", "#4a2070", 0.18],
    left: ["#4a90ff", "#000018", 0.14],
    wake: ["#fff0a0", "#1a6a3a", 0.16],
  },
  wo = (t, a, e, o, n, l) => {
    for (let s = 0; s < t; s++) {
      const t = (r(s, 77) * dt + 0.004 * l * (s % 2 ? 1 : -1) + dt) % dt,
        c = o + r(s, 78) * (n - o) + 2 * Math.sin(l / 1500 + s);
      Gt(t, c, 5 + (s % 4) * 2, a, e * (0.6 + 0.4 * Math.sin(l / 900 + 2 * s)));
    }
  },
  vo = (t, a, e, o, r) => {
    (Gt(t, a, 0.35 * r, e, o),
      ft.save(),
      (ft.globalCompositeOperation = "lighter"),
      (ft.globalAlpha = 0.5 * o),
      (ft.fillStyle = "rgba(" + e + ",.5)"),
      ft.fillRect(t - r, a - 0.25, 2 * r, 0.5),
      (ft.globalAlpha = 0.22 * o),
      ft.fillRect(t - 0.6 * r, a - 1, 1.2 * r, 2),
      ft.restore());
  },
  ko = (t, a, e) => {
    let o = 0,
      n = t;
    (ft.save(), (ft.globalCompositeOperation = "lighter"));
    for (let t = 0; t < 9; t++) {
      const a = n + 9 * (r(e, t) - 0.5),
        l = o + 5 + 4 * r(e, t + 20);
      ((ft.strokeStyle = "rgba(220,235,255,.9)"),
        (ft.lineWidth = 0.8),
        ft.beginPath(),
        ft.moveTo(n, o),
        ft.lineTo(a, l),
        ft.stroke(),
        4 === t &&
          ((ft.lineWidth = 0.4),
          ft.beginPath(),
          ft.moveTo(a, l),
          ft.lineTo(a + 8, l + 6),
          ft.stroke()),
        (n = a),
        (o = l));
    }
    ft.restore();
  },
  Ao = (t, a, e) => {
    (pt("#120c18", t, a, 1, 1),
      pt("#120c18", t - 1 - e, a - 1 + e, 1, 1),
      pt("#120c18", t + 1 + e, a - 1 + e, 1, 1));
  };
