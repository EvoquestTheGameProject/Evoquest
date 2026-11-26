
/* ======================= DRAWING ======================= */
function c3Strip(key,w,h,paint){if(C3.cache[key])return C3.cache[key];const c=c3Cv(w,h),g=c.getContext("2d");g.imageSmoothingEnabled=!1;paint(g,w,h);return(C3.cache[key]=c);}
function c3Layer(cv,f,y,h){const P=cv.width/2,start=camX*(1-f);let k=Math.floor((camX-start)/P)-1;for(;k*P+start<camX+193;k++){const dx=Math.round((k*P+start)*2)/2;dx+P>camX-1&&ctx.drawImage(cv,dx,y||0,P,h||108);}}
function c3Sin(x,w,n,ph){return Math.sin((x/w)*Math.PI*2*n+(ph||0));}
function c3RoadFar(){return c3Strip("rFar",768,216,(g,W)=>{
  for(let x=0;x<W;x++){const h=118-(12*c3Sin(x,W,2,1)+8*c3Sin(x,W,5)+4*c3Sin(x,W,11,2));g.fillStyle="rgba(90,46,38,.55)";g.fillRect(x,h,1,216-h);g.fillStyle="rgba(150,80,60,.35)";g.fillRect(x,h,1,1);}
  const B=[[40,46],[96,70],[150,38],[300,58],[352,84],[410,44],[560,66],[620,40],[700,52]];
  B.forEach(([bx,bh],i)=>{const w=26+(i*7)%18,top=150-bh;for(let o of[0,-W])for(let x=0;x<w;x++){const notch=((x*13+i*7)%9<3)?(x%5)*2:0;g.fillStyle="rgba(58,30,26,.78)";g.fillRect(bx+x+o,top+notch,1,216-top-notch);}
    g.fillStyle="rgba(255,150,80,.18)";for(let y=top+8;y<150;y+=9)for(let x=4;x<w-4;x+=7)((x+y+i)%3)&&g.fillRect(bx+x,y,3,4);});
  for(let k=0;k<3;k++){const sx=120+k*250;for(let i=0;i<26;i++){g.fillStyle="rgba(40,30,30,"+(0.22-i*0.007)+")";const rr=6+i*1.4;g.beginPath();g.arc(sx+i*3+Math.sin(i)*4,140-i*6,rr,0,7);g.fill();}}});}
function c3RoadMid(){return c3Strip("rMid",1024,216,(g,W)=>{
  const poles=[];for(let x=40;x<W;x+=128)poles.push(x);
  poles.forEach((x,i)=>{const lean=((i*5)%3-1)*3;g.fillStyle="#2a1c16";g.beginPath();g.moveTo(x,170);g.lineTo(x+4,170);g.lineTo(x+4+lean,74);g.lineTo(x+lean,74);g.fill();g.fillRect(x-10+lean,82,24,3);g.fillRect(x-6+lean,92,16,2);});
  g.strokeStyle="rgba(20,14,12,.85)";g.lineWidth=1;poles.forEach((x,i)=>{const nx=poles[(i+1)%poles.length]+(i===poles.length-1?W:0);for(const dy of[83,93]){g.beginPath();g.moveTo(x-8,dy);g.quadraticCurveTo((x+nx)/2,dy+18,nx-8,dy);g.stroke();g.beginPath();g.moveTo(x-8-W,dy);g.quadraticCurveTo((x+nx)/2-W,dy+18,nx-8-W,dy);g.stroke();}});
  const tree=(x,h,s)=>{g.drawImage(c6DeadTree(s,h),x-45,172-(h+18));},treeOld=(x,h,s)=>{g.strokeStyle="#22160f";g.lineWidth=3;g.beginPath();g.moveTo(x,172);g.lineTo(x+2,172-h);g.stroke();g.lineWidth=1.5;for(let k=0;k<6;k++){const y=172-h*(0.45+0.09*k),d=k%2?1:-1,L=10+((s*k*7)%10);g.beginPath();g.moveTo(x+1,y);g.lineTo(x+1+d*L,y-L*0.7);g.lineTo(x+1+d*L*1.3,y-L*0.5);g.stroke();}};
  tree(90,70,3);tree(330,90,5);tree(470,60,7);tree(760,84,2);tree(930,66,9);
  g.fillStyle="#1e1612";g.fillRect(586,108,4,64);g.fillRect(670,108,4,64);g.fillStyle="#3a2e28";g.fillRect(574,84,112,30);g.fillStyle="#6a4a2a";g.fillRect(576,86,108,26);
  g.fillStyle="#2a1a10";g.font='8px "Press Start 2P",monospace';g.textBaseline="top";g.fillText("RIDGE FM",590,90);g.fillStyle="#8a2a1a";g.fillText("101.3",604,101);g.fillStyle="#1e1612";g.beginPath();g.moveTo(686,84);g.lineTo(666,84);g.lineTo(676,92);g.lineTo(670,100);g.lineTo(686,114);g.fill();for(let k=0;k<5;k++)g.fillRect(582+k*19,94+(k*7)%14,2,2);
  for(let x=0;x<W;x+=2){const h=4+3*Math.abs(c3Sin(x,W,23))+2*c3Sin(x,W,61);g.fillStyle=x%6?"#3a2e1e":"#4a3a22";g.fillRect(x,170-h,2,h+46);}});}
function c3RoadChunk(i){const k="r"+i;if(C3.chunks[k])return C3.chunks[k];const c=c3Cv(384,60),g=c.getContext("2d"),R=(n,s)=>r(n+i*131,s);
  g.fillStyle="#4a3a26";g.fillRect(0,0,384,20);for(let n=0;n<70;n++){const x=R(n,1)*384,h=2+R(n,2)*7;g.fillStyle=R(n,3)<0.5?"#5a6a2a":"#7a6a3a";g.fillRect(x|0,(18-h)|0,1,h|0);g.fillRect((x+1)|0,(19-h*0.6)|0,1,(h*0.6)|0);}
  for(let n=0;n<60;n++){g.fillStyle=R(n,4)<0.5?"#3a2c1c":"#5a4630";g.fillRect((R(n,5)*384)|0,(2+R(n,6)*16)|0,2,1);}
  g.fillStyle="#34363a";g.fillRect(0,20,384,40);g.fillStyle="#56595a";g.fillRect(0,20,384,2);g.fillStyle="#2a2c2e";g.fillRect(0,22,384,1);
  for(let n=0;n<300;n++){g.fillStyle=R(n,7)<0.5?"#2a2c30":"#44474a";g.fillRect((R(n,8)*384)|0,(23+R(n,9)*37)|0,1,1);}
  for(let d=-((i*384)%84);d<384;d+=84){g.fillStyle="rgba(200,180,80,.55)";g.fillRect(d,41,40,3);}
  for(let n=0;n<3;n++){g.fillStyle="rgba(20,20,22,.6)";g.fillRect((R(n,10)*340)|0,(26+R(n,11)*26)|0,(20+R(n,12)*30)|0,(4+R(n,13)*6)|0);}
  g.strokeStyle="#1c1e20";g.lineWidth=1;for(let n=0;n<5;n++){let x=R(n,14)*384,y=24+R(n,15)*34;g.beginPath();g.moveTo(x,y);for(let s=0;s<9;s++){x+=3+R(s+n*9,16)*5;y+=(R(s+n*9,17)-0.5)*5;g.lineTo(x,y);}g.stroke();}
  return(C3.chunks[k]=c);}
function c3ForFar(){return c3Strip("fFar",768,216,(g,W)=>{
  for(let n=0;n<16;n++){const x=(r(n,801)*W)|0,w=6+r(n,802)*12;for(const o of[0,-W]){g.fillStyle="rgba(120,150,120,.28)";g.fillRect(x+o,0,w,176);g.fillStyle="rgba(170,200,160,.12)";g.fillRect(x+o,0,2,176);}}
  for(let n=0;n<30;n++){const x=r(n,803)*W,y=r(n,804)*40,rr=18+r(n,805)*24;for(const o of[0,-W,W]){g.fillStyle="rgba(24,52,30,.55)";g.beginPath();g.arc(x+o,y,rr,0,7);g.fill();}}
  const fg=g.createLinearGradient(0,120,0,180);fg.addColorStop(0,"rgba(180,210,170,0)");fg.addColorStop(1,"rgba(180,210,170,.35)");g.fillStyle=fg;g.fillRect(0,120,W,60);});}
function c3ForMid(){return c3Strip("fMid",1024,216,(g,W)=>{
  for(let n=0;n<9;n++){const x=(r(n,811)*W)|0,w=10+r(n,812)*10;for(const o of[0,-W]){g.fillStyle="#1a140e";g.fillRect(x+o,0,w,176);g.fillStyle="#2a2018";g.fillRect(x+o+2,0,2,176);g.fillStyle="#1a140e";g.fillRect(x+o-6,166,w+12,10);
    for(let k=0;k<5;k++){g.fillStyle="#2a4a22";g.fillRect(x+o+((k*5)%w),20+k*24,2,10+k*3);}}}
  for(let x=0;x<W;x+=3){const h=8+6*Math.abs(c3Sin(x,W,37))+4*c3Sin(x,W,91);g.fillStyle=x%9?"#1e3a1a":"#2a4a22";g.fillRect(x,176-h,3,h+40);}
  for(let n=0;n<26;n++){const x=r(n,813)*W,s=6+r(n,814)*6;g.strokeStyle=n%2?"#2f6a30":"#3a7a34";g.lineWidth=1;for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(x,176);g.quadraticCurveTo(x+k*s*0.5,176-s*1.2,x+k*s,176-s*0.6+Math.abs(k));g.stroke();}}});}
