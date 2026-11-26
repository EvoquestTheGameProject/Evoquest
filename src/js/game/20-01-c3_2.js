
/* ---------------- per-frame update (called first thing in the game's update) ---------------- */
function c3Update(){if(!C3||!GM.on)return;
  if(room==="beyond"&&TS&&TS.bz)rooms.beyond.L=TS.bz.call?"wroad":null;
  if(!c3Mine())return;C3.t++;C3.wcd>0&&C3.wcd--;
  if(modal||dead||won||hitStop>0)return;
  if(C3.cut){c3CutStep();return;}
  if(fadeNow!==fadeTo)return;
  C3.busy>0&&C3.busy--;
  if(c4Is())c4Step();else if(room==="wroad")c3RoadStep();else c3ForestStep();}

/* ---------------- THE CRACKED ROAD ---------------- */
function c3HoleW(h){return h.w*(1+0.45*C3.grow);}
function c3RoadStep(){const S=c3S();
  if(!S.half&&!S.cp1&&player.x<=C3_CP){S.cp1=1;c2Save("wroad");toast('<b>HALFWAY THERE?</b><br><span style="color:#8aff9a">&#10004; CHECKPOINT SAVED</span>',2200);}
  if(!S.half&&player.x<=C3_CUT&&player.on&&!player.climb)return void c3CutStart("half");
  if(S.half&&!S.roadDone&&C3.ch&&player.x<=C3_END)return void c3CutStart("end");
  c3HoleStep();c3WormStep();c3VineStep();
  if(C3.ch&&!S.roadDone)c3ChaseStep();}
function c3HoleStep(){for(const h of C3.holes){h.cd>0&&h.cd--;h.dip>0&&h.dip--;if(h.x<camX-40||h.x>camX+232||h.cd)continue;const w=c3HoleW(h);
  if(c3OnFloor()&&Math.abs(player.x-h.x)<w/2-2.5){h.cd=90;h.dip=18;$sx("crash");shake=Math.max(shake,10);
    sparks(h.x,C2_FLOOR,14,["#3a3c3e","#6a6e70","#2a1e16"],1.6,0.14,22);
    const hit=c3Hurt(1,"pothole",-1);hit&&(player.vy=-3.6,player.kb=14,player.kbv=-1.6);
    c3Tip("hole","<b>POTHOLE!</b><br>The road is hollow underneath. JUMP over the holes.",2600);}}}
function c3WormStep(){const chase=!!C3.ch;for(const w of C3.worms){w.t++;
  if(w.st===0){w.cd>0&&w.cd--;if(!w.cd&&Math.abs(player.x-w.x)<(chase?125:76)&&Math.abs(player.x-w.x)>6&&(chase?w.x<player.x:w.x<camX+200&&w.x>camX-8)){w.st=1;w.t=0;$sx("rumble");shake=Math.max(shake,5);c3Tip("worm","<b>THE GROUND IS SHAKING!</b><br>Something is coming up. Back off, or get up on a car!",2800);}}
  else if(w.st===1){w.t%5===0&&parts.push({x:w.x+8*(Math.random()-0.5),y:C2_FLOOR,vx:(Math.random()-0.5)*1.2,vy:-0.8-Math.random()*1.2,g:0.1,life:22,c:Math.random()<0.5?"#4a3a2a":"#6a5a48",s:1});
    w.t%14===0&&(shake=Math.max(shake,3));if(w.t>=(chase?40:52)){w.st=2;w.t=0;$sx("roar");$sx("debris");shake=Math.max(shake,12);sparks(w.x,C2_FLOOR,18,["#4a3a2a","#8a6a50","#3a3c3e"],2.2,0.14,24);}}
  else if(w.st===2){w.H=chase?33:40;w.h=w.H*Math.sin(Math.min(1,w.t/12)*Math.PI/2);w.t%30===0&&$sx("hiss");
    const top=C2_FLOOR-w.h;if(Math.abs(player.x-w.x)<7.5&&player.y>top+2&&player.y-34<C2_FLOOR)c3Hurt(1,"worm",player.x<w.x?-1:1);
    if(w.t>=(chase?48:70)){w.st=3;w.t=0;$sx("slither");}}
  else if(w.st===3){w.h=(w.H||40)*(1-w.t/22);if(w.t>=22){w.st=0;w.t=0;w.h=0;w.cd=chase?170:230;}}}}
