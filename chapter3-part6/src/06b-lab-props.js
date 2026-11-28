/* ======================= PART 6D ART: PROPS OF THE CONTAINMENT CHAMBER (painted sprites) ======================= */
const P6L_G=C2_FLOOR;
function p6Label(g,txt,x,y,col,sz){g.font=(sz||5)+'px "Press Start 2P",monospace';g.textBaseline="top";g.fillStyle=col||"#1a2a30";g.fillText(txt,x,y);}
/* the clean workbench: white epoxy top, steel cabinets, a microscope, a vise, parts bins, a tool tray and a swing-arm lamp */
function p6SprBench(){return p6Sprite("bench",210,92,(t)=>{
  p6Box(t,2,46,206,46,P6C.steelW,{seed:140,bev:1,nz:0.08,rust:0});for(let q=0;q<4;q++){p6Box(t,6+q*51,52,46,34,P6C.steel,{seed:141+q,bev:1,nz:0.06});p6Box(t,16+q*51,62,26,4,P6C.dark,{seed:150+q,bev:1});t.rect(18+q*51,63,22,1,[200,210,220],0.7);p6Box(t,10+q*51,56,38,2,P6C.dark,{seed:160+q,bev:0});for(let w=0;w<5;w++)t.rect(14+q*51+w*6,74,3,8,P6C.dark[0]);}
  p6Box(t,0,38,210,9,P6C.white,{seed:170,bev:1,nz:0.04,grad:0.18});t.rect(1,39,208,1,[255,255,255],0.9);for(let x=6;x<204;x+=30)t.rect(x,41,12,1,[255,255,255],0.35);p6Box(t,0,46,210,2,P6C.steel,{seed:171,bev:0});
  /* microscope */
  p6Box(t,14,30,16,8,P6C.dark,{seed:172,bev:1});p6Limb(t,20,32,22,10,5,4,P6C.steel,{seed:173});p6Box(t,17,8,12,10,P6C.steelW,{seed:174,round:"h",bev:1});p6Box(t,25,16,4,14,P6C.dark,{seed:175});p6Ell(t,22,36,6,2,P6C.steel,{seed:176});
  /* parts bins */
  for(let q=0;q<5;q++){p6Box(t,52+q*13,26,11,12,[[20,24,30],[[70,140,200],[200,80,60],[220,180,50],[70,180,100],[160,90,200]][q][0]?[[30,60,100],[90,170,230],[160,210,250]]:[[1,1,1]]][1],{seed:180+q,bev:1,nz:0.06});}
  for(let q=0;q<5;q++){const c=[[[40,70,120],[80,140,210],[150,196,250]],[[90,30,26],[200,70,56],[250,140,120]],[[96,76,16],[200,160,40],[250,220,110]],[[24,80,44],[60,170,96],[130,230,160]],[[60,34,90],[130,80,190],[200,160,240]]][q];p6Box(t,52+q*13,26,11,12,c,{seed:190+q,bev:1,nz:0.06});t.rect(54+q*13,29,7,2,[235,235,240],0.8);}
  /* tool tray with a wrench, pliers and screwdrivers */
  p6Box(t,122,34,34,4,P6C.steel,{seed:200,bev:1});t.rect(124,32,28,2,P6C.steel[4]);for(let q=0;q<3;q++){p6Box(t,126+q*8,30,3,5,[[120,20,20],[160,40,30],[210,80,60]],{bev:0,nz:0});t.rect(127+q*8,35,1,3,P6C.steel[4]);}
  t.line(144,31,154,28,P6C.steel[4]);t.line(144,32,154,29,P6C.steel[2]);
  /* a vise bolted to the end of the bench */
  p6Box(t,170,24,26,14,P6C.dark,{seed:201,bev:1});p6Box(t,174,16,10,10,P6C.steel,{seed:202,bev:1});p6Box(t,186,18,10,8,P6C.steel,{seed:203,bev:1});t.rect(180,14,2,10,P6C.brass[3]);p6Ell(t,181,13,3,3,P6C.brass,{seed:204});
  /* the swing-arm lamp over the bench */
  p6Ell(t,8,38,4,2,P6C.dark,{seed:205});p6Limb(t,8,36,8,12,2.4,2.4,P6C.steel,{seed:206});p6Limb(t,8,12,26,2,2.4,2.4,P6C.steel,{seed:207});p6Box(t,22,0,18,8,P6C.steelW,{seed:208,round:"h",bev:1});t.rect(24,7,14,1,[255,246,200]);t.light&&t.light(30,12,26,"#fff6c8",0.5);
  p6Box(t,80,6,2,2,P6C.dark,{bev:0});},(g)=>{p6Label(g,"BENCH 01",14,50,"#a8c0c8",4);});}
