
/* ======================= CHAPTER 3 ART: painted like the rest of the game ======================= */
C5.tiles={};
/* the storm sets the mood everywhere: a flash every few seconds, with thunder after it */
function c5FlashAmt(){const p=Math.floor(tick/460),o=20+((r(p,1931)*300)|0),k=tick%460-o;let f=0;
  if(k>=0&&k<30)f=k<7?1:k<11?0.25:k<16?0.9:Math.max(0,1-(k-16)/14);
  return Math.max(f,C5.fl>0?C5.fl/28:0);}
function c5FlashK(){const p=Math.floor(tick/460),o=20+((r(p,1931)*300)|0);return tick%460-o;}
function c5Tile(id,i,seed){const k=id+i;return C5.tiles[k]||(C5.tiles[k]=Ae((t)=>{id==="deck"?c5PaintDeck(t,i,seed):c5PaintMotor(t,i,seed);}));}
function c5PaintDeck(t,i,seed){const R=(k,a)=>r(k+i*37,a+seed);
  t.grad(0,124,["#0a1018","#16222e","#2a3c4c","#46606e"]);
  for(let y=0;y<122;y++)for(let x=0;x<384;x++){const n=It((x+i*220)/52,y/16,seed)*0.62+It((x+i*220)/20,y/8,seed+3)*0.38;
    if(n>0.52){t.px(x,y,[6+y*0.18,12+y*0.2,20+y*0.22],Math.min(0.7,(n-0.52)*2.4)*(Et(x,y)<0.55?1:0.7));}
    else if(n<0.3&&y>34){t.px(x,y,[84,102,116],Math.min(0.32,(0.3-n)*1.1)*(Et(x,y)<0.5?1:0.5));}}
  t.rect(0,121,384,3,"#52707e",0.55);t.rect(0,124,384,1,"#7a98a6",0.4);/* a thin pale line where the storm meets the sea */
  t.grad(125,178,["#3e5e6c","#2a4452","#182c38","#0c1a24"]);
  for(let k=0;k<150;k++){const y=126+R(k,1)*50,sc=(y-125)/53,L=2+R(k,2)*14*sc+2;t.rect(384*R(k,3),y,L,1,R(k,4)<0.4?"#d4e6ec":"#8aa8b4",0.25+0.5*sc);}
  for(let k=0;k<26;k++){const x=384*R(k,5),y=130+R(k,6)*44,w=16+R(k,7)*40*((y-125)/53);t.rect(x,y,w,1,"#0a1620",0.6);t.rect(x+2,y-1,w*0.6,1,"#6a8896",0.25);}
  for(let x=(i*53)%56;x<384;x+=56){t.rect(x,162,3,24,"#3a2a22");t.rect(x,162,1,24,"#6a4a3a");t.rect(x-1,161,5,2,"#52483e");}/* back rail posts */
  t.rect(0,166,384,2,"#5a4a3e");t.rect(0,174,384,2,"#5a4a3e");t.rect(0,166,384,1,"#8a7a68",0.6);
  for(let k=0;k<40;k++)t.rect(384*R(k,8),160+R(k,9)*24,1,2+R(k,10)*3,"#8a4a22",0.45);
  t.grad(184,216,["#323a42","#242c34","#161c22"]);
  for(let x=(i*47)%96;x<384;x+=96)t.rect(x,185,1,31,"#0c1014");for(let y=198;y<216;y+=14)t.rect(0,y,384,1,"#0c1014",0.8);
  for(let x=(i*47)%96;x<384;x+=96)for(let y=188;y<216;y+=14){t.rect(x+4,y,2,2,"#52606c");t.rect(x+90,y,2,2,"#52606c");}/* rivets */
  for(let k=0;k<30;k++){const cx=384*R(k,11),cy=190+24*R(k,12),w=12+R(k,13)*28;for(let y=-1;y<=1;y++)t.rect(cx-w/2+Math.abs(y)*2,cy+y,w-Math.abs(y)*4,1,"#6a8aa0",0.25);t.rect(cx-w/3,cy-1,w/3,1,"#cfe4f0",0.4);}/* puddles catching the light */
  for(let k=0;k<50;k++)t.rect(384*R(k,14),186+30*R(k,15),2+(R(k,16)*10|0),1,"#8a4a22",0.35);
  t.rect(0,184,384,1,"#52606c");t.rect(0,185,384,1,"#0c1014");}
function c5PaintMotor(t,i,seed){const R=(k,a)=>r(k+i*41,a+seed);
  t.grad(0,184,["#1c1610","#2a2018","#32261c","#241c14"]);
  for(let x=(i*37)%80;x<384;x+=80){t.rect(x,0,6,184,"#120e0a");t.rect(x,0,1,184,"#4a3a2a");t.rect(x+5,0,1,184,"#0a0806");for(let y=8;y<184;y+=22){t.rect(x+1,y,2,2,"#6a5a48");t.rect(x+3,y+8,2,2,"#6a5a48");}}
  for(let y=0;y<184;y+=8)for(let x=0;x<384;x++)Et(x,y)<0.12&&t.px(x,y,[70,52,36],0.7);
  /* pipes along the back wall */
  [[18,5],[34,4],[132,6]].forEach(([y,h],q)=>{t.rect(0,y,384,h,"#1a1410");t.rect(0,y,384,1,"#7a6448");t.rect(0,y+h-1,384,1,"#0a0806");t.rect(0,y+1,384,1,"#5a4a38",0.6);for(let x=(q*41)%64;x<384;x+=64){t.rect(x,y-1,4,h+2,"#2a2018");t.rect(x,y-1,1,h+2,"#8a7458");}});
  for(let k=0;k<120;k++)t.rect(384*R(k,1),6+R(k,2)*170,1,2+R(k,3)*8,"#8a4a22",0.4);
  /* wall gauges and a tool board */
  for(let g=0;g<2;g++){const gx=60+g*190+R(g,4)*30;for(let a=0;a<14;a++)for(let b=0;b<14;b++){const d=Math.hypot(a-7,b-7);d<7&&t.px(gx+a,50+b,d>5.5?[90,80,60]:[20,26,22]);}t.rect(gx+7,52,1,5,"#ff6a3a");t.rect(gx+7,57,1,1,"#c8c8c0");}
  t.rect(250,44,34,22,"#2a1e14");t.rect(250,44,34,2,"#6a5238");for(let q=0;q<5;q++){t.rect(254+q*6,50,2,12,q%2?"#8a8c90":"#7a5a3a");}
  /* floor: steel grating over a glowing bilge */
  t.grad(184,216,["#2a2420","#1c1814","#0e0c0a"]);
  for(let x=0;x<384;x+=4)t.rect(x,186,2,30,"#0a0806");for(let y=188;y<216;y+=4)t.rect(0,y,384,1,"#0a0806",0.9);
  for(let x=(i*29)%48;x<384;x+=48)t.rect(x,185,2,31,"#4a3c2e");
  for(let k=0;k<40;k++)t.rect(384*R(k,5),186+28*R(k,6),3,1,"#c8662a",0.35);
  t.rect(0,184,384,1,"#7a6448");t.rect(0,185,384,1,"#0a0806");}
