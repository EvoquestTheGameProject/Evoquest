/* ======================= PART 6B: THE DOME =======================
   A hall grown out of flesh, wrecked cars and rubble. The Evolved arrive and scatter into burrows; the big one walks into a
   pulsing wall of flesh, which opens for it and closes again. The only other way on is an emergency route, behind a bolted
   hatch wrapped in sinew: pry it off with the crowbar, in time with the Dome's heartbeat. */
const P6_BAR=96,P6_HATCH=340,P6_HOLES=[290,232,176,138];
var P6D={mem:[],bar:0,bt:0,spore:[],hat:0,vein:[]};
rooms.dome.ints.push({id:"c5_dbar",x:P6_BAR+34,r:0,label:"THE FLESH WALL"},{id:"c5_dsign",x:P6_HATCH-34,r:0,label:"READ THE SIGN"},{id:"c5_dhatch",x:P6_HATCH,r:0,label:"PRY THE HATCH"});
/* ---------------- art: the walls (a generic flesh-and-metal texture, painted once per tile) ---------------- */
{const _t=c5Tile;c5Tile=function(id,i,seed){if(id!=="dome")return _t(id,i,seed);const k=id+i;return C5.tiles[k]||(C5.tiles[k]=Ae((t)=>p6PaintDome(t,i,seed)));};}
function p6PaintDome(t,i,seed){const O=i*336,R=(k,a)=>r(k+i*53,a+seed);
  t.grad(0,184,["#1a0a12","#2c1220","#3a1828","#2a1020"]);
  for(let y=0;y<184;y++)for(let x=0;x<384;x++){const gx=x+O,n=It(gx/8,y/6,seed),m=It(gx/23,y/17,seed+9);
    if(n>0.6)t.px(x,y,[150,58,84],(n-0.6)*1.5);else if(n<0.3)t.px(x,y,[10,4,8],0.5);if(m>0.62)t.px(x,y,[90,30,50],0.35);
    if(y<40)t.px(x,y,[6,2,6],0.55*(1-y/40));}
  /* ribs: curved arches of car chassis wrapped in muscle */
  for(let k=-1;k<5;k++){const cx=k*120+60-(O%120);for(let y=0;y<184;y++){const off=Math.sin(y/38+(k+Math.floor(O/120))*1.7)*6,x0=Math.round(cx+off);
    for(let w=-7;w<=7;w++){const v=(w+7)/14,c=v<0.2?[120,60,70]:v<0.55?[82,34,48]:v<0.85?[52,20,32]:[28,10,18];t.px(x0+w,y,c);}
    if(y%9===0)t.px(x0-3,y,[190,90,110],0.6);}}
  /* sinew strands between the ribs */
  for(let k=0;k<26;k++){const gx=R(k,3)*384,len=30+R(k,4)*110,y0=R(k,5)*80;for(let y=0;y<len;y++){const x=gx+Math.sin((y+k*7)/9)*2.4;t.px(x,y0+y,[220,100,130],0.35);t.px(x+1,y0+y,[60,16,30],0.4);}}
  /* car parts that have been swallowed by the walls */
  for(let k=0;k<9;k++){const gx=R(k,10)*384,gy=50+R(k,11)*100,kind=k%3;
    if(kind===0){t.poly([[gx,gy],[gx+34,gy-6],[gx+40,gy+14],[gx+4,gy+20]],(x,y)=>[62+((x*3+y)%7)*3,66,72]);t.rect(gx+6,gy+2,20,6,"#10161c");t.rect(gx+30,gy+2,5,3,"#8a2a1a",0.8);}
    else if(kind===1){t.disc(gx,gy,10,"#0c0e12");t.disc(gx,gy,5,"#40464e");t.disc(gx,gy,2,"#14181c");for(let a=0;a<14;a++)t.px(gx+Math.cos(a*0.45)*8,gy+Math.sin(a*0.45)*8,"#2a2e34");}
    else{t.rect(gx,gy,46,8,"#4a4e56");t.rect(gx,gy,46,2,"#8a9098");t.rect(gx,gy+6,46,2,"#20242a");t.rect(gx+4,gy-4,5,4,"#e8d890",0.7);t.rect(gx+36,gy-4,5,4,"#e8d890",0.7);}
    /* flesh creeping over each one */
    for(let a=0;a<9;a++)t.disc(gx+R(a,20)*46-6,gy+R(a,21)*22-4,1+(R(a,22)*2|0),[110+(R(a,23)*40|0),38,60],0.8);}
  /* pustules */
  for(let k=0;k<16;k++){const gx=R(k,30)*384,gy=20+R(k,31)*150,rad=1+(R(k,32)*3|0),g=k%3===0;t.disc(gx,gy,rad+2,g?[24,64,34]:[70,16,40],0.6);t.disc(gx,gy,rad,g?[90,220,110]:[250,110,170]);t.px(gx-1,gy-1,"#ffffff",0.8);}
  /* the floor: broken asphalt, with flesh growing over it */
  t.grad(184,216,["#2a2024","#1c1418","#100a0e"]);
  for(let k=0;k<160;k++){const x=R(k,40)*384,y=186+R(k,41)*30;t.rect(x,y,2+(R(k,42)*7|0),1,R(k,43)<0.5?"#3a3036":"#0c0608",0.8);}
  for(let k=0;k<22;k++){const x=R(k,44)*384,y=190+R(k,45)*20;t.disc(x,y,3+(R(k,46)*5|0),[120,36,60],0.55);t.disc(x-1,y-1,1,[255,160,190],0.6);}
  t.rect(0,184,384,1,"#7a3a4a");t.rect(0,185,384,1,"#06020a");}
