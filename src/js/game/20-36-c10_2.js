/* ======================= CHAPTER 3, PART 5 (ART): THE CITY AFTER DARK =======================
   Painted with the game's own city painters (Ye skyline, qe buildings, c2Apoc/c2Ground/c2Broken streets, the port's quay
   and containers, Ma people, Ea creatures), then graded to night. A screen-space light map gives real dynamic lighting:
   fires and lamps cut light into the darkness, and the player and the Evolved are lit by whatever is burning near them. */
var C10A={spr:{},L:null,lights:[],I:0};
const C10_PAL=[["#2a3434","#4a5856","#7a8a84"],["#33302c","#58524a","#8a8274"],["#26323a","#44545c","#748890"]];
/* near ruined buildings: [world x of left edge, width, height (world units), seed, palette, extras] */
const C10_BLD=[[-6,62,74,401,0,{fire:[[18,30],[40,46]],top:28}],[64,44,58,402,1,{fire:[[22,40]],coll:1}],[150,70,82,403,2,{nest:1}],[300,52,66,404,0,{fire:[[14,22],[36,38]],top:20,coll:1}],[372,60,78,405,1,{fire:[[30,30]]}],[452,46,52,406,2,{coll:1,top:26}]];
const C10_BAR=262,C10_SIGNX=96;
/* ---------------- night grading for a painted canvas ---------------- */
function c10Grade(cv,o){o=o||{};const g=cv.getContext("2d"),H=cv.height,W=cv.width;g.save();
  g.globalCompositeOperation="multiply";const q=g.createLinearGradient(0,0,0,H);q.addColorStop(0,o.top||"#2a2856");q.addColorStop(0.5,o.mid||"#4a3c6c");q.addColorStop(0.82,o.low||"#a0706a");q.addColorStop(1,o.bot||"#6a5466");g.fillStyle=q;g.fillRect(0,0,W,H);
  g.globalCompositeOperation="lighter";const h=g.createLinearGradient(0,H*0.55,0,H*0.86);h.addColorStop(0,"rgba(255,90,30,0)");h.addColorStop(1,"rgba(255,90,30,"+(o.fire==null?0.16:o.fire)+")");g.fillStyle=h;g.fillRect(0,0,W,H);
  g.restore();return cv;}
/* ---------------- the background tiles: the same city as chapter 2, months later and at night ---------------- */
{const _t=c5Tile;c5Tile=function(id,i,seed){if(id!=="crt")return _t(id,i,seed);const k=id+i;return C5.tiles[k]||(C5.tiles[k]=c10Tile(i,seed));};}
function c10Tile(i,seed){const harbor=i===3;
  const cv=Ae((t)=>{Ye(t,0,184,{hs:1.12,seed,grassH:14,sun:-600,bh:1.08,puddles:harbor?[]:[[70+70*i,204,26,3]],cars:[],haze:0.75});c2Apoc(t,i);
    if(harbor){c4PaintWide(t,i);c4PaintQuay(t,i);}else{t.fog(0,150,384,216,"#d8f0c0",0.16,seed,34,8,0.2);c2Ground(t,i);c2Broken(t,i,"road");}});
  c10Grade(cv,{fire:harbor?0.1:0.18});const g=cv.getContext("2d");
  /* a pale moon over the middle of the city, its light catching the smoke */
  if(i===1){g.save();g.globalCompositeOperation="lighter";const m=g.createRadialGradient(250,46,4,250,46,70);m.addColorStop(0,"rgba(255,220,230,.5)");m.addColorStop(1,"rgba(255,220,230,0)");g.fillStyle=m;g.fillRect(150,0,200,130);g.restore();
    g.fillStyle="#f4dce4";g.beginPath();g.arc(250,46,15,0,7);g.fill();g.fillStyle="#dcbcc8";[[244,40,4],[256,52,3],[252,38,2]].forEach(([x,y,r2])=>{g.beginPath();g.arc(x,y,r2,0,7);g.fill();});}
  /* soot streaks over windows that burned */
  g.save();g.globalCompositeOperation="multiply";for(let k=0;k<9;k++){const x=384*r(k,700+i*9),y=70+80*r(k,710+i*9),w=8+12*r(k,720+i),h2=20+30*r(k,730+i);const s=g.createLinearGradient(0,y,0,y-h2);s.addColorStop(0,"rgba(20,10,14,.55)");s.addColorStop(1,"rgba(20,10,14,0)");g.fillStyle=s;g.fillRect(x,y-h2,w,h2);}g.restore();
  return cv;}
