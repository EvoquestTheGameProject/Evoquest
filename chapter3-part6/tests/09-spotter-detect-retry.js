const run=require("./run.js");
run(async(p,E)=>{
 await E(()=>window.__evoP6.dev("c3_wfol2"));
 await E(()=>{window.__evoP6.step(5)});
 console.log("start",await E(()=>JSON.stringify({x:window.__evoP6.player().x,gx:window.__evoP6.P6().f.gx})));
 // spotter detection: stand under the beam of the first spotter (x=930) for 60 frames
 await E(()=>{const P=window.__evoP6.eval("P6_SENT");const pl=window.__evoP6.player();window.__evoP6.eval("P6.f.gx=-500;P6.f.ws='gone'");pl.x=P[0].bx||930;window.__evoP6.step(1);});
 let al=0;for(let i=0;i<40;i++){al=await E(()=>{const P=window.__evoP6.eval("P6_SENT");window.__evoP6.player().x=P[0].bx;window.__evoP6.step(1);return window.__evoP6.P6().al});}
 console.log("al after 40 frames under beam",Math.round(al));
 for(let i=0;i<30;i++){await E(()=>{const P=window.__evoP6.eval("P6_SENT");window.__evoP6.player().x=P[0].bx;window.__evoP6.step(1)});}
 console.log("dead?",await E(()=>window.__evoP6.eval("dead")));
 await p.waitForTimeout(400);await p.screenshot({path:"s_dead.png"});
 await p.click("#gdR");await p.waitForTimeout(600);
 console.log("after retry",await E(()=>JSON.stringify({dead:window.__evoP6.eval("dead"),x:Math.round(window.__evoP6.player().x),gx:Math.round(window.__evoP6.P6().f.gx),room:window.__evoP6.room(),al:window.__evoP6.P6().al})));
 await p.screenshot({path:"s_retry.png"});
});
