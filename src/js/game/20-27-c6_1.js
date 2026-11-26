/* ======================= v50.1 ART PASS: painted forest, real-looking trees =======================
   Everything is painted per pixel (2x resolution, dithered with the game's Et matrix and It noise),
   the same way the game's own chapter 1 and 2 backdrops are made. */
var C6={spr:{}};
/* a small per-pixel painter for any size; x wraps if wrap=1 so parallax strips tile seamlessly */
function c6Buf(w,h,wrap){const c=c3Cv(w,h),g=c.getContext("2d"),im=g.createImageData(w,h),d=im.data;
  const px=(x,y,col,a)=>{x|=0;y|=0;if(y<0||y>=h)return;if(wrap)x=((x%w)+w)%w;else if(x<0||x>=w)return;const i=4*(y*w+x);
    if(a===undefined||a>=1){d[i]=col[0];d[i+1]=col[1];d[i+2]=col[2];d[i+3]=255;return;}if(a<=0)return;const b=d[i+3]/255,t=a+b*(1-a);
    d[i]=(col[0]*a+d[i]*b*(1-a))/t;d[i+1]=(col[1]*a+d[i+1]*b*(1-a))/t;d[i+2]=(col[2]*a+d[i+2]*b*(1-a))/t;d[i+3]=255*t;};
  const get=(x,y)=>{x|=0;y|=0;if(wrap)x=((x%w)+w)%w;if(x<0||x>=w||y<0||y>=h)return 0;return d[4*(y*w+x)+3];};
  return{P:{px,get,w,h},flush:()=>{g.putImageData(im,0,0);return c;}};}
function c6Pnt(w,h,wrap,fn){const B=c6Buf(w,h,wrap);(Array.isArray(fn)?fn:[fn]).forEach((st)=>st(B.P,w));return B.flush();}
/* strips are painted in stages: all at once if needed right now, or a stage at a time in quiet moments (c6Idle) */
var C6_JOBS={};
function c6Staged(key,w,h,stages){if(C3.cache[key])return C3.cache[key];const j=C6_JOBS[key];
  if(j){while(j.i<j.st.length)j.st[j.i++](j.B.P,w);delete C6_JOBS[key];return(C3.cache[key]=j.B.flush());}
  return(C3.cache[key]=c6Pnt(w,h,1,stages));}
function c6Queue(key,w,h,stages){if(C3.cache[key]||C6_JOBS[key])return;C6_JOBS[key]={B:c6Buf(w,h,1),st:stages,i:0,w};}
/* periodic value noise (seamless across a strip of width W) */
/* only blends near the seam, so most pixels cost one noise call; fine detail uses one octave (Pt) */
function c6N(x,y,s,W,coarse){const f=coarse===2?It:Pt;if(!W)return f(x,y,s);const k=((x%W)+W)%W,B=Math.min(24,W*0.25);if(k<W-B)return f(k,y,s);const u=(k-(W-B))/B;return f(k,y,s)*(1-u)+f(k-W,y,s)*u;}
/* pick from a colour ramp with ordered dithering between steps */
function c6Ramp(P,v,x,y){v=c3Clamp(v,0,0.999)*(P.length-1);const i=v|0,f=v-i;return P[Math.min(P.length-1,f>Et(x,y)?i+1:i)];}
/* a clump of leaves: lit from the upper left, ragged edges, gaps between the leaves */
function c6Ball(P,cx,cy,R,pal,seed,W,soft){const sc=W?W:0;
  for(let y=Math.floor(cy-R*1.3);y<=cy+R*1.3;y++)for(let x=Math.floor(cx-R*1.3);x<=cx+R*1.3;x++){const dx=(x-cx)/R,dy=(y-cy)/R,dd=Math.hypot(dx,dy);if(dd>1.3)continue;
    const leaf=c6N(x/2.2,y/2.2,seed,sc&&sc/2.2,1),edge=1-0.32*c6N(x/5,y/5,seed+9,sc&&sc/5);if(dd>edge+0.18*(leaf-0.5))continue;
    if(dd>edge*0.82&&leaf<0.42)continue;/* holes around the rim */
    let v=0.56-0.42*(dx*0.62+dy*0.78)-0.25*dd*dd+0.42*(leaf-0.5);if(leaf>0.74)v+=0.18;/* catching light */
    P.px(x,y,c6Ramp(pal,v,x,y),soft);}}
