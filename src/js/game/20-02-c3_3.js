
/* ---------------- THE OLD FOREST ---------------- */
function c3Has(k){return inv.includes(k)||got.has(k);}
function c3NearPool(x){return C3_POOLS.some((p)=>Math.abs(x-p.x)<p.w/2+12);}
function c3PlaceOK(){return c3OnFloor()&&!c3NearPool(player.x)&&player.x>22&&player.x<C3_FW-26;}
/* what each forest material turns into: having any of these means you already gathered it */
var C3_DOWN={axe:["axe2"],whet:["axe2"],wood:["poles","frame","bedkit"],poles:["frame","bedkit"],vinea:["rope","frame","bedkit"],vineb:["rope","frame","bedkit"],vinec:["rope","frame","bedkit"],rope:["frame","bedkit"],
  bough:["bedding","bedkit"],leaves:["bedding","bedkit"],moss:["pillow","bedkit"],fern:["pillow","bedkit"],frame:["bedkit"],bedding:["bedkit"],pillow:["bedkit"],axe2:[]};
function c3Got(k){if(c3Has(k)||c3S().bed)return!0;if(k.slice(0,4)==="vine"&&c3Has("rope"))return!0;return(C3_DOWN[k]||[]).some(c3Has);}
function c3ForestStep(){const S=c3S(),kit=inv.includes("bedkit")&&!S.bed,off=kit||!!S.bed,sharp=inv.includes("axe2");
  for(const it of rooms.forest.ints){const id=it.id;it.ly=undefined;
    if(id==="c3_place"){it.x=player.x;it.r=kit?999:0;it.label=c3PlaceOK()?"PLACE BED":c3NearPool(player.x)?"TOO WET":"NOT HERE";}
    else if(id==="c3_bed"){it.x=S.bed;it.r=S.bed&&!S.done?18:0;}
    else if(id==="c3_axe")it.r=off||c3Got("axe")?0:15;
    else if(id==="c3_leaves")it.r=off||c3Got("leaves")?0:16;
    else if(id==="c3_bench")it.r=off?0:20;
    else if(id==="c3_log"){it.r=off||c3Got("wood")?0:20;it.label=sharp?"CHOP":"DEAD TREE";}
    else if(id==="c3_moss")it.r=off||c3Got("moss")?0:16;
    else if(id==="c3_pine"){it.r=off||c3Got("bough")?0:16;it.label=sharp?"CHOP":"PINE";}
    else if(id==="c3_vine"){it.r=off||c3Got("vinea")?0:15;it.label="PULL VINE";}
    else if(id==="c3_whet")it.r=off||c3Got("whet")?0:12;
    else if(id==="c3_fern")it.r=off||c3Got("fern")?0:13;
    else if(id==="c3_vinec")it.r=off||c3Got("vinec")?0:12;
    else if(id==="c3_dleaves")it.r=off||c3Got("leaves")?0:10;
    else if(id==="c3_vineb"){const up=player.y<=C2_FLOOR-22;it.r=off||c3Got("vineb")?0:up?20:12;it.label=up?"PULL VINE":"TOO HIGH";it.ly=up?Math.max(2,player.y-52):40;}}
  if(c3TaskStep())return;
  if(c3OnFloor()&&c3Pool(player.x)){C3.t%9===0&&parts.push({x:player.x+6*(Math.random()-0.5),y:C2_FLOOR+1,vx:0,vy:-0.2,life:18,c:"#8a8a5a",s:1});
    c3Tip("pool","<b>MURKY WATER.</b><br>You're desperately thirsty… but it's brown, still and smells rotten. Drinking it could make you very sick. Wading slows you down even more.",4200);}
  if(c3Tired()&&C3.t%240===120&&player.walk)$sx("breath");
  c4ForestStep();}
