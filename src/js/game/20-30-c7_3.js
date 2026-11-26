/* ======================= THE OVERHEATED GENERATOR: check it safely, cool it, filter the water, fix the cooling ======================= */
var C7_ORDER=["gravel","sand","coal","cloth"],C7_MN={gravel:"GRAVEL",sand:"SAND",coal:"CHARCOAL",cloth:"CLOTH"},C7_SLOT=["TOP LAYER","SECOND LAYER","THIRD LAYER","BOTTOM LAYER"];
var C7_OK={gravel:"<b>GRAVEL ON TOP.</b> The coarsest layer, with the biggest gaps, catches the big lumps first.",sand:"<b>SAND NEXT.</b> Finer gaps trap the fine grit that slipped past the gravel.",coal:"<b>CHARCOAL.</b> Burnt wood is full of microscopic holes. Dissolved muck, colour and smells stick to that huge surface: <b>adsorption</b>.",cloth:"<b>CLOTH AT THE BOTTOM.</b> It holds the layers up and catches the last dust, even loose bits of charcoal."};
var C7_BAD={gravel:"Not there. Gravel has the biggest gaps, so it goes on <b>TOP</b> to catch the big lumps first. Any finer layer above it would clog.",sand:"Not yet. The rule is <b>coarse to fine</b>: sand goes <b>after the gravel</b> and before the charcoal, or grit clogs the charcoal.",coal:"Not yet. Charcoal should only see water the gravel and sand have already cleaned, or grit would clog its tiny holes. It goes <b>third</b>.",cloth:"Not yet. The cloth is the <b>LAST</b> layer, at the bottom, holding everything up and catching the final dust."};
function c7Css(){if(qs("#c7Css"))return;c5Css();const st=document.createElement("style");st.id="c7Css";
  st.textContent="#c7Gen{z-index:60}#c7gCv{width:100%;max-height:calc(100vh - 290px);object-fit:contain;image-rendering:pixelated;background:#0c0a08;border:2px solid #3a3a40;display:block;margin:6px auto}#c7gMsg{min-height:44px;text-align:left;font-size:8px;line-height:1.8;padding:6px 8px;background:#05070ce6;border:2px solid #2a3a5a;margin:4px 0}#c7gMsg .ok{color:#8aff9a}#c7gMsg .no{color:#ffb08a}@media (max-height:500px){#c7gCv{max-height:40vh}}#c7gB .done{border-color:#3a8a4a;color:#8aff9a}";
  document.head.appendChild(st);}
function c7GenOpen(){const S=c7S();if(S.gen){toast("<b>THE GENERATOR</b> is running cool and steady. Go back up and broadcast.",3000);return;}c7Css();
  const el=c5Overlay("#c7Gen",'<div class="gcard c4card"><h3>THE TOWER GENERATOR</h3><canvas id="c7gCv" width="384" height="216" aria-label="A diesel generator with a radiator and a coolant tank. The temperature gauge is in the red."></canvas><div class="c4lay" id="c7gB"></div><div id="c7gMsg" aria-live="polite"></div><div class="btns"><button class="gbtn alt" id="c7gOk">LATER</button></div></div>');
  modal=4;el.hidden=!1;const st=S.gs||0;
  C7G={st,temp:st>=2?55:st===1?100:118,sel:null,filt:[],pour:0,flush:0,fill:S.fill?1:0.12,run:0,hold:0,t:0,ang:0,raf:0};
  qs("#c7gOk").onclick=c7GenClose;el.onclick=(ev)=>{const b=ev.target.closest&&ev.target.closest("[data-c7g]");b&&!b.disabled&&c7GenAct(b.dataset.c7g);};
  el.__stop=()=>{if(C7G)cancelAnimationFrame(C7G.raf);};
  const intro=["The generator is shaking and roaring, the gauge is in the red and steam hisses from the radiator. <b>Look before you touch anything.</b>","The engine is off and cooling. Wait for the gauge to fall.","The engine is cool. The old coolant is full of grit: <b>build a filter</b> to clean the water.","The filter is built. Pour the dirty water through.","The water is clean. <b>Flush</b> the clogged radiator tubes.","The radiator is clear. <b>Refill</b> the coolant tank with the clean water.","Everything is clean and full. <b>Start the engine</b> and watch the gauge.","It runs cool and steady. Switch the power on!"];
  if(st===2){const miss=C7_ORDER.filter((k)=>!S.mat[k]);miss.length&&(intro[2]="The engine is cool, but the old coolant is full of grit. You still need <b>"+miss.map((k)=>C7_MN[k].toLowerCase()).join(", ")+"</b> for a water filter. Look around the room, then come back.");}
  c7GenDraw(intro[st]);
  const loop=()=>{if(!C7G)return;C7G.raf=requestAnimationFrame(loop);if(window.__evoPaused)return;c7GenTick();c7GenPaint();};C7G.raf=requestAnimationFrame(loop);$sx("click");}
