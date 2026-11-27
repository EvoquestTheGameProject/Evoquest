/* ======================= CINEMATIC FINISH FOR THE CHAPTER 1 AND 2 CUTSCENES =======================
   A post-processing pass over the opening cutscene engine (every original scene: the street, the poster, the call, the pod,
   the lab, the outbreak, the rock, leaving, waking, the door, the paper) and over in-game cutscenes:
   bloom, per-scene colour grading, drifting light leaks, film grain, a soft vignette, a gentle handheld camera and a
   light flash on every cut. Scenes that already have their own compositor (the memory and the voyage) are left alone.
   Set window.__evoNoFx=1 to switch it all off. */
var C11={S:null,G:[],gi:0,last:"",cutT:0};
/* per-scene grade: tint for soft-light, light-leak colour and corner, bloom strength */
const C11_GRADE={
  street:{tint:["#3a2a6a","#ff7ab0"],leak:"255,90,170",lx:0.9,ly:0.1,bloom:1.1},
  poster:{tint:["#2a2a5a","#ffb070"],leak:"255,170,90",lx:0.1,ly:0.1,bloom:0.9},
  call:{tint:["#103a4a","#70f0ff"],leak:"80,220,255",lx:0.85,ly:0.2,bloom:1.0},
  pod:{tint:["#0c2a4a","#9ad8ff"],leak:"140,210,255",lx:0.15,ly:0.15,bloom:1.15},
  lab:{tint:["#0a3a2a","#ff5a4a"],leak:"255,70,60",lx:0.85,ly:0.85,bloom:1.15},
  out:{tint:["#0a3a1a","#b8ff7a"],leak:"140,255,120",lx:0.5,ly:0.05,bloom:1.2},
  rock:{tint:["#4a2a1a","#ffd890"],leak:"255,210,140",lx:0.2,ly:0.1,bloom:1.0},
  left:{tint:["#1a2a4a","#ffb890"],leak:"255,170,130",lx:0.8,ly:0.15,bloom:0.95},
  wake:{tint:["#1a3a4a","#e8f8ff"],leak:"200,240,255",lx:0.5,ly:0.0,bloom:1.2},
  door:{tint:["#2a2a3a","#ffe0b0"],leak:"255,220,170",lx:0.5,ly:0.1,bloom:1.0},
  paper:{tint:["#3a2a1a","#ffe8c0"],leak:"255,230,180",lx:0.1,ly:0.1,bloom:0.8}};
function c11Small(){if(!C11.S){C11.S=document.createElement("canvas");C11.S.width=96;C11.S.height=54;}return C11.S;}
function c11Grain(){if(!C11.G.length)for(let k=0;k<4;k++){const c=document.createElement("canvas");c.width=192;c.height=108;const g=c.getContext("2d"),im=g.createImageData(192,108),d=im.data;
    for(let i=0;i<d.length;i+=4){const v=Math.random()*255|0;d[i]=d[i+1]=d[i+2]=v;d[i+3]=Math.random()<0.5?40:0;}g.putImageData(im,0,0);C11.G.push(c);}
  return C11.G[(C11.gi=(C11.gi+1)%8)>>1];}
/* bloom: shrink the frame, square it so only the bright parts survive, and add it back softly */
function c11Bloom(g,cv,amt){const S=c11Small(),s=S.getContext("2d");s.globalCompositeOperation="source-over";s.imageSmoothingEnabled=!0;s.clearRect(0,0,96,54);s.drawImage(cv,0,0,96,54);
  s.globalCompositeOperation="multiply";s.drawImage(S,0,0);s.drawImage(S,0,0);
  g.save();g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation="lighter";g.globalAlpha=amt;g.imageSmoothingEnabled=!0;g.drawImage(S,0,0,cv.width,cv.height);g.globalAlpha=amt*0.5;g.drawImage(S,-8,-5,cv.width+16,cv.height+10);g.restore();}
function c11Vignette(g,cv,a){const W=cv.width,H=cv.height,key="v"+W+"x"+H+a;C11[key]||(C11[key]=(()=>{const q=g.createRadialGradient(W/2,H/2,H*0.38,W/2,H/2,W*0.62);q.addColorStop(0,"rgba(0,0,0,0)");q.addColorStop(1,"rgba(0,0,0,"+a+")");return q;})());
  g.save();g.setTransform(1,0,0,1,0,0);g.fillStyle=C11[key];g.fillRect(0,0,W,H);g.restore();}
