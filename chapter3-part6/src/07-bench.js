/* ======================= PART 6D: THE CLEAN WORKBENCH, THE CRAFTING TREE, THE WEAPON CHOICE ======================= */
const P6_REC=[{out:"vchamber",need:["vpipe","vgauge"],why:"The pipe takes the pressure and the gauge reads it: a sealed chamber."},
  {out:"vinj",need:["vsyr","vcoil"],why:"The coil is an electromagnet that opens the valve and the needles make the fine jet."},
  {out:"vreactor",need:["vchamber","vinj"],why:"Push from the chamber, metering from the injector: together they are a regulator."},
  {out:"vcat",need:["vgland","vcell"],why:"The cell warms the gland, so its venom reacts faster. A catalyst helps a reaction without being used up."},
  {out:"vupcore",need:["vreactor","vcat"],why:"A regulated, boosted venom engine. Now it just needs a barrel, a grip and a tank."}];
const P6_WDEF={
  gusher:{n:"VENOM GUSHER",tag:"SINGLE-TARGET RIFLE",cap:6,cd:15,txt:"A heavy, super-detailed rifle. Thick venom sticks to one target and the poison <b>stacks</b> with every hit. It <b>ignores armour</b>. Made for single, high-health targets.",st:{dmg:4.5,rng:3,rate:3.5,area:0,ammo:4}},
  sweeper:{n:"EVO SWEEPER",tag:"EXPLOSIVE CROWD CONTROL",cap:5,cd:40,txt:"A bulky launcher that lobs venom bombs. They <b>explode</b> on impact and leave a <b>venom cloud</b> that keeps burning. Made to clear whole crowds.",st:{dmg:3,rng:2,rate:1.5,area:5,ammo:3}},
  hypervex:{n:"HYPERVEX",tag:"MARKSMAN SNIPER",cap:4,cd:54,txt:"A long, scoped rifle. A fast, <b>piercing</b> shot that hits harder the further it flies, and a <b>headshot</b> hits double. Made to keep your distance.",st:{dmg:5,rng:5,rate:1,area:0,ammo:2}}};
var P6B=null;
const P6IMG={};
function p6Icon(id){const it=items[id];if(!it)return null;if(/^q6/.test(it.k)){const k="c|"+it.k;return P6IMG[k]||(P6IMG[k]=c4IconCv(it.k));}
  const k="i|"+id;if(!P6IMG[k]){const im=new Image();im.src=s(it.k,it.c);P6IMG[k]=im;}return P6IMG[k];}
function p6Craftable(){return inv.filter((i)=>P6_RAW.indexOf(i)>=0||P6_CRAFT.indexOf(i)>=0||["barrel","handle","fullcan"].indexOf(i)>=0);}
/* ---------------- the bench screen ---------------- */
function p6BenchOpen(){const S=p6S();p6Css();
  const el=c5Overlay("#p6Bench",'<div class="gcard c4card"><h3>THE CLEAN WORKBENCH</h3><canvas id="p6bCv" class="p6cv" width="384" height="216" aria-label="A spotless workbench with tools and parts laid out"></canvas><div id="p6bStage"></div><div id="p6bMsg" class="p6msg" aria-live="polite"></div><div class="btns"><button class="gbtn alt" id="p6bOk">CLOSE</button></div></div>');
  modal=4;el.hidden=!1;P6B={t:0,sel:[],fx:0,steps:[],order:null,busy:0};qs("#p6bOk").onclick=()=>p6BenchClose();
  el.onclick=(ev)=>{const b=ev.target.closest&&ev.target.closest("[data-p6b]");if(b&&!b.disabled)p6BenchAct(b.dataset.p6b);};
  el.__stop=()=>{if(P6B)cancelAnimationFrame(P6B.raf);};
  const loop=()=>{if(!P6B)return;P6B.raf=requestAnimationFrame(loop);if(window.__evoPaused)return;P6B.t++;p6BenchPaint();};P6B.raf=requestAnimationFrame(loop);
  p6BenchStage(S.dis?(S.made.vupcore?"The <b>Upgrade Core</b> is ready. Choose your new weapon.":"Pick the parts that belong together and press <b>COMBINE</b>. Look at the blueprint on the wall if you're unsure what goes with what."):"The Venom Blaster is jammed with dried venom. Take it apart <b>safely</b>: press the four steps in the right order. Think about what could go wrong with a pressurised tank.");$sx("click");}
