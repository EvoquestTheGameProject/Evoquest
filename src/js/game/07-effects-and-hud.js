let ce = [],
  fx = [],
  hitStop = 0,
  hurtFlash = 0,
  de = !0,
  be = 0,
  ue = 0,
  Te = 0,
  Se = 92;
function addFx(t) {
  fx.push(Object.assign({ t: 0, life: 20, a: 1 }, t));
}
function sparks(t, a, e, o, r, n, l) {
  for (let s = 0; s < e; s++) {
    const e = 6.283 * Math.random(),
      c = r * (0.4 + 0.8 * Math.random());
    addFx({
      k: "spark",
      x: t,
      y: a,
      vx: Math.cos(e) * c,
      vy: Math.sin(e) * c - 0.3 * r,
      g: n || 0.12,
      c: o[s % o.length],
      life: ((l || 16) + 10 * Math.random()) | 0,
    });
  }
}
function hitFx(t, a, e) {
  ($sx(e ? "hitbig" : "hit"),
    addFx({
      k: "flash",
      x: t,
      y: a,
      r: e ? 22 : 12,
      c: "255,240,190",
      a: e ? 0.9 : 0.6,
      life: e ? 10 : 6,
    }),
    addFx({
      k: "ring",
      x: t,
      y: a,
      r0: 2,
      r1: e ? 20 : 11,
      c: "#fff4c8",
      life: e ? 14 : 10,
      sq: 1,
    }),
    addFx({ k: "star", x: t, y: a, r: e ? 11 : 6, life: e ? 8 : 6, c: "#ffffff" }),
    sparks(t, a, e ? 14 : 7, ["#ffe070", "#ffffff", "#ffb030"], e ? 2.6 : 1.8, 0.1, 12),
    sparks(t, a, e ? 10 : 5, ["#8aff9a", "#c8ff70", "#4ad860"], e ? 1.8 : 1.3, 0.16, 24));
}
function smoke(t, a, e, o) {
  $sx("poof");
  for (let r = 0; r < e; r++)
    addFx({
      k: "smoke",
      x: t + 6 * (Math.random() - 0.5),
      y: a - 1,
      vx: (o || 2 * (Math.random() - 0.5)) * (0.2 + 0.5 * Math.random()),
      vy: -0.1 - 0.25 * Math.random(),
      r: 1.5 + 2 * Math.random(),
      c: "170,180,196",
      life: (22 + 16 * Math.random()) | 0,
    });
}
const Ne = {
    hall: ["255,220,170", 0, 1],
    ware: ["255,220,170", 0, 1],
    pod: ["120,255,190", 1, 1],
    lab: ["255,220,150", 0, 1],
    store: ["255,230,170", 0, 1],
    med: ["200,240,255", 0, 1],
    cafe: ["255,236,170", 1, 1],
    stair: ["190,255,210", 1, 1],
    exitlab: ["170,255,200", 1, 1],
    outside: ["255,246,206", 1, 0],
  },
  De = {
    hall: { c: "110,130,120", l: "255,220,170", a: 0.16, dk: 0.32 },
    ware: { c: "150,120,70", l: "255,224,160", a: 0.17, dk: 0.32 },
    pod: { c: "60,150,100", l: "160,255,190", a: 0.2, dk: 0.34 },
    lab: { c: "80,130,170", l: "200,230,255", a: 0.16, dk: 0.3 },
    store: { c: "190,160,80", l: "255,230,160", a: 0.15, dk: 0.3 },
    med: { c: "130,190,215", l: "230,250,255", a: 0.12, dk: 0.24 },
    cafe: { c: "170,140,80", l: "255,235,170", a: 0.15, dk: 0.3 },
    stair: { c: "60,140,125", l: "170,255,215", a: 0.2, dk: 0.34 },
    exitlab: { c: "70,180,100", l: "200,255,190", a: 0.22, dk: 0.32 },
    outside: { c: "120,160,160", l: "255,246,206", a: 0.1, dk: 0.2 },
  };
function updateHud() {
  const a = "stair" === room || "exitlab" === room || "hall" === room || "ware" === room;
  ((qs("#gl").innerHTML = a
    ? Array.from(
        { length: 5 },
        (t, a) => '<span style="color:' + (a < hp ? "#ff4a5a" : "#3a2a3a") + '">♥</span>',
      ).join("")
    : ""),
    (qs("#ga").innerHTML = hasGun
      ? '<img src="' + s("blaster", "#b06aff") + '"> x' + (Eo.ammo ? "∞" : ammo)
      : ""),
    (qs("#bS").style.display = hasGun ? "grid" : "none"),
    (qs("#gb").hidden = !(snakeBoss && "exitlab" === room && "dead" !== snakeBoss.st && !cine)),
    (qs("#gbf").style.width = Math.max(0, snakeBoss ? snakeBoss.hp : 0) + "%"));
}
function skipCine() {
  cine &&
    ((bossOpen = !0),
    (corrode = 1),
    (cine = null),
    (qs("#cskip").hidden = !0),
    (fadeNow = Math.max(fadeNow, 0.2)),
    (fadeTo = 1),
    (onFaded = () => {
      ((minis = []), (snakeBoss = null), enterRoom("exitlab", "L"), updateGuide());
    }));
}
function updateMinis() {
  const t = floorY(),
    a = snakeBoss;
  minis = minis.filter((e) => {
    if ((e.t++, e.hurt > 0 && e.hurt--, e.cd > 0 && e.cd--, e.t < 34)) return !0;
    if (e.roam)
      return (
        (e.x += 0.32 * e.face),
        (e.x < 70 || e.x > roomW() - 60 || r(e.t, 0 | e.x) < 0.012) && (e.face *= -1),
        (e.x = Math.max(64, Math.min(roomW() - 54, e.x))),
        !0
      );
    const o = player.x - e.x;
    return (
      e.kb || (e.face = o > 0 ? 1 : -1),
      e.kb
        ? ((e.x += e.kb), (e.kb *= 0.82), Math.abs(e.kb) < 0.15 && (e.kb = 0))
        : (e.x += e.face * (0.5 + (a && a.hp < 50 ? 0.18 : 0) + (Math.abs(o) < 26 ? 0.25 : 0))),
      (e.x = Math.max(6, Math.min(roomW() - 6, e.x))),
      Math.abs(o) < 7 &&
        player.y > t - 14 &&
        e.cd <= 0 &&
        !dead &&
        (hurtPlayer(1), (e.cd = 70), (e.kb = 2.6 * -e.face)),
      !(
        e.hp <= 0 &&
        (sparks(e.x, t - 3, 14, ["#8aff6a", "#d8ff9a", "#5a3a22"], 1.8, 0.14, 20),
        addFx({ k: "ring", x: e.x, y: t - 2, r0: 2, r1: 10, c: "#d8ff9a", life: 12 }),
        drops.push({ x: e.x, y: t - 4, vy: -1.8, t: 0 }),
        1)
      )
    );
  });
}
function hitMinis(t, a, e, o) {
  let r = !1;
  const n = floorY();
  return (
    minis.forEach((l) => {
      l.t < 34 ||
        l.hp <= 0 ||
        (Math.abs(t - l.x) < 8 &&
          a > n - 20 &&
          ((l.hp -= e), (l.hurt = 8), (l.kb = 3 * o), (r = !0), hitFx(l.x, n - 3, 0)));
    }),
    r
  );
}
