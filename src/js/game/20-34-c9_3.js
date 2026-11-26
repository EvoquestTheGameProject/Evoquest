/* ======================= CHAPTER 3, PART 4: THE SCIENTIST IN THE CORNER, AND WHAT A HYPOTHESIS IS =======================
   After the time-machine memory, a lamp flickers on in the far corner of the hidden lab. The chief scientist who
   recorded the archive is there, long gone, still holding his notebook. Its last entry is a HYPOTHESIS: the Evolution
   is sending its monsters to guard the time machine's parts. Then the player learns what a hypothesis is. */
var C9S_X=296,C9_HQ=null;C9.lampT=0;
rooms.tlab.ints.push({id:"c5_lsci",x:C9S_X,r:0,label:"CHECK THE CORNER"});
const C9_STEPS=[["obs","OBSERVE","The Evolved don't wander any more. They gather in the same few places and stay there."],["q","ASK A QUESTION","What are they guarding?"],["hyp","HYPOTHESIS","IF the Evolution sends them to guard the time machine parts, THEN the most Evolved will be where the parts are."],["test","TEST IT","Watch the old power plant for two nights and count the Evolved."],["res","RESULTS","Three times more Evolved at the plant than in the town."],["con","CONCLUSION","The hypothesis is SUPPORTED, not proven. Test the other sites too."]];
const C9_QUIZ=[
  {q:"Which one of these is a HYPOTHESIS?",a:[["Monsters are scary.",0,"That's an opinion. You can't test it, because \"scary\" is different for everyone."],["If a plant gets more sunlight, then it will grow taller.",1,"Yes! It's a smart guess you can TEST: grow two plants, give one more light, and measure them."],["The sky is blue.",0,"That's an observation, something you can already see. A hypothesis is a guess that still needs testing."]]},
  {q:"Dr. Morrow counted three times more Evolved at the plant. What should he write?",a:[["My hypothesis is PROVEN forever.",0,"Careful! One test can't prove something forever. Another test might show something new."],["My hypothesis is SUPPORTED. I should test more places.",1,"Exactly. Good results SUPPORT a hypothesis. Scientists keep testing to be more sure."],["My hypothesis is wrong.",0,"No: the results matched his prediction, so they support it."]]},
  {q:"A test shows the OPPOSITE of what you predicted. What does a good scientist do?",a:[["Hide the result and pretend it didn't happen.",0,"Never! Every result teaches you something, even a surprising one."],["Give up on science.",0,"No way. A \"wrong\" hypothesis is still useful: now you know what ISN'T true."],["Change the hypothesis, then test it again.",1,"Yes! That's how science works: guess, test, learn, improve, and test again."]]}];
