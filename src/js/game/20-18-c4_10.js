
/* ======================= PART 4 BACKDROPS: painted with the game's own per-pixel painter, like chapter 1 and 2 ======================= */
C4.tiles={};
function c4Tile(id,i,seed){const k=id+i;return C4.tiles[k]||(C4.tiles[k]=Ae((t)=>{
  Ye(t,0,184,{hs:id==="cbridge"?1.05:0.9,seed,grassH:id==="rroad"?10:20,sun:60+70*i,bh:id==="river"||id==="port"?0.55:id==="rroad"?0.75:0.9,puddles:[],cars:[]});c2Apoc(t,i);
  if(id==="port"){c4PaintWide(t,i);c4PaintQuay(t,i);}
  else if(id==="rroad"){c4PaintRiverBand(t,i);c2Ground(t,i);c2Broken(t,i,"street");}
  else{t.fog(0,150,384,216,"#d8f0c0",0.25,seed,34,8,0.2);c4PaintEarth(t,i,id==="cbridge");}}));}
/* dirt riverbank / gravel bed, in the same speckled style as the game's ground */
function c4PaintEarth(t,i,bed){const R=(k,a)=>r(k,a+i*17);
  t.grad(184,216,bed?["#5e584c","#4a443a","#36322a"]:["#4e5a2c","#40381f","#2c2216"]);
  for(let k=0;k<260;k++)t.rect(384*R(k,400),186+30*R(k,401),1+(R(k,402)*2|0),1,bed?(R(k,403)<0.5?"#7a7466":"#3a362e"):(R(k,403)<0.5?"#5a4a30":"#2a2014"));
  for(let k=0;k<22;k++){const x=384*R(k,404),y=188+26*R(k,405);t.rect(x,y,3+R(k,406)*4,2,"#6a665e");t.rect(x,y,3,1,"#8a867c");}
  if(!bed)for(let k=0;k<60;k++){const x=384*R(k,407),h=2+R(k,408)*6;for(let y=0;y<h;y++)t.rect(x+(y>h/2?1:0),184-y,1,1,[[70,150,60],[40,110,50],[98,178,72]][k%3]);R(k,409)<0.2&&t.rect(x,184-h-1,1,1,R(k,410)<0.5?"#ff86d0":"#ffd070");}
  else for(let k=0;k<5;k++){const cx=384*R(k,411),cy=196+14*R(k,412),w=20+20*R(k,413);for(let y=-2;y<=2;y++)t.rect(cx-w/2+Math.abs(y)*3,cy+y,w-Math.abs(y)*6,1,y<0?"#56707a":"#3e5662");t.rect(cx-w/4,cy-1,w/3,1,"#a8c0c4",0.6);}
  for(let k=0;k<8;k++){const x=384*R(k,414),y=190+22*R(k,415),q=k%3;q===0?(t.rect(x,y,3,2,"#8a4a2a"),t.rect(x,y,3,1,"#b86a3a")):q===1?(t.rect(x,y,6,3,"#1a1a1a"),t.rect(x+1,y+1,4,1,"#3a3a3a")):t.rect(x,y,1,1,"#c8e0e8");}}
/* the river beyond the guard rail on the river road */
function c4PaintRiverBand(t,i){const R=(k,a)=>r(k,a+i*19);t.rect(0,158,384,3,"#4a5a2c");t.grad(161,177,["#7a9aa0","#4e7480","#36586a"]);
  for(let k=0;k<70;k++)t.rect(384*R(k,420),162+14*R(k,421),2+R(k,422)*6,1,"#c8dcd8",0.55);for(let x=0;x<384;x+=2)t.rect(x,177,2,2+(R(x,423)*3|0),R(x,424)<0.5?"#4a5a2c":"#3a4a24");}