/* ---------------- painted sprites ---------------- */
function c10Spr(key,fn){return C10A.spr[key]||(C10A.spr[key]=fn());}
/* a ruined building from the game's own painter (qe), graded to night, with a collapsed corner and exposed rebar */
function c10Bld(b){return c10Spr("b"+b[3],()=>{const [x,w,h,seed,pi,o]=b,W=w*2,H=h*2;
  const cv=Ae((t)=>{qe(t,8,216,W,H,seed,C10_PAL[pi],["#b8d0b0",0.2]);
    if(o.nest){/* the Evolution's growth: thick green roots climbing the walls, pink and lime pustules */
      for(let k=0;k<7;k++){let px=8+W*(0.08+0.84*r(k,900+seed)),py=216;const L=70+H*0.8*r(k,910+seed);for(let s=0;s<L;s+=2){const th=Math.max(1.5,7*(1-s/L));px+=(r(s+k*31,920)-0.5)*3+Math.sin(s/14+k)*0.8;py-=2;if(py<216-H+10)break;
        t.disc(px|0,py|0,th|0,(dx,dy)=>{const v=(-0.6*dx-0.8*dy)/Math.max(1,th)+0.6*(Et(px+dx,py+dy)-0.5);return v>0.45?[58,150,82]:v>0?[34,110,62]:[20,72,46];});
        if(r(s+k*7,930)<0.06)t.disc(px+((r(s,931)-0.5)*th*2|0),py|0,2,r(s,932)<0.5?[255,122,208]:[184,255,106]);}}
      for(let k=0;k<26;k++){const px=8+W*r(k,940+seed),py=216-H*0.9*r(k,941+seed);t.disc(px|0,py|0,1+(r(k,942)*2|0),[24,86,52]);t.px(px,py-1,r(k,943)<0.5?[255,150,220]:[200,255,140]);}}});
  const g=cv.getContext("2d");c10Grade(cv,{top:"#3a3466",mid:"#544470",low:"#8a6470",bot:"#5a4a5a",fire:0.2});
  if(o.coll){/* a corner has come down */g.save();g.globalCompositeOperation="destination-out";g.beginPath();g.moveTo(8+W*0.55,216-H-4);g.lineTo(8+W+2,216-H-4);g.lineTo(8+W+2,216-H+H*0.42);g.lineTo(8+W*0.82,216-H+H*0.3);g.lineTo(8+W*0.7,216-H+H*0.14);g.closePath();g.fill();g.restore();
    g.strokeStyle="#7a6a5a";g.lineWidth=1;for(let q=0;q<6;q++){const x0=8+W*(0.6+q*0.06),y0=216-H+H*(0.08+q*0.05);g.beginPath();g.moveTo(x0,y0);g.lineTo(x0+4+q,y0-6+(q%2)*3);g.stroke();}}
  if(o.fire)for(const [fx,fy] of o.fire){/* scorched, burnt-out windows */const s=g.createRadialGradient(8+fx*2,216-H+fy*2,2,8+fx*2,216-H+fy*2,26);s.addColorStop(0,"rgba(8,4,6,.85)");s.addColorStop(1,"rgba(8,4,6,0)");g.save();g.globalCompositeOperation="multiply";g.fillStyle=s;g.fillRect(0,0,384,216);g.restore();g.fillStyle="#140806";g.fillRect(8+fx*2-6,216-H+fy*2-8,12,16);}
  return cv;});}