function c7GenClose(){const el=qs("#c7Gen");if(C7G&&C7G.raf)cancelAnimationFrame(C7G.raf);C7G=null;if(!el||el.hidden)return;el.hidden=!0;modal=0;updateGuide();}
function c7GenDraw(msg){const G=C7G,S=c7S();if(!G)return;const b=(a,l,o)=>'<button class="gbtn'+(o&&o.go?"":" alt")+(o&&o.done?" done":"")+'" data-c7g="'+a+'"'+(o&&o.dis?" disabled":"")+">"+l+"</button>";let h="";
  if(G.st===0){const c=S.chk;h+=b("gauge",(c[0]?"&#10004; ":"")+"READ THE GAUGE",{done:c[0]})+b("tank",(c[1]?"&#10004; ":"")+"LOOK AT THE COOLANT",{done:c[1]})+b("rad",(c[2]?"&#10004; ":"")+"LOOK AT THE RADIATOR",{done:c[2]})+b("cap","OPEN THE RADIATOR CAP")+b("touch","FEEL THE ENGINE");
    if(c[0]&&c[1]&&c[2])h+=b("off","SWITCH THE ENGINE OFF",{go:1});}
  else if(G.st===1)h+=b("wait","COOLING DOWN…",{dis:1});
  else if(G.st===2){const M=S.mat,miss=C7_ORDER.filter((k)=>!M[k]);
    if(miss.length)h+="";
    else{const n=G.filt.length;["coal","cloth","gravel","sand"].forEach((k)=>{G.filt.includes(k)||(h+=b("pm:"+k,C7_MN[k]));});h+=n?b("reset","START OVER"):"";}}
  else if(G.st===3)h+=b("pour","POUR THE DIRTY WATER IN",{go:1});
  else if(G.st===4)h+=b("flush","FLUSH THE RADIATOR TUBES",{go:1});
  else if(G.st===5)h+=b("fill","FILL THE COOLANT TANK",{go:1});
  else if(G.st===6)h+=G.run?b("hold","RUNNING… WATCH THE GAUGE",{dis:1}):b("start","START THE ENGINE",{go:1});
  else if(G.st===7)h+=b("on","SWITCH THE POWER ON",{go:1});
  qs("#c7gB").innerHTML=h;msg!=null&&(qs("#c7gMsg").innerHTML=msg);c7GenPaint();const nb=qs("#c7gB [data-c7g=off]")||qs("#c7gB button:not([disabled]):not(.done)")||qs("#c7gB button:not([disabled])");nb&&setTimeout(()=>nb.focus(),10);}