/* ---------------- state ---------------- */
function p6Pulse(){const b=P6D.bt%96;return Math.min(1,Math.exp(-b/7)+(b>=14?0.7*Math.exp(-(b-14)/7):0));}
function p6DomeLights(){const g=C2_FLOOR,T=P6.t,L=[],pu=p6Pulse(),S=p6S();
  L.push({x:P6_BAR,y:g-40,r:90,i:0.55+0.3*pu,c:"255,100,150"});
  for(let k=0;k<7;k++){const x=40+k*92;L.push({x,y:30+((k*23)%50),r:36,i:0.35+0.2*Math.sin(T/30+k),c:k%3===0?"120,255,140":"255,120,180"});}
  L.push({x:P6_HATCH,y:g-30,r:30,i:S.hatch?0.1:0.5+0.2*Math.sin(T/10),c:"90,255,140"});
  for(const m of P6D.mem)L.push({x:m.x,y:g-(m.lane||0)-18,r:22,i:0.3,c:m.b?"255,60,40":"160,255,120"});
  L.push({x:player.x,y:g-20,r:24,i:0.25,c:"230,220,255"});C10A.lights=L;}
/* ---------------- drawing ---------------- */
function p6SinewHang(x,len,ph){const T=P6.t;ctx.strokeStyle="rgba(190,70,100,.8)";ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(x,0);ctx.quadraticCurveTo(x+Math.sin(T/40+ph)*4,len*0.5,x+Math.sin(T/30+ph)*6,len);ctx.stroke();
  ctx.strokeStyle="rgba(255,150,170,.35)";ctx.lineWidth=0.4;ctx.beginPath();ctx.moveTo(x-0.4,0);ctx.quadraticCurveTo(x-0.4+Math.sin(T/40+ph)*4,len*0.5,x-0.4+Math.sin(T/30+ph)*6,len);ctx.stroke();}
function p6Barrier(){const g=C2_FLOOR,x=P6_BAR,pu=p6Pulse(),T=P6.t,op=P6D.bar;/* op: 0 shut, up to 1 open for the beast */
  ctx.save();ctx.translate(x,0);
  const w=46+pu*3,gr=ctx.createLinearGradient(-w,0,w,0);gr.addColorStop(0,"#4a1428");gr.addColorStop(0.5,"#8a2e50");gr.addColorStop(1,"#4a1428");
  ctx.fillStyle="#12060c";ctx.fillRect(-w-4,0,w*2+8,g+1);
  ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(-w,g);for(let y=g;y>=0;y-=6){const bx=Math.sin(y/9+T/50)*3+((y*7)%5)-2;ctx.lineTo(-w+bx-pu*2,y);}ctx.lineTo(-w,0);ctx.lineTo(w,0);for(let y=0;y<=g;y+=6){const bx=Math.sin(y/9+T/50+2)*3+((y*11)%5)-2;ctx.lineTo(w+bx+pu*2,y);}ctx.lineTo(w,g);ctx.fill();
  /* the doorway behind it: a heavy door that the flesh has swallowed */
  ctx.fillStyle="rgba(20,6,12,.7)";ctx.fillRect(-16,g-46,32,46);ctx.fillStyle="rgba(120,130,140,.35)";ctx.fillRect(-16,g-46,32,1.4);ctx.fillRect(-16,g-46,1.4,46);ctx.fillRect(14.6,g-46,1.4,46);
  /* the opening, when it parts for the big one */
  if(op>0){const ow=14*op;ctx.fillStyle="#060208";ctx.beginPath();ctx.ellipse(0,g-24,ow*0.8,26*Math.min(1,op*1.3),0,0,7);ctx.fill();ctx.fillStyle="rgba(255,110,160,.5)";ctx.beginPath();ctx.ellipse(0,g-24,ow*0.95,27*Math.min(1,op*1.3),0,0,7);ctx.lineWidth=1.2;ctx.strokeStyle="rgba(255,150,190,.55)";ctx.stroke();}
  /* veins, swelling with every beat */
  ctx.lineCap="round";for(let q=0;q<9;q++){const vx=-w+8+q*(w*2-16)/8,a=0.4+0.5*pu;ctx.strokeStyle="rgba(255,120,170,"+a+")";ctx.lineWidth=0.8+pu*0.7;ctx.beginPath();ctx.moveTo(vx,g);ctx.quadraticCurveTo(vx+Math.sin(q*2)*8,g*0.5,vx+Math.sin(q*3+1)*6,4);ctx.stroke();}
  for(let q=0;q<14;q++){const px=-w+6+((q*37)%(w*2-12)),py=8+((q*29)%(g-16)),s=1.4+((q*5)%3)+pu*0.8;fill(q%3?"#ff86d0":"#c8ff7a",px-s/2,py-s/2,s,s);glow(px,py,s*3,q%3?"255,120,200":"170,255,120",0.25+0.2*pu);}
  ctx.restore();glow(x,g-30,70,"255,100,150",0.14+0.12*pu);}
