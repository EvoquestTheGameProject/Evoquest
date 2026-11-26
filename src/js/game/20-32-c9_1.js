/* ======================= CHAPTER 3, PART 3: THE DEAD SATELLITES, THE TRAPDOOR, THE HIDDEN LAB =======================
   After the generator is fixed, the transmitter finds every satellite destroyed 30 minutes ago. A metal edge pokes out
   from under the rug: a trapdoor down to a hidden lab, where an archive plays (in the opening cutscene's own style). */
var C9={panel:0,pt:0,doc:0,look0:null};
var C9_RUG=150,C9_LW=320;
function c9Rooms(){if(C2.tlab)return;
  C2.tlab={name:"THE HIDDEN LAB",L:null,R:null,W:C9_LW,cars:[],seeds:[111,112],c3:1,c4:1,c5:1,c7:1};rooms.tlab={name:"THE HIDDEN LAB",L:null,R:null,W:C9_LW,crates:[],items:[],ints:[],plats:[]};C2_F.tlab={trees:[],vines:[],branches:[],gantries:[],smoke:[]};
  De.tlab={c:"90,110,120",l:"200,230,240",a:0.1,dk:0.5};
  rooms.tctl.ints.push({id:"c5_trug",x:C9_RUG,r:0,label:"CHECK THE RUG"});
  [["c5_lup",30,"GO UP"],["c5_lscr",170,"WATCH THE ARCHIVE"],["c5_lnote",262,"READ THE LOG"]].forEach((q)=>rooms.tlab.ints.push({id:q[0],x:q[1],r:0,label:q[2]}));}
c9Rooms();
/* ---------------- the hidden lab, painted like the rest of the game ---------------- */
{const _t=c5Tile;c5Tile=function(id,i,seed){if(id!=="tlab")return _t(id,i,seed);const k=id+i;return C5.tiles[k]||(C5.tiles[k]=Ae((t)=>c9PaintLab(t,i,seed)));};}
function c9PaintLab(t,i,seed){const R=(k,a)=>r(k+i*47,a+seed),O=i*300;
  t.grad(0,184,["#2a3236","#343e42","#2e383c","#262e32"]);
  for(let y=0;y<184;y+=12)t.rect(0,y,384,1,"#1a2024",0.8);for(let y=0;y<184;y+=12)for(let x=((y/12|0)%2)*6;x<384;x+=12)t.rect(x,y,1,12,"#1a2024",0.6);
  for(let y=0;y<184;y++)for(let x=0;x<384;x++){const n=It((x+O)/9,y/6,seed);n>0.63&&t.px(x,y,[70,84,88],(n-0.63)*1.4);n<0.26&&t.px(x,y,[12,16,18],0.45);}
  for(let k=0;k<70;k++)t.rect(384*R(k,1),40+R(k,2)*140,1,2+R(k,3)*10,"#4a3424",0.3);
  t.rect(0,150,384,5,"#6a1a14");t.rect(0,150,384,1,"#a83a2a");t.rect(0,154,384,1,"#2a0a08");
  [[8,5],[22,4]].forEach(([y,h],q)=>{t.rect(0,y,384,h,"#12181c");t.rect(0,y,384,1,"#7a8892",0.7);for(let x=(q*30)%64;x<384;x+=64)t.rect(x,y-1,3,h+2,"#2a343c");});
  if(i===0){/* benches with glassware, a cabinet of jars */
    for(let b=0;b<2;b++){const bx=40+b*150;t.rect(bx,150,110,34,"#1a2024");t.rect(bx,150,110,3,"#6a7a84");t.rect(bx+4,153,102,1,"#0c1012");
      for(let g=0;g<6;g++){const gx=bx+10+g*16,h=10+((g*7+b)%8);t.rect(gx,150-h,6,h,[120,200,190],0.35);t.rect(gx,150-h,6,1,"#c8f0ea",0.7);t.rect(gx+1,150-h*0.45,4,h*0.45,g%2?[90,220,150]:[220,120,90],0.6);}}
    t.rect(330,60,46,124,"#14191c");t.rect(332,62,42,120,"#222a2e");for(let s=0;s<4;s++){t.rect(332,62+s*30,42,2,"#4a565c");for(let j=0;j<4;j++){const c=[[120,200,120],[200,140,80],[120,160,220],[200,200,120]][(s+j)%4];t.rect(336+j*9,72+s*30,6,16,c,0.45);t.rect(336+j*9,72+s*30,6,2,"#d8d4c4");}}}
  else{/* an empty cryo-pod, its lid open, and archive racks */
    t.rect(30,138,130,46,"#141a1e");t.rect(34,142,122,38,"#2a3a44");t.rect(34,142,122,2,"#6a8ea0");for(let x=40;x<150;x+=12)t.rect(x,166,7,2,"#4a8ab0");
    for(let y=0;y<24;y++)t.rect(40+y*0.6,110+y,100,1,[130,200,230],0.12);t.rect(38,108,104,2,"#8ac0d8",0.6);
    t.rect(200,40,170,144,"#12171a");for(let s=0;s<5;s++){t.rect(204,46+s*27,162,24,"#1c2428");for(let j=0;j<10;j++)t.rect(208+j*16,50+s*27,12,18,j%3?"#2a3a44":"#3a4a52");t.rect(204,46+s*27,162,1,"#5a6a74");}}
  t.grad(184,216,["#2e3438","#22282c","#161a1e"]);for(let x=(i*29)%32;x<384;x+=32)t.rect(x,185,1,31,"#0c1012");for(let y=200;y<216;y+=16)t.rect(0,y,384,1,"#0c1012",0.8);
  for(let k=0;k<110;k++)t.rect(384*R(k,9),186+30*R(k,10),2+(R(k,11)*6|0),1,R(k,12)<0.5?"#48505a":"#121618",0.7);
  t.rect(0,184,384,1,"#7a8892");t.rect(0,185,384,1,"#06080a");}
