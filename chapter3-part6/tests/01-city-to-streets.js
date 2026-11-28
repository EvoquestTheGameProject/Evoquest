const run=require("./run.js");
run(async(p,E)=>{
 const st=()=>E(()=>JSON.stringify({room:window.__evoP6.room(),cut:window.__evoP6.C3().cut&&window.__evoP6.C3().cut.k,modal:window.__evoP6.eval("modal"),x:Math.round(window.__evoP6.player().x),on:window.__evoP6.S().on,cend:window.__evoP6.c7().cend,fol:window.__evoP6.S().fol}));
 await E(()=>window.__evoP6.dev("c3_uend"));
 await E(()=>{window.__evoP6.step(5);window.__evoP6.player().x=120;window.__evoP6.step(3)});
 console.log("start",await st());
 for(let k=0;k<30;k++){await E(()=>window.__evoP6.step(100));const s=JSON.parse(await st());if(s.cut!=="c5cityend"&&k>1)break;}
 console.log("after cityend",await st());
 await E(()=>window.__evoP6.step(20));
 console.log("after",await st());
 for(let k=0;k<30;k++){await E(()=>window.__evoP6.step(100));const s=JSON.parse(await st());if(!s.cut)break;}
 console.log("after crt cut",await st());
 await p.screenshot({path:"i1.png"});
 await E(()=>{window.__evoP6.keys().l=1;window.__evoP6.step(200);window.__evoP6.keys().l=0});
 await p.waitForTimeout(800);
 console.log("walked left",await st());
});
