
/* ---------------- per-frame (called from c3Update) ---------------- */
function c4Step(){if(c5Is())return c5Step();c4Tick();if(dead||C3.cut)return;if(c3TaskStep())return;
  if(room==="river")c4RiverStep();else if(room==="cbridge")c4BridgeStep();else if(room==="port")c4PortStep();}
/* only one interaction is "live" at a time: the nearest one that's available */
function c4Pick(fn){let best=null,bd=1e9;for(const it of rooms[room].ints){const q=fn(it);it.r=0;if(!q)continue;q.x!=null&&(it.x=q.x);it.label=q.label;it.ly=q.ly;const d=Math.abs(player.x-it.x);if(d<q.r&&d<bd){bd=d;best=[it,q.r];}}
  best&&(best[0].r=best[1]);}
function c4ForestStep(){const S=c3S(),S4=c4S();if(!S.done)return;c4Tick();rooms.forest.L=S4.note?"river":null;
  for(const it of rooms.forest.ints)if(it.id==="c4_note"){it.r=C3.cut?0:18;it.label=S4.note?"NOTE":"READ NOTE";it.ly=42;}
  if(!S4.seen&&!C3.cut&&!modal&&player.x<C4_NOTE+44&&player.x>C4_NOTE-60&&c3OnFloor())c3CutStart("c4note");
  if(!S4.note&&player.x<24)c3Tip("noteL","<b>WAIT.</b><br>There's something pinned to that tree. Read it first.",2400);}

/* ---------------- THE RIVER CROSSING ---------------- */
function c4Axe(){return inv.includes("axe2")||inv.includes("axe");}
function c4RiverStep(){const S4=c4S(),M=S4.mat,C=S4.car,phase=S4.arr&&!S4.bridge,water=S4.t8on&&!S4.end;
  if(C4.mini){c4MiniStep();if(keys.r){C4.mini=null;toast("You pull the stake back out.",1400);}}
  if(C4.strike){c4StrikeStep();if(C4.strike&&!C4.strike.c&&(keys.l||keys.r))C4.strike=null;}
  const need=(k)=>(k==="bark"||k==="grass")?(S4.fire<2?1:0)+(!S4.filt?1:0):0;
  c4Pick((it)=>{const id=it.id,k=id.slice(3).split(":")[0],i=+(id.split(":")[1]||0);
    if(k==="build"){if(!phase)return null;const d=c4Done(),s=S4.seg[d];if(!s)return null;
      const lab=C4.mini?"STRIKE!":!s.st?(C.stake?"PLANT STAKE":"NEED STAKE"):(!s.rope&&C.rope)?"TIE ROPE":C.log?(!s.rope&&!s.logs?"LOG (NO ROPE!)":"LAY LOG "+(s.logs+1)+"/3"):(!s.rope?"NEED ROPE/LOGS":"NEED LOGS");
      return{x:c4Tip()+7,r:13,label:lab};}
    if(k==="tree"){if(!phase)return null;const p=S4.piles[i];if(!S4.trees[i])return{r:13,label:"CHOP"};return p.log||p.stake?{r:13,label:"TAKE WOOD"}:null;}
    if(k==="vine")return phase&&S4.vines[i]>0?{r:11,label:"PULL VINE"}:null;
    if(!water)return null;
    if(k==="fill")return inv.includes("pot")&&S4.w===0&&!S4.onFire?{r:10,label:"FILL POT"}:null;
    if(k==="gravel")return!M.gravel&&!S4.filt?{r:8,label:"GRAVEL"}:null;
    if(k==="sand")return!M.sand&&!S4.filt?{r:9,label:"SAND"}:null;
    if(k==="flint")return!M.flint&&S4.fire<3?{r:9,label:"FLINT"}:null;
    if(k==="sticks")return S4.fire<1&&M.stick<3?{r:11,label:"DRY STICKS"}:null;
    if(k==="birch")return M.bark<need("bark")?{r:12,label:"PEEL BARK"}:null;
    if(k==="grass")return M.grass<need("grass")?{r:13,label:"DRY GRASS"}:null;
    if(k==="camp"){const a=c4CampAct();return{x:C4_CAMP-13,r:15,label:a[0]};}
    return null;});}
