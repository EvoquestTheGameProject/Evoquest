
/* ---------------- port cutscenes ---------------- */
function c4EndCard(){const P=c4P();P.done=1;c2Save("port");fadeTo=1;onFaded=()=>{C3.cut=null;C3.lie=0;C4.bp=null;tnBars(0);tnCap("");qs("#cskip").hidden=!0;won=0;updateGuide();fadeNow=1;fadeTo=1;c5Summary();};}
function c4CutPort(c){const k=c.k;if(k==="c4parr")return c4CutParr(c);if(k==="c4board")return c4CutBoard(c);if(k==="c4left")return c4CutLeft(c);c3CutEnd();}
function c4SkipPort(c){const k=c.k;
  if(k==="c4parr"){C4.ship.x=0;c.t=Math.max(c.t,899);return;}
  if(k==="c4board"){c.fin=1;return;}}
function c4CutParr(c){const t=c.t,P=c4P();c.x0==null&&(c.x0=camX);
  c.cx=t<8?c.x0:t<200?c.x0+(0-c.x0)*c3Ez((t-8)/192):0;
  if(t===2)tnCap("The old bridge port… and there, across all that water: the Ridge Tower!");
  if(t===220)tnCap("It's SO far. A stream that long and wide… I'd never swim it.");
  if(t===330){$sx("rumble");shake=5;tnCap("A ship?! …The LAST ship!");}
  if(t>=330&&t<570){C4.ship.x=320*(1-c3Ez((t-330)/240));t%45===0&&$sx("whoosh");}
  if(t===570){C4.ship.x=0;$sx("land");shake=7;}
  if(t===590){$sx("radio");tnCap("[ LOUDSPEAKER ]  “Final sailing for Ridge Tower. Departing in two minutes.”");}
  if(t===760)tnCap("But the gate is wrapped in barbed wire… I have to get through. FAST.");
  if(t>=900){tnCap("");C4.ship.x=0;P.arr=1;P.t=C4_PTIME;c3CutEnd();c4CP("port","The bridge port");updateGuide();$sx("stinger");
    toast("<b>THE SHIP LEAVES IN 2:00!</b><br>1. Try the gate. 2. Pull <b>3 loose metal pieces</b> off the containers, find a <b>screw</b> and a <b>nail</b>. 3. Build a <b>crowbar</b> at the rusty motor. 4. Pry the gate open.",7000);}}
function c4CutBoard(c){const t=c.t,P=c4P();c.cx=0;
  C4.gopen=c3Ez(Math.min(1,t/70));
  if(c.fin&&!c.done){c.done=1;C3.lie=1;C4.ship.x=-400;C4.bp={x:-300,y:62,face:-1,fr:0,pose:"idle"};tnCap("");c4EndCard();return;}
  if(c.done)return;
  if(t===2){$sx("snap");shake=10;tnCap("The wire's off… it's OPEN! Go go GO!");}if(t===22)$sx("clank");if(t===44)$sx("creak");
  if(t>=60&&!c.up){if(c3Walk(126,1.9)){c.up=t;C3.lie=1;C4.bp={x:126,y:C2_FLOOR,face:-1,fr:0,pose:"walk",sc:1};tnCap("");}}
  if(c.up){const k=t-c.up,bp=C4.bp;
    /* the ship is far across the water: as you climb the gangway toward it you shrink with distance */
    if(k<70){const u=k/70;bp.x=126-22*u;bp.y=C2_FLOOR-30*u;bp.fr=(k>>2)&7;bp.pose="walk";bp.sc=1-0.58*u;}
    else if(k<115){const u=(k-70)/45;bp.x=104-18*u;bp.y=62;bp.fr=(k>>2)&7;bp.pose="walk";bp.sc=0.42;}
    else{bp.pose="idle";bp.fr=(k>>5)&1;bp.sc=0.42;}
    if(k===122){$sx("siren");tnCap("Made it aboard! And the engines are starting!");}
    if(k>=140){const u=Math.min(1,(k-140)/420);C4.ship.x=-330*Math.pow(u,1.7);k%48===0&&$sx("rumble");}
    if(k>=115)bp.x=86+C4.ship.x;
    if(k===230)tnCap("Goodbye, broken bridge.");
    if(k===360)tnCap("Ridge Tower… I'm coming.");
    if(k>=600){c.done=1;tnCap("");c4EndCard();}}}
