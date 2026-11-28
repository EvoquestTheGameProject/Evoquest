/* ======================= PART 6E: THE UPGRADED WEAPONS =======================
   Venom Gusher (single-target rifle: thick venom, poison stacks, ignores armour), Evo Sweeper (explosive venom bombs and a
   lingering cloud for crowds) and Hypervex (fast piercing sniper shot, headshots, hits harder the further it flies).
   They work in every room of this part of the game. Anything that wants to be shot adds itself to P6W.tg. The lab's test
   range does exactly that, so you can try your choice on the target it was built for. */
function p6Tgs(){return room==="slab"?P6W.tg:[];}
var P6W={k:null,cd:0,shots:[],tg:[],clouds:[],beams:[],fl:[],idle:0,regen:0,rt:0,kills:0,pods:0,far:0,gloat:0};
const P6_RX=1262;/* the firing line */
function p6WDef(){const S=c7S(),P=S&&S.p6;return P&&P.up?P6_WDEF[P.up]:null;}
function p6WOn(){const P=c7S().p6;return!!(P&&P.up&&hasGun&&c7Is());}
/* ---------------- targets ---------------- */
function p6RangeInit(){P6W.tg=[];const g=C2_FLOOR;
  P6W.tg.push({id:"brute",x:1405,y:g,w:24,h:42,hp:80,max:80,armor:0.5,kind:"brute",head:null,flash:0,ven:null,rt:0});
  for(let i=0;i<8;i++)P6W.tg.push({id:"pod"+i,x:1330+(i%4)*9,y:g-(i<4?5:19),w:8,h:8,hp:5,max:5,armor:0,kind:"pod",head:null,flash:0,ven:null,rt:0,ph:i*13});
  P6W.tg.push({id:"far",x:1488,y:g,w:8,h:22,hp:10,max:10,armor:0,kind:"far",head:{oy:-19,r:3.4},flash:0,ven:null,rt:0});}
function p6TgBox(t){return{x0:t.x-t.w/2,x1:t.x+t.w/2,y0:t.y-t.h-(t.kind==="pod"?4:0),y1:t.y-(t.kind==="pod"?4:0)};}
function p6TgHit(t,dmg,opts){if(t.hp<=0)return;opts=opts||{};const d=dmg*(opts.pierce?1:(1-(t.armor||0)));t.hp-=d;t.flash=8;P6W.hitFl=1;
  if(opts.ven){t.ven=t.ven||{n:0,t:0};t.ven.n=Math.min(10,t.ven.n+opts.ven);t.ven.t=300;}
  if(t.hp<=0){t.hp=0;t.rt=360;t.ven=null;$sx("bossdie");p6SparkBurst(t.x,t.y-t.h/2,16);shake=Math.max(shake,t.kind==="brute"?8:2);P6W.kills++;if(t.kind==="pod")P6W.pods++;if(t.kind==="far"&&Math.abs(player.x-t.x)>150)P6W.far++;p6RangeCheck();}
  else $sx("hit");}
function p6SparkBurst(x,y,n){for(let q=0;q<n;q++)P6W.fl.push({x,y,vx:(Math.random()-0.5)*2.4,vy:-Math.random()*2.2,g:0.1,life:26+Math.random()*10,c:["#8aff9a","#ffe070","#ffffff","#b06aff"][q%4]});}
function p6RangeCheck(){const S=p6S();if(S.test||!S.up)return;
  const ok=S.up==="gusher"?P6W.tg.some((t)=>t.id==="brute"&&t.hp<=0):S.up==="sweeper"?P6W.pods>=6:P6W.far>=1;
  if(ok){S.test=1;c2Save("slab");setTimeout(()=>{if(!C3.cut&&!modal&&room==="slab")c3CutStart("c5p6end");},1800);}}