function c4Use(e){if(!e||!e.id||e.id.slice(0,3)!=="c4_")return!1;const S4=c4S(),M=S4.mat,id=e.id.slice(3),k=id.split(":")[0],i=+(id.split(":")[1]||0);
  if(C3.cut||C3.task)return!0;
  if(k==="note")c4NoteOpen(!!S4.note);
  else if(k==="build")c4Build();
  else if(k==="tree")c4Chop(i);
  else if(k==="vine")c4Vine(i);
  else if(k==="box")c4Box(i);
  else if(k==="camp")C4.strike?c4StrikeHit():c4CampAct()[1]();
  else if(k.charAt(0)==="p")c4PortUse(k,i);
  else if(k==="fill")c3Task("gather",C4_SPOT.fill,44,()=>{S4.w=1;$sx("pour");updateGuide();toast("<b>POT FILLED WITH RIVER WATER.</b><br>Fast water <i>looks</i> cleaner than the forest pools, but it can still carry germs from animals upstream, plus mud and silt. Never drink it straight. <b>Boil it first.</b>",4600);},"#6a9aba");
  else if(k==="gravel")c3Task("gather",C4_SPOT.gravel,30,()=>{M.gravel=1;$sx("debris");updateGuide();toast("<b>GRAVEL.</b><br>Small stones from the shallows. In a filter, gravel goes on <b>top</b> to catch leaves, grit and big bits.",3400);},"#8a8a80");
  else if(k==="sand")c3Task("gather",C4_SPOT.sand,30,()=>{M.sand=1;$sx("scratch");updateGuide();toast("<b>FINE SAND.</b><br>The tiny gaps between sand grains trap mud and silt that's far too small to see one by one.",3400);},"#d8c08a");
  else if(k==="flint")c3Task("gather",C4_SPOT.flint,24,()=>{M.flint=1;$sx("pickup");updateGuide();toast("<b>A LUMP OF FLINT.</b><br>Hard, glassy stone. Strike it with steel and it shaves off tiny specks of hot metal: <b>sparks</b>.",3400);},"#5a5a66");
  else if(k==="sticks")c3Task("gather",C4_SPOT.sticks,40,()=>{M.stick=3;$sx("snap");updateGuide();toast("<b>DRY STICKS.</b><br>Dead, dry wood that snaps cleanly. Freshly cut wood is full of sap and water, so it smokes and won't burn well. <b>Dry fuel burns hot.</b>",3800);},"#8a6a44");
  else if(k==="birch")c3Task("gather",C4_SPOT.birch,32,()=>{M.bark++;$sx("scratch");updateGuide();toast("<b>BIRCH BARK.</b><br>Papery and full of natural oils, so it lights even when damp. It also rolls into a cone: a perfect filter funnel.",3600);},"#f0ece0");
  else if(k==="grass")c3Task("gather",C4_SPOT.grass,30,()=>{M.grass++;$sx("scratch");updateGuide();toast("<b>DRY GRASS.</b><br>Thin, dry and fluffy, so air reaches every strand: perfect <b>tinder</b>. A tight wad of it also makes a filter plug.",3600);},"#c8b46a");
  return!0;}
function c4Need(h){$sx("locked");toast(h,3000);}
function c4Chop(i){const S4=c4S();
  if(S4.trees[i])return c4TakePile(i);
  if(!c4Axe())return c4Need("<b>NO AXE.</b><br>You need something to chop with.");
  c3Task("chop",C4_TREES[i],58,()=>{S4.trees[i]=1;S4.piles[i]={log:3,stake:1};$sx("crash");shake=Math.max(shake,7);
    sparks(C4_TREES[i],C2_FLOOR-20,18,["#3a7a34","#5a9a3a","#8a5a32"],2,0.12,24);c3Tip("chop1","<b>TIMBER!</b><br>Each tree gives <b>3 logs</b> and <b>1 sharpened stake</b>.",2600);c4TakePile(i);});}
