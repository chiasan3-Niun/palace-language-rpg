import * as T from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
export function applyClay(scene,renderer,sun){
 // 共用細顆粒凹凸紋理：只改表面法線，不改教材與物件位置。
 const size=64,pixels=new Uint8Array(size*size*4);let seed=17;
 for(let i=0;i<size*size;i++){seed=(seed*1664525+1013904223)>>>0;const value=110+(seed%36);pixels.set([value,value,value,255],i*4);}
 const texture=new T.DataTexture(pixels,size,size);texture.wrapS=texture.wrapT=T.RepeatWrapping;texture.magFilter=T.LinearFilter;texture.needsUpdate=true;
 const geometryCache=new Map(),materials=new Set();
 scene.traverse(o=>{
  if(!o.isMesh)return;
  if(o.geometry.type==='BoxGeometry'){
   const p=o.geometry.parameters,key=[p.width,p.height,p.depth].join(',');
   if(!geometryCache.has(key))geometryCache.set(key,new RoundedBoxGeometry(p.width,p.height,p.depth,2,Math.min(p.width,p.height,p.depth)*.2));
   o.geometry=geometryCache.get(key);
  }
  if(['IcosahedronGeometry','DodecahedronGeometry'].includes(o.geometry.type)){o.geometry=new T.SphereGeometry(o.geometry.parameters.radius||1,12,8);}
  for(const m of Array.isArray(o.material)?o.material:[o.material]){if(!m.isMeshStandardMaterial||materials.has(m))continue;materials.add(m);m.roughness=1;m.metalness=0;m.flatShading=false;m.bumpMap=texture;m.bumpScale=.025;m.color.lerp(new T.Color('#f3dcca'),.1);m.needsUpdate=true;}
 });
 renderer.shadowMap.type=T.VSMShadowMap;sun.shadow.radius=4;sun.shadow.blurSamples=8;renderer.toneMappingExposure=.95;
 const style=document.createElement('style');style.textContent='button,input,.term,.example{border-radius:22px}button{box-shadow:0 4px 0 #b5a58e33,inset 0 2px 1px #fff9;transition:transform .18s,background .18s}button:active{transform:translateY(3px) scale(.97)}header,.story-banner,.world-tools,.tour-card{box-shadow:5px 8px 20px #8c867b26,inset 0 3px 2px #fff9}';document.head.appendChild(style);
}
