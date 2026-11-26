
/* ======================= THE RADIO'S BATTERIES: wire them up, 5 times ======================= */
var C3_RND=[
  {V:3,use:"AB",need:"Make <b>3.0 V</b> with cells A and B. (More volts = <b>SERIES</b>: + to &minus; in a line.)",
   hint:"…kssh… automated message, Ridge Tower relay. The tower stands WEST of the old highway, on the ridge beyond the forest. Go west along the cracked road, and don't stop on it: the ground underneath is hollow…",
   mal:"POP! The radio's 3-volt part burns out. Now it only takes <b>1.5 V</b>, but it drinks power fast. And cell A starts to leak! Leave it alone and use fresh cells <b>C</b> and <b>D</b>. C is clipped in <b>upside down</b>."},
  {V:1.5,use:"CD",avoid:"A",flip:"C",need:"Make <b>1.5 V</b> using BOTH C and D. (Same volts, lasts longer = <b>PARALLEL</b>: + to +, &minus; to &minus;.) C is upside down: its + is at the BOTTOM.",
   hint:"…potholes all along the west road, some deeper than they look: jump them. And something is tunnelling under the road… worms… huge ones. When the ground shakes, MOVE…",
   mal:"Static! The radio needs more push: <b>4.5 V</b> from B, C and D. (You turn C the right way up.)"},
  {V:4.5,use:"BCD",avoid:"A",need:"Make <b>4.5 V</b>: B, C and D in one SERIES line. Don't touch leaking A!",
   hint:"…the animals move in packs now. Wolves, boars, rats, crows: if they start running, you run too. And the wrecks on that road still hold fuel. One spark and the whole road burns…",
   mal:"Cell A has cooled and stopped leaking: it works again! But cell D is <b>corroded</b> and dead. The radio wants <b>1.5 V</b> from A, B and C, sharing the work."},
  {V:1.5,use:"ABC",dead:"D",need:"Make <b>1.5 V</b> (PARALLEL) with A, B and C. Skip dead cell D.",
   hint:"…vines have fallen across the road: green ones tangle your feet, thorny brown ones trip you. Past the road lies the old forest. Do NOT drink the water there. It's murky and full of germs…",
   mal:"You scrape D clean with the old car key. For the last, long broadcast the radio wants <b>3.0 V</b> from <b>all four</b> cells."},
  {V:3,use:"ABCD",need:"FINAL WIRING: make <b>3.0 V</b> with ALL FOUR: two series pairs (A-B and C-D), both joined to the radio.",
   hint:"…rest in the forest before the climb: build a proper bed, up off the cold ground. Ridge Tower, backup power ON. If anyone can hear this: the tower's signal reaches the whole valley. Get to the tower…",mal:""}];
var C3_N=C3_RND.length;
var C3_WHY={
  short:["SHORT CIRCUIT!","Current rushed straight from + to &minus; with almost nothing in the way. The cells heat up fast.","A short circuit let current pour straight from + to &minus; with nothing to slow it down. The cells turned all that energy into heat inside themselves. Hotter chemicals react faster and make even more heat (a loop called THERMAL RUNAWAY) until the cells burst into flames."],
  fight:["CELLS FIGHTING!","You joined chains with different voltages side by side, so the stronger chain forces current BACKWARDS into the weaker one. They get hot.","Chains with different voltages were joined side by side, so the stronger cells kept forcing current backwards into the weaker ones. Batteries hate being force-charged: they heated up, swelled and caught fire."],
  reverse:["BACKWARDS!","The radio's + terminal is getting the &minus; side. Reversed polarity makes its parts heat up.","The power went in backwards. The radio's parts only let current flow one way; forced the wrong way, they let far too much through and cooked the cells until they caught fire."],
  over:["TOO MANY VOLTS!","The radio got {v} V but needs {t} V. The extra voltage turns into heat.","Too many cells were stacked in a row, so the radio got more voltage than it was built for. The extra energy came out as heat, and the overloaded cells caught fire."],
  under:["NOT ENOUGH VOLTS!","The radio got {v} V but needs {t} V. Its power circuit strains and pulls extra current, so the cells heat up. (Is one cell backwards?)","The radio didn't get enough voltage, so its power circuit kept straining to pull more current from the cells. Pushed that hard for that long, they overheated and caught fire."],
  deadcell:["DEAD CELL IN THE CHAIN!","The corroded cell blocks the current like a clogged pipe and gets hot.","A corroded, dead cell sat in the chain. It resisted the current like a clogged pipe, and that resistance turned the energy into heat right inside it until it caught fire."],
  cracked:["DON'T TOUCH THAT ONE!","That cell is cracked and leaking. Leaking battery chemicals can burst into flames.","You wired up a cracked, leaking cell. Its chemicals were already reacting with the air; adding current made them react violently, and they caught fire."]};
