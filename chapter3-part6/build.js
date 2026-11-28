#!/usr/bin/env node
/* EvoQuest: Chapter 3, Part 6 build.
   Takes the v52.2.0 game file (base/) and adds the new part to it:
     * src/*.js   are inserted, in filename order, at the end of the game's main script (inside the game closure, so they
                   share its scope, exactly like every earlier chapter part does)
     * patch/journal.js  adds research notes, achievements and a creature entry to the journal script
   usage: node build.js [--out <file>]     (no dependencies) */
const fs=require("fs"),path=require("path"),vm=require("vm");
const ROOT=__dirname,BASE=path.join(ROOT,"base","EvoQuest_Cinematic_Edition_v52_2_0.html");
const OUT=(()=>{const i=process.argv.indexOf("--out");return i>0?path.resolve(process.argv[i+1]):path.join(ROOT,"..","EvoQuest_Cinematic_Edition_v52_3_0.html");})();
const MARK="/* ======================= END CHAPTER 2, PART 3 ======================= */";
let out=fs.readFileSync(BASE,"utf8");
if(out.split(MARK).length!==2)throw new Error("insertion marker not found exactly once in the base file");
const code=fs.readdirSync(path.join(ROOT,"src")).filter((f)=>f.endsWith(".js")).sort().map((f)=>fs.readFileSync(path.join(ROOT,"src",f),"utf8")).join("\n");
if(/<\/script/i.test(code))throw new Error("a source file contains </script");
out=out.replace(MARK,()=>code+"\n"+MARK);
/* journal additions: each anchor must exist exactly once */
const J=require("./patch/journal.js");
const once=(re,fn)=>{const m=out.match(re);if(!m||out.split(m[0]).length!==2)throw new Error("journal anchor not found exactly once: "+re);out=out.replace(m[0],fn);};
once(/\];\s*\n\s*const CONCEPTS = \[/,()=>J.creatures+"];\n\nconst CONCEPTS = [");
once(/\];\s*\n\s*const RULES = \[/,()=>J.concepts+"];\n\nconst RULES = [");
once(/  \{ id: "scholar", n: "SCHOLAR"/,()=>J.ach+'  { id: "scholar", n: "SCHOLAR"');
once(/  if \(d\.room === "river"\) see\("beaver"\);\n/,()=>'  if (d.room === "river") see("beaver");\n'+J.see);
/* syntax-check the script that now holds the new code and the journal script (a typo would otherwise show up only as a blank screen) */
{const at=out.indexOf(MARK),st=out.lastIndexOf("<script",at),from=out.indexOf(">",st)+1,to=out.indexOf("</script>",at);
  const block=out.slice(from,to);try{new vm.Script(block,{filename:"game-script"});}catch(e){throw new Error("syntax error in the game script: "+e.message);}
  const j=out.indexOf('<script id="evoJournal">'),jt=out.indexOf("</script>",j);try{new vm.Script(out.slice(j+24,jt),{filename:"journal-script"});}catch(e){throw new Error("syntax error in the journal script: "+e.message);}}
fs.writeFileSync(OUT,out);
console.log("built",path.relative(process.cwd(),OUT),(Buffer.byteLength(out)/1024).toFixed(0)+" KB");
