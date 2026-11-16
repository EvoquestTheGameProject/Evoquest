((GM.step = (t) => {
  for (let a = 0; a < t; a++) update();
}),
  (GM.render = render),
  (GM.spawnBoss = () => {
    (spawnBoss(), (snakeBoss.st = "walk"), (snakeBoss.t = 0));
  }),
  (GM.cheat = () => {
    ((bossOpen = !0), Qo());
  }),
  (GM.sealTest = () => {
    ((bossOpen = !1), (corrode = 0), Qo());
  }),
  (GM.give = (t) => {
    (t.forEach((t) => {
      (inv.includes(t) || inv.push(t), got.add(t));
    }),
      updateBag(),
      updateGuide());
  }),
  (GM.bench = () => ({
    beaker: [...ga],
    small: pa,
    worn: worn,
    gloved: gloved,
    stirred: b,
    tested: g,
    canFill: canFill,
    tray: Object.assign({}, ua),
    tap: tapBench(),
    msg: ma,
  })),
  (GM.craft = () => openBench()),
  (GM.dbg = () => ({
    bossOpen: bossOpen,
    cine: cine ? cine.ph : null,
    canFill: canFill,
    drops: drops.length,
    doorCut: doorCut,
    minis: minis.length,
    camX: camX,
    exitOpen: exitOpen,
    bv: shots.map((t) => t.vx),
    face: player.face,
    hasGun: hasGun,
    ammo: ammo,
    hp: hp,
    boss: snakeBoss && { hp: snakeBoss.hp, st: snakeBoss.st, x: snakeBoss.x },
    dead: dead,
    room: room,
    x: player.x,
    y: player.y,
    stage: stage,
    got: [...got],
    inv: [...inv],
    hasPotion: hasPotion,
    exitOpen: exitOpen,
    erode: erode,
    pour: pourT,
    modal: modal,
    win: won,
  })),
  (GM.boss = (t) => {
    snakeBoss && Object.assign(snakeBoss, t);
  }),
  (GM.hurt = (t) => hurtPlayer(t)),
  (GM.set = (t) => {
    (t.room && ((room = t.room), backdrops[room] || backdrop(room)),
      void 0 !== t.x && (player.x = t.x),
      void 0 !== t.y && (player.y = t.y));
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
const No = qs("#dvc"),
  Do = qs("#dvp"),
  Go = qs("#gdv"),
  Bo = qs("#dnab"),
  Fo = qs("#dvh"),
  Wo = (t) => {
    const a = t / 60,
      e = Math.floor(a / 60);
    return (e < 10 ? "0" : "") + e + ":" + (a % 60 < 10 ? "0" : "") + (a % 60).toFixed(2);
  };
function zo() {
  qs("#dvd").textContent = "●".repeat(Io.length) + "○".repeat(6 - Io.length);
}
function qo() {
  "712411" === Io
    ? ((Eo.on = !0), (No.hidden = !0), er())
    : ((qs("#dvm").textContent = "INVALID CODE"),
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
  for (const t in items)
    "potion" === t || _t.includes(t) || (inv.includes(t) || inv.push(t), got.add(t));
  for (const t in rooms) (rooms[t].items || []).forEach((t) => (taken[t.id] = 1));
  ((hasGun = !0),
    (ammo = 4),
    inv.includes("blaster") || inv.push("blaster"),
    (hasPotion = !0),
    inv.includes("potion") || inv.push("potion"),
    0 === stage && (stage = 1),
    (Tt = !0),
    updateBag(),
    updateGuide(),
    updateHud());
}
function Qo() {
  ((hasGun = !0),
    (ammo = 4),
    got.add("blaster"),
    inv.includes("blaster") || inv.push("blaster"),
    updateBag(),
    updateHud());
}
function Ko() {
  ((exitOpen = !0),
    (stage = 2),
    (erode = 260),
    (pourT = 0),
    (potionUsed = !0),
    (hasPotion = !1),
    (inv = inv.filter((t) => "potion" !== t)),
    updateBag(),
    updateGuide());
}
function Zo(a) {
  ((modal = 0),
    (Oo = 0),
    (qs("#gk").hidden = !0),
    (qs("#gx").hidden = !0),
    (player.vx = player.vy = 0),
    ("stair" !== a && "exitlab" !== a) || Ko(),
    ("hall" !== a && "ware" !== a) || Ko(),
    "exitlab" === a && ((bossOpen = !0), hasGun || Qo()),
    "outside" === a && (Ko(), hasGun || Qo(), (bossDone = !0), (doorCut = 0)),
    enterRoom(a, "L"),
    "stair" === a && (player.x = 24),
    updateGuide(),
    updateHud());
}
function $o() {
  (document.body.classList.add("ingame"),
    (Go.hidden = !Eo.on),
    Eo.on && (Eo.sItems && Xo(), Eo.sOpen && Ko(), Eo.sRoom && Zo(Eo.sRoom), updateHud()));
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
      "<h4>WORKBENCH UI: NOW " +
      (tapBench() ? "PHONE (TAP)" : "DESKTOP (DRAG)") +
      '</h4><div class="dvg4">' +
      [
        ["auto", "AUTO"],
        ["bench", "DESKTOP"],
        ["tap", "PHONE"],
      ]
        .map(([t, a]) => e(benchPref === t, 'data-w="' + t + '"', a))
        .join("") +
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
      Jo.map(([t, o]) =>
        e((!a && Eo.sRoom === t) || (a && room === t), 'data-r="' + t + '"', o),
      ).join("") +
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
          ? $.map((t) => (rooms[t[0]].name || t[0]) + "  " + Wo(t[1])).join("<br>")
          : "No splits yet.") +
        "<br><b>RUN " +
        Wo(runT) +
        "</b></div>")),
    (qs("#dvb").innerHTML = r + '<button class="dvb big" id="dvx">CLOSE</button>'));
}
let tr = 60,
  ar = 0;
