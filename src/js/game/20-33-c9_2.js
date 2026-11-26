/* ======================= THE MEMORY: the time machine movie, told with the opening cutscene's engine =======================
   Every scene draws its picture into a full-resolution buffer, then a second, persistent buffer holds the light:
   sparks, arcs and streaks are drawn there with additive blending and fade a little each frame (real motion trails).
   The two are combined with a cheap bloom (downscale + smooth upscale), colour fringing, a flash layer and camera shake. */
var C9V={reg:0,spin:0,over:0,enter:0,holo:0,P:[],last:0,arcs:[],arcT:0,face:4};
function c9Cv(w,h){const c=document.createElement("canvas");c.width=w;c.height=h;return c;}
var C9B=null;
function c9Bufs(){if(C9B)return C9B;const b={B:c9Cv(384,216),T:c9Cv(384,216),S:c9Cv(96,54),R:c9Cv(384,216),C:c9Cv(384,216)};
  for(const k in b){const g=b[k].getContext("2d");g.imageSmoothingEnabled=k==="S";b[k+"g"]=g;}return(C9B=b);}
/* draw with the game's helpers into another canvas (they all paint on the global ctx) */
function c9On(g,fn){const o=ctx;ctx=g;ctx.save();ctx.setTransform(2,0,0,2,0,0);try{fn();}finally{ctx.restore();ctx=o;}}
/* ---- the compositor ---- */
function c9Compose(o){const b=c9Bufs(),out=ctx;o=o||{};
  b.Bg.setTransform(1,0,0,1,0,0);b.Bg.clearRect(0,0,384,216);c9On(b.Bg,o.base||(()=>{}));
  /* light buffer: fade what was there, then add this frame's light */
  b.Tg.setTransform(1,0,0,1,0,0);b.Tg.globalCompositeOperation="destination-out";b.Tg.fillStyle="rgba(0,0,0,"+(o.fade==null?0.2:o.fade)+")";b.Tg.fillRect(0,0,384,216);
  b.Tg.globalCompositeOperation="lighter";c9On(b.Tg,o.light||(()=>{}));b.Tg.globalCompositeOperation="source-over";
  const sx=o.shake?(Math.random()-0.5)*o.shake:0,sy=o.shake?(Math.random()-0.5)*o.shake:0;
  out.save();out.translate(sx,sy);out.imageSmoothingEnabled=!1;out.drawImage(b.B,0,0,192,108);
  out.globalCompositeOperation="lighter";out.drawImage(b.T,0,0,192,108);
  /* bloom: a soft, blurred copy of the bright parts */
  b.Sg.clearRect(0,0,96,54);b.Sg.globalCompositeOperation="source-over";b.Sg.drawImage(b.B,0,0,96,54);b.Sg.globalCompositeOperation="lighter";b.Sg.drawImage(b.T,0,0,96,54);
  out.imageSmoothingEnabled=!0;out.globalAlpha=Math.min(0.6,o.bloom==null?0.3:o.bloom);out.drawImage(b.S,-2,-1,196,110);out.globalAlpha=1;out.imageSmoothingEnabled=!1;
  /* colour fringing: red and blue copies pulled apart */
  const ab=o.ab||0;if(ab>0.05){for(const [col,dx] of [["#ff2010",ab],["#1040ff",-ab]]){b.Rg.globalCompositeOperation="source-over";b.Rg.clearRect(0,0,384,216);b.Rg.drawImage(b.B,0,0);b.Rg.drawImage(b.T,0,0);b.Rg.globalCompositeOperation="multiply";b.Rg.fillStyle=col;b.Rg.fillRect(0,0,384,216);b.Rg.globalCompositeOperation="destination-in";b.Rg.drawImage(b.B,0,0);
      out.globalAlpha=0.45;out.drawImage(b.R,dx,0,192,108);out.globalAlpha=1;}}
  out.globalCompositeOperation="source-over";
  if(o.flash>0){out.fillStyle="rgba(235,248,255,"+Math.min(1,o.flash)+")";out.fillRect(-10,-10,212,128);}
  out.restore();}
