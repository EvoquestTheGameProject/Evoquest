
/* ======================= DREAM: drawing ======================= */
function c3DBub(g,x,y,t,col){g.font='5px "Press Start 2P",monospace';g.textBaseline="top";const w=Math.ceil(g.measureText(t).width)+6;g.fillStyle="#fff";g.fillRect(x-w/2,y-9,w,9);g.fillRect(x-w/2+1,y-10,w-2,1);g.fillRect(x-w/2+1,y,w-2,1);g.fillRect(x-1,y+1,3,2);g.fillStyle=col||"#e82a2a";g.fillText(t,x-w/2+3,y-7);}
/* a real palm: curved ringed trunk, drooping fronds that sway, coconuts */
function c3Palm(g,x,gy,h,lean,sc,f,sd,detail){const n=11,pts=[];for(let i=0;i<=n;i++){const t=i/n;pts.push([x+lean*h*t*t+1.8*sc*Math.sin(sd+t*2.2),gy-h*t]);}
  g.lineCap="butt";
  for(let i=0;i<n;i++){const a=pts[i],b=pts[i+1],t=i/n,w=(6.4-3*t)*sc;g.strokeStyle=i%2?"#6a4a2a":"#7e5a34";g.lineWidth=w;g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke();
    g.strokeStyle="rgba(255,226,160,.25)";g.lineWidth=Math.max(0.8,w*0.26);g.beginPath();g.moveTo(a[0]-w*0.26,a[1]);g.lineTo(b[0]-w*0.26,b[1]);g.stroke();
    g.strokeStyle="rgba(30,16,6,.55)";g.lineWidth=Math.max(0.5,sc*0.6);g.beginPath();g.moveTo(a[0]-w/2,a[1]);g.lineTo(a[0]+w/2,a[1]);g.stroke();}
  g.fillStyle="#6a4a2a";g.beginPath();g.moveTo(x-5.5*sc,gy+1);g.quadraticCurveTo(x-2.5*sc,gy-4*sc,x-2*sc,gy-9*sc);g.lineTo(x+2.6*sc,gy-9*sc);g.quadraticCurveTo(x+2.5*sc,gy-4*sc,x+5.5*sc,gy+1);g.fill();
  const cx=pts[n][0],cy=pts[n][1],N=11;
  for(let i=0;i<N;i++){const a=-Math.PI*1.06+(i/(N-1))*Math.PI*1.12+0.06*Math.sin(f/38+i*1.3+sd),L=(24+(i%3)*4+(i===5?5:0))*sc,
      ex=cx+Math.cos(a)*L,ey=cy+Math.sin(a)*L*0.5+Math.abs(Math.cos(a))*L*0.42,mx=cx+Math.cos(a)*L*0.5,my=cy+Math.sin(a)*L*0.5-8*sc,w=3.8*sc,dx=ex-cx,dy=ey-cy,dl=Math.hypot(dx,dy)||1,nx=-dy/dl,ny=dx/dl;
    g.fillStyle=i%2?"#1f6a2a":"#2e8a3a";g.beginPath();g.moveTo(cx,cy);g.quadraticCurveTo(mx+nx*w,my+ny*w,ex,ey);g.quadraticCurveTo(mx-nx*w,my-ny*w,cx,cy);g.fill();
    g.strokeStyle="rgba(150,210,100,.7)";g.lineWidth=Math.max(0.6,0.7*sc);g.beginPath();g.moveTo(cx,cy);g.quadraticCurveTo(mx,my,ex,ey);g.stroke();
    if(detail){g.strokeStyle="rgba(14,60,22,.8)";g.lineWidth=Math.max(0.5,0.5*sc);for(let t=0.25;t<0.95;t+=0.15){const u=1-t,px=u*u*cx+2*u*t*mx+t*t*ex,py=u*u*cy+2*u*t*my+t*t*ey;g.beginPath();g.moveTo(px,py);g.lineTo(px+nx*w*0.95*(1-t*0.6),py+ny*w*0.95*(1-t*0.6));g.stroke();g.beginPath();g.moveTo(px,py);g.lineTo(px-nx*w*0.95*(1-t*0.6),py-ny*w*0.95*(1-t*0.6));g.stroke();}}}
  [[-3,3],[1,4],[3,1.5]].forEach(([ox,oy])=>{g.fillStyle="#3a2412";g.beginPath();g.arc(cx+ox*sc,cy+oy*sc,2.4*sc,0,7);g.fill();g.fillStyle="#6a4426";g.beginPath();g.arc(cx+ox*sc-0.6*sc,cy+oy*sc-0.6*sc,1.1*sc,0,7);g.fill();});}
function c3Pier(g,x0,x1,f){const y=102,F=(c,a,b,w,h)=>{g.fillStyle=c;g.fillRect(Math.round(a),Math.round(b),w,h);};
  for(let px=x0+6;px<x1;px+=18){F("#3a2814",px,y+5,3,24);F("#5a4024",px,y+5,1,24);F("rgba(255,255,255,.35)",px-1,127,5,1);}
  F("#3a2814",x0,y+3,x1-x0,2);F("#9a7a4a",x0,y,x1-x0,3);F("#c8a468",x0,y,x1-x0,1);for(let px=x0+4;px<x1;px+=6)F("#6a4a28",px,y,1,3);
  F("#5a4024",x0,y-8,x1-x0,1);for(let px=x0+3;px<x1;px+=12)F("#5a4024",px,y-9,2,9);
  for(const lx of[x0+14,x1-16]){F("#2a2a2a",lx,y-20,2,20);F("#ffe9a0",lx-2,y-24,6,4);glow(lx+1,y-22,8,"255,230,150",0.3);}
  const kx=x1-42;F("#8a5a32",kx,y-22,30,22);F("#b87a42",kx,y-22,30,3);F("#c8442a",kx-3,y-27,36,6);F("#f4ece0",kx+3,y-27,4,6);F("#f4ece0",kx+11,y-27,4,6);F("#f4ece0",kx+19,y-27,4,6);F("#f4ece0",kx+27,y-27,4,6);F("#2a1a0a",kx+8,y-15,9,15);F("#ffd868",kx+20,y-17,6,5);
  F("#e83a3a",x1-6,y-34,1,14);F("#e83a3a",x1-5,y-34,7,4+Math.sin(f/6));
  const fx=x0+60;F("#2a2a2a",fx,y-16,3,16);F("#e8c060",fx-1,y-22,5,6);F("#1a1a1a",fx-1,y-17,5,2);g.strokeStyle="#bbb";g.lineWidth=0.5;g.beginPath();g.moveTo(fx+2,y-18);g.lineTo(fx+22,y-30);g.lineTo(fx+22,y+14);g.stroke();F("#fff",fx+21,y+14,2,1);}
function c3Hut(g,x){const F=(c,a,b,w,h)=>{g.fillStyle=c;g.fillRect(Math.round(a),Math.round(b),w,h);};
  F("#c8a468",x-24,150,48,30);for(let k=0;k<8;k++)F("rgba(90,60,30,.35)",x-24+k*6,150,1,30);F("#2a1a0a",x-6,160,12,20);F("#4a3018",x-6,160,12,2);
  F("#1aa0b8",x+8,156,12,10);F("#fff",x+8,156,12,1);F("#fff",x+13,156,1,10);
  for(let k=0;k<7;k++){F(k%2?"#ffffff":"#e8442a",x-28+k*8,141,8,9);}F("rgba(0,0,0,.3)",x-28,150,56,2);
  F("#8a4a22",x-26,128,52,7);F("#a85a2a",x-26,128,52,2);F("#e8442a",x-24,122,48,6);F("#ff7a5a",x-24,122,48,1);
  g.font='5px "Press Start 2P",monospace';g.textBaseline="top";g.fillStyle="#fff";g.fillText("SURF",x-11,130);
  [["#ff7a3a",-34,0.12],["#3ac8e8",-39,0.05],["#ffd23a",-44,-0.02]].forEach(([c,ox,rot])=>{g.save();g.translate(x+ox,178);g.rotate(rot);g.fillStyle="#1a1a1a";g.beginPath();g.ellipse(0,-17,5.5,19.5,0,0,7);g.fill();g.fillStyle=c;g.beginPath();g.ellipse(0,-17,4.5,18.5,0,0,7);g.fill();g.fillStyle="rgba(255,255,255,.5)";g.fillRect(-0.6,-33,1.2,32);g.restore();});}
