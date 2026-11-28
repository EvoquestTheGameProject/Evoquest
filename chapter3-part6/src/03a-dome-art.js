/* ======================= PART 6B ART: THE DOME (a shattered glass dome held up by steel) =======================
   A geodesic dome from before the fall: steel columns, rings and braces, glass panes (some whole and cracked, most broken
   down to jagged teeth), the burnt city and a night sky behind it. Painted per tile with the game's per-pixel painter. */
const P6_BAY=96,P6_CW=9,P6_RT=7,P6_RINGS=[20,74,128],P6_BANDS=[[27,74],[81,128],[135,178]];
function p6PaintDome(t,i,seed){const O=i*336;
  /* the night behind the glass: the game's own city skyline, darkened, with fire on the horizon and a few stars */
  Ye(t,0,184,{hs:1.1,seed:seed+i,grassH:0,sun:-600,bh:1.05,puddles:[],cars:[],haze:0.5});
  for(let y=0;y<184;y++){const gy=y/184;for(let x=0;x<384;x++)t.px(x,y,[26+50*gy*gy,24+22*gy,70+10*gy],0.56);}
  t.stars(90,70,seed+7);
  for(let y=96;y<184;y++){const k=(y-96)/88;for(let x=0;x<384;x++){const n=It((x+O)/20,y/14,seed+3);t.px(x,y,[255,120,48],k*k*0.5*(0.4+n));}}
  if(i===1){t.moon&&t.moon(260,40,13,[244,224,232],[210,184,198],[180,150,168],seed);}
  /* the dome itself */
  const hole=(id)=>{const a=r(id,11);return a<0.4?0:a<0.72?2:1;};/* 0 whole, 1 broken to teeth, 2 holed */
  for(let y=0;y<184;y++)for(let x=0;x<384;x++){const gx=x+O,bay=Math.floor(gx/P6_BAY),lx=gx-bay*P6_BAY,par=bay&1;let st=null,bi=-1;
    if(y<P6_RINGS[0]){st="deck";}
    else if(lx<P6_CW){st="col";}
    else{for(let k=0;k<3;k++){if(y>=P6_RINGS[k]&&y<P6_RINGS[k]+P6_RT){st="ring";bi=k;break;}}
      if(!st&&r(bay,seed+77)<0.42&&y>=27&&y<178){const q=(y-27)/151,x1=P6_CW+q*(P6_BAY-P6_CW),x2=P6_BAY-q*(P6_BAY-P6_CW);if(Math.abs(lx-x1)<3.4||(r(bay,seed+78)<0.5&&Math.abs(lx-x2)<3.4)){st="beam";bi=0;}}
      if(!st){for(let k=0;k<3;k++){const b=P6_BANDS[k];if(y>=b[0]&&y<b[1]){bi=k;break;}}
        if(bi<0)st="curb";
        else{const b=P6_BANDS[bi],tt=(b[1]-y)/(b[1]-b[0]),xl=par?P6_BAY-tt*(P6_BAY-P6_CW):P6_CW+tt*(P6_BAY-P6_CW),dx=lx-xl;
          if(Math.abs(dx)<2.6)st="dia";else{st="glass";
            const side=dx<0?0:1,id=bay*31+bi*7+side+seed,kind=hole(id);let ed=Math.min(lx-P6_CW,P6_BAY-lx,y-b[0],b[1]-y,Math.abs(dx)-2.6);
            let present=1;
            if(kind===1){present=ed<2.5+8*p6n(gx/5,y/5,seed+id);}
            else if(kind===2){const cx=(bay*P6_BAY)+P6_CW+10+(P6_BAY-P6_CW-20)*r(id,3),cy=b[0]+8+(b[1]-b[0]-16)*r(id,4),rad=14+16*r(id,5),d=Math.hypot(gx-cx,(y-cy)*1.25);present=d>rad*(0.7+0.6*p6n(gx/4,y/4,seed+id+2))||ed<1.2;}
            if(present){const n=p6n(gx/6,y/6,seed+9);let a=0.34+0.14*n+0.1*(1-(y-b[0])/(b[1]-b[0])),c=[62,140,158];
              if(ed<1.4){c=[240,252,252];a=0.75;}
              else if(((x*1.0+y*0.55+id*13)%29)<2.6){c=[230,250,252];a=0.4;}
              else if(((x*1.0+y*0.55+id*13)%29)<9.5){c=[150,210,224];a=0.2;}
              else if(((x*1.0+y*0.55+id*13)%29)>26.5){c=[14,30,40];a=0.42;}
              if(kind===0&&Math.abs(p6n(gx/9,y/9,seed+id+4)-0.5)<0.007){c=[226,246,250];a=0.85;}
              t.px(x,y,c,a);
              /* a bright jagged lip where the glass breaks off */
              if(kind===1&&ed>2.5+8*p6n(gx/5,y/5,seed+id)-1.3){t.px(x,y,[250,255,255],0.95);}
              if(kind===2){const d2=Math.hypot(gx-((bay*P6_BAY)+P6_CW+10+(P6_BAY-P6_CW-20)*r(id,3)),(y-(b[0]+8+(b[1]-b[0]-16)*r(id,4)))*1.25);if(d2<(14+16*r(id,5))*(0.7+0.6*p6n(gx/4,y/4,seed+id+2))+1.3&&ed>=1.2)t.px(x,y,[250,255,255],0.95);}}
          }}}}
    if(!st||st==="glass")continue;
    let v,pal=P6C.steel;
    if(st==="col"){const u=lx/P6_CW;v=0.92-1.2*Math.abs(u-0.32)-(u>0.8?0.12:0);if(lx===0)v+=0.2;if(lx===P6_CW-1)v-=0.3;v+=0.22*(p6n(gx/3,y/9,seed+6)-0.5);
      if((y%14)===6&&lx>=3&&lx<=5){t.px(x,y,P6C.steel[2]);continue;}if((y%14)===5&&lx===3){t.px(x,y,P6C.steel[6]);continue;}if(lx===6&&(y%14)<2){v-=0.3;}}
    else if(st==="ring"){const vv=(y-P6_RINGS[bi])/P6_RT;v=0.92-1.25*Math.abs(vv-0.28);if(y===P6_RINGS[bi])v+=0.25;if(y===P6_RINGS[bi]+P6_RT-1)v-=0.3;v+=0.2*(p6n(gx/9,y/3,seed+8)-0.5);if((gx%16)===8&&vv>0.25&&vv<0.75){t.px(x,y,P6C.steel[1]);continue;}}
    else if(st==="dia"){const b=P6_BANDS[bi],tt=(b[1]-y)/(b[1]-b[0]),xl=par?P6_BAY-tt*(P6_BAY-P6_CW):P6_CW+tt*(P6_BAY-P6_CW),u=(lx-xl+2.6)/5.2;v=0.86-1.1*Math.abs(u-0.35)+0.2*(p6n(gx/6,y/6,seed+10)-0.5);}
    else if(st==="beam"){const q=(y-27)/151,x1=P6_CW+q*(P6_BAY-P6_CW),x2=P6_BAY-q*(P6_BAY-P6_CW),d=Math.min(Math.abs(lx-x1),Math.abs(lx-x2)),u=(lx-(Math.abs(lx-x1)<Math.abs(lx-x2)?x1:x2)+3.4)/6.8;v=0.92-1.2*Math.abs(u-0.3)+0.2*(p6n(gx/5,y/5,seed+15)-0.5);pal=P6C.steelW;if((y%12)===5&&d<1.6){t.px(x,y,P6C.steel[1]);continue;}if((y%12)===4&&d<1){t.px(x,y,P6C.steel[6]);continue;}}
    else if(st==="deck"){v=0.34+0.3*((y%6)<2?0:1)*0.6+0.2*(p6n(gx/5,y/4,seed+11)-0.5);pal=P6C.dark;if((gx%40)<2)v+=0.3;}
    else{v=0.5+0.3*(y===178?1:0)-0.2*(y===183?1:0)+0.2*(p6n(gx/5,y/3,seed+12)-0.5);if(((gx>>3)+((y-178)>>1))%2===0&&y>=179&&y<183){t.px(x,y,[218,170,34]);continue;}pal=P6C.steelW;}
    /* rust and soot streaking down from the joints */
    const rs=p6n(gx/4,y/22,seed+13);if(st!=="deck"&&rs>0.7){t.px(x,y,c6Ramp(P6C.rust,0.3+rs-0.55+0.3*p6n(gx/2,y/2,seed+14),x,y));continue;}
    t.px(x,y,c6Ramp(pal,v,x,y));}
  /* gusset plates where columns meet rings */
  for(let bay=Math.floor(O/P6_BAY)-1;bay<=Math.floor((O+384)/P6_BAY)+1;bay++)for(const ry of P6_RINGS){const bx=bay*P6_BAY-O+P6_CW;for(let q=0;q<9;q++)for(let w=0;w<9-q;w++){t.px(bx+w,ry+P6_RT+q,c6Ramp(P6C.steel,0.75-q*0.06,bx+w,ry+q));t.px(bx+w,ry-1-q,c6Ramp(P6C.steel,0.6-q*0.05,bx+w,ry-q));}}
  /* dangling shards of glass in the frames, catching the light */
  for(let q=0;q<26;q++){const gx=(O%P6_BAY?0:0)+r(q,seed+30)*384,gy=30+r(q,seed+31)*140;if(r(q,seed+32)<0.7)p6Shard(t,gx,gy,3+r(q,33)*4,4+r(q,34)*7,q+seed,[150,214,220]);}
  /* the floor: broken concrete, expansion joints, glass glitter, puddles of night sky, rubble and rebar */
  t.grad(184,216,["#2c2e32","#222428","#16181c"]);
  for(let y=184;y<216;y++)for(let x=0;x<384;x++){const gx=x+O,n=It(gx/7,y/4,seed+40);if(n>0.62)t.px(x,y,[84,88,92],(n-0.62)*1.6);else if(n<0.3)t.px(x,y,[8,8,12],0.5);}
  for(let x=(-(O%64));x<384;x+=64)t.rect(x,185,1,31,[8,8,12],0.9);for(let y=200;y<216;y+=15)t.rect(0,y,384,1,[8,8,12],0.7);
  for(let q=0;q<7;q++){const px=r(q,seed+41)*384,py=196+r(q,seed+42)*16,w=14+r(q,43)*26;for(let k=0;k<w;k++){const hh=Math.sin(k/w*3.14)*2.2;for(let j=-hh;j<=hh;j++)t.px(px+k,py+j,[26,40,70],0.8);}t.rect(px+2,py-1,w*0.5,1,[130,180,230],0.5);}
  for(let k=0;k<150;k++){const sx=r(k,seed+44)*384,sy=186+r(k,seed+45)*30;t.px(sx,sy,r(k,46)<0.5?[230,250,252]:[110,170,180],0.6+0.4*r(k,47));if(r(k,48)<0.15)t.px(sx+1,sy,[255,255,255],0.9);}
  for(let k=0;k<26;k++){const sx=r(k,seed+49)*384,sy=190+r(k,seed+50)*22,w=3+r(k,51)*8,h=2+r(k,53)*4;t.poly([[sx,sy+h],[sx+w*0.2,sy],[sx+w*0.8,sy+h*0.2],[sx+w,sy+h]],(x,y)=>c6Ramp(P6C.conc,0.55-0.5*(y-sy)/h+0.3*(p6n(x/2,y/2,k)-0.5),x,y));t.rect(sx,sy+h,w,1,[4,4,8],0.7);}
  for(let k=0;k<5;k++){const sx=r(k,seed+52)*384;for(let j=0;j<10+r(k,53)*12;j++)t.px(sx+Math.sin(j/3+k)*1.2,214-j,c6Ramp(P6C.rust,0.4+0.1*j/4,sx,j),1);}
  t.rect(0,184,384,1,[110,120,130]);t.rect(0,185,384,1,[4,4,8]);
  t.light&&(t.light(80,30,120,"#a8d8ff",0.22),t.light(300,60,140,"#ffb878",0.18));}
