/* ======================= PART 6A: FOLLOW THE EVOLVED (stealth) =======================
   A line of Evolved walks west through the burning streets, toward the Dome. Stay behind them without being seen:
   hide behind wrecks (stand next to one and press USE), watch the rear one's look-backs, dodge the red eye-beams of the
   watchers on the roofs and don't crunch the broken glass. */
const P6_WP=[{x:1130,d:190},{x:900,d:230},{x:700,d:200},{x:480,d:230},{x:260,d:170}];
const P6_GM=[{o:0,b:1},{o:34,i:0},{o:50,i:1},{o:66,i:2},{o:90,i:3,w:1}];
const P6_COV=[{x:1580,k:"bus"},{x:1330,k:"wall"},{x:1090,k:"truck"},{x:960,k:"box"},{x:830,k:"wall"},{x:640,k:"bus"},{x:540,k:"box"},{x:400,k:"truck"},{x:300,k:"wall"},{x:170,k:"box"}];
const P6_GL=[1440,1210,1010,760,590,440,330];
const P6_SENT=[{x:930,ph:0,h:46},{x:560,ph:2.1,h:46}];
const P6_BLD=(()=>{const L=[];for(let i=0;i<15;i++){const x=-6+i*126+((i*37)%34),w=44+((i*13)%26),h=54+((i*29)%32),k=i%3;L.push([x,w,h,500+i,k,k===0?{fire:[[14+(i%9),22],[34,36]],top:i%2?24:0}:k===1?{coll:1,fire:[[20,40]]}:{nest:i%2?1:0,fire:[[26,30]]}]);}return L;})();
const P6_FT=[0,1,2,0,2,0,2,2,0,2,0];
{const _t=c5Tile;c5Tile=function(id,i,seed){if(id!=="fol")return _t(id,i,seed);const k="fol"+i;return C5.tiles[k]||(C5.tiles[k]=c10Tile(P6_FT[i%P6_FT.length],seed));};}
/* covers are interaction points: stand next to one and press USE */
P6_COV.forEach((c,i)=>{rooms.fol.ints.push({id:"c5_cv:"+i,x:c.x,r:0,label:"HIDE"});});
rooms.dome.ints.push({id:"c5_dback",x:P6_DW-26,r:0,label:"BACK TO THE STREETS"});
/* ---------------- state ---------------- */
function p6FolInit(resp){const S=p6S();P6.f={gx:S.wp?S.gx:1330,wp:S.wp||0,ws:"walk",pause:0,tel:0,look:0,wn:210,t:0,lost:0,glass:{},end:0,fx:[]};P6.hide=0;P6.al=0;
  if(resp){player.x=Math.min(P6_FW-60,S.cpx||P6_FW-60);player.y=C2_FLOOR;player.vx=0;player.vy=0;player.face=-1;camX=c3Clamp(player.x-96,0,P6_FW-192);}}
function p6Rear(){return P6.f.gx+90;}
function p6Growl(){p6Tone(95,0.55,"sawtooth",0.07,55);p6Noise(0.4,0.03,300,0.7);}
function p6Caught(){const F=P6.f;if(dead)return;shake=Math.max(shake,12);$sx("roar");$sx("hurt");P6.hide=0;
  p6Die("THE EVOLVED SAW YOU","The Evolved hunt by sight and by sound. Stand beside a wreck and press USE to hide whenever the last one turns round or a red eye-beam sweeps past, and jump over broken glass: it crunches under your feet.");}