function p6Hatch(){const S=p6S(),g=C2_FLOOR,x=P6_HATCH,T=P6.t;
  /* the sign: a self-lit emergency exit, flickering */
  const on=(T%190>8)&&!(T%61===0),a=S.hatch?0.35:on?1:0.3;fill("#06120a",x-18,g-58,36,15);fill("#0e3a1c",x-17,g-57,34,13);
  ctx.globalAlpha=a;fill("#6aff9a",x-15,g-55,5,9);fill("#6aff9a",x-12,g-56,2,2.4);fill("#6aff9a",x-13,g-52,5,1.4);fill("#6aff9a",x-11,g-50,1.4,4);fill("#6aff9a",x-14,g-49,1.4,3);
  text("EMERGENCY",x-8,g-56,"#6aff9a",'2.6px "Press Start 2P",monospace');text("ROUTE",x-8,g-52,"#6aff9a",'2.6px "Press Start 2P",monospace');fill("#6aff9a",x+5,g-49,9,1);fill("#6aff9a",x+11,g-51,1,5);ctx.globalAlpha=1;glow(x,g-50,26,"90,255,140",0.22*a);
  /* the frame and the plate */
  fill("#06080a",x-17,g-27,34,27);fill("#2a3036",x-15,g-25,30,25);
  if(!S.hatch){fill("#5a626a",x-14,g-24,28,23);fill("#8a949c",x-14,g-24,28,1.4);fill("#3a424a",x-14,g-3,28,2);
    for(const [bx,by] of [[-11,-21],[10,-21],[-11,-6],[10,-6]]){fill("#2a2e34",x+bx-1.4,g+by-1.4,3.4,3.4);fill("#a0a8b0",x+bx-0.8,g+by-0.8,1.6,1.6);}
    fill("#1a1e22",x-4,g-16,8,2.4);fill("#c8ccd0",x-3,g-16,6,0.6);ctx.globalAlpha=0.5;fill("#7a3a1a",x-9,g-19,1.6,14);fill("#7a3a1a",x+5,g-21,2,16);ctx.globalAlpha=1;
    /* sinew straps over the plate, tight on the beat */
    const pu=p6Pulse();ctx.strokeStyle="rgba(170,50,86,.95)";ctx.lineWidth=1.6+pu;for(const [x0,y0,x1,y1] of [[-17,-26,17,-2],[17,-26,-17,-2],[-17,-14,17,-14]]){ctx.beginPath();ctx.moveTo(x+x0,g+y0);ctx.quadraticCurveTo(x,g-14+Math.sin(T/12)*1.4-pu*1.5,x+x1,g+y1);ctx.stroke();}
    ctx.strokeStyle="rgba(255,140,170,.5)";ctx.lineWidth=0.5;ctx.beginPath();ctx.moveTo(x-17,g-25);ctx.quadraticCurveTo(x,g-15-pu,x+17,g-3);ctx.stroke();}
  else{fill("#02030a",x-14,g-24,28,23);for(let q=0;q<4;q++){fill("#7a828a",x-8,g-22+q*5,16,1.2);}glow(x,g-12,16,"20,30,40",0.4);
    ctx.save();ctx.translate(x+22,g-1);ctx.rotate(0.9);fill("#5a626a",-8,-12,16,12);fill("#8a949c",-8,-12,16,1.2);ctx.restore();}}
function p6Hole(hx,hy){fill("#04020a",hx-5,hy-6,10,12);fill("#04020a",hx-4,hy-7,8,14);ctx.strokeStyle="rgba(190,70,100,.8)";ctx.lineWidth=1.2;ctx.beginPath();ctx.ellipse(hx,hy,5.6,7.4,0,0,7);ctx.stroke();ctx.strokeStyle="rgba(255,150,180,.4)";ctx.lineWidth=0.4;ctx.beginPath();ctx.ellipse(hx-0.4,hy-0.4,5.6,7.4,0,2.8,5.6);ctx.stroke();
  if(P6.t%300<14)fill("#ff3a2a",hx-1.6,hy-1,1,0.8),fill("#ff3a2a",hx+0.8,hy-1,1,0.8);}