function c3VineStep(){if(!C3.ch)return;for(const v of C3.fv){v.cd>0&&v.cd--;if(v.cd||v.x<camX-30||v.x>camX+222)continue;
  if(c3OnFloor()&&Math.abs(player.x-v.x)<v.w/2){v.cd=80;
    if(v.k==="t"){C3.slowT=48;$sx("stuck");sparks(player.x,C2_FLOOR-2,8,["#2f7a3a","#5aaa4a"],1.2,0.1,16);c3Tip("tangle","<b>TANGLED!</b><br>Green fallen vines slow you down. Jump over them!",2400);}
    else{const hit=c3Hurt(1,"thorn",-1);if(hit){C3.stun=26;player.kb=0;player.vy=-1.6;}$sx("snap");sparks(player.x,C2_FLOOR-2,10,["#6a4a2a","#9a7a50"],1.4,0.12,18);c3Tip("thorn","<b>TRIPPED!</b><br>Thorny brown vines trip you. JUMP them!",2400);}}}}

/* the chase: a wall of burning fuel and every mutated animal on the road */
function c3ChaseStart(fx){const c={fire:fx,t:0,lcd:420,ccd:640,crows:[],wolves:[],boars:[],rats:[],sky:[]};
  for(let i=0;i<3;i++)c.wolves.push({o:16+32*i,x:fx-16-32*i,st:"run",t:0,ph:i*2.1,dx:0});
  for(let i=0;i<2;i++)c.boars.push({o:6+26*i,x:fx-6,ph:i*1.3});
  for(let i=0;i<9;i++)c.rats.push({o:4+6*i+3*Math.random(),x:fx-6,ph:Math.random()*6});
  for(let i=0;i<6;i++)c.sky.push({a:Math.random()*6.28,r:10+18*Math.random(),y:18+20*Math.random(),sp:0.02+0.02*Math.random()});
  C3.ch=c;C3.grow=1;C3.crack=1;}
function c3ChaseStep(){const c=C3.ch;c.t++;const gap=c.fire-player.x,late=c3Clamp((C3_CUT-player.x)/C3_CUT,0,1);
  C3.calm>0&&C3.calm--;
  const sp=gap>170?1.75:gap>110?1.22:gap>55?1.04:0.93;c.fire-=c.t<70?sp*0.35:sp;
  if(c.t%18===0)$sx("sizzle");if(c.t%240===120)$sx(Math.random()<0.5?"growl":"roar");
  for(const car of C2.wroad.cars)if(!car.burn&&c.fire<car.x+car.w-4){car.burn=true;car.x<camX+260&&($sx("boom"),(shake=Math.max(shake,6)));}
  if(c.t%2===0)parts.push({x:c.fire+4+30*Math.random(),y:C2_FLOOR-10-30*Math.random(),vx:-0.3-0.8*Math.random(),vy:-0.4-0.6*Math.random(),g:-0.005,life:40,c:Math.random()<0.5?"#ffb050":"#ff7020",s:0.5});
  if(gap<7){const hit=c3Hurt(1,"fire",-1);if(hit){player.kb=16;player.kbv=-2.4;player.vy=-2.8;sparks(player.x,player.y-12,12,["#ff8a30","#ffd868","#d8421c"],1.8,0.12,18);c3Tip("burn","<b>BURNED!</b><br>Don't let the flames catch you. Keep running LEFT!",2200);}}
  const squeeze=1;
  c.rats.forEach((q)=>{q.ph+=0.5;q.x=c.fire-q.o*squeeze+2*Math.sin(q.ph*0.3);});
  c.boars.forEach((q)=>{q.ph+=0.32;q.x=c.fire-q.o*squeeze+1.5*Math.sin(q.ph*0.2);});
  c.lcd--;
  c.wolves.forEach((w,i)=>{w.ph+=w.st==="lunge"?0.7:0.42;w.t++;const home=c.fire-w.o*squeeze;
    if(w.st==="run"){w.x+=(home-w.x)*0.2;if(i===0&&c.lcd<=0&&!(C3.calm>0)&&gap<165&&gap>14&&player.x>C3_END+40){w.st="warn";w.t=0;$sx("growl");}}
    else if(w.st==="warn"){w.x+=(home+3-w.x)*0.2;if(w.t>=34){w.st="lunge";w.t=0;w.dx=0;$sx("roar");}}
    else if(w.st==="lunge"){const v=3.3;w.x-=v;w.dx+=v;const hx=w.x;
      if(Math.abs(hx-player.x)<8&&player.y>C2_FLOOR-13)c3Hurt(1,"wolf",-1);
      if(w.dx>96||hx<player.x-20){w.st="back";w.t=0;}}
    else{w.x+=Math.min(2.2,Math.max(-2.2,home-w.x));if(Math.abs(home-w.x)<2){w.st="run";c.lcd=Math.round(430+170*Math.random()-130*late);}}});
  c.ccd--;if(c.ccd<=0&&!(C3.calm>0)&&gap<200&&player.x>C3_END+60){c.ccd=Math.round(600+220*Math.random()-170*late);
    const lead=player.x-38-30*Math.random();c.crows.push({x:camX+200,y:14,sx:camX+200,sy:14,tx:lead,ty:C2_FLOOR-16,st:"mark",t:0});$sx("flutter");}
  c.crows=c.crows.filter((q)=>{q.t++;if(q.st==="mark"){q.x=q.sx-20*(q.t/50);q.y=q.sy+3*Math.sin(q.t/5);if(q.t>=50){q.st="dive";q.t=0;q.sx=q.x;q.sy=q.y;$sx("whoosh");}return!0;}
    if(q.st==="dive"){const k=Math.min(1,q.t/26);q.x=q.sx+(q.tx-q.sx)*k;q.y=q.sy+(q.ty-q.sy)*k*k;
      if(Math.hypot(q.x-player.x,q.y-(player.y-18))<9)c3Hurt(1,"crow",-1);if(k>=1){q.st="out";q.t=0;}return!0;}
    q.x-=2;q.y-=1.4;return q.y>-30;});
  c.sky.forEach((q)=>{q.a+=q.sp;});
  c3HazStep(c);}