function c3Tower(g,x,f){const F=(c,a,b,w,h)=>{g.fillStyle=c;g.fillRect(Math.round(a),Math.round(b),w,h);};
  F("#c8b080",x-17,150,3,46);F("#c8b080",x+14,150,3,46);F("#a89060",x-17,150,1,46);g.strokeStyle="#b09a70";g.lineWidth=1;g.beginPath();g.moveTo(x-16,196);g.lineTo(x+16,152);g.moveTo(x+16,196);g.lineTo(x-16,152);g.stroke();
  F("#a8885a",x-21,148,42,3);F("#e8e8e0",x-19,124,38,24);F("#cfd0c8",x-19,142,38,6);F("#e83a3a",x-19,134,38,4);F("#2a3a4a",x-14,128,12,8);F("#8ad0e8",x-13,129,10,3);F("#e83a3a",x-3,141,6,2);
  F("#e83a3a",x-23,121,46,4);F("#ff7a6a",x-23,121,46,1);F("#5a4a3a",x+19,100,1,24);F("#e83a3a",x+20,100,10,6+Math.sin(f/5)*1.2);F("#fff",x+23,101,2,4);
  F("#8a6a3a",x+22,150,2,46);for(let k=0;k<7;k++)F("#8a6a3a",x+20,152+k*6,6,1);F("#ff7a2a",x+34,186,8,8);F("#ffffff",x+35,188,6,2);}
function c3Lounger(g,x,c){const F=(cl,a,b,w,h)=>{g.fillStyle=cl;g.fillRect(Math.round(a),Math.round(b),w,h);};F("#5a4a3a",x-12,198,2,5);F("#5a4a3a",x+10,198,2,5);g.save();g.translate(x,196);g.rotate(-0.0);F(c,x*0-12,-2,16,4);F("#fff",-12,-2,16,1);g.restore();
  g.fillStyle=c;g.beginPath();g.moveTo(x+3,194);g.lineTo(x+13,186);g.lineTo(x+16,189);g.lineTo(x+6,198);g.fill();}
function c3Hammock(g,xa,xb,f){g.strokeStyle="#6a4a2a";g.lineWidth=1;g.beginPath();g.moveTo(xa,172);g.quadraticCurveTo((xa+xb)/2,196+Math.sin(f/40)*1.2,xb,172);g.stroke();g.strokeStyle="#e8442a";g.lineWidth=2.4;g.beginPath();g.moveTo(xa+2,174);g.quadraticCurveTo((xa+xb)/2,196+Math.sin(f/40)*1.2,xb-2,174);g.stroke();g.strokeStyle="#fff";g.lineWidth=0.8;g.stroke();}
function c3Crab(g,x,y,f){const k=Math.sin(f/9)*0.8;fill("#c83a2a",x-3,y-3,6,3);fill("#e8604a",x-3,y-3,6,1);fill("#c83a2a",x-6,y-5+k,2,3);fill("#c83a2a",x+4,y-5-k,2,3);fill("#1a1a1a",x-2,y-4,1,1);fill("#1a1a1a",x+1,y-4,1,1);for(let q=0;q<3;q++){fill("#a82a1a",x-5-q*0.3,y-1+k*(q%2?1:-1)*0.5,2,1);fill("#a82a1a",x+3+q*0.3,y-1-k*(q%2?1:-1)*0.5,2,1);}}
/* the mutated shark: nose to +x. ang tilts the whole beast (nose-up is negative), m opens the jaw */
function c3Shark(g,x,y,sc,ang,m,f,dir,clipY){g.save();if(clipY!=null){g.beginPath();g.rect(-400,-400,1600,400+clipY);g.clip();}
  g.translate(x,y);g.scale((dir<0?-1:1)*sc,sc);g.rotate(ang);const w=Math.sin(f/4);
  const F=(c,a,b,ww,h)=>{g.fillStyle=c;g.fillRect(a,b,ww,h);},P=(c,pts)=>{g.fillStyle=c;g.beginPath();g.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)g.lineTo(pts[i][0],pts[i][1]);g.closePath();g.fill();};
  P("#1c2c36",[[-24,-1],[-32,-6+w],[-48,-24+4*w],[-40,-6],[-36,0],[-44,16-4*w],[-30,5+w],[-24,4]]);
  g.save();g.translate(12,5);g.rotate(m*0.62);
  P("#4a2a52",[[0,0],[22,-1],[20,4],[0,5]]);P("#9ab0b8",[[0,2],[21,1],[18,5],[-2,7]]);
  for(let k=0;k<7;k++)P("#f0e8d0",[[3+k*2.7,0],[4.4+k*2.7,-3.6],[5.8+k*2.7,0]]);
  g.restore();
  P("#3e5866",[[34,1],[27,-7],[10,-12],[-10,-11],[-26,-4],[-30,-1],[-30,3],[-14,6],[8,7],[20,4],[28,5]]);
  P("#cfdcdc",[[30,3],[18,4],[-2,6],[-24,3],[-28,2],[-6,8],[14,9],[26,7]]);
  P("#2a4250",[[34,1],[27,-7],[10,-12],[-10,-11],[-14,-8],[8,-8],[24,-4],[31,0]]);
  F("#16222a",14,2,8,1.2);
  for(let k=0;k<7;k++)P("#f0e8d0",[[17+k*2.6,4],[18.2+k*2.6,7.4],[19.4+k*2.6,4]]);
  P("#2e4654",[[6,-12],[-4,-30+w],[-12,-11]]);P("#6a8694",[[5,-12],[-3,-28+w],[-5,-12]]);
  P("#2a4250",[[10,6],[-4,19+w],[-2,6]]);
  for(let k=0;k<8;k++)P("#d8ccb0",[[20-k*5.2,-9-k*0.12],[18.4-k*5.2,-14-(k%2)*2.2],[16.2-k*5.2,-10]]);
  for(let k=0;k<4;k++){g.strokeStyle="#16222a";g.lineWidth=0.9;g.beginPath();g.moveTo(9+k*2.6,-4);g.lineTo(7.2+k*2.6,4);g.stroke();g.strokeStyle="rgba(150,255,130,.7)";g.lineWidth=0.6;g.beginPath();g.moveTo(9.4+k*2.6,-3);g.lineTo(7.6+k*2.6,3);g.stroke();}
  g.strokeStyle="rgba(130,255,120,.55)";g.lineWidth=0.7;[[-6,-6,-22,-3],[2,-8,-12,-1],[-20,-5,-28,0]].forEach(([a,b,c,d])=>{g.beginPath();g.moveTo(a,b);g.quadraticCurveTo((a+c)/2,b-4,c,d);g.stroke();});
  [[22,-4,2.2],[17,-6.5,1.5],[27,-6,1.3]].forEach(([a,b,rr])=>{g.fillStyle="#1a0004";g.beginPath();g.arc(a,b,rr+1,0,7);g.fill();g.fillStyle="#ff3a1a";g.beginPath();g.arc(a,b,rr,0,7);g.fill();g.fillStyle="#ffe070";g.fillRect(a-0.5,b-rr,1,rr*2);});
  g.restore();}
function c3Fin(g,x,y,dir,f){const w=Math.sin(f/7);g.save();g.translate(x,y);g.scale(dir<0?-1:1,1);
  g.strokeStyle="rgba(235,255,255,.65)";g.lineWidth=1;for(let k=0;k<2;k++){g.beginPath();g.moveTo(-6,2);g.lineTo(-26-k*4,6+k*5+w);g.stroke();g.beginPath();g.moveTo(-6,2);g.lineTo(-24-k*4,-1-k*5-w);g.stroke();}
  g.fillStyle="rgba(235,255,255,.4)";g.fillRect(-30,2,36,1);
  g.fillStyle="#1e2e38";g.beginPath();g.moveTo(8,3);g.quadraticCurveTo(0,-10,-5,-22);g.quadraticCurveTo(-12,-8,-16,3);g.closePath();g.fill();
  g.fillStyle="#4a6676";g.beginPath();g.moveTo(5,2);g.quadraticCurveTo(-1,-9,-5,-20);g.quadraticCurveTo(-5,-8,-6,2);g.closePath();g.fill();
  g.fillStyle="#d8ccb0";g.beginPath();g.moveTo(-5,-20);g.lineTo(-8,-26);g.lineTo(-7,-19);g.fill();g.strokeStyle="rgba(140,255,120,.7)";g.lineWidth=0.6;g.beginPath();g.moveTo(-3,-14);g.lineTo(-8,-3);g.stroke();
  g.fillStyle="rgba(235,255,255,.8)";g.fillRect(-18,2,22,1.4);g.restore();}
