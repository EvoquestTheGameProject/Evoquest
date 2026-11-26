
/* ======================= CHAPTER 3: MUTANT ENCOUNTERS (part 1: the storm crossing) ======================= */
var C5_DW=560,C5_MW=400,C5_BX=[110,190,270,350,430],C5_DOOR=513;
var C5={t:0,rain:[],carry:0,fl:0,pry:null,steer:0};
var C5PR=null,C5TR=null,C5GN=null,C5CK=null;
function c5Fresh(){return{on:0,intro:0,tr:[0,0,0],tried:0,key:-1,opened:[0,0,0,0,0],hasKey:0,door:0,
  sim:{x:0,y:0,h:0,wp:0,hull:5,jam:0,jams:0,black:0,pw:0,fin:0,wheel:0,t:0,ig:0},mat:{belt:0,wire:0,fuse:0},gen:{belt:0,wire:0,fuse:0,run:0},
  cl:{off:0,open:0,n:0,tg:[1,1,1,1,1,1],done:0},carry:0,done:0,cp:null};}
function c5S(){const S=c3S();if(!S.c5||!S.c5.sim)S.c5=c5Fresh();return S.c5;}
function c5Is(id){const d=C2[id===undefined?room:id];return!!(d&&d.c5);}
function c5Rooms(){if(C2.deck)return;
  const mk=(id,name,W,seeds)=>{C2[id]={name,L:null,R:null,W,cars:[],seeds,c3:1,c4:1,c5:1};rooms[id]={name,L:null,R:null,W,crates:[],items:[],ints:[],plats:[]};C2_F[id]={trees:[],vines:[],branches:[],gantries:[],smoke:[]};};
  mk("deck","THE SHIP'S DECK",C5_DW,[91,92]);mk("helm","THE CONTROL ROOM",192,[93]);mk("motor","THE MOTOR ROOM",C5_MW,[94]);
  Object.assign(De,{deck:{c:"50,70,100",l:"170,190,225",a:0.1,dk:0.5},helm:{c:"40,60,70",l:"150,200,200",a:0.1,dk:0.5},motor:{c:"110,80,60",l:"255,170,90",a:0.12,dk:0.45}});
  const D=rooms.deck.ints;D.push({id:"c5_door",x:C5_DOOR,r:0,label:"DOOR"});C5_BX.forEach((x,i)=>D.push({id:"c5_box:"+i,x,r:0,label:"PRY OPEN"}));
  rooms.helm.ints.push({id:"c5_hatch",x:96,r:0,label:"GO DOWN"});
  const M=rooms.motor.ints;[["c5_ladder",372,"GO UP"],["c5_lever",345,"LEVER"],["c5_panel",165,"OPEN PANEL"],["c5_bucket",34,"BUCKET"],["c5_gen",300,"GENERATOR"],["c5_belt",262,"TAKE BELT"],["c5_wire",58,"TAKE WIRE"],["c5_fuse",326,"TAKE FUSE"]].forEach((q)=>M.push({id:q[0],x:q[1],r:0,label:q[2]}));
  [95,120,145,185,210,235].forEach((x,i)=>M.push({id:"c5_tg:"+i,x,r:0,label:"PULL"}));}
c5Rooms();
/* ---------------- routing helpers used by the older hooks ---------------- */
function c5Pre(){if(room==="helm"){player.vx=0;player.vy=0;player.walk=0;jumpBuf=0;player.x=96;}
  if(C5PR||C5TR||C5GN||C5CK){player.vx=0;player.walk=0;}}
function c5Walls(){const S=c5S();if(room==="motor"){if(player.x<10)player.x=10;if(player.x>C5_MW-8)player.x=C5_MW-8;}
  if(room==="deck"&&player.x>C5_DOOR+16)player.x=C5_DOOR+16;return!0;}
function c5Enter(t){const S=c5S();C3.lie=0;C5PR=null;C5TR=null;C5GN=null;C5CK=null;C5.carry=S.carry||0;
  if(!S.on){S.on=1;}if(S.key<0)c5PickKey();
  if(t==="deck"){camX=c3Clamp(player.x-96,0,C5_DW-192);if(S.door){player.x=C5_DOOR-4;}else if(player.x>C5_DW-60||player.x<20){player.x=40;}
    if(!S.intro){player.x=40;c3CutStart("c5intro");}}
  else if(t==="helm"){player.x=96;player.y=C2_FLOOR;C3.lie=1;camX=0;c5HelmEnter();}
  else{player.x=352;player.y=C2_FLOOR;player.face=-1;camX=c3Clamp(player.x-96,0,C5_MW-192);}
  updateGuide();}
