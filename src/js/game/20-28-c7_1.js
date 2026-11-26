/* ======================= CHAPTER 3, PART 2: THE ISLAND, THE RADIO TOWER, THE OVERHEATED GENERATOR =======================
   Rooms: isle (outdoors, fog, find the tower), tctl (the tower's control room), tgen (its generator room).
   They ride on the chapter 3 hooks: every c5X function hands over to c7X when the room is one of these. */
var C7_IW=900,C7_CW=288,C7_GW=400,C7_MAP=130,C7_SIGN=470,C7_LOOK=290,C7_TD=832;
var C7={t:0,fl:0,pow:0,wave:0,steam:[]};
var C7G=null;
function c7Fresh(){return{land:0,look:0,map:0,door:0,ctl:0,said:0,tried:0,from:"",mat:{gravel:0,sand:0,coal:0,cloth:0},gs:0,chk:[0,0,0],filt:[],clean:0,flush:0,fill:0,gen:0,done:0};}
function c7S(){const S=c5S();if(!S.isl)S.isl=c7Fresh();return S.isl;}
function c7Is(id){const d=C2[id===undefined?room:id];return!!(d&&d.c7);}
function c7Rooms(){if(C2.isle)return;
  const mk=(id,name,W,seeds)=>{C2[id]={name,L:null,R:null,W,cars:[],seeds,c3:1,c4:1,c5:1,c7:1};rooms[id]={name,L:null,R:null,W,crates:[],items:[],ints:[],plats:[]};C2_F[id]={trees:[],vines:[],branches:[],gantries:[],smoke:[]};};
  mk("isle","RIDGE TOWER ISLAND",C7_IW,[101,102,103,104]);mk("tctl","THE TOWER CONTROL ROOM",C7_CW,[105,106]);mk("tgen","THE TOWER GENERATOR ROOM",C7_GW,[107,108,109]);
  Object.assign(De,{isle:{c:"170,190,205",l:"255,232,190",a:0.1,dk:0.4},tctl:{c:"80,100,120",l:"180,215,230",a:0.1,dk:0.5},tgen:{c:"120,86,60",l:"255,176,90",a:0.12,dk:0.5}});
  [[220,0],[350,1],[520,2],[610,3],[680,4],[740,5],[790,6]].forEach(([x,i])=>C2_F.isle.trees.push({x,side:1,dead:i===3,top:58+((i*5)%16),s:900+i*13,br:[]}));
  const A=(id,list)=>list.forEach((q)=>rooms[id].ints.push({id:q[0],x:q[1],r:0,label:q[2]}));
  A("isle",[["c5_map",C7_MAP,"READ THE MAP"],["c5_sign",C7_SIGN,"READ THE SIGN"],["c5_look",C7_LOOK,"CLIMB THE LOOKOUT"],["c5_tdoor",C7_TD,"ENTER THE TOWER"]]);
  A("tctl",[["c5_tdown",40,"GO DOWN"],["c5_tpan",118,"CHECK THE PANEL"],["c5_tcon",200,"TRANSMITTER"],["c5_tout",262,"GO OUTSIDE"]]);
  A("tgen",[["c5_tup",30,"GO UP"],["c5_tcw",70,"TAKE CLOTH"],["c5_tgr",108,"TAKE GRAVEL"],["c5_tsa",148,"TAKE SAND"],["c5_tgn",232,"GENERATOR"],["c5_tcl",360,"TAKE CHARCOAL"]]);}
c7Rooms();
/* ---------------- routing: every c5 hook hands over when the room is one of these ---------------- */
function c7Pre(){if(C7G){player.vx=0;player.walk=0;jumpBuf=0;}}
function c7Walls(){const W=C2[room].W;if(player.x<(room==="isle"?22:10))player.x=room==="isle"?22:10;if(player.x>W-10)player.x=W-10;return!0;}
function c7Go(rm,from,snd){const S=c7S();S.from=from||"";$sx(snd||"door");fadeTo=1;onFaded=()=>{enterRoom(rm,"R");};}
function c7Enter(t){const S=c7S();c7Warm();C3.lie=0;C5GN=null;C5PR=null;C5TR=null;C5CK=null;C7G=null;player.y=C2_FLOOR;player.face=1;
  if(t==="isle"){if(!S.land){S.land=1;player.x=40;camX=0;c3CutStart("c5land");}else{player.x=S.from==="tower"?C7_TD-30:c3Clamp(player.x,40,C7_IW-40);if(S.from==="tower")player.face=-1;}camX=c3Clamp(player.x-96,0,C7_IW-192);}
  else if(t==="tctl"){player.x=S.from==="gen"?54:246;player.face=S.from==="gen"?1:-1;camX=c3Clamp(player.x-96,0,C7_CW-192);if(!S.ctl){S.ctl=1;c3CutStart("c5ctl");}}
  else{player.x=48;camX=c3Clamp(player.x-96,0,C7_GW-192);}
  S.from="";updateGuide();}