function p6BenchClose(){const el=qs("#p6Bench");if(P6B)cancelAnimationFrame(P6B.raf);P6B=null;if(!el||el.hidden)return;el.hidden=!0;modal=0;updateGuide();}
function p6BenchMsg(h){const m=qs("#p6bMsg");m&&(m.innerHTML=h);}
function p6BenchStage(msg){const S=p6S(),st=qs("#p6bStage");if(!st||!P6B)return;
  if(!S.dis){if(!P6B.order)P6B.order=[0,1,2,3].sort((a,b)=>((a*7+P6.t)%5)-((b*7+P6.t)%5)||a-b);
    const L=["VENT THE PRESSURE VALVE","UNSCREW THE BARREL","RELEASE THE GRIP CLAMP","SCRAPE OUT THE DRIED VENOM"];
    st.innerHTML='<div class="p6row">'+P6B.order.map((i)=>'<button class="gbtn alt" data-p6b="step:'+i+'"'+(P6B.steps.indexOf(i)>=0?" disabled":"")+">"+(P6B.steps.indexOf(i)>=0?"&#10004; ":"")+L[i]+"</button>").join("")+"</div>";}
  else if(S.made.vupcore&&!S.up){st.innerHTML='<div class="p6row"><button class="gbtn" data-p6b="choose">CHOOSE THE NEW WEAPON</button></div>';}
  else if(S.up){st.innerHTML='<div class="p6row">Your '+items[S.up].n+" is built. Nothing left to craft here.</div>";}
  else{const ing=p6Craftable();let h='<div class="p6grid">';ing.forEach((id,i)=>{const sel=P6B.sel.indexOf(i)>=0;h+='<div class="p6slot'+(sel?" sel":"")+'" data-p6b="sel:'+i+'" tabindex="0" role="button" aria-pressed="'+sel+'"><canvas width="24" height="24" data-ic="'+id+'"></canvas>'+items[id].n+"</div>";});
    h+="</div>";if(!ing.length)h='<div class="p6row">You have no parts yet. Search the lab.</div>';
    st.innerHTML=h+'<div class="p6row"><button class="gbtn" data-p6b="combine">COMBINE</button><button class="gbtn alt" data-p6b="clear">CLEAR</button></div>';
    st.querySelectorAll("canvas[data-ic]").forEach((cv)=>{const ic=p6Icon(cv.dataset.ic),g=cv.getContext("2d");g.imageSmoothingEnabled=!1;const draw=()=>{g.clearRect(0,0,24,24);g.drawImage(ic,0,0,24,24);};if(ic&&ic.complete===!1)ic.onload=draw;else if(ic)draw();});}
  msg!=null&&p6BenchMsg(msg);}
function p6BenchAct(a){const S=p6S();if(!P6B||P6B.busy)return;$sx("click");
  if(a.slice(0,5)==="step:"){const i=+a.slice(5),need=P6B.steps.length;
    const why=["<b>WHY:</b> a tank under pressure can burst or spray when opened. Always release the pressure first.","<b>WHY:</b> lefty-loosey: turning anticlockwise unscrews a thread. With the pressure gone the barrel comes off easily.","<b>WHY:</b> a clamp holds the grip on the tank. Release it only after the barrel is off, or the tank can swing.","<b>WHY:</b> dried venom is a sticky crust that jams moving parts. Scrape it out last, once everything is apart, with a blunt tool."];
    if(i!==need){P6B.fx=-1;$sx("locked");shake=Math.max(shake,3);const nm=["vent the pressure","unscrew the barrel","release the grip clamp","scrape out the dried venom"];
      p6BenchMsg('<b class="no">NOT YET.</b> '+(need===0?"Before touching anything, what must you do to a pressurised tank?":need===1?"The pressure is gone. What is on the front of the tank?":need===2?"The barrel is off. What still holds the handle on?":"Everything is apart. Only the crust is left.")+(P6B.steps.length>=2?' <span class="hint">HINT: next is "'+nm[need]+'".</span>':""));return;}
    P6B.steps.push(i);P6B.fx=1;$sx("clank");$sx("creak");p6BenchMsg('<b class="ok">DONE ('+P6B.steps.length+"/4).</b> "+why[i]);
    if(P6B.steps.length>=4){P6B.busy=1;setTimeout(()=>{if(!P6B)return;S.dis=1;inv=inv.filter((t)=>t!=="blaster");["barrel","handle","fullcan"].forEach((t)=>{inv.includes(t)||inv.push(t);got.add(t);});hasGun=!1;P6B.busy=0;updateBag();updateHud();c2Save("slab");updateGuide();$sx("success");
        p6BenchStage('<b class="ok">THE BLASTER IS IN PIECES.</b> You get back the <b>barrel</b>, the <b>grip</b> and the <b>canister</b>, now clean. They will be part of the new weapon. Now to find parts for an <b>Upgrade Core</b>: read the <b>blueprint</b> on the wall, then search the lab.');},900);}
    p6BenchStage(null);return;}
  if(a.slice(0,4)==="sel:"){const i=+a.slice(4),k=P6B.sel.indexOf(i);k>=0?P6B.sel.splice(k,1):P6B.sel.length<4&&P6B.sel.push(i);p6BenchStage(null);return;}
  if(a==="clear"){P6B.sel=[];p6BenchStage("Cleared.");return;}
  if(a==="choose"){p6PickOpen();return;}
  if(a==="combine"){const ing=p6Craftable(),ids=P6B.sel.map((i)=>ing[i]).filter(Boolean);
    if(ids.length<2){p6BenchMsg("Pick at least <b>two</b> parts to combine.");return;}
    const rec=P6_REC.find((r)=>r.need.length===ids.length&&r.need.every((n)=>ids.indexOf(n)>=0));
    if(!rec){$sx("locked");shake=Math.max(shake,2);P6B.fx=-1;
      const cand=P6_REC.filter((r)=>ids.every((x)=>r.need.indexOf(x)>=0)),mix=P6_REC.filter((r)=>ids.some((x)=>r.need.indexOf(x)>=0));
      let m;if(cand.length)m='<b class="no">NOT ENOUGH YET.</b> These do belong together, but the assembly needs <b>'+cand[0].need.length+"</b> parts and you picked "+ids.length+". Find the rest.";
      else if(mix.length>=2&&ids.every((x)=>P6_RAW.indexOf(x)>=0||P6_CRAFT.indexOf(x)>=0))m='<b class="no">THEY DON\'T FIT.</b> Those parts belong to <b>different assemblies</b>. Check the blueprint: which parts make a chamber, which make an injector, which make a catalyst?';
      else m='<b class="no">THAT DOESN\'T GO TOGETHER.</b> The old barrel, grip and canister are for the very end. First build the <b>Upgrade Core</b>.';
      p6BenchMsg(m);return;}
    P6B.busy=1;P6B.fx=2;$sx("clank");$sx("success");p6Tone(660,0.2,"triangle",0.08,990);
    setTimeout(()=>{if(!P6B)return;ids.forEach((t)=>{const k=inv.indexOf(t);k>=0&&inv.splice(k,1);});inv.push(rec.out);got.add(rec.out);S.made[rec.out]=1;P6B.sel=[];P6B.busy=0;updateBag();c2Save("slab");updateGuide();
      p6BenchStage('<b class="ok">BUILT: '+items[rec.out].n.toUpperCase()+".</b> "+rec.why+"<br><br><b>THE SCIENCE:</b> "+Xt[rec.out].sci);},700);}}
