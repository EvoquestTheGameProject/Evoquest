
/* ======================= DRAWING: river, road, broken bridge ======================= */
function c4Ground(kind){const i0=Math.floor(camX/192),i1=Math.floor((camX+192)/192);for(let i=i0;i<=i1;i++)i>=0&&ctx.drawImage(c4Chunk(kind,i),i*192,C2_FLOOR-4,192,24);}
/* the valley the river comes down, with the dam far upstream */
/* a mutated beaver: big, glowing-eyed, orange-toothed (and it swims off safely when the dam goes) */
/* a big leafy tree (shade!) or a chopped stump */
function c4BridgeBuilt(){const S4=c4S(),sw=C4.sw?C4.sw.t:0;if(S4.gone)return;
  S4.seg.forEach((s,i)=>{const x1=C4_R1-C4_SEG*i,x0=x1-C4_SEG,loose=!s.rope,k=loose?c3Clamp((sw-10-i*6)/70,0,1):c3Clamp((sw-80)/60,0,1);if(x1<camX-20||x0>camX+212)return;
    if(s.st){ctx.save();ctx.translate(x0+3,C2_FLOOR+16);ctx.rotate(k*0.8);fill("#5a3a22",-1.5,-28,3,28);fill("#8a5a32",-1.5,-28,1,28);fill("#c8a068",-1.5,-29,3,1);
      s.rope&&(fill("#4a7a2a",-2.5,-23,5,1),fill("#6a9a3a",-2.5,-21.5,5,1),fill("#4a7a2a",-2.5,-20,5,1));ctx.restore();
      for(let q=0;q<3;q++){const a=((tick*0.05+q/3+i)%1);ctx.globalAlpha=0.7*(1-a);fill("#ffffff",x0+3-3-a*4,C2_FLOOR+3+q,6+a*6,0.6);ctx.globalAlpha=1;}}
    for(let q=0;q<s.logs;q++){const y=C2_FLOOR-2.2+q*0.2+k*(16+q*5),dx=k*(18+q*10),col=["#7a5230","#8a5a32","#6a4628"][q];
      ctx.save();ctx.translate(x0+20+dx,y);ctx.rotate(k*(0.4+q*0.3));fill(col,-20,-1.6+(2-q)*-0.6,40,2.4);fill("#c8a068",-20,-1.6+(2-q)*-0.6,1.5,2.4);fill("#c8a068",18.5,-1.6+(2-q)*-0.6,1.5,2.4);fill("rgba(255,255,255,.15)",-20,-1.6+(2-q)*-0.6,40,0.5);ctx.restore();}
    if(s.rope&&s.logs){fill("#4a7a2a",x0+1,C2_FLOOR-3.4+k*16,5,0.8);}});
  /* the stake being planted */
  const m=C4.mini;if(m){const tx=c4Tip()-34,a=m.ang;ctx.save();ctx.translate(tx,C2_FLOOR+14);ctx.rotate(a);fill("#5a3a22",-1.5,-36,3,36);fill("#8a5a32",-1.5,-36,1,36);fill("#d8b080",-1.5,-1,3,2);ctx.restore();
    const gx=player.x-16,gy=player.y-52;fill("#04060a",gx-1,gy-1,34,8);fill("#2a3440",gx,gy,32,6);const gz=0.13/0.8*16;fill("#2a8a3a",gx+16-gz,gy,gz*2,6);
    const bx=gx+16+c3Clamp(a/0.8,-1,1)*14;fill(Math.abs(a)<0.13?"#aaffaa":"#ffe070",bx-2,gy+1,4,4);fill("#fff",bx-1,gy+1,1,1);
    m.drive&&text("THUNK!",gx+2,gy-8,"#ffe070",'4px "Press Start 2P",monospace');}}
