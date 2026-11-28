/* ======================= PART 6D: THE CONTAINMENT CHAMBER (the lab) =======================
   A long laboratory: a clean workbench by the door, a hall of containment tubes (the Evolved, each with different body parts),
   supply shelves, a media room with a TV and tape player, and a test range. Search the room for the parts of an Upgrade
   Core, find the VHS tapes, and build the new weapon at the workbench. */
const P6_LB=240,P6_LD=26;
/* every searchable spot: [id, x, label, item, task frames, colour, [text when found], key needed] */
const P6_LSPOT=[
  ["syr",405,"SEARCH THE MEDICAL CART","vsyr",26,"#c8e8f0","<b>THE MEDICAL CART.</b> Sealed gloves, bandages, a bag of saline… and a rack of hollow needles. Just what a fine jet needs."],
  ["amp",445,"SEARCH THE BROKEN TUBE","vamp",28,"#9ae8ff","<b>THE BROKEN TUBE.</b> Whatever lived in here is long gone. Among the shards, one thick vial survived."],
  ["tape5",325,"LOOK BEHIND THE TUBE","vhs5",26,"#7a828a","<b>BEHIND THE TUBE.</b> A cable duct, and wedged in it, a tape with a cracked case."],
  ["tape2",565,"SEARCH THE SAMPLE DRAWERS","vhs2",24,"#5a626a","<b>SAMPLE DRAWERS.</b> Rows of labelled slides, all dust. At the back, a dusty tape."],
  ["gland",615,"BREAK THE TUBE","vgland",44,"#8aff6a","","crow"],
  ["pipe",690,"SEARCH THE STEEL SHELF","vpipe",24,"#9aa4ae","<b>THE STEEL SHELF.</b> Offcuts of steel bar and a few lengths of seamless pipe. One is perfect."],
  ["coil",760,"SEARCH THE TOOL CABINET","vcoil",24,"#c87a3a","<b>THE TOOL CABINET.</b> Screwdrivers, a hacksaw, a reel of enamelled copper wire wound on a spool. A coil, almost."],
  ["seal",825,"OPEN THE DRAWERS","vseal",22,"#2a2a30","<b>THE DRAWERS.</b> Washers, screws, and a tin of rubber rings. One would do."],
  ["gauge",885,"CHECK THE PIPE PANEL","vgauge",26,"#d8d0b0","<b>THE PIPE PANEL.</b> A wall of pipes with a row of dials. One dial hangs loose on its pipe: you can unscrew it."],
  ["tape3",945,"OPEN THE LOCKER","vhs3",26,"#6a747c","<b>THE LOCKER.</b> A jacket, a thermos, a photo of two kids. And a tape."],
  ["desk",1010,"SEARCH THE DESK","vkey",26,"#5aa8ff","<b>THE DESK.</b> A cold cup of coffee, a lamp, a pile of reports. Under the keyboard, a blue card: POWER STORE."],
  ["tape4",1150,"SEARCH THE TAPE SHELF","vhs4",24,"#6a747c","<b>THE TAPE SHELF.</b> Rows of cases, mostly empty. One still has its tape."],
  ["power",1205,"POWER LOCKER","vcell",24,"#ffd23a","<b>THE POWER LOCKER.</b> The card reader beeps green. Inside: a rack of charged cells.","vkey"],
  ["tape6",1278,"SEARCH THE RANGE LOCKER","vhs6",24,"#9ab0c8","<b>THE RANGE LOCKER.</b> Ear defenders, safety glasses, and a taped-shut cassette marked: WEAPONS TEST."]];