function p6SprBlueprint(){return p6Sprite("blueprint",92,86,(t)=>{p6Box(t,0,0,92,86,P6C.steel,{seed:210,bev:2,nz:0.06});p6Box(t,5,5,82,76,[[10,30,70],[16,50,110],[24,72,150]],{seed:211,bev:1,nz:0.08});
  for(let q=0;q<9;q++){t.rect(5+q*10,5,1,76,[120,180,255],0.2);t.rect(5,5+q*9,82,1,[120,180,255],0.2);}
  const ln=(x0,y0,x1,y1)=>t.line(x0,y0,x1,y1,[190,226,255],0.9),bx=(x,y,w,h)=>{ln(x,y,x+w,y);ln(x,y+h,x+w,y+h);ln(x,y,x,y+h);ln(x+w,y,x+w,y+h);};
  bx(12,12,24,16);bx(52,12,24,16);bx(12,40,24,16);bx(52,40,24,16);bx(32,64,28,12);ln(36,20,52,20);ln(24,28,24,40);ln(64,28,64,40);ln(36,48,52,48);ln(24,56,24,64);ln(64,56,64,64);ln(24,64,32,70);ln(64,64,60,70);
  for(const [x,y] of [[24,20],[64,20],[24,48],[64,48]]){for(let a=0;a<12;a++)t.px(x+Math.cos(a*0.52)*5,y+Math.sin(a*0.52)*5,[190,226,255]);}
  for(const [x,y] of [[8,8],[84,8],[8,78],[84,78]])p6Ell(t,x,y,2.4,2.4,P6C.brass,{seed:x+y});},(g)=>{p6Label(g,"UPGRADE CORE",14,76,"#bfe4ff",4);p6Label(g,"REACTOR",14,32,"#bfe4ff",3);p6Label(g,"CATALYST",54,32,"#bfe4ff",3);});}
function p6SprCart(){return p6Sprite("cart",70,84,(t)=>{p6Box(t,2,24,66,5,P6C.steelW,{seed:220,bev:1});p6Box(t,2,56,66,5,P6C.steelW,{seed:221,bev:1});p6Box(t,5,24,3,60,P6C.steel,{seed:222,round:"v"});p6Box(t,62,24,3,60,P6C.steel,{seed:223,round:"v"});t.rect(2,24,66,1,[255,255,255],0.6);t.rect(2,56,66,1,[255,255,255],0.6);
  p6Ell(t,10,80,4,4,P6C.rubber,{seed:224});p6Ell(t,60,80,4,4,P6C.rubber,{seed:225});p6Limb(t,5,84,12,84,3,3,P6C.steel,{seed:226});
  /* top tier: saline bag, bottles, kidney tray, a box of gloves */
  p6Box(t,10,10,18,14,[[30,70,100],[70,140,180],[170,220,240]],{seed:227,bev:1,nz:0.04});t.rect(12,14,14,4,[200,240,250],0.5);t.line(19,10,19,2,P6C.steel[4]);
  p6Box(t,34,8,6,16,P6C.glass,{seed:228,round:"v"});p6Box(t,42,12,6,12,[[100,30,20],[220,90,50],[250,170,120]],{seed:229,round:"v"});p6Box(t,50,14,12,10,[[20,60,120],[60,130,220],[140,190,250]],{seed:230,bev:1});t.rect(52,17,8,3,[240,244,248],0.9);
  p6Box(t,8,32,28,10,P6C.steel,{seed:231,bev:1});p6Box(t,42,38,22,16,[[200,200,210],[236,236,244]],{seed:232,bev:1});t.rect(44,44,18,3,[200,50,50]);
  for(let q=0;q<4;q++)p6Box(t,12+q*5,46,3,8,[[80,30,40],[200,180,190]],{bev:0,nz:0});
  p6Rust(t,4,24,62,60,233,0.25);});}
