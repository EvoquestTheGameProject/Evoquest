
/* ======================= PART 4 SCENERY (post-apocalyptic pass) ======================= */
/* sky: hazy, dusty and hot; a pale sun behind smog, smoke plumes on the horizon */
/* far: hazy mountains, a ruined city skyline, and the Ridge Tower on its ridge */
/* mid: an overgrown treeline with dead snags, a collapsed farmhouse, a rusty water tower and sagging power lines */
/* ground: cracked, weedy, littered */
function c4Chunk(kind,i){const k="c4h"+kind+i;if(C3.chunks[k])return C3.chunks[k];const c=c3Cv(384,48),g=c.getContext("2d"),R=(n,s)=>r(n+i*151,s+kind.length*7),F=(c2,x,y,w,h)=>{g.fillStyle=c2;g.fillRect(x|0,y|0,w,h);};
  const litter=(n)=>{for(let q=0;q<n;q++){const x=R(q,61)*370,y=10+R(q,62)*34,t=q%5;
      if(t===0){F("#8a4a2a",x,y,3,2);F("#b86a3a",x,y,3,0.6);}else if(t===1){F("#1a1a1a",x,y,6,3);F("#3a3a3a",x+1,y+1,4,1);}else if(t===2){F("#7a3a2a",x,y,5,3);F("#9a5a4a",x,y,5,1);}
      else if(t===3){F("#c8e0e8",x,y,1,1);}else{F("#6a6a64",x,y,4,2);}}};
  if(kind==="road"){F("#56603a",0,0,384,10);for(let n=0;n<90;n++){F(R(n,1)<0.5?"#6a7a3a":"#8a8a42",R(n,2)*384,10-(2+R(n,3)*6),1,2+R(n,3)*6);}
    F("#3e4044",0,10,384,38);F("#5a5c60",0,10,384,1.5);for(let n=0;n<320;n++)F(R(n,4)<0.5?"#34363a":"#4e5054",R(n,5)*384,12+R(n,6)*36,1,1);
    for(let d=-((i*384)%96);d<384;d+=96){F("rgba(220,210,170,.35)",d,30,46,2);F("rgba(60,60,60,.5)",d+12,30,8,2);}
    g.strokeStyle="#26282c";g.lineWidth=1;for(let n=0;n<6;n++){let x=R(n,7)*384,y=12+R(n,8)*34;g.beginPath();g.moveTo(x,y);for(let s=0;s<8;s++){x+=4+R(s+n*7,9)*6;y+=(R(s+n*7,10)-0.5)*5;g.lineTo(x,y);if(s%3===1)F("#5a7a32",x,y-2,1,3);}g.stroke();}
    for(let n=0;n<2;n++){const x=R(n,11)*340,y=20+R(n,12)*18;F("#2a2a2c",x,y,18,5);F("#1a1a1c",x+2,y+1,14,3);}litter(10);}
  else if(kind==="bed"){F("#6a645a",0,0,384,48);for(let n=0;n<500;n++)F(["#7a7468","#5a544a","#8a8476","#4a463e","#6a5a44"][n%5],R(n,11)*384,R(n,12)*48,2+(n%2),2);
    F("#8a8272",0,0,384,1.5);for(let n=0;n<5;n++){g.fillStyle="rgba(70,100,110,.55)";g.beginPath();g.ellipse(R(n,13)*384,10+R(n,14)*30,16+R(n,15)*20,2.2,0,0,7);g.fill();g.fillStyle="rgba(200,220,220,.25)";g.fillRect(R(n,13)*384-6,9+R(n,14)*30,8,0.6);}
    for(let n=0;n<8;n++){const x=R(n,16)*370,y=6+R(n,17)*36;F("#5a5c5e",x,y,7,4);F("#7a7c7e",x,y,6,1);F("#8a5a3a",x+2,y-1,0.6,3);}litter(8);}
  else{F("#4a3e28",0,0,384,48);F("#6a7a3a",0,0,384,5);for(let n=0;n<130;n++)F(R(n,21)<0.4?"#5a6a2e":R(n,21)<0.7?"#8a8a3e":"#a89a5a",R(n,22)*384,5-(2+R(n,23)*7),1,2+R(n,23)*7);
    g.strokeStyle="#3a2e1c";g.lineWidth=0.6;for(let n=0;n<10;n++){let x=R(n,24)*384,y=10+R(n,25)*34;g.beginPath();g.moveTo(x,y);for(let s=0;s<4;s++){x+=3+R(s+n,26)*4;y+=(R(s+n,27)-0.5)*4;g.lineTo(x,y);}g.stroke();}/* dry cracked mud */
    for(let n=0;n<240;n++)F(["#5a4a30","#3a2e1c","#6a5a3a","#4a4a38"][n%4],R(n,28)*384,8+R(n,29)*40,2,1);
    for(let n=0;n<10;n++){const x=R(n,30)*370,y=12+R(n,31)*30;F("#6e6a62",x,y,5,3);F("#8a867e",x,y,4,1);}
    for(let n=0;n<10;n++)F(["#d8c860","#e0e0d0","#c8a0b8"][n%3],R(n,32)*384,R(n,33)*4,1,1);litter(6);}
  return(C3.chunks[k]=c);}
