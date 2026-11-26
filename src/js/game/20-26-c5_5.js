
/* ---------------- chapter 3: per-frame, drawing entry points, rain and mood ---------------- */
function c5Step(){const S=c5S();C5.t++;C5.fl>0&&C5.fl--;if(dead)return;
  const k=c5FlashK();if(k===34)$sx(C5.t%3?"rumble":"boom");
  if(C3.cut)return;if(c3TaskStep())return;
  if(room==="deck")c5DeckStep();else if(room==="helm")c5HelmStep();else c5MotorStep();}
function c5Back(){if(room==="helm")return c5HelmDraw();if(room==="deck")return c5DeckBack();return c5MotorBack();}
function c5Draw(){if(room==="deck")c5DeckDraw();}
function c5Rain(n,ang){for(let q=0;q<n;q++){const x=camX+((q*37+tick*(2.4+(q%3)*0.4))%218)-16,y=((q*23+tick*(6+(q%4)))%118)-8;ctx.globalAlpha=0.5;ctx.fillStyle=q%5?"#b8cce4":"#e8f2ff";ctx.fillRect(x,y,0.6,4+(q%3));ctx.globalAlpha=1;}
  for(let q=0;q<16;q++){const sx=camX+((q*71+tick*0.7)%190),sy=C2_FLOOR+1+(q*5)%9,ph=(tick*0.18+q*0.37)%1;ctx.globalAlpha=0.6*(1-ph);ctx.fillStyle="#d8ecff";ctx.fillRect(sx-ph*2,sy-ph*1.4,0.6+ph*3,0.5);ctx.globalAlpha=1;}}
function c5Front(){const S=c5S();
  if(room==="deck")c5Rain(110);
  else if(room==="motor"){for(let q=0;q<10;q++){const x=camX+((q*47+tick*0.3)%200),y=(q*17+tick*0.2)%100;ctx.globalAlpha=0.25;fill("#c8b898",x,y,0.6,0.6);ctx.globalAlpha=1;}}}
function c5Tint(){const S=c5S(),sm=S.sim,f=c5FlashAmt();
  if(room==="deck"){ctx.save();ctx.globalCompositeOperation="multiply";ctx.fillStyle="rgb(156,178,214)";ctx.fillRect(0,0,192,108);ctx.restore();
    const vg=C3.cache.c5vg||(C3.cache.c5vg=(()=>{const q=ctx.createRadialGradient(96,54,26,96,54,116);q.addColorStop(0,"rgba(0,0,10,0)");q.addColorStop(1,"rgba(0,0,12,.55)");return q;})());ctx.fillStyle=vg;ctx.fillRect(0,0,192,108);}
  else if(room==="motor"){const black=sm.black&&!S.gen.run;ctx.save();ctx.globalCompositeOperation="multiply";ctx.fillStyle=black?"rgb(70,40,40)":"rgb(214,186,160)";ctx.fillRect(0,0,192,108);ctx.restore();
    if(black){const a=0.1+0.08*Math.sin(tick/14);ctx.fillStyle="rgba(255,30,20,"+a+")";ctx.fillRect(0,0,192,108);}
    const vg=C3.cache.c5vm||(C3.cache.c5vm=(()=>{const q=ctx.createRadialGradient(96,54,30,96,54,120);q.addColorStop(0,"rgba(0,0,0,0)");q.addColorStop(1,"rgba(10,4,0,.55)");return q;})());ctx.fillStyle=vg;ctx.fillRect(0,0,192,108);}
  else{const vg=C3.cache.c5vh||(C3.cache.c5vh=(()=>{const q=ctx.createRadialGradient(96,54,40,96,54,120);q.addColorStop(0,"rgba(0,0,0,0)");q.addColorStop(1,"rgba(0,4,8,.5)");return q;})());ctx.fillStyle=vg;ctx.fillRect(0,0,192,108);}
  if(room!=="helm"&&f>0.02){ctx.fillStyle="rgba(205,222,255,"+0.42*f+")";ctx.fillRect(0,0,192,108);}
  if(C3.dark>0){ctx.fillStyle="rgba(0,0,4,"+C3.dark+")";ctx.fillRect(0,0,192,108);}}
