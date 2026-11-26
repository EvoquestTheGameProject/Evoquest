
/* ======================= DEVELOPER TOOLS: this update ======================= */
C3_DEVBTN.push(
  ["CHASE DANGERS (2ND HALF)",[["c3_zcar","CAR: START FUSE AHEAD"],["c3_zpole","POLE: TOPPLE AHEAD"],["c3_zlate","POLE: LATE (RIGHT ON ME)"],["c3_zsink","SINKHOLE: OPEN AHEAD"],["c3_zrats","RAT STAMPEDE NOW"],["c3_zhzr","RESET ALL DANGERS"]]],
  ["FOREST CRAFTING TREE",[["c3_zwhet","GIVE WHETSTONE"],["c3_zaxe2","GIVE SHARP AXE"],["c3_zvines","GIVE 3 VINE STRANDS"],["c3_zraw","GIVE ALL 10 RAW MATERIALS"],["c3_zparts","GIVE FRAME + BEDDING + PILLOW"],["c3_zbench","OPEN WORKBENCH"],["c3_zcraft0","RESET CRAFTING"]]],
  ["PART 4: SCREENS + PREVIEWS",[["c3_znote","OPEN THE NOTE"],["c3_zsearch","SEARCH NEAREST CONTAINER"],["c3_zall","OPEN ALL CONTAINERS"],["c3_zfilt","OPEN FILTER BUILDER"],["c3_zdamp","PREVIEW: DAM BREAK"],["c3_zflood","PREVIEW: FLOOD WAVE"],["c3_zfreeze","DAM TIMER: FREEZE"],["c3_zsun","CYCLE SUN / SHADE TEST"],["c3_zcard","SHOW END CARD"]]]);
{const _d=c3Dev;c3Dev=function(a){if(a.slice(0,4)==="c3_z")return c4Dev2(a);return _d(a);};}
{const _h=c3DevHTML;c3DevHTML=function(btn){return _h((on,attr,lab)=>btn(attr==='data-a="c3_zfreeze"'?!!C4.freeze:on,attr,attr==='data-a="c3_zfreeze"'?"DAM TIMER: "+(C4.freeze?"FROZEN":"RUNNING"):lab));};}
function c4Dev2(a){const close=()=>{modal=0;Oo=0;Do.hidden=!0;},S=c3S(),give=(L)=>{L.forEach((k)=>{inv.includes(k)||inv.push(k);got.add(k);});updateBag();updateGuide();};
  const ahead=(d)=>player.x-d;
  if(["c3_zcar","c3_zpole","c3_zlate","c3_zsink","c3_zrats","c3_zhzr"].includes(a)){
    if(room!=="wroad"||!C3.ch||!C3.hz){toast("Start the fire chase first (ROAD + CHASE: START FIRE CHASE).",2400);return;}close();const H=C3.hz;
    if(a==="c3_zhzr"){c3HzReset();toast("Chase dangers reset.",1200);return;}
    if(a==="c3_zcar"){const car=C2.wroad.cars.filter((c)=>!c.burn&&c.x+c.w<player.x-10).sort((p,q)=>q.x-p.x)[0];if(!car){toast("No unburnt car ahead.",1400);return;}
      H.cars[car.x]={st:1,t:0};$sx("sizzle");toast("Car fuse lit.",1200);return;}
    if(a==="c3_zpole"||a==="c3_zlate"){const x=Math.round(ahead(a==="c3_zlate"?8:60));H.poles.push({x,st:1,t:0,late:a==="c3_zlate"?1:0,cd:0});$sx("creak");toast("Pole toppling.",1200);return;}
    if(a==="c3_zsink"){H.sinks.push({x:Math.round(ahead(50)),st:1,t:0});$sx("rumble");toast("Sinkhole opening.",1200);return;}
    if(a==="c3_zrats"){H.rw={t:0,hit:0};$sx("skitter");toast("Rats incoming from behind!",1200);return;}}
  if(a==="c3_zwhet"){give(["whet"]);close();toast("Whetstone added.",1200);return;}
  if(a==="c3_zaxe2"){inv=inv.filter((k)=>k!=="axe");give(["axe2"]);got.add("axe");got.add("whet");close();toast("Sharp axe added.",1200);return;}
  if(a==="c3_zvines"){give(["vinea","vineb","vinec"]);close();toast("3 vine strands added.",1200);return;}
  if(a==="c3_zraw"){give(["axe","whet","wood","vinea","vineb","vinec","bough","leaves","moss","fern"]);close();toast("All 10 raw materials added.",1400);return;}
  if(a==="c3_zparts"){give(["frame","bedding","pillow"]);close();toast("Frame, bedding and pillow added.",1400);return;}
  if(a==="c3_zbench"){if(room!=="forest"){toast("Only in the forest.",1400);return;}close();c3Bench();return;}
  if(a==="c3_zcraft0"){const L=["axe","whet","axe2","wood","poles","vinea","vineb","vinec","rope","bough","leaves","moss","fern","frame","bedding","pillow","bedkit"];inv=inv.filter((k)=>!L.includes(k));L.forEach((k)=>got.delete(k));S.bed=0;updateBag();updateGuide();close();toast("Crafting reset.",1400);return;}
  if(a==="c3_znote"){close();c4NoteOpen(!0);return;}
  if(a==="c3_zsearch"||a==="c3_zall"){const S4=c4S();if(room!=="cbridge"||!S4.box){toast("Go to the collapsed bridge first.",1600);return;}close();
    if(a==="c3_zall"){S4.box.st=S4.box.st.map((s)=>s==="crushed"?s:"open");toast("All containers unlocked (crushed ones stay shut).",1800);return;}
    let best=-1,bd=1e9;C4_POS.forEach((p,i)=>{const d=Math.abs(p.x-player.x)+Math.abs(p.y-player.y)*2;if(S4.box.st[i]!=="crushed"&&d<bd){bd=d;best=i;}});best>=0&&(S4.box.st[best]="open",c4SearchOpen(best));return;}
  if(a==="c3_zfilt"){const M=c4S().mat;Object.assign(M,{bark:Math.max(1,M.bark),grass:Math.max(1,M.grass),coal:1,sand:1,gravel:1});close();c4FiltOpen();return;}
  if(a==="c3_zdamp"){if(room!=="river"){toast("Go to the river first.",1400);return;}close();C4.dbreak=0.01;const t0=tick,step=()=>{if(!C4.dbreak)return;C4.dbreak=Math.min(1,C4.dbreak+0.01);if(tick-t0<420)requestAnimationFrame(step);else C4.dbreak=0;};$sx("crash");requestAnimationFrame(step);toast("Dam break preview (no damage).",1600);return;}
  if(a==="c3_zflood"){close();C4.flood=0.01;const t0=performance.now(),step=()=>{const k=(performance.now()-t0)/4000;C4.flood=k<0.5?k*2:Math.max(0,2-k*2);if(k<1)requestAnimationFrame(step);else C4.flood=0;};$sx("whoosh");requestAnimationFrame(step);toast("Flood preview (no damage).",1600);return;}
  if(a==="c3_zfreeze"){C4.freeze=C4.freeze?0:1;_o();return;}
  if(a==="c3_zsun"){C4.sunT=((C4.sunT==null?-1:C4.sunT)+1)%4;close();toast(C4.sunT===3?"Sun test OFF (real shade/sun).":"Forcing: "+["SHADE","SUN","HOT SUN"][C4.sunT],1600);return;}
  if(a==="c3_zcard"){close();c3CloseAll();won=2;qs("#c2w").hidden=!1;fadeNow=1;fadeTo=1;return;}}