/* paint the island, tower and generator room a piece at a time before they're needed, so landing never stalls */
var C7_WARM=0;
function c7Warm(){if(C7_WARM)return;C7_WARM=1;const jobs=[()=>c7HullSpr(),()=>c7TowerSpr()]; 
  ["isle","tctl","tgen"].forEach((id)=>{if(!C2[id])return;C2[id].seeds.forEach((sd,i)=>jobs.push(()=>c5Tile(id,i,sd)));jobs.push(()=>{backdrops[id]||backdrop(id);});});
  let n=0;const step=()=>{if(!GM.on||n>=jobs.length)return;if(modal){setTimeout(step,300);return;}try{jobs[n++]();}catch(e){}setTimeout(step,220);};setTimeout(step,300);}
/* ---------------- per frame ---------------- */
function c7Step(){const S=c7S();C5.t++;C7.t++;C7.fl>0&&C7.fl--;if(dead)return;
  if(room==="tgen"&&S.gs<=1&&!S.gen){if(C7.t%5===0)C7.steam.push({x:200+Math.random()*80,y:C2_FLOOR-52,vx:(Math.random()-0.5)*0.4,vy:-0.5-Math.random()*0.5,a:1});}
  C7.steam=C7.steam.filter((q)=>{q.x+=q.vx;q.y+=q.vy;q.a-=0.018;return q.a>0;});
  if(C3.cut)return;if(c3TaskStep())return;if(C7G)return;
  c5Pick((it)=>{const k=it.id.slice(3),M=S.mat;
    if(room==="isle"){if(k==="map")return{r:16,label:"READ THE MAP"};if(k==="sign")return{r:16,label:"READ THE SIGN"};if(k==="look")return S.look?null:{r:22,label:"CLIMB THE LOOKOUT"};if(k==="tdoor")return{r:22,label:"ENTER THE TOWER"};}
    else if(room==="tctl"){if(k==="tdown")return{r:16,label:"GO DOWN"};if(k==="tpan")return{r:18,label:"CHECK THE PANEL"};if(k==="tcon")return{r:20,label:S.gen?"BROADCAST":"TRANSMITTER"};if(k==="tout")return{r:18,label:"GO OUTSIDE"};}
    else{if(k==="tup")return{r:16,label:"GO UP"};if(k==="tgn")return{r:34,label:S.gen?"GENERATOR (RUNNING)":"CHECK THE GENERATOR"};
      if(k==="tcw")return M.cloth?null:{r:14,label:"TAKE CLOTH"};if(k==="tgr")return M.gravel?null:{r:14,label:"TAKE GRAVEL"};if(k==="tsa")return M.sand?null:{r:14,label:"TAKE SAND"};if(k==="tcl")return M.coal?null:{r:16,label:"TAKE CHARCOAL"};}
    return null;});}