function c3ForChunk(i){const k="f"+i;if(C3.chunks[k])return C3.chunks[k];const c=c3Cv(384,48),g=c.getContext("2d"),R=(n,s)=>r(n+i*137,s);
  g.fillStyle="#2e2218";g.fillRect(0,0,384,48);g.fillStyle="#3a5a26";g.fillRect(0,14,384,3);g.fillStyle="#24361a";g.fillRect(0,17,384,2);
  for(let n=0;n<80;n++){const x=R(n,1)*384,h=2+R(n,2)*7;g.fillStyle=R(n,3)<0.5?"#3a7a34":"#5a9a3a";g.fillRect(x|0,(16-h)|0,1,h|0);}
  for(let n=0;n<240;n++){g.fillStyle=["#6a3a1a","#a85a22","#c87a2a","#4a3020","#5a4a2a"][n%5];g.fillRect((R(n,4)*384)|0,(19+R(n,5)*29)|0,2,1);}
  for(let n=0;n<6;n++){g.fillStyle="#5a5650";const x=(R(n,6)*370)|0,y=(24+R(n,7)*18)|0;g.fillRect(x,y,4+(n%3)*2,3);g.fillStyle="#7a766e";g.fillRect(x,y,3,1);}
  g.strokeStyle="#4a3020";g.lineWidth=1.5;for(let n=0;n<3;n++){let x=R(n,8)*384,y=20+R(n,9)*8;g.beginPath();g.moveTo(x,y);for(let s=0;s<6;s++){x+=6+R(s,n+10)*6;y+=(R(s,n+11)-0.3)*4;g.lineTo(x,y);}g.stroke();}
  return(C3.chunks[k]=c);}
function c3Ground(chunk,y,h){const i0=Math.floor(camX/192),i1=Math.floor((camX+192)/192);for(let i=i0;i<=i1;i++)i>=0&&ctx.drawImage(chunk(i),i*192,y,192,h);}
function c3Back(){const S=c3S();if(c4Is())return c4Back();
  if(room==="wroad"){const heat=C3.ch&&!S.roadDone?c3Clamp(1-(C3.ch.fire-player.x)/220,0,1):0;
    const gr=C3.cache.rSky||(C3.cache.rSky=(()=>{const q=ctx.createLinearGradient(0,0,0,108);q.addColorStop(0,"#1e100c");q.addColorStop(0.45,"#6a2e16");q.addColorStop(0.78,"#c0602a");q.addColorStop(1,"#d88a40");return q;})());
    ctx.save();ctx.translate(camX,0);ctx.fillStyle=gr;ctx.fillRect(0,0,192,108);glow(150,34,40,"255,190,120",0.35);ctx.fillStyle="#ffcf8a";ctx.beginPath();ctx.arc(150,34,6.5,0,7);ctx.fill();ctx.fillStyle="#ffe8b8";ctx.beginPath();ctx.arc(149,33,4,0,7);ctx.fill();
    heat>0&&(ctx.fillStyle="rgba(255,60,10,"+0.16*heat+")",ctx.fillRect(0,0,192,108));ctx.restore();
    c3Layer(c6RoadFar(),0.12);c3Layer(c3RoadMid(),0.42);c3Ground(c3RoadChunk,78,30);
    for(const h of C3.holes){if(h.x<camX-30||h.x>camX+222)continue;const w=c3HoleW(h),rx=w/2,ry=2.4+w*0.06,cy=C2_FLOOR+1.6;
      ctx.fillStyle="#56595a";ctx.beginPath();ctx.ellipse(h.x,cy-0.5,rx+1.5,ry+1,0,0,7);ctx.fill();ctx.fillStyle="#0a0806";ctx.beginPath();ctx.ellipse(h.x,cy,rx,ry,0,0,7);ctx.fill();
      ctx.fillStyle="#1e1812";ctx.beginPath();ctx.ellipse(h.x,cy-ry*0.35,rx*0.85,ry*0.4,0,Math.PI,7);ctx.fill();
      const L=4+12*C3.crack;ctx.strokeStyle="#16181a";ctx.lineWidth=0.5;for(let k=0;k<4;k++){const a=(k<2?Math.PI:0)+(k%2?0.25:-0.25)*(k<2?1:-1);ctx.beginPath();ctx.moveTo(h.x+Math.cos(a)*rx,cy);ctx.lineTo(h.x+Math.cos(a)*(rx+L*0.5),cy+(k%2?1.5:-0.5));ctx.lineTo(h.x+Math.cos(a)*(rx+L),cy+(k%2?3:0.5));ctx.stroke();}
      h.dip>0&&(fill("rgba(120,110,100,"+h.dip/30+")",h.x-rx,cy-6,w,4));}
    if(C3.crack>0){ctx.strokeStyle="rgba(14,14,16,.8)";ctx.lineWidth=0.5;for(let n=0;n<40;n++){const x0=n*168+40;if(x0<camX-60||x0>camX+250)continue;let x=x0,y=96+r(n,950)*8;ctx.beginPath();ctx.moveTo(x,y);const len=(10+30*r(n,951))*C3.crack;for(let s=0;s<len;s+=3){x+=3;y+=(r(n*31+s,952)-0.5)*3;ctx.lineTo(x,y);}ctx.stroke();}}
    for(const v of C3.fv){if(v.x<camX-30||v.x>camX+222)continue;c3FallenVine(v);}
    c3WormHoles();
    if(C3.chasm>0)c3Chasm();}
  else{const gr=C3.cache.fSky||(C3.cache.fSky=(()=>{const q=ctx.createLinearGradient(0,0,0,108);q.addColorStop(0,"#0a160e");q.addColorStop(0.5,"#2a4428");q.addColorStop(1,"#6a7a48");return q;})());
    ctx.save();ctx.translate(camX,0);ctx.fillStyle=gr;ctx.fillRect(0,0,192,108);ctx.restore();
    c3Layer(c6ForFar(),0.15);
    ctx.save();ctx.translate(camX,0);ctx.globalCompositeOperation="lighter";for(let k=0;k<5;k++){const x=((k*53-camX*0.3)%260+260)%260-40,a=0.05+0.03*Math.sin(tick/90+k);ctx.fillStyle="rgba(255,240,170,"+a+")";ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+14,0);ctx.lineTo(x+44,92);ctx.lineTo(x+22,92);ctx.fill();}ctx.restore();
    c3Layer(c6ForMid(),0.45);c3Ground(c3ForChunk,84,24);
    for(const p of C3_POOLS){if(p.x<camX-60||p.x>camX+250)continue;const x0=p.x-p.w/2;ctx.fillStyle="#3a3a1e";ctx.beginPath();ctx.ellipse(p.x,C2_FLOOR+2.5,p.w/2+2,4.5,0,0,7);ctx.fill();
      ctx.fillStyle="#4a4a24";ctx.beginPath();ctx.ellipse(p.x,C2_FLOOR+2,p.w/2,3.6,0,0,7);ctx.fill();ctx.fillStyle="#5a5a2e";ctx.fillRect(x0+4,C2_FLOOR+0.5,p.w-8,0.5);
      for(let k=0;k<5;k++){const a=(tick/40+k*1.3)%1;ctx.globalAlpha=0.6*(1-a);ctx.strokeStyle="#8a8a5a";ctx.lineWidth=0.5;ctx.beginPath();ctx.ellipse(x0+8+((k*17)%(p.w-12)),C2_FLOOR+2,2+a*6,0.6+a*1.2,0,0,7);ctx.stroke();ctx.globalAlpha=1;}
      (tick+p.x)%90<4&&fill("#9a9a6a",x0+((tick*7+p.x)%p.w),C2_FLOOR+1,1,1);
      for(let k=0;k<6;k++)fill("#2a5a22",x0-2+k*(p.w/5),C2_FLOOR-3-2*(k%2),1,4+2*(k%2));}}}
function c3FallenVine(v){const y=C2_FLOOR,x0=v.x-v.w/2;
  if(v.k==="t"){ctx.lineWidth=1.2;for(let k=0;k<4;k++){ctx.strokeStyle=k%2?"#2f7a3a":"#1f5a2c";ctx.beginPath();ctx.moveTo(x0-2,y-0.5-k*0.4);ctx.bezierCurveTo(x0+v.w*0.3,y-5-k,x0+v.w*0.6,y+1,x0+v.w+2,y-1-k*0.5);ctx.stroke();}
    for(let k=0;k<6;k++)fill(k%2?"#3a9a46":"#5aaa4a",x0+k*v.w/5,y-2-(k%3),2,1);fill("#ff86d0",x0+v.w*0.5,y-4,1,1);}
  else{ctx.lineWidth=1.4;ctx.strokeStyle="#5a3a1e";ctx.beginPath();ctx.moveTo(x0-2,y-0.5);ctx.bezierCurveTo(x0+v.w*0.3,y-4,x0+v.w*0.7,y+1,x0+v.w+2,y-1.5);ctx.stroke();ctx.strokeStyle="#7a5a30";ctx.lineWidth=0.6;ctx.stroke();
    for(let k=0;k<7;k++){const x=x0+k*v.w/6,yy=y-1.5-Math.sin(k)*1.2;fill("#d8c8a0",x,yy-2,0.5,2);fill("#d8c8a0",x+1,yy-1.5,1,0.5);}}
  v.cd>0&&v.cd>60&&(ctx.globalAlpha=0.6,fill("#ffffff",x0,y-3,v.w,0.5),ctx.globalAlpha=1);}