/* ---------------- firing ---------------- */
function p6WFire(){const S=p6S(),d=P6_WDEF[S.up];if(P6W.cd>0)return;
  if(ammo<=0){$sx("empty");P6W.cd=22;toast("<b>EMPTY.</b> The venom regenerates slowly. Or refill at the <b>ammo rack</b> on the range.",1800);return;}
  const f=player.face,mx=player.x+13*f*Po,my=player.y-20.3;ammo--;P6W.cd=d.cd;P6W.idle=0;updateHud();player.kb=3;player.kbv=-0.9*f;
  if(S.up==="gusher"){$sx("shoot");P6W.shots.push({k:"g",x:mx,y:my,vx:5.4*f,life:55,t:0});shake=Math.max(shake,3);p6Tone(180,0.18,"sawtooth",0.07,90);for(let q=0;q<8;q++)parts.push({x:mx,y:my,vx:f*(1+2.4*Math.random()),vy:1.6*(Math.random()-0.5),g:0.06,life:14,c:q%2?"#ff7a5a":"#ffd0a0",s:1});}
  else if(S.up==="sweeper"){$sx("spit");$sx("shoot");P6W.shots.push({k:"s",x:mx,y:my,vx:2.7*f,vy:-1.1,life:120,t:0});shake=Math.max(shake,4);p6Tone(120,0.3,"square",0.06,60);for(let q=0;q<9;q++)parts.push({x:mx,y:my,vx:f*(0.6+2*Math.random()),vy:1.6*(Math.random()-0.5),g:0.05,life:18,c:q%2?"#8aff6a":"#e8ffd0",s:1});}
  else{$sx("shoot");shake=Math.max(shake,5);p6Tone(900,0.14,"square",0.06,2400);p6Noise(0.12,0.08,4000,0.5);p6Hyper(mx,my,f);for(let q=0;q<6;q++)parts.push({x:mx,y:my,vx:f*(1+3*Math.random()),vy:0.6*(Math.random()-0.5),g:0,life:10,c:"#bff4ff",s:1});}}
function p6Hyper(x0,y0,f){const range=250;let hits=0,xEnd=x0+f*range;
  const order=p6Tgs().filter((t)=>t.hp>0).sort((a,b)=>Math.abs(a.x-x0)-Math.abs(b.x-x0));
  for(const t of order){const b=p6TgBox(t);if(f>0?b.x1<x0:b.x0>x0)continue;const tx=f>0?b.x0:b.x1,dist=Math.abs(tx-x0);if(dist>range)continue;
    if(y0<b.y0-1||y0>b.y1+1)continue;let dmg=9*(1+Math.min(0.5,dist/400));let head=0;if(t.head&&Math.abs(y0-(t.y+t.head.oy))<t.head.r+1){dmg*=2;head=1;}
    p6TgHit(t,dmg,{});if(head){toast("<b>HEADSHOT!</b>",800);addFx({k:"star",x:t.x,y:y0,r:9,life:8,c:"#ffe070"});}
    hits++;if(hits>=2){xEnd=tx;break;}}
  P6W.beams.push({x0,y0,x1:xEnd,y1:y0,t:0});}
function p6Explode(x,y){const R=30;$sx("crash");$sx("sizzle");shake=Math.max(shake,8);p6Tone(80,0.5,"sawtooth",0.1,40);p6Noise(0.4,0.1,500,0.7);addFx({k:"ring",x,y,r0:2,r1:R,c:"#8aff6a",life:16});addFx({k:"flash",x,y,r:R,c:"140,255,120",a:0.9,life:10});p6SparkBurst(x,y,22);
  for(const t of p6Tgs()){if(t.hp<=0)continue;const b=p6TgBox(t),cx=(b.x0+b.x1)/2,cy=(b.y0+b.y1)/2,d=Math.hypot(cx-x,cy-y);if(d<R+t.w/2)p6TgHit(t,4.2*(1-Math.min(0.6,d/R*0.6)),{});}
  P6W.clouds.push({x,y:C2_FLOOR-4,r:R*0.8,life:200,t:0});}