function p6SprSamples(){return p6Sprite("samples",64,64,(t)=>{p6Box(t,0,0,64,64,P6C.steel,{seed:240,bev:2,rust:0.3,nz:0.12,rivets:10});for(let q=0;q<3;q++){p6Box(t,4,4+q*20,56,17,P6C.steelW,{seed:241+q,bev:1,nz:0.08});p6Box(t,22,10+q*20,20,4,P6C.dark,{seed:250+q,bev:1});t.rect(24,11+q*20,16,1,[210,220,230],0.7);p6Box(t,8,6+q*20,10,5,[[196,190,160],[236,230,200]],{seed:260+q,bev:0});}
  t.poly([[48,10],[56,10],[52,2]],[226,176,40]);for(let q=0;q<3;q++)p6Ell(t,52,7,1.6-q*0.4,1.6-q*0.4,[[20,20,24]],{nz:0});},(g)=>{p6Label(g,"BIO",9,7,"#3a2a10",3);p6Label(g,"SAMPLES 4-9",9,27,"#3a2a10",3);});}
function p6SprSteelShelf(){return p6Sprite("steelshelf",72,90,(t)=>{for(const x of [2,66])p6Box(t,x,0,4,90,P6C.steel,{seed:x,round:"v",rust:0.2});for(let q=0;q<4;q++){p6Box(t,2,10+q*24,68,4,P6C.steelW,{seed:270+q,bev:1,rust:0.25});}
  /* bars and pipes stacked on the shelves */
  for(let q=0;q<6;q++)p6Box(t,8+q*9,2,7,8,[[60,70,80],[130,144,158],[190,204,216]],{seed:280+q,round:"h",bev:0});p6Box(t,8,16,54,6,P6C.steel,{seed:290,round:"h",bev:0});for(let q=0;q<5;q++)p6Box(t,10+q*10,24,7,10,[[50,58,70],[100,112,126],[160,174,186]],{seed:300+q,round:"h",bev:0});
  p6Box(t,8,40,28,10,P6C.rust,{seed:310,bev:1});p6Box(t,40,38,22,12,[[24,60,40],[50,110,70],[120,180,130]],{seed:311,bev:1});t.rect(10,42,24,2,[240,196,40],0.8);
  for(let q=0;q<3;q++)p6Box(t,10+q*18,64,15,10,[[40,40,48],[90,90,100],[150,150,160]],{seed:320+q,bev:1,rust:0.3});p6Box(t,8,80,54,8,P6C.rust,{seed:330,round:"h",bev:0});});}
function p6SprToolCab(){return p6Sprite("toolcab",64,98,(t)=>{p6Box(t,0,34,64,64,P6C.green,{seed:340,bev:1,rust:0.2,nz:0.1});for(let q=0;q<4;q++){p6Box(t,3,38+q*15,58,12,[[14,44,26],[30,84,48],[60,130,80],[110,180,130]],{seed:341+q,bev:1,nz:0.08});p6Box(t,22,41+q*15,20,3,P6C.dark,{seed:350+q,bev:1});t.rect(24,42+q*15,16,1,[210,220,230],0.7);}
  p6Box(t,0,0,64,34,P6C.dark,{seed:360,bev:1,nz:0.05});for(let y=4;y<32;y+=4)for(let x=4;x<62;x+=4)t.px(x,y,[2,2,4]);
  /* pegboard tools and a spool of enamelled wire */
  t.line(10,6,10,26,P6C.steel[4]);p6Box(t,8,24,5,8,[[60,30,10],[150,80,30],[220,150,80]],{bev:0,nz:0});t.line(20,6,20,24,P6C.steel[3]);p6Box(t,17,4,6,5,[[120,20,20],[210,60,50],[250,130,110]],{bev:0,nz:0});
  p6Box(t,30,6,12,22,[[30,18,8],[100,50,20],[200,120,60],[250,190,120]],{seed:370,round:"h",bev:1,nz:0.06});for(let q=0;q<7;q++)t.rect(31,8+q*3,10,1,[255,210,150],0.5);p6Box(t,28,4,16,3,P6C.dark,{seed:371});p6Box(t,28,26,16,3,P6C.dark,{seed:372});
  t.poly([[50,8],[58,8],[54,22]],P6C.steel[4]);t.line(52,22,52,28,P6C.wood[3]);});}
