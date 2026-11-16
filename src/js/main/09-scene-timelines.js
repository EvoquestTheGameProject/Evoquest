const le = {
  street: function (t) {
    (wt(1.06, 96 + Math.min(4, 7e-4 * t), 54),
      Mt("street", Sa),
      (function (t) {
        for (let a = 0; a < 70; a++) {
          const e = (2 + 104 * r(a, 1)) | 0,
            o = (26 + 54 * r(a, 2)) | 0;
          r(a, 3) < 0.55 &&
            r(a + ((t / 900) | 0), 7) < 0.9 &&
            rect(r(a, 4) < 0.7 ? "rgba(255,220,130,.8)" : "rgba(130,220,255,.7)", e, o, 1.4, 1.2);
        }
        [
          [14, 24],
          [50, 34],
          [78, 44],
          [95, 56],
        ].forEach(([a, e], o) => {
          (((t / 500 + o) | 0) % 2 && rect("#ff3a3a", a, e, 1, 1),
            glow(a + 0.5, e + 0.5, 4, "255,60,60", ((t / 500 + o) | 0) % 2 ? 0.5 : 0.1));
        });
        {
          const a = r((t / 110) | 0, 5) < 0.1 ? 0.3 : 1;
          (rect("rgba(255,70,180," + 0.5 * a + ")", 64, 40, 16, 6),
            rect("rgba(255,150,220," + 0.8 * a + ")", 65, 41, 14, 1),
            rect("rgba(255,150,220," + 0.8 * a + ")", 65, 45, 14, 1),
            glow(72, 43, 16, "255,70,180", 0.25 * a));
        }
        for (let a = 0; a < 3; a++) {
          const e = ((t / 70 + 50 * a) % 200) - 10,
            o = 20 + 3 * Math.sin(t / 300 + a) + 4 * a,
            r = (t / 110 + a) & 1;
          (rect("#1a1228", e, o + r, 2, 0.7), rect("#1a1228", e + 2, o + (r ? 0 : 1), 2, 0.7));
        }
        (rect("#2a2430", 128, 32, 15, 9),
          rect("#403a4a", 128, 32, 15, 1),
          rect("#14101c", 129.5, 33.6, 12, 5.6));
        for (let t = 0; t < 4; t++) rect("rgba(120,110,140,.8)", 130 + 3 * t, 33.6, 0.6, 5.6);
        {
          const a = t / 60;
          ((ctx.strokeStyle = "rgba(150,140,170,.9)"), (ctx.lineWidth = 0.4));
          for (let t = 0; t < 3; t++) {
            const e = a + 2.1 * t;
            (ctx.beginPath(),
              ctx.moveTo(135.5, 36.4),
              ctx.lineTo(135.5 + 3.4 * Math.cos(e), 36.4 + 2.4 * Math.sin(e)),
              ctx.stroke());
          }
        }
        (rect("#1a1622", 129, 41, 1.6, 3),
          ((t / 500) | 0) % 3 == 0 &&
            rect("rgba(150,200,255,.8)", 129.4, 44 + ((t / 80) % 4), 0.6, 1),
          rect("#101018", 160, 32, 22, 18),
          rect("#241c2c", 161, 33, 20, 16));
        const a = r((t / 800) | 0, 2) < 0.8;
        rect(a ? "rgba(255,190,100,.85)" : "rgba(120,80,40,.6)", 162, 34, 18, 14);
        for (let t = 0; t < 5; t++) rect("#0a0810", 163 + 3.6 * t, 34, 0.8, 14);
        (rect("#0a0810", 162, 41, 18, 0.8),
          a && glow(171, 41, 18, "255,190,100", 0.25),
          rect("#2a2638", 124, 56, 9, 13),
          rect("#3a3448", 124, 56, 9, 1),
          rect("#8a1a1a", 126, 59, 1.2, 1.2),
          rect("#1a8a3a", 129, 59, 1.2, 1.2),
          (ctx.strokeStyle = "#0a0810"),
          (ctx.lineWidth = 0.6),
          ctx.beginPath(),
          ctx.moveTo(128, 69),
          ctx.quadraticCurveTo(122, 74, 118, 80),
          ctx.stroke(),
          ctx.beginPath(),
          ctx.moveTo(131, 69),
          ctx.quadraticCurveTo(138, 72, 146, 70),
          ctx.stroke(),
          [
            [150, 66, "#ff4aa0"],
            [152, 64, "#4ad8ff"],
          ].forEach(([t, a, e], o) => {
            ((ctx.strokeStyle = e),
              (ctx.lineWidth = 1.1),
              ctx.beginPath(),
              ctx.moveTo(t, a + 8),
              ctx.quadraticCurveTo(t + 4, a - 2, t + 9, a + 5),
              ctx.quadraticCurveTo(t + 14, a + 12, t + 19, a + 2),
              ctx.stroke(),
              rect(e, t + 19, a + 2, 1.2, 1.2));
          }),
          rect("rgba(200,200,210,.7)", 166, 70, 1, 5),
          rect("rgba(200,200,210,.7)", 169, 70, 1, 5),
          rect("rgba(200,200,210,.7)", 166, 72, 4, 1),
          rect("#2a1620", 176, 52, 12, 7),
          rect("#ff3a6a", 177, 53, 10, 1),
          rect("#ff3a6a", 177, 57, 10, 1),
          rect("#ff3a6a", 177, 53, 1, 5),
          rect("#ff3a6a", 186, 53, 1, 5),
          r((t / 90) | 0, 9) < 0.8 &&
            (rect("rgba(255,100,140,.9)", 179, 54.4, 6, 2), glow(182, 56, 14, "255,60,110", 0.35)));
        for (let t = 0; t < 26; t++) {
          const a = 110 + 80 * r(t, 1),
            e = 30 + 50 * r(t, 2);
          rect("rgba(0,0,0,.16)", a, e, 5 + 8 * r(t, 3), 1);
        }
        for (let t = -6; t < 200; t += 19)
          (rect("rgba(30,24,44,.7)", t, 82, 0.8, 8),
            rect("rgba(255,255,255,.07)", t + 1, 82, 0.6, 8));
        for (let t = 84.6; t < 90; t += 2.6) rect("rgba(30,24,44,.3)", 0, t, dt, 0.5);
        [
          [30, 86],
          [88, 85],
          [150, 87],
          [182, 84],
        ].forEach(([a, e], o) => {
          ((ctx.strokeStyle = "rgba(12,8,22,.9)"),
            (ctx.lineWidth = 0.5),
            ctx.beginPath(),
            ctx.moveTo(a, e),
            ctx.lineTo(a + 3, e + 1.6),
            ctx.lineTo(a + 2, e + 3.4),
            ctx.lineTo(a + 6, e + 4),
            ctx.stroke());
          for (let r = 0; r < 3; r++) {
            const n = 0.5 * Math.sin(t / 700 + r + o);
            (rect("#3a8a40", a + 2 + r, e + 1.4 - (r % 2) * 1.4 + n, 0.7, 1.8),
              rect("#6ad06a", a + 2 + r, e + 1.2 - (r % 2) * 1.4 + n, 0.7, 0.7));
          }
        });
        for (let t = 0; t < 20; t++)
          rect(
            t % 3 ? "rgba(60,40,70,.7)" : "rgba(200,170,120,.6)",
            r(t, 5) * dt,
            83 + 6 * r(t, 6),
            1,
            1,
          );
        for (let t = 0; t < 5; t++) {
          const a = 22 + 37 * t + 10 * r(t, 2),
            e = 83 + 5 * r(t, 3);
          (rect("#a8782a", a, e, 2, 0.8), rect("#d8a050", a, e, 1, 0.8));
        }
        ([
          [70, 89],
          [147, 89],
        ].forEach(([a, e], o) => {
          const r = ((t / 600 + 3 * o) | 0) % 6 < 1 ? 1 : 0;
          (rect("#6a6678", a, e - 3 - r, 3, 2.2),
            rect("#8a869a", a, e - 3 - r, 3, 0.8),
            rect("#6a6678", a + 2.4, e - 4 - 1.6 * r, 1.8, 1.4),
            rect("#d89a3a", a + 3.8, e - 3.8 - 1.6 * r, 1, 0.5),
            rect("#4a465a", a + 0.5, e - 0.8, 0.6, 1),
            rect("#4a465a", a + 1.8, e - 0.8, 0.6, 1));
        }),
          rect("rgba(120,90,160,.5)", 40, 89.4, 32, 0.6),
          rect("rgba(190,170,230,.75)", 0, 90, dt, 0.9),
          rect("rgba(20,14,30,.9)", 0, 90.9, dt, 0.7));
        for (let t = 4; t < dt; t += 31) rect("rgba(10,6,16,.9)", t, 90.2, 3 + 3 * r(t, 1), 0.7);
        for (let t = -6; t < dt; t += 28)
          r(t, 3) < 0.85 && rect("rgba(220,190,90,.75)", t, 96.4, 14 - 4 * r(t, 4), 0.9);
        for (let t = 0; t < 7; t++)
          rect("rgba(220,210,200," + (0.2 + 0.3 * r(t, 2)) + ")", 146 + 5.2 * t, 91.6, 3, 10);
        (rect("rgba(10,6,16,.9)", 100, 94, 0, 0),
          [
            [104, 97.5, 8, 2.2],
            [40, 99, 7, 2],
          ].forEach(([t, a, e, o], r) => {
            ((ctx.fillStyle = r ? "#0a0814" : "#14101c"),
              ctx.beginPath(),
              ctx.ellipse(t, a, e, o, 0, 0, 6.3),
              ctx.fill(),
              (ctx.strokeStyle = "rgba(120,110,150,.8)"),
              (ctx.lineWidth = 0.4),
              ctx.beginPath(),
              ctx.ellipse(t, a, e, o, 0, 0, 6.3),
              ctx.stroke());
            for (let e = -3; e <= 3; e++)
              rect("rgba(70,60,90,.9)", t + 2 * e, a - o + 0.4, 0.5, 1.8 * o);
          }),
          [
            [24, 98.5, 26],
            [132, 99.6, 22],
          ].forEach(([a, e, o], r) => {
            ((ctx.fillStyle = "rgba(20,30,70,.55)"),
              ctx.beginPath(),
              ctx.ellipse(a, e, o / 2, 1.7, 0, 0, 6.3),
              ctx.fill(),
              rect("rgba(255,120,200,.5)", a - o / 4, e - 0.6, o / 3, 0.8),
              rect("rgba(120,220,255,.4)", a + 2, e + 0.2, o / 4, 0.8));
            const n = (t / 500 + 0.5 * r) % 1;
            ((ctx.strokeStyle = "rgba(180,200,255," + 0.5 * (1 - n) + ")"),
              (ctx.lineWidth = 0.35),
              ctx.beginPath(),
              ctx.ellipse(a + 4 * Math.sin(5 * r), e, 5 * n, 1.2 * n, 0, 0, 6.3),
              ctx.stroke());
          }),
          (ctx.strokeStyle = "rgba(6,4,12,.9)"),
          (ctx.lineWidth = 0.5),
          [
            [60, 93, 4],
            [120, 100, 5],
            [175, 95, 3],
          ].forEach(([t, a, e]) => {
            (ctx.beginPath(), ctx.moveTo(t, a));
            for (let o = 1; o <= e; o++)
              ctx.lineTo(t + 3 * o + 2 * r(o, t), a + (o % 2 ? 1.4 : -1.2));
            ctx.stroke();
          }));
        for (let t = 0; t < 12; t++)
          rect("rgba(10,6,16,.5)", r(t, 8) * dt, 92 + 9 * r(t, 9), 5 + 9 * r(t, 3), 0.6);
        ([
          [84, 99],
          [170, 100],
        ].forEach(([t, a], e) => {
          ((ctx.fillStyle = "rgba(60,200,150,.18)"),
            ctx.beginPath(),
            ctx.ellipse(t, a, 5, 1, 0, 0, 6.3),
            ctx.fill(),
            (ctx.fillStyle = "rgba(200,80,220,.14)"),
            ctx.beginPath(),
            ctx.ellipse(t + 2, a, 3.5, 0.8, 0, 0, 6.3),
            ctx.fill());
        }),
          rect("#c8c0b0", 92, 100.4, 2, 1.4),
          rect("#a82020", 92, 100.4, 2, 0.5),
          rect("#d8d0c0", 14, 97, 3, 1.2),
          rect("#e8e8e8", 160, 100.6, 2.4, 1));
        for (let t = 0; t < dt; t += 6)
          rect("rgba(255,255,255," + (0.03 + 0.05 * r(t, 2)) + ")", t, 91 + 10 * r(t, 5), 1.5, 0.5);
      })(t),
      [
        [((t / 90 + 30) % 230) - 30, 12, 24],
        [((t / 90 + 42) % 230) - 30, 9, 14],
        [((t / 130 + 120) % 230) - 30, 22, 20],
      ].forEach(([t, a, e]) => {
        (rect("rgba(255,150,190,.55)", t, a, e, 3),
          rect("rgba(255,210,200,.45)", t + 2, a - 1.5, e - 6, 1.5));
      }));
    const a = 0.55 + 0.15 * Math.sin(t / 300);
    [30, 120].forEach((t) => {
      (rect("#ffe9a8", t - 1, 37, 4, 2),
        glow(t + 1, 38, 16, "255,225,150", 0.5 * a),
        rect("rgba(255,225,150," + 0.25 * a + ")", t - 1, 92, 4, 12));
    });
    const e = ((t / 11) % 330) - 70;
    (Ft(e + 18, 95, 26, 0.6),
      rect("#b8362a", e, 86, 36, 8),
      rect("#d44a3a", e, 86, 36, 2),
      rect("#b8362a", e + 6, 80, 22, 7),
      rect("#7fd8ff", e + 8, 81, 8, 5),
      rect("#7fd8ff", e + 18, 81, 8, 5),
      rect("#0d0a16", e + 4, 92, 7, 5),
      rect("#0d0a16", e + 24, 92, 7, 5),
      rect("#888", e + 6, 94, 3, 2),
      rect("#888", e + 26, 94, 3, 2),
      rect("#ffe9a8", e + 35, 88, 2, 2),
      glow(e + 38, 89, 22, "255,240,180", 0.55),
      Ma(200 - ((t / 45) % 260), 87, yt(7, 3, 9, 2, { hs: 3, gd: 1 }), (t / 160) | 0, -1),
      Ma(((t / 60) % 260) - 30, 88, yt(4, 5, 5, 0, { hs: 6 }), (t / 150) | 0, 1));
    const o = Math.min(122, 0.026 * t - 12),
      n = o < 122;
    if ((Ma(o, 87, playerLook, n ? (t / 150) | 0 : 0, 1), n))
      for (let t = 0; t < 4; t++)
        rect(
          "rgba(220,210,190," + (0.4 - 0.09 * t) + ")",
          o - 5 - 3 * t,
          86 - 0.8 * t,
          2 + t,
          1 + 0.5 * t,
        );
    if (!n && t > 5200) {
      const a = (t / 200) & 1;
      (rect("#ffd34a", o - 0.5, 53 + a, 2, 6), rect("#ffd34a", o - 0.5, 61 + a, 2, 2));
    }
    for (let a = 0; a < 22; a++)
      rect(
        "rgba(255,235,180,.7)",
        (r(a, 3) * dt + 0.01 * t * (1 + (a % 3))) % dt,
        70 * r(a, 4) + 3 * Math.sin(t / 500 + a),
        0.5,
        0.5,
      );
    [0, 1].forEach((a) => {
      const e = ((t / 30 + 60 * a) % 240) - 20,
        o = 18 + 8 * a + 2 * Math.sin(t / 200 + a),
        r = (t / 120) & 1;
      (rect("#222", e, o + r, 2, 0.5), rect("#222", e + 2, o + (r ? 0 : 1), 2, 0.5));
    });
  },
  poster: function (t) {
    (wt(1 + Math.min(0.08, 2e-5 * t), 96, 54), Mt("poster", Ca));
    const a = (t, a, e) => text(t, 96 - 4 * t.length, a, e);
    (a("VOLUNTEER FOR", 14, "#c8442a"),
      a("CRYOFREEZING", 28, ((t / 180) | 0) % 7 == 0 ? "#6fa0ff" : "#1f5fd6"),
      a("FOR YOUR FAMILY", 46, "#2a2a2a"),
      a("TO WIN", 58, "#2a2a2a"),
      a("1 MILLION DOLLARS", 70, "#b8860b"),
      (t / 400) & 1 && a("CALL 555-0199", 86, "#c8442a"),
      glow(96 + 40 * Math.sin(t / 900), 40, 90, "255,230,160", 0.28));
    for (let a = 0; a < 40; a++)
      rect(
        "rgba(255,255,255,.5)",
        (r(a, 3) * dt + 0.02 * t) % dt,
        (r(a, 4) * bt + t * (0.012 + (a % 4) * 0.004)) % bt,
        0.5,
        1.5,
      );
  },
  call: function (t) {
    if (
      (((t) => {
        const a = ctx.createLinearGradient(0, 0, 0, 108);
        (t.forEach((e, o) => a.addColorStop(o / (t.length - 1), e)),
          (ctx.fillStyle = a),
          ctx.fillRect(0, 0, dt, 109));
      })(["#0a1430", "#10224a", "#152d5e"]),
      t < 2600)
    ) {
      (rect("#1a1f2e", 56, 10, 80, 90),
        rect("#2a3350", 58, 12, 76, 86),
        rect("#0b1020", 61, 18, 70, 70),
        glow(96, 54, 70, "155,231,255", 0.2));
      for (let a = 0; a < 3; a++) {
        const e = (t / 25 + 18 * a) % 54;
        ((ctx.fillStyle = "rgba(155,231,255," + 0.6 * (1 - e / 54) + ")"),
          ctx.fillRect(96 - e, 54 - e, 2 * e, 1),
          ctx.fillRect(96 - e, 54 + e, 2 * e, 1),
          ctx.fillRect(96 - e, 54 - e, 1, 2 * e),
          ctx.fillRect(96 + e, 54 - e, 1, 2 * e));
      }
      (text("CALLING", 68, 24, "#9be7ff"), text("555-0199", 64, 70, "#5fcf45"));
      const a = (t / 300) & 1;
      return (rect("#5fcf45", 90, 42, 12, 12), void rect("#fff", 93, 46 + a, 6, 2));
    }
    const a = "p" === speaker,
      e = "a" === speaker;
    if (
      (ctx.save(),
      ctx.beginPath(),
      ctx.rect(0, 0, 96, bt),
      ctx.clip(),
      Mt("callL", Ra),
      rect(a ? "rgba(45,210,255,.13)" : "rgba(0,0,0,.22)", 0, 0, 96, bt),
      glow(42, 48, a ? 68 : 38, "65,220,255", a ? 0.48 : 0.18),
      rect("#101a32", 8, 72, 80, 42),
      rect("#263c5c", 12, 70, 72, 4),
      rect("#9be7ff", 12, 70, 72, 1),
      Ma(48, 112, playerLook, Math.floor(t / 150), 1, { s: 3.65, phone: 1, talk: a, glow: a }),
      rect("rgba(3,8,20,.82)", 4, 5, 88, 14),
      text("CALLER  /  YOU", 10, 9, a ? "#9bfff1" : "#8ca6c5", '7px "Press Start 2P"'),
      a)
    ) {
      glow(48, 46, 32, "80,230,255", 0.22);
      for (let a = 0; a < 7; a++)
        rect("rgba(130,240,255,.55)", 16 + 10 * a, 62 + 3 * Math.sin(t / 90 + a), 1, 4);
    }
    if (
      (ctx.restore(),
      ctx.save(),
      ctx.beginPath(),
      ctx.rect(96, 0, 96, bt),
      ctx.clip(),
      Mt("callR", Pa),
      rect(e ? "rgba(40,255,170,.12)" : "rgba(0,0,0,.22)", 96, 0, 96, bt),
      glow(148, 48, e ? 70 : 36, "70,255,190", e ? 0.48 : 0.16),
      rect("#101a32", 104, 72, 80, 42),
      rect("#314b54", 108, 70, 72, 4),
      rect("#7dffca", 108, 70, 72, 1),
      Ma(144, 112, yt(3, 2, 1, 9, { cl: 4, hc: 5, oc: 4, tc: 2, ey: 3 }), Math.floor(t / 150), -1, {
        s: 3.65,
        headset: 1,
        talk: e,
        glow: e,
      }),
      rect("rgba(3,8,20,.82)", 100, 5, 88, 14),
      text("CRYOFREEZE  /  AGENT", 105, 9, e ? "#9bffd2" : "#8ca6c5", '6px "Press Start 2P"'),
      glow(168, 72, 24, "120,255,200", 0.3),
      e)
    )
      for (let a = 0; a < 7; a++)
        rect("rgba(130,255,210,.5)", 108 + 10 * a, 62 + 3 * Math.sin(t / 85 + a), 1, 4);
    (ctx.restore(), rect("#9be7ff", 95.5, 0, 1, bt), glow(96, 54, 30, "155,231,255", 0.2));
    const o = "p" === speaker ? 66 : "a" === speaker ? 126 : 91;
    if (speaker)
      for (let a = 0; a < 13; a++) {
        const e = 2 + 7 * Math.abs(Math.sin(t / 65 + 0.72 * a));
        rect("p" === speaker ? "#79eaff" : "#78ffc8", o + 2 * a, 46 - e / 2, e > 6 ? 2 : 1, e);
      }
    text(
      "SECURE LINE  •  00:" + String(Math.max(0, Math.floor((t - 2600) / 1e3))).padStart(2, "0"),
      8,
      194,
      "#9be7ff",
      '6px "Press Start 2P"',
    );
  },
  pod: function (t) {
    (wt(1 + Math.min(0.07, 1e-5 * t), 96, 60),
      Mt("podL", () => Wa(0)),
      r((t / 90) | 0, 2) < 0.1 && rect("rgba(0,0,0,.2)", 0, 0, dt, bt),
      za(t, 0),
      qa(t, 0));
    const a = Math.max(0, Math.min(1, (t - 800) / 3200));
    (ja(t, 0),
      Ya(t, { level: a, frost: Math.max(0, Math.min(1, (t - 4200) / 2400)), sink: 0, pct: "" }),
      Ua(t, "170,255,220"),
      ja(t, 1));
    for (let a = 0; a < 3; a++)
      rect("rgba(120,255,200,.5)", 20 + ((t / 22 + 60 * a) % 150), 3 + a, 5, 1);
  },
  lab: function (t) {
    const a = t - 5e3,
      e = a > 0 && a < 1400 ? 4 * (1 - a / 1400) : 0;
    (wt(1.04, 96, 54),
      ctx.translate(Math.sin(t / 17) * e * 0.8, Math.cos(t / 23) * e * 0.8),
      Mt("labw2", Ja));
    const o = a > 250 && a < 4200 && ((t / 90) & 3) > 0,
      n = !(a > 200 && r((t / 70) | 0, 3) < 0.55);
    for (let t = 0; t < 4; t++)
      (n || a < 0) && glow(33 + 47 * t, 8, 30, "200,235,255", a > 0 ? 0.18 : 0.3);
    if (a < 0) {
      ((ctx.strokeStyle = "rgba(180,200,215,.7)"), (ctx.lineWidth = 0.6));
      for (let a = 0; a < 3; a++) {
        const e = t / 40 + 2.094 * a;
        (ctx.beginPath(),
          ctx.moveTo(11.5, 69),
          ctx.lineTo(11.5 + 4 * Math.cos(e), 69 + 4 * Math.sin(e)),
          ctx.stroke());
      }
      rect(((t / 350) | 0) % 2 ? "#4aff6a" : "#103a1a", 9, 75, 1.4, 1);
    }
    (a < 0 || a < 400) && rect("#4a5a6a", 100, 75, 0, 0);
    const l = 77,
      s = 34;
    if (t < 3500) {
      rect("rgba(6,40,36,.95)", l, 49, s, 23);
      for (let a = 0; a < s; a++) {
        const e =
          3 * Math.sin(0.5 * a + t / 260) +
          3 * Math.sin(0.21 * a - t / 410) +
          0.9 * Math.sin(1.3 * a + t / 90);
        (rect("#5dffd0", l + a, 57 - e, 1, 1),
          rect("rgba(93,255,208,.25)", l + a, 57 - e + 1, 1, Math.max(0, e + 2)));
      }
      for (let a = 0; a < 5; a++) {
        const e = ((t / 160) | 0) + a;
        (rect("#2a9a80", 78, 64 + 1.4 * a, 2, 0.6),
          rect("rgba(125,255,154,.8)", 81, 64 + 1.4 * a, 4 + 20 * r(e, a), 0.6));
      }
      (text("SPECTRA / SAMPLE 07", 78, 49.6, "#7dffd0", "4px monospace"),
        (ctx.strokeStyle = "rgba(125,255,154,.8)"),
        (ctx.lineWidth = 0.4),
        ctx.beginPath());
      for (let a = 0; a < 6; a++) {
        const e = 1.047 * a + t / 700,
          o = 104 + 3 * Math.cos(e),
          r = 66 + 3 * Math.sin(e);
        a ? ctx.lineTo(o, r) : ctx.moveTo(o, r);
      }
      (ctx.closePath(), ctx.stroke(), glow(94, 60, 22, "90,255,200", 0.2));
    } else if (a < 0 || o) {
      const a = (t / 200) & 1;
      rect(a ? "rgba(80,6,6,.95)" : "rgba(40,4,4,.95)", l, 49, s, 23);
      for (let a = 0; a < s; a++) {
        const e = (a % 7 == 3 ? 9 : 1) * Math.sin(t / 60 + a) + (a > 14 && a < 20 ? -8 : 0);
        rect("#ff4a4a", l + a, 61 - e, 1, 1);
      }
      (text("FAILED", 82, 52, a ? "#ff5a5a" : "#ffb0a0", "6px monospace"),
        text("CONTAINMENT", 80, 66, "#ff7a6a", "4px monospace"),
        glow(94, 60, 26, "255,50,40", 0.3));
    } else
      (rect("rgba(10,4,4,.95)", l, 49, s, 23),
        r((t / 80) | 0, 2) < 0.3 &&
          rect("rgba(255,80,60,.6)", l, 49 + 20 * r((t / 80) | 0, 3), s, 1));
    const c = t > 3500 ? "255,110,50" : null;
    if (a < 0 || a < 50) {
      ([
        [24, 0, "#5dff7a"],
        [44, 1, "#4da3ff"],
        [62, 2, "#ff6fb5"],
      ].forEach(([a, e, o], n) => {
        (!(function (t, a, e, o, n, l, s) {
          const c = (a, e) => {
            for (let o = 0; o < a; o++) {
              const s = (n / 45 + o * (e / a) + 5 * l) % e;
              rect("rgba(255,255,255,.75)", t - 3 + 6 * r(o, l + 3), 76 - s, 0.7, 0.7);
            }
          };
          if (0 === e)
            (rect("rgba(0,0,0,.35)", t - 7, 78, 14, 1.4),
              (ctx.fillStyle = "rgba(200,235,250,.35)"),
              ctx.beginPath(),
              ctx.moveTo(t - 2, 58),
              ctx.lineTo(t + 2, 58),
              ctx.lineTo(t + 2, 66),
              ctx.lineTo(t + 7, 78),
              ctx.lineTo(t - 7, 78),
              ctx.lineTo(t - 2, 66),
              ctx.closePath(),
              ctx.fill(),
              (ctx.fillStyle = o),
              ctx.beginPath(),
              ctx.moveTo(t - 5, 71),
              ctx.lineTo(t + 5, 71),
              ctx.lineTo(t + 6.6, 77),
              ctx.lineTo(t - 6.6, 77),
              ctx.closePath(),
              ctx.fill(),
              rect("rgba(255,255,255,.65)", t - 5, 71, 10, 0.8),
              rect("rgba(255,255,255,.55)", t - 3, 60, 0.8, 10),
              rect("#9a6a3a", t - 2.4, 56, 4.8, 2.4),
              rect("rgba(255,255,255,.25)", t - 6, 75, 2, 1),
              c(5, 9),
              glow(t, 74, 16, s || "120,255,150", 0.35));
          else if (1 === e)
            (rect("rgba(0,0,0,.35)", t - 8, 78, 16, 1.4),
              rect("#2a3a48", t - 8, 77, 16, 1.5),
              rect("#6a7a88", t - 8, 77, 16, 0.5),
              (ctx.fillStyle = "rgba(200,235,250,.35)"),
              ctx.beginPath(),
              ctx.arc(t, 70, 7.6, 0, 6.3),
              ctx.fill(),
              ctx.fillRect(t - 2, 57, 4, 8),
              (ctx.fillStyle = o),
              ctx.beginPath(),
              ctx.arc(t, 71, 6.2, 0.1, 3.05),
              ctx.closePath(),
              ctx.fill(),
              rect("rgba(255,255,255,.7)", t - 5, 70, 10, 0.6),
              rect("rgba(255,255,255,.55)", t - 5, 66, 1.2, 3),
              rect("#9a6a3a", t - 2.4, 55, 4.8, 2.4),
              c(6, 9),
              glow(t, 72, 16, s || "90,170,255", 0.35));
          else {
            (rect("rgba(0,0,0,.35)", t - 5, 78, 10, 1.4),
              rect("rgba(200,235,250,.35)", t - 3, 54, 6, 24),
              rect("#aab8c4", t - 5, 77, 10, 1.4),
              rect(o, t - 2.4, 66, 4.8, 11),
              rect("rgba(255,255,255,.7)", t - 2.4, 66, 4.8, 0.7));
            for (let a = 0; a < 6; a++) rect("rgba(40,60,80,.8)", t + 1.2, 56 + 3.4 * a, 1.6, 0.4);
            (rect("rgba(255,255,255,.55)", t - 2.6, 56, 0.6, 20),
              c(4, 10),
              glow(t, 70, 13, s || "255,120,190", 0.35));
          }
        })(a, 0, e, o, t, n, c),
          t > 3500 && glow(a, 68, 22, "255,110,50", 0.35 + 0.15 * Math.sin(t / 60 + n)));
      }),
        (ctx.strokeStyle = "rgba(200,230,245,.6)"),
        (ctx.lineWidth = 0.5),
        ctx.beginPath(),
        ctx.moveTo(24, 62),
        ctx.quadraticCurveTo(34, 52, 44, 58),
        ctx.quadraticCurveTo(54, 52, 62, 56),
        ctx.stroke(),
        rect("rgba(5,10,16,.8)", 70, 70, 12, 8),
        rect("#e8f0f4", 70, 70, 12, 1));
      for (let t = 0; t < 5; t++) {
        const a = ["#ff6a6a", "#6aff8a", "#6ab0ff", "#ffd86a", "#d86aff"][t];
        (rect("rgba(220,235,245,.4)", 70 + 2.2 * t, 66, 1.6, 9), rect(a, 70 + 2.2 * t, 70, 1.6, 5));
      }
    } else
      [
        [24, 78],
        [44, 78],
        [62, 78],
      ].forEach(([t, a], e) => {
        (rect("rgba(190,240,255,.8)", t - 5, a - 2, 4, 1),
          rect("rgba(190,240,255,.8)", t + 2, a - 1, 3, 1),
          rect("rgba(120,200,255,.6)", t - 1, a - 3, 1, 2));
      });
    const i = a < 0;
    if (
      ((function (t, a, e, o, n, l, s) {
        (rect("rgba(0,0,0,.35)", 135, 78, 36, 1.6),
          rect("#c8d8e4", t, 73, e, 5),
          rect("#fff", t, 73, e, 0.7),
          rect("#7a8a98", t, 77.2, e, 0.8),
          rect("rgba(120,170,200,.2)", t, 73, e, 5),
          rect("#d8b878", 137, 73, 32, 2));
        for (let t = 0; t < 14; t++)
          rect(t % 2 ? "#c8a460" : "#e8cc90", 138 + 28 * r(t, 5), 72.6 + r(t, 6), 2, 0.7);
        (rect("#a87a5a", 157, 66, 11, 7),
          rect("#7a5238", 157, 66, 11, 1),
          rect("#1a0e0a", 160, 69, 4, 4),
          rect("#c89a78", 157, 66, 2, 7),
          rect("#9aa7b4", 138, 71, 5, 2),
          rect("#c8a060", 139, 70, 3, 1));
        ((ctx.strokeStyle = "#8a98a6"),
          (ctx.lineWidth = 0.5),
          ctx.beginPath(),
          ctx.arc(155, 70, 5, 0, 6.3),
          ctx.stroke());
        for (let t = 0; t < 4; t++) {
          const a = n / (s ? 400 : 900) + 1.57 * t;
          (ctx.beginPath(),
            ctx.moveTo(155, 70),
            ctx.lineTo(155 + 5 * Math.cos(a), 70 + 5 * Math.sin(a)),
            ctx.stroke());
        }
        if (
          (rect("#6a7a88", 154, 75, 2, 3),
          rect("rgba(200,235,250,.7)", 171, 54, 4, 12),
          rect("rgba(100,200,255,.7)", 171.4, 58, 3, 8),
          rect("#aab8c4", 168, 56, 3, 1),
          rect("#aab8c4", 174, 65, 1, 2),
          ((n / 700) | 0) % 4 == 0 &&
            rect("rgba(150,220,255,.9)", 172, 67 + ((n / 60) % 6), 0.6, 1),
          !l)
        ) {
          for (let a = t; a <= 170; a += 3) rect("#aab8c4", a, 48, 0.6, 25);
          (rect("#d8e4ec", t, 48, 34.6, 1.2),
            rect("#8a98a6", t, 49.2, e, 0.4),
            rect("rgba(150,200,230,.12)", t, 48, e, 25));
        }
      })(136, 0, 34, 0, t, !i && a > 300, i),
      i)
    ) {
      const a = 148 + 9 * Math.sin(t / 1400),
        e = Math.cos(t / 1400) > 0 ? 1 : -1,
        o = t > 3500 ? 1 : 0,
        r = Math.max(0, Math.min(1, (t - 3500) / 1500));
      (ctx.save(),
        ctx.translate(a + (t > 3500 ? Math.sin(t / 38) * (0.3 + 0.8 * r) : 0), 77.4),
        ctx.scale(1 + 0.35 * r, 1 + 0.35 * r),
        Xa(0, 0, t, e, o),
        ctx.restore());
    } else {
      const e = 1 + Math.min(1.2, a / 1400),
        o = 151 - 3 * e - 0.012 * Math.max(0, t - 7500);
      if (a < 1100) {
        const e = a / 1100,
          o = 148;
        for (let t = 0; t < 26; t++) {
          Math.min(1, a / 400);
          const e = t / 26,
            r = 44 + (o - 44) * Math.min(1, 0.0016 * a + 0.5 * e),
            n = 70 - 26 * Math.sin(3.14 * Math.min(1, 0.0016 * a + 0.5 * e)) + 2 * e;
          a < 750 && rect(t % 2 ? "#7dff5a" : "#c8ff90", r, n, 1.4, 1.4);
        }
        (ctx.save(),
          ctx.translate(o, 77.4),
          ctx.scale(1.35 + 0.9 * e, 1.35 + 0.9 * e),
          (ctx.globalAlpha = 1 - Math.min(1, Math.max(0, (e - 0.45) / 0.55))),
          Xa(0, 0, t, -1, 1),
          (ctx.strokeStyle = "#3a2a2a"),
          (ctx.lineWidth = 0.6));
        for (let t = 0; t < 8; t++) {
          const o = 0.5 * t - 1.2,
            r = Math.min(1, a / 500) * (5 + (t % 3) * 2) * e * 3;
          (ctx.beginPath(),
            ctx.moveTo(0.6 * t - 1, -4),
            ctx.lineTo(0.6 * t - 1 + Math.cos(o) * r * 0.5, Math.sin(o) * r * 0.6 - 4),
            ctx.stroke());
        }
        ctx.restore();
      }
      (ctx.save(),
        (ctx.globalAlpha = Math.min(1, Math.max(0, (a - 480) / 620))),
        Ea(o - 6 * e, 78, Math.max(0.4, 0.42 * e), t, 2),
        ctx.restore());
    }
    if (
      (a < 0
        ? Ma(112, 106, yt(7, 1, 0, 4, { gl: 1, cl: 0 }), (t / 400) | 0, -1, { s: 1.5, talk: 1 })
        : (rect("rgba(0,0,0,.3)", 94, 108, 26, 2),
          rect("#0d0a16", 98, 103, 20, 6),
          rect("#fff", 99, 104, 18, 4.5),
          rect(q.sk[1][1], 94, 102, 6, 6)),
      a > 0 &&
        (function (t, a, e, o) {
          const n = Math.max(0, 1 - a / 3200);
          if (
            (a < 180 && rect("rgba(255,255,255," + Math.pow(1 - a / 180, 1.5) + ")", 0, 0, dt, bt),
            a < 1400)
          ) {
            const n = 34 * Math.sqrt(Math.min(a, 800) / 800),
              l = Math.max(0, 1 - a / 1400);
            for (let s = 0; s < 260; s++) {
              const c = 6.283 * r(s, 1),
                i = Math.sqrt(r(s, 2)) * n * (0.6 + 0.5 * Math.min(1, a / 260)),
                f = 1.4 * Math.sin(t / 55 + s),
                h = 1.2 * Math.cos(t / 47 + s) - 0.012 * a * r(s, 3),
                d = e + Math.cos(c) * i * 1.15 + f,
                b = o + Math.sin(c) * i * 0.85 + h,
                g = i / n;
              rect(
                "rgba(" +
                  (g < 0.25
                    ? "255,252,210"
                    : g < 0.5
                      ? "255,214,80"
                      : g < 0.75
                        ? "255,128,30"
                        : "206,48,20") +
                  "," +
                  l * (0.5 + 0.5 * r(s, 4)) +
                  ")",
                d,
                b,
                2 + (r(s, 5) < 0.35),
                2,
              );
            }
            glow(e, o, 60 * Math.sqrt(Math.min(a, 600) / 600), "255,170,60", 0.6 * l);
            const s = 0.32 * a;
            s < 220 &&
              ((ctx.strokeStyle = "rgba(255,236,190," + 0.7 * (1 - s / 220) + ")"),
              (ctx.lineWidth = 2.2 * (1 - s / 220) + 0.4),
              ctx.beginPath(),
              ctx.ellipse(e, o, s, 0.55 * s, 0, 0, 6.3),
              ctx.stroke(),
              (ctx.strokeStyle = "rgba(255,255,255," + 0.35 * (1 - s / 220) + ")"),
              (ctx.lineWidth = 0.6),
              ctx.beginPath(),
              ctx.ellipse(e, o, 0.86 * s, 0.47 * s, 0, 0, 6.3),
              ctx.stroke());
          }
          for (let t = 0; t < 90; t++) {
            const n = 6.283 * r(t, 11),
              l = 0.05 + 0.2 * r(t, 12),
              s = Math.cos(n) * l * a,
              c = Math.sin(n) * l * a * 0.85 + a * a * 7e-5,
              i = e + s,
              f = Math.min(104, o + c);
            if (a < 2400 && i > -4 && i < 196) {
              const e = 1 - a / 2400;
              (rect(
                "rgba(" +
                  (t % 3 ? "255," + ((150 + 100 * r(t, 13)) | 0) + ",60" : "255,236,170") +
                  "," +
                  e +
                  ")",
                i,
                f,
                1.2,
                1.2,
              ),
                rect(
                  "rgba(255,140,40," + 0.5 * e + ")",
                  i - Math.cos(n) * l * 30,
                  f - Math.sin(n) * l * 26,
                  1,
                  1,
                ));
            }
          }
          for (let l = 0; l < 30; l++) {
            const s = 6.283 * r(l, 21),
              c = 0.04 + 0.14 * r(l, 22),
              i = e + Math.cos(s) * c * a,
              f = o + Math.sin(s) * c * a * 0.8 + a * a * 6e-5,
              h = f > 104,
              d = Math.min(104, f),
              b = i + (h ? Math.cos(s) * Math.min(30, 0.3 * (f - 104)) : 0);
            a < 3200 &&
              (ctx.save(),
              ctx.translate(b, d),
              ctx.rotate((t / 90) * (r(l, 23) - 0.5) + l),
              rect("rgba(190,240,255," + 0.8 * n + ")", -1.6, -0.3, 3.2 + 2 * r(l, 24), 0.7),
              rect("rgba(255,255,255," + 0.6 * n + ")", -1.6, -0.3, 1.2, 0.7),
              ctx.restore());
          }
          for (let t = 0; t < 16; t++) {
            const o = Math.max(0, a - 110 * t);
            if (o <= 0 || a > 3800) continue;
            const n = o / 2600,
              l = e + 40 * (r(t, 31) - 0.5) * (1 + n) + 4 * Math.sin(o / 300 + t),
              s = 64 - 60 * n,
              c = 3 + 13 * n;
            (rect(
              "rgba(30,26,34," + Math.max(0, 0.55 * (1 - n)) + ")",
              l - c,
              s - 0.6 * c,
              2 * c,
              1.2 * c,
            ),
              rect(
                "rgba(70,62,76," + Math.max(0, 0.4 * (1 - n)) + ")",
                l - 0.7 * c,
                s - 0.8 * c,
                1.4 * c,
                0.7 * c,
              ));
          }
          if (a > 150) {
            const t = Math.min(1, a / 600);
            (glow(e, 72, 34, "12,8,10", 0.4 * t),
              rect("rgba(8,6,10," + 0.6 * t + ")", 20, 78, 48, 3));
            for (let a = 0; a < 5; a++)
              rect(
                "rgba(10,8,12," + 0.5 * t + ")",
                24 + 9 * a + 3 * r(a, 2),
                56 + 8 * r(a, 3),
                2,
                12,
              );
          }
          if (a > 300 && a < 4500) {
            const e = Math.min(1, (a - 300) / 400) * Math.max(0, 1 - (a - 3e3) / 1500);
            [
              [26, 78],
              [44, 78],
              [60, 78],
              [34, 78],
              [52, 78],
            ].forEach(([a, o], n) => {
              const l = 4 + 2 * Math.sin(t / 70 + 2 * n) + 3 * r(n, 5);
              (rect("rgba(255," + (90 + 20 * n) + ",20," + e + ")", a - 1.6, o - l, 3.2, l),
                rect("rgba(255,230,120," + e + ")", a - 0.8, o - 0.6 * l, 1.6, 0.6 * l),
                glow(a, o - 3, 10, "255,140,40", 0.4 * e));
            });
          }
          if (a < 2400)
            for (let t = 0; t < 20; t++) {
              const e = (0.05 * a + 13 * t) % 40;
              rect("rgba(190,200,215," + 0.5 * (1 - a / 2400) + ")", r(t, 41) * dt, e, 0.6, 2);
            }
        })(t, a, 44, 70),
      t > 3500 && t < 9500 && (t / 300) & 1 && rect("rgba(255,0,0,.16)", 0, 0, dt, bt),
      t > 3500 && t < 9500)
    ) {
      const a = t / 260;
      ((ctx.fillStyle = "rgba(255,40,30,.08)"),
        ctx.beginPath(),
        ctx.moveTo(96, 10),
        ctx.lineTo(96 + 170 * Math.cos(a), 10 + 170 * Math.sin(a)),
        ctx.lineTo(96 + 170 * Math.cos(a + 0.3), 10 + 170 * Math.sin(a + 0.3)),
        ctx.closePath(),
        ctx.fill(),
        glow(96, 10, 10, "255,50,40", 0.5));
    }
  },
  out: function (t) {
    const a = Math.min(1, t / 9e3);
    wt(1.04 + 0.012 * Math.sin(t / 2400), 96 + 2 * Math.sin(t / 1900), 54);
    for (let a = 0; a < 5; a++) {
      const e = ((53 * a + t * (a % 2 ? -0.008 : 0.012)) % 260) - 30,
        o = 48 + 8 * a + 4 * Math.sin(t / 650 + a);
      glow(
        e,
        o,
        24 + 3 * a,
        a % 2 ? "90,255,130" : "255,95,95",
        0.12 + 0.06 * Math.sin(t / 400 + a),
      );
    }
    for (let a = 0; a < 18; a++) {
      const e = (r(a, 31) * dt + t * (a % 2 ? -0.012 : 0.018) * (1 + (a % 3))) % dt,
        o = (r(a, 32) * bt + 0.006 * t * (1 + (a % 4))) % bt;
      rect(a % 3 ? "rgba(160,255,120,.5)" : "rgba(255,120,180,.45)", e, o, 1, 1 + (a % 3));
    }
    (Mt("outFar", Ia),
      La("out_far", 0.7 * a),
      Ea(((t / 55) % 300) - 55, 84, 1.05, t, 1),
      Mt("outMid", Oa),
      La("out_mid", a),
      Ea(((t / 30) % 370) - 125, 92, 1.45, t, 2));
    for (let t = 0; t < dt; t += 3) {
      const e = (1 + 5 * r(t, 3)) * a;
      rect("#2f7a35", t, 88 - e, 2, e);
    }
    [18, 166].forEach((e, o) =>
      (function (t, a, e, o, n) {
        if (e < 5) return;
        const l = 1.6 * Math.sin(o / 900 + n);
        for (let a = 0; a < e; a++) {
          const o = Math.max(1.5, 5 * (1 - a / e)),
            r = t + 2 * Math.sin(0.12 * a + n) + l * (a / e);
          (rect("#24141c", r - o / 2, 88 - a, o, 1), rect("#4a2a34", r - o / 2, 88 - a, 1, 1));
        }
        const s = 88 - e;
        for (let a = 0; a < 7; a++) {
          const o = t + (r(n, a) - 0.5) * e * 0.9 + l,
            c = s + (r(n, a + 9) - 0.5) * e * 0.34,
            i = Math.max(2, (0.15 * e + r(n, a + 3) * e * 0.1) | 0);
          (ut(o, c, i, "#17583a"),
            ut(o - 0.2 * i, c - 0.25 * i, Math.max(1, (0.75 * i) | 0), "#2a8a4e"));
        }
        for (let a = 0; a < 14; a++)
          rect(
            a % 3 ? "#b8ff6a" : "#ff7ad0",
            t + (r(n, a + 20) - 0.5) * e * 0.9 + l,
            s + (r(n, a + 30) - 0.5) * e * 0.4,
            1,
            1,
          );
        glow(t + l, s, 0.55 * e, "120,255,140", 0.14);
      })(e, 0, 44 * a, t, o + 2),
    );
    for (let a = 0; a < 3; a++)
      Ma(
        ((t / 70 + 70 * a) % 240) - 20,
        104,
        yt(a, a, (4 * a) % 14, (3 * a) % 14, { hs: a % 11, gd: a % 2 }),
        (t / 200 + a) | 0,
        1,
        { skin: "#7fcf5a", main: "#4a3a5a", glow: 1, s: 1.2 },
      );
    for (let a = 0; a < 40; a++)
      rect(
        "rgba(255,150,60,.8)",
        (r(a, 3) * dt + 6 * Math.sin(t / 700 + a)) % dt,
        (((r(a, 4) * bt - 0.02 * t * (1 + (a % 3))) % bt) + bt) % bt,
        0.5,
        0.5,
      );
    for (let a = 0; a < 30; a++)
      rect(
        "#9aff7a",
        (r(a, 5) * dt + (t / 30) * (1 + (a % 3))) % dt,
        80 * r(a, 4) + 4 * Math.sin(t / 400 + a),
        0.5,
        0.5,
      );
    for (let t = 0; t < dt; t += 4) rect("#0e2412", t, 105 - 8 * r(t, 5) * a, 3, 11);
    for (let a = 0; a < 14; a++)
      rect(
        "rgba(255,170,120,.07)",
        (r(a, 8) * dt + 0.01 * t * (1 + (a % 3))) % dt,
        92 + 14 * r(a, 9),
        30,
        6,
      );
    t % 2600 < 120 && ((t / 2600) | 0) % 2 == 1 && rect("rgba(220,230,255,.3)", 0, 0, dt, bt);
  },
  rock: function (t) {
    const a = Math.max(0, t - 5500);
    if (
      (wt(1, 96, 54 - Math.min(30, 0.008 * a)),
      Mt("rockBG", Ha),
      [66, 116].forEach((t) => glow(t + 1, 37, 30, "255,230,170", 0.35)),
      t > 5500 && ctx.translate(((3 * Math.random()) | 0) - 1, 0),
      t < 6400)
    )
      for (let a = 0; a < 9; a++)
        Ma(
          Math.min(36, -12 - 10 * a + 0.03 * t),
          102,
          yt(a % 14, a % 8, (3 * a) % 14, (5 * a) % 14, { hs: a % 11, gd: a % 2 }),
          (t / 140 + a) | 0,
          1,
        );
    if (
      ([40, 90, 140].forEach((a, e) => {
        const o = Math.max(0, t - 5500 - 900 * e),
          n = (o * o) / 3500;
        if (
          !(n > 150) &&
          (Ft(a, 87, 24, 0.55 * Math.max(0, 1 - n / 70)),
          (function (t, a) {
            const e = 38 - a;
            (rect("#6a7690", t - 6.5, e, 13, 46),
              rect("#f4f7fc", t - 6, e, 3, 46),
              rect("#d4dbe8", t - 3, e, 4, 46),
              rect("#aab4c8", t + 1, e, 3, 46),
              rect("#7e8aa4", t + 4, e, 2, 46),
              [8, 16, 30, 38].forEach((a) => rect("rgba(40,50,80,.45)", t - 6, e + a, 12, 0.5)),
              rect("#c8442a", t - 5, e - 2, 10, 4),
              rect("#d8583c", t - 4, e - 4, 8, 2),
              rect("#e86a4a", t - 3, e - 6, 6, 2),
              rect("#f2886a", t - 1.5, e - 8, 3, 2),
              rect("#9a2a1c", t + 2, e - 4, 3, 6),
              rect("#c8442a", t - 6, e + 12, 12, 2),
              rect("#f2f5fa", t - 6, e + 14, 12, 0.5),
              [8, 18].forEach((a) => {
                (rect("#10162e", t - 3, e + a + 22, 6, 6),
                  rect("#58d8ff", t - 2, e + a + 23, 4, 4),
                  rect("#d8f8ff", t - 2, e + a + 23, 1.5, 1.5));
              }),
              rect("#1f3a9a", t - 10, e + 34, 4, 12),
              rect("#3a62e0", t - 10, e + 34, 1, 12),
              rect("#1f3a9a", t + 6, e + 34, 4, 12),
              rect("#16286a", t + 9, e + 34, 1, 12),
              rect("#2f4fc0", t - 8, e + 30, 2, 4),
              rect("#2f4fc0", t + 6, e + 30, 2, 4),
              rect("#2a2e44", t - 4, e + 46, 8, 3),
              rect("#4a5070", t - 4, e + 46, 2, 3),
              rect("rgba(255,150,60,.22)", t - 6, e + 36, 12, 10));
          })(a, n),
          o > 0)
        ) {
          const e = Math.min(1, o / 1500);
          glow(a, 88 - n, 22, "255,180,60", 0.6);
          for (let t = 0; t < 16; t++)
            rect(
              "rgba(225,225,235,.35)",
              a - 8 + 30 * (r(t, a) - 0.5) * e,
              84 - 2.5 * t * e,
              8 + 1.2 * t * e,
              6,
            );
          for (let e = 0; e < 12; e++)
            rect(
              e % 2 ? "#ffd34a" : "#ff7a2a",
              a - 3 + 6 * r(e, (t / 50) | 0) - 1,
              84 - n + 3 * e,
              5 - 0.3 * e,
              3,
            );
        }
      }),
      t < 6200)
    ) {
      const e = Math.max(0, Math.ceil((5500 - t) / 550)),
        o = e > 0 ? "T-" + e : "LIFTOFF";
      text(o, 96 - 8 * o.length, 10 + 0.008 * a, "#ff6a3a", '16px "Press Start 2P"');
    }
  },
  left: function (t) {
    (wt(1 + Math.min(0.07, 12e-6 * t), 96, 56), rect("#02030a", 0, 0, dt, bt));
    for (let a = 0; a < 110; a++) {
      const e = 0.35 + 0.5 * Math.sin(t / 500 + 1.9 * a);
      rect(
        "rgba(220,230,255," + e + ")",
        r(a, 1) * dt,
        r(a, 2) * bt,
        a % 9 ? 0.6 : 1.2,
        a % 9 ? 0.6 : 1.2,
      );
    }
    const a = 96,
      e = 56,
      o = 0.012 * t - 110,
      n = Math.floor(t / 80);
    (glow(a, e, 64, "90,170,255", 0.35),
      glow(a, e, 48, "120,200,255", 0.25),
      n !== _a &&
        ((_a = n),
        (function (t) {
          const a = 138;
          $a || (($a = document.createElement("canvas")), ($a.width = $a.height = a));
          const e = $a.getContext("2d"),
            o = e.createImageData(a, a),
            n = o.data,
            l = te(),
            s = Math.cos(0.42),
            c = Math.sin(0.42),
            i = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
          for (let e = 0; e < a; e++)
            for (let o = 0; o < a; o++) {
              const f = (o + 0.5 - 69) / 68,
                h = -(e + 0.5 - 69) / 68,
                d = f * f + h * h;
              if (d > 1) continue;
              const b = Math.sqrt(1 - d),
                g = 57.2958 * Math.asin(h * s + b * c);
              let p = ((t + 57.2958 * Math.atan2(f, b * s - h * c) + 540) % 360) | 0,
                u = Math.min(179, Math.max(0, (89.5 - g) | 0));
              const m = l[360 * u + p],
                y = Math.max(0, Math.min(1, 0.32 + 0.8 * (0.55 * -f + 0.4 * h + 0.75 * b))),
                x = Math.floor(4 * y + (i[4 * (3 & e) + (3 & o)] / 16 - 0.5)) / 4,
                M = Math.max(0.06, Math.min(1, x + 0.12));
              let w, v, k;
              if (m) {
                const t = Math.abs(g);
                (t > 66
                  ? ((w = 210), (v = 226), (k = 236))
                  : t > 14 && t < 32 && r(p, u) < 0.8
                    ? ((w = 178), (v = 148), (k = 88))
                    : t < 12
                      ? ((w = 34), (v = 118), (k = 60))
                      : ((w = 58), (v = 128), (k = 64)),
                  r(p >> 1, u >> 1) < 0.12 && ((w *= 0.82), (v *= 0.82)));
              } else
                ((w = 20),
                  (v = 68),
                  (k = 146),
                  y > 0.7 && r(p, u) < 0.05 && ((w = 70), (v = 130), (k = 210)));
              !m && ae(g) > 70 && ((w = 150), (v = 190), (k = 225));
              const A = 4 * (e * a + o);
              ((n[A] = w * M),
                (n[A + 1] = v * M),
                (n[A + 2] = (k || (m ? 60 : 0)) * M + 10 * (1 - M)),
                (n[A + 3] = 255));
            }
          e.putImageData(o, 0, 0);
        })(o)),
      ctx.save(),
      (ctx.imageSmoothingEnabled = !1),
      ctx.drawImage($a, 61.5, 21.5, 69, 69),
      ctx.restore(),
      (ctx.strokeStyle = "rgba(140,210,255,.55)"),
      (ctx.lineWidth = 0.9),
      ctx.beginPath(),
      ctx.arc(a, e, 34.2, 0, 6.283),
      ctx.stroke(),
      (ctx.strokeStyle = "rgba(140,210,255,.18)"),
      (ctx.lineWidth = 2.2),
      ctx.beginPath(),
      ctx.arc(a, e, 35.6, 0, 6.283),
      ctx.stroke());
    const l = Math.cos(0.42),
      s = Math.sin(0.42);
    (te(),
      Ka.forEach(([n, c], i) => {
        const f = 400 + 4400 * r(i, 3);
        if (t < f) return;
        const h = Math.min(1, (t - f) / 500),
          d = c / 57.2958,
          b = (n - o) / 57.2958,
          g = Math.cos(d) * Math.sin(b),
          p = Math.cos(d) * Math.cos(b),
          u = Math.sin(d),
          m = p * l + u * s;
        if (m < 0.06) return;
        const y = a + 34 * g,
          x = e - 34 * (u * l - p * s),
          M = 0.5 + 0.5 * Math.sin(t / 260 + i),
          w = (1.7 + 0.6 * r(i, 5)) * h * (0.6 + 0.4 * m),
          v = w * (0.45 + 0.55 * m);
        (glow(y, x, 1.8 * w, "255,40,40", 0.22 * h),
          (ctx.fillStyle = "rgba(255,40,40," + (0.32 + 0.2 * M) + ")"),
          ctx.beginPath(),
          ctx.ellipse(y, x, v, 0.9 * w, 0, 0, 6.283),
          ctx.fill(),
          (ctx.strokeStyle = "rgba(255,90,80,.95)"),
          (ctx.lineWidth = 0.6),
          ctx.beginPath(),
          ctx.ellipse(y, x, v, 0.9 * w, 0, 0, 6.283),
          ctx.stroke());
        const k = (t / 700 + 0.37 * i) % 1;
        ((ctx.strokeStyle = "rgba(255,70,60," + 0.6 * (1 - k) + ")"),
          (ctx.lineWidth = 0.5),
          ctx.beginPath(),
          ctx.ellipse(y, x, v * (1 + 1.2 * k), 0.9 * w * (1 + 1.2 * k), 0, 0, 6.283),
          ctx.stroke(),
          rect("#ffd0c8", y - 0.4, x - 0.4, 0.8, 0.8));
      }),
      glow(a, e, 34, "255,30,30", Math.min(0.12, t / 3e4)));
    for (let o = 0; o < 7; o++) {
      const r = (t - 1200 - 420 * o) / 5200;
      if (r < 0) continue;
      const n = 0.5 * o - 0.9,
        l = 38 + 130 * r,
        s = a + Math.cos(n) * l * 1.1,
        c = e + Math.sin(n) * l * 0.62 - 10 * r;
      for (let t = 0; t < 6; t++)
        rect(
          "rgba(255," + (170 + 10 * t) + ",90," + (0.5 - 0.08 * t) + ")",
          s - Math.cos(n) * t * 1.8,
          c - Math.sin(n) * t * 1.1,
          1.2,
          1,
        );
      (rect("#fff", s, c, 1.6, 1.1), glow(s, c, 4, "255,200,140", 0.5));
    }
    if (t > 3e3) {
      const a = Math.min(0.35, (t - 3e3) / 6e3);
      rect("rgba(40,4,4," + a + ")", 0, 0, dt, bt);
    }
  },
  wake: function (t) {
    (wt(1 + Math.min(0.1, 1e-5 * t), 96, 60), Mt("podO", () => Wa(1)));
    const a = Math.max(0, Math.min(1, (t - 1800) / 1800)),
      e = Math.max(0, Math.min(1, (t - 3700) / 1e3)),
      o = t > 4800,
      n = Math.max(0, Math.min(1, (t - 4800) / 350));
    for (let a = 0; a < 8; a++) {
      const e = ctx.createLinearGradient(0, 0, 0, 92);
      (e.addColorStop(0, "rgba(255,248,180," + (0.2 + 0.05 * Math.sin(t / 700 + a)) + ")"),
        e.addColorStop(1, "rgba(255,240,150,.02)"),
        (ctx.fillStyle = e),
        ctx.beginPath(),
        ctx.moveTo(62 + 9 * a, 0),
        ctx.lineTo(86 + 9 * a, 0),
        ctx.lineTo(30 + 30 * a, 92),
        ctx.lineTo(30 * a - 4, 92),
        ctx.closePath(),
        ctx.fill());
    }
    (rect("rgba(255,236,150,.05)", 0, 0, dt, bt),
      glow(96, -4, 110, "255,244,170", 0.6),
      za(t, 1),
      qa(t, 1),
      Ya(t, {
        level: 1 - a,
        glass: 1 - e,
        over: 1,
        crack: 1,
        sink: 20,
        empty: 0,
        stand: a > 0.9,
        alpha: 1 - n,
      }));
    for (let a = 0; a < 16; a++) {
      const e = 8 + 12 * a + (a % 3) * 4,
        o = 26 + 52 * r(a, 5),
        n = 2.6 * Math.sin(t / 900 + 1.3 * a);
      ((ctx.strokeStyle = a % 2 ? "#2f8a46" : "#1f6a38"),
        (ctx.lineWidth = 1.2),
        ctx.beginPath(),
        ctx.moveTo(e, 0),
        ctx.quadraticCurveTo(e + n, 0.5 * o, e + 1.6 * n, o),
        ctx.stroke(),
        rect("#8fe07a", e + 1.6 * n - 1, o, 3, 2),
        rect("#5fbf62", e + 0.8 * n, 0.6 * o, 2, 2),
        a % 3 == 0 && rect("#ff86d0", e + 1.6 * n, o + 2, 2, 2));
    }
    for (let a = 0; a < 36; a++)
      rect(
        "#fff7c0",
        70 + 60 * r(a, 1) + 4 * Math.sin(t / 700 + a),
        (92 * r(a, 2) + (t / 60) * (1 + (a % 3))) % 92,
        0.5,
        0.5,
      );
    for (let a = 0; a < 12; a++) {
      const e = 20 + 150 * r(a, 81) + 6 * Math.sin(t / 900 + a),
        o = 50 + 40 * r(a, 82) + 5 * Math.cos(t / 700 + 2 * a),
        n = 0.4 + 0.5 * Math.sin(t / 300 + 1.7 * a);
      (rect("rgba(190,255,120," + n + ")", e, o, 1, 1), glow(e, o, 4, "190,255,120", 0.4 * n));
    }
    for (let a = 0; a < 3; a++) {
      const e = 30 + ((t / 40 + 70 * a) % 150),
        o = 36 + 8 * Math.sin(t / 260 + 2 * a) + 8 * a,
        r = ((t / 90 + a) | 0) % 2;
      (rect(a % 2 ? "#ffb86a" : "#8ad8ff", e, o, r ? 2 : 1, 1.5),
        rect(a % 2 ? "#ffd8a0" : "#d0f0ff", e + (r ? 2 : 1), o, r ? 2 : 1, 1.5));
    }
    for (let a = 0; a < 10; a++) {
      const e = (t / 34 + 17 * a) % 100,
        o = 60 + 80 * r(a, 91) + 7 * Math.sin(t / 500 + a);
      rect(a % 2 ? "#7ac45a" : "#c4b050", o, e, 2, 1);
    }
    (Ua(t, "200,255,200"),
      o &&
        (ctx.save(),
        (ctx.globalAlpha = n),
        Ma(100, 104 + 0.3 * Math.sin(t / 400), playerLook, 0, 1, {
          s: 2,
          closed: t < 6200 && !(t > 5750 && t < 5900),
        }),
        ctx.restore()));
    for (let a = 0; a < 2; a++) {
      const e = a ? 192 : 0,
        o = a ? -1 : 1;
      for (let r = 0; r < 7; r++) {
        const n = 1.6 * Math.sin(t / 900 + r + 2 * a);
        ((ctx.fillStyle = r % 2 ? "#07190d" : "#0b2a14"),
          ctx.beginPath(),
          ctx.moveTo(e, 13 * r),
          ctx.quadraticCurveTo(
            e + o * (16 + 3 * r),
            13 * r + 5 + n,
            e + o * (8 + 6 * r),
            13 * r + 22,
          ),
          ctx.lineTo(e, 13 * r + 9),
          ctx.fill(),
          (ctx.fillStyle = "rgba(120,220,100,.5)"),
          ctx.fillRect(e + o * (10 + 3 * r), 13 * r + 6 + n, 2, 1));
      }
    }
    for (let a = 0; a < dt; a += 2) {
      const e = 5 + 9 * r(a, 11),
        o = 1.6 * Math.sin(t / 700 + 0.3 * a);
      for (let t = 0; t < e; t += 1.5)
        rect(t > 0.7 * e ? "#6ad060" : "#0f3a1c", a + o * (t / e), 105 - t, 1, 1.6);
    }
    for (let a = 0; a < 10; a++) {
      const e = (r(a, 5) * dt + 0.01 * t * ((a % 3) + 1)) % dt,
        o = (80 * r(a, 6) + 0.02 * t * (1 + (a % 2))) % 90;
      rect(a % 2 ? "#f6ffb0" : "#ffd8f0", e, o, 1, 1);
    }
    glow(96, 6, 70, "255,244,170", 0.35);
  },
};
function se() {
  if (ot.hidden) return;
  ((Ut = performance.now() - Vt),
    (ctx = ht),
    ctx.save(),
    ctx.scale(2, 2),
    (ctx.imageSmoothingEnabled = !1));
  const t = le[scene];
  (t && (ctx.save(), t(Ut), ctx.restore()), ctx.drawImage(zt(), 0, 0, dt, bt));
  for (let t = 0; t < 115; t++) {
    const a = r(t, 71) * dt,
      e = (r(t, 72) * bt + Ut * (0.002 + (t % 4) * 0.001)) % bt;
    rect(t % 3 ? "rgba(255,255,255,.075)" : "rgba(0,0,0,.12)", a, e, 0.5, 0.5);
  }
  if (
    (("out" !== scene && "lab" !== scene && "wake" !== scene) ||
      glow(96, 54, 105, "out" === scene ? "110,255,130" : "110,190,255", 0.13),
    "lab" === scene && Ut > 3500)
  ) {
    const t = 0.5 + 0.5 * Math.sin(Ut / 95);
    (rect("rgba(255,35,25," + (0.045 + 0.065 * t) + ")", 0, 0, dt, bt),
      glow(96, 65, 48, "255,35,25", 0.12 + 0.12 * t));
  }
  ("call" === scene &&
    (glow(48, 54, 56, "70,210,255", 0.06), glow(144, 54, 56, "60,255,180", 0.06)),
    ("street" === scene || "poster" === scene) &&
      rect("rgba(255,255,255,.025)", ((0.08 * Ut) % 230) - 18, 0, 36, bt),
    rect("rgba(0,0,0,.12)", 0, 0, dt, 2),
    rect("rgba(0,0,0,.16)", 0, 106, dt, 2),
    rect("#000", 0, 0, dt, 6),
    rect("#000", 0, 102, dt, 6),
    (Jt += 0.25 * (jt - Jt)));
  const a = Math.round(5 * Jt) / 5;
  (a > 0 && rect("rgba(0,0,0," + a + ")", 0, 0, dt, bt), ctx.restore(), requestAnimationFrame(se));
}
(() => {
  for (const t of ["street", "poster", "call", "lab", "out", "rock", "left"]) {
    const a = le[t];
    le[t] = (e) => {
      (a(e), ne(t, e));
    };
  }
})();
const skipCutscene = () => {
    ((cutAbort = 1), (typing = 0), skipWait && skipWait(), $sx("stop"));
  },
  ie = () => {
    typing ? (typing = 0) : skipWait && skipWait();
  };
(ot.addEventListener("pointerdown", (t) => {
  t.target.closest("button") || ie();
}),
  (qs("#skip").onclick = skipCutscene),
  (qs("#finGo").onclick = () => {
    ((ot.hidden = !0), startGame(playerName, playerLook));
  }));
const fe = () => {
    const t = innerHeight > innerWidth,
      a = Math.max(
        3,
        Math.min(
          8,
          t
            ? Math.min(Math.floor((0.22 * innerHeight) / 40), Math.floor((0.4 * innerWidth) / 32))
            : Math.floor((0.5 * innerHeight) / 40),
        ),
      );
    ((V.style.width = 32 * a + "px"), (V.style.height = 40 * a + "px"));
  },
  he = () => {
    ((U.hidden = !0), N.focus());
  };