function er() {
  (GM.on && ((Oo = modal), (modal = 1)), _o(), (Do.hidden = !1));
}
function or() {
  ((Do.hidden = !0), GM.on && (modal = Oo ? 1 : 0), (Oo = 0));
}
((Bo.onclick = () => (
  (Io = ""),
  zo(),
  (qs("#dvm").textContent = "STAFF ACCESS CODE"),
  void (No.hidden = !1)
)),
  (Go.onclick = () => er()),
  (qs("#dvk").onclick = (t) => {
    const a = t.target.closest("[data-k]");
    a && Yo(a.dataset.k);
  }),
  (qs("#dvq").onclick = () => {
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
          : o.dataset.w
            ? (setBenchMode(o.dataset.w), _o())
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
                  if ("items" === a) (Xo(), toast("All items added.", 1600));
                  else if ("gun" === a) (Qo(), toast("Venom Blaster added.", 1600));
                  else if ("solvent" === a)
                    ((hasPotion = !0),
                      inv.includes("potion") || inv.push("potion"),
                      0 === stage && (stage = 1),
                      updateBag(),
                      updateGuide(),
                      toast("Solvent added.", 1600));
                  else if ("open" === a) (Ko(), toast("Barricade removed.", 1600));
                  else if ("heal" === a)
                    ((hp = 5),
                      (ammo = 4),
                      (invuln = 0),
                      updateHud(),
                      toast("HP + ammo restored.", 1600));
                  else {
                    if ("respawn" === a)
                      return (enterRoom(room, "L"), (modal = 0), (Oo = 0), void (Do.hidden = !0));
                    if ("killboss" === a)
                      snakeBoss && "dead" !== snakeBoss.st
                        ? ("intro" === snakeBoss.st && (snakeBoss.st = "walk"), hitBoss(9999))
                        : toast("No boss in this room.", 2e3);
                    else if ("resetboss" === a)
                      ((bossDone = !1),
                        (won = 0),
                        (qs("#gw").hidden = !0),
                        "exitlab" === room
                          ? spawnBoss()
                          : toast("Boss resets on entering the boss room.", 2200));
                    else if ("win" === a) ((bossDone = !0), (won = 1), (qs("#gw").hidden = !1));
                    else {
                      if ("restart" === a) return (or(), resetGame(), void $o());
                      if ("cpsave" === a)
                        ((Lo = {
                          room: room,
                          P: Object.assign({}, player),
                          inv: [...inv],
                          got: [...got],
                          taken: Object.assign({}, taken),
                          broken: Object.assign({}, broken),
                          stage: stage,
                          exitOpen: exitOpen,
                          hasPotion: hasPotion,
                          hasGun: hasGun,
                          ammo: ammo,
                          hp: hp,
                          bossDone: bossDone,
                          worn: worn,
                          gloved: gloved,
                          potionUsed: potionUsed,
                          erode: erode,
                          runT: runT,
                        }),
                          toast("Checkpoint saved.", 1400));
                      else if ("cpload" === a)
                        return (
                          Lo
                            ? ((room = Lo.room),
                              backdrops[room] || backdrop(room),
                              Object.assign(player, Lo.P),
                              (player.vx = player.vy = 0),
                              (inv = [...Lo.inv]),
                              (got = new Set(Lo.got)),
                              (taken = Object.assign({}, Lo.taken)),
                              (broken = Object.assign({}, Lo.broken)),
                              (stage = Lo.stage),
                              (exitOpen = Lo.exitOpen),
                              (hasPotion = Lo.hasPotion),
                              (hasGun = Lo.hasGun),
                              (ammo = Lo.ammo),
                              (hp = Lo.hp),
                              (bossDone = Lo.bossDone),
                              (worn = Lo.worn),
                              (gloved = Lo.gloved),
                              (potionUsed = Lo.potionUsed),
                              (erode = Lo.erode),
                              (runT = Lo.runT),
                              (shots = []),
                              (venoms = []),
                              (waves = []),
                              (snakeBoss = null),
                              (dead = !1),
                              (won = 0),
                              (qs("#gd").hidden = !0),
                              (qs("#gw").hidden = !0),
                              "exitlab" !== room || bossDone || spawnBoss(),
                              updateBag(),
                              updateGuide(),
                              updateHud(),
                              toast("Checkpoint loaded.", 1400))
                            : toast("No checkpoint saved yet.", 1600),
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
    ($sx("stop"),
      (playerName = a || playerName),
      o && (playerLook = o),
      (GM.on = !0),
      (e.hidden = !1),
      (ot.hidden = !0));
    const r = (ra = matchMedia("(pointer:coarse)").matches || "ontouchstart" in window);
    (qs("#gp").classList.toggle("on", r || "#touch" === location.hash),
      document.activeElement && document.activeElement.blur && document.activeElement.blur());
    for (const t in _a) _a[t].rel();
    ((keys.l = keys.r = keys.s = 0),
      (jumpBuf = punchBuf = useBuf = 0),
      resetGame(),
      (function () {
        let t = null;
        try {
          t = JSON.parse(localStorage.getItem(checkpointKey()) || "null");
        } catch (t) {}
        !t ||
          !(t.v >= 1) ||
          ((inv = t.inv || []),
          (got = new Set(t.got || [])),
          (taken = t.taken || {}),
          (broken = t.broken || {}),
          (worn = !!t.worn),
          (gloved = !!t.gloved),
          (hasGoggles = !!t.hasGoggles),
          (stage = 2),
          (exitOpen = !0),
          (erode = 260),
          (pourT = 0),
          (hasPotion = !1),
          (potionUsed = !0),
          (Tt = !0),
          updateBag(),
          updateGuide(),
          toast(
            "<b>CHECKPOINT</b><br>The barricade is already dissolved. Head for the fire exit.",
            3400,
          ));
      })(),
      fo(),
      backdrops.pod || backdrop("pod"),
      $o(),
      qs("#gg").classList.remove("min"),
      (lt = 0),
      (st = 0),
      cancelAnimationFrame(Ot),
      (Ot = requestAnimationFrame(frameLoop)));
  }));
window.__evoRoom = () => room;
window.__evoBoss = () => (snakeBoss ? snakeBoss.st : "");