/* timed actions (gather, chop) shared by the forest and the river */
function c3TaskStep(){const T=C3.task;if(!T)return!1;T.t++;player.walk=0;player.vx=0;player.punch>0&&player.punch--;
  if(T.kind==="chop"){player.face=T.x>player.x?1:-1;if(T.t%24===6){player.punch=14;$sx("swing");}
    if(T.t%24===14){$sx("crate");shake=Math.max(shake,3);sparks(T.x,C2_FLOOR-14,8,["#c8a068","#8a5a32","#e8d0a0"],1.6,0.14,18);}}
  else{ue=6;T.t%12===0&&$sx("scratch");T.t%6===0&&parts.push({x:player.x+6*player.face,y:player.y-2,vx:(Math.random()-0.5),vy:-0.8*Math.random(),g:0.08,life:20,c:T.col||"#c87a2a",s:1});}
  if(T.t>=T.n){C3.task=null;C3.busy=0;ue=0;player.punch=0;T.fn();}return!0;}
function c3Task(kind,x,n,fn,col){C3.task={kind,x,n,fn,col,t:0};C3.busy=n+5;tnLockInput();player.vx=0;}
function c3Give(id){tnGive(id,player.x,player.y-10);ia(id);c2Save("forest");}
function c3Use(e){if(e&&e.id&&e.id.slice(0,3)==="c4_")return c4Use(e);if(e&&e.id&&e.id.slice(0,3)==="c5_")return c5Use(e);if(!e||!e.id||e.id.slice(0,3)!=="c3_")return!1;const id=e.id,S=c3S();
  const blunt=(what)=>{if(inv.includes("axe2"))return!1;$sx(inv.includes("axe")?"clank":"locked");
    toast(inv.includes("axe")?"<b>CLANG!</b><br>The blunt axe just bounces off the "+what+". A blunt edge spreads your swing over a wide area, so the pressure is too low to cut. <b>Sharpen it on a whetstone</b> at the workbench.":"<b>TOO TOUGH.</b><br>You can't break the "+what+" by hand. You need a blade.",3800);return!0;};
  if(id==="c3_axe"){c3Task("gather",C3_FI.axe,26,()=>{c3Give("axe");},"#8a6a4a");}
  else if(id==="c3_leaves")c3Task("gather",C3_FI.leaves,40,()=>c3Give("leaves"),"#c87a2a");
  else if(id==="c3_moss")c3Task("gather",C3_FI.moss,40,()=>c3Give("moss"),"#5a9a4a");
  else if(id==="c3_vine")c3Task("gather",C3_FI.vine,44,()=>c3Give("vinea"),"#4a6a2a");
  else if(id==="c3_vinec")c3Task("gather",C3_FI.vinec,40,()=>c3Give("vinec"),"#4a6a2a");
  else if(id==="c3_vineb"){if(player.y>C2_FLOOR-22){$sx("locked");toast("<b>TOO HIGH.</b><br>This vine hangs high up in the tree. Jump onto the low branch, or climb a hanging vine (hold UP), to reach it.",3200);}else c3Task("gather",C3_FI.vineb,40,()=>c3Give("vineb"),"#4a6a2a");}
  else if(id==="c3_whet")c3Task("gather",C3_FI.whet,30,()=>c3Give("whet"),"#8a8a8a");
  else if(id==="c3_fern")c3Task("gather",C3_FI.fern,36,()=>c3Give("fern"),"#3a8a3a");
  else if(id==="c3_dleaves"){$sx("locked");toast("<b>SOGGY LEAVES.</b><br>This pile sits in the damp by the pool and is soaked right through. Wet leaves are useless for bedding: <b>water carries heat away about 25 times faster than air</b>. Find a DRY pile.",4400);}
  else if(id==="c3_log"){if(!blunt("dead tree"))c3Task("chop",C3_FI.log,74,()=>c3Give("wood"));}
  else if(id==="c3_pine"){if(!blunt("springy pine"))c3Task("chop",C3_FI.pine,74,()=>c3Give("bough"));}
  else if(id==="c3_bench")c3Bench();
  else if(id==="c3_place")c3Place();
  else if(id==="c3_bed"&&S.bed&&!S.done)c3CutStart("sleep");
  return!0;}
