
/* ======================= CHAPTER 2, PART 5: THE BRIDGE PORT (the last ship, the wired gate, the crowbar) ======================= */
var C4_PW=900,C4_GATE=150,C4_MOTOR=192,C4_PSCREW=238,C4_PNAIL=316,C4_PTIME=7200,C4_PX=[275,355,435,515,595,675,755];
var C4_METAL={strip:{id:"pstrip",n:"LONG STEEL STRIP",role:"handle"},hook:{id:"phook",n:"CURVED STEEL ROD",role:"claw"},plate:{id:"pplate",n:"FLAT STEEL PLATE",role:"tip"}};
C4.ship={x:320};C4.yank=null;C4.gate=null;C4.gopen=0;C4.bp=null;C4P=null;
var C4P=null,C4TR=null;
function c4PtFresh(){return{init:0,arr:0,t:C4_PTIME,tr:[0,0,0],tried:0,loose:[],chk:[0,0,0,0,0,0,0],yk:[0,0,0,0,0,0,0],cols:[],metal:{strip:0,hook:0,plate:0},screw:0,nail:0,crow:0,hits:0,open:0,done:0};}
function c4P(){const S4=c4S();if(!S4.pt)S4.pt=c4PtFresh();return S4.pt;}
function c4PortRooms(){if(C2.port)return;
  C2.port={name:"THE BRIDGE PORT",L:null,R:"cbridge",W:C4_PW,cars:[],seeds:[87,88],c3:1,c4:1};
  rooms.port={name:"THE BRIDGE PORT",L:null,R:"cbridge",W:C4_PW,crates:[],items:[],ints:[],plats:[]};C2_F.port={trees:[],vines:[],branches:[],gantries:[],smoke:[]};
  De.port={c:"112,120,116",l:"240,226,190",a:0.14,dk:0.3};
  const I=rooms.port.ints;I.push({id:"c4_pgate",x:C4_GATE+14,r:0,label:"GATE"},{id:"c4_pbench",x:C4_MOTOR,r:0,label:"WORKBENCH"},{id:"c4_pscrew",x:C4_PSCREW,r:0,label:"SCREW"},{id:"c4_pnail",x:C4_PNAIL,r:0,label:"NAIL"});
  C4_PX.forEach((x,i)=>I.push({id:"c4_pbox:"+i,x,r:0,label:"CHECK"}));}
c4PortRooms();
/* three of the seven containers have rusted-through, loose metal: which three is random every run */
function c4PtInit(){const P=c4P();if(P.init)return;P.init=1;P.cols=c4Shuffle([0,1,2,3,4,5,6]);const idx=c4Shuffle([0,1,2,3,4,5,6]).slice(0,3),kinds=c4Shuffle(["strip","hook","plate"]);P.loose=idx.map((i,k)=>({i,k:kinds[k]}));}
function c4PMetal(){const m=c4P().metal;return m.strip+m.hook+m.plate;}
function c4PGive(id,msg){inv.includes(id)||inv.push(id);got.add(id);$sx("pickup");updateBag();updateGuide();c2Save("port");addFx({k:"ring",x:player.x,y:player.y-14,r0:2,r1:14,c:"#ffe070",life:14});msg&&toast(msg,3800);}
var C4_SOLID=["Solid. The corrugated steel is welded tight all the way round.","Nothing loose here: this wall is still thick, sound steel.","Tapped it all over: no flaking, no give. Not this one.","The panels are bolted solid. Rust has only dulled the paint.","It rings like a bell: sound metal all the way through.","Rock solid. This container's skin is in good shape.","Nothing moves. Spot rust, but the steel underneath is still strong."];
var C4_LOOSE={strip:["LONG STEEL STRIP","A rusted-through corner strip, long and straight. It would make a fine HANDLE."],hook:["CURVED STEEL ROD","A bent door-latch rod with a natural curve. It could make a CLAW."],plate:["FLAT STEEL PLATE","A flat, thin patch plate. A good thin wedge for a PRY TIP."]};

