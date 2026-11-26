
/* ---------------- THE BROKEN BRIDGE ---------------- */
function c4BridgeStep(){const S4=c4S();
  /* the way back east (to the river) stays closed until you have a pot and bottle to fill */
  const free=S4.t8on||S4.end||(inv.includes("pot")&&inv.includes("bottle"));rooms.cbridge.R=free?"rroad":null;
  if(!free&&player.x>=C4_BW-20&&(keys.r||player.vx>0.2)&&!C3.cut){player.x=C4_BW-20;player.vx=0;if(!(C4.thirstCd>0)){C4.thirstCd=150;$sx("breath");toast("<i>“I'm too thirsty, maybe later.”</i>",2400);}}
  C4.thirstCd>0&&C4.thirstCd--;
  if(!S4.bcol){if(player.on&&player.y<=C4_DECK+0.5&&player.x<575)c3CutStart("c4bcol");return;}
  const B=S4.box;if(!B)return;
  c4Pick((it)=>{const i=+it.id.split(":")[1],p=C4_POS[i];if(Math.abs(player.y-p.y)>3)return null;
    const st=B.st[i],lab=st==="crushed"?"CRUSHED":st==="locked"?(inv.includes("ckey")&&B.key===i?"UNLOCK":"LOCKED"):c4BoxLeft(i)?"SEARCH":"EMPTY";
    return{r:19,label:lab,ly:p.y-46};});}
function c4Shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
var C4_JUNK=[["foam","PACKING FOAM","Light and squishy: mostly trapped air, just like your leaf bedding."],["prop","DRONE PROPELLERS","Spare blades for the tech-controlled ships."],["seeds","SEED PACKETS","Tomato, bean and sunflower. Someone was planning to grow food."],
  ["lights","SOLAR LIGHTS","Smashed. Little solar panels turn sunlight straight into electricity."],["cells","FLAT BATTERIES","A whole box of AA cells, all dead."],["cables","TANGLED CABLES","Phone chargers. No phones."],["books","PICTURE BOOKS","Soggy, but you can still read about a brave little tugboat."],
  ["ball","BEACH BALL","Flat. It reminds you of that dream."],["label","SHIPPING LABELS","Every one says: RIDGE TOWER DEPOT."],["plates","PLATES","Smashed to pieces in the crash."],["bubble","BUBBLE WRAP","You pop one bubble. It feels great."],["tools","EMPTY TOOLBOX","Somebody got here first."],
  ["boats","TOY BOATS","A whole crate of little plastic boats."],["rice","SPOILT RICE","River water soaked in and ruined it."],["bolts","BOLTS + WASHERS","Hundreds of them."],["tablet","CRACKED TABLET","The screen is shattered. It won't turn on."],["socks","WOOL SOCKS","Thick and warm. Shame they're soaked."],["paint","PAINT TINS","Bright yellow. Very bright."]];
var C4_SPEC={rpot:["RUSTY POT","Rust has eaten holes right through the bottom. It would leak straight into the fire. <b>Not this one.</b>"],cbot:["CRACKED BOTTLE","A split runs down the side, so it can't hold water, and germs hide in cracks. <b>Keep looking.</b>"],bowl:["PLASTIC BOWL","Plastic melts over a fire. To boil water you need <b>metal</b>."],
  pot:["CLEAN STEEL POT!","No rust, no holes, with a wire handle. Steel doesn't melt or burn, so it's <b>perfect for boiling water</b> over a fire."],bottle:["CLEAN WATER BOTTLE!","Still sealed in its wrapper: a sturdy screw-top bottle. <b>Perfect for carrying safe water.</b>"]};
function c4Boxes(){const S4=c4S();const pos=c4Shuffle([0,1,2,3,4,5,6]),col=c4Shuffle([0,1,2,3,4,5,6]),chain=pos.slice(0,5),st=[],slots=[];
  pos.slice(5).forEach((p)=>st[p]="crushed");chain.forEach((p,k)=>{st[p]=k?"locked":"open";});
  chain.forEach((p,k)=>{const junk=c4Shuffle(C4_JUNK.map((q)=>q[0])).slice(0,12),L=junk.map((j)=>({k:j,o:0}));
    const spec=k<4?["key"]:["pot","bottle","rpot"];k===1&&spec.push("rpot");k===2&&spec.push("cbot");k===3&&spec.push("bowl");k===4&&spec.push("cbot");
    const at=c4Shuffle([...Array(12).keys()]);spec.forEach((s,i)=>{L[at[i]]={k:s,o:0};});slots[p]=L;});
  for(let p=0;p<7;p++)if(!slots[p])slots[p]=[];
  S4.box={chain,col,st,slots,step:0,key:-1,tear:chain[0]};}
