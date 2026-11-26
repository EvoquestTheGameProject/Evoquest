/* ======================= ART FOR THE ISLAND, THE TOWER AND THE GENERATOR ROOM ======================= */
{const _t=c5Tile;c5Tile=function(id,i,seed){if(!c7Is(id))return _t(id,i,seed);const k=id+i;return C5.tiles[k]||(C5.tiles[k]=Ae((t)=>{id==="isle"?c7PaintIsle(t,i,seed):id==="tctl"?c7PaintCtl(t,i,seed):c7PaintGen(t,i,seed);}));};}
var C7_PINE=[[12,32,26],[20,50,36],[32,74,48],[52,102,62],[84,134,82]];
/* a fir tree painted into a pixel buffer (used by the tile painters) */
function c7Fir(P,cx,base,h,seed){c6Trunk(P,cx,base-h*0.4,base,5,3.4,C6_BARK,seed,0,null);
  const n=5+((h/22)|0);for(let k=0;k<n;k++){const u=k/n,yb=base-h*0.14-u*h*0.82,hw=(h*0.30)*(1-u*0.82),th=h*0.2;
    for(let i=0;i<th;i++){const tt=i/th,y=yb-th+i,ww=hw*Math.pow(tt,0.8);for(let x=Math.floor(cx-ww);x<=cx+ww;x++){const uu=(x-(cx-ww))/(2*ww+1),nd=It(x/1.4,y/2.2,seed+k);
      if(i>th-2&&nd<0.45)continue;P.px(x,y+Math.abs(x-cx)/hw*1.5,c6Ramp(C7_PINE,0.8-0.7*uu-0.25*tt+0.35*(nd-0.5),x,y));}}}}
function c7PaintIsle(t,i,seed){const R=(k,a)=>r(k+i*37,a+seed),O=i*190;
  t.grad(0,126,["#2e3e54","#566c84","#8ea0b0","#cbc2a6","#ecd9b0"]);
  for(let y=0;y<124;y++)for(let x=0;x<384;x++){const n=It((x+O)/64,y/20,seed)*0.6+It((x+O)/24,y/9,seed+3)*0.4;
    if(n>0.52&&y<84)t.px(x,y,[40+y*0.5,54+y*0.5,72+y*0.5],Math.min(0.62,(n-0.52)*2.3)*(Et(x,y)<0.55?1:0.6));
    else if(n<0.36&&y>26)t.px(x,y,[244,224,184],Math.min(0.42,(0.36-n)*1.5)*(Et(x,y)<0.5?1:0.5));}
  const sx=250+R(0,7)*60,sy=98;for(let a=-34;a<=34;a++)for(let b=-34;b<=34;b++){const d=Math.hypot(a,b);d<26&&t.px(sx+a,sy+b,[255,240,205],d<9?0.95:(1-d/26)*0.4);}
  t.grad(122,158,["#a8b6b0","#7a949a","#587480","#42606c"]);
  for(let k=0;k<110;k++){const y=124+R(k,1)*34,L=2+R(k,2)*12*((y-120)/38);t.rect(384*R(k,3),y,L,1,R(k,4)<0.5?"#e8f0ee":"#c4d6d6",0.3+0.4*((y-120)/38));}
  for(let k=0;k<44;k++)t.rect(sx-40+R(k,5)*80,126+R(k,6)*30,1+R(k,7)*3,1,"#fff4d0",0.7);
  const ridge=(base,amp,pal,so)=>{const pts=[[0,172]];for(let x=0;x<=384;x+=8)pts.push([x,base-amp*It((x+O)/70,so,seed+so)]);pts.push([384,172]);t.poly(pts,(x,y)=>c6Ramp(pal,0.2+0.6*((y-(base-amp))/(amp+22))+0.25*(It(x/5,y/5,seed+4)-0.5),x,y));};
  ridge(124,26,[[126,148,146],[140,162,156],[156,176,166]],1);ridge(142,26,[[84,108,104],[98,122,116],[114,140,130]],2);
  for(let n=0;n<26;n++)c6Ball(t,384*R(n,9),138+R(n,10)*14,6+R(n,11)*6,C7_PINE,seed+n,0,0.7);
  for(let y=140;y<172;y++){const a=Math.min(0.5,(172-y)/38*0.5);t.rect(0,y,384,1,"#c4d4cc",a*0.5);}
  for(let n=0;n<56;n++){const x=384*R(n,12),b=158+R(n,13)*24;if(n%3===0)c7Fir(t,x,b+6,36+R(n,14)*26,seed+n);else c6Ball(t,x,b-4,9+R(n,15)*11,n%2?C6_LEAF:C7_PINE,seed*3+n,0,0.97);}
  for(let k=0;k<26;k++){const x=384*R(k,16),w=8+R(k,17)*20,y=180+R(k,18)*4;for(let q=0;q<w;q++){const hh=2+((q*5)%4);t.rect(x+q,y-hh,1,hh,c6Ramp([[40,70,40],[60,98,52],[90,130,70]],0.3+0.6*((q*7)%5)/5,x+q|0,y));}}
  for(let x=0;x<384;x++){const h=3+((It((x+O)/3,1,seed+6)*7)|0);for(let y=0;y<h;y++)t.px(x,184-y,c6Ramp(C6_LEAF,0.22+0.6*y/h,x,184-y));}
  t.grad(184,216,["#5c4e3c","#473b2d","#322a20"]);
  for(let y=190;y<208;y++)for(let x=0;x<384;x++){const n=It((x+O)/6,y/3,seed+7);n>0.46&&t.px(x,y,[112,98,76],(n-0.46)*1.4*(1-(y-190)/22));}
  for(let k=0;k<340;k++)t.rect(384*R(k,20),186+30*R(k,21),1+(R(k,22)*3|0),1,R(k,23)<0.5?"#2a2218":"#7a6a52",0.7);
  for(let k=0;k<22;k++){const x=384*R(k,24),y=188+24*R(k,25);t.rect(x,y,3+R(k,26)*4,2,"#6a6862");t.rect(x,y,3,1,"#9a988e");}
  for(let k=0;k<7;k++){const cx=384*R(k,27),cy=194+18*R(k,28),w=14+R(k,29)*26;for(let y=-1;y<=1;y++)t.rect(cx-w/2+Math.abs(y)*2,cy+y,w-Math.abs(y)*4,1,y<0?"#8aa0ac":"#5a7482");t.rect(cx-w/3,cy-1,w/3,1,"#dce8ec",0.6);}
  t.rect(0,184,384,1,"#1a1810",0.7);}