/* ---------------- painted props ---------------- */
function p6SprBulk(){return p6Sprite("bulk",150,184,(t)=>{/* a steel bulkhead doorway, bolted, with hazard stripes and a vault wheel: the flesh has burst through it */
  p6Box(t,0,0,150,184,P6C.steel,{seed:61,rust:0.3,nz:0.14,bev:2,rivets:10});
  for(let q=0;q<6;q++){t.rect(0,20+q*28,150,2,P6C.dark[1],0.9);t.rect(0,22+q*28,150,1,P6C.steel[5],0.5);}
  p6Box(t,16,8,118,168,P6C.dark,{seed:62,bev:2,nz:0.1});p6Box(t,22,14,106,156,P6C.steelW,{seed:63,bev:2,rust:0.4,rivets:11});
  for(let q=0;q<9;q++){t.poly([[22+q*12,14],[28+q*12,14],[22+q*12,24],[16+q*12,24]],q%2?[236,184,40]:[22,22,26]);t.poly([[22+q*12,160],[28+q*12,160],[22+q*12,170],[16+q*12,170]],q%2?[236,184,40]:[22,22,26]);}
  p6Ell(t,75,92,36,36,P6C.steel,{seed:64});p6Ell(t,75,92,30,30,P6C.dark,{seed:65,nz:0.05});
  for(let q=0;q<6;q++){const a=q/6*6.283;p6Limb(t,75,92,75+Math.cos(a)*26,92+Math.sin(a)*26,5,5,P6C.steel,{seed:q+66});p6Ell(t,75+Math.cos(a)*28,92+Math.sin(a)*28,5,5,P6C.brass,{seed:q+70});}
  p6Ell(t,75,92,8,8,P6C.brass,{seed:80});t.px(72,89,[255,248,200]);
  t.rect(34,160,82,6,[200,40,30]);t.rect(34,160,82,1,[255,120,90]);},(g)=>{g.font='6px "Press Start 2P",monospace';g.fillStyle="#1a0a08";g.fillText("SEAL B",52,170);g.fillStyle="#e8d8a0";g.fillText("LEVEL 2",52,40);});}