function p6SprDrawers(){return p6Sprite("drawers",64,62,(t)=>{p6Box(t,0,0,64,62,P6C.steel,{seed:380,bev:2,rust:0.2,nz:0.1});for(let r2=0;r2<4;r2++)for(let c=0;c<4;c++){p6Box(t,3+c*15,3+r2*15,13,12,P6C.steelW,{seed:381+r2*4+c,bev:1,nz:0.06});p6Box(t,6+c*15,9+r2*15,7,2,P6C.dark,{seed:400+r2*4+c,bev:0});t.rect(5+c*15,5+r2*15,9,2,[220,214,180],0.9);}
  p6Rust(t,0,0,64,62,390,0.5);},(g)=>{});}
function p6SprPipePanel(){return p6Sprite("pipepanel",64,104,(t)=>{p6Box(t,0,0,64,104,P6C.dark,{seed:410,bev:2,rust:0.3,nz:0.1});for(const [x,c] of [[8,P6C.steel],[22,P6C.rust],[36,P6C.steel],[50,P6C.brass]]){p6Box(t,x,0,8,104,c,{seed:x+411,round:"v",rust:0.2});for(const y of [20,50,80])p6Box(t,x-2,y,12,5,P6C.steelW,{seed:x+y,bev:1});}
  for(const [x,y] of [[12,34],[26,60],[40,26],[54,50]]){p6Ell(t,x,y,6.4,6.4,P6C.steel,{seed:x+y});p6Ell(t,x,y,5,5,[[210,206,190],[246,244,236]],{nz:0});t.line(x,y,x+3,y-2,[190,30,24]);t.px(x,y,[20,20,20]);}
  for(const [x,y] of [[8,80],[36,90]]){p6Ell(t,x+4,y,6,6,P6C.rust,{seed:x});for(let q=0;q<4;q++)t.line(x+4,y,x+4+Math.cos(q*1.57)*6,y+Math.sin(q*1.57)*6,P6C.dark[1]);}
  for(let q=0;q<3;q++)t.rect(8+q*14,96,6,1,[110,230,240],0.6);},(g)=>{});}
function p6SprLocker(){return p6Sprite("locker",54,98,(t)=>{p6Box(t,0,0,54,98,P6C.steelW,{seed:420,bev:2,nz:0.1,rust:0.3});p6Box(t,3,3,23,92,P6C.steel,{seed:421,bev:1,nz:0.08});p6Box(t,28,3,23,92,P6C.steel,{seed:422,bev:1,nz:0.08});
  for(let q=0;q<6;q++){t.rect(7,8+q*3,15,1,P6C.dark[0]);t.rect(32,8+q*3,15,1,P6C.dark[0]);}p6Box(t,19,48,4,10,P6C.dark,{seed:423,bev:1});p6Box(t,31,48,4,10,P6C.dark,{seed:424,bev:1});
  t.poly([[10,70],[18,70],[14,64]],[226,176,40]);p6Box(t,32,22,12,8,[[196,190,160],[236,230,200]],{seed:425,bev:0});for(let q=0;q<4;q++)t.line(28,76+q*3,50,70+q*4,[10,10,14],0.4);p6Rust(t,0,0,54,98,426,0.5);},(g)=>{p6Label(g,"07",8,12,"#e8e0c0",5);});}
