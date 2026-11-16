const so = {
    body: "@@DATAURI:png:boss-snake-body.png@@",
    head: "@@DATAURI:png:boss-snake-head.png@@",
    m: {
      w: 304,
      h: 150,
      head: { x: 0, y: 2, w: 71, h: 57 },
      pivot: [66, 22],
      mouth: [10, 34],
      eye: [26, 18],
      hc: [27, 26],
      sparks: [
        [126, 43],
        [111, 124],
        [284, 55],
      ],
    },
  },
  co = 0.4;
let io = null;
function fo() {
  if (io) return io;
  const t = new Image(),
    a = new Image();
  io = { b: t, h: a, mask: null, white: null };
  const e = () => {
    if (!t.complete || !a.complete || !t.naturalWidth || !a.naturalWidth || io.mask) return;
    const e = so.m,
      o = document.createElement("canvas");
    ((o.width = e.w), (o.height = e.h));
    const r = o.getContext("2d");
    (r.drawImage(t, 0, 0), r.drawImage(a, e.head.x, e.head.y));
    const n = r.getImageData(0, 0, e.w, e.h).data,
      l = new Uint8Array(e.w * e.h);
    for (let t = 0; t < l.length; t++) l[t] = n[4 * t + 3] > 100 ? 1 : 0;
    const s = (t) => {
      const a = document.createElement("canvas");
      ((a.width = t.naturalWidth), (a.height = t.naturalHeight));
      const e = a.getContext("2d");
      return (
        e.drawImage(t, 0, 0),
        (e.globalCompositeOperation = "source-atop"),
        (e.fillStyle = "#fff"),
        e.fillRect(0, 0, a.width, a.height),
        a
      );
    };
    ((io.white = { b: s(t), h: s(a) }), (io.mask = l));
  };
  return ((t.onload = e), (a.onload = e), (t.src = so.body), (a.src = so.head), io);
}
function snakePose(t) {
  const a = so.m,
    e = (function (t) {
      const a = t.t,
        e = t.st;
      let o = 0,
        r = 0,
        n = 0,
        l = 0;
      if ("intro" === e) {
        const t = Math.min(1, a / (cine ? 150 : 100));
        ((l = 80 * (1 - t)), (o = 0.12 * Math.sin(a / 7) * (1 - t)));
      } else if ("slam" === e)
        if (a < 46) {
          const t = a / 46;
          ((o = 0.3 * t), (n = -6 * t));
        } else if (a < 54) {
          const t = (a - 46) / 8;
          ((o = 0.3 - 0.68 * t), (n = 14 * t - 6));
        } else {
          const t = Math.min(1, (a - 54) / 26);
          ((o = -0.38 * (1 - t)), (n = 8 * (1 - t)));
        }
      else if ("throw" === e)
        ((o = 0.1 * Math.min(1, a / 20)),
          [30, 44, 58].forEach((t) => {
            a >= t && a < t + 7 && ((o = -0.06), (r = -8 * Math.sin(((a - t) / 7) * Math.PI)));
          }));
      else if ("charge" === e)
        a < 40 ? ((o = -0.1), (r = a % 4 < 2 ? 1 : -1)) : ((o = -0.14), (r = -3));
      else if ("stun" === e) o = 0.04 * Math.sin(tick / 6) - 0.3;
      else if ("dead" === e) {
        const t = Math.min(1, a / 120);
        ((o = -0.45 * t), (l = 22 * t));
      } else if ("walk" === e)
        ((o = 0.05 * Math.sin(tick / 8)), (n = 1.4 * Math.sin(tick / 8 + 1.2)));
      else "tail" === e ? (l = cine ? cine.sink : 22) : (o = 0.035 * Math.sin(tick / 30));
      if ("walk" === e || "throw" === e || "charge" === e)
        o += 0.12 * Math.max(0, Math.min(1, (floorY() - player.y) / 50));
      const fl = (t.flash || 0) / 6;
      ((o += 0.14 * fl), (n -= 4 * fl), (r += 3 * fl));
      return {
        hr: o,
        hdx: r,
        hdy: n,
        sink: l,
        br: "walk" === e ? 4 * Math.sin(tick / 8) : Math.sin(tick / 24),
      };
    })(t),
    o = t.face > 0 ? -1 : 1,
    r = a.w / 2,
    n = floorY() + 1 + e.sink,
    l = (t, o) => {
      const r = t - a.pivot[0],
        n = o - a.pivot[1],
        l = Math.cos(e.hr),
        s = Math.sin(e.hr);
      return [a.pivot[0] + r * l - n * s + e.hdx, a.pivot[1] + r * s + n * l + e.hdy];
    },
    s = (e, l) => ({ x: t.x + o * (e - r) * co, y: n + (l - a.h) * co });
  return {
    b: t,
    p: e,
    mir: o,
    cx: r,
    by: n,
    W: s,
    mouth: s(...l(...a.mouth)),
    tip: s(...l(a.mouth[0] - 20, a.mouth[1])),
    eye: s(...l(...a.eye)),
    head: s(...l(...a.hc)),
    f: -o,
  };
}
const bo = (t) => t.x + 46 * (t.face > 0 ? 1 : -1);
function snakeHit(t, a, e) {
  const o = fo(),
    r = so.m;
  if (!o.mask) return Math.abs(t - e.x) < 48 && a > floorY() - 50;
  const n = snakePose(e),
    l = n.cx + (t - e.x) / (n.mir * co),
    s = r.h + (a - n.by) / co,
    c = (t, a) => (
      (a |= 0),
      (t |= 0) >= 0 && a >= 0 && t < r.w && a < r.h && 1 === o.mask[a * r.w + t]
    ),
    i = (t, a) => t >= r.head.x && t < r.pivot[0] + 4 && a >= r.head.y && a < r.head.y + r.head.h,
    f = l - r.pivot[0] - n.p.hdx,
    h = s - r.pivot[1] - n.p.hdy,
    d = Math.cos(-n.p.hr),
    b = Math.sin(-n.p.hr),
    g = r.pivot[0] + f * d - h * b,
    p = r.pivot[1] + f * b + h * d;
  return !(!i(g, p) || !c(g, p)) || (!i(l, s) && c(l, s));
}
let po = null,
  uo = null,
  yo = null;
