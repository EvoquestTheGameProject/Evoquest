const a=92,e=qs("#gm"),o=qs("#gc").getContext("2d"),n=["cafe","med","store","lab","pod"],l=["goggles","gloves","water","hcl","h2o2","salt","rod","strip"],s=me,c={};function i(t,a){const e=t+a;if(c[e])return c[e];const o=new Image();return((o.src=s(t,a)),(c[e]=o));}
const items={goggles:{n:"Safety goggles",k:"goggles",c:"#7fe8ff",where:"LAB (red safety locker)",why:"Protect your eyes first. The cornea, the clear window at the front of the eye, is only a few cells thick, so a chemical splash can harm it in seconds.",info:"Splash goggles are made of polycarbonate, a tough clear plastic, and seal against the face. Ordinary glasses leave gaps at the sides.",},gloves:{n:"Nitrile gloves",k:"gloves",c:"#4a9aff",where:"CHEM STORAGE (on top of the crate stack)",why:"Skin is a barrier, not armour. Acid and peroxide burn skin, so gloves go on together with the goggles.",info:"Nitrile is a synthetic rubber, a polymer (long chains of repeating molecules). Chemicals slowly seep through any glove. That delay is called the breakthrough time, and for thin gloves it can be just minutes.",},water:{n:"Distilled water (H₂O)",k:"jug",c:"#5fb8ff",where:"MED BAY (on the hospital bed)",why:"Needs 3 parts. Water is the solvent: it carries every other ingredient and soaks up the heat released when acid dissolves in it. Always add ACID TO WATER, never the reverse.",info:"Distilled water is boiled and the steam cooled back to liquid, which leaves the minerals behind. Tap-water ions (Ca²⁺, Mg²⁺, Cl⁻) would upset the recipe. Water absorbs heat well: it takes 4.18 joules to warm 1 gram by 1°C.",},hcl:{n:"Hydrochloric acid (HCl)",k:"bottle",c:"#e8e060",where:"CHEM STORAGE (yellow corrosives cabinet)",why:"Needs 1 part. In water it splits into H⁺ and Cl⁻ ions. The H⁺ takes electrons from iron (oxidation): Fe + 2HCl → FeCl₂ + H₂↑. The bubbles are hydrogen gas. It also dissolves rust (iron oxide).",info:"A strong acid: almost every HCl molecule splits apart in water. Your stomach makes a weaker version (pH 1.5 to 3.5). Industry uses it to “pickle” steel, stripping rust before painting or coating.",},h2o2:{n:"Hydrogen peroxide (H₂O₂)",k:"bottle",c:"#c98a4a",where:"MED BAY (antiseptic cabinet, top shelf)",why:"Needs 1 part. It is an oxidizer: it takes electrons from metal even faster than H⁺ does, so the acid bites deeper. HCl + H₂O₂ is a real metal-etching mix.",info:"H₂O₂ is water with an extra oxygen atom held by a weak bond. It breaks down into water + oxygen (2H₂O₂ → 2H₂O + O₂), and that is the fizz on a cut. It is stored in dark bottles because light speeds this up.",},salt:{n:"Table salt (NaCl)",k:"shaker",c:"#f4f4ff",where:"CAFETERIA (kitchen shelf)",why:"Needs 1 pinch, added last. It supplies chloride ions (Cl⁻) that slip through the thin oxide skin protecting metal. It also pulls water out of plant cells by osmosis, so vines wilt.",info:"In water, NaCl splits into Na⁺ and Cl⁻. Chloride is small enough to get through the oxide layer and eat pits into steel, which is why ships and coastal bridges corrode faster.",},rod:{n:"Glass stirring rod",k:"rod",c:"#bfe8ff",where:"LAB (left side, by the cabinets)",why:"Stirring spreads heat and ions evenly so no dangerous hot spots form. Stir after the acid and again after the salt.",info:"Glass is mostly silica (SiO₂), which this acid does not attack. A metal spoon would dissolve in the mix, and that is exactly what the solvent is meant to do to the barricade, not to your tools.",},strip:{n:"pH test strips",k:"strip",c:"#e8883a",where:"MED BAY (left, by the curtain)",why:"Lets you check how acidic the mix is before you trust it. Dip it in once everything is stirred.",info:"pH = -log₁₀[H⁺]. Each step down the scale means 10 times more H⁺. pH 1 has a million times more H⁺ than pure water (pH 7). Strips turn from red (acid) to blue (base).",},soda:{n:"Baking soda (NaHCO₃)",k:"box",c:"#ff9a3a",where:"CHEM STORAGE (spill kit)",why:"A decoy for this job. It is a base, and a base cancels an acid (neutralization): HCl + NaHCO₃ → NaCl + H₂O + CO₂. Great for spills, wrong for our solvent.",info:"The base takes the H⁺, so the acid loses its metal-eating power. The fizz is carbon dioxide gas. Spill kits use baking soda or similar to neutralize acid spills safely.",decoy:1,},sugar:{n:"Sugar (C₁₂H₂₂O₁₁)",k:"sugar",c:"#fff",where:"CAFETERIA (counter)",why:"Another decoy. Sugar dissolves, but its molecules stay whole, so there are no ions and no H⁺ to take electrons from iron.",info:"Sucrose dissolves because it bonds loosely with water molecules, not because it splits apart. A sugar solution has no free ions, so it cannot attack metal or carry electricity.",decoy:1,},canister:{n:"Venom Canister",k:"canister",c:"#3a4258",card:'<b>Date Manufactured</b><span>October 23, 2113</span><b style="margin-top:8px">Information</b><span>An experimental weapon made by the government to stop potentially dangerous creatures. However, it was abandoned in the storage room for unknown reasons. This weapon doesn’t actually work yet, it is just a material.</span>',},vial1:{n:"Venom Vial",k:"vial",c:"#b06aff",card:"<b>Information</b><span>Unknown venom substances from venomous species, mostly from snakes. Use at your own risk.</span>",},vial2:{n:"Venom Vial",k:"vial",c:"#b06aff",card:"<b>Information</b><span>Unknown venom substances from venomous species, mostly from snakes. Use at your own risk.</span>",},vial3:{n:"Venom Vial",k:"vial",c:"#b06aff",card:"<b>Information</b><span>Unknown venom substances from venomous species, mostly from snakes. Use at your own risk.</span>",},barrel:{n:"Blaster Barrel",k:"barrel",c:"#8a94ac",card:"<b>Information</b><span>A steel spray barrel with a wide nozzle. It looks like it screws onto a canister. Just a part on its own.</span>",},handle:{n:"Blaster Handle",k:"handle",c:"#8a6a4a",card:"<b>Information</b><span>A grip with a trigger and a pump valve. Just a part on its own.</span>",},fullcan:{n:"Full Venom Canister",k:"canister",c:"#b06aff",card:"<b>Information</b><span>The Venom Canister, now filled with three vials of snake venom. It still needs a barrel and a handle before it can fire.</span>",},blaster:{n:"Venom Blaster",k:"blaster",c:"#b06aff",card:'<b>Information</b><span>Canister, barrel and handle assembled into a working weapon. It sprays venom that eats through almost anything.</span><b style="margin-top:8px">Ammunition</b><span>Only 4 shots. Venom dropped by dead snakes adds 1 shot each. SHOOT with F / K or the shoot button.</span>',},potion:{n:"Eroding solvent",k:"potion",c:"#6aff7a",where:"",why:"Acid + oxidizer + chloride in water. Together they oxidize iron into dissolved ions. Pour it on the barricade.",info:"Your own home-made metal etchant. Etching means removing a thin layer of metal with a chemical reaction.",},},rooms={pod:{name:"CRYO POD ROOM",L:"lab",R:null,plats:[],crates:[{x:30,w:12}],items:[],ints:[],},lab:{name:"THE LAB",L:"store",R:"pod",plats:[],crates:[],items:[{id:"goggles",x:150,y:78},{id:"rod",x:36,y:90},],ints:[{id:"bench",x:92,r:20,label:"MIX"}],},store:{name:"CHEMICAL STORAGE",L:"med",R:"lab",plats:[{x:122,y:70,w:34}],crates:[{x:110,w:12},{x:110,w:12,y2:1},],items:[{id:"hcl",x:43,y:76},{id:"soda",x:143,y:70},{id:"gloves",x:116,y:68},],ints:[],},med:{name:"MED BAY",L:"cafe",R:"store",plats:[{x:54,y:78,w:44},{x:118,y:62,w:42},],crates:[],items:[{id:"water",x:78,y:78},{id:"h2o2",x:140,y:62},{id:"strip",x:24,y:90},],ints:[],},stair:{name:"FIRE EXIT STAIRWELL",L:null,R:null,fy:304,H:324,sy:40,plats:Ce.concat(Pe),crates:[],items:[],ints:[],gate:(t)=>t.y>=300,},exitlab:{name:"EXIT LAB",L:null,R:null,W:448,H:162,fy:146,sy:146,plats:Ro,crates:[],items:[],ints:[],},outside:{name:"OUTSIDE",L:"exitlab",R:null,plats:[],crates:[],items:[],ints:[]},hall:{name:"BASEMENT",L:null,R:null,plats:[],crates:[],items:[],ints:[{id:"staffdoor",x:37,r:13,label:"OPEN"}],},ware:{name:"STAFF STORAGE",L:null,R:null,W:320,plats:[{x:34,y:70,w:76},{x:34,y:48,w:76},{x:126,y:70,w:80},{x:126,y:48,w:80},{x:222,y:70,w:78},{x:222,y:48,w:78},],crates:[{x:70,w:12},{x:262,w:12},],items:[{id:"vial1",x:18,y:90},{id:"vial2",x:96,y:70},{id:"vial3",x:250,y:48},{id:"barrel",x:76,y:90,in:0},{id:"handle",x:268,y:90,in:1},],ints:[{id:"haz",x:176,r:16,label:"OPEN"},{id:"lock",x:141,r:7,label:"OPEN"},{id:"lock",x:231,r:7,label:"OPEN"},],},cafe:{name:"CAFETERIA",L:null,R:"med",plats:[{x:46,y:80,w:26},{x:22,y:58,w:42},{x:126,y:74,w:58},],crates:[],items:[{id:"salt",x:42,y:58},{id:"sugar",x:156,y:74},],ints:[],},};let gloved=!1,b=!1,g=!1,hasGun=!1,ammo=4,hp=5,invuln=0,shots=[],snakeBoss=null,bossDone=!1,dead=!1,gunCd=0,shootBuf=0,venoms=[],waves=[],camY=0,camX=0,minis=[],bossOpen=!1,canFill=0,cine=null,drops=[],corrode=0,D=0;const roomW=()=>rooms[room].W||192,floorY=()=>rooms[room].fy||a;let player,room="pod",stage=0,exitOpen=!1,hasPotion=!1,hasGoggles=!1,worn=!1,potionUsed=!1,got=new Set(),inv=[],taken={},broken={},runT=0,$=[],keys={l:0,r:0,s:0},jumpBuf=0,punchBuf=0,useBuf=0,coyote=0,tick=0,lt=0,st=0,fadeNow=0,fadeTo=0,onFaded=null,doorCut=0,parts=[],xt=0,roomBanner=0,pourT=0,erode=0,won=0,Tt=!1,modal=0,Ot=0,shake=0;const checkpointKey=()=>"evoquest_cp_"+(playerName||"");function clearCheckpoint(){try{localStorage.removeItem(checkpointKey());}catch(t){}}function evoAutosave(){try{if(!GM.on||dead||won||(typeof C2!=="undefined"&&C2[room]))return;if(!(inv.length||exitOpen))return;const k=checkpointKey(),o=JSON.parse(localStorage.getItem(k)||"null");if(o&&2===o.ch)return;const js=JSON.stringify({v:1,pre:exitOpen?0:1,inv:exitOpen?inv.filter((t)=>"potion"!==t):inv.slice(),got:[...got],taken:taken,broken:broken,worn:worn,gloved:gloved,hasGoggles:hasGoggles,hasGun:hasGun,ammo:ammo,canFill:canFill});if(localStorage.getItem(k)!==js){localStorage.setItem(k,js);window.__evoSaved&&window.__evoSaved();}}catch(t){}}addEventListener("pagehide",evoAutosave);document.addEventListener("visibilitychange",()=>{document.hidden&&evoAutosave();});setInterval(evoAutosave,15000);
function resetGame(){((runT=0),($=[]),(room="pod"),(stage=0),(exitOpen=!1),(hasPotion=!1),(worn=!1),(gloved=!1),(potionUsed=!1),(hasGun=!1),(ammo=4),(hp=5),(invuln=0),(shots=[]),(snakeBoss=null),(bossDone=!1),(dead=!1),(venoms=[]),(waves=[]),(camY=0),(got=new Set()),(inv=[]),(taken={}),(broken={}),(parts=[]),(pourT=0),(erode=0),(won=0),(Tt=!1),(modal=0),(doorCut=0),(fx=[]),(hitStop=0),(hurtFlash=0),(bossOpen=!1),(canFill=0),(cine=null),(drops=[]),(corrode=0),(ua={h:0,b:0,c:0}),(qs("#cskip").hidden=!0),(player={x:122,y:a,vx:0,vy:0,face:1,on:!0,punch:0,fr:0,walk:0}),(roomBanner=150),(fadeNow=1),(fadeTo=0),(onFaded=null),updateGuide(),updateBag(),updateHud(),(qs("#gd").hidden=!0),(qs("#gw").hidden=!0),c2WinReset(),(qs("#gx").hidden=!0),(qs("#gk").hidden=!0),toast(""));}
const backdrops={},fill=(t,a,e,o,r)=>{((ctx.fillStyle=t),ctx.fillRect(a,e,o,r));};function backdrop(t){return(backdrops[t]||
(backdrops[t]=(function(t){if(tnIs(t))return tnBackdrop(t);if(C2[t])return c2Backdrop(t);if("stair"===t)
return(function(){const t=document.createElement("canvas");((t.width=384),(t.height=648));const a=t.getContext("2d");for(let t=0;t<3;t++){const e=document.createElement("canvas");((e.width=384),(e.height=216));const o=ctx;((ctx=e.getContext("2d")),Ht((a)=>Ge(a,t)),(ctx=o),a.drawImage(e,0,216*t));}
return t;})();if("exitlab"===t){const t=Ae(To),a=document.createElement("canvas");((a.width=896),(a.height=324));const e=a.getContext("2d");((e.imageSmoothingEnabled=!1),e.drawImage(t,384,108),e.save(),e.translate(384,108),e.scale(-1,1),e.drawImage(t,0,0),e.restore(),e.save(),e.translate(896,108),e.scale(-1,1),e.drawImage(t,256,0,128,216,0,0,128,216),e.restore(),e.save(),e.translate(0,108),e.scale(1,-1),e.drawImage(a,0,108,896,108,0,0,896,108),e.restore(),(e.fillStyle="rgba(2,6,8,.35)"),e.fillRect(0,0,896,108));const o=Ae((t)=>
(function(t){const a=384/448,e=216/162,o=(t)=>t*a,n=(t)=>t*e;Ro.forEach((a,e)=>{const l=o(a.x),s=o(a.w),c=n(a.y);(xe(t,l,c,s,3,"#5a6670","#a8b4bc","#1a2228"),t.rect(l,c+3,s,1,[10,14,18]));const i=s>40?[l+1,l+s/2-1,l+s-3]:[l+1,l+s-3];i.forEach((a)=>{(t.rect(a,c+3,2,n(146)-c-3,[58,66,74]),t.rect(a,c+3,1,n(146)-c-3,[120,130,138]));});for(let a=0;a<i.length-1;a++)
t.line(i[a]+1,c+5,i[a+1]+1,n(146)-2,[40,46,52],0.7);for(let a=0;a<3;a++){const o=l+3+r(e,a)*(s-12),n=5+6*r(e,a+5),i=3+4*r(e,a+9);xe(t,o,c-i,n,i,a%2?"#4a3a26":"#46525e",a%2?"#a08450":"#98a6b2",a%2?"#1a1208":"#161c24",);}
for(let a=0;a<s;a+=2)
r(9*e,a)<0.45&&
t.px(l+a,c-1,r(a,e)<0.5?[58,130,60]:[96,190,86]);(Ba(t,l+0.3*s,c+3,(8+14*r(e,1))|0,7*e+3,e%2?[255,134,208]:null,),s>40&&Ba(t,l+0.75*s,c+3,(6+12*r(e,2))|0,7*e+5,null));for(let a=0;a<s;a+=6)t.px(l+a+2,c+1,[30,36,40]);});for(let a=0;a<12;a++)
Ba(t,384*r(a,61),0,(6+24*r(a,62))|0,5*a+40,a%4==0?[255,226,110]:null,);})(t),);return(e.drawImage(o,0,0,384,216,0,0,896,324),a);}
if("outside"===t)return Ae(Ke);if("hall"===t)return Ae(So);if("ware"===t){const t=document.createElement("canvas");((t.width=640),(t.height=216));const a=t.getContext("2d");for(let t=0;t<2;t++)
a.drawImage(Ae((a)=>Co(a,t)),0,0,320,216,320*t,0,320,216,);return t;}
if("pod"===t){const t=document.createElement("canvas");((t.width=384),(t.height=216));const a=t.getContext("2d"),e=ctx;return((ctx=a),a.scale(2,2),Mt("podO",()=>Wa(1)),(ctx=e),ke(t,(t)=>{const a=150;t.rect(a+10,30,234-a-20,146,"#06402e",0.26);for(let e=40;e<172;e+=6)t.rect(a+12,e,60,1,"#2affb0",0.05);t.rect(a+14,150,56,26,"#0e2e24",0.4);for(let e=0;e<46;e++)
t.px(a+16+52*r(e,3),152+22*r(e,4),r(e,5)<0.5?"#3aff9a":"#1a6a46",0.7,);(t.rect(a+18,168,48,5,"#3aff9a",0.28),t.rect(a+22,170,40,2,"#b8ffd8",0.35),t.light(192,110,60,"#40ffb0",0.5));for(let a=0;a<7;a++){const e=34+20*a,o=(5+8*r(a,2))|0;t.poly([[222,e],[222-o,e+8],[222,e+16],],[170,240,225,0.6],);}
for(let e=0;e<5;e++){const o=a+14+12*e,n=(4+6*r(e,5))|0;t.poly([[o,36],[o+n,36],[o+n/2,44+6*r(e,6)],],[170,240,225,0.6],);}
(t.poly([[a+12,34],[222,34],[222,172],[a+12,172],],[150,255,220,0.13],),t.line(a+12,34,222,34,"#d8fff0",0.8),t.line(a+12,172,222,172,"#7ad8b8",0.6),t.line(a+14,40,a+14,166,"#e8fff6",0.6),t.line(a+18,50,a+18,120,"#e8fff6",0.35),[[a+20,36,a+36,80,a+28,120],[a+36,80,a+60,96,a+56,140],[a+36,80,a+46,60,a+64,44],[a+60,96,a+68,70,a+64,48],[a+28,120,a+16,150,a+30,168],[a+56,140,a+46,156,a+52,170],[a+44,60,a+30,44,a+26,36],].forEach((a)=>{(t.line(a[0],a[1],a[2],a[3],"#ffffff",0.85),t.line(a[2],a[3],a[4],a[5],"#ffffff",0.7));}),t.light(192,100,70,"#a8ffe0",0.3));for(let a=0;a<14;a++){const e=112+100*r(a,7),o=182+8*r(a,8),n=(3+6*r(a,9))|0;t.poly([[e,o],[e+n,o-1],[e+n/2,o-4-3*r(a,2)],],[200,255,240,r(a,1)<0.5?0.7:0.45],);}
([a,222].forEach((a,e)=>{(t.rect(a+1,32,10,152,"#124a3a",0.28),t.rect(a+1,32,1,152,"#6ad0a8",0.8),t.rect(a+10,32,1,152,"#020a0a",0.4));for(let e=44;e<178;e+=14)
(t.px(a+2,e,"#6ad0a8"),t.px(a+9,e,"#6ad0a8"));for(let o=0;o<14;o++)
t.rect(a+1+9*r(o,e),38+140*r(o,e+2),1,(2+5*r(o,e+3))|0,"#5a8a3a",0.7,);}),t.rect(a-6,22,96,12,"#0b2e26",0.4),t.rect(a-6,22,96,1,"#6ad0a8",0.8));for(let e=0;e<6;e++)
t.rect(a+29+6*e,27,3,2,e<2?"#ff4a3a":"#1a3a30",0.8);(t.rect(a-8,176,100,12,"#0b2e26",0.45),t.rect(a-8,176,100,1,"#6ad0a8",0.8));for(let a=0;a<7;a++)
for(let e=0;e<110;e++){const o=Math.abs(e-55)/55,r=(a-3)/3.6;o*o*0.9+r*r<1&&
t.px(112+e,190+a,a%2?[120,230,190]:[80,200,160],0.5);}
(Ga(t,a-6,22,96,16,81),Ga(t,a-6,162,100,28,83),Ga(t,a,52,12,120,85,0.9),Ga(t,222,52,12,120,87,0.9));for(let e=0;e<9;e++)
ve(t,a-4+11*e,26,a-8+11*e+(e%2?8:-6),(62+100*r(e,3))|0,4+6*r(e,4),2.1*e+90,2+(e%3==0),ye[e%6]||[255,134,208],);(ve(t,a-6,24,a+6,154,10,300,3),ve(t,238,24,226,134,-8,310,3),Fa(t,a-4,180,13,4),Fa(t,238,182,15,9),Fa(t,a+90,188,9,13),Fa(t,a+12,26,8,15),Fa(t,222,28,9,17),Da(t,a+20,192,18,2,[20,90,50],[120,220,100]),Da(t,220,194,16,6,[20,90,50],[120,220,100]));const e=290;(t.rect(286,34,100,152,"#02080a"),xe(t,e,56,92,130,"#16241e","#3a5a48","#02080a"),t.rect(298,64,76,122,"#040c0a"));for(let a=e;a<382;a+=10)
t.poly([[a,56],[a+5,56],[a+10,64],[a+5,64],],r(a,1)<0.5?"#c8a828":"#14180c",);(t.rect(e,64,92,1,"#02080a"),xe(t,306,32,60,20,"#04140c","#1aff6a","#02080a"),t.rect(308,34,56,16,"#0a5a2a"),t.rect(309,35,54,14,"#1aff6a",0.85),t.rect(312,38,5,8,"#04140c"),t.rect(317,38,4,2,"#04140c"),t.rect(317,41,3,2,"#04140c"),t.rect(317,44,4,2,"#04140c"),t.rect(323,38,2,8,"#04140c"),t.rect(325,38,3,2,"#04140c"),t.rect(328,40,2,3,"#04140c"),t.rect(325,43,3,2,"#04140c"),t.rect(328,45,2,1,"#04140c"),t.rect(333,38,2,2,"#04140c"),t.rect(333,41,2,5,"#04140c"),t.rect(338,38,6,2,"#04140c"),t.rect(340,40,2,6,"#04140c"),t.disc(354,39,2,"#04140c"),t.line(354,41,352,46,"#04140c"),t.line(354,42,357,45,"#04140c"),t.light(336,42,60,"#30ff80",0.5),Ga(t,286,34,100,10,92));for(let a=0;a<7;a++)
ve(t,e+13*a,34,e+13*a+(a%2?6:-6),(84+40*r(a,2))|0,4,3*a+400,2,ye[a%6]||[255,134,208],);(Fa(t,292,190,12,6),Fa(t,380,192,13,3),t.fog(100,120,384,214,"#c0ffd0",0.3,22,30,8,0.14),t.light(40,0,200,"#fff6a0",0.8),t.light(192,0,120,"#fff6a0",0.5));}),t);}
if("lab"===t){const t=document.createElement("canvas");((t.width=384),(t.height=216));const a=t.getContext("2d"),e=ctx;return((ctx=a),a.scale(2,2),Mt("labG",()=>Ja()),(ctx=e),ke(t,(t)=>{(t.rect(290,112,56,74,"#0a0408"),xe(t,292,114,52,70,"#b8283a","#f08a9a","#4a0a16"),t.rect(317,116,2,68,"#4a0a16"));for(let a=122;a<134;a+=3)
(t.rect(298,a,14,1,"#5a0a1a"),t.rect(324,a,14,1,"#5a0a1a"));(t.rect(300,142,8,16,"#5a0a1a"),t.rect(326,142,8,16,"#5a0a1a"),t.rect(306,148,2,6,"#d8d8e0"),t.rect(328,148,2,6,"#d8d8e0"),xe(t,298,160,38,18,"#f4f0e0","#ffffff","#b8b0a0"),t.rect(304,164,26,2,"#b8283a"),t.rect(314,162,6,10,"#b8283a"),t.rect(309,166,16,2,"#b8283a"),Ga(t,292,112,52,12,11),ve(t,296,112,290,150,3,60,2),ve(t,338,112,346,170,-3,62,2),t.rect(124,138,116,48,"#04080e"),xe(t,126,142,112,42,"#26384a","#6a8aaa","#0a121a"),t.rect(126,150,112,1,"#0a121a"),t.rect(180,152,1,32,"#0a121a"),t.rect(130,156,46,22,"#1a2a3a"),t.rect(184,156,50,22,"#1a2a3a"),t.rect(168,170,6,2,"#aab8c4"),t.rect(196,170,6,2,"#aab8c4"),xe(t,122,132,120,10,"#6a7a8a","#d8e8f4","#2a3846"),[[134,"#3aff9a",14],[150,"#ff7a3a",10],[164,"#4ac8ff",12],].forEach(([a,e,o])=>{(t.rect(a,130-o,10,o,"#0a0c14"),t.rect(a+1,131-o,8,o-1,[170,220,240],0.45),t.rect(a+1,134-o+0.4*o,8,0.6*o-3,e),t.rect(a+1,131-o,1,o-4,"#fff",0.7));}),t.rect(196,120,4,12,"#0a0c14"),t.rect(193,128,10,4,"#3a4a5a"),t.rect(197,114,2,6,"#ffb03a"),t.rect(196,112,4,3,"#ffe070"),t.light(198,116,22,"#ffb060",0.7),xe(t,210,118,26,14,"#10202e","#4a6a8a","#02060a"));for(let a=0;a<5;a++)
(t.rect(213+5*a,108,3,14,"#0a0c14"),t.rect(214+5*a,110,1,10,[[255,90,120],[90,255,170],[120,200,255],[255,230,110],[200,130,255],][a],));(t.rect(142,112,4,18,"#3a4a5a"),t.rect(138,126,14,6,"#2a3846"),t.rect(140,108,12,4,"#aab8c4"),t.rect(148,102,4,8,"#8aa0b4"),t.rect(136,120,2,3,"#ff4a3a"),t.rect(176,88,66,12,"#02060a"),t.rect(178,90,62,8,"#ffe070",0.9),t.rect(178,90,62,1,"#fff6c0"),t.rect(184,93,50,2,"#5a4a10"),t.light(209,94,40,"#ffd860",0.5),Ga(t,122,130,120,8,21));for(let a=0;a<5;a++)
ve(t,126+24*a,134,126+24*a+(a%2?6:-5),(150+18*r(a,2))|0,3,2*a+70,2,ye[a%6]||[255,134,208],);(Fa(t,128,134,6,3),Fa(t,236,134,7,9),we(t,7,{n:16,len:120}));for(let a=0;a<3;a++)ve(t,40+80*a,24,20+80*a,150,12,5*a+80,3);}),t);}
if("store"===t){const t={g:["#0d121c","#141c2a","#1c2636","#243248"],s0:"#06080e",lit:"#4a6280",wain:"#101722",ceil:"#05070c",pipe:["#2a3646","#34445a","#222c3a"],lamps:[34,150,266],lamp:"#bfe0ff",lampc:"#9ac8ff",floor:["#1a2230","#10161f","#080b11"],fl:"#3a5070",};return Ae((a)=>{Me(a,t);for(let t=0;t<384;t+=10)
a.poly([[t,176],[t+5,176],[t+10,182],[t+5,182],],r(t,2)<0.5?"#c8a828":"#14180c",);(a.rect(0,175,384,1,"#02080a"),a.rect(0,182,384,1,"#02080a"),a.rect(0,40,384,5,"#34445a"),a.rect(0,40,384,1,"#7a92b0"),a.rect(0,44,384,1,"#06080e"));for(let t=30;t<384;t+=86)
(a.rect(t,36,8,13,"#222c3a"),a.rect(t,36,8,1,"#7a92b0"),a.disc(t+4,42,3,"#c83a2a"),a.rect(t+2,41,5,1,"#fff",0.5));(a.poly([[220,54],[256,54],[238,24],].map((t)=>[t[0]+30,t[1]]),"#e8c020",),a.poly([[254,52],[274,52],[264,34],],"#14100a",),a.disc(264,46,3,"#e8c020"),a.rect(100,60,16,36,"#c8301e"),a.rect(100,60,16,2,"#ff8a6a"),a.rect(104,50,8,10,"#2a2a2a"),a.rect(106,44,4,6,"#4a4a4a"),a.rect(46,92,74,94,"#06060a"),xe(a,48,94,70,90,"#a08a14","#ffe870","#3a3008"),a.rect(52,100,62,80,"#0a0a10"),a.grad(100,180,["#0e0e18","#161620"],52,114,0.8),[112,132,152].forEach((t,e)=>{(a.rect(52,t,62,3,"#6a5a10"),a.rect(52,t,62,1,"#ffe870"),Ee(a,56,t,6,5*e+3,9));}),a.rect(86,148,4,4,"#02020a"),a.poly([[48,94],[34,102],[34,180],[48,184],],"#e8c828",),a.poly([[48,94],[34,102],[34,180],[48,184],],()=>null,),a.line(48,94,34,102,"#fff4a0"),a.line(34,102,34,180,"#fff4a0"),a.line(34,180,48,184,"#8a7410"),a.rect(36,120,10,1,"#8a7410",0.6),a.rect(37,150,3,10,"#2a2208"),a.poly([[38,108],[46,106],[46,120],[38,122],],"#14100a",),a.poly([[40,110],[44,109],[44,118],[40,119],],"#e8c828",));for(let t=0;t<5;t++)a.rect(54+12*t,94,5,3,"#3a3008");(xe(a,56,80,56,12,"#f4f0e0","#ffffff","#8a8470"),a.rect(58,84,52,4,"#d82a1a"));for(let t=0;t<9;t++)a.rect(60+5*t,85,3,2,"#fff6");(a.light(84,134,40,"#fff0a0",0.35),Ga(a,48,92,70,10,31),ve(a,52,92,44,140,4,401,2),ve(a,112,92,120,150,-4,402,2));for(let t=0;t<3;t++)
xe(a,138,84+34*t,70,4,"#6a7a8a","#d8e8f4","#2a3846");(a.rect(138,80,4,106,"#34445a"),a.rect(204,80,4,106,"#34445a"),Ee(a,146,84,7,5,12),Ee(a,146,118,5,9,10),a.rect(190,100,12,18,"#7a5a3a"),a.rect(190,100,12,2,"#b89a6a"),xe(a,146,152,52,22,"#6a5a3a","#b89a6a","#2a1e0e"),a.rect(150,158,44,3,"#2a1e0e"),Ga(a,138,80,70,10,32),ve(a,142,80,150,130,4,403,2),xe(a,244,140,68,5,"#7a8a9a","#e8f2fc","#2a3846"),a.rect(248,145,4,40,"#34445a"),a.rect(304,145,4,40,"#34445a"),a.rect(250,145,50,3,"#2a3846",0.7),xe(a,250,120,28,20,"#d83a2a","#ff9a8a","#6a0a0a"),a.rect(256,124,16,12,"#f4f0e0"),a.rect(262,125,4,10,"#d83a2a"),a.rect(258,129,12,3,"#d83a2a"),Ga(a,244,138,68,8,33),ve(a,246,145,238,190,4,404,2),[[322,"#2a7a4a"],[352,"#2a5a7a"],].forEach(([t,e],o)=>{(a.rect(t-1,138,32,48,"#06080e"),xe(a,t,140,30,46,e,ge(e,0.6),pe(e,0.7)));for(let o=148;o<184;o+=14)
(a.rect(t,o,30,2,pe(e,0.5)),a.rect(t,o,30,1,ge(e,0.3)));if((a.rect(t+8,158,14,14,"#e8c828"),a.rect(t+10,160,10,10,"#14100a"),a.disc(t+15,165,3,"#e8c828"),Ga(a,t,138,30,12,o+60),0===o)){for(let e=0;e<22;e++)
a.px(t+20+6*r(e,1),150+1.6*e,"#8aff6a",0.9);a.rect(t+14,186,40,3,"#8aff6a",0.45);}}),a.light(338,188,40,"#6aff6a",0.5),we(a,13,{n:15,len:110}));});}
if("med"===t){const t={g:["#16333a","#1f464e","#295860","#306870"],s0:"#06151a",lit:"#7ac0c8",wain:"#c8dcde",ceil:"#061215",pipe:["#2a5a62","#347078","#244a52"],lamps:[40,170,300],lamp:"#f0ffff",lampc:"#c0f0ff",floor:["#6a9096","#487a82","#2a5258"],fl:"#a8d8e0",};return Ae((a)=>{(Me(a,t),a.rect(0,140,384,28,"#b8d0d2"));for(let t=0;t<384;t+=14)a.rect(t,141,1,27,"#8aa8ac");for(let t=140;t<168;t+=9)a.rect(0,t,384,1,"#8aa8ac");a.rect(0,140,384,1,"#f0ffff");for(let t=0;t<50;t++)a.px(384*r(t,3),141+26*r(t,4),"#6a8a8e");(a.rect(166,26,40,40,"#e8f2f4"),a.rect(166,26,40,2,"#fff"),a.rect(183,31,6,30,"#d82a3a"),a.rect(172,43,28,6,"#d82a3a"),a.rect(166,64,40,2,"#8aa8ac"),a.disc(268,44,12,"#082026"),a.disc(268,44,10,"#e8f2f4"),a.line(268,44,268,36,"#082026"),a.line(268,44,274,47,"#082026"));for(let t=0;t<12;t++)
a.px(268+9*Math.cos(0.5236*t),44+9*Math.sin(0.5236*t),"#082026");a.rect(10,34,110,4,"#8aa8ac");for(let t=14;t<116;t+=12)a.disc(t,36,2,"#c8e0e4");for(let t=14;t<116;t+=7){const e=(96+34*r(t,3))|0;(a.rect(t,38,6,e,r(t,5)<0.5?[232,246,248]:[200,226,230],0.9),a.rect(t,38,1,e,"#fff",0.7),a.rect(t+5,38,1,e,"#8aa8ac",0.6));}
for(let t=14;t<116;t+=7)
r(t,9)<0.3&&a.rect(t,(120+20*r(t,4))|0,6,12,"#1a3a40");(Ga(a,10,100,110,50,41),a.rect(106,150,92,6,"#06151a"),xe(a,108,154,88,12,"#e8f4f6","#ffffff","#9ab8bc"),a.rect(108,164,88,6,"#2a8a98"),a.rect(108,164,88,1,"#6ad0d8"),xe(a,110,150,22,6,"#ffffff","#ffffff","#bcd0d4"),a.rect(100,134,6,52,"#8aa0a8"),a.rect(100,134,6,1,"#d8e8ec"),a.rect(196,142,4,44,"#8aa0a8"),a.rect(108,170,3,16,"#6a8088"),a.rect(190,170,3,16,"#6a8088"),a.rect(104,184,12,3,"#3a4a50"),a.rect(186,184,12,3,"#3a4a50"),Ga(a,108,150,88,16,42),ve(a,120,150,110,186,5,411,2),ve(a,176,150,190,186,-5,412,2),xe(a,128,76,46,34,"#10202a","#4a7a88","#02080a"),a.rect(132,80,38,24,"#031a10"),[0,0,0,0,3,-9,8,-4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,].forEach((t,e)=>a.px(133+e,94-t,"#3aff7a")),a.rect(132,98,38,1,"#3aff7a",0.2),a.rect(136,106,3,2,"#ff4a3a"),a.rect(142,106,3,2,"#ffb03a"),a.light(150,92,30,"#3aff7a",0.3),a.rect(150,110,6,24,"#6a8088"),a.rect(142,132,22,4,"#3a4a50"),a.rect(222,62,18,28,"#eaf6f8"),a.rect(222,62,18,2,"#fff"),a.rect(224,74,14,14,"#6ad8f0",0.8),a.rect(230,90,2,60,"#9ab0b8"),a.rect(220,148,22,4,"#4a5a62"),a.rect(228,152,6,34,"#6a8088"),a.rect(222,184,18,3,"#3a4a50"),a.rect(231,92,1,8,"#6ad8f0"),Ga(a,222,60,20,10,43),ve(a,226,60,218,120,4,413,2),a.rect(226,38,106,90,"#04141a"),xe(a,228,40,102,84,"#e4f0f2","#ffffff","#7a9aa0"),a.rect(232,44,94,76,"#c8dce0"),a.rect(279,44,1,76,"#7a9aa0"),a.rect(232,74,94,2,"#7a9aa0"),a.rect(232,76,94,1,"#fff"),Ee(a,236,74,7,15,12),a.rect(300,56,22,18,"#fff"),a.rect(306,58,2,14,"#d82a3a"),a.rect(302,64,18,2,"#d82a3a"),a.rect(236,48,16,12,"#d8402a"),a.rect(240,50,8,6,"#fff"),xe(a,224,124,114,6,"#7a98a0","#e8f8fc","#2a4a52"),a.rect(230,130,4,56,"#34545c"),a.rect(326,130,4,56,"#34545c"),a.poly([[330,40],[348,50],[348,118],[330,124],],[190,225,230,0.55],),a.line(330,40,348,50,"#fff",0.8),a.line(348,50,348,118,"#fff",0.6),Ga(a,226,38,106,12,44),ve(a,232,40,226,120,4,414,2),ve(a,322,40,330,128,-4,415,2),a.disc(346,172,14,(t,a)=>(t*t+a*a>150?[20,30,34]:null)),a.disc(346,172,2,"#aab8c0"),a.rect(332,140,6,32,"#2a3a40"),a.rect(334,150,30,5,"#2a3a40"),a.rect(358,142,5,14,"#2a3a40"),Ga(a,330,136,36,10,45),we(a,19,{n:14,len:100}));});}
if("cafe"===t){const t={g:["#241828","#34243a","#443048","#523a56"],s0:"#0c060e",lit:"#a07aa8",wain:"#3a2838",ceil:"#0e0612",pipe:["#4a3a4c","#5a485c","#3a2c3c"],lamps:[],lamp:"#ffe9a0",lampc:"#ffd890",floor:["#5a4658","#3c2c3a","#24182a"],fl:"#a08aa0",};return Ae((a)=>{Me(a,t);for(let t=0;t<384;t+=24)
for(let e=0;e<4;e++)
(t/24+e)%2==0&&a.rect(t,168+10*e,24,e<1?6:10,"#7a6678",0.5);(a.rect(26,36,156,86,"#06040a"),a.grad(40,118,["#6ac88a","#3a9a58","#1f6a3a"],30,178,0.9));for(let t=0;t<70;t++)
a.rect(30+146*r(t,3),40+70*r(t,4),(6+10*r(t,5))|0,4,r(t,6)<0.5?[60,160,80]:[120,210,100],);for(let t=0;t<4;t++)Fa(a,40+40*t,114,12,3*t);(a.rect(100,36,4,86,"#06040a"),a.rect(26,76,156,4,"#06040a"));for(let t=26;t<182;t+=3)r(t,2)<0.5&&a.rect(t,120,3,3,"#1a1008",0.5);(a.poly([[26,122],[182,122],[250,186],[110,186],],[255,246,170,0.09],),a.light(104,80,100,"#fff0b0",0.9),xe(a,22,120,164,6,"#4a3a2a","#c8a878","#14100a"),xe(a,206,40,70,44,"#14100a","#6a5a4a","#02020a"),a.rect(210,44,62,36,"#2a3a2a"));for(let t=0;t<5;t++)
a.rect(214,50+6*t,(24+24*r(t,3))|0,1,"#e8e8d0");(a.rect(252,66,12,8,"#e8d050"),[[60,0],[200,1],[320,2],].forEach(([t])=>{(a.rect(t,24,1,22,"#06040a"),a.poly([[t-10,56],[t+10,56],[t+4,46],[t-4,46],],"#14100a",),a.poly([[t-9,55],[t+9,55],[t+3,47],[t-3,47],],"#e8c868",),a.rect(t-6,57,12,2,"#ffe9a0"),a.light(t,64,56,"#ffd890",0.75));}),xe(a,44,116,84,5,"#8a5a30","#d8a868","#2a1608"),a.rect(50,121,4,16,"#3a2a1a"),a.rect(120,121,4,16,"#3a2a1a"),[["#e8a8a8",50],["#a8c8e8",64],["#a8e8b8",100],["#e8d8a0",114],].forEach(([t,e])=>{(a.rect(e,100,10,16,"#0a0c14"),a.rect(e+1,101,8,14,t),a.rect(e+1,101,2,12,ge(t,0.6)),a.rect(e+2,97,6,3,"#4a4a5a"));}),Ga(a,44,114,84,8,51),ve(a,50,121,44,160,3,421,2),a.rect(92,158,52,3,"#06040a"),a.rect(92,159,52,4,"#e8d8c0"));for(let t=92;t<144;t+=8)a.rect(t,159,4,4,"#d84a4a");(a.rect(92,159,52,1,"#fff"),a.rect(114,162,8,22,"#3a2a1a"),a.rect(100,182,36,4,"#3a2a1a"),a.rect(66,168,12,3,"#5a3a22"),a.rect(66,171,3,14,"#3a2a1a"),a.rect(74,171,3,14,"#3a2a1a"),a.rect(66,152,3,18,"#5a3a22"),a.poly([[150,184],[170,184],[176,172],[158,170],],"#5a3a22",),a.rect(152,184,3,2,"#2a1608"),Ga(a,90,158,56,8,52),ve(a,96,162,90,186,3,422,2),ve(a,136,162,144,186,-3,423,2),a.rect(250,144,122,6,"#06040a"),xe(a,252,146,118,6,"#e8dccc","#ffffff","#8a7a6a"),a.rect(254,152,114,34,"#5a465a"),a.rect(254,152,114,2,"#8a728a"));for(let t=260;t<364;t+=26)
(a.rect(t,160,22,22,"#2a1c2a"),a.rect(t,160,22,1,"#8a728a"),a.rect(t+9,168,4,2,"#aab"));(a.poly([[254,146],[366,146],[360,110],[258,110],],[190,230,240,0.16],),a.line(258,110,360,110,"#d8f4ff",0.7),a.line(258,110,254,146,"#d8f4ff",0.5),xe(a,340,118,26,28,"#aab0b8","#f0f4f8","#4a505a"),a.rect(344,124,10,8,"#14181e"),a.rect(344,124,10,1,"#ff4a3a"),a.rect(356,132,6,10,"#2a2e36"),a.light(349,130,22,"#ffb060",0.2),xe(a,262,134,24,12,"#c8c8d0","#fff","#6a6a78"),a.rect(266,136,16,6,"#e8a060"),Ga(a,250,142,122,10,53),ve(a,256,152,250,186,4,424,2),ve(a,364,152,372,186,-4,425,2),ve(a,300,110,296,146,3,426,2),we(a,23,{n:16,len:105}));});}})(t)));}
let Vt=null;const jt=(t,a,e)=>{const o=(t)=>[1,3,5].map((a)=>parseInt(t.slice(a,a+2),16)),r=o(t),n=o(a);return"rgb("+r.map((t,a)=>Math.round(t+(n[a]-t)*e)).join(",")+")";};function toast(a,e){const o=qs("#gt");if(!a)return(o.classList.remove("on"),void(xt=0));((o.innerHTML=a),o.classList.add("on"),(xt=Math.round((e||2600)/16.7)));}
const Xt={goggles:{what:"Chemical splash goggles: a polycarbonate lens in a soft frame that seals around the eyes, with covered vents that let air through but keep liquid out.",sci:"The cornea has no blood vessels and only a thin skin on top, so a chemical splash reaches living cells almost at once. A sealed barrier is the only real protection.",real:"Required in school and industrial labs, and worn by plumbers, cleaners, pool technicians and woodworkers.",how:"Tap them in your BAG at the workbench to put them on. Nothing can be poured until they are on.",safe:"Ordinary glasses leave gaps at the sides. If a chemical gets in your eye, rinse it with clean water for 15 minutes and get help.",fact:"The cornea has no blood vessels. It gets its oxygen straight from the air, which is why it is so clear and so easy to hurt.",},gloves:{what:"Thin disposable gloves made of nitrile, a synthetic rubber built from long chains of repeating molecules (a polymer).",sci:"Chemicals can slowly seep through any glove material. The time this takes is the breakthrough time, and strong acid on thin gloves can get through in minutes.",real:"Used by nurses, doctors, lab scientists, tattoo artists and food workers. Nitrile replaced latex because many people are allergic to latex.",how:"Tap them in your BAG at the workbench. They go on together with the goggles before you touch any chemical.",safe:"If acid lands on a glove, peel it off at once (turn it inside out) and wash your hands.",fact:"Lab gloves are often blue or purple because those colours are rare in food and skin, so a torn piece is easy to spot.",},water:{what:"Water with the dissolved minerals removed by distillation: boiling it and cooling the steam back into liquid. It is almost pure H₂O.",sci:"Water molecules are polar: slightly + at one end and slightly - at the other. That lets water pull acids and salts apart into ions and carry them around. It also has a high specific heat, so it soaks up a lot of heat for each degree it warms.",real:"Used in labs, car batteries, steam irons, medical equipment and aquariums, anywhere minerals would cause scale or ruin a reaction.",how:"Measure it in the small beaker, then pour into the main beaker. You need 3 parts, and it goes in first.",safe:"Always add ACID TO WATER, never water to acid. The big pool of water absorbs the heat so the mix cannot boil and spit.",fact:"Pure water barely conducts electricity. Tap water does, because its dissolved ions can carry a current.",},hcl:{what:"Hydrochloric acid: hydrogen chloride gas dissolved in water. It is a strong acid, so in water it splits almost completely into H⁺ and Cl⁻ ions.",sci:"Acidity is about H⁺ ions. Iron atoms hand electrons to H⁺ (Fe → Fe²⁺ + 2e⁻) and the H⁺ becomes H₂ gas. Memory trick: OIL RIG. Oxidation Is Loss of electrons, Reduction Is Gain.",real:"Used to \"pickle\" steel (strip rust before painting), clean concrete and bricks, control pool pH, and make PVC plastic and food additives.",how:"Measure 1 part in the small beaker, then pour it into the 3 parts of water. It attacks iron: Fe + 2HCl → FeCl₂ + H₂↑.",safe:"Burns skin and its fumes irritate the lungs. Use goggles, gloves and fresh air, and add it slowly to water.",fact:"Your stomach makes hydrochloric acid (pH 1.5 to 3.5) to digest food. A layer of mucus, constantly renewed, stops it digesting you.",},h2o2:{what:"Hydrogen peroxide: water (H₂O) with an extra oxygen atom. It is an oxidizer, meaning it readily takes electrons from other substances.",sci:"The extra oxygen sits on a weak O-O bond, so H₂O₂ gladly accepts electrons: H₂O₂ + 2H⁺ + 2e⁻ → 2H₂O. Iron that lost 2 electrons (Fe²⁺) can lose a third (Fe³⁺), so the metal keeps dissolving.",real:"The 3% brown-bottle antiseptic cleans cuts and disinfects surfaces. Stronger versions bleach hair and paper, and very strong ones power rocket engines.",how:"Measure 1 part in the small beaker and pour it in after the acid is stirred. It helps the acid eat metal much faster.",safe:"Strong peroxide burns skin white. With hydrochloric acid it can slowly make chlorine gas, so real labs use a fume hood.",fact:"Your cells make an enzyme called catalase that splits H₂O₂ into water and oxygen. The fizz on a cut is that oxygen.",},salt:{what:"Sodium chloride (NaCl), ordinary table salt: a crystal of sodium ions (Na⁺) and chloride ions (Cl⁻) held together by opposite electric charges.",sci:"In water the crystal falls apart into free ions. Chloride ions slip through the thin oxide skin that normally protects metal and start pits. Salty water also pulls water out of plant cells by osmosis: water moves through a membrane toward the side with more dissolved material.",real:"Seasons and preserves food, de-ices winter roads, softens water, and is a raw material for making chlorine and soap.",how:"Drop it straight into the main beaker last, after the peroxide. Then stir to dissolve it.",safe:"Harmless in small amounts, but chloride is why salty roads and sea air rust cars and bridges.",fact:"Salt dries out living cells by osmosis. That is why salting preserves food and why slugs shrivel in salt.",},rod:{what:"A solid rod of borosilicate glass, the same heat-resistant glass used for beakers and test tubes.",sci:"Borosilicate glass is mostly silica (SiO₂) with a little boron added. Silica does not react with most acids and hardly expands when heated, so the rod neither dissolves nor cracks.",real:"Used in every chemistry lab to stir solutions and to guide a liquid when pouring so it does not splash.",how:"Drop it into the main beaker to stir. Stir after the acid goes in and again after the salt.",safe:"Never stir acid with a metal spoon: the metal would dissolve and could react.",fact:"Borosilicate glass grows only about 3 parts per million for each degree of heating, so hot liquid does not crack it.",},strip:{what:"Paper soaked in indicator dyes: molecules that change colour when the amount of H⁺ around them changes.",sci:"pH = -log₁₀[H⁺]. Each step down the scale means 10 times more H⁺. pH 1 means 0.1 mol of H⁺ per litre, a million times more than pure water at pH 7.",real:"Used to test pool and aquarium water, soil for gardening, urine at the doctor, and food acidity in factories.",how:"Dip it into the main beaker once everything is stirred. Red means strongly acidic (pH 1 to 2).",safe:"Test with the strip, never by touching or tasting. A liquid at pH 1 burns skin.",fact:"Red cabbage juice works as a homemade indicator: its pigment turns pink in acid and green or yellow in a base.",},soda:{what:"Sodium bicarbonate (NaHCO₃), a weak base. It reacts with acids and releases carbon dioxide gas.",sci:"A base accepts H⁺. When acid meets base they cancel out (neutralization): HCO₃⁻ + H⁺ → H₂O + CO₂. With the H⁺ gone, the acid can no longer take electrons from metal.",real:"Makes cakes rise, settles an upset stomach, cleans ovens, and is kept in lab spill kits to neutralize acid spills.",how:"Not part of the solvent. It would cancel the acid: HCl + NaHCO₃ → NaCl + H₂O + CO₂.",safe:"Great for cleaning up a small acid spill, after the area is safe.",fact:"The \"volcano\" science project is baking soda plus vinegar (an acid) making CO₂ bubbles.",},sugar:{what:"Sucrose (C₁₂H₂₂O₁₁), made of glucose and fructose joined together. It dissolves easily but does not split into ions.",sci:"Sugar is a molecular compound. In water its molecules spread out but stay whole, so a sugar solution has no free ions: no H⁺ to attack iron and no charge carriers to conduct electricity.",real:"Sweetens food, preserves jam, feeds yeast to make bread rise, and is fermented into fuel ethanol.",how:"Not useful here. It does not react with the acid or the metal and would only dilute the mix.",safe:"Concentrated sulfuric acid can rip the water out of sugar and leave a column of black carbon.",fact:"Plants build sugar from sunlight, water and carbon dioxide (photosynthesis). Your body burns it back into CO₂ and water for energy.",},canister:{what:"A sealed steel pressure canister with a valve on top, built to hold and spray a liquid.",sci:"Pressure is force spread over an area. Gas squeezed into a small space pushes hard on every wall, and when the valve opens that stored pressure pushes the liquid out.",real:"Real pressurized canisters hold fire extinguisher foam, paint, cooking oil sprays and pepper spray, all pushed out by stored gas pressure.",how:"Put it on the CANISTER slot of the assembly mat at the workbench, then pour the 3 venom vials into it.",safe:"Pressurized containers must never be heated or punctured: they can burst.",fact:"Steel is iron with a little carbon added, which makes it much stronger than pure iron.",},vial:{what:"Small glass vials of snake venom: a mix of proteins and enzymes that attack blood, nerves or muscle.",sci:"Proteins are long chains of amino acids folded into precise shapes. Venom enzymes cut other proteins apart or jam nerve signals. Heat or strong acid unfolds a protein (denaturing) and ruins its shape.",real:"Scientists \"milk\" snakes to collect venom. It is used to make antivenom and to research medicines: the blood pressure drug captopril was inspired by viper venom.",how:"Pour all 3 into the Venom Canister on the assembly mat. Dead hatchlings also drop venom that refills your blaster.",safe:"Venom is dangerous if it gets into a cut or the eyes. Snake handlers wear gloves and face shields.",fact:"Antivenom is made by giving horses or sheep tiny doses of venom and collecting the antibodies their blood makes.",},barrel:{what:"A steel tube with a nozzle that shapes the spray when liquid is pushed through it.",sci:"Liquid cannot pile up, so the same amount per second must get through. Squeeze it through a narrower opening and it has to move faster (area × speed stays the same), so a narrow nozzle shoots farther.",real:"Nozzles shape the stream of garden hoses, fire hoses, paint sprayers and pressure washers.",how:"Put it on the BARREL slot of the assembly mat.",safe:"",fact:"Put your thumb over a garden hose and the water shoots farther. You made the opening smaller, so the water speeds up.",},handle:{what:"A grip with a trigger that opens a valve, letting the canister’s pressure push liquid out.",sci:"The trigger is a lever: it turns a small finger squeeze into the force needed to open the valve. Liquid then flows from high pressure inside the canister to low pressure outside.",real:"The same trigger-valve idea is used in spray bottles, fire extinguishers, fuel pumps and pressure washers.",how:"Put it on the HANDLE slot of the assembly mat.",safe:"",fact:"A spray bottle trigger is a tiny pump: each squeeze pushes a piston that forces liquid through the nozzle.",},fullcan:{what:"The Venom Canister filled with 3 vials of venom.",sci:"",real:"",how:"Keep it on the mat and add the handle and barrel to finish the weapon.",safe:"",fact:"",},blaster:{what:"Your home-built Venom Blaster: canister, barrel and handle working like a high-pressure sprayer.",sci:"Fluids always flow from high pressure to low pressure. Opening the valve lets the pressurized venom rush out, and the narrow barrel makes the jet fast and focused.",real:"It works like a fire extinguisher: pressure in the canister pushes the liquid out through the nozzle when the trigger opens the valve.",how:"SHOOT with F / K or the shoot button. Only 4 shots. Venom dropped by dead hatchlings adds 1 shot each.",safe:"",fact:"",},potion:{what:"Your eroding solvent: dilute hydrochloric acid, hydrogen peroxide and chloride in water.",sci:"Three jobs at once. H⁺ and H₂O₂ pull electrons off iron (oxidation), and Cl⁻ breaks through the protective oxide skin. Solid metal turns into dissolved ions: Fe → Fe²⁺ + 2e⁻.",real:"Real metal etchants work the same way: circuit-board makers etch copper with acid and an oxidizer, and steel is cleaned with acid baths.",how:"Stand at the barricade and press USE to pour it on.",safe:"",fact:"The bubbles while it works are hydrogen gas from the acid reacting with the iron. Hydrogen is flammable, so real etching needs good ventilation.",},};Xt.vial1=Xt.vial2=Xt.vial3=Xt.vial;const Qt=(t)=>
t.replace(/²⁺/g,"2+").replace(/³⁺/g,"3+").replace(/⁺/g,"+").replace(/⁻/g,"-").replace(/[₀-₉]/g,(c)=>c.charCodeAt(0)-8320).replace(/₂/g,"2").replace(/₃/g,"3").replace(/₁/g,"1").replace(/₀/g,"0").replace(/→/g,"->").replace(/↑/g,"(gas)").replace(/≈/g,"~");function Kt(t){return Qt((function(t){const a=items[t],e=Xt[t]||{},o=(t,a,e)=>
e?'<div class="isec '+t+'"><b>'+a+"</b><span>"+e+"</span></div>":"";return((a.card?'<div class="isec lore">'+a.card+"</div>":"")+
o("what","WHAT IT IS",e.what)+o("sci","THE SCIENCE",e.sci)+
o("real","REAL-WORLD USE",e.real)+
o("how","HOW TO USE IT",e.how||(a.card?"":a.why))+
o("safe","SAFETY",e.safe)+
o("fact","DID YOU KNOW?",e.fact));})(t),);}
const Zt=(t)=>inv.includes(t),_t=["canister","vial1","vial2","vial3","barrel","handle","fullcan","blaster"],ta=()=>
!hasGun&&
(Zt("canister")||Zt("fullcan"))&&
Zt("barrel")&&
Zt("handle")&&
(Zt("fullcan")||canFill+["vial1","vial2","vial3"].filter(Zt).length>=3),aa=()=>
["canister","vial1","vial2","vial3","barrel","handle"].filter((t)=>got.has(t)).length,ea=(t)=>void 0!==t.in&&!broken[room+t.in];function platforms(){const t=rooms[room],a=[];return(t.plats.forEach((t)=>t.gone||a.push(t)),t.crates.forEach((t,e)=>{broken[room+e]||a.push({x:t.x,y:80-(t.y2?12:0),w:t.w,crate:e});}),a);}
let ra=!1;function updateGuide(){if(tnIs(room))return void tnGuide();if(C2[room])return void c2Guide();qs("#gg h4 span").textContent="GUIDE";const a=qs("#ggb");let e=
"exitlab"===room?snakeBoss&&"dead"!==snakeBoss.st?"<b>Defeat the Mutant Snake!</b><br>Climb the shelves to get over it. Punch up close; the blaster has only 4 shots (hatchlings drop venom). Red circles show where it strikes!":"<b>It is down.</b><br>The exit door on the right is open. Go outside!":"outside"===room?"<b>You are outside.</b><br>Head right, to the door.":"hall"===room?ta()?"<b>You have every part.</b><br>Go back up to the MIXING BENCH (LAB).":"<b>A door marked STAFF ONLY.</b><br>Open it (E / USE).":"ware"===room?ta()?"<b>You have every part!</b><br>Carry them back up to the MIXING BENCH in the LAB.":"<b>Search the storage ("+
aa()+
"/6).</b><br>Open the HAZARDOUS crate, punch wooden crates, check the shelves.":"stair"===room?cine?"":bossOpen?"<b>The door is open.</b><br>Go right.":hasGun?"<b>Blast the sealed door!</b><br>Stand at the bottom and SHOOT (F / K).":ta()?"<b>Climb back up</b><br>to the MIXING BENCH in the LAB and build the weapon.":"<b>The EXIT LAB door is sealed.</b><br>Explore to the LEFT at the bottom of the stairs.":pourT>0||(erode>0&&!exitOpen)?"<b>Pouring the solvent…</b>":exitOpen&&hasGun&&!bossOpen?"<b>Venom Blaster ready!</b><br>Go back down the stairs and blast the sealed door.":exitOpen&&ta()?"<b>Build the weapon.</b><br>At the MIXING BENCH (LAB): canister on the mat, vials in, then handle and barrel.":exitOpen?"<b>THE FIRE EXIT IS OPEN!</b><br>Run to the right and get out of here.":0===stage?"<b>TRY TO GET OUT!</b><br>You can run, jump and punch."+
(ra?"":"<br>Arrows run · W jump · J punch · E use"):hasPotion?"<b>Solvent ready!</b><br>Pour it on the barricade (POD ROOM).":l.every((t)=>got.has(t))?"<b>All found!</b><br>Craft at the MIXING BENCH (LAB).":"<b>Find items ("+
l.filter((t)=>got.has(t)).length+
"/"+
l.length+
")</b><br>Tap for where to look.";a.innerHTML=e;}
window.__evoQt=Qt;window.__evoPlayer=()=>playerName;window.__evoInfo=(t)=>{const a=items[t];return a?{n:a.n,where:a.where||"",why:a.why||"",info:a.info||"",x:Xt[t]||{},icon:s(a.k,a.c)}:null;};function updateBag(){const a=inv.length;qs("#gi").innerHTML=a?'<button class="bagb" id="bagB"><img src="'+
s("bottle","#e8e060")+
'">BAG '+
a+
"</button>":"";const e=qs("#bagB");e&&
(e.onclick=()=>{modal||sa();});}
function sa(){modal=1;const a=qs("#gk");((a.innerHTML=
'<div class="gcard"><h3>YOUR BAG</h3><p style="font-size:7px;color:#b8c8e8">Tap an item to read how it works.</p><div id="bagG">'+
inv.map((t)=>
'<button class="bagi" data-id="'+
t+
'"><img src="'+
s(items[t].k,items[t].c)+
'"><span>'+
Qt(items[t].n)+
"</span></button>",).join("")+
'</div><div class="btns"><button class="gbtn" id="gkOk">CLOSE</button></div></div>'),(a.hidden=!1),(qs("#gkOk").onclick=()=>{((a.hidden=!0),(modal=0));}),a.querySelectorAll(".bagi").forEach((a)=>
(a.onclick=()=>
(function(a){modal=1;const e=items[a],o=qs("#gk");((o.innerHTML=
'<div class="gcard"><h3>'+
Qt(e.n)+
'</h3><div class="row"><img src="'+
s(e.k,e.c)+
'"><div>'+
(e.where?"<i>📍 "+e.where+"</i>":"")+
Kt(a)+
'</div></div><div class="btns"><button class="gbtn" id="gkOk">OK</button></div></div>'),(o.hidden=!1),(qs("#gkOk").onclick=()=>{((o.hidden=!0),(modal=0),sa());}));})(a.dataset.id)),));}
let ca=0;function ia(a){modal=1;const e=items[a],o=qs("#gk");((o.innerHTML=
'<div class="gcard"><h3>GOT: '+
Qt(e.n)+
'</h3><div class="row"><img src="'+
s(e.k,e.c)+
'"><div>'+
(e.decoy?"<i>Hmm, probably NOT useful for our solvent...</i>":"")+
Kt(a)+
'</div></div><div class="btns"><button class="gbtn" id="gkOk" disabled>READ... 3</button></div></div>'),(o.hidden=!1));let r=(Eo.nopop||window.__evoFast)?0:3;const n=qs("#gkOk");(clearInterval(ca),0===r&&((n.disabled=!1),(n.textContent="GOT IT")),(ca=setInterval(()=>{(r--,r>0?(n.textContent="READ... "+r):(clearInterval(ca),(n.disabled=!1),(n.textContent="GOT IT")));},1e3)),(n.onclick=()=>{n.disabled||((o.hidden=!0),(modal=0),evoAutosave());}));}
function fa(){modal=1;const a=qs("#gk");((a.innerHTML=
'<div class="gcard"><h3>GUIDE: how do we erode this?</h3><p>The exit is blocked by <b style="color:#6aff9a">vines</b> and <b style="color:#b8c8e8">metal plates</b>. Fists won’t cut it. Metal erodes when its atoms are <b style="color:#ffe070">oxidized</b>: they lose electrons and dissolve as ions (OIL RIG: Oxidation Is Loss). An acid plus an oxidizer does this fast, and salt helps by cracking the metal’s protective skin and drying out plant cells. Find these tools and chemicals in the lab rooms, then craft an <b style="color:#ffe070">eroding solvent</b> at the mixing bench:</p>'+
l.map((t)=>
'<div class="row"><img src="'+
s(items[t].k,items[t].c)+
'"><div><b>'+
Qt(items[t].n)+
"</b><i>📍 "+
items[t].where+
"</i><span>"+
Qt(items[t].why)+
'</span><span style="color:#8fb8ff;margin-top:3px">'+
Qt(items[t].info)+
"</span></div></div>",).join("")+
'<p class="warn">Not everything you find is useful: a base such as baking soda cancels an acid (neutralization). There is no recipe card, so read what each item does. The order and the amounts matter. Game chemistry is simplified. Real acids need trained handling, goggles, gloves and ventilation. Don’t try this at home.</p><div class="btns"><button class="gbtn" id="gkOk">GOT IT</button></div></div>'),(a.hidden=!1),(qs("#gkOk").onclick=()=>{((a.hidden=!0),(modal=0),(stage=Math.max(stage,1)),(Tt=!0),updateGuide());}));}
let ha=null;function da(t){const a=384;for(let e=0;e<104;e++)
for(let o=0;o<a;o++){const a=(e/12)|0,n=8*(1&a),l=(o+n)%16,s=e%12,c=r(31*(((o+n)/16)|0)+7*a,1);let i=Ct([58,88,82],[36,60,56],0.7*c);const f=It(o/22,e/16,3);((i=Ct(i,[16,28,24],Rt(1.8*(f-0.42)))),(i=Ct(i,[24,26,16],0.6*Rt((e/104)*0.55+0.8*(It(o/9,e/30,5)-0.5)))),c>0.94?(i=Ct([10,14,12],[26,22,16],It(o/3,e/3,9))):0===l||0===s?((i=[12,20,18]),It(o/4,e/4,7)>0.5+0.1*Et(o,e)&&
(i=It(o/3,e/3,8)>0.6?[70,140,60]:[38,90,40])):1===s||1===l?(i=Ct(i,[170,200,190],0.12)):(11!==s&&15!==l)||(i=Ct(i,[0,0,0],0.18)),t.px(o,e,i));}
for(let e=0;e<14;e++){const o=r(e,2)*a,n=8+30*r(e,3),l=30+60*r(e,4);for(let a=n;a<Math.min(104,n+l);a++){const r=1+((a-n)/l)*2;for(let s=0;s<r;s++)
t.px(o+s+0.6*Math.sin(0.1*a+e),a,[70,46,22],0.28*(1-(a-n)/l));}}
([[60,10,70,30,64,44],[180,60,188,74,184,90],[262,88,270,96,268,104],[20,70,28,80,22,92],].forEach((a)=>{(t.line(a[0],a[1],a[2],a[3],[8,10,8],0.9),t.line(a[2],a[3],a[4],a[5],[8,10,8],0.9));}),[[2,5],[9,4],].forEach(([e,o],r)=>{for(let n=0;n<a;n++)
for(let a=0;a<o;a++){const l=It(n/7,(e+a)/3,40+r);let s=0===a?[150,140,120]:a===o-1?[30,26,22]:[96,88,76];(l>0.55&&(s=Ct(s,l>0.66?[170,86,34]:[110,54,24],0.8)),t.px(n,e+a,s));}
for(let n=30+50*r;n<a;n+=96)
(t.rect(n,e-1,4,o+2,[60,52,44]),t.rect(n,e-1,4,1,[150,140,120]));}),xe(t,10,52,134,5,"#3a3228","#8a7658","#120e0a"),[[16],[134]].forEach(([a])=>{(t.rect(a,57,3,8,"#2a241c"),t.rect(a,57,1,8,"#5a4c3a"));}),Ee(t,16,52,7,7,15),Ee(t,74,52,2,11,9),[[18,40],[34,38],[58,41],[76,44],].forEach(([a,e],o)=>{(t.line(a,e,a+2,e+4,[255,255,255]),t.line(a+2,e+4,a+1,e+8,[255,255,255]),t.px(a+3,e+5,[200,230,245]));}),t.rect(42,28,6,8,[34,40,36]),t.line(42,36,44,33,[220,240,250]),t.line(44,33,46,36,[220,240,250]));for(let a=14;a<84;a++)
for(let e=26;e<52;e++)Et(a,e)<0.12&&t.px(a,e,[170,160,130],0.35);xe(t,94,42,26,10,"#8a7048","#c8a870","#3a2c18");for(let a=0;a<4;a++)
(t.rect(97+6*a,34,4,12,[12,16,20]),t.rect(98+6*a,35,2,10,[200,232,255]),t.rect(98+6*a,41,2,4,[[230,106,90],[90,232,138],[90,168,232],[232,216,90],][a],));(xe(t,124,42,14,10,"#8a5a3a","#b87a4a","#3a2416"),Fa(t,131,38,6,4),Fa(t,127,34,4,9),Fa(t,135,33,4,13),Ga(t,10,47,134,7,11));for(let a=0;a<8;a++)
t.line(10+4*a,57,10+6*a,70+(a%3)*4,[200,210,200],0.18);xe(t,240,14,124,70,"#5a4630","#8a7050","#1e160c");for(let a=19;a<82;a+=6)
for(let e=244;e<362;e+=6)
(t.px(e,a,[30,22,12]),t.px(e+1,a,[110,90,64],0.4));for(let a=14;a<84;a++)
for(let e=240;e<364;e++)It(e/9,a/7,51)>0.58&&t.px(e,a,[40,30,18],0.45);(t.rect(252,22,2,4,"#6a7478"),t.line(253,26,249,50,"#aab4b8"),t.line(254,26,250,50,"#6a7478"),t.line(253,26,257,50,"#aab4b8"),t.line(268,43,276,28,"#c8d0d4"),t.line(272,43,264,28,"#c8d0d4"),t.disc(266,46,3,(t,a)=>(t*t+a*a>4?[200,68,42]:null)),t.disc(274,46,3,(t,a)=>(t*t+a*a>4?[200,68,42]:null)),t.rect(286,24,3,22,"#e8eef0"),t.rect(286,24,3,5,"#3a8aff"),t.rect(287,46,1,6,"#cfe8ff"),xe(t,350,90,16,11,"#d8d4c8","#ffffff","#8a8478"),t.rect(354,93,2,3,"#2a2a2a"),t.rect(360,93,2,3,"#2a2a2a"),t.sag(358,101,374,134,6,[18,20,22]),ve(t,-4,6,130,14,16,3,2),ve(t,120,4,250,10,12,5,2),ve(t,236,8,388,16,14,7,2,[255,226,110]),ve(t,240,20,300,80,-10,11,2),ve(t,360,14,330,84,8,13,2),[[6,70],[14,50],[26,82],[52,30],[84,44],[110,28],[150,52],[168,38],[232,90],[246,60],[298,38],[322,70],[346,30],[366,92],[378,56],].forEach(([a,e],o)=>
Ba(t,a,6,e,3*o+2,o%4==0?[255,134,208]:o%5==0?[255,226,110]:null),),[[0,6,9],[18,4,7],[128,8,7],[226,6,8],[372,8,10],[384,30,8],].forEach(([a,e,o],r)=>Fa(t,a,e,o,5*r+21)),Ga(t,0,94,a,10,31),Ga(t,0,0,40,20,32),Ga(t,344,0,40,24,33),t.rect(0,96,a,6,[34,40,36]),t.rect(0,96,a,1,[90,100,92]),t.rect(0,101,a,1,[8,10,8]),Ga(t,0,92,a,6,61));for(let e=102;e<200;e++)
for(let o=0;o<a;o++){let n=Ct([118,122,116],[70,74,70],((e-102)/98)*0.8);n=Ct(n,[150,154,146],0.12*(r(7*e,(o/60)|0)-0.5)+0.06);const l=(o-192)/150,s=(e-150)/34,c=Math.max(0,1-l*l-s*s);c>0.6*Et(o,e)&&(n=Ct(n,[214,212,196],0.35*c));const i=Math.min(o,a-o,3*(200-e)),f=It(o/9,e/5,21);(i<40&&f>0.5+i/90?(n=Ct(n,f>0.64?[176,96,40]:[120,62,28],0.75)):f>0.72&&(n=Ct(n,[128,92,56],0.25)),t.px(o,e,n));}
for(let e=0;e<26;e++){const o=r(e,141)*a,n=106+90*r(e,142),l=6+18*r(e,143);t.line(o,n,o+l,n+2*r(e,144)-1,[200,204,196],0.35);}
[[246,140,9],[60,124,6],[300,186,7],].forEach(([a,e,o])=>{for(let r=0;r<6.28;r+=0.06)
t.px(a+Math.cos(r)*o,e+Math.sin(r)*o*0.35,[110,80,40],0.3);});for(let a=0;a<9;a++){const e=6+46*a;(t.disc(e,198,1,[70,72,66]),t.px(e-1,197,[200,200,190]));}
(t.rect(0,199,a,2,[196,198,188]),t.rect(0,201,a,1,[140,142,134]));for(let e=202;e<216;e++)
for(let o=0;o<a;o++){let a=Ct([84,86,80],[34,36,32],(e-202)/14);const r=It(o/8,e/4,71);(r>0.56&&(a=Ct(a,r>0.66?[160,84,34]:[104,52,24],0.7)),t.px(o,e,a));}
for(let e=0;e<14;e++){const o=r(e,151)*a,n=3+7*r(e,152);t.line(o,202,o,202+n,[140,70,30],0.6);}
const e=(a,e,o,r,n)=>{for(let l=-r;l<=r;l++)
for(let s=-o;s<=o;s++){const c=(s*s)/(o*o)+(l*l)/(r*r);c<1&&Et(a+s,e+l)<(1-c)*n&&t.px(a+s,e+l,[10,12,10],0.7);}};(e(358,172,22,4,0.85),xe(t,338,160,40,10,"#8a6a44","#c8a070","#3a2a18"),xe(t,340,150,36,3,"#8a6a44","#c8a070","#3a2a18"),[[342,"#e86a5a"],[350,"#5ae88a"],[358,"#5aa8e8"],[366,"#e8d85a"],[372,"#c85ae8"],].forEach(([a,e],o)=>{(t.rect(a,134,5,30,[20,26,30]),t.rect(a+1,135,3,28,[200,230,245]),t.rect(a+1,148+(o%2)*2,3,15-(o%2)*2,e),t.rect(a+1,135,1,27,[255,255,255]),t.rect(a,134,5,1,[240,250,255]));}),[[350,141],[366,138],].forEach(([a,e])=>{(t.line(a+1,e,a+3,e+4,[255,255,255]),t.line(a+3,e+4,a+2,e+8,[255,255,255]),t.line(a+3,e+4,a+4,e+6,[230,245,255]),t.px(a+2,e+8,[150,170,180]));}),t.rect(372,134,2,1,[20,26,30]),t.px(374,135,[255,255,255]),t.px(373,133,[200,230,245]),t.rect(367,163,1,3,[232,216,90]),t.disc(368,169,2,(t,a)=>(Math.abs(a)<1.2?[232,216,90,0.8]:null)),t.px(367,168,[255,250,200]),[[150,176,0],[214,172,1],[246,124,2],[86,190,1],].forEach(([a,o,r])=>{const n=[[90,138,42],[138,122,42],[168,90,42],][r];(e(a+1,o+2,3,1,0.5),t.disc(a,o,2,(t,a)=>(Math.abs(a)<=1?n:null)),t.line(a-2,o,a+2,o,Ct(n,[0,0,0],0.3)));}));for(let e=0;e<a;e+=2){if(e>34&&e<350)continue;const a=14*r(e,125);a>1&&
t.line(e,216,e+3*(r(e,7)-0.5),216-a,r(e,126)<0.5?[38,90,40]:[70,140,60],);}
(Ga(t,0,198,40,10,51),Ga(t,346,198,38,10,52),Da(t,8,216,22,3,[20,90,50],[120,220,100]),Da(t,378,216,20,5,[20,90,50],[120,220,100]),Oe(t,20,200,3),Oe(t,366,200,8),t.light(192,22,190,"#fff0c8",0.55,0.85),t.light(192,150,90,"#fff4d8",0.18,0.35),t.light(60,40,80,"#9affc0",0.25),t.light(330,60,90,"#9affc0",0.2),t.fog(0,60,a,112,"#c8e8d0",0.45,9,40,8,0.12),t.vig(0.4));}
let ba=null,ga=[],pa=null,ua={h:0,b:0,c:0},ma="",ya="",xa=0,wa=null,va=null,ka=null,Ea=0,Ta=-1e4;const Sa=(t)=>ga.filter((a)=>a===t).length,Ca={water:"#5fb8ff",hcl:"#e8e060",h2o2:"#c9a86a",salt:"#f4f4ff"},Ra=["water","hcl","h2o2"],Pa=["vial1","vial2","vial3"],Ia={handle:"sh",barrel:"sb",canister:"sc",fullcan:"sc"},Oa={handle:"h",barrel:"b",canister:"c",fullcan:"c"},La=()=>
(!hasGun&&(Zt("canister")||Zt("fullcan")||Zt("barrel")||Zt("handle")||Pa.some(Zt)))||
performance.now()-Ta<4e3;const isPhone=()=>{try{return"#phone"===location.hash||/iPhone|iPod|Android.*Mobile|Windows Phone|IEMobile|Opera Mini/i.test(navigator.userAgent)||(matchMedia("(pointer:coarse)").matches&&Math.min(screen.width,screen.height)<=500);}catch(e){return!1;}};const benchSimple=()=>{try{const v=localStorage.getItem("evoquest_bench_mode");if("simple"===v)return!0;if("advanced"===v)return!1;}catch(e){}return isPhone();};function benchAdvBtn(){const b=qs("#fpAdv");if(!b)return;b.innerHTML="TOGGLE ADVANCED MODE<small>NOW: "+(benchSimple()?"SIMPLE":"ADVANCED")+"</small>";b.setAttribute("aria-pressed",benchSimple()?"false":"true");b.onclick=()=>{const s=!benchSimple();try{localStorage.setItem("evoquest_bench_mode",s?"simple":"advanced");}catch(e){}pa=null;wa=null;qs("#gx").classList.toggle("ph",s);qs("#cinv").hidden=!s;benchAdvBtn();$sx("click");Ya(s?"<b>Simple mode.</b> Tap an item to use it. Same chemistry, same order, no measuring beaker.":"<b>Advanced mode.</b> Open your <b>BAG</b> and drag things onto the table. Liquids are measured in the <b>small beaker</b> first, then poured into the big one.","");};}function phoneTap(ev){const bt=ev.target.closest("[data-id]");if(!bt||!qs("#gx").classList.contains("ph"))return;const id=bt.dataset.id;if(Ia[id]||Pa.includes(id))return void window.__benchDrop(id,Ia[id]||"sc");(worn&&gloved&&$sx(Ra.includes(id)?"pour":["salt","sugar","soda"].includes(id)?"poof":"strip"===id||"rod"===id?"blip":"click"),ja(id));}function openBench(){((modal=2),(ga=[]),(pa=null),(Ea=0),(wa=null),(b=g=!1),(qs("#gx").hidden=!1),qs("#gx").classList.toggle("ph",benchSimple()),(qs("#cinv").hidden=!benchSimple()),benchAdvBtn(),(qs("#cdone").textContent="CLOSE"),Ya(benchSimple()?("<b>Workbench.</b> Tap an item to use it. Safety gear first: tap your goggles and gloves. The order and the amounts matter."+(La()?" Tap the weapon parts to put them on the assembly mat, then tap the venom vials.":"")):("<b>Workbench.</b> Open your <b>BAG</b> and drag things onto the table. Liquids must be measured in the <b>small beaker</b> first, then poured into the big one. Safety gear first: tap your goggles and gloves."+
(La()?" Weapon parts go on the <b>assembly mat</b>.":"")),"",),cancelAnimationFrame(xa),(xa=requestAnimationFrame(Za)));}
function Na(){(evoAutosave(),(qs("#gx").hidden=!0),(modal=0),(ga=[]),(pa=null),(b=g=!1),cancelAnimationFrame(xa),(ka=null),(qs("#fpGhost").hidden=!0),updateBag(),updateGuide(),updateHud());}
function Ya(a,e){((ma=a),(ya=e||""),"bad"===e?$sx("locked"):"good"===e&&$sx("click"));const o=inv.filter((t)=>"potion"!==t&&"blaster"!==t);qs("#cinv").innerHTML=
o.map((t)=>
'<button data-id="'+
t+
'" class="'+
(("goggles"===t&&worn)||("gloves"===t&&gloved)?"worn":(qs("#gx").classList.contains("ph")&&"water"!==t&&ga.includes(t)?"in":""))+
'"><img draggable="false" src="'+
s(items[t].k,items[t].c)+
'"><span>'+
((t)=>
"goggles"===t?worn?"GOGGLES ✔":"GOGGLES (tap)":"gloves"===t?gloved?"GLOVES ✔":"GLOVES (tap)":items[t].n.split(" (")[0])(t)+
"</span></button>",).join("")||"<p>Your bag is empty.</p>";const r=(t,a)=>
'<span class="chip'+(a?" on":"")+'">'+(a?"✔ ":"")+t+"</span>";qs("#cst").innerHTML=
r("Goggles",worn)+
r("Gloves",gloved)+
'<span class="chip">Beaker '+
ga.length+
"/6</span>"+
r("Stirred",b)+
r("Tested",g)+
(La()&&!hasGun?'<br><span class="chip'+
(canFill>=3?" on":"")+
'">Venom '+
canFill+
"/3</span>"+
r("Handle",ua.h)+
r("Barrel",ua.b):"");const n=qs("#cmsg");((n.className=e||""),(n.innerHTML=Qt(a)),(qs("#cmix").disabled=!(3===Sa("water")&&
1===Sa("hcl")&&
1===Sa("h2o2")&&
1===Sa("salt")&&
b&&
g)));const l=La();(["zTray","zH","zC","zB"].forEach((a)=>(qs("#"+a).style.display=l?"":"none")),(qs("#fpBag").innerHTML=
'<img draggable="false" src="'+s("bottle","#e8e060")+'">BAG '+o.length));}
function Va(t,a){wa={k:t,c:a,t0:performance.now()};$sx({fill:"pour",pour:"pour",sprinkle:"poof",stir:"blip",strip:"blip",click:"clank",venom:"hiss"}[t]||"click");}
function ja(t){const a=(t)=>Ya(t,"bad"),e=(t)=>Ya(t,"good");if("goggles"===t)
return((worn=!worn),e(worn?"Goggles on. Eyes protected.":"Goggles off. Put them back on before touching anything.",));if("gloves"===t)
return((gloved=!gloved),e(gloved?"Gloves on. Skin protected.":"Gloves off."));if(!worn||!gloved)
return a("STOP! "+
(worn?"":"<b>Goggles</b> ")+
(worn||gloved?"":"and ")+
(gloved?"":"<b>gloves</b> ")+
"first. Acid and peroxide can burn skin and blind you.",);if("soda"===t)
return a("Baking soda is a <b>base</b>. It accepts the H⁺ from the acid (neutralization): HCl + NaHCO₃ → NaCl + H₂O + CO₂ (the fizz). It would cancel the acid you need. Keep it out.",);if("sugar"===t)
return a("Sugar dissolves, but its molecules stay whole: no ions, no H⁺, nothing to take electrons from iron. It would only dilute the mix.",);if("rod"===t){if(!ga.length)return a("Nothing to stir yet.");if(b)return a("Already mixed. Stirring again won’t change anything until you add something.");b=!0;const t=Sa("hcl")>0;return e(Sa("salt")>0?"Stirring dissolves the salt into free Na⁺ and Cl⁻ ions. Small chloride ions are what slip through the oxide skin on metal.":t?"Stirring spreads the heat released by the acid and the H⁺ ions evenly, so there are no hot spots. Glass is used because it does not react with acid.":"Stirred. Everything is evenly mixed.",);}
return"strip"===t?Sa("hcl")?b?((g=!0),e("The strip turns <b>red: pH ≈ 1</b>. pH = -log₁₀[H⁺], so this mix has about a million times more H⁺ than pure water (pH 7). Strong enough to oxidize iron, weak enough to handle with gear."+
(Sa("h2o2")&&Sa("salt")?"":"<br>(You’re not finished yet. Test again after adding the rest.)"),)):a("Stir first. An unmixed beaker gives a misleading reading."):a("The strip would only read pH 7 (neutral water). Test after the acid is in."):ga.length>=6?a("The beaker is full."):"water"===t?Sa("hcl")?a("<b>Never add water to acid.</b> Dissolving acid releases heat, and a little water on strong acid can boil and spit. The rule is ACID INTO WATER. Pour the water first.",):Sa("water")>=3?a("3 parts of water is the right dilution. More would leave too few H⁺ ions to dissolve metal.",):(ga.push("water"),(b=g=!1),e("Distilled water, part "+
Sa("water")+
" of 3. It is the solvent that will soak up the heat when the acid goes in.",)):"hcl"===t?Sa("water")<3?a("Dilute first. Acid dissolving in water releases heat (it is exothermic), so you want 3 parts water ready to absorb it. Fill to the 3 mark.",):Sa("hcl")?a("One part acid is plenty. Any more would get hotter and give off more fumes."):(ga.push("hcl"),(b=g=!1),e("Acid goes <b>into</b> the water. HCl splits into H⁺ and Cl⁻ ions. The H⁺ takes electrons from iron (oxidation): <b>Fe + 2HCl → FeCl₂ + H₂↑</b>. Stir it in.",)):"h2o2"===t?Sa("hcl")?b?Sa("h2o2")?a("One part is enough."):(ga.push("h2o2"),(b=g=!1),e("Peroxide is an <b>oxidizer</b>: it takes electrons from metal atoms (H₂O₂ + 2H⁺ + 2e⁻ → 2H₂O), so the acid bites deeper and faster. (Real labs use a fume hood, because HCl + H₂O₂ can slowly make chlorine gas.)",)):a("Stir the acid in first. Adding the oxidizer to an unmixed, hot pocket of acid is how accidents happen.",):a("Peroxide in plain water does nothing to metal. An oxidizer needs the acid’s H⁺ to work. Add the acid first.",):"salt"===t?Sa("h2o2")?Sa("salt")?a("One pinch is enough."):(ga.push("salt"),(b=g=!1),e("Salt adds extra <b>chloride ions (Cl⁻)</b> that slip through the metal’s oxide skin, and pulls water out of plant cells by <b>osmosis</b> so the vines wilt. Stir to dissolve it, then test the pH.",)):a("Salt goes in last, into the finished acid-and-oxidizer mix, so it dissolves fully into chloride ions.",):void 0;}
function Xa(){return(!(!worn||!gloved)||
(Ya("STOP! "+
(worn?"":"<b>Goggles</b> ")+
(worn||gloved?"":"and ")+
(gloved?"":"<b>gloves</b> ")+
"first. Tap them in your BAG to put them on.","bad",),!1));}
function Qa(){return(!!(ua.h&&ua.b&&ua.c)&&
(Zt("fullcan")?(["fullcan","barrel","handle"].forEach((t)=>{const a=inv.indexOf(t);a>=0&&inv.splice(a,1);}),inv.push("blaster"),got.add("blaster"),(hasGun=!0),(ammo=4),(ua={h:0,b:0,c:0}),(Ta=performance.now()),Ya("<b>VENOM BLASTER ASSEMBLED!</b> The canister locks onto the barrel and the handle clicks in. It only holds <b>4 shots</b>. SHOOT with F / K or the shoot button. Take it down to the sealed door.","good",),updateHud(),updateGuide(),!0):(Ya("Handle and barrel are in place, but the canister is not full. Drop the <b>3 venom vials</b> into it ("+
canFill+
"/3).","",),!0)));}
function Ka(t,a,e,o,n,l,s){const c=(t,a)=>r(13*n+t,a),i=[],f=(t,a,e,o,r,n)=>{for(let l=0;l<r;l++){const s=l/r;i.push([t+(e-t)*s+1.4*(c(l,n)-0.5),a+(o-a)*s+1.4*(c(l,n+1)-0.5),]);}};(f(-a/2,-e/2,a/2,-e/2,6,1),f(a/2,-e/2,a/2,e/2,6,3),f(a/2,e/2,-a/2,e/2,6,5),f(-a/2,e/2,-a/2,-e/2,6,7),s&&(i[18]=[i[18][0]+3,i[18][1]-3]));const h=()=>{(t.beginPath(),i.forEach((a,e)=>(e?t.lineTo(a[0],a[1]):t.moveTo(a[0],a[1]))),t.closePath());};(t.save(),t.translate(1.5,2),h(),(t.fillStyle="rgba(0,0,0,.42)"),t.fill(),t.restore(),h());const d=St(o),b=t.createLinearGradient(-a/2,-e/2,a/2,e/2);(b.addColorStop(0,"rgb("+d.map((t)=>Math.min(255,t+14)).join(",")+")"),b.addColorStop(1,"rgb("+d.map((t)=>(0.74*t)|0).join(",")+")"),(t.fillStyle=b),t.fill(),t.save(),h(),t.clip(),l&&l());for(let o=0;o<4;o++){const r=(c(o,21)-0.5)*a,n=-e/2,l=(c(o,22)-0.5)*a,s=e/2,i=(r+l)/2+6*(c(o,23)-0.5);((t.lineWidth=0.7),(t.strokeStyle="rgba(60,40,20,.32)"),t.beginPath(),t.moveTo(r,n),t.lineTo(i,0),t.lineTo(l,s),t.stroke(),(t.strokeStyle="rgba(255,255,245,.45)"),t.beginPath(),t.moveTo(r+0.8,n),t.lineTo(i+0.8,0),t.lineTo(l+0.8,s),t.stroke());}
((t.fillStyle="rgba(120,80,30,.28)"),t.beginPath(),t.ellipse((c(1,31)-0.5)*a*0.6,(c(1,32)-0.5)*e*0.6,0.28*a,0.2*e,0.4,0,7),t.fill(),(t.strokeStyle="rgba(110,70,30,.4)"),(t.lineWidth=0.6),t.beginPath(),t.ellipse((c(2,31)-0.5)*a*0.5,(c(2,32)-0.2)*e*0.6,0.18*a,0.12*e,0,0,7),t.stroke(),(t.fillStyle="rgba(90,60,30,.35)"),t.fillRect((c(3,31)-0.5)*a*0.6,-e/2,1.4,0.6*e));for(let o=0;o<8;o++)
((t.fillStyle="rgba(60,100,50,.7)"),t.fillRect(a/2-4+3*c(o,41),e/2-5+4*c(o,42),1,1));if((t.restore(),s)){const a=i[18];((t.fillStyle="rgba(0,0,0,.25)"),t.beginPath(),t.moveTo(a[0],a[1]),t.lineTo(a[0]-6,a[1]),t.lineTo(a[0],a[1]-6),t.closePath(),t.fill(),(t.fillStyle="#d8cca8"),t.beginPath(),t.moveTo(a[0]-5,a[1]+1),t.lineTo(a[0]+1,a[1]+1),t.lineTo(a[0]+1,a[1]-5),t.closePath(),t.fill());}}
function Za(){qs("#gx").hidden||
((function(a){const e=qs("#fpc").getContext("2d");e.imageSmoothingEnabled=!1;const o=(t,a,o,r,n)=>{((e.fillStyle=t),e.fillRect(Math.round(a),Math.round(o),Math.round(r),Math.round(n)));},n=(t,a)=>{((e.fillStyle=t),e.beginPath(),a.forEach((t,a)=>(a?e.lineTo(t[0],t[1]):e.moveTo(t[0],t[1]))),e.closePath(),e.fill());},l=(t,a,o,r,n)=>{const l=i(t,a);l.complete&&e.drawImage(l,o,r,n,n);},s=(t,a,o,r,n,l)=>{((e.font=(n||4)+'px "Press Start 2P"'),(e.textBaseline="top"),(e.fillStyle=r));const s=e.measureText(t).width;return(e.fillText(t,"c"===l?a-s/2:a,o),s);},c=(t,a,r,n)=>{e.font='4px "Press Start 2P"';const l=e.measureText(t).width;(o("rgba(4,10,14,.82)",a-l/2-3,r-1,l+6,8),o(n,a-l/2-3,r-1,l+6,1),s(t,a,r+0.5,n,4,"c"));};(ha||(ha=Ae(da)),e.drawImage(ha,0,0));{const t=218,a=44,r=9,n=new Date(),l=(((n.getHours()%12)+n.getMinutes()/60)/12)*6.283,s=(n.getMinutes()/60)*6.283,c=((n.getSeconds()+n.getMilliseconds()/1e3)/60)*6.283;((e.fillStyle="#0a1014"),e.beginPath(),e.arc(t,a,r+1.5,0,7),e.fill(),(e.fillStyle="#d8d2c0"),e.beginPath(),e.arc(t,a,r,0,7),e.fill(),(e.fillStyle="rgba(90,70,30,.25)"),e.beginPath(),e.arc(t+2,a+2,r-2,0,7),e.fill(),o("#2a6a30",t-r-1,a-3,3,6),o("#4a9a3a",t-r,a-4,2,2));for(let e=0;e<12;e++)
o("#3a3a3a",t+Math.sin((e/12)*6.283)*(r-2)-0.5,a-Math.cos((e/12)*6.283)*(r-2)-0.5,1,1,);((e.lineWidth=1.4),(e.strokeStyle="#14141a"),e.beginPath(),e.moveTo(t,a),e.lineTo(t+4.5*Math.sin(l),a-4.5*Math.cos(l)),e.stroke(),(e.lineWidth=1),e.beginPath(),e.moveTo(t,a),e.lineTo(t+7*Math.sin(s),a-7*Math.cos(s)),e.stroke(),(e.strokeStyle="#c83a2a"),(e.lineWidth=0.6),e.beginPath(),e.moveTo(t,a),e.lineTo(t+7.5*Math.sin(c),a-7.5*Math.cos(c)),e.stroke(),o("#14141a",t-1,a-1,2,2));}
((function(t,a){const e=(a,e,o,r,n)=>{((t.font=n+'px "Press Start 2P"'),(t.textBaseline="top"),(t.fillStyle=r),t.fillText(a,e,o));};(t.save(),t.translate(312,40),t.rotate(0.22+0.015*Math.sin(a/2100)),Ka(t,26,34,"#e8e0c0",3,()=>{((t.fillStyle="#6a5a3a"),t.fillRect(-5,-18,10,4));for(let a=0;a<6;a++)
((t.fillStyle=a<3?"#3aa85a":"#8a8470"),t.fillRect(-10,5*a-11,3,3),(t.fillStyle="#8a8470"),t.fillRect(-5,5*a-10,13+(a%2)*3,1));},1,),(t.fillStyle="#c8442a"),t.fillRect(-1.5,-19,3,3),(t.fillStyle="#ffb0a0"),t.fillRect(-1,-19,1,1),t.restore(),t.save(),t.translate(350,38),t.rotate(0.04*Math.sin(a/1700+1)-0.42),Ka(t,24,19,"#f0d448",5,()=>{(e("ACID",-10,-7,"#2a2410",3.4),e("INTO",-10,-2,"#2a2410",3.4),e("WATER!",-10,3,"#c8242a",3.4));},1,),t.restore(),t.save(),t.translate(337,51),t.rotate(0.62+0.06*Math.sin(a/1300)),t.translate(12,15),Ka(t,25,30,"#2a7ae8",7,()=>{((t.fillStyle="#e8f2ff"),t.fillRect(-10,-12,20,18),(t.fillStyle="#14202a"),t.beginPath(),t.ellipse(-4,-3,3.4,2.6,0,0,7),t.ellipse(4,-3,3.4,2.6,0,0,7),t.fill(),(t.fillStyle="#7fe8ff"),t.fillRect(-6,-4,3,2),t.fillRect(2,-4,3,2),e("WEAR",-9,8,"#e8f2ff",3.2));},0,),t.restore(),(t.fillStyle="#c8c8cc"),t.fillRect(336,50,2,2),(t.fillStyle="rgba(30,22,12,.5)"),t.fillRect(352,48,8,8),(t.fillStyle="rgba(30,22,12,.35)"),t.fillRect(302,60,18,4));})(e,a),(function(t,a){((t.fillStyle="rgba(40,22,10,.85)"),t.beginPath(),t.moveTo(300,124),t.bezierCurveTo(296,114,318,112,330,118),t.bezierCurveTo(344,122,348,132,336,136),t.bezierCurveTo(328,140,318,134,312,138),t.bezierCurveTo(302,142,298,132,300,124),t.fill(),(t.fillStyle="rgba(70,40,18,.9)"),t.beginPath(),t.ellipse(318,126,12,5,0.1,0,7),t.fill(),(t.fillStyle="rgba(255,230,190,.35)"),t.fillRect(310,123,7,1),t.fillRect(330,128,4,1),(t.strokeStyle="rgba(30,16,6,.8)"),(t.lineWidth=1.4),t.beginPath(),t.moveTo(336,136),t.quadraticCurveTo(342,160,348,199),t.stroke());const e=(a%2400)/2400;((t.fillStyle="rgba(60,32,12,.9)"),e<0.8&&t.fillRect(347.5,140+(e/0.8)*58,1.4,2),(t.fillStyle="rgba(40,22,10,.7)"),t.beginPath(),t.ellipse(349,200.5,4,1.2,0,0,7),t.fill(),t.save(),t.translate(330,121),t.rotate(1.35),(t.fillStyle="rgba(0,0,0,.35)"),t.fillRect(-7,-6,16,14));const o=t.createLinearGradient(-8,0,8,0);(o.addColorStop(0,"#7a2418"),o.addColorStop(0.35,"#e8705a"),o.addColorStop(1,"#8a2a1e"),(t.fillStyle=o),t.beginPath(),t.moveTo(-8,-7),t.lineTo(8,-7),t.lineTo(8,4),t.lineTo(4,8),t.lineTo(1,5),t.lineTo(-2,9),t.lineTo(-8,7),t.closePath(),t.fill(),(t.fillStyle="#2a140c"),t.beginPath(),t.ellipse(0,-7,8,2,0,0,7),t.fill(),(t.fillStyle="#f0a090"),t.fillRect(-8,-7.5,16,1),(t.strokeStyle="#f8d0c4"),(t.lineWidth=0.6),t.beginPath(),t.moveTo(-3,-5),t.lineTo(-1,0),t.lineTo(-4,4),t.stroke(),(t.fillStyle="#f4f0e8"),t.fillRect(-4,-3,7,5),(t.font='2.5px "Press Start 2P"'),(t.textBaseline="top"),(t.fillStyle="#c84a3a"),t.fillText("EVO",-3.6,-1.8),t.restore(),[[340,134,0.4],[306,138,-0.6],[322,140,1.2],].forEach(([a,e,o],r)=>{(t.save(),t.translate(a,e),t.rotate(o),(t.fillStyle="rgba(0,0,0,.35)"),t.fillRect(-2,0,6,2),(t.fillStyle=1===r?"#f8e8e0":"#c84a3a"),t.beginPath(),t.moveTo(-3,0),t.lineTo(3,-1),t.lineTo(2,2),t.closePath(),t.fill(),(t.fillStyle="#f0a090"),t.fillRect(-3,0,4,0.6),t.restore());}),t.save(),t.translate(296,132),t.rotate(-0.8),(t.strokeStyle="#b84a3a"),(t.lineWidth=1.6),t.beginPath(),t.arc(0,0,3.4,-1.3,1.3),t.stroke(),(t.strokeStyle="#e8806a"),(t.lineWidth=0.5),t.beginPath(),t.arc(0,0,3.6,-1,0),t.stroke(),t.restore());for(let e=0;e<2;e++){const o=(a/3200+0.5*e)%1;((t.fillStyle="rgba(230,236,240,"+0.1*(1-o)+")"),t.fillRect(318+2*Math.sin(6*o+e),120-10*o,2,2));}})(e,a),ba||
(ba=(function(){const t=document.createElement("canvas");((t.width=384),(t.height=216));const a=t.getContext("2d");a.imageSmoothingEnabled=!1;const e=(t,e,o,r,n)=>{((a.fillStyle=t),a.fillRect(e,o,r,n));},o=(t,e)=>{((a.fillStyle=t),a.beginPath(),e.forEach((t,e)=>(e?a.lineTo(t[0],t[1]):a.moveTo(t[0],t[1]))),a.closePath(),a.fill());},n=(t,a,e,o,n)=>{const l=[];for(let s=0;s<e;s++){const c=s/e;l.push([t[0]+(a[0]-t[0])*c+(r(o,s)-0.5)*n,t[1]+(a[1]-t[1])*c+(r(o+1,s)-0.5)*n,]);}
return l;},l=[244,182],s=[273,176],c=[304,171],i=[322,206],f=[290,209],h=[254,213],d=(t,a,e,o,r)=>
n(t,a,8,r,1.6).concat(n(a,e,8,r+2,1.8),n(e,o,8,r+4,1.6),n(o,t,8,r+6,1.8),);(o("#b8ae94",d([l[0]+2,l[1]+2],[s[0],s[1]+2],[f[0],f[1]+2],[h[0]+2,h[1]+2],11),),o("#b8ae94",d([s[0],s[1]+2],[c[0]+2,c[1]+2],[i[0]+2,i[1]+2],[f[0],f[1]+2],13,),));const b=d(l,s,f,h,21),g=d(s,c,i,f,23),p=(t,e,o)=>{const r=a.createLinearGradient(l[0],l[1],i[0],i[1]);(r.addColorStop(0,e),r.addColorStop(1,o),(a.fillStyle=r),a.beginPath(),t.forEach((t,e)=>(e?a.lineTo(t[0],t[1]):a.moveTo(t[0],t[1]))),a.closePath(),a.fill());};(p(b,"#efe6cc","#d6c9a6"),p(g,"#e8dec2","#cdbf9a"),a.save(),a.beginPath(),b.concat(g).forEach((t,e)=>(e?a.lineTo(t[0],t[1]):a.moveTo(t[0],t[1]))),a.clip(),a.beginPath(),b.forEach((t,e)=>(e?a.lineTo(t[0],t[1]):a.moveTo(t[0],t[1]))),a.closePath(),a.save(),a.clip(),(a.strokeStyle="rgba(110,130,180,.45)"),(a.lineWidth=0.5));for(let t=0;t<6;t++)
(a.beginPath(),a.moveTo(247,187+4.4*t),a.quadraticCurveTo(258,184+4.4*t+(t%2),270,183+4.4*t),a.stroke());(a.restore(),a.save(),a.beginPath(),g.forEach((t,e)=>(e?a.lineTo(t[0],t[1]):a.moveTo(t[0],t[1]))),a.closePath(),a.clip(),(a.strokeStyle="rgba(110,130,180,.45)"),(a.lineWidth=0.5));for(let t=0;t<6;t++)
(a.beginPath(),a.moveTo(278,182+4.6*t),a.quadraticCurveTo(292,180+4.6*t-(t%2),306,177+4.8*t),a.stroke());(a.restore(),(a.font='2.8px "Press Start 2P"'),(a.textBaseline="top"),(a.fillStyle="rgba(180,30,30,.85)"),a.fillText("pH ~1",251,185),(a.fillStyle="rgba(40,50,110,.8)"),a.fillText("3:1:1",280,181),a.fillText("ACID>H2O",279,190),[[246,196,268,190],[252,206,270,182],[276,180,300,200],[284,206,312,186],[262,184,248,208],[294,176,318,204],].forEach(([t,e,o,r])=>{((a.lineWidth=0.8),(a.strokeStyle="rgba(90,70,40,.35)"),a.beginPath(),a.moveTo(t,e),a.lineTo((t+o)/2+2,(e+r)/2-1),a.lineTo(o,r),a.stroke(),(a.strokeStyle="rgba(255,252,236,.6)"),a.beginPath(),a.moveTo(t+0.8,e+0.8),a.lineTo((t+o)/2+2.8,(e+r)/2-0.2),a.lineTo(o+0.8,r+0.8),a.stroke());}));for(let t=0;t<40;t++){const a=246+72*r(t,201),o=176+34*r(t,202);e(r(t,203)<0.5?"rgba(255,255,240,.35)":"rgba(80,60,30,.18)",a,o,1+2*r(t,204),1,);}
((a.strokeStyle="rgba(120,70,30,.55)"),(a.lineWidth=1.2),a.beginPath(),a.ellipse(296,195,7,4.5,-0.2,0,6),a.stroke(),(a.fillStyle="rgba(140,90,40,.18)"),a.beginPath(),a.ellipse(296,195,6,3.8,-0.2,0,7),a.fill(),(a.fillStyle="rgba(150,120,70,.28)"),a.beginPath(),a.moveTo(250,198),a.bezierCurveTo(254,190,266,194,264,202),a.bezierCurveTo(262,210,248,208,250,198),a.fill(),(a.strokeStyle="rgba(120,90,40,.45)"),(a.lineWidth=0.6),a.stroke());for(let t=0;t<14;t++)
e(t%3?"rgba(70,110,50,.7)":"rgba(40,70,30,.8)",306+12*r(t,211),178+10*r(t,212),1,1,);((a.fillStyle="rgba(110,70,30,.4)"),a.fillRect(268,176,2,12),a.restore());for(let t=0;t<9;t++){const o=t/8,r=s[0]+(f[0]-s[0])*o,n=s[1]+2+(f[1]-s[1]-3)*o;((a.strokeStyle="#4a5058"),(a.lineWidth=0.8),a.beginPath(),a.ellipse(r,n,1.6,1.2,0,0,7),a.stroke(),e("#d8dce0",r-1,n-1.2,1,1));}
(o("rgba(0,0,0,.2)",[[l[0],l[1]],[l[0]+9,l[1]-1],[l[0]+2,l[1]+9],]),o("#c4b58e",[[l[0]+1,l[1]+1],[l[0]+8,l[1]],[l[0]+3,l[1]+7],]),o("#e8dcbc",[[l[0]+3,l[1]+1],[l[0]+8,l[1]],[l[0]+3,l[1]+6],]),o("#3a4044",[[i[0]-6,i[1]-1],[i[0]+1,i[1]-6],[i[0]+1,i[1]+1],]),o("#f4ecd4",[[c[0]-2,c[1]+1],[c[0]+3,c[1]+2],[c[0]+6,c[1]+10],[c[0]+1,c[1]+8],]),o("rgba(0,0,0,.18)",[[c[0]+1,c[1]+8],[c[0]+6,c[1]+10],[c[0]+4,c[1]+12],]));const u=document.createElement("canvas");((u.width=384),(u.height=216));const m=u.getContext("2d");return(m.drawImage(t,0,0),(m.globalCompositeOperation="source-atop"),(m.fillStyle="rgba(30,26,18,.42)"),m.fillRect(0,0,384,216),{a:t,d:u});})()),(e.fillStyle="rgba(6,8,6,.4)"),e.beginPath(),e.moveTo(240,186),e.lineTo(302,176),e.lineTo(318,199),e.lineTo(250,201),e.closePath(),e.fill(),e.drawImage(ba.a,0,0,384,200,0,0,384,200),o("rgba(0,0,0,.35)",248,203,74,13),e.drawImage(ba.d,0,200,384,16,2,200,384,30),o("rgba(255,255,255,.35)",250,199.5,70,1),e.save(),e.translate(238,196),e.rotate(0.18),(e.fillStyle="rgba(0,0,0,.3)"),e.fillRect(-10,2,22,2),o("#f2c440",-10,-1.5,20,3),o("#ffe08a",-10,-1.5,20,1),o("#c8962a",-10,1,20,0.5),o("#c8c8cc",10,-1.5,2,3),o("#e8a8a0",12,-1.5,3,3),n("#e8c89a",[[-10,-1.5],[-14,0],[-10,1.5],]),o("#2a2a2a",-14.5,-0.5,1,1),e.restore());{((e.fillStyle="rgba(6,8,6,.4)"),e.beginPath(),e.ellipse(226,189,14,4,0,0,7),e.fill());const t=ctx;((ctx=e),e.save(),e.translate(224,180),e.rotate(0.35),mo(24,26,0,9,0),e.restore(),(ctx=t));}
{const t=a%6100<70&&((a/35)|0)%2?0.45:1;(o("#05080a",191,0,2,10),n("#2a3a40",[[180,10],[204,10],[210,18],[174,18],]),o("#5a7a80",180,10,24,1),o("#6a3a1c",184,12,6,2),o("rgba(255,248,220,"+0.9*t+")",186,18,12,2));const l=e.createLinearGradient(0,18,0,216);(l.addColorStop(0,"rgba(255,244,214,"+0.2*t+")"),l.addColorStop(1,"rgba(255,244,214,0)"),(e.fillStyle=l),e.beginPath(),e.moveTo(176,18),e.lineTo(208,18),e.lineTo(300,216),e.lineTo(84,216),e.closePath(),e.fill(),t<1&&o("rgba(0,0,0,.18)",0,0,384,216));for(let t=0;t<14;t++){const e=(a/9e3+r(t,71))%1,n=176+32*r(t,72)+e*(r(t,73)-0.5)*90;o("rgba(255,250,230,"+0.45*(1-e)+")",n,22+120*e,1,1);}}
{const t=1900,r=(a%t)/t;if(r<0.75)o("rgba(200,235,255,.85)",150,13+(r/0.75)*85,1,2);else{const t=(r-0.75)/0.25;((e.strokeStyle="rgba(200,235,255,"+(1-t)+")"),(e.lineWidth=0.6),e.beginPath(),e.ellipse(150,99,6*t,1.4*t,0,0,7),e.stroke());}}
for(let t=0;t<12;t++){const n=
(384*r(t,151)+14*Math.sin(a/1800+t)+0.004*a*((t%3)-1)+384)%384,l=20+170*r(t,152)+6*Math.cos(a/1500+2*t),s=0.35+0.4*Math.sin(a/400+1.7*t);if(s>0.1&&(o("rgba(200,255,140,"+s+")",n,l,1,1),s>0.6)){const t=e.createRadialGradient(n,l,0,n,l,4);(t.addColorStop(0,"rgba(190,255,120,.25)"),t.addColorStop(1,"rgba(190,255,120,0)"),(e.fillStyle=t),e.fillRect(n-4,l-4,8,8));}}
{const t=(a%7e3)/7e3;if(t<0.6){const a=t/0.6,r=120+60*a+8*Math.sin(14*a),n=10+96*a;(e.save(),e.translate(r,n),e.rotate(Math.sin(10*a)),o("#5aa83a",-2,-1,4,2),o("#3a7a2a",-2,0,4,1),e.restore());}}
if(([[20,196],[366,196],].forEach(([t,o],r)=>{const n=0.18+0.12*Math.sin(a/600+2*r),l=e.createRadialGradient(t,o,0,t,o,14);(l.addColorStop(0,"rgba(120,255,210,"+n+")"),l.addColorStop(1,"rgba(120,255,210,0)"),(e.fillStyle=l),e.fillRect(t-14,o-14,28,28));}),1)){const t=[],c=(a,e,o,n,l,s)=>{for(let c=0;c<l;c++){const i=c/l;t.push([a+(o-a)*i+2.2*(r(s,c)-0.5),e+(n-e)*i+2.2*(r(s+1,c)-0.5),]);}};(c(22,111,146,109,14,3),c(146,109,149,170,8,5),t.push([149,170],[140,174]),c(140,174,24,176,12,7),c(24,176,20,111,8,9),(e.fillStyle="rgba(6,8,6,.42)"),e.beginPath(),t.forEach((t,a)=>(a?e.lineTo(t[0]+3,t[1]+3):e.moveTo(t[0]+3,t[1]+3))),e.closePath(),e.fill(),e.save(),e.beginPath(),t.forEach((t,a)=>(a?e.lineTo(t[0],t[1]):e.moveTo(t[0],t[1]))),e.closePath(),e.clip());{const t=e.createLinearGradient(20,110,150,176);(t.addColorStop(0,"#2a5a8a"),t.addColorStop(1,"#1c3e64"),(e.fillStyle=t),e.fillRect(18,106,136,74));}
for(let t=24;t<150;t+=6)o("rgba(200,230,255,.10)",t,106,1,72);for(let t=112;t<178;t+=6)o("rgba(200,230,255,.10)",18,t,134,1);[[22,128,150,150,1],[60,108,96,178,0],[110,108,82,178,1],].forEach(([t,a,o,r,n])=>{((e.strokeStyle="rgba(0,0,0,.28)"),(e.lineWidth=1),e.beginPath(),e.moveTo(t,a),e.lineTo(o,r),e.stroke(),(e.strokeStyle="rgba(220,240,255,.22)"),e.beginPath(),e.moveTo(t+1,a+1),e.lineTo(o+1,r+1),e.stroke());});{const t=e.createLinearGradient(20,110,150,176);(t.addColorStop(0,"rgba(255,255,255,.08)"),t.addColorStop(0.35,"rgba(0,0,0,.0)"),t.addColorStop(0.36,"rgba(0,0,0,.14)"),t.addColorStop(0.6,"rgba(255,255,255,.06)"),t.addColorStop(0.61,"rgba(0,0,0,.12)"),t.addColorStop(1,"rgba(0,0,0,.05)"),(e.fillStyle=t),e.fillRect(18,106,136,74));}
((e.fillStyle="rgba(120,90,50,.35)"),e.beginPath(),e.ellipse(122,160,14,7,0.3,0,7),e.fill(),(e.strokeStyle="rgba(90,60,30,.5)"),(e.lineWidth=0.8),e.beginPath(),e.ellipse(46,124,7,3,0,0,7),e.stroke(),e.restore(),n("#3a6a9a",[[140,174],[149,170],[144,167],]),n("#16324e",[[140,174],[144,167],[138,168],]),o("rgba(232,224,190,.75)",24,108,12,5),o("rgba(232,224,190,.75)",134,106,12,5));for(let t=0;t<9;t++)
o(t%2?"#2c6a30":"#4a9a3a",20+14*r(t,61),170+5*r(t,62),2,2);(s("VB-23 SPRAYER",26,113,"#cfe8ff",3),s("REV.4",126,169,"#cfe8ff",2.6));const i=(t,a,o,r,n,l)=>{((e.strokeStyle=l?"rgba(138,255,154,.9)":"rgba(200,220,230,.5)"),(e.lineWidth=1),e.setLineDash(l?[]:[3,2]),e.strokeRect(t+0.5,a+0.5,o,r),e.setLineDash([]),s(n,t+o/2,a+r+2,l?"#8aff9a":"#8aa0aa",3.5,"c"));};if((i(28,132,30,30,"HANDLE",ua.h),i(64,120,36,32,"CANISTER",ua.c),i(106,132,38,22,"BARREL",ua.b),ua.h&&l("handle","#8a6a4a",30,133,26),ua.b&&l("barrel","#8a94ac",112,130,26),ua.c)){if((l("canister",canFill>=3?"#b06aff":"#3a4258",68,121,28),canFill>0&&
canFill<3&&
o("#b06aff",79.7,142-3.5*canFill,4.6,3.5*canFill),canFill>0)){const t=e.createRadialGradient(82,136,1,82,136,16);(t.addColorStop(0,"rgba(176,106,255,"+0.12*canFill+")"),t.addColorStop(1,"rgba(176,106,255,0)"),(e.fillStyle=t),e.fillRect(60,114,44,44));}
for(let t=0;t<3;t++)o(t<canFill?"#b06aff":"#2a3440",72+7*t,156,5,2);}
const f=a-Ta;if(f<4e3){const t=44+2*Math.sin(f/200),a=e.createRadialGradient(85,140,2,85,140,50);(a.addColorStop(0,"rgba(200,150,255,.55)"),a.addColorStop(1,"rgba(200,150,255,0)"),(e.fillStyle=a),e.fillRect(30,90,110,100),l("blaster","#b06aff",85-t/2,140-t/2,t));for(let t=0;t<8;t++){const a=(t/8)*6.283+f/400,e=26+4*Math.sin(f/150+t);o(t%2?"#ffffff":"#d8a0ff",85+Math.cos(a)*e,140+Math.sin(a)*e*0.7,2,2,);}}}
const h=(t,l,s,c,i,f,h,d)=>{((d=d||1),(e.fillStyle="rgba(4,10,12,.32)"),e.beginPath(),e.ellipse(t+3,s+2,c+5,3.5,0,0,7),e.fill(),o("rgba(170,220,240,.10)",t-c,l,2*c,s-l));let b=s;if(f.length){let e=[0,0,0];(f.forEach((t)=>{const a=St(7===t.length?t:"#888888");e=[e[0]+a[0],e[1]+a[1],e[2]+a[2]];}),(e=e.map((t)=>(t/f.length)|0)),f.forEach((a)=>{const r=h?"rgb("+e.join(",")+")":a;(o(r,t-c+2,b-i,2*c-4,i),o("rgba(255,255,255,.16)",t-c+2,b-i,2*c-4,1),(b-=i));}));const r=0.6*Math.sin(a/500);(o("rgba(255,255,255,.6)",t-c+2,b+r,2*c-4,1),o("rgba(255,255,255,.22)",t-c+3,b+1,3,s-b-2));}
(o("#cfe8ff",t-c,l,2,s-l),o("#cfe8ff",t+c-2,l,2,s-l),o("#cfe8ff",t-c,s-2,2*c,2),o("#eaf8ff",t-c-2,l-2,2*c+4,2),o("#8ab8cc",t-c,s,2*c,1),n("#eaf8ff",[[t-c-2,l-2],[t-c-6,l-5],[t-c-4,l-2],]),o("rgba(255,255,255,.5)",t-c+4,l+4,2,0.55*(s-l)),o("rgba(255,255,255,.25)",t+c-6,l+6,1,0.3*(s-l)));const g=s-l;(o("rgba(170,160,130,.10)",t-c+2,l,2*c-4,g),[0.32,0.58].forEach((a,e)=>{const n=s-g*a;o("rgba(236,226,196,.32)",t-c+2,n,2*c-4,1);for(let a=0;a<5;a++)
o("rgba(236,226,196,.25)",t-c+3+r(d+e,a)*(2*c-6),n+1,1+3*r(a,d),1,);}),o("rgba(90,70,40,.35)",t-c+2,s-4,2*c-4,2),(e.lineWidth=0.7),[[0.18,0],[0.72,1],].forEach(([a,o])=>{let n=t-c+2+a*(2*c-4),s=l;const i=[[n,s]];for(let t=0;t<5;t++)
((n+=6*(r(7*d+o,t)-0.5)),(s+=0.06*g+r(3*d+o,t)*g*0.06),i.push([n,s]));((e.strokeStyle="rgba(255,255,255,.75)"),e.beginPath(),i.forEach((t,a)=>(a?e.lineTo(t[0],t[1]):e.moveTo(t[0],t[1]))),e.stroke(),(e.strokeStyle="rgba(40,60,70,.45)"),e.beginPath(),i.forEach((t,a)=>
a?e.lineTo(t[0]+0.8,t[1]+0.6):e.moveTo(t[0]+0.8,t[1]+0.6),),e.stroke());const f=i[2];((e.strokeStyle="rgba(255,255,255,.6)"),e.beginPath(),e.moveTo(f[0],f[1]),e.lineTo(f[0]+(o?-5:5),f[1]+3),e.stroke());}));const p=t+0.35*c;(n("rgba(14,24,22,.9)",[[p-3,l-2],[p+3,l-2],[p+1,l+2],[p-1,l+1],]),o("#ffffff",p-3,l-2,1,1),o("#ffffff",p+2,l-2,1,1));for(let a=0;a<10;a++){const e=t-c-2+8*r(d,a+20),n=1+4*r(d,a+30);o(a%3?"#2c6a30":"#4a9a3a",e,s-n,2,n);}
for(let a=0;a<7;a++){const e=t+c-4+6*r(d,a+40);o(a%2?"#2c6a30":"#4a9a3a",e,s-1-3*r(d,a+50),2,2);}
let u=t-c;for(let a=0;a<0.42*g;a+=2)
((u=t-c-1+1.2*Math.sin(0.3*a+d)),o(a%6?"#1e5a2c":"#3a8a3a",u,s-a,1.5,2),a%8==4&&o("#5ab04a",u-2,s-a,2,1.5));return b;},p=192,u=152,m=ka&&ka.moved&&"@small"===ka.id,y=wa&&a-wa.t0<900?wa:null,x=y?(a-y.t0)/900:0;((e.fillStyle="#6a5a40"),e.beginPath(),e.ellipse(p,153,34,4,0,0,7),e.fill(),(e.fillStyle="#8a7654"),e.beginPath(),e.ellipse(p,u,32,3,0,0,7),e.fill());const M=h(p,64,u,30,12,ga.map((t)=>Ca[t]||"#888888"),b,3,);for(let t=1;t<=6;t++)
(o("#cfe8ff",210,u-12*t,10,1),t%2==0&&
(o("#cfe8ff",206,u-12*t,14,1),s(String(t),203,u-12*t-2,"#cfe8ff",3)));if(Sa("salt")&&!b)
for(let t=0;t<14;t++)o("#ffffff",168+48*r(t,41),148-5*r(t,42),1,1);if(Sa("hcl"))
for(let t=0;t<(Sa("h2o2")?12:6);t++){const e=149-((a/14+37*t)%Math.max(4,u-M-4));o("rgba(255,255,255,.75)",168+48*r(t,43)+1.5*Math.sin(a/200+t),e,1,1);}
if(Sa("h2o2")&&Sa("hcl"))
for(let t=0;t<3;t++){const e=(a/2400+t/3)%1;o("rgba(230,240,200,"+0.16*(1-e)+")",182+10*t+3*Math.sin(5*e+t),M-4-26*e,3,3,);}
(g&&(o("#f4f0dc",156,70,4,14),o("#e83a3a",156,78,4,6)),c("MAIN BEAKER",p,159,"#8fd8ff"));if(m||(y&&"pour"===y.k))
(e.setLineDash([2,2]),(e.strokeStyle="rgba(207,232,255,.35)"),e.strokeRect(261.5,117.5,29,40),e.setLineDash([]));else{h(276,118,158,14,22,pa?[Ca[pa]]:[],0,7);for(let t=1;t<=2;t++)o("#cfe8ff",282,158-11*t,6,1);}
(c(pa?"MEASURE: "+items[pa].n.split(" (")[0].split(" ")[0].toUpperCase():"MEASURE",276,165,pa?"#ffe070":"#8fd8ff",),pa&&
!m&&
((a/600)|0)%2&&
(o("#ffe070",275,106,2,5),n("#ffe070",[[273,111],[279,111],[276,114],])));const w=(t,a,r,n)=>{(e.save(),e.translate(t,a),e.rotate(r),o("rgba(170,220,240,.14)",-14,-20,28,40),n&&o(n,-12,-2,24,20),o("#cfe8ff",-14,-20,2,40),o("#cfe8ff",12,-20,2,40),o("#cfe8ff",-14,18,28,2),o("#eaf8ff",-16,-22,32,2),(e.strokeStyle="rgba(255,255,255,.7)"),(e.lineWidth=0.7),e.beginPath(),e.moveTo(-8,-20),e.lineTo(-6,-12),e.lineTo(-9,-4),e.stroke(),o("rgba(170,160,130,.12)",-12,-20,24,38),e.restore());};if(m&&va){const t=va[0]>152&&va[0]<232&&va[1]>40&&va[1]<160;(t&&
((e.strokeStyle="rgba(255,224,112,.8)"),e.setLineDash([3,2]),e.strokeRect(160.5,60.5,63,94),e.setLineDash([])),w(va[0],va[1]-4,t?-0.6:-0.12,Ca[pa]));}
if(y){if("pour"===y.k){if((w(236,54,-1.05*Math.sin(Math.min(1,1.3*x)*Math.PI),x<0.7?y.c:null),x>0.15&&x<0.8))
for(let t=58;t<M;t+=2)o(y.c,214+Math.sin(0.5*t+a/60),t,3,2);if(x>0.3&&x<0.85)
for(let t=0;t<5;t++)
o("rgba(255,255,255,.7)",208+12*r(t,(a/60)|0),M-2-4*r(t+3,(a/60)|0),1,1,);}
if("fill"===y.k)
for(let t=92;t<136;t+=2)
x<0.6&&o(y.c,275+Math.sin(0.5*t+a/60),t,3,2);if("sprinkle"===y.k)
for(let t=0;t<16;t++){const a=(1.6*x+0.5*r(t,51))%1;o("#ffffff",180+24*r(t,52),34+a*(M-64+30),1.5,1.5);}
if("stir"===y.k){const t=18*x,a=p+14*Math.cos(t);((e.strokeStyle="#eaf8ff"),(e.lineWidth=2),e.beginPath(),e.moveTo(a-10,24),e.lineTo(a,144),e.stroke(),(e.strokeStyle="rgba(255,255,255,.5)"),(e.lineWidth=1),e.beginPath(),e.ellipse(p,M+2,20,3,0,t,t+4),e.stroke());}
if("strip"===y.k){const t=34*Math.sin(Math.min(1,1.2*x)*Math.PI);(o("#f4f0dc",188,20+t,8,34),o(x>0.45?"#e83a3a":"#e8d83a",188,46+t,8,8));}
if("venom"===y.k)
for(let t=0;t<12;t++){const a=(1.5*x+0.4*r(t,61))%1;o(t%2?"#b06aff":"#e0c0ff",80+6*r(t,62),98+30*a,2,2);}
if("click"===y.k)
for(let t=0;t<8;t++){const a=(t/8)*6.283,e=26*x;o("#eaf8ff",85+Math.cos(a)*e,142+Math.sin(a)*e*0.7,2,2);}}
if(ka&&ka.moved&&"@small"!==ka.id){const t=ka.id,o=0.45+0.35*Math.sin(a/120);((e.lineWidth=1),e.setLineDash([3,2]),(e.strokeStyle="rgba(255,224,112,"+o+")"),Ra.includes(t)?e.strokeRect(258.5,114.5,35,48):Pa.includes(t)?e.strokeRect(62.5,118.5,40,36):Ia[t]?e.strokeRect(...{handle:[26.5,130.5,34,34],canister:[62.5,118.5,40,36],fullcan:[62.5,118.5,40,36],barrel:[104.5,130.5,42,26],}[t],):"goggles"!==t&&"gloves"!==t&&e.strokeRect(160.5,60.5,63,94),e.setLineDash([]));}
if(worn){o("rgba(120,230,255,.04)",0,0,384,216);const t=e.createRadialGradient(192,108,150,192,108,240);(t.addColorStop(0,"rgba(10,20,24,0)"),t.addColorStop(1,"rgba(10,20,24,.55)"),(e.fillStyle=t),e.fillRect(0,0,384,216),o("rgba(160,240,255,.18)",60,2,264,1));}
gloved&&(o("rgba(74,154,255,.9)",4,4,6,6),o("#9ad0ff",4,4,6,1));})(performance.now()),(xa=requestAnimationFrame(Za)));}
window.__benchDrop=function(a,e){const o=(t)=>Ya(t,"bad"),r=(t)=>Ya(t,"good");if(((qs("#cdone").textContent="CLOSE"),"goggles"===a||"gloves"===a))return ja(a);if(!e)
return Ya("Drop it on the table: on a beaker"+(La()?" or on the assembly mat":"")+".","",);if("@small"===a){if("main"!==e)return o("Pour the small beaker into the <b>big beaker</b>.");const t=pa,a=ga.length;return(ja(t),void(ga.length>a&&((pa=null),Va("pour",Ca[t]),Ya(ma,ya))));}
if(Ra.includes(a)){if("main"===e)
return o("<b>Not straight from the bottle.</b> Measure one part into the <b>small beaker</b> first, then pour the small beaker into the big one. That is how you control the amounts.",);if("small"!==e)return o("Liquids go into the <b>small beaker</b>.");if(!Xa())return;return pa?o("The small beaker already holds "+
items[pa].n.split(" (")[0]+
". Pour it into the big beaker first, or press EMPTY.",):((pa=a),Va("fill",Ca[a]),r("One measured part of <b>"+
items[a].n.split(" (")[0]+
"</b> is in the small beaker. Now drag the small beaker onto the big beaker to pour it in.",));}
if(["salt","sugar","soda","rod","strip"].includes(a)){if("small"===e)
return o("The small beaker is only for measuring liquids. That goes in the <b>big beaker</b>.",);if("main"!==e)return o("That goes in the <b>big beaker</b>.");const t=ga.length,r=b,n=g;return(ja(a),void(ga.length>t?Va("sprinkle","#f4f4ff"):b&&!r?Va("stir"):g&&!n&&Va("strip")));}
if(Ia[a])
return e===Ia[a]?((ua[Oa[a]]=1),Va("click"),void(Qa()||
r("<b>"+
items[a].n+
"</b> is on the mat."+
("canister"===a?" Now drop the venom vials into it.":""),))):o("sh"===e||"sb"===e||"sc"===e||"tray"===e?"That part does not fit there. Match each part to its outline: HANDLE, CANISTER, BARREL.":"Weapon parts go on the <b>assembly mat</b> on the left.",);if(Pa.includes(a)){if("sc"!==e)return o("Venom vials are poured into the <b>Venom Canister</b>.");if(!ua.c)
return o("Put the <b>Venom Canister</b> on the mat first, then drop the vials into it.");if(!Xa())return;if((inv.splice(inv.indexOf(a),1),canFill++,Va("venom","#b06aff"),canFill>=3)){const t=inv.indexOf("canister");(t>=0&&inv.splice(t,1),inv.push("fullcan"),got.add("fullcan"),Qa()||
r("<b>FULL VENOM CANISTER!</b> All three vials are sealed inside. Now put the <b>handle</b> and the <b>barrel</b> on the mat to assemble the weapon.",));}else
r("Venom vial "+
canFill+
" of 3 poured into the canister. The venom hisses against the steel.",);updateGuide();}else Ya("That does not belong on the bench.","");};
(qs("#fp").addEventListener("pointerdown",function(t){if(qs("#gx").classList.contains("ph"))return;const a=t.target.closest("[data-id],[data-drag]");if(!a)return;let e=a.dataset.id||null;if("small"===a.dataset.drag){if(!pa)return;e="@small";}
e&&(t.preventDefault(),(ka={id:e,x0:t.clientX,y0:t.clientY,moved:0}));}),window.addEventListener("pointermove",function(a){const e=ka;if(!e)return;const o=a.clientX-e.x0,r=a.clientY-e.y0;if(!e.moved&&o*o+r*r>49){((e.moved=1),(qs("#cinv").hidden=!0));const a=qs("#fpGhost");"@small"!==e.id&&((a.src=s(items[e.id].k,items[e.id].c)),(a.hidden=!1));}
if(e.moved){const e=qs("#fp").getBoundingClientRect(),o=qs("#fpGhost");((o.style.left=a.clientX-e.left+"px"),(o.style.top=a.clientY-e.top+"px"),(va=(function(a){const e=qs("#fpc").getBoundingClientRect();return[((a.clientX-e.left)/e.width)*384,((a.clientY-e.top)/e.height)*216];})(a)));}}),window.addEventListener("pointerup",function(a){const e=ka;if(!e)return;if(((ka=null),(qs("#fpGhost").hidden=!0),(va=null),!e.moved))
return void(function(t){if("goggles"===t||"gloves"===t)return ja(t);if("@small"===t)
return Ya("Drag the small beaker onto the big beaker to pour it in.","");const a=Xt[t];Ya("<b>"+
items[t].n+
"</b><br>"+
(a?a.what:"")+
'<br><span style="color:#ffe070">Drag it onto the table to use it.</span>',"",);})(e.id);const o=document.elementFromPoint(a.clientX,a.clientY),r=o&&o.closest?o.closest("[data-drop]"):null;window.__benchDrop(e.id,r?r.dataset.drop:null);}),window.addEventListener("pointercancel",()=>{((ka=null),(va=null),(qs("#fpGhost").hidden=!0));}),(qs("#fpBag").onclick=()=>{const a=qs("#cinv");a.hidden=!a.hidden;}));const $a={ArrowLeft:"l",a:"l",A:"l",ArrowRight:"r",d:"r",D:"r"};(window.addEventListener("keydown",function(a){if(!GM.on||window.__evoPaused)return;const e=a.key;if(c2cut||c3Cut())return(!c2cut&&$a[e]&&(keys[$a[e]]=1),("Escape"!==e&&"Enter"!==e)||(c2cut?c2CutEnd():c3Skip()),void a.preventDefault());if(cine)return(("Escape"!==e&&"Enter"!==e)||skipCine(),void a.preventDefault());modal?"Escape"===e&&(4===modal?tnEsc():2===modal?Na():qs("#gkOk").click()):$a[e]?((keys[$a[e]]=1),a.preventDefault(),a.stopPropagation()):"ArrowUp"===e||"w"===e||"W"===e||" "===e?((jumpBuf=8),(keys.u=1),a.preventDefault(),a.stopPropagation()):"j"===e||"J"===e||"x"===e||"X"===e||"z"===e||"Z"===e?((punchBuf=8),a.preventDefault(),a.stopPropagation()):"f"===e||"F"===e||"k"===e||"K"===e?((shootBuf=3),a.preventDefault(),a.stopPropagation()):("e"!==e&&
"E"!==e&&
"Enter"!==e&&
"ArrowDown"!==e&&
"s"!==e&&
"S"!==e)||
((useBuf=8),a.preventDefault(),a.stopPropagation());},!0,),window.addEventListener("keyup",function(t){const a=$a[t.key];(a&&GM.on&&(keys[a]=0),/^(ArrowUp|w|W| )$/.test(t.key)&&(keys.u=0));},!0,));const _a={};function te(a,e,o){const r=qs(a);_a[a]={b:r,down:e,up:o,on:!1};const n=()=>{const t=_a[a];t.on||((t.on=!0),r.classList.add("on"),e());},l=()=>{const t=_a[a];t.on&&((t.on=!1),r.classList.remove("on"),o&&o());};((_a[a].press=n),(_a[a].rel=l));const s=(t)=>{"touch"!==t.pointerType&&(t.preventDefault(),l());};(r.addEventListener("pointerdown",(t)=>{if("touch"!==t.pointerType){t.preventDefault();try{r.setPointerCapture(t.pointerId);}catch(t){}
n();}}),r.addEventListener("pointerup",s),r.addEventListener("pointercancel",s),r.addEventListener("lostpointercapture",s),r.addEventListener("contextmenu",(t)=>t.preventDefault()));}
(te("#bL",()=>(keys.l=1),()=>(keys.l=0),),te("#bR",()=>(keys.r=1),()=>(keys.r=0),),te("#bJ",()=>((jumpBuf=8),(keys.u=1)),()=>(keys.u=0),),te("#bP",()=>(punchBuf=8)),te("#bU",()=>(useBuf=8)),te("#bS",()=>{((keys.s=1),(shootBuf=3));},()=>(keys.s=0),));const ae=(t)=>{t.cancelable&&t.preventDefault();const a={};for(const e of t.touches){const t=document.elementFromPoint(e.clientX,e.clientY),o=t&&t.closest?t.closest(".pad"):null;o&&(a["#"+o.id]=1);}
for(const t in _a)a[t]?_a[t].press():_a[t].rel();};{const a=qs("#gp");["touchstart","touchmove","touchend","touchcancel"].forEach((t)=>
a.addEventListener(t,ae,{passive:!1}),);}
function ee(){(evoLeave(),c3CloseAll(),document.body.classList.remove("ingame","ch2"),(GM.on=!1),cancelAnimationFrame(Ot),(e.hidden=!0),(ctx=ht),(ot.hidden=!0));try{N.focus();}catch(t){}}
function enterRoom(t,e){(room!==t&&($sx("door"),$.push([t,runT])),(room=t),(player.x="R"===e?(rooms[t].W||192)-14:14),(player.y=void 0!==rooms[t].sy?rooms[t].sy:a),(player.vx=0),(player.vy=0),(player.face="R"===e?-1:1),(roomBanner=140),(parts=[]),(camX=Math.max(0,Math.min((rooms[t].W||192)-192,player.x-96))),(minis=[]),(drops=[]),backdrops[t]||backdrop(t),"exitlab"!==t||bossDone||cine||((player.x=24),spawnBoss()),"outside"===t&&((snakeBoss=null),(venoms=[]),(waves=[]),(shots=[])),c2Enter(t),tnEnter(t),updateGuide(),updateHud());}
function update(){tnUpdate();if((ue>0&&hitStop>0&&(ue=Math.max(ue,1)),(fx=fx.filter((t)=>(t.t++,"spark"===t.k||"shell"===t.k?((t.x+=t.vx),(t.y+=t.vy),(t.vy+=t.g||0),(t.vx*=0.95),"shell"===t.k&&
((t.rot=(t.rot||0)+0.5),t.y>floorY()-0.5&&
t.vy>0&&
((t.y=floorY()-0.5),(t.vy*=-0.4),(t.vx*=0.6)))):"smoke"===t.k&&((t.x+=t.vx),(t.y+=t.vy),(t.vx*=0.96),(t.r+=0.08)),t.t<t.life),)),hurtFlash>0&&hurtFlash--,hitStop>0))
return void hitStop--;if((tick++,modal||won||dead||runT++,xt>0&&0===--xt&&qs("#gt").classList.remove("on"),roomBanner>0&&roomBanner--,fadeNow!==fadeTo&&
((fadeNow+=fadeNow<fadeTo?0.1:-0.1),Math.abs(fadeNow-fadeTo)<0.06&&((fadeNow=fadeTo),onFaded)))){const t=onFaded;((onFaded=null),t(),(fadeTo=0));}
if(((parts=parts.filter((t)=>((t.x+=t.vx),(t.y+=t.vy),(t.vy+=t.g||0),--t.life>0),)),shake>0&&shake--,pourT>0&&
(pourT--,pourT%2==0&&
parts.push({x:player.x+9*player.face,y:player.y-23.2,vx:0.35*player.face,vy:0.3,g:0.12,life:40,c:"#6aff7a",s:1,}),0===pourT&&(erode=1)),erode>0&&erode<260)){erode++;for(let t=0;t<3;t++)
parts.push({x:146+40*r(erode,t),y:a-48*r(erode,t+9),vx:0.3*(r(erode,t+3)-0.5),vy:-0.3-0.5*r(erode,t+5),life:34,c:t%2?"#c8ffc8":"#8aff9a",s:1+(0==t),});(erode%20==0&&(shake=4),erode>=260&&
((exitOpen=!0),(stage=2),updateGuide(),(function(){try{localStorage.setItem(checkpointKey(),JSON.stringify({v:1,inv:inv.filter((t)=>"potion"!==t),got:[...got],taken:taken,broken:broken,worn:worn,gloved:gloved,hasGoggles:hasGoggles,}),);}catch(t){}})(),$sx("success"),addFx({k:"ring",x:player.x,y:player.y-17.4,r0:3,r1:26,c:"#ffe070",life:22,}),addFx({k:"flash",x:player.x,y:player.y-17.4,r:30,c:"255,230,140",a:0.6,life:16,}),toast('<b>THE BARRICADE DISSOLVED!</b><br>The fire exit is open. Run!<br><span style="color:#8aff9a">&#10004; CHECKPOINT SAVED</span>',3800,)));}
if((cine&&
(function(){const a=cine,e=floorY();if(((jumpBuf=useBuf=shootBuf=punchBuf=0),(keys.s=0),(a.ax=0),$dT(a),fadeNow===fadeTo)){if((a.t++,0===a.ph))
((player.face=1),(Te=40),a.t>230&&((a.ph=1),(a.t=0)));else if(1===a.ph){((player.face=1),(Te=40),(gunCd=20),1===a.t&&$sx("pour"));const t=player.x+13,e=player.y-20.3,o=181;for(let a=0;a<2;a++)
parts.push({x:t,y:e+(Math.random()-0.5),vx:(o-t)/13+0.4*(Math.random()-0.5),vy:0.5*(Math.random()-0.5)-0.45,g:0.05,life:13,c:Math.random()<0.5?"#b06aff":"#8a3ae0",s:1.5,});(a.t%3==0&&
(sparks(181,player.y-17.4+16*(Math.random()-0.5),2,["#d8a0ff","#8aff6a","#ffffff"],1.2,0.08,14,),addFx({k:"smoke",x:180,y:player.y-18*Po,vx:-0.2,vy:-0.35,r:1.5,c:"190,150,230",life:26,})),(corrode=Math.min(1,a.t/130)),a.t%8==0&&(shake=Math.max(shake,2)),a.t>145&&
((a.ph=2),(a.t=0),(Te=0),(gunCd=0),addFx({k:"ring",x:182,y:player.y-20.3,r0:3,r1:22,c:"#d8a0ff",life:18,})));}else if(2===a.ph)((a.ax=1),player.x>=167&&((a.ph=3),(a.t=0)));else if(3===a.ph){if(((player.face=1),8===a.t||38===a.t||68===a.t)){((player.punch=14),a.hits++,hitFx(181,player.y-20.3,1),(hitStop=4),(shake=3===a.hits?18:9));for(let t=0;t<(3===a.hits?22:8);t++)
parts.push({x:182,y:player.y-8.7-26*Math.random(),vx:-0.5-2*Math.random(),vy:2.2*-Math.random(),g:0.14,life:34,c:t%2?"#6a7884":"#3a444c",s:1.5,});3===a.hits&&
((bossOpen=!0),smoke(180,e,8,-1),addFx({k:"ring",x:183,y:player.y-20.3,r0:4,r1:30,c:"#ffffff",life:18,}),addFx({k:"flash",x:183,y:player.y-20.3,r:34,c:"255,240,220",a:0.8,life:12,}));}
a.t>100&&((a.ph=4),(a.t=0));}else
4===a.ph?((a.ax=1),player.x>=182&&
((a.ph=45),(fadeTo=1),(onFaded=()=>{(enterRoom("exitlab","L"),(player.x=12),(a.ph=5),(a.t=0),(a.tailB={x:310,face:-1,st:"tail",t:0,flash:0,hp:100}),(minis=[[190,1],[226,-1],[262,1],[300,-1],].map(([t,a])=>({x:t,hp:3,t:40,face:a,hurt:0,cd:0,kb:0,roam:1,}))));}))):5===a.ph?((a.ax=0.5),player.x>=150&&a.t>262&&((a.ph=6),(a.t=0))):6===a.ph?((a.tw=Math.min(1.5,a.t/50)),a.t>150&&((a.ph=7),(a.t=0))):7===a.ph?((a.ax=0.4),(a.tw=1.5+a.t/40),player.x>=200&&((a.ph=8),(a.t=0))):8===a.ph?(a.t<42&&
((a.sink=22+1.1*a.t),(a.tw=3),a.t%4==0&&(shake=Math.max(shake,5)),a.t%6==0&&minis.length)&&
smoke(minis.pop().x,e,5),42===a.t&&
((a.tailB=null),(minis=[]),(shake=16),addFx({k:"ring",x:350,y:e,r0:4,r1:50,c:"#ffe0a0",life:20,sq:0.18,})),190===a.t&&(spawnBoss(),(a.ph=9),(a.t=0))):9===a.ph&&
((snakeBoss&&"intro"===snakeBoss.st)||
((cine=null),(qs("#cskip").hidden=!0),updateGuide(),updateHud()));"exitlab"!==room||snakeBoss||updateMinis();}})(),modal||dead||pourT>0||(erode>0&&!exitOpen)||fadeNow!==fadeTo||won||doorCut||tnLock()))
return((player.vx*=0.6),void physics());c2cut&&(jumpBuf=punchBuf=useBuf=shootBuf=keys.s=keys.u=0);const e=cine?cine.ax:c2cut?c2cut.ax:(keys.r?1:0)-(keys.l?1:0);if(((player.vx=1.25*e*(Eo.speed?2.2:1)),player.kb>0&&(player.kb--,(player.vx=player.kbv)),e&&(player.face=e>0?1:-1),(player.walk=e?1:0),jumpBuf>0&&jumpBuf--,punchBuf>0&&punchBuf--,useBuf>0&&useBuf--,player.on?(coyote=6):coyote>0&&coyote--,jumpBuf>0&&(coyote>0||Eo.fly))){(addFx({k:"ring",x:player.x,y:player.y,r0:1,r1:7,c:"#cfd8e8",life:10,sq:0.3}),(player.vy=Eo.jump?-6.4:-4.3),(player.on=!1),(coyote=0),(jumpBuf=0),$sx("jump"));for(let t=0;t<4;t++)
parts.push({x:player.x,y:player.y,vx:0.3*(t-1.5),vy:-0.1,life:12,c:"#cfd8e8",s:1,});}
(punchBuf>0&&
0===player.punch&&
((player.punch=14),(punchBuf=0),$sx("swing"),(function(){const t=player.x+12*player.face*Po;if((platforms().forEach((a)=>{if(void 0!==a.crate&&
Math.abs(t-(a.x+a.w/2))<12&&
player.y>a.y-10&&
player.y<a.y+14){((broken[room+a.crate]=1),$sx("crate"),(shake=5),smoke(a.x+a.w/2,a.y+10,6),addFx({k:"ring",x:a.x+a.w/2,y:a.y+6,r0:2,r1:12,c:"#e8c890",life:12,}));for(let t=0;t<10;t++)
parts.push({x:a.x+a.w/2,y:a.y+4,vx:2*(r(t,3)-0.5),vy:2*-r(t,4),g:0.15,life:30,c:t%2?"#a87a4a":"#6a4a2a",s:1.5,});}}),"pod"===room&&!exitOpen&&t>=140)){shake=3;for(let t=0;t<6;t++)
parts.push({x:146,y:player.y-14.5-10*r(t,1),vx:-0.6-r(t,2),vy:-0.4,g:0.1,life:14,c:"#ffe070",s:1,});($sx("clank"),toast("<b>CLANK!</b> Fists won’t break metal and vines this thick. Think chemistry.",2200,),0!==stage||Tt||fa());}
(snakeBoss&&
"exitlab"===room&&
"dead"!==snakeBoss.st&&
"intro"!==snakeBoss.st&&
(snakeHit(t,player.y-20.3,snakeBoss)||
snakeHit(t,player.y-8.7,snakeBoss)||
snakeHit(t,player.y-31.9,snakeBoss))&&
player.y>floorY()-70&&
(hitFx(t+3*player.face*Po,player.y-20.3,1),(hitStop=4),(shake=Math.max(shake,6)),hitBoss(4)),"exitlab"===room&&
hitMinis(t,player.y-5.8,2,player.face)&&
(hitStop=Math.max(hitStop,2)));for(let a=0;a<3;a++)
parts.push({x:t,y:player.y-20.3,vx:player.face*(0.6+0.3*a),vy:0.2*(a-1),life:8,c:"#fff",s:1,});})()),player.punch>0&&player.punch--,useBuf>0&&
((useBuf=0),(function(){const t=rooms[room];for(const a of t.items)
if(!taken[a.id]&&!ea(a)&&se(a.x,a.y,15)){((taken[a.id]=1),inv.push(a.id),got.add(a.id),$sx("pickup"),updateBag(),updateGuide());for(let t=0;t<10;t++)
parts.push({x:a.x,y:a.y-5,vx:1.4*(r(t,5)-0.5),vy:1.6*-r(t,6),g:0.06,life:30,c:"#ffe070",s:1,});return(addFx({k:"ring",x:a.x,y:a.y-6,r0:2,r1:16,c:"#ffe070",life:16}),addFx({k:"flash",x:a.x,y:a.y-6,r:20,c:"255,235,140",a:0.7,life:12}),ia(a.id),void(0===stage&&((stage=1),(Tt=!0),updateGuide())));}
for(const e of t.ints)
if(!(Math.abs(player.x-e.x)>=e.r)){if(tnUse(e))return;if("staffdoor"===e.id)
return((shake=3),smoke(e.x,a,5),toast("The rusted lock gives way. The door creaks open…",1800),(fadeTo=1),void(onFaded=()=>{(enterRoom("ware","R"),got.has("canister")||
toast("<b>STAFF STORAGE.</b> Most crates are locked.<br>Punch the wooden ones. Check the shelves.",3600,));}));if("haz"===e.id)
return taken.canister?void toast("The HAZARDOUS crate is empty now.",1600):((taken.canister=1),inv.push("canister"),got.add("canister"),$sx("pickup"),updateBag(),updateGuide(),addFx({k:"ring",x:e.x,y:82,r0:2,r1:18,c:"#d8ff70",life:16}),addFx({k:"flash",x:e.x,y:82,r:22,c:"220,255,120",a:0.7,life:12}),void ia("canister"));if("lock"===e.id)
return((shake=2),void $sx("locked"),toast("<b>LOCKED.</b> This crate is sealed tight.",1500));}
for(const a of t.ints)
if("bench"===a.id&&Math.abs(player.x-a.x)<a.r)
return(got.size||hasPotion||toast("The mixing bench. Come back with chemicals.",2200),void openBench());"pod"===room&&
!exitOpen&&
player.x>=116&&
0===erode&&
(hasPotion?((pourT=90),$sx("pour"),(hasPotion=!1),(inv=inv.filter((t)=>"potion"!==t)),updateBag(),(potionUsed=!0),updateGuide(),toast("You pour the solvent onto the barricade…",2e3),(player.face=1)):0===stage?fa():toast("Nothing to pour yet. Make the solvent first.",2200));})()),keys.s&&hasGun&&(shootBuf=Math.max(shootBuf,1)),shootBuf>0&&
(shootBuf--,(function(){if(!(!hasGun||modal||dead||gunCd>0||cine)){if("stair"===room&&!bossOpen&&player.y>=300&&player.x>70)
return((cine={ph:0,t:0,ax:0,cap:"",hits:0,sink:22,tw:0,tailB:null}),(player.face=1),(keys.l=keys.r=keys.s=0),(jumpBuf=punchBuf=useBuf=shootBuf=0),(qs("#cskip").hidden=!1),toast(""),void updateGuide());if(ammo<=0)
return($sx("empty"),toast("The canister is empty! Hatchlings drop venom. Use your fists.",1700),void(gunCd=24));{const t=(keys.r?1:0)-(keys.l?1:0);t&&(player.face=t);}
(Eo.ammo||ammo--,(gunCd=22),(Te=36),$sx("shoot"),(function(){const t=player.x+13*player.face*Po,a=player.y-20.3;(shots.push({x:t,y:a,vx:4.4*player.face*Po,life:70}),addFx({k:"flash",x:t,y:a,r:11,c:"190,120,255",a:0.9,life:6}),addFx({k:"ring",x:t,y:a,r0:1,r1:8,c:"#d8a0ff",life:8}));for(let e=0;e<9;e++)
parts.push({x:t,y:a,vx:player.face*(1+2.2*Math.random()),vy:1.4*(Math.random()-0.5),g:0.06,life:14,c:e%2?"#d8a0ff":"#8a3ae0",s:1,});((player.kb=3),(player.kbv=0.9*-player.face),(shake=Math.max(shake,3)));})(),0===ammo&&toast("Canister empty! Kill hatchlings to collect venom.",2e3),updateHud());}})()),physics(),(function(){(invuln>0&&invuln--,gunCd>0&&gunCd--);const t=floorY();shots=shots.filter((t)=>((t.x+=t.vx),t.life--,tick%2==0&&
parts.push({x:t.x,y:t.y,vx:0,vy:0.15,g:0.05,life:10,c:"#b06aff",s:1}),"exitlab"===room&&hitMinis(t.x,t.y,3,Math.sign(t.vx))?(sparks(t.x,t.y,8,["#b06aff","#e8d0ff"],1.6,0.1,16),!1):snakeBoss&&
"exitlab"===room&&
"dead"!==snakeBoss.st&&
"intro"!==snakeBoss.st&&
snakeHit(t.x,t.y,snakeBoss)?(hitFx(t.x,t.y,1),sparks(t.x,t.y,14,["#b06aff","#e8d0ff","#8a3ae0"],2.2,0.1,22),addFx({k:"ring",x:t.x,y:t.y,r0:2,r1:16,c:"#d8a0ff",life:14}),(hitStop=3),hitBoss(10),!1):t.life>0&&t.x>0&&t.x<roomW()),);const a=snakeBoss;if(!a||"exitlab"!==room)return;(a.t++,a.flash>0&&a.flash--);const e=player.x-a.x,o=e>=0?1:-1,n=a.hp<50?1.3:1;if("intro"===a.st)
(a.t%12==0&&(shake=Math.max(shake,5)),a.t>(cine?190:110)&&((a.st="walk"),(a.t=0)));else if("dead"===a.st){if(a.t%5==0)
for(let e=0;e<4;e++)
parts.push({x:a.x+50*(r(a.t,e)-0.5),y:t-80*r(a.t,e+3),vx:r(e,a.t)-0.5,vy:-0.6,g:0.02,life:40,c:e%2?"#8aff9a":"#4a8a3a",s:2,});if(a.t>170&&!bossDone){((bossDone=!0),$sx("win"),(shake=24),updateGuide(),toast("<b>THE SNAKE IS DEAD!</b><br>The exit door burst open. Daylight! Go outside.",3600,));for(let a=0;a<24;a++)
parts.push({x:roomW()-6,y:t-10-44*r(a,4),vx:2*-r(a,5),vy:1.5*-r(a,6),g:0.12,life:40,c:a%2?"#aab4c4":"#6a7480",s:1.5,});}}else if("walk"===a.st){if((Math.abs(e)>40&&(a.face=o),a.t%38==0&&$sx("bstep"),(a.sp=(a.sp||0)+1),a.sp>(a.hp<50?360:540)&&
minis.length<3&&
((a.sp=0),(function(t){const a=floorY(),e=Math.min(2,4-minis.length);if(!(e<=0)){for(let o=0;o<e;o++){const e=Math.max(14,Math.min(roomW()-14,snakePose(t).head.x+(o?1:-1)*(10+6*o)),);(minis.push({x:e,hp:3,t:0,face:-1,hurt:0,cd:0,kb:0}),$sx("spawn"),addFx({k:"ring",x:e,y:a,r0:2,r1:14,c:"#8aff6a",life:16,sq:0.3,}),sparks(e,a-2,10,["#6a4a2a","#8aff6a","#3a2418"],1.6,0.14,20),smoke(e,a,4));}
((shake=Math.max(shake,6)),t.warned||
((t.warned=1),toast("<b>IT IS SPAWNING HATCHLINGS!</b><br>Punch or shoot the small snakes.",2600,)));}})(a)),(a.x+=0.3*a.face*n),(a.x=Math.max(66,Math.min(roomW()-66,a.x))),(snakeHit(player.x,player.y-8.7,a)||snakeHit(player.x,player.y-23.2,a))&&
hurtPlayer(1),a.t>Math.max(45,105/n))){const t=Math.abs(e)<56;let r=["slam","throw","charge"].filter((t)=>t!==a.last);(t&&(r=["slam","slam","throw"]),(a.st=r[(Math.random()*r.length)|0]),(a.last=a.st),(a.t=0),(a.face=o),(a.hit=0));}}else if("slam"===a.st){1===a.t&&$sx("windup");if(46===a.t){const e=bo(a);($sx("slam"),(shake=16),addFx({k:"ring",x:e,y:t,r0:4,r1:60,c:"#ffe0a0",life:18,sq:0.18}),addFx({k:"flash",x:e,y:t-4,r:40,c:"255,220,160",a:0.7,life:10}),smoke(e-20,t,6,-1),smoke(e+20,t,6,1),waves.push({x:e-32,vx:-1.8,hit:0},{x:e+32,vx:1.8,hit:0}),player.on&&player.y>t-24&&Math.abs(player.x-e)<32&&hurtPlayer(1));for(let a=0;a<14;a++)
parts.push({x:e+6*(a-7),y:t,vx:0.15*(a-7),vy:2*-r(a,2),g:0.1,life:20,c:"#aab4c4",s:1.5,});}
a.t>82/n&&((a.st="walk"),(a.t=0));}else if("throw"===a.st)
((a.face=o),1===a.t&&(a.tg=[]),[6,20,34].forEach((t)=>{a.t===t&&
a.tg&&
a.tg.push({x:Math.max(10,Math.min(182,player.x+10*player.vx)),shot:t+24,fired:0,});}),(a.tg||[]).forEach((t)=>{if(a.t===t.shot&&!t.fired){((t.fired=1),$sx("spit"));const e=snakePose(a).mouth;(venoms.push({k:"venom",sx:e.x,sy:e.y,x:e.x,y:e.y,tx:t.x,t:0,T:30}),(shake=Math.max(shake,3)),sparks(e.x,e.y,6,["#8aff6a","#d8ff9a","#3ac850"],1.2,0.1,14));}}),a.t>84/n&&((a.st="walk"),(a.t=0)));else if("charge"===a.st){1===a.t&&$sx("roar");if(a.t<40)a.face=o;else if(((a.x+=2.7*a.face*n),0===a.hit&&
(snakeHit(player.x,player.y-11.6,a)||snakeHit(player.x,player.y-18*Po,a))&&
(hurtPlayer(2),(a.hit=1)),a.x<=66||a.x>=roomW()-66)){((a.x=Math.max(66,Math.min(roomW()-66,a.x))),(a.st="stun"),(a.t=0),$sx("crash"),(shake=18),addFx({k:"ring",x:a.x+54*a.face,y:t-26,r0:3,r1:30,c:"#ffffff",life:16,}),addFx({k:"flash",x:a.x+54*a.face,y:t-26,r:30,c:"255,240,200",a:0.8,life:10,}),smoke(a.x+52*a.face,t,8,-a.face));for(let e=0;e<10;e++)
parts.push({x:a.x+28*a.face,y:t-30-40*r(e,1),vx:-1*a.face-r(e,2),vy:-r(e,3),g:0.1,life:24,c:"#aab4c4",s:1.5,});}}else"stun"===a.st&&a.t>80&&((a.st="walk"),(a.t=0));((ce=ce.filter((t)=>--t.life>0)),updateMinis(),(function(){const t=floorY();drops=drops.filter((a)=>(a.t++,(a.vy+=0.14),(a.y=Math.min(t-3,a.y+a.vy)),a.y>=t-3&&(a.vy=0),a.t>14&&hasGun&&!dead&&Math.abs(player.x-a.x)<8&&player.y>t-22?(ammo++,updateHud(),addFx({k:"ring",x:a.x,y:a.y,r0:2,r1:13,c:"#d8a0ff",life:14}),sparks(a.x,a.y,8,["#b06aff","#e8d0ff"],1.4,0.1,16),toast("<b>+1 VENOM</b>",900),!1):a.t<1800),);})(),(waves=waves.filter((a)=>((a.x+=a.vx),!a.hit&&
player.y>t-5&&
Math.abs(player.x-a.x)<6&&
(hurtPlayer(1),(a.hit=1)),a.x>0&&a.x<roomW()),)),(venoms=venoms.filter((a)=>{if("venom"===a.k){a.t++;const e=Math.min(1,a.t/a.T);return((a.x=a.sx+(a.tx-a.sx)*e),(a.y=a.sy+(t-1-a.sy)*e*e-26*Math.sin(e*Math.PI)),a.t%3==0&&
parts.push({x:a.x,y:a.y,vx:0,vy:0.3,g:0.12,life:16,c:"#6ae05a",s:1,}),Math.abs(a.x-player.x)<5&&Math.abs(a.y-(player.y-17.4))<11?(hurtPlayer(1),sparks(a.x,a.y,10,["#8aff6a","#d8ff9a"],1.6,0.12,18),!1):!(e>=1&&
(addFx({k:"ring",x:a.tx,y:t,r0:2,r1:14,c:"#8aff6a",life:14,sq:0.3,}),sparks(a.tx,t-1,14,["#8aff6a","#d8ff9a","#3ac850"],1.8,0.14,20),ce.push({x:a.tx,life:110}),Math.abs(player.x-a.tx)<10&&player.y>t-16&&hurtPlayer(1),1)));}
return((a.x+=a.vx),(a.y+=a.vy),a.life--,Math.abs(a.x-player.x)<5&&Math.abs(a.y-(player.y-17.4))<12?(hurtPlayer(1),!1):a.life>0&&a.x>0&&a.x<roomW()&&a.y<t);})));})(),(function(){if("stair"!==room||dead)
return((Qe=player.on),void(player.on&&((Je=player.y),(Ze=player.x))));if((!player.on&&Qe&&((Xe=player.y),($e=[Ze,Je])),player.on||(Xe=Math.min(Xe,player.y)),player.on&&!Qe)){const a=player.y-Xe;a>48&&
!Eo.god&&
(function(a,e){const o=Math.max(1,Math.round(e/88));((hp-=a),(invuln=60),(hurtFlash=16),(shake=Math.min(18,6+3*a)),(hitStop=Math.max(hitStop,3)),smoke(player.x-3,player.y,5,-1),smoke(player.x+3,player.y,5,1),addFx({k:"ring",x:player.x,y:player.y,r0:2,r1:16,c:"#ff8a8a",life:14,sq:0.3,}),updateHud(),hp<=0?((hp=0),(dead=!0),(Ue="fall"),(_e=$e.slice()),(player.vx=player.vy=0),(qs("#gd").querySelector("h3").textContent="YOU FELL"),(qs("#gd").querySelector("p").textContent=
"That drop was too far. Years of damp and vines rotted the concrete, so whole sections of steps are gone. Fall damage grows with the height: a short hop is free, one floor costs about 2 hearts, two floors about 4. Jump the gaps or keep your momentum."),(qs("#gd").hidden=!1)):toast("<b>OUCH!</b> You fell "+
(e>=80?o+" floor"+(o>1?"s":""):"hard")+
": -"+
a+
" &#9829;",2200,));})(Math.ceil((a-48)/32),a);}
(player.on&&((Je=player.y),(Ze=player.x)),(Qe=player.on));})(),player.on&&!de&&be>1.2&&(ue=6),player.on&&
!de&&
be>2.2&&
(smoke(player.x-3,player.y,3,-1),smoke(player.x+3,player.y,3,1)),(de=player.on),player.on||(be=player.vy),ue>0&&ue--,Te>0&&Te--);c2Update();const o=rooms[room];(player.x<=9&&
e<0&&
!cine&&
(o.L?((fadeTo=1),(onFaded=()=>enterRoom(o.L,"R"))):"stair"===room&&player.y<=44?((fadeTo=1),(onFaded=()=>enterRoom("pod","R"))):"stair"===room&&
player.y>=300&&
((fadeTo=1),(onFaded=()=>enterRoom("hall","R")))),player.x>=roomW()-9&&
e>0&&
(!o.R||(o.gate&&!o.gate(player))?"pod"===room&&exitOpen&&!won?((fadeTo=1),(onFaded=()=>{((stage=3),enterRoom("stair","L"));})):"hall"===room?((fadeTo=1),(onFaded=()=>{(enterRoom("stair","L"),(player.x=14),(player.y=304),(camY=216));})):"ware"===room?((fadeTo=1),(onFaded=()=>{(enterRoom("hall","L"),(player.x=40));})):"stair"===room&&
bossOpen&&
!cine&&
player.y>=300&&
((fadeTo=1),(onFaded=()=>enterRoom("exitlab","L"))):((fadeTo=1),(onFaded=()=>enterRoom(o.R,"L")))),"exitlab"===room&&bossDone&&!doorCut&&!won&&player.x>=roomW()-16&&e>0&&ne(),"outside"===room&&!doorCut&&player.x>=Ve.x/2-16&&ne(),D>0&&D--,"stair"===room&&
!bossOpen&&
!cine&&
player.y>=300&&
player.x>=175&&
e>0&&
0===D&&
((D=200),(shake=3),toast(hasGun?"<b>Sealed shut.</b> Step back and SHOOT the door (F / K).":"<b>The door to the EXIT LAB is sealed shut.</b><br>Fists won’t open it. Explore to the LEFT at the bottom of the stairs.",3200,)),"pod"===room&&
!exitOpen&&
player.x>=137&&
0===erode&&
(0!==stage||Tt?hasPotion||
tick%240!=0||
toast("Blocked! Find the chemicals and make a solvent.",2200):(fa(),(player.x=134))));}
function ne(){((doorCut=1),(keys.l=keys.r=keys.s=0),(player.vx=0),(player.walk=0),updateGuide(),(fadeTo=1),(onFaded=()=>{((GM.on=!1),cancelAnimationFrame(Ot),playDoorCut().then(()=>{e.hidden||
((GM.on=!0),(won=1),c2Save("street"),(qs("#gw").hidden=!1),c2WinFade(),(fadeNow=1),(fadeTo=1),(lt=0),(st=0),(Ot=requestAnimationFrame(frameLoop)));}));}));}
function physics(t){if(tnPhys())return;const x0=player.x;(c2Pre(),(player.x+=player.vx));const a=
"pod"!==room||exitOpen||0!==erode?"stair"===room&&!bossOpen&&player.y>=296?176:roomW()-6:141;((player.x=Math.max(8,Math.min(a,player.x))),c2Walls(x0),tnWalls(x0),(player.vy=player.climb?player.vy:Math.min(5,player.vy+0.24)));const e=player.y;((player.y+=player.vy),(player.on=!1));const o=floorY();if((player.y>=o&&
(player.vy>2.2&&($sx("land"),dustLand()),(player.y=o),(player.vy=0),(player.on=!0)),player.vy>=0&&!player.on))
for(const t of platforms())
if(e<=t.y+0.01&&player.y>=t.y&&player.x>t.x-3&&player.x<t.x+t.w+3){(player.vy>2.2&&($sx("land"),dustLand()),(player.y=t.y),(player.vy=0),(player.on=!0));break;}
(player.walk&&
player.on&&
tick%7==0&&
(tick%14||Math.abs(player.vx)<0.3||$sx("step"),parts.push({x:player.x-3*player.face*Po,y:player.y,vx:0.2*-player.face,vy:-0.1,life:10,c:"#aab4c4",s:0.5,})),(player.fr+=player.walk?0.16:0));}
function dustLand(){for(let t=0;t<7;t++)parts.push({x:player.x+1.7*(t-3),y:player.y,vx:0.2*(t-3),vy:-0.1-0.06*(t%2),g:0.012,life:16,c:t%2?"#aab4c4":"#8c97a8",s:0.8});}function se(t,a,e){return Math.abs(player.x-t)<e+3&&Math.abs(player.y-17.4-(a-6))<30;}
((qs("#gdR").onclick=()=>
(function(){if(tnIs(room))return void tnRetry();if(C2[room])return void c2Retry();if("fall"===Ue)
return((qs("#gd").hidden=!0),(dead=!1),(hp=5),(invuln=60),(player.x=_e[0]),(player.y=_e[1]),(player.vx=player.vy=0),(player.kb=0),void(shots=[]));((qs("#gd").hidden=!0),(dead=!1),(hp=5),(ammo=hasGun?4:0),(invuln=60),(player.x=24),(player.y=floorY()),(player.vx=player.vy=0),(player.kb=0),spawnBoss());})()),(qs("#gdM").onclick=()=>ee()),(qs("#gg h4").onclick=()=>{(qs("#gg").classList.toggle("min"),stage>=1&&qs("#gg").classList.contains("min"));}),(qs("#ggb").onclick=()=>{stage>=1&&!hasPotion&&!exitOpen&&fa();}),(qs("#cmix").onclick=function(){($sx("success"),(ga=[]),(pa=null),(b=g=!1),["water","hcl","h2o2","salt","strip"].forEach((t)=>{const a=inv.indexOf(t);a>=0&&inv.splice(a,1);}),inv.push("potion"),(hasPotion=!0),Ya("<b>SUCCESS! You made an eroding solvent.</b><br>Why it works: the <b>acid</b> (H⁺) takes electrons from iron, which is oxidation: Fe + 2HCl → FeCl₂ + H₂↑. The <b>peroxide</b> takes electrons too, so the metal dissolves faster. The <b>chloride</b> from the salt slips through the protective oxide layer, and pulls water out of the plant cells by osmosis. <b>Water</b> soaked up the heat, and your gear kept you safe. Now go pour it on the barricade!","good",),(qs("#cinv").hidden=!0),(qs("#cmix").disabled=!0),(qs("#cdone").textContent="TAKE POTION"),updateGuide(),updateBag());}),(qs("#cdone").onclick=Na),(qs("#cinv").addEventListener("click",phoneTap)),(qs("#cres").onclick=()=>{((ga=[]),(b=g=!1),(pa=null),Ya("Beakers emptied. Start again.",""));}),(window.__evoLeaveGo=()=>ee(),qs("#gq2").onclick=()=>(window.__evoAskLeave?window.__evoAskLeave(()=>ee()):ee())),(qs("#cskip").onclick=()=>skipCine()),(qs("#wMenu").onclick=()=>ee()),(qs("#wAgain").onclick=()=>{(clearCheckpoint(),resetGame(),$o());}),(qs("#ccb").onclick=Na));let ce=[],fx=[],hitStop=0,hurtFlash=0,de=!0,be=0,ue=0,Te=0,Se=92;function addFx(t){fx.push(Object.assign({t:0,life:20,a:1},t));}
function sparks(t,a,e,o,r,n,l){for(let s=0;s<e;s++){const e=6.283*Math.random(),c=r*(0.4+0.8*Math.random());addFx({k:"spark",x:t,y:a,vx:Math.cos(e)*c,vy:Math.sin(e)*c-0.3*r,g:n||0.12,c:o[s%o.length],life:((l||16)+10*Math.random())|0,});}}
function hitFx(t,a,e){($sx(e?"hitbig":"hit"),addFx({k:"flash",x:t,y:a,r:e?22:12,c:"255,240,190",a:e?0.9:0.6,life:e?10:6,}),addFx({k:"ring",x:t,y:a,r0:2,r1:e?20:11,c:"#fff4c8",life:e?14:10,sq:1,}),addFx({k:"star",x:t,y:a,r:e?11:6,life:e?8:6,c:"#ffffff"}),sparks(t,a,e?14:7,["#ffe070","#ffffff","#ffb030"],e?2.6:1.8,0.1,12),sparks(t,a,e?10:5,["#8aff9a","#c8ff70","#4ad860"],e?1.8:1.3,0.16,24));}
function smoke(t,a,e,o){$sx("poof");for(let r=0;r<e;r++)
addFx({k:"smoke",x:t+6*(Math.random()-0.5),y:a-1,vx:(o||2*(Math.random()-0.5))*(0.2+0.5*Math.random()),vy:-0.1-0.25*Math.random(),r:1.5+2*Math.random(),c:"170,180,196",life:(22+16*Math.random())|0,});}
const Ne={hall:["255,220,170",0,1],ware:["255,220,170",0,1],pod:["120,255,190",1,1],lab:["255,220,150",0,1],store:["255,230,170",0,1],med:["200,240,255",0,1],cafe:["255,236,170",1,1],stair:["190,255,210",1,1],exitlab:["170,255,200",1,1],outside:["255,246,206",1,0],},De={hall:{c:"110,130,120",l:"255,220,170",a:0.16,dk:0.32},ware:{c:"150,120,70",l:"255,224,160",a:0.17,dk:0.32},pod:{c:"60,150,100",l:"160,255,190",a:0.2,dk:0.34},lab:{c:"80,130,170",l:"200,230,255",a:0.16,dk:0.3},store:{c:"190,160,80",l:"255,230,160",a:0.15,dk:0.3},med:{c:"130,190,215",l:"230,250,255",a:0.12,dk:0.24},cafe:{c:"170,140,80",l:"255,235,170",a:0.15,dk:0.3},stair:{c:"60,140,125",l:"170,255,215",a:0.2,dk:0.34},exitlab:{c:"70,180,100",l:"200,255,190",a:0.22,dk:0.32},outside:{c:"120,160,160",l:"255,246,206",a:0.1,dk:0.2},};function updateHud(){const a=
"stair"===room||"exitlab"===room||"hall"===room||"ware"===room||!!C2[room]||tnIs(room);((qs("#gl").innerHTML=a?Array.from({length:5},(t,a)=>hp-a===0.5?'<span class="hh">♥</span>':'<span style="color:'+(a<hp?"#ff4a5a":"#3a2a3a")+'">♥</span>',).join(""):""),(qs("#ga").innerHTML=hasGun?'<img src="'+s("blaster","#b06aff")+'"> x'+(Eo.ammo?"∞":ammo):""),(qs("#bS").style.display=hasGun?"grid":"none"),(qs("#gb").hidden=!(snakeBoss&&"exitlab"===room&&"dead"!==snakeBoss.st&&!cine)),(qs("#gbf").style.width=Math.max(0,snakeBoss?snakeBoss.hp:0)+"%"));}
function skipCine(){cine&&
((bossOpen=!0),(corrode=1),(cine=null),(qs("#cskip").hidden=!0),(fadeNow=Math.max(fadeNow,0.2)),(fadeTo=1),(onFaded=()=>{((minis=[]),(snakeBoss=null),enterRoom("exitlab","L"),updateGuide());}));}
function updateMinis(){const t=floorY(),a=snakeBoss;minis=minis.filter((e)=>{if((e.t++,e.hurt>0&&e.hurt--,e.cd>0&&e.cd--,e.t<34))return!0;if(e.roam)
return((e.x+=0.32*e.face),(e.x<70||e.x>roomW()-60||r(e.t,0|e.x)<0.012)&&(e.face*=-1),(e.x=Math.max(64,Math.min(roomW()-54,e.x))),!0);const o=player.x-e.x;return(e.kb||(e.face=o>0?1:-1),e.kb?((e.x+=e.kb),(e.kb*=0.82),Math.abs(e.kb)<0.15&&(e.kb=0)):(e.x+=e.face*(0.5+(a&&a.hp<50?0.18:0)+(Math.abs(o)<26?0.25:0))),(e.x=Math.max(6,Math.min(roomW()-6,e.x))),Math.abs(o)<7&&
player.y>t-14&&
e.cd<=0&&
!dead&&
(hurtPlayer(1),(e.cd=70),(e.kb=2.6*-e.face)),!(e.hp<=0&&
(sparks(e.x,t-3,14,["#8aff6a","#d8ff9a","#5a3a22"],1.8,0.14,20),addFx({k:"ring",x:e.x,y:t-2,r0:2,r1:10,c:"#d8ff9a",life:12}),drops.push({x:e.x,y:t-4,vy:-1.8,t:0}),1)));});}
function hitMinis(t,a,e,o){let r=!1;const n=floorY();return(minis.forEach((l)=>{l.t<34||
l.hp<=0||
(Math.abs(t-l.x)<8&&
a>n-20&&
((l.hp-=e),(l.hurt=8),(l.kb=3*o),(r=!0),hitFx(l.x,n-3,0)));}),r);}
const $DL=[[0,0,"","THE FIRE EXIT. SEALED FROM THE OTHER SIDE."],[0,75,"","SOMETHING IS SCRATCHING BACK."],[0,150,"p","...Okay. Let's see what this venom can do."],[1,0,"","THE VENOM EATS THROUGH THE STEEL."],[1,80,"p","Come on... come on..."],[1,128,"",""],[2,0,"",""],[3,80,"","THE DOOR BUCKLES... AND GIVES."],[4,0,"p","...Here goes nothing."],[5,36,"p","Snakes... everywhere."],[5,135,"","THEY DON'T MOVE LIKE ANIMALS. THEY MOVE LIKE THEY'RE WAITING."],[5,235,"p","Stay quiet. Just keep walking."],[6,16,"p","And what is THAT?"],[6,84,"","A TAIL. THICKER THAN A TREE TRUNK."],[7,12,"p","It's... enormous."],[8,55,"p","...It was only the tail."],[8,108,"","THEN WHY IS THE FLOOR STILL SHAKING?"],[8,152,"p","Oh no."],[9,0,"",""],];let $TT=null;const $dk=(a,b,x)=>Math.max(0,Math.min(1,(x-a)/(b-a)));function $dSay(d,w,x){((d.who=w),(d.txt=x),(d.cp=0),(d.lc=0));}
function $dT(a){const d=
a.d||
(a.d={z:1,fx:96,fy:54,tz:1,tfx:96,tfy:54,cx:null,bar:0,tbar:1,who:"",txt:"",cp:0,lc:0,fl:0,flc:"255,255,255",red:0,warn:0,eyes:0,eyes2:0,imp:0,hits:0,fired:{},});const ph=a.ph,t=a.t,ev=(p,n,fn)=>{const k="E"+p+"_"+n;ph===p&&t===n&&!d.fired[k]&&((d.fired[k]=1),fn());};$DL.forEach((L,i)=>{const k="L"+i;L[0]===ph&&L[1]===t&&!d.fired[k]&&((d.fired[k]=1),$dSay(d,L[2],L[3]));});const dx=185.5-camX,dy=284-camY,px=player.x-camX,py=player.y-22-camY,rnd=Math.random;let tz=1,tx=96,ty=54,boss=null;if(ph===0){((tz=1.08+0.22*$dk(0,230,t)),(tx=0.55*dx+0.45*px),(ty=0.55*dy+0.45*py),(d.red=0.5+0.5*Math.sin(tick/9)),ev(0,18,()=>{($sx("scratch"),(shake=Math.max(shake,2)),(d.eyes=1));}),ev(0,60,()=>{d.eyes=0;}),ev(0,84,()=>{($sx("scratch"),(d.eyes=1));}),ev(0,104,()=>$sx("scratch")),ev(0,130,()=>{((d.eyes=0),$sx("creak"));}),t>=70&&t%52==0&&$sx("heart"));}else if(ph===1){((tz=1.3+0.25*$dk(0,145,t)),(tx=dx),(ty=dy),(d.red=0.4+0.4*Math.sin(tick/9)),t%14==0&&$sx("sizzle"),t%3==0&&
addFx({k:"smoke",x:182+6*rnd(),y:284+10*(rnd()-0.5),vx:-0.15,vy:-0.4-0.3*rnd(),r:1.5+2*rnd(),c:"170,255,190",life:26,}),t%8==0&&sparks(185.5,284,2,["#b06aff","#e8d0ff"],1,0.08,12),ev(1,55,()=>{($sx("creak"),(shake=Math.max(shake,3)));}),ev(1,100,()=>{($sx("creak"),(shake=Math.max(shake,4)));}),t>110&&t%10==0&&(shake=Math.max(shake,3)),t%52==0&&$sx("heart"));}else if(ph===2){((tz=1.15),(tx=0.6*px+0.4*dx),(ty=0.6*py+0.4*dy),(d.red=0.25+0.2*Math.sin(tick/9)));}else if(ph===3){((tz=1.3),(tx=0.5*(dx+px)),(ty=0.5*(dy+py)),(d.red=0.3));if(a.hits>d.hits){d.hits=a.hits;const n=a.hits;((d.imp=0.1+0.06*n),(d.z+=d.imp),(d.fl=3===n?1:0.28),(d.flc=3===n?"210,255,220":"255,240,200"),$sx("doorhit"),$sx("debris"));for(let i=0;i<10+6*n;i++)
parts.push({x:181+8*rnd(),y:270+30*rnd(),vx:(rnd()-0.15)*(1+n),vy:-2*rnd(),g:0.12,life:40,c:i%2?"#6a7884":"#3a444c",s:1.5,});(addFx({k:"ring",x:187,y:285,r0:3,r1:14+10*n,c:"#d8ffd8",life:14}),3===n&&
((hitStop=Math.max(hitStop,12)),(shake=26),(d.tz=1),addFx({k:"ring",x:187,y:285,r0:4,r1:46,c:"#ffffff",life:20}),addFx({k:"flash",x:187,y:285,r:40,c:"200,255,200",a:0.9,life:14})));}}else if(ph===4||ph===45){((tz=1.05),(tx=px),(ty=py),(d.red=0));}else if(ph===5){((tz=1.04),(tx=px),(ty=py));ev(5,0,()=>{((roomBanner=0),($TT={a:"EXIT LAB",b:"WHERE CONTAINMENT FAILED",t:0,c:"#ffe070"}),(d.eyes2=1),$sx("title"));});const far=Math.max(0,roomW()-192),fol=Math.max(0,Math.min(far,player.x-96)),bell=Math.sin(Math.PI*$dk(20,150,t));d.cx=t>=20&&t<=150?fol+(far-fol)*bell:null;}else if(ph===6){((d.cx=t>=8?Math.max(0,roomW()-192):null),(tz=1.05+0.15*$dk(0,90,t)),(tx=96),(ty=70));(ev(6,0,()=>{($sx("stinger"),$sx("rumble"),(d.fl=0.35),(d.flc="255,60,60"));}),ev(6,40,()=>$sx("slither")),t%4==0&&
parts.push({x:camX+192*rnd(),y:camY+2,vx:0.2*(rnd()-0.5),vy:0.4+0.4*rnd(),g:0.01,life:70,c:"#8a8a7a",s:1,}),(shake=Math.max(shake,2)),t%36==0&&$sx("heart"));}else if(ph===7){((d.cx=null),(tz=1.1),(tx=px),(ty=py),t%30==0&&$sx("heart"),t%5==0&&
parts.push({x:camX+192*rnd(),y:camY+2,vx:0.2*(rnd()-0.5),vy:0.4+0.4*rnd(),g:0.01,life:70,c:"#8a8a7a",s:1,}));}else if(ph===8){const bx=0.6*roomW()-camX,by=floorY()-30-camY,p=$dk(110,190,t);((tz=1.05+0.4*p),(tx=px*(1-p)+bx*p),(ty=py*(1-p)+by*p));(ev(8,100,()=>$sx("rumble")),ev(8,122,()=>{((d.warn=70),$sx("siren"));}),ev(8,172,()=>{((d.fl=0.6),(d.flc="255,80,80"),$sx("stinger"));}),t>=100&&
((shake=Math.max(shake,Math.min(10,2+(t-100)/10))),t%3==0&&
parts.push({x:camX+192*rnd(),y:camY+2,vx:0.3*(rnd()-0.5),vy:0.5+0.5*rnd(),g:0.02,life:70,c:"#9a9a8a",s:1+(rnd()<0.3),})));}else if(ph===9){try{snakeBoss&&(boss=snakePose(snakeBoss).head);}catch(e){}
const mt2=snakeBoss?snakeBoss.t:0;(boss?((tx=boss.x-camX),(ty=boss.y-camY),(tz=mt2>=165?1.05:1.45+0.35*$dk(0,150,mt2))):((tx=px),(ty=py),(tz=1.2)),mt2===2&&!d.fired.b2&&((d.fired.b2=1),$sx("rumble")),mt2>=20&&
mt2<150&&
mt2%6==0&&
((shake=Math.max(shake,8)),parts.push({x:snakeBoss.x+30*(rnd()-0.5)*2,y:floorY()-2,vx:2*(rnd()-0.5),vy:-1-2*rnd(),g:0.1,life:30,c:"#aab4c4",s:1.5,})),mt2===60&&
!d.fired.b60&&
((d.fired.b60=1),$sx("slam"),(shake=Math.max(shake,14)),boss&&
addFx({k:"ring",x:boss.x,y:floorY(),r0:4,r1:60,c:"#ffe0a0",life:20,sq:0.2,})),mt2===120&&
!d.fired.b120&&
((d.fired.b120=1),$sx("roar"),$sx("slam"),$sx("title"),(shake=30),(d.fl=0.85),(d.flc="255,255,255"),(d.imp=0.45),(d.z+=0.45),($TT={a:"MUTATED SNAKE",b:"GUARDIAN OF THE EXIT",t:0,c:"#ff5a6a",boss:1}),boss&&
[0,1,2].forEach((i)=>
addFx({k:"ring",x:boss.x,y:boss.y,r0:3+3*i,r1:50+22*i,c:i?"#ff9a9a":"#ffffff",life:22+8*i,}),)),mt2>=170&&(d.tbar=0));}
((d.tz=tz),(d.tfx=ph<=3?192:0.55*tx+0.45*96),(d.tfy=ph<=3?0.5*ty+0.5*54:0.55*ty+0.45*54));const k=0.07;((d.z+=(d.tz-d.z)*k),(d.fx+=(d.tfx-d.fx)*k),(d.fy+=(d.tfy-d.fy)*k),(d.bar+=(d.tbar-d.bar)*0.07),(d.fl*=0.9),d.warn>0&&d.warn--);if(d.txt&&d.cp<d.txt.length){d.cp+=0.85;const c=Math.floor(d.cp);for(;d.lc<c;d.lc++)$sx("blip",d.who,d.txt[d.lc]);}}
function $dTitle(){const c=$TT;if(!c)return;const u=++c.t;if(u>200){$TT=null;return;}
const al=Math.min(1,u/12,(200-u)/20);if(al<=0)return;const hh=c.boss?30:24,fs=c.boss?9:8,f=fs+'px "Press Start 2P",monospace';(ctx.save(),(ctx.globalAlpha=al),fill("rgba(0,0,0,.55)",0,40,192,hh),fill(c.c,0,40,192,0.5),fill(c.c,0,40+hh-0.5,192,0.5));const n=Math.min(c.a.length,Math.floor(u/3)),s=c.a.slice(0,n),x=Math.round(96-(fs*c.a.length)/2);(text(s,x+1,(c.boss?45:46)+1,"#000",f),text(s,x,c.boss?45:46,c.boss?"#ffffff":"#fff6d0",f));if(u>26){const b=c.b.slice(0,Math.floor((u-26)/2));text(b,Math.round(96-2*c.b.length),c.boss?61:58,c.c,'4px "Press Start 2P",monospace',);}
ctx.restore();}
function $dCam(){const d=cine.d;(ctx.translate(d.fx,d.fy),ctx.scale(d.z,d.z),ctx.translate(-d.fx,-d.fy));}
function $dOv(){const a=cine,d=a.d;if(!d){(fill("#000",0,0,192,10),fill("#000",0,98,192,10));return;}
const ph=a.ph,T=tick;if(d.eyes&&ph<=1)
for(const[ox,sl]of[[182,0],[187.5,1],]){const ex=ox-camX,ey=274-camY,bl=(T>>3)%9==0?0:1;(glow(ex+1.5,ey+1,8,"255,190,30",0.55),bl&&
(fill("#ffd23a",ex,ey,3,2),fill("#fff2a0",ex,ey,3,0.5),fill("#1a0a00",ex+1.2,ey,0.7,2)));}
if(d.eyes2&&room==="exitlab")
for(let i=0;i<14;i++){const x=24+r(i,81)*400,y=14+r(i,82)*84,bl=((T>>3)+i*7)%23==0?0:1,al=(0.25+0.25*Math.sin(T/40+i))*bl;if(al<=0.02)continue;const ex=x-camX,ey=y-camY;((ctx.globalAlpha=al),fill(i%3?"#ffd23a":"#ff4a3a",ex,ey,1.5,1),fill(i%3?"#ffd23a":"#ff4a3a",ex+3.5,ey,1.5,1),(ctx.globalAlpha=1));}
if(room==="exitlab"&&((ph===8&&a.t>110)||ph===9)){const p=ph===9?1:$dk(110,190,a.t),bx=0.6*roomW()-camX,y=floorY()-camY+1;glow(bx,y,34,"90,255,140",0.28*p);for(let i=0;i<16;i++){const ox=(i-8)*4+3*Math.sin(i*2.3),len=3+4*r(i,5)*p;(fill("#04060a",bx+ox,y,1.5,len*p*(0.5+r(i,6))),fill("#04060a",bx+ox+1,y+len*0.5*p,1,len*0.5*p));}}
(ctx.save(),ctx.translate(d.fx,d.fy),ctx.scale(1/d.z,1/d.z),ctx.translate(-d.fx,-d.fy));if(d.fl>0.01)
((ctx.fillStyle="rgba("+d.flc+","+Math.min(1,d.fl).toFixed(3)+")"),ctx.fillRect(0,0,192,108));if(d.red>0&&ph<=3)
((ctx.fillStyle="rgba(255,20,40,"+(0.05+0.09*d.red).toFixed(3)+")"),ctx.fillRect(0,0,192,108));{const g=ctx.createRadialGradient(96,54,34,96,54,118);(g.addColorStop(0,"rgba(0,0,0,0)"),g.addColorStop(1,"rgba(0,0,10,"+(0.45+0.15*Math.sin(T/20)).toFixed(2)+")"),(ctx.fillStyle=g),ctx.fillRect(0,0,192,108));}
if(d.warn>0){const w=d.warn,al=Math.min(1,w/10,(70-w)/8),off=(T*1.6)%16;((ctx.globalAlpha=Math.max(0,al)*0.92),fill("#1a0508",0,36,192,22));for(let i=-1;i<14;i++)
(fill("#ffcc20",i*16+off-16,36,8,2),fill("#ffcc20",i*16-off+16,56,8,2));if((T>>2)%2){text("WARNING",96-14*3.5,41,"#ff3a3a",'7px "Press Start 2P",monospace');text("BIOHAZARD SIGNATURE DETECTED",96-28*2,51,"#ffd0d0",'4px "Press Start 2P",monospace',);}
ctx.globalAlpha=1;}
$dTitle();const Bh=Math.round(13*Math.max(0,d.bar));if(Bh>0){(fill("#000",0,0,192,Bh),fill("#000",0,108-Bh,192,Bh),fill("rgba(255,255,255,.12)",0,108-Bh,192,0.5),fill("rgba(255,255,255,.12)",0,Bh-0.5,192,0.5));if(d.txt&&Bh>=12){const f='4px "Press Start 2P",monospace',pl=d.who==="p",nm=pl?String(playerName||"YOU").toUpperCase().slice(0,10):"",pre=pl?nm+": ":"",cap1=46-pre.length,words=d.txt.split(" "),rows=["",""];let ri=0;for(const w of words){const lim=ri?46:cap1;if((rows[ri]+(rows[ri]?" ":"")+w).length>lim&&ri<1)ri++;rows[ri]+=(rows[ri]?" ":"")+w;}
const full=pre+rows[0]+(rows[1]?"\n"+rows[1]:""),n=Math.floor(d.cp)+(pl?pre.length:0);let y0=108-Bh+2.5,sh=0;const col=pl?"#e8f2ff":"#b8c8ff",tx0=pl?0:Math.round(96-2*Math.max(rows[0].length,rows[1].length));const draw=(s,x,y,c)=>{(text(s,x+1,y+1,"#000",f),text(s,x,y,c,f));};const r0=pre+rows[0],r0v=r0.slice(0,Math.max(0,n)),r1v=rows[1].slice(0,Math.max(0,n-r0.length));if(pl){draw(r0v.slice(0,pre.length),4,y0,"#9aff9a");draw(r0v.slice(pre.length),4+4*pre.length,y0,col);}else draw(r0v,tx0,y0,col);rows[1]&&draw(r1v,pl?4:tx0,y0+5,col);}}
ctx.restore();}
function spawnBoss(){($sx("roar"),fo(),(minis=[]),(drops=[]),hasGun&&(ammo=4),(camY=54),(snakeBoss={x:0.6*roomW(),sp:0,hp:100,st:"intro",t:0,face:-1,flash:0,last:"",hit:0,}),(venoms=[]),(ce=[]),(waves=[]),(shots=[]),cine||toast("<b>A GIANT MUTATED SNAKE!</b>",2600),updateHud());}
function hurtPlayer(a){if(invuln>0||dead||Eo.god)return;((hp-=a),(invuln=70),(hurtFlash=14),(hitStop=3),$sx("hurt"),addFx({k:"ring",x:player.x,y:player.y-17.4,r0:2,r1:14,c:"#ff6a7a",life:12}),sparks(player.x,player.y-17.4,8,["#ff4a5a","#ffb0b8"],1.8,0.12,14));const e=player.x<(snakeBoss?snakeBoss.x:96)?-1:1;((player.kb=10),(player.kbv=2.2*e),(player.vy=-2.4),(player.on=!1),(shake=8));for(let t=0;t<8;t++)
parts.push({x:player.x,y:player.y-17.4,vx:2*(r(t,1)-0.5),vy:2*-r(t,2),g:0.1,life:20,c:"#ff4a5a",s:1.5,});(updateHud(),hp<=0&&
((hp=0),(dead=!0),$sx("die"),(Ue="boss"),(qs("#gd").querySelector("h3").textContent="YOU DIED"),(qs("#gd").querySelector("p").textContent=
"The snake got you. Tips: jump over the ground shockwaves, dodge the venom (watch for the red circles), shoot from range, and punch it while it is stunned after a charge."),updateHud(),(qs("#gd").hidden=!1)));}
let Ue="boss",Je=0,Xe=0,Qe=!0,Ze=24,$e=[24,40],_e=[24,40];function hitBoss(t){const a=snakeBoss;if(a&&"dead"!==a.st&&"intro"!==a.st){("stun"===a.st&&(t*=1.5),Eo.one&&(t=9999),(a.hp-=t),(a.flash=6),$sx("bosshit"));for(let t=0;t<5;t++)
parts.push({x:a.x+10*a.face+20*(r(t,a.hp)-0.5),y:floorY()-40-30*r(t,2),vx:2*(r(t,3)-0.5),vy:1.5*-r(t,4),g:0.08,life:22,c:t%2?"#8aff9a":"#c8ff70",s:1.5,});if(a.hp<=0){((a.hp=0),(a.st="dead"),(a.t=0),$sx("bossdie"),(shake=30),(venoms=[]),(waves=[]),minis.forEach((t)=>{sparks(t.x,floorY()-3,12,["#8aff6a","#d8ff9a"],1.8,0.14,20);}),(minis=[]),(hitStop=14));const t=snakePose(a).head;for(let a=0;a<3;a++)
addFx({k:"ring",x:t.x,y:t.y,r0:3+4*a,r1:40+16*a,c:a?"#8aff9a":"#ffffff",life:24+8*a,});(addFx({k:"flash",x:t.x,y:t.y,r:60,c:"200,255,190",a:1,life:22}),sparks(t.x,t.y,40,["#8aff9a","#c8ff70","#ffffff","#4ad860"],3,0.12,34));}
updateHud();}}
const ro=(t,a,e)=>t+(a-t)*Math.max(0,Math.min(1,e)),no=(t)=>[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16),],lo=(t)=>t-Math.floor(t);((t)=>{const a={};for(const e in t)a[e]=t[e].map(no);})({HIDE:["#100a0a","#201616","#342824","#4c3e36","#66564a","#82725e"],SAD:["#060404","#100a0a","#1c1212","#2a1c1a","#3a2a24","#4e3a30"],MAR:["#14040a","#2a0810","#461018","#641a20","#82282a","#9e3a36"],EYE:["#3a0000","#760606","#b41212","#e2321e","#ff6a48","#ffd0b8"],OCH:["#3a2e26","#665846","#94846c","#bcab8c","#d8caa8","#f0e6c8"],BEL:["#2a2220","#4a403a","#786c5e","#a69882","#cec0a4","#ece2c8"],FLE:["#18040e","#360a1a","#5c1226","#882232","#b23e40","#da6a50"],BON:["#1e1626","#3c3040","#665a5e","#968a7e","#c8bca2","#f2e8ca"],MEM:["#100814","#200e22","#361830","#4e2438","#6a3640","#8a4e46"],GLW:["#5a2400","#a65400","#e08c12","#ffbe36","#ffe07a","#fff6cc"],VIN:["#08160e","#10281a","#1a3e24","#28582e","#3a7234","#56903e"],MOU:["#1a0610","#3a0e1c","#64263a","#94485a","#c06c7c","#e8a0aa"],});const so={body:"@@DATAURI:png:boss-snake-body.png@@",head:"@@DATAURI:png:boss-snake-head.png@@",m:{w:304,h:150,head:{x:0,y:2,w:71,h:57},pivot:[66,22],mouth:[10,34],eye:[26,18],hc:[27,26],sparks:[[126,43],[111,124],[284,55],],},},co=0.4;let io=null;function fo(){if(io)return io;const t=new Image(),a=new Image();io={b:t,h:a,mask:null,white:null};const e=()=>{if(!t.complete||!a.complete||!t.naturalWidth||!a.naturalWidth||io.mask)return;const e=so.m,o=document.createElement("canvas");((o.width=e.w),(o.height=e.h));const r=o.getContext("2d");(r.drawImage(t,0,0),r.drawImage(a,e.head.x,e.head.y));const n=r.getImageData(0,0,e.w,e.h).data,l=new Uint8Array(e.w*e.h);for(let t=0;t<l.length;t++)l[t]=n[4*t+3]>100?1:0;const s=(t)=>{const a=document.createElement("canvas");((a.width=t.naturalWidth),(a.height=t.naturalHeight));const e=a.getContext("2d");return(e.drawImage(t,0,0),(e.globalCompositeOperation="source-atop"),(e.fillStyle="#fff"),e.fillRect(0,0,a.width,a.height),a);};((io.white={b:s(t),h:s(a)}),(io.mask=l));};return((t.onload=e),(a.onload=e),(t.src=so.body),(a.src=so.head),io);}
function snakePose(t){const a=so.m,e=(function(t){const a=t.t,e=t.st;let o=0,r=0,n=0,l=0;if("intro"===e){const t=Math.min(1,a/(cine?150:100));((l=80*(1-t)),(o=0.12*Math.sin(a/7)*(1-t)));}else if("slam"===e)
if(a<46){const t=a/46;((o=0.3*t),(n=-6*t));}else if(a<54){const t=(a-46)/8;((o=0.3-0.68*t),(n=14*t-6));}else{const t=Math.min(1,(a-54)/26);((o=-0.38*(1-t)),(n=8*(1-t)));}
else if("throw"===e)
((o=0.1*Math.min(1,a/20)),[30,44,58].forEach((t)=>{a>=t&&a<t+7&&((o=-0.06),(r=-8*Math.sin(((a-t)/7)*Math.PI)));}));else if("charge"===e)
a<40?((o=-0.1),(r=a%4<2?1:-1)):((o=-0.14),(r=-3));else if("stun"===e)o=0.04*Math.sin(tick/6)-0.3;else if("dead"===e){const t=Math.min(1,a/120);((o=-0.45*t),(l=22*t));}else if("walk"===e)
((o=0.05*Math.sin(tick/8)),(n=1.4*Math.sin(tick/8+1.2)));else"tail"===e?(l=cine?cine.sink:22):(o=0.035*Math.sin(tick/30));if("walk"===e||"throw"===e||"charge"===e)
o+=0.12*Math.max(0,Math.min(1,(floorY()-player.y)/50));const fl=(t.flash||0)/6;((o+=0.14*fl),(n-=4*fl),(r+=3*fl));return{hr:o,hdx:r,hdy:n,sink:l,br:"walk"===e?4*Math.sin(tick/8):Math.sin(tick/24),};})(t),o=t.face>0?-1:1,r=a.w/2,n=floorY()+1+e.sink,l=(t,o)=>{const r=t-a.pivot[0],n=o-a.pivot[1],l=Math.cos(e.hr),s=Math.sin(e.hr);return[a.pivot[0]+r*l-n*s+e.hdx,a.pivot[1]+r*s+n*l+e.hdy];},s=(e,l)=>({x:t.x+o*(e-r)*co,y:n+(l-a.h)*co});return{b:t,p:e,mir:o,cx:r,by:n,W:s,mouth:s(...l(...a.mouth)),tip:s(...l(a.mouth[0]-20,a.mouth[1])),eye:s(...l(...a.eye)),head:s(...l(...a.hc)),f:-o,};}
const bo=(t)=>t.x+46*(t.face>0?1:-1);function snakeHit(t,a,e){const o=fo(),r=so.m;if(!o.mask)return Math.abs(t-e.x)<48&&a>floorY()-50;const n=snakePose(e),l=n.cx+(t-e.x)/(n.mir*co),s=r.h+(a-n.by)/co,c=(t,a)=>((a|=0),(t|=0)>=0&&a>=0&&t<r.w&&a<r.h&&1===o.mask[a*r.w+t]),i=(t,a)=>t>=r.head.x&&t<r.pivot[0]+4&&a>=r.head.y&&a<r.head.y+r.head.h,f=l-r.pivot[0]-n.p.hdx,h=s-r.pivot[1]-n.p.hdy,d=Math.cos(-n.p.hr),b=Math.sin(-n.p.hr),g=r.pivot[0]+f*d-h*b,p=r.pivot[1]+f*b+h*d;return!(!i(g,p)||!c(g,p))||(!i(l,s)&&c(l,s));}
let po=null,uo=null,yo=null;function drawSnake(t,a){const e=fo(),o=so.m,n=snakePose(t),l=n.p,s=floorY();return e.mask?(ctx.save(),(ctx.globalAlpha=a),(ctx.imageSmoothingEnabled=!1),("intro"!==t.st&&"dead"!==t.st)||
(ctx.beginPath(),ctx.rect(-400,-400,roomW()+800,s+1.5+400),ctx.clip()),"tail"===t.st&&
(ctx.beginPath(),ctx.rect(t.x+19,-400,400,s+1.5+400),ctx.clip()),ctx.translate(t.x,n.by),ctx.scale(n.mir*co,co*(1+0.012*l.br)),ctx.translate(-n.cx,-o.h),ctx.drawImage((function(t,a){const e=io,o=so.m,r=t.p;po||
((po=document.createElement("canvas")),(po.width=o.w),(po.height=o.h),(uo=document.createElement("canvas")),(uo.width=o.w),(uo.height=o.h));const n=po.getContext("2d"),l=uo.getContext("2d"),s=(function(t){const a=t.st,e=t.t,o=tick;let r=1.4,n=1.1,l=0.055,s=0,c=0,i=0;if("walk"===a)((r=4),(n=2.6),(l=0.2));else if("intro"===a){const t=Math.min(1,e/(cine?150:100));((r=1.6+3.4*(1-t)),(n=1.2+3*(1-t)),(l=0.16));}else if("slam"===a)
if(e<46)((s=(0.07*e)/46),(i=(-4*e)/46),(r=1));else{const t=Math.max(0,1-(e-46)/22);((s=-0.09*t),(i=3*t),(r=2.6));}
else if("throw"===a)
((r=1.6),(l=0.08),(s=[30,44,58].some((t)=>e>=t&&e<t+7)?-0.03:0.02));else if("charge"===a)
e<40?((s=0.05),(r=1+0.5*Math.sin(e))):((s=-0.08),(r=2.8),(l=0.24));else if("stun"===a)((r=0.7),(n=0.9),(l=0.025));else if("tail"===a)
((r=2+(cine?cine.tw:0)),(n=1.6+0.6*(cine?cine.tw:0)),(l=0.1+0.04*(cine?cine.tw:0)));else if("dead"===a){const t=Math.min(1,e/120);((r=0.5*(1-t)),(n=0.4*(1-t)),(c=t));}
return(t,a,e)=>{const f=Math.max(0,1-a/(0.86*e)),h=f*f,d=t>210&&a<90?1.7:1,b=
r*f*Math.sin(0.045*t-o*l)*d+
i*h+
c*h*22+
Math.sin(0.05*o)*h*0.8,g=n*f*Math.sin(0.07*a-o*l*0.8+0.012*t)*d+s*(e-a)*f;return[Math.round(g),Math.round(b)];};})(t.b),c=s(o.pivot[0],o.pivot[1],o.h);if(((l.imageSmoothingEnabled=!1),l.clearRect(0,0,o.w,o.h),((t)=>{(!(function(t,a,e,o,r){for(let n=0;n<r;n+=6)
for(let l=0;l<o;l+=6){const s=e(l+3,n+3,r),c=Math.min(7,o-l),i=Math.min(7,r-n);t.drawImage(a,l,n,c,i,l+s[0],n+s[1],c,i);}})(t,e.b,s,o.w,o.h),t.save(),t.translate(o.pivot[0]+r.hdx+c[0],o.pivot[1]+r.hdy+c[1]),t.rotate(r.hr),t.drawImage(e.h,o.head.x-o.pivot[0],o.head.y-o.pivot[1]),t.restore());})(l),(n.imageSmoothingEnabled=!1),(n.globalCompositeOperation="source-over"),n.clearRect(0,0,o.w,o.h),n.drawImage(uo,0,0),(n.globalCompositeOperation="multiply"),(n.fillStyle="#d4e4da"),n.fillRect(0,0,o.w,o.h),(n.globalCompositeOperation="destination-in"),n.drawImage(uo,0,0),(n.globalCompositeOperation="source-atop"),!yo)){const t=n.createLinearGradient(0,0.3*o.h,0,o.h);(t.addColorStop(0,"rgba(2,12,8,0)"),t.addColorStop(1,"rgba(2,12,8,.34)"));const a=n.createLinearGradient(0,0,0,0.55*o.h);(a.addColorStop(0,"rgba(200,255,220,.16)"),a.addColorStop(1,"rgba(190,255,210,0)"),(yo={lo:t,hi:a}));}
return((n.fillStyle="rgba(70,170,120,.07)"),n.fillRect(0,0,o.w,o.h),(n.fillStyle=yo.lo),n.fillRect(0,0,o.w,o.h),(n.fillStyle=yo.hi),n.fillRect(0,0,o.w,o.h),a&&((n.fillStyle="rgba(255,255,255,"+a+")"),n.fillRect(0,0,o.w,o.h)),(n.globalCompositeOperation="source-over"),po);})(n,t.flash>0?(0.6*t.flash)/6:0),0,0,),ctx.restore(),snakeFace(t,n,a),"dead"!==t.st&&
"tail"!==t.st&&
o.sparks.forEach((t,e)=>{const o=n.W(t[0],t[1]);if((tick+9*e)%29<6){for(let t=0;t<6;t++)
fill(t%2?"#bfe8ff":"#ffffff",o.x+6*(r(t,tick+e)-0.5),o.y+5*(r(t+5,tick+e)-0.5),0.5,0.5,);glow(o.x,o.y,7,"150,210,255",0.7*a);}}),n):n;}
function snakeFace(t,n,al){const st=t.st,k=tick+37;if("dead"===st||"tail"===st)return;const e=n.eye,angry=("charge"===st&&t.t<40)||("throw"===st&&t.t<30);glow(e.x,e.y,angry?7:4+Math.sin(tick/9),"255,70,40",(angry?0.8:0.4)*al);k%230<7&&"stun"!==st&&fill("#1c2a1e",e.x-1.8,e.y-1.4,3.6,2.8);let ext=0;if("stun"===st)ext=0.55;else if(angry)ext=0.75+0.25*Math.sin(tick/1.6);else{const u=k%("walk"===st?110:150);u<24&&(ext=Math.abs(Math.sin((u/24)*2*Math.PI)));}
if(ext<0.08||"intro"===st)return;const m=n.mouth,dx=n.tip.x-m.x,dy=n.tip.y-m.y,d=Math.hypot(dx,dy)||1,ux=dx/d,uy=dy/d+("stun"===st?0.6:0),L=8*ext,w="stun"===st?0:Math.sin(tick/1.3)*0.8,x1=m.x+ux*L,y1=m.y+uy*L+w;((ctx.globalAlpha=al),(ctx.lineCap="round"),(ctx.strokeStyle="#8a1424"),(ctx.lineWidth=1.1),ctx.beginPath(),ctx.moveTo(m.x,m.y),ctx.quadraticCurveTo(m.x+ux*L*0.5,m.y+uy*L*0.5-w,x1,y1),ctx.lineTo(x1+ux*2.4-uy*1.3,y1+uy*2.4+ux*1.3),ctx.moveTo(x1,y1),ctx.lineTo(x1+ux*2.4+uy*1.3,y1+uy*2.4-ux*1.3),ctx.stroke(),(ctx.strokeStyle="#ff5a6a"),(ctx.lineWidth=0.4),ctx.beginPath(),ctx.moveTo(m.x,m.y-0.2),ctx.lineTo(x1,y1-0.2),ctx.stroke(),(ctx.lineCap="butt"),(ctx.globalAlpha=1));}
function Mo(t,a,e,o){const r=floorY(),n=0.5+0.5*Math.sin(tick/(e>0.6?1.6:3.5)),l=0.35+0.55*e,s=0.3*a;ctx.globalAlpha=l*(0.1+0.08*n);for(let e=0;e<8;e++)fill("#ff2020",t-0.55*a+e*a*0.14,r-26,0.12*a,26);ctx.globalAlpha=l*(0.4+0.25*n);for(let e=-s;e<=s;e+=0.5){const o=a*Math.sqrt(Math.max(0,1-(e*e)/(s*s)));fill("#ff2020",Math.round(2*(t-o))/2,Math.round(2*(r+e))/2,Math.round(4*o)/2,0.5,);}
ctx.globalAlpha=l*(0.7+0.3*n);for(let e=0;e<40;e++){const o=(e/40)*6.283;fill("#ff4a4a",Math.round(2*(t+Math.cos(o)*a))/2,Math.round(2*(r+Math.sin(o)*s))/2,1,1,);}
const c=a*(1.6-0.6*e);ctx.globalAlpha=0.5*l;for(let a=0;a<28;a++){const e=(a/28)*6.283+tick/20;a%2&&
fill("#ff8080",Math.round(2*(t+Math.cos(e)*c))/2,Math.round(2*(r+Math.sin(e)*c*0.3))/2,0.5,0.5,);}
((ctx.globalAlpha=l),fill("#ff3a3a",t-a-3,r-0.25,2,0.5),fill("#ff3a3a",t+a+1,r-0.25,2,0.5),o&&
n>0.35&&
(fill("#2a0000",t-1.5,r-s-13,3,9),fill("#ff4040",t-1,r-s-12.5,2,5),fill("#ff4040",t-1,r-s-6.5,2,2)),(ctx.globalAlpha=1),glow(t,r,a+4,"255,40,40",0.18*l));}
const wo={pod:{d:[34,78,150],bf:1},lab:{d:[20,120,176],lamp:[60,132]},store:{d:[60,140],lamp:[96]},med:{d:[44,110,170],lamp:[70,150]},cafe:{d:[30,96,160],bf:1,lamp:[80]},exitlab:{d:[40,150,250,330,420],bf:1},hall:{d:[120,200],lamp:[75]},ware:{d:[20,118,214,310],lamp:[58,138,198,278]},};function vo(t,a,e){const o=2*Math.sin(tick/8);t+=o*e;const r=(o,r)=>{(fill(o,t-8*e-(e>0?r:-r)-0+(e>0?0:-0),a-1-r,0,0),fill(o,e>0?t-8-r:t-r,a-1-r,8+2*r,3+2*r));for(let n=0;n<5;n++){const l=2*(5-n)-1+2*r;fill(o,e>0?t+n-r*(0==n?1:0):t-n-1+(0==n?r:0),a-(l-1)/2,1+(0==n?r:0),l,);}};(r("#04100a",1),r("#ffe070",0));}
function render(){((ctx=o),ctx.setTransform(1,0,0,1,0,0),(ctx.imageSmoothingEnabled=!1),(ctx.fillStyle="#000"),ctx.fillRect(0,0,384,216),ctx.save(),ctx.scale(2,2),shake>0&&!window.__evoNoShake&&ctx.translate(2*(Math.random()-0.5),2*(Math.random()-0.5)),c2CutCam());(document.body.classList.toggle("cine",!!(cine||c2cut)),cine&&cine.d&&$dCam());const t=performance.now();backdrops[room]||backdrop(room);const e=rooms[room];if(e.H){const t=Math.max(0,Math.min(e.H-108,player.y-70));camY+=0.15*(t-camY);}else camY=0;if(e.W){const t=
null!=tnCamX()?Math.max(0,Math.min(e.W-192,tnCamX())):cine&&cine.d&&null!=cine.d.cx?Math.max(0,Math.min(e.W-192,cine.d.cx)):Math.max(0,Math.min(e.W-192,player.x-(ch2&&ch2.sp?56:96)));((camX+=0.12*(t-camX)),Math.abs(t-camX)<0.05&&(camX=t));c2cut&&null!=c2cut.cx&&(camX=Math.max(0,Math.min(e.W-192,c2cut.cx)));}else camX=0;if((ctx.save(),ctx.translate(-Math.round(2*camX)/2,-Math.round(2*camY)/2),ctx.drawImage(backdrops[room],0,0,e.W||192,e.H||108),ctx.save(),ctx.translate(camX,0),(function(t){const a=Ne[room];if(!a)return;const e=rooms[room].H||108;for(let o=0;o<26;o++){const n=
(192*r(o,51)+8*Math.sin(t/2400+o)+0.002*t*((o%3)-1)*6+384)%
192,l=(r(o,52)*e-0.0035*t*(1+(o%3))+4*e)%e,s=0.25+0.25*Math.sin(t/600+1.3*o);fill("rgba("+a[0]+","+Math.max(0,s)+")",Math.round(2*n)/2,Math.round(2*l)/2,0.5,0.5,);}
if(a[1])
for(let a=0;a<7;a++){const o=(192*r(a,61)+14*Math.sin(t/1300+2*a)+192)%192,n=r(a,62)*e*0.8+8*Math.cos(t/1700+a),l=0.35+0.45*Math.sin(t/300+1.9*a);l>0&&
(fill("rgba(200,255,140,"+l+")",o,n,0.5,0.5),glow(o,n,3,"190,255,120",0.35*l));}
if((a[2]&&
((t/4e3)|0)%3==0&&
t%4e3<180&&
Math.sin(t/23)>0&&
((ctx.fillStyle="rgba(0,0,10,.18)"),ctx.fillRect(0,0,192,e)),("exitlab"!==room&&"cafe"!==room)||
("exitlab"===room?[[244-camX,71],[298-camX,71],]:[[52,17],[106,17],]).forEach(([a,e],o)=>{((ctx.fillStyle="rgba(220,255,190,"+(0.05+0.02*Math.sin(t/1500+o))+")"),ctx.beginPath(),ctx.moveTo(a,e),ctx.lineTo(a+28,e),ctx.lineTo(a+52,floorY()),ctx.lineTo(a+14,floorY()),ctx.closePath(),ctx.fill());}),"stair"===room))
for(let a=0;a<6;a++){const e=1600+300*a,o=((t+700*a)%e)/e,n=40+120*r(a,71),l=200*r(a,72);fill("rgba(200,235,255,"+0.7*(1-o)+")",n,l+o*o*90,0.5,1.2);}})(t),ctx.restore(),(function(t){const a=wo[room];if(!a)return;const e=floorY();((a.lamp||[]).forEach((a,o)=>{const r=!((t+1700*o)%5300<260&&((t/45)|0)%2);((ctx.fillStyle="rgba(220,240,255,"+(r?0.045:0.012)+")"),ctx.beginPath(),ctx.moveTo(a-6,12),ctx.lineTo(a+6,12),ctx.lineTo(a+22,e),ctx.lineTo(a-22,e),ctx.closePath(),ctx.fill(),r&&glow(a,e+1,18,"220,240,255",0.08));}),a.d.forEach((a,o)=>{const r=1300+370*o,n=((t+600*o)%r)/r;for(let t=-1;t<=1;t+=0.5){const o=7-3*Math.abs(t);fill(t<0?"#4a6a78":"#22323a",Math.round(2*(a-o))/2,e+3+0.5*t,2*o,0.5,);}
if((fill("rgba(220,240,255,.5)",a-3,e+2.5,2,0.5),n<0.75)){const t=n/0.75;fill("rgba(200,230,255,.85)",a,12+(e+2-12)*t*t,0.5,1.2);}else{const t=(n-0.75)/0.25;ctx.globalAlpha=1-t;for(let o=0;o<12;o++){const r=(o/12)*6.283;fill("#cfe8ff",Math.round(2*(a+Math.cos(r)*t*6))/2,Math.round(2*(e+3+Math.sin(r)*t*1.4))/2,0.5,0.5,);}
((ctx.globalAlpha=1),t<0.3&&
(fill("#cfe8ff",a-1,e+1-6*t,0.5,0.5),fill("#cfe8ff",a+1,e+1-6*t,0.5,0.5)));}}));const o=((t+1931*room.length)%1e4)/1e4;if(o<0.42){const a=(o/0.42)*230-20,r=e+5,n=((t/60)|0)%2;(fill("#14100c",a-2,r-1.5,4,1.5),fill("#3a2a1a",a-1.5,r-2,3,0.5),fill("#8aff6a",a+1.5,r-1.5,0.5,0.5),fill("#14100c",a-2+0.5*n,r,0.5,0.5),fill("#14100c",a+0.5*n,r,0.5,0.5),fill("#14100c",a+1.5-0.5*n,r,0.5,0.5),glow(a+1.5,r-1.5,2,"120,255,100",0.3));}
if(a.bf)
for(let a=0;a<2;a++){const e=40+90*a+30*Math.sin(t/900+2*a),o=40+12*a+6*Math.sin(t/300+a),r=((t/80+a)|0)%2,n=a?"#ffb86a":"#8ad8ff";(fill(n,e-(r?1.5:0.5),o,r?1.5:0.5,1.5),fill(n,e+0.5,o,r?1.5:0.5,1.5),fill("#1a1020",e,o,0.5,1.5));}})(t),"pod"===room)){(za(t,1),qa(t,1),glow(96,52,70,"60,255,170",0.16));for(let a=0;a<3;a++)
rect("rgba(170,255,225,.8)",92+6*a,28+((t/22+37*a)%70),0.6,1.4);(Ua(t,"200,255,200"),(function(){const t=exitOpen?1:erode>200?Math.min(1,(erode-200)/60):0;if((fill("#02080a",149,34,38,59),t>0)){for(let t=0;t<59;t+=2)
fill(jt("#f4ffd8","#6ad878",t/59),149,34+t,38,2);for(let t=0;t<5;t++)
(fill("#2a8a46",152+7*t,70+(t%2)*4,4,23),fill("#1f6a38",151+7*t,76,6,3));glow(168,64,60,"200,255,170",0.5*t);}
const a=19*(1-t);(a>0.5&&
[149,187-a].forEach((t,e)=>{(fill("#0a1410",t,34,a,59),fill("#3a4a44",t+0.5,34.5,a-1,58),fill("#6a7e74",t+0.5,34.5,a-1,1),fill("#243430",t+0.5,92,a-1,1),fill(e?"#2a3a34":"#6a7e74",e?t+a-1.5:t+0.5,34.5,1,58),fill("#1a2622",t+3,40,Math.max(0,a-6),18),fill("#0c2a1c",t+4,41,Math.max(0,a-8),16),fill("#d8c040",t+(e?2:a-5),66,3,1),a>12&&fill("#c8a828",t+2,64,a-4,2));}),!exitOpen&&
erode<200&&
(Vt||
(Vt=(function(){const t=document.createElement("canvas");((t.width=384),(t.height=216));const a=ctx;((ctx=t.getContext("2d")),Ht((t)=>{const a=294,e=380;([[62,40,0],[102,42,2],[144,42,-1],].forEach(([o,n,l],s)=>{(t.poly([[a,o+l],[e,o-l],[e,o+n-l],[a,o+n+l],],(t,a)=>{const e=(a-o)/n,r=It(t/3,a/12,77+s),l=It(t/9,a/5,77+3*s);if(a<o+1.5)return[186,200,216];if(a>o+n-2)return[38,46,60];if(r>0.64)return[150,88,44];if(r>0.56)return[112,72,44];const c=Ct([112,128,146],[62,76,94],0.9*e+0.35*(Et(t,a)-0.5),);return l>0.6?Ct(c,[150,170,190],0.2):c;},),t.rect(a,o+n-3+l,86,3,"#222a38"),t.rect(a,o+1+l,86,1,"#c8d6e6",0.7));for(let a=0;a<9;a++){const e=300+(74*a)/8;(t.disc(e,o+6,2,"#1a2030"),t.px(e-1,o+5,"#c8d6e6"),t.px(e,o+6,"#6a7a90"),t.disc(e,o+n-7,2,"#1a2030"),t.px(e-1,o+n-8,"#c8d6e6"));}
for(let e=0;e<12;e++)
t.px(a+86*r(e,s),o+r(e,s+4)*n,"#e8c8a0",0.4);for(let a=0;a<5;a++)
t.rect(304+16*a,o+n-1,2,(3+4*r(a,s))|0,"#8a4a22");}),[102,144].forEach((o)=>{for(let n=a;n<e;n+=3)
t.px(n,o,r(n,o)<0.5?"#c8a060":"#8a6a3a");}));for(let o=0;o<3;o++)
(t.line(a,66+o,e,184+o,"#2a3242"),t.line(a,184+o,e,66+o,"#2a3242"));(t.line(a,66,e,184,"#7a8aa0",0.8),t.line(a,184,e,66,"#7a8aa0",0.8),xe(t,328,114,18,18,"#4a5870","#aabcd0","#10141e"),t.disc(337,123,3,"#1a2030"),t.px(336,122,"#c8d6e6"),t.poly([[322,86],[342,86],[332,70],],"#e8c020",),t.poly([[326,84],[338,84],[332,75],],"#14100a",),t.px(332,81,"#e8c020"),t.rect(331,78,2,2,"#e8c020"),[[290,52,372,176,14],[384,60,300,190,-12],[296,176,350,60,10],[380,184,320,52,-14],[300,100,380,140,8],[380,96,298,150,-8],].forEach((a,e)=>
ve(t,a[0],a[1],a[2],a[3],a[4],4.3*e+11,3+(e%2),ye[e%6]||[255,134,208],),));for(let a=0;a<7;a++)
ve(t,292+13*a,50,292+13*a+(a%2?7:-7),(92+70*r(a,2))|0,5,2.5*a+300,2,ye[a%6]||[255,134,208],);([[298,70,10],[372,66,11],[312,186,15],[364,184,16],[336,126,9],[300,140,8],[372,150,9],[336,58,10],].forEach(([a,e,o],r)=>Fa(t,a,e,o,7*r+2)),Ga(t,292,60,92,30,61),Ga(t,292,150,92,36,63));for(let a=0;a<6;a++){const e=294+86*r(a,3),o=60+120*r(a,4);(t.rect(e,o,2,2,a%2?[255,134,208]:[255,226,110]),t.px(e,o,[255,250,210]));}}),(ctx=a));const e=96,o=146,n=t.getContext("2d").getImageData(288,44,e,o),l=new Float32Array(14016),s=new Uint8Array(14016);for(let t=0;t<o;t++)
for(let a=0;a<e;a++){const c=t*e+a,i=4*c,f=n.data[i+1];((s[c]=f>n.data[i]+12&&f>n.data[i+2]+8?1:0),(l[c]=
0.5*It((a+288)/5,(t+44)/5,5)+(t/o)*0.5+0.06*r(a,t)));}
const c=document.createElement("canvas");return((c.width=e),(c.height=o),{cv:t,src:n,noise:l,vine:s,rx:288,ry:44,rw:e,rh:o,out:c,oc:c.getContext("2d"),buf:new ImageData(e,o),});})()),(function(t,a,e){if(e<=0)return void a.drawImage(t.cv,0,0,192,108);const o=1.2*e-0.12,r=t.src.data,n=t.buf.data,l=t.noise,s=t.vine;for(let t=0;t<l.length;t++){const a=4*t;if(!r[a+3]){n[a+3]=0;continue;}
const e=l[t]*(s[t]?0.7:1.05);e<o?(n[a+3]=0):e<o+0.06?((n[a]=210),(n[a+1]=255),(n[a+2]=1&t?120:200),(n[a+3]=255)):e<o+0.1?((n[a]=0.5*r[a]),(n[a+1]=0.6*r[a+1]+60),(n[a+2]=0.4*r[a+2]),(n[a+3]=255)):((n[a]=r[a]),(n[a+1]=r[a+1]),(n[a+2]=r[a+2]),(n[a+3]=255));}
(t.oc.putImageData(t.buf,0,0),a.drawImage(t.out,t.rx/2,t.ry/2,t.rw/2,t.rh/2));})(Vt,ctx,erode/200)));})());}
if("lab"===room){hasGoggles||l.every((t)=>got.has(t));{const t=0.5+0.5*Math.sin(tick/20);glow(92,66,26,"255,224,112",0.18+0.12*t);}}
if(("lab"===room&&
taken.goggles&&
(fill("#8a1828",146,58,4,34),fill("#0a0a12",150,60,20,32)),e.crates.forEach((t,a)=>{if(broken[room+a])return;const e=80-(t.y2?12:0);(fill("#120a06",t.x-1,e-1,t.w+2,13),fill("#7a5632",t.x,e,t.w,11),fill("#a07848",t.x,e,t.w,1),fill("#4a3018",t.x,e+3.5,t.w,0.5),fill("#4a3018",t.x,e+7,t.w,0.5),fill("#2a1a0c",t.x,e,1.5,11),fill("#2a1a0c",t.x+t.w-1.5,e,1.5,11),fill("#8a98a8",t.x,e,2,2),fill("#8a98a8",t.x+t.w-2,e,2,2),fill("#8a98a8",t.x,e+9,2,2),fill("#8a98a8",t.x+t.w-2,e+9,2,2),fill("#4a8a3a",t.x+1,e,t.w-3,1.5),fill("#6bd86a",t.x+2,e,3,1));}),e.items.forEach((t)=>{if(taken[t.id]||ea(t))return;const a=1.2*Math.sin(tick/14+t.x),e=items[t.id];glow(t.x,t.y-8,16,e.decoy?"200,200,220":"255,235,120",0.35);const o=i(e.k,e.c);(o.complete&&ctx.drawImage(o,t.x-6,t.y-13+a,12,12),fill("#fff",t.x+4+2*Math.sin(tick/9),t.y-14+a,1,1));}),"stair"===room&&
(fill("#04030bcc",3,262,50,9),text("< STORAGE",6,264,"#ffd070",'5px "Press Start 2P",monospace'),[[10,22,"FL 10"],[162,110,"FL 7"],[8,198,"FL 4"],[162,286,"FL 1"],].forEach(([t,a,e])=>{(fill("#04030bcc",t,a,28,9),text(e,t+2,a+2,"#9aff9a",'5px "Press Start 2P",monospace'));}),fill("#04030b",176,276,16,8),text("EXIT LAB",156,272,"#ff6a5a",'5px "Press Start 2P",monospace')),"outside"===room)){const t=16.7*tick;(to(t,je),ao(t,(Ve.x-8)/2,(Ve.x+Ve.w+8)/2,(Ve.y-9)/2,a,6,5),eo(t,16,0.16));}
if("exitlab"===room&&bossDone){(ctx.save(),ctx.translate(roomW()-192,floorY()-92),fill("#0a0e0c",179,38,13,55));for(let t=0;t<52;t+=2)fill(jt("#fff4c8","#7ac860",t/52),181,40+t,11,2);for(let t=0;t<5;t++)
fill(t%2?"#2a6a30":"#1f5226",182+2*t,64+(t%2)*6,1.5,29-(t%2)*6);(fill("#6a7480",178,36,4,4),fill("#6a7480",180,90,6,3),glow(188,62,44,"255,240,190",0.3),ctx.restore());}
if(("exitlab"===room&&
cine&&
cine.tailB&&
(Ft(cine.tailB.x+42,floorY()+1,40,0.4),drawSnake(cine.tailB,1)),("exitlab"===room||snakeBoss)&&
(function(){const t=snakeBoss;if(!t)return;const a=floorY();let e=1;"dead"===t.st&&(e=Math.max(0,1-t.t/170));const o=(t,e)=>{for(let o=0;o<2*e;o++){const e=t+0.5*o;((o>>1)+(tick>>2))%2==0&&
(fill("#ff5a3a",e,a-1,0.5,0.5),o%4==0&&fill("#ffb070",e,a-1.5,0.5,0.5));}};if("slam"===t.st&&t.t<46){const a=bo(t);(Mo(a,28,t.t/46,1),(t.t>>2)%2&&(o(a-76,50),o(a+26,50)));}
if(("throw"===t.st&&
t.tg&&
t.tg.forEach((a)=>{a.fired||Mo(a.x,9,0.45+0.4*Math.max(0,1-(a.shot-t.t)/24),1);}),"charge"===t.st&&t.t<40)){const e=t.face>0?t.x+10:30,r=t.face>0?roomW()-6:t.x-10,n=t.t/40;((ctx.globalAlpha=0.12+0.18*n*(0.5+0.5*Math.sin(tick/2))),fill("#ff2020",e,a-26,r-e,26),(ctx.globalAlpha=0.6+0.4*n));for(let o=0;o<5;o++){const n=
e+((((1.5*tick*t.face+(o*(r-e))/5)%(r-e))+(r-e))%(r-e));(fill("#ff4040",n,a-15,1,1),fill("#ff4040",n-t.face,a-16,1,1),fill("#ff4040",n-t.face,a-14,1,1));}
((ctx.globalAlpha=1),Mo(t.face>0?roomW()-22:22,14,n,1),(t.t>>2)%2&&o(t.face>0?t.x:t.x-130,130));}
if((Ft(t.x,a+1,120,0.5),"intro"===t.st&&t.t<110))
for(let e=0;e<12;e++){const o=lo((t.t+9*e)/40);fill(e%3?"#4a3a46":"#8a7a70",t.x+70*(r(e,4)-0.5),a-2-16*Math.sin(Math.PI*o),1,1,);}
if("charge"===t.st&&t.t>=40)
for(let e=0;e<6;e++){const o=lo(tick/12+e/6);fill("#8a7a70",t.x-t.face*(24+30*o),a-1-5*o+(e%2),1,1);}
const n=drawSnake(t,e);if("dead"!==t.st){const a=0.55+0.35*Math.sin(tick/9);(glow(n.eye.x,n.eye.y,7,"255,50,30",a*e),t.flash>0&&glow(n.head.x,n.head.y,22,"255,255,255",(0.5*t.flash)/6),"throw"===t.st&&n.mouth?(glow(n.mouth.x,n.mouth.y,11,"120,255,100",0.6),tick%4<2&&
fill("#8aff6a",n.mouth.x+2*t.face,n.mouth.y+2+(tick%8)/2,0.5,1)):"slam"===t.st&&n.mouth&&glow(n.mouth.x,n.mouth.y,10,"255,120,60",0.5));}
if("stun"===t.st)
for(let t=0;t<3;t++){const a=tick/6+2.1*t,e=n.head.x+9*Math.cos(a),o=n.head.y-13+3*Math.sin(a);(fill("#3a2400",e-0.5,o-0.5,2,2),fill("#ffd23a",e,o,1,1));}})(),c2Draw(),tnDraw(),"stair"===room&&
(function(){const t=179,a=268,e=289;if(bossOpen){fill("#020806",182,273,10,32);for(let t=0;t<7;t++)
(fill("#3a444c",180+4*r(t,3),271+5*t,2+3*r(t,4),3),fill("#6a7884",180+4*r(t,3),271+5*t,1,1));(fill("#3a444c",181,270,11,3),glow(187,e,16,"120,255,170",0.25));for(let t=0;t<4;t++)
fill("#3a444c",174+3*t-6*r(t,7),303-2*r(t,8),3,2);}else{(fill("#06090c",178,267,15,39),fill("#3a444c",t,a,13,37),fill("#6a7884",t,a,13,1),fill("#6a7884",t,a,1,37),fill("#1c242a",191,a,1,37),fill("#2a323a",t,280,13,1),fill("#2a323a",t,293,13,1));for(let t=0;t<3;t++)
(fill("#8a98a4",181,271+13*t,1,1),fill("#8a98a4",189,271+13*t,1,1));for(let t=0;t<6;t++)fill(t%2?"#e8c020":"#16140a",180+2*t,300,2,3);for(let t=0;t<10;t++)
fill("#6a3a1c",180+11*r(t,31),270+28*r(t,32),1+2*r(t,33),1);if((fill("#1a1e22",180,285,11,3),fill("#5a6670",180,285,11,1),fill("#c8a030",184,284,3,5),fill("#f0d870",184,284,3,1),fill((tick>>4)%2?"#ff3a2a":"#5a1410",184,263,3,2),(tick>>4)%2&&glow(185.5,264,6,"255,60,40",0.5),corrode>0)){const a=10*corrode;for(let o=-a;o<=a;o+=0.5){const r=0.62*Math.sqrt(Math.max(0,a*a-o*o));fill("#04060a",Math.max(t,185.5-r),e+o,Math.min(13,2*r),0.5);}
for(let o=0;o<14;o++){const r=(o/14)*6.283+tick/30,n=185.5+Math.cos(r)*a*0.62,l=e+Math.sin(r)*a;n>=t&&n<192&&fill(o%3?"#b06aff":"#e8d0ff",n,l,1,1);}
for(let t=0;t<3;t++)
fill("#8a3ae0",182+3.5*t,e+a,1,2+((tick/6+5*t)%6));glow(185.5,e,6+a,"180,110,255",0.35*corrode);}}})(),"hall"===room&&
(text("STAFF",27.5,51.5,"#2a2210",'4px "Press Start 2P",monospace'),text("ONLY",29.5,56.5,"#a01810",'4px "Press Start 2P",monospace')),"ware"===room&&
(text("HAZARDOUS",159,73.6,"#1a1608",'4px "Press Start 2P",monospace'),e.crates.forEach((t,a)=>{!broken[room+a]&&
(tick+40*a)%160<10&&
fill("#ffe07088",t.x+2+((tick>>1)%8),82,1,1);})),!won)){const t=player.punch>0;if((player.on&&(Se=player.y),!(invuln>0&&(tick>>2)%2)&&!c3Hide())){const a=(function(){let t;const a=player.walk&&player.on;if(player.on)
t=
player.kb>0&&invuln>0?Aa("hurt"):ue>0?Aa("land"):a?Aa("walk",(2.5*player.fr)&7):Aa("idle",(tick/45)&1);else if(player.climb)t=Aa("grab",(player.y/5)&1);else{const a=player.vy;t=Aa(a<-1.6?"up":a>1.2?"down":"top");}
const e=Object.assign({},t);if(player.punch>0){const t=Aa("punch",14-player.punch);((e.fa=t.fa),(e.ba=t.ba),(e.fist=t.fist),(e.gun=0),(e.lg=t.lg),(e.bob=t.bob));}else
hasGun&&
((e.gun=1),Te>0?((e.fa=gunCd>15?[3,-9]:[6,-8]),(e.flash=gunCd>17?1:0),(e.ba=[-1,-2])):(e.fa=[4,-6]));return((e.k=[e.lg.join(","),e.ba,e.fa,e.bob,e.tl,e.fist,e.gun,e.flash].join("|")),e);})(),e=Math.max(0,Se-player.y);(Ma(player.x+(t&&player.punch<12?1.5*player.face*Po:0),player.y,playerLook,0,player.face,{s:Po,noshd:1,pose:a,env:De[room]||De.pod,tired:c3Tired()},),(function(t,a,e,o){const r=Math.max(0.35,1-e/75)*Po,n=Math.max(0.3,1-e/90);for(let e=0;e<3;e++){const l=(10-2.6*e)*r,s=(2.8-0.7*e)*r,c=[0.22,0.3,0.38][e]*n;for(let e=-Math.ceil(s);e<=Math.ceil(s);e+=0.5){const r=1-(e*e)/(s*s+0.01);if(r<=0)continue;const n=l*Math.sqrt(r);fill("rgba(3,10,8,"+c+")",Math.round(2*(t-n+0.8*o))/2,Math.round(2*(a+e))/2,Math.round(4*n)/2,0.5,);}}})(player.x,Se,e,player.punch>0?player.face:0));}
if((worn&&
2!==modal&&
fill("#7fe8ff",player.x+2*player.face*Po-1,player.y-33.35,3,1),t)){const t=14-player.punch,a=player.face;if(t>=3&&t<=9){ctx.globalAlpha=0.85*Math.max(0,1-(t-3)/7);for(let t=0;t<11;t++){const e=0.2*t-1.15;(fill("#ffffff",Math.round(2*(player.x+a*(2+12*Math.cos(e))))/2,Math.round(2*(player.y-13*Po+10*Math.sin(e)))/2,1,0.5,),t%2&&
fill("#ffe070",Math.round(2*(player.x+a*(2+14*Math.cos(e))))/2,Math.round(2*(player.y-13*Po+12*Math.sin(e)))/2,0.5,0.5,));}
ctx.globalAlpha=1;}}}
tnFront();if(!modal&&!won&&!tnLock()){let t=null;if((e.items.forEach((a)=>{taken[a.id]||ea(a)||!se(a.x,a.y,15)||(t=[a.x,a.y-20,"TAKE"]);}),e.ints.forEach((a)=>{Math.abs(player.x-a.x)<a.r&&
("haz"!==a.id||!taken.canister)&&
(t=[a.x,a.ly!=null?a.ly:a.label?48:40,a.label||"MIX"]);}),"pod"===room&&
!exitOpen&&
0===erode&&
hasPotion&&
player.x>=116&&
(t=[player.x,player.y-49.3,"POUR"]),t)){ctx.font='5px "Press Start 2P",monospace';const a=Math.ceil(ctx.measureText(t[2]).width)+6;(fill("#04100a",t[0]-a/2-1,t[1]-1,a+2,10),fill("#ffe070",t[0]-a/2,t[1],a,8),text(t[2],t[0]-a/2+3,t[1]+1.5,"#1a1408",'5px "Press Start 2P",monospace'));}}
if(pourT>0){const t=0.9*Math.min(1,(90-pourT)/20);(ctx.save(),ctx.translate(player.x+9,player.y-18*Po),ctx.rotate(1.3*t));const a=i("potion","#6aff7a");(a.complete&&ctx.drawImage(a,-5,-8,10,10),ctx.restore());}
if((parts.forEach((t)=>{((ctx.globalAlpha=Math.min(1,t.life/10)),fill(t.c,t.x,t.y,t.s||1,t.s||1));}),(ctx.globalAlpha=1),(function(){const t=floorY();(waves.forEach((a)=>{const e=Math.sign(a.vx)||1;for(let o=0;o<4;o++){const r=a.x-e*o*2.6,n=7-1.6*o+0.5*Math.sin(tick/2+o);(fill("#1a1020",r-1.5,t-n,3,n),fill("#5a4a52",r-1,t-n,1.5,n-0.5),fill("#a89a8a",r-1,t-n,1,0.5));}
(fill("#ffc23a",Math.min(a.x,a.x-10*e),t-0.5,10,0.5),fill("#fff0a0",a.x-1,t-0.5,2,0.5));for(let o=0;o<5;o++)
fill("#9a8a80",a.x-e*(2+2.2*o),t-3-6*lo(tick/10+0.3*o),0.5,0.5);}),"exitlab"===room&&
(function(){const t=floorY();(drops.forEach((t)=>{const a=t.vy?0:1*Math.sin(tick/10+t.x);(fill("#1a0a2a",t.x-2,t.y-5+a,4,6),fill("#b06aff",t.x-1.5,t.y-3.5+a,3,4),fill("#e8d0ff",t.x-1.5,t.y-3.5+a,1,3),fill("#8a6a4a",t.x-1,t.y-5+a,2,1.5),glow(t.x,t.y-2+a,7,"180,110,255",0.4+0.2*Math.sin(tick/8)));}),minis.forEach((a)=>{const e=a.face,o=tick/4+0.3*a.x,n=a.t<34?a.t/34:1,l=5*(1-n);ctx.globalAlpha=Math.min(1,1.5*n);for(let e=0;e<5;e++)fill("#020806",a.x-6+3*e,t-0.5,2.5,0.5);for(let r=9;r>=0;r--){const s=a.x-e*r*1.6,c=t-1.6-0.9*Math.sin(o-0.75*r)*n+l,i=r<2?2.6:Math.max(1.2,2.8-0.17*r);(fill("#0a0606",s-i/2-0.25,c-i/2-0.25,i+0.5,i+0.5),fill(r%3==0?"#c8b898":"#2a1c18",s-i/2,c-i/2,i,i),r%3==1&&fill("#100808",s-0.5,c-i/2,1,0.5*i),r%4==2&&fill("#6a2a26",s-0.25,c-i/2,0.5,0.5));}
const s=a.x+2.2*e,c=t-3-0.9*Math.sin(o)*n+l+(a.cd>58?-2:0);if((fill("#0a0606",s-2.5,c-2,5,4),fill("#6a5a4e",s-2,c-1.6,4,3.2),fill("#a89880",s-2,c-1.6,4,0.8),fill("#6a5a4e",s+2*e-0.5,c-0.8,1.5,1.6),fill("#d8c8a8",s-1.5,c+0.8,3.5,0.6),fill("#d8ccb0",s-0.6*e-0.25,c-2.8,0.5,1.2),fill("#ff3a24",s+0.5*e-0.5,c-1,1,0.8),glow(s+0.5*e,c-0.6,3,"255,50,30",0.45),((tick+7*a.x)|0)%46<7&&n>=1)){const t=e>0?s+3:s-5;(fill("#ff4a6a",t,c+0.3,2,0.5),fill("#ff4a6a",t+(e>0?2:-0.5),c-0.2,0.5,0.5),fill("#ff4a6a",t+(e>0?2:-0.5),c+0.8,0.5,0.5));}
if((a.hurt>0&&
((ctx.globalAlpha=0.6),fill("#ffffff",a.x-14*e-1,t-5,16,5),(ctx.globalAlpha=1)),a.t<34))
for(let e=0;e<3;e++)
fill("#5a4a3a",a.x+10*(r(e,a.t)-0.5),t-1-4*r(e+3,a.t),0.5,0.5,);ctx.globalAlpha=1;}));})(),ce.forEach((t)=>{const a=Math.min(1,t.life/40);ctx.globalAlpha=0.85*a;for(let a=-1;a<=1;a+=0.5){const e=(9-3*Math.abs(a))*(1+(110-t.life)/400);fill(a?"#3a9a3a":"#6ae05a",Math.round(2*(t.x-e))/2,floorY()+0.5*a-0.5,Math.round(4*e)/2,0.5,);}
(t.life%9<3&&
fill("#d8ff9a",t.x-3+((7*t.life)%6),floorY()-1.5-(t.life%9)/3,0.5,0.5,),(ctx.globalAlpha=1),glow(t.x,floorY(),8,"120,255,100",0.15*a));}),venoms.forEach((t)=>{if("venom"===t.k){Mo(t.tx,9,0.6+0.4*Math.min(1,t.t/t.T),1);for(let a=1;a<6;a++){const e=Math.max(0,(t.t-1.5*a)/t.T),o=t.sx+(t.tx-t.sx)*e,r=t.sy+(floorY()-1-t.sy)*e*e-26*Math.sin(e*Math.PI);((ctx.globalAlpha=0.7-0.12*a),fill("#4ad04a",o-0.5,r-0.5,1,1),(ctx.globalAlpha=1));}
return(fill("#1a4a12",t.x-2,t.y-1.5,4,3),fill("#6ae05a",t.x-1.5,t.y-1.5,3,3),fill("#d8ff9a",t.x-1,t.y-1,1,1),void glow(t.x,t.y,7,"120,255,100",0.55));}
const a=Math.hypot(t.vx,t.vy)||1,e=t.vx/a,o=t.vy/a;for(let a=0;a<12;a++){const r=t.y-o*a*0.5;fill(a<2?"#ffc23a":a<9?(a%3==0?"#a89a86":"#e0d6bc"):"#5a4a52",Math.round(2*(t.x-e*a*0.5))/2,Math.round(2*r)/2,0.5,0.5,);}
glow(t.x,t.y,5,"255,190,60",0.35);}),shots.forEach((t)=>{const a=Math.sign(t.vx),e=0.6*Math.sin(tick/2+t.x);for(let e=1;e<7;e++)
((ctx.globalAlpha=0.6-0.08*e),fill(e%2?"#8a3ae0":"#b06aff",t.x-a*(2+2.2*e),t.y-0.5+0.8*Math.sin(tick/2+e),2,1,));((ctx.globalAlpha=1),fill("#3a1466",t.x-2.5,t.y-2+e,5,4),fill("#b06aff",t.x-2,t.y-1.5+e,4,3),fill("#e8d0ff",t.x-1+a,t.y-1+e,1.5,1),glow(t.x,t.y,7,"180,110,255",0.55));}));})(),fx.forEach((t)=>{const a=t.t/t.life,e=1-a;if("flash"===t.k)glow(t.x,t.y,t.r,t.c,e*t.a);else if("ring"===t.k){const o=t.r0+(t.r1-t.r0)*(1-Math.pow(1-a,3));ctx.globalAlpha=e;const r=a<0.5?1:0.5;for(let a=0;a<36;a++){const e=(a/36)*6.283;fill(t.c,Math.round(2*(t.x+Math.cos(e)*o))/2,Math.round(2*(t.y+Math.sin(e)*o*(t.sq||1)))/2,r,r,);}
ctx.globalAlpha=1;}else if("star"===t.k){const o=t.r*(1-0.5*a);((ctx.globalAlpha=e),fill(t.c,t.x-o,t.y-0.25,2*o,0.5),fill(t.c,t.x-0.25,t.y-o,0.5,2*o),fill(t.c,t.x-0.5*o,t.y-0.5*o,0.5,0.5),fill(t.c,t.x+0.5*o,t.y-0.5*o,0.5,0.5),fill(t.c,t.x-0.5*o,t.y+0.5*o,0.5,0.5),fill(t.c,t.x+0.5*o,t.y+0.5*o,0.5,0.5),(ctx.globalAlpha=1));}else if("spark"===t.k)
((ctx.globalAlpha=Math.min(1,1.4*e)),fill(t.c,t.x,t.y,a<0.4?1:0.5,a<0.4?1:0.5),fill(t.c,t.x-0.8*t.vx,t.y-0.8*t.vy,0.5,0.5),fill(t.c,t.x-1.6*t.vx,t.y-1.6*t.vy,0.5,0.5),(ctx.globalAlpha=1));else if("smoke"===t.k){const a=t.r;ctx.globalAlpha=0.45*e;for(let e=-a;e<=a;e+=0.5){const o=Math.sqrt(Math.max(0,a*a-e*e));fill("rgb("+t.c+")",Math.round(2*(t.x-o))/2,Math.round(2*(t.y+e))/2,Math.round(4*o)/2,0.5,);}
ctx.globalAlpha=1;}else
"shell"===t.k&&
(fill("#d8a83a",t.x-0.5,t.y-0.25,1,0.5),fill("#fff0a0",t.x-0.5,t.y-0.25,0.5,0.5));}),ctx.save(),ctx.translate(camX,0),(function(t){if("outside"===room)return;const a=108+camY;[[3,18,0],[9,26,1],[183,22,2],[189,14,3],].forEach(([a,e,o])=>{let r=a,n=0;for(let l=0;l<e;l++)
((r=a+Math.sin(t/1100+o+0.12*l)*l*0.06),(n=l+camY),fill(l%3?"#0a1e10":"#0e2a16",r,n,1,1),l%5==2&&fill("#123a1c",r+(o%2?1:-2),n,2,1));});for(let e=0;e<5;e++){const o=e<3?5*e:192-5*(e-2),r=1.2*Math.sin(t/900+e);for(let t=0;t<10;t++)
fill("#06120a",o+(r*t)/10+(e<3?0.3*t:0.3*-t),a-t,1.5,1);}})(t),ctx.restore(),"stair"===room))
modal||
won||
cine||
(hasGun||bossOpen?vo(170,264,1):ta()?vo(18,14,-1):vo(18,282,-1));else if("hall"===room)modal||(ta()||hasGun?vo(176,58,1):vo(52,62,-1));else if("ware"===room)modal||(!ta()&&!hasGun)||vo(roomW()-18,58,1);else if("exitlab"===room)!bossDone||modal||won||vo(roomW()-20,floorY()-34,1);else if("outside"===room)modal||won||doorCut||vo(146,62,1);else if(tnIs(room))tnArrow();else if(C2[room])c2Arrow();else if(!(modal||won||pourT>0)){const t=(function(){if(exitOpen)return ta()?{room:"lab",x:92}:{room:"pod",x:190};if(0===stage)return{room:"pod",x:140};if(hasPotion)return{room:"pod",x:132};const t=l.filter((t)=>!got.has(t));if(t.length){let a=null;return(t.forEach((t)=>{const e=(function(t){for(const a of n){const e=rooms[a].items.find((a)=>a.id===t);if(e)return{room:a,x:e.x};}})(t),o=Math.abs(n.indexOf(e.room)-n.indexOf(room));(!a||o<a.d)&&(a={d:o,p:e});}),a.p);}
return{room:"lab",x:92};})();t.room===room?t.x>=186||("pod"===room&&(0===stage||hasPotion||exitOpen))?vo(Math.min(t.x>=186?176:t.x,172),34,1):Math.abs(player.x-t.x)>6&&
(function(t,a){const e=2*Math.sin(tick/8);(fill("#04100a",t-4,a+e-1,9,3),fill("#ffe070",t-3,a+e,7,1),fill("#ffe070",t-2,a+e+1,5,1),fill("#ffe070",t-1,a+e+2,3,1),fill("#ffe070",t,a+e+3,1,1),fill("#ffe070",t-1,a+e-4,3,4),fill("#04100a",t-2,a+e-5,5,1));})(t.x,(e.items.find((a)=>a.x===t.x)?.y||66)-26):(n.indexOf(t.room)>n.indexOf(room)?1:-1)>0?vo(176,58,1):vo(16,58,-1);}
if((e.fy||
(e.L&&fill("#ffe07044",0,62,3,30),!e.R||(e.gate&&!e.gate(player))||fill("#ffe07044",189,62,3,30)),Eo.box&&
(function(){if(((ctx.lineWidth=0.5),(ctx.strokeStyle="#5aff7a"),ctx.strokeRect(player.x-4,player.y-26*Po,8,26),(ctx.strokeStyle="#ffe070"),platforms().forEach((t)=>{ctx.strokeRect(t.x,t.y,t.w,2);}),(ctx.strokeStyle="#ff5a5a"),snakeBoss&&"dead"!==snakeBoss.st)){const t=(function(t){const a=t.face,e=(function(t){const a=t.t,e=t.st;let o=44+3*Math.sin(tick/22),r=20+4*Math.sin(tick/15),n=0.12,l=0.55,s=1;if("intro"===e){const t=Math.min(1,a/(cine?150:100));((o=9+38*t),(r=28-8*t),(l=0.55*t),(n=0.1+0.06*Math.sin(a/4)*(1-t)),(s=1.2));}else if("slam"===e)
if(a<46){const t=a/46;((o=ro(44,58,t)),(r=ro(20,-12,t)),(n=ro(0.15,0.7,t)),(l=ro(0.55,1,t)));}else{const t=(a-46)/10,e=(a-60)/22;((o=e>0?ro(10,46,e):ro(58,10,t)),(r=e>0?ro(34,20,e):ro(-12,34,t)),(n=e>0?ro(0.8,0.15,e):0.8),(l=ro(1,0.55,e)));}
else if("throw"===e){const t=[30,44,58].some((t)=>a>=t&&a<t+7);((o=ro(44,58,a/30)),(r=ro(20,16,a/30)+(t?10:0)),(n=t?0.85:ro(0.15,0.5,a/30)),(l=1));}else
"charge"===e?a<40?((o=24+1.2*Math.sin(a)),(r=-8),(n=0.12),(l=0.8),(s=1.8)):((o=11),(r=40),(n=0.55),(l=0.3),(s=2)):"stun"===e?((o=9),(r=26),(n=0.05),(l=0),(s=0.2)):"dead"===e?((o=8),(r=26),(n=0.05),(l=0),(s=0.1)):"walk"===e&&(s=1.1);return{H:o,Hx:r,gape:n,flare:l,amp:s};})(t),o=floorY(),r=[],n="stun"===t.st||"dead"===t.st,l=n?0:tick/9;for(let t=0;t<=28;t++){const a=t/28,o=2.4+11.4*Math.pow(a,0.72)*(1-0.06*a);let s=60*a-66,c=-o/2-0.6-1.25*e.amp*(1+Math.sin(10*a-l))*(0.22+0.5*a);if(a<0.24){const t=1-a/0.24,e=n?0.3:1;((c-=t*t*17*e),(s+=t*t*8*e));}
r.push({lx:s,ly:c,w:o});}
const s=[-6,-6.6],c=[-6-Math.min(24,0.5*e.H),-6.6-0.38*e.H],i=[e.Hx-30,1.05*-e.H],f=[e.Hx,-e.H];for(let t=1;t<=22;t++){const a=t/22,e=1-a;r.push({lx:
e*e*e*s[0]+3*e*e*a*c[0]+3*e*a*a*i[0]+a*a*a*f[0],ly:
e*e*e*s[1]+3*e*e*a*c[1]+3*e*a*a*i[1]+a*a*a*f[1],w:
13.2-
4.8*Math.pow(a,1.35)+
0.45*Math.sin(3.1*a)+
(a>0.15&&a<0.6&&!n?0.3*Math.sin(tick/11):0),});}
r.forEach((e)=>{((e.x=t.x+a*e.lx),(e.y=o+e.ly));});const h=r[r.length-1],d=r[r.length-4],b=Math.atan2(h.y-d.y,(h.x-d.x)*a),g=t.st,p=t.t;let u=0.3*b;"slam"===g&&p>=46&&p<62?(u+=0.75):"slam"===g&&p<46?(u-=(0.25*p)/46):"stun"===g?(u+=0.55):"dead"===g?(u+=0.8):"throw"===g?(u-=0.18):"charge"===g&&p>=40?(u+=0.12):"intro"===g&&(u+=0.3*(1-Math.min(1,p/(cine?150:100))));const m=a*Math.cos(u),y=Math.sin(u),x=-a*y,M=a*m,w={x:h.x-4*m,y:h.y-4*y},v=(t,a)=>({x:w.x+1.3*(m*t+x*a),y:w.y+1.3*(y*t+M*a)});return{pts:r,GN:28,p:e,f:a,O:w,F:[m,y],D:[x,M],head:v(17,-3),mouth:v(29,2.2),eye:v(16.5,-3.5),};})(snakeBoss);(t.pts.forEach((t)=>ctx.strokeRect(t.x-t.w/2,t.y-t.w/2,t.w,t.w)),ctx.strokeRect(t.head.x-8,t.head.y-8,16,16));}
((ctx.strokeStyle="#ff9aff"),shots.forEach((t)=>ctx.strokeRect(t.x-1,t.y-1,3,3)),venoms.forEach((t)=>ctx.strokeRect(t.x-2,t.y-2,4,4)),c3DevBoxes());})(),ctx.restore(),roomBanner>0)){const t=Math.min(1,roomBanner/30);((ctx.globalAlpha=t),fill("#04030bcc",46,6,100,12),text(e.name,96-2.5*e.name.length,8.5,"#ffe070",'5px "Press Start 2P",monospace'),(ctx.globalAlpha=1));}
if("stair"===room){const t=Math.max(1,Math.min(10,Math.round(10-((player.y-58)/264)*9)));(fill("#04030bcc",70,20,52,9),text("FLOOR "+t,74,22,"#9aff9a",'5px "Press Start 2P",monospace'));}
(!(function(t){const a=De[room]||De.pod;(ctx.save(),(ctx.globalCompositeOperation="soft-light"));const e=ctx.createLinearGradient(0,0,0,108);(e.addColorStop(0,"rgba("+a.l+",.22)"),e.addColorStop(1,"rgba(4,10,8,.32)"),(ctx.fillStyle=e),ctx.fillRect(0,0,dt,bt),(ctx.globalCompositeOperation="lighter"),(ctx.globalAlpha=0.05),(ctx.fillStyle="rgb("+a.l+")"),ctx.fillRect(0,0,dt,28),ctx.restore(),ctx.save(),(ctx.globalCompositeOperation="screen"),(ctx.globalAlpha=0.06+0.015*Math.sin(t/1700)),(ctx.filter="blur(3px) brightness(1.4)"));try{ctx.drawImage(ctx.canvas,0,0,384,216,0,0,dt,bt);}catch(t){}
ctx.restore();for(let a=0;a<70;a++){const e=r(a,71)*dt,o=(r(a,72)*bt+t*(0.003+(a%4)*0.002))%bt;fill(a%3?"rgba(255,255,255,.05)":"rgba(0,0,0,.09)",Math.round(2*e)/2,Math.round(2*o)/2,0.5,0.5,);}})(t),ctx.drawImage(zt(),0,0,dt,bt),C2[room]&&c2Tint(),cine?$dOv():$dTitle(),hurtFlash>0&&
((ctx.fillStyle="rgba(255,30,50,"+(hurtFlash/14)*0.28+")"),ctx.fillRect(0,0,dt,bt)),ctx.restore(),c2CutHud(),fadeNow>0&&
((ctx.fillStyle="rgba(0,0,0,"+Math.min(1,fadeNow)+")"),ctx.fillRect(0,0,384,216)),(function(){if(!Eo.on||!GM.on||(!Eo.dbg&&!Eo.tmr))
return void(""!==Ho&&((Ho=""),(Fo.hidden=!0)));let t="";(Eo.tmr&&(t+="RUN "+Wo(runT)+(won?" DONE":"")),Eo.dbg&&
(t+=
(t?"\n":"")+
room+
"  x"+
(0|player.x)+
" y"+
(0|player.y)+
(1!==Eo.ts?"  speed "+Eo.ts+"x":"")+
"\nhp "+
hp+
"  ammo "+
(Eo.ammo?"inf":ammo)+
"  stage "+
stage+
(snakeBoss?"\nboss "+snakeBoss.st+" "+Math.max(0,0|snakeBoss.hp)+"hp":"")+
"\nfps "+
(0|tr)+c3DevInfo()),t!==Ho&&((Ho=t),(Fo.textContent=t),(Fo.hidden=!1)));})());}
function frameLoop(t){if(GM.on){for(ar&&(tr=0.9*tr+(1e3/Math.max(1,t-ar))*0.1),ar=t,lt||(lt=t),st+=Math.min(100,t-lt)*(Eo.ts||1),lt=t,st>400&&(st=400);st>=16.67;)
(window.__evoPaused||update(),(st-=16.67));(render(),(Ot=requestAnimationFrame(frameLoop)));}}
((GM.step=(t)=>{for(let a=0;a<t;a++)update();}),(GM.render=render),(GM.spawnBoss=()=>{(spawnBoss(),(snakeBoss.st="walk"),(snakeBoss.t=0));}),(GM.cheat=()=>{((bossOpen=!0),Qo());}),(GM.sealTest=()=>{((bossOpen=!1),(corrode=0),Qo());}),(GM.give=(t)=>{(t.forEach((t)=>{(inv.includes(t)||inv.push(t),got.add(t));}),updateBag(),updateGuide());}),(GM.bench=()=>({beaker:[...ga],small:pa,worn:worn,gloved:gloved,stirred:b,tested:g,canFill:canFill,tray:Object.assign({},ua),msg:ma,})),(GM.craft=()=>openBench()),(GM.dbg=()=>({bossOpen:bossOpen,cine:cine?cine.ph:null,canFill:canFill,drops:drops.length,doorCut:doorCut,minis:minis.length,camX:camX,exitOpen:exitOpen,bv:shots.map((t)=>t.vx),face:player.face,hasGun:hasGun,ammo:ammo,hp:hp,boss:snakeBoss&&{hp:snakeBoss.hp,st:snakeBoss.st,x:snakeBoss.x},dead:dead,room:room,x:player.x,y:player.y,stage:stage,got:[...got],inv:[...inv],tnx:TS&&TS.ex,tnbz:TS&&TS.bz,hasPotion:hasPotion,exitOpen:exitOpen,erode:erode,pour:pourT,modal:modal,win:won,})),(GM.boss=(t)=>{snakeBoss&&Object.assign(snakeBoss,t);}),(GM.hurt=(t)=>hurtPlayer(t)),(GM.set=(t)=>{(t.room&&((room=t.room),backdrops[room]||backdrop(room)),void 0!==t.x&&(player.x=t.x),void 0!==t.y&&(player.y=t.y));}));const Eo={on:!1,god:0,ammo:0,speed:0,jump:0,fly:0,one:0,nopop:0,ts:1,dbg:0,box:0,tmr:1,sItems:0,sOpen:0,sRoom:"",};let Io="",Oo=0,Lo=null,Ho="";const No=qs("#dvc"),Do=qs("#dvp"),Go=qs("#gdv"),Bo=qs("#dnab"),Fo=qs("#dvh"),Wo=(t)=>{const a=t/60,e=Math.floor(a/60);return(e<10?"0":"")+e+":"+(a%60<10?"0":"")+(a%60).toFixed(2);};function zo(){qs("#dvd").textContent="●".repeat(Io.length)+"○".repeat(6-Io.length);}
function qo(){"712411"===Io?((Eo.on=!0),(No.hidden=!0),er()):((qs("#dvm").textContent="INVALID CODE"),(Io=""),zo(),No.classList.add("bad"),setTimeout(()=>No.classList.remove("bad"),400));}
function Yo(t){if("C"===t)Io=Io.slice(0,-1);else{if("OK"===t)return void qo();Io.length<6&&(Io+=t);}
(zo(),6===Io.length&&setTimeout(qo,140));}
const Uo=[["god","INVULNERABLE"],["ammo","INFINITE AMMO"],["speed","PLAYER SPEED x2"],["jump","HIGH JUMP"],["fly","AIR JUMP"],["one","BOSS ONE-HIT"],["nopop","SKIP ITEM READ-LOCK"],],Vo=[["dbg","INFO HUD"],["box","HITBOXES"],["tmr","RUN TIMER"],],jo=[[0.5,"0.5x"],[1,"1x"],[2,"2x"],[4,"4x"],],Jo=[["pod","POD"],["lab","LAB"],["store","STORAGE"],["med","MED BAY"],["cafe","CAFE"],["stair","STAIRWELL"],["hall","BASEMENT"],["ware","STAFF STORAGE"],["exitlab","BOSS ROOM"],["outside","OUTSIDE"],["street","CH2 STREET"],["road","CH2 ROAD"],["highway","CH2 HIGHWAY"],["wroad","CH2 CRACKED ROAD"],["forest","CH2 OLD FOREST"],["river","CH2 RIVER CROSSING"],["rroad","CH2 RIVER ROAD"],["cbridge","CH2 BROKEN BRIDGE"],["port","CH2 BRIDGE PORT"],["deck","CH3 SHIP DECK"],["helm","CH3 CONTROL ROOM"],["motor","CH3 MOTOR ROOM"],["isle","CH3 ISLAND"],["tctl","CH3 TOWER CONTROL"],["tgen","CH3 TOWER GENERATOR"],["tlab","CH3 HIDDEN LAB"],["crt","CH3 CITY HARBOR"],];function Xo(){for(const t in items)
"potion"===t||_t.includes(t)||(inv.includes(t)||inv.push(t),got.add(t));for(const t in rooms)(rooms[t].items||[]).forEach((t)=>(taken[t.id]=1));((hasGun=!0),(ammo=4),inv.includes("blaster")||inv.push("blaster"),(hasPotion=!0),inv.includes("potion")||inv.push("potion"),0===stage&&(stage=1),(Tt=!0),updateBag(),updateGuide(),updateHud());}
function Qo(){((hasGun=!0),(ammo=4),got.add("blaster"),inv.includes("blaster")||inv.push("blaster"),updateBag(),updateHud());}
function Ko(){((exitOpen=!0),(stage=2),(erode=260),(pourT=0),(potionUsed=!0),(hasPotion=!1),(inv=inv.filter((t)=>"potion"!==t)),updateBag(),updateGuide());}
function Zo(a){if(C2[a])
return((modal=0),(Oo=0),(qs("#gk").hidden=qs("#gx").hidden=!0),Eo.sItems&&Xo(),c3DevPre(a),void c2Start(a));((modal=0),(Oo=0),(qs("#gk").hidden=!0),(qs("#gx").hidden=!0),(player.vx=player.vy=0),("stair"!==a&&"exitlab"!==a)||Ko(),("hall"!==a&&"ware"!==a)||Ko(),"exitlab"===a&&((bossOpen=!0),hasGun||Qo()),"outside"===a&&(Ko(),hasGun||Qo(),(bossDone=!0),(doorCut=0)),enterRoom(a,"L"),"stair"===a&&(player.x=24),updateGuide(),updateHud());}
function $o(){(document.body.classList.add("ingame"),(Go.hidden=!Eo.on),Eo.on&&(Eo.sItems&&Xo(),Eo.sOpen&&Ko(),Eo.sRoom&&Zo(Eo.sRoom),updateHud()));}
function _o(){const a=GM.on,e=(t,a,e)=>'<button class="dvb'+(t?" on":"")+'" '+a+">"+e+"</button>",o=a?[["items","ALL ITEMS"],["gun","VENOM BLASTER"],["solvent","SOLVENT"],["open","OPEN BARRICADE"],["heal","RESTORE HP/AMMO"],["respawn","RESPAWN IN ROOM"],["killboss","KILL BOSS"],["resetboss","RESET BOSS"],["win","FINISH CHAPTER"],["restart","RESTART RUN"],]:[["items","START WITH ALL ITEMS"],["open","START WITH EXIT OPEN"],];let r=
"<h3>&#129516; DEVELOPER TOOLS</h3><p>Staff only. For testing and speedrun checks."+
(a?" Changes apply live.":" Set up your run, then press Play.")+
"</p>";((r+=
'<h4>TEST TOOLS</h4><div class="dvg">'+
Uo.map(([t,a])=>e(Eo[t],'data-t="'+t+'"',a+": "+(Eo[t]?"ON":"OFF"))).join("")+
"</div>"),(r+=
'<h4>GAME SPEED</h4><div class="dvg4">'+
jo.map(([t,a])=>e(Eo.ts===t,'data-s="'+t+'"',a)).join("")+
"</div>"),(r+=
'<h4>DEBUG VIEW</h4><div class="dvg">'+
Vo.map(([t,a])=>e(Eo[t],'data-t="'+t+'"',a+": "+(Eo[t]?"ON":"OFF"))).join("",)+
"</div>"),(r+=
"<h4>"+
(a?"TELEPORT":"START AT ROOM")+
'</h4><div class="dvg">'+
Jo.map(([t,o])=>
e((!a&&Eo.sRoom===t)||(a&&room===t),'data-r="'+t+'"',o),).join("")+
"</div>"),(r+=
"<h4>"+
(a?"STATE":"RUN SETUP")+
'</h4><div class="dvg">'+
o.map(([t,o])=>
e(!a&&(("items"===t&&Eo.sItems)||("open"===t&&Eo.sOpen)),'data-a="'+t+'"',o,),).join("")+
"</div>"),a&&
((r+=
'<h4>CHECKPOINT</h4><div class="dvg">'+
e(0,'data-a="cpsave"',"SAVE HERE")+
e(0,'data-a="cpload"',"LOAD"+(Lo?"":" (NONE)"))+
"</div>"),(r+=
'<h4>SPLITS</h4><div class="dvsp">'+
($.length?$.map((t)=>(rooms[t[0]].name||t[0])+"  "+Wo(t[1])).join("<br>"):"No splits yet.")+
"<br><b>RUN "+
Wo(runT)+
"</b></div>")),(qs("#dvb").innerHTML=r+(a?c3DevHTML(e):"")+'<button class="dvb big" id="dvx">CLOSE</button>'));}
let tr=60,ar=0;function er(){(GM.on&&((Oo=modal),(modal=1)),_o(),(Do.hidden=!1));}
function or(){((Do.hidden=!0),GM.on&&(modal=Oo?1:0),(Oo=0));}
((Bo.onclick=()=>((Io=""),zo(),(qs("#dvm").textContent="STAFF ACCESS CODE"),void(No.hidden=!1))),(Go.onclick=()=>er()),(qs("#dvk").onclick=(t)=>{const a=t.target.closest("[data-k]");a&&Yo(a.dataset.k);}),(qs("#dvq").onclick=()=>{No.hidden=!0;}),(Do.onclick=(a)=>{const e=a.target;if("dvx"===e.id||e===Do)return void or();const o=e.closest("button");o&&
(o.dataset.t?((Eo[o.dataset.t]^=1),_o()):o.dataset.s?((Eo.ts=+o.dataset.s),_o()):o.dataset.r?GM.on?(Zo(o.dataset.r),or()):((Eo.sRoom=Eo.sRoom===o.dataset.r?"":o.dataset.r),_o()):o.dataset.a&&
(function(a){if(GM.on&&a.slice(0,3)==="c3_")return void c3Dev(a);if(!GM.on)
return("items"===a?(Eo.sItems^=1):"open"===a&&(Eo.sOpen^=1),void _o());if("items"===a)(Xo(),toast("All items added.",1600));else if("gun"===a)(Qo(),toast("Venom Blaster added.",1600));else if("solvent"===a)
((hasPotion=!0),inv.includes("potion")||inv.push("potion"),0===stage&&(stage=1),updateBag(),updateGuide(),toast("Solvent added.",1600));else if("open"===a)(Ko(),toast("Barricade removed.",1600));else if("heal"===a)
((hp=5),(ammo=4),(invuln=0),updateHud(),toast("HP + ammo restored.",1600));else{if("respawn"===a)
return(enterRoom(room,"L"),(modal=0),(Oo=0),void(Do.hidden=!0));if("killboss"===a)
snakeBoss&&"dead"!==snakeBoss.st?("intro"===snakeBoss.st&&(snakeBoss.st="walk"),hitBoss(9999)):toast("No boss in this room.",2e3);else if("resetboss"===a)
((bossDone=!1),(won=0),(qs("#gw").hidden=!0),"exitlab"===room?spawnBoss():toast("Boss resets on entering the boss room.",2200));else if("win"===a)((bossDone=!0),(won=1),(qs("#gw").hidden=!1),c2WinFade());else{if("restart"===a)return(or(),resetGame(),void $o());if("cpsave"===a)
((Lo={room:room,P:Object.assign({},player),inv:[...inv],got:[...got],taken:Object.assign({},taken),broken:Object.assign({},broken),stage:stage,exitOpen:exitOpen,hasPotion:hasPotion,hasGun:hasGun,ammo:ammo,hp:hp,bossDone:bossDone,worn:worn,gloved:gloved,potionUsed:potionUsed,erode:erode,runT:runT,}),toast("Checkpoint saved.",1400));else if("cpload"===a)
return(Lo?((room=Lo.room),backdrops[room]||backdrop(room),Object.assign(player,Lo.P),(player.vx=player.vy=0),(inv=[...Lo.inv]),(got=new Set(Lo.got)),(taken=Object.assign({},Lo.taken)),(broken=Object.assign({},Lo.broken)),(stage=Lo.stage),(exitOpen=Lo.exitOpen),(hasPotion=Lo.hasPotion),(hasGun=Lo.hasGun),(ammo=Lo.ammo),(hp=Lo.hp),(bossDone=Lo.bossDone),(worn=Lo.worn),(gloved=Lo.gloved),(potionUsed=Lo.potionUsed),(erode=Lo.erode),(runT=Lo.runT),(shots=[]),(venoms=[]),(waves=[]),(snakeBoss=null),(dead=!1),(won=0),(qs("#gd").hidden=!0),(qs("#gw").hidden=!0),"exitlab"!==room||bossDone||spawnBoss(),updateBag(),updateGuide(),updateHud(),toast("Checkpoint loaded.",1400)):toast("No checkpoint saved yet.",1600),void or());}}
_o();})(o.dataset.a));}),addEventListener("keydown",(t)=>{No.hidden||
(/^[0-9]$/.test(t.key)?Yo(t.key):"Backspace"===t.key?Yo("C"):"Escape"===t.key&&(No.hidden=!0));}),(window.startGame=function(a,o){($sx("stop"),(playerName=a||playerName),o&&(playerLook=o),(GM.on=!0),(e.hidden=!1),(ot.hidden=!0));const r=(ra=matchMedia("(pointer:coarse)").matches||"ontouchstart"in window);(qs("#gp").classList.toggle("on",r||"#touch"===location.hash),document.activeElement&&document.activeElement.blur&&document.activeElement.blur());for(const t in _a)_a[t].rel();((keys.l=keys.r=keys.s=keys.u=0),(jumpBuf=punchBuf=useBuf=0),resetGame(),(function(){let t=null;try{t=JSON.parse(localStorage.getItem(checkpointKey())||"null");}catch(t){}
!t||
!(t.v>=1)||
(2===t.ch?(c2Resume(t),1):0)||
(t.pre?((inv=t.inv||[]),(got=new Set(t.got||[])),(taken=t.taken||{}),(broken=t.broken||{}),(worn=!!t.worn),(gloved=!!t.gloved),(hasGoggles=!!t.hasGoggles),(hasPotion=inv.includes("potion")),(hasGun=!!t.hasGun),(ammo=t.ammo>=0?t.ammo:4),(canFill=t.canFill||0),(stage=got.size||hasPotion?1:0),(Tt=stage>0),updateBag(),updateGuide(),toast("<b>PROGRESS RESTORED</b><br>Your bag and discoveries are back. Keep going!",3200),1):0)||
((inv=t.inv||[]),(got=new Set(t.got||[])),(taken=t.taken||{}),(broken=t.broken||{}),(worn=!!t.worn),(gloved=!!t.gloved),(hasGoggles=!!t.hasGoggles),(hasGun=!!t.hasGun),(ammo=t.ammo>=0?t.ammo:4),(canFill=t.canFill||0),(stage=2),(exitOpen=!0),(erode=260),(pourT=0),(hasPotion=!1),(potionUsed=!0),(Tt=!0),updateBag(),updateGuide(),toast("<b>CHECKPOINT</b><br>The barricade is already dissolved. Head for the fire exit.",3400,));})(),fo(),backdrops.pod||backdrop("pod"),$o(),qs("#gg").classList.remove("min"),(lt=0),(st=0),cancelAnimationFrame(Ot),(Ot=requestAnimationFrame(frameLoop)));}));const fitHud=()=>
document.documentElement.style.setProperty("--hud",Math.max(1,Math.min(innerWidth/900,innerHeight/440,2.4)).toFixed(2),);(fitHud(),addEventListener("resize",fitHud));window.__evoRoom=()=>room;window.__evoBoss=()=>(snakeBoss?snakeBoss.st:ch2&&ch2.sp?"chase":"");const C2_FLOOR=92,C2_SP_S=1.35,C2_SP_HEAD=76,C2_TUNNEL=52;const C2_CAR={sedan:[38,19],hatch:[34,17],van:[44,24],truck:[62,29],bus:[76,28],};const C2_COLS=["#8a3a26","#3a6a5a","#2a5a8a","#a8862a","#6a6e70","#b8b4a4","#5a3a5a"];const c2NewCar=(x,k,i)=>({x,k,w:C2_CAR[k][0],h:C2_CAR[k][1],c:C2_COLS[i%C2_COLS.length],f:i%2?1:-1,s:i,burn:i%4===1,});function c2HighwayCars(){const seq=["sedan","van","hatch","truck","sedan","bus","hatch","van","sedan","truck","hatch","bus",],cars=[];let x=1300;for(let i=0;x>150;i++){const k=seq[i%seq.length],c=c2NewCar(x-C2_CAR[k][0],k,i+3);if(c.x<120)break;cars.push(c);x=c.x-(46+40*r(i,57));}
return cars;}
const C2={street:{name:"CITY STREET",L:"road",R:null,W:384,cars:[c2NewCar(196,"sedan",0)],seeds:[21,22],},road:{name:"THE ROAD",L:"highway",R:"street",W:576,cars:[c2NewCar(430,"hatch",1),c2NewCar(292,"van",2),c2NewCar(120,"sedan",4)],seeds:[31,32,33],},highway:{name:"HIGHWAY",L:null,R:"road",W:1536,cars:c2HighwayCars(),seeds:[41,42,43,44],},beyond:{name:"BEYOND THE TUNNEL",L:null,R:null,W:576,cars:[c2NewCar(470,"van",6),c2NewCar(330,"sedan",8),c2NewCar(196,"hatch",12),c2NewCar(66,"truck",14)],seeds:[51,52,53],},};for(const k in C2){const d=C2[k];rooms[k]={name:d.name,L:d.L,R:d.R,W:d.W,crates:[],items:[],ints:[],plats:d.cars.map((c)=>({x:c.x,y:C2_FLOOR-c.h,w:c.w})),};}
Object.assign(Ne,{street:["255,170,110",0,0],road:["255,170,110",0,0],highway:["255,160,100",0,0],beyond:["255,176,110",0,0],});Object.assign(De,{street:{c:"160,100,70",l:"255,176,110",a:0.14,dk:0.3},road:{c:"150,100,70",l:"255,170,104",a:0.15,dk:0.32},highway:{c:"150,96,66",l:"255,164,100",a:0.17,dk:0.36},beyond:{c:"160,104,72",l:"255,180,116",a:0.14,dk:0.3},});let ch2=null;const c2TC={};function c2Tile(id,i,seed){const k=id+i;return c2TC[k]||(c2TC[k]=Ae((t)=>{Ye(t,0,184,{hs:id==="street"?1.2:1,seed,grassH:id==="highway"?10:18,sun:60+70*i,bh:id==="highway"?0.8:1.1,puddles:id==="highway"?[]:[[90+40*i,204,30,4]],cars:[],});c2Apoc(t,i);id==="highway"?(c2Deck(t,i),c2Ground(t,i),c2Broken(t,i,id)):(t.fog(0,150,384,216,"#d8f0c0",0.3,seed,34,8,0.2),c2Ground(t,i),c2Broken(t,i,id));}));}const c2W={};function c2Warm(id){if(c2W[id]||backdrops[id])return;c2W[id]=1;const d=C2[id],jobs=d.seeds.map((seed,i)=>()=>c2Tile(id,i,seed));id==="highway"&&jobs.push(()=>{c2TC.tw||(c2TC.tw=Ae(c2Tower));},()=>{c2TC.tn||(c2TC.tn=Ae((t)=>c2Tunnel(t)));});jobs.push(()=>{backdrops[id]||backdrop(id);});let n=0;const step=()=>{if(!GM.on){c2W[id]=0;return;}if(n>=jobs.length)return;if((ch2&&ch2.sp&&!ch2.end)||!tnCanWork()){setTimeout(step,200);return;}try{jobs[n++]();}catch(e){}setTimeout(step,280);};setTimeout(step,450);}function c2Backdrop(id){if(C2[id]&&C2[id].c4)return c4Backdrop(id);if(C2[id]&&C2[id].c3)return c3Blank();const d=C2[id],cv=document.createElement("canvas");cv.width=2*d.W;cv.height=216;const g=cv.getContext("2d"),tiles=d.seeds.map((seed,i)=>c2Tile(id,i,seed));const OV=48,mask=document.createElement("canvas");mask.width=384;mask.height=216;for(let i=0;i*(384-OV)<2*d.W;i++){const m=mask.getContext("2d");m.globalCompositeOperation="source-over";m.clearRect(0,0,384,216);m.drawImage(tiles[i%tiles.length],0,0);if(i){const gr=m.createLinearGradient(0,0,384,0);gr.addColorStop(0,"rgba(0,0,0,0)");gr.addColorStop(OV/384,"rgba(0,0,0,1)");gr.addColorStop(1,"rgba(0,0,0,1)");m.globalCompositeOperation="destination-in";m.fillStyle=gr;m.fillRect(0,0,384,216);}
g.drawImage(mask,i*(384-OV),0);}
if(id==="highway"){g.drawImage(c2TC.tw||(c2TC.tw=Ae(c2Tower)),0,0);g.drawImage(c2TC.tn||(c2TC.tn=Ae((t)=>c2Tunnel(t))),0,0,);g.font='10px "Press Start 2P",monospace';g.textBaseline="top";g.fillStyle="#d8e8d8";g.fillText("TUNNEL",30,48);g.fillStyle="#c83a2a";g.fillText("STILL HERE",128,170);}
return cv;}
function c2Deck(t,i){t.rect(0,166,384,18,"#7e8278");t.rect(0,166,384,2,"#b8bcae");t.rect(0,182,384,2,"#4a4e48");for(let x=(i*17)%48;x<384;x+=48)t.rect(x,168,1,14,"#5a5e56");for(let k=0;k<40;k++)
t.rect(384*r(k,70+i),168+14*r(k,80+i),2,1,"#6a6e64",0.6);for(let k=0;k<9;k++){const x=384*r(k,90+i),L=4+10*r(k,91+i);for(let y=0;y<L;y++)
t.rect(x+Math.sin(y*0.7+k)*1.2,166+y,1,1,y%3?[44,110,50]:[90,170,70]);}
t.rect(0,184,384,32,"#34383a");for(let k=0;k<220;k++)
t.rect(384*r(k,100+i),184+32*r(k,110+i),1,1,r(k,120)<0.5?"#2a2e30":"#44484a",);for(let x=(i*31)%40;x<384;x+=40)t.rect(x,199,18,2,"#c8b44a",0.7);t.rect(0,185,384,1,"#56595a");for(let k=0;k<6;k++){let x=384*r(k,130+i),y=186+20*r(k,131+i);for(let s=0;s<12;s++){t.rect(x,y,1,1,"#1e2224");x+=1+(r(s,k+140)<0.5?0:1);y+=r(s,k+150)<0.5?-1:1;}}
for(let k=0;k<18;k++){const x=384*r(k,160+i),hh=2+5*r(k,161+i);t.rect(x,184-hh,1,hh,[70,150,60]);t.rect(x+1,185-hh*0.7,1,hh*0.7,[40,110,50]);}}
function c2Tunnel(t){t.rect(0,40,112,144,"#6e7068");t.rect(0,40,112,4,"#a8ab9e");for(let y=48;y<184;y+=12)t.rect(0,y,112,1,"#5a5c54");t.rect(0,64,96,120,"#06070a");for(let y=64;y<184;y++){const k=(y-64)/120;t.rect(96-6*(1-k),y,6*(1-k)+1,1,"#22242a");}
for(let k=0;k<10;k++)t.rect(10+8*k,76+9*(k%3),2,2,"#ffcf6a",0.25);t.rect(18,46,72,12,"#1c4a2a");t.rect(19,47,70,10,"#2a6a3a");for(let k=0;k<26;k++){const x=112*r(k,170),L=6+30*r(k,171);for(let y=0;y<L;y++)
t.rect(x+Math.sin(y*0.5+k)*1.5,40+y,1,1,y%4?[34,100,46]:[100,190,80]);}
t.rect(0,184,112,32,"#2a2c2e",0.6);}
const c2Mix=(a,b,k)=>{const p=(h)=>[1,3,5].map((i)=>parseInt(h.slice(i,i+2),16));const x=p(a),y=p(b);return"rgb("+x.map((v,i)=>Math.round(v+(y[i]-v)*k)).join(",")+")";};function c2Car(c){if(c.hide||c.x<camX-90||c.x>camX+270)return;const j=
c2cut&&c2cut.rumble?Math.round(Math.sin(tick*1.9+c.s*2.1)*1.4*c2cut.rumble):0;j&&(ctx.save(),ctx.translate(0,j));c2CarBody(c);c2Wreck(c);c.burn&&c2Fire(c);j&&ctx.restore();}
function c2CarBody(c){const g=C2_FLOOR,x=c.x,w=c.w,h=c.h,lite=c2Mix(c.c,"#ffffff",0.3),dark=c2Mix(c.c,"#000000",0.45),rust=c2Mix(c.c,"#6a3a1a",0.6);Ft(x+w/2,g+1,w*0.62,0.5);const bodyTop=c.k==="van"||c.k==="bus"?g-h:g-Math.round(h*0.58);if(c.k==="truck"){const cabW=18,cabX=c.f>0?x:x+w-cabW,boxX=c.f>0?x+cabW+1:x;fill(dark,boxX,g-h,w-cabW-1,h-3);fill(c2Mix(c.c,"#c8c4b4",0.5),boxX+1,g-h+1,w-cabW-3,h-5);for(let k=4;k<w-cabW-3;k+=6)
fill(c2Mix(c.c,"#8a8678",0.5),boxX+k,g-h+2,1,h-7);fill(lite,boxX,g-h,w-cabW-1,1);fill(c.c,cabX,g-Math.round(h*0.72),cabW,Math.round(h*0.72)-3);fill("#10161c",cabX+(c.f>0?2:6),g-Math.round(h*0.72)+2,10,6);fill("rgba(200,230,240,.35)",cabX+(c.f>0?3:7),g-Math.round(h*0.72)+3,3,1);fill(lite,cabX,g-Math.round(h*0.72),cabW,1);}else{fill(dark,x,bodyTop,w,g-3-bodyTop);fill(c.c,x+1,bodyTop+1,w-2,g-5-bodyTop);fill(lite,x+1,bodyTop,w-2,1);if(c.k==="van"||c.k==="bus"){const step=c.k==="bus"?10:12;for(let k=4;k<w-6;k+=step){fill("#10161c",x+k,bodyTop+3,step-4,6);r(k,c.s)<0.6&&fill("rgba(200,230,240,.3)",x+k+1,bodyTop+4,2,1);}
c.k==="bus"&&fill(c2Mix(c.c,"#e8d070",0.5),x+1,bodyTop+11,w-2,2);}else{const cx=x+w*0.22,cw=w*0.56,ch=h-(g-bodyTop);for(let k=0;k<ch;k++){const ins=Math.round(((ch-k)/ch)*3);fill(k===0?lite:dark,cx+ins,g-h+k,cw-2*ins,1);}
fill("#10161c",cx+3,g-h+2,cw/2-4,ch-2);fill("#10161c",cx+cw/2+1,g-h+2,cw/2-4,ch-2);fill("rgba(200,230,240,.3)",cx+4,g-h+3,2,1);}}
for(let k=0;k<5;k++)
fill(rust,x+2+(w-6)*r(k,c.s+30),bodyTop+2+5*r(k,c.s+31),2+2*r(k,c.s+32),1+r(k,c.s+33),);[x+5,x+w-11].forEach((wx)=>{fill("#121418",wx,g-6,7,6);fill("#4a4e52",wx+2,g-4,3,2);});for(let k=0;k<4;k++){const vx=x+3+(w-6)*r(k,c.s+40),L=3+6*r(k,c.s+41),top=c.k==="truck"?g-h:g-h;for(let y=0;y<L;y++)
fill(y%3?"#2a6a30":"#4a9a3a",vx+Math.sin(y+k)*0.8,top+y,1,1);}}
function c2Spider(sp){ctx.save();ctx.translate(Math.round(2*sp.x)/2,C2_FLOOR+1-(sp.oy||0));ctx.scale(-1,1);window.Ea(0,0,C2_SP_S,sp.t*36,2);ctx.restore();}
const c2Mouth=(sp)=>[sp.x-66,C2_FLOOR-44];const c2At=(w,k)=>[w.sx+(w.tx-w.sx)*k,w.sy+(w.ty-w.sy)*k-(34+0.12*Math.abs(w.tx-w.sx))*Math.sin(Math.PI*k),];function c2Draw(){const d=C2[room];if(!d)return;d.c3&&c3Back();c2Scenery(d);d.cars.forEach(c2Car);c2CutWorld();d.c3&&c3Draw();if(!ch2)return;ch2.patches.forEach((p)=>{const a=Math.min(1,p.life/60)*(p.used?0.45:1);ctx.globalAlpha=a;ctx.strokeStyle="#eef4f0";ctx.lineWidth=0.5;for(let k=0;k<8;k++){const an=(k/8)*Math.PI;ctx.beginPath();ctx.moveTo(p.x,p.y-0.5);ctx.lineTo(p.x+Math.cos(an)*p.w*0.55,p.y-0.5-Math.sin(an)*4);ctx.stroke();}
for(let k=1;k<=3;k++){ctx.beginPath();ctx.ellipse(p.x,p.y-0.5,(p.w*0.55*k)/3,(4*k)/3,0,Math.PI,2*Math.PI);ctx.stroke();}
ctx.globalAlpha=1;});if(ch2.sp)c2Spider(ch2.sp);ch2.webs.forEach((w)=>{if(w.t<w.tele){const k=w.t/w.tele,pulse=0.5+0.5*Math.sin(tick/2.5),[mx,my]=c2Mouth(ch2.sp||{x:w.sx+C2_SP_HEAD});const ww={sx:mx,sy:my,tx:w.tx,ty:w.ty};for(let s=1;s<22;s++){if((s+(tick>>2))%3===0)continue;const[x,y]=c2At(ww,s/22);fill("rgba(255,50,50,"+(0.25+0.55*k)+")",x-0.5,y-0.5,1,1);}
ctx.globalAlpha=0.25+0.35*k;fill("#ff2020",w.tx-9,w.ty-1,18,1);ctx.globalAlpha=0.5+0.5*pulse;for(let s=0;s<32;s++){const an=(s/32)*6.283;fill("#ff3a3a",w.tx+Math.cos(an)*(6+2*k),w.ty-0.5+Math.sin(an)*1.6,1,0.5);}
ctx.globalAlpha=1;pulse>0.4&&
(fill("#2a0000",w.tx-1.5,w.ty-16,3,9),fill("#ff4040",w.tx-1,w.ty-15.5,2,5),fill("#ff4040",w.tx-1,w.ty-9.5,2,2));glow(w.tx,w.ty,10,"255,40,40",0.25+0.3*k);}else{const[x,y]=c2At(w,Math.min(1,(w.t-w.tele)/w.T));if(ch2.sp){const[mx,my]=c2Mouth(ch2.sp);ctx.strokeStyle="rgba(235,240,235,.45)";ctx.lineWidth=0.5;ctx.beginPath();ctx.moveTo(mx,my);ctx.quadraticCurveTo((mx+x)/2,Math.min(my,y)-10,x,y);ctx.stroke();}
fill("#f4f8f4",x-2,y-2,4,4);fill("#c8d0cc",x-1,y+1,2,1);glow(x,y,6,"230,240,235",0.4);}});if(ch2.stuck>0){ctx.strokeStyle="rgba(240,246,240,.8)";ctx.lineWidth=0.5;for(let k=0;k<5;k++){ctx.beginPath();ctx.moveTo(player.x-6+3*k,player.y);ctx.lineTo(player.x+5-2.5*k,player.y-8-5*k);ctx.stroke();}}}
function c2Arrow(){if(c3Mine())return void c3Arrow();modal||won||dead||c2cut||(ch2&&ch2.sp)||vo(camX+18,56,-1);}
function c2Guide(){if(c3Guide())return;qs("#gg h4 span").textContent="QUEST";const q="<b>Reach the radio station.</b><br>The way is hard. ";qs("#ggb").innerHTML=
room==="street"?q+"No car, no bus: you go on foot. Head LEFT.":room==="road"?q+"Follow the road LEFT to the highway. Jump onto wrecks, or climb vines (hold UP).":ch2&&ch2.sp?"<b>RUN!</b><br>Jump on the cars. A red arc and mark show where the web lands: be somewhere else.":ch2&&ch2.heard?"<b>Something is coming…</b><br>Keep moving LEFT.":q+"Cross the highway. Keep heading LEFT.";}
function c2Save(at){try{const k=checkpointKey(),js=JSON.stringify({v:1,ch:2,at,tn:TS,inv:inv.filter((t)=>t!=="potion"),got:[...got],hasGun,worn,gloved,hasGoggles,});if(localStorage.getItem(k)!==js){localStorage.setItem(k,js);window.__evoSaved&&window.__evoSaved();}}catch(t){}}
function c2Start(at){(at||"street")==="street"&&(TS=tnFresh());c2seen=false;c2cut=null;const keep={inv:inv.filter((t)=>t!=="potion"),got:[...got],hasGun,worn,gloved,hasGoggles,};resetGame();((inv=keep.inv),(got=new Set(keep.got)),(hasGun=keep.hasGun),(ammo=4));((worn=keep.worn),(gloved=keep.gloved),(hasGoggles=keep.hasGoggles));((stage=3),(exitOpen=!0),(bossDone=!0),(bossOpen=!0),(potionUsed=!0),(Tt=!0));enterRoom(at||"street","R");c2Save(at||"street");(at||"street")==="street"&&
toast("<b>CHAPTER 2: ON FOOT</b><br>No cars run anymore. The radio station is far to the LEFT.",4200,);(updateBag(),updateGuide(),updateHud());}
function c2Resume(cp){inv=cp.inv||[];got=new Set(cp.got||[]);hasGun=!!cp.hasGun;worn=!!cp.worn;gloved=!!cp.gloved;hasGoggles=!!cp.hasGoggles;TS=Object.assign(tnFresh(),cp.tn||{});c2Start(C2[cp.at]||tnIs(cp.at)?cp.at:"street");}
function c2Enter(id){document.body.classList.toggle("ch2",!!C2[id]);player.climb=null;c2air=0;ch2=
id==="highway"?{t:0,heard:0,sp:null,webs:[],patches:[],stuck:0,n:0,end:0}:null;id==="highway"&&c2Save("highway");id==="highway"&&!c2seen?c2CutStart():id==="highway"&&toast("<b>THE HIGHWAY</b><br>Keep heading left.",2200);id==="street"&&c2Warm("road");id==="road"&&c2Warm("highway");}
const c2Surface=(x)=>{let y=C2_FLOOR;for(const c of C2[room].cars)
x>c.x+1&&x<c.x+c.w-1&&(y=Math.min(y,C2_FLOOR-c.h));return y;};function c2Die(h,p){if(dead||Eo.god)return;((hp=0),(dead=!0),$sx("die"),updateHud());qs("#gd").querySelector("h3").textContent=h;qs("#gd").querySelector("p").textContent=p;qs("#gd").hidden=!1;}
const C2_TIP=
"Keep running LEFT. Jump onto the cars instead of stopping at them, never stand on a red mark when the web lands, and stay out of old webs: getting stuck lets it catch up.";function c2Hurt(){player.climb=null;hurtPlayer(1);player.kbv=-1.6;dead&&
((qs("#gd").querySelector("h3").textContent="WEBBED"),(qs("#gd").querySelector("p").textContent=C2_TIP));}
function c2Update(){if(!C2[room])return;c2WorldUpdate();const c=ch2;if(!c||room!=="highway")return;if(c2cut)return void c2CutUpdate();c.t++;c.stuck>0&&c.stuck--;if(!c.heard&&player.x<roomW()-170){((c.heard=1),(c.ht=0),(shake=12),$sx("rumble"),$sx("growl"));toast("<i>…what was that?</i><br>Something huge is moving behind you.",2600);updateGuide();}
if(c.heard&&!c.sp&&++c.ht>150){c.sp={x:Math.min(roomW()+40,player.x+130+C2_SP_HEAD),t:0,cd:110,st:"chase"};((shake=20),$sx("spiderscreech"),smoke(camX+190,C2_FLOOR,10,-1));toast("<b>RUN!</b><br>Jump on the cars. The red mark shows where its web lands.",3600);updateGuide();}
const sp=c.sp;if(sp){sp.t++;const head=sp.x-C2_SP_HEAD,gap=head-player.x;if(sp.st==="chase"){sp.pause>0?sp.pause--:(sp.x-=gap>90?1.75:gap>45?1.26:1.12);sp.t%13===0&&$sx("skitter");sp.t%26===0&&(shake=Math.max(shake,2));if(sp.x-C2_SP_HEAD<C2_TUNNEL+10){((sp.x=C2_TUNNEL+10+C2_SP_HEAD),(sp.st="blocked"),(sp.bt=0));((shake=18),$sx("crash"),$sx("spiderscreech"));sparks(C2_TUNNEL+8,C2_FLOOR-30,16,["#aab4c4","#6a7480"],2,0.12,24);}
if(gap<4&&player.y>C2_FLOOR-60)
c2Die("THE SPIDER GOT YOU","It was faster for one moment. "+C2_TIP);if(--sp.cd<=0&&player.x>110){const lead=0.7*player.vx*72,aim=(dx)=>{const tx=Math.max(C2_TUNNEL+30,Math.min(head-30,player.x+lead+dx)),el=player.y<C2_FLOOR-24||player.climb;c.webs.push({tx,ty:el?player.y-8:c2Surface(tx),el,t:0,tele:40,T:32,sx:0,sy:0,});};(aim(6*(Math.random()-0.5)),c.n++>=4&&Math.random()<0.45&&aim(-34));sp.cd=Math.max(80,140-c.n*6);$sx("hiss");}}else(sp.bt++,sp.bt%40===0&&($sx("spiderscreech"),(shake=6)));}
c.webs=c.webs.filter((w)=>{w.t++;if(w.t===w.tele){const[mx,my]=sp?c2Mouth(sp):[w.tx+60,C2_FLOOR-20];((w.sx=mx),(w.sy=my),$sx("web"));}
if(w.t<=w.tele)return!0;const k=(w.t-w.tele)/w.T,[x,y]=c2At(w,Math.min(1,k));if(k>0.45&&Math.abs(x-player.x)<5&&y>player.y-32&&y<player.y+1){(c2Hurt(),(c.stuck=36),$sx("websplat"),sparks(x,y,10,["#eef4f0","#c8d0cc"],1.4,0.1,16));return!1;}
if(k>=1){w.el||c.patches.push({x:w.tx,y:w.ty,w:20,life:480,used:0});($sx("websplat"),sparks(w.tx,w.ty-1,10,["#eef4f0","#c8d0cc"],1.3,0.12,18));return!1;}
return!0;});c.patches=c.patches.filter((p)=>{p.life--;if(!p.used&&
player.on&&
Math.abs(player.y-p.y)<1.5&&
Math.abs(player.x-p.x)<p.w/2+1){((p.used=1),(c.stuck=36),$sx("stuck"));c.warned||
((c.warned=1),toast("<b>STUCK IN THE WEB!</b><br>Jump over webs, don't land in them.",2000));}
return p.life>0;});if(!c.end&&player.x<28){((c.end=1),(won=2),(keys.l=keys.r=keys.s=0),$sx("success"));((fadeTo=1),(onFaded=()=>{tnEnterTunnel();}));}}
function c2Pre(){c3Pre();ch2&&ch2.stuck>0&&((player.vx*=0.15),player.vy<0&&(player.vy=0));const v=player.climb;if(!v)return;if(player.vx){player.climb=null;player.vy=-1.6;player.kb=6;player.kbv=1.2*Math.sign(player.vx);}else{player.x=v.x;player.vy=keys.u?-0.85:useBuf>0?1.5:0;}}
function c2Walls(x0){const d=C2[room];if(!d)return;for(const c of d.cars){const top=C2_FLOOR-c.h;if(player.y>top+0.5&&player.x>c.x-3&&player.x<c.x+c.w+3)
player.x=
x0<=c.x-3||(x0<c.x+c.w/2&&!(x0>=c.x+c.w+3))?c.x-3:c.x+c.w+3;}}
function c2Retry(){if(c3Retry())return;c2seen=true;((qs("#gd").hidden=!0),(dead=!1),(hp=5),(invuln=60),(player.kb=0),(shots=[]));((fadeNow=1),(fadeTo=0));(enterRoom("highway","R"),updateHud(),updateGuide());}
let c2wT=0;function c2WinReset(){clearTimeout(c2wT);qs("#gw").classList.remove("out");qs("#c2t").hidden=true;qs("#c2t").classList.remove("on");}
function c2WinFade(d){clearTimeout(c2wT);c2wT=setTimeout(()=>{const w=qs("#gw");if(w.hidden||won!==1)return;w.classList.add("out");c2wT=setTimeout(()=>{if(w.hidden)return;w.hidden=true;w.classList.remove("out");const c=qs("#c2t");c.hidden=false;void c.offsetWidth;c.classList.add("on");qs("#c2Go").focus();},950);},d===undefined?7000:d);}
qs("#wNext").onclick=()=>c2WinFade(0);qs("#c2Go").onclick=()=>(c2WinReset(),c2Start("street"));qs("#c2Again").onclick=()=>((qs("#c2w").hidden=!0),(won=0),tnReplay());qs("#c2Menu").onclick=()=>((qs("#c2w").hidden=!0),ee());window.__evoChase=()=>!!((ch2&&ch2.sp&&!ch2.end&&!dead&&!won)||(window.__tnChase&&window.__tnChase()&&!dead&&!won));GM.ch2=()=>
ch2&&{heard:ch2.heard,sp:ch2.sp&&{x:ch2.sp.x,st:ch2.sp.st,head:ch2.sp.x-C2_SP_HEAD},webs:ch2.webs.map((w)=>({tx:w.tx,ty:w.ty,t:w.t,tele:w.tele,T:w.T})),patches:ch2.patches.map((p)=>({x:p.x,y:p.y,used:p.used})),stuck:ch2.stuck,end:ch2.end,};GM.c2={paint:(id)=>{const t=performance.now();return(delete backdrops[id],backdrop(id),performance.now()-t);},start:c2Start,flora:(id)=>C2_F[id],dbg:()=>({sup:c2sup,tree:c2tree,air:c2air}),cars:(id)=>C2[id].cars,surface:(x)=>c2Surface(x),};const C2_F={};let c2sup=0,c2tree=0,c2air=0,c2hint=0,c2snapped=0;function c2Flora(id,d){const f=(C2_F[id]={trees:[],vines:[],branches:[],gantries:[],smoke:[]}),plats=rooms[id].plats,sd=5*d.seeds[0],add=(b)=>{b.p={x:b.side<0?b.x-b.len:b.x,y:C2_FLOOR-b.h,w:b.len,br:b};plats.push(b.p);f.branches.push(b);},vine=(x,top,len,rot,dir,s)=>
f.vines.push({x,top,len,rot:rot?1:0,dir,s,t:0,snapY:top+len*(0.15+0.7*r(s,9)),broken:0,}),n=id==="highway"?9:id==="road"?3:2,span=(d.W-300)/n;for(let i=0;i<n;i++){const x=Math.round(170+span*(i+0.5)+(r(i,sd)-0.5)*span*0.5),side=r(i,sd+2)<0.5?-1:1,t={x,side,dead:r(i,sd+1)<(id==="highway"?0.5:0.3),top:72+14*r(i,sd+3),s:sd+i,},low={x,side,h:30+4*r(i,sd+4),len:26+8*r(i,sd+5),rot:0,load:0,snapT:0,gone:0,},up={x,side:-side,h:52+8*r(i,sd+6),len:30+10*r(i,sd+7),rot:r(i,sd+8)<0.4?1:0,load:0,snapT:40+((70*r(i,sd+9))|0),gone:0,};t.br=[low,up];add(low);add(up);vine(x+up.side*up.len,C2_FLOOR-up.h,up.h-6,r(i,sd+10)<0.45,-up.side,sd+3*i,);f.trees.push(t);}
if(id==="highway")
[470,880,1230].forEach((gx,k)=>{const g={x:gx,w:104,h:72,k},a=r(gx,3)<0.5;f.gantries.push(g);plats.push({x:gx,y:C2_FLOOR-g.h,w:g.w,gan:1});vine(gx+7,C2_FLOOR-g.h,g.h-6,a,1,gx);vine(gx+g.w-7,C2_FLOOR-g.h,g.h-6,!a&&r(gx,4)<0.7,-1,gx+1);});f.smoke={street:[[90,60],[300,66],],road:[[150,64],[420,60],],highway:[[260,64],[640,60],[1010,66],[1380,62],],beyond:[[150,64],[400,60],],}[id];}
for(const k in C2)c2Flora(k,C2[k]);function c2Apoc(t,i){for(let y=0;y<184;y++){const up=Math.max(0,1-y/110),low=Math.max(0,(y-40)/144);up>0&&t.rect(0,y,384,1,"#1a100c",0.62*up);t.rect(0,y,384,1,"#c8501c",0.42*low*low);}
for(let k=0;k<16;k++){const x=384*r(k,300+i),y=96+52*r(k,310+i);t.rect(x-1,y-1,4,4,"#ff7020",0.16);t.rect(x,y,2,2,"#ffa040",0.9);}
const ox=30+200*r(i,320),oy=118+8*r(i,321),ow=120+60*r(i,330);for(let p=ox+10;p<ox+ow-8;p+=34)
t.rect(p,oy+5,5,184-oy-5,"#262a2c",0.8);t.rect(ox,oy,ow,5,"#2a2e30",0.9);t.rect(ox,oy,ow,1,"#4a5054",0.9);for(let k=0;k<5;k++)
t.line(ox+ow+k*2,oy+4,ox+ow+k*2+(k%2?4:-2),oy+12+k*3,"#5a3a22");t.rect(ox-4,oy-2,ow+16,60,"#9ab0a8",0.12);t.rect(0,150,384,34,"#2a1c16",0.22);}
/* ---- road damage (baked into each Chapter 2 backdrop tile) ---- */
function c2Broken(t,i,id){
  const hw=id==="highway",R=(k,a)=>r(k,a+i*13),DK="#0b0d0e",G=[[70,150,60],[40,110,50],[98,178,72]];
  const tuft=(x,y,h,k)=>{for(let b=0;b<3;b++){const bh=Math.max(2,Math.round(h*(0.55+0.45*R(k+b,230+x))));t.rect(x+b-1+((b===1)?0:(b?1:-1))*0,y-bh,1,bh,G[(b+k)%3]);}if(R(k,231+x)<0.22)t.rect(x,y-h-1,1,1,R(k,232+x)<0.5?"#ff86d0":"#ffd070");};
  /* lane paint worn away */
  if(hw)for(let x=(i*31)%40;x<384;x+=40)if(R(x,200)<0.6)for(let k=0;k<5;k++)t.rect(x+3*R(k,201+x),198+2*R(k,202+x),2+3*R(k,203+x),2,"#34383a");
  /* long jagged cracks with a lit edge, branching */
  const crack=(x,y,L,dx,d)=>{for(let s=0;s<L;s++){t.rect(x,y,1,1,DK);t.rect(x,y+1,1,1,"#7a7e7c",0.7);if(s%3===0){t.rect(x,y-1,1,1,"#9a9e9a",0.35);t.rect(x+1,y,1,1,DK);}x+=dx;const q=R(s,x+210);y+=q<0.34?-1:q<0.67?0:1;y=Math.max(186,Math.min(213,y));if(d<2&&R(s,x+212)<0.07)crack(x,y,6+((R(s,x+213)*10)|0),-dx,d+1);if(R(s,x+214)<0.05)tuft(x,y,3+((R(s,x+215)*4)|0),s);}};
  const nc=hw?7:4;for(let k=0;k<nc;k++)crack(384*R(k,220),188+22*R(k,221),30+((60*R(k,222))|0),R(k,223)<0.5?1:-1,0);
  /* potholes: dark pit, lit rim, puddle sheen, rubble and weeds around it */
  const np=hw?4:2;for(let k=0;k<np;k++){const cx=20+344*R(k,240),cy=192+14*R(k,241),w=10+10*R(k,242);
    for(let yy=-3;yy<=3;yy++){const hf=Math.round(Math.sqrt(Math.max(0,1-(yy*yy)/10))*w/2);t.rect(cx-hf-1,cy+yy,hf*2+2,1,yy<0?"#9a9e9a":"#4a4e4c");t.rect(cx-hf,cy+yy,hf*2,1,yy>=0?DK:"#161819");}
    t.rect(cx-w/2+2,cy,w-4,1,"#3c5260",0.75);t.rect(cx-w/4,cy,3,1,"#9ab8c8",0.6);
    for(let q=0;q<5;q++)t.rect(cx-w/2-3+(w+6)*R(q,243+k),cy+3*R(q,244+k)-1,1+((2*R(q,245+k))|0),1,[96,100,102]);
    tuft(cx-w/2-1,cy,3+((3*R(k,246))|0),k);tuft(cx+w/2+1,cy+1,4,k+3);}
  /* heaved slabs: a lifted plate with exposed dirt and gravel under its edge */
  const ns=hw?3:2;for(let k=0;k<ns;k++){const x=30+300*R(k,250),y=190+10*R(k,251),w=24+20*R(k,252);
    t.rect(x,y,w,2,"#a8aca6");t.rect(x,y+2,w,2,"#34383a");t.rect(x-1,y+4,w+2,3,"#4a3a2a");t.rect(x,y+5,w,1,"#2e2418");
    for(let q=0;q<w;q+=2)t.rect(x+q,y+6+((q>>1)%2),1,1,[120,112,100]);
    t.line(x+w-4,y+4,x+w+3,y-5,"#6a3a22");t.line(x+w-8,y+4,x+w-2,y-3,"#8a4a28");
    for(let q=0;q<4;q++)tuft(x+3+q*(w/4),y+1,2+((3*R(q,253+k))|0),q+k);}
  /* moss and dirt creeping in from the verge */
  for(let k=0;k<(hw?16:30);k++){const x=384*R(k,260),y=185+27*R(k,261);t.rect(x,y,3+9*R(k,262),1+((1.4*R(k,263))|0),[46,110,52],hw?0.38:0.55);}
  /* rubble, glass glints and scorch marks */
  for(let k=0;k<(hw?40:22);k++){const x=384*R(k,270),y=188+24*R(k,271);t.rect(x,y,1+((2*R(k,272))|0),1,R(k,273)<0.18?"#bfe8ff":[88+30*R(k,274),90+30*R(k,274),92+30*R(k,274)],R(k,273)<0.18?0.85:1);}
  if(hw)for(let k=0;k<2;k++){const x=60+250*R(k,280),y=194+8*R(k,281);for(let q=0;q<18;q++)t.rect(x-q/2-3,y-q%3,10+q,1,"#050606",0.05+0.02*q%3);}
  /* weeds standing along the whole road edge */
  for(let k=0;k<(hw?26:44);k++)tuft(384*R(k,290),186+((3*R(k,291))|0),3+((6*R(k,292))|0),k);
}
/* ---- wrecked-car damage layer ---- */
function c2Wreck(c){
  const g=C2_FLOOR,x=c.x,w=c.w,h=c.h,s=c.s,van=c.k==="van"||c.k==="bus",truck=c.k==="truck",top=g-h,bodyTop=van?g-h:g-Math.round(h*0.58),R=(k,a)=>r(k+s*7,a),
    dir=c.f>0?1:-1,fx=dir>0?x+w-1:x,rust=c2Mix(c.c,"#6a3a1a",0.6),bare="#8a7a66",soot="rgba(8,6,4,",bw=w-2;
  /* burnt-out shells are charred black with bare metal showing through */
  if(c.burn||s%3===0){const a=c.burn?0.62:0.42;fill(soot+a+")",x+1,bodyTop+1,bw,g-5-bodyTop);if(!truck)fill(soot+(a-0.1)+")",x+Math.round(w*0.22),top,Math.round(w*0.56),bodyTop-top);for(let k=0;k<5;k++)fill("rgba(150,70,20,.5)",x+2+(w-6)*R(k,300),bodyTop+2+4*R(k,301),2+2*R(k,302),1);}
  /* peeling paint */
  for(let k=0;k<5;k++)fill(bare,x+2+(w-5)*R(k,310),bodyTop+1+(g-6-bodyTop)*R(k,311),1+((2*R(k,312))|0),1);
  /* rust drips */
  for(let k=0;k<6;k++)fill("rgba(106,58,26,.65)",x+2+(w-5)*R(k,320),bodyTop+2,1,3+((6*R(k,321))|0));
  /* shattered glass: starburst cracks plus jagged missing pieces */
  const gx0=van?x+4:x+Math.round(w*0.24),gx1=van?x+w-6:x+Math.round(w*0.76),gy0=van?bodyTop+3:top+2,gy1=van?bodyTop+9:bodyTop;
  for(let k=0;k<(van?Math.min(4,((w-10)/12)|0):2);k++){const cx=van?x+7+k*12:gx0+3+k*((gx1-gx0)/2),cy=(gy0+gy1)/2|0;
    for(let d2=-3;d2<=3;d2++){fill("rgba(225,238,248,.55)",cx+d2,cy+((d2*0.8)|0),1,1);fill("rgba(225,238,248,.4)",cx+d2,cy-((d2*0.6)|0),1,1);}
    fill("rgba(225,238,248,.5)",cx,gy0,1,gy1-gy0);if(R(k,330)<0.6)fill("#05080a",cx+1,gy0,2,2);}
  /* crumpled front end: jagged dark wedge and a popped bonnet */
  if(!truck){for(let k=0;k<6;k++){const hh=2+((R(k,340)*4)|0);fill("#0c1014",fx-dir*(k>>1)-(dir>0?1:0),bodyTop+k*((g-5-bodyTop)/6)|0,2+((R(k,341)*2)|0),Math.max(1,hh>>1));}
    if(s%4===1&&!van){for(let k=0;k<5;k++){fill(c.c,fx-dir*(5+k)+(dir>0?-1:0),bodyTop-k,3,1);fill("#10161c",fx-dir*(5+k)+(dir>0?-1:0),bodyTop-k+1,3,1);}}}
  /* a door hanging open */
  if(!van&&!truck&&s%2===0){const dx=x+Math.round(w*0.46);fill("#10161c",dx,bodyTop+1,2,g-6-bodyTop);fill(c.c,dx+(dir>0?2:-2),bodyTop+2,2,g-8-bodyTop);fill("rgba(8,6,4,.35)",dx+(dir>0?2:-2),bodyTop+2,2,g-8-bodyTop);}
  /* a dangling bumper */
  fill("#5a5e5e",fx-dir*2,g-5,3,1);fill("#3a3e40",fx-dir*3,g-4,3,1);fill("#5a5e5e",fx-dir*4,g-3,2,1);
  /* flat tires and a missing wheel with a bare rim */
  [x+5,x+w-11].forEach((wx,k)=>{const flat=R(k,350)<0.55,gone=!flat&&R(k,351)<0.5;if(flat||gone){fill("#0a0c0e",wx-1,g-7,9,5);fill("#161a1e",wx,g-3,7,3);fill("#6a5a4a",wx+2,g-3,3,1);if(gone){fill("#3a2e22",wx-1,g-2,9,2);fill("#7a5a3a",wx+1,g-3,5,1);}else{fill("#1c1f23",wx,g-3,7,1);}}});
  /* moss and grass taking the roof, with vines over the sides */
  for(let k=0;k<w-3;k+=2)if(R(k,360)<0.7)fill(R(k,361)<0.5?"#3a7a3a":"#4a9a44",x+2+k,top-(R(k,362)<0.4?1:0)-(truck||van?0:0),2,1+((1.8*R(k,363))|0));
  for(let k=0;k<4;k++){const bx=x+3+(w-7)*R(k,370),bh=3+((5*R(k,371))|0);for(let y=0;y<bh;y++)fill(y%2?"#2a6a30":"#4a9a3a",bx+((k+y)%3===0?1:0),top-y,1,1);if(R(k,372)<0.3)fill("#ff86d0",bx,top-bh-1,1,1);}
  for(let k=0;k<3;k++){const vx=x+2+(w-4)*R(k,380),L=4+((9*R(k,381))|0);for(let y=0;y<L;y++){fill(y%3?"#2a6a30":"#4a9a3a",vx+Math.sin(y*0.8+k)*1,bodyTop+y,1,1);}}
  for(let k=0;k<6;k++){const gx=x+((w+6)*R(k,390))-3;fill(k%2?"#3a7a38":"#5ab04a",gx,g-2-((3*R(k,391))|0),1,2+((3*R(k,391))|0));}
}

/* ======================= CHAPTER 2, PART 2: THE TUNNEL AND THE SEWER ======================= */
function tnIs(t){return t==="tunnel"||t==="sewer"||t==="tunnel_exit"||t==="beyond";}
let tnPW=0,tnNoGraf=0;
/* the three scavenged ingredients, sourced from two interactable zones, no tools needed */
const TN_ING=[
  {id:"cola",zone:"car",spot:"the cup holder inside the locked car"},
  {id:"foil",zone:"car",spot:"buried in the car trunk"},
  {id:"lemon",zone:"graffiti",spot:"a backpack the graffiti crew left behind"},
];
const TN_MH=224,TN_PAPER=572;
const tnFresh=()=>({car:0,trunk:0,bp:0,graf:0,pl:{},made:0,mh:0,er:0,pt:0,left:0,paper:0,warn:0,carOpen:0,tried:0,tk:{pos:{},out:{},f:{},seen:{},done:0},back:0,gun2:0,ex:{bar:0,chase:0,done:0},bz:{lost:0,s:[0,0,0,0],call:0,wait:0},c3:c3Fresh()});
let TS=tnFresh(),TC=null,tnSewT=0,tnSpT=0,tnSw=0;

Object.assign(rooms,{
  tunnel:{name:"THE TUNNEL",L:null,R:null,W:448,plats:[],crates:[],items:[],ints:[
    {id:"tn_table",x:86,r:16,label:"TABLE"},
    {id:"tn_graf",x:164,r:16,label:"SEARCH"},
    {id:"tn_mh",x:TN_MH,r:14,label:"MANHOLE"},
    {id:"tn_car",x:300,r:12,label:"SEARCH"},
    {id:"tn_trunk",x:338,r:10,label:"OPEN"},
  ]},
  sewer:{name:"THE SEWER",L:null,R:null,W:608,fy:100,sy:86,crates:[],items:[],
    plats:[{x:0,y:86,w:70},{x:94,y:86,w:56},{x:178,y:86,w:36},{x:244,y:86,w:56},{x:326,y:86,w:46},{x:404,y:86,w:204}],
    ints:[{id:"tn_paper",x:TN_PAPER,r:14,label:"PICK UP"}]},
});
Object.assign(Ne,{tunnel:["255,200,150",0,0],sewer:["170,255,170",0,0]});
Object.assign(De,{tunnel:{c:"100,96,110",l:"255,190,120",a:0.18,dk:0.4},sewer:{c:"24,44,28",l:"200,255,190",a:0.16,dk:0.4}});

/* ---------------- items + info cards ---------------- */
Object.assign(items,{
  cola:{n:"Flat Cola",k:"bottle",c:"#5a2a14",where:"TUNNEL (car cup holder)",why:"Contains phosphoric acid, which turns rust into crumbly iron phosphate.",info:"A real rust converter ingredient."},
  foil:{n:"Aluminium Foil",k:"foil",c:"#cfd8e8",where:"TUNNEL (car passenger seat)",why:"Aluminium reacts more easily than iron and scrubs loose rust away.",info:"Car restorers scrub chrome rust with foil and water."},
  lemon:{n:"Lemon Juice",k:"jug",c:"#ffd23a",where:"TUNNEL (graffiti crew's backpack)",why:"Citric acid dissolves rust and holds on to the freed iron.",info:"About 5 to 6% citric acid."},
  carkey:{n:"Car Key",k:"key",c:"#c8c4b0",where:"TUNNEL (buried in the car trunk)",why:"Opens the locked car. Something is sitting in its cup holder.",info:"Most keys lift tiny spring pins to the exact right height."},
  blueprint:{n:"Rust Eater Blueprint",k:"blueprint",c:"#3a6ad8",where:"TUNNEL (car trunk)",why:"Plans for a Makeshift Rust Eater.",info:"Now laid out on the broken table."},
  rustx:{n:"Makeshift Rust Remover",k:"potion",c:"#ff8a3a",where:"",why:"Two mild acids plus aluminium. Pour it on the rusted manhole.",info:"Your own home-made rust eater."},
  paper:{n:"Dropped Paper",k:"paper",c:"#f4ecd0",where:"SEWER (far side)",why:"A pencil note: a warning about the steps.",info:"Someone passed this way before you."},
  radio:{n:"Emergency Radio",k:"radio",c:"#4c5642",where:"BEYOND THE TUNNEL (wrecked car)",why:"A handheld two-way radio. Its batteries are dead.",info:"Talk button on the side. Range: a few kilometres."},
  batts:{n:"Two Batteries",k:"batt",c:"#2a6ad8",where:"BEYOND THE TUNNEL (truck glovebox)",why:"Two sealed 1.5-volt batteries.",info:"Still in the packet. Still charged."},
});
Object.assign(Xt,{
  carkey:{what:"A scratched car key on a worn keyring with a cracked red tag, found at the bottom of the trunk under a pile of junk.",
    sci:"A pin-tumbler lock has small spring-loaded pins of different lengths. The cuts on the key lift each pin to exactly the right height, so a gap lines up and the cylinder can turn. A wrong key leaves a pin sticking across the gap.",
    real:"Pin-tumbler locks protect front doors, padlocks and cars. Modern car keys also hide a tiny transponder chip that the car has to recognise before the engine will start.",
    how:"Use it on the locked car in the tunnel (stand at the door and press USE).",
    safe:"",fact:"The pin-tumbler lock was patented by Linus Yale Jr. in 1861. The same idea is still in use today."},
  cola:{what:"A bottle of flat cola left in the car's cup holder. Besides water and sugar it contains phosphoric acid (H₃PO₄), added for its sharp taste.",
    sci:"Phosphoric acid reacts with rust (iron oxide) and turns it into iron phosphate, a dark, crumbly layer that flakes off or seals the metal underneath. Shop-bought rust converters use the same acid.",
    real:"Phosphoric acid is used in rust converters, fertilizers, dentists' etching gels and some soft drinks.",
    how:"Drag it onto the blueprint on the broken table.",
    safe:"Fine to drink in normal amounts, but concentrated phosphoric acid burns skin.",
    fact:"Cola is about as acidic as lemon juice: roughly pH 2.5."},
  foil:{what:"A crumpled sheet of aluminium foil from an old burger wrapper on the passenger seat.",
    sci:"Aluminium is more reactive than iron, so in a wet, acidic mix it reacts first and helps strip oxygen away from the rust. Its soft folds also scrub loose rust off without scratching the metal underneath.",
    real:"Foil wraps food, lines ovens and reflects heat in emergency blankets. Car restorers really do polish rusty chrome with foil and water.",
    how:"Drag it onto the blueprint on the broken table.",
    safe:"The edges can be sharp. Aluminium reacting with acid gives off hydrogen gas, so work in fresh air.",
    fact:"Aluminium is the most common metal in Earth's crust, yet in the 1800s it was so hard to purify that it was worth more than gold."},
  lemon:{what:"A squeezy bottle of lemon juice from a backpack the graffiti crew left behind. Lemon juice is about 5 to 6% citric acid.",
    sci:"Citric acid dissolves rust and then grabs the freed iron ions, holding them in the liquid like a claw. Chemists call this chelation, and it stops the iron from settling back onto the metal.",
    real:"Citric acid is used in kettle descalers, cleaning sprays and as a food preservative (E330).",
    how:"Drag it onto the blueprint on the broken table.",
    safe:"It stings in cuts and eyes. Rinse with water.",
    fact:"The word chelate comes from the Greek word for a crab's claw."},
  blueprint:{what:"A folded sheet of blue paper from the car trunk: plans for a Makeshift Rust Eater, sketched by someone who lived on the road.",
    sci:"The first blueprints (1842) used paper coated with iron salts. Where light hit the paper it turned blue, and the lines of the drawing stayed white. This is called a cyanotype.",
    real:"Engineers and architects copied technical drawings as blueprints until computers took over.",
    how:"It is now laid out on the broken table on the left. Use the table and drag the three ingredients onto it.",
    safe:"",fact:"The blue colour is Prussian blue, an iron pigment also used in paints."},
  rustx:{what:"Your Makeshift Rust Remover: flat cola and lemon juice (two mild acids) shaken up with crumpled aluminium foil.",
    sci:"Rust is iron oxide (Fe₂O₃). The phosphoric and citric acids dissolve and convert it, the citric acid holds on to the freed iron, and the aluminium reacts and scrubs the loosened rust away.",
    real:"Real rust removers use the same acids, just stronger and carefully measured.",
    how:"Stand at the manhole in the middle of the tunnel and press USE to pour it.",
    safe:"Even mild acids sting eyes. The foil and acid make a little hydrogen gas, so real mixes are made in fresh air.",
    fact:"Rust takes up more space than the iron it came from. That is why it can jam bolts and covers completely solid."},
  radio:{what:"A scuffed handheld emergency radio with a stubby antenna, found under the seat of a wrecked car. It looks fine, but the batteries inside are flat.",
    sci:"Your voice makes the air vibrate. A microphone turns those vibrations into an electric signal, and the radio uses it to change a fast-wobbling current in the antenna. That sends out radio waves, a kind of light we cannot see, travelling at 300 000 km every second. Another radio's antenna catches the waves and turns them back into sound.",
    real:"Radios still matter when phone networks go down: rescue teams, ships, planes and storm shelters all keep one. Walkie-talkies, Wi-Fi and phones all use radio waves too.",
    how:"It needs power first. Find batteries in the other cars.",safe:"",
    fact:"Radio waves from the 1930s are still travelling outwards through space. By now they are more than 90 light-years away."},
  batts:{what:"Two AA batteries still sealed in their plastic packet, found in the glovebox of a wrecked truck.",
    sci:"A battery stores energy as chemicals. Inside, zinc gives up electrons and manganese dioxide takes them in. The electrons can only get from one end to the other by flowing through a wire, and that flow is the electric current that powers the radio. Two 1.5-volt cells in a row add up to 3 volts.",
    real:"Torches, remote controls, smoke alarms and radios all use cells like these. Put two in a row (+ to -) and their voltages add up.",
    how:"They fit the radio. Once you have both, the radio switches on.",safe:"Never cut a battery open or throw one on a fire. Old batteries go in a battery recycling bin.",
    fact:"The first battery was built by Alessandro Volta in 1800 from a stack of zinc and copper discs with salty cardboard between them. The unit 'volt' is named after him."},
  paper:{what:"A crumpled sheet of paper someone dropped on the far side of the sewer. It reads: IF YOU ARE READING THIS, STEPS HAVE APPEARED, GO BACK UP. DEAD END.",
    sci:"Paper is a mat of cellulose fibres from wood. Damp breaks the bonds between fibres, which is why paper goes soft and tears in a sewer, and this sheet must have been dropped recently.",
    real:"Before phones, people left notes and chalk marks to warn each other about hazards.",
    how:"Keep it. Someone is telling you to go back up.",safe:"",
    fact:"Radio towers are built tall because the higher the antenna, the farther its signal reaches over the curve of the Earth."},
});

/* ---------------- icons for the new item kinds ---------------- */
function tnIcon(t,a){const o=document.createElement("canvas");o.width=o.height=24;const g=o.getContext("2d"),n=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(x,y,w,h);};
  if(t==="foil"){n("#0a0c14",3,6,18,13);n("#8a94a4",4,7,16,11);n("#cfd8e8",5,8,6,4);n("#eef4ff",6,8,3,1);n("#aab4c4",11,9,7,5);n("#6a7484",9,13,8,3);n("#eef4ff",14,10,2,1);n("#cfd8e8",6,14,3,3);n("#5a6474",4,17,16,1);}
  else if(t==="radio"){n("#0a0c14",6,2,13,21);n("#1a1c1e",4,0,2,8);n("#3a4232",7,3,11,19);n("#4c5642",7,3,11,1);n("#22261e",8,5,9,6);for(let y=0;y<2;y++)for(let x=0;x<4;x++)n("#0e100c",9+x*2,6+y*3,1,2);n("#8aa868",8,13,9,3);n("#40ff60",15,18,2,2);n("#c8c8b0",9,18,3,2);}
  else if(t==="batt"){n("#0a0c14",3,5,18,14);for(let i=0;i<2;i++){const y=6+i*6;n("#2a6ad8",4,y,12,5);n("#7aa8ff",4,y,12,1);n("#e8e8e0",16,y,3,5);n("#b8b8b0",19,y+1,1,3);}}
  else if(t==="key"){n("#0a0c14",2,6,20,12);for(let y=0;y<9;y++)for(let x=0;x<9;x++){const d=Math.hypot(x-4,y-4);d<4.4&&d>1.8&&n("#d8d4c0",3+x,8+y,1,1);}n("#d8d4c0",11,10,9,2);n("#fffbe8",11,10,9,1);n("#9a9684",11,12,9,1);n("#d8d4c0",14,12,2,3);n("#d8d4c0",17,12,2,2);n("#c0302a",3,16,4,3);n("#f06858",3,16,4,1);}
  else if(t==="blueprint"){n("#0a0c14",2,4,20,16);n("#2a5ab8",3,5,18,14);n("#1a3a80",12,5,1,14);n("#cfe0ff",5,8,5,1);n("#cfe0ff",5,10,4,1);n("#cfe0ff",15,7,1,8);n("#cfe0ff",14,7,3,1);n("#cfe0ff",14,14,3,1);n("#cfe0ff",5,14,6,1);n("#ff8a3a",16,11,1,2);}
  else{n("#0a0c14",3,6,19,14);n("#cfc3a0",4,7,17,12);n("#efe6c8",5,7,7,5);n("#e2d7b6",12,8,7,4);n("#b5a983",11,7,1,9);n("#f6efd8",6,12,5,4);n("#b5a983",4,12,17,1);n("#d8ccaa",13,13,6,5);n("#5e5648",6,9,5,1);n("#5e5648",14,10,4,1);n("#c03a2a",15,15,3,1);n("#0a0c14",18,5,3,2);n("#f6efd8",18,6,2,1);n("#6a7a40",4,17,4,2);}
  return o.toDataURL();}
window.tnIcon=tnIcon;

/* ---------------- backdrops: painted with the game's own per-pixel painter, in seamless 384px tiles ---------------- */
const tnC=(a,b,k)=>Ct(a,b,Rt(k));
const tnTC={};
function tnTile(id,ox,paint){const k=id+":"+ox;return tnTC[k]||(tnTC[k]=Ae((t)=>paint(t,ox)));}
function tnTiles(id,W2,paint){const cv=document.createElement("canvas");cv.width=W2;cv.height=216;const g=cv.getContext("2d");for(let ox=0;ox<W2;ox+=384)g.drawImage(tnTile(id,ox,paint),ox,0);return cv;}
function tnBackdrop(id){return id==="beyond"?bzBackdrop():id==="tunnel_exit"?tnExitBackdrop():id==="tunnel"?tnTiles("tunnel",2*rooms.tunnel.W,tnPaintTunnel):tnTiles("sewer",2*rooms.sewer.W,tnPaintSewer);}
/* stability: build the tunnel, trunk, sewer and paper art a piece at a time while the player is still on the street/road/highway or in the tunnel, so entering them never freezes a slow phone */
let tnPB=0,tnPBdone=0;
function tnPrebuild(){if(tnPB||tnPBdone)return;const jobs=[];
  for(let ox=0;ox<2*rooms.tunnel.W;ox+=384)jobs.push(()=>tnTile("tunnel",ox,tnPaintTunnel));jobs.push(()=>tkInit());
  for(let ox=0;ox<2*rooms.sewer.W;ox+=384)jobs.push(()=>tnTile("sewer",ox,tnPaintSewer));jobs.push(()=>tnPaperArt());C2.beyond.seeds.forEach((sd,i)=>jobs.push(()=>c2Tile("beyond",i,sd)));jobs.push(()=>{c2TC.tn||(c2TC.tn=Ae((t)=>c2Tunnel(t)));});jobs.push(()=>{backdrops.beyond||(backdrops.beyond=bzBackdrop());});for(let ox=0;ox<2*TNX_W;ox+=384)jobs.push(()=>tnTile("tunnelXb",ox,tnExitBase));for(let ox=0;ox<2*TNX_W;ox+=384)jobs.push(()=>tnTile("tunnelXg",ox,tnGrafExit));jobs.push(()=>{backdrops.tunnel_exit||(backdrops.tunnel_exit=tnExitBackdrop());});
  tnPB=1;let i=0;const step=()=>{if(!GM.on){tnPB=0;return;}if(i>=jobs.length){tnPB=0;tnPBdone=1;return;}
    if((typeof ch2!=="undefined"&&ch2&&ch2.sp&&!ch2.end)||!tnCanWork()){setTimeout(step,200);return;}try{jobs[i++]();}catch(e){}setTimeout(step,260);};setTimeout(step,300);}

/* spray-paint pieces: text/shape masks painted as bubble fill + inner line + outline + shadow + overspray + drips + worn paint */
const tnMK={};
function tnMaskFrom(w,h,draw){const c=document.createElement("canvas");c.width=w;c.height=h;const g=c.getContext("2d");g.fillStyle=g.strokeStyle="#fff";draw(g);const d=g.getImageData(0,0,w,h).data,m=new Uint8Array(w*h);for(let i=0;i<w*h;i++)m[i]=d[4*i+3]>110?1:0;return{w,h,m};}
function tnDil(M){const{w,h,m}=M,o=new Uint8Array(w*h);for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(m[y*w+x])for(const[dx,dy]of[[0,0],[1,0],[-1,0],[0,1],[0,-1]]){const X=x+dx,Y=y+dy;X>=0&&Y>=0&&X<w&&Y<h&&(o[Y*w+X]=1);}return{w,h,m:o};}
function tnEro(M){const{w,h,m}=M,o=new Uint8Array(w*h);for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const i=y*w+x;o[i]=m[i]&&m[i-1]&&m[i+1]&&m[i-w]&&m[i+w]?1:0;}return{w,h,m:o};}
/* hand-sprayed distortion: wobbly edges, and lumpy strokes where the can lingered or moved too fast */
function tnWarp(M,seed,amt,lumpy){const{w,h,m}=M,m2=new Uint8Array(w*h);for(let y=0;y<h;y++)for(let x=0;x<w;x++){const sx=x+Math.round(Math.sin(y/4.3+seed)*amt+(It(x/9,y/9,seed+30)-0.5)*amt*1.6),sy=y+Math.round(Math.sin(x/5.7+seed*2)*amt);m2[y*w+x]=sx>=0&&sy>=0&&sx<w&&sy<h?m[sy*w+sx]:0;}
  const M2={w,h,m:m2};if(!lumpy)return M2;const D=tnDil(M2),E=tnEro(M2),m3=new Uint8Array(w*h);for(let i=0;i<w*h;i++){const nz=It((i%w)/4,((i/w)|0)/4,seed+11);m3[i]=nz>0.62?D.m[i]:nz<0.3?E.m[i]:m2[i];}return{w,h,m:m3};}
/* letters drawn one by one: each tilted, sheared, resized and off the baseline. "squeeze" = ran out of wall, last letters cramped and sliding downhill */
function tnMask(txt,size,o){o=o||{};const seed=o.seed||1,mess=o.mess==null?1:o.mess,sq=o.squeeze||0,k=[txt,size,seed,mess,sq].join("|");if(tnMK[k])return tnMK[k];
  const P=12,n=txt.length,w=Math.ceil(n*size*1.08)+2*P,h=Math.ceil(size*1.9)+2*P,F=size+'px "Press Start 2P",monospace';
  const base=tnMaskFrom(w,h,(g)=>{g.font=F;g.textBaseline="middle";g.textAlign="center";let x=P+size*0.55;for(let i=0;i<n;i++){const R=(a)=>r(i*7+a,seed),cram=sq&&i>=n-sq,q=cram?0.7:1;
    g.save();g.translate(x,h/2+(R(1)-0.5)*size*0.4*mess+(cram?(i-(n-sq)+1)*size*0.16:0));g.rotate((R(2)-0.5)*0.38*mess+(cram?0.12:0));g.transform(1,0,(R(3)-0.5)*0.45*mess,1,0,0);g.scale(q*(0.9+0.25*R(4)*mess),q*(0.92+0.32*R(5)*mess));g.fillText(txt[i],0,0);g.restore();
    x+=size*q*(0.84+0.18*R(6));}});
  return(tnMK[k]=tnWarp(base,seed,size>=12?1.3*mess:0.6*mess,size>=12));}
function tnPiece(t,ox,X,Y,M,o){const{w,h,m}=M,sd=o.seed,D1=o.ring?tnDil(M):M,D2=tnDil(tnDil(D1)),D3=tnDil(D2),at=(A,x,y)=>x>=0&&y>=0&&x<w&&y<h&&A.m[y*w+x]===1,N=(x,y,s)=>It((X+x)/4,(Y+y)/4,sd+s);
  if(X+w+12<ox||X-12>ox+384)return;let y0=h,y1=0;for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(m[y*w+x]){y0=Math.min(y0,y);y1=Math.max(y1,y);}
  for(let y=0;y<h+4;y++)for(let x=0;x<w+4;x++){const wx=X+x-ox,wy=Y+y;if(wx<0||wx>383)continue;const fade=It((X+x)/5,(Y+y)/4,sd)<(o.wear||0.2)?0.5:0.94;
    const sx=N(x,y,9)>0.6?1:0,sy=N(x,y,10)>0.64?1:0,F=at(M,x-sx,y-sy);let c=null,a=fade;
    if(F){if(N(x,y,5)>0.8&&!o.solid){c=o.c1;a=0.22*fade;}
      else{const k=(y-y0)/Math.max(1,y1-y0);c=tnC(o.c1,o.c2,k+(Et(X+x,y)-0.5)*0.35+(N(x,y,6)-0.5)*0.5);if(!at(M,x-sx,y-sy-1))c=tnC(c,[255,255,255],0.42);else if(k>0.18&&k<0.34&&r(x*3+y,sd+6)<0.45)c=tnC(c,[255,255,255],0.3);
        const sp=r(x*13+y*7,sd+7);sp<0.14?(c=tnC(c,[0,0,0],0.28)):sp>0.92&&(c=tnC(c,[255,255,255],0.22));a=fade*(0.78+0.2*r(x+y*5,sd+8));}}
    else if(o.ring&&at(D1,x,y)){N(x,y,13)<0.78&&(c=o.ring);}
    else if(at(D2,x,y)||(N(x,y,12)>0.58&&at(D3,x,y))){c=o.out;N(x,y,14)>0.75&&(a=0.55*fade);}
    else if(at(D3,x-2,y-2)){c=[0,0,0];a=0.38*fade;}
    else{const n1=at(D3,x-3,y)||at(D3,x+3,y)||at(D3,x,y-3)||at(D3,x,y+3),n2=!n1&&(at(D3,x-6,y)||at(D3,x+6,y)||at(D3,x,y+6)||at(D3,x,y-6));
      if((n1&&r(x*31+y*17,sd)<0.17)||(n2&&r(x*31+y*17,sd+2)<0.06)){c=r(x+y*3,sd+1)<0.7?o.c1:o.out;a=n1?0.32:0.2;}}
    c&&t.px(wx,wy,c,a);}
  /* spills: blobs of fill colour that went over the outline */
  for(let k=0,f=0;k<400&&f<(o.spill==null?3:o.spill);k++){const x=(r(k,sd+20)*w)|0,y=(r(k,sd+21)*h)|0;if(at(D2,x,y)&&!at(D1,x,y)){f++;const rr=1+((r(k,sd+22)*2)|0);for(let dy=-rr;dy<=rr;dy++)for(let dx=-rr;dx<=rr;dx++)dx*dx+dy*dy<=rr*rr+0.5&&t.px(X+x+dx-ox,Y+y+dy,o.c1,0.9);}}
  /* drips: uneven widths and lengths, some from the outline too */
  for(let x=0;x<w;x++)for(let y=0;y<h;y++){const fromF=at(M,x,y)&&!at(M,x,y+1),fromO=!fromF&&at(D2,x,y)&&!at(D2,x,y+1);
    if((fromF&&r(x*7+y,sd+3)<(o.drip||0.16))||(fromO&&r(x*5+y,sd+9)<0.04)){const col=fromF?o.c2:o.out,L=2+((r(x,sd+4)*(o.dl||16))|0),wd=r(x,sd+5)<0.3?2:1;
      for(let k=1;k<=L;k++){const al=0.92-0.25*(k/L);for(let d=0;d<wd;d++)t.px(X+x+d-ox,Y+y+k,col,al);k===L&&(t.px(X+x+wd-ox,Y+y+k,col,0.8),t.px(X+x-ox,Y+y+k+1,col,0.75));}}}}
function tnScribble(t,ox,X,Y,seed,col,len){let x=X,y=Y;for(let s=0;s<(len||60);s++){t.px(x-ox,y,col,0.85);r(s,seed+9)<0.3&&t.px(x-ox,y+1,col,0.6);x+=1;y+=Math.round(Math.sin(s*0.9+seed)*1.6+(r(s,seed)-0.5)*1.4);if(s%14===13){x-=7+((r(s,seed+1)*4)|0);y+=2+((r(s,seed+2)*3)|0);}}}
/* a city "buff": somebody rolled grey paint over part of a piece, the edges never matching */
function tnBuff(t,ox,X,Y,w,h,seed){for(let y=Y;y<Y+h;y++)for(let x=X;x<X+w;x++){const e=Math.min(x-X,X+w-1-x,y-Y,Y+h-1-y),n=It(x/5,y/5,seed);if(e<4&&n*4<4-e)continue;t.px(x-ox,y,tnC([128,124,112],[110,106,96],It(x/14,y/3,seed+1)),0.86);}}
function tnGrafWall(t,ox){
  const RB=[[255,96,96],[255,170,60],[255,226,90],[110,230,110],[90,190,255],[130,110,255],[210,110,255]];
  for(let X=236;X<470;X++){const x=X-ox;if(x<0||x>383)continue;const cy=132+Math.sin(X/22)*5+(It(X/30,1,60)-0.5)*6;for(let k=0;k<7;k++)for(let j=0;j<3;j++){const y=Math.round(cy+k*3+j+(It(X/7,k,64)-0.5)*1.6),w=It(X/6,y/4,61)<0.32;t.px(x,y,RB[k],w?0.18:0.78);}
    r(X,62)<0.08&&[...Array(3+((r(X,63)*10)|0))].forEach((_,j)=>t.px(x,Math.round(cy+21+j),RB[6],0.7-j*0.04));}
  tnPiece(t,ox,226,64,tnMask("STILL HERE",16,{seed:3,squeeze:3,mess:0.7}),{c1:[255,130,220],c2:[170,60,230],ring:[110,240,255],out:[26,14,44],seed:70,spill:5});
  tnPiece(t,ox,124,66,tnMask("RADIO",16,{seed:5,mess:0.55}),{c1:[255,232,90],c2:[255,120,40],ring:[200,40,30],out:[34,14,10],seed:71,spill:4});
  tnPiece(t,ox,140,94,tnMask("<<<",16,{seed:7,mess:0.7}),{c1:[255,232,90],c2:[255,140,40],out:[34,14,10],seed:72,drip:0.24});
  tnPiece(t,ox,590,64,tnMask("EVO",16,{seed:9,mess:1.1}),{c1:[150,255,140],c2:[40,170,80],ring:[230,255,230],out:[10,30,14],seed:73});
  tnBuff(t,ox,640,66,42,40,90);
  tnPiece(t,ox,512,122,tnMask("K1D",8,{seed:11}),{c1:[246,246,255],c2:[200,200,230],out:[70,40,150],seed:74,dl:9,spill:1});
  tnPiece(t,ox,548,140,tnMask("K1",8,{seed:12,mess:1.3}),{c1:[246,246,255],c2:[200,200,230],out:[70,40,150],seed:84,dl:6,spill:0,wear:0.4});
  tnPiece(t,ox,646,124,tnMask("NO WAY BACK",8,{seed:13,mess:1.3,squeeze:2}),{c1:[255,96,86],c2:[200,30,30],out:[44,8,8],seed:75,drip:0.3,dl:12});
  tnPiece(t,ox,392,116,tnMask("BELOW",8,{seed:15,mess:0.7}),{c1:[255,170,60],c2:[230,110,30],out:[40,20,8],seed:76,dl:8});
  tnPiece(t,ox,416,134,tnWarp(tnMaskFrom(32,28,(g)=>{g.beginPath();g.moveTo(10,6);g.lineTo(21,7);g.lineTo(22,13);g.lineTo(27,12);g.lineTo(15,23);g.lineTo(5,13);g.lineTo(10,12);g.closePath();g.fill();}),17,1,0),{c1:[255,170,60],c2:[230,110,30],out:[40,20,8],seed:77});
  const spider=tnWarp(tnMaskFrom(60,48,(g)=>{const j=(k)=>(r(k,31)-0.5)*3;g.lineWidth=2;g.beginPath();g.ellipse(30,24,6,7,0.2,0,7);g.fill();g.beginPath();g.arc(29,14,4,0,7);g.fill();
    for(let k=0;k<4;k++)for(const d of[-1,1]){g.beginPath();g.moveTo(30+d*5,20+k*3);g.lineTo(30+d*16+j(k*4+d),12+k*5+j(k*5));g.lineTo(30+d*24+j(k*6),24+k*6+j(k*7+d));g.stroke();}}),19,0.8,0);
  tnPiece(t,ox,698,64,spider,{c1:[236,236,240],c2:[200,200,210],out:[30,30,36],seed:78,dl:8});
  tnPiece(t,ox,694,60,tnWarp(tnMaskFrom(64,54,(g)=>{g.lineWidth=4;g.lineCap="round";g.beginPath();g.moveTo(8,8);g.quadraticCurveTo(30,30,54,46);g.moveTo(56,6);g.quadraticCurveTo(28,22,10,48);g.stroke();}),21,0.9,0),{c1:[255,60,50],c2:[200,20,20],out:[50,6,6],seed:79,drip:0.34,dl:14});
  /* a dissed tag: someone else crossed it out */
  tnPiece(t,ox,770,118,tnMask("N0VA",8,{seed:23,mess:1.2}),{c1:[90,200,255],c2:[40,120,220],out:[10,20,50],seed:80,dl:6,spill:1});
  for(let x=764;x<816;x++){const y=Math.round(130+Math.sin(x/3)*4+(r(x,81)-0.5)*2);for(let d=0;d<2;d++)t.px(x-ox,y+d,[16,16,20],0.92);}
  [[60,120,[30,40,90],70],[330,152,[20,20,24],50],[548,86,[40,20,60],40],[796,150,[20,20,24],60],[470,154,[30,40,90],45],[200,150,[90,20,30],35]].forEach(([x,y,c,l],i)=>tnScribble(t,ox,x,y,i*3+1,c,l));}
function tnPaintTunnel(t,ox){const W2=tnPW||2*rooms.tunnel.W,LMP=[],BRK=[208,592];for(let q=80;q<=W2-176;q+=128)LMP.push(q);
  for(let y=0;y<216;y++)for(let x=0;x<384;x++){const X=x+ox;let c;
    if(y<40){const n=It(X/14,y/7,3);c=tnC([20,20,24],[46,46,52],(y/40)*0.7+n*0.4);const rib=((X%192)+192)%192;if(rib<16)c=tnC(c,[74,74,80],rib>12?0.15:0.5);else if(rib<19)c=tnC(c,[0,0,0],0.5);if(y>35)c=tnC(c,[0,0,0],0.4);}
    else if(y<176){const ty=y-40,row=(ty/8)|0,tx=X+(row%2)*6,col=Math.floor(tx/12),gx=((tx%12)+12)%12,gy=ty%8,th=r(col*7+row,11);
      const miss=r(col*13+row*7,12)<0.045;let b=miss?tnC([40,40,42],[64,62,60],It(X/3,y/3,4)):tnC([158,152,130],[128,124,108],th);const gr=!miss&&(gx===0||gy===0);
      c=gr?tnC(b,[52,50,44],0.7):b;if(!gr&&!miss){gy===1&&(c=tnC(c,[226,220,200],0.32));(gx===11||gy===7)&&(c=tnC(c,[30,28,24],0.25));}
      if(miss&&(gy===1||gx===1))c=tnC(c,[0,0,0],0.5);
      const sd=r((X>>1)*3,13)<0.16?It(X/2,y/18,5)*0.55:0,g=It(X/26,y/16,6);c=tnC(c,[46,40,32],Math.min(0.88,0.22+g*0.45+sd+Math.max(0,(y-118)/80)+Math.max(0,(72-y)/70)));
      const w=It(X/40+3,y/22,7);w>0.64&&(c=tnC(c,[100,72,40],(w-0.64)*1.7));
      const m=It(X/9,y/7,9)+Math.max(0,(X-W2+280)/280)*0.55+Math.max(0,(y-138)/38)*0.35;m>1.02&&(c=tnC(c,m>1.14?[44,94,44]:[72,122,58],0.78));}
    else if(y<184){c=tnC([92,90,84],[124,122,114],It(X/6,y/3,8));y===176&&(c=[152,150,142]);y>=182&&(c=tnC(c,[14,14,14],0.6));if(((X+40)%320)<26&&y>177&&y<182)c=(X>>1)%2?[16,16,18]:[52,52,54];
      It(X/7,y,27)>0.7&&(c=tnC(c,[60,110,50],0.7));}
    else{const n=It(X/5,y/3,10);c=tnC([34,36,38],[58,60,62],n);const sp=r(X*7+y*13,14);sp<0.05?(c=[80,82,84]):sp>0.975&&(c=[20,20,22]);
      if(y>=198&&y<200&&X%80<40&&It(X/9,y,15)>0.42)c=tnC(c,[196,176,80],0.72);
      const pd=It(X/30,y/5,16);if(pd>0.7){c=tnC(c,[24,32,40],0.8);Et(X,y)<(pd-0.7)*2.2&&(c=tnC(c,[130,138,146],0.35));}
      It(X/14,y/4,28)>0.74&&(c=tnC(c,[60,84,40],0.55));c=tnC(c,[0,0,0],Math.max(0,(y-200)/42));}
    t.px(x,y,c);}
  for(let k=0;k<16;k++){let X=r(k,20)*W2,y=k<9?186+28*r(k,21):60+100*r(k,21);for(let s=0;s<(k<9?44:22);s++){t.px(X-ox,y,[12,12,14]);t.px(X-ox,y+1,[110,112,112],0.35);X+=1+(r(s,k+22)<0.4?1:0);const q=r(s,k+23);y+=q<0.33?-1:q<0.66?0:1;}}
  tnNoGraf||tnGrafWall(t,ox);
  for(let x=0;x<384;x++){const X=x+ox;for(let y=46;y<54;y++){let c=tnC([54,58,62],[140,146,152],1-Math.abs((y-46)/7-0.3)*1.6);It(X/12,y/3,17)>0.66&&(c=tnC(c,[124,66,30],0.65));t.px(x,y,c);}
    if((X+20)%140<6)for(let y=44;y<56;y++)t.px(x,y,y===44?[90,94,98]:[38,40,44]);It(X/9,1,29)>0.72&&t.px(x,54+((r(X,30)*4)|0),[124,66,30],0.7);}
  t.sag(-ox,62,W2-ox,62,8,[16,16,18]);t.sag(-ox,66,W2-ox,68,5,[30,22,24]);
  for(const L0 of LMP){const x=L0-ox,br=BRK.includes(L0);t.rect(x-20,22,40,8,[32,32,36]);t.rect(x-20,22,40,1,[74,74,80]);t.rect(x-18,28,36,3,br?[44,44,44]:[236,226,190]);
    if(br){t.line(x-12,28,x-4,31,[96,96,96]);t.line(x+3,28,x+9,30,[96,96,96]);}else{t.light(x,64,90,[255,224,170],0.5,1.25);t.light(x,192,64,[255,214,160],0.22,0.25);}}
  for(let k=0;k<32;k++){const cx=8+130*r(k,30)*r(k,31),cy=72+108*Math.pow(r(k,32),0.6),s=8+16*r(k,33),pts=[];
    for(let a=0;a<6;a++){const an=(a/6)*6.283+r(k,34+a);pts.push([cx+Math.cos(an)*s*(0.7+0.5*r(k,40+a))-ox,cy+Math.sin(an)*s*0.65*(0.7+0.5*r(k,50+a))]);}
    t.poly(pts,(px,py)=>{const n=It((px+ox)/4,py/4,18+k);let c=tnC([66,64,60],[136,132,122],n);py<cy-s*0.3&&(c=tnC(c,[178,174,162],0.3));n<0.3&&(c=tnC(c,[34,34,34],0.6));It((px+ox)/6,py/6,31+k)>0.72&&(c=tnC(c,[60,104,50],0.6));return c;});}
  for(let k=0;k<9;k++){const x=16+110*r(k,60)-ox,y=72+90*r(k,61);t.line(x,y,x+6-12*r(k,62),y-18-10*r(k,63),[126,64,32]);t.px(x+6-12*r(k,62),y-18-10*r(k,63),[160,90,50]);}
  for(let x=0;x<62;x++){const c=(x>>3)%2?[232,172,40]:[22,22,22];for(let y=163;y<175;y++)t.px(x+24-ox,y,tnC(c,[0,0,0],It(x/5,y/3,32)*0.35));}t.rect(22-ox,161,66,2,[64,64,64]);t.rect(28-ox,175,3,9,[50,50,50]);t.rect(80-ox,175,3,9,[50,50,50]);
  const M=W2-96;for(let y=10;y<184;y++)for(let x=0;x<384;x++){const X=x+ox;if(X<M)continue;const k=(X-M)/96;let c=tnC([168,148,118],[255,236,198],k*0.8+(1-y/184)*0.2);const v=It(X/10,y/9,19);v>0.6&&(y<64||y>124)&&(c=tnC(c,v>0.7?[40,90,40]:[74,134,62],0.9));t.px(x,y,c);}
  for(let y=8;y<184;y++){for(let x=M-12;x<M;x++)t.px(x-ox,y,tnC([58,56,52],[100,98,92],It(x/4,y/4,20)));t.px(M-12-ox,y,[26,26,26]);}
  for(let k=0;k<10;k++)ve(t,M-20+r(k,70)*110-ox,8,M-30+r(k,71)*120-ox,40+60*r(k,72),6,r(k,73)*40,1,[255,134,208]);
  t.light(M+40-ox,110,140,[255,224,170],0.8,1.1);t.light(M-70-ox,196,100,[255,214,150],0.4,0.25);Fa(t,M+30-ox,184,14,77);Fa(t,M+80-ox,180,18,78);
}

function tnPaintSewer(t,ox){const W2=2*rooms.sewer.W,P=rooms.sewer.plats.map((p)=>[2*p.x,2*(p.x+p.w)]),onP=(X)=>P.some(([a,b])=>X>=a&&X<b),BR=[[86,62,50],[74,60,48],[64,66,48],[92,72,56],[70,56,46]];
  for(let y=0;y<216;y++)for(let x=0;x<384;x++){const X=x+ox;let c;
    if(y<172){const pc=(((X-60)%192)+192)%192,pil=pc<22,row=(y/8)|0,bx=X+(row%2)*8,col=Math.floor(bx/16),gx=((bx%16)+16)%16,gy=y%8;
      let b=tnC(BR[(r(col*5+row,3)*5)|0],[30,24,20],It(X/18,y/12,4)*0.6);const mortar=gx===0||gy===0;c=mortar?tnC(b,[26,24,20],0.7):b;
      if(!mortar){gy===1&&(c=tnC(c,[150,130,110],0.22));gy===7&&(c=tnC(c,[0,0,0],0.2));}
      if(pil){c=tnC(c,[150,130,104],0.12);pc>=18&&(c=tnC(c,[0,0,0],0.55));pc<2&&(c=tnC(c,[200,180,150],0.18));}
      else{const ax=((pc-22)/170)*2-1,arch=36+(1-Math.sqrt(Math.max(0,1-ax*ax)))*44;if(y>arch&&y<150){c=tnC(c,[6,10,8],0.55+0.15*It(X/30,y/20,5));
          const far=(((X-60)/192)|0)%2===1,fx=Math.abs(ax);if(far&&fx<0.32&&y>70&&y<150){c=tnC([4,6,5],[40,52,36],Math.max(0,(0.32-fx)*2)*It(X/8,y/8,6));}
          y<arch+2&&(c=tnC(c,[0,0,0],0.5));}}
      if(y>100){const sl=(y-100)/72;c=tnC(c,It(X/7,y/5,7)>0.55?[46,84,34]:[40,62,30],sl*0.55);}
      if(y>148&&y<160)c=tnC(c,[22,30,16],0.45+0.25*It(X/5,y,8));
      It(X/4,y/30,9)>0.88&&y>40&&(c=tnC(c,[150,156,132],0.14));
      y>104&&gy===1&&r(X*3+y,10)<0.06&&(c=tnC(c,[210,230,200],0.5));
      y<26&&(c=tnC(c,[0,0,0],0.6-y/60));c=tnC(c,[0,0,0],0.22);}
    else if(onP(X)){const n=It(X/6,y/4,11);c=tnC([92,94,88],[132,132,124],n);if(y<175){c=y===172?[170,170,160]:tnC(c,[150,150,140],0.4);It(X/5,y,12)>0.6&&(c=tnC(c,[70,120,56],0.85));}
      else{c=tnC(c,[30,32,28],0.25+(y-175)/70);r((X>>1)*5,13)<0.2&&(c=tnC(c,[40,60,30],It(X/2,y/9,14)*0.7));y>200&&(c=tnC(c,[40,70,30],0.4));(y-175)%14===0&&(c=tnC(c,[50,50,46],0.5));}
      const ed=P.find(([a,b])=>X>=a&&X<b);if(ed&&(X-ed[0]<3||ed[1]-X<=3))c=tnC(c,[0,0,0],X-ed[0]<3?0.15:0.45);if(ed&&(X-ed[0]<6||ed[1]-X<6)&&y<180&&r(X+y*7,15)<0.35)c=[10,14,10];}
    else{c=tnC([8,12,8],[20,28,16],It(X/9,y/6,16));}
    t.px(x,y,c);}
  for(let x=0;x<384;x++){const X=x+ox;for(let y=52;y<66;y++){let c=tnC([40,46,36],[120,132,104],1-Math.abs((y-52)/13-0.3)*1.5);It(X/10,y/3,17)>0.64&&(c=tnC(c,[120,70,30],0.7));t.px(x,y,c);}
    if((X+30)%120<8)for(let y=50;y<68;y++)t.px(x,y,y===50?[110,118,98]:[40,44,34]);if(It(X/7,2,18)>0.7)for(let k=0;k<3+((r(X,19)*8)|0);k++)t.px(x,66+k,[110,70,30],0.6);}
  for(const gx of[200,560,860]){const x=gx-ox;t.rect(x,0,32,7,[6,8,6]);for(let k=0;k<5;k++)t.rect(x+3+6*k,1,2,5,[196,214,160]);}
  for(const px of[328,626,776]){const x=px-ox;t.disc(x,120,9,(dx,dy)=>Math.hypot(dx,dy)>6.5?tnC([60,64,54],[130,136,118],(dy<0?0.7:0.2)+It(dx/2,dy/2,20)*0.3):[6,8,6]);for(let k=0;k<26;k++)t.px(x+((k%3)-1),130+k,[120,80,30],0.5-k/60);}
  for(let y=0;y<172;y++){for(const lx of[22,42])for(let d=0;d<3;d++)t.px(lx+d-ox,y,tnC([70,74,66],[150,154,140],d===0?0.8:d===1?0.4:0.1));if(y%12===6)for(let x=22;x<45;x++)t.px(x-ox,y,[130,134,122]),t.px(x-ox,y+1,[54,58,50]);}
  It(1,1,21);const cx=2*rooms.sewer.W-92;
  for(let y=150;y<172;y++)for(let x=0;x<26;x++)t.px(cx+x-ox,y,tnC([96,64,30],[140,96,50],It(x/3,(y%6)/2,22)+(y%6===0?-0.6:0)));t.rect(cx-ox,150,26,1,[170,120,70]);
  t.rect(cx+30-ox,164,22,8,[40,60,110]);t.rect(cx+30-ox,166,22,1,[180,60,60]);t.rect(cx+30-ox,169,22,1,[180,60,60]);
  t.rect(cx+56-ox,162,4,10,[200,190,160]);t.px(cx+57-ox,160,[255,200,90]);t.light(cx+57-ox,160,18,[255,200,120],0.35);
  t.vig&&t.vig(0.35,192,108);}

/* ---------------- the dropped paper: a crumpled, torn, stained sheet lying on the wet sewer floor (pixel art) ---------------- */
let tnPaperCv=null;
function tnPaperArt(){if(tnPaperCv)return tnPaperCv;const PW=176,PH=128,G=[62,60,56],RED=[186,40,32];
  const full=Ae((t)=>{
    for(let y=0;y<PH;y++)for(let x=0;x<PW;x++){let c=tnC([52,56,50],[92,96,88],It(x/6,y/5,40));r(x*7+y*3,41)<0.05&&(c=[120,124,116]);const pd=It(x/22,y/14,42);pd>0.68&&(c=tnC(c,[30,40,40],0.75),Et(x,y)<(pd-0.68)*2&&(c=tnC(c,[120,140,140],0.3)));
      It(x/8,y/8,43)>0.7&&(c=tnC(c,[50,84,40],0.6));t.px(x,y,c);}
    const poly=[[20,14],[160,8],[167,94],[159,101],[163,107],[150,116],[140,113],[14,121]];
    t.poly(poly.map(([x,y])=>[x+4,y+4]),(x,y)=>tnC(t.get(x,y),[0,0,0],0.5));
    const inP=new Uint8Array(PW*PH),E=poly.map((p,i)=>[p,poly[(i+1)%poly.length]]),dE=(x,y)=>Math.min(...E.map(([a,b])=>{const vx=b[0]-a[0],vy=b[1]-a[1],L=vx*vx+vy*vy,k=Rt(((x-a[0])*vx+(y-a[1])*vy)/L);return Math.hypot(x-a[0]-k*vx,y-a[1]-k*vy);}));
    t.poly(poly,(x,y)=>{const d=dE(x,y);if(d<2.2&&It(x/2,y/2,44)<0.45)return null;inP[y*PW+x]=1;let c=tnC([232,222,190],[214,202,166],It(x/3,y/3,45));c=tnC(c,[176,150,100],Math.max(0,(6-d)/6)*0.55);r(x*13+y*5,46)<0.04&&(c=tnC(c,[150,140,110],0.5));return c;});
    const pen=(x,y,c,a)=>{x|=0;y|=0;inP[y*PW+x]&&r(x*17+y*29,47)>0.07&&t.px(x,y,c,a*(0.7+0.3*r(x+y*3,48)));};
    const pl=(x0,y0,x1,y1,c,a=0.85)=>{const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0))*1.4+1;for(let i=0;i<=n;i++){const k=i/n;pen(x0+(x1-x0)*k+(r(i,x0+y0)-0.5)*0.6,y0+(y1-y0)*k+(r(i,x1+y1)-0.5)*0.6,c,a);}};
    const write=(txt,X,Y,c,sz)=>{let x=X;for(let i=0;i<txt.length;i++){const ch=txt[i];if(ch!==" "){const M=tnMask(ch,sz,{seed:i*3+X,mess:0.55}),jy=Math.round((r(i,X)-0.5)*2),oy=Math.round(M.h/2-sz/2);for(let yy=0;yy<M.h;yy++)for(let xx=0;xx<M.w;xx++)M.m[yy*M.w+xx]&&pen(x+xx-12,Y+yy-oy+jy,c,0.9);}x+=sz+(r(i,X+1)<0.3?1:0);}};
    write("IF YOU ARE READING",30,22,G,7);write("THIS, STEPS HAVE",30,38,G,7);write("APPEARED, GO BACK",30,54,G,7);write("UP.",30,70,G,7);write("DEAD END.",30,92,RED,8);
    for(let x=30;x<104;x++){pen(x,103+Math.sin(x/5)*0.7,RED,0.8);x%2&&pen(x,105+Math.sin(x/4)*0.7,RED,0.6);}
    const CR=[[90,0,1,0,0.09],[0,64,0.05,1,0.08],[40,20,0.8,0.6,0.06],[120,30,-0.7,0.7,0.05],[60,100,0.6,-0.8,0.06],[150,90,0.9,0.4,0.05],[30,80,-0.4,0.9,0.04]];
    for(let y=0;y<PH;y++)for(let x=0;x<PW;x++){if(!inP[y*PW+x])continue;let s=0,ln=0;for(const[cx,cy,nx,ny,a]of CR){const L=Math.hypot(nx,ny),d=((x-cx)*nx+(y-cy)*ny)/L;s+=a*Math.tanh(d/1.6);Math.abs(d)<0.6?(ln-=0.16):d>0.6&&d<1.7&&(ln+=0.1);}
      let c=t.get(x,y);c=s+ln>0?tnC(c,[255,250,236],Math.min(0.5,s+ln)):tnC(c,[70,56,30],Math.min(0.55,-(s+ln)*1.1));
      const dr=Math.hypot(x-104,y-96);Math.abs(dr-11)<1.1&&(c=tnC(c,[130,92,50],0.4));dr<10&&(c=tnC(c,[170,140,90],0.12));
      const gd=Math.hypot((x-26)/26,(y-116)/14),gm=It(x/6,y/5,49)*Math.max(0,1-gd);gm>0.22&&(c=tnC(c,[70,84,46],Math.min(0.55,(gm-0.22)*1.6)));
      r(x*5+y*11,50)<0.006&&(c=tnC(c,[150,130,90],0.5));t.px(x,y,c);}
    t.light(40,20,90,[255,236,200],0.35,1);});
  const cv=document.createElement("canvas");cv.width=PW;cv.height=PH;cv.getContext("2d").drawImage(full,0,0,PW,PH,0,0,PW,PH);return(tnPaperCv=cv);}
function tnShowPaper(done){const pp=qs("#tnPaper");modal=4;pp.innerHTML='<div class="gcard"><h3>A DROPPED PAPER</h3><div class="tnpaperwrap"></div><p style="font-size:7px;margin:8px 0 0;color:#b8c8e8">Damp and crumpled, dropped on the concrete. Someone scrawled a warning in pencil and underlined the last words in red.</p><div class="btns"><button class="gbtn" id="tnPOk">KEEP IT</button></div></div>';
  const cv=tnPaperArt(),img=document.createElement("img");img.src=cv.toDataURL();img.alt="A crumpled note: If you are reading this, steps have appeared, go back up. Dead end.";img.className="tnpaperimg";pp.querySelector(".tnpaperwrap").appendChild(img);pp.hidden=!1;
  const ok=qs("#tnPOk");ok.focus();ok.onclick=()=>{pp.hidden=!0;modal=0;done&&done();};pp.__done=ok.onclick;}
function tnPaperSprite(x,y){const f=Math.max(0,Math.sin(tick/18))*0.8;
  fill("rgba(0,0,0,.4)",x-6,y-0.5,13,1);fill("#b9ad86",x-6,y-2,12,2);fill("#e9dfc0",x-5.5,y-2.5,4.5,1);fill("#d2c6a0",x-1,y-2.5,2.5,1);fill("#f2ead0",x+1.5,y-3,3,1);fill("#cdbf98",x+4,y-2.5,1.5,1.5);
  fill("#a89c74",x-1.5,y-2.5,0.5,2);fill("#f6efd8",x+4,y-3.5-f,2,0.5+f*0.5);fill("#5e5648",x-4.5,y-1.5,3,0.5);fill("#5e5648",x+1,y-2,2,0.5);fill("#c03a2a",x+2.5,y-1.5,1.5,0.5);fill("#6a7a40",x-6,y-0.5,3,0.5);}

/* ---------------- dynamic drawing ---------------- */
const tnGlint=(x,y,k)=>{const a=0.5+0.5*Math.sin(tick/8+k);if(a<0.35)return;ctx.globalAlpha=a;fill("#fffbe0",x,y-1.5,0.5,3.5);fill("#fffbe0",x-1.5,y,3.5,0.5);ctx.globalAlpha=1;};
const tnEll=(cx,cy,rx,ry,c)=>{for(let y=-ry;y<=ry;y+=0.5){const hw=rx*Math.sqrt(Math.max(0,1-(y*y)/(ry*ry)));fill(c,Math.round(2*(cx-hw))/2,cy+y,Math.round(4*hw)/2,0.5);}};
function tnCar(){const x=278,g=92;
  fill("rgba(0,0,0,.35)",x+2,g-1,62,2);
  fill("#1e3434",x,g-14,64,11);fill("#3a6a6a",x+1,g-13,62,9);fill("#5a8a86",x+1,g-13,62,1);
  for(let k=0;k<14;k++)fill(k%3?"rgba(106,58,26,.7)":"#8a5a2a",x+3+58*r(k,1),g-12+7*r(k,2),2,1+r(k,3)*2);
  fill("rgba(8,6,4,.35)",x+1,g-13,20,9);
  fill("#1e3434",x+14,g-24,32,10);fill("#3a6a6a",x+16,g-23,28,9);
  fill("#0a1014",x+18,g-22,11,7);fill("#0a1014",x+31,g-22,11,7);
  for(let d=-3;d<=3;d++){fill("rgba(225,238,248,.55)",x+23+d,g-19+((d*0.7)|0),0.5,0.5);fill("rgba(225,238,248,.5)",x+36+d,g-19-((d*0.6)|0),0.5,0.5);}
  if(TS.carOpen){fill("#0a1014",x+30,g-13,8,9);fill("#3a6a6a",x+37,g-14,2,10);fill("#2a4a4a",x+39,g-15,2,11);}
  [x+6,x+48].forEach((wx,k)=>{fill("#0a0c0e",wx-1,g-6,10,4);fill("#161a1e",wx,g-3,8,3);fill(k?"#7a5a3a":"#4a4e52",wx+3,g-3,2,1);});
  if(TS.trunk){fill("#0a1014",x+52,g-13,12,4);fill("#1e3434",x+58,g-30,4,17);fill("#3a6a6a",x+59,g-29,2,15);fill("#5a8a86",x+59,g-29,2,1);}
  else{fill("#2a4a4a",x+52,g-14,12,2);tnGlint(x+58,g-16,3);}
  for(let k=0;k<6;k++){const vx=x+4+56*r(k,9),L=3+6*r(k,10);for(let y=0;y<L;y++)fill(y%2?"#2a6a30":"#4a9a3a",vx,g-24+(vx>x+14&&vx<x+46?0:10)-y*0.5,1,1);}
  for(let k=0;k<10;k++)fill(k%2?"#3a7a38":"#5ab04a",x-2+68*r(k,11),g-1-2*r(k,12),1,1+2*r(k,12));
  if(TN_ING.some((i)=>i.zone==="car"&&!got.has(i.id)))tnGlint(x+34,g-17,1);}
function tnTable(){const x=72,g=92;
  for(let k=0;k<28;k++){const y=g-12-(k*3)/28;fill("#5a3a1e",x+k,y,1,2);fill("#8a5a2e",x+k,y,1,0.5);}
  fill("#3a2614",x+25,g-15,2,15);fill("#3a2614",x+2,g-6,2,6);fill("#3a2614",x+5,g-2,7,1.5);
  if(TS.bp){const p=0.5+0.5*Math.sin(tick/20);glow(x+14,g-14,12,"120,170,255",0.25*p);
    for(let k=0;k<18;k++){const y=g-14.5-((k+5)*3)/28;fill(k%6?"#2a5ab8":"#cfe0ff",x+5+k,y,1,1);}
    fill("#cfe0ff",x+8,g-15.6,6,0.5);if(!TS.made)tnGlint(x+14,g-18,2);}}
function tnGraf(){const x=146,g=92,C=["#ff6ad0","#5af0ff","#ffd23a","#6aff7a","#f4f4ff"];
  for(let k=0;k<14;k++)fill(C[k%5],x+40*r(k,20),g-1+2*r(k,21),1+r(k,22)*2,0.5);
  [[2,0],[9,1],[30,0]].forEach(([dx,c],k)=>{fill("#0a0a10",x+dx-0.5,g-7,4,7);fill(C[c],x+dx,g-6.5,3,6);fill("#f4f4ff",x+dx,g-8,3,1.5);fill("#fff",x+dx+0.5,g-6,0.5,4);});
  [[14,2],[36,3],[22,4]].forEach(([dx,c])=>{fill("#0a0a10",x+dx-0.5,g-3.5,7,3.5);fill(C[c],x+dx,g-3,6,3);fill("#d8d8d8",x+dx+6,g-3,1.5,3);});
  const bx=x+22,open=TS.graf>0;fill("#0a0a14",bx-1,g-11,12,11);fill("#3a4a7a",bx,g-10,10,10);fill("#5a6a9a",bx,g-10,10,1);fill("#2a3458",bx+1,g-5,8,1);
  if(open){fill("#1a2238",bx+1,g-13,8,3);fill("#3a4a7a",bx+2,g-15,7,2);}else tnGlint(bx+5,g-12,4);}
function tnManhole(){const cx=TN_MH,cy=96;
  if(TS.mh<2){const p=TS.mh===1?Math.min(1,TS.er/240):0,rust=p<1?"#7a4a2a":"#5a5e62";
    tnEll(cx,cy+0.5,14,3.5,"#141618");tnEll(cx,cy,13,3,p>0.5?"#5a5e62":rust);
    for(let k=-10;k<=10;k+=4)fill(p>0.6?"#7a7e82":"#9a6a3a",cx+k,cy-1,2,0.5);fill(p>0.6?"#8a8e92":"#b8642a",cx-12,cy-0.5,24,0.5);
    if(p<0.8)for(let k=0;k<8;k++)fill("rgba(184,100,42,"+(0.6*(1-p))+")",cx-16+32*r(k,30),cy-2+5*r(k,31),2,1);
    if(TS.mh===1){glow(cx,cy,16,"160,255,140",0.25+0.15*Math.sin(tick/5));for(let k=0;k<10;k++){const a=(tick/3+k*17)%30/30;fill(k%2?"#cfff9a":"#ffb86a",cx-12+24*r(k,32),cy-1-a*5,0.5+r(k,33),0.5+r(k,33));}}
    else if(!TS.mh&&inv.includes("rustx"))tnGlint(cx,cy-5,6);}
  else{tnEll(cx,cy+0.5,13,3.5,"#2a2c2e");tnEll(cx,cy+0.5,11,2.5,"#040605");fill("#3a3e3a",cx-4,cy-1,1,4);fill("#3a3e3a",cx+3,cy-1,1,4);
    glow(cx,cy+1,10,"120,255,140",0.18);tnEll(cx+21,cy+1.5,12,2.5,"#4a4e52");tnEll(cx+21,cy+1,11,2,"#6a6e72");}
  if(TS.left){fill("#0a0a10",cx+15,g0(),12,4);fill("#4a4e5e",cx+16,g0()+0.5,10,3);fill("#b06aff",cx+18,g0()+1,3,2);}}
const g0=()=>89;
function tnSpider(){const c=tnSpT%540;if(c<180||c>330)return;const k=(c-180)/150,e=Math.sin(k*Math.PI)*16;ctx.strokeStyle="#140c18";ctx.lineWidth=2;
  for(let i=0;i<3;i++){const y0=34+i*14;ctx.beginPath();ctx.moveTo(452,y0);ctx.lineTo(444-e*0.6,y0-6+i*2);ctx.lineTo(438-e,92-(i===1?6:0));ctx.stroke();}
  if(c>220&&c<300){fill("#ff2a3a",444,40,1,1);fill("#ff2a3a",446,42,1,1);}}
function tnSewage(front){const P=rooms.sewer.plats,W=rooms.sewer.W,top=95;let x=0;const gaps=[];P.forEach((p)=>{p.x>x&&gaps.push([x,p.x]);x=Math.max(x,p.x+p.w);});x<W&&gaps.push([x,W]);
  gaps.forEach(([a,b])=>{if(front){ctx.globalAlpha=0.6;fill("#2e4a1e",a,top+1.5,b-a,13);ctx.globalAlpha=1;for(let xx=a;xx<b;xx+=2){const yy=top+Math.sin(xx/5+tick/12)*0.6;fill(xx%4?"#5a7a2a":"#7a9a3a",xx,yy,2,0.5);}
      for(let k=0;k<3;k++){const ph=((tick+k*41+a)%90)/90;fill("#9aba5a",a+(b-a)*r(k,a),top+1-ph*1.5,0.5+ph,0.5+ph);}}
    else{fill("#22361a",a,top,b-a,108-top);fill("#3a5a22",a,top,b-a,1);for(let k=0;k<(b-a)/8;k++){const fx=a+((r(k,a+3)*(b-a)+tick*0.15)%(b-a));fill(k%3?"#4a3a1a":"#6a6a5a",fx,top+2+6*r(k,a+5),2,1);}}});}
function tnSewerFx(){for(const x of[150,320,450,560]){ctx.globalAlpha=0.035+0.02*Math.sin(tick/40+x);ctx.fillStyle="#d8f0b0";ctx.beginPath();ctx.moveTo(x-6,0);ctx.lineTo(x+8,0);ctx.lineTo(x+22,95);ctx.lineTo(x-2,95);ctx.closePath();ctx.fill();ctx.globalAlpha=1;}
  for(const x of[164,313,388]){const ph=(tick*0.9+x)%26;fill("#4a6a22",x-1.5,64+ph*1.2,3,3);fill("#6a8a2a",x-1,64,2,31);}
  for(let k=0;k<5;k++){const t2=(tick+k*53)%110;if(t2<70)fill("rgba(200,230,255,.7)",40+100*k,4+t2*1.3,0.5,1.2);}
  if(!TS.paper){tnPaperSprite(TN_PAPER,86);glow(TN_PAPER,84,TC&&TC.k==="paper"?20:8,"255,240,190",(TC&&TC.k==="paper"?0.34:0.16)+0.08*Math.sin(tick/10));tnGlint(TN_PAPER+3,80,5);}}
function tnDraw(){if(!tnIs(room))return;if(room==="tunnel_exit")return void tnExDraw();if(room==="beyond")return void bzDraw();if(room==="tunnel"){tnTable();tnGraf();tnManhole();tnCar();tnSpider();tnRubbleDraw();tnLeftGun();
    const f=r(((tick/9)|0),77)<0.07?0.05:0.22;for(const lx of[40,104,168,232,296,360])glow(lx,15,26,"255,236,190",lx===104||lx===296?f:0.18);glow(440,70,60,"255,210,150",0.22);}
  else{tnSewage(0);tnSewerFx();}}
function tnFront(){c3Mine()&&c3Front();if(!tnIs(room))return;if(room==="sewer")tnSewage(1);
  if(TC&&TC.k==="paper"&&TC.bang){const bx=Math.round(player.x)-3,by=player.y-44+Math.round(Math.sin(tick/5));fill("#0a0c14",bx-1,by-1,8,11);fill("#fffbe8",bx,by,6,9);fill("#0a0c14",bx+2,by+9,2,2);fill("#e83a3a",bx+2,by+1.5,2,4.5);fill("#e83a3a",bx+2,by+6.5,2,1.5);}
  if(room==="tunnel"&&TC&&((TC.k==="enter"&&TC.t>150)||(TC.k==="rise"&&player.y>92.5))){fill("#040605",TN_MH-11,96,22,14);tnEll(TN_MH,96.5,13,1,"#2a2c2e");}}

/* ---------------- HUD: captions + letterbox ---------------- */
let tnUI=null;function tnInitUI(){if(tnUI)return tnUI;const gm=qs("#gm"),st=document.createElement("style");
  st.textContent="#tnBarT,#tnBarB{position:absolute;left:0;right:0;height:0;background:#000;z-index:6;transition:height .5s ease;pointer-events:none}#tnBarT{top:0}#tnBarB{bottom:0}#tnBarT.on,#tnBarB.on{height:11vh}"+
  "#tnCap{position:absolute;left:50%;bottom:13vh;transform:translateX(-50%);z-index:7;max-width:min(92vw,620px);padding:8px 12px;background:#000c;border:2px solid #3a4a7a;color:#e8f2ff;font-size:calc(9px*var(--hud,1));line-height:1.7;text-align:center;pointer-events:none}#tnCap[hidden]{display:none}"+
  ".hh{background:linear-gradient(90deg,#ff4a5a 50%,#3a2a3a 50%);-webkit-background-clip:text;background-clip:text;color:transparent}"+
  "#tnBP .gcard,#tnPaper .gcard{width:min(600px,100%)}.tnbp{position:relative;background-color:#1f4fa0;background-image:linear-gradient(#ffffff1f 1px,transparent 1px),linear-gradient(90deg,#ffffff1f 1px,transparent 1px);background-size:12px 12px;border:3px solid #cfe0ff;padding:10px;margin:0 0 8px;touch-action:none}"+
  ".tnbp svg{display:block;width:100%;height:auto}.tnslots{display:flex;gap:6px;margin-top:6px}.tnslot{flex:1;min-height:64px;border:2px dashed #cfe0ff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;font-size:6px;color:#cfe0ff;text-align:center;padding:4px;line-height:1.5}"+
  ".tnslot.on{border-style:solid;background:#ffffff22;color:#fff}.tnslot img{width:28px;height:28px;image-rendering:pixelated}.tnbp.hot{outline:3px solid #ffe070}"+
  "#tnTray{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 6px}#tnTray button{display:flex;align-items:center;gap:5px;min-height:46px;padding:5px 8px;font-size:7px;background:#16264a;border:2px solid #4a6ab0;border-radius:3px;color:#e8f2ff;font-family:inherit;touch-action:none;cursor:grab}#tnTray button img{width:28px;height:28px;image-rendering:pixelated;pointer-events:none}"+
  "#tnMsg{min-height:44px;font-size:7px;line-height:1.75;background:#0a1224;border:2px solid #3a4a7a;padding:7px;color:#e8f2ff;margin:0 0 6px}#tnMsg.good{border-color:#6aff9a}#tnMsg.bad{border-color:#ff7a6a}#tnGhost{position:fixed;width:44px;height:44px;pointer-events:none;z-index:99;image-rendering:pixelated;transform:translate(-50%,-50%)}"+
  ".tnpaperimg{display:block;width:min(100%,calc(50vh*1.375));height:auto;margin:0 auto;image-rendering:pixelated;border:3px solid #22305a;background:#0a0c0a}";
  document.head.appendChild(st);
  const mk=(id,tag)=>{const e=document.createElement(tag||"div");e.id=id;gm.appendChild(e);return e;};
  tnUI={t:mk("tnBarT"),b:mk("tnBarB"),c:mk("tnCap")};tnUI.c.hidden=!0;
  tkInitUI(mk);const bp=mk("tnBP");bp.className="gov";bp.hidden=!0;const pp=mk("tnPaper");pp.className="gov";pp.hidden=!0;return tnUI;}
const tnBars=(on)=>{const u=tnInitUI();u.t.classList.toggle("on",!!on);u.b.classList.toggle("on",!!on);};
const tnCap=(t)=>{const u=tnInitUI();u.c.textContent=t||"";u.c.hidden=!t;};

/* ======================= THE CAR TRUNK: first person, buried in junk ======================= */
const TK_FIND=[
  {id:"carkey",   x:112,y:158,w:22,h:12,n:"A KEY"},
  {id:"blueprint",x:232,y:166,w:26,h:16,n:"FOLDED PAPER"},
  {id:"foil",     x:174,y:181,w:26,h:14,n:"SOMETHING SHINY"},
];
/* x,y,w,h = start position; wt = how light (low = heavy, lags behind your drag); z = pile order (higher = on top) */
const TK_JUNK=[
  {id:"umbrella",k:"umbrella",x:168,y:96, w:76,h:10,wt:0.8,z:1, n:"A snapped umbrella",m:"A snapped umbrella. Its ribs poke out like bones."},
  {id:"cables",  k:"cables",  x:140,y:106,w:46,h:28,wt:0.6,z:2, n:"Tangled jumper cables",m:"Jumper cables, tangled into a knot. Dead battery? Dead everything."},
  {id:"box",     k:"box",     x:56, y:104,w:60,h:44,wt:0.5,z:4, n:"A taped cardboard box",m:"A cardboard box. Rattles. Mostly empty cans."},
  {id:"rags",    k:"rags",    x:100,y:156,w:36,h:20,wt:0.85,z:3,n:"Oily rags",m:"Oily rags. Disgusting. Something is under them…"},
  {id:"duffel",  k:"duffel",  x:84, y:140,w:72,h:36,wt:0.45,z:5,n:"A duffel bag",m:"A mouldy duffel bag, stuffed with old clothes."},
  {id:"papers",  k:"papers",  x:224,y:162,w:40,h:26,wt:0.8,z:3, n:"A stack of newspapers",m:"Newspapers, tied with twine. The date is years old."},
  {id:"cooler",  k:"cooler",  x:212,y:134,w:58,h:40,wt:0.35,z:6,n:"A cooler",m:"A cooler, heavy. Don't open it. Really don't."},
  {id:"toolbox", k:"toolbox", x:158,y:168,w:50,h:28,wt:0.4,z:5, n:"A toolbox",m:"A rusty toolbox. Nothing useful inside, just bent nails."},
  {id:"gascan",  k:"gascan",  x:192,y:146,w:28,h:38,wt:0.38,z:7,n:"A gas can",m:"An empty gas can. It sloshes a little…"},
  {id:"tire",    k:"tire",    x:262,y:86, w:68,h:68,wt:0.22,z:6,n:"A spare tire",m:"A spare tire. HEAVY. Drag it out."},
  {id:"blanket", k:"blanket", x:104,y:186,w:76,h:20,wt:0.7,z:4, n:"A rolled blanket",m:"A rolled-up blanket, damp and musty."},
  {id:"boots",   k:"boots",   x:60, y:150,w:36,h:22,wt:0.7,z:2, n:"A pair of muddy boots",m:"Muddy boots. Whoever owned them walked a long way."},
];
let TK=null;
const tkMsg=(h)=>{const m=qs("#tkMsg");m&&(m.innerHTML=Qt(h));};
function tkPaint(kind,w,h){const c=document.createElement("canvas");c.width=w;c.height=h;const g=c.getContext("2d"),
  R=(x,y,ww,hh,col,a)=>{g.globalAlpha=a==null?1:a;g.fillStyle=Array.isArray(col)?"rgb("+col.map(Math.round).join(",")+")":col;g.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(ww)),Math.max(1,Math.round(hh)));g.globalAlpha=1;},
  P=(x,y,col)=>R(x,y,1,1,col),N=(x,y,s)=>It(x/4,y/4,s),mix=Ct;
  if(kind==="tire"){for(let y=0;y<h;y++)for(let x=0;x<w;x++){const dx=x-w/2+0.5,dy=y-h/2+0.5,d=Math.hypot(dx,dy),an=Math.atan2(dy,dx);let col=null;
      if(d<33.5){if(d>20.5){col=mix([22,22,24],[46,46,50],N(x,y,3));if(d>28&&(((an+3.1416)*9)|0)%2===0)col=mix(col,[0,0,0],0.4);if(dx+dy<-18)col=mix(col,[110,110,116],0.22);if(d>32.2)col=[6,6,8];}
        else if(d>11.5){col=mix([104,108,116],[148,152,160],N(x,y,4));if(N(x,y,5)>0.62)col=mix(col,[132,74,36],0.7);for(let k=0;k<5;k++){const a2=k*1.2566,lx=Math.cos(a2)*16,ly=Math.sin(a2)*16;if(Math.hypot(dx-lx,dy-ly)<2.6)col=[12,12,14];}if(d<12.6||d>19.5)col=mix(col,[0,0,0],0.4);}
        else{col=mix([34,36,40],[70,72,78],N(x,y,6));if(d<4)col=[120,124,132];}
        if(col&&N(x,y,9)>0.74&&d>20)col=mix(col,[70,62,44],0.55);}
      col&&P(x,y,col);}}
  else if(kind==="box"){for(let y=0;y<h;y++)for(let x=0;x<w;x++){let col=mix([170,132,76],[196,158,98],N(x,y,1));if(y<9)col=mix(col,[216,180,116],0.5);if(y===9)col=[110,80,44];if(x<2||x>w-3||y>h-3)col=[96,70,38];if(Math.abs(x-w/2)<4)col=mix([214,200,150],[236,224,176],N(x,y,2));if(N(x,y,3)>0.72)col=mix(col,[134,96,52],0.6);
      if(x>w-12&&y<12&&(x-(w-12))>(y*0.9))col=null;col&&P(x,y,col);}
    for(let k=0;k<5;k++)R(8+k*3,22+(k%2),2,1,[34,30,24]);R(8,28,20,1,[34,30,24]);R(w-24,34,14,1,[34,30,24],0.7);}
  else if(kind==="cables"){const ring=(cx,cy,rx,ry,col,wd)=>{for(let y=0;y<h;y++)for(let x=0;x<w;x++){const d=Math.abs(Math.hypot((x-cx)/rx,(y-cy)/ry)-1);d<wd&&P(x,y,mix(col,[0,0,0],d*2));}};
    ring(24,14,17,9,[196,44,38],0.2);ring(21,14,14,7,[26,26,28],0.22);ring(26,13,15,8,[196,44,38],0.2);ring(23,15,12,6,[26,26,28],0.24);ring(25,14,9,5,[196,44,38],0.3);
    R(2,4,9,7,[150,154,160]);R(2,4,9,1,[210,214,220]);for(let k=0;k<4;k++)R(3+k*2,10,1,3,[100,104,110]);R(w-12,18,10,7,[150,154,160]);R(w-12,18,10,1,[210,214,220]);for(let k=0;k<4;k++)R(w-11+k*2,17,1,2,[100,104,110]);R(10,6,3,2,[26,26,28]);R(w-14,21,3,2,[196,44,38]);}
  else if(kind==="gascan"){for(let y=4;y<h;y++)for(let x=0;x<w;x++){let col=mix([168,36,30],[212,72,56],N(x,y,1));if(x<4)col=mix(col,[255,150,120],0.4);if(x>w-6)col=mix(col,[40,6,6],0.45);if(x<1||x>w-2||y>h-2)col=[48,8,8];if(y>16&&y<26)col=mix([232,224,196],[210,200,170],N(x,y,2));if(N(x,y,4)>0.72)col=mix(col,[110,60,30],0.55);P(x,y,col);}
    R(3,6,w-8,1,[255,150,120],0.6);R(w-12,0,8,6,[216,184,52]);R(w-12,0,8,1,[250,230,130]);R(4,0,10,3,[150,154,160]);R(4,3,2,5,[120,124,130]);R(12,3,2,5,[120,124,130]);R(8,18,3,6,[30,30,30]);R(12,18,2,6,[30,30,30]);R(15,18,3,6,[30,30,30]);R(7,w>0?30:30,14,1,[110,60,30]);}
  else if(kind==="duffel"){for(let y=0;y<h;y++)for(let x=0;x<w;x++){const cx=(x-w/2)/(w/2),cy=(y-h/2)/(h/2),e=cx*cx*0.9+Math.pow(Math.abs(cy),2.6);if(e>1)continue;let col=mix([76,92,52],[116,134,78],N(x,y,1)+(cy<-0.3?0.15:0));if(cy>0.45)col=mix(col,[18,24,12],0.35);if(e>0.9)col=mix(col,[10,14,8],0.6);if(N(x,y,7)>0.74)col=mix(col,[58,64,44],0.6);P(x,y,col);}
    R(10,2,3,h-4,[22,22,24]);R(w-14,2,3,h-4,[22,22,24]);R(14,h/2-1,w-28,1,[18,18,18]);for(let k=0;k<(w-28)/3;k++)R(15+k*3,h/2,1,1,[150,150,150]);R(w/2-4,h-8,8,6,[200,190,150]);R(w/2-3,h-7,6,1,[60,50,40]);}
  else if(kind==="blanket"){for(let y=0;y<h;y++)for(let x=0;x<w;x++){const cy=(y-h/2+0.5)/(h/2);if(Math.abs(cy)>1)continue;let col=Math.floor(x/7)%2?[168,58,50]:[226,214,184];col=mix(col,[255,255,255],Math.max(0,-cy*0.3));col=mix(col,[0,0,0],Math.max(0,cy*0.5)+N(x,y,2)*0.2);if(N(x,y,3)>0.7)col=mix(col,[90,70,40],0.5);P(x,y,col);}
    for(const x of[w*0.25,w*0.75]){R(x-1,0,3,h,[70,54,36]);R(x,0,1,h,[110,88,60]);}for(let y=0;y<h;y++){P(0,y,[20,14,10]);P(w-1,y,[20,14,10]);}}
  else if(kind==="toolbox"){R(0,10,w,h-10,[138,46,36]);R(0,10,w,2,[196,86,70]);R(0,h-2,w,2,[56,16,12]);R(0,0,w,11,[116,120,128]);R(0,0,w,2,[180,186,196]);R(0,9,w,2,[60,64,70]);
    for(let y=0;y<h;y++)for(let x=0;x<w;x++)N(x,y,8)>0.7&&y>1&&P(x,y,mix([138,46,36],[134,78,34],0.8));
    R(12,0,w-24,3,[40,42,46]);R(14,1,w-28,1,[90,94,100]);R(w/2-4,8,8,6,[200,168,70]);R(w/2-3,9,6,1,[250,224,130]);R(w-10,18,6,1,[250,224,130],0.6);R(w-8,2,5,2,[120,124,130]);R(w-8,0,2,4,[70,74,80]);R(4,15,14,3,[60,20,14]);}
  else if(kind==="papers"){for(let k=0;k<4;k++)R(k,h-4-k*4,w-k*2,4,mix([208,200,174],[190,176,138],k*0.3));R(0,0,w,h-8,[214,206,178]);R(0,0,w,1,[240,236,214]);R(0,h-9,w,1,[170,150,100]);
    for(let y=3;y<h-11;y+=3)R(3,y,w-6,1,[130,128,122],0.8);R(3,3,w-6,4,[40,40,42]);for(let x=4;x<w-6;x+=5)R(x,4,3,2,[214,206,178]);R(w/2-1,0,2,h-6,[150,120,70]);R(0,h/2-5,w,2,[150,120,70]);R(w-6,0,6,5,null||[0,0,0],0);
    for(let y=0;y<h;y++)for(let x=0;x<w;x++)N(x,y,11)>0.78&&R(x,y,1,1,[120,100,60],0.5);}
  else if(kind==="umbrella"){for(let x=0;x<w;x++){const t=x/w,hh=Math.max(1,Math.round(1+7*Math.sin(Math.min(1,t*1.15)*1.5)));R(x,5-hh/2,1,hh,mix([22,22,26],[48,48,56],N(x,3,2)));if(t>0.35&&t<0.9&&N(x,2,6)>0.6)R(x,5-hh/2,1,hh,null||[0,0,0],0);}
    R(0,3,10,3,[110,70,36]);R(0,2,4,1,[110,70,36]);for(let k=0;k<5;k++){const x=22+k*11;R(x,0,1,4,[150,154,160]);R(x+1,8,1,2,[150,154,160]);}R(w-3,4,3,2,[110,114,120]);for(const x of[30,52]){R(x,3,3,3,[120,70,40],0.0);}}
  else if(kind==="boots"){for(const ox of[0,18]){R(ox+2,0,10,14,[96,68,42]);R(ox,12,16,8,[96,68,42]);R(ox,18,17,3,[22,22,24]);R(ox+2,0,10,2,[140,102,66]);for(let k=0;k<4;k++)R(ox+4,3+k*3,6,1,[216,206,170]);R(ox+3,13,10,1,[60,42,24]);
      for(let y=0;y<21;y++)for(let x=ox;x<ox+17;x++)N(x,y,12)>0.66&&y>6&&R(x,y,1,1,[58,42,26],0.8);R(ox+13,13,4,5,[110,80,50]);}}
  else if(kind==="cooler"){for(let y=0;y<h;y++)for(let x=0;x<w;x++){let col=y<8?mix([226,230,236],[246,248,250],N(x,y,1)):mix([44,88,164],[64,112,190],N(x,y,2));if(y===8)col=[28,50,96];if(x<2||x>w-3||y>h-2)col=[16,30,64];if(N(x,y,4)>0.76)col=mix(col,[70,66,54],0.5);P(x,y,col);}
    R(w/2-11,0,22,3,[28,30,34]);R(w/2-9,1,18,1,[80,84,92]);R(8,3,5,5,[200,198,200]);R(w-14,3,5,5,[200,198,200]);R(10,18,10,10,[255,214,50]);R(12,20,6,6,[230,120,30]);R(w-22,22,9,9,[210,40,40]);R(w-20,24,5,5,[255,255,255]);
    for(let k=0;k<5;k++)R(4+((k*13)%(w-8)),12+((k*7)%24),5+(k%3)*3,1,[220,230,240],0.45);R(w-4,h-12,4,12,[16,30,64]);}
  else if(kind==="rags"){for(let y=0;y<h;y++)for(let x=0;x<w;x++){const cx=(x-w/2)/(w/2),cy=(y-h/2)/(h/2),e=Math.hypot(cx,cy*1.1)+(N(x,y,3)-0.5)*0.55;if(e>1)continue;const p=N(x*0.6,y*0.6,4);let col=p<0.33?[116,120,128]:p<0.66?[168,86,46]:[74,96,138];col=mix(col,[24,22,18],0.25+N(x,y,5)*0.5);if(e>0.9)col=mix(col,[0,0,0],0.5);if(N(x,y,6)>0.7)col=mix(col,[10,10,10],0.55);P(x,y,col);}}
  else if(kind==="carkey"){R(0,0,w,h,"#000",0);for(let y=0;y<12;y++)for(let x=0;x<12;x++){const d=Math.hypot(x-5.5,y-5.5);d<5.8&&d>2.4&&P(x,y,mix([186,182,166],[240,238,224],y<5?0.4:0));}
    R(10,4,11,3,[204,200,184]);R(10,4,11,1,[250,248,236]);R(10,6,11,1,[130,126,112]);R(14,7,2,3,[186,182,166]);R(17,7,2,2,[186,182,166]);R(19,7,2,3,[186,182,166]);R(1,10,6,5,[176,40,38],0);R(2,9,5,3,[176,40,38]);R(2,9,5,1,[236,96,84]);P(16,3,[255,255,255]);}
  else if(kind==="blueprint"){for(let y=0;y<h;y++)for(let x=0;x<w;x++){let col=mix([28,80,168],[56,112,206],N(x,y,2));if(x===8||x===17||y===8)col=mix(col,[190,214,255],0.45);if(x<1||y<1||x>w-2||y>h-2)col=[16,44,100];if(x>w-6&&y<5&&(x-(w-6))>y)col=null;col&&P(x,y,col);}
    for(let k=0;k<4;k++)R(3+k*2,3+(k%2)*3,2,1,[210,230,255]);R(3,12,12,1,[210,230,255],0.8);R(w-10,10,5,1,[255,140,60]);R(w-9,8,1,4,[255,140,60]);}
  else if(kind==="foil"){for(let y=0;y<h;y++)for(let x=0;x<w-6;x++){const cy=(y-h/2+0.5)/(h/2);if(Math.abs(cy)>1)continue;let col=mix([212,218,230],[120,128,142],Math.abs(cy)*0.9);col=mix(col,[255,255,255],Math.max(0,0.8-Math.abs(cy+0.45)*3)*0.7);if(N(x,y,2)>0.7)col=mix(col,[90,96,108],0.5);P(x,y,col);}
    for(let y=0;y<h;y++){const cy=(y-h/2+0.5)/(h/2);if(Math.abs(cy)>1)continue;R(w-8,y,6,1,mix([170,126,80],[96,64,36],Math.abs(cy)));}R(w-9,2,1,h-4,[60,40,24]);R(w-5,h/2-1,2,2,[30,20,12]);
    R(0,3,5,h-6,[200,206,218]);for(let k=0;k<h-6;k+=2)R(0,3+k,3+(k%3),1,[140,148,162]);R(4,2,2,3,[240,244,252]);}
  const d=g.getImageData(0,0,w,h).data,m=new Uint8Array(w*h);for(let i=0;i<w*h;i++)m[i]=d[4*i+3]>40?1:0;return{c,m,w,h};}

function tkBG(){return Ae((t)=>{
  for(let y=0;y<216;y++)for(let x=0;x<384;x++){let c;
    if(y<66){c=mix2([54,58,62],[34,36,40],y/66);const rib=y===22||y===38||y===54;rib&&(c=tnC(c,[0,0,0],0.4));const st=(x%96)<9;st&&(c=tnC(c,[84,88,92],0.4));
      const rs=It(x/12,y/9,3);rs>0.62&&(c=tnC(c,[124,68,32],Math.min(0.85,(rs-0.62)*2.5)));It(x/3,y/3,4)>0.8&&(c=tnC(c,[18,18,20],0.5));y>60&&(c=tnC(c,[0,0,0],(y-60)/10));}
    else if(y<198){const inL=x<58,inR=x>326;
      if(inL||inR){const dist=inL?58-x:x-326,top=104+dist*0.18;if(y>top&&y<184){const k=(y-top)/(184-top);c=tnC([22,22,26],[60,60,68],Math.sin(k*3.1416)*0.8);It(x/3,y/3,5)>0.72&&(c=tnC(c,[8,8,10],0.6));dist>10&&dist<12&&(c=tnC(c,[0,0,0],0.5));}
        else c=y<104?tnC([20,28,30],[34,48,50],It(x/9,y/7,6)):tnC([36,54,56],[26,40,42],It(x/9,y/6,7));}
      else if(y<104){c=tnC([16,22,26],[28,38,42],It(x/14,y/6,8));(y===70||y===71)&&(c=tnC(c,[0,0,0],0.5));if(y>66&&y<70)c=tnC(c,[70,74,78],0.4);}
      else{const k=(y-104)/94;c=tnC([30,46,48],[44,68,70],It(x/7,y/4,9)*0.7+k*0.3);const seam=(Math.floor((x-192)/(30+k*60)+0.5)),sx=Math.abs(((x-192)/(30+k*60))%1);sx<0.04&&(c=tnC(c,[0,0,0],0.4));
        const st=It(x/16,y/10,10);st>0.7&&(c=tnC(c,[16,20,18],0.8));const oil=It(x/22+4,y/12,11);oil>0.74&&(c=tnC(c,[104,62,24],0.5));It(x/3,y/3,12)>0.84&&(c=tnC(c,[130,100,44],0.7));
        const pd=Math.hypot((x-300)/26,(y-184)/5);pd<1&&(c=tnC([38,50,56],[108,128,140],Math.max(0,0.5-Math.abs(y-182)/8)));}
      const cr=Math.min(x,383-x,y-66)/(1);cr<12&&(c=tnC(c,[0,0,0],(12-cr)/18));}
    else{c=tnC([96,92,86],[134,126,114],It(x/6,y/3,13));y===198&&(c=[168,160,148]);y>=200&&(c=tnC(c,[0,0,0],(y-198)/24));It(x/10,y/5,14)>0.64&&(c=tnC(c,[132,70,30],0.8));It(x/4,y/4,15)>0.78&&(c=tnC(c,[44,36,26],0.7));if(x>166&&x<218&&y>200&&y<212){c=tnC([204,196,170],[170,160,130],It(x/3,y/3,16));(x===167||x===217||y===201||y===211)&&(c=[60,56,48]);}}
    x<10&&y>=66&&(c=tnC(c,[0,0,0],0.55));x>373&&y>=66&&(c=tnC(c,[0,0,0],0.55));
    t.px(x,y,c);}
  /* corner cobwebs, a broken trunk light, hanging wire */
  for(const[ox,dx]of[[2,1],[381,-1]])for(let k=1;k<7;k++){for(let a=0;a<=k*5;a++){const ang=(a/(k*5))*1.5708,px=ox+dx*Math.cos(ang)*k*6,py=66+Math.sin(ang)*k*6;t.px(px,py,[200,204,210],0.4);}}
  t.rect(184,10,26,8,[40,42,46]);t.rect(186,16,22,3,[196,190,160]);t.rect(186,18,8,2,[120,116,96]);t.line(200,18,206,40,[20,20,22]);t.line(206,40,198,56,[20,20,22]);t.px(198,56,[150,70,30]);
  t.rect(166,24,5,3,[130,130,136]);t.px(168,24,[220,220,226]);
  /* the lid's rubber seal and the latch */
  t.rect(20,60,344,5,[10,10,12]);for(let x=24;x<360;x+=3)t.px(x,61,[34,34,38]);t.rect(176,56,32,9,[110,112,118]);t.rect(176,56,32,1,[180,184,190]);t.rect(188,58,8,5,[40,42,46]);
  t.light(192,40,60,[255,236,200],0.5,0.6);
});}
function mix2(a,b,k){return Ct(a,b,Math.max(0,Math.min(1,k)));}

function tkInit(){if(TK)return;const T={spr:{},bg:tkBG(),fx:[],raf:0,lx:192,ly:130,drag:null,fall:[],lc:null};for(const j of TK_JUNK)T.spr[j.k]=tkPaint(j.k,j.w,j.h);for(const f of TK_FIND)T.spr[f.id]=tkPaint(f.id,f.w,f.h);const lc=document.createElement("canvas");lc.width=384;lc.height=216;T.lc=lc;TK=T;}
function tnShowTrunk(){const u=tnInitUI();tkInit();
  const S=TS.tk;TK.junk=TK_JUNK.filter((j)=>!S.out[j.id]).map((j,i)=>{const p=S.pos[j.id];return{id:j.id,k:j.k,w:j.w,h:j.h,wt:j.wt,n:j.n,m:j.m,x:p?p[0]:j.x,y:p?p[1]:j.y,tx:p?p[0]:j.x,ty:p?p[1]:j.y,z:p?p[2]:j.z};});
  TK.finds=TK_FIND.filter((f)=>!S.f[f.id]).map((f)=>Object.assign({},f,{cov:0,seen:!!S.seen[f.id]}));TK.zmax=Math.max(10,...TK.junk.map((j)=>j.z));
  modal=4;qs("#tnTrunk").hidden=!1;qs("#tkCard").hidden=!0;tkSlots();tkStat();tkMsg(TK.finds.length===3?"<b>The trunk is buried in junk.</b> Drag things out of the way and dig. There must be something useful under all this.":"<b>Keep digging.</b> Drag the junk out of the trunk to find the rest.");
  tkBind();cancelAnimationFrame(TK.raf);TK.raf=requestAnimationFrame(tkLoop);}
function tkSlots(){const a=[["blueprint","BLUEPRINT"],["foil","PART"],["carkey","CAR KEY"]];qs("#tkSlots").innerHTML=a.map(([id,l])=>{const f=TS.tk.f[id];return'<div class="tkslot'+(f?" on":"")+'">'+(f?'<img src="'+s(items[id].k,items[id].c)+'" alt="">':"<b>?</b>")+"<span>"+(f?Qt(items[id].n).slice(0,13):l)+"</span></div>";}).join("");}
function tkStat(){const out=Object.keys(TS.tk.out).length;qs("#tkSt").innerHTML='<span class="chip">JUNK CLEARED '+out+"/"+TK_JUNK.length+'</span><span class="chip'+(TS.tk.done?" on":"")+'">FOUND '+Object.keys(TS.tk.f).length+"/3</span>";}
let tkBound=0;
function tkPos(e){const r=qs("#tkc").getBoundingClientRect();return[(e.clientX-r.left)/r.width*384,(e.clientY-r.top)/r.height*216];}
const tkHitJ=(x,y)=>{const L=TK.junk.slice().sort((a,b)=>b.z-a.z);for(const j of L){const sx=Math.floor(x-j.x),sy=Math.floor(y-j.y);if(sx>=0&&sy>=0&&sx<j.w&&sy<j.h&&TK.spr[j.k].m[sy*j.w+sx])return j;}return null;};
function tkCover(f){const sp=TK.spr[f.id];let tot=0,vis=0;for(let y=0;y<f.h;y+=2)for(let x=0;x<f.w;x+=2){if(!sp.m[y*f.w+x])continue;tot++;if(!TK.junk.some((j)=>{const sx=Math.floor(f.x+x-j.x),sy=Math.floor(f.y+y-j.y);return sx>=0&&sy>=0&&sx<j.w&&sy<j.h&&TK.spr[j.k].m[sy*j.w+sx];}))vis++;}return tot?vis/tot:0;}
function tkBind(){if(tkBound)return;tkBound=1;const cv=qs("#tkc");
  cv.addEventListener("pointerdown",(e)=>{if(modal!==4||!TK||!qs("#tkCard").hidden)return;e.preventDefault();try{cv.setPointerCapture(e.pointerId);}catch(x){}const[x,y]=tkPos(e);TK.lx=x;TK.ly=y;
    const j=tkHitJ(x,y);if(j){j.z=++TK.zmax;TK.drag={j,ox:x-j.x,oy:y-j.y};j.tx=j.x;j.ty=j.y;$sx(j.wt<0.4?"clank":"crate");tkMsg(j.m);return;}
    for(const f of TK.finds){const sx=Math.floor(x-f.x),sy=Math.floor(y-f.y),sp=TK.spr[f.id];if(sx>=0&&sy>=0&&sx<f.w&&sy<f.h&&sp.m[sy*f.w+sx]){if(tkCover(f)>=0.6)return void tkCollect(f);$sx("locked");tkMsg("It's wedged under the junk. Clear more of the pile first.");return;}}});
  cv.addEventListener("pointermove",(e)=>{if(!TK)return;const[x,y]=tkPos(e);TK.lx=x;TK.ly=y;if(TK.drag){const d=TK.drag;d.j.tx=Math.max(-d.j.w*0.5,Math.min(384-d.j.w*0.5,x-d.ox));d.j.ty=Math.max(-d.j.h*0.5,Math.min(216-d.j.h*0.4,y-d.oy));}});
  const up=()=>{const d=TK&&TK.drag;if(!d)return;TK.drag=null;const j=d.j,cx=j.x+j.w/2,cy=j.y+j.h/2,inside=cx>52&&cx<332&&cy>82&&cy<192;
    if(inside){TS.tk.pos[j.id]=[Math.round(j.x),Math.round(j.y),j.z];$sx("crate");}else{TS.tk.out[j.id]=1;delete TS.tk.pos[j.id];TK.junk=TK.junk.filter((q)=>q!==j);TK.fall.push({j,vy:0.5,vx:(cx<192?-0.4:0.4)});$sx("slam");tkStat();
      const n=Object.keys(TS.tk.out).length;tkMsg(n<TK_JUNK.length?"<b>"+j.n+" tossed out.</b> "+(TK.finds.every((f)=>f.cov<0.6)?"Keep digging.":"Something is showing under there!"):"The trunk is empty of junk. Check what's left.");}
    c2Save("tunnel");};
  cv.addEventListener("pointerup",up);cv.addEventListener("pointercancel",up);cv.addEventListener("lostpointercapture",up);}
function tkLoop(){if(modal!==4||qs("#tnTrunk").hidden||!TK)return;const cv=qs("#tkc"),g=cv.getContext("2d");g.imageSmoothingEnabled=!1;g.drawImage(TK.bg,0,0);
  for(const f of TK.finds){const c=tkCover(f);f.cov=c;if(c>=0.6&&!f.seen){f.seen=1;TS.tk.seen[f.id]=1;$sx("blip");tkMsg("<b>Wait… "+f.n.toLowerCase()+"!</b> Something's lying under there. Tap it to take it.");}
    g.drawImage(TK.spr[f.id].c,Math.round(f.x),Math.round(f.y));}
  for(const j of TK.junk){if(TK.drag&&TK.drag.j===j){const k=0.12+0.6*j.wt;j.x+=(j.tx-j.x)*k;j.y+=(j.ty-j.y)*k;if(Math.random()<0.45&&Math.hypot(j.tx-j.x,j.ty-j.y)>2)TK.fx.push({x:j.x+j.w*Math.random(),y:j.y+j.h,vx:(Math.random()-0.5)*0.6,vy:-0.2-Math.random()*0.5,l:26,c:Math.random()<0.5?"#8a8478":"#5a5a52"});}}
  for(const j of TK.junk.slice().sort((a,b)=>a.z-b.z)){const lift=TK.drag&&TK.drag.j===j?-2:0;if(lift){g.globalAlpha=0.35;g.fillStyle="#000";g.fillRect(Math.round(j.x)+3,Math.round(j.y)+j.h-2,j.w-4,3);g.globalAlpha=1;}g.drawImage(TK.spr[j.k].c,Math.round(j.x),Math.round(j.y)+lift);}
  for(const f of TK.finds)if(f.cov>=0.6){const a=0.5+0.5*Math.sin(performance.now()/160);g.globalAlpha=a;g.fillStyle="#fffbe0";for(const[sx,sy]of[[f.x-2,f.y-2],[f.x+f.w+1,f.y+1],[f.x+f.w/2,f.y-3],[f.x+2,f.y+f.h+1]]){g.fillRect(sx,sy-2,1,5);g.fillRect(sx-2,sy,5,1);}g.globalAlpha=1;}
  TK.fall=TK.fall.filter((q)=>{q.vy+=0.45;q.j.y+=q.vy;q.j.x+=q.vx;g.drawImage(TK.spr[q.j.k].c,Math.round(q.j.x),Math.round(q.j.y));if(q.j.y>230)return!1;if(Math.random()<0.5)TK.fx.push({x:q.j.x+q.j.w*Math.random(),y:q.j.y+q.j.h*Math.random(),vx:0,vy:0.3,l:14,c:"#6a665c"});return!0;});
  TK.fx=TK.fx.filter((p)=>{p.x+=p.vx;p.y+=p.vy;p.vy+=0.02;p.l--;g.globalAlpha=Math.min(1,p.l/12);g.fillStyle=p.c;g.fillRect(Math.round(p.x),Math.round(p.y),1,1);g.globalAlpha=1;return p.l>0;});
  const lg=TK.lc.getContext("2d");lg.globalCompositeOperation="source-over";lg.clearRect(0,0,384,216);lg.fillStyle="rgba(0,0,8,0.6)";lg.fillRect(0,0,384,216);lg.globalCompositeOperation="destination-out";const lx=TK.lx+Math.sin(performance.now()/500)*0.8;for(let r=108;r>6;r-=9){lg.globalAlpha=0.17;lg.beginPath();lg.arc(lx,TK.ly,r,0,7);lg.fill();}lg.globalAlpha=1;lg.globalCompositeOperation="source-over";g.drawImage(TK.lc,0,0);
  g.globalAlpha=0.08;g.fillStyle="#ffe8b0";g.beginPath();g.arc(lx,TK.ly,22,0,7);g.fill();g.globalAlpha=1;
  TK.raf=requestAnimationFrame(tkLoop);}
function tkCollect(f){const id=f.id;TS.tk.f[id]=1;TK.finds=TK.finds.filter((q)=>q!==f);for(let k=0;k<18;k++)TK.fx.push({x:f.x+f.w/2,y:f.y+f.h/2,vx:(Math.random()-0.5)*2.4,vy:-Math.random()*2,l:34,c:k%2?"#ffe070":"#ffffff"});
  if(id==="blueprint"){TS.bp=1;got.add("blueprint");}else{inv.includes(id)||inv.push(id);got.add(id);}
  TS.tk.done=["carkey","blueprint","foil"].every((q)=>TS.tk.f[q])?1:0;$sx("pickup");$sx("card");updateBag();updateGuide();tkSlots();tkStat();c2Save("tunnel");tkCard(id);}
function tkCard(id){const e=items[id],c=qs("#tkCard");c.innerHTML='<div class="gcard"><h3>FOUND: '+Qt(e.n)+'</h3><div class="row"><img src="'+s(e.k,e.c)+'" alt=""><div>'+(e.where?"<i>📍 "+e.where+"</i>":"")+Kt(id)+'</div></div><div class="btns"><button class="gbtn" id="tkOk">OK</button></div></div>';c.hidden=!1;const ok=qs("#tkOk");ok.focus();
  ok.onclick=()=>{c.hidden=!0;TS.tk.done?tkMsg("<b>That's everything useful.</b> Close the trunk and use what you found."):tkMsg("<b>Nice find.</b> There's more buried in here. Keep digging.");id==="blueprint"&&setTimeout(()=>toast("The blueprint is yours. Lay it out on the broken table.",2600),200);};}
function tnCloseTrunk(){if(!TK)return;TK.drag=null;cancelAnimationFrame(TK.raf);qs("#tnTrunk").hidden=!0;qs("#tkCard").hidden=!0;modal=0;evoAutosave();c2Save("tunnel");updateGuide();$sx("creak");}
GM.tk=()=>TK?{junk:TK.junk.map((j)=>({id:j.id,x:j.x,y:j.y,w:j.w,h:j.h,z:j.z})),finds:TK.finds.map((f)=>({id:f.id,x:f.x,y:f.y,w:f.w,h:f.h,cov:+(f.cov||0).toFixed(2)})),open:modal===4&&!qs("#tnTrunk").hidden,card:!qs("#tkCard").hidden}:null;
/* ======================= END TRUNK ======================= */

/* ======================= BEYOND THE TUNNEL: the lost map, the wrecks, the radio ======================= */
/* what is in each wreck (index = C2.beyond.cars order, right to left) */
const BZ_LOOT=[
  {k:"atlas",say:"A road atlas! …No. The pages are burnt to ash. Useless.",toast:"<b>A BURNT ROAD ATLAS</b><br>Every page that mattered is ash. No map here."},
  {k:"radio",say:"A radio! The batteries are dead… but it doesn't look broken."},
  {k:"none",say:"Broken glass, a cracked phone with no signal and an old parking ticket. No map.",toast:"Nothing useful in this one. Keep searching."},
  {k:"batts",say:"Two batteries, still sealed in the packet!"},
];
const bzCars=()=>C2.beyond.cars;
function bzInts(){const R=rooms.beyond;if(R.ints.length)return;bzCars().forEach((c,i)=>R.ints.push({id:"tn_car"+i,ci:i,x:Math.round(c.x+c.w/2),r:0,label:"SEARCH"}));}
bzInts();
function bzHas(){return{radio:got.has("radio"),batts:got.has("batts")};}
function bzEnter(){bzInts();ch2=null;if(!TS.bz.lost&&!TC){player.x=rooms.beyond.W-14;player.y=92;player.face=-1;TC={k:"lost",t:0};tnLockInput();tnBars(1);}c2Save("beyond");}
/* ---- drawing in the world ---- */
function bzDraw(){const B=TS.bz;
  bzCars().forEach((c,i)=>{const done=B.s[i],dx=c.f>0?c.x+4:c.x+c.w-14,dy=C2_FLOOR-Math.round(c.h*0.58)+2;
    if(done){fill("#0c0a08",dx,dy,10,7);fill("#3a3028",dx,dy,10,1);fill("rgba(0,0,0,.35)",dx-1,dy+7,12,2);}
    else if(B.lost&&!TC){const k=(tick+i*37)%120;if(k<18){const a=Math.sin(k/18*Math.PI);ctx.globalAlpha=a;fill("#fff6d0",dx+4,dy-1,1,5);fill("#fff6d0",dx+2,dy+1,5,1);ctx.globalAlpha=1;glow(dx+4.5,dy+1.5,8,"255,240,190",0.35*a);}}});
  /* the tunnel the player came out of, with a hint of something big moving in the dark */
  const W=rooms.beyond.W;if(camX>W-260){const e=0.5+0.5*Math.sin(tick/40);fill("rgba(0,0,0,.25)",W-40,40,40,52);if(B.lost&&(tick%400)<40){fill("#ff3a2a",W-22,58,1,1);fill("#ff3a2a",W-19,58,1,1);glow(W-20,58,6,"255,40,30",0.3*e);}}
  const T=TC;if(T&&T.bang){const bx=Math.round(player.x)-3,by=player.y-44+Math.round(Math.sin(tick/5));fill("#0a0c14",bx-1,by-1,8,11);fill("#fffbe8",bx,by,6,9);fill("#0a0c14",bx+2,by+9,2,2);fill(T.bang===2?"#3a8ae8":"#e83a3a",bx+2,by+1.5,2,4.5);fill(T.bang===2?"#3a8ae8":"#e83a3a",bx+2,by+6.5,2,1.5);}}
function bzBackdrop(){const cv=c2Backdrop("beyond"),g=cv.getContext("2d"),W2=cv.width,tn=c2TC.tn||(c2TC.tn=Ae((t)=>c2Tunnel(t)));g.save();g.translate(W2,0);g.scale(-1,1);g.drawImage(tn,0,0);g.restore();return cv;}
/* ---- update ---- */
function bzUpdate(){const B=TS.bz;rooms.beyond.ints.forEach((it)=>{it.r=B.lost&&!B.s[it.ci]?Math.round(bzCars()[it.ci].w/2)+6:0;});
  const h=bzHas();if(B.lost&&h.radio&&h.batts&&!B.call&&!modal){if(++B.wait>50){B.wait=0;TC={k:"sit",t:0};tnLockInput();tnBars(1);}}else B.wait=0;}
function bzSearch(i){if(TS.bz.s[i])return;const c=bzCars()[i];TC={k:"search",t:0,ci:i,tx:c.f>0?c.x+8:c.x+c.w-8};tnLockInput();}
/* ---- cutscenes (return true when handled) ---- */
function bzCut(c){const W=rooms.beyond.W,B=TS.bz;
  if(c.k==="lost"){
    if(c.t<=70){tnWalkTo(W-60);player.y=92;}
    if(c.t===8)tnCap("Daylight… I made it out.");
    if(c.t===72){player.walk=0;player.face=1;$sx("spiderscreech");shake=6;tnCap("It's still in there. Too big to squeeze any further… for now.");}
    if(c.t===210){player.face=-1;tnCap("");}
    if(c.t===230){c.bang=1;$sx("blip");tnCap("Wait. The map… where's the map?!");}
    c.hold=c.t>=270&&c.t<330;c.hold&&(ue=6);c.t===275&&$sx("scratch");c.t===305&&$sx("scratch");
    if(c.t===300)c.bang=0;
    if(c.t===340){inv=inv.filter((t)=>t!=="paper");updateBag();B.lost=1;tnCap("Gone. I must have dropped it running from that thing.");}
    if(c.t===470){player.face=1;tnCap("And I am NOT going back in there.");}
    if(c.t===590){player.face=-1;tnCap("These cars… maybe somebody had a map. Let's look around.");}
    if(c.t>=720){tnCap("");TC=null;tnBars(0);c2Save("beyond");updateGuide();toast("<b>NEW GOAL</b><br>The map is lost. Search the wrecked cars for anything useful.",3800);}
    return!0;}
  if(c.k==="search"){const L=BZ_LOOT[c.ci],car=bzCars()[c.ci];
    if(!c.at){tnWalkTo(c.tx);player.y=92;if(Math.abs(player.x-c.tx)<0.6||c.t>90){c.at=c.t;player.walk=0;player.face=c.tx<car.x+car.w/2?1:-1;}return!0;}
    const k=c.t-c.at;c.hold=k<56;c.hold&&(ue=6);
    if(k===4){$sx("creak");shake=2;}if(k===18||k===38)$sx("scratch");if(k===28)$sx("crate");
    if(k%8===0&&k<56)parts.push({x:player.x+6*player.face,y:86,vx:(Math.random()-0.5)*1.2,vy:-Math.random()*1.2,g:0.08,life:22,c:k%16?"#9a948a":"#c8c0a8",s:1});
    if(k===60){B.s[c.ci]=1;c.hold=!1;ue=0;tnCap(L.say);
      if(L.k==="radio"||L.k==="batts"){TC=null;tnBars(0);tnGive(L.k,player.x,player.y-10);setTimeout(()=>tnCap(""),3200);const h=bzHas();h.radio&&h.batts||setTimeout(()=>toast(L.k==="radio"?"<b>A RADIO.</b><br>It needs batteries. Keep searching the cars.":"<b>BATTERIES.</b><br>Now find something to put them in.",3200),400);return!0;}
      $sx(L.k==="atlas"?"card":"blip");L.toast&&toast(L.toast,3200);c2Save("beyond");updateGuide();}
    if(k>=150){tnCap("");TC=null;}
    return!0;}
  if(c.k==="sit"){player.walk=0;
    if(c.t===2){c.bang=2;$sx("blip");tnCap("A radio AND batteries… The contacts are ruined, but I can wire the cells straight to it.");}
    if(c.t===60)c.bang=0;c.hold=c.t>70;c.hold&&(ue=6);
    if(c.t===140){tnCap("");c.wait=1;c3WireOpen(()=>bzRadio(()=>{TC={k:"after",t:0};}));}
    return!0;}
  if(c.k==="after"){player.walk=0;c.hold=c.t<40;c.hold&&(ue=6);
    if(c.t===50){player.face=-1;tnCap("…Then nobody is coming. It's just me.");}
    if(c.t===230)tnCap("No map… but that broadcast told me the way. West: down the road, through the forest, up to the Ridge Tower.");
    if(c.t===420){tnCap("");B.call=1;c2Save("beyond");updateGuide();fadeTo=1;onFaded=()=>{TC=null;tnBars(0);tnCap("");enterRoom("wroad","R");};}
    return!0;}
  return!1;}
function bzSkip(c){if(c.k==="lost"){if(c.t<720){player.x=W_(c);c.t=719;}return!0;}if(c.k==="search"){if(c.at&&c.t-c.at<60)c.t=c.at+59;return!0;}if(c.k==="sit"){if(c.t<139)c.t=139;return!0;}if(c.k==="after"){if(c.t<419)c.t=419;return!0;}return!1;}
const W_=(c)=>{const W=rooms.beyond.W;player.walk=0;player.face=-1;ue=0;c.bang=0;inv=inv.filter((t)=>t!=="paper");updateBag();TS.bz.lost=1;return W-60;};
/* ---- guide + arrow ---- */
function bzGuide(){const B=TS.bz,h=bzHas();if(!B.lost)return"<b>You made it out.</b>";if(B.call)return"<b>No one is coming.</b><br>Head LEFT, down the road west, to find the Ridge Tower yourself.";
  if(h.radio&&h.batts)return"<b>Try the radio.</b>";if(h.radio)return"<b>The radio needs batteries.</b><br>Search the other cars.";if(h.batts)return"<b>Four batteries.</b><br>Keep searching: there must be something to use them in.";
  return"<b>Your map is gone.</b><br>Search the wrecked cars (a glint shows the ones you haven't checked).";}
function bzArrow(){const B=TS.bz;if(!B.lost)return null;if(B.call)return 4;let best=null,bw=0;bzCars().forEach((c,i)=>{if(B.s[i])return;const x=c.x+c.w/2;(best===null||Math.abs(x-player.x)<Math.abs(best-player.x))&&(best=x,bw=c.w);});return best!==null&&Math.abs(best-player.x)<bw/2+8?null:best;}

/* ---- the radio close-up (first person, like the paper and the trunk) ---- */
let BZR=null;
function bzSpeak(t){try{if(!(window.SFX&&SFX._ready&&SFX._ready())||!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.rate=0.86;u.pitch=0.55;u.volume=0.75;speechSynthesis.speak(u);}catch(e){}}
function bzHush(){try{window.speechSynthesis&&speechSynthesis.cancel();}catch(e){}}
const BZ_SCRIPT=[
  [190,"you","Hello? Hello! Is anyone out there?"],
  [400,"you","Please, I need help! There are monsters out here… a giant spider. I'm by the tunnel off the highway."],
  [720,"radio","…kssh… I'm so sorry. No help or contact is available."],
  [960,"radio","…No help or contact is available."],
  [1140,"you","What? …Hello?! HELLO?!"],
  [1340,"you","…No one is coming."],
];
function bzRadio(done){let el=qs("#bzRadio");
  if(!el){el=document.createElement("div");el.id="bzRadio";el.className="gov";el.hidden=!0;
    el.innerHTML='<div class="gcard bzcard"><canvas id="bzCv" width="384" height="216" aria-label="Close-up of a handheld emergency radio"></canvas><div id="bzLine" aria-live="polite"><span id="bzWho"></span><span id="bzTxt"></span></div><div class="btns"><button class="gbtn alt" id="bzSkip">SKIP</button><button class="gbtn" id="bzOk" hidden>PUT IT DOWN</button></div></div>';
    qs("#gm").appendChild(el);
    const st=document.createElement("style");st.textContent="#bzRadio{z-index:40}#bzRadio .bzcard{width:min(760px,100%);max-height:calc(100vh - 16px);overflow:auto;text-align:center}#bzRadio h3{margin:0 0 4px}#bzCv{width:100%;max-height:calc(100vh - 230px);object-fit:contain;image-rendering:pixelated;background:#08070a;border:2px solid #2a3040;display:block;margin:6px auto}#bzLine{min-height:44px;text-align:left;font-size:9px;line-height:1.8;padding:6px 8px;background:#05070ce6;border:2px solid #2a3a5a;margin:6px 0}#bzWho{display:inline-block;margin-right:8px;padding:1px 5px;font-size:7px}#bzLine.you #bzWho{background:#3a6ad8;color:#fff}#bzLine.radio #bzWho{background:#d8a03a;color:#120a00}#bzLine.radio #bzTxt{color:#ffd88a}@media (max-height:500px){#bzRadio h3{display:none}#bzCv{max-height:48vh}#bzLine{font-size:8px;min-height:36px}}";document.head.appendChild(st);}
  modal=4;el.hidden=!1;const cv=qs("#bzCv"),g=cv.getContext("2d");g.imageSmoothingEnabled=!1;
  BZR={f:0,done,line:-1,typed:0,stat:0,end:0,raf:0,last:performance.now(),acc:0,freq:88.1,wired:!!(TS.c3&&TS.c3.wired)};
  const ok=qs("#bzOk"),sk=qs("#bzSkip");ok.hidden=!0;sk.hidden=!1;
  const close=()=>{if(!BZR)return;cancelAnimationFrame(BZR.raf);bzHush();const d=BZR.done;BZR=null;el.hidden=!0;modal=0;d&&d();};
  ok.onclick=close;sk.onclick=()=>{if(!BZR)return;bzHush();BZR.f=1500;BZR.line=BZ_SCRIPT.length-1;BZR.typed=999;bzShow();};el.__close=close;
  const loop=(now)=>{if(!BZR)return;BZR.raf=requestAnimationFrame(loop);const dt=Math.min(100,now-BZR.last);BZR.last=now;if(window.__evoPaused)return;BZR.acc+=dt;
    while(BZR.acc>=1000/60){BZR.acc-=1000/60;bzStep();}bzPaint(g);};
  bzShow();BZR.raf=requestAnimationFrame(loop);sk.focus();}
window.__bzEsc=()=>{const el=qs("#bzRadio");if(!el||el.hidden)return!1;if(BZR&&BZR.end)el.__close();else qs("#bzSkip").click();return!0;};
function bzShow(){const R=BZR,L=qs("#bzLine");if(R.line<0){L.className="";qs("#bzWho").textContent="";qs("#bzTxt").textContent="";return;}const s=BZ_SCRIPT[R.line];L.className=s[1];qs("#bzWho").textContent=s[1]==="you"?"YOU":"RADIO";qs("#bzTxt").textContent=s[2].slice(0,Math.floor(R.typed));
  if(R.f>=1500&&!R.end){R.end=1;qs("#bzOk").hidden=!1;qs("#bzSkip").hidden=!0;qs("#bzOk").focus();}}
function bzStep(){const R=BZR;R.f++;const f=R.f;
  f===40&&$sx("click");f===70&&$sx("click");f===100&&$sx("clank");
  if(f===130){$sx("beep");R.stat=1;}
  if(R.stat===1&&f%46===0)$sx("radio");if(R.stat===1&&f<680&&f%60===30){$sx("tune");R.freq=Math.round((87.5+Math.random()*20.5)*10)/10;}
  if(f===680){R.stat=2;$sx("beep");setTimeout(()=>$sx("beep"),160);R.freq=9;}
  if(f===1300){R.stat=3;$sx("radio");}
  if(f===1320){R.stat=0;$sx("stop");}
  for(let i=BZ_SCRIPT.length-1;i>=0;i--)if(f>=BZ_SCRIPT[i][0]){if(R.line!==i){R.line=i;R.typed=0;BZ_SCRIPT[i][1]==="radio"&&bzSpeak(BZ_SCRIPT[i][2].replace(/…kssh…/g,""));}break;}
  if(R.line>=0){const s=BZ_SCRIPT[R.line][2];R.typed<s.length&&(R.typed+=BZ_SCRIPT[R.line][1]==="radio"?0.55:0.9,R.typed%3<0.9&&BZ_SCRIPT[R.line][1]==="radio"&&$sx("blip"));}
  f>=1500&&!R.end&&(R.f=1500);bzShow();}
function bzPaint(g){const R=BZR,f=R.f,F=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h);};
  /* dusk behind, blurred road */
  const gr=g.createLinearGradient(0,0,0,216);gr.addColorStop(0,"#2a1410");gr.addColorStop(0.55,"#8a3a18");gr.addColorStop(1,"#1a100c");g.fillStyle=gr;g.fillRect(0,0,384,216);
  for(let i=0;i<9;i++)F("rgba(20,12,10,.55)",i*46-10,120+(i%3)*6,40,96);F("rgba(10,8,8,.6)",0,170,384,46);
  const sh=R.stat===3?((Math.random()-0.5)*3):0,cx=192+sh,top=34;
  /* antenna */
  g.strokeStyle="#1a1c1e";g.lineWidth=4;g.beginPath();g.moveTo(cx-38,top+6);g.lineTo(cx-60,top-30);g.stroke();g.strokeStyle="#4a4e52";g.lineWidth=1;g.beginPath();g.moveTo(cx-38,top+5);g.lineTo(cx-60,top-31);g.stroke();F("#2a2c2e",cx-63,top-34,5,5);
  /* body */
  F("#0a0b0c",cx-62,top-1,124,152);F("#3a4232",cx-60,top,120,150);F("#4c5642",cx-60,top,120,3);F("#2a3024",cx-60,top+146,120,4);F("#323a2c",cx-60,top,4,150);F("#323a2c",cx+56,top,4,150);
  for(let k=0;k<7;k++)F("rgba(120,70,30,.5)",cx-54+((k*37)%104),top+8+((k*23)%130),2,2);
  /* speaker grille */
  F("#22261e",cx-46,top+10,92,46);for(let y=0;y<5;y++)for(let x=0;x<11;x++)F("#0e100c",cx-42+x*8,top+14+y*8,4,4);
  /* LCD */
  const lit=R.stat>0||!!R.lcd;F("#141810",cx-46,top+62,92,26);F(lit?(R.stat===2?"#b8a050":"#8aa868"):"#2a3226",cx-44,top+64,88,22);
  g.font='8px "Press Start 2P",monospace';g.textBaseline="top";g.fillStyle=lit?"#1a2410":"#242c20";
  const txt=R.lcd?R.lcd:R.stat===0?(f>1320?"NO SIGNAL":""):R.stat===2?"CH 9  EMRG":R.stat===3?"- - - - -":(R.freq.toFixed(1)+" FM");g.fillText(txt,cx-40,top+71);
  if(R.stat===1){for(let k=0;k<5;k++){const hh=2+Math.floor(Math.random()*(3+k*2));F("#1a2410",cx+22+k*4,top+84-hh,3,hh);}}
  /* LED + knobs */
  const led=R.stat===2?(Math.floor(f/14)%2?"#ffb020":"#6a4008"):R.stat?"#40ff60":"#1a2a1a";F(led,cx+38,top+94,6,6);R.stat&&(g.globalAlpha=0.35,F(led,cx+35,top+91,12,12),g.globalAlpha=1);
  const ang=R.stat===1?f/9:R.stat?2.4:-0.6;[[cx-30,top+108],[cx,top+108]].forEach(([x,y],i)=>{F("#0a0b0c",x-10,y-10,20,20);F("#22261e",x-9,y-9,18,18);F("#4a5040",x-9,y-9,18,2);const a=ang+i*1.3;g.strokeStyle="#c8c8b0";g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(a)*7,y+Math.sin(a)*7);g.stroke();});
  F("#8a2a1a",cx+30,top+104,16,10);F("#c84a2a",cx+30,top+104,16,2);g.font='5px "Press Start 2P",monospace';g.fillStyle="#d8d8c0";g.fillText("PTT",cx+31,top+116);
  /* battery door + batteries going in */
  const open=f<100&&!R.wired;F("#141810",cx-50,top+126,100,20);
  if(open){F("#0a0a08",cx-48,top+128,96,16);[[0,40],[1,70]].forEach(([i,t0])=>{const k=Math.max(0,Math.min(1,(f-(t0-30))/30)),bx=cx-44+i*46,by=top+130+(1-k)*70;F("#1a1a1a",bx,by,40,12);F(i?"#c88a2a":"#2a6ad8",bx+1,by+1,30,10);F("#e8e8e0",bx+31,by+1,8,10);F("#b8b8b0",bx+39,by+3,1,6);F("rgba(255,255,255,.25)",bx+1,by+2,30,2);g.fillStyle="#fff";g.font='5px "Press Start 2P",monospace';g.fillText("1.5V",bx+6,by+4);});}
  else{F("#2a3024",cx-48,top+128,96,16);F("#3a4232",cx-48,top+128,96,2);F("#1a1e16",cx-6,top+134,12,4);R.wired&&c3PackArt(g,cx,top);}
  /* hands */
  const hand=(m)=>{const ex=m>0?cx-60:cx+60,y0=top+78;
    /* sleeve + wrist coming from the bottom corner */
    g.fillStyle="#2a3a6a";g.beginPath();g.moveTo(ex-m*44,216);g.lineTo(ex-m*8,y0+50);g.lineTo(ex-m*30,y0+40);g.lineTo(ex-m*70,216);g.fill();
    F("#1e2a50",Math.min(ex-m*44,ex-m*70),212,26,4);
    /* palm behind the radio edge */
    g.fillStyle="#2a1a10";g.beginPath();g.ellipse(ex-m*12,y0+28,16,24,0,0,7);g.fill();g.fillStyle="#c28a64";g.beginPath();g.ellipse(ex-m*12,y0+28,15,23,0,0,7);g.fill();
    g.fillStyle="#a8704a";g.beginPath();g.ellipse(ex-m*16,y0+34,8,14,0,0,7);g.fill();
    /* four fingers wrapping round onto the front */
    for(let k=0;k<4;k++){const fy=y0+6+k*11,fl=13-Math.abs(k-1.5)*2,fx=m>0?ex-4:ex+4-fl;F("#2a1a10",fx-1,fy-1,fl+2,10);F("#d29a72",fx,fy,fl,8);F("#e8b48a",fx,fy,fl,2);F("#a8704a",fx,fy+7,fl,1);F("#f0d0b8",m>0?fx+fl-3:fx,fy+2,3,3);F("#b07a54",m>0?fx+4:fx+fl-5,fy+1,1,6);}
    /* thumb over the top edge */
    F("#2a1a10",m>0?ex-6:ex-8,y0-9,14,12);F("#d29a72",m>0?ex-5:ex-7,y0-8,12,10);F("#e8b48a",m>0?ex-5:ex-7,y0-8,12,2);F("#f0d0b8",m>0?ex+3:ex-7,y0-6,3,4);};
  hand(1);hand(-1);
  /* static snow while searching */
  if(R.stat===1||R.stat===3){g.globalAlpha=R.stat===3?0.22:0.07;for(let k=0;k<160;k++)F(Math.random()<0.5?"#fff":"#000",Math.random()*384,Math.random()*216,1,1);g.globalAlpha=1;}
  /* vignette */
  const vg=g.createRadialGradient(192,108,60,192,108,240);vg.addColorStop(0,"rgba(0,0,0,0)");vg.addColorStop(1,"rgba(0,0,0,.7)");g.fillStyle=vg;g.fillRect(0,0,384,216);}
/* ======================= END BEYOND THE TUNNEL ======================= */

/* ======================= CHAPTER 2 CONTINUES: back for the blaster, over the rubble, the last shot, the chase ======================= */
const TNX_W=640,TNX_BAR=402,TNX_BW=32,TNX_BLOCKS=[{x:332,y:80,w:22,h:12},{x:246,y:78,w:26,h:14},{x:150,y:80,w:22,h:12},{x:66,y:82,w:20,h:10}];
const TN_RUB=[{x:52,y:78,w:26},{x:28,y:62,w:24},{x:4,y:46,w:28}];
rooms.tunnel_exit={name:"THE TUNNEL - FAR SIDE",L:null,R:null,W:TNX_W,crates:[],items:[],plats:TNX_BLOCKS.map((b)=>({x:b.x,y:b.y,w:b.w})),ints:[{id:"tn_bar",x:TNX_BAR+TNX_BW+8,r:14,label:"BARRICADE"}]};
rooms.sewer.ints.push({id:"tn_ladder",x:30,r:0,label:"CLIMB UP"});
rooms.tunnel.ints.push({id:"tn_blaster",x:TN_MH+21,r:0,label:"TAKE BLASTER"});
Object.assign(Ne,{tunnel_exit:Ne.tunnel});Object.assign(De,{tunnel_exit:De.tunnel});
let tnSp=null,tnSpWait=0,tnBarEr=0,tnRefill=0,tnHeard=0;
window.__tnChase=()=>!!(tnSp&&room==="tunnel_exit");
function tnRubble(){if(!TS.gun2)return;const P=rooms.tunnel.plats;TN_RUB.forEach((q)=>{P.some((p)=>p.x===q.x&&p.y===q.y)||P.push(Object.assign({rub:1},q));});}

/* the far side reuses the tunnel painter, mirrored (daylight on the left, the collapse on the right), with its own graffiti */
function tnGrafExit(t,ox){
  tnPiece(t,ox,980,70,tnMask("RUN",16,{seed:31,mess:0.9}),{c1:[255,255,255],c2:[220,220,230],ring:[230,40,40],out:[30,6,6],seed:91,drip:0.3,dl:18,spill:5});
  tnPiece(t,ox,690,76,tnMask("IT FOLLOWS",16,{seed:33,mess:0.8,squeeze:2}),{c1:[255,90,80],c2:[180,20,20],out:[30,6,6],seed:92,drip:0.28,dl:16});
  tnPiece(t,ox,320,70,tnMask("TOWER",16,{seed:35,mess:0.6}),{c1:[255,232,90],c2:[255,140,40],ring:[200,40,30],out:[34,14,10],seed:93});
  tnPiece(t,ox,340,98,tnMask("<<<",16,{seed:37,mess:0.7}),{c1:[255,232,90],c2:[255,140,40],out:[34,14,10],seed:94,drip:0.22});
  tnPiece(t,ox,560,128,tnMask("500 KM",8,{seed:39,mess:1}),{c1:[150,255,140],c2:[40,170,80],out:[10,30,14],seed:95,dl:8});
  tnScribble(t,ox,860,140,7,[20,20,24],60);tnScribble(t,ox,460,150,9,[30,40,90],45);}
function tnExitBase(t,ox){tnPW=2*TNX_W;tnNoGraf=1;try{tnPaintTunnel(t,ox);}finally{tnPW=0;tnNoGraf=0;}}
function tnExitBackdrop(){const W2=2*TNX_W,base=tnTiles("tunnelXb",W2,tnExitBase),cv=document.createElement("canvas");cv.width=W2;cv.height=216;const g=cv.getContext("2d");
  g.save();g.translate(W2,0);g.scale(-1,1);g.drawImage(base,0,0);g.restore();for(let ox=0;ox<W2;ox+=384)g.drawImage(tnTile("tunnelXg",ox,tnGrafExit),ox,0);return cv;}

function tnBarricade(){const x=TNX_BAR,w=TNX_BW,top=44,k=TS.ex.bar?Math.min(1,tnBarEr/90):0;
  if(k>=1){fill("#2a1a3a",x-4,90,w+8,2);fill("#6a3ae0",x,90,w,1);for(let i=0;i<5;i++)fill("#3a3e44",x+3+i*6,86+(i%2)*2,3,6-(i%2)*2);return;}
  const t2=top+k*46;ctx.save();ctx.beginPath();ctx.rect(x-6,t2,w+12,93-t2);ctx.clip();
  for(let i=0;i<4;i++){fill("#6a5a3a",x-4+i*10,84,10,8);fill("#8a7a52",x-4+i*10,84,10,1);fill("#3a3020",x-4+i*10,91,10,1);}
  for(let i=0;i<3;i++){fill("#6a5a3a",x+1+i*10,77,10,7);fill("#8a7a52",x+1+i*10,77,10,1);}
  fill("#1a1e22",x-1,top-1,w+2,36);fill("#5a646e",x+1,top+1,w/2-2,32);fill("#4a545e",x+w/2,top+1,w/2-1,32);fill("#7a8692",x+1,top+1,w/2-2,1);
  for(let yy=top+4;yy<top+33;yy+=7){fill("#9aa4ae",x+3,yy,1,1);fill("#9aa4ae",x+w-4,yy,1,1);}
  for(let i=0;i<6;i++)fill("rgba(124,68,32,.75)",x+2+((i*11)%(w-4)),top+3+((i*7)%26),2+(i%2),3);
  ctx.strokeStyle="#7a5432";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x-3,top+4);ctx.lineTo(x+w+3,top+30);ctx.moveTo(x+w+3,top+6);ctx.lineTo(x-3,top+28);ctx.stroke();
  ctx.strokeStyle="#9a7046";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x-3,top+3);ctx.lineTo(x+w+3,top+29);ctx.stroke();
  fill("#d8c84a",x+6,top+12,w-12,7);fill("#1a1a1a",x+8,top+14,w-16,1);fill("#1a1a1a",x+8,top+16,(w-16)*0.6,1);
  for(let xx=x-4;xx<x+w+4;xx+=2)fill("#9aa0a6",xx,top-3+Math.round(Math.sin(xx)*1.2),1,1);for(let xx=x-2;xx<x+w+2;xx+=5)fill("#c0c6cc",xx,top-4,1,3);
  for(let i=0;i<3;i++){const vx=x+4+i*11;for(let yy=0;yy<14+i*4;yy++)fill(yy%3?"#2a6a30":"#4a9a3a",vx+Math.sin(yy*0.7+i),top+yy,1,1);}
  ctx.restore();
  if(k>0){glow(x+w/2,t2,22,"180,110,255",0.5);for(let i=0;i<10;i++){const px=x-2+((i*13+tick)%(w+4)),ph=(tick+i*7)%20;fill(i%2?"#d8a0ff":"#8a3ae0",px,t2-ph*0.3,1+(i%2),1+(i%2));}}}
function tnExDraw(){const f=r(((tick/9)|0),77)<0.07?0.05:0.22;for(let lx=TNX_W-40;lx>80;lx-=64)glow(lx,15,26,"255,236,190",((lx/64)|0)%3?0.18:f);glow(40,70,60,"255,210,150",0.24);
  TNX_BLOCKS.forEach((b,i)=>{fill("#141414",b.x-1,b.y-1,b.w+2,b.h+1);fill("#5a5650",b.x,b.y,b.w,b.h);fill("#8a857a",b.x,b.y,b.w,1);for(let k=0;k<b.w;k+=4)fill(k%8?"#46423c":"#6e695f",b.x+k,b.y+2+((k*7+i*3)%5),3,2);fill("rgba(0,0,0,.35)",b.x,b.y+b.h-2,b.w,2);});
  tnBarricade();tnSp&&c2Spider(tnSp);}
function tnLeftGun(){if(!TS.left||TC&&TC.k==="enter")return;const x=TN_MH+16,y=89,a=0.35+0.25*Math.sin(tick/10);glow(x+5,y,14,"120,255,140",a);
  fill("rgba(0,0,0,.4)",x-1,y+2,13,1);fill("#1a2a20",x,y-2,12,4);fill("#3a5a44",x+1,y-2,9,2);fill("#6aff7a",x+3,y-1,4,1);fill("#2a3a30",x+9,y-1,4,2);fill("#14201a",x+2,y+1,3,2);fill("#9affb0",x+4,y-2,1,1);}
function tnRubbleDraw(){if(!TS.gun2)return;const R=TN_RUB;
  for(let i=R.length-1;i>=0;i--){const q=R[i],bot=i?R[i-1].y+2:92;
    ctx.fillStyle="#2c2a27";ctx.beginPath();ctx.moveTo(q.x-2,q.y+2);ctx.lineTo(q.x+q.w+3,q.y+2);ctx.lineTo(q.x+q.w+7,92);ctx.lineTo(q.x-4,92);ctx.closePath();ctx.fill();
    for(let k=0;k<14;k++){const rx=q.x-2+r(k,i*7+1)*(q.w+6),ry=q.y+4+r(k,i*7+2)*(92-q.y-6),s=2+((r(k,i*7+3)*4)|0);fill(k%3?"#4a4640":"#5e5a52",rx,ry,s+1,s);fill("#77726a",rx,ry,s,1);}
    if(i<2)for(let k=0;k<2;k++){const rx=q.x+4+k*(q.w-10);ctx.strokeStyle="#6a3a22";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(rx,q.y+3);ctx.lineTo(rx+3-k*6,q.y-5);ctx.stroke();}
    fill("#141414",q.x-1,q.y-1,q.w+2,5);fill("#6e695f",q.x,q.y,q.w,3);fill("#a8a294",q.x,q.y,q.w,1);for(let k=2;k<q.w;k+=5)fill("#55514a",q.x+k,q.y+1,2,1);fill("rgba(0,0,0,.35)",q.x,q.y+3,q.w,1);}
  if(!TC&&player.x<110){const a=0.5+0.5*Math.sin(tick/9);ctx.globalAlpha=a;fill("#ffe070",14,30,1,6);fill("#ffe070",12,32,5,1);fill("#ffe070",13,31,3,1);ctx.globalAlpha=1;}}

function tnExUpdate(){const S=TS.ex;
  if(!S.bar){for(const s of shots){if(s.x>TNX_BAR-2&&s.x<TNX_BAR+TNX_BW+4&&s.y>40&&s.y<93){s.life=0;s.x=-999;S.bar=1;tnBarEr=0;$sx("sizzle");$sx("crash");shake=10;sparks(TNX_BAR+TNX_BW/2,70,24,["#d8a0ff","#8a3ae0","#ffffff"],2.2,0.1,30);toast("<b>DIRECT HIT!</b> The venom eats into the steel…",2400);c2Save("tunnel_exit");updateGuide();break;}}
    if(!S.bar&&hasGun&&ammo<=0&&!shots.length){if(++tnRefill>150){tnRefill=0;ammo=1;updateHud();$sx("pickup");toast("A last drop of venom gathers in the canister. Make it count!",2600);}}else tnRefill=0;}
  else if(tnBarEr<90){tnBarEr++;tnBarEr%15===0&&$sx("sizzle");tnBarEr%3===0&&parts.push({x:TNX_BAR+Math.random()*TNX_BW,y:92-(1-tnBarEr/90)*46,vx:(Math.random()-0.5)*0.6,vy:-0.4-Math.random()*0.5,life:24,c:Math.random()<0.5?"#d8a0ff":"#8a3ae0",s:1});
    if(tnBarEr===90){$sx("slam");shake=8;smoke(TNX_BAR+TNX_BW/2,90,8,-1);toast("The barricade melts into a hissing puddle. The way out is open!",2400);tnHeard=1;tnSpWait=200;updateGuide();}}
  if(tnHeard&&!tnSp){--tnSpWait===110&&($sx("rumble"),$sx("growl"),(shake=12),toast("<i>…what was that?</i><br>Something is scraping through the rubble behind you.",2600));
    if(tnSpWait<=0){tnSp={x:TNX_W+C2_SP_HEAD+30,t:0,st:"chase"};S.chase=1;$sx("spiderscreech");$sx("crash");shake=20;smoke(TNX_W-10,80,12,-1);toast("<b>IT SQUEEZED THROUGH!</b><br>RUN! Jump the rubble and get out!",3000);updateGuide();}}
  if(tnSp&&!S.done){const sp=tnSp;sp.t++;const head=sp.x-C2_SP_HEAD,gap=head-player.x;sp.x-=gap>150?2.3:gap>60?1.7:gap>30?1.4:1.25;sp.t%13===0&&$sx("skitter");sp.t%26===0&&(shake=Math.max(shake,2));
    if(gap<4&&player.y>C2_FLOOR-60)c2Die("THE SPIDER GOT YOU","It squeezed through the rubble after you. Keep running LEFT and jump the rubble piles without stopping.");}
  if(S.bar&&tnBarEr>=90&&player.x<=10&&!S.done){S.done=1;tnLockInput();$sx("success");c2Save("tunnel_exit");fadeTo=1;onFaded=()=>{tnSp=null;enterRoom("beyond","R");};}}
function tnExEnter(){if(TS.ex.done){TS.ex.done=0;}tnSp=null;tnRefill=0;tnHeard=0;shots=[];const S=TS.ex;if(S.bar){tnBarEr=90;ammo=0;player.x=TNX_BAR-8;player.y=92;player.face=-1;if(!S.done){tnHeard=1;tnSpWait=111;}}else{tnBarEr=0;hasGun&&(ammo=Math.min(ammo,1));}updateHud();}
function tnStartUp(){TC={k:"up",t:0};tnLockInput();tnBars(1);}
/* ======================= END CHAPTER 2 CONTINUES ======================= */

/* ---------------- room logic ---------------- */
function tnEnter(t){c3Enter(t);tnSw=0;tnSewT=0;(t==="street"||t==="road"||t==="highway"||t==="tunnel")&&tnPrebuild();if(!tnIs(t)){tnCap("");tnBars(0);return;}tnInitUI();if(t==="sewer"&&!TC){player.x=24;player.y=86;player.face=1;}if(t==="tunnel"){tnRubble();TS.gun2&&!TS.ex.bar&&hasGun&&(ammo=Math.min(ammo,1));}if(t==="tunnel_exit"){tnExEnter();c2Save("tunnel_exit");}if(t==="beyond")bzEnter();}
function tnEnterTunnel(){won=0;enterRoom("tunnel","R");c2Save("tunnel");toast("<b>THE TUNNEL</b><br>The spider can't fit inside. Look around: people were here before you.",3600);}
function tnLock(){return!!TC||c3Lock();}
function tnPhys(){return!!TC;}
function tnWalls(x0){if(c4Walls(x0))return;if(room==="tunnel_exit"){for(const b of TNX_BLOCKS){if(player.y>b.y+0.5&&player.x>b.x-3&&player.x<b.x+b.w+3){if(x0<=b.x-3+0.01)player.x=b.x-3;else if(x0>=b.x+b.w+3-0.01)player.x=b.x+b.w+3;player.vx=0;}}if(!(TS.ex.bar&&tnBarEr>=90)&&player.x<TNX_BAR+TNX_BW+3){player.x=TNX_BAR+TNX_BW+3;player.vx=0;}return;}if(room!=="sewer")return;for(const p of rooms.sewer.plats){if(player.y>p.y+0.5&&player.x>p.x-3&&player.x<p.x+p.w+3){if(x0<=p.x-3+0.01)player.x=p.x-3;else if(x0>=p.x+p.w+3-0.01)player.x=p.x+p.w+3;player.vx=0;}}}
function tnIngLeft(){return TN_ING.filter((i)=>!got.has(i.id)).length;}
function tnGuide(){qs("#gg h4 span").textContent="QUEST";const n=TN_ING.filter((i)=>got.has(i.id)).length;let h;
  if(room==="beyond")h=bzGuide();
  else if(room==="tunnel_exit"){h=!TS.ex.bar?"<b>Another barricade!</b><br>Too solid to punch. Shoot it with your last venom shot (F / K or the shoot button).":tnSp?"<b>RUN!</b><br>Jump the rubble and get out of the tunnel (LEFT)!":"<b>The way out is open.</b><br>Keep going LEFT.";}
  else if(room==="tunnel"&&TS.back){h=TS.left?"<b>Your Venom Blaster!</b><br>Pick it up by the manhole.":"<b>CONTINUE</b><br>Climb over the rubble at the far LEFT end of the tunnel. There is a gap near the ceiling.";}
  else if(room==="tunnel"){h=TS.mh===2?"<b>The manhole is open!</b><br>Stand on it and press USE to climb down.":TS.mh===1?"<b>The rust is fizzing away…</b><br>Give it a moment.":TS.made?"<b>Pour the Rust Remover.</b><br>Stand on the manhole in the middle of the tunnel and press USE.":(TS.bp&&n>=3)?"<b>Make the Rust Eater.</b><br>You have all 3 ingredients. Use the broken table and drag them onto the blueprint.":!TS.tk.done?"<b>The tunnel is collapsed ahead.</b><br>Dig through the car's trunk: a blueprint, a part and the car key are buried under the junk ("+Object.keys(TS.tk.f).length+"/3).":(inv.includes("carkey")&&!TS.carOpen)?"<b>You found the car key!</b><br>Use it on the locked car.":"<b>Collect the ingredients.</b> "+n+"/3<br>Check the car (unlock it with the key) and the graffiti crew's spot.";}
  else h=TS.paper?"<b>Go back for your blaster.</b><br>Return to the ladder at the far LEFT and climb up.":"<b>Cross the sewer.</b><br>Stay on the concrete! Sewage costs ½ heart per second. Jump the gaps to the far side.";
  qs("#ggb").innerHTML=h;}
function tnGive(id,x,y){inv.push(id);got.add(id);$sx("pickup");updateBag();updateGuide();for(let t=0;t<10;t++)parts.push({x,y:y-5,vx:1.4*(r(t,5)-0.5),vy:1.6*-r(t,6),g:0.06,life:30,c:"#ffe070",s:1});addFx({k:"ring",x,y:y-6,r0:2,r1:16,c:"#ffe070",life:16});c2Save(room);ia(id);}
function tnUse(e){if(c3Use(e))return!0;if(!e.id||e.id.slice(0,3)!=="tn_")return!1;
  if(e.id==="tn_car"){if(TS.carOpen){toast("Nothing else useful inside the car.",1800);return!0;}
    if(!inv.includes("carkey")){TS.tried=1;$sx("locked");shake=2;toast("<b>LOCKED.</b> Through the grimy window you can see something in the cup holder. You need the car key.",3200);return!0;}
    TS.carOpen=1;$sx("clank");setTimeout(()=>$sx("creak"),160);shake=3;toast("The key turns with a grinding squeal. <b>CLUNK!</b> The door swings open.",2400);c2Save(room);updateGuide();setTimeout(()=>{got.has("cola")||tnGive("cola",300,80);},800);return!0;}
  if(e.id==="tn_graf"){const n=TN_ING.find((i)=>i.zone==="graffiti"&&!got.has(i.id));if(!n){toast("Just empty spray cans now. The crew took everything else.",2000);return!0;}TS.graf++;$sx("crate");tnGive(n.id,168,84);return!0;}
  if(e.id==="tn_trunk"){if(TS.tk.done){toast("Nothing left in the trunk but junk.",1800);return!0;}TS.trunk=1;$sx("creak");shake=2;fadeTo=1;onFaded=()=>{tnShowTrunk();};return!0;}
  if(e.id==="tn_table"){TS.bp?tnOpenBP():toast("A broken folding table. One leg has snapped off. There's nothing on it… yet.",2400);return!0;}
  if(e.id.slice(0,6)==="tn_car"&&room==="beyond"){bzSearch(e.ci);return!0;}
  if(e.id==="tn_ladder"){TS.paper&&tnStartUp();return!0;}
  if(e.id==="tn_bar"){$sx("clank");shake=2;toast(hasGun&&ammo>0?"Too solid to punch through. <b>Shoot it</b> with your last venom shot (F / K or the shoot button)!":"Too solid to punch through. You need the Venom Blaster.",2600);return!0;}
  if(e.id==="tn_blaster"){if(!TS.left)return!0;TS.left=0;TS.gun2=1;hasGun=!0;ammo=1;inv.includes("blaster")||inv.push("blaster");got.add("blaster");$sx("pickup");$sx("clank");updateBag();updateHud();tnRubble();c2Save("tunnel");updateGuide();toast("<b>VENOM BLASTER RECOVERED.</b><br>Only ONE shot of venom left in the canister. Make it count.",3400);setTimeout(()=>toast("<b>CONTINUE:</b> there is a gap at the top of the rubble. Climb over it (far LEFT).",3600),3700);return!0;}
  if(e.id==="tn_mh"){if(TS.mh===2)tnStartEnter();else if(TS.mh===1)toast("The rust remover is still working…",1400);
    else if(inv.includes("rustx")){TS.mh=1;TS.er=0;TS.pt=60;inv=inv.filter((t)=>"rustx"!==t);updateBag();$sx("pour");player.face=player.x<TN_MH?1:-1;toast("You pour the Makeshift Rust Remover around the rusted rim…",2400);updateGuide();}
    else toast("A heavy iron manhole cover, rusted solid to its frame. You can't lift it. You need something that eats rust.",2800);return!0;}
  if(e.id==="tn_paper"){TS.paper?tnShowPaper():tnStartPaper();return!0;}
  return!1;}
let fadeStuck=0,tnIdleT=0;
function tnCanWork(){return!!(modal||window.__evoPaused||fadeNow>0.3||tnIdleT>30||(typeof c2cut!=="undefined"&&c2cut));}
function tnUpdate(){c3Update();tnIdleT=(player.walk||!player.on||keys.l||keys.r||player.punch>0)?0:tnIdleT+1;if(fadeTo===1&&fadeNow>0.98&&!onFaded&&!won&&!dead&&!modal&&!cine&&!c2cut&&!TC){if(++fadeStuck>150){fadeTo=0;fadeStuck=0;}}else fadeStuck=0;
  if(TC&&(((TC.k==="paper"||TC.k==="down"||TC.k==="up")&&room!=="sewer")||((TC.k==="enter"||TC.k==="rise")&&room!=="tunnel"))){TC=null;tnBars(0);tnCap("");}
  doorCut&&(tnIs(room)||(typeof C2!=="undefined"&&C2[room]))&&(doorCut=0);
  if(!tnIs(room))return;if(TC)return void tnCut();if(modal||dead||won)return;
  if(room==="tunnel"){const I=rooms.tunnel.ints;I[0].label=TS.bp?"BLUEPRINT":"TABLE";I[2].label=TS.mh===2?"CLIMB DOWN":TS.mh===1?"WAIT":inv.includes("rustx")?"POUR":"MANHOLE";I[3].label=TS.carOpen?"CAR":inv.includes("carkey")?"UNLOCK":"LOCKED";I[4].label=TS.tk.done?"TRUNK":"DIG";
    if(TS.pt>0){TS.pt--;parts.push({x:player.x+6*player.face,y:player.y-20,vx:0.45*player.face,vy:0.4,g:0.12,life:34,c:TS.pt%2?"#ff9a3a":"#cfff9a",s:1});}
    if(TS.mh===1){TS.er++;TS.er%18===0&&$sx("sizzle");TS.er%4===0&&parts.push({x:TN_MH-12+24*Math.random(),y:95,vx:0.3*(Math.random()-0.5),vy:-0.3-0.5*Math.random(),life:30,c:Math.random()<0.5?"#cfff9a":"#ffb86a",s:1});
      if(TS.er>=240){TS.mh=2;shake=10;$sx("clank");$sx("slam");sparks(TN_MH,94,16,["#aab4c4","#6a7480","#b8642a"],1.8,0.12,24);smoke(TN_MH,94,6,1);c2Save("tunnel");updateGuide();toast("<b>CLUNK!</b> The rust lets go and the cover slides aside.<br>The way down is open.",3200);}}
    if(TS.mh===2&&tick%7===0)parts.push({x:TN_MH-6+12*Math.random(),y:94,vx:0.1*(Math.random()-0.5),vy:-0.35,life:40,c:"#8aff9a",s:1.5});
    if(++tnSpT%540===200){$sx("spiderscreech");shake=4;}
    {const I=rooms.tunnel.ints,B=I.find((i)=>i.id==="tn_blaster"),M=I.find((i)=>i.id==="tn_mh");B.r=TS.back&&TS.left?12:0;M.r=TS.back?0:14;}
    if(TS.gun2&&!TC&&player.x<=18&&player.y<=47&&player.on&&fadeTo===0){keys.l=keys.r=0;fadeTo=1;onFaded=()=>enterRoom("tunnel_exit","R");}
    if(player.x>rooms.tunnel.W-30&&keys.r&&!TS.warn){TS.warn=1;toast("<b>NO WAY BACK.</b><br>The spider is still waiting outside.",2400);}}
  else if(room==="tunnel_exit")tnExUpdate();
  else if(room==="beyond")bzUpdate();
  else{if(!TS.paper&&player.on&&player.y<=86.5&&player.x>=rooms.sewer.plats[5].x+6)return void tnStartPaper();const inS=player.on&&player.y>=floorY()-0.5;
    if(inS){if(!tnSw){tnSw=1;toast("<b>TOXIC SEWAGE!</b><br>It burns: ½ heart every second. Get back on the concrete!",2600);}
      ++tnSewT%9===0&&parts.push({x:player.x+4*(Math.random()-0.5),y:95,vx:0,vy:-0.3,life:20,c:"#9aba5a",s:1});
      if(tnSewT%60===0){hp=Math.max(0,hp-0.5);hurtFlash=10;$sx("hurt");sparks(player.x,player.y-10,6,["#9aba5a","#ff6a7a"],1.2,0.1,14);updateHud();hp<=0&&tnDie();}}
    else tnSewT=0;
    rooms.sewer.ints[0].r=TS.paper?0:14;rooms.sewer.ints.find((i)=>i.id==="tn_ladder").r=TS.paper?12:0;}}
function tnArrow(){if(modal||won||dead||TC)return;let tx=null;
  if(room==="beyond")tx=bzArrow();
  else if(room==="tunnel_exit")tx=TS.ex.bar?4:TNX_BAR+TNX_BW+20;
  else if(room==="tunnel"&&TS.back)tx=TS.left?TN_MH+21:TS.gun2?4:null;
  else if(room==="tunnel"){const grafL=!got.has("lemon");tx=TS.made||TS.mh?TN_MH:!TS.tk.done?338:(inv.includes("carkey")&&!TS.carOpen)?300:grafL?164:TS.bp?86:null;}
  else if(!TS.paper)tx=TN_PAPER;else tx=30;if(tx==null||Math.abs(tx-player.x)<24)return;const d=tx>player.x?1:-1;vo(player.x+d*16,player.y-40,d);}
function tnDie(){if(dead)return;hp=0;dead=!0;$sx("die");updateHud();qs("#gd").querySelector("h3").textContent="OVERCOME BY THE SEWAGE";
  qs("#gd").querySelector("p").textContent="Sewage is full of bacteria and gives off hydrogen sulfide, a toxic gas that smells of rotten eggs. Stay on the concrete and jump the gaps: you lose half a heart for every second you stand in it.";qs("#gd").hidden=!1;}
function tnRetry(){qs("#gd").hidden=!0;dead=!1;hp=5;invuln=60;player.kb=0;fadeNow=1;fadeTo=0;enterRoom(room==="tunnel"?"tunnel":room,"R");room==="sewer"&&(player.x=24,player.y=86);updateHud();updateGuide();}
function tnReplay(){const L=["cola","foil","lemon","rustx","paper","blueprint","radio","batts","axe","wood","bough","leaves","moss","rope","frame","bedding","pillow","bedkit","whet","axe2","vinea","vineb","vinec","poles","fern","pot","bottle","wbottle","ckey","pstrip","phook","pplate","pscrew","pnail","pcrow","ckeyc","gbelt","gwire","gfuse"];inv=inv.filter((t)=>!L.includes(t));L.forEach((t)=>got.delete(t));if(TS.left&&!inv.includes("blaster"))inv.push("blaster"),(hasGun=!0);TS=tnFresh();TC=null;tnBars(0);tnCap("");c2Start("street");}

/* ---------------- cutscenes ---------------- */
function tnLockInput(){keys.l=keys.r=keys.s=keys.u=0;jumpBuf=punchBuf=useBuf=shootBuf=0;}
function tnStartEnter(){TC={k:"enter",t:0};tnLockInput();tnBars(1);}
function tnStartPaper(){TC={k:"paper",t:0,cx:null};tnLockInput();tnBars(1);player.walk=0;player.vx=0;}
function tnCamX(){return TC&&TC.cx!=null?TC.cx:c3CamX();}
function tnWalkTo(tx){const d=tx-player.x;player.x+=Math.sign(d)*Math.min(1.1,Math.abs(d));player.walk=Math.abs(d)>0.5?1:0;player.walk&&(player.face=Math.sign(d),(player.fr+=0.16));player.vy=0;player.on=!0;}
function tnCut(){const c=TC;if(c.wait)return;c.t++;if(!c.hold&&ue>0)ue=0;if(bzCut(c))return;
  if(c.k==="enter"){if(c.t<=44){tnWalkTo(TN_MH-12);player.y=92;}
    if(c.t===46){player.walk=0;player.face=1;if(hasGun||inv.includes("blaster")){TS.left=1;hasGun=!1;inv=inv.filter((t)=>"blaster"!==t);updateBag();updateHud();$sx("clank");tnCap("The Venom Blaster is too bulky for the ladder. You set it down by the manhole.");}else tnCap("No turning back now.");}
    if(c.t===150)tnCap("Down into the dark…");
    if(c.t>150&&c.t<=232){player.x+=(TN_MH-player.x)*0.12;player.y=92+(c.t-150)*0.45;player.walk=0;}
    if(c.t===234){$sx("door");fadeTo=1;onFaded=()=>{enterRoom("sewer","L");player.x=33;player.y=30;player.face=1;TC={k:"down",t:0};};}}
  else if(c.k==="down"){player.x=33;player.walk=0;player.y=Math.min(86,30+c.t*0.8);player.on=player.y>=86;
    if(c.t===24)tnCap("Ugh… the smell. That water is raw sewage.");if(c.t===140)tnCap("Stay on the concrete. Find a way to the other side.");
    if(c.t>=250){TC=null;tnCap("");tnBars(0);c2Save("sewer");updateGuide();updateHud();}}
  else if(c.k==="paper"){const P=TN_PAPER;player.y=86;player.on=!0;player.vx=player.vy=0;
    if(c.t===1){player.walk=0;$sx("blip");c.bang=1;tnCap("…Wait. What's that over there?");}
    if(c.t===26)c.cx=P-110;
    if(c.t===100){c.bang=0;tnCap("A sheet of paper… all the way down here?");}
    if(c.t===160){c.cx=null;tnCap("");}
    if(c.t>=170&&!c.at){tnWalkTo(P-9);if(Math.abs(player.x-(P-9))<0.6){c.at=c.t;player.walk=0;player.face=1;}}
    if(c.at){const k=c.t-c.at;c.hold=k>=8&&k<36;c.hold&&(ue=6);
      if(k===24){TS.paper=1;got.add("paper");inv.includes("paper")||inv.push("paper");$sx("card");updateBag();sparks(P,84,10,["#f4ecd0","#ffe070"],1.2,0.08,20);c2Save("sewer");}
      if(k===40){tnCap("Someone dropped this… it's still damp.");}
      if(k===110&&!c.rd){tnCap("");c.wait=1;tnShowPaper(()=>{c.wait=0;c.rd=c.t;});}}
    if(c.rd){const k=c.t-c.rd;
      if(k===8){$sx("stinger");tnCap("Radio tower… 500 kilometres.");}
      if(k===140){tnCap("That's a long way on foot.");player.face=-1;c.cx=player.x-150;}
      if(k===250){tnCap("But someone made it this far before me.");player.face=1;c.cx=null;}
      if(k===380)tnCap("I can't walk 500 km unarmed. I need my blaster back.");if(k===520){tnCap("");TC=null;tnBars(0);c2Save("sewer");updateGuide();toast("<b>NEW GOAL</b><br>Head back to the ladder and climb up for your Venom Blaster.",3600);}}}
  else if(c.k==="up"){if(c.t<=40){tnWalkTo(33);player.y=86;player.on=!0;}
    if(c.t===42){player.walk=0;player.face=1;tnCap("Back up the ladder. I'm not leaving without my blaster.");}
    if(c.t>44&&c.t<=120){player.x=33;player.walk=0;player.climb={x:33};player.on=!1;player.y=86-(c.t-44)*0.75;}
    if(c.t===122){player.climb=null;tnCap("");$sx("door");fadeTo=1;onFaded=()=>{enterRoom("tunnel","R");player.x=TN_MH;player.y=118;player.face=1;TC={k:"rise",t:0};};}}
  else if(c.k==="rise"){player.x=TN_MH;player.walk=0;player.y=Math.max(92,118-c.t*0.45);player.on=player.y<=92;player.climb=player.y>92?{x:TN_MH}:null;
    if(c.t===75)tnCap("There it is. Right where I left it.");
    if(c.t>=190){player.climb=null;TC=null;tnCap("");tnBars(0);TS.back=1;TS.left||TS.gun2||(TS.left=1);c2Save("tunnel");updateGuide();}}}
function tnSkip(){const c=TC;if(!c||c.wait)return;if(bzSkip(c))return;if(c.k==="enter"&&c.t<233){c.t=150;tnCap("");if(!TS.left&&(hasGun||inv.includes("blaster"))){TS.left=1;hasGun=!1;inv=inv.filter((t)=>"blaster"!==t);updateBag();updateHud();}c.t=233;}else if(c.k==="down")c.t=249;else if(c.k==="up"){if(c.t<121){player.x=33;player.walk=0;c.t=121;}}else if(c.k==="rise"){if(c.t<189)c.t=189;}else if(c.k==="paper"){if(c.rd)c.rd=c.t-519;else if(!c.at){c.cx=null;c.bang=0;tnCap("");player.x=TN_PAPER-9;player.walk=0;player.face=1;c.at=c.t-23;}else if(c.t-c.at<110)c.at=c.t-109;}}
addEventListener("keydown",(e)=>{TC&&GM.on&&("Escape"===e.key||"Enter"===e.key)&&(tnSkip(),e.preventDefault());});

/* ---------------- the blueprint: drag (or tap) the ingredients onto it ---------------- */
const TN_SLOT={cola:"PHOSPHORIC ACID SOURCE",lemon:"CITRIC ACID SOURCE",foil:"ALUMINIUM SCRUBBER"};
function tnOpenBP(){const bp=qs("#tnBP");modal=4;bp.hidden=!1;tnRenderBP("<b>The blueprint.</b> Drag your ingredients onto it (or tap them). "+(TS.made?"You already made the remover.":""),"");}
function tnCloseBP(){const bp=qs("#tnBP");bp.hidden=!0;modal=0;evoAutosave();if(TS.made&&inv.includes("rustx")&&!TS.seenR){TS.seenR=1;ia("rustx");}}
function tnRenderBP(msg,cls){const bp=qs("#tnBP");
  const slots=TN_ING.map((i)=>{const on=TS.pl[i.id]||TS.made;return'<div class="tnslot'+(on?" on":"")+'">'+(on?'<img src="'+s(items[i.id].k,items[i.id].c)+'" alt="">':"")+'<span>'+TN_SLOT[i.id]+"</span>"+(on?"<span>"+Qt(items[i.id].n)+"</span>":"")+"</div>";}).join("");
  const svg='<svg viewBox="0 0 300 92" font-family="\'Press Start 2P\',monospace"><text x="8" y="14" font-size="9" fill="#fff">MAKESHIFT RUST EATER</text>'+
   '<g stroke="#e8f0ff" fill="none" stroke-width="1.5"><path d="M138 30h24v10l8 10v34h-40v-34l8-10z"/><path d="M134 62h32" stroke-dasharray="3 3"/></g>'+
   '<g stroke="#ffe070" stroke-width="1.2" fill="none"><path d="M40 70 Q90 70 128 62"/><path d="M150 88 V84"/><path d="M262 70 Q210 70 172 62"/></g>'+
   '<text x="186" y="30" font-size="6" fill="#cfe0ff">SHAKE GENTLY</text><text x="186" y="42" font-size="6" fill="#cfe0ff">POUR ON RUST</text><text x="186" y="54" font-size="6" fill="#cfe0ff">WAIT. FIZZ = OK</text>'+
   '<text x="8" y="34" font-size="6" fill="#cfe0ff">2 ACIDS + Al</text><text x="8" y="46" font-size="6" fill="#cfe0ff">NO TOOLS</text>'+
   '<g transform="translate(270 64)" stroke="#ff8a3a" fill="none" stroke-width="1.4"><path d="M0 0h14v6h-14z M4 6v14h6v-14"/></g></svg>';
  const tray=inv.filter((t)=>items[t]&&!["potion","blaster"].includes(t)).map((t)=>'<button data-id="'+t+'"><img src="'+s(items[t].k,items[t].c)+'" alt=""><span>'+Qt(items[t].n)+"</span></button>").join("")||'<span style="font-size:7px;color:#9ab0d0">Your bag is empty.</span>';
  bp.innerHTML='<div class="gcard"><h3>BLUEPRINT ON THE BROKEN TABLE</h3><div class="tnbp" id="tnBPd">'+svg+'<div class="tnslots">'+slots+'</div></div><div id="tnMsg" class="'+(cls||"")+'">'+Qt(msg||"")+'</div><p style="font-size:7px;color:#9ab0d0;margin:0 0 4px">YOUR BAG (drag onto the blueprint, or tap):</p><div id="tnTray">'+tray+'</div><div class="btns"><button class="gbtn" id="tnBPx">CLOSE</button></div></div>';
  qs("#tnBPx").onclick=tnCloseBP;
  bp.querySelectorAll("#tnTray button").forEach((b)=>{b.onpointerdown=(e)=>{e.preventDefault();const id=b.dataset.id,g=document.createElement("img");g.id="tnGhost";g.src=s(items[id].k,items[id].c);g.style.left=e.clientX+"px";g.style.top=e.clientY+"px";document.body.appendChild(g);
    const x0=e.clientX,y0=e.clientY;let moved=0;const tgt=qs("#tnBPd");
    const mv=(ev)=>{if(Math.abs(ev.clientX-x0)+Math.abs(ev.clientY-y0)>6)moved=1;g.style.left=ev.clientX+"px";g.style.top=ev.clientY+"px";const rr=tgt.getBoundingClientRect();tgt.classList.toggle("hot",ev.clientX>=rr.left&&ev.clientX<=rr.right&&ev.clientY>=rr.top&&ev.clientY<=rr.bottom);};
    const up=(ev)=>{removeEventListener("pointermove",mv);removeEventListener("pointerup",up);removeEventListener("pointercancel",up);g.remove();tgt.classList.remove("hot");const rr=tgt.getBoundingClientRect(),inB=ev.clientX>=rr.left&&ev.clientX<=rr.right&&ev.clientY>=rr.top&&ev.clientY<=rr.bottom;
      if(!moved||inB)tnPlace(id);else tnRenderBP("Drop it <b>on the blueprint</b>.","");};
    addEventListener("pointermove",mv);addEventListener("pointerup",up);addEventListener("pointercancel",up);};});}
function tnPlace(id){if(TS.made)return void($sx("locked"),tnRenderBP("You already made the Rust Remover. Pour it on the manhole!","bad"));
  if(!TN_SLOT[id])return void($sx("locked"),tnRenderBP("<b>"+Qt(items[id].n)+"</b> isn't on the blueprint. It needs two acids and some aluminium.","bad"));
  TS.pl[id]=1;inv=inv.filter((t)=>t!==id);updateBag();$sx(id==="foil"?"scratch":"pour");
  const m={cola:"Flat cola in. Its <b>phosphoric acid</b> (H₃PO₄) will turn rust into crumbly iron phosphate.",lemon:"Lemon juice in. Its <b>citric acid</b> dissolves rust and grabs the freed iron ions (chelation).",foil:"Crumpled foil in. <b>Aluminium</b> is more reactive than iron: it helps strip the rust and scrubs it loose."}[id];
  const n=TN_ING.filter((i)=>TS.pl[i.id]).length;
  if(n<3)return void tnRenderBP(m+"<br>("+n+"/3 on the blueprint)","good");
  TS.made=1;inv.push("rustx");got.add("rustx");updateBag();updateGuide();c2Save("tunnel");setTimeout(()=>$sx("success"),250);
  tnRenderBP(m+"<br><b>MAKESHIFT RUST REMOVER READY!</b> Two mild acids attack the rust while the aluminium reacts and scrubs. Now pour it on the rusted manhole.","good");}
function tnEsc(){if(window.__bzEsc&&window.__bzEsc())return;if(!qs("#tnTrunk").hidden){if(!qs("#tkCard").hidden)qs("#tkOk").click();else tnCloseTrunk();}else if(!qs("#tnBP").hidden)tnCloseBP();else if(!qs("#tnPaper").hidden){const pp=qs("#tnPaper");pp.__done&&pp.__done();}}
GM.tn=()=>({TS:JSON.parse(JSON.stringify(TS)),TC:TC&&{k:TC.k,t:TC.t,wait:!!TC.wait},room,pl:{w:player.walk,f:player.fr,on:player.on,x:player.x,vx:player.vx,kb:player.kb,ue:typeof ue==="number"?ue:"n/a",inv:invuln}});
GM.tnEnter=()=>tnEnterTunnel();
GM.tnSet=(o,g)=>{Object.assign(TS,JSON.parse(JSON.stringify(o)));if(g!==void 0){hasGun=!0;ammo=g;inv.includes("blaster")||inv.push("blaster");updateHud();}};GM.go=(r)=>{fadeNow=0;fadeTo=0;onFaded=null;enterRoom(r,"R");};GM.tnx=()=>({bar:TS.ex.bar,er:tnBarEr,sp:tnSp&&{x:Math.round(tnSp.x),head:Math.round(tnSp.x-C2_SP_HEAD)},wait:tnSpWait,heard:tnHeard,shots:shots.map((s)=>[Math.round(s.x),Math.round(s.y),s.vx])});
GM.dbgFade=(n,f)=>{fadeNow=n;fadeTo=f;onFaded=null;};
function evoLeave(){try{if(GM.on&&!dead&&!won){if(tnIs(room)||C2[room])c2Save(room);else evoAutosave();}}catch(e){}
  try{modal=0;window.__evoPaused=0;window.__evoQPause=0;TC=null;tnBars(0);tnCap("");for(const id of["gx","gk","tnTrunk","tnBP","tnPaper","tkCard","evoJ","evoQ"]){const e=qs("#"+id);e&&(e.hidden=!0);}TK&&TK.raf&&cancelAnimationFrame(TK.raf);}catch(e){}}
GM.flags=()=>({fade:[+fadeNow.toFixed(2),fadeTo],won,dead,doorCut,pourT,erode,exitOpen,modal,c2cut:!!c2cut,cine:!!cine,paused:!!window.__evoPaused,TC:TC&&TC.k,onFaded:!!onFaded,kb:player.kb,climb:!!player.climb,room});
/* ======================= END CHAPTER 2, PART 2 ======================= */

function tkInitUI(mk){const st=document.createElement("style");st.textContent="#tnTrunk{padding:0;background:#020408f4;z-index:9}"+
  "#tkw{position:relative;width:min(100vw,177.78vh);height:min(56.25vw,100vh);font-size:clamp(6px,min(1.3vw,2.31vh),26px);touch-action:none;overflow:hidden;user-select:none;-webkit-user-select:none;background:#000}"+
  "#tkc{position:absolute;inset:0;width:100%;height:100%;image-rendering:pixelated;touch-action:none;cursor:grab}#tkc:active{cursor:grabbing}"+
  "#tkMsg{position:absolute;left:1.5%;top:2%;width:62%;min-height:2.4em;padding:.7em .9em;font-size:.82em;line-height:1.7;background:#0a1224ee;border:2px solid #3a4a7a;color:#e8f2ff;z-index:3;pointer-events:none}"+
  "#tkSt{position:absolute;right:1.5%;top:2%;width:32%;display:flex;flex-wrap:wrap;justify-content:flex-end;gap:.35em;z-index:3;font-size:.68em;pointer-events:none}#tkSt .chip{background:#0a1224dd;border:1px solid #3a4a7a;color:#9ab0d0;padding:.35em .55em;border-radius:3px}#tkSt .chip.on{border-color:#6aff9a;color:#8aff9a}"+
  "#tkSlots{position:absolute;right:1.5%;bottom:3%;display:flex;gap:.5em;z-index:3;pointer-events:none}.tkslot{width:7em;height:6em;border:2px dashed #3a4a7a;background:#0a1224cc;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.3em;font-size:.6em;color:#9ab0d0;text-align:center;line-height:1.4}.tkslot b{font-size:2.2em;color:#3a4a7a;font-weight:400}.tkslot.on{border-style:solid;border-color:#6aff9a;color:#d8ffe6}.tkslot img{width:2.8em;height:2.8em;image-rendering:pixelated}"+
  "#tkClose{position:absolute;left:1.5%;bottom:3%;z-index:4;font-size:.8em;padding:.8em 1em}#tkCard{position:absolute;inset:0;z-index:6}#tkCard .gcard{width:min(520px,94%)}";
  document.head.appendChild(st);const w=mk("tnTrunk");w.className="gov";w.hidden=!0;w.innerHTML='<div id="tkw"><canvas id="tkc" width="384" height="216"></canvas><div id="tkMsg"></div><div id="tkSt"></div><div id="tkSlots"></div><button class="gbtn alt" id="tkClose" type="button">CLOSE TRUNK</button><div class="gov" id="tkCard" hidden></div></div>';
  qs("#tkClose").onclick=tnCloseTrunk;}

function c2Ground(t,i){for(let k=0;k<2;k++){const x=40+300*r(k,170+i),w=22+14*r(k,171+i);for(let y=0;y<5;y++)t.rect(x+y,190+y*2,w-2*y,2,"#17191a");t.rect(x,189,w,1,"#5a5e5e");for(let b=0;b<4;b++)
t.line(x+3+b*5,190,x+6+b*5,183-2*(b%2),"#6a3a22");}
for(let k=0;k<26;k++)
t.rect(384*r(k,180+i),186+26*r(k,181+i),1+3*r(k,182+i),1+2*r(k,183+i),r(k,184)<0.5?"#4e5250":"#3a3e3c",);const tx=40+240*r(i,185);t.rect(tx,168,2,16,"#5a5e60");t.rect(tx+54,168,2,16,"#5a5e60");for(let x=0;x<54;x+=2)
t.rect(tx+x,174+(x*3)/54,2,2,(x>>1)%2?"#e8a020":"#1a1a1a");for(let k=0;k<3;k++){const x=384*r(k,190+i);for(let y=0;y<5;y++)
t.rect(x-y,186+18*r(k,191+i)+y,14+2*y,1,"#0e0f10",0.35);}}
function c2Tower(t){const x=232,base=140,top=108,A=0.34;t.rect(x-16,top-14,32,base-top+22,"#c8d4c0",0.2);for(let y=top;y<base;y++){const w=1+(5*(y-top))/(base-top);t.rect(x-w,y,1,1,"#34403f",A);t.rect(x+w,y,1,1,"#34403f",A);y%7===0&&t.rect(x-w,y,w*2+1,1,"#34403f",A*0.8);}t.rect(x,top-6,1,7,"#34403f",A);t.rect(x-5,base,10,1,"#2e363a",A*0.7);t.rect(x-22,top-16,44,base-top+26,"#d4dccc",0.16);t.rect(x-30,top-4,60,base-top+10,"#d4dccc",0.12);}
function c2Smoke(f){f.smoke.forEach((s,i)=>{if(s[0]<camX-70||s[0]>camX+260)return;for(let k=0;k<16;k++){const a=((tick*0.35+k*12+i*31)%192)/192,sz=2+a*11;ctx.globalAlpha=0.34*(1-a)*Math.min(1,a*6);fill(k%3?"#2e2826":"#4a403c",s[0]+a*34+3*Math.sin(tick/50+k+i)-sz/2,s[1]-a*78-sz/2,sz,sz*0.8,);}});ctx.globalAlpha=1;}
function c2Fire(c){const top=C2_FLOOR-c.h,n=Math.max(3,Math.floor(c.w/7));for(let k=0;k<n;k++){const x=c.x+4+(k*(c.w-8))/(n-1),ph=tick/3.2+k*1.7+c.s,h=6+4*Math.sin(ph)+3*Math.sin(ph*2.3+1);fill("#d8421c",x-1.5,top-h,3,h+1);fill("#ff8a30",x-1,top-h*0.7,2,h*0.7);fill("#ffd868",x-0.5,top-h*0.4,1,h*0.4);}
glow(c.x+c.w/2,top-3,c.w*0.8,"255,140,50",0.3+0.1*Math.sin(tick/5+c.s));for(let k=0;k<3;k++){const a=((tick*0.6+k*40+c.s*13)%90)/90;fill("#ffb050",c.x+4+(c.w-8)*r(k,c.s)+5*Math.sin(a*6+k),top-4-a*34,0.5,0.5,);}}
function c2Gantry(g){if(g.x<camX-130||g.x>camX+260)return;const y=C2_FLOOR-g.h;[g.x,g.x+g.w-4].forEach((px)=>{fill("#3a3e40",px,y,4,g.h);fill("#5a5e60",px,y,1,g.h);for(let k=0;k<5;k++)fill("#6a3a22",px+1,y+8+13*k+3*r(k,g.x),2,3);});fill("#4a4e50",g.x-4,y,g.w+8,4);fill("#6a6e70",g.x-4,y,g.w+8,1);for(let k=0;k<10;k++)fill("#2a2c2e",g.x+2+k*10,y+2,1,1);fill("#0e2a1c",g.x+25,y+5,54,21);fill("#1c4a30",g.x+26,y+6,52,19);fill("#d8e8d8",g.x+26,y+6,52,1);text("RADIO STN",g.x+29,y+9,"#e8f0e8",'4px "Press Start 2P",monospace');text(["4","2","1"][g.k]+" MI <",g.x+35,y+17,"#ffe070",'4px "Press Start 2P",monospace',);for(let k=0;k<14;k++)fill("#5a3a22",g.x+28+3.5*k,y+22+2*r(k,g.x),1,2);}
function c2Twigs(x,y,L,s){ctx.strokeStyle="#1c1612";ctx.lineWidth=0.6;for(let k=0;k<5;k++){const a=-0.4-(k*2.3)/5+0.2*Math.sin(s+k),ex=x+Math.cos(a)*L*1.2,ey=y+Math.sin(a)*L*1.2;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(ex,ey);ctx.lineTo(ex+Math.cos(a+0.6)*L*0.5,ey+Math.sin(a+0.6)*L*0.5);ctx.moveTo(ex,ey);ctx.lineTo(ex+Math.cos(a-0.5)*L*0.5,ey+Math.sin(a-0.5)*L*0.5);ctx.stroke();}}
function c2Crown(x,y,rad,s){for(let k=0;k<7;k++){const a=(k/7)*6.283,cx=x+Math.cos(a)*rad*0.8+1.5*Math.sin(tick/90+k+s),cy=y+Math.sin(a)*rad*0.5;ctx.fillStyle=k%2?"#2a6a30":"#3a8a3a";ctx.beginPath();ctx.arc(cx,cy,rad*0.55,0,7);ctx.fill();}
ctx.fillStyle="#5aaa4a";ctx.beginPath();ctx.arc(x-rad*0.25,y-rad*0.3,rad*0.35,0,7);ctx.fill();}
function c2Branch(t,b){const y=C2_FLOOR-b.h,stub=b.gone?6:b.len,warn=b.rot&&!b.gone&&b.load>b.snapT-16,jx=warn?(Math.random()-0.5)*1.2:0,jy=warn?(Math.random()-0.5)*1.2:0,col=b.rot?"#6a5a48":t.dead?"#26201a":"#3a2a1c",hi=b.rot?"#9a8a70":t.dead?"#3a3028":"#5a4430";for(let s=0;s<stub;s++){const xx=b.side<0?b.x-s-1:b.x+s,th=3-1.6*(s/b.len);fill(col,xx+jx,y+jy,1,th);fill(hi,xx+jx,y+jy,1,1);}
if(b.gone){for(let k=0;k<3;k++)fill("#9a8a70",b.x+b.side*(5+k),y-1+k,1,1);return;}
if(b.rot)
for(let k=0;k<3;k++){const s=b.len*(0.25+0.25*k);fill("#2a2218",b.side<0?b.x-s:b.x+s,y+1,1,2);}
const tx=b.side<0?b.x-b.len:b.x+b.len;t.dead?c2Twigs(tx,y,5,b.h+b.len):c2Crown(tx,y-1,6,b.h+b.len);}
function c2Tree(t){if(t.x<camX-80||t.x>camX+270)return;const g=C2_FLOOR,dark=t.dead?"#1c1612":"#2a1e14",lite=t.dead?"#2e2620":"#4a3624";Ft(t.x,g+1,14,0.4);for(let y=0;y<t.top;y++){const w=5-2*(y/t.top)+(y<5?2-y*0.4:0),lean=Math.sin(y/18+t.s)*0.8;fill(dark,t.x-w/2+lean,g-y,w,1);fill(lite,t.x-w/2+lean,g-y,1,1);}
t.br.forEach((b)=>c2Branch(t,b));t.dead?c2Twigs(t.x,g-t.top,8,t.s):c2Crown(t.x,g-t.top,12,t.s);}
function c2Vine(v){if(v.x<camX-20||v.x>camX+212)return;const sw=(y)=>
Math.sin(tick/40+v.s)*1.3*(y/v.len)+
(player.climb===v?Math.sin(tick/6)*0.4:0);if(v.broken){for(let y=0;y<7;y++)fill("#2a4a2a",v.x+Math.sin(y)*0.6,v.top+y,1,1);return;}
const warn=v.rot&&player.climb===v&&player.y<=v.snapY+14;for(let y=0;y<v.len;y++){const x=v.x+sw(y)+(warn?(Math.random()-0.5)*1.4:0);fill(v.rot?(y%4?"#5a5428":"#7a6a34"):y%4?"#1f5a2c":"#2f7a3a",x,v.top+y,1,1,);y%6===3&&
fill(v.rot?"#6a6030":"#3a9a46",x+(y%12===3?1:-2),v.top+y,2,1);v.rot&&y%17===9&&fill("#2a2410",x,v.top+y,1,2);!v.rot&&y%11===5&&fill("#ff86d0",x+1,v.top+y,1,1);}}
function c2Tint(){if(c3Mine())return void c3Tint();ctx.save();ctx.globalCompositeOperation="multiply";ctx.fillStyle="rgb(226,186,158)";ctx.fillRect(0,0,192,108);ctx.globalCompositeOperation="source-over";const gr=ctx.createLinearGradient(0,0,0,108);gr.addColorStop(0,"rgba(24,14,10,.42)");gr.addColorStop(0.45,"rgba(24,14,10,0)");gr.addColorStop(1,"rgba(140,50,12,.2)");ctx.fillStyle=gr;ctx.fillRect(0,0,192,108);ctx.restore();}
function c2Ash(){for(let k=0;k<64;k++){const sp=0.25+0.15*(k%3),x=camX+((((r(k,1)*230-tick*sp)%230)+230)%230)-19,y=((r(k,2)*130+tick*(0.18+0.1*(k%4)))%130)-10;fill(k%9===0?"#ff9a40":"rgba(214,204,194,.6)",x,y,k%5===0?1:0.5,k%5===0?1:0.5,);}}
function c2Scenery(d){const f=C2_F[room];c2Smoke(f);f.gantries.forEach(c2Gantry);f.trees.forEach(c2Tree);f.vines.forEach(c2Vine);room!=="forest"&&!(C2[room]&&C2[room].c4)&&c2Ash();if(room==="highway"&&camX<170){const on=tick%100<16;on&&(fill("#ff3030",94,14.5,2,2),glow(95,15.5,12,"255,40,40",0.55));glow(95,15.5,5,"255,40,40",0.12);}}
function c2Standing(){const f=C2_F[room];if(!player.on||!f)return 0;for(const p of rooms[room].plats)
if((p.br||p.gan)&&
!p.gone&&
Math.abs(player.y-p.y)<0.6&&
player.x>p.x-3&&
player.x<p.x+p.w+3)
return p;return 0;}
function c2Snap(v){v.broken=1;player.climb=null;player.vy=0.4;$sx("snap");shake=Math.max(shake,7);sparks(v.x,player.y-12,12,["#3a8a3a","#7a6a34","#d8c890"],1.6,0.14,20);c2snapped++||toast("<b>SNAP!</b><br>That one was rotten. Look out below.",2600);}
function c2Break(b){b.gone=1;b.p.gone=1;$sx("snap");shake=Math.max(shake,8);const x=b.side<0?b.x-b.len/2:b.x+b.len/2;sparks(x,C2_FLOOR-b.h,16,["#6a5a48","#9a8a70","#2a2218"],1.8,0.16,22);c2snapped++||toast("<b>SNAP!</b><br>That branch was rotten. Look out below.",2600);}
function c2Fall(n){if(Eo.god||dead)return;hp-=n;invuln=60;hurtFlash=16;hitStop=Math.max(hitStop,3);shake=Math.min(18,6+3*n);$sx("hurt");smoke(player.x-3,player.y,5,-1);smoke(player.x+3,player.y,5,1);addFx({k:"ring",x:player.x,y:player.y,r0:2,r1:16,c:"#ff8a8a",life:14,sq:0.3});updateHud();hp<=0?(c2Die("YOU FELL","Rotten wood gives no warning you can count on. Test the way up: vines and branches that look dry can snap. Drop the last stretch yourself, or stay on the cars.",),(hp=0)):toast("<b>OUCH!</b> You fell: -"+n+" &#9829;",2000);}
function c2WorldUpdate(){const f=C2_F[room];if(!f||dead)return;const cut=c2cut,free=!cut&&!(ch2&&ch2.stuck>0);if(!player.climb&&keys.u&&free)
for(const v of f.vines)
if(!v.broken&&
Math.abs(player.x-v.x)<4.5&&
player.y>v.top+8&&
player.y<v.top+v.len+10){((player.climb=v),(player.x=v.x),(player.vx=player.vy=0),(v.t=0),$sx("click"));break;}
const v=player.climb;if(v){coyote=0;jumpBuf=0;if(v.broken)player.climb=null;else{if(v.rot&&player.y<=v.snapY+14){v.t++||($sx("creak"),(shake=Math.max(shake,2)));(player.y<=v.snapY||v.t>40)&&c2Snap(v);}
if(player.climb&&player.on&&!keys.u)player.climb=null;else if(player.climb&&player.y<=v.top+3)
((player.climb=null),(player.vy=-2.6),(player.kb=7),(player.kbv=v.dir));}}
if(player.climb||player.on){if(player.on&&c2air){const d=player.y-c2sup;c2air=0;c2tree&&d>34&&c2Fall(Math.floor((d-34)/20)+1);}
if(player.climb||player.on){c2sup=player.y;c2tree=player.climb?1:c2Standing()?1:0;}
player.climb&&(c2air=1);}else c2air=1;for(const b of f.branches){if(b.gone||!b.rot)continue;const on=
player.on&&
Math.abs(player.y-b.p.y)<0.6&&
player.x>b.p.x-3&&
player.x<b.p.x+b.p.w+3;b.load=on?b.load+1:Math.max(0,b.load-2);b.load===b.snapT-16&&($sx("creak"),(shake=Math.max(shake,2)));b.load>=b.snapT&&c2Break(b);}
if(!c2hint&&!cut&&f.vines.some((q)=>!q.broken&&Math.abs(q.x-player.x)<34)){c2hint=1;toast("<b>VINES</b><br>Hold UP / JUMP next to a vine to climb. DOWN slides, LEFT / RIGHT lets go. Rotten ones SNAP!",4600,);}}
let c2cut=null,c2seen=false;const C2_SCRIPT=[[30,"No traffic. No people. Not one car has|moved on this road since the evacuation.",175],[190,"The radio station. The last broadcast|came from there. Someone might be alive.",340],[570,"There! The tower's light is still blinking.|Somebody kept the power on.",745],[1010,"...What was that?",1110],];const ez=(k)=>k*k*(3-2*k),c2Lerp=(a,b,k)=>a+(b-a)*k;function c2CutStart(){c2seen=true;c2cut={t:0,ax:0,cx:null,z:1,fx:96,fy:70,bar:0,flash:0,red:0,rumble:0,cap:null,birds:[],sp:null,cam0:0,};player.face=-1;keys.l=keys.r=keys.s=keys.u=0;toast("");qs("#cskip").hidden=false;updateGuide();}
function c2CutEnd(){const c=c2cut;if(!c)return;c2cut=null;qs("#cskip").hidden=true;player.face=1;ch2.heard=1;ch2.sp={x:player.x+100+C2_SP_HEAD,t:0,cd:110,st:"chase",pause:c.t>1280?40:70,};keys.l=keys.r=keys.s=keys.u=0;jumpBuf=punchBuf=useBuf=shootBuf=0;toast("<b>RUN!</b><br>Jump on the cars. The red mark shows where its web lands.",3600);updateGuide();}
qs("#cskip").onclick=()=>(c2cut?c2CutEnd():skipCine());function c2Birds(n,x,y,vx,vy){for(let i=0;i<n;i++)
c2cut.birds.push({x:x+40*(Math.random()-0.5),y:y+14*(Math.random()-0.5),vx:vx*(0.6+Math.random()*0.8),vy:vy*(0.5+Math.random()),p:Math.random()*6,});}
function c2CutUpdate(){const c=c2cut,t=++c.t,W=roomW(),fl=C2_FLOOR,cl=(x)=>Math.max(0,Math.min(W-192,x)),follow=cl(player.x-96),chase=cl(player.x-56);c.ax=t<300?-0.5:0;c.bar+=((t<1360?32:0)-c.bar)*0.07;c.flash>0&&c.flash--;c.red*=0.97;for(const[t0,txt,t1]of C2_SCRIPT){t===t0&&(c.cap={txt,n:0});t===t1&&(c.cap=null);}
if(c.cap){const o=Math.floor(c.cap.n);c.cap.n+=0.6;for(let i=o;i<Math.floor(c.cap.n)&&i<c.cap.txt.length;i++)
c.cap.txt[i]!=="|"&&$sx("blip","p",c.cap.txt[i]);}
t===300&&(c.cam0=camX);c.cx=
t<300?null:t<540?c.cam0*(1-ez((t-300)/240)):t<760?0:t<1000?follow*ez((t-760)/240):t<1170?follow:t<1330?c2Lerp(follow,chase+36,ez(Math.min(1,(t-1170)/90))):c2Lerp(chase+36,chase,ez(Math.min(1,(t-1330)/70)));c.z=
t<1060?1:t<1150?1+0.8*ez((t-1060)/90):t<1170?1.8:1.8-0.8*ez(Math.min(1,(t-1170)/90));c.fx=player.x-camX;c.fy=player.y-24;t===560&&c2Birds(16,70,52,-1.4,-0.7);t===560&&$sx("flutter");t>=760&&t<1060&&t%14===0&&$sx("alarm");if(t>=940&&t<1060){c.rumble=Math.min(1,(t-940)/60);shake=Math.max(shake,2+Math.round(5*c.rumble));t%20===0&&$sx("rumble");t%3===0&&
parts.push({x:camX+192*Math.random(),y:0,vx:0,vy:0.5,g:0.01,life:100,c:Math.random()<0.5?"#6a5a50":"#8a7a70",s:1,});}
if(t===1060){c.rumble=0;player.face=1;c2Birds(18,player.x,44,0.5,-1.7);c2Birds(8,player.x-60,50,-0.5,-1.5);$sx("flutter");}
(t===1100||t===1130)&&
($sx("boom"),(shake=t===1130?14:8),(c.rumble=0.5),smoke(player.x+40,fl,6,-1));t===1112&&(c.rumble=0);if(t===1160){$sx("whoosh");c.sp={x:player.x+340,oy:140,t:0,k:0};}
if(c.sp&&t<1250){const k=Math.max(0,(t-1170)/80),lx=player.x+100+C2_SP_HEAD;c.sp.k=k;c.sp.t=3;c.sp.x=c2Lerp(player.x+340,lx,ez(Math.min(1,k)));c.sp.oy=140*Math.pow(1-Math.min(1,k),1.5)+22*Math.sin(Math.PI*Math.min(1,k));}
if(t===1250){c.sp.x=player.x+100+C2_SP_HEAD;c.sp.oy=0;c.flash=6;c.rumble=1;shake=30;$sx("slam");$sx("crash");smoke(c.sp.x-60,fl,10,-1);smoke(c.sp.x-20,fl,10,1);addFx({k:"ring",x:c.sp.x-40,y:fl,r0:4,r1:70,c:"#ffe0a0",life:20,sq:0.18});sparks(c.sp.x-50,fl-2,24,["#aab4c4","#6a7480","#ffe0a0"],2.4,0.14,26);}
t===1262&&(c.rumble=0.3);t===1285&&($sx("spiderscreech"),(c.red=1),(shake=Math.max(shake,12)));t===1300&&$sx("stinger");if(c.sp&&t>=1250)c.sp.t=t-1250+3;c.birds=c.birds.filter((b)=>{b.x+=b.vx;b.y+=b.vy+0.25*Math.sin(b.p+t/3);b.vy-=0.004;return b.y>-30&&b.x>-30&&b.x<W+30;});t>=1420&&c2CutEnd();}
function c2CutWorld(){const c=c2cut;if(!c)return;c.birds.forEach((b)=>{const f=Math.sin(tick/2+b.p)*1.2;fill("#0c0a0a",b.x-0.5,b.y,1.5,0.8);fill("#0c0a0a",b.x-2.5,b.y-f,2,0.5);fill("#0c0a0a",b.x+1,b.y-f,2,0.5);});if(c.sp){const k=Math.min(1,c.sp.oy/140);Ft(c.sp.x-36,C2_FLOOR+1,60+40*(1-k),0.85*(1-0.7*k));c2Spider(c.sp);c.t>=1250&&
c.t<1420&&
glow(c.sp.x-64,C2_FLOOR-44,12+8*c.red,"255,50,30",0.45+0.4*c.red);}}
function c2CutCam(){const c=c2cut;if(!c||c.z===1)return;const z=c.z;ctx.translate(c.fx*(1-z),c.fy*(1-z));ctx.scale(z,z);}
function c2CutHud(){const c=c2cut;if(!c)return;const B=c.bar,t=c.t,big=(s,y,size,col,a)=>{ctx.font=size+'px "Press Start 2P",monospace';ctx.textBaseline="top";const w=ctx.measureText(s).width;ctx.globalAlpha=a;ctx.fillStyle="#000";ctx.fillText(s,192-w/2+1,y+1);ctx.fillStyle=col;ctx.fillText(s,192-w/2,y);ctx.globalAlpha=1;};c.red>0.02&&
((ctx.fillStyle="rgba(170,10,10,"+0.28*c.red+")"),ctx.fillRect(0,0,384,216));c.flash>0&&
((ctx.fillStyle="rgba(255,255,255,"+0.7*(c.flash/6)+")"),ctx.fillRect(0,0,384,216));ctx.fillStyle="#000";ctx.fillRect(0,0,384,B);ctx.fillRect(0,216-B,384,B);if(t>40&&t<200){const a=Math.min(1,(t-40)/25,(200-t)/25);big("THE HIGHWAY",216-B-38,10,"#ffe070",a);big("RADIO STATION: 4 MILES",216-B-22,6,"#9be7ff",a);}
if(c.cap){const lines=c.cap.txt.slice(0,Math.floor(c.cap.n)).split("|");ctx.font='6px "Press Start 2P",monospace';ctx.textBaseline="top";ctx.fillStyle="#8fffd1";ctx.fillText((playerName||"YOU").toUpperCase(),12,216-B+3);ctx.font='8px "Press Start 2P",monospace';ctx.fillStyle="#f4f8ff";lines.forEach((l,i)=>ctx.fillText(l,12,216-B+12+10*i));}
if(t>=1300&&t<1400){const a=Math.min(1,(t-1300)/8,(1400-t)/18),p=1+0.06*Math.sin(t/3);ctx.save();ctx.translate(192,96);ctx.scale(p,p);ctx.translate(-192,-96);big("RUN!",76,40,"#ff4a3a",a);ctx.restore();}}

