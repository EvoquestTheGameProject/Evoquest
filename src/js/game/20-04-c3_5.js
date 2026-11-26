
/* ======================= THE DREAM: a beach at noon, in 10 cinematic scenes (2 minutes) ======================= */
var C3D=null,C3_DLEN=7200,C3_BW=1152,C3_SC=[0,720,1440,2160,2880,3600,4320,5040,5760,6480,7200],C3_POV0=6330,C3_BURST=6442,C3_CUTB=6476,C3_BARH=24;
var C3_DL=[[60,"YOU","…mm?"],[250,"YOU","Where… am I? Everything's so blurry…"],[470,"YOU","The sea? Kids splashing in the waves… people everywhere."],
  [790,"YOU","A beach. The sun is so warm… I feel so light."],[1090,"YOU","Is that a beach bar? I'm SO thirsty."],
  [1460,"YOU","Hi! Could I get something tropical, please?"],[1640,"BARISTA","One Coconut Sunrise, coming right up!"],[1890,"BARISTA","Here you go. Enjoy the sunshine!"],[2030,"YOU","Mmm… it's perfect. Thank you!"],
  [2190,"YOU","Ooh, volleyball…"],[2570,"YOU","Hey! Mind if I join you?"],[2720,"KAI","Sure! We're one short. You're with me!"],
  [2900,"KAI","Your serve!"],[3150,"MIA","Nice hit!"],[3330,"YOU","POINT!"],[3460,"KAI","Ha! Great game!"],
  [3620,"YOU","That was fun! Hey… who wants to build a sandcastle?"],[3830,"KIDS","ME! ME! Make it HUGE!"],[3990,"MIA","Count us in!"],
  [4340,"YOU","Walls first… then the towers."],[4640,"KIDS","Put a flag on the top!"],[4900,"YOU","Perfect. The biggest castle on the beach!"],
  [5060,"KAI","Last one in the water is a rotten egg!"],[5250,"YOU","Here I come!"],[5480,"YOU","The water is perfect…"],
  [5790,"YOU","Huh? The water's getting cold…"],[5915,"MIA","What's that… fin?"],[5975,"KAI","SHARK!!!"],[6060,"YOU","Everyone, get out of the water!"],[6125,"KIDS","WAAAH! RUN! RUN!"],[6195,"YOU","Kids, swim to shore! Go go go!"],
  [6295,"YOU","Kai…? Mia…? …Anyone?"],
  [6570,"YOU","*GASP*!"],[6730,"YOU","Trees… the forest. I'm still in the forest."],[6940,"YOU","It was just a dream. Just a dream…"]];
