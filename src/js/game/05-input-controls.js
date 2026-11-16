(qs("#fp").addEventListener("pointerdown", function (t) {
  const a = t.target.closest("[data-id],[data-drag]");
  if (!a) return;
  let e = a.dataset.id || null;
  if ("small" === a.dataset.drag) {
    if (!pa) return;
    e = "@small";
  }
  e && (t.preventDefault(), (ka = { id: e, x0: t.clientX, y0: t.clientY, moved: 0 }));
}),
  window.addEventListener("pointermove", function (a) {
    const e = ka;
    if (!e) return;
    const o = a.clientX - e.x0,
      r = a.clientY - e.y0;
    if (!e.moved && o * o + r * r > 49) {
      ((e.moved = 1), (qs("#cinv").hidden = !0));
      const a = qs("#fpGhost");
      "@small" !== e.id && ((a.src = s(items[e.id].k, items[e.id].c)), (a.hidden = !1));
    }
    if (e.moved) {
      const e = qs("#fp").getBoundingClientRect(),
        o = qs("#fpGhost");
      ((o.style.left = a.clientX - e.left + "px"),
        (o.style.top = a.clientY - e.top + "px"),
        (va = (function (a) {
          const e = qs("#fpc").getBoundingClientRect();
          return [((a.clientX - e.left) / e.width) * 384, ((a.clientY - e.top) / e.height) * 216];
        })(a)));
    }
  }),
  window.addEventListener("pointerup", function (a) {
    const e = ka;
    if (!e) return;
    if (((ka = null), (qs("#fpGhost").hidden = !0), (va = null), !e.moved))
      return void (function (t) {
        if ("goggles" === t || "gloves" === t) return ja(t);
        if ("@small" === t)
          return Ya("Drag the small beaker onto the big beaker to pour it in.", "");
        const a = Xt[t];
        Ya(
          "<b>" +
            items[t].n +
            "</b><br>" +
            (a ? a.what : "") +
            '<br><span style="color:#ffe070">Drag it onto the table to use it.</span>',
          "",
        );
      })(e.id);
    const o = document.elementFromPoint(a.clientX, a.clientY),
      r = o && o.closest ? o.closest("[data-drop]") : null;
    !(function (a, e) {
      const o = (t) => Ya(t, "bad"),
        r = (t) => Ya(t, "good");
      if (((qs("#cdone").textContent = "CLOSE"), "goggles" === a || "gloves" === a)) return ja(a);
      if (!e)
        return Ya(
          "Drop it on the table: on a beaker" + (La() ? " or on the assembly mat" : "") + ".",
          "",
        );
      if ("@small" === a) {
        if ("main" !== e) return o("Pour the small beaker into the <b>big beaker</b>.");
        const t = pa,
          a = ga.length;
        return (ja(t), void (ga.length > a && ((pa = null), Va("pour", Ca[t]), Ya(ma, ya))));
      }
      if (Ra.includes(a)) {
        if ("main" === e)
          return o(
            "<b>Not straight from the bottle.</b> Measure one part into the <b>small beaker</b> first, then pour the small beaker into the big one. That is how you control the amounts.",
          );
        if ("small" !== e) return o("Liquids go into the <b>small beaker</b>.");
        if (!Xa()) return;
        return pa
          ? o(
              "The small beaker already holds " +
                items[pa].n.split(" (")[0] +
                ". Pour it into the big beaker first, or press EMPTY.",
            )
          : ((pa = a),
            Va("fill", Ca[a]),
            r(
              "One measured part of <b>" +
                items[a].n.split(" (")[0] +
                "</b> is in the small beaker. Now drag the small beaker onto the big beaker to pour it in.",
            ));
      }
      if (["salt", "sugar", "soda", "rod", "strip"].includes(a)) {
        if ("small" === e)
          return o(
            "The small beaker is only for measuring liquids. That goes in the <b>big beaker</b>.",
          );
        if ("main" !== e) return o("That goes in the <b>big beaker</b>.");
        const t = ga.length,
          r = b,
          n = g;
        return (
          ja(a),
          void (ga.length > t
            ? Va("sprinkle", "#f4f4ff")
            : b && !r
              ? Va("stir")
              : g && !n && Va("strip"))
        );
      }
      if (Ia[a])
        return e === Ia[a]
          ? ((ua[Oa[a]] = 1),
            Va("click"),
            void (
              Qa() ||
              r(
                "<b>" +
                  items[a].n +
                  "</b> is on the mat." +
                  ("canister" === a ? " Now drop the venom vials into it." : ""),
              )
            ))
          : o(
              "sh" === e || "sb" === e || "sc" === e || "tray" === e
                ? "That part does not fit there. Match each part to its outline: HANDLE, CANISTER, BARREL."
                : "Weapon parts go on the <b>assembly mat</b> on the left.",
            );
      if (Pa.includes(a)) {
        if ("sc" !== e) return o("Venom vials are poured into the <b>Venom Canister</b>.");
        if (!ua.c)
          return o("Put the <b>Venom Canister</b> on the mat first, then drop the vials into it.");
        if (!Xa()) return;
        if ((inv.splice(inv.indexOf(a), 1), canFill++, Va("venom", "#b06aff"), canFill >= 3)) {
          const t = inv.indexOf("canister");
          (t >= 0 && inv.splice(t, 1),
            inv.push("fullcan"),
            got.add("fullcan"),
            Qa() ||
              r(
                "<b>FULL VENOM CANISTER!</b> All three vials are sealed inside. Now put the <b>handle</b> and the <b>barrel</b> on the mat to assemble the weapon.",
              ));
        } else
          r(
            "Venom vial " +
              canFill +
              " of 3 poured into the canister. The venom hisses against the steel.",
          );
        updateGuide();
      } else Ya("That does not belong on the bench.", "");
    })(e.id, r ? r.dataset.drop : null);
  }),
  window.addEventListener("pointercancel", () => {
    ((ka = null), (va = null), (qs("#fpGhost").hidden = !0));
  }),
  (qs("#fpBag").onclick = () => {
    const a = qs("#cinv");
    a.hidden = !a.hidden;
  }));