function c7PaintCtl(t,i,seed){const R=(k,a)=>r(k+i*41,a+seed),O=i*300;
  t.grad(0,184,["#36424a","#46525a","#3e4a52","#344048"]);
  for(let y=0;y<184;y+=2)for(let x=0;x<384;x++){const n=It((x+O)/9,y/5,seed);n>0.62&&t.px(x,y,[62,76,82],0.55);n<0.28&&t.px(x,y,[22,28,34],0.4);}
  t.rect(0,112,384,72,"#27382f");for(let y=112;y<184;y++)for(let x=0;x<384;x++){const n=It((x+O)/7,y/4,seed+2);n>0.58&&t.px(x,y,[60,84,70],(n-0.58)*1.5);n<0.3&&t.px(x,y,[14,24,18],0.5);}
  t.rect(0,111,384,2,"#8aa098",0.7);t.rect(0,113,384,1,"#0a1410",0.7);
  t.rect(0,0,384,12,"#1e262c");for(let x=0;x<384;x+=48)t.rect(x,0,2,12,"#0e1418");t.rect(0,12,384,1,"#5a6a74");
  [[8,5],[22,4]].forEach(([y,h],q)=>{t.rect(0,y,384,h,"#12181c");t.rect(0,y,384,1,"#7a8892",0.7);for(let x=(q*30)%72;x<384;x+=72){t.rect(x,y-1,3,h+2,"#2a343c");}});
  for(let w=0;w<2;w++){const x0=(w?226:34)-(i?0:0)+R(w,3)*8,y0=28,W=78,H=70;
    t.rect(x0-4,y0-4,W+8,H+8,"#12181c");t.grad(y0,y0+H,["#7a909e","#a2b4bc","#c4d0d2"],x0,x0+W);
    for(let y=y0;y<y0+H;y++)for(let x=x0;x<x0+W;x++){const n=It((x+O)/12,y/9,seed+8);n>0.5&&t.px(x,y,[226,234,236],(n-0.5)*1.5);}
    for(let k=0;k<26;k++)t.rect(x0+R(k+w*9,30)*(W-2),y0+R(k+w*9,31)*(H-8),1,3+R(k,32)*5,"#e8f2f6",0.5);
    t.rect(x0+W/2-1,y0,2,H,"#12181c");t.rect(x0,y0+H/2-1,W,2,"#12181c");t.rect(x0-4,y0+H+4,W+8,3,"#5a6a74");t.rect(x0-4,y0+H+4,W+8,1,"#9aaab4");}
  for(let k=0;k<60;k++)t.rect(384*R(k,10),20+R(k,11)*90,1,2+R(k,12)*10,"#6a4a30",0.28);
  t.grad(184,216,["#3a4046","#2c3238","#1e2226"]);
  for(let x=(i*43)%48;x<384;x+=48)t.rect(x,185,1,31,"#14181c");for(let y=199;y<216;y+=15)t.rect(0,y,384,1,"#14181c",0.8);
  for(let k=0;k<120;k++)t.rect(384*R(k,13),186+30*R(k,14),2+(R(k,15)*6|0),1,R(k,16)<0.5?"#50585e":"#1a1e22",0.7);
  t.rect(0,184,384,1,"#7a8892");t.rect(0,185,384,1,"#0a0c0e");}