function c10DrawBld(b){const [x,w,h]=b;if(x+w<camX-20||x>camX+212)return;ctx.drawImage(c10Bld(b),0,0,384,216,x-4,C2_FLOOR-108,192,108);}
/* the evacuation barricade: concrete barriers, two containers from the port, and the route sign */
function c10Jersey(){return c10Spr("jersey",()=>{const cv=document.createElement("canvas");cv.width=48;cv.height=28;const g=cv.getContext("2d");
  for(let y=0;y<28;y++)for(let x=0;x<48;x++){const inset=y<10?(10-y)*0.9:0;if(x<inset||x>=48-inset)continue;const n=Pt(x/5,y/4,77),v=0.45+0.3*(n-0.5)-(y>24?0.2:0)+(x<inset+2?0.15:0);const P=[[70,70,72],[104,104,104],[140,138,132],[176,172,164]];const c=c6Ramp(P,v,x,y);g.fillStyle="rgb("+c+")";g.fillRect(x,y,1,1);}
  for(let k=0;k<5;k++){g.fillStyle=k%2?"#e8e4d8":"#c83a2a";g.beginPath();g.moveTo(6+k*8,26);g.lineTo(12+k*8,26);g.lineTo(18+k*8,14);g.lineTo(12+k*8,14);g.fill();}
  g.fillStyle="rgba(40,110,50,.7)";for(let k=0;k<14;k++)g.fillRect((k*13)%46,24+(k%3),1,2+(k%2));g.fillStyle="#1a1a1a";g.fillRect(14,6,1,6);g.fillRect(15,11,3,1);return cv;});}
function c10SignSpr(){return c10Spr("sign",()=>{const cv=document.createElement("canvas");cv.width=96;cv.height=44;const g=cv.getContext("2d");
  for(let y=0;y<34;y++)for(let x=0;x<96;x++){const n=Pt(x/6,y/3,88),v=0.55+0.3*(n-0.5)-(y<2||y>31?0.3:0);g.fillStyle="rgb("+c6Ramp([[150,138,96],[196,180,120],[226,210,150],[240,228,180]],v,x,y)+")";g.fillRect(x,y,1,1);}
  g.fillStyle="#2a2018";g.fillRect(0,0,96,2);g.fillRect(0,32,96,2);g.fillRect(10,34,3,10);g.fillRect(83,34,3,10);
  g.font='8px "Press Start 2P",monospace';g.textBaseline="top";g.fillStyle="#1a1410";g.fillText("EVACUATION",8,4);g.fillText("ROUTE",8,15);g.fillStyle="#c82a1a";g.fillText("→",70,14);
  g.fillStyle="#c82a1a";g.font='6px "Press Start 2P",monospace';g.fillText("HARBOR",48,25);
  g.fillStyle="rgba(40,20,10,.5)";for(let k=0;k<30;k++)g.fillRect((k*29)%96,(k*11)%34,2,1);return cv;});}
function c10Barricade(){const S=c7S(),g=C2_FLOOR,x=C10_BAR,B=C10.bar||{};if(x<camX-80||x>camX+272)return;const broke=S.ce2||B.go;
  const J=c10Jersey(),jit=B.jit?(Math.random()-0.5)*B.jit:0;
  const jersey=(cx,ang,dy)=>{ctx.save();ctx.translate(cx,g-(dy||0));ctx.rotate(ang||0);ctx.drawImage(J,-12,-14,24,14);ctx.restore();};
  if(!broke){c4BoxArt(x-4+jit,g,0,"",5);c4BoxArt(x+3+jit*1.5,g-18,4,"",6);ctx.drawImage(c10SignSpr(),x-24+jit,g-59,48,22);jersey(x-30,0);jersey(x+30,0);
    /* razor wire along the top */ctx.strokeStyle="#8a8e90";ctx.lineWidth=0.4;for(let q=0;q<9;q++){ctx.beginPath();ctx.arc(x-18+q*4.4+jit,g-37,2,0,7);ctx.stroke();}}
  else{const k=Math.min(1,B.k||1);
    /* the top container tumbled toward the harbor, the lower one was shoved sideways */
    ctx.save();ctx.translate(x-30-22*k,g-9-8*Math.sin(k*3.14));ctx.rotate(-1.4*k);c4BoxArt(0,9,4,"crushed",6);ctx.restore();
    ctx.save();ctx.translate(x-10-8*k,g);ctx.rotate(-0.1*k);c4BoxArt(0,0,0,"crushed",5);ctx.restore();
    jersey(x-52-10*k,-0.45*k,0);jersey(x+30,0.08*k,0);
    ctx.save();ctx.translate(x-70-6*k,g-3);ctx.rotate(-1.45*k);ctx.drawImage(c10SignSpr(),-24,-10,48,22);ctx.restore();}}