/* ---------------- per-frame ---------------- */
function p6FolStep(){const S=p6S();if(!P6.f)p6FolInit(0);const F=P6.f;F.t++;P6.t++;c10Tick();C7.t++;
  if(C3.cut){return;}
  P6.noise>0&&P6.noise--;
  if(P6.hide){player.vx=0;player.walk=0;player.x=P6.hidX;if(P6.hideT>0)P6.hideT--;else if(keys.l||keys.r){P6.hide=0;$sx("click");}}
  const rear=p6Rear(),hid=!!P6.hide;
  /* the group walks, pauses at waypoints and waits for you if you fall far behind */
  if(!F.end){
    if(F.look>0){F.look--;if(F.look===0)F.wn=300+((F.t*13)%200);}
    else if(F.tel>0){F.tel--;if(F.tel===0){F.look=55;}}
    else{F.wn--;if(F.wn<=0&&F.ws!=="gone"){F.tel=85;p6Growl();}
      if(F.ws==="walk"){const nx=F.wp<P6_WP.length?P6_WP[F.wp].x:-70,far=player.x-rear>380;F.lost=far?F.lost+1:0;
        if(far&&F.lost===30)toast("<b>THEY'RE GETTING AWAY.</b><br>Keep up, but don't get close.",3200);
        if(!far){F.gx-=0.5;if(F.gx<=nx){F.gx=nx;if(F.wp<P6_WP.length){F.ws="pause";F.pause=P6_WP[F.wp].d;S.wp=F.wp+1;S.gx=nx;S.cpx=nx+210;c2Save("fol");}else{F.ws="gone";}}}}
      else if(F.ws==="pause"){F.pause--;if(F.pause<=0){F.ws="walk";F.wp++;}}}
  }
  if(F.gx<=10&&F.ws!=="gone")F.ws="gone";
  if(F.ws==="gone"&&!S.fol)S.fol=2;
  /* seeing and hearing */
  let seen=0;const dx=player.x-rear;
  if(!hid){if(F.look>0&&dx>-8&&dx<105)seen=Math.max(seen,1.3);if(F.ws!=="gone"&&dx<22&&dx>-80)seen=Math.max(seen,2.5);
    for(const s of P6_SENT){const bx=s.x+Math.sin(F.t/62+s.ph)*52;s.bx=bx;if(Math.abs(player.x-bx)<10&&player.y>C2_FLOOR-30)seen=Math.max(seen,1.8);}}
  else for(const s of P6_SENT)s.bx=s.x+Math.sin(F.t/62+s.ph)*52;
  /* broken glass: loud under your feet, silent if you jump over it */
  for(let i=0;i<P6_GL.length;i++){const gx=P6_GL[i];F.glass[i]>0&&F.glass[i]--;
    if(!hid&&!F.glass[i]&&player.on&&Math.abs(player.vx)>0.2&&Math.abs(player.x-gx)<8){F.glass[i]=90;P6.noise=40;$sx("debris");toast("<b>CRUNCH!</b> Broken glass.",1100);if(F.ws!=="gone"&&F.look<=0&&Math.abs(rear-player.x)<420){F.tel=Math.min(F.tel||99,40);F.wn=400;}}}
  if(shootBuf>0&&hasGun&&!hid&&F.ws!=="gone"){seen=Math.max(seen,0);P6.al=Math.min(100,P6.al+55);P6.noise=40;F.tel=Math.min(F.tel||99,12);F.wn=300;toast("<b>BANG!</b> A shot is the loudest thing in the street. Don't.",2200);}
  P6.al=c3Clamp(P6.al+(seen?seen:-2.2),0,100);
  if(P6.al>=100)return p6Caught();
  /* the plaza: once the last of them is gone, the Dome is open */
  if(F.ws==="gone"&&player.x<26&&!C3.cut&&!C3.task){S.fol=3;c2Save("fol");c7Go("dome","fol");return;}
  p6FolLights();
  c5Pick((it)=>{const k=it.id.slice(3);if(k.slice(0,3)==="cv:"){const c=P6_COV[+k.slice(3)];if(P6.hide)return P6.hidX===c.x?{r:34,label:"COME OUT"}:null;return{r:17,label:"HIDE"};}return null;});}
function p6FolUse(e){const k=e.id.slice(3);
  if(k.slice(0,3)==="cv:"){const c=P6_COV[+k.slice(3)];if(P6.hide){P6.hide=0;$sx("click");return!0;}
    P6.hide=1;P6.hidX=c.x;P6.hideT=14;player.x=c.x;player.vx=0;$sx("clank");p6Tip("hide","<b>HIDDEN.</b><br>Nothing can see you behind the wreck. Press USE (or move) to come out once the coast is clear.",4200);return!0;}
  return!0;}