function p6DomeBack(){const g=C2_FLOOR,T=P6.t;
  /* things hanging from the vault */
  [34,98,168,236,300,372,440,508,566,612].forEach((x,q)=>{if(x<camX-10||x>camX+202)return;p6SinewHang(x,12+((q*13)%22),q);});
  for(const hx of P6_HOLES)p6Hole(hx,50);
  p6Barrier();p6Hatch();
  /* spores drifting up from the walls */
  for(const s of P6D.spore){ctx.globalAlpha=Math.max(0,s.a);fill(s.c,s.x,s.y,0.8,0.8);glow(s.x,s.y,2.4,s.g,0.22*s.a);}ctx.globalAlpha=1;
  /* the Evolved that are in the room */
  for(const m of P6D.mem){m.b?p6Beast(m):p6Mut(m);}
  const e=c10Env(player.x,player.y-14);De.dome=Object.assign(De.dome||{},{c:"90,50,70",l:"255,150,190",a:0.18+e.a*0.2,dk:0.48});}
function p6DomeFront(){const g=C2_FLOOR,pu=p6Pulse();
  /* a thin pink haze that swells with each beat */
  ctx.fillStyle="rgba(255,90,150,"+(0.03+0.05*pu)+")";ctx.fillRect(camX,0,192,108);
  for(const q of [12,70,150]){const x=camX+q+Math.sin(P6.t/60+q)*3;glow(x,100,40,"120,255,140",0.04);}}
function p6DomeTint(){const T=P6.t;ctx.save();ctx.setTransform(ctx.canvas.width/192,0,0,ctx.canvas.height/108,0,0);ctx.drawImage(c10LM(C10A.lights||[],0.5,"20,4,14"),0,0,192,108);
  for(const L of C10A.lights||[]){const x=L.x-camX;if(x<-L.r||x>192+L.r)continue;glow(x,L.y,L.r*0.55,L.c,0.12*L.i);}
  const vg=C3.cache.p6dv||(C3.cache.p6dv=(()=>{const q=ctx.createRadialGradient(96,54,34,96,54,118);q.addColorStop(0,"rgba(0,0,0,0)");q.addColorStop(1,"rgba(10,0,8,.55)");return q;})());ctx.fillStyle=vg;ctx.fillRect(0,0,192,108);
  if(C3.dark>0){ctx.fillStyle="rgba(0,0,4,"+C3.dark+")";ctx.fillRect(0,0,192,108);}ctx.restore();}
/* ---------------- per-frame ---------------- */
function p6DomeTick(){P6.t++;P6D.bt++;C7.t++;const b=P6D.bt%96;
  if(b===0){$sx("heart");p6Tone(52,0.28,"sine",0.16,34);}if(b===14)p6Tone(46,0.24,"sine",0.12,30);
  if(P6.t%7===0&&P6D.spore.length<40)P6D.spore.push({x:camX+Math.random()*200,y:C2_FLOOR-Math.random()*20,vx:(Math.random()-0.5)*0.15,vy:-0.1-Math.random()*0.2,a:0.9,c:Math.random()<0.5?"#ff9ad0":"#b8ff8a",g:Math.random()<0.5?"255,140,200":"170,255,120"});
  P6D.spore=P6D.spore.filter((s)=>{s.x+=s.vx;s.y+=s.vy;s.a-=0.006;return s.a>0&&s.y>-2;});
  for(const m of P6D.mem){if(m.d>0){m.d--;continue;}
    if(m.hx!=null){/* walk to the burrow, then climb into it */const dx=m.hx-m.x;if(Math.abs(dx)>1.2){m.x+=Math.sign(dx)*0.55;m.f=Math.sign(dx);m.idle=0;}else{m.idle=1;m.lane=(m.lane||0)+0.55;if(m.lane>44){m.gone=1;}}}
    else if(m.b&&m.tx!=null){const dx=m.tx-m.x;if(Math.abs(dx)>1.2){m.x+=Math.sign(dx)*0.5;m.f=Math.sign(dx);m.idle=0;}else{m.idle=1;if(!m.eat){m.eat=1;m.et=0;}}
      if(m.eat){m.et++;P6D.bar=Math.min(1,m.et/50);if(m.et>60){m.x-=0.35;}if(m.et>110){m.gone=1;}}}}
  P6D.mem=P6D.mem.filter((m)=>!m.gone);
  if(!P6D.mem.length&&P6D.bar>0&&!(C3.cut&&C3.cut.k==="c5p6dome"&&C3.cut.t<1100))P6D.bar=Math.max(0,P6D.bar-0.04);}