/* ---------------- using things ---------------- */
function c7Use(e){const k=e.id.slice(3),S=c7S();if(C3.cut||C3.task)return!0;
  if(k==="map"){S.map=1;$sx("card");toast("<b>A WEATHERED ISLAND MAP.</b><br>RIDGE TOWER ISLAND. A star marks the <b>LOOKOUT ROCK</b>. The <b>radio mast</b> stands on the HIGH GROUND at the far east end, with its power cable running along the trail. A tall mast on a hill sends radio waves much farther.",7000);updateGuide();}
  else if(k==="sign"){$sx("click");toast("<b>A BROKEN SIGN:</b> \"POWER CABLE TO RADIO STATION &rarr;\"<br>Beneath it, someone scratched: <i>keep to the poles, the trail floods at high tide.</i>",5200);}
  else if(k==="look"){c3CutStart("c5look");}
  else if(k==="tdoor"){S.look=1;S.door=1;c2Save("tctl");c7Go("tctl","isle");}
  else if(k==="tout"){c7Go("isle","tower");}
  else if(k==="tdown"){c7Go("tgen","ctl","click");}
  else if(k==="tup"){c7Go("tctl","gen","click");}
  else if(k==="tpan"){$sx("click");toast(S.gen?"<b>ANTENNA PANEL:</b> 12.0 V on the cable. All three antenna lamps are ready.":"<b>ANTENNA PANEL:</b> 0.0 V on the antenna cable. The three lamps are dark. The cable runs down through the floor hatch to the generator room.",4800);}
  else if(k==="tcon"){if(!S.said)c3CutStart("c5said");else if(!S.gen){$sx("locked");toast("<b>NO POWER.</b> The transmitter is ready, but the antenna cable reads 0 V. Fix the generator in the basement first.",4200);}else{$sx("click");toast("<b>THE TRANSMITTER</b> is powered and ready.",3000);};}
  else if(k==="tgn"){c7GenOpen();}
  else if(k==="tcw")c3Task("gather",70,24,()=>{S.mat.cloth=1;c7Got("<b>CLEAN CLOTH.</b> Old rags. A tight weave catches the finest bits that slip past everything else.");},"#c8c0b0");
  else if(k==="tgr")c3Task("gather",108,24,()=>{S.mat.gravel=1;c7Got("<b>GRAVEL.</b> Coarse stones with big gaps between them. They catch the biggest lumps first.");},"#8a8a84");
  else if(k==="tsa")c3Task("gather",148,24,()=>{S.mat.sand=1;c7Got("<b>SAND.</b> Tiny grains pack close together, leaving only tiny gaps: fine grit gets stuck.");},"#d8c088");
  else if(k==="tcl")c3Task("gather",360,26,()=>{S.mat.coal=1;c7Got("<b>CHARCOAL.</b> Burnt wood is full of microscopic holes. Its huge surface grabs dissolved muck, colour and smells (adsorption).");},"#1a1a1e");
  return!0;}
function c7Got(msg){$sx("pickup");updateGuide();c2Save("tgen");toast(msg,4200);}
/* ---------------- guide and arrow ---------------- */
function c7Guide(){const S=c7S(),g=qs("#ggb");qs("#gg h4 span").textContent="QUEST";let h="";const ck=(v)=>(v?"&#10004; ":"&#9744; ");
  if(room==="isle"){if(!S.look)h="<b>Find the radio tower.</b><br>Fog hides the island. Explore RIGHT and look for <b>high ground</b> to see further."+(S.map?"<br>The map marks a <b>lookout rock</b>.":"");else h="<b>Go to the radio tower.</b><br>Follow the power-cable poles to the base of the tower at the far RIGHT and enter.";}
  else if(room==="tctl"){if(!S.said)h="<b>Broadcast for help.</b><br>Use the main <b>transmitter</b> console.";else if(!S.gen)h="<b>The antennas have no power.</b><br>Take the <b>hatch</b> on the LEFT down to the generator room.";else h="<b>The generator is running!</b><br>Go to the transmitter and <b>broadcast</b>.";}
  else{const M=S.mat;if(S.gen)h="<b>The generator is running.</b><br>Climb back up and broadcast.";
    else h="<b>Fix the overheated generator.</b><br>"+ck(S.gs>=2)+"Check it safely and let it cool<br>"+ck(M.cloth&&M.gravel&&M.sand&&M.coal)+"Gather filter materials ("+(M.gravel?"gravel ":"")+(M.sand?"sand ":"")+(M.coal?"charcoal ":"")+(M.cloth?"cloth":"")+")<br>"+ck(S.clean)+"Filter the dirty water<br>"+ck(S.fill)+"Flush the radiator and refill<br>"+ck(S.gs>=7)+"Restart the generator";}
  g.innerHTML=h;return!0;}
function c7Arrow(){if(modal||won||dead||C3.cut||C3.busy||C7G)return;const S=c7S(),M=S.mat;let t=null;
  if(room==="isle")t=S.look?C7_TD:C7_LOOK;
  else if(room==="tctl")t=!S.said||S.gen?200:40;
  else{if(S.gen)t=30;else if(S.gs<2)t=232;else if(!M.cloth)t=70;else if(!M.gravel)t=108;else if(!M.sand)t=148;else if(!M.coal)t=360;else t=232;}
  if(t==null||Math.abs(t-player.x)<22)return;const d=t>player.x?1:-1;vo(player.x+d*16,player.y-44,d);}
/* ---------------- cutscenes ---------------- */
function c7CutLand(c){const t=c.t,S=c7S();c.cx=null;
  if(t===2){$sx("stinger");tnCap("Ridge Tower Island. We made it.");}
  if(t===170)tnCap("The fog is so thick I can barely see ten steps. The radio tower has to be somewhere on this island.");
  if(t===370)tnCap("High ground would help. Let me look around.");
  if(t>=520){tnCap("");c3CutEnd();c2Save("isle");updateGuide();toast("<b>FIND THE RADIO TOWER</b><br>The island is wrapped in fog. Explore to the RIGHT and look for a way to see further.",5600);}}
