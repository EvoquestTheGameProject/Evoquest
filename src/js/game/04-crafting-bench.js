function da(t) {
  const a = 384;
  for (let e = 0; e < 104; e++)
    for (let o = 0; o < a; o++) {
      const a = (e / 12) | 0,
        n = 8 * (1 & a),
        l = (o + n) % 16,
        s = e % 12,
        c = r(31 * (((o + n) / 16) | 0) + 7 * a, 1);
      let i = Ct([58, 88, 82], [36, 60, 56], 0.7 * c);
      const f = It(o / 22, e / 16, 3);
      ((i = Ct(i, [16, 28, 24], Rt(1.8 * (f - 0.42)))),
        (i = Ct(i, [24, 26, 16], 0.6 * Rt((e / 104) * 0.55 + 0.8 * (It(o / 9, e / 30, 5) - 0.5)))),
        c > 0.94
          ? (i = Ct([10, 14, 12], [26, 22, 16], It(o / 3, e / 3, 9)))
          : 0 === l || 0 === s
            ? ((i = [12, 20, 18]),
              It(o / 4, e / 4, 7) > 0.5 + 0.1 * Et(o, e) &&
                (i = It(o / 3, e / 3, 8) > 0.6 ? [70, 140, 60] : [38, 90, 40]))
            : 1 === s || 1 === l
              ? (i = Ct(i, [170, 200, 190], 0.12))
              : (11 !== s && 15 !== l) || (i = Ct(i, [0, 0, 0], 0.18)),
        t.px(o, e, i));
    }
  for (let e = 0; e < 14; e++) {
    const o = r(e, 2) * a,
      n = 8 + 30 * r(e, 3),
      l = 30 + 60 * r(e, 4);
    for (let a = n; a < Math.min(104, n + l); a++) {
      const r = 1 + ((a - n) / l) * 2;
      for (let s = 0; s < r; s++)
        t.px(o + s + 0.6 * Math.sin(0.1 * a + e), a, [70, 46, 22], 0.28 * (1 - (a - n) / l));
    }
  }
  ([
    [60, 10, 70, 30, 64, 44],
    [180, 60, 188, 74, 184, 90],
    [262, 88, 270, 96, 268, 104],
    [20, 70, 28, 80, 22, 92],
  ].forEach((a) => {
    (t.line(a[0], a[1], a[2], a[3], [8, 10, 8], 0.9),
      t.line(a[2], a[3], a[4], a[5], [8, 10, 8], 0.9));
  }),
    [
      [2, 5],
      [9, 4],
    ].forEach(([e, o], r) => {
      for (let n = 0; n < a; n++)
        for (let a = 0; a < o; a++) {
          const l = It(n / 7, (e + a) / 3, 40 + r);
          let s = 0 === a ? [150, 140, 120] : a === o - 1 ? [30, 26, 22] : [96, 88, 76];
          (l > 0.55 && (s = Ct(s, l > 0.66 ? [170, 86, 34] : [110, 54, 24], 0.8)),
            t.px(n, e + a, s));
        }
      for (let n = 30 + 50 * r; n < a; n += 96)
        (t.rect(n, e - 1, 4, o + 2, [60, 52, 44]), t.rect(n, e - 1, 4, 1, [150, 140, 120]));
    }),
    xe(t, 10, 52, 134, 5, "#3a3228", "#8a7658", "#120e0a"),
    [[16], [134]].forEach(([a]) => {
      (t.rect(a, 57, 3, 8, "#2a241c"), t.rect(a, 57, 1, 8, "#5a4c3a"));
    }),
    Ee(t, 16, 52, 7, 7, 15),
    Ee(t, 74, 52, 2, 11, 9),
    [
      [18, 40],
      [34, 38],
      [58, 41],
      [76, 44],
    ].forEach(([a, e], o) => {
      (t.line(a, e, a + 2, e + 4, [255, 255, 255]),
        t.line(a + 2, e + 4, a + 1, e + 8, [255, 255, 255]),
        t.px(a + 3, e + 5, [200, 230, 245]));
    }),
    t.rect(42, 28, 6, 8, [34, 40, 36]),
    t.line(42, 36, 44, 33, [220, 240, 250]),
    t.line(44, 33, 46, 36, [220, 240, 250]));
  for (let a = 14; a < 84; a++)
    for (let e = 26; e < 52; e++) Et(a, e) < 0.12 && t.px(a, e, [170, 160, 130], 0.35);
  xe(t, 94, 42, 26, 10, "#8a7048", "#c8a870", "#3a2c18");
  for (let a = 0; a < 4; a++)
    (t.rect(97 + 6 * a, 34, 4, 12, [12, 16, 20]),
      t.rect(98 + 6 * a, 35, 2, 10, [200, 232, 255]),
      t.rect(
        98 + 6 * a,
        41,
        2,
        4,
        [
          [230, 106, 90],
          [90, 232, 138],
          [90, 168, 232],
          [232, 216, 90],
        ][a],
      ));
  (xe(t, 124, 42, 14, 10, "#8a5a3a", "#b87a4a", "#3a2416"),
    Fa(t, 131, 38, 6, 4),
    Fa(t, 127, 34, 4, 9),
    Fa(t, 135, 33, 4, 13),
    Ga(t, 10, 47, 134, 7, 11));
  for (let a = 0; a < 8; a++)
    t.line(10 + 4 * a, 57, 10 + 6 * a, 70 + (a % 3) * 4, [200, 210, 200], 0.18);
  xe(t, 240, 14, 124, 70, "#5a4630", "#8a7050", "#1e160c");
  for (let a = 19; a < 82; a += 6)
    for (let e = 244; e < 362; e += 6)
      (t.px(e, a, [30, 22, 12]), t.px(e + 1, a, [110, 90, 64], 0.4));
  for (let a = 14; a < 84; a++)
    for (let e = 240; e < 364; e++) It(e / 9, a / 7, 51) > 0.58 && t.px(e, a, [40, 30, 18], 0.45);
  (t.rect(252, 22, 2, 4, "#6a7478"),
    t.line(253, 26, 249, 50, "#aab4b8"),
    t.line(254, 26, 250, 50, "#6a7478"),
    t.line(253, 26, 257, 50, "#aab4b8"),
    t.line(268, 43, 276, 28, "#c8d0d4"),
    t.line(272, 43, 264, 28, "#c8d0d4"),
    t.disc(266, 46, 3, (t, a) => (t * t + a * a > 4 ? [200, 68, 42] : null)),
    t.disc(274, 46, 3, (t, a) => (t * t + a * a > 4 ? [200, 68, 42] : null)),
    t.rect(286, 24, 3, 22, "#e8eef0"),
    t.rect(286, 24, 3, 5, "#3a8aff"),
    t.rect(287, 46, 1, 6, "#cfe8ff"),
    xe(t, 350, 90, 16, 11, "#d8d4c8", "#ffffff", "#8a8478"),
    t.rect(354, 93, 2, 3, "#2a2a2a"),
    t.rect(360, 93, 2, 3, "#2a2a2a"),
    t.sag(358, 101, 374, 134, 6, [18, 20, 22]),
    ve(t, -4, 6, 130, 14, 16, 3, 2),
    ve(t, 120, 4, 250, 10, 12, 5, 2),
    ve(t, 236, 8, 388, 16, 14, 7, 2, [255, 226, 110]),
    ve(t, 240, 20, 300, 80, -10, 11, 2),
    ve(t, 360, 14, 330, 84, 8, 13, 2),
    [
      [6, 70],
      [14, 50],
      [26, 82],
      [52, 30],
      [84, 44],
      [110, 28],
      [150, 52],
      [168, 38],
      [232, 90],
      [246, 60],
      [298, 38],
      [322, 70],
      [346, 30],
      [366, 92],
      [378, 56],
    ].forEach(([a, e], o) =>
      Ba(t, a, 6, e, 3 * o + 2, o % 4 == 0 ? [255, 134, 208] : o % 5 == 0 ? [255, 226, 110] : null),
    ),
    [
      [0, 6, 9],
      [18, 4, 7],
      [128, 8, 7],
      [226, 6, 8],
      [372, 8, 10],
      [384, 30, 8],
    ].forEach(([a, e, o], r) => Fa(t, a, e, o, 5 * r + 21)),
    Ga(t, 0, 94, a, 10, 31),
    Ga(t, 0, 0, 40, 20, 32),
    Ga(t, 344, 0, 40, 24, 33),
    t.rect(0, 96, a, 6, [34, 40, 36]),
    t.rect(0, 96, a, 1, [90, 100, 92]),
    t.rect(0, 101, a, 1, [8, 10, 8]),
    Ga(t, 0, 92, a, 6, 61));
  for (let e = 102; e < 200; e++)
    for (let o = 0; o < a; o++) {
      let n = Ct([118, 122, 116], [70, 74, 70], ((e - 102) / 98) * 0.8);
      n = Ct(n, [150, 154, 146], 0.12 * (r(7 * e, (o / 60) | 0) - 0.5) + 0.06);
      const l = (o - 192) / 150,
        s = (e - 150) / 34,
        c = Math.max(0, 1 - l * l - s * s);
      c > 0.6 * Et(o, e) && (n = Ct(n, [214, 212, 196], 0.35 * c));
      const i = Math.min(o, a - o, 3 * (200 - e)),
        f = It(o / 9, e / 5, 21);
      (i < 40 && f > 0.5 + i / 90
        ? (n = Ct(n, f > 0.64 ? [176, 96, 40] : [120, 62, 28], 0.75))
        : f > 0.72 && (n = Ct(n, [128, 92, 56], 0.25)),
        t.px(o, e, n));
    }
  for (let e = 0; e < 26; e++) {
    const o = r(e, 141) * a,
      n = 106 + 90 * r(e, 142),
      l = 6 + 18 * r(e, 143);
    t.line(o, n, o + l, n + 2 * r(e, 144) - 1, [200, 204, 196], 0.35);
  }
  [
    [246, 140, 9],
    [60, 124, 6],
    [300, 186, 7],
  ].forEach(([a, e, o]) => {
    for (let r = 0; r < 6.28; r += 0.06)
      t.px(a + Math.cos(r) * o, e + Math.sin(r) * o * 0.35, [110, 80, 40], 0.3);
  });
  for (let a = 0; a < 9; a++) {
    const e = 6 + 46 * a;
    (t.disc(e, 198, 1, [70, 72, 66]), t.px(e - 1, 197, [200, 200, 190]));
  }
  (t.rect(0, 199, a, 2, [196, 198, 188]), t.rect(0, 201, a, 1, [140, 142, 134]));
  for (let e = 202; e < 216; e++)
    for (let o = 0; o < a; o++) {
      let a = Ct([84, 86, 80], [34, 36, 32], (e - 202) / 14);
      const r = It(o / 8, e / 4, 71);
      (r > 0.56 && (a = Ct(a, r > 0.66 ? [160, 84, 34] : [104, 52, 24], 0.7)), t.px(o, e, a));
    }
  for (let e = 0; e < 14; e++) {
    const o = r(e, 151) * a,
      n = 3 + 7 * r(e, 152);
    t.line(o, 202, o, 202 + n, [140, 70, 30], 0.6);
  }
  const e = (a, e, o, r, n) => {
    for (let l = -r; l <= r; l++)
      for (let s = -o; s <= o; s++) {
        const c = (s * s) / (o * o) + (l * l) / (r * r);
        c < 1 && Et(a + s, e + l) < (1 - c) * n && t.px(a + s, e + l, [10, 12, 10], 0.7);
      }
  };
  (e(358, 172, 22, 4, 0.85),
    xe(t, 338, 160, 40, 10, "#8a6a44", "#c8a070", "#3a2a18"),
    xe(t, 340, 150, 36, 3, "#8a6a44", "#c8a070", "#3a2a18"),
    [
      [342, "#e86a5a"],
      [350, "#5ae88a"],
      [358, "#5aa8e8"],
      [366, "#e8d85a"],
      [372, "#c85ae8"],
    ].forEach(([a, e], o) => {
      (t.rect(a, 134, 5, 30, [20, 26, 30]),
        t.rect(a + 1, 135, 3, 28, [200, 230, 245]),
        t.rect(a + 1, 148 + (o % 2) * 2, 3, 15 - (o % 2) * 2, e),
        t.rect(a + 1, 135, 1, 27, [255, 255, 255]),
        t.rect(a, 134, 5, 1, [240, 250, 255]));
    }),
    [
      [350, 141],
      [366, 138],
    ].forEach(([a, e]) => {
      (t.line(a + 1, e, a + 3, e + 4, [255, 255, 255]),
        t.line(a + 3, e + 4, a + 2, e + 8, [255, 255, 255]),
        t.line(a + 3, e + 4, a + 4, e + 6, [230, 245, 255]),
        t.px(a + 2, e + 8, [150, 170, 180]));
    }),
    t.rect(372, 134, 2, 1, [20, 26, 30]),
    t.px(374, 135, [255, 255, 255]),
    t.px(373, 133, [200, 230, 245]),
    t.rect(367, 163, 1, 3, [232, 216, 90]),
    t.disc(368, 169, 2, (t, a) => (Math.abs(a) < 1.2 ? [232, 216, 90, 0.8] : null)),
    t.px(367, 168, [255, 250, 200]),
    [
      [150, 176, 0],
      [214, 172, 1],
      [246, 124, 2],
      [86, 190, 1],
    ].forEach(([a, o, r]) => {
      const n = [
        [90, 138, 42],
        [138, 122, 42],
        [168, 90, 42],
      ][r];
      (e(a + 1, o + 2, 3, 1, 0.5),
        t.disc(a, o, 2, (t, a) => (Math.abs(a) <= 1 ? n : null)),
        t.line(a - 2, o, a + 2, o, Ct(n, [0, 0, 0], 0.3)));
    }));
  for (let e = 0; e < a; e += 2) {
    if (e > 34 && e < 350) continue;
    const a = 14 * r(e, 125);
    a > 1 &&
      t.line(
        e,
        216,
        e + 3 * (r(e, 7) - 0.5),
        216 - a,
        r(e, 126) < 0.5 ? [38, 90, 40] : [70, 140, 60],
      );
  }
  (Ga(t, 0, 198, 40, 10, 51),
    Ga(t, 346, 198, 38, 10, 52),
    Da(t, 8, 216, 22, 3, [20, 90, 50], [120, 220, 100]),
    Da(t, 378, 216, 20, 5, [20, 90, 50], [120, 220, 100]),
    Oe(t, 20, 200, 3),
    Oe(t, 366, 200, 8),
    t.light(192, 22, 190, "#fff0c8", 0.55, 0.85),
    t.light(192, 150, 90, "#fff4d8", 0.18, 0.35),
    t.light(60, 40, 80, "#9affc0", 0.25),
    t.light(330, 60, 90, "#9affc0", 0.2),
    t.fog(0, 60, a, 112, "#c8e8d0", 0.45, 9, 40, 8, 0.12),
    t.vig(0.4));
}
let ba = null,
  ga = [],
  pa = null,
  ua = { h: 0, b: 0, c: 0 },
  ma = "",
  ya = "",
  xa = 0,
  wa = null,
  va = null,
  ka = null,
  Ea = 0,
  Ta = -1e4;