var C3_CX={A:72,B:152,C:232,D:312},C3_CC={A:"#2a6ad8",B:"#d8862a",C:"#3aa84a",D:"#9a4ad8"},C3_WC=["#e83a2a","#20242a","#ffd23a","#3a8aff","#3ad85a","#f4f4f4","#ff7ad8","#ff9a2a"];
var C3W=null;
function c3Cells(R){const st={};for(const L of"ABCD")st[L]=R.use.includes(L)?"use":(R.avoid||"").includes(L)?"avoid":(R.dead||"").includes(L)?"dead":"spare";return st;}
function c3Pads(R){const st=c3Cells(R),sw=!!R.swap,P=[{id:"R+",x:sw?212:172,y:92,pol:1,cell:null},{id:"R-",x:sw?172:212,y:92,pol:-1,cell:null}];
  for(const L of"ABCD"){if(st[L]==="spare")continue;const fl=(R.flip||"").includes(L);P.push({id:L+"+",x:C3_CX[L],y:fl?196:112,pol:1,cell:L},{id:L+"-",x:C3_CX[L],y:fl?112:196,pol:-1,cell:L});}
  return P;}
function c3Gauss(A,b,n){for(let i=0;i<n;i++){let m=i;for(let k=i+1;k<n;k++)if(Math.abs(A[k][i])>Math.abs(A[m][i]))m=k;
    if(m!==i){const ta=A[i];A[i]=A[m];A[m]=ta;const tb=b[i];b[i]=b[m];b[m]=tb;}const d=A[i][i]||1e-12;
    for(let k=i+1;k<n;k++){const q=A[k][i]/d;if(!q)continue;for(let j=i;j<n;j++)A[k][j]-=q*A[i][j];b[k]-=q*b[i];}}
  const x=new Float64Array(n);for(let i=n-1;i>=0;i--){let sm=b[i];for(let j=i+1;j<n;j++)sm-=A[i][j]*x[j];x[i]=sm/(A[i][i]||1e-12);}return x;}
/* nodal analysis: each cell = 1.5 V source + small internal resistance, the radio = a 10-ohm load */
function c3Solve(R,wires){const st=c3Cells(R),ids=["R+","R-"];for(const L of"ABCD")st[L]!=="spare"&&ids.push(L+"+",L+"-");
  const par={};ids.forEach((i)=>(par[i]=i));const f=(i)=>(par[i]===i?i:(par[i]=f(par[i])));
  wires.forEach((w)=>{if(par[w[0]]===undefined||par[w[1]]===undefined)return;const x=f(w[0]),y=f(w[1]);x!==y&&(par[x]=y);});
  const g=f("R-"),roots=[...new Set(ids.map(f))].filter((x)=>x!==g),ix={};roots.forEach((q,i)=>(ix[q]=i));const n=roots.length;
  const G=[];for(let i=0;i<n;i++)G.push(new Float64Array(n));const I=new Float64Array(n);
  const id=(a)=>(a===g?-1:ix[a]),stamp=(a,b,c)=>{const p=id(a),q=id(b);p>=0&&(G[p][p]+=c);q>=0&&(G[q][q]+=c);if(p>=0&&q>=0){G[p][q]-=c;G[q][p]-=c;}};
  const cells=[];for(const L of"ABCD"){if(st[L]==="spare")continue;const dead=st[L]==="dead",V=dead?0:1.5,rr=dead?40:0.05,P=f(L+"+"),N=f(L+"-");
    cells.push({L,V,r:rr,P,N});stamp(P,N,1/rr);const p=id(P),q=id(N);p>=0&&(I[p]+=V/rr);q>=0&&(I[q]-=V/rr);}
  stamp(f("R+"),g,0.1);for(let i=0;i<n;i++)G[i][i]+=1e-6;
  const v=n?c3Gauss(G,I,n):new Float64Array(0),volt=(a)=>(a===g?0:v[ix[a]]),Vout=volt(f("R+"));
  cells.forEach((c)=>{c.I=(c.V-(volt(c.P)-volt(c.N)))/c.r;});const touched={};wires.forEach((w)=>{touched[w[0]]=1;touched[w[1]]=1;});
  return{Vout,cells,Iload:Vout/10,touched,st};}