/* ---------------- the corner: a lamp that flickers on after the memory, and the scientist ---------------- */
function c9LampOn(){const S=c7S();return!!(S.tm||C9.lampT>0);}
function c9Lamp(){const S=c7S();if(!c9LampOn())return 0;const t=tick;if(C9.lampT>0&&C9.lampT<90)return(C9.lampT%9<4||C9.lampT>70)?1:0.15;const f=Math.sin(t/31)*Math.sin(t/7.3);return f>0.92?0.35:0.9+0.1*Math.sin(t/5);}
function c9Corner(){const S=c7S(),g=C2_FLOOR,x=C9S_X;if(x<camX-40||x>camX+232)return;
  /* the dark alcove */
  fill("rgba(0,0,0,.55)",x-26,0,48,g);
  const L=c9Lamp();
  /* the hanging lamp */
  fill("#06080a",x-0.5,0,1,16);fill("#2a2e32",x-4,16,8,3);fill(L>0.5?"#fff0c0":"#3a3428",x-2.5,19,5,1.6);
  if(L>0){ctx.save();ctx.globalAlpha=0.16*L;ctx.fillStyle="#ffe6a8";ctx.beginPath();ctx.moveTo(x-2,20);ctx.lineTo(x+2,20);ctx.lineTo(x+22,g);ctx.lineTo(x-22,g);ctx.closePath();ctx.fill();ctx.restore();glow(x,20,22,"255,230,170",0.35*L);glow(x,g-6,26,"255,220,160",0.18*L);}
  if(!c9LampOn())return;
  const a=Math.max(0.25,L);ctx.save();ctx.globalAlpha=a;
  /* sketches pinned on the wall: the three parts, with red marks */
  [[x-20,34,"core"],[x-8,30,"coil"],[x+4,36,"clock"]].forEach(([px,py,k])=>{fill("#d8ccb0",px,py,10,12);fill("#b8ac90",px,py,10,1);fill("#a83a2a",px+4.5,py-1,1,1.4);
    if(k==="core"){fill("#3a4a6a",px+3,py+3,4,4);fill("#6aa0e0",px+4,py+4,2,2);}
    if(k==="coil")for(let q=0;q<4;q++)fill("#3a4a6a",px+2,py+2.5+q*2,6,0.8);
    if(k==="clock"){ctx.strokeStyle="#3a4a6a";ctx.lineWidth=0.6;ctx.beginPath();ctx.arc(px+5,py+6,3.2,0,7);ctx.stroke();fill("#3a4a6a",px+4.7,py+3.6,0.6,2.6);}
    fill("#c83a2a",px+1,py+9.5,3,0.7);fill("#c83a2a",px+6,py+9.5,3,0.7);});
  ctx.strokeStyle="rgba(200,58,42,.7)";ctx.lineWidth=0.5;ctx.beginPath();ctx.moveTo(x-10,40);ctx.lineTo(x-8,40);ctx.moveTo(x+2,42);ctx.lineTo(x+4,42);ctx.stroke();
  /* the scientist, sitting against the racks with his head bowed, as if asleep (drawn 1.5x around his seat) */
  ctx.save();ctx.translate(x+4,g);ctx.scale(1.5,1.5);
  fill("rgba(0,0,0,.45)",-15,-0.3,28,1.4);
  fill("#262a36",-11,-2.6,12,2.6);fill("#323646",-11,-2.6,12,0.7);fill("#1a1410",-13.6,-3.2,2.8,3.2);fill("#3a2a1e",-13.6,-0.6,3.2,0.6);
  ctx.strokeStyle="#2c3040";ctx.lineWidth=2.6;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(0,-3);ctx.lineTo(-5,-8.4);ctx.lineTo(-8.4,-1.6);ctx.stroke();fill("#1a1410",-10.6,-2.4,3,2.4);
  ctx.fillStyle="#d4d8dc";ctx.beginPath();ctx.moveTo(-2,0);ctx.lineTo(9,0);ctx.lineTo(9,-15);ctx.lineTo(4.5,-16.8);ctx.lineTo(1,-13.4);ctx.lineTo(-1,-4.4);ctx.closePath();ctx.fill();
  fill("#a8aeb6",7,-15,2,15);fill("#bcc2c8",-2,-1.2,4,1.2);ctx.strokeStyle="#9aa0a8";ctx.lineWidth=0.5;ctx.beginPath();ctx.moveTo(4.4,-16.4);ctx.lineTo(2.4,-9);ctx.moveTo(5.6,-8);ctx.lineTo(5.6,-2);ctx.stroke();
  fill("#e8ecef",3,-16.4,3,1);fill("#3a5a7a",3.6,-15.6,1.2,5.2);fill("#e0e8f0",5.6,-12.6,2.2,2.8);fill("#c83a2a",5.6,-12.6,2.2,0.7);fill("#3a4a6a",6,-11.2,1.4,0.4);
  ctx.strokeStyle="#c4c8ce";ctx.lineWidth=2.2;ctx.beginPath();ctx.moveTo(3.4,-14);ctx.lineTo(0,-8.6);ctx.lineTo(-3.2,-6.6);ctx.stroke();fill("#d0a080",-4.8,-7.4,1.8,1.8);
  fill("#5a3020",-9,-7.4,5.6,3.8);fill("#e8dcb8",-8.4,-7,4.6,0.9);fill("#8a4a30",-9,-7.4,0.8,3.8);
  ctx.fillStyle="#d0a080";ctx.beginPath();ctx.ellipse(2.6,-18.4,2.4,2.6,0.5,0,7);ctx.fill();
  ctx.fillStyle="#9a9aa0";ctx.beginPath();ctx.ellipse(3.8,-19.6,2.6,2,0.5,0,7);ctx.fill();fill("#b8b8be",3.2,-21.2,2.4,0.8);fill("#b88a68",4.6,-18.4,0.9,1.3);fill("#7a5a48",0.8,-17.4,1.6,0.5);
  ctx.restore();
  const nb=S.hyp?0:0.5+0.5*Math.sin(tick/9);nb>0.55&&glow(x-5,g-8,9,"255,240,190",0.3*nb*a);
  /* his glasses on the floor */
  ctx.strokeStyle="#aab4bc";ctx.lineWidth=0.5;ctx.beginPath();ctx.arc(x-24,g-0.9,0.9,0,7);ctx.moveTo(x-20.7,g-0.9);ctx.arc(x-21.6,g-0.9,0.9,0,7);ctx.stroke();
  /* dust and a cobweb */
  ctx.strokeStyle="rgba(220,225,230,.35)";ctx.lineWidth=0.3;ctx.beginPath();ctx.moveTo(x+18,0);ctx.lineTo(x+8,8);ctx.moveTo(x+18,4);ctx.lineTo(x+11,4);ctx.moveTo(x+18,8);ctx.lineTo(x+14,1);ctx.stroke();
  ctx.restore();}
{const _l=c9LabBack;c9LabBack=function(){_l();c9Corner();};}
/* ---------------- routing ---------------- */
{const _p=c9LabPick;c9LabPick=function(){const S=c7S();c5Pick((it)=>{const k=it.id.slice(3);if(k==="lup")return{r:16,label:"GO UP"};if(k==="lscr")return{r:22,label:"WATCH THE ARCHIVE"};if(k==="lnote")return{r:16,label:"READ THE LOG"};
  if(k==="lsci")return S.tm?{r:18,label:S.sci?"READ THE NOTEBOOK":"CHECK THE CORNER"}:null;return null;});};}
{const _u=c7Use;c7Use=function(e){const k=e.id.slice(3),S=c7S();if(room==="tlab"&&k==="lsci"){if(C3.cut||C3.task)return!0;if(!S.tm)return!0;if(!S.sci)c3CutStart("c5sci");else c9NoteOpen();return!0;}return _u(e);};}
{const _s=c7Step;c7Step=function(){if(room==="tlab"&&C9.lampT>0)C9.lampT++;return _s();};}
{const _g=c7Guide;c7Guide=function(){const S=c7S();if(room==="tlab"&&S.tm&&!S.hyp){const g=qs("#ggb");qs("#gg h4 span").textContent="QUEST";
  g.innerHTML=!S.sci?"<b>A lamp came on in the far corner.</b><br>Someone is sitting there. Walk RIGHT and check.":"<b>Read Dr. Morrow's notebook.</b><br>His last page is a <b>hypothesis</b>.";return!0;}
  if(room==="tlab"&&S.hyp){const g=qs("#ggb");qs("#gg h4 span").textContent="QUEST";g.innerHTML="<b>Find the time machine parts.</b><br>They are guarded by the Evolved.";return!0;}return _g();};}
{const _a=c7Arrow;c7Arrow=function(){const S=c7S();if(room==="tlab"&&S.doc){if(modal||won||dead||C3.cut||C3.busy||C9.doc||!S.tm||S.hyp)return;const t=C9S_X;if(Math.abs(t-player.x)<22)return;const d=t>player.x?1:-1;vo(player.x+d*16,player.y-44,d);return;}return _a();};}
{const _x=c5Esc;c5Esc=function(){for(const id of["#c9Note","#c9Hyp"]){const e=qs(id);if(e&&!e.hidden){id==="#c9Note"?c9NoteClose():c9HypClose();return!0;}}return _x();};}
/* ---------------- after the memory: back to the lab instead of straight to the end card ---------------- */
c9CutAfter=function(c){const t=c.t,S=c7S();c.cx=null;
  if(t===2)tnCap("So that's what happened while I slept. Sample 07… the Evolved… all of it.");
  if(t===230)tnCap("And the satellites went dark only thirty minutes ago. That was no accident.");
  if(t===450){$sx("stinger");tnCap("…Hold on. That old movie…");}
  if(t===600){tnCap("");c.wait=1;c9Mem(()=>{C3.cut=null;tnBars(0);qs("#cskip").hidden=!0;const first=!S.tm;S.tm=1;c2Save("tlab");fadeNow=1;
    if(S.hyp){S.done=1;c7End();return;}updateGuide();if(first){C9.lampT=1;c3CutStart("c5lamp");}});}};