function c4CutLeft(c){const t=c.t;c.cx=0;
  if(t===2){$sx("siren");tnCap("The ship's horn…! It's LEAVING?!");}
  C4.ship.x=-330*Math.pow(Math.min(1,t/330),1.7);t%45===0&&$sx("rumble");
  if(t===70)tnCap("NO! WAIT!!");
  if(t===220)tnCap("…It's gone.");
  if(t>=340){tnCap("");c3CutEnd();c4Die("ship");}}

/* ---------------- port drawing: the ship ---------------- */
function c4Ship(){const sx=C4.ship.x;if(sx<-420||sx>400)return;
  ctx.save();ctx.translate(Math.round(sx),0);const F=fill,W=86,D=62;
  /* moored lines + gangway first (behind the player) */
  const docked=Math.abs(sx)<3&&!(C3.cut&&C3.cut.k==="c4left");
  /* hull: dark topsides, red underbody, white boot-top, rust streaks and portholes */
  ctx.fillStyle="#1a1c20";ctx.beginPath();ctx.moveTo(-66,D-3);ctx.lineTo(128,D);ctx.lineTo(126,W+1);ctx.lineTo(-40,W+1);ctx.fill();
  ctx.fillStyle="#323c48";ctx.beginPath();ctx.moveTo(-64,D-2);ctx.lineTo(127,D+1);ctx.lineTo(126,W-9);ctx.lineTo(-46,W-9);ctx.fill();
  ctx.fillStyle="#46546a";ctx.fillRect(-60,D,186,1.2);
  ctx.fillStyle="#8a2a22";ctx.beginPath();ctx.moveTo(-46,W-9);ctx.lineTo(126,W-9);ctx.lineTo(126,W+1);ctx.lineTo(-40,W+1);ctx.fill();F("#d8d4c8",-45,W-9.6,171,0.8);
  for(let q=0;q<26;q++){F("rgba(120,56,20,.45)",-50+r(q,1801)*170,D+1,1,4+r(q,1802)*10);}
  for(let q=0;q<30;q++)F("rgba(0,0,0,.2)",-30+q*5.3,D+10,0.8,6);
  for(let q=0;q<28;q++){F("#0e1014",-48+q*6.4,D+6,2.2,2.2);F("rgba(255,220,140,.5)",-48+q*6.4,D+6,2.2,0.8);}
  text("RIDGE LINK 7",-34,D+12.5,"#e8e4d8",'3px "Press Start 2P",monospace');
  /* deck edge + rail */
  F("#5a5c60",-62,D-3,190,1.4);for(let q=-60;q<126;q+=6)F("#6a6c70",q,D-6,0.8,4);F("#8a8c90",-62,D-6.4,190,0.8);
  /* container stacks on deck */
  const cs=[[-52,3],[-34,3],[-16,2],[2,3],[20,2],[38,3]];
  cs.forEach(([x,h],i)=>{for(let q=0;q<h;q++){const col=C4_COL[(i*2+q*3)%7][1],y=D-3-(q+1)*9;F("#101010",x-0.5,y-0.5,18,9.8);F(col,x,y,17,9);for(let b=0;b<17;b+=2)F("rgba(0,0,0,.2)",x+b,y+1,0.8,7);F("rgba(255,255,255,.2)",x,y,17,1);F("rgba(120,56,20,.4)",x+3+(i+q)%6,y+2,3,1.5);}});
  /* accommodation block, bridge deck, mast, funnel */
  F("#2a2e34",96,D-34,14,30);F("#c8342a",96,D-22,14,3);F("#1a1c20",96,D-34,14,2);
  F("#9a9a92",64,D-38,50,38);F("#d8d6ca",64,D-38,48,36);F("#b8b6aa",64,D-38,4,38);F("#8a887e",110,D-38,4,38);F("#e8e6da",64,D-38,48,1.4);
  for(let fl=0;fl<4;fl++)for(let q=0;q<8;q++){const lit=(q*3+fl*5)%7<3;F("#1a2430",68+q*5.4,D-34+fl*8,3.6,4);lit&&F("#ffd878",68+q*5.4,D-33+fl*8,3.6,2.4);F("rgba(255,255,255,.3)",68+q*5.4,D-34+fl*8,3.6,0.8);}
  F("#c8c6ba",60,D-48,58,10);F("#1a2430",62,D-46,54,5);F("rgba(160,210,230,.55)",62,D-46,54,1.4);F("#8a887e",60,D-39,58,1.4);F("#e8e6da",58,D-49,62,1.8);
  F("#5a5c60",88,D-66,1.6,17);F("#8a8c90",81,D-60,15,1);F("#8a8c90",84,D-55,9,1);ctx.fillStyle="#c8c8c0";ctx.beginPath();ctx.ellipse(89,D-67,6,1.4,0,0,7);ctx.fill();
  (tick>>4)%2?(F("#ff3a2a",88.4,D-69,2.4,2.4),glow(89.6,D-68,7,"255,60,40",0.5)):F("#ffffff",88.4,D-69,2.4,2.4);F("#ffe070",116,D-47,2,2);ctx.drawImage(c6ShipGrime(),-66,D-70,194,95);
  /* smoke from the funnel */
  for(let q=0;q<10;q++){const a=((tick*0.6+q*13)%100)/100;ctx.globalAlpha=0.38*(1-a);F(q%2?"#3a3836":"#5a5652",101-a*46+Math.sin(tick/20+q)*2,D-38-a*34,3+a*9,2.4+a*6);ctx.globalAlpha=1;}
  /* gangway + ropes when tied up */
  if(docked||(C3.cut&&C3.cut.k==="c4board"&&sx>-4)){ctx.strokeStyle="#2a2018";ctx.lineWidth=5.4;ctx.beginPath();ctx.moveTo(105,D+1);ctx.lineTo(128,W+5);ctx.stroke();ctx.strokeStyle="#7a6a50";ctx.lineWidth=3.6;ctx.beginPath();ctx.moveTo(105,D);ctx.lineTo(128,W+4);ctx.stroke();
    ctx.strokeStyle="#2a2a2a";ctx.lineWidth=0.8;for(let q=0;q<7;q++){const u=q/6;ctx.beginPath();ctx.moveTo(105+22*u,D-2+30*u);ctx.lineTo(105+22*u,D-11+30*u);ctx.stroke();}
    ctx.beginPath();ctx.moveTo(105,D-11);ctx.lineTo(127,W-6);ctx.stroke();
    ctx.strokeStyle="#3a2a18";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(122,D+8);ctx.quadraticCurveTo(130,W-4,136,W+2);ctx.stroke();}
  /* water over the lower hull: foam and ripples */
  ctx.fillStyle="rgba(74,114,132,.78)";ctx.fillRect(-70,W-4,210,6);
  for(let q=0;q<46;q++){const x=-68+((q*5+tick*0.7)%206);ctx.globalAlpha=0.7;F(q%3?"#cfe0e0":"#ffffff",x,W-3.4+Math.sin(tick/9+q)*0.8,2+q%4,0.8);ctx.globalAlpha=1;}
  if(sx<-4){for(let q=0;q<26;q++){const x=130+q*4-Math.min(60,-sx*0.2),y=W-2+Math.sin(q+tick/5)*1.2;ctx.globalAlpha=0.7*(1-q/26);F("#ffffff",x,y,3,1);ctx.globalAlpha=1;}}
  ctx.restore();}
