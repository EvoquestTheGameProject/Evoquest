/* ======================= CHAPTER 3, PART 5: THE WAY BACK =======================
   After the hypothesis lesson: climb back up out of the lab, leave the tower, walk back to the ship at the pier and
   sail home. A cinematic shows the city from the water, burning, then a quarantine wall bursting open. The player
   lands in the city harbor (a new room) and walks into a city where far more of the Evolved have broken out. */
var C10={t:0,ash:[],deb:[],dust:[],run:[],bar:null,flash:0,dark:0.6,warm:0},C10V={P:[],burst:0,last:0,bang:0},C10_W=640,C10_BOAT=70;
function c10Rooms(){if(C2.crt)return;
  C2.crt={name:"THE CITY HARBOR",L:null,R:null,W:C10_W,cars:[],seeds:[131,132,133,134],c3:1,c4:1,c5:1,c7:1};rooms.crt={name:"THE CITY HARBOR",L:null,R:null,W:C10_W,crates:[],items:[],ints:[],plats:[]};C2_F.crt={trees:[],vines:[],branches:[],gantries:[],smoke:[]};
  De.crt={c:"120,90,110",l:"255,150,90",a:0.16,dk:0.55};
  rooms.isle.ints.push({id:"c5_boat",x:C10_BOAT,r:0,label:"BOARD THE SHIP"});}
c10Rooms();
/* ---------------- routing: the way back up, out and to the ship ---------------- */
{const _s=c7Step;c7Step=function(){const S=c7S();if(room==="crt"){C5.t++;C7.t++;c10Tick();if(dead)return;if(C3.cut)return;if(c3TaskStep())return;c5Pick(()=>null);c10Triggers();return;}
  _s();if(room==="isle"&&S.hyp&&!S.back&&!C3.cut&&!C3.task&&!C7G){c5Pick((it)=>{const k=it.id.slice(3);if(k==="boat")return{r:22,label:"BOARD THE SHIP"};if(k==="tdoor")return{r:22,label:"ENTER THE TOWER"};return null;});
    if(!C10.warm&&C7.t%40===0){/* paint the city ahead of time, a tile at a time */const n=C10.warmN||0;if(n<4){c5Tile("crt",n,C2.crt.seeds[n]);C10.warmN=n+1;}else C10.warm=1;}}};}
{const _u=c7Use;c7Use=function(e){const k=e.id.slice(3),S=c7S();if(room==="isle"&&k==="boat"){if(C3.cut||C3.task)return!0;if(!S.hyp)return!0;if(!S.back)c10Board();return!0;}if(room==="crt")return!0;return _u(e);};}
{const _e=c7Enter;c7Enter=function(t){const S=c7S();if(t!=="crt")return _e(t);C3.lie=0;C7G=null;C5GN=null;C5PR=null;C5TR=null;C5CK=null;player.y=C2_FLOOR;player.x=S.ce2?(S.cend?C10_SIGNX+44:C10_BAR-40):S.ce1?470:C10_W-56;player.face=-1;camX=c3Clamp(player.x-96,0,C10_W-192);S.from="";
  if(!S.city){S.city=1;c2Save("crt");c3CutStart("c5arrive");}updateGuide();};}
{const _b=c7Back;c7Back=function(){if(room==="crt")return c10Back();return _b();};}
{const _f=c7Front;c7Front=function(){if(room==="crt")return c10Front();return _f();};}
{const _t=c7Tint;c7Tint=function(){if(room==="crt")return c10Tint();return _t();};}
{const _a=window.__evoRoom;window.__evoRoom=()=>{if(room==="crt"&&C3&&!C3.dreamOn)return"city_ruin";return _a();};}
{const _g=c7Guide;c7Guide=function(){const S=c7S(),g=qs("#ggb"),Q=(h)=>{qs("#gg h4 span").textContent="QUEST";g.innerHTML=h;return!0;};
  if(S.hyp&&!S.back){if(room==="tlab")return Q("<b>Head back to the ship.</b><br>Climb back <b>UP</b> the ladder.");if(room==="tctl")return Q("<b>Head back to the ship.</b><br>Go back <b>OUTSIDE</b>.");if(room==="isle")return Q("<b>Head back to the ship.</b><br>It's tied up at the pier, far to the <b>LEFT</b>. Board it and sail home.");}
  if(room==="crt")return Q(S.cend?"<b>Find the time machine parts.</b>":"<b>Head into the city.</b><br>Walk <b>LEFT</b>. Keep away from the Evolved.");
  return _g();};}
{const _a=c7Arrow;c7Arrow=function(){const S=c7S();const go=(t)=>{if(modal||won||dead||C3.cut||C3.busy||C9.doc)return;if(Math.abs(t-player.x)<22)return;const d=t>player.x?1:-1;vo(player.x+d*16,player.y-44,d);};
  if(S.hyp&&!S.back){if(room==="tlab")return go(30);if(room==="tctl")return go(262);if(room==="isle")return go(C10_BOAT);}
  if(room==="crt"){if(!S.cend)go(100);return;}return _a();};}