function c9LabBack(){const S=c7S(),g=C2_FLOOR;
  /* emergency lamps */
  [70,190,290].forEach((lx,q)=>{if(lx<camX-30||lx>camX+222)return;fill("#06080a",lx-0.5,0,1,10);fill("#3a1414",lx-4,10,8,3);const a=0.5+0.5*Math.sin(tick/14+q*2);fill(a>0.5?"#ff4a3a":"#7a1a14",lx-3,12,6,1.6);glow(lx,14,40,"255,60,40",0.18+0.2*a);});
  /* the ladder up to the tower */
  {const x=30;fill("#8a96a0",x-5,0,1.6,g);fill("#8a96a0",x+3,0,1.6,g);for(let y=4;y<g;y+=6)fill("#a8b4bc",x-5,y,10,1.4);glow(x,2,26,"200,225,240",0.25);}
  /* the archive screen */
  {const x=170,y=24,w=56,h=34,on=!C9.doc;fill("#06080a",x-w/2-2,y-2,w+4,h+4);fill("#3a4248",x-w/2-1,y-1,w+2,h+2);fill(on?"#0a1a14":"#050806",x-w/2,y,w,h);
    if(on){text("RIDGE TOWER",x-22,y+6,"#6aff9a",'3px "Press Start 2P",monospace');text("ARCHIVE",x-14,y+12,"#6aff9a",'3px "Press Start 2P",monospace');(tick>>5)%2&&text("PRESS PLAY",x-20,y+22,"#ffe070",'3px "Press Start 2P",monospace');
      for(let q=0;q<h;q+=2)fill("rgba(0,0,0,.25)",x-w/2,y+q,w,0.6);glow(x,y+h/2,40,"90,255,150",0.18);}
    fill("#1a1c1e",x-1,y+h+2,2,g-y-h-2);}
  /* the desk with a log */
  {const x=262;fill("rgba(0,0,0,.35)",x-16,g+0.4,32,1.4);fill("#06080a",x-15,g-16,30,16);fill("#3a2c20",x-14,g-15,28,3);fill("#2a2018",x-13,g-12,3,12);fill("#2a2018",x+10,g-12,3,12);
    fill("#e8dcb8",x-5,g-17,10,2);fill("#3a3a5a",x-3,g-16.6,6,0.5);const a=0.5+0.5*Math.sin(tick/9);a>0.6&&glow(x,g-17,8,"255,240,190",0.25);}
  for(let q=0;q<14;q++){ctx.globalAlpha=0.25;fill("#c8d4dc",camX+((q*53+tick*0.18)%200),(q*19+tick*0.12)%100,0.6,0.6);ctx.globalAlpha=1;}}
