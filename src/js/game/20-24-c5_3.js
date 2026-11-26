
/* ---------------- below decks: the motor room ---------------- */
function c5MotorStep(){const S=c5S(),sm=S.sim,c=S.cl,black=sm.black&&!S.gen.run;
  if(C5GN&&C5GN.step===1)return;
  c5Pick((it)=>{const id=it.id,k=id.slice(3).split(":")[0],i=+(id.split(":")[1]||0);
    if(k==="ladder")return{r:16,label:"GO UP"};
    if(k==="lever"){if(sm.jam&&!c.off)return{r:15,label:"STOP ENGINE"};if(sm.jam&&c.off&&c.n>=6&&!c.done)return{r:15,label:"START ENGINE"};return null;}
    if(k==="panel")return sm.jam&&c.off&&!c.open?{r:17,label:"OPEN PANEL"}:null;
    if(k==="tg")return sm.jam&&c.open&&c.tg[i]&&!C5.carry?{r:11,label:"PULL"}:null;
    if(k==="bucket")return sm.jam&&c.open?{r:15,label:C5.carry?"DROP IN BUCKET":"BUCKET "+c.n+"/6"}:null;
    if(k==="gen")return black?{r:18,label:"REPAIR GENERATOR"}:null;
    if(k==="belt")return black&&!S.mat.belt?{r:12,label:"TAKE BELT"}:null;
    if(k==="wire")return black&&!S.mat.wire?{r:12,label:"TAKE WIRE"}:null;
    if(k==="fuse")return black&&!S.mat.fuse?{r:12,label:"TAKE FUSE"}:null;return null;});}
function c5MotorUse(k,i){const S=c5S(),sm=S.sim,c=S.cl;
  if(k==="hatch"){if(!(sm.jam||(sm.black&&!S.gen.run)))return;$sx("door");fadeTo=1;onFaded=()=>{enterRoom("motor","R");};return;}
  if(k==="ladder"){$sx("click");fadeTo=1;onFaded=()=>{enterRoom("helm","R");};return;}
  if(k==="lever"){
    if(sm.jam&&!c.off)return c3Task("gather",345,26,()=>{c.off=1;$sx("clank");shake=6;updateGuide();toast("<b>ENGINE OFF.</b><br>Safety first: never reach into a spinning shaft. Switch the engine off and wait for it to stop.",4200);},"#8a8a90");
    if(sm.jam&&c.off&&c.n>=6&&!c.done)return c3Task("gather",345,26,()=>{c.done=1;c.off=0;sm.jam=0;sm.jams++;$sx("success");updateGuide();
      toast("<b>ENGINE RUNNING AGAIN!</b><br>Seaweed and lost fishing nets wrap round a spinning propeller shaft and jam it. Clearing them and stopping the engine first keeps your hands safe. Climb back up and keep steering.",6000);c5CP("motor","Engine cleared");},"#8a8a90");return;}
  if(k==="panel")return c3Task("gather",165,36,()=>{c.open=1;$sx("clank");updateGuide();toast("<b>ACCESS PANEL OPEN.</b><br>There it is: seaweed and torn fishing nets, wound round the propeller shaft. Pull out the tangles and drop them in the bucket.",4200);},"#8a8a90");
  if(k==="tg"){if(!c.off){$sx("locked");toast("<b>STOP THE ENGINE FIRST!</b><br>A spinning shaft would grab your hand.",2400);return;}
    return c3Task("gather",[95,120,145,185,210,235][i],34,()=>{c.tg[i]=0;C5.carry=1;S.carry=1;$sx("scratch");toast("<b>A TANGLE OF "+(i%2?"NET":"SEAWEED")+".</b> Carry it to the bucket on the far LEFT.",2400);updateGuide();},i%2?"#8a9a8a":"#3a6a2a");}
  if(k==="bucket"){if(!C5.carry){toast("<b>BUCKET:</b> "+c.n+"/6 tangles. Pull the tangles off the shaft and bring them here.",2200);return;}
    return c3Task("gather",34,16,()=>{C5.carry=0;S.carry=0;c.n++;$sx("pickup");updateGuide();toast(c.n>=6?"<b>ALL CLEAR!</b> Now restart the engine at the lever on the far RIGHT.":"<b>IN THE BUCKET ("+c.n+"/6).</b>"+(c.n===1?" Waste goes in the bucket, never back in the sea: nets and plastic drift for years and trap animals.":""),c.n>=6?3600:2600);},"#8a9a8a");}
  if(k==="belt")return c3Task("gather",262,24,()=>{S.mat.belt=1;c5MGive("gbelt","<b>A RUBBER DRIVE BELT.</b><br>A loop of tough rubber. It will carry the engine's spin to the generator by friction.");},"#2a2a2a");
  if(k==="wire")return c3Task("gather",58,24,()=>{S.mat.wire=1;c5MGive("gwire","<b>A SPOOL OF COPPER WIRE.</b><br>Copper conducts electricity very well, which is why wires are made of it.");},"#c87a3a");
  if(k==="fuse")return c3Task("gather",326,24,()=>{S.mat.fuse=1;c5MGive("gfuse","<b>A FUSE.</b><br>A tiny glass tube with a thin wire inside, a deliberate weak link.");},"#c8c8c0");
  if(k==="gen"){const m=S.mat;if(!(m.belt&&m.wire&&m.fuse)){$sx("locked");const need=[];!m.belt&&need.push("a <b>rubber belt</b>");!m.wire&&need.push("<b>copper wire</b>");!m.fuse&&need.push("a <b>fuse</b>");toast("<b>THE GENERATOR IS DEAD.</b><br>The belt has snapped, the coil wire is burnt through and the fuse is blown. You need "+need.join(", ")+". Look around the room.",4200);return;}c5GenOpen();}}