function p6SprHatch(){return p6Sprite("hatch",72,60,(t)=>{p6Box(t,0,0,72,60,P6C.dark,{seed:90,bev:2});p6Box(t,4,4,64,52,P6C.steelW,{seed:91,rust:0.35,bev:2});p6Box(t,6,6,60,6,P6C.steel,{seed:92,bev:0});
  for(const [bx,by] of [[9,9],[63,9],[9,50],[63,50]]){p6Ell(t,bx,by,4,4,P6C.steel,{seed:bx+by});t.line(bx-2,by,bx+2,by,[10,12,16]);t.line(bx,by-2,bx,by+2,[10,12,16]);}
  p6Box(t,26,26,20,6,P6C.dark,{seed:93,bev:1});t.rect(28,27,16,1,[200,206,214]);p6Rust(t,4,4,64,52,94,0.6);
  for(let q=0;q<10;q++)t.rect(14+q*5,38,3,2,P6C.dark[1],0.7);t.poly([[18,44],[26,44],[22,38]],[236,184,40]);},(g)=>{g.font='5px "Press Start 2P",monospace';g.fillStyle="#d8d0a0";g.fillText("ESCAPE",20,22);});}
function p6SprSign(){return p6Sprite("esign",84,34,(t)=>{p6Box(t,0,0,84,34,P6C.dark,{seed:100,bev:2});p6Box(t,3,3,78,28,[[4,40,18],[10,80,36],[20,130,60]],{seed:101,bev:1,nz:0.06});
  /* a running figure and an arrow */
  p6Ell(t,16,10,3,3,[[160,255,190],[230,255,240]],{nz:0});t.line(16,14,14,22,[190,255,210]);t.line(15,14,15,22,[190,255,210]);t.line(15,16,21,18,[190,255,210]);t.line(15,16,10,20,[190,255,210]);t.line(14,22,19,27,[190,255,210]);t.line(14,22,9,27,[190,255,210]);
  t.rect(52,18,24,3,[190,255,210]);t.poly([[76,14],[82,19],[76,25]],[190,255,210]);t.light&&t.light(42,17,40,"#6aff9a",0.6);},(g)=>{g.font='5px "Press Start 2P",monospace';g.fillStyle="#d8ffe4";g.fillText("EMERGENCY",26,10);g.fillText("EXIT",30,16);});}