/* the face that comes out of the water */
function c3Maw(g,cx,cy,R,f,sd){const E=(x,y,rx,ry,c)=>{g.fillStyle=c;g.beginPath();g.ellipse(x,y,rx,ry,0,0,7);g.fill();};
  const hg=g.createRadialGradient(cx,cy-R*0.3,R*0.2,cx,cy,R*1.7);hg.addColorStop(0,"#7a96a4");hg.addColorStop(0.5,"#34505e");hg.addColorStop(1,"#071014");g.fillStyle=hg;g.beginPath();g.ellipse(cx,cy-R*0.08,R*1.6,R*1.32,0,0,7);g.fill();
  for(let k=0;k<11;k++){const a=-Math.PI*0.92+k*(Math.PI*0.84/10),sx=cx+Math.cos(a)*R*1.5,sy=cy-R*0.08+Math.sin(a)*R*1.25,L=R*(0.2+0.14*r(k,sd));g.fillStyle="#d8ccb0";g.beginPath();g.moveTo(sx-R*0.05,sy);g.lineTo(sx+Math.cos(a)*L,sy+Math.sin(a)*L);g.lineTo(sx+R*0.05,sy);g.fill();}
  g.strokeStyle="rgba(130,255,120,.5)";g.lineWidth=Math.max(1,R*0.012);for(let k=0;k<6;k++){g.beginPath();g.moveTo(cx-R*1.3+k*R*0.52,cy-R*0.8);g.quadraticCurveTo(cx-R*1.2+k*R*0.52,cy-R*0.5,cx-R*1.3+k*R*0.5,cy-R*0.15);g.stroke();}
  [-1,1].forEach((s)=>{const ex=cx+s*R*1.16,ey=cy-R*0.32;E(ex,ey,R*0.2,R*0.15,"#0a0004");E(ex,ey,R*0.16,R*0.12,"#ff3a1a");E(ex,ey,R*0.1,R*0.085,"#ffd23a");g.fillStyle="#000";g.fillRect(ex-R*0.014,ey-R*0.12,R*0.028,R*0.24);E(ex-s*R*0.05,ey-R*0.3,R*0.065,R*0.05,"#ff3a1a");E(ex+s*R*0.2,ey-R*0.27,R*0.05,R*0.04,"#ff3a1a");});
  E(cx,cy,R*1.03,R*0.98,"#140a1c");E(cx,cy,R*0.99,R*0.94,"#4a2a5a");
  const tg=g.createRadialGradient(cx,cy,R*0.04,cx,cy,R*0.82);tg.addColorStop(0,"#000");tg.addColorStop(0.6,"#0a0410");tg.addColorStop(1,"#2a1238");g.fillStyle=tg;g.beginPath();g.ellipse(cx,cy,R*0.8,R*0.75,0,0,7);g.fill();
  const gg=g.createRadialGradient(cx,cy,0,cx,cy,R*0.38);gg.addColorStop(0,"rgba(120,255,120,.5)");gg.addColorStop(1,"rgba(120,255,120,0)");g.fillStyle=gg;g.fillRect(cx-R*0.4,cy-R*0.4,R*0.8,R*0.8);
  [[0.95,30,0.3],[0.77,24,0.27],[0.59,18,0.21]].forEach(([rr,n,len],ri)=>{for(let i=0;i<n;i++){const a=(i/n)*6.283+ri*0.21,L=len*(0.55+0.65*r(i+ri*40,sd)),bx=cx+Math.cos(a)*R*rr,by=cy+Math.sin(a)*R*rr*0.95,tx=cx+Math.cos(a)*R*(rr-L),ty=cy+Math.sin(a)*R*(rr-L)*0.95,nx=-Math.sin(a)*R*0.056,ny=Math.cos(a)*R*0.056;
    g.fillStyle="#2a2018";g.beginPath();g.moveTo(bx-nx*1.25,by-ny*1.25);g.lineTo(tx,ty);g.lineTo(bx+nx*1.25,by+ny*1.25);g.fill();
    g.fillStyle=r(i,sd+ri)<0.3?"#c0b898":"#f4ecd4";g.beginPath();g.moveTo(bx-nx,by-ny);g.lineTo(tx,ty);g.lineTo(bx+nx,by+ny);g.fill();
    if(r(i,sd+9+ri)<0.3){g.fillStyle="rgba(130,255,110,.65)";g.fillRect(bx-1,by,2,R*0.05+(f%9));}}});
  E(cx-R*0.34,cy-R*0.5,R*0.14,R*0.05,"rgba(255,255,255,.2)");}
function c3DScare(g,j,fb){const R=j<1?0:Math.min(235,18+j*j*11)+(j>5?(j-5)*2.2:0),cx=192+(Math.random()-0.5)*4,cy=122+(Math.random()-0.5)*4;
  g.fillStyle="rgba(6,26,36,.5)";g.fillRect(0,0,384,216);
  if(R>0){c3Maw(g,cx,cy,R,j,5);
    g.strokeStyle="rgba(235,255,255,.55)";g.lineWidth=1;for(let k=0;k<34;k++){const a=(k/34)*6.283+j*0.07,r0=R*(1.0+0.4*r(k,2)),r1=r0+R*(0.25+0.4*r(k,j%3+4));g.beginPath();g.moveTo(cx+Math.cos(a)*r0,cy+Math.sin(a)*r0*0.8);g.lineTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1*0.8);g.stroke();}
    for(let k=0;k<26;k++){g.fillStyle="rgba(240,255,255,.85)";g.fillRect(((r(k,j%5+7)*384)|0),((r(k,j%7+9)*216)|0),2,3);}
    g.fillStyle="#d8f0f0";for(let x=0;x<384;x+=7){g.fillRect(x,206+((x*13+j*5)%7),7,10);}}}
/* ---- backdrops ---- */
function c3DBack(){if(C3.cache.dsky)return C3.cache.dsky;const c=c3Cv(384,216),g=c.getContext("2d"),gr=g.createLinearGradient(0,0,0,84);gr.addColorStop(0,"#1f7ad8");gr.addColorStop(0.7,"#7ac8f0");gr.addColorStop(1,"#cdeefc");g.fillStyle=gr;g.fillRect(0,0,384,84);
  const sg=g.createLinearGradient(0,84,0,132);sg.addColorStop(0,"#2a8ac0");sg.addColorStop(0.55,"#2fb0c8");sg.addColorStop(1,"#74e0d8");g.fillStyle=sg;g.fillRect(0,84,384,48);
  g.fillStyle="rgba(255,255,255,.5)";g.fillRect(0,84,384,1);return(C3.cache.dsky=c);}
function c3DSand(){if(C3.cache.dsand)return C3.cache.dsand;const c=c3Cv(C3_BW,92),g=c.getContext("2d"),gr=g.createLinearGradient(0,0,0,92);gr.addColorStop(0,"#b8a074");gr.addColorStop(0.1,"#f0dcae");gr.addColorStop(1,"#e6c890");g.fillStyle=gr;g.fillRect(0,0,C3_BW,92);
  g.fillStyle="rgba(150,110,60,.18)";g.fillRect(0,3,C3_BW,6);
  for(let i=0;i<2400;i++){g.fillStyle=["#d8c090","#fff0c8","#c8a878","#f8e8c0"][i%4];g.fillRect((r(i,901)*C3_BW)|0,(6+r(i,902)*86)|0,1,1);}
  for(let i=0;i<46;i++){g.fillStyle="#fffaf0";const x=(r(i,903)*C3_BW)|0,y=(20+r(i,904)*70)|0;g.fillRect(x,y,2,1);g.fillRect(x+1,y-1,1,1);}
  for(let i=0;i<22;i++){const x=(r(i,905)*C3_BW)|0,y=(24+r(i,906)*60)|0;g.fillStyle="rgba(120,90,50,.35)";g.fillRect(x,y,2,3);g.fillRect(x+4,y+4,2,3);}
  for(let i=0;i<26;i++){const x=(r(i,907)*C3_BW)|0,y=2+((r(i,908)*5)|0);g.strokeStyle=i%2?"#6a8a3a":"#8aa84a";g.lineWidth=1;for(let k=-2;k<=2;k++){g.beginPath();g.moveTo(x,y+4);g.quadraticCurveTo(x+k*1.5,y,x+k*3,y+1);g.stroke();}}
  return(C3.cache.dsand=c);}
