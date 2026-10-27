import { createInitialState, applyDialogueChoice, applyAnswer, useHint } from './game.js';
import { level01 } from './data/levels.js';
import { renderStatus } from './ui/status.js';
import { renderDialogue } from './ui/dialogue.js';
import { renderFeedback } from './ui/feedback.js';

let state = createInitialState();
let selectedAnswer = null;
let feedback = '';
let feedbackTone = 'neutral';

const app = document.querySelector('#app');

function renderQuestion() {
  if (!['question', 'retry'].includes(state.phase)) return '';
  const options = state.hints.eliminate
    ? level01.question.options.filter((option) => option.id !== 'appearance')
    : level01.question.options;
  return `
    <section class="question-card">
      <div class="eyebrow">語文判斷｜${level01.question.status}</div>
      <h2>名冊字形驗籍</h2>
      <p>${level01.question.prompt}</p>
      <div class="answer-list">
        ${options.map((option) => `<button class="answer-button ${selectedAnswer === option.id ? 'selected' : ''}" data-answer="${option.id}">${option.label}</button>`).join('')}
      </div>
      <div class="tools">
        <button class="tool-button" data-hint="semantic" ${state.hints.semantic ? 'disabled' : ''}>語意點醒（不扣才情）</button>
        <button class="tool-button" data-hint="eliminate" ${state.hints.eliminate || state.talent < 10 ? 'disabled' : ''}>排除陷阱（-10 才情）</button>
        <button class="tool-button" data-submit ${selectedAnswer ? '' : 'disabled'}>提交判斷</button>
      </div>
      ${renderFeedback(feedback, feedbackTone)}
    </section>`;
}

function renderResult() {
  if (state.phase === 'success') {
    return `<section class="result-card"><div class="eyebrow">任務完成</div><h2>神武門驗籍完成</h2><p>你沒有只看字的外表，而是回到構件與造字關係。宮門官收起名冊，准你入宮。</p></section>
      <section class="lesson-card"><h2>${level01.lessonCard.title}</h2><p>${level01.lessonCard.body}</p><p class="source-status">${level01.lessonCard.sourceStatus}</p><button class="restart-button" data-restart>重新遊玩</button></section>`;
  }
  if (state.phase === 'failure') {
    return `<section class="result-card"><div class="eyebrow">任務失敗</div><h2>重新推理</h2><p>容止值已歸零。這次先慢下來，重新觀察字形構件與題幹。</p><button class="restart-button" data-restart>重新遊玩</button></section>`;
  }
  return '';
}

function render() {
  app.innerHTML = `
    <header class="topbar">
      <div><div class="eyebrow">第一關｜初選入宮</div><h1>${level01.title}</h1><p class="objective">任務：${level01.objective}</p></div>
      ${renderStatus(state)}
    </header>
    <section class="scene" aria-label="神武門場景"><img class="character" src="${level01.character}" alt="初入宮秀女" /></section>
    ${renderDialogue(level01, state)}
    ${renderQuestion()}
    ${renderResult()}
  `;
  bindEvents();
}

function bindEvents() {
  app.querySelectorAll('[data-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      state = applyDialogueChoice(state, button.dataset.choice);
      feedback = button.dataset.choice === 'careless' ? '你語氣過於草率，容止值下降 10 點。' : '你的回應得體，宮門官允許你進一步驗籍。';
      feedbackTone = button.dataset.choice === 'careless' ? 'bad' : 'good';
      render();
    });
  });
  app.querySelectorAll('[data-answer]').forEach((button) => {
    button.addEventListener('click', () => { selectedAnswer = button.dataset.answer; render(); });
  });
  app.querySelector('[data-submit]')?.addEventListener('click', () => {
    const isCorrect = selectedAnswer === level01.question.answer;
    state = applyAnswer(state, isCorrect);
    feedback = isCorrect ? `判斷正確。${level01.question.reasoning}` : level01.question.wrongReason;
    feedbackTone = isCorrect ? 'good' : 'bad';
    if (isCorrect) selectedAnswer = null;
    render();
  });
  app.querySelectorAll('[data-hint]').forEach((button) => {
    button.addEventListener('click', () => {
      state = useHint(state, button.dataset.hint);
      feedback = button.dataset.hint === 'semantic' ? '先觀察構件，再思考它和字義、字音的關係。' : '已移除一個不符合字形判斷原則的選項。';
      feedbackTone = 'neutral';
      render();
    });
  });
  app.querySelector('[data-restart]')?.addEventListener('click', () => {
    state = createInitialState();
    selectedAnswer = null;
    feedback = '';
    render();
  });
}

render();
