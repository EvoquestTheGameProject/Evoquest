((t("#ccBack").onclick = he),
  (U.onclick = (t) => {
    t.target === U && he();
  }),
  (t("#ccRnd").onclick = () => {
    (Y.forEach(([t]) => {
      Q[t] = (Math.random() * q[t].length) | 0;
    }),
      1 === Q.gd &&
        Z.includes(Q.hs) &&
        Math.random() < 0.8 &&
        (Q.hs = $[(Math.random() * $.length) | 0]),
      _(Q),
      et());
  }),
  (t("#ccGo").onclick = () => {
    ((X[K] = Q),
      at(X),
      (U.hidden = !0),
      (async function () {
        (($t = G[K]),
          (qt = Q),
          (Xt = 0),
          (Qt = 0),
          (Zt = ""),
          (ot.hidden = !1),
          (it.hidden = !0),
          (nt.hidden = !0),
          ct.classList.remove("on"),
          (Jt = 1),
          (jt = 1),
          aa("street"),
          requestAnimationFrame(se));
        const a = async (t, a) => {
          (await ea(1), oa(), a && (await a()), aa(t), await ea(0));
        };
        try {
          (await ea(0),
            await ta(5900),
            await a("poster"),
            await ta(1800),
            await ra($t, "One million dollars... for my family?"),
            await a("call"),
            await ta(1200),
            (Zt = "p"),
            await ra(
              $t,
              "Hello? I saw your cryofreezing advertisement. Is the one-million-dollar reward real?",
            ),
            await ra(
              $t,
              "I need the money for my family. I would do almost anything to help them.",
            ),
            (Zt = "a"),
            await ra(
              "DR. VALE  /  INTAKE AGENT",
              "The reward is real. We can preserve you until medical science catches up. Your family receives the payment after enrollment.",
            ),
            await ra(
              "DR. VALE  /  INTAKE AGENT",
              "I have sent you a secure consent form. Read it carefully, then confirm your details.",
            ),
            (Zt = "p"),
            await ra($t, "And I will wake up one day? You promise?"),
            (Zt = "a"),
            await ra("DR. VALE  /  INTAKE AGENT", "That is the promise. Welcome to the future."),
            (Zt = ""),
            await a("pod", () => na("2 DAYS LATER")),
            await ta(6800),
            await a("lab", () => na("2 YEARS LATER")),
            await ra(
              "",
              "Two years after the volunteer vanished, the research facility was still racing to cure the world’s deadliest diseases.",
            ),
            await ra(
              "",
              "The cryogenic program was supposed to buy humanity time. The laboratory’s secret experiment was meant to give that time back.",
            ),
            await ra(
              "",
              "Then the test subject woke up screaming. Its cells rewrote themselves in seconds.",
            ),
            await ra("", "Containment failed. The first breach was only the beginning."),
            await ta(900),
            await a("out"),
            await ra("", "The pathogen did not kill the world. It adapted to it."),
            await ra("", "It moved through rain, roots, rivers, and the air itself."),
            await ra(
              "",
              "Some creatures became fast enough to hunt between heartbeats. Others grew into walking fortresses.",
            ),
            await ra("", "Cities fell silent. The survivors called the changed ones: EVOLVED."),
            await ta(1200),
            await a("rock"),
            await ra(
              "",
              "The last governments united around one impossible plan: abandon Earth and build a refuge on Mars.",
            ),
            await ra("", "The evacuation list was short. The launch windows were shorter."),
            await ta(2500),
            await a("left"),
            await ra("", "The evacuation ships launched under a sky filled with ash."),
            await ra(
              "",
              "His name was missing from the final manifest. No one came back for the sleeping volunteer.",
            ),
            await ta(1500),
            await a("wake", () => na("YEAR 2119", 2600)),
            await ta(7e3),
            await ra($t, "...Where is everyone?"),
            await ta(1200),
            await ea(1));
        } catch (t) {
          0 !== t && console.error(t);
        }
        ($sx("stop"),
          oa(),
          ct.classList.remove("on"),
          (jt = 1),
          (it.hidden = !1),
          t("#finGo").focus());
      })());
  }),
  (t("#play").onclick = () => {
    (B(), (L.hidden = !1), N.focus());
  }));