function c3WormHoles(){for(const w of C3.worms){if(w.x<camX-30||w.x>camX+222)continue;const sh=w.st===1?(Math.random()-0.5)*1.5:0;
  fill("#3a2a1e",w.x-7+sh,C2_FLOOR-1,14,2);fill("#5a4632",w.x-5+sh,C2_FLOOR-2,10,1);fill("#1a120c",w.x-3,C2_FLOOR,6,1.5);
  if(w.st===1){for(let k=0;k<4;k++){ctx.strokeStyle="rgba(20,14,10,.9)";ctx.lineWidth=0.5;ctx.beginPath();ctx.moveTo(w.x,C2_FLOOR);ctx.lineTo(w.x+(k-1.5)*7*(w.t/50),C2_FLOOR+1+(k%2)*2);ctx.stroke();}glow(w.x,C2_FLOOR-2,10,"255,120,60",0.2*Math.sin(w.t/3)**2);}}}
function c3Chasm(){const k=C3.chasm,x0=72+35*(1-k),x1=142-35*(1-k);if(x1<=x0)return;
  const gr=ctx.createLinearGradient(0,C2_FLOOR-5,0,108);gr.addColorStop(0,"#020101");gr.addColorStop(0.55,"#120604");gr.addColorStop(1,"#5a1a08");ctx.fillStyle=gr;ctx.fillRect(x0,C2_FLOOR-5,x1-x0,22);
  for(let x=x0;x<x1;x+=2){const j=r(x|0,960)*3;fill("#3a2e26",x,C2_FLOOR-5-j,2,j);fill("#56595a",x,C2_FLOOR-5-j,2,0.5);}
  for(let s=0;s<2;s++){const ex=s?x1:x0,d=s?1:-1;fill("#34363a",ex-(s?0:7),C2_FLOOR-6,7,4);fill("#56595a",ex-(s?0:7),C2_FLOOR-6,7,1);for(let q=0;q<4;q++)fill("#26282a",ex+d*(1+q*2)-(s?0:2),C2_FLOOR-2+q*3,2+q,2);}
  for(let q=0;q<5;q++){const fx=x0+8+(x1-x0-16)*r(q,962),fy=C2_FLOOR+((tick*0.6+q*13)%18);fill("#4a3e34",fx,fy,2,2);}
  glow((x0+x1)/2,C2_FLOOR+10,34,"255,90,30",0.3*k);fill("#ffcc66",(x0+x1)/2-12,104,24,0.5);
  const slab=(x,d,h,a)=>{ctx.save();ctx.translate(x,C2_FLOOR-2);ctx.rotate(a);ctx.fillStyle="#2a2c2e";ctx.fillRect(d<0?-14:0,-h,14,h);ctx.fillStyle="#56595a";ctx.fillRect(d<0?-14:0,-h,14,1.2);ctx.fillStyle="#c8b44a";ctx.fillRect(d<0?-10:3,-h+2,6,1);ctx.restore();};
  slab(x0+1,1,5*k,0.55*k);slab(x1-1,-1,6*k,-0.5*k);slab(x0+20,1,4*k,-0.25*k);
  for(let q=0;q<10;q++){const a=((tick*0.4+q*17)%120)/120,px=x0+6+(x1-x0-12)*r(q,963)+Math.sin(tick/40+q)*3,sz=3+a*10;ctx.globalAlpha=0.35*(1-a)*k;fill(q%2?"#6a5a50":"#8a7a6a",px-sz/2,C2_FLOOR-4-a*40-sz/2,sz,sz*0.8);ctx.globalAlpha=1;}}
function c3WormBody(x,h,sc,t,lean){if(h<=0.5)return;const N=14,pts=[];for(let i=0;i<=N;i++){const k=i/N;pts.push([x+Math.sin(k*3+t/7)*2.5*k*sc+lean*h*0.35*k*k,C2_FLOOR-h*k,(5.6-1.6*k)*sc]);}
  const disc=(cx,cy,rr,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(cx,cy,rr,0,7);ctx.fill();};
  pts.forEach((p)=>disc(p[0],p[1],p[2]+0.7,"#3a1a22"));
  pts.forEach((p,i)=>{disc(p[0],p[1],p[2],i%2?"#b86a7a":"#a65868");});
  pts.forEach((p,i)=>{i%2===0&&i<N&&(ctx.fillStyle="rgba(90,30,45,.55)",ctx.fillRect(p[0]-p[2],p[1]-0.4,p[2]*2,0.8));disc(p[0]-p[2]*0.35,p[1]-p[2]*0.3,p[2]*0.32,"rgba(255,200,210,.45)");i%4===2&&disc(p[0]+p[2]*0.45,p[1]+p[2]*0.2,0.7*sc,"#8aff6a");});
  const hd=pts[N],hx=hd[0],hy=hd[1],R2=6*sc;ctx.fillStyle="#3a1a22";ctx.beginPath();ctx.ellipse(hx,hy-1,R2,R2*0.62,lean*0.5,0,7);ctx.fill();
  ctx.fillStyle="#2a0a10";ctx.beginPath();ctx.ellipse(hx,hy-1,R2*0.8,R2*0.46,lean*0.5,0,7);ctx.fill();ctx.fillStyle="#6a0a1a";ctx.beginPath();ctx.ellipse(hx,hy-0.6,R2*0.4,R2*0.22,lean*0.5,0,7);ctx.fill();
  for(let k=0;k<12;k++){const a=k/12*6.283;fill("#f4ece0",hx+Math.cos(a)*R2*0.66-0.5,hy-1+Math.sin(a)*R2*0.38-0.5,1,1);}glow(hx,hy-1,8*sc,"255,80,90",0.25);}
/* the chase animals use the same mutated-creature models as the opening cutscene (window.Ea) */
function c3Ea(x,y,f,kind,t,k){ctx.save();ctx.translate(Math.round(x*2)/2,Math.round(y*2)/2);ctx.scale(f*k,k);window.Ea(0,0,0.5,t,kind);ctx.restore();}
function c3Wolf(x,f,ph,st,sc){const k=0.62*sc,head=33*k,cr=st==="warn"?1.5:0,t=ph*120;
  c3Ea(x-f*head,C2_FLOOR+cr,f,0,t,k);
  const ex=x+f*1,ey=C2_FLOOR-15*k/0.77+cr;glow(ex,ey,st==="warn"?9:4,"255,50,30",st==="warn"?0.75:0.35);
  if(st==="warn"&&(tick>>2)%2){fill("#2a0000",x-1.5,ey-16,3,8);fill("#ff4040",x-1,ey-15.5,2,5);fill("#ff4040",x-1,ey-9.5,2,1.5);}}
function c3Boar(x,f,ph,sc){const k=0.66*sc;c3Ea(x-f*36*k,C2_FLOOR,f,1,ph*110,k);}
function c3Rat(x,f,ph){const k=0.3;c3Ea(x-f*33*k,C2_FLOOR,f,0,ph*90,k);}
function c3Crow(x,y,ph,f,big){const k=0.42*(big||1);c3Ea(x-f*14*k,y+22*k,f,3,ph*60,k);glow(x,y-2,4,"255,60,40",0.3);}
function c3Flame(x,h,w,sw){const L=[["#7a1406",1],["#e04a1a",0.8],["#ff9a30",0.56],["#ffe27a",0.3]],y=C2_FLOOR+1;
  for(const q of L){const hh=h*q[1],ww=w*(0.3+0.7*q[1]);ctx.fillStyle=q[0];ctx.beginPath();ctx.moveTo(x-ww,y);ctx.quadraticCurveTo(x-ww*1.15,y-hh*0.5,x+sw*q[1],y-hh);ctx.quadraticCurveTo(x+ww*1.15,y-hh*0.5,x+ww,y);ctx.fill();}}
