
/* ---------------- the helm: steering by radar through the storm ---------------- */
var C5_WP=[[0,45],[30,100],[5,160],[-25,215],[0,270],[10,330]],C5_CELLS=[[13,26,8],[15,74,10],[21,132,10],[-10,187,12],[-12,245,11],[6,300,10]],C5_RANGE=60;
var C5_SPD=0.05;
function c5HelmEnter(){const S=c5S(),sm=S.sim;sm.hit=0;C5.steer=0;
  if(!sm.ig){sm.ig=1;c3CutStart("c5helm");}
  rooms.helm.ints[0].x=96;}
function c5HelmStep(){const S=c5S(),sm=S.sim;if(C3.cut)return;sm.t++;sm.hit>0&&sm.hit--;
  const jamNow=!!sm.jam,dark=!!sm.black&&!S.gen.run;
  /* the trap door is only usable when something is wrong down below */
  const h=rooms.helm.ints[0];h.x=player.x;h.r=jamNow||dark?999:0;h.label="GO DOWN";h.ly=34;
  const inp=(keys.r?1:0)-(keys.l?1:0);C5.steer=inp;
  if(!dark){sm.wheel+=(inp-sm.wheel)*0.09;sm.h+=sm.wheel*0.017;}else sm.wheel*=0.96;
  const spd=dark?0:(jamNow?0.008:C5_SPD)*(sm.hit>0?0.55:1);sm.x+=Math.sin(sm.h)*spd;sm.y+=Math.cos(sm.h)*spd;
  if(jamNow&&sm.t%150===20)$sx("alarm");
  if(sm.t%300===150&&!dark)$sx("rumble");
  /* storm cells: lightning */
  if(!dark&&sm.hit<=0)for(const c of C5_CELLS){if(Math.hypot(c[0]-sm.x,c[1]-sm.y)<c[2]+1.5){c5Strike();break;}}
  /* the next blue circle */
  const W=C5_WP[sm.wp];
  if(W&&Math.hypot(W[0]-sm.x,W[1]-sm.y)<6&&!dark){sm.wp++;$sx("success");sm.flash=1;
    if(sm.wp===2&&sm.jams<1){sm.jam=1;S.cl={off:0,open:0,n:0,tg:[1,1,1,1,1,1],done:0};toast("<b>ENGINE JAMMED!</b><br>Seaweed and fishing nets are wrapped round the propeller. Press <b>USE</b> to go down the trap door to the motor room.",5200);c5Guide();}
    else if(sm.wp===4&&sm.jams<2){sm.jam=1;S.cl={off:0,open:0,n:0,tg:[1,1,1,1,1,1],done:0};toast("<b>ENGINE JAMMED AGAIN!</b><br>More nets in the propeller. Press <b>USE</b> and go below.",5200);}
    else if(sm.wp>=C5_WP.length){c3CutStart("c5arr");return;}
    else toast("<b>WAYPOINT REACHED.</b><br>A new blue circle appears on the radar. Keep following it.",2200);
    c5CP("helm","Waypoint "+Math.min(sm.wp,C5_WP.length));updateGuide();}
  /* a few kilometres from the Ridge Tower: the power fails */
  if(!sm.fin&&sm.wp===5){const F=C5_WP[5];if(Math.hypot(F[0]-sm.x,F[1]-sm.y)<=40){sm.fin=1;c3CutStart("c5black");}}}
function c5Strike(){const S=c5S(),sm=S.sim;if(C5_GODSTORM)return;sm.hit=140;sm.hull--;C5.fl=28;$sx("boom");$sx("crash");shake=Math.max(shake,16);hurtFlash=10;updateGuide();
  toast("<b>LIGHTNING STRIKE!</b><br>Hull "+Math.max(0,sm.hull)+"/5. Steer AROUND the red storm circles.",2600);
  if(sm.hull<=0){sm.hull=0;c5Die("STRUCK BY LIGHTNING","A ship in a thunderstorm is the tallest thing for miles, so lightning strikes it. The red circles on the radar are storm cells with heavy rain and strong electrical charge: keep well clear of them.");}}