/* ---------------- per-frame ---------------- */
function c4PortStep(){const S4=c4S(),P=c4P();
  if(!P.init)c4PtInit();
  if(C4.yank){c4YankStep();if(C4.yank&&(keys.l||keys.r))C4.yank=null;}
  if(C4.gate){c4GateStep();if(C4.gate&&(keys.l||keys.r))C4.gate=null;}
  c4Pick((it)=>{const id=it.id,k=id.slice(3).split(":")[0],i=+(id.split(":")[1]||0);
    if(k==="pgate")return{x:C4_GATE+14,r:16,label:C4.gate?"PRY!":P.open?null:P.crow?"USE CROWBAR":P.tried?"GATE (WIRED)":"TRY THE GATE"};
    if(k==="pbench")return{r:17,label:"WORKBENCH"};
    if(k==="pscrew")return!P.screw?{r:10,label:"SCREW"}:null;
    if(k==="pnail")return!P.nail?{r:10,label:"NAIL"}:null;
    if(k==="pbox")return{r:19,label:C4.yank&&C4.yank.i===i?"YANK!":P.yk[i]?"TAKEN":P.chk[i]?"SOLID":"CHECK"};
    return null;});}
function c4PortUse(k,i){const P=c4P();
  if(k==="pgate"){if(C4.gate)return c4GateHit();if(P.open)return;if(P.crow)return c4GateStart();return c4TryOpen();}
  if(k==="pbench")return c4ShopOpen();
  if(k==="pscrew")return c3Task("gather",C4_PSCREW,22,()=>{P.screw=1;c4PGive("pscrew","<b>A BIG SCREW.</b><br>A screw's thread is a ramp wrapped round a post: every turn pulls the pieces together with huge force.");},"#c8c8c8");
  if(k==="pnail")return c3Task("gather",C4_PNAIL,22,()=>{P.nail=1;c4PGive("pnail","<b>AN IRON NAIL.</b><br>A nail has no thread: the material squeezes its sides, and friction holds it in place.");},"#8a8a8a");
  if(k==="pbox"){if(C4.yank&&C4.yank.i===i)return c4YankHit();
    if(P.yk[i])return toast("You already pulled the loose metal off this one.",1800);
    if(P.chk[i]&&!P.loose.some((q)=>q.i===i))return toast(C4_SOLID[i%C4_SOLID.length],2200);
    c3Task("gather",C4_PX[i],26,()=>c4BoxCheck(i),"#9a9a92");}}
function c4BoxCheck(i){const P=c4P(),q=P.loose.find((x)=>x.i===i);P.chk[i]=1;
  if(!q){$sx("clank");toast(C4_SOLID[i%C4_SOLID.length],2400);return;}
  $sx("creak");shake=Math.max(shake,3);C4.yank={i,v:0.14,t:0,kind:q.k};
  toast("<b>LOOSE METAL!</b><br>Rust has eaten the weld. <b>Tap USE fast</b> to yank it out before your grip slips.",3600);}
function c4YankHit(){const y=C4.yank;if(!y)return;y.v=Math.min(1,y.v+0.15);y.t=0;y.jit=6;$sx("clank");shake=Math.max(shake,2);player.punch=10;
  sparks(C4_PX[y.i]+Math.random()*10-4,C2_FLOOR-13,5,["#c8742a","#8a8a84","#e8c898"],1.2,0.1,12);
  if(y.v>=0.999)c4YankDone();}
function c4YankStep(){const y=C4.yank;y.t++;y.jit>0&&y.jit--;y.v=Math.max(0,y.v-0.0042);player.punch>0&&player.punch--;}
function c4YankDone(){const y=C4.yank;if(!y)return;const P=c4P(),m=C4_METAL[y.kind],L=C4_LOOSE[y.kind];P.yk[y.i]=1;P.metal[y.kind]=1;C4.yank=null;player.punch=0;$sx("crash");shake=Math.max(shake,6);
  sparks(C4_PX[y.i]+4,C2_FLOOR-13,18,["#c8742a","#8a8a84","#ffe070"],1.8,0.12,22);
  c4PGive(m.id,"<b>"+L[0]+" ("+c4PMetal()+"/3)</b><br>"+L[1]);}
/* ---------------- the wired gate: line the moving square up with the green ---------------- */
function c4GateStart(){C4.gate={hits:c4P().hits,cd:0,ph:0,x:0.5,zone:0.3+0.4*Math.random(),w:0.2,t:0,miss:0};$sx("click");
  c3Tip("gate1","<b>PRY IT!</b><br>Slip the crowbar in and lean on it. Press <b>USE</b> the moment the moving square is over the <b>green</b>. 3 good pulls free the wire. Walk away to stop.",5200);}