/* ---- particles (they live in logical 192x108 space and are drawn into the light buffer) ---- */
function c9Emit(p){C9V.P.length<900&&C9V.P.push(p);}
function c9Particles(dt){const keep=[];for(const p of C9V.P){p.life-=dt;if(p.life<=0)continue;
    if(p.k==="vortex"){p.a+=p.w*dt;p.r-=p.v*dt*(1+(40-Math.min(40,p.r))*0.05);if(p.r<1.5)continue;const x=p.cx+Math.cos(p.a)*p.r,y=p.cy+Math.sin(p.a)*p.r*0.55;ctx.strokeStyle=p.c;ctx.lineWidth=p.s;ctx.beginPath();ctx.moveTo(p.x==null?x:p.x,p.y==null?y:p.y);ctx.lineTo(x,y);ctx.stroke();p.x=x;p.y=y;}
    else{const x0=p.x,y0=p.y;p.vy+=(p.g||0)*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.floor&&p.y>p.floor){p.y=p.floor;p.vy*=-0.4;p.vx*=0.7;}ctx.globalAlpha=Math.min(1,p.life/(p.l0*0.5));ctx.strokeStyle=p.c;ctx.lineWidth=p.s;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(p.x,p.y);ctx.stroke();ctx.globalAlpha=1;}
    keep.push(p);}C9V.P=keep;}
/* a jagged lightning bolt, drawn three times: a wide soft glow, a coloured body and a white-hot core */
function c9Bolt(x0,y0,x1,y1,seg,jit,col){const pts=[[x0,y0]];for(let i=1;i<seg;i++){const k=i/seg;pts.push([x0+(x1-x0)*k+(Math.random()-0.5)*jit,y0+(y1-y0)*k+(Math.random()-0.5)*jit]);}pts.push([x1,y1]);
  const P=()=>{ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);for(const q of pts)ctx.lineTo(q[0],q[1]);};ctx.lineCap="round";ctx.lineJoin="round";
  P();ctx.strokeStyle="rgba("+col+",.25)";ctx.lineWidth=3.2;ctx.stroke();P();ctx.strokeStyle="rgba("+col+",.85)";ctx.lineWidth=1.2;ctx.stroke();P();ctx.strokeStyle="#ffffff";ctx.lineWidth=0.5;ctx.stroke();
  if(Math.random()<0.5){const m=pts[(pts.length/2)|0];c9Bolt(m[0],m[1],m[0]+(Math.random()-0.5)*18,m[1]+(Math.random()-0.2)*14,4,4,col);}}
/* ---------------- THE TIME MACHINE (an original design: a gyroscope of three rings around a plasma core) ---------------- */
function c9Ring(cx,cy,R,rot,tilt,w,front,glowA,col){const ry=R*Math.max(0.08,Math.abs(Math.cos(rot)));ctx.save();ctx.translate(cx,cy);ctx.rotate(tilt);
  const a0=front?0:Math.PI,a1=front?Math.PI:2*Math.PI;
  ctx.lineCap="butt";ctx.strokeStyle="#0c1218";ctx.lineWidth=w+1.6;ctx.beginPath();ctx.ellipse(0,0,R,ry,0,a0,a1);ctx.stroke();
  const gr=ctx.createLinearGradient(0,-ry,0,ry);gr.addColorStop(0,"#d8e4ec");gr.addColorStop(0.5,"#6a7c8a");gr.addColorStop(1,"#2a3640");ctx.strokeStyle=gr;ctx.lineWidth=w;ctx.beginPath();ctx.ellipse(0,0,R,ry,0,a0,a1);ctx.stroke();
  ctx.strokeStyle="rgba("+col+","+(0.35+0.65*glowA)+")";ctx.lineWidth=Math.max(0.6,w*0.3);ctx.beginPath();ctx.ellipse(0,0,R,ry,0,a0,a1);ctx.stroke();
  for(let i=0;i<10;i++){const an=i/10*6.283+rot*2;if((Math.sin(an)>0)!==front)continue;ctx.fillStyle=glowA>0.4?"rgb("+col+")":"#a8b8c4";ctx.fillRect(Math.cos(an)*R-0.8,Math.sin(an)*ry-0.8,1.6,1.6);}
  ctx.restore();}