var C3_WHO={YOU:"#3a6ad8",BARISTA:"#e8a03a",KAI:"#3aa84a",MIA:"#e84a8a",KIDS:"#9a4ad8"},C3_WHOT={YOU:"#8fb8ff",BARISTA:"#ffc060",KAI:"#6aff8a",MIA:"#ff8ac0",KIDS:"#d09aff"};
/* outfits: [base, flower, leaf] for the shirt and the shorts */
var C3_TROP={m:{t:["#1aa0b8","#ff5a6a","#2a8a3a"],b:["#ff9a2a","#fff0a0",null]},f:{t:["#ff7a8a","#ffffff","#3aa84a"],b:["#2ac8c8","#ffffff",null]}};
function c3Look(i,gd,o){const M=[0,1,2,3,4,5,9],F=[6,7,8,10,11,12];return Object.assign({gd,hs:gd?F[i%F.length]:M[i%M.length],hc:(i*3)%6,sk:(i*5+2)%8,fc:0,ey:0,gl:0,bs:0,bc:(i*3)%6,mo:0,cl:3,oc:0,tc:(i*5)%14},o||{});}
function c3Hex(h){return[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];}
/* paint the character in the game's own sprite style, then re-dress it: tropical shirt, shorts, bare legs, sandals */
function c3Spr(look,pose,pal,sc){const key="S|"+JSON.stringify(look)+"|"+pose.k+"|"+pal.id+"|"+sc;C3.spr=C3.spr||{};if(C3.spr[key])return C3.spr[key];
  if(Object.keys(C3.spr).length>1500)C3.spr={};
  const c=c3Cv(72,80),g=c.getContext("2d"),keep=ctx;g.imageSmoothingEnabled=!1;g.setTransform(2,0,0,2,0,0);ctx=g;try{Ma(18,38,look,0,1,{s:sc/2,noshd:1,main:"#00ff00",pose,closed:pal.closed});}finally{ctx=keep;g.setTransform(1,0,0,1,0,0);}
  /* the game's canvas runs at 2 pixels per unit: painting at that density keeps every half-unit edge crisp instead of blurred */
  const im=g.getImageData(0,0,72,80),d=im.data,isG=(i)=>d[i+3]>0&&d[i+1]-Math.max(d[i],d[i+2])>48;
  let gTop=99,gBot=0,yMax=0;for(let y=0;y<80;y++)for(let x=0;x<72;x++){const i=4*(y*72+x);if(!d[i+3])continue;yMax=Math.max(yMax,y);if(isG(i)){gTop=Math.min(gTop,y);gBot=Math.max(gBot,y);}}
  const skin=c3Hex((q.sk[look.sk]||q.sk[2])[1]),T=pal.t.map((h)=>h&&c3Hex(h)),B=pal.b.map((h)=>h&&c3Hex(h)),sand=c3Hex("#b8864a"),feet=yMax-Math.max(1,Math.round(sc*0.9)),legLen=Math.max(1,feet-gBot),shortsEnd=gBot+Math.round(legLen*(pal.long?1:0.5));
  const pat=(P,x,y)=>{if(!P[1])return P[0];const cx=x>>2,cy=y>>2,h=r(cx*7+cy*13,pal.seed||4),fx=cx*4+1+((h*7)|0)%2,fy=cy*4+1+((h*11)|0)%2;
    if(h<0.42){if(x===fx&&y===fy)return[255,224,112];if(Math.abs(x-fx)+Math.abs(y-fy)===1)return P[1];}
    else if(P[2]&&h<0.62&&(x-y+cx)%4===0&&Math.abs(x-fx)<2)return P[2];return P[0];};
  const shadeMul=(col,k)=>[Math.min(255,col[0]*k),Math.min(255,col[1]*k),Math.min(255,col[2]*k)];
  for(let y=0;y<80;y++)for(let x=0;x<72;x++){const i=4*(y*72+x);if(!d[i+3])continue;const lum=(d[i]+d[i+1]+d[i+2])/3;let col=null;
    if(isG(i)){col=pal.bare?skin:shadeMul(pat(T,x,y),0.45+0.75*Math.min(1.2,d[i+1]/230));}
    else if(y>gBot&&lum>34){if(y>=feet)col=pal.bare?shadeMul(skin,0.85):sand;else if(y<=shortsEnd)col=shadeMul(pat(B,x,y),0.55+0.6*Math.min(1,lum/90));else col=shadeMul(skin,0.8+0.25*Math.min(1,lum/90));}
    if(col){d[i]=col[0];d[i+1]=col[1];d[i+2]=col[2];}}
  g.putImageData(im,0,0);return(C3.spr[key]=c);}
function c3Draw1(g,look,pose,pal,sc,x,y,face,o){o=o||{};const c=c3Spr(look,pose,pal,sc);if(!o.noshd){g.fillStyle="rgba(60,40,20,.25)";g.beginPath();g.ellipse(x,y,9*sc/2,2.2,0,0,7);g.fill();}
  g.save();g.translate(Math.round(x),Math.round(y));o.rot&&g.rotate(o.rot);face<0&&g.scale(-1,1);g.globalAlpha=o.a==null?1:o.a;g.drawImage(c,-36,-76);g.restore();}