function c9CutLamp(c){const t=c.t,S=c7S();c.cx=t<60?null:c3Clamp(C9S_X-110,0,C9_LW-192);
  if(t===8){$sx("click");C9.lampT=Math.max(C9.lampT,1);}
  if(t===40)$sx("blip");
  if(t===70){player.face=1;tnCap("What was that? A lamp just came on, in the far corner…");}
  if(t===260){$sx("stinger");tnCap("There's someone sitting there.");}
  if(t>=420){tnCap("");c3CutEnd();updateGuide();toast("<b>THE CORNER</b><br>Walk RIGHT to the lamp and check the corner.",4200);}}
function c9CutSci(c){const t=c.t,S=c7S();c.cx=c3Clamp(C9S_X-110,0,C9_LW-192);
  if(t===1){C9.look0=playerLook;tnCap("Hello? Are you okay? Can you hear me?");}
  if(t<60){player.x+=(C9S_X-40-player.x)*0.1;player.face=1;}
  if(t===200){C9.look0&&(playerLook=Object.assign({},C9.look0,{fc:8}));tnCap("He isn't moving. He's been gone a long time… he looks like he just fell asleep here.");}
  if(t===430){$sx("card");tnCap("His badge says DR. ELIAS MORROW, CHIEF SCIENTIST. He's the one who recorded the archive.");}
  if(t===660){tnCap("He stayed down here, so someone would find out the truth. Thank you, Doctor.");}
  if(t===860){C9.look0&&(playerLook=C9.look0);tnCap("He's still holding his notebook. The last page says HYPOTHESIS in big letters…");}
  if(t>=1060){tnCap("");if(C9.look0){playerLook=C9.look0;C9.look0=null;}S.sci=1;c2Save("tlab");c3CutEnd();updateGuide();c9NoteOpen();}}
