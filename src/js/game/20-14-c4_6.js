
/* ---------------- part 4: items, icons, info cards ---------------- */
Object.assign(items,{
  whet:{n:"Whetstone",k:"q4whet",c:"#8a8a8a",where:"THE OLD FOREST (by the murky pool)",why:"A flat, fine-grained stone for sharpening.",info:"Rub a blade on it, wet."},
  axe2:{n:"Sharp Axe",k:"q4axe2",c:"#c8ccd4",where:"STONE WORKBENCH",why:"The worn axe, ground to a keen edge.",info:"Now it bites deep."},
  vinea:{n:"Vine Strand (low)",k:"q4vinea",c:"#4a7a2a",where:"THE OLD FOREST (far left)",why:"One tough vine strand.",info:"Braid three together."},
  vineb:{n:"Vine Strand (high)",k:"q4vineb",c:"#4a7a2a",where:"THE OLD FOREST (up a tree)",why:"One tough vine strand.",info:"Braid three together."},
  vinec:{n:"Vine Strand (dead tree)",k:"q4vinec",c:"#4a7a2a",where:"THE OLD FOREST (near the entrance)",why:"One tough vine strand.",info:"Braid three together."},
  poles:{n:"Trimmed Poles",k:"q4poles",c:"#b88a5a",where:"STONE WORKBENCH",why:"Straight poles, the bark and twigs cut away.",info:"Ready to lash into a frame."},
  fern:{n:"Fern Fronds",k:"q4fern",c:"#3a8a3a",where:"THE OLD FOREST (fern patch)",why:"Soft, feathery leaves.",info:"Stuffing for a pillow."},
  pot:{n:"Clean Steel Pot",k:"q4pot",c:"#9aa0aa",where:"A CARGO CONTAINER",why:"No rust, no holes. Perfect for boiling.",info:"Fill it at the river."},
  bottle:{n:"Clean Water Bottle",k:"q4bottle",c:"#c8e8f8",where:"A CARGO CONTAINER",why:"A sturdy screw-top bottle, still wrapped.",info:"For safe water only."},
  wbottle:{n:"Bottle of Safe Water",k:"q4wbottle",c:"#8ad8ff",where:"YOUR CAMPFIRE",why:"Boiled, filtered and boiled again.",info:"Clean, safe drinking water."},
  ckey:{n:"Container Key",k:"q4ckey",c:"#d8b02a",where:"A CARGO CONTAINER",why:"A key with a coloured tag.",info:"Match the tag to a padlock."}});