/* the cast */
var C3_CAST=null;
function c3Cast(){if(C3_CAST)return C3_CAST;const P=(t,b,s)=>({t,b,id:t.join()+b.join(),seed:s||3});
  C3_CAST={barista:{look:c3Look(3,0,{hs:9,hc:0}),pal:P(["#f4f4f4","#e83a3a",null],["#2a3f8f",null,null]),sc:2},
    kai:{look:c3Look(1,0,{hs:4,hc:4}),pal:P(["#ffd23a","#2a6ad8","#2a8a3a"],["#2a3f8f",null,null],5),sc:2},
    mia:{look:c3Look(2,1,{hs:8,hc:1}),pal:P(["#8a4ae0","#ffffff",null],["#ff7fb0",null,null],6),sc:2},
    leo:{look:c3Look(5,0,{hs:1,hc:2}),pal:P(["#f4f7fb","#3a8aff",null],["#c8442a",null,null],7),sc:2},
    k1:{look:c3Look(4,0,{hs:2,hc:3}),pal:P(["#3aa84a",null,null],["#3aa84a",null,null]),sc:1.45},
    k2:{look:c3Look(6,1,{hs:12,hc:0}),pal:P(["#ff7fb0","#ffffff",null],["#ff7fb0",null,null],8),sc:1.45},
    crowd:[[70,196,"sit",0],[110,197,"lie",1],[215,182,"walk",2,140,300,0.3],[620,197,"lie",3],[660,186,"sit",4],[990,196,"sit",5],[1040,197,"lie",6],[1090,186,"walk",7,960,1130,0.45],[250,128,"swim",8],[880,124,"swim",9],[1010,126,"swim",10],[440,134,"shore",11],[505,136,"shore",12],[640,148,"guard",13]].map((e,i)=>{const gd=i%2,sc=e[2]==="shore"?1.45:2;
      return{x:e[0],y:e[1],k:e[2],i:e[3],a:e[4],b:e[5],sp:e[6],sc,look:c3Look(e[3]+10,gd),pal:P([["#e83a3a","#ffd23a","#ff9a2a","#3ac8e8","#9a4ad8","#3aa84a","#ffffff"][i%7],i%3===0?"#ffffff":null,i%3===0?"#2a8a3a":null],[["#2a3f8f","#f08a2a","#1fb8a6","#22252f"][i%4],null,null],i+11)};})};
  return C3_CAST;}
function c3Me(){const gd=playerLook&&playerLook.gd?1:0,O=C3_TROP[gd?"f":"m"];return{look:Object.assign({},playerLook,{cl:3,gl:0}),pal:{t:O.t,b:O.b,id:"me"+gd,seed:9},sc:2};}
function c3Pose(name,fr){const p=Object.assign({},Aa(name,fr||0));p.k=[p.lg.join(","),p.ba,p.fa,p.bob,p.tl,p.fist,p.gun,p.flash].join("|");return p;}
function L2(a,b,k){return a+(b-a)*c3Clamp(k,0,1);}
var C3_CASTLE=540;
/* ---------- swimmers and the shark ---------- */
var C3_SW={kai:[615,3],mia:[742,3],k1:[600,2],k2:[560,2],me:[680,0]};
function c3SwimPos(base,i,f){const t=Math.max(0,f-5985);return{x:base+(f<5985?10:4)*Math.sin(f/50+base),y:124+Math.min(8,t*0.04)+Math.sin(f/20+i)*0.8};}
var C3_BITES=[{id:"kai",a:6000,x0:805,H:46},{id:"mia",a:6075,x0:572,H:50},{id:"me",a:6150,x0:880,H:64,eat:!1}],C3_LEN=56,C3_UB=0.3;
function c3BF(i){return C3_BITES[i].a+Math.round(C3_LEN*C3_UB);}
function c3BV(i){const w=C3_SW[C3_BITES[i].id];return c3SwimPos(w[0],w[1],c3BF(i));}
/* where the shark's MOUTH is at progress u of leap i (it bites at u = C3_UB, then rises with its prey) */
function c3Mouth(i,u){const b=C3_BITES[i],v=c3BV(i),s=u<=C3_UB?u/C3_UB:1+0.45*(1-Math.pow(1-(u-C3_UB)/(1-C3_UB),2));
  return{x:b.x0+(v.x-b.x0)*s,y:v.y+6-b.H*Math.sin(Math.PI*Math.pow(Math.max(0,u),1.357))};}
