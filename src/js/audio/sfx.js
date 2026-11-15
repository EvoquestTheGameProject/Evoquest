(() => {
  "use strict";
  const A = window.__audio;
  let bus = null,
    amb = null,
    nb = null,
    cnt = 0,
    ambN = [];
  const last = {},
    LOG = [];
  const ctxOf = () => A && A.ctx && A.ctx();
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
  function build(c) {
    const comp = c.createDynamicsCompressor();
    comp.threshold.value = -16;
    comp.ratio.value = 6;
    comp.attack.value = 0.003;
    comp.release.value = 0.2;
    bus = c.createGain();
    bus.gain.value = 0.55;
    amb = c.createGain();
    amb.gain.value = 0.5;
    bus.connect(comp);
    amb.connect(comp);
    comp.connect(c.destination);
    const n = c.sampleRate,
      b = c.createBuffer(1, n, c.sampleRate),
      d = b.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    nb = b;
  }
  function env(c, g, t, v, a, d) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(v, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(a + 0.01, d));
  }
  function fin(n, g, dest) {
    cnt++;
    if (dest === amb) ambN.push(n);
    n.onended = () => {
      cnt--;
      const i = ambN.indexOf(n);
      if (i >= 0) ambN.splice(i, 1);
      try {
        g.disconnect();
      } catch (e) {}
    };
  }
  function tone(c, o) {
    if (cnt > 30) return;
    const t = c.currentTime + (o.w || 0),
      os = c.createOscillator(),
      g = c.createGain(),
      d = o.d || 0.1;
    os.type = o.type || "square";
    os.frequency.setValueAtTime(o.f, t);
    if (o.f2) os.frequency.exponentialRampToValueAtTime(Math.max(1, o.f2), t + d);
    env(c, g, t, o.v || 0.1, o.a || 0.004, d);
    os.connect(g);
    g.connect(o.dest || bus);
    fin(os, g, o.dest || bus);
    os.start(t);
    os.stop(t + d + 0.03);
  }
  function noise(c, o) {
    if (cnt > 30) return;
    const t = c.currentTime + (o.w || 0),
      s = c.createBufferSource(),
      f = c.createBiquadFilter(),
      g = c.createGain(),
      d = o.d || 0.1;
    s.buffer = nb;
    s.loop = true;
    f.type = o.type || "lowpass";
    f.frequency.setValueAtTime(o.f || 1000, t);
    if (o.f2) f.frequency.exponentialRampToValueAtTime(Math.max(20, o.f2), t + d);
    f.Q.value = o.q || 1;
    env(c, g, t, o.v || 0.1, o.a || 0.004, d);
    s.connect(f);
    f.connect(g);
    g.connect(o.dest || bus);
    fin(s, g, o.dest || bus);
    s.start(t, Math.random() * 0.4);
    s.stop(t + d + 0.03);
  }
  const J = () => 1 + (Math.random() - 0.5) * 0.12;
  const arp = (c, fs, d, v, type, step, w0) =>
    fs.forEach((f, i) => tone(c, { f, d, v, type: type || "triangle", w: (w0 || 0) + i * step }));
  const S = {
    click: (c) => tone(c, { f: 880, f2: 660, d: 0.05, v: 0.07 }),
    jump: (c) => tone(c, { f: 230 * J(), f2: 560, d: 0.16, v: 0.1 }),
    land: (c) => {
      noise(c, { d: 0.08, v: 0.1, f: 500 });
      tone(c, { f: 100, f2: 50, d: 0.09, v: 0.1, type: "sine" });
    },
    step: (c) => noise(c, { d: 0.04, v: 0.05, f: 700 * J(), type: "bandpass", q: 1.2 }),
    swing: (c) => noise(c, { d: 0.1, v: 0.08, f: 1200, f2: 3200, type: "highpass" }),
    hit: (c) => {
      noise(c, { d: 0.09, v: 0.16, f: 1800 });
      tone(c, { f: 170, f2: 60, d: 0.1, v: 0.14 });
    },
    hitbig: (c) => {
      noise(c, { d: 0.16, v: 0.24, f: 2200 });
      tone(c, { f: 130, f2: 40, d: 0.2, v: 0.2, type: "sawtooth" });
    },
    shoot: (c) => {
      tone(c, { f: 950, f2: 110, d: 0.17, v: 0.13, type: "sawtooth" });
      noise(c, { d: 0.08, v: 0.07, f: 2500, type: "highpass" });
    },
    empty: (c) => tone(c, { f: 180, f2: 140, d: 0.06, v: 0.08 }),
    hurt: (c) => {
      tone(c, { f: 320, f2: 80, d: 0.32, v: 0.16, type: "sawtooth" });
      noise(c, { d: 0.15, v: 0.12, f: 1400 });
    },
    die: (c) => {
      tone(c, { f: 420, f2: 50, d: 0.9, v: 0.15, type: "sawtooth" });
      noise(c, { d: 0.5, v: 0.12, f: 900, f2: 120 });
      arp(c, [330, 262, 196, 131], 0.2, 0.08, "square", 0.18, 0.1);
    },
    pickup: (c) => arp(c, [660, 880, 1320], 0.09, 0.09, "triangle", 0.07),
    door: (c) => {
      noise(c, { d: 0.4, v: 0.08, f: 300, f2: 700, type: "bandpass", q: 2 });
      tone(c, { f: 90, f2: 150, d: 0.35, v: 0.05, type: "sawtooth" });
      tone(c, { f: 70, f2: 40, d: 0.18, v: 0.12, type: "sine", w: 0.3 });
    },
    crate: (c) => {
      noise(c, { d: 0.16, v: 0.16, f: 700, type: "bandpass" });
      tone(c, { f: 140, f2: 60, d: 0.14, v: 0.12 });
    },
    clank: (c) => {
      tone(c, { f: 1250, d: 0.18, v: 0.07 });
      tone(c, { f: 1870, d: 0.14, v: 0.05 });
      noise(c, { d: 0.05, v: 0.1, f: 3000, type: "highpass" });
    },
    locked: (c) => {
      tone(c, { f: 200, d: 0.06, v: 0.08 });
      tone(c, { f: 150, d: 0.09, v: 0.08, w: 0.07 });
    },
    pour: (c) => {
      noise(c, { d: 0.9, v: 0.07, f: 700, f2: 2600, type: "bandpass", q: 3 });
      noise(c, { d: 0.6, v: 0.04, f: 4500, type: "highpass", w: 0.5 });
    },
    success: (c) => arp(c, [523, 659, 784, 1047], 0.18, 0.1, "square", 0.1),
    win: (c) => {
      arp(c, [523, 659, 784, 1047, 784, 1047, 1319], 0.22, 0.1, "square", 0.12);
      noise(c, { d: 0.6, v: 0.05, f: 5000, type: "highpass", w: 0.5 });
    },
    poof: (c) => noise(c, { d: 0.12, v: 0.07, f: 600 }),
    spawn: (c) => {
      tone(c, { f: 220, f2: 520, d: 0.18, v: 0.07, type: "triangle" });
      noise(c, { d: 0.1, v: 0.05, f: 1800, type: "highpass" });
    },
    bstep: (c) => {
      tone(c, { f: 75, f2: 38, d: 0.2, v: 0.2, type: "sine" });
      noise(c, { d: 0.12, v: 0.12, f: 260 });
    },
    windup: (c) => {
      noise(c, { d: 0.7, v: 0.08, f: 2800, f2: 1400, type: "bandpass", q: 2 });
      tone(c, { f: 120, f2: 70, d: 0.6, v: 0.05, type: "sawtooth" });
    },
    slam: (c) => {
      noise(c, { d: 0.55, v: 0.3, f: 240, f2: 60 });
      tone(c, { f: 62, f2: 28, d: 0.55, v: 0.3, type: "sine" });
      noise(c, { d: 0.12, v: 0.12, f: 2000, type: "highpass" });
    },
    spit: (c) => {
      noise(c, { d: 0.22, v: 0.09, f: 900, f2: 2500, type: "bandpass", q: 3 });
      tone(c, { f: 520, f2: 180, d: 0.2, v: 0.07, type: "sawtooth" });
    },
    roar: (c) => {
      noise(c, { d: 0.9, v: 0.11, f: 2200, f2: 900, type: "bandpass", q: 1.5 });
      tone(c, { f: 170, f2: 85, d: 0.85, v: 0.09, type: "sawtooth" });
    },
    crash: (c) => {
      noise(c, { d: 0.5, v: 0.26, f: 400, f2: 80 });
      tone(c, { f: 90, f2: 35, d: 0.45, v: 0.22, type: "sine" });
    },
    bosshit: (c) => {
      tone(c, { f: 240, f2: 110, d: 0.12, v: 0.12 });
      noise(c, { d: 0.1, v: 0.12, f: 1600 });
    },
    bossdie: (c) => {
      noise(c, { d: 1.8, v: 0.22, f: 320, f2: 50 });
      tone(c, { f: 210, f2: 30, d: 1.7, v: 0.14, type: "sawtooth" });
      noise(c, { d: 0.2, v: 0.2, f: 2500, type: "highpass", w: 1.6 });
    },
    blip: (c, k) => {
      const f = k === "p" ? 520 : k === "a" ? 330 : 420;
      tone(c, {
        f: f * J(),
        d: 0.04,
        v: k === "" ? 0.035 : 0.05,
        type: k === "" ? "triangle" : "square",
      });
    },
    card: (c) => {
      noise(c, { d: 0.5, v: 0.05, f: 300, f2: 2500, type: "bandpass", q: 2 });
      arp(c, [392, 587], 0.5, 0.06, "triangle", 0.12, 0.15);
    },
    fadeout: (c) => noise(c, { d: 0.5, v: 0.05, f: 2500, f2: 300, type: "bandpass", q: 1.5 }),
    fadein: (c) => noise(c, { d: 0.5, v: 0.04, f: 300, f2: 2500, type: "bandpass", q: 1.5 }),
    toggle: (c) => tone(c, { f: 660, f2: 990, d: 0.06, v: 0.06 }),
    scratch: (c) =>
      [0, 0.11, 0.2].forEach((w, i) =>
        noise(c, { d: 0.09, v: 0.08, f: 1800 + i * 400, type: "bandpass", q: 4, w }),
      ),
    sizzle: (c) => {
      noise(c, { d: 0.26, v: 0.06, f: 5200, type: "highpass" });
      noise(c, { d: 0.2, v: 0.04, f: 2400, type: "bandpass", q: 3, w: 0.05 });
    },
    creak: (c) => {
      tone(c, { f: 140, f2: 88, d: 0.75, v: 0.05, type: "sawtooth" });
      tone(c, { f: 212, f2: 158, d: 0.7, v: 0.03, type: "square", w: 0.05 });
    },
    doorhit: (c) => {
      noise(c, { d: 0.42, v: 0.28, f: 300, f2: 80 });
      tone(c, { f: 80, f2: 30, d: 0.42, v: 0.28, type: "sine" });
      noise(c, { d: 0.1, v: 0.14, f: 3000, type: "highpass" });
    },
    debris: (c) => {
      for (let i = 0; i < 6; i++)
        noise(c, {
          d: 0.06,
          v: 0.07,
          f: 1200 + Math.random() * 2500,
          type: "bandpass",
          q: 3,
          w: i * 0.05 + Math.random() * 0.05,
        });
    },
    heart: (c) => {
      tone(c, { f: 58, d: 0.12, v: 0.14, type: "sine" });
      tone(c, { f: 50, d: 0.12, v: 0.1, type: "sine", w: 0.18 });
    },
    rumble: (c) => {
      noise(c, { d: 1.7, v: 0.2, f: 140, f2: 70, a: 0.15 });
      tone(c, { f: 44, f2: 32, d: 1.7, v: 0.12, type: "sine", a: 0.2 });
    },
    stinger: (c) => {
      tone(c, { f: 98, d: 0.9, v: 0.09, type: "sawtooth" });
      tone(c, { f: 104, d: 0.9, v: 0.09, type: "sawtooth" });
      noise(c, { d: 0.4, v: 0.08, f: 4000, type: "highpass" });
    },
    siren: (c) => {
      for (let i = 0; i < 4; i++)
        tone(c, { f: 520, f2: 880, d: 0.46, v: 0.07, type: "square", w: i * 0.5 });
    },
    slither: (c) => noise(c, { d: 0.9, v: 0.06, f: 900, f2: 300, type: "bandpass", q: 4, a: 0.2 }),
    title: (c) => {
      tone(c, { f: 55, d: 1.4, v: 0.17, type: "sawtooth", a: 0.05 });
      tone(c, { f: 110, d: 1.3, v: 0.07, type: "square" });
      noise(c, { d: 0.8, v: 0.1, f: 300, f2: 60 });
    },
  };
  const SC = {
    street: (c) => {
      noise(c, { d: 5.5, v: 0.05, f: 520, f2: 300, type: "bandpass", q: 0.8, a: 0.8, dest: amb });
      tone(c, { f: 392, d: 0.28, v: 0.025, w: 2.2, dest: amb });
      tone(c, { f: 349, d: 0.32, v: 0.025, w: 2.5, dest: amb });
    },
    paper: (c) =>
      [0.1, 0.25, 0.42, 0.6].forEach((w) =>
        noise(c, { d: 0.07, v: 0.05, f: 2500, type: "highpass", w, dest: amb }),
      ),
    call: (c) => {
      for (let k = 0; k < 2; k++)
        for (let j = 0; j < 8; j++)
          tone(c, {
            f: j % 2 ? 1100 : 880,
            d: 0.03,
            v: 0.04,
            type: "sine",
            w: k * 0.55 + j * 0.04,
            dest: amb,
          });
      noise(c, { d: 0.03, v: 0.08, f: 3000, type: "highpass", w: 1.1, dest: amb });
    },
    pod: (c) => {
      noise(c, { d: 1.6, v: 0.05, f: 4000, type: "highpass", dest: amb });
      for (let k = 0; k < 6; k++)
        tone(c, { f: 1200, d: 0.07, v: 0.03, type: "sine", w: 0.6 + k, dest: amb });
      tone(c, { f: 55, d: 6, v: 0.03, type: "sawtooth", a: 0.6, dest: amb });
    },
    lab: (c) => {
      for (let k = 0; k < 6; k++)
        tone(c, { f: 700, f2: 960, d: 0.45, v: 0.03, w: k * 0.5, dest: amb });
      tone(c, { f: 50, d: 4, v: 0.03, type: "sawtooth", a: 0.5, dest: amb });
    },
    out: (c) => {
      noise(c, { d: 6, v: 0.07, f: 400, f2: 900, type: "bandpass", q: 1, a: 1, dest: amb });
      noise(c, { d: 2, v: 0.12, f: 150, w: 2, dest: amb });
    },
    rock: (c) => {
      noise(c, { d: 4, v: 0.12, f: 120, a: 0.6, dest: amb });
      tone(c, { f: 40, d: 4, v: 0.05, type: "sawtooth", a: 0.6, dest: amb });
    },
    left: (c) => {
      noise(c, { d: 6, v: 0.1, f: 200, f2: 1800, a: 1, dest: amb });
      tone(c, { f: 60, f2: 180, d: 6, v: 0.04, type: "sawtooth", a: 1, dest: amb });
    },
    wake: (c) => {
      noise(c, { d: 1.5, v: 0.05, f: 3000, f2: 6000, type: "highpass", dest: amb });
      for (let k = 0; k < 6; k++) {
        tone(c, { f: 60, d: 0.12, v: 0.12, type: "sine", w: 1.8 + k * 0.9, dest: amb });
        tone(c, { f: 52, d: 0.12, v: 0.09, type: "sine", w: 2 + k * 0.9, dest: amb });
      }
      tone(c, { f: 1200, d: 0.08, v: 0.03, type: "sine", w: 1, dest: amb });
    },
    door: (c) => {
      tone(c, { f: 90, f2: 160, d: 0.6, v: 0.04, type: "sawtooth", dest: amb });
      tone(c, { f: 60, f2: 35, d: 0.2, v: 0.1, type: "sine", w: 0.6, dest: amb });
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
    const c = ctxOf();
    ambN.slice().forEach((n) => {
      try {
        n.stop();
      } catch (e) {}
    });
    ambN.length = 0;
    if (amb && c) {
      try {
        amb.gain.cancelScheduledValues(c.currentTime);
        amb.gain.setValueAtTime(0, c.currentTime);
        amb.gain.setValueAtTime(0.5, c.currentTime + 0.25);
      } catch (e) {}
    }
  }
  function p(name, arg) {
    try {
      const now = performance.now();
      if (now - (last[name] || -1e9) < (MI[name] || 25)) return;
      last[name] = now;
      if (name === "stop") {
        stop();
        return;
      }
      LOG.length < 400 && LOG.push(name);
      const c = ready();
      if (!c) return;
      if (name === "scene") {
        const f = SC[arg];
        f && f(c);
        return;
      }
      const f = S[name];
      f && f(c, arg);
    } catch (e) {}
  }
  window.SFX = { p, stop, log: LOG, _S: S, _SC: SC, _ready: ready };
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