function p6FolGuide(){const S=p6S(),F=P6.f;if(S.fol>=2)return p6Q("<b>They're gone.</b><br>Walk <b>LEFT</b> into the Dome.");
  return p6Q("<b>Follow the Evolved. Stay out of sight.</b><br>&#9679; Stand beside a wreck and press <b>USE</b> to hide<br>&#9679; Hide when the last one turns round<br>&#9679; Cross red beams between sweeps<br>&#9679; Jump over broken glass");}
function p6FolArrow(){const S=p6S(),F=P6.f;if(!F||C3.cut)return;if(S.fol>=2)return p6Arrow(10);let t=null;
  for(const c of P6_COV){if(c.x<player.x-14&&c.x>p6Rear()+24){if(t==null||c.x>t)t=c.x;}}
  if(t==null)t=Math.max(p6Rear()+80,10);p6Arrow(t);}
/* ---------------- lights for the light map ---------------- */
function p6FolLights(){const T=P6.t,g=C2_FLOOR,L=[],fl=(s)=>0.82+0.18*Math.sin(T/4+s)*Math.sin(T/11+s*2),F=P6.f;
  for(const b of P6_BLD){const o=b[5];if(b[0]+b[1]<camX-60||b[0]>camX+260)continue;if(o.fire)for(const [fx,fy] of o.fire)L.push({x:b[0]+fx,y:g-b[2]+fy,r:34,i:0.85*fl(fx+b[3]),c:"255,120,40"});if(o.top)L.push({x:b[0]+o.top,y:g-b[2]-2,r:40,i:fl(b[3])*0.9,c:"255,120,40"});if(o.nest)L.push({x:b[0]+b[1]/2,y:g-20,r:46,i:0.4+0.15*Math.sin(T/30),c:"120,255,140"});}
  for(const x of P6_DR){if(x>camX-40&&x<camX+232)L.push({x,y:g-12,r:38,i:fl(x),c:"255,140,60"});}
  for(const [x,m] of P6_LP){const on=c10LampOn(x,m);on>0&&L.push({x:x+6.5,y:g-38,r:34,i:0.8*on,c:"255,236,190",cone:1});}
  /* the dome's sick glow far to the left, and the eyes of the watchers */
  L.push({x:40,y:g-40,r:110,i:0.5+0.15*Math.sin(T/26),c:"255,110,170"});
  for(const s of P6_SENT)L.push({x:s.x,y:g-s.h-22,r:20,i:0.55,c:"255,60,40"});
  if(F){for(const gm of P6_GM){if(!gm.b)continue;L.push({x:F.gx+gm.o,y:g-16,r:16,i:0.35,c:"255,60,40"});}L.push({x:F.gx+34,y:g-20,r:34,i:0.28,c:"160,255,120"});}
  L.push({x:player.x,y:g-20,r:22,i:0.22,c:"200,220,255"});
  C10A.lights=L;}
const P6_DR=[1500,1050,790,360],P6_LP=[[1400,1],[880,2],[470,0],[120,1]];
/* ---------------- drawing ---------------- */
function p6Mut(m){const g=C2_FLOOR,y=g-(m.lane||0);if(m.x<camX-30||m.x>camX+222)return;const fr=m.idle?2:(((C10.t+m.ph)/9)|0)%8;
  Ma(m.x,y,m.look,0,m.f,Object.assign({s:Po*(m.s||1),pose:c3Pose("walk",fr),env:c10Env(m.x,y-14)},C10_MUTE));
  glow(m.x+m.f*2*(m.s||1),y-30*(m.s||1),3,"160,255,120",0.35);}
function p6Beast(m){const g=C2_FLOOR,y=g-(m.lane||0),k=m.k||0.8;if(m.x<camX-60||m.x>camX+252)return;
  c3Ea(m.x-m.f*33*k,y,m.f,2,(m.idle?7:C10.t)*1.2,k);glow(m.x+m.f*1.5*k/0.6,y-15*k/0.62,7,"255,50,30",0.5);}