function c5Backdrop(id){if(id==="helm")return c3Blank();
  const d=C2[id],cv=document.createElement("canvas");cv.width=2*d.W;cv.height=216;const g=cv.getContext("2d");g.imageSmoothingEnabled=!1;
  const tiles=d.seeds.map((seed,i)=>c5Tile(id,i,seed)),OV=48,mask=document.createElement("canvas");mask.width=384;mask.height=216;
  for(let i=0;i*(384-OV)<2*d.W;i++){const m=mask.getContext("2d");m.globalCompositeOperation="source-over";m.clearRect(0,0,384,216);m.drawImage(tiles[i%tiles.length],0,0);
    if(i){const gr=m.createLinearGradient(0,0,384,0);gr.addColorStop(0,"rgba(0,0,0,0)");gr.addColorStop(OV/384,"rgba(0,0,0,1)");gr.addColorStop(1,"rgba(0,0,0,1)");m.globalCompositeOperation="destination-in";m.fillStyle=gr;m.fillRect(0,0,384,216);}
    g.drawImage(mask,i*(384-OV),0);}
  return cv;}
/* ---------------- the dynamic parts of the deck ---------------- */
function c5BoltPath(bx,y1){const pts=[[bx,0]];let x=bx,y=0;while(y<y1){y+=6+((r(y,1941)*8)|0);x+=(r(y,1942)-0.5)*14;pts.push([x,y]);}return pts;}
function c5DeckBack(){const f=c5FlashAmt(),k=c5FlashK();
  /* lightning in the clouds and a forked bolt on the horizon */
  if(f>0.05){ctx.fillStyle="rgba(200,220,255,"+0.16*f+")";ctx.fillRect(camX,0,192,62);glow(camX+60+((tick>>9)*37)%90,26,70,"190,210,255",0.5*f);}
  if(k>=0&&k<14){const p=Math.floor(tick/460),bx=camX+30+((r(p,1943)*130)|0),pts=c5BoltPath(bx,60);ctx.strokeStyle="rgba(235,244,255,"+(k<7?1:0.6)+")";ctx.lineWidth=1.2;ctx.beginPath();pts.forEach((q,n)=>n?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.stroke();
    ctx.lineWidth=3;ctx.strokeStyle="rgba(170,200,255,.25)";ctx.stroke();}
  /* the sea heaving: moving white caps in front of the painted waves */
  for(let n=0;n<46;n++){const sp=0.15+(n%5)*0.06,y=63+((n*13)%26)+Math.sin(tick/30+n)*0.6,x=camX+((n*43+tick*sp*(n%2?1:-1))%232+232)%232-20;ctx.globalAlpha=0.35+0.4*((y-63)/26);fill(n%3?"#9ab4c0":"#e4f0f4",x,y,2+(n%4),0.6);ctx.globalAlpha=1;}}
function c5DeckHouse(){const S=c5S(),x=C5_DOOR-45,g=C2_FLOOR,open=S.door||C5.door;
  fill("rgba(0,0,0,.4)",x-2,g,100,2);
  fill("#0e1216",x,g-80,92,80);fill("#3a4852",x+1,g-79,90,78);fill("#52626e",x+1,g-79,90,3);fill("#2a343c",x+1,g-5,90,4);
  for(let y=g-74;y<g-6;y+=12)fill("rgba(0,0,0,.22)",x+1,y,90,1);for(let q=0;q<5;q++)for(let k=0;k<7;k++)fill("rgba(120,60,24,.4)",x+4+r(k,q+1951)*80,g-76+r(k,q+1952)*66,1+r(k,1953)*3,2+r(k,1954)*10);
  /* lit windows */
  [[x+8,g-62],[x+30,g-62],[x+52,g-62],[x+74,g-62]].forEach(([wx,wy],q)=>{fill("#0a0e12",wx-1,wy-1,16,12);fill(S.door?"#ffd890":q%2?"#4a3a22":"#8a6a3a",wx,wy,14,10);fill("rgba(255,255,255,.35)",wx,wy,14,1.4);fill("#0a0e12",wx+6.5,wy,1,10);glow(wx+7,wy+5,16,"255,200,110",S.door?0.5:0.22+0.1*Math.sin(tick/20+q));});
  /* the steel door with its wheel handle */
  const dx=x+34,dy=g-40;fill("#0a0c10",dx-2,dy-2,26,42);fill(open?"#241c14":"#5a666e",dx,dy,22,40);
  if(!open){fill("#7a8690",dx,dy,22,2);fill("#3a444c",dx,dy+38,22,2);for(let q=0;q<4;q++){fill("#9aa4ae",dx+2,dy+4+q*9,1.5,1.5);fill("#9aa4ae",dx+18,dy+4+q*9,1.5,1.5);}
    ctx.strokeStyle="#aab4be";ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(dx+11,dy+16,6,0,7);ctx.stroke();for(let a=0;a<4;a++){ctx.beginPath();ctx.moveTo(dx+11,dy+16);ctx.lineTo(dx+11+Math.cos(a*1.57)*6,dy+16+Math.sin(a*1.57)*6);ctx.stroke();}fill("#c8a030",dx+14,dy+28,6,5);fill("#1a1208",dx+16.4,dy+30,1.2,2.4);
    for(let q=0;q<8;q++)fill("rgba(140,70,26,.5)",dx+2+r(q,1955)*18,dy+2+r(q,1956)*34,2,4+r(q,1957)*8);}
  else{ctx.fillStyle="#ffd890";ctx.beginPath();ctx.moveTo(dx+1,dy+1);ctx.lineTo(dx+19,dy+6);ctx.lineTo(dx+19,dy+38);ctx.lineTo(dx+1,dy+39);ctx.fill();glow(dx+8,dy+22,30,"255,210,120",0.5);fill("#5a666e",dx+19,dy,3,40);}
  /* a flickering lamp over the door, rain streaming through its beam */
  const fl=(tick%97<4||tick%53<2)?0.4:1;fill("#1a1a1c",dx+7,dy-12,8,5);fill("#ffe9a0",dx+8,dy-8,6,3);glow(dx+11,dy-6,34,"255,226,150",0.5*fl);
  for(let q=0;q<10;q++){const yy=dy-4+((tick*3+q*11)%34);ctx.globalAlpha=0.45*fl;fill("#e8f0ff",dx+3+q*1.8+(yy-dy)*0.1,yy,0.5,3);ctx.globalAlpha=1;}
  /* radar scanner turning on the roof, mast and lights */
  fill("#2a343c",x+10,g-84,3,5);fill("#52626e",x+4,g-86,24,2);const sw=Math.cos(tick/26)*10;fill("#1a2026",x+16-sw/2,g-90,sw+6,3);fill("#8a98a4",x+16-sw/2,g-90,sw+6,1);
  fill("#4a5660",x+70,g-96,2,16);(tick>>5)%2?(fill("#ff3a2a",x+69,g-98,4,3),glow(x+71,g-97,10,"255,60,40",0.5)):fill("#6a1a14",x+69,g-98,4,3);
  /* a lifebuoy on the wall, a pipe vent and a ladder */
  ctx.strokeStyle="#c8342a";ctx.lineWidth=2.4;ctx.beginPath();ctx.arc(x+72,g-44,5,0,7);ctx.stroke();ctx.strokeStyle="#e8e8e0";ctx.lineWidth=1;ctx.beginPath();ctx.arc(x+72,g-44,5,0,1.5);ctx.stroke();ctx.beginPath();ctx.arc(x+72,g-44,5,3.14,4.7);ctx.stroke();
  fill("#2a2e34",x-6,g-18,6,18);fill("#4a5660",x-6,g-18,6,2);}
function c5DeckProps(){const S=c5S(),g=C2_FLOOR;
  /* mooring bollards, a rope coil, a winch and a chain, lashed and rusted */
  [[26,"bol"],[70,"coil"],[148,"bol"],[232,"vent"],[312,"bol"],[392,"coil"],[462,"vent"]].forEach(([x,k])=>{
    if(k==="bol"){fill("rgba(0,0,0,.35)",x-5,g,11,1);fill("#1a1c1e",x-3,g-9,7,9);fill("#4a5258",x-2.5,g-9,6,8);fill("#7a828a",x-2.5,g-9,6,1.4);fill("#1a1c1e",x-5,g-10,11,2);fill("#6a727a",x-5,g-10,11,1);}
    else if(k==="coil"){ctx.strokeStyle="#6a5a3a";ctx.lineWidth=1.4;for(let q=0;q<4;q++){ctx.beginPath();ctx.ellipse(x,g-2-q*1.4,7-q*0.6,2.4,0,0,7);ctx.stroke();}fill("rgba(0,0,0,.3)",x-8,g,16,1);}
    else{fill("#1a1c1e",x-3,g-16,6,16);fill("#52606a",x-2.5,g-16,5,15);ctx.fillStyle="#1a1c1e";ctx.beginPath();ctx.ellipse(x,g-17,6,2.4,0,0,7);ctx.fill();ctx.fillStyle="#6a7a84";ctx.beginPath();ctx.ellipse(x,g-17.5,5,1.8,0,0,7);ctx.fill();}});}
function c5DeckDraw(){const S=c5S(),g=C2_FLOOR;
  c5DeckProps();c5DeckHouse();
  /* the five cargo containers, wet and rusted, some stacked */
  C5_BX.forEach((x,i)=>{if(i===1||i===3||i===4)c4BoxArt(x,g-18,(i*3+2)%7,"x",i+20);c4BoxArt(x,g,[0,2,4,1,5][i],S.opened[i]?"open":"x",i);
    ctx.fillStyle="rgba(180,210,240,.2)";ctx.fillRect(x-17,g-18,34,1);
    if(!S.opened[i]&&S.tried){const a=0.5+0.5*Math.sin(tick/14+i);glow(x+16,g-8,9,"255,230,160",0.1+0.12*a);}});}
/* ---------------- the first-person control room ---------------- */
function c5Ring(cx,cy,r0,col,lw){ctx.strokeStyle=col;ctx.lineWidth=lw;ctx.beginPath();ctx.arc(cx,cy,r0,0,7);ctx.stroke();}
function c5Disc(cx,cy,r0,col){ctx.fillStyle=col;ctx.beginPath();ctx.arc(cx,cy,r0,0,7);ctx.fill();}
function c5HelmDraw(){const S=c5S(),sm=S.sim,dark=sm.black&&!S.gen.run,t=tick,f=c5FlashAmt(),L=camX;
  const sway=Math.sin(t/38)*0.8,hz=34+sway,off=(sm.h*70)%384;
  /* the view out of the windows: storm sky, sea, cells and the blue beacon at the right bearing */
  const sg=ctx.createLinearGradient(0,0,0,hz);sg.addColorStop(0,"#05080e");sg.addColorStop(0.6,"#101a24");sg.addColorStop(1,"#2a3c48");ctx.fillStyle=sg;ctx.fillRect(0,0,192,hz+1);
  for(let k=0;k<9;k++){const cx=(((k*61-off*0.7)%300)+300)%300-50,cy=6+(k*7)%22;ctx.fillStyle=k%2?"rgba(6,10,16,.8)":"rgba(18,28,38,.7)";ctx.beginPath();ctx.ellipse(cx,cy,26+(k%3)*8,5+(k%2)*2,0,0,7);ctx.fill();if(f>0.2){ctx.fillStyle="rgba(190,210,255,"+0.3*f+")";ctx.beginPath();ctx.ellipse(cx,cy+2,22,3,0,0,7);ctx.fill();}}
  const sea=ctx.createLinearGradient(0,hz,0,54);sea.addColorStop(0,"#26404c");sea.addColorStop(0.4,"#102430");sea.addColorStop(1,"#040c14");ctx.fillStyle=sea;ctx.fillRect(0,hz,192,22);
  for(let n=0;n<50;n++){const dz=((n*0.071+t*0.004*(sm.black?0.2:1))%1),y=hz+1+dz*dz*18,w=2+dz*14,x=(((n*37.3-off*(0.4+dz))%210)+210)%210-9;ctx.globalAlpha=0.25+dz*0.55;fill(n%3?"#7a98a4":"#dceaf0",x,y,w,0.5+dz);ctx.globalAlpha=1;}
  ctx.fillStyle="rgba(190,220,255,.25)";ctx.fillRect(0,hz-0.5,192,1);
  /* bearings: a point at angle b from the heading appears at x=96+b*60 */
  const bx=(wx,wy)=>{const dx=wx-sm.x,dy=wy-sm.y,b=Math.atan2(dx,dy)-sm.h,bb=Math.atan2(Math.sin(b),Math.cos(b));return[96+bb*60,Math.hypot(dx,dy),bb];};
  if(!dark){for(const c of C5_CELLS){const q=bx(c[0],c[1]);if(Math.abs(q[2])>1.4||q[1]>C5_RANGE*1.7)continue;const sz=Math.max(5,c[2]*34/Math.max(10,q[1]));
      ctx.fillStyle="rgba(2,4,8,.85)";ctx.beginPath();ctx.ellipse(q[0],hz-sz*0.4,sz*1.6,sz*0.7,0,0,7);ctx.fill();ctx.fillStyle="rgba(40,56,72,.8)";ctx.beginPath();ctx.ellipse(q[0],hz-sz*0.7,sz*1.2,sz*0.4,0,0,7);ctx.fill();
      if((t+(c[0]|0)*13)%90<6)glow(q[0],hz-sz*0.5,sz*1.5,"255,90,70",0.5);for(let a=0;a<3;a++)fill("rgba(180,200,230,.5)",q[0]-sz*1.4+a*sz*1.4,hz-sz*0.3,0.5,sz);}
    const W=C5_WP[sm.wp];if(W){const q=bx(W[0],W[1]);if(Math.abs(q[2])<1.4){glow(q[0],hz-0.5,8+(Math.sin(t/8)+1)*3,"90,160,255",0.8);fill("#8abaff",q[0]-0.5,hz-2.4,1.2,2.4);}}}
  if(C5.arr>0){const a=C5.arr,x=96,hh=8+a*36;ctx.globalAlpha=a;fill("#0a1218",x-1,hz-hh,2,hh);for(let y=hz-hh;y<hz;y+=4)fill("#0a1218",x-2-(y-hz+hh)*0.04,y,5+(y-hz+hh)*0.08,1);fill("#ff4a3a",x-1,hz-hh-3,2,2);glow(x,hz-hh-2,14,"255,70,50",0.7);
    for(let q=0;q<22;q++)fill(q%3?"#ffd890":"#fff0c0",30+q*6.5,hz-1.5-(q%4),1,1);ctx.globalAlpha=1;}
  if(f>0.05){ctx.fillStyle="rgba(210,225,255,"+0.35*f+")";ctx.fillRect(0,0,192,54);}
  const k=c5FlashK();if(k>=0&&k<12&&!dark){const p=Math.floor(t/460),pts=c5BoltPath(20+((r(p,1943)*150)|0),hz);ctx.strokeStyle="rgba(240,246,255,.95)";ctx.lineWidth=1;ctx.beginPath();pts.forEach((q,n)=>n?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.stroke();}
  /* rain on the glass, and two wipers sweeping */
  for(let n=0;n<36;n++){const x=((n*47+3)%190),y=((n*23+t*(0.2+(n%4)*0.1))%52);ctx.globalAlpha=0.55;fill("#cfe4f4",x,y,1,1);fill("#9ab8cc",x,y+1,0.5,2+(n%3));ctx.globalAlpha=1;}
  for(let n=0;n<40;n++){const x=((n*31+t*2.6)%210)-10,y=((n*19+t*7)%54);ctx.globalAlpha=0.4;fill("#c8dcf0",x,y,0.5,4);ctx.globalAlpha=1;}
  [[50,56],[142,56]].forEach(([wx,wy],q)=>{const a=-1.2+(Math.sin(t/(40)+q)*0.5+0.5)*0.9*(1.5-q*0.5);ctx.strokeStyle="#0a0c10";ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(wx,wy);ctx.lineTo(wx+Math.cos(a-0.2)*44,wy+Math.sin(a-0.2)*44);ctx.stroke();});
  /* the window frame */
  fill("#10161c",0,0,192,5);fill("#3a4852",0,4,192,1);fill("#10161c",0,0,5,54);fill("#10161c",187,0,5,54);fill("#10161c",93,0,6,54);fill("#2a343c",94,0,1,54);fill("#2a343c",98,0,1,54);
  for(let x=10;x<186;x+=28){fill("#5a6a76",x,1.4,2,2);}fill("#1a2026",0,50,192,4);fill("#52626e",0,53,192,1);
  /* the console */
  const cg=ctx.createLinearGradient(0,54,0,108);cg.addColorStop(0,"#2c3a42");cg.addColorStop(1,"#10181e");ctx.fillStyle=cg;ctx.fillRect(0,54,192,54);fill("#68808c",0,54,192,1);fill("#0a1014",0,55,192,1);
  for(let x=4;x<190;x+=18)fill("#52626e",x,57,2,2);for(let y=66;y<108;y+=14){fill("rgba(0,0,0,.25)",0,y,192,1);}
  /* the radar: a round screen, rings, a sweeping line, a blue circle and red storm cells */
  const rx=42,ry=82,RR=21;c5Disc(rx,ry,RR+4,"#0a1014");c5Ring(rx,ry,RR+3,"#6a7a84",1.6);c5Ring(rx,ry,RR+4.5,"#1a2026",1);c5Disc(rx,ry,RR,dark?"#040806":"#03140e");
  if(!dark){ctx.save();ctx.beginPath();ctx.arc(rx,ry,RR,0,7);ctx.clip();
    [RR/3,RR*2/3,RR-0.5].forEach((q)=>c5Ring(rx,ry,q,"#0e4a30",0.6));ctx.strokeStyle="#0e4a30";ctx.lineWidth=0.5;ctx.beginPath();ctx.moveTo(rx-RR,ry);ctx.lineTo(rx+RR,ry);ctx.moveTo(rx,ry-RR);ctx.lineTo(rx,ry+RR);ctx.stroke();
    const sc=RR/C5_RANGE,aw=(t/45)%6.283;for(let q=0;q<16;q++){ctx.strokeStyle="rgba(70,255,150,"+0.4*(1-q/16)+")";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(rx,ry);ctx.lineTo(rx+Math.sin(aw-q*0.07)*RR,ry-Math.cos(aw-q*0.07)*RR);ctx.stroke();}
    for(const c of C5_CELLS){const dx=(c[0]-sm.x)*sc,dy=-(c[1]-sm.y)*sc;if(Math.hypot(dx,dy)-c[2]*sc>RR)continue;const rr=c[2]*sc,pul=0.5+0.5*Math.sin(t/7+c[0]);
      ctx.fillStyle="rgba(255,60,40,"+(0.35+0.2*pul)+")";ctx.beginPath();ctx.arc(rx+dx,ry+dy,rr,0,7);ctx.fill();c5Ring(rx+dx,ry+dy,rr,"rgba(255,110,90,.95)",0.8);if((t+(c[1]|0))%50<4)fill("#ffe0a0",rx+dx-1,ry+dy-1,2,2);}
    const W=C5_WP[sm.wp];if(W){const dx=(W[0]-sm.x),dy=-(W[1]-sm.y),d=Math.hypot(dx,dy),pul=(Math.sin(t/8)+1)/2;
      if(d<=C5_RANGE){const px=rx+dx*sc,py=ry+dy*sc;ctx.fillStyle="rgba(60,140,255,.9)";ctx.beginPath();ctx.arc(px,py,3.2,0,7);ctx.fill();c5Ring(px,py,4+pul*2,"rgba(130,190,255,.9)",0.8);c5Ring(px,py,6*sc*C5_RANGE/RR*0.5,"rgba(90,160,255,.4)",0.5);}
      else{const a=Math.atan2(dx,-dy),px=rx+Math.sin(a)*(RR-3),py=ry-Math.cos(a)*(RR-3);ctx.fillStyle="#6ab0ff";ctx.beginPath();ctx.moveTo(px+Math.sin(a)*3,py-Math.cos(a)*3);ctx.lineTo(px+Math.cos(a)*2.4,py+Math.sin(a)*2.4);ctx.lineTo(px-Math.cos(a)*2.4,py-Math.sin(a)*2.4);ctx.fill();}}
    ctx.strokeStyle="rgba(210,255,230,.5)";ctx.lineWidth=0.6;ctx.beginPath();ctx.moveTo(rx,ry);ctx.lineTo(rx+Math.sin(sm.h)*10,ry-Math.cos(sm.h)*10);ctx.stroke();
    ctx.fillStyle="#f0fff4";ctx.beginPath();ctx.moveTo(rx+Math.sin(sm.h)*3.4,ry-Math.cos(sm.h)*3.4);ctx.lineTo(rx+Math.sin(sm.h+2.5)*2.4,ry-Math.cos(sm.h+2.5)*2.4);ctx.lineTo(rx+Math.sin(sm.h-2.5)*2.4,ry-Math.cos(sm.h-2.5)*2.4);ctx.fill();ctx.restore();
    text("N",rx-1,ry-RR-4,"#8aff9a",'3px "Press Start 2P",monospace');}
  else{text("NO",rx-4,ry-4,"#3a6a4a",'3px "Press Start 2P",monospace');text("POWER",rx-8,ry+1,"#3a6a4a",'3px "Press Start 2P",monospace');}
  fill("rgba(255,255,255,.12)",rx-RR+3,ry-RR+4,6,1.4);
  /* a small brass compass above the wheel */
  const cx2=96,cy2=64;c5Disc(cx2,cy2,8,"#0a1014");c5Ring(cx2,cy2,7,"#b8863a",1.6);c5Disc(cx2,cy2,5.6,"#1a2a26");ctx.save();ctx.translate(cx2,cy2);ctx.rotate(-sm.h);fill("#ff5a3a",-0.6,-5,1.2,5);fill("#e8e8e0",-0.6,0,1.2,5);ctx.restore();fill("#ffe070",cx2-0.5,cy2-7.4,1,1.4);
  /* the steering wheel */
  const wcx=96,wcy=106,WR=25,wa=sm.wheel*0.9;ctx.save();ctx.translate(wcx,wcy);ctx.rotate(wa);
  for(let a=0;a<8;a++){const an=a*0.7854;ctx.strokeStyle="#241608";ctx.lineWidth=3.6;ctx.beginPath();ctx.moveTo(Math.cos(an)*4,Math.sin(an)*4);ctx.lineTo(Math.cos(an)*(WR+7),Math.sin(an)*(WR+7));ctx.stroke();ctx.strokeStyle="#7a5430";ctx.lineWidth=2.4;ctx.stroke();ctx.strokeStyle="#b8863a";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(Math.cos(an)*4,Math.sin(an)*4);ctx.lineTo(Math.cos(an)*(WR+7),Math.sin(an)*(WR+7));ctx.stroke();
    c5Disc(Math.cos(an)*(WR+7),Math.sin(an)*(WR+7),1.8,"#c8a050");}
  c5Ring(0,0,WR,"#241608",5.6);c5Ring(0,0,WR,"#6a4a2a",4);c5Ring(0,0,WR-1,"#8a6a3a",1.2);c5Ring(0,0,WR+1.5,"#4a3018",0.8);c5Disc(0,0,6,"#241608");c5Disc(0,0,5,"#b8863a");c5Disc(0,0,2.4,"#e8c878");fill("#ffe070",-0.6,-5,1.2,2);ctx.restore();
  /* the right-hand gauges: hull, distance, a speed needle and warning lamps */
  c5Disc(0,0,0,"#000");fill("#0a1014",128,60,60,44);fill("#52626e",128,60,60,1);fill("#52626e",128,103,60,1);fill("#52626e",128,60,1,44);fill("#52626e",187,60,1,44);
  text("HULL",132,63,"#9ab0d8",'3px "Press Start 2P",monospace');for(let q=0;q<5;q++){fill("#0a0e12",147+q*7,62,6,5);fill(q<sm.hull?(sm.hit>0&&(t>>2)%2?"#ffffff":"#3aff7a"):"#3a1a1a",148+q*7,63,4,3);}
  const FW=C5_WP[5],dist=dark&&sm.fin?Math.hypot(FW[0]-sm.x,FW[1]-sm.y):Math.hypot(FW[0]-sm.x,FW[1]-sm.y);text("DIST",132,72,"#9ab0d8",'3px "Press Start 2P",monospace');
  fill("#030a06",147,70,34,8);text(dark?"--.-":(dist/10).toFixed(1)+"KM",149,71.5,dark?"#2a5a3a":"#3aff7a",'4px "Press Start 2P",monospace');
  text("SPD",132,82,"#9ab0d8",'3px "Press Start 2P",monospace');c5Disc(163,88,9,"#04080a");c5Ring(163,88,9,"#6a7a84",1);const spd=dark?0:(sm.jam?0.16:1)*(sm.hit>0?0.55:1);const na=-2.4+spd*2.2+(dark?0:Math.sin(t/7)*0.04);ctx.strokeStyle="#ff6a3a";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(163,88);ctx.lineTo(163+Math.cos(na)*7,88+Math.sin(na)*7);ctx.stroke();
  /* warning lamps: engine jam, power, storm */
  const near=!dark&&C5_CELLS.some((c)=>Math.hypot(c[0]-sm.x,c[1]-sm.y)<c[2]+18);
  [[134,92,"ENG",sm.jam?"#ff3a2a":"#1a3a22",sm.jam&&(t>>3)%2],[134,98,"PWR",dark?"#ff3a2a":"#3aff7a",dark&&(t>>3)%2],[174,98,"STM",near?"#ffb02a":"#2a2a1a",near&&(t>>3)%2]].forEach(([lx,ly,lb,lc,pulse])=>{fill("#04080a",lx-1,ly-1,8,5);fill(lc,lx,ly,6,3);pulse&&glow(lx+3,ly+1.5,9,lc==="#ff3a2a"?"255,60,40":"255,180,40",0.6);text(lb,lx+8,ly,"#6a7a84",'3px "Press Start 2P",monospace');});
  /* throttle levers and a brass lamp on the left corner of the table */
  [[10,92],[16,92]].forEach(([lx,ly],q)=>{fill("#0a0e12",lx-1,ly-2,4,14);fill("#2a343c",lx,ly-1,2,12);const ph=dark?10:q?7:3;fill("#b8863a",lx-1,ly+ph-2,4,3);fill("#e8c878",lx-1,ly+ph-2,4,1);});
  fill("#3a2a18",172,56,12,2);fill("#6a5030",174,50,8,6);glow(178,52,20,"255,200,110",dark?0.05:0.3);
  /* alarm and storm colouring */
  if(sm.jam&&!dark){const a=0.1+0.1*Math.sin(t/6);ctx.fillStyle="rgba(255,30,20,"+a+")";ctx.fillRect(0,54,192,54);}
  if(dark){ctx.fillStyle="rgba(0,0,6,.78)";ctx.fillRect(0,0,192,108);const a=0.12+0.1*Math.sin(t/14);ctx.fillStyle="rgba(255,40,30,"+a+")";ctx.fillRect(0,54,192,54);glow(96,56,70,"255,40,30",0.4*(0.5+0.5*Math.sin(t/14)));}
  if(sm.hit>110){ctx.fillStyle="rgba(255,255,255,"+(sm.hit-110)/60+")";ctx.fillRect(0,0,192,108);}}
/* ---------------- the motor room ---------------- */
function c5MotorBack(){const S=c5S(),sm=S.sim,c=S.cl,black=sm.black&&!S.gen.run,g=C2_FLOOR,run=!sm.jam&&!black||c.done,jam=sm.jam&&!c.off;
  const vib=run?Math.sin(tick*1.3)*0.25:jam?Math.sin(tick*2.2)*0.6:0;
  /* hanging lamps (dark when the power is out) */
  [60,200,340].forEach((lx,q)=>{if(lx<camX-40||lx>camX+232)return;const on=!black,fl=on?(tick%113<3&&q===1?0.5:1):0;fill("#0a0806",lx-0.5,0,1,12);fill("#2a2018",lx-5,12,10,4);fill(on?"#ffd890":"#3a2a1c",lx-4,15,8,2.4);on&&glow(lx,20,50,"255,190,110",0.4*fl);});
  /* the engine: heads, exhaust, a flywheel and the propeller shaft leaving through the bulkhead */
  ctx.save();ctx.translate(0,vib);const ex=80,ew=170;
  fill("#0a0806",ex-2,g-62,ew+4,62);fill("#4a3a2c",ex,g-60,ew,58);fill("#6a5238",ex,g-60,ew,4);fill("#2a1e14",ex,g-8,ew,6);
  for(let q=0;q<6;q++){const hx=ex+10+q*27;fill("#1a140e",hx,g-58,18,22);fill("#8a6a44",hx+1,g-57,16,20);fill("#b88a58",hx+1,g-57,16,2);for(let b=0;b<3;b++)fill("#2a1e14",hx+4+b*4,g-52,1.6,14);fill("#3a2a1c",hx+6,g-62,6,5);}
  for(let q=0;q<26;q++)fill(r(q,1961)<0.5?"#a8582a":"#3a1c0c",ex+2+r(q,1962)*ew,g-56+r(q,1963)*48,1+r(q,1964)*4,1);
  fill("#1a140e",ex+ew,g-44,26,36);fill("#52483e",ex+ew+1,g-43,24,34);const fa=(tick*(run?0.3:jam?0.1:0))%6.283;ctx.strokeStyle="#8a7a64";ctx.lineWidth=1;ctx.beginPath();ctx.arc(ex+ew+13,g-26,10,0,7);ctx.stroke();for(let a=0;a<4;a++){ctx.beginPath();ctx.moveTo(ex+ew+13,g-26);ctx.lineTo(ex+ew+13+Math.cos(fa+a*1.57)*10,g-26+Math.sin(fa+a*1.57)*10);ctx.stroke();}
  fill("#1a1a1c",ex+ew+26,g-30,30,8);fill("#6a727a",ex+ew+26,g-30,30,2);fill("#3a424a",ex+ew+26,g-24,30,2);
  /* the shaft cover along the bottom: closed until the panel is opened */
  if(!c.open){fill("#1a140e",ex+4,g-26,ew-8,18);fill("#6a5a46",ex+5,g-25,ew-10,16);fill("#8a7a62",ex+5,g-25,ew-10,2);for(let q=0;q<9;q++){fill("#c8c0a8",ex+10+q*17,g-22,2,2);fill("#c8c0a8",ex+10+q*17,g-12,2,2);}fill("#c8342a",ex+ew/2-12,g-20,24,6);text("ACCESS",ex+ew/2-10,g-19,"#ffe9d8",'3px "Press Start 2P",monospace');}
  else{fill("#0a0604",ex+4,g-26,ew-8,18);fill("#3a1c0c",ex+4,g-26,ew-8,2);fill("#8a8a90",ex+4,g-18,ew-8,5);fill("#c8c8d0",ex+4,g-18,ew-8,1);fill("#4a4a50",ex+4,g-14,ew-8,2);
    for(let q=0;q<6;q++){const tx=[95,120,145,185,210,235][q];if(!c.tg[q])continue;const net=q%2;
      if(net){ctx.strokeStyle="#7a8a78";ctx.lineWidth=0.7;for(let a=0;a<4;a++){ctx.beginPath();ctx.moveTo(tx-9+a*5,g-26);ctx.quadraticCurveTo(tx-8+a*5+Math.sin(tick/20+q)*1,g-16,tx-5+a*5,g-9);ctx.stroke();}for(let a=0;a<4;a++){ctx.beginPath();ctx.moveTo(tx-9,g-24+a*4);ctx.lineTo(tx+9,g-22+a*4);ctx.stroke();}fill("#a8b8a0",tx-8,g-24,2,1);fill("#a8b8a0",tx+4,g-18,2,1);}
      else{for(let a=0;a<9;a++){fill(a%2?"#2a5a2a":"#3a7a34",tx-7+a*1.7+Math.sin(tick/18+a+q)*0.5,g-24+((a*5)%9),2,9-((a*3)%5));}fill("#1a3a18",tx-6,g-16,12,3);fill("#5a9a4a",tx-4,g-23,5,2);}}}
  ctx.restore();
  if(jam||(sm.jam&&c.off&&!c.done)){/* steam and a grinding rattle when jammed and still running */
    if(jam)for(let q=0;q<6;q++){const a=((tick*0.04+q/6)%1);ctx.globalAlpha=0.4*(1-a);fill("#8a8a88",ex+30+q*22+Math.sin(tick/10+q)*2,g-66-a*28,3+a*8,2+a*6);ctx.globalAlpha=1;}}
  /* the stop / start lever and its lamp */
  const lx=345;fill("#0a0806",lx-8,g-44,16,30);fill("#3a3028",lx-7,g-43,14,28);fill("#6a5a46",lx-7,g-43,14,2);const stopped=c.off&&!c.done;fill("#04060a",lx-4,g-40,8,5);fill(stopped?"#ff3a2a":"#3aff7a",lx-3,g-39,6,3);glow(lx,g-38,10,stopped?"255,50,40":"60,255,120",0.4);
  fill("#1a1a1c",lx-1.5,g-34,3,18);const lv=stopped?-8:8;ctx.strokeStyle="#c8342a";ctx.lineWidth=2.2;ctx.beginPath();ctx.moveTo(lx,g-26);ctx.lineTo(lx+lv*0.5,g-38+(stopped?8:0));ctx.stroke();c5Disc(lx+lv*0.5,g-38+(stopped?8:0),2,"#e8e8e0");
  /* the ladder up to the trap door, with a shaft of light from the helm */
  const ldx=372;fill("#0a0806",ldx-9,0,18,g);fill("#2a2018",ldx-8,0,2,g);fill("#2a2018",ldx+6,0,2,g);for(let y=6;y<g;y+=8)fill("#8a8a90",ldx-8,y,16,1.6);fill("#ffe0a0",ldx-6,0,12,2);ctx.fillStyle="rgba(255,226,160,.12)";ctx.beginPath();ctx.moveTo(ldx-7,0);ctx.lineTo(ldx+7,0);ctx.lineTo(ldx+14,g);ctx.lineTo(ldx-14,g);ctx.fill();
  /* the bucket: it fills as you drop tangles in */
  const bx=34;fill("rgba(0,0,0,.35)",bx-9,g,18,1.4);fill("#1a1c1e",bx-8,g-16,16,16);fill("#6a7a84",bx-7,g-16,14,15);fill("#aab8c2",bx-7,g-16,3,15);fill("#2a343c",bx-7,g-4,14,2);fill("#1a1c1e",bx-8,g-17,16,2);ctx.strokeStyle="#8a9aa4";ctx.lineWidth=0.8;ctx.beginPath();ctx.arc(bx,g-17,7,3.14,0);ctx.stroke();
  for(let q=0;q<c.n;q++){fill(q%2?"#2a5a2a":"#8a9a88",bx-6+(q%3)*4,g-19-Math.floor(q/3)*2.4,5,3);fill(q%2?"#4a8a3a":"#c8d4c0",bx-5+(q%3)*4,g-19-Math.floor(q/3)*2.4,3,1);}
  /* the generator set, the spare belt, wire spool and fuse box */
  c5Generator(300,g,black);
  if(!S.mat.belt){ctx.strokeStyle="#1a1a1c";ctx.lineWidth=2.6;ctx.beginPath();ctx.ellipse(262,g-38,6,10,0,0,7);ctx.stroke();ctx.strokeStyle="#3a3a3e";ctx.lineWidth=1;ctx.stroke();fill("#6a5a46",258,g-50,8,2);fill("#3a2e22",261,g-52,2,4);black&&(tick%90<10)&&glow(262,g-38,10,"255,240,190",0.4);}
  if(!S.mat.wire){fill("#2a1e14",48,g-12,22,12);fill("#4a3a28",48,g-12,22,2);fill("#1a1208",52,g-22,14,10);fill("#c87a3a",53,g-21,12,8);for(let q=0;q<4;q++)fill("#e8964a",53,g-20+q*2,12,0.7);fill("#2a1e14",57,g-22,4,10);black&&(tick%90<10)&&glow(58,g-17,10,"255,200,120",0.4);}
  {const fx=326;fill("#0a0806",fx-9,g-38,18,22);fill("#52483e",fx-8,g-37,16,20);fill("#8a7a64",fx-8,g-37,16,2);fill("#1a1208",fx-6,g-31,12,10);if(!S.mat.fuse){fill("#c8d8e0",fx-4,g-28,8,4);fill("#ffd23a",fx-3,g-26.4,6,0.8);black&&(tick%90<10)&&glow(fx,g-26,8,"255,240,190",0.4);}fill("#ffd23a",fx-6,g-35,3,1);}
  /* what you're carrying */
  if(C5.carry&&!C3.cut){const hx=player.x,hy=player.y-40;fill("#2a5a2a",hx-4,hy,8,5);fill("#5a9a4a",hx-3,hy,5,2);fill("#8a9a88",hx-5,hy+2,3,3);}}
function c5Generator(x,g,dead){const S=c5S(),run=S.gen.run,jit=run?Math.sin(tick*1.4)*0.3:0;
  fill("rgba(0,0,0,.4)",x-26,g,52,1.6);ctx.save();ctx.translate(0,jit);
  fill("#0a0c08",x-26,g-34,52,34);fill("#4a5a3a",x-25,g-33,50,32);fill("#6a7a52",x-25,g-33,50,3);fill("#2a3a22",x-25,g-5,50,4);
  fill("#1a1e18",x-24,g-30,20,26);fill("#3a4a32",x-23,g-29,18,24);for(let a=0;a<6;a++)fill("#6a7a58",x-22,g-27+a*4,16,1);/* alternator drum */
  c5Disc(x+6,g-18,9,"#0a0c08");c5Disc(x+6,g-18,7.4,"#2a3022");const ga=(tick*(run?0.25:0))%6.283;for(let a=0;a<4;a++){ctx.strokeStyle="#8a9a78";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x+6,g-18);ctx.lineTo(x+6+Math.cos(ga+a*1.57)*7,g-18+Math.sin(ga+a*1.57)*7);ctx.stroke();}c5Disc(x+6,g-18,1.6,"#c8d0c0");
  /* the belt: whole when running, snapped and dangling when dead */
  if(run){ctx.strokeStyle="#1a1a1c";ctx.lineWidth=2.4;ctx.beginPath();ctx.moveTo(x-14,g-26);ctx.lineTo(x+6,g-26);ctx.moveTo(x-14,g-10);ctx.lineTo(x+6,g-10);ctx.stroke();}
  else{ctx.strokeStyle="#1a1a1c";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-14,g-26);ctx.quadraticCurveTo(x-8,g-14,x-12,g-4);ctx.stroke();}
  fill("#04060a",x+16,g-30,9,14);fill(dead?"#ff3a2a":"#3aff7a",x+18,g-27,5,3);dead&&(tick>>3)%2&&glow(x+20.5,g-25.5,12,"255,50,40",0.6);run&&glow(x+20.5,g-25.5,10,"60,255,120",0.5);
  fill("#c8a030",x+16,g-12,9,3);text("GEN",x+16,g-9.4,"#1a1208",'3px "Press Start 2P",monospace');ctx.restore();
  if(dead)for(let q=0;q<4;q++){const a=((tick*0.03+q/4)%1);ctx.globalAlpha=0.4*(1-a);fill("#6a6a68",x-18+q*3+Math.sin(tick/9+q)*1.5,g-36-a*20,2+a*6,2+a*4);ctx.globalAlpha=1;}
  if(run&&tick%7<2)fill("#ffe070",x+24+Math.random()*4,g-30+Math.random()*6,1,1);}