function c4Ground(kind){const i0=Math.floor(camX/192),i1=Math.floor((camX+192)/192);for(let i=i0;i<=i1;i++)i>=0&&ctx.drawImage(c4Chunk(kind,i),i*192,C2_FLOOR-4,192,24);}
function c4DamK(){const S4=c4S();if(S4.end)return 1;if(S4.t8on)return 0.5+0.5*(1-S4.t8/C4_T8);if(S4.bridge)return 0.5;if(S4.arr)return 0.5*(1-S4.dam/C4_T3);return 0.1;}
/* the dam, far upriver: drawn in screen space with its own parallax, so it sits IN the distance */
/* a detailed pixel tree in the game's style: textured trunk, layered dithered crown, some dead leaves */
/* weathered shipping containers */
function c4BoxArt(x,y,ci,st,i){const c=C4_COL[ci]?C4_COL[ci][1]:"#8a8a8a",w=34,h=18,x0=x-w/2,y0=y-h,R=(n,s2)=>r(n+i*17,1640+s2);
  ctx.fillStyle="rgba(0,0,0,.4)";ctx.beginPath();ctx.ellipse(x+2,y,w*0.6,2,0,0,7);ctx.fill();
  ctx.save();if(st==="crushed"){ctx.translate(x,y);ctx.rotate(-0.07);ctx.translate(-x,-y);}
  ctx.fillStyle="#141414";ctx.fillRect(x0-0.5,y0-0.5,w+1,h+1);ctx.fillStyle=c;ctx.fillRect(x0,y0,w,h);
  for(let q=0;q<w;q+=2){ctx.fillStyle="rgba(0,0,0,.2)";ctx.fillRect(x0+q,y0+1,1,h-2);ctx.fillStyle="rgba(255,255,255,.07)";ctx.fillRect(x0+q+1,y0+1,0.6,h-2);}
  ctx.fillStyle="rgba(255,255,255,.2)";ctx.fillRect(x0,y0,w,1.2);ctx.fillStyle="rgba(0,0,0,.35)";ctx.fillRect(x0,y-2,w,2);
  [[x0,y0],[x0+w-2,y0],[x0,y-2],[x0+w-2,y-2]].forEach(([a,b])=>fill("#2a2a2a",a,b,2,2));/* corner castings */
  for(let q=0;q<6;q++){const rx=x0+2+R(q,1)*(w-8),ry=y0+2+R(q,2)*(h-6),rw=2+R(q,3)*5;ctx.fillStyle="rgba(120,60,24,.55)";ctx.fillRect(rx,ry,rw,1.5+R(q,4)*2);ctx.fillStyle="rgba(90,40,16,.45)";ctx.fillRect(rx+0.5,ry+1.5,0.8,3+R(q,5)*5);}/* rust + streaks */
  for(let q=0;q<2;q++){ctx.fillStyle="rgba(0,0,0,.22)";ctx.beginPath();ctx.ellipse(x0+6+R(q,6)*(w-12),y0+5+R(q,7)*8,2.5,1.6,0,0,7);ctx.fill();}/* dents */
  ctx.save();ctx.translate(x0+3,y0+10);ctx.scale(0.5,0.5);ctx.fillStyle="rgba(255,255,255,.38)";ctx.font='4px "Press Start 2P",monospace';ctx.textBaseline="top";ctx.fillText("TECHFREIGHT",0,0);ctx.restore();
  text(""+(100+i*37)%900,x0+3,y0+3,"rgba(255,255,255,.7)",'4px "Press Start 2P",monospace');
  fill("#2a2a2a",x0+w-9,y0+1,1,h-2);fill("#5a5a5a",x0+w-6,y0+2,0.8,h-4);fill("#5a5a5a",x0+w-3,y0+2,0.8,h-4);/* door + lock rods */
  for(let q=0;q<7;q++)fill(q%2?"#4a6a2a":"#5a7a30",x0+R(q,8)*w,y-1.5-R(q,9)*2,1,1.5+R(q,9)*2);/* weeds at the base */
  if(st==="open"&&c4S().box&&c4S().box.tear===i){ctx.fillStyle="#0a0806";ctx.beginPath();ctx.moveTo(x0+5,y0+4);ctx.lineTo(x0+10,y0+2.5);ctx.lineTo(x0+17,y0+3);ctx.lineTo(x0+19,y0+9);ctx.lineTo(x0+15,y0+16);ctx.lineTo(x0+7,y0+15);ctx.lineTo(x0+4,y0+10);ctx.fill();
    ctx.strokeStyle="#c8c8c0";ctx.lineWidth=0.6;ctx.stroke();fill("#d8a03a",x0+9,y0+10,3,2);fill("#8ac8e8",x0+13,y0+8,2,2);fill("#e8e0d0",x0+8,y0+7,2,2);
    const a=0.5+0.5*Math.sin(tick/10);glow(x0+12,y0+9,8,"255,230,170",0.15*a);}
  else if(st==="open"){fill("#0a0806",x0+w-8,y0+1,7,h-2);ctx.fillStyle=c;ctx.fillRect(x0+w+1,y0+1,4,h-2);ctx.fillStyle="rgba(0,0,0,.35)";ctx.fillRect(x0+w+1,y0+1,1,h-2);}
  else if(st==="locked"){fill("#7a7a7a",x0+w-7,y0+7,4,4);fill("#b8b8b8",x0+w-7,y0+7,4,1);ctx.strokeStyle="#8a8a8a";ctx.lineWidth=0.8;ctx.beginPath();ctx.arc(x0+w-5,y0+7,1.6,Math.PI,0);ctx.stroke();fill(c,x0+w-6,y0+11,2.4,4);fill("#fff",x0+w-6,y0+11,2.4,0.6);}
  else if(st==="crushed"){ctx.strokeStyle="#111";ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(x0+w-12,y0);ctx.lineTo(x0+w-7,y0+6);ctx.lineTo(x0+w-12,y0+12);ctx.lineTo(x0+w-5,y);ctx.stroke();fill("rgba(0,0,0,.4)",x0+3,y0+4,12,8);fill("rgba(0,0,0,.3)",x0+w-11,y0,9,4);}
  ctx.restore();}