/* a wrecked bus, a burnt car, lamp posts, oil drums with fires */
const C10_CARS=[[118,"sedan",1],[196,"hatch",4],[352,"van",2],[430,"sedan",9],[506,"hatch",7]],C10_LAMPS=[[226,1],[410,0],[560,2]],C10_DRUMS=[[170],[338],[476]];
function c10Lamp(x,mode){const g=C2_FLOOR;if(x<camX-30||x>camX+222)return;fill("#1e2226",x-0.8,g-40,1.6,40);fill("#3a4046",x-0.8,g-40,0.6,40);fill("#1e2226",x-0.8,g-41,8,1.4);fill("#2a3036",x+4,g-41,5,2.4);
  const on=c10LampOn(x,mode);fill(on>0.5?"#fff2c8":"#4a4438",x+4.6,g-38.8,3.8,0.8);}
function c10LampOn(x,mode){if(mode===0)return 0;const T=C10.t;if(mode===2)return 0.9;const f=Math.sin(T/3.1+x)*Math.sin(T/17+x*0.3);return f>0.55?0.1:f>0.3?0.5:1;}
function c10Drum(x){const g=C2_FLOOR;if(x<camX-20||x>camX+212)return;fill("#2a1a14",x-3,g-8,6,8);fill("#4a2a1c",x-3,g-8,1.4,8);fill("#1a100c",x+2,g-8,1,8);fill("#6a3a24",x-3,g-6,6,0.6);fill("#6a3a24",x-3,g-2.6,6,0.6);c10Flame(x,g-8,5,3.2);}
function c10Flame(x,y,h,w){const T=C10.t;for(let k=0;k<3;k++){const ph=T/3.2+k*1.7+x,hh=h*(0.7+0.3*Math.sin(ph)+0.15*Math.sin(ph*2.3+1)),xx=x+(k-1)*w*0.35;fill("#d8421c",xx-w*0.25,y-hh,w*0.5,hh+0.6);fill("#ff8a30",xx-w*0.18,y-hh*0.72,w*0.36,hh*0.72);fill("#ffd868",xx-w*0.08,y-hh*0.4,w*0.16,hh*0.4);}}
/* soft dithered smoke puffs (cached per size) */
function c10Puff(n,col){const key="pf"+n+col;return c10Spr(key,()=>{const cv=document.createElement("canvas");cv.width=cv.height=n*2;const g=cv.getContext("2d"),im=g.createImageData(n*2,n*2),d=im.data,c=col.split(",").map(Number);
  for(let y=0;y<n*2;y++)for(let x=0;x<n*2;x++){const dd=Math.hypot(x-n+0.5,y-n+0.5)/n;if(dd>=1)continue;const v=4*Math.pow(1-dd,1.3)*(0.75+0.5*Pt(x/4,y/4,n)),l=Math.floor(v)+(v%1>Et(x,y)?1:0);if(l<=0)continue;const i=4*(y*n*2+x);d[i]=c[0];d[i+1]=c[1];d[i+2]=c[2];d[i+3]=Math.min(255,46*l);}
  g.putImageData(im,0,0);return cv;});}
