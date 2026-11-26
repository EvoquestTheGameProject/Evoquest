
/* ======================= CHAPTER 2, PART 4: THIRST (the note, the river, the broken bridge, clean water) ======================= */
var C4_RW=900,C4_R0=250,C4_R1=450,C4_SEG=40,C4_N=5,C4_DW=1900,C4_BW=1000,C4_DECK=50,C4_T3=10800,C4_T8=28800,C4_NOTE=330,C4_CAMP=625,C4_BOIL=1800,C4_COAL=600;
var C4_CAP={log:6,stake:2,rope:3};
var C4={mini:null,strike:null,bfall:0,flood:0,wave:-1,sun:0,dbreak:0,rats:[],sw:null,hold:0,pour:0,drink:0,beav:0};
/* the river's right bank: trees to chop for the bridge, vines for rope, and the camp gear for later */
var C4_TREES=[532,585,715,795,830,878],C4_VINES=[556,742,852];
var C4_SPOT={fill:455,gravel:470,sand:488,flint:506,camp:C4_CAMP,sticks:655,birch:685,grass:768};
var C4_SHADE={river:[40,150,532,585,640,685,715,795,830,878],rroad:[1840,1715,1560,1360,1150,1010,790,560,330,120],cbridge:[]};
/* the seven containers: two on the fallen deck, three under the standing span (right), two on the left */
var C4_POS=[{x:507,y:70},{x:418,y:82},{x:618,y:92},{x:672,y:92},{x:726,y:92},{x:205,y:92},{x:95,y:92}];
var C4_COL=[["RED","#c8342a"],["BLUE","#2a62c8"],["GREEN","#2a9a4a"],["YELLOW","#d8b02a"],["ORANGE","#e0762a"],["TEAL","#1a9a9a"],["PURPLE","#8a4ac8"]];
var C4_SLABS=[{x:548,y:58,w:52},{x:470,y:70,w:78},{x:380,y:82,w:90}];
function c4Fresh(){const seg=[],piles=[];for(let i=0;i<C4_N;i++)seg.push({st:0,rope:0,logs:0});C4_TREES.forEach(()=>piles.push({log:0,stake:0}));
  return{on:0,met:45,seen:0,note:0,arr:0,seg,car:{log:0,stake:0,rope:0},trees:C4_TREES.map(()=>0),piles,vines:C4_VINES.map(()=>2),dam:C4_T3,damOn:0,bridge:0,road:0,bcol:0,box:null,t8:C4_T8,t8on:0,
    fire:0,fireT:0,w:0,onFire:0,boil:0,mat:{stick:0,bark:0,grass:0,sand:0,gravel:0,flint:0,coal:0},filt:0,drank:0,end:0,cp:null,pt:c4PtFresh()};}