function c3DFar(g,cam,f,dark){
  const sx=300-Math.round(cam*0.02),sy=44;{const hg=g.createRadialGradient(sx,sy,6,sx,sy,70);hg.addColorStop(0,"rgba(255,250,210,"+0.75*(1-dark)+")");hg.addColorStop(0.35,"rgba(255,244,190,"+0.28*(1-dark)+")");hg.addColorStop(1,"rgba(255,240,180,0)");g.fillStyle=hg;g.fillRect(sx-70,sy-70,140,140);}
  g.globalAlpha=(1-dark)*0.35;g.strokeStyle="#fff6c0";g.lineWidth=1;for(let k=0;k<14;k++){const a=k/14*6.283+f/700;g.beginPath();g.moveTo(sx+Math.cos(a)*18,sy+Math.sin(a)*18);g.lineTo(sx+Math.cos(a)*(30+8*Math.sin(f/20+k)),sy+Math.sin(a)*(30+8*Math.sin(f/20+k)));g.stroke();}g.globalAlpha=1;
  fill("#fffbe0",sx-11,sy-11,22,22);fill("#ffffff",sx-8,sy-8,16,16);
  /* clouds: fluffy clusters */
  for(let k=0;k<5;k++){const cx=((k*190+f*0.08-cam*0.15)%(384+140)+524)%524-90,cy=20+k*10;g.globalAlpha=0.9;[[0,0,22,6],[14,-5,16,6],[-12,-3,14,5],[28,-1,14,5]].forEach(([ox,oy,rx,ry])=>{g.fillStyle="#fff";g.beginPath();g.ellipse(cx+ox,cy+oy,rx,ry,0,0,7);g.fill();});g.fillStyle="#dbe9f8";g.beginPath();g.ellipse(cx+4,cy+5,24,2.5,0,0,7);g.fill();g.globalAlpha=1;}
  /* far coast: hotels and palm silhouettes (parallax) */
  for(let k=0;k<5;k++){const bx=(((k*170-cam*0.1)%850)+850)%850-120;if(bx<-70||bx>400)continue;const hh=14+((k*7)%10);fill("#e8e0d0",bx,84-hh,22,hh);fill("#c8c0b0",bx+22,84-hh+3,10,hh-3);for(let w=0;w<3;w++)for(let q=0;q<hh/5-1;q++)fill("#6a8aa0",bx+3+w*6,84-hh+3+q*5,3,2);fill("#e8604a",bx-1,84-hh-2,24,2);}
  for(let k=0;k<9;k++){const px=(((k*96+20-cam*0.12)%864)+864)%864-100;if(px<-30||px>410)continue;g.strokeStyle="#2a5a3a";g.lineWidth=1.2;g.beginPath();g.moveTo(px,85);g.lineTo(px+1.5,76);g.stroke();for(let q=0;q<5;q++){const a=-2.9+q*0.62;g.beginPath();g.moveTo(px+1.5,76);g.lineTo(px+1.5+Math.cos(a)*6,76+Math.sin(a)*3+2.5);g.stroke();}}
  /* the island with a lighthouse */
  const ix=((600-cam*0.18)%1000+1000)%1000-120;if(ix>-120&&ix<420){fill("#3f7e5e",ix,79,96,6);g.fillStyle="#4a8a6a";g.beginPath();g.ellipse(ix+48,80,48,6,0,Math.PI,0);g.fill();g.fillStyle="#2e6a46";g.beginPath();g.ellipse(ix+30,80,26,4,0,Math.PI,0);g.fill();
    const lx=ix+66;for(let y=0;y<26;y++){const w=4.4-y*0.05;fill(y%8<4?"#f4f4ec":"#d8442a",lx-w/2,78-y,w,1);}fill("#2a2a2a",lx-4,51,8,2);fill("#cfe8ff",lx-2.5,47,5,4);fill("#d8442a",lx-3.5,45,7,2);
    const bd=0.25+0.75*dark;glow(lx,49,12,"255,240,170",0.4*bd+0.1);if(dark>0.2){g.save();g.globalAlpha=0.3*dark;g.fillStyle="#ffe9a0";const a=f/30;g.beginPath();g.moveTo(lx,49);g.lineTo(lx+Math.cos(a)*120,49+Math.sin(a)*12-14);g.lineTo(lx+Math.cos(a)*120,49+Math.sin(a)*12+14);g.closePath();g.fill();g.restore();}
    for(let k=0;k<4;k++){g.strokeStyle="#1f4a32";g.lineWidth=1.3;const px=ix+8+k*9;g.beginPath();g.moveTo(px,80);g.lineTo(px+1,72);g.stroke();for(let q=0;q<5;q++){const a=-2.9+q*0.62;g.beginPath();g.moveTo(px+1,72);g.lineTo(px+1+Math.cos(a)*5,72+Math.sin(a)*2.5+2);g.stroke();}}}
  /* sailboats, a jet ski, a seaplane */
  for(let k=0;k<2;k++){const bx=((k*260+f*(0.1+k*0.05)-cam*0.25)%520+520)%520-60,by=82+k*3;fill("#8a3a2a",bx-6,by+3,18,2);fill("#fff",bx,by-9,1,12);g.fillStyle="#fff";g.beginPath();g.moveTo(bx+1,by-9);g.lineTo(bx+9,by+2);g.lineTo(bx+1,by+2);g.fill();g.fillStyle="#e8604a";g.beginPath();g.moveTo(bx-1,by-6);g.lineTo(bx-6,by+2);g.lineTo(bx-1,by+2);g.fill();}
  {const jx=((f*0.7-cam*0.3)%600+600)%600-80,jy=100+Math.sin(f/20)*1;fill("#e8442a",jx,jy-2,9,3);fill("#fff",jx+2,jy-4,4,2);g.fillStyle="rgba(255,255,255,.7)";for(let k=0;k<6;k++)g.fillRect(jx-4-k*4,jy+1-k*0.3+Math.sin(f/3+k),3,1.2);}
  {const px=((f*0.35)%600)-90,py=24+Math.sin(f/50)*2;fill("#f4f4f4",px,py,16,3);fill("#d8442a",px+12,py-1,5,2);fill("#f4f4f4",px+3,py-3,9,2);fill("#2a2a2a",px+8,py+3,1,2);fill("#3a8aff",px+2,py,3,1);}}
function c3DWater(g,f,cam,dark){for(let k=0;k<80;k++){const wx=((r(k,911)*900-cam*0.6+f*0.15*(k%3))%460+460)%460-40,wy=86+r(k,912)*42,a=0.5+0.5*Math.sin(f/18+k);g.globalAlpha=a*0.8*(1-dark*0.7);fill(k%4?"#9ae8f8":"#ffffff",wx,wy,3+(k%4),1);g.globalAlpha=1;}
  for(let k=0;k<7;k++){const wy=92+k*5.5,off=((f*0.2*(1+k*0.12)+k*53-cam*(0.4+k*0.05))%90+90)%90;g.globalAlpha=0.18;for(let x=-90+off;x<384;x+=90)fill("#ffffff",x,wy,26+k*2,1);g.globalAlpha=1;}}