/* ---------------- cutscenes ---------------- */
function c3CutStart(k,o){C3.cut=Object.assign({k,t:0,cx:null,wait:0},o||{});jumpBuf=punchBuf=useBuf=shootBuf=0;keys.u=keys.s=0;tnBars(1);player.vx=0;player.walk=0;player.climb=null;
  qs("#cskip").hidden=k==="sleep"||k==="end2"||k==="c4fall"||k==="c4dam"||k==="c4drink"||k==="c4left";updateGuide();if(o&&o.dark)C3.dark=1;}
function c3CutEnd(){C3.cut=null;tnBars(0);tnCap("");qs("#cskip").hidden=!0;jumpBuf=punchBuf=useBuf=shootBuf=0;updateGuide();}
function c3Walk(tx,sp){const d=tx-player.x;player.x+=Math.sign(d)*Math.min(sp||1.1,Math.abs(d));player.walk=Math.abs(d)>0.5?1:0;player.walk&&(player.face=Math.sign(d),(player.fr+=0.16));return Math.abs(d)<0.6;}
function c3CutStep(){const c=C3.cut;if(c.wait)return;c.t++;
  if(c.k.slice(0,2)==="c4")return c4Cut(c);if(c.k.slice(0,2)==="c5")return c5Cut(c);
  if(c.k==="half")return c3CutHalf(c);if(c.k==="end")return c3CutEnd1(c);if(c.k==="end2")return c3CutEnd2(c);
  if(c.k==="fin")return c3CutFin(c);if(c.k==="sleep")return c3CutSleep(c);if(c.k==="wake")return c3CutWake(c);c3CutEnd();}
function c3Skip(){const c=C3.cut;if(!c||c.wait)return;
  if(c.k.slice(0,2)==="c4")return c4Skip(c);if(c.k.slice(0,2)==="c5")return c5Skip(c);
  if(c.k==="half"){c3HalfDone();return;}
  if(c.k==="end"){if(c.t<440){C3.chasm=1;c.t=439;player.x=34;tnCap("");}return;}
  if(c.k==="fin"){c.t=Math.max(c.t,759);return;}
  if(c.k==="wake"){c.t=Math.max(c.t,469);C3.dark=0;C3.lie=0;return;}}
function c3SpawnPack(x0){const P=[];
  for(let i=0;i<3;i++)P.push({k:"wolf",x:x0+i*34,y:0,ph:i,o:24+34*i});
  for(let i=0;i<2;i++)P.push({k:"boar",x:x0+110+i*38,y:0,ph:i*2,o:126+38*i});
  for(let i=0;i<9;i++)P.push({k:"rat",x:x0-10+i*9,y:0,ph:i*0.7,o:4+9*i});
  for(let i=0;i<7;i++)P.push({k:"crow",x:x0+26*i-30,y:12+22*Math.random(),ph:i,o:20+26*i});
  C3.pack=P;}
