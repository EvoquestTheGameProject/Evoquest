/* ======================= PART 6C: THE EMERGENCY ROUTE (total darkness) =======================
   You can't see anything. SCREAM (F / K / the red button): the sound travels out, bounces off the walls, steps and gaps and
   the echo draws them for a moment (echolocation, like a bat or a ship's sonar). Some floor pads are touch-sensitive and
   armed: TAP ahead with the crowbar (J / punch) to feel for them, and jump over the armed ones. At the end, three pads
   play three notes: tap them from the lowest note to the highest to unlock the door. */
/* floor profile: [x0, x1, y at x0, y at x1]. A different y means a staircase (3.4-unit steps). Gaps are simply missing. */
const P6_KSEG=[[0,120,270,270],[120,232,270,232],[232,350,232,232],[378,420,232,232],[420,560,232,178],[560,700,178,178],[700,820,178,118],[820,920,118,118],[952,1000,118,118],[1000,1140,118,170],[1140,1520,170,170]];
const P6_KGAP=[[350,378],[920,952]];
const P6_KSTEP=3.6,P6_KCEIL=50,P6_KDOOR=1496;
/* pads: trap pads are armed; tone pads play a note (rank 0 = lowest) */
const P6_KPADS=[{x:262,k:"trap"},{x:276,k:"safe"},{x:290,k:"trap"},{x:304,k:"safe"},{x:318,k:"safe"},{x:602,k:"safe"},{x:616,k:"trap"},{x:630,k:"safe"},{x:644,k:"trap"},{x:658,k:"safe"},{x:848,k:"safe"},{x:862,k:"trap"},{x:876,k:"safe"},{x:890,k:"trap"},
  {x:1215,k:"tone",rank:1,f:392},{x:1262,k:"tone",rank:2,f:587},{x:1309,k:"tone",rank:0,f:262}];
var P6K={t:0,cd:0,pulses:[],pad:[],tap:null,flash:0,zap:0,seq:[],open:0,fall:0,lastY:0,geo:null,drip:0,lock:0};
rooms.dark.ints.push({id:"c5_klad",x:34,r:0,label:"THE LADDER"},{id:"c5_klock",x:584,r:0,label:"OPEN THE LOCKER"},{id:"c5_kdoor",x:P6_KDOOR-6,r:0,label:"THE DOOR"});
function p6KFloor(x){for(const g of P6_KGAP)if(x>g[0]&&x<g[1])return 400;
  for(const s of P6_KSEG){if(x>=s[0]&&x<s[1]){if(s[2]===s[3])return s[2];const n=Math.max(1,Math.round(Math.abs(s[3]-s[2])/P6_KSTEP)),w=(s[1]-s[0])/n,k=Math.min(n-1,Math.floor((x-s[0])/w)),h=(s[3]-s[2])/n;return s[2]+h*(k+1);}}
  return x<0?270:170;}