function p6DomeStep(){const S=p6S();if(dead)return;p6DomeTick();if(C3.cut){return;}if(modal)return;if(c3TaskStep())return;
  p6DomeLights();
  if(player.x>P6_DW-8&&!C3.cut){c7Go("fol","dome");return;}
  c5Pick((it)=>{const k=it.id.slice(3);if(k==="dbar")return{r:30,label:"THE FLESH WALL"};if(k==="dsign")return{r:22,label:"READ THE SIGN"};if(k==="dhatch")return S.hatch?{r:18,label:"GO DOWN"}:{r:22,label:"PRY THE HATCH"};return null;});}
function p6DomeUse(e){const k=e.id.slice(3),S=p6S();if(C3.cut||C3.task)return!0;
  if(k==="dbar"){c3CutStart("c5p6bar");return!0;}
  if(k==="dsign"){$sx("card");toast("<b>A GREEN SIGN, STILL GLOWING:</b> EMERGENCY ROUTE &rarr;<br>Below it, a steel hatch with four bolts, strangled by sinew. In small print: <i>IN CASE OF BREACH, LIFT THE PLATE AND DESCEND. DO NOT SEAL.</i>",7000);S.sign=1;updateGuide();return!0;}
  if(k==="dhatch"){if(S.hatch){c3CutStart("c5p6down");return!0;}
    if(!inv.includes("pcrow")){$sx("locked");toast("The plate won't budge. You need something to lever it with.",2600);return!0;}
    p6PryOpen();return!0;}
  return!0;}
function p6DomeGuide(){const S=p6S();
  if(S.hatch)return p6Q("<b>The hatch is open.</b><br>Climb <b>DOWN</b> the emergency route.");
  if(!S.dscene)return p6Q("<b>The Dome.</b><br>Look around.");
  return p6Q("<b>The flesh wall blocks the next chamber.</b><br>"+(S.bartried?"&#10004; ":"&#9744; ")+"Try the flesh wall<br>"+(S.sign?"&#10004; ":"&#9744; ")+"Find the emergency route sign<br>&#9744; <b>Pry the hatch</b> off with your crowbar");}
function p6DomeArrow(){const S=p6S();if(C3.cut||S.dome<1)return;p6Arrow(S.hatch||S.bartried?P6_HATCH:P6_BAR+34);}
/* ---------------- the heartbeat pry: pull when the flesh relaxes ---------------- */
var P6PR=null;
const P6_PRYWHY=["<b>WHY IT WORKS:</b> a crowbar is a lever, but a muscle grips hardest while it is TENSED. After each beat it relaxes for a moment, and that is when you can pull.","<b>WHY IT WORKS:</b> a heartbeat has two sounds: <i>lub</i> (the valves between the chambers snap shut) and <i>dub</i> (the exit valves shut). The muscle relaxes right after: that is the green window.","<b>WHY IT WORKS:</b> the bolts are only weak in one direction. A steady pull along the strap does nothing; a pull timed with the relaxed moment adds the muscle's slack to yours.","<b>WHY IT WORKS:</b> every pull stretches the sinew a little farther until the last bolt snaps. Small timed forces add up."];
function p6PryOpen(){const S=p6S();p6Css();
  const el=c5Overlay("#p6Pry",'<div class="gcard c4card"><h3 id="p6pT">PRY THE HATCH OFF</h3><canvas id="p6pCv" class="p6cv" width="384" height="216" aria-label="A hatch plate strapped down with living sinew. A heartbeat line shows when the flesh relaxes"></canvas><div class="c4lay" id="p6pB"><button class="gbtn alt go" id="p6pGo">PULL! (E)</button></div><div id="p6pMsg" class="p6msg" aria-live="polite"></div><div class="btns"><button class="gbtn alt" id="p6pOk">STOP</button></div></div>');
  modal=4;el.hidden=!1;P6PR={n:0,t:0,fail:0,anim:0,fx:0,busy:0,hint:0,wave:[]};
  qs("#p6pOk").onclick=()=>p6PryClose();qs("#p6pGo").onclick=()=>p6PryPull();
  qs("#p6pMsg").innerHTML="The sinew grips the bar while the flesh is <b>TENSE</b>. Watch the heartbeat line: press <b>PULL</b> in the <b class=\"ok\">green RELAX window</b> after the second beat. 4 good pulls rip the plate off.";
  el.__stop=()=>{if(P6PR)cancelAnimationFrame(P6PR.raf);};
  const loop=()=>{if(!P6PR)return;P6PR.raf=requestAnimationFrame(loop);if(window.__evoPaused)return;p6PryTick();p6PryPaint();};P6PR.raf=requestAnimationFrame(loop);
  P6PR.key=(ev)=>{if(!P6PR)return;if(ev.target&&ev.target.id==="p6pOk")return;if(ev.key==="e"||ev.key==="E"||ev.key===" "||ev.key==="Enter"){ev.preventDefault();p6PryPull();}else if(ev.key==="Escape"){ev.preventDefault();p6PryClose();}};
  addEventListener("keydown",P6PR.key,!0);setTimeout(()=>{const f=qs("#p6pGo");f&&f.focus();},30);$sx("click");}