function c11Grade(g,cv,G,t){const W=cv.width,H=cv.height;g.save();g.setTransform(1,0,0,1,0,0);
  /* colour grade: cool shadows on top, warm highlights below (or whatever the scene asks for) */
  g.globalCompositeOperation="soft-light";g.globalAlpha=0.32;const q=g.createLinearGradient(0,0,0,H);q.addColorStop(0,G.tint[0]);q.addColorStop(1,G.tint[1]);g.fillStyle=q;g.fillRect(0,0,W,H);
  /* a slow light leak drifting near one corner */
  g.globalCompositeOperation="screen";g.globalAlpha=1;const lx=W*(G.lx+0.06*Math.sin(t/2300)),ly=H*(G.ly+0.05*Math.cos(t/1900)),R=W*(0.34+0.05*Math.sin(t/1300)),l=g.createRadialGradient(lx,ly,0,lx,ly,R);
  l.addColorStop(0,"rgba("+G.leak+","+(0.1+0.04*Math.sin(t/900))+")");l.addColorStop(1,"rgba("+G.leak+",0)");g.fillStyle=l;g.fillRect(0,0,W,H);
  /* film grain */
  g.globalCompositeOperation="overlay";g.globalAlpha=0.55;g.imageSmoothingEnabled=!1;g.drawImage(c11Grain(),0,0,W,H);g.restore();}
function c11Flash(g,cv,k){if(k<=0)return;g.save();g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation="screen";g.fillStyle="rgba(255,250,240,"+k+")";g.fillRect(0,0,cv.width,cv.height);g.restore();}
/* ---------------- the opening cutscene engine ---------------- */
{const ORIG=Object.keys(C11_GRADE);
  /* a gentle handheld camera on every original scene: a slow drift and a breathing push-in */
  ORIG.forEach((k)=>{const f=le[k];if(typeof f!=="function"||f.__c11)return;const w=function(t){if(window.__evoNoFx||k==="paper")return f.call(this,t);
      const dx=Math.sin(t/1700)*0.55+Math.sin(t/610)*0.18,dy=Math.cos(t/2300)*0.4+Math.sin(t/770)*0.12,z=1.012+0.008*Math.sin(t/3100);
      ctx.translate(96+dx,54+dy);ctx.scale(z,z);ctx.translate(-96,-54);return f.call(this,t);};w.__c11=1;le[k]=w;});
  const _se=window.se;window.se=function(){_se.apply(this,arguments);try{if(window.__evoNoFx)return;const O=(0,eval)("ot");if(!O||O.hidden)return;const sc=(0,eval)("scene"),G=C11_GRADE[sc];if(!G)return;
    const g=(0,eval)("ht"),cv=g.canvas,t=(0,eval)("Ut");
    if(sc!==C11.last){C11.last=sc;C11.cutT=performance.now();}
    c11Bloom(g,cv,0.2*G.bloom);c11Grade(g,cv,G,t);c11Vignette(g,cv,0.38);c11Flash(g,cv,Math.max(0,0.22-(performance.now()-C11.cutT)/1400));}catch(e){}};}
/* ---------------- in-game: a lighter bloom always, and a full cinematic finish during cutscenes ---------------- */
function c11InCut(){return!!((typeof C3!=="undefined"&&C3&&C3.cut)||(typeof c2cut!=="undefined"&&c2cut)||(typeof cine!=="undefined"&&cine)||(typeof TC!=="undefined"&&TC));}
{const _r=render;render=function(){_r();try{if(window.__evoNoFx||!GM.on)return;const cv=qs("#gc"),g=cv.getContext("2d"),cut=c11InCut(),t=performance.now();
    c11Bloom(g,cv,cut?0.16:0.09);if(cut){g.save();g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation="overlay";g.globalAlpha=0.35;g.imageSmoothingEnabled=!1;g.drawImage(c11Grain(),0,0,cv.width,cv.height);g.restore();c11Vignette(g,cv,0.32);}}catch(e){}};}
GM.c3.c11=()=>({last:C11.last,grain:C11.G.length,wrapped:Object.keys(C11_GRADE).filter((k)=>le[k]&&le[k].__c11).length});
