
/* ---------------- items + info cards ---------------- */
Object.assign(items,{
  axe:{n:"Worn Axe",k:"axe",c:"#8a6a4a",where:"THE OLD FOREST (stuck in a stump)",why:"Blunt and rusty, but it still bites into wood.",info:"For chopping poles and boughs."},
  wood:{n:"Wooden Poles",k:"wood",c:"#8a5a32",where:"THE OLD FOREST (fallen dead tree)",why:"Straight, dry poles for a bed frame.",info:"Chopped from a dead tree."},
  bough:{n:"Pine Boughs",k:"bough",c:"#2a6a3a",where:"THE OLD FOREST (young pine)",why:"Springy branches that shed water.",info:"The classic woodsman's mattress."},
  leaves:{n:"Dry Leaves",k:"leaves",c:"#c87a2a",where:"THE OLD FOREST (leaf pile)",why:"Crunchy stuffing that traps warm air.",info:"Dry ones only!"},
  moss:{n:"Soft Moss",k:"moss",c:"#4a8a3a",where:"THE OLD FOREST (mossy boulder)",why:"A springy cushion for a pillow.",info:"From the dry side of the rock."},
  rope:{n:"Vine Rope",k:"rope",c:"#4a6a2a",where:"THE OLD FOREST (loose vine, far left)",why:"A long, tough vine for tying things together.",info:"Nature's cord."},
  frame:{n:"Bed Frame",k:"frame",c:"#8a5a32",where:"STONE WORKBENCH",why:"Poles lashed together with vine rope.",info:"Keeps you off the cold ground."},
  bedding:{n:"Soft Bedding",k:"bedding",c:"#4a7a3a",where:"STONE WORKBENCH",why:"Pine boughs under a thick layer of dry leaves.",info:"Traps warm air."},
  pillow:{n:"Moss Pillow",k:"pillow",c:"#5a9a4a",where:"STONE WORKBENCH",why:"Dry moss bundled up soft.",info:"For your head."},
  bedkit:{n:"Sleeping Space",k:"bedkit",c:"#8a6a3a",where:"STONE WORKBENCH",why:"Everything for a comfortable bed.",info:"Press USE on dry ground to set it up."}});
Object.assign(items.radio,{why:"A handheld two-way radio. Its battery contacts are corroded through.",info:"Wire cells straight to its power terminals."});
Object.assign(items.batts,{n:"Battery Pack",why:"Four sealed 1.5-volt cells.",info:"Still in the packet. Still charged."});
Object.assign(Xt.radio,{how:"Its battery contacts are ruined, so wire the cells straight to its power terminals. The sticky note on the front explains series and parallel."});
Object.assign(Xt.batts,{what:"Four AA cells still sealed in their plastic packet, found in the glovebox of a wrecked truck.",
  sci:"A battery stores energy as chemicals. Inside, zinc gives up electrons and manganese dioxide takes them in; the electrons can only get from one end to the other through a wire, and that flow is the current. In SERIES (+ to −) the voltages add up: 1.5 + 1.5 = 3 volts. In PARALLEL (+ to +, − to −) the voltage stays 1.5 volts, but the cells share the work, so they last longer.",
  real:"Torches and TV remotes put cells in series to get more volts. Big battery packs in electric cars and bikes use both: chains in series for voltage, side by side in parallel for range.",
  how:"Wire them to the radio's terminals. Series adds volts; parallel keeps the volts but lasts longer."});