function c10Smoke(x,y,s,T,col){for(let q=0;q<6;q++){const k=((T*0.5+q*42+x*3)%250)/250,px=x+Math.sin(k*5+q)*4*s-k*18*s,py=y-k*70*s,sz=(6+k*22)*s;ctx.globalAlpha=0.8*(1-k)*Math.min(1,k*6);ctx.drawImage(c10Puff(24,col||"30,22,30"),px-sz/2,py-sz/2,sz,sz);}ctx.globalAlpha=1;}
/* ---------------- the Evolved ---------------- */
const C10_MUTE={skin:"#7fcf5a",main:"#4a3a5a",glow:1};
function c10Light(x,y){let I=0;for(const L of C10A.lights){const d=Math.hypot(L.x-x,(L.y-y)*1.4);if(d<L.r)I+=L.i*(1-d/L.r);}return Math.min(1,I);}
function c10Env(x,y,base){const I=c10Light(x,y);return{c:base?base.c:"44,30,60",l:I>0.25?"255,150,80":"150,160,230",a:0.2+0.18*I,dk:0.62-0.32*I};}
function c10Mutant(m){const g=C2_FLOOR,y=g-(m.lane||0);if(m.x<camX-30||m.x>camX+222)return;const fr=((C10.t+m.ph)/(m.run?4:9))|0;
  Ma(m.x,y,m.look,0,m.f,Object.assign({s:Po*(m.s||1),pose:c3Pose(m.run?"run":"walk",fr%8),env:c10Env(m.x,y-14)},C10_MUTE));
  const ex=m.x+m.f*2*(m.s||1),ey=y-30*(m.s||1);glow(ex,ey,3,"160,255,120",0.35);}
function c10Beast(m){const g=C2_FLOOR,y=g-(m.lane||0);if(m.x<camX-60||m.x>camX+252)return;const k=m.k||0.6;
  if(m.al!=null&&m.al<1)ctx.globalAlpha=m.al;c3Ea(m.x-m.f*33*k,y,m.f,m.kind,(C10.t+(m.ph||0))*(m.kind===2?1.2:1.8),k);ctx.globalAlpha=1;
  glow(m.x+m.f*1.5*k/0.6,y-15*k/0.62,m.kind===2?7:4,"255,50,30",0.55);}
function c10Actor(m){m.kind==="man"?c10Mutant(m):c10Beast(m);}
/* ---------------- light map ---------------- */
function c10Lights(){const T=C10.t,g=C2_FLOOR,L=[];const fl=(s)=>0.82+0.18*Math.sin(T/4+s)*Math.sin(T/11+s*2);
  for(const b of C10_BLD){const o=b[5];if(o.fire)for(const [fx,fy] of o.fire)L.push({x:b[0]+fx,y:g-b[2]+fy,r:34,i:0.9*fl(fx+b[3]),c:"255,120,40"});if(o.nest)L.push({x:b[0]+b[1]/2,y:g-20,r:46,i:0.4+0.15*Math.sin(T/30),c:"120,255,140"});if(o.top)L.push({x:b[0]+o.top,y:g-b[2]-2,r:40,i:fl(b[3])*0.9,c:"255,120,40"});}
  for(const [x,k,i] of C10_CARS)if(i%2===1)L.push({x:x+16,y:g-14,r:44,i:fl(i),c:"255,130,50"});
  for(const [x] of C10_DRUMS)L.push({x,y:g-12,r:36,i:fl(x),c:"255,140,60"});
  for(const [x,m] of C10_LAMPS){const on=c10LampOn(x,m);on>0&&L.push({x:x+6.5,y:g-38,r:34,i:0.8*on,c:"255,236,190",cone:1});}
  for(const m of C10.run||[])m.kind!=="man"&&L.push({x:m.x,y:g-12,r:10,i:0.25,c:"255,60,40"});
  C10A.lights=L;}