/* a vertical trunk with round shading, bark furrows and moss on the lit side */
function c6Trunk(P,cx,top,bot,w0,w1,pal,seed,W,moss){const sc=W?W:0;
  for(let y=Math.floor(top);y<bot;y++){const k=(y-top)/Math.max(1,bot-top),fl=Math.max(0,(k-0.86)/0.14),w=w1+(w0-w1)*k+w0*1.1*fl*fl,lean=Math.sin(y/37+seed)*1.5,xl=cx-w/2+lean;
    for(let x=Math.floor(xl);x<xl+w;x++){const u=(x-xl)/w,bark=c6N(x/2.4,y/13,seed,sc&&sc/2.4),fur=c6N(x/1.3,y/5,seed+3,sc&&sc/1.3,1);
      let v=0.86-1.05*Math.abs(u-0.28)-0.12*(u>0.7?1:0)+0.36*(bark-0.5);fur<0.3&&(v-=0.24);
      if(moss&&u<0.5&&c6N(x/5,y/7,seed+5,sc&&sc/5)>0.6-0.25*k){P.px(x,y,c6Ramp(moss,v+0.1,x,y));continue;}
      P.px(x,y,c6Ramp(pal,v,x,y));}}
  /* roots */
  for(let s=-1;s<=1;s+=2)for(let q=0;q<2;q++){const L=w0*(0.9+0.6*q),y0=bot-3-q*2;for(let i=0;i<L;i++){const x=cx+s*(w0*0.5+i),y=y0+i*0.32+q,th=Math.max(1,3-i/L*3);for(let j=0;j<th;j++)P.px(x,y-j,c6Ramp(pal,0.5-j*0.15,x,y-j));}}}
/* a tapered limb from (x0,y0) to (x1,y1) */
function c6Limb(P,x0,y0,x1,y1,t0,t1,pal){const n=Math.ceil(Math.hypot(x1-x0,y1-y0));for(let i=0;i<=n;i++){const k=i/n,x=x0+(x1-x0)*k,y=y0+(y1-y0)*k,t=t0+(t1-t0)*k;
  for(let j=-t/2;j<t/2;j++){const v=0.62-(j/t)*0.8;P.px(x,y+j,c6Ramp(pal,v,x|0,(y+j)|0));}}}

var C6_BARK=[[22,16,12],[38,28,20],[60,44,30],[88,66,44],[122,96,66]],C6_MOSS=[[34,58,30],[52,84,40],[78,114,52]];
var C6_LEAF=[[16,36,22],[26,56,32],[40,82,42],[62,112,54],[100,150,72],[150,190,96]];
var C6_HAZE=[[44,70,58],[54,84,68],[68,100,80],[86,118,94],[108,140,110]];
var C6_FAR=[[60,90,76],[72,104,88],[88,120,100]];