function c5CP(rm,name){const S=c5S(),st=JSON.parse(JSON.stringify(Object.assign({},S,{cp:null})));S.cp={room:rm,name,inv:inv.slice(),got:[...got],st};c2Save(rm);
  toast("<b>"+name+"</b><br><span style=\"color:#8aff9a\">&#10004; CHECKPOINT SAVED</span>",2200);}
function c5Retry(){const S=c5S(),cp=S.cp;if(!cp)return!1;c5CloseAll();
  inv=cp.inv.slice();got=new Set(cp.got);const st=JSON.parse(JSON.stringify(cp.st));st.cp=cp;st.sim.hull=5;st.sim.hit=0;c3S().c5=st;
  qs("#gd").hidden=!0;dead=!1;hp=5;invuln=60;player.kb=0;shots=[];won=0;fadeNow=1;fadeTo=0;C3.task=null;C3.busy=0;
  enterRoom(cp.room,"R");updateBag();updateHud();updateGuide();toast("<b>BACK TO THE CHECKPOINT</b><br>"+cp.name+".",2200);return!0;}
function c5Die(title,txt){if(dead)return;if(Eo.god){toast("<b>DEV GOD MODE:</b> "+title,1800);return!1;}C3.task=null;C3.busy=0;c2Die(title,txt);return!0;}
function c5CloseAll(){C5PR=null;C5TR=null;C5GN=null;C5CK=null;C5.pry=null;
  ["#c5Try","#c5Pry","#c5Loot","#c5Gen","#c5Sum","#c5Title","#c5End"].forEach((k)=>{const e=qs(k);if(e&&!e.hidden){e.hidden=!0;e.__stop&&e.__stop();}});}
function c5Esc(){const ids=[["#c5Try",c5TryClose],["#c5Pry",c5PryClose],["#c5Loot",c5LootClose],["#c5Gen",c5GenClose]];
  for(const q of ids){const e=qs(q[0]);if(e&&!e.hidden){q[1]();return!0;}}return!1;}
/* ---------------- overlay look ---------------- */
function c5Css(){c4Css();if(qs("#c5Css"))return;const st=document.createElement("style");st.id="c5Css";
  st.textContent="#c5Sum,#c5Title,#c5End{z-index:60}.c5sum{width:min(860px,100%);max-height:calc(100vh - 12px);overflow:auto;text-align:left}.c5sum h3{text-align:center}.c5cols{display:grid;grid-template-columns:1fr 1fr;gap:10px}.c5cols h4{color:#ffe070;font-size:8px;margin:4px 0}.c5cols ul{margin:0;padding-left:14px;font-size:7px;line-height:1.9;color:#dfe8f8}.c5cols li{margin-bottom:3px}"+
  "@media (max-width:640px){.c5cols{grid-template-columns:1fr}}#c5Title{background:#000;display:flex;align-items:center;justify-content:center;text-align:center}#c5Title .t1{color:#9ab0d8;font-size:11px;letter-spacing:4px;margin-bottom:10px}#c5Title .t2{color:#ffe070;font-size:clamp(16px,5vw,34px);text-shadow:0 0 18px #c86a1a;animation:c5ti 2.2s ease both}#c5Title .t3{color:#8aa0c0;font-size:8px;margin-top:14px;animation:c5ti 3s ease both}@keyframes c5ti{0%{opacity:0;transform:scale(1.08)}30%{opacity:1}100%{opacity:1;transform:none}}"+
  "#c5tCv,#c5kCv,#c5pCv,#c5gCv{width:100%;max-height:calc(100vh - 290px);object-fit:contain;image-rendering:pixelated;background:#0c0a08;border:2px solid #3a3a40;display:block;margin:6px auto}#c5tMsg,#c5pMsg,#c5lMsg,#c5gMsg{min-height:34px;text-align:left;font-size:8px;line-height:1.8;padding:6px 8px;background:#05070ce6;border:2px solid #2a3a5a;margin:4px 0}"+
  "#c5pB .go{border-color:#5aff8a;color:#8aff9a}#c5pMsg .ok,#c5gMsg .ok,#c5lMsg .ok,#c5tMsg .ok{color:#8aff9a}#c5pMsg .no,#c5gMsg .no{color:#ffb08a}#c5pMsg .hint{color:#bfe0ff}@media (max-height:500px){#c5tCv,#c5kCv,#c5pCv,#c5gCv{max-height:40vh}}";
  document.head.appendChild(st);}