function c10LightMap(){return c10LM(C10A.lights,C10.dark==null?0.6:C10.dark,"10,6,26");}
/* a screen-space light map: darkness with soft holes cut by each light (cones for lamps) */
function c10LM(lights,dark,col){const W=384,H=216;if(!C10A.L){C10A.L=document.createElement("canvas");C10A.L.width=W;C10A.L.height=H;}const lg=C10A.L.getContext("2d");
  lg.globalCompositeOperation="source-over";lg.clearRect(0,0,W,H);lg.fillStyle="rgba("+(col||"10,6,26")+","+dark+")";lg.fillRect(0,0,W,H);
  lg.globalCompositeOperation="destination-out";for(const L of lights){const x=(L.x-camX)*2,y=L.y*2,R=L.r*2;if(x<-R||x>W+R)continue;
    const q=lg.createRadialGradient(x,y,0,x,y,R);q.addColorStop(0,"rgba(0,0,0,"+Math.min(1,L.i)+")");q.addColorStop(0.45,"rgba(0,0,0,"+Math.min(1,L.i*0.6)+")");q.addColorStop(1,"rgba(0,0,0,0)");lg.fillStyle=q;
    if(L.cone){lg.beginPath();lg.moveTo(x-3,y-4);lg.lineTo(x+3,y-4);lg.lineTo(x+R*0.5,y+R*1.3);lg.lineTo(x-R*0.5,y+R*1.3);lg.closePath();lg.fill();lg.beginPath();lg.arc(x,y,R*0.16,0,7);lg.fill();}else{lg.beginPath();lg.arc(x,y,R,0,7);lg.fill();}}
  return C10A.L;}
/* ---------------- the drawing passes for the room ---------------- */
function c10Back(){const S=c7S(),g=C2_FLOOR,T=C10.t;
  /* smoke from fires far off in the city */
  for(const [x,y,s] of [[40,30,1],[210,22,1.3],[330,34,0.9],[470,26,1.2]]){const fx=x+camX*0.3;if(fx<camX-60||fx>camX+252)continue;c10Smoke(fx,y,s,T,"26,18,26");glow(fx,y+4,10,"255,110,40",0.25+0.1*Math.sin(T/7+x));}
  /* distant glow of the Evolution's growth, over the heart of the city */
  {const gx=60+camX*0.55;if(gx>camX-60&&gx<camX+252){glow(gx,40,40,"110,255,140",0.08+0.04*Math.sin(T/40));}}
  for(const b of C10_BLD)c10DrawBld(b);
  /* fires in the burnt-out windows and on the roofs, with their smoke */
  for(const b of C10_BLD){const o=b[5];if(b[0]+b[1]<camX-30||b[0]>camX+222)continue;const top=g-b[2];
    if(o.fire)for(const [fx,fy] of o.fire){c10Flame(b[0]+fx,top+fy+3,5,4);glow(b[0]+fx,top+fy,14,"255,120,40",0.3);c10Smoke(b[0]+fx,top+fy-4,0.5,T+fx*9);}
    if(o.top){c10Flame(b[0]+o.top,top+1,7,6);c10Smoke(b[0]+o.top,top-6,0.8,T+b[3]);}
    if(o.nest){for(let q=0;q<10;q++){const px=b[0]+4+((q*37)%b[1]),py=g-6-((q*23)%(b[2]-12)),a=0.5+0.5*Math.sin(T/(14+q*2)+q);a>0.7&&fill(q%2?"#ff86d0":"#c8ff7a",px,py,1,1);glow(px,py,4,q%2?"255,120,200":"160,255,120",0.18*a);}}}
  for(const [x,m] of C10_LAMPS)c10Lamp(x,m);
  /* red eyes in dark windows */
  for(let q=0;q<22;q++){const x=(q*61+13)%C10_W,y=20+((q*37)%46);if(x<camX-10||x>camX+202)continue;const on=Math.sin(T/(40+q*3)+q*1.7)>0.6;on&&(fill("#ff3a2a",x,y,1,0.8),fill("#ff3a2a",x+2,y,1,0.8),glow(x+1,y,4,"255,40,30",0.28));}
  /* crows over the rooftops */
  for(let q=0;q<5;q++){const cx=120+q*110+Math.sin(T/60+q)*30,cy=16+((q*13)%14)+Math.sin(T/23+q*2)*4;if(cx<camX-10||cx>camX+202)continue;c3Crow(cx,cy,T/8+q,Math.cos(T/60+q)>0?1:-1,0.5);}
  /* the actors that walk in the far lane go behind the street props */
  for(const m of C10.run||[])(m.lane||0)>2&&c10Actor(m);
  for(const [x,k,i] of C10_CARS){const c=c2NewCar(x,k,i);c.burn=i%2===1;c2Car(c);}
  for(const [x] of C10_DRUMS)c10Drum(x);
  c10Barricade();
  if(camX<C10_SIGNX+60){ctx.drawImage(c10SignSpr(),C10_SIGNX-24,g-30,48,22);}
  /* the ship tied up at the far right of the pier */
  if(camX>C10_W-330){const h=c7HullSpr();ctx.save();ctx.translate(C10_W+104,0);ctx.scale(-1,1);ctx.drawImage(h,0,g-98,150,118);ctx.restore();}
  for(const m of C10.run||[])(m.lane||0)<=2&&c10Actor(m);
  for(const d of C10.deb){ctx.save();ctx.translate(d.x,d.y);ctx.rotate(d.r||0);fill(d.c,-d.s/2,-d.s/2,d.s,d.s);ctx.restore();}
  for(const p of C10.dust){ctx.globalAlpha=Math.max(0,p.a);ctx.drawImage(c10Puff(24,"120,104,96"),p.x-p.s/2,p.y-p.s/2,p.s,p.s);}ctx.globalAlpha=1;
  /* the player is lit by whatever is burning nearby */
  const e=c10Env(player.x,player.y-14);De.crt=Object.assign(De.crt||{},{c:"70,50,80",l:e.l,a:e.a*0.8,dk:e.dk});}