const de = () => {
  ((L.hidden = !0), t("#play").focus());
};
((N.onclick = de),
  (L.onclick = (t) => {
    t.target === L && de();
  }),
  (O.onclick = () => {
    ((P.hidden = !1), I.focus());
  }));
const be = () => {
  ((P.hidden = !0), O.focus());
};
((I.onclick = be),
  (P.onclick = (t) => {
    t.target === P && be();
  }),
  addEventListener("keydown", (t) => {
    (function (t) {
      return !(
        ot.hidden ||
        ("Escape" === t.key
          ? (it.hidden && ce(), 0)
          : (" " !== t.key && "Enter" !== t.key) ||
            t.target.closest("button") ||
            (ie(), t.preventDefault(), 0))
      );
    })(t) ||
      ("Escape" === t.key && (P.hidden ? (U.hidden ? L.hidden || de() : he()) : be()));
  }),
  addEventListener("resize", () => {
    (u(), A(), fe(), o && y(0));
  }),
  u(),
  A(),
  requestAnimationFrame(function t(a) {
    (y(a), o || requestAnimationFrame(t));
  }),
  requestAnimationFrame(function a() {
    const e = performance.now() - C,
      n = Math.min(1, e / 4100),
      l = Math.min(T.length, Math.max(0, Math.floor((e - 400) / 70)));
    for (
      (function (t, a) {
        k.clearRect(0, 0, 64, 96);
        const e = (t, a, e, o, r) => {
          ((k.fillStyle = t), k.fillRect(a, e, o, r));
        };
        for (let a = 0; a < 12; a++)
          if ((t / 20 + 5 * a) % 7 < 5) {
            const t = (60 * r(a, 5) + 2) | 0,
              o = (92 * r(a, 8)) | 0;
            (e("#9be7ff", t - 1, o, 3, 1), e("#9be7ff", t, o - 1, 1, 3));
          }
        const o = 3 + 90 * Math.min(1, a / 1400),
          n = [];
        for (let a = 3; a < 93 && a < o; a += 2) {
          const e = 0.14 * a + 0.05 * t,
            o = 19 * Math.sin(e),
            r = Math.cos(e) >= 0;
          n.push([a, r ? 32 - o : 32 + o, r ? 32 + o : 32 - o]);
        }
        (n.forEach(([t, a]) => {
          e("#1b46b0", (a - 1) | 0, t - 1, 3, 3);
        }),
          n.forEach(([t, a, o]) => {
            if (t % 8 == 3) {
              const r = 0 | Math.min(a, o),
                n = 0 | Math.max(a, o);
              if (n - r > 5) {
                const a = (r + n) >> 1;
                (e("#4da3ff", r + 2, t, a - r - 2, 2), e("#9be7ff", a, t, n - a - 1, 2));
              }
            }
          }),
          n.forEach(([t, a, o]) => {
            const r = 0 | o;
            (e("#4da3ff", r - 1, t - 1, 3, 3),
              e("#2158d6", r + 1, t + 1, 1, 1),
              e("#e6fbff", r - 1, t - 1, 1, 1));
          }));
      })(o ? 1 : e / 16.7 + 90 * ZP * ZP, o ? 1e4 : e);
      R < l;
      R++
    )
      T[R].classList.add("v");
    e > 2e3 && M.classList.add("done");
    const s = Math.floor(12 * n);
    for (let t = 0; t < 12; t++) S[t].classList.toggle("on", t < s);
    e < 4100
      ? requestAnimationFrame(a)
      : e < 4100 + ZD
        ? ($zs(e), requestAnimationFrame(a))
        : $ze();
  }),
  (function () {
    const t = Ht;
    window.pxLayer = function (a) {
      return t((t) => {
        const e = t.px;
        return ((t.px = (t, a, o, r) => e(t, a, "string" == typeof o ? St(o) : o, r)), a(t));
      });
    };
  })());
const ge = (t, a) => Ct(St(t), [255, 255, 255], a),
  pe = (t, a) => Ct(St(t), [0, 0, 0], a),
  ue = {};