function p6PryPhase(){const b=P6D.bt%96;return b>=24&&b<=56?"relax":b<24?"tense":"tense2";}
function p6PryTick(){const P=P6PR;if(!P)return;P.t++;P6D.bt++;const b=P6D.bt%96;if(b===0){$sx("heart");p6Tone(52,0.28,"sine",0.16,34);}if(b===14)p6Tone(46,0.24,"sine",0.12,30);P.wave.push(p6Pulse());if(P.wave.length>190)P.wave.shift();if(P.anim>0)P.anim--;}
function p6PryPull(){const P=P6PR;if(!P||P.busy)return;const ph=p6PryPhase();
  if(ph!=="relax"){P.fail++;P.fx=-1;P.anim=26;$sx("stuck");shake=Math.max(shake,4);p6Tone(120,0.25,"sawtooth",0.06,70);
    const m=P.fail>=2&&!P.hint?(P.hint=1,'<span class="hint"><b>HINT:</b> wait for the two beats (lub-dub). The window opens just after the second one and closes before the next.</span>'):"";
    qs("#p6pMsg").innerHTML='<b class="no">The sinew clamps down on the bar and squeals!</b> The flesh was still tense. '+m;return;}
  P.n++;P.fx=1;P.anim=40;P.busy=1;$sx("clank");$sx("creak");shake=Math.max(shake,6);p6Tone(180,0.3,"square",0.05,90);
  const done=P.n>=4;qs("#p6pMsg").innerHTML='<b class="ok">CRACK! '+(done?"The last bolt shears.":"A bolt gives way ("+P.n+"/4).")+"</b> "+P6_PRYWHY[P.n-1];qs("#p6pT").textContent="PRY THE HATCH OFF: "+P.n+" / 4";
  setTimeout(()=>{if(!P6PR)return;P.busy=0;if(done)p6PryDone();},done?1700:900);}
function p6PryClose(silent){const el=qs("#p6Pry");if(P6PR){cancelAnimationFrame(P6PR.raf);removeEventListener("keydown",P6PR.key,!0);}P6PR=null;if(!el||el.hidden)return;el.hidden=!0;modal=0;silent||toast("You let go of the crowbar. The sinew tightens again.",1800);updateGuide();}
function p6PryDone(){const S=p6S();p6PryClose(!0);S.hatch=1;S.pryN=4;$sx("crash");$sx("door");shake=Math.max(shake,12);c2Save("dome");updateGuide();c3CutStart("c5p6hatch");}
function p6PryPaint(){const cv=qs("#p6pCv");if(!cv||!P6PR)return;const g=cv.getContext("2d"),P=P6PR,T=P.t;g.imageSmoothingEnabled=!1;const F=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h);};
  const ph=p6PryPhase(),pu=p6Pulse();
  const bg=g.createLinearGradient(0,0,0,216);bg.addColorStop(0,"#2a0e1a");bg.addColorStop(1,"#10040a");g.fillStyle=bg;g.fillRect(0,0,384,216);
  for(let k=0;k<30;k++){F("rgba(255,120,170,.12)",(r(k,3111)*384)%384,(r(k,3112)*130)%130,3,2+r(k,3113)*14);}
  /* the plate, lifting as bolts break */
  const lift=P.n*4+(P.anim>0&&P.fx>0?Math.sin(P.anim/40*Math.PI)*6:0),sh=P.anim>0&&P.fx<0?(Math.random()-0.5)*2:0;
  F("#06080a",84,22,170,120);F("#2a3036",90,28,158,108);
  g.save();g.translate(0,-lift);F("#5a626a",96,34,146,96);F("#8a949c",96,34,146,4);F("#3a424a",96,124,146,6);
  [[104,44],[226,44],[104,114],[226,114]].forEach(([bx,by],q)=>{const gone=P.n>q;if(!gone){F("#2a2e34",bx-5,by-5,12,12);F("#a0a8b0",bx-2,by-2,6,6);}else{F("#04060a",bx-4,by-4,10,10);}});
  F("#1a1e22",148,70,44,10);F("#c8ccd0",152,72,36,2);
  for(let k=0;k<5;k++)F("rgba(120,56,20,.5)",110+k*24,50+(k%3)*18,3,24);
  g.restore();
  /* sinew straps: they tighten on the beat, and fall away as bolts break */
  g.lineCap="round";const tight=ph==="relax"?0:1;
  [[96,34,242,130,0],[242,34,96,130,1],[96,82,242,82,2],[170,28,170,136,3]].forEach(([x0,y0,x1,y1,q])=>{if(P.n>q&&q<4)return;g.strokeStyle="rgba(170,50,86,.95)";g.lineWidth=5+pu*3*tight;g.beginPath();g.moveTo(x0+sh,y0-lift*0.2);g.quadraticCurveTo(170,82+Math.sin(T/9+q)*3-pu*5*tight,x1,y1);g.stroke();g.strokeStyle="rgba(255,140,170,.5)";g.lineWidth=1.4;g.stroke();});
  /* the crowbar's claw under the plate edge */
  g.save();g.translate(0,-lift*0.4);F("#1a1e22",30,100,70,9);F("#7e8a96",30,101,70,5);F("#aab6c2",30,101,70,1);g.fillStyle="#1a1e22";g.beginPath();g.moveTo(96,98);g.lineTo(112,106);g.lineTo(96,114);g.fill();F("#8a98a6",96,104,10,2);g.restore();
  /* the heartbeat monitor */
  F("#04060a",16,150,352,52);F("#0a1a12",18,152,348,48);
  const cx=(i)=>20+i*344/190;g.strokeStyle="#3aff7a";g.lineWidth=1.4;g.beginPath();P.wave.forEach((v,i)=>{const x=cx(i),y=192-v*34;i?g.lineTo(x,y):g.moveTo(x,y);});g.stroke();
  F("rgba(0,0,0,.18)",18,152,348,1);for(let y=154;y<200;y+=4)F("rgba(0,0,0,.2)",18,y,348,1);
  const b=P6D.bt%96;g.font='6px "Press Start 2P",monospace';
  g.fillStyle=ph==="relax"?"#8aff9a":"#ff6a5a";g.fillText(ph==="relax"?"RELAXED: PULL NOW!":"TENSE: WAIT",24,166);
  /* the window, as a green bar that slides along under the line */
  F("#102a1a",150,156,120,6);F(ph==="relax"?"#3aff7a":"#2a5a3a",150+((b-24)/32)*0+((Math.max(24,Math.min(56,b))-24)/32)*104,156,16,6);
  g.fillStyle="#9ab0d8";g.fillText("BOLTS "+P.n+"/4",290,166);
  glowRing(g,ph==="relax");}