function p6BenchPaint(){const cv=qs("#p6bCv");if(!cv||!P6B)return;const g=cv.getContext("2d"),P=P6B,T=P.t,S=p6S();g.imageSmoothingEnabled=!1;const F=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h);};
  g.drawImage(p6BenchBg(),0,0);const lg=g.createRadialGradient(304,60,2,304,100,110);lg.addColorStop(0,"rgba(255,246,200,.3)");lg.addColorStop(1,"rgba(255,246,200,0)");g.fillStyle=lg;g.fillRect(180,40,204,120);
  /* the items on the bench */
  const ings=p6Craftable();const shown=[];
  if(!S.dis){/* the blaster itself, in the clamp */const ic=p6Icon("blaster");if(ic&&(ic.complete||ic.nodeType))try{g.drawImage(ic,126,76,132,66);}catch(e){}for(let k=0;k<4;k++){F(k<(P.steps.length||0)?"#3aff7a":"#1a3a2a",150+k*30,146,18,3);}F("#2a2e36",120,142,150,3);}
  else{ings.forEach((id,i)=>{const x=20+(i%9)*40,y=P.sel.indexOf(i)>=0?96:106+Math.sin(T/20+i)*1.4;const ic=p6Icon(id);if(ic&&(ic.nodeType||ic.complete))try{g.drawImage(ic,x,y,36,36);}catch(e){}if(P.sel.indexOf(i)>=0){g.strokeStyle="#ffe070";g.lineWidth=2;g.strokeRect(x-1,y-1,38,38);}});
    if(S.up){const ic=p6Icon(S.up);try{g.drawImage(ic,170,60,60,60);}catch(e){}}}
  /* effects */
  if(P.fx!==0){const k=P.fx;for(let q=0;q<16;q++){const a=T*0.3+q*0.4,rr=10+(T%30)*(k>0?2:0.4);F(k>0?(q%2?"#ffe070":"#ffffff"):"#ff6a5a",192+Math.cos(a+q)*rr,120+Math.sin(a*1.3+q)*rr*0.5,2,2);}if(T%40===0)P.fx=P.busy?P.fx:0;}
  g.font='7px "Press Start 2P",monospace';g.fillStyle="#1a2a30";g.fillText(S.dis?(S.up?"BUILT":"PARTS ON THE BENCH"):"VENOM BLASTER: JAMMED",130,70);}