/* ---- the beach world at frame f ---- */
function c3DWorld(g,f){const D=C3D,cam=Math.round(D.cam),P=c3DPlayer(f),X=(x)=>x-cam,C=c3Cast(),S=c3DCast(f),dark=f>=5760?(f<5900?(f-5760)/140*0.85:f<C3_POV0?0.85:0.9):0,shk=c3SharkAt(f);
  g.save();g.translate(0,-8);g.drawImage(c3DBack(),0,0);c3DFar(g,cam,f,dark);c3DWater(g,f,cam,dark);
  if(X(520)>-160&&X(520)<560)c3Pier(g,X(410),X(620),f);
  g.drawImage(c3DSand(),cam,0,384,92,0,124,384,92);
  const shore=128+3*Math.sin(f/45);fill("#b89870",0,shore+2,384,3);fill("rgba(140,110,70,.35)",0,shore+5,384,3);g.globalAlpha=0.85;fill("#ffffff",0,shore,384,2);g.globalAlpha=0.5;for(let x=0;x<384;x+=6)fill("#ffffff",x+((f/3)|0)%6,shore+2+Math.sin(x/9+f/20),3,1);g.globalAlpha=1;
  /* blood in the water */
  D.pat.forEach((p)=>{const x=X(p.x),a=Math.max(0.12,0.6*(1-p.r/p.max));g.strokeStyle="rgba(235,255,255,"+a+")";g.lineWidth=1.2;g.beginPath();g.ellipse(x,p.y+1,p.r,Math.max(1.5,p.r*0.16),0,0,7);g.stroke();g.strokeStyle="rgba(235,255,255,"+a*0.6+")";g.beginPath();g.ellipse(x,p.y+1,p.r*0.6,Math.max(1,p.r*0.1),0,0,7);g.stroke();});
  /* the shoreline palm row */
  [[40,-1],[190,1],[330,-1],[470,1],[620,-1],[780,1],[930,-1],[1070,1]].forEach(([wx,d],i)=>{const x=X(wx);if(x<-40||x>420)return;c3Palm(g,x,131,34,0.2*d,0.58,f,i*2.3,0);});
  /* structures on the sand */
  {const x=X(150);x>-70&&x<450&&c3Hut(g,x);}
  {const x=X(376);x>-70&&x<450&&c3TikiBar(g,x);}
  {const x=X(648);x>-60&&x<440&&c3Tower(g,x,f);}
  {const x=X(830);if(x>-60&&x<440){fill("#6a6a6a",x-24,140,2,58);fill("#6a6a6a",x+22,140,2,58);fill("#ffffff",x-22,141,44,2);for(let xx=-22;xx<22;xx+=3)fill("rgba(40,40,40,.55)",x+xx,143,1,10);for(let yy=145;yy<153;yy+=3)fill("rgba(40,40,40,.55)",x-22,yy,44,1);fill("#ffffff",x-22,152,44,1);}}
  [[80,"#e83a3a"],[1010,"#ffd23a"],[670,"#3aa84a"],[250,"#3a8aff"]].forEach(([ux,c])=>{const x=X(ux);if(x<-40||x>420)return;fill("#3a3a3a",x,150,1,48);for(let k=-17;k<=17;k++){const h=9*Math.sqrt(1-(k*k)/(17*17+1));fill((k+17)%8<4?c:"#ffffff",x+k,150-h,1,h);}});
  [[110,"#ff9a2a"],[620,"#e84a6a"],[1040,"#3ac8e8"]].forEach(([tx,c])=>{const x=X(tx);x>-40&&x<420&&(fill(c,x-16,196,32,7),fill("#ffffff",x-16,198,32,1));});
  {const x=X(1010);x>-60&&x<440&&c3Hammock(g,X(1000),X(1062),f);}
  {const x=X(60);x>-60&&x<440&&c3Lounger(g,x+30,"#3ac8e8");}
  {const x=X(560);x>-40&&x<420&&(fill("#e8442a",x,186,12,8),fill("#fff",x,186,12,2),fill("#2a2a2a",x+2,184,8,2));}
  [[330,190],[860,196],[1100,200]].forEach(([cx0,cy0],i)=>{const x=X(cx0);x>-20&&x<404&&c3Crab(g,x+Math.sin(f/50+i*2)*14,cy0,f+i*9);});
  {const x=X(C3_CASTLE),c=D.castle;if(c>0&&x>-40&&x<420){fill("#d8b880",x-16,190,32,8);if(c>1){fill("#e0c088",x-12,182,24,8);for(let k=0;k<4;k++)fill("#e0c088",x-12+k*6,180,3,2);}if(c>2){fill("#d8b880",x-15,174,6,18);fill("#d8b880",x+9,174,6,18);fill("#c8a870",x-15,172,2,2);fill("#c8a870",x+13,172,2,2);}if(c>3)fill("#e0c088",x-5,168,10,16);if(c>4)fill("#d8b880",x-2,152,4,18);if(c>5){fill("#8a6a3a",x,140,1,12);fill("#e83a3a",x+1,140,6,4);fill("#ff7a6a",x+1,140,6,1);}}}
  if(f>=2880&&f<3180){const x=X(760);fill("#6a4a2a",x-3,198,7,4);}
  /* everyone, and the mid-ground palms, sorted by depth */
  const L=[],flee=f>=5990;
  [[30,170,56,0.16],[330,168,52,-0.2],[760,172,60,0.18],[1110,172,58,-0.18],[995,170,54,0.2],[1065,170,54,-0.2]].forEach(([wx,gy,h,ln],i)=>{L.push({y:gy,draw:()=>{const x=X(wx);if(x<-50||x>434)return;c3Palm(g,x,gy,h,ln,1.0,f,i*1.7,1);}});});
  C.crowd.forEach((e,i)=>{let x=e.x,y=e.y,face=1,pose="idle",act=e.k;
    if(e.k==="walk"){const span=e.b-e.a,p=((f*e.sp+(e.x-e.a))%(2*span)+2*span)%(2*span);x=p<span?e.a+p:e.b-(p-span);face=p<span?1:-1;pose="walk";}
    if(e.k==="shore"){if(f>=3600)return;x+=10*Math.sin(f/35+i);face=Math.cos(f/35+i)>0?1:-1;pose=((f/20+i)|0)%3===0?"up":"idle";}
    if(e.k==="sit"||e.k==="guard")pose="land";
    const dir=e.x<640?-1:1;let run=0,bub="";
    if(flee&&e.k!=="swim"){const t=f-5990-i*5;if(t>0){run=1;x=e.x+dir*1.75*t;face=dir;pose="run";y=e.k==="guard"?Math.min(190,e.y+t*1.1):e.y;if(e.k==="lie")y=Math.min(e.y,192);}else if(t>-15){bub="!";pose="idle";}}
    if(e.k==="swim"){const t=f-5985-i*4;
      if(f<5985)x=e.x+9*Math.sin(f/50+i);else{x=e.x+4*Math.sin(f/50+i);y=e.y+Math.max(0,t)*0.08;if(y>=134){run=1;const t2=t-(134-e.y)/0.08;x=e.x+dir*1.75*Math.max(0,t2);face=dir;pose="run";y=Math.min(172,134+Math.max(0,t2)*0.5);}}}
    if(run&&f%52<34&&f-5990>(i%4)*10)bub=["AAAH!","RUN!","HELP!","NO!!"][(i+((f/52)|0))%4];
    L.push({y,draw:()=>{const xs=X(x);if(xs<-60||xs>440)return;
      if(e.k==="swim"&&!run)return c3DSwim(g,e.look,e.pal,e.sc,xs,y,f,face,i,1,f>=5985,f>=5930&&f<5985?"!":(f>=5985&&f%60<40?["HELP!","AAAH!","NO!!"][(i+((f/60)|0))%3]:""));
      if(e.k==="lie"&&!run)return c3Draw1(g,e.look,c3Pose("idle",0),Object.assign({closed:1},e.pal,{id:e.pal.id+"c",closed:1}),e.sc,xs+12,y-2,1,{rot:-Math.PI/2,noshd:1});
      c3Draw1(g,e.look,c3Pose(run?"run":pose,run?(2.5*f*0.22)&7:pose==="walk"?(2.5*f*0.12)&7:(f/45+i)&1),e.pal,e.sc,xs,y,face);
      bub&&c3DBub(g,xs,y-e.sc*21,bub);}});});
  [["barista",C.barista],["kai",C.kai],["mia",C.mia],["leo",C.leo],["k1",C.k1],["k2",C.k2]].forEach(([id,c])=>{const s=S[id];if(!s||s.hide)return;
    L.push({y:s.y+(id==="barista"?-40:0),draw:()=>{const xs=X(s.x);if(xs<-60||xs>440)return;
      if(s.act==="swim")return c3DSwim(g,c.look,c.pal,c.sc,xs,s.y,f,s.face,id.length,1,s.panic,s.fear?"!":(s.panic&&f%60<40?["HELP!","AAAH!","NO!!"][(id.length+((f/60)|0))%3]:""));
      let pz=c3Pose(s.pose||"idle",s.pose==="walk"?(2.5*f*0.16)&7:s.pose==="run"?(2.5*f*0.22)&7:(f/45)&1),lift=0;
      if(s.act==="vb"){const t=f-2880,me={kai:2,mia:1,leo:3}[id],k=(t%60)/60;if(t>=0&&t<380&&((t/60)|0)%4===me&&k<0.45){pz=c3Pose(k<0.2?"up":"top",0);lift=-8*Math.sin(k/0.45*Math.PI);}}
      c3Draw1(g,c.look,pz,c.pal,c.sc,xs,s.y+lift,s.face);
      if((id==="leo"||id==="k1"||id==="k2")&&s.pose==="run"&&f%48<30)c3DBub(g,xs,s.y-(id==="leo"?42:32),id==="leo"?"AAAH!":"WAAAH!");
      if(id==="barista"){c3TikiCounter(g,X(376));if(s.act==="shake"){const k=Math.sin(f/3)*3;fill("#c8c8d0",X(376)-14,140+k,5,9);fill("#ffffff",X(376)-14,140+k,5,1);}if(f>=5985&&f<6040)c3DBub(g,xs,s.y-46,"!");}}});});
  if(P.show)L.push({y:P.y+0.5,draw:()=>c3DMe(g,P,cam,f)});
  L.sort((a,b)=>a.y-b.y).forEach((e)=>e.draw());
  if(f>=1700&&f<1890){c3Coconut(g,X(360),151);}
  if(D.ball){const x=X(D.ball.x);fill("#2a2a2a",x-3,D.ball.y-3,7,7);fill("#ffffff",x-2,D.ball.y-2,5,5);fill("#ffd23a",x-2,D.ball.y,5,1);fill("#3a8aff",x,D.ball.y-2,1,5);}
  D.conf.forEach((p)=>fill(p.c,X(p.x),p.y,2,2));
  /* floating things left in the water after the attack */
  if(f>=6150){[[470,"#ff7ad8"],[790,"#fff"]].forEach(([wx,c],i)=>{const x=X(wx);g.fillStyle=c;g.beginPath();g.ellipse(x,127+Math.sin(f/25+i),5,2.4,0,0,7);g.fill();g.fillStyle="#1a1a1a";g.beginPath();g.ellipse(x,127+Math.sin(f/25+i),2.2,0.9,0,0,7);g.fill();});}
  /* the shark */
  if(shk){if(shk.mode==="fin"){c3Fin(g,X(shk.x),shk.y,shk.dir,f);}
    else{const b=C3_BITES[shk.i],cc=c3Cast(),vc=cc[b.id],w=C3_SW[b.id],vp=c3SwimPos(w[0],w[1],f),att=c3Clamp((shk.u-(C3_UB-0.12))/0.12,0,1),show=b.eat!==!1&&vc&&shk.u<C3_UB+0.1;
      if(show){const vx=L2(vp.x,shk.mx,c3Ez(att)),vy=L2(vp.y,shk.my+22,c3Ez(att));c3Draw1(g,vc.look,c3Pose(f%6<3?"up":"top",0),vc.pal,vc.sc,X(vx),vy+(att<1?0:Math.sin(f)*2),1,{noshd:1,rot:att*Math.sin(f/1.5)*0.45});if(att>0.3&&f%14<7)c3DBub(g,X(vx),vy-vc.sc*20,"AAAH!");}
      c3Shark(g,X(shk.x),shk.y,shk.sc,shk.ang,shk.m,f,shk.dir,127);}}
  D.spl.forEach((p)=>{g.globalAlpha=Math.min(1,p.l/20);fill(p.c,X(p.x),p.y,p.g?2.2:2,p.g?2.2:2);g.globalAlpha=1;});
  D.gulls.forEach((e)=>{if(dark>0.4)return;const x=X(e.x),y=e.y+Math.sin(e.p)*3,w=Math.sin(e.p*2)*2;fill("#3a3a3a",x-4,y-w,4,1);fill("#3a3a3a",x,y,1,1);fill("#3a3a3a",x+1,y-w,4,1);});
  /* storm: clouds, grey-green sea, rain */
  if(dark>0){g.globalCompositeOperation="multiply";g.fillStyle="rgb("+((255-150*dark)|0)+","+((255-105*dark)|0)+","+((255-95*dark)|0)+")";g.fillRect(0,0,384,230);g.globalCompositeOperation="source-over";g.fillStyle="rgba(10,60,56,"+0.3*dark+")";g.fillRect(0,84,384,48);
    for(let k=0;k<9;k++){const cx=((k*70+f*0.25-cam*0.1)%520+520)%520-70,cy=8+(k%3)*12;g.fillStyle="rgba(34,42,50,"+0.92*dark+")";g.beginPath();g.ellipse(cx,cy,56,16,0,0,7);g.fill();g.fillStyle="rgba(20,26,32,"+0.9*dark+")";g.beginPath();g.ellipse(cx+16,cy+8,46,12,0,0,7);g.fill();}
    if(f>=5900){g.strokeStyle="rgba(190,210,220,"+0.3*dark+")";g.lineWidth=0.6;for(let k=0;k<46;k++){const rx=((r(k,940)*420+f*1.6)%420)-20,ry=((r(k,941)*240+f*7)%240)-10;g.beginPath();g.moveTo(rx,ry);g.lineTo(rx-3,ry+8);g.stroke();}}}
  /* big foreground palms frame the shot (parallax) */
  if(f<C3_POV0)[[40,-1],[620,1],[1180,-1]].forEach(([wx,d],i)=>{const x=wx-cam*1.35+(d>0?0:0);if(x<-60||x>444)return;const sx=d>0?x:x;g.save();g.globalAlpha=1;c3Palm(g,sx,246,196,0.34*d*-1,1.9,f,i*3.1,0);g.restore();});
  g.restore();}