function c10Front(){for(const a of C10.ash){ctx.globalAlpha=a.a;fill(a.hot?"#ffb060":"#b8b0b0",a.x,a.y,a.hot?0.6:0.7,a.hot?0.6:0.7);a.hot&&glow(a.x,a.y,2,"255,150,60",0.2*a.a);}ctx.globalAlpha=1;}
function c10Tint(){c10Lights();const T=C10.t;
  ctx.save();ctx.setTransform(ctx.canvas.width/192,0,0,ctx.canvas.height/108,0,0);ctx.drawImage(c10LightMap(),0,0,192,108);
  for(const L of C10A.lights){const x=L.x-camX;if(x<-L.r||x>192+L.r)continue;glow(x,L.y,L.r*(L.cone?0.3:0.6),L.c,(L.cone?0.1:0.14)*L.i);}
  const vg=C3.cache.c10vg2||(C3.cache.c10vg2=(()=>{const q=ctx.createRadialGradient(96,54,36,96,54,118);q.addColorStop(0,"rgba(0,0,0,0)");q.addColorStop(1,"rgba(6,2,10,.5)");return q;})());ctx.fillStyle=vg;ctx.fillRect(0,0,192,108);
  if(C10.flash>0){ctx.fillStyle="rgba(255,240,220,"+C10.flash+")";ctx.fillRect(0,0,192,108);}
  if(C3.dark>0){ctx.fillStyle="rgba(0,0,4,"+C3.dark+")";ctx.fillRect(0,0,192,108);}ctx.restore();}
function c10Tick(){C10.t++;C10.flash>0&&(C10.flash=Math.max(0,C10.flash-0.05));const B=C10.bar;B&&(B.jit=Math.max(0,(B.jit||0)*0.88),B.go&&B.k<1&&(B.k=Math.min(1,B.k+0.05)));
  if(C10.t%3===0&&C10.ash.length<70)C10.ash.push({x:camX+Math.random()*210,y:-2,vx:-0.12-Math.random()*0.2,vy:0.12+Math.random()*0.2,a:0.3+Math.random()*0.5,hot:Math.random()<0.3});
  for(const [x] of C10_DRUMS)if(C10.t%9===0&&Math.abs(x-camX-96)<140&&C10.ash.length<90)C10.ash.push({x,y:C2_FLOOR-12,vx:(Math.random()-0.5)*0.3,vy:-0.4-Math.random()*0.4,a:0.9,hot:1});
  C10.ash=C10.ash.filter((a)=>{a.x+=a.vx+Math.sin((C10.t+a.y)/20)*0.1;a.y+=a.vy;a.hot&&a.vy<0&&(a.a-=0.008);return a.y<110&&a.y>-5&&a.a>0;});
  C10.deb=C10.deb.filter((d)=>{d.x+=d.vx;d.y+=d.vy;d.vy+=0.14;d.r=(d.r||0)+d.vx*0.2;if(d.y>C2_FLOOR){d.y=C2_FLOOR;d.vx*=0.5;d.vy*=-0.25;d.life-=6;}d.life--;return d.life>0;});
  C10.dust=C10.dust.filter((p)=>{p.x+=p.vx;p.y+=p.vy;p.vx*=0.97;p.s+=0.35;p.a-=0.01;return p.a>0;});
  C10.run=(C10.run||[]).filter((m)=>{if(m.d>0){m.d--;return!0;}if(m.stop>0){m.stop--;if(!m.stop&&m.next){Object.assign(m,m.next);m.next=null;}return!0;}m.x+=m.vx;if(m.turn&&m.x<=m.turn.x&&m.vx<0){m.vx=m.turn.vx;m.f=m.turn.f;m.turn=null;}return m.x>-80&&m.x<C10_W+80;});}