function c7CutLook(c){const t=c.t,S=c7S(),x1=C7_IW-192;if(t===1)c.x0=c3Clamp(player.x-96,0,x1);
  c.cx=t<40?c.x0:t<230?c.x0+(x1-c.x0)*c3Ez((t-40)/190):t<420?x1:x1+(c.x0-x1)*c3Ez((t-420)/80);
  if(t===2){$sx("swing");tnCap("Up on the rock… I can see over the trees!");}
  if(t===60)tnCap("");
  if(t===240){$sx("stinger");tnCap("There! A radio tower, way off on the high ground at the east end of the island, with a red light on top.");}
  if(t===400){tnCap("The tallest thing around. Radio masts stand on hills so their signal travels far. I'll follow the power-cable poles.");}
  if(t>=500){tnCap("");S.look=1;c3CutEnd();c2Save("isle");updateGuide();toast("<b>THE RADIO TOWER</b><br>Follow the cable poles RIGHT to the base of the tower and go in.",5200);}}
function c7CutCtl(c){const t=c.t;c.cx=null;
  if(t===2)tnCap("This is it. The Ridge Tower control room.");
  if(t===170)tnCap("Dusty, but the panel lights are on. Somebody has kept this place running.");
  if(t>=330){tnCap("");c3CutEnd();updateGuide();toast("<b>THE TRANSMITTER</b><br>Walk to the main console in the middle of the room and use it.",4800);}}
function c7CutSaid(c){const t=c.t,S=c7S();c.cx=null;
  if(t===2)tnCap("Look how far I came. There's no turning back.");
  if(t===200)tnCap("Okay. Transmitter on… broadcasting.");
  if(t===270){$sx("tune");C7.fl=80;}
  if(t===360){$sx("alarm");$sx("locked");tnCap("Nothing! The antenna lamps stay dark. The panel says: NO POWER.");}
  if(t===540)tnCap("The antenna cable runs down through the floor hatch. The fault must be at the generator, in the basement.");
  if(t>=720){tnCap("");S.said=1;S.tried=1;c3CutEnd();c2Save("tctl");updateGuide();toast("<b>NO POWER TO THE ANTENNAS</b><br>Take the hatch on the LEFT and check the generator below.",5400);}}
function c7CutGPow(c){const t=c.t,S=c7S();c.cx=null;
  if(t===2){$sx("success");S.gen=1;C5.fl=14;tnCap("The generator is running smoothly. Power is flowing up the cable to the antennas!");}
  if(t===190)tnCap("Back upstairs. Time to send that signal.");
  if(t>=320){tnCap("");c3CutEnd();c2Save("tgen");updateGuide();toast("<b>GENERATOR FIXED</b><br>Climb the ladder at the far LEFT and use the transmitter.",4800);}}
{const _c=c5Cut;c5Cut=function(c){const k=c.k;
  if(k==="c5land")return c7CutLand(c);if(k==="c5look")return c7CutLook(c);if(k==="c5ctl")return c7CutCtl(c);if(k==="c5said")return c7CutSaid(c);if(k==="c5gpow")return c7CutGPow(c);
  return _c(c);};}
{const _s=c5Skip;c5Skip=function(c){const k=c.k;
  if(k==="c5land"){c.t=Math.max(c.t,519);return;}if(k==="c5look"){c.t=Math.max(c.t,499);return;}if(k==="c5ctl"){c.t=Math.max(c.t,329);return;}if(k==="c5said"){c.t=Math.max(c.t,719);return;}if(k==="c5gpow"){c.t=Math.max(c.t,319);return;}
  return _s(c);};}
