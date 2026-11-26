
/* ---------------- overlays: the note, the filter, the filtering ---------------- */
function c4Css(){if(qs("#c4Css"))return;const st=document.createElement("style");st.id="c4Css";
  st.textContent=".c4card{width:min(720px,100%);max-height:calc(100vh - 16px);overflow:auto;text-align:center}.c4card h3{margin-bottom:4px}"+
  "#c4sG{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:5px;margin:6px 0}.c4slot{display:flex;flex-direction:column;align-items:center;gap:3px;padding:5px 2px;background:#1a1d24;border:2px solid #3a4250;color:#c8d0dc;font-size:6px;line-height:1.4;min-height:58px}"+
  ".c4slot img{width:32px;height:32px;image-rendering:pixelated}.c4slot:focus,.c4slot:hover{border-color:#ffe070;outline:none}.c4slot.open{background:#10131a;opacity:.82}.c4slot.good{border-color:#5aff8a;opacity:1;background:#10261a}.c4slot.bad{border-color:#ff8a6a}.c4slot i{font-style:normal;word-break:break-word}"+
  ".c4slot.shake{animation:c4sh .34s linear}@keyframes c4sh{0%,100%{transform:none}25%{transform:translateX(-2px) rotate(-3deg)}75%{transform:translateX(2px) rotate(3deg)}}"+
  "#c4sMsg,#c4fMsg,#c4wMsg{min-height:34px;text-align:left;font-size:8px;line-height:1.8;padding:6px 8px;background:#05070ce6;border:2px solid #2a3a5a;margin:4px 0}#c4sMsg .ok,#c4fMsg .ok,#c4wMsg .ok{color:#8aff9a}#c4sMsg .no,#c4fMsg .no{color:#ffb08a}"+
  "#c4nCv,#c4fCv,#c4wCv{width:100%;max-height:calc(100vh - 190px);object-fit:contain;image-rendering:pixelated;background:#0c0a08;border:2px solid #3a3020;display:block;margin:6px auto}"+
  "#c4nTxt{font-size:8px;line-height:1.9;color:#ffe9b8;margin:4px 0}.c4lay{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;margin:4px 0}.c4lay .gbtn{display:flex;align-items:center;gap:5px;font-size:7px}.c4lay img{width:20px;height:20px;image-rendering:pixelated}"+
  "#c4fCv{max-height:min(36vh,calc(100vh - 290px))}@media (max-height:500px){#c4nCv,#c4wCv{max-height:44vh}#c4fCv{max-height:30vh}#c4sG{grid-template-columns:repeat(6,minmax(0,1fr))}.c4slot{min-height:44px;padding:3px 1px}.c4slot img{width:22px;height:22px}}"+
  "@media (max-width:520px){#c4sG{grid-template-columns:repeat(4,minmax(0,1fr))}}";
  document.head.appendChild(st);}
/* the crumpled note, pinned to a tree */
function c4NoteOpen(again,done){let el=qs("#c4Note");
  if(!el){el=document.createElement("div");el.id="c4Note";el.className="gov";el.hidden=!0;
    el.innerHTML='<div class="gcard c4card"><h3>A CRUMPLED NOTE</h3><canvas id="c4nCv" width="384" height="224" aria-label="A crumpled note with a sketch of the Ridge Tower on a ridge, and little ships flying toward it"></canvas><p id="c4nTxt">&ldquo;Last tech-controlled ships heading to Ridge Tower, to any other people left.&rdquo;</p><div class="btns"><button class="gbtn" id="c4nOk">FOLD IT UP</button></div></div>';
    qs("#gm").appendChild(el);}
  c4Css();modal=4;el.hidden=!1;$sx("card");c4NotePaint(qs("#c4nCv").getContext("2d"));
  const ok=qs("#c4nOk");el.__close=()=>{el.hidden=!0;modal=0;$sx("card");done&&done();};ok.onclick=el.__close;setTimeout(()=>ok.focus(),30);}
