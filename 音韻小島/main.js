import './style.css';
import './toy-ui.css';
import './story-banner.js';
import './pronunciation.js';
import './udl.js';
import './copyright.js';
import {dressWorld} from './toy-world.js';
import {addLife} from './living-world.js';
import {createTourCard} from './tour-card.js';
import {applyClay} from './clay-style.js';
import {animateClouds} from './cloud-drift.js';
import {createDiorama} from './diorama.js';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {titles,terms} from './content.js';
import {openCentral} from './central-island.js';
const $=s=>document.querySelector(s), dialog=$('#lesson');
const done=new Set(JSON.parse(localStorage.getItem('sky-terms')||'[]'));let selected=1,mode='read',paused=false;
const update=()=>{$('#progress').textContent=`已學習 ${done.size}／${terms.length} 個術語`;localStorage.setItem('sky-terms',JSON.stringify([...done]));};update();
function open(n){window.dispatchEvent(new CustomEvent('sky-focus',{detail:n}));if(n===0){openCentral(dialog);return;}selected=n;mode='read';render();if(!dialog.open)dialog.showModal();const nav=document.createElement('div');nav.className='island-nav';nav.innerHTML='<button>← 上一島</button><button>下一島 →</button>';nav.children[0].onclick=()=>open((n+11)%12);nav.children[1].onclick=()=>open((n+1)%12);$('#lesson-body').prepend(nav);}
$('#close').onclick=()=>dialog.close();
function card(t){return `<article class="term"><span class="badge">概念 ${t.id+1}</span><h3>${t.zh}<small>${t.en}</small></h3><p>${t.meaning}</p><div class="example"><strong>教材例子</strong><p>${t.example}</p><strong>怎麼看這個例子</strong><p>${t.explain}</p></div><p class="source">來源：${t.chapter}音韻學.pdf · 檔內第 ${t.page} 頁 · 解釋為教學改寫</p><button data-learn="${t.id}">${done.has(t.id)?'✓ 已理解':'標記為已理解'}</button></article>`;}
function render(){const ts=terms.filter(t=>t.chapter===selected);$('#lesson-body').innerHTML=`<span class="badge">ISLAND ${String(selected).padStart(2,'0')} · 天空學習站</span><h2>${titles[selected-1]}</h2><p class="muted">先認識中英文名稱，再讀例子，最後用自己的話解釋。</p><div class="tabs"><button data-mode="read">術語與例子</button><button data-mode="flip">翻卡記憶</button><button data-mode="quiz">觀念練習</button></div><div id="learning"></div>`;document.querySelectorAll('[data-mode]').forEach(b=>{b.classList.toggle('active',b.dataset.mode===mode);b.onclick=()=>{mode=b.dataset.mode;render();};});const area=$('#learning');if(mode==='read'){area.innerHTML=ts.map(card).join('');area.querySelectorAll('[data-learn]').forEach(b=>b.onclick=()=>{done.add(Number(b.dataset.learn));update();b.textContent='✓ 已理解';});}else if(mode==='flip'){let i=0,reveal=false;const show=()=>{const t=ts[i];area.innerHTML=`<p>${i+1}／${ts.length} · 點卡片看中文意思</p><button class="flip">${reveal?`${t.zh}<p>${t.meaning}</p>`:t.en}</button><button id="next">下一張 →</button>`;area.querySelector('.flip').onclick=()=>{reveal=!reveal;show();};$('#next').onclick=()=>{i=(i+1)%ts.length;reveal=false;show();};};show();}else{area.innerHTML='<p>本區為依教材編寫的觀念練習，非考古題。每題四選一，答案位置每次重新排列。</p>'+ts.map(t=>{const others=terms.filter(x=>x.id!==t.id).sort(()=>Math.random()-.5).slice(0,3);const opts=[t,...others].sort(()=>Math.random()-.5);return `<article class="term"><h3>哪一個名詞符合這段說明？</h3><p>${t.meaning}</p><div class="quiz-opts">${opts.map(o=>`<button data-answer="${o.id}" data-target="${t.id}">${o.zh} · ${o.en}</button>`).join('')}</div><p class="feedback" aria-live="polite"></p></article>`;}).join('');area.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{const t=terms[Number(b.dataset.target)],ok=b.dataset.answer===b.dataset.target;b.classList.add(ok?'correct':'wrong');b.closest('article').querySelector('.feedback').textContent=ok?`答對了。${t.explain}`:`再想一想：${t.example}`;});}}
$('#islands').innerHTML=titles.map((t,i)=>`<button class="island-card" data-island="${i+1}"><span>FLOATING ISLAND ${String(i+1).padStart(2,'0')}</span><strong>${t}</strong><small>${terms.filter(x=>x.chapter===i+1).map(x=>x.zh).join(' · ')}</small></button>`).join('');document.querySelectorAll('[data-island]').forEach(b=>b.onclick=()=>open(Number(b.dataset.island)));
$('#islands').before($('#results'));
$('#results').setAttribute('aria-live','polite');
$('#search').oninput=e=>{
 const q=e.target.value.trim().toLocaleLowerCase();
 const matches=q?terms.filter(t=>(t.zh+' '+t.en+' '+t.meaning).toLocaleLowerCase().includes(q)):[];
 $('#islands').hidden=Boolean(q);
 $('#islands').style.display=q?'none':'';
 $('#results').innerHTML=q?`<p role="status">找到 ${matches.length} 個相關概念</p>`+(matches.length?matches.map(card).join(''):'<p>沒有找到相符概念，請換用較短的中文詞或英文名稱。</p>'):'';
 $('#results').querySelectorAll('[data-learn]').forEach(b=>b.onclick=()=>{done.add(Number(b.dataset.learn));update();b.textContent='✓ 已理解';});
};
$('#motion').onclick=()=>{paused=!paused;$('#motion').textContent=paused?'繼續漂浮':'暫停漂浮';};
try{initWorld();}catch(e){$('#load').textContent='3D 場景暫時無法開啟，請使用下方 11 座島嶼入口學習。';console.error(e);}
function initWorld(){const host=$('#canvas'),scene=new THREE.Scene();scene.background=new THREE.Color('#c9dfe2');scene.fog=new THREE.Fog('#c9dfe2',55,125);const camera=new THREE.PerspectiveCamera(43,1,.1,180);camera.position.set(25,29,38);const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;host.appendChild(renderer.domElement);scene.add(new THREE.HemisphereLight(0xfff5db,0x709b9d,2.2));const sun=new THREE.DirectionalLight(0xffe2b3,3);sun.position.set(-15,30,15);scene.add(sun);const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.minDistance=14;controls.maxDistance=70;controls.maxPolarAngle=Math.PI*.46;controls.target.set(0,0,0);const meshes=[],islands=[];
const material=c=>new THREE.MeshStandardMaterial({color:c,roughness:.95});const grass=material('#91b58a'),rock=material('#bfa88a'),trunk=material('#92735b'),leaves=material('#729c79'),roof=material('#bd816d'),cream=material('#fff0ce'),cloud=material('#f7f5ea');
function mesh(g,m,parent,x=0,y=0,z=0){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);parent.add(o);return o;}
const fruits=['#e69b57','#d1b251','#da838b','#9d85ac','#dfa64f','#a1b16a','#b78fbe','#c87768','#d6a673','#a0ba70','#c0a172'];
for(let i=0;i<11;i++){const angle=i/11*Math.PI*2,r=i%2?16:13,g=new THREE.Group();g.position.set(Math.cos(angle)*r,(i%3-1)*1.2,Math.sin(angle)*r);g.userData.chapter=i+1;scene.add(g);islands.push(g);mesh(new THREE.CylinderGeometry(3.25,2.95,.65,9),grass,g,0,0);const lower=mesh(new THREE.ConeGeometry(3.1,4,7),rock,g,0,-2.1);lower.rotation.z=Math.PI;mesh(new THREE.CylinderGeometry(3.35,3.05,.2,9),material('#e4d7b6'),g,0,-.36);const house=mesh(new THREE.BoxGeometry(1.6,1.25,1.4),cream,g,0,.92);mesh(new THREE.ConeGeometry(1.4,1,4),roof,g,0,2.02).rotation.y=Math.PI/4;mesh(new THREE.BoxGeometry(.38,.65,.05),trunk,g,0,.63,.73);mesh(new THREE.BoxGeometry(.4,.4,.05),material('#9acbd0'),g,.48,1.1,.73);for(let j=0;j<3;j++){const x=Math.cos(j*2.1+i)*2.15,z=Math.sin(j*2.1+i)*2.15;mesh(new THREE.CylinderGeometry(.12,.18,1.2,7),trunk,g,x,.85,z);const crown=mesh(new THREE.DodecahedronGeometry(.7,1),leaves,g,x,1.65,z);crown.scale.y=1+(i%3)*.17;for(let k=0;k<3;k++)mesh(new THREE.SphereGeometry(.16,8,6),material(fruits[i]),g,x+Math.cos(k*2)*.45,1.65,z+Math.sin(k*2)*.45);}meshes.push(...g.children.filter(o=>o.isMesh));}
const central=new THREE.Group();central.userData.chapter=0;scene.add(central);islands.push(central);
mesh(new THREE.CylinderGeometry(4.4,4.1,.7,8),grass,central);
const centralRock=mesh(new THREE.ConeGeometry(4.1,4.5,8),rock,central,0,-2.4);centralRock.rotation.z=Math.PI;
mesh(new THREE.BoxGeometry(2.8,1.8,2),cream,central,0,1.2);
mesh(new THREE.ConeGeometry(2.3,1.2,4),roof,central,0,2.65).rotation.y=Math.PI/4;
mesh(new THREE.BoxGeometry(.7,1.1,.08),trunk,central,0,.9,1.04);
meshes.push(...central.children.filter(o=>o.isMesh));
const centralButton=document.createElement('button');centralButton.className='island-card';centralButton.innerHTML='<span>CENTRAL ISLAND</span><strong>中央語言島</strong><small>嬰兒辨音 · 口誤故事 · 音位與音節</small>';centralButton.onclick=()=>open(0);$('#islands').prepend(centralButton);
const toy=dressWorld({scene,islands,meshes,camera,controls,open});
const tourCard=createTourCard(toy.focus,open);
scene.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-32,right:32,top:32,bottom:-32,near:1,far:100});sun.shadow.normalBias=.04;sun.shadow.bias=-.0002;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.85;
window.addEventListener('sky-stop-tour',()=>{clearInterval(tour);tour=null;tools.querySelector('[data-view="tour"]').textContent='島嶼導覽';});
scene.onBeforeRender=()=>islands.forEach(g=>g.position.y=0);
window.addEventListener('sky-focus',e=>toy.focus(e.detail));
const tools=document.createElement('div');tools.className='world-tools';tools.innerHTML='<button data-view="all">全景</button><button data-view="top">鳥瞰</button><button data-view="labels">島名</button><button data-view="tour">島嶼導覽</button><button data-view="day">日夜切換</button>';$('#world').appendChild(tools);let tour=null,night=false;
const life=addLife(scene,islands);const previousBeforeRender=scene.onBeforeRender;scene.onBeforeRender=()=>{previousBeforeRender();life.update(performance.now()/1000,paused);life.setNight(lightPhase===2);};
let lightPhase=0;const phases=[['☀ 白天','#c9dfe2','#ffe2b3',3,30],['◐ 黃昏','#dba998','#ff9d59',2,8],['☾ 夜晚','#53657b','#b8c9ef',.6,25]];tools.querySelector('[data-view="day"]').textContent=phases[0][0];
tools.addEventListener('click',e=>{const v=e.target.dataset.view;if(v==='all'){camera.position.set(30,39,47);controls.target.set(0,0,0);}if(v==='top'){camera.position.set(0,65,.1);controls.target.set(0,0,0);}if(v==='labels')toy.labels.forEach(l=>l.visible=!l.visible);if(v==='day'){const p=phases[lightPhase=(lightPhase+1)%3];sun.intensity=p[3];sun.color.set(p[2]);sun.position.y=p[4];scene.background.set(p[1]);scene.fog.color.set(p[1]);e.target.textContent=p[0];}if(v==='tour'){if(tour){clearInterval(tour);tour=null;tourCard.hide();e.target.textContent='島嶼導覽';}else{let n=0;tourCard.show(n);tour=setInterval(()=>tourCard.show(n=(n+1)%12),10000);e.target.textContent='停止導覽';}}});
// 雲群有深度與高度差；上方島嶼保持清楚可見。
for(let i=0;i<35;i++){const group=new THREE.Group();group.position.set(Math.sin(i*2.4)*35,-7-(i%4)*1.2,Math.cos(i*2.4)*28);for(let j=0;j<4;j++){const c=mesh(new THREE.SphereGeometry(2.3,12,8),cloud,group,(j-1.5)*2,.4*(j%2),0);c.scale.set(1.5,.65,1);}scene.add(group);}
applyClay(scene,renderer,sun);
animateClouds(scene,islands,()=>paused);
const renderDiorama=createDiorama(renderer,scene,camera);
const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();let down;
renderer.domElement.addEventListener('pointerdown',e=>{down=[e.clientX,e.clientY];});renderer.domElement.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>7)return;const rect=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects(meshes,false)[0];if(hit)open(hit.object.parent.userData.chapter);});
const resize=()=>{const r=host.getBoundingClientRect();renderer.setSize(r.width,r.height);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();};new ResizeObserver(resize).observe(host);resize();$('#reset').onclick=()=>{camera.position.set(25,29,38);controls.target.set(0,0,0);};let t=0;renderer.setAnimationLoop(()=>{if(!paused)t+=.008;islands.forEach((g,i)=>{g.position.y=(i%3-1)*1.2+Math.sin(t+i)*.25;});controls.update();renderDiorama();});$('#load').textContent='雲海已就緒 · 點選島嶼，或使用下方章節入口';window.__skyReady=true;}