/* far forest wall: hazy trunks, a canopy ceiling, mist low down (768 px = 384 world px) */
var C6_FARST=[(P,W)=>{for(let y=0;y<216;y++){const k=y/184;const c=k<0.5?[18+40*k,38+60*k,28+46*k]:[38+90*(k-0.5),68+90*(k-0.5),51+70*(k-0.5)];for(let x=0;x<W;x++)P.px(x,y,[c[0]+(Et(x,y)<0.3?4:0),c[1]+(Et(x,y)<0.3?4:0),c[2]]);}
  },(P,W)=>{for(let n=0;n<34;n++){const x=r(n,6001)*W,w=2+r(n,6002)*4;for(let y=20;y<186;y++)for(let i=0;i<w;i++){const v=0.55-Math.abs(i/w-0.3)+0.2*(c6N((x+i)/2,y/10,6003+n,W/2)-0.5);P.px(x+i,y,c6Ramp(C6_FAR,v,(x+i)|0,y),0.55);}}
  },(P,W)=>{for(let n=0;n<22;n++){const x=r(n,6011)*W,w=5+r(n,6012)*8;c6Trunk(P,x,10,188,w,w*0.8,C6_HAZE,6013+n,W,null);
    if(r(n,6014)<0.6){const s=r(n,6015)<0.5?-1:1,y0=50+r(n,6016)*50;c6Limb(P,x,y0,x+s*(18+r(n,6017)*16),y0-14-r(n,6018)*10,3,1,C6_HAZE);c6Ball(P,x+s*(26+r(n,6017)*16),y0-20-r(n,6018)*10,9+r(n,6019)*6,C6_HAZE,6020+n,W);}}
  },(P,W)=>{for(let n=0;n<70;n++){const x=r(n,6031)*W,y=6+r(n,6032)*46,R=13+r(n,6033)*17;c6Ball(P,x,y,R,C6_HAZE,6034+n,W);}
  },(P,W)=>{for(let y=120;y<200;y++){const a=Math.min(0.42,((y-120)/70)*0.42);for(let x=0;x<W;x++)P.px(x,y,[150,178,140],a*(0.85+0.15*Math.sin(x/W*6.283*5+y/7)));}
  },(P,W)=>{for(let n=0;n<60;n++){const x=r(n,6041)*W,R=5+r(n,6042)*9;c6Ball(P,x,184-R*0.3,R,C6_HAZE,6043+n,W,0.9);}
  },(P,W)=>{for(let y=184;y<216;y++)for(let x=0;x<W;x++)P.px(x,y,[44,60,40]);}];
function c6ForFar(){return c6Staged("fFar6",768,216,C6_FARST);}
/* near forest: big oaks with moss, roots, limbs, a heavy canopy and undergrowth (1024 px = 512 world px) */
var C6_MIDXS=[60,210,330,500,640,790,930];
function c6MidTree(P,W,x0,n){const x=x0+(r(n,6101)-0.5)*40,w=18+r(n,6102)*14;
    /* canopy blob behind the trunk */
    for(let q=0;q<5;q++)c6Ball(P,x+(q-2)*22+(r(q+n*7,6103)-0.5)*14,8+r(q+n*7,6104)*26,18+r(q+n*7,6105)*12,C6_LEAF,6106+n*9+q,W);
    c6Trunk(P,x,-4,186,w,w*0.72,C6_BARK,6110+n,W,C6_MOSS);
    for(let b=0;b<2;b++){const s=(n+b)%2?1:-1,y0=46+b*30+r(n+b,6111)*14,L=30+r(n+b,6112)*26,ex=x+s*L,ey=y0-12-r(n+b,6113)*16;c6Limb(P,x+s*w*0.3,y0,ex,ey,6,2,C6_BARK);
      for(let q=0;q<3;q++)c6Ball(P,ex+(q-1)*10*s,ey-6-q*3,10+r(q+b+n,6114)*6,C6_LEAF,6115+n*5+b*3+q,W);}
    /* a curtain of hanging moss */
    for(let m=0;m<4;m++){const hx=x+(r(m+n*4,6116)-0.5)*90,L=20+r(m+n*4,6117)*40;for(let y=20;y<20+L;y++)P.px(hx+Math.sin(y/9+m)*1.2,y,c6Ramp(C6_MOSS,0.8-(y-20)/L*0.6,hx|0,y));}}