function p6BenchBg(){return p6Sprite("benchbg",384,216,(t)=>{Me(t,P6_LABPAL[0]);
  /* a pegboard of tools, a clock, shelves with jars, a first-aid box: the clean bay */
  p6Box(t,16,22,124,76,P6C.dark,{seed:700,bev:2,nz:0.04});for(let y=28;y<94;y+=8)for(let x=22;x<136;x+=8)t.px(x,y,[2,2,4]);
  const tool=(x,y,w,h,pal,rd)=>p6Box(t,x,y,w,h,pal,{seed:x+y,round:rd||"v",bev:0,nz:0.04});tool(26,30,4,40,[[50,30,10],[150,90,40],[230,170,100]]);tool(40,30,3,34,P6C.steel);tool(54,34,5,40,[[90,20,20],[210,60,50],[250,140,120]]);tool(70,30,14,8,P6C.steel,"h");tool(70,46,14,8,P6C.steel,"h");tool(92,30,3,44,[[16,40,90],[58,130,220],[150,190,250]]);tool(104,30,18,6,P6C.brass,"h");tool(104,44,10,26,P6C.steelW);
  p6Ell(t,176,34,13,13,P6C.steelW,{seed:701});p6Ell(t,176,34,10,10,[[216,222,224],[248,250,250]],{nz:0});t.line(176,34,176,26,[20,20,24]);t.line(176,34,182,36,[190,30,24]);
  for(let q=0;q<3;q++){p6Box(t,214+q*36,50,30,5,P6C.steelW,{seed:710+q,bev:1});for(let w=0;w<3;w++){const c=[P6C.green,P6C.coral,P6C.cyan][(q+w)%3];p6Box(t,218+q*36+w*9,34,7,16,c,{seed:720+q*3+w,round:"v",bev:0,nz:0.05});t.rect(219+q*36+w*9,36,2,12,[255,255,255],0.4);}}
  p6Box(t,300,22,60,30,P6C.white,{seed:730,bev:2});t.rect(326,26,8,22,[200,40,30]);t.rect(318,34,24,6,[200,40,30]);
  /* the bench: white epoxy top, steel cabinets */
  p6Box(t,0,142,384,9,P6C.white,{seed:740,bev:1,nz:0.03});t.rect(0,143,384,1,[255,255,255],0.9);p6Box(t,0,150,384,66,P6C.steelW,{seed:741,bev:1,nz:0.08});for(let q=0;q<4;q++){p6Box(t,14+q*92,158,80,50,P6C.steel,{seed:742+q,bev:1,nz:0.06});p6Box(t,36+q*92,168,36,5,P6C.dark,{seed:750+q,bev:1});t.rect(38+q*92,169,32,1,[200,210,220],0.7);for(let w=0;w<6;w++)t.rect(24+q*92+w*10,186,4,12,P6C.dark[0]);}
  t.light&&t.light(304,50,120,"#fff6c8",0.35);p6Box(t,330,40,3,102,P6C.steel,{seed:760,round:"v"});p6Box(t,298,40,36,5,P6C.steelW,{seed:761,round:"h",bev:1});p6Box(t,296,44,14,5,[[240,230,180],[255,250,220]],{seed:762,bev:0});});}
/* ---------------- the weapon picker ---------------- */
var P6P=null;
function p6PickOpen(){const S=p6S();p6Css();
  const el=c5Overlay("#p6Pick",'<div class="gcard c4card" style="max-width:min(920px,100%);max-height:calc(100vh - 12px);overflow:auto"><h3>CHOOSE YOUR NEW WEAPON</h3><p style="font-size:8px;color:#b8c8e8;text-align:center;margin:2px 0 8px">You have the Upgrade Core, and the old barrel, grip and canister. You can only build <b>one</b>. Pick the one that suits the fights ahead.</p><div class="p6cards" id="p6pkCards"></div><div id="p6pkMsg" class="p6msg"></div><div class="btns"><button class="gbtn" id="p6pkGo" disabled>BUILD IT</button><button class="gbtn alt" id="p6pkBack">BACK</button></div></div>');
  modal=4;el.hidden=!1;P6P={sel:null,t:0};
  const bar=(l,v)=>'<div>'+l+'<div class="p6bar"><i style="width:'+Math.round(v/5*100)+'%"></i></div></div>';
  qs("#p6pkCards").innerHTML=P6_WEAP.map((k)=>{const d=P6_WDEF[k];return'<div class="p6card" data-p6k="'+k+'" tabindex="0" role="button"><h4>'+d.n+'</h4><canvas width="176" height="72" data-wp="'+k+'"></canvas><div style="color:#8aff9a;margin-bottom:4px">'+d.tag+"</div>"+d.txt+'<div style="margin-top:6px">'+bar("DAMAGE",d.st.dmg)+bar("RANGE",d.st.rng)+bar("FIRE RATE",d.st.rate)+bar("AREA",d.st.area)+bar("AMMO",d.st.ammo)+"</div></div>";}).join("");
  el.onclick=(ev)=>{const c=ev.target.closest&&ev.target.closest("[data-p6k]");if(c){p6PickSel(c.dataset.p6k);return;}};
  el.onkeydown=(ev)=>{if(ev.key==="Enter"||ev.key===" "){const c=ev.target.closest&&ev.target.closest("[data-p6k]");if(c){ev.preventDefault();p6PickSel(c.dataset.p6k);}}};
  qs("#p6pkBack").onclick=()=>p6PickClose();qs("#p6pkGo").onclick=()=>p6PickBuild();
  el.__stop=()=>{if(P6P)cancelAnimationFrame(P6P.raf);};
  const loop=()=>{if(!P6P)return;P6P.raf=requestAnimationFrame(loop);if(window.__evoPaused)return;P6P.t++;qs("#p6pkCards").querySelectorAll("canvas[data-wp]").forEach((cv)=>{const g=cv.getContext("2d");g.clearRect(0,0,176,72);const gr=g.createLinearGradient(0,0,0,72);gr.addColorStop(0,"#0a1220");gr.addColorStop(1,"#1a2640");g.fillStyle=gr;g.fillRect(0,0,176,72);for(let q=0;q<176;q+=8){g.fillStyle="rgba(80,120,200,.06)";g.fillRect(q,0,1,72);}g.fillStyle="rgba(0,0,0,.35)";g.fillRect(0,58,176,14);p6WeaponArt(g,cv.dataset.wp,88,34,1.5,P6P.t,P6P.sel===cv.dataset.wp);});};P6P.raf=requestAnimationFrame(loop);
  setTimeout(()=>{const f=qs(".p6card");f&&f.focus();},30);}