function c3SharkAt(f){const B=C3_BITES;if(f<5870||f>B[B.length-1].a+C3_LEN)return null;let sf=5870,sx=1030;
  for(let i=0;i<B.length;i++){const b=B[i];
    if(f<b.a){const k=c3Ez((f-sf)/(b.a-sf));return{mode:"fin",x:sx+(b.x0-sx)*k,y:126,dir:b.x0<sx?-1:1};}
    if(f<=b.a+C3_LEN){const u=(f-b.a)/C3_LEN,M=c3Mouth(i,u),M2=c3Mouth(i,Math.min(1,u+0.02)),M1=c3Mouth(i,Math.max(0,u-0.02)),dx=M2.x-M1.x,dy=M2.y-M1.y,dir=dx>=0?1:-1,ang=Math.atan2(dy,Math.abs(dx)||1),sc=1.5;
      const ox=(24*Math.cos(ang)-4*Math.sin(ang))*sc*dir,oy=(24*Math.sin(ang)+4*Math.cos(ang))*sc;
      const m=u<0.05?0:u<C3_UB?(u-0.05)/(C3_UB-0.05):u<C3_UB+0.04?1:Math.max(0,1-(u-C3_UB-0.04)/0.1);
      return{mode:"leap",i,u,x:M.x-ox,y:M.y-oy,mx:M.x,my:M.y,dir,ang,m,sc};}
    sf=b.a+C3_LEN;sx=c3Mouth(i,1).x;}
  return null;}
function c3Eaten(id,f){const i=C3_BITES.findIndex((b)=>b.id===id&&b.eat!==!1);return i>=0&&f>=C3_BITES[i].a+10;}
function c3SharkFace(f,x){const s=c3SharkAt(f);return s?(s.x<x?-1:1):-1;}
/* ---------- the player ---------- */
function c3DPlayer(f){let x=140,y=192,face=1,pose="idle",fr=(f/45)&1,act="",show=1,panic=0;
  if(f<720)show=0;
  else if(f<1440){const k=f-720;if(k<70){pose="land";x=140;}else{x=L2(140,306,(k-70)/560);pose=x<305?"walk":"idle";fr=(2.5*f*0.1)&7;}}
  else if(f<2160){x=306;act=f>=1890?"drink":"";}
  else if(f<2880){const k=f-2160;x=L2(306,772,k/380);pose=k<380?"walk":"idle";fr=(2.5*f*0.16)&7;act=k<300?"drink":"";face=1;}
  else if(f<3600){x=772;act="vb";}
  else if(f<4320){const k=f-3600;x=k<300?772:L2(772,500,(k-300)/300);pose=k>=300&&k<600?"walk":"idle";fr=(2.5*f*0.16)&7;face=k>=300&&k<600?-1:k>=600?1:-1;}
  else if(f<5040){x=500;face=1;pose=((f/36)|0)%3===2?"idle":"land";}
  else if(f<5760){const k=f-5040;if(k<220){x=L2(500,640,k/220);y=L2(192,140,k/220);pose="walk";fr=(2.5*f*0.2)&7;}else if(k<290){const e=(k-220)/70;x=L2(640,680,e);y=L2(140,126,e)-26*Math.sin(Math.PI*e);pose=e<0.5?"up":"down";}else{x=680+12*Math.sin(f/60);y=126;act="swim";face=Math.cos(f/60)>0?1:-1;}}
  else if(f<C3_POV0){const p=c3SwimPos(680,0,f);x=p.x;y=p.y;act="swim";panic=f>=5985&&f<6285?1:0;const s=c3SharkAt(f);face=f<5930?(Math.cos(f/60)>0?1:-1):(s?(s.x<x?-1:1):-1);}
  else show=0;
  return{x,y,face,pose,fr,act,show,panic};}
