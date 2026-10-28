import * as T from 'three';
import {titles} from './content.js';
export function dressWorld({scene,islands,meshes,camera,controls,open}){
 const mat=c=>new T.MeshStandardMaterial({color:c,roughness:1,flatShading:true});
 const wood=mat('#a77a46'),plank=mat('#d7b577'),cream=mat('#f7e5bd'),dark=mat('#4d5b58');
 function add(parent,g,m,x,y,z){const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
 const palette=['#c3d4a3','#b8c9d8','#c8badb','#a6d2cd','#e4cba0','#bfcbdc','#d2c1ae','#c6dba1','#dfb7bd','#a8cec6','#dbbda4','#e0d3a9'];
 const labels=[];
 islands.forEach((g,i)=>{
  const central=i===11,r=central?5:4.25;
  if(!central){const a=i/11*Math.PI*2;g.position.set(Math.cos(a)*20,0,Math.sin(a)*20);}
  // 保留房屋與果樹，將地基換成厚實的八角模型平台。
  g.children.filter(o=>o.geometry?.type==='ConeGeometry'&&o.position.y<0).forEach(o=>o.visible=false);
  g.children.filter(o=>o.geometry?.type==='CylinderGeometry'&&o.position.y<=0).forEach(o=>o.visible=false);
  add(g,new T.CylinderGeometry(r,r,.9,8),mat('#a27c50'),0,-.65,0);
  add(g,new T.CylinderGeometry(r+.06,r+.06,.25,8),mat(palette[i]),0,-.08,0);
  add(g,new T.CylinderGeometry(r+.15,r+.15,.13,8),cream,0,-.24,0);
  // 小型校舍：窗格、分層腰線與門廊。
  const building=new T.Group();building.position.set(-.5,.15,-1.25);g.add(building);
  add(building,new T.BoxGeometry(2.5,1.65,1.15),cream,0,.85,0);
  const roofGeometry=new T.ConeGeometry(1,.6,4);roofGeometry.rotateY(Math.PI/4);roofGeometry.scale(2.9/Math.SQRT2,1,1.55/Math.SQRT2);
  const roof=add(building,roofGeometry,mat(['#aa6550','#8c80b1','#709ba4','#c99160'][i%4]),0,1.95,0);
  for(let row=0;row<2;row++)for(let col=0;col<5;col++)add(building,new T.BoxGeometry(.28,.3,.03),mat('#c9b773'),-.95+col*.47,.45+row*.7,.59);
  add(building,new T.BoxGeometry(2.6,.08,1.2),mat('#c6a989'),0,.85,0);
  for(let j=0;j<8;j++){
   const a=j*.83+i,x=Math.cos(a)*(2+(j%2)*.7),z=Math.sin(a)*(2+(j%2)*.7);
   const human=new T.Group();human.position.set(x,.2,z);human.rotation.y=j*1.7;g.add(human);
   const skin=mat('#dec09a'),shirt=mat(['#e3af53','#81b1c6','#cc969c','#eae5d3'][j%4]);
   add(human,new T.SphereGeometry(.14,8,6),skin,0,.69,0);add(human,new T.SphereGeometry(.145,8,6),mat(j%3?'#534c40':'#e4d69a'),0,.77,-.025);
   add(human,new T.BoxGeometry(.24,.3,.16),shirt,0,.4,0);
   for(const side of [-1,1]){add(human,new T.BoxGeometry(.08,.24,.1),dark,side*.07,.13,0);add(human,new T.BoxGeometry(.07,.25,.08),skin,side*.18,.4,0);}
  }
  // 長椅、路燈、踏石與章節專屬展示物。
  for(let j=0;j<6;j++)add(g,new T.BoxGeometry(.7,.06,.48),cream,0,.19,1+j*.4);
  for(const side of [-1,1]){add(g,new T.BoxGeometry(.9,.1,.35),wood,side*2.5,.4,1.2);add(g,new T.CylinderGeometry(.04,.04,1.1,6),dark,side*3,.7,.2);add(g,new T.BoxGeometry(.23,.28,.23),cream,side*3,1.3,.2);}
  const exhibit=new T.Group();exhibit.position.set(2,.3,-1.3);g.add(exhibit);
  if(i%3===0){add(exhibit,new T.CylinderGeometry(.35,.45,1.4,8),mat('#d3b894'),0,.7,0);add(exhibit,new T.SphereGeometry(.5,10,8),mat('#83b3c5'),0,1.6,0);}
  else if(i%3===1){add(exhibit,new T.TorusGeometry(.65,.09,6,20),mat('#b98d4d'),0,1,0);add(exhibit,new T.BoxGeometry(1.1,.2,1),wood,0,.25,0);}
  else {for(let k=0;k<3;k++)add(exhibit,new T.BoxGeometry(.3,.5+k*.35,.4),mat(['#c58774','#7e9cae','#cbb569'][k]),k*.4,.3+k*.15,0);}
  const canvas=document.createElement('canvas');canvas.width=768;canvas.height=128;const ctx=canvas.getContext('2d');ctx.fillStyle='#fff9ec';ctx.beginPath();ctx.roundRect(4,4,760,120,54);ctx.fill();ctx.strokeStyle=palette[i];ctx.lineWidth=8;ctx.stroke();ctx.fillStyle='#49463e';ctx.font='bold 39px sans-serif';ctx.textAlign='center';ctx.fillText(central?'中央語言島':`${i+1} · ${titles[i]}`,384,80);
  const label=new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(canvas),depthTest:false}));label.scale.set(5.8,.97,1);label.position.set(0,3.5,0);label.renderOrder=10;g.add(label);labels.push(label);
  meshes.push(...g.children.filter(o=>o.isMesh&&o.visible));
 });
 // 各章節島向中央放射連接；橋板、扶手與拱梁共用同一條曲線。
 for(let i=0;i<11;i++){
  const island=islands[i],dir=island.position.clone().normalize(),start=dir.clone().multiplyScalar(4.7),end=dir.clone().multiplyScalar(15.9),length=end.distanceTo(start),bridge=new T.Group();bridge.position.copy(start);bridge.rotation.y=Math.atan2(dir.x,dir.z);scene.add(bridge);
  const h=t=>.2+Math.sin(Math.PI*t)*1.1;
  for(let k=0;k<=26;k++){const t=k/26,p=add(bridge,new T.BoxGeometry(1.45,.1,length/26*.94),k%2?plank:mat('#c39c63'),0,h(t),t*length);p.rotation.x=-Math.atan(Math.cos(Math.PI*t)*Math.PI*1.1/length);if(k%4===0)for(const side of [-1,1])add(bridge,new T.BoxGeometry(.07,.85,.07),wood,side*.72,h(t)+.45,t*length);}
  for(const side of [-1,1])for(const lift of [-.18,.9]){const points=Array.from({length:28},(_,k)=>new T.Vector3(side*.72,h(k/27)+lift,k/27*length));add(bridge,new T.TubeGeometry(new T.CatmullRomCurve3(points),40,lift<0?.09:.035,5,false),lift<0?wood:cream,0,0,0);}
 }
 camera.position.set(30,39,47);controls.maxDistance=90;
 return {labels,focus(n){const g=n===0?islands[11]:islands[n-1];controls.target.copy(g.position);camera.position.copy(g.position).add(new T.Vector3(8,10,14));}};
}
