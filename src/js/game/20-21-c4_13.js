
/* ---------------- port: goal text, items, icons, info cards ---------------- */
function c4PortGoal(){const P=c4P();if(!P.arr)return["",null];if(P.open||P.done)return["<b>Board the ship!</b>",null];
  const n=c4PMetal()+(P.crow?3:0),tk=(b)=>b?"&#10004; ":"&#9744; ";
  const L=[[P.tried,"Try the gate (find out what won't work)"],[n>=3,"Pull <b>3 loose metal pieces</b> off the containers ("+Math.min(3,n)+"/3). A flapping, rust-eaten corner is the tell."],
    [(P.screw&&P.nail)||P.crow,"Find a <b>screw</b> and a <b>nail</b> near the motor"],[P.crow,"Build a <b>crowbar</b> at the rusty motor workbench"],[P.open,"<b>Pry the gate:</b> stop the square on the green"]];
  let t=null;
  if(!P.tried)t=C4_GATE+22;
  else if(n<3){let bd=1e9;C4_PX.forEach((x,i)=>{if(!P.chk[i]){const d=Math.abs(x-player.x);d<bd&&(bd=d,t=x);}});if(t==null)P.loose.forEach((q)=>{!P.yk[q.i]&&(t=C4_PX[q.i]);});}
  else if(!P.screw&&!P.crow)t=C4_PSCREW;else if(!P.nail&&!P.crow)t=C4_PNAIL;else if(!P.crow)t=C4_MOTOR;else t=C4_GATE+22;
  return["<b>CATCH THE SHIP!</b><br>"+L.map((q)=>tk(q[0])+q[1]).join("<br>"),t];}
Object.assign(items,{
  pstrip:{n:"Long Steel Strip",k:"q4pstrip",c:"#7e8a96",where:"THE BRIDGE PORT (a rusted container)",why:"A long, straight steel strip. It could be a handle.",info:"One of three loose metal pieces."},
  phook:{n:"Curved Steel Rod",k:"q4phook",c:"#7e8a96",where:"THE BRIDGE PORT (a rusted container)",why:"A rod with a natural curve. It could be a claw.",info:"One of three loose metal pieces."},
  pplate:{n:"Flat Steel Plate",k:"q4pplate",c:"#7e8a96",where:"THE BRIDGE PORT (a rusted container)",why:"A thin flat plate. It could be a pry tip.",info:"One of three loose metal pieces."},
  pscrew:{n:"Big Screw",k:"q4pscrew",c:"#c8ced6",where:"THE BRIDGE PORT (by the motor)",why:"A thick steel screw.",info:"Joins the handle to the claw."},
  pnail:{n:"Iron Nail",k:"q4pnail",c:"#6a6a70",where:"THE BRIDGE PORT (in a pallet)",why:"A long iron nail.",info:"Pins the tip to the handle."},
  pcrow:{n:"Rusty Crowbar",k:"q4pcrow",c:"#7e8a96",where:"THE RUSTY MOTOR WORKBENCH",why:"A crowbar built from container scrap.",info:"Use it on the wired gate."}});