function drawSnake(t, a) {
  const e = fo(),
    o = so.m,
    n = snakePose(t),
    l = n.p,
    s = floorY();
  return e.mask
    ? (ctx.save(),
      (ctx.globalAlpha = a),
      (ctx.imageSmoothingEnabled = !1),
      ("intro" !== t.st && "dead" !== t.st) ||
        (ctx.beginPath(), ctx.rect(-400, -400, roomW() + 800, s + 1.5 + 400), ctx.clip()),
      "tail" === t.st &&
        (ctx.beginPath(), ctx.rect(t.x + 19, -400, 400, s + 1.5 + 400), ctx.clip()),
      ctx.translate(t.x, n.by),
      ctx.scale(n.mir * co, co * (1 + 0.012 * l.br)),
      ctx.translate(-n.cx, -o.h),
      ctx.drawImage(
        (function (t, a) {
          const e = io,
            o = so.m,
            r = t.p;
          po ||
            ((po = document.createElement("canvas")),
            (po.width = o.w),
            (po.height = o.h),
            (uo = document.createElement("canvas")),
            (uo.width = o.w),
            (uo.height = o.h));
          const n = po.getContext("2d"),
            l = uo.getContext("2d"),
            s = (function (t) {
              const a = t.st,
                e = t.t,
                o = tick;
              let r = 1.4,
                n = 1.1,
                l = 0.055,
                s = 0,
                c = 0,
                i = 0;
              if ("walk" === a) ((r = 4), (n = 2.6), (l = 0.2));
              else if ("intro" === a) {
                const t = Math.min(1, e / (cine ? 150 : 100));
                ((r = 1.6 + 3.4 * (1 - t)), (n = 1.2 + 3 * (1 - t)), (l = 0.16));
              } else if ("slam" === a)
                if (e < 46) ((s = (0.07 * e) / 46), (i = (-4 * e) / 46), (r = 1));
                else {
                  const t = Math.max(0, 1 - (e - 46) / 22);
                  ((s = -0.09 * t), (i = 3 * t), (r = 2.6));
                }
              else if ("throw" === a)
                ((r = 1.6),
                  (l = 0.08),
                  (s = [30, 44, 58].some((t) => e >= t && e < t + 7) ? -0.03 : 0.02));
              else if ("charge" === a)
                e < 40
                  ? ((s = 0.05), (r = 1 + 0.5 * Math.sin(e)))
                  : ((s = -0.08), (r = 2.8), (l = 0.24));
              else if ("stun" === a) ((r = 0.7), (n = 0.9), (l = 0.025));
              else if ("tail" === a)
                ((r = 2 + (cine ? cine.tw : 0)),
                  (n = 1.6 + 0.6 * (cine ? cine.tw : 0)),
                  (l = 0.1 + 0.04 * (cine ? cine.tw : 0)));
              else if ("dead" === a) {
                const t = Math.min(1, e / 120);
                ((r = 0.5 * (1 - t)), (n = 0.4 * (1 - t)), (c = t));
              }
              return (t, a, e) => {
                const f = Math.max(0, 1 - a / (0.86 * e)),
                  h = f * f,
                  d = t > 210 && a < 90 ? 1.7 : 1,
                  b =
                    r * f * Math.sin(0.045 * t - o * l) * d +
                    i * h +
                    c * h * 22 +
                    Math.sin(0.05 * o) * h * 0.8,
                  g = n * f * Math.sin(0.07 * a - o * l * 0.8 + 0.012 * t) * d + s * (e - a) * f;
                return [Math.round(g), Math.round(b)];
              };
            })(t.b),
            c = s(o.pivot[0], o.pivot[1], o.h);
          if (
            ((l.imageSmoothingEnabled = !1),
            l.clearRect(0, 0, o.w, o.h),
            ((t) => {
              (!(function (t, a, e, o, r) {
                for (let n = 0; n < r; n += 6)
                  for (let l = 0; l < o; l += 6) {
                    const s = e(l + 3, n + 3, r),
                      c = Math.min(7, o - l),
                      i = Math.min(7, r - n);
                    t.drawImage(a, l, n, c, i, l + s[0], n + s[1], c, i);
                  }
              })(t, e.b, s, o.w, o.h),
                t.save(),
                t.translate(o.pivot[0] + r.hdx + c[0], o.pivot[1] + r.hdy + c[1]),
                t.rotate(r.hr),
                t.drawImage(e.h, o.head.x - o.pivot[0], o.head.y - o.pivot[1]),
                t.restore());
            })(l),
            (n.imageSmoothingEnabled = !1),
            (n.globalCompositeOperation = "source-over"),
            n.clearRect(0, 0, o.w, o.h),
            n.drawImage(uo, 0, 0),
            (n.globalCompositeOperation = "multiply"),
            (n.fillStyle = "#d4e4da"),
            n.fillRect(0, 0, o.w, o.h),
            (n.globalCompositeOperation = "destination-in"),
            n.drawImage(uo, 0, 0),
            (n.globalCompositeOperation = "source-atop"),
            !yo)
          ) {
            const t = n.createLinearGradient(0, 0.3 * o.h, 0, o.h);
            (t.addColorStop(0, "rgba(2,12,8,0)"), t.addColorStop(1, "rgba(2,12,8,.34)"));
            const a = n.createLinearGradient(0, 0, 0, 0.55 * o.h);
            (a.addColorStop(0, "rgba(200,255,220,.16)"),
              a.addColorStop(1, "rgba(190,255,210,0)"),
              (yo = { lo: t, hi: a }));
          }
          return (
            (n.fillStyle = "rgba(70,170,120,.07)"),
            n.fillRect(0, 0, o.w, o.h),
            (n.fillStyle = yo.lo),
            n.fillRect(0, 0, o.w, o.h),
            (n.fillStyle = yo.hi),
            n.fillRect(0, 0, o.w, o.h),
            a && ((n.fillStyle = "rgba(255,255,255," + a + ")"), n.fillRect(0, 0, o.w, o.h)),
            (n.globalCompositeOperation = "source-over"),
            po
          );
        })(n, t.flash > 0 ? (0.6 * t.flash) / 6 : 0),
        0,
        0,
      ),
      ctx.restore(),
      snakeFace(t, n, a),
      "dead" !== t.st &&
        "tail" !== t.st &&
        o.sparks.forEach((t, e) => {
          const o = n.W(t[0], t[1]);
          if ((tick + 9 * e) % 29 < 6) {
            for (let t = 0; t < 6; t++)
              fill(
                t % 2 ? "#bfe8ff" : "#ffffff",
                o.x + 6 * (r(t, tick + e) - 0.5),
                o.y + 5 * (r(t + 5, tick + e) - 0.5),
                0.5,
                0.5,
              );
            glow(o.x, o.y, 7, "150,210,255", 0.7 * a);
          }
        }),
      n)
    : n;
}
/* tongue flicks, eye glow and blinks, drawn on top of the warped sprite in room space */
function snakeFace(t, n, al) {
  const st = t.st,
    k = tick + 37;
  if ("dead" === st || "tail" === st) return;
  const e = n.eye,
    angry = ("charge" === st && t.t < 40) || ("throw" === st && t.t < 30);
  glow(e.x, e.y, angry ? 7 : 4 + Math.sin(tick / 9), "255,70,40", (angry ? 0.8 : 0.4) * al);
  k % 230 < 7 && "stun" !== st && fill("#1c2a1e", e.x - 1.8, e.y - 1.4, 3.6, 2.8);
  let ext = 0;
  if ("stun" === st) ext = 0.55;
  else if (angry) ext = 0.75 + 0.25 * Math.sin(tick / 1.6);
  else {
    const u = k % ("walk" === st ? 110 : 150);
    u < 24 && (ext = Math.abs(Math.sin((u / 24) * 2 * Math.PI)));
  }
  if (ext < 0.08 || "intro" === st) return;
  const m = n.mouth,
    dx = n.tip.x - m.x,
    dy = n.tip.y - m.y,
    d = Math.hypot(dx, dy) || 1,
    ux = dx / d,
    uy = dy / d + ("stun" === st ? 0.6 : 0),
    L = 8 * ext,
    w = "stun" === st ? 0 : Math.sin(tick / 1.3) * 0.8,
    x1 = m.x + ux * L,
    y1 = m.y + uy * L + w;
  ((ctx.globalAlpha = al),
    (ctx.lineCap = "round"),
    (ctx.strokeStyle = "#8a1424"),
    (ctx.lineWidth = 1.1),
    ctx.beginPath(),
    ctx.moveTo(m.x, m.y),
    ctx.quadraticCurveTo(m.x + ux * L * 0.5, m.y + uy * L * 0.5 - w, x1, y1),
    ctx.lineTo(x1 + ux * 2.4 - uy * 1.3, y1 + uy * 2.4 + ux * 1.3),
    ctx.moveTo(x1, y1),
    ctx.lineTo(x1 + ux * 2.4 + uy * 1.3, y1 + uy * 2.4 - ux * 1.3),
    ctx.stroke(),
    (ctx.strokeStyle = "#ff5a6a"),
    (ctx.lineWidth = 0.4),
    ctx.beginPath(),
    ctx.moveTo(m.x, m.y - 0.2),
    ctx.lineTo(x1, y1 - 0.2),
    ctx.stroke(),
    (ctx.lineCap = "butt"),
    (ctx.globalAlpha = 1));
}
function Mo(t, a, e, o) {
  const r = floorY(),
    n = 0.5 + 0.5 * Math.sin(tick / (e > 0.6 ? 1.6 : 3.5)),
    l = 0.35 + 0.55 * e,
    s = 0.3 * a;
  ctx.globalAlpha = l * (0.1 + 0.08 * n);
  for (let e = 0; e < 8; e++) fill("#ff2020", t - 0.55 * a + e * a * 0.14, r - 26, 0.12 * a, 26);
  ctx.globalAlpha = l * (0.4 + 0.25 * n);
  for (let e = -s; e <= s; e += 0.5) {
    const o = a * Math.sqrt(Math.max(0, 1 - (e * e) / (s * s)));
    fill(
      "#ff2020",
      Math.round(2 * (t - o)) / 2,
      Math.round(2 * (r + e)) / 2,
      Math.round(4 * o) / 2,
      0.5,
    );
  }
  ctx.globalAlpha = l * (0.7 + 0.3 * n);
  for (let e = 0; e < 40; e++) {
    const o = (e / 40) * 6.283;
    fill(
      "#ff4a4a",
      Math.round(2 * (t + Math.cos(o) * a)) / 2,
      Math.round(2 * (r + Math.sin(o) * s)) / 2,
      1,
      1,
    );
  }
  const c = a * (1.6 - 0.6 * e);
  ctx.globalAlpha = 0.5 * l;
  for (let a = 0; a < 28; a++) {
    const e = (a / 28) * 6.283 + tick / 20;
    a % 2 &&
      fill(
        "#ff8080",
        Math.round(2 * (t + Math.cos(e) * c)) / 2,
        Math.round(2 * (r + Math.sin(e) * c * 0.3)) / 2,
        0.5,
        0.5,
      );
  }
  ((ctx.globalAlpha = l),
    fill("#ff3a3a", t - a - 3, r - 0.25, 2, 0.5),
    fill("#ff3a3a", t + a + 1, r - 0.25, 2, 0.5),
    o &&
      n > 0.35 &&
      (fill("#2a0000", t - 1.5, r - s - 13, 3, 9),
      fill("#ff4040", t - 1, r - s - 12.5, 2, 5),
      fill("#ff4040", t - 1, r - s - 6.5, 2, 2)),
    (ctx.globalAlpha = 1),
    glow(t, r, a + 4, "255,40,40", 0.18 * l));
}
const wo = {
  pod: { d: [34, 78, 150], bf: 1 },
  lab: { d: [20, 120, 176], lamp: [60, 132] },
  store: { d: [60, 140], lamp: [96] },
  med: { d: [44, 110, 170], lamp: [70, 150] },
  cafe: { d: [30, 96, 160], bf: 1, lamp: [80] },
  exitlab: { d: [40, 150, 250, 330, 420], bf: 1 },
  hall: { d: [120, 200], lamp: [75] },
  ware: { d: [20, 118, 214, 310], lamp: [58, 138, 198, 278] },
};
function vo(t, a, e) {
  const o = 2 * Math.sin(tick / 8);
  t += o * e;
  const r = (o, r) => {
    (fill(o, t - 8 * e - (e > 0 ? r : -r) - 0 + (e > 0 ? 0 : -0), a - 1 - r, 0, 0),
      fill(o, e > 0 ? t - 8 - r : t - r, a - 1 - r, 8 + 2 * r, 3 + 2 * r));
    for (let n = 0; n < 5; n++) {
      const l = 2 * (5 - n) - 1 + 2 * r;
      fill(
        o,
        e > 0 ? t + n - r * (0 == n ? 1 : 0) : t - n - 1 + (0 == n ? r : 0),
        a - (l - 1) / 2,
        1 + (0 == n ? r : 0),
        l,
      );
    }
  };
  (r("#04100a", 1), r("#ffe070", 0));
}