/* the shimmering stream, and the Ridge Tower's beacon on the far ridge */
function c4PortBack(){
  for(let n=0;n<44;n++){const x=camX+((n*37+tick*0.28*(1+(n%3)*0.2))%200)-4,y=76+((n*11)%13);ctx.globalAlpha=0.45;fill("#e8f0ee",x,y,2+n%3,0.5);ctx.globalAlpha=1;}
  c4Ship();
  const bx=66,by=21;if((tick%100)<16){glow(bx,by,12,"255,60,40",0.7);fill("#ff5a4a",bx-1,by-1,2,2);}else fill("#8a2a22",bx-1,by-1,2,2);}
/* ---------------- port drawing: the yard ---------------- */
function c4PortBoxes(){const P=c4P();if(!P.cols.length)return;
  C4_PX.forEach((x,i)=>{c4BoxArt(x,C2_FLOOR,P.cols[i],"x",i);
    const q=P.loose.find((l)=>l.i===i);if(!q)return;const x0=x-17,y0=C2_FLOOR-18;
    if(!P.yk[i]){/* a peeling, rust-eaten corner flaps and glints: the tell for loose metal */
      const fl=Math.sin(tick/11+i)*1.2;ctx.fillStyle="#6a5a46";ctx.beginPath();ctx.moveTo(x0+23,y0+2);ctx.lineTo(x0+33+fl,y0+1);ctx.lineTo(x0+34+fl,y0+8);ctx.lineTo(x0+23,y0+9);ctx.fill();
      ctx.fillStyle="#9a9a92";ctx.beginPath();ctx.moveTo(x0+23,y0+2);ctx.lineTo(x0+32+fl,y0+1.4);ctx.lineTo(x0+32.5+fl,y0+3);ctx.lineTo(x0+23,y0+4);ctx.fill();F4("#8a4a22",x0+25,y0+5,5,1);
      (tick+i*23)%80<8&&(glow(x0+28,y0+3,6,"255,248,210",0.5),fill("#ffffff",x0+28+fl*0.5,y0+2,1,1));}
    else{fill("#0e0c0a",x0+23,y0+2,10,7);fill("#8a4a22",x0+23,y0+8,10,1);fill("#c8c0b0",x0+23,y0+2,10,0.6);}});}