function c4TakePile(i){const S4=c4S(),C=S4.car,p=S4.piles[i],tl=Math.min(p.log,C4_CAP.log-C.log),ts=Math.min(p.stake,C4_CAP.stake-C.stake);
  if(!tl&&!ts)return c4Need("<b>YOUR ARMS ARE FULL.</b><br>You can carry "+C4_CAP.log+" logs and "+C4_CAP.stake+" stakes at once. Take them to the end of the bridge first.");
  p.log-=tl;C.log+=tl;p.stake-=ts;C.stake+=ts;$sx("pickup");updateGuide();
  const left=p.log+p.stake;toast("<b>+"+tl+" LOG"+(tl===1?"":"S")+(ts?", +"+ts+" STAKE":"")+"</b>"+(left?"<br>(Some left on the ground. Your arms are full.)":""),1800);}
function c4Vine(i){const S4=c4S(),C=S4.car;if(C.rope>=C4_CAP.rope)return c4Need("<b>ENOUGH ROPE FOR NOW.</b><br>You can carry "+C4_CAP.rope+" coils of vine rope.");
  c3Task("gather",C4_VINES[i],42,()=>{S4.vines[i]--;C.rope++;$sx("snap");updateGuide();c3Tip("vine1","<b>VINE ROPE.</b><br>Lash each stake with rope before you lay its logs.",2600);toast("<b>+1 ROPE</b> ("+C.rope+"/"+C4_CAP.rope+")",1400);},"#4a7a2a");}
function c4Build(){const S4=c4S(),d=c4Done(),s=S4.seg[d],C=S4.car;if(!s)return;
  if(C4.mini){c4MiniHit();return;}
  if(!s.st){if(!C.stake)return c4Need("<b>NO STAKE.</b><br>Chop a tree: every tree gives 3 logs and 1 sharpened stake.");
    C4.mini={t:0,ang:0,cd:0,drive:0,miss:0};$sx("whoosh");c3Tip("stake","<b>PLANT THE STAKE.</b><br>The current shoves it about. Press <b>USE</b> the moment it stands <b>straight up</b> (bubble in the green) so it bites deep into the riverbed. Walk RIGHT to cancel.",4600);return;}
  if(!s.rope&&C.rope&&s.logs<3){c3Task("gather",c4Tip()+4,50,()=>{C.rope--;s.rope=1;$sx("snap");updateGuide();
      c3Tip("lash","<b>LASHED TIGHT!</b><br>Rope wrapped tightly round wood makes huge <b>friction</b>, and the rope itself is strong in <b>tension</b>. Together they lock the logs to the stake so the river can't push them apart.",4600);},"#4a7a2a");return;}
  if(!C.log)return c4Need(!s.rope?"<b>NEED ROPE OR LOGS.</b><br>Pull vines for rope (to lash the stake) and chop trees for logs.":"<b>NO LOGS.</b><br>Chop trees for logs: 3 per segment.");
  if(!s.rope&&!s.logs)toast("<b>NO ROPE…</b><br>The log just rests on the stake. It might hold. It might not.",2600);
  c3Task("gather",c4Tip()+4,24,()=>{C.log--;s.logs++;$sx("crate");shake=Math.max(shake,2);updateGuide();
    if(s.logs>=3){$sx("land");sparks(c4Tip()+20,C2_FLOOR,10,["#8a5a32","#c8a068"],1.2,0.12,18);
      if(c4Done()>=C4_N)return c4Connected();toast("<b>SEGMENT "+c4Done()+" OF "+C4_N+" DONE!</b>"+(s.rope?"":"<br><span style=\"color:#ffb0a0\">(No rope on that one…)</span>"),2000);}},"#8a5a32");}