function c3DCast(f){const C=c3Cast(),o={};
  const sp=(id)=>{const w=C3_SW[id],p=c3SwimPos(w[0],w[1],f);return{x:p.x,y:p.y,act:"swim",face:f<5930?(Math.cos(f/50+w[0])>0?1:-1):c3SharkFace(f,p.x),panic:f>=5985,fear:f>=5930&&f<5985,hide:c3Eaten(id,f)};};
  o.barista={x:376,y:170,face:-1,pose:f>=1640&&f<1880?"land":"idle",act:f>=1640&&f<1880?"shake":"",hide:f>=6040};
  if(f>=5985&&f<6040){o.barista.pose="land";}
  if(f<3600)o.kai={x:722,y:186,face:1,pose:"idle",act:f>=2880?"vb":""};
  else if(f<4320){const k=f-3600;o.kai={x:k<250?722:L2(722,468,(k-250)/350),y:L2(186,188,k/600),face:k<250?1:-1,pose:k>=250&&k<600?"walk":"idle"};}
  else if(f<5040)o.kai={x:468,y:188,face:1,pose:((f/40)|0)%3===1?"idle":"land"};
  else if(f<5760){const k=f-5040;o.kai=k<240?{x:L2(468,620,k/240),y:L2(188,128,k/240),face:1,pose:"walk"}:sp("kai");}
  else o.kai=sp("kai");
  if(f<3600)o.mia={x:900,y:186,face:-1,pose:"idle",act:f>=2880?"vb":""};
  else if(f<4320){const k=f-3600;o.mia={x:k<300?900:L2(900,626,(k-300)/360),y:190,face:-1,pose:k>=300&&k<660?"walk":"idle"};}
  else if(f<5040)o.mia={x:626,y:190,face:-1,pose:((f/44)|0)%3===0?"idle":"land"};
  else if(f<5760){const k=f-5040;o.mia=k<260?{x:L2(626,742,k/260),y:L2(190,128,k/260),face:1,pose:"walk"}:sp("mia");}
  else o.mia=sp("mia");
  const fl=Math.max(0,f-6015);o.leo=f<5985?{x:948,y:190,face:-1,pose:"idle",act:f>=2880&&f<3600?"vb":""}:{x:948+fl*1.9,y:190,face:1,pose:"run",hide:fl>160};
  [["k1",420,572,196],["k2",490,598,178]].forEach(([id,sx,cx,cy])=>{
    if(f<3600)o[id]={x:sx+14*Math.sin(f/40+sx),y:134,face:Math.cos(f/40+sx)>0?1:-1,pose:((f/22+sx)|0)%3===0?"up":"idle"};
    else if(f<4320){const k=f-3780;o[id]=k<0?{x:sx,y:134,face:1,pose:"idle"}:{x:L2(sx,cx,k/260),y:L2(134,cy,k/260),face:cx>sx?1:-1,pose:k<260?"walk":"idle"};}
    else if(f<5040)o[id]={x:cx,y:cy,face:-1,pose:((f/30+sx)|0)%2?"land":"idle"};
    else if(f<5760){const k=f-5070,w=C3_SW[id];o[id]=k<220?{x:L2(cx,w[0],k/220),y:L2(cy,128,k/220),face:1,pose:"walk"}:sp(id);}
    else o[id]=sp(id);
    if(f>=5985){const t=f-5985-(id==="k2"?10:0),w=C3_SW[id],p=c3SwimPos(w[0],w[1],f);let y=124+t*0.1;if(y<134)o[id]={x:p.x,y,act:"swim",face:1,panic:!0,fear:!1,hide:!1};else{const t2=t-100;o[id]={x:w[0]-1.9*Math.max(0,t2),y:Math.min(176,134+Math.max(0,t2)*0.5),face:-1,pose:"run",hide:!1};}}});
  return o;}
