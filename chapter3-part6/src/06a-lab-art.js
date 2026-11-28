/* ======================= PART 6D ART: THE CONTAINMENT CHAMBER, painted =======================
   The walls use the chapter 1 lab painter (Me: panels, pipes, lamps, perspective floor) with a cold containment palette and the
   chapter 1 overgrowth (we: vines, moss, flowers) creeping in. Every prop and every specimen is a shaded, cached sprite. */
const P6_LABPAL=[
  {g:["#7c9cac","#8eb0be","#7c9cac","#5f8294"],s0:"#38505c",lit:"#e8f8ff",wain:"#9ab6c2",ceil:"#6a828a",pipe:["#8aa2ac","#a8bec6","#6a828c"],lamps:[22,150,278],lamp:"#ffffff",lampc:"#e8f8ff",floor:["#d2dcde","#b4c4c8","#94a6ac"],fl:"#6e8890"},
  {g:["#3e6270","#4c7886","#3e6270","#2e5260"],s0:"#1c3038",lit:"#9ad8ea",wain:"#5a8494",ceil:"#3a4e58",pipe:["#546c78","#6c8894","#3e5260"],lamps:[22,150,278],lamp:"#e8fff8",lampc:"#a8ffe0",floor:["#8aa0a8","#6a8088","#50646c"],fl:"#4a6a78"},
  {g:["#0e1a20","#16282f","#1e3640","#274656"],s0:"#050b0e",lit:"#4a8a9c",wain:"#0f1c22",ceil:"#060c10",pipe:["#2a3a46","#3a5260","#1e2a34"],lamps:[40,170,300],lamp:"#cffff0",lampc:"#7affd0",floor:["#1c2a32","#121b22","#0a1016"],fl:"#2f5a6a"}];
{const _t=c5Tile;c5Tile=function(id,i,seed){if(id!=="slab")return _t(id,i,seed);const k=id+i;return C5.tiles[k]||(C5.tiles[k]=p6LabTile(i,seed));};}
function p6LabTile(i,seed){const pal=P6_LABPAL[i<=1?0:i<=3?1:2],clean=i<=1;
  const cv=Ae((t)=>{Me(t,pal);
    /* wall plating: bolted seams, stencilled bays, stains, scorch marks, hazard bands */
    for(let x=0;x<384;x+=64){for(let y=30;y<134;y+=34){for(const [bx,by] of [[x+14,y+2],[x+50,y+2],[x+14,y+22],[x+50,y+22]])p6Rivet(t,bx,by);}t.rect(x+5,26,1,112,clean?[230,246,250]:[70,120,136],0.35);}
    for(let k=0;k<9;k++){const sx=r(k,seed+3)*384,sy=26+r(k,seed+4)*100,w=3+r(k,seed+5)*10;for(let j=0;j<20+r(k,seed+6)*60;j++){const a=0.3*(1-j/80);if(p6n(sx,j/7,seed)>0.3)t.px(sx+Math.sin(j/5+k)*0.8,sy+j,clean?[110,130,138]:[6,10,12],a+0.15);}if(r(k,7)<0.4)t.rect(sx,sy+30,w,1,[34,70,60],0.4);}
    for(let k=0;k<6;k++){const sx=r(k,seed+8)*340,sy=34+r(k,seed+9)*80;if(r(k,seed+10)<0.5)for(let q=0;q<10;q++)t.poly([[sx+q*7,sy],[sx+4+q*7,sy],[sx+q*7-4,sy+8],[sx+q*7-8,sy+8]],q%2?[226,176,40]:[18,20,24],clean?0.5:0.7);}
    /* a bold colour band, like the chapter 1 lab's: blue in the clean bay, hazard orange deeper in */
    t.rect(0,128,384,4,clean?[36,110,170]:[190,120,30]);t.rect(0,128,384,1,clean?[110,180,230]:[250,190,90]);t.rect(0,132,384,1,[4,10,16],0.6);for(let x=0;x<384;x+=24)t.rect(x,129,10,2,[255,255,255],0.15);
    /* lower wall band: riveted kick plates and drains */
    for(let x=0;x<384;x+=48){p6Box(t,x+2,146,44,20,clean?P6C.tile:P6C.steelW,{seed:seed+x,bev:1,nz:0.1,rust:clean?0:0.22});p6Rivet(t,x+5,149);p6Rivet(t,x+43,149);}
    if(!clean){/* the chapter 1 overgrowth, creeping in through cracks in the ceiling */we(t,seed,{n:3,len:64});}
    t.light&&(t.light(80,10,100,clean?"#ffffff":"#7affd0",clean?0.4:0.26),t.light(300,10,100,clean?"#ffffff":"#7affd0",clean?0.4:0.26));});
  const g=cv.getContext("2d");g.font='6px "Press Start 2P",monospace';g.textBaseline="top";g.fillStyle=clean?"rgba(40,60,70,.8)":"rgba(120,220,200,.35)";
  ["BAY A-"+(i*2+1),"BAY A-"+(i*2+2)].forEach((s2,q)=>g.fillText(s2,36+q*190,34));g.fillStyle=clean?"rgba(40,60,70,.6)":"rgba(220,180,60,.4)";g.fillText(clean?"SECTOR C":"CONTAINMENT",170,128);return cv;}
