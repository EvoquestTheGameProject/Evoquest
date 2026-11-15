((GM.step = (t) => {
  for (let a = 0; a < t; a++) re();
}),
  (GM.render = ko),
  (GM.spawnBoss = () => {
    (qe(), (M.st = "walk"), (M.t = 0));
  }),
  (GM.cheat = () => {
    ((P = !0), Qo());
  }),
  (GM.sealTest = () => {
    ((P = !1), (H = 0), Qo());
  }),
  (GM.give = (t) => {
    (t.forEach((t) => {
      (X.includes(t) || X.push(t), J.add(t));
    }),
      la(),
      na());
  }),
  (GM.bench = () => ({
    beaker: [...ga],
    small: pa,
    worn: V,
    gloved: d,
    stirred: b,
    tested: g,
    canFill: I,
    tray: Object.assign({}, ua),
    msg: ma,
  })),
  (GM.craft = () => Ha()),
  (GM.dbg = () => ({
    bossOpen: P,
    cine: O ? O.ph : null,
    canFill: I,
    drops: L.length,
    doorCut: ut,
    minis: R.length,
    camX: C,
    exitOpen: q,
    bv: x.map((t) => t.vx),
    face: F.face,
    hasGun: p,
    ammo: u,
    hp: m,
    boss: M && { hp: M.hp, st: M.st, x: M.x },
    dead: v,
    room: W,
    x: F.x,
    y: F.y,
    stage: z,
    got: [...J],
    inv: [...X],
    hasPotion: Y,
    exitOpen: q,
    erode: kt,
    pour: vt,
    modal: Pt,
    win: At,
  })),
  (GM.boss = (t) => {
    M && Object.assign(M, t);
  }),
  (GM.hurt = (t) => Ye(t)),
  (GM.set = (t) => {
    (t.room && ((W = t.room), Wt[W] || Ut(W)),
      void 0 !== t.x && (F.x = t.x),
      void 0 !== t.y && (F.y = t.y));
  }));
const Eo = {
  on: !1,
  god: 0,
  ammo: 0,
  speed: 0,
  jump: 0,
  fly: 0,
  one: 0,
  nopop: 0,
  ts: 1,
  dbg: 0,
  box: 0,
  tmr: 1,
  sItems: 0,
  sOpen: 0,
  sRoom: "",
};
let Io = "",
  Oo = 0,
  Lo = null,
  Ho = "";
const No = t("#dvc"),
  Do = t("#dvp"),
  Go = t("#gdv"),
  Bo = t("#dnab"),
  Fo = t("#dvh"),
  Wo = (t) => {
    const a = t / 60,
      e = Math.floor(a / 60);
    return (e < 10 ? "0" : "") + e + ":" + (a % 60 < 10 ? "0" : "") + (a % 60).toFixed(2);
  };
function zo() {
  t("#dvd").textContent = "●".repeat(Io.length) + "○".repeat(6 - Io.length);
}
function qo() {
  "712411" === Io
    ? ((Eo.on = !0), (No.hidden = !0), er())
    : ((t("#dvm").textContent = "INVALID CODE"),
      (Io = ""),
      zo(),
      No.classList.add("bad"),
      setTimeout(() => No.classList.remove("bad"), 400));
}
function Yo(t) {
  if ("C" === t) Io = Io.slice(0, -1);
  else {
    if ("OK" === t) return void qo();
    Io.length < 6 && (Io += t);
  }
  (zo(), 6 === Io.length && setTimeout(qo, 140));
}
const Uo = [
    ["god", "INVULNERABLE"],
    ["ammo", "INFINITE AMMO"],
    ["speed", "PLAYER SPEED x2"],
    ["jump", "HIGH JUMP"],
    ["fly", "AIR JUMP"],
    ["one", "BOSS ONE-HIT"],
    ["nopop", "SKIP ITEM READ-LOCK"],
  ],
  Vo = [
    ["dbg", "INFO HUD"],
    ["box", "HITBOXES"],
    ["tmr", "RUN TIMER"],
  ],
  jo = [
    [0.5, "0.5x"],
    [1, "1x"],
    [2, "2x"],
    [4, "4x"],
  ],
  Jo = [
    ["pod", "POD"],
    ["lab", "LAB"],
    ["store", "STORAGE"],
    ["med", "MED BAY"],
    ["cafe", "CAFE"],
    ["stair", "STAIRWELL"],
    ["hall", "BASEMENT"],
    ["ware", "STAFF STORAGE"],
    ["exitlab", "BOSS ROOM"],
    ["outside", "OUTSIDE"],
  ];
