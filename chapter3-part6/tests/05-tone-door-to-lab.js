const run=require("./run.js");
run(async(p,E)=>{
 await E(()=>window.__evoP6.dev("c3_wdark2"));
 await E(()=>{for(let i=0;i<5;i++)window.__evoP6.step(1)});
 const st=()=>E(()=>JSON.stringify({x:Math.round(window.__evoP6.player().x),y:Math.round(window.__evoP6.player().y),seq:window.__evoP6.eval("P6K.seq"),open:window.__evoP6.eval("P6K.open")}));
 // go to x=1215 tap
 const tapAt=async(x)=>{await E((x)=>{const pl=window.__evoP6.player();pl.x=x-13;pl.face=1;window.__evoP6.step(2);window.__evoP6.eval("punchBuf=3");window.__evoP6.step(12)},x);};
 await tapAt(1215);console.log("tap mid",await st());
 await tapAt(1262);console.log("tap high (wrong)",await st());
 await tapAt(1309);console.log("tap low",await st());
 await tapAt(1309);await tapAt(1215);await tapAt(1262);
 await E(()=>window.__evoP6.step(40));console.log("after right order",await st());
 await p.screenshot({path:"k4.png"});
 // walk into the door
 await E(()=>{window.__evoP6.player().x=1480;window.__evoP6.keys().r=1;window.__evoP6.step(40);window.__evoP6.keys().r=0;});
 await p.waitForTimeout(800);
 console.log(await E(()=>JSON.stringify({room:window.__evoP6.room()})));
});