function p6WeaponStep(){const S=c7S(),P=S.p6;if(!P||!P.up)return;
  if(!c7Is()||!hasGun)return;
  /* the base gun stays quiet: this weapon replaces it */
  gunCd=Math.max(gunCd,30);P6W.cd>0&&P6W.cd--;P6W.idle++;
  if(ammo<(P6_WDEF[P.up].cap)&&P6W.idle>200&&P6W.idle%160===0){ammo++;updateHud();$sx("pickup");}
  /* shots in flight */
  P6W.shots=P6W.shots.filter((s)=>{s.t++;s.x+=s.vx;if(s.vy!==undefined){s.vy+=0.085;s.y+=s.vy;}s.life--;
    let hit=0;for(const t of p6Tgs()){if(t.hp<=0)continue;const b=p6TgBox(t);if(s.x>b.x0-1.5&&s.x<b.x1+1.5&&s.y>b.y0-1.5&&s.y<b.y1+1.5){hit=t;break;}}
    if(s.k==="g"){if(hit){p6TgHit(hit,4,{pierce:1,ven:2});hitFx(s.x,s.y,0);return!1;}if(s.t%2===0)parts.push({x:s.x,y:s.y,vx:0,vy:0.1,g:0.04,life:12,c:"#ff7a5a",s:1});}
    else{if(hit||s.y>=C2_FLOOR-1){p6Explode(s.x,Math.min(s.y,C2_FLOOR-2));return!1;}if(s.t%3===0)parts.push({x:s.x,y:s.y,vx:0,vy:0,g:0,life:10,c:"#8aff6a",s:1});}
    return s.life>0&&s.x>0&&s.x<C2[room].W;});
  P6W.beams=P6W.beams.filter((b)=>++b.t<9);
  P6W.fl=P6W.fl.filter((q)=>{q.x+=q.vx;q.y+=q.vy;q.vy+=q.g;q.vx*=0.97;return--q.life>0;});
  /* venom clouds burn whatever stands in them */
  P6W.clouds=P6W.clouds.filter((c)=>{c.t++;if(c.t%24===0)for(const t of p6Tgs()){if(t.hp<=0)continue;if(Math.abs(t.x-c.x)<c.r+t.w/2&&Math.abs(t.y-C2_FLOOR)<30)p6TgHit(t,0.7,{});}return c.t<c.life;});
  /* poison, and respawning targets */
  for(const t of P6W.tg){t.flash>0&&t.flash--;if(t.ven){t.ven.t--;if(t.hp>0){t.hp-=t.ven.n*0.011*(t.armor?1:1);if(t.hp<=0){t.hp=0;t.rt=360;P6W.kills++;$sx("bossdie");p6SparkBurst(t.x,t.y-t.h/2,16);shake=Math.max(shake,8);p6RangeCheck();}}if(t.ven&&t.ven.t<=0)t.ven=null;}
    if(t.hp<=0&&t.rt>0&&--t.rt===0){t.hp=t.max;t.ven=null;if(t.id.slice(0,3)==="pod"){P6W.pods=Math.max(0,P6W.pods-0);}}}
  if(S.p6.test&&P6W.shots.length===0&&false)return;}
function p6WeaponLab(){const S=p6S();if(!P6W.tg.length)p6RangeInit();
  if(S.up&&!C3.cut&&!modal){if(shootBuf>0||(keys.s&&S.up==="gusher")){const wantBuf=shootBuf>0;shootBuf=0;p6WFire();}}
  else if(!S.up&&!C3.cut){/* before the upgrade the old blaster is a pile of parts: no shooting */}}
/* ---------------- drawing ---------------- */
function p6RangeDraw(){if(room!=="slab")return;const g=C2_FLOOR,T=P6L.t;if(camX+192<1240)return;
  /* the range: floor lines, a firing line, distance marks, a banner */
  fill("rgba(255,224,112,.7)",P6_RX,g-0.4,1.2,1.4);for(let x=1290;x<1500;x+=30){fill("rgba(255,255,255,.25)",x,g,1,1.4);text(""+(x-P6_RX),x-4,g+3,"#6a8a8a",'2.4px "Press Start 2P",monospace');}
  ctx.drawImage(p6SprBanner(),0,0,320,22,1250,16,160,11);text("BRUTE",1392,12,"#c8d8dc",'3px "Press Start 2P",monospace');text("SWARM",1326,12,"#c8d8dc",'3px "Press Start 2P",monospace');text("FAR",1480,12,"#c8d8dc",'3px "Press Start 2P",monospace');
  {const x=1250;ctx.drawImage(p6SprRack(),0,0,34,64,x-8.5,g-32,17,32);glow(x,g-18,14,"120,255,120",0.22);}
  for(const t of P6W.tg)p6TgDraw(t);
  for(const c of P6W.clouds){const k=c.t/c.life;for(let q=0;q<6;q++){const px=c.x+Math.sin(T/20+q*2)*c.r*0.6,py=c.y-3-q*2-k*4;ctx.globalAlpha=Math.max(0,0.5*(1-k));ctx.drawImage(c10Puff(24,"110,230,110"),px-9,py-9,18,18);}ctx.globalAlpha=1;glow(c.x,c.y-4,c.r,"120,255,120",0.16*(1-k));}}
