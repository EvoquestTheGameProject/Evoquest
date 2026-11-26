/* ======================= CHAPTER 3, PART 5 (CINEMATIC): THE WAY BACK =======================
   Played on the opening cutscene's engine with the memory's compositor (c9Compose: bloom, light trails, colour split,
   flash, shake). It uses the game's painted assets: the ship's hull, the radio tower, the city's own night tiles and
   buildings, Ma people and Ea creatures. Three shots: leaving the island, the burning skyline, a nest bursting open. */
var C10N={hits:0,bang:0,burst:0,P:[],last:0};
function c10Dt(){const now=performance.now(),dt=Math.min(50,now-(C10N.last||now))/16.7;C10N.last=now;return dt;}
function c10Stars(t,n,h){for(let q=0;q<n;q++){const a=0.25+0.3*Math.sin(t/400+q*1.3);fill("rgba(230,226,255,"+a+")",(q*37+q*q)%192,(q*19)%h,q%7?0.6:1,q%7?0.6:1);}}
function c10Water(t,y0,deep,lite,glit){const q=ctx.createLinearGradient(0,y0,0,108);q.addColorStop(0,lite);q.addColorStop(1,deep);ctx.fillStyle=q;ctx.fillRect(-20,y0,240,130);
  for(let k=0,y=y0+1;y<112;k++,y+=1.4+k*0.35)for(let x=-20+((t*0.012*(1+k*0.15)+k*23)%17);x<220;x+=17-Math.min(9,k*0.5))fill("rgba(220,210,255,"+(0.06+0.012*k)+")",x,y,3+k*0.35,0.5);
  if(glit)for(const [gx,col,w] of glit)for(let y=y0+1,k=0;y<108;k++,y+=1.6+k*0.2){const a=Math.sin(t/180+k*1.7+gx);if(a<0.2)continue;fill("rgba("+col+","+(0.55*a*(1-k/40))+")",gx-w/2+Math.sin(t/300+k)*w*0.4,y,w*(0.5+0.4*a),0.6);}}
function c10ShipSide(x,y,t,sc){/* the RIDGE LINK 7, painted by the port's own ship painter, sailing left */
  const C=(typeof C4!=="undefined"&&C4)||{},keep=C.ship,tk=tick;C.ship={x:-5};tick=(t/16)|0;const bob=Math.sin(t/520)*0.9;
  ctx.save();ctx.translate(x,y+bob);ctx.rotate(Math.sin(t/760)*0.012);ctx.scale(sc,sc);ctx.translate(-30,-86);try{c4Ship();}finally{ctx.restore();tick=tk;C.ship=keep;}}
function c10Island(t,ix,iy){ctx.fillStyle="#0c0a14";ctx.beginPath();ctx.moveTo(ix-34,iy);ctx.quadraticCurveTo(ix-14,iy-12,ix+2,iy-14);ctx.quadraticCurveTo(ix+20,iy-18,ix+44,iy);ctx.fill();
  ctx.globalAlpha=0.85;ctx.drawImage(c7TowerSpr(),ix+6,iy-42,11,28);ctx.globalAlpha=1;}
