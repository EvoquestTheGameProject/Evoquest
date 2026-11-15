const ot = t("#cut"),
  rt = t("#cs"),
  nt = t("#dlg"),
  lt = t("#who"),
  st = t("#say"),
  ct = t("#card"),
  it = t("#fin");
let ft = rt.getContext("2d");
const ht = ft,
  dt = 192,
  bt = 108,
  gt = (t) => Math.round(2 * t) / 2,
  pt = (t, a, e, o, r) => {
    o <= 0 ||
      r <= 0 ||
      ((ft.fillStyle = t), ft.fillRect(gt(a), gt(e), Math.max(0.5, gt(o)), Math.max(0.5, gt(r))));
  },
  ut = (t, a, e, o) => {
    for (let r = -e; r <= e; r++) {
      const n = 0 | Math.sqrt(e * e - r * r + 0.6 * e);
      pt(o, t - n, a + r, 2 * n + 1, 1);
    }
  },
  mt = (t, a, e, o, r) => {
    ((ft.font = r || '8px "Press Start 2P"'),
      (ft.textBaseline = "top"),
      (ft.fillStyle = o),
      ft.fillText(t, 0 | a, 0 | e));
  },
  yt = (t, a, e, o, r) =>
    Object.assign(
      { gd: 0, hs: 2, hc: t, sk: a, fc: 0, ey: 0, gl: 0, bs: 0, bc: t, mo: 0, cl: 3, oc: e, tc: o },
      r || {},
    ),
  xt = {};
function Mt(t, a) {
  let e = xt[t];
  if (!e) {
    ((e = document.createElement("canvas")), (e.width = 384), (e.height = 216));
    const o = ft;
    ((ft = e.getContext("2d")), ft.scale(2, 2), a(), (ft = o), (xt[t] = e));
  }
  ft.drawImage(e, 0, 0, dt, bt);
}
const wt = (t, a, e) => {
    (ft.translate(96, 54), ft.scale(t, t), ft.translate(-a, -e));
  },
  vt = 384,
  kt = 216,
  At = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5],
  Et = (t, a) => (At[((3 & a) << 2) | (3 & t)] + 0.5) / 16,
  Tt = {},
  St = (t) =>
    Tt[t] ||
    (Tt[t] = [
      parseInt(t.slice(1, 3), 16),
      parseInt(t.slice(3, 5), 16),
      parseInt(t.slice(5, 7), 16),
    ]),
  Ct = (t, a, e) => [t[0] + (a[0] - t[0]) * e, t[1] + (a[1] - t[1]) * e, t[2] + (a[2] - t[2]) * e],
  Rt = (t, a = 0, e = 1) => (t < a ? a : t > e ? e : t),
  Pt = (t, a, e) => {
    const o = Math.floor(t),
      n = Math.floor(a),
      l = t - o,
      s = a - n,
      c = l * l * (3 - 2 * l),
      i = s * s * (3 - 2 * s),
      f = r(o + 17 * e, n),
      h = r(o + 1 + 17 * e, n),
      d = r(o + 17 * e, n + 1);
    return f + (h - f) * c + (d - f) * i + (f - h - d + r(o + 1 + 17 * e, n + 1)) * c * i;
  },
  It = (t, a, e) =>
    0.55 * Pt(t, a, e) + 0.3 * Pt(2.1 * t, 2.1 * a, e + 3) + 0.15 * Pt(4.3 * t, 4.3 * a, e + 7),
  Ot = {};