function c3FireWall(x0,len,inten){const L=Math.max(camX-14,x0-6),R=Math.min(camX+206,x0+len);if(L>R)return;
  glow(c3Clamp(x0+40,camX+20,camX+180),C2_FLOOR-26,60,"255,120,40",0.35*inten);
  const bg=ctx.createLinearGradient(0,C2_FLOOR-14,0,C2_FLOOR+2);bg.addColorStop(0,"rgba(224,74,26,0)");bg.addColorStop(1,"rgba(255,140,40,.9)");ctx.fillStyle=bg;ctx.fillRect(Math.max(L,x0+4),C2_FLOOR-14,R-Math.max(L,x0+4),16);
  for(let x=Math.floor(L/5)*5;x<R;x+=5){const d=x-x0;if(d<-4)continue;const k=c3Clamp((d+4)/30,0.2,1),seed=x*0.37,n=0.6*Math.sin(x*0.11+tick*0.19)+0.4*Math.sin(x*0.27-tick*0.29+seed)+0.25*Math.sin(tick*0.6+seed*3),
      h=(14+40*k)*(0.8+0.25*n)*inten;c3Flame(x+(r(x|0,980)-0.5)*2,h,4.2+1.2*k,2.2*Math.sin(tick/6+seed));}
  for(let x=Math.floor(L/9)*9+4;x<R;x+=9){const d=x-x0;if(d<6)continue;const ph=((tick*0.04+r(x|0,981))%1),hh=40*c3Clamp(d/30,0.3,1);ctx.globalAlpha=1-ph;c3Flame(x,6,2.2,0);ctx.globalAlpha=1;ctx.globalAlpha=(1-ph)*0.9;fill("#ffd868",x+Math.sin(tick/5+x)*2,C2_FLOOR-hh-ph*24,1.5,2);ctx.globalAlpha=1;}
  for(let k=0;k<14;k++){const a=((tick*0.5+k*23)%110)/110,x=x0+16+k*((len-20)/14)+Math.sin(tick/30+k)*6;if(x<camX-20||x>camX+212)continue;const sz=4+a*16;ctx.globalAlpha=0.45*(1-a);fill(k%2?"#1a1210":"#2e2420",x-sz/2,C2_FLOOR-56-a*60-sz/2,sz,sz*0.8);ctx.globalAlpha=1;}}
function c3Draw(){const S=c3S();if(c4Is())return c4Draw();
  if(room==="wroad"){
    for(const w of C3.worms){if(w.x<camX-30||w.x>camX+222||w.st<2)continue;c3WormBody(w.x,w.h,1,C3.t+w.x,c3Clamp((player.x-w.x)/40,-1,1));}
    if(C3.big){const k=C3.big.t,h=k<16?70*Math.sin(k/16*Math.PI/2):k<80?70:70*(1-(k-80)/30);c3WormBody(C3.big.x,h,2,C3.t,-0.4);}
    if(C3.fly){const f=C3.fly,c=f.c,k=f.t/58,cx=c.x+c.w/2,cy=C2_FLOOR-c.h/2-70*Math.sin(Math.PI*k);ctx.save();ctx.translate(cx,cy);ctx.rotate(k*Math.PI*1.5);ctx.translate(-cx,-(C2_FLOOR-c.h/2));c2CarBody(c);c2Wreck(c);ctx.restore();}
    if(C3.tank){const q=C3.tank;ctx.save();ctx.translate(q.x,q.y);ctx.rotate(q.rot);fill("#2a0a08",-4,-3.5,8,7);fill("#c82a1a",-3.5,-3,7,6);fill("#ff5a3a",-3.5,-3,7,1);fill("#1a1a1a",-1,-4.5,3,1.5);ctx.restore();glow(q.x,q.y,6,"255,80,40",0.3+0.2*Math.sin(tick/2));}
    if(C3.fireCut)c3FireWall(C3.fireCut.x,C3.fireCut.len,1);
    C3.ch&&!S.roadDone&&c3HazDraw();
    c3Marks();
    if(C3.pack.length){C3.pack.forEach((q)=>{if(q.k==="wolf")c3Wolf(q.x,-1,q.ph,"run",1.35);else if(q.k==="boar")c3Boar(q.x,-1,q.ph,1.4);else if(q.k==="rat")c3Rat(q.x,-1,q.ph);else c3Crow(q.x,q.y,q.ph*1.6,-1,1.3);});}
    const c=C3.ch;if(c){const done=S.roadDone;
      c3FireWall(c.fire,done?140:320,1);
      const vis=(x)=>x>player.x+16;c.boars.forEach((q)=>vis(q.x)&&c3Boar(q.x,-1,q.ph,1.3));c.wolves.slice().reverse().forEach((w)=>(w.st==="lunge"||vis(w.x))&&c3Wolf(w.x,-1,w.ph,w.st,1.1));c.rats.forEach((q)=>vis(q.x)&&c3Rat(q.x,-1,q.ph));
      c.sky.forEach((q)=>c3Crow(c.fire+20+Math.cos(q.a)*q.r*2,q.y+Math.sin(q.a)*6,tick/3+q.a*5,Math.sin(q.a)>0?1:-1,1.1));
      c.crows.forEach((q)=>{if(q.st==="mark"){const a=0.5+0.5*Math.sin(tick/2.5),k=q.t/50;ctx.globalAlpha=0.3+0.5*k;for(let s=0;s<24;s++){const an=s/24*6.283;fill("#ff3a3a",q.tx+Math.cos(an)*(6+2*k),C2_FLOOR-0.5+Math.sin(an)*1.6,1,0.5);}ctx.globalAlpha=1;
          a>0.4&&(fill("#2a0000",q.tx-1.5,C2_FLOOR-14,3,8),fill("#ff4040",q.tx-1,C2_FLOOR-13.5,2,5),fill("#ff4040",q.tx-1,C2_FLOOR-7.5,2,1.5));glow(q.tx,C2_FLOOR,9,"255,40,40",0.3*k);}
        c3Crow(q.x,q.y,tick/2,-1,1.5);});}}
  else c3ForestProps();}
function c3ForestProps(){const S=c3S(),H=(k)=>c3Has(k),g=C2_FLOOR;c4ForestNature();c4ForestSpots();
  {const x=C3_FI.axe;fill("#2a1a10",x-8,g-9,16,9);fill("#5a3a22",x-7,g-9,14,2);fill("#8a6a44",x-6,g-9,12,1);for(let k=0;k<3;k++)fill("#3a2a1a",x-5+k*4,g-8,1,7);
    if(!H("axe")){fill("#6a4a2a",x+1,g-24,2,16);fill("#8a6a44",x+1,g-24,1,16);fill("#5a5c60",x-4,g-13,8,5);fill("#9a9ca0",x-4,g-13,8,1);fill("#8a4a22",x-3,g-11,3,2);const a=0.5+0.5*Math.sin(tick/9);a>0.6&&glow(x,g-16,8,"255,240,190",0.3*a);}}
  {const x=C3_FI.leaves,n=H("leaves")?4:26;for(let k=0;k<n;k++)fill(["#c87a2a","#a85a22","#e89a3a","#8a4a1a"][k%4],x-12+((k*7)%24),g-2-((k*5)%7)*(n>10?1:0.3),3,2);}
  {const x=C3_FI.bench;fill("#3a3a3a",x-14,g-12,8,12);fill("#4a4a48",x+6,g-12,8,12);fill("#2a2a28",x-20,g-17,40,6);fill("#7a7a74",x-20,g-18,40,2);fill("#5a5a56",x-20,g-16,40,3);
    fill("#3a6a2a",x-20,g-13,6,1);fill("#3a6a2a",x+12,g-12,8,1);fill("#9a9a92",x-16,g-18,10,1);
    if(!S.bed&&!inv.includes("bedkit")){const a=0.5+0.5*Math.sin(tick/12);glow(x,g-20,12,"255,230,140",0.15*a);}}
  {const x=C3_FI.log,cut=H("wood");fill("#2a1a10",x-26,g-7,cut?22:52,7);fill("#5a4a3a",x-26,g-7,cut?22:52,2);fill("#3a2a1c",x-25,g-4,cut?20:50,1);fill("#7a6a54",x-28,g-7,3,7);fill("#9a8a70",x-27,g-6,1,5);
    if(cut){fill("#c8a068",x-4,g-7,2,7);for(let k=0;k<6;k++)fill("#c8a068",x+((k*5)%20),g-1,2,1);}else{fill("#2a1a10",x-6,g-14,1.5,8);fill("#2a1a10",x+12,g-12,1.5,6);}}
  {const x=C3_FI.moss;fill("#3a3a36",x-12,g-14,24,14);fill("#5a5a54",x-10,g-15,18,3);fill("#2a2a28",x-12,g-3,24,3);if(!H("moss")){fill("#4a8a3a",x-11,g-15,14,4);fill("#6aaa4a",x-9,g-15,8,1);fill("#3a7a2a",x-12,g-11,4,6);}else fill("#6a6a62",x-8,g-14,8,2);}
  {const x=C3_FI.pine,cut=H("bough");Ft(x,g+1,12,0.4);ctx.drawImage(c6PineSpr(cut),x-16,g+1-48,32,48);if(0){const tiers=cut?2:4;for(let k=0;k<tiers;k++){const w=24-k*5,yb=g-8-k*8,hh=11;for(let q=0;q<hh;q++){const ww=w*(q+1)/hh;fill(q%3?"#1f5a2c":"#2a6a3a",x-ww/2,yb-hh+q,ww,1);}fill("#3a8a4a",x-1,yb-hh,2,1);}if(!cut){fill("#2a6a3a",x-1,g-8-4*8-4,2,4);}}
    if(cut){fill("#c8a068",x-6,g-14,2,1);fill("#c8a068",x+4,g-16,2,1);}}
  {const x=C3_FI.vine;Ft(x,g+1,12,0.4);ctx.drawImage(c6SnagSpr(),x-20,g+1-64,40,64);
    if(!c3Got("vinea")){for(let y=0;y<44;y++)fill(y%4?"#3a6a2a":"#4a7a34",x+12+Math.sin(tick/40+y*0.2)*1.2*(y/44),g-54+y,1,1);fill("#2a4a1a",x+10,g-12,6,3);}}
  if(S.bed){const x=S.bed;fill("#3a2416",x,g-5,46,5);fill("#6a4a2a",x,g-5,46,1.5);fill("#3a2416",x-1,g-7,2,7);fill("#3a2416",x+45,g-7,2,7);
    fill("#2a6a3a",x+2,g-8,42,3);for(let k=0;k<12;k++)fill(["#c87a2a","#a85a22","#e89a3a"][k%3],x+3+k*3.4,g-9-(k%2),3,2);fill("#5a9a4a",x+1,g-11,9,4);fill("#7aba5a",x+2,g-11,6,1);
    for(let k=0;k<4;k++)fill("#8a6a3a",x+6+k*11,g-5,1,5);}}