function p6PickSel(k){if(!P6P)return;P6P.sel=k;$sx("click");qs("#p6pkCards").querySelectorAll(".p6card").forEach((c)=>c.classList.toggle("sel",c.dataset.p6k===k));qs("#p6pkGo").disabled=!1;qs("#p6pkMsg").innerHTML="<b>"+P6_WDEF[k].n+":</b> "+P6_WDEF[k].txt+"<br>Press <b>BUILD IT</b> to commit. You can't change your mind later.";}
function p6PickClose(){const el=qs("#p6Pick");if(P6P)cancelAnimationFrame(P6P.raf);P6P=null;if(!el||el.hidden)return;el.hidden=!0;if(!(qs("#p6Bench")&&!qs("#p6Bench").hidden))modal=0;updateGuide();}
function p6PickBuild(){const S=p6S();if(!P6P||!P6P.sel)return;const k=P6P.sel,d=P6_WDEF[k];p6PickClose();p6BenchClose();
  ["vupcore","barrel","handle","fullcan"].forEach((t)=>{const i=inv.indexOf(t);i>=0&&inv.splice(i,1);});inv=inv.filter((t)=>t!=="blaster");inv.push(k);got.add(k);S.up=k;hasGun=!0;ammo=d.cap;P6W.k=k;P6W.ammo=d.cap;updateBag();updateHud();c2Save("slab");updateGuide();
  c3CutStart("c5p6build");}
/* ---------------- the build cutscene and the weapon's first words ---------------- */
function p6CutBuild(c){const t=c.t,S=p6S();p6LabTick();p6LabLights();c.cx=c3Clamp(150-96,0,P6_LW-192);const k=S.up,d=P6_WDEF[k];
  if(t===1){player.x=150;player.face=1;P6L.flash=0.8;}
  if(t===2){$sx("clank");tnCap("The core slots into the tank. The old barrel screws on. The grip clicks home.");}
  if(t===120)$sx("success");
  if(t===260){P6L.flash=1;$sx("stinger");p6Tone(220,1.2,"sawtooth",0.07,880);tnCap({gusher:"The Venom Gusher. Heavy, solid… and it hums like a living thing.",sweeper:"The Evo Sweeper. Bulky, loud… and it wants to blow something up.",hypervex:"The Hypervex. Long, light, and perfectly balanced."}[k]);}
  if(t===520)tnCap({gusher:"Thick venom, poison that stacks up. Perfect for one huge, tough target.",sweeper:"Venom bombs that burst and leave a cloud. Perfect for crowds.",hypervex:"A fast shot that pierces, from far away. Perfect for staying out of reach."}[k]);
  if(t>=780){tnCap("");c.cx=null;c3CutEnd();p6ItemCard(k);}}