function c3TikiBar(g,x){const F=(c,a,b,w,h)=>{g.fillStyle=c;g.fillRect(Math.round(a),Math.round(b),w,h);};
  F("#7a5a32",x-34,128,4,52);F("#7a5a32",x+30,128,4,52);F("#9a7a4a",x-34,128,1,52);
  for(let k=-40;k<=40;k++){const h=10+3*Math.sin(k*1.7);F(k%3?"#d8b060":"#b89040",x+k,120,1,h);}F("#c8a050",x-42,118,84,4);F("#a88030",x-42,121,84,1);
  F("#5a3a1a",x-1,104,2,12);F("#2a1a0a",x-21,98,42,9);F("#e8d070",x-20,99,40,7);g.font='5px "Press Start 2P",monospace';g.fillStyle="#8a2a1a";g.textBaseline="top";g.fillText("TIKI BAR",x-17,100);
  [[-40,-1],[40,1]].forEach(([ox,dd])=>{F("#7a5a32",x+ox-1,100,2,16);});for(let k=0;k<5;k++)F(["#ff5a6a","#ffd23a","#3ac8e8","#6aff7a","#ff9a2a"][k],x-30+k*14,116,3,3);}
function c3TikiCounter(g,x){const F=(c,a,b,w,h)=>{g.fillStyle=c;g.fillRect(Math.round(a),Math.round(b),w,h);};
  F("#5a3a1a",x-36,160,72,24);for(let k=0;k<12;k++)F(k%2?"#a87a3a":"#8a5a2a",x-35+k*6,161,5,22);F("#d8b060",x-38,157,76,4);F("#f0d080",x-38,157,76,1);
  F("#3aa84a",x-28,150,4,7);F("#e83a3a",x-22,151,4,6);F("#ffd23a",x-16,152,4,5);F("#6a4a2a",x+12,151,8,6);F("#f4ece0",x+14,151,4,2);F("#2a8a3a",x+22,153,6,4);}
function c3Coconut(g,x,y){const F=(c,a,b,w,h)=>{g.fillStyle=c;g.fillRect(Math.round(a),Math.round(b),w,h);};F("#6a4a2a",x-3,y,7,5);F("#8a6a3a",x-3,y,7,1);F("#f4ece0",x-2,y,5,1);F("#ff4a8a",x+2,y-6,1,6);F("#ffd23a",x-1,y-8,6,2);F("#ff7a2a",x,y-9,4,1);}
function c3DSwim(g,look,pal,sc,x,y,f,face,i,a,panic,say){sc=Math.min(sc,1.45);/* out in the water = further away = smaller */const b=Math.sin(f/20+i)*1.2,wl=y-(sc>1.6?17:13)+b;
  g.save();g.beginPath();g.rect(x-40,-40,80,wl+40);g.clip();c3Draw1(g,look,c3Pose(panic?(((f/5+i)|0)%2?"up":"top"):(((f/25+i)|0)%2?"up":"top"),0),pal,sc,x,y+b,face,{noshd:1,a});g.restore();
  g.globalAlpha=0.85*a;fill("#e8ffff",x-8,wl,16,1);g.globalAlpha=1;
  if(panic){for(let k=0;k<4;k++){const q=(f*3+k*37+i*11)%30;fill("#e8ffff",x-12+k*8+Math.sin(q)*2,wl-q*0.35,1.5,1.5);}}
  say&&c3DBub(g,x,wl-sc*13-2,say);}
