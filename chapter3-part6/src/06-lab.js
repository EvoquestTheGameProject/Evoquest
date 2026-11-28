/* ======================= PART 6D: THE SECOND CHAMBER (the lab) =======================
   A long laboratory: a clean workbench by the door, a hall of containment tubes (the Evolved, each with different body parts),
   supply shelves, a media room with a TV and tape player, and a test range. Search the room for the parts of an Upgrade
   Core, find the VHS tapes, and build the new weapon at the workbench. */
const P6_LB=240,P6_LD=26;
/* every searchable spot: [id, x, label, item, task frames, colour, [text when found], key needed] */
const P6_LSPOT=[
  ["syr",405,"SEARCH THE MEDICAL CART","vsyr",26,"#c8e8f0","<b>THE MEDICAL CART.</b> Sealed gloves, bandages, a bag of saline… and a rack of hollow needles. Just what a fine jet needs."],
  ["amp",445,"SEARCH THE BROKEN TUBE","vamp",28,"#9ae8ff","<b>THE BROKEN TUBE.</b> Whatever lived in here is long gone. Among the shards, one thick vial survived."],
  ["tape5",325,"LOOK BEHIND THE TUBE","vhs5",26,"#7a828a","<b>BEHIND THE TUBE.</b> A cable duct, and wedged in it, a tape with a cracked case."],
  ["tape2",565,"SEARCH THE SAMPLE DRAWERS","vhs2",24,"#5a626a","<b>SAMPLE DRAWERS.</b> Rows of labelled slides, all dust. At the back, a dusty tape."],
  ["gland",615,"BREAK THE TUBE","vgland",44,"#8aff6a","","crow"],
  ["pipe",690,"SEARCH THE STEEL SHELF","vpipe",24,"#9aa4ae","<b>THE STEEL SHELF.</b> Offcuts of steel bar and a few lengths of seamless pipe. One is perfect."],
  ["coil",760,"SEARCH THE TOOL CABINET","vcoil",24,"#c87a3a","<b>THE TOOL CABINET.</b> Screwdrivers, a hacksaw, a reel of enamelled copper wire wound on a spool. A coil, almost."],
  ["seal",825,"OPEN THE DRAWERS","vseal",22,"#2a2a30","<b>THE DRAWERS.</b> Washers, screws, and a tin of rubber rings. One would do."],
  ["gauge",885,"CHECK THE PIPE PANEL","vgauge",26,"#d8d0b0","<b>THE PIPE PANEL.</b> A wall of pipes with a row of dials. One dial hangs loose on its pipe: you can unscrew it."],
  ["tape3",945,"OPEN THE LOCKER","vhs3",26,"#6a747c","<b>THE LOCKER.</b> A jacket, a thermos, a photo of two kids. And a tape."],
  ["desk",1010,"SEARCH THE DESK","vkey",26,"#5aa8ff","<b>THE DESK.</b> A cold cup of coffee, a lamp, a pile of reports. Under the keyboard, a blue card: POWER STORE."],
  ["tape4",1150,"SEARCH THE TAPE SHELF","vhs4",24,"#6a747c","<b>THE TAPE SHELF.</b> Rows of cases, mostly empty. One still has its tape."],
  ["power",1205,"POWER LOCKER","vcell",24,"#ffd23a","<b>THE POWER LOCKER.</b> The card reader beeps green. Inside: a rack of charged cells.","vkey"],
  ["tape6",1278,"SEARCH THE RANGE LOCKER","vhs6",24,"#9ab0c8","<b>THE RANGE LOCKER.</b> Ear defenders, safety glasses, and a taped-shut cassette marked: WEAPONS TEST."]];