function c7PaintGen(t,i,seed){const R=(k,a)=>r(k+i*43,a+seed),O=i*320;
  t.grad(0,184,["#1c2024","#282e34","#22282e","#1a1e22"]);
  for(let y=0;y<184;y+=16){const off=((y/16|0)%2)*24;t.rect(0,y,384,1,"#0c1014");for(let x=-off;x<384;x+=48)t.rect(x,y,1,16,"#0c1014");}
  for(let y=0;y<184;y++)for(let x=0;x<384;x++){const n=It((x+O)/8,y/6,seed);n>0.6&&t.px(x,y,[50,58,64],(n-0.6)*1.6);n<0.27&&t.px(x,y,[10,14,18],0.45);}
  for(let y=120;y<184;y++)for(let x=0;x<384;x++){const n=It((x+O)/14,y/4,seed+5);n>0.55&&t.px(x,y,[28,56,40],(n-0.55)*(y-120)/64*1.6);}
  [[18,6],[36,5],[130,6]].forEach(([y,h],q)=>{t.rect(0,y,384,h,"#10141a");t.rect(0,y,384,1,"#6a7a88");t.rect(0,y+h-1,384,1,"#06080a");t.rect(0,y+1,384,1,"#4a5a68",0.6);for(let x=(q*37)%64;x<384;x+=64){t.rect(x,y-1,4,h+2,"#2a343e");t.rect(x,y-1,1,h+2,"#8a9aa8");}});
  for(let k=0;k<3;k++){const x=40+k*120+R(k,2)*30;t.rect(x,30,12,3,"#6a1a14");for(let a=0;a<9;a++){const an=a/9*6.283;t.px(x+6+Math.cos(an)*5,30+1+Math.sin(an)*5,[168,38,28]);}}
  for(let x=0;x<384;x+=14){t.poly([[x,152],[x+7,152],[x+14,160],[x+7,160]],"#c8a424");}t.rect(0,152,384,1,"#0a0c10");t.rect(0,160,384,1,"#0a0c10");
  for(let k=0;k<90;k++)t.rect(384*R(k,3),6+R(k,4)*170,1,2+R(k,5)*9,"#4a3020",0.35);
  t.grad(184,216,["#34383c","#2a2e32","#1c2024"]);
  for(let x=(i*53)%64;x<384;x+=64)t.rect(x,185,1,31,"#0e1114");for(let y=200;y<216;y+=16)t.rect(0,y,384,1,"#0e1114",0.8);
  for(let k=0;k<160;k++)t.rect(384*R(k,6),186+30*R(k,7),2+(R(k,8)*5|0),1,R(k,9)<0.5?"#484e54":"#16181c",0.7);
  for(let k=0;k<5;k++){const cx=384*R(k,10),cy=192+20*R(k,11),w=12+R(k,12)*28;for(let y=-1;y<=1;y++)t.rect(cx-w/2+Math.abs(y)*2,cy+y,w-Math.abs(y)*4,1,"#0a0c0e",0.6);}
  t.rect(0,184,384,1,"#6a7a88");t.rect(0,185,384,1,"#06080a");}
/* ---------------- sprites: the ship's hull at the pier and the radio tower ---------------- */
function c7HullSpr(){if(C6.spr.hull)return C6.spr.hull;
  return(C6.spr.hull=c6Pnt(300,236,0,(P)=>{const S=[[18,22,28],[28,34,42],[40,48,58],[58,68,80],[82,94,108]];
    for(let y=0;y<236;y++)for(let x=0;x<300;x++){const pan=((x/60)|0)*7+((y/48)|0)*3,n=It(x/10,y/4,2100+pan),v=0.4+0.18*(n-0.5)+(((x%60)<2)||((y%48)<2)?-0.3:0)+(y<6?0.2:0);P.px(x,y,c6Ramp(S,v,x,y));}
    for(let q=0;q<46;q++){const x=((q*29)%288)+3,L=14+((q*7)%60);for(let y=0;y<L;y++)P.px(x+(y%9===8?1:0),((q*37)%150)+y,[138,66,28],0.55*(1-y/L));}
    for(let y=164;y<236;y++)for(let x=0;x<300;x++){const n=It(x/9,y/5,2101);P.px(x,y,c6Ramp([[74,24,20],[110,34,26],[140,48,34]],0.3+0.4*(n-0.1),x,y));}
    for(let x=0;x<300;x++)P.px(x,164,[216,212,196]);
    for(let p=0;p<4;p++){const cx=40+p*70,cy=76;for(let a=-9;a<=9;a++)for(let b=-9;b<=9;b++){const d=Math.hypot(a,b);d<9&&P.px(cx+a,cy+b,d>7?[168,174,180]:d>5.4?[12,14,18]:[255,214,128],d<=5.4?0.8:1);}}
    for(let x=0;x<300;x++)for(let q=0;q<3;q++)P.px(x,30+q,[88,98,110]);}));}
function c7TowerSpr(){if(C6.spr.tower)return C6.spr.tower;
  return(C6.spr.tower=c6Pnt(100,252,0,(P)=>{const cx=50,top=14,bot=246,hw=(y)=>4+(30-4)*((y-top)/(bot-top));
    const legs=[-1,0,1];for(let y=top;y<bot;y++){const w=hw(y),band=(((y-top)/22)|0)%2;[-1,1].forEach((s)=>{for(let q=0;q<3;q++)P.px(cx+s*w+q-1,y,band?[200,48,36]:[226,222,208]);P.px(cx+s*w-1,y,[255,255,255],0.4);P.px(cx+s*w+1,y,[0,0,0],0.4);});P.px(cx,y,[70,78,86]);}
    const ln=(x0,y0,x1,y1,c,al)=>{const n=Math.ceil(Math.hypot(x1-x0,y1-y0));for(let z=0;z<=n;z++)P.px(x0+(x1-x0)*z/n,y0+(y1-y0)*z/n,c,al);};
    for(let k=0;k<11;k++){const y0=top+k*21,y1=y0+21,w0=hw(y0),w1=hw(y1);ln(cx-w0,y0,cx+w1,y1,[48,56,64]);ln(cx+w0,y0,cx-w1,y1,[48,56,64]);ln(cx-w1,y1,cx+w1,y1,[60,68,76]);}
    P.px(cx,top-12,[60,68,76]);for(let y=top-12;y<top;y++)P.px(cx,y,[170,176,182]);
    for(let y=top+36;y<top+44;y++)for(let x=cx-18;x<cx-8;x++)P.px(x,y,[188,194,200]);for(let y=top+36;y<top+44;y++)for(let x=cx+8;x<cx+18;x++)P.px(x,y,[188,194,200]);
    for(let y=top+10;y<top+14;y++)for(let x=cx-9;x<cx+9;x++)P.px(x,y,[150,156,164]);
    for(let y=bot-6;y<bot+4;y++)for(let x=cx-36;x<cx+36;x++)P.px(x,y,[86,90,94]);}));}