function c9CutThink(c){const t=c.t,S=c7S();c.cx=null;
  if(t===2){$sx("stinger");tnCap("Monsters guarding every part… sent by the Evolution.");}
  if(t===220)tnCap("So it knows. It knows a time machine could undo everything, and it's trying to stop anyone from building one.");
  if(t===470)tnCap("He wrote HYPOTHESIS in big letters. But what exactly IS a hypothesis?");
  if(t>=650){tnCap("");c3CutEnd();c9HypOpen();}}
function c9CutHypEnd(c){const t=c.t,S=c7S();c.cx=null;
  if(t===2)tnCap("Okay. Then here's MY hypothesis:");
  if(t===170){$sx("success");tnCap("IF I find the parts the Evolved are guarding, THEN I can build a real time machine… and go back to save the past.");}
  if(t===460)tnCap("Time to test it.");
  if(t>=600){tnCap("");c3CutEnd();S.done=1;c2Save("tlab");fadeNow=1;c7End();}}
{const _c=c5Cut;c5Cut=function(c){if(c.k==="c5lamp")return c9CutLamp(c);if(c.k==="c5sci")return c9CutSci(c);if(c.k==="c5think")return c9CutThink(c);if(c.k==="c5hypend")return c9CutHypEnd(c);if(c.k==="c5after")return c9CutAfter(c);return _c(c);};}
{const _s=c5Skip;c5Skip=function(c){if(c.k==="c5lamp"){c.t=Math.max(c.t,419);return;}if(c.k==="c5sci"){c.t=Math.max(c.t,1059);return;}if(c.k==="c5think"){c.t=Math.max(c.t,649);return;}if(c.k==="c5hypend"){c.t=Math.max(c.t,599);return;}return _s(c);};}
/* ---------------- the notebook ---------------- */
function c9Css(){c5Css();if(qs("#c9Css"))return;const st=document.createElement("style");st.id="c9Css";
  st.textContent="#c9Note,#c9Hyp{z-index:60}.c9pg{background:#e8dcb8;color:#2a2418;border:3px solid #6a3a2a;box-shadow:inset 0 0 0 2px #d4c49c,0 6px 0 #00000066;padding:10px 12px;text-align:left;font-size:8px;line-height:1.9;max-height:calc(100vh - 170px);overflow:auto;background-image:repeating-linear-gradient(#e8dcb8 0 15px,#b8c8d8 15px 16px)}.c9pg h5{margin:0 0 6px;font-size:9px;color:#6a1a14;letter-spacing:1px}.c9pg .d{color:#3a5a7a}.c9pg .h{background:#ffe9a0;outline:2px dashed #c83a2a;padding:2px 4px;display:block;margin:4px 0}.c9pg .x{color:#a83a2a}"+
  ".c9l{text-align:left;font-size:8px;line-height:1.9;padding:4px 2px}.c9l b{color:#ffe070}.c9big{font-size:10px;color:#8aff9a;text-align:center;margin:4px 0 8px;line-height:1.7}.c9fx{background:#05070ce6;border:2px solid #2a3a5a;padding:6px 8px;margin:6px 0}.c9fx .ok{color:#8aff9a}.c9fx .no{color:#ffb08a}"+
  ".c9ord{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin:6px 0}.c9slot{border:2px dashed #3a4a6a;min-height:34px;font-size:7px;padding:3px;color:#6a7a9a;display:flex;align-items:center;justify-content:center;text-align:center}.c9slot.on{border-style:solid;border-color:#3a8a4a;color:#8aff9a;background:#0a1a10}.c9ch{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}.c9ch .gbtn{font-size:8px;padding:8px 10px}.c9ans{display:flex;flex-direction:column;gap:5px}.c9ans .gbtn{text-align:left;font-size:8px;line-height:1.6;white-space:normal}.c9ans .gbtn.c9ok{border-color:#3a8a4a;color:#8aff9a;background:#0a1a10;opacity:1}.c9prog{text-align:center;font-size:7px;color:#6a7a9a;margin:2px 0 6px}"+
  "@media (max-height:500px){.c9pg{max-height:calc(100vh - 130px)}.c9ord{grid-template-columns:repeat(6,1fr)}}";document.head.appendChild(st);}