function c3CutHalf(c){const t=c.t,px=player.x,crash=C2.wroad.cars.find((q)=>q.crash);
  if(t===1){player.face=1;tnCap("…The ground is shaking.");$sx("rumble");shake=10;c3SpawnPack(px+330);}
  c.cx=t<40?null:t<170?px-96+c3Ez((t-40)/130)*150:t<470?px+54:px+54-c3Ez((t-470)/50)*124;
  C3.pack.forEach((q)=>{q.ph+=q.k==="rat"?0.5:0.35;const hold=px+150+q.o;if(t>30&&q.x>hold)q.x-=q.k==="crow"?1.3:1.05;if(q.k==="crow")q.y+=Math.sin(q.ph*0.5)*0.4;});
  if(t>=40&&t<300&&t%24===0){$sx("rumble");shake=Math.max(shake,5);}
  if(t===110){tnCap("Wolves… boars… rats… crows. Everything that turned. They're ALL coming!");$sx("growl");}
  if(t>=150&&t<300){C3.grow=c3Ez((t-150)/150);C3.crack=C3.grow;t%10===0&&$sx("debris");
    if(t%6===0){const h=C3.holes[(t/6|0)%C3.holes.length];h.x>camX-10&&h.x<camX+202&&sparks(h.x,C2_FLOOR,4,["#3a3c3e","#2a1e16"],1.2,0.12,18);}}
  if(t===200)tnCap("The potholes… the whole road is cracking apart!");
  if(t===300&&crash){C3.big={x:crash.x+crash.w/2,t:0};C3.fly={c:crash,t:0};crash.hide=1;$sx("roar");$sx("crash");shake=26;tnCap("");
    sparks(crash.x+crash.w/2,C2_FLOOR,26,["#4a3a2a","#8a6a50","#3a3c3e"],2.6,0.14,28);}
  if(C3.big){C3.big.t++;C3.big.t>110&&(C3.big=null);}
  if(C3.fly){const f=C3.fly;f.t++;if(f.t===58){f.c.hide=0;f.c.burn=true;C3.fly=null;$sx("crash");$sx("boom");shake=24;smoke(f.c.x+f.c.w/2,C2_FLOOR,10,-1);
      addFx({k:"flash",x:f.c.x+f.c.w/2,y:C2_FLOOR-10,r:40,c:"255,190,100",a:0.8,life:14});C3.tank={x:f.c.x-2,y:C2_FLOOR-f.c.h,vy:-1.5,vx:-0.35,rot:0,t:0};$sx("clank");tnCap("It crashed… it's on fire!");}}
  if(C3.tank){const k=C3.tank;k.t++;k.vy+=0.18;k.y=Math.min(C2_FLOOR-3,k.y+k.vy);k.y>=C2_FLOOR-3&&(k.vy=0);k.x+=k.vx;k.rot+=k.vx*0.25;k.t%12===0&&$sx("clank");
    if(k.t===80){C3.fireCut={x:k.x,len:0};C3.tank=null;$sx("boom");$sx("crash");shake=30;addFx({k:"flash",x:k.x,y:C2_FLOOR-8,r:64,c:"255,200,120",a:0.95,life:20});
      addFx({k:"ring",x:k.x,y:C2_FLOOR-6,r0:4,r1:80,c:"#ffd868",life:22,sq:0.4});sparks(k.x,C2_FLOOR-6,40,["#ffd868","#ff8a30","#d8421c","#ffffff"],3.2,0.12,34);tnCap("The fuel tank! RUN!!!");}}
  if(C3.fireCut){C3.fireCut.len=Math.min(260,C3.fireCut.len+7);}
  if(t===480){player.face=-1;}
  if(t>=560)c3HalfDone();}
function c3HalfDone(){const S=c3S(),cc=C2.wroad.cars.find((q)=>q.crash);cc&&(cc.hide=0,(cc.burn=true));C3.fly=null;C3.tank=null;C3.big=null;C3.grow=1;C3.crack=1;
  const fx=C3.fireCut?Math.max(player.x+40,C3.fireCut.x):player.x+92;C3.fireCut=null;C3.pack=[];S.half=1;c3CutEnd();c3ChaseStart(fx);player.face=-1;c2Save("wroad");
  toast("<b>RUN!</b><br>Jump potholes and fallen vines. Wolves lunge low, crows dive at the red mark.",3800);$sx("stinger");updateGuide();}