function c4Connected(){const S4=c4S();C4.mini=null;if(S4.seg.every((s)=>s.rope)){S4.bridge=1;S4.damOn=0;c3CutStart("c4built");}else c3CutStart("c4fall");}
/* stake minigame: the current pushes the stake about; strike when it's upright */
function c4MiniStep(){const m=C4.mini;m.t++;m.cd>0&&m.cd--;
  if(m.drive){m.drive++;if(m.drive===8||m.drive===22||m.drive===36){$sx("clank");shake=Math.max(shake,3);player.punch=14;sparks(c4Tip()-2,C2_FLOOR-4,6,["#d8e8f0","#8aa8c8"],1.2,0.12,14);}
    if(m.drive>=46){const S4=c4S(),s=S4.seg[c4Done()];S4.car.stake--;s.st=1;C4.mini=null;player.punch=0;updateGuide();$sx("success");
      toast("<b>STAKE PLANTED!</b><br>Straight and deep. "+(S4.car.rope?"Now <b>tie it with rope</b>.":"Now tie it with rope (pull a vine), then lay 3 logs."),2600);}return;}
  const sp=0.05+0.012*c4Done();m.ang=Math.sin(m.t*sp)*0.55+Math.sin(m.t*sp*2.3+1)*0.2;}
function c4MiniHit(){const m=C4.mini;if(!m||m.drive||m.cd)return;
  if(Math.abs(m.ang)<0.13){m.drive=1;m.ang=0;$sx("land");}
  else{m.cd=40;m.miss++;$sx("stuck");shake=Math.max(shake,3);toast(m.miss===1?"<b>CROOKED!</b><br>It went in at an angle: the current would rip it straight out. Wait until it's upright (bubble in the green), then press USE.":"<b>Crooked again.</b> Watch the bubble: press USE when it's in the green.",2600);}}

/* ---------------- the campfire: one spot, many steps ---------------- */
function c4FiltReady(){const M=c4S().mat;return M.bark>=1&&M.grass>=1&&M.coal&&M.sand&&M.gravel;}
function c4CampAct(){const S4=c4S(),M=S4.mat,coal=S4.fire===3&&!M.coal&&!S4.filt&&S4.fireT>=C4_COAL,T=(n,fn,col)=>()=>c3Task("gather",C4_CAMP,n,fn,col);
  const takeCoal=["TAKE CHARCOAL",T(30,()=>{M.coal=1;$sx("scratch");updateGuide();toast("<b>CHARCOAL.</b><br>Wood that's been burned without enough air. It's riddled with billions of tiny holes, so one spoonful has a huge surface. Smelly and coloured chemicals <b>stick to that surface</b> (it's called <b>adsorption</b>).",4600);},"#2a2a2a")];
  if(S4.fire===0)return M.stick>=3?["LAY FIREWOOD",T(40,()=>{S4.fire=1;M.stick=0;$sx("crate");updateGuide();toast("<b>FIREWOOD LAID.</b><br>Now tinder: something that catches a spark. Dry grass and birch bark.",2800);},"#8a6a44")]:["FIRE PIT",()=>c4Need("<b>A FIRE PIT.</b><br>First you need <b>dry sticks</b> (the dead branches piled near the birch tree).")];
  if(S4.fire===1)return M.grass&&M.bark?["ADD TINDER",T(30,()=>{S4.fire=2;M.grass--;M.bark--;$sx("scratch");updateGuide();toast("<b>TINDER READY.</b><br>Now a spark: strike flint with the back of your axe.",2600);},"#c8b46a")]:["NEED TINDER",()=>c4Need("<b>NEED TINDER.</b><br>Dry grass (the sunny meadow) AND birch bark (the white tree).")];
  if(S4.fire===2)return M.flint?["STRIKE SPARK",c4StrikeStart]:["NEED A SPARK",()=>c4Need("<b>HOW TO MAKE A SPARK?</b><br>Find a lump of <b>flint</b> on the riverbank. Strike it with the steel back of your axe.")];
  if(S4.onFire){if(S4.boil>=C4_BOIL)return["TAKE POT OFF",T(30,()=>{S4.onFire=0;S4.boil=0;S4.w++;$sx("clank");updateGuide();
        toast(S4.w===2?"<b>BOILED ONCE.</b><br>Germs are mostly dead, but it's still cloudy with silt and smells of mud. Next: <b>filter it</b>.":"<b>BOILED TWICE.</b><br>Clear, and safe from germs. Pour it into your clean bottle!",3600);},"#8a8a8a")];
    if(coal)return takeCoal;
    return["BOILING "+Math.ceil((C4_BOIL-S4.boil)/60)+"s",()=>toast("<b>BOILING…</b><br>Bubbles mean the water is at 100&deg;C (at sea level). Holding a <b>rolling boil</b> kills bacteria, viruses and parasites. Use the time: gather what you'll need next.",3600)];}
  if(S4.w===1||S4.w===3)return["HANG POT",T(30,()=>{S4.onFire=1;S4.boil=0;$sx("clank");updateGuide();toast("<b>POT ON THE FIRE.</b><br>Keep it at a rolling boil for 30 seconds.",2600);},"#8a8a8a")];
  if(S4.w===2){if(S4.filt)return["FILTER WATER",c4FlowOpen];if(c4FiltReady())return["BUILD FILTER",c4FiltOpen];if(coal)return takeCoal;
    return["FILTER?",()=>{const L=[[M.bark>=1,"birch bark (for the cone)"],[M.grass>=1,"dry grass"],[M.coal,"charcoal (from the fire, once it's burned a while)"],[M.sand,"fine sand"],[M.gravel,"gravel"]];c4Need("<b>A FILTER NEEDS:</b><br>"+L.map((q)=>(q[0]?"&#10004; ":"&#9744; ")+q[1]).join("<br>"));}];}
  if(S4.w===4)return["FILL BOTTLE",T(46,()=>{$sx("pour");c3CutStart("c4drink");},"#8ad8ff")];
  if(coal)return takeCoal;
  return["CAMPFIRE",()=>toast(!inv.includes("pot")?"You need a pot.":"<b>FILL THE POT FIRST.</b><br>At the water's edge, by the bridge.",2400)];}