function c9Machine(t,sp,ov){/* sp: spin 0..1, ov: overload 0..1 */
  const cx=96,cy=50,g=86;
  /* platform */
  ctx.fillStyle="#0a1016";ctx.beginPath();ctx.ellipse(cx,g,44,9,0,0,7);ctx.fill();const pg=ctx.createLinearGradient(0,g-8,0,g+8);pg.addColorStop(0,"#5a6c78");pg.addColorStop(1,"#1a242c");ctx.fillStyle=pg;ctx.beginPath();ctx.ellipse(cx,g-1,42,7.5,0,0,7);ctx.fill();
  ctx.strokeStyle="rgba(120,230,255,"+(0.25+0.6*sp)+")";ctx.lineWidth=0.8;for(let k=0;k<3;k++){ctx.beginPath();ctx.ellipse(cx,g-1,14+k*9+((t*0.01*sp)%9),3+k*1.6,0,0,7);ctx.stroke();}
  /* tesla pillars */
  [[52,1],[140,-1]].forEach(([px])=>{ctx.fillStyle="#1a2228";ctx.fillRect(px-4,g-40,8,40);for(let k=0;k<9;k++){ctx.fillStyle=k%2?"#b8743a":"#d8955a";ctx.fillRect(px-5,g-36+k*4,10,2.2);}
    const r=4+sp*1.5;const og=ctx.createRadialGradient(px-1,g-44,0.5,px,g-43,r);og.addColorStop(0,"#ffffff");og.addColorStop(0.4,"#9ae8ff");og.addColorStop(1,"#2a4a5a");ctx.fillStyle=og;ctx.beginPath();ctx.arc(px,g-43,r,0,7);ctx.fill();});
  /* the rings, back halves first */
  const w=(k)=>t*0.0008*(1+sp*14+ov*20)*(k===1?-1.3:1)+k*1.7,glowA=Math.min(1,sp*1.2+ov);
  const R=[[30,0.25,3.2],[24,-0.6,2.6],[18,1.1,2.2]];R.forEach(([r,tl,wd],k)=>c9Ring(cx,cy,r,w(k),tl,wd,0,glowA,k%2?"255,200,120":"120,230,255"));
  /* the plasma core */
  const cr=5+sp*4+ov*6+Math.sin(t/60)*0.6*(0.3+sp);const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,cr*2.4);cg.addColorStop(0,"rgba(255,255,255,1)");cg.addColorStop(0.25,"rgba(170,240,255,.95)");cg.addColorStop(0.6,"rgba(60,140,255,.45)");cg.addColorStop(1,"rgba(20,40,120,0)");
  ctx.fillStyle=cg;ctx.beginPath();ctx.arc(cx,cy,cr*2.4,0,7);ctx.fill();
  R.forEach(([r,tl,wd],k)=>c9Ring(cx,cy,r,w(k),tl,wd,1,glowA,k%2?"255,200,120":"120,230,255"));
  /* the frame that holds it */
  ctx.fillStyle="#141c22";ctx.fillRect(cx-2,cy+30,4,g-cy-34);ctx.fillRect(cx-16,g-8,32,4);ctx.fillStyle="#4a5a66";ctx.fillRect(cx-16,g-8,32,1);}