/* ---------- the overlay + its step ---------- */
function c3Dream(done){let el=qs("#c3Dream");
  if(!el){el=document.createElement("div");el.id="c3Dream";el.className="gov";el.hidden=!0;
    el.innerHTML='<div class="gcard c3dcard"><canvas id="c3dCv" width="384" height="216" aria-label="A dream: a sunny beach at noon, full of people"></canvas><div id="c3dLine" aria-live="polite"><span id="c3dWho">DREAM</span><span id="c3dTxt"></span></div><div class="btns"><button class="gbtn alt" id="c3dSkip">SKIP DREAM</button></div></div>';
    qs("#gm").appendChild(el);const st=document.createElement("style");
    st.textContent="body.c3dream #evoAch,body.c3dream #gt,body.c3dream #cskip{display:none!important}#c3Dream{background:#000}#c3Dream .c3dcard{position:relative;width:min(1120px,100%);max-height:100vh;text-align:center;padding:0;border:0!important;background:#000!important;box-shadow:none!important}#c3dCv{width:100%;max-height:calc(100vh - 6px);object-fit:contain;image-rendering:pixelated;background:#000;display:block;margin:0 auto}#c3dLine{position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden}#c3Dream .btns{position:absolute;right:8px;top:6px;margin:0;opacity:.75}#c3Dream .btns .gbtn{font-size:7px;padding:5px 8px}";
    document.head.appendChild(st);}
  modal=4;el.hidden=!1;C3.dreamOn=1;document.body.classList.add("c3dream");const cv=qs("#c3dCv"),g=cv.getContext("2d");g.imageSmoothingEnabled=!1;
  C3D={f:0,done,raf:0,last:performance.now(),acc:0,cap:-1,capF:0,typed:0,shown:-1,ball:null,conf:[],spl:[],pat:[],gulls:[],cam:300,zoom:1,fx:300,fy:150,shake:0,freeze:0,flash:0,flashC:"255,255,255",pulse:0,bar:0,castle:0,fb:c3Cv(384,216),sm:c3Cv(64,36),sm2:c3Cv(96,54),tmp:c3Cv(384,216)};
  for(let i=0;i<7;i++)C3D.gulls.push({x:Math.random()*C3_BW,y:20+Math.random()*40,v:0.3+Math.random()*0.4,p:Math.random()*6});
  const close=()=>{if(!C3D)return;cancelAnimationFrame(C3D.raf);const d=C3D.done;C3D=null;C3.dreamOn=0;document.body.classList.remove("c3dream");el.hidden=!0;modal=0;d&&d();};el.__close=close;
  qs("#c3dSkip").onclick=()=>{if(!C3D)return;C3D.f<C3_SC[9]?(C3D.f=C3_SC[9],C3D.freeze=0):(C3D.f=C3_DLEN-1);};
  const loop=(now)=>{if(!C3D)return;C3D.raf=requestAnimationFrame(loop);const dt=Math.min(100,now-C3D.last);C3D.last=now;if(window.__evoPaused)return;C3D.acc+=dt;
    while(C3D&&C3D.acc>=1000/60&&!C3D.hold){C3D.acc-=1000/60;if(C3D.freeze>0){C3D.freeze--;continue;}if(++C3D.f>=C3_DLEN){close();return;}c3DStep();}if(!C3D)return;c3DPaint(g);};
  qs("#c3dTxt").textContent="";C3D.raf=requestAnimationFrame(loop);qs("#c3dSkip").focus();}
function c3DSplash(D,x,y,n){for(let q=0;q<n;q++)D.spl.push({x:x+(Math.random()-0.5)*18,y,vx:(Math.random()-0.5)*2.4,vy:-1.5-Math.random()*3,l:34,c:q%3?"#e8ffff":"#bfeaf0"});}

