
/* ======================= CHAPTER 2, PART 3: THE WIRED RADIO, THE CRACKED ROAD, THE OLD FOREST, THE DREAM ======================= */
/* everything here is "var"/function-declared so the hooks patched into older code are safe even before this block has run */
/* v50.1: the fire chase (second half, x<3380 in the original layout) is half as long. Layouts below are
   written in the original coordinates and remapped: first half shifts left, second half is squeezed 2:1
   and every other hazard in it is dropped, so it is shorter without getting denser. */
var C3_OCUT=3380,C3_SQ=(3380-64)/2,C3_W=6720-C3_SQ,C3_CUT=C3_OCUT-C3_SQ,C3_CP=5060-C3_SQ,C3_FW=1152,C3_END=64;
function c3M(x){return x>=C3_OCUT?x-C3_SQ:C3_END+(x-C3_END)/2;}
function c3Thin(a,gx){let k=0;return a.filter((q)=>{const x=gx(q);if(x>=C3_OCUT)return!0;return k++%2===0;});}
var C3={t:0,cut:null,ch:null,busy:0,slowT:0,stun:0,dark:0,lie:0,dreamOn:0,holes:[],worms:[],fv:[],pack:[],tank:null,fly:null,big:null,chasm:0,grow:0,crack:0,fireCut:null,cache:{},chunks:{},nChunks:0,once:{},drops:[],chop:null,cooked:0};
function c3Fresh(){return{wr:0,cp:0,wired:0,hints:0,road:0,cp1:0,half:0,roadDone:0,fin:0,f:{},bed:0,slept:0,done:0};}
function c3S(){if(!TS.c3)TS.c3=c3Fresh();return TS.c3;}
function c3Mine(id){const d=C2[id===undefined?room:id];return!!(d&&d.c3);}
function c3Cv(w,h){const c=document.createElement("canvas");c.width=w;c.height=h;return c;}
function c3Blank(){return c3Cv(2,2);}
function c3Clamp(v,a,b){return v<a?a:v>b?b:v;}
function c3Ez(k){k=c3Clamp(k,0,1);return k*k*(3-2*k);}

/* ---------------- the two new areas ---------------- */
var C3_HOLES1=[[6600,16],[6290,14],[5960,18],[5640,15],[5330,20],[4990,16],[4660,18],[4340,15],[4010,20],[3720,16],[3560,22]];
var C3_HOLES2=[[3290,16],[2915,18],[2318,18],[1535,20],[965,18],[155,16]];
C3_HOLES1=C3_HOLES1.map((h)=>[c3M(h[0]),h[1]]);C3_HOLES2=c3Thin(C3_HOLES2,(h)=>h[0]).map((h)=>[c3M(h[0]),h[1]]);
var C3_WORMS=[6200,5550,4720,3960,2740,1940,1110,625];
var C3_FV=[[3140,"t"],[2870,"x"],[2570,"t"],[2280,"x"],[1990,"t"],[1680,"x"],[1380,"t"],[1080,"x"],[780,"t"],[470,"x"]];
C3_WORMS=c3Thin(C3_WORMS,(x)=>x).map(c3M);C3_FV=c3Thin(C3_FV,(v)=>v[0]).map((v)=>[c3M(v[0]),v[1]]);
var C3_POOLS=[{x:860,w:44},{x:500,w:70},{x:150,w:56}];
var C3_FI={axe:1060,leaves:925,bench:765,log:590,moss:410,pine:250,vine:80,whet:545,fern:300,vineb:700,vinec:1002,dleaves:893};
function c3RoadCars(){const L=[[6450,"sedan"],[6100,"van"],[5780,"hatch"],[5450,"truck"],[5100,"sedan"],[4800,"bus"],[4480,"hatch"],[4150,"van"],[3850,"sedan"],[3455,"hatch",1],[3200,"sedan"],[2950,"van"],[2650,"hatch"],[2350,"truck"],[2050,"sedan"],[1750,"van"],[1450,"hatch"],[1150,"bus"],[850,"sedan"],[520,"hatch"],[260,"van"],
    [3080,"hatch"],[2800,"sedan"],[2500,"hatch"],[2200,"hatch"],[1870,"hatch"],[1580,"sedan"],[1300,"hatch"],[1000,"sedan"],[700,"hatch"],[400,"sedan"]];
  return c3Thin(L,(q)=>q[2]||[2650,1450,520].includes(q[0])?C3_OCUT:q[0]).map((q,i)=>{const c=c2NewCar(c3M(q[0]),q[0]<C3_OCUT&&(q[1]==="truck"||q[1]==="bus")?"van":q[1],i+20);c.burn=false;q[2]&&(c.crash=1);return c;});}