function c9NoteOpen(){c9Css();const S=c7S();
  const el=c5Overlay("#c9Note",'<div class="gcard c4card"><h3>DR. MORROW\'S NOTEBOOK</h3><div class="c9pg" tabindex="0">'+
    '<h5>PROJECT CHRONOS: FIELD NOTES</h5>'+
    '<span class="d">DAY 30.</span> Before the city fell, this lab was secretly building a <b>time machine</b>. Three parts were finished: the <b>POWER CORE</b>, the <b>FIELD COILS</b> and the <b>CHRONO-CLOCK</b>. When the Evolved broke in, we hid each part in a different place: the old power plant, the shipyard and the observatory.<br>'+
    '<span class="d">DAY 38. OBSERVATION:</span> The Evolved don\'t wander at random any more. They gather in the same few places and stay there, like guards. Something is giving them orders. I call it <b>THE EVOLUTION</b>.<br>'+
    '<span class="d">QUESTION:</span> What are they guarding?<br>'+
    '<span class="h"><b>HYPOTHESIS:</b> IF the Evolution is sending its monsters to guard the time machine parts, THEN there will be far more Evolved at the places where the parts are hidden, BECAUSE it knows a time machine could undo everything it has done.</span>'+
    '<span class="d">DAY 41. TEST:</span> Watched the power plant for two nights and counted. Three times as many Evolved as in the town.<br>'+
    '<span class="d">RESULT:</span> My hypothesis is <b>SUPPORTED</b>. Not proven. I still need to test the shipyard and the observatory.<br>'+
    '<span class="d">DAY 44.</span> <span class="x">I\'m too weak to go out again.</span> Whoever finds this: the parts are real, and they are guarded. Don\'t fight them head-on. Observe, think, test. Be smarter than they are.</div>'+
    '<div class="btns"><button class="gbtn" id="c9nOk">'+(S.hyp?"CLOSE":"CLOSE THE NOTEBOOK")+'</button></div></div>');
  modal=4;el.hidden=!1;$sx("card");qs("#c9nOk").onclick=c9NoteClose;setTimeout(()=>qs("#c9nOk").focus(),40);}