function p6SprVent(){return p6Sprite("vent",44,52,(t)=>{p6Box(t,0,0,44,52,P6C.steelW,{seed:110,rust:0.4,bev:2,nz:0.14});p6Box(t,5,5,34,42,[[2,2,6],[8,8,14]],{seed:111,bev:1,nz:0.04});
  for(let q=0;q<7;q++){const y=8+q*5;t.line(6,y,38,y+(q%2?2:-1),P6C.steel[2]);t.line(6,y+1,38,y+(q%2?3:0),P6C.dark[1]);}
  /* torn louvres, bent outwards */
  t.poly([[6,8],[22,14],[20,18],[6,14]],(x,y)=>c6Ramp(P6C.steel,0.75-(y-8)*0.06,x,y));t.poly([[38,30],[22,36],[24,40],[38,36]],(x,y)=>c6Ramp(P6C.steel,0.5,x,y));
  for(const [bx,by] of [[3,3],[40,3],[3,48],[40,48]])p6Rivet(t,bx,by);p6Rust(t,0,0,44,52,112,0.25);});}
function p6SprDomeFar(){return p6Sprite("domefar",384,200,(t)=>{/* the Dome seen from outside, far away: a glass-and-steel half sphere, broken, glowing from inside */
  const cx=192,by=196,R=186;
  for(let y=8;y<=by;y++)for(let x=0;x<384;x++){const dx=(x-cx)/R,dy=(by-y)/(R*0.98);const d=dx*dx+dy*dy;if(d>1||dy<0)continue;const rim=d>0.9;
    const ring=Math.floor(Math.atan2(dy,dx)*0+dy*6),meridian=Math.floor((Math.atan2(dy,dx))*12/3.1416);const mx=Math.abs(((Math.atan2(dy,dx)*12/3.1416)%1)-0.5),ry=Math.abs(((dy*6)%1)-0.5);
    const steel=mx>0.45||ry>0.46||rim;let v=0.5+0.4*(-0.5*dx-0.6*dy+0.5*Math.sqrt(Math.max(0,1-d)));
    if(steel){t.px(x,y,c6Ramp(P6C.steel,v+0.05+0.1*(p6n(x/5,y/5,3)-0.5),x,y));}
    else{const id=Math.floor(Math.atan2(dy,dx)*12/3.1416)*13+Math.floor(dy*6);const br=r(id,5)<0.55;
      if(br&&p6n(x/4,y/4,id)<0.78){/* a missing pane: the lit inside shows */t.px(x,y,[24+24*(1-dy),60+40*(1-dy),70+30*(1-dy)],0.9);if(p6n(x/3,y/3,7)>0.7)t.px(x,y,[255,150,80],0.5);}
      else t.px(x,y,c6Ramp(P6C.glass,v*0.8+0.1+0.2*p6n(x/6,y/6,4),x,y),0.92);}}
  for(let k=0;k<40;k++){const a=Math.PI*(0.08+0.84*r(k,11)),rr=R*(0.35+0.6*r(k,12));p6Shard(t,cx+Math.cos(a)*rr*-1,by-Math.sin(a)*rr*0.98,4+r(k,13)*8,4+r(k,14)*9,k,[150,214,220]);}
  t.light&&(t.light(cx,by-40,190,"#b8e8ff",0.3),t.light(cx,by-10,90,"#ff9a5a",0.3));},(g)=>{g.globalCompositeOperation="source-atop";g.fillStyle="rgba(8,10,30,.35)";g.fillRect(0,0,384,200);});}
