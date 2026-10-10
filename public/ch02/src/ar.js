/** Optional real-world wall anchor. Uses native WebXR hit-test and WebGL directly.
 * Supported devices only; camera-preview fallback is explicitly screen-locked. */
const mul=(a,b)=>{const o=new Float32Array(16);for(let col=0;col<4;col++)for(let row=0;row<4;row++){let s=0;for(let k=0;k<4;k++)s+=a[k*4+row]*b[col*4+k];o[col*4+row]=s;}return o;};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const norm=v=>{let l=Math.hypot(...v)||1;return v.map(a=>a/l);};
function wallModel(hit){const m=hit.transform.matrix;const normal=norm([m[4],m[5],m[6]]);let right=norm(cross([0,1,0],normal));if(Math.hypot(...right)<.4)right=[1,0,0];const up=[0,1,0];const out=norm(cross(right,up));return new Float32Array([
 right[0]*1.55,right[1]*1.55,right[2]*1.55,0,
 up[0]*.872,up[1]*.872,up[2]*.872,0,
 out[0],out[1],out[2],0,
 m[12]+normal[0]*.025,m[13]+normal[1]*.025,m[14]+normal[2]*.025,1
]);}
const VERT=`attribute vec2 position;attribute vec2 uv;uniform mat4 mvp;varying vec2 vUv;void main(){gl_Position=mvp*vec4(position,0.,1.);vUv=uv;}`;
const FRAG=`precision mediump float;uniform sampler2D painting;varying vec2 vUv;void main(){gl_FragColor=texture2D(painting,vUv);}`;
const program=(gl)=>{const compile=(kind,source)=>{let s=gl.createShader(kind);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;};const p=gl.createProgram();gl.attachShader(p,compile(gl.VERTEX_SHADER,VERT));gl.attachShader(p,compile(gl.FRAGMENT_SHADER,FRAG));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));return p;};
export class ARController{
 constructor({app,canvas,source,onStatus,onLeave}){this.app=app;this.canvas=canvas;this.source=source;this.onStatus=onStatus;this.onLeave=onLeave;this.stream=null;this.session=null;this.placed=false;this.model=null;this.hitModel=null;this.lastHit=null;this.placeButton=null;}
 static async isSupported(){try{return Boolean(navigator.xr&&await navigator.xr.isSessionSupported('immersive-ar'));}catch{return false;}}
 async startCamera(video){if(!navigator.mediaDevices?.getUserMedia)throw new Error('Camera requires HTTPS or localhost.');const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false});this.stream=stream;video.srcObject=stream;await video.play();this.onStatus?.('CAMERA PREVIEW · SCREEN ALIGNED');}
 stopCamera(video){this.stream?.getTracks().forEach(t=>t.stop());this.stream=null;if(video){video.pause();video.srcObject=null;}}
 async startXR(){if(!navigator.xr)throw new Error('WebXR not available.');
  const session=await navigator.xr.requestSession('immersive-ar',{requiredFeatures:['hit-test'],optionalFeatures:['dom-overlay','local-floor'],domOverlay:{root:this.app}});
  this.session=session;this.placed=false;this.model=null;this.lastHit=null;
  try{
   const gl=this.canvas.getContext('webgl',{alpha:true,antialias:true,preserveDrawingBuffer:false,xrCompatible:true});if(!gl)throw new Error('WebGL not available');await gl.makeXRCompatible();session.updateRenderState({baseLayer:new XRWebGLLayer(session,gl)});
   this.gl=gl;this.referenceSpace=await session.requestReferenceSpace('local');const viewer=await session.requestReferenceSpace('viewer');this.hitSource=await session.requestHitTestSource({space:viewer});
   this.shader=program(gl);gl.useProgram(this.shader);const verts=new Float32Array([-.5,-.5,0,1, .5,-.5,1,1,-.5,.5,0,0, -.5,.5,0,0,.5,-.5,1,1,.5,.5,1,0]);const buff=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buff);gl.bufferData(gl.ARRAY_BUFFER,verts,gl.STATIC_DRAW);const pos=gl.getAttribLocation(this.shader,'position'),uv=gl.getAttribLocation(this.shader,'uv');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,16,0);gl.enableVertexAttribArray(uv);gl.vertexAttribPointer(uv,2,gl.FLOAT,false,16,8);this.mvpLocation=gl.getUniformLocation(this.shader,'mvp');this.texture=gl.createTexture();gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,this.texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.uniform1i(gl.getUniformLocation(this.shader,'painting'),0);
   this.placeButton=document.createElement('button');this.placeButton.textContent='PLACE PAINTING ON WALL';this.placeButton.className='xr-place-button';Object.assign(this.placeButton.style,{position:'absolute',zIndex:39,left:'50%',top:'70%',transform:'translateX(-50%)',padding:'15px 22px',background:'#edc88d',color:'#221b28',border:'0',fontWeight:700,letterSpacing:'1px'});this.placeButton.disabled=true;this.placeButton.addEventListener('click',()=>{if(this.hitModel){this.model=new Float32Array(this.hitModel);this.placed=true;this.placeButton.remove();this.onStatus?.('ANCHORED TO WALL · AR');}});this.app.append(this.placeButton);
   session.addEventListener('end',()=>this.onEnd());this.onStatus?.('SCAN A VERTICAL SURFACE');session.requestAnimationFrame((time,frame)=>this.render(time,frame));
  }catch(err){await session.end();throw err;}
 }
 render(time,frame){let session=frame.session;if(!session||session!==this.session)return;session.requestAnimationFrame((t,f)=>this.render(t,f));const pose=frame.getViewerPose(this.referenceSpace);if(!pose)return;
  if(!this.placed){for(const hit of frame.getHitTestResults(this.hitSource)){const hp=hit.getPose(this.referenceSpace);if(!hp)continue;const m=hp.transform.matrix;const ny=Math.abs(m[5]);if(ny<.53){this.hitModel=wallModel(hp);break;}}if(this.placeButton)this.placeButton.disabled=!this.hitModel;}
  const model=this.model||this.hitModel;const gl=this.gl;if(!model)return;const layer=session.renderState.baseLayer;gl.bindFramebuffer(gl.FRAMEBUFFER,layer.framebuffer);gl.useProgram(this.shader);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,this.texture);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,this.source);
  for(const view of pose.views){const vp=layer.getViewport(view);gl.viewport(vp.x,vp.y,vp.width,vp.height);const viewM=view.transform.inverse.matrix;gl.uniformMatrix4fv(this.mvpLocation,false,mul(view.projectionMatrix,mul(viewM,model)));gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.disable(gl.CULL_FACE);gl.drawArrays(gl.TRIANGLES,0,6);}
 }
 async end(){if(this.session){const s=this.session;this.session=null;await s.end().catch(()=>{});}this.placeButton?.remove();this.placeButton=null;}
 onEnd(){this.placeButton?.remove();this.placeButton=null;this.session=null;this.hitSource?.cancel?.();this.hitSource=null;this.placed=false;this.onLeave?.();}
}
