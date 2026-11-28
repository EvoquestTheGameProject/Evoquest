const run=require("./run.js");
run(async(p,E)=>{
 const S=()=>E(()=>JSON.stringify({dis:window.__evoP6.S().dis,made:window.__evoP6.S().made,up:window.__evoP6.S().up,inv:window.__evoP6.eval("inv"),hasGun:window.__evoP6.eval("hasGun"),modal:window.__evoP6.eval("modal")}));
 await E(()=>window.__evoP6.dev("c3_wlab2"));
 await E(()=>{window.__evoP6.step(5);window.__evoP6.player().x=150;window.__evoP6.step(3);window.__evoP6.eval("useBuf=8");window.__evoP6.step(3)});
 await p.waitForTimeout(400);
 console.log("modal",await E(()=>window.__evoP6.eval("modal")), await p.evaluate(()=>!!document.querySelector("#p6Bench")&&!document.querySelector("#p6Bench").hidden));
 await p.screenshot({path:"b0.png"});
 // wrong order first
 const steps=await p.$$eval("#p6bStage [data-p6b]",els=>els.map(e=>e.dataset.p6b+"|"+e.textContent));console.log(steps);
 // click step:1 first (wrong)
 await p.click('[data-p6b="step:1"]');await p.waitForTimeout(100);
 console.log(await p.textContent("#p6bMsg"));
 for(const i of [0,1,2,3]){await p.click('[data-p6b="step:'+i+'"]');await p.waitForTimeout(150);}
 await p.waitForTimeout(1200);await p.screenshot({path:"b1.png"});
 console.log(await S());
 await p.click("#p6bOk");
 await E(()=>window.__evoP6.dev("c3_wparts"));
 await E(()=>{window.__evoP6.step(5);window.__evoP6.player().x=150;window.__evoP6.step(3);window.__evoP6.eval("useBuf=8");window.__evoP6.step(3)});
 await p.waitForTimeout(400);await p.screenshot({path:"b2.png"});
 const grid=await p.$$eval("#p6bStage .p6slot",els=>els.map(e=>e.textContent));console.log(grid);
 const sel=async(names)=>{const g=await p.$$eval("#p6bStage .p6slot",els=>els.map(e=>e.textContent));for(const n of names){const i=g.indexOf(n);await p.click('[data-p6b="sel:'+i+'"]');await p.waitForTimeout(60);}};
 // wrong combo
 await sel(["Steel Pipe","Copper Coil"]);await p.click('[data-p6b="combine"]');console.log("wrong:",await p.textContent("#p6bMsg"));await p.click('[data-p6b="clear"]');
 const craft=async(names)=>{await sel(names);await p.click('[data-p6b="combine"]');await p.waitForTimeout(1000);console.log("craft:",(await p.textContent("#p6bMsg")).slice(0,90));};
 await craft(["Steel Pipe","Pressure Gauge","Rubber Gasket"]);
 await craft(["Syringe Array","Copper Coil","Glass Ampoule"]);
 await craft(["Pressure Chamber","Injector Core"]);
 await craft(["Evolved Gland","Power Cell"]);
 await craft(["Venom Reactor","Catalyst Cell"]);
 await p.screenshot({path:"b3.png"});
 console.log(await S());
 await p.click('[data-p6b="choose"]');await p.waitForTimeout(500);await p.screenshot({path:"b4.png"});
 await p.click('[data-p6k="hypervex"]');await p.waitForTimeout(200);await p.click("#p6pkGo");
 await p.waitForTimeout(300);
 await E(()=>{for(let i=0;i<800;i++)window.__evoP6.step(1)});
 await p.waitForTimeout(800);
 console.log(await S());await p.screenshot({path:"b5.png"});
});