Object.assign(Xt,{
  whet:{what:"A flat, smooth stone with a very fine grain, lying at the edge of the murky pool.",sci:"Sharpening is grinding: the hard grains of the stone scrape away tiny bits of metal until the two faces of the blade meet in a thin, straight edge. A thin edge puts all the force on a tiny area, so the PRESSURE is huge. Water carries away the metal dust so the stone doesn't clog.",real:"Chefs, carpenters and farmers still sharpen tools on whetstones.",how:"Combine it with the worn axe at the stone workbench.",safe:"Always sharpen away from your fingers.",fact:"The name has nothing to do with water: 'whet' is an old word meaning 'to sharpen'."},
  axe2:{what:"Your worn axe, ground to a keen edge on the whetstone.",sci:"A blunt edge spreads your swing over a wide area, so the pressure is low and it bounces off. A sharp edge concentrates it, so it slices between the wood fibres.",real:"A sharp tool is a SAFER tool: it goes where you aim instead of glancing off.",how:"Chop the dead tree and the young pine with it.",safe:"Swing away from your legs and never toward anyone.",fact:"Pressure = force ÷ area. Halve the area and you double the pressure."},
  vinea:{what:"One long vine strand pulled from a tree on the far left.",sci:"Plant fibres run along the length of the vine, so it is strong in TENSION (pulling).",real:"",how:"Collect all three strands, then braid them at the workbench.",safe:"",fact:""},
  vineb:{what:"A vine strand you climbed up a tree to reach.",sci:"Plant fibres run along the length of the vine, so it is strong in TENSION (pulling).",real:"",how:"Collect all three strands, then braid them at the workbench.",safe:"",fact:""},
  vinec:{what:"A vine strand from the dead tree near the forest entrance.",sci:"Plant fibres run along the length of the vine, so it is strong in TENSION (pulling).",real:"",how:"Collect all three strands, then braid them at the workbench.",safe:"",fact:""},
  poles:{what:"The rough logs, trimmed straight with the sharp axe.",sci:"Knots and side branches are weak spots. Trimming them off leaves smooth poles that lash together tightly with no gaps.",real:"Builders 'dress' timber the same way before using it.",how:"Lash with braided rope at the workbench to make the bed frame.",safe:"",fact:""},
  fern:{what:"Soft fern fronds from the shady fern patch.",sci:"Ferns are ancient plants that reproduce with spores, not seeds. Their fine, feathery fronds trap air, so a bundle of them is springy and soft.",real:"Ferns were once used to stuff mattresses and pack fruit.",how:"Combine with the dry moss at the workbench to make a pillow.",safe:"",fact:"Ferns were growing on Earth long before the dinosaurs."},
  pot:{what:"A plain steel cooking pot with a wire handle, found brand new inside a crashed cargo container.",sci:"Metal conducts heat well and won't melt in a campfire, so it is perfect for boiling water. Rust (iron oxide) flakes off and leaves holes, which is why the rusty pot was useless.",real:"Campers and soldiers carry small metal pots ('billy cans') to boil water.",how:"Fill it at the river, then hang it over the campfire.",safe:"The handle gets HOT. Use a stick or cloth.",fact:"Water boils at a lower temperature on mountains, because the air pressure is lower."},
  bottle:{what:"A sturdy screw-top water bottle, still sealed in its wrapper.",sci:"A sealed, clean container stops germs getting back into water that you have already made safe.",real:"Clean storage is as important as clean water: a dirty bottle undoes all your hard work.",how:"Fill it with water that's been boiled, filtered and boiled again.",safe:"",fact:""},
  wbottle:{what:"Your bottle, full of water that you boiled, filtered and boiled again.",sci:"Boiling kills bacteria, viruses and parasites. Filtering removes mud, grit and many chemicals. Together, they make river water safe to drink.",real:"Survival experts use the same steps: filter out the dirt, then boil (or disinfect) to kill germs.",how:"Drink it slowly.",safe:"",fact:"About 60% of your body is water."},
  ckey:{what:"A small brass padlock key with a coloured plastic tag.",sci:"Inside a padlock, little spring-loaded pins block the lock. The bumps on the right key push every pin to exactly the right height so the lock can turn.",real:"Shipping companies tag keys by colour or number so the right key goes to the right container.",how:"Find the container whose padlock tag matches the key's tag.",safe:"",fact:"The pin-tumbler lock idea is around 4,000 years old: the ancient Egyptians made wooden ones."}});