/* the floor under the player: a dynamic property, read by the engine's physics */
Object.defineProperty(rooms.dark,"fy",{get(){return p6KFloor(player.x);},configurable:!0});
function p6KGeo(){if(P6K.geo)return P6K.geo;const G=[];
  /* floor and ceiling lines */
  for(let x=0;x<P6_KW;x+=1.5){const y=p6KFloor(x);if(y>=400)continue;G.push({x,y,k:"f"});G.push({x,y:y-P6_KCEIL,k:"c"});}
  /* risers on every staircase */
  for(const s of P6_KSEG){if(s[2]===s[3])continue;const n=Math.max(1,Math.round(Math.abs(s[3]-s[2])/P6_KSTEP)),w=(s[1]-s[0])/n,h=(s[3]-s[2])/n;for(let k=0;k<n;k++){const x=s[0]+k*w,y0=s[2]+h*k,y1=s[2]+h*(k+1);for(let q=0;q<=4;q++)G.push({x,y:y0+(y1-y0)*q/4,k:"f"});}}
  /* gaps: the edges and the pit below */
  for(const g of P6_KGAP){const y=p6KFloor(g[0]-1);for(let q=0;q<14;q++){G.push({x:g[0],y:y+q*2.5,k:"f"});G.push({x:g[1],y:y+q*2.5,k:"f"});}for(let x=g[0];x<=g[1];x+=2)G.push({x,y:y+34,k:"f"});}
  /* pillars */
  for(let x=60;x<P6_KW;x+=150){const y=p6KFloor(x);if(y>=400)continue;for(let q=0;q<=P6_KCEIL;q+=2.4){G.push({x,y:y-q,k:"p"});G.push({x:x+2,y:y-q,k:"p"});}}
  /* the ladder at the start and the dead end behind it */
  for(let q=0;q<60;q+=3){G.push({x:30,y:270-q,k:"s"});G.push({x:38,y:270-q,k:"s"});}for(let q=0;q<60;q+=8)for(let x=30;x<=38;x+=2)G.push({x,y:270-q,k:"s"});
  for(let y=170-P6_KCEIL;y<=170;y+=2)G.push({x:P6_KDOOR+10,y,k:"w"});
  /* signs only the echo shows: a warning mark before each pad field */
  P6K.signs=[{x:240,y:232-30,t:"warn"},{x:584,y:178-30,t:"warn"},{x:836,y:118-30,t:"warn"},{x:1180,y:170-30,t:"tone"},{x:P6_KDOOR-30,y:170-26,t:"bars"},{x:584,y:178-18,t:"locker"},{x:P6_KDOOR,y:170-20,t:"door"}];
  return(P6K.geo=G);}
/* ---------------- state ---------------- */
function p6DarkInit(resp){const S=p6S(),K=P6K;K.t=0;K.cd=0;K.pulses=[];K.tap=null;K.flash=0;K.zap=0;K.seq=[];K.open=S.kex?1:0;K.fall=0;K.lock=0;
  K.pad=P6_KPADS.map((p)=>Object.assign({lit:0,known:!!(S.pads&&S.pads[p.x])},p));p6KGeo();
  player.y=p6KFloor(S.kcp||56);player.vx=player.vy=0;
  if(resp)player.x=S.kcp||56;}
function p6DarkRespawn(){const S=p6S();p6DarkInit(!0);player.face=1;camX=c3Clamp(player.x-96,0,P6_KW-192);}
function p6KPulse(x,y,R,sp,col){P6K.pulses.push({x,y,t0:P6K.t,R,sp,col:col||0});if(P6K.pulses.length>5)P6K.pulses.shift();}
function p6KScream(){const S=p6S(),K=P6K;if(K.cd>0)return;K.cd=40;S.screamed=1;p6Scream();$sx("whoosh");shake=Math.max(shake,2);player.punch=0;
  const x=player.x,y=player.y-20;p6KPulse(x,y,260,2.2);
  /* the nearest solid thing decides how late the echo comes back */
  let best=1e9;for(const g of K.geo){if(Math.abs(g.x-x)>200)continue;const d=Math.hypot(g.x-x,g.y-y);if(d<best&&d>6)best=d;}p6Echo(best);}
function p6KTap(){const S=p6S(),K=P6K;if(K.tap&&K.tap.t<14)return;const tx=player.x+player.face*13;K.tap={t:0,x:tx,done:0};player.punch=12;$sx("clank");p6Tone(900,0.08,"square",0.05,600);
  p6KPulse(tx,player.y-2,22,0.9,1);}
function p6KZap(pad){const K=P6K,S=p6S();pad.known=1;pad.lit=160;S.pads[pad.x]=1;K.flash=1;K.zap=1;C3.stun=44;player.kb=10;player.kbv=-1.8*player.face;player.vy=-2;shake=Math.max(shake,8);$sx("sizzle");$sx("hurt");p6Tone(200,0.4,"sawtooth",0.09,60);p6Noise(0.3,0.1,3000,0.6);
  for(let q=0;q<14;q++)parts.push({x:pad.x,y:player.y-2,vx:(Math.random()-0.5)*2.4,vy:-Math.random()*2,g:0.1,life:22,c:q%2?"#9ae8ff":"#ffffff",s:1});
  toast("<b>ZAP!</b> An armed pad. It is marked now. Tap ahead with the crowbar (J) to find them, then jump over.",3400);}