function c5Overlay(id,html){let el=qs(id);if(!el){el=document.createElement("div");el.id=id.slice(1);el.className="gov";el.hidden=!0;qs("#gm").appendChild(el);}el.innerHTML=html;return el;}
/* ---------------- the chapter 2 summary and the chapter 3 title ---------------- */
var C5_DID=["Wired a dying radio ten times and followed its broadcast west.","Outran a burning road and a pack of mutated animals.","Built a bed out of forest scrap and slept through a dream of the sea.","Bridged a raging river before the dam broke.","Searched crashed cargo containers and made river water safe to drink.","Built a crowbar from scrap, pried open the port gate and boarded the last ship."];
var C5_LEARNED=["<b>Circuits:</b> cells in series add their voltage; in parallel they share the work.","<b>Fire:</b> it needs fuel, heat and oxygen. Remove one and it dies.","<b>Insulation:</b> trapped still air stops heat escaping, which is why leaves, moss and boughs keep you warm.","<b>Dehydration:</b> hot sun makes you sweat much faster; shade slows it.","<b>Friction and tension:</b> rope lashings hold a bridge together.","<b>Safe water:</b> boiling kills germs, a layered filter (gravel, sand, charcoal) removes grit, smells and mud. Charcoal grabs chemicals by adsorption.","<b>Pressure:</b> a sharp edge puts the same force on a tiny area, so it cuts.","<b>Levers, screws and rust:</b> a long handle multiplies your push; a screw is a ramp around a post; rust weakens steel."];
function c5Summary(){c5Css();const S=c5S();S.on=1;
  const el=c5Overlay("#c5Sum",'<div class="gcard c5sum"><h3>CHAPTER 2 COMPLETE</h3><p style="font-size:8px;text-align:center;color:#b8c8e8;margin:2px 0 8px">You boarded the last ship toward the Ridge Tower. Here is what you did and what you learned.</p><div class="c5cols"><div><h4>WHAT YOU DID</h4><ul>'+C5_DID.map((x)=>"<li>"+x+"</li>").join("")+'</ul></div><div><h4>WHAT YOU LEARNED</h4><ul>'+C5_LEARNED.map((x)=>"<li>"+x+"</li>").join("")+'</ul></div></div><div class="btns"><button class="gbtn" id="c5sGo">CHAPTER 3: MUTANT ENCOUNTERS</button><button class="gbtn alt" id="c5sMenu">MENU</button></div></div>');
  modal=4;el.hidden=!1;c2Save("deck");$sx("success");
  qs("#c5sGo").onclick=()=>{el.hidden=!0;c5TitleCard();};qs("#c5sMenu").onclick=()=>{el.hidden=!0;modal=0;ee();};setTimeout(()=>qs("#c5sGo").focus(),40);}
function c5TitleCard(){c5Css();const el=c5Overlay("#c5Title",'<div><div class="t1">CHAPTER 3</div><div class="t2">MUTANT ENCOUNTERS</div><div class="t3">TAP TO CONTINUE</div></div>');
  modal=4;el.hidden=!1;fadeNow=1;fadeTo=1;let done=0;const go=()=>{if(done)return;done=1;el.hidden=!0;modal=0;C3.cut=null;tnBars(0);tnCap("");qs("#cskip").hidden=!0;won=0;fadeNow=1;fadeTo=0;const S=c5S();S.intro=0;enterRoom("deck","L");player.x=40;updateGuide();};
  el.onclick=go;el.__stop=()=>{done=1;};setTimeout(go,4200);$sx("stinger");}
/* ---------------- the deck ---------------- */
function c5DeckStep(){const S=c5S();
  c5Pick((it)=>{const id=it.id,k=id.slice(3).split(":")[0],i=+(id.split(":")[1]||0);
    if(k==="door")return{r:18,label:S.hasKey?"USE THE KEY":S.tried?"STEEL DOOR":"TRY THE DOOR"};
    if(k==="box")return{r:19,label:S.opened[i]?"OPENED":"PRY OPEN"};return null;});}
function c5Pick(fn){let best=null,bd=1e9;for(const it of rooms[room].ints){const q=fn(it);it.r=0;if(!q)continue;q.x!=null&&(it.x=q.x);it.label=q.label;it.ly=q.ly;const d=Math.abs(player.x-it.x);if(d<q.r&&d<bd){bd=d;best=[it,q.r];}}best&&(best[0].r=best[1]);}
function c5Use(e){const id=e.id.slice(3),k=id.split(":")[0],i=+(id.split(":")[1]||0);if(C3.cut||C3.task)return!0;
  if(k==="door"){if(S5().hasKey)c3CutStart("c5door");else c5TryOpen();}
  else if(k==="box"){if(!S5().tried){$sx("locked");toast("<b>FIRST, THE DOOR.</b><br>Try the control room door so you know what you're looking for.",2600);return!0;}if(S5().opened[i])toast("Already opened. Nothing else useful.",1800);else c5PryOpen(i);}
  else if(room==="helm"||room==="motor")c5MotorUse(k,i);return!0;}