function p6SprDesk(){return p6Sprite("desk",110,96,(t)=>{p6Box(t,0,34,110,6,P6C.wood,{seed:430,bev:1,nz:0.12});t.rect(1,35,108,1,P6C.wood[5],0.7);p6Box(t,6,40,6,56,P6C.steel,{seed:431,round:"v"});p6Box(t,98,40,6,56,P6C.steel,{seed:432,round:"v"});p6Box(t,12,42,40,22,P6C.steelW,{seed:433,bev:1});for(let q=0;q<2;q++){p6Box(t,14,44+q*10,36,8,P6C.steel,{seed:440+q,bev:1});p6Box(t,28,47+q*10,8,2,P6C.dark,{bev:0});}
  /* a CRT monitor with green text, keyboard, mug, papers, a swan-neck lamp */
  p6Box(t,36,6,40,28,P6C.dark,{seed:450,bev:2,nz:0.06});p6Box(t,40,10,32,20,[[2,16,8],[8,34,16]],{seed:451,bev:1,nz:0.02});p6Box(t,50,34,14,4,P6C.steelW,{seed:452,bev:1});for(let q=0;q<5;q++)t.rect(42,13+q*3,8+((q*7)%18),1,[60,255,130],0.9);t.light&&t.light(56,20,30,"#40ff80",0.4);
  p6Box(t,36,32,40,5,[[24,26,32],[60,64,76],[110,116,130]],{seed:453,bev:1});for(let x=38;x<74;x+=3)t.rect(x,33,2,1,[170,176,190],0.8);
  p6Box(t,84,24,8,10,[[160,150,130],[232,226,206]],{seed:454,round:"h",bev:1});t.rect(90,27,3,5,[200,190,170]);p6Box(t,2,30,24,5,[[200,196,180],[238,234,222]],{seed:455,bev:0});t.rect(4,31,18,1,[60,60,70],0.6);
  p6Limb(t,98,34,98,10,2,2,P6C.steel,{seed:456});p6Limb(t,98,10,86,4,2,2,P6C.steel,{seed:457});p6Box(t,80,0,14,6,P6C.brass,{seed:458,round:"h",bev:1});t.light&&t.light(86,8,22,"#ffd890",0.4);});}
function p6SprTv(){return p6Sprite("tvcart",84,86,(t)=>{p6Box(t,2,46,80,5,P6C.dark,{seed:460,bev:1});p6Box(t,6,51,4,34,P6C.steel,{seed:461,round:"v"});p6Box(t,74,51,4,34,P6C.steel,{seed:462,round:"v"});p6Box(t,6,66,72,3,P6C.steel,{seed:463,bev:0});p6Ell(t,8,84,4,3,P6C.rubber,{seed:464});p6Ell(t,76,84,4,3,P6C.rubber,{seed:465});
  /* the CRT set: a chunky cabinet, a curved glass screen, knobs, an aerial */
  p6Box(t,6,8,72,38,[[30,26,22],[70,62,52],[116,106,90],[160,150,130]],{seed:466,bev:2,nz:0.14});p6Box(t,12,12,48,30,P6C.dark,{seed:467,bev:2,nz:0.02});p6Box(t,14,14,44,26,[[6,16,18],[14,34,36]],{seed:468,bev:1,nz:0.03});t.rect(16,16,16,3,[255,255,255],0.12);
  p6Ell(t,68,18,4,4,P6C.steel,{seed:469});p6Ell(t,68,30,4,4,P6C.steel,{seed:470});for(let q=0;q<5;q++)t.rect(64,38+q*1.5,10,1,P6C.dark[0]);t.line(20,8,8,0,P6C.steel[4]);t.line(52,8,66,0,P6C.steel[4]);p6Ell(t,8,0,1.6,1.6,P6C.steel,{seed:471});
  /* the tape player underneath */
  p6Box(t,8,52,68,12,P6C.dark,{seed:472,bev:1,nz:0.05});p6Box(t,14,56,28,4,[[2,2,4],[10,10,14]],{seed:473,bev:1,nz:0});for(let q=0;q<4;q++)p6Box(t,48+q*6,55,4,3,P6C.steel,{seed:474+q,bev:1});t.rect(66,55,6,2,[60,255,130]);t.rect(8,64,68,1,P6C.steel[1],0.8);});}
function p6SprTapeShelf(){return p6Sprite("tapeshelf",62,92,(t)=>{p6Box(t,0,0,62,92,P6C.wood,{seed:480,bev:2,nz:0.14});p6Box(t,3,3,56,86,[[10,6,4],[24,14,8]],{seed:481,bev:1,nz:0.04});for(let q=0;q<4;q++)p6Box(t,3,22+q*22,56,3,P6C.wood,{seed:482+q,bev:1,nz:0.1});
  const cols=[[[60,14,14],[200,50,50],[250,140,130]],[[16,40,90],[58,130,220],[150,190,250]],[[90,74,12],[220,180,44],[250,226,130]],[[20,60,32],[60,170,96],[140,230,170]],[[30,30,34],[110,110,120],[200,200,210]],[[70,28,90],[160,90,210],[220,170,250]]];
  for(let r2=0;r2<4;r2++)for(let q=0;q<12;q++){if((q*7+r2*3)%11===0)continue;p6Box(t,5+q*4.5,6+r2*22,4,16,cols[(q+r2*2)%6],{seed:490+q+r2*12,bev:0,nz:0.05});t.rect(6+q*4.5,10+r2*22,2,6,[236,232,214],0.85);}},(g)=>{});}
