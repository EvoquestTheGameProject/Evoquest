/* ======================= PART 6 ART TOOLKIT =======================
   Everything new is painted the way the earlier chapters paint: the game's own per-pixel painter (Ae / Lt), dithered colour ramps
   (c6Ramp), noise (It), light from the upper left, rivets, rust, glass. Props are painted ONCE into small cached sprites. */
const P6C={
  steel:[[10,14,20],[26,34,44],[48,60,74],[78,94,110],[116,134,150],[158,176,192],[206,222,234]],
  steelW:[[16,18,22],[38,42,50],[66,72,82],[100,108,120],[142,150,162],[188,196,208]],
  dark:[[6,8,12],[14,18,24],[26,32,42],[42,50,62],[62,74,90]],
  rust:[[34,14,8],[70,30,12],[112,52,22],[158,82,34],[200,118,52],[232,158,86]],
  brass:[[36,24,6],[84,58,14],[142,102,26],[198,152,48],[238,204,100],[255,240,170]],
  conc:[[18,20,24],[40,44,50],[66,72,78],[98,104,108],[134,138,140],[172,174,172]],
  tile:[[56,74,80],[84,106,112],[116,140,146],[150,172,176],[190,208,210],[226,238,238]],
  white:[[96,112,120],[138,154,160],[178,192,196],[212,224,226],[238,246,246]],
  wood:[[26,14,8],[54,30,16],[88,54,28],[124,80,42],[164,112,62],[200,150,92]],
  rubber:[[6,6,8],[16,16,20],[30,30,36],[48,48,56]],
  green:[[10,36,22],[22,70,38],[40,110,56],[70,156,82],[112,204,110],[170,244,150]],
  armor:[[18,34,22],[34,62,36],[56,96,54],[82,132,74],[118,172,100],[168,214,142]],
  coral:[[60,14,10],[130,34,22],[200,66,40],[244,112,68],[255,170,120],[255,226,190]],
  cyan:[[6,30,44],[14,66,92],[30,112,148],[66,170,204],[132,222,244],[220,252,255]],
  glass:[[16,44,52],[30,78,86],[56,120,126],[100,170,172],[160,214,214],[230,250,250]],
  flesh:[[38,18,22],[84,38,44],[130,62,66],[176,100,98],[214,148,134],[240,196,176]],
  pale:[[34,44,40],[66,86,76],[104,130,112],[146,172,148],[190,210,182],[226,238,218]],
  bruise:[[28,18,40],[56,34,78],[92,58,116],[132,92,150],[176,134,184],[216,186,216]],
  grey:[[22,24,28],[48,52,58],[80,86,94],[116,122,130],[156,162,168],[198,202,206]]};
/* one noise value, shared by everything so neighbouring tiles line up */
const p6n=(x,y,s)=>It(x,y,s||1);
/* a shaded rectangle: light from the upper left, bevelled edges, optional round (cylinder) shading, rust, rivets */
function p6Box(t,x,y,w,h,pal,o){o=o||{};const sd=o.seed||3,nz=o.nz==null?0.16:o.nz,bev=o.bev==null?1:o.bev,rd=o.round,gv=o.grad==null?0.26:o.grad;x|=0;y|=0;w|=0;h|=0;
  for(let j=0;j<h;j++)for(let i=0;i<w;i++){const u=w>1?i/(w-1):0,vv=h>1?j/(h-1):0;let v;
    if(rd==="v")v=0.9-1.15*Math.abs(u-0.3)-0.1*(u>0.74?1:0);else if(rd==="h")v=0.9-1.15*Math.abs(vv-0.3)-0.1*(vv>0.74?1:0);else v=0.66-gv*vv+0.1*(1-u);
    v+=nz*(p6n((x+i)/5,(y+j)/4,sd)-0.5)*2;
    if(bev){if(j<bev)v+=0.3;if(i<bev)v+=0.18;if(j>=h-bev)v-=0.32;if(i>=w-bev)v-=0.22;}
    if(o.rust){const r=p6n((x+i)/7,(y+j)/9,sd+5)*(0.5+0.8*vv);if(r>1-o.rust*0.5-0.08){t.px(x+i,y+j,c6Ramp(P6C.rust,0.35+0.5*p6n((x+i)/3,(y+j)/3,sd+9),x+i,y+j));continue;}}
    t.px(x+i,y+j,c6Ramp(pal,v,x+i,y+j));}
  if(o.rivets){for(let i=3;i<w-2;i+=o.rivets)for(const yy of [2,h-3])p6Rivet(t,x+i,y+yy);}}
