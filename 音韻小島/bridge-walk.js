import * as T from 'three';
export function bridgeRoute(islandIndex,personIndex){
 const points=[],a=islandIndex/11*Math.PI*2,b=((islandIndex+1)%11)/11*Math.PI*2;
 function radial(angle,out){for(let k=0;k<=44;k++){const r=out?3.7+k/44*14:17.7-k/44*14;const t=T.MathUtils.clamp((r-4.7)/11.2,0,1);points.push(new T.Vector3(Math.cos(angle)*r,.2+Math.sin(Math.PI*t)*1.1,Math.sin(angle)*r));}}
 function arc(from,to){let delta=(to-from+Math.PI*3)%(Math.PI*2)-Math.PI;for(let k=1;k<=16;k++){const angle=from+delta*k/16;points.push(new T.Vector3(Math.cos(angle)*3.7,.2,Math.sin(angle)*3.7));}}
 radial(a,false);arc(a,b);radial(b,true);radial(b,false);arc(b,a);radial(a,true);
 const lengths=[0];for(let i=1;i<points.length;i++)lengths.push(lengths[i-1]+points[i].distanceTo(points[i-1]));const total=lengths.at(-1);
 return time=>{const distance=(time*.48+personIndex*9)%total;let i=1;while(i<lengths.length-1&&lengths[i]<distance)i++;const ratio=(distance-lengths[i-1])/(lengths[i]-lengths[i-1]||1);return {position:points[i-1].clone().lerp(points[i],ratio),heading:Math.atan2(points[i].x-points[i-1].x,points[i].z-points[i-1].z)};};
}