function S5(){return c5S();}
/* the door: nothing you have will open it */
var C5_TRY=[{n:"THE KEY",msg:"<b>THE KEY:</b> you pat down every pocket. Nothing. The key to the control room was lost in the storm, or went overboard with the crew."},
  {n:"THE VENOM BLASTER",msg:"<b>THE VENOM BLASTER:</b> click… click. It is still jammed solid with dried venom. And it fires venom, not something that can cut through a steel door."},
  {n:"THE CROWBAR",msg:"<b>THE CROWBAR:</b> you wedge the rusty bar into the door seam and lean on it. The bar bends and groans. It would snap long before this thick steel gave way. Save it for the thin container doors."}];
function c5TryOpen(){const S=c5S();c5Css();
  const el=c5Overlay("#c5Try",'<div class="gcard c4card"><h3>THE CONTROL ROOM DOOR</h3><canvas id="c5tCv" width="384" height="150" aria-label="A thick steel door with a wheel handle and a lock plate"></canvas><div class="c4lay" id="c5tB"></div><div id="c5tMsg" aria-live="polite"></div><div class="btns"><button class="gbtn alt" id="c5tOk">CLOSE</button></div></div>');
  modal=4;el.hidden=!1;qs("#c5tB").innerHTML=C5_TRY.map((q,i)=>'<button class="gbtn alt" data-c5t="'+i+'">TRY '+q.n+(S.tr[i]?" &#10006;":"")+"</button>").join("");
  qs("#c5tMsg").innerHTML=S.tried?"Nothing you have will open it. Look for a <b>replacement key</b> in the cargo containers, and pry them open with your crowbar.":"The door is locked. What could open it?";
  qs("#c5tOk").className="gbtn"+(S.tried?"":" alt");qs("#c5tOk").onclick=c5TryClose;
  el.onclick=(ev)=>{const b=ev.target.closest&&ev.target.closest("[data-c5t]");b&&c5TryPick(+b.dataset.c5t);};
  c5TryPaint();setTimeout(()=>{const f=qs("#c5tB button")||qs("#c5tOk");f&&f.focus();},30);}
function c5TryPick(i){const S=c5S();$sx(i===2?"clank":"locked");if(!S.tr[i]){S.tr[i]=1;const b=qs('[data-c5t="'+i+'"]');b&&(b.innerHTML+=" &#10006;");}
  let m=C5_TRY[i].msg;if(S.tr.every(Boolean)){S.tried=1;qs("#c5tOk").className="gbtn";m+='<br><br><b class="ok">NO WAY IN.</b> You need a <b>replacement key</b>. There are <b>5 cargo containers</b> on this deck: use your crowbar to <b>pry them open</b> and search them. The sea is getting rougher…';c2Save("deck");updateGuide();}
  qs("#c5tMsg").innerHTML=m;}
function c5TryClose(){const el=qs("#c5Try");if(!el||el.hidden)return;el.hidden=!0;modal=0;updateGuide();}
function c5TryPaint(){const cv=qs("#c5tCv");if(!cv)return;const g=cv.getContext("2d");g.imageSmoothingEnabled=!1;const F=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(x|0,y|0,w,h);};
  const bg=g.createLinearGradient(0,0,0,150);bg.addColorStop(0,"#2a3038");bg.addColorStop(1,"#14181c");g.fillStyle=bg;g.fillRect(0,0,384,150);
  F("#4a525a",92,6,200,144);F("#6a747e",92,6,200,3);F("#2e343a",92,6,5,144);F("#2e343a",287,6,5,144);
  for(let y=14;y<146;y+=14)for(const x of[100,276]){F("#8a949e",x,y,3,3);F("#2a2e34",x+1,y+1,2,2);}/* rivets */
  for(let k=0;k<60;k++)F("rgba(140,70,26,.45)",100+r(k,1901)*184,10+r(k,1902)*130,1+r(k,1903)*3,4+r(k,1904)*26);/* rust streaks */
  F("#22282e",104,16,176,128);F("#3a444e",106,18,172,124);F("#58626c",106,18,172,2);
  g.fillStyle="#1a1e22";g.beginPath();g.arc(192,78,34,0,7);g.fill();g.strokeStyle="#7a848e";g.lineWidth=5;g.beginPath();g.arc(192,78,28,0,7);g.stroke();/* wheel handle */
  g.lineWidth=4;for(let a=0;a<4;a++){g.beginPath();g.moveTo(192+Math.cos(a*1.57)*28,78+Math.sin(a*1.57)*28);g.lineTo(192-Math.cos(a*1.57)*28,78-Math.sin(a*1.57)*28);g.stroke();}
  g.fillStyle="#9aa4ae";g.beginPath();g.arc(192,78,7,0,7);g.fill();g.fillStyle="#4a525a";g.beginPath();g.arc(192,78,3,0,7);g.fill();
  F("#1a1208",236,110,34,24);F("#c8a030",238,112,30,20);F("#e8c850",238,112,30,3);F("#1a1208",250,118,6,10);F("#1a1208",248,126,10,2);/* lock plate */
  F("#c8342a",112,24,40,10);text("KEEP OUT",116,26,"#ffe9d8",'4px "Press Start 2P",monospace');
  /* rain on the steel */
  for(let k=0;k<30;k++)F("rgba(180,210,240,.5)",r(k,1905)*384,r(k,1906)*150,1,5+r(k,1907)*8);}
