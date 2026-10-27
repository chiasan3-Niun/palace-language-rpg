import { createInitialState, applyDialogueChoice, applyAnswer, useHint, rewardPuzzle } from './game.js';
import { levels } from './data/levels-all.js';
import { questionBank } from './data/question-bank.js';
import { puzzles } from './data/puzzles.js';
import { solvePuzzle, reorderParts } from './puzzles.js';
import { knowledgeCards } from './data/knowledge-cards.js';
import { finalBattle, createBattleState, applyBattleAnswer } from './data/final-battle.js';
import { getRank, createProgression, completeLevel } from './progression.js';
import { timedLevels } from './timed-events.js';
import { createFeatures, updateFeatures, EVENTS, useAmulet } from './features.js';
import { renderStatus } from './ui/status.js';
import { renderFeedback } from './ui/feedback.js';
import { createAudioController } from './audio.js';

const app = document.querySelector('#app');
let phase = 'map';
let runStats = JSON.parse(localStorage.getItem('palace-run-stats') || 'null') || { composure: 100, talent: 0, suspicion: 0 };
let state = { ...createInitialState(), ...runStats };
let cutsceneStep = 0;
let clueOrder = [];
let puzzleSelection = '';
let dragStartIndex = null;
let battleState = createBattleState();
let coupletTiles = ['付微軀', '一曲離歌', '千秋青史'];
let progression = JSON.parse(localStorage.getItem('palace-progression') || 'null') || createProgression();
let timerSeconds = 0;
let timerId = null;
let features = JSON.parse(localStorage.getItem('palace-features') || 'null') || createFeatures();
let featurePanel = '';
let selectedAnswer = null;
let displayedQuestionId = null;
let displayedOptions = [];
let displayedAnswer = null;
let feedback = '';
let levelIndex = 0;
let questionIndex = 0;
let audioError = '';
const completedLevels = new Set(JSON.parse(localStorage.getItem('completedLevels') || '[]'));
const audio = createAudioController({
  onError: () => {
    audioError = '目前瀏覽器無法播放音效，遊戲仍可繼續。';
    render();
  }
});
const level = () => levels[levelIndex];
const questions = () => questionBank[levelIndex].questions;
const currentQuestion = () => questions()[questionIndex];
const clueLabels = { ITEM_01_SCROLL:'秀女宗族名冊', ITEM_02_BOX:'深埋麝香金盒', ITEM_03_POETRY_CARD:'倚梅園剪紙小像', ITEM_04_TOKEN:'一丈紅行刑令牌', ITEM_05_PLAQUE:'金漆千秋賀壽匾', ITEM_06_LOOKUP_CARDS:'太醫藥典索引卡', ITEM_07_SEIZED_LETTER:'搜繳家書密信', ITEM_08_INVITATION_CARD:'皇家祈福柬帖', ITEM_09_AGE_DIAL:'生辰干支算籌盤', ITEM_10_GANZHI_DIAL:'古玉日晷干支盤', ITEM_11_ROYAL_CHRONICLE:'文淵閣先帝起居注', ITEM_12_JADE_SEAL:'傳國奉天玉璽' };

function playSound(name, options) {
  audio.play(name, options);
}

function playLevelBgm() {
  audio.play(`level-bgm-${String(levelIndex + 1).padStart(2, '0')}`, { loop: true, volume: 0.18 });
}

function audioControls() {
  return `<div class="audio-controls"><button class="audio-toggle" type="button" data-audio-toggle aria-pressed="${audio.isEnabled()}">音效：${audio.isEnabled() ? '開啟' : '關閉'}</button>${audioError ? `<span class="audio-status" role="status">${audioError}</span>` : ''}</div>`;
}

function copyrightFooter() {
  return '<footer class="copyright-footer">Niun的族語教學多媒體應用</footer>';
}

function startTimer() { clearInterval(timerId); timerSeconds = timedLevels[level().id] || 0; if (!timerSeconds) return; timerId = setInterval(() => { timerSeconds -= 1; if (timerSeconds <= 0) { clearInterval(timerId); phase = 'failure'; render(); } else render(); }, 1000); }
function stopTimer() { clearInterval(timerId); timerId = null; }