function c3Flora(id,xs,deadP){const f=(C2_F[id]={trees:[],vines:[],branches:[],gantries:[],smoke:[]}),plats=rooms[id].plats;
  xs.forEach((x,i)=>{const sd=(id==="forest"?700:600)+i*13,side=r(i,sd+2)<0.5?-1:1,t={x,side,dead:r(i,sd+1)<deadP,top:72+14*r(i,sd+3),s:sd+i},
    low={x,side,h:30+4*r(i,sd+4),len:26+8*r(i,sd+5),rot:0,load:0,snapT:0,gone:0},
    up={x,side:-side,h:52+8*r(i,sd+6),len:30+10*r(i,sd+7),rot:r(i,sd+8)<0.35?1:0,load:0,snapT:40+((70*r(i,sd+9))|0),gone:0};
    t.br=[low,up];[low,up].forEach((b)=>{b.p={x:b.side<0?b.x-b.len:b.x,y:C2_FLOOR-b.h,w:b.len,br:b};plats.push(b.p);f.branches.push(b);});
    const s2=sd+3*i,len=up.h-6,top=C2_FLOOR-up.h;f.vines.push({x:x+up.side*up.len,top,len,rot:r(i,sd+10)<0.4?1:0,dir:-up.side,s:s2,t:0,snapY:top+len*(0.15+0.7*r(s2,9)),broken:0});
    f.trees.push(t);});
  return f;}
function c3Rooms(){if(C2.wroad)return;
  C2.wroad={name:"THE CRACKED ROAD",L:null,R:null,W:C3_W,cars:c3RoadCars(),seeds:[61,62,63],c3:1};
  C2.forest={name:"THE OLD FOREST",L:null,R:null,W:C3_FW,cars:[],seeds:[71,72],c3:1};
  ["wroad","forest"].forEach((k)=>{const d=C2[k];rooms[k]={name:d.name,L:null,R:null,W:d.W,crates:[],items:[],ints:[],plats:d.cars.map((c)=>({x:c.x,y:C2_FLOOR-c.h,w:c.w}))};});
  c3Flora("wroad",c3Thin([6360,5880,5230,4580,4060,2440,1535,925],(x)=>x).map(c3M),0.6).smoke=[[6300,64],[5200,60],[4300,66],[3300,62],[2100,64],[900,60]].map((q)=>[c3M(q[0]),q[1]]);
  c3Flora("forest",[990,700,330,40],0.15);
  Object.assign(De,{wroad:{c:"150,96,66",l:"255,164,100",a:0.17,dk:0.36},forest:{c:"70,110,80",l:"210,230,160",a:0.2,dk:0.4}});
  const I=rooms.forest.ints;
  [["c3_place",0,"PLACE BED"],["c3_bed",0,"SLEEP"],["c3_axe",C3_FI.axe,"TAKE AXE"],["c3_leaves",C3_FI.leaves,"GATHER"],["c3_bench",C3_FI.bench,"WORKBENCH"],["c3_log",C3_FI.log,"CHOP"],["c3_moss",C3_FI.moss,"SCRAPE"],["c3_pine",C3_FI.pine,"CHOP"],["c3_vine",C3_FI.vine,"PULL"],["c3_whet",C3_FI.whet,"WHETSTONE"],["c3_fern",C3_FI.fern,"PICK FERNS"],["c3_vineb",C3_FI.vineb,"PULL VINE"],["c3_vinec",C3_FI.vinec,"PULL VINE"],["c3_dleaves",C3_FI.dleaves,"LEAVES"]].forEach((q)=>I.push({id:q[0],x:q[1],r:0,label:q[2]}));}