/* after the lesson: no end card yet; the quest sends you back to the ship */
c9CutHypEnd=function(c){const t=c.t,S=c7S();c.cx=null;
  if(t===2)tnCap("Okay. Then here's MY hypothesis:");
  if(t===170){$sx("success");tnCap("IF I find the parts the Evolved are guarding, THEN I can build a real time machine… and go back to save the past.");}
  if(t===460)tnCap("Time to test it. The parts are back in the city, so that's where I'm going.");
  if(t>=640){tnCap("");c3CutEnd();c2Save("tlab");updateGuide();toast("<b>BACK TO THE SHIP</b><br>Climb up the ladder, leave the tower and walk back to the pier.",5200);}};
c9CutAfter=function(c){const t=c.t,S=c7S();c.cx=null;
  if(t===2)tnCap("So that's what happened while I slept. Sample 07… the Evolved… all of it.");
  if(t===230)tnCap("And the satellites went dark only thirty minutes ago. That was no accident.");
  if(t===450){$sx("stinger");tnCap("…Hold on. That old movie…");}
  if(t===600){tnCap("");c.wait=1;c9Mem(()=>{C3.cut=null;tnBars(0);qs("#cskip").hidden=!0;const first=!S.tm;S.tm=1;c2Save("tlab");fadeNow=1;updateGuide();if(first&&!S.hyp){C9.lampT=1;c3CutStart("c5lamp");}});}};
/* ---------------- boarding, and the voyage home (opening-cutscene engine + the memory's effects) ---------------- */
function c10Board(){const S=c7S();$sx("door");S.back=1;c2Save("isle");c10Sail(()=>{C10.run=[];C10.deb=[];C10.dust=[];C10.bar=null;backdrops.crt||backdrop("crt");fadeNow=1;enterRoom("crt","R");});}
/* ---------------- in the city: scripted moments ---------------- */
function c10Triggers(){const S=c7S();if(modal||won)return;
  if(!S.ce1&&player.x<500)return c3CutStart("c5pack");
  if(S.ce1&&!S.ce2&&player.x<C10_BAR+70)return c3CutStart("c5burst");
  if(S.ce2&&!S.cend&&player.x<C10_SIGNX+34)return c3CutStart("c5cityend");}
{const _w=c7Walls;c7Walls=function(){const S=c7S();if(room==="crt"&&!S.ce2&&player.x<C10_BAR+48){player.x=C10_BAR+48;player.vx=0;}return _w();};}
const C10_LOOKS=[[2,5,9,3,{hs:4,gd:0}],[6,4,11,6,{hs:7,gd:1}],[9,6,3,10,{hs:1,gd:0}],[4,7,13,2,{hs:9,gd:1}],[11,5,6,8,{hs:3,gd:0}]];
function c10Man(i,x,vx,lane,o){const L=C10_LOOKS[i%C10_LOOKS.length];return Object.assign({kind:"man",look:yt(L[0],L[1],L[2],L[3],L[4]),x,vx,f:vx<0?-1:1,lane,ph:i*13,s:0.92},o||{});}
function c10Stop(){player.vx=0;player.walk=0;keys.l=keys.r=0;}
function c10CutArrive(c){const t=c.t;c10Tick();const home=c3Clamp(player.x-96,0,C10_W-192);c.cx=t<80?home:t<380?home-Math.min(150,(t-80)*0.6):home-Math.max(0,150-(t-380)*1.2);
  if(t===2){c10Stop();$sx("siren");tnCap("The city harbor. I'm home…");}
  if(t===220){$sx("growl");tnCap("…No. This isn't the city I left. It's so much worse.");}
  if(t===430)tnCap("Everything is burning, and there's nobody left to put it out.");
  if(t>=640){tnCap("");c3CutEnd();updateGuide();toast("<b>INTO THE CITY</b><br>Walk LEFT. Keep away from the Evolved.",4600);}}