function p6WeaponDraw(){if(!P6W.shots.length&&!P6W.beams.length&&!P6W.fl.length)return;
  for(const s of P6W.shots){if(s.k==="g"){const a=Math.sign(s.vx);for(let q=1;q<7;q++){ctx.globalAlpha=0.6-0.08*q;fill(q%2?"#ff7a5a":"#ffb090",s.x-a*(2+2.2*q),s.y-0.7,2,1.6);}ctx.globalAlpha=1;fill("#7a1e10",s.x-2.5,s.y-2,5,4);fill("#ff7a5a",s.x-2,s.y-1.5,4,3);fill("#ffe0c0",s.x-1,s.y-1,1.6,1.4);glow(s.x,s.y,8,"255,110,80",0.6);}
    else{ctx.fillStyle="#1a3a14";ctx.beginPath();ctx.arc(s.x,s.y,2.6,0,7);ctx.fill();ctx.fillStyle="#8aff6a";ctx.beginPath();ctx.arc(s.x,s.y,1.8,0,7);ctx.fill();fill("#eaffd8",s.x-0.8,s.y-0.8,1,1);glow(s.x,s.y,8,"130,255,110",0.6);}}
  for(const b of P6W.beams){const a=1-b.t/9;ctx.globalAlpha=a;ctx.strokeStyle="#e8fbff";ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(b.x0,b.y0);ctx.lineTo(b.x1,b.y1);ctx.stroke();ctx.strokeStyle="#7fd8ff";ctx.lineWidth=3;ctx.globalAlpha=a*0.35;ctx.beginPath();ctx.moveTo(b.x0,b.y0);ctx.lineTo(b.x1,b.y1);ctx.stroke();ctx.globalAlpha=1;glow(b.x1,b.y1,8,"150,230,255",0.5*a);}
  for(const q of P6W.fl){ctx.globalAlpha=Math.min(1,q.life/12);fill(q.c,q.x,q.y,1,1);}ctx.globalAlpha=1;}
/* the Hypervex shows a laser sight whenever it is up */
function p6LaserDraw(){const S=c7S(),P=S.p6;if(!P||P.up!=="hypervex"||!hasGun||C3.cut||modal)return;const f=player.face,x0=player.x+13*f*Po,y0=player.y-20.3;let x1=x0+f*250;
  for(const t of p6Tgs()){if(t.hp<=0)continue;const b=p6TgBox(t);if(y0>=b.y0&&y0<=b.y1){const tx=f>0?b.x0:b.x1;if((f>0&&tx>x0&&tx<x1)||(f<0&&tx<x0&&tx>x1))x1=tx;}}
  ctx.globalAlpha=0.28+0.1*Math.sin(tick/4);ctx.strokeStyle="#ff3a3a";ctx.lineWidth=0.4;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y0);ctx.stroke();ctx.globalAlpha=1;fill("#ff5a4a",x1-0.8,y0-0.8,1.6,1.6);glow(x1,y0,4,"255,60,60",0.5);}
/* ---------------- the HUD label ---------------- */
function p6WeaponHud(){const S=c7S(),P=S.p6;if(!P||!P.up||!hasGun||!c7Is()||C3.cut)return;const d=P6_WDEF[P.up];ctx.save();ctx.setTransform(ctx.canvas.width/192,0,0,ctx.canvas.height/108,0,0);
  fill("rgba(0,0,0,.5)",126,99,64,7);text(d.n,128,100.4,"#ffe070",'2.8px "Press Start 2P",monospace');for(let q=0;q<d.cap;q++)fill(q<ammo?"#8aff9a":"#26362e",128+q*5,104,3.4,1.4);ctx.restore();}
/* ---------------- plumbing (outermost wrappers: they cover every room of this part) ---------------- */
{const _s=c7Step;c7Step=function(){const r=_s();const S=c7S();if(S.p6&&S.p6.up&&!C3.cut){if(room!=="slab"&&p6WOn()){if(shootBuf>0||(keys.s&&S.p6.up==="gusher")){shootBuf=0;p6WFire();}}p6WeaponStep();}return r;};}
{const _f=c7Front;c7Front=function(){_f();p6WeaponDraw();p6LaserDraw();};}
{const _t=c7Tint;c7Tint=function(){_t();p6WeaponHud();};}
{const _b=c7Back;c7Back=function(){_b();if(room==="slab")p6RangeDraw();};}
{const _e=c7Enter;c7Enter=function(t){_e(t);P6W.shots=[];P6W.beams=[];{const P=c7S().p6;if(P&&P.up&&hasGun)ammo=Math.max(ammo,P6_WDEF[P.up].cap);updateHud();}if(t==="slab"&&!P6W.tg.length)p6RangeInit();};}
{const _u=c7Use;c7Use=function(e){if(room==="slab"&&e.id==="c5_lrack"){if(C3.cut||C3.task)return!0;const d=p6WDef();if(!d){toast("A rack of spare venom cells. Your blaster is in pieces right now.",2400);return!0;}ammo=d.cap;updateHud();$sx("pickup");p6Tone(520,0.2,"triangle",0.06,880);toast("<b>VENOM REFILLED.</b> "+d.cap+" shots.",1800);return!0;}return _u(e);};}
rooms.slab.ints.push({id:"c5_lrack",x:P6_RX-12,r:0,label:"REFILL VENOM"});