P6_LSPOT.forEach((q)=>rooms.slab.ints.push({id:"c5_"+q[0],x:q[1],r:0,label:q[2]}));
rooms.slab.ints.push({id:"c5_lbench",x:150,r:0,label:"CLEAN WORKBENCH"},{id:"c5_lbp",x:222,r:0,label:"READ THE BLUEPRINT"},{id:"c5_ltv",x:1085,r:0,label:"THE TV"},{id:"c5_ldoor",x:22,r:0,label:"BACK INTO THE DARK"});
const P6_TUBES=(()=>{const L=[];let k=0;for(let x=282;x<1280;x+=43){const i=L.length;const kind=[0,1,2,3,4,5,6,7][(i*3+1)%8];L.push({x,kind,st:"live"});}return L;})();
P6_TUBES.forEach((t,i)=>{if(Math.abs(t.x-445)<22)t.st="broken";else if(Math.abs(t.x-617)<22){t.st="dead";t.big=1;}else if(i%7===5)t.st="empty";});
var P6L={t:0,aw:{},bub:[],steam:[],spark:[],tv:0,scare:0};
/* ---------------- the walls and floor (painted once per tile) ---------------- */
{const _t=c5Tile;c5Tile=function(id,i,seed){if(id!=="slab")return _t(id,i,seed);const k=id+i;return C5.tiles[k]||(C5.tiles[k]=Ae((t)=>p6PaintLab(t,i,seed)));};}
function p6PaintLab(t,i,seed){const O=i*336,clean=i<=1,R=(k,a)=>r(k+i*47,a+seed);
  t.grad(0,184,clean?["#8a9aa0","#a4b2b6","#92a2a8","#7a8a90"]:["#566468","#667478","#58686c","#46565a"]);
  for(let y=0;y<184;y+=14)t.rect(0,y,384,1,clean?"#5a6a70":"#2a3438",0.7);for(let y=0;y<184;y+=14)for(let x=(((y/14)|0)%2)*21-(O%42);x<384;x+=42)t.rect(x,y,1,14,clean?"#6a7a80":"#2a3438",0.5);
  for(let y=0;y<184;y++)for(let x=0;x<384;x++){const n=It((x+O)/10,y/7,seed);if(!clean){if(n>0.62)t.px(x,y,[88,110,96],(n-0.62)*1.6);if(n<0.28)t.px(x,y,[10,16,18],0.45);}else if(n<0.3)t.px(x,y,[60,76,82],0.25);}
  if(!clean)for(let k=0;k<14;k++){const x=R(k,3)*384,len=20+R(k,4)*90;for(let y=0;y<len;y++)t.px(x+Math.sin(y/6+k)*1.4,6+y,[48,120,60],0.4);}
  /* ceiling: pipes and light strips */
  t.rect(0,0,384,22,clean?"#6a7a82":"#2a3236");t.rect(0,22,384,1,"#14181a");for(let x=((O%64)*-1);x<384;x+=64){t.rect(x,3,4,20,"#1a2024");}
  t.rect(0,6,384,4,"#3a444a");t.rect(0,6,384,1,"#8a949a");t.rect(0,14,384,3,"#4a3a2a");t.rect(0,14,384,1,"#8a6a4a");
  /* floor */
  t.grad(184,216,clean?["#c0c8cc","#a8b2b8","#8a949a"]:["#3a4448","#2a3236","#1a2024"]);for(let x=(-(O%48));x<384;x+=48)t.rect(x,185,1,31,clean?"#7a868c":"#0e1214");for(let y=200;y<216;y+=15)t.rect(0,y,384,1,clean?"#7a868c":"#0e1214",0.8);
  if(!clean)for(let k=0;k<80;k++)t.rect(384*R(k,9),186+30*R(k,10),2+(R(k,11)*6|0),1,R(k,12)<0.5?"#48545a":"#0e1214",0.7);
  /* hazard stripe along the wall foot */
  for(let x=-(O%16);x<384;x+=16){t.rect(x,176,8,6,"#c8a828");t.rect(x+8,176,8,6,"#1a1a1a");}t.rect(0,176,384,1,"#fff0a0",0.5);
  t.rect(0,184,384,1,"#7a8a90");t.rect(0,185,384,1,"#06080a");}
/* ---------------- creatures in the tubes: the Evolved, each with different body parts ---------------- */
function p6Subject(x,y,kind,T,aw,dead){const bob=dead?0:Math.sin(T/40+x)*1.2+(aw?Math.sin(T/3)*1.2:0),by=y+bob,sk=["#7a9a88","#8a8a6a","#7a8aa0","#9a7a8a","#8a9a7a","#7a7a90","#a08a6a","#6a9a9a"][kind],dk="#2a3a32",ey=aw?"#ff3a2a":"#d8ff6a";
  ctx.save();if(dead){ctx.translate(x,by);ctx.rotate(0.35);ctx.translate(-x,-by);}
  const head=(hx,hy,r)=>{fill(sk,hx-r,hy-r,r*2,r*2);fill("#ffffff22",hx-r,hy-r,r*0.8,r*2);};
  fill(sk,x-4,by-26,8,13);fill("rgba(255,255,255,.18)",x-4,by-26,2,13);fill(dk,x-3,by-14,6,10);/* torso and hips */
  fill(sk,x-3,by-4,2.4,8);fill(sk,x+1,by-4,2.4,8);/* legs */
  if(kind===0){head(x,by-30,3.4);fill(ey,x-2,by-31,1.2,1.2);fill(ey,x+1,by-31,1.2,1.2);for(const [ox,oy,len] of [[-5,-24,-7],[5,-24,7],[-4,-18,-6],[4,-18,6]]){ctx.strokeStyle=sk;ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(x+ox*0.7,by+oy);ctx.lineTo(x+ox+len*0.5,by+oy+10);ctx.stroke();fill("#2a1a1a",x+ox+len*0.5-0.6,by+oy+9,1.2,3);}}
  else if(kind===1){head(x,by-30,3);fill(ey,x-1.6,by-31,1,1);fill(ey,x+0.8,by-31,1,1);for(const s of [-1,1]){ctx.strokeStyle=sk;ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(x+s*4,by-23);ctx.lineTo(x+s*8,by-6);ctx.lineTo(x+s*7,by+8);ctx.stroke();for(let q=0;q<3;q++)fill("#e8e0d0",x+s*7-0.6+q*0.9*s,by+8+q*0.4,0.6,2.6);}}
  else if(kind===2){head(x,by-31,4);for(let q=0;q<5;q++)fill(ey,x-3+q*1.5,by-33+(q%2)*2.4,1,1);ctx.strokeStyle=sk;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x+1,by+2);ctx.bezierCurveTo(x+10,by+2,x+10,by+10,x+4,by+9+Math.sin(T/20)*2);ctx.stroke();}
  else if(kind===3){head(x,by-30,3);fill(ey,x-1.6,by-31,1,1);fill(ey,x+0.8,by-31,1,1);for(const s of [-1,1]){ctx.fillStyle="#3a2a3a";ctx.beginPath();ctx.moveTo(x+s*3,by-24);ctx.lineTo(x+s*11,by-33+Math.sin(T/30)*1.5);ctx.lineTo(x+s*10,by-14);ctx.lineTo(x+s*7,by-18);ctx.lineTo(x+s*5,by-10);ctx.closePath();ctx.fill();ctx.strokeStyle="#6a4a6a";ctx.lineWidth=0.5;ctx.beginPath();ctx.moveTo(x+s*3,by-24);ctx.lineTo(x+s*10,by-14);ctx.stroke();}}
  else if(kind===4){fill(sk,x-6,by-20,12,12);head(x-3,by-30,2.6);head(x+3,by-31,2.4);fill(ey,x-4,by-31,1,1);fill(ey,x+2,by-32,1,1);fill(ey,x+4,by-32,1,1);}
  else if(kind===5){fill(sk,x-3,by-30,6,5);for(let q=0;q<6;q++){ctx.fillStyle="#d8d0b8";ctx.beginPath();ctx.moveTo(x+4,by-26+q*3);ctx.lineTo(x+9,by-28+q*3);ctx.lineTo(x+4,by-24+q*3);ctx.fill();}fill("#2a0a0a",x-2,by-28,4,1.6);}
  else if(kind===6){fill(sk,x-3,by-31,6,5);fill(sk,x+2,by-30,5,2.6);fill("#1a1010",x+6,by-29.6,1.4,1.4);fill(sk,x-4,by-34,2,3);fill(sk,x+1,by-34,2,3);fill(ey,x-1,by-30,1,1);for(let q=0;q<3;q++){fill("#e8e0d0",x+3+q*1.2,by-28,0.6,1.4);}ctx.strokeStyle=sk;ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(x-3,by-4);ctx.quadraticCurveTo(x-10,by+2,x-6,by+8);ctx.stroke();}
  else{head(x,by-30,3);fill(ey,x-1.6,by-31,1,1);fill(ey,x+0.8,by-31,1,1);for(let q=0;q<7;q++){const cx=x-5+((q*7)%10),cy=by-24+((q*5)%16);fill(q%2?"#8aff9a":"#ff9ad0",cx,cy,1.6,3.2);fill("#ffffff",cx,cy,0.6,1);}}
  ctx.restore();}