function c7Adv(st,msg){const G=C7G,S=c7S();G.st=st;S.gs=Math.max(S.gs||0,st);c2Save("tgen");updateGuide();c7GenDraw(msg);}
function c7GenAct(a){const G=C7G,S=c7S();if(!G)return;$sx("click");
  if(a==="gauge"){S.chk[0]=1;return c7GenDraw("<b>TEMPERATURE GAUGE:</b> <span class=\"no\">118 &deg;C and climbing.</span> A healthy diesel runs at about 85 to 95 &deg;C. The needle is deep in the red.");}
  if(a==="tank"){S.chk[1]=1;return c7GenDraw("<b>COOLANT TANK:</b> the sight glass shows the level is almost <b>empty</b>, and what is left is a brown sludge full of rust flakes and grit from the old cistern.");}
  if(a==="rad"){S.chk[2]=1;return c7GenDraw("<b>RADIATOR:</b> its narrow tubes are caked with sludge. Dirty coolant can't carry heat away, and clogged tubes can't pass the heat to the air.");}
  if(a==="cap"){$sx("locked");return c7GenDraw("<b class=\"no\">STOP! DON'T!</b> A hot cooling system is under <b>pressure</b>. Opening the cap now would spray scalding steam and boiling water at you. Switch the engine off and let it cool first.");}
  if(a==="touch"){$sx("locked");return c7GenDraw("<b class=\"no\">DON'T TOUCH IT!</b> Heat shimmers off the block, far hotter than a boiling kettle. You pull your hand back in time. Look, don't touch.");}
  if(a==="off"){$sx("clank");shake=Math.max(shake,5);return c7Adv(1,"<b class=\"ok\">ENGINE OFF.</b> Now wait. The metal needs time to hand its heat to the air, and the pressure in the radiator has to drop. That dirty coolant is what caused this, so you'll need to <b>filter</b> some clean water.");}
  if(a.slice(0,3)==="pm:"){const k=a.slice(3),i=G.filt.length;
    if(C7_ORDER[i]===k){G.filt.push(k);$sx("pickup");if(G.filt.length>=4)return c7Adv(3,'<span class="ok">'+C7_OK[k]+'</span><br><br><b>THE FILTER IS BUILT:</b> gravel, sand, charcoal, cloth: <b>coarse to fine</b>. Now pour the dirty water through.');return c7GenDraw('<span class="ok">'+C7_OK[k]+"</span><br>Next: the <b>"+C7_SLOT[G.filt.length].toLowerCase()+"</b>.");}
    $sx("locked");return c7GenDraw('<span class="no">'+C7_BAD[k]+"</span>");}
  if(a==="reset"){G.filt=[];return c7GenDraw("Start again, <b>top layer first</b>. Remember: coarse to fine.");}
  if(a==="pour"){G.pour=0.001;qs("#c7gB").innerHTML="";return;}
  if(a==="flush"){G.flush=0.001;qs("#c7gB").innerHTML="";$sx("pour");return;}
  if(a==="fill"){G.fillGo=1;qs("#c7gB").innerHTML="";$sx("pour");return;}
  if(a==="start"){G.run=1;G.hold=0;$sx("rumble");qs("#c7gB").innerHTML="";c7GenDraw("The engine catches. The coolant pump spins up and clean water starts to circulate. <b>Watch the gauge.</b>");return;}
  if(a==="on"){c7GenClose();c3CutStart("c5gpow");}}
function c7GenTick(){const G=C7G,S=c7S();if(!G)return;G.t++;
  if(G.st===1){G.temp=Math.max(54,G.temp-0.24);G.ang=0;if(G.temp<=58){c7Adv(2,"<b class=\"ok\">COOLED DOWN.</b> The gauge is back near 55 &deg;C and the pressure is gone, so the cap is safe now. The old coolant is too dirty to reuse, and the cistern water is full of grit too. "+(Object.values(S.mat).every(Boolean)?"You have everything for a <b>water filter</b>: pick the layers from the <b>top</b> down.":"You need materials for a <b>water filter</b>: look around the room for <b>gravel, sand, charcoal and cloth</b>, then come back."));$sx("success");}}
  if(G.st===2&&!(G.msg2)){const M=S.mat;if(Object.values(M).every(Boolean)&&G.t===1)c7GenDraw("You have all four materials. Build the filter from the <b>top</b> layer down. Think: which has the biggest gaps?");}
  if(G.pour>0&&G.pour<1){G.pour=Math.min(1,G.pour+0.0065);G.t%12===0&&$sx("pour");if(G.pour>=1){S.clean=1;c7Adv(4,"<b class=\"ok\">CLEAN WATER!</b> The cloudiness (turbidity) fell from 100 to 3. Filtering removes particles. (It doesn't kill germs, so you'd boil water before drinking it, but clean water is exactly what a radiator needs.)");}}
  if(G.flush>0&&G.flush<1){G.flush=Math.min(1,G.flush+0.01);if(G.flush>=1){S.flush=1;c7Adv(5,"<b class=\"ok\">FLUSHED.</b> Clean water washed the brown sludge out of the radiator tubes, so coolant can flow freely again. Now refill the tank.");}}
  if(G.fillGo){G.fill=Math.min(1,G.fill+0.008);if(G.fill>=1){G.fillGo=0;S.fill=1;c7Adv(6,"<b class=\"ok\">TANK FULL.</b> Water soaks up a lot of heat for its weight, carries it to the radiator and hands it to the air. That is why it makes such a good coolant. Now start the engine.");}}
  if(G.st===6&&G.run){G.ang+=0.35;G.temp+=(90-G.temp)*0.012;const ok=G.temp>=82&&G.temp<=98;if(ok)G.hold++;if(G.hold>=150){G.run=2;c7Adv(7,"<b class=\"ok\">IT RUNS COOL!</b> 90 &deg;C and steady. The coolant carries the engine's heat to the radiator and the air takes it away, so the engine can finally spin the alternator. <b>Switch the power on!</b>");$sx("success");}}
  if(G.st===7)G.ang+=0.4;}