/* the old road bridge: stained concrete, rebar, bent railings, graffiti */
function c4Deck(x0,x1,y){const R=(n,s2)=>r(n+(x0|0),1650+s2);ctx.fillStyle="#4a4c4c";ctx.fillRect(x0,y,x1-x0,6);ctx.fillStyle="#6a6c6a";ctx.fillRect(x0,y,x1-x0,1.4);ctx.fillStyle="#2a2c2c";ctx.fillRect(x0,y+5,x1-x0,1.5);
  for(let x=x0;x<x1;x+=3){R(x,1)<0.25&&fill("rgba(40,36,30,.5)",x,y+1.5,2,4);R(x,2)<0.08&&fill("rgba(120,60,24,.6)",x,y+5.5,1,3+R(x,3)*4);}
  for(let x=Math.ceil(x0/16)*16;x<x1;x+=16){const bent=R(x,4)<0.2,gone=R(x,5)<0.12;if(gone)continue;bent?(ctx.save(),ctx.translate(x,y),ctx.rotate(-0.5),fill("#7a7066",0,-7,1.5,7),ctx.restore()):fill("#7a7066",x,y-7,1.5,7);}
  for(let x=x0;x<x1;x+=4)R(x,6)>0.1&&fill("#8a8478",x,y-8,4,1.2);fill("rgba(200,180,70,.5)",x0,y+2.5,x1-x0,0.6);
  for(let x=Math.ceil(x0/20)*20;x<x1;x+=20){fill("#2e3030",x,y+6,2,3);R(x,7)<0.3&&(fill("#3e5a2a",x+3,y+6,1,4+R(x,8)*6));}/* girders + dangling weeds */}
