import * as T from 'three';
import {createNocturnal} from './nocturnal.js';
export function addLife(scene,islands){
 const mat=c=>new T.MeshStandardMaterial({color:c,roughness:.9,flatShading:true});
 const white=mat('#eee8d8'),black=mat('#373831'),pink=mat('#ddaaa5'),wood=mat('#b5a17a');
 const animated=[],lamps=[];
 function box(p,s,m,x,y,z){const o=new T.Mesh(new T.BoxGeometry(...s),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;p.add(o);return o;}
 function ball(p,s,m,x,y,z){const o=new T.Mesh(new T.IcosahedronGeometry(1,1),m);o.scale.set(...s);o.position.set(x,y,z);o.castShadow=true;p.add(o);return o;}
 islands.forEach((island,i)=>{
  // 現有小人物的五官、鼻子與帽沿。
  island.children.filter(g=>g.isGroup&&g.children.some(c=>c.geometry?.type==='SphereGeometry')).forEach((human,j)=>{
   for(const x of [-.055,.055])ball(human,[.018,.022,.018],black,x,.71,.12);
   ball(human,[.035,.03,.04],pink,0,.66,.13);
   if(j%3===0){const brim=new T.Mesh(new T.CylinderGeometry(.23,.23,.035,10),mat('#d7b965'));brim.position.y=.8;human.add(brim);}
   const limbs=human.children.filter(c=>c.geometry?.type==='BoxGeometry'&&c.position.y<.5&&c.position.x!==0).map(c=>{
    const pivot=new T.Group();pivot.position.copy(c.position);pivot.position.y+=.12;human.remove(c);c.position.set(0,-.12,0);pivot.add(c);human.add(pivot);return {pivot,side:Math.sign(pivot.position.x),arm:pivot.position.y>.4};
   });
   animated.push({object:human,origin:human.position.clone(),phase:j+i,type:'person',limbs,lane:j%4,offset:j*.73+i*.19});
  });
  // 每島一隻小動物：兔、豬、羊交替。
  const pet=new T.Group();pet.position.set(-2.2,.16,-.4);island.add(pet);const kind=i%3;
  ball(pet,[.48,.3,.3],kind===1?pink:white,0,.4,0);ball(pet,[.25,.24,.24],kind===1?pink:white,.4,.58,0);
  for(const z of [-.11,.11]){ball(pet,[.035,.04,.035],black,.58,.65,z);box(pet,[.09,.24,.09],black,-.25,.16,z);box(pet,[.09,.24,.09],black,.24,.16,z);}
  if(kind===0){for(const z of [-.12,.12])ball(pet,[.07,.3,.07],white,.4,.93,z);}
  else if(kind===1){ball(pet,[.12,.09,.15],mat('#c88585'),.62,.52,0);for(const z of [-.14,.14])ball(pet,[.08,.13,.08],pink,.38,.82,z);}
  else{for(let j=0;j<7;j++)ball(pet,[.23,.2,.22],white,(j%3-1)*.23,.58,Math.floor(j/3)*.18-.18);}
  animated.push({object:pet,origin:pet.position.clone(),phase:i,type:'animal'});
  // 動物旁的圍欄，不遮住通往橋面的路。
  for(let j=0;j<5;j++){box(island,[.06,.5,.06],wood,-3.1+j*.4,.42,-1);if(j<4)box(island,[.4,.06,.06],white,-2.9+j*.4,.55,-1);}
  // 左後方加一座章節小屋，屋頂型式依島分組。
  const hut=new T.Group();hut.position.set(1.9,.15,1.9);island.add(hut);
  box(hut,[.9,.9,.85],mat(['#ece2bd','#c6dce0','#dfc3c1'][kind]),0,.45,0);
  const roof=new T.Mesh(new T.ConeGeometry(.85,.65,kind===0?4:6),mat(['#a75f4b','#7e8f9b','#8e7caa'][kind]));roof.position.y=1.2;roof.rotation.y=Math.PI/4;hut.add(roof);
  box(hut,[.25,.5,.03],wood,0,.25,.44);box(hut,[.22,.25,.03],mat('#88b5c6'),-.28,.6,.44);
  const lampMat=new T.MeshStandardMaterial({color:'#ffdc8d',emissive:'#ffb64c',emissiveIntensity:0});
  const lamp=ball(island,[.14,.2,.14],lampMat,3,1.3,.2);lamps.push(lamp.material);
 });
 const points=[];for(let i=0;i<100;i++)points.push(Math.sin(i*12.3)*26,2+(i%15)*.5,Math.cos(i*8.7)*26);
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(points,3));const sparkle=new T.Points(geo,new T.PointsMaterial({color:'#fff5bf',size:.07,transparent:true,opacity:.7}));scene.add(sparkle);
 let effects=true;
 const button=document.createElement('button');button.textContent='✦ 特效：開';button.onclick=()=>{effects=!effects;sparkle.visible=effects;button.textContent=effects?'✦ 特效：開':'✦ 特效：關';};document.querySelector('.world-tools').appendChild(button);
 const nocturnal=createNocturnal(islands);
 let elapsed=0,clock=0,lastTime=null;const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
 return {update(time,paused){const dt=lastTime===null?0:Math.min(.05,Math.max(0,time-lastTime));lastTime=time;if(paused||reducedMotion)return;clock+=dt;elapsed=Math.floor(clock*12)/12;if(effects)sparkle.rotation.y=elapsed*.01;
  animated.forEach(a=>{
   if(a.type==='animal'){a.object.position.y=a.origin.y+Math.sin(elapsed*2+a.phase)*.035;a.object.rotation.y=Math.sin(elapsed*.4+a.phase)*.15;return;}
   // 人物在房屋前廣場分道往返；每端停留，再轉身。
   const cycle=(elapsed*.35+a.offset)%8,forward=cycle<4,local=cycle%4,walking=local<3;
   const fraction=Math.min(local/3,1),x=forward?-.95+fraction*1.9:.95-fraction*1.9;
   const bounce=walking?Math.abs(Math.sin(elapsed*7+a.phase)):0;
   a.object.position.set(x,a.origin.y+bounce*.09,1.5+a.lane*.32);
   a.object.scale.set(1-bounce*.035,1+bounce*.07,1-bounce*.035);
   a.object.rotation.y=forward?Math.PI/2:-Math.PI/2;
   a.limbs.forEach(l=>l.pivot.rotation.x=walking?Math.sin(elapsed*7+a.phase)*.55*l.side*(l.arm?-1:1):0);
  });
 },setNight(value){lamps.forEach(m=>m.emissiveIntensity=value?1.8:0);nocturnal.setNight(value);}};
}
