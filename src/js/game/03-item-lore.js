const Xt = {
  goggles: {
    what: "Chemical splash goggles: a sealed plastic frame with a polycarbonate lens and small vents that keep liquids out.",
    real: "Required in every school and industrial lab, and worn by plumbers, cleaners and pool technicians who handle acids or bleach.",
    how: "Tap them in your BAG at the workbench to put them on. Nothing can be poured until they are on.",
    safe: "Ordinary glasses are not enough: splashes run around the sides. Goggles must seal against the face.",
    fact: "Eye injuries from chemicals are among the most common lab accidents, and almost all of them happen to people not wearing goggles.",
  },
  gloves: {
    what: "Thin disposable gloves made of nitrile, a synthetic rubber that resists many acids, oils and solvents.",
    real: "Used by nurses, doctors, lab scientists, tattoo artists and food workers. Nitrile replaced latex because many people are allergic to latex.",
    how: "Tap them in your BAG at the workbench. They go on together with the goggles before you touch any chemical.",
    safe: "Gloves only buy you seconds. If acid lands on a glove, take it off right away and wash your hands.",
    fact: "Blue and purple gloves are popular in labs because a tear or a splash is easy to spot on them.",
  },
  water: {
    what: "Water with the dissolved minerals removed by boiling it and collecting the steam (distillation). Chemically it is almost pure H₂O.",
    real: "Used in labs, car batteries, steam irons, medical equipment and aquariums, anywhere minerals would cause scale or ruin a reaction.",
    how: "Measure it in the small beaker, then pour into the main beaker. You need 3 parts, and it goes in first.",
    safe: "Always add ACID TO WATER, never water to acid. A lot of water soaks up the heat safely.",
    fact: "Distilled water does not conduct electricity well. It is the dissolved ions in tap water that carry the current.",
  },
  hcl: {
    what: "Hydrochloric acid: hydrogen chloride gas dissolved in water. It splits into H⁺ and Cl⁻ ions, and the H⁺ is what makes it acidic.",
    real: 'Used to "pickle" steel (strip rust before painting), clean concrete and bricks, control pool pH, and make PVC plastic and food additives.',
    how: "Measure 1 part in the small beaker, then pour it into the 3 parts of water. It attacks iron: Fe + 2HCl → FeCl₂ + H₂↑.",
    safe: "Burns skin and gives off choking fumes. Use goggles, gloves and fresh air, and add it slowly to water.",
    fact: "Your stomach makes hydrochloric acid (about pH 1.5) to digest food. A layer of mucus stops it digesting you.",
  },
  h2o2: {
    what: "Hydrogen peroxide: water with an extra oxygen atom. It is an oxidizer, meaning it pulls electrons away from other substances.",
    real: "The 3% brown bottle cleans cuts and disinfects surfaces. Stronger versions bleach paper and hair, and very strong ones power rocket engines.",
    how: "Measure 1 part in the small beaker and pour it in after the acid is stirred. It helps the acid eat metal much faster.",
    safe: "Strong peroxide burns skin white. With hydrochloric acid it slowly makes chlorine gas, so real labs use a fume hood.",
    fact: "It is kept in dark bottles because light breaks it down into water and oxygen: that is the fizz on a cut.",
  },
  salt: {
    what: "Sodium chloride (NaCl), ordinary table salt. In water it splits into sodium ions (Na⁺) and chloride ions (Cl⁻).",
    real: "Seasons and preserves food, de-ices winter roads, softens water, and is a raw material for making chlorine and soap.",
    how: "Drop it straight into the main beaker last, after the peroxide. Then stir to dissolve it.",
    safe: "Harmless in small amounts, but chloride is why salty roads and sea air rust cars and bridges.",
    fact: "Salt pulls water out of cells by osmosis. That is why it dries out the barricade vines and why slugs shrivel in salt.",
  },
  rod: {
    what: "A solid rod of borosilicate glass, the same heat-resistant glass used for beakers and test tubes.",
    real: "Used in every chemistry lab to stir solutions and to guide a liquid when pouring so it does not splash.",
    how: "Drop it into the main beaker to stir. Stir after the acid goes in and again after the salt.",
    safe: "Never stir acid with a metal spoon: the metal would dissolve and could react.",
    fact: "Borosilicate glass barely expands when heated, so it does not crack when hot liquid touches it.",
  },
  strip: {
    what: "Paper soaked in a mix of dyes (indicators) that change colour depending on how acidic or basic a liquid is.",
    real: "Used to test pool and aquarium water, soil for gardening, urine at the doctor, and food acidity in factories.",
    how: "Dip it into the main beaker once everything is stirred. Red means strongly acidic (pH 1 to 2).",
    safe: "Each step on the pH scale is 10 times stronger: pH 1 is a million times more acidic than pH 7.",
    fact: "Red cabbage juice works as a homemade pH indicator: it turns pink in acid and green or yellow in a base.",
  },
  soda: {
    what: "Sodium bicarbonate (NaHCO₃), a weak base. It reacts with acids and releases carbon dioxide gas.",
    real: "Makes cakes rise, settles an upset stomach, cleans ovens, and is kept in lab spill kits to neutralize acid spills.",
    how: "Not part of the solvent. It would cancel the acid: HCl + NaHCO₃ → NaCl + H₂O + CO₂.",
    safe: "Great for cleaning up a small acid spill, after the area is safe.",
    fact: 'The "volcano" science project is just baking soda and vinegar (an acid) making CO₂ bubbles.',
  },
  sugar: {
    what: "Sucrose (C₁₂H₂₂O₁₁), made of glucose and fructose joined together. It dissolves easily but does not split into ions.",
    real: "Sweetens food, preserves jam, feeds yeast to make bread rise, and is fermented into fuel ethanol.",
    how: "Not useful here. It does not react with the acid or the metal and would only dilute the mix.",
    safe: "Concentrated sulfuric acid can rip the water out of sugar and turn it into a column of black carbon.",
    fact: "Sugar solutions do not conduct electricity, because sugar molecules stay whole instead of forming ions.",
  },
  canister: {
    what: "A sealed steel pressure canister with a valve on top, built to hold and spray a liquid.",
    real: "Real pressurized canisters hold fire extinguisher foam, paint, cooking oil sprays and pepper spray, all pushed out by stored gas pressure.",
    how: "Put it on the CANISTER slot of the assembly mat at the workbench, then pour the 3 venom vials into it.",
    safe: "Pressurized containers must never be heated or punctured: they can burst.",
    fact: "",
  },
  vial: {
    what: "Small glass vials of snake venom: a mix of proteins and enzymes that attack blood, nerves or muscle.",
    real: 'Scientists "milk" snakes to collect venom. It is used to make antivenom and to research medicines: some blood pressure drugs come from viper venom.',
    how: "Pour all 3 into the Venom Canister on the assembly mat. Dead hatchlings also drop venom that refills your blaster.",
    safe: "Venom is dangerous if it gets into a cut or the eyes. Snake handlers wear gloves and face shields.",
    fact: "Antivenom is made by giving horses tiny doses of venom and collecting the antibodies their blood makes.",
  },
  barrel: {
    what: "A steel tube with a nozzle that shapes the spray when liquid is pushed through it.",
    real: "Nozzles shape the stream of garden hoses, fire hoses, paint sprayers and pressure washers: a narrow nozzle sends the liquid further.",
    how: "Put it on the BARREL slot of the assembly mat.",
    safe: "",
    fact: "Squeezing a hose makes water go further because the same flow through a smaller hole has to move faster.",
  },
  handle: {
    what: "A grip with a trigger that opens a valve, letting the canister’s pressure push liquid out.",
    real: "The same trigger-valve idea is used in spray bottles, fire extinguishers, fuel pumps and pressure washers.",
    how: "Put it on the HANDLE slot of the assembly mat.",
    safe: "",
    fact: "A spray bottle trigger is a tiny pump: each squeeze pushes a piston that forces liquid through the nozzle.",
  },
  fullcan: {
    what: "The Venom Canister filled with 3 vials of venom.",
    real: "",
    how: "Keep it on the mat and add the handle and barrel to finish the weapon.",
    safe: "",
    fact: "",
  },
  blaster: {
    what: "Your home-built Venom Blaster: canister, barrel and handle working like a high-pressure sprayer.",
    real: "It works like a fire extinguisher: pressure in the canister pushes the liquid out through the nozzle when the trigger opens the valve.",
    how: "SHOOT with F / K or the shoot button. Only 4 shots. Venom dropped by dead hatchlings adds 1 shot each.",
    safe: "",
    fact: "",
  },
  potion: {
    what: "Your eroding solvent: dilute acid, an oxidizer and chloride in water.",
    real: "Real metal etchants work the same way: circuit-board makers etch copper with acid and an oxidizer, and steel is cleaned with acid baths.",
    how: "Stand at the barricade and press USE to pour it on.",
    safe: "",
    fact: "The bubbles while it works are hydrogen gas from the acid reacting with the iron.",
  },
};
Xt.vial1 = Xt.vial2 = Xt.vial3 = Xt.vial;
const Qt = (t) =>
  t
    .replace(/⁺/g, "+")
    .replace(/⁻/g, "-")
    .replace(/²⁺/g, "2+")
    .replace(/₂/g, "2")
    .replace(/₃/g, "3")
    .replace(/₁/g, "1")
    .replace(/₀/g, "0")
    .replace(/→/g, "->")
    .replace(/↑/g, "(gas)")
    .replace(/≈/g, "~");