/* ---------------- prying a container open: a lever puzzle ---------------- */
var C5_PRY=[[{rails:[2,5,8],need:4,cap:10},{rails:[1,4,7],need:5,cap:10}],[{rails:[1,3,6],need:3,cap:9},{rails:[2,3,6],need:3,cap:10}],[{rails:[2,4,7],need:2.5,cap:8},{rails:[1,3,5],need:4,cap:7}]];
var C5_WHY=["<b>WHY IT WORKS:</b> a lever multiplies your push by <i>effort arm &divide; load arm</i>. Put the pivot (fulcrum) close to the door and push far from it, and a small push becomes a big force at the door.","<b>WHY IT WORKS:</b> the pivot has to rest on something solid, or it just slides. A short load arm and a long effort arm give the biggest multiplication.","<b>WHY IT WORKS:</b> there's a trade-off. The longer the handle compared to the claw, the further you must move the handle for the door to move a little. Here a low pipe limits how far out you can push."];
function c5PryOpen(i){const S=c5S();c5Css();
  const el=c5Overlay("#c5Pry",'<div class="gcard c4card"><h3 id="c5pT">PRY THE CONTAINER OPEN</h3><canvas id="c5pCv" width="384" height="216" aria-label="A crowbar used as a lever under a container door: move the pivot and the push point"></canvas><div class="c4lay" id="c5pB"></div><div id="c5pMsg" aria-live="polite"></div><div class="btns"><button class="gbtn alt" id="c5pOk">STOP</button></div></div>');
  modal=4;el.hidden=!1;C5PR={i,n:0,f:4,e:6,hints:0,busy:0,anim:0,t:0,fx:0};qs("#c5pOk").onclick=c5PryClose;
  el.onclick=(ev)=>{const b=ev.target.closest&&ev.target.closest("[data-c5p]");b&&!b.disabled&&c5PryAct(b.dataset.c5p);};
  c5PryDraw("Slide the <b>pivot</b> and the <b>push point</b> along the bar, then <b>PUSH DOWN</b>. Three good pries open this container.");
  el.__stop=()=>{if(C5PR)cancelAnimationFrame(C5PR.raf);};const loop=()=>{if(!C5PR)return;C5PR.raf=requestAnimationFrame(loop);if(window.__evoPaused)return;C5PR.t++;c5PryPaint();};C5PR.raf=requestAnimationFrame(loop);$sx("click");}
function c5PryCfg(){const P=C5PR;return C5_PRY[Math.min(2,P.n)][(P.i+P.n)%2];}
function c5PryDraw(msg){const P=C5PR;if(!P)return;const cfg=c5PryCfg(),b=(a,l,dis)=>'<button class="gbtn alt" data-c5p="'+a+'"'+(dis?" disabled":"")+">"+l+"</button>";
  qs("#c5pT").textContent="PRY THE CONTAINER OPEN: "+(P.n+1)+" / 3";
  qs("#c5pB").innerHTML=b("f-","&#9664; PIVOT")+b("f+","PIVOT &#9654;")+b("e-","&#9664; PUSH")+b("e+","PUSH &#9654;")+b("hint","HINT")+'<button class="gbtn alt go" data-c5p="go">PUSH DOWN!</button>';
  msg!=null&&(qs("#c5pMsg").innerHTML=msg);c5PryPaint();void cfg;}
