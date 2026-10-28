import * as T from 'three';
export function createNocturnal(islands){
 const people=[],animals=[];
 const brown=new T.MeshStandardMaterial({color:'#9e7b65',roughness:1}),cream=new T.MeshStandardMaterial({color:'#eadcbe',roughness:1}),dark=new T.MeshStandardMaterial({color:'#54506a',roughness:1}),eye=new T.MeshStandardMaterial({color:'#302f36',roughness:1});
 function sphere(parent,scale,material,x,y,z){const o=new T.Mesh(new T.SphereGeometry(1,12,8),material);o.scale.set(...scale);o.position.set(x,y,z);o.castShadow=true;parent.add(o);return o;}
 islands.forEach(island=>island.children.filter(g=>g.isGroup&&g.children.some(c=>c.geometry?.type==='SphereGeometry')&&g.children.some(c=>c.isGroup)).forEach((person,i)=>{
  people.push(person);const animal=new T.Group();animal.visible=false;animal.position.copy(person.position);island.add(animal);
  if(i%2===0){sphere(animal,[.23,.3,.2],brown,0,.4,0);sphere(animal,[.25,.22,.21],brown,0,.72,0);for(const x of [-.1,.1]){sphere(animal,[.1,.12,.025],cream,x,.75,.2);sphere(animal,[.035,.045,.02],eye,x,.75,.23);}sphere(animal,[.045,.07,.05],cream,0,.65,.24);}
  else {sphere(animal,[.12,.21,.12],dark,0,.5,0);sphere(animal,[.14,.12,.12],dark,0,.73,0);for(const x of [-.08,.08])sphere(animal,[.045,.13,.05],dark,x,.87,0);for(const x of [-.045,.045])sphere(animal,[.018,.025,.015],cream,x,.76,.12);for(const side of [-1,1]){const wing=new T.Mesh(new T.SphereGeometry(1,8,6),dark);wing.scale.set(.33,.055,.17);wing.position.set(side*.28,.58,0);animal.add(wing);}}
  animals.push({animal,person,index:i});
 }));
 return {setNight(night){people.forEach(p=>p.visible=!night);animals.forEach(({animal,person,index})=>{animal.visible=night;if(night){animal.position.copy(person.position);animal.rotation.y=person.rotation.y;if(index%2)animal.position.y+=.6;}});}};
}