function c4BridgeDraw(){const S4=c4S(),b=C4.bfall;
  c4Deck(600,1000,C4_DECK);
  /* a burnt-out car still parked on the bridge (the game's own car model, lifted onto the deck) */
  if(!C4.car){C4.car=c4BigCar(860,"sedan",33);}
  if(C4.car.x>camX-60&&C4.car.x<camX+250){ctx.save();ctx.translate(0,C4_DECK-C2_FLOOR);c2CarBody(C4.car);c2Wreck(C4.car);ctx.restore();}
  if(!S4.bcol&&b<=0){c4Deck(300,600,C4_DECK);return;}
  if(!S4.bcol){const L=[[548,600,58,0.14],[470,548,70,-0.08],[380,470,82,0.06],[300,380,96,0.3]];
    L.forEach(([a,c,y,rot])=>{const yy=C4_DECK+(y-C4_DECK)*b,cx=(a+c)/2;ctx.save();ctx.translate(cx,yy+3);ctx.rotate(rot*b);ctx.translate(-cx,-(yy+3));c4Deck(a,c,yy);ctx.restore();});return;}
  C4_SLABS.forEach((s)=>{ctx.fillStyle="#565856";ctx.fillRect(s.x,s.y+6,s.w,C2_FLOOR-s.y-6);for(let q=0;q<s.w;q+=5)fill("rgba(30,30,28,.3)",s.x+q,s.y+7,1,C2_FLOOR-s.y-8);
    c4Deck(s.x,s.x+s.w,s.y);for(let q=0;q<5;q++){fill("#8a5a3a",s.x-1-q*0.5,s.y+1+q*1.6,3,0.7);fill("#8a5a3a",s.x+s.w-2+q*0.5,s.y+1+q*1.6,3,0.7);}});
  for(let q=0;q<12;q++)fill(q%2?"#6a6c6a":"#56585a",318+q*6+(q%3)*2,C2_FLOOR-3-(q%3),5,3);}