/* ---------------- per-frame ---------------- */
function p6LabWarmStep(){const n=P6.labWarm||0;if(n>=40)return;P6.labWarm=n+1;const sp=[p6SprBench,p6SprBlueprint,p6SprCart,p6SprSamples,p6SprSteelShelf,p6SprToolCab,p6SprDrawers,p6SprPipePanel,p6SprLocker,p6SprDesk,p6SprTv,p6SprTapeShelf,p6SprPower,p6SprDoor,p6SprMonitor,p6SprTubeBase,p6SprTubeTop,p6SprTubeGlass];
  if(n<10)c5Tile("slab",n,C2.slab.seeds[n]);else if(n<10+sp.length)sp[n-10]();else if(n<10+sp.length+8)p6SubjSprite(n-10-sp.length);}
function p6DarkStep(){const S=p6S(),K=P6K;if(dead)return;P6.t++;if(K.t%30===0)p6LabWarmStep();C7.t++;K.t++;K.cd>0&&K.cd--;K.flash>0&&(K.flash=Math.max(0,K.flash-0.06));gunCd=Math.max(gunCd,30);
  if(!K.geo)p6DarkInit(0);
  K.pulses=K.pulses.filter((p)=>K.t-p.t0<(p.R/p.sp)+140);
  if(K.tap){K.tap.t++;if(K.tap.t===5&&!K.tap.done){K.tap.done=1;p6KTapHit();}if(K.tap.t>20)K.tap=null;}
  /* a drip, now and then, in the dark */
  if(K.t%150===0&&Math.random()<0.6)p6Tone(1500+Math.random()*900,0.05,"sine",0.02,700);
  if(C3.cut)return;if(modal)return;if(c3TaskStep())return;
  if(shootBuf>0){shootBuf=0;p6KScream();}
  if(punchBuf>0){punchBuf=0;p6KTap();}
  /* stairs: stay glued to the steps when walking down */
  const fy=p6KFloor(player.x);
  if(player.on&&player.vy>=0&&fy<390&&Math.abs(fy-player.y)<P6_KSTEP+1.4)player.y=fy;
  /* armed pads */
  for(const pd of K.pad){pd.lit>0&&pd.lit--;if(pd.k==="trap"&&player.on&&Math.abs(player.x-pd.x)<3.9&&!K.zap&&!C3.stun)p6KZap(pd);}
  if(K.zap&&!C3.stun)K.zap=0;
  /* falling into a gap */
  for(const g of P6_KGAP)if(player.x>g[0]-2&&player.x<g[1]+2&&player.y>p6KFloor(g[0]-1)+18){p6KFell();return;}
  if(player.y>294){p6KFell();return;}
  /* checkpoints on each landing */
  const cps=[56,250,430,570,720,860,960,1130,1180];for(const c of cps)if(player.x>=c&&c>(S.kcp||0)&&player.on){S.kcp=c;c2Save("dark");}
  if(K.lock>0)K.lock--;
  if(P6K.open)K.doorOpen=Math.min(1,(K.doorOpen||0)+0.02);
  if(player.x>P6_KDOOR-2&&K.open&&!C3.cut){c2Save("slab");c7Go("slab","dark");return;}
  c5Pick((it)=>{const k=it.id.slice(3);if(k==="klad")return{r:18,label:"THE LADDER"};if(k==="klock")return S.locker?null:{r:16,label:"OPEN THE LOCKER"};if(k==="kdoor")return{r:22,label:K.open?"GO THROUGH":"THE DOOR"};return null;});
  if(!S.kt1&&player.x>205&&S.screamed){S.kt1=1;toast("<b>TOUCH PADS.</b> Some pads in the floor are armed and zap whatever steps on them. Tap ahead with the crowbar (<b>J</b>) to feel for them. A tapped pad glows: <span style=\"color:#ff7a6a\">red = armed</span>.",8000);}}