function c3Place(){if(!c3PlaceOK()){$sx("locked");toast(c3NearPool(player.x)?"<b>TOO WET!</b><br>Not in, or right next to, the murky water. Find dry ground.":"<b>NOT HERE.</b><br>Stand on flat, dry ground (not up a tree).",2600);return;}
  const S=c3S();S.bed=Math.round(player.x)-12;inv=inv.filter((t)=>t!=="bedkit");updateBag();$sx("pickup");shake=2;
  sparks(S.bed+12,C2_FLOOR-2,14,["#c87a2a","#2a6a3a","#8a5a32"],1.4,0.12,22);c2Save("forest");updateGuide();
  toast("<b>SLEEPING SPACE READY!</b><br>Log frame, springy pine boughs, dry leaves and a moss pillow. Press USE at it to sleep.",3800);}

/* ---------------- the stone workbench ---------------- */
var C3_MATS=["axe","whet","wood","vinea","vineb","vinec","bough","leaves","moss","fern"];
/* the crafting tree: tools first, then parts, then the bed */
var C3_REC=[
  {id:"axe2",tier:0,need:["axe","whet"],sci:"<b>SHARP AXE.</b> Grinding the blade on a wet whetstone scrapes away metal until the two faces meet in a thin edge. A thin edge puts your whole swing onto a tiny area, so the <b>pressure</b> (force &divide; area) is huge, and it cuts instead of bouncing off. Now you can chop!"},
  {id:"rope",tier:0,need:["vinea","vineb","vinec"],sci:"<b>BRAIDED ROPE.</b> Three strands twisted over each other share the load, and <b>friction</b> between them stops them sliding apart, so the rope is far stronger than any single vine."},
  {id:"poles",tier:0,need:["wood"],tool:"axe2",sci:"<b>TRIMMED POLES.</b> Knots and side branches are weak spots that also stop poles lying flat. Trimming them leaves straight poles that lash together tightly."},
  {id:"frame",tier:1,need:["poles","rope"],sci:"<b>BED FRAME.</b> Lashing poles together with rope makes a rigid frame. Bare ground pulls warmth out of you by <b>conduction</b>, far faster than still air does. A raised frame keeps you off it."},
  {id:"bedding",tier:1,need:["bough","leaves"],sci:"<b>SOFT BEDDING.</b> Pine boughs are springy and their waxy needles shed water. Dry leaves on top trap millions of tiny pockets of still air, and still air carries heat very badly. That is <b>insulation</b>: the same trick as a duvet."},
  {id:"pillow",tier:1,need:["moss","fern"],sci:"<b>PILLOW.</b> Dry moss and feathery fern fronds are both full of trapped air, so bundled together they're soft and warm."},
  {id:"bedkit",tier:2,need:["frame","bedding","pillow"],sci:"<b>SLEEPING SPACE.</b> Frame + bedding + pillow. When you are exhausted, sleep is when your body repairs muscles and your brain sorts out memories. Now carry it to dry ground and press USE to set it up."}];
var C3_TIER=["1. TOOLS + PARTS","2. BED PIECES","3. THE BED"];
function c3Ico(id){const e=items[id];return e?s(e.k,e.c):"";}
function c3Bench(){let el=qs("#c3Bench");
  if(!el){el=document.createElement("div");el.id="c3Bench";el.className="gov";el.hidden=!0;
    el.innerHTML='<div class="gcard c3bcard"><h3>THE STONE WORKBENCH</h3><p class="c3sub">A flat slab of rock, waist-high and smooth on top: nature\'s own workbench. Some things must be made before others.</p><div id="c3bMat"></div><div id="c3bRec"></div><div id="c3bMsg" aria-live="polite"></div><div class="btns"><button class="gbtn" id="c3bOk">DONE</button></div></div>';
    qs("#gm").appendChild(el);qs("#c3bOk").onclick=c3BenchClose;
    el.addEventListener("click",(ev)=>{const b=ev.target.closest&&ev.target.closest("[data-c3r]");b&&!b.disabled&&c3Craft(b.dataset.c3r);});}
  c3WireCss();c3BenchCss();modal=4;el.hidden=!1;c3BenchDraw(C3_REC.some((q)=>c3Has(q.id))?"":"Work through the tree from the top. <b>Sharpen the axe first</b>: the blunt one can't chop anything.");qs("#c3bOk").focus();}