Object.assign(items.wood,{n:"Rough Logs",why:"Straight logs from a dead tree. Still knotty.",info:"Trim them into poles at the workbench."});
Object.assign(items.rope,{n:"Braided Rope",where:"STONE WORKBENCH",why:"Three vine strands braided into one strong rope.",info:"Nature's cord, three times stronger."});
Object.assign(items.axe,{why:"Blunt and rusty: it just bounces off wood.",info:"Sharpen it on a whetstone first."});
Object.assign(Xt.axe,{how:"It's too blunt to chop with. Sharpen it on a whetstone at the stone workbench."});
Object.assign(Xt.rope,{what:"Three vine strands braided together at the workbench.",sci:"When strands are braided, each one carries part of the load and friction between them stops them sliding apart, so the rope is far stronger than any single strand.",how:"Lash the trimmed poles into a bed frame at the workbench."});
Object.assign(Xt.wood,{how:"Trim them into straight poles with the SHARP axe at the workbench."});
Object.assign(C3K,{q4whet:1,q4axe2:1,q4vinea:1,q4vineb:1,q4vinec:1,q4poles:1,q4fern:1,q4pot:1,q4bottle:1,q4wbottle:1,q4ckey:1});
{const _c3i=c3Icon;c3Icon=function(t){return C4_ICONS[t]?c4IconCv(t).toDataURL():_c3i(t);};}
var C4_ICONS={q4whet:1,q4axe2:1,q4vinea:1,q4vineb:1,q4vinec:1,q4poles:1,q4fern:1,q4pot:1,q4bottle:1,q4wbottle:1,q4ckey:1,m_grass:1,m_coal:1,m_sand:1,m_gravel:1};
function c4IconCv(t){t=t.replace(/^q4/,"");const o=c3Cv(24,24),g=o.getContext("2d"),n=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(x,y,w,h);};n("#0a0c14",2,2,20,20);
  if(t==="whet"){n("#6a6a66",3,9,18,8);n("#9a9a94",3,9,18,2);n("#4a4a46",3,15,18,2);n("#b8b8b0",6,10,8,1);n("#8ad8ff",14,11,4,1);}
  else if(t==="axe2"){for(let k=0;k<14;k++)n(k%3?"#8a6a44":"#6a4a2a",5+k,20-k,2,2);n("#9aa0aa",12,3,8,8);n("#e8f0ff",12,3,8,2);n("#ffffff",19,3,1,8);n("#5a5e66",12,10,8,1);}
  else if(t.slice(0,4)==="vine"){g.strokeStyle="#4a7a2a";g.lineWidth=2;g.beginPath();g.moveTo(5,4);g.bezierCurveTo(18,8,4,14,18,20);g.stroke();n("#6aaa4a",8,6,3,2);n("#6aaa4a",12,14,3,2);n("#3a6a2a",16,18,3,2);}
  else if(t==="poles"){for(let k=0;k<3;k++){n("#b88a5a",3,6+k*5,18,4);n("#e0c090",3,6+k*5,18,1);n("#e8d0a0",20,6+k*5,2,4);}}
  else if(t==="fern"){n("#2a6a2a",11,3,2,18);for(let k=0;k<7;k++){const w=8-Math.abs(k-3);n(k%2?"#3a8a3a":"#5aaa4a",12-w,5+k*2,w,1.5);n(k%2?"#3a8a3a":"#5aaa4a",13,5+k*2,w,1.5);}}
  else if(t==="pot"){n("#3a3e46",4,9,16,11);n("#9aa0aa",5,10,14,9);n("#c8ced8",5,10,14,2);n("#6a7078",5,17,14,2);g.strokeStyle="#5a5e66";g.lineWidth=1.2;g.beginPath();g.arc(12,10,7,Math.PI*1.05,Math.PI*1.95);g.stroke();}
  else if(t==="bottle"||t==="wbottle"){n("#3a6ad8",10,3,4,3);n("#e8f4fa",9,6,6,2);n("#c8e8f8",7,8,10,13);n("#ffffff",8,9,2,10);t==="wbottle"&&(n("#5ab8f0",8,11,8,9),n("#9ae0ff",8,11,8,1));n("#3a4a5a",7,20,10,1);}
  else if(t==="ckey"){n("#d8b02a",4,9,7,7);n("#0a0c14",6,11,3,3);n("#d8b02a",11,11,10,3);n("#d8b02a",17,14,2,3);n("#d8b02a",20,14,1,3);n("#fff0a0",4,9,7,1);n("#e0762a",2,16,5,5);n("#ffffff",3,17,1,1);}
  else if(t==="m_grass"){for(let k=0;k<8;k++)n(k%2?"#c8b46a":"#a8943a",4+k*2,6+(k%3),1,14-(k%3));}
  else if(t==="m_coal"){n("#1a1a1e",5,10,14,9);n("#3a3a40",6,10,8,2);n("#2a2a30",10,14,6,3);n("#4a4a52",7,15,2,1);}
  else if(t==="m_sand"){n("#e0c88a",4,12,16,8);n("#c8ac6a",6,14,2,1);n("#c8ac6a",12,16,2,1);n("#f0dca0",4,12,16,1);}
  else if(t==="m_gravel"){n("#8a8a84",4,12,6,6);n("#6a6a64",10,14,6,5);n("#9a9a92",15,10,5,5);n("#b8b8b0",5,12,3,1);}
  return o;}