function p6KTapHit(){const K=P6K,S=p6S();let any=0;
  for(const pd of K.pad){if(Math.abs(pd.x-K.tap.x)>16)continue;any=1;
    if(pd.k==="trap"){pd.known=1;pd.lit=160;S.pads[pd.x]=1;p6Tone(150,0.35,"sawtooth",0.07,100);$sx("locked");p6Tip("trap","<b>BZZZT!</b> The pad flashes <b>red</b> and buzzes: it's <b>armed</b>. Jump over it!",3600);}
    else if(pd.k==="safe"){pd.lit=70;p6Tone(520,0.1,"triangle",0.05);}
    else{pd.lit=120;p6Tone(pd.f,0.7,"sine",0.14);p6Tone(pd.f*2,0.5,"sine",0.04);
      if(!K.open){if(K.seq.includes(pd.rank)){}else if(pd.rank===K.seq.length){K.seq.push(pd.rank);if(K.seq.length===1)p6Tip("tone","<b>A NOTE.</b> Three pads, three notes. Which order opens the door? Three bars were carved on the wall: <b>short, medium, tall</b>.",5600);if(K.seq.length===3)setTimeout(p6KUnlock,500);}
        else{K.seq=[];setTimeout(()=>{p6Tone(110,0.4,"sawtooth",0.08,80);$sx("locked");for(const q of K.pad)if(q.k==="tone")q.lit=0;},300);toast("<b>BZZT.</b> Wrong order. Tap them from the LOWEST note to the HIGHEST.",3400);}}}}
  if(!any)p6Tone(300,0.05,"square",0.03);}
function p6KUnlock(){const K=P6K,S=p6S();if(K.open)return;K.open=1;S.kex=1;$sx("door");$sx("clank");p6Tone(110,0.8,"sawtooth",0.1,70);shake=Math.max(shake,8);K.flash=0.6;c2Save("dark");updateGuide();toast("<b>CLUNK.</b> Something heavy slides aside at the end of the hall, and a thin line of <b>light</b> spills in.",5200);}
function p6KFell(){const S=p6S();shake=Math.max(shake,6);$sx("land");p6Tone(160,0.5,"sine",0.12,50);player.vx=player.vy=0;toast("<b>YOU FELL.</b> There was a gap. Scream first: the echo comes back late over a drop. Back to the last landing.",4200);p6DarkRespawn();}
function p6DarkUse(e){const k=e.id.slice(3),S=p6S();if(C3.cut||C3.task)return!0;
  if(k==="klad"){$sx("clank");toast("The ladder ends at a sealed hatch. It won't move: something holds it shut from above.",3000);return!0;}
  if(k==="klock"){c3Task("gather",584,26,()=>{S.locker=1;if(!inv.includes("vhs1")){inv.push("vhs1");got.add("vhs1");S.tapes.push("vhs1");}updateBag();$sx("pickup");c2Save("dark");updateGuide();toast("<b>A VHS TAPE!</b> Inside an emergency locker, wrapped in a plastic bag, with a faded label. Somewhere in the next chamber there might be a TV and a player.",6200);},"#9ab0c8");return!0;}
  if(k==="kdoor"){if(P6K.open){return!0;}$sx("locked");toast("A heavy sliding door. No handle, no lock: just <b>three touch pads</b> on the floor in front of it.",3600);return!0;}return!0;}
function p6DarkGuide(){const S=p6S(),K=P6K;
  if(!S.screamed)return p6Q("<b>It's pitch black.</b><br>Press <b>F / K</b> (or the SHOOT button) to <b>SCREAM</b>. The echo will show the way.");
  if(K.open)return p6Q("<b>The door is open.</b><br>Go through it, to the end of the hall.");
  if(S.kcp>=1130)return p6Q("<b>Unlock the door.</b><br>Tap the 3 pads with the crowbar (<b>J</b>), lowest note first, highest last.");
  return p6Q("<b>Find the way through the dark.</b><br>&#9679; <b>F / K</b>: scream, the echo shows walls, stairs and gaps<br>&#9679; <b>J</b>: tap ahead with the crowbar to find armed pads<br>&#9679; Climb the stairs, jump the gaps");}