function c9Lab(t,sp){/* the movie's laboratory set */
  const bg=ctx.createLinearGradient(0,0,0,108);bg.addColorStop(0,"#05080e");bg.addColorStop(0.7,"#0c1622");bg.addColorStop(1,"#101820");ctx.fillStyle=bg;ctx.fillRect(-20,-20,232,148);
  /* a huge round window with a storm outside */
  ctx.save();ctx.beginPath();ctx.arc(96,40,40,0,7);ctx.clip();const sk=ctx.createLinearGradient(0,0,0,80);sk.addColorStop(0,"#0a0a1c");sk.addColorStop(1,"#2a2050");ctx.fillStyle=sk;ctx.fillRect(50,0,92,82);
  for(let q=0;q<40;q++){fill("rgba(180,200,255,.35)",56+((q*13+t*0.15)%80),((q*23+t*0.4)%80),0.4,3);}ctx.restore();
  ctx.strokeStyle="#1a2630";ctx.lineWidth=4;ctx.beginPath();ctx.arc(96,40,40,0,7);ctx.stroke();ctx.lineWidth=1.4;for(let k=0;k<8;k++){const a=k/8*6.283;ctx.beginPath();ctx.moveTo(96,40);ctx.lineTo(96+Math.cos(a)*40,40+Math.sin(a)*40);ctx.stroke();}
  /* consoles, cables, a big clock */
  for(const x of [6,158]){fill("#0c1218",x,58,28,28);fill("#2a3a44",x,58,28,2);for(let q=0;q<12;q++)fill(((t/180+q+x)|0)%3?"#4aff9a":"#ff5a4a",x+3+(q%6)*4,62+((q/6)|0)*5,2,2);fill("#0a1a14",x+3,74,22,8);ctx.strokeStyle="#4aff9a";ctx.lineWidth=0.5;ctx.beginPath();for(let k=0;k<22;k++){const y=78+Math.sin(k/2+t/(120-sp*90))*2*(0.3+sp);k?ctx.lineTo(x+3+k,y):ctx.moveTo(x+3,y);}ctx.stroke();}
  ctx.strokeStyle="rgba(240,230,200,.7)";ctx.lineWidth=1;ctx.beginPath();ctx.arc(170,20,10,0,7);ctx.stroke();const h=-t*0.002*(1+sp*30);ctx.beginPath();ctx.moveTo(170,20);ctx.lineTo(170+Math.cos(h)*8,20+Math.sin(h)*8);ctx.moveTo(170,20);ctx.lineTo(170+Math.cos(h/12)*5,20+Math.sin(h/12)*5);ctx.stroke();
  /* floor: a perspective grid */
  ctx.fillStyle="#081016";ctx.fillRect(-20,86,232,40);ctx.strokeStyle="rgba(60,140,180,"+(0.2+0.4*sp)+")";ctx.lineWidth=0.4;for(let k=-10;k<=10;k++){ctx.beginPath();ctx.moveTo(96+k*4,86);ctx.lineTo(96+k*30,110);ctx.stroke();}for(let k=0;k<5;k++){const y=86+k*k*1.2;ctx.beginPath();ctx.moveTo(-20,y);ctx.lineTo(212,y);ctx.stroke();}
  for(let k=0;k<4;k++){ctx.strokeStyle="#0a0e12";ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(52+k*2,86);ctx.quadraticCurveTo(70,96+k*2,96,92);ctx.stroke();}}