function c4S(){const S=c3S();if(!S.c4||!S.c4.seg)S.c4=c4Fresh();if(!S.c4.pt)S.c4.pt=c4PtFresh();return S.c4;}
function c4Is(id){const d=C2[id===undefined?room:id];return!!(d&&d.c4);}
function c4Rooms(){if(C2.river)return;
  const mk=(id,name,W,seeds)=>{C2[id]={name,L:null,R:null,W,cars:[],seeds,c3:1,c4:1};rooms[id]={name,L:null,R:null,W,crates:[],items:[],ints:[],plats:[]};C2_F[id]={trees:[],vines:[],branches:[],gantries:[],smoke:[]};};
  mk("river","THE RIVER CROSSING",C4_RW,[81,82]);mk("rroad","THE RIVER ROAD",C4_DW,[83,84]);mk("cbridge","THE BROKEN BRIDGE",C4_BW,[85,86]);
  rooms.cbridge.sy=C4_DECK;
  /* the same tree and car models as the rest of chapter 2 */
  c3Flora("river",[42,168],0.3).smoke=[[60,70]];
  c3Flora("rroad",C4_SHADE.rroad,0.35).smoke=[[300,64],[1500,62]];
  C2.rroad.cars=[[1630,"sedan"],[1170,"hatch"],[680,"sedan"],[230,"hatch"]].map((q,i)=>c4BigCar(q[0],q[1],i+40));
  C2.rroad.cars.forEach((c)=>rooms.rroad.plats.push({x:c.x,y:C2_FLOOR-c.h,w:c.w}));
  Object.assign(De,{river:{c:"92,130,112",l:"255,238,196",a:0.14,dk:0.28},rroad:{c:"120,118,92",l:"255,232,172",a:0.14,dk:0.3},cbridge:{c:"96,108,112",l:"240,232,204",a:0.16,dk:0.34}});
  const I=rooms.river.ints;I.push({id:"c4_build",x:C4_R1,r:0,label:"BUILD"});
  C4_TREES.forEach((x,i)=>I.push({id:"c4_tree:"+i,x,r:0,label:"CHOP"}));C4_VINES.forEach((x,i)=>I.push({id:"c4_vine:"+i,x,r:0,label:"PULL VINE"}));
  Object.keys(C4_SPOT).forEach((k)=>I.push({id:"c4_"+k,x:C4_SPOT[k],r:0,label:k.toUpperCase()}));
  C4_POS.forEach((p,i)=>rooms.cbridge.ints.push({id:"c4_box:"+i,x:p.x,r:0,label:"CONTAINER"}));
  rooms.forest.ints.push({id:"c4_note",x:C4_NOTE,r:0,label:"READ NOTE"});
  c4BridgePlats(0);}
c4Rooms();
function c4BridgePlats(col){const P=rooms.cbridge.plats;P.length=0;P.push({x:600,y:C4_DECK,w:400});
  if(!col)P.push({x:300,y:C4_DECK,w:300});else C4_SLABS.forEach((s)=>P.push({x:s.x,y:s.y,w:s.w}));}

/* ---------------- dehydration ---------------- */
function c4MeterOn(){const S=c3S();return!!(S.done&&S.c4&&S.c4.on&&!S.c4.drank);}
function c4NearShade(x){const L=C4_SHADE[room]||[];for(let i=0;i<L.length;i++){const t=L[i];if(room==="river"&&C4_TREES.indexOf(t)>=0&&c4S().trees[C4_TREES.indexOf(t)])continue;if(Math.abs(x-t)<22)return!0;}return!1;}
/* 0 = shade, 1 = sun, 2 = blazing sun (open water glare, bare tarmac) */
function c4Sun(){if(C4.sunT!=null&&C4.sunT<3)return C4.sunT;if(room==="forest")return 0;const x=player.x,S4=c4S();
  if(room==="river")return x>C4_R0-4&&x<C4_R1+4?2:c4NearShade(x)?0:1;
  if(room==="rroad")return c4NearShade(x)?0:x>860&&x<1300?2:1;
  if(room==="cbridge"){if(player.y>C4_DECK+6&&x>598&&x<760)return 0;return player.y<=C4_DECK+1?2:1;}
  return 1;}
var C4_RATE=[0.022,0.05,0.085];
var C4_DIE={dehyd:["DEHYDRATED","Your body is about 60% water and loses some with every breath and every drop of sweat. In hot sun you sweat much faster. Rest in the shade of trees and under bridges, and get to safe water sooner."],
  swept:["SWEPT AWAY","A bridge is only as strong as its joints. Without rope lashing, each log was only resting on its post. When the whole bridge took the river's push, nothing held the pieces together, so they slid apart. Tie every segment!"],
  dam:["THE DAM BROKE","The mutated animals chewed through the dam and a wall of water came down the valley. Watch the DAM timer at the top of the screen and work fast: plan your trips so you never walk empty-handed."],
  ship:["THE SHIP SAILED WITHOUT YOU","The last ship left on schedule. When a job has a deadline, plan the whole route first: look for what you need in one sweep instead of backtracking, and keep moving."],
  dam3:["THE DAM BROKE","The dam gave way before the bridge was finished. Work fast: chop trees for logs and stakes, pull vines for rope, and carry as much as you can on every trip to the river."]};