function c4Camp(){const S4=c4S(),M=S4.mat,x=C4_CAMP,g=C2_FLOOR,water=S4.t8on||S4.end;
  /* gather spots: only marked once they matter */
  const sp=(k,on)=>on&&glow(C4_SPOT[k],g-4,8,"255,240,170",0.18+0.1*Math.sin(tick/10));
  for(let q=0;q<7;q++)fill(["#7a7a72","#9a9a92","#5a5a56"][q%3],C4_SPOT.gravel-6+q*2,g-1.2-(q%2),2,1.6);
  fill("#d8c08a",C4_SPOT.sand-7,g-1.5,14,2);fill("#e8d4a0",C4_SPOT.sand-6,g-1.5,10,0.6);
  if(!M.flint||!water){fill("#4a4a54",C4_SPOT.flint-3,g-3,6,3);fill("#7a7a88",C4_SPOT.flint-3,g-3,5,1);(tick>>4)%6===0&&fill("#ffffff",C4_SPOT.flint+1,g-3,1,1);}
  for(let q=0;q<6;q++){ctx.save();ctx.translate(C4_SPOT.sticks-8+q*3,g-1-(q%3)*1.5);ctx.rotate((q%2?0.3:-0.25));fill("#7a5a3a",-6,-0.6,12,1.3);ctx.restore();}
  for(let q=0;q<14;q++){const gx=C4_SPOT.grass-14+q*2,hh=6+(q%4)*2,sw=Math.sin(tick/30+q)*1;ctx.strokeStyle=q%2?"#c8b46a":"#a8943a";ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(gx,g);ctx.quadraticCurveTo(gx+sw,g-hh*0.6,gx+sw*2,g-hh);ctx.stroke();}
  if(water){sp("gravel",!M.gravel&&!S4.filt);sp("sand",!M.sand&&!S4.filt);sp("flint",!M.flint&&S4.fire<3);sp("sticks",S4.fire<1&&M.stick<3);}
  if(!water&&!S4.fire)return;
  /* fire pit */
  for(let q=0;q<7;q++)fill(q%2?"#6a6a62":"#8a8a82",x-9+q*3,g-2.5,3,2.5);
  if(S4.fire>=1){for(let q=0;q<3;q++){ctx.save();ctx.translate(x,g-3);ctx.rotate(-0.6+q*0.6);fill("#6a4a2a",-6,-1,12,2);ctx.restore();}}
  if(S4.fire===2||(C4.strike&&!C4.strike.c))fill("#c8b46a",x-3,g-6,6,2);
  const st=C4.strike;if(st&&st.c){const k=Math.min(1,st.t/90);glow(x,g-5,6+k*8,"255,160,60",0.4+0.3*k);c3Flame(x,3+k*8,1.5+k*2,Math.sin(tick/4)*0.6);}
  if(S4.fire===3){const fl=0.85+0.15*Math.sin(tick/5);glow(x,g-8,26,"255,150,60",0.35*fl);c3Flame(x-2,10*fl,3,Math.sin(tick/6));c3Flame(x+2,12*fl,3.4,Math.sin(tick/5+1));c3Flame(x,8*fl,2,0);
    tick%6===0&&parts.push({x:x+(Math.random()-0.5)*4,y:g-14,vx:(Math.random()-0.5)*0.2,vy:-0.4,life:40,c:"rgba(120,120,120,.5)",s:1.5});
    if(S4.fireT>=C4_COAL&&!M.coal&&!S4.filt){fill("#1a1a1e",x+5,g-2,4,2);fill("#ff6a2a",x+6,g-2,1,1);}}
  /* tripod + pot */
  if(S4.onFire||S4.fire===3){ctx.strokeStyle="#5a3a22";ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(x-11,g);ctx.lineTo(x,g-24);ctx.lineTo(x+11,g);ctx.stroke();}
  if(S4.onFire){fill("#2a2a2a",x-0.3,g-24,0.6,6);const py=g-16;fill("#3a3e46",x-6,py,12,8);fill("#9aa0aa",x-5.5,py,11,7);fill("#c8ced8",x-5.5,py,11,1);
    const boil=S4.boil/C4_BOIL;fill(S4.w===1?"#8a7a52":"#8ac0d8",x-4.5,py+0.5,9,1.5);
    if(boil>0.08){for(let q=0;q<3;q++)((tick+q*7)%14<5)&&fill("#ffffff",x-3+q*3,py-0.5,1,1);for(let q=0;q<3;q++){const a=((tick*0.02+q/3)%1);ctx.globalAlpha=0.45*(1-a);ctx.fillStyle="#ffffff";ctx.beginPath();ctx.arc(x-2+q*2+Math.sin(tick/20+q)*2,py-3-a*16,1.5+a*3,0,7);ctx.fill();ctx.globalAlpha=1;}}
    if(boil<1){fill("#04060a",x-10,g-35,20,4);fill("#2a3440",x-9.5,g-34.5,19,3);fill("#ff8a3a",x-9.5,g-34.5,19*boil,3);}else{(tick>>4)%2&&text("DONE",x-8,g-36,"#8aff9a",'4px "Press Start 2P",monospace');}}
  else if(S4.w>0&&S4.w<4&&inv.includes("pot")){fill("#3a3e46",x+13,g-6,10,6);fill("#9aa0aa",x+13.5,g-6,9,5.5);fill(S4.w===1?"#8a7a52":S4.w===2?"#9a8a62":"#8ac0d8",x+14,g-5.5,8,1.2);}
  if(S4.filt){const fx=x-22;ctx.strokeStyle="#6a4a2a";ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(fx-6,g);ctx.lineTo(fx,g-18);ctx.lineTo(fx+6,g);ctx.stroke();
    ctx.fillStyle="#efe8d8";ctx.beginPath();ctx.moveTo(fx-5,g-17);ctx.lineTo(fx+5,g-17);ctx.lineTo(fx+0.6,g-7);ctx.lineTo(fx-0.6,g-7);ctx.fill();fill("#8a8a84",fx-4.5,g-17,9,1.5);fill("#e0c88a",fx-3.5,g-15.5,7,2);fill("#1e1e22",fx-2.5,g-13.5,5,2);fill("#c8b46a",fx-1.2,g-11.5,2.4,2);}}