function p6DarkArrow(){}
/* ---------------- drawing: the echo ---------------- */
function p6KAlpha(x,y){let a=0;const pd=Math.hypot(x-player.x,y-(player.y-12));if(pd<38)a=0.7*(1-pd/38);for(const p of P6K.pulses){const age=P6K.t-p.t0,front=age*p.sp,d=Math.hypot(x-p.x,y-p.y);if(d>front||d>p.R)continue;const since=age-d/p.sp,v=Math.max(0,1-since/(p.col?70:300))*(1-d/p.R*0.8);a=Math.max(a,since<5?Math.min(1,v+0.5):v);}return a;}
function p6DarkBack(){const g=C2_FLOOR,K=P6K,S=p6S(),T=K.t;if(!K.geo)return;
  ctx.fillStyle="#000";ctx.fillRect(camX-2,camY-2,196,112);
  /* geometry the echo has lit */
  {const x0=camX-8,x1=camX+200,y0=camY-8,y1=camY+116;for(const q of K.geo){if(q.x<x0||q.x>x1||q.y<y0||q.y>y1)continue;const a=p6KAlpha(q.x,q.y);if(a<0.04)continue;ctx.globalAlpha=Math.min(1,a);fill(q.k==="f"?"#bff4ff":q.k==="c"?"#6ab0d8":q.k==="p"?"#7ac0e8":q.k==="s"?"#ffe9a0":"#9ae8ff",q.x-0.5,q.y-0.5,1,1);}ctx.globalAlpha=1;
    for(const s of K.signs){if(s.x<camX-20||s.x>camX+212)continue;const a=p6KAlpha(s.x,s.y);if(a<0.05)continue;ctx.globalAlpha=Math.min(1,a*1.2);p6KSign(s);}ctx.globalAlpha=1;}
  /* a faint arrow always points the way on, and drops are marked in red */
  if(!K.open||true){const a=0.35+0.2*Math.sin(T/10);ctx.globalAlpha=a;for(let q=0;q<3;q++){const ax=player.x+16+q*5+(T%20)*0.2;ctx.fillStyle="#9aff9a";ctx.fillRect(ax,player.y-30-q*0.5,0.8,3);ctx.fillRect(ax+0.8,player.y-29.2,0.8,1.6);}ctx.globalAlpha=1;}
  for(const gp of P6_KGAP){const lv=p6KFloor(gp[0]-1);if(Math.abs(player.x-gp[0])<70){ctx.globalAlpha=0.55+0.2*Math.sin(T/6);fill("#ff5a4a",gp[0]-0.5,lv-1,1,4);fill("#ff5a4a",gp[1]-0.5,lv-1,1,4);glow(gp[0],lv,10,"255,60,40",0.4);glow(gp[1],lv,10,"255,60,40",0.4);ctx.globalAlpha=1;}}
  /* the sound itself, as expanding rings */
  for(const p of K.pulses){const age=K.t-p.t0,r=age*p.sp;if(r>p.R)continue;ctx.strokeStyle="rgba(170,230,255,"+(0.5*(1-r/p.R))+")";ctx.lineWidth=0.5;ctx.beginPath();ctx.arc(p.x,p.y,r,0,7);ctx.stroke();if(!p.col){ctx.strokeStyle="rgba(170,230,255,"+(0.2*(1-r/p.R))+")";ctx.beginPath();ctx.arc(p.x,p.y,r*0.82,0,7);ctx.stroke();}}
  /* the pads */
  for(const pd of K.pad){if(pd.x<camX-12||pd.x>camX+204)continue;const y=p6KFloor(pd.x);if(y>=390)continue;
    const on=pd.lit>0,col=pd.k==="trap"?"#ff4a3a":pd.k==="tone"?["#5aa8ff","#6aff9a","#ffd23a"][pd.rank]:"#6aff9a";
    if(on||(pd.known&&pd.k==="trap")){const a=on?Math.min(1,pd.lit/30):0.35+0.1*Math.sin(T/10);ctx.globalAlpha=a;fill(col,pd.x-4,y-0.9,8,1.3);fill("#ffffff",pd.x-2,y-0.9,4,0.5);glow(pd.x,y-1,pd.k==="tone"?18:11,pd.k==="trap"?"255,70,50":pd.k==="tone"?["90,170,255","100,255,160","255,210,60"][pd.rank]:"100,255,160",0.5*a);ctx.globalAlpha=1;}}
  /* the crowbar's tip, while tapping */
  if(K.tap){const k=K.tap.t/14;ctx.save();ctx.translate(player.x+player.face*4,player.y-12);ctx.rotate(player.face*(0.2+Math.min(1,k)*0.9));fill("#7e8a96",0,0,13*player.face>0?13:-13,1.2);ctx.restore();}
  /* the open door lets light in */
  if(K.open&&(K.doorOpen||0)>0){const o=K.doorOpen,x=P6_KDOOR;const gr=ctx.createLinearGradient(x,0,x-80,0);gr.addColorStop(0,"rgba(220,255,245,"+0.9*o+")");gr.addColorStop(1,"rgba(220,255,245,0)");ctx.fillStyle=gr;ctx.fillRect(x-80,170-P6_KCEIL,80,P6_KCEIL);fill("#e8fff8",x,170-P6_KCEIL,6*o,P6_KCEIL);glow(x,150,60,"200,255,235",0.5*o);}
  /* the player: a faint presence in the dark */
  glow(player.x,player.y-18,16,"120,160,230",0.07+0.03*Math.sin(T/20));
  De.dark={c:"4,6,16",l:"140,190,255",a:0.5,dk:0.88};}
