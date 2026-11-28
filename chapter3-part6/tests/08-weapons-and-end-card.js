const run=require("./run.js");
run(async(p,E)=>{
 for(const [dev,setup] of [["c3_wgusher",()=>{window.__evoP6.player().x=1290}],["c3_wsweeper",()=>{window.__evoP6.player().x=1262}],["c3_whyper",()=>{window.__evoP6.player().x=1262}]]){
  await E((d)=>window.__evoP6.dev(d),dev);await E(setup);
  let ended=false;
  for(let k=0;k<60&&!ended;k++){await E(()=>{window.__evoP6.player().face=1;window.__evoP6.eval("ammo=Math.max(ammo,3)");window.__evoP6.eval("shootBuf=3");window.__evoP6.step(30)});
    ended=await E(()=>window.__evoP6.S().test==1);}
  console.log(dev,"test done:",ended,await E(()=>JSON.stringify({kills:window.__evoP6.P6W().kills,pods:window.__evoP6.P6W().pods})));
  await p.waitForTimeout(2300);await E(()=>{window.__evoP6.step(20)});
  console.log(" cut",await E(()=>window.__evoP6.C3().cut&&window.__evoP6.C3().cut.k));
  await E(()=>{window.__evoP6.step(800)});await p.waitForTimeout(300);
  console.log(" end card visible",await p.evaluate(()=>{const e=document.querySelector("#p6End");return !!e&&!e.hidden;}));
  if(dev==="c3_whyper")await p.screenshot({path:"end1.png"});
  await p.evaluate(()=>{const e=document.querySelector("#p6End");e&&(e.hidden=true);window.__evoP6.eval("modal=0")});
 }
});