/* ---------------- the rug and the trapdoor in the control room ---------------- */
function c9Rug(){const S=c7S(),g=C2_FLOOR,x0=C9_RUG-22,W=44,H=9;
  const flat=(col,dx,dy,w,h)=>{ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(x0+dx+2,g+dy);ctx.lineTo(x0+dx+w-2,g+dy);ctx.lineTo(x0+dx+w,g+dy+h);ctx.lineTo(x0+dx,g+dy+h);ctx.fill();};
  if(S.trap){flat("#04060a",4,0.6,36,8);for(let q=0;q<3;q++){fill("#7a828a",x0+14,g+2+q*2.4,1,1.6);fill("#7a828a",x0+29,g+2+q*2.4,1,1.6);fill("#9aa2aa",x0+14,g+2+q*2.4,16,0.7);}
    ctx.fillStyle="#4a525a";ctx.beginPath();ctx.moveTo(x0+6,g+0.6);ctx.lineTo(x0-2,g-12);ctx.lineTo(x0+34,g-12);ctx.lineTo(x0+40,g+0.6);ctx.fill();ctx.fillStyle="#6a747c";ctx.fillRect(x0-1,g-12,34,1.2);for(let q=0;q<5;q++)fill("#9aa4ac",x0+3+q*7,g-8,1.2,1.2);}
  else if(S.rug){flat("#2a3036",4,0.6,36,8);flat("#4a535a",5,1.2,34,6.6);for(let q=0;q<4;q++){fill("#9aa4ac",x0+8+q*9,g+1.6,1.2,1);fill("#9aa4ac",x0+8+q*9,g+6.2,1.2,1);}fill("#1a1c1e",x0+18,g+3.4,8,2);fill("#c8ccd0",x0+19,g+3.4,6,0.6);fill("#6a747c",x0+4,g+4,3,1.6);fill("#6a747c",x0+37,g+4,3,1.6);}
  if(!S.rug){/* a worn rug on the floor; once you've lost hope, a metal edge glints at its corner */
    flat("#2a080c",0,0.4,W,H);flat("#7a1e24",1.5,1.2,W-3,H-1.8);flat("#a83a2a",4,2.6,W-8,H-4.6);flat("#7a1e24",8,3.8,W-16,H-7);
    for(let q=0;q<5;q++)fill("#e0b040",x0+8+q*7,g+5,2,1);for(let q=0;q<W;q+=2)fill("#d8c090",x0+q,g+H+0.4,0.7,1.2);
    if(S.sat){fill("#9aa4ac",x0+W-3,g+H-1.4,4,1.8);fill("#e8f0f4",x0+W-2,g+H-1.4,2,0.6);const a=0.5+0.5*Math.sin(tick/7);glow(x0+W-1,g+H-1,9,"220,240,255",0.4*a);}}
  else{fill("#4a0e14",x0+W+1,g-4.6,7,5.4);fill("#a83a2a",x0+W+1,g-4.6,7,1.2);fill("#7a1e24",x0+W+2,g-2,5,1.6);for(let q=0;q<4;q++)fill("#d8c090",x0+W+1+q*2,g+0.6,0.7,1);}}
