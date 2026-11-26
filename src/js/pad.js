/* ======================= EVOQUEST CONTROLLER SUPPORT =======================
   Standard-mapping gamepads (Xbox, PlayStation, Switch Pro, Steam Deck...). Plug in or wake the pad and press any button.
   IN THE GAME   Left stick / D-pad: move (up = climb)   A: jump   B: use / interact   X: punch   RT or RB: shoot
                 Y: bag (or skip a cutscene)   START: pause (or skip a cutscene)   BACK: field journal
   IN MENUS      D-pad / left stick: move the highlight   A: choose   B: back / close
                 Right stick: scroll lists, or move the on-screen cursor on drag screens (trunk, blueprint, wiring, lab bench)
   WIRING PUZZLE X: test   Y: hint   LB: sticky note   RB: clear wires
   Turn the whole thing off with localStorage evoquest_pad = "off". */
(()=>{"use strict";
if(window.__evoPadLoaded)return;window.__evoPadLoaded=1;
let off=!1;try{off=localStorage.getItem("evoquest_pad")==="off";}catch(e){}
if(off)return;
const $=(s)=>document.querySelector(s),DEAD=0.32,now=()=>performance.now();
const HUD=new Set(["gq2","evoJBtn","evoPBtn","bagB","gdv","dnab","musicBtn","cskip","bL","bR","bJ","bP","bU","bS","evoPadCursor"]);
const SKIPS=new Set(["c3dSkip","bzSkip","c3lSkip"]);
const CLOSE=/^(CLOSE|BACK|CANCEL|STAY|NO\b|DONE|GOT IT|PUT IT DOWN|CONTINUE|OK\b|LATER|FOLD IT UP|GO!|STOP)/i;
const SEL='button,a[href],input:not([type=hidden]),select,textarea,[role=button],[tabindex]:not([tabindex="-1"]),[data-k],[data-a],[data-r],[data-t],[data-s],[data-drop],[data-id]';
let held={},rep={},prevB=[],prevD={l:0,r:0,u:0,d:0},nav={},cur=null,list=[],scanT=0,ui=!1,cinema=!1,ptrMode=!1,
  cursor={x:innerWidth/2,y:innerHeight/2,free:0,last:0,down:null},hp=null,hpT=0,seen=0,rumbleOk=!0,cursorEl=null;
const gmOn=()=>typeof GM!=="undefined"&&GM&&GM.on;
const key=(k,d)=>{try{document.dispatchEvent(new KeyboardEvent(d?"keydown":"keyup",{key:k,bubbles:!0,cancelable:!0}));}catch(e){}};
const setKey=(k,on)=>{if(!!held[k]===on)return;held[k]=on;key(k,on);};
const tap=(k)=>{key(k,!0);key(k,!1);};
const releaseAll=()=>{for(const k in held)held[k]&&setKey(k,!1);rep={};};
/* ---------- the pad ---------- */
function getPad(){let list2;try{list2=navigator.getGamepads?navigator.getGamepads():[];}catch(e){return null;}
  for(const g of list2)if(g&&g.connected&&g.buttons&&g.buttons.length>=10)return g;return null;}
function rumble(ms,s,w){if(!rumbleOk)return;const g=getPad();if(!g)return;try{const a=g.vibrationActuator;a&&a.playEffect&&a.playEffect("dual-rumble",{startDelay:0,duration:ms||180,strongMagnitude:s==null?0.7:s,weakMagnitude:w==null?0.5:w});}catch(e){rumbleOk=!1;}}
window.__evoRumble=rumble;
function hint(){try{window.__evoJournal&&window.__evoJournal.notify("CONTROLLER READY","A jump · B use · X punch · RT shoot · START pause",0);}catch(e){}}
addEventListener("gamepadconnected",()=>{seen=0;});
addEventListener("gamepaddisconnected",()=>{releaseAll();clearFocus();hideCursor();});
/* ---------- finding what can be pressed ---------- */
function shown(s){const e=$(s);if(!e||e.closest("[hidden]"))return!1;const r=e.getBoundingClientRect();return r.width>2&&r.height>2;}
function vis(e){if(e.disabled||e.closest("[hidden]")||e.closest("#gp")||HUD.has(e.id))return 0;const r=e.getBoundingClientRect();if(r.width<6||r.height<6)return 0;
  const x0=Math.max(0,r.left),x1=Math.min(innerWidth,r.right),y0=Math.max(0,r.top),y1=Math.min(innerHeight,r.bottom);if(x1-x0<4||y1-y0<4)return 0;
  const t=document.elementFromPoint((x0+x1)/2,(y0+y1)/2);return t&&(t===e||e.contains(t))?1:0;}
function scan(){let els=[...document.querySelectorAll(SEL)];const ov=document.querySelectorAll(".gov:not([hidden]) *,#tnBP:not([hidden]) *,#gx:not([hidden]) *");
  for(const e of ov)if(!e.matches(SEL)&&getComputedStyle(e).cursor==="pointer")els.push(e);
  els=els.filter((e)=>!els.some((o)=>o!==e&&e.contains(o)));list=els.filter(vis);
  cinema=list.length>0&&list.every((e)=>SKIPS.has(e.id));ptrMode=shown("#c3wc")||shown("#tkc")||shown("#tnBP")||shown("#gx");
  ui=!gmOn()||(list.length>0&&!cinema);
  if(!list.includes(cur)){clearFocus();cur=ui?pick():null;setFocus();}}
function pick(){return list.find((e)=>e.matches(".gbtn:not(.alt),.play,.btn.play"))||list.slice().sort((a,b)=>{const A=a.getBoundingClientRect(),B=b.getBoundingClientRect();return A.top-B.top||A.left-B.left;})[0]||null;}
function clearFocus(){if(cur&&cur.classList)cur.classList.remove("evo-padfocus");}
function setFocus(){if(cur&&cur.classList&&ui){cur.classList.add("evo-padfocus");try{cur.scrollIntoView({block:"nearest",inline:"nearest"});}catch(e){}}}
function center(e){const r=e.getBoundingClientRect();return[Math.max(2,Math.min(innerWidth-2,r.left+r.width/2)),Math.max(2,Math.min(innerHeight-2,r.top+r.height/2))];}
function move(dx,dy){if(!list.length)return;if(!cur||!list.includes(cur)){cur=pick();setFocus();return;}const[cx,cy]=center(cur);let best=null,bs=1e9;
  for(const e of list){if(e===cur)continue;const[x,y]=center(e),vx=x-cx,vy=y-cy,al=vx*dx+vy*dy,pp=Math.abs(vx*dy-vy*dx);if(al<4)continue;const sc=al+2.2*pp;if(sc<bs){bs=sc;best=e;}}
  if(best){clearFocus();cur=best;setFocus();cursor.free=0;hideCursor();const[x,y]=center(best);cursor.x=x;cursor.y=y;}}
/* ---------- virtual pointer (for drag screens) ---------- */
function ensureCursor(){if(cursorEl)return cursorEl;cursorEl=document.createElement("div");cursorEl.id="evoPadCursor";
  cursorEl.style.cssText="position:fixed;z-index:99999;width:22px;height:26px;pointer-events:none;display:none;left:0;top:0;filter:drop-shadow(1px 2px 0 #000)";
  cursorEl.innerHTML='<svg viewBox="0 0 22 26" width="22" height="26" shape-rendering="crispEdges"><path d="M1 1v20l5-5 4 9 4-2-4-9h7z" fill="#ffe070" stroke="#1a1408" stroke-width="2" stroke-linejoin="round"/></svg>';document.body.appendChild(cursorEl);return cursorEl;}
function showCursor(){ensureCursor().style.display="block";cursorEl.style.transform="translate("+Math.round(cursor.x)+"px,"+Math.round(cursor.y)+"px)";}
function hideCursor(){cursorEl&&(cursorEl.style.display="none");}
function pev(type,t,x,y,b){const init={bubbles:!0,cancelable:!0,composed:!0,clientX:x,clientY:y,screenX:x,screenY:y,button:0,buttons:b?1:0,view:window};
  try{t.dispatchEvent(type.indexOf("pointer")===0?new PointerEvent(type,Object.assign({pointerId:1,pointerType:"mouse",isPrimary:!0},init)):new MouseEvent(type,init));}catch(e){}}
const clickable=(t)=>t&&t.closest&&t.closest('button,[role=button],a[href],label,[data-a],[data-r],[data-t],[data-s],[data-k],[data-drop],[data-id]');
function press(x,y){const t=document.elementFromPoint(x,y);if(!t)return;cursor.down={t,x0:x,y0:y,moved:0};pev("pointermove",t,x,y,0);pev("pointerdown",t,x,y,1);pev("mousedown",t,x,y,1);}
function drag(x,y){const d=cursor.down;if(!d)return;if(Math.hypot(x-d.x0,y-d.y0)>6)d.moved=1;pev("pointermove",d.t,x,y,1);pev("mousemove",d.t,x,y,1);}
function release(x,y){const d=cursor.down;if(!d)return;cursor.down=null;pev("pointerup",d.t,x,y,0);pev("mouseup",d.t,x,y,0);
  if(!d.moved&&d.t.tagName!=="CANVAS"){const c=clickable(d.t);c&&c.click();}}
function activate(e){if(!e)return;if(e.tagName==="INPUT"&&/^(text|search|number|email|)$/.test(e.type||"")){e.focus();return;}
  if(/^(BUTTON|A|SELECT|LABEL)$/.test(e.tagName)||e.getAttribute("role")==="button"||e.type==="checkbox"||e.type==="radio"){e.click();return;}
  const[x,y]=center(e);press(x,y);release(x,y);}
function scroller(e){for(let n=e;n&&n!==document.body;n=n.parentElement){const cs=getComputedStyle(n);if(/(auto|scroll)/.test(cs.overflowY)&&n.scrollHeight>n.clientHeight+4)return n;}return null;}
/* ---------- the loop ---------- */
function frame(){requestAnimationFrame(frame);if(document.hidden)return;const g=getPad();
  if(!g){if(seen){seen=0;releaseAll();clearFocus();hideCursor();}return;}
  if(!seen){seen=1;hint();}
  const t=now(),ax=g.axes||[],B=(i)=>!!(g.buttons[i]&&(g.buttons[i].pressed||g.buttons[i].value>0.5)),V=(i)=>g.buttons[i]?g.buttons[i].value:0,
    lx=ax[0]||0,ly=ax[1]||0,rx=ax[2]||0,ry=ax[3]||0,
    edge=(i)=>{const on=B(i),was=!!prevB[i];prevB[i]=on;return on&&!was;},rel=(i)=>!B(i)&&!!prevB[i];
  if(t-scanT>110){scanT=t;try{scan();}catch(e){}}
  const dl=B(14)||lx<-DEAD,dr=B(15)||lx>DEAD,du=B(12)||ly<-0.55,dd=B(13)||ly>0.55;
  const aUp=rel(0);
  const bA=edge(0),bB=edge(1),bX=edge(2),bY=edge(3),bLB=edge(4),bRB=edge(5),bBack=edge(8),bStart=edge(9);
  const sk=$("#cskip"),cut=sk&&!sk.hidden&&sk.offsetParent!==null;
  const skipBtn=()=>list.find((e)=>SKIPS.has(e.id));
  /* ----- hp -> rumble ----- */
  if(gmOn()&&t-hpT>120){hpT=t;try{const h=GM.dbg().hp;if(hp!=null&&h<hp)rumble(260,0.9,0.6);hp=h;}catch(e){}}
  /* ----- cutscene / dream / radio skips: START or Y ----- */
  if(cinema||(cut&&!ui)){releaseAll();
    if(bStart||bY){const b=cinema?skipBtn():sk;b&&b.click();}
    return;}
  if(ui){releaseAll();
    if(ptrMode){const sp=(v)=>Math.abs(v)<DEAD?0:Math.sign(v)*Math.pow((Math.abs(v)-DEAD)/(1-DEAD),1.6)*16;
      const mx=sp(lx)+sp(rx),my=sp(ly)+sp(ry);if(mx||my){cursor.x=Math.max(0,Math.min(innerWidth-1,cursor.x+mx));cursor.y=Math.max(0,Math.min(innerHeight-1,cursor.y+my));cursor.free=1;cursor.last=t;
        if(cursor.down)drag(cursor.x,cursor.y);else{const el=document.elementFromPoint(cursor.x,cursor.y);el&&pev("pointermove",el,cursor.x,cursor.y,0);}}}
    else if(Math.abs(ry)>DEAD){const el=scroller(cur||document.elementFromPoint(innerWidth/2,innerHeight/2));el&&(el.scrollTop+=ry*16);}
    /* d-pad (and in menus the stick) move the highlight with key-repeat */
    const dirs=[["l",dl&&!ptrMode,-1,0],["r",dr&&!ptrMode,1,0],["u",du&&!ptrMode,0,-1],["d",dd&&!ptrMode,0,1]];
    const dpadDirs=[["l",B(14),-1,0],["r",B(15),1,0],["u",B(12),0,-1],["d",B(13),0,1]];
    for(const[k,on,dx,dy]of(ptrMode?dpadDirs:dirs)){const n=nav[k]||(nav[k]={on:0,at:0});if(on){if(!n.on){n.on=1;n.at=t+340;move(dx,dy);}else if(t>=n.at){n.at=t+120;move(dx,dy);}}else n.on=0;}
    const free=cursor.free&&(ptrMode||t-cursor.last<3500);
    if(free)showCursor();else hideCursor();
    if(bA){if(free)press(cursor.x,cursor.y);else activate(cur);}
    if(aUp&&cursor.down)release(cursor.x,cursor.y);
    if(shown("#c3Wire")){bX&&$("#c3wTest")&&$("#c3wTest").click();bY&&$("#c3wHint")&&$("#c3wHint").click();bLB&&$("#c3wNote")&&$("#c3wNote").click();bRB&&$("#c3wClr")&&$("#c3wClr").click();}
    if(bB){const c=list.find((e)=>CLOSE.test((e.textContent||"").trim()));if(c)c.click();else tap("Escape");}
    if(bStart&&gmOn()){const c=list.find((e)=>/^(STAY|CLOSE|DONE)/i.test((e.textContent||"").trim()));c&&c.click();}
    return;}
  /* ----- playing ----- */
  hideCursor();cursor.free=0;
  setKey("ArrowLeft",dl&&!dr);setKey("ArrowRight",dr&&!dl);
  setKey(" ",B(0));setKey("ArrowUp",du&&!B(0));
  if(bB)tap("e");if(bX)tap("j");
  const dn=dd;if(dn){const n=rep.dn||(rep.dn={at:0});if(t>=n.at){n.at=t+110;key("ArrowDown",!0);key("ArrowDown",!1);}}else rep.dn=null;
  const sh=B(7)||V(7)>0.4||B(5);if(sh){const n=rep.sh||(rep.sh={at:0});if(t>=n.at){n.at=t+130;tap("f");}}else rep.sh=null;
  if(bStart){if(cut)sk.click();else{const p=$("#evoPBtn");p&&p.click();}}
  if(bY){if(cut)sk.click();else{const b=$("#bagB");b&&b.click();}}
  if(bBack||bLB){const j=$("#evoJBtn");j&&j.click();}
}
const st=document.createElement("style");st.textContent=".evo-padfocus{outline:3px solid #ffe070!important;outline-offset:3px!important;box-shadow:0 0 0 6px rgba(255,224,112,.3)!important}";document.head.appendChild(st);
requestAnimationFrame(frame);
window.__evoPad={state:()=>({ui,cinema,ptrMode,items:list.length,cur:cur&&(cur.id||cur.className||cur.tagName),cursor:Object.assign({},cursor,{down:!!cursor.down}),held:Object.assign({},held)}),rescan:scan};
})();