function F4(c,x,y,w,h){fill(c,x,y,w,h);}
function c4PortMotor(){const x=C4_MOTOR,g=C2_FLOOR,P=c4P();
  fill("rgba(0,0,0,.35)",x-24,g,48,1.6);
  fill("#2a2420",x-18,g-6,6,6);fill("#2a2420",x+12,g-6,6,6);fill("#3a3028",x-20,g-8,40,3);
  fill("#1e1410",x-20,g-26,40,18);fill("#7a4a2a",x-19,g-25,38,16);fill("#a8683a",x-19,g-25,38,2);fill("#5a3418",x-19,g-11,38,2);
  for(let q=0;q<9;q++){fill("#5a3418",x-16+q*4,g-23,1,12);fill("#b87848",x-15+q*4,g-23,0.6,12);}
  fill("#6a3e20",x-23,g-23,5,14);fill("#6a3e20",x+18,g-23,5,14);fill("#2a2a2e",x+23,g-19,6,3);fill("#6a6a70",x+23,g-19,6,1);
  fill("#8a4a24",x-8,g-30,12,5);fill("#d8d8d0",x-5,g-28.6,2,1.6);
  for(let q=0;q<22;q++)fill(r(q,1811)<0.5?"#c8662a":"#3a2010",x-18+r(q,1812)*36,g-24+r(q,1813)*14,1+r(q,1814)*3,0.8);
  /* the wooden board across the top: the makeshift bench, with a vise and tools */
  fill("#3a2616",x-22,g-30,44,3);fill("#8a6038",x-22,g-31,44,2);fill("#5a3a22",x-22,g-29,44,0.8);
  fill("#4a4c50",x+12,g-37,8,6);fill("#8a8c90",x+12,g-37,8,1.4);fill("#2a2a2c",x+19,g-36,3,4);
  fill("#7a5a3a",x-16,g-35,1.5,5);fill("#8a8c90",x-18,g-36,5,2);/* hammer */
  fill("#c8342a",x-8,g-32,7,1.6);fill("#8a8c90",x-1,g-32,5,1.2);/* pliers */
  if(P.crow){ctx.save();ctx.translate(x+4,g-31.6);ctx.rotate(-0.06);fill("#4a5560",-11,0,22,1.6);fill("#8a98a6",-11,0,22,0.5);fill("#4a5560",-11,-2.6,1.6,3);ctx.restore();}
  else if(P.arr&&c4PMetal()>=3&&P.screw&&P.nail){const a=0.4+0.4*Math.sin(tick/8);glow(x,g-34,14,"255,240,170",0.3*a);}}