/* ---------------- per-room drawing ---------------- */
function c7Back(){if(room==="isle")return c7IsleBack();if(room==="tctl")return c7CtlBack();return c7GenBack();}
function c7Draw(){if(room==="isle")c7IsleProps();}
function c7Front(){const S=c7S();
  if(room==="isle"){const a=S.look?0.1:0.24;for(let k=0;k<3;k++){const y=56+k*18,gr=ctx.createLinearGradient(0,y-14,0,y+14);gr.addColorStop(0,"rgba(214,224,226,0)");gr.addColorStop(0.5,"rgba(214,224,226,"+(a*(1-k*0.22))+")");gr.addColorStop(1,"rgba(214,224,226,0)");ctx.save();ctx.translate(camX-((tick*(0.12+k*0.05))%220)+110,0);ctx.fillStyle=gr;ctx.fillRect(-60,y-14,520,28);ctx.restore();}
    for(let q=0;q<10;q++){const x=camX+((q*47+tick*0.25)%200),y=(q*17+tick*0.15)%100;ctx.globalAlpha=0.2;fill("#e8eef0",x,y,0.7,0.7);ctx.globalAlpha=1;}}
  else if(room==="tgen"){for(const q of C7.steam){ctx.globalAlpha=Math.max(0,q.a*0.5);fill("#d8e0e4",q.x,q.y,2+(1-q.a)*6,1.5+(1-q.a)*4);ctx.globalAlpha=1;}}}