var C9_HALE=null;
function c9Hale(){return C9_HALE||(C9_HALE=Object.assign({},playerLook,{gd:0,hs:3,hc:7,sk:1,fc:4,ey:1,gl:1,bs:2,bc:7,mo:0,cl:0,oc:0,tc:2}));}
/* ---------------- scenes ---------------- */
function c9ScRoom(t){/* the night before the pod: an old movie on the TV, rain on the window */
  const z=1+Math.min(0.9,t/14000)*c3Ez(Math.min(1,t/14000)),fx=96+54*c3Ez(Math.min(1,t/14000)),fy=54+6*c3Ez(Math.min(1,t/14000)),tv=0.6+0.4*Math.sin(t/90)*Math.sin(t/37),en=C9V.enter?Math.min(1,(performance.now()-C9V.enter)/700):0;
  c9Compose({fade:0.3,bloom:0.25,
    base:()=>{ctx.translate(96,54);ctx.scale(z+en*1.5,z+en*1.5);ctx.translate(-fx,-fy);
      const wall=ctx.createLinearGradient(0,0,0,108);wall.addColorStop(0,"#0c0c1c");wall.addColorStop(1,"#18142a");ctx.fillStyle=wall;ctx.fillRect(-40,-40,280,190);
      fill("#05060c",14,14,52,40);const sk=ctx.createLinearGradient(0,14,0,54);sk.addColorStop(0,"#140a2a");sk.addColorStop(1,"#3a1a4a");ctx.fillStyle=sk;ctx.fillRect(16,16,48,36);
      for(let q=0;q<14;q++){const bx=16+q*3.5,bh=8+((q*7)%14);fill("#0a0614",bx,52-bh,3,bh);for(let y=52-bh+2;y<50;y+=3)((q+y)%4)&&fill("#ffd070",bx+1,y,1,1);}
      for(let q=0;q<26;q++)fill("rgba(180,200,255,.45)",16+((q*11)%48),(((q*17)+t*0.06)%36)+16,0.4,2.5);fill("#2a2030",13,13,54,2);fill("#2a2030",13,53,54,2);fill("#2a2030",39,14,2,40);
      fill("#1a1428",76,20,20,26);fill("#c83a4a",78,22,16,10);text("SPACE",79,24,"#ffe070",'3px "Press Start 2P",monospace');
      /* the TV and its light */
      fill("#14101c",140,70,40,16);fill("#2a2030",140,70,40,2);fill("#3a2a20",144,44,34,26);fill("#1a1410",146,46,30,22);
      ctx.save();ctx.beginPath();ctx.rect(147,47,28,20);ctx.clip();c9Lab(t,0.2);ctx.translate(147,47);ctx.scale(0.15,0.19);c9Machine(t,0.5,0);ctx.restore();
      for(let q=0;q<20;q+=2)fill("rgba(0,0,0,.25)",147,47+q,28,0.6);
      /* the sofa, with you on it (only your top half shows over the backrest) */
      Ma(70,92,playerLook,0,1,{s:Po,closed:0,env:{c:"80,90,160",l:"160,200,255",a:0.2,dk:0.5}});
      fill("#2a1a2a",40,74,60,18);fill("#4a2a3a",40,74,60,3);fill("#1a0e1a",36,70,8,22);fill("#1a0e1a",96,70,8,22);fill("#0a0810",-40,92,280,40);
      ctx.fillStyle="rgba(120,180,255,"+(0.05+0.04*tv)+")";ctx.beginPath();ctx.moveTo(146,47);ctx.lineTo(40,30);ctx.lineTo(40,100);ctx.lineTo(146,68);ctx.fill();glow(161,57,14,"120,190,255",0.12+0.1*tv);glow(70,72,14,"120,180,255",0.06+0.05*tv);},
    light:()=>{},
    flash:en>0.6?(en-0.6)*2.5:0});}