function c4NotePaint(g){const W=384,H=224,F=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(x,y,w,h);};g.imageSmoothingEnabled=!1;
  const bg=g.createLinearGradient(0,0,0,H);bg.addColorStop(0,"#2a1e14");bg.addColorStop(1,"#120c08");g.fillStyle=bg;g.fillRect(0,0,W,H);
  for(let n=0;n<40;n++)F(n%2?"#3a2a1a":"#22180e",(r(n,1201)*W)|0,0,2+(n%3),H);/* bark behind */
  /* the paper: an uneven, torn outline */
  const P=[];const x0=26,y0=14,x1=W-26,y1=H-12;for(let k=0;k<=20;k++)P.push([x0+(x1-x0)*k/20,y0+(r(k,1202)-0.5)*5]);for(let k=0;k<=12;k++)P.push([x1+(r(k,1203)-0.5)*5,y0+(y1-y0)*k/12]);
  for(let k=20;k>=0;k--)P.push([x0+(x1-x0)*k/20,y1+(r(k,1204)-0.5)*6]);for(let k=12;k>=0;k--)P.push([x0+(r(k,1205)-0.5)*5,y0+(y1-y0)*k/12]);
  g.fillStyle="rgba(0,0,0,.45)";g.beginPath();P.forEach((p,i)=>i?g.lineTo(p[0]+4,p[1]+4):g.moveTo(p[0]+4,p[1]+4));g.fill();
  const pg=g.createLinearGradient(0,y0,W,y1);pg.addColorStop(0,"#efe2c0");pg.addColorStop(0.5,"#e2d2aa");pg.addColorStop(1,"#d4c094");g.fillStyle=pg;g.beginPath();P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.fill();
  /* crumple creases: light ridges next to dark folds */
  for(let n=0;n<14;n++){const ax=x0+r(n,1206)*(x1-x0),ay=y0+r(n,1207)*(y1-y0),bx=ax+(r(n,1208)-0.5)*160,by=ay+(r(n,1209)-0.5)*90;
    g.strokeStyle="rgba(120,96,60,.35)";g.lineWidth=1;g.beginPath();g.moveTo(ax,ay);g.lineTo((ax+bx)/2+(r(n,1210)-0.5)*20,(ay+by)/2+(r(n,1211)-0.5)*12);g.lineTo(bx,by);g.stroke();
    g.strokeStyle="rgba(255,250,230,.45)";g.beginPath();g.moveTo(ax+1,ay+1);g.lineTo((ax+bx)/2+1+(r(n,1210)-0.5)*20,(ay+by)/2+1+(r(n,1211)-0.5)*12);g.lineTo(bx+1,by+1);g.stroke();}
  for(let n=0;n<6;n++){const cx=x0+r(n,1212)*(x1-x0),cy=y0+r(n,1213)*(y1-y0),rr=10+r(n,1214)*18;g.fillStyle="rgba(150,110,60,.12)";g.beginPath();g.arc(cx,cy,rr,0,7);g.fill();}/* water stains */
  /* the pin */
  g.fillStyle="#3a3a40";g.fillRect(W/2-1,6,2,14);g.fillStyle="#c8342a";g.beginPath();g.arc(W/2,8,5,0,7);g.fill();g.fillStyle="#ff8a7a";g.fillRect(W/2-2,5,2,2);
  /* handwriting */
  g.fillStyle="#2a2a52";g.textBaseline="top";g.font='italic 15px "Segoe Print","Bradley Hand","Comic Sans MS",cursive';
  const L=["Last tech-controlled ships","heading to Ridge Tower,","to any other people left."];L.forEach((s,i)=>{g.save();g.translate(40,30+i*24);g.rotate(-0.02+i*0.008);g.fillText(s,0,0);g.restore();});
  g.strokeStyle="#2a2a52";g.lineWidth=1.2;g.beginPath();g.moveTo(42,103);g.quadraticCurveTo(120,99,190,104);g.stroke();
  /* sketch: the ridge, the tower and ships flying to it (pencil lines) */
  const sk=(pts,w)=>{g.lineWidth=w||1;g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke();};
  g.strokeStyle="rgba(50,46,60,.85)";
  sk([[208,196],[236,168],[258,176],[284,140],[300,126],[318,138],[338,158],[356,152],[372,196]],1.4);/* ridge */
  sk([[214,196],[240,174],[262,182],[288,148]],0.6);sk([[318,144],[340,166],[360,160]],0.6);
  for(let k=0;k<7;k++)sk([[268+k*12,190-k*2],[274+k*12,182-k*3]],0.5);/* shading hatches */
  /* the tower: a lattice mast */
  const tx=301;sk([[tx-7,128],[tx-2,62]],1.2);sk([[tx+7,128],[tx+2,62]],1.2);for(let y=70;y<126;y+=9){const w=2+(y-62)*0.08;sk([[tx-w,y],[tx+w,y+9]],0.6);sk([[tx+w,y],[tx-w,y+9]],0.6);}
  sk([[tx,62],[tx,44]],1);sk([[tx-6,52],[tx+6,52]],0.8);sk([[tx-4,47],[tx+4,47]],0.8);
  g.fillStyle="#c8342a";g.beginPath();g.arc(tx,43,2.2,0,7);g.fill();g.strokeStyle="rgba(200,52,42,.6)";for(let k=1;k<3;k++){g.beginPath();g.arc(tx,43,3+k*3,-2.4,-0.7);g.stroke();}
  g.strokeStyle="rgba(50,46,60,.85)";
  /* ships: little cigar shapes with fins, dotted paths ending in arrows */
  [[232,72,0.9],[252,100,0.7],[350,86,0.8]].forEach(([x,y,s],i)=>{g.lineWidth=1;g.beginPath();g.ellipse(x,y,11*s,3.6*s,0,0,7);g.stroke();sk([[x-10*s,y],[x-14*s,y-4*s]],0.8);sk([[x-10*s,y],[x-14*s,y+4*s]],0.8);
    g.setLineDash([2,3]);const dx=i===2?-1:1;sk([[x+dx*12*s,y-1],[tx-dx*16,52+i*6]],0.7);g.setLineDash([]);});
  g.font='bold 10px "Segoe Print","Comic Sans MS",cursive';g.fillStyle="#2a2a52";g.fillText("RIDGE TOWER",256,200);
  sk([[286,198],[296,134]],0.6);
  g.font='italic 9px "Segoe Print","Comic Sans MS",cursive';g.fillText("go WEST",58,182);sk([[60,176],[40,176],[46,172]],1);sk([[40,176],[46,180]],1);
  /* a few smudges and a torn corner */
  g.fillStyle="#120c08";g.beginPath();g.moveTo(x1+3,y1+6);g.lineTo(x1-22,y1+6);g.lineTo(x1+3,y1-18);g.fill();}