function c3BenchCss(){if(qs("#c3BenchCss"))return;const st=document.createElement("style");st.id="c3BenchCss";
  st.textContent="#c3bRec .c3tier{font-size:7px;color:#8ab8ff;text-align:left;margin:6px 0 2px;border-bottom:1px solid #2a3a5a;padding-bottom:2px}#c3bRec .c3row{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}#c3bRec .c3tool{outline:2px dashed #ffe070;outline-offset:1px}#c3bRec .c3tl{font-size:6px;color:#ffe070}";
  document.head.appendChild(st);}
function c3BenchDraw(msg){const have=(k)=>inv.includes(k);
  qs("#c3bMat").innerHTML='<div class="c3mats">'+C3_MATS.map((k)=>'<span class="c3m'+(c3Got(k)?" ok":"")+'"><img src="'+c3Ico(k)+'" alt=""><i>'+Qt(items[k].n)+"</i><b>"+(c3Got(k)?"&#10004;":"?")+"</b></span>").join("")+"</div>";
  let h="";for(let t=0;t<3;t++){h+='<div class="c3tier">'+C3_TIER[t]+'</div><div class="c3row">'+C3_REC.filter((q)=>q.tier===t).map((q)=>{const made=c3Got(q.id),ok=q.need.every(have)&&(!q.tool||have(q.tool))&&!made;
    return'<div class="c3rec'+(made?" made":"")+'"><div class="c3in">'+q.need.map((k)=>'<img class="'+(have(k)||made?"":"no")+'" src="'+c3Ico(k)+'" alt="'+Qt(items[k].n)+'" title="'+Qt(items[k].n)+'">').join("<b>+</b>")+
      (q.tool?'<b>+</b><img class="c3tool'+(have(q.tool)||made?"":" no")+'" src="'+c3Ico(q.tool)+'" alt="'+Qt(items[q.tool].n)+' (tool, kept)" title="tool: kept">':"")+'<b>=</b><img src="'+c3Ico(q.id)+'" alt=""></div><div class="c3rn">'+Qt(items[q.id].n)+(q.tool?' <span class="c3tl">(TOOL KEPT)</span>':"")+'</div><button class="gbtn" data-c3r="'+q.id+'"'+(ok?"":" disabled")+">"+(made?"DONE":"CRAFT")+"</button></div>";}).join("")+"</div>";}
  qs("#c3bRec").innerHTML=h;msg!=null&&(qs("#c3bMsg").innerHTML=msg);}
function c3Craft(id){const q=C3_REC.find((x)=>x.id===id);if(!q||!q.need.every((k)=>inv.includes(k))||(q.tool&&!inv.includes(q.tool)))return;
  inv=inv.filter((k)=>!q.need.includes(k));inv.push(id);got.add(id);updateBag();updateGuide();$sx(id==="bedkit"?"success":"pickup");c2Save("forest");c3BenchDraw(q.sci);
  const nb=qs("#c3bRec button:not([disabled])");(nb||qs("#c3bOk")).focus();}
function c3BenchClose(){const el=qs("#c3Bench");if(!el||el.hidden)return;el.hidden=!0;modal=0;c2Save("forest");
  inv.includes("bedkit")&&!c3S().bed&&toast("<b>NOW PLACE IT.</b><br>Walk to any dry spot (not the murky water) and press USE.",3400);}

