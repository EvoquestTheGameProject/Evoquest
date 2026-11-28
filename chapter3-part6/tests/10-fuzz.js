const run=require("./run.js");
run(async(p,E)=>{
 for(const dev of ["c3_wfol","c3_wfol2","c3_wdome","c3_wdome2","c3_wdark","c3_wdark2","c3_wlab","c3_wlab2","c3_wparts","c3_wgusher","c3_wsweeper","c3_whyper"]){
  await E((d)=>window.__evoP6.dev(d),dev);
  const r=await E(()=>{let seed=12345;const rnd=()=>{seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff;};const k=window.__evoP6.keys();let err=null;
    try{for(let i=0;i<2500;i++){if(i%20===0){k.l=rnd()<0.4?1:0;k.r=rnd()<0.5?1:0;k.u=rnd()<0.1?1:0;}
      if(rnd()<0.03)window.__evoP6.eval("useBuf=8");if(rnd()<0.03)window.__evoP6.eval("punchBuf=8");if(rnd()<0.04)window.__evoP6.eval("shootBuf=3");if(rnd()<0.02)window.__evoP6.eval("jumpBuf=8");
      if(window.__evoP6.eval("dead")){window.__evoP6.eval("document.querySelector('#gdR').click()");}
      if(window.__evoP6.eval("modal")){const ids=['#p6Pry','#p6Bench','#p6Tv','#p6Pick','#p6Tool','#p6End','#gk'];for(const id of ids){const e=document.querySelector(id);if(e&&!e.hidden){e.hidden=true;}}window.__evoP6.eval("modal=0");}
      window.__evoP6.step(1);if(i%50===0)window.__evoP6.eval("render()");}}catch(e){err=e.stack;}
    k.l=k.r=k.u=0;return JSON.stringify({room:window.__evoP6.room(),err});});
  console.log(dev,r.slice(0,300));}
});