function c5MGive(id,msg){inv.includes(id)||inv.push(id);got.add(id);$sx("pickup");updateBag();updateGuide();c2Save("motor");toast(msg,3600);}
/* ---------------- repairing the generator ---------------- */
var C5_GPART={belt:{n:"RUBBER BELT",slot:"belt",role:"BETWEEN ENGINE AND ROTOR"},wire:{n:"COPPER WIRE",slot:"wire",role:"AROUND THE STATOR CORE"},fuse:{n:"FUSE",slot:"fuse",role:"IN THE FUSE HOLDER"}};
var C5_GWRONG={"belt>wire":"The belt is a loop of rubber. It can't carry electricity: it belongs where it can turn something.","belt>fuse":"A belt doesn't go in the fuse holder: it's made to loop round two wheels and transfer spin.","wire>belt":"A belt has to be a loop of rubber. Bare copper would cut straight through and snap.","wire>fuse":"The fuse holder takes a fuse. The long coil goes where the changing magnetic field passes through it.","fuse>belt":"A fuse is a tiny glass tube: it can't turn anything.","fuse>wire":"The coil has to be a long winding of wire. A fuse is a short deliberate weak link in the circuit."};
var C5_GSCI={belt:"<b>THE BELT:</b> the engine's spin has to reach the rotor. A rubber belt grips both wheels by <b>friction</b> and carries the rotation across.",wire:"<b>THE COIL:</b> a long winding of copper wire (the stator). When the rotor's magnet spins past, the changing magnetic field pushes electrons along the wire: <b>electromagnetic induction</b>. More turns of wire or a faster spin gives more voltage.",fuse:"<b>THE FUSE:</b> a thin wire that melts if too much current flows, cutting the circuit before the cables overheat. A deliberate weak link."};
function c5GenOpen(){const S=c5S();c5Css();
  const el=c5Overlay("#c5Gen",'<div class="gcard c4card"><h3>THE EMERGENCY GENERATOR</h3><canvas id="c5gCv" width="384" height="216" aria-label="A generator cutaway: an engine drives a belt that spins a magnet inside a coil of wire"></canvas><div class="c4lay" id="c5gB"></div><div id="c5gMsg" aria-live="polite"></div><div class="btns"><button class="gbtn alt" id="c5gOk">LATER</button></div></div>');
  modal=4;el.hidden=!1;C5GN={step:0,sel:null,placed:{belt:0,wire:0,fuse:0},rpm:0,hold:0,ang:0,t:0,start:0};
  qs("#c5gOk").onclick=c5GenClose;el.onclick=(ev)=>{const b=ev.target.closest&&ev.target.closest("[data-c5g]");b&&!b.disabled&&c5GenAct(b.dataset.c5g);};
  c5GenDraw("Something's wrong at every stage of this generator. <b>Place each repair part</b> where it belongs, then start it.");
  el.__stop=()=>{if(C5GN)cancelAnimationFrame(C5GN.raf);};const loop=()=>{if(!C5GN)return;C5GN.raf=requestAnimationFrame(loop);if(window.__evoPaused)return;c5GenTick();c5GenPaint();};C5GN.raf=requestAnimationFrame(loop);$sx("click");}
