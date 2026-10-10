import {PaintingGame} from './game.js';
import {ARController} from './ar.js';
const $=id=>document.getElementById(id);
const app=$('app');let stage='intro',toastTimer=null,where='play';let audioContext=null,soundEnabled=false;
const panels={intro:$('introPanel'),placement:$('placementPanel'),complete:$('completePanel'),help:$('helpPanel')};
const inputReady=()=>stage==='playing';
const beep=(frequency=660,duration=.12)=>{if(!soundEnabled)return;try{audioContext??=new (window.AudioContext||window.webkitAudioContext)();if(audioContext.state==='suspended')audioContext.resume();const oscillator=audioContext.createOscillator(),gain=audioContext.createGain(),now=audioContext.currentTime;oscillator.type='sine';oscillator.frequency.setValueAtTime(frequency,now);gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.05,now+.015);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);oscillator.connect(gain).connect(audioContext.destination);oscillator.start(now);oscillator.stop(now+duration+.02);}catch{soundEnabled=false;$('soundLabel').textContent='OFF';}};
const toast=text=>{if(/ink star/i.test(text))beep(880,.17);else if(/bridge|steps|doorway|portal is open/i.test(text))beep(600,.16);const el=$('toast');el.textContent=text;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600);};
function setStage(next){stage=next;panels.intro.hidden=next!=='intro';panels.placement.hidden=next!=='placement';panels.complete.hidden=next!=='complete';panels.help.hidden=next!=='help';$('hud').hidden=next!=='playing';$('controls').hidden=next!=='playing';$('restartButton').hidden=next!=='playing';$('interactPrompt').hidden=true;if(next==='intro'||next==='placement')app.dataset.mode='intro';if(next==='playing')app.dataset.mode=where;if(next==='complete')app.dataset.mode=where;$('modeLabel').textContent=next==='playing'?(where==='camera'?'CAMERA PREVIEW · SCREEN ALIGNED':where==='xr'?'WALL-ANCHORED AR':'GALLERY PLAY MODE'):'THE GALLERY IS QUIET';}
const game=new PaintingGame($('game'),{
 onToast:toast,onHUD:({ink,glyphs,goal})=>{$('inkCount').textContent=`✦ ${ink} / 5`;$('glyphCount').textContent=`◈ ${glyphs} / 3`;$('objective').textContent=goal;},
 onInteract:(name)=>{if(!inputReady())return;const el=$('interactPrompt');el.hidden=!name;if(name)el.innerHTML=`${name==='PORTAL'?'ENTER':'AWAKEN'} ${name} <b>E</b>`;},
 onComplete:(reward)=>{let saved=false;try{localStorage.setItem('lostpages.capsule.chapter02.v1',JSON.stringify({...reward,chapter:'02',completedAt:new Date().toISOString()}));saved=true;}catch{/* Storage denied or full; gameplay still completes. */}window.dispatchEvent(new CustomEvent('lostpages:chapter-complete',{detail:{pageId:'page02',rewardId:reward.rewardId,source:'capsule-local',savedInHost:false,localSaved:saved}}));document.querySelector('.reward-meta').textContent=saved?'✦ A NEW MEMORY HAS BEEN SAVED':'✦ CHAPTER COMPLETE · LOCAL SAVE UNAVAILABLE';setStage('complete');beep(988,.32);toast(saved?'Canvas Whisper saved in this capsule.':'Canvas Whisper earned. This browser could not save progress.');}
});
const ar=new ARController({app,canvas:$('xrCanvas'),source:$('game'),onStatus:(s)=>{$('modeLabel').textContent=s;},onLeave:()=>{if(stage==='playing'){where='play';app.dataset.mode='play';toast('AR session ended. Continuing in gallery mode.');}}});
$('beginButton').onclick=async()=>{setStage('placement');$('xrButton').hidden=!(await ARController.isSupported());};
$('backButton').onclick=()=>setStage('intro');
function startGame(mode){where=mode;game.start();setStage('playing');app.dataset.mode=mode;game.canvas.focus?.();}
$('desktopButton').onclick=()=>{ar.stopCamera($('camera'));startGame('play');};
$('cameraButton').onclick=async()=>{try{await ar.startCamera($('camera'));startGame('camera');toast('Preview only: the painting stays aligned to the screen.');}catch(err){toast(`Camera unavailable: ${err.message}. Starting gallery mode.`);startGame('play');}};
$('xrButton').onclick=async()=>{try{await ar.startXR();startGame('xr');toast('Aim at a vertical wall, then tap Place Painting.');}catch(err){toast(`AR not available: ${err.message}`);}};
$('replayButton').onclick=()=>startGame(where);
$('returnButton').onclick=async()=>{game.stop();await ar.end();ar.stopCamera($('camera'));where='play';window.location.assign(new URL('../', window.location.href));};
$('restartButton').onclick=()=>{game.respawn();};
$('howButton').onclick=()=>setStage('help');$('closeHelpButton').onclick=()=>setStage('intro');
$('soundButton').onclick=()=>{soundEnabled=!soundEnabled;$('soundLabel').textContent=soundEnabled?'ON':'OFF';if(soundEnabled)beep(740,.15);};
const mapped={ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right'};
window.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space'].includes(e.code))e.preventDefault();if(!inputReady())return;if(mapped[e.code])game.setMove(mapped[e.code]==='left'?-1:1,true);if((e.code==='Space'||e.code==='ArrowUp'||e.code==='KeyW')&&!e.repeat)game.requestJump();if(e.code==='KeyE'&&!e.repeat)game.interact();if(e.code==='KeyR'&&!e.repeat)game.respawn();});
window.addEventListener('keyup',e=>{if(mapped[e.code])game.setMove(mapped[e.code]==='left'?-1:1,false);});
window.addEventListener('blur',()=>{game.keys.left=false;game.keys.right=false;});
const hold=(id,dir)=>{const button=$(id);const release=e=>{if(e) e.preventDefault();button.classList.remove('pressed');game.setMove(dir,false);};button.addEventListener('pointerdown',e=>{if(!inputReady())return;e.preventDefault();button.setPointerCapture(e.pointerId);button.classList.add('pressed');game.setMove(dir,true);});for(const kind of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(kind,release);};
hold('moveLeft',-1);hold('moveRight',1);
$('jump').addEventListener('pointerdown',e=>{e.preventDefault();game.requestJump();});$('interact').addEventListener('pointerdown',e=>{e.preventDefault();game.interact();});
// Minimal stable smoke-test hooks; no developer/debug panel exposed to players.
window.__LOST_PAGES_CAPSULE__={get state(){return {stage,mode:where,position:game.player.x,ink:game.ink.size,glyphs:game.glyphs.size,completed:game.completed,deaths:game.deaths};},begin:()=>startGame('play'),game};
setStage('intro');