function p6ItemCard(k){const S=p6S();setTimeout(()=>{if(!modal)ia(k);},300);updateGuide();toast("<b>"+P6_WDEF[k].n+" READY</b><br>Walk to the <b>test range</b> at the far RIGHT of the lab and try it. Shoot with <b>F / K</b>.",7000);}
{const _c=c5Cut;c5Cut=function(c){if(c.k==="c5p6build")return p6CutBuild(c);return _c(c);};}
{const _s=c5Skip;c5Skip=function(c){if(c.k==="c5p6build"){c.t=Math.max(c.t,779);return;}return _s(c);};}
/* ---------------- the TV and the tapes ---------------- */
const P6_TAPEDATA={
  vhs1:{title:"BUILDING K: EMERGENCY DRILL",max:0.62,opt:0.62,scene:"drill",lines:["BUILDING K: EMERGENCY ROUTE DRILL","In case of a containment breach, leave through the hatch under the Dome.","The route is UNLIT on purpose. Power is cut so the subjects can't follow the light.","Follow the echoes: the walls were built to ring when you shout.","Touch pads in the floor are ARMED against intruders. Probe ahead with a rod.","To open the last door, play the three notes: LOW, MIDDLE, HIGH."]},
  vhs2:{title:"SUBJECT LOG, WEEK 9",max:0.32,opt:0.35,scene:"tubes",lines:["SUBJECT LOG, WEEK 9.","Subject 03 grew a second pair of arms overnight. It can ca-","The cells are not stopping. Sample 07 does not know when to stop.","We were told to keep them alive. Nobody said why.","I think they are listening to each oth-"]},
  vhs3:{title:"THE KIDS' TAPE",max:0.72,opt:0.5,scene:"birthday",lines:["DAY 61. Mia wanted me to film her birthday.","We found a candle. We found half a cake.","She says the monsters sleep when it's cold.","Dad says we should go to the Dome. It's the only place with a wall still standing.","I hope he's right."]},
  vhs4:{title:"NEWS 7",max:0.26,opt:0.8,scene:"news",lines:["...CITY EAST SIDE IS NOW...","...THE QUARANTINE LINE HAS...","...please remain in your...","...the satellites are..."]},
  vhs5:{title:"DR. MORROW, PRIVATE",max:0.46,opt:0.28,scene:"scientist",lines:["If you're watching this, I didn't make it back.","The machine needs three things: a core, coils and a clock.","I hid the core under the Dome. The Evolved are drawn to it.","They don't want to destroy it. They want to GUARD it.","Why would they protect a time machine? Unless the Evolution knows what it is."]},
  vhs6:{title:"WEAPONS TEST: PROTOTYPE",max:0.84,opt:0.55,scene:"range",lines:["WEAPONS DIVISION. VENOM BLASTER MARK 1. TEST FOOTAGE.","The Mark 1 is only a prototype: one tank, one barrel, one grip.","With a proper core it can become three different weapons.","GUSHER: for one huge target. Thick venom, stacking poison.","SWEEPER: for crowds. Venom bombs and area damage.","HYPERVEX: for distance. A fast, piercing shot.","Pick the one that fits the threat. You cannot build all three."]}};
var P6T=null;
function p6TvOpen(){const S=p6S();p6Css();const have=P6_TAPES.filter((t)=>inv.includes(t)||(S.tapes||[]).indexOf(t)>=0);
  if(!have.length){$sx("click");toast("<b>A TV on a cart, with a tape player.</b> The slot is empty. There might be a tape somewhere around here…",4200);return;}
  const el=c5Overlay("#p6Tv",'<div class="gcard c4card"><h3 id="p6tvT">THE TV</h3><canvas id="p6tvCv" class="p6cv" width="384" height="216" aria-label="An old TV playing a worn video tape"></canvas><div id="p6tvB" class="p6row"></div><div id="p6tvMsg" class="p6msg" aria-live="polite"></div><div class="btns"><button class="gbtn alt" id="p6tvOk">CLOSE</button></div></div>');
  modal=4;el.hidden=!1;P6T={t:0,tape:null,trk:0.5,shown:0};P6L.tv=1;qs("#p6tvOk").onclick=()=>p6TvClose();
  el.onclick=(ev)=>{const b=ev.target.closest&&ev.target.closest("[data-p6t]");if(b)p6TvAct(b.dataset.p6t);};
  P6T.key=(ev)=>{if(!P6T||!P6T.tape)return;if(ev.key==="ArrowLeft"||ev.key==="a"){ev.preventDefault();p6TvAct("trk-");}else if(ev.key==="ArrowRight"||ev.key==="d"){ev.preventDefault();p6TvAct("trk+");}};addEventListener("keydown",P6T.key,!0);
  el.__stop=()=>{if(P6T)cancelAnimationFrame(P6T.raf);};
  const loop=()=>{if(!P6T)return;P6T.raf=requestAnimationFrame(loop);if(window.__evoPaused)return;P6T.t++;p6TvPaint();};P6T.raf=requestAnimationFrame(loop);p6TvList();$sx("click");}