function p6FolMembers(){const F=P6.f,out=[];if(!F)return out;const idle=F.ws!=="walk"||F.look>0||F.tel>0;
  P6_GM.forEach((gm,i)=>{const x=F.gx+gm.o;if(x<6||F.ws==="gone"&&x<20)return;
    if(gm.b)out.push({b:1,x:x+4,f:-1,lane:0,k:0.8,ph:i*5,idle});
    else out.push(Object.assign(c10Man(gm.i,x,0,0,{s:0.95,ph:i*13}),{f:gm.w&&F.look>0?1:-1,idle:idle&&!(gm.w&&F.tel>0)}));});return out;}
function p6CoverArt(c){const g=C2_FLOOR,x=c.x;if(x+40<camX||x-40>camX+192)return;const hid=P6.hide&&P6.hidX===c.x;
  fill("rgba(0,0,0,.38)",x-28,g-0.2,56,1.6);
  if(c.k==="bus"){fill("#243030",x-27,g-34,54,29);fill("#364644",x-27,g-37,54,3.4);fill("#171f20",x-27,g-9,54,4);fill("#3e4e4c",x-27,g-37,54,0.8);
    for(let q=0;q<6;q++){fill("#080e10",x-24+q*8.6,g-30,6.6,10);if(q%2)fill("rgba(120,160,170,.25)",x-24+q*8.6,g-30,2,10);fill("#0e1618",x-24+q*8.6,g-30,6.6,1);}
    fill("#7a2a1c",x-24,g-16,16,1.2);fill("#c8b060",x-8,g-15,9,1.2);ctx.globalAlpha=0.5;fill("#5a2a14",x-18,g-26,2,16);fill("#5a2a14",x+10,g-29,2,19);ctx.globalAlpha=1;
    for(const wx of [-17,15]){fill("#0c0e10",x+wx-4,g-8,8,8);fill("#2a2e32",x+wx-2,g-6,4,4);fill("#0c0e10",x+wx-1,g-5,2,2);}
    fill("#1a1210",x+24,g-30,3,22);fill("#c0302a",x+25,g-22,1.4,1.4);}
  else if(c.k==="truck"){fill("#2c2a28",x-27,g-30,36,25);fill("#3c3a36",x-27,g-32,36,2.6);fill("#4a3a2c",x+9,g-21,19,16);fill("#2a1e16",x+9,g-21,19,1.4);fill("#10161a",x+11,g-19,8,7);fill("#26343a",x+11,g-19,8,1.6);
    fill("#1c1a18",x-27,g-9,54,4);ctx.globalAlpha=0.55;fill("#6a3a1a",x-20,g-26,2,14);fill("#6a3a1a",x-5,g-28,3,17);ctx.globalAlpha=1;
    for(const wx of [-17,-6,19]){fill("#0c0e10",x+wx-4,g-8,8,8);fill("#2a2e32",x+wx-2,g-6,4,4);}
    fill("#7a8a80",x-24,g-24,18,2.4);fill("#c8c0a0",x-22,g-23.6,14,0.6);}
  else if(c.k==="wall"){ctx.fillStyle="#3a3a3c";ctx.beginPath();ctx.moveTo(x-14,g);ctx.lineTo(x-12,g-38);ctx.lineTo(x+2,g-42);ctx.lineTo(x+14,g-26);ctx.lineTo(x+16,g);ctx.fill();
    ctx.fillStyle="#54545a";ctx.beginPath();ctx.moveTo(x-12,g-38);ctx.lineTo(x+2,g-42);ctx.lineTo(x+4,g-39);ctx.lineTo(x-10,g-35);ctx.fill();
    ctx.fillStyle="#2a2a2e";ctx.fillRect(x+4,g-30,3,30);for(let q=0;q<5;q++)fill(q%2?"#5a4a3a":"#3a3028",x-12+q*5,g-36+((q*13)%10),2,2);
    ctx.strokeStyle="#7a5a3a";ctx.lineWidth=0.6;for(let q=0;q<4;q++){ctx.beginPath();ctx.moveTo(x-2+q*3,g-41+q);ctx.lineTo(x-4+q*3.6,g-48+q);ctx.stroke();}
    fill("rgba(20,10,14,.5)",x-12,g-20,10,20);}
  else{c4BoxArt(x-14,g,(c.x>>4)%3,"",c.x>>3);fill("rgba(6,4,8,.35)",x-14,g-34,28,3);}
  if(hid){ctx.globalAlpha=0.5+0.2*Math.sin(tick/9);fill("#fff",x-3,g-27,1.1,1.1);fill("#fff",x+1.6,g-27,1.1,1.1);ctx.globalAlpha=1;}}