c3Rooms();
function c3ResetFlora(id){const f=C2_F[id];if(!f)return;f.branches.forEach((b)=>{b.gone=0;b.load=0;b.p.gone=0;});f.vines.forEach((v)=>{v.broken=0;v.t=0;});}
function c3ResetRoad(){const S=c3S();C3.holes=C3_HOLES1.concat(C3_HOLES2).map((h)=>({x:h[0],w:h[1],cd:0,dip:0}));
  C3.worms=C3_WORMS.map((x)=>({x,st:0,t:0,cd:0,h:0}));C3.fv=C3_FV.map((v)=>({x:v[0],k:v[1],w:v[1]==="t"?18:15,cd:0}));
  C2.wroad.cars.forEach((c)=>{c.burn=false;c.hide=0;});C3.pack=[];C3.tank=null;C3.fly=null;C3.big=null;C3.fireCut=null;C3.ch=null;C3.slowT=0;C3.stun=0;
  C3.grow=S.half?1:0;C3.crack=S.half?1:0;C3.chasm=S.roadDone?1:0;c3ResetFlora("wroad");c3HzReset();
  if(S.half){const cc=C2.wroad.cars.find((c)=>c.crash);cc&&(cc.burn=true);}
  if(S.roadDone)C2.wroad.cars.forEach((c)=>{c.x>150&&(c.burn=true);});}

/* ---------------- small helpers the older code calls ---------------- */
function c3Lock(){return!!(C3&&(C3.cut||C3.busy>0));}
function c3Cut(){return!!(C3&&C3.cut);}
function c3CamX(){if(!C3||!c3Mine())return null;const c=C3.cut;if(c&&c.cx!=null)return c.cx;/* look well AHEAD (to the left) on the cracked road, so potholes, worms and cars are on screen long before you reach them; a little further on phones, where the picture is small */
  if(room==="wroad"&&!c3S().roadDone)return player.x-(C3.ch?(ra?136:126):(ra?128:112));return null;}
function c3TiredF(){return!!(C3&&C3_DEVTIRED&&room==="forest"&&!c3S().done&&!C3.lie);}
function c3Tired(){return c3TiredF()||(typeof c4Tired==="function"&&c4Tired());}
function c3Hide(){return!!(C3&&C3.lie&&c3Mine());}
function c3Pool(x){for(const p of C3_POOLS)if(Math.abs(x-p.x)<p.w/2)return p;return null;}
function c3OnFloor(){return player.on&&!player.climb&&player.y>=C2_FLOOR-0.5;}
function c3Pre(){if(!C3||!c3Mine())return;
  if(C3.stun>0){C3.stun--;player.vx=0;player.walk=0;}
  if(C3.slowT>0){C3.slowT--;player.vx*=0.38;}
  if(c4Is()||(room==="forest"&&c3S().done))c4Pre();
  if(room==="forest"){if(c3TiredF()){player.vx*=0.62;player.vy===-4.3&&(player.vy=-3.75);}
    if(c3OnFloor()&&c3Pool(player.x))player.vx*=0.5;}}