function c9ScFilm(t){const now=performance.now(),sp=C9V.spin?Math.min(1,(now-C9V.spin)/7000):0,ov=C9V.over?Math.min(1,(now-C9V.over)/2200):0,dt=Math.min(50,now-(C9V.last||now))/16.7;C9V.last=now;
  /* emitters */
  if(sp>0){const n=Math.floor(1+sp*3+ov*6);for(let i=0;i<n;i++)c9Emit({k:"vortex",cx:96,cy:50,a:Math.random()*6.283,r:34+Math.random()*30,w:0.08+sp*0.12,v:0.25+sp*0.9,c:Math.random()<0.5?"rgba(120,230,255,.9)":"rgba(200,160,255,.9)",s:0.6,life:80,l0:80});
    if(Math.random()<0.15+sp*0.5)for(const px of [52,140])for(let q=0;q<3;q++)c9Emit({x:px,y:43,vx:(Math.random()-0.5)*2.2,vy:-Math.random()*1.6,g:0.07,floor:86,c:Math.random()<0.5?"#ffd880":"#ffffff",s:0.6,life:40,l0:40});}
  if(ov>0&&ov<0.25)for(let q=0;q<14;q++){const a=Math.random()*6.283,s=1.5+Math.random()*4;c9Emit({x:96,y:50,vx:Math.cos(a)*s,vy:Math.sin(a)*s*0.7,g:0.03,c:Math.random()<0.5?"#ffffff":"#9ae8ff",s:0.9,life:50,l0:50});}
  if(sp>0.15&&now-C9V.arcT>60){C9V.arcT=now;C9V.arcs=[];const n=sp>0.7?3:sp>0.35?2:1;for(let i=0;i<n;i++){const L=Math.random()<0.5,px=L?52:140,an=Math.random()*6.283;C9V.arcs.push([px,43,96+Math.cos(an)*28,50+Math.sin(an)*10]);}if(Math.random()<0.4)$sx("sizzle");}
  const walk=c3Clamp((now-(C9V.spin||now))/3200,0,1),hx=34+(96-34)*c3Ez(walk),hv=ov>0.15?0:1;
  c9Compose({fade:ov>0?0.18:0.3,bloom:0.2+sp*0.15+ov*0.3,shake:sp*1.4+ov*5,ab:sp*1.2+ov*4,flash:ov>0.55?(ov-0.55)*2.3:0,
    base:()=>{const z=1.05+sp*0.25+ov*0.4;ctx.translate(96,54);ctx.scale(z,z);ctx.translate(-96,-56);c9Lab(t,sp);c9Machine(t,sp,ov);glow(96,50,12+sp*14+ov*40,"140,220,255",0.18+sp*0.18+ov*0.3);glow(52,43,6+sp*5,"150,230,255",0.2+sp*0.3);glow(140,43,6+sp*5,"150,230,255",0.2+sp*0.3);
      if(hv){ctx.save();ctx.globalAlpha=1-Math.max(0,(sp-0.85)/0.15)*0.6;Ma(hx,88,c9Hale(),(t/140)|0,1,{s:Po*0.95,walk:walk>0&&walk<1,env:{c:"80,140,200",l:"170,230,255",a:0.25,dk:0.4}});ctx.restore();}},
    light:()=>{const z=1.05+sp*0.25+ov*0.4;ctx.translate(96,54);ctx.scale(z,z);ctx.translate(-96,-56);
      for(const a of C9V.arcs)c9Bolt(a[0],a[1],a[2],a[3],7,7,"140,220,255");c9Particles(dt);
      if(ov>0){const r=ov*150;ctx.strokeStyle="rgba(220,245,255,"+(1-ov)+")";ctx.lineWidth=3*(1-ov)+0.5;ctx.beginPath();ctx.ellipse(96,50,r,r*0.55,0,0,7);ctx.stroke();ctx.strokeStyle="rgba(160,120,255,"+(0.8-ov*0.8)+")";ctx.beginPath();ctx.ellipse(96,50,r*0.8,r*0.45,0,0,7);ctx.stroke();}}});}