var C6_MIDST=C6_MIDXS.map((x0,n)=>(P,W)=>c6MidTree(P,W,x0,n)).concat([(P,W)=>{
  for(let n=0;n<46;n++){const x=r(n,6121)*W,R=7+r(n,6122)*10;c6Ball(P,x,186-R*0.45,R,C6_LEAF,6123+n,W);}
  },(P,W)=>{for(let n=0;n<40;n++){const x=r(n,6131)*W,h=10+r(n,6132)*10;for(let k=-3;k<=3;k++)for(let i=0;i<h;i++){const t=i/h,fx=x+k*t*4.5,fy=186-t*h*(1-Math.abs(k)*0.09)+t*t*Math.abs(k)*3;P.px(fx,fy,c6Ramp(C6_LEAF,0.35+0.5*(1-t)+(k<0?0.1:-0.05),fx|0,fy|0));}}
  },(P,W)=>{for(let x=0;x<W;x++){const h=2+((c6N(x/1.5,0,6141,W/1.5)*7)|0);for(let i=0;i<h;i++)P.px(x,186-i,c6Ramp(C6_LEAF,0.3+i/h*0.5,x,186-i));}}]);
function c6ForMid(){return c6Staged("fMid6",1024,216,C6_MIDST);}

/* ---------------- tree models for the climbable trees in the new areas ---------------- */
function c6TreeSpr(t){const key="t"+t.s+"|"+t.top+"|"+(t.dead?1:0);if(C6.spr[key])return C6.spr[key];
  const H=Math.ceil(2*(t.top+26)),Wd=150,cx=75,base=H-2;
  const cv=c6Pnt(Wd,H,0,(P)=>{const pal=t.dead?[[24,20,18],[38,32,28],[56,48,42],[78,68,58],[100,90,78]]:C6_BARK;
    if(!t.dead)for(let q=0;q<7;q++){const a=q/7*6.283+r(q,t.s+1),R=16+r(q,t.s+2)*8;c6Ball(P,cx+Math.cos(a)*24,base-2*t.top-4+Math.sin(a)*11,R,C6_LEAF,t.s*7+q);}
    c6Trunk(P,cx,base-2*t.top-6,base,11,5,pal,t.s,0,t.dead?null:C6_MOSS);
    if(t.dead){for(let q=0;q<5;q++){const a=-Math.PI/2+(q-2)*0.5,L=14+r(q,t.s+3)*12,ex=cx+Math.cos(a)*L,ey=base-2*t.top+Math.sin(a)*L;c6Limb(P,cx,base-2*t.top+4,ex,ey,3,1,pal);c6Limb(P,ex,ey,ex+Math.cos(a+0.6)*7,ey+Math.sin(a+0.6)*7,1.5,1,pal);}}
    else{for(let q=0;q<4;q++){const a=q/4*6.283+0.4,R=10+r(q,t.s+4)*5;c6Ball(P,cx+Math.cos(a)*10,base-2*t.top-14+Math.sin(a)*6,R,C6_LEAF,t.s*11+q);}c6Ball(P,cx-4,base-2*t.top-18,11,C6_LEAF,t.s*13);}});
  return(C6.spr[key]=cv);}
function c6CrownSpr(seed,dead){const key="c"+(seed|0)+(dead?"d":"");if(C6.spr[key])return C6.spr[key];
  return(C6.spr[key]=c6Pnt(44,36,0,(P)=>{if(dead)return;for(let q=0;q<4;q++)c6Ball(P,22+(q-1.5)*7,20+(q%2?-3:2),8+r(q,seed)*3,C6_LEAF,seed*5+q);c6Ball(P,19,15,7,C6_LEAF,seed*3+1);}));}
function c6Tree(t){if(t.x<camX-80||t.x>camX+270)return;const g=C2_FLOOR,s=c6TreeSpr(t);Ft(t.x,g+1,16,0.45);
  ctx.drawImage(s,Math.round((t.x-s.width/4)*2)/2,g+1-s.height/2,s.width/2,s.height/2);t.br.forEach((b)=>c6Branch(t,b));}