P6_LSPOT.forEach((q)=>rooms.slab.ints.push({id:"c5_"+q[0],x:q[1],r:0,label:q[2]}));
rooms.slab.ints.push({id:"c5_lbench",x:150,r:0,label:"CLEAN WORKBENCH"},{id:"c5_lbp",x:222,r:0,label:"READ THE BLUEPRINT"},{id:"c5_ltv",x:1085,r:0,label:"THE TV"},{id:"c5_ldoor",x:22,r:0,label:"BACK INTO THE DARK"});
const P6_TUBES=(()=>{const L=[];let k=0;for(let x=282;x<1280;x+=43){const i=L.length;const kind=[0,1,2,3,4,5,6,7][(i*3+1)%8];L.push({x,kind,st:"live"});}return L;})();
P6_TUBES.forEach((t,i)=>{if(Math.abs(t.x-445)<22)t.st="broken";else if(Math.abs(t.x-617)<22){t.st="dead";t.big=1;}else if(i%7===5)t.st="empty";});
var P6L={t:0,aw:{},bub:[],steam:[],spark:[],tv:0,scare:0};
/* ---------------- creatures in the tubes: the Evolved, each with different body parts ---------------- */
/* ---------------- props ---------------- */
function p6LabFront(){const T=P6L.t;for(let q=0;q<10;q++){const x=camX+((q*47+T*0.3)%200),y=(q*17+T*0.2)%100;ctx.globalAlpha=0.22;fill("#d8e8ea",x,y,0.6,0.6);ctx.globalAlpha=1;}
  /* a glass thump: the whole tube flashes */
  if(P6L.scare>0){ctx.fillStyle="rgba(200,255,240,"+0.05*P6L.scare/12+")";ctx.fillRect(camX,0,192,108);}}
function p6LabLights(){const T=P6L.t,g=C2_FLOOR,L=[];
  for(const tb of P6_TUBES){if(tb.x<camX-60||tb.x>camX+250||tb.st==="broken"||tb.st==="empty")continue;L.push({x:tb.x,y:56,r:34,i:tb.st==="dead"?0.32:0.45,c:tb.kind%3===0?"60,220,140":tb.kind%3===1?"80,170,255":"230,200,80"});}
  for(let x=60;x<P6_LW;x+=120){const fl=((T+x)%230<4)?0.35:1;if(x>camX-70&&x<camX+260)L.push({x,y:12,r:70,i:(x<260?0.9:0.55)*fl,c:x<260?"235,250,255":"200,235,220",cone:1});}
  L.push({x:150,y:g-26,r:60,i:0.8,c:"255,255,255"});L.push({x:1085,y:g-22,r:44,i:P6L.tv?0.7:0.15,c:"200,235,235"});L.push({x:1010,y:g-26,r:30,i:0.4,c:"90,255,150"});L.push({x:18,y:g-20,r:26,i:0.25,c:"80,100,200"});
  L.push({x:player.x,y:g-20,r:26,i:0.2,c:"230,240,255"});C10A.lights=L;}
function p6LabTint(){ctx.save();ctx.setTransform(ctx.canvas.width/192,0,0,ctx.canvas.height/108,0,0);ctx.drawImage(c10LM(C10A.lights||[],0.34,"4,10,14"),0,0,192,108);
  for(const L of C10A.lights||[]){const x=L.x-camX;if(x<-L.r||x>192+L.r)continue;glow(x,L.y,L.r*(L.cone?0.3:0.5),L.c,0.1*L.i);}
  const vg=C3.cache.p6lv||(C3.cache.p6lv=(()=>{const q=ctx.createRadialGradient(96,54,36,96,54,118);q.addColorStop(0,"rgba(0,0,0,0)");q.addColorStop(1,"rgba(2,8,10,.5)");return q;})());ctx.fillStyle=vg;ctx.fillRect(0,0,192,108);
  if(P6L.flash>0){ctx.fillStyle="rgba(240,255,250,"+P6L.flash+")";ctx.fillRect(0,0,192,108);}
  if(C3.dark>0){ctx.fillStyle="rgba(0,0,4,"+C3.dark+")";ctx.fillRect(0,0,192,108);}ctx.restore();}