function c9ScTunnel(t){const now=performance.now(),dt=Math.min(50,now-(C9V.last||now))/16.7;C9V.last=now;const k=Math.min(1,t/5200);
  for(let i=0;i<4;i++)c9Emit({k:"warp",z:1,a:Math.random()*6.283,r0:2+Math.random()*6,c:["#9ae8ff","#c8a0ff","#ffffff","#ffd080"][(Math.random()*4)|0],life:999,l0:999});
  const years=["2119","2104","2090","2077","2061","2048"];
  c9Compose({fade:0.3,bloom:0.35,shake:2.2+k*2,ab:2.5+Math.sin(t/200)*1.2,flash:t<350?1-t/350:(t>4900?(t-4900)/300:0),
    base:()=>{const g=ctx.createRadialGradient(96,54,2,96,54,120);g.addColorStop(0,"#ffffff");g.addColorStop(0.035,"#8ad0ff");g.addColorStop(0.16,"#2a1a5a");g.addColorStop(1,"#04020c");ctx.fillStyle=g;ctx.fillRect(-20,-20,232,148);
      for(let q=0;q<6;q++){const r=((t*0.05+q*24)%144);ctx.strokeStyle="rgba(200,220,255,"+(0.15+0.25*(r/144))+")";ctx.lineWidth=0.5+r/60;ctx.beginPath();ctx.ellipse(96,54,r*1.2,r*0.8,t/900+q,0,7);ctx.stroke();
        for(let j=0;j<12;j++){const a=j/12*6.283+t/600;ctx.fillStyle="rgba(255,255,255,"+(r/180)+")";ctx.fillRect(96+Math.cos(a)*r*1.2-0.5,54+Math.sin(a)*r*0.8-0.5,1+r/50,1+r/50);}}
      years.forEach((y,i)=>{const s=((t*0.00035+i/years.length)%1),sc=0.3+s*s*2.6,a=Math.min(1,(1-s)*3)*Math.min(1,s*6);if(a<=0)return;const an=i*1.1+t/2000,x=96+Math.cos(an)*s*60,yy=54+Math.sin(an)*s*36;
        ctx.save();ctx.globalAlpha=a*0.8;ctx.translate(x,yy);ctx.scale(sc,sc);ctx.fillStyle="#e8f4ff";ctx.font='6px "Press Start 2P",monospace';ctx.textAlign="center";ctx.fillText(y,0,0);ctx.restore();});
      for(let i=0;i<3;i++){const s=((t*0.0003+i/3)%1),sc=s*s*3,an=i*2.1+t/1500,x=96+Math.cos(an)*s*70,y=54+Math.sin(an)*s*40;ctx.save();ctx.globalAlpha=Math.min(1,(1-s)*3)*0.7;ctx.translate(x,y);ctx.scale(sc,sc);
        ctx.strokeStyle="#ffe8c0";ctx.lineWidth=1;ctx.beginPath();ctx.arc(0,0,8,0,7);ctx.stroke();const h=-t/80;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(h)*6,Math.sin(h)*6);ctx.moveTo(0,0);ctx.lineTo(Math.cos(h/8)*4,Math.sin(h/8)*4);ctx.stroke();ctx.restore();}},
    light:()=>{const keep=[];for(const p of C9V.P){if(p.k!=="warp")continue;const z0=p.z;p.z-=0.018*dt*(1+k*1.5);if(p.z<=0.02)continue;const s0=p.r0/z0,s1=p.r0/p.z;
        ctx.globalAlpha=Math.min(0.85,0.2+0.5*(1-p.z));ctx.strokeStyle=p.c;ctx.lineWidth=Math.min(1.6,0.25+0.35/p.z);ctx.beginPath();ctx.moveTo(96+Math.cos(p.a)*s0*3,54+Math.sin(p.a)*s0*2);ctx.lineTo(96+Math.cos(p.a)*s1*3,54+Math.sin(p.a)*s1*2);ctx.stroke();keep.push(p);}
      ctx.globalAlpha=1;C9V.P=keep;}});}