function c9NoteClose(){const el=qs("#c9Note"),S=c7S();if(!el||el.hidden)return;el.hidden=!0;modal=0;updateGuide();if(S.hyp)return;if(!S.think){S.think=1;c2Save("tlab");c3CutStart("c5think");}else c9HypOpen();}
/* ---------------- the lesson: what is a hypothesis? ---------------- */
function c9HypOpen(){c9Css();C9_HQ={pg:0,ord:[],sh:null,q:0,fb:""};const el=c5Overlay("#c9Hyp",'<div class="gcard c4card"><h3>WHAT IS A HYPOTHESIS?</h3><div id="c9hB"></div></div>');
  modal=4;el.hidden=!1;$sx("click");el.onclick=(ev)=>{const b=ev.target.closest&&ev.target.closest("[data-c9h]");b&&!b.disabled&&c9HypAct(b.dataset.c9h);};c9HypDraw();}
function c9HypClose(){const el=qs("#c9Hyp");if(!el||el.hidden)return;el.hidden=!0;modal=0;C9_HQ=null;updateGuide();}
function c9HypDraw(){const Q=C9_HQ;if(!Q)return;const b=(a,l,o)=>'<button class="gbtn'+(o&&o.go?"":" alt")+(o&&o.ok?" c9ok":"")+'" data-c9h="'+a+'"'+(o&&o.dis?" disabled":"")+">"+l+"</button>";let h="";const N=8;
  h+='<div class="c9prog">PART '+(Q.pg+1)+" OF "+N+"</div>";
  if(Q.pg===0)h+='<div class="c9big">A HYPOTHESIS IS A SMART GUESS<br>THAT YOU CAN TEST.</div><div class="c9l">It is <b>not</b> a wild guess. You make it from <b>clues</b>: things you have noticed (observations). It says what you think is going on, and it must be something you can <b>check with a test</b>.<br><br>Dr. Morrow noticed the Evolved gathering in the same places. His smart guess: <b>the Evolution is sending them to guard the time machine parts.</b> He could test that by counting them.</div>';
  if(Q.pg===1)h+='<div class="c9big">IF... THEN... BECAUSE...</div><div class="c9l">A good hypothesis is often written like this:<br><b>IF</b> (what you change or what is true) <b>THEN</b> (what will happen) <b>BECAUSE</b> (your reason).<div class="c9fx"><b>IF</b> plants get more sunlight, <b>THEN</b> they will grow taller, <b>BECAUSE</b> plants use light to make their food.</div>The THEN part is your <b>prediction</b>. A test shows whether the prediction comes true.</div>';
  if(Q.pg===2){if(!Q.sh){Q.sh=C9_STEPS.map((s,i)=>i);for(let i=Q.sh.length-1;i>0;i--){const j=(Math.random()*(i+1))|0;[Q.sh[i],Q.sh[j]]=[Q.sh[j],Q.sh[i]];}if(Q.sh.every((v,i)=>v===i))Q.sh.reverse();}
    const done=Q.ord.length===C9_STEPS.length;
    h+='<div class="c9l">A hypothesis is one step of the <b>SCIENTIFIC METHOD</b>. Put Dr. Morrow\'s steps in the right <b>ORDER</b>:</div><div class="c9ord">'+C9_STEPS.map((s,i)=>'<div class="c9slot'+(Q.ord[i]!==undefined?" on":"")+'">'+(Q.ord[i]!==undefined?(i+1)+". "+C9_STEPS[i][1]:(i+1)+".")+"</div>").join("")+"</div>";
    h+='<div class="c9ch">'+Q.sh.filter((i)=>!Q.ord.includes(i)).map((i)=>b("s:"+i,C9_STEPS[i][1])).join("")+"</div>";
    h+='<div class="c9fx" aria-live="polite">'+(Q.fb||"Which step comes first?")+"</div>";if(!done){h+='<div class="btns">'+b("back","BACK")+"</div>";el9().querySelector("#c9hB").innerHTML=h;return;}}
  if(Q.pg===3)h+='<div class="c9big">SUPPORTED, NOT PROVEN</div><div class="c9l">When the results match your prediction, the hypothesis is <b>SUPPORTED</b>. Scientists never say one test <b>proves</b> it forever: another test could show something new. So they test again, in other places, in other ways.<br><br>When the results <b>don\'t</b> match, that\'s useful too! You learn something, change the hypothesis and test again. Being wrong is part of science.</div>';
  if(Q.pg>=4&&Q.pg<=6){const qq=C9_QUIZ[Q.pg-4];h+='<div class="c9l"><b>QUIZ '+(Q.pg-3)+"/3:</b> "+qq.q+'</div><div class="c9ans">'+qq.a.map((a,i)=>b("a:"+i,(Q.right&&a[1]?"&#10004; ":"")+String.fromCharCode(65+i)+") "+a[0],{dis:Q.right,ok:Q.right&&a[1]})).join("")+'</div><div class="c9fx" aria-live="polite">'+(Q.fb||"Pick an answer.")+"</div>";
    if(!Q.right){h+='<div class="btns">'+b("back","BACK")+"</div>";el9().querySelector("#c9hB").innerHTML=h;return;}}
  if(Q.pg===7){h+='<div class="c9big">&#9733; YOU THINK LIKE A SCIENTIST! &#9733;</div><div class="c9l">A <b>hypothesis</b> is a smart, testable guess made from clues. Write it as <b>IF... THEN... BECAUSE...</b>, test the prediction, and the results will <b>support</b> it or <b>not support</b> it. Then test again.</div><div class="btns">'+b("fin","DONE",{go:1})+"</div>";el9().querySelector("#c9hB").innerHTML=h;setTimeout(()=>{const f=qs('[data-c9h="fin"]');f&&f.focus();},40);return;}
  h+='<div class="btns">'+(Q.pg>0?b("back","BACK"):"")+b("next","NEXT",{go:1})+"</div>";el9().querySelector("#c9hB").innerHTML=h;setTimeout(()=>{const f=qs('[data-c9h="next"]');f&&f.focus();},40);}
