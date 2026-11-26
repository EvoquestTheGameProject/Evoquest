(() => {
"use strict";
if (window.__evoQoL) return; window.__evoQoL = 1;
const $ = (id) => document.getElementById(id), gm = $("gm"); if (!gm) return;
const lsGet = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
const click = () => { try { window.SFX && window.SFX.p("click"); } catch (e) {} };
const flags = () => { try { return GM.flags ? GM.flags() : {}; } catch (e) { return {}; } };
/* ---- options (saved in this browser, applied immediately) ---- */
window.__evoNoShake = lsGet("evoquest_opt_noshake") === "1";
window.__evoFast = lsGet("evoquest_opt_fast") === "1";

const css = document.createElement("style"); css.id = "evoQoLCss";
css.textContent = [
  "#evoPBtn{position:absolute;left:calc(env(safe-area-inset-left,0px) + 135px);top:calc(env(safe-area-inset-top,0px) + 46px);z-index:4;width:44px;height:44px;display:grid;place-items:center;background:#0b1020e6;border:2px solid #8fb8ff;border-radius:3px;touch-action:manipulation;padding:0}",
  "#evoPBtn svg{width:16px;height:16px}",
  "#evoQ{z-index:60}#evoQ .gcard{width:min(420px,100%);text-align:center}",
  "#evoQ .qb{display:flex;flex-direction:column;gap:8px;margin:12px 0 4px}#evoQ .qb .gbtn{min-height:46px;font-size:9px}",
  "#evoQ p{margin:0 0 6px;color:#b8c8e8;font-size:7px;line-height:1.8}",
  "#evoSaved{position:absolute;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 10px);transform:translate(-50%,40px);z-index:5;padding:6px 10px;font-size:7px;color:#8aff9a;background:#04100ae6;border:2px solid #3a8a5a;border-radius:3px;opacity:0;transition:opacity .25s,transform .25s;pointer-events:none}",
  "#evoSaved.on{opacity:1;transform:translate(-50%,0)}",
  "@media (prefers-reduced-motion:reduce){#evoSaved{transition:none}}",
].join("");
document.head.appendChild(css);

/* ---- "SAVED" indicator (only when something actually changed on disk) ---- */
const chip = document.createElement("div"); chip.id = "evoSaved"; chip.textContent = "SAVED"; gm.appendChild(chip);
let ct = 0, lastSaved = 0;
window.__evoSaved = () => { const n = performance.now(); if (n - lastSaved < 2500) return; lastSaved = n; chip.classList.add("on"); clearTimeout(ct); ct = setTimeout(() => chip.classList.remove("on"), 1500); };

/* ---- pause / leave-to-menu confirmation ---- */
const ov = document.createElement("div"); ov.className = "gov"; ov.id = "evoQ"; ov.hidden = true; gm.appendChild(ov);
const pb = document.createElement("button"); pb.id = "evoPBtn"; pb.type = "button"; pb.hidden = true; pb.setAttribute("aria-label", "Pause");
pb.innerHTML = '<svg viewBox="0 0 8 8" shape-rendering="crispEdges" aria-hidden="true"><rect x="1" y="1" width="2" height="6" fill="#8fb8ff"/><rect x="5" y="1" width="2" height="6" fill="#8fb8ff"/></svg>'; gm.appendChild(pb);
let shown = 0, onLeave = null;
function setPaused(v) { window.__evoQPause = !!v; window.__evoPaused = v ? 1 : 0; }
function hide() { if (!shown) return; shown = 0; ov.hidden = true; setPaused(false); const j = $("evoJ"); if (j && !j.hidden) window.__evoPaused = 1; }
function card(html) { ov.innerHTML = '<div class="gcard">' + html + "</div>"; ov.hidden = false; shown = 1; setPaused(true); const f = ov.querySelector("button"); f && f.focus(); }
function pauseCard(auto) {
  card("<h3>PAUSED</h3><p>" + (auto ? "The game paused while you were away." : "Take your time. Nothing moves while you are paused.") + "</p><p>Progress is saved automatically.</p>" +
    '<div class="qb"><button class="gbtn" id="qRes">RESUME</button><button class="gbtn alt" id="qJ">FIELD JOURNAL</button><button class="gbtn alt" id="qSet">SETTINGS</button><button class="gbtn alt" id="qLv">LEAVE TO MENU</button></div>');
  $("qRes").onclick = () => { click(); hide(); };
  $("qJ").onclick = () => { click(); hide(); window.__evoJournal && window.__evoJournal.open(); };
  $("qSet").onclick = () => { click(); hide(); window.__evoJournal && window.__evoJournal.open("settings"); };
  $("qLv").onclick = () => { click(); askLeave(() => { try { window.__evoLeaveGo && window.__evoLeaveGo(); } catch (e) {} }, true); };
}
function askLeave(go, fromPause) {
  onLeave = go;
  card("<h3>LEAVE TO MENU?</h3><p>Your progress is saved automatically, so you can come back to this exact spot.</p>" + '<div class="qb"><button class="gbtn" id="qStay">STAY IN THE GAME</button><button class="gbtn alt" id="qGo">LEAVE TO MENU</button></div>');
  $("qStay").onclick = () => { click(); hide(); };
  $("qGo").onclick = () => { click(); const g = onLeave; hide(); g && g(); };
}
window.__evoAskLeave = (go) => { if (!GM.on) return go && go(); askLeave(go); };
function openPause(auto) { if (shown || !GM.on) return; const f = flags(); if (f.dead || f.won) return; pauseCard(auto); }
pb.addEventListener("click", () => { click(); shown ? hide() : openPause(false); });
document.addEventListener("visibilitychange", () => { if (document.hidden && GM.on && !shown) openPause(true); });
addEventListener("keydown", (e) => {
  if (!GM.on) return; const k = e.key;
  if ((k === "p" || k === "P") && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); e.stopPropagation(); shown ? hide() : openPause(false); return; }
  if (shown && (k === "Escape")) { e.preventDefault(); e.stopPropagation(); hide(); }
}, true);

/* ---- one gentle tip: portrait phones play better sideways ---- */
let tipped = 0;
function tick() {
  if (shown && !GM.on) { hide(); }
  const f = GM.on ? flags() : {};
  pb.hidden = !GM.on || !!f.dead || !!f.won;
  if (GM.on && !tipped && !lsGetS("evoq_rot")) {
    let touch = false, portrait = false; try { touch = matchMedia("(pointer:coarse)").matches; portrait = innerHeight > innerWidth; } catch (e) {}
    if (touch && portrait && window.__evoJournal && window.__evoJournal.notify) { tipped = 1; try { sessionStorage.setItem("evoq_rot", "1"); } catch (e) {} window.__evoJournal.notify("TIP", "Turn your phone sideways for a bigger view and easier controls.", 0); }
  }
}
function lsGetS(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
setInterval(tick, 500);
})();