function Kt(t) {
  return Qt(
    (function (t) {
      const a = items[t],
        e = Xt[t] || {},
        o = (t, a, e) =>
          e ? '<div class="isec ' + t + '"><b>' + a + "</b><span>" + e + "</span></div>" : "";
      return (
        (a.card ? '<div class="isec lore">' + a.card + "</div>" : "") +
        o("what", "WHAT IT IS", e.what) +
        o("real", "REAL-WORLD USE", e.real) +
        o("how", "HOW TO USE IT", e.how || (a.card ? "" : a.why)) +
        o("safe", "SAFETY", e.safe) +
        o("fact", "DID YOU KNOW?", e.fact)
      );
    })(t),
  );
}
const Zt = (t) => inv.includes(t),
  _t = ["canister", "vial1", "vial2", "vial3", "barrel", "handle", "fullcan", "blaster"],
  ta = () =>
    !hasGun &&
    (Zt("canister") || Zt("fullcan")) &&
    Zt("barrel") &&
    Zt("handle") &&
    (Zt("fullcan") || canFill + ["vial1", "vial2", "vial3"].filter(Zt).length >= 3),
  aa = () =>
    ["canister", "vial1", "vial2", "vial3", "barrel", "handle"].filter((t) => got.has(t)).length,
  ea = (t) => void 0 !== t.in && !broken[room + t.in];