function c3Grade(R,res){
  if(Object.keys(res.touched).some((k)=>k[0]!=="R"&&res.st[k[0]]==="avoid"))return{k:"cracked"};
  const maxI=Math.max(0,...res.cells.map((c)=>Math.abs(c.I)));
  if(maxI>2.2)return{k:res.cells.some((c)=>c.I<-0.5)?"fight":"short"};
  if(Math.abs(res.Iload)<0.015&&maxI<0.015)return{k:"open"};
  if(res.Vout<-0.3)return{k:"reverse",v:res.Vout};
  if(res.Vout>R.V+0.32)return{k:"over",v:res.Vout};
  if(res.Vout<R.V-0.32)return{k:res.cells.some((c)=>c.V===0&&Math.abs(c.I)>0.02)?"deadcell":"under",v:res.Vout};
  const lazy=R.use.split("").filter((L)=>{const c=res.cells.find((q)=>q.L===L);return!c||c.I<0.02;});
  if(lazy.length)return{k:"lazy",lazy,v:res.Vout};
  return{k:"ok",v:res.Vout};}
/* a reference wiring for each round (used by the automated self-test, never shown to the player) */
function c3Answer(i){const R=C3_RND[i],P=(L,s)=>L+s,u=R.use.split(""),W=[];
  if(R.V===1.5*u.length){W.push(["R+",P(u[0],"+")]);for(let k=0;k<u.length-1;k++)W.push([P(u[k],"-"),P(u[k+1],"+")]);W.push([P(u[u.length-1],"-"),"R-"]);}
  else if(R.V===1.5){u.forEach((L)=>{W.push(["R+",P(L,"+")],["R-",P(L,"-")]);});}
  else{W.push(["R+",P(u[0],"+")],[P(u[0],"-"),P(u[1],"+")],[P(u[1],"-"),"R-"],["R+",P(u[2],"+")],[P(u[2],"-"),P(u[3],"+")],[P(u[3],"-"),"R-"]);}
  return W;}

function c3WireOpen(done){const S=c3S();if(S.wired){done&&done();return;}let el=qs("#c3Wire");
  if(!el){el=document.createElement("div");el.id="c3Wire";el.className="gov";el.hidden=!0;
    el.innerHTML='<div class="gcard c3wcard"><div class="c3wL"><div id="c3wTop"><span id="c3wR">WIRING 1/5</span><span id="c3wV">METER --</span><span id="c3wHeat">HEAT &#9633;&#9633;&#9633;</span><span id="c3wT">0:00</span></div><canvas id="c3wc" width="384" height="216" aria-label="Battery wiring board. Tap a terminal, then another terminal, to connect them with a wire. Tap a wire to remove it."></canvas></div>'+
      '<div class="c3wR"><div id="c3wMsg" aria-live="polite"></div><div class="btns"><button class="gbtn alt" id="c3wNote">STICKY NOTE</button><button class="gbtn alt" id="c3wClr">CLEAR WIRES</button><button class="gbtn alt" id="c3wHint">HINT</button><button class="gbtn" id="c3wTest">TEST</button></div><details id="c3wLog"><summary>WHAT THE RADIO SAID (<span id="c3wLn">0</span>)</summary><ol id="c3wList"></ol></details></div>'+
      '<div id="c3wNoteBox" hidden><div class="c3note"><b>HOW BATTERIES WORK</b><br><br>Each cell = <b>1.5 V</b>.<br><b>+</b> = the bump end. <b>&minus;</b> = the flat end.<br><br><b>MORE VOLTS? SERIES.</b><br>Line them up: + to &minus;.<br>2 cells = 3 V, 3 = 4.5 V, 4 = 6 V.<br><br><b>LAST LONGER? PARALLEL.</b><br>All + together, all &minus; together.<br>Still 1.5 V.<br><br>Then wire the free ends to the radio: <b>+ to +</b>, <b>&minus; to &minus;</b>.<br><br>&#9888; Never wire a cell\'s + straight to its own &minus;!<br>Stuck? Press <b>HINT</b>.</div><div class="btns"><button class="gbtn" id="c3wNoteOk">GOT IT</button></div></div>'+
      '<div id="c3wFire" hidden><h3>THE BATTERIES CAUGHT FIRE!</h3><p id="c3wWhy"></p><div class="btns"><button class="gbtn" id="c3wRe">RESTART CHECKPOINT</button></div></div></div>';
    qs("#gm").appendChild(el);c3WireCss();c3WireBind();}
  const cp=Math.min(3,S.cp||0);
  C3W={round:cp,cp,wires:[],sel:null,drag:null,strikes:0,phase:"wire",pt:0,f:0,fx:[],v:null,res:null,typed:0,noteSeen:S.hints>0,done,raf:0,last:performance.now(),acc:0,shake:0,mx:-1,my:-1,lastBad:""};
  modal=4;el.hidden=!1;qs("#c3wFire").hidden=!0;qs("#c3wNoteBox").hidden=!0;
  c3WRound(cp?"<b>CHECKPOINT.</b> You're back at wiring "+(cp+1)+"/"+C3_N+".<br>":"<b>The battery contacts inside the radio are corroded through,</b> but its power terminals still work. Wire the cells straight to them. A sticky note on the front explains how.<br>");
  c3WLog();const g=qs("#c3wc").getContext("2d");g.imageSmoothingEnabled=!1;
  const loop=(now)=>{if(!C3W)return;C3W.raf=requestAnimationFrame(loop);const dt=Math.min(100,now-C3W.last);C3W.last=now;if(window.__evoPaused)return;C3W.acc+=dt;
    while(C3W&&C3W.acc>=1000/60){C3W.acc-=1000/60;c3WStep();}C3W&&c3WPaint(g);};
  C3W.raf=requestAnimationFrame(loop);qs("#c3wTest").focus();}
