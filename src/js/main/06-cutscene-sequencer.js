const _t = async (t) => {
    if ((await new Promise((a) => setTimeout(a, t)), Xt)) throw 0;
  },
  ta = async (t) => {
    if (Xt) throw 0;
    if (
      (await new Promise((a) => {
        const e = setTimeout(a, t);
        Kt = () => {
          (clearTimeout(e), a());
        };
      }),
      Xt)
    )
      throw 0;
  },
  aa = (t) => {
    ((Yt = t), (Vt = performance.now()), $sx("scene", t));
  },
  ea = async (t) => {
    ((jt = t), $sx(t ? "fadeout" : "fadein"), await _t(520));
  },
  oa = () => {
    nt.hidden = !0;
  };
async function ra(t, a) {
  if (Xt) throw 0;
  ((lt.textContent = t || "NARRATION"),
    (lt.hidden = !1),
    (nt.hidden = !1),
    nt.classList.remove("speaker-in"),
    nt.classList.add("speaker-in"),
    (st.textContent = ""));
  let e = 0;
  for (Qt = 1; e < a.length && Qt; )
    ((st.textContent = a.slice(0, ++e)),
      e % 3 || !/[a-z0-9]/i.test(a[e - 1]) || $sx("blip", Zt, a[e - 1]),
      await _t(22));
  ((st.textContent = a), (Qt = 0), await ta(1350 + Math.min(2600, 34 * a.length)));
}
async function na(t, a = 2300) {
  ((ct.textContent = t),
    ct.classList.add("on"),
    $sx("card"),
    await ta(a),
    ct.classList.remove("on"),
    await _t(450));
}
const la = {};
let sa = 0;
const ca = (() => {
    const t = document.createElement("canvas");
    return ((t.width = t.height = 1), t.getContext("2d", { willReadFrequently: !0 }));
  })(),
  ia = {},
  fa = (t) => {
    let a = ia[t];
    if (!a) {
      (ca.clearRect(0, 0, 1, 1),
        (ca.fillStyle = "#000"),
        (ca.fillStyle = t),
        ca.fillRect(0, 0, 1, 1));
      const e = ca.getImageData(0, 0, 1, 1).data;
      a = ia[t] = [e[0], e[1], e[2]];
    }
    return a;
  },
  ha = (t, a) => {
    const e = fa(t),
      o = a > 0 ? [255, 246, 230] : [16, 8, 38],
      r = Math.abs(a);
    return (
      "rgb(" +
      Math.round(e[0] + (o[0] - e[0]) * r) +
      "," +
      Math.round(e[1] + (o[1] - e[1]) * r) +
      "," +
      Math.round(e[2] + (o[2] - e[2]) * r) +
      ")"
    );
  };