function c5GenDraw(msg){const G=C5GN;if(!G)return;const b=(a,l,dis)=>'<button class="gbtn alt" data-c5g="'+a+'"'+(dis?" disabled":"")+">"+l+"</button>";let h="";
  if(G.step===0){if(!G.sel)Object.keys(C5_GPART).forEach((k)=>{G.placed[k]||(h+=b("pick:"+k,C5_GPART[k].n));});else{Object.keys(C5_GPART).forEach((k)=>{G.placed[k]||(h+=b("slot:"+k,C5_GPART[k].role));});h+=b("back","BACK");}}
  else if(G.step===1)h+='<button class="gbtn" data-c5g="pull">PULL THE STARTER CORD!</button>';
  else if(G.step===2)h+='<button class="gbtn" data-c5g="on">SWITCH THE POWER ON</button>';
  qs("#c5gB").innerHTML=h;msg!=null&&(qs("#c5gMsg").innerHTML=msg);c5GenPaint();const nb=qs("#c5gB button");nb&&setTimeout(()=>nb.focus(),10);}
function c5GenAct(a){const G=C5GN,S=c5S();if(!G)return;$sx("click");
  if(a.slice(0,5)==="pick:"){G.sel=a.slice(5);return c5GenDraw("Where does the <b>"+C5_GPART[G.sel].n.toLowerCase()+"</b> go?");}
  if(a==="back"){G.sel=null;return c5GenDraw("");}
  if(a.slice(0,5)==="slot:"){const slot=a.slice(5),k=G.sel;if(k!==slot){$sx("locked");G.sel=null;return c5GenDraw('<b class="no">Not quite.</b> '+C5_GWRONG[k+">"+slot]);}
    G.placed[k]=1;G.sel=null;$sx("pickup");const done=Object.values(G.placed).every(Boolean);
    if(done){G.step=1;return c5GenDraw('<span class="ok"><b>ALL THREE FITTED.</b></span><br>'+C5_GSCI[k]+"<br><br>Now <b>pull the starter cord</b> to spin the engine. Keep the RPM in the <b>green</b> band for 3 seconds.");}
    return c5GenDraw('<span class="ok"><b>FITTED.</b></span> '+C5_GSCI[k]);}
  if(a==="pull"){G.rpm=Math.min(110,G.rpm+9);$sx("click");return;}
  if(a==="on"){c5GenClose(!0);c3CutStart("c5power");fadeTo=1;onFaded=()=>{enterRoom("helm","R");};}}
function c5GenTick(){const G=C5GN;if(!G)return;G.t++;
  if(G.step===1){G.rpm=Math.max(0,G.rpm-0.42);G.ang+=G.rpm*0.012;const inz=G.rpm>=60&&G.rpm<=92;if(inz)G.hold++;else G.hold=Math.max(0,G.hold-2);
    if(G.hold>=180){G.step=2;$sx("success");c5GenDraw('<b class="ok">IT\'S RUNNING!</b> The faster the magnet spins past the coil, the more voltage it makes: at about 60 revolutions it makes enough to power the ship. <b>Electromagnetic induction</b> turns motion into electricity. Switch the power on!');}}
  else if(G.step===2)G.ang+=0.3;}