function c10ScSea(t){const dt=c10Dt(),sx=104-t*0.0016,ix=158+t*0.0011;
  c9Compose({fade:0.22,bloom:0.32,
    base:()=>{const q=ctx.createLinearGradient(0,0,0,60);q.addColorStop(0,"#04050e");q.addColorStop(0.6,"#141532");q.addColorStop(1,"#2e2240");ctx.fillStyle=q;ctx.fillRect(-20,-20,240,82);c10Stars(t,60,46);
      ctx.fillStyle="#e8e4f4";ctx.beginPath();ctx.arc(46,20,6,0,7);ctx.fill();fill("#c8c4dc",43,17,2,2);fill("#d4d0e6",48,22,1.4,1.4);
      for(let q2=0;q2<6;q2++){const cx=((q2*47+t*0.003)%260)-30,cy=10+q2*5;ctx.globalAlpha=0.55;ctx.drawImage(c10Puff(24,"30,26,52"),cx-20,cy-6,40,12);}ctx.globalAlpha=1;
      c10Island(t,ix,60);
      c10Water(t,60,"#04040c","#141430",[[46,"230,226,255",5]]);
      fill("rgba(180,180,220,.12)",-20,58,240,3);
      c10ShipSide(sx,74,t,0.42);c10Water(t,74.6,"#04040c","#0c0c22",null);for(let q2=0;q2<14;q2++)fill("rgba(230,230,250,"+(0.4-q2*0.026)+")",sx+26+q2*4.4,74.4+Math.sin(t/200+q2)*0.6,4,0.6);},
    light:()=>{(t%1400)<700&&glow(ix+11.5,19,8,"255,60,40",0.7);glow(46,20,22,"210,210,255",0.22);glow(sx+0.42*(89-30),74+0.42*(62-68-86+86)-0.42*86+0.42*62-0.42*6,4,"255,60,40",0.5);glow(sx+0.42*(88-30),74-0.42*(86-62+20),10,"255,210,130",0.18);}});}
function c10ScCity(t){const z=1+Math.min(1,t/22000)*0.22;
  c9Compose({fade:0.2,bloom:0.18,ab:0,
    base:()=>{ctx.translate(96,48);ctx.scale(z,z);ctx.translate(-96,-48);
      const q=ctx.createLinearGradient(0,0,0,50);q.addColorStop(0,"#05040c");q.addColorStop(0.55,"#1c0c1c");q.addColorStop(1,"#8a3416");ctx.fillStyle=q;ctx.fillRect(-20,-20,240,72);c10Stars(t,30,22);
      /* the city itself: the same painted night tiles you walk through */
      for(let i=0;i<3;i++){const tl=c5Tile("crt",i,C2.crt.seeds[i]);ctx.drawImage(tl,0,0,384,190,-24+i*88,4,96,47.5);}
      for(const [x,y,s] of [[20,20,0.6],[70,12,0.8],[118,16,0.65],[160,14,0.75]])c10Smoke(x,y,s,t/16,"24,16,24");
      for(let q2=0;q2<14;q2++){const x=4+q2*14+((q2*7)%9),y=30+((q2*13)%14),a=0.6+0.4*Math.sin(t/140+q2);if(q2%3===0)fill("#ffb050",x,y,1,1.2*a);}
      c10Water(t,48,"#060308","#2a1210",[[40,"255,130,50",6],[96,"255,110,40",8],[150,"255,140,60",5]]);
      for(let q2=0;q2<7;q2++){const cx=(q2*37+t*0.01*(1+q2%3))%220-14,cy=6+((q2*13)%14)+Math.sin(t/300+q2)*3;c3Crow(cx,cy,t/80+q2,1,0.28);}
      /* the bow, and you at the rail */
      ctx.fillStyle="#10141a";ctx.beginPath();ctx.moveTo(-20,70);ctx.lineTo(80,70);ctx.lineTo(108,75);ctx.lineTo(80,84);ctx.lineTo(-20,86);ctx.fill();fill("#d8d4c4",-20,70,100,0.8);
      fill("#3a3e48",-20,63,74,0.8);for(let x=-16;x<52;x+=8)fill("#3a3e48",x,63,0.8,7);
      Ma(38,70,playerLook,0,1,{s:Po,closed:0,env:{c:"110,70,80",l:"255,150,90",a:0.24,dk:0.5}});},
    light:()=>{for(const [x,y,i] of [[18,30,1],[52,26,0.8],[96,32,1],[132,28,0.7],[170,30,0.9]])glow(x,y,7,"255,130,50",(0.28+0.1*Math.sin(t/120+x))*i);glow(96,48,54,"255,90,30",0.05);glow(38,52,16,"255,140,80",0.06);}});}