function c4Die(k){if(dead)return;const D=C4_DIE[k]||C4_DIE.dam;
  if(Eo.god){if(k==="dehyd"){c4S().met=90;}toast("<b>DEV GOD MODE:</b> you would have died: "+D[0],2200);return!1;}
  C3.task=null;C3.busy=0;C4.mini=null;C4.strike=null;c2Die(D[0],D[1]);return!0;}
function c4Tick(){const S4=c4S();
  if(c4MeterOn()){const z=c4Sun();C4.sun=z;S4.met=Math.min(100,S4.met+C4_RATE[z]/60);
    if(S4.met>=60)c3Tip("m60","<b>DEHYDRATION 60%.</b><br>Your mouth is dry and your head aches. Stay in the shade when you can: <b>direct sun makes you sweat much faster.</b>",3600);
    if(S4.met>=80)c3Tip("m80","<b>DEHYDRATION 80%!</b><br>Dizzy and slow. You need clean water very soon.",3000);
    if(S4.met>=92)c3Tip("m92","<b>DEHYDRATION 92%!!</b><br>Get into the shade NOW.",2600);
    if(S4.met>=100){S4.met=100;c4Die("dehyd");return;}}
  if(S4.damOn&&!S4.bridge&&S4.arr&&!C4.freeze){S4.dam--;S4.dam===1800&&toast("<b>ONE MINUTE LEFT!</b><br>The dam is groaning.",2200);if(S4.dam<=0){S4.dam=0;c4DamFail();return;}}
  if(S4.t8on&&!S4.end&&!C4.freeze){S4.t8--;S4.t8===3600&&toast("<b>ONE MINUTE UNTIL THE DAM BREAKS!</b>",2400);if(S4.t8<=0){S4.t8=0;c4DamFail();return;}}
  if(room==="port"){const P=S4.pt;if(P.arr&&!P.open&&!P.done&&!C4.freeze&&!C3.cut){P.t--;P.t===3600&&toast("<b>ONE MINUTE LEFT!</b><br>The ship is loading its last cargo.",2200);P.t===1800&&toast("<b>30 SECONDS!</b>",1800);if(P.t<=0){P.t=0;c4ShipLeaves();return;}}}
  if(S4.fire===3)S4.fireT++;
  if(S4.onFire&&S4.fire===3&&(S4.w===1||S4.w===3)&&S4.boil<C4_BOIL){S4.boil++;
    S4.boil===C4_BOIL&&($sx("success"),toast(S4.w===1?"<b>30 SECONDS AT A ROLLING BOIL.</b><br>The heat has killed most of the germs. Take the pot off the fire.":"<b>BOILED AGAIN!</b><br>Take the pot off the fire, then pour the water into your clean bottle.",3200));}}
function c4DamFail(){if(Eo.god){const S4=c4S();S4.bridge?(S4.t8=3600):(S4.dam=3600);toast("<b>DEV GOD MODE:</b> the dam would have broken. +1 minute.",2200);return;}c3CutStart("c4dam");}

/* ---------------- checkpoints: a full snapshot, so a failed run puts everything back ---------------- */
function c4CP(rm,name){const S4=c4S(),st=JSON.parse(JSON.stringify(Object.assign({},S4,{cp:null})));S4.cp={room:rm,name,inv:inv.slice(),got:[...got],st};c2Save(rm);
  toast("<b>"+name+"</b><br><span style=\"color:#8aff9a\">&#10004; CHECKPOINT SAVED</span>",2600);}