function c6Branch(t,b){const y=C2_FLOOR-b.h,stub=b.gone?6:b.len,warn=b.rot&&!b.gone&&b.load>b.snapT-16,jx=warn?(Math.random()-0.5)*1.2:0,jy=warn?(Math.random()-0.5)*1.2:0;
  const D=b.rot?["#4a3e30","#6a5a48","#9a8a70"]:t.dead?["#1e1a16","#2e2822","#4a4038"]:["#24180f","#3e2c1c","#6a5034"];
  for(let s=0;s<stub;s++){const xx=b.side<0?b.x-s-1:b.x+s,th=3.2-1.8*(s/b.len),sag=Math.sin(s/b.len*Math.PI)*0.6;fill(D[1],xx+jx,y+jy+sag,1,th);fill(D[2],xx+jx,y+jy+sag,1,0.6);fill(D[0],xx+jx,y+jy+sag+th-0.6,1,0.6);}
  if(b.gone){for(let k=0;k<3;k++)fill("#9a8a70",b.x+b.side*(5+k),y-1+k,1,1);return;}
  if(b.rot){for(let k=0;k<3;k++){const s=b.len*(0.25+0.25*k);fill("#2a2218",b.side<0?b.x-s:b.x+s,y+1,1,2);}fill("#c8c0a0",b.side<0?b.x-b.len*0.5:b.x+b.len*0.5,y-0.5,1,0.5);}
  const tx=b.side<0?b.x-b.len:b.x+b.len;if(t.dead||b.rot){c2Twigs(tx,y,5,b.h+b.len);return;}
  const c=c6CrownSpr(b.h+b.len);ctx.drawImage(c,tx-11+Math.sin(tick/90+b.h)*0.4,y-13,22,18);}
/* the young pine you cut boughs from */
function c6PineSpr(cut){const key="pine"+(cut?1:0);if(C6.spr[key])return C6.spr[key];
  return(C6.spr[key]=c6Pnt(64,96,0,(P)=>{const cx=32,base=94,pal=[[12,32,24],[20,48,34],[32,70,46],[52,98,62],[86,132,82]];
    c6Trunk(P,cx,40,base,6,4,C6_BARK,77,0,null);
    const tiers=[[base-16,26,20],[base-30,22,19],[base-43,18,17],[base-55,14,15],[base-66,10,13],[base-75,6,11]];
    tiers.forEach(([yb,hw,h],k)=>{if(cut&&k<2){P.px(cx-4,yb-2,[200,160,104]);P.px(cx+4,yb-3,[200,160,104]);return;}
      for(let i=0;i<h;i++){const t=i/h,y=yb-h+i,ww=hw*Math.pow(t,0.75);for(let x=Math.floor(cx-ww);x<=cx+ww;x++){const u=(x-(cx-ww))/(2*ww+1),droop=Math.abs(x-cx)/hw,needle=It(x/1.4,y/2.2,90+k);
        if(i>h-3&&needle<0.45)continue;let v=0.78-0.75*u-0.3*t+0.4*(needle-0.5)+0.15*droop;P.px(x,y+droop*droop*3,c6Ramp(pal,v,x,y));}}});
    P.px(cx,base-86,[86,132,82]);P.px(cx,base-85,[52,98,62]);}));}
/* the dead roadside trees on the cracked road, rim-lit by the sunset */
function c6DeadTree(seed,h){const key="d"+seed+"|"+h;if(C6.spr[key])return C6.spr[key];
  return(C6.spr[key]=c6Pnt(90,h+20,0,(P)=>{const pal=[[22,14,10],[34,22,16],[48,32,22],[110,58,30],[176,96,48]],cx=45,base=h+18;
    c6Trunk(P,cx,base-h,base,7,3,[[20,12,8],[30,20,14],[40,28,20],[56,38,26],[70,46,30]],seed,0,null);
    for(let x=cx;x<cx+4;x++)for(let y=base-h;y<base;y++)Et(x,y)<0.35&&P.get(x,y)&&P.px(x,y,[150,80,40],0.5);
    const twig=(x,y,a,L,d)=>{if(d>3||L<3)return;const ex=x+Math.cos(a)*L,ey=y+Math.sin(a)*L;c6Limb(P,x,y,ex,ey,Math.max(1,3-d),Math.max(1,2.4-d),pal);
      twig(ex,ey,a-0.45-0.2*r(d,seed),L*0.66,d+1);twig(ex,ey,a+0.4+0.2*r(d+5,seed),L*0.6,d+1);};
    for(let q=0;q<4;q++){const y=base-h*(0.45+q*0.16),s=q%2?1:-1;twig(cx,y,-Math.PI/2+s*(0.7+0.2*r(q,seed+1)),10+r(q,seed+2)*8,0);}
    twig(cx,base-h,-Math.PI/2,8,1);}));}