function c3DStep(){const D=C3D,f=D.f;
  for(let i=C3_DL.length-1;i>=0;i--)if(f>=C3_DL[i][0]){if(D.cap!==i){D.cap=i;D.typed=0;D.capF=f;const w=qs("#c3dWho");w.textContent=C3_DL[i][1];}break;}
  if(D.cap>=0){const s=C3_DL[D.cap][2];if(D.typed<s.length)D.typed+=0.75;const ty=Math.floor(D.typed);if(D.shown!==D.cap*1000+ty){D.shown=D.cap*1000+ty;qs("#c3dTxt").textContent=s.slice(0,ty);}}
  D.bar+=((f>=7100?0:C3_BARH)-D.bar)*0.08;D.shake*=0.88;D.pulse*=0.9;D.flash>0&&D.flash--;
  /* sound */
  f===1660&&$sx("pour");f===1890&&$sx("pickup");f===3330&&$sx("success");f===5290&&$sx("whoosh");f===5320&&$sx("pour");
  if(f>=4340&&f<5000&&f%45===0)$sx("scratch");
  f===5760&&$sx("rumble");f===5870&&$sx("stinger");f===5930&&$sx("alarm");
  if(f===5985){$sx("alarm");$sx("spiderscreech");$sx("boom");D.flash=4;D.flashC="255,255,255";D.shake=10;}
  if(f===6140||f===6240){$sx("boom");D.flash=3;D.flashC="255,255,255";}
  if(f>=5985&&f<6285&&f%48===0)$sx("alarm");
  if(f>=5760&&f<6285&&f%90===30)$sx("rumble");
  /* the four bites */
  C3_BITES.forEach((b,i)=>{const bf=c3BF(i);
    if(f===b.a){$sx("whoosh");c3DSplash(D,c3Mouth(i,0).x,127,16);}
    if(f===bf){const M=c3Mouth(i,C3_UB),eat=b.eat!==!1;window.__evoRumble&&window.__evoRumble(eat?320:200,eat?1:0.7,0.8);$sx("roar");$sx("crash");eat&&$sx("slam");D.freeze=eat?6:3;D.shake=eat?17:12;D.flash=3;D.flashC="255,255,255";c3DSplash(D,M.x,eat?118:100,eat?30:22);D.pat.push({x:eat?M.x:c3BV(i).x,y:127,r:4,max:30+9*i});}
    if(f===b.a+C3_LEN){$sx("poof");c3DSplash(D,c3Mouth(i,1).x,127,18);}});
  if(f>=5985&&f<6285)D.shake=Math.max(D.shake,1.6);
  D.pat.forEach((p)=>{p.r<p.max&&(p.r+=0.5);});
  /* the empty sea, the pov, the scare */
  if(f>=C3_POV0&&f<C3_BURST){const k=f-C3_POV0;[16,34,50,64,76,86,95,103].includes(k)&&($sx("heart"),D.pulse=1);D.shake=Math.max(D.shake,0.5);}
  if(f===C3_BURST){window.__evoRumble&&window.__evoRumble(900,1,1);$sx("stinger");$sx("roar");$sx("spiderscreech");$sx("boom");D.shake=26;D.flash=2;D.flashC="255,255,255";}
  if(f===C3_BURST+4)$sx("crash");if(f===C3_BURST+9)$sx("slam");if(f===C3_BURST+20)$sx("roar");
  if(f>=C3_BURST&&f<C3_CUTB)D.shake=Math.max(D.shake,15-(f-C3_BURST)*0.2);
  if(f===C3_CUTB){$sx("crash");D.shake=0;}
  /* volleyball */
  if(f>=2880&&f<3600){const seq=[772,900,722,948],t=f-2880,i=(t/60)|0,k=(t%60)/60,a=seq[i%4],b=seq[(i+1)%4];
    if(t===430){for(let q=0;q<40;q++)D.conf.push({x:930+40*(Math.random()-0.5),y:120,vx:(Math.random()-0.5)*3,vy:-Math.random()*3,c:["#ff4a6a","#ffd23a","#3ac8e8","#3aa84a"][q%4],l:90});}
    D.ball=t>=380&&t<450?{x:L2(772,925,(t-380)/70),y:L2(110,196,((t-380)/70)**2)}:t>=450?null:{x:a+(b-a)*k,y:150-70*Math.sin(Math.PI*k)};t<380&&t%60===0&&$sx("jump");}else D.ball=null;
  D.conf=D.conf.filter((p)=>{p.x+=p.vx;p.y+=p.vy;p.vy+=0.06;return--p.l>0;});
  if(f>=5260&&f<5985&&f%7===0){const P=c3DPlayer(f);if(P.act==="swim")D.spl.push({x:P.x+(Math.random()-0.5)*16,y:P.y-2,vx:(Math.random()-0.5)*1.4,vy:-1-Math.random()*1.5,l:30,c:"#e8ffff"});}
  if(f>=5985&&f<6285&&f%4===0){const P=c3DPlayer(f);D.spl.push({x:P.x+(Math.random()-0.5)*20,y:P.y-4,vx:(Math.random()-0.5)*2,vy:-1.5-Math.random()*1.5,l:26,c:"#e8ffff"});}
  D.spl=D.spl.filter((p)=>{p.x+=p.vx;p.y+=p.vy;p.vy+=0.12;return--p.l>0&&(p.y<130||p.vy<0);});
  D.castle=f<4320?0:Math.min(6,((f-4320)/105)|0);
  D.gulls.forEach((q)=>{q.x+=q.v;q.p+=0.15;q.x>C3_BW+20&&(q.x=-20);});
  c3DDirect(D,f);}