function c4PortProps(){const g=C2_FLOOR;
  /* screw on a rusty offcut, nail in a pallet */
  const P=c4P();
  if(!P.screw){const x=C4_PSCREW;fill("#4a3a2a",x-6,g-3,12,3);fill("#6a4a30",x-6,g-3,12,0.8);for(let q=0;q<3;q++)fill("#8a4a22",x-4+q*4,g-2,2,1);
    fill("#1a1a1c",x-2,g-9,5,3);fill("#c8ced6",x-1.5,g-8.5,4,2.2);fill("#4a525a",x,g-8.5,0.6,2.2);fill("#9aa2ae",x-0.6,g-6.4,2.2,3.4);for(let q=0;q<3;q++)fill("#5a626a",x-0.6,g-6+q*1.2,2.2,0.5);
    (tick%90)<10&&glow(x,g-8,6,"255,248,210",0.5);}
  {const x=C4_PNAIL;fill("rgba(0,0,0,.3)",x-14,g,28,1);for(let q=0;q<3;q++){fill("#6a4a2a",x-13,g-6+q*2.4,26,1.8);fill("#8a6038",x-13,g-6+q*2.4,26,0.6);}fill("#3a2616",x-12,g-6,2,6);fill("#3a2616",x+10,g-6,2,6);
    if(!P.nail){fill("#2a2a2c",x-1.4,g-12,3.6,1.4);fill("#6a6a70",x-0.4,g-11,1,5.5);(tick%100)<10&&glow(x,g-11,5,"255,248,210",0.4);}}
  /* oil drums, tyres, a toppled barrier, weeds, cones, signs */
  [[420,"drum"],[470,"tyre"],[560,"drum"],[640,"cone"],[720,"drum"],[800,"tyre"],[850,"drum"],[222,"cone"],[348,"cone"]].forEach(([x,k])=>{if(k==="drum"){fill("rgba(0,0,0,.3)",x-4,g,9,1);fill("#1a1a1a",x-4,g-11,9,11);fill(x%3?"#3a6a8a":"#8a3a22",x-3.5,g-10.5,8,10);fill("rgba(255,255,255,.2)",x-3.5,g-10.5,2,10);fill("#1a1a1a",x-3.5,g-7,8,0.8);fill("#1a1a1a",x-3.5,g-3.5,8,0.8);fill("rgba(120,56,20,.5)",x-1,g-9,2,6);}
    else if(k==="tyre"){fill("#101010",x-5,g-4,10,4);fill("#2a2a2a",x-4,g-4,8,1);fill("#4a4a4a",x-2,g-3,4,1);}else c3Cone(x);});
  for(let q=0;q<20;q++){const x=170+q*37,h=3+(q%3)*2;fill(q%2?"#4a6a2a":"#5a7a30",x,g-h,1,h);fill(q%2?"#4a6a2a":"#5a7a30",x+1,g-h*0.7,1,h*0.7);}}
/* the barbed-wire gate */
function c4PortGate(){const P=c4P(),x=C4_GATE,g=C2_FLOOR,k=C4.gopen||0,open=P.open||k>0;
  fill("rgba(0,0,0,.35)",x-9,g,20,1.4);
  /* concrete posts + a rusted sign */
  [x-8,x+10].forEach((px)=>{fill("#3a3c3e",px,g-52,4,52);fill("#7a7c7e",px,g-52,1,52);fill("#5a5c5e",px-1,g-53,6,2);for(let q=0;q<5;q++)fill("rgba(120,56,20,.4)",px,g-48+q*9,3,1);});
  if(!(open&&k>0.99)){const w=Math.max(0.5,(1-k)*16),gx=x-4;ctx.globalAlpha=1-k*0.5;
    for(let y=0;y<46;y+=3)for(let q=0;q<w;q+=3){fill("#7a7c7e",gx+q+(y/3%2)*1.5,g-47+y,0.8,3);}fill("#4a4c4e",gx,g-47,w,1.4);fill("#4a4c4e",gx,g-3,w,1.4);fill("#4a4c4e",gx,g-25,w,1);ctx.globalAlpha=1;
    /* wire tangles: 3 big coils, one removed per good pull */
    const left=3-(C4.gate?C4.gate.hits:P.hits);for(let c=0;c<left&&k<0.3;c++){const cy=g-38+c*13;ctx.strokeStyle="#262626";ctx.lineWidth=1.2;ctx.beginPath();for(let s=0;s<9;s++)ctx.ellipse(x-3+s*1.6-3,cy,5,4.2,0.3,s*0.8,s*0.8+4.2);ctx.stroke();
      for(let s=0;s<7;s++)fill("#d8d8d0",x-9+s*3,cy+((s%2)?-3:3),1,1);ctx.strokeStyle="#8a8a84";ctx.lineWidth=0.6;ctx.beginPath();ctx.moveTo(x-9,cy-4);ctx.lineTo(x+9,cy+4);ctx.moveTo(x-9,cy+4);ctx.lineTo(x+9,cy-4);ctx.stroke();}
    if(left>0&&k<0.3){for(let q=0;q<5;q++)fill("#8a8a84",x-6+q*3,g-26+((q*5)%3),2,1.4);fill("#1a1a18",x-2,g-28,6,6);fill("#c8a030",x-1.4,g-27.4,5,5);fill("#1a1208",x+0.4,g-25.6,1.2,2.4);}
    if(P.open===0&&!C4.gate&&P.crow){const a=0.5+0.5*Math.sin(tick/8);glow(x+2,g-24,14,"255,240,170",0.25*a);}}
  fill("#c8b040",x-26,g-30,18,9);fill("#8a5a2a",x-26,g-22,18,1.4);fill("#2a2410",x-24,g-28,14,0.8);fill("#2a2410",x-24,g-25.5,10,0.8);fill("#5a5c5e",x-18,g-21,1.4,21);}