function c3WireCss(){if(qs("#c3WireCss"))return;const st=document.createElement("style");st.id="c3WireCss";
  st.textContent="#c3Wire,#c3Bench,#c3Dream{z-index:40}#c3Wire .c3wcard{position:relative;width:min(820px,100%);max-height:calc(100vh - 12px);overflow:auto;text-align:center;padding:10px}"+
  "#c3wTop{display:flex;justify-content:space-between;gap:6px;font-size:8px;flex-wrap:wrap;margin-bottom:4px}#c3wTop span{background:#0a1020;border:2px solid #2a3a5a;padding:3px 6px}#c3wV.ok{border-color:#3a8a4a;color:#8aff9a}#c3wV.off{border-color:#8a6a2a;color:#ffd060}#c3wMsg .c3star{color:#ffd23a;letter-spacing:3px;font-size:13px;font-family:sans-serif;vertical-align:-2px;text-shadow:1px 1px 0 #6a4a00}#c3wHeat.h1{border-color:#d8a03a;color:#ffd060}#c3wHeat.h2{border-color:#ff4a3a;color:#ff7a6a}"+
  "#c3wc{width:100%;max-height:calc(100vh - 190px);object-fit:contain;image-rendering:pixelated;background:#08070a;border:2px solid #2a3040;display:block;margin:4px auto;touch-action:none;cursor:pointer}"+
  "#c3wMsg{min-height:42px;text-align:left;font-size:8px;line-height:1.8;padding:6px 8px;background:#05070ce6;border:2px solid #2a3a5a;margin:4px 0}#c3wMsg .rad{color:#ffd88a}#c3wMsg .bad{color:#ff8a7a}#c3wMsg .good{color:#8aff9a}#c3wMsg .c3why{display:block;margin-top:4px;color:#bfe0ff;font-size:7px;line-height:1.75}#c3wMsg{max-height:34vh;overflow:auto}#c3wMsg .who{display:inline-block;margin-right:6px;padding:1px 5px;font-size:7px;background:#d8a03a;color:#120a00}"+
  "#c3wLog{text-align:left;font-size:7px;line-height:1.8;margin-top:4px;color:#ffd88a}#c3wLog summary{cursor:pointer;color:#9be7ff}#c3wLog ol{margin:4px 0;padding-left:18px}"+
  "#c3wNoteBox,#c3wFire{position:absolute;inset:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;background:#05070cee;z-index:2;padding:10px;overflow:auto}#c3wNoteBox[hidden],#c3wFire[hidden]{display:none}"+
  ".c3note{background:#ffe86a;color:#2a2410;font-size:8px;line-height:1.75;text-align:left;padding:12px 14px;max-width:560px;transform:rotate(-1deg);box-shadow:4px 6px 0 #00000088;border-top:10px solid #f0d040}"+
  "#c3wFire h3{color:#ff6a3a}#c3wFire p{font-size:8px;line-height:1.8;max-width:560px;text-align:left}"+
  "@media (max-height:470px) and (min-width:560px){#c3Wire .c3wcard{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(170px,1fr);gap:8px;align-items:start}#c3wc{max-height:calc(100vh - 70px)}#c3wMsg{font-size:7px;line-height:1.7}}"+
  "#c3Bench .c3bcard{width:min(720px,100%);max-height:calc(100vh - 12px);overflow:auto}.c3sub{font-size:8px;color:#b8c8e8;line-height:1.7}.c3mats{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;margin:6px 0}"+
  ".c3m{display:flex;align-items:center;gap:4px;font-size:7px;padding:3px 5px;border:2px solid #3a2a2a;background:#120a0a;opacity:.55}.c3m.ok{border-color:#3a8a4a;background:#0a1a10;opacity:1}.c3m img{width:24px;height:24px;image-rendering:pixelated}.c3m i{font-style:normal}"+
  ".c3rec{display:grid;grid-template-columns:1fr auto;align-items:center;gap:4px 8px;padding:6px;border:2px solid #2a3a5a;margin:4px 0;background:#0a1020}.c3rec.made{border-color:#3a8a4a;background:#0a1a12}"+
  ".c3in{display:flex;align-items:center;gap:4px;font-size:9px;flex-wrap:wrap}.c3in img{width:28px;height:28px;image-rendering:pixelated;background:#1a2440;border:1px solid #3a4a6a}.c3in img.no{opacity:.3;filter:grayscale(1)}"+
  ".c3rn{grid-column:1;font-size:8px;color:#ffe070;text-align:left}.c3rec .gbtn{grid-column:2;grid-row:1/span 2}#c3bMsg{font-size:8px;line-height:1.8;text-align:left;min-height:30px;padding:6px;background:#05070c;border:2px solid #2a3a5a;margin-top:4px}";
  document.head.appendChild(st);}