function c4Front(){if(c5Is())return c5Front();const S4=c4S(),C=S4.car;if(room==="port")c4PortFront();
  if(room==="river"&&!S4.bridge&&S4.arr&&(C.log||C.stake)&&!C3.cut){const bx=player.x-player.face*5,by=player.y-24*Po;for(let q=0;q<Math.min(3,C.log);q++)fill("#6a4a2a",bx-6,by+q*1.8,12,1.6);C.stake&&fill("#8a6a44",bx-1,by-6,1.5,14);}
  if(C4.drink&&!dead){const f=player.face,hx=player.x+f*6,hy=player.y-16.5*Po;ctx.save();ctx.translate(hx,hy);ctx.rotate(f*-2.2);fill("#c8e8f8",-1.5,-8,3,9);fill("#ffffff",-1.2,-7,0.8,7);fill("#3a6ad8",-1.5,-9.5,3,1.8);fill("#8ad8ff",-1,-4,2,4.5);ctx.restore();}
  if(room==="river"){/* front-layer reeds by the water */for(let q=0;q<10;q++){const x=C4_R1+4+q*3.5,h=6+(q%3)*3,sw=Math.sin(tick/25+q)*1;ctx.strokeStyle="#3a6a2a";ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(x,C2_FLOOR+3);ctx.quadraticCurveTo(x+sw,C2_FLOOR+3-h*0.6,x+sw*2,C2_FLOOR+3-h);ctx.stroke();}}
  if(C4.flood>0&&(room!=="river"||C3.cut&&C3.cut.k==="c4dam"))c4FloodWall();
  if(room==="river"&&C4.flood>0&&!(C3.cut&&C3.cut.k==="c4dam")){const top=C2_FLOOR-1-C4.flood*6;for(let n=0;n<26;n++){const a=((tick*0.06+n/26)%1),x=C4_R0+a*(C4_R1-C4_R0);fill("rgba(255,255,255,.8)",x,top-2-Math.sin(a*9+n)*2*C4.flood,4,1.5);}
    if(C3.cut&&C3.cut.k==="c4fall"){for(let q=0;q<3;q++)fill("rgba(255,255,255,.7)",player.x-6+q*5,C2_FLOOR+1,3,1);}}}