function p6Spotter(s){const g=C2_FLOOR,x=s.x,y0=g-s.h;if(x<camX-90||x>camX+280)return;
  /* a broken overpass chunk to stand on, with a pillar */
  fill("#1c1e22",x-18,y0,36,5);fill("#34383e",x-18,y0,36,1.2);fill("#14161a",x-14,y0+5,5,g-y0-5);fill("#14161a",x+10,y0+5,5,g-y0-5);
  for(let q=0;q<5;q++)fill("#6a4a30",x-16+q*7,y0+4,1.2,3);
  const m=c10Man(1,x,0,s.h,{s:1.05,ph:s.ph*40});m.f=(s.bx||x)<x?-1:1;m.idle=1;p6Mut(m);
  if(s.bx!=null){const ex=x+m.f*2,ey=y0-31,bx=s.bx,flick=0.9+0.1*Math.sin(P6.t/3);
    const gr=ctx.createLinearGradient(0,ey,0,g);gr.addColorStop(0,"rgba(255,70,50,"+0.34*flick+")");gr.addColorStop(1,"rgba(255,70,50,"+0.1*flick+")");
    ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(ex-1,ey);ctx.lineTo(ex+1,ey);ctx.lineTo(bx+15,g+2);ctx.lineTo(bx-15,g+2);ctx.fill();
    ctx.strokeStyle="rgba(255,120,90,.55)";ctx.lineWidth=0.5;ctx.beginPath();ctx.moveTo(ex,ey);ctx.lineTo(bx-15,g+2);ctx.moveTo(ex,ey);ctx.lineTo(bx+15,g+2);ctx.stroke();
    glow(bx,g-1,16,"255,70,50",0.3*flick);glow(ex,ey,5,"255,60,40",0.8);}}
function p6Glass(x){if(x<camX-12||x>camX+204)return;const g=C2_FLOOR;fill("rgba(10,14,20,.5)",x-9,g-0.2,18,1.4);
  for(let q=0;q<11;q++){const sx=x-8+((q*17)%16),sy=g-0.6-(q%2)*0.5,a=0.5+0.5*Math.sin(tick/(8+q)+q*2);fill(a>0.4?"#cfe8f0":"#7a98a8",sx,sy,1.2+(q%3)*0.5,0.7);a>0.85&&glow(sx,sy,3,"200,230,255",0.3);}}