function c4GateStep(){const g=C4.gate;g.t++;g.cd>0&&g.cd--;player.punch>0&&player.punch--;g.ph+=0.05+0.014*g.hits;g.x=0.5+0.5*Math.sin(g.ph);g.w=[0.22,0.16,0.11][Math.min(2,g.hits)];}
function c4GateHit(){const g=C4.gate,P=c4P();if(!g||g.cd)return;
  if(Math.abs(g.x-g.zone)<g.w/2){g.hits++;P.hits=g.hits;g.cd=26;player.punch=14;$sx("clank");$sx("snap");shake=Math.max(shake,7);sparks(C4_GATE+10,C2_FLOOR-22,16,["#c8c8c0","#ffe070","#8a8a84"],2,0.12,20);
    if(g.hits>=3){C4.gate=null;P.open=1;c4S().t8on=0;c3CutStart("c4board");return;}
    g.zone=0.2+0.6*Math.random();toast("<b>SNAP! "+g.hits+"/3</b><br>One tangle of wire down.",1400);}
  else{g.cd=38;g.miss++;$sx("stuck");shake=Math.max(shake,4);player.punch=8;toast(g.miss===1?"<b>SLIPPED!</b><br>The bar skidded off the wire. Wait for the square to cross the green, then press USE.":"<b>Slipped again.</b> Watch the square, not the bar.",1900);}}
function c4ShipLeaves(){if(Eo.god){c4P().t=1800;toast("<b>DEV GOD MODE:</b> the ship would have left. +30 s.",2200);return;}c3CutStart("c4left");}

/* ---------------- "try the gate": nothing in your pockets works ---------------- */
var C4_TRY=[{id:"carkey",n:"CAR KEY",msg:"<b>CAR KEY:</b> it slides in a little way and stops. A car ignition key is cut for a completely different lock, and the padlock is buried under coils of barbed wire anyway."},
  {id:"ckey",n:"CONTAINER KEY",msg:"<b>CONTAINER KEY:</b> the little brass key won't even reach the lock through the wire. Even if it did, a container padlock and a gate padlock have different pin patterns."},
  {id:"blaster",n:"VENOM BLASTER",msg:"<b>VENOM BLASTER:</b> click… click. It's jammed solid: dried venom has gummed up the chamber. And even working, it fires venom, not something that can cut steel wire."}];
function c4TryOpen(){const P=c4P();let el=qs("#c4Try");
  if(!el){el=document.createElement("div");el.id="c4Try";el.className="gov";el.hidden=!0;
    el.innerHTML='<div class="gcard c4card"><h3>THE WIRED GATE</h3><canvas id="c4tCv" width="384" height="150" aria-label="A steel gate wrapped in tangled barbed wire and chains"></canvas><div class="c4lay" id="c4tB"></div><div id="c4tMsg" aria-live="polite"></div><div class="btns"><button class="gbtn" id="c4tOk">CLOSE</button></div></div>';
    qs("#gm").appendChild(el);qs("#c4tOk").onclick=c4TryClose;
    el.addEventListener("click",(ev)=>{const b=ev.target.closest&&ev.target.closest("[data-c4t]");b&&!b.disabled&&c4TryPick(+b.dataset.c4t);});}
  c4Css();modal=4;el.hidden=!1;C4TR={};
  qs("#c4tB").innerHTML=C4_TRY.map((q,i)=>'<button class="gbtn alt" data-c4t="'+i+'"><img src="'+(items[q.id]?c3Ico(q.id):c4Icon("q4ckey"))+'" alt="">TRY THE '+q.n+(P.tr[i]?" &#10006;":"")+"</button>").join("");
  const n=P.tr.filter(Boolean).length;qs("#c4tMsg").innerHTML=P.tried?"Nothing you have can open it. You need a <b>crowbar</b> to pry the wire off.":"The gate is wrapped in wire. What could open it? Try what you have.";
  qs("#c4tOk").className="gbtn"+(P.tried?"":" alt");c4TryPaint();setTimeout(()=>{const f=qs("#c4tB button:not([disabled])")||qs("#c4tOk");f&&f.focus();},30);void n;}