function c7Tint(){const S=c7S();
  if(room==="isle"){ctx.save();ctx.globalCompositeOperation="multiply";ctx.fillStyle="rgb(222,228,236)";ctx.fillRect(0,0,192,108);ctx.restore();const vg=C3.cache.c7vi||(C3.cache.c7vi=(()=>{const q=ctx.createRadialGradient(96,54,40,96,54,122);q.addColorStop(0,"rgba(0,0,0,0)");q.addColorStop(1,"rgba(6,10,16,.42)");return q;})());ctx.fillStyle=vg;ctx.fillRect(0,0,192,108);}
  else if(room==="tctl"){ctx.save();ctx.globalCompositeOperation="multiply";ctx.fillStyle="rgb(214,224,232)";ctx.fillRect(0,0,192,108);ctx.restore();const vg=C3.cache.c7vc||(C3.cache.c7vc=(()=>{const q=ctx.createRadialGradient(96,54,34,96,54,118);q.addColorStop(0,"rgba(0,0,0,0)");q.addColorStop(1,"rgba(2,6,12,.55)");return q;})());ctx.fillStyle=vg;ctx.fillRect(0,0,192,108);}
  else{const hot=S.gs<=1&&!S.gen;ctx.save();ctx.globalCompositeOperation="multiply";ctx.fillStyle=hot?"rgb(232,196,176)":"rgb(222,214,196)";ctx.fillRect(0,0,192,108);ctx.restore();
    if(hot){const a=0.07+0.06*Math.sin(tick/9);ctx.fillStyle="rgba(255,40,24,"+a+")";ctx.fillRect(0,0,192,108);}
    const vg=C3.cache.c7vg||(C3.cache.c7vg=(()=>{const q=ctx.createRadialGradient(96,54,30,96,54,120);q.addColorStop(0,"rgba(0,0,0,0)");q.addColorStop(1,"rgba(6,4,0,.58)");return q;})());ctx.fillStyle=vg;ctx.fillRect(0,0,192,108);}
  if(C5.fl>0){ctx.fillStyle="rgba(215,232,255,"+0.3*C5.fl/28+")";ctx.fillRect(0,0,192,108);}
  if(C3.dark>0){ctx.fillStyle="rgba(0,0,4,"+C3.dark+")";ctx.fillRect(0,0,192,108);}}
{const _a=c5Back;c5Back=function(){if(c7Is())return c7Back();return _a();};}
{const _a=c5Draw;c5Draw=function(){if(c7Is())return c7Draw();return _a();};}
{const _a=c5Front;c5Front=function(){if(c7Is())return c7Front();return _a();};}
{const _a=c5Tint;c5Tint=function(){if(c7Is())return c7Tint();return _a();};}
/* ---------------- the island ---------------- */
function c7IsleBack(){const S=c7S(),g=C2_FLOOR,cut=C3.cut&&C3.cut.k==="c5look"?C3.cut.t:0;
  /* the ship's hull at the pier, and the planks */
  if(camX<190){const h=c7HullSpr();ctx.drawImage(h,-34,g-98,150,118);}
  if(camX<190){fill("#3a2c20",0,g,132,16);for(let q=0;q<10;q++){fill(q%2?"#6a5238":"#7a6044",q*14,g+0.4,13.4,15.2);fill("#2a1e14",q*14+13.4,g,0.6,16);}fill("#8a7050",0,g,132,0.8);for(let q=0;q<10;q++){fill("#1a1208",q*14+3,g+3,1,1);fill("#1a1208",q*14+9,g+11,1,1);}
    fill("#2a1e14",130,g-6,3,22);fill("#5a4430",130,g-6,1,22);fill("#2a1e14",90,g-5,3,5);}
  /* the power poles and the cable that leads to the tower */
  const poles=[200,320,440,560,680,780];poles.forEach((x,i)=>{if(x<camX-20||x>camX+212)return;fill("#1e140c",x-1,g-40,2.6,40);fill("#4a3624",x-1,g-40,0.8,40);fill("#2a1c10",x-9,g-37,18,2);fill("#4a3624",x-9,g-37,18,0.6);fill("#2a1c10",x-6,g-30,12,1.6);for(const dx of[-8,-1,7])fill("#d8d4c4",x+dx-0.4,g-39,1.2,1.4);fill("rgba(0,0,0,.28)",x-2,g+0.4,5,0.8);});
  ctx.strokeStyle="rgba(14,12,12,.85)";ctx.lineWidth=0.5;for(let i=0;i<poles.length;i++){const x0=poles[i],x1=i<poles.length-1?poles[i+1]:C7_TD-30;if(x1<camX-30||x0>camX+222)continue;for(const dy of[-36,-29]){ctx.beginPath();ctx.moveTo(x0-8,g+dy);ctx.quadraticCurveTo((x0+x1)/2,g+dy+8,x1-8,g+dy);ctx.stroke();}}
  /* the radio tower: hidden in the fog until you've been up the lookout */
  const dist=c3Clamp((camX-(C7_IW-420))/200,0,1),A=S.look?0.96:cut>200?Math.min(1,0.1+(cut-200)/50):Math.max(0.08,dist);
  if(camX>C7_IW-420||cut>0){const tw=c7TowerSpr(),tx=C7_TD+42;ctx.globalAlpha=A;ctx.drawImage(tw,tx-19,g-94,38,96);ctx.globalAlpha=1;
    const on=(tick%90)<45,pw=S.gen||C7.pow;ctx.globalAlpha=A;if(on){glow(tx,g-93,12,"255,40,30",0.8);fill("#ff4a3a",tx-1,g-94,2,2);}else fill("#7a1a14",tx-1,g-94,2,2);
    [[tx,g-88],[tx-5.4,g-73],[tx+4.4,g-73]].forEach(([lx,ly])=>{fill(pw?"#6aff8a":"#2a3a2e",lx-0.8,ly,1.8,1.8);pw&&glow(lx,ly+1,7,"90,255,140",0.5);});ctx.globalAlpha=1;}
  if(S.look&&!cut&&camX<=C7_IW-420){const a=0.6+0.4*Math.sin(tick/14);glow(camX+178,10,9,"255,60,40",0.5*a);fill("#ff5a4a",camX+177.4,9.4,1.4,1.4);}
  
  /* the base building: a squat concrete bunker, with the tower standing beside it */
  const bx=C7_TD-66,bw=88,H=40;fill("rgba(0,0,0,.32)",bx-2,g,bw+4,1.6);
  fill("#0e1014",bx-1,g-H-1,bw+2,H+2);for(let y=0;y<H;y++)for(let x=0;x<bw;x++){const n=It((x+bx)/5,y/3,3300),c=100+14*(n-0.5)+(x<2?10:0)-y*0.3;ctx.fillStyle="rgb("+(c|0)+","+((c+2)|0)+","+((c+4)|0)+")";ctx.fillRect(bx+x,g-H+y,1,1);}
  fill("#5a5e62",bx-2,g-H-2,bw+4,3);fill("#8a8e92",bx-2,g-H-2,bw+4,0.8);for(let k=0;k<26;k++)fill("rgba(40,60,46,.5)",bx+((k*37)%bw),g-H+((k*11)%(H-4)),1,3+(k%5));
  for(let w=0;w<2;w++){const wx=bx+6+w*26;fill("#0c1014",wx-1,g-32,23,14);fill("#7a98a4",wx,g-31,21,12);fill("#a8c0c8",wx,g-31,21,3);fill("#12181c",wx+10,g-31,0.8,12);fill("#12181c",wx,g-25.6,21,0.8);}
  const dx=C7_TD-8;fill("#0a0c0e",dx-1,g-27,18,28);fill("#3a4046",dx,g-26,16,26);fill("#5a636a",dx,g-26,16,1.4);fill("#ffd890",dx+13,g-24,3,24);glow(dx+14,g-14,24,"255,200,120",0.28);fill("#2a3036",dx+1,g-24,11,23);fill("#4a525a",dx+1,g-24,11,1);fill("#c8342a",dx+8,g-13,2,3);
  for(let y=0;y<4;y++)fill("#c8a424",dx-10+y*2,g-3+y*0.8,2,0.8);fill("#8a8e92",dx-4,g-1,24,1.4);fill("#6a6e72",dx-6,g+0.4,28,1);
  text("RIDGE TOWER",bx+8,g-38,"#2a3036",'3px "Press Start 2P",monospace');}