function c4BoxLeft(i){const B=c4S().box;return!!(B&&B.slots[i].some((s)=>!s.o));}
function c4Box(i){const S4=c4S(),B=S4.box;if(!B)return;const st=B.st[i],c=C4_COL[B.col[i]];
  if(st==="crushed")return c4Need("<b>CRUSHED SHUT.</b><br>The doors of this "+c[0]+" container are bent right into the frame. There's no way in.");
  if(st==="locked"){if(inv.includes("ckey")&&B.key===i){c3Task("gather",C4_POS[i].x,40,()=>{$sx("door");B.st[i]="open";B.step=B.chain.indexOf(i);inv=inv.filter((k)=>k!=="ckey");B.key=-1;updateBag();updateGuide();c4SearchOpen(i);},"#c8a040");return;}
    return c4Need("<b>LOCKED.</b><br>A heavy padlock with a <b style=\"color:"+c[1]+"\">"+c[0]+"</b> tag."+(inv.includes("ckey")?" Your key's tag is <b style=\"color:"+C4_COL[B.col[B.key]][1]+"\">"+C4_COL[B.col[B.key]][0]+"</b>: wrong container.":" You'll need the matching key."));}
  if(!c4BoxLeft(i))return toast("Nothing else in this one.",1600);
  c4SearchOpen(i);}
/* search screen: every box, bag and crate inside the container */
var C4SR=null;
function c4SearchOpen(i){const S4=c4S(),B=S4.box,c=C4_COL[B.col[i]];let el=qs("#c4Search");
  if(!el){el=document.createElement("div");el.id="c4Search";el.className="gov";el.hidden=!0;
    el.innerHTML='<div class="gcard c4card"><h3 id="c4sT"></h3><p class="c3sub" id="c4sSub"></p><div id="c4sG"></div><div id="c4sMsg" aria-live="polite"></div><div class="btns"><button class="gbtn" id="c4sOk">CLOSE</button></div></div>';
    qs("#gm").appendChild(el);qs("#c4sOk").onclick=c4SearchClose;
    el.addEventListener("click",(ev)=>{const b=ev.target.closest&&ev.target.closest("[data-c4s]");b&&c4SearchPick(+b.dataset.c4s);});}
  c4Css();modal=4;el.hidden=!1;C4SR={i,busy:0};
  qs("#c4sT").innerHTML='<span style="color:'+c[1]+'">&#9632;</span> '+c[0]+" CONTAINER";
  qs("#c4sSub").textContent=B.chain.indexOf(i)===0&&B.tear===i?"You squeeze in through the torn-open side. Boxes, bags and crates everywhere. Open each one.":"The padlock drops away. Search every box, bag and crate.";
  c4SearchDraw("");setTimeout(()=>{const f=qs("#c4sG button:not([disabled])")||qs("#c4sOk");f&&f.focus();},30);}
function c4SearchDraw(msg){const S4=c4S(),B=S4.box,L=B.slots[C4SR.i];
  qs("#c4sG").innerHTML=L.map((s,j)=>{const sh=["crate","box","sack","case","drum","box"][(j*7+C4SR.i)%6];
    if(!s.o)return'<button class="c4slot" data-c4s="'+j+'" aria-label="Closed '+sh+'"><img src="'+c4SlotArt(sh,0)+'" alt=""><i>'+sh.toUpperCase()+"</i></button>";
    const good=s.k==="key"||s.k==="pot"||s.k==="bottle",nm=s.k==="key"?"KEY!":C4_SPEC[s.k]?C4_SPEC[s.k][0]:(C4_JUNK.find((q)=>q[0]===s.k)||[0,"?"])[1];
    return'<button class="c4slot open'+(good?" good":C4_SPEC[s.k]?" bad":"")+'" disabled aria-label="'+Qt(nm)+'"><img src="'+c4SlotArt(s.k,1)+'" alt=""><i>'+Qt(nm)+"</i></button>";}).join("");
  msg!=null&&(qs("#c4sMsg").innerHTML=msg);const left=L.filter((s)=>!s.o).length,done=inv.includes("pot")&&inv.includes("bottle");
  qs("#c4sOk").textContent=done&&!S4.t8on?"GO!":"CLOSE";qs("#c4sOk").className="gbtn"+(left&&!done?" alt":"");}