function c4TryPick(i){const P=c4P();$sx("locked");if(!P.tr[i]){P.tr[i]=1;const b=qs('[data-c4t="'+i+'"]');b&&(b.innerHTML+=" &#10006;");}
  let m=C4_TRY[i].msg;
  if(P.tr.every(Boolean)){P.tried=1;qs("#c4tOk").className="gbtn";m+='<br><br><b class="ok">NOTHING WORKS.</b> The wire has to be PRIED and unwound. <b>You need a crowbar.</b> Check the containers for loose metal and use the rusty motor as a workbench. <b>The ship leaves soon!</b>';c2Save("port");updateGuide();qs("#c4tOk").focus();}
  else{const nb=qs("#c4tB button:not([disabled])");nb&&nb.focus();}
  qs("#c4tMsg").innerHTML=m;}
function c4TryClose(){const el=qs("#c4Try");if(!el||el.hidden)return;el.hidden=!0;modal=0;C4TR=null;updateGuide();}
function c4TryPaint(){const cv=qs("#c4tCv");if(!cv)return;const g=cv.getContext("2d");g.imageSmoothingEnabled=!1;const F=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(x|0,y|0,w,h);};
  const bg=g.createLinearGradient(0,0,0,150);bg.addColorStop(0,"#3a3c3e");bg.addColorStop(1,"#1a1c1e");g.fillStyle=bg;g.fillRect(0,0,384,150);
  for(let y=0;y<150;y+=6)for(let x=(y/6%2)*6;x<384;x+=12){F("rgba(150,156,160,.5)",x,y,1,6);F("rgba(20,22,24,.6)",x+1,y,1,6);}/* chain-link mesh */
  for(let y=0;y<150;y+=6)F("rgba(0,0,0,.18)",0,y,384,1);
  F("#5a5c5e",24,0,10,150);F("#7a7c7e",24,0,2,150);F("#5a5c5e",350,0,10,150);F("#7a7c7e",350,0,2,150);
  /* the wire: coils and crossing strands */
  g.lineCap="round";for(let k=0;k<26;k++){const y=14+r(k,1701)*120,x=40+r(k,1702)*270,L=60+r(k,1703)*140;g.strokeStyle=k%3?"#2a2a2a":"#8a8a8a";g.lineWidth=k%3?1.4:1;g.beginPath();g.moveTo(x,y);
    for(let s=1;s<=8;s++)g.lineTo(x+s*L/8,y+Math.sin(s*1.9+k)*(6+r(k,1704)*8));g.stroke();}
  for(let k=0;k<5;k++){const y=24+k*26,cx=70+(k*53)%220;g.strokeStyle="#3a3a3a";g.lineWidth=2.2;g.beginPath();for(let s=0;s<14;s++){const a=s*0.9;g.ellipse(cx+s*10,y,9,7,0,a,a+4.5);}g.stroke();
    for(let s=0;s<9;s++){const bx=cx+s*14,by=y+((s%2)?-6:6);F("#d8d8d0",bx,by,1.5,1.5);F("#d8d8d0",bx+1.5,by+1.5,1,1);}}
  /* chain and padlock in the middle */
  for(let k=0;k<9;k++){F("#8a8a84",150+k*9,72+Math.sin(k*0.8)*3,8,5);F("#c8c8c0",150+k*9,72+Math.sin(k*0.8)*3,8,1);F("#2a2a28",152+k*9,74+Math.sin(k*0.8)*3,4,1.5);}
  F("#1a1a18",204,66,28,30);F("#c8a030",205,67,26,28);F("#e8c850",205,67,26,3);F("#8a6a18",205,92,26,3);g.strokeStyle="#9a9a94";g.lineWidth=4;g.beginPath();g.arc(218,66,9,Math.PI,0);g.stroke();
  F("#1a1208",216,76,4,8);F("#1a1208",214,84,8,2);
  /* rust streaks */
  for(let k=0;k<30;k++)F("rgba(150,70,26,.4)",30+r(k,1705)*320,r(k,1706)*60,1,10+r(k,1707)*50);}

