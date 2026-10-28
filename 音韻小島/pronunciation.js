import {terms} from './content.js';
let active=null;
function stop(){if('speechSynthesis' in window)window.speechSynthesis.cancel();if(active){active.textContent='🔊 聽英文';active=null;}}
function button(term){const b=document.createElement('button');b.type='button';b.className='pronounce';b.textContent='🔊 聽英文';b.setAttribute('aria-label',`朗讀 ${term.en}`);b.onclick=()=>{
 if(active===b){stop();return;}stop();
 if(!('speechSynthesis' in window)){b.textContent='此瀏覽器不支援朗讀';return;}
 const utterance=new SpeechSynthesisUtterance(term.en.replace(/\bIPA\b/g,'I P A').replace(/\bVOT\b/g,'V O T').replace(/\bDEP-IO\b/g,'D E P, I O').replace(/\bMAX-IO\b/g,'M A X, I O'));
 utterance.lang='en-US';utterance.rate=.8;
 const voices=speechSynthesis.getVoices();utterance.voice=voices.find(v=>v.lang==='en-US')||voices.find(v=>v.lang.startsWith('en'))||null;
 active=b;b.textContent='■ 停止朗讀';utterance.onend=utterance.onerror=()=>{if(active===b){b.textContent='🔊 聽英文';active=null;}};speechSynthesis.speak(utterance);
 };return b;}
function enhance(){
 document.querySelectorAll('article.term').forEach(card=>{const heading=card.querySelector('h3');const en=heading?.querySelector('small')?.textContent;if(!en||card.querySelector('.pronounce'))return;const term=terms.find(t=>t.en===en);if(term)heading.after(button(term));});
 const flip=document.querySelector('.flip');if(flip&&!flip.parentElement.querySelector('.pronounce')){
 const title=document.querySelector('#lesson-body h2')?.textContent;
 const chapterNames=['發音與辨音','音位與同位音','區辨特徵','底層與表層','音韻運作','規則與順序','自然性與優選理論','規則與限制分析','借詞與音節','重音與音步','構詞音韻'];
 const chapter=chapterNames.indexOf(title)+1;
 const position=Number(flip.previousElementSibling?.textContent.match(/^\d+/)?.[0])-1;
 const term=terms.filter(t=>t.chapter===chapter)[position];if(term)flip.after(button(term));
 }
}
const observer=new MutationObserver(()=>{if(active&&!active.isConnected)stop();enhance();});
observer.observe(document.querySelector('main'),{childList:true,subtree:true});observer.observe(document.querySelector('#lesson-body'),{childList:true,subtree:true});
document.querySelector('#lesson').addEventListener('close',stop);window.addEventListener('pagehide',stop);enhance();