function c10CutPack(c){const t=c.t,S=c7S();c10Tick();c.cx=c3Clamp(player.x-140,0,C10_W-192);
  if(t===1){c10Stop();$sx("growl");tnCap("Shh! Something's coming. Stay still…");}
  if(t===50){C10.run=[c10Man(0,player.x-34,-0.36,7),c10Man(1,player.x-58,-0.42,5,{d:30}),c10Man(2,player.x-20,-0.3,9,{d:70})];$sx("breath");}
  if(t===210){$sx("howl");C10.run.push({kind:0,x:camX+215,vx:-2.3,f:-1,lane:11,k:0.55,ph:5});}
  if(t===320)tnCap("Those were people once. Sample 07 changed them too.");
  if(t===560)tnCap("There are so many more of them than before.");
  if(t===790)tnCap("Fire needs heat, fuel and oxygen. With no one left to fight them, these fires just keep spreading.");
  if(t>=1040){tnCap("");S.ce1=1;c2Save("crt");c3CutEnd();updateGuide();}}
function c10CutBurst(c){const t=c.t,S=c7S(),g=C2_FLOOR;c10Tick();c.cx=c3Clamp(C10_BAR-104,0,C10_W-192);
  if(t===1){c10Stop();C10.bar={jit:0,go:0,k:0};tnCap("The evacuation barricade. The army built it to keep the road to the harbor open while everyone escaped.");}
  if(t===250||t===330||t===395){$sx("doorhit");C10.bar.jit=t===395?6:4;shake=Math.max(shake,t===395?5:3);for(let q=0;q<4;q++)C10.dust.push({x:C10_BAR-10+Math.random()*20,y:g-34+Math.random()*10,vx:(Math.random()-0.5)*0.6,vy:0.2,s:6,a:0.5});}
  if(t===260)tnCap("…What was that?");
  if(t===340)$sx("growl");
  if(t===440){tnCap("");$sx("crash");$sx("roar");$sx("debris");shake=Math.max(shake,10);C10.flash=0.45;C10.bar.go=1;c10Boom(C10_BAR,g,44);
    C10.run.push({kind:2,x:C10_BAR-4,vx:0,f:1,lane:0,k:0.95,ph:0,stop:190,next:{vx:-0.75,f:-1}});}
  if(t===470)$sx("flutter");
  if(t===520)tnCap("It smashed straight through!");
  if(t===600){$sx("roar");shake=Math.max(shake,4);}
  if(t===660){C10.run.push(c10Man(3,C10_BAR-8,-0.4,6,{d:20}),c10Man(4,C10_BAR+2,-0.46,4,{d:70}),c10Man(1,C10_BAR-2,-0.38,8,{d:130}));tnCap("It didn't see me. It's heading deeper into the city… and they're following it.");}
  if(t===900)tnCap("Nothing is holding them back any more. While I was gone, more and more of them broke out.");
  if(t>=1140){tnCap("");S.ce2=1;c2Save("crt");c3CutEnd();updateGuide();}}