/* ---------------- items ---------------- */
Object.assign(items,{
  ckeyc:{n:"Control Room Key",k:"q4ckeyc",c:"#d8b02a",where:"A CARGO CONTAINER (the ship's deck)",why:"A brass key with a tag: CONTROL ROOM.",info:"It opens the steel door at the end of the deck."},
  gbelt:{n:"Rubber Drive Belt",k:"q4gbelt",c:"#3a3a3e",where:"THE MOTOR ROOM",why:"A loop of tough rubber.",info:"It carries the engine's spin to the generator."},
  gwire:{n:"Copper Wire",k:"q4gwire",c:"#c87a3a",where:"THE MOTOR ROOM",why:"A spool of enamelled copper wire.",info:"Wound into a coil for the generator."},
  gfuse:{n:"Fuse",k:"q4gfuse",c:"#c8d8e0",where:"THE MOTOR ROOM",why:"A glass fuse with a thin wire inside.",info:"A deliberate weak link that protects the circuit."}});
Object.assign(Xt,{
  ckeyc:{what:"A brass key on a plastic tag marked CONTROL ROOM, hanging inside one of the cargo containers.",sci:"Inside a lock, little spring-loaded pins block the door. The bumps on the right key lift each pin to exactly the right height, so the lock can turn.",real:"Ships use tagged keys so every door can be found in a hurry.",how:"Use it on the steel door at the end of the deck.",safe:"",fact:""},
  gbelt:{what:"A thick loop of black rubber, the kind that links an engine to the machines it drives.",sci:"A belt grips two wheels by FRICTION. When one wheel turns, the belt drags the other round with it. Rubber grips well and bends easily.",real:"Car engines use belts for the alternator, the water pump and the air conditioning.",how:"Fit it between the engine and the generator's rotor.",safe:"Keep fingers away from a moving belt.",fact:""},
  gwire:{what:"A spool of fine copper wire with a thin varnish coating.",sci:"Copper is an excellent conductor: its electrons move easily. The varnish insulates each turn from the next, so the current has to follow the whole length of wire. More turns in a coil make more voltage.",real:"Electric motors, transformers, generators and speakers are all coils of copper wire.",how:"Wind it round the stator core of the generator.",safe:"",fact:""},
  gfuse:{what:"A small glass tube with a thin metal wire inside.",sci:"If too much current flows, the thin wire heats up and melts, opening the circuit before the cables overheat and catch fire.",real:"Every plug, car and house has fuses or circuit breakers.",how:"Fit it into the generator's fuse holder.",safe:"Never replace a fuse with a coin or foil.",fact:"The first fuses were used in the 1800s to protect telegraph lines from lightning."}});