function p6DomeFar(cx,base,R,al){const sp=p6SprDomeFar(),T=P6.t;ctx.save();ctx.globalAlpha=al;ctx.drawImage(sp,0,0,384,200,cx-R,base-R*1.04,R*2,R*1.04+1.6);ctx.restore();
  glow(cx,base-R*0.55,R*1.1,"150,210,255",0.12+0.03*Math.sin(T/30));
  /* a red strobe on the very top and cold light leaking from the broken panes */
  if((T>>4)%3===0)glow(cx,base-R*1.0,10,"255,50,40",0.5);}
/* ---------------- lights, hanging cables, the barrier, the hatch, the vents ---------------- */
function p6DomeLights(){const g=C2_FLOOR,T=P6.t,L=[],pu=p6Pulse(),S=p6S();
  /* cold night light falls through the broken panes, and the city burns outside */
  for(let k=0;k<7;k++){const x=30+k*92;L.push({x,y:16,r:78,i:0.5+0.08*Math.sin(T/70+k),c:k%2?"150,205,255":"190,225,255",cone:1});}
  for(let k=0;k<4;k++)L.push({x:60+k*170,y:30,r:50,i:0.28,c:"255,150,80"});
  L.push({x:P6_BAR,y:g-40,r:70,i:0.45+0.3*pu,c:"255,100,150"});
  L.push({x:P6_HATCH,y:g-30,r:34,i:S.hatch?0.1:0.7+0.2*Math.sin(T/10),c:"90,255,140"});
  for(const m of P6D.mem)L.push({x:m.x,y:g-(m.lane||0)-18,r:22,i:0.3,c:m.b?"255,60,40":"160,255,120"});
  L.push({x:player.x,y:g-20,r:24,i:0.25,c:"230,235,255"});C10A.lights=L;}