const Sa = (t) => ga.filter((a) => a === t).length,
  Ca = { water: "#5fb8ff", hcl: "#e8e060", h2o2: "#c9a86a", salt: "#f4f4ff" },
  Ra = ["water", "hcl", "h2o2"],
  Pa = ["vial1", "vial2", "vial3"],
  Ia = { handle: "sh", barrel: "sb", canister: "sc", fullcan: "sc" },
  Oa = { handle: "h", barrel: "b", canister: "c", fullcan: "c" },
  La = () =>
    (!hasGun && (Zt("canister") || Zt("fullcan") || Zt("barrel") || Zt("handle") || Pa.some(Zt))) ||
    performance.now() - Ta < 4e3;
function openBench() {
  ((modal = 2),
    (ga = []),
    (pa = null),
    (Ea = 0),
    (wa = null),
    (b = g = !1),
    (qs("#gx").hidden = !1),
    (qs("#cinv").hidden = !0),
    (qs("#cdone").textContent = "CLOSE"),
    Ya(
      "<b>Workbench.</b> Open your <b>BAG</b> and drag things onto the table. Liquids must be measured in the <b>small beaker</b> first, then poured into the big one. Safety gear first: tap your goggles and gloves." +
        (La() ? " Weapon parts go on the <b>assembly mat</b>." : ""),
      "",
    ),
    cancelAnimationFrame(xa),
    (xa = requestAnimationFrame(Za)));
}
function Na() {
  ((qs("#gx").hidden = !0),
    (modal = 0),
    (ga = []),
    (pa = null),
    (b = g = !1),
    cancelAnimationFrame(xa),
    (ka = null),
    (qs("#fpGhost").hidden = !0),
    updateBag(),
    updateGuide(),
    updateHud());
}
function Ya(a, e) {
  ((ma = a), (ya = e || ""));
  const o = inv.filter((t) => "potion" !== t && "blaster" !== t);
  qs("#cinv").innerHTML =
    o
      .map(
        (t) =>
          '<button data-id="' +
          t +
          '" class="' +
          (("goggles" === t && worn) || ("gloves" === t && gloved) ? "worn" : "") +
          '"><img draggable="false" src="' +
          s(items[t].k, items[t].c) +
          '"><span>' +
          ((t) =>
            "goggles" === t
              ? worn
                ? "GOGGLES ✔"
                : "GOGGLES (tap)"
              : "gloves" === t
                ? gloved
                  ? "GLOVES ✔"
                  : "GLOVES (tap)"
                : items[t].n.split(" (")[0])(t) +
          "</span></button>",
      )
      .join("") || "<p>Your bag is empty.</p>";
  const r = (t, a) =>
    '<span class="chip' + (a ? " on" : "") + '">' + (a ? "✔ " : "") + t + "</span>";
  qs("#cst").innerHTML =
    r("Goggles", worn) +
    r("Gloves", gloved) +
    '<span class="chip">Beaker ' +
    ga.length +
    "/6</span>" +
    r("Stirred", b) +
    r("Tested", g) +
    (La() && !hasGun
      ? '<br><span class="chip' +
        (canFill >= 3 ? " on" : "") +
        '">Venom ' +
        canFill +
        "/3</span>" +
        r("Handle", ua.h) +
        r("Barrel", ua.b)
      : "");
  const n = qs("#cmsg");
  ((n.className = e || ""),
    (n.innerHTML = Qt(a)),
    (qs("#cmix").disabled = !(
      3 === Sa("water") &&
      1 === Sa("hcl") &&
      1 === Sa("h2o2") &&
      1 === Sa("salt") &&
      b &&
      g
    )));
  const l = La();
  (["zTray", "zH", "zC", "zB"].forEach((a) => (qs("#" + a).style.display = l ? "" : "none")),
    (qs("#fpBag").innerHTML =
      '<img draggable="false" src="' + s("bottle", "#e8e060") + '">BAG ' + o.length));
}
function Va(t, a) {
  wa = { k: t, c: a, t0: performance.now() };
}
function ja(t) {
  const a = (t) => Ya(t, "bad"),
    e = (t) => Ya(t, "good");
  if ("goggles" === t)
    return (
      (worn = !worn),
      e(
        worn
          ? "Goggles on. Eyes protected."
          : "Goggles off. Put them back on before touching anything.",
      )
    );
  if ("gloves" === t)
    return ((gloved = !gloved), e(gloved ? "Gloves on. Skin protected." : "Gloves off."));
  if (!worn || !gloved)
    return a(
      "STOP! " +
        (worn ? "" : "<b>Goggles</b> ") +
        (worn || gloved ? "" : "and ") +
        (gloved ? "" : "<b>gloves</b> ") +
        "first. Acid and peroxide can burn skin and blind you.",
    );
  if ("soda" === t)
    return a(
      "Baking soda is a <b>base</b>. It neutralizes acid: HCl + NaHCO₃ → NaCl + H₂O + CO₂ (the fizz). It would cancel the acid you need. Keep it out.",
    );
  if ("sugar" === t)
    return a(
      "Sugar dissolves in water but doesn’t react with acid or iron at this strength. It would only dilute the mix.",
    );
  if ("rod" === t) {
    if (!ga.length) return a("Nothing to stir yet.");
    if (b) return a("Already mixed. Stirring again won’t change anything until you add something.");
    b = !0;
    const t = Sa("hcl") > 0;
    return e(
      Sa("salt") > 0
        ? "Stirring dissolves the salt into free Na⁺ and Cl⁻ ions. Those chloride ions are what sneak through the oxide skin on metal."
        : t
          ? "Stirring spreads the heat and the H⁺ ions evenly, so there are no hot spots. Glass is used because it won’t react with acid."
          : "Stirred. Everything is evenly mixed.",
    );
  }
  return "strip" === t
    ? Sa("hcl")
      ? b
        ? ((g = !0),
          e(
            "The strip turns <b>red: pH ≈ 1</b>. pH is a log scale, so this is about a million times more acidic than water (pH 7). Strong enough to eat iron, weak enough to handle with gear." +
              (Sa("h2o2") && Sa("salt")
                ? ""
                : "<br>(You’re not finished yet. Test again after adding the rest.)"),
          ))
        : a("Stir first. An unmixed beaker gives a misleading reading.")
      : a("The strip would only read pH 7 (neutral water). Test after the acid is in.")
    : ga.length >= 6
      ? a("The beaker is full.")
      : "water" === t
        ? Sa("hcl")
          ? a(
              "<b>Never add water to acid.</b> A little water on concentrated acid can boil and spit. The rule is ACID INTO WATER. Pour the water first.",
            )
          : Sa("water") >= 3
            ? a(
                "3 parts of water is the right dilution. More would make the mix too weak to dissolve metal.",
              )
            : (ga.push("water"),
              (b = g = !1),
              e(
                "Distilled water, part " +
                  Sa("water") +
                  " of 3. It is the safe base that will soak up the heat when the acid goes in.",
              ))
        : "hcl" === t
          ? Sa("water") < 3
            ? a(
                "Dilute first. Acid dissolving in water releases heat, so you want 3 parts water ready to absorb it. Fill to the 3 mark.",
              )
            : Sa("hcl")
              ? a("One part acid is plenty. Any more would get too hot and give off fumes.")
              : (ga.push("hcl"),
                (b = g = !1),
                e(
                  "Acid goes <b>into</b> the water. HCl splits into H⁺ and Cl⁻ ions. The H⁺ attacks metal: <b>Fe + 2HCl → FeCl₂ + H₂↑</b>. Stir it in.",
                ))
          : "h2o2" === t
            ? Sa("hcl")
              ? b
                ? Sa("h2o2")
                  ? a("One part is enough.")
                  : (ga.push("h2o2"),
                    (b = g = !1),
                    e(
                      "Peroxide is an <b>oxidizer</b>: it pulls electrons off metal atoms so the acid can bite deeper and faster. (Real labs do this in a fume hood, because HCl + H₂O₂ slowly makes chlorine gas.)",
                    ))
                : a(
                    "Stir the acid in first. Adding the oxidizer to an unmixed, hot pocket of acid is how accidents happen.",
                  )
              : a(
                  "Peroxide in plain water does nothing to metal. An oxidizer needs the acid’s H⁺ to work. Add the acid first.",
                )
            : "salt" === t
              ? Sa("h2o2")
                ? Sa("salt")
                  ? a("One pinch is enough.")
                  : (ga.push("salt"),
                    (b = g = !1),
                    e(
                      "Salt adds extra <b>chloride ions (Cl⁻)</b> that slip through the metal’s oxide skin, and dries out plant cells by <b>osmosis</b> so the vines wilt. Stir to dissolve it, then test the pH.",
                    ))
                : a(
                    "Salt goes in last, into the finished acid-and-oxidizer mix, so it dissolves fully into chloride ions.",
                  )
              : void 0;
}
function Xa() {
  return (
    !(!worn || !gloved) ||
    (Ya(
      "STOP! " +
        (worn ? "" : "<b>Goggles</b> ") +
        (worn || gloved ? "" : "and ") +
        (gloved ? "" : "<b>gloves</b> ") +
        "first. Tap them in your BAG to put them on.",
      "bad",
    ),
    !1)
  );
}
function Qa() {
  return (
    !!(ua.h && ua.b && ua.c) &&
    (Zt("fullcan")
      ? (["fullcan", "barrel", "handle"].forEach((t) => {
          const a = inv.indexOf(t);
          a >= 0 && inv.splice(a, 1);
        }),
        inv.push("blaster"),
        got.add("blaster"),
        (hasGun = !0),
        (ammo = 4),
        (ua = { h: 0, b: 0, c: 0 }),
        (Ta = performance.now()),
        Ya(
          "<b>VENOM BLASTER ASSEMBLED!</b> The canister locks onto the barrel and the handle clicks in. It only holds <b>4 shots</b>. SHOOT with F / K or the shoot button. Take it down to the sealed door.",
          "good",
        ),
        updateHud(),
        updateGuide(),
        !0)
      : (Ya(
          "Handle and barrel are in place, but the canister is not full. Drop the <b>3 venom vials</b> into it (" +
            canFill +
            "/3).",
          "",
        ),
        !0))
  );
}
function Ka(t, a, e, o, n, l, s) {
  const c = (t, a) => r(13 * n + t, a),
    i = [],
    f = (t, a, e, o, r, n) => {
      for (let l = 0; l < r; l++) {
        const s = l / r;
        i.push([
          t + (e - t) * s + 1.4 * (c(l, n) - 0.5),
          a + (o - a) * s + 1.4 * (c(l, n + 1) - 0.5),
        ]);
      }
    };
  (f(-a / 2, -e / 2, a / 2, -e / 2, 6, 1),
    f(a / 2, -e / 2, a / 2, e / 2, 6, 3),
    f(a / 2, e / 2, -a / 2, e / 2, 6, 5),
    f(-a / 2, e / 2, -a / 2, -e / 2, 6, 7),
    s && (i[18] = [i[18][0] + 3, i[18][1] - 3]));
  const h = () => {
    (t.beginPath(),
      i.forEach((a, e) => (e ? t.lineTo(a[0], a[1]) : t.moveTo(a[0], a[1]))),
      t.closePath());
  };
  (t.save(),
    t.translate(1.5, 2),
    h(),
    (t.fillStyle = "rgba(0,0,0,.42)"),
    t.fill(),
    t.restore(),
    h());
  const d = St(o),
    b = t.createLinearGradient(-a / 2, -e / 2, a / 2, e / 2);
  (b.addColorStop(0, "rgb(" + d.map((t) => Math.min(255, t + 14)).join(",") + ")"),
    b.addColorStop(1, "rgb(" + d.map((t) => (0.74 * t) | 0).join(",") + ")"),
    (t.fillStyle = b),
    t.fill(),
    t.save(),
    h(),
    t.clip(),
    l && l());
  for (let o = 0; o < 4; o++) {
    const r = (c(o, 21) - 0.5) * a,
      n = -e / 2,
      l = (c(o, 22) - 0.5) * a,
      s = e / 2,
      i = (r + l) / 2 + 6 * (c(o, 23) - 0.5);
    ((t.lineWidth = 0.7),
      (t.strokeStyle = "rgba(60,40,20,.32)"),
      t.beginPath(),
      t.moveTo(r, n),
      t.lineTo(i, 0),
      t.lineTo(l, s),
      t.stroke(),
      (t.strokeStyle = "rgba(255,255,245,.45)"),
      t.beginPath(),
      t.moveTo(r + 0.8, n),
      t.lineTo(i + 0.8, 0),
      t.lineTo(l + 0.8, s),
      t.stroke());
  }
  ((t.fillStyle = "rgba(120,80,30,.28)"),
    t.beginPath(),
    t.ellipse((c(1, 31) - 0.5) * a * 0.6, (c(1, 32) - 0.5) * e * 0.6, 0.28 * a, 0.2 * e, 0.4, 0, 7),
    t.fill(),
    (t.strokeStyle = "rgba(110,70,30,.4)"),
    (t.lineWidth = 0.6),
    t.beginPath(),
    t.ellipse((c(2, 31) - 0.5) * a * 0.5, (c(2, 32) - 0.2) * e * 0.6, 0.18 * a, 0.12 * e, 0, 0, 7),
    t.stroke(),
    (t.fillStyle = "rgba(90,60,30,.35)"),
    t.fillRect((c(3, 31) - 0.5) * a * 0.6, -e / 2, 1.4, 0.6 * e));
  for (let o = 0; o < 8; o++)
    ((t.fillStyle = "rgba(60,100,50,.7)"),
      t.fillRect(a / 2 - 4 + 3 * c(o, 41), e / 2 - 5 + 4 * c(o, 42), 1, 1));
  if ((t.restore(), s)) {
    const a = i[18];
    ((t.fillStyle = "rgba(0,0,0,.25)"),
      t.beginPath(),
      t.moveTo(a[0], a[1]),
      t.lineTo(a[0] - 6, a[1]),
      t.lineTo(a[0], a[1] - 6),
      t.closePath(),
      t.fill(),
      (t.fillStyle = "#d8cca8"),
      t.beginPath(),
      t.moveTo(a[0] - 5, a[1] + 1),
      t.lineTo(a[0] + 1, a[1] + 1),
      t.lineTo(a[0] + 1, a[1] - 5),
      t.closePath(),
      t.fill());
  }
}
function Za() {
  qs("#gx").hidden ||
    ((function (a) {
      const e = qs("#fpc").getContext("2d");
      e.imageSmoothingEnabled = !1;
      const o = (t, a, o, r, n) => {
          ((e.fillStyle = t),
            e.fillRect(Math.round(a), Math.round(o), Math.round(r), Math.round(n)));
        },
        n = (t, a) => {
          ((e.fillStyle = t),
            e.beginPath(),
            a.forEach((t, a) => (a ? e.lineTo(t[0], t[1]) : e.moveTo(t[0], t[1]))),
            e.closePath(),
            e.fill());
        },
        l = (t, a, o, r, n) => {
          const l = i(t, a);
          l.complete && e.drawImage(l, o, r, n, n);
        },
        s = (t, a, o, r, n, l) => {
          ((e.font = (n || 4) + 'px "Press Start 2P"'),
            (e.textBaseline = "top"),
            (e.fillStyle = r));
          const s = e.measureText(t).width;
          return (e.fillText(t, "c" === l ? a - s / 2 : a, o), s);
        },
        c = (t, a, r, n) => {
          e.font = '4px "Press Start 2P"';
          const l = e.measureText(t).width;
          (o("rgba(4,10,14,.82)", a - l / 2 - 3, r - 1, l + 6, 8),
            o(n, a - l / 2 - 3, r - 1, l + 6, 1),
            s(t, a, r + 0.5, n, 4, "c"));
        };
      (ha || (ha = Ae(da)), e.drawImage(ha, 0, 0));
      {
        const t = 218,
          a = 44,
          r = 9,
          n = new Date(),
          l = (((n.getHours() % 12) + n.getMinutes() / 60) / 12) * 6.283,
          s = (n.getMinutes() / 60) * 6.283,
          c = ((n.getSeconds() + n.getMilliseconds() / 1e3) / 60) * 6.283;
        ((e.fillStyle = "#0a1014"),
          e.beginPath(),
          e.arc(t, a, r + 1.5, 0, 7),
          e.fill(),
          (e.fillStyle = "#d8d2c0"),
          e.beginPath(),
          e.arc(t, a, r, 0, 7),
          e.fill(),
          (e.fillStyle = "rgba(90,70,30,.25)"),
          e.beginPath(),
          e.arc(t + 2, a + 2, r - 2, 0, 7),
          e.fill(),
          o("#2a6a30", t - r - 1, a - 3, 3, 6),
          o("#4a9a3a", t - r, a - 4, 2, 2));
        for (let e = 0; e < 12; e++)
          o(
            "#3a3a3a",
            t + Math.sin((e / 12) * 6.283) * (r - 2) - 0.5,
            a - Math.cos((e / 12) * 6.283) * (r - 2) - 0.5,
            1,
            1,
          );
        ((e.lineWidth = 1.4),
          (e.strokeStyle = "#14141a"),
          e.beginPath(),
          e.moveTo(t, a),
          e.lineTo(t + 4.5 * Math.sin(l), a - 4.5 * Math.cos(l)),
          e.stroke(),
          (e.lineWidth = 1),
          e.beginPath(),
          e.moveTo(t, a),
          e.lineTo(t + 7 * Math.sin(s), a - 7 * Math.cos(s)),
          e.stroke(),
          (e.strokeStyle = "#c83a2a"),
          (e.lineWidth = 0.6),
          e.beginPath(),
          e.moveTo(t, a),
          e.lineTo(t + 7.5 * Math.sin(c), a - 7.5 * Math.cos(c)),
          e.stroke(),
          o("#14141a", t - 1, a - 1, 2, 2));
      }
      ((function (t, a) {
        const e = (a, e, o, r, n) => {
          ((t.font = n + 'px "Press Start 2P"'),
            (t.textBaseline = "top"),
            (t.fillStyle = r),
            t.fillText(a, e, o));
        };
        (t.save(),
          t.translate(312, 40),
          t.rotate(0.22 + 0.015 * Math.sin(a / 2100)),
          Ka(
            t,
            26,
            34,
            "#e8e0c0",
            3,
            () => {
              ((t.fillStyle = "#6a5a3a"), t.fillRect(-5, -18, 10, 4));
              for (let a = 0; a < 6; a++)
                ((t.fillStyle = a < 3 ? "#3aa85a" : "#8a8470"),
                  t.fillRect(-10, 5 * a - 11, 3, 3),
                  (t.fillStyle = "#8a8470"),
                  t.fillRect(-5, 5 * a - 10, 13 + (a % 2) * 3, 1));
            },
            1,
          ),
          (t.fillStyle = "#c8442a"),
          t.fillRect(-1.5, -19, 3, 3),
          (t.fillStyle = "#ffb0a0"),
          t.fillRect(-1, -19, 1, 1),
          t.restore(),
          t.save(),
          t.translate(350, 38),
          t.rotate(0.04 * Math.sin(a / 1700 + 1) - 0.42),
          Ka(
            t,
            24,
            19,
            "#f0d448",
            5,
            () => {
              (e("ACID", -10, -7, "#2a2410", 3.4),
                e("INTO", -10, -2, "#2a2410", 3.4),
                e("WATER!", -10, 3, "#c8242a", 3.4));
            },
            1,
          ),
          t.restore(),
          t.save(),
          t.translate(337, 51),
          t.rotate(0.62 + 0.06 * Math.sin(a / 1300)),
          t.translate(12, 15),
          Ka(
            t,
            25,
            30,
            "#2a7ae8",
            7,
            () => {
              ((t.fillStyle = "#e8f2ff"),
                t.fillRect(-10, -12, 20, 18),
                (t.fillStyle = "#14202a"),
                t.beginPath(),
                t.ellipse(-4, -3, 3.4, 2.6, 0, 0, 7),
                t.ellipse(4, -3, 3.4, 2.6, 0, 0, 7),
                t.fill(),
                (t.fillStyle = "#7fe8ff"),
                t.fillRect(-6, -4, 3, 2),
                t.fillRect(2, -4, 3, 2),
                e("WEAR", -9, 8, "#e8f2ff", 3.2));
            },
            0,
          ),
          t.restore(),
          (t.fillStyle = "#c8c8cc"),
          t.fillRect(336, 50, 2, 2),
          (t.fillStyle = "rgba(30,22,12,.5)"),
          t.fillRect(352, 48, 8, 8),
          (t.fillStyle = "rgba(30,22,12,.35)"),
          t.fillRect(302, 60, 18, 4));
      })(e, a),
        (function (t, a) {
          ((t.fillStyle = "rgba(40,22,10,.85)"),
            t.beginPath(),
            t.moveTo(300, 124),
            t.bezierCurveTo(296, 114, 318, 112, 330, 118),
            t.bezierCurveTo(344, 122, 348, 132, 336, 136),
            t.bezierCurveTo(328, 140, 318, 134, 312, 138),
            t.bezierCurveTo(302, 142, 298, 132, 300, 124),
            t.fill(),
            (t.fillStyle = "rgba(70,40,18,.9)"),
            t.beginPath(),
            t.ellipse(318, 126, 12, 5, 0.1, 0, 7),
            t.fill(),
            (t.fillStyle = "rgba(255,230,190,.35)"),
            t.fillRect(310, 123, 7, 1),
            t.fillRect(330, 128, 4, 1),
            (t.strokeStyle = "rgba(30,16,6,.8)"),
            (t.lineWidth = 1.4),
            t.beginPath(),
            t.moveTo(336, 136),
            t.quadraticCurveTo(342, 160, 348, 199),
            t.stroke());
          const e = (a % 2400) / 2400;
          ((t.fillStyle = "rgba(60,32,12,.9)"),
            e < 0.8 && t.fillRect(347.5, 140 + (e / 0.8) * 58, 1.4, 2),
            (t.fillStyle = "rgba(40,22,10,.7)"),
            t.beginPath(),
            t.ellipse(349, 200.5, 4, 1.2, 0, 0, 7),
            t.fill(),
            t.save(),
            t.translate(330, 121),
            t.rotate(1.35),
            (t.fillStyle = "rgba(0,0,0,.35)"),
            t.fillRect(-7, -6, 16, 14));
          const o = t.createLinearGradient(-8, 0, 8, 0);
          (o.addColorStop(0, "#7a2418"),
            o.addColorStop(0.35, "#e8705a"),
            o.addColorStop(1, "#8a2a1e"),
            (t.fillStyle = o),
            t.beginPath(),
            t.moveTo(-8, -7),
            t.lineTo(8, -7),
            t.lineTo(8, 4),
            t.lineTo(4, 8),
            t.lineTo(1, 5),
            t.lineTo(-2, 9),
            t.lineTo(-8, 7),
            t.closePath(),
            t.fill(),
            (t.fillStyle = "#2a140c"),
            t.beginPath(),
            t.ellipse(0, -7, 8, 2, 0, 0, 7),
            t.fill(),
            (t.fillStyle = "#f0a090"),
            t.fillRect(-8, -7.5, 16, 1),
            (t.strokeStyle = "#f8d0c4"),
            (t.lineWidth = 0.6),
            t.beginPath(),
            t.moveTo(-3, -5),
            t.lineTo(-1, 0),
            t.lineTo(-4, 4),
            t.stroke(),
            (t.fillStyle = "#f4f0e8"),
            t.fillRect(-4, -3, 7, 5),
            (t.font = '2.5px "Press Start 2P"'),
            (t.textBaseline = "top"),
            (t.fillStyle = "#c84a3a"),
            t.fillText("EVO", -3.6, -1.8),
            t.restore(),
            [
              [340, 134, 0.4],
              [306, 138, -0.6],
              [322, 140, 1.2],
            ].forEach(([a, e, o], r) => {
              (t.save(),
                t.translate(a, e),
                t.rotate(o),
                (t.fillStyle = "rgba(0,0,0,.35)"),
                t.fillRect(-2, 0, 6, 2),
                (t.fillStyle = 1 === r ? "#f8e8e0" : "#c84a3a"),
                t.beginPath(),
                t.moveTo(-3, 0),
                t.lineTo(3, -1),
                t.lineTo(2, 2),
                t.closePath(),
                t.fill(),
                (t.fillStyle = "#f0a090"),
                t.fillRect(-3, 0, 4, 0.6),
                t.restore());
            }),
            t.save(),
            t.translate(296, 132),
            t.rotate(-0.8),
            (t.strokeStyle = "#b84a3a"),
            (t.lineWidth = 1.6),
            t.beginPath(),
            t.arc(0, 0, 3.4, -1.3, 1.3),
            t.stroke(),
            (t.strokeStyle = "#e8806a"),
            (t.lineWidth = 0.5),
            t.beginPath(),
            t.arc(0, 0, 3.6, -1, 0),
            t.stroke(),
            t.restore());
          for (let e = 0; e < 2; e++) {
            const o = (a / 3200 + 0.5 * e) % 1;
            ((t.fillStyle = "rgba(230,236,240," + 0.1 * (1 - o) + ")"),
              t.fillRect(318 + 2 * Math.sin(6 * o + e), 120 - 10 * o, 2, 2));
          }
        })(e, a),
        ba ||
          (ba = (function () {
            const t = document.createElement("canvas");
            ((t.width = 384), (t.height = 216));
            const a = t.getContext("2d");
            a.imageSmoothingEnabled = !1;
            const e = (t, e, o, r, n) => {
                ((a.fillStyle = t), a.fillRect(e, o, r, n));
              },
              o = (t, e) => {
                ((a.fillStyle = t),
                  a.beginPath(),
                  e.forEach((t, e) => (e ? a.lineTo(t[0], t[1]) : a.moveTo(t[0], t[1]))),
                  a.closePath(),
                  a.fill());
              },
              n = (t, a, e, o, n) => {
                const l = [];
                for (let s = 0; s < e; s++) {
                  const c = s / e;
                  l.push([
                    t[0] + (a[0] - t[0]) * c + (r(o, s) - 0.5) * n,
                    t[1] + (a[1] - t[1]) * c + (r(o + 1, s) - 0.5) * n,
                  ]);
                }
                return l;
              },
              l = [244, 182],
              s = [273, 176],
              c = [304, 171],
              i = [322, 206],
              f = [290, 209],
              h = [254, 213],
              d = (t, a, e, o, r) =>
                n(t, a, 8, r, 1.6).concat(
                  n(a, e, 8, r + 2, 1.8),
                  n(e, o, 8, r + 4, 1.6),
                  n(o, t, 8, r + 6, 1.8),
                );
            (o(
              "#b8ae94",
              d([l[0] + 2, l[1] + 2], [s[0], s[1] + 2], [f[0], f[1] + 2], [h[0] + 2, h[1] + 2], 11),
            ),
              o(
                "#b8ae94",
                d(
                  [s[0], s[1] + 2],
                  [c[0] + 2, c[1] + 2],
                  [i[0] + 2, i[1] + 2],
                  [f[0], f[1] + 2],
                  13,
                ),
              ));
            const b = d(l, s, f, h, 21),
              g = d(s, c, i, f, 23),
              p = (t, e, o) => {
                const r = a.createLinearGradient(l[0], l[1], i[0], i[1]);
                (r.addColorStop(0, e),
                  r.addColorStop(1, o),
                  (a.fillStyle = r),
                  a.beginPath(),
                  t.forEach((t, e) => (e ? a.lineTo(t[0], t[1]) : a.moveTo(t[0], t[1]))),
                  a.closePath(),
                  a.fill());
              };
            (p(b, "#efe6cc", "#d6c9a6"),
              p(g, "#e8dec2", "#cdbf9a"),
              a.save(),
              a.beginPath(),
              b.concat(g).forEach((t, e) => (e ? a.lineTo(t[0], t[1]) : a.moveTo(t[0], t[1]))),
              a.clip(),
              a.beginPath(),
              b.forEach((t, e) => (e ? a.lineTo(t[0], t[1]) : a.moveTo(t[0], t[1]))),
              a.closePath(),
              a.save(),
              a.clip(),
              (a.strokeStyle = "rgba(110,130,180,.45)"),
              (a.lineWidth = 0.5));
            for (let t = 0; t < 6; t++)
              (a.beginPath(),
                a.moveTo(247, 187 + 4.4 * t),
                a.quadraticCurveTo(258, 184 + 4.4 * t + (t % 2), 270, 183 + 4.4 * t),
                a.stroke());
            (a.restore(),
              a.save(),
              a.beginPath(),
              g.forEach((t, e) => (e ? a.lineTo(t[0], t[1]) : a.moveTo(t[0], t[1]))),
              a.closePath(),
              a.clip(),
              (a.strokeStyle = "rgba(110,130,180,.45)"),
              (a.lineWidth = 0.5));
            for (let t = 0; t < 6; t++)
              (a.beginPath(),
                a.moveTo(278, 182 + 4.6 * t),
                a.quadraticCurveTo(292, 180 + 4.6 * t - (t % 2), 306, 177 + 4.8 * t),
                a.stroke());
            (a.restore(),
              (a.font = '2.8px "Press Start 2P"'),
              (a.textBaseline = "top"),
              (a.fillStyle = "rgba(180,30,30,.85)"),
              a.fillText("pH ~1", 251, 185),
              (a.fillStyle = "rgba(40,50,110,.8)"),
              a.fillText("3:1:1", 280, 181),
              a.fillText("ACID>H2O", 279, 190),
              [
                [246, 196, 268, 190],
                [252, 206, 270, 182],
                [276, 180, 300, 200],
                [284, 206, 312, 186],
                [262, 184, 248, 208],
                [294, 176, 318, 204],
              ].forEach(([t, e, o, r]) => {
                ((a.lineWidth = 0.8),
                  (a.strokeStyle = "rgba(90,70,40,.35)"),
                  a.beginPath(),
                  a.moveTo(t, e),
                  a.lineTo((t + o) / 2 + 2, (e + r) / 2 - 1),
                  a.lineTo(o, r),
                  a.stroke(),
                  (a.strokeStyle = "rgba(255,252,236,.6)"),
                  a.beginPath(),
                  a.moveTo(t + 0.8, e + 0.8),
                  a.lineTo((t + o) / 2 + 2.8, (e + r) / 2 - 0.2),
                  a.lineTo(o + 0.8, r + 0.8),
                  a.stroke());
              }));
            for (let t = 0; t < 40; t++) {
              const a = 246 + 72 * r(t, 201),
                o = 176 + 34 * r(t, 202);
              e(
                r(t, 203) < 0.5 ? "rgba(255,255,240,.35)" : "rgba(80,60,30,.18)",
                a,
                o,
                1 + 2 * r(t, 204),
                1,
              );
            }
            ((a.strokeStyle = "rgba(120,70,30,.55)"),
              (a.lineWidth = 1.2),
              a.beginPath(),
              a.ellipse(296, 195, 7, 4.5, -0.2, 0, 6),
              a.stroke(),
              (a.fillStyle = "rgba(140,90,40,.18)"),
              a.beginPath(),
              a.ellipse(296, 195, 6, 3.8, -0.2, 0, 7),
              a.fill(),
              (a.fillStyle = "rgba(150,120,70,.28)"),
              a.beginPath(),
              a.moveTo(250, 198),
              a.bezierCurveTo(254, 190, 266, 194, 264, 202),
              a.bezierCurveTo(262, 210, 248, 208, 250, 198),
              a.fill(),
              (a.strokeStyle = "rgba(120,90,40,.45)"),
              (a.lineWidth = 0.6),
              a.stroke());
            for (let t = 0; t < 14; t++)
              e(
                t % 3 ? "rgba(70,110,50,.7)" : "rgba(40,70,30,.8)",
                306 + 12 * r(t, 211),
                178 + 10 * r(t, 212),
                1,
                1,
              );
            ((a.fillStyle = "rgba(110,70,30,.4)"), a.fillRect(268, 176, 2, 12), a.restore());
            for (let t = 0; t < 9; t++) {
              const o = t / 8,
                r = s[0] + (f[0] - s[0]) * o,
                n = s[1] + 2 + (f[1] - s[1] - 3) * o;
              ((a.strokeStyle = "#4a5058"),
                (a.lineWidth = 0.8),
                a.beginPath(),
                a.ellipse(r, n, 1.6, 1.2, 0, 0, 7),
                a.stroke(),
                e("#d8dce0", r - 1, n - 1.2, 1, 1));
            }
            (o("rgba(0,0,0,.2)", [
              [l[0], l[1]],
              [l[0] + 9, l[1] - 1],
              [l[0] + 2, l[1] + 9],
            ]),
              o("#c4b58e", [
                [l[0] + 1, l[1] + 1],
                [l[0] + 8, l[1]],
                [l[0] + 3, l[1] + 7],
              ]),
              o("#e8dcbc", [
                [l[0] + 3, l[1] + 1],
                [l[0] + 8, l[1]],
                [l[0] + 3, l[1] + 6],
              ]),
              o("#3a4044", [
                [i[0] - 6, i[1] - 1],
                [i[0] + 1, i[1] - 6],
                [i[0] + 1, i[1] + 1],
              ]),
              o("#f4ecd4", [
                [c[0] - 2, c[1] + 1],
                [c[0] + 3, c[1] + 2],
                [c[0] + 6, c[1] + 10],
                [c[0] + 1, c[1] + 8],
              ]),
              o("rgba(0,0,0,.18)", [
                [c[0] + 1, c[1] + 8],
                [c[0] + 6, c[1] + 10],
                [c[0] + 4, c[1] + 12],
              ]));
            const u = document.createElement("canvas");
            ((u.width = 384), (u.height = 216));
            const m = u.getContext("2d");
            return (
              m.drawImage(t, 0, 0),
              (m.globalCompositeOperation = "source-atop"),
              (m.fillStyle = "rgba(30,26,18,.42)"),
              m.fillRect(0, 0, 384, 216),
              { a: t, d: u }
            );
          })()),
        (e.fillStyle = "rgba(6,8,6,.4)"),
        e.beginPath(),
        e.moveTo(240, 186),
        e.lineTo(302, 176),
        e.lineTo(318, 199),
        e.lineTo(250, 201),
        e.closePath(),
        e.fill(),
        e.drawImage(ba.a, 0, 0, 384, 200, 0, 0, 384, 200),
        o("rgba(0,0,0,.35)", 248, 203, 74, 13),
        e.drawImage(ba.d, 0, 200, 384, 16, 2, 200, 384, 30),
        o("rgba(255,255,255,.35)", 250, 199.5, 70, 1),
        e.save(),
        e.translate(238, 196),
        e.rotate(0.18),
        (e.fillStyle = "rgba(0,0,0,.3)"),
        e.fillRect(-10, 2, 22, 2),
        o("#f2c440", -10, -1.5, 20, 3),
        o("#ffe08a", -10, -1.5, 20, 1),
        o("#c8962a", -10, 1, 20, 0.5),
        o("#c8c8cc", 10, -1.5, 2, 3),
        o("#e8a8a0", 12, -1.5, 3, 3),
        n("#e8c89a", [
          [-10, -1.5],
          [-14, 0],
          [-10, 1.5],
        ]),
        o("#2a2a2a", -14.5, -0.5, 1, 1),
        e.restore());
      {
        ((e.fillStyle = "rgba(6,8,6,.4)"),
          e.beginPath(),
          e.ellipse(226, 189, 14, 4, 0, 0, 7),
          e.fill());
        const t = ctx;
        ((ctx = e),
          e.save(),
          e.translate(224, 180),
          e.rotate(0.35),
          mo(24, 26, 0, 9, 0),
          e.restore(),
          (ctx = t));
      }
      {
        const t = a % 6100 < 70 && ((a / 35) | 0) % 2 ? 0.45 : 1;
        (o("#05080a", 191, 0, 2, 10),
          n("#2a3a40", [
            [180, 10],
            [204, 10],
            [210, 18],
            [174, 18],
          ]),
          o("#5a7a80", 180, 10, 24, 1),
          o("#6a3a1c", 184, 12, 6, 2),
          o("rgba(255,248,220," + 0.9 * t + ")", 186, 18, 12, 2));
        const l = e.createLinearGradient(0, 18, 0, 216);
        (l.addColorStop(0, "rgba(255,244,214," + 0.2 * t + ")"),
          l.addColorStop(1, "rgba(255,244,214,0)"),
          (e.fillStyle = l),
          e.beginPath(),
          e.moveTo(176, 18),
          e.lineTo(208, 18),
          e.lineTo(300, 216),
          e.lineTo(84, 216),
          e.closePath(),
          e.fill(),
          t < 1 && o("rgba(0,0,0,.18)", 0, 0, 384, 216));
        for (let t = 0; t < 14; t++) {
          const e = (a / 9e3 + r(t, 71)) % 1,
            n = 176 + 32 * r(t, 72) + e * (r(t, 73) - 0.5) * 90;
          o("rgba(255,250,230," + 0.45 * (1 - e) + ")", n, 22 + 120 * e, 1, 1);
        }
      }
      {
        const t = 1900,
          r = (a % t) / t;
        if (r < 0.75) o("rgba(200,235,255,.85)", 150, 13 + (r / 0.75) * 85, 1, 2);
        else {
          const t = (r - 0.75) / 0.25;
          ((e.strokeStyle = "rgba(200,235,255," + (1 - t) + ")"),
            (e.lineWidth = 0.6),
            e.beginPath(),
            e.ellipse(150, 99, 6 * t, 1.4 * t, 0, 0, 7),
            e.stroke());
        }
      }
      for (let t = 0; t < 12; t++) {
        const n =
            (384 * r(t, 151) + 14 * Math.sin(a / 1800 + t) + 0.004 * a * ((t % 3) - 1) + 384) % 384,
          l = 20 + 170 * r(t, 152) + 6 * Math.cos(a / 1500 + 2 * t),
          s = 0.35 + 0.4 * Math.sin(a / 400 + 1.7 * t);
        if (s > 0.1 && (o("rgba(200,255,140," + s + ")", n, l, 1, 1), s > 0.6)) {
          const t = e.createRadialGradient(n, l, 0, n, l, 4);
          (t.addColorStop(0, "rgba(190,255,120,.25)"),
            t.addColorStop(1, "rgba(190,255,120,0)"),
            (e.fillStyle = t),
            e.fillRect(n - 4, l - 4, 8, 8));
        }
      }
      {
        const t = (a % 7e3) / 7e3;
        if (t < 0.6) {
          const a = t / 0.6,
            r = 120 + 60 * a + 8 * Math.sin(14 * a),
            n = 10 + 96 * a;
          (e.save(),
            e.translate(r, n),
            e.rotate(Math.sin(10 * a)),
            o("#5aa83a", -2, -1, 4, 2),
            o("#3a7a2a", -2, 0, 4, 1),
            e.restore());
        }
      }
      if (
        ([
          [20, 196],
          [366, 196],
        ].forEach(([t, o], r) => {
          const n = 0.18 + 0.12 * Math.sin(a / 600 + 2 * r),
            l = e.createRadialGradient(t, o, 0, t, o, 14);
          (l.addColorStop(0, "rgba(120,255,210," + n + ")"),
            l.addColorStop(1, "rgba(120,255,210,0)"),
            (e.fillStyle = l),
            e.fillRect(t - 14, o - 14, 28, 28));
        }),
        1)
      ) {
        const t = [],
          c = (a, e, o, n, l, s) => {
            for (let c = 0; c < l; c++) {
              const i = c / l;
              t.push([
                a + (o - a) * i + 2.2 * (r(s, c) - 0.5),
                e + (n - e) * i + 2.2 * (r(s + 1, c) - 0.5),
              ]);
            }
          };
        (c(22, 111, 146, 109, 14, 3),
          c(146, 109, 149, 170, 8, 5),
          t.push([149, 170], [140, 174]),
          c(140, 174, 24, 176, 12, 7),
          c(24, 176, 20, 111, 8, 9),
          (e.fillStyle = "rgba(6,8,6,.42)"),
          e.beginPath(),
          t.forEach((t, a) => (a ? e.lineTo(t[0] + 3, t[1] + 3) : e.moveTo(t[0] + 3, t[1] + 3))),
          e.closePath(),
          e.fill(),
          e.save(),
          e.beginPath(),
          t.forEach((t, a) => (a ? e.lineTo(t[0], t[1]) : e.moveTo(t[0], t[1]))),
          e.closePath(),
          e.clip());
        {
          const t = e.createLinearGradient(20, 110, 150, 176);
          (t.addColorStop(0, "#2a5a8a"),
            t.addColorStop(1, "#1c3e64"),
            (e.fillStyle = t),
            e.fillRect(18, 106, 136, 74));
        }
        for (let t = 24; t < 150; t += 6) o("rgba(200,230,255,.10)", t, 106, 1, 72);
        for (let t = 112; t < 178; t += 6) o("rgba(200,230,255,.10)", 18, t, 134, 1);
        [
          [22, 128, 150, 150, 1],
          [60, 108, 96, 178, 0],
          [110, 108, 82, 178, 1],
        ].forEach(([t, a, o, r, n]) => {
          ((e.strokeStyle = "rgba(0,0,0,.28)"),
            (e.lineWidth = 1),
            e.beginPath(),
            e.moveTo(t, a),
            e.lineTo(o, r),
            e.stroke(),
            (e.strokeStyle = "rgba(220,240,255,.22)"),
            e.beginPath(),
            e.moveTo(t + 1, a + 1),
            e.lineTo(o + 1, r + 1),
            e.stroke());
        });
        {
          const t = e.createLinearGradient(20, 110, 150, 176);
          (t.addColorStop(0, "rgba(255,255,255,.08)"),
            t.addColorStop(0.35, "rgba(0,0,0,.0)"),
            t.addColorStop(0.36, "rgba(0,0,0,.14)"),
            t.addColorStop(0.6, "rgba(255,255,255,.06)"),
            t.addColorStop(0.61, "rgba(0,0,0,.12)"),
            t.addColorStop(1, "rgba(0,0,0,.05)"),
            (e.fillStyle = t),
            e.fillRect(18, 106, 136, 74));
        }
        ((e.fillStyle = "rgba(120,90,50,.35)"),
          e.beginPath(),
          e.ellipse(122, 160, 14, 7, 0.3, 0, 7),
          e.fill(),
          (e.strokeStyle = "rgba(90,60,30,.5)"),
          (e.lineWidth = 0.8),
          e.beginPath(),
          e.ellipse(46, 124, 7, 3, 0, 0, 7),
          e.stroke(),
          e.restore(),
          n("#3a6a9a", [
            [140, 174],
            [149, 170],
            [144, 167],
          ]),
          n("#16324e", [
            [140, 174],
            [144, 167],
            [138, 168],
          ]),
          o("rgba(232,224,190,.75)", 24, 108, 12, 5),
          o("rgba(232,224,190,.75)", 134, 106, 12, 5));
        for (let t = 0; t < 9; t++)
          o(t % 2 ? "#2c6a30" : "#4a9a3a", 20 + 14 * r(t, 61), 170 + 5 * r(t, 62), 2, 2);
        (s("VB-23 SPRAYER", 26, 113, "#cfe8ff", 3), s("REV.4", 126, 169, "#cfe8ff", 2.6));
        const i = (t, a, o, r, n, l) => {
          ((e.strokeStyle = l ? "rgba(138,255,154,.9)" : "rgba(200,220,230,.5)"),
            (e.lineWidth = 1),
            e.setLineDash(l ? [] : [3, 2]),
            e.strokeRect(t + 0.5, a + 0.5, o, r),
            e.setLineDash([]),
            s(n, t + o / 2, a + r + 2, l ? "#8aff9a" : "#8aa0aa", 3.5, "c"));
        };
        if (
          (i(28, 132, 30, 30, "HANDLE", ua.h),
          i(64, 120, 36, 32, "CANISTER", ua.c),
          i(106, 132, 38, 22, "BARREL", ua.b),
          ua.h && l("handle", "#8a6a4a", 30, 133, 26),
          ua.b && l("barrel", "#8a94ac", 112, 130, 26),
          ua.c)
        ) {
          if (
            (l("canister", canFill >= 3 ? "#b06aff" : "#3a4258", 68, 121, 28),
            canFill > 0 &&
              canFill < 3 &&
              o("#b06aff", 79.7, 142 - 3.5 * canFill, 4.6, 3.5 * canFill),
            canFill > 0)
          ) {
            const t = e.createRadialGradient(82, 136, 1, 82, 136, 16);
            (t.addColorStop(0, "rgba(176,106,255," + 0.12 * canFill + ")"),
              t.addColorStop(1, "rgba(176,106,255,0)"),
              (e.fillStyle = t),
              e.fillRect(60, 114, 44, 44));
          }
          for (let t = 0; t < 3; t++) o(t < canFill ? "#b06aff" : "#2a3440", 72 + 7 * t, 156, 5, 2);
        }
        const f = a - Ta;
        if (f < 4e3) {
          const t = 44 + 2 * Math.sin(f / 200),
            a = e.createRadialGradient(85, 140, 2, 85, 140, 50);
          (a.addColorStop(0, "rgba(200,150,255,.55)"),
            a.addColorStop(1, "rgba(200,150,255,0)"),
            (e.fillStyle = a),
            e.fillRect(30, 90, 110, 100),
            l("blaster", "#b06aff", 85 - t / 2, 140 - t / 2, t));
          for (let t = 0; t < 8; t++) {
            const a = (t / 8) * 6.283 + f / 400,
              e = 26 + 4 * Math.sin(f / 150 + t);
            o(
              t % 2 ? "#ffffff" : "#d8a0ff",
              85 + Math.cos(a) * e,
              140 + Math.sin(a) * e * 0.7,
              2,
              2,
            );
          }
        }
      }
      const h = (t, l, s, c, i, f, h, d) => {
          ((d = d || 1),
            (e.fillStyle = "rgba(4,10,12,.32)"),
            e.beginPath(),
            e.ellipse(t + 3, s + 2, c + 5, 3.5, 0, 0, 7),
            e.fill(),
            o("rgba(170,220,240,.10)", t - c, l, 2 * c, s - l));
          let b = s;
          if (f.length) {
            let e = [0, 0, 0];
            (f.forEach((t) => {
              const a = St(7 === t.length ? t : "#888888");
              e = [e[0] + a[0], e[1] + a[1], e[2] + a[2]];
            }),
              (e = e.map((t) => (t / f.length) | 0)),
              f.forEach((a) => {
                const r = h ? "rgb(" + e.join(",") + ")" : a;
                (o(r, t - c + 2, b - i, 2 * c - 4, i),
                  o("rgba(255,255,255,.16)", t - c + 2, b - i, 2 * c - 4, 1),
                  (b -= i));
              }));
            const r = 0.6 * Math.sin(a / 500);
            (o("rgba(255,255,255,.6)", t - c + 2, b + r, 2 * c - 4, 1),
              o("rgba(255,255,255,.22)", t - c + 3, b + 1, 3, s - b - 2));
          }
          (o("#cfe8ff", t - c, l, 2, s - l),
            o("#cfe8ff", t + c - 2, l, 2, s - l),
            o("#cfe8ff", t - c, s - 2, 2 * c, 2),
            o("#eaf8ff", t - c - 2, l - 2, 2 * c + 4, 2),
            o("#8ab8cc", t - c, s, 2 * c, 1),
            n("#eaf8ff", [
              [t - c - 2, l - 2],
              [t - c - 6, l - 5],
              [t - c - 4, l - 2],
            ]),
            o("rgba(255,255,255,.5)", t - c + 4, l + 4, 2, 0.55 * (s - l)),
            o("rgba(255,255,255,.25)", t + c - 6, l + 6, 1, 0.3 * (s - l)));
          const g = s - l;
          (o("rgba(170,160,130,.10)", t - c + 2, l, 2 * c - 4, g),
            [0.32, 0.58].forEach((a, e) => {
              const n = s - g * a;
              o("rgba(236,226,196,.32)", t - c + 2, n, 2 * c - 4, 1);
              for (let a = 0; a < 5; a++)
                o(
                  "rgba(236,226,196,.25)",
                  t - c + 3 + r(d + e, a) * (2 * c - 6),
                  n + 1,
                  1 + 3 * r(a, d),
                  1,
                );
            }),
            o("rgba(90,70,40,.35)", t - c + 2, s - 4, 2 * c - 4, 2),
            (e.lineWidth = 0.7),
            [
              [0.18, 0],
              [0.72, 1],
            ].forEach(([a, o]) => {
              let n = t - c + 2 + a * (2 * c - 4),
                s = l;
              const i = [[n, s]];
              for (let t = 0; t < 5; t++)
                ((n += 6 * (r(7 * d + o, t) - 0.5)),
                  (s += 0.06 * g + r(3 * d + o, t) * g * 0.06),
                  i.push([n, s]));
              ((e.strokeStyle = "rgba(255,255,255,.75)"),
                e.beginPath(),
                i.forEach((t, a) => (a ? e.lineTo(t[0], t[1]) : e.moveTo(t[0], t[1]))),
                e.stroke(),
                (e.strokeStyle = "rgba(40,60,70,.45)"),
                e.beginPath(),
                i.forEach((t, a) =>
                  a ? e.lineTo(t[0] + 0.8, t[1] + 0.6) : e.moveTo(t[0] + 0.8, t[1] + 0.6),
                ),
                e.stroke());
              const f = i[2];
              ((e.strokeStyle = "rgba(255,255,255,.6)"),
                e.beginPath(),
                e.moveTo(f[0], f[1]),
                e.lineTo(f[0] + (o ? -5 : 5), f[1] + 3),
                e.stroke());
            }));
          const p = t + 0.35 * c;
          (n("rgba(14,24,22,.9)", [
            [p - 3, l - 2],
            [p + 3, l - 2],
            [p + 1, l + 2],
            [p - 1, l + 1],
          ]),
            o("#ffffff", p - 3, l - 2, 1, 1),
            o("#ffffff", p + 2, l - 2, 1, 1));
          for (let a = 0; a < 10; a++) {
            const e = t - c - 2 + 8 * r(d, a + 20),
              n = 1 + 4 * r(d, a + 30);
            o(a % 3 ? "#2c6a30" : "#4a9a3a", e, s - n, 2, n);
          }
          for (let a = 0; a < 7; a++) {
            const e = t + c - 4 + 6 * r(d, a + 40);
            o(a % 2 ? "#2c6a30" : "#4a9a3a", e, s - 1 - 3 * r(d, a + 50), 2, 2);
          }
          let u = t - c;
          for (let a = 0; a < 0.42 * g; a += 2)
            ((u = t - c - 1 + 1.2 * Math.sin(0.3 * a + d)),
              o(a % 6 ? "#1e5a2c" : "#3a8a3a", u, s - a, 1.5, 2),
              a % 8 == 4 && o("#5ab04a", u - 2, s - a, 2, 1.5));
          return b;
        },
        p = 192,
        u = 152,
        m = ka && ka.moved && "@small" === ka.id,
        y = wa && a - wa.t0 < 900 ? wa : null,
        x = y ? (a - y.t0) / 900 : 0;
      ((e.fillStyle = "#6a5a40"),
        e.beginPath(),
        e.ellipse(p, 153, 34, 4, 0, 0, 7),
        e.fill(),
        (e.fillStyle = "#8a7654"),
        e.beginPath(),
        e.ellipse(p, u, 32, 3, 0, 0, 7),
        e.fill());
      const M = h(
        p,
        64,
        u,
        30,
        12,
        ga.map((t) => Ca[t] || "#888888"),
        b,
        3,
      );
      for (let t = 1; t <= 6; t++)
        (o("#cfe8ff", 210, u - 12 * t, 10, 1),
          t % 2 == 0 &&
            (o("#cfe8ff", 206, u - 12 * t, 14, 1),
            s(String(t), 203, u - 12 * t - 2, "#cfe8ff", 3)));
      if (Sa("salt") && !b)
        for (let t = 0; t < 14; t++) o("#ffffff", 168 + 48 * r(t, 41), 148 - 5 * r(t, 42), 1, 1);
      if (Sa("hcl"))
        for (let t = 0; t < (Sa("h2o2") ? 12 : 6); t++) {
          const e = 149 - ((a / 14 + 37 * t) % Math.max(4, u - M - 4));
          o("rgba(255,255,255,.75)", 168 + 48 * r(t, 43) + 1.5 * Math.sin(a / 200 + t), e, 1, 1);
        }
      if (Sa("h2o2") && Sa("hcl"))
        for (let t = 0; t < 3; t++) {
          const e = (a / 2400 + t / 3) % 1;
          o(
            "rgba(230,240,200," + 0.16 * (1 - e) + ")",
            182 + 10 * t + 3 * Math.sin(5 * e + t),
            M - 4 - 26 * e,
            3,
            3,
          );
        }
      (g && (o("#f4f0dc", 156, 70, 4, 14), o("#e83a3a", 156, 78, 4, 6)),
        c("MAIN BEAKER", p, 159, "#8fd8ff"));
      if (m || (y && "pour" === y.k))
        (e.setLineDash([2, 2]),
          (e.strokeStyle = "rgba(207,232,255,.35)"),
          e.strokeRect(261.5, 117.5, 29, 40),
          e.setLineDash([]));
      else {
        h(276, 118, 158, 14, 22, pa ? [Ca[pa]] : [], 0, 7);
        for (let t = 1; t <= 2; t++) o("#cfe8ff", 282, 158 - 11 * t, 6, 1);
      }
      (c(
        pa ? "MEASURE: " + items[pa].n.split(" (")[0].split(" ")[0].toUpperCase() : "MEASURE",
        276,
        165,
        pa ? "#ffe070" : "#8fd8ff",
      ),
        pa &&
          !m &&
          ((a / 600) | 0) % 2 &&
          (o("#ffe070", 275, 106, 2, 5),
          n("#ffe070", [
            [273, 111],
            [279, 111],
            [276, 114],
          ])));
      const w = (t, a, r, n) => {
        (e.save(),
          e.translate(t, a),
          e.rotate(r),
          o("rgba(170,220,240,.14)", -14, -20, 28, 40),
          n && o(n, -12, -2, 24, 20),
          o("#cfe8ff", -14, -20, 2, 40),
          o("#cfe8ff", 12, -20, 2, 40),
          o("#cfe8ff", -14, 18, 28, 2),
          o("#eaf8ff", -16, -22, 32, 2),
          (e.strokeStyle = "rgba(255,255,255,.7)"),
          (e.lineWidth = 0.7),
          e.beginPath(),
          e.moveTo(-8, -20),
          e.lineTo(-6, -12),
          e.lineTo(-9, -4),
          e.stroke(),
          o("rgba(170,160,130,.12)", -12, -20, 24, 38),
          e.restore());
      };
      if (m && va) {
        const t = va[0] > 152 && va[0] < 232 && va[1] > 40 && va[1] < 160;
        (t &&
          ((e.strokeStyle = "rgba(255,224,112,.8)"),
          e.setLineDash([3, 2]),
          e.strokeRect(160.5, 60.5, 63, 94),
          e.setLineDash([])),
          w(va[0], va[1] - 4, t ? -0.6 : -0.12, Ca[pa]));
      }
      if (y) {
        if ("pour" === y.k) {
          if (
            (w(236, 54, -1.05 * Math.sin(Math.min(1, 1.3 * x) * Math.PI), x < 0.7 ? y.c : null),
            x > 0.15 && x < 0.8)
          )
            for (let t = 58; t < M; t += 2) o(y.c, 214 + Math.sin(0.5 * t + a / 60), t, 3, 2);
          if (x > 0.3 && x < 0.85)
            for (let t = 0; t < 5; t++)
              o(
                "rgba(255,255,255,.7)",
                208 + 12 * r(t, (a / 60) | 0),
                M - 2 - 4 * r(t + 3, (a / 60) | 0),
                1,
                1,
              );
        }
        if ("fill" === y.k)
          for (let t = 92; t < 136; t += 2)
            x < 0.6 && o(y.c, 275 + Math.sin(0.5 * t + a / 60), t, 3, 2);
        if ("sprinkle" === y.k)
          for (let t = 0; t < 16; t++) {
            const a = (1.6 * x + 0.5 * r(t, 51)) % 1;
            o("#ffffff", 180 + 24 * r(t, 52), 34 + a * (M - 64 + 30), 1.5, 1.5);
          }
        if ("stir" === y.k) {
          const t = 18 * x,
            a = p + 14 * Math.cos(t);
          ((e.strokeStyle = "#eaf8ff"),
            (e.lineWidth = 2),
            e.beginPath(),
            e.moveTo(a - 10, 24),
            e.lineTo(a, 144),
            e.stroke(),
            (e.strokeStyle = "rgba(255,255,255,.5)"),
            (e.lineWidth = 1),
            e.beginPath(),
            e.ellipse(p, M + 2, 20, 3, 0, t, t + 4),
            e.stroke());
        }
        if ("strip" === y.k) {
          const t = 34 * Math.sin(Math.min(1, 1.2 * x) * Math.PI);
          (o("#f4f0dc", 188, 20 + t, 8, 34),
            o(x > 0.45 ? "#e83a3a" : "#e8d83a", 188, 46 + t, 8, 8));
        }
        if ("venom" === y.k)
          for (let t = 0; t < 12; t++) {
            const a = (1.5 * x + 0.4 * r(t, 61)) % 1;
            o(t % 2 ? "#b06aff" : "#e0c0ff", 80 + 6 * r(t, 62), 98 + 30 * a, 2, 2);
          }
        if ("click" === y.k)
          for (let t = 0; t < 8; t++) {
            const a = (t / 8) * 6.283,
              e = 26 * x;
            o("#eaf8ff", 85 + Math.cos(a) * e, 142 + Math.sin(a) * e * 0.7, 2, 2);
          }
      }
      if (ka && ka.moved && "@small" !== ka.id) {
        const t = ka.id,
          o = 0.45 + 0.35 * Math.sin(a / 120);
        ((e.lineWidth = 1),
          e.setLineDash([3, 2]),
          (e.strokeStyle = "rgba(255,224,112," + o + ")"),
          Ra.includes(t)
            ? e.strokeRect(258.5, 114.5, 35, 48)
            : Pa.includes(t)
              ? e.strokeRect(62.5, 118.5, 40, 36)
              : Ia[t]
                ? e.strokeRect(
                    ...{
                      handle: [26.5, 130.5, 34, 34],
                      canister: [62.5, 118.5, 40, 36],
                      fullcan: [62.5, 118.5, 40, 36],
                      barrel: [104.5, 130.5, 42, 26],
                    }[t],
                  )
                : "goggles" !== t && "gloves" !== t && e.strokeRect(160.5, 60.5, 63, 94),
          e.setLineDash([]));
      }
      if (worn) {
        o("rgba(120,230,255,.04)", 0, 0, 384, 216);
        const t = e.createRadialGradient(192, 108, 150, 192, 108, 240);
        (t.addColorStop(0, "rgba(10,20,24,0)"),
          t.addColorStop(1, "rgba(10,20,24,.55)"),
          (e.fillStyle = t),
          e.fillRect(0, 0, 384, 216),
          o("rgba(160,240,255,.18)", 60, 2, 264, 1));
      }
      gloved && (o("rgba(74,154,255,.9)", 4, 4, 6, 6), o("#9ad0ff", 4, 4, 6, 1));
    })(performance.now()),
    (xa = requestAnimationFrame(Za)));
}