/* ---------------- props ---------------- */
function p6Tube(tb,i){const x=tb.x,g=C2_FLOOR,T=P6L.t;if(x<camX-20||x>camX+212)return;const top=22,bot=86;
  fill("#10161a",x-13,bot,26,5);fill("#2a343a",x-13,bot,26,1.2);fill("#243038",x-12,top-4,24,5);fill("#4a5a62",x-12,top-4,24,1);
  const col=tb.kind%3===0?"60,220,140":tb.kind%3===1?"80,170,255":"230,200,80";
  if(tb.st==="broken"){fill("rgba(120,220,200,.10)",x-10,top,3,30);fill("rgba(120,220,200,.10)",x+8,top+8,2,20);ctx.strokeStyle="rgba(220,255,250,.4)";ctx.lineWidth=0.4;ctx.beginPath();ctx.moveTo(x-8,top);ctx.lineTo(x-4,top+14);ctx.lineTo(x-7,top+24);ctx.moveTo(x+4,top);ctx.lineTo(x+7,top+18);ctx.stroke();
    for(let q=0;q<9;q++)fill(q%2?"rgba(190,240,235,.7)":"rgba(120,200,190,.7)",x-12+((q*29)%24),g-0.6-(q%2),1+(q%3)*0.6,0.8);fill("rgba(80,200,160,.35)",x-14,g,28,1.2);glow(x,g-2,16,"60,220,140",0.18);return;}
  fill("rgba(120,220,200,.16)",x-10,top,20,bot-top);fill("rgba(220,255,250,.5)",x-10,top,1.2,bot-top);fill("rgba(20,40,40,.4)",x+9,top,1,bot-top);
  fill("rgba("+col+",.30)",x-9.4,top+6,18.8,bot-top-6);fill("rgba("+col+",.14)",x-9.4,top,18.8,6);fill("rgba(240,255,250,.45)",x-9.4,top+6,18.8,0.8);
  if(tb.st!=="empty"){const aw=P6L.aw[i]>0;p6Subject(x,bot-4,tb.kind,T,aw,tb.st==="dead");if(aw){const dx=(Math.random()-0.5)*1.2;fill("rgba(255,255,255,.35)",x-10+dx,top,1.2,bot-top);}}
  /* bubbles */
  for(let q=0;q<3;q++){const ph=((T*0.4+q*37+x)%60)/60,bx=x-6+((q*5+i*3)%12),by=bot-ph*(bot-top-6);ctx.globalAlpha=0.7*(1-ph);fill("#d8fff0",bx,by,0.8,0.8);ctx.globalAlpha=1;}
  /* status light and a label */
  fill("#06080a",x-4,bot+1.6,8,2);const ok=tb.st==="dead"?0:1,bl=(T>>5)%2;fill(ok?(bl?"#3aff7a":"#1a6a3a"):"#ff3a2a",x-2.4,bot+2,1.4,1);fill(ok?"#c8d8dc":"#6a3a3a",x+0.4,bot+2,3,1);
  tb.st==="dead"&&(ctx.strokeStyle="rgba(220,255,250,.55)",ctx.lineWidth=0.5,ctx.beginPath(),ctx.moveTo(x-9,top+3),ctx.lineTo(x-3,top+22),ctx.lineTo(x-7,top+40),ctx.moveTo(x+8,top+4),ctx.lineTo(x+3,top+30),ctx.stroke(),glow(x,60,22,"140,255,110",0.22));
  glow(x,56,24,col,0.07);}