function Lt() {
  const t = vt,
    a = kt,
    e = new Uint8ClampedArray(t * a * 4),
    o = { W: t, H: a, d: e },
    n = (t) => ("string" == typeof t ? St(t) : t),
    l = (o, r, n, l) => {
      if (((r |= 0), (o |= 0) < 0 || r < 0 || o >= t || r >= a)) return;
      const s = 4 * (r * t + o);
      if (void 0 === l || l >= 1)
        return ((e[s] = n[0]), (e[s + 1] = n[1]), (e[s + 2] = n[2]), void (e[s + 3] = 255));
      if (l <= 0) return;
      const c = e[s + 3] / 255;
      if (c > 0.999)
        ((e[s] += (n[0] - e[s]) * l),
          (e[s + 1] += (n[1] - e[s + 1]) * l),
          (e[s + 2] += (n[2] - e[s + 2]) * l));
      else {
        const t = l + c * (1 - l);
        ((e[s] = (n[0] * l + e[s] * c * (1 - l)) / t),
          (e[s + 1] = (n[1] * l + e[s + 1] * c * (1 - l)) / t),
          (e[s + 2] = (n[2] * l + e[s + 2] * c * (1 - l)) / t),
          (e[s + 3] = 255 * t));
      }
    },
    s = (o, r, n, l) => {
      if (((r |= 0), (o |= 0) < 0 || r < 0 || o >= t || r >= a)) return;
      const s = 4 * (r * t + o);
      ((e[s] += n[0] * l), (e[s + 1] += n[1] * l), (e[s + 2] += n[2] * l));
    },
    c = (o, r) => {
      if (((r |= 0), (o |= 0) < 0 || r < 0 || o >= t || r >= a)) return [0, 0, 0];
      const n = 4 * (r * t + o);
      return [e[n], e[n + 1], e[n + 2]];
    },
    i = (t, a, e) => {
      4 === e.length ? l(t, a, e, e[3]) : l(t, a, e);
    };
  return (
    Object.assign(o, { px: l, add: s, get: c, col: n }),
    (o.rect = (t, a, e, o, r, s) => {
      r = n(r);
      for (let n = 0; n < o; n++) for (let o = 0; o < e; o++) l(t + o, a + n, r, s);
    }),
    (o.grad = (a, e, o, r = 0, n = t, s = 0.55) => {
      const c = o.length - 1,
        i = o.map(St);
      for (let t = a; t < e; t++) {
        const o = ((t - a) / Math.max(1, e - a - 1)) * c,
          f = Math.min(c - 1, 0 | o),
          h = Rt((o - f - (0.5 - s / 2)) / s);
        for (let a = r; a < n; a++) l(a, t, h > Et(a, t) ? i[f + 1] : i[f]);
      }
    }),
    (o.poly = (t, a) => {
      let e = 1e9,
        o = -1e9;
      for (const a of t) ((e = Math.min(e, a[1])), (o = Math.max(o, a[1])));
      ((e = Math.max(0, Math.floor(e))), (o = Math.min(215, Math.ceil(o))));
      const r = "function" == typeof a,
        l = r ? null : n(a);
      for (let n = e; n <= o; n++) {
        const e = n + 0.5,
          o = [];
        for (let a = 0; a < t.length; a++) {
          const r = t[a],
            n = t[(a + 1) % t.length];
          ((r[1] <= e && n[1] > e) || (n[1] <= e && r[1] > e)) &&
            o.push(r[0] + ((e - r[1]) / (n[1] - r[1])) * (n[0] - r[0]));
        }
        o.sort((t, a) => t - a);
        for (let t = 0; t + 1 < o.length; t += 2)
          for (let e = Math.ceil(o[t] - 0.5); e < o[t + 1] - 0.5; e++) {
            const t = r ? a(e, n) : l;
            t && i(e, n, t);
          }
      }
    }),
    (o.disc = (t, a, e, o) => {
      const r = "function" == typeof o ? null : n(o);
      for (let n = -e; n <= e; n++)
        for (let l = -e; l <= e; l++)
          if (l * l + n * n <= e * e + 0.4 * e) {
            const e = r || o(l, n);
            e && i(t + l, a + n, e);
          }
    }),
    (o.line = (t, a, e, o, r, s) => {
      ((r = n(r)), (t |= 0), (a |= 0), (e |= 0), (o |= 0));
      const c = Math.abs(e - t),
        i = Math.abs(o - a),
        f = t < e ? 1 : -1,
        h = a < o ? 1 : -1;
      let d = c - i;
      for (let n = 0; n < 2e3 && (l(t, a, r, s), t !== e || a !== o); n++) {
        const e = 2 * d;
        (e > -i && ((d -= i), (t += f)), e < c && ((d += c), (a += h)));
      }
    }),
    (o.sag = (t, a, e, r, n, l, s) => {
      let c = t,
        i = a;
      for (let f = 1; f <= 28; f++) {
        const h = f / 28,
          d = t + (e - t) * h,
          b = a + (r - a) * h + Math.sin(h * Math.PI) * n;
        (o.line(c, i, d, b, l, s), (c = d), (i = b));
      }
    }),
    (o.light = (t, a, e, o, r = 1, l = 1) => {
      o = n(o);
      const c = Math.ceil(e * l);
      for (let n = -c; n <= c; n++)
        for (let c = -e; c <= e; c++) {
          const i = Math.hypot(c / e, n / (e * l));
          if (i >= 1) continue;
          const f = 5 * Math.pow(1 - i, 1.7) * r,
            h = Math.floor(f) + (f % 1 > Et(t + c, a + n) ? 1 : 0);
          h > 0 && s(t + c, a + n, o, 0.065 * h);
        }
    }),
    (o.fog = (t, a, e, o, r, s, c, i = 24, f = 7, h = 0.45) => {
      r = n(r);
      for (let n = a; n < o; n++) {
        const d = Math.sin(((n - a) / (o - a)) * Math.PI);
        for (let a = t; a < e; a++)
          It(a / i, n / f, c) * d * s * 1.7 > 0.8 * Et(a, n) + 0.18 && l(a, n, r, h);
      }
    }),
    (o.clouds = (a, e, o, r, s, c = 1, i = 46, f = 6, h = 0.6) => {
      ((o = n(o)), (r = n(r)));
      for (let n = a; n < e; n++) {
        const d = Math.sin(((n - a) / (e - a)) * Math.PI);
        for (let a = 0; a < t; a++) {
          const t = It(a / i, n / f, s);
          t * d * 1.9 * c > 0.5 + 0.16 * (Et(a, n) - 0.5) &&
            l(a, n, It(a / i, (n + 3) / f, s) > t ? r : o, h);
        }
      }
    }),
    (o.speck = (t, a, e, o, s, c, i, f) => {
      s = n(s);
      for (let n = 0; n < c; n++) l(t + r(n, i) * e, a + r(n, i + 5) * o, s, f);
    }),
    (o.stars = (a, e, o = 3) => {
      for (let n = 0; n < e; n++) {
        const e = r(n, o) * t,
          s = Math.pow(r(n, o + 9), 1.4) * a;
        (l(
          e,
          s,
          n % 4 == 0 ? [255, 210, 240] : n % 4 == 1 ? [190, 230, 255] : [255, 255, 255],
          0.35 + 0.65 * r(n, o + 5),
        ),
          n % 17 == 0 &&
            (l(e - 1, s, [255, 255, 255], 0.35),
            l(e + 1, s, [255, 255, 255], 0.35),
            l(e, s - 1, [255, 255, 255], 0.35),
            l(e, s + 1, [255, 255, 255], 0.35)));
      }
    }),
    (o.moon = (t, a, e, l, s, c, i = 5) => {
      ((l = n(l)), (s = n(s)), (c = n(c)));
      const f = [];
      for (let t = 0; t < 8; t++) {
        const a = 6.28 * r(i, t),
          o = r(i, t + 9) * e * 0.66;
        f.push([Math.cos(a) * o, Math.sin(a) * o, 2 + r(i, t + 3) * e * 0.2]);
      }
      o.disc(t, a, e, (o, r) => {
        const n = (0.62 * -o - 0.5 * r) / e + 0.3 * (Et(t + o, a + r) - 0.5);
        let i = n > 0.3 ? l : n > -0.25 ? s : c;
        for (const t of f) {
          const a = o - t[0],
            e = r - t[1],
            n = Math.hypot(a, e);
          if (n < t[2]) {
            i = Ct(i, 0.6 * a + 0.5 * e > 0 && n > t[2] - 1.4 ? l : c, 0.5);
            break;
          }
        }
        return i;
      });
    }),
    (o.sky = (a) => {
      const {
          seed: e,
          base: n,
          x0: s = 0,
          x1: c = t,
          w0: i = 14,
          w1: f = 40,
          h0: h = 40,
          h1: d = 100,
          dark: b,
          mid: g,
          lite: p,
          rim: u,
          fog: m,
          fogAmt: y = 0,
          win: x,
          ruin: M = 0,
          detail: w = 0,
          gap: v = 0,
          ldir: k = -1,
        } = a,
        A = St(b),
        E = St(g),
        T = St(p),
        S = St(u || p),
        C = m ? St(m) : null,
        R = [];
      let P = s,
        I = 0;
      for (; P < c;) {
        const t = (t) => r(7.7 * e + 3.13 * I, t + 1.7 * I),
          a = (i + t(1) * (f - i)) | 0,
          s = (h + Math.pow(t(2), 1.25) * (d - h)) | 0,
          c = n - s,
          b = t(3),
          g = t(5) < 0.5 ? 1 : -1,
          p = (o) =>
            M && b > 0.5
              ? c +
                Pt(0.33 * o, 3.1 * I, e) * M * (0.2 * s) +
                r(o, I + e) * M * 4 +
                (o > 0.55 * a ? 6 * M : 0)
              : b < 0.2
                ? c + (g > 0 ? o : a - o) * (8 / a)
                : b < 0.4
                  ? c + (o < 0.22 * a || o > 0.78 * a ? (8 + 8 * t(6)) | 0 : 0)
                  : c;
        R.push({ x: P, w: a, top: c, base: n, kind: b });
        for (let t = 0; t < a; t++) {
          const e = Math.floor(p(t)),
            o = P + t;
          for (let r = e; r < n; r++) {
            const s = (r - e) / Math.max(1, n - e),
              c = k < 0 ? t < 1 : t >= a - 1,
              i = k < 0 ? t >= a - 2 : t < 2;
            let f;
            if (r === e) f = T;
            else if (c) f = S;
            else if (i) f = A;
            else {
              const t = 1.6 * s + 0.5 * (Et(o, r) - 0.5);
              f = t < 0.5 ? E : t < 1 ? Ct(E, A, 0.55) : A;
            }
            if (w && !c && !i && r > e) {
              const a = (r - e) % 12;
              (0 === a ? (f = Ct(f, T, 0.25)) : 1 === a && (f = Ct(f, A, 0.35)),
                t > 2 && t % 9 == 0 && (f = Ct(f, A, 0.25)));
            }
            (C &&
              y * (0.35 + 0.65 * Rt((r - (n - 60)) / 60)) > 0.95 * Et(o, r) &&
              (f = Ct(f, C, 0.55)),
              l(o, r, f));
          }
        }
        if (x) {
          const t = x.cw || 4,
            o = x.ch || 6;
          for (let s = c + 8; s < n - 6; s += o)
            for (let o = P + 4; o < P + a - 5; o += t) {
              if (s < p(o - P) + 4) continue;
              const t = Pt(o / 9, s / 11, e + I),
                a = r(1.7 * o + I, 0.9 * s + e);
              if (t > 1 - 1.5 * x.p && a < 0.78) {
                const t = St(x.cols[(r(o, s + I) * x.cols.length) | 0]);
                (l(o, s, t),
                  l(o + 1, s, t),
                  l(o, s + 1, t),
                  l(o + 1, s + 1, Ct(t, [0, 0, 0], 0.18)),
                  a < 0.12 && l(o, s - 1, Ct(t, [255, 255, 255], 0.4), 0.9));
              } else a < 0.18 && l(o, s, Ct(A, [0, 0, 0], 0.4), 0.8);
            }
        }
        const u = t(7),
          m = (P + 0.3 * a + t(8) * a * 0.4) | 0,
          O = Math.floor(p(m - P));
        if (u < 0.22) {
          const a = (10 + 22 * t(9)) | 0;
          (o.line(m, O, m, O - a, A), l(m, O - a - 1, [255, 70, 70], 0.9));
        } else
          u < 0.34
            ? (o.rect(m - 4, O - 6, 9, 6, A),
              o.rect(m - 3, O - 10, 7, 4, Ct(A, T, 0.2)),
              l(m - 3, O - 11, T))
            : u < 0.46 && !M && (o.rect(m - 6, O - 12, 13, 8, A), l(m - 6, O - 12, T));
        ((P += a + ((t(10) * v) | 0)), I++);
      }
      return (a.id && (Ot[a.id] = R), R);
    }),
    (o.reflect = (a, e, o, r, s = 0.8, i = 1.4) => {
      r = n(r);
      for (let n = a; n < e; n++) {
        const f = n - a,
          h = a - 1 - f * s;
        if (h < 0) break;
        const d = o * (1 - f / (e - a));
        for (let a = 0; a < t; a++) {
          if (d <= 0.9 * Et(a, n)) continue;
          const t = a + Math.round(Math.sin(1.3 * n + 0.05 * a) * i);
          l(a, n, Ct(c(t, h), r, 0.35), 0.9);
        }
      }
    }),
    (o.vig = (e = 0.5, o = t / 2, r = 108) => {
      for (let n = 0; n < a; n++)
        for (let a = 0; a < t; a++) {
          const s = Math.hypot((a - o) / (0.62 * t), (n - r) / 133.92),
            c = Rt(1.4 * (s - 0.55)) * e * 4,
            i = Math.floor(c) + (c % 1 > Et(a, n) ? 1 : 0);
          i > 0 && l(a, n, [0, 0, 0], Math.min(0.85, 0.16 * i));
        }
    }),
    o
  );
}
function Ht(t) {
  const a = ft;
  (a.save(), a.setTransform(1, 0, 0, 1, 0, 0));
  const e = Lt();
  (t(e), a.putImageData(new ImageData(e.d, vt, kt), 0, 0), a.restore());
}
const Nt = [3, 4, 6, 8, 11, 15, 20, 27, 36, 48, 64, 90, 128],
  Dt = {},
  Gt = (t, a, e, o, r) => {
    if (r <= 0) return;
    let n = Nt[0];
    for (const t of Nt) Math.abs(t - e) < Math.abs(n - e) && (n = t);
    const l = o + "|" + n;
    let s = Dt[l];
    if (!s) {
      const t = 2 * n,
        a = document.createElement("canvas");
      a.width = a.height = 2 * t;
      const e = a.getContext("2d"),
        r = e.createImageData(2 * t, 2 * t),
        c = r.data,
        i = o.split(",").map(Number);
      for (let a = 0; a < 2 * t; a++)
        for (let e = 0; e < 2 * t; e++) {
          const o = Math.hypot(e - t + 0.5, a - t + 0.5) / t;
          if (o >= 1) continue;
          const r = 5 * Math.pow(1 - o, 1.6),
            n = Math.floor(r) + (r % 1 > Et(e, a) ? 1 : 0);
          if (n <= 0) continue;
          const l = 4 * (a * t * 2 + e);
          ((c[l] = i[0]), (c[l + 1] = i[1]), (c[l + 2] = i[2]), (c[l + 3] = Math.min(255, 51 * n)));
        }
      (e.putImageData(r, 0, 0), (s = Dt[l] = a));
    }
    (ft.save(),
      (ft.globalAlpha = Math.max(0, Math.min(1, r))),
      (ft.globalCompositeOperation = "lighter"),
      ft.drawImage(s, Math.round(2 * (t - e)) / 2, Math.round(2 * (a - e)) / 2, 2 * e, 2 * e),
      ft.restore());
  },
  Bt = {},
  Ft = (t, a, e, o = 0.4) => {
    const r = Math.max(3, (2 * e) | 0),
      n = Math.max(2, (0.4 * r) | 0);
    let l = Bt[r];
    if (!l) {
      ((l = document.createElement("canvas")), (l.width = 2 * r), (l.height = n));
      const t = l.getContext("2d"),
        a = t.createImageData(2 * r, n),
        e = a.data;
      for (let t = 0; t < n; t++)
        for (let a = 0; a < 2 * r; a++) {
          const o = Math.hypot((a - r + 0.5) / r, (t - n / 2 + 0.5) / (n / 2));
          if (o >= 1) continue;
          const l = 3.2 * (1 - o),
            s = Math.floor(l) + (l % 1 > Et(a, t) ? 1 : 0);
          s > 0 && (e[4 * (t * r * 2 + a) + 3] = Math.min(255, 85 * s));
        }
      (t.putImageData(a, 0, 0), (Bt[r] = l));
    }
    (ft.save(),
      (ft.globalAlpha = Math.min(1, 1.7 * o)),
      ft.drawImage(l, t - r / 2, a - n / 4, r, n / 2),
      ft.restore());
  };
let Wt = null;
function zt() {
  if (!Wt) {
    ((Wt = document.createElement("canvas")), (Wt.width = vt), (Wt.height = kt));
    const t = Wt.getContext("2d"),
      a = t.createImageData(vt, kt),
      e = a.data;
    for (let t = 0; t < kt; t++)
      for (let a = 0; a < vt; a++) {
        const o = Math.hypot((a - 192) / (0.6 * vt), (t - 108) / 133.92),
          r = 4 * Math.max(0, 1.5 * (o - 0.55)),
          n = Math.min(4, Math.floor(r) + (r % 1 > Et(a, t) ? 1 : 0));
        n > 0 && (e[4 * (t * vt + a) + 3] = 54 * n);
      }
    t.putImageData(a, 0, 0);
  }
  return Wt;
}
let qt,
  Yt = "",
  Ut = 0,
  Vt = 0,
  jt = 1,
  Jt = 1,
  Xt = 0,
  Qt = 0,
  Kt = null,
  Zt = "",
  $t = "You";