function c4Icon(t){C4.icon=C4.icon||{};return C4.icon[t]||(C4.icon[t]=c4IconCv(t).toDataURL());}
/* container contents (closed parcels and what's inside them) */
function c4SlotArt(k,open){C4.slot=C4.slot||{};const id=k+(open?1:0);if(C4.slot[id])return C4.slot[id];const o=c3Cv(24,24),g=o.getContext("2d"),n=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(x,y,w,h);};
  if(!open){if(k==="crate"){n("#8a6a3a",3,6,18,14);n("#a8844a",3,6,18,2);n("#5a4022",3,12,18,1);for(let q=0;q<3;q++)n("#5a4022",5+q*6,6,1,14);}
    else if(k==="sack"){n("#a89870",5,7,14,14);n("#c8b890",6,7,10,2);n("#6a5a3a",10,4,4,4);n("#8a7a5a",7,15,10,1);}
    else if(k==="drum"){n("#3a6a8a",6,4,12,17);n("#5a8aaa",6,4,12,2);n("#2a4a6a",6,10,12,1);n("#2a4a6a",6,16,12,1);}
    else if(k==="case"){n("#2a2a2e",3,8,18,11);n("#4a4a52",3,8,18,2);n("#8a8a90",10,6,4,2);n("#c8a030",5,12,2,2);n("#c8a030",17,12,2,2);}
    else{n("#c8a06a",4,7,16,13);n("#e0bc84",4,7,16,2);n("#a8844a",11,7,2,13);n("#ffffff",6,14,4,2);}}
  else{const S={key:()=>{n("#d8b02a",4,9,7,7);n("#1a1a1e",6,11,3,3);n("#d8b02a",11,11,10,3);n("#d8b02a",17,14,2,3);n("#ffffff",3,17,3,3);},
      pot:()=>{n("#9aa0aa",5,10,14,9);n("#c8ced8",5,10,14,2);g.strokeStyle="#5a5e66";g.lineWidth=1.2;g.beginPath();g.arc(12,10,7,Math.PI*1.05,Math.PI*1.95);g.stroke();},
      bottle:()=>{n("#3a6ad8",10,3,4,3);n("#c8e8f8",7,7,10,14);n("#ffffff",8,8,2,11);},
      rpot:()=>{n("#8a4a22",5,10,14,9);n("#a85a2a",5,10,14,2);n("#1a0a04",8,16,2,2);n("#1a0a04",13,14,2,2);n("#c87a3a",11,12,3,1);},
      cbot:()=>{n("#c8e8f8",7,7,10,14);n("#3a6ad8",10,3,4,3);g.strokeStyle="#2a2a2a";g.lineWidth=0.8;g.beginPath();g.moveTo(10,8);g.lineTo(13,12);g.lineTo(10,15);g.lineTo(14,20);g.stroke();},
      bowl:()=>{n("#e05a8a",4,12,16,6);n("#ff8ab0",4,12,16,1);n("#c03a6a",7,17,10,2);},
      foam:()=>{for(let q=0;q<9;q++)n("#f4f4f0",4+(q*5)%15,6+(q*7)%13,4,3);},prop:()=>{n("#2a2e36",11,11,3,3);n("#d8dce4",3,11,8,2);n("#d8dce4",14,11,8,2);n("#d8dce4",11,3,2,8);},
      seeds:()=>{n("#e0c84a",5,5,7,10);n("#5aaa3a",12,8,7,10);n("#d8342a",7,8,3,3);n("#ffe070",14,11,3,3);},lights:()=>{n("#2a2e36",6,12,12,5);n("#3a5a8a",7,13,10,3);n("#ffe070",10,6,4,5);n("#1a1a1a",12,11,1,1);},
      cells:()=>{for(let q=0;q<4;q++){n("#3a3a3a",4+q*4,7,3,12);n("#c8c8c0",4+q*4,6,3,1);}},cables:()=>{g.strokeStyle="#e8e8e8";g.lineWidth=1.2;g.beginPath();g.ellipse(12,12,7,4,0.4,0,7);g.stroke();g.beginPath();g.ellipse(11,13,5,6,-0.5,0,7);g.stroke();},
      books:()=>{n("#d8342a",4,6,7,13);n("#3a6ad8",11,7,7,12);n("#ffffff",5,8,5,1);n("#ffe070",12,9,5,1);},ball:()=>{n("#ff6a5a",5,12,14,6);n("#ffe070",9,12,3,6);n("#5ab8ff",14,12,3,6);},
      label:()=>{n("#f4f0e0",4,6,16,12);n("#2a2a2a",6,9,12,1);n("#2a2a2a",6,12,9,1);n("#2a2a2a",6,15,11,1);},plates:()=>{n("#e8e8e0",4,10,7,7);n("#e8e8e0",12,12,8,5);n("#a8a8a0",9,13,4,1);},
      bubble:()=>{n("#d8f0ff",4,6,16,12);for(let q=0;q<9;q++)n("#ffffff",5+(q%3)*5,7+((q/3)|0)*4,3,3);},tools:()=>{n("#d8342a",4,10,16,9);n("#a82a1a",4,10,16,2);n("#2a2a2a",9,7,6,3);},
      boats:()=>{n("#ffe070",4,12,9,4);n("#5ab8ff",12,15,8,4);n("#ffffff",7,6,1,6);n("#ffffff",15,9,1,6);},rice:()=>{n("#c8c0a0",5,8,14,12);n("#6a8a4a",8,12,3,3);n("#6a8a4a",13,15,3,2);},
      bolts:()=>{for(let q=0;q<8;q++)n(q%2?"#8a8a90":"#c8c8d0",4+(q*5)%16,6+(q*3)%12,3,3);},tablet:()=>{n("#1a1a1e",5,5,14,14);n("#3a3a42",6,6,12,12);g.strokeStyle="#c8c8d0";g.lineWidth=0.6;g.beginPath();g.moveTo(7,7);g.lineTo(12,12);g.lineTo(16,9);g.moveTo(12,12);g.lineTo(10,17);g.stroke();},
      socks:()=>{n("#8a4ac8",6,4,5,12);n("#8a4ac8",6,14,9,5);n("#ffffff",6,4,5,2);n("#2a9a4a",13,6,5,10);},paint:()=>{n("#c8c8c0",6,7,12,13);n("#ffe070",6,9,12,6);n("#8a8a8a",6,6,12,2);}};
    (S[k]||S.foam)();}
  return(C4.slot[id]=o.toDataURL());}