/* ---------------- the satellite status screen (drawn over the room) ---------------- */
function c9SatPanel(){const u=C9.pt,a=Math.min(1,Math.min(u/30,C9.panel===2?Math.max(0,1-(u-C9.off)/30):1));if(a<=0)return;ctx.save();ctx.setTransform(ctx.canvas.width/192,0,0,ctx.canvas.height/108,0,0);ctx.globalAlpha=a;
  fill("rgba(2,6,4,.9)",12,8,168,90);fill("#2a8a4a",12,8,168,0.8);fill("#2a8a4a",12,97.2,168,0.8);fill("#2a8a4a",12,8,0.8,90);fill("#2a8a4a",179.2,8,0.8,90);
  text("SATELLITE NETWORK",58,12,"#6aff9a",'4px "Press Start 2P",monospace');
  const ex=52,ey=56,er=18;ctx.strokeStyle="#3aaa6a";ctx.lineWidth=0.6;ctx.beginPath();ctx.arc(ex,ey,er,0,7);ctx.stroke();for(let k=-2;k<=2;k++){ctx.beginPath();ctx.ellipse(ex,ey+k*6,Math.sqrt(Math.max(0,er*er-(k*6)*(k*6))),1.6,0,0,7);ctx.stroke();}
  ctx.beginPath();ctx.ellipse(ex,ey,8,er,0,0,7);ctx.stroke();ctx.strokeStyle="rgba(90,255,150,.35)";ctx.beginPath();ctx.ellipse(ex,ey,34,12,-0.3,0,7);ctx.stroke();
  const N=12;for(let i=0;i<N;i++){const an=i/N*6.283+u*0.004,x=ex+Math.cos(an)*34*Math.cos(-0.3)-Math.sin(an)*12*Math.sin(-0.3),y=ey+Math.cos(an)*34*Math.sin(-0.3)+Math.sin(an)*12*Math.cos(-0.3),dead=u>150+i*14;
    if(dead){fill("#ff3a2a",x-1.6,y-0.3,3.2,0.6);fill("#ff3a2a",x-0.3,y-1.6,0.6,3.2);}else fill((u>>3)%2?"#ffe070":"#6aff9a",x-1,y-1,2,2);}
  const dead=Math.min(N,Math.max(0,Math.floor((u-150)/14)+1));
  for(let i=0;i<6;i++){const id=i*2+1,d=dead>=id;text("SAT-"+String(id).padStart(2,"0"),96,20+i*6,"#8aa8a0",'3px "Press Start 2P",monospace');text(d?"DESTROYED":"SEARCHING…",132,20+i*6,d?"#ff6a5a":"#ffe070",'3px "Press Start 2P",monospace');}
  if(u>330){text("LAST CONTACT: 30 MIN AGO",96,58,"#ffb08a",'3px "Press Start 2P",monospace');text("SIGNALS: 0 / 24",96,64,"#ff6a5a",'3px "Press Start 2P",monospace');(u>>4)%2&&text("ALL SATELLITES DESTROYED",96,71,"#ff4a3a",'3px "Press Start 2P",monospace');}
  for(let q=8;q<98;q+=2)fill("rgba(0,0,0,.18)",12,q,168,0.6);ctx.globalAlpha=1;ctx.restore();}
/* ---------------- control-room routing ---------------- */
function c9CtlPick(){const S=c7S();c5Pick((it)=>{const k=it.id.slice(3);
  if(k==="tdown")return{r:16,label:"GO DOWN"};if(k==="tpan")return{r:18,label:"CHECK THE PANEL"};if(k==="tcon")return{r:20,label:"TRANSMITTER"};if(k==="tout")return{r:18,label:"GO OUTSIDE"};
  if(k==="trug")return S.sat?{r:18,label:S.trap?"CLIMB DOWN":S.rug?"OPEN THE TRAPDOOR":"CHECK THE RUG"}:null;return null;});}