function c3Front(){const S=c3S();if(c4Is())return c4Front();
  if(room==="wroad"){const c=C3.ch;if(c){const gap=c.fire-player.x;gap<90&&glow(player.x+6,player.y-16,26,"255,120,40",0.25*(1-gap/90));}
    if(C3.fireCut)glow(C3.fireCut.x+20,C2_FLOOR-20,40,"255,140,50",0.3);return;}
  if(C3.lie&&S.bed){ctx.save();ctx.translate(S.bed+44,C2_FLOOR-7);ctx.rotate(-Math.PI/2);Ma(0,0,playerLook,0,1,{s:Po,noshd:1,pose:c3Pose("idle",0),closed:1,env:De.forest});ctx.restore();
    if(C3.dark>0.15||(C3.cut&&C3.cut.k==="sleep")){for(let k=0;k<3;k++){const a=((tick/80+k/3)%1);ctx.globalAlpha=1-a;text("z",S.bed+4+k*3+a*8,C2_FLOOR-22-a*18,"#e8f0ff",(4+k)+'px "Press Start 2P",monospace');ctx.globalAlpha=1;}}}
  if(!C3.lie&&c3OnFloor()&&c3Pool(player.x)){fill("rgba(74,74,36,.85)",player.x-7,C2_FLOOR-2.5,14,3);fill("rgba(140,140,90,.6)",player.x-7,C2_FLOOR-2.5,14,0.5);}
  if(c3Tired()&&!dead){C3.t%70===0&&C3.drops.push({x:player.x+player.face*5*Po,y:player.y-30*Po,vy:0.2,l:40});
    C3.t%150===40&&player.walk&&parts.push({x:player.x+player.face*9,y:player.y-28*Po,vx:player.face*0.3,vy:-0.1,life:30,c:"rgba(220,230,240,.5)",s:1.5});}
  C3.drops=C3.drops.filter((d)=>{d.y+=d.vy;d.vy+=0.04;fill("#8ad8ff",d.x,d.y,1,1.5);fill("#e8f8ff",d.x,d.y,0.5,0.5);return--d.l>0;});
  room==="forest"&&c4ForestFront();}
function c3Tint(){const S=c3S();if(room==="wroad")c3FireGauge();if(c4Is()){c4Tint();C3.dark>0&&(ctx.fillStyle="rgba(0,0,4,"+C3.dark+")",ctx.fillRect(0,0,192,108));return;}
  if(room==="wroad"){ctx.save();ctx.globalCompositeOperation="multiply";ctx.fillStyle="rgb(232,184,156)";ctx.fillRect(0,0,192,108);ctx.restore();
    const c=C3.ch;if(c&&!S.roadDone){const gap=c.fire-player.x,h=c3Clamp(1-gap/150,0,1)*(0.85+0.15*Math.sin(tick/3));const gr=ctx.createLinearGradient(0,0,192,0);gr.addColorStop(0,"rgba(255,60,10,0)");gr.addColorStop(0.6,"rgba(255,60,10,"+0.05*h+")");gr.addColorStop(1,"rgba(255,90,20,"+0.32*h+")");ctx.fillStyle=gr;ctx.fillRect(0,0,192,108);}
    const k=C3.cut;if(k&&k.k==="half"&&k.t>=486&&k.t<560){const a=Math.min(1,(k.t-486)/8,(560-k.t)/14),p=1+0.06*Math.sin(k.t/3);ctx.save();ctx.translate(96,46);ctx.scale(p,p);ctx.globalAlpha=a;ctx.font='20px "Press Start 2P",monospace';ctx.textBaseline="middle";ctx.textAlign="center";ctx.fillStyle="#000";ctx.fillText("RUN!",1,1);ctx.fillStyle="#ff4a3a";ctx.fillText("RUN!",0,0);ctx.restore();ctx.textAlign="left";ctx.globalAlpha=1;}}
  else{ctx.save();ctx.globalCompositeOperation="multiply";ctx.fillStyle="rgb(196,214,186)";ctx.fillRect(0,0,192,108);ctx.restore();
    const vg=C3.cache.fVig||(C3.cache.fVig=(()=>{const q=ctx.createRadialGradient(96,54,30,96,54,120);q.addColorStop(0,"rgba(0,0,0,0)");q.addColorStop(1,"rgba(0,8,4,.55)");return q;})());ctx.fillStyle=vg;ctx.fillRect(0,0,192,108);
    for(let k=0;k<10;k++){const x=((r(k,970)*230+tick*0.12*(k%3+1))%230)-20,y=((r(k,971)*100+Math.sin(tick/60+k)*6)%100),a=0.4+0.4*Math.sin(tick/20+k);ctx.globalAlpha=a*0.7;fill("#d8ff8a",x,y,0.5,0.5);ctx.globalAlpha=1;}
    S.done&&c4Tint();
    if(c3TiredF()&&!C3.cut){const p=0.5+0.5*Math.sin(tick/50);ctx.fillStyle="rgba(10,0,0,"+(0.08+0.06*p)+")";ctx.fillRect(0,0,192,108);
      fill("#04030bcc",40,2,43,9);fill("#8ad8ff",43,4,2,3);fill("#8ad8ff",42.5,5,3,2);text("THIRSTY",47,4,"#ffb0a0",'4px "Press Start 2P",monospace');}}
  if(C3.dark>0){ctx.fillStyle="rgba(0,0,4,"+C3.dark+")";ctx.fillRect(0,0,192,108);}}

/* ---------------- the wiring board, painted ---------------- */
function c3WBoard(){return C3.cache.wb||(C3.cache.wb=(()=>{const c=c3Cv(384,216),g=c.getContext("2d"),F=(cl,x,y,w,h)=>{g.fillStyle=cl;g.fillRect(x,y,w,h);};
  const gr=g.createLinearGradient(0,0,0,216);gr.addColorStop(0,"#1a1010");gr.addColorStop(0.45,"#3a2216");gr.addColorStop(1,"#120c0a");g.fillStyle=gr;g.fillRect(0,0,384,216);
  for(let i=0;i<9;i++)F("rgba(10,6,6,.5)",i*46-10,40+(i%3)*8,38,60);
  F("#6a5034",14,104,356,108);F("#8a6a48",14,104,356,3);F("#4a3622",14,209,356,3);for(let n=0;n<500;n++)F(r(n,990)<0.5?"#7a5c3c":"#5e4630",14+r(n,991)*354,107+r(n,992)*100,1,1);
  for(let n=0;n<6;n++)F("rgba(40,26,14,.35)",30+n*58,110,1,96);
  g.font='5px "Press Start 2P",monospace';g.fillStyle="#3a2414";g.fillText("THIS SIDE UP",22,206);
  return c;})());}