function p6TvList(){const S=p6S(),have=P6_TAPES.filter((t)=>inv.includes(t)||(S.tapes||[]).indexOf(t)>=0);if(!P6T)return;P6T.tape=null;S.tv=S.tv||{};
  qs("#p6tvT").textContent="THE TV: CHOOSE A TAPE";qs("#p6tvB").innerHTML=have.map((t)=>'<button class="gbtn alt" data-p6t="play:'+t+'">'+(S.tv&&S.tv[t]?"&#10004; ":"")+"TAPE "+t.slice(3)+"</button>").join("");
  qs("#p6tvMsg").innerHTML="Tapes found: <b>"+have.length+"/6</b>. Old tapes lose their magnetism and stretch, so most are blurred and hard to read. Use <b>TRACKING</b> to line the player's head up with the tape's tracks and the picture will sharpen.";setTimeout(()=>{const f=qs("#p6tvB button");f&&f.focus();},20);}
function p6TvAct(a){if(!P6T)return;const S=p6S();$sx("click");
  if(a.slice(0,5)==="play:"){const id=a.slice(5),d=P6_TAPEDATA[id];P6T.tape=id;P6T.t=0;P6T.shown=0;P6T.trk=0.5+((id.charCodeAt(3)%5)-2)*0.12;qs("#p6tvT").textContent="NOW PLAYING: TAPE "+id.slice(3);
    qs("#p6tvB").innerHTML='<button class="gbtn alt" data-p6t="trk-">&#9664; TRACKING</button><button class="gbtn alt" data-p6t="trk+">TRACKING &#9654;</button><button class="gbtn alt" data-p6t="eject">EJECT</button>';
    qs("#p6tvMsg").innerHTML="Press <b>&larr; / &rarr;</b> (or the buttons) to adjust the <b>tracking</b>. Find the sharpest picture. Some tapes are too damaged to ever be clear.";p6Tone(70,0.4,"sawtooth",0.04,50);S.tv=S.tv||{};S.tv[id]=1;c2Save("slab");return;}
  if(a==="eject"){p6TvList();return;}
  if(a==="trk-"||a==="trk+"){P6T.trk=Math.max(0,Math.min(1,P6T.trk+(a==="trk+"?0.05:-0.05)));return;}}
function p6TvClose(){const el=qs("#p6Tv");if(P6T){cancelAnimationFrame(P6T.raf);removeEventListener("keydown",P6T.key,!0);}P6T=null;P6L.tv=0;if(!el||el.hidden)return;el.hidden=!0;modal=0;updateGuide();}
function p6TvClarity(){const d=P6_TAPEDATA[P6T.tape];return Math.max(0.04,d.max*(1-Math.min(1,Math.abs(P6T.trk-d.opt)*2.4)));}
function p6TvScene(g,sc,w,h,t){const F=(c,x,y,ww,hh)=>{g.fillStyle=c;g.fillRect(x,y,ww,hh);};F("#1a2430",0,0,w,h);
  if(sc==="drill"){F("#2a3a4a",0,h*0.6,w,h*0.4);for(let q=0;q<6;q++)F("#ffe070",4+q*(w/6),h*0.78,w/12,2);F("#3aff7a",w*0.7,h*0.2,w*0.2,h*0.25);F("#0a1a10",w*0.74,h*0.26,w*0.12,h*0.12);F("#e8e0d0",w*0.3,h*0.35,w*0.08,h*0.25);F("#e8c8a0",w*0.32,h*0.28,w*0.05,h*0.08);}
  else if(sc==="tubes"){for(let q=0;q<5;q++){F("#2a5a4a",6+q*(w/5),h*0.1,w/8,h*0.75);F("#4aff9a",8+q*(w/5),h*0.3+((q*7)%9),w/12,h*0.3);}F("#101820",0,h*0.85,w,h*0.15);}
  else if(sc==="birthday"){F("#4a3a2a",0,h*0.7,w,h*0.3);F("#e8d8b0",w*0.4,h*0.55,w*0.2,h*0.15);F("#ffd23a",w*0.49,h*0.4,2,h*0.15);F("#ff8a3a",w*0.48,h*0.36,4,4);F("#c8a078",w*0.2,h*0.45,w*0.1,h*0.25);F("#e8b890",w*0.22,h*0.3,w*0.06,h*0.14);F("#78a0c8",w*0.7,h*0.5,w*0.08,h*0.2);F("#e8b890",w*0.71,h*0.36,w*0.06,h*0.12);}
  else if(sc==="news"){F("#2a2a5a",0,0,w,h);F("#5a5a9a",w*0.1,h*0.7,w*0.8,h*0.12);F("#e8b890",w*0.45,h*0.25,w*0.1,h*0.18);F("#3a3a4a",w*0.4,h*0.43,w*0.2,h*0.27);F("#c83a3a",0,h*0.86,w,h*0.14);F("#fff",w*0.05,h*0.9,w*0.5,2);}
  else if(sc==="scientist"){F("#10181c",0,0,w,h);F("#3a4a5a",w*0.1,h*0.5,w*0.8,h*0.5);F("#e8d8c8",w*0.42,h*0.22,w*0.12,h*0.2);F("#e8e8f0",w*0.36,h*0.42,w*0.24,h*0.5);F("#8a8a90",w*0.4,h*0.2,w*0.16,h*0.06);F("#3aff7a",w*0.75,h*0.3,w*0.15,h*0.2);}
  else{F("#3a4a3a",0,h*0.55,w,h*0.45);for(let q=0;q<4;q++){F("#c83a3a",w*0.55+q*w*0.1,h*0.3+((q*5)%7),w*0.06,h*0.25);}F("#8aff6a",w*0.1,h*0.3,w*0.14,h*0.08);F("#2a2e36",w*0.08,h*0.34,w*0.2,h*0.06);F("#e8d8a8",w*0.3,h*0.4,w*0.06,h*0.2);}}
