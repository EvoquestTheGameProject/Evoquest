function re() {
  if (
    (ue > 0 && fe > 0 && (ue = Math.max(ue, 1)),
    (ie = ie.filter(
      (t) => (
        t.t++,
        "spark" === t.k || "shell" === t.k
          ? ((t.x += t.vx),
            (t.y += t.vy),
            (t.vy += t.g || 0),
            (t.vx *= 0.95),
            "shell" === t.k &&
              ((t.rot = (t.rot || 0) + 0.5),
              t.y > B() - 0.5 && t.vy > 0 && ((t.y = B() - 0.5), (t.vy *= -0.4), (t.vx *= 0.6))))
          : "smoke" === t.k && ((t.x += t.vx), (t.y += t.vy), (t.vx *= 0.96), (t.r += 0.08)),
        t.t < t.life
      ),
    )),
    he > 0 && he--,
    fe > 0)
  )
    return void fe--;
  if (
    (nt++,
    Pt || At || v || Z++,
    xt > 0 && 0 === --xt && t("#gt").classList.remove("on"),
    wt > 0 && wt--,
    ct !== it && ((ct += ct < it ? 0.1 : -0.1), Math.abs(ct - it) < 0.06 && ((ct = it), gt)))
  ) {
    const t = gt;
    ((gt = null), t(), (it = 0));
  }
  if (
    ((yt = yt.filter((t) => ((t.x += t.vx), (t.y += t.vy), (t.vy += t.g || 0), --t.life > 0))),
    Lt > 0 && Lt--,
    vt > 0 &&
      (vt--,
      vt % 2 == 0 &&
        yt.push({
          x: F.x + 9 * F.face,
          y: F.y - 23.2,
          vx: 0.35 * F.face,
          vy: 0.3,
          g: 0.12,
          life: 40,
          c: "#6aff7a",
          s: 1,
        }),
      0 === vt && (kt = 1)),
    kt > 0 && kt < 260)
  ) {
    kt++;
    for (let t = 0; t < 3; t++)
      yt.push({
        x: 146 + 40 * r(kt, t),
        y: a - 48 * r(kt, t + 9),
        vx: 0.3 * (r(kt, t + 3) - 0.5),
        vy: -0.3 - 0.5 * r(kt, t + 5),
        life: 34,
        c: t % 2 ? "#c8ffc8" : "#8aff9a",
        s: 1 + (0 == t),
      });
    (kt % 20 == 0 && (Lt = 4),
      kt >= 260 &&
        ((q = !0),
        (z = 2),
        na(),
        (function () {
          try {
            localStorage.setItem(
              Nt(),
              JSON.stringify({
                v: 1,
                inv: X.filter((t) => "potion" !== t),
                got: [...J],
                taken: Q,
                broken: K,
                worn: V,
                gloved: d,
                hasGoggles: U,
              }),
            );
          } catch (t) {}
        })(),
        $sx("success"),
        Re({ k: "ring", x: F.x, y: F.y - 17.4, r0: 3, r1: 26, c: "#ffe070", life: 22 }),
        Re({ k: "flash", x: F.x, y: F.y - 17.4, r: 30, c: "255,230,140", a: 0.6, life: 16 }),
        Jt(
          '<b>THE BARRICADE DISSOLVED!</b><br>The fire exit is open. Run!<br><span style="color:#8aff9a">&#10004; CHECKPOINT SAVED</span>',
          3800,
        )));
  }
  if (
    (O &&
      (function () {
        const a = O,
          e = B();
        if (((tt = et = A = at = 0), (_.s = 0), (a.ax = 0), $dT(a), ct === it)) {
          if ((a.t++, 0 === a.ph)) ((F.face = 1), (Te = 40), a.t > 230 && ((a.ph = 1), (a.t = 0)));
          else if (1 === a.ph) {
            ((F.face = 1), (Te = 40), (k = 20), 1 === a.t && $sx("pour"));
            const t = F.x + 13,
              e = F.y - 20.3,
              o = 181;
            for (let a = 0; a < 2; a++)
              yt.push({
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
              (Ie(
                181,
                F.y - 17.4 + 16 * (Math.random() - 0.5),
                2,
                ["#d8a0ff", "#8aff6a", "#ffffff"],
                1.2,
                0.08,
                14,
              ),
              Re({
                k: "smoke",
                x: 180,
                y: F.y - 18 * Po,
                vx: -0.2,
                vy: -0.35,
                r: 1.5,
                c: "190,150,230",
                life: 26,
              })),
              (H = Math.min(1, a.t / 130)),
              a.t % 8 == 0 && (Lt = Math.max(Lt, 2)),
              a.t > 145 &&
                ((a.ph = 2),
                (a.t = 0),
                (Te = 0),
                (k = 0),
                Re({ k: "ring", x: 182, y: F.y - 20.3, r0: 3, r1: 22, c: "#d8a0ff", life: 18 })));
          } else if (2 === a.ph) ((a.ax = 1), F.x >= 167 && ((a.ph = 3), (a.t = 0)));
          else if (3 === a.ph) {
            if (((F.face = 1), 8 === a.t || 38 === a.t || 68 === a.t)) {
              ((F.punch = 14),
                a.hits++,
                Le(181, F.y - 20.3, 1),
                (fe = 4),
                (Lt = 3 === a.hits ? 18 : 9));
              for (let t = 0; t < (3 === a.hits ? 22 : 8); t++)
                yt.push({
                  x: 182,
                  y: F.y - 8.7 - 26 * Math.random(),
                  vx: -0.5 - 2 * Math.random(),
                  vy: 2.2 * -Math.random(),
                  g: 0.14,
                  life: 34,
                  c: t % 2 ? "#6a7884" : "#3a444c",
                  s: 1.5,
                });
              3 === a.hits &&
                ((P = !0),
                He(180, e, 8, -1),
                Re({ k: "ring", x: 183, y: F.y - 20.3, r0: 4, r1: 30, c: "#ffffff", life: 18 }),
                Re({
                  k: "flash",
                  x: 183,
                  y: F.y - 20.3,
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
                F.x >= 182 &&
                  ((a.ph = 45),
                  (it = 1),
                  (gt = () => {
                    (oe("exitlab", "L"),
                      (F.x = 12),
                      (a.ph = 5),
                      (a.t = 0),
                      (a.tailB = { x: 310, face: -1, st: "tail", t: 0, flash: 0, hp: 100 }),
                      (R = [
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
                ? ((a.ax = 0.5), F.x >= 150 && a.t > 262 && ((a.ph = 6), (a.t = 0)))
                : 6 === a.ph
                  ? ((a.tw = Math.min(1.5, a.t / 50)), a.t > 150 && ((a.ph = 7), (a.t = 0)))
                  : 7 === a.ph
                    ? ((a.ax = 0.4), (a.tw = 1.5 + a.t / 40), F.x >= 200 && ((a.ph = 8), (a.t = 0)))
                    : 8 === a.ph
                      ? (a.t < 42 &&
                          ((a.sink = 22 + 1.1 * a.t),
                          (a.tw = 3),
                          a.t % 4 == 0 && (Lt = Math.max(Lt, 5)),
                          a.t % 6 == 0 && R.length) &&
                          He(R.pop().x, e, 5),
                        42 === a.t &&
                          ((a.tailB = null),
                          (R = []),
                          (Lt = 16),
                          Re({
                            k: "ring",
                            x: 350,
                            y: e,
                            r0: 4,
                            r1: 50,
                            c: "#ffe0a0",
                            life: 20,
                            sq: 0.18,
                          })),
                        190 === a.t && (qe(), (a.ph = 9), (a.t = 0)))
                      : 9 === a.ph &&
                        ((M && "intro" === M.st) ||
                          ((O = null), (t("#cskip").hidden = !0), na(), Be()));
          "exitlab" !== W || M || We();
        }
      })(),
    Pt || v || vt > 0 || (kt > 0 && !q) || ct !== it || At || ut)
  )
    return ((F.vx *= 0.6), void le());
  const e = O ? O.ax : (_.r ? 1 : 0) - (_.l ? 1 : 0);
  if (
    ((F.vx = 1.25 * e * (Eo.speed ? 2.2 : 1)),
    F.kb > 0 && (F.kb--, (F.vx = F.kbv)),
    e && (F.face = e > 0 ? 1 : -1),
    (F.walk = e ? 1 : 0),
    tt > 0 && tt--,
    at > 0 && at--,
    et > 0 && et--,
    F.on ? (rt = 6) : rt > 0 && rt--,
    tt > 0 && (rt > 0 || Eo.fly))
  ) {
    (Re({ k: "ring", x: F.x, y: F.y, r0: 1, r1: 7, c: "#cfd8e8", life: 10, sq: 0.3 }),
      (F.vy = Eo.jump ? -6.4 : -4.3),
      (F.on = !1),
      (rt = 0),
      (tt = 0),
      $sx("jump"));
    for (let t = 0; t < 4; t++)
      yt.push({ x: F.x, y: F.y, vx: 0.3 * (t - 1.5), vy: -0.1, life: 12, c: "#cfd8e8", s: 1 });
  }
  (at > 0 &&
    0 === F.punch &&
    ((F.punch = 14),
    (at = 0),
    $sx("swing"),
    (function () {
      const t = F.x + 12 * F.face * Po;
      if (
        (oa().forEach((a) => {
          if (
            void 0 !== a.crate &&
            Math.abs(t - (a.x + a.w / 2)) < 12 &&
            F.y > a.y - 10 &&
            F.y < a.y + 14
          ) {
            ((K[W + a.crate] = 1),
              $sx("crate"),
              (Lt = 5),
              He(a.x + a.w / 2, a.y + 10, 6),
              Re({
                k: "ring",
                x: a.x + a.w / 2,
                y: a.y + 6,
                r0: 2,
                r1: 12,
                c: "#e8c890",
                life: 12,
              }));
            for (let t = 0; t < 10; t++)
              yt.push({
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
        "pod" === W && !q && t >= 140)
      ) {
        Lt = 3;
        for (let t = 0; t < 6; t++)
          yt.push({
            x: 146,
            y: F.y - 14.5 - 10 * r(t, 1),
            vx: -0.6 - r(t, 2),
            vy: -0.4,
            g: 0.1,
            life: 14,
            c: "#ffe070",
            s: 1,
          });
        ($sx("clank"),
          Jt("<b>CLANK!</b> Fists won’t break metal and vines this thick. Think chemistry.", 2200),
          0 !== z || Tt || fa());
      }
      (M &&
        "exitlab" === W &&
        "dead" !== M.st &&
        "intro" !== M.st &&
        (go(t, F.y - 20.3, M) || go(t, F.y - 8.7, M) || go(t, F.y - 31.9, M)) &&
        F.y > B() - 70 &&
        (Le(t + 3 * F.face * Po, F.y - 20.3, 1), (fe = 4), (Lt = Math.max(Lt, 6)), oo(4)),
        "exitlab" === W && ze(t, F.y - 5.8, 2, F.face) && (fe = Math.max(fe, 2)));
      for (let a = 0; a < 3; a++)
        yt.push({
          x: t,
          y: F.y - 20.3,
          vx: F.face * (0.6 + 0.3 * a),
          vy: 0.2 * (a - 1),
          life: 8,
          c: "#fff",
          s: 1,
        });
    })()),
    F.punch > 0 && F.punch--,
    et > 0 &&
      ((et = 0),
      (function () {
        const t = h[W];
        for (const a of t.items)
          if (!Q[a.id] && !ea(a) && se(a.x, a.y, 15)) {
            ((Q[a.id] = 1), X.push(a.id), J.add(a.id), $sx("pickup"), la(), na());
            for (let t = 0; t < 10; t++)
              yt.push({
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
              Re({ k: "ring", x: a.x, y: a.y - 6, r0: 2, r1: 16, c: "#ffe070", life: 16 }),
              Re({ k: "flash", x: a.x, y: a.y - 6, r: 20, c: "255,235,140", a: 0.7, life: 12 }),
              ia(a.id),
              void (0 === z && ((z = 1), (Tt = !0), na()))
            );
          }
        for (const e of t.ints)
          if (!(Math.abs(F.x - e.x) >= e.r)) {
            if ("staffdoor" === e.id)
              return (
                (Lt = 3),
                He(e.x, a, 5),
                Jt("The rusted lock gives way. The door creaks open…", 1800),
                (it = 1),
                void (gt = () => {
                  (oe("ware", "R"),
                    J.has("canister") ||
                      Jt(
                        "<b>STAFF STORAGE.</b> Most crates are locked.<br>Punch the wooden ones. Check the shelves.",
                        3600,
                      ));
                })
              );
            if ("haz" === e.id)
              return Q.canister
                ? void Jt("The HAZARDOUS crate is empty now.", 1600)
                : ((Q.canister = 1),
                  X.push("canister"),
                  J.add("canister"),
                  $sx("pickup"),
                  la(),
                  na(),
                  Re({ k: "ring", x: e.x, y: 82, r0: 2, r1: 18, c: "#d8ff70", life: 16 }),
                  Re({ k: "flash", x: e.x, y: 82, r: 22, c: "220,255,120", a: 0.7, life: 12 }),
                  void ia("canister"));
            if ("lock" === e.id)
              return (
                (Lt = 2),
                void $sx("locked"),
                Jt("<b>LOCKED.</b> This crate is sealed tight.", 1500)
              );
          }
        for (const a of t.ints)
          if ("bench" === a.id && Math.abs(F.x - a.x) < a.r)
            return (
              J.size || Y || Jt("The mixing bench. Come back with chemicals.", 2200),
              void Ha()
            );
        "pod" === W &&
          !q &&
          F.x >= 116 &&
          0 === kt &&
          (Y
            ? ((vt = 90),
              $sx("pour"),
              (Y = !1),
              (X = X.filter((t) => "potion" !== t)),
              la(),
              (j = !0),
              na(),
              Jt("You pour the solvent onto the barricade…", 2e3),
              (F.face = 1))
            : 0 === z
              ? fa()
              : Jt("Nothing to pour yet. Make the solvent first.", 2200));
      })()),
    _.s && p && (A = Math.max(A, 1)),
    A > 0 &&
      (A--,
      (function () {
        if (!(!p || Pt || v || k > 0 || O)) {
          if ("stair" === W && !P && F.y >= 300 && F.x > 70)
            return (
              (O = { ph: 0, t: 0, ax: 0, cap: "", hits: 0, sink: 22, tw: 0, tailB: null }),
              (F.face = 1),
              (_.l = _.r = _.s = 0),
              (tt = at = et = A = 0),
              (t("#cskip").hidden = !1),
              Jt(""),
              void na()
            );
          if (u <= 0)
            return (
              $sx("empty"),
              Jt("The canister is empty! Hatchlings drop venom. Use your fists.", 1700),
              void (k = 24)
            );
          {
            const t = (_.r ? 1 : 0) - (_.l ? 1 : 0);
            t && (F.face = t);
          }
          (Eo.ammo || u--,
            (k = 22),
            (Te = 36),
            $sx("shoot"),
            (function () {
              const t = F.x + 13 * F.face * Po,
                a = F.y - 20.3;
              (x.push({ x: t, y: a, vx: 4.4 * F.face * Po, life: 70 }),
                Re({ k: "flash", x: t, y: a, r: 11, c: "190,120,255", a: 0.9, life: 6 }),
                Re({ k: "ring", x: t, y: a, r0: 1, r1: 8, c: "#d8a0ff", life: 8 }));
              for (let e = 0; e < 9; e++)
                yt.push({
                  x: t,
                  y: a,
                  vx: F.face * (1 + 2.2 * Math.random()),
                  vy: 1.4 * (Math.random() - 0.5),
                  g: 0.06,
                  life: 14,
                  c: e % 2 ? "#d8a0ff" : "#8a3ae0",
                  s: 1,
                });
              ((F.kb = 3), (F.kbv = 0.9 * -F.face), (Lt = Math.max(Lt, 3)));
            })(),
            0 === u && Jt("Canister empty! Kill hatchlings to collect venom.", 2e3),
            Be());
        }
      })()),
    le(),
    (function () {
      (y > 0 && y--, k > 0 && k--);
      const t = B();
      x = x.filter(
        (t) => (
          (t.x += t.vx),
          t.life--,
          nt % 2 == 0 &&
            yt.push({ x: t.x, y: t.y, vx: 0, vy: 0.15, g: 0.05, life: 10, c: "#b06aff", s: 1 }),
          "exitlab" === W && ze(t.x, t.y, 3, Math.sign(t.vx))
            ? (Ie(t.x, t.y, 8, ["#b06aff", "#e8d0ff"], 1.6, 0.1, 16), !1)
            : M && "exitlab" === W && "dead" !== M.st && "intro" !== M.st && go(t.x, t.y, M)
              ? (Le(t.x, t.y, 1),
                Ie(t.x, t.y, 14, ["#b06aff", "#e8d0ff", "#8a3ae0"], 2.2, 0.1, 22),
                Re({ k: "ring", x: t.x, y: t.y, r0: 2, r1: 16, c: "#d8a0ff", life: 14 }),
                (fe = 3),
                oo(10),
                !1)
              : t.life > 0 && t.x > 0 && t.x < G()
        ),
      );
      const a = M;
      if (!a || "exitlab" !== W) return;
      (a.t++, a.flash > 0 && a.flash--);
      const e = F.x - a.x,
        o = e >= 0 ? 1 : -1,
        n = a.hp < 50 ? 1.3 : 1;
      if ("intro" === a.st)
        (a.t % 12 == 0 && (Lt = Math.max(Lt, 5)),
          a.t > (O ? 190 : 110) && ((a.st = "walk"), (a.t = 0)));
      else if ("dead" === a.st) {
        if (a.t % 5 == 0)
          for (let e = 0; e < 4; e++)
            yt.push({
              x: a.x + 50 * (r(a.t, e) - 0.5),
              y: t - 80 * r(a.t, e + 3),
              vx: r(e, a.t) - 0.5,
              vy: -0.6,
              g: 0.02,
              life: 40,
              c: e % 2 ? "#8aff9a" : "#4a8a3a",
              s: 2,
            });
        if (a.t > 170 && !w) {
          ((w = !0),
            $sx("win"),
            (Lt = 24),
            na(),
            Jt(
              "<b>THE SNAKE IS DEAD!</b><br>The exit door burst open. Daylight! Go outside.",
              3600,
            ));
          for (let a = 0; a < 24; a++)
            yt.push({
              x: G() - 6,
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
            R.length < 3 &&
            ((a.sp = 0),
            (function (t) {
              const a = B(),
                e = Math.min(2, 4 - R.length);
              if (!(e <= 0)) {
                for (let o = 0; o < e; o++) {
                  const e = Math.max(
                    14,
                    Math.min(G() - 14, ho(t).head.x + (o ? 1 : -1) * (10 + 6 * o)),
                  );
                  (R.push({ x: e, hp: 3, t: 0, face: -1, hurt: 0, cd: 0, kb: 0 }),
                    $sx("spawn"),
                    Re({ k: "ring", x: e, y: a, r0: 2, r1: 14, c: "#8aff6a", life: 16, sq: 0.3 }),
                    Ie(e, a - 2, 10, ["#6a4a2a", "#8aff6a", "#3a2418"], 1.6, 0.14, 20),
                    He(e, a, 4));
                }
                ((Lt = Math.max(Lt, 6)),
                  t.warned ||
                    ((t.warned = 1),
                    Jt(
                      "<b>IT IS SPAWNING HATCHLINGS!</b><br>Punch or shoot the small snakes.",
                      2600,
                    )));
              }
            })(a)),
          (a.x += 0.3 * a.face * n),
          (a.x = Math.max(66, Math.min(G() - 66, a.x))),
          (go(F.x, F.y - 8.7, a) || go(F.x, F.y - 23.2, a)) && Ye(1),
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
            (Lt = 16),
            Re({ k: "ring", x: e, y: t, r0: 4, r1: 60, c: "#ffe0a0", life: 18, sq: 0.18 }),
            Re({ k: "flash", x: e, y: t - 4, r: 40, c: "255,220,160", a: 0.7, life: 10 }),
            He(e - 20, t, 6, -1),
            He(e + 20, t, 6, 1),
            T.push({ x: e - 32, vx: -1.8, hit: 0 }, { x: e + 32, vx: 1.8, hit: 0 }),
            F.on && F.y > t - 24 && Math.abs(F.x - e) < 32 && Ye(1));
          for (let a = 0; a < 14; a++)
            yt.push({
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
                x: Math.max(10, Math.min(182, F.x + 10 * F.vx)),
                shot: t + 24,
                fired: 0,
              });
          }),
          (a.tg || []).forEach((t) => {
            if (a.t === t.shot && !t.fired) {
              ((t.fired = 1), $sx("spit"));
              const e = ho(a).mouth;
              (E.push({ k: "venom", sx: e.x, sy: e.y, x: e.x, y: e.y, tx: t.x, t: 0, T: 30 }),
                (Lt = Math.max(Lt, 3)),
                Ie(e.x, e.y, 6, ["#8aff6a", "#d8ff9a", "#3ac850"], 1.2, 0.1, 14));
            }
          }),
          a.t > 84 / n && ((a.st = "walk"), (a.t = 0)));
      else if ("charge" === a.st) {
        1 === a.t && $sx("roar");
        if (a.t < 40) a.face = o;
        else if (
          ((a.x += 2.7 * a.face * n),
          0 === a.hit &&
            (go(F.x, F.y - 11.6, a) || go(F.x, F.y - 18 * Po, a)) &&
            (Ye(2), (a.hit = 1)),
          a.x <= 66 || a.x >= G() - 66)
        ) {
          ((a.x = Math.max(66, Math.min(G() - 66, a.x))),
            (a.st = "stun"),
            (a.t = 0),
            $sx("crash"),
            (Lt = 18),
            Re({
              k: "ring",
              x: a.x + 54 * a.face,
              y: t - 26,
              r0: 3,
              r1: 30,
              c: "#ffffff",
              life: 16,
            }),
            Re({
              k: "flash",
              x: a.x + 54 * a.face,
              y: t - 26,
              r: 30,
              c: "255,240,200",
              a: 0.8,
              life: 10,
            }),
            He(a.x + 52 * a.face, t, 8, -a.face));
          for (let e = 0; e < 10; e++)
            yt.push({
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
        We(),
        (function () {
          const t = B();
          L = L.filter(
            (a) => (
              a.t++,
              (a.vy += 0.14),
              (a.y = Math.min(t - 3, a.y + a.vy)),
              a.y >= t - 3 && (a.vy = 0),
              a.t > 14 && p && !v && Math.abs(F.x - a.x) < 8 && F.y > t - 22
                ? (u++,
                  Be(),
                  Re({ k: "ring", x: a.x, y: a.y, r0: 2, r1: 13, c: "#d8a0ff", life: 14 }),
                  Ie(a.x, a.y, 8, ["#b06aff", "#e8d0ff"], 1.4, 0.1, 16),
                  Jt("<b>+1 VENOM</b>", 900),
                  !1)
                : a.t < 1800
            ),
          );
        })(),
        (T = T.filter(
          (a) => (
            (a.x += a.vx),
            !a.hit && F.y > t - 5 && Math.abs(F.x - a.x) < 6 && (Ye(1), (a.hit = 1)),
            a.x > 0 && a.x < G()
          ),
        )),
        (E = E.filter((a) => {
          if ("venom" === a.k) {
            a.t++;
            const e = Math.min(1, a.t / a.T);
            return (
              (a.x = a.sx + (a.tx - a.sx) * e),
              (a.y = a.sy + (t - 1 - a.sy) * e * e - 26 * Math.sin(e * Math.PI)),
              a.t % 3 == 0 &&
                yt.push({ x: a.x, y: a.y, vx: 0, vy: 0.3, g: 0.12, life: 16, c: "#6ae05a", s: 1 }),
              Math.abs(a.x - F.x) < 5 && Math.abs(a.y - (F.y - 17.4)) < 11
                ? (Ye(1), Ie(a.x, a.y, 10, ["#8aff6a", "#d8ff9a"], 1.6, 0.12, 18), !1)
                : !(
                    e >= 1 &&
                    (Re({
                      k: "ring",
                      x: a.tx,
                      y: t,
                      r0: 2,
                      r1: 14,
                      c: "#8aff6a",
                      life: 14,
                      sq: 0.3,
                    }),
                    Ie(a.tx, t - 1, 14, ["#8aff6a", "#d8ff9a", "#3ac850"], 1.8, 0.14, 20),
                    ce.push({ x: a.tx, life: 110 }),
                    Math.abs(F.x - a.tx) < 10 && F.y > t - 16 && Ye(1),
                    1)
                  )
            );
          }
          return (
            (a.x += a.vx),
            (a.y += a.vy),
            a.life--,
            Math.abs(a.x - F.x) < 5 && Math.abs(a.y - (F.y - 17.4)) < 12
              ? (Ye(1), !1)
              : a.life > 0 && a.x > 0 && a.x < G() && a.y < t
          );
        })));
    })(),
    (function () {
      if ("stair" !== W || v) return ((Qe = F.on), void (F.on && ((Je = F.y), (Ze = F.x))));
      if (
        (!F.on && Qe && ((Xe = F.y), ($e = [Ze, Je])),
        F.on || (Xe = Math.min(Xe, F.y)),
        F.on && !Qe)
      ) {
        const a = F.y - Xe;
        a > 48 &&
          !Eo.god &&
          (function (a, e) {
            const o = Math.max(1, Math.round(e / 88));
            ((m -= a),
              (y = 60),
              (he = 16),
              (Lt = Math.min(18, 6 + 3 * a)),
              (fe = Math.max(fe, 3)),
              He(F.x - 3, F.y, 5, -1),
              He(F.x + 3, F.y, 5, 1),
              Re({ k: "ring", x: F.x, y: F.y, r0: 2, r1: 16, c: "#ff8a8a", life: 14, sq: 0.3 }),
              Be(),
              m <= 0
                ? ((m = 0),
                  (v = !0),
                  (Ue = "fall"),
                  (_e = $e.slice()),
                  (F.vx = F.vy = 0),
                  (t("#gd").querySelector("h3").textContent = "YOU FELL"),
                  (t("#gd").querySelector("p").textContent =
                    "That drop was too far. Years of damp and vines rotted the concrete, so whole sections of steps are gone. Fall damage grows with the height: a short hop is free, one floor costs about 2 hearts, two floors about 4. Jump the gaps or keep your momentum."),
                  (t("#gd").hidden = !1))
                : Jt(
                    "<b>OUCH!</b> You fell " +
                      (e >= 80 ? o + " floor" + (o > 1 ? "s" : "") : "hard") +
                      ": -" +
                      a +
                      " &#9829;",
                    2200,
                  ));
          })(Math.ceil((a - 48) / 32), a);
      }
      (F.on && ((Je = F.y), (Ze = F.x)), (Qe = F.on));
    })(),
    F.on && !de && be > 1.2 && (ue = 6),
    F.on && !de && be > 2.2 && (He(F.x - 3, F.y, 3, -1), He(F.x + 3, F.y, 3, 1)),
    (de = F.on),
    F.on || (be = F.vy),
    ue > 0 && ue--,
    Te > 0 && Te--);
  const o = h[W];
  (F.x <= 9 &&
    e < 0 &&
    !O &&
    (o.L
      ? ((it = 1), (gt = () => oe(o.L, "R")))
      : "stair" === W && F.y <= 44
        ? ((it = 1), (gt = () => oe("pod", "R")))
        : "stair" === W && F.y >= 300 && ((it = 1), (gt = () => oe("hall", "R")))),
    F.x >= G() - 9 &&
      e > 0 &&
      (!o.R || (o.gate && !o.gate(F))
        ? "pod" === W && q && !At
          ? ((it = 1),
            (gt = () => {
              ((z = 3), oe("stair", "L"));
            }))
          : "hall" === W
            ? ((it = 1),
              (gt = () => {
                (oe("stair", "L"), (F.x = 14), (F.y = 304), (S = 216));
              }))
            : "ware" === W
              ? ((it = 1),
                (gt = () => {
                  (oe("hall", "L"), (F.x = 40));
                }))
              : "stair" === W &&
                P &&
                !O &&
                F.y >= 300 &&
                ((it = 1), (gt = () => oe("exitlab", "L")))
        : ((it = 1), (gt = () => oe(o.R, "L")))),
    "exitlab" === W && w && !ut && !At && F.x >= G() - 16 && e > 0 && ne(),
    "outside" === W && !ut && F.x >= Ve.x / 2 - 16 && ne(),
    D > 0 && D--,
    "stair" === W &&
      !P &&
      !O &&
      F.y >= 300 &&
      F.x >= 175 &&
      e > 0 &&
      0 === D &&
      ((D = 200),
      (Lt = 3),
      Jt(
        p
          ? "<b>Sealed shut.</b> Step back and SHOOT the door (F / K)."
          : "<b>The door to the EXIT LAB is sealed shut.</b><br>Fists won’t open it. Explore to the LEFT at the bottom of the stairs.",
        3200,
      )),
    "pod" === W &&
      !q &&
      F.x >= 137 &&
      0 === kt &&
      (0 !== z || Tt
        ? Y || nt % 240 != 0 || Jt("Blocked! Find the chemicals and make a solvent.", 2200)
        : (fa(), (F.x = 134))));
}
function ne() {
  ((ut = 1),
    (_.l = _.r = _.s = 0),
    (F.vx = 0),
    (F.walk = 0),
    na(),
    (it = 1),
    (gt = () => {
      ((GM.on = !1),
        cancelAnimationFrame(Ot),
        playDoorCut().then(() => {
          e.hidden ||
            ((GM.on = !0),
            (At = 1),
            Dt(),
            (t("#gw").hidden = !1),
            (ct = 1),
            (it = 1),
            (lt = 0),
            (st = 0),
            (Ot = requestAnimationFrame(Ao)));
        }));
    }));
}
function le(t) {
  F.x += F.vx;
  const a =
    "pod" !== W || q || 0 !== kt ? ("stair" === W && !P && F.y >= 296 ? 176 : G() - 6) : 141;
  ((F.x = Math.max(8, Math.min(a, F.x))), (F.vy = Math.min(5, F.vy + 0.24)));
  const e = F.y;
  ((F.y += F.vy), (F.on = !1));
  const o = B();
  if (
    (F.y >= o && (F.vy > 2.2 && $sx("land"), (F.y = o), (F.vy = 0), (F.on = !0)),
    F.vy >= 0 && !F.on)
  )
    for (const t of oa())
      if (e <= t.y + 0.01 && F.y >= t.y && F.x > t.x - 3 && F.x < t.x + t.w + 3) {
        (F.vy > 2.2 && $sx("land"), (F.y = t.y), (F.vy = 0), (F.on = !0));
        break;
      }
  (F.walk &&
    F.on &&
    nt % 7 == 0 &&
    (nt % 14 || Math.abs(F.vx) < 0.3 || $sx("step"),
    yt.push({
      x: F.x - 3 * F.face * Po,
      y: F.y,
      vx: 0.2 * -F.face,
      vy: -0.1,
      life: 10,
      c: "#aab4c4",
      s: 0.5,
    })),
    (F.fr += F.walk ? 0.16 : 0));
}
function se(t, a, e) {
  return Math.abs(F.x - t) < e + 3 && Math.abs(F.y - 17.4 - (a - 6)) < 30;
}
((t("#gdR").onclick = () =>
  (function () {
    if ("fall" === Ue)
      return (
        (t("#gd").hidden = !0),
        (v = !1),
        (m = 5),
        (y = 60),
        (F.x = _e[0]),
        (F.y = _e[1]),
        (F.vx = F.vy = 0),
        (F.kb = 0),
        void (x = [])
      );
    ((t("#gd").hidden = !0),
      (v = !1),
      (m = 5),
      (u = p ? 4 : 0),
      (y = 60),
      (F.x = 24),
      (F.y = B()),
      (F.vx = F.vy = 0),
      (F.kb = 0),
      qe());
  })()),
  (t("#gdM").onclick = () => ee()),
  (t("#gg h4").onclick = () => {
    (t("#gg").classList.toggle("min"), z >= 1 && t("#gg").classList.contains("min"));
  }),
  (t("#ggb").onclick = () => {
    z >= 1 && !Y && !q && fa();
  }),
  (t("#cmix").onclick = function () {
    ((ga = []),
      (pa = null),
      (b = g = !1),
      ["water", "hcl", "h2o2", "salt", "strip"].forEach((t) => {
        const a = X.indexOf(t);
        a >= 0 && X.splice(a, 1);
      }),
      X.push("potion"),
      (Y = !0),
      Ya(
        "<b>SUCCESS! You made an eroding solvent.</b><br>Why it works: the <b>acid</b> (H⁺) eats iron: Fe + 2HCl → FeCl₂ + H₂↑. The <b>peroxide</b> oxidizes the metal so it dissolves faster. The <b>chloride</b> from the salt breaks through the protective oxide layer, and dries out the plant cells. <b>Water</b> made it safe to handle, and your gear kept you safe. Now go pour it on the barricade!",
        "good",
      ),
      (t("#cinv").hidden = !0),
      (t("#cmix").disabled = !0),
      (t("#cdone").textContent = "TAKE POTION"),
      na(),
      la());
  }),
  (t("#cdone").onclick = Na),
  (t("#cres").onclick = () => {
    ((ga = []), (b = g = !1), (pa = null), Ya("Beakers emptied. Start again.", ""));
  }),
  (t("#gq2").onclick = () => ee()),
  (t("#cskip").onclick = () => Fe()),
  (t("#wMenu").onclick = () => ee()),
  (t("#wAgain").onclick = () => {
    (Dt(), Bt(), $o());
  }),
  (t("#ccb").onclick = Na));
