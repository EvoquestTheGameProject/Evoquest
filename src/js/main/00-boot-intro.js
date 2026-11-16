/* Boot sequence: disclaimer -> Claude intro -> the EvoGame loader (window.__evoStartLoader). */
(() => {
  const start = () => window.__evoStartLoader && window.__evoStartLoader();
  try {
    document.fonts && document.fonts.load('16px "Press Start 2P"');
  } catch (e) {}
  if (window.__evoSkipIntro) return void setTimeout(start, 0);

  const boot = document.createElement("div");
  boot.id = "boot";
  boot.innerHTML =
    '<div id="bootWarn" role="dialog" aria-modal="true" aria-labelledby="bootH">' +
    '<h2 id="bootH">WARNING</h2>' +
    "<p>Some parts may disturb some players, including flashing lights that can affect people with photosensitive epilepsy.</p>" +
    "<p>The full experience is not completed yet.</p>" +
    "<p>Viewer discretion is advised.</p>" +
    '<button class="btn play" id="bootOk">OK</button></div>' +
    '<div id="bootLogo" hidden><canvas id="bootCv" width="160" height="90" aria-hidden="true"></canvas>' +
    '<div class="bl-txt"><div class="bl-term">&gt; <span id="bootType"></span><i class="bl-cur"></i></div>' +
    '<div class="bl-model" id="bootModel">Claude Opus 5.5</div>' +
    '<h1 class="bl-name" id="bootName" aria-label="Claude Entertainment"></h1>' +
    '<div class="bl-sub" id="bootSub">BUILT WITH CLAUDE CODE</div></div></div>';
  document.body.appendChild(boot);
  const $ = (id) => document.getElementById(id),
    ok = $("bootOk");
  setTimeout(() => ok.focus(), 50);

  ok.onclick = () => {
    $("bootWarn").hidden = true;
    const logo = $("bootLogo"),
      cv = $("bootCv"),
      g = cv.getContext("2d"),
      name = $("bootName"),
      typed = $("bootType"),
      t0 = performance.now(),
      RM = matchMedia("(prefers-reduced-motion:reduce)").matches,
      END = RM ? 2600 : 5400;
    logo.hidden = false;
    name.innerHTML = [..."CLAUDE ENTERTAINMENT"]
      .map((c) => "<span>" + (c === " " ? "&nbsp;" : c) + "</span>")
      .join("");
    const letters = name.children;
    const sparks = Array.from({ length: 44 }, (_, i) => {
      const a = (i / 44) * 6.283 + Math.random();
      return { a, r: 60 + Math.random() * 40, s: 0.6 + Math.random() * 0.8 };
    });
    let done = false,
      shown = 0,
      typedN = 0;
    const sfx = (n) => window.SFX && window.SFX.p(n);
    setTimeout(() => sfx("logo"), 250);

    const finish = () => {
      if (done) return;
      done = true;
      logo.classList.add("out");
      setTimeout(() => {
        boot.remove();
        start();
      }, 520);
    };
    const skip = (e) => {
      if (performance.now() - t0 > 400 && (e.type !== "keydown" || /Enter| |Escape/.test(e.key)))
        finish();
    };
    logo.addEventListener("pointerdown", skip);
    addEventListener("keydown", skip);

    (function frame(now) {
      if (done) return;
      const t = (now - t0) / 1000,
        cx = 80,
        cy = 34,
        grow = Math.min(1, Math.max(0, (t - 0.7) / 0.6)),
        spin = RM ? 0 : t * 0.35,
        pulse = 1 + 0.06 * Math.sin(t * 5);
      g.fillStyle = "#0f0c0a";
      g.fillRect(0, 0, 160, 90);
      /* glow */
      const gl = g.createRadialGradient(cx, cy, 0, cx, cy, 34);
      gl.addColorStop(0, "rgba(217,119,87," + (0.35 * grow).toFixed(3) + ")");
      gl.addColorStop(1, "rgba(217,119,87,0)");
      g.fillStyle = gl;
      g.fillRect(0, 0, 160, 90);
      /* sparks fly in and become the starburst */
      if (t < 1.4)
        for (const s of sparks) {
          const k = Math.min(1, t / (1.2 * s.s)),
            r = s.r * (1 - k * k);
          if (r < 2) continue;
          g.fillStyle = k > 0.8 ? "#f0a37f" : "#d97757";
          g.fillRect(
            Math.round(cx + Math.cos(s.a) * r),
            Math.round(cy + Math.sin(s.a) * r * 0.8),
            1,
            1,
          );
        }
      /* the starburst: eight rays, each a short line of chunky pixels */
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * 6.283 + spin,
          len = (i % 2 ? 10 : 14) * grow * pulse;
        for (let d = 2; d < len; d += 1) {
          g.fillStyle = d > len - 3 ? "#f0a37f" : "#d97757";
          g.fillRect(
            Math.round(cx + Math.cos(a) * d) - 1,
            Math.round(cy + Math.sin(a) * d) - 1,
            2,
            2,
          );
        }
      }
      if (grow > 0) {
        g.fillStyle = "#f3e8dc";
        g.fillRect(cx - 1, cy - 1, 2, 2);
      }
      /* "> claude" typed in, then model line, name, tagline */
      const want = Math.max(0, Math.min(6, Math.floor((t - 1.3) / 0.09)));
      while (typedN < want) {
        typed.textContent = "claude".slice(0, ++typedN);
        sfx("keytap");
      }
      if (t > 2.0) $("bootModel").classList.add("bl-on");
      const ln = Math.max(0, Math.min(letters.length, Math.floor((t - 2.3) / 0.05)));
      for (; shown < ln; shown++) letters[shown].classList.add("on");
      if (t > 3.1) $("bootSub").classList.add("bl-on");
      if (now - t0 >= END) finish();
      else requestAnimationFrame(frame);
    })(t0);
  };
})();