/* the ship's arrival now leads onto the island */
function c7Land(){const S=c5S();S.done=1;c2Save("helm");enterRoom("isle","L");}
/* ---------------- the end of this part ---------------- */
function c7End(){c5Css();
  const LEARN=["<b>Levers:</b> leverage = effort arm &divide; load arm. A pivot on a solid support, close to the load, with a long handle, gives the most force.","<b>Radar:</b> it sends out radio waves and listens for the echoes; the delay shows how far away something is, and the direction of the sweep shows where.","<b>Storms and ships:</b> lightning strikes the tallest object around, so ships steer clear of thunderstorms.","<b>Fouled propellers:</b> seaweed and lost fishing nets wrap round a propeller shaft. Always stop the engine before you reach into it.","<b>Generators:</b> a magnet spinning past a coil of wire pushes electrons along it (electromagnetic induction). More turns of wire or a faster spin gives more voltage; a fuse protects the circuit.","<b>High ground:</b> radio waves travel in nearly straight lines, so the higher the antenna, the farther it reaches. That is why masts and lookouts stand on hills.","<b>Engine cooling:</b> coolant carries heat from the engine to a radiator. Dirty or low coolant makes it overheat, and a hot system is under pressure: switch off and let it cool first.","<b>Filtering:</b> water passes coarse to fine: gravel, sand, charcoal, cloth. Charcoal grabs dissolved impurities by adsorption.","<b>Satellites:</b> radio waves travel in straight lines, so on their own they stop at the horizon. Satellites high above the Earth pass signals on around the planet."];
  const el=c5Overlay("#c5End",'<div class="gcard c5sum"><h3>THE RIDGE TOWER</h3><p style="font-size:8px;text-align:center;color:#b8c8e8;margin:2px 0 8px">You reached the radio tower and learned the truth. Here is what you did and what you learned.</p><div class="c5cols"><div><h4>WHAT YOU DID</h4><ul><li>Pried open cargo containers with a crowbar to find a key.</li><li>Steered a ship by radar through a thunderstorm.</li><li>Cleared seaweed and nets from the propeller.</li><li>Repaired the generator when the power failed.</li><li>Landed on Ridge Tower Island and climbed a lookout to find the radio tower in the fog.</li><li>Fixed the overheated generator, then found every satellite destroyed just 30 minutes earlier.</li><li>Found a trapdoor under a rug, and a hidden lab with an archive of what happened: Sample 07 and the Evolved.</li><li>Remembered an old time-machine movie, and decided to build a real time machine to go back and save the past.</li></ul></div><div><h4>WHAT YOU LEARNED</h4><ul>'+LEARN.map((x)=>"<li>"+x+"</li>").join("")+'</ul></div></div><p style="color:#ffe070;font-size:8px;text-align:center;margin:8px 0">NEXT: BUILD A TIME MACHINE. THIS IS THE END OF THIS PART OF CHAPTER 3 FOR NOW. MORE IN A FUTURE UPDATE.</p><div class="btns"><button class="gbtn alt" id="c5eMenu">MENU</button></div></div>');
  modal=4;el.hidden=!1;fadeNow=1;fadeTo=1;$sx("success");qs("#c5eMenu").onclick=()=>{el.hidden=!0;modal=0;ee();};setTimeout(()=>qs("#c5eMenu").focus(),40);}
/* ---------------- wrappers for the c5 hooks ---------------- */
{const _a=c5Pre;c5Pre=function(){if(c7Is())return c7Pre();return _a();};}
{const _a=c5Walls;c5Walls=function(){if(c7Is())return c7Walls();return _a();};}
{const _a=c5Enter;c5Enter=function(t){if(c7Is(t))return c7Enter(t);return _a(t);};}
{const _a=c5Step;c5Step=function(){if(c7Is())return c7Step();return _a();};}
{const _a=c5Use;c5Use=function(e){if(c7Is())return c7Use(e);return _a(e);};}
{const _a=c5Guide;c5Guide=function(){if(c7Is())return c7Guide();return _a();};}
{const _a=c5Arrow;c5Arrow=function(){if(c7Is())return c7Arrow();return _a();};}
{const _a=c5Esc;c5Esc=function(){const e=qs("#c7Gen");if(e&&!e.hidden){c7GenClose();return!0;}return _a();};}
{const _a=c5CloseAll;c5CloseAll=function(){const e=qs("#c7Gen");if(e&&!e.hidden){e.hidden=!0;e.__stop&&e.__stop();}C7G=null;return _a();};}
{const _a=window.__evoRoom;window.__evoRoom=()=>{if(c7Is()&&C3&&!C3.dreamOn)return room==="isle"?"isle_wind":room==="tctl"?"tower_hum":"gen_room";return _a();};}
/* the rewritten arrival ending hands over to the island */
GM.c3.isl=()=>c7S();GM.c3.C7=()=>C7;GM.c3.genState=()=>C7G&&{st:C7G.st,temp:C7G.temp,sel:C7G.sel,filt:C7G.filt.slice(),pour:C7G.pour};GM.c3.genAct2=(a)=>c7GenAct(a);GM.c3.end7=()=>c7End();