function p6SprPower(){return p6Sprite("power",54,92,(t)=>{p6Box(t,0,0,54,92,[[22,22,18],[70,66,24],[150,134,40],[200,180,60]],{seed:500,bev:2,nz:0.1,rust:0.2});for(let q=0;q<5;q++)t.poly([[3+q*11,4],[9+q*11,4],[3+q*11,10],[-3+q*11,10]],q%2?[236,190,40]:[20,20,24]);
  p6Box(t,5,14,44,48,P6C.dark,{seed:501,bev:1,nz:0.05});for(let q=0;q<3;q++)for(let w=0;w<2;w++){p6Box(t,9+w*20,18+q*14,16,11,P6C.steel,{seed:510+q*2+w,bev:1});}
  p6Box(t,14,66,26,18,P6C.dark,{seed:520,bev:1});p6Box(t,18,70,18,6,[[4,20,30],[10,50,70]],{seed:521,bev:0});t.rect(20,78,14,3,[255,70,50]);for(let q=0;q<5;q++)t.rect(19+q*3,72,2,2,[110,230,255],0.7);},(g)=>{p6Label(g,"POWER",12,86,"#f0e8b0",3);});}
function p6SprDoor(){return p6Sprite("labdoor",56,96,(t)=>{p6Box(t,0,0,56,96,P6C.steel,{seed:530,bev:2,nz:0.1,rust:0.3,rivets:9});p6Box(t,6,6,44,90,[[2,4,8],[6,10,16]],{seed:531,bev:2,nz:0.02});for(let q=0;q<6;q++)t.poly([[6+q*8,2],[12+q*8,2],[6+q*8,8],[0+q*8,8]],q%2?[236,190,40]:[20,20,24]);p6Box(t,6,6,44,4,P6C.dark,{seed:532,bev:0});
  p6Box(t,0,28,6,36,P6C.dark,{seed:533,bev:1});p6Rust(t,0,0,56,96,534,0.5);t.light&&t.light(28,60,32,"#4060c0",0.2);},(g)=>{p6Label(g,"EMERGENCY",6,10,"#c8ccd4",3);});}