function c5GenClose(silent){const el=qs("#c5Gen");if(C5GN&&C5GN.raf)cancelAnimationFrame(C5GN.raf);C5GN=null;if(!el||el.hidden)return;el.hidden=!0;modal=0;updateGuide();}
function c5GenPaint(){const cv=qs("#c5gCv");if(!cv||!C5GN)return;const g=cv.getContext("2d"),G=C5GN;g.imageSmoothingEnabled=!1;const F=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h);};
  const bg=g.createLinearGradient(0,0,0,216);bg.addColorStop(0,"#1a120c");bg.addColorStop(1,"#0a0806");g.fillStyle=bg;g.fillRect(0,0,384,216);
  F("#2a2a2e",14,150,356,54);F("#4a4a50",14,150,356,3);for(let x=18;x<366;x+=24){F("#8a8a90",x,156,3,3);F("#8a8a90",x,196,3,3);}
  /* the engine on the left */
  F("#101012",20,60,70,88);F("#5a3a28",22,62,66,84);F("#8a5a3a",22,62,66,4);for(let k=0;k<5;k++)F("#3a2418",28+k*12,70,6,70);for(let k=0;k<22;k++)F(r(k,1921)<0.5?"#c8662a":"#3a2010",24+r(k,1922)*60,66+r(k,1923)*76,2+r(k,1924)*4,1);
  g.fillStyle="#6a6a70";g.beginPath();g.arc(100,104,12+Math.sin(G.ang*2)*0.8,0,7);g.fill();g.fillStyle="#2a2a2e";g.beginPath();g.arc(100,104,5,0,7);g.fill();
  /* the belt */
  if(G.placed.belt){g.strokeStyle="#1a1a1c";g.lineWidth=7;g.beginPath();g.moveTo(100,92);g.lineTo(210,86);g.moveTo(100,116);g.lineTo(210,122);g.stroke();g.strokeStyle="#3a3a3e";g.lineWidth=3;g.beginPath();g.moveTo(100,92);g.lineTo(210,86);g.stroke();g.beginPath();g.moveTo(100,116);g.lineTo(210,122);g.stroke();
    g.setLineDash([4,4]);g.lineDashOffset=-G.ang*14;g.strokeStyle="#6a6a70";g.lineWidth=1;g.beginPath();g.moveTo(100,92);g.lineTo(210,86);g.stroke();g.setLineDash([]);}
  else{g.strokeStyle="#3a3a3e";g.lineWidth=3;g.beginPath();g.moveTo(112,98);g.quadraticCurveTo(146,70,134,128);g.stroke();g.setLineDash([3,3]);g.strokeStyle="rgba(255,120,80,.8)";g.lineWidth=1;g.beginPath();g.moveTo(112,92);g.lineTo(204,86);g.stroke();g.setLineDash([]);}
  /* the alternator: rotor magnet inside a stator coil */
  F("#101012",196,56,120,100);F("#4a5258",198,58,116,96);F("#7a828a",198,58,116,3);
  g.fillStyle="#1a1e22";g.beginPath();g.arc(256,104,40,0,7);g.fill();g.fillStyle="#2a3038";g.beginPath();g.arc(256,104,36,0,7);g.fill();
  if(G.placed.wire){for(let a=0;a<12;a++){const an=a/12*6.283;g.fillStyle=a%2?"#c87a3a":"#e8964a";g.fillRect(256+Math.cos(an)*32-4,104+Math.sin(an)*32-4,8,8);}g.strokeStyle="#e8964a";g.lineWidth=2;g.beginPath();g.arc(256,104,32,0,7);g.stroke();}
  else{for(let a=0;a<12;a++){if(a===3)continue;const an=a/12*6.283;g.fillStyle="#6a3a1a";g.fillRect(256+Math.cos(an)*32-3,104+Math.sin(an)*32-3,6,6);}g.fillStyle="#ff6a3a";g.fillRect(256+Math.cos(0.5*3.14)*32-4+14,104+32-4,8,8);}
  g.save();g.translate(256,104);g.rotate(G.ang);F("#c8342a",-6,-22,12,22);F("#3a6ad8",-6,0,12,22);F("#ffffff",-6,-22,12,2);F("#ffffff",-6,20,12,2);F("#8a8a90",-3,-3,6,6);g.restore();
  g.font='5px "Press Start 2P",monospace';g.fillStyle="#c8d0d8";g.fillText("N",252,64);g.fillText("S",252,148);g.fillStyle="#9ab0d8";g.fillText("ENGINE",34,56);g.fillText("ROTOR (MAGNET)",206,50);
  /* the fuse and output cable */
  F("#2a2a2e",326,90,40,28);F("#4a4a50",326,90,40,3);if(G.placed.fuse){F("#c8d8e0",334,98,24,10);F("#8a8a90",332,98,3,10);F("#8a8a90",357,98,3,10);F("#ffd23a",337,102,18,1.5);}else{F("#14141a",334,98,24,10);}
  g.fillStyle="#9ab0d8";g.fillText("FUSE",334,126);F("#1a1a1c",366,102,12,4);F("#c8a030",368,103,8,2);
  /* starter: rpm gauge and voltage when it is time to pull */
  if(G.step>=1){const rx=40,ry=170;F("#04060a",rx-2,ry-2,204,14);F("#2a3440",rx,ry,200,10);F("#2a8a3a",rx+200*60/110,ry,200*32/110,10);F(G.rpm>=60&&G.rpm<=92?"#aaffaa":"#ffd23a",rx+200*Math.min(1,G.rpm/110)-3,ry-3,6,16);
    g.fillStyle="#ffe070";g.fillText("RPM "+Math.round(G.rpm)+"   OUTPUT: "+Math.round(G.rpm*0.2)+" V (needs 12 V)",rx,ry+26);F("#04060a",rx-2,ry+32,204,8);F("#2a8a3a",rx,ry+34,200*Math.min(1,G.hold/180),4);}
  if(G.step===2)for(let k=0;k<6;k++){F("#ffe070",326+((G.t*3+k*9)%40),110+Math.sin(G.t/4+k)*4,3,2);}}