function p6Bench(){const x=150,g=C2_FLOOR;if(x<camX-70||x>camX+260)return;
  fill("rgba(0,0,0,.28)",x-44,g-0.2,88,1.6);fill("#aab4ba",x-44,g-22,88,3);fill("#e8eef0",x-44,g-22,88,1);fill("#7a868c",x-42,g-19,84,15);fill("#8a969c",x-42,g-19,84,1);fill("#5a666c",x-42,g-4,84,4);
  for(let q=0;q<3;q++){fill("#6a767c",x-36+q*28,g-17,24,11);fill("#98a4aa",x-36+q*28,g-17,24,1);fill("#2a3036",x-27+q*28,g-12,6,1.6);}
  /* things on the clean surface: a lamp, a magnifier, clamps and tools laid out neatly */
  fill("#3a424a",x-36,g-30,1.4,8);fill("#3a424a",x-36,g-30,10,1.2);fill("#fff6c0",x-28,g-29,5,1.2);glow(x-26,g-26,18,"255,246,200",0.28);
  fill("#c8ccd0",x-8,g-24,16,2);fill("#2a2e34",x-8,g-23.4,16,0.6);fill("#4a8ad8",x+14,g-25,6,3);fill("#ffffff",x+15,g-25,4,0.6);
  fill("#3a424a",x+24,g-25,8,1.6);fill("#3a424a",x+22,g-25,2,3.6);
  if(!p6S().dis){fill("#2a2e36",x-18,g-27,17,4);fill("#b06aff",x-17,g-27,15,1);fill("#5a2a8a",x-16,g-24,6,2);fill("#4a3a2a",x-20,g-26,3,5);}
  else if(!p6S().made.vupcore){fill("#6a7280",x-20,g-26,10,2.4);fill("#8a6a4a",x-5,g-26,5,2.4);fill("#b06aff",x+3,g-27,7,3.4);}
  /* a drain and a sink at one end, a stool */
  fill("#4a565c",x+34,g-22,10,2);fill("#aab4ba",x+36,g-30,1.6,8);fill("#aab4ba",x+36,g-30,6,1.2);fill("#d8e8f0",x+41.4,g-30,0.6,3+((P6L.t>>4)%2));}
function p6Blueprint(){const x=222,g=C2_FLOOR;if(x<camX-30||x>camX+222)return;fill("#10181c",x-18,g-62,36,38);fill("#1e3a5a",x-17,g-61,34,36);for(let q=0;q<6;q++)fill("rgba(120,190,255,.25)",x-17+q*6,g-61,0.6,36);for(let q=0;q<6;q++)fill("rgba(120,190,255,.25)",x-17,g-61+q*6,34,0.6);
  ctx.strokeStyle="#b8e0ff";ctx.lineWidth=0.5;ctx.strokeRect(x-12,g-56,9,7);ctx.strokeRect(x+3,g-56,9,7);ctx.strokeRect(x-12,g-44,9,7);ctx.strokeRect(x+3,g-44,9,7);ctx.beginPath();ctx.moveTo(x-3,g-52);ctx.lineTo(x+3,g-52);ctx.moveTo(x-8,g-49);ctx.lineTo(x-8,g-44);ctx.moveTo(x+8,g-49);ctx.lineTo(x+8,g-44);ctx.moveTo(x-3,g-40);ctx.lineTo(x+3,g-40);ctx.stroke();
  text("UPGRADE",x-9,g-34,"#b8e0ff",'2.4px "Press Start 2P",monospace');fill("#c8ccd0",x-14,g-63,3,2);fill("#c8ccd0",x+11,g-63,3,2);}
function p6Cart(x){const g=C2_FLOOR;if(x<camX-30||x>camX+222)return;fill("rgba(0,0,0,.3)",x-14,g,28,1.4);fill("#c8d0d4",x-13,g-20,26,2);fill("#e8f0f2",x-13,g-20,26,0.8);fill("#8a949a",x-12,g-18,1.4,18);fill("#8a949a",x+10.6,g-18,1.4,18);fill("#aab4ba",x-12,g-9,24,1.2);
  fill("#1a1e22",x-9,g-4,3,4);fill("#1a1e22",x+6,g-4,3,4);fill("#d8e8f0",x-9,g-23,5,3);fill("#e0d0a0",x-1,g-22,7,2);fill("#c83a3a",x-4,g-24,2,4);for(let q=0;q<4;q++)fill("#cfe8f0",x+5+q*1.6,g-26,0.8,6);if(!p6S().found.syr){for(let q=0;q<4;q++)fill("#ff6a8a",x+5+q*1.6,g-23,0.8,2);}}
function p6Shelf(x,kind,key){const g=C2_FLOOR;if(x<camX-34||x>camX+226)return;const s=p6S().found;fill("rgba(0,0,0,.3)",x-18,g,36,1.4);
  if(kind==="steel"){fill("#2a3036",x-17,g-34,34,34);for(const yy of [-34,-23,-12,-1])fill("#6a747c",x-17,g+yy,34,1.4);fill("#8a949a",x-17,g-34,34,0.8);for(let q=0;q<5;q++){fill("#9aa4ae",x-14+q*6,g-31,4,7);fill("#cfd8e0",x-14+q*6,g-31,1,7);}for(let q=0;q<4;q++){fill("#7a838c",x-14+q*7,g-19,5,6);}fill("#4a525a",x-14,g-8,28,5);if(!s.pipe)fill("#e8eef0",x-6,g-8,12,2);}
  else if(kind==="tool"){fill("#3a4a3a",x-15,g-38,30,38);fill("#5a6a5a",x-15,g-38,30,1.4);for(let q=0;q<4;q++){fill("#2a362a",x-13,g-34+q*9,26,7);fill("#8a9a8a",x-7,g-31+q*9,14,1);}fill("#8a9a8a",x-15,g-38,1,38);for(let q=0;q<3;q++){fill("#c87a3a",x-10+q*8,g-44,1.6,6);fill("#c8c8d0",x-11+q*8,g-44,3.6,1);}}
  else if(kind==="drawers"){fill("#4a5258",x-16,g-30,32,30);fill("#6a747c",x-16,g-30,32,1.4);for(let q=0;q<4;q++){fill("#323a40",x-14,g-28+q*7,28,6);fill("#aab4ba",x-3,g-25+q*7,6,1.2);}}
  else if(kind==="locker"){fill("#4a5a6a",x-12,g-42,24,42);fill("#6a7a8a",x-12,g-42,24,1.4);fill("#2a343e",x,g-42,0.8,42);for(let q=0;q<5;q++)fill("#1a222a",x-9,g-38+q*2.4,7,0.8);fill("#aab4ba",x-3.6,g-22,1.6,4);fill("#aab4ba",x+3,g-22,1.6,4);fill("rgba(40,10,10,.4)",x-11,g-14,22,8);}
  else if(kind==="power"){fill("#3a3a30",x-13,g-40,26,40);fill("#6a6a50",x-13,g-40,26,1.4);fill("#2a2a22",x-11,g-38,22,26);for(let q=0;q<3;q++)for(let w=0;w<2;w++){fill("#2a2e34",x-8+w*10,g-35+q*8,7,6);if(!s.power||q>0){fill("#ffd23a",x-7+w*10,g-34+q*8,5,4);fill("#3aff7a",x-5.6+w*10,g-33+q*8,1.2,1);}}
    fill("#0a0c10",x-5,g-9,10,7);fill(s.power?"#3aff7a":(p6S().found.desk?"#5aa8ff":"#ff3a2a"),x-3,g-7,6,1.6);glow(x,g-6,8,s.power?"60,255,120":"255,60,40",0.4);}}