/* a status panel on the wall that blinks, with different readouts (the monitors that keep the tubes alive) */
function p6SprMonitor(){return p6Sprite("wallmon",40,28,(t)=>{p6Box(t,0,0,40,28,P6C.dark,{seed:540,bev:2,nz:0.05});p6Box(t,3,3,34,22,[[2,14,10],[6,28,20]],{seed:541,bev:1,nz:0.02});t.rect(4,4,32,1,[255,255,255],0.1);t.light&&t.light(20,14,24,"#30ff90",0.3);});}
/* ---------------- drawing the room ---------------- */
function p6Tube(tb,i){const x=tb.x,T=P6L.t,g=P6L_G;if(x<camX-20||x>camX+212)return;
  const col=tb.kind%3===0?[60,220,140]:tb.kind%3===1?[80,170,255]:[230,200,80],top=18,bot=78;
  ctx.drawImage(p6SprTubeTop(),0,0,64,22,x-16,top-11,32,11);
  if(tb.st==="broken"){/* the glass is gone: shards on the floor, a puddle of liquid, a dark empty frame, the cap hanging off */
    fill("rgba(6,16,20,.6)",x-11,top,22,bot-top);ctx.save();ctx.globalAlpha=0.55;ctx.drawImage(p6SprTubeGlass(),0,0,16,128,x-12,top,8,bot-top);ctx.drawImage(p6SprTubeGlass(),32,0,16,128,x+4,top+14,8,bot-top-30);ctx.restore();
    ctx.drawImage(p6SprTubeBase(),0,0,64,34,x-16,P6L_G-17,32,17);const pg=ctx.createRadialGradient(x,g,1,x,g,22);pg.addColorStop(0,"rgba("+col.join(",")+",.45)");pg.addColorStop(1,"rgba("+col.join(",")+",0)");ctx.fillStyle=pg;ctx.beginPath();ctx.ellipse(x,g+0.5,24,2.4,0,0,7);ctx.fill();
    for(let q=0;q<12;q++){const sx=x-14+((q*37)%28),sy=g-0.8-(q%3)*0.5;fill(q%2?"#e8fcff":"#8ac8d0",sx,sy,1.2+(q%3)*0.8,0.8);}glow(x,g-2,20,col.join(","),0.16);return;}
  /* liquid, caustics, the specimen, bubbles; then the glass over all of it */
  const gr=ctx.createLinearGradient(0,top+4,0,bot);gr.addColorStop(0,"rgba("+col.join(",")+",.2)");gr.addColorStop(1,"rgba("+col.map((c)=>c*0.45|0).join(",")+",.62)");ctx.fillStyle="#04100e";ctx.fillRect(x-10.5,top+4,21,bot-top-4);ctx.fillStyle=gr;ctx.fillRect(x-10.5,top+4,21,bot-top-4);
  for(let q=0;q<5;q++){ctx.globalAlpha=0.12+0.08*Math.sin(T/20+q+x);fill("#d8fff0",x-9+((q*5+T*0.05)%16),top+10+q*10+Math.sin(T/30+q)*2,5,0.8);}ctx.globalAlpha=1;
  fill("rgba(240,255,250,.5)",x-10.5,top+4,21,0.8);
  if(tb.st!=="empty"){const aw=P6L.aw[i]>0,bob=tb.st==="dead"?0:Math.sin(T/40+x)*1.2+(aw?Math.sin(T/3)*1.2:0),sp=p6SubjSprite(tb.kind);ctx.save();if(tb.st==="dead"){ctx.translate(x,bot-26);ctx.rotate(0.3);ctx.translate(-x,-(bot-26));}ctx.globalAlpha=tb.st==="dead"?0.9:0.96;ctx.drawImage(sp,0,0,40,112,x-10,bot-1-56+bob,20,56);ctx.restore();
    if(aw)fill("rgba(255,255,255,.25)",x-10.5+(Math.random()-0.5),top+4,1.2,bot-top-4);}
  for(let q=0;q<4;q++){const ph=((T*0.4+q*37+x)%60)/60,bx=x-8+((q*5+i*3)%16),by=bot-ph*(bot-top-8);ctx.globalAlpha=0.8*(1-ph);fill("#e8fff8",bx,by,0.9,0.9);ctx.globalAlpha=1;}
  ctx.drawImage(p6SprTubeGlass(),0,0,48,128,x-12,top,24,bot-top+4);
  ctx.drawImage(p6SprTubeBase(),0,0,64,34,x-16,g-17,32,17);
  const ok=tb.st==="dead"?0:1,bl=(T>>5)%2;fill(ok?(bl?"#3aff7a":"#1a6a3a"):"#ff3a2a",x-13,g-12,1.6,1.4);if(tb.st==="dead"){ctx.strokeStyle="rgba(240,255,250,.7)";ctx.lineWidth=0.5;ctx.beginPath();ctx.moveTo(x-10,top+4);ctx.lineTo(x-3,top+24);ctx.lineTo(x-8,top+42);ctx.moveTo(x+9,top+6);ctx.lineTo(x+3,top+30);ctx.stroke();glow(x,50,24,"140,255,110",0.25);}
  glow(x,48,28,col.join(","),0.1);}
