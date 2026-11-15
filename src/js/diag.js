/* Diagnostics: if something goes wrong in a restricted viewer (artifact tab, in-app browser, ...), show the
   error on screen instead of failing silently. Nothing is drawn unless an error happens or the page is opened
   with #debug. Also keeps keyboard focus inside framed viewers. */
(() => {
  "use strict";
  const log = [];
  const IGNORE_CSP = /^(media-src|font-src)/;
  let box = null;
  let pending = false;

  const env = () => {
    const bits = [];
    try {
      bits.push(window.top !== window ? "framed" : "top-level");
    } catch (e) {
      bits.push("framed");
    }
    try {
      window.localStorage.setItem("evoquest__d", "1");
      window.localStorage.removeItem("evoquest__d");
      bits.push("storage:ok");
    } catch (e) {
      bits.push("storage:blocked");
    }
    bits.push("indexedDB:" + (typeof indexedDB !== "undefined" ? "yes" : "no"));
    bits.push("webaudio:" + (window.AudioContext || window.webkitAudioContext ? "yes" : "no"));
    bits.push(innerWidth + "x" + innerHeight);
    bits.push(
      ((navigator.userAgent || "").match(/(Chrome|Firefox|Version|CriOS|FxiOS)\/[\d.]+/g) || [])
        .slice(0, 2)
        .join(" "),
    );
    return bits.join(" | ");
  };

  const render = () => {
    pending = false;
    if (!document.body) return;
    if (!box) {
      box = document.createElement("div");
      box.id = "evoDiag";
      box.setAttribute("role", "alert");
      box.style.cssText =
        "position:fixed;left:0;right:0;bottom:0;max-height:45vh;overflow:auto;z-index:2147483000;" +
        "background:#2a0a10;color:#ffd6dc;font:10px/1.5 ui-monospace,Menlo,Consolas,monospace;" +
        "padding:8px 10px;white-space:pre-wrap;word-break:break-word;border-top:2px solid #ff4a5a;cursor:pointer";
      box.title = "Tap to dismiss";
      box.addEventListener("click", () => {
        box.remove();
        box = null;
      });
      document.body.appendChild(box);
    }
    box.textContent =
      "EvoQuest hit a problem. Please send a screenshot of this box.\n" +
      env() +
      "\n\n" +
      log.slice(-5).join("\n");
  };

  const show = (line, quiet) => {
    log.push(line);
    if (log.length > 30) log.shift();
    if (quiet || pending) return;
    pending = true;
    if (document.body) render();
    else document.addEventListener("DOMContentLoaded", render, { once: true });
  };

  addEventListener("error", (e) => {
    if (!e || !e.message || /ResizeObserver loop/.test(e.message)) return;
    show(
      "Error: " +
        e.message +
        (e.lineno ? " (line " + e.lineno + (e.colno ? ":" + e.colno : "") + ")" : ""),
    );
  });
  addEventListener("unhandledrejection", (e) => {
    const r = e && e.reason;
    if (r === undefined || r === null || r === 0)
      return; /* the cutscene player uses throw 0 to skip */
    show("Unhandled promise rejection: " + (r.message || r));
  });
  document.addEventListener("securitypolicyviolation", (e) => {
    const d = e.violatedDirective || "";
    show(
      "Blocked by the viewer's security policy: " + d + " " + (e.blockedURI || ""),
      IGNORE_CSP.test(d),
    );
  });

  /* keep keyboard focus inside framed viewers so the arrow keys reach the game, not the page around it */
  const focusMe = () => {
    try {
      window.focus();
    } catch (e) {}
  };
  focusMe();
  addEventListener("pointerdown", focusMe, true);
  addEventListener("touchstart", focusMe, { capture: true, passive: true });

  window.__evoDiag = { log, env };
  if (/(^|[#&])debug\b/.test(location.hash)) {
    const dbg = () => {
      log.push("(debug mode) " + env());
      render();
    };
    document.addEventListener("DOMContentLoaded", () => setTimeout(dbg, 3000), { once: true });
  }
})();