Object.assign(C3K,{q4ckeyc:1,q4gbelt:1,q4gwire:1,q4gfuse:1});Object.assign(C4_ICONS,{q4ckeyc:1,q4gbelt:1,q4gwire:1,q4gfuse:1});
{const _ic=c4IconCv;c4IconCv=function(t){const k=t.replace(/^q4/,"");if(["ckeyc","gbelt","gwire","gfuse"].indexOf(k)<0)return _ic(t);
  const o=c3Cv(24,24),g=o.getContext("2d"),n=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(x,y,w,h);};n("#0a0c14",2,2,20,20);
  if(k==="ckeyc"){n("#d8b02a",4,9,7,7);n("#0a0c14",6,11,3,3);n("#d8b02a",11,11,10,3);n("#d8b02a",17,14,2,3);n("#fff0a0",4,9,7,1);n("#3a8ad8",2,16,6,5);n("#ffffff",3,17,4,1);}
  else if(k==="gbelt"){g.strokeStyle="#1a1a1c";g.lineWidth=4;g.beginPath();g.ellipse(12,12,8,5,0,0,7);g.stroke();g.strokeStyle="#4a4a50";g.lineWidth=1.5;g.stroke();n("#8a8a90",5,8,2,2);n("#8a8a90",17,14,2,2);}
  else if(k==="gwire"){n("#4a3a28",5,5,14,3);n("#4a3a28",5,16,14,3);n("#c87a3a",6,8,12,8);for(let q=0;q<4;q++)n("#e8964a",6,8+q*2,12,1);n("#2a1e14",10,5,4,14);}
  else{n("#8a8a90",4,10,3,4);n("#8a8a90",17,10,3,4);n("#c8d8e0",7,8,10,8);n("#ffffff",8,8,8,1);n("#ffd23a",8,12,8,1);n("#6a8aa0",7,15,10,1);}
  return o;};}
/* ---------------- wrappers for the older globals ---------------- */
{const _esc=window.__bzEsc;window.__bzEsc=()=>{if(c5Esc())return!0;return _esc?_esc():!1;};}
{const _cl=c3CloseAll;c3CloseAll=function(){try{c5CloseAll();}catch(e){}_cl();};}
{const _r=window.__evoRoom;window.__evoRoom=()=>{if(c5Is()&&C3&&!C3.dreamOn)return room==="motor"?"motor_ship":"deck_storm";return _r();};}
GM.c3.c5=()=>c5S();GM.c3.C5=()=>C5;GM.c3.pry=()=>C5PR&&{n:C5PR.n,f:C5PR.f,e:C5PR.e,cfg:c5PryCfg()};GM.c3.sim=()=>c5S().sim;GM.c3.paper=()=>tnShowPaper(()=>{});
Object.assign(GM.c3,{sum:()=>c5Summary(),title:()=>c5TitleCard(),endcard:()=>c5End(),pryAct:(a)=>c5PryAct(a),pryClose:()=>c5PryClose(),loot:()=>qs("#c5Loot")&&!qs("#c5Loot").hidden,gen:()=>C5GN&&{step:C5GN.step,rpm:C5GN.rpm,hold:C5GN.hold},genAct:(a)=>c5GenAct(a),cells:()=>C5_CELLS,wps:()=>C5_WP,setSim:(o)=>Object.assign(c5S().sim,o)});
/* ---------------- developer tools: chapter 3 ---------------- */
C3_DEVBTN.push(["CHAPTER 3: SHIP DECK",[["c3_xsum","SHOW CHAPTER 2 SUMMARY"],["c3_xtitle","SHOW CHAPTER 3 TITLE"],["c3_xdeck","DECK: START (INTRO CUTSCENE)"],["c3_xdeck2","DECK: SKIP TO THE DOOR TRY"],["c3_xtry","OPEN THE DOOR TRY SCREEN"],["c3_xwhere","SHOW WHICH CONTAINER HAS THE KEY"],["c3_xpry","PRY CONTAINER 1 NOW"],["c3_xkey","GIVE THE KEY"],["c3_xdoor","PLAY THE DOOR-OPENING CUTSCENE"]]],
  ["CHAPTER 3: CONTROL ROOM",[["c3_xhelm","HELM: GO (RADAR STEERING)"],["c3_xwp","HELM: JUMP NEXT TO THE BLUE CIRCLE"],["c3_xjam","HELM: FORCE ENGINE JAM"],["c3_xblack","HELM: TRIGGER THE POWER FAILURE"],["c3_xhull","HELM: HULL BACK TO 5"],["c3_xgod","HELM: NO STORM DAMAGE (TOGGLE)"],["c3_xpower","PLAY 'POWER RESTORED' CUTSCENE"],["c3_xarr","PLAY THE ARRIVAL ENDING"]]],
  ["CHAPTER 3: MOTOR ROOM",[["c3_xmotor","MOTOR ROOM (ENGINE JAMMED)"],["c3_xmotor2","MOTOR ROOM (POWER OUT)"],["c3_xmat","GIVE BELT + WIRE + FUSE"],["c3_xgen","OPEN THE GENERATOR SCREEN"],["c3_xclean","MARK ENGINE CLEAN"],["c3_xreset","RESET CHAPTER 3"]]]);
