/* ======================= PART 6E ART: THE TEST RANGE (painted) ======================= */
function p6SprBrute(){return p6Sprite("brute",64,104,(t)=>{/* an armoured training brute: bolted steel plates over a hydraulic frame, a bullseye on the chest */
  p6Box(t,6,92,52,12,P6C.dark,{seed:600,bev:2,rivets:8});p6Box(t,10,88,44,6,P6C.steel,{seed:601,bev:1});
  p6Box(t,14,56,8,34,P6C.dark,{seed:602,round:"v"});p6Box(t,42,56,8,34,P6C.dark,{seed:603,round:"v"});p6Box(t,12,54,12,8,P6C.steelW,{seed:604,bev:1,rivets:6});p6Box(t,40,54,12,8,P6C.steelW,{seed:605,bev:1,rivets:6});
  p6Box(t,6,18,52,40,P6C.steel,{seed:606,bev:2,rust:0.3,nz:0.14,rivets:9});for(const x of [20,44])t.rect(x,18,1,40,P6C.dark[1],0.8);
  for(const [rr,c] of [[17,[[90,10,10],[200,40,30],[250,110,90]]],[12,[[200,196,180],[236,232,220],[250,250,244]]],[7,[[90,10,10],[200,40,30],[250,110,90]]],[3,[[200,196,180],[236,232,220]]]])p6Ell(t,32,38,rr,rr,c,{seed:rr,nz:0.03});
  p6Box(t,2,20,10,30,P6C.steelW,{seed:607,round:"h",bev:1,rivets:8});p6Box(t,52,20,10,30,P6C.steelW,{seed:608,round:"h",bev:1,rivets:8});p6Box(t,2,46,10,14,P6C.dark,{seed:609,bev:1});p6Box(t,52,46,10,14,P6C.dark,{seed:610,bev:1});
  p6Box(t,20,2,24,18,P6C.steelW,{seed:611,bev:2,rust:0.2,rivets:7});p6Box(t,22,8,20,4,P6C.dark,{seed:612,bev:0});t.rect(24,9,6,2,[255,50,40]);t.rect(34,9,6,2,[255,50,40]);t.light&&t.light(27,10,10,"#ff3a2a",0.5);t.light&&t.light(37,10,10,"#ff3a2a",0.5);
  for(let q=0;q<6;q++)t.poly([[6+q*9,56],[12+q*9,56],[6+q*9,62],[0+q*9,62]],q%2?[226,176,40]:[18,20,24]);p6Rust(t,6,18,52,40,613,0.5);},(g)=>{p6Label(g,"ARMOUR",16,62,"#ffd878",4);});}
function p6SprPod(){return p6Sprite("pod",22,24,(t)=>{p6Ell(t,11,12,9,9,P6C.steel,{seed:620});p6Ell(t,11,12,6,6,P6C.dark,{seed:621,nz:0.02});p6Ell(t,11,12,3.4,3.4,P6C.coral,{seed:622});t.px(10,11,[255,240,230]);for(const a of [0,2.1,4.2]){p6Limb(t,11+Math.cos(a)*8,12+Math.sin(a)*8,11+Math.cos(a)*11,12+Math.sin(a)*11,3,2,P6C.steelW,{seed:a});}p6Box(t,8,20,6,3,P6C.dark,{bev:0});t.light&&t.light(11,12,10,"#ff5a3a",0.5);});}
function p6SprFar(){return p6Sprite("far",24,56,(t)=>{p6Box(t,10,24,4,30,P6C.dark,{seed:630,round:"v"});p6Box(t,2,50,20,5,P6C.steel,{seed:631,bev:1});p6Box(t,3,20,18,22,P6C.steelW,{seed:632,bev:1,rust:0.2,rivets:7});p6Ell(t,12,10,8,9,[[200,196,180],[236,232,220],[250,250,244]],{seed:633,nz:0.03});for(const rr of [7,4])p6Ell(t,12,10,rr*0.85,rr,[[110,12,12],[210,44,34],[250,120,100]],{seed:rr,nz:0.02});p6Ell(t,12,10,1.6,1.6,[[255,240,230]],{nz:0});});}
function p6SprRack(){return p6Sprite("rack",34,64,(t)=>{p6Box(t,0,0,34,64,P6C.dark,{seed:640,bev:2,rust:0.2});for(let q=0;q<3;q++){p6Box(t,3,4+q*17,28,14,P6C.steel,{seed:641+q,bev:1});for(let w=0;w<3;w++){p6Box(t,5+w*9,6+q*17,7,10,P6C.green,{seed:650+q*3+w,round:"v",bev:0,nz:0.04});t.rect(6+w*9,7+q*17,2,8,[220,255,200],0.4);t.light&&t.light(8+w*9,11+q*17,6,"#8aff6a",0.4);}}
  p6Box(t,8,56,18,6,P6C.dark,{seed:660,bev:1});t.rect(10,58,14,2,[60,255,130]);},(g)=>{p6Label(g,"REFILL",4,1,"#d8ffd0",3);});}
function p6SprBanner(){return p6Sprite("banner",320,22,(t)=>{p6Box(t,0,0,320,22,P6C.dark,{seed:670,bev:2,rivets:12});for(let q=0;q<40;q++)t.poly([[q*8,0],[q*8+4,0],[q*8,3],[q*8-4,3]],q%2?[226,176,40]:[18,20,24]);for(let q=0;q<40;q++)t.poly([[q*8,19],[q*8+4,19],[q*8,22],[q*8-4,22]],q%2?[226,176,40]:[18,20,24]);},(g)=>{p6Label(g,"TEST RANGE: CHOOSE YOUR TARGET",20,7,"#ffe070",7);});}
function p6TgDraw(t){const b=p6TgBox(t),x=t.x,y=t.y;if(x<camX-30||x>camX+222)return;const dead=t.hp<=0,fl=t.flash>0;
  if(dead){ctx.globalAlpha=Math.max(0,t.rt>330?1:0.12);}
  let sp,w,h,dy=0;if(t.kind==="brute"){sp=p6SprBrute();w=32;h=52;}else if(t.kind==="pod"){sp=p6SprPod();w=11;h=12;dy=-4+Math.sin(P6L.t/16+t.ph)*1.4;}else{sp=p6SprFar();w=12;h=28;}
  const px=x-w/2,py=y-h+dy-(t.kind==="pod"?0:0);ctx.drawImage(sp,0,0,sp.width,sp.height,px,py,w,h);
  if(fl){ctx.globalCompositeOperation="lighter";ctx.globalAlpha=(dead?0.1:0.55);ctx.drawImage(sp,0,0,sp.width,sp.height,px,py,w,h);ctx.globalCompositeOperation="source-over";}
  if(t.kind==="pod")glow(x,py+6,7,"255,60,40",0.3);
  if(!dead){const bw=Math.max(10,t.w);fill("rgba(0,0,0,.6)",x-bw/2,b.y0-7,bw,2);fill(t.hp/t.max>0.5?"#6aff7a":t.hp/t.max>0.25?"#ffd23a":"#ff4a3a",x-bw/2,b.y0-7,bw*t.hp/t.max,2);}
  if(t.ven&&!dead){for(let q=0;q<Math.min(5,t.ven.n);q++)fill("#8aff6a",x-6+q*3,b.y0-10+Math.sin(P6L.t/6+q)*0.6,1.6,1.6);}
  ctx.globalAlpha=1;}