/* the dam, far up the valley: painted once into the river room's backdrop */
function c4PaintValley(t){const cx=192,crest=96,bot=124;
  /* valley shoulders, dithered between two greens and dotted with dead trees */
  const hillL=[[0,180],[14,140],[34,104],[60,88],[120,96],[170,104],[184,122],[150,150],[60,176],[0,184]],hillR=hillL.map((p)=>[384-p[0],p[1]]);
  const VP=[[46,62,40],[60,80,48],[76,98,56],[96,118,66],[124,142,80]],VT=[[30,46,30],[42,64,36],[58,86,44],[82,112,56],[112,140,70]];
  const hf=(sd,dk)=>(x,y)=>{const k=(y-84)/100,n=It(x/14,y/10,sd),m=It(x/3,y/3,sd+4);return c6Ramp(VP,0.75-0.55*k+0.45*(n-0.5)+0.2*(m-0.5)-dk,x,y);};
  t.poly(hillL,hf(441,0));t.poly(hillR,hf(442,0.08));
  /* rock outcrops and paths of bare earth */
  for(let k=0;k<14;k++){const s=k%2,x=s?384-160*r(k,445):160*r(k,445),y=100+r(k,446)*70,w=4+r(k,447)*7;if(Math.abs(x-cx)<70)continue;for(let q=0;q<w;q++)for(let p=0;p<3;p++)t.px(x+q-p,y-p,c6Ramp([[90,86,74],[120,114,98],[150,144,124]],0.9-p*0.3-q/w*0.5,x+q|0,y));}
  /* woods on the slopes: shaded clumps, thicker toward the river, with a few dead snags */
  for(let k=0;k<90;k++){const s=k%2,x=s?384-150*r(k,430):150*r(k,430),yb=92+r(k,431)*82,sc=0.6+(yb-92)/82*0.9;if(Math.abs(x-cx)<58)continue;
    if(r(k,433)<0.16){for(let y=0;y<6*sc;y++)t.px(x,yb-y,[58,52,46]);t.px(x-1,yb-4*sc,[58,52,46]);t.px(x+1,yb-5*sc,[58,52,46]);continue;}
    for(let y=0;y<3*sc;y++)t.px(x,yb-y,[46,34,24]);c6Ball(t,x,yb-3*sc-2.5*sc,3+2.6*sc,VT,450+k);}
  /* the reservoir behind it */
  t.rect(cx-70,crest-5,140,4,"#7a92a0");t.rect(cx-70,crest-5,140,1,"#b8ccd0");
  /* the arch wall: lit from the left, stained, lifted in pours */
  for(let x=cx-46;x<=cx+46;x++){const u=(x-(cx-46))/92,bow=Math.sin(u*Math.PI),top=Math.round(crest-bow*1.5),b2=Math.round(bot+bow*5),base=170-u*50;
    for(let y=top;y<b2;y++){const v=(y-top)/(b2-top),c=base-v*18+(Et(x,y)<0.5?6:0);t.px(x,y,[c,c-2,c-10]);}
    if(x%5===0)for(let y=top+2;y<top+2+(b2-top)*(0.3+0.6*r(x,435));y++)t.px(x,y,[96,88,74]);/* water stains */}
  for(let y=crest+6;y<bot;y+=7)for(let x=cx-44;x<cx+44;x++)Et(x,y)<0.6&&t.px(x,y+Math.round(Math.sin((x-cx)/90*Math.PI)*0),[118,112,98]);/* pour lines */
  t.rect(cx-47,crest-2,94,2,"#c8c2b0");for(let x=cx-45;x<cx+45;x+=4)t.rect(x,crest-4,1,2,"#5a5650");/* crest + railing */
  [cx-26,cx+20].forEach((gx)=>{t.rect(gx,crest-14,8,12,"#a8a294");t.rect(gx+6,crest-14,2,12,"#76706a");t.rect(gx+2,crest-11,3,3,"#3a3a38");t.rect(gx-1,crest-15,10,2,"#6a665e");});
  /* bites taken out of the base by something big */
  [[cx+8,5,4],[cx+18,4,3],[cx-6,4,3],[cx+28,3,2]].forEach(([x,w,h])=>{for(let y=0;y<h;y++){const hw=Math.round(w*Math.sqrt(1-(y/h)*(y/h)));t.rect(x-hw,bot+4-y,hw*2,1,"#2a261e");}t.rect(x-w,bot+5,w*2,1,"#6a645a");});
  /* the river below: winding toward us, widening; far = pale haze, near = dark */
  const L=(v)=>cx-9-(cx-9-0)*v*v+Math.sin(v*3.3)*10*(1-v),Rr=(v)=>cx+9+(384-cx-9)*v*v+Math.sin(v*3.3)*10*(1-v),y0=bot+5;
  for(let y=y0;y<=184;y++){const v=(y-y0)/(184-y0),a=L(v)|0,b=Rr(v)|0,c1=[143-v*70,166-v*64,174-v*56];
    for(let x=a;x<=b;x++)t.px(x,y,Et(x,y)<0.2?[c1[0]+30,c1[1]+30,c1[2]+24]:c1);
    t.rect(a-2,y,2,1,v<0.5?"#5a6046":"#4a4a36");t.rect(b+1,y,2,1,v<0.5?"#5a6046":"#4a4a36");
    if(v>0.4&&(y%3===0)){t.rect(a-3-(r(y,436)*4|0),y,2,1,"#6a6a5a");t.rect(b+2+(r(y,437)*4|0),y,2,1,"#6a6a5a");}}
  for(let k=0;k<30;k++){const v=r(k,438),y=(y0+(184-y0)*v)|0,a=L(v),b=Rr(v);t.rect(a+(b-a)*r(k,439),y,1+v*6,1,"#d8ecec",0.6);}
  for(let k=0;k<16;k++){const s=k%2,v=0.55+0.45*r(k,440),y=(y0+(184-y0)*v)|0,x=s?Rr(v)+3:L(v)-4;for(let h=0;h<4+v*5;h++)t.rect(x+(h%2),y-h,1,1,[[70,130,60],[50,100,50]][h%2]);}}
