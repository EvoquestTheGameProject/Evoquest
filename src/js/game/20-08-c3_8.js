
/* ======================= DEVELOPER TOOLS: Chapter 2, part 3 ======================= */
var C3_DEVBTN=[
  ["RADIO WIRING",[["c3_wire","OPEN WIRING PUZZLE"],["c3_wsolve","SOLVE THIS ROUND"],["c3_wnext","SOLVE + NEXT ROUND"],["c3_wr5","JUMP TO ROUND 4 (CP)"],["c3_wheat","RESET HEAT"],["c3_wfinish","FINISH WIRING (5/5)"],["c3_radio","PLAY RADIO CUTSCENE"]]],
  ["ROAD + CHASE",[["c3_cp","ROAD CHECKPOINT"],["c3_half","TRIGGER HALFWAY CUTSCENE"],["c3_chase","START FIRE CHASE"],["c3_back","PUSH FIRE BACK"],["c3_near","FIRE: RIGHT BEHIND ME"],["c3_end","JUMP TO ROAD END"],["c3_sig","PLAY 'SIGNAL LOST'"],["c3_clear","FINISH ROAD (TO FOREST)"]]],
  ["FOREST",[["c3_mats","GIVE 6 MATERIALS"],["c3_axe","GIVE AXE"],["c3_kit","GIVE SLEEPING SPACE"],["c3_bed","PLACE BED HERE"],["c3_sleep","SLEEP NOW"],["c3_tired","TIRED: "+"TOGGLE"],["c3_fin","REPLAY FOREST INTRO"]]],
  ["DREAM (10 SCENES)",[1,2,3,4,5,6,7,8,9,10].map((n)=>["c3_d"+n,"SCENE "+n]).concat([["c3_dend","SHOW END CARD"],["c3_reset","RESET PART 3 PROGRESS"]])]];
var C3_DEVTIRED=1;
function c3DevHTML(btn){return C3_DEVBTN.map((g)=>'<h4>CH2 PART 3: '+g[0]+'</h4><div class="dvg">'+g[1].map((q)=>btn(q[0]==="c3_tired"&&!C3_DEVTIRED,'data-a="'+q[0]+'"',q[0]==="c3_tired"?"TIRED EFFECT: "+(C3_DEVTIRED?"ON":"OFF"):q[1])).join("")+"</div>").join("");}
/* state set-up used by both the teleports and the buttons */
function c3DevPre(a){const S=c3S();
  if(a==="wroad"){inv.includes("radio")||inv.push("radio");got.add("radio");inv.includes("batts")||inv.push("batts");got.add("batts");TS.bz.lost=1;TS.bz.call=1;TS.bz.s=[1,1,1,1];S.wired=1;S.hints=10;S.half=0;S.cp1=0;S.roadDone=0;S.road=0;updateBag();}
  if(a==="forest"){S.wired=1;S.hints=10;S.road=1;S.half=1;S.roadDone=1;S.fin=0;S.bed=0;S.slept=0;S.done=0;inv=inv.filter((t)=>!C3_MATS.concat(["frame","bedding","pillow","bedkit"]).includes(t));updateBag();}}
function c3DevGo(room,at){/* jump to a spot in one of the new rooms, setting any state it needs */
  const S=c3S();c3DevPre(room);modal=0;Oo=0;Do.hidden=!0;qs("#gd").hidden=!0;dead=!1;hp=Math.max(hp,5);c3CloseAll();
  C3.once={};enterRoom(room,"R");if(at!=null){player.x=at;player.y=C2_FLOOR;camX=c3Clamp(at-96,0,rooms[room].W-192);}}