function c4Tint(){if(c5Is())return c5Tint();const S4=c4S();
  if(room!=="forest"){if(room==="cbridge"){ctx.save();ctx.globalCompositeOperation="multiply";ctx.fillStyle="rgb(236,232,224)";ctx.fillRect(0,0,192,108);ctx.restore();}
    ctx.save();ctx.globalCompositeOperation="multiply";ctx.fillStyle="rgb(238,228,208)";ctx.fillRect(0,0,192,108);ctx.restore();
    const hz=C3.cache.c4hz||(C3.cache.c4hz=(()=>{const q=ctx.createLinearGradient(0,0,0,108);q.addColorStop(0,"rgba(210,190,150,.12)");q.addColorStop(0.6,"rgba(210,190,150,0)");q.addColorStop(1,"rgba(40,30,20,.18)");return q;})());ctx.fillStyle=hz;ctx.fillRect(0,0,192,108);
    if(c4MeterOn()&&C4.sun===2){const p=0.035+0.015*Math.sin(tick/20);ctx.fillStyle="rgba(255,220,160,"+p+")";ctx.fillRect(0,0,192,108);for(let k=0;k<6;k++){ctx.globalAlpha=0.05;fill("#fff4d8",0,10+k*7+Math.sin(tick/9+k)*1.5,192,1);}ctx.globalAlpha=1;}}
  if(c4MeterOn()&&S4.met>=70){const p=(S4.met-70)/30,v=C3.cache.c4vg||(C3.cache.c4vg=(()=>{const q=ctx.createRadialGradient(96,54,30,96,54,118);q.addColorStop(0,"rgba(0,0,0,0)");q.addColorStop(1,"rgba(60,10,0,1)");return q;})());ctx.globalAlpha=0.25+0.45*p*(0.8+0.2*Math.sin(tick/12));ctx.fillStyle=v;ctx.fillRect(0,0,192,108);ctx.globalAlpha=1;}
  c4Hud();}
function c4Hud(){const S4=c4S();if(C3.cut&&C3.cut.k!=="c4arr"&&C3.cut.k!=="c4built"&&C3.cut.k!=="c4eight")return;const F='4px "Press Start 2P",monospace';
  if(c4MeterOn()){const m=S4.met,x=40,y=2;fill("#04030bcc",x,y,61,9);fill("#8ad8ff",x+3,y+2,2,4);fill("#8ad8ff",x+2.5,y+3,3,3);fill("#e8f8ff",x+3,y+3,1,1);
    const col=m<50?"#5ab8ff":m<70?"#ffd23a":m<85?"#ff8a3a":"#ff3a3a";fill("#1a1a2a",x+8,y+2,30,5);fill(col,x+8,y+2,30*m/100,5);fill("rgba(255,255,255,.3)",x+8,y+2,30*m/100,1);
    (m<85||(tick>>3)%2)&&text(Math.floor(m)+"%",x+40,y+2.5,m>=85?"#ff8a8a":"#ffffff",F);
    {const z=C4.sun,lab=["SHADE","SUN","HOT SUN!"][z],c2=["#8aff9a","#ffd870","#ff9a5a"][z],sx=x+63;fill("#04030bcc",sx,y,46,9);
      if(z){fill(c2,sx+3,y+3,3,3);for(let q=0;q<4;q++)fill(c2,sx+4+Math.cos(q*1.57)*3,y+4+Math.sin(q*1.57)*3,1,1);}else{fill("#3a7a34",sx+2,y+2,5,3);fill("#5a3a22",sx+4,y+5,1,2);}
      text(lab,sx+10,y+2.5,c2,F);}}
  const pp=S4.pt,ship=room==="port"&&pp.arr&&!pp.open&&!pp.done,tm=ship?pp.t:S4.damOn&&!S4.bridge&&S4.arr?S4.dam:S4.t8on&&!S4.end?S4.t8:-1;
  if(tm>=0){const s=Math.ceil(tm/60),txt=(ship?"SHIP ":"DAM ")+Math.floor(s/60)+":"+("0"+s%60).slice(-2),hot=s<=30,x=40,y=c4MeterOn()?12:2;fill("#04030bcc",x,y,47,9);fill(hot?"#ff3a3a":"#8a8a84",x+2,y+2,4,5);fill(ship?"#d8d4c8":"#4a7ab0",x+2,y+2,4,1.5);
    (!hot||(tick>>3)%2)&&text(txt,x+8,y+2.5,hot?"#ff8a8a":"#ffe070",F);}
  c4PortHud();
  if(room==="river"&&S4.arr&&!S4.bridge){const C=S4.car,y=99,ic=(x,k,n,cap)=>{fill("#04030bcc",x,y-1,24,8);c4Mini(k,x+2,y);text(n+"/"+cap,x+10,y+1,n?"#ffffff":"#8a8a9a",F);};
    ic(46,"log",C.log,C4_CAP.log);ic(71,"stake",C.stake,C4_CAP.stake);ic(96,"rope",C.rope,C4_CAP.rope);}
  if(room==="river"&&S4.t8on&&!S4.end){const M=S4.mat,L=[["stick",M.stick],["bark",M.bark],["grass",M.grass],["flint",M.flint],["coal",M.coal],["sand",M.sand],["gravel",M.gravel]].filter((q)=>q[1]);
    L.forEach((q,i)=>{const x=46+i*14;fill("#04030bcc",x,98,13,8);c4Mini(q[0],x+2,99);q[1]>1&&text(""+q[1],x+9,100,"#fff",'3px "Press Start 2P",monospace');});}}