/* filter assembly: the order of the layers matters */
var C4_LAY=[["grass","DRY GRASS PLUG","A tight wad of grass in the tip of the cone stops the sand from simply falling out of the bottom. Water seeps through; sand stays put."],
  ["coal","CHARCOAL","Crushed charcoal goes next. Its billions of tiny pores <b>adsorb</b> (grab onto) smelly and coloured chemicals as the water trickles past."],
  ["sand","FINE SAND","Sand sits above the charcoal. The tiny gaps between its grains trap fine mud and silt, so it doesn't clog the charcoal."],
  ["gravel","GRAVEL","Gravel goes on top. It catches leaves and grit, and spreads out the pour so the water doesn't dig a hole in the sand."]];
var C4F=null;
function c4FiltOpen(){let el=qs("#c4Filt");
  if(!el){el=document.createElement("div");el.id="c4Filt";el.className="gov";el.hidden=!0;
    el.innerHTML='<div class="gcard c4card"><h3>BUILD A WATER FILTER</h3><p class="c3sub">Roll birch bark into a cone, point-down. Add the layers in the right order, starting at the narrow tip.</p><canvas id="c4fCv" width="320" height="180" aria-label="A birch-bark cone filter, filled layer by layer"></canvas><div class="c4lay" id="c4fB"></div><div id="c4fMsg" aria-live="polite"></div><div class="btns"><button class="gbtn alt" id="c4fOk">LATER</button></div></div>';
    qs("#gm").appendChild(el);qs("#c4fOk").onclick=c4FiltClose;
    el.addEventListener("click",(ev)=>{const b=ev.target.closest&&ev.target.closest("[data-c4f]");b&&c4FiltAdd(b.dataset.c4f);});}
  c4Css();modal=4;el.hidden=!1;C4F={n:0};
  qs("#c4fB").innerHTML=C4_LAY.map((q)=>'<button class="gbtn alt" data-c4f="'+q[0]+'"><img src="'+c4Icon("m_"+q[0])+'" alt="">'+q[1]+"</button>").join("");
  qs("#c4fMsg").innerHTML="Which layer goes in <b>first</b>, right at the bottom of the cone?";c4FiltPaint();setTimeout(()=>{const b=qs("#c4fB button");b&&b.focus();},30);}