/* ---------------- per-frame ---------------- */
function p6LabTick(){P6L.t++;P6.t++;C7.t++;P6L.flash>0&&(P6L.flash=Math.max(0,P6L.flash-0.025));P6L.scare>0&&P6L.scare--;
  if(P6L.t%11===0&&P6L.steam.length<20)P6L.steam.push({x:camX+Math.random()*200,y:C2_FLOOR-Math.random()*8,a:1});P6L.steam=P6L.steam.filter((s)=>{s.y-=0.25;s.a-=0.012;return s.a>0;});
  for(const k in P6L.aw)if(P6L.aw[k]>0)P6L.aw[k]--;
  /* a specimen wakes and thumps the glass when you walk close */
  P6_TUBES.forEach((tb,i)=>{if(tb.st!=="live")return;const d=Math.abs(player.x-tb.x);if(d<14&&!(P6L.aw[i]>0)&&!tb.cool){tb.cool=1;P6L.aw[i]=70;P6L.scare=12;$sx("doorhit");shake=Math.max(shake,2);tb.cd=500;}if(tb.cd>0&&--tb.cd===0)tb.cool=0;});}
function p6LabStep(){const S=p6S();if(dead)return;p6LabTick();if(C3.cut)return;if(modal)return;if(c3TaskStep())return;
  p6LabLights();p6WeaponLab&&p6WeaponLab();
  c5Pick((it)=>{const k=it.id.slice(3);
    if(k==="lrack")return{r:18,label:"REFILL VENOM"};if(k==="lbench")return{r:34,label:"CLEAN WORKBENCH"};if(k==="lbp")return{r:18,label:"READ THE BLUEPRINT"};if(k==="ltv")return{r:20,label:"THE TV"};if(k==="ldoor")return{r:16,label:"BACK INTO THE DARK"};
    const sp=P6_LSPOT.find((q)=>q[0]===k);if(sp){if(S.found[k])return null;return{r:sp[0]==="power"||sp[0]==="desk"?22:18,label:sp[2]};}return null;});}
function p6LabGot(sp){const S=p6S();S.found[sp[0]]=1;const id=sp[3];S.tapes=S.tapes||[];if(P6_TAPES.indexOf(id)>=0)S.tapes.push(id);
  inv.push(id);got.add(id);$sx("pickup");updateBag();c2Save("slab");updateGuide();sp[6]&&toast(sp[6],6200);setTimeout(()=>{if(!modal)ia(id);},900);}
function p6LabUse(e){const k=e.id.slice(3),S=p6S();if(C3.cut||C3.task)return!0;
  if(k==="lbench"){p6BenchOpen();return!0;}
  if(k==="lbp"){p6BlueprintShow();return!0;}
  if(k==="ltv"){p6TvOpen();return!0;}
  if(k==="ldoor"){$sx("click");toast("Back into the pitch black? No. Everything you need is in here.",2400);return!0;}
  const sp=P6_LSPOT.find((q)=>q[0]===k);if(!sp)return!0;
  if(S.found[k]){toast("Already searched. Nothing else useful.",1600);return!0;}
  if(k==="gland"){if(!inv.includes("pcrow")){$sx("locked");toast("The tube is thick, tough glass. You'd need something to smash it with.",2800);return!0;}
    c3Task("chop",615,sp[4],()=>{shake=Math.max(shake,10);$sx("crash");$sx("debris");P6L.scare=14;P6L.flash=0.25;const tb=P6_TUBES.find((t)=>t.st==="dead");tb&&(tb.st="broken");p6LabGot(["gland",615,"","vgland",0,"","<b>SPECIMEN 04.</b> The glass bursts. The thing inside was dead long before you came. But the gland on its back is still glowing, and still warm."]);},"#8aff6a");return!0;}
  if(k==="power"&&!inv.includes("vkey")){$sx("locked");toast("<b>ACCESS DENIED.</b> The card reader blinks red: <i>POWER STORE: SWIPE A KEYCARD</i>.",3400);return!0;}
  c3Task("gather",sp[1],sp[4],()=>p6LabGot(sp),sp[5]);return!0;}