var C3_DIE={pothole:["SWALLOWED BY THE ROAD","The road is hollow underneath: rainwater washed the soil away and left a thin crust of asphalt that caves in. Jump every pothole instead of walking into it."],
  worm:["DRAGGED UNDER","The worms feel your footsteps through the ground. When the road shakes and dirt spits up, step back, or get onto a car until the worm dives again."],
  fire:["CAUGHT BY THE FIRE","Burning fuel spreads fire faster than you can walk. Never stop running: jump the holes and vines instead of getting stuck in them, and stay ahead of the flames. The FIRE bar at the top shows how close it is."],
  wolf:["THE PACK CAUGHT YOU","When a wolf crouches and its eyes flash, it is about to lunge low along the road. Jump, or get up onto a car, just before it springs."],
  crow:["TAKEN FROM ABOVE","A crow marks its target with a red circle before it dives. Speed up, slow down or jump so you are not under the mark when it strikes."],
  blast:["CAUGHT IN THE BLAST","A car leaking fuel onto sparking wires WILL explode. When you see sparks and flashing, hang back for a moment and let it go off before you run past."],
  pole:["HIT BY A FALLING POLE","Burning power poles topple when their base burns through. Never stand in the red shadow where one is about to land, and jump the burning log afterwards."],
  rats:["TRAMPLED BY THE SWARM","Panicked rats pour out of the smoke along the ground. When you hear the squeaking and see the warning, JUMP as they run past, or stand on a car."],
  thorn:["TRIPPED","Thorny brown vines catch your feet and throw you down. Jump over them. Green tangles only slow you, but slowing down lets the fire catch up."]};
function c3Hurt(n,kind,dir){if(invuln>0||dead)return!1;if(Eo.god){if(!(C3.wcd>0)){C3.would=C3.would||{};C3.would[kind]=(C3.would[kind]||0)+1;C3.wcd=70;}return!1;}player.climb=null;hp-=n;invuln=70;hurtFlash=14;hitStop=3;$sx("hurt");shake=Math.max(shake,8);
  addFx({k:"ring",x:player.x,y:player.y-17.4,r0:2,r1:14,c:"#ff6a7a",life:12});sparks(player.x,player.y-17.4,8,["#ff4a5a","#ffb0b8"],1.8,0.12,14);
  player.kb=10;player.kbv=1.8*(dir||-1);player.vy=-2.4;player.on=!1;updateHud();
  if(hp<=0){hp=0;const D=C3_DIE[kind]||C3_DIE.fire;c2Die(D[0],D[1]);}return!0;}
function c3Tip(k,html,ms){if(C3.once[k])return;C3.once[k]=1;toast(html,ms||3000);}

/* ---------------- entering the new areas ---------------- */
function c3Stale(t){const bzK=TC&&(TC.k==="sit"||TC.k==="after"||TC.k==="search"||TC.k==="lost");
  if((t!=="beyond"&&(C3W||bzK||(typeof BZR!=="undefined"&&BZR)))||(t!=="forest"&&(C3D||qs("#c3Bench")&&!qs("#c3Bench").hidden))||(t!=="wroad"&&C3L))c3CloseAll();}
function c3Enter(t){if(!C3)return;c3Stale(t);C3.cut=null;C3.busy=0;C3.lie=0;C3.dark=0;C3.stun=0;C3.slowT=0;C3.chop=null;C3.drops=[];
  if(!c3Mine(t)||t!=="wroad")C3.ch=null;if(!c3Mine(t))return;const S=c3S();qs("#cskip").hidden=!0;
  if(c4Is(t)){c4Enter(t);return;}
  if(t==="wroad"){c3ResetRoad();rooms.wroad.L=S.roadDone?"forest":null;
    if(S.roadDone){player.x=34;player.face=-1;}
    else if(S.half){player.x=C3_CUT-6;player.face=-1;c3ChaseStart(C3_CUT+96);toast("<b>RUN!</b><br>The road is burning. Keep heading LEFT and jump everything.",3200);}
    else if(S.cp1)player.x=C3_CP;
    player.y=C2_FLOOR;camX=c3Clamp(player.x-(C3.ch?70:96),0,C3_W-192);
    if(!S.road){S.road=1;toast("<b>THE CRACKED ROAD</b><br>West, the broadcast said. Jump the potholes, and watch the ground for worms.",4200);}
    c2Save("wroad");}
  else{c3ResetFlora("forest");player.y=C2_FLOOR;
    if(S.bed&&S.slept){player.x=S.bed+14;player.face=-1;}
    camX=c3Clamp(player.x-96,0,C3_FW-192);c2Save("forest");
    if(!S.fin)c3CutStart("fin");
    else if(S.slept&&!S.done)c3CutStart("wake",{dark:1});
    c4ForestEnter();}
  updateGuide();}
