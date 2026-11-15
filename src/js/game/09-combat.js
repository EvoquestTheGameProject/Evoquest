function qe() {
  ($sx("roar"),
    fo(),
    (R = []),
    (L = []),
    p && (u = 4),
    (S = 54),
    (M = { x: 0.6 * G(), sp: 0, hp: 100, st: "intro", t: 0, face: -1, flash: 0, last: "", hit: 0 }),
    (E = []),
    (ce = []),
    (T = []),
    (x = []),
    O || Jt("<b>A GIANT MUTATED SNAKE!</b>", 2600),
    Be());
}
function Ye(a) {
  if (y > 0 || v || Eo.god) return;
  ((m -= a),
    (y = 70),
    (he = 14),
    (fe = 3),
    $sx("hurt"),
    Re({ k: "ring", x: F.x, y: F.y - 17.4, r0: 2, r1: 14, c: "#ff6a7a", life: 12 }),
    Ie(F.x, F.y - 17.4, 8, ["#ff4a5a", "#ffb0b8"], 1.8, 0.12, 14));
  const e = F.x < (M ? M.x : 96) ? -1 : 1;
  ((F.kb = 10), (F.kbv = 2.2 * e), (F.vy = -2.4), (F.on = !1), (Lt = 8));
  for (let t = 0; t < 8; t++)
    yt.push({
      x: F.x,
      y: F.y - 17.4,
      vx: 2 * (r(t, 1) - 0.5),
      vy: 2 * -r(t, 2),
      g: 0.1,
      life: 20,
      c: "#ff4a5a",
      s: 1.5,
    });
  (Be(),
    m <= 0 &&
      ((m = 0),
      (v = !0),
      $sx("die"),
      (Ue = "boss"),
      (t("#gd").querySelector("h3").textContent = "YOU DIED"),
      (t("#gd").querySelector("p").textContent =
        "The snake got you. Tips: jump over the ground shockwaves, dodge the venom (watch for the red circles), shoot from range, and punch it while it is stunned after a charge."),
      Be(),
      (t("#gd").hidden = !1)));
}
let Ue = "boss",
  Je = 0,
  Xe = 0,
  Qe = !0,
  Ze = 24,
  $e = [24, 40],
  _e = [24, 40];
function oo(t) {
  const a = M;
  if (a && "dead" !== a.st && "intro" !== a.st) {
    ("stun" === a.st && (t *= 1.5),
      Eo.one && (t = 9999),
      (a.hp -= t),
      (a.flash = 6),
      $sx("bosshit"));
    for (let t = 0; t < 5; t++)
      yt.push({
        x: a.x + 10 * a.face + 20 * (r(t, a.hp) - 0.5),
        y: B() - 40 - 30 * r(t, 2),
        vx: 2 * (r(t, 3) - 0.5),
        vy: 1.5 * -r(t, 4),
        g: 0.08,
        life: 22,
        c: t % 2 ? "#8aff9a" : "#c8ff70",
        s: 1.5,
      });
    if (a.hp <= 0) {
      ((a.hp = 0),
        (a.st = "dead"),
        (a.t = 0),
        $sx("bossdie"),
        (Lt = 30),
        (E = []),
        (T = []),
        R.forEach((t) => {
          Ie(t.x, B() - 3, 12, ["#8aff6a", "#d8ff9a"], 1.8, 0.14, 20);
        }),
        (R = []),
        (fe = 14));
      const t = ho(a).head;
      for (let a = 0; a < 3; a++)
        Re({
          k: "ring",
          x: t.x,
          y: t.y,
          r0: 3 + 4 * a,
          r1: 40 + 16 * a,
          c: a ? "#8aff9a" : "#ffffff",
          life: 24 + 8 * a,
        });
      (Re({ k: "flash", x: t.x, y: t.y, r: 60, c: "200,255,190", a: 1, life: 22 }),
        Ie(t.x, t.y, 40, ["#8aff9a", "#c8ff70", "#ffffff", "#4ad860"], 3, 0.12, 34));
    }
    Be();
  }
}
const ro = (t, a, e) => t + (a - t) * Math.max(0, Math.min(1, e)),
  no = (t) => [
    parseInt(t.slice(1, 3), 16),
    parseInt(t.slice(3, 5), 16),
    parseInt(t.slice(5, 7), 16),
  ],
  lo = (t) => t - Math.floor(t);
((t) => {
  const a = {};
  for (const e in t) a[e] = t[e].map(no);
})({
  HIDE: ["#100a0a", "#201616", "#342824", "#4c3e36", "#66564a", "#82725e"],
  SAD: ["#060404", "#100a0a", "#1c1212", "#2a1c1a", "#3a2a24", "#4e3a30"],
  MAR: ["#14040a", "#2a0810", "#461018", "#641a20", "#82282a", "#9e3a36"],
  EYE: ["#3a0000", "#760606", "#b41212", "#e2321e", "#ff6a48", "#ffd0b8"],
  OCH: ["#3a2e26", "#665846", "#94846c", "#bcab8c", "#d8caa8", "#f0e6c8"],
  BEL: ["#2a2220", "#4a403a", "#786c5e", "#a69882", "#cec0a4", "#ece2c8"],
  FLE: ["#18040e", "#360a1a", "#5c1226", "#882232", "#b23e40", "#da6a50"],
  BON: ["#1e1626", "#3c3040", "#665a5e", "#968a7e", "#c8bca2", "#f2e8ca"],
  MEM: ["#100814", "#200e22", "#361830", "#4e2438", "#6a3640", "#8a4e46"],
  GLW: ["#5a2400", "#a65400", "#e08c12", "#ffbe36", "#ffe07a", "#fff6cc"],
  VIN: ["#08160e", "#10281a", "#1a3e24", "#28582e", "#3a7234", "#56903e"],
  MOU: ["#1a0610", "#3a0e1c", "#64263a", "#94485a", "#c06c7c", "#e8a0aa"],
});