function p6Desk(x){const g=C2_FLOOR;if(x<camX-34||x>camX+226)return;fill("rgba(0,0,0,.3)",x-22,g,44,1.4);fill("#4a3a2c",x-22,g-18,44,3);fill("#6a5a46",x-22,g-18,44,1);fill("#2a2018",x-20,g-15,3,15);fill("#2a2018",x+17,g-15,3,15);fill("#3a2e22",x-16,g-14,26,9);
  fill("#0a0e10",x-10,g-32,16,13);fill("#1a2a2a",x-9,g-31,14,10);for(let q=0;q<4;q++)fill("#3aff7a",x-7,g-29+q*2.4,5+((q*3)%6),0.8);fill("#2a3036",x-3,g-19,4,2);glow(x-2,g-26,18,"60,255,120",0.18);
  fill("#e8e0c8",x+10,g-20,9,2);fill("#c83a3a",x+11,g-20.6,3,0.8);fill("#e8d8b0",x-20,g-23,5,5);fill("#3a2a1a",x-19,g-22,3,1.6);fill("#3a3a42",x+2,g-20,10,1.6);}
function p6TvCart(x){const g=C2_FLOOR,T=P6L.t;if(x<camX-34||x>camX+226)return;const on=!!P6L.tv;fill("rgba(0,0,0,.3)",x-20,g,40,1.4);fill("#2a2e34",x-18,g-16,36,2);fill("#3a424a",x-18,g-16,36,0.8);fill("#1a1e22",x-16,g-14,1.6,14);fill("#1a1e22",x+14.4,g-14,1.6,14);fill("#14161a",x-14,g-10,6,6);fill("#14161a",x+8,g-10,6,6);
  fill("#3a3e46",x-14,g-28,28,12);fill("#6a707a",x-14,g-28,28,1);fill("#0a0c0e",x-12,g-26,20,9);fill(on?"#c8d8d8":"#0e1618",x-11.4,g-25.4,18.8,7.8);
  if(on){for(let q=0;q<10;q++)fill(q%2?"#8a9a9a":"#e8f0f0",x-11+((q*7+T*3)%18),g-25+((q*3+T)%8),2,0.8);fill("rgba(255,255,255,.18)",x-11,g-25+((T*0.6)%8),19,1);glow(x-2,g-21,24,"190,230,230",0.3);}else{fill("rgba(255,255,255,.05)",x-11,g-25.4,6,2);}
  fill("#2a2e34",x+10,g-26,3,2);fill("#c8c030",x+10.6,g-25.6,1,1);fill("#2a2e34",x+10,g-22,3,1.4);
  fill("#1a1e22",x-14,g-14,28,3);fill("#2a2e34",x-14,g-14,28,0.8);fill("#0a0c0e",x-6,g-12.6,12,1.2);fill(on?"#3aff7a":"#5a1a1a",x+8,g-13,1.4,1);fill("#c8c8d0",x-14,g-30,1,2);fill("#c8c8d0",x+13,g-30,1,2);ctx.strokeStyle="#8a8e94";ctx.lineWidth=0.4;ctx.beginPath();ctx.moveTo(x-2,g-28);ctx.lineTo(x-8,g-34);ctx.moveTo(x+2,g-28);ctx.lineTo(x+8,g-34);ctx.stroke();}
function p6TapeShelf(x){const g=C2_FLOOR;if(x<camX-34||x>camX+226)return;fill("rgba(0,0,0,.3)",x-16,g,32,1.4);fill("#3a2e22",x-15,g-40,30,40);fill("#5a4a38",x-15,g-40,30,1.2);for(const yy of [-40,-28,-16,-4])fill("#2a2018",x-15,g+yy,30,1.2);
  for(let r2=0;r2<3;r2++)for(let q=0;q<7;q++){if((q+r2)%3===0&&!(r2===1&&q===3))continue;fill(["#c83a3a","#3a8ad8","#d8b02a","#8a8e94","#2a2e34"][(q*3+r2)%5],x-13+q*3.8,g-38+r2*12,2.8,10);fill("#e8e0c8",x-13+q*3.8,g-34+r2*12,2.8,2);}}