function c4Restore(){const S4=c4S(),cp=S4.cp;if(!cp)return!1;c4CloseAll();
  inv=cp.inv.slice();got=new Set(cp.got);const st=JSON.parse(JSON.stringify(cp.st));st.cp=cp;st.met=Math.min(st.met,75);c3S().c4=st;
  qs("#gd").hidden=!0;dead=!1;hp=5;invuln=60;player.kb=0;shots=[];won=0;fadeNow=1;fadeTo=0;C3.task=null;C3.busy=0;
  enterRoom(cp.room,"R");updateBag();updateHud();updateGuide();toast("<b>BACK TO THE CHECKPOINT</b><br>"+cp.name+". Dehydration "+Math.round(st.met)+"%.",2600);return!0;}
function c4Retry(){if(c5Is())return c5Retry();const S4=c3S().c4;if(!S4||!S4.cp||!(c4Is()||(room==="forest"&&c3S().done)))return!1;return c4Restore();}
function c4CloseAll(){C4.mini=null;C4.strike=null;C4.sw=null;C4.hold=0;C4.pour=0;C4.drink=0;C4.flood=0;C4.wave=-1;C4.dbreak=0;C4.bfall=0;
  C4.yank=null;C4.gate=null;C4P=null;C4TR=null;C4.bp=null;
  ["#c4Note","#c4Search","#c4Filt","#c4Flow","#c4Shop","#c4Try"].forEach((k)=>{const e=qs(k);if(e&&!e.hidden){e.hidden=!0;e.__stop&&e.__stop();}});
  modal===4&&(modal=0);}

/* ---------------- entering the places ---------------- */
function c4Enter(t){if(c5Is(t))return c5Enter(t);const S4=c4S();c3ResetFlora(t);C4.thirstCd=0;c3S().done&&!S4.on&&(S4.on=1);C4.mini=null;C4.strike=null;C4.rats=[];C4.flood=0;C4.wave=-1;C4.dbreak=0;C4.bfall=0;C4.drink=0;C4.hold=0;C4.pour=0;player.y=C2_FLOOR;
  if(t==="river"){rooms.river.L="rroad";rooms.river.R=null;
    if(S4.end){player.x=C4_R0-30;player.face=-1;}else if(player.x>C4_RW/2){player.x=C4_RW-16;player.face=-1;}else{player.x=16;player.face=1;}
    camX=c3Clamp(player.x-96,0,C4_RW-192);
    c4Warm("rroad");
    if(!S4.arr){c3CutStart("c4arr");S4.arrSeen&&(C3.cut.t=488,player.x=640,player.face=-1);}}
  else if(t==="rroad"){c4Warm("cbridge");rooms.rroad.L="cbridge";rooms.rroad.R="river";camX=c3Clamp(player.x-96,0,C4_DW-192);
    if(!S4.road){S4.road=1;toast("<b>THE RIVER ROAD</b><br>An old road beside the river, heading west. The trees give a little shade.",3600);}}
  else if(t==="cbridge"){rooms.cbridge.L=S4.end?"port":null;rooms.cbridge.R=(S4.t8on||S4.end||(inv.includes("pot")&&inv.includes("bottle")))?"rroad":null;c4BridgePlats(S4.bcol);
    if(player.x<100){player.x=24;player.y=C2_FLOOR;player.face=1;camX=0;}else{player.x=C4_BW-16;player.y=C4_DECK;player.face=-1;camX=C4_BW-192;}
    S4.end&&c4Warm("port");
    if(S4.bcol&&!S4.t8on&&!S4.end&&!(inv.includes("pot")&&inv.includes("bottle")))toast("<b>THE BROKEN BRIDGE</b><br>Climb down the fallen slabs and search the containers.",3200);}
  else if(t==="port"){c4PtInit();C4.ship={x:S4.pt.arr?0:320};C4.gate=null;C4.yank=null;camX=c3Clamp(player.x-96,0,C4_PW-192);if(!S4.pt.arr){player.x=C4_PW-30;player.face=-1;camX=C4_PW-192;c3CutStart("c4parr");}}
  if(t==="river"&&S4.end)C4.dbreak=0.85;
  updateGuide();}