function c3DMe(g,P,cam,f){const x=P.x-cam,M=c3Me();if(x<-60||x>440)return;
  if(P.act==="swim")return c3DSwim(g,M.look,M.pal,M.sc,x,P.y,f,P.face,0,1,P.panic,P.panic&&f%60<40?["NO!!","KAI!","HELP!"][((f/60)|0)%3]:"");
  let pz=c3Pose(P.pose==="walk"?"walk":P.pose,P.pose==="walk"?P.fr:P.pose==="idle"?(f/45)&1:0),lift=0;
  if(P.act==="vb"){const t=f-2880,k=(t%60)/60;if(t<380&&((t/60)|0)%4===0&&k<0.45){pz=c3Pose(k<0.2?"up":"top",0);lift=-10*Math.sin(k/0.45*Math.PI);}}
  c3Draw1(g,M.look,pz,M.pal,M.sc,x,P.y+lift,P.face);
  if(P.act==="drink")c3Coconut(g,x+12*P.face,P.y-32);}
/* ---- first person: eyes opening, the forest on waking ---- */
function c3DForest(g,f){const gr=g.createLinearGradient(0,0,0,216);gr.addColorStop(0,"#0c1a2a");gr.addColorStop(1,"#2a3a2a");g.fillStyle=gr;g.fillRect(0,0,384,216);
  for(let k=0;k<26;k++){g.fillStyle=k%2?"#0e2412":"#16321a";g.beginPath();g.arc(r(k,931)*384,r(k,932)*110,26+r(k,933)*26,0,7);g.fill();}
  for(let k=0;k<6;k++){const x=k*70+20,w=18+((k*7)%10);g.fillStyle="#120c08";g.beginPath();g.moveTo(x,216);g.lineTo(x+w,216);g.lineTo(192+(x-192)*0.25+w*0.3,40);g.lineTo(192+(x-192)*0.25,40);g.fill();}
  for(let k=0;k<30;k++){g.globalAlpha=0.4+0.3*Math.sin(f/30+k);fill("#bfe8a0",r(k,934)*384,r(k,935)*120,1,1);g.globalAlpha=1;}glow(250,40,60,"170,200,255",0.25);}
/* first person, waist-deep: the sea goes quiet, something moves beneath you */
function c3DPOV(g,f){const k=f-C3_POV0,D=C3D,bob=2.6*Math.sin(f/11)+1.2*Math.sin(f/4.7),wl=112+bob,hz=66;
  const sg=C3.cache.pvs||(C3.cache.pvs=(()=>{const q2=g.createLinearGradient(0,0,0,hz);q2.addColorStop(0,"#070d11");q2.addColorStop(1,"#3a4c50");return q2;})());g.fillStyle=sg;g.fillRect(0,0,384,hz+1);
  for(let n=0;n<7;n++){const cx=((n*83-f*0.05)%420+420)%420-20,cy=10+((n*17)%38);g.fillStyle="rgba(14,22,26,.75)";g.beginPath();g.ellipse(cx,cy,46,12,0,0,7);g.fill();}
  g.fillStyle="#262e24";g.fillRect(0,hz-4,384,5);for(let n=0;n<9;n++){const px=n*46+12;g.strokeStyle="#161c14";g.lineWidth=1.4;g.beginPath();g.moveTo(px,hz-3);g.lineTo(px+1,hz-12);g.stroke();for(let q=0;q<5;q++){const a=-2.9+q*0.62;g.beginPath();g.moveTo(px+1,hz-12);g.lineTo(px+1+Math.cos(a)*7,hz-12+Math.sin(a)*3+3);g.stroke();}}
  fill("#161c14",300,hz-14,2,12);fill("#161c14",296,hz-16,10,3);fill("#161c14",70,hz-10,40,6);
  const wg=g.createLinearGradient(0,hz,0,wl);wg.addColorStop(0,"#27403c");wg.addColorStop(1,"#143028");g.fillStyle=wg;g.fillRect(0,hz,384,wl-hz+1);
  for(let n=0;n<16;n++){const yy=hz+3+n*(wl-hz-5)/16,off=((f*0.4*(1+n*0.1)+n*37)%60+60)%60;g.fillStyle="rgba(200,230,230,"+(0.08+n*0.008)+")";for(let x=-60+off;x<384;x+=60)g.fillRect(x,yy,18+n*2,1);}
  [[70,wl-9],[150,wl-6],[292,wl-8]].forEach(([px,py],i)=>{g.strokeStyle="rgba(210,240,240,.35)";g.lineWidth=1;for(let k=0;k<2;k++){g.beginPath();g.ellipse(px,py,22+i*6+k*9+Math.sin(f/20+k)*1.5,2.5+i+k*1.2,0,0,7);g.stroke();}});
  {const bx=88,by=wl-9+Math.sin(f/20)*1.4;g.fillStyle="#fff";g.beginPath();g.arc(bx,by,7,0,7);g.fill();g.fillStyle="#e83a3a";g.beginPath();g.arc(bx,by,7,0.2,1.2);g.lineTo(bx,by);g.fill();g.beginPath();g.arc(bx,by,7,3.3,4.4);g.lineTo(bx,by);g.fill();g.fillStyle="#3a8aff";g.beginPath();g.arc(bx,by,2,0,7);g.fill();
    const rx=290,ry=wl-7+Math.sin(f/17)*1.3;g.fillStyle="#ff7ad8";g.beginPath();g.ellipse(rx,ry,12,3.6,0,0,7);g.fill();g.fillStyle="#143028";g.beginPath();g.ellipse(rx,ry,6,1.6,0,0,7);g.fill();
    fill("#3a8ad8",200,wl-5+Math.sin(f/13),9,2);fill("#fff",203,wl-6+Math.sin(f/13),3,1);}
  const ug=g.createLinearGradient(0,wl,0,216);ug.addColorStop(0,"#1d5a60");ug.addColorStop(0.35,"#0d343a");ug.addColorStop(1,"#02090c");g.fillStyle=ug;g.fillRect(0,wl,384,216-wl);
  g.fillStyle="rgba(150,230,220,.07)";for(let n=0;n<5;n++){const sx=40+n*80+Math.sin(f/50+n)*8;g.beginPath();g.moveTo(sx,wl);g.lineTo(sx+16,wl);g.lineTo(sx+40+n*3,216);g.lineTo(sx+10,216);g.fill();}
  g.strokeStyle="rgba(170,240,230,.22)";g.lineWidth=0.8;for(let n=0;n<5;n++){g.beginPath();for(let x=0;x<=384;x+=8){const yy=wl+8+n*9+Math.sin(x/17+f/14+n)*2.2;x?g.lineTo(x,yy):g.moveTo(x,yy);}g.stroke();}
  for(let n=0;n<26;n++){const px=(r(n,950)*384+Math.sin(f/30+n)*6)%384,py=wl+10+((r(n,951)*100-f*0.3*(1+n%3))%100+100)%100;fill("rgba(200,255,250,.5)",px,py,1,1);}
  g.strokeStyle="rgba(215,245,245,.85)";g.lineWidth=1.3;g.beginPath();for(let x=0;x<=384;x+=6){const yy=wl+Math.sin(x/13+f/10)*1.3;x?g.lineTo(x,yy):g.moveTo(x,yy);}g.stroke();
  if(k>=36&&k<108){const s=c3Clamp((k-36)/64,0,1),fade=k>=100?c3Clamp(1-(k-100)/6,0,1):1,cy=wl+110-s*58,rx=16+150*Math.pow(s,1.25),ry=6+30*s;
    g.globalAlpha=0.92*fade;const sg2=g.createRadialGradient(192,cy,2,192,cy,rx);sg2.addColorStop(0,"#000");sg2.addColorStop(0.7,"rgba(0,0,0,.85)");sg2.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=sg2;g.beginPath();g.ellipse(192,cy,rx,ry,0,0,7);g.fill();
    g.fillStyle="#000";g.beginPath();g.moveTo(192-6,cy-ry*0.5);g.lineTo(192+4,cy-ry*1.9);g.lineTo(192+14,cy-ry*0.5);g.fill();g.beginPath();g.moveTo(192-rx*0.8,cy);g.lineTo(192-rx*1.05,cy-ry*0.7);g.lineTo(192-rx*0.95,cy+ry*0.6);g.fill();
    if(k>=80){const ea=c3Clamp((k-80)/10,0,1)*fade;[-1,1].forEach((sd)=>{g.fillStyle="rgba(255,50,20,"+ea+")";g.beginPath();g.arc(192+sd*rx*0.5,cy-ry*0.15,2.2+s*2,0,7);g.fill();glow(192+sd*rx*0.5,cy-ry*0.15,10+s*10,"255,40,20",0.5*ea);});}
    g.globalAlpha=1;}}