function c9ScMe(t){/* back in the hidden lab: you, and the machine you can already picture */
  const ho=C9V.holo?Math.min(1,(performance.now()-C9V.holo)/1500):0;
  c9Compose({fade:0.5,bloom:0.15+ho*0.15,
    base:()=>{wt(1.75+Math.min(0.15,t/60000),90,62);ctx.drawImage(backdrop("tlab"),0,0,C9_LW,108);const cx0=camX;camX=0;c9LabBack();camX=cx0;
      Ma(96,C2_FLOOR+2,Object.assign({},playerLook,{fc:C9V.face}),0,1,{s:Po,talk:C9V.talk,env:De.tlab});
      ctx.save();ctx.globalCompositeOperation="multiply";ctx.fillStyle="rgb(206,220,226)";ctx.fillRect(0,0,C9_LW,108);ctx.restore();},
    light:()=>{wt(1.75+Math.min(0.15,t/60000),90,62);
      if(ho>0){ctx.save();ctx.globalAlpha=ho*(0.55+0.15*Math.sin(t/90));ctx.translate(118,46);ctx.scale(0.42,0.42);ctx.translate(-96,-50);
        for(const [r,tl,k] of [[30,0.25,0],[24,-0.6,1],[18,1.1,2]]){const rot=t*0.0012*(k===1?-1.3:1)+k*1.7;ctx.save();ctx.translate(96,50);ctx.rotate(tl);ctx.strokeStyle="#6af0ff";ctx.lineWidth=1.2;ctx.beginPath();ctx.ellipse(0,0,r,r*Math.max(0.08,Math.abs(Math.cos(rot))),0,0,7);ctx.stroke();ctx.restore();}
        ctx.fillStyle="#bff8ff";ctx.beginPath();ctx.arc(96,50,6,0,7);ctx.fill();ctx.strokeStyle="#6af0ff";ctx.lineWidth=1;ctx.strokeRect(52,10,88,80);for(let y=12;y<90;y+=4){ctx.globalAlpha=ho*0.18;ctx.fillStyle="#6af0ff";ctx.fillRect(52,y,88,1);}ctx.restore();
}}});}
function c9MemScenes(){if(C9V.reg)return;C9V.reg=1;le.m9_room=(t)=>c9ScRoom(t);le.m9_film=(t)=>c9ScFilm(t);le.m9_tunnel=(t)=>c9ScTunnel(t);le.m9_me=(t)=>c9ScMe(t);}
/* ---------------- the script ---------------- */
async function c9Mem(done){c9MemScenes();c9Bufs();Object.assign(C9V,{spin:0,over:0,enter:0,holo:0,P:[],last:0,arcs:[],face:4,talk:0});modal=4;
  ot.style.zIndex=90;ot.hidden=!1;it.hidden=!0;nt.hidden=!0;ct.classList.remove("on");Jt=1;cutAbort=0;typing=0;speaker="";fade(1).catch(()=>{});
  setScene("m9_room");requestAnimationFrame(window.se);
  const me=async(t)=>{speaker="p";C9V.talk=1;await say(playerName,t);C9V.talk=0;},hale=async(t)=>{speaker="a";await say("THE MOVIE  /  DR. HALE",t);};
  try{
    await titleCard("THE NIGHT BEFORE THE POD",2400);await fade(0);
    await me("The night before the pod, I couldn't sleep. I put on an old movie.");
    await me("A scientist who built a machine to go back and fix the past.");
    C9V.enter=performance.now();$sx("whoosh");await wait(900);
    C9V.P=[];setScene("m9_film");$sx("rumble");
    await hale("If I can't change the future… then I'll change the past.");
    C9V.spin=performance.now();$sx("tune");$sx("rumble");
    await hale("Rings to full speed. Core is stable… stable…");
    await hale("Power at one hundred percent. Here we GO!");
    C9V.over=performance.now();$sx("boom");$sx("crash");hideDialog();await wait(2300);
    C9V.P=[];setScene("m9_tunnel");$sx("whoosh");await wait(5200);
    await fade(1);hideDialog();setScene("m9_me");C9V.face=4;await fade(0);
    await me("I laughed at it back then. It was just a movie.");
    await me("But the pod was real. Sample 07 was real. The Evolved are real.");
    C9V.holo=performance.now();$sx("tune");C9V.face=1;
    await me("So why not a time machine?");
    await me("If I can build one, I can go back before Sample 07 ever escaped. I can save the past. I can save everyone.");
    await titleCard("NEXT: BUILD A TIME MACHINE",2600);
  }catch(e){if(e!==0)console.error(e);}
  $sx("stop");hideDialog();ct.classList.remove("on");fade(1).catch(()=>{});await new Promise((r)=>setTimeout(r,640));ot.hidden=!0;ot.style.zIndex="";cutAbort=0;C9V.P=[];modal=0;done&&done();}
GM.c3.c9mem=()=>c9Mem(()=>{});GM.c3.c9v=()=>({spin:C9V.spin,over:C9V.over,P:C9V.P.length});
GM.c3.c9show=(name,t,o)=>{c9MemScenes();c9Bufs();Object.assign(C9V,o||{});ot.style.zIndex=90;ot.hidden=!1;modal=4;it.hidden=!0;nt.hidden=!0;cutAbort=0;Jt=0;fade(0).catch(()=>{});setScene(name);const t0=performance.now()-t;(0,eval)("Vt="+t0);requestAnimationFrame(window.se);};
GM.c3.cpSave=(r)=>{c2Save(r||room);};