function c5PryAct(a){const P=C5PR;if(!P||P.busy)return;const cfg=c5PryCfg();$sx("click");
  if(a==="f-"||a==="f+"){P.f=c3Clamp(P.f+(a==="f+"?1:-1),1,9);return c5PryDraw(null);}
  if(a==="e-"||a==="e+"){P.e=c3Clamp(P.e+(a==="e+"?1:-1),2,cfg.cap);return c5PryDraw(null);}
  if(a==="hint"){P.hints++;const r1=cfg.rails.join(", ");const m=P.hints===1?'<span class="hint"><b>HINT:</b> the pivot must sit on a solid <b>rail</b> (the steel lugs on the base). Put it as close to the door as you can, then push as far from the pivot as you can.</span>':P.hints===2?'<span class="hint"><b>HINT:</b> the rails are at marks '+r1+'. The door needs a leverage of &times;'+cfg.need+' or more. Leverage = (push mark &minus; pivot mark) &divide; pivot mark.</span>':'<span class="hint"><b>HINT:</b> try the pivot at mark '+Math.min.apply(null,cfg.rails.filter((x)=>cfg.cap>=x*(1+cfg.need)))+' and the push at mark '+cfg.cap+'.</span>';return c5PryDraw(m);}
  if(a==="go"){const f=P.f,e=P.e,ma=(e-f)/f;let why="";
    if(e<=f)why="Push on the handle, <b>beyond</b> the pivot: the push point has to be further from the door than the pivot.";
    else if(cfg.rails.indexOf(f)<0){why="<b>NO SUPPORT:</b> the pivot is not on a rail. It skids on the wet steel and the bar slips out.";}
    else if(ma<cfg.need-1e-9)why="Not enough leverage: <b>&times;"+(Math.round(ma*10)/10)+"</b>, but the door needs <b>&times;"+cfg.need+"</b>. Move the pivot closer to the door (on a rail) and push further out.";
    if(why){$sx("stuck");shake=Math.max(shake,4);P.fx=-1;P.anim=30;return c5PryDraw('<b class="no">The door doesn\'t budge.</b> '+why);}
    P.busy=1;P.anim=60;P.fx=1;$sx("clank");$sx("creak");shake=Math.max(shake,8);P.n++;
    const done=P.n>=3;c5PryDraw('<b class="ok">CREAK… '+(done?"POP!":"it gives a little.")+"</b> "+C5_WHY[P.n-1]);
    setTimeout(()=>{if(!C5PR)return;P.busy=0;if(done){c5PryDone();}else{P.f=4;P.e=6;c5PryDraw(null);}},done?1800:1500);}}