function c4FiltAdd(k){if(!C4F)return;const want=C4_LAY[C4F.n],q=C4_LAY.find((x)=>x[0]===k);
  if(k!==want[0]){$sx("locked");qs("#c4fMsg").innerHTML='<b class="no">Not yet.</b> '+(C4F.n===0?"The very bottom needs something to <b>plug the tip</b>, or everything above it will pour straight out.":k==="grass"?"The grass plug is already in.":
    "Think about what each layer catches. Big bits should be stopped <b>first</b> (at the top), and the finest cleaning (charcoal) should sit <b>lowest</b>, so nothing clogs it.");return;}
  C4F.n++;$sx("pour");const b=qs('[data-c4f="'+k+'"]');b&&(b.disabled=!0);
  qs("#c4fMsg").innerHTML='<b class="ok">'+q[1]+":</b> "+q[2]+(C4F.n<4?"<br>Next layer?":"");c4FiltPaint();
  if(C4F.n>=4){const S4=c4S(),M=S4.mat;S4.filt=1;M.bark--;M.grass--;M.coal=0;M.sand=0;M.gravel=0;$sx("success");updateGuide();
    qs("#c4fMsg").innerHTML+='<br><b class="ok">FILTER READY!</b> Big bits stop at the top, fine mud in the sand, chemicals in the charcoal. Filtering doesn\'t kill every germ, though, which is why you\'ll <b>boil it again</b>.';
    qs("#c4fOk").textContent="DONE";qs("#c4fOk").className="gbtn";qs("#c4fOk").focus();}
  else{const nb=qs("#c4fB button:not([disabled])");nb&&nb.focus();}}
function c4FiltClose(){const el=qs("#c4Filt");if(!el||el.hidden)return;el.hidden=!0;modal=0;C4F=null;updateGuide();c4S().filt&&toast("<b>FILTER BUILT.</b><br>Press USE at the campfire to pour the boiled water through it.",2800);}
function c4Cone(g,cx,top,h,w){g.beginPath();g.moveTo(cx-w/2,top);g.lineTo(cx+w/2,top);g.lineTo(cx+2,top+h);g.lineTo(cx-2,top+h);g.closePath();}
var C4_LCOL={grass:["#c8b46a","#a8943a"],coal:["#1e1e22","#3a3a40"],sand:["#e0c88a","#c8ac6a"],gravel:["#8a8a84","#5a5a56"]};
function c4ConeLayers(g,cx,top,h,w,n,tint){/* fill layers from the tip upward */const fr=[0.14,0.26,0.28,0.22];let acc=0;
  for(let i=0;i<n;i++){const k=C4_LAY[i][0],a=acc,b=acc+fr[i];acc=b;const yA=top+h*(1-b),yB=top+h*(1-a);const wA=4+(w-4)*b,wB=4+(w-4)*a;
    g.save();c4Cone(g,cx,top,h,w);g.clip();g.fillStyle=C4_LCOL[k][0];g.fillRect(cx-w/2,yA,w,yB-yA+0.5);
    for(let s=0;s<40;s++){const px=cx-wA/2+r(s+i*50,1301)*wA,py=yA+r(s+i*50,1302)*(yB-yA);g.fillStyle=C4_LCOL[k][1];g.fillRect(px|0,py|0,k==="gravel"?3:k==="grass"?1:2,k==="grass"?3:2);}
    tint&&(g.fillStyle=tint,g.fillRect(cx-w/2,yA,w,yB-yA));g.restore();}}