function p6FolBack(){const S=p6S(),g=C2_FLOOR,T=P6.t,F=P6.f;
  for(const [x,y,s] of [[60,30,1],[320,22,1.3],[620,34,0.9],[900,26,1.2],[1240,30,1],[1560,24,1.3]]){const fx=x;if(fx<camX-60||fx>camX+252)continue;c10Smoke(fx,y,s,T,"26,18,26");glow(fx,y+4,10,"255,110,40",0.22+0.1*Math.sin(T/7+x));}
  p6DomeFar(70,g,150,0.9);
  for(const b of P6_BLD)c10DrawBld(b);
  for(const b of P6_BLD){const o=b[5];if(b[0]+b[1]<camX-30||b[0]>camX+222)continue;const top=g-b[2];
    if(o.fire)for(const [fx,fy] of o.fire){c10Flame(b[0]+fx,top+fy+3,5,4);glow(b[0]+fx,top+fy,14,"255,120,40",0.3);c10Smoke(b[0]+fx,top+fy-4,0.5,T+fx*9);}
    if(o.top){c10Flame(b[0]+o.top,top+1,7,6);c10Smoke(b[0]+o.top,top-6,0.8,T+b[3]);}}
  for(const [x,m] of P6_LP)c10Lamp(x,m);
  for(let q=0;q<26;q++){const x=(q*71+13)%P6_FW,y=20+((q*37)%46);if(x<camX-10||x>camX+202)continue;const on=Math.sin(T/(40+q*3)+q*1.7)>0.6;on&&(fill("#ff3a2a",x,y,1,0.8),fill("#ff3a2a",x+2,y,1,0.8),glow(x+1,y,4,"255,40,30",0.28));}
  [[240,"hatch",4],[610,"sedan",1],[1015,"van",2],[1210,"sedan",9],[1490,"hatch",7],[780,"van",6]].forEach(([x,k,i])=>{if(x<camX-60||x>camX+250)return;const c=c2NewCar(x,k,i);c.burn=i%2===1;c2Car(c);});
  for(const x of P6_DR)c10Drum(x);
  for(const s of P6_SENT)p6Spotter(s);
  for(const x of P6_GL)p6Glass(x);
  for(const c of P6_COV)p6CoverArt(c);
  if(F){for(const m of p6FolMembers()){m.b?p6Beast(m):p6Mut(m);}
    /* the last one's look-back: a faint red cone and a warning mark */
    if(F.look>0||F.tel>0){const rx=p6Rear(),hx=rx-1,hy=g-32,a=F.look>0?0.2:0.07;ctx.fillStyle="rgba(255,60,40,"+a+")";ctx.beginPath();ctx.moveTo(hx,hy);ctx.lineTo(hx+150,g-2);ctx.lineTo(hx+150,g-44);ctx.fill();
      F.tel>0&&(tick>>2)%2&&(fill("#2a0000",rx-2,hy-20,3,8),fill("#ffd23a",rx-1.4,hy-19.4,2,5),fill("#ffd23a",rx-1.4,hy-13.4,2,1.5));}}
  for(const p of C10.dust){ctx.globalAlpha=Math.max(0,p.a);ctx.drawImage(c10Puff(24,"120,104,96"),p.x-p.s/2,p.y-p.s/2,p.s,p.s);}ctx.globalAlpha=1;
  const e=c10Env(player.x,player.y-14);De.fol=Object.assign(De.fol||{},{c:"70,50,80",l:e.l,a:e.a*0.8,dk:e.dk});
  /* noise rings */
  if(P6.noise>0){const k=1-P6.noise/40;ctx.strokeStyle="rgba(255,230,160,"+(0.6*(1-k))+")";ctx.lineWidth=0.6;ctx.beginPath();ctx.ellipse(player.x,g-1,6+k*50,1.5+k*6,0,0,7);ctx.stroke();}}
function p6AlertBar(){const a=P6.al;if(a<=1)return;const x=66,y=4,w=60;fill("rgba(0,0,0,.6)",x-2,y-2,w+4,7);fill("#2a0c0c",x,y,w,3);fill(a>66?"#ff3a2a":a>33?"#ffb030":"#ffe070",x,y,w*a/100,3);
  /* an eye */fill("#0a0408",x-12,y-1,9,5);fill("#e8e0d0",x-11,y,7,3);fill(a>66?"#ff3a2a":"#4a8a3a",x-9,y,3,3);fill("#000",x-8,y+0.6,1.4,1.8);
  text("SEEN",x+w+4,y-0.5,a>66?"#ff6a5a":"#ffd878",'3px "Press Start 2P",monospace');}
function p6FolFront(){for(const a of C10.ash){ctx.globalAlpha=a.a;fill(a.hot?"#ffb060":"#b8b0b0",a.x,a.y,a.hot?0.6:0.7,a.hot?0.6:0.7);a.hot&&glow(a.x,a.y,2,"255,150,60",0.2*a.a);}ctx.globalAlpha=1;
  if(P6.hide){ctx.globalAlpha=0.55+0.2*Math.sin(tick/9);fill("#fff",P6.hidX-3,C2_FLOOR-27,1.1,1.1);fill("#fff",P6.hidX+1.6,C2_FLOOR-27,1.1,1.1);ctx.globalAlpha=1;}
  p6AlertBar();}
