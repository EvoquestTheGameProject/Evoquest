const F = [
    ["Black", "#1a1620"],
    ["Dark Brown", "#3d2314"],
    ["Brown", "#6b3f1e"],
    ["Auburn", "#8b3a1e"],
    ["Ginger", "#c8561f"],
    ["Blonde", "#e8c35a"],
    ["Platinum", "#f3ecd0"],
    ["Grey", "#9aa3ad"],
    ["White", "#eef2f7"],
    ["Blue", "#3a7bff"],
    ["Teal", "#25c7b8"],
    ["Green", "#4fcf4a"],
    ["Pink", "#ff6fb5"],
    ["Purple", "#9a4dff"],
  ],
  W = [
    ["White", "#f4f7fb"],
    ["Black", "#22252f"],
    ["Navy", "#2a3f8f"],
    ["Blue", "#2f6bff"],
    ["Sky", "#6fd0ff"],
    ["Teal", "#1fb8a6"],
    ["Green", "#3aa655"],
    ["Olive", "#6b7f3a"],
    ["Yellow", "#f2c230"],
    ["Orange", "#f08a2a"],
    ["Red", "#c8442a"],
    ["Pink", "#ff7fb0"],
    ["Purple", "#8a4ae0"],
    ["Grey", "#7d8795"],
  ],
  z = (t) => t.map((t) => [t]),
  q = {
    gd: z(["Male", "Female"]),
    hs: z([
      "Bald",
      "Buzz",
      "Short",
      "Side Part",
      "Spiky",
      "Mohawk",
      "Long",
      "Bob",
      "Ponytail",
      "Afro",
      "Bun",
      "Braid",
      "Pigtails",
    ]),
    hc: F,
    sk: [
      ["Porcelain", "#f8e3d4"],
      ["Fair", "#f2c9a4"],
      ["Light", "#e8b88a"],
      ["Tan", "#d29a68"],
      ["Olive", "#b98456"],
      ["Brown", "#8f5a35"],
      ["Deep", "#6b4128"],
      ["Ebony", "#46281a"],
    ],
    fc: z(["Happy", "Grin", "Smirk", "Surprised", "Serious", "Wink", "Sleepy", "Angry", "Sad"]),
    ey: [
      ["Brown", "#4a2a14"],
      ["Blue", "#3a8bff"],
      ["Green", "#3fae5a"],
      ["Grey", "#8d98a6"],
      ["Hazel", "#a8742a"],
      ["Violet", "#9a4dff"],
    ],
    gl: z(["None", "Round", "Square", "Shades", "Goggles"]),
    bs: z(["None", "Stubble", "Short", "Full", "Goatee", "Chin Strap", "Long"]),
    bc: F,
    mo: z(["None", "Classic", "Handlebar", "Thick", "Pencil", "Walrus"]),
    cl: z(["Lab Coat", "Hoodie", "Jacket", "T-Shirt", "Suit", "Overalls", "Turtleneck", "Dress"]),
    oc: W,
    tc: W,
  },
  Y = [
    ["gd", "Gender"],
    ["hs", "Hair Style"],
    ["hc", "Hair Color"],
    ["sk", "Skin"],
    ["fc", "Face"],
    ["ey", "Eyes"],
    ["gl", "Glasses"],
    ["bs", "Beard"],
    ["bc", "Beard Color"],
    ["mo", "Moustache"],
    ["cl", "Clothes"],
    ["oc", "Outfit Color"],
    ["tc", "Trim Color"],
  ],
  U = qs("#cc"),
  V = qs("#cvs"),
  j = V.getContext("2d"),
  J = qs("#copts");
let looks,
  Q,
  K = 0;