const $a = { ArrowLeft: "l", a: "l", A: "l", ArrowRight: "r", d: "r", D: "r" };
(window.addEventListener(
  "keydown",
  function (a) {
    if (!GM.on) return;
    const e = a.key;
    if (c2cut) return (("Escape" !== e && "Enter" !== e) || c2CutEnd(), void a.preventDefault());
    if (cine) return (("Escape" !== e && "Enter" !== e) || skipCine(), void a.preventDefault());
    modal
      ? "Escape" === e && (2 === modal ? Na() : qs("#gkOk").click())
      : $a[e]
        ? ((keys[$a[e]] = 1), a.preventDefault(), a.stopPropagation())
        : "ArrowUp" === e || "w" === e || "W" === e || " " === e
          ? ((jumpBuf = 8), (keys.u = 1), a.preventDefault(), a.stopPropagation())
          : "j" === e || "J" === e || "x" === e || "X" === e || "z" === e || "Z" === e
            ? ((punchBuf = 8), a.preventDefault(), a.stopPropagation())
            : "f" === e || "F" === e || "k" === e || "K" === e
              ? ((shootBuf = 3), a.preventDefault(), a.stopPropagation())
              : ("e" !== e &&
                  "E" !== e &&
                  "Enter" !== e &&
                  "ArrowDown" !== e &&
                  "s" !== e &&
                  "S" !== e) ||
                ((useBuf = 8), a.preventDefault(), a.stopPropagation());
  },
  !0,
),
  window.addEventListener(
    "keyup",
    function (t) {
      const a = $a[t.key];
      (a && GM.on && (keys[a] = 0), /^(ArrowUp|w|W| )$/.test(t.key) && (keys.u = 0));
    },
    !0,
  ));
const _a = {};
function te(a, e, o) {
  const r = qs(a);
  _a[a] = { b: r, down: e, up: o, on: !1 };
  const n = () => {
      const t = _a[a];
      t.on || ((t.on = !0), r.classList.add("on"), e());
    },
    l = () => {
      const t = _a[a];
      t.on && ((t.on = !1), r.classList.remove("on"), o && o());
    };
  ((_a[a].press = n), (_a[a].rel = l));
  const s = (t) => {
    "touch" !== t.pointerType && (t.preventDefault(), l());
  };
  (r.addEventListener("pointerdown", (t) => {
    if ("touch" !== t.pointerType) {
      t.preventDefault();
      try {
        r.setPointerCapture(t.pointerId);
      } catch (t) {}
      n();
    }
  }),
    r.addEventListener("pointerup", s),
    r.addEventListener("pointercancel", s),
    r.addEventListener("lostpointercapture", s),
    r.addEventListener("contextmenu", (t) => t.preventDefault()));
}
(te(
  "#bL",
  () => (keys.l = 1),
  () => (keys.l = 0),
),
  te(
    "#bR",
    () => (keys.r = 1),
    () => (keys.r = 0),
  ),
  te(
    "#bJ",
    () => ((jumpBuf = 8), (keys.u = 1)),
    () => (keys.u = 0),
  ),
  te("#bP", () => (punchBuf = 8)),
  te("#bU", () => (useBuf = 8)),
  te(
    "#bS",
    () => {
      ((keys.s = 1), (shootBuf = 3));
    },
    () => (keys.s = 0),
  ));
const ae = (t) => {
  t.cancelable && t.preventDefault();
  const a = {};
  for (const e of t.touches) {
    const t = document.elementFromPoint(e.clientX, e.clientY),
      o = t && t.closest ? t.closest(".pad") : null;
    o && (a["#" + o.id] = 1);
  }
  for (const t in _a) a[t] ? _a[t].press() : _a[t].rel();
};
{
  const a = qs("#gp");
  ["touchstart", "touchmove", "touchend", "touchcancel"].forEach((t) =>
    a.addEventListener(t, ae, { passive: !1 }),
  );
}
function ee() {
  (document.body.classList.remove("ingame", "ch2"),
    (GM.on = !1),
    cancelAnimationFrame(Ot),
    (e.hidden = !0),
    (ctx = ht),
    (ot.hidden = !0));
  try {
    N.focus();
  } catch (t) {}
}
function enterRoom(t, e) {
  (room !== t && ($sx("door"), $.push([t, runT])),
    (room = t),
    (player.x = "R" === e ? (rooms[t].W || 192) - 14 : 14),
    (player.y = void 0 !== rooms[t].sy ? rooms[t].sy : a),
    (player.vx = 0),
    (player.vy = 0),
    (player.face = "R" === e ? -1 : 1),
    (roomBanner = 140),
    (parts = []),
    (camX = Math.max(0, Math.min((rooms[t].W || 192) - 192, player.x - 96))),
    (minis = []),
    (drops = []),
    backdrops[t] || backdrop(t),
    "exitlab" !== t || bossDone || cine || ((player.x = 24), spawnBoss()),
    "outside" === t && ((snakeBoss = null), (venoms = []), (waves = []), (shots = [])),
    c2Enter(t),
    updateGuide(),
    updateHud());
}