function c7IsleProps(){const S=c7S(),g=C2_FLOOR;
  /* the map board */
  {const x=C7_MAP;fill("rgba(0,0,0,.3)",x-14,g,28,1.4);fill("#2a1c10",x-12,g-26,2.4,26);fill("#2a1c10",x+10,g-26,2.4,26);fill("#4a3624",x-12,g-26,0.8,26);fill("#1a1208",x-14,g-30,30,3);fill("#5a4630",x-14,g-30,30,1);
    fill("#0a0c0e",x-11,g-26,24,18);fill("#c8bc98",x-10,g-25,22,16);for(let k=0;k<22;k++)fill(k%3?"#9aa888":"#7a9aa0",x-10+k,g-25+3+Math.sin(k/3)*2+((k*3)%4),1,2+((k*5)%5));fill("#7a9aa0",x-10,g-12,22,3);
    fill("#c8342a",x+6,g-18,2,2);fill("#e8c030",x-5,g-21,2,2);fill("#3a2a18",x-10,g-25,22,0.6);if(!S.map){const a=0.5+0.5*Math.sin(tick/9);a>0.6&&glow(x,g-17,12,"255,240,190",0.28*a);}}
  /* the broken sign */
  {const x=C7_SIGN;fill("rgba(0,0,0,.28)",x-6,g,16,1.2);fill("#2a1c10",x,g-24,2.4,24);fill("#4a3624",x,g-24,0.8,24);fill("#1a1208",x-10,g-26,22,8);fill("#7a6a4a",x-9,g-25,20,6);fill("#a8946a",x-9,g-25,20,1);fill("#3a2a18",x-7,g-23,12,0.8);fill("#3a2a18",x-7,g-21,9,0.8);fill("#c8342a",x+8,g-23,3,2);
    fill("#1a1208",x-4,g-17,10,5);fill("#6a5a3a",x-3,g-16,8,3);}
  /* the lookout rock, with a little cairn and a flag */
  {const x=C7_LOOK;Ft(x,g+1,22,0.45);const rk=(dx,dy,w,h,c)=>fill(c,x+dx,g-dy-h,w,h);rk(-18,0,36,10,"#3e4144");rk(-14,10,28,9,"#4a4e52");rk(-9,19,19,6,"#565a5e");rk(-18,0,36,1.4,"#6e7276");rk(-14,10,28,1.4,"#7e8286");rk(-9,19,19,1.2,"#8e9296");
    for(let k=0;k<40;k++)fill(k%3?"#2c2e30":"#6a6e72",x-17+((k*13)%34),g-((k*7)%24)-2,1+(k%3),1);fill("#3a6a30",x-14,g-11,8,1.2);fill("#4a8a3a",x-14,g-11.6,5,0.8);
    fill("#2a1c10",x+4,g-34,1.2,10);fill("#c8342a",x+5,g-34,6,3.6);fill("#e8584a",x+5,g-34,6,1);for(let q=0;q<3;q++)fill("#6a6e72",x-2+q*2,g-25-q*1.2,3,1.2);
    if(!S.look){const a=0.5+0.5*Math.sin(tick/9);a>0.5&&glow(x,g-22,16,"255,240,190",0.26*a);}}}
