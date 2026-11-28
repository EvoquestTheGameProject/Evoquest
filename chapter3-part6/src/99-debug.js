/* ---------------- developer tools + test hooks ---------------- */
{const _p=c3DevPre;c3DevPre=function(a){if(!p6Is(a)&&a!=="p6")return _p(a);_p("tlab");const I=c7S();Object.assign(I,{lab:1,doc:1,tm:1,sci:1,think:1,hyp:1,back:1,city:1,ce1:1,ce2:1,cend:1,done:1});const P=p6S();P.on=1;inv.includes("pcrow")||inv.push("pcrow");got.add("pcrow");if(!hasGun&&!P.dis){hasGun=!0;ammo=0;}if(!P.dis)inv.includes("blaster")||inv.push("blaster");};}
C3_DEVBTN.push(["CHAPTER 3: THE EVOLVED TRAIL",[["c3_wfol","STREETS: START THE CHASE"],["c3_wfol2","STREETS: NEAR THE DOME"],["c3_wdome","DOME: ARRIVAL SCENE"],["c3_wdome2","DOME: AFTER THE SCENE"],["c3_wdark","DARK ROUTE: START"],["c3_wdark2","DARK ROUTE: THE TONE DOOR"],["c3_wlab","LAB: FIRST VISIT SCENE"],["c3_wlab2","LAB: AT THE WORKBENCH"],["c3_wparts","LAB: GIVE ALL RAW PARTS (BLASTER APART)"],["c3_wcore","LAB: GIVE THE UPGRADE CORE"],["c3_wtapes","LAB: GIVE ALL TAPES"],["c3_wgusher","RANGE: GUSHER"],["c3_wsweeper","RANGE: SWEEPER"],["c3_whyper","RANGE: HYPERVEX"],["c3_wendcard","SHOW THE END CARD"],["c3_wreset","RESET THIS PART"]]]);
{const _d=c3Dev;c3Dev=function(a){if(a.slice(0,4)!=="c3_w")return _d(a);const P=p6S();modal=0;Oo=0;Do.hidden=!0;
  if(a==="c3_wfol"){P.fol=0;P.seen=0;P.wp=0;P.gx=0;P.cpx=0;c7DevGo("fol",P6_FW-60);return;}
  if(a==="c3_wdome"){P.fol=3;P.dscene=0;P.dome=0;P.bartried=0;P.sign=0;P.hatch=0;c7DevGo("dome",P6_DW-70);return;}
  if(a==="c3_wdome2"){P.fol=3;P.dscene=1;P.dome=1;P.hatch=0;c7DevGo("dome",P6_HATCH-20);return;}
  if(a==="c3_wdark"){P.fol=3;P.dscene=1;P.dome=1;P.hatch=1;P.route=0;P.kcp=0;P.kex=0;P.screamed=0;P.kt1=0;P.pads={};P.locker=0;c7DevGo("dark",56);return;}
  if(a==="c3_wdark2"){P.fol=3;P.dscene=1;P.dome=1;P.hatch=1;P.route=1;P.screamed=1;P.kcp=1130;P.pads={};c7DevGo("dark",1130);return;}
  const pre=()=>{P.fol=3;P.dscene=1;P.dome=1;P.hatch=1;P.route=1;P.screamed=1;P.kcp=1130;P.kex=1;P.on=1;};
  if(a==="c3_wlab"){pre();P.lab=0;c7DevGo("slab",60);return;}
  if(a==="c3_wlab2"){pre();P.lab=1;c7DevGo("slab",110);return;}
  if(a==="c3_wparts"){pre();P.lab=1;P.dis=1;inv=inv.filter((t)=>t!=="blaster");hasGun=!1;["barrel","handle","fullcan"].concat(P6_RAW,["vkey"]).forEach((t)=>{inv.includes(t)||inv.push(t);got.add(t);});P.made={};P.up=null;c7DevGo("slab",150);updateBag();return;}
  if(a==="c3_wcore"){pre();P.lab=1;P.dis=1;P.up=null;inv=inv.filter((t)=>t!=="blaster"&&P6_RAW.indexOf(t)<0&&P6_CRAFT.indexOf(t)<0);hasGun=!1;["barrel","handle","fullcan","vupcore"].forEach((t)=>{inv.includes(t)||inv.push(t);got.add(t);});P.made={vchamber:1,vinj:1,vreactor:1,vcat:1,vupcore:1};c7DevGo("slab",150);updateBag();return;}
  if(a==="c3_wtapes"){P6_TAPES.forEach((t)=>{inv.includes(t)||inv.push(t);got.add(t);(P.tapes=P.tapes||[]).indexOf(t)<0&&P.tapes.push(t);});updateBag();toast("All tapes given.",1200);return;}
  if(a==="c3_wgusher"||a==="c3_wsweeper"||a==="c3_whyper"){const k=a==="c3_wgusher"?"gusher":a==="c3_wsweeper"?"sweeper":"hypervex";pre();P.lab=1;P.dis=1;P.up=k;P.test=0;P.made={vchamber:1,vinj:1,vreactor:1,vcat:1,vupcore:1};inv=inv.filter((t)=>t!=="blaster"&&P6_RAW.indexOf(t)<0&&P6_CRAFT.indexOf(t)<0&&P6_WEAP.indexOf(t)<0);inv.push(k);got.add(k);hasGun=!0;ammo=P6_WDEF[k].cap;P6W.tg=[];P6W.kills=0;P6W.pods=0;P6W.far=0;c7DevGo("slab",P6_RX+8);updateBag();updateHud();return;}
  if(a==="c3_wendcard"){p6EndCard();return;}
  if(a==="c3_wreset"){Object.assign(P,p6Fresh(),{on:1});toast("Part 6 progress reset.",1600);return;}
  if(a==="c3_wfol2"){P.seen=1;P.wp=4;P.gx=480;P.cpx=700;c7DevGo("fol",700);return;}};}
/* test hooks: only when asked for (add #p6test to the address, or set window.__evoP6Test before the game loads) */
if(window.__evoP6Test||/p6test/.test(location.hash))window.__evoP6={bench:()=>P6B,P6W:()=>P6W,tgs:()=>P6W.tg,S:()=>p6S(),c7:()=>c7S(),P6:()=>P6,room:()=>room,player:()=>player,dev:(a)=>c3Dev(a),step:(n)=>{for(let i=0;i<n;i++)update();},C3:()=>C3,keys:()=>keys,eval:(s)=>eval(s)};