function c3Dev(a){if(a==="c3_reset"){TS.c3=c3Fresh();c3CloseAll();toast("Part 3 progress reset.",1800);return;}
  if(a==="c3_tired"){C3_DEVTIRED^=1;_o();return;}
  const S=c3S(),close=()=>{modal=0;Oo=0;Do.hidden=!0;};
  if(a==="c3_wire"||a==="c3_wr5"){close();["radio","batts"].forEach((k)=>{inv.includes(k)||inv.push(k);got.add(k);});updateBag();
    if(!C3W){S.wired=0;S.cp=a==="c3_wr5"?3:0;c3WireOpen(()=>toast("<b>DEV:</b> wiring finished.",1800));}else if(a==="c3_wr5"){C3W.round=3;C3W.cp=3;C3W.wires=[];C3W.strikes=0;C3W.phase="wire";c3WRound("");}return;}
  if(a==="c3_wsolve"||a==="c3_wnext"){if(!C3W||(C3W.phase!=="wire"&&C3W.phase!=="ok")){toast("Open the wiring puzzle first.",1800);return;}close();modal=4;
    if(C3W.phase==="wire"){C3W.wires=c3Answer(C3W.round);c3WButton();}
    if(a==="c3_wnext"){const W=C3W;setTimeout(()=>{if(C3W===W&&W.phase==="ok"){W.pt=999;W.typed=999;c3WButton();}},900);}return;}
  if(a==="c3_wheat"){if(C3W){C3W.strikes=0;c3WHeat();toast("Heat reset.",1200);}else toast("Wiring isn't open.",1400);return;}
  if(a==="c3_wfinish"){close();if(C3W)c3WFinish();else{S.wired=1;S.hints=10;c2Save("beyond");toast("Wiring marked finished.",1600);}return;}
  if(a==="c3_radio"){close();modal=0;bzRadio(()=>toast("<b>DEV:</b> radio cutscene done.",1400));return;}
  if(a==="c3_cp"){c3DevGo("wroad",C3_CP-10);S.cp1=1;return;}
  if(a==="c3_half"){c3DevGo("wroad",C3_CUT+30);c3CutStart("half");return;}
  if(a==="c3_chase"){c3DevPre("wroad");S.half=1;c3DevGo("wroad",C3_CUT-6);return;}
  if(a==="c3_back"){if(C3.ch){C3.ch.fire+=260;toast("Fire pushed back.",1200);}else toast("No chase running.",1400);return;}
  if(a==="c3_near"){if(C3.ch){C3.ch.fire=player.x+30;toast("Fire is right behind you!",1400);}else toast("No chase running.",1400);return;}
  if(a==="c3_end"){if(!C3.ch){c3DevPre("wroad");S.half=1;c3DevGo("wroad",C3_END+60);}else{close();player.x=C3_END+60;player.y=C2_FLOOR;C3.ch.fire=player.x+120;}return;}
  if(a==="c3_sig"){close();S.wired=1;c3LostRadio(()=>toast("<b>DEV:</b> signal-lost scene done.",1400));return;}
  if(a==="c3_clear"){close();c3DevPre("wroad");S.half=1;S.roadDone=1;C3.ch=null;c3DevGo("forest",null);return;}
  if(a==="c3_mats"){["axe","wood","bough","leaves","moss","rope"].forEach((k)=>{inv.includes(k)||inv.push(k);got.add(k);});updateBag();updateGuide();toast("6 materials added.",1400);return;}
  if(a==="c3_axe"){inv.includes("axe")||inv.push("axe");got.add("axe");updateBag();toast("Axe added.",1200);return;}
  if(a==="c3_kit"){["bedkit"].forEach((k)=>{inv.includes(k)||inv.push(k);got.add(k);});inv=inv.filter((k)=>!["wood","rope","bough","leaves","moss"].includes(k));updateBag();updateGuide();toast("Sleeping space added. Press USE on dry ground.",2200);return;}
  if(a==="c3_bed"){if(room!=="forest"){toast("Only in the forest.",1400);return;}close();S.fin=1;S.bed=Math.round(player.x)-12;inv=inv.filter((k)=>k!=="bedkit");got.add("bedkit");updateBag();updateGuide();c2Save("forest");toast("Bed placed. Press USE at it to sleep.",2200);return;}
  if(a==="c3_sleep"){if(room!=="forest"){c3DevGo("forest",null);}close();S.fin=1;if(!S.bed)S.bed=Math.round(player.x)-12;got.add("bedkit");c3CutStart("sleep");return;}
  if(a==="c3_fin"){close();c3DevGo("forest",C3_FW-14);S.fin=0;c3CutStart("fin");return;}
  if(/^c3_d\d+$/.test(a)){const n=+a.slice(4);close();const go=()=>{c3Dream(()=>{toast("<b>DEV:</b> dream finished.",1400);});if(C3D){C3D.f=C3_SC[n-1]+(n>1?2:0);const P=c3DPlayer(C3D.f);C3D.cam=n===1?300:c3Clamp(P.x-170,0,C3_BW-384);}};
    if(room!=="forest"){c3DevGo("forest",null);S.fin=1;setTimeout(go,900);}else go();return;}
  if(a==="c3_dend"){close();c3CloseAll();won=2;qs("#c2w").hidden=!1;fadeNow=1;fadeTo=1;return;}}
/* extra lines in the INFO HUD and extra boxes in HITBOXES */
function c3DevInfo(){if(!c3Mine())return"";const S=c3S();let t="\nch2.3 "+(room==="wroad"?"road":"forest")+(C3.cut?" cut:"+C3.cut.k+" "+C3.cut.t:"");
  if(C3.ch)t+="\nfire "+Math.round(C3.ch.fire-player.x)+" behind  wolves "+C3.ch.wolves.map((w)=>w.st[0]).join("")+" crows "+C3.ch.crows.length;
  if(room==="wroad")t+="\nhalf "+S.half+" cp "+S.cp1+" done "+S.roadDone+(C3.slowT>0?" SLOW":"")+(C3.stun>0?" STUN":"");
  else t+="\nfin "+S.fin+" bed "+S.bed+" slept "+S.slept+(c3Tired()?" tired":"");return t;}
function c3DevBoxes(){if(!c3Mine())return;ctx.strokeStyle="#ff5a5a";
  for(const h of C3.holes){const w=c3HoleW(h);ctx.strokeRect(h.x-w/2+2.5,C2_FLOOR-2,w-5,4);}
  for(const w of C3.worms){if(w.st>=2)ctx.strokeRect(w.x-7.5,C2_FLOOR-w.h,15,w.h);else ctx.strokeRect(w.x-76,C2_FLOOR-3,152,3);}
  ctx.strokeStyle="#ffd23a";for(const v of C3.fv)ctx.strokeRect(v.x-v.w/2,C2_FLOOR-4,v.w,4);
  if(C3.ch){ctx.strokeStyle="#ff9a2a";ctx.strokeRect(C3.ch.fire-6,C2_FLOOR-50,6,50);C3.ch.wolves.forEach((w)=>{ctx.strokeRect(w.x-8,C2_FLOOR-14,16,14);});C3.ch.crows.forEach((q)=>{ctx.strokeRect(q.x-9,q.y-9,18,18);});}
  ctx.strokeStyle="#5aff7a";for(const p of C3_POOLS)ctx.strokeRect(p.x-p.w/2,C2_FLOOR,p.w,4);}
