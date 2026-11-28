/* Ambient sound for the new rooms, with no rain-like hiss (the earlier "city_ruin" bed has a broadband high-pass noise that
   sounds like rain, and there is no rain here). Inserted by build.js into the audio script, next to the other ROOMS. */
module.exports=`ROOMS.p6_street=(a)=>{a.noise({f:150,v:0.1,brown:1,lfoV:[0.07,0.04]});a.noise({f:420,type:"bandpass",q:1.6,v:0.016,lfoV:[0.11,0.012]});a.osc({f:44,type:"triangle",lp:150,v:0.04,lfoV:[0.13,0.02]});a.ev(5,11,D.howl||D.rustle);a.ev(8,15,D.growl||D.creak);a.ev(6,13,D.creak||D.rustle);a.ev(3,8,D.clink||D.rustle);};
ROOMS.p6_dome=(a)=>{a.noise({f:130,v:0.07,brown:1,lfoV:[0.1,0.03]});a.noise({f:620,type:"bandpass",q:3.2,v:0.02,lfoF:[0.09,260],lfoV:[0.13,0.012]});a.osc({f:58,type:"sine",v:0.025,lfoV:[0.2,0.01]});a.ev(4,9,D.creak||D.rustle);a.ev(3,8,D.clink||D.drip);a.ev(6,13,D.drip||D.rustle);a.ev(11,20,D.clang||D.creak);};
ROOMS.p6_dark=(a)=>{a.noise({f:90,v:0.05,brown:1,lfoV:[0.06,0.02]});a.osc({f:38,type:"sine",v:0.02,lfoV:[0.08,0.01]});a.ev(2.5,6,D.drip||D.rustle);a.ev(9,18,D.creak||D.rustle);};
`;