/* ---------------- the tower control room ---------------- */
function c7LampSet(){const S=c7S(),pw=S.gen||C7.pow;return{pw,fl:C7.fl>0&&(C7.fl>>2)%2};}
function c7CtlBack(){const S=c7S(),g=C2_FLOOR,L=c7LampSet(),on=L.pw||L.fl;
  /* ceiling lamps */
  [48,150,250].forEach((lx,q)=>{if(lx<camX-30||lx>camX+222)return;fill("#0a0c10",lx-0.5,12,1,10);fill("#2a343c",lx-7,22,14,4);fill("#d8e4ea",lx-6,25,12,2);glow(lx,27,46,"200,225,240",0.3+(tick%140<3&&q===1?-0.1:0));});
  /* the floor hatch down to the generator room */
  {const x=40;fill("#04060a",x-12,g+0.5,24,13);fill("#14181c",x-12,g+0.5,24,1);for(let q=0;q<4;q++){fill("#7a828a",x-8,g+3+q*3,1.2,2);fill("#7a828a",x+7,g+3+q*3,1.2,2);fill("#9aa2aa",x-8,g+3+q*3,16,0.8);}
    ctx.fillStyle="#3a4248";ctx.beginPath();ctx.moveTo(x+12,g);ctx.lineTo(x+22,g-12);ctx.lineTo(x+25,g-11);ctx.lineTo(x+15,g+0.6);ctx.fill();ctx.fillStyle="#6a747c";ctx.beginPath();ctx.moveTo(x+12,g);ctx.lineTo(x+22,g-12);ctx.lineTo(x+23,g-11.4);ctx.lineTo(x+13,g);ctx.fill();}
  /* the antenna panel on the wall */
  {const x=118;fill("#06080a",x-17,g-62,34,40);fill("#4a545c",x-16,g-61,32,38);fill("#8a96a0",x-16,g-61,32,1.4);fill("#2a323a",x-14,g-58,28,5);text("ANTENNAS",x-13,g-57,"#c8d4dc",'3px "Press Start 2P",monospace');
    for(let q=0;q<3;q++){const lx=x-9+q*9,ly=g-45;fill("#06080a",lx-3.4,ly-3.4,6.8,6.8);fill(L.pw?"#4aff7a":(L.fl&&q===0?"#ffb02a":"#4a1410"),lx-2.6,ly-2.6,5.2,5.2);fill("rgba(255,255,255,.45)",lx-2,ly-2,2,1);L.pw&&glow(lx,ly,9,"90,255,140",0.5);text(String(q+1),lx-0.8,ly+4.4,"#c8d4dc",'3px "Press Start 2P",monospace');}
    fill("#06080a",x-12,g-37,24,10);fill("#d8d4c4",x-11,g-36,22,8);ctx.strokeStyle="#101010";ctx.lineWidth=0.6;ctx.beginPath();ctx.moveTo(x,g-29);const a=L.pw?-0.6:-1.9;ctx.lineTo(x+Math.cos(a)*8,g-29+Math.sin(a)*7);ctx.stroke();text(L.pw?"12 V":"0 V",x-7,g-31,L.pw?"#2a8a3a":"#8a2a1a",'3px "Press Start 2P",monospace');
    fill("#1a1c1e",x+14,g-66,2.4,44);fill("#3a4248",x+14,g-66,0.8,44);}
  /* the transmitter rack, the console and the microphone */
  {const x=232;fill("#06080a",x-18,g-80,40,66);fill("#2c343c",x-17,g-79,38,64);fill("#6a7680",x-17,g-79,38,1.4);
    for(let q=0;q<3;q++){const y=g-76+q*19;fill("#12161a",x-15,y,34,16);fill("#222a32",x-15,y,34,1);for(let k=0;k<3;k++){fill("#06080a",x-12+k*11,y+3,9,9);fill(on?"#ffd070":"#3a2e18",x-11+k*11,y+4,7,7);on&&glow(x-7.5+k*11,y+7.5,9,"255,200,110",0.32);}fill(on?"#4aff7a":"#1a3a22",x+14,y+2,2.6,2.6);fill("#8a96a0",x-15,y+14,34,0.8);}
    const hx=x-17;fill("#1a1c1e",x+4,g-84,1.6,6);fill("#c8342a",x-9,g-85,12,5);text("ON AIR",x-8,g-84,C7.pow||C7.wave?"#ffe9d8":"#7a2a22",'3px "Press Start 2P",monospace');C7.pow&&glow(x-3,g-82,16,"255,60,40",0.55);}
  {const x=195;fill("rgba(0,0,0,.35)",x-26,g+0.4,56,1.4);fill("#06080a",x-26,g-24,56,25);fill("#3a444c",x-25,g-23,54,24);fill("#6a7680",x-25,g-23,54,1.4);fill("#1a2026",x-24,g-21,52,3);
    fill("#06080a",x-22,g-18,20,12);fill(on?"#0a2a1a":"#06100a",x-21,g-17,18,10);for(let q=0;q<4;q++)fill(on?"#4aff9a":"#1a3a28",x-20,g-16+q*2.4,6+((q*5+(tick>>4))%9),0.8);
    for(let q=0;q<5;q++){fill("#06080a",x+2+q*5,g-17,4,4);fill(q%2?"#c8342a":"#d8b02a",x+2.6+q*5,g-16.4,2.8,2.8);}for(let q=0;q<4;q++){fill("#1a1c1e",x+3+q*6,g-10,2,5);fill("#9aa4ac",x+3+q*6,g-10+(on&&q===1?0:3),2,1.6);}
    fill("#1a1c1e",x+19,g-30,1.4,9);fill("#2a2c30",x+17,g-33,5,4);fill("#6a747c",x+17,g-33,5,0.8);}
  /* a door to the outside, a table and the cable coming down the wall */
  {const x=262;fill("#06080a",x-9,g-37,18,38);fill("#3a4248",x-8,g-36,16,36);fill("#6a747c",x-8,g-36,16,1.4);fill("#8ac0d0",x-5,g-32,10,9);fill("#c8e0e8",x-5,g-32,10,2);fill("#12161a",x-0.4,g-32,0.8,9);fill("#c8a424",x+4,g-14,2,3);}
  fill("#1a1c1e",148,g-66,1.6,66);
  if(L.pw){for(let q=0;q<4;q++){const y=g-((tick*0.6+q*16)%64);fill("#8aff9a",148,y,1.6,2);}}}
