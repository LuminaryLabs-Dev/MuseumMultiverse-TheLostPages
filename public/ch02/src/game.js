/** Lost Pages Chapter 02: deterministic-ish platformer with no external runtime dependencies.
 * A frame is just a surface displaying this canvas; player/world state never depends on AR tracking. */
export const WIDTH = 1280, HEIGHT = 720;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const rand=(i)=>{let x=Math.sin(i*12.9898+98.13)*43758.545;return x-Math.floor(x)};
const basePlatforms=[
  {x:-90,w:710,y:593},{x:732,w:462,y:571},{x:1260,w:370,y:536},
  {x:1735,w:392,y:593},{x:2225,w:445,y:575},{x:2760,w:555,y:593},
  {x:374,w:132,y:457,kind:'ledge'},{x:952,w:144,y:465,kind:'ledge'},
  {x:1344,w:130,y:410,kind:'ledge'}, {x:1870,w:122,y:474,kind:'ledge'},
  {x:2390,w:165,y:460,kind:'ledge'},{x:2848,w:151,y:462,kind:'ledge'}
];
const collectibles=[{x:230,y:495},{x:1030,y:386},{x:1440,y:328},{x:1980,y:411},{x:2474,y:392}];
const switchData=[
  {x:548,y:548,label:'BRIDGE',message:'The ink bridge is forming!',id:'bridge'},
  {x:1530,y:490,label:'STAIRS',message:'The paper steps remember their shape.',id:'stairs'},
  {x:2631,y:525,label:'GATE',message:'The painted doorway has awakened.',id:'gate'}
];
const checkpoints=[{x:810,y:571},{x:1788,y:593},{x:2798,y:593}];
const enemies=[{x:1160,lo:1060,hi:1190,speed:52,y:552},{x:2060,lo:1830,hi:2090,speed:63,y:576}];
export class PaintingGame{
 constructor(canvas, handlers={}){
  this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});this.handlers=handlers;this.keys={left:false,right:false,jump:false};this.playing=false;this.reset();this.loop=this.loop.bind(this);this.last=0;requestAnimationFrame(this.loop);
 }
 reset(){this.time=0;this.tick=0;this.cam=0;this.ink=new Set();this.glyphs=new Set();this.player={x:115,y:593,vx:0,vy:0,w:29,h:62,grounded:true,coyote:0,jumpBuffer:0,face:1,anim:0};this.checkpoint={x:115,y:593};this.npcMessage='';this.particles=[];this.completed=false;this.activeTarget=null;this.lastObjective='';this.deaths=0;this.achievements=[];this.emitHUD();}
 start(){this.reset();this.playing=true;this.handlers.onToast?.('The paint is waking up. Find five ink stars.');}
 stop(){this.playing=false;this.keys.left=false;this.keys.right=false;this.keys.jump=false;}
 setMove(dir,down){if(dir<0)this.keys.left=down;else this.keys.right=down;}
 requestJump(){if(this.playing&&!this.completed)this.player.jumpBuffer=.16;}
 getPlatforms(){let p=[...basePlatforms];if(this.glyphs.has('bridge'))p.push({x:618,y:579,w:125,kind:'magic'});if(this.glyphs.has('stairs'))p.push({x:1598,y:502,w:85,kind:'magic'},{x:1667,y:538,w:80,kind:'magic'});return p;}
 getNearestInteractable(){const p=this.player;const possibilities=[];for(const g of switchData){if(!this.glyphs.has(g.id)&&Math.abs(p.x-g.x)<75&&Math.abs(p.y-g.y)<114)possibilities.push({type:'glyph',data:g,dist:Math.abs(p.x-g.x)});}
 if(Math.abs(p.x-3150)<110&&p.y>445)possibilities.push({type:'portal',data:{label:'PORTAL'},dist:Math.abs(p.x-3150)});
 possibilities.sort((a,b)=>a.dist-b.dist);return possibilities[0]||null;}
 interact(){if(!this.playing||this.completed)return false;let n=this.getNearestInteractable();if(!n)return false;
 if(n.type==='glyph'){this.glyphs.add(n.data.id);this.flash(n.data.x,n.data.y-60,18);this.handlers.onToast?.(n.data.message);this.emitHUD();return true;}
 if(n.type==='portal'){
  if(this.glyphs.size===3&&this.ink.size===5){this.completed=true;this.playing=false;this.handlers.onComplete?.({rewardId:'breathing-frame-mark',rewardName:'Canvas Whisper',ink:this.ink.size,glyphs:this.glyphs.size,deaths:this.deaths});return true;}
  this.handlers.onToast?.(`The portal needs ${3-this.glyphs.size} more glyphs and ${5-this.ink.size} ink stars.`);return false;
 }
 return false;}
 respawn(){this.deaths++;this.particles=[];this.player.x=this.checkpoint.x;this.player.y=this.checkpoint.y;this.player.vx=0;this.player.vy=0;this.player.grounded=true;this.player.jumpBuffer=0;this.handlers.onToast?.('JR returns to the last safe sketch.');}
 flash(x,y,count=8){for(let i=0;i<count;i++){const a=(i/count)*Math.PI*2;this.particles.push({x,y,vx:Math.cos(a)*(100+rand(i+this.tick)*110),vy:Math.sin(a)*(90+rand(i+3)*110)-40,life:.8+rand(i)*.7,size:3+rand(i+4)*4});}}
 emitHUD(){let goal='Collect the ink stars and awaken three frame glyphs.';if(this.glyphs.size===3&&this.ink.size===5)goal='The portal is open. Find the golden archway!';else if(this.player?.x>2800)goal='Reach the painting portal at the far end.';else if(this.player?.x>1630)goal='Explore the painted ruins and find the final glyph.';else if(this.player?.x>650)goal='Cross the living landscape. Jump to find hidden stars.';
 const signature=`${this.ink.size}:${this.glyphs.size}:${goal}`;if(signature!==this.lastObjective){this.lastObjective=signature;this.handlers.onHUD?.({ink:this.ink.size,glyphs:this.glyphs.size,goal});}}
 step(dt){if(!this.playing||this.completed)return;this.time+=dt;this.tick++;const p=this.player;const direction=(this.keys.right?1:0)-(this.keys.left?1:0);
 p.vx=direction*318;if(direction!==0)p.face=direction;p.anim+=(Math.abs(direction)*dt*12);p.coyote=p.grounded?.12:Math.max(0,p.coyote-dt);p.jumpBuffer=Math.max(0,p.jumpBuffer-dt);
 if(this.keys.jump)this.keys.jump=false;
 if(p.jumpBuffer>0&&(p.grounded||p.coyote>0)){p.vy=-738;p.grounded=false;p.coyote=0;p.jumpBuffer=0;this.flash(p.x,p.y,5);}
 const wasGrounded=p.grounded;const prevBottom=p.y;p.vy=Math.min(1300,p.vy+1750*dt);p.x=clamp(p.x+p.vx*dt,15,3290);p.y+=p.vy*dt;p.grounded=false;
 const platforms=this.getPlatforms();
 // Short painted-paper seams should not force a jump. Step up at most 24 px while walking.
 if(wasGrounded && prevBottom>0){
   const nearby=platforms.filter(plat=>plat.y<prevBottom && prevBottom-plat.y<=24 && p.x+p.w/2>plat.x && p.x-p.w/2<plat.x+plat.w);
   if(nearby.length){const highest=nearby.reduce((a,b)=>a.y<b.y?a:b);p.y=highest.y;p.vy=0;p.grounded=true;}
 }
 for(const plat of platforms){
  if(p.vy>=0&&p.x+p.w/2>plat.x&&p.x-p.w/2<plat.x+plat.w&&prevBottom<=plat.y+10&&p.y>=plat.y){p.y=plat.y;p.vy=0;p.grounded=true;break;}
 }
 if(p.y>HEIGHT+170)this.respawn();
 for(let i=0;i<collectibles.length;i++){const it=collectibles[i];if(!this.ink.has(i)&&Math.hypot(p.x-it.x,(p.y-p.h/2)-it.y)<57){this.ink.add(i);this.flash(it.x,it.y,20);this.handlers.onToast?.(`Ink star ${this.ink.size} of 5 collected`);this.emitHUD();}}
 for(let i=0;i<checkpoints.length;i++){let cp=checkpoints[i];if(p.x>cp.x+30&&this.checkpoint.x<cp.x){this.checkpoint={x:cp.x,y:cp.y};this.handlers.onToast?.('A new sketchpoint is saved.');}}
 for(const e of enemies){const sx=e.x+Math.sin(this.time*e.speed/80)*(e.hi-e.lo)/2;if(Math.abs(p.x-sx)<32&&Math.abs(p.y-e.y)<37){this.respawn();break;}}
 for(const dot of this.particles){dot.x+=dot.vx*dt;dot.y+=dot.vy*dt;dot.vy+=170*dt;dot.life-=dt;}this.particles=this.particles.filter(v=>v.life>0);
 this.cam=lerp(this.cam,clamp(p.x-360,0,2080),Math.min(1,dt*5));this.activeTarget=this.getNearestInteractable();this.handlers.onInteract?.(this.activeTarget?.data?.label||'');this.emitHUD();}
 loop(now){requestAnimationFrame(this.loop);let dt=Math.min(.055,(now-this.last)/1000||0);this.last=now;if(this.playing){let remaining=dt;while(remaining>0){let s=Math.min(remaining,1/120);this.step(s);remaining-=s;}}else this.time+=dt*.4;this.draw();}
 draw(){const c=this.ctx;const t=this.time;const cam=this.cam;const W=WIDTH,H=HEIGHT;c.save();c.clearRect(0,0,W,H);
 let sky=c.createLinearGradient(0,0,0,H);sky.addColorStop(0,'#182643');sky.addColorStop(.38,'#5b6489');sky.addColorStop(.74,'#e0a78b');sky.addColorStop(1,'#d7ab84');c.fillStyle=sky;c.fillRect(0,0,W,H);
 let sunX=1010-cam*.13,sunY=176;c.save();c.globalAlpha=.9;let sun=c.createRadialGradient(sunX,sunY,5,sunX,sunY,205);sun.addColorStop(0,'#fff4c9cc');sun.addColorStop(.2,'#fce6b488');sun.addColorStop(1,'#ffccaa00');c.fillStyle=sun;c.fillRect(sunX-205,sunY-205,410,410);c.fillStyle='#fae7ba';c.beginPath();c.arc(sunX,sunY,50,0,Math.PI*2);c.fill();c.restore();
 // hand-painted atmospheric cloud shapes
 for(let i=0;i<19;i++){let x=(i*238+62-cam*.1)%(W+400)-180;let y=64+rand(i)*205;let w=92+rand(i+19)*140;c.globalAlpha=.08+rand(i+7)*.1;c.fillStyle='#fff4da';c.beginPath();c.ellipse(x,y,w,13+rand(i+13)*11,-.09,0,Math.PI*2);c.fill();}c.globalAlpha=1;
 for(let layer=0;layer<3;layer++){let factor=.13+layer*.12;let base=440+layer*53;c.fillStyle=['#5c6781','#665970','#776779'][layer];c.beginPath();c.moveTo(0,720);for(let sx=-160;sx<W+240;sx+=24){let wx=sx+cam*factor;let y=base+Math.sin(wx*.004+layer*9)*33+Math.sin(wx*.013)*14;c.lineTo(sx,y);}c.lineTo(W,720);c.fill();}
 // far ruins, arches and tree silhouettes
 c.save();c.translate(-cam*.42,0);for(let i=0;i<21;i++){let x=i*190-120,h=90+rand(i+37)*130;c.fillStyle=i%2?'#66566e':'#6a5a6d';c.fillRect(x,496-h,18,h);c.fillRect(x+78,502-h*.88,18,h*.88);c.fillRect(x-7,496-h,110,15);c.fillStyle='#50455c';c.beginPath();c.arc(x+48,496-h,48,Math.PI,0);c.lineTo(x+96,496-h+12);c.lineTo(x,496-h+12);c.fill();}c.restore();
 c.save();c.translate(-cam,0);
 // painted swirls / whimsical vegetation
 for(let i=0;i<113;i++){const x=i*31+rand(i)*16;let groundY=593;if(x>732&&x<1194)groundY=571;if(x>1260&&x<1630)groundY=536;if(x>1735&&x<2127)groundY=593;if(x>2225&&x<2670)groundY=575;const h=18+rand(i+200)*46;c.strokeStyle=i%2?'#2b6e67':'#345e67';c.lineWidth=3;c.beginPath();c.moveTo(x,groundY);c.quadraticCurveTo(x-13,groundY-h*.5,x+2,groundY-h);c.stroke();c.fillStyle=i%7===0?'#f4c69f':'#72a5a2';c.beginPath();c.ellipse(x+2,groundY-h,3.5,6,.2,0,Math.PI*2);c.fill();}
 // ground and ledges painterly ink ledges
 for(const plat of this.getPlatforms()){
  const magic=plat.kind==='magic';let grad=c.createLinearGradient(0,plat.y,0,plat.y+100);grad.addColorStop(0,magic?'#e2bf87':plat.kind==='ledge'?'#586a81':'#42546a');grad.addColorStop(.14,magic?'#89779f':'#3e4e5b');grad.addColorStop(1,'#212b3e');c.fillStyle=grad;c.fillRect(plat.x,plat.y,plat.w,H-plat.y+200);
  c.fillStyle=magic?'#ffe7a1':'#b5b4a1';c.fillRect(plat.x,plat.y,plat.w,5);c.fillStyle=magic?'#e7b86e':'#659d95';c.fillRect(plat.x+2,plat.y+6,plat.w-4,5);
  for(let j=0;j<plat.w/38;j++){let xx=plat.x+16+j*38;c.fillStyle=magic?'#f2d59a55':'#c3aaa83d';c.fillRect(xx,plat.y+19+rand(j+plat.x)*16,11,2);}
 }
 // scenic archways and cover art
 for(let i=0;i<5;i++){let x=90+i*690,y=573;this.arch(c,x,y,i);}
 // pictorial glowing stars
 for(let i=0;i<collectibles.length;i++){if(this.ink.has(i))continue;let a=collectibles[i],b=Math.sin(t*4+i)*5;c.save();c.translate(a.x,a.y+b);c.shadowColor='#ffe2a2';c.shadowBlur=32;c.fillStyle='#f9e6bd';this.star(c,0,0,15,5,5);c.fill();c.shadowBlur=0;c.strokeStyle='#f3b98d';c.lineWidth=2;c.beginPath();c.arc(0,0,24+Math.sin(t*3+i)*2,0,Math.PI*2);c.stroke();c.restore();}
 // interactive glyph columns
 for(let i=0;i<switchData.length;i++){let g=switchData[i],isActive=this.glyphs.has(g.id),a=Math.sin(t*2+i)*4;c.fillStyle='#292c46';c.fillRect(g.x-23,g.y-33,46,34);c.fillStyle=isActive?'#ffe0a2':'#d9b893';c.fillRect(g.x-29,g.y-39,58,8);c.save();c.translate(g.x,g.y-69+a);c.shadowBlur=isActive?29:17;c.shadowColor='#ffce8a';c.fillStyle=isActive?'#f7e6b4':'#bcaacf';c.beginPath();c.moveTo(0,-19);c.lineTo(17,0);c.lineTo(0,19);c.lineTo(-17,0);c.closePath();c.fill();c.shadowBlur=0;c.strokeStyle='#4e2c62';c.lineWidth=2;c.stroke();c.fillStyle='#3f3553';c.font='bold 13px sans-serif';c.textAlign='center';c.fillText(isActive?'✓':String(i+1),0,5);c.restore();c.fillStyle='#e9d9b1';c.font='bold 14px sans-serif';c.textAlign='center';c.fillText(g.label,g.x,g.y+31);}
 // checkpoints are waypoints
 for(const cp of checkpoints){c.strokeStyle='#cab8ad66';c.lineWidth=2;c.beginPath();c.moveTo(cp.x,cp.y);c.lineTo(cp.x,cp.y-100);c.stroke();c.fillStyle='#dfcc95';c.beginPath();c.moveTo(cp.x,cp.y-100);c.lineTo(cp.x+34,cp.y-87);c.lineTo(cp.x,cp.y-72);c.fill();}
 // bobbing ink monsters - soft hazards
 for(let i=0;i<enemies.length;i++){let e=enemies[i],x=e.x+Math.sin(t*e.speed/80)*(e.hi-e.lo)/2,y=e.y-15+Math.sin(t*4+i)*5;c.save();c.translate(x,y);c.fillStyle='#2d2743';c.shadowColor='#ba6da9';c.shadowBlur=17;c.beginPath();c.moveTo(-18,17);c.bezierCurveTo(-31,-4,-9,-25,0,-20);c.bezierCurveTo(20,-26,33,0,18,16);c.closePath();c.fill();c.fillStyle='#ebd9d0';c.beginPath();c.arc(-7,-3,3,0,7);c.arc(7,-3,3,0,7);c.fill();c.restore();}
 // portal archway
 this.drawPortal(c,3150,593,this.glyphs.size===3&&this.ink.size===5,t);
 // hero
 this.drawJR(c,this.player,t);
 for(const dot of this.particles){c.globalAlpha=clamp(dot.life,0,1);c.fillStyle='#ffe5ae';this.star(c,dot.x,dot.y,dot.size,2,4);c.fill();}c.globalAlpha=1;
 c.restore();
 // hand-drawn top & side flourishes
 c.globalAlpha=.35;c.strokeStyle='#f8e9b3';c.lineWidth=3;c.strokeRect(12,12,W-24,H-24);c.globalAlpha=1;
 // parallax foreground
 c.fillStyle='#1b25344a';c.fillRect(0,H-34,W,34);
 if(!this.playing&&!this.completed){c.fillStyle='#130f2366';c.fillRect(0,0,W,H);c.font='italic 48px Georgia';c.textAlign='center';c.fillStyle='#f9eac8';c.fillText('An unfinished world waits for JR…',W/2,H/2+110);}
 c.restore();}
 star(c,x,y,outer,inner,points){c.beginPath();for(let i=0;i<points*2;i++){let r=i%2?inner:outer,a=i*Math.PI/points-Math.PI/2;let xx=x+Math.cos(a)*r,yy=y+Math.sin(a)*r;if(i===0)c.moveTo(xx,yy);else c.lineTo(xx,yy);}c.closePath();}
 arch(c,x,y,i){c.save();c.translate(x,y);c.strokeStyle=i%2?'#95839655':'#deb18c55';c.lineWidth=12;c.beginPath();c.moveTo(-62,0);c.lineTo(-62,-99);c.quadraticCurveTo(0,-170,62,-99);c.lineTo(62,0);c.stroke();c.lineWidth=3;c.strokeStyle='#f0d6ab33';c.stroke();c.restore();}
 drawPortal(c,x,bottom,open,t){c.save();c.translate(x,bottom);c.shadowColor=open?'#ffe2a5':'#816f9b';c.shadowBlur=open?50:10;c.fillStyle=open?'#e5b877':'#51415a';c.beginPath();c.moveTo(-69,0);c.lineTo(-69,-155);c.quadraticCurveTo(0,-255,69,-155);c.lineTo(69,0);c.closePath();c.fill();c.shadowBlur=0;c.fillStyle='#302a47';c.beginPath();c.moveTo(-51,0);c.lineTo(-51,-153);c.quadraticCurveTo(0,-230,51,-153);c.lineTo(51,0);c.closePath();c.fill();if(open){let g=c.createRadialGradient(0,-106,6,0,-106,96);g.addColorStop(0,'#fdf1be');g.addColorStop(.65,'#c78bab');g.addColorStop(1,'#63568c');c.fillStyle=g;c.fill();for(let i=0;i<12;i++){let px=Math.sin(i*2.3+t)*38,py=-35-rand(i)*150;c.fillStyle='#ffeed3';c.fillRect(px,py,3,3)}}c.fillStyle='#ead7ae';c.textAlign='center';c.font='bold 16px sans-serif';c.fillText('THE WAY HOME',0,31);c.restore();}
 drawJR(c,p,t){c.save();c.translate(Math.round(p.x),Math.round(p.y));c.scale(p.face,1);let bounce=p.grounded?Math.sin(p.anim*2)*Math.min(Math.abs(p.vx)/280,1)*2:0;c.translate(0,bounce);
 // paper shadow
 c.fillStyle='#15223566';c.beginPath();c.ellipse(0,3,22,6,0,0,Math.PI*2);c.fill();
 // back cloak and bag
 c.fillStyle='#2d4763';c.beginPath();c.moveTo(-13,-40);c.lineTo(-19,-9);c.lineTo(17,-9);c.lineTo(13,-44);c.fill();c.fillStyle='#ce986e';c.fillRect(-20,-35,10,20);
 // legs walking
 let stride=p.grounded?Math.sin(p.anim)*Math.min(1,Math.abs(p.vx)/100)*8:7;c.strokeStyle='#32263d';c.lineWidth=8;c.lineCap='round';c.beginPath();c.moveTo(-6,-17);c.lineTo(-9+stride,0);c.moveTo(7,-17);c.lineTo(10-stride,0);c.stroke();c.strokeStyle='#dab293';c.lineWidth=5;c.beginPath();c.moveTo(-13,-41);c.lineTo(-18+(stride*.4),-24);c.moveTo(14,-42);c.lineTo(20-(stride*.4),-24);c.stroke();
 // body painted jacket
 c.fillStyle='#538e9a';c.beginPath();c.moveTo(-14,-48);c.lineTo(12,-49);c.lineTo(17,-20);c.lineTo(-17,-20);c.closePath();c.fill();c.strokeStyle='#243854';c.lineWidth=2;c.stroke();c.fillStyle='#e9c79b';c.fillRect(-3,-46,5,16);
 // big paper head and curly hair
 c.fillStyle='#e2b78e';c.beginPath();c.ellipse(0,-66,20,21,0,0,Math.PI*2);c.fill();c.fillStyle='#24283d';c.beginPath();c.moveTo(-20,-69);c.bezierCurveTo(-30,-86,-9,-98,4,-90);c.bezierCurveTo(16,-95,25,-78,21,-67);c.lineTo(14,-78);c.lineTo(4,-79);c.lineTo(-9,-75);c.closePath();c.fill();
 c.fillStyle='#21263b';c.beginPath();c.arc(8,-65,2,0,Math.PI*2);c.fill();c.strokeStyle='#ae7158';c.lineWidth=1.5;c.beginPath();c.arc(7,-59,5,.2,1.7);c.stroke();
 // scarf
 c.strokeStyle='#e5b36c';c.lineWidth=7;c.beginPath();c.moveTo(-14,-49);c.quadraticCurveTo(-5,-43,13,-50);c.stroke();c.fillStyle='#f3ce85';c.fillRect(9,-50,5,15);c.restore();}
}
