/* ======================= CHAPTER 3, PART 6: THE EVOLVED TRAIL, THE DOME, THE DARK ROUTE, THE LAB =======================
   Follow the Evolved through the burning streets without being seen (stealth: cover, look-backs, noise), reach the Dome (built of
   flesh and car parts), pry open the emergency route with the crowbar, find your way through total darkness by screaming (echo-
   location) and tapping touch pads with the crowbar, then search the Containment Chamber: a lab full of containment tubes, a clean
   workbench, VHS tapes and a TV. Take the Venom Blaster apart, craft the upgrade core, and pick one of three new weapons.
   Rooms: fol (streets), dome, dark (emergency route), slab (the lab). All ride the chapter 3 hooks (c7*) like the earlier parts. */
var P6={t:0,hide:0,hidX:0,al:0,noise:0,f:null,warmN:0,warm:0,tut:{}};
const P6_FW=1760,P6_DW=640,P6_KW=1560,P6_KH=300,P6_LW=1520;
function p6Fresh(){return{on:0,fol:0,cpx:0,gx:0,wp:0,seen:0,dome:0,dscene:0,pryN:0,hatch:0,route:0,kcp:0,kex:0,pads:{},tones:[],lab:0,bench:0,dis:0,found:{},made:{},tapes:[],tv:0,up:null,test:0,done:0,fx:0};}
function p6S(){const S=c7S();if(!S.p6)S.p6=p6Fresh();return S.p6;}
function p6Is(id){const d=C2[id===undefined?room:id];return!!(d&&d.p6);}
function p6Rooms(){if(C2.fol)return;
  const mk=(id,name,W,H,seeds,env)=>{C2[id]={name,L:null,R:null,W,cars:[],seeds,c3:1,c4:1,c5:1,c7:1,p6:1};rooms[id]={name,L:null,R:null,W,crates:[],items:[],ints:[],plats:[]};if(H)rooms[id].H=H;C2_F[id]={trees:[],vines:[],branches:[],gantries:[],smoke:[]};De[id]=env;};
  mk("fol","THE BURNING STREETS",P6_FW,0,[201,202,203,204,205,206,207,208,209,210,211],{c:"70,50,80",l:"255,150,90",a:0.14,dk:0.55});
  mk("dome","THE DOME",P6_DW,0,[221,222,223,224],{c:"90,50,70",l:"255,120,160",a:0.14,dk:0.5});
  mk("dark","THE EMERGENCY ROUTE",P6_KW,P6_KH,[231],{c:"20,24,40",l:"140,190,255",a:0.05,dk:0.7});
  mk("slab","THE CONTAINMENT CHAMBER",P6_LW,0,[241,242,243,244,245,246,247,248,249,250],{c:"60,80,80",l:"190,255,230",a:0.1,dk:0.5});}