function c3Retry(){if(!c3Mine())return!1;if(c4Retry())return!0;qs("#gd").hidden=!0;dead=!1;hp=5;invuln=60;player.kb=0;shots=[];fadeNow=1;fadeTo=0;enterRoom(room,"R");updateHud();updateGuide();return!0;}

/* ---------------- guide + arrow ---------------- */
var C3_GL=[["axe","Worn axe (a stump near the entrance)",()=>C3_FI.axe],["whet","Whetstone (by the middle murky pool)",()=>C3_FI.whet],["axe2","SHARPEN the axe at the workbench",()=>C3_FI.bench],
  ["leaves","Dry leaves (NOT the soggy pile by the pool)",()=>C3_FI.leaves],["wood","Rough logs (chop the fallen dead tree)",()=>C3_FI.log],["bough","Pine boughs (chop the young pine)",()=>C3_FI.pine],
  ["moss","Soft moss (the mossy boulder)",()=>C3_FI.moss],["fern","Fern fronds (the fern patch)",()=>C3_FI.fern],
  ["vinea","Vine strand 1 (a loose vine, far left)",()=>C3_FI.vine],["vineb","Vine strand 2 (HIGH in a tree: climb up!)",()=>C3_FI.vineb],["vinec","Vine strand 3 (the dead tree near the entrance)",()=>C3_FI.vinec]];
function c3Need(){const S=c3S();
  for(const q of C3_GL){if(c3Got(q[0]))continue;if(q[0]==="axe2"&&!(c3Got("axe")&&c3Got("whet")))continue;if((q[0]==="wood"||q[0]==="bough")&&!inv.includes("axe2"))continue;return[q[0],q[2]()];}
  for(const q of C3_GL)if(!c3Got(q[0]))return[q[0],q[0]==="wood"||q[0]==="bough"?C3_FI.bench:q[2]()];
  if(!S.bed&&!inv.includes("bedkit"))return["bench",C3_FI.bench];
  if(!S.bed)return["place",null];
  return["bed",S.bed];}
function c3Guide(){if(!c3Mine())return!1;if(c4Is()||(room==="forest"&&c3S().done&&c3S().c4&&c3S().c4.on))return c4Guide();const S=c3S(),g=qs("#ggb");qs("#gg h4 span").textContent="QUEST";
  if(room==="wroad"){g.innerHTML=S.roadDone?"<b>Head LEFT into the forest.</b>":C3.ch?"<b>RUN! The road is on fire.</b><br><b>Cones</b> = pothole: jump. <b>Red !</b> = worm: back off. Cars: jump ONTO them. <b>Yellow</b> = blast / falling pole.":
    "<b>Follow the cracked road LEFT.</b><br>Jump the potholes. When the ground shakes and dirt spits up, a worm is coming: back off or climb onto a car.";return!0;}
  if(S.done){g.innerHTML="<b>Rested.</b><br>The Ridge Tower is still out there. END OF CHAPTER 2 (for now).";return!0;}
  if(S.bed){g.innerHTML="<b>Your bed is ready.</b><br>Stand at it and press USE to sleep.";return!0;}
  if(inv.includes("bedkit")){g.innerHTML="<b>Set up your sleeping space.</b><br>Walk to any dry spot (NOT the murky water) and press USE.";return!0;}
  g.innerHTML="<b>Build a comfortable sleeping space.</b><br>You're exhausted: slow and tired. Gather, then craft at the <b>stone workbench</b> (tools first!):<br>"+C3_GL.map((q)=>(c3Got(q[0])?"&#10004; ":"&#9744; ")+q[1]).join("<br>");return!0;}
function c3Arrow(){if(modal||won||dead||C3.cut||C3.busy)return;const S=c3S();if(c4Is()||(room==="forest"&&S.done))return c4Arrow();
  if(room==="wroad"){if(C3.ch&&!S.roadDone)return;vo(camX+18,56,-1);return;}
  const n=c3Need();if(n[1]==null||Math.abs(n[1]-player.x)<22)return;const d=n[1]>player.x?1:-1;vo(player.x+d*16,player.y-44,d);}
