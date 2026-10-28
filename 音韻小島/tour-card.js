import {titles,terms} from './content.js';
export function createTourCard(focus,open){
 const style=document.createElement('style');style.textContent='.tour-card{position:absolute;bottom:100px;left:22px;width:min(470px,calc(100% - 44px));padding:20px;background:#fff9ed;border-radius:22px;border-top:5px solid #d7a147;box-shadow:0 12px 35px #344c4533;z-index:3}.tour-card[hidden]{display:none}.tour-card p{font-size:14px;line-height:1.7}.tour-card>div{display:flex;gap:7px;flex-wrap:wrap}.tour-card button{font-size:13px;padding:6px 12px}';document.head.appendChild(style);
 const card=document.createElement('aside');card.className='tour-card';card.hidden=true;document.querySelector('#world').appendChild(card);let current=0;
 function show(n){current=n;card.hidden=false;focus(n);const ts=terms.filter(t=>t.chapter===n);card.innerHTML=`<span class="badge">${n+1} / 12 · 島嶼導覽</span><h3>${n===0?'中央語言島':titles[n-1]}</h3><p>${n===0?'從嬰兒辨音、口誤與語音的小故事，認識語言學如何觀察日常生活。':`這座島認識 ${ts.length} 個概念。從「${ts.slice(0,3).map(t=>t.zh).join('」、「')}」開始，對照中英文名稱，再讀教材例子。`}</p><div><button data-action="prev" aria-label="上一島">←</button><button data-action="next" aria-label="下一島">→</button><button data-action="open">開啟教材</button><button data-action="close">關閉導覽</button></div>`;}
 card.onclick=e=>{const a=e.target.dataset.action;if(a==='prev')show((current+11)%12);if(a==='next')show((current+1)%12);if(a==='open')open(current);if(a==='close'){card.hidden=true;window.dispatchEvent(new Event('sky-stop-tour'));}};
 return {show,hide(){card.hidden=true;}};
}