function p6KSign(s){const x=s.x,y=s.y;
  if(s.t==="warn"){ctx.strokeStyle="#ffe070";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,y-7);ctx.lineTo(x+7,y+5);ctx.lineTo(x-7,y+5);ctx.closePath();ctx.stroke();fill("#ffe070",x-0.5,y-3,1,5);fill("#ffe070",x-0.5,y+3,1,1);}
  else if(s.t==="tone"){for(let q=0;q<3;q++){ctx.strokeStyle=["#5aa8ff","#6aff9a","#ffd23a"][q];ctx.lineWidth=0.8;ctx.beginPath();ctx.arc(x-10+q*10,y,3+q,0,7);ctx.stroke();}}
  else if(s.t==="bars"){for(let q=0;q<3;q++)fill("#ffe070",s.x-10+q*8,y+8-(q+1)*5,5,(q+1)*5);fill("#ffe070",s.x-12,y+9,28,1);}
  else if(s.t==="locker"){ctx.strokeStyle="#ffe9a0";ctx.lineWidth=0.8;ctx.strokeRect(x-6,y-14,12,28);ctx.beginPath();ctx.moveTo(x,y-14);ctx.lineTo(x,y+14);ctx.stroke();fill("#ffe9a0",x+2,y,1.4,2);}
  else if(s.t==="door"){ctx.strokeStyle="#ffe9a0";ctx.lineWidth=1;ctx.strokeRect(x-1,y-30,12,50);for(let q=0;q<5;q++)fill("#ffe9a0",x+2,y-26+q*9,6,0.8);}}
function p6DarkFront(){}
function p6DarkTint(){const K=P6K,S=p6S();ctx.save();ctx.setTransform(ctx.canvas.width/192,0,0,ctx.canvas.height/108,0,0);
  if(K.flash>0){ctx.fillStyle="rgba(170,230,255,"+K.flash*0.5+")";ctx.fillRect(0,0,192,108);}
  const vg=C3.cache.p6kv||(C3.cache.p6kv=(()=>{const q=ctx.createRadialGradient(96,54,30,96,54,110);q.addColorStop(0,"rgba(0,0,0,0)");q.addColorStop(1,"rgba(0,0,0,.6)");return q;})());ctx.fillStyle=vg;ctx.fillRect(0,0,192,108);
  /* the scream and tap indicators (centred, clear of the touch buttons) */
  if(!C3.cut){const a=K.cd>0?K.cd/64:0,t1=ra?"SHOOT: SCREAM":"F/K: SCREAM",t2=ra?"PUNCH: TAP":"J: TAP";fill("rgba(0,0,0,.55)",34,98,124,7);text(a>0?"...":t1,37,99.6,a>0?"#4a6a80":"#9ae8ff",'3px "Press Start 2P",monospace');text(t2,104,99.6,"#ffd878",'3px "Press Start 2P",monospace');
    if(a>0){fill("#1a2a3a",37,104,50,1);fill("#9ae8ff",37,104,50*(1-a),1);}}
  if(C3.dark>0){ctx.fillStyle="rgba(0,0,4,"+C3.dark+")";ctx.fillRect(0,0,192,108);}ctx.restore();}