function c7GenPaint(){const cv=qs("#c7gCv");if(!cv||!C7G)return;const g=cv.getContext("2d"),G=C7G,S=c7S();g.imageSmoothingEnabled=!1;const F=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h);};
  const bg=g.createLinearGradient(0,0,0,216);bg.addColorStop(0,"#1a1612");bg.addColorStop(1,"#0a0806");g.fillStyle=bg;g.fillRect(0,0,384,216);
  F("#26262a",8,168,368,40);F("#46464c",8,168,368,3);for(let x=14;x<368;x+=28){F("#8a8a90",x,176,3,3);F("#8a8a90",x,198,3,3);}
  const hot=G.st<=1?Math.max(0,(G.temp-70)/48):0,dirty=!(S.flush||G.flush>=1),brown="#6a4a22",clear="#7ac8e8";
  /* engine */
  F("#101012",18,64,168,104);F(hot>0.5?"#7a3a2a":"#5a3a2a",20,66,164,100);F("#8a5a3a",20,66,164,4);for(let k=0;k<5;k++){F("#2a1a10",28+k*30,76,20,50);F("#8a6a44",29+k*30,77,18,2);F("#3a2418",34+k*30,70,8,8);}
  for(let k=0;k<30;k++)F(r(k,2001)<0.5?"#a8582a":"#3a1c0c",22+r(k,2002)*160,70+r(k,2003)*94,2+r(k,2004)*5,1);
  if(hot>0.2){g.fillStyle="rgba(255,90,40,"+0.25*hot+")";g.fillRect(20,66,164,100);for(let k=0;k<5;k++)F("rgba(255,200,120,"+0.3*hot+")",30+k*32,56-((G.t*0.8+k*9)%18),10,1);}
  F("#1a1a1c",150,40,14,26);F("#52483e",151,40,12,26);/* exhaust */
  /* the gauge */
  const gx=44,gy=44;g.fillStyle="#0a0c10";g.beginPath();g.arc(gx,gy,20,0,7);g.fill();g.fillStyle="#d8d4c4";g.beginPath();g.arc(gx,gy,17,0,7);g.fill();
  g.lineWidth=4;[["#3a8a3a",82,100],["#d8b02a",100,108],["#d83a2a",108,130],["#3a6ad8",40,82]].forEach(([c,a,b])=>{const t0=Math.PI*(0.8+1.4*(a-40)/90),t1=Math.PI*(0.8+1.4*(b-40)/90);g.strokeStyle=c;g.beginPath();g.arc(gx,gy,13,t0,t1);g.stroke();});
  const ta=Math.PI*(0.8+1.4*(Math.min(130,Math.max(40,G.temp))-40)/90);g.strokeStyle="#101010";g.lineWidth=1.6;g.beginPath();g.moveTo(gx,gy);g.lineTo(gx+Math.cos(ta)*13,gy+Math.sin(ta)*13);g.stroke();F("#101010",gx-1.5,gy-1.5,3,3);
  g.font='6px "Press Start 2P",monospace';g.fillStyle=G.temp>105?"#ff7a6a":G.temp>=82?"#8aff9a":"#9ab8e8";g.fillText(Math.round(G.temp)+"C",gx-11,gy+32);
  /* hoses between engine and radiator, with the water in them */
  const wc=dirty?brown:clear;F("#1a1a1c",186,92,106,10);F(wc,188,94,102,6);F("#1a1a1c",186,134,106,10);F(wc,188,136,102,6);
  if(G.run&&G.run!==0||G.st>=6){for(let k=0;k<5;k++){F("rgba(255,255,255,.55)",188+((G.t*2+k*22)%100),95,3,1.5);F("rgba(255,255,255,.55)",288-((G.t*2+k*22)%100),137,3,1.5);}}
  /* radiator and its fan */
  F("#101012",292,60,70,106);F("#3a3e44",294,62,66,102);for(let x=296;x<358;x+=4){F(dirty?"#5a3a1a":"#9aa8b4",x,66,2,94);F(dirty?"#2a1a0a":"#5a6874",x+2,66,1,94);}
  if(dirty)for(let k=0;k<26;k++)F("#3a2410",296+r(k,2011)*60,68+r(k,2012)*88,2+r(k,2013)*4,2);
  F("#6a727a",292,60,70,3);g.save();g.translate(327,114);g.rotate(G.ang);for(let a=0;a<4;a++){g.rotate(1.5708);F("rgba(20,22,26,.8)",0,-3,26,6);}g.restore();
  /* the coolant tank on top, with its sight glass */
  F("#101012",300,22,56,38);F("#52606c",302,24,52,34);F("#8a98a4",302,24,52,3);F("#06080a",340,28,10,28);const lv=G.fill*26;F(wc,341,28+26-lv,8,lv);F("rgba(255,255,255,.25)",341,28,2,26);
  g.fillStyle="#9ab0d8";g.font='5px "Press Start 2P",monospace';g.fillText("COOLANT",302,20);g.fillText("RADIATOR",298,176);g.fillText("ENGINE",22,162);
  /* steam when it is hot, and a red alarm lamp */
  if(hot>0.1){for(let k=0;k<7;k++){const a=((G.t*0.03+k/7)%1);g.globalAlpha=0.5*(1-a)*Math.min(1,hot*1.6);F("#d8e0e4",300+k*8+Math.sin(G.t/9+k)*3,54-a*40,5+a*8,3+a*6);g.globalAlpha=1;}}
  if(G.st===0&&(G.t>>3)%2){F("#ff2a1a",176,50,6,6);g.fillStyle="rgba(255,40,30,.25)";g.beginPath();g.arc(179,53,12,0,7);g.fill();}
  /* the filter column: it appears once the engine is cool */
  if(G.st>=2&&G.st<=4){const x0=196,y0=50,w=70,h=96;F("#101012",x0-2,y0-2,w+4,h+4);F("#0a1218",x0,y0,w,h);
    const colors={gravel:["#8a8a84","#6a6a64","#a8a8a0"],sand:["#d8c088","#c8a868","#e8d8a0"],coal:["#1a1a1e","#2a2a30","#3a3a42"],cloth:["#c8c0b0","#a8a090","#e0d8c8"]};
    const lh=[20,18,22,10];let yy=y0+h-4;[3,2,1,0].forEach((i)=>{const k=G.filt[i];if(!k)return;const L=lh[C7_ORDER.indexOf(k)];yy-=L;F(colors[k][0],x0+2,yy,w-4,L);for(let q=0;q<40;q++)F(colors[k][q%2+1],x0+2+r(q+i,2021)*(w-6),yy+r(q+i,2022)*(L-2),k==="gravel"?4:k==="sand"?1:k==="coal"?3:6,k==="cloth"?1:k==="gravel"?3:1);});
    for(let i=0;i<4;i++){const y=y0+4+i*22;g.strokeStyle=G.filt[i]?"#6aff8a":"rgba(255,255,255,.18)";g.setLineDash([2,3]);g.strokeRect(x0-6,y,6,18);g.setLineDash([]);}
    g.fillStyle="#9ab0d8";g.font='5px "Press Start 2P",monospace';g.fillText("TOP",x0+2,y0-6);g.fillText("FILTER",x0+14,y0+h+10);
    if(G.pour>0){const k=G.pour,fh=Math.min(1,k*1.4),col=(a)=>"rgba("+Math.round(122+(110-122)*0)+","+0+","+0+","+a+")";F("#5a3a1a",x0+w/2-3,y0-18,6,Math.min(18,k*60));
      F(k<0.6?"#7a5a2a":k<0.85?"#9a9a7a":"#7ac8e8",x0+w/2-1,y0+h-2-fh*20,2,Math.min(30,fh*30));F("#0a0e12",x0+6,y0+h+2,w-12,12);F(k<0.5?"#6a4a22":"#7ac8e8",x0+8,y0+h+14-Math.max(1,k*10),w-16,Math.max(1,k*10));
      F("#04060a",x0,y0+h+24,w,8);F("#2a8a3a",x0+1,y0+h+25,(w-2)*k,6);g.fillStyle="#ffe070";g.font='5px "Press Start 2P",monospace';g.fillText("CLOUDINESS "+Math.max(3,Math.round(100-97*k)),x0-4,y0+h+44);}}
  if(G.st>=6&&G.run===1){F("#04060a",18,184,204,10);F("#2a3440",20,186,200,6);F("#2a8a3a",20+200*(82-40)/90,186,200*16/90,6);F("#ffd23a",20+200*Math.min(1,Math.max(0,(G.temp-40)/90))-2,183,4,12);F("#04060a",18,198,204,6);F("#2a8a3a",20,199,200*Math.min(1,G.hold/150),4);}
  if(G.st===7)for(let k=0;k<7;k++)F("#ffe070",330+((G.t*3+k*8)%34),176+Math.sin(G.t/4+k)*3,3,2);}