function c4PortDraw(){c4PortProps();c4PortMotor();c4PortBoxes();c4PortGate();
  /* a collapsed crane arm leaning over the back of the yard */
  const cx=600;fill("#4a4a48",cx,C2_FLOOR-46,3,46);ctx.strokeStyle="#4a4a48";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx+1,C2_FLOOR-46);ctx.lineTo(cx+56,C2_FLOOR-30);ctx.lineTo(cx+90,C2_FLOOR-4);ctx.stroke();ctx.lineWidth=0.7;for(let q=0;q<7;q++){ctx.beginPath();ctx.moveTo(cx+1+q*8,C2_FLOOR-46+q*2.4);ctx.lineTo(cx+9+q*8,C2_FLOOR-44+q*2.5);ctx.stroke();}}
function c4PortFront(){const P=c4P(),g=C2_FLOOR;
  if(C4.yank){const y=C4.yank,x=C4_PX[y.i],gx=x-16,gy=g-24;fill("#04060a",gx-1,gy-1,34,8);fill("#2a3440",gx,gy,32,6);fill(y.v>0.7?"#7aff8a":y.v>0.35?"#ffd23a":"#ff7a3a",gx,gy,32*y.v,6);fill("rgba(255,255,255,.3)",gx,gy,32*y.v,1.4);
    text("PULL!",gx+6+(y.jit?Math.random()-0.5:0),gy-8,"#ffe070",'4px "Press Start 2P",monospace');}
  if(C4.gate){const G=C4.gate,gx=player.x-20,gy=player.y-60,W=40;fill("#04060a",gx-1,gy-1,W+2,9);fill("#2a3440",gx,gy,W,7);
    fill("#2a8a3a",gx+(G.zone-G.w/2)*W,gy,G.w*W,7);fill("#7aff8a",gx+(G.zone-G.w/2)*W,gy,G.w*W,1);
    const mx=gx+G.x*W-2.5;fill("#04060a",mx-1,gy-1,7,9);fill(Math.abs(G.x-G.zone)<G.w/2?"#aaffaa":"#ffe070",mx,gy,5,7);fill("#fff",mx,gy,5,1);
    for(let q=0;q<3;q++)fill(q<G.hits?"#7aff8a":"#2a3440",gx+W/2-9+q*7,gy+10,5,3);}
  /* the boarded player is drawn by hand (the real one is hidden), riding the ship */
  if(C4.bp&&C3.cut&&C3.cut.k==="c4board"){const b=C4.bp;Ma(b.x,b.y,playerLook,0,b.face,{s:Po*(b.sc||1),noshd:1,pose:c3Pose(b.pose,b.fr),env:De.port});}}
/* ---------------- port HUD bits ---------------- */
function c4PortHud(){const P=c4P();if(room!=="port"||!P.arr||P.open||P.done)return;const F='4px "Press Start 2P",monospace';
  const y=99,slot=(x,k,on)=>{fill("#04030bcc",x,y-1,12,8);c4Mini(k,x+2,y);!on&&fill("rgba(0,0,0,.55)",x,y-1,12,8);on&&fill("#7aff8a",x,y+6.4,12,0.8);};
  [["strip",P.metal.strip||P.crow],["hook",P.metal.hook||P.crow],["plate",P.metal.plate||P.crow]].forEach((q,i)=>slot(46+i*14,q[0],q[1]));
  slot(92,"screw",P.screw||P.crow);slot(106,"nail",P.nail||P.crow);slot(122,"crow",P.crow);}