function c9LabPick(){c5Pick((it)=>{const k=it.id.slice(3);if(k==="lup")return{r:16,label:"GO UP"};if(k==="lscr")return{r:22,label:"WATCH THE ARCHIVE"};if(k==="lnote")return{r:16,label:"READ THE LOG"};return null;});}
{const _s=c7Step;c7Step=function(){if(room!=="tctl"&&room!=="tlab")return _s();C5.t++;C7.t++;C7.fl>0&&C7.fl--;if(C9.panel)C9.pt++;if(dead)return;if(C3.cut)return;if(c3TaskStep())return;if(C7G)return;room==="tctl"?c9CtlPick():c9LabPick();};}
{const _u=c7Use;c7Use=function(e){const k=e.id.slice(3),S=c7S();if(C3.cut||C3.task)return!0;
  if(room==="tctl"&&k==="tcon"&&S.said&&S.gen){if(!S.sat)c3CutStart("c5sat");else{$sx("locked");toast("<b>NO SATELLITES.</b> Every channel is silent. The network is gone.",3200);}return!0;}
  if(room==="tctl"&&k==="trug"){if(!S.rug)return c3Task("gather",C9_RUG,30,()=>{S.rug=1;$sx("clank");c2Save("tctl");updateGuide();toast("<b>A METAL TRAPDOOR!</b><br>Hidden under the rug, cut right into the floor. The bolt has rusted through.",4200);},"#8a2a2a"),!0;
    if(!S.trap)return c3Task("gather",C9_RUG,26,()=>{S.trap=1;$sx("door");shake=Math.max(shake,4);c2Save("tctl");updateGuide();toast("<b>IT OPENS.</b> A ladder leads down into the dark. There's a faint hum of machines below.",3800);},"#7a828a"),!0;
    c7Go("tlab","ctl","click");return!0;}
  if(room==="tlab"){if(k==="lup"){c7Go("tctl","lab","click");return!0;}if(k==="lscr"){c9Doc();return!0;}
    if(k==="lnote"){$sx("card");toast("<b>A LOG, IN SHAKY HANDWRITING:</b><br><i>\"The last ship has left. The sleepers upstairs are still in their pods and I can't wake them all. I've recorded everything I know onto the archive. Whoever finds this: you deserve the truth.\"</i>",8000);return!0;}}
  return _u(e);};}
{const _e=c7Enter;c7Enter=function(t){const S=c7S(),from=S.from;if(t!=="tlab"){_e(t);if(t==="tctl"&&from==="lab"){player.x=C9_RUG+8;player.face=-1;camX=c3Clamp(player.x-96,0,C7_CW-192);}return;}
  C3.lie=0;C7G=null;player.y=C2_FLOOR;player.x=46;player.face=1;camX=0;S.from="";if(!S.lab){S.lab=1;c3CutStart("c5lab");}updateGuide();};}
{const _b=c7Back;c7Back=function(){if(room==="tlab")return c9LabBack();_b();if(room==="tctl")c9Rug();};}
{const _f=c7Front;c7Front=function(){if(room==="tlab"){for(let q=0;q<8;q++){ctx.globalAlpha=0.2;fill("#c8d4dc",camX+((q*61+tick*0.2)%200),(q*23+tick*0.1)%100,0.6,0.6);}ctx.globalAlpha=1;return;}_f();if(room==="tctl"&&C9.panel)c9SatPanel();};}
{const _t=c7Tint;c7Tint=function(){if(room!=="tlab")return _t();ctx.save();ctx.globalCompositeOperation="multiply";ctx.fillStyle="rgb(206,220,226)";ctx.fillRect(0,0,192,108);ctx.restore();const vg=C3.cache.c9vl||(C3.cache.c9vl=(()=>{const q=ctx.createRadialGradient(96,54,30,96,54,118);q.addColorStop(0,"rgba(0,0,0,0)");q.addColorStop(1,"rgba(4,2,2,.6)");return q;})());ctx.fillStyle=vg;ctx.fillRect(0,0,192,108);if(C3.dark>0){ctx.fillStyle="rgba(0,0,4,"+C3.dark+")";ctx.fillRect(0,0,192,108);}};}
{const _g=c7Guide;c7Guide=function(){const S=c7S(),g=qs("#ggb");
  if(room==="tctl"&&S.gen){qs("#gg h4 span").textContent="QUEST";g.innerHTML=!S.sat?"<b>The antennas have power.</b><br>Use the <b>transmitter</b> to call for help.":!S.rug?"<b>Something metal</b> is poking out from under the <b>rug</b>.<br>Check it.":!S.trap?"<b>A hidden trapdoor!</b><br>Open it.":"<b>Climb down</b> through the trapdoor.";return!0;}
  if(room==="tlab"){qs("#gg h4 span").textContent="QUEST";g.innerHTML=S.doc?"<b>You know the truth now.</b>":"<b>A hidden lab.</b><br>Watch the <b>archive</b> on the big screen. There's also a log on the desk.";return!0;}
  return _g();};}
{const _a=c7Arrow;c7Arrow=function(){const S=c7S();if(room==="tctl"&&S.gen){if(modal||won||dead||C3.cut||C3.busy||C7G)return;const t=!S.sat?200:C9_RUG;if(Math.abs(t-player.x)<22)return;const d=t>player.x?1:-1;vo(player.x+d*16,player.y-44,d);return;}
  if(room==="tlab"){if(modal||won||dead||C3.cut||C3.busy||C9.doc)return;const t=170;if(Math.abs(t-player.x)<22)return;const d=t>player.x?1:-1;vo(player.x+d*16,player.y-44,d);return;}return _a();};}
{const _a=window.__evoRoom;window.__evoRoom=()=>{if(room==="tlab"&&C3&&!C3.dreamOn)return"tower_hum";return _a();};}
/* ---------------- cutscenes ---------------- */
function c9CutSat(c){const t=c.t,S=c7S();if(C9.panel)C9.pt++;
  if(t===1){C9.look0=playerLook;c.cx=null;}
  if(t===2){$sx("tune");C7.pow=1;tnCap("Power's good. Antennas up. Calling every satellite in range…");}
  if(t===110){C9.panel=1;C9.pt=0;$sx("blip");}
  if(t>=260&&t<440&&(t-260)%14===0)$sx("locked");
  if(t===430)tnCap("No… no, no. Every one of them is gone.");
  if(t===600){$sx("alarm");tnCap("Destroyed… thirty minutes ago? Just THIRTY MINUTES?!");}
  if(t===800){C9.panel=2;C9.off=C9.pt;playerLook=Object.assign({},C9.look0,{fc:8});tnCap("There's no one left to call. All this way… for nothing.");}
  if(t===1010){$sx("click");tnCap("…Wait. What's that? Something metal, poking out from under the rug.");}
  c.cx=t<1000?null:c3Clamp(C9_RUG-96,0,C7_CW-192);
  if(t>=1200){C9.panel=0;tnCap("");if(C9.look0){playerLook=C9.look0;C9.look0=null;}S.sat=1;c3CutEnd();c2Save("tctl");updateGuide();toast("<b>UNDER THE RUG</b><br>Walk to the rug in the middle of the room and check it.",4200);}}