function p6FolTint(){const T=P6.t;ctx.save();ctx.setTransform(ctx.canvas.width/192,0,0,ctx.canvas.height/108,0,0);ctx.drawImage(c10LM(C10A.lights||[],0.5,"10,6,26"),0,0,192,108);
  for(const L of C10A.lights||[]){const x=L.x-camX;if(x<-L.r||x>192+L.r)continue;glow(x,L.y,L.r*(L.cone?0.3:0.6),L.c,(L.cone?0.1:0.14)*L.i);}
  const vg=C3.cache.p6vg||(C3.cache.p6vg=(()=>{const q=ctx.createRadialGradient(96,54,36,96,54,118);q.addColorStop(0,"rgba(0,0,0,0)");q.addColorStop(1,"rgba(6,2,10,.5)");return q;})());ctx.fillStyle=vg;ctx.fillRect(0,0,192,108);
  if(P6.al>40){ctx.fillStyle="rgba(255,20,10,"+((P6.al-40)/60*0.16)+")";ctx.fillRect(0,0,192,108);}
  if(C3.dark>0){ctx.fillStyle="rgba(0,0,4,"+C3.dark+")";ctx.fillRect(0,0,192,108);}ctx.restore();}
/* ---------------- warm-up: paint the streets a piece at a time while the player is still in the harbor ---------------- */
function p6WarmStep(){if(P6.warm)return;const n=P6.warmN,nT=C2.fol.seeds.length,nB=P6_BLD.length,nD=C2.dome.seeds.length;
  if(n<nT)c5Tile("fol",n,C2.fol.seeds[n]);else if(n<nT+nB)c10Bld(P6_BLD[n-nT]);else if(n<nT+nB+nD)c5Tile("dome",n-nT-nB,C2.dome.seeds[n-nT-nB]);else if(n===nT+nB+nD){p6SprBulk();p6SprHatch();p6SprSign();p6SprVent();p6SprDomeFar();}else{c10Jersey();P6.warm=1;}P6.warmN=n+1;}
/* ---------------- cutscenes ---------------- */
function p6CutCrt(c){const t=c.t,S=c7S();c10Tick();const h=c3Clamp(player.x-96,0,C10_W-192);c.cx=t<120?h:Math.max(0,h-Math.min(90,(t-120)*0.4));
  if(t===1){c10Stop();C10.run=[c10Man(0,92,-0.2,10,{s:0.85}),c10Man(1,112,-0.2,10,{s:0.85}),c10Man(2,130,-0.2,10,{s:0.85}),{kind:2,x:70,vx:-0.2,f:-1,lane:12,k:0.8,ph:3},c10Man(3,150,-0.2,10,{s:0.85})];}
  if(t===2){$sx("stinger");tnCap("…Wait. Down the street. Those shapes are moving together.");}
  if(t===230)tnCap("They aren't wandering. They're walking in a line, all in the same direction.");
  if(t===470)tnCap("The big one leads. The rest follow, like they're being called.");
  if(t===720){tnCap("If Dr. Morrow was right, the Evolved gather where the time machine parts are hidden. So wherever THEY go…");}
  if(t===930){$sx("stinger");tnCap("…that's where the parts are. I have to follow them. Quietly. If they see me, it's over.");}
  if(t>=1180){tnCap("");c.cx=null;S.cend=1;const P=p6S();P.on=1;c3CutEnd();c2Save("crt");updateGuide();toast("<b>FOLLOW THE EVOLVED</b><br>Walk <b>LEFT</b> down the street after them. Stay out of their sight.",5200);}}
function p6CutFol(c){const t=c.t,F=P6.f;c.cx=c3Clamp(F?F.gx-60:900,0,P6_FW-192);if(t<240)c.cx=c3Clamp((F?F.gx:1300)-90,0,P6_FW-192);else c.cx=c3Clamp(player.x-96,0,P6_FW-192)+Math.max(0,(380-t))*0;
  c10Tick();P6.t++;if(P6.f)P6.f.t++;p6FolLights();
  if(t===2){$sx("siren");tnCap("A whole line of them, walking through the smoke. The last one keeps glancing back.");}
  if(t===240)tnCap("Wrecks are my cover. Stand beside one, press USE, and I'm just another shadow.");
  if(t===470)tnCap("And watch the roofs. Those red beams are eyes.");
  if(t>=640){tnCap("");c.cx=null;c3CutEnd();updateGuide();toast("<b>STEALTH</b><br>Stand beside a wreck and press <b>USE</b> to hide. Move when it's safe. Don't get seen.",6000);}}