/* ---------------- cutscene ---------------- */
function p6CutDark(c){const t=c.t,S=p6S();P6.t++;c.cx=null;P6K.t++;P6K.flash>0&&(P6K.flash=Math.max(0,P6K.flash-0.06));
  if(t===1){player.x=56;player.y=270;player.face=1;}
  if(t===2){$sx("slam");$sx("clank");shake=Math.max(shake,8);tnCap("CLANG! The hatch springs back up above me and slams shut!");}
  if(t===170)tnCap("It's pitch black. I can't even see my own hands.");
  if(t===350){$sx("rumble");tnCap("But I can HEAR. Sound bounces off walls. If I scream, the echo will tell me what's out there, like a bat.");}
  if(t>=560){tnCap("");c3CutEnd();S.route=1;c2Save("dark");updateGuide();toast("<b>SCREAM TO SEE</b><br>Press <b>F</b> or <b>K</b> (or the red button) to scream. The echo draws the walls, stairs and gaps for a moment.",7000);}}
{const _c=c5Cut;c5Cut=function(c){if(c.k==="c5p6dark")return p6CutDark(c);return _c(c);};}
{const _s=c5Skip;c5Skip=function(c){if(c.k==="c5p6dark"){c.t=Math.max(c.t,559);return;}return _s(c);};}
/* ---------------- plumbing ---------------- */
{const _s=c7Step;c7Step=function(){if(room==="dark"){C5.t++;p6DarkStep();return;}return _s();};}
{const _u=c7Use;c7Use=function(e){if(room==="dark")return p6DarkUse(e);return _u(e);};}
{const _e=c7Enter;c7Enter=function(t){if(t!=="dark")return _e(t);const S=p6S();C3.lie=0;C7G=null;C5GN=null;C5PR=null;C5TR=null;C5CK=null;P6.hide=0;
  S.from="";p6DarkInit(!0);player.face=1;camX=c3Clamp(player.x-96,0,P6_KW-192);camY=Math.max(0,Math.min(P6_KH-108,player.y-70));
  if(!S.route){c2Save("dome");c3CutStart("c5p6dark");}updateGuide();};}
{const _b=c7Back;c7Back=function(){if(room==="dark")return p6DarkBack();return _b();};}
{const _f=c7Front;c7Front=function(){if(room==="dark")return p6DarkFront();return _f();};}
{const _t=c7Tint;c7Tint=function(){if(room==="dark")return p6DarkTint();return _t();};}
{const _w=c7Walls;c7Walls=function(){if(room==="dark"){if(player.x<22)player.x=22;if(player.x>P6_KDOOR+4&&!P6K.open)player.x=P6_KDOOR+4;if(player.x>P6_KW-10)player.x=P6_KW-10;return!0;}return _w();};}
{const _g=c7Guide;c7Guide=function(){if(room==="dark")return p6DarkGuide();return _g();};}
{const _a=c7Arrow;c7Arrow=function(){if(room==="dark")return p6DarkArrow();return _a();};}
{const _p=c7Pre;c7Pre=function(){if(room==="dark"&&!C3.cut&&!modal&&player.on){const fy=p6KFloor(player.x+player.vx);if(fy<390&&Math.abs(fy-player.y)<P6_KSTEP+1.4)player.y=fy;}return _p();};}