function p6Rivet(t,x,y){t.px(x,y,P6C.steel[2]);t.px(x-1,y-1,P6C.steel[5]);t.px(x+1,y+1,P6C.dark[1]);t.px(x,y-1,P6C.steel[4]);}
/* a shaded ellipse (a lit sphere): pal ramp, light from the upper left */
function p6Ell(t,cx,cy,rx,ry,pal,o){o=o||{};const sd=o.seed||2,nz=o.nz==null?0.1:o.nz,al=o.alpha;
  for(let y=Math.floor(cy-ry);y<=Math.ceil(cy+ry);y++)for(let x=Math.floor(cx-rx);x<=Math.ceil(cx+rx);x++){const nx=(x-cx)/rx,ny=(y-cy)/ry,d=nx*nx+ny*ny;if(d>1)continue;const nzv=Math.sqrt(1-d);
    let v=0.42+0.5*(-0.55*nx-0.62*ny+0.56*nzv)+nz*(p6n(x/4,y/4,sd)-0.5)*2;if(d>0.82)v-=0.12;t.px(x,y,c6Ramp(pal,v,x,y),al);}}
/* a tapered limb made of overlapping spheres */
function p6Limb(t,x0,y0,x1,y1,w0,w1,pal,o){const n=Math.max(2,Math.ceil(Math.hypot(x1-x0,y1-y0)/1.2));for(let k=0;k<=n;k++){const u=k/n,w=w0+(w1-w0)*u;p6Ell(t,x0+(x1-x0)*u,y0+(y1-y0)*u,w/2,w/2,pal,o);}}
function p6Rust(t,x,y,w,h,seed,k){for(let j=0;j<h;j++)for(let i=0;i<w;i++){const r=p6n((x+i)/6,(y+j)/10,seed)*(0.4+0.9*j/h);if(r>1-k*0.6)t.px(x+i,y+j,c6Ramp(P6C.rust,0.2+0.6*p6n((x+i)/3,(y+j)/3,seed+4),x+i,y+j),0.7);}}
function p6Streak(t,x,y,h,col,a,seed){for(let j=0;j<h;j++)if(p6n(x,j/6,seed)>0.35)t.px(x+(p6n(j/5,x,seed)>0.6?1:0),y+j,col,a*(1-j/h));}
/* panes: tinted translucent glass, diagonal glints, optional cracks */
function p6Glass(t,x,y,w,h,tint,a,seed,cracks){for(let j=0;j<h;j++)for(let i=0;i<w;i++){const d=(i+j*0.6)%11;let al=a*(0.7+0.5*p6n((x+i)/6,(y+j)/6,seed));let c=tint;if(d<1.6)c=[236,252,252],al=Math.min(0.6,a*1.6);else if(d>9.4)c=[20,40,48],al=a*0.9;t.px(x+i,y+j,c,al);}
  if(cracks){for(let q=0;q<cracks;q++){let cx=x+w*r(q,seed+1),cy=y+h*r(q,seed+2),an=r(q,seed+3)*6.28;for(let s=0;s<14+r(q,seed+4)*20;s++){cx+=Math.cos(an);cy+=Math.sin(an);an+=(r(s+q*9,seed+5)-0.5)*0.9;if(cx<x||cx>=x+w||cy<y||cy>=y+h)break;t.px(cx,cy,[226,248,250],0.85);t.px(cx+1,cy,[20,40,48],0.5);}}}}
/* a jagged shard polygon */
function p6Shard(t,x,y,w,h,seed,tint){const pts=[];const n=5+((r(seed,1)*3)|0);for(let k=0;k<n;k++){const a=k/n*6.283;pts.push([x+w/2+Math.cos(a)*w/2*(0.5+0.6*r(seed,k+3)),y+h/2+Math.sin(a)*h/2*(0.5+0.6*r(seed,k+9))]);}
  t.poly(pts,(px,py)=>{const u=(px-x)/w,v=(py-y)/h;return Ct(tint||[150,214,220],[236,252,252],Math.max(0,0.5-0.7*(u+v-0.6)));},0.8);}