Object.assign(Xt,{
  axe:{what:"An old hatchet jammed into a tree stump near the forest edge. The blade is blunt and spotted with rust, but the handle is still solid.",
    sci:"An axe head is a WEDGE: a simple machine. Swinging it builds up speed, and the narrow edge concentrates all that force onto a tiny area, so the pressure is huge and it splits the wood fibres apart.",
    real:"Wedges are everywhere: knives, chisels, doorstops, even your front teeth.",how:"Use it to CHOP the fallen dead tree (poles) and the young pine (boughs).",safe:"Always swing away from your legs and never toward another person.",fact:"Stone hand axes are among the oldest tools humans ever made: well over a million years old."},
  wood:{what:"Straight, dry poles chopped from a dead tree that fell long ago.",
    sci:"Dead, dry wood is light and strong because the water that filled its cells has evaporated, leaving stiff walls of cellulose and lignin.",
    real:"Log cabins, bridges and boat masts have all been built from straight poles like these.",how:"Lash them together with vine rope at the stone workbench to make a bed frame.",safe:"",fact:"A tree's growth rings show one year each: count them to find its age."},
  bough:{what:"Springy green branches cut from a young pine.",
    sci:"Pine needles are coated in a waxy layer that stops water getting in or out, and their resin smells sharp because it is full of chemicals that keep insects and fungi away.",
    real:"Woodsmen and soldiers once slept on 'bough beds': layers of evergreen branches tucked together.",how:"Combine with dry leaves at the workbench to make soft bedding.",safe:"Pine resin is very sticky and flammable.",fact:"Some pine cones only open in the heat of a forest fire."},
  leaves:{what:"An armful of dry, crunchy leaves from a pile under the big trees.",
    sci:"A thick pile of dry leaves is full of tiny pockets of still air. Air carries heat very badly, so trapped air works as INSULATION. Wet leaves don't work: water carries heat away about 25 times faster than air.",
    real:"Duvets, puffy jackets and loft insulation all work the same way: they trap still air.",how:"Combine with pine boughs at the workbench.",safe:"Shake them out first: bugs love leaf piles.",fact:"Leaves change colour in autumn when the green chlorophyll breaks down and reveals yellow and orange pigments underneath."},
  moss:{what:"A soft green carpet of moss scraped from the dry side of a boulder.",
    sci:"Moss has no roots or flowers. It soaks up water straight through its tiny leaves and can hold many times its own weight in water, so always pick the DRY patches for bedding.",
    real:"Moss was once used to dress wounds and to fill pillows and mattresses.",how:"Make a moss pillow at the stone workbench.",safe:"",fact:"Mosses were among the first plants to grow on land, around 450 million years ago."},
  rope:{what:"A long, tough vine pulled free from a dead tree on the far left of the forest.",
    sci:"Vines are made of long fibres running along their length, so they are very strong when you pull on them (tension), even though they bend easily.",
    real:"People have twisted plant fibres such as hemp, flax and coconut husk into rope for tens of thousands of years.",how:"Lash the wooden poles together into a bed frame at the workbench.",safe:"",fact:"Some rainforest vines grow longer than a football pitch."},
  frame:{what:"Wooden poles lashed into a low rectangle with vine rope.",sci:"Bare ground pulls heat out of your body by CONDUCTION much faster than still air does, so even a few centimetres of lift keeps you warmer.",real:"Camp beds and hammocks lift sleepers off cold, damp ground.",how:"Part of the sleeping space.",safe:"",fact:"You can lose more heat into the ground overnight than into the air above you."},
  bedding:{what:"Springy pine boughs under a deep layer of dry leaves.",sci:"Layers of trapped air insulate you. The springy boughs also keep the leaves off the damp floor.",real:"Sleeping mats and mattresses work the same way.",how:"Part of the sleeping space.",safe:"",fact:"Penguins huddle in groups to keep warm, taking turns on the cold outside."},
  pillow:{what:"A bundle of dry moss shaped into a pillow.",sci:"Dry moss is springy and full of air, so it is soft and warm.",real:"Pillows have been stuffed with feathers, wool, straw and moss through history.",how:"Part of the sleeping space.",safe:"",fact:"The ancient Egyptians often used carved stone headrests instead of pillows."},
  bedkit:{what:"Bed frame, bedding and moss pillow, ready to set up.",sci:"When you are exhausted, sleep is when your body repairs muscles and your brain sorts the day into memories.",real:"Survival experts rank shelter and rest just behind safety and water.",how:"Stand on dry ground (NOT in the murky water) and press USE to set it up.",safe:"",fact:"Your body temperature drops about 1 °C while you sleep."}});
window.__c3k=C3K;{const _ti=window.tnIcon;window.tnIcon=function(t,a){return C3K[t]?c3Icon(t):_ti(t,a);};}
BZ_LOOT[1].say="A radio! Its battery contacts are corroded through… but the circuit board looks okay.";
BZ_LOOT[3].say="Four batteries, still sealed in the packet!";