function c3WPaint(g){const W=C3W,R=C3_RND[W.round],st=c3Cells(R),F=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h);};
  g.save();W.shake&&g.translate((Math.random()-0.5)*W.shake*0.4,(Math.random()-0.5)*W.shake*0.4);g.drawImage(c3WBoard(),0,0);
  /* radio */
  const cx=192,top=4;g.strokeStyle="#1a1c1e";g.lineWidth=3;g.beginPath();g.moveTo(cx-60,top+8);g.lineTo(cx-80,top-6);g.stroke();
  F("#0a0b0c",cx-76,top-1,152,80);F("#3a4232",cx-75,top,150,78);F("#4c5642",cx-75,top,150,2);F("#2a3024",cx-75,top+76,150,2);
  F("#22261e",cx-66,top+8,58,30);for(let y=0;y<3;y++)for(let x=0;x<7;x++)F("#0e100c",cx-62+x*8,top+12+y*8,4,4);
  const lit=W.phase!=="fire",okP=W.phase==="ok",bad=W.phase==="bad"||W.phase==="fire";F("#141810",cx+4,top+8,64,26);F(okP?"#b8e070":bad?"#e08a50":lit?"#8aa868":"#2a3226",cx+6,top+10,60,22);
  g.font='6px "Press Start 2P",monospace';g.textBaseline="top";g.fillStyle="#1a2410";
  const v=W.v==null?"":(Math.round(W.v*10)/10).toFixed(1)+"V",lcd=W.phase==="test"?((W.pt>>3)%2?"TESTING":"TEST..."):okP?(((W.pt>>5)%2)?"RX ":"OK ")+v:bad?((W.pt>>3)%2?"HOT!":v):W.phase==="mal"?((W.pt>>2)%2?"ERR":"!!!"):(W.wires.length&&W.live!=null&&(W.f>>6)%2?(Math.round(W.live*10)/10).toFixed(1)+"/"+R.V.toFixed(1):"NEED "+R.V.toFixed(1)+"V");
  g.fillText(lcd,cx+10,top+18);
  const led=okP?"#40ff60":bad?((W.pt>>2)%2?"#ff3a2a":"#6a1408"):W.phase==="test"?"#ffd23a":"#1a2a1a";F(led,cx+58,top+42,6,6);
  [[cx+18,top+56],[cx+42,top+56]].forEach(([x,y],i)=>{F("#0a0b0c",x-8,y-8,16,16);F("#22261e",x-7,y-7,14,14);g.strokeStyle="#c8c8b0";g.lineWidth=1.5;const a=okP?W.f/9+i:-0.6+i;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(a)*6,y+Math.sin(a)*6);g.stroke();});
  /* sticky note */
  g.save();g.translate(143,60);g.rotate(-0.06);F("rgba(0,0,0,.35)",-17,-15,36,34);F("#ffe86a",-18,-17,36,34);F("#f0d040",-18,-17,36,4);g.fillStyle="#4a3a10";g.font='4px "Press Start 2P",monospace';
  g.fillText("+ TO -",-15,-10);g.fillText("=MORE V",-15,-4);g.fillText("+ TO +",-15,3);g.fillText("=LONGER",-15,9);g.restore();
  if(!W.noteSeen){const a=0.5+0.5*Math.sin(W.f/8);g.strokeStyle="rgba(255,240,120,"+a+")";g.lineWidth=1.5;g.strokeRect(122,42,42,38);g.font='5px "Press Start 2P",monospace';g.fillStyle="rgba(255,240,120,"+a+")";g.fillText("TAP!",130,34);}
  /* terminal block */
  F("#0e0f10",150,84,92,16);F("#2a2c2e",150,84,92,2);g.font='5px "Press Start 2P",monospace';g.fillStyle="#9aa0a8";g.fillText("RADIO",181,102);
  /* cells */
  for(const L of"ABCD"){const s2=st[L],x=C3_CX[L],fl=(R.flip||"").includes(L);g.globalAlpha=s2==="spare"?0.3:1;
    F("#0a0a0c",x-13,119,26,71);F(C3_CC[L],x-12,120,24,69);F("rgba(255,255,255,.22)",x-10,121,4,67);F("rgba(0,0,0,.25)",x+6,121,5,67);
    F("#d8d8d0",x-12,fl?180:120,24,9);F("#a8a8a0",x-12,fl?188:120,24,1);F("#c8c8c0",x-4,fl?189:116,8,4);
    g.font='10px "Press Start 2P",monospace';g.fillStyle="#ffffff";g.fillText(L,x-5,144);g.font='5px "Press Start 2P",monospace';g.fillText("1.5V",x-10,160);
    g.font='7px "Press Start 2P",monospace';g.fillStyle="#1a1a1a";g.fillText(fl?"-":"+",x-3,fl?122:181);g.fillText(fl?"+":"-",x-3,fl?181:122);
    if(s2==="avoid"){g.strokeStyle="#1a0a0a";g.lineWidth=1;g.beginPath();g.moveTo(x-8,126);g.lineTo(x-2,140);g.lineTo(x-6,152);g.lineTo(x+3,170);g.stroke();F("#c8e83a",x+2,140+((W.f/3)%40),2,3);F("#a8c82a",x-6,186,10,3);
      F("#c82a1a",x-16,96+12,32,8);g.fillStyle="#fff";g.font='4px "Press Start 2P",monospace';g.fillText("CRACKED",x-14,110);}
    if(s2==="dead"){F("#5aba6a",x-10,fl?186:114,20,4);F("#3a8a4a",x-6,fl?110:190,12,3);F("#3a3a3a",x-16,108,32,8);g.fillStyle="#cfc";g.font='4px "Press Start 2P",monospace';g.fillText("CORRODED",x-15,110);}
    if(s2==="spare"){g.fillStyle="#fff";g.font='5px "Press Start 2P",monospace';g.fillText("SPARE",x-12,100+10);}
    if(W.strikes&&R.use.includes(L)){g.globalAlpha=0.12*W.strikes+0.08*Math.sin(W.f/5);F("#ff2a0a",x-13,119,26,71);}
    g.globalAlpha=1;}
  /* pads */
  const P=c3PadsC(),hov=c3PadAt(W.mx,W.my);
  for(const p of P){const sel=W.sel===p.id;g.fillStyle="#0a0a0a";g.beginPath();g.arc(p.x,p.y,6.5,0,7);g.fill();g.fillStyle=p.pol>0?"#d83a2a":"#2a2c30";g.beginPath();g.arc(p.x,p.y,5.5,0,7);g.fill();
    g.fillStyle="#c8c8c0";g.beginPath();g.arc(p.x,p.y,3,0,7);g.fill();g.fillStyle="#ffffff";g.fillRect(p.x-2,p.y-2,1.5,1.5);
    if(!p.cell){g.font='8px "Press Start 2P",monospace';g.fillStyle=p.pol>0?"#ff6a5a":"#e8e8e8";g.fillText(p.pol>0?"+":"-",p.x-3,p.y-16);}
    if(sel||(hov&&hov.id===p.id&&W.phase==="wire")){g.strokeStyle=sel?"rgba(255,230,80,"+(0.6+0.4*Math.sin(W.f/4))+")":"rgba(255,255,255,.7)";g.lineWidth=1.5;g.beginPath();g.arc(p.x,p.y,9,0,7);g.stroke();}}
  /* wires */
  W.wires.forEach((w,i)=>{const q=c3WirePts(w[0],w[1]);if(!q)return;const col=C3_WC[i%C3_WC.length];g.lineCap="round";
    g.strokeStyle="#050505";g.lineWidth=4;g.beginPath();g.moveTo(q[0],q[1]);g.quadraticCurveTo(q[2],q[3],q[4],q[5]);g.stroke();
    g.strokeStyle=col;g.lineWidth=2.4;g.stroke();g.strokeStyle="rgba(255,255,255,.35)";g.lineWidth=0.8;g.stroke();
    [[q[0],q[1]],[q[4],q[5]]].forEach(([x,y])=>{F("#b8b8b0",x-2,y-2,4,4);F(col,x-1,y-1,2,2);});});
  if(W.hint&&W.hint.t>0){W.hint.t--;const q=c3WirePts(W.hint.w[0],W.hint.w[1]);if(q){g.setLineDash([4,3]);g.lineDashOffset=-W.f/2;g.strokeStyle="rgba(255,240,120,"+(0.5+0.4*Math.sin(W.f/5))+")";g.lineWidth=3;g.beginPath();g.moveTo(q[0],q[1]);g.quadraticCurveTo(q[2],q[3],q[4],q[5]);g.stroke();g.setLineDash([]);}}
  if(W.drag&&W.drag.moved){g.setLineDash([3,3]);g.strokeStyle="rgba(255,240,140,.9)";g.lineWidth=1.5;const P2=P.find((p)=>p.id===W.drag.from);P2&&(g.beginPath(),g.moveTo(P2.x,P2.y),g.lineTo(W.mx,W.my),g.stroke());g.setLineDash([]);}
  /* current flow sparkles when it works */
  if(W.phase==="ok")W.wires.forEach((w,i)=>{const q=c3WirePts(w[0],w[1]);if(!q)return;const k=((W.f/40)+i*0.3)%1,u=1-k;F("#ffffa0",u*u*q[0]+2*u*k*q[2]+k*k*q[4]-1,u*u*q[1]+2*u*k*q[3]+k*k*q[5]-1,2,2);});
  /* smoke, sparks, flames */
  W.fx.forEach((p)=>{if(p.smoke){g.globalAlpha=Math.min(0.6,p.life/50);g.fillStyle=p.c;g.beginPath();g.arc(p.x,p.y,p.r+(50-p.life)*0.08,0,7);g.fill();}else if(p.flame){g.globalAlpha=p.life/30;F(p.c,p.x-2,p.y-3,4,6);}else{g.globalAlpha=Math.min(1,p.life/20);F(p.c,p.x,p.y,1.5,1.5);}g.globalAlpha=1;});
  if(W.phase==="fire"){const a=Math.min(1,W.pt/60);g.fillStyle="rgba(255,80,20,"+0.25*a+")";g.fillRect(0,0,384,216);}
  if(W.phase==="ok"){g.globalAlpha=0.05;for(let k=0;k<90;k++)F(Math.random()<0.5?"#fff":"#000",Math.random()*384,Math.random()*100,1,1);g.globalAlpha=1;}
  const vg=C3.cache.wvg||(C3.cache.wvg=(()=>{const q=g.createRadialGradient(192,108,90,192,108,250);q.addColorStop(0,"rgba(0,0,0,0)");q.addColorStop(1,"rgba(0,0,0,.55)");return q;})());g.fillStyle=vg;g.fillRect(0,0,384,216);g.restore();}