function c10ScNest(t){const dt=c10Dt(),now=performance.now(),b=C10N.burst?now-C10N.burst:-1,bang=C10N.bang?Math.max(0,1-(now-C10N.bang)/260):0;
  if(b>=0&&b<320)for(let q=0;q<8;q++)C10N.P.push({x:96+(Math.random()-0.5)*26,y:44+(Math.random()-0.5)*20,vx:(Math.random()-0.5)*4,vy:-Math.random()*3.5,life:90,c:["#5a5a5e","#3a3a40","#2a7a4a","#8a8478"][q%4],s:1+Math.random()*1.8});
  C10N.P=C10N.P.filter((p)=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=0.16*dt;if(p.y>70){p.y=70;p.vx*=0.6;p.vy*=-0.2;}p.life-=dt;return p.life>0;});
  const B=C10_BLD[2];
  c9Compose({fade:0.22,bloom:0.22,ab:b>=0?Math.max(0.08,1.1-b/900):0,shake:bang*2.5+(b>=0?Math.max(0,4-b/260):0),flash:b>=0?Math.max(0,0.85-b/380):0,
    base:()=>{const q=ctx.createLinearGradient(0,0,0,88);q.addColorStop(0,"#06040c");q.addColorStop(0.7,"#24101c");q.addColorStop(1,"#5a2416");ctx.fillStyle=q;ctx.fillRect(-20,-20,240,110);
      ctx.drawImage(c5Tile("crt",2,C2.crt.seeds[2]),0,0,384,184,-20,-14,232,111);{const q3=ctx.createLinearGradient(0,-14,0,70);q3.addColorStop(0,"rgba(8,4,20,.75)");q3.addColorStop(1,"rgba(40,10,20,.35)");ctx.fillStyle=q3;ctx.fillRect(-20,-14,232,90);}ctx.drawImage(c10Bld(C10_BLD[4]),0,0,384,216,128,-66,240,135);ctx.drawImage(c10Bld(C10_BLD[0]),0,0,384,216,-52,-62,230,129);
      /* the nest building, close up */
      ctx.save();ctx.translate(bang?(Math.random()-0.5)*bang*2:0,0);ctx.drawImage(c10Bld(B),0,0,384,216,45,-70.6,250,140.6);ctx.restore();
      const hx=96,hy=56,GY=70;
      if(b<0){const cr=Math.min(7,C10N.hits*2);ctx.strokeStyle="#0a0608";ctx.lineWidth=0.8;for(let q2=0;q2<cr;q2++){ctx.beginPath();ctx.moveTo(hx,hy);let x=hx,y=hy;for(let s=0;s<4;s++){x+=Math.cos(q2*0.9)*4+(s%2?1:-1);y+=Math.sin(q2*0.9)*3.4;ctx.lineTo(x,y);}ctx.stroke();}}
      else{ctx.fillStyle="#040203";ctx.beginPath();ctx.moveTo(hx-14,GY);ctx.lineTo(hx-12,GY-24);ctx.lineTo(hx-4,GY-31);ctx.lineTo(hx+8,GY-29);ctx.lineTo(hx+14,GY-20);ctx.lineTo(hx+15,GY);ctx.fill();
        for(let q2=0;q2<7;q2++){const on=Math.sin(t/(80+q2*25)+q2)>0;on&&(fill("#ff3a2a",hx-9+q2*3,GY-22+((q2*5)%14),0.9,0.8),fill("#ff3a2a",hx-7.4+q2*3,GY-22+((q2*5)%14),0.9,0.8));}
        /* what pours out: changed people and beasts, scattering along the waterfront */
        for(let q2=0;q2<11;q2++){const tt=b-260-q2*210;if(tt<0)continue;const dir=q2%2?-1:1,x=hx+dir*(2+tt*0.016);if(Math.abs(x-hx)>120)continue;
          if(q2%3===1)c3Ea(x-dir*33*0.46,GY,dir,q2%2?0:1,now*1.6+q2*50,0.46);
          else Ma(x,GY,yt(q2+2,4+q2%3,(q2*3)%14,(q2*5)%14,{hs:q2%11,gd:q2%2}),0,dir,Object.assign({s:Po*0.78,pose:c3Pose("walk",((now/110)|0)%8),env:{c:"60,30,50",l:"255,140,80",a:0.25,dk:0.55}},C10_MUTE));}
        if(b>80)for(let q2=0;q2<12;q2++){const tt=(b-80)/1000,cx=hx+Math.cos(q2*0.8)*tt*38*(1+q2%3),cy=GY-30-tt*32*(1+(q2%4)*0.35)+Math.sin(q2)*6;c3Crow(cx,cy,now/80+q2,Math.cos(q2*0.8)>0?1:-1,0.5);}}
      ctx.drawImage(c5Tile("crt",3,C2.crt.seeds[3]),0,184,384,32,-20,70,232,20);c10Water(t,88,"#040208","#1a0c14",[[96,"255,120,60",6]]);
      for(const p of C10N.P)fill(p.c,p.x,p.y,p.s,p.s);},
    light:()=>{glow(96,40,30,"110,255,140",0.07+0.04*Math.sin(t/300)+(bang*0.12));if(b>=0)glow(96,56,10,"255,40,30",0.16);for(const [x,y] of [[0,-6],[22,10],[175,-10],[190,8]])glow(x,y,9,"255,120,40",0.3+0.1*Math.sin(t/130+x));}});}