var C5_GODSTORM=0;
{const _pre=c3DevPre;c3DevPre=function(a){_pre(a);if(a==="deck"||a==="helm"||a==="motor"){const S=c3S();Object.assign(S,{wired:1,hints:10,road:1,half:1,roadDone:1,fin:1,slept:1,done:1});
    const s4=c3S().c4=Object.assign(c4Fresh(),{on:1,seen:1,note:1,arr:1,bridge:1,bcol:1,drank:1,end:1,gone:1});s4.pt.done=1;s4.pt.crow=1;["pcrow"].forEach((k)=>{inv.includes(k)||inv.push(k);got.add(k);});updateBag();
    const S5=c5S();S5.on=1;if(a==="helm"||a==="motor"){S5.intro=1;S5.tried=1;S5.hasKey=1;S5.door=1;S5.sim.ig=1;}}};}
{const _dev=c3Dev;c3Dev=function(a){if(a.slice(0,4)!=="c3_x")return _dev(a);c5Dev(a);};}
{const _inf=c3DevInfo;c3DevInfo=function(){let t=_inf();if(c5Is()){const S=c5S(),sm=S.sim;t+="\nch3 "+room+(C3.cut?" cut:"+C3.cut.k+" "+C3.cut.t:"")+"\nkey in container "+(S.key+1)+" opened "+S.opened.join("")+(room==="helm"?"\nwp "+sm.wp+" hull "+sm.hull+" jam "+sm.jam+"/"+sm.jams+" black "+sm.black+" x "+sm.x.toFixed(0)+" y "+sm.y.toFixed(0):"");}return t;};}
function c5DevGo(rm){modal=0;Oo=0;Do.hidden=!0;qs("#gd").hidden=!0;dead=!1;hp=Math.max(hp,5);c3CloseAll();C3.once={};c3DevPre(rm);enterRoom(rm,"L");}
function c5PickKey(){const S=c5S();if(S.key<0)S.key=Math.floor(Math.random()*5);return S.key;}
function c5Dev(a){const close=()=>{modal=0;Oo=0;Do.hidden=!0;},S=c5S();c5PickKey();
  if(a==="c3_xsum"){close();c3CloseAll();c5Summary();return;}
  if(a==="c3_xtitle"){close();c3CloseAll();c5TitleCard();return;}
  if(a==="c3_xdeck"){c3DevPre("deck");S.intro=0;S.tried=0;S.hasKey=0;S.door=0;S.opened=[0,0,0,0,0];S.tr=[0,0,0];S.keyToast=0;S.key=-1;c5PickKey();inv=inv.filter((k)=>k!=="ckeyc");c5DevGo("deck");return;}
  if(a==="c3_xdeck2"){c3DevPre("deck");S.intro=1;S.tried=0;S.hasKey=0;S.door=0;S.opened=[0,0,0,0,0];S.tr=[0,0,0];c5DevGo("deck");player.x=440;return;}
  if(a==="c3_xtry"){if(room!=="deck"){toast("Go to the deck first.",1500);return;}close();c5TryOpen();return;}
  if(a==="c3_xwhere"){close();toast("<b>The key is in container "+(S.key+1)+"</b> (numbered 1-5 from the left).",4200);return;}
  if(a==="c3_xpry"){if(room!=="deck"){toast("Go to the deck first.",1500);return;}close();S.tried=1;c5PryOpen(0);return;}
  if(a==="c3_xkey"){S.hasKey=1;S.tried=1;inv.includes("ckeyc")||inv.push("ckeyc");got.add("ckeyc");updateBag();updateGuide();close();toast("Key added.",1400);return;}
  if(a==="c3_xdoor"){if(room!=="deck"){toast("Go to the deck first.",1500);return;}close();S.hasKey=1;S.tried=1;c3CutStart("c5door");return;}
  if(a==="c3_xhelm"){c3DevPre("helm");const sm=S.sim;Object.assign(sm,{x:0,y:0,h:0,wp:0,hull:5,jam:0,jams:0,black:0,fin:0,wheel:0,pw:0,ig:1});S.gen.run=0;S.cl={off:0,open:0,n:0,tg:[1,1,1,1,1,1],done:0};c5DevGo("helm");return;}
  if(a==="c3_xwp"){const sm=S.sim,W=C5_WP[sm.wp];if(room!=="helm"||!W){toast("Only at the helm, before the last waypoint.",1600);return;}close();sm.x=W[0]-4*Math.sin(sm.h);sm.y=W[1]-4*Math.cos(sm.h);sm.h=Math.atan2(W[0]-sm.x,W[1]-sm.y);return;}
  if(a==="c3_xjam"){S.sim.jam=1;S.cl={off:0,open:0,n:0,tg:[1,1,1,1,1,1],done:0};close();updateGuide();toast("Engine jammed.",1400);return;}
  if(a==="c3_xblack"){if(room!=="helm"){toast("Go to the helm first.",1500);return;}close();S.sim.fin=1;c3CutStart("c5black");return;}
  if(a==="c3_xhull"){S.sim.hull=5;close();updateGuide();toast("Hull restored.",1200);return;}
  if(a==="c3_xgod"){C5_GODSTORM^=1;close();toast("Storm damage: "+(C5_GODSTORM?"OFF":"ON"),1400);return;}
  if(a==="c3_xpower"){if(room!=="helm"){toast("Go to the helm first.",1500);return;}close();c3CutStart("c5power");return;}
  if(a==="c3_xarr"){if(room!=="helm"){toast("Go to the helm first.",1500);return;}close();S.sim.wp=5;c3CutStart("c5arr");return;}
  if(a==="c3_xmotor"){c3DevPre("motor");S.sim.jam=1;S.sim.black=0;S.cl={off:0,open:0,n:0,tg:[1,1,1,1,1,1],done:0};c5DevGo("motor");return;}
  if(a==="c3_xmotor2"){c3DevPre("motor");S.sim.jam=0;S.sim.black=1;S.sim.fin=1;S.gen.run=0;S.mat={belt:0,wire:0,fuse:0};c5DevGo("motor");return;}
  if(a==="c3_xmat"){S.mat={belt:1,wire:1,fuse:1};["gbelt","gwire","gfuse"].forEach((k)=>{inv.includes(k)||inv.push(k);got.add(k);});updateBag();updateGuide();close();toast("Materials added.",1400);return;}
  if(a==="c3_xgen"){if(room!=="motor"){toast("Go to the motor room first.",1500);return;}S.mat={belt:1,wire:1,fuse:1};close();c5GenOpen();return;}
  if(a==="c3_xclean"){S.cl={off:0,open:1,n:6,tg:[0,0,0,0,0,0],done:1};S.sim.jam=0;S.sim.jams++;close();updateGuide();toast("Engine marked clean.",1400);return;}
  if(a==="c3_xreset"){c3S().c5=c5Fresh();close();c3CloseAll();toast("Chapter 3 progress reset.",1600);return;}}
GM.c3.px=(x)=>{player.x=x;};
GM.c3.dev=(a)=>c3Dev(a);GM.c3.wireOpen=(cb)=>{c3S().wired=0;c3S().cp=0;["radio","batts"].forEach((k)=>{inv.includes(k)||inv.push(k);got.add(k);});c3WireOpen(cb);};