function p6DeadTubeBig(){}
function p6LabBack(){const S=p6S(),T=P6L.t,g=C2_FLOOR;
  /* the door to the dark route */
  fill("#0a1012",6,g-46,22,46);fill("#2a343a",6,g-46,22,1.6);fill("#1a2226",8,g-44,18,44);fill("#02030a",10,g-42,14,42);glow(18,g-20,26,"20,30,60",0.2);
  /* back row: containment tubes (the specimens) */
  P6_TUBES.forEach((tb,i)=>p6Tube(tb,i));
  p6Blueprint();p6Bench();
  p6Cart(405);fill("rgba(0,0,0,.3)",445-14,g,28,1.4);p6Shelf(690,"steel");p6Shelf(760,"tool");p6Shelf(825,"drawers");
  /* the pipe panel: pipes up the wall and a loose dial */
  {const x=885;if(x>camX-40&&x<camX+232){fill("#2a3036",x-14,g-50,28,48);for(const px of [-9,-3,3,9]){fill("#5a626a",x+px-1.2,g-50,2.4,48);fill("#8a949c",x+px-1.2,g-50,0.8,48);}for(const [dx,dy] of [[-9,-30],[-3,-22],[3,-36],[9,-26]]){fill("#e8e0c0",x+dx-2,g+dy-2,4,4);fill("#c83a2a",x+dx+0.4,g+dy-1,1.4,1.4);}if(!S.found.gauge){fill("#e8e0c0",x-3,g-17,4,4);fill("#8a8e94",x-2,g-13,2,3);}for(let q=0;q<3;q++){const a=(T/6+q*7)%20;fill("rgba(210,230,235,.4)",x-9+q*9,g-52-a*0.6,1+a*0.1,1);}}}
  p6Shelf(945,"locker");p6Desk(1010);p6TvCart(1085);p6TapeShelf(1150);p6Shelf(1205,"power");p6Shelf(1278,"locker");
  /* the sample drawers */
  {const x=565;if(x>camX-30&&x<camX+222){fill("#4a5258",x-14,g-26,28,26);fill("#6a747c",x-14,g-26,28,1.2);for(let q=0;q<3;q++){fill("#323a40",x-12,g-24+q*8,24,7);fill("#aab4ba",x-3,g-21+q*8,6,1.2);}}}
  /* the tube hall's red alarm light and some drifting steam */
  for(const s of P6L.steam){ctx.globalAlpha=Math.max(0,s.a*0.4);fill("#d8e4e8",s.x,s.y,1.4+(1-s.a)*4,1+(1-s.a)*3);}ctx.globalAlpha=1;
  const e=De.slab||{};De.slab=Object.assign(e,{c:"60,90,90",l:"200,255,235",a:0.1,dk:0.5});}
function p6LabFront(){const T=P6L.t;for(let q=0;q<10;q++){const x=camX+((q*47+T*0.3)%200),y=(q*17+T*0.2)%100;ctx.globalAlpha=0.22;fill("#d8e8ea",x,y,0.6,0.6);ctx.globalAlpha=1;}
  /* a glass thump: the whole tube flashes */
  if(P6L.scare>0){ctx.fillStyle="rgba(200,255,240,"+0.05*P6L.scare/12+")";ctx.fillRect(camX,0,192,108);}}
function p6LabLights(){const T=P6L.t,g=C2_FLOOR,L=[];
  for(const tb of P6_TUBES){if(tb.x<camX-60||tb.x>camX+250||tb.st==="broken"||tb.st==="empty")continue;L.push({x:tb.x,y:56,r:34,i:tb.st==="dead"?0.32:0.45,c:tb.kind%3===0?"60,220,140":tb.kind%3===1?"80,170,255":"230,200,80"});}
  for(let x=60;x<P6_LW;x+=120){const fl=((T+x)%230<4)?0.35:1;if(x>camX-70&&x<camX+260)L.push({x,y:12,r:70,i:(x<260?0.9:0.55)*fl,c:x<260?"235,250,255":"200,235,220",cone:1});}
  L.push({x:150,y:g-26,r:60,i:0.8,c:"255,255,255"});L.push({x:1085,y:g-22,r:44,i:P6L.tv?0.7:0.15,c:"200,235,235"});L.push({x:1010,y:g-26,r:30,i:0.4,c:"90,255,150"});L.push({x:18,y:g-20,r:26,i:0.25,c:"80,100,200"});
  L.push({x:player.x,y:g-20,r:26,i:0.2,c:"230,240,255"});C10A.lights=L;}
function p6LabTint(){ctx.save();ctx.setTransform(ctx.canvas.width/192,0,0,ctx.canvas.height/108,0,0);ctx.drawImage(c10LM(C10A.lights||[],0.34,"4,10,14"),0,0,192,108);
  for(const L of C10A.lights||[]){const x=L.x-camX;if(x<-L.r||x>192+L.r)continue;glow(x,L.y,L.r*(L.cone?0.3:0.5),L.c,0.1*L.i);}
  const vg=C3.cache.p6lv||(C3.cache.p6lv=(()=>{const q=ctx.createRadialGradient(96,54,36,96,54,118);q.addColorStop(0,"rgba(0,0,0,0)");q.addColorStop(1,"rgba(2,8,10,.5)");return q;})());ctx.fillStyle=vg;ctx.fillRect(0,0,192,108);
  if(P6L.flash>0){ctx.fillStyle="rgba(240,255,250,"+P6L.flash+")";ctx.fillRect(0,0,192,108);}
  if(C3.dark>0){ctx.fillStyle="rgba(0,0,4,"+C3.dark+")";ctx.fillRect(0,0,192,108);}ctx.restore();}