function mapView() {
  const panel = featurePanel === 'inventory' ? `<section class="feature-panel"><h2>語文秘寶背包</h2><p>護身符：${features.amulet} 次</p><div class="inventory-grid">${features.items?.length ? features.items.map((item) => `<article class="inventory-item"><img src="/public/images/items/${item}.png" alt="${clueLabels[item] || item}"><strong>${clueLabels[item] || item}</strong><small>${level().item === item ? level().objective : '已收集的關卡證物'}</small></article>`).join('') : '<p>尚未收集證物</p>'}</div><button data-close-feature>關閉</button></section>` : featurePanel === 'achievements' ? `<section class="feature-panel"><h2>成就與盟友</h2><p>徽章：${features.achievements.length}/${4}</p><p>${features.achievements.join('、') || '尚未解鎖'}</p><p>盟友：${features.allies.join('、') || '尚未結盟'}</p><button data-close-feature>關閉</button></section>` : '';
  return `${audioControls()}<section class="map-screen"><div class="map-title"><div class="eyebrow">紫禁深宮｜語文策</div><h1>宮城風雲圖</h1><p>沿著宮廷動線前進，收集證物，將語文知識變成破局的方法。</p><div class="map-tools"><button data-feature="inventory">查看背包</button><button data-feature="achievements">查看成就與盟友</button></div></div><div class="map-grid">${levels.map((item, i) => { const unlocked = i === 0 || completedLevels.has(i - 1); return `<button class="map-node" data-map="${i}" ${unlocked ? '' : 'disabled'}>第 ${String(i + 1).padStart(2, '0')} 關<br><strong>${item.title}</strong><small>${unlocked ? (completedLevels.has(i) ? '已完成｜可重玩' : '可進入') : '完成前一關後解鎖'}</small></button>`; }).join('')}</div>${panel}</section>`;
}

function cutsceneView() {
  const item = level();
  const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
  const slides = [
    { label: '宮門初啟', text: `晨霧尚未散盡，${item.title}的宮門已經點名。你帶著一份名冊，走進第一個考驗。`, image: item.scene },
    { label: '線索現身', text: `案上留下「${clueLabels[item.item]}」。它不是裝飾，而是解開這一關語文謎題的第一把鑰匙。`, image: item.scene },
    { label: '任務開始', text: item.opening, image: item.character }
  ][cutsceneStep];
  return `<section class="cutscene"><div class="cutscene-card"><div class="eyebrow">${slides.label}｜${item.title}</div><img src="${slides.image}" alt="${item.title}過場畫面"><p>${slides.text}</p>${cutsceneStep === 1 ? `<aside class="event-card"><strong>突發事件｜${event.title}</strong><p>${event.text}</p></aside>` : ''}<button class="restart-button" data-cutscene-next>${cutsceneStep < 2 ? '繼續' : '進入對話'}</button></div></section>`;
}

