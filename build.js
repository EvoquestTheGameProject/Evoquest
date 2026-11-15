#!/usr/bin/env node
/* EvoQuest build: assembles src/ into ONE self-contained HTML file.
   usage: node build.js [--out <file>]            (no dependencies) */
const fs=require("fs"),path=require("path");
const ROOT=__dirname,SRC=path.join(ROOT,"src");
const OUT=(()=>{const i=process.argv.indexOf("--out");return i>0?path.resolve(process.argv[i+1]):path.join(ROOT,"EvoQuest_Cinematic_Edition_v48 2.html")})();
const read=f=>fs.readFileSync(path.join(SRC,f),"utf8");
const list=d=>fs.readdirSync(path.join(SRC,d)).filter(f=>f.endsWith(".js")).sort().map(f=>path.join(d,f));
const cat=files=>files.map(read).join("");
/* the game script: global-scope files first, then the game closure (its files are the body of one IIFE) */
const mainJs=()=>cat(list("js/main"))+"(()=>{"+cat(list("js/game"))+"})();";
const assets={};
const asset=n=>assets[n]||(assets[n]=fs.readFileSync(path.join(SRC,"assets",n)));
const MIME={png:"image/png"};
function resolveAssets(text){
  return text
   .replace(/@@B64:([\w.\-]+)@@/g,(m,n)=>asset(n).toString("base64"))
   .replace(/@@DATAURI:(\w+):([\w.\-]+)@@/g,(m,k,n)=>"data:"+MIME[k]+";base64,"+asset(n).toString("base64"));
}
let html=read("index.html");
html=html.replace(/\{\{css:([^}]+)\}\}/g,(m,f)=>read(f)).replace(/\{\{js:([^}]+)\}\}/g,(m,f)=>resolveAssets(read(f))).replace("{{main}}",()=>resolveAssets(mainJs()));
if(/\{\{(css|js|main)/.test(html))throw new Error("unresolved include left in output");
/* a stray "</script" inside inline code would end the script early */
const scripts=html.split(/<script\b/i).slice(1).map(s=>s.slice(s.indexOf(">")+1));
scripts.forEach((s,i)=>{const body=s.slice(0,s.search(/<\/script>/i));if(/<\/script/i.test(body.replace(/<\\\/script/g,"")))throw new Error("script "+i+" contains a raw </script")});
fs.writeFileSync(OUT,html);
console.log("built",path.relative(process.cwd(),OUT),(Buffer.byteLength(html)/1024).toFixed(0)+" KB");