function c4Ravine(){const S4=c4S();
  fill("rgba(60,90,100,.75)",110,C2_FLOOR-1,250,2);for(let n=0;n<12;n++){const x=110+((n*23+tick*0.6)%250);fill("rgba(230,240,240,.6)",x,C2_FLOOR-0.5,3,0.5);}
  if(S4.bcol){fill("#5e605e",444,C2_FLOOR-16,12,16);fill("#7a7c7a",444,C2_FLOOR-16,12,2);for(let q=0;q<3;q++)fill("#8a5a3a",446+q*3,C2_FLOOR-19-q,1,4);}
  else{fill("#5e605e",444,C4_DECK+5,12,C2_FLOOR-C4_DECK-5);fill("#7a7c78",444,C4_DECK+5,2,C2_FLOOR-C4_DECK-5);fill("#3e403e",454,C4_DECK+5,2,C2_FLOOR-C4_DECK-5);}
  fill("rgba(8,10,14,.35)",600,C4_DECK+6,160,C2_FLOOR-C4_DECK-6);
  for(let q=0;q<14;q++){const vx=764+q*17,len=4+(q*7)%8;for(let y=0;y<len;y++)fill(y%3?"#3e5a2a":"#4e6a30",vx+Math.sin(tick/50+q+y*0.3)*0.5,C4_DECK+1+y,0.5,0.5);}
  [[150,"tire"],[248,"barrel"],[540,"tire"],[700,"barrel"],[330,"block"]].forEach(([x,k])=>{if(k==="tire"){fill("#1a1a1a",x-4,C2_FLOOR-3,8,3);fill("#3a3a3a",x-2,C2_FLOOR-2,4,1);}
    else if(k==="barrel"){fill("#6a3a1e",x,C2_FLOOR-7,5,7);fill("#8a4a26",x,C2_FLOOR-7,5,1);fill("#4a2a14",x,C2_FLOOR-4,5,0.5);}else{fill("#6a6c6a",x,C2_FLOOR-5,9,5);fill("#8a8c8a",x,C2_FLOOR-5,9,1);fill("#8a5a3a",x+8,C2_FLOOR-8,0.5,4);}});}
function c4RoadRiver(){
  const sx=1080;if(sx>camX-90&&sx<camX+280){ctx.save();ctx.translate(sx,77);ctx.rotate(-0.14);
    ctx.fillStyle="#b8bcc0";ctx.beginPath();ctx.ellipse(0,0,26,6,0,0,7);ctx.fill();ctx.fillStyle="#8a9098";ctx.fillRect(-24,1,48,3);
    for(let q=0;q<5;q++)fill("rgba(70,60,50,.45)",-20+q*9,-4+(q%2),5,6);fill("#7a8088",-10,-6,0.6,9);fill("#7a8088",6,-6,0.6,9);/* grime + panel lines */
    fill("#3a5a9a",-8,-4,14,2);fill("#2a2e36",18,-3,6,3);fill("#5a5e66",-30,-2,8,1.5);
    ctx.strokeStyle="#4a4e56";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-10,-5);ctx.lineTo(-14,-13);ctx.lineTo(-24,-15);ctx.moveTo(8,-5);ctx.lineTo(14,-11);ctx.stroke();/* snapped rotor arms */
    fill("#8a4a2a",-2,-1,4,1);ctx.restore();for(let q=0;q<4;q++){const a=((tick*0.008+q/4)%1);ctx.globalAlpha=0.28*(1-a);ctx.fillStyle="#6a6460";ctx.beginPath();ctx.arc(sx+12+q*2,70-a*30,3+a*8,0,7);ctx.fill();ctx.globalAlpha=1;}
    c4BoxArt(sx-50,86,4,"crushed",9);}
  const p0=Math.floor((camX-10)/24)*24;for(let x=p0;x<camX+204;x+=24){if(r(x,1670)<0.18)continue;fill("#6a645c",x,C2_FLOOR-10,2,7);fill("#8a5a3a",x,C2_FLOOR-6,2,1);}
  for(let x=Math.floor((camX-10)/8)*8;x<camX+204;x+=8){if(r((x/48)|0,1671)<0.2)continue;fill("#8a8680",x,C2_FLOOR-10,8,1.6);fill("rgba(120,60,24,.5)",x+(r(x,1672)*6|0),C2_FLOOR-10,2,1.6);}
  for(let x=Math.floor((camX)/260)*260+130;x<camX+260;x+=260){fill("#4a4a48",x,C2_FLOOR-44,2,44);ctx.strokeStyle="#4a4a48";ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x+1,C2_FLOOR-44);ctx.quadraticCurveTo(x+8,C2_FLOOR-50,x+12,C2_FLOOR-42+(x%3));ctx.stroke();fill("#2a2a28",x+10,C2_FLOOR-42+(x%3),5,2);}/* bent street lamps */}