const Z = [0, 1, 2, 3, 4, 5, 9],
  $ = [6, 7, 8, 10, 11, 12],
  _ = (t) => (1 === t.gd ? ((t.bs = 0), (t.mo = 0)) : 7 === t.cl && (t.cl = 0), t),
  tt = (t) => {
    const a = {
      gd: 0,
      hs: 2,
      hc: 2,
      sk: 2,
      fc: 0,
      ey: 0,
      gl: 0,
      bs: 0,
      bc: 2,
      mo: 0,
      cl: 0,
      oc: 0,
      tc: 3,
    };
    return (
      t &&
        "object" == typeof t &&
        Y.forEach(([e]) => {
          const o = t[e];
          Number.isInteger(o) && o >= 0 && o < q[e].length && (a[e] = o);
        }),
      _(a)
    );
  },
  at = (t) => {
    try {
      localStorage.setItem("evoquest_looks", JSON.stringify(t));
    } catch (t) {}
  };
function et() {
  ((J.innerHTML = Y.filter(([t]) => !(1 === Q.gd && ("bs" === t || "bc" === t || "mo" === t)))
    .map(([t, a]) => {
      const e = q[t],
        o = e[Q[t]],
        r = !!e[0][1],
        n = r
          ? `<div class='swg'>${e.map((e, o) => `<button data-k='${t}' data-i='${o}' title='${e[0]}' aria-label='${a}: ${e[0]}' aria-pressed='${o === Q[t]}' class='${o === Q[t] ? "on" : ""}' style='background:${e[1]}'></button>`).join("")}</div>`
          : `<div class='cyc'><button data-k='${t}' data-d='-1' aria-label='Previous ${a}'>&lt;</button><span class='val'>${o[0]}</span><button data-k='${t}' data-d='1' aria-label='Next ${a}'>&gt;</button></div>`;
      return `<div class='oc'><b>${a}${r ? ": " + o[0] : ""}</b>${n}</div>`;
    })
    .join("")),
    (function (t) {
      (j.clearRect(0, 0, 40, 50), (j.imageSmoothingEnabled = !1));
      const a = (function (t) {
        const a = {
          tail: 0,
          skin: q.sk[t.sk][1],
          main: q.oc[t.oc][1],
          trim: q.tc[t.tc][1],
          step: 0,
          bob: 0,
          arm: 0,
        };
        return ya(
          "P|" +
            [0 | t.gd, t.hs, t.hc, t.sk, t.fc, t.ey, t.gl, t.bs, t.bc, t.mo, t.cl, t.oc, t.tc].join(
              ",",
            ),
          34,
          56,
          17,
          51,
          (e) => {
            (e.setTransform(1, 0, 0, 1, 1, 0), xa(e, t, a));
          },
          { step: 5 },
        );
      })(t);
      j.drawImage(a, 3, 0, 34, 49.84);
    })(Q));
}
((looks = (function () {
  let t;
  try {
    t = JSON.parse(localStorage.getItem("evoquest_looks") || "[]");
  } catch (a) {
    t = [];
  }
  for (Array.isArray(t) || (t = []); t.length < 3; ) t.push(null);
  return t;
})()),
  J.addEventListener("click", (t) => {
    const a = t.target.closest("button");
    if (!a) return;
    const e = a.dataset.k,
      o = void 0 !== a.dataset.i;
    if (o) Q[e] = +a.dataset.i;
    else {
      const t = q[e].length,
        o = +a.dataset.d;
      ((Q[e] = (Q[e] + o + t) % t),
        "cl" === e && 1 !== Q.gd && 7 === Q.cl && (Q.cl = o > 0 ? 0 : 6));
    }
    ("gd" === e &&
      (1 === Q.gd
        ? (Z.includes(Q.hs) && (Q.hs = 6), 3 === Q.tc && (Q.tc = 11))
        : ($.includes(Q.hs) && (Q.hs = 2), 11 === Q.tc && (Q.tc = 3)),
      _(Q)),
      et());
    const r = J.querySelector(
      o ? `[data-k='${e}'][data-i='${a.dataset.i}']` : `[data-k='${e}'][data-d='${a.dataset.d}']`,
    );
    r && r.focus({ preventScroll: !0 });
  }));