function p6LabCounts(){const S=p6S(),have=(i)=>inv.includes(i)||S.made[i]||p6Used(i);return{raw:P6_RAW.filter(have).length,tapes:P6_TAPES.filter((t)=>inv.includes(t)||(S.tapes||[]).indexOf(t)>=0).length};}
/* an item counts as "had" once it has been built into something */
function p6Used(i){const M=p6S().made;return({vpipe:M.vchamber,vgauge:M.vchamber,vseal:M.vchamber,vsyr:M.vinj,vcoil:M.vinj,vamp:M.vinj,vgland:M.vcat,vcell:M.vcat})[i];}
function p6LabGuide(){const S=p6S(),M=S.made,tk=(b)=>b?"&#10004; ":"&#9744; ",c=p6LabCounts();
  if(S.up)return p6Q("<b>"+items[S.up].n+" built.</b><br>"+(S.test?"Calibration done.":"Test it on the range at the far RIGHT of the lab."));
  if(M.vupcore)return p6Q("<b>The Upgrade Core is ready.</b><br>Take it to the <b>clean workbench</b> and choose your new weapon.");
  if(!S.dis)return p6Q("<b>The Containment Chamber.</b><br>"+tk(0)+"Take the <b>Venom Blaster</b> apart on the <b>clean workbench</b> (far LEFT)<br>&#9679; Look around: find <b>parts</b>, and <b>VHS tapes</b>");
  return p6Q("<b>Build an Upgrade Core.</b><br>"+tk(M.vchamber)+"Pressure Chamber (3 parts)<br>"+tk(M.vinj)+"Injector Core (3 parts)<br>"+tk(M.vreactor)+"Venom Reactor (chamber + injector)<br>"+tk(M.vcat)+"Catalyst Cell (2 parts)<br>"+tk(0)+"Upgrade Core (reactor + catalyst)<br>&#9679; Parts found: "+c.raw+"/8 &middot; Tapes: "+c.tapes+"/6<br>Search the lab. Combine parts at the bench.");}
function p6LabArrow(){const S=p6S();if(C3.cut||C3.task||modal)return;if(!S.dis||S.up&&S.test||S.made.vupcore&&!S.up){return p6Arrow(150);}
  let best=null,bd=1e9;for(const sp of P6_LSPOT){if(S.found[sp[0]])continue;if(sp[3].slice(0,3)==="vhs")continue;const d=Math.abs(sp[1]-player.x);if(d<bd){bd=d;best=sp[1];}}
  if(!best){const tb=p6LabCounts();return p6Arrow(S.up?1330:150);}p6Arrow(best);}