function c4StrikeStart(){C4.strike={t:0,n:0,cd:0,c:0};$sx("click");c3Tip("strike","<b>STRIKE!</b><br>Press <b>USE</b> again and again to scrape the axe down the flint. Each spark is a speck of white-hot iron.",3600);}
function c4StrikeHit(){const s=C4.strike;if(!s||s.cd||s.c)return;s.n++;s.cd=14;player.punch=14;$sx("clank");
  sparks(C4_CAMP-4,C2_FLOOR-6,10,["#fff8c8","#ffd060","#ff9a30"],1.6,0.14,16);
  if(Math.random()<0.16+0.17*s.n){s.c=1;s.t=0;$sx("sizzle");}}
function c4StrikeStep(){const s=C4.strike;s.t++;s.cd>0&&s.cd--;player.punch>0&&player.punch--;
  if(s.c){s.t===20&&tnCap("Come on… blow gently…");s.t%10===0&&$sx("breath");
    if(s.t>=90){const S4=c4S();S4.fire=3;S4.fireT=0;C4.strike=null;tnCap("");$sx("success");updateGuide();
      toast("<b>FIRE!</b><br>Fire needs three things: <b>fuel</b> (the sticks), <b>heat</b> (the spark) and <b>oxygen</b> (your breath). That's the <b>fire triangle</b>. Now fill the pot at the river and hang it over the flames.",5200);}}}

/* ---------------- cutscenes ---------------- */
function c4Cut(c){const k=c.k;
  if(k==="c4note")return c4CutNote(c);if(k==="c4arr")return c4CutArr(c);if(k==="c4built")return c4CutBuilt(c);if(k==="c4fall")return c4CutFall(c);
  if(k==="c4parr"||k==="c4board"||k==="c4left")return c4CutPort(c);if(k==="c4dam")return c4CutDam(c);if(k==="c4bcol")return c4CutBcol(c);if(k==="c4eight")return c4CutEight(c);if(k==="c4drink")return c4CutDrink(c);if(k==="c4end")return c4CutEnd(c);c3CutEnd();}
