/* The game can't be zoomed: no pinch, no double-tap, no auto-zoom on text boxes, no Ctrl+wheel / Ctrl+plus.
   And if the page ever does end up zoomed (an older version, an OS feature), it snaps straight back to normal size. */
(function(){
  var vv=window.visualViewport,meta=document.querySelector('meta[name=viewport]'),BASE="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover";
  var zoomed=function(){return!!(vv&&vv.scale>1.01);};
  /* iOS resets its zoom when the viewport tag is rewritten */
  var resetting=0,reset=function(){if(!meta||resetting)return;resetting=1;meta.setAttribute("content",BASE.replace("maximum-scale=1","maximum-scale=1.0001"));
    setTimeout(function(){meta.setAttribute("content",BASE);resetting=0;},60);try{window.scrollTo(0,0);}catch(e){}};
  vv&&vv.addEventListener("resize",function(){zoomed()&&setTimeout(function(){zoomed()&&reset();},250);});
  window.addEventListener("orientationchange",function(){setTimeout(reset,300);});
  document.addEventListener("focusout",function(e){var t=e.target;t&&/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)&&setTimeout(reset,80);},!0);
  /* pinch: never zoom in; if somehow zoomed, let a pinch-OUT through so nobody is ever stuck */
  var gest=function(e){if(zoomed()&&typeof e.scale==="number"&&e.scale<1)return;e.preventDefault();};
  ["gesturestart","gesturechange","gestureend"].forEach(function(t){document.addEventListener(t,gest,{passive:false});});
  document.addEventListener("touchmove",function(e){if(zoomed())return;if((e.touches&&e.touches.length>1)||(typeof e.scale==="number"&&e.scale!==1))e.preventDefault();},{passive:false});
  /* double-tap */
  var last=0;document.addEventListener("touchend",function(e){var now=Date.now(),t=e.target,ui=t&&t.closest&&t.closest("button,a,input,textarea,select,label,[role=button],[contenteditable]");
    if(now-last<=350&&!ui&&e.cancelable)e.preventDefault();last=now;},{passive:false});
  document.addEventListener("dblclick",function(e){e.preventDefault();},{passive:false});
  /* desktop: Ctrl/Cmd + wheel or trackpad pinch, and Ctrl/Cmd + plus/minus (Ctrl+0 still resets) */
  window.addEventListener("wheel",function(e){if(e.ctrlKey||e.metaKey)e.preventDefault();},{passive:false});
  window.addEventListener("keydown",function(e){if((e.ctrlKey||e.metaKey)&&/^(\+|=|-|_|Add|Subtract)$/.test(e.key))e.preventDefault();},!0);
  /* iOS zooms into any text box under 16px: keep text boxes at 16px on iPhone/iPad */
  var st=document.createElement("style");st.textContent="html,body{touch-action:manipulation;overscroll-behavior:none;-webkit-text-size-adjust:100%;text-size-adjust:100%}button,canvas,a,label{touch-action:manipulation}"+
    "@supports (-webkit-touch-callout:none){input,textarea,select,.pname{font-size:16px!important}}";document.head.appendChild(st);
  zoomed()&&reset();})();