function el9(){return qs("#c9Hyp");}
function c9HypAct(a){const Q=C9_HQ,S=c7S();if(!Q)return;
  if(a==="next"){Q.pg++;Q.fb="";Q.right=0;$sx("click");return c9HypDraw();}
  if(a==="back"){Q.pg=Math.max(0,Q.pg-1);Q.fb="";Q.right=Q.pg>=4&&Q.pg<=6?1:0;$sx("click");return c9HypDraw();}
  if(a.slice(0,2)==="s:"){const i=+a.slice(2),need=Q.ord.length;if(i===need){Q.ord.push(i);$sx("blip");Q.fb='<span class="ok">&#10004; '+C9_STEPS[i][1]+":</span> "+C9_STEPS[i][2];if(Q.ord.length===C9_STEPS.length)Q.fb+='<br><span class="ok">All in order! Scientists go round this loop again and again.</span>';}
    else{$sx("locked");Q.fb='<span class="no">Not yet.</span> '+(need===0?"Everything starts with noticing something: an observation.":"What comes after <b>"+C9_STEPS[need-1][1]+"</b>?");}return c9HypDraw();}
  if(a.slice(0,2)==="a:"){const qq=C9_QUIZ[Q.pg-4],an=qq.a[+a.slice(2)];if(an[1]){Q.right=1;$sx("success");Q.fb='<span class="ok">&#10004; CORRECT!</span> '+an[2];}else{$sx("locked");Q.fb='<span class="no">Not quite.</span> '+an[2];}return c9HypDraw();}
  if(a==="fin"){S.hyp=1;c2Save("tlab");c9HypClose();c3CutStart("c5hypend");}}