/* ---------------- the blueprint ---------------- */
function p6Info(title,html,btn){p6Css();const el=c5Overlay("#p6Tool",'<div class="gcard c4card"><h3>'+title+'</h3><div class="p6msg" style="font-size:8px;line-height:1.9">'+html+'</div><div class="btns"><button class="gbtn" id="p6toolOk">'+(btn||"CLOSE")+"</button></div></div>");modal=4;el.hidden=!1;qs("#p6toolOk").onclick=()=>{el.hidden=!0;modal=0;updateGuide();};setTimeout(()=>{const b=qs("#p6toolOk");b&&b.focus();},30);$sx("card");}
function p6BlueprintShow(){p6Info("THE UPGRADE BLUEPRINT","A blueprint pinned over the bench, drawn in blue ink:<br><br><b>UPGRADE CORE</b> = <b>VENOM REACTOR</b> + <b>CATALYST CELL</b><br><br>&bull; <b>VENOM REACTOR</b> = <b>PRESSURE CHAMBER</b> + <b>INJECTOR CORE</b><br>&bull; <b>PRESSURE CHAMBER</b> = pipe + gauge + gasket<br>&bull; <b>INJECTOR CORE</b> = needles + coil + glass vial<br>&bull; <b>CATALYST CELL</b> = a living gland + a power cell<br><br>Then fit the core to the <b>old barrel, grip and canister</b> and pick a weapon. Scribbled at the bottom: <i>\"parts are all over the Containment Chamber. Don't forget the powered locker needs a card.\"</i>");}
/* ---------------- first visit ---------------- */
function p6CutLab(c){const t=c.t,S=p6S();p6LabTick();p6LabLights();c.cx=null;
  if(t===1){player.x=60;player.y=C2_FLOOR;player.face=1;P6L.flash=1;}
  if(t===2){$sx("door");tnCap("Light! After so much darkness it hurts my eyes…");}
  if(t===200){$sx("stinger");tnCap("The Containment Chamber. Rows and rows of glass tubes, and something is floating in every one of them.");}
  if(t===440)tnCap("Those are Evolved. Different ones: extra arms, extra eyes, wings. Somebody was BUILDING them.");
  if(t===680)tnCap("And by the door, a clean workbench. Spotless. My blaster is still jammed, but with the right tools…");
  if(t===880)tnCap("Time to take it apart, and build something better. I'll need parts. This place looks like it has everything.");
  if(t>=1100){tnCap("");c.cx=null;S.lab=1;c3CutEnd();c2Save("slab");updateGuide();toast("<b>THE CONTAINMENT CHAMBER</b><br>Use the <b>clean workbench</b> on the LEFT to take the blaster apart. Then search the lab for parts.",6200);}}
{const _c=c5Cut;c5Cut=function(c){if(c.k==="c5p6lab")return p6CutLab(c);return _c(c);};}
{const _s=c5Skip;c5Skip=function(c){if(c.k==="c5p6lab"){c.t=Math.max(c.t,1099);return;}return _s(c);};}
/* ---------------- plumbing ---------------- */
{const _s=c7Step;c7Step=function(){if(room==="slab"){C5.t++;p6LabStep();return;}return _s();};}
{const _u=c7Use;c7Use=function(e){if(room==="slab")return p6LabUse(e);return _u(e);};}
{const _e=c7Enter;c7Enter=function(t){if(t!=="slab")return _e(t);const S=p6S();C3.lie=0;C7G=null;C5GN=null;C5PR=null;C5TR=null;C5CK=null;P6.hide=0;S.from="";P6L.flash=0;
  player.y=C2_FLOOR;player.face=1;player.x=S.lab?(S.up&&S.test?1300:70):60;camX=c3Clamp(player.x-96,0,P6_LW-192);
  if(!S.lab){c2Save("slab");c3CutStart("c5p6lab");}updateGuide();};}
{const _b=c7Back;c7Back=function(){if(room==="slab")return p6LabBack();return _b();};}
{const _f=c7Front;c7Front=function(){if(room==="slab")return p6LabFront();return _f();};}
{const _t=c7Tint;c7Tint=function(){if(room==="slab")return p6LabTint();return _t();};}
{const _w=c7Walls;c7Walls=function(){if(room==="slab"){if(player.x<14)player.x=14;if(player.x>P6_LW-10)player.x=P6_LW-10;return!0;}return _w();};}
{const _g=c7Guide;c7Guide=function(){if(room==="slab")return p6LabGuide();return _g();};}
{const _a=c7Arrow;c7Arrow=function(){if(room==="slab")return p6LabArrow();return _a();};}
{const _x=c5Esc;c5Esc=function(){for(const [id,fn] of [["#p6Bench",()=>p6BenchClose()],["#p6Tv",()=>p6TvClose()],["#p6Pick",()=>p6PickClose()],["#p6Tool",()=>{const e=qs("#p6Tool");e.hidden=!0;modal=0;updateGuide();}]]){const e=qs(id);if(e&&!e.hidden){fn();return!0;}}return _x();};}
{const _x=c5CloseAll;c5CloseAll=function(){for(const id of ["#p6Bench","#p6Tv","#p6Pick","#p6Tool","#p6End"]){const e=qs(id);if(e&&!e.hidden){e.hidden=!0;e.__stop&&e.__stop();}}return _x();};}
