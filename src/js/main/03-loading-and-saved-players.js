let E = 0;
M.innerHTML = ["EVOGAME", "PRODUCTIONS"]
  .map((t, a) =>
    [...t].map((t) => `<span class="${a ? "q" : "e"}" style="--i:${E++}">${t}</span>`).join(""),
  )
  .join("<br>");
const T = M.querySelectorAll("span");
for (let t = 0; t < 12; t++) w.append(document.createElement("i"));
const S = w.children,
  C = performance.now();
let R = 0;
t("#fd");
const P = t("#cr"),
  I = t("#cl"),
  O = t("#cb"),
  L = t("#sp"),
  H = t("#slots"),
  N = t("#spBack");
function D(t) {
  try {
    localStorage.setItem("evoquest_players", JSON.stringify(t));
  } catch (t) {}
}
let G = (function () {
  let t;
  try {
    t = JSON.parse(localStorage.getItem("evoquest_players") || "[]");
  } catch (a) {
    t = [];
  }
  for (; t.length < 3;) t.push(null);
  return t;
})();
function B() {
  ((H.innerHTML = ""),
    G.slice(0, 3).forEach((t, a) => {
      const e = document.createElement("div");
      var o;
      ((e.className = "slot"),
        (e.innerHTML = t
          ? `<div class="nm">${((o = t), o.replace(/[&<>"']/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[t]))}</div><div class="slot-row"><button class="btn play" data-act="play" data-i="${a}">Play</button><button class="btn cred" data-act="del" data-i="${a}">Delete</button></div>`
          : `<div class="nm">Empty Slot</div><div class="slot-row"><button class="btn cred" data-act="create" data-i="${a}">Create</button></div>`),
        H.append(e));
    }));
}
H.addEventListener("click", (a) => {
  const e = a.target.closest("button");
  if (!e) return;
  const o = +e.dataset.i,
    r = e.dataset.act;
  if ("create" === r) {
    const t = e.closest(".slot");
    t.innerHTML =
      '<input class="pname" maxlength="14" placeholder="Enter name"><div class="slot-row"><button class="btn play" data-act="confirm" data-i="' +
      o +
      '">Save</button><button class="btn cred" data-act="cancel" data-i="' +
      o +
      '">Cancel</button></div>'.replace("'+i+'", o).replace("'+i+'", o);
    const a = t.querySelector("input");
    (a.focus(),
      a.addEventListener("keydown", (a) => {
        "Enter" === a.key && t.querySelector("[data-act=confirm]").click();
      }));
  } else if ("confirm" === r) {
    const t = (e.closest(".slot").querySelector("input").value || "").trim().slice(0, 14);
    (t && ((G[o] = t), (X[o] = null), D(G), at(X)), B());
  } else
    "cancel" === r
      ? B()
      : "del" === r
        ? ((G[o] = null), (X[o] = null), D(G), at(X), B())
        : "play" === r &&
          (function (a) {
            ((K = a),
              (Q = tt(X[a])),
              (t("#cname").textContent = G[a]),
              fe(),
              et(),
              (U.hidden = !1),
              t("#ccGo").focus());
          })(o);
});