function c3CutEnd1(c){const t=c.t,ch=C3.ch;
  if(t<60)c3Walk(34,1.2);
  if(t===1){tnCap("");}
  if(t===30){$sx("crash");$sx("rumble");shake=26;}
  if(t>=30&&t<100){C3.chasm=c3Ez((t-30)/70);t%5===0&&sparks(74+66*Math.random(),C2_FLOOR,6,["#3a3c3e","#2a1e16","#6a6e70"],1.8,0.14,22);t%12===0&&$sx("debris");}
  if(ch){ch.fire=Math.max(148,ch.fire-1);ch.wolves.forEach((w)=>{w.st="run";w.x=Math.max(166+w.o*0.4,w.x-1.2);});ch.rats.forEach((q)=>{q.x=Math.max(150+q.o*0.2,q.x-1);});ch.boars.forEach((q)=>{q.x=Math.max(170+q.o*0.3,q.x-1);});ch.crows=ch.crows.filter((q)=>q.st==="out");
    t%60===20&&$sx("growl");}
  if(t===80){player.face=1;}
  if(t===110)tnCap("*pant* …*pant* …");
  if(t===250)tnCap("The road just… fell away. They can't follow me across that.");
  if(t===420)tnCap("Okay. The radio. Let me try again.");
  if(t===520){tnCap("");c.wait=1;c3LostRadio(()=>{C3.cut={k:"end2",t:0,cx:null,wait:0};});}
  c.cx=t<520?Math.max(0,player.x-60):null;}
function c3CutEnd2(c){const t=c.t;
  if(t===2)tnCap("Signal lost… Of course. Great.");
  if(t===180)tnCap("My throat is burning from the smoke. I need water… and rest.");
  if(t===360)tnCap("That forest is the only way west. Let's go.");
  if(t===500){const S=c3S();S.roadDone=1;c2Save("wroad");fadeTo=1;onFaded=()=>{C3.cut=null;tnBars(0);tnCap("");enterRoom("forest","R");};}
  c.cx=Math.max(0,player.x-60);}