/* ---------------- plumbing into the chapter hooks ---------------- */
{const _s=c7Step;c7Step=function(){const S=c7S();
  if(room==="crt"&&S.cend&&p6S().on&&!C3.cut&&!modal&&player.x<24&&!c7G_busy()){S.from="crt";c7Go("fol","crt");return;}
  if(room==="crt"&&!P6.warm&&C7.t%36===0)p6WarmStep();
  if(room==="fol"){C5.t++;if(dead)return;if(C3.cut){p6FolStepCut();return;}if(c3TaskStep())return;p6FolStep();return;}
  return _s();};}
function c7G_busy(){return!!(C7G||C3.task||C3.busy);}
function p6FolStepCut(){c10Tick();P6.t++;if(P6.f)P6.f.t++;}
{const _u=c7Use;c7Use=function(e){if(room==="fol"){if(C3.cut||C3.task)return!0;return p6FolUse(e);}return _u(e);};}
{const _e=c7Enter;c7Enter=function(t){if(t!=="fol")return _e(t);const S=p6S();C3.lie=0;C7G=null;C5GN=null;C5PR=null;C5TR=null;C5CK=null;P6.hide=0;P6.al=0;
  p6FolInit(S.wp>0);player.y=C2_FLOOR;if(!(S.wp>0))player.x=P6_FW-50;player.face=-1;camX=c3Clamp(player.x-96,0,P6_FW-192);S.from="";
  if(!S.seen){S.seen=1;c2Save("fol");c3CutStart("c5p6fol");}updateGuide();};}
{const _b=c7Back;c7Back=function(){if(room==="fol")return p6FolBack();return _b();};}
{const _f=c7Front;c7Front=function(){if(room==="fol")return p6FolFront();return _f();};}
{const _t=c7Tint;c7Tint=function(){if(room==="fol")return p6FolTint();return _t();};}
{const _w=c7Walls;c7Walls=function(){if(room==="fol"){const S=p6S();if(player.x<(P6.f&&P6.f.ws==="gone"?6:48)){player.x=(P6.f&&P6.f.ws==="gone"?6:48);player.vx=0;}if(player.x>P6_FW-10){player.x=P6_FW-10;}return!0;}return _w();};}
{const _g=c7Guide;c7Guide=function(){const S=c7S();if(room==="fol")return p6FolGuide();
  if(room==="crt"&&S.cend&&p6S().on)return p6Q("<b>Follow the Evolved.</b><br>Walk <b>LEFT</b> down the street after them. Stay out of their sight.");return _g();};}
{const _a=c7Arrow;c7Arrow=function(){const S=c7S();if(room==="fol")return p6FolArrow();if(room==="crt"&&S.cend&&p6S().on){if(!C3.cut)p6Arrow(10);return;}return _a();};}
/* the story continues after the city: no end card any more; the quest goes on */
{const _e=c7End;c7End=function(){const S=c7S();if(room==="crt"&&S.cend&&S.back&&!p6S().done){return;}return _e();};}
{const _s=c7Step;c7Step=function(){const S=c7S();if(room==="crt"&&S.cend&&!p6S().on&&!C3.cut&&!modal&&!dead&&!c7G_busy()&&fadeNow===fadeTo){c3CutStart("c5p6crt");return;}return _s();};}
{const _c=c5Cut;c5Cut=function(c){if(c.k==="c5p6crt")return p6CutCrt(c);if(c.k==="c5p6fol")return p6CutFol(c);return _c(c);};}
{const _s=c5Skip;c5Skip=function(c){if(c.k==="c5p6crt"){c.t=Math.max(c.t,1179);return;}if(c.k==="c5p6fol"){c.t=Math.max(c.t,639);return;}return _s(c);};}
