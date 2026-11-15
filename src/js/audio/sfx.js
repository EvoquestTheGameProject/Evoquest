/* EvoQuest sound design: a procedural Web Audio engine (no audio files).
   - Effects are layered (body + noise texture + tail) and softened with filters and a small-room reverb.
   - Talking uses a formant voice synth (vowel-shaped, per-character pitch) instead of beeps.
   - Rooms and cutscene scenes each get their own looping ambience bed plus random one-shot details.
   Everything is called through $sx(), which is wrapped in try/catch so audio can never break the game. */
(() => {
  "use strict";
  const A = window.__audio;
  let bus = null,
    amb = null,
    rvIn = null,
    nb = null,
    bn = null,
    tap = null,
    cnt = 0,
    cur = null,
    sceneWanted = "",
    sceneNow = "",
    stepSide = 1;
  const last = {},
    LOG = [];
  const ctxOf = () => A && A.ctx && A.ctx();
  const $ = (id) => document.getElementById(id);

  function ready() {
    const c = ctxOf();
    if (!c || A.muted()) return null;
    if (c.state !== "running") {
      A.rs && A.rs();
      return null;
    }
    if (!bus) build(c);
    return bus ? c : null;
  }

  /* synthetic small-room impulse response: decaying stereo noise, darker towards the tail */
  function impulse(c, sec, decay) {
    const n = Math.floor(c.sampleRate * sec),
      buf = c.createBuffer(2, n, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      let lp = 0;
      for (let i = 0; i < n; i++) {
        const t = i / n,
          k = 0.55 - 0.45 * t;
        lp += (Math.random() * 2 - 1 - lp) * k;
        d[i] = lp * Math.pow(1 - t, decay);
      }
    }
    return buf;
  }

  function build(c) {
    const comp = c.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 4;
    comp.attack.value = 0.004;
    comp.release.value = 0.22;
    const lp = c.createBiquadFilter(); /* takes the edge off harsh highs */
    lp.type = "lowpass";
    lp.frequency.value = 10500;
    lp.Q.value = 0.5;
    bus = c.createGain();
    bus.gain.value = 0.62;
    amb = c.createGain();
    amb.gain.value = 0.55;
    rvIn = c.createGain();
    const cv = c.createConvolver(),
      rvOut = c.createGain();
    cv.buffer = impulse(c, 1.7, 2.6);
    rvOut.gain.value = 0.55;
    rvIn.connect(cv);
    cv.connect(rvOut);
    bus.connect(lp);
    amb.connect(lp);
    rvOut.connect(lp);
    lp.connect(comp);
    comp.connect(c.destination);
    const n = c.sampleRate * 2,
      w = c.createBuffer(1, n, c.sampleRate),
      b = c.createBuffer(1, n, c.sampleRate),
      wd = w.getChannelData(0),
      bd = b.getChannelData(0);
    let br = 0;
    for (let i = 0; i < n; i++) {
      const x = Math.random() * 2 - 1;
      wd[i] = x;
      br = (br + 0.02 * x) / 1.02;
      bd[i] = br * 3.5;
    }
    nb = w;
    bn = b;
  }

  /* ---------- building blocks ---------- */
  function route(c, node, o) {
    let n = node;
    if (o.pan !== undefined && c.createStereoPanner) {
      const p = c.createStereoPanner();
      p.pan.value = o.pan;
      n.connect(p);
      n = p;
    }
    n.connect(o.dest || bus);
    if (o.rv) {
      const s = c.createGain();
      s.gain.value = o.rv;
      n.connect(s);
      s.connect(rvIn);
    }
  }
  function env(g, t, v, a, d) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(v, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(a + 0.01, d));
  }
  function done(n, ...gs) {
    cnt++;
    n.onended = () => {
      cnt--;
      gs.forEach((g) => {
        try {
          g.disconnect();
        } catch (e) {}
      });
    };
  }
  function tone(c, o) {
    if (cnt > 40) return;
    const t = c.currentTime + (o.w || 0),
      d = o.d || 0.1,
      g = c.createGain();
    let first = null,
      head = g;
    [0, ...(o.det ? [o.det] : [])].forEach((det) => {
      const os = c.createOscillator();
      os.type = o.type || "sine";
      os.frequency.setValueAtTime(o.f, t);
      if (o.f2) os.frequency.exponentialRampToValueAtTime(Math.max(1, o.f2), t + d);
      if (det) os.detune.value = det;
      os.connect(g);
      os.start(t);
      os.stop(t + d + 0.06);
      first = first || os;
    });
    if (o.lp) {
      const f = c.createBiquadFilter();
      f.type = "lowpass";
      f.Q.value = 0.7;
      f.frequency.setValueAtTime(o.lp, t);
      if (o.lp2) f.frequency.exponentialRampToValueAtTime(Math.max(40, o.lp2), t + d);
      g.connect(f);
      head = f;
    }
    env(g, t, o.v || 0.1, o.a || 0.008, d);
    route(c, head, o);
    done(first, g, head);
  }
  function noise(c, o) {
    if (cnt > 40) return;
    const t = c.currentTime + (o.w || 0),
      d = o.d || 0.1,
      s = c.createBufferSource(),
      f = c.createBiquadFilter(),
      g = c.createGain();
    s.buffer = o.brown ? bn : nb;
    s.loop = true;
    f.type = o.type || "lowpass";
    f.frequency.setValueAtTime(o.f || 1000, t);
    if (o.f2) f.frequency.exponentialRampToValueAtTime(Math.max(20, o.f2), t + d);
    f.Q.value = o.q || 0.8;
    env(g, t, o.v || 0.1, o.a || 0.006, d);
    s.connect(f);
    f.connect(g);
    route(c, g, o);
    done(s, g, f);
    s.start(t, Math.random() * 1.2);
    s.stop(t + d + 0.06);
  }
  const J = (x = 0.08) => 1 + (Math.random() - 0.5) * 2 * x;
  const bell = (c, f, w, v, d, o = {}) => {
    /* soft bell: fundamental + a quiet inharmonic partial, long tail, reverb */
    tone(c, { f, d, v, w, a: 0.004, rv: 0.35, ...o });
    tone(c, { f: f * 2.76, d: d * 0.45, v: v * 0.22, w, a: 0.003, rv: 0.3, ...o });
  };
  const arp = (c, fs, step, v, d, w0 = 0, o = {}) =>
    fs.forEach((f, i) => bell(c, f, w0 + i * step, v, d, o));

  /* ---------- the talking voice: formant synthesis ---------- */
  const VOW = {
    a: [800, 1150, 2800],
    e: [530, 1840, 2480],
    i: [270, 2290, 3010],
    o: [570, 840, 2410],
    u: [300, 870, 2240],
  };
  function voice(c, kind, letter, gender) {
    const ch = String(letter || "a").toLowerCase()[0] || "a",
      code = ch.charCodeAt(0) || 97,
      vw = VOW[ch] || VOW["aeiou"[code % 5]],
      t = c.currentTime,
      narr = kind === "";
    const base = kind === "p" ? (gender === 1 ? 232 : 124) : kind === "a" ? 168 : 92;
    const f0 = base * J(0.06) * (1 + ((code % 7) - 3) * 0.014);
    const d = narr ? 0.13 : 0.082;
    const sum = c.createGain(),
      src = narr ? c.createBufferSource() : c.createOscillator();
    if (narr) {
      src.buffer = nb;
      src.loop = true;
    } else {
      src.type = "sawtooth";
      src.frequency.setValueAtTime(f0, t);
      src.frequency.exponentialRampToValueAtTime(f0 * 0.955, t + d);
    }
    const peak = narr ? 0.26 : 0.34;
    [
      [vw[0], 7, 1],
      [vw[1], 10, 0.62],
      [vw[2], 12, 0.3],
    ].forEach(([f, q, g]) => {
      const bp = c.createBiquadFilter(),
        gg = c.createGain();
      bp.type = "bandpass";
      bp.frequency.value =
        f * (kind === "a" ? 0.96 : 1) * (gender === 1 && kind === "p" ? 1.12 : 1);
      bp.Q.value = q;
      gg.gain.value = g;
      src.connect(bp);
      bp.connect(gg);
      gg.connect(sum);
    });
    const out = c.createGain();
    env(out, t, peak * 0.2, 0.012, d); /* soft attack: no clicks */
    sum.connect(out);
    let head = out;
    if (kind === "a" && sceneNow === "call") {
      /* the agent is on a phone: narrow the band and add a little line grit */
      const bp = c.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 1500;
      bp.Q.value = 0.6;
      out.connect(bp);
      head = bp;
    }
    route(c, head, { rv: narr ? 0.3 : 0.12, pan: (code % 5) * 0.02 - 0.04 });
    src.start(t, narr ? Math.random() : undefined);
    src.stop(t + d + 0.05);
    done(src, sum, out);
    if (/[sfhtkpcxzj]/.test(ch)) noise(c, { d: 0.03, v: 0.012, f: 4200, type: "bandpass", q: 1.2 });
  }

  /* ---------- one-shot effects ---------- */
  const S = {
    click: (c) => {
      noise(c, { d: 0.03, v: 0.05, f: 2400, type: "bandpass", q: 2 });
      tone(c, { f: 720, f2: 430, d: 0.06, v: 0.05, lp: 2200 });
    },
    toggle: (c) =>
      tone(c, { f: 520, f2: 780, d: 0.1, v: 0.05, type: "triangle", lp: 2600, rv: 0.1 }),
    jump: (c) => {
      noise(c, { d: 0.16, v: 0.04, f: 500, f2: 1300, type: "bandpass", q: 1.2 });
      tone(c, { f: 190, f2: 430, d: 0.15, v: 0.06, type: "triangle", lp: 1800 });
    },
    land: (c) => {
      noise(c, { d: 0.1, v: 0.1, f: 420, brown: 1 });
      tone(c, { f: 92, f2: 46, d: 0.13, v: 0.12 });
    },
    step: (c) => {
      stepSide = -stepSide;
      noise(c, {
        d: 0.05,
        v: 0.05,
        f: 600 + Math.random() * 320,
        type: "bandpass",
        q: 1.5,
        pan: stepSide * 0.15,
      });
      tone(c, { f: 118 * J(), f2: 70, d: 0.05, v: 0.045, pan: stepSide * 0.15 });
    },
    swing: (c) =>
      noise(c, { d: 0.13, a: 0.035, v: 0.06, f: 700, f2: 2600, type: "bandpass", q: 0.9 }),
    hit: (c) => {
      noise(c, { d: 0.07, v: 0.13, f: 1500 });
      tone(c, { f: 165, f2: 55, d: 0.11, v: 0.14 });
      noise(c, { d: 0.02, v: 0.06, f: 2600, type: "bandpass", q: 1.5 });
    },
    hitbig: (c) => {
      noise(c, { d: 0.18, v: 0.2, f: 900 });
      tone(c, { f: 120, f2: 36, d: 0.26, v: 0.2, rv: 0.15 });
      noise(c, { d: 0.04, v: 0.1, f: 3000, type: "bandpass", q: 1.2 });
    },
    shoot: (c) => {
      tone(c, { f: 1100, f2: 160, d: 0.2, v: 0.08, type: "sawtooth", lp: 3200, lp2: 420, rv: 0.2 });
      noise(c, { d: 0.18, v: 0.05, f: 2600, f2: 650, type: "bandpass", q: 1.1 });
      tone(c, { f: 400, f2: 62, d: 0.2, v: 0.08 });
    },
    empty: (c) => {
      tone(c, { f: 230, f2: 170, d: 0.08, v: 0.05, type: "triangle", lp: 1400 });
      noise(c, { d: 0.02, v: 0.04, f: 3000, type: "bandpass", q: 2 });
    },
    hurt: (c) => {
      tone(c, { f: 300, f2: 110, d: 0.28, v: 0.1, det: 14 });
      tone(c, { f: 210, f2: 90, d: 0.3, v: 0.05, type: "sawtooth", lp: 900 });
      noise(c, { d: 0.14, v: 0.1, f: 1200 });
    },
    die: (c) => {
      tone(c, { f: 330, f2: 55, d: 1.0, v: 0.08, type: "sawtooth", lp: 1200, lp2: 200, rv: 0.3 });
      tone(c, { f: 165, f2: 28, d: 1.1, v: 0.1 });
      noise(c, { d: 0.8, v: 0.08, f: 600, f2: 90, brown: 1 });
    },
    pickup: (c) => arp(c, [659, 988, 1319], 0.07, 0.06, 0.55),
    door: (c) => {
      tone(c, { f: 95, f2: 140, d: 0.4, v: 0.035, type: "sawtooth", lp: 600, det: 9 });
      tone(c, { f: 140, f2: 86, d: 0.4, v: 0.035, type: "sawtooth", lp: 600, det: 7, w: 0.35 });
      noise(c, { d: 0.5, v: 0.05, f: 400, f2: 900, type: "bandpass", q: 1.4 });
      tone(c, { f: 70, f2: 40, d: 0.2, v: 0.1, w: 0.5, rv: 0.2 });
      noise(c, { d: 0.03, v: 0.07, f: 2000, type: "bandpass", q: 2, w: 0.62 });
    },
    crate: (c) => {
      noise(c, { d: 0.14, v: 0.12, f: 500, type: "bandpass", q: 1 });
      tone(c, { f: 130, f2: 55, d: 0.15, v: 0.12 });
      noise(c, { d: 0.03, v: 0.07, f: 3200, type: "highpass" });
    },
    clank: (c) => {
      [1250, 1870, 2400].forEach((f, i) =>
        tone(c, { f: f * J(0.01), d: 0.35 - i * 0.07, v: 0.04, rv: 0.25 }),
      );
      noise(c, { d: 0.04, v: 0.06, f: 3000, type: "highpass" });
    },
    locked: (c) => {
      tone(c, { f: 185, f2: 120, d: 0.07, v: 0.09 });
      tone(c, { f: 175, f2: 115, d: 0.08, v: 0.09, w: 0.09 });
      noise(c, { d: 0.12, v: 0.04, f: 1500, type: "bandpass", q: 3, w: 0.02 });
    },
    pour: (c) => {
      noise(c, { d: 0.9, v: 0.05, f: 900, f2: 2200, type: "bandpass", q: 4, a: 0.08, rv: 0.12 });
      for (let i = 0; i < 6; i++)
        tone(c, {
          f: 380 + Math.random() * 200,
          f2: 900 + Math.random() * 500,
          d: 0.07,
          v: 0.03,
          w: 0.1 + i * 0.12,
          rv: 0.1,
        });
    },
    success: (c) => arp(c, [523, 659, 784, 1047], 0.1, 0.06, 0.6),
    win: (c) => {
      arp(c, [523, 659, 784, 1047, 784, 1047, 1319], 0.13, 0.06, 0.8);
      [262, 330, 392].forEach((f) => tone(c, { f, d: 1.9, v: 0.03, a: 0.25, rv: 0.4 }));
      noise(c, { d: 0.7, v: 0.03, f: 5000, type: "highpass", w: 0.6, rv: 0.3 });
    },
    poof: (c) => noise(c, { d: 0.14, v: 0.07, f: 700, f2: 220 }),
    spawn: (c) => {
      tone(c, { f: 220, f2: 520, d: 0.2, v: 0.05, type: "triangle", lp: 1800, rv: 0.2 });
      noise(c, { d: 0.1, v: 0.04, f: 2200, type: "bandpass", q: 2 });
    },
    bstep: (c) => {
      tone(c, { f: 72, f2: 32, d: 0.26, v: 0.22, rv: 0.12 });
      noise(c, { d: 0.15, v: 0.15, f: 230, brown: 1 });
    },
    windup: (c) => {
      noise(c, { d: 0.7, v: 0.05, f: 2600, f2: 1200, type: "bandpass", q: 2.5, a: 0.1 });
      tone(c, { f: 110, f2: 65, d: 0.6, v: 0.04, type: "sawtooth", lp: 500 });
    },
    slam: (c) => {
      noise(c, { d: 0.6, v: 0.25, f: 260, f2: 50, brown: 1, rv: 0.2 });
      tone(c, { f: 58, f2: 24, d: 0.65, v: 0.26, rv: 0.3 });
      noise(c, { d: 0.1, v: 0.08, f: 2000, type: "highpass" });
    },
    spit: (c) => {
      noise(c, { d: 0.22, v: 0.06, f: 800, f2: 2600, type: "bandpass", q: 3 });
      tone(c, { f: 480, f2: 170, d: 0.2, v: 0.05, type: "sawtooth", lp: 1500 });
    },
    roar: (c) => {
      noise(c, { d: 1.0, v: 0.09, f: 2000, f2: 800, type: "bandpass", q: 1.3, a: 0.12, rv: 0.3 });
      tone(c, {
        f: 160,
        f2: 78,
        d: 0.95,
        v: 0.07,
        type: "sawtooth",
        lp: 900,
        det: 12,
        a: 0.1,
        rv: 0.3,
      });
      tone(c, { f: 83, f2: 50, d: 0.95, v: 0.07, type: "sawtooth", lp: 500, a: 0.1 });
    },
    crash: (c) => {
      noise(c, { d: 0.55, v: 0.22, f: 420, f2: 70, brown: 1, rv: 0.2 });
      tone(c, { f: 90, f2: 32, d: 0.5, v: 0.22 });
    },
    bosshit: (c) => {
      tone(c, { f: 230, f2: 105, d: 0.12, v: 0.1 });
      noise(c, { d: 0.1, v: 0.12, f: 1400 });
    },
    bossdie: (c) => {
      noise(c, { d: 2, v: 0.2, f: 330, f2: 45, brown: 1, rv: 0.4 });
      tone(c, { f: 200, f2: 28, d: 1.9, v: 0.1, type: "sawtooth", lp: 700, lp2: 90, rv: 0.3 });
      noise(c, { d: 0.2, v: 0.12, f: 2500, type: "highpass", w: 1.7 });
    },
    blip: (c, kind, letter) =>
      voice(c, kind, letter, window.__evoGender ? window.__evoGender() : 0),
    card: (c) => {
      noise(c, { d: 0.55, v: 0.04, f: 300, f2: 2500, type: "bandpass", q: 2, a: 0.12, rv: 0.3 });
      arp(c, [392, 587], 0.15, 0.05, 0.9, 0.12);
    },
    fadeout: (c) =>
      noise(c, { d: 0.55, v: 0.035, f: 2500, f2: 300, type: "bandpass", q: 1.5, a: 0.15 }),
    fadein: (c) =>
      noise(c, { d: 0.55, v: 0.03, f: 300, f2: 2500, type: "bandpass", q: 1.5, a: 0.2 }),
    scratch: (c) =>
      [0, 0.12, 0.22].forEach((w, i) => {
        noise(c, { d: 0.09, v: 0.06, f: 2000 + i * 450, type: "bandpass", q: 3, w });
        noise(c, { d: 0.05, v: 0.03, f: 4200, type: "highpass", w });
      }),
    sizzle: (c) => {
      noise(c, { d: 0.3, v: 0.035, f: 5200, type: "highpass" });
      for (let i = 0; i < 4; i++)
        noise(c, {
          d: 0.02,
          v: 0.04,
          f: 3000 + Math.random() * 1500,
          type: "bandpass",
          q: 4,
          w: Math.random() * 0.25,
        });
    },
    creak: (c) => {
      tone(c, {
        f: 140,
        f2: 88,
        d: 0.8,
        v: 0.035,
        type: "sawtooth",
        lp: 500,
        det: 11,
        a: 0.05,
        rv: 0.15,
      });
      tone(c, { f: 212, f2: 158, d: 0.7, v: 0.02, type: "sawtooth", lp: 600, w: 0.06 });
    },
    doorhit: (c) => {
      noise(c, { d: 0.45, v: 0.26, f: 350, f2: 70, brown: 1, rv: 0.25 });
      tone(c, { f: 85, f2: 28, d: 0.45, v: 0.26 });
      noise(c, { d: 0.08, v: 0.1, f: 3000, type: "highpass" });
    },
    debris: (c) => {
      for (let i = 0; i < 7; i++)
        noise(c, {
          d: 0.06,
          v: 0.06,
          f: 1000 + Math.random() * 2500,
          type: "bandpass",
          q: 3,
          w: Math.random() * 0.35,
          pan: Math.random() - 0.5,
        });
    },
    heart: (c) => {
      tone(c, { f: 56, d: 0.15, v: 0.16 });
      tone(c, { f: 48, d: 0.16, v: 0.12, w: 0.17 });
    },
    rumble: (c) => {
      noise(c, { d: 1.8, v: 0.22, f: 160, f2: 70, a: 0.2, brown: 1 });
      tone(c, { f: 42, f2: 30, d: 1.8, v: 0.12, a: 0.25 });
    },
    stinger: (c) => {
      [98, 104, 147].forEach((f) =>
        tone(c, { f, d: 1.0, v: 0.04, type: "sawtooth", lp: 900, a: 0.08, rv: 0.35 }),
      );
      noise(c, { d: 0.5, v: 0.03, f: 4500, type: "highpass", rv: 0.3 });
    },
    siren: (c) => {
      for (let i = 0; i < 4; i++)
        tone(c, {
          f: 520,
          f2: 780,
          d: 0.46,
          v: 0.05,
          type: "triangle",
          lp: 2000,
          w: i * 0.5,
          rv: 0.3,
        });
    },
    slither: (c) => noise(c, { d: 0.9, v: 0.05, f: 900, f2: 300, type: "bandpass", q: 4, a: 0.2 }),
    title: (c) => {
      tone(c, { f: 55, d: 1.5, v: 0.12, type: "sawtooth", lp: 400, a: 0.05, rv: 0.4 });
      tone(c, { f: 110, d: 1.4, v: 0.06, lp: 600 });
      noise(c, { d: 0.9, v: 0.09, f: 300, f2: 60, brown: 1 });
    },
  };

  /* ---------- ambience: a looping bed per room / cutscene scene, plus random details ---------- */
  function newAmb(c, kind, key) {
    const g = c.createGain();
    g.gain.value = 0;
    g.connect(amb);
    const a = { kind, key, g, srcs: [], timers: [], dead: false };
    const lfo = (rate, depth, param) => {
      const o = c.createOscillator(),
        d = c.createGain();
      o.frequency.value = rate;
      d.gain.value = depth;
      o.connect(d);
      d.connect(param);
      o.start();
      a.srcs.push(o);
    };
    a.noise = (o) => {
      const s = c.createBufferSource(),
        f = c.createBiquadFilter(),
        v = c.createGain();
      s.buffer = o.brown ? bn : nb;
      s.loop = true;
      f.type = o.type || "lowpass";
      f.frequency.value = o.f || 800;
      f.Q.value = o.q || 0.7;
      v.gain.value = o.v || 0.05;
      s.connect(f);
      f.connect(v);
      v.connect(g);
      s.start(0, Math.random() * 1.5);
      a.srcs.push(s);
      if (o.lfoF) lfo(o.lfoF[0], o.lfoF[1], f.frequency);
      if (o.lfoV) lfo(o.lfoV[0], o.lfoV[1], v.gain);
    };
    a.osc = (o) => {
      const s = c.createOscillator(),
        f = c.createBiquadFilter(),
        v = c.createGain();
      s.type = o.type || "sine";
      s.frequency.value = o.f;
      f.type = "lowpass";
      f.frequency.value = o.lp || 2000;
      v.gain.value = o.v || 0.03;
      s.connect(f);
      f.connect(v);
      v.connect(g);
      s.start();
      a.srcs.push(s);
      if (o.lfoV) lfo(o.lfoV[0], o.lfoV[1], v.gain);
      if (o.lfoFreq) lfo(o.lfoFreq[0], o.lfoFreq[1], s.frequency);
    };
    /* random one-shots while this bed is alive */
    a.ev = (min, max, fn, first) => {
      const go = (ms) =>
        a.timers.push(
          setTimeout(() => {
            if (a.dead) return;
            const cc = ready();
            if (cc) {
              try {
                fn(cc, { dest: g });
              } catch (e) {}
            }
            go((min + Math.random() * (max - min)) * 1000);
          }, ms),
        );
      go(first !== undefined ? first * 1000 : (0.4 + Math.random() * (max - min) * 0.7) * 1000);
    };
    return a;
  }
  function fadeAmb(a, sec) {
    if (!a || a.dead) return;
    a.dead = true;
    a.timers.forEach(clearTimeout);
    const c = ctxOf();
    try {
      a.g.gain.cancelScheduledValues(c.currentTime);
      a.g.gain.setValueAtTime(a.g.gain.value, c.currentTime);
      a.g.gain.setTargetAtTime(0, c.currentTime, sec / 3);
    } catch (e) {}
    setTimeout(
      () => {
        a.srcs.forEach((s) => {
          try {
            s.stop();
          } catch (e) {}
        });
        try {
          a.g.disconnect();
        } catch (e) {}
      },
      (sec + 0.8) * 1000,
    );
  }
  function startAmb(kind, key, builder) {
    const c = ready();
    if (!c || !builder) return;
    if (cur && cur.key === key) return;
    const old = cur;
    cur = newAmb(c, kind, key);
    try {
      builder(cur, c);
    } catch (e) {}
    cur.g.gain.setTargetAtTime(1, c.currentTime, 0.7);
    fadeAmb(old, 1.4);
  }
  function stopAmb(sec) {
    if (cur) fadeAmb(cur, sec || 0.6);
    cur = null;
  }

  /* shared one-shot details (all take { dest } so they fade with their bed) */
  const D = {
    drip: (c, o, f = 1100) => {
      tone(c, {
        f: f * J(0.15),
        f2: f * 0.5,
        d: 0.09,
        v: 0.07,
        rv: 0.45,
        pan: Math.random() * 1.4 - 0.7,
        ...o,
      });
      noise(c, { d: 0.02, v: 0.02, f: 3500, type: "bandpass", q: 3, ...o });
    },
    bubble: (c, o) => {
      const f = 280 + Math.random() * 260;
      tone(c, { f, f2: f * 2.6, d: 0.09, v: 0.05, rv: 0.2, pan: Math.random() - 0.5, ...o });
    },
    zap: (c, o) => {
      for (let i = 0; i < 4; i++)
        noise(c, {
          d: 0.03,
          v: 0.05,
          f: 2200 + Math.random() * 1800,
          type: "bandpass",
          q: 3,
          w: i * 0.04 + Math.random() * 0.02,
          pan: Math.random() - 0.5,
          ...o,
        });
    },
    creak: (c, o) =>
      tone(c, {
        f: 130 + Math.random() * 40,
        f2: 80,
        d: 0.7,
        v: 0.025,
        type: "sawtooth",
        lp: 450,
        det: 8,
        a: 0.06,
        rv: 0.3,
        ...o,
      }),
    groan: (c, o) =>
      tone(c, { f: 70, f2: 52, d: 1.4, v: 0.04, type: "sawtooth", lp: 300, a: 0.3, rv: 0.4, ...o }),
    clang: (c, o) => {
      const f = 300 + Math.random() * 200;
      [1, 2.76, 5.4].forEach((m, i) =>
        tone(c, { f: f * m, d: 1.1 - i * 0.3, v: 0.02, rv: 0.5, pan: Math.random() - 0.5, ...o }),
      );
    },
    rat: (c, o) => {
      const p = Math.random() - 0.5;
      for (let i = 0; i < 6; i++)
        noise(c, {
          d: 0.025,
          v: 0.05,
          f: 4500,
          type: "highpass",
          w: i * 0.045,
          pan: p + i * 0.05,
          ...o,
        });
    },
    rustle: (c, o) =>
      noise(c, {
        d: 0.5,
        v: 0.03,
        f: 3500,
        f2: 5500,
        type: "bandpass",
        q: 0.8,
        a: 0.15,
        pan: Math.random() - 0.5,
        ...o,
      }),
    hiss: (c, o) =>
      noise(c, {
        d: 0.9,
        v: 0.03,
        f: 3200,
        f2: 2200,
        type: "bandpass",
        q: 2,
        a: 0.2,
        pan: Math.random() - 0.5,
        rv: 0.3,
        ...o,
      }),
    growl: (c, o) => {
      noise(c, { d: 1.6, v: 0.05, f: 300, f2: 120, brown: 1, a: 0.4, rv: 0.5, ...o });
      tone(c, { f: 88, f2: 62, d: 1.5, v: 0.03, type: "sawtooth", lp: 380, a: 0.4, rv: 0.5, ...o });
    },
    beep: (c, o, f = 880) => tone(c, { f, d: 0.09, v: 0.028, lp: 2400, ...o }),
    chirp: (c, o) => {
      const f = 2300 + Math.random() * 900,
        p = Math.random() * 1.6 - 0.8,
        n = 2 + ((Math.random() * 3) | 0);
      for (let i = 0; i < n; i++)
        tone(c, { f, f2: f * 1.45, d: 0.07, v: 0.03, w: i * 0.11, pan: p, rv: 0.25, ...o });
    },
    clink: (c, o) => {
      const f = 2400 + Math.random() * 900;
      tone(c, { f, d: 0.4, v: 0.03, rv: 0.35, pan: Math.random() - 0.5, ...o });
      tone(c, { f: f * 2.4, d: 0.2, v: 0.012, ...o });
    },
    car: (c, o) => {
      const dir = Math.random() < 0.5 ? -1 : 1;
      noise(c, {
        d: 3,
        v: 0.05,
        f: 250,
        f2: 900,
        type: "bandpass",
        q: 2,
        a: 1.2,
        pan: -dir * 0.7,
        rv: 0.2,
        ...o,
      });
      noise(c, {
        d: 2.6,
        v: 0.025,
        f: 900,
        f2: 250,
        type: "bandpass",
        q: 2,
        a: 1.4,
        w: 0.3,
        pan: dir * 0.7,
        ...o,
      });
    },
    horn: (c, o) => {
      tone(c, { f: 392, d: 0.28, v: 0.025, type: "triangle", lp: 1500, rv: 0.4, ...o });
      tone(c, { f: 494, d: 0.28, v: 0.02, type: "triangle", lp: 1500, rv: 0.4, ...o });
    },
    thunder: (c, o) =>
      noise(c, { d: 3.5, v: 0.12, f: 200, f2: 55, brown: 1, a: 0.4, rv: 0.6, ...o }),
    howl: (c, o) =>
      tone(c, {
        f: 300,
        f2: 420,
        d: 1.6,
        v: 0.018,
        a: 0.5,
        rv: 0.6,
        pan: Math.random() - 0.5,
        ...o,
      }),
    paper: (c, o) =>
      [0, 0.09, 0.18, 0.31].forEach((w) =>
        noise(c, { d: 0.06, v: 0.045, f: 2600, type: "highpass", w, ...o }),
      ),
  };

  /* Room beds. Keys match the game's room ids. */
  const ROOMS = {
    pod: (a) => {
      a.noise({ f: 190, v: 0.14, brown: 1 });
      a.noise({ f: 3600, type: "bandpass", q: 0.7, v: 0.012, lfoV: [0.11, 0.008] });
      a.osc({ f: 55, v: 0.04, lfoV: [0.07, 0.015] });
      a.osc({ f: 110, type: "triangle", lp: 400, v: 0.012 });
      a.ev(2.5, 6, D.bubble);
      a.ev(4, 9, (c, o) => D.drip(c, o, 1000));
      a.ev(9, 18, D.zap);
      a.ev(11, 22, D.creak);
    },
    stair: (a) => {
      a.noise({ f: 420, type: "bandpass", q: 0.9, v: 0.07, lfoF: [0.07, 240] });
      a.noise({ f: 150, v: 0.08, brown: 1 });
      a.ev(2, 5, (c, o) => D.drip(c, o, 1300));
      a.ev(12, 25, D.groan);
      a.ev(15, 30, D.clang);
    },
    hall: (a) => {
      a.osc({ f: 120, type: "sawtooth", lp: 650, v: 0.03, lfoV: [3.3, 0.004] });
      a.osc({ f: 240, type: "sawtooth", lp: 900, v: 0.012 });
      a.noise({ f: 6500, type: "highpass", v: 0.008 });
      a.noise({ f: 130, v: 0.07, brown: 1 });
      a.ev(5, 12, (c, o) => noise(c, { d: 0.025, v: 0.07, f: 2800, type: "bandpass", q: 2, ...o }));
      a.ev(3.5, 8, (c, o) => D.drip(c, o, 900));
    },
    ware: (a) => {
      a.noise({ f: 210, v: 0.1, brown: 1 });
      a.noise({ f: 800, type: "bandpass", q: 0.6, v: 0.012, lfoV: [0.05, 0.008] });
      a.ev(6, 14, D.rat);
      a.ev(10, 20, D.creak);
      a.ev(8, 16, D.rustle);
    },
    cafe: (a) => {
      a.noise({ f: 620, type: "bandpass", q: 0.8, v: 0.06, lfoF: [0.06, 220] });
      a.osc({ f: 4300, lp: 6000, v: 0.006, lfoV: [26, 0.006] });
      a.osc({ f: 60, type: "triangle", lp: 200, v: 0.03 });
      a.ev(10, 20, (c, o) => {
        for (let i = 0; i < 4; i++)
          noise(c, {
            d: 0.05,
            v: 0.06,
            f: 1800 + i * 600,
            type: "bandpass",
            q: 2.5,
            w: i * 0.07,
            ...o,
          });
      });
      a.ev(6, 13, D.clink);
    },
    med: (a) => {
      a.noise({ f: 1500, v: 0.05, lfoV: [0.22, 0.04] }); /* breathing ventilator */
      a.osc({ f: 50, v: 0.03 });
      let n = 0;
      a.ev(1.5, 1.9, (c, o) => D.beep(c, o, n++ % 2 ? 880 : 880), 0.5);
      a.ev(5, 11, (c, o) => D.drip(c, o, 1500));
    },
    store: (a) => {
      a.noise({ f: 200, v: 0.09, brown: 1 });
      a.noise({ f: 700, type: "bandpass", q: 0.6, v: 0.018, lfoF: [0.04, 180] });
      a.ev(9, 19, D.creak);
      a.ev(12, 24, (c, o) =>
        noise(c, { d: 1.2, v: 0.04, f: 700, f2: 200, type: "bandpass", q: 2, a: 0.2, ...o }),
      );
    },
    lab: (a) => {
      a.osc({ f: 60, type: "sawtooth", lp: 420, v: 0.045, lfoV: [0.3, 0.01] });
      a.osc({ f: 120, type: "sawtooth", lp: 500, v: 0.015 });
      a.osc({ f: 900, v: 0.004, lfoFreq: [0.2, 40] });
      a.noise({ f: 3000, type: "bandpass", q: 1, v: 0.01 });
      a.ev(0.8, 2.2, D.bubble);
      a.ev(6, 14, (c, o) => {
        D.beep(c, o, 1000);
        tone(c, { f: 1400, d: 0.08, v: 0.022, w: 0.12, lp: 2400, ...o });
      });
      a.ev(10, 20, D.clink);
    },
    exitlab: (a) => {
      a.noise({ f: 520, type: "bandpass", q: 0.7, v: 0.07, lfoF: [0.05, 260] });
      a.noise({ f: 3800, type: "bandpass", q: 0.6, v: 0.012, lfoV: [0.13, 0.01] });
      a.osc({ f: 4000, lp: 5500, v: 0.005, lfoV: [24, 0.005] });
      a.ev(3, 7, (c, o) => D.drip(c, o, 1000));
      a.ev(7, 16, D.hiss);
      a.ev(14, 28, D.growl);
      a.ev(6, 12, D.rustle);
    },
    "exitlab:boss": (a) => {
      a.osc({ f: 41, type: "sawtooth", lp: 180, v: 0.06, lfoV: [0.12, 0.02] });
      a.noise({ f: 180, v: 0.1, brown: 1 });
      a.noise({ f: 520, type: "bandpass", q: 0.7, v: 0.03, lfoF: [0.05, 200] });
      a.ev(
        1.05,
        1.2,
        (c, o) => {
          tone(c, { f: 52, d: 0.18, v: 0.1, ...o });
          tone(c, { f: 46, d: 0.18, v: 0.07, w: 0.2, ...o });
        },
        0.3,
      );
      a.ev(5, 11, D.hiss);
      a.ev(9, 18, D.growl);
    },
    outside: (a) => {
      a.noise({ f: 700, type: "bandpass", q: 0.6, v: 0.05, lfoF: [0.06, 280] });
      a.noise({ f: 4200, type: "highpass", v: 0.006, lfoV: [0.2, 0.005] });
      a.ev(1.5, 4, D.chirp);
      a.ev(6, 12, D.rustle);
    },
  };

  /* Cutscene scene beds. Keys match the scene ids used by the cutscene player. */
  const SCENES = {
    street: (a) => {
      a.noise({ f: 450, type: "bandpass", q: 0.7, v: 0.06, lfoF: [0.05, 200] });
      a.noise({ f: 120, v: 0.08, brown: 1 });
      a.ev(3, 7, D.car);
      a.ev(10, 20, D.horn);
    },
    poster: (a) => {
      a.noise({ f: 160, v: 0.07, brown: 1 });
      a.osc({ f: 120, type: "triangle", lp: 300, v: 0.012 });
      a.ev(
        0.2,
        0.3,
        (c, o) => arp(c, [523, 659, 784, 1047], 0.12, 0.04, 0.8, 0, o),
        0.3,
      ); /* advert jingle */
      a.ev(5, 9, D.paper);
    },
    call: (a, c) => {
      a.noise({ f: 5200, type: "highpass", v: 0.012 }); /* line hiss */
      a.osc({ f: 120, type: "triangle", lp: 400, v: 0.008 });
      for (let k = 0; k < 2; k++)
        for (let j = 0; j < 12; j++) {
          const w = k * 0.8 + j * 0.03;
          tone(c, { f: 440, d: 0.03, v: 0.04, w, dest: a.g, lp: 2600 });
          tone(c, { f: 480, d: 0.03, v: 0.04, w, dest: a.g, lp: 2600 });
        }
      noise(c, { d: 0.04, v: 0.08, f: 3000, type: "highpass", w: 1.75, dest: a.g });
    },
    pod: (a) => {
      ROOMS.pod(a);
      a.noise({ f: 4200, type: "highpass", v: 0.02, lfoV: [0.4, 0.018] });
      a.ev(5, 9, (c, o) => D.beep(c, o, 1200));
    },
    lab: (a) => {
      a.osc({ f: 50, type: "sawtooth", lp: 300, v: 0.05 });
      a.osc({ f: 660, type: "triangle", lp: 1800, v: 0.028, lfoFreq: [0.9, 130] }); /* alarm */
      a.noise({ f: 220, v: 0.1, brown: 1 });
      a.ev(3, 8, D.zap);
      a.ev(7, 14, (c, o) =>
        noise(c, { d: 1.5, v: 0.1, f: 220, f2: 60, brown: 1, a: 0.2, rv: 0.5, ...o }),
      );
    },
    out: (a) => {
      a.noise({ f: 380, type: "bandpass", q: 0.9, v: 0.09, lfoF: [0.07, 300] });
      a.noise({ f: 140, v: 0.09, brown: 1 });
      a.ev(5, 11, D.thunder);
      a.ev(7, 14, D.howl);
      a.ev(9, 18, D.growl);
    },
    rock: (a) => {
      a.noise({ f: 110, v: 0.16, brown: 1, lfoV: [0.1, 0.05] });
      a.osc({ f: 40, v: 0.06 });
      a.noise({ f: 500, type: "bandpass", q: 0.7, v: 0.04, lfoF: [0.06, 200] });
      a.ev(6, 12, D.thunder);
    },
    left: (a, c) => {
      a.noise({ f: 300, v: 0.11, brown: 1, lfoV: [0.08, 0.04] });
      noise(c, { d: 9, v: 0.12, f: 200, f2: 1900, a: 4, rv: 0.4, dest: a.g });
      tone(c, { f: 55, f2: 150, d: 9, v: 0.05, type: "sawtooth", lp: 500, a: 4, dest: a.g });
      a.ev(4, 9, D.rustle);
    },
    wake: (a) => {
      a.noise({ f: 4200, type: "highpass", v: 0.03, lfoV: [0.5, 0.03] });
      a.noise({ f: 170, v: 0.09, brown: 1 });
      a.osc({ f: 55, v: 0.035 });
      a.ev(
        0.88,
        1.0,
        (c, o) => {
          tone(c, { f: 58, d: 0.14, v: 0.12, ...o });
          tone(c, { f: 50, d: 0.14, v: 0.09, w: 0.18, ...o });
        },
        1.5,
      );
      a.ev(2.4, 3, (c, o) => D.beep(c, o, 1100));
      a.ev(5, 9, (c, o) => D.drip(c, o, 1100));
    },
    door: (a) => {
      a.noise({ f: 480, type: "bandpass", q: 0.8, v: 0.05, lfoF: [0.06, 200] });
      a.ev(
        0.1,
        0.2,
        (c, o) => {
          D.creak(c, o);
          tone(c, { f: 62, f2: 36, d: 0.22, v: 0.09, w: 0.7, ...o });
        },
        0.4,
      );
      a.ev(3, 6, D.chirp);
    },
    paper: (a) => {
      a.noise({ f: 520, type: "bandpass", q: 0.7, v: 0.05, lfoF: [0.06, 200] });
      a.ev(0.1, 0.2, D.paper, 0.2);
      a.ev(3, 6, D.chirp);
      a.ev(7, 12, D.rustle);
    },
  };

  const MI = {
    heart: 200,
    rumble: 600,
    stinger: 600,
    siren: 600,
    title: 600,
    scratch: 90,
    sizzle: 80,
    creak: 300,
    step: 120,
    blip: 20,
    hit: 45,
    hitbig: 45,
    poof: 60,
    swing: 80,
    land: 90,
    bstep: 150,
    fadein: 300,
    fadeout: 300,
    click: 40,
    toggle: 80,
  };

  function stop() {
    sceneWanted = "";
    sceneNow = "";
    stopAmb(0.5);
  }
  function p(name, a1, a2) {
    try {
      const now = performance.now();
      if (now - (last[name] || -1e9) < (MI[name] || 25)) return;
      last[name] = now;
      if (name === "stop") {
        stop();
        return;
      }
      LOG.length < 400 && LOG.push(name);
      if (name === "scene") {
        sceneWanted = a1 || "";
        sceneNow = sceneWanted;
        if (SCENES[a1]) startAmb("scene", "scene:" + a1, SCENES[a1]);
        else if (cur && cur.kind === "scene") stopAmb(0.8);
        return;
      }
      const c = ready();
      if (!c) return;
      const f = S[name];
      f && f(c, a1, a2);
    } catch (e) {}
  }

  /* Poller: starts the right ambience for what is on screen (room while playing, scene during a cutscene). */
  function ambTick() {
    try {
      const c = ready();
      if (!c) {
        if (cur && A && A.muted()) stopAmb(0.4);
        return;
      }
      const gm = $("gm"),
        cut = $("cut"),
        inGame = !!(gm && !gm.hidden && cut && cut.hidden && window.GM && window.GM.on),
        inCut = !!(cut && !cut.hidden);
      if (inGame) {
        const room = window.__evoRoom && window.__evoRoom();
        if (room) {
          const boss = window.__evoBoss && window.__evoBoss(),
            key = room === "exitlab" && boss && boss !== "dead" ? "exitlab:boss" : room;
          if (!cur || cur.key !== key) startAmb("room", key, ROOMS[key] || ROOMS[room]);
        }
      } else if (inCut) {
        if (sceneWanted && SCENES[sceneWanted] && (!cur || cur.key !== "scene:" + sceneWanted))
          startAmb("scene", "scene:" + sceneWanted, SCENES[sceneWanted]);
      } else if (cur) stopAmb(0.8); /* back at the menu: the music takes over */
    } catch (e) {}
  }
  setInterval(ambTick, 400);

  window.SFX = {
    p,
    stop,
    log: LOG,
    _S: S,
    _SC: Object.fromEntries(
      Object.entries(SCENES).map(([k, f]) => [
        k,
        (c) => startAmb("scene", "scene:" + k + ":" + Math.random(), f),
      ]),
    ),
    _ROOMS: Object.fromEntries(
      Object.entries(ROOMS).map(([k, f]) => [
        k,
        (c) => startAmb("room", k + ":" + Math.random(), f),
      ]),
    ),
    _ready: ready,
    _amb: () => cur,
    _tap: () => {
      const c = ready();
      if (!c || tap) return tap;
      tap = c.createAnalyser();
      tap.fftSize = 2048;
      bus.connect(tap);
      amb.connect(tap);
      return tap;
    },
  };

  /* UI button clicks */
  addEventListener(
    "click",
    (e) => {
      try {
        const b = e.target && e.target.closest && e.target.closest("button");
        if (b && b.id !== "musicBtn" && !b.classList.contains("pad")) p("click");
      } catch (x) {}
    },
    { capture: true, passive: true },
  );
  document.addEventListener(
    "click",
    (e) => {
      try {
        const b = e.target && e.target.closest && e.target.closest("#musicBtn");
        b && setTimeout(() => p("toggle"), 0);
      } catch (x) {}
    },
    true,
  );
})();