function c3WPos(e){const r=qs("#c3wc").getBoundingClientRect(),cw=r.width,ch=r.height,k=Math.min(cw/384,ch/216),ox=(cw-384*k)/2,oy=(ch-216*k)/2;return[(e.clientX-r.left-ox)/k,(e.clientY-r.top-oy)/k];}
function c3PadsC(){const W=C3W;if(W._pr!==W.round){W._p=c3Pads(C3_RND[W.round]);W._pr=W.round;}return W._p;}
function c3PadAt(x,y){if(!C3W)return null;let best=null,bd=19;for(const p of c3PadsC()){const d=Math.hypot(p.x-x,p.y-y);d<bd&&((bd=d),(best=p));}return best;}
function c3WirePts(a,b){const P=c3PadsC(),A=P.find((p)=>p.id===a),B=P.find((p)=>p.id===b);if(!A||!B)return null;
  const mx=(A.x+B.x)/2,my=(A.y+B.y)/2+16+Math.abs(A.x-B.x)*0.12+(A.y===B.y&&A.y<150?-34-Math.abs(A.x-B.x)*0.1:0);return[A.x,A.y,mx,my,B.x,B.y];}
function c3WireAt(x,y){for(let i=C3W.wires.length-1;i>=0;i--){const q=c3WirePts(C3W.wires[i][0],C3W.wires[i][1]);if(!q)continue;
    for(let k=0.12;k<=0.88;k+=0.04){const u=1-k,px=u*u*q[0]+2*u*k*q[2]+k*k*q[4],py=u*u*q[1]+2*u*k*q[3]+k*k*q[5];if(Math.hypot(px-x,py-y)<6)return i;}}return-1;}
function c3AddWire(a,b){const W=C3W;if(!W||a===b)return;if(W.wires.some((w)=>(w[0]===a&&w[1]===b)||(w[0]===b&&w[1]===a))){c3WMsg("Those two are already connected. Tap a wire to remove it.","");return;}
  if(W.wires.length>=10){c3WMsg("That's a lot of wire! Tap a wire to remove it, or CLEAR WIRES.","bad");return;}W.wires.push([a,b]);$sx("click");}
function c3WireBind(){const cv=qs("#c3wc");
  cv.addEventListener("pointerdown",(e)=>{const W=C3W;if(!W)return;e.preventDefault();const[x,y]=c3WPos(e);W.mx=x;W.my=y;
    if(x>=122&&x<=164&&y>=42&&y<=78){c3Note(1);return;}if(W.phase!=="wire")return;
    const p=c3PadAt(x,y);if(p){try{cv.setPointerCapture(e.pointerId);}catch(t){}if(W.sel&&W.sel!==p.id){c3AddWire(W.sel,p.id);W.sel=null;W.drag=null;}else{W.sel=W.sel===p.id?null:p.id;W.drag={from:p.id,x,y,moved:0};W.sel&&$sx("blip");}return;}
    const wi=c3WireAt(x,y);if(wi>=0){W.wires.splice(wi,1);$sx("snap");W.sel=null;return;}W.sel=null;});
  cv.addEventListener("pointermove",(e)=>{const W=C3W;if(!W)return;const[x,y]=c3WPos(e);W.mx=x;W.my=y;const d=W.drag;if(d){Math.hypot(x-d.x,y-d.y)>6&&(d.moved=1);}});
  const up=(e)=>{const W=C3W;if(!W||!W.drag)return;const d=W.drag;W.drag=null;const[x,y]=c3WPos(e);const p=c3PadAt(x,y);if(d.moved){p&&p.id!==d.from?c3AddWire(d.from,p.id):0;W.sel=null;}};
  cv.addEventListener("pointerup",up);cv.addEventListener("pointercancel",()=>{C3W&&(C3W.drag=null);});
  qs("#c3wTest").onclick=()=>c3WButton();qs("#c3wClr").onclick=()=>{const W=C3W;if(!W||W.phase!=="wire")return;W.wires=[];W.sel=null;$sx("snap");};
  qs("#c3wNote").onclick=()=>c3Note(1);qs("#c3wHint").onclick=()=>c3WHint();qs("#c3wNoteOk").onclick=()=>c3Note(0);
  qs("#c3wRe").onclick=()=>{const W=C3W;if(!W)return;qs("#c3wFire").hidden=!0;W.round=W.cp;W.strikes=0;W.wires=[];W.sel=null;W.fx=[];W.phase="wire";c3WRound("<b>CHECKPOINT.</b> Fresh cells, cool hands. Back at wiring "+(W.cp+1)+"/"+C3_N+".<br>");qs("#c3wTest").focus();};}