function c10Reg(){C10V.reg||(C10V.reg=1,le.m10_sea=(t)=>c10ScSea(t),le.m10_city=(t)=>c10ScCity(t),le.m10_nest=(t)=>c10ScNest(t));}
async function c10Sail(done){c10Reg();c9Bufs();Object.assign(C10N,{hits:0,bang:0,burst:0,P:[],last:0});modal=4;
  for(let i=0;i<4;i++)c5Tile("crt",i,C2.crt.seeds[i]);c10Bld(C10_BLD[2]);
  ot.style.zIndex=90;ot.hidden=!1;it.hidden=!0;nt.hidden=!0;ct.classList.remove("on");Jt=1;cutAbort=0;typing=0;speaker="";fade(1).catch(()=>{});
  setScene("m10_sea");requestAnimationFrame(window.se);
  const me=async(t)=>{speaker="p";await say(playerName,t);};
  try{
    await titleCard("THE WAY BACK",2400);await fade(0);
    await me("Power core. Field coils. Chrono-clock.");
    await me("The power plant, the shipyard and the observatory. They're all back in the city.");
    await me("If Dr. Morrow was right, every one of them is guarded. I'll have to be smarter than they are.");
    await fade(1);hideDialog();setScene("m10_city");await titleCard("NIGHTFALL",1600);await fade(0);
    await me("What's that glow on the horizon?");
    $sx("siren");await me("Fires. Half the city is burning. It wasn't like this when I left.");
    await me("And those red lights in the windows… those aren't lights. They're eyes.");
    await fade(1);hideDialog();setScene("m10_nest");await fade(0);$sx("rumble");
    await me("That building by the water… it's covered in that green growth.");
    for(let q=0;q<3;q++){await wait(q?620:420);C10N.bang=performance.now();C10N.hits=q+1;$sx("doorhit");}
    await me("Something is moving inside it. Lots of somethings.");
    C10N.bang=performance.now();C10N.hits=4;$sx("doorhit");await wait(450);
    C10N.burst=performance.now();$sx("crash");$sx("roar");$sx("flutter");hideDialog();await wait(3600);
    await me("They're pouring out. They've been nesting in the buildings… and now there are too many of them to fit.");
    await titleCard("BACK TO THE CITY",2400);
  }catch(e){if(e!==0)console.error(e);}
  $sx("stop");hideDialog();ct.classList.remove("on");fade(1).catch(()=>{});await new Promise((r)=>setTimeout(r,640));ot.hidden=!0;ot.style.zIndex="";cutAbort=0;C10N.P=[];modal=0;done&&done();}