function c4SearchPick(j){if(!C4SR||C4SR.busy)return;const S4=c4S(),B=S4.box,s=B.slots[C4SR.i][j];if(!s||s.o)return;
  C4SR.busy=1;const btn=qs('[data-c4s="'+j+'"]');btn&&btn.classList.add("shake");$sx(["crate","scratch","creak"][j%3]);
  setTimeout(()=>{if(!C4SR)return;C4SR.busy=0;s.o=1;let msg="";const k=s.k;
    if(k==="key"){const nx=B.chain[B.chain.indexOf(C4SR.i)+1],c=C4_COL[B.col[nx]];B.key=nx;inv.includes("ckey")||inv.push("ckey");got.add("ckey");updateBag();$sx("pickup");
      msg='<b class="ok">A KEY!</b> Its tag is <b style="color:'+c[1]+'">'+c[0]+"</b>. Find the "+c[0]+" container's padlock.";}
    else if(k==="pot"||k==="bottle"){inv.includes(k)||inv.push(k);got.add(k);updateBag();$sx("success");msg='<b class="ok">'+C4_SPEC[k][0]+"</b> "+C4_SPEC[k][1];
      if(inv.includes("pot")&&inv.includes("bottle"))msg+='<br><b class="ok">You have BOTH! Press GO!</b>';}
    else if(C4_SPEC[k]){$sx("locked");msg='<b class="no">'+C4_SPEC[k][0]+":</b> "+C4_SPEC[k][1];}
    else{const q=C4_JUNK.find((x)=>x[0]===k);msg="<b>"+q[1]+":</b> "+q[2];}
    updateGuide();c4SearchDraw(msg);const nb=qs('#c4sG button:not([disabled])');(nb||qs("#c4sOk")).focus();},340);}
function c4SearchClose(){const el=qs("#c4Search");if(!el||el.hidden)return;el.hidden=!0;modal=0;C4SR=null;const S4=c4S();updateGuide();
  if(inv.includes("pot")&&inv.includes("bottle")&&!S4.t8on&&!S4.end)c3CutStart("c4eight");
  else if(S4.box&&S4.box.key>=0&&inv.includes("ckey"))toast("<b>FIND THE MATCHING PADLOCK.</b><br>Key tag: <b style=\"color:"+C4_COL[S4.box.col[S4.box.key]][1]+"\">"+C4_COL[S4.box.col[S4.box.key]][0]+"</b>",2600);}
function c4CutBcol(c){const t=c.t,S4=c4S();
  if(t===2){$sx("creak");shake=4;tnCap("…did the bridge just move?");}
  if(t===50){$sx("crash");$sx("rumble");shake=22;tnCap("");}
  if(t>=50&&t<=100){C4.bfall=c3Ez((t-50)/50);player.y=C4_DECK+20*C4.bfall;player.x+=(512-player.x)*0.08;t%8===0&&$sx("debris");
    t%4===0&&sparks(300+300*Math.random(),C4_DECK+40*Math.random(),5,["#6a6e70","#9a9a92","#3a3c3e"],1.6,0.14,22);}
  if(t===100){S4.bcol=1;c4BridgePlats(1);C4.bfall=1;player.y=70;player.x=512;shake=14;$sx("land");if(!S4.box)c4Boxes();}
  if(t===116)tnCap("Whoa!! …I'm okay. I'm okay.");
  if(t===250){player.face=-1;tnCap("The middle of the bridge is gone. There's no way across.");}
  c.cx=t<380?null:t<520?c3Clamp(330+c3Ez((t-380)/140)*280-96,0,C4_BW-192):t<640?c3Clamp(610-96,0,C4_BW-192):null;
  if(t===390)tnCap("Wait… those are cargo containers! The ships must have crashed right here.");
  if(t===540)tnCap("One of them is torn open. Maybe there's something inside to boil water in.");
  if(t>=640){C4.bfall=0;c3CutEnd();c4CP("cbridge","The broken bridge");updateGuide();
    toast("<b>NEW GOAL</b><br>Search the containers. Find the torn-open one first: there may be a key inside to the next one.",4400);}}
function c4CutEight(c){const t=c.t;
  if(t===2){$sx("rumble");shake=10;tnCap("That rumble… the dam!");}
  if(t===130)tnCap("It won't hold much longer. Eight minutes… maybe less.");
  if(t===260)tnCap("A clean pot and a clean bottle. Back to the river to make the water safe to drink!");
  if(t>=380){const S4=c4S();c3CutEnd();S4.t8on=1;S4.t8=C4_T8;c4CP("cbridge","Pot and bottle found");updateGuide();$sx("stinger");
    toast("<b>8 MINUTES UNTIL THE DAM BREAKS!</b><br>Go back EAST (right) to the river. Make a fire, boil, filter, boil again… then drink.",5200);}}