/* tiny HUD glyphs */
function c4Mini(k,x,y){const f=(c,a,b,w,h)=>fill(c,x+a,y+b,w,h);
  if(k==="log"){f("#6a4a2a",0,1,7,3);f("#c8a068",6,1,1.5,3);f("#8a6a44",0,1,7,0.8);}
  else if(k==="stake"){f("#8a6a44",3,0,1.5,6);f("#c8a068",3,5,1.5,1);}
  else if(k==="rope"){ctx.strokeStyle="#6a9a3a";ctx.lineWidth=0.8;ctx.beginPath();ctx.ellipse(x+3.5,y+3,3,2.2,0,0,7);ctx.stroke();}
  else if(k==="stick"){f("#7a5a3a",0,4,7,1);f("#7a5a3a",1,2,6,1);}
  else if(k==="bark"){f("#efe8d8",1,0,5,6);f("#2a2a2a",2,2,2,0.6);f("#2a2a2a",3,4,2,0.6);}
  else if(k==="grass"){f("#c8b46a",1,1,1,5);f("#a8943a",3,0,1,6);f("#c8b46a",5,2,1,4);}
  else if(k==="flint"){f("#4a4a54",1,2,5,3);f("#8a8a98",1,2,4,1);}
  else if(k==="coal"){f("#1a1a1e",1,2,5,3);f("#3a3a40",1,2,4,1);}
  else if(k==="sand"){f("#e0c88a",0,3,7,3);f("#c8ac6a",2,3,1,1);}
  else if(k==="gravel"){f("#8a8a84",0,3,3,3);f("#6a6a64",3,4,3,2);f("#9a9a92",5,2,2,2);}}