/* ---------------- wrappers around the game's globals ---------------- */
{const _esc=window.__bzEsc;window.__bzEsc=()=>{if(c3Esc())return!0;return _esc?_esc():!1;};}
function c3Esc(){const w=qs("#c3Wire");if(w&&!w.hidden){if(!qs("#c3wNoteBox").hidden)c3Note(0);return!0;}
  const b=qs("#c3Bench");if(b&&!b.hidden){c3BenchClose();return!0;}
  const d=qs("#c3Dream");if(d&&!d.hidden){qs("#c3dSkip").click();return!0;}
  const l=qs("#c3Lost");if(l&&!l.hidden){C3L&&C3L.end?l.__close():qs("#c3lSkip").click();return!0;}return!1;}
window.__evoRoom=()=>{if(C3&&C3.dreamOn){const f=C3D?C3D.f:0;return f>=6480?"forest":f>=6290?"dream_hush":f>=5870?"dream_storm":"dream";}return room;};
{const _b=window.__evoBoss;window.__evoBoss=()=>(room==="wroad"&&C3&&C3.ch&&!C3.cut&&!c3S().roadDone?"fire":_b());}
{const _c=window.__evoChase;window.__evoChase=()=>!!((room==="wroad"&&C3&&C3.ch&&!C3.cut&&!dead&&!won&&!c3S().roadDone)||_c());}
window.__c3st=()=>Object.assign({},c3S());
qs("#cskip").onclick=()=>(C3.cut?c3Skip():c2cut?c2CutEnd():skipCine());
/* leaving to the menu mid-scene: close every overlay so nothing is left half-open next time */
function c3CloseAll(){try{if(C3W){cancelAnimationFrame(C3W.raf);C3W=null;}if(C3D){cancelAnimationFrame(C3D.raf);C3D=null;}if(C3L){cancelAnimationFrame(C3L.raf);C3L=null;}
  if(typeof BZR!=="undefined"&&BZR){cancelAnimationFrame(BZR.raf);BZR=null;}bzHush();
  ["#c3Wire","#c3Bench","#c3Dream","#c3Lost","#bzRadio"].forEach((k)=>{const e=qs(k);e&&(e.hidden=!0);});
  C3.dreamOn=0;document.body.classList.remove("c3dream");C3.cut=null;C3.busy=0;C3.task=null;C3.lie=0;C3.dark=0;if(TC&&(TC.wait||TC.k==="sit"||TC.k==="after")){TC=null;tnBars(0);tnCap("");}modal=0;}catch(e){}}
/* automated self-test hooks (developer use) */
GM.c3={st:()=>c3S(),C3:()=>C3,wire:()=>C3W&&{round:C3W.round,phase:C3W.phase,strikes:C3W.strikes,wires:C3W.wires.slice()},
  solve:(i)=>{const W=C3W;if(!W)return null;const k=i==null?W.round:i;return c3Grade(C3_RND[k],c3Solve(C3_RND[k],c3Answer(k))).k;},
  answer:()=>{const W=C3W;if(!W||W.phase!=="wire")return!1;W.wires=c3Answer(W.round);return!0;},
  setWires:(w)=>{C3W&&(C3W.wires=w);},press:()=>c3WButton(),dream:()=>C3D&&{f:C3D.f},seek:(f)=>{C3D&&(C3D.f=f);},hold:(f)=>{if(!C3D)return;C3D.hold=0;C3D.freeze=0;C3D.f=f;for(let i=0;i<40;i++)c3DStep();C3D.hold=1;},unhold:()=>{C3D&&(C3D.hold=0);},shark:(f)=>c3SharkAt(f),
  go:(id,o)=>{Object.assign(c3S(),o||{});c2Start(id);},hole:()=>C3.holes.length,
  give:(ids)=>{ids.forEach((i)=>{inv.includes(i)||inv.push(i);got.add(i);});updateBag();updateGuide();},bz:(o)=>Object.assign(TS.bz,o),god:(v)=>{Eo.god=v?1:0;},hp:()=>hp,
  info:()=>({room,x:player.x,y:player.y,cut:C3.cut&&C3.cut.k,ct:C3.cut&&C3.cut.t,fire:C3.ch&&C3.ch.fire,modal,dead,won,hp,inv:inv.slice(),fade:fadeNow,TC:TC&&TC.k,lie:C3.lie,dark:C3.dark,bed:c3S().bed})};