function Xo() {
  for (const t in f) "potion" === t || _t.includes(t) || (X.includes(t) || X.push(t), J.add(t));
  for (const t in h) (h[t].items || []).forEach((t) => (Q[t.id] = 1));
  ((p = !0),
    (u = 4),
    X.includes("blaster") || X.push("blaster"),
    (Y = !0),
    X.includes("potion") || X.push("potion"),
    0 === z && (z = 1),
    (Tt = !0),
    la(),
    na(),
    Be());
}
function Qo() {
  ((p = !0), (u = 4), J.add("blaster"), X.includes("blaster") || X.push("blaster"), la(), Be());
}
function Ko() {
  ((q = !0),
    (z = 2),
    (kt = 260),
    (vt = 0),
    (j = !0),
    (Y = !1),
    (X = X.filter((t) => "potion" !== t)),
    la(),
    na());
}
function Zo(a) {
  ((Pt = 0),
    (Oo = 0),
    (t("#gk").hidden = !0),
    (t("#gx").hidden = !0),
    (F.vx = F.vy = 0),
    ("stair" !== a && "exitlab" !== a) || Ko(),
    ("hall" !== a && "ware" !== a) || Ko(),
    "exitlab" === a && ((P = !0), p || Qo()),
    "outside" === a && (Ko(), p || Qo(), (w = !0), (ut = 0)),
    oe(a, "L"),
    "stair" === a && (F.x = 24),
    na(),
    Be());
}
function $o() {
  (document.body.classList.add("ingame"),
    (Go.hidden = !Eo.on),
    Eo.on && (Eo.sItems && Xo(), Eo.sOpen && Ko(), Eo.sRoom && Zo(Eo.sRoom), Be()));
}
function _o() {
  const a = GM.on,
    e = (t, a, e) => '<button class="dvb' + (t ? " on" : "") + '" ' + a + ">" + e + "</button>",
    o = a
      ? [
          ["items", "ALL ITEMS"],
          ["gun", "VENOM BLASTER"],
          ["solvent", "SOLVENT"],
          ["open", "OPEN BARRICADE"],
          ["heal", "RESTORE HP/AMMO"],
          ["respawn", "RESPAWN IN ROOM"],
          ["killboss", "KILL BOSS"],
          ["resetboss", "RESET BOSS"],
          ["win", "FINISH CHAPTER"],
          ["restart", "RESTART RUN"],
        ]
      : [
          ["items", "START WITH ALL ITEMS"],
          ["open", "START WITH EXIT OPEN"],
        ];
  let r =
    "<h3>&#129516; DEVELOPER TOOLS</h3><p>Staff only. For testing and speedrun checks." +
    (a ? " Changes apply live." : " Set up your run, then press Play.") +
    "</p>";
  ((r +=
    '<h4>TEST TOOLS</h4><div class="dvg">' +
    Uo.map(([t, a]) => e(Eo[t], 'data-t="' + t + '"', a + ": " + (Eo[t] ? "ON" : "OFF"))).join("") +
    "</div>"),
    (r +=
      '<h4>GAME SPEED</h4><div class="dvg4">' +
      jo.map(([t, a]) => e(Eo.ts === t, 'data-s="' + t + '"', a)).join("") +
      "</div>"),
    (r +=
      '<h4>DEBUG VIEW</h4><div class="dvg">' +
      Vo.map(([t, a]) => e(Eo[t], 'data-t="' + t + '"', a + ": " + (Eo[t] ? "ON" : "OFF"))).join(
        "",
      ) +
      "</div>"),
    (r +=
      "<h4>" +
      (a ? "TELEPORT" : "START AT ROOM") +
      '</h4><div class="dvg">' +
      Jo.map(([t, o]) => e((!a && Eo.sRoom === t) || (a && W === t), 'data-r="' + t + '"', o)).join(
        "",
      ) +
      "</div>"),
    (r +=
      "<h4>" +
      (a ? "STATE" : "RUN SETUP") +
      '</h4><div class="dvg">' +
      o
        .map(([t, o]) =>
          e(
            !a && (("items" === t && Eo.sItems) || ("open" === t && Eo.sOpen)),
            'data-a="' + t + '"',
            o,
          ),
        )
        .join("") +
      "</div>"),
    a &&
      ((r +=
        '<h4>CHECKPOINT</h4><div class="dvg">' +
        e(0, 'data-a="cpsave"', "SAVE HERE") +
        e(0, 'data-a="cpload"', "LOAD" + (Lo ? "" : " (NONE)")) +
        "</div>"),
      (r +=
        '<h4>SPLITS</h4><div class="dvsp">' +
        ($.length
          ? $.map((t) => (h[t[0]].name || t[0]) + "  " + Wo(t[1])).join("<br>")
          : "No splits yet.") +
        "<br><b>RUN " +
        Wo(Z) +
        "</b></div>")),
    (t("#dvb").innerHTML = r + '<button class="dvb big" id="dvx">CLOSE</button>'));
}
let tr = 60,
  ar = 0;
