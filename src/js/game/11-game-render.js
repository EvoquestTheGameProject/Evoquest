function render() {
  ((ctx = o),
    ctx.setTransform(1, 0, 0, 1, 0, 0),
    (ctx.imageSmoothingEnabled = !1),
    (ctx.fillStyle = "#000"),
    ctx.fillRect(0, 0, 384, 216),
    ctx.save(),
    ctx.scale(2, 2),
    shake > 0 && ctx.translate(2 * (Math.random() - 0.5), 2 * (Math.random() - 0.5)));
  (document.body.classList.toggle("cine", !!cine), cine && cine.d && $dCam());
  const t = performance.now();
  backdrops[room] || backdrop(room);
  const e = rooms[room];
  if (e.H) {
    const t = Math.max(0, Math.min(e.H - 108, player.y - 70));
    camY += 0.15 * (t - camY);
  } else camY = 0;
  if (e.W) {
    const t =
      cine && cine.d && null != cine.d.cx
        ? Math.max(0, Math.min(e.W - 192, cine.d.cx))
        : Math.max(0, Math.min(e.W - 192, player.x - (ch2 && ch2.sp ? 56 : 96)));
    ((camX += 0.12 * (t - camX)), Math.abs(t - camX) < 0.05 && (camX = t));
  } else camX = 0;
  if (
    (ctx.save(),
    ctx.translate(-Math.round(2 * camX) / 2, -Math.round(2 * camY) / 2),
    ctx.drawImage(backdrops[room], 0, 0, e.W || 192, e.H || 108),
    ctx.save(),
    ctx.translate(camX, 0),
    (function (t) {
      const a = Ne[room];
      if (!a) return;
      const e = rooms[room].H || 108;
      for (let o = 0; o < 26; o++) {
        const n =
            (192 * r(o, 51) + 8 * Math.sin(t / 2400 + o) + 0.002 * t * ((o % 3) - 1) * 6 + 384) %
            192,
          l = (r(o, 52) * e - 0.0035 * t * (1 + (o % 3)) + 4 * e) % e,
          s = 0.25 + 0.25 * Math.sin(t / 600 + 1.3 * o);
        fill(
          "rgba(" + a[0] + "," + Math.max(0, s) + ")",
          Math.round(2 * n) / 2,
          Math.round(2 * l) / 2,
          0.5,
          0.5,
        );
      }
      if (a[1])
        for (let a = 0; a < 7; a++) {
          const o = (192 * r(a, 61) + 14 * Math.sin(t / 1300 + 2 * a) + 192) % 192,
            n = r(a, 62) * e * 0.8 + 8 * Math.cos(t / 1700 + a),
            l = 0.35 + 0.45 * Math.sin(t / 300 + 1.9 * a);
          l > 0 &&
            (fill("rgba(200,255,140," + l + ")", o, n, 0.5, 0.5),
            glow(o, n, 3, "190,255,120", 0.35 * l));
        }
      if (
        (a[2] &&
          ((t / 4e3) | 0) % 3 == 0 &&
          t % 4e3 < 180 &&
          Math.sin(t / 23) > 0 &&
          ((ctx.fillStyle = "rgba(0,0,10,.18)"), ctx.fillRect(0, 0, 192, e)),
        ("exitlab" !== room && "cafe" !== room) ||
          ("exitlab" === room
            ? [
                [244 - camX, 71],
                [298 - camX, 71],
              ]
            : [
                [52, 17],
                [106, 17],
              ]
          ).forEach(([a, e], o) => {
            ((ctx.fillStyle = "rgba(220,255,190," + (0.05 + 0.02 * Math.sin(t / 1500 + o)) + ")"),
              ctx.beginPath(),
              ctx.moveTo(a, e),
              ctx.lineTo(a + 28, e),
              ctx.lineTo(a + 52, floorY()),
              ctx.lineTo(a + 14, floorY()),
              ctx.closePath(),
              ctx.fill());
          }),
        "stair" === room)
      )
        for (let a = 0; a < 6; a++) {
          const e = 1600 + 300 * a,
            o = ((t + 700 * a) % e) / e,
            n = 40 + 120 * r(a, 71),
            l = 200 * r(a, 72);
          fill("rgba(200,235,255," + 0.7 * (1 - o) + ")", n, l + o * o * 90, 0.5, 1.2);
        }
    })(t),
    ctx.restore(),
    (function (t) {
      const a = wo[room];
      if (!a) return;
      const e = floorY();
      ((a.lamp || []).forEach((a, o) => {
        const r = !((t + 1700 * o) % 5300 < 260 && ((t / 45) | 0) % 2);
        ((ctx.fillStyle = "rgba(220,240,255," + (r ? 0.045 : 0.012) + ")"),
          ctx.beginPath(),
          ctx.moveTo(a - 6, 12),
          ctx.lineTo(a + 6, 12),
          ctx.lineTo(a + 22, e),
          ctx.lineTo(a - 22, e),
          ctx.closePath(),
          ctx.fill(),
          r && glow(a, e + 1, 18, "220,240,255", 0.08));
      }),
        a.d.forEach((a, o) => {
          const r = 1300 + 370 * o,
            n = ((t + 600 * o) % r) / r;
          for (let t = -1; t <= 1; t += 0.5) {
            const o = 7 - 3 * Math.abs(t);
            fill(
              t < 0 ? "#4a6a78" : "#22323a",
              Math.round(2 * (a - o)) / 2,
              e + 3 + 0.5 * t,
              2 * o,
              0.5,
            );
          }
          if ((fill("rgba(220,240,255,.5)", a - 3, e + 2.5, 2, 0.5), n < 0.75)) {
            const t = n / 0.75;
            fill("rgba(200,230,255,.85)", a, 12 + (e + 2 - 12) * t * t, 0.5, 1.2);
          } else {
            const t = (n - 0.75) / 0.25;
            ctx.globalAlpha = 1 - t;
            for (let o = 0; o < 12; o++) {
              const r = (o / 12) * 6.283;
              fill(
                "#cfe8ff",
                Math.round(2 * (a + Math.cos(r) * t * 6)) / 2,
                Math.round(2 * (e + 3 + Math.sin(r) * t * 1.4)) / 2,
                0.5,
                0.5,
              );
            }
            ((ctx.globalAlpha = 1),
              t < 0.3 &&
                (fill("#cfe8ff", a - 1, e + 1 - 6 * t, 0.5, 0.5),
                fill("#cfe8ff", a + 1, e + 1 - 6 * t, 0.5, 0.5)));
          }
        }));
      const o = ((t + 1931 * room.length) % 1e4) / 1e4;
      if (o < 0.42) {
        const a = (o / 0.42) * 230 - 20,
          r = e + 5,
          n = ((t / 60) | 0) % 2;
        (fill("#14100c", a - 2, r - 1.5, 4, 1.5),
          fill("#3a2a1a", a - 1.5, r - 2, 3, 0.5),
          fill("#8aff6a", a + 1.5, r - 1.5, 0.5, 0.5),
          fill("#14100c", a - 2 + 0.5 * n, r, 0.5, 0.5),
          fill("#14100c", a + 0.5 * n, r, 0.5, 0.5),
          fill("#14100c", a + 1.5 - 0.5 * n, r, 0.5, 0.5),
          glow(a + 1.5, r - 1.5, 2, "120,255,100", 0.3));
      }
      if (a.bf)
        for (let a = 0; a < 2; a++) {
          const e = 40 + 90 * a + 30 * Math.sin(t / 900 + 2 * a),
            o = 40 + 12 * a + 6 * Math.sin(t / 300 + a),
            r = ((t / 80 + a) | 0) % 2,
            n = a ? "#ffb86a" : "#8ad8ff";
          (fill(n, e - (r ? 1.5 : 0.5), o, r ? 1.5 : 0.5, 1.5),
            fill(n, e + 0.5, o, r ? 1.5 : 0.5, 1.5),
            fill("#1a1020", e, o, 0.5, 1.5));
        }
    })(t),
    "pod" === room)
  ) {
    (za(t, 1), qa(t, 1), glow(96, 52, 70, "60,255,170", 0.16));
    for (let a = 0; a < 3; a++)
      rect("rgba(170,255,225,.8)", 92 + 6 * a, 28 + ((t / 22 + 37 * a) % 70), 0.6, 1.4);
    (Ua(t, "200,255,200"),
      (function () {
        const t = exitOpen ? 1 : erode > 200 ? Math.min(1, (erode - 200) / 60) : 0;
        if ((fill("#02080a", 149, 34, 38, 59), t > 0)) {
          for (let t = 0; t < 59; t += 2)
            fill(jt("#f4ffd8", "#6ad878", t / 59), 149, 34 + t, 38, 2);
          for (let t = 0; t < 5; t++)
            (fill("#2a8a46", 152 + 7 * t, 70 + (t % 2) * 4, 4, 23),
              fill("#1f6a38", 151 + 7 * t, 76, 6, 3));
          glow(168, 64, 60, "200,255,170", 0.5 * t);
        }
        const a = 19 * (1 - t);
        (a > 0.5 &&
          [149, 187 - a].forEach((t, e) => {
            (fill("#0a1410", t, 34, a, 59),
              fill("#3a4a44", t + 0.5, 34.5, a - 1, 58),
              fill("#6a7e74", t + 0.5, 34.5, a - 1, 1),
              fill("#243430", t + 0.5, 92, a - 1, 1),
              fill(e ? "#2a3a34" : "#6a7e74", e ? t + a - 1.5 : t + 0.5, 34.5, 1, 58),
              fill("#1a2622", t + 3, 40, Math.max(0, a - 6), 18),
              fill("#0c2a1c", t + 4, 41, Math.max(0, a - 8), 16),
              fill("#d8c040", t + (e ? 2 : a - 5), 66, 3, 1),
              a > 12 && fill("#c8a828", t + 2, 64, a - 4, 2));
          }),
          !exitOpen &&
            erode < 200 &&
            (Vt ||
              (Vt = (function () {
                const t = document.createElement("canvas");
                ((t.width = 384), (t.height = 216));
                const a = ctx;
                ((ctx = t.getContext("2d")),
                  Ht((t) => {
                    const a = 294,
                      e = 380;
                    ([
                      [62, 40, 0],
                      [102, 42, 2],
                      [144, 42, -1],
                    ].forEach(([o, n, l], s) => {
                      (t.poly(
                        [
                          [a, o + l],
                          [e, o - l],
                          [e, o + n - l],
                          [a, o + n + l],
                        ],
                        (t, a) => {
                          const e = (a - o) / n,
                            r = It(t / 3, a / 12, 77 + s),
                            l = It(t / 9, a / 5, 77 + 3 * s);
                          if (a < o + 1.5) return [186, 200, 216];
                          if (a > o + n - 2) return [38, 46, 60];
                          if (r > 0.64) return [150, 88, 44];
                          if (r > 0.56) return [112, 72, 44];
                          const c = Ct(
                            [112, 128, 146],
                            [62, 76, 94],
                            0.9 * e + 0.35 * (Et(t, a) - 0.5),
                          );
                          return l > 0.6 ? Ct(c, [150, 170, 190], 0.2) : c;
                        },
                      ),
                        t.rect(a, o + n - 3 + l, 86, 3, "#222a38"),
                        t.rect(a, o + 1 + l, 86, 1, "#c8d6e6", 0.7));
                      for (let a = 0; a < 9; a++) {
                        const e = 300 + (74 * a) / 8;
                        (t.disc(e, o + 6, 2, "#1a2030"),
                          t.px(e - 1, o + 5, "#c8d6e6"),
                          t.px(e, o + 6, "#6a7a90"),
                          t.disc(e, o + n - 7, 2, "#1a2030"),
                          t.px(e - 1, o + n - 8, "#c8d6e6"));
                      }
                      for (let e = 0; e < 12; e++)
                        t.px(a + 86 * r(e, s), o + r(e, s + 4) * n, "#e8c8a0", 0.4);
                      for (let a = 0; a < 5; a++)
                        t.rect(304 + 16 * a, o + n - 1, 2, (3 + 4 * r(a, s)) | 0, "#8a4a22");
                    }),
                      [102, 144].forEach((o) => {
                        for (let n = a; n < e; n += 3)
                          t.px(n, o, r(n, o) < 0.5 ? "#c8a060" : "#8a6a3a");
                      }));
                    for (let o = 0; o < 3; o++)
                      (t.line(a, 66 + o, e, 184 + o, "#2a3242"),
                        t.line(a, 184 + o, e, 66 + o, "#2a3242"));
                    (t.line(a, 66, e, 184, "#7a8aa0", 0.8),
                      t.line(a, 184, e, 66, "#7a8aa0", 0.8),
                      xe(t, 328, 114, 18, 18, "#4a5870", "#aabcd0", "#10141e"),
                      t.disc(337, 123, 3, "#1a2030"),
                      t.px(336, 122, "#c8d6e6"),
                      t.poly(
                        [
                          [322, 86],
                          [342, 86],
                          [332, 70],
                        ],
                        "#e8c020",
                      ),
                      t.poly(
                        [
                          [326, 84],
                          [338, 84],
                          [332, 75],
                        ],
                        "#14100a",
                      ),
                      t.px(332, 81, "#e8c020"),
                      t.rect(331, 78, 2, 2, "#e8c020"),
                      [
                        [290, 52, 372, 176, 14],
                        [384, 60, 300, 190, -12],
                        [296, 176, 350, 60, 10],
                        [380, 184, 320, 52, -14],
                        [300, 100, 380, 140, 8],
                        [380, 96, 298, 150, -8],
                      ].forEach((a, e) =>
                        ve(
                          t,
                          a[0],
                          a[1],
                          a[2],
                          a[3],
                          a[4],
                          4.3 * e + 11,
                          3 + (e % 2),
                          ye[e % 6] || [255, 134, 208],
                        ),
                      ));
                    for (let a = 0; a < 7; a++)
                      ve(
                        t,
                        292 + 13 * a,
                        50,
                        292 + 13 * a + (a % 2 ? 7 : -7),
                        (92 + 70 * r(a, 2)) | 0,
                        5,
                        2.5 * a + 300,
                        2,
                        ye[a % 6] || [255, 134, 208],
                      );
                    ([
                      [298, 70, 10],
                      [372, 66, 11],
                      [312, 186, 15],
                      [364, 184, 16],
                      [336, 126, 9],
                      [300, 140, 8],
                      [372, 150, 9],
                      [336, 58, 10],
                    ].forEach(([a, e, o], r) => Fa(t, a, e, o, 7 * r + 2)),
                      Ga(t, 292, 60, 92, 30, 61),
                      Ga(t, 292, 150, 92, 36, 63));
                    for (let a = 0; a < 6; a++) {
                      const e = 294 + 86 * r(a, 3),
                        o = 60 + 120 * r(a, 4);
                      (t.rect(e, o, 2, 2, a % 2 ? [255, 134, 208] : [255, 226, 110]),
                        t.px(e, o, [255, 250, 210]));
                    }
                  }),
                  (ctx = a));
                const e = 96,
                  o = 146,
                  n = t.getContext("2d").getImageData(288, 44, e, o),
                  l = new Float32Array(14016),
                  s = new Uint8Array(14016);
                for (let t = 0; t < o; t++)
                  for (let a = 0; a < e; a++) {
                    const c = t * e + a,
                      i = 4 * c,
                      f = n.data[i + 1];
                    ((s[c] = f > n.data[i] + 12 && f > n.data[i + 2] + 8 ? 1 : 0),
                      (l[c] =
                        0.5 * It((a + 288) / 5, (t + 44) / 5, 5) + (t / o) * 0.5 + 0.06 * r(a, t)));
                  }
                const c = document.createElement("canvas");
                return (
                  (c.width = e),
                  (c.height = o),
                  {
                    cv: t,
                    src: n,
                    noise: l,
                    vine: s,
                    rx: 288,
                    ry: 44,
                    rw: e,
                    rh: o,
                    out: c,
                    oc: c.getContext("2d"),
                    buf: new ImageData(e, o),
                  }
                );
              })()),
            (function (t, a, e) {
              if (e <= 0) return void a.drawImage(t.cv, 0, 0, 192, 108);
              const o = 1.2 * e - 0.12,
                r = t.src.data,
                n = t.buf.data,
                l = t.noise,
                s = t.vine;
              for (let t = 0; t < l.length; t++) {
                const a = 4 * t;
                if (!r[a + 3]) {
                  n[a + 3] = 0;
                  continue;
                }
                const e = l[t] * (s[t] ? 0.7 : 1.05);
                e < o
                  ? (n[a + 3] = 0)
                  : e < o + 0.06
                    ? ((n[a] = 210),
                      (n[a + 1] = 255),
                      (n[a + 2] = 1 & t ? 120 : 200),
                      (n[a + 3] = 255))
                    : e < o + 0.1
                      ? ((n[a] = 0.5 * r[a]),
                        (n[a + 1] = 0.6 * r[a + 1] + 60),
                        (n[a + 2] = 0.4 * r[a + 2]),
                        (n[a + 3] = 255))
                      : ((n[a] = r[a]),
                        (n[a + 1] = r[a + 1]),
                        (n[a + 2] = r[a + 2]),
                        (n[a + 3] = 255));
              }
              (t.oc.putImageData(t.buf, 0, 0),
                a.drawImage(t.out, t.rx / 2, t.ry / 2, t.rw / 2, t.rh / 2));
            })(Vt, ctx, erode / 200)));
      })());
  }
  if ("lab" === room) {
    hasGoggles || l.every((t) => got.has(t));
    {
      const t = 0.5 + 0.5 * Math.sin(tick / 20);
      glow(92, 66, 26, "255,224,112", 0.18 + 0.12 * t);
    }
  }
  if (
    ("lab" === room &&
      taken.goggles &&
      (fill("#8a1828", 146, 58, 4, 34), fill("#0a0a12", 150, 60, 20, 32)),
    e.crates.forEach((t, a) => {
      if (broken[room + a]) return;
      const e = 80 - (t.y2 ? 12 : 0);
      (fill("#120a06", t.x - 1, e - 1, t.w + 2, 13),
        fill("#7a5632", t.x, e, t.w, 11),
        fill("#a07848", t.x, e, t.w, 1),
        fill("#4a3018", t.x, e + 3.5, t.w, 0.5),
        fill("#4a3018", t.x, e + 7, t.w, 0.5),
        fill("#2a1a0c", t.x, e, 1.5, 11),
        fill("#2a1a0c", t.x + t.w - 1.5, e, 1.5, 11),
        fill("#8a98a8", t.x, e, 2, 2),
        fill("#8a98a8", t.x + t.w - 2, e, 2, 2),
        fill("#8a98a8", t.x, e + 9, 2, 2),
        fill("#8a98a8", t.x + t.w - 2, e + 9, 2, 2),
        fill("#4a8a3a", t.x + 1, e, t.w - 3, 1.5),
        fill("#6bd86a", t.x + 2, e, 3, 1));
    }),
    e.items.forEach((t) => {
      if (taken[t.id] || ea(t)) return;
      const a = 1.2 * Math.sin(tick / 14 + t.x),
        e = items[t.id];
      glow(t.x, t.y - 8, 16, e.decoy ? "200,200,220" : "255,235,120", 0.35);
      const o = i(e.k, e.c);
      (o.complete && ctx.drawImage(o, t.x - 6, t.y - 13 + a, 12, 12),
        fill("#fff", t.x + 4 + 2 * Math.sin(tick / 9), t.y - 14 + a, 1, 1));
    }),
    "stair" === room &&
      (fill("#04030bcc", 3, 262, 50, 9),
      text("< STORAGE", 6, 264, "#ffd070", '5px "Press Start 2P",monospace'),
      [
        [10, 22, "FL 10"],
        [162, 110, "FL 7"],
        [8, 198, "FL 4"],
        [162, 286, "FL 1"],
      ].forEach(([t, a, e]) => {
        (fill("#04030bcc", t, a, 28, 9),
          text(e, t + 2, a + 2, "#9aff9a", '5px "Press Start 2P",monospace'));
      }),
      fill("#04030b", 176, 276, 16, 8),
      text("EXIT LAB", 156, 272, "#ff6a5a", '5px "Press Start 2P",monospace')),
    "outside" === room)
  ) {
    const t = 16.7 * tick;
    (to(t, je),
      ao(t, (Ve.x - 8) / 2, (Ve.x + Ve.w + 8) / 2, (Ve.y - 9) / 2, a, 6, 5),
      eo(t, 16, 0.16));
  }
  if ("exitlab" === room && bossDone) {
    (ctx.save(), ctx.translate(roomW() - 192, floorY() - 92), fill("#0a0e0c", 179, 38, 13, 55));
    for (let t = 0; t < 52; t += 2) fill(jt("#fff4c8", "#7ac860", t / 52), 181, 40 + t, 11, 2);
    for (let t = 0; t < 5; t++)
      fill(t % 2 ? "#2a6a30" : "#1f5226", 182 + 2 * t, 64 + (t % 2) * 6, 1.5, 29 - (t % 2) * 6);
    (fill("#6a7480", 178, 36, 4, 4),
      fill("#6a7480", 180, 90, 6, 3),
      glow(188, 62, 44, "255,240,190", 0.3),
      ctx.restore());
  }
  if (
    ("exitlab" === room &&
      cine &&
      cine.tailB &&
      (Ft(cine.tailB.x + 42, floorY() + 1, 40, 0.4), drawSnake(cine.tailB, 1)),
    ("exitlab" === room || snakeBoss) &&
      (function () {
        const t = snakeBoss;
        if (!t) return;
        const a = floorY();
        let e = 1;
        "dead" === t.st && (e = Math.max(0, 1 - t.t / 170));
        const o = (t, e) => {
          for (let o = 0; o < 2 * e; o++) {
            const e = t + 0.5 * o;
            ((o >> 1) + (tick >> 2)) % 2 == 0 &&
              (fill("#ff5a3a", e, a - 1, 0.5, 0.5),
              o % 4 == 0 && fill("#ffb070", e, a - 1.5, 0.5, 0.5));
          }
        };
        if ("slam" === t.st && t.t < 46) {
          const a = bo(t);
          (Mo(a, 28, t.t / 46, 1), (t.t >> 2) % 2 && (o(a - 76, 50), o(a + 26, 50)));
        }
        if (
          ("throw" === t.st &&
            t.tg &&
            t.tg.forEach((a) => {
              a.fired || Mo(a.x, 9, 0.45 + 0.4 * Math.max(0, 1 - (a.shot - t.t) / 24), 1);
            }),
          "charge" === t.st && t.t < 40)
        ) {
          const e = t.face > 0 ? t.x + 10 : 30,
            r = t.face > 0 ? roomW() - 6 : t.x - 10,
            n = t.t / 40;
          ((ctx.globalAlpha = 0.12 + 0.18 * n * (0.5 + 0.5 * Math.sin(tick / 2))),
            fill("#ff2020", e, a - 26, r - e, 26),
            (ctx.globalAlpha = 0.6 + 0.4 * n));
          for (let o = 0; o < 5; o++) {
            const n =
              e + ((((1.5 * tick * t.face + (o * (r - e)) / 5) % (r - e)) + (r - e)) % (r - e));
            (fill("#ff4040", n, a - 15, 1, 1),
              fill("#ff4040", n - t.face, a - 16, 1, 1),
              fill("#ff4040", n - t.face, a - 14, 1, 1));
          }
          ((ctx.globalAlpha = 1),
            Mo(t.face > 0 ? roomW() - 22 : 22, 14, n, 1),
            (t.t >> 2) % 2 && o(t.face > 0 ? t.x : t.x - 130, 130));
        }
        if ((Ft(t.x, a + 1, 120, 0.5), "intro" === t.st && t.t < 110))
          for (let e = 0; e < 12; e++) {
            const o = lo((t.t + 9 * e) / 40);
            fill(
              e % 3 ? "#4a3a46" : "#8a7a70",
              t.x + 70 * (r(e, 4) - 0.5),
              a - 2 - 16 * Math.sin(Math.PI * o),
              1,
              1,
            );
          }
        if ("charge" === t.st && t.t >= 40)
          for (let e = 0; e < 6; e++) {
            const o = lo(tick / 12 + e / 6);
            fill("#8a7a70", t.x - t.face * (24 + 30 * o), a - 1 - 5 * o + (e % 2), 1, 1);
          }
        const n = drawSnake(t, e);
        if ("dead" !== t.st) {
          const a = 0.55 + 0.35 * Math.sin(tick / 9);
          (glow(n.eye.x, n.eye.y, 7, "255,50,30", a * e),
            t.flash > 0 && glow(n.head.x, n.head.y, 22, "255,255,255", (0.5 * t.flash) / 6),
            "throw" === t.st && n.mouth
              ? (glow(n.mouth.x, n.mouth.y, 11, "120,255,100", 0.6),
                tick % 4 < 2 &&
                  fill("#8aff6a", n.mouth.x + 2 * t.face, n.mouth.y + 2 + (tick % 8) / 2, 0.5, 1))
              : "slam" === t.st && n.mouth && glow(n.mouth.x, n.mouth.y, 10, "255,120,60", 0.5));
        }
        if ("stun" === t.st)
          for (let t = 0; t < 3; t++) {
            const a = tick / 6 + 2.1 * t,
              e = n.head.x + 9 * Math.cos(a),
              o = n.head.y - 13 + 3 * Math.sin(a);
            (fill("#3a2400", e - 0.5, o - 0.5, 2, 2), fill("#ffd23a", e, o, 1, 1));
          }
      })(),
    c2Draw(),
    "stair" === room &&
      (function () {
        const t = 179,
          a = 268,
          e = 289;
        if (bossOpen) {
          fill("#020806", 182, 273, 10, 32);
          for (let t = 0; t < 7; t++)
            (fill("#3a444c", 180 + 4 * r(t, 3), 271 + 5 * t, 2 + 3 * r(t, 4), 3),
              fill("#6a7884", 180 + 4 * r(t, 3), 271 + 5 * t, 1, 1));
          (fill("#3a444c", 181, 270, 11, 3), glow(187, e, 16, "120,255,170", 0.25));
          for (let t = 0; t < 4; t++)
            fill("#3a444c", 174 + 3 * t - 6 * r(t, 7), 303 - 2 * r(t, 8), 3, 2);
        } else {
          (fill("#06090c", 178, 267, 15, 39),
            fill("#3a444c", t, a, 13, 37),
            fill("#6a7884", t, a, 13, 1),
            fill("#6a7884", t, a, 1, 37),
            fill("#1c242a", 191, a, 1, 37),
            fill("#2a323a", t, 280, 13, 1),
            fill("#2a323a", t, 293, 13, 1));
          for (let t = 0; t < 3; t++)
            (fill("#8a98a4", 181, 271 + 13 * t, 1, 1), fill("#8a98a4", 189, 271 + 13 * t, 1, 1));
          for (let t = 0; t < 6; t++) fill(t % 2 ? "#e8c020" : "#16140a", 180 + 2 * t, 300, 2, 3);
          for (let t = 0; t < 10; t++)
            fill("#6a3a1c", 180 + 11 * r(t, 31), 270 + 28 * r(t, 32), 1 + 2 * r(t, 33), 1);
          if (
            (fill("#1a1e22", 180, 285, 11, 3),
            fill("#5a6670", 180, 285, 11, 1),
            fill("#c8a030", 184, 284, 3, 5),
            fill("#f0d870", 184, 284, 3, 1),
            fill((tick >> 4) % 2 ? "#ff3a2a" : "#5a1410", 184, 263, 3, 2),
            (tick >> 4) % 2 && glow(185.5, 264, 6, "255,60,40", 0.5),
            corrode > 0)
          ) {
            const a = 10 * corrode;
            for (let o = -a; o <= a; o += 0.5) {
              const r = 0.62 * Math.sqrt(Math.max(0, a * a - o * o));
              fill("#04060a", Math.max(t, 185.5 - r), e + o, Math.min(13, 2 * r), 0.5);
            }
            for (let o = 0; o < 14; o++) {
              const r = (o / 14) * 6.283 + tick / 30,
                n = 185.5 + Math.cos(r) * a * 0.62,
                l = e + Math.sin(r) * a;
              n >= t && n < 192 && fill(o % 3 ? "#b06aff" : "#e8d0ff", n, l, 1, 1);
            }
            for (let t = 0; t < 3; t++)
              fill("#8a3ae0", 182 + 3.5 * t, e + a, 1, 2 + ((tick / 6 + 5 * t) % 6));
            glow(185.5, e, 6 + a, "180,110,255", 0.35 * corrode);
          }
        }
      })(),
    "hall" === room &&
      (text("STAFF", 27.5, 51.5, "#2a2210", '4px "Press Start 2P",monospace'),
      text("ONLY", 29.5, 56.5, "#a01810", '4px "Press Start 2P",monospace')),
    "ware" === room &&
      (text("HAZARDOUS", 159, 73.6, "#1a1608", '4px "Press Start 2P",monospace'),
      e.crates.forEach((t, a) => {
        !broken[room + a] &&
          (tick + 40 * a) % 160 < 10 &&
          fill("#ffe07088", t.x + 2 + ((tick >> 1) % 8), 82, 1, 1);
      })),
    !won)
  ) {
    const t = player.punch > 0;
    if ((player.on && (Se = player.y), !(invuln > 0 && (tick >> 2) % 2))) {
      const a = (function () {
          let t;
          const a = player.walk && player.on;
          if (player.on)
            t =
              player.kb > 0 && invuln > 0
                ? Aa("hurt")
                : ue > 0
                  ? Aa("land")
                  : a
                    ? Aa("walk", (2.5 * player.fr) & 7)
                    : Aa("idle", (tick / 45) & 1);
          else {
            const a = player.vy;
            t = Aa(a < -1.6 ? "up" : a > 1.2 ? "down" : "top");
          }
          const e = Object.assign({}, t);
          if (player.punch > 0) {
            const t = Aa("punch", 14 - player.punch);
            ((e.fa = t.fa),
              (e.ba = t.ba),
              (e.fist = t.fist),
              (e.gun = 0),
              (e.lg = t.lg),
              (e.bob = t.bob));
          } else
            hasGun &&
              ((e.gun = 1),
              Te > 0
                ? ((e.fa = gunCd > 15 ? [3, -9] : [6, -8]),
                  (e.flash = gunCd > 17 ? 1 : 0),
                  (e.ba = [-1, -2]))
                : (e.fa = [4, -6]));
          return (
            (e.k = [e.lg.join(","), e.ba, e.fa, e.bob, e.tl, e.fist, e.gun, e.flash].join("|")),
            e
          );
        })(),
        e = Math.max(0, Se - player.y);
      (Ma(
        player.x + (t && player.punch < 12 ? 1.5 * player.face * Po : 0),
        player.y,
        playerLook,
        0,
        player.face,
        {
          s: Po,
          noshd: 1,
          pose: a,
          env: De[room] || De.pod,
        },
      ),
        (function (t, a, e, o) {
          const r = Math.max(0.35, 1 - e / 75) * Po,
            n = Math.max(0.3, 1 - e / 90);
          for (let e = 0; e < 3; e++) {
            const l = (10 - 2.6 * e) * r,
              s = (2.8 - 0.7 * e) * r,
              c = [0.22, 0.3, 0.38][e] * n;
            for (let e = -Math.ceil(s); e <= Math.ceil(s); e += 0.5) {
              const r = 1 - (e * e) / (s * s + 0.01);
              if (r <= 0) continue;
              const n = l * Math.sqrt(r);
              fill(
                "rgba(3,10,8," + c + ")",
                Math.round(2 * (t - n + 0.8 * o)) / 2,
                Math.round(2 * (a + e)) / 2,
                Math.round(4 * n) / 2,
                0.5,
              );
            }
          }
        })(player.x, Se, e, player.punch > 0 ? player.face : 0));
    }
    if (
      (worn &&
        2 !== modal &&
        fill("#7fe8ff", player.x + 2 * player.face * Po - 1, player.y - 33.35, 3, 1),
      t)
    ) {
      const t = 14 - player.punch,
        a = player.face;
      if (t >= 3 && t <= 9) {
        ctx.globalAlpha = 0.85 * Math.max(0, 1 - (t - 3) / 7);
        for (let t = 0; t < 11; t++) {
          const e = 0.2 * t - 1.15;
          (fill(
            "#ffffff",
            Math.round(2 * (player.x + a * (2 + 12 * Math.cos(e)))) / 2,
            Math.round(2 * (player.y - 13 * Po + 10 * Math.sin(e))) / 2,
            1,
            0.5,
          ),
            t % 2 &&
              fill(
                "#ffe070",
                Math.round(2 * (player.x + a * (2 + 14 * Math.cos(e)))) / 2,
                Math.round(2 * (player.y - 13 * Po + 12 * Math.sin(e))) / 2,
                0.5,
                0.5,
              ));
        }
        ctx.globalAlpha = 1;
      }
    }
  }
  if (!modal && !won) {
    let t = null;
    if (
      (e.items.forEach((a) => {
        taken[a.id] || ea(a) || !se(a.x, a.y, 15) || (t = [a.x, a.y - 20, "TAKE"]);
      }),
      e.ints.forEach((a) => {
        Math.abs(player.x - a.x) < a.r &&
          ("haz" !== a.id || !taken.canister) &&
          (t = [a.x, a.label ? 48 : 40, a.label || "MIX"]);
      }),
      "pod" === room &&
        !exitOpen &&
        0 === erode &&
        hasPotion &&
        player.x >= 116 &&
        (t = [player.x, player.y - 49.3, "POUR"]),
      t)
    ) {
      ctx.font = '5px "Press Start 2P",monospace';
      const a = Math.ceil(ctx.measureText(t[2]).width) + 6;
      (fill("#04100a", t[0] - a / 2 - 1, t[1] - 1, a + 2, 10),
        fill("#ffe070", t[0] - a / 2, t[1], a, 8),
        text(t[2], t[0] - a / 2 + 3, t[1] + 1.5, "#1a1408", '5px "Press Start 2P",monospace'));
    }
  }
  if (pourT > 0) {
    const t = 0.9 * Math.min(1, (90 - pourT) / 20);
    (ctx.save(), ctx.translate(player.x + 9, player.y - 18 * Po), ctx.rotate(1.3 * t));
    const a = i("potion", "#6aff7a");
    (a.complete && ctx.drawImage(a, -5, -8, 10, 10), ctx.restore());
  }
  if (
    (parts.forEach((t) => {
      ((ctx.globalAlpha = Math.min(1, t.life / 10)), fill(t.c, t.x, t.y, t.s || 1, t.s || 1));
    }),
    (ctx.globalAlpha = 1),
    (function () {
      const t = floorY();
      (waves.forEach((a) => {
        const e = Math.sign(a.vx) || 1;
        for (let o = 0; o < 4; o++) {
          const r = a.x - e * o * 2.6,
            n = 7 - 1.6 * o + 0.5 * Math.sin(tick / 2 + o);
          (fill("#1a1020", r - 1.5, t - n, 3, n),
            fill("#5a4a52", r - 1, t - n, 1.5, n - 0.5),
            fill("#a89a8a", r - 1, t - n, 1, 0.5));
        }
        (fill("#ffc23a", Math.min(a.x, a.x - 10 * e), t - 0.5, 10, 0.5),
          fill("#fff0a0", a.x - 1, t - 0.5, 2, 0.5));
        for (let o = 0; o < 5; o++)
          fill("#9a8a80", a.x - e * (2 + 2.2 * o), t - 3 - 6 * lo(tick / 10 + 0.3 * o), 0.5, 0.5);
      }),
        "exitlab" === room &&
          (function () {
            const t = floorY();
            (drops.forEach((t) => {
              const a = t.vy ? 0 : 1 * Math.sin(tick / 10 + t.x);
              (fill("#1a0a2a", t.x - 2, t.y - 5 + a, 4, 6),
                fill("#b06aff", t.x - 1.5, t.y - 3.5 + a, 3, 4),
                fill("#e8d0ff", t.x - 1.5, t.y - 3.5 + a, 1, 3),
                fill("#8a6a4a", t.x - 1, t.y - 5 + a, 2, 1.5),
                glow(t.x, t.y - 2 + a, 7, "180,110,255", 0.4 + 0.2 * Math.sin(tick / 8)));
            }),
              minis.forEach((a) => {
                const e = a.face,
                  o = tick / 4 + 0.3 * a.x,
                  n = a.t < 34 ? a.t / 34 : 1,
                  l = 5 * (1 - n);
                ctx.globalAlpha = Math.min(1, 1.5 * n);
                for (let e = 0; e < 5; e++) fill("#020806", a.x - 6 + 3 * e, t - 0.5, 2.5, 0.5);
                for (let r = 9; r >= 0; r--) {
                  const s = a.x - e * r * 1.6,
                    c = t - 1.6 - 0.9 * Math.sin(o - 0.75 * r) * n + l,
                    i = r < 2 ? 2.6 : Math.max(1.2, 2.8 - 0.17 * r);
                  (fill("#0a0606", s - i / 2 - 0.25, c - i / 2 - 0.25, i + 0.5, i + 0.5),
                    fill(r % 3 == 0 ? "#c8b898" : "#2a1c18", s - i / 2, c - i / 2, i, i),
                    r % 3 == 1 && fill("#100808", s - 0.5, c - i / 2, 1, 0.5 * i),
                    r % 4 == 2 && fill("#6a2a26", s - 0.25, c - i / 2, 0.5, 0.5));
                }
                const s = a.x + 2.2 * e,
                  c = t - 3 - 0.9 * Math.sin(o) * n + l + (a.cd > 58 ? -2 : 0);
                if (
                  (fill("#0a0606", s - 2.5, c - 2, 5, 4),
                  fill("#6a5a4e", s - 2, c - 1.6, 4, 3.2),
                  fill("#a89880", s - 2, c - 1.6, 4, 0.8),
                  fill("#6a5a4e", s + 2 * e - 0.5, c - 0.8, 1.5, 1.6),
                  fill("#d8c8a8", s - 1.5, c + 0.8, 3.5, 0.6),
                  fill("#d8ccb0", s - 0.6 * e - 0.25, c - 2.8, 0.5, 1.2),
                  fill("#ff3a24", s + 0.5 * e - 0.5, c - 1, 1, 0.8),
                  glow(s + 0.5 * e, c - 0.6, 3, "255,50,30", 0.45),
                  ((tick + 7 * a.x) | 0) % 46 < 7 && n >= 1)
                ) {
                  const t = e > 0 ? s + 3 : s - 5;
                  (fill("#ff4a6a", t, c + 0.3, 2, 0.5),
                    fill("#ff4a6a", t + (e > 0 ? 2 : -0.5), c - 0.2, 0.5, 0.5),
                    fill("#ff4a6a", t + (e > 0 ? 2 : -0.5), c + 0.8, 0.5, 0.5));
                }
                if (
                  (a.hurt > 0 &&
                    ((ctx.globalAlpha = 0.6),
                    fill("#ffffff", a.x - 14 * e - 1, t - 5, 16, 5),
                    (ctx.globalAlpha = 1)),
                  a.t < 34)
                )
                  for (let e = 0; e < 3; e++)
                    fill(
                      "#5a4a3a",
                      a.x + 10 * (r(e, a.t) - 0.5),
                      t - 1 - 4 * r(e + 3, a.t),
                      0.5,
                      0.5,
                    );
                ctx.globalAlpha = 1;
              }));
          })(),
        ce.forEach((t) => {
          const a = Math.min(1, t.life / 40);
          ctx.globalAlpha = 0.85 * a;
          for (let a = -1; a <= 1; a += 0.5) {
            const e = (9 - 3 * Math.abs(a)) * (1 + (110 - t.life) / 400);
            fill(
              a ? "#3a9a3a" : "#6ae05a",
              Math.round(2 * (t.x - e)) / 2,
              floorY() + 0.5 * a - 0.5,
              Math.round(4 * e) / 2,
              0.5,
            );
          }
          (t.life % 9 < 3 &&
            fill(
              "#d8ff9a",
              t.x - 3 + ((7 * t.life) % 6),
              floorY() - 1.5 - (t.life % 9) / 3,
              0.5,
              0.5,
            ),
            (ctx.globalAlpha = 1),
            glow(t.x, floorY(), 8, "120,255,100", 0.15 * a));
        }),
        venoms.forEach((t) => {
          if ("venom" === t.k) {
            Mo(t.tx, 9, 0.6 + 0.4 * Math.min(1, t.t / t.T), 1);
            for (let a = 1; a < 6; a++) {
              const e = Math.max(0, (t.t - 1.5 * a) / t.T),
                o = t.sx + (t.tx - t.sx) * e,
                r = t.sy + (floorY() - 1 - t.sy) * e * e - 26 * Math.sin(e * Math.PI);
              ((ctx.globalAlpha = 0.7 - 0.12 * a),
                fill("#4ad04a", o - 0.5, r - 0.5, 1, 1),
                (ctx.globalAlpha = 1));
            }
            return (
              fill("#1a4a12", t.x - 2, t.y - 1.5, 4, 3),
              fill("#6ae05a", t.x - 1.5, t.y - 1.5, 3, 3),
              fill("#d8ff9a", t.x - 1, t.y - 1, 1, 1),
              void glow(t.x, t.y, 7, "120,255,100", 0.55)
            );
          }
          const a = Math.hypot(t.vx, t.vy) || 1,
            e = t.vx / a,
            o = t.vy / a;
          for (let a = 0; a < 12; a++) {
            const r = t.y - o * a * 0.5;
            fill(
              a < 2 ? "#ffc23a" : a < 9 ? (a % 3 == 0 ? "#a89a86" : "#e0d6bc") : "#5a4a52",
              Math.round(2 * (t.x - e * a * 0.5)) / 2,
              Math.round(2 * r) / 2,
              0.5,
              0.5,
            );
          }
          glow(t.x, t.y, 5, "255,190,60", 0.35);
        }),
        shots.forEach((t) => {
          const a = Math.sign(t.vx),
            e = 0.6 * Math.sin(tick / 2 + t.x);
          for (let e = 1; e < 7; e++)
            ((ctx.globalAlpha = 0.6 - 0.08 * e),
              fill(
                e % 2 ? "#8a3ae0" : "#b06aff",
                t.x - a * (2 + 2.2 * e),
                t.y - 0.5 + 0.8 * Math.sin(tick / 2 + e),
                2,
                1,
              ));
          ((ctx.globalAlpha = 1),
            fill("#3a1466", t.x - 2.5, t.y - 2 + e, 5, 4),
            fill("#b06aff", t.x - 2, t.y - 1.5 + e, 4, 3),
            fill("#e8d0ff", t.x - 1 + a, t.y - 1 + e, 1.5, 1),
            glow(t.x, t.y, 7, "180,110,255", 0.55));
        }));
    })(),
    fx.forEach((t) => {
      const a = t.t / t.life,
        e = 1 - a;
      if ("flash" === t.k) glow(t.x, t.y, t.r, t.c, e * t.a);
      else if ("ring" === t.k) {
        const o = t.r0 + (t.r1 - t.r0) * (1 - Math.pow(1 - a, 3));
        ctx.globalAlpha = e;
        const r = a < 0.5 ? 1 : 0.5;
        for (let a = 0; a < 36; a++) {
          const e = (a / 36) * 6.283;
          fill(
            t.c,
            Math.round(2 * (t.x + Math.cos(e) * o)) / 2,
            Math.round(2 * (t.y + Math.sin(e) * o * (t.sq || 1))) / 2,
            r,
            r,
          );
        }
        ctx.globalAlpha = 1;
      } else if ("star" === t.k) {
        const o = t.r * (1 - 0.5 * a);
        ((ctx.globalAlpha = e),
          fill(t.c, t.x - o, t.y - 0.25, 2 * o, 0.5),
          fill(t.c, t.x - 0.25, t.y - o, 0.5, 2 * o),
          fill(t.c, t.x - 0.5 * o, t.y - 0.5 * o, 0.5, 0.5),
          fill(t.c, t.x + 0.5 * o, t.y - 0.5 * o, 0.5, 0.5),
          fill(t.c, t.x - 0.5 * o, t.y + 0.5 * o, 0.5, 0.5),
          fill(t.c, t.x + 0.5 * o, t.y + 0.5 * o, 0.5, 0.5),
          (ctx.globalAlpha = 1));
      } else if ("spark" === t.k)
        ((ctx.globalAlpha = Math.min(1, 1.4 * e)),
          fill(t.c, t.x, t.y, a < 0.4 ? 1 : 0.5, a < 0.4 ? 1 : 0.5),
          fill(t.c, t.x - 0.8 * t.vx, t.y - 0.8 * t.vy, 0.5, 0.5),
          fill(t.c, t.x - 1.6 * t.vx, t.y - 1.6 * t.vy, 0.5, 0.5),
          (ctx.globalAlpha = 1));
      else if ("smoke" === t.k) {
        const a = t.r;
        ctx.globalAlpha = 0.45 * e;
        for (let e = -a; e <= a; e += 0.5) {
          const o = Math.sqrt(Math.max(0, a * a - e * e));
          fill(
            "rgb(" + t.c + ")",
            Math.round(2 * (t.x - o)) / 2,
            Math.round(2 * (t.y + e)) / 2,
            Math.round(4 * o) / 2,
            0.5,
          );
        }
        ctx.globalAlpha = 1;
      } else
        "shell" === t.k &&
          (fill("#d8a83a", t.x - 0.5, t.y - 0.25, 1, 0.5),
          fill("#fff0a0", t.x - 0.5, t.y - 0.25, 0.5, 0.5));
    }),
    ctx.save(),
    ctx.translate(camX, 0),
    (function (t) {
      if ("outside" === room) return;
      const a = 108 + camY;
      [
        [3, 18, 0],
        [9, 26, 1],
        [183, 22, 2],
        [189, 14, 3],
      ].forEach(([a, e, o]) => {
        let r = a,
          n = 0;
        for (let l = 0; l < e; l++)
          ((r = a + Math.sin(t / 1100 + o + 0.12 * l) * l * 0.06),
            (n = l + camY),
            fill(l % 3 ? "#0a1e10" : "#0e2a16", r, n, 1, 1),
            l % 5 == 2 && fill("#123a1c", r + (o % 2 ? 1 : -2), n, 2, 1));
      });
      for (let e = 0; e < 5; e++) {
        const o = e < 3 ? 5 * e : 192 - 5 * (e - 2),
          r = 1.2 * Math.sin(t / 900 + e);
        for (let t = 0; t < 10; t++)
          fill("#06120a", o + (r * t) / 10 + (e < 3 ? 0.3 * t : 0.3 * -t), a - t, 1.5, 1);
      }
    })(t),
    ctx.restore(),
    "stair" === room)
  )
    modal ||
      won ||
      cine ||
      (hasGun || bossOpen ? vo(170, 264, 1) : ta() ? vo(18, 14, -1) : vo(18, 282, -1));
  else if ("hall" === room) modal || (ta() || hasGun ? vo(176, 58, 1) : vo(52, 62, -1));
  else if ("ware" === room) modal || (!ta() && !hasGun) || vo(roomW() - 18, 58, 1);
  else if ("exitlab" === room) !bossDone || modal || won || vo(roomW() - 20, floorY() - 34, 1);
  else if ("outside" === room) modal || won || doorCut || vo(146, 62, 1);
  else if (C2[room]) c2Arrow();
  else if (!(modal || won || pourT > 0)) {
    const t = (function () {
      if (exitOpen) return ta() ? { room: "lab", x: 92 } : { room: "pod", x: 190 };
      if (0 === stage) return { room: "pod", x: 140 };
      if (hasPotion) return { room: "pod", x: 132 };
      const t = l.filter((t) => !got.has(t));
      if (t.length) {
        let a = null;
        return (
          t.forEach((t) => {
            const e = (function (t) {
                for (const a of n) {
                  const e = rooms[a].items.find((a) => a.id === t);
                  if (e) return { room: a, x: e.x };
                }
              })(t),
              o = Math.abs(n.indexOf(e.room) - n.indexOf(room));
            (!a || o < a.d) && (a = { d: o, p: e });
          }),
          a.p
        );
      }
      return { room: "lab", x: 92 };
    })();
    t.room === room
      ? t.x >= 186 || ("pod" === room && (0 === stage || hasPotion || exitOpen))
        ? vo(Math.min(t.x >= 186 ? 176 : t.x, 172), 34, 1)
        : Math.abs(player.x - t.x) > 6 &&
          (function (t, a) {
            const e = 2 * Math.sin(tick / 8);
            (fill("#04100a", t - 4, a + e - 1, 9, 3),
              fill("#ffe070", t - 3, a + e, 7, 1),
              fill("#ffe070", t - 2, a + e + 1, 5, 1),
              fill("#ffe070", t - 1, a + e + 2, 3, 1),
              fill("#ffe070", t, a + e + 3, 1, 1),
              fill("#ffe070", t - 1, a + e - 4, 3, 4),
              fill("#04100a", t - 2, a + e - 5, 5, 1));
          })(t.x, (e.items.find((a) => a.x === t.x)?.y || 66) - 26)
      : (n.indexOf(t.room) > n.indexOf(room) ? 1 : -1) > 0
        ? vo(176, 58, 1)
        : vo(16, 58, -1);
  }
  if (
    (e.fy ||
      (e.L && fill("#ffe07044", 0, 62, 3, 30),
      !e.R || (e.gate && !e.gate(player)) || fill("#ffe07044", 189, 62, 3, 30)),
    Eo.box &&
      (function () {
        if (
          ((ctx.lineWidth = 0.5),
          (ctx.strokeStyle = "#5aff7a"),
          ctx.strokeRect(player.x - 4, player.y - 26 * Po, 8, 26),
          (ctx.strokeStyle = "#ffe070"),
          platforms().forEach((t) => {
            ctx.strokeRect(t.x, t.y, t.w, 2);
          }),
          (ctx.strokeStyle = "#ff5a5a"),
          snakeBoss && "dead" !== snakeBoss.st)
        ) {
          const t = (function (t) {
            const a = t.face,
              e = (function (t) {
                const a = t.t,
                  e = t.st;
                let o = 44 + 3 * Math.sin(tick / 22),
                  r = 20 + 4 * Math.sin(tick / 15),
                  n = 0.12,
                  l = 0.55,
                  s = 1;
                if ("intro" === e) {
                  const t = Math.min(1, a / (cine ? 150 : 100));
                  ((o = 9 + 38 * t),
                    (r = 28 - 8 * t),
                    (l = 0.55 * t),
                    (n = 0.1 + 0.06 * Math.sin(a / 4) * (1 - t)),
                    (s = 1.2));
                } else if ("slam" === e)
                  if (a < 46) {
                    const t = a / 46;
                    ((o = ro(44, 58, t)),
                      (r = ro(20, -12, t)),
                      (n = ro(0.15, 0.7, t)),
                      (l = ro(0.55, 1, t)));
                  } else {
                    const t = (a - 46) / 10,
                      e = (a - 60) / 22;
                    ((o = e > 0 ? ro(10, 46, e) : ro(58, 10, t)),
                      (r = e > 0 ? ro(34, 20, e) : ro(-12, 34, t)),
                      (n = e > 0 ? ro(0.8, 0.15, e) : 0.8),
                      (l = ro(1, 0.55, e)));
                  }
                else if ("throw" === e) {
                  const t = [30, 44, 58].some((t) => a >= t && a < t + 7);
                  ((o = ro(44, 58, a / 30)),
                    (r = ro(20, 16, a / 30) + (t ? 10 : 0)),
                    (n = t ? 0.85 : ro(0.15, 0.5, a / 30)),
                    (l = 1));
                } else
                  "charge" === e
                    ? a < 40
                      ? ((o = 24 + 1.2 * Math.sin(a)), (r = -8), (n = 0.12), (l = 0.8), (s = 1.8))
                      : ((o = 11), (r = 40), (n = 0.55), (l = 0.3), (s = 2))
                    : "stun" === e
                      ? ((o = 9), (r = 26), (n = 0.05), (l = 0), (s = 0.2))
                      : "dead" === e
                        ? ((o = 8), (r = 26), (n = 0.05), (l = 0), (s = 0.1))
                        : "walk" === e && (s = 1.1);
                return { H: o, Hx: r, gape: n, flare: l, amp: s };
              })(t),
              o = floorY(),
              r = [],
              n = "stun" === t.st || "dead" === t.st,
              l = n ? 0 : tick / 9;
            for (let t = 0; t <= 28; t++) {
              const a = t / 28,
                o = 2.4 + 11.4 * Math.pow(a, 0.72) * (1 - 0.06 * a);
              let s = 60 * a - 66,
                c = -o / 2 - 0.6 - 1.25 * e.amp * (1 + Math.sin(10 * a - l)) * (0.22 + 0.5 * a);
              if (a < 0.24) {
                const t = 1 - a / 0.24,
                  e = n ? 0.3 : 1;
                ((c -= t * t * 17 * e), (s += t * t * 8 * e));
              }
              r.push({ lx: s, ly: c, w: o });
            }
            const s = [-6, -6.6],
              c = [-6 - Math.min(24, 0.5 * e.H), -6.6 - 0.38 * e.H],
              i = [e.Hx - 30, 1.05 * -e.H],
              f = [e.Hx, -e.H];
            for (let t = 1; t <= 22; t++) {
              const a = t / 22,
                e = 1 - a;
              r.push({
                lx:
                  e * e * e * s[0] + 3 * e * e * a * c[0] + 3 * e * a * a * i[0] + a * a * a * f[0],
                ly:
                  e * e * e * s[1] + 3 * e * e * a * c[1] + 3 * e * a * a * i[1] + a * a * a * f[1],
                w:
                  13.2 -
                  4.8 * Math.pow(a, 1.35) +
                  0.45 * Math.sin(3.1 * a) +
                  (a > 0.15 && a < 0.6 && !n ? 0.3 * Math.sin(tick / 11) : 0),
              });
            }
            r.forEach((e) => {
              ((e.x = t.x + a * e.lx), (e.y = o + e.ly));
            });
            const h = r[r.length - 1],
              d = r[r.length - 4],
              b = Math.atan2(h.y - d.y, (h.x - d.x) * a),
              g = t.st,
              p = t.t;
            let u = 0.3 * b;
            "slam" === g && p >= 46 && p < 62
              ? (u += 0.75)
              : "slam" === g && p < 46
                ? (u -= (0.25 * p) / 46)
                : "stun" === g
                  ? (u += 0.55)
                  : "dead" === g
                    ? (u += 0.8)
                    : "throw" === g
                      ? (u -= 0.18)
                      : "charge" === g && p >= 40
                        ? (u += 0.12)
                        : "intro" === g && (u += 0.3 * (1 - Math.min(1, p / (cine ? 150 : 100))));
            const m = a * Math.cos(u),
              y = Math.sin(u),
              x = -a * y,
              M = a * m,
              w = { x: h.x - 4 * m, y: h.y - 4 * y },
              v = (t, a) => ({ x: w.x + 1.3 * (m * t + x * a), y: w.y + 1.3 * (y * t + M * a) });
            return {
              pts: r,
              GN: 28,
              p: e,
              f: a,
              O: w,
              F: [m, y],
              D: [x, M],
              head: v(17, -3),
              mouth: v(29, 2.2),
              eye: v(16.5, -3.5),
            };
          })(snakeBoss);
          (t.pts.forEach((t) => ctx.strokeRect(t.x - t.w / 2, t.y - t.w / 2, t.w, t.w)),
            ctx.strokeRect(t.head.x - 8, t.head.y - 8, 16, 16));
        }
        ((ctx.strokeStyle = "#ff9aff"),
          shots.forEach((t) => ctx.strokeRect(t.x - 1, t.y - 1, 3, 3)),
          venoms.forEach((t) => ctx.strokeRect(t.x - 2, t.y - 2, 4, 4)));
      })(),
    ctx.restore(),
    roomBanner > 0)
  ) {
    const t = Math.min(1, roomBanner / 30);
    ((ctx.globalAlpha = t),
      fill("#04030bcc", 46, 6, 100, 12),
      text(e.name, 96 - 2.5 * e.name.length, 8.5, "#ffe070", '5px "Press Start 2P",monospace'),
      (ctx.globalAlpha = 1));
  }
  if ("stair" === room) {
    const t = Math.max(1, Math.min(10, Math.round(10 - ((player.y - 58) / 264) * 9)));
    (fill("#04030bcc", 70, 20, 52, 9),
      text("FLOOR " + t, 74, 22, "#9aff9a", '5px "Press Start 2P",monospace'));
  }
  (!(function (t) {
    const a = De[room] || De.pod;
    (ctx.save(), (ctx.globalCompositeOperation = "soft-light"));
    const e = ctx.createLinearGradient(0, 0, 0, 108);
    (e.addColorStop(0, "rgba(" + a.l + ",.22)"),
      e.addColorStop(1, "rgba(4,10,8,.32)"),
      (ctx.fillStyle = e),
      ctx.fillRect(0, 0, dt, bt),
      (ctx.globalCompositeOperation = "lighter"),
      (ctx.globalAlpha = 0.05),
      (ctx.fillStyle = "rgb(" + a.l + ")"),
      ctx.fillRect(0, 0, dt, 28),
      ctx.restore(),
      ctx.save(),
      (ctx.globalCompositeOperation = "screen"),
      (ctx.globalAlpha = 0.06 + 0.015 * Math.sin(t / 1700)),
      (ctx.filter = "blur(3px) brightness(1.4)"));
    try {
      ctx.drawImage(ctx.canvas, 0, 0, 384, 216, 0, 0, dt, bt);
    } catch (t) {}
    ctx.restore();
    for (let a = 0; a < 70; a++) {
      const e = r(a, 71) * dt,
        o = (r(a, 72) * bt + t * (0.003 + (a % 4) * 0.002)) % bt;
      fill(
        a % 3 ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.09)",
        Math.round(2 * e) / 2,
        Math.round(2 * o) / 2,
        0.5,
        0.5,
      );
    }
  })(t),
    ctx.drawImage(zt(), 0, 0, dt, bt),
    cine ? $dOv() : $dTitle(),
    hurtFlash > 0 &&
      ((ctx.fillStyle = "rgba(255,30,50," + (hurtFlash / 14) * 0.28 + ")"),
      ctx.fillRect(0, 0, dt, bt)),
    ctx.restore(),
    fadeNow > 0 &&
      ((ctx.fillStyle = "rgba(0,0,0," + Math.min(1, fadeNow) + ")"), ctx.fillRect(0, 0, 384, 216)),
    (function () {
      if (!Eo.on || !GM.on || (!Eo.dbg && !Eo.tmr))
        return void ("" !== Ho && ((Ho = ""), (Fo.hidden = !0)));
      let t = "";
      (Eo.tmr && (t += "RUN " + Wo(runT) + (won ? " DONE" : "")),
        Eo.dbg &&
          (t +=
            (t ? "\n" : "") +
            room +
            "  x" +
            (0 | player.x) +
            " y" +
            (0 | player.y) +
            (1 !== Eo.ts ? "  speed " + Eo.ts + "x" : "") +
            "\nhp " +
            hp +
            "  ammo " +
            (Eo.ammo ? "inf" : ammo) +
            "  stage " +
            stage +
            (snakeBoss
              ? "\nboss " + snakeBoss.st + " " + Math.max(0, 0 | snakeBoss.hp) + "hp"
              : "") +
            "\nfps " +
            (0 | tr)),
        t !== Ho && ((Ho = t), (Fo.textContent = t), (Fo.hidden = !1)));
    })());
}
function frameLoop(t) {
  if (GM.on) {
    for (
      ar && (tr = 0.9 * tr + (1e3 / Math.max(1, t - ar)) * 0.1),
        ar = t,
        lt || (lt = t),
        st += Math.min(100, t - lt) * (Eo.ts || 1),
        lt = t,
        st > 400 && (st = 400);
      st >= 16.67;
    )
      (update(), (st -= 16.67));
    (render(), (Ot = requestAnimationFrame(frameLoop)));
  }
}