function puzzleView() {
  if (phase !== 'puzzle') return '';
  const puzzle = puzzles[level().id];
  const input = puzzle.type === 'sequence' ? clueOrder.join('>') : puzzleSelection;
  const solved = solvePuzzle(puzzle, input).ok;
  const wheelValues = ['志學→弱冠→知命', '弱冠→知命→志學', '知命→志學→弱冠'];
  const dialValues = ['干支／時辰／節慶', '干支＝節慶', '節慶＝書信格式'];
  const wheelIndex = Math.max(0, wheelValues.indexOf(puzzleSelection));
  const dialIndex = Math.max(0, dialValues.indexOf(puzzleSelection));
  const wheel = puzzle.type === 'age' ? `<label class="dial-control">年齡稱謂順序<input type="range" min="0" max="2" step="1" value="${wheelIndex}" data-dial><output>${wheelValues[wheelIndex]}</output></label>` : '';
  const sundial = puzzle.type === 'calendar' ? `<label class="dial-control">日晷校正刻度<input type="range" min="0" max="2" step="1" value="${dialIndex}" data-dial><output>${dialValues[dialIndex]}</output></label>` : '';
  const classification = puzzle.type === 'classification' ? `<div class="clue-board">${puzzle.parts.map((part, index) => `<button class="clue-part ${puzzleSelection === part ? 'selected' : ''}" draggable="true" data-puzzle-option="${part}" data-puzzle-index="${index}"><strong>${part}</strong></button>`).join('')}</div><div class="drop-target" data-classification-target>${puzzleSelection || puzzle.target}</div>` : '';
  const choices = wheel || sundial || classification || `<div class="clue-board">${puzzle.parts.map((part, index) => `<button class="clue-part ${puzzle.type === 'sequence' ? (clueOrder.includes(part) ? 'selected' : '') : (puzzleSelection === part ? 'selected' : '')}" ${puzzle.type === 'sequence' ? 'draggable="true"' : ''} data-puzzle-option="${part}" data-puzzle-index="${index}"><strong>${puzzle.type === 'sequence' ? `${index + 1}. ` : ''}${part}</strong></button>`).join('')}</div>`;
  return `<section class="puzzle-card"><div class="eyebrow">解密小遊戲｜${level().mechanic}${timerSeconds ? `｜倒數 ${timerSeconds} 秒` : ''}</div><img class="puzzle-art" src="../public/images/items/${level().item}.png" alt="${clueLabels[level().item]}"><h2>${puzzle.title}</h2><p>${puzzle.instruction}</p>${choices}${puzzle.type === 'sequence' ? '<p class="puzzle-help">可拖曳線索卡，也可依序點擊排列。</p>' : ''}${solved ? `<div class="feedback good">${puzzle.successText}</div>` : '<div class="feedback">請根據本關語文線索重新排列或選擇。</div>'}<button class="restart-button" data-puzzle-next ${solved ? '' : 'disabled'}>進入語文判斷</button></section>`;
}

function dialogueView() {
  if (phase !== 'dialogue') return '';
  return `<section class="dialogue-card"><div class="speaker">宮門官</div><p>${level().prompt}</p><div class="choice-list">${level().choices.map(([id, text]) => `<button class="choice-button" data-choice="${id}">${text}</button>`).join('')}</div></section>`;
}

function questionView() {
  if (!['question', 'retry'].includes(phase)) return '';
  const q = currentQuestion();
  if (displayedQuestionId !== q.id) {
    const shuffled = q.options.map((text, index) => ({ text, index })).sort(() => Math.random() - 0.5);
    displayedOptions = shuffled;
    displayedAnswer = shuffled.findIndex((item) => item.index === q.answer);
    displayedQuestionId = q.id;
  }
  const removable = displayedOptions.find((item) => item.index !== q.answer);
  const options = state.hints.eliminate ? displayedOptions.filter((item) => item !== removable) : displayedOptions;
  return `<section class="question-card"><div class="eyebrow">${level().knowledge}｜第 ${questionIndex + 1}／${questions().length} 題｜${q.type}｜專案自編・AI 初審完成</div><h2>用線索判斷</h2><p>${q.prompt}</p><div class="answer-list">${options.map((item) => `<button class="answer-button ${selectedAnswer === item.index ? 'selected' : ''}" data-answer="${item.index}">${item.text}</button>`).join('')}</div><div class="tools"><button class="tool-button" data-hint="semantic" ${state.hints.semantic ? 'disabled' : ''}>語意點醒</button><button class="tool-button" data-hint="eliminate" ${state.hints.eliminate || state.talent < 10 ? 'disabled' : ''}>排除陷阱（-10）</button><button class="tool-button" data-hint="micro" ${state.hints.micro || state.talent < 25 ? 'disabled' : ''}>微課錦囊（-25）</button><button class="tool-button" data-submit ${selectedAnswer === null ? 'disabled' : ''}>提交判斷</button></div>${renderFeedback(feedback, phase === 'success' ? 'good' : 'neutral')}</section>`;
}