function c4ForestEnter(){const S=c3S(),S4=c4S();if(!S.done)return;
  if(!S4.on){S4.on=1;S4.met=45;c4CP("forest","After the dream");}
  c4Warm("river");
  rooms.forest.L=S4.note?"river":null;}
function c4Pre(){if(c5Is()){c5Pre();return;}if(!C4)return;const S4=c3S().c4;
  if(C4.mini||C4.strike||C4.hold||C4.yank||C4.gate){player.vx=0;player.walk=0;jumpBuf=0;}
  if(c4MeterOn()&&S4.met>=70)player.vx*=0.86;}
/* the river can't be walked across until the bridge reaches the other side; the embankment wall under the bridge */
function c4Walls(x0){if(!c4Is())return!1;if(c5Is())return c5Walls(x0);const S4=c4S();
  if(room==="river"&&!S4.bridge){const tip=c4Tip()+3;if(player.x<tip){player.x=tip;player.vx=0;}}
  if(room==="river"&&S4.gone&&player.x>C4_R0-4){player.x=C4_R0-4;player.vx=0;}
  if(room==="port"&&!S4.pt.open&&player.x<C4_GATE+9){player.x=C4_GATE+9;player.vx=0;}
  if(room==="cbridge"&&player.y>C4_DECK+4&&player.x>757){player.x=757;player.vx=0;}
  return!0;}
function c4Done(){let n=0;for(const s of c4S().seg){if(s.logs>=3)n++;else break;}return n;}
function c4Tip(){return C4_R1-C4_SEG*c4Done();}
function c4Tired(){return!!(c4MeterOn()&&c4S().met>=60&&!C3.lie);}

/* ---------------- guide + arrow ---------------- */
function c4Goal(){const S=c3S(),S4=c4S(),M=S4.mat,has=(k)=>inv.includes(k);
  if(S4.end){if(room==="port")return c4PortGoal();if(S4.pt.done)return["The Ridge Tower is still out there.",null];return["<b>Follow the old road WEST (left)</b> to the bridge port.<br>Every shipping label said RIDGE TOWER DEPOT: a ship might still sail from there.",-1];}
  if(room==="forest")return S4.note?["<b>Keep heading WEST (left).</b><br>Find the crashed ships' cargo containers.",-1]:["<b>Something is pinned to a tree.</b><br>Go and read it.",C4_NOTE];
  if(!S4.bridge){if(!S4.arr)return["",null];const d=c4Done(),s=S4.seg[d]||{},C=S4.car;
    const need=!s.st?"stake":s.logs<3&&!s.rope&&!s.logs?"rope or logs":"logs";
    const empty=!C.log&&!C.stake&&!C.rope;
    return["<b>BUILD THE BRIDGE: segment "+(d+1)+" of "+C4_N+".</b><br>Chop trees for <b>logs + stakes</b> and pull vines for <b>rope</b>. At the end of the bridge: plant a stake, <b>tie it with rope</b>, then lay 3 logs.<br>Carrying: "+C.log+"/"+C4_CAP.log+" logs, "+C.stake+"/"+C4_CAP.stake+" stakes, "+C.rope+"/"+C4_CAP.rope+" rope.",empty||(need==="stake"&&!C.stake)||(need==="logs"&&!C.log)?c4NearestSource(need):c4Tip()];}
  if(!S4.bcol)return["<b>Follow the road WEST (left)</b> to the bridge.",-1];
  if(!(has("pot")&&has("bottle"))&&!S4.t8on){const B=S4.box;let msg="<b>Search the cargo containers.</b><br>";
    if(B){const nx=B.chain[B.step];msg+=B.step===0?"Find the one with a torn-open side.":inv.includes("ckey")?"You have a key with a <b style=\"color:"+C4_COL[B.col[nx]][1]+"\">"+C4_COL[B.col[nx]][0]+"</b> tag. Find the container with the matching padlock.":"Search inside for a key.";}
    return[msg,null];}
  if(room!=="river")return["<b>8-MINUTE DAM WARNING!</b><br>Head back EAST (right) to the river crossing, where the water is.",1];
  if(S4.w===4&&!S4.onFire)return["<b>Pour the boiled water into your clean bottle</b> at the campfire.",C4_CAMP];
  const tick=(b)=>b?"&#10004; ":"&#9744; ";
  const L=[[S4.fire===3,"Light a campfire: dry sticks, tinder (dry grass + birch bark), then strike the flint with the back of the axe"],[S4.w>=1,"Fill the pot at the river"],[S4.w>=2,"Boil it for 30 seconds"],[S4.filt,"Build a filter: birch-bark cone, grass, charcoal, sand, gravel"],[S4.w>=3,"Pour the boiled water through the filter"],[S4.w>=4,"Boil it again for 30 seconds"],[S4.drank,"Fill your clean bottle and drink"]];
  return["<b>MAKE THE RIVER WATER SAFE.</b><br>"+L.map((q)=>tick(q[0])+q[1]).join("<br>"),c4NextSpot()];}