/* ---------------- the specimens: the Evolved, each with different body parts (painted, 36x108 px) ---------------- */
function p6SubjSprite(kind){return p6Sprite("subj"+kind,40,112,(t)=>{
  const sk=[P6C.pale,P6C.grey,P6C.bruise,P6C.flesh,P6C.pale,P6C.grey,P6C.flesh,P6C.bruise][kind],ey=[[255,236,90],[255,70,50],[120,255,150],[255,160,60],[255,70,70],[170,120,255],[255,236,90],[120,240,255]][kind];
  const O={seed:kind*7+2,nz:0.08},fl=P6C.flesh;
  /* ragged hospital gown */
  const gown=()=>{t.poly([[10,46],[30,46],[32,80],[28,86],[22,82],[18,88],[12,82],[8,86],[8,80]],(x,y)=>c6Ramp([[40,70,86],[70,110,128],[110,150,166],[160,190,204]],0.7-0.3*(y-46)/40+0.2*p6n(x/3,y/3,kind),x,y),0.92);for(let q=0;q<5;q++)t.rect(10+q*4,80+(q%2)*3,2,6,[40,70,86],0.8);};
  const legs=()=>{p6Limb(t,15,78,13,102,7,5,sk,O);p6Limb(t,25,78,27,102,7,5,sk,O);p6Ell(t,12,104,5,2.5,sk,O);p6Ell(t,28,104,5,2.5,sk,O);};
  const head=(cx,cy,rx,ry)=>{p6Ell(t,cx,cy,rx,ry,sk,O);p6Ell(t,cx,cy+ry*0.55,rx*0.7,ry*0.4,P6C.dark,{nz:0,alpha:0.5});t.rect(cx-rx*0.5,cy+ry*0.55,rx,1,[40,6,8]);};
  const hx=ey.map((c)=>("0"+Math.round(c).toString(16)).slice(-2)).join(""),eye=(x,y,r)=>{p6Ell(t,x,y,r,r*0.8,[[30,10,10],ey.map((c)=>c*0.5|0),ey,[255,255,255]],{nz:0});t.light&&t.light(x,y,r*3.4,"#"+hx,0.5);};
  const veins=(x0,y0,n)=>{for(let q=0;q<n;q++){let x=x0+q*3,y=y0;for(let j=0;j<9;j++){x+=(r(j+q*5,kind)-0.5)*2.4;y+=2.4;t.px(x,y,[110,30,40],0.8);}}};
  if(kind===3){/* leathery wings, folded behind the shoulders */for(const s of [-1,1]){const pts=[[18+s*5,36],[18+s*20,22],[18+s*18,48],[18+s*14,44],[18+s*13,66],[18+s*9,56]];t.poly(pts,(x,y)=>c6Ramp([[24,14,30],[56,34,64],[92,62,102],[130,98,140]],0.55-0.3*Math.abs(x-18)/16+0.25*p6n(x/3,y/3,3),x,y),0.95);for(const [px,py] of pts.slice(1,4))t.line(18+s*5,36,px,py,[170,130,180],0.8);}}
  if(kind===5){for(let q=0;q<7;q++){const y=36+q*6;t.poly([[26,y],[34,y-2+q%2],[27,y+5]],(x,yy)=>c6Ramp(P6C.steel,0.7-0.5*(x-26)/8,x,yy));}}
  if(kind===2){let px=24,py=80;for(let j=0;j<40;j++){const a=j*0.22+0.3;px+=Math.cos(a)*0.9+0.2;py+=Math.sin(a)*0.7+0.55;p6Ell(t,px,py,3.4-j*0.06,3.4-j*0.06,P6C.bruise,O);}}
  legs();gown();
  /* torso: ribs showing through, veins, sutures */
  p6Ell(t,20,48,9,16,sk,O);for(let q=0;q<5;q++){t.line(13,40+q*4,27,41+q*4,[20,24,30],0.4);t.line(13,39+q*4,27,40+q*4,sk[4],0.25);}veins(15,38,4);for(let q=0;q<4;q++)t.line(17,60+q,23,62+q,[200,200,210],0.6);
  if(kind===4){p6Ell(t,20,62,12,13,sk,O);veins(12,54,5);}
  if(kind===7){for(let q=0;q<8;q++){const cx=10+((q*9)%22),cy=36+((q*13)%34);t.poly([[cx,cy],[cx+2,cy-6-q%3],[cx+4,cy]],(x,y)=>c6Ramp(P6C.cyan,0.8-0.7*(y-cy+6)/6,x,y));t.light&&t.light(cx+2,cy-3,6,"#7affff",0.45);}}
  /* arms */
  const arm=(sx,sy,ex,ey2,hx,hy,w)=>{p6Limb(t,sx,sy,ex,ey2,w,w*0.8,sk,O);p6Limb(t,ex,ey2,hx,hy,w*0.8,w*0.55,sk,O);};
  if(kind===0){arm(12,38,5,54,6,70,5);arm(28,38,35,54,34,70,5);arm(13,44,8,60,10,74,4.4);arm(27,44,32,60,30,74,4.4);}
  else if(kind===1){arm(12,38,4,60,5,90,5);arm(28,38,36,60,35,90,5);for(const hx of [5,35])for(let q=-1;q<=1;q++)t.line(hx,90,hx+q*2.4,98+Math.abs(q),[236,230,214]);}
  else{arm(12,38,6,56,8,72,5);arm(28,38,34,56,32,72,5);}
  if(kind===6){/* a hound's head: long snout, ears, teeth */p6Ell(t,18,26,6,6,sk,O);p6Ell(t,26,30,7,3.4,sk,O);t.rect(21,32,10,1,[30,6,8]);for(let q=0;q<4;q++)t.px(22+q*2,33,[240,236,224]);p6Ell(t,12,19,2.4,5,sk,O);p6Ell(t,22,19,2.4,5,sk,O);eye(20,26,1.8);}
  else if(kind===2){head(20,28,7,8);for(const [ex,ey2,r2] of [[16,24,1.8],[24,24,1.8],[20,28,2.4],[15,30,1.4],[25,30,1.4]])eye(ex,ey2,r2);}
  else if(kind===4){head(14,28,5,6);head(26,30,5,6);eye(12,27,1.5);eye(16,27,1.5);eye(24,29,1.5);eye(28,29,1.5);}
  else if(kind===5){p6Ell(t,20,28,6,7,sk,O);for(let q=0;q<6;q++){t.line(15+q*1.8,31,15+q*1.8,34,[240,236,224]);}t.rect(15,32,11,1,[30,6,8]);}
  else{head(20,28,6.5,7.5);eye(17,26,1.8);eye(23,26,1.8);}
  /* a barcode tag on the wrist, and a drip of fluid */
  t.rect(31,70,4,2,[230,230,236]);for(let q=0;q<3;q++)t.px(31+q,70,[10,10,10]);});}