/* the climbable trees in the new areas use the painted model */
{const _t=c2Tree;c2Tree=function(t){if(c3Mine())return c6Tree(t);return _t(t);};}
/* the cracked road's skyline: ruined towers in the sunset haze, painted per pixel */
var C6_ROADST=[(P,W)=>{
  const hill=(x)=>118-(12*c3Sin(x,W,2,1)+8*c3Sin(x,W,5)+4*c3Sin(x,W,11,2));
  for(let x=0;x<W;x++){const h=hill(x);for(let y=h|0;y<216;y++){const k=(y-h)/60;P.px(x,y,c6Ramp([[150,80,56],[118,60,44],[92,46,36],[74,36,30]],0.15+k+0.25*(c6N(x/9,y/9,6201,W/9)-0.5),x,y),0.75);}}
  },(P,W)=>{const B=[[40,46,0],[96,70,1],[150,38,0],[300,58,1],[352,84,1],[410,44,0],[560,66,1],[620,40,0],[700,52,1]];
  B.forEach(([bx,bh,tall],i)=>{const w=26+(i*7)%18,top=150-bh,dk=[[40,20,18],[54,28,24],[70,36,30],[96,50,38],[140,74,48]];
    for(let x=0;x<w;x++){const brk=x>w*0.55?((c6N(x/2,i,6210+i)*14)|0)+(tall&&x>w*0.8?10:0):(c6N(x/3,i,6211+i)*4)|0;
      for(let y=top+brk;y<170;y++){const u=x/w;let v=0.25+0.5*u+0.2*(c6N((bx+x)/3,y/4,6212,W/3)-0.5)+(u>0.9?0.25:0);
        const wx=(x-3)%7,wy=(y-top-6)%9;if(x>2&&x<w-3&&y>top+brk+4&&wx<3&&wy<4){const lit=r(((bx+x)/7|0)*31+((y/9)|0),6213+i);v=lit<0.06?-1:0.05;}
        P.px(bx+x,y,v<0?[255,170,90]:c6Ramp(dk,v,bx+x,y));}}
    /* rebar and a hanging vine or two off the broken top */
    for(let q=0;q<3;q++){const x=bx+w*0.6+q*3;for(let y=0;y<4+q*2;y++)P.px(x+(y>3?1:0),top+(r(q,6214+i)*10|0)-y,[40,22,18]);}
    for(let q=0;q<2;q++){const x=bx+3+r(q,6215+i)*(w-6);for(let y=0;y<10+r(q,6216+i)*14;y++)P.px(x+Math.sin(y/3)*0.8,top+4+y,c6Ramp([[40,52,26],[60,74,34],[84,96,44]],0.4+0.4*Math.sin(y),x|0,y));}});
  },(P,W)=>{for(let y=100;y<216;y++){const a=Math.min(0.5,(y-100)/120);for(let x=0;x<W;x++)P.px(x,y,[200,104,56],a*0.45);}
  for(let k=0;k<3;k++){const sx=120+k*250;for(let i=0;i<26;i++){const rr=6+i*1.4,cx=sx+i*3+Math.sin(i)*4,cy=140-i*6;for(let y=-rr;y<rr;y++)for(let x=-rr;x<rr;x++){const d=Math.hypot(x,y)/rr;d<1&&Et(cx+x|0,cy+y|0)<(1-d)*0.9&&P.px(cx+x,cy+y,[44,32,30],0.22-i*0.007);}}}}];