function c5PryDone(){const i=C5PR.i,S=c5S();c5PryClose(!0);S.opened[i]=1;$sx("door");shake=10;c2Save("deck");c5LootShow(i);}
function c5PryClose(silent){const el=qs("#c5Pry");if(C5PR&&C5PR.raf)cancelAnimationFrame(C5PR.raf);C5PR=null;if(!el||el.hidden)return;el.hidden=!0;modal=0;silent||toast("You stop prying. Your crowbar is still in one piece.",1600);updateGuide();}
function c5PryPaint(){const cv=qs("#c5pCv");if(!cv||!C5PR)return;const g=cv.getContext("2d"),P=C5PR,cfg=c5PryCfg();g.imageSmoothingEnabled=!1;const F=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h);};
  const mx=(m)=>56+m*27,by=150;
  const bg=g.createLinearGradient(0,0,0,216);bg.addColorStop(0,"#161c24");bg.addColorStop(1,"#0a0d12");g.fillStyle=bg;g.fillRect(0,0,384,216);
  for(let k=0;k<40;k++){F("rgba(160,190,230,.35)",(r(k,1911)*384+P.t*3)%384,(r(k,1912)*216+P.t*5)%216,1,6);}/* rain in the lamp light */
  /* the container door and frame on the left */
  F("#101418",14,24,22,150);F("#8a2a22",16,26,18,146);for(let y=30;y<170;y+=6)F("rgba(0,0,0,.25)",16,y,18,1);F("rgba(255,255,255,.15)",16,26,2,146);F("#5a5c60",34,60,5,70);F("#9a9ca0",34,60,5,2);/* latch */
  for(let k=0;k<10;k++)F("rgba(120,56,20,.5)",18+r(k,1913)*12,30+r(k,1914)*130,2,6+r(k,1915)*14);
  const swing=P.fx>0?Math.min(1,P.anim/50)*0:0;
  /* the base: a steel beam with solid lugs (rails) at some marks, smooth wet steel elsewhere */
  F("#2e343a",44,by+22,300,10);F("#58626c",44,by+22,300,2);
  for(let m=1;m<=9;m++){const rail=cfg.rails.indexOf(m)>=0;if(rail){F("#7a848e",mx(m)-5,by+14,10,9);F("#aab4be",mx(m)-5,by+14,10,2);F("#2a8a3a",mx(m)-5,by+12,10,2);}else{F("rgba(150,190,230,.35)",mx(m)-6,by+21,12,1);}
    g.font='5px "Press Start 2P",monospace';g.fillStyle=rail?"#8aff9a":"#6a7a8a";g.fillText(""+m,mx(m)-2,by+44);}
  /* a low pipe overhead limits how far out you can push */
  F("#4a525a",mx(cfg.cap)+14,40,10,by-40);F("#8a949e",mx(cfg.cap)+14,40,2,by-40);F("#c8c030",mx(cfg.cap)+14,by-24,10,3);g.font='5px "Press Start 2P",monospace';g.fillStyle="#ffe070";g.fillText("LOW",mx(cfg.cap)+12,36);
  /* the crowbar as a lever, rotating about the pivot when you push */
  const k=P.fx>0?Math.sin(Math.min(1,P.anim/60)*Math.PI)*0.16:P.fx<0?Math.sin(P.anim/30*Math.PI)*0.03:0,px=mx(P.f),py=by+10;
  g.save();g.translate(px,py);g.rotate(k);g.translate(-px,-py);
  F("#1a1e22",mx(0)-6,by-2,mx(10)-mx(0)+34,13);F("#6a7884",mx(0)-6,by,mx(10)-mx(0)+32,10);F("#aab6c2",mx(0)-6,by,mx(10)-mx(0)+32,2);F("#3a444e",mx(0)-6,by+8,mx(10)-mx(0)+32,2);
  for(let q=0;q<14;q++)F(q%2?"#8a4a22":"#6a3a1a",mx(0)+q*20,by+2+(q%3)*2,4,2);
  g.fillStyle="#1a1e22";g.beginPath();g.moveTo(mx(0)-6,by-2);g.lineTo(mx(0)-16,by+2);g.lineTo(mx(0)-6,by+11);g.fill();F("#8a98a6",mx(0)-14,by+1,8,2);/* claw tip in the door gap */
  g.restore();
  /* the pivot block */
  F("#1a1208",px-9,by+10,18,13);g.fillStyle="#c8a030";g.beginPath();g.moveTo(px,by+8);g.lineTo(px-8,by+22);g.lineTo(px+8,by+22);g.fill();F("#8a6a18",px-8,by+20,16,2);
  g.font='5px "Press Start 2P",monospace';g.fillStyle="#ffe070";g.fillText("PIVOT",px-12,by+60);
  /* the push arrow */
  const ex=mx(P.e),ay=by-34-(Math.sin(P.t/6)*2|0)-(P.busy?-12:0);g.fillStyle="#ff6a3a";g.beginPath();g.moveTo(ex,by-2);g.lineTo(ex-9,ay+10);g.lineTo(ex-3,ay+10);g.lineTo(ex-3,ay-4);g.lineTo(ex+3,ay-4);g.lineTo(ex+3,ay+10);g.lineTo(ex+9,ay+10);g.fill();
  g.font='5px "Press Start 2P",monospace';g.fillStyle="#ff9a6a";g.fillText("PUSH",ex-9,ay-9);
  /* the maths, live */
  const la=P.f,ea=P.e-P.f,ma=ea>0?ea/la:0,ok=cfg.rails.indexOf(P.f)>=0&&ma>=cfg.need-1e-9;
  F("#04060a",168,10,208,56);F("#1a2030",170,12,204,52);g.font='6px "Press Start 2P",monospace';g.fillStyle="#9ab0d8";g.fillText("LOAD ARM: "+la,176,26);g.fillText("EFFORT ARM: "+Math.max(0,ea),176,38);
  g.fillStyle=ok?"#8aff9a":"#ffd23a";g.fillText("LEVERAGE: x"+(Math.round(ma*10)/10),176,50);g.fillStyle="#ff9a6a";g.fillText("DOOR NEEDS: x"+cfg.need,176,61);
  if(P.anim>0)P.anim--;}