/* ---------------- the rusty motor workbench ---------------- */
function c4ShopCss(){c4Css();if(qs("#c4ShopCss"))return;const st=document.createElement("style");st.id="c4ShopCss";
  st.textContent="#c4pCv{width:100%;max-height:calc(100vh - 300px);object-fit:contain;image-rendering:pixelated;background:#14100c;border:2px solid #4a3a24;display:block;margin:6px auto}#c4pMsg{min-height:34px;text-align:left;font-size:8px;line-height:1.8;padding:6px 8px;background:#05070ce6;border:2px solid #2a3a5a;margin:4px 0}#c4pMsg .ok{color:#8aff9a}#c4pMsg .no{color:#ffb08a}@media (max-height:500px){#c4pCv{max-height:34vh}}";
  document.head.appendChild(st);}
var C4_ROLE={handle:["THE HANDLE","long and straight, to push on"],claw:["THE CLAW","curved, to hook behind the wire"],tip:["THE PRY TIP","thin and flat, to slip into a gap"]};
var C4_WRONG={"strip>claw":"A straight strip can't hook onto anything. The claw end needs a CURVE.","strip>tip":"The strip is long and thick: it won't slide into a hairline gap. Save it for something that needs length.","hook>handle":"A short curved rod is awkward to push on. The handle should be LONG and straight so you can lean your whole weight on it.","hook>tip":"A curve would stop it sliding into a thin gap. The tip needs to be flat.","plate>handle":"A flat plate is short and wide: it would bend under your weight. The handle must be a long bar.","plate>claw":"A flat plate has no curve to hook with. Use it where flat is good."};
function c4ShopOpen(){const P=c4P();let el=qs("#c4Shop");
  if(!el){el=document.createElement("div");el.id="c4Shop";el.className="gov";el.hidden=!0;
    el.innerHTML='<div class="gcard c4card"><h3>THE RUSTY MOTOR WORKBENCH</h3><canvas id="c4pCv" width="384" height="216" aria-label="A rusty motor with a wooden board on top, used as a workbench to build a crowbar"></canvas><div class="c4lay" id="c4pB"></div><div id="c4pMsg" aria-live="polite"></div><div class="btns"><button class="gbtn alt" id="c4pOk">LATER</button></div></div>';
    qs("#gm").appendChild(el);qs("#c4pOk").onclick=c4ShopClose;
    el.addEventListener("click",(ev)=>{const b=ev.target.closest&&ev.target.closest("[data-c4p]");b&&!b.disabled&&c4ShopAct(b.dataset.c4p);});}
  c4ShopCss();modal=4;el.hidden=!1;$sx("click");
  if(P.crow){C4P={step:9,sel:null,slot:{},screw:1,nail:1,ang:40,taper:3};qs("#c4pMsg").innerHTML="You already made a <b>Rusty Crowbar</b>. Now use it on the gate!";}
  else{C4P={step:0,sel:null,slot:{handle:0,claw:0,tip:0},screw:0,nail:0,ang:0,taper:0};
    const need=[];c4PMetal()<3&&need.push("<b>"+(3-c4PMetal())+" more loose metal piece"+(3-c4PMetal()===1?"":"s")+"</b> (from the containers)");!P.screw&&need.push("<b>a screw</b>");!P.nail&&need.push("<b>a nail</b>");
    C4P.step=need.length?-1:0;
    qs("#c4pMsg").innerHTML=need.length?"This is a motor so rusty it's seized solid, but its flat top makes a decent bench. You still need: "+need.join(", ")+".":"Build the crowbar in three stages: <b>1. place</b> the pieces, <b>2. fasten</b> them, <b>3. shape</b> it.";}
  c4ShopDraw(null);setTimeout(()=>{const f=qs("#c4pB button:not([disabled])")||qs("#c4pOk");f&&f.focus();},30);}