function er() {
  (GM.on && ((Oo = Pt), (Pt = 1)), _o(), (Do.hidden = !1));
}
function or() {
  ((Do.hidden = !0), GM.on && (Pt = Oo ? 1 : 0), (Oo = 0));
}
((Bo.onclick = () => (
  (Io = ""),
  zo(),
  (t("#dvm").textContent = "STAFF ACCESS CODE"),
  void (No.hidden = !1)
)),
  (Go.onclick = () => er()),
  (t("#dvk").onclick = (t) => {
    const a = t.target.closest("[data-k]");
    a && Yo(a.dataset.k);
  }),
  (t("#dvq").onclick = () => {
    No.hidden = !0;
  }),
  (Do.onclick = (a) => {
    const e = a.target;
    if ("dvx" === e.id || e === Do) return void or();
    const o = e.closest("button");
    o &&
      (o.dataset.t
        ? ((Eo[o.dataset.t] ^= 1), _o())
        : o.dataset.s
          ? ((Eo.ts = +o.dataset.s), _o())
          : o.dataset.r
            ? GM.on
              ? (Zo(o.dataset.r), or())
              : ((Eo.sRoom = Eo.sRoom === o.dataset.r ? "" : o.dataset.r), _o())
            : o.dataset.a &&
              (function (a) {
                if (!GM.on)
                  return (
                    "items" === a ? (Eo.sItems ^= 1) : "open" === a && (Eo.sOpen ^= 1),
                    void _o()
                  );
                if ("items" === a) (Xo(), Jt("All items added.", 1600));
                else if ("gun" === a) (Qo(), Jt("Venom Blaster added.", 1600));
                else if ("solvent" === a)
                  ((Y = !0),
                    X.includes("potion") || X.push("potion"),
                    0 === z && (z = 1),
                    la(),
                    na(),
                    Jt("Solvent added.", 1600));
                else if ("open" === a) (Ko(), Jt("Barricade removed.", 1600));
                else if ("heal" === a)
                  ((m = 5), (u = 4), (y = 0), Be(), Jt("HP + ammo restored.", 1600));
                else {
                  if ("respawn" === a)
                    return (oe(W, "L"), (Pt = 0), (Oo = 0), void (Do.hidden = !0));
                  if ("killboss" === a)
                    M && "dead" !== M.st
                      ? ("intro" === M.st && (M.st = "walk"), oo(9999))
                      : Jt("No boss in this room.", 2e3);
                  else if ("resetboss" === a)
                    ((w = !1),
                      (At = 0),
                      (t("#gw").hidden = !0),
                      "exitlab" === W ? qe() : Jt("Boss resets on entering the boss room.", 2200));
                  else if ("win" === a) ((w = !0), (At = 1), (t("#gw").hidden = !1));
                  else {
                    if ("restart" === a) return (or(), Bt(), void $o());
                    if ("cpsave" === a)
                      ((Lo = {
                        room: W,
                        P: Object.assign({}, F),
                        inv: [...X],
                        got: [...J],
                        taken: Object.assign({}, Q),
                        broken: Object.assign({}, K),
                        stage: z,
                        exitOpen: q,
                        hasPotion: Y,
                        hasGun: p,
                        ammo: u,
                        hp: m,
                        bossDone: w,
                        worn: V,
                        gloved: d,
                        potionUsed: j,
                        erode: kt,
                        runT: Z,
                      }),
                        Jt("Checkpoint saved.", 1400));
                    else if ("cpload" === a)
                      return (
                        Lo
                          ? ((W = Lo.room),
                            Wt[W] || Ut(W),
                            Object.assign(F, Lo.P),
                            (F.vx = F.vy = 0),
                            (X = [...Lo.inv]),
                            (J = new Set(Lo.got)),
                            (Q = Object.assign({}, Lo.taken)),
                            (K = Object.assign({}, Lo.broken)),
                            (z = Lo.stage),
                            (q = Lo.exitOpen),
                            (Y = Lo.hasPotion),
                            (p = Lo.hasGun),
                            (u = Lo.ammo),
                            (m = Lo.hp),
                            (w = Lo.bossDone),
                            (V = Lo.worn),
                            (d = Lo.gloved),
                            (j = Lo.potionUsed),
                            (kt = Lo.erode),
                            (Z = Lo.runT),
                            (x = []),
                            (E = []),
                            (T = []),
                            (M = null),
                            (v = !1),
                            (At = 0),
                            (t("#gd").hidden = !0),
                            (t("#gw").hidden = !0),
                            "exitlab" !== W || w || qe(),
                            la(),
                            na(),
                            Be(),
                            Jt("Checkpoint loaded.", 1400))
                          : Jt("No checkpoint saved yet.", 1600),
                        void or()
                      );
                  }
                }
                _o();
              })(o.dataset.a));
  }),
  addEventListener("keydown", (t) => {
    No.hidden ||
      (/^[0-9]$/.test(t.key)
        ? Yo(t.key)
        : "Backspace" === t.key
          ? Yo("C")
          : "Escape" === t.key && (No.hidden = !0));
  }),
  (window.startGame = function (a, o) {
    ($sx("stop"), ($t = a || $t), o && (qt = o), (GM.on = !0), (e.hidden = !1), (ot.hidden = !0));
    const r = (ra = matchMedia("(pointer:coarse)").matches || "ontouchstart" in window);
    (t("#gp").classList.toggle("on", r || "#touch" === location.hash),
      document.activeElement && document.activeElement.blur && document.activeElement.blur());
    for (const t in _a) _a[t].rel();
    ((_.l = _.r = _.s = 0),
      (tt = at = et = 0),
      Bt(),
      (function () {
        let t = null;
        try {
          t = JSON.parse(localStorage.getItem(Nt()) || "null");
        } catch (t) {}
        !t ||
          !(t.v >= 1) ||
          ((X = t.inv || []),
          (J = new Set(t.got || [])),
          (Q = t.taken || {}),
          (K = t.broken || {}),
          (V = !!t.worn),
          (d = !!t.gloved),
          (U = !!t.hasGoggles),
          (z = 2),
          (q = !0),
          (kt = 260),
          (vt = 0),
          (Y = !1),
          (j = !0),
          (Tt = !0),
          la(),
          na(),
          Jt(
            "<b>CHECKPOINT</b><br>The barricade is already dissolved. Head for the fire exit.",
            3400,
          ));
      })(),
      fo(),
      Wt.pod || Ut("pod"),
      $o(),
      t("#gg").classList.remove("min"),
      (lt = 0),
      (st = 0),
      cancelAnimationFrame(Ot),
      (Ot = requestAnimationFrame(Ao)));
  }));