function c6RoadFar(){return c6Staged("rFar6",768,216,C6_ROADST);}
/* weathering painted over the moored ship: rust runs, grime, dents and corrugation (ship-local coords x -66..128, y D-70..D+25) */
function c6ShipGrime(){if(C6.spr.ship)return C6.spr.ship;const D=62,X=(x)=>(x+66)*2,Y=(y)=>(y-(D-70))*2;
  return(C6.spr.ship=c6Pnt(388,190,0,(P)=>{
    const box=(x0,y0,w,h,f)=>{for(let y=Y(y0);y<Y(y0+h);y++)for(let x=X(x0);x<X(x0+w);x++)f(x,y,(x-X(x0))/(w*2),(y-Y(y0))/(h*2));};
    /* containers: corrugation light/shade, rust blooms, scuffed corners */
    [[-52,3],[-34,3],[-16,2],[2,3],[20,2],[38,3]].forEach(([cx,h],i)=>{for(let q=0;q<h;q++){const y0=D-3-(q+1)*9;box(cx,y0,17,9,(x,y,u,v)=>{const rib=(x%4)<2,n=It(x/4,y/4,7000+i*5+q),m=It(x/1.5,y/1.5,7001+q);
      rib?P.px(x,y,[255,255,255],0.07):P.px(x,y,[0,0,0],0.12);
      if(n>0.62+0.2*(1-v))P.px(x,y,m<0.5?[120,56,24]:[150,78,36],0.55);
      if((u<0.06||u>0.94||v<0.08||v>0.92)&&m>0.55)P.px(x,y,[30,26,22],0.5);
      if(v>0.85)P.px(x,y,[20,16,14],0.25);});}});
    /* accommodation block + bridge: dirt pooling low, rust bleeding from every window, seams */
    const st=(x0,y0,w,h)=>box(x0,y0,w,h,(x,y,u,v)=>{const n=It(x/6,y/9,7020),m=It(x/1.3,y/1.3,7021);
      P.px(x,y,[60,50,40],Math.max(0,v*0.32+0.18*(n-0.5)));
      ((y%16)===0)&&P.px(x,y,[70,66,60],0.35);(x%22===0)&&P.px(x,y,[90,86,78],0.25);
      m>0.86&&P.px(x,y,[110,90,70],0.4);});
    st(64,D-38,50,38);st(58,D-49,62,11);
    for(let fl=0;fl<4;fl++)for(let q=0;q<8;q++){const x=X(68+q*5.4)+2+(q%3),y=Y(D-34+fl*8+4),L=4+((r(q+fl*8,7030)*10)|0);for(let k=0;k<L;k++)P.px(x+(k>6?1:0),y+k,[128,62,26],0.5*(1-k/L));}
    /* funnel soot */
    box(96,D-34,14,8,(x,y,u,v)=>P.px(x,y,[10,10,10],0.5*(1-v)*(0.6+0.4*It(x/3,y/3,7040))));
    /* hull: mottled paint, salt line, long rust runs from the deck scuppers */
    box(-60,D,186,W6H(),(x,y,u,v)=>{const n=It(x/8,y/5,7050),m=It(x/1.6,y/1.6,7051);n>0.6&&P.px(x,y,[70,80,96],0.18);m>0.8&&P.px(x,y,[10,12,16],0.3);});
    for(let q=0;q<20;q++){const x=X(-56+q*9.3+r(q,7060)*4),L=10+r(q,7061)*26;for(let k=0;k<L;k++)P.px(x+(k%7===6?1:0),Y(D)+2+k,[140,70,30],0.55*(1-k/L));}}));}