function finalBattleView() {
  if (phase !== 'final-battle') return '';
  const stage = finalBattle[battleState.stage];
  if (!stage) return '';
  const tiles = stage.tiles ? `<div class="couplet-tiles" aria-label="對聯候選字塊">${coupletTiles.map((tile, index) => `<button class="clue-part" draggable="true" data-couplet-tile="${index}" type="button">${tile}</button>`).join('')}</div><p class="puzzle-help">請拖曳字塊排列成「一曲離歌／千秋青史／付微軀」。</p>` : '';
  return `<section class="question-card final-battle"><div class="eyebrow">養心殿｜皇權執念值 ${battleState.resolve}/1000${progression.suspicion >= 80 ? '｜九五威壓 +50%' : ''}</div><h2>${stage.title}</h2><p>${stage.prompt}</p>${tiles}<div class="answer-list">${stage.options.map((text, index) => `<button class="answer-button" data-battle-answer="${index}">${text}</button>`).join('')}</div></section>`;
}

function resultView() {
  if (phase !== 'success' && phase !== 'failure') return '';
  if (phase === 'failure') return `<section class="result-card"><h2>線索中斷</h2><p>容止值已歸零，請重新整理證物。</p><button class="restart-button" data-restart>重新開始</button></section>`;
  const card = knowledgeCards[level().id];
  const ending = levelIndex === 11 ? '你完成三階段殿前論辯，奪回文本解釋權。' : `三題已完成。${currentQuestion().reason}`;
  return `<section class="result-card"><div class="eyebrow">${levelIndex === 11 ? '十二關完成｜改寫命運' : '證物解鎖｜知識整理卡'}</div><h2>${level().title}完成</h2><p>${ending}</p>${levelIndex === 11 ? '<p class="final-ending">你取得傳國玉璽，讓文本與命運不再只由權威定義。</p>' : ''}<article class="knowledge-card"><h3>${card.title}</h3><p>${card.summary}</p><ul>${card.keyPoints.map((point) => `<li>${point}</li>`).join('')}</ul></article><button class="restart-button" data-map-back>返回宮城地圖</button></section>`;
}

function render() {
  runStats = { composure: state.composure, talent: state.talent, suspicion: Math.max(state.suspicion || 0, progression.suspicion || 0) };
  localStorage.setItem('palace-run-stats', JSON.stringify(runStats));
  progression = { ...progression, suspicion: Math.max(progression.suspicion, state.suspicion || 0) };
  if (phase === 'map') { app.innerHTML = `${mapView()}${copyrightFooter()}`; }
  else { state = { ...state, suspicion: Math.max(progression.suspicion, state.suspicion || 0) }; const rank = getRank(progression.completed.length); const character = levelIndex === 0 ? (rank.index >= 2 ? '../public/images/characters/CH_PROTAGONIST_01_relieved.png' : '../public/images/characters/CH_PROTAGONIST_01_neutral.png') : level().character; app.innerHTML = `${audioControls()}<header class="topbar"><div><div class="eyebrow">第 ${levelIndex + 1}／12 關｜${level().subtitle}｜品階：${rank.name}</div><h1>${level().title}</h1><p class="objective">任務：${level().objective}</p></div>${renderStatus(state)}</header><section class="scene" aria-label="${level().title}場景"><img class="character" src="${character}" alt="${level().title}角色"><div class="clue-chip">劇情證物：${clueLabels[level().item]}｜背包 ${progression.items.length} 件</div></section>${phase === 'cutscene' ? cutsceneView() : ''}${phase === 'puzzle' ? puzzleView() : ''}${dialogueView()}${questionView()}${finalBattleView()}${resultView()}${copyrightFooter()}`; }
  bind();
}