/* the broken bridge's ravine: far cliff, stone embankment, standing pier */
function c4PaintRavine(t,ox){/* t covers world x ox..ox+192 */const X=(wx)=>(wx-ox)*2;
  const cl=[[X(0),100],[X(60),100],[X(84),184],[X(0),184]];t.poly(cl,(x,y)=>Et(x,y)<0.5?[98,94,84]:[84,80,70]);for(let y=104;y<184;y+=6)t.rect(X(0),y,X(70)-X(0)-(y-100)*0.2,1,"#5a564c");
  t.rect(X(0),96,X(62)-X(0),8,"#3e3e3a");t.rect(X(0),96,X(62)-X(0),2,"#6a6c6a");}
function c4PaintEmbank(t,ox){const X=(wx)=>(wx-ox)*2;if(X(1000)<0||X(760)>384)return;
  for(let y=100;y<184;y++)for(let x=Math.max(0,X(760));x<Math.min(384,X(1000));x++){const row=(y-100)/12|0,off=row%2?12:0,bx=(x+off)%24,by=(y-100)%12;
    const edge=bx===0||by===0,c=edge?[78,72,62]:[110-(by)*1.2+(Et(x,y)<0.3?6:0),104-by,92-by];t.px(x,y,c);}
  for(let k=0;k<40;k++){const x=X(760)+r(k+ox,441)*(X(1000)-X(760)),y=100+r(k+ox,442)*80;x>=0&&x<384&&t.rect(x,y,3,2,[[70,110,50],[60,90,44]][k%2]);}
  for(let k=0;k<14;k++){const x=X(764)+k*34,len=10+((k*7)%20);if(x<0||x>=384)continue;for(let y=0;y<len;y++)t.px(x+(y%3?0:1),100+y,y%3?[62,90,42]:[78,106,48]);}
  [[X(790),124,[200,58,90]],[X(880),132,[58,138,216]],[X(940),122,[224,192,64]]].forEach(([gx,gy,gc])=>{if(gx<0||gx>370)return;for(let s=0;s<10;s++)t.px(gx+s,gy+(s%4<2?0:3),gc);});}
function c4PaintPier(t,ox,wx){const X=(v)=>(v-ox)*2;const x=X(wx);if(x<-14||x>396)return;for(let y=110;y<184;y++)for(let q=-12;q<12;q++){const c=q<-8?[140,142,136]:q>8?[78,80,76]:[106+(Et(x+q,y)<0.3?8:0),108,102];t.px(x+q,y,c);}
  t.rect(x-12,164,24,20,[60,90,80],0.45);for(let q=0;q<4;q++)t.rect(x-8+q*6,112,1,16+q*6,[120,60,24],0.5);}
var C4_BD={};
function c4Backdrop(id){if(C2[id]&&C2[id].c5)return c5Backdrop(id);const d=C2[id],cv=document.createElement("canvas");cv.width=2*d.W;cv.height=216;const g=cv.getContext("2d");g.imageSmoothingEnabled=!1;
  const tiles=d.seeds.map((seed,i)=>c4Tile(id,i,seed)),OV=48,mask=document.createElement("canvas");mask.width=384;mask.height=216;
  for(let i=0;i*(384-OV)<2*d.W;i++){const m=mask.getContext("2d");m.globalCompositeOperation="source-over";m.clearRect(0,0,384,216);m.drawImage(tiles[i%tiles.length],0,0);
    if(i){const gr=m.createLinearGradient(0,0,384,0);gr.addColorStop(0,"rgba(0,0,0,0)");gr.addColorStop(OV/384,"rgba(0,0,0,1)");gr.addColorStop(1,"rgba(0,0,0,1)");m.globalCompositeOperation="destination-in";m.fillStyle=gr;m.fillRect(0,0,384,216);}
    g.drawImage(mask,i*(384-OV),0);}
  if(id==="port")g.drawImage(C4.tiles.tower||(C4.tiles.tower=Ae(c4PaintTower)),0,0);
  if(id==="river")g.drawImage(C4.tiles.valley||(C4.tiles.valley=Ae(c4PaintValley)),2*254,0);
  if(id==="cbridge")for(let ox=0;ox<C4_BW;ox+=192){g.drawImage(Ae((t)=>{c4PaintRavine(t,ox);c4PaintEmbank(t,ox);c4PaintPier(t,ox,640);}),2*ox,0);}
  return cv;}
