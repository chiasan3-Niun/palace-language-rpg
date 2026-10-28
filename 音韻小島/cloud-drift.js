export function animateClouds(scene,islands,isPaused){
 const islandSet=new Set(islands);
 const clouds=scene.children.filter(o=>o.isGroup&&!islandSet.has(o)&&o.position.y< -5&&o.children.some(c=>c.geometry?.type==='SphereGeometry'));
 const layers=clouds.map((object,i)=>({object,x:object.position.x,y:object.position.y,z:object.position.z,speed:.18+(i%5)*.045,phase:i*1.73}));
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const previous=scene.onBeforeRender;let last=null,elapsed=0;
 scene.onBeforeRender=function(...args){
  previous.apply(this,args);
  const now=performance.now()/1000,dt=last===null?0:Math.min(.1,now-last);last=now;
  if(isPaused()||reduced)return;elapsed+=dt;
  layers.forEach(c=>{
   c.object.position.x=((c.x+elapsed*c.speed+55)%110)-55;
   c.object.position.y=c.y+Math.sin(elapsed*.18+c.phase)*.18;
   c.object.position.z=c.z+Math.sin(elapsed*.035+c.phase)*.75;
  });
 };
}