function p6CableHang(x,len,ph){const T=P6.t,sw=Math.sin(T/44+ph)*3,sx=x+Math.sin(T/30+ph)*4.5;ctx.lineCap="round";ctx.strokeStyle="#0a0c10";ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(x,P6_RINGS[0]/2+4);ctx.quadraticCurveTo(x+sw,len*0.55,sx,len);ctx.stroke();ctx.strokeStyle="#4a5666";ctx.lineWidth=0.4;ctx.beginPath();ctx.moveTo(x-0.5,P6_RINGS[0]/2+4);ctx.quadraticCurveTo(x+sw-0.5,len*0.55,sx-0.5,len);ctx.stroke();
  fill("#2a303a",sx-1.6,len,3.2,2.4);fill("#c89a30",sx-0.6,len+2,1.2,1.2);if(((T+ph*40|0)%190)<4){fill("#fff6c0",sx-0.6,len+3,1.2,1.2);glow(sx,len+3,9,"255,236,170",0.6);for(let q=0;q<3;q++)fill("#ffe9a0",sx+Math.sin(T+q)*2,len+4+q*2,0.6,0.6);}}
function p6Barrier(){const g=C2_FLOOR,x=P6_BAR,pu=p6Pulse(),T=P6.t,op=P6D.bar,sp=p6SprBulk();
  /* the steel bulkhead (the only way on)… */
  ctx.drawImage(sp,0,0,150,184,x-37.5,g-92,75,92);
  /* …and the flesh that has burst through it, swelling with every beat */
  ctx.save();ctx.translate(x,0);ctx.beginPath();ctx.rect(-40,0,80,g+1);ctx.clip();
  const w=26+pu*3,gr=ctx.createLinearGradient(-w,0,w,0);gr.addColorStop(0,"#4a1428");gr.addColorStop(0.5,"#8a2e50");gr.addColorStop(1,"#4a1428");
  ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(-w,g);for(let y=g;y>=14;y-=5){const bx=Math.sin(y/9+T/50)*3+((y*7)%5)-2;ctx.lineTo(-w+bx-pu*2,y);}ctx.lineTo(w,14);for(let y=14;y<=g;y+=5){const bx=Math.sin(y/9+T/50+2)*3+((y*11)%5)-2;ctx.lineTo(w+bx+pu*2,y);}ctx.fill();
  ctx.fillStyle="rgba(255,150,180,.18)";ctx.beginPath();ctx.ellipse(-6,g*0.45,9,26,0.1,0,7);ctx.fill();
  if(op>0){const ow=13*op;ctx.fillStyle="#060208";ctx.beginPath();ctx.ellipse(0,g-26,ow*0.8,27*Math.min(1,op*1.3),0,0,7);ctx.fill();ctx.strokeStyle="rgba(255,150,190,.6)";ctx.lineWidth=1.2;ctx.beginPath();ctx.ellipse(0,g-26,ow*0.95,28*Math.min(1,op*1.3),0,0,7);ctx.stroke();}
  ctx.lineCap="round";for(let q=0;q<7;q++){const vx=-w+5+q*(w*2-10)/6,a=0.4+0.5*pu;ctx.strokeStyle="rgba(255,120,170,"+a+")";ctx.lineWidth=0.8+pu*0.7;ctx.beginPath();ctx.moveTo(vx,g);ctx.quadraticCurveTo(vx+Math.sin(q*2)*8,g*0.5,vx+Math.sin(q*3+1)*6,16);ctx.stroke();}
  for(let q=0;q<10;q++){const px=-w+5+((q*37)%(w*2-10)),py=18+((q*29)%(g-30)),s=1.4+((q*5)%3)+pu*0.8;fill(q%3?"#ff86d0":"#c8ff7a",px-s/2,py-s/2,s,s);glow(px,py,s*3,q%3?"255,120,200":"170,255,120",0.25+0.2*pu);}
  ctx.restore();glow(x,g-30,56,"255,100,150",0.12+0.12*pu);}