/* build the backdrops a piece at a time before they're needed, so entering never stalls */
function c4Warm(id){if(backdrops[id]||C4_BD[id])return;C4_BD[id]=1;const d=C2[id],jobs=d.seeds.map((seed,i)=>()=>c4Tile(id,i,seed));
  id==="river"&&jobs.push(()=>{C4.tiles.valley||(C4.tiles.valley=Ae(c4PaintValley));});jobs.push(()=>{backdrops[id]||backdrop(id);});
  let n=0;const step=()=>{if(!GM.on){C4_BD[id]=0;return;}if(n>=jobs.length)return;if(modal||C3.cut&&C3.cut.k==="c4arr"){setTimeout(step,250);return;}try{jobs[n++]();}catch(e){}setTimeout(step,200);};setTimeout(step,400);}
/* dynamic water on top of the painted valley: leaks, cracks and, at the end, the break */
function c4DamFX(){if(room!=="river")return;const k=c4DamK(),br=C4.dbreak,cx=350,crest=48,bot=62;if(cx<camX-80||cx>camX+272)return;
  const nc=Math.round(2+k*7);for(let q=0;q<nc;q++){let x=cx-21+((r(q,1626)*42)|0),y=crest+1;for(let s=0;s<14;s++){fill("#3a342c",x,y,0.5,0.5);y+=0.5+(s%3===0?0.5:0);x+=r(q*9+s,1627)<0.3?0.5:r(q*9+s,1627)>0.7?-0.5:0;}
    if(q<nc*k&&!br){const jy=crest+3+((r(q,1628)*7)|0)*0.5,on=(tick+q*7)%40<34;if(on)for(let s=0;s<5;s++){const fy=jy+s*1+((tick*0.5+s)%1);fill(s%2?"#d8ecf4":"#ffffff",x+(q%2?s*0.5:-s*0.5),fy,0.5,1);}}}
  if(br<=0)return;
  /* the breach: a jagged dark gap widening in the middle of the wall */
  const hw=Math.round((3+br*20)*2)/2;for(let y=crest-1;y<bot+4;y+=0.5){const j=(r((y*2)|0,1631)-0.5)*2;fill("#26221c",cx-hw-1+j,y,1,0.5);fill("#26221c",cx+hw+j,y,1,0.5);}
  /* cascade: columns of falling water, each its own speed, white at the lip */
  for(let x=cx-hw;x<cx+hw;x+=0.5){const sp=1.6+r((x*2)|0,1632)*1.4;for(let s=0;s<5;s++){const y=crest-1+((tick*sp+s*9+r((x*2)|0,1633)*30)%36);if(y>bot+8)continue;fill(s%2?"#b8d8e8":(y<crest+3?"#ffffff":"#e4f2f8"),x,y,0.5,2+(s%3));}}
  fill("#f0f8fc",cx-hw,crest-1.5,hw*2,1);
  /* boiling foam at the foot, spray, and white water racing down the river */
  for(let q=0;q<40;q++){const a=((tick*0.03+q/40)%1),x=cx+(r(q,1634)-0.5)*hw*(2+a*4),y=bot+4-a*6;fill(q%3?"#ffffff":"#cfe6f0",x,y,1+a*2,1);}
  for(let q=0;q<10;q++){const a=((tick*0.012+q/10)%1);glow(cx+(q-5)*3,crest-2-a*16,4+a*8,"240,248,252",0.18*(1-a));}
  for(let q=0;q<40;q++){const v=((tick*0.008*(1+br)+q/40)%1),y=bot+6+v*(C2_FLOOR-bot-6),half=4+v*v*96,x=cx+(r(q,1635)-0.5)*2*half;fill(q%2?"#ffffff":"#d4eaf2",x,y,1+v*4,0.5+v);}}