function p6LabBack(){const S=p6S(),T=P6L.t,g=P6L_G,F=S.found,V=(x,w)=>x+w>camX&&x-w<camX+192;
  /* the door back to the dark route: an open blast door with night beyond */
  if(camX<50){p6Draw(p6SprDoor(),6,g);fill("#02030a",9,g-44,16,44);glow(16,g-20,26,"20,30,60",0.2);}
  P6_TUBES.forEach((tb,i)=>p6Tube(tb,i));
  /* wall monitors between the tubes */
  for(let x=300;x<1260;x+=172){if(x<camX-40||x>camX+232)continue;ctx.drawImage(p6SprMonitor(),0,0,40,28,x-10,34,20,14);const bars=((T>>3)+x)%7;for(let q=0;q<5;q++)fill(q<bars?"#3aff90":"#0c3a26",x-8+q*3.4,40,2.4,3);fill("#3aff90",x-8,36,((T>>2)+x)%14,0.8);}
  if(V(222,30)){p6Draw(p6SprBlueprint(),222-23,g-24+0.0);}
  if(V(150,60)){p6Draw(p6SprBench(),150-52,g);const x=150;glow(x-34,g-38,26,"255,246,200",0.28);
    if(!S.dis){const ic=p6Icon("blaster");if(ic&&ic.complete)ctx.drawImage(ic,x-4,g-37,14,14);}
    else if(!S.up){const b=[S.made.vupcore?"vupcore":null].filter(Boolean);for(const k of b){const ic=p6Icon(k);if(ic)ctx.drawImage(ic,x-4,g-38,14,14);}for(const [id,dx] of [["barrel",-12],["handle",2],["fullcan",16]]){}}
    else{const ic=p6Icon(S.up);ic&&ic.nodeType&&ctx.drawImage(ic,x-10,g-38,22,22);}}
  if(V(405,24)){p6Draw(p6SprCart(),405-17,g);if(!F.syr){for(let q=0;q<4;q++){fill("#cfe8f0",405+4+q*1.8,g-32,0.9,7);fill("#ff6a8a",405+4+q*1.8,g-29,0.9,2.4);}}}
  if(V(565,24)){p6Draw(p6SprSamples(),565-16,g);}
  if(V(690,26)){p6Draw(p6SprSteelShelf(),690-18,g);if(!F.pipe)fill("#f4f8fa",690-8,g-30,16,2);}
  if(V(760,24)){p6Draw(p6SprToolCab(),760-16,g);}
  if(V(825,24)){p6Draw(p6SprDrawers(),825-16,g);}
  if(V(885,24)){p6Draw(p6SprPipePanel(),885-16,g+10);if(!F.gauge){ctx.fillStyle="#e8e0c0";ctx.beginPath();ctx.arc(885-3,g-21,2.6,0,7);ctx.fill();fill("#8a8e94",885-4,g-18,2,3);}for(let q=0;q<3;q++){const a=(T/6+q*7)%20;fill("rgba(220,236,240,.35)",885-9+q*9,g-60-a*0.6,1+a*0.1,1);}}
  if(V(945,20)){p6Draw(p6SprLocker(),945-13,g);}
  if(V(1010,32)){p6Draw(p6SprDesk(),1010-27,g);}
  if(V(1085,26)){const x=1085;p6Draw(p6SprTv(),x-21,g);const on=!!P6L.tv;const sx=x-21+7,sy=g-43+7;fill(on?"#c8d8d8":"#0c1416",sx,sy,22,13);if(on){for(let q=0;q<10;q++)fill(q%2?"#8a9a9a":"#e8f0f0",sx+((q*7+T*3)%20),sy+((q*3+T)%11),2,0.8);fill("rgba(255,255,255,.18)",sx,sy+((T*0.6)%11),22,1);glow(x-2,g-34,28,"190,230,230",0.34);}fill(on?"#3aff7a":"#5a1a1a",x+17,g-26,1.4,1);}
  if(V(1150,22)){p6Draw(p6SprTapeShelf(),1150-15,g);}
  if(V(1205,20)){const x=1205;p6Draw(p6SprPower(),x-13,g);const open=F.power;if(!open){for(let q=0;q<3;q++)for(let w=0;w<2;w++){fill("#ffd23a",x-11+w*10,g-37+q*7,6,4);fill("#fff4b0",x-11+w*10,g-37+q*7,6,1);fill("#3aff7a",x-9.4+w*10,g-35.6+q*7,1.2,1);}}const lit=F.power?"#3aff7a":(F.desk?"#5aa8ff":"#ff3a2a");fill(lit,x-4,g-18,8,1.6);glow(x,g-17,8,F.power?"60,255,120":"255,60,40",0.4);}
  if(V(1278,20)){p6Draw(p6SprLocker(),1278-13,g);}
  for(const s of P6L.steam){ctx.globalAlpha=Math.max(0,s.a*0.4);fill("#d8e4e8",s.x,s.y,1.4+(1-s.a)*4,1+(1-s.a)*3);}ctx.globalAlpha=1;
  const e=De.slab||{};De.slab=Object.assign(e,{c:"60,90,90",l:"200,255,235",a:0.1,dk:0.5});}
