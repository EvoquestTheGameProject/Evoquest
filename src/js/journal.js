(() => {
"use strict";
if (window.__evoJournalLoaded) return; window.__evoJournalLoaded = 1;
const $ = (id) => document.getElementById(id);
const gm = $("gm"); if (!gm) return;
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const Q = (t) => { try { return window.__evoQt ? window.__evoQt(t) : t; } catch (e) { return t; } };

/* ------------------------------------------------------------------ data */
const CREATURES = [
  { id: "snake", name: "MUTANT SNAKE", tag: "BOSS - REPTILE", where: "EXIT LAB", pal: { g: "#2f8a46", G: "#6aff9a", y: "#ffe070", r: "#ff4a5a", k: "#0a1020" },
    art: ["..............", "...gggggggg...", "..gGGGGGGGGg..", ".gGGyGGGGyGGg.", ".gGGkGGGGkGGg.", ".gGGGGGGGGGGgr", "..gGGGGGGGGg.r", "...gggggggg...", "...gGgGgGgG...", "....gggggg...."],
    lore: "A giant snake grown from the abandoned experiment. It slams the floor to send shockwaves along the ground and spits venom at the spot where you stand. Red circles on the floor show where its next strike will land.",
    sci: "Snakes smell by flicking their tongue to collect chemicals, then pressing them to a sensor in the roof of the mouth (the Jacobson's organ). They hear mostly through vibrations carried by the jawbone. Some vipers can even sense body heat with pit organs. Real venom is a cocktail of proteins that evolved from saliva.",
    tip: "Climb the shelves to avoid the shockwaves. Punch it up close, shoot from range, and hit it while it is stunned after a charge." },
  { id: "hatch", name: "SNAKE HATCHLINGS", tag: "SWARM - REPTILE", where: "EXIT LAB", pal: { g: "#3a8a3a", G: "#9aff6a", y: "#ffe070", r: "#ff4a5a", k: "#0a1020" },
    art: ["..............", "..............", "....ggg.......", "...gGyGg......", "...gGGGGr.....", "....gGGg......", ".....gGGgg....", "..ggg.gGGGg...", ".gGGGggGggGg..", "..gggg..ggg..."],
    lore: "Small snakes that pour out of the big one. Each one you defeat drops a drop of venom that refills one shot of your blaster.",
    sci: "Many snakes hatch from leathery eggs, using a temporary egg tooth to cut the shell. Baby snakes are born with working venom and instincts, so small never means harmless.",
    tip: "Punch them to collect their venom. One drop equals one extra shot." },
  { id: "spider", name: "GIANT SPIDER", tag: "HUNTER - ARACHNID", where: "HIGHWAY", pal: { b: "#3a2a4a", B: "#6a4a8a", r: "#ff4a5a", k: "#0a1020" },
    art: ["b............b", ".b..bbbbbb..b.", "..b.bBBBBb.b..", "b.bbBBrBBrBbb.", "..bbBBBBBBbb..", "b.bbBBBBBBbb.b", ".b..bBBBBb..b.", "b...bb..bb...b", "....b....b....", "..............",].map((r) => r.padEnd(14, ".")),
    lore: "Something huge hunts you down the highway from behind. It fires webs that land on the red marks, and getting stuck lets it catch up.",
    sci: "Spiders are arachnids with eight legs, not insects. Silk is spun from liquid protein and is strong for its weight while stretching a lot before it breaks. Spiders use blood pressure to straighten their legs, and many digest their prey outside the body with enzymes.",
    tip: "Keep running left. Jump onto cars instead of stopping, never stand on a red mark, and stay out of old webs." },
  { id: "birds", name: "THE WATCHING BIRDS", tag: "FLOCK - BIRD", where: "HIGHWAY", pal: { k: "#1a2030", g: "#6a7a9a" },
    art: ["..............", "..k.......k...", ".kkk.....kkk..", "kk.kk...kk.kk.", "k...kk.kk...k.", "....kkkkk.....", "...k.kkk.k....", "..............", "......g.......", ".....ggg......"],
    lore: "Large flocks gather over the empty road. In a world without people, the animals are taking over.",
    sci: "Birds are living dinosaurs. A flock moves as one because each bird copies its nearest neighbors (studies of starlings found each bird tracks about seven). Many eyes also make it hard for a predator to surprise the group.",
    tip: "Keep moving and watch for what follows." },
  { id: "worm", name: "MUTATED WORMS", tag: "BURROWER - ANNELID", where: "THE CRACKED ROAD", pal: { p: "#b86a7a", P: "#e8a0b0", k: "#2a0a10", w: "#f4ece0", g: "#8aff6a", d: "#5a4632" },
    art: ["......kkk.....", ".....kwkwk....", ".....kkkkk....", "......pPp.....", ".....pPpPp....", "......pPpg....", ".....pPpP.....", "......pPp.....", "....ddpPpdd...", "...dddddddd..."],
    lore: "Worms the size of a person tunnel under the old road, hollowing it out. They feel your footsteps and burst up through the cracks with a ring of teeth.",
    sci: "Earthworms have no eyes or ears: they sense vibrations and light through their skin, and breathe through it too, which is why they come up when the ground floods. Their tunnels mix air and water into the soil, so farmers love them. Their bodies are rings of muscle that squeeze in turn, like a wave.",
    tip: "When the ground shakes and dirt spits up, back off or climb onto a car until it dives." },
  { id: "pack", name: "THE PACK", tag: "SWARM - MANY SPECIES", where: "THE CRACKED ROAD", pal: { k: "#2a2220", K: "#3e3430", w: "#d8d0c0", r: "#ff3a2a", t: "#f4ece0" },
    art: ["..............", "..w.w.w.w.....", ".kKKKKKKKKk.kk", "kkKKKKKKKKKkrk", "k.kKKKKKKKKkkt", "..kkkkkkkkkk..", "..kk.....kk...", "..k.k....k.k..", "..............", ".............."],
    lore: "Wolves, boars, rats and crows, all mutated and all running together. When the burning road drove them out, they chased you the whole way.",
    sci: "Many animals hunt or flee in groups. Wolves cooperate to tire out large prey, and fire makes almost every animal run the same way: away from the heat and smoke, which can trigger a stampede of species that normally avoid each other.",
    tip: "A crouching wolf with flashing eyes is about to lunge low: jump. Crows dive at the red circle." },
  { id: "beaver", name: "MUTATED BEAVERS", tag: "GNAWER - RODENT", where: "THE RIVER CROSSING", pal: { b: "#3a2414", B: "#5a3a20", t: "#2a1a10", o: "#ff9a2a", g: "#9aff5a", s: "#6a4a2a" },
    art: ["..............", "....s.s.s.....", "...bBBBBBb....", "..bBBBBBBBbbb.", "ttbBBBBBBBBgb.", "ttbBBBBBBBBbbo", "..bbBBBBBBbb.o", "...bb....bb...", "..............", ".............."],
    lore: "Beavers the size of bears, with bony spikes down their backs and glowing eyes. They chewed through an old concrete dam as if it were a log.",
    sci: "A beaver's front teeth never stop growing, and their fronts are coated in hard, iron-rich orange enamel, so gnawing keeps them chisel-sharp. Real beavers build dams of sticks and mud to make deep, calm ponds that protect their homes, which changes whole rivers and creates wetlands for other animals.",
    tip: "You can't stop them. Work fast and watch the DAM timer." },
];

const CONCEPTS = [
  { id: "redox", need: ["hcl", "h2o2"], name: "REDOX: LOSING AND GAINING ELECTRONS", txt: "Metal corrodes when its atoms lose electrons (oxidation) and turn into dissolved ions. Something else has to gain those electrons (reduction). Remember OIL RIG: Oxidation Is Loss, Reduction Is Gain. Rusting, batteries and the acid in your solvent all run on this idea.", tip: "In your solvent, the H+ from the acid and the peroxide both take electrons from iron." },
  { id: "ph", need: ["strip"], name: "THE pH SCALE", txt: "pH tells you how many hydrogen ions (H+) are in a liquid. The scale is logarithmic: each step down means 10 times more H+. Lemon juice is about pH 2, pure water is 7, baking soda in water is about 8, and bleach is about 12 to 13.", tip: "Your finished mix reads about pH 1, a million times more H+ than pure water." },
  { id: "neutral", need: ["soda"], name: "NEUTRALIZATION", txt: "An acid and a base cancel each other out and make water plus a salt. Baking soda with acid also releases carbon dioxide gas, which is the fizz. Labs keep baking soda or similar powders in spill kits.", tip: "That is why baking soda is a decoy here: it would cancel your acid." },
  { id: "osmosis", need: ["salt"], name: "OSMOSIS", txt: "Water drifts through a thin membrane toward the side with more dissolved material. Salt on a slug or a plant pulls water out of its cells. It is also why salting food preserves it: microbes dry out.", tip: "Salt wilts the barricade vines the same way." },
  { id: "heat", need: ["water"], name: "WATER AND HEAT", txt: "Water needs a lot of energy to warm up (4.18 joules per gram for each degree C), so a large amount of water is a safe heat sponge. Dissolving a strong acid releases heat, so you always add the acid to plenty of water and never the other way around.", tip: "That is why the water goes in first." },
  { id: "ions", need: ["sugar"], name: "IONS VS MOLECULES", txt: "Table salt splits into charged ions in water, while sugar stays as whole molecules. Ions carry electricity and can attack metal, which is why salty water corrodes things far more than sugary water.", tip: "Sugar is a decoy for exactly this reason." },
  { id: "materials", need: ["gloves", "rod", "goggles"], name: "SAFE MATERIALS", txt: "Nitrile gloves are polymers: long chains of repeating molecules that resist many chemicals for a short time. Goggles use tough polycarbonate plastic. Lab glass is mostly silica (SiO2) and does not react with most acids.", tip: "Gear buys you time, it does not make chemicals harmless." },
  { id: "pressure", need: ["canister", "barrel", "handle", "fullcan", "blaster"], name: "PRESSURE AND FLOW", txt: "Pressure is force spread over an area. Liquids move from high pressure to low pressure, and squeezing the same flow through a narrower opening makes it faster. That is how sprayers, hoses and fire extinguishers work.", tip: "Your blaster's barrel is a nozzle." },
  { id: "radio", need: ["radio", "batts"], name: "RADIO WAVES AND BATTERIES", txt: "A battery is a small chemical power station: zinc gives up electrons, and they can only reach the other end by flowing through the circuit. That flow powers the radio. The radio turns your voice into an electric signal and then into radio waves, invisible light that travels 300 000 km every second. A radio far away can turn the waves back into sound, but only if someone is there to listen." },
  { id: "rust", need: ["cola", "lemon", "foil", "rustx"], name: "RUST AND HOW TO BEAT IT", txt: "Rust is iron oxide: iron that has slowly reacted with oxygen and water. It is weak and crumbly, and it takes up more space than the iron it came from, so it can jam bolts and covers solid. Acids such as phosphoric acid (in cola) and citric acid (in lemons) dissolve or convert it.", tip: "Your makeshift remover uses both acids plus aluminium foil to free the manhole." },
  { id: "sewage", need: ["paper"], room: "sewer", name: "WHY SEWAGE IS DANGEROUS", txt: "Sewage carries bacteria and viruses from waste water. As it rots without oxygen it releases hydrogen sulfide, the gas that smells of rotten eggs and is poisonous in large amounts, plus methane, which can burn.", tip: "That is why standing in it costs you health." },
  { id: "circuits", need: ["batts"], name: "SERIES AND PARALLEL", txt: "Cells joined + to - (SERIES) add their voltages: two 1.5 V cells make 3 V. Cells joined + to + and - to - (PARALLEL) keep the same voltage but share the current, so they last longer. Big battery packs use both. A SHORT CIRCUIT, a path from + to - with nothing in the way, lets huge currents flow and makes dangerous heat." },
  { id: "firetri", need: [], room: "wroad", name: "HOW FIRE SPREADS", txt: "Fire needs three things: fuel, heat and oxygen (the FIRE TRIANGLE). Take one away and it goes out. Spilled petrol makes vapour that catches fire easily and spreads flames faster than you can walk. Firefighters attack each side of the triangle: water removes heat, foam smothers oxygen, and fire breaks remove fuel." },
  { id: "murky", need: [], room: "forest", name: "WHY NOT DRINK MURKY WATER?", txt: "Still, cloudy water can carry bacteria, viruses and parasites that cause serious stomach illness. Dehydration makes you tired, slow and confused, but unsafe water can make it worse. Survivors boil water for at least one minute, or filter and disinfect it, before drinking." },
  { id: "dehyd", need: [], room: "river", name: "DEHYDRATION", txt: "About 60% of your body is water, and you lose some with every breath and every drop of sweat. Lose just 2% and you get tired and headachy; lose much more and you get dizzy and confused. Direct sun makes you sweat far faster, which is why shade matters so much when water is scarce." },
  { id: "bridge", need: [], room: "river", name: "HOW A LASHED BRIDGE HOLDS", txt: "A fast river pushes sideways on everything in it. Stakes driven straight down into the riverbed resist that push; a crooked stake gets levered out. Rope lashing works through FRICTION (rope squeezed tight against wood can't slide) and TENSION (rope is very strong when pulled). Without lashing, logs only rest on their posts, so a strong push slides them apart." },
  { id: "purify", need: ["pot"], name: "MAKING WATER SAFE", txt: "BOILING kills bacteria, viruses and parasites. A FILTER removes what boiling can't: grit, mud and many chemicals. Layer it from the bottom up: a grass plug, CHARCOAL (whose tiny pores adsorb smells and colours), fine SAND (traps silt), then GRAVEL (stops big bits). Forest filters aren't sterile, so boil again afterwards." },
  { id: "lever", need: ["pcrow"], name: "LEVERS AND CROWBARS", txt: "A lever is a stiff bar that turns on a pivot, the FULCRUM. A crowbar's long handle is the effort arm and its short claw is the load arm. The mechanical advantage is the ratio of the arm lengths: a 60 cm handle and a 3 cm claw multiply your push about 20 times. The trade-off is that the handle must move 20 times further than the claw." },
  { id: "screwnail", need: ["pscrew"], name: "SCREWS AND NAILS", txt: "A screw is an inclined plane (a ramp) wrapped around a post: each turn drives it a short way with great force, and the threads grip, so it resists being pulled out. A nail has no thread. The material squeezes its sides and friction holds it, so it holds best against sideways force." },
  { id: "rust", need: [], room: "port", name: "WHY STEEL RUSTS", txt: "Steel is mostly iron. In damp, salty air iron combines with oxygen and water to make iron oxide: rust. Rust is flaky and much weaker than steel, so thin edges and welds crumble and pieces come loose. Paint, oil and zinc coatings slow rust by keeping air and water off the metal." },
  { id: "mechadv", need: ["ckeyc"], name: "LEVERAGE AND PRYING", txt: "A lever's leverage is its effort arm divided by its load arm. To pry something open, put the pivot (fulcrum) on a solid support close to the load, and push as far from the pivot as you can. The trade-off: you move the handle a long way to move the load a short way." },
  { id: "radar", need: [], room: "helm", name: "HOW RADAR WORKS", txt: "Radar sends out pulses of radio waves and listens for the echo. The time the echo takes shows how far away something is; the direction of the sweeping antenna shows where it is. Heavy rain and storm clouds reflect radar strongly, so they show up as blobs on the screen. Ships use it in darkness, fog and storms." },
  { id: "lightning", need: [], room: "deck", name: "SHIPS AND LIGHTNING", txt: "Lightning is a huge spark of static electricity between a cloud and the ground or sea. It strikes the tallest, most conductive thing around, and on open water that is often a ship. Sailors steer around thunderstorms, and ships have metal masts and cables that carry a strike safely to the sea." },
  { id: "propfoul", need: [], room: "motor", name: "FOULED PROPELLERS", txt: "Seaweed, ropes and lost fishing nets wrap round a spinning propeller shaft and jam it. Always stop the engine before reaching in, and never throw nets or plastic into the sea: ghost nets drift for years, trapping animals and fouling boats." },
  { id: "induction", need: ["gwire"], name: "HOW A GENERATOR WORKS", txt: "A magnet spinning past a coil of wire pushes the electrons in the wire along: ELECTROMAGNETIC INDUCTION, discovered by Michael Faraday in 1831. More turns of wire, a stronger magnet or a faster spin all give more voltage. A fuse protects the circuit: its thin wire melts if too much current flows." },
  { id: "toweri", need: [], room: "isle", name: "WHY RADIO TOWERS ARE TALL", txt: "Radio waves travel in nearly straight lines, so the higher the antenna, the farther it can reach before the curve of the Earth gets in the way. That is why radio masts stand on hills and why lookouts stand on high ground: a tall mast on a hill can be heard for hundreds of kilometres." },
  { id: "cooling", need: [], room: "tgen", name: "HOW ENGINE COOLING WORKS", txt: "Burning fuel makes far more heat than an engine can use. Coolant (mostly water) flows through channels in the engine, picks up the heat and carries it to a radiator, where air takes it away. Dirt and rust clog the narrow tubes, and a low coolant level stops the flow, so the engine overheats. A hot cooling system is under pressure: always switch off and let it cool before opening a radiator cap." },
  { id: "filtering", need: [], room: "tgen", name: "LAYERED WATER FILTERS", txt: "A filter works from coarse to fine: gravel catches big lumps, sand traps fine grit, charcoal grabs dissolved impurities, colours and smells onto its huge surface (adsorption), and cloth catches the last dust. Filtering removes particles but not germs, so water for drinking must still be boiled." },
  { id: "satnet", need: [], room: "tlab", name: "HOW SATELLITES CARRY RADIO", txt: "Radio waves travel in nearly straight lines, so on their own they only reach as far as the horizon. Communication satellites orbit high above the Earth and pass signals on, so a radio in one place can reach the other side of the planet, or a ship far out at sea. Without them, long-distance radio goes almost silent." },
  { id: "hypo", need: [], chk: () => { try { return !!(c3s().c5 && c3s().c5.isl && c3s().c5.isl.hyp); } catch (e) { return false; } }, name: "WHAT IS A HYPOTHESIS?", txt: "A hypothesis is a smart guess that you can test, made from clues you have observed. It is often written as IF... THEN... BECAUSE... The THEN part is a prediction. If a test's results match the prediction, the hypothesis is SUPPORTED (never proven forever, so scientists test again). If not, you change the hypothesis and test again. It is one step of the scientific method: observe, ask a question, make a hypothesis, test it, look at the results, draw a conclusion." },
  { id: "sharp", need: ["axe2"], name: "PRESSURE AND SHARP EDGES", txt: "Pressure = force / area. A sharp edge squeezes your whole swing onto a tiny area, so the pressure is enormous and the blade slices between the fibres. A blunt edge spreads the same force over a wide area, so it just bounces off. That's also why snowshoes stop you sinking: they spread your weight out." },
  { id: "insulation", need: ["leaves", "moss", "bough"], name: "INSULATION AND SHELTER", txt: "Heat moves by conduction (touching), convection (moving air or water) and radiation. Trapped still air carries heat very badly, so dry leaves, moss and pine boughs keep you warm. Lying on bare ground loses heat by conduction, which is why a bed frame lifts you up." },
  { id: "proteins", need: ["vial1", "vial2", "vial3", "fullcan", "blaster"], name: "PROTEINS AND VENOM", txt: "Venom is mostly proteins: chains of amino acids folded into exact shapes. Heat or strong acid unfolds them (denaturing) and ruins their job. Antivenom is made from the antibodies of animals given tiny doses of venom.", tip: "Scientists study venom because tiny parts of it can become medicines." },
];

const RULES = [
  "Goggles and gloves go on before you touch any chemical.",
  "Add ACID TO WATER, never water to acid.",
  "Never mix chemicals just to see what happens. Some combinations make poisonous gas.",
  "Work in fresh air. Real labs use a fume hood.",
  "If a chemical gets in an eye, rinse with clean water for 15 minutes and get help.",
  "This game simplifies real chemistry. Do not try it at home.",
];

const LAB_ITEMS = ["goggles", "gloves", "water", "hcl", "h2o2", "salt", "rod", "strip"];
const AREAS = ["pod", "lab", "store", "med", "cafe", "stair", "hall", "ware", "exitlab", "outside"];

const c3s = () => { try { return (window.__c3st && window.__c3st()) || {}; } catch (e) { return {}; } };
const ACH = [
  { id: "wake", n: "COLD SLEEP", d: "Wake up and leave the cryo pod.", t: (d) => !!d },
  { id: "safe", n: "SAFETY FIRST", d: "Put on your goggles and gloves.", t: (d, b) => b && b.worn && b.gloved },
  { id: "scav", n: "SCAVENGER", d: "Find all 8 lab supplies.", t: (d) => LAB_ITEMS.every((i) => d.got.includes(i)) },
  { id: "decoy", n: "KNOW YOUR REAGENTS", d: "Find both the baking soda and the sugar.", t: (d) => d.got.includes("soda") && d.got.includes("sugar") },
  { id: "chem", n: "JUNIOR CHEMIST", d: "Make the eroding solvent.", t: (d) => d.hasPotion || d.exitOpen || d.inv.includes("potion") },
  { id: "break", n: "BARRICADE BREAKER", d: "Dissolve the barricade.", t: (d) => d.exitOpen },
  { id: "staff", n: "STAFF ONLY", d: "Enter the staff storage room.", t: (d, b, J) => !!J.vis.ware },
  { id: "smith", n: "WEAPONSMITH", d: "Build the Venom Blaster.", t: (d) => d.hasGun },
  { id: "hatch", n: "HATCHLING HUNTER", d: "Meet the snake hatchlings.", t: (d, b, J) => !!J.seen.hatch },
  { id: "slay", n: "SNAKE SLAYER", d: "Defeat the Mutant Snake.", t: (d) => !!(d.boss && d.boss.st === "dead") || d.win === 1 },
  { id: "air", n: "FRESH AIR", d: "Step outside.", t: (d, b, J) => !!J.vis.outside },
  { id: "map", n: "CARTOGRAPHER", d: "Visit all 10 areas of the facility.", t: (d, b, J) => AREAS.every((a) => J.vis[a]) },
  { id: "foot", n: "ON FOOT", d: "Reach the highway.", t: (d, b, J) => !!J.vis.highway },
  { id: "behind", n: "DON'T LOOK BACK", d: "Hear something huge behind you.", t: (d, b, J) => !!J.seen.spider },
  { id: "nosignal", n: "NO SIGNAL", d: "Call for help on the radio.", t: (d) => !!(d.tnbz && d.tnbz.call) },
  { id: "scav2", n: "WRECK DIVER", d: "Search every wrecked car past the tunnel.", t: (d) => !!(d.tnbz && d.tnbz.s && d.tnbz.s.every((v) => v)) },
  { id: "lastshot", n: "LAST SHOT", d: "Melt the final barricade with your last drop of venom.", t: (d) => !!(d.tnx && d.tnx.bar) },
  { id: "daylight", n: "DAYLIGHT", d: "Outrun the spider and escape the tunnel.", t: (d) => !!(d.tnx && d.tnx.done) },
  { id: "rust", n: "RUST BUSTER", d: "Craft the Makeshift Rust Remover.", t: (d) => d.got.includes("rustx") },
  { id: "junk", n: "JUNK DIGGER", d: "Dig the car key out of the trunk.", t: (d) => d.got.includes("carkey") },
  { id: "unlock", n: "UNLOCKED", d: "Open the locked car with the key.", t: (d) => d.got.includes("cola") },
  { id: "drain", n: "DOWN THE DRAIN", d: "Climb down into the sewer.", t: (d, b, J) => !!J.vis.sewer },
  { id: "far", n: "500 KM TO GO", d: "Find the dropped paper in the sewer.", t: (d) => d.got.includes("paper") },
  { id: "wired", n: "LIVE WIRE", d: "Wire the radio's batteries 10 times.", t: () => !!c3s().wired },
  { id: "outrun", n: "FIRE RUNNER", d: "Outrun the burning road and the pack.", t: () => !!c3s().roadDone },
  { id: "camp", n: "BUSHCRAFT", d: "Craft a sleeping space at the stone workbench.", t: (d) => d.got.includes("bedkit") },
  { id: "dream", n: "SWEET DREAMS", d: "Sleep in the old forest.", t: () => !!c3s().slept },
  { id: "bridge", n: "BRIDGE BUILDER", d: "Lash a bridge across the raging river.", t: () => !!(c3s().c4 && c3s().c4.bridge) },
  { id: "keys", n: "KEY CHAIN", d: "Find a clean pot and bottle in the crashed containers.", t: (d) => d.got.includes("pot") && d.got.includes("bottle") },
  { id: "pry", n: "PRY BAR", d: "Build a crowbar from scrap metal.", t: (d) => d.got.includes("pcrow") },
  { id: "ship", n: "ALL ABOARD", d: "Break the port gate and board the last ship.", t: () => !!(c3s().c4 && c3s().c4.pt && c3s().c4.pt.done) },
  { id: "captain", n: "CAPTAIN", d: "Steer the ship through the storm to the Ridge Tower.", t: () => !!(c3s().c5 && c3s().c5.done) },
  { id: "mechanic", n: "SHIP'S MECHANIC", d: "Repair the generator when the power fails.", t: () => !!(c3s().c5 && c3s().c5.gen && c3s().c5.gen.run) },
  { id: "keyhunt", n: "CROWBAR AT WORK", d: "Pry open a cargo container and find the control room key.", t: (d) => d.got.includes("ckeyc") },
  { id: "islander", n: "LAND HO!", d: "Find the radio tower on Ridge Tower Island.", t: () => !!(c3s().c5 && c3s().c5.isl && c3s().c5.isl.door) },
  { id: "hypo", n: "THINK LIKE A SCIENTIST", d: "Read Dr. Morrow's notebook and learn what a hypothesis is.", t: () => !!(c3s().c5 && c3s().c5.isl && c3s().c5.isl.hyp) },
  { id: "coolhead", n: "COOL HEAD", d: "Fix the overheated generator safely.", t: () => !!(c3s().c5 && c3s().c5.isl && c3s().c5.isl.gen) },
  { id: "clean", n: "SAFE TO DRINK", d: "Boil, filter and boil river water, then drink it.", t: () => !!(c3s().c4 && c3s().c4.drank) },
  { id: "scholar", n: "SCHOLAR", d: "Unlock 5 research notes.", t: (d, b, J, notes) => notes >= 5 },
];

/* ------------------------------------------------------------------ persistence */
let J = { seen: {}, ach: {}, vis: {}, notes: {} }, jkey = "";
const keyFor = () => { let n = ""; try { n = window.__evoPlayer ? window.__evoPlayer() : ""; } catch (e) {} return "evoquest_journal_" + (n || "default"); };
function load() {
  const k = keyFor(); if (k === jkey) return; jkey = k;
  try { const o = JSON.parse(localStorage.getItem(k) || "null"); if (o && typeof o === "object") J = Object.assign({ seen: {}, ach: {}, vis: {}, notes: {} }, o); else J = { seen: {}, ach: {}, vis: {}, notes: {} }; } catch (e) { J = { seen: {}, ach: {}, vis: {}, notes: {} }; }
}
let st = 0; const save = () => { clearTimeout(st); st = setTimeout(() => { try { localStorage.setItem(jkey, JSON.stringify(J)); } catch (e) {} }, 300); };
addEventListener("pagehide", () => { try { localStorage.setItem(jkey, JSON.stringify(J)); } catch (e) {} });

/* ------------------------------------------------------------------ small helpers */
function sprite(art, pal, px) {
  const w = art[0].length, h = art.length; let r = "";
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const c = art[y][x]; if (c !== "." && pal[c]) r += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="' + pal[c] + '"/>'; }
  return '<svg viewBox="0 0 ' + w + " " + h + '" width="' + w * px + '" height="' + h * px + '" shape-rendering="crispEdges" aria-hidden="true">' + r + "</svg>";
}
function chime() {
  try {
    const a = window.__audio; if (!a || a.muted()) return; const c = a.ctx(); if (!c || c.state !== "running") return;
    const t = c.currentTime, g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.05, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55); g.connect(c.destination);
    [784, 988, 1319].forEach((f, i) => { const o = c.createOscillator(); o.type = "square"; o.frequency.value = f; o.connect(g); o.start(t + i * 0.09); o.stop(t + i * 0.09 + 0.14); });
  } catch (e) {}
}

/* ------------------------------------------------------------------ toast queue */
const toastEl = document.createElement("div"); toastEl.id = "evoAch"; toastEl.hidden = true; gm.appendChild(toastEl);
const queue = []; let showing = 0;
function pump() {
  if (showing || !queue.length) return; showing = 1; const m = queue.shift();
  toastEl.innerHTML = '<b>' + esc(m.h) + "</b><span>" + esc(m.t) + "</span>"; toastEl.hidden = false; toastEl.classList.add("in"); if (m.sfx) chime();
  setTimeout(() => { toastEl.classList.remove("in"); setTimeout(() => { toastEl.hidden = true; showing = 0; pump(); }, 350); }, 3600);
}
const notify = (h, t, sfx) => { queue.push({ h, t, sfx }); pump(); };

/* ------------------------------------------------------------------ overlay */
const css = document.createElement("style"); css.id = "evoJournalCss";
css.textContent = [
  "#evoJBtn{position:absolute;left:calc(env(safe-area-inset-left,0px) + 8px);top:calc(env(safe-area-inset-top,0px) + 46px);z-index:4;min-width:48px;min-height:44px;font-size:8px;padding:8px 10px;background:#0b1020e6;border:2px solid #8fb8ff;color:#dff;border-radius:3px;font-family:inherit;display:flex;align-items:center;gap:6px;touch-action:manipulation}",
  "#evoJBtn svg{width:16px;height:16px}",
  "#evoJBtn.dot::after{content:'';width:7px;height:7px;background:#ffe070;border-radius:50%;box-shadow:0 0 6px #ffe070}",
  "#evoJ{z-index:40}#evoJ .gcard{width:min(560px,100%)}",
  ".jtabs{display:flex;gap:4px;flex-wrap:wrap;margin:0 0 8px}",
  ".jt{flex:1 1 auto;min-height:40px;padding:8px 6px;font-size:7px;font-family:inherit;color:#9ab0d0;background:#0a1224;border:2px solid #3a4a7a;border-radius:3px;touch-action:manipulation}",
  ".jt.on{color:#041;background:#6aff9a;border-color:#6aff9a}",
  ".jent{display:flex;gap:8px;margin:0 0 8px;padding:7px;background:#0a1224;border-left:3px solid #6aff9a}",
  ".jent.lk{opacity:.55;border-left-color:#3a4a7a}",
  ".jent .ic{flex:none;width:56px;display:grid;place-items:center;background:#060c1a;border:2px solid #22305a;min-height:56px}",
  ".jent h4{margin:0 0 3px;font-size:8px;font-weight:400;color:#ffe070;line-height:1.5}",
  ".jent .tg{font-size:6px;color:#8fb8ff;margin:0 0 4px}",
  ".jent p{margin:0 0 5px;font-size:7px;line-height:1.75;color:#d0dcf0}",
  ".jent p b{display:inline;font-weight:400;color:#5ac8ff}",
  ".jent p.tp b{color:#ffe070}",
  ".jdet{margin:0 0 6px;background:#0a1224;border-left:3px solid #6aff9a}",
  ".jdet summary{display:flex;align-items:center;gap:8px;min-height:44px;padding:4px 8px;font-size:7px;color:#6aff9a;cursor:pointer}",
  ".jdet summary img{width:28px;height:28px;image-rendering:pixelated}",
  ".jdet .in{padding:0 6px 6px}",
  ".jh{margin:12px 0 6px;font-size:8px;color:#ffe070}",
  ".jlist{margin:0 0 8px;padding-left:16px;font-size:7px;line-height:1.9;color:#d0dcf0}",
  ".jach{display:flex;gap:8px;align-items:center;margin:0 0 6px;padding:7px;background:#0a1224;border-left:3px solid #3a4a7a}",
  ".jach.ok{border-left-color:#ffe070;background:#1a1a08}",
  ".jach .st{flex:none;width:28px;height:28px;display:grid;place-items:center;font-size:12px;color:#3a4a7a;border:2px solid #22305a}",
  ".jach.ok .st{color:#ffe070;border-color:#ffe070}",
  ".jach b{display:block;font-weight:400;font-size:7px;color:#ffe070}",
  ".jach span{font-size:6px;color:#9ab0d0;line-height:1.7}",
  ".jbar{height:8px;background:#060c1a;border:2px solid #22305a;margin:0 0 10px}.jbar i{display:block;height:100%;background:#6aff9a}",
  ".jmap{width:100%;min-width:520px;display:block}.jmapw{overflow-x:auto;margin:0 0 8px}",
  ".jrow{display:flex;justify-content:space-between;align-items:center;gap:8px;min-height:48px;padding:6px 8px;margin:0 0 6px;background:#0a1224;border-left:3px solid #8fb8ff;font-size:7px;color:#d0dcf0}",
  ".jrow button{min-width:88px;min-height:40px}",
  "#evoAch{position:absolute;left:50%;top:calc(env(safe-area-inset-top,0px) + 8px);transform:translate(-50%,-140%);z-index:45;max-width:min(92vw,420px);padding:9px 12px;background:#1a1a08f2;border:3px solid #ffe070;border-radius:4px;color:#fff;font-size:8px;line-height:1.7;text-align:center;box-shadow:0 0 0 3px #060a16,0 6px 20px #000a;transition:transform .35s ease;pointer-events:none}",
  "#evoAch.in{transform:translate(-50%,0)}#evoAch b{display:block;font-weight:400;color:#ffe070;font-size:7px}#evoAch span{font-size:8px}",
  "@media (prefers-reduced-motion:reduce){#evoAch{transition:none}}",
].join("");
document.head.appendChild(css);

const ov = document.createElement("div"); ov.className = "gov"; ov.id = "evoJ"; ov.hidden = true;
ov.innerHTML = '<div class="gcard"><h3>FIELD JOURNAL</h3><div class="jtabs" id="jTabs" role="tablist"></div><div id="jBody"></div><div class="btns"><button class="gbtn" id="jClose">CLOSE</button></div></div>';
gm.appendChild(ov);

const btn = document.createElement("button"); btn.id = "evoJBtn"; btn.type = "button"; btn.hidden = true; btn.setAttribute("aria-label", "Open field journal");
btn.innerHTML = '<svg viewBox="0 0 8 8" shape-rendering="crispEdges" aria-hidden="true"><path fill="#8fb8ff" d="M1 0h6v8H1z"/><path fill="#0b1020" d="M2 1h4v1H2zM2 3h4v1H2zM2 5h3v1H2z"/></svg>NOTES';
gm.appendChild(btn);

const TABS = [["creatures", "CREATURES"], ["notes", "NOTES"], ["map", "MAP"], ["awards", "AWARDS"], ["settings", "SETTINGS"]];
let tab = "creatures", open = 0;

/* ------------------------------------------------------------------ renderers */
function rCreatures() {
  const n = CREATURES.filter((c) => J.seen[c.id]).length;
  let h = '<p style="font-size:7px;color:#9ab0d0;margin:0 0 8px">Creatures discovered: ' + n + "/" + CREATURES.length + ". Meet them in the world to fill in their pages.</p>";
  CREATURES.forEach((c) => {
    if (J.seen[c.id]) {
      h += '<div class="jent"><div class="ic">' + sprite(c.art, c.pal, 4) + '</div><div><h4>' + esc(c.name) + '</h4><div class="tg">' + esc(c.tag) + " - SEEN: " + esc(c.where) + "</div><p><b>WHAT WE KNOW</b><br>" + esc(c.lore) + "</p><p><b>REAL-WORLD SCIENCE</b><br>" + esc(c.sci) + '</p><p class="tp"><b>HOW TO SURVIVE</b><br>' + esc(c.tip) + "</p></div></div>";
    } else {
      h += '<div class="jent lk"><div class="ic" style="font-size:20px;color:#3a4a7a">?</div><div><h4>???</h4><div class="tg">NOT YET DISCOVERED</div><p>Last known area: ' + esc(c.where) + ".</p></div></div>";
    }
  });
  return h;
}
function unlockedNotes(d) { return CONCEPTS.filter((c) => c.need.some((i) => d.got.includes(i)) || (c.room && J.vis[c.room]) || (c.chk && c.chk())); }
function rNotes() {
  let d = { got: [] }; try { d = GM.dbg(); } catch (e) {}
  const un = unlockedNotes(d);
  let h = '<div class="jh">KEY IDEAS (' + un.length + "/" + CONCEPTS.length + ")</div>";
  CONCEPTS.forEach((c) => {
    if (un.includes(c)) h += '<div class="jent"><div><h4>' + esc(c.name) + "</h4><p>" + esc(c.txt) + '</p><p class="tp"><b>IN THE GAME</b><br>' + esc(c.tip) + "</p></div></div>";
    else h += '<div class="jent lk"><div><h4>???</h4><p>Find the right supplies to unlock this note.</p></div></div>';
  });
  h += '<div class="jh">LAB NOTEBOOK</div>';
  const ids = (d.got || []).filter((i) => window.__evoInfo && window.__evoInfo(i)).filter((i) => !/^vial[23]$/.test(i));
  if (!ids.length) h += '<p style="font-size:7px;color:#9ab0d0">Items you find are logged here with their science notes.</p>';
  const sec = (cls, t, v) => v ? '<div class="isec ' + cls + '"><b>' + t + "</b><span>" + esc(Q(v)) + "</span></div>" : "";
  ids.forEach((i) => {
    const o = window.__evoInfo(i), x = o.x || {};
    h += '<details class="jdet"><summary><img src="' + o.icon + '" alt="">' + esc(Q(o.n)) + '</summary><div class="in">' + (o.where ? '<div class="isec lore"><b>FOUND IN</b><span>' + esc(o.where) + "</span></div>" : "") +
      sec("", "WHAT IT IS", x.what) + sec("sci", "THE SCIENCE", x.sci) + sec("real", "REAL-WORLD USE", x.real) + sec("how", "HOW TO USE IT", x.how) + sec("safe", "SAFETY", x.safe) + sec("fact", "DID YOU KNOW?", x.fact) + "</div></details>";
  });
  h += '<div class="jh">LAB SAFETY RULES</div><ul class="jlist">' + RULES.map((r) => "<li>" + esc(r) + "</li>").join("") + "</ul>";
  h += '<div class="jh">CONTROLS</div><ul class="jlist"><li>Keyboard: arrows or A/D to move, W / Up / Space to jump, J to punch, F or K to shoot, E to use, N for this journal.</li><li>Touch: the pads at the bottom of the screen. You can hold a direction and press jump or punch at the same time.</li></ul>';
  return h;
}
function rMap() {
  let d = { room: "" }, goal = ""; try { d = GM.dbg(); } catch (e) {}
  try { const g = $("ggb"); goal = g ? g.innerText.replace(/\s+/g, " ").trim() : ""; } catch (e) {}
  const R = {
    cafe: [0, 0, "CAFETERIA"], med: [1, 0, "MED BAY"], store: [2, 0, "CHEM STORAGE"], lab: [3, 0, "LAB"], pod: [4, 0, "POD ROOM"],
    stair: [4, 1, "STAIRWELL"], ware: [2, 2, "STAFF STORAGE"], hall: [3, 2, "BASEMENT"], exitlab: [4, 2, "EXIT LAB"],
    highway: [1, 3, "HIGHWAY"], road: [2, 3, "THE ROAD"], street: [3, 3, "CITY STREET"], outside: [4, 3, "OUTSIDE"], tunnel: [0, 3, "TUNNEL"], sewer: [0, 2, "SEWER"], tunnel_exit: [1, 2, "FAR SIDE"], beyond: [1, 1, "BEYOND"], wroad: [0, 1, "CRACKED ROAD"], forest: [-1, 1, "OLD FOREST"], river: [-2, 1, "THE RIVER"], rroad: [-3, 1, "RIVER ROAD"], cbridge: [-4, 1, "BROKEN BRIDGE"], port: [-5, 1, "BRIDGE PORT"],
  };
  const L = [["cafe", "med"], ["med", "store"], ["store", "lab"], ["lab", "pod"], ["pod", "stair", "barr"], ["stair", "exitlab", "seal"], ["stair", "hall"], ["hall", "ware"], ["exitlab", "outside"], ["outside", "street"], ["street", "road"], ["road", "highway"], ["highway", "tunnel"], ["tunnel", "sewer", "mh"], ["tunnel", "tunnel_exit"], ["tunnel_exit", "beyond"], ["beyond", "wroad"], ["wroad", "forest"], ["forest", "river"], ["river", "rroad"], ["rroad", "cbridge"], ["cbridge", "port"]];
  const W = 100, H = 56, bw = 92, bh = 34, ox = 12, oy = 12;
  const cx = (k) => ox + (R[k][0] + 5) * W + bw / 2, cy = (k) => oy + R[k][1] * H + bh / 2;
  let sv = '<svg class="jmap" viewBox="0 0 ' + (ox * 2 + 9 * W + bw) + " " + (oy * 2 + 3 * H + bh) + '" role="img" aria-label="Facility map" font-family="\'Press Start 2P\',monospace">';
  let dd = {}; try { dd = GM.dbg(); } catch (e) {}
  L.forEach((l) => {
    const a = l[0], b = l[1], seen = J.vis[a] && J.vis[b];
    sv += '<line x1="' + cx(a) + '" y1="' + cy(a) + '" x2="' + cx(b) + '" y2="' + cy(b) + '" stroke="' + (seen ? "#6aff9a" : "#2a3a6a") + '" stroke-width="3" stroke-dasharray="' + (seen ? "0" : "4 4") + '"/>';
    if (l[2] === "barr") { const open = dd.exitOpen; sv += '<text text-anchor="end" x="' + (cx(a) - 8) + '" y="' + ((cy(a) + cy(b)) / 2 + 3) + '" font-size="6" fill="' + (open ? "#6aff9a" : "#ff7a6a") + '">' + (open ? "OPEN" : "BARRICADE") + "</text>"; }
    if (l[2] === "mh") { const open = J.vis.sewer; sv += '<text x="' + (cx(a) + 5) + '" y="' + ((cy(a) + cy(b)) / 2 + 3) + '" font-size="6" fill="' + (open ? "#6aff9a" : "#ff7a6a") + '">' + (open ? "MANHOLE" : "RUSTED SHUT") + "</text>"; }
    if (l[2] === "seal") { const open = dd.bossOpen || (dd.boss && dd.boss.st === "dead") || J.vis.exitlab; sv += '<text text-anchor="end" x="' + (cx(a) - 8) + '" y="' + ((cy(a) + cy(b)) / 2 + 3) + '" font-size="6" fill="' + (open ? "#6aff9a" : "#ff7a6a") + '">' + (open ? "OPEN" : "SEALED") + "</text>"; }
  });
  Object.keys(R).forEach((k) => {
    const v = J.vis[k], cur = d.room === k, x = ox + (R[k][0] + 5) * W, y = oy + R[k][1] * H;
    sv += '<rect x="' + x + '" y="' + y + '" width="' + bw + '" height="' + bh + '" fill="' + (v ? "#16264a" : "#0a1224") + '" stroke="' + (cur ? "#ffe070" : v ? "#6aff9a" : "#2a3a6a") + '" stroke-width="' + (cur ? 3 : 2) + '"' + (v ? "" : ' stroke-dasharray="4 3"') + "/>";
    sv += '<text x="' + (x + bw / 2) + '" y="' + (y + bh / 2 + 3) + '" font-size="6.5" text-anchor="middle" fill="' + (v ? "#dff" : "#3a4a7a") + '">' + (v ? R[k][2] : "???") + "</text>";
    if (cur) sv += '<text x="' + (x + bw / 2) + '" y="' + (y - 2) + '" font-size="6" text-anchor="middle" fill="#ffe070">YOU ARE HERE</text>';
  });
  sv += "</svg>";
  const n = Object.keys(R).filter((k) => J.vis[k]).length;
  return '<div class="jmapw">' + sv + '</div><p style="font-size:7px;color:#9ab0d0;margin:0 0 8px">Explored: ' + n + "/" + Object.keys(R).length + " areas. Dashed rooms are still unknown.</p>" +
    (goal ? '<div class="isec how"><b>CURRENT OBJECTIVE</b><span>' + esc(goal) + "</span></div>" : "");
}
function rAwards() {
  const got = ACH.filter((a) => J.ach[a.id]).length;
  let h = '<p style="font-size:7px;color:#9ab0d0;margin:0 0 6px">Achievements: ' + got + "/" + ACH.length + '</p><div class="jbar"><i style="width:' + Math.round((got / ACH.length) * 100) + '%"></i></div>';
  ACH.forEach((a) => { const ok = !!J.ach[a.id]; h += '<div class="jach' + (ok ? " ok" : "") + '"><div class="st">' + (ok ? "*" : "-") + "</div><div><b>" + esc(a.n) + "</b><span>" + esc(a.d) + "</span></div></div>"; });
  return h;
}
function muted() { try { return window.__audio ? window.__audio.muted() : false; } catch (e) { return false; } }
function rSettings() {
  let big = 0; try { big = localStorage.getItem("evoquest_ui_big") === "1"; } catch (e) {}
  return '<div class="jrow"><span>SOUND AND MUSIC<br><span style="color:#9ab0d0;font-size:6px">Now: ' + (muted() ? "OFF" : "ON") + '</span></span><button class="gbtn alt" id="jSnd">' + (muted() ? "TURN ON" : "TURN OFF") + "</button></div>" +
    '<div class="jrow"><span>TOUCH CONTROL SIZE<br><span style="color:#9ab0d0;font-size:6px">Now: ' + (big ? "LARGE" : "NORMAL") + '</span></span><button class="gbtn alt" id="jBig">' + (big ? "NORMAL" : "LARGE") + "</button></div>" +
    '<div class="jrow"><span>SCREEN SHAKE<br><span style="color:#9ab0d0;font-size:6px">Now: ' + (window.__evoNoShake ? "OFF" : "ON") + '</span></span><button class="gbtn alt" id="jShk">' + (window.__evoNoShake ? "TURN ON" : "TURN OFF") + "</button></div>" +
    '<div class="jrow"><span>SKIP THE ITEM READ TIMER<br><span style="color:#9ab0d0;font-size:6px">Now: ' + (window.__evoFast ? "ON" : "OFF") + '</span></span><button class="gbtn alt" id="jFst">' + (window.__evoFast ? "TURN OFF" : "TURN ON") + "</button></div>" +
    '<p style="font-size:6px;color:#9ab0d0;line-height:1.8">Progress saves by itself when you close the workbench, pick something up, leave the page or every few seconds. The journal is saved per player slot.</p>';
}
function render() {
  $("jTabs").innerHTML = TABS.map((t) => '<button class="jt' + (t[0] === tab ? " on" : "") + '" role="tab" aria-selected="' + (t[0] === tab) + '" data-t="' + t[0] + '">' + t[1] + "</button>").join("");
  const body = $("jBody"); body.innerHTML = { creatures: rCreatures, notes: rNotes, map: rMap, awards: rAwards, settings: rSettings }[tab]();
  const sb = $("jSnd"); if (sb) sb.onclick = () => { const m = $("musicBtn"); if (m) m.click(); setTimeout(render, 180); };
  const sk = $("jShk"); if (sk) sk.onclick = () => { window.__evoNoShake = !window.__evoNoShake; try { localStorage.setItem("evoquest_opt_noshake", window.__evoNoShake ? "1" : "0"); } catch (e) {} render(); };
  const fs = $("jFst"); if (fs) fs.onclick = () => { window.__evoFast = !window.__evoFast; try { localStorage.setItem("evoquest_opt_fast", window.__evoFast ? "1" : "0"); } catch (e) {} render(); };
  const bb = $("jBig"); if (bb) bb.onclick = () => { try { const v = localStorage.getItem("evoquest_ui_big") === "1" ? "0" : "1"; localStorage.setItem("evoquest_ui_big", v); applyBig(); } catch (e) {} render(); };
}
function applyBig() { let v = 0; try { v = localStorage.getItem("evoquest_ui_big") === "1"; } catch (e) {} const gp = $("gp"); if (gp) gp.classList.toggle("big", !!v); }
function openJ(t) {
  if (open || window.__evoQPause) return; try { const d = GM.dbg(); if (d.modal || d.cine || (GM.flags && GM.flags().TC)) return; } catch (e) {}
  load(); open = 1; if (t) tab = t; window.__evoPaused = 1; ov.hidden = false; btn.classList.remove("dot"); render(); try { window.SFX && window.SFX.p("card"); } catch (e) {}
  const c = ov.querySelector(".gcard"); c && (c.scrollTop = 0); $("jClose").focus();
}
function closeJ() { if (!open) return; open = 0; ov.hidden = true; window.__evoPaused = 0; try { window.SFX && window.SFX.p("click"); } catch (e) {} }
$("jClose").onclick = closeJ;
ov.addEventListener("click", (e) => { if (e.target === ov) closeJ(); const t = e.target.closest && e.target.closest(".jt"); if (t) { tab = t.dataset.t; render(); try { window.SFX && window.SFX.p("click"); } catch (x) {} } });
btn.addEventListener("click", () => openJ());
addEventListener("keydown", (e) => {
  if (!GM.on) return;
  if (open) {
    if (e.key === "Escape" || e.key === "n" || e.key === "N") { closeJ(); e.preventDefault(); e.stopPropagation(); }
    else if (e.key === "ArrowRight" || e.key === "ArrowLeft") { const i = TABS.findIndex((t) => t[0] === tab), j = (i + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length; tab = TABS[j][0]; render(); e.preventDefault(); e.stopPropagation(); }
    return;
  }
  if ((e.key === "n" || e.key === "N") && !e.ctrlKey && !e.metaKey && !e.altKey) { openJ(); }
}, true);

/* ------------------------------------------------------------------ polling: discoveries, map, achievements */
let tickN = 0;
function tick() {
  if (!GM.on) { btn.hidden = true; return; }
  let d, b; try { d = GM.dbg(); b = GM.bench(); } catch (e) { return; }
  load(); applyBig();
  btn.hidden = !!(d.modal || d.cine || (GM.flags && GM.flags().TC));
  let dirty = 0;
  if (d.room && !J.vis[d.room]) { J.vis[d.room] = 1; dirty = 1; }
  const see = (id) => { if (!J.seen[id]) { J.seen[id] = 1; dirty = 1; const c = CREATURES.find((x) => x.id === id); notify("NEW CREATURE ENTRY", c.name, 1); btn.classList.add("dot"); } };
  if (d.boss) see("snake");
  if (d.minis > 0) see("hatch");
  let ch = ""; try { ch = window.__evoBoss ? window.__evoBoss() : ""; } catch (e) {}
  if (ch === "chase") see("spider");
  if (d.room === "highway") see("birds");
  if (d.room === "wroad") see("worm");
  if (ch === "fire") see("pack");
  if (d.room === "river") see("beaver");
  const un = unlockedNotes(d);
  un.forEach((c) => { if (!J.notes[c.id]) { J.notes[c.id] = 1; dirty = 1; notify("NEW RESEARCH NOTE", c.name, 0); btn.classList.add("dot"); } });
  ACH.forEach((a) => { if (!J.ach[a.id]) { let ok = false; try { ok = a.t(d, b, J, un.length); } catch (e) {} if (ok) { J.ach[a.id] = 1; dirty = 1; notify("ACHIEVEMENT UNLOCKED", a.n + ": " + a.d, 1); } } });
  if (dirty) save();
  if (open && ++tickN % 4 === 0 && tab === "map") { render(); }
}
setInterval(tick, 500);
window.__evoJournal = { notify, open: openJ, close: closeJ, data: () => J, ach: ACH.length, creatures: CREATURES.length };
})();