function p6Hatch(){const S=p6S(),g=C2_FLOOR,x=P6_HATCH,T=P6.t;
  const on=(T%190>8)&&!(T%61===0),a=S.hatch?0.35:on?1:0.3;ctx.globalAlpha=a;ctx.drawImage(p6SprSign(),0,0,84,34,x-21,g-62,42,17);ctx.globalAlpha=1;glow(x,g-54,28,"90,255,140",0.26*a);
  if(!S.hatch){ctx.drawImage(p6SprHatch(),0,0,72,60,x-18,g-30,36,30);
    const pu=p6Pulse();ctx.strokeStyle="rgba(170,50,86,.95)";ctx.lineWidth=1.6+pu;for(const [x0,y0,x1,y1] of [[-17,-29,17,-2],[17,-29,-17,-2],[-17,-14,17,-14]]){ctx.beginPath();ctx.moveTo(x+x0,g+y0);ctx.quadraticCurveTo(x,g-15+Math.sin(T/12)*1.4-pu*1.5,x+x1,g+y1);ctx.stroke();}
    ctx.strokeStyle="rgba(255,140,170,.5)";ctx.lineWidth=0.5;ctx.beginPath();ctx.moveTo(x-17,g-28);ctx.quadraticCurveTo(x,g-15-pu,x+17,g-3);ctx.stroke();}
  else{fill("#02030a",x-17,g-29,34,28);fill("#10161c",x-17,g-29,34,2);for(let q=0;q<5;q++){fill("#6a7480",x-8,g-23+q*5,16,1.2);fill("#1a222a",x-8,g-22+q*5,16,1);}glow(x,g-14,18,"20,30,50",0.4);
    ctx.save();ctx.translate(x+24,g-1);ctx.rotate(0.9);ctx.drawImage(p6SprHatch(),0,0,72,60,-18,-30,36,30);ctx.restore();}}