function reset() { state = { ...createInitialState(), ...runStats }; cutsceneStep = 0; clueOrder = puzzles[level().id]?.type === 'sequence' ? [...puzzles[level().id].parts] : []; puzzleSelection = ''; battleState = createBattleState(); coupletTiles = ['付微軀', '一曲離歌', '千秋青史']; questionIndex = 0; displayedQuestionId = null; displayedOptions = []; displayedAnswer = null; selectedAnswer = null; feedback = ''; render(); }
function bind() {
  app.querySelector('[data-audio-toggle]')?.addEventListener('click', () => { audioError = ''; audio.toggle(); render(); });
  app.querySelectorAll('[data-feature]').forEach((b) => b.addEventListener('click', () => { featurePanel = b.dataset.feature; render(); }));
  app.querySelector('[data-close-feature]')?.addEventListener('click', () => { featurePanel = ''; render(); });
  app.querySelectorAll('[data-map]').forEach((b) => b.addEventListener('click', () => { audio.stopAll(); levelIndex = Number(b.dataset.map); playSound('map-enter'); playLevelBgm(); phase = 'cutscene'; reset(); }));
  app.querySelector('[data-cutscene-next]')?.addEventListener('click', () => { if (cutsceneStep === 0) playSound('level-enter'); if (cutsceneStep < 2) cutsceneStep += 1; else phase = 'puzzle'; render(); });
  app.querySelectorAll('[data-puzzle-option]').forEach((b) => b.addEventListener('click', () => { playSound('clue-click'); const puzzle = puzzles[level().id]; const value = b.dataset.puzzleOption; if (puzzle.type === 'sequence') { if (!clueOrder.includes(value)) clueOrder.push(value); } else puzzleSelection = value; render(); }));
  app.querySelectorAll('[data-dial]').forEach((dial) => dial.addEventListener('input', () => { puzzleSelection = dial.value === '0' ? (puzzles[level().id].type === 'age' ? '志學→弱冠→知命' : '干支／時辰／節慶') : dial.value; render(); }));
  app.querySelectorAll('[data-classification-target]').forEach((target) => { target.addEventListener('dragover', (event) => event.preventDefault()); target.addEventListener('drop', (event) => { event.preventDefault(); const value = event.dataTransfer?.getData('text/plain'); if (value) { puzzleSelection = value; render(); } }); });
  app.querySelectorAll('[data-puzzle-option][draggable="true"]').forEach((b) => b.addEventListener('dragstart', (event) => event.dataTransfer?.setData('text/plain', b.dataset.puzzleOption)));
  app.querySelectorAll('[data-puzzle-option][draggable="true"]').forEach((b) => {
    b.addEventListener('dragstart', () => { dragStartIndex = Number(b.dataset.puzzleIndex); b.classList.add('dragging'); });
    b.addEventListener('dragend', () => { dragStartIndex = null; b.classList.remove('dragging'); });
    b.addEventListener('dragover', (event) => event.preventDefault());
    b.addEventListener('drop', (event) => { event.preventDefault(); const target = Number(b.dataset.puzzleIndex); if (dragStartIndex === null || dragStartIndex === target) return; const order = clueOrder.length ? clueOrder : puzzles[level().id].parts; clueOrder = reorderParts(order, dragStartIndex, target); render(); });
  });
  app.querySelector('[data-puzzle-next]')?.addEventListener('click', () => { playSound('puzzle-complete'); state = rewardPuzzle(state); phase = 'dialogue'; startTimer(); render(); });
  app.querySelectorAll('[data-choice]').forEach((b) => b.addEventListener('click', () => { playSound('dialogue-choice'); state = applyDialogueChoice(state, b.dataset.choice); if (b.dataset.choice === 'careless') { progression = { ...progression, suspicion: Math.min(100, progression.suspicion + 5) }; localStorage.setItem('palace-progression', JSON.stringify(progression)); } phase = levelIndex === 11 ? 'final-battle' : 'question'; render(); }));
  app.querySelectorAll('[data-battle-answer]').forEach((b) => b.addEventListener('click', () => { const stage = finalBattle[battleState.stage]; if (stage.id === 'couplet' && coupletTiles.join('|') !== '一曲離歌|千秋青史|付微軀') { feedback = '先把對聯字塊排列成完整下聯。'; render(); return; } const result = applyBattleAnswer(battleState, Number(b.dataset.battleAnswer)); if (result.failed) { progression = completeLevel(progression, levelIndex, level().item, false); localStorage.setItem('palace-progression', JSON.stringify(progression)); playSound('answer-wrong'); phase = 'failure'; } else { playSound('answer-correct'); battleState = result; phase = result.won ? 'success' : 'final-battle'; if (result.won) { progression = completeLevel(progression, levelIndex, level().item); features = updateFeatures({ ...features, items: progression.items }, progression.completed.length, levelIndex); localStorage.setItem('palace-progression', JSON.stringify(progression)); localStorage.setItem('palace-features', JSON.stringify(features)); completedLevels.add(levelIndex); localStorage.setItem('completedLevels', JSON.stringify([...completedLevels])); stopTimer(); playSound('level-complete'); } } render(); }));
  let coupletDragIndex = null;
  app.querySelectorAll('[data-couplet-tile]').forEach((tile) => { tile.addEventListener('dragstart', () => { coupletDragIndex = Number(tile.dataset.coupletTile); }); tile.addEventListener('dragover', (event) => event.preventDefault()); tile.addEventListener('drop', (event) => { event.preventDefault(); const target = Number(tile.dataset.coupletTile); if (coupletDragIndex === null || coupletDragIndex === target) return; const next = [...coupletTiles]; const [moved] = next.splice(coupletDragIndex, 1); next.splice(target, 0, moved); coupletTiles = next; render(); }); });
  app.querySelectorAll('[data-answer]').forEach((b) => b.addEventListener('click', () => { playSound('ui-click'); selectedAnswer = Number(b.dataset.answer); render(); }));
  app.querySelector('[data-submit]')?.addEventListener('click', () => { const q = currentQuestion(); const ok = selectedAnswer === q.answer; if (ok) playSound('answer-correct'); else playSound('answer-wrong'); state = applyAnswer(state, ok); feedback = ok ? `答對，才情值 +10。${q.reason}` : q.reason; if (ok && questionIndex < questions().length - 1) { questionIndex += 1; displayedQuestionId = null; phase = 'question'; state = { ...state, hints: { semantic: false, eliminate: false, micro: false } }; } else { phase = state.phase === 'failure' ? 'failure' : ok ? 'success' : 'retry'; if (phase === 'failure' && features.amulet > 0) { features = useAmulet(features); localStorage.setItem('palace-features', JSON.stringify(features)); phase = 'retry'; feedback = '太后懿旨護身符替你擋下一次失誤。'; } if (ok) { progression = completeLevel(progression, levelIndex, level().item); features = updateFeatures({ ...features, items: progression.items }, progression.completed.length, levelIndex); localStorage.setItem('palace-progression', JSON.stringify(progression)); localStorage.setItem('palace-features', JSON.stringify(features)); completedLevels.add(levelIndex); localStorage.setItem('completedLevels', JSON.stringify([...completedLevels])); stopTimer(); } if (phase === 'failure') playSound('level-failure'); if (phase === 'success') playSound('level-complete'); } selectedAnswer = null; render(); });
  app.querySelectorAll('[data-hint]').forEach((b) => b.addEventListener('click', () => { playSound('ui-click'); state = useHint(state, b.dataset.hint); feedback = b.dataset.hint === 'semantic' ? '回到字形構件與題幹的關係。' : b.dataset.hint === 'micro' ? knowledgeCards[level().id].summary : '已排除一個錯誤選項。'; render(); }));
  app.querySelector('[data-restart]')?.addEventListener('click', () => { if (features.amulet > 0) { features = useAmulet(features); localStorage.setItem('palace-features', JSON.stringify(features)); } runStats = { ...runStats, composure: 100 }; localStorage.setItem('palace-run-stats', JSON.stringify(runStats)); audio.stopAll(); phase = 'puzzle'; playLevelBgm(); reset(); startTimer(); });
  app.querySelector('[data-map-back]')?.addEventListener('click', () => { audio.stopAll(); stopTimer(); phase = 'map'; render(); });
}

app.className = 'immersive-shell';
render();