/* ---------------- the old forest gets more life ---------------- */
var C4_FN=null;
function c4ForestNature(){const g=C2_FLOOR;if(!C4_FN){C4_FN=[];for(let n=0;n<70;n++){const x=r(n,1501)*C3_FW,k=["fern","flower","shroom","bush","fern","flower","rock","berry"][n%8];if(C3_POOLS.some((p)=>Math.abs(x-p.x)<p.w/2+6))continue;C4_FN.push({x,k,s:n});}}
  for(const q of C4_FN){if(q.x<camX-20||q.x>camX+212)continue;const x=q.x,s=q.s;
    if(q.k==="fern"){for(let k=-3;k<=3;k++){ctx.strokeStyle=k%2?"#2f6a30":"#3a8a3a";ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(x,g);ctx.quadraticCurveTo(x+k*2.5,g-9,x+k*5+Math.sin(tick/50+s)*0.6,g-5+Math.abs(k));ctx.stroke();}}
    else if(q.k==="flower"){const c=["#ff86d0","#ffe070","#a0a0ff","#ffffff"][s%4];for(let k=0;k<3;k++){const fx=x+k*3-3,fh=4+((s+k)%3)*2;fill("#3a7a2a",fx,g-fh,0.6,fh);fill(c,fx-1,g-fh-1,2,2);fill("#ffd23a",fx-0.3,g-fh-0.6,0.6,0.6);}}
    else if(q.k==="shroom"){fill("#e8e0d0",x,g-3,1.2,3);fill(s%2?"#c83a2a":"#c8a06a",x-2,g-4.5,5,2);s%2&&(fill("#fff",x-1,g-4.3,0.8,0.8),fill("#fff",x+1.4,g-3.8,0.8,0.8));fill("#e8e0d0",x+4,g-2,1,2);fill("#c8a06a",x+2.8,g-3,3.4,1.4);}
    else if(q.k==="bush"){for(let k=0;k<5;k++){ctx.fillStyle=k%2?"#2a5a2a":"#3a6a30";ctx.beginPath();ctx.arc(x-6+k*3,g-4-(k%2)*2,4,0,7);ctx.fill();}}
    else if(q.k==="berry"){for(let k=0;k<4;k++){ctx.fillStyle="#2a5a2a";ctx.beginPath();ctx.arc(x-4+k*3,g-4,3.5,0,7);ctx.fill();}for(let k=0;k<5;k++)fill("#5a3ad8",x-5+k*2.4,g-5+(k%2)*2,1.2,1.2);}
    else{fill("#5a5a54",x-3,g-3,7,3);fill("#7a7a72",x-2,g-3,4,1);fill("#3a6a2a",x-3,g-3.5,3,1);}}
  /* butterflies and birds */
  for(let k=0;k<4;k++){const bx=((k*290+tick*0.25*(k%2?1:-1))%C3_FW+C3_FW)%C3_FW,by=60+Math.sin(tick/30+k*2)*8;if(bx<camX-8||bx>camX+200)continue;const w=Math.sin(tick/3+k)>0;
    fill(["#ffe070","#ff86d0","#8ad8ff","#ffffff"][k],bx-(w?2:1),by,w?2:1,1.5);fill(["#ffe070","#ff86d0","#8ad8ff","#ffffff"][k],bx+0.6,by,w?2:1,1.5);fill("#2a2a2a",bx,by,0.6,1.5);}
  for(let k=0;k<2;k++){const bx=((k*600-tick*0.6)%(C3_FW+200)+C3_FW+200)%(C3_FW+200)-100,by=18+k*9+Math.sin(tick/20+k)*2;if(bx<camX-8||bx>camX+200)continue;const w=(tick>>3)%2;ctx.strokeStyle="#2a2a2a";ctx.lineWidth=0.6;ctx.beginPath();ctx.moveTo(bx-3,by-(w?1.5:-0.5));ctx.lineTo(bx,by);ctx.lineTo(bx+3,by-(w?1.5:-0.5));ctx.stroke();}
  /* the note on its tree */
  const S4=c3S().c4;if(c3S().done){const nx=C4_NOTE-1,ny=g-40;fill("rgba(0,0,0,.3)",nx-3,ny+1,8,9);fill("#e8dcb8",nx-4,ny,8,9);fill("#d4c094",nx-4,ny+6,8,3);for(let q=0;q<3;q++)fill("#5a5a7a",nx-3,ny+2+q*2,6-q,0.5);fill("#c8342a",nx,ny-0.5,1.5,1.5);
    if(!(S4&&S4.note)){const a=0.5+0.5*Math.sin(tick/9);glow(nx,ny+4,10,"255,240,190",0.3*a);}}}
function c4ForestFront(){const g=108;for(let n=0;n<16;n++){const x0=r(n,1511)*(C3_FW+200),x=x0-camX*0.18;const sx=((x-camX)%280+280)%280-40+camX;
  for(let k=-2;k<=2;k++){ctx.strokeStyle=n%2?"rgba(20,50,24,.9)":"rgba(30,64,30,.9)";ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(sx,g);ctx.quadraticCurveTo(sx+k*3,g-10,sx+k*7+Math.sin(tick/40+n)*1,g-6+Math.abs(k)*1.5);ctx.stroke();}}}