function glowRing(g,on){if(!on)return;g.strokeStyle="rgba(120,255,160,.5)";g.lineWidth=2;g.strokeRect(16,150,352,52);}
/* ---------------- cutscenes ---------------- */
function p6DomeMembers(){const mk=(i,x,hx,d)=>Object.assign(c10Man(i,x,0,0,{s:0.95,ph:i*13}),{hx,d,f:-1});
  P6D.mem=[mk(0,456,P6_HOLES[0],20),mk(1,478,P6_HOLES[1],60),mk(2,500,P6_HOLES[2],110),mk(3,522,P6_HOLES[3],160),{b:1,x:420,f:-1,lane:0,k:0.8,ph:3,tx:P6_BAR+40,d:0}];P6D.bar=0;}
function p6CutDome(c){const t=c.t,S=p6S();p6DomeTick();p6DomeLights();c.cx=t<260?c3Clamp(380,0,P6_DW-192):t<700?c3Clamp(260-(t-260)*0.1,0,P6_DW-192):c3Clamp(P6_BAR-60,0,P6_DW-192);if(t>=700&&t<1000)c.cx=c3Clamp(P6_BAR-70,0,P6_DW-192);
  if(t===1){p6DomeMembers();P6D.hat=0;}
  if(t===2){$sx("stinger");tnCap("The Dome. It's alive… the walls are muscle, and it's all stitched together with car wrecks and rubble.");}
  if(t===260)tnCap("And they're splitting up. One by one, into holes in the wall.");
  if(t===560)tnCap("Every one of them knows exactly where it's going.");
  if(t===740)tnCap("The big one is heading for the far wall…");
  if(t===900){$sx("rumble");tnCap("The wall OPENED for it. And it's already closing again.");}
  if(t===1080)tnCap("That has to be the way to the next chamber. And it's a wall of living flesh.");
  if(t>=1260){tnCap("");c.cx=null;S.dscene=1;S.dome=1;P6D.mem=[];c3CutEnd();c2Save("dome");updateGuide();toast("<b>THE FLESH WALL</b><br>Walk to the pulsing wall on the LEFT and see if you can get through.",5200);}}