p6Rooms();
/* ---------------- small helpers ---------------- */
function p6Dist(a,b){return Math.abs(a-b);}
function p6Q(h){qs("#gg h4 span").textContent="QUEST";qs("#ggb").innerHTML=h;return!0;}
function p6Tip(key,html,ms){if(P6.tut[key])return;P6.tut[key]=1;toast(html,ms||5200);}
function p6Arrow(t,hold){if(modal||won||dead||C3.cut||C3.busy||C7G)return;if(t==null||Math.abs(t-player.x)<22)return;const d=t>player.x?1:-1;vo(player.x+d*16,player.y-44,d);}
/* a tiny synth for the sounds the game's own engine does not have (screams, pad tones, tape hiss) */
var P6A=null;
function p6Ctx(){try{if(!P6A){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;P6A=new C();}if(P6A.state==="suspended")P6A.resume();return P6A;}catch(e){return null;}}
function p6Tone(f,dur,type,vol,f2,delay){const a=p6Ctx();if(!a)return;try{const t=a.currentTime+(delay||0),o=a.createOscillator(),g=a.createGain();o.type=type||"sine";o.frequency.setValueAtTime(f,t);f2&&o.frequency.exponentialRampToValueAtTime(Math.max(20,f2),t+dur);g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(vol||0.12,t+0.012);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+dur+0.05);}catch(e){}}
function p6Noise(dur,vol,fc,q,delay){const a=p6Ctx();if(!a)return;try{const t=a.currentTime+(delay||0),n=Math.max(1,(a.sampleRate*dur)|0),b=a.createBuffer(1,n,a.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);const s=a.createBufferSource();s.buffer=b;const f=a.createBiquadFilter();f.type="bandpass";f.frequency.value=fc||1200;f.Q.value=q||1;const g=a.createGain();g.gain.setValueAtTime(vol||0.1,t);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);s.connect(f);f.connect(g);g.connect(a.destination);s.start(t);}catch(e){}}
function p6Scream(){p6Tone(520,0.5,"sawtooth",0.08,880,0);p6Tone(780,0.45,"square",0.04,1300,0.03);p6Noise(0.5,0.07,2400,0.8);}
function p6Echo(d){/* the reply comes back later the farther away the wall is */const dl=Math.min(1.2,0.18+d/180);p6Tone(430,0.32,"triangle",Math.max(0.02,0.07-d/2600),300,dl);p6Noise(0.25,Math.max(0.01,0.03-d/6000),1600,1,dl);}
/* ---------------- routing: every c7 hook hands over for the new rooms ---------------- */
{const _a=c7Pre;c7Pre=function(){if(p6Is()&&P6.hide){player.vx=0;player.walk=0;jumpBuf=0;}return _a();};}
{const _a=window.__evoRoom;window.__evoRoom=()=>{if((p6Is()||room==="crt")&&C3&&!C3.dreamOn)return room==="slab"?"lab":room==="dark"?"p6_dark":room==="dome"?"p6_dome":"p6_street";return _a();};}
/* the player vanishes while hiding: wrap the sprite painter, nothing else changes */
{const _M=Ma;Ma=function(t,a,e,o,r,n){if(e===playerLook&&Math.abs(t-player.x)<0.6&&p6Is()){if(P6.hide)return;if(room==='dark'){const ga=ctx.globalAlpha;ctx.globalAlpha=ga*0.3;try{return _M.apply(this,arguments);}finally{ctx.globalAlpha=ga;}}}return _M.apply(this,arguments);};}
/* ---------------- retry: back to the last checkpoint of the new part ---------------- */
{const _r=c5Retry;c5Retry=function(){if(!p6Is())return _r();const S=p6S();qs("#gd").hidden=!0;dead=!1;hp=5;invuln=60;player.kb=0;shots=[];won=0;fadeNow=1;fadeTo=0;C3.task=null;C3.busy=0;C3.cut=null;tnBars(0);P6.hide=0;P6.al=0;P6.noise=0;
  enterRoom(room,"R");p6Respawn();updateBag();updateHud();updateGuide();return!0;};}
function p6Respawn(){const S=p6S();if(room==="fol")p6FolInit(!0);else if(room==="dark")p6DarkRespawn();else{player.y=C2_FLOOR;}}
function p6Die(title,txt){if(dead||Eo.god)return;C3.task=null;C3.busy=0;P6.hide=0;c2Die(title,txt);}

/* ---------------- overlay look (shared by the new screens) ---------------- */
function p6Css(){c5Css();if(qs("#p6Css"))return;const st=document.createElement("style");st.id="p6Css";
  st.textContent=".p6cv{width:100%;max-height:calc(100vh - 290px);object-fit:contain;image-rendering:pixelated;background:#0c0a08;border:2px solid #3a3a40;display:block;margin:6px auto}"+
  ".p6msg{min-height:34px;text-align:left;font-size:8px;line-height:1.8;padding:6px 8px;background:#05070ce6;border:2px solid #2a3a5a;margin:4px 0;color:#dfe8f8}.p6msg .ok{color:#8aff9a}.p6msg .no{color:#ffb08a}.p6msg .hint{color:#bfe0ff}"+
  "#p6Pry,#p6Bench,#p6Tv,#p6Pick,#p6End,#p6Tool{z-index:60}.p6row{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:4px 0}.p6row .gbtn{flex:0 1 auto}"+
  ".p6grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(64px,1fr));gap:6px;margin:6px 0}.p6slot{border:2px solid #3a4a6a;background:#0a1020;padding:4px;text-align:center;font-size:6px;line-height:1.5;color:#b8c8e8;cursor:pointer;min-height:64px}.p6slot.sel{border-color:#ffe070;color:#ffe070}.p6slot.off{opacity:.35}.p6slot canvas{width:32px;height:32px;image-rendering:pixelated;display:block;margin:0 auto 2px}"+
  ".p6cards{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.p6card{border:2px solid #3a4a6a;background:#0a1020;padding:8px;font-size:7px;line-height:1.7;color:#cfe0ff;text-align:left;cursor:pointer}.p6card h4{margin:0 0 6px;color:#ffe070;font-size:9px}.p6card.sel{border-color:#8aff9a;box-shadow:0 0 12px #3aff7a66}.p6card canvas{width:100%;height:auto;image-rendering:pixelated;background:#05070c;border:1px solid #223;display:block;margin-bottom:6px}.p6bar{height:5px;background:#1a2438;margin:2px 0 5px}.p6bar i{display:block;height:100%;background:#7fd8ff}"+
  "@media (max-width:700px){.p6cards{grid-template-columns:1fr}}";
  document.head.appendChild(st);}