function c3Note(on){const W=C3W;if(!W)return;qs("#c3wNoteBox").hidden=!on;if(on){W.noteSeen=1;$sx("card");qs("#c3wNoteOk").focus();}else qs("#c3wTest").focus();}
function c3WMsg(h,cls){qs("#c3wMsg").innerHTML='<span class="'+(cls||"")+'">'+h+"</span>";}
function c3WRound(pre){const W=C3W,R=C3_RND[W.round];W.rt0=W.f;W.hinted=0;W.hot=0;W.mk="";qs("#c3wR").textContent="WIRING "+(W.round+1)+"/"+C3_N;c3WHeat();c3WMsg((pre||"")+"<b>NOW:</b> "+R.need,"");qs("#c3wTest").textContent="TEST";qs("#c3wTest").disabled=!1;qs("#c3wClr").disabled=!1;}
function c3WHeat(){const W=C3W,h=qs("#c3wHeat");h.innerHTML="HEAT "+[0,1,2].map((i)=>(i<W.strikes?"&#9632;":"&#9633;")).join("");h.className=W.strikes>=2?"h2":W.strikes?"h1":"";}
function c3WLog(){const n=Math.min(C3_N,c3S().hints||0);qs("#c3wLn").textContent=n;qs("#c3wList").innerHTML=C3_RND.slice(0,n).map((q)=>"<li>"+Qt(q.hint)+"</li>").join("");}
function c3WButton(){const W=C3W;if(!W)return;
  if(W.phase==="wire"){W.hint=null;if(!W.wires.length){c3WMsg("Connect some wires first: tap a terminal, then another one. (Drag works too.)","bad");return;}W.phase="test";W.pt=0;W.sel=null;$sx("click");qs("#c3wTest").disabled=!0;return;}
  if(W.phase==="ok"&&W.pt>30){if(W.round>=C3_N-1){c3WFinish();return;}W.phase="mal";W.pt=0;$sx("snap");$sx("crash");W.shake=14;qs("#c3wTest").disabled=!0;
    for(let k=0;k<26;k++)W.fx.push({x:192+60*(Math.random()-0.5),y:60+30*(Math.random()-0.5),vx:(Math.random()-0.5)*4,vy:-Math.random()*3,life:30+20*Math.random(),c:Math.random()<0.5?"#ffe070":"#ffffff",g:0.15});}}
function c3WEval(){const W=C3W,R=C3_RND[W.round],res=c3Solve(R,W.wires),gr=c3Grade(R,res),S=c3S();W.v=res.Vout;W.res=res;W.grade=gr.k;
  const fmt=(v)=>(Math.round(v*10)/10).toFixed(1);
  if(gr.k==="ok"){W.phase="ok";W.pt=0;W.typed=0;W.shown=-1;W.stars=W.stars||[];W.stars[W.round]=c3WStars(W);W.stars[W.round]===3&&$sx("pickup");$sx("success");S.hints=Math.max(S.hints||0,W.round+1);if(W.round===2)S.cp=3;W.round===2&&(W.cp=3);c2Save("beyond");c3WLog();
    try{bzSpeak(R.hint.replace(/…kssh…/g,"").replace(/…/g,", "));}catch(t){}qs("#c3wTest").textContent=W.round>=C3_N-1?"TURN IT ON":"NEXT";return;}
  if(gr.k==="open"){W.phase="wire";$sx("empty");c3WMsg("<b>NOTHING HAPPENS.</b> The radio reads 0.0 V. No current flows: the loop isn't complete, or two cells in a chain point against each other and cancel out. (No harm done.)<br><b>NOW:</b> "+R.need,"");qs("#c3wTest").disabled=!1;return;}
  if(gr.k==="under"){W.phase="wire";$sx("empty");c3WMsg("<b>TOO FEW VOLTS.</b> The radio flickers: it got "+fmt(gr.v)+" V but needs "+fmt(R.V)+" V. Add cells in SERIES (or check if one is backwards). (No harm done.)<br><b>NOW:</b> "+R.need,"");qs("#c3wTest").disabled=!1;return;}
  if(gr.k==="lazy"){W.phase="wire";$sx("empty");c3WMsg("<b>ALMOST!</b> The radio gets "+fmt(gr.v)+" V, but cell "+gr.lazy.join(" and ")+(gr.lazy.length>1?" aren't":" isn't")+" doing any work. This time the radio needs ALL of the listed cells sharing the load. (No harm done.)<br><b>NOW:</b> "+R.need,"");qs("#c3wTest").disabled=!1;return;}
  const Y=C3_WHY[gr.k];W.strikes++;W.hot=1;W.lastBad=gr.k;c3WHeat();$sx("sizzle");$sx("hurt");W.shake=8;
  c3WMsg("<b>"+Y[0]+"</b> "+Y[1].replace("{v}",fmt(gr.v||0)).replace("{t}",fmt(R.V))+"<br>"+(W.strikes>=3?"":"<b>HEAT "+W.strikes+"/3.</b> Let them cool and try again. NOW: "+R.need),"bad");
  if(W.strikes>=3){W.phase="fire";W.pt=0;$sx("boom");$sx("crash");W.shake=20;}else{W.phase="bad";W.pt=0;}}