/* ---------------- guide and arrow for all three rooms ---------------- */
function c5Guide(){const S=c5S(),sm=S.sim,g=qs("#ggb");qs("#gg h4 span").textContent="QUEST";let h="";
  if(room==="deck"){const n=S.opened.filter(Boolean).length;
    if(S.door)h="<b>Enter the control room.</b>";
    else if(S.hasKey)h="<b>You have the key!</b><br>Go to the control room door at the far RIGHT of the deck.";
    else if(!S.tried)h="<b>Get into the control room</b> at the far RIGHT of the deck.<br>Try the door first.";
    else h="<b>Find a replacement key.</b><br>Pry open the 5 cargo containers with your crowbar (3 good pries each). Opened: "+n+"/5.";}
  else if(room==="helm"){
    if(sm.black&&!S.gen.run)h="<b>POWER FAILURE!</b><br>Press USE to go down the trap door and fix the generator.";
    else if(sm.jam)h="<b>ENGINE JAMMED!</b><br>Press USE to go down the trap door and clear the propeller. (You can still steer.)";
    else h="<b>STEER</b> with &#9664; &#9654;. Follow the <b style=\"color:#6ab0ff\">BLUE</b> circle on the radar. Avoid the <b style=\"color:#ff6a5a\">RED</b> storm circles.<br>Hull: "+"&#9829;".repeat(Math.max(0,sm.hull))+"<br>Waypoint "+Math.min(sm.wp+1,C5_WP.length)+"/"+C5_WP.length;}
  else{const c=S.cl;
    if(sm.black&&!S.gen.run){const m=S.mat;h="<b>Fix the generator.</b><br>"+(m.belt?"&#10004; ":"&#9744; ")+"Rubber drive belt<br>"+(m.wire?"&#10004; ":"&#9744; ")+"Copper wire<br>"+(m.fuse?"&#10004; ":"&#9744; ")+"Fuse<br>Then use the <b>generator</b>.";}
    else if(sm.jam){h="<b>Clear the propeller.</b><br>"+(c.off?"&#10004; ":"&#9744; ")+"Stop the engine (lever)<br>"+(c.open?"&#10004; ":"&#9744; ")+"Open the access panel<br>"+(c.n>=6?"&#10004; ":"&#9744; ")+"Pull out the tangles into the bucket ("+c.n+"/6)<br>"+(c.done?"&#10004; ":"&#9744; ")+"Restart the engine";}
    else h="<b>All clear down here.</b><br>Climb the ladder at the far RIGHT.";}
  g.innerHTML=h;return!0;}
function c5Arrow(){if(modal||won||dead||C3.cut||C3.busy||C5PR||C5TR||C5GN)return;const S=c5S(),sm=S.sim;let t=null;
  if(room==="deck"){const open=S.opened.filter(Boolean).length;if(S.hasKey||!S.tried)t=C5_DOOR;else{let bd=1e9;C5_BX.forEach((x,i)=>{if(!S.opened[i]){const d=Math.abs(x-player.x);d<bd&&(bd=d,t=x);}});}}
  else if(room==="motor"){const c=S.cl,b=sm.black&&!S.gen.run;
    if(b){t=!S.mat.belt?262:!S.mat.wire?58:!S.mat.fuse?326:300;}
    else if(sm.jam){if(!c.off)t=345;else if(!c.open)t=165;else if(C5.carry)t=34;else if(c.n<6){let bd=1e9;[95,120,145,185,210,235].forEach((x,i)=>{if(c.tg[i]){const d=Math.abs(x-player.x);d<bd&&(bd=d,t=x);}});}else t=345;}
    else t=372;}
  if(t==null||Math.abs(t-player.x)<22)return;const d=t>player.x?1:-1;vo(player.x+d*16,player.y-44,d);}
/* ---------------- the cutscenes of the helm ---------------- */
{const _c=c5Cut;c5Cut=function(c){const k=c.k;
  if(k==="c5helm"){const t=c.t,S=c5S();c.cx=0;
    if(t===2)tnCap("A real ship's control room… a wheel, a radar, a hundred switches.");
    if(t===170)tnCap("The radar shows a BLUE circle: that's where I need to go. And those RED circles are thunderstorms. I'll steer around them.");
    if(t===380)tnCap("Wheel left, wheel right. Slow and steady.");
    if(t>=520){tnCap("");c3CutEnd();c5CP("helm","At the wheel");updateGuide();$sx("stinger");toast("<b>STEER THE SHIP</b><br>Hold &#9664; &#9654; (or A / D) to turn the wheel. Follow the <b style=\"color:#6ab0ff\">BLUE</b> circle, avoid the <b style=\"color:#ff6a5a\">RED</b> ones.",6000);}
    return;}
  return _c(c);};}