function c4Skip(c){const k=c.k;if(k==="c4parr"||k==="c4board")return c4SkipPort(c);
  if(k==="c4note"){if(c.t<300)c.t=Math.max(c.t,299);else c.t=Math.max(c.t,c.t2||c.t);return;}
  if(k==="c4arr"){c.t=Math.max(c.t,559);return;}if(k==="c4built"){c.t=Math.max(c.t,219);return;}
  if(k==="c4bcol"){if(c.t<101){c.t=100;}else c.t=Math.max(c.t,639);return;}if(k==="c4eight"){c.t=Math.max(c.t,379);return;}
  if(k==="c4end"){if(c.t<330){player.x=C4_R0-22;c.t=329;}else c.t=Math.max(c.t,899);return;}}
function c4CutNote(c){const t=c.t,S4=c4S();
  if(t===2){tnCap("Huh? Something's pinned to that tree…");}
  if(t<110){if(c3Walk(C4_NOTE+12,0.9)&&t>20){c.t=110;}}
  if(t===112){player.walk=0;player.face=-1;tnCap("");}
  if(t===130){c.wait=1;c4NoteOpen(!1,()=>{c.wait=0;c.t=300;});}
  if(t===302)tnCap("“Last tech-controlled ships heading to Ridge Tower”… So there ARE other people. Or there were.");
  if(t===470)tnCap("Wait… if the last ships flew over this valley, and some of them crashed…");
  if(t===640)tnCap("…their cargo containers must be scattered out there somewhere! Supplies. Maybe even something to boil water in.");
  if(t===820){tnCap("");S4.seen=1;S4.note=1;S4.cp&&(S4.cp.st.seen=1,S4.cp.st.note=1,c2Save("forest"));rooms.forest.L="river";c3CutEnd();updateGuide();$sx("stinger");
    toast("<b>NEW GOAL</b><br>Keep heading WEST (left). Look for crashed cargo containers… and water you can make safe.",4600);}
  c.t2=819;}
function c4CutArr(c){const t=c.t;
  if(t<100)c3Walk(640,0.8);
  if(t===2)tnCap("Water… a real river!");
  if(t===110){player.walk=0;player.face=-1;tnCap("It's so wide… and fast. I'd never swim across that.");}
  c.cx=t<150?null:t<470?c3Clamp(player.x-96-c3Ez((t-150)/110)*(player.x-330),0,C4_RW-192):null;
  if(t===240){$sx("crash");shake=4;tnCap("Is that a dam upriver? It's cracked… and something HUGE has been gnawing at its base.");}
  t>=240&&t<460&&t%50===0&&$sx("scratch");
  if(t===380){$sx("rumble");shake=6;tnCap("Mutated animals, I bet. If that dam breaks, this whole valley floods. I need a bridge, and I need it FAST.");}
  if(t===500)tnCap("Trees for logs and stakes… vines for rope. Let's go!");
  if(t>=560){const S4=c4S();S4.arr=1;S4.damOn=1;S4.dam=C4_T3;S4.cp&&!S4.cp.st.arrSeen&&(S4.cp.st.arrSeen=1);S4.arrSeen=1;c3CutEnd();$sx("stinger");updateGuide();
    toast("<b>BUILD A BRIDGE: 3 MINUTES!</b><br>1. Chop trees (logs + stakes), pull vines (rope).<br>2. At the end of the bridge: plant a stake, <b>tie it with rope</b>, lay 3 logs.<br>3. Repeat "+C4_N+" times to reach the other side.",6400);}}
function c4CutBuilt(c){const t=c.t;
  if(t===2){$sx("success");shake=3;tnCap("It's connected… and it's holding! Rock solid!");}
  if(t===110)tnCap("The rope lashings lock every piece together. Now, across!");
  if(t>=220){c3CutEnd();c4CP("river","Bridge built");updateGuide();toast("<b>BRIDGE BUILT!</b><br>The dam is holding… for now. Cross, and follow the road WEST.",4000);}}