/* ---------------- wrappers ---------------- */
{const _esc=window.__bzEsc;window.__bzEsc=()=>{if(c4Esc())return!0;return _esc?_esc():!1;};}
function c4Esc(){const n=qs("#c4Note");if(n&&!n.hidden){n.__close();return!0;}const s=qs("#c4Search");if(s&&!s.hidden){c4SearchClose();return!0;}
  const f=qs("#c4Filt");if(f&&!f.hidden){c4FiltClose();return!0;}
  const sh=qs("#c4Shop");if(sh&&!sh.hidden){c4ShopClose();return!0;}const tr=qs("#c4Try");if(tr&&!tr.hidden){c4TryClose();return!0;}const w=qs("#c4Flow");if(w&&!w.hidden){C4W&&C4W.done&&qs("#c4wOk").click();return!0;}return!1;}
{const _cl=c3CloseAll;c3CloseAll=function(){try{c4CloseAll();C4SR=null;C4F=null;}catch(e){}_cl();};}
{const _r=window.__evoRoom;window.__evoRoom=()=>{const v=_r();if(c4Is()&&C3&&C3.cut&&(C3.cut.k==="c4dam"||(C3.cut.k==="c4end"&&C3.cut.t>330)))return"river_flood";return v;};}
{const _c=window.__evoChase;window.__evoChase=()=>!!(c4Is()&&C3&&!C3.cut&&!dead&&!won&&((c4S().damOn&&!c4S().bridge&&c4S().arr)||(c4S().t8on&&!c4S().end)))||_c();}
Object.assign(GM.c3,{c4:()=>c4S(),C4:()=>C4,done:()=>c4Done(),tip:()=>c4Tip(),pick:()=>rooms[room].ints.filter((i)=>i.r>0).map((i)=>[i.id,i.label,Math.round(i.x)]),
  use:()=>{const it=rooms[room].ints.find((i)=>i.r>0&&Math.abs(player.x-i.x)<i.r);return it?(tnUse(it),it.id):null;},
  chain:()=>{const B=c4S().box;return B&&{chain:B.chain.slice(),st:B.st.slice(),key:B.key,step:B.step,col:B.col.map((c)=>C4_COL[c][0])};},
  search:(j)=>c4SearchPick(j),sclose:()=>c4SearchClose(),slots:()=>C4SR&&c4S().box.slots[C4SR.i].map((s)=>s.k+(s.o?"*":"")),
  filt:(k)=>c4FiltAdd(k),fclose:()=>c4FiltClose(),flow:()=>C4W&&{f:C4W.f,done:C4W.done},hit:()=>{C4.mini?c4MiniHit():C4.strike&&c4StrikeHit();},mini:()=>C4.mini&&{ang:C4.mini.ang,drive:C4.mini.drive}});