/* ---------------- the tower generator room ---------------- */
function c7GenBack(){const S=c7S(),g=C2_FLOOR,M=S.mat,hot=S.gs<=1&&!S.gen,run=S.gen||S.gs>=7,vib=run?Math.sin(tick*1.6)*0.25:hot?Math.sin(tick*2.4)*0.6:0;
  [70,200,330].forEach((lx,q)=>{if(lx<camX-30||lx>camX+222)return;const fl=hot&&tick%47<3?0.4:1;fill("#06080a",lx-0.5,0,1,12);fill("#2a3038",lx-5,12,10,4);fill("#ffd890",lx-4,15,8,2.4);glow(lx,20,50,"255,200,120",0.36*fl);});
  /* the ladder up to the control room */
  {const x=30;fill("#8a96a0",x-5,g-74,1.6,74);fill("#8a96a0",x+3,g-74,1.6,74);fill("#4a545c",x-5,g-74,0.6,74);for(let y=g-70;y<g;y+=6)fill("#a8b4bc",x-5,y,10,1.4);fill("#06080a",x-11,0,22,5);fill("#d8e4ea",x-9,0,18,2);glow(x,3,30,"200,225,240",0.28);}
  /* cloth on a shelf, gravel, sand */
  {const x=70;fill("#06080a",x-16,g-28,32,2);fill("#3a2c20",x-16,g-30,32,3);fill("#5a4430",x-16,g-30,32,0.8);fill("#2a1e14",x-14,g-28,2,28);fill("#2a1e14",x+12,g-28,2,28);
    if(!M.cloth){for(let q=0;q<3;q++){fill("#06080a",x-12,g-37+q*3.4,24,3.6);fill(q%2?"#c8c0b0":"#e0d8c8",x-11,g-36.6+q*3.4,22,2.8);fill("#9a9282",x-11,g-34.6+q*3.4,22,0.6);}}else fill("#c8c0b0",x-6,g-32,8,1.6);}
  {const x=108,s=M.gravel?0.5:1;Ft(x,g+1,18,0.4);for(let k=0;k<180*s;k++){const a=r(k,2201),b=r(k,2202),yy=g-(1-a)*14*s,hw=(a)*16*s;fill(k%3?"#7a7a74":k%3===1?"#9a9a92":"#5a5a54",x-hw+b*hw*2,yy,1.6+(k%3),1.4+(k%2));}fill("#4a3624",x+14,g-16,1.2,16);fill("#6a747c",x+11,g-19,6,3);}
  {const x=148,s=M.sand?0.5:1;Ft(x,g+1,16,0.4);fill("#06080a",x-10,g-22*s-1,20,22*s+1);fill("#5a4a30",x-9,g-22*s,18,22*s);fill("#8a7648",x-9,g-22*s,18,2);fill("#c8b078",x-8,g-22*s+1,16,1.4);fill("#2a2010",x-9,g-12*s,18,1);for(let k=0;k<60;k++)fill(r(k,2203)<0.5?"#e0c888":"#a8884c",x-14+r(k,2204)*28,g-r(k,2205)*5*s,1.4,1);}
  /* the generator: engine, exhaust, gauge, and the radiator and tank behind it */
  ctx.save();ctx.translate(0,vib);{const x=190,w=80;
    fill("#06080a",x-2,g-56,w+4,56);fill(hot?"#a8402a":"#8a4a2a",x,g-54,w,50);fill("#c8663a",x,g-54,w,3);fill("#5a2a14",x,g-8,w,5);for(let k=0;k<4;k++){fill("#2a1a10",x+6+k*18,g-48,14,26);fill("#b88a58",x+7+k*18,g-47,12,2);fill("#3a2418",x+10+k*18,g-52,6,5);}
    for(let k=0;k<24;k++)fill(r(k,2211)<0.5?"#d8783a":"#4a2010",x+2+r(k,2212)*(w-4),g-52+r(k,2213)*46,1+r(k,2214)*3,1);
    fill("#1a1a1c",x+w-14,g-72,8,20);fill("#52483e",x+w-13,g-72,6,20);fill("#7a7064",x+w-13,g-72,1.4,20);
    fill("#06080a",x+4,g-22,24,14);fill("#d8d4c4",x+5,g-21,22,12);const ta=hot?-0.55:S.gs>=2&&!run?-1.9:-1.05;ctx.strokeStyle="#101010";ctx.lineWidth=0.7;ctx.beginPath();ctx.moveTo(x+16,g-9);ctx.lineTo(x+16+Math.cos(ta)*8,g-9+Math.sin(ta)*8);ctx.stroke();fill(hot?"#d83a2a":"#3a8a3a",x+6,g-20,4,1.6);
    if(hot){glow(x+w/2,g-30,46,"255,80,40",0.26+0.1*Math.sin(tick/8));if((tick>>3)%2){fill("#ff2a1a",x+w-24,g-60,5,5);glow(x+w-21.5,g-57.5,14,"255,40,30",0.6);}}
    else if(run){fill("#4aff7a",x+w-24,g-60,5,5);glow(x+w-21.5,g-57.5,12,"90,255,140",0.5);}}
  {const x=282;fill("#06080a",x-2,g-60,40,60);fill("#3a3e44",x,g-58,36,56);for(let k=0;k<9;k++){fill(S.flush||S.gs>=4?"#9aa8b4":"#5a3a1a",x+2+k*4,g-54,2,48);fill(S.flush||S.gs>=4?"#4a5864":"#2a1a0a",x+3.6+k*4,g-54,1,48);}
    fill("#52606c",x+2,g-72,26,14);fill("#8a98a4",x+2,g-72,26,1.6);fill("#06080a",x+20,g-70,5,11);const lv=(S.fill?1:S.gs>=5?0.9:0.12)*9;fill(S.fill||S.gs>=5?"#7ac8e8":"#6a4a22",x+20.6,g-59-lv,3.8,lv);
    fill("#1a1a1c",x-12,g-40,12,4);fill("#1a1a1c",x-12,g-14,12,4);const fa=tick*(run?0.35:0)%6.283;ctx.strokeStyle="rgba(20,22,26,.8)";ctx.lineWidth=2.4;for(let a=0;a<3;a++){ctx.beginPath();ctx.moveTo(x+18,g-30);ctx.lineTo(x+18+Math.cos(fa+a*2.094)*14,g-30+Math.sin(fa+a*2.094)*14);ctx.stroke();}}
  ctx.restore();
  /* the burnt-out stove with charcoal */
  {const x=360,s=M.coal?0.4:1;Ft(x,g+1,16,0.4);fill("#06080a",x-11,g-26,22,26);fill("#2a2a30",x-10,g-25,20,25);fill("#52525a",x-10,g-25,20,1.4);fill("#06080a",x-6,g-17,12,11);fill("#0e0c0a",x-5,g-16,10,9);fill("#1a1a1e",x-14,g-24,4,2);fill("#52525a",x+2,g-33,6,8);
    for(let k=0;k<90*s;k++){const a=r(k,2221),b=r(k,2222);fill(k%3?"#1a1a1e":k%3===1?"#2e2e34":"#46464e",x-10+a*20,g-1-b*7*s,2.2,1.6);}fill("#0a0a0e",x-8,g-10,2,5);}
  /* the cable that carries the power up to the antennas */
  fill("#06080a",150,g-84,3,40);fill("#2a343c",150.6,g-84,1.8,40);if(run)for(let q=0;q<4;q++)fill("#8aff9a",150.8,g-44-((tick*0.7+q*10)%40),1.2,2);
  /* a drip and a puddle */
  {const x=320;const p=(tick*0.5)%40;fill("#9ab8c8",x,g-28+p*0.7,0.8,1.4);Ft(x,g+4,6,0.3);}}
