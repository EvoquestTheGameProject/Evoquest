const run=require("./run.js");
run(async(p,E)=>{
 await E(()=>window.__evoP6.dev("c3_wdome2"));
 await E(()=>{window.__evoP6.step(5);window.__evoP6.player().x=340;window.__evoP6.step(3);window.__evoP6.eval("useBuf=8");window.__evoP6.step(3)});
 await p.waitForTimeout(500);
 console.log("overlay",await p.evaluate(()=>!document.querySelector("#p6Pry").hidden));
 await p.screenshot({path:"p0.png"});
 // pull at wrong time
 const phase=()=>E(()=>window.__evoP6.eval("p6PryPhase()"));
 for(let i=0;i<12;i++){await p.waitForTimeout(100);if((await phase())!=="relax")break;}
 await p.click("#p6pGo");await p.waitForTimeout(100);console.log("wrong:",(await p.textContent("#p6pMsg")).slice(0,80));
 await p.screenshot({path:"p1.png"});
 for(let n=0;n<4;n++){
   for(let i=0;i<200;i++){if((await phase())==="relax")break;await p.waitForTimeout(40);}
   await p.keyboard.press("e");await p.waitForTimeout(1200);console.log("pull",n+1,(await p.textContent("#p6pMsg")).slice(0,60));
   if(n===1)await p.screenshot({path:"p2.png"});
 }
 await p.waitForTimeout(2500);
 console.log("after",await E(()=>JSON.stringify({hatch:window.__evoP6.S().hatch,cut:window.__evoP6.C3().cut&&window.__evoP6.C3().cut.k,modal:window.__evoP6.eval("modal")})));
 await E(()=>{for(let i=0;i<530;i++)window.__evoP6.step(1)});
 await p.waitForTimeout(1500);
 console.log("room",await E(()=>JSON.stringify({room:window.__evoP6.room(),cut:window.__evoP6.C3().cut&&window.__evoP6.C3().cut.k})));
 await E(()=>{for(let i=0;i<580;i++)window.__evoP6.step(1)});
 console.log("dark",await E(()=>JSON.stringify({room:window.__evoP6.room(),route:window.__evoP6.S().route,x:window.__evoP6.player().x})));
});