/* ---------------- extra dangers for the second half of the chase ---------------- */
var C3_BLAST=[2650,1450,520].map(c3M),C3_POLES=c3Thin([3020,2440,1830,345],(x)=>x).map(c3M),C3_SINK=[];
function c3HzReset(){C3.hz={cars:{},poles:C3_POLES.map((x,i)=>({x,st:0,t:0,late:i===1?1:0,cd:0})),sinks:C3_SINK.map((x)=>({x,st:0,t:0})),rats:[],rw:null,rcd:1e9};}
function c3HazStep(ch){const H=C3.hz;if(!H||!C3.ch)return;
  /* leaking cars: a sparking fuse, then a blast */
  for(const car of C2.wroad.cars){if((C3_BLAST.indexOf(car.x)<0&&!H.cars[car.x])||car.hide)continue;const q=H.cars[car.x]||(H.cars[car.x]={st:0,t:0}),R=car.x+car.w,d=player.x-R;
    if(q.st===0&&!car.burn&&d>-4&&d<170&&player.x>C3_END+40){q.st=1;q.t=0;C3.calm=300;$sx("sizzle");c3Tip("blast","<b>STOP! THAT CAR IS ABOUT TO BLOW!</b><br>Fuel is leaking onto sparking wires. <b>Wait at the green line</b> until the countdown ends and it goes BOOM, then run past.",4200);}
    else if(q.st===1){q.t++;q.t%12===0&&$sx("click");q.t%3===0&&parts.push({x:car.x+car.w*Math.random(),y:C2_FLOOR-car.h*0.4,vx:(Math.random()-0.5)*0.6,vy:-0.6-Math.random()*0.6,g:0.04,life:20,c:Math.random()<0.5?"#ffd868":"#ff8a30",s:1});
      if(q.t>=96){q.st=2;car.burn=true;const cx=car.x+car.w/2;$sx("boom");$sx("crash");shake=Math.max(shake,18);smoke(cx,C2_FLOOR-car.h/2,10,0);
        addFx({k:"flash",x:cx,y:C2_FLOOR-car.h/2,r:46,c:"255,200,120",a:0.9,life:16});addFx({k:"ring",x:cx,y:C2_FLOOR-car.h/2,r0:4,r1:44,c:"#ffd868",life:18,sq:0.5});sparks(cx,C2_FLOOR-car.h/2,30,["#ffd868","#ff8a30","#d8421c","#ffffff"],2.8,0.12,30);
        if(player.x>car.x-18&&player.x<R+18&&player.y>C2_FLOOR-car.h-26){const dir=player.x<cx?-1:1,hit=c3Hurt(1,"blast",dir);hit&&(player.vy=-3.4,player.kb=16,player.kbv=2*dir);}}}}
  /* burning power poles topple across the road */
  for(const p of H.poles){const d=player.x-p.x;p.cd>0&&p.cd--;
    if(p.st===0&&d>0&&d<(p.late?66:100)){p.st=1;p.t=0;C3.calm=220;$sx("creak");c3Tip("pole","<b>TIMBER!</b><br>A burning power pole is coming down. Don't be under the <b>red shadow</b> when it lands, then jump the burning log.",3600);}
    else if(p.st===1){p.t++;p.t%16===0&&$sx("creak");if(p.t>=52){p.st=2;p.t=0;$sx("crash");$sx("debris");shake=Math.max(shake,12);sparks(p.x,C2_FLOOR-4,22,["#ffd868","#ff8a30","#6a4a2a"],2.2,0.14,24);
        if(player.y>C2_FLOOR-14&&Math.abs(player.x-p.x)<10){c3Hurt(1,"pole",player.x<p.x?-1:1);p.cd=60;}}}
    else if(p.st===2){p.t++;if(!p.cd&&player.y>C2_FLOOR-6&&Math.abs(player.x-p.x)<5.5){const hit=c3Hurt(1,"pole",1);p.cd=60;hit&&(player.vy=-2.6,player.kb=12,player.kbv=1.8);}}}
  /* the road keeps caving in: new sinkholes open ahead */
  for(const k of H.sinks){const d=player.x-k.x;
    if(k.st===0&&d>0&&d<122){k.st=1;k.t=0;$sx("rumble");shake=Math.max(shake,5);c3Tip("sink","<b>THE ROAD IS CAVING IN!</b><br>Cracks spread, then a new hole opens. Jump it!",3000);}
    else if(k.st===1){k.t++;k.t%4===0&&parts.push({x:k.x+(Math.random()-0.5)*20,y:C2_FLOOR,vx:(Math.random()-0.5)*0.8,vy:-0.6-Math.random(),g:0.1,life:18,c:Math.random()<0.5?"#3a3c3e":"#6a5a48",s:1});k.t%14===0&&(shake=Math.max(shake,3));
      if(k.t>=44){k.st=2;$sx("crash");shake=Math.max(shake,10);const h={x:k.x,w:20,cd:0,dip:18,sink:1};C3.holes.push(h);sparks(k.x,C2_FLOOR,16,["#3a3c3e","#6a6e70","#2a1e16"],1.8,0.14,22);
        if(c3OnFloor()&&Math.abs(player.x-k.x)<c3HoleW(h)/2-2.5){h.cd=90;const hit=c3Hurt(1,"pothole",-1);hit&&(player.vy=-3.6,player.kb=14,player.kbv=-1.6);}}}}
  /* a rat stampede pours past from behind: jump it */
  const gap=ch.fire-player.x;H.rcd--;
  if(!H.rw&&H.rcd<=0&&gap>45&&player.x>C3_END+140){H.rw={t:0,hit:0};H.rcd=520+Math.round(Math.random()*200);$sx("skitter");c3Tip("rats","<b>RATS!</b><br>A swarm is stampeding out of the fire behind you. <b>JUMP</b> as they pour past (or get up on a car).",3400);}
  if(H.rw){const w=H.rw;w.t++;w.t%10===0&&w.t<50&&$sx("skitter");
    if(w.t===50)for(let i=0;i<5;i++)H.rats.push({x:camX+204+i*6,ph:i*0.9,vx:-2.8});
    if(w.t>320)H.rw=null;}
  H.rats=H.rats.filter((q)=>{q.x+=q.vx;q.ph+=0.7;if(H.rw&&!H.rw.hit&&Math.abs(q.x-player.x)<4.5&&player.y>C2_FLOOR-5){H.rw.hit=1;c3Hurt(1,"rats",-1);}return q.x>camX-30;});}