/* paint a small sprite once: fn(t) draws in 0..w,0..h of the game's 384x216 painter, then it is cropped */
const P6S={};
function p6Sprite(key,w,h,fn,post){if(P6S[key])return P6S[key];const big=Ae(fn),c=document.createElement("canvas");c.width=w;c.height=h;const g=c.getContext("2d");g.imageSmoothingEnabled=!1;g.drawImage(big,0,0,w,h,0,0,w,h);if(post)post(g,w,h);return(P6S[key]=c);}
/* draw a sprite so that one sprite pixel is half a world unit; (x,y) is the left-bottom corner */
function p6Draw(cv,x,yBottom,flip){const w=cv.width/2,h=cv.height/2;if(flip){ctx.save();ctx.translate(x+w,0);ctx.scale(-1,1);ctx.drawImage(cv,0,0,cv.width,cv.height,0,yBottom-h,w,h);ctx.restore();}else ctx.drawImage(cv,0,0,cv.width,cv.height,x,yBottom-h,w,h);}
/* ---------------- the three weapons, painted big (160x64 px) ---------------- */
function p6WeaponSprite(k){return p6Sprite("w_"+k,176,72,(t)=>{
  const S=P6C.steel,D=P6C.dark;
  if(k==="gusher"){
    /* stock: dark wood with a rubber butt pad and finger-groove checkering */
    t.poly([[8,28],[42,24],[42,40],[26,44],[8,47]],(x,y)=>c6Ramp(P6C.wood,0.86-0.8*(y-25)/22+0.28*(p6n(x/3,y/2,11)-0.5),x,y));for(let q=0;q<9;q++)t.line(10+q*3.4,28,9+q*3.4,45,P6C.wood[1],0.4);t.line(8,28,42,24,P6C.wood[5],0.8);p6Box(t,2,25,6,22,P6C.rubber,{seed:12,bev:1});
    p6Box(t,36,28,6,10,D,{seed:13});
    /* receiver: heavy steel body with panel lines, a warning stripe and bolts */
    p6Box(t,40,22,60,22,S,{seed:14,rust:0.25,bev:1,rivets:9});t.rect(40,35,60,1,D[1],0.8);t.rect(62,22,1,22,D[1],0.8);t.rect(86,22,1,22,D[1],0.8);
    for(let q=0;q<6;q++){t.poly([[66+q*3,24],[69+q*3,24],[66+q*3,28],[63+q*3,28]],q%2?[236,170,40]:[22,22,26]);}
    p6Box(t,70,29,14,7,D,{seed:15,bev:0});t.rect(71,30,12,1,[18,18,24]);p6Box(t,72,31,8,3,P6C.brass,{seed:16,bev:0});/* ejection port with a brass bolt */
    t.rect(44,26,12,5,[10,14,20]);for(let q=0;q<5;q++)t.rect(45+q*2,27,1,3,[255,120,70],0.9);/* vent lights */
    /* rail + scope: a red-dot sight in a steel hood */
    p6Box(t,46,16,52,5,D,{seed:17,bev:1});for(let q=0;q<10;q++)t.rect(48+q*5,16,2,1,S[4]);
    p6Box(t,60,6,22,12,S,{seed:18,round:"h",bev:1});p6Box(t,74,8,10,8,D,{seed:19,bev:0});p6Ell(t,79,12,3.6,3.6,P6C.coral,{seed:7});t.px(78,11,[255,240,230]);
    t.light&&t.light(79,12,16,"#ff6a4a",0.5);
    /* barrel: fluted steel with a vented shroud and a slotted muzzle brake */
    p6Box(t,100,27,34,10,S,{seed:20,round:"h",bev:0});p6Box(t,100,24,30,16,D,{seed:21,round:"h",bev:1,rivets:6});for(let q=0;q<6;q++){p6Box(t,104+q*5,28,3,8,[[6,8,12],[40,24,20],[130,50,30]],{bev:0,nz:0});}
    p6Box(t,134,24,16,16,S,{seed:22,round:"h",bev:1});for(let q=0;q<3;q++)t.rect(137+q*4,26,2,12,D[0]);p6Box(t,148,28,12,8,D,{seed:23,round:"h"});t.rect(158,30,2,4,[10,6,6]);
    /* the venom tank under the barrel: glass tube, glowing coral venom, brass end caps, a pressure gauge */
    p6Box(t,56,44,56,16,[[20,40,48],[40,80,90],[70,120,126],[130,180,186]],{seed:24,round:"h",bev:0,nz:0.05});
    for(let j=0;j<12;j++)for(let i=0;i<50;i++){const lv=0.68;if(j>=16*(1-lv)-2){const n=p6n((60+i)/4,(46+j)/3,31);const v=0.72-0.5*Math.abs(j/12-0.3)+0.3*(n-0.5);t.px(60+i,47+j,c6Ramp(P6C.coral,v,60+i,47+j));}}
    for(let q=0;q<6;q++)t.px(62+((q*17)%46),48+((q*7)%9),[255,240,220],0.9);t.rect(60,47,50,1,[255,210,180],0.6);
    p6Box(t,52,42,8,20,P6C.brass,{seed:25,round:"h",bev:1});p6Box(t,108,42,8,20,P6C.brass,{seed:26,round:"h",bev:1});
    p6Ell(t,86,38,5,5,P6C.brass,{seed:27});p6Ell(t,86,38,3.6,3.6,[[240,236,220],[250,246,236]],{nz:0});t.line(86,38,89,35,[190,30,24]);t.px(86,38,[20,20,20]);
    t.light&&t.light(84,52,34,"#ff6a3a",0.45);
    /* grip, trigger guard */
    p6Box(t,36,44,11,24,P6C.wood,{seed:28,round:"v",bev:1});for(let q=0;q<8;q++)t.line(37,47+q*2.6,46,47+q*2.6,P6C.wood[1],0.55);
    t.rect(48,44,16,2,S[2]);t.rect(62,44,2,10,S[2]);t.rect(48,52,16,2,S[2]);p6Box(t,50,44,3,8,D,{bev:0});
    p6Rust(t,40,22,60,22,41,0.3);
  }else if(k==="sweeper"){
    /* a skeleton stock with a cheek pad */
    p6Box(t,2,24,6,22,P6C.rubber,{seed:40});t.rect(8,28,30,3,S[2]);t.rect(8,40,30,3,S[2]);t.rect(8,28,3,15,S[2]);p6Box(t,14,20,22,6,P6C.rubber,{seed:41});
    /* the body: thick green armour plates, hazard stripes, bolts */
    p6Box(t,36,18,70,32,P6C.armor,{seed:42,rust:0.18,bev:1,rivets:8});p6Box(t,36,18,70,6,P6C.dark,{seed:43,bev:0});
    for(let q=0;q<9;q++)t.poly([[40+q*7,19],[44+q*7,19],[41+q*7,24],[37+q*7,24]],q%2?[240,196,40]:[20,20,24]);
    t.rect(36,36,70,1,P6C.armor[0],0.9);t.rect(70,24,1,26,P6C.armor[0],0.9);
    /* the drum: a heavy cylinder with five chambers, each holding a glowing venom bomb */
    p6Ell(t,62,38,17,17,P6C.steel,{seed:44});p6Ell(t,62,38,14.4,14.4,P6C.dark,{seed:45,nz:0.04});
    for(let q=0;q<5;q++){const a=q/5*6.283-1.57,bx=62+Math.cos(a)*8.4,by=38+Math.sin(a)*8.4;p6Ell(t,bx,by,4.2,4.2,P6C.green,{seed:46+q});t.px(bx-1,by-1,[240,255,230]);t.light&&t.light(bx,by,9,"#8aff6a",0.45);}
    p6Ell(t,62,38,3.6,3.6,P6C.brass,{seed:47});t.px(61,37,[255,248,200]);for(let q=0;q<10;q++){const a=q/10*6.283;t.px(62+Math.cos(a)*16,38+Math.sin(a)*16,[190,206,220]);}
    /* the muzzle: a short fat barrel with a flared mouth and hex bolts */
    p6Box(t,104,26,28,18,P6C.steel,{seed:48,round:"h",bev:1});p6Box(t,126,22,18,26,P6C.steel,{seed:49,round:"h",bev:1,rivets:5});p6Box(t,142,26,8,18,P6C.dark,{seed:50,round:"h"});t.rect(146,30,4,10,[4,10,4]);t.rect(147,32,2,6,[120,255,100],0.9);
    for(let q=0;q<3;q++)p6Rivet(t,129+q*5,25);
    /* carry handle, pump, grip */
    p6Box(t,52,10,32,6,P6C.steel,{seed:51,round:"h",bev:1});t.rect(54,15,4,4,S[2]);t.rect(78,15,4,4,S[2]);
    p6Box(t,86,38,10,6,P6C.brass,{seed:52,bev:1});p6Box(t,110,44,14,6,P6C.steel,{seed:53,round:"h"});
    p6Box(t,44,50,12,20,P6C.rubber,{seed:54,round:"v"});t.rect(58,50,16,2,S[2]);t.rect(72,50,2,8,S[2]);
    /* a warning decal and glowing vents */
    t.poly([[90,28],[100,28],[95,20]],[240,196,40]);t.px(95,24,[20,20,24]);t.px(95,26,[20,20,24]);
    for(let q=0;q<4;q++){t.rect(96,42+q*2,6,1,[120,255,100],0.9);}
    p6Rust(t,36,18,70,32,60,0.3);
  }else{
    /* hypervex: a slim marksman rifle, dark carbon, cyan light strips */
    p6Box(t,4,26,32,14,P6C.dark,{seed:70,round:"h",bev:1});t.rect(8,28,24,1,[40,200,240],0.9);p6Box(t,2,24,6,20,P6C.rubber,{seed:71});p6Box(t,16,22,16,5,P6C.rubber,{seed:72});
    p6Box(t,10,40,6,10,P6C.dark,{seed:73});t.rect(12,44,2,6,S[2]);
    p6Box(t,36,24,50,16,S,{seed:74,bev:1,rivets:9,rust:0.1});t.rect(36,32,50,1,P6C.dark[1],0.8);
    for(let q=0;q<10;q++)t.rect(40+q*4,25,2,1,[30,230,255],0.9);t.light&&t.light(60,26,30,"#30e0ff",0.35);
    p6Box(t,50,30,20,4,P6C.cyan,{seed:75,bev:0,nz:0.05});
    /* the scope: a long steel tube, big objective lens, turrets */
    p6Box(t,40,14,10,8,P6C.dark,{seed:76,bev:1});p6Box(t,74,14,10,8,P6C.dark,{seed:77,bev:1});
    p6Box(t,38,6,52,11,P6C.steelD||P6C.dark,{seed:78,round:"h",bev:0});p6Box(t,38,6,52,11,S,{seed:78,round:"h",bev:1});
    p6Box(t,82,4,10,15,P6C.dark,{seed:79,round:"h",bev:1});p6Ell(t,92,11.5,3.5,7,P6C.cyan,{seed:80,nz:0.02});t.px(91,8,[255,255,255]);t.px(92,9,[210,250,255]);t.light&&t.light(92,12,14,"#80e0ff",0.4);
    p6Box(t,30,7,10,9,P6C.dark,{seed:81,round:"h",bev:1});p6Ell(t,33,11.5,2.6,4.6,P6C.cyan,{seed:82,nz:0.02});
    p6Box(t,58,2,6,5,S,{seed:83,round:"h"});p6Box(t,66,3,6,4,S,{seed:84,round:"h"});for(let q=0;q<4;q++)t.rect(59+(q%2)*8,3+q,4,1,P6C.dark[0]);
    /* barrel: very long, fluted, with a suppressor on the end */
    p6Box(t,86,28,56,6,S,{seed:85,round:"h",bev:0});for(let q=0;q<9;q++){t.rect(90+q*6,29,3,4,[10,16,22],0.9);}
    p6Box(t,142,25,28,12,P6C.dark,{seed:86,round:"h",bev:1,rivets:6});t.rect(168,29,2,4,[2,4,6]);for(let q=0;q<4;q++)t.rect(146+q*6,26,2,10,P6C.steel[1]);
    /* foregrip rail and a folded bipod */
    p6Box(t,88,34,40,4,P6C.dark,{seed:87,bev:1});for(let q=0;q<8;q++)t.rect(90+q*5,35,2,2,S[3]);
    t.line(104,38,98,56,S[2]);t.line(105,38,99,56,S[3]);t.line(112,38,118,56,S[2]);t.line(113,38,119,56,S[3]);p6Box(t,95,55,8,3,P6C.rubber);p6Box(t,115,55,8,3,P6C.rubber);
    /* magazine */
    p6Box(t,52,40,12,18,P6C.dark,{seed:88,bev:1});for(let q=0;q<3;q++)t.rect(54,44+q*4,8,1,[30,230,255],0.8);
    p6Box(t,70,40,4,12,P6C.dark,{seed:89});t.rect(66,40,10,2,S[2]);t.rect(74,40,2,10,S[2]);
  }
  t.light&&0;});}
/* draw a weapon sprite onto any 2d context, centred */
function p6WeaponArt(g,k,cx,cy,sc,T,hot){const cv=p6WeaponSprite(k),w=cv.width*sc/1.5,h=cv.height*sc/1.5;g.save();g.imageSmoothingEnabled=!1;g.drawImage(cv,Math.round(cx-w/2),Math.round(cy-h/2),w,h);
  if(hot){const a=0.5+0.5*Math.sin(T/10);g.globalCompositeOperation="lighter";g.globalAlpha=0.1+0.14*a;g.drawImage(cv,Math.round(cx-w/2),Math.round(cy-h/2),w,h);}g.restore();}