function c10Boom(x,y,n){for(let q=0;q<n;q++)C10.deb.push({x:x+(Math.random()-0.5)*16,y:y-Math.random()*20,vx:(Math.random()-0.3)*3.4,vy:-1-Math.random()*3.4,life:140,c:["#5a5a5e","#3a3a40","#8a8478","#6a4a2e"][q%4],s:1+Math.random()*2});
  for(let q=0;q<14;q++)C10.dust.push({x:x+(Math.random()-0.5)*30,y:C2_FLOOR-4-Math.random()*16,vx:(Math.random()-0.5)*1.2,vy:-0.1-Math.random()*0.3,s:8+Math.random()*10,a:0.7});}
/* ---------------- the same real lighting in the tower's control and generator rooms ---------------- */
function c10TowerLights(){const S=c7S(),g=C2_FLOOR,T=tick,L=[];
  if(room==="tctl"){const P=c7LampSet(),on=P.pw||P.fl;[48,150,250].forEach((lx,q)=>L.push({x:lx,y:26,r:48,i:0.7+(T%140<3&&q===1?-0.3:0),c:"200,225,240",cone:1}));
    if(P.pw)for(let q=0;q<3;q++)L.push({x:109+q*9,y:g-45,r:10,i:0.6,c:"90,255,140"});
    if(on){for(let q=0;q<3;q++)for(let k=0;k<3;k++)L.push({x:224.5+k*11,y:g-68.5+q*19,r:9,i:0.45,c:"255,200,110"});L.push({x:184,y:g-12,r:22,i:0.55,c:"90,255,150"});}
    C7.pow&&L.push({x:229,y:g-82,r:18,i:0.7,c:"255,60,40"});L.push({x:262,y:g-28,r:22,i:0.45,c:"170,210,230"});L.push({x:40,y:g+4,r:16,i:0.2,c:"200,225,240"});}
  else if(room==="tgen"){const hot=S.gs<=1&&!S.gen,run=S.gen||S.gs>=7;[70,200,330].forEach((lx)=>{const fl=hot&&T%47<3?0.4:1;L.push({x:lx,y:18,r:56,i:0.75*fl,c:"255,200,120",cone:1});});
    L.push({x:30,y:3,r:30,i:0.5,c:"200,225,240"});hot&&L.push({x:230,y:g-30,r:50,i:0.5+0.15*Math.sin(T/8),c:"255,80,40"});run&&L.push({x:230,y:g-30,r:30,i:0.3,c:"255,200,120"});}
  return L;}
{const _t=c7Tint;c7Tint=function(){_t();if(room!=="tctl"&&room!=="tgen")return;if(room==="tctl"&&C9.panel)return;const L=c10TowerLights();
  ctx.save();ctx.setTransform(ctx.canvas.width/192,0,0,ctx.canvas.height/108,0,0);ctx.drawImage(c10LM(L,0.42,"4,8,16"),0,0,192,108);
  for(const q of L){const x=q.x-camX;if(x<-q.r||x>192+q.r)continue;glow(x,q.y,q.r*(q.cone?0.3:0.5),q.c,0.1*q.i);}ctx.restore();};}