function da(t, a, e, o) {
  const r = e[2] - e[0],
    n = e[3] - e[1],
    l = (o = o || {}).d || [0, 0, 1, 1],
    s = t.createLinearGradient(
      e[0] + r * l[0],
      e[1] + n * l[1],
      e[0] + r * l[2],
      e[1] + n * l[3] + 0.001,
    );
  (s.addColorStop(0, ha(a, 0.4)),
    s.addColorStop(0.2, ha(a, 0.13)),
    s.addColorStop(0.38, a),
    s.addColorStop(0.62, a),
    s.addColorStop(0.82, ha(a, -0.3)),
    s.addColorStop(1, ha(a, -0.5)),
    (t.fillStyle = o.flat ? a : s),
    t.fill());
}
function ba(t, a, e, o) {
  o = o || {};
  const r = a.length;
  if ((t.beginPath(), o.r)) {
    const e = (t) => [(a[t % r][0] + a[(t + 1) % r][0]) / 2, (a[t % r][1] + a[(t + 1) % r][1]) / 2],
      o = e(r - 1);
    t.moveTo(o[0], o[1]);
    for (let o = 0; o < r; o++) {
      const r = e(o);
      t.quadraticCurveTo(a[o][0], a[o][1], r[0], r[1]);
    }
  } else {
    t.moveTo(a[0][0], a[0][1]);
    for (let e = 1; e < r; e++) t.lineTo(a[e][0], a[e][1]);
  }
  t.closePath();
  let n = 1e9,
    l = 1e9,
    s = -1e9,
    c = -1e9;
  (a.forEach((t) => {
    ((n = Math.min(n, t[0])),
      (s = Math.max(s, t[0])),
      (l = Math.min(l, t[1])),
      (c = Math.max(c, t[1])));
  }),
    da(t, e, [n, l, s, c], o));
}
function ga(t, a, e, o, r, n, l) {
  ((l = l || {}), t.beginPath(), t.ellipse(a, e, o, r, l.rot || 0, 0, 6.2832));
  const s = Math.max(o, r);
  da(t, n, [a - s, e - s, a + s, e + s], l);
}
function pa(t, a, e, o) {
  ((t.strokeStyle = e),
    (t.lineWidth = o),
    (t.lineCap = "round"),
    (t.lineJoin = "round"),
    t.beginPath(),
    t.moveTo(a[0][0], a[0][1]));
  for (let e = 1; e < a.length; e++) t.lineTo(a[e][0], a[e][1]);
  t.stroke();
}
function ua(t, a, e, o) {
  (pa(t, a, ha(e, -0.38), o),
    pa(
      t,
      a.map((t) => [t[0] - 0.07 * o, t[1] - 0.09 * o]),
      e,
      0.72 * o,
    ),
    pa(
      t,
      a.map((t) => [t[0] - 0.2 * o, t[1] - 0.24 * o]),
      ha(e, 0.32),
      0.2 * o,
    ));
}
const ma = (t, a) => {
  const e = 43758.5453 * Math.sin(12.9898 * t + 78.233 * a);
  return e - Math.floor(e);
};
function ya(t, a, e, o, r, n, l) {
  let s = la[t];
  if (s) return s;
  if (++sa > 420) {
    for (const t in la) delete la[t];
    sa = 0;
  }
  ((s = document.createElement("canvas")), (s.width = a), (s.height = e));
  const c = s.getContext("2d", { willReadFrequently: !0 });
  return (
    n(c),
    (function (t, a, e, o) {
      const r = t.getImageData(0, 0, a, e).data,
        n = new Uint8Array(a * e),
        l = o.step || 20,
        s = o.rim ? fa(o.rim) : null,
        c = o.warm ? fa(o.warm) : null;
      for (let t = 0; t < a * e; t++) n[t] = r[4 * t + 3] >= 104 ? 1 : 0;
      const i = t.createImageData(a, e),
        f = i.data;
      for (let t = 0; t < e; t++)
        for (let i = 0; i < a; i++) {
          const h = t * a + i,
            d = 4 * h;
          if (n[h]) {
            const b = (Et(i, t) - 0.5) * l * 0.85;
            let g = r[d],
              p = r[d + 1],
              u = r[d + 2];
            if (o.mood) {
              const o = 1 - (t / e) * 0.3,
                r = 0.3 * g + 0.59 * p + 0.11 * u;
              ((g = r + 0.88 * (g - r)),
                (p = r + 0.88 * (p - r)),
                (u = r + 0.88 * (u - r)),
                (g = (1.14 * (g - 128) + 120) * o),
                (p = (1.14 * (p - 128) + 120) * o),
                (u = (1.14 * (u - 128) + 124) * o),
                ((i < a - 1 && !n[h + 1]) || (t < e - 1 && !n[h + a])) &&
                  ((g *= 0.66), (p *= 0.66), (u *= 0.72)),
                ma(i, t) < 0.03 && ((g *= 0.8), (p *= 0.8), (u *= 0.84)));
              {
                const e = (i + 3 * ((t >> 1) & 1)) % 6;
                (t % 2 == 0 &&
                  a > 40 &&
                  (0 === e
                    ? ((g *= 0.74), (p *= 0.74), (u *= 0.8))
                    : 1 === e && ((g *= 1.16), (p *= 1.16), (u *= 1.1))),
                  a > 40 &&
                    ma(i + 9, t + 4) < 0.012 &&
                    ((g = Math.min(255, 1.5 * g + 30)), (p = Math.min(255, 1.4 * p + 20))));
              }
              c &&
                t > 0 &&
                !n[h - a] &&
                ((g += 0.45 * (c[0] - g)), (p += 0.45 * (c[1] - p)), (u += 0.45 * (c[2] - u)));
            }
            (s &&
              i > 0 &&
              !n[h - 1] &&
              ((g += 0.42 * (s[0] - g)), (p += 0.42 * (s[1] - p)), (u += 0.42 * (s[2] - u))),
              (f[d] = Rt(Math.round((g + b) / l) * l, 0, 255)),
              (f[d + 1] = Rt(Math.round((p + b) / l) * l, 0, 255)),
              (f[d + 2] = Rt(Math.round((u + b) / l) * l, 0, 255)),
              (f[d + 3] = 255));
          } else {
            let o = -1;
            (i > 0 && n[h - 1]
              ? (o = d - 4)
              : i < a - 1 && n[h + 1]
                ? (o = d + 4)
                : t > 0 && n[h - a]
                  ? (o = d - 4 * a)
                  : t < e - 1 && n[h + a] && (o = d + 4 * a),
              o >= 0 &&
                ((f[d] = 10 + 0.16 * r[o]),
                (f[d + 1] = 6 + 0.14 * r[o + 1]),
                (f[d + 2] = 22 + 0.2 * r[o + 2]),
                (f[d + 3] = 255)));
          }
        }
      t.putImageData(i, 0, 0);
    })(c, a, e, l || {}),
    (s._ax = o),
    (s._ay = r),
    (la[t] = s),
    s
  );
}
window.__evoGender = () => (qt && qt.gd ? 1 : 0);