/* ---------------- forest cutscenes ---------------- */
function c3CutFin(c){const t=c.t,W=C3_FW;
  if(t<170)c3Walk(W-80,0.55);
  if(t===4)tnCap("So… thirsty… The smoke burned my throat raw.");
  if(t===170){player.walk=0;tnCap("Water!");}
  if(t===262)tnCap("…No. It's brown, it stinks, and it isn't moving. Drinking that could make me really sick.");
  if(t===440)tnCap("I can barely stand. I need sleep… a proper bed, up off the cold ground.");
  if(t===600)tnCap("That flat rock looks just like a workbench. Let's find materials.");
  c.cx=t<170?null:t<600?C3_POOLS[0].x-96:t<720?C3_FI.bench-96:null;
  if(t>=760){const S=c3S();S.fin=1;c2Save("forest");c3CutEnd();toast("<b>NEW GOAL</b><br>Find materials in the forest and build a comfortable sleeping space at the stone workbench.",4400);}}
function c3CutSleep(c){const S=c3S(),t=c.t;
  if(!c.at){if(c3Walk(S.bed+12,0.7)||t>150){c.at=t;player.walk=0;player.face=-1;}return;}
  const k=t-c.at;
  if(k===1)tnCap("Finally… a real bed. Well, almost.");
  if(k===70){C3.lie=1;$sx("land");}
  if(k>=130)C3.dark=Math.min(1,(k-130)/150);
  if(k===170)tnCap("");
  if(k===300){c.wait=1;S.slept=1;c2Save("forest");c3Dream(()=>{C3.cut={k:"wake",t:0,cx:null,wait:0};C3.dark=1;C3.lie=1;tnBars(1);qs("#cskip").hidden=!1;});}}
function c3CutWake(c){const t=c.t;C3.lie=t<200?1:0;C3.dark=t<40?1-t/40:0;
  if(t===50)tnCap("My heart's still pounding… a shark. In my dream.");
  if(t===200){player.face=-1;tnCap("At least I feel rested. But my throat… I'm SO thirsty.");}
  if(t===330)tnCap("I didn't drink a single drop yesterday. I need clean water, and soon.");
  if(t===470){tnCap("");const S=c3S();S.done=1;c3CutEnd();c4ForestEnter();updateGuide();$sx("stinger");
    toast("<b>DEHYDRATION: 45%</b><br>Watch the meter (top right). It rises faster in direct sun and slower in shade. At 100% you collapse.<br><b>Keep heading WEST (left).</b>",5600);}}

/* ---------------- "signal lost": the radio again, after the road ---------------- */
var C3L=null;
var C3_LOST=[[30,"you","Hello? Hello! It's me again. I made it past the road…"],[300,"you","Is anyone still there? Please, answer…"],[520,"radio","…kssshhhhhhhhh…"],[700,"you","Come on… come on…"],[900,"radio","[ SIGNAL LOST ]"],[1010,"you","Signal lost? No… no, no, NO!"]];
function c3LostRadio(done){let el=qs("#c3Lost");
  if(!el){el=document.createElement("div");el.id="c3Lost";el.className="gov";el.hidden=!0;
    el.innerHTML='<div class="gcard bzcard"><canvas id="c3lCv" width="384" height="216" aria-label="Close-up of the wired emergency radio"></canvas><div id="c3lLine" aria-live="polite"><span id="c3lWho"></span><span id="c3lTxt"></span></div><div class="btns"><button class="gbtn alt" id="c3lSkip">SKIP</button><button class="gbtn" id="c3lOk" hidden>PUT IT DOWN</button></div></div>';
    qs("#gm").appendChild(el);}
  c3RadioCss();modal=4;el.hidden=!1;const cv=qs("#c3lCv"),g=cv.getContext("2d");g.imageSmoothingEnabled=!1;
  C3L={f:200,done,line:-1,typed:0,stat:0,end:0,raf:0,last:performance.now(),acc:0,freq:88.1,lcd:"",wired:1};
  const ok=qs("#c3lOk"),sk=qs("#c3lSkip");ok.hidden=!0;sk.hidden=!1;
  const close=()=>{if(!C3L)return;cancelAnimationFrame(C3L.raf);const d=C3L.done;C3L=null;el.hidden=!0;modal=0;d&&d();};
  ok.onclick=close;sk.onclick=()=>{if(!C3L)return;C3L.f=1400;C3L.line=C3_LOST.length-1;C3L.typed=999;C3L.stat=0;c3LostShow();};el.__close=close;
  const loop=(now)=>{if(!C3L)return;C3L.raf=requestAnimationFrame(loop);const dt=Math.min(100,now-C3L.last);C3L.last=now;if(window.__evoPaused)return;C3L.acc+=dt;
    while(C3L.acc>=1000/60&&C3L){C3L.acc-=1000/60;c3LostStep();}if(!C3L)return;const keep=BZR;BZR=C3L;try{bzPaint(g);}finally{BZR=keep;}};
  c3LostShow();C3L.raf=requestAnimationFrame(loop);sk.focus();}