function c4ShopClose(){const el=qs("#c4Shop");if(!el||el.hidden)return;el.hidden=!0;modal=0;C4P=null;updateGuide();}
function c4ShopDraw(msg){const S=C4P,P=c4P();if(!S)return;let h="";
  const btn=(a,l,ic,dis)=>'<button class="gbtn alt" data-c4p="'+a+'"'+(dis?" disabled":"")+">"+(ic?'<img src="'+ic+'" alt="">':"")+l+"</button>";
  if(S.step===0){if(!S.sel){Object.keys(C4_METAL).forEach((k)=>{const placed=Object.values(S.slot).includes(k);placed||(h+=btn("pick:"+k,C4_METAL[k].n,c4Icon("q4"+C4_METAL[k].id)));});}
    else{Object.keys(C4_ROLE).forEach((r2)=>{S.slot[r2]||(h+=btn("role:"+r2,"AS "+C4_ROLE[r2][0],null));});h+=btn("back","BACK",null);}}
  else if(S.step===1){!S.screw&&(h+=btn("screw","DRIVE THE SCREW (joins handle + claw)",c4Icon("q4pscrew")));!S.nail&&(h+=btn("nail","HAMMER IN THE NAIL (pins the tip)",c4Icon("q4pnail")));}
  else if(S.step===2){h+=btn("ang-","HOOK &minus;")+btn("ang+","HOOK +")+btn("tap-","TAPER &minus;")+btn("tap+","TAPER +")+btn("test","TEST FIT");}
  else if(S.step===3)h+=btn("take","TAKE THE CROWBAR");
  qs("#c4pB").innerHTML=h;if(msg!=null)qs("#c4pMsg").innerHTML=msg;c4ShopPaint();
  const nb=qs("#c4pB button:not([disabled])");nb&&setTimeout(()=>nb.focus(),10);}
function c4ShopAct(a){const S=C4P,P=c4P();if(!S)return;$sx("click");
  if(a.slice(0,5)==="pick:"){S.sel=a.slice(5);return c4ShopDraw("Where does the <b>"+C4_METAL[S.sel].n.toLowerCase()+"</b> go? Think about what each end of a crowbar needs to do.");}
  if(a==="back"){S.sel=null;return c4ShopDraw("");}
  if(a.slice(0,5)==="role:"){const role=a.slice(5),k=S.sel,right=C4_METAL[k].role===role;
    if(!right){$sx("locked");S.sel=null;return c4ShopDraw('<b class="no">Not quite.</b> '+C4_WRONG[k+">"+role]);}
    S.slot[role]=k;S.sel=null;$sx("pickup");const done=Object.values(S.slot).every(Boolean);
    if(done){S.step=1;return c4ShopDraw('<b class="ok">PLACED.</b> A crowbar is a <b>lever</b>: a long handle to push on, a curved claw to hook with, a thin tip to slip in.<br>Now <b>fasten</b> the pieces together.');}
    return c4ShopDraw('<b class="ok">'+C4_ROLE[role][0]+":</b> "+C4_ROLE[role][1]+". Good.");}
  if(a==="screw"){S.screw=1;$sx("scratch");const d=S.nail;if(d)S.step=2;return c4ShopDraw('<b class="ok">SCREWED TIGHT.</b> A screw is a ramp (an inclined plane) wrapped around a post: each turn pulls the claw hard onto the handle.'+(d?"<br>Now <b>shape</b> it.":""));}
  if(a==="nail"){S.nail=1;$sx("clank");const d=S.screw;if(d)S.step=2;return c4ShopDraw('<b class="ok">NAILED.</b> The metal squeezes the nail from both sides: that friction holds the tip on.'+(d?"<br>Now <b>shape</b> it.":""));}
  if(a==="ang-"||a==="ang+"){S.ang=c3Clamp(S.ang+(a==="ang+"?10:-10),0,90);return c4ShopDraw("Hook angle: <b>"+S.ang+"&deg;</b>. The dotted outline shows a good crowbar.");}
  if(a==="tap-"||a==="tap+"){S.taper=c3Clamp(S.taper+(a==="tap+"?1:-1),0,5);return c4ShopDraw("Taper: <b>"+S.taper+"</b>. The dotted outline shows how thin the tip should be.");}
  if(a==="test"){const angOk=S.ang>=30&&S.ang<=50,tapOk=S.taper>=2&&S.taper<=4;
    if(angOk&&tapOk){S.step=3;$sx("success");
      return c4ShopDraw('<b class="ok">A PERFECT CROWBAR!</b> It is a <b>lever</b>: the long handle is the <i>effort arm</i> and the short claw is the <i>load arm</i>, pivoting on the thin tip. If the handle is 20 times longer than the claw, a 20 N push becomes a 400 N pull. The trade-off: the handle moves a long way for the claw to move a little.');}
    $sx("locked");let m="";if(!angOk)m+=S.ang<30?"The claw is too straight: it can't hook behind the wire. ":"The claw is bent too far: it closes up and can't reach in. ";
    if(!tapOk)m+=S.taper<2?"The tip is too blunt to slide into a gap.":"The tip is so thin it would bend or snap under load.";return c4ShopDraw('<b class="no">Test fit failed.</b> '+m);}
  if(a==="take"){const m=P.metal;inv=inv.filter((k)=>!["pstrip","phook","pplate","pscrew","pnail"].includes(k));P.crow=1;m.strip=m.hook=m.plate=0;P.screw=P.nail=0;
    c4PGive("pcrow","<b>RUSTY CROWBAR!</b><br>Now back to the gate. Line up the square with the green to pry the wire off!");c4ShopClose();}}