function c9CutLab(c){const t=c.t;c.cx=null;
  if(t===2)tnCap("A hidden lab… right under the radio tower.");
  if(t===190)tnCap("Somebody worked down here. And the big screen still has power.");
  if(t>=360){tnCap("");c3CutEnd();updateGuide();toast("<b>THE ARCHIVE</b><br>Walk to the big screen and press USE to watch it.",4200);}}
function c9CutAfter(c){const t=c.t,S=c7S();c.cx=null;
  if(t===2)tnCap("So that's what happened while I slept. Sample 07… the Evolved… all of it.");
  if(t===230)tnCap("And the satellites went dark only thirty minutes ago. That was no accident.");
  if(t===450){$sx("stinger");tnCap("…Hold on. That old movie…");}
  if(t===600){tnCap("");c.wait=1;c9Mem(()=>{C3.cut=null;tnBars(0);qs("#cskip").hidden=!0;S.done=1;S.tm=1;c2Save("tlab");fadeNow=1;c7End();});}}
{const _c=c5Cut;c5Cut=function(c){if(c.k==="c5sat")return c9CutSat(c);if(c.k==="c5lab")return c9CutLab(c);if(c.k==="c5after")return c9CutAfter(c);return _c(c);};}
{const _s=c5Skip;c5Skip=function(c){if(c.k==="c5sat"){c.t=Math.max(c.t,1199);return;}if(c.k==="c5lab"){c.t=Math.max(c.t,359);return;}if(c.k==="c5after"){c.t=Math.max(c.t,599);return;}return _s(c);};}
/* ---------------- the archive: played with the opening cutscene's own engine and scenes ---------------- */
async function c9Doc(){if(C9.doc)return;C9.doc=1;const S=c7S();modal=4;
  ot.style.zIndex=90;ot.hidden=!1;it.hidden=!0;nt.hidden=!0;ct.classList.remove("on");Jt=1;cutAbort=0;typing=0;speaker="";fade(1).catch(()=>{});
  setScene("street");requestAnimationFrame(window.se);
  const sc=async(name,card)=>{await fade(1);hideDialog();card&&(await titleCard(card));setScene(name);await fade(0);},N="ARCHIVE  /  NARRATOR",L=async(t)=>{speaker="a";await say(N,t);};
  try{
    await titleCard("RIDGE TOWER ARCHIVE",2600);await titleCard("FILE 01: THE CITY",2000);await fade(0);
    await L("This archive was recorded for anyone who survives. If you are watching, the lab beneath the radio tower still has power.");
    await L("Before the fall, the city was crowded, sick and running out of time. The hospitals were full, and the cures were years away.");
    await sc("poster");
    await L("So the research facility made an offer: volunteers would be frozen in cryo-pods until medicine caught up, and their families would be paid one million dollars.");
    await L("Thousands answered. Most of them were desperate. One of them signed up to save his family.");
    await sc("pod","FILE 02: THE PODS");
    await L("Cryo-sleep cools the body until the heart beats only a few times a minute. Ageing almost stops. It is not death. It is a very long pause.");
    await L("Waking up has a price: weak muscles, a burning thirst and a mind full of fog that lasts for days.");
    await sc("lab","FILE 03: SAMPLE 07");
    await L("In the floors below the pods, the scientists worked on something else: a treatment that could rewrite damaged cells, so the body could repair anything.");
    await L("Sample 07 was given to a test subject. For a few seconds, it worked.");
    await L("Then the subject's cells kept rewriting themselves, and they never stopped. Containment failed.");
    await sc("out","FILE 04: THE EVOLVED");
    await L("What escaped was not an ordinary germ. It travelled through rain, roots, rivers and the air itself.");
    await L("Animals changed first: wolves, boars, rats, crows, worms. Bigger, faster and hungrier. Some people changed too.");
    await L("In a few months, the cities fell silent. The survivors gave the changed ones a name: the EVOLVED.");
    await sc("rock","FILE 05: THE EXODUS");
    await L("The last governments agreed on one impossible plan: leave Earth and build a refuge on Mars.");
    await L("Towers like this one were built to keep the two worlds talking, through a ring of satellites high above the clouds.");
    await sc("left");
    await L("The last ships launched under a sky full of ash. Not every sleeper was woken. Some names were simply missing from the list.");
    await L("If you are one of them… we are so sorry. Stay safe. Keep the satellites alive. They are the only voice Earth has left, and the Evolved can't reach them.");
    await wait(1200);
  }catch(e){if(e!==0)console.error(e);}
  $sx("stop");hideDialog();ct.classList.remove("on");fade(1).catch(()=>{});await new Promise((r)=>setTimeout(r,640));ot.hidden=!0;ot.style.zIndex="";cutAbort=0;C9.doc=0;modal=0;
  S.doc=1;c2Save("tlab");updateGuide();c3CutStart("c5after");}