/* ---------------- inventory icons ---------------- */
var C3K={axe:1,wood:1,bough:1,leaves:1,moss:1,rope:1,frame:1,bedding:1,pillow:1,bedkit:1,batt:1};
function c3Icon(t){const o=c3Cv(24,24),g=o.getContext("2d"),n=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(x,y,w,h);};
  if(t==="batt"){n("#0a0c14",3,3,18,18);[[4,4,"#2a6ad8"],[12,4,"#d8862a"],[4,12,"#3aa84a"],[12,12,"#9a4ad8"]].forEach(([x,y,c])=>{n(c,x,y,7,7);n("rgba(255,255,255,.35)",x,y,7,1);n("#e8e8e0",x+7,y+2,1,3);});}
  else if(t==="axe"){n("#0a0c14",3,2,18,20);for(let k=0;k<14;k++)n(k%3?"#8a6a44":"#6a4a2a",5+k,20-k,2,2);n("#5a5c60",12,3,8,8);n("#9a9ca0",12,3,8,2);n("#8a4a22",14,8,3,2);n("#3a3c40",12,10,8,1);}
  else if(t==="wood"){n("#0a0c14",2,5,20,15);for(let k=0;k<3;k++){n("#8a5a32",3,6+k*5,18,4);n("#b88a5a",3,6+k*5,18,1);n("#d8b080",20,6+k*5,2,4);n("#6a4a2a",4,9+k*5,16,1);}}
  else if(t==="bough"){n("#0a0c14",2,2,20,20);n("#5a3a22",11,4,2,17);for(let k=0;k<6;k++){n(k%2?"#2a6a3a":"#3a8a4a",4+k%2,5+k*3,8,2);n(k%2?"#2a6a3a":"#3a8a4a",12,6+k*3,8-(k%2),2);}}
  else if(t==="leaves"){n("#0a0c14",2,6,20,14);for(let k=0;k<14;k++)n(["#c87a2a","#a85a22","#e89a3a","#8a4a1a"][k%4],3+((k*7)%17),7+((k*5)%11),4,3);}
  else if(t==="moss"){n("#0a0c14",3,7,18,13);n("#3a7a2a",4,9,16,10);n("#5aaa4a",5,8,14,3);for(let k=0;k<8;k++)n("#7aca5a",5+k*2,8+(k%3),1,1);}
  else if(t==="rope"){n("#0a0c14",2,3,20,18);g.strokeStyle="#4a7a2a";g.lineWidth=2;for(let k=0;k<3;k++){g.beginPath();g.ellipse(12,12,8-k*2.5,7-k*2,0,0,7);g.stroke();}n("#6a9a3a",17,15,4,2);}
  else if(t==="frame"){n("#0a0c14",2,5,20,15);n("#8a5a32",3,6,18,3);n("#8a5a32",3,16,18,3);n("#8a5a32",3,6,3,13);n("#8a5a32",18,6,3,13);[[4,7],[18,7],[4,16],[18,16]].forEach(([x,y])=>n("#4a7a2a",x,y,2,2));}
  else if(t==="bedding"){n("#0a0c14",2,8,20,12);n("#2a6a3a",3,13,18,6);n("#3a8a4a",3,13,18,1);for(let k=0;k<8;k++)n(["#c87a2a","#e89a3a"][k%2],3+k*2.3,9+(k%2),3,4);}
  else if(t==="pillow"){n("#0a0c14",3,8,18,10);n("#4a8a3a",4,9,16,8);n("#7aba5a",5,9,14,2);n("#3a6a2a",4,15,16,2);}
  else if(t==="bedkit"){n("#0a0c14",2,6,20,14);n("#8a5a32",3,15,18,4);n("#2a6a3a",3,11,18,4);n("#c87a2a",4,9,16,3);n("#5a9a4a",3,7,6,4);n("#4a7a2a",8,7,1,12);n("#4a7a2a",15,7,1,12);}
  return o.toDataURL();}

/* the four cells, taped into a pack and wired to the radio (used by the radio close-ups once they are wired) */
function c3PackArt(g,cx,top){const F=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h);},y=top+152;
  g.strokeStyle="#c82a1a";g.lineWidth=2;g.beginPath();g.moveTo(cx+30,y+4);g.quadraticCurveTo(cx+54,y-2,cx+50,top+132);g.stroke();
  g.strokeStyle="#1a1a1a";g.beginPath();g.moveTo(cx-30,y+4);g.quadraticCurveTo(cx-54,y-2,cx-50,top+132);g.stroke();
  [["#2a6ad8",-34],["#d8862a",-16],["#3aa84a",2],["#9a4ad8",20]].forEach(([c,dx])=>{F("#0a0a0a",cx+dx-1,y-1,16,12);F(c,cx+dx,y,14,10);F("rgba(255,255,255,.3)",cx+dx,y+1,14,2);F("#e8e8e0",cx+dx+12,y+3,2,4);});
  F("rgba(200,200,190,.75)",cx-36,y+3,72,4);g.strokeStyle="#ffd23a";g.lineWidth=1;for(let k=0;k<3;k++){g.beginPath();g.moveTo(cx-20+k*18,y+10);g.quadraticCurveTo(cx-11+k*18,y+16,cx-2+k*18,y+10);g.stroke();}}
/* ---------------- the extra chase dangers, drawn ---------------- */
function c3HazDraw(){const H=C3.hz;if(!H)return;
  for(const car of C2.wroad.cars){const q=H.cars[car.x];if(!q||q.st!==1||car.x>camX+220||car.x+car.w<camX-20)continue;const k=q.t/66,fl=(tick>>(k>0.6?1:2))%2;
    glow(car.x+car.w/2,C2_FLOOR-car.h/2,18+14*k,"255,120,40",0.25+0.35*k*fl);
    for(let s=0;s<3;s++){const sx=car.x+4+((tick*3+s*13)%(car.w-8));fill("#fff8c0",sx,C2_FLOOR-car.h*0.35-(s%2),1,1);}
    fill("rgba(60,40,20,.55)",car.x+car.w*0.3,C2_FLOOR-0.6,car.w*0.5,0.8);/* fuel puddle */
    if(fl){const tx=car.x+car.w/2;ctx.fillStyle="#ffd23a";ctx.beginPath();ctx.moveTo(tx,C2_FLOOR-car.h-16);ctx.lineTo(tx-6,C2_FLOOR-car.h-5);ctx.lineTo(tx+6,C2_FLOOR-car.h-5);ctx.fill();fill("#1a1a1a",tx-0.5,C2_FLOOR-car.h-13,1,4);fill("#1a1a1a",tx-0.5,C2_FLOOR-car.h-7.5,1,1);}
    const R=car.x+car.w;ctx.globalAlpha=0.18+0.2*k;fill("#ff3a2a",car.x-18,C2_FLOOR-0.5,car.w+36,1);ctx.globalAlpha=1;void R;}
  for(const p of H.poles){if(p.x<camX-60||p.x>camX+250)continue;const g=C2_FLOOR;
    if(p.st<2){const k=p.st?c3Ez(p.t/52):0,h=46*(1-k*0.86),lean=k*10;/* toppling toward us: foreshortened */
      if(p.st===1){const a=0.35+0.35*Math.sin(tick/3);ctx.globalAlpha=a;fill("#ff3a2a",p.x-10,g-1,20,2);ctx.globalAlpha=1;for(let s=0;s<20;s++)fill("#ff3a3a",p.x-10+s,g+0.5+Math.sin(s)*0.4,0.6,0.6);}
      ctx.fillStyle="#2a1c14";ctx.beginPath();ctx.moveTo(p.x-1.8,g);ctx.lineTo(p.x+1.8,g);ctx.lineTo(p.x+1.4+lean,g-h);ctx.lineTo(p.x-1.4+lean,g-h);ctx.fill();
      fill("#3a2a1e",p.x-10+lean,g-h+4,20,1.8);fill("#5a5c60",p.x-9+lean,g-h+2.5,2,1.5);fill("#5a5c60",p.x+7+lean,g-h+2.5,2,1.5);
      ctx.save();ctx.translate(0,-(h-4));c3Flame(p.x+lean,10+3*Math.sin(tick/5),3,Math.sin(tick/6));ctx.restore();glow(p.x+lean,g-h+2,12,"255,140,50",0.3);
      fill("#8a6a44",p.x-1.8,g-6,3.6,1);}
    else{ctx.fillStyle="#2a1c14";ctx.beginPath();ctx.ellipse(p.x,g-3,5.5,3.2,0,0,7);ctx.fill();ctx.fillStyle="#3a2a1e";ctx.beginPath();ctx.ellipse(p.x-1,g-4,3.5,1.6,0,0,7);ctx.fill();
      fill("#c8a068",p.x-2,g-5,2,2);c3Flame(p.x-2,7+2*Math.sin(tick/4),2.6,Math.sin(tick/5));c3Flame(p.x+2,6+2*Math.sin(tick/4+1),2.2,Math.sin(tick/6));glow(p.x,g-4,10,"255,140,50",0.3);}}
  for(const k of H.sinks){if(k.st!==1||k.x<camX-30||k.x>camX+222)continue;const a=k.t/44;ctx.strokeStyle="rgba(14,14,16,.9)";ctx.lineWidth=0.6;
    for(let s=0;s<6;s++){const an=s/6*6.283;ctx.beginPath();ctx.moveTo(k.x,C2_FLOOR+1.5);ctx.lineTo(k.x+Math.cos(an)*14*a,C2_FLOOR+1.5+Math.sin(an)*2*a);ctx.stroke();}
    fill("rgba(255,60,40,"+(0.25*Math.sin(tick/3)**2)+")",k.x-12,C2_FLOOR,24,2);}
  if(H.rw&&H.rw.t<50){const a=(tick>>2)%2;a&&(ctx.fillStyle="#ffd23a",ctx.beginPath(),ctx.moveTo(camX+188,C2_FLOOR-12),ctx.lineTo(camX+180,C2_FLOOR-18),ctx.lineTo(camX+180,C2_FLOOR-6),ctx.fill());
    for(let s=0;s<4;s++)fill("#6a5a48",camX+186-s*3,C2_FLOOR-1-((tick+s*5)%6),2,1);text("RATS!",camX+152,C2_FLOOR-22,"#ffd23a",'5px "Press Start 2P",monospace');}
  H.rats.forEach((q)=>c3Rat(q.x,-1,q.ph));
  /* something is about to happen just off the left edge: flash a warning there */
  const off=Object.keys(H.cars).some((k)=>H.cars[k].st===1&&+k+60<camX)||H.poles.some((p)=>p.st===1&&p.x<camX+4);
  if(off&&(tick>>2)%2){const x=camX+4,y=C2_FLOOR-30;ctx.fillStyle="#ffd23a";ctx.beginPath();ctx.moveTo(x+6,y-8);ctx.lineTo(x,y+4);ctx.lineTo(x+12,y+4);ctx.fill();fill("#1a1a1a",x+5.5,y-4,1,4);fill("#1a1a1a",x+5.5,y+1.5,1,1);fill("#ffd23a",x+1,y+8,2,2);fill("#ffd23a",x+4,y+8,6,2);}}