function c3RadioCss(){if(qs("#c3RadioCss"))return;const st=document.createElement("style");st.id="c3RadioCss";
  st.textContent="#c3Lost{z-index:40}#c3Lost .bzcard{width:min(760px,100%);max-height:calc(100vh - 16px);overflow:auto;text-align:center}#c3lCv{width:100%;max-height:calc(100vh - 200px);object-fit:contain;image-rendering:pixelated;background:#08070a;border:2px solid #2a3040;display:block;margin:6px auto}#c3lLine{min-height:44px;text-align:left;font-size:9px;line-height:1.8;padding:6px 8px;background:#05070ce6;border:2px solid #2a3a5a;margin:6px 0}#c3lWho{display:inline-block;margin-right:8px;padding:1px 5px;font-size:7px}#c3lLine.you #c3lWho{background:#3a6ad8;color:#fff}#c3lLine.radio #c3lWho{background:#d8a03a;color:#120a00}#c3lLine.radio #c3lTxt{color:#ffd88a}@media (max-height:500px){#c3lCv{max-height:48vh}#c3lLine{font-size:8px;min-height:36px}}";
  document.head.appendChild(st);}
function c3LostShow(){const R=C3L,L=qs("#c3lLine");if(!R)return;if(R.line<0){L.className="";qs("#c3lWho").textContent="";qs("#c3lTxt").textContent="";}
  else{const q=C3_LOST[R.line];L.className=q[1];qs("#c3lWho").textContent=q[1]==="you"?"YOU":"RADIO";qs("#c3lTxt").textContent=q[2].slice(0,Math.floor(R.typed));}
  if(R.f>=1350&&!R.end){R.end=1;qs("#c3lOk").hidden=!1;qs("#c3lSkip").hidden=!0;qs("#c3lOk").focus();}}
function c3LostStep(){const R=C3L;R.f++;const k=R.f-200;
  k===10&&$sx("click");if(k===40){$sx("beep");R.stat=1;}
  if(R.stat===1&&k%46===0)$sx("radio");if(R.stat===1&&k%60===30){$sx("tune");R.freq=Math.round((87.5+Math.random()*20.5)*10)/10;}
  if(k===900){R.stat=0;$sx("beep");setTimeout(()=>$sx("beep"),180);setTimeout(()=>$sx("beep"),360);}
  if(k>=900)R.lcd=((k/22)|0)%2?"SIGNAL LOST":" ";
  for(let i=C3_LOST.length-1;i>=0;i--)if(k>=C3_LOST[i][0]){if(R.line!==i){R.line=i;R.typed=0;}break;}
  if(R.line>=0){const q=C3_LOST[R.line][2];R.typed<q.length&&(R.typed+=q[0]==="["?2:0.9);}
  R.f>=1350&&(R.f=1350);c3LostShow();}
