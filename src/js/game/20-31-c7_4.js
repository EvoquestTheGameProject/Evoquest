/* ---------------- developer tools: the island and the tower ---------------- */
C3_DEVBTN.push(["CHAPTER 3: ISLAND AND TOWER",[["c3_yland","ISLAND: ARRIVE (INTRO)"],["c3_ylook","ISLAND: PLAY THE LOOKOUT SCENE"],["c3_yfar","ISLAND: GO TO THE TOWER DOOR"],["c3_yctl","CONTROL ROOM (FIRST VISIT)"],["c3_ysaid","CONTROL ROOM: TRY TO BROADCAST"],["c3_ygen","GENERATOR ROOM"],["c3_ymat","GIVE THE FILTER MATERIALS"],["c3_ygopen","OPEN THE GENERATOR SCREEN"],["c3_ygnext","GENERATOR: SKIP TO THE NEXT STAGE"],["c3_ygfix","GENERATOR: MARK FIXED"],["c3_yend","SHOW THE END CARD"],["c3_yreset","RESET ISLAND PROGRESS"]]]);
{const _p=c3DevPre;c3DevPre=function(a){if(a!=="isle"&&a!=="tctl"&&a!=="tgen")return _p(a);_p("motor");
  const S5=c5S(),I=c7S();S5.done=1;S5.sim.fin=1;S5.gen.run=1;I.land=1;if(a==="tctl"||a==="tgen"){I.look=1;I.door=1;I.ctl=1;}if(a==="tgen"){I.said=1;I.tried=1;}};}
{const _dev=c3Dev;c3Dev=function(a){if(a.slice(0,4)!=="c3_y")return _dev(a);c7Dev(a);};}
function c7DevGo(rm,x){modal=0;Oo=0;Do.hidden=!0;qs("#gd").hidden=!0;dead=!1;hp=Math.max(hp,5);c3CloseAll();C3.once={};c3DevPre(rm);enterRoom(rm,"L");if(x!=null){player.x=x;player.y=C2_FLOOR;camX=c3Clamp(x-96,0,rooms[rm].W-192);}updateGuide();}
function c7Dev(a){const close=()=>{modal=0;Oo=0;Do.hidden=!0;},I=c7S();
  if(a==="c3_yreset"){c5S().isl=c7Fresh();close();c3CloseAll();toast("Island progress reset.",1600);return;}
  if(a==="c3_yland"){close();c3DevPre("isle");I.land=0;I.look=0;enterRoom("isle","L");return;}
  if(a==="c3_ylook"){close();c7DevGo("isle",C7_LOOK);I.look=0;c3CutStart("c5look");return;}
  if(a==="c3_yfar"){close();c7DevGo("isle",C7_TD-60);I.look=1;updateGuide();return;}
  if(a==="c3_yctl"){close();c3DevPre("tctl");I.ctl=0;I.said=0;I.tried=0;I.gen=0;enterRoom("tctl","R");return;}
  if(a==="c3_ysaid"){close();c7DevGo("tctl",200);I.said=0;I.tried=0;I.gen=0;c3CutStart("c5said");return;}
  if(a==="c3_ygen"){close();c7DevGo("tgen",48);return;}
  if(a==="c3_ymat"){Object.assign(I.mat,{gravel:1,sand:1,coal:1,cloth:1});updateGuide();toast("Filter materials given.",1400);return;}
  if(a==="c3_ygopen"){close();if(room!=="tgen")c7DevGo("tgen",200);c7GenOpen();return;}
  if(a==="c3_ygnext"){close();if(!C7G){if(room!=="tgen")c7DevGo("tgen",200);c7GenOpen();}const G=C7G;if(G.st===0){I.chk=[1,1,1];c7GenAct("off");}else if(G.st===1)G.temp=58;else if(G.st===2){Object.assign(I.mat,{gravel:1,sand:1,coal:1,cloth:1});G.filt=C7_ORDER.slice();c7Adv(3,"Filter built (dev).");}else if(G.st===3)G.pour=0.99;else if(G.st===4)G.flush=0.99;else if(G.st===5){G.fillGo=1;G.fill=0.99;}else if(G.st===6){G.run=1;G.temp=90;G.hold=149;}return;}
  if(a==="c3_ygfix"){close();c7GenClose();I.gen=1;I.gs=7;I.clean=1;I.flush=1;I.fill=1;Object.assign(I.mat,{gravel:1,sand:1,coal:1,cloth:1});updateGuide();toast("Generator marked fixed.",1400);return;}
  if(a==="c3_yend"){close();c7End();return;}}
GM.c3.genOpen=()=>c7GenOpen();GM.c3.genClose=()=>c7GenClose();
GM.c3.c7t=()=>{const o={};["isle","tctl","tgen"].forEach((id)=>{C5.tiles={};const t0=performance.now();backdrop(id);o[id]=Math.round(performance.now()-t0);});return o;};
