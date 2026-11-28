const {chromium}=require("playwright");
(async()=>{
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:960,height:540}});const p=await ctx.newPage();
 const errs=[];p.on("pageerror",e=>errs.push("PE "+e.message));
 await p.addInitScript(()=>{window.__evoSkipIntro=1;window.__evoP6Test=1;});
 const look={gd:0,hs:2,hc:2,sk:5,fc:0,ey:0,gl:0,bs:0,bc:2,mo:0,cl:3,oc:9,tc:3};
 await p.goto("file://"+require("path").resolve(__dirname,"../../EvoQuest_Cinematic_Edition_v52_3_0.html"));await p.waitForTimeout(1500);
 await p.evaluate((l)=>window.startGame("Tester",l),look);await p.waitForTimeout(500);
 for(const [dev,room,setup] of [["c3_wdark2","dark",null],["c3_wlab2","slab",null],["c3_wfol2","fol",null],["c3_wdome2","dome",null]]){
   await p.evaluate((d)=>{window.__evoP6.dev(d);window.__evoP6.step(10);window.__evoP6.eval("c2Save(room)");},dev);
   if(dev==="c3_wlab2")await p.evaluate(()=>{window.__evoP6.S().lab=1;window.__evoP6.eval("c2Save('slab')")});
   const keys=await p.evaluate(()=>Object.keys(localStorage).filter(k=>k.indexOf("cp")>=0));
   await p.reload();await p.waitForTimeout(1500);
   await p.evaluate((l)=>window.startGame("Tester",l),look);await p.waitForTimeout(1200);
   console.log(dev,"->",await p.evaluate(()=>JSON.stringify({room:window.__evoP6.room(),x:Math.round(window.__evoP6.player().x),y:Math.round(window.__evoP6.player().y),cut:window.__evoP6.C3().cut&&window.__evoP6.C3().cut.k,S:{kcp:window.__evoP6.S().kcp,wp:window.__evoP6.S().wp}})));
 }
 console.log(errs.join("\n")||"no errors");await b.close();})();