function c10CutEnd(c){const t=c.t,S=c7S();c10Tick();const h=c3Clamp(player.x-96,0,C10_W-192);c.cx=t<220?h:Math.max(0,h-(t-220)*0.15);
  if(t===2){c10Stop();tnCap("The evacuation route. Everyone got out this way… everyone except the people still asleep in the pods.");}
  if(t===260)tnCap("The power plant. The shipyard. The observatory. They're all out there, somewhere in this.");
  if(t===500)tnCap("If Dr. Morrow's hypothesis is right, the most Evolved will be wherever the parts are.");
  if(t===740){$sx("stinger");tnCap("Then that's exactly where I'm going.");}
  if(t>=940){tnCap("");S.cend=1;S.done=1;c2Save("crt");c3CutEnd();updateGuide();fadeNow=1;c7End();}}
{const _c=c5Cut;c5Cut=function(c){if(c.k==="c5arrive")return c10CutArrive(c);if(c.k==="c5pack")return c10CutPack(c);if(c.k==="c5burst")return c10CutBurst(c);if(c.k==="c5cityend")return c10CutEnd(c);if(c.k==="c5hypend")return c9CutHypEnd(c);if(c.k==="c5after")return c9CutAfter(c);return _c(c);};}
{const _s=c5Skip;c5Skip=function(c){if(c.k==="c5arrive"){c.t=Math.max(c.t,639);return;}if(c.k==="c5pack"){c.t=Math.max(c.t,1039);return;}if(c.k==="c5burst"){if(c.t<440)c.t=439;else c.t=Math.max(c.t,1139);return;}if(c.k==="c5cityend"){c.t=Math.max(c.t,939);return;}if(c.k==="c5hypend"){c.t=Math.max(c.t,639);return;}return _s(c);};}
/* ---------------- the end card: the voyage home ---------------- */
{const _e=c7End;c7End=function(){_e();const el=qs("#c5End"),S=c7S();if(!el||!S.cend)return;const h=el.querySelector("h3");h&&(h.textContent="BACK TO THE CITY");
  const uls=el.querySelectorAll(".c5cols ul");if(uls.length>=2&&!el.querySelector(".c10li")){const li=(u,x)=>{const n=document.createElement("li");n.className="c10li";n.innerHTML=x;u.appendChild(n);};
    li(uls[0],"Climbed back out of the lab, sailed home on the ship and found the city overrun: far more of the Evolved had broken out while you were away.");
    li(uls[1],"<b>The fire triangle:</b> a fire needs heat, fuel and oxygen. Take away any one of them and it goes out. With no one left to fight them, the city's fires keep spreading.");}};}
/* ---------------- developer tools ---------------- */
C3_DEVBTN.push(["CHAPTER 3: THE WAY BACK",[["c3_uback","HIDDEN LAB: LESSON DONE, HEAD BACK"],["c3_uboat","ISLAND: AT THE SHIP"],["c3_usail","PLAY THE VOYAGE HOME"],["c3_ucity","CITY HARBOR (ARRIVE)"],["c3_upack","CITY: THE PACK"],["c3_uburst","CITY: THE WAREHOUSE BURSTS"],["c3_uend","CITY: THE OVERLOOK AND END CARD"]]]);
{const _d=c3Dev;c3Dev=function(a){if(a.slice(0,4)!=="c3_u")return _d(a);const I=c7S();modal=0;Oo=0;Do.hidden=!0;
  const base={lab:1,doc:1,tm:1,sci:1,think:1,hyp:1,done:0,back:0,city:0,ce1:0,ce2:0,cend:0};
  if(a==="c3_uback"){Object.assign(I,base);c7DevGo("tlab",120);Object.assign(I,base);updateGuide();return;}
  if(a==="c3_uboat"){Object.assign(I,base,{land:1,look:1,door:1});c7DevGo("isle",C10_BOAT+30);Object.assign(I,base,{land:1,look:1,door:1});updateGuide();return;}
  if(a==="c3_usail"){Object.assign(I,base);c10Board();return;}
  const city=(o,x)=>{c3DevPre("tlab");Object.assign(I,base,{back:1,city:1},o);C10.run=[];C10.deb=[];C10.dust=[];C10.bar=o.ce2?{go:1,k:1}:null;c7DevGo("crt",x);};
  if(a==="c3_ucity"){c3DevPre("tlab");Object.assign(I,base,{back:1});C10.run=[];C10.deb=[];C10.dust=[];C10.bar=null;c7DevGo("crt");return;}
  if(a==="c3_upack"){city({},490);return;}
  if(a==="c3_uburst"){city({ce1:1},C10_BAR+86);return;}
  if(a==="c3_uend"){city({ce1:1,ce2:1},C10_SIGNX+60);return;}};}
GM.c3.c10=()=>{const S=c7S();return{hyp:S.hyp,back:S.back,city:S.city,ce1:S.ce1,ce2:S.ce2,cend:S.cend,done:S.done,run:(C10.run||[]).length,bar:C10.bar&&C10.bar.go};};GM.c3.c10show=(n,t)=>{c10Reg();GM.c3.c9show(n,t);};