function c3WFinish(){const W=C3W;if(!W)return;const S=c3S();S.wired=1;S.hints=10;c2Save("beyond");cancelAnimationFrame(W.raf);try{bzHush();}catch(t){}
  const d=W.done,line=c3WStarLine();C3W=null;qs("#c3Wire").hidden=!0;modal=0;toast("<b>IT WORKS!</b><br>"+line,3400);d&&d();}
function c3WStep(){const W=C3W;W.f++;W.pt++;W.shake>0&&W.shake--;const R=C3_RND[W.round];c3WMeter(W,R);
  W.fx=W.fx.filter((p)=>{p.x+=p.vx;p.y+=p.vy;p.vy+=p.g||0;return--p.life>0;});
  if(W.phase==="wire"||W.phase==="bad"){if(W.strikes&&W.f%Math.max(4,22-W.strikes*7)===0){const L=R.use[(W.f/7|0)%R.use.length];W.fx.push({x:C3_CX[L]+8*(Math.random()-0.5),y:118,vx:(Math.random()-0.5)*0.4,vy:-0.4-0.4*Math.random(),life:50,c:"rgba(160,150,150,.6)",smoke:1,r:2+Math.random()*2});}}
  if(W.phase==="test"&&W.pt>=34)c3WEval();
  if(W.phase==="bad"&&W.pt>=40){W.phase="wire";qs("#c3wTest").disabled=!1;}
  if(W.phase==="ok"){const h=R.hint;if(W.typed<h.length){W.typed+=1.5;W.typed%4<1.5&&$sx("blip");}
    if(W.pt%46===0)$sx("radio");
    const ty=Math.floor(W.typed);if(W.shown!==ty){W.shown=ty;qs("#c3wMsg").innerHTML='<span class="good"><b>IT WORKS! '+(Math.round(W.v*10)/10).toFixed(1)+' V.</b></span> <span class="c3star">'+c3WStarStr(W.stars[W.round])+'</span><br><span class="who">RADIO</span><span class="rad">'+Qt(h.slice(0,ty))+"</span>";}
    if(W.pt>30&&W.typed>=h.length*0.35)qs("#c3wTest").disabled=!1;}
  if(W.phase==="mal"&&W.pt>=48){const old=C3_RND[W.round];W.round++;W.wires=[];W.strikes=0;W.sel=null;W.phase="wire";c3WRound('<span class="bad"><b>MALFUNCTION!</b></span> '+old.mal+"<br>");}
  if(W.phase==="fire"){if(W.pt%3===0)for(let k=0;k<4;k++){const L=R.use[k%R.use.length];W.fx.push({x:C3_CX[L]+14*(Math.random()-0.5),y:150+30*(Math.random()-0.5),vx:(Math.random()-0.5)*0.6,vy:-1-1.4*Math.random(),life:30,c:["#ffd868","#ff8a30","#d8421c"][k%3],flame:1});}
    W.pt%20===0&&$sx("sizzle");
    if(W.pt===120){qs("#c3wWhy").innerHTML="<b>WHY:</b> "+C3_WHY[W.lastBad][2]+"<br><br>Three mistakes in a row was too much heat. Checkpoint: wiring "+(W.cp+1)+"/"+C3_N+".";qs("#c3wFire").hidden=!1;qs("#c3wRe").focus();}}
  const t=Math.floor(W.f/60);if(W.ts!==t){W.ts=t;qs("#c3wT").textContent=(t/60|0)+":"+String(t%60).padStart(2,"0");}}

