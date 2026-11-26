
/* ======================= DEVELOPER TOOLS: Chapter 2, part 4 ======================= */
C3_DEVBTN.push(
  ["PART 4: NOTE + THIRST",[["c3_qwake","AFTER THE DREAM (CP)"],["c3_qnote","READ THE NOTE"],["c3_qm95","DEHYDRATION 95%"],["c3_qm45","DEHYDRATION 45%"],["c3_qm0","DEHYDRATION OFF/ON"]]],
  ["PART 4: RIVER BRIDGE",[["c3_qriver","GO TO RIVER (ARRIVAL)"],["c3_qmats","FILL ARMS (6 LOGS, 2 STAKES, 3 ROPE)"],["c3_qseg","BUILD NEXT SEGMENT (ROPED)"],["c3_qsegn","BUILD NEXT SEGMENT (NO ROPE)"],["c3_qbuilt","FINISH BRIDGE"],["c3_qdam20","DAM: 0:20 LEFT"],["c3_qdamr","DAM: RESET TIMER"]]],
  ["PART 4: BROKEN BRIDGE",[["c3_qroad","RIVER ROAD (25 S WALK)"],["c3_qcb","BRIDGE (BEFORE COLLAPSE)"],["c3_qcol","BRIDGE (COLLAPSED)"],["c3_qkey","GIVE NEXT KEY"],["c3_qshow","SHOW KEY CHAIN"],["c3_qpot","GIVE POT + BOTTLE"]]],
  ["PART 4: CLEAN WATER",[["c3_qwater","START 8-MIN PHASE (AT CAMP)"],["c3_qfire","LIGHT FIRE"],["c3_qfill","FILL POT"],["c3_qboil","FINISH THIS BOIL"],["c3_qfmat","GIVE FILTER MATERIALS"],["c3_qflow","FILTER NOW"],["c3_qdrink","DRINK + ENDING"],["c3_qreset4","RESET PART 4"]]]);
function c4DevBase(o){const S=c3S();S.wired=1;S.hints=10;S.road=1;S.half=1;S.roadDone=1;S.fin=1;S.slept=1;S.done=1;S.bed=S.bed||600;
  const S4=c4S();S4.on=1;Object.assign(S4,o||{});["axe2"].forEach((k)=>{inv.includes(k)||inv.push(k);got.add(k);});inv=inv.filter((k)=>k!=="axe");updateBag();return S4;}