function c4CutFall(c){const t=c.t;
  if(t===2){tnCap("Connected! Now let's just…");}
  if(t===50){$sx("creak");shake=4;tnCap("…wait. Why is it wobbling?");}
  if(t===60){C4.sw={t:0};}
  if(C4.sw)C4.sw.t++;
  t>60&&t<200&&t%24===0&&$sx("creak");
  if(t===140){$sx("crash");$sx("debris");shake=16;tnCap("NO! It's coming apart!!");}
  if(t>=150&&t<230){player.y=Math.min(C2_FLOOR+22,player.y+0.6);player.x+=0.4;}
  if(t===180){$sx("whoosh");C4.flood=0.4;}
  if(t>=240){tnCap("");C4.sw=null;c3CutEnd();c4Die("swept");}}
function c4CutDam(c){const t=c.t,S4=c4S();
  if(t===2){$sx("rumble");shake=14;tnCap("That sound… the DAM!");C4.dbreak=0.01;c.x0=camX;}
  c.x0==null&&(c.x0=camX);
  if(room==="river")c.cx=t<110?c.x0+(254-c.x0)*c3Ez(t/60):null;
  C4.dbreak>0&&(C4.dbreak=Math.min(1,C4.dbreak+0.012));
  t%18===0&&$sx("rumble");
  if(t>=70)C4.flood=Math.min(1,(t-70)/90);
  if(t===90){$sx("whoosh");shake=22;tnCap("");}
  if(t>=170){C4.flood=1;c3CutEnd();c4Die(S4.bridge?"dam":"dam3");}}
function c4CutDrink(c){const t=c.t,S4=c4S();
  if(t===2){player.face=1;tnCap("Boiled, filtered, boiled again. Clean, safe water…");}
  if(t>=60&&t<200){C4.drink=1;S4.met=Math.max(0,S4.met-0.6);t%30===0&&$sx("pour");}
  if(t===200){C4.drink=0;S4.met=0;S4.drank=1;$sx("success");tnCap("Ahhh… I can think straight again.");
    inv=inv.filter((k)=>k!=="bottle");inv.push("wbottle");got.add("wbottle");updateBag();}
  if(t===330){$sx("rumble");shake=10;tnCap("…that rumble. THE DAM! Back across the bridge, NOW!");}
  if(t>=420){S4.end=1;S4.t8on=0;C3.cut={k:"c4end",t:0,cx:null,wait:0};}}
function c4CutEnd(c){const t=c.t,S4=c4S();
  if(t<330){const done=c3Walk(C4_R0-22,1.45);t%40===0&&$sx("rumble");if(done&&t<329)c.t=329;}
  c.cx=t<330?c3Clamp(player.x-110,0,C4_RW-192):C4_R0-50+c3Ez((t-330)/60)*0;
  if(t===120){C4.dbreak=0.01;$sx("crash");shake=12;}
  C4.dbreak>0&&(C4.dbreak=Math.min(1,C4.dbreak+0.006));
  if(t===340){player.walk=0;player.face=1;tnCap("");}
  if(t>=340&&t<520){C4.flood=Math.min(1,(t-340)/80);t===350&&($sx("whoosh"),(shake=24));t===380&&(S4.gone=1,$sx("crash"),$sx("debris"));t%20===0&&$sx("rumble");}
  if(t===420)tnCap("The bridge…!");
  if(t>=520)C4.flood=Math.max(0.55,1-(t-520)/200);
  if(t===540)tnCap("…Just in time. It's gone, but I'm across, and I have clean water.");
  if(t===720)tnCap("Every shipping label in those containers said RIDGE TOWER DEPOT. Maybe a ship still sails from the old bridge port, further WEST.");
  if(t===900){tnCap("");C4.flood=0;c3CutEnd();S4.end=1;c4CP("river","Safe water at last");updateGuide();$sx("stinger");toast("<b>NEW GOAL</b><br>Follow the old road WEST (left) to the bridge port. The labels all said RIDGE TOWER DEPOT.",5200);}}