Object.assign(Xt,{
  pstrip:{what:"A long, straight strip of steel that the rust had worked loose from the corner of a cargo container.",sci:"Steel is iron with a little carbon. In damp, salty air the iron slowly combines with oxygen and water to make iron oxide, RUST. Rust is flaky and weak, so welds and thin edges crumble and pieces come loose.",real:"Bridges, ships and cars are painted, oiled or galvanised (zinc-coated) to keep water and air off the steel.",how:"It will make the long HANDLE of the crowbar.",safe:"Rusty edges are sharp: don't grab them bare-handed.",fact:"About a tenth of all the steel made is lost to rust."},
  phook:{what:"A bent rod from a container door latch, with a natural curve at one end.",sci:"A curve lets a tool HOOK behind something and pull it, the way your fingers curl round a handle.",real:"Claw hammers, crowbars and tent-peg pullers all use a curved claw.",how:"It will make the CLAW end of the crowbar.",safe:"",fact:""},
  pplate:{what:"A thin flat steel patch plate, rusted loose from a container wall.",sci:"A thin, flat edge can slide into a tiny gap. That is a WEDGE: it turns a small push along its length into a big sideways force.",real:"Chisels, putty knives, doorstops and axe blades are all wedges.",how:"It will make the thin PRY TIP of the crowbar.",safe:"",fact:""},
  pscrew:{what:"A thick steel screw found near the rusty motor.",sci:"A screw is an INCLINED PLANE (a ramp) wrapped round a post. Each turn moves it a short way along its length with great force, and the threads grip.",real:"Jar lids, vices, light bulbs and propellers are all screws.",how:"Drive it to join the handle to the claw.",safe:"",fact:"The screw may be over 2,000 years old: Archimedes' water screw lifted water in ancient Greece."},
  pnail:{what:"A long iron nail stuck in a wooden pallet.",sci:"A nail has no thread. The material squeezes its sides, and FRICTION stops it sliding out.",real:"Hammered nails hold houses together; they hold best against sideways force.",how:"Hammer it in to pin the tip to the handle.",safe:"Watch your thumbs.",fact:""},
  pcrow:{what:"A rusty crowbar built from three scraps of container steel, a screw and a nail.",sci:"A crowbar is a LEVER, a stiff bar that turns on a pivot (the fulcrum). Its long handle is the effort arm and its short claw the load arm. Mechanical advantage = effort arm / load arm: a 60 cm handle with a 3 cm claw gives about 20x the force.",real:"Seesaws, wheelbarrows, scissors, bottle openers and your own forearm are all levers.",how:"Slip it into the wire and lean on it at the wired gate.",safe:"Brace your feet and keep your face away from the bar.",fact:"Archimedes is said to have boasted: 'Give me a lever long enough and a place to stand, and I will move the world.'"}});
Object.assign(C3K,{q4pstrip:1,q4phook:1,q4pplate:1,q4pscrew:1,q4pnail:1,q4pcrow:1});
Object.assign(C4_ICONS,{q4pstrip:1,q4phook:1,q4pplate:1,q4pscrew:1,q4pnail:1,q4pcrow:1});
{const _ic=c4IconCv;c4IconCv=function(t){const k=t.replace(/^q4/,"");
  if(["pstrip","phook","pplate","pscrew","pnail","pcrow"].indexOf(k)<0)return _ic(t);
  const o=c3Cv(24,24),g=o.getContext("2d"),n=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(x,y,w,h);},rust=(x,y)=>n("#8a4a22",x,y,2,1);n("#0a0c14",2,2,20,20);
  if(k==="pstrip"){n("#4a5560",2,9,20,6);n("#9aa8b6",2,9,20,2);n("#2e363e",2,13,20,2);n("#0a0c14",5,11,2,2);n("#0a0c14",16,11,2,2);rust(9,12);rust(13,10);}
  else if(k==="phook"){g.strokeStyle="#2e363e";g.lineWidth=5;g.beginPath();g.moveTo(4,19);g.lineTo(4,9);g.quadraticCurveTo(4,4,10,4);g.lineTo(19,4);g.stroke();g.strokeStyle="#7e8a96";g.lineWidth=3;g.stroke();g.strokeStyle="#b0bcc8";g.lineWidth=1;g.beginPath();g.moveTo(3,18);g.lineTo(3,9);g.stroke();rust(5,14);rust(14,3);}
  else if(k==="pplate"){n("#4a5560",4,5,16,14);n("#9aa8b6",4,5,16,2);n("#2e363e",4,17,16,2);n("#0a0c14",7,8,2,2);n("#0a0c14",15,15,2,2);rust(9,11);rust(14,8);rust(6,15);}
  else if(k==="pscrew"){n("#6a727a",8,3,8,3);n("#c8ced6",8,3,8,1);n("#2a2e34",11,3,2,2);for(let q=0;q<6;q++){n(q%2?"#8a929a":"#c8ced6",10,7+q*2.4,4,2);}n("#c8ced6",11,19,2,2);}
  else if(k==="pnail"){n("#3a3a3e",8,3,8,3);n("#8a8a90",8,3,8,1);n("#8a8a90",11,6,2,14);n("#4a4a50",12,6,1,14);n("#8a8a90",11,20,2,2);rust(11,10);}
  else{g.strokeStyle="#2e363e";g.lineWidth=5;g.beginPath();g.moveTo(5,19);g.lineTo(18,6);g.stroke();g.strokeStyle="#7e8a96";g.lineWidth=3;g.stroke();g.strokeStyle="#2e363e";g.lineWidth=5;g.beginPath();g.moveTo(18,6);g.quadraticCurveTo(21,3,19,3);g.stroke();
    g.strokeStyle="#7e8a96";g.lineWidth=3;g.beginPath();g.moveTo(18,6);g.lineTo(20,3);g.stroke();n("#b0bcc8",7,15,1,1);rust(9,13);rust(13,9);}
  return o;};}
{const _m=c4Mini;c4Mini=function(k,x,y){const f=(c,a,b,w,h)=>fill(c,x+a,y+b,w,h);
  if(k==="strip"){f("#7e8a96",0,2,7,2.4);f("#b0bcc8",0,2,7,0.8);}else if(k==="hook"){f("#7e8a96",1,1,5,1.4);f("#7e8a96",1,1,1.4,5);}
  else if(k==="plate"){f("#7e8a96",1,1,5,5);f("#b0bcc8",1,1,5,1);f("#3a3a40",3,3,1,1);}
  else if(k==="screw"){f("#c8ced6",3,0,1.4,6);f("#c8ced6",2,0,3.4,1);f("#5a626a",2,2,3.4,0.5);f("#5a626a",2,4,3.4,0.5);}
  else if(k==="nail"){f("#8a8a90",3,1,1,5);f("#4a4a50",2,0,3,1);}
  else if(k==="crow"){f("#7e8a96",0,5,7,1.4);f("#7e8a96",0,1.6,1.4,4.4);f("#b0bcc8",0,5,7,0.6);}
  else _m(k,x,y);};}
