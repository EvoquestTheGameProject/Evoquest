const run=require("./run.js");
run(async(p,E)=>{
 await E(()=>window.__evoP6.dev("c3_wdark"));
 await E(()=>{for(let i=0;i<30;i++)window.__evoP6.step(1)});
 await p.screenshot({path:"k0.png"});
 await E(()=>{for(let i=0;i<580;i++)window.__evoP6.step(1)});
 console.log(await E(()=>JSON.stringify({cut:window.__evoP6.C3().cut,y:window.__evoP6.player().y,x:window.__evoP6.player().x})));
 // scream
 await E(()=>{window.__evoP6.eval("shootBuf=3");window.__evoP6.step(40)});await p.screenshot({path:"k1.png"});
 await E(()=>{window.__evoP6.step(60)});await p.screenshot({path:"k2.png"});
 // walk right up the stairs
 await E(()=>{window.__evoP6.keys().r=1;for(let i=0;i<110;i++)window.__evoP6.step(1);window.__evoP6.keys().r=0;});
 console.log(await E(()=>JSON.stringify({y:window.__evoP6.player().y,x:window.__evoP6.player().x,on:window.__evoP6.player().on})));
 await E(()=>{window.__evoP6.eval("shootBuf=3");window.__evoP6.step(50)});await p.screenshot({path:"k3.png"});
});
