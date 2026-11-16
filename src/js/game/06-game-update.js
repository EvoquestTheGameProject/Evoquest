function update() {
  if (
    (ue > 0 && hitStop > 0 && (ue = Math.max(ue, 1)),
    (fx = fx.filter(
      (t) => (
        t.t++,
        "spark" === t.k || "shell" === t.k
          ? ((t.x += t.vx),
            (t.y += t.vy),
            (t.vy += t.g || 0),
            (t.vx *= 0.95),
            "shell" === t.k &&
              ((t.rot = (t.rot || 0) + 0.5),
              t.y > floorY() - 0.5 &&
                t.vy > 0 &&
                ((t.y = floorY() - 0.5), (t.vy *= -0.4), (t.vx *= 0.6))))
          : "smoke" === t.k && ((t.x += t.vx), (t.y += t.vy), (t.vx *= 0.96), (t.r += 0.08)),
        t.t < t.life
      ),
    )),
    hurtFlash > 0 && hurtFlash--,
    hitStop > 0)
  )
    return void hitStop--;
  if (
    (tick++,
    modal || won || dead || runT++,
    xt > 0 && 0 === --xt && qs("#gt").classList.remove("on"),
    roomBanner > 0 && roomBanner--,
    fadeNow !== fadeTo &&
      ((fadeNow += fadeNow < fadeTo ? 0.1 : -0.1),
      Math.abs(fadeNow - fadeTo) < 0.06 && ((fadeNow = fadeTo), onFaded)))
  ) {
    const t = onFaded;
    ((onFaded = null), t(), (fadeTo = 0));
  }
  if (
    ((parts = parts.filter(
      (t) => ((t.x += t.vx), (t.y += t.vy), (t.vy += t.g || 0), --t.life > 0),
    )),
    shake > 0 && shake--,
    pourT > 0 &&
      (pourT--,
      pourT % 2 == 0 &&
        parts.push({
          x: player.x + 9 * player.face,
          y: player.y - 23.2,
          vx: 0.35 * player.face,
          vy: 0.3,
          g: 0.12,
          life: 40,
          c: "#6aff7a",
          s: 1,
        }),
      0 === pourT && (erode = 1)),
    erode > 0 && erode < 260)
  ) {
    erode++;
    for (let t = 0; t < 3; t++)
      parts.push({
        x: 146 + 40 * r(erode, t),
        y: a - 48 * r(erode, t + 9),
        vx: 0.3 * (r(erode, t + 3) - 0.5),
        vy: -0.3 - 0.5 * r(erode, t + 5),
        life: 34,
        c: t % 2 ? "#c8ffc8" : "#8aff9a",
        s: 1 + (0 == t),
      });
    (erode % 20 == 0 && (shake = 4),
      erode >= 260 &&
        ((exitOpen = !0),
        (stage = 2),
        updateGuide(),
        (function () {
          try {
            localStorage.setItem(
              checkpointKey(),
              JSON.stringify({
                v: 1,
                inv: inv.filter((t) => "potion" !== t),
                got: [...got],
                taken: taken,
                broken: broken,
                worn: worn,
                gloved: gloved,
                hasGoggles: hasGoggles,
              }),
            );
          } catch (t) {}
        })(),
        $sx("success"),
        addFx({
          k: "ring",
          x: player.x,
          y: player.y - 17.4,
          r0: 3,
          r1: 26,
          c: "#ffe070",
          life: 22,
        }),
        addFx({
          k: "flash",
          x: player.x,
          y: player.y - 17.4,
          r: 30,
          c: "255,230,140",
          a: 0.6,
          life: 16,
        }),
        toast(
          '<b>THE BARRICADE DISSOLVED!</b><br>The fire exit is open. Run!<br><span style="color:#8aff9a">&#10004; CHECKPOINT SAVED</span>',
          3800,
        )));
  }
  if (
    (cine &&
      (function () {
        const a = cine,
          e = floorY();
        if (
          ((jumpBuf = useBuf = shootBuf = punchBuf = 0),
          (keys.s = 0),
          (a.ax = 0),
          $dT(a),
          fadeNow === fadeTo)
        ) {
          if ((a.t++, 0 === a.ph))
            ((player.face = 1), (Te = 40), a.t > 230 && ((a.ph = 1), (a.t = 0)));
          else if (1 === a.ph) {
            ((player.face = 1), (Te = 40), (gunCd = 20), 1 === a.t && $sx("pour"));
            const t = player.x + 13,
              e = player.y - 20.3,
              o = 181;
            for (let a = 0; a < 2; a++)
              parts.push({
                x: t,
                y: e + (Math.random() - 0.5),
                vx: (o - t) / 13 + 0.4 * (Math.random() - 0.5),
                vy: 0.5 * (Math.random() - 0.5) - 0.45,
                g: 0.05,
                life: 13,
                c: Math.random() < 0.5 ? "#b06aff" : "#8a3ae0",
                s: 1.5,
              });
            (a.t % 3 == 0 &&
              (sparks(
                181,
                player.y - 17.4 + 16 * (Math.random() - 0.5),
                2,
                ["#d8a0ff", "#8aff6a", "#ffffff"],
                1.2,
                0.08,
                14,
              ),
              addFx({
                k: "smoke",
                x: 180,
                y: player.y - 18 * Po,
                vx: -0.2,
                vy: -0.35,
                r: 1.5,
                c: "190,150,230",
                life: 26,
              })),
              (corrode = Math.min(1, a.t / 130)),
              a.t % 8 == 0 && (shake = Math.max(shake, 2)),
              a.t > 145 &&
                ((a.ph = 2),
                (a.t = 0),
                (Te = 0),
                (gunCd = 0),
                addFx({
                  k: "ring",
                  x: 182,
                  y: player.y - 20.3,
                  r0: 3,
                  r1: 22,
                  c: "#d8a0ff",
                  life: 18,
                })));
          } else if (2 === a.ph) ((a.ax = 1), player.x >= 167 && ((a.ph = 3), (a.t = 0)));
          else if (3 === a.ph) {
            if (((player.face = 1), 8 === a.t || 38 === a.t || 68 === a.t)) {
              ((player.punch = 14),
                a.hits++,
                hitFx(181, player.y - 20.3, 1),
                (hitStop = 4),
                (shake = 3 === a.hits ? 18 : 9));
              for (let t = 0; t < (3 === a.hits ? 22 : 8); t++)
                parts.push({
                  x: 182,
                  y: player.y - 8.7 - 26 * Math.random(),
                  vx: -0.5 - 2 * Math.random(),
                  vy: 2.2 * -Math.random(),
                  g: 0.14,
                  life: 34,
                  c: t % 2 ? "#6a7884" : "#3a444c",
                  s: 1.5,
                });
              3 === a.hits &&
                ((bossOpen = !0),
                smoke(180, e, 8, -1),
                addFx({
                  k: "ring",
                  x: 183,
                  y: player.y - 20.3,
                  r0: 4,
                  r1: 30,
                  c: "#ffffff",
                  life: 18,
                }),
                addFx({
                  k: "flash",
                  x: 183,
                  y: player.y - 20.3,
                  r: 34,
                  c: "255,240,220",
                  a: 0.8,
                  life: 12,
                }));
            }
            a.t > 100 && ((a.ph = 4), (a.t = 0));
          } else
            4 === a.ph
              ? ((a.ax = 1),
                player.x >= 182 &&
                  ((a.ph = 45),
                  (fadeTo = 1),
                  (onFaded = () => {
                    (enterRoom("exitlab", "L"),
                      (player.x = 12),
                      (a.ph = 5),
                      (a.t = 0),
                      (a.tailB = { x: 310, face: -1, st: "tail", t: 0, flash: 0, hp: 100 }),
                      (minis = [
                        [190, 1],
                        [226, -1],
                        [262, 1],
                        [300, -1],
                      ].map(([t, a]) => ({
                        x: t,
                        hp: 3,
                        t: 40,
                        face: a,
                        hurt: 0,
                        cd: 0,
                        kb: 0,
                        roam: 1,
                      }))));
                  })))
              : 5 === a.ph
                ? ((a.ax = 0.5), player.x >= 150 && a.t > 262 && ((a.ph = 6), (a.t = 0)))
                : 6 === a.ph
                  ? ((a.tw = Math.min(1.5, a.t / 50)), a.t > 150 && ((a.ph = 7), (a.t = 0)))
                  : 7 === a.ph
                    ? ((a.ax = 0.4),
                      (a.tw = 1.5 + a.t / 40),
                      player.x >= 200 && ((a.ph = 8), (a.t = 0)))
                    : 8 === a.ph
                      ? (a.t < 42 &&
                          ((a.sink = 22 + 1.1 * a.t),
                          (a.tw = 3),
                          a.t % 4 == 0 && (shake = Math.max(shake, 5)),
                          a.t % 6 == 0 && minis.length) &&
                          smoke(minis.pop().x, e, 5),
                        42 === a.t &&
                          ((a.tailB = null),
                          (minis = []),
                          (shake = 16),
                          addFx({
                            k: "ring",
                            x: 350,
                            y: e,
                            r0: 4,
                            r1: 50,
                            c: "#ffe0a0",
                            life: 20,
                            sq: 0.18,
                          })),
                        190 === a.t && (spawnBoss(), (a.ph = 9), (a.t = 0)))
                      : 9 === a.ph &&
                        ((snakeBoss && "intro" === snakeBoss.st) ||
                          ((cine = null), (qs("#cskip").hidden = !0), updateGuide(), updateHud()));
          "exitlab" !== room || snakeBoss || updateMinis();
        }
      })(),
    modal || dead || pourT > 0 || (erode > 0 && !exitOpen) || fadeNow !== fadeTo || won || doorCut)
  )
    return ((player.vx *= 0.6), void physics());
  const e = cine ? cine.ax : (keys.r ? 1 : 0) - (keys.l ? 1 : 0);
  if (
    ((player.vx = 1.25 * e * (Eo.speed ? 2.2 : 1)),
    player.kb > 0 && (player.kb--, (player.vx = player.kbv)),
    e && (player.face = e > 0 ? 1 : -1),
    (player.walk = e ? 1 : 0),
    jumpBuf > 0 && jumpBuf--,
    punchBuf > 0 && punchBuf--,
    useBuf > 0 && useBuf--,
    player.on ? (coyote = 6) : coyote > 0 && coyote--,
    jumpBuf > 0 && (coyote > 0 || Eo.fly))
  ) {
    (addFx({ k: "ring", x: player.x, y: player.y, r0: 1, r1: 7, c: "#cfd8e8", life: 10, sq: 0.3 }),
      (player.vy = Eo.jump ? -6.4 : -4.3),
      (player.on = !1),
      (coyote = 0),
      (jumpBuf = 0),
      $sx("jump"));
    for (let t = 0; t < 4; t++)
      parts.push({
        x: player.x,
        y: player.y,
        vx: 0.3 * (t - 1.5),
        vy: -0.1,
        life: 12,
        c: "#cfd8e8",
        s: 1,
      });
  }
  (punchBuf > 0 &&
    0 === player.punch &&
    ((player.punch = 14),
    (punchBuf = 0),
    $sx("swing"),
    (function () {
      const t = player.x + 12 * player.face * Po;
      if (
        (platforms().forEach((a) => {
          if (
            void 0 !== a.crate &&
            Math.abs(t - (a.x + a.w / 2)) < 12 &&
            player.y > a.y - 10 &&
            player.y < a.y + 14
          ) {
            ((broken[room + a.crate] = 1),
              $sx("crate"),
              (shake = 5),
              smoke(a.x + a.w / 2, a.y + 10, 6),
              addFx({
                k: "ring",
                x: a.x + a.w / 2,
                y: a.y + 6,
                r0: 2,
                r1: 12,
                c: "#e8c890",
                life: 12,
              }));
            for (let t = 0; t < 10; t++)
              parts.push({
                x: a.x + a.w / 2,
                y: a.y + 4,
                vx: 2 * (r(t, 3) - 0.5),
                vy: 2 * -r(t, 4),
                g: 0.15,
                life: 30,
                c: t % 2 ? "#a87a4a" : "#6a4a2a",
                s: 1.5,
              });
          }
        }),
        "pod" === room && !exitOpen && t >= 140)
      ) {
        shake = 3;
        for (let t = 0; t < 6; t++)
          parts.push({
            x: 146,
            y: player.y - 14.5 - 10 * r(t, 1),
            vx: -0.6 - r(t, 2),
            vy: -0.4,
            g: 0.1,
            life: 14,
            c: "#ffe070",
            s: 1,
          });
        ($sx("clank"),
          toast(
            "<b>CLANK!</b> Fists won’t break metal and vines this thick. Think chemistry.",
            2200,
          ),
          0 !== stage || Tt || fa());
      }
      (snakeBoss &&
        "exitlab" === room &&
        "dead" !== snakeBoss.st &&
        "intro" !== snakeBoss.st &&
        (snakeHit(t, player.y - 20.3, snakeBoss) ||
          snakeHit(t, player.y - 8.7, snakeBoss) ||
          snakeHit(t, player.y - 31.9, snakeBoss)) &&
        player.y > floorY() - 70 &&
        (hitFx(t + 3 * player.face * Po, player.y - 20.3, 1),
        (hitStop = 4),
        (shake = Math.max(shake, 6)),
        hitBoss(4)),
        "exitlab" === room &&
          hitMinis(t, player.y - 5.8, 2, player.face) &&
          (hitStop = Math.max(hitStop, 2)));
      for (let a = 0; a < 3; a++)
        parts.push({
          x: t,
          y: player.y - 20.3,
          vx: player.face * (0.6 + 0.3 * a),
          vy: 0.2 * (a - 1),
          life: 8,
          c: "#fff",
          s: 1,
        });
    })()),
    player.punch > 0 && player.punch--,
    useBuf > 0 &&
      ((useBuf = 0),
      (function () {
        const t = rooms[room];
        for (const a of t.items)
          if (!taken[a.id] && !ea(a) && se(a.x, a.y, 15)) {
            ((taken[a.id] = 1),
              inv.push(a.id),
              got.add(a.id),
              $sx("pickup"),
              updateBag(),
              updateGuide());
            for (let t = 0; t < 10; t++)
              parts.push({
                x: a.x,
                y: a.y - 5,
                vx: 1.4 * (r(t, 5) - 0.5),
                vy: 1.6 * -r(t, 6),
                g: 0.06,
                life: 30,
                c: "#ffe070",
                s: 1,
              });
            return (
              addFx({ k: "ring", x: a.x, y: a.y - 6, r0: 2, r1: 16, c: "#ffe070", life: 16 }),
              addFx({ k: "flash", x: a.x, y: a.y - 6, r: 20, c: "255,235,140", a: 0.7, life: 12 }),
              ia(a.id),
              void (0 === stage && ((stage = 1), (Tt = !0), updateGuide()))
            );
          }
        for (const e of t.ints)
          if (!(Math.abs(player.x - e.x) >= e.r)) {
            if ("staffdoor" === e.id)
              return (
                (shake = 3),
                smoke(e.x, a, 5),
                toast("The rusted lock gives way. The door creaks open…", 1800),
                (fadeTo = 1),
                void (onFaded = () => {
                  (enterRoom("ware", "R"),
                    got.has("canister") ||
                      toast(
                        "<b>STAFF STORAGE.</b> Most crates are locked.<br>Punch the wooden ones. Check the shelves.",
                        3600,
                      ));
                })
              );
            if ("haz" === e.id)
              return taken.canister
                ? void toast("The HAZARDOUS crate is empty now.", 1600)
                : ((taken.canister = 1),
                  inv.push("canister"),
                  got.add("canister"),
                  $sx("pickup"),
                  updateBag(),
                  updateGuide(),
                  addFx({ k: "ring", x: e.x, y: 82, r0: 2, r1: 18, c: "#d8ff70", life: 16 }),
                  addFx({ k: "flash", x: e.x, y: 82, r: 22, c: "220,255,120", a: 0.7, life: 12 }),
                  void ia("canister"));
            if ("lock" === e.id)
              return (
                (shake = 2),
                void $sx("locked"),
                toast("<b>LOCKED.</b> This crate is sealed tight.", 1500)
              );
          }
        for (const a of t.ints)
          if ("bench" === a.id && Math.abs(player.x - a.x) < a.r)
            return (
              got.size || hasPotion || toast("The mixing bench. Come back with chemicals.", 2200),
              void openBench()
            );
        "pod" === room &&
          !exitOpen &&
          player.x >= 116 &&
          0 === erode &&
          (hasPotion
            ? ((pourT = 90),
              $sx("pour"),
              (hasPotion = !1),
              (inv = inv.filter((t) => "potion" !== t)),
              updateBag(),
              (potionUsed = !0),
              updateGuide(),
              toast("You pour the solvent onto the barricade…", 2e3),
              (player.face = 1))
            : 0 === stage
              ? fa()
              : toast("Nothing to pour yet. Make the solvent first.", 2200));
      })()),
    keys.s && hasGun && (shootBuf = Math.max(shootBuf, 1)),
    shootBuf > 0 &&
      (shootBuf--,
      (function () {
        if (!(!hasGun || modal || dead || gunCd > 0 || cine)) {
          if ("stair" === room && !bossOpen && player.y >= 300 && player.x > 70)
            return (
              (cine = { ph: 0, t: 0, ax: 0, cap: "", hits: 0, sink: 22, tw: 0, tailB: null }),
              (player.face = 1),
              (keys.l = keys.r = keys.s = 0),
              (jumpBuf = punchBuf = useBuf = shootBuf = 0),
              (qs("#cskip").hidden = !1),
              toast(""),
              void updateGuide()
            );
          if (ammo <= 0)
            return (
              $sx("empty"),
              toast("The canister is empty! Hatchlings drop venom. Use your fists.", 1700),
              void (gunCd = 24)
            );
          {
            const t = (keys.r ? 1 : 0) - (keys.l ? 1 : 0);
            t && (player.face = t);
          }
          (Eo.ammo || ammo--,
            (gunCd = 22),
            (Te = 36),
            $sx("shoot"),
            (function () {
              const t = player.x + 13 * player.face * Po,
                a = player.y - 20.3;
              (shots.push({ x: t, y: a, vx: 4.4 * player.face * Po, life: 70 }),
                addFx({ k: "flash", x: t, y: a, r: 11, c: "190,120,255", a: 0.9, life: 6 }),
                addFx({ k: "ring", x: t, y: a, r0: 1, r1: 8, c: "#d8a0ff", life: 8 }));
              for (let e = 0; e < 9; e++)
                parts.push({
                  x: t,
                  y: a,
                  vx: player.face * (1 + 2.2 * Math.random()),
                  vy: 1.4 * (Math.random() - 0.5),
                  g: 0.06,
                  life: 14,
                  c: e % 2 ? "#d8a0ff" : "#8a3ae0",
                  s: 1,
                });
              ((player.kb = 3), (player.kbv = 0.9 * -player.face), (shake = Math.max(shake, 3)));
            })(),
            0 === ammo && toast("Canister empty! Kill hatchlings to collect venom.", 2e3),
            updateHud());
        }
      })()),
    physics(),
    (function () {
      (invuln > 0 && invuln--, gunCd > 0 && gunCd--);
      const t = floorY();
      shots = shots.filter(
        (t) => (
          (t.x += t.vx),
          t.life--,
          tick % 2 == 0 &&
            parts.push({ x: t.x, y: t.y, vx: 0, vy: 0.15, g: 0.05, life: 10, c: "#b06aff", s: 1 }),
          "exitlab" === room && hitMinis(t.x, t.y, 3, Math.sign(t.vx))
            ? (sparks(t.x, t.y, 8, ["#b06aff", "#e8d0ff"], 1.6, 0.1, 16), !1)
            : snakeBoss &&
                "exitlab" === room &&
                "dead" !== snakeBoss.st &&
                "intro" !== snakeBoss.st &&
                snakeHit(t.x, t.y, snakeBoss)
              ? (hitFx(t.x, t.y, 1),
                sparks(t.x, t.y, 14, ["#b06aff", "#e8d0ff", "#8a3ae0"], 2.2, 0.1, 22),
                addFx({ k: "ring", x: t.x, y: t.y, r0: 2, r1: 16, c: "#d8a0ff", life: 14 }),
                (hitStop = 3),
                hitBoss(10),
                !1)
              : t.life > 0 && t.x > 0 && t.x < roomW()
        ),
      );
      const a = snakeBoss;
      if (!a || "exitlab" !== room) return;
      (a.t++, a.flash > 0 && a.flash--);
      const e = player.x - a.x,
        o = e >= 0 ? 1 : -1,
        n = a.hp < 50 ? 1.3 : 1;
      if ("intro" === a.st)
        (a.t % 12 == 0 && (shake = Math.max(shake, 5)),
          a.t > (cine ? 190 : 110) && ((a.st = "walk"), (a.t = 0)));
      else if ("dead" === a.st) {
        if (a.t % 5 == 0)
          for (let e = 0; e < 4; e++)
            parts.push({
              x: a.x + 50 * (r(a.t, e) - 0.5),
              y: t - 80 * r(a.t, e + 3),
              vx: r(e, a.t) - 0.5,
              vy: -0.6,
              g: 0.02,
              life: 40,
              c: e % 2 ? "#8aff9a" : "#4a8a3a",
              s: 2,
            });
        if (a.t > 170 && !bossDone) {
          ((bossDone = !0),
            $sx("win"),
            (shake = 24),
            updateGuide(),
            toast(
              "<b>THE SNAKE IS DEAD!</b><br>The exit door burst open. Daylight! Go outside.",
              3600,
            ));
          for (let a = 0; a < 24; a++)
            parts.push({
              x: roomW() - 6,
              y: t - 10 - 44 * r(a, 4),
              vx: 2 * -r(a, 5),
              vy: 1.5 * -r(a, 6),
              g: 0.12,
              life: 40,
              c: a % 2 ? "#aab4c4" : "#6a7480",
              s: 1.5,
            });
        }
      } else if ("walk" === a.st) {
        if (
          (Math.abs(e) > 40 && (a.face = o),
          a.t % 38 == 0 && $sx("bstep"),
          (a.sp = (a.sp || 0) + 1),
          a.sp > (a.hp < 50 ? 360 : 540) &&
            minis.length < 3 &&
            ((a.sp = 0),
            (function (t) {
              const a = floorY(),
                e = Math.min(2, 4 - minis.length);
              if (!(e <= 0)) {
                for (let o = 0; o < e; o++) {
                  const e = Math.max(
                    14,
                    Math.min(roomW() - 14, snakePose(t).head.x + (o ? 1 : -1) * (10 + 6 * o)),
                  );
                  (minis.push({ x: e, hp: 3, t: 0, face: -1, hurt: 0, cd: 0, kb: 0 }),
                    $sx("spawn"),
                    addFx({
                      k: "ring",
                      x: e,
                      y: a,
                      r0: 2,
                      r1: 14,
                      c: "#8aff6a",
                      life: 16,
                      sq: 0.3,
                    }),
                    sparks(e, a - 2, 10, ["#6a4a2a", "#8aff6a", "#3a2418"], 1.6, 0.14, 20),
                    smoke(e, a, 4));
                }
                ((shake = Math.max(shake, 6)),
                  t.warned ||
                    ((t.warned = 1),
                    toast(
                      "<b>IT IS SPAWNING HATCHLINGS!</b><br>Punch or shoot the small snakes.",
                      2600,
                    )));
              }
            })(a)),
          (a.x += 0.3 * a.face * n),
          (a.x = Math.max(66, Math.min(roomW() - 66, a.x))),
          (snakeHit(player.x, player.y - 8.7, a) || snakeHit(player.x, player.y - 23.2, a)) &&
            hurtPlayer(1),
          a.t > Math.max(45, 105 / n))
        ) {
          const t = Math.abs(e) < 56;
          let r = ["slam", "throw", "charge"].filter((t) => t !== a.last);
          (t && (r = ["slam", "slam", "throw"]),
            (a.st = r[(Math.random() * r.length) | 0]),
            (a.last = a.st),
            (a.t = 0),
            (a.face = o),
            (a.hit = 0));
        }
      } else if ("slam" === a.st) {
        1 === a.t && $sx("windup");
        if (46 === a.t) {
          const e = bo(a);
          ($sx("slam"),
            (shake = 16),
            addFx({ k: "ring", x: e, y: t, r0: 4, r1: 60, c: "#ffe0a0", life: 18, sq: 0.18 }),
            addFx({ k: "flash", x: e, y: t - 4, r: 40, c: "255,220,160", a: 0.7, life: 10 }),
            smoke(e - 20, t, 6, -1),
            smoke(e + 20, t, 6, 1),
            waves.push({ x: e - 32, vx: -1.8, hit: 0 }, { x: e + 32, vx: 1.8, hit: 0 }),
            player.on && player.y > t - 24 && Math.abs(player.x - e) < 32 && hurtPlayer(1));
          for (let a = 0; a < 14; a++)
            parts.push({
              x: e + 6 * (a - 7),
              y: t,
              vx: 0.15 * (a - 7),
              vy: 2 * -r(a, 2),
              g: 0.1,
              life: 20,
              c: "#aab4c4",
              s: 1.5,
            });
        }
        a.t > 82 / n && ((a.st = "walk"), (a.t = 0));
      } else if ("throw" === a.st)
        ((a.face = o),
          1 === a.t && (a.tg = []),
          [6, 20, 34].forEach((t) => {
            a.t === t &&
              a.tg &&
              a.tg.push({
                x: Math.max(10, Math.min(182, player.x + 10 * player.vx)),
                shot: t + 24,
                fired: 0,
              });
          }),
          (a.tg || []).forEach((t) => {
            if (a.t === t.shot && !t.fired) {
              ((t.fired = 1), $sx("spit"));
              const e = snakePose(a).mouth;
              (venoms.push({ k: "venom", sx: e.x, sy: e.y, x: e.x, y: e.y, tx: t.x, t: 0, T: 30 }),
                (shake = Math.max(shake, 3)),
                sparks(e.x, e.y, 6, ["#8aff6a", "#d8ff9a", "#3ac850"], 1.2, 0.1, 14));
            }
          }),
          a.t > 84 / n && ((a.st = "walk"), (a.t = 0)));
      else if ("charge" === a.st) {
        1 === a.t && $sx("roar");
        if (a.t < 40) a.face = o;
        else if (
          ((a.x += 2.7 * a.face * n),
          0 === a.hit &&
            (snakeHit(player.x, player.y - 11.6, a) || snakeHit(player.x, player.y - 18 * Po, a)) &&
            (hurtPlayer(2), (a.hit = 1)),
          a.x <= 66 || a.x >= roomW() - 66)
        ) {
          ((a.x = Math.max(66, Math.min(roomW() - 66, a.x))),
            (a.st = "stun"),
            (a.t = 0),
            $sx("crash"),
            (shake = 18),
            addFx({
              k: "ring",
              x: a.x + 54 * a.face,
              y: t - 26,
              r0: 3,
              r1: 30,
              c: "#ffffff",
              life: 16,
            }),
            addFx({
              k: "flash",
              x: a.x + 54 * a.face,
              y: t - 26,
              r: 30,
              c: "255,240,200",
              a: 0.8,
              life: 10,
            }),
            smoke(a.x + 52 * a.face, t, 8, -a.face));
          for (let e = 0; e < 10; e++)
            parts.push({
              x: a.x + 28 * a.face,
              y: t - 30 - 40 * r(e, 1),
              vx: -1 * a.face - r(e, 2),
              vy: -r(e, 3),
              g: 0.1,
              life: 24,
              c: "#aab4c4",
              s: 1.5,
            });
        }
      } else "stun" === a.st && a.t > 80 && ((a.st = "walk"), (a.t = 0));
      ((ce = ce.filter((t) => --t.life > 0)),
        updateMinis(),
        (function () {
          const t = floorY();
          drops = drops.filter(
            (a) => (
              a.t++,
              (a.vy += 0.14),
              (a.y = Math.min(t - 3, a.y + a.vy)),
              a.y >= t - 3 && (a.vy = 0),
              a.t > 14 && hasGun && !dead && Math.abs(player.x - a.x) < 8 && player.y > t - 22
                ? (ammo++,
                  updateHud(),
                  addFx({ k: "ring", x: a.x, y: a.y, r0: 2, r1: 13, c: "#d8a0ff", life: 14 }),
                  sparks(a.x, a.y, 8, ["#b06aff", "#e8d0ff"], 1.4, 0.1, 16),
                  toast("<b>+1 VENOM</b>", 900),
                  !1)
                : a.t < 1800
            ),
          );
        })(),
        (waves = waves.filter(
          (a) => (
            (a.x += a.vx),
            !a.hit &&
              player.y > t - 5 &&
              Math.abs(player.x - a.x) < 6 &&
              (hurtPlayer(1), (a.hit = 1)),
            a.x > 0 && a.x < roomW()
          ),
        )),
        (venoms = venoms.filter((a) => {
          if ("venom" === a.k) {
            a.t++;
            const e = Math.min(1, a.t / a.T);
            return (
              (a.x = a.sx + (a.tx - a.sx) * e),
              (a.y = a.sy + (t - 1 - a.sy) * e * e - 26 * Math.sin(e * Math.PI)),
              a.t % 3 == 0 &&
                parts.push({
                  x: a.x,
                  y: a.y,
                  vx: 0,
                  vy: 0.3,
                  g: 0.12,
                  life: 16,
                  c: "#6ae05a",
                  s: 1,
                }),
              Math.abs(a.x - player.x) < 5 && Math.abs(a.y - (player.y - 17.4)) < 11
                ? (hurtPlayer(1), sparks(a.x, a.y, 10, ["#8aff6a", "#d8ff9a"], 1.6, 0.12, 18), !1)
                : !(
                    e >= 1 &&
                    (addFx({
                      k: "ring",
                      x: a.tx,
                      y: t,
                      r0: 2,
                      r1: 14,
                      c: "#8aff6a",
                      life: 14,
                      sq: 0.3,
                    }),
                    sparks(a.tx, t - 1, 14, ["#8aff6a", "#d8ff9a", "#3ac850"], 1.8, 0.14, 20),
                    ce.push({ x: a.tx, life: 110 }),
                    Math.abs(player.x - a.tx) < 10 && player.y > t - 16 && hurtPlayer(1),
                    1)
                  )
            );
          }
          return (
            (a.x += a.vx),
            (a.y += a.vy),
            a.life--,
            Math.abs(a.x - player.x) < 5 && Math.abs(a.y - (player.y - 17.4)) < 12
              ? (hurtPlayer(1), !1)
              : a.life > 0 && a.x > 0 && a.x < roomW() && a.y < t
          );
        })));
    })(),
    (function () {
      if ("stair" !== room || dead)
        return ((Qe = player.on), void (player.on && ((Je = player.y), (Ze = player.x))));
      if (
        (!player.on && Qe && ((Xe = player.y), ($e = [Ze, Je])),
        player.on || (Xe = Math.min(Xe, player.y)),
        player.on && !Qe)
      ) {
        const a = player.y - Xe;
        a > 48 &&
          !Eo.god &&
          (function (a, e) {
            const o = Math.max(1, Math.round(e / 88));
            ((hp -= a),
              (invuln = 60),
              (hurtFlash = 16),
              (shake = Math.min(18, 6 + 3 * a)),
              (hitStop = Math.max(hitStop, 3)),
              smoke(player.x - 3, player.y, 5, -1),
              smoke(player.x + 3, player.y, 5, 1),
              addFx({
                k: "ring",
                x: player.x,
                y: player.y,
                r0: 2,
                r1: 16,
                c: "#ff8a8a",
                life: 14,
                sq: 0.3,
              }),
              updateHud(),
              hp <= 0
                ? ((hp = 0),
                  (dead = !0),
                  (Ue = "fall"),
                  (_e = $e.slice()),
                  (player.vx = player.vy = 0),
                  (qs("#gd").querySelector("h3").textContent = "YOU FELL"),
                  (qs("#gd").querySelector("p").textContent =
                    "That drop was too far. Years of damp and vines rotted the concrete, so whole sections of steps are gone. Fall damage grows with the height: a short hop is free, one floor costs about 2 hearts, two floors about 4. Jump the gaps or keep your momentum."),
                  (qs("#gd").hidden = !1))
                : toast(
                    "<b>OUCH!</b> You fell " +
                      (e >= 80 ? o + " floor" + (o > 1 ? "s" : "") : "hard") +
                      ": -" +
                      a +
                      " &#9829;",
                    2200,
                  ));
          })(Math.ceil((a - 48) / 32), a);
      }
      (player.on && ((Je = player.y), (Ze = player.x)), (Qe = player.on));
    })(),
    player.on && !de && be > 1.2 && (ue = 6),
    player.on &&
      !de &&
      be > 2.2 &&
      (smoke(player.x - 3, player.y, 3, -1), smoke(player.x + 3, player.y, 3, 1)),
    (de = player.on),
    player.on || (be = player.vy),
    ue > 0 && ue--,
    Te > 0 && Te--);
  const o = rooms[room];
  (player.x <= 9 &&
    e < 0 &&
    !cine &&
    (o.L
      ? ((fadeTo = 1), (onFaded = () => enterRoom(o.L, "R")))
      : "stair" === room && player.y <= 44
        ? ((fadeTo = 1), (onFaded = () => enterRoom("pod", "R")))
        : "stair" === room &&
          player.y >= 300 &&
          ((fadeTo = 1), (onFaded = () => enterRoom("hall", "R")))),
    player.x >= roomW() - 9 &&
      e > 0 &&
      (!o.R || (o.gate && !o.gate(player))
        ? "pod" === room && exitOpen && !won
          ? ((fadeTo = 1),
            (onFaded = () => {
              ((stage = 3), enterRoom("stair", "L"));
            }))
          : "hall" === room
            ? ((fadeTo = 1),
              (onFaded = () => {
                (enterRoom("stair", "L"), (player.x = 14), (player.y = 304), (camY = 216));
              }))
            : "ware" === room
              ? ((fadeTo = 1),
                (onFaded = () => {
                  (enterRoom("hall", "L"), (player.x = 40));
                }))
              : "stair" === room &&
                bossOpen &&
                !cine &&
                player.y >= 300 &&
                ((fadeTo = 1), (onFaded = () => enterRoom("exitlab", "L")))
        : ((fadeTo = 1), (onFaded = () => enterRoom(o.R, "L")))),
    "exitlab" === room && bossDone && !doorCut && !won && player.x >= roomW() - 16 && e > 0 && ne(),
    "outside" === room && !doorCut && player.x >= Ve.x / 2 - 16 && ne(),
    D > 0 && D--,
    "stair" === room &&
      !bossOpen &&
      !cine &&
      player.y >= 300 &&
      player.x >= 175 &&
      e > 0 &&
      0 === D &&
      ((D = 200),
      (shake = 3),
      toast(
        hasGun
          ? "<b>Sealed shut.</b> Step back and SHOOT the door (F / K)."
          : "<b>The door to the EXIT LAB is sealed shut.</b><br>Fists won’t open it. Explore to the LEFT at the bottom of the stairs.",
        3200,
      )),
    "pod" === room &&
      !exitOpen &&
      player.x >= 137 &&
      0 === erode &&
      (0 !== stage || Tt
        ? hasPotion ||
          tick % 240 != 0 ||
          toast("Blocked! Find the chemicals and make a solvent.", 2200)
        : (fa(), (player.x = 134))));
}
function ne() {
  ((doorCut = 1),
    (keys.l = keys.r = keys.s = 0),
    (player.vx = 0),
    (player.walk = 0),
    updateGuide(),
    (fadeTo = 1),
    (onFaded = () => {
      ((GM.on = !1),
        cancelAnimationFrame(Ot),
        playDoorCut().then(() => {
          e.hidden ||
            ((GM.on = !0),
            (won = 1),
            clearCheckpoint(),
            (qs("#gw").hidden = !1),
            (fadeNow = 1),
            (fadeTo = 1),
            (lt = 0),
            (st = 0),
            (Ot = requestAnimationFrame(frameLoop)));
        }));
    }));
}
function physics(t) {
  player.x += player.vx;
  const a =
    "pod" !== room || exitOpen || 0 !== erode
      ? "stair" === room && !bossOpen && player.y >= 296
        ? 176
        : roomW() - 6
      : 141;
  ((player.x = Math.max(8, Math.min(a, player.x))), (player.vy = Math.min(5, player.vy + 0.24)));
  const e = player.y;
  ((player.y += player.vy), (player.on = !1));
  const o = floorY();
  if (
    (player.y >= o &&
      (player.vy > 2.2 && $sx("land"), (player.y = o), (player.vy = 0), (player.on = !0)),
    player.vy >= 0 && !player.on)
  )
    for (const t of platforms())
      if (e <= t.y + 0.01 && player.y >= t.y && player.x > t.x - 3 && player.x < t.x + t.w + 3) {
        (player.vy > 2.2 && $sx("land"), (player.y = t.y), (player.vy = 0), (player.on = !0));
        break;
      }
  (player.walk &&
    player.on &&
    tick % 7 == 0 &&
    (tick % 14 || Math.abs(player.vx) < 0.3 || $sx("step"),
    parts.push({
      x: player.x - 3 * player.face * Po,
      y: player.y,
      vx: 0.2 * -player.face,
      vy: -0.1,
      life: 10,
      c: "#aab4c4",
      s: 0.5,
    })),
    (player.fr += player.walk ? 0.16 : 0));
}
function se(t, a, e) {
  return Math.abs(player.x - t) < e + 3 && Math.abs(player.y - 17.4 - (a - 6)) < 30;
}
((qs("#gdR").onclick = () =>
  (function () {
    if ("fall" === Ue)
      return (
        (qs("#gd").hidden = !0),
        (dead = !1),
        (hp = 5),
        (invuln = 60),
        (player.x = _e[0]),
        (player.y = _e[1]),
        (player.vx = player.vy = 0),
        (player.kb = 0),
        void (shots = [])
      );
    ((qs("#gd").hidden = !0),
      (dead = !1),
      (hp = 5),
      (ammo = hasGun ? 4 : 0),
      (invuln = 60),
      (player.x = 24),
      (player.y = floorY()),
      (player.vx = player.vy = 0),
      (player.kb = 0),
      spawnBoss());
  })()),
  (qs("#gdM").onclick = () => ee()),
  (qs("#gg h4").onclick = () => {
    (qs("#gg").classList.toggle("min"), stage >= 1 && qs("#gg").classList.contains("min"));
  }),
  (qs("#ggb").onclick = () => {
    stage >= 1 && !hasPotion && !exitOpen && fa();
  }),
  (qs("#cmix").onclick = function () {
    ((ga = []),
      (pa = null),
      (b = g = !1),
      ["water", "hcl", "h2o2", "salt", "strip"].forEach((t) => {
        const a = inv.indexOf(t);
        a >= 0 && inv.splice(a, 1);
      }),
      inv.push("potion"),
      (hasPotion = !0),
      Ya(
        "<b>SUCCESS! You made an eroding solvent.</b><br>Why it works: the <b>acid</b> (H⁺) eats iron: Fe + 2HCl → FeCl₂ + H₂↑. The <b>peroxide</b> oxidizes the metal so it dissolves faster. The <b>chloride</b> from the salt breaks through the protective oxide layer, and dries out the plant cells. <b>Water</b> made it safe to handle, and your gear kept you safe. Now go pour it on the barricade!",
        "good",
      ),
      (qs("#cinv").hidden = !0),
      (qs("#cmix").disabled = !0),
      (qs("#cdone").textContent = "TAKE POTION"),
      updateGuide(),
      updateBag());
  }),
  (qs("#cdone").onclick = Na),
  (qs("#cres").onclick = () => {
    ((ga = []), (b = g = !1), (pa = null), Ya("Beakers emptied. Start again.", ""));
  }),
  (qs("#gq2").onclick = () => ee()),
  (qs("#cskip").onclick = () => skipCine()),
  (qs("#wMenu").onclick = () => ee()),
  (qs("#wAgain").onclick = () => {
    (clearCheckpoint(), resetGame(), $o());
  }),
  (qs("#ccb").onclick = Na));