/* ---------------- dev tools: the port ---------------- */
C3_DEVBTN.push(["PART 5: BRIDGE PORT",[["c3_yarr","PORT: ARRIVAL CUTSCENE"],["c3_ytask","PORT: SKIP TO TASKS (TIMER ON)"],["c3_ymetal","GIVE 3 METAL + SCREW + NAIL"],["c3_ycrow","GIVE CROWBAR"],["c3_yshop","OPEN WORKBENCH"],["c3_ytry","OPEN GATE (TRY KEYS) SCREEN"],["c3_yshow","SHOW LOOSE CONTAINERS"],["c3_yt10","SHIP TIMER: 0:10 LEFT"],["c3_yfreeze","SHIP TIMER: FREEZE"],["c3_ygate","START GATE MINIGAME"],["c3_yboard","PLAY BOARDING CUTSCENE"],["c3_yleft","PLAY SHIP-LEAVES CUTSCENE"],["c3_ywater","WATER ENDING -> PORT QUEST"],["c3_yreset","RESET PORT"]]]);
{const _pre=c3DevPre;c3DevPre=function(a){_pre(a);if(a==="port"){const S4=c4DevRiverReady();S4.seg.forEach((s)=>{s.st=1;s.rope=1;s.logs=3;});Object.assign(S4,{bridge:1,bcol:1,drank:1,end:1,gone:1,met:0,t8on:0});S4.box||c4Boxes();S4.pt=c4PtFresh();}};}
{const _dev=c3Dev;c3Dev=function(a){if(a.slice(0,4)!=="c3_y")return _dev(a);c4Dev3(a);};}
{const _h=c3DevHTML;c3DevHTML=function(btn){return _h((on,attr,lab)=>btn(attr==='data-a="c3_yfreeze"'?!!C4.freeze:on,attr,attr==='data-a="c3_yfreeze"'?"SHIP TIMER: "+(C4.freeze?"FROZEN":"RUNNING"):lab));};}
function c4Dev3(a){const close=()=>{modal=0;Oo=0;Do.hidden=!0;};
  const inPort=()=>{if(room!=="port"){toast("Teleport to the PORT first (CH2 BRIDGE PORT).",1800);return!1;}return!0;};
  if(a==="c3_yarr"){c3DevPre("port");c4DevGo("port",null);return;}
  if(a==="c3_ytask"){c3DevPre("port");const P=c4P();c4DevGo("port",null);P.arr=1;P.t=C4_PTIME;C4.ship.x=0;if(C3.cut){C3.cut=null;tnBars(0);tnCap("");}c4PtInit();updateGuide();return;}
  if(a==="c3_ymetal"){const P=c4P();P.metal={strip:1,hook:1,plate:1};P.screw=1;P.nail=1;["pstrip","phook","pplate","pscrew","pnail"].forEach((k)=>{inv.includes(k)||inv.push(k);got.add(k);});updateBag();updateGuide();close();toast("3 metal + screw + nail added.",1600);return;}
  if(a==="c3_ycrow"){const P=c4P();P.crow=1;P.tried=1;P.metal={strip:0,hook:0,plate:0};P.screw=P.nail=0;inv=inv.filter((k)=>!["pstrip","phook","pplate","pscrew","pnail"].includes(k));inv.includes("pcrow")||inv.push("pcrow");got.add("pcrow");updateBag();updateGuide();close();toast("Crowbar added.",1400);return;}
  if(a==="c3_yshop"){if(!inPort())return;close();c4ShopOpen();return;}
  if(a==="c3_ytry"){if(!inPort())return;close();c4TryOpen();return;}
  if(a==="c3_yshow"){if(!inPort())return;const P=c4P();c4PtInit();close();toast("<b>LOOSE:</b> "+P.loose.map((q)=>"#"+(q.i+1)+" "+q.k).join(", ")+"<br>(containers numbered 1-7 from the left)",5000);return;}
  if(a==="c3_yt10"){if(!inPort())return;c4P().t=600;close();toast("Ship leaves in 10 s.",1400);return;}
  if(a==="c3_yfreeze"){C4.freeze=C4.freeze?0:1;_o();return;}
  if(a==="c3_ygate"){if(!inPort())return;const P=c4P();P.crow=1;P.tried=1;P.hits=0;close();c4GateStart();return;}
  if(a==="c3_yboard"){if(!inPort())return;close();const P=c4P();P.hits=3;P.open=1;c3CutStart("c4board");return;}
  if(a==="c3_yleft"){if(!inPort())return;close();c3CutStart("c4left");return;}
  if(a==="c3_ywater"){const S4=c4DevRiverReady();Object.assign(S4,{bridge:1,bcol:1,drank:1,end:0,t8on:1,w:4,fire:3,filt:1});S4.box||c4Boxes();["pot","bottle"].forEach((k)=>{inv.includes(k)||inv.push(k);got.add(k);});inv.includes("bottle")||inv.push("bottle");updateBag();c4DevGo("river",C4_CAMP+6);S4.drank=0;S4.w=4;setTimeout(()=>c3CutStart("c4drink"),900);return;}
  if(a==="c3_yreset"){c4S().pt=c4PtFresh();C4.ship.x=320;C4.gate=null;C4.yank=null;close();c3CloseAll();toast("Port progress reset.",1600);return;}}
{const _inf=c3DevInfo;c3DevInfo=function(){let t=_inf();if(room==="port"){const P=c4P();t+="\nport arr "+P.arr+" ship "+Math.ceil(P.t/60)+"s metal "+c4PMetal()+"/3 screw "+P.screw+" nail "+P.nail+" crow "+P.crow+" hits "+P.hits+" open "+P.open+"\nloose "+P.loose.map((q)=>(q.i+1)+q.k[0]+(P.yk[q.i]?"*":"")).join(" ");}return t;};}
{const _bx=c3DevBoxes;c3DevBoxes=function(){_bx();if(room!=="port")return;ctx.strokeStyle="#5aff7a";ctx.strokeRect(C4_GATE+9,C2_FLOOR-50,1,50);ctx.strokeStyle="#ffd23a";C4_PX.forEach((x)=>ctx.strokeRect(x-19,C2_FLOOR-2,38,2));[C4_MOTOR,C4_PSCREW,C4_PNAIL].forEach((x)=>ctx.strokeRect(x-12,C2_FLOOR-2,24,2));};}