/* ---------------- backdrop painting: the stream, the far ridge, the quay ---------------- */
function c4PaintWide(t,i){const R=(k,a)=>r(k,a+i*23);
  t.poly([[0,138],[50,130],[120,125],[190,133],[250,127],[320,131],[384,137],[384,152],[0,152]],(x,y)=>Et(x,y)<0.5?[86,100,72]:[98,112,82]);
  for(let k=0;k<46;k++){const x=384*R(k,500),yb=134+R(k,501)*14,sc=0.7+R(k,502)*0.6;if(R(k,503)<0.15){t.rect(x,yb-5,1,5,[70,66,60]);continue;}t.rect(x,yb-2,1,2,[50,40,30]);c6Ball(t,x,yb-2-3*sc,2.4+2*sc,[[52,66,48],[64,80,54],[78,94,62],[96,112,74],[120,134,90]],560+k+i*50);}
  t.rect(0,150,384,1,"#a8b8b0");
  t.grad(151,184,["#9ab0b4","#6a8e98","#486c7c","#385a6a"]);
  for(let k=0;k<120;k++){const y=152+R(k,504)*30,L=2+R(k,505)*8*((y-150)/30);t.rect(384*R(k,506),y,L,1,R(k,507)<0.5?"#d8e8e8":"#c4d8da",0.55);}
  for(let k=0;k<40;k++)t.rect(384*R(k,508),154+R(k,509)*26,1+R(k,510)*4,1,"#2e4a58",0.5);}
function c4PaintQuay(t,i){const R=(k,a)=>r(k,a+i*29);
  t.rect(0,182,384,3,"#5a5c5a");t.rect(0,182,384,1,"#8a8c88");t.rect(0,184,384,1,"#2a2c2a");
  t.grad(185,216,["#6a6c6a","#585a58","#44484a"]);
  for(let x=(i*37)%64;x<384;x+=64)t.rect(x,185,1,31,"#34383a");for(let y=198;y<216;y+=14)t.rect(0,y,384,1,"#000000",0.25);
  for(let k=0;k<260;k++)t.rect(384*R(k,520),186+30*R(k,521),1+(R(k,522)*3|0),1,R(k,523)<0.5?"#4a4e50":"#7a7e7c",0.8);
  for(let k=0;k<6;k++){const cx=384*R(k,524),cy=192+20*R(k,525),w=10+R(k,526)*22;for(let y=-1;y<=1;y++)t.rect(cx-w/2+Math.abs(y)*2,cy+y,w-Math.abs(y)*4,1,"#141618",0.5);}/* oil stains */
  const crack=(x,y,L)=>{for(let s=0;s<L;s++){t.rect(x,y,1,1,"#16181a");x+=1;y+=R(s+x,527)<0.3?-1:R(s+x,527)>0.7?1:0;y=Math.max(186,Math.min(214,y));if(R(s,x+528)<0.04)t.rect(x,y-1,1,2,[60,120,54]);}};
  for(let k=0;k<5;k++)crack(384*R(k,529),188+24*R(k,530),30+(R(k,531)*50|0));
  for(let k=0;k<30;k++){const x=384*R(k,532),h=2+R(k,533)*5;for(let y=0;y<h;y++)t.rect(x,186-y+(R(k,534)<0.5?2:0),1,1,[[70,150,60],[40,110,50]][k%2]);}
  for(let x=(i*53)%96;x<384;x+=96)t.rect(x,196,34,2,"#e6c83c",0.6);
  for(let b=0;b<2;b++){const bx=40+R(b,535)*300;t.rect(bx,176,6,8,"#2a2c2e");t.rect(bx,176,6,1,"#6a6c6e");t.rect(bx+1,174,4,3,"#2a2c2e");}}
function c4PaintTower(t){const x=130,base=134,top=44;
  t.poly([[60,base],[110,126],[150,124],[210,132],[250,base+8],[60,base+8]],(px,py)=>Et(px,py)<0.5?[76,90,66]:[90,104,76]);
  for(let y=top;y<base;y++){const w=1+(11*(y-top))/(base-top);t.rect(x-w,y,1,1,"#2e3a3a");t.rect(x+w,y,1,1,"#2e3a3a");y%8===0&&t.rect(x-w,y,w*2+1,1,"#2e3a3a");y%16===0&&t.line(x-w,y,x+w,y+8,"#2e3a3a");y%16===8&&t.line(x+w,y,x-w,y+8,"#2e3a3a");}
  t.rect(x,top-10,1,11,"#2e3a3a");t.rect(x-5,top+4,11,1,"#2e3a3a");t.rect(x-3,top+9,7,1,"#2e3a3a");t.rect(x-9,base,19,3,"#2a3434");
  t.rect(x-26,base-4,52,3,"#9ab0aa",0.18);}
