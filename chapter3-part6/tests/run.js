const {chromium}=require("playwright");
const fs=require("fs");
module.exports=async function(fn){
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:960,height:540}});
 const errs=[];p.on("pageerror",e=>errs.push("PE "+e.message));p.on("console",m=>{if(m.type()==="error")errs.push("CE "+m.text())});
 await p.addInitScript(()=>{window.__evoSkipIntro=1;window.__evoP6Test=1;});
 await p.goto("file://"+require("path").resolve(__dirname,"../../EvoQuest_Cinematic_Edition_v52_3_0.html"));await p.waitForTimeout(1500);
 await p.evaluate(()=>window.startGame("Tester",{gd:0,hs:2,hc:2,sk:5,fc:0,ey:0,gl:0,bs:0,bc:2,mo:0,cl:3,oc:9,tc:3}));
 await p.waitForTimeout(800);
 const E=(s,a)=>p.evaluate(s,a);
 try{await fn(p,E);}catch(e){errs.push("TEST "+e.stack);}
 console.log(errs.join("\n")||"no errors");await b.close();};