function c5CutBlack(c){const t=c.t,S=c5S(),sm=S.sim;c.cx=0;
  if(t===2){$sx("alarm");shake=10;C5.dark=1;tnCap("The lights…! The engine…! Everything just died!");}
  if(t===6)sm.black=1;
  if(t===200){$sx("rumble");tnCap("A few kilometres from the Ridge Tower, and we're drifting. It must be the generator, in the motor room.");}
  if(t>=420){tnCap("");c3CutEnd();c5CP("helm","Power failure");updateGuide();toast("<b>POWER FAILURE!</b><br>Press <b>USE</b> to go down the trap door and fix the generator.",5200);}}
function c5CutPower(c){const t=c.t,S=c5S(),sm=S.sim;c.cx=0;
  if(t===2){$sx("success");S.gen.run=1;sm.black=0;sm.pw=1;C5.dark=0;C5.fl=22;tnCap("The lights are back! And the radar's alive again!");}
  if(t===120)tnCap("Back on course. Not far now.");
  if(t>=240){tnCap("");c3CutEnd();c5CP("helm","Power restored");updateGuide();}}
function c5CutArr(c){const t=c.t,S=c5S();c.cx=0;C5.arr=c3Clamp(t/560,0,1);
  if(t===2){$sx("success");tnCap("Ridge Tower Island! I can see it through the rain!");c7Warm();}
  if(t===220)tnCap("The storm is thinning, and lights are coming on along the shore.");
  if(t===420){$sx("rumble");tnCap("Whatever happened out there, somebody has kept this place running. I wonder who…");}
  if(t===700){tnCap("");fadeTo=1;onFaded=()=>{C3.cut=null;tnBars(0);qs("#cskip").hidden=!0;c7Land();};}}
/* the end of this part of chapter 3 */
function c5End(){c5Css();
  const LEARN=["<b>Levers:</b> leverage = effort arm &divide; load arm. A pivot on a solid support, close to the load, with a long handle, gives the most force.","<b>Radar:</b> it sends out radio waves and listens for the echoes; the delay shows how far away something is, and the direction of the sweep shows where.","<b>Storms and ships:</b> lightning strikes the tallest object around, so ships steer clear of thunderstorms.","<b>Fouled propellers:</b> seaweed and lost fishing nets wrap round a propeller shaft. Always stop the engine before you reach into it.","<b>Generators:</b> a magnet spinning past a coil of wire pushes electrons along it (electromagnetic induction). More turns of wire or a faster spin gives more voltage; a fuse protects the circuit."];
  const el=c5Overlay("#c5End",'<div class="gcard c5sum"><h3>THE STORM CROSSING</h3><p style="font-size:8px;text-align:center;color:#b8c8e8;margin:2px 0 8px">You reached the Ridge Tower. Here is what you learned on the way.</p><div class="c5cols"><div><h4>WHAT YOU DID</h4><ul><li>Pried open cargo containers with a crowbar to find a key.</li><li>Steered a ship by radar through a thunderstorm.</li><li>Cleared seaweed and nets from the propeller.</li><li>Repaired the generator when the power failed.</li></ul></div><div><h4>WHAT YOU LEARNED</h4><ul>'+LEARN.map((x)=>"<li>"+x+"</li>").join("")+'</ul></div></div><p style="color:#ffe070;font-size:8px;text-align:center;margin:8px 0">THIS IS THE END OF THIS PART OF CHAPTER 3 FOR NOW. MORE IN A FUTURE UPDATE.</p><div class="btns"><button class="gbtn alt" id="c5eMenu">MENU</button></div></div>');
  modal=4;el.hidden=!1;fadeNow=1;fadeTo=1;$sx("success");qs("#c5eMenu").onclick=()=>{el.hidden=!0;modal=0;ee();};setTimeout(()=>qs("#c5eMenu").focus(),40);}