function p6CutBar(c){const t=c.t,S=p6S();p6DomeTick();p6DomeLights();c.cx=null;
  if(t===2){$sx("click");tnCap("It's warm. And it's breathing.");}
  if(t===150){$sx("hit");shake=Math.max(shake,3);tnCap("I punch it. My fist just sinks in… and it holds on.");}
  if(t===330){$sx("empty");tnCap("The Venom Blaster is still jammed. And venom wouldn't hurt something that grows on venom.");}
  if(t===520){$sx("clank");tnCap("I jam the crowbar in. The wall squeezes it so hard I nearly lose it!");}
  if(t===700)tnCap("No way through. There has to be another way round. Places like this always have an emergency route.");
  if(t>=900){tnCap("");S.bartried=1;c3CutEnd();c2Save("dome");updateGuide();toast("<b>ANOTHER WAY</b><br>Look for an <b>emergency route</b> sign on the back wall, to the RIGHT.",5200);}}
function p6CutHatch(c){const t=c.t;p6DomeTick();p6DomeLights();c.cx=c3Clamp(P6_HATCH-96,0,P6_DW-192);
  if(t===1){player.x=P6_HATCH-30;player.face=1;}
  if(t===2){$sx("crash");tnCap("The plate tears off with a scream of metal, and a gust of stale, cold air hits my face.");}
  if(t===200)tnCap("A ladder, going down into total blackness.");
  if(t===380)tnCap("No other way. I'm going down.");
  if(t>=520){tnCap("");c3CutEnd();c7Go("dark","dome");}}
function p6CutDown(c){const t=c.t;p6DomeTick();p6DomeLights();c.cx=c3Clamp(P6_HATCH-96,0,P6_DW-192);if(t===2)tnCap("Down the ladder again.");if(t>=90){tnCap("");c3CutEnd();c7Go("dark","dome");}}
{const _c=c5Cut;c5Cut=function(c){if(c.k==="c5p6dome")return p6CutDome(c);if(c.k==="c5p6bar")return p6CutBar(c);if(c.k==="c5p6hatch")return p6CutHatch(c);if(c.k==="c5p6down")return p6CutDown(c);return _c(c);};}
{const _s=c5Skip;c5Skip=function(c){if(c.k==="c5p6dome"){c.t=Math.max(c.t,1259);return;}if(c.k==="c5p6bar"){c.t=Math.max(c.t,899);return;}if(c.k==="c5p6hatch"){c.t=Math.max(c.t,519);return;}if(c.k==="c5p6down"){c.t=Math.max(c.t,89);return;}return _s(c);};}
/* ---------------- plumbing ---------------- */
{const _s=c7Step;c7Step=function(){if(room==="dome"){C5.t++;p6DomeStep();return;}return _s();};}
{const _u=c7Use;c7Use=function(e){if(room==="dome")return p6DomeUse(e);return _u(e);};}
{const _e=c7Enter;c7Enter=function(t){if(t!=="dome")return _e(t);const S=p6S();C3.lie=0;C7G=null;C5GN=null;C5PR=null;C5TR=null;C5CK=null;P6.hide=0;P6.al=0;P6D.mem=[];P6D.bar=0;
  player.y=C2_FLOOR;player.face=-1;player.x=S.from==="dark"?P6_HATCH+24:P6_DW-70;camX=c3Clamp(player.x-96,0,P6_DW-192);const from=S.from;S.from="";
  if(!S.dscene){S.dscene=0;c2Save("dome");c3CutStart("c5p6dome");}updateGuide();};}
{const _b=c7Back;c7Back=function(){if(room==="dome")return p6DomeBack();return _b();};}
{const _f=c7Front;c7Front=function(){if(room==="dome")return p6DomeFront();return _f();};}
{const _t=c7Tint;c7Tint=function(){if(room==="dome")return p6DomeTint();return _t();};}
{const _w=c7Walls;c7Walls=function(){if(room==="dome"){const S=p6S();const lo=S.dscene?P6_BAR+26:P6_BAR+26;if(player.x<lo){player.x=lo;player.vx=0;}if(player.x>P6_DW-6)player.x=P6_DW-6;return!0;}return _w();};}
{const _g=c7Guide;c7Guide=function(){if(room==="dome")return p6DomeGuide();return _g();};}
{const _a=c7Arrow;c7Arrow=function(){if(room==="dome")return p6DomeArrow();return _a();};}
{const _x=c5Esc;c5Esc=function(){const e=qs("#p6Pry");if(e&&!e.hidden){p6PryClose();return!0;}return _x();};}
{const _x=c5CloseAll;c5CloseAll=function(){const e=qs("#p6Pry");if(e&&!e.hidden)p6PryClose(!0);return _x();};}
/* the walls of the dome are a different tile set: hide the street's lamp posts etc. by routing the tile painter above */
{const _e=c7Enter;c7Enter=function(t){const S=p6S(),from=S.from;_e(t);if(t==="fol"&&from==="dome"){player.x=40;player.face=1;camX=c3Clamp(player.x-96,0,P6_FW-192);P6.f.ws="gone";P6.f.gx=-100;}};}