/* ---- the cinematic pass ---- */
function c3DSub(g,f){const D=C3D,B=D.bar;if(B<8||D.cap<0||f-D.capF>300||(f>=6365&&f<6570))return;const q2=C3_DL[D.cap];if(!q2)return;const txt=q2[2].slice(0,Math.floor(D.typed)),y0=216-B;
  g.textBaseline="top";g.font='6px "Press Start 2P",monospace';g.fillStyle="#000";g.fillText(q2[1],13,y0+4);g.fillStyle=C3_WHOT[q2[1]]||"#8fffd1";g.fillText(q2[1],12,y0+3);
  let fs=8;g.font=fs+'px "Press Start 2P",monospace';while(g.measureText(q2[2]).width>358&&fs>5){fs--;g.font=fs+'px "Press Start 2P",monospace';}g.fillStyle="#000";g.fillText(txt,13,y0+14);g.fillStyle="#f4f8ff";g.fillText(txt,12,y0+13);}
function c3DTitle(g,f){if(f<770||f>960)return;const B=C3D.bar,a=Math.min(1,(f-770)/25,(960-f)/25),big=(s,y,size,col)=>{g.font=size+'px "Press Start 2P",monospace';g.textBaseline="top";const w=g.measureText(s).width;g.globalAlpha=a;g.fillStyle="#000";g.fillText(s,192-w/2+1,y+1);g.fillStyle=col;g.fillText(s,192-w/2,y);g.globalAlpha=1;};
  big("SUNSHINE BAY",216-B-40,11,"#ffe070");big("12:00 NOON",216-B-24,6,"#9be7ff");}
function c3DPaint(g){const D=C3D,f=D.f,fb=D.fb,fg=fb.getContext("2d");fg.imageSmoothingEnabled=!1;
  const keep=ctx;ctx=fg;try{if(f>=6480)c3DForest(fg,f);else if(f>=C3_POV0){c3DPOV(fg,f);if(f>=C3_BURST&&f<C3_CUTB)c3DScare(fg,f-C3_BURST,fb);if(f>=C3_CUTB){fg.fillStyle="#000";fg.fillRect(0,0,384,216);}}else c3DWorld(fg,f);}finally{ctx=keep;}
  let blur=0,lid=1;
  if(f<720){const k=f;lid=k<60?0:k<150?(k-60)/90*0.35:k<190?0.35-(k-150)/40*0.35:k<300?(k-190)/110*0.7:k<420?0.7:k<440?0.15:Math.min(1,0.7+(k-440)/120);blur=c3Clamp(1-k/620,0,1);}
  if(f>=6480){const k=f-6480;lid=k<80?0:k<100?(k-80)/20:k<330?1:k<345?0.2:1;blur=c3Clamp(1-k/450,0,1);}
  g.imageSmoothingEnabled=!1;g.fillStyle="#000";g.fillRect(0,0,384,216);
  const sh=D.shake,ox=(Math.random()-0.5)*sh,oy=(Math.random()-0.5)*sh,inWorld=f<C3_POV0&&f>=720;
  if(blur>0.02){const s=D.sm,w=Math.max(12,Math.round(384*(1-0.94*blur))),h=Math.round(w*216/384);s.width=w;s.height=h;const sg=s.getContext("2d");sg.imageSmoothingEnabled=!0;sg.drawImage(fb,0,0,w,h);g.imageSmoothingEnabled=!0;g.drawImage(s,0,0,w,h,0,0,384,216);g.imageSmoothingEnabled=!1;g.globalAlpha=0.35*blur;g.fillStyle=f<720?"#fff8e8":"#0a1a10";g.fillRect(0,0,384,216);g.globalAlpha=1;}
  else if(inWorld){const z=Math.max(1,D.zoom),w=384/z,h=216/z,zx=D.fx-D.cam,zy=D.fy-8,sx=c3Clamp(zx-w/2+ox,0,384-w),sy=c3Clamp(zy-h/2+oy,0,216-h);g.drawImage(fb,sx,sy,w,h,0,0,384,216);}
  else{g.drawImage(fb,ox,oy,384,216);if(f>=C3_BURST&&f<C3_CUTB){const j=f-C3_BURST;if(j>=3){const t=D.tmp.getContext("2d");t.drawImage(g.canvas,0,0);for(let y=0;y<216;y+=9)if(Math.random()<0.4){g.fillStyle="#000";g.fillRect(0,y,384,9);g.drawImage(D.tmp,0,y,384,9,(Math.random()-0.5)*34,y,384,9);}
      if(j%5===0){g.fillStyle="rgba(255,255,255,.35)";g.fillRect(0,0,384,216);}if(j%7===3){g.globalCompositeOperation="difference";g.fillStyle="#fff";g.fillRect(0,0,384,216);g.globalCompositeOperation="source-over";}}}}
  if(lid<1)c3DLids(g,lid);
  if(inWorld&&f<5900){const s=D.sm2,sg=s.getContext("2d");sg.imageSmoothingEnabled=!0;sg.drawImage(g.canvas,0,0,96,54);g.imageSmoothingEnabled=!0;g.globalCompositeOperation="lighter";g.globalAlpha=0.2;g.drawImage(s,0,0,96,54,0,0,384,216);g.globalAlpha=1;g.globalCompositeOperation="source-over";g.imageSmoothingEnabled=!1;
    g.globalAlpha=0.07+0.03*Math.sin(f/40);g.fillStyle="#ffb060";g.fillRect(0,0,50,216);g.fillRect(340,0,44,216);g.globalAlpha=1;}
  [720,1440,2160,2880,3600,4320,5040].forEach((b)=>{const a=c3Clamp(1-Math.abs(f-b)/12,0,1)*0.85;if(a>0){g.globalAlpha=a;g.fillStyle="#fff4e0";g.fillRect(0,0,384,216);g.globalAlpha=1;}});
  if(D.flash>0){g.globalAlpha=Math.min(1,D.flash*0.14);g.fillStyle="rgb("+D.flashC+")";g.fillRect(0,0,384,216);g.globalAlpha=1;}
  if(f<C3_POV0||f>=6480){const vg=C3.cache.dvg||(C3.cache.dvg=(()=>{const q2=g.createRadialGradient(192,108,110,192,108,240);q2.addColorStop(0,"rgba(0,0,0,0)");q2.addColorStop(1,"rgba(0,0,0,.45)");return q2;})());g.fillStyle=vg;g.fillRect(0,0,384,216);}
  if(f>=C3_POV0&&f<C3_BURST){const vg2=g.createRadialGradient(192,108,60,192,108,230);vg2.addColorStop(0,"rgba(0,10,14,0)");vg2.addColorStop(1,"rgba(0,16,22,"+(0.4+0.4*D.pulse)+")");g.fillStyle=vg2;g.fillRect(0,0,384,216);}
  if(f>=6480&&f<6700){g.fillStyle="rgba(0,0,0,"+0.25*Math.abs(Math.sin(f/18))+")";g.fillRect(0,0,384,216);}
  {const gn=C3.cache.grain||(C3.cache.grain=(()=>{const c=c3Cv(192,108),q2=c.getContext("2d"),im=q2.createImageData(96,54);for(let i=0;i<192*108;i++){const v=Math.random()*255;im.data[4*i]=im.data[4*i+1]=im.data[4*i+2]=v;im.data[4*i+3]=255;}q2.putImageData(im,0,0);return c;})());g.globalAlpha=0.03;g.imageSmoothingEnabled=!1;g.drawImage(gn,((Math.random()*20)|0)-10,((Math.random()*12)|0)-6,384,216);g.globalAlpha=1;}
  const B=D.bar;if(B>0.5){g.fillStyle="#000";g.fillRect(0,0,384,B);g.fillRect(0,216-B,384,B);}
  c3DTitle(g,f);c3DSub(g,f);}
function c3DLids(g,o){const h=108*(1-c3Clamp(o,0,1));if(h<=0)return;g.fillStyle="#000";g.beginPath();g.moveTo(0,0);g.lineTo(384,0);g.lineTo(384,h*0.75);g.quadraticCurveTo(192,h*1.35,0,h*0.75);g.fill();
  g.beginPath();g.moveTo(0,216);g.lineTo(384,216);g.lineTo(384,216-h*0.75);g.quadraticCurveTo(192,216-h*1.35,0,216-h*0.75);g.fill();}
