import * as T from 'three';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
export function createDiorama(renderer,scene,camera){
 scene.traverse(o=>{if(!o.isMesh)return;for(const m of Array.isArray(o.material)?o.material:[o.material])if(m.isMeshStandardMaterial){m.flatShading=true;m.roughness=.94;m.metalness=0;m.needsUpdate=true;}});
 const composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));
 const pass=new ShaderPass({uniforms:{tDiffuse:{value:null},resolution:{value:new T.Vector2(1,1)},amount:{value:1}},vertexShader:'varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:`uniform sampler2D tDiffuse;uniform vec2 resolution;uniform float amount;varying vec2 vUv;
 void main(){float blur=smoothstep(.18,.5,abs(vUv.y-.5))*amount;vec2 offset=vec2(1.5,1.)/resolution*blur;vec4 c=texture2D(tDiffuse,vUv)*.4;c+=texture2D(tDiffuse,vUv+offset)*.15;c+=texture2D(tDiffuse,vUv-offset)*.15;c+=texture2D(tDiffuse,vUv+offset*2.)*.15;c+=texture2D(tDiffuse,vUv-offset*2.)*.15;gl_FragColor=c;}`});composer.addPass(pass);
 const button=document.createElement('button');button.textContent='移軸：開';button.onclick=()=>{pass.uniforms.amount.value=pass.uniforms.amount.value?0:1;button.textContent=pass.uniforms.amount.value?'移軸：開':'移軸：關';};document.querySelector('.world-tools').appendChild(button);
 let w=0,h=0;return ()=>{const size=renderer.getSize(new T.Vector2());if(w!==size.x||h!==size.y){w=size.x;h=size.y;composer.setSize(w,h);pass.uniforms.resolution.value.set(w,h);}composer.render();};
}