/* HINT: show one correct wire that is still missing (a dashed, glowing line) */
function c3WHint(){const W=C3W;if(!W||W.phase!=="wire")return;const ans=c3Answer(W.round),has=(w)=>W.wires.some((q)=>(q[0]===w[0]&&q[1]===w[1])||(q[0]===w[1]&&q[1]===w[0]));
  const bad=W.wires.filter((q)=>!ans.some((w)=>(q[0]===w[0]&&q[1]===w[1])||(q[0]===w[1]&&q[1]===w[0])));
  if(bad.length&&W.wires.length>=ans.length){c3WMsg("<b>HINT:</b> some wires don't belong. CLEAR WIRES and try the hint again.","");return;}
  const next=ans.find((w)=>!has(w));if(!next){c3WMsg("<b>HINT:</b> that looks right! Press <b>TEST</b>.","good");return;}
  const nm=(id)=>id[0]==="R"?"the radio's "+(id[1]==="+"?"+":"&minus;"):"cell "+id[0]+"'s "+(id[1]==="+"?"+":"&minus;");
  W.hint={w:next,t:300};W.hinted=1;$sx("blip");c3WMsg("<b>HINT:</b> connect "+nm(next[0])+" to "+nm(next[1])+". (Shown by the glowing dashed line.)<br><span class=\"c3why\"><b>WHY IT WORKS:</b> "+c3WWhy(next,C3_RND[W.round])+"</span>","");}
/* the science behind each hinted wire, so the hint teaches instead of just telling */
function c3WWhy(w,R){const a=w[0],b=w[1],rad=a[0]==="R"?a:b[0]==="R"?b:null,cell=rad?(rad===a?b:a):null,par=R.V<=1.6&&R.use.length>1;
  if(rad){const up=(R.flip||"").includes(cell[0])?" (Cell "+cell[0]+" is upside down, so its + is at the bottom: always follow the printed signs, not the position.)":"";
    return rad[1]==="+"?"The radio is the <b>load</b>: the thing the current does work in. Current leaves your battery pack from its <b>+</b> end (the high-voltage side), so the pack's free + must go to the radio's + terminal. Wired backwards, electronics can be damaged."+up
      :"A circuit must be a <b>complete loop</b>. After the current has done its work in the radio, it needs a path back into the pack's <b>&minus;</b> end. Without this wire nothing flows at all: an open circuit."+up;}
  if(a[1]!==b[1])return"Joining one cell's <b>+</b> to the next cell's <b>&minus;</b> stacks them like steps in a staircase: <b>SERIES</b>. The current has to flow through both, and each cell gives it another 1.5 V push, so the voltages <b>add up</b> (1.5 + 1.5 = 3 V).";
  return(a[1]==="+"?"Joining <b>+ to +</b>":"Joining <b>&minus; to &minus;</b>")+" puts the cells side by side: <b>PARALLEL</b>. They push with the same 1.5 V, so the voltage stays at 1.5 V, but they <b>share the current</b>. Each cell works half as hard, so together they last longer."+(par?"":" (Check the note: this round wants SERIES elsewhere too.)");}

/* ---- live voltmeter + stars: quicker feedback, a goal to chase ---- */
function c3WMeter(W,R){const el=qs("#c3wV");if(!el)return;const key=W.round+"|"+W.phase+"|"+W.wires.map((w)=>w.join("-")).join(",");if(key===W.mk)return;W.mk=key;
  if(!W.wires.length||W.phase==="fire"){el.textContent="METER -- / NEED "+R.V.toFixed(1)+" V";el.className="";return;}
  const v=c3Solve(R,W.wires).Vout,ok=Math.abs(v-R.V)<=0.32;W.live=v;el.textContent="METER "+(Math.round(v*10)/10).toFixed(1)+" V / NEED "+R.V.toFixed(1)+" V";el.className=ok?"ok":Math.abs(v)<0.05?"":"off";}
function c3WStars(W){let n=3;W.hot&&n--;W.hinted&&n--;(W.f-W.rt0)>45*60&&n--;return Math.max(1,n);}
function c3WStarStr(n){return"&#9733;".repeat(n)+"&#9734;".repeat(3-n);}
function c3WStarLine(){const W=C3W,st=(W&&W.stars)||[],got=st.reduce((a,b)=>a+(b||0),0);c3S().wStars=Math.max(c3S().wStars||0,got);
  return"<b>THE RADIO HOLDS ITS POWER!</b><br>Stars: "+got+"/"+(C3_N*3)+(got>=C3_N*3?" &#9733; PERFECT ELECTRICIAN!":got>=C3_N*2?" &#9733; Nice wiring!":"");}