function W6H(){return 22;}
/* the dead snag in the forest that the loose vine hangs from */
function c6SnagSpr(){if(C6.spr.snag)return C6.spr.snag;const pal=[[26,20,16],[40,32,24],[60,48,36],[86,72,54],[112,96,74]];
  return(C6.spr.snag=c6Pnt(80,128,0,(P)=>{c6Trunk(P,40,6,127,11,7,pal,5150,0,C6_MOSS);
    for(let x=33;x<48;x++){const j=(It(x/1.5,0,5151)*7)|0;for(let y=0;y<j;y++)P.get(x,6+y)&&P.px(x,6+y,[0,0,0],0);}
    for(let x=34;x<47;x++){const j=(It(x/1.5,0,5151)*7)|0;P.px(x,6+j,[150,128,96]);}
    c6Limb(P,44,17,70,13,6,3,pal);c6Limb(P,58,15,63,6,2,1,pal);c6Limb(P,36,40,22,30,3,1,pal);
    for(let k=0;k<3;k++)P.px(70+k,12+k,[150,128,96]);}));}
GM.c3.sprSheet=()=>{const c=c3Cv(420,180),g=c.getContext("2d");g.fillStyle="#2a4030";g.fillRect(0,0,420,180);g.imageSmoothingEnabled=!1;g.drawImage(c6PineSpr(0),0,40);g.drawImage(c6PineSpr(1),66,40);g.drawImage(c6SnagSpr(),130,20);const t={s:713,top:72,dead:0,x:0,br:[]};const s=c6TreeSpr(t);g.drawImage(s,210,180-s.height);g.drawImage(c6CrownSpr(40),360,20);g.drawImage(c6DeadTree(5,84),330,60);return c.toDataURL();};
GM.c3.c6t=()=>{const o={},T=(k,f)=>{const t=performance.now();f();o[k]=Math.round(performance.now()-t);};delete C3.cache.fFar6;delete C3.cache.fMid6;delete C3.cache.rFar6;C6.spr={};C6_JOBS={};T("far",c6ForFar);T("mid",c6ForMid);T("road",c6RoadFar);T("tree",()=>c6TreeSpr({s:713,top:72,dead:0}));T("pine",()=>c6PineSpr(0));T("ship",c6ShipGrime);return o;};
/* paint the new art a slice at a time while nothing is happening, so entering a room never stalls */
var C6_SPRQ=null;
function c6SprJobs(){const q=[()=>c6PineSpr(0),()=>c6PineSpr(1),()=>c6SnagSpr()];
  ["forest","wroad","river","rroad","cbridge","port"].forEach((id)=>{const f=C2_F[id];if(!f)return;f.trees.forEach((t)=>{q.push(()=>c6TreeSpr(t));(t.br||[]).forEach((b)=>q.push(()=>c6CrownSpr(b.h+b.len)));});});
  return q;}
function c6Idle(){try{if(!GM.on||modal||document.hidden||(C3.ch&&!c3S().roadDone)||C3.cut)return;
  if(C2[room]){room!=="forest"&&(c6Queue("fFar6",768,216,C6_FARST),c6Queue("fMid6",1024,216,C6_MIDST));room!=="wroad"&&c6Queue("rFar6",768,216,C6_ROADST);}
  for(const k in C6_JOBS){const j=C6_JOBS[k];j.st[j.i++](j.B.P,j.w);if(j.i>=j.st.length){C3.cache[k]=j.B.flush();delete C6_JOBS[k];}return;}
  if(C2[room]&&C2_F.forest){C6_SPRQ||(C6_SPRQ=c6SprJobs());const f=C6_SPRQ.shift();f&&f();}}catch(e){}}
setInterval(c6Idle,180);
GM.c3.road=()=>({W:C2.wroad.W,cut:C3_CUT,cp:C3_CP,cars:C2.wroad.cars.map((q)=>Math.round(q.x)).sort((a,b)=>a-b),blast:C3_BLAST.map(Math.round),holes:C3_HOLES1.concat(C3_HOLES2).map((h)=>Math.round(h[0])),worms:C3_WORMS.map(Math.round),fv:C3_FV.map((v)=>Math.round(v[0])),poles:C3_POLES.map(Math.round),sink:C3_SINK.map(Math.round)});
GM.c3.carsInfo=()=>C2.wroad.cars.map((c)=>[Math.round(c.x),c.w,c.h,c.k||c.kind||c.t||""]);