function p6TvPaint(){const cv=qs("#p6tvCv");if(!cv||!P6T)return;const g=cv.getContext("2d"),P=P6T;g.imageSmoothingEnabled=!1;g.fillStyle="#04080a";g.fillRect(0,0,384,216);
  if(!P.tape){g.fillStyle="#0c1214";g.fillRect(20,12,344,192);for(let k=0;k<400;k++){g.fillStyle="rgba(200,220,220,"+Math.random()*0.18+")";g.fillRect(20+Math.random()*344,12+Math.random()*192,2,1);}g.font='9px "Press Start 2P",monospace';g.fillStyle="#7a9a9a";g.fillText("CHOOSE A TAPE",116,112);return;}
  const d=P6_TAPEDATA[P.tape],cl=p6TvClarity();
  /* the picture: drawn tiny and scaled up, so low clarity looks blurry */
  const sw=Math.max(10,Math.round(10+cl*70)),sh=Math.round(sw*0.55),sm=p6TvSm||(p6TvSm=document.createElement("canvas"));sm.width=sw;sm.height=sh;p6TvScene(sm.getContext("2d"),d.scene,sw,sh,P.t);
  g.save();g.beginPath();g.rect(20,12,344,192);g.clip();g.imageSmoothingEnabled=cl<0.6;g.globalAlpha=0.35+0.65*cl;g.drawImage(sm,20,12,344,192);g.globalAlpha=1;
  /* static, scan lines, a rolling tracking bar */
  const noise=Math.round(300*(1-cl)+40);for(let k=0;k<noise;k++){g.fillStyle="rgba(230,240,240,"+(0.1+Math.random()*0.5)+")";g.fillRect(20+Math.random()*344,12+Math.random()*192,2+Math.random()*10*(1-cl),1);}
  const by=12+((P.t*1.6*(1-cl*0.7))%192);g.fillStyle="rgba(240,250,250,"+(0.12+0.2*(1-cl))+")";g.fillRect(20,by,344,6+10*(1-cl));
  for(let y=12;y<204;y+=3){g.fillStyle="rgba(0,0,0,.28)";g.fillRect(20,y,344,1);}g.restore();
  /* the text lines, typed out, with letters lost to the damage */
  g.font='7px "Press Start 2P",monospace';P.shown+=0.6;let left=Math.floor(P.shown),y0=150;g.fillStyle="rgba(0,0,0,.55)";g.fillRect(20,y0-12,344,56);
  const lines=d.lines;const idx=Math.min(lines.length-1,Math.floor(P.t/320));let shown=0;
  for(let li=Math.max(0,idx-2);li<=idx;li++){const L=lines[li];let out="";for(let ci=0;ci<L.length;ci++){const ch=L[ci];if(ch===" "){out+=" ";continue;}const rr=r(ci+li*31,P.tape.charCodeAt(3)*7),vis=rr<cl*1.25+(li===0?0.25:0);out+=vis?ch:(rr<cl*1.25+0.35?"?":"#");}
    const age=idx-li;g.fillStyle="rgba(210,240,230,"+(age===0?0.95:age===1?0.6:0.35)+")";const cut=li===idx?Math.min(out.length,Math.floor((P.t%320)/4)):out.length;g.fillText(out.slice(0,cut).slice(0,46),28,y0+(li-(idx-2))*14);}
  /* the on-screen display */
  g.font='7px "Press Start 2P",monospace';g.fillStyle="#3aff7a";g.fillText("PLAY ▶",28,28);g.fillStyle="#e8f0f0";g.fillText("TRK",300,28);for(let q=0;q<8;q++){g.fillStyle=q/8<cl/0.9?"#3aff7a":"#1a3a2a";g.fillRect(326+q*4,20,3,8);}
  g.strokeStyle="#2a3a3a";g.lineWidth=6;g.strokeRect(17,9,350,198);}
var p6TvSm=null;
GM.c3.p6=()=>p6S();
