import { createInitialState, applyDialogueChoice, applyAnswer, useHint } from './game.js';
import { levels } from './data/levels-all.js';
import { renderStatus } from './ui/status.js';
import { renderFeedback } from './ui/feedback.js';

let levelIndex = 0;
let state = createInitialState();
let selectedAnswer = null;
let feedback = '';
let feedbackTone = 'neutral';
const app = document.querySelector('#app');
const level = () => levels[levelIndex];
const clueLabels = {
  ITEM_01_SCROLL: '秀女宗族名冊：找出偽造的姓氏偏旁',
  ITEM_02_BOX: '深埋麝香金盒：取出沒有標點的血書',
  ITEM_03_POETRY_CARD: '倚梅園剪紙小像：辨認話中的暗示',
  ITEM_04_TOKEN: '一丈紅行刑令牌：找出語法破綻',
  ITEM_05_PLAQUE: '金漆千秋賀壽匾：配對合宜題辭',
  ITEM_06_LOOKUP_CARDS: '太醫藥典索引卡：依部首查找藥名',
  ITEM_07_SEIZED_LETTER: '搜繳家書密信：核對稱謂與格式',
  ITEM_08_INVITATION_CARD: '皇家祈福柬帖：校正請帖用語',
  ITEM_09_AGE_DIAL: '生辰干支算籌盤：換算年齡稱謂',
  ITEM_10_GANZHI_DIAL: '古玉日晷干支盤：校正節令對應',
  ITEM_11_ROYAL_CHRONICLE: '文淵閣先帝起居注：依內容歸卷',
  ITEM_12_JADE_SEAL: '傳國奉天玉璽：完成最後論辯'
};

function questionView() {
  if (!['question', 'retry'].includes(state.phase)) return '';
  const current = level().question;
  const options = state.hints.eliminate ? current.options.filter((_, i) => i !== current.options.length - 1) : current.options;
  return `<section class="question-card"><div class="eyebrow">${level().mechanic}｜${current.status}</div><h2>${level().knowledge}</h2><p>${current.prompt}</p><div class="answer-list">${options.map((option, i) => `<button class="answer-button ${selectedAnswer === i ? 'selected' : ''}" data-answer="${i}">${option}</button>`).join('')}</div><div class="tools"><button class="tool-button" data-hint="semantic" ${state.hints.semantic ? 'disabled' : ''}>語意點醒（不扣才情）</button><button class="tool-button" data-hint="eliminate" ${state.hints.eliminate || state.talent < 10 ? 'disabled' : ''}>排除陷阱（-10 才情）</button><button class="tool-button" data-submit ${selectedAnswer === null ? 'disabled' : ''}>提交判斷</button></div>${renderFeedback(feedback, feedbackTone)}</section>`;
}

function dialogueView() {
  if (state.phase !== 'dialogue') return '';
  return `<section class="dialogue-card"><div class="speaker">${level().title}</div><p>${level().opening}</p><p>${level().prompt}</p><div class="choice-list">${level().choices.map(([id, label]) => `<button class="choice-button" data-choice="${id}">${label}</button>`).join('')}</div></section>`;
}

function resultView() {
  if (state.phase === 'success') {
    const next = levelIndex < levels.length - 1 ? `<button class="restart-button" data-next>進入下一關：${levels[levelIndex + 1].title}</button>` : `<button class="restart-button" data-ending>查看勝利結局</button>`;
    return `<section class="result-card"><div class="eyebrow">第 ${levelIndex + 1} 關完成</div><h2>${level().title}｜${level().subtitle}</h2><p>你完成了「${level().objective}」。</p>${next}</section><section class="lesson-card"><h2>${level().question.card}</h2><p>${level().question.reasoning}</p><p class="source-status">專案自編，待教師審查</p></section>`;
  }
  if (state.phase === 'failure') return `<section class="result-card"><div class="eyebrow">任務失敗</div><h2>重新推理</h2><p>容止值已歸零。重新觀察題幹與語文線索。</p><button class="restart-button" data-restart>重新遊玩本關</button></section>`;
  return '';
}

function render() {
  const current = level();
  app.innerHTML = `<header class="topbar"><div><div class="eyebrow">第 ${levelIndex + 1}／${levels.length} 關｜${current.subtitle}</div><h1>${current.title}</h1><p class="objective">任務：${current.objective}</p></div>${renderStatus(state)}</header><nav class="level-nav" aria-label="關卡進度">${levels.map((item, i) => `<button class="level-dot ${i === levelIndex ? 'active' : ''}" data-level="${i}" title="${item.title}">${String(i + 1).padStart(2, '0')}</button>`).join('')}</nav><section class="scene" aria-label="${current.title}場景"><img class="character" src="${current.character}" alt="${current.title}角色" /><div class="clue-chip">真正線索：${clueLabels[current.item] || current.item}</div></section>${dialogueView()}${questionView()}${resultView()}`;
  bindEvents();
}

function resetLevel(index = levelIndex) { levelIndex = index; state = createInitialState(); selectedAnswer = null; feedback = ''; feedbackTone = 'neutral'; render(); }

function bindEvents() {
  app.querySelectorAll('[data-level]').forEach((button) => button.addEventListener('click', () => resetLevel(Number(button.dataset.level))));
  app.querySelectorAll('[data-choice]').forEach((button) => button.addEventListener('click', () => { state = applyDialogueChoice(state, button.dataset.choice); feedback = button.dataset.choice === 'careless' ? '回應過於草率，容止值下降 10 點。' : '回應得體，宮門官允許你繼續。'; feedbackTone = button.dataset.choice === 'careless' ? 'bad' : 'good'; render(); }));
  app.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => { selectedAnswer = Number(button.dataset.answer); render(); }));
  app.querySelector('[data-submit]')?.addEventListener('click', () => { const isCorrect = selectedAnswer === level().question.answer; state = applyAnswer(state, isCorrect); feedback = isCorrect ? `判斷正確。${level().question.reasoning}` : level().question.wrong; feedbackTone = isCorrect ? 'good' : 'bad'; selectedAnswer = null; render(); });
  app.querySelectorAll('[data-hint]').forEach((button) => button.addEventListener('click', () => { state = useHint(state, button.dataset.hint); feedback = button.dataset.hint === 'semantic' ? '先找題幹中的判斷方向，再回到語文線索。' : '已移除一個最容易誤導的選項。'; feedbackTone = 'neutral'; render(); }));
  app.querySelector('[data-restart]')?.addEventListener('click', () => resetLevel());
  app.querySelector('[data-next]')?.addEventListener('click', () => resetLevel(levelIndex + 1));
  app.querySelector('[data-ending]')?.addEventListener('click', () => { app.innerHTML = `<section class="result-card final-ending"><div class="eyebrow">十二關完成</div><h1>太和殿前｜改寫命運</h1><p>你把十二處宮門學到的判斷方法帶進最後的論辯。這是第一版的勝利結局畫面，正式敘事仍待適齡審查。</p><button class="restart-button" data-restart-all>從第一關重新開始</button></section>`; app.querySelector('[data-restart-all]').addEventListener('click', () => resetLevel(0)); });
}

render();