function c4FiltPaint(){const cv=qs("#c4fCv");if(!cv)return;const g=cv.getContext("2d");g.imageSmoothingEnabled=!1;
  const bg=g.createLinearGradient(0,0,0,180);bg.addColorStop(0,"#1a2a1e");bg.addColorStop(1,"#0a120c");g.fillStyle=bg;g.fillRect(0,0,320,180);
  const cx=160,top=26,h=120,w=110;
  /* labels on the side */
  g.font='7px "Press Start 2P",monospace';g.textBaseline="middle";g.fillStyle="#8ab89a";g.fillText("TOP",cx+w/2+12,top+6);g.fillText("TIP",cx+18,top+h-4);
  g.fillStyle="#efe8d8";c4Cone(g,cx,top,h,w);g.fill();c4ConeLayers(g,cx,top,h,w,C4F?C4F.n:0);
  g.strokeStyle="#6a6458";g.lineWidth=1.5;c4Cone(g,cx,top,h,w);g.stroke();
  for(let k=0;k<9;k++){g.fillStyle="#3a342c";const yy=top+8+k*12,xx=cx-w/2+8+(k*23)%Math.max(8,(w-16)*(1-k/10));g.fillRect(xx,yy,6,1.5);}
  g.fillStyle="#8a6a44";g.fillRect(cx-w/2-14,top-8,3,150);g.fillRect(cx+w/2+11,top-8,3,150);g.fillRect(cx-w/2-14,top-8,w+28,3);/* stick frame */
  g.strokeStyle="#4a7a2a";g.lineWidth=1.5;g.beginPath();g.moveTo(cx-w/2-12,top-6);g.lineTo(cx-w/2+4,top+2);g.moveTo(cx+w/2+12,top-6);g.lineTo(cx+w/2-4,top+2);g.stroke();}
/* the filtering itself: 8.5 seconds, animated */
var C4W=null,C4_FLOW=510;
function c4FlowOpen(){let el=qs("#c4Flow");
  if(!el){el=document.createElement("div");el.id="c4Flow";el.className="gov";el.hidden=!0;
    el.innerHTML='<div class="gcard c4card"><h3>FILTERING…</h3><canvas id="c4wCv" width="384" height="216" aria-label="Cloudy boiled water trickling through the layered filter into the clean pot below"></canvas><div id="c4wMsg" aria-live="polite"></div><div class="btns"><button class="gbtn" id="c4wOk" hidden>BACK TO THE FIRE</button></div></div>';
    qs("#gm").appendChild(el);}
  c4Css();modal=4;el.hidden=!1;const g=qs("#c4wCv").getContext("2d");g.imageSmoothingEnabled=!1;qs("#c4wOk").hidden=!0;
  qs("#c4wMsg").innerHTML="You pour the boiled (but still cloudy) water into the top of the filter. Gravity pulls it down through every layer…";
  C4W={f:0,raf:0,last:performance.now(),acc:0,drops:[],done:0};$sx("pour");
  const ok=qs("#c4wOk");ok.onclick=()=>{if(!C4W||!C4W.done)return;cancelAnimationFrame(C4W.raf);C4W=null;el.hidden=!0;modal=0;const S4=c4S();S4.w=3;updateGuide();
    toast("<b>FILTERED WATER.</b><br>Clear and odourless. But the filter came from the forest floor and isn't sterile, so <b>boil it once more</b> to be safe.",4200);};
  el.__stop=()=>{if(C4W){cancelAnimationFrame(C4W.raf);C4W=null;}};
  const loop=(now)=>{if(!C4W)return;C4W.raf=requestAnimationFrame(loop);const dt=Math.min(100,now-C4W.last);C4W.last=now;if(window.__evoPaused)return;C4W.acc+=dt;
    while(C4W.acc>=1000/60){C4W.acc-=1000/60;c4FlowStep();}c4FlowPaint(g);};
  C4W.raf=requestAnimationFrame(loop);}
function c4FlowStep(){const W=C4W;if(W.done)return;W.f++;const k=W.f/C4_FLOW;
  if(W.f%4===0&&k>0.06&&k<0.98)W.drops.push({y:158,v:0.5});
  W.drops.forEach((d)=>{d.v+=0.12;d.y+=d.v;});W.drops=W.drops.filter((d)=>d.y<192);
  W.f%60===30&&$sx("pour");
  if(W.f===Math.round(C4_FLOW*0.5))qs("#c4wMsg").innerHTML="Gravel stops grit… sand traps the fine mud… charcoal grabs the smells and colour…";
  if(W.f>=C4_FLOW){W.done=1;$sx("success");qs("#c4wMsg").innerHTML='<b class="ok">CLEAR WATER!</b> Look at the difference. Now back on the fire for one more boil.';qs("#c4wOk").hidden=!1;qs("#c4wOk").focus();}}