/* ---------------- the end card now covers the scientist and the hypothesis ---------------- */
{const _e=c7End;c7End=function(){_e();const el=qs("#c5End");if(!el)return;const S=c7S();const uls=el.querySelectorAll(".c5cols ul");
  if(S.hyp&&uls.length>=2&&!el.querySelector(".c9li")){const li=(u,h)=>{const x=document.createElement("li");x.className="c9li";x.innerHTML=h;u.appendChild(x);};
    li(uls[0],"Found Dr. Morrow, the chief scientist, in a corner of the lab, and read his notebook: a <b>hypothesis</b> that the Evolution sends its monsters to guard the time machine parts.");
    li(uls[1],"<b>Hypothesis:</b> a smart guess you can test, made from clues. Write it as IF... THEN... BECAUSE..., test the prediction, and the results <b>support</b> it or <b>don't</b>. One test never proves it forever.");
    const nx=[...el.querySelectorAll("p")].find((p)=>/NEXT:/.test(p.textContent));nx&&(nx.textContent="NEXT: FIND THE TIME MACHINE PARTS (POWER CORE, FIELD COILS, CHRONO-CLOCK) AND GET PAST THE EVOLVED GUARDING THEM. MORE IN A FUTURE UPDATE.");}};}
/* ---------------- developer tools ---------------- */
C3_DEVBTN.push(["CHAPTER 3: THE SCIENTIST AND THE HYPOTHESIS",[["c3_wlamp","HIDDEN LAB: AFTER THE MEMORY (LAMP ON)"],["c3_wsci","HIDDEN LAB: CHECK THE CORNER"],["c3_wnote","OPEN THE NOTEBOOK"],["c3_whyp","OPEN THE HYPOTHESIS LESSON"],["c3_wreset","RESET SCIENTIST AND LESSON"]]]);
{const _d=c3Dev;c3Dev=function(a){if(a.slice(0,4)!=="c3_w")return _d(a);const I=c7S(),close=()=>{modal=0;Oo=0;Do.hidden=!0;};close();
  const lab=(x)=>{c3DevPre("tlab");Object.assign(I,{lab:1,doc:1,tm:1,sci:0,think:0,hyp:0,done:0});c7DevGo("tlab",x);Object.assign(I,{lab:1,doc:1,tm:1});updateGuide();};
  if(a==="c3_wreset"){Object.assign(I,{tm:0,sci:0,think:0,hyp:0});C9.lampT=0;toast("Scientist and lesson reset.",1400);updateGuide();return;}
  if(a==="c3_wlamp"){lab(150);I.tm=0;setTimeout(()=>{I.tm=1;C9.lampT=1;c3CutStart("c5lamp");},300);return;}
  if(a==="c3_wsci"){lab(C9S_X-20);setTimeout(()=>c3CutStart("c5sci"),300);return;}
  if(a==="c3_wnote"){lab(C9S_X-20);I.sci=1;setTimeout(()=>c9NoteOpen(),300);return;}
  if(a==="c3_whyp"){lab(C9S_X-20);Object.assign(I,{sci:1,think:1});setTimeout(()=>c9HypOpen(),300);return;}};}
{const _d=c3Dev;c3Dev=function(a){if(a==="c3_vreset")Object.assign(c7S(),{tm:0,sci:0,think:0,hyp:0});return _d(a);};}
GM.c3.c9h=()=>{const S=c7S();return{tm:S.tm,sci:S.sci,think:S.think,hyp:S.hyp,done:S.done,q:C9_HQ&&{pg:C9_HQ.pg,ord:C9_HQ.ord.length,right:C9_HQ.right}};};GM.c3.c9hAct=(a)=>c9HypAct(a);GM.c3.c9hSh=()=>C9_HQ&&C9_HQ.sh;
