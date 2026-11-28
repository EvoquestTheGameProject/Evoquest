const run=require("./run.js");
run(async(p,E)=>{
 await E(()=>window.__evoP6.dev("c3_wfol"));
 await E(()=>{window.__evoP6.C3().cut&&window.__evoP6.eval("c3Skip()");window.__evoP6.step(5)});
 // bot: stay hidden at covers, hopping to the next cover when the group is far
 const covers=[1580,1330,1090,960,830,640,540,400,300,170];
 let ci=0;
 await E((covers)=>{window.__evoP6.player().x=covers[0]-4;window.__evoP6.step(3);window.__evoP6.eval("useBuf=8");window.__evoP6.step(3)},covers);
 for(let k=0;k<400;k++){
   const r=await E((covers)=>{const P=window.__evoP6.P6(),f=P.f,pl=window.__evoP6.player();
     for(let i=0;i<30;i++)window.__evoP6.step(1);
     return JSON.stringify({gx:Math.round(f.gx),ws:f.ws,wp:f.wp,hide:P.hide,x:Math.round(pl.x),room:window.__evoP6.room(),al:P.al,S:window.__evoP6.S().fol});},covers);
   const o=JSON.parse(r);
   if(k%20===0)console.log(r);
   if(o.room!=="fol")break;
   // hop: if hidden and gap between player and rear >150 and no look in progress, go to next cover left
   const act=await E((covers)=>{const P=window.__evoP6.P6(),f=P.f,pl=window.__evoP6.player();if(f.look>0||f.tel>0)return "wait";
     const rear=f.gx+90;const next=covers.filter(c=>c<P.hidX-10&&c>rear+60).sort((a,b)=>b-a)[0];
     if(next==null)return f.ws==="gone"?"free":"stay";
     if(P.hide){window.__evoP6.eval("useBuf=8");window.__evoP6.step(3);}
     pl.x=next+4;window.__evoP6.step(2);window.__evoP6.eval("useBuf=8");window.__evoP6.step(3);return "hop "+next;},covers);
   if(act==="free"){await E(()=>{window.__evoP6.eval("useBuf=8");window.__evoP6.step(3);window.__evoP6.keys().l=1;window.__evoP6.step(400);window.__evoP6.keys().l=0;});console.log("free walking");}
 }
 await p.waitForTimeout(600);
 console.log("final",await E(()=>JSON.stringify({room:window.__evoP6.room(),S:window.__evoP6.S().fol,cut:window.__evoP6.C3().cut&&window.__evoP6.C3().cut.k})));
 await p.screenshot({path:"i2.png"});
});