function c4FlowPaint(g){const W=C4W,k=Math.min(1,W.f/C4_FLOW),F=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h);};
  const bg=g.createLinearGradient(0,0,0,216);bg.addColorStop(0,"#16261a");bg.addColorStop(1,"#0a1008");g.fillStyle=bg;g.fillRect(0,0,384,216);
  for(let n=0;n<14;n++)F(n%2?"#1e3420":"#14261a",(r(n,1311)*384)|0,0,8+n%5,216);
  F("#2a2012",0,196,384,20);F("#3a2c18",0,196,384,2);
  const cx=192,top=58,h=100,w=92;
  /* tripod */
  g.strokeStyle="#6a4a2a";g.lineWidth=3;g.beginPath();g.moveTo(cx-70,200);g.lineTo(cx,30);g.lineTo(cx+70,200);g.moveTo(cx,30);g.lineTo(cx+14,206);g.stroke();
  /* the cone with layers + cloudy water on top */
  g.fillStyle="#efe8d8";c4Cone(g,cx,top,h,w);g.fill();c4ConeLayers(g,cx,top,h,w,4,"rgba(120,90,40,"+0.12*k+")");
  const lvl=1-Math.min(1,k*1.08);if(lvl>0){g.save();c4Cone(g,cx,top-14,h+14,w+10);g.clip();F("rgba(140,110,60,.85)",cx-60,top-12+ (1-lvl)*12,120,14*lvl+2);g.restore();}
  g.strokeStyle="#6a6458";g.lineWidth=1.5;c4Cone(g,cx,top,h,w);g.stroke();
  /* seeping front: a darker wet band moving down through the layers */
  const wet=Math.min(1,k*1.6);g.save();c4Cone(g,cx,top,h,w);g.clip();F("rgba(40,60,90,.28)",cx-w/2,top,w,h*wet);g.restore();
  /* the pot pouring in from above (until it's empty) */
  if(k<0.72){g.save();g.translate(cx-74,top-30);g.rotate(0.65);F("#5a5e66",-22,-12,44,24);F("#8a909a",-22,-12,44,3);F("#3a3e46",-22,10,44,2);F("#7a6a44",-24,-12,3,24);g.restore();
    g.strokeStyle="rgba(150,120,70,.9)";g.lineWidth=3;g.beginPath();g.moveTo(cx-52,top-18);g.quadraticCurveTo(cx-34,top-18,cx-20,top-4);g.stroke();}
  /* drips from the tip, into the clean pot */
  W.drops.forEach((d)=>{F("#9ae0ff",cx-1,d.y,2,3);F("#e8fbff",cx-1,d.y,1,1);});
  const px=cx-28,py=180;F("#3a3e46",px-2,py-2,60,22);F("#9aa0aa",px,py,56,18);F("#c8ced8",px,py,56,2);F("#6a7078",px,py+16,56,2);
  g.strokeStyle="#5a5e66";g.lineWidth=1.5;g.beginPath();g.arc(cx,py-4,30,Math.PI*1.1,Math.PI*1.9);g.stroke();
  const fillH=Math.round(14*k);F("#7ad0f0",px+2,py+16-fillH,52,fillH);F("#c8f4ff",px+2,py+16-fillH,52,1);
  /* progress + time */
  F("#04060a",92,8,200,12);F("#2a3a5a",93,9,198,10);F("#7ad0f0",93,9,198*k,10);
  g.font='7px "Press Start 2P",monospace';g.textBaseline="middle";g.fillStyle="#fff";g.fillText(W.done?"DONE!":"FILTERING "+((C4_FLOW-W.f)/60).toFixed(1)+"s",128,14.5);
  /* labels */
  g.font='5px "Press Start 2P",monospace';g.fillStyle="#d8e8d0";[["GRAVEL",top+12],["SAND",top+38],["CHARCOAL",top+66],["GRASS",top+88]].forEach(([s,y])=>g.fillText(s,cx+56,y));
  g.fillStyle="#ffb08a";g.fillText("CLOUDY",cx-120,top-4);g.fillStyle="#9ae0ff";g.fillText("CLEAR",cx+40,py+8);}