/* what's inside */
var C5_JUNK=[["LIFE JACKETS","Orange foam vests. Foam traps air, so it floats: a tiny pocket of air weighs far less than the water it pushes aside (buoyancy)."],["COILS OF ROPE","Thick nylon rope. Twisted strands share the load and friction keeps them from slipping."],["TARPAULINS","Folded waterproof sheets. Tight woven plastic with a coating that water can't soak through."],["WET FLARES","Distress flares, soaked through. The chemicals inside stop working once they're wet."],["CANNED FOOD","Rusted tins. The seams have rusted open: don't eat from damaged cans."],["SPARE LAMPS","Dented signal lamps. One bulb is still intact, but there's no power for it."],["WOOL BLANKETS","Heavy damp wool. Wool still insulates when wet, better than most fabrics."],["EMPTY TOOLBOX","Somebody emptied it long ago."],["ENGINE OIL","Sealed drums of oil. Oil makes moving parts slide instead of grind, which cuts friction and heat."],["FISHING NETS","Tangled nylon nets. Lost nets drift for years and snare animals and propellers."]];
function c5LootShow(i){const S=c5S(),key=i===S.key;c5Css();
  const sh=c4Shuffle(C5_JUNK.slice()).slice(0,key?2:3);
  const el=c5Overlay("#c5Loot",'<div class="gcard c4card"><h3>INSIDE CONTAINER '+(i+1)+"</h3><div id=\"c5lMsg\"></div><div class=\"btns\"><button class=\"gbtn\" id=\"c5lOk\">"+(key?"TAKE THE KEY":"CLOSE")+"</button></div></div>");
  modal=4;el.hidden=!1;const M=qs("#c5lMsg");
  M.innerHTML=(key?'<b class="ok">A KEY!</b> Hanging on a hook inside, with a tag: <b>CONTROL ROOM</b>. That is the replacement key!<br><br>':"")+sh.map((q)=>"<b>"+q[0]+":</b> "+q[1]).join("<br><br>")+(key?"":"<br><br>No key in this one. Try another container.");
  qs("#c5lOk").onclick=()=>{c5LootClose();};setTimeout(()=>qs("#c5lOk").focus(),30);$sx(key?"success":"pickup");
  if(key){S.hasKey=1;inv.includes("ckeyc")||inv.push("ckeyc");got.add("ckeyc");updateBag();}
  c2Save("deck");updateGuide();}
function c5LootClose(){const el=qs("#c5Loot");if(!el||el.hidden)return;el.hidden=!0;modal=0;const S=c5S();updateGuide();
  if(S.hasKey&&!S.keyToast){S.keyToast=1;toast("<b>GOT THE CONTROL ROOM KEY!</b><br>Go to the door at the far RIGHT of the deck.",3800);}}
/* ---------------- the cutscenes of the deck ---------------- */
function c5Cut(c){const k=c.k;
  if(k==="c5intro")return c5CutIntro(c);if(k==="c5door")return c5CutDoor(c);if(k==="c5black")return c5CutBlack(c);if(k==="c5power")return c5CutPower(c);if(k==="c5arr")return c5CutArr(c);c3CutEnd();}
function c5Skip(c){const k=c.k;if(k==="c5helm"){c.t=Math.max(c.t,519);return;}if(k==="c5black"){c.t=Math.max(c.t,419);return;}if(k==="c5intro"){c.t=Math.max(c.t,519);return;}if(k==="c5door"){c.t=Math.max(c.t,149);return;}if(k==="c5arr"){c.t=Math.max(c.t,c.t<700?699:1199);return;}if(k==="c5power"){c.t=Math.max(c.t,239);return;}}
function c5CutIntro(c){const t=c.t,S=c5S();c.cx=null;
  if(t===2){$sx("rumble");tnCap("The storm hit an hour after we left the port.");}
  if(t===190){$sx("boom");shake=8;tnCap("The ship is drifting with nobody at the wheel. Someone has to steer, and the control room is at the far end of the deck.");}
  if(t===420)tnCap("It's dark, soaked and slippery out here. Stay low and keep moving.");
  if(t>=520){tnCap("");S.intro=1;c3CutEnd();c5CP("deck","The storm deck");updateGuide();$sx("stinger");toast("<b>NEW GOAL</b><br>Get into the control room at the far RIGHT of the deck.",4200);}}
function c5CutDoor(c){const t=c.t,S=c5S();c.cx=null;
  if(t===2){$sx("click");$sx("clank");tnCap("The key turns… the lock gives!");}
  if(t===40){$sx("door");C5.door=1;}
  if(t===80)tnCap("Let's see if I can steer this thing.");
  if(t>=150){tnCap("");S.door=1;S.hasKey=1;c3CutEnd();c2Save("deck");fadeTo=1;onFaded=()=>{enterRoom("helm","R");};}}