function c4ShopPaint(){const cv=qs("#c4pCv");if(!cv||!C4P)return;const S=C4P,g=cv.getContext("2d");g.imageSmoothingEnabled=!1;const F=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h);};
  const bg=g.createLinearGradient(0,0,0,216);bg.addColorStop(0,"#241c14");bg.addColorStop(1,"#0e0a08");g.fillStyle=bg;g.fillRect(0,0,384,216);
  /* the seized motor behind: drum body, cooling fins, end bell, shaft, junction box, rust */
  F("#2a1e16",226,22,150,96);F("#7a4a2a",236,36,120,62);F("#9a5e34",236,36,120,5);F("#5a3418",236,92,120,6);
  for(let x=242;x<352;x+=8){F("#5a3418",x,41,2,51);F("#a8683a",x+2,41,1,51);}
  F("#6a3e20",224,44,14,46);F("#6a3e20",354,44,14,46);F("#3a3a3e",368,62,14,10);F("#8a8a90",368,62,14,2);F("#7a4a2a",270,24,30,14);F("#c8c8c0",276,28,3,3);
  for(let k=0;k<34;k++)F(r(k,1711)<0.5?"#c86a2a":"#4a2a14",238+r(k,1712)*116,38+r(k,1713)*58,2+r(k,1714)*5,1+r(k,1715)*2);
  F("#2a2a2c",236,100,120,8);F("#3a3a3e",236,100,120,2);F("#2a2a2c",246,108,10,18);F("#2a2a2c",340,108,10,18);
  /* the wooden bench board on top, with vise and tools */
  F("#4a3220",0,146,384,70);F("#6a4a2e",0,146,384,6);F("#3a2418",0,152,384,2);for(let k=0;k<110;k++)F("rgba(30,18,10,.5)",r(k,1716)*384,154+r(k,1717)*60,8+r(k,1718)*30,1);
  F("#1a1a1c",338,126,34,22);F("#5a5c5e",340,128,30,5);F("#8a8c8e",340,128,30,1);F("#3a3a3c",368,130,8,18);
  F("#5a3a22",12,160,3,40);F("#8a8c8e",6,158,16,6);F("#3a3a3c",6,158,16,2);/* hammer */
  F("#c8342a",300,196,40,7);F("#8a8c8e",340,198,16,3);/* pliers */
  /* unplaced raw metal on the left */
  Object.keys(C4_METAL).forEach((k,i)=>{const placed=Object.values(S.slot||{}).includes(k)||S.step>=1&&S.step<9||S.step===9;if(placed||S.step===-1&&!c4P().metal[k])return;
    const x=10,y=14+i*46,sel=S.sel===k;sel&&(g.strokeStyle="#ffe070",g.lineWidth=2,g.strokeRect(x-3,y-3,56,50));g.drawImage(c4IconCv("q4"+C4_METAL[k].id),x,y,48,48);});
  if(S.step===-1){g.font='7px "Press Start 2P",monospace';g.fillStyle="#c8a070";g.fillText("COLLECT MORE FIRST",100,180);return;}
  const cy=170,hx0=96,hx1=296,sc=S.step>=9?{handle:1,claw:1,tip:1}:S.slot||{},fastened=S.step>=2||S.step===9,hand=!!sc.handle,claw=!!sc.claw,tip=!!sc.tip;
  const ang=S.step===9?40:S.ang,tap=S.step===9?3:S.taper;
  const steel=(x,y,w,h)=>{F("#4a5560",x,y,w,h);F("#8a98a6",x,y,w,2);F("#2e363e",x,y+h-2,w,2);for(let k=0;k<Math.floor(w/9);k++)F(k%2?"#8a4a22":"#6a3a1a",x+3+k*9,y+2+(k*3)%(h-4),3+k%3,2);};
  if(hand)steel(hx0,cy-6,hx1-hx0,12);
  /* claw: a bar bent up by the hook angle */
  const cl=(offx,offy)=>{const a=ang*Math.PI/180,L=48,ex=hx0+offx-Math.cos(a)*L,ey=cy+offy-Math.sin(a)*L;g.lineCap="butt";g.strokeStyle="#2e363e";g.lineWidth=14;g.beginPath();g.moveTo(hx0+offx+2,cy+offy);g.lineTo(ex,ey);g.stroke();
    g.strokeStyle="#4a5560";g.lineWidth=12;g.beginPath();g.moveTo(hx0+offx+2,cy+offy);g.lineTo(ex,ey);g.stroke();g.strokeStyle="#8a98a6";g.lineWidth=2;g.beginPath();g.moveTo(hx0+offx+2,cy+offy-5);g.lineTo(ex,ey-5);g.stroke();
    F("#8a4a22",ex+8,ey+4,4,2);g.fillStyle="#14100c";g.beginPath();g.moveTo(ex-4,ey+1);g.lineTo(ex+4,ey-7);g.lineTo(ex+7,ey+1);g.fill();};
  if(claw)cl(fastened?0:-12,fastened?0:8);
  if(tip){const ox=fastened?0:12,th=Math.max(1,12-tap*2);g.fillStyle="#2e363e";g.beginPath();g.moveTo(hx1+ox,cy-8);g.lineTo(hx1+ox+44,cy-th/2-1);g.lineTo(hx1+ox+44,cy+th/2+1);g.lineTo(hx1+ox,cy+8);g.fill();
    g.fillStyle="#6a7884";g.beginPath();g.moveTo(hx1+ox,cy-6);g.lineTo(hx1+ox+44,cy-th/2);g.lineTo(hx1+ox+44,cy+th/2);g.lineTo(hx1+ox,cy+6);g.fill();F("#aab6c2",hx1+ox,cy-6,40,1);}
  if(S.screw||S.step===9){F("#1a1a1c",hx0+2,cy-4,9,9);F("#c8ced6",hx0+3,cy-3,7,7);F("#4a525a",hx0+6,cy-3,1,7);F("#4a525a",hx0+3,cy,7,1);}
  if(S.nail||S.step===9){F("#1a1a1c",hx1-2,cy-1,13,3);F("#6a6a70",hx1-1,cy-1,11,1.5);F("#3a3a3e",hx1-4,cy-3,4,6);}
  /* the ideal outline in dots while shaping */
  if(S.step===2){g.setLineDash([3,3]);g.strokeStyle="rgba(120,255,200,.9)";g.lineWidth=1.5;const a=40*Math.PI/180,ex=hx0-Math.cos(a)*48,ey=cy-Math.sin(a)*48;g.beginPath();g.moveTo(hx0,cy-6);g.lineTo(ex,ey-6);g.lineTo(ex+3,ey+7);g.lineTo(hx0,cy+6);g.stroke();
    g.beginPath();g.moveTo(hx1,cy-6);g.lineTo(hx1+44,cy-3);g.lineTo(hx1+44,cy+3);g.lineTo(hx1,cy+6);g.stroke();g.setLineDash([]);
    g.font='6px "Press Start 2P",monospace';g.fillStyle="#ffe070";g.fillText("HOOK "+S.ang+"°",30,128);g.fillText("TAPER "+S.taper,310,128);}
  g.font='6px "Press Start 2P",monospace';g.fillStyle="#9aa8b6";hand&&g.fillText("HANDLE",170,cy+24);claw&&g.fillText("CLAW",hx0-60,cy+24);tip&&g.fillText("TIP",hx1+10,cy+24);}