function c4RiverProps(){/* broken fence, a rusted warning sign, an overturned rowboat */
  for(let q=0;q<9;q++){const x=470+q*48+(q%3)*4;if(x>860)break;if(q%4===3)continue;ctx.save();ctx.translate(x,C2_FLOOR);ctx.rotate((q%3-1)*0.12);fill("#5a4a3a",-1,-10,2,10);fill("#7a6a54",-1,-10,1,10);ctx.restore();q%2||fill("#6a5a48",x,C2_FLOOR-7,30,1.2);}
  {const x=520;fill("#4a4a48",x,C2_FLOOR-22,1.5,22);fill("#c8b040",x-11,C2_FLOOR-31,24,10);fill("#8a5a2a",x-11,C2_FLOOR-23,24,1.5);for(let q=0;q<5;q++)fill("rgba(120,60,24,.6)",x-10+q*5,C2_FLOOR-31+(q%3)*3,2,2);
    text("DAM",x-7,C2_FLOOR-30,"#2a2410",'3px "Press Start 2P",monospace');text("NO SWIM",x-10,C2_FLOOR-26,"#2a2410",'3px "Press Start 2P",monospace');}
  {const x=96;ctx.fillStyle="#5a3a24";ctx.beginPath();ctx.moveTo(x-16,C2_FLOOR);ctx.quadraticCurveTo(x,C2_FLOOR-9,x+16,C2_FLOOR);ctx.fill();fill("#7a5234",x-14,C2_FLOOR-2,28,1);fill("#3a2416",x-2,C2_FLOOR-6,4,1);for(let q=0;q<3;q++)fill("rgba(90,120,60,.6)",x-10+q*8,C2_FLOOR-3-(q%2),3,2);}}
/* the foreground river channel */
function c4River(){const x0=C4_R0,x1=C4_R1,top=C2_FLOOR-1-C4.flood*6;if(x1<camX-10||x0>camX+202)return;
  ctx.fillStyle="#2a2014";ctx.fillRect(x0-6,C2_FLOOR-3,x1-x0+12,20);
  const gr=C3.cache.c4riv2||(C3.cache.c4riv2=(()=>{const q=ctx.createLinearGradient(0,C2_FLOOR,0,108);q.addColorStop(0,"#4e7a86");q.addColorStop(1,"#1e3a46");return q;})());
  ctx.fillStyle=gr;ctx.fillRect(x0,top,x1-x0,110-top);
  for(let n=0;n<34;n++){const ph=(tick*(0.02+0.012*(n%3))+r(n,1431))%1,x=x0+r(n,1432)*(x1-x0),y=top+1+ph*14;ctx.globalAlpha=0.55*(1-ph);ctx.fillStyle=n%4?"#9ab8c0":"#e8f0f0";ctx.fillRect(x+ph*8,y,6+ph*8,0.7);ctx.globalAlpha=1;}
  for(let n=0;n<8;n++){const x=x0+8+((n*29+tick*0.9)%(x1-x0-16));fill("rgba(240,244,240,.7)",x,top+0.5,3,0.8);}
  for(let n=0;n<4;n++){const x=x0+30+n*46+Math.sin(tick/60+n)*3;fill("#4a3a26",x,top+2+(n%2),7,1.2);}/* drifting debris */
  for(let n=0;n<6;n++){fill("#5a5a52",x0-5+n*1.5,C2_FLOOR+1+n,3,2);fill("#5a5a52",x1+1-n,C2_FLOOR+1+n,3,2);}
  fill("#3a2a18",x0-6,C2_FLOOR-3,6,4);fill("#3a2a18",x1,C2_FLOOR-3,6,4);fill("#6a6a3a",x0-6,C2_FLOOR-3,6,1);fill("#6a6a3a",x1,C2_FLOOR-3,6,1);}