function c4NearestSource(k){const S4=c4S();let best=null,bd=1e9;
  const tryX=(x)=>{const d=Math.abs(x-player.x);if(d<bd){bd=d;best=x;}};
  if(k==="rope or logs"||k==="rope"){C4_VINES.forEach((x,i)=>S4.vines[i]>0&&tryX(x));}
  if(k!=="rope"){C4_TREES.forEach((x,i)=>(!S4.trees[i]||S4.piles[i].log||S4.piles[i].stake)&&tryX(x));}
  return best;}
function c4NextSpot(){const S4=c4S(),M=S4.mat;
  if(S4.fire<1)return M.stick>=3?C4_CAMP:C4_SPOT.sticks;
  if(S4.fire<2)return!M.grass?C4_SPOT.grass:!M.bark?C4_SPOT.birch:C4_CAMP;
  if(S4.fire<3)return M.flint?C4_CAMP:C4_SPOT.flint;
  if(S4.w===0)return C4_SPOT.fill;
  if((S4.w===1||S4.w===3)&&!S4.onFire)return C4_CAMP;
  if(S4.onFire&&S4.boil>=C4_BOIL)return C4_CAMP;
  if(S4.w===2&&!S4.filt){if(!M.bark)return C4_SPOT.birch;if(!M.grass)return C4_SPOT.grass;if(!M.sand)return C4_SPOT.sand;if(!M.gravel)return C4_SPOT.gravel;if(!M.coal)return S4.fireT>=C4_COAL?C4_CAMP:null;return C4_CAMP;}
  if(S4.w===2&&S4.filt)return C4_CAMP;
  if(!S4.filt){if(!M.bark)return C4_SPOT.birch;if(!M.grass)return C4_SPOT.grass;if(!M.sand)return C4_SPOT.sand;if(!M.gravel)return C4_SPOT.gravel;}
  return C4_CAMP;}
function c4Guide(){if(c5Is())return c5Guide();const g=qs("#ggb");qs("#gg h4 span").textContent="QUEST";const q=c4Goal();g.innerHTML=q[0]||"<b>…</b>";return!0;}
function c4Arrow(){if(c5Is())return c5Arrow();if(modal||won||dead||C3.cut||C3.busy||C4.mini||C4.strike)return;const q=c4Goal(),t=q[1];if(t==null)return;
  if(t===-1){vo(camX+18,56,-1);return;}if(t===1){vo(camX+174,56,1);return;}
  if(Math.abs(t-player.x)<22)return;const d=t>player.x?1:-1;vo(player.x+d*16,player.y-44,d);}
