#!/usr/bin/env node
/* Sanity checks (no dependencies):
   1. the build succeeds, 2. every inline script compiles, 3. no unresolved placeholders,
   4. the committed single-file HTML is up to date with src/ (so what you ship == what you edit). */
const fs=require("fs"),path=require("path"),vm=require("vm"),cp=require("child_process"),os=require("os");
const root=path.join(__dirname,"..");
const tmp=path.join(os.tmpdir(),"evoquest-check-"+process.pid+".html");
cp.execFileSync(process.execPath,[path.join(root,"build.js"),"--out",tmp],{stdio:"inherit"});
const html=fs.readFileSync(tmp,"utf8");let n=0;
for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)){
  if(/type="application\/json"/.test(m[1]))continue;
  try{new vm.Script(m[2],{filename:"inline-script-"+(++n)})}catch(e){console.error("SYNTAX ERROR in inline script",n,e.message);process.exit(1)}
}
if(/@@(B64|DATAURI)/.test(html)){console.error("unresolved asset placeholder in output");process.exit(1)}
const shipped=path.join(root,"EvoQuest_Cinematic_Edition_v48 2.html");
if(!fs.existsSync(shipped)||fs.readFileSync(shipped,"utf8")!==html){console.error("The committed HTML is out of date. Run: node build.js");process.exit(1)}
fs.unlinkSync(tmp);console.log("OK: "+n+" scripts compile, build is up to date");