function platforms() {
  const t = rooms[room],
    a = [];
  return (
    t.plats.forEach((t) => t.gone || a.push(t)),
    t.crates.forEach((t, e) => {
      broken[room + e] || a.push({ x: t.x, y: 80 - (t.y2 ? 12 : 0), w: t.w, crate: e });
    }),
    a
  );
}
let ra = !1;
function updateGuide() {
  if (C2[room]) return void c2Guide();
  qs("#gg h4 span").textContent = "GUIDE";
  const a = qs("#ggb");
  let e =
    "exitlab" === room
      ? snakeBoss && "dead" !== snakeBoss.st
        ? "<b>Defeat the Mutant Snake!</b><br>Climb the shelves to get over it. Punch up close; the blaster has only 4 shots (hatchlings drop venom). Red circles show where it strikes!"
        : "<b>It is down.</b><br>The exit door on the right is open. Go outside!"
      : "outside" === room
        ? "<b>You are outside.</b><br>Head right, to the door."
        : "hall" === room
          ? ta()
            ? "<b>You have every part.</b><br>Go back up to the MIXING BENCH (LAB)."
            : "<b>A door marked STAFF ONLY.</b><br>Open it (E / USE)."
          : "ware" === room
            ? ta()
              ? "<b>You have every part!</b><br>Carry them back up to the MIXING BENCH in the LAB."
              : "<b>Search the storage (" +
                aa() +
                "/6).</b><br>Open the HAZARDOUS crate, punch wooden crates, check the shelves."
            : "stair" === room
              ? cine
                ? ""
                : bossOpen
                  ? "<b>The door is open.</b><br>Go right."
                  : hasGun
                    ? "<b>Blast the sealed door!</b><br>Stand at the bottom and SHOOT (F / K)."
                    : ta()
                      ? "<b>Climb back up</b><br>to the MIXING BENCH in the LAB and build the weapon."
                      : "<b>The EXIT LAB door is sealed.</b><br>Explore to the LEFT at the bottom of the stairs."
              : pourT > 0 || (erode > 0 && !exitOpen)
                ? "<b>Pouring the solvent…</b>"
                : exitOpen && hasGun && !bossOpen
                  ? "<b>Venom Blaster ready!</b><br>Go back down the stairs and blast the sealed door."
                  : exitOpen && ta()
                    ? "<b>Build the weapon.</b><br>At the MIXING BENCH (LAB): canister on the mat, vials in, then handle and barrel."
                    : exitOpen
                      ? "<b>THE FIRE EXIT IS OPEN!</b><br>Run to the right and get out of here."
                      : 0 === stage
                        ? "<b>TRY TO GET OUT!</b><br>You can run, jump and punch." +
                          (ra ? "" : "<br>Arrows run · W jump · J punch · E use")
                        : hasPotion
                          ? "<b>Solvent ready!</b><br>Pour it on the barricade (POD ROOM)."
                          : l.every((t) => got.has(t))
                            ? "<b>All found!</b><br>Craft at the MIXING BENCH (LAB)."
                            : "<b>Find items (" +
                              l.filter((t) => got.has(t)).length +
                              "/" +
                              l.length +
                              ")</b><br>Tap for where to look.";
  a.innerHTML = e;
}
function updateBag() {
  const a = inv.length;
  qs("#gi").innerHTML = a
    ? '<button class="bagb" id="bagB"><img src="' +
      s("bottle", "#e8e060") +
      '">BAG ' +
      a +
      "</button>"
    : "";
  const e = qs("#bagB");
  e &&
    (e.onclick = () => {
      modal || sa();
    });
}
function sa() {
  modal = 1;
  const a = qs("#gk");
  ((a.innerHTML =
    '<div class="gcard"><h3>YOUR BAG</h3><p style="font-size:7px;color:#b8c8e8">Tap an item to read how it works.</p><div id="bagG">' +
    inv
      .map(
        (t) =>
          '<button class="bagi" data-id="' +
          t +
          '"><img src="' +
          s(items[t].k, items[t].c) +
          '"><span>' +
          items[t].n +
          "</span></button>",
      )
      .join("") +
    '</div><div class="btns"><button class="gbtn" id="gkOk">CLOSE</button></div></div>'),
    (a.hidden = !1),
    (qs("#gkOk").onclick = () => {
      ((a.hidden = !0), (modal = 0));
    }),
    a.querySelectorAll(".bagi").forEach(
      (a) =>
        (a.onclick = () =>
          (function (a) {
            modal = 1;
            const e = items[a],
              o = qs("#gk");
            ((o.innerHTML =
              '<div class="gcard"><h3>' +
              e.n +
              '</h3><div class="row"><img src="' +
              s(e.k, e.c) +
              '"><div>' +
              (e.where ? "<i>📍 " + e.where + "</i>" : "") +
              Kt(a) +
              '</div></div><div class="btns"><button class="gbtn" id="gkOk">OK</button></div></div>'),
              (o.hidden = !1),
              (qs("#gkOk").onclick = () => {
                ((o.hidden = !0), (modal = 0), sa());
              }));
          })(a.dataset.id)),
    ));
}
let ca = 0;
function ia(a) {
  modal = 1;
  const e = items[a],
    o = qs("#gk");
  ((o.innerHTML =
    '<div class="gcard"><h3>GOT: ' +
    e.n +
    '</h3><div class="row"><img src="' +
    s(e.k, e.c) +
    '"><div>' +
    (e.decoy ? "<i>Hmm, probably NOT useful for our solvent...</i>" : "") +
    Kt(a) +
    '</div></div><div class="btns"><button class="gbtn" id="gkOk" disabled>READ... 3</button></div></div>'),
    (o.hidden = !1));
  let r = Eo.nopop ? 0 : 3;
  const n = qs("#gkOk");
  (clearInterval(ca),
    0 === r && ((n.disabled = !1), (n.textContent = "GOT IT")),
    (ca = setInterval(() => {
      (r--,
        r > 0
          ? (n.textContent = "READ... " + r)
          : (clearInterval(ca), (n.disabled = !1), (n.textContent = "GOT IT")));
    }, 1e3)),
    (n.onclick = () => {
      n.disabled || ((o.hidden = !0), (modal = 0));
    }));
}
function fa() {
  modal = 1;
  const a = qs("#gk");
  ((a.innerHTML =
    '<div class="gcard"><h3>GUIDE: how do we erode this?</h3><p>The exit is blocked by <b style="color:#6aff9a">vines</b> and <b style="color:#b8c8e8">metal plates</b>. Fists won’t cut it. But acid eats metal, and acid + salt wrecks plants. Find these tools and chemicals in the lab rooms, then craft an <b style="color:#ffe070">eroding solvent</b> at the mixing bench:</p>' +
    l
      .map(
        (t) =>
          '<div class="row"><img src="' +
          s(items[t].k, items[t].c) +
          '"><div><b>' +
          items[t].n +
          "</b><i>📍 " +
          items[t].where +
          "</i><span>" +
          items[t].why +
          '</span><span style="color:#8fb8ff;margin-top:3px">' +
          items[t].info +
          "</span></div></div>",
      )
      .join("") +
    '<p class="warn">Not everything you find is useful (hint: some stuff cancels acid). There is no recipe card, so read the “why” on each item: the order and amounts matter. Game chemistry is simplified. Real acids need pros, gloves and ventilation. Don’t try this at home.</p><div class="btns"><button class="gbtn" id="gkOk">GOT IT</button></div></div>'),
    (a.hidden = !1),
    (qs("#gkOk").onclick = () => {
      ((a.hidden = !0), (modal = 0), (stage = Math.max(stage, 1)), (Tt = !0), updateGuide());
    }));
}
let ha = null;