function c4Draw(){if(c5Is())return c5Draw();const S4=c4S();if(room==="port")return c4PortDraw();
  if(room==="river"){c4RiverProps();c4BridgeBuilt();
    C4_SHADE.river.forEach((x,i)=>{if(C4_TREES.indexOf(x)<0&&x>300)c4Tree(x,i+3,x===685?"birch":"",0);});
    C4_TREES.forEach((x,i)=>{c4Tree(x,i,"",S4.trees[i]);const p=S4.piles[i];if(S4.trees[i]&&(p.log||p.stake)){for(let q=0;q<p.log;q++){fill("#5a3e24",x+6+q*1.5,C2_FLOOR-2.2-q*2.2,12,2.2);fill("#7a5a36",x+6+q*1.5,C2_FLOOR-2.2-q*2.2,12,0.6);fill("#c8a068",x+18+q*1.5,C2_FLOOR-2.2-q*2.2,1.5,2.2);}p.stake&&(fill("#7a5a3a",x-16,C2_FLOOR-1.5,14,1.5),fill("#c8a068",x-17,C2_FLOOR-1.5,1.5,1.5));}});
    C4_VINES.forEach((x,i)=>{c4Tree(x,i+20,"tall",0);
      for(let v=0;v<S4.vines[i];v++){const vx=x+(v?6:-6);for(let y=0;y<46;y++)fill(y%4?"#34522a":"#466a30",vx+Math.sin(tick/40+y*0.2+v)*1.2*(y/46),C2_FLOOR-58+y,1,1);fill("#2a4a1a",vx-2,C2_FLOOR-13,5,2);}});
    c4Camp();}
  else if(room==="rroad"){const sg=(x,a,b)=>{if(x<camX-40||x>camX+232)return;fill("#4a4a48",x,C2_FLOOR-26,2,26);fill("#2a5a3a",x-14,C2_FLOOR-34,30,11);fill("#d8e0d8",x-13,C2_FLOOR-33,28,0.6);
      for(let q=0;q<4;q++)fill("rgba(120,60,24,.6)",x-12+q*7,C2_FLOOR-33+(q%2)*5,2+(q%2),2);text(a,x-12,C2_FLOOR-32,"#e8e8e0",'3px "Press Start 2P",monospace');text(b,x-12,C2_FLOOR-27.5,"#e8e8e0",'3px "Press Start 2P",monospace');};
    sg(1780,"<RIDGE TWR","  14 KM");sg(420,"< BRIDGE"," 500 M");sg(1250,"RIVER RD","  WEST");}
  else{c4BridgeDraw();const B=S4.box;C4_POS.forEach((p,i)=>c4BoxArt(p.x,p.y,B?B.col[i]:i,B?B.st[i]:"locked",i));}}

function c4Back(){if(c5Is())return c5Back();if(room==="port")return c4PortBack();if(room==="river"){c4DamFX();c4River();}else if(room==="rroad")c4RoadRiver();else c4Ravine();}
/* trees: the game's own tree model, the same as the forest and the cracked road */
function c4Tree(x,s,kind,cut){C4.tob=C4.tob||{};const k=x+"|"+s;const t=C4.tob[k]||(C4.tob[k]={x,side:1,dead:kind==="dead",top:kind==="tall"?66:54+(s%3)*6,s:s*13+x,br:[]});
  if(cut){const g=C2_FLOOR;Ft(x,g+1,9,0.4);for(let y=0;y<6;y++){const w=7-y*0.3;fill("#2a1e14",x-w/2,g-y,w,1);fill("#4a3624",x-w/2,g-y,1,1);}fill("#c8a068",x-3,g-6.5,6,1);fill("#8a6a44",x-1.5,g-6.2,3,0.5);for(let q=0;q<5;q++)fill("#c8a068",x-8+q*4,g-0.5,1,0.5);return;}
  c2Tree(t);}
function c4BigCar(x,k,i){const c=c2NewCar(x,k,i);c.w=Math.round(c.w*1.8);c.h=Math.round(c.h*1.8);c.burn=false;return c;}