/* ---------------- per-frame ---------------- */
function p6LabTick(){P6L.t++;P6.t++;C7.t++;P6L.flash>0&&(P6L.flash=Math.max(0,P6L.flash-0.025));P6L.scare>0&&P6L.scare--;
  if(P6L.t%11===0&&P6L.steam.length<20)P6L.steam.push({x:camX+Math.random()*200,y:C2_FLOOR-Math.random()*8,a:1});P6L.steam=P6L.steam.filter((s)=>{s.y-=0.25;s.a-=0.012;return s.a>0;});
  for(const k in P6L.aw)if(P6L.aw[k]>0)P6L.aw[k]--;
  /* a specimen wakes and thumps the glass when you walk close */
  P6_TUBES.forEach((tb,i)=>{if(tb.st!=="live")return;const d=Math.abs(player.x-tb.x);if(d<14&&!(P6L.aw[i]>0)&&!tb.cool){tb.cool=1;P6L.aw[i]=70;P6L.scare=12;$sx("doorhit");shake=Math.max(shake,2);tb.cd=500;}if(tb.cd>0&&--tb.cd===0)tb.cool=0;});}
function p6LabStep(){const S=p6S();if(dead)return;p6LabTick();if(C3.cut)return;if(modal)return;if(c3TaskStep())return;
  p6LabLights();p6WeaponLab&&p6WeaponLab();
  c5Pick((it)=>{const k=it.id.slice(3);
    if(k==="lrack")return{r:18,label:"REFILL VENOM"};if(k==="lbench")return{r:34,label:"CLEAN WORKBENCH"};if(k==="lbp")return{r:18,label:"READ THE BLUEPRINT"};if(k==="ltv")return{r:20,label:"THE TV"};if(k==="ldoor")return{r:16,label:"BACK INTO THE DARK"};
    const sp=P6_LSPOT.find((q)=>q[0]===k);if(sp){if(S.found[k])return null;return{r:sp[0]==="power"||sp[0]==="desk"?22:18,label:sp[2]};}return null;});}
function p6LabGot(sp){const S=p6S();S.found[sp[0]]=1;const id=sp[3];S.tapes=S.tapes||[];if(P6_TAPES.indexOf(id)>=0)S.tapes.push(id);
  inv.push(id);got.add(id);$sx("pickup");updateBag();c2Save("slab");updateGuide();sp[6]&&toast(sp[6],6200);setTimeout(()=>{if(!modal)ia(id);},900);}
function p6LabUse(e){const k=e.id.slice(3),S=p6S();if(C3.cut||C3.task)return!0;
  if(k==="lbench"){p6BenchOpen();return!0;}
  if(k==="lbp"){p6BlueprintShow();return!0;}
  if(k==="ltv"){p6TvOpen();return!0;}
  if(k==="ldoor"){$sx("click");toast("Back into the pitch black? No. Everything you need is in here.",2400);return!0;}
  const sp=P6_LSPOT.find((q)=>q[0]===k);if(!sp)return!0;
  if(S.found[k]){toast("Already searched. Nothing else useful.",1600);return!0;}
  if(k==="gland"){if(!inv.includes("pcrow")){$sx("locked");toast("The tube is thick, tough glass. You'd need something to smash it with.",2800);return!0;}
    c3Task("chop",615,sp[4],()=>{shake=Math.max(shake,10);$sx("crash");$sx("debris");P6L.scare=14;P6L.flash=0.25;const tb=P6_TUBES.find((t)=>t.st==="dead");tb&&(tb.st="broken");p6LabGot(["gland",615,"","vgland",0,"","<b>SPECIMEN 04.</b> The glass bursts. The thing inside was dead long before you came. But the gland on its back is still glowing, and still warm."]);},"#8aff6a");return!0;}
  if(k==="power"&&!inv.includes("vkey")){$sx("locked");toast("<b>ACCESS DENIED.</b> The card reader blinks red: <i>POWER STORE: SWIPE A KEYCARD</i>.",3400);return!0;}
  c3Task("gather",sp[1],sp[4],()=>p6LabGot(sp),sp[5]);return!0;}
function p6LabCounts(){const S=p6S(),have=(i)=>inv.includes(i)||S.made[i]||p6Used(i);return{raw:P6_RAW.filter(have).length,tapes:P6_TAPES.filter((t)=>inv.includes(t)||(S.tapes||[]).indexOf(t)>=0).length};}
/* an item counts as "had" once it has been built into something */
function p6Used(i){const M=p6S().made;return({vpipe:M.vchamber,vgauge:M.vchamber,vseal:M.vchamber,vsyr:M.vinj,vcoil:M.vinj,vamp:M.vinj,vgland:M.vcat,vcell:M.vcat})[i];}
function p6LabGuide(){const S=p6S(),M=S.made,tk=(b)=>b?"&#10004; ":"&#9744; ",c=p6LabCounts();
  if(S.up)return p6Q("<b>"+items[S.up].n+" built.</b><br>"+(S.test?"Calibration done.":"Test it on the range at the far RIGHT of the lab."));
  if(M.vupcore)return p6Q("<b>The Upgrade Core is ready.</b><br>Take it to the <b>clean workbench</b> and choose your new weapon.");
  if(!S.dis)return p6Q("<b>The second chamber.</b><br>"+tk(0)+"Take the <b>Venom Blaster</b> apart on the <b>clean workbench</b> (far LEFT)<br>&#9679; Look around: find <b>parts</b>, and <b>VHS tapes</b>");
  return p6Q("<b>Build an Upgrade Core.</b><br>"+tk(M.vchamber)+"Pressure Chamber (3 parts)<br>"+tk(M.vinj)+"Injector Core (3 parts)<br>"+tk(M.vreactor)+"Venom Reactor (chamber + injector)<br>"+tk(M.vcat)+"Catalyst Cell (2 parts)<br>"+tk(0)+"Upgrade Core (reactor + catalyst)<br>&#9679; Parts found: "+c.raw+"/8 &middot; Tapes: "+c.tapes+"/6<br>Search the lab. Combine parts at the bench.");}