function p6Vent(hx,hy){const sp=p6SprVent();ctx.drawImage(sp,0,0,44,52,hx-11,hy-13,22,26);if(P6.t%300<14){fill("#ff3a2a",hx-3,hy-1,1.2,1);fill("#ff3a2a",hx+1.6,hy-1,1.2,1);glow(hx,hy,5,"255,50,40",0.4);}}
function p6DomeBack(){const g=C2_FLOOR,T=P6.t;
  /* light shafts through the broken panes, drifting dust, and hanging wires */
  for(let k=0;k<7;k++){const x0=30+k*92,wob=Math.sin(T/90+k)*3;if(x0<camX-60||x0>camX+260)continue;const gr=ctx.createLinearGradient(x0,8,x0+34,g);gr.addColorStop(0,"rgba(170,215,255,0.13)");gr.addColorStop(1,"rgba(170,215,255,0)");ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(x0+wob,8);ctx.lineTo(x0+14+wob,8);ctx.lineTo(x0+60,g);ctx.lineTo(x0+26,g);ctx.fill();}
  [34,120,210,268,330,402,470,520,590].forEach((x,q)=>{if(x<camX-10||x>camX+202)return;p6CableHang(x,14+((q*13)%26),q);});
  for(const hx of P6_HOLES)p6Vent(hx,52);
  p6Barrier();p6Hatch();
  for(const s of P6D.spore){ctx.globalAlpha=Math.max(0,s.a);if(s.sh){fill("#e8fcff",s.x,s.y,s.sz,s.sz*0.6);}else fill("#b8d8ff",s.x,s.y,0.5,0.5);}ctx.globalAlpha=1;
  for(const m of P6D.mem){m.b?p6Beast(m):p6Mut(m);}
  const e=c10Env(player.x,player.y-14);De.dome=Object.assign(De.dome||{},{c:"60,80,120",l:"190,225,255",a:0.12+e.a*0.2,dk:0.46});}
function p6DomeFront(){const g=C2_FLOOR,T=P6.t;
  /* a thin cold haze and glints on drifting glass dust */
  ctx.fillStyle="rgba(120,170,230,.035)";ctx.fillRect(camX,0,192,108);
  for(let q=0;q<14;q++){const x=camX+((q*47+T*0.12)%200),y=(q*23+T*0.2)%100,a=0.3+0.3*Math.sin(T/9+q);if(a>0.45){ctx.globalAlpha=a;fill("#f4fdff",x,y,0.6,0.6);ctx.globalAlpha=1;}}}
function p6DomeTint(){const T=P6.t;ctx.save();ctx.setTransform(ctx.canvas.width/192,0,0,ctx.canvas.height/108,0,0);ctx.drawImage(c10LM(C10A.lights||[],0.46,"4,8,20"),0,0,192,108);
  for(const L of C10A.lights||[]){const x=L.x-camX;if(x<-L.r||x>192+L.r)continue;glow(x,L.y,L.r*(L.cone?0.3:0.55),L.c,0.1*L.i);}
  const vg=C3.cache.p6dv||(C3.cache.p6dv=(()=>{const q=ctx.createRadialGradient(96,54,34,96,54,118);q.addColorStop(0,"rgba(0,0,0,0)");q.addColorStop(1,"rgba(2,6,16,.55)");return q;})());ctx.fillStyle=vg;ctx.fillRect(0,0,192,108);
  if(C3.dark>0){ctx.fillStyle="rgba(0,0,4,"+C3.dark+")";ctx.fillRect(0,0,192,108);}ctx.restore();}