/* the extra gathering spots of the forest crafting tree */
function c4ForestSpots(){const g=C2_FLOOR,G=(k)=>c3Got(k),pulse=0.5+0.5*Math.sin(tick/9);
  {const x=C3_FI.whet;fill("#5a5a56",x-7,g-3,14,3);fill("#8a8a84",x-6,g-3.5,12,1.5);fill("#a8a8a0",x-4,g-3.5,6,0.6);if(!G("whet")){fill("rgba(140,200,255,.5)",x-2,g-3.4,4,0.6);pulse>0.7&&glow(x,g-4,7,"220,240,255",0.25);}else fill("#6a6a64",x-6,g-2,10,2);}
  {const x=C3_FI.fern,n=G("fern")?2:7;for(let q=0;q<n;q++){const fx=x-12+q*4;for(let k=-3;k<=3;k++){ctx.strokeStyle=k%2?"#2f7a34":"#4a9a3a";ctx.lineWidth=0.7;ctx.beginPath();ctx.moveTo(fx,g);ctx.quadraticCurveTo(fx+k*2,g-10-(q%3)*2,fx+k*4.5+Math.sin(tick/45+q)*0.6,g-6-(q%3)*2+Math.abs(k));ctx.stroke();}}}
  {const x=C3_FI.vineb;if(!G("vineb")){for(let y=0;y<26;y++)fill(y%4?"#3a6a2a":"#4a8a34",x+12+Math.sin(tick/40+y*0.25)*1.2*(y/26),g-74+y,1,1);fill("#2a4a1a",x+10,g-49,5,2);pulse>0.6&&glow(x+12,g-60,8,"200,255,160",0.2);}}
  {const x=C3_FI.vinec;if(!G("vinec")){for(let y=0;y<30;y++)fill(y%4?"#3a6a2a":"#4a7a34",x+6+Math.sin(tick/40+y*0.2)*1*(y/30),g-34+y,1,1);fill("#2a4a1a",x+4,g-6,6,3);}}
  {const x=C3_FI.dleaves;if(!G("leaves")){for(let k=0;k<16;k++)fill(["#5a3a1a","#4a2a14","#6a4a22"][k%3],x-9+((k*7)%18),g-1.5-((k*5)%4)*0.6,3,2);fill("rgba(120,140,110,.35)",x-10,g-0.6,20,0.6);(tick>>5)%3===0&&fill("#8a9a7a",x+((tick>>2)%16)-8,g-1,1,1);}}}

/* a wall of brown floodwater surging up the screen, with a churning foam crest and debris */
function c4FloodWall(){const k=C4.flood,top=108-k*100,L=camX-2;
  const gr=ctx.createLinearGradient(0,top,0,108);gr.addColorStop(0,"rgba(120,150,150,.92)");gr.addColorStop(0.25,"rgba(80,100,90,.94)");gr.addColorStop(1,"rgba(40,56,50,.97)");ctx.fillStyle=gr;ctx.fillRect(L,top,196,110-top);
  for(let x=0;x<196;x+=2){const y=top-2.5-2*Math.sin(x*0.12+tick*0.35)-1.5*Math.sin(x*0.31-tick*0.5);fill(x%6?"#e8f4f0":"#ffffff",L+x,y,2,3+Math.sin(x+tick)*1);}
  for(let n=0;n<30;n++){const a=((tick*0.04+n/30)%1),x=L+((n*37+tick*3)%196),y=top+4+a*(108-top);ctx.globalAlpha=0.6*(1-a);fill("#d8ece8",x,y,3+(n%3),1);ctx.globalAlpha=1;}
  for(let n=0;n<5;n++){const x=L+((n*61+tick*2.2)%220)-14,y=top+6+n*5+Math.sin(tick/9+n)*2;ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(tick/20+n)*0.6);fill(n%2?"#6a4a2a":"#5a3a22",-9,-1.2,18,2.4);fill("#c8a068",8,-1.2,1.5,2.4);ctx.restore();}
  for(let n=0;n<12;n++){const a=((tick*0.05+n/12)%1);ctx.globalAlpha=0.5*(1-a);ctx.fillStyle="#ffffff";ctx.beginPath();ctx.arc(L+((n*29+tick)%196),top-2-a*10,1.5+a*4,0,7);ctx.fill();ctx.globalAlpha=1;}}