/* ---------------- clear warning marks for the road's dangers ---------------- */
function c3Tri(x,y,col){ctx.fillStyle="#1a1208";ctx.beginPath();ctx.moveTo(x,y-9);ctx.lineTo(x-7,y+3);ctx.lineTo(x+7,y+3);ctx.fill();ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(x,y-7.2);ctx.lineTo(x-5.3,y+1.9);ctx.lineTo(x+5.3,y+1.9);ctx.fill();
  fill("#1a1208",x-0.5,y-4,1,3.4);fill("#1a1208",x-0.5,y-0.2,1,1);}
function c3Cone(x){const g=C2_FLOOR;fill("rgba(0,0,0,.35)",x-2.5,g+0.4,5,0.8);ctx.fillStyle="#ff7a1a";ctx.beginPath();ctx.moveTo(x,g-6);ctx.lineTo(x-2.4,g);ctx.lineTo(x+2.4,g);ctx.fill();fill("#ffffff",x-1.5,g-3.4,3,1);fill("#c85a10",x-3,g-0.5,6,0.8);}
function c3Marks(){if(room!=="wroad"||c3S().roadDone||C3.cut)return;const px=player.x,g=C2_FLOOR,bl=(tick>>3)&1,fast=(tick>>2)&1,bob=Math.sin(tick/6)*1.4;
  for(const h of C3.holes){if(h.x<camX-30||h.x>camX+222)continue;const w=c3HoleW(h),ahead=px-h.x;
    c3Cone(h.x-w/2-3);c3Cone(h.x+w/2+3);
    if(ahead>-4&&ahead<170){const near=ahead<70;if(!near||fast){ctx.fillStyle="#1a1208";ctx.beginPath();ctx.moveTo(h.x,g-15+bob);ctx.lineTo(h.x-6,g-24+bob);ctx.lineTo(h.x+6,g-24+bob);ctx.fill();
        ctx.fillStyle=near?"#ff4a2a":"#ffb02a";ctx.beginPath();ctx.moveTo(h.x,g-16.5+bob);ctx.lineTo(h.x-4.6,g-22.6+bob);ctx.lineTo(h.x+4.6,g-22.6+bob);ctx.fill();}
      near&&text("JUMP",h.x-6.5,g-31+bob,"#ffe070",'4px "Press Start 2P",monospace');}}
  for(const w of C3.worms){if(w.x<camX-30||w.x>camX+222)continue;const ahead=px-w.x;
    fill("#5a5c60",w.x+12,g-13,1,13);c3Tri(w.x+12.5,g-17,"#ffd23a");
    if(w.st===0&&ahead>0&&ahead<200){if(bl||ahead>110){ctx.fillStyle="#ff3a2a";ctx.beginPath();ctx.arc(w.x,g-14+bob,5,0,7);ctx.fill();fill("#ffffff",w.x-0.5,g-17.5+bob,1,4);fill("#ffffff",w.x-0.5,g-12.5+bob,1,1);}}
    if(w.st===1){const a=0.25+0.3*Math.sin(w.t/2);ctx.globalAlpha=a;fill("#ff3a2a",w.x-11,g-1,22,2.2);fill("#ff3a2a",w.x-8,g-8,16,7);ctx.globalAlpha=1;
      ctx.fillStyle="#ff3a2a";ctx.beginPath();ctx.arc(w.x,g-18+bob,6,0,7);ctx.fill();fill("#ffffff",w.x-0.6,g-22.5+bob,1.2,5);fill("#ffffff",w.x-0.6,g-16+bob,1.2,1.4);
      text("BACK OFF",w.x-14,g-29,"#ff8a7a",'4px "Press Start 2P",monospace');}}
  for(const v of C3.fv){if(v.k!=="x"||v.x<camX-30||v.x>camX+222)continue;const ahead=px-v.x;if(ahead>0&&ahead<120&&bl){c3Tri(v.x,g-14+bob*0.5,"#ff8a2a");}}
  const HZ=C3.hz,F5='4px "Press Start 2P",monospace';
  for(const car of C2.wroad.cars){if(car.x<camX-60||car.x>camX+250||car.hide)continue;const Rr=car.x+car.w,ahead=px-Rr,cx=car.x+car.w/2,blast=C3_BLAST.indexOf(car.x)>=0,bq=HZ&&HZ.cars[car.x],st=bq?bq.st:0;
    if(blast&&!car.burn&&st<2&&ahead>-6&&ahead<240){/* a leaking car: danger sign, a green WAIT line to stand behind, then a countdown */
      const wx=Rr+44,pulse=(tick>>2)&1;
      ctx.fillStyle="#1a0a06";ctx.beginPath();ctx.moveTo(cx,g-car.h-9+bob);ctx.lineTo(cx-8,g-car.h-23+bob);ctx.lineTo(cx+8,g-car.h-23+bob);ctx.fill();
      ctx.fillStyle=st===1&&pulse?"#ffffff":"#ff3a2a";ctx.beginPath();ctx.moveTo(cx,g-car.h-10.5+bob);ctx.lineTo(cx-6.4,g-car.h-21.8+bob);ctx.lineTo(cx+6.4,g-car.h-21.8+bob);ctx.fill();
      fill(st===1&&pulse?"#ff3a2a":"#ffffff",cx-0.6,g-car.h-19.5+bob,1.2,5);fill(st===1&&pulse?"#ff3a2a":"#ffffff",cx-0.6,g-car.h-13.5+bob,1.2,1.2);
      text(st===1?"BOOM IN "+Math.max(1,3-((bq.t/32)|0)):"DANGER",cx-(st===1?19:15),g-car.h-30+bob,st===1?"#ffe070":"#ff8a7a",F5);
      ctx.globalAlpha=0.8;for(let y=2;y<16;y+=3)fill("#6aff8a",wx,g-y,1,1.6);ctx.globalAlpha=1;
      if(ahead>wx-Rr-6)text("WAIT HERE",wx-14,g-22+bob*0.5,"#8aff9a",F5);
      continue;}
    if(ahead>-4&&ahead<62&&car.h<=24){/* every other car: a clear JUMP sign right before you reach it */
      const near=ahead<46;if(!near||(tick>>2)&1){ctx.fillStyle="#0a1a0c";ctx.beginPath();ctx.moveTo(cx,g-car.h-9+bob);ctx.lineTo(cx-6,g-car.h-18+bob);ctx.lineTo(cx+6,g-car.h-18+bob);ctx.fill();
        ctx.fillStyle="#6aff8a";ctx.beginPath();ctx.moveTo(cx,g-car.h-10.5+bob);ctx.lineTo(cx-4.6,g-car.h-16.6+bob);ctx.lineTo(cx+4.6,g-car.h-16.6+bob);ctx.fill();}
      near&&text("JUMP",cx-6.5,g-car.h-25+bob,"#aaffb8",F5);}}}
function c3FireGauge(){const c=C3.ch;if(!c||c3S().roadDone||C3.cut)return;const gap=c.fire-player.x,k=c3Clamp(1-gap/190,0,1),hot=gap<50,x=72,y=3;
  fill("#04030bcc",x,y,48,9);fill("#8ad8ff",x+3,y+3,2,3);fill("#8ad8ff",x+2.5,y+2,3,1.5);
  fill("#1a1a2a",x+8,y+2.5,28,4);fill(hot?"#ff3a2a":k>0.6?"#ff8a2a":"#ffc03a",x+8,y+2.5,28*k,4);fill("rgba(255,255,255,.3)",x+8,y+2.5,28*k,1);
  ctx.fillStyle=hot&&(tick>>2)%2?"#ffffff":"#ff6a2a";ctx.beginPath();ctx.moveTo(x+41,y+1.5);ctx.quadraticCurveTo(x+38.5,y+5,x+41,y+7.4);ctx.quadraticCurveTo(x+43.5,y+5,x+41,y+1.5);ctx.fill();}
