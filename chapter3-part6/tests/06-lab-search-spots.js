const run=require("./run.js");
run(async(p,E)=>{
 await E(()=>window.__evoP6.dev("c3_wlab2"));
 await E(()=>{window.__evoP6.step(5);window.__evoP6.eval("inv=inv.filter(t=>t!=='pcrow')")});
 const spots=await E(()=>window.__evoP6.eval("P6_LSPOT.map(q=>q[0]+':'+q[1])"));
 for(const s of spots){const [id,x]=s.split(":");
   const r=await E(([id,x])=>{const pl=window.__evoP6.player();pl.x=+x;pl.vx=0;window.__evoP6.eval("modal=0");window.__evoP6.step(3);window.__evoP6.eval("useBuf=8");window.__evoP6.step(80);
     const f=window.__evoP6.S().found[id];window.__evoP6.eval("modal=0");return JSON.stringify({id,found:!!f,task:!!window.__evoP6.C3().task,inv:window.__evoP6.eval("inv").length});},[id,x]);
   console.log(r);}
 // gland needs crowbar: give it and retry; power needs key
 await E(()=>{window.__evoP6.eval("inv.push('pcrow')");});
 for(const id of ["gland","power"]){const x=await E((id)=>window.__evoP6.eval("P6_LSPOT.find(q=>q[0]==='"+id+"')[1]"),id);
   const r=await E(([id,x])=>{const pl=window.__evoP6.player();pl.x=x;window.__evoP6.eval("modal=0");window.__evoP6.step(3);window.__evoP6.eval("useBuf=8");window.__evoP6.step(100);const f=window.__evoP6.S().found[id];window.__evoP6.eval("modal=0");return id+" "+f;},[id,x]);console.log(r);}
 await E(()=>{window.__evoP6.eval("inv.push('vkey')");const pl=window.__evoP6.player();});
 const r2=await E(()=>{const pl=window.__evoP6.player();pl.x=1205;window.__evoP6.eval("modal=0");window.__evoP6.step(3);window.__evoP6.eval("useBuf=8");window.__evoP6.step(100);return window.__evoP6.S().found.power;});
 console.log("power with key",r2,await E(()=>JSON.stringify(window.__evoP6.eval("inv"))));
});