function c4DevRiverReady(){const S4=c4DevBase({seen:1,note:1,arr:1});return S4;}
function c4DevGo(rm,x,y){modal=0;Oo=0;Do.hidden=!0;qs("#gd").hidden=!0;dead=!1;hp=Math.max(hp,5);c3CloseAll();C3.once={};enterRoom(rm,"R");
  if(x!=null){player.x=x;player.y=y||C2_FLOOR;camX=c3Clamp(x-96,0,rooms[rm].W-192);}}
{const _pre=c3DevPre;c3DevPre=function(a){_pre(a);
  if(a==="river"){c3S().c4=Object.assign(c4Fresh(),{on:1,seen:1,note:1});c4DevBase({});}
  if(a==="rroad"||a==="cbridge"){c3S().c4=Object.assign(c4Fresh(),{on:1});const S4=c4DevRiverReady();S4.bridge=1;S4.seg.forEach((s)=>{s.st=1;s.rope=1;s.logs=3;});if(a==="cbridge"){S4.bcol=0;S4.box=null;}}};}
{const _dev=c3Dev;c3Dev=function(a){if(a.slice(0,4)!=="c3_q")return _dev(a);c4Dev(a);};}
function c4Dev(a){const close=()=>{modal=0;Oo=0;Do.hidden=!0;},S=c3S();
  if(a==="c3_qreset4"){S.c4=c4Fresh();close();c3CloseAll();toast("Part 4 progress reset.",1800);return;}
  if(a==="c3_qwake"){c4DevBase({});const S4=c4S();Object.assign(S4,c4Fresh(),{on:1});c4DevGo("forest",S.bed+14);S4.cp=null;c4ForestEnter();return;}
  if(a==="c3_qnote"){c4DevBase({});c4DevGo("forest",C4_NOTE+50);return;}
  if(a==="c3_qm95"){const S4=c4S();S4.on=1;S4.drank=0;S4.met=95;close();toast("Dehydration 95%.",1400);return;}
  if(a==="c3_qm45"){const S4=c4S();S4.on=1;S4.drank=0;S4.met=45;close();toast("Dehydration 45%.",1400);return;}
  if(a==="c3_qm0"){const S4=c4S();S4.drank=S4.drank?0:1;close();toast("Dehydration meter "+(S4.drank?"OFF":"ON"),1400);return;}
  if(a==="c3_qriver"){c3S().c4=Object.assign(c4Fresh(),{on:1,seen:1,note:1});c4DevBase({});c4DevGo("river",null);return;}
  if(a==="c3_qmats"){const S4=c4S();Object.assign(S4.car,{log:6,stake:2,rope:3});close();updateGuide();toast("Arms full.",1200);return;}
  if(a==="c3_qseg"||a==="c3_qsegn"){if(room!=="river"){c4DevRiverReady();c4DevGo("river",C4_R1+20);}close();const S4=c4S(),d=c4Done(),s=S4.seg[d];if(!s){toast("Bridge already complete.",1400);return;}
    s.st=1;s.rope=a==="c3_qseg"?1:0;s.logs=3;player.x=Math.max(player.x,c4Tip()+4);updateGuide();if(c4Done()>=C4_N)c4Connected();else toast("Segment "+c4Done()+" built.",1200);return;}
  if(a==="c3_qbuilt"){const S4=c4DevRiverReady();S4.seg.forEach((s)=>{s.st=1;s.rope=1;s.logs=3;});S4.bridge=1;S4.damOn=0;if(room!=="river")c4DevGo("river",C4_R0-20);else close();updateGuide();toast("Bridge finished.",1400);return;}
  if(a==="c3_qdam20"){const S4=c4S();S4.t8on&&!S4.end?(S4.t8=1200):(S4.dam=1200,S4.damOn=1);close();toast("20 seconds on the dam timer.",1400);return;}
  if(a==="c3_qdamr"){const S4=c4S();S4.dam=C4_T3;S4.t8on&&(S4.t8=C4_T8);close();toast("Dam timer reset.",1400);return;}
  if(a==="c3_qroad"){c3DevPre("rroad");c4DevGo("rroad",null);return;}
  if(a==="c3_qcb"){c3DevPre("cbridge");c4DevGo("cbridge",null);return;}
  if(a==="c3_qcol"){c3DevPre("cbridge");const S4=c4S();S4.bcol=1;c4Boxes();c4DevGo("cbridge",512,70);return;}
  if(a==="c3_qkey"){const S4=c4S(),B=S4.box;if(!B){toast("No containers yet.",1400);return;}const nx=B.chain[Math.min(4,B.step+1)];B.key=nx;inv.includes("ckey")||inv.push("ckey");got.add("ckey");updateBag();updateGuide();close();toast("Key for the "+C4_COL[B.col[nx]][0]+" container.",1800);return;}
  if(a==="c3_qshow"){const B=c4S().box;if(!B){toast("No containers yet.",1400);return;}close();toast("<b>CHAIN:</b> "+B.chain.map((p,i)=>(i===B.step?"<u>":"")+C4_COL[B.col[p]][0]+(i===B.step?"</u>":"")).join(" &rarr; ")+"<br>Crushed: "+[0,1,2,3,4,5,6].filter((p)=>B.st[p]==="crushed").map((p)=>C4_COL[B.col[p]][0]).join(", "),5200);return;}
  if(a==="c3_qpot"){["pot","bottle"].forEach((k)=>{inv.includes(k)||inv.push(k);got.add(k);});updateBag();updateGuide();close();toast("Pot + bottle added.",1400);return;}
  if(a==="c3_qwater"){const S4=c4DevRiverReady();S4.seg.forEach((s)=>{s.st=1;s.rope=1;s.logs=3;});Object.assign(S4,{bridge:1,bcol:1,t8on:1,t8:C4_T8});S4.box||c4Boxes();["pot","bottle"].forEach((k)=>{inv.includes(k)||inv.push(k);got.add(k);});updateBag();c4DevGo("river",C4_CAMP+20);return;}
  if(a==="c3_qfire"){const S4=c4S();S4.fire=3;S4.fireT=C4_COAL+1;close();updateGuide();toast("Fire lit.",1200);return;}
  if(a==="c3_qfill"){const S4=c4S();inv.includes("pot")||inv.push("pot");S4.w=Math.max(1,S4.w);close();updateBag();updateGuide();toast("Pot filled.",1200);return;}
  if(a==="c3_qboil"){const S4=c4S();if(S4.onFire){S4.boil=C4_BOIL-1;toast("Boil almost done.",1200);}else toast("Nothing boiling.",1200);close();return;}
  if(a==="c3_qfmat"){const M=c4S().mat;Object.assign(M,{bark:Math.max(M.bark,1),grass:Math.max(M.grass,1),coal:1,sand:1,gravel:1,flint:1,stick:Math.max(M.stick,3)});close();updateGuide();toast("Filter materials added.",1400);return;}
  if(a==="c3_qflow"){const S4=c4S();S4.w=2;S4.filt=1;S4.onFire=0;close();c4FlowOpen();return;}
  if(a==="c3_qdrink"){const S4=c4DevRiverReady();Object.assign(S4,{bridge:1,bcol:1,t8on:1,w:4,onFire:0,fire:3,filt:1});inv.includes("bottle")||inv.push("bottle");if(room!=="river")c4DevGo("river",C4_CAMP+6);else close();setTimeout(()=>c3CutStart("c4drink"),room==="river"?50:900);return;}}
{const _inf=c3DevInfo;c3DevInfo=function(){if(!c4Is()&&!(room==="forest"&&c3S().done))return _inf();const S4=c4S();
  let t="\nch2.4 "+room+(C3.cut?" cut:"+C3.cut.k+" "+C3.cut.t:"")+"\nthirst "+S4.met.toFixed(1)+"% "+["shade","sun","HOT"][C4.sun]+(c4MeterOn()?"":" (off)");
  if(room==="river")t+="\nseg "+c4Done()+"/"+C4_N+" tip "+c4Tip()+" carry "+S4.car.log+"L "+S4.car.stake+"S "+S4.car.rope+"R dam "+Math.ceil(S4.dam/60)+"s"+(S4.bridge?" BUILT":"")+(S4.t8on?"\nwater w"+S4.w+" fire"+S4.fire+" boil "+Math.round(S4.boil/60)+"s filt "+S4.filt+" t8 "+Math.ceil(S4.t8/60)+"s":"");
  if(room==="cbridge"&&S4.box)t+="\nbox step "+S4.box.step+" key "+S4.box.key+" chain "+S4.box.chain.join("");return t;};}
{const _bx=c3DevBoxes;c3DevBoxes=function(){if(!c4Is())return _bx();ctx.strokeStyle="#5aff7a";
  if(room==="river"){ctx.strokeRect(c4Tip(),C2_FLOOR-30,1,30);ctx.strokeStyle="#5ab8ff";ctx.strokeRect(C4_R0,C2_FLOOR,C4_R1-C4_R0,10);}
  ctx.strokeStyle="#ffd23a";(C4_SHADE[room]||[]).forEach((x)=>ctx.strokeRect(x-22,C2_FLOOR-2,44,2));};}