function p6LabArrow(){const S=p6S();if(C3.cut||C3.task||modal)return;if(!S.dis||S.up&&S.test||S.made.vupcore&&!S.up){return p6Arrow(150);}
  let best=null,bd=1e9;for(const sp of P6_LSPOT){if(S.found[sp[0]])continue;if(sp[3].slice(0,3)==="vhs")continue;const d=Math.abs(sp[1]-player.x);if(d<bd){bd=d;best=sp[1];}}
  if(!best){const tb=p6LabCounts();return p6Arrow(S.up?1330:150);}p6Arrow(best);}
/* ---------------- the blueprint ---------------- */
function p6Info(title,html,btn){p6Css();const el=c5Overlay("#p6Tool",'<div class="gcard c4card"><h3>'+title+'</h3><div class="p6msg" style="font-size:8px;line-height:1.9">'+html+'</div><div class="btns"><button class="gbtn" id="p6toolOk">'+(btn||"CLOSE")+"</button></div></div>");modal=4;el.hidden=!1;qs("#p6toolOk").onclick=()=>{el.hidden=!0;modal=0;updateGuide();};setTimeout(()=>{const b=qs("#p6toolOk");b&&b.focus();},30);$sx("card");}
function p6BlueprintShow(){p6Info("THE UPGRADE BLUEPRINT","A blueprint pinned over the bench, drawn in blue ink:<br><br><b>UPGRADE CORE</b> = <b>VENOM REACTOR</b> + <b>CATALYST CELL</b><br><br>&bull; <b>VENOM REACTOR</b> = <b>PRESSURE CHAMBER</b> + <b>INJECTOR CORE</b><br>&bull; <b>PRESSURE CHAMBER</b> = pipe + gauge + gasket<br>&bull; <b>INJECTOR CORE</b> = needles + coil + glass vial<br>&bull; <b>CATALYST CELL</b> = a living gland + a power cell<br><br>Then fit the core to the <b>old barrel, grip and canister</b> and pick a weapon. Scribbled at the bottom: <i>\"parts are all over the second chamber. Don't forget the powered locker needs a card.\"</i>");}
/* ---------------- first visit ---------------- */
function p6CutLab(c){const t=c.t,S=p6S();p6LabTick();p6LabLights();c.cx=null;
  if(t===1){player.x=60;player.y=C2_FLOOR;player.face=1;P6L.flash=1;}
  if(t===2){$sx("door");tnCap("Light! After so much darkness it hurts my eyes…");}
  if(t===200){$sx("stinger");tnCap("The second chamber. Rows and rows of glass tubes, and something is floating in every one of them.");}
  if(t===440)tnCap("Those are Evolved. Different ones: extra arms, extra eyes, wings. Somebody was BUILDING them.");
  if(t===680)tnCap("And by the door, a clean workbench. Spotless. My blaster is still jammed, but with the right tools…");
  if(t===880)tnCap("Time to take it apart, and build something better. I'll need parts. This place looks like it has everything.");
  if(t>=1100){tnCap("");c.cx=null;S.lab=1;c3CutEnd();c2Save("slab");updateGuide();toast("<b>THE SECOND CHAMBER</b><br>Use the <b>clean workbench</b> on the LEFT to take the blaster apart. Then search the lab for parts.",6200);}}
{const _c=c5Cut;c5Cut=function(c){if(c.k==="c5p6lab")return p6CutLab(c);return _c(c);};}
{const _s=c5Skip;c5Skip=function(c){if(c.k==="c5p6lab"){c.t=Math.max(c.t,1099);return;}return _s(c);};}
/* ---------------- plumbing ---------------- */
{const _s=c7Step;c7Step=function(){if(room==="slab"){C5.t++;p6LabStep();return;}return _s();};}
{const _u=c7Use;c7Use=function(e){if(room==="slab")return p6LabUse(e);return _u(e);};}
{const _e=c7Enter;c7Enter=function(t){if(t!=="slab")return _e(t);const S=p6S();C3.lie=0;C7G=null;C5GN=null;C5PR=null;C5TR=null;C5CK=null;P6.hide=0;S.from="";P6L.flash=0;
  player.y=C2_FLOOR;player.face=1;player.x=S.lab?(S.up&&S.test?1300:70):60;camX=c3Clamp(player.x-96,0,P6_LW-192);
  if(!S.lab){c2Save("slab");c3CutStart("c5p6lab");}updateGuide();};}
{const _b=c7Back;c7Back=function(){if(room==="slab")return p6LabBack();return _b();};}
{const _f=c7Front;c7Front=function(){if(room==="slab")return p6LabFront();return _f();};}
{const _t=c7Tint;c7Tint=function(){if(room==="slab")return p6LabTint();return _t();};}
{const _w=c7Walls;c7Walls=function(){if(room==="slab"){if(player.x<14)player.x=14;if(player.x>P6_LW-10)player.x=P6_LW-10;return!0;}return _w();};}
{const _g=c7Guide;c7Guide=function(){if(room==="slab")return p6LabGuide();return _g();};}
{const _a=c7Arrow;c7Arrow=function(){if(room==="slab")return p6LabArrow();return _a();};}
{const _x=c5Esc;c5Esc=function(){for(const [id,fn] of [["#p6Bench",()=>p6BenchClose()],["#p6Tv",()=>p6TvClose()],["#p6Pick",()=>p6PickClose()],["#p6Tool",()=>{const e=qs("#p6Tool");e.hidden=!0;modal=0;updateGuide();}]]){const e=qs(id);if(e&&!e.hidden){fn();return!0;}}return _x();};}
{const _x=c5CloseAll;c5CloseAll=function(){for(const id of ["#p6Bench","#p6Tv","#p6Pick","#p6Tool","#p6End"]){const e=qs(id);if(e&&!e.hidden){e.hidden=!0;e.__stop&&e.__stop();}}return _x();};}