/* ---------------- developer tools ---------------- */
C3_DEVBTN.push(["CHAPTER 3: SATELLITES AND HIDDEN LAB",[["c3_vsat","CONTROL ROOM: PLAY THE SATELLITE SCENE"],["c3_vrug","CONTROL ROOM: REVEAL THE TRAPDOOR"],["c3_vlab","HIDDEN LAB (FIRST VISIT)"],["c3_vdoc","PLAY THE ARCHIVE"],["c3_vafter","PLAY THE ENDING LINES"],["c3_vreset","RESET SATELLITES AND LAB"]]]);
{const _p=c3DevPre;c3DevPre=function(a){if(a!=="tlab")return _p(a);_p("tctl");const I=c7S();Object.assign(I,{said:1,tried:1,gen:1,gs:7,sat:1,rug:1,trap:1});};}
{const _d=c3Dev;c3Dev=function(a){if(a.slice(0,4)!=="c3_v")return _d(a);const I=c7S(),close=()=>{modal=0;Oo=0;Do.hidden=!0;};
  if(a==="c3_vreset"){Object.assign(I,{sat:0,rug:0,trap:0,lab:0,doc:0,done:0});close();toast("Satellites and lab reset.",1400);return;}
  if(a==="c3_vsat"){close();c7DevGo("tctl",200);Object.assign(I,{said:1,tried:1,gen:1,gs:7,sat:0,rug:0,trap:0});c3CutStart("c5sat");return;}
  if(a==="c3_vrug"){close();c7DevGo("tctl",C9_RUG+20);Object.assign(I,{said:1,tried:1,gen:1,gs:7,sat:1,rug:1,trap:0});updateGuide();return;}
  if(a==="c3_vlab"){close();c3DevPre("tlab");I.lab=0;I.doc=0;enterRoom("tlab","L");return;}
  if(a==="c3_vdoc"){close();if(room!=="tlab"){c3DevPre("tlab");I.lab=1;enterRoom("tlab","L");}setTimeout(()=>c9Doc(),300);return;}
  if(a==="c3_vafter"){close();if(room!=="tlab"){c3DevPre("tlab");I.lab=1;enterRoom("tlab","L");}setTimeout(()=>c3CutStart("c5after"),300);return;}};}
GM.c3.c9=()=>({panel:C9.panel,pt:C9.pt,doc:C9.doc});