/* the camera operator: where to look, how close, per scene */
function c3DDirect(D,f){const P=c3DPlayer(f);let cam=300,z=1,fx=P.x,fy=150,sp=0.06,zs=0.05;
  if(f<720){cam=300;}
  else if(f<1440){cam=P.x-170;z=1+0.12*c3Ez((f-720)/720);fx=P.x;}
  else if(f<2160){cam=170;z=1+0.45*c3Ez((f-1440)/720);fx=340;fy=146;}
  else if(f<2880){cam=P.x-170;z=1.12;fx=P.x+30;if(f>=2570&&f<2860){z=1.3;fx=P.x+30;fy=146;}}
  else if(f<3600){cam=660;z=1.18;fx=830;fy=148;if(f>=3318&&f<3380){z=1.42;fx=900;}}
  else if(f<4320){cam=P.x-170;z=1.15;fx=P.x;}
  else if(f<5040){cam=370;z=1.6-0.6*c3Ez((f-4320)/720);fx=540;fy=162-18*c3Ez((f-4320)/720);}
  else if(f<5760){cam=f<5300?P.x-170:560;z=f<5300?1.2:1.05;fx=f<5300?P.x:640;fy=f<5300?150:120;}
  else if(f<C3_POV0){const s=c3SharkAt(f);cam=440;fy=122;
    if(f<5900){z=1+0.2*c3Ez((f-5760)/140);fx=640;}
    else if(f<5985){z=1.2+0.3*c3Ez((f-5900)/85);fx=c3Clamp(s?s.x:660,520,800);}
    else if(f<6285){z=1.3;fx=c3Clamp(s?(s.mx||s.x):660,430,880);zs=0.08;sp=0.1;}
    else{z=1.3+0.75*c3Ez((f-6285)/45);fx=P.x;fy=118;}}
  D.cam+=(c3Clamp(cam,0,C3_BW-384)-D.cam)*(f<730?1:sp);D.zoom+=(z-D.zoom)*zs;D.fx+=(fx-D.fx)*0.08;D.fy+=(fy-D.fy)*0.08;
  [720,1440,2160,2880,3600,4320,5040].forEach((b)=>{if(f===b){D.zoom=z;D.fx=fx;D.fy=fy;D.cam=c3Clamp(cam,0,C3_BW-384);}});}