/* ---------------- the tube parts ---------------- */
function p6SprTubeBase(){return p6Sprite("tubeBase",64,34,(t)=>{p6Box(t,0,6,64,28,P6C.steel,{seed:120,bev:1,rust:0.25,rivets:9});p6Box(t,4,0,56,8,P6C.steelW,{seed:121,round:"h",bev:1});
  for(let q=0;q<9;q++)t.rect(8+q*6,12,3,12,P6C.dark[0]);p6Box(t,6,22,18,8,P6C.dark,{seed:122,bev:1});for(let q=0;q<4;q++)t.rect(8+q*4,24,2,4,[40,255,140],0.9);
  p6Ell(t,44,19,6,6,P6C.brass,{seed:123});p6Ell(t,44,19,4.2,4.2,[[226,222,206],[250,248,240]],{nz:0});t.line(44,19,47,16,[190,30,24]);p6Box(t,52,14,8,14,P6C.dark,{seed:124,bev:1});t.rect(54,16,4,2,[255,70,50]);t.rect(54,20,4,2,[80,255,120]);
  for(let q=0;q<5;q++)t.poly([[q*13,32],[q*13+6,32],[q*13+10,27],[q*13+4,27]],q%2?[226,176,40]:[18,20,24],0.9);});}
function p6SprTubeTop(){return p6Sprite("tubeTop",64,22,(t)=>{p6Box(t,2,4,60,14,P6C.steel,{seed:130,bev:1,rust:0.25,rivets:8});p6Box(t,8,0,48,6,P6C.steelW,{seed:131,round:"h",bev:1});
  for(const x of [14,46]){p6Box(t,x,14,5,8,P6C.dark,{seed:x,bev:0});}p6Ell(t,32,18,4,3,P6C.brass,{seed:132});t.line(18,4,10,0,[10,12,16]);t.line(46,4,54,0,[10,12,16]);});}
function p6SprTubeGlass(){return p6Sprite("tubeGlass",48,128,(t)=>{for(let j=0;j<128;j++)for(let i=0;i<48;i++){const u=(i-24)/24;if(Math.abs(u)>1)continue;const e=Math.abs(u);let c=null,a=0;if(e>0.88){c=[200,240,246];a=0.55;}else if(e>0.78){c=[20,60,70];a=0.35;}
    const d=(i*1.0+j*0.35)%34;if(!c&&d<2.6){c=[236,252,252];a=0.32;}else if(!c&&d>30){c=[10,30,40];a=0.16;}if(c)t.px(i,j,c,a);}
  t.rect(5,4,1,120,[255,255,255],0.4);t.rect(8,8,1,40,[255,255,255],0.3);t.rect(40,10,1,100,[10,30,40],0.3);});}
