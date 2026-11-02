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
let galleryItem = null;
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
const achievementBadges = { 'six-books': 'UI_LEVEL_BADGE_01.svg', rhetoric: 'UI_LEVEL_BADGE_03.svg', couplet: 'UI_LEVEL_BADGE_12.svg', clear: 'UI_LEVEL_BADGE_12.svg' };
const achievementNames = { 'six-books': '六書宗師', rhetoric: '修辭巧舌', couplet: '對聯魁首', clear: '十二關全通' };
const allyImages = { '太醫盟': 'CH_TAIYI_PHYSICIAN_reassured.png', '太后派': 'CH_CHANGCHUN_DOWAGER_blessing.png', '文臣派': 'CH_WENHUA_SCHOLAR_approving.png' };
const galleryStories = {
  ITEM_01_SCROLL: { type: '物品', title: '秀女宗族名冊', image: '/public/images/items/ITEM_01_SCROLL.png', detail: '第一關取得的宗族名冊。', story: '名冊不只是姓名清單，也反映宮廷如何用文字整理身分、親屬與責任。讀名冊時，先看格式與欄位，再判斷內容是否可信。' },
  ITEM_02_BOX: { type: '物品', title: '深埋麝香金盒', image: '/public/images/items/ITEM_02_BOX.png', detail: '第二關取得的香盒。', story: '宮廷香料常同時具有日常、醫療與政治用途。同一件物品放在不同情境裡，意義可能完全不同，因此線索必須和文字記錄一起判讀。' },
  ITEM_03_POETRY_CARD: { type: '物品', title: '倚梅園剪紙小像', image: '/public/images/items/ITEM_03_POETRY_CARD.png', detail: '第三關取得的詩文線索。', story: '剪紙與題詩常把圖像、文字和祝願放在一起。讀者不只看表面圖案，也要留意借代、象徵和語境。' },
  ITEM_04_TOKEN: { type: '物品', title: '一丈紅行刑令牌', image: '/public/images/items/ITEM_04_TOKEN.png', detail: '第四關取得的令牌。', story: '令牌代表的是命令與權力的轉移。辨讀相關文字時，主語、動詞和受詞的位置，會直接影響誰下令、誰執行。' },
  ITEM_05_PLAQUE: { type: '物品', title: '金漆千秋賀壽匾', image: '/public/images/items/ITEM_05_PLAQUE.png', detail: '第五關取得的賀壽匾。', story: '賀壽題辭要符合對象、場合與目的。華麗的字面之外，還要確認祝賀、哀輓或表彰等語意是否相合。' },
  ITEM_06_LOOKUP_CARDS: { type: '物品', title: '太醫藥典索引卡', image: '/public/images/items/ITEM_06_LOOKUP_CARDS.png', detail: '第六關取得的索引卡。', story: '傳統字書常用部首與筆畫建立查找路徑。查字時先找到可辨識的構件，再逐步縮小範圍，是一種有順序的閱讀策略。' },
  ITEM_07_SEIZED_LETTER: { type: '物品', title: '搜繳家書密信', image: '/public/images/items/ITEM_07_SEIZED_LETTER.png', detail: '第七關取得的家書。', story: '書信的稱謂、署名和身分關係都是重要證據。紙張新舊或墨色深淺只能提供線索，格式與語意的矛盾往往更能揭露問題。' },
  ITEM_08_INVITATION_CARD: { type: '物品', title: '皇家祈福柬帖', image: '/public/images/items/ITEM_08_INVITATION_CARD.png', detail: '第八關取得的柬帖。', story: '柬帖重視資訊位置與禮貌格式。對象、時間、席設和敬辭缺一不可，形式本身就是對收件人的尊重。' },
  ITEM_09_AGE_DIAL: { type: '物品', title: '生辰干支算籌盤', image: '/public/images/items/ITEM_09_AGE_DIAL.png', detail: '第九關取得的年齡輪盤。', story: '「志學、弱冠、知命」把人生階段濃縮成文化稱謂。理解這些詞時，要把字面、年齡和使用情境放在一起看。' },
  ITEM_10_GANZHI_DIAL: { type: '物品', title: '古玉日晷干支盤', image: '/public/images/items/ITEM_10_GANZHI_DIAL.png', detail: '第十關取得的日晷。', story: '干支、時辰與節慶是不同的時間系統。先分清楚各自的單位與用途，才不會把曆法、一天的時段和節日混成一件事。' },
  ITEM_11_ROYAL_CHRONICLE: { type: '物品', title: '文淵閣先帝起居注', image: '/public/images/items/ITEM_11_ROYAL_CHRONICLE.png', detail: '第十一關取得的史料。', story: '典籍分類不能只看書本厚薄或外觀，還要回到內容與編寫體例。分類的目的，是幫助讀者找到正確的閱讀方法。' },
  ITEM_12_JADE_SEAL: { type: '物品', title: '傳國奉天玉璽', image: '/public/images/items/ITEM_12_JADE_SEAL.png', detail: '第十二關取得的玉璽。', story: '玉璽象徵權力，但真正能讓論證站得住腳的，仍是句法、語意與證據。遊戲最後留下的問題是：誰有權解釋文本？' },
  'six-books': { type: '成就', title: '六書宗師', image: '/public/images/ui/UI_LEVEL_BADGE_01.svg', detail: '掌握文字構形與檢索方法。', story: '六書是傳統文字學用來觀察漢字構形與用法的分類觀念。它提醒我們，文字不是孤立的圖案，而是形、音、義互相連結的系統。' },
  rhetoric: { type: '成就', title: '修辭巧舌', image: '/public/images/ui/UI_LEVEL_BADGE_03.svg', detail: '能從語境判斷修辭作用。', story: '修辭不是把句子裝飾得更華麗，而是讓語意更準確、更有力量。理解借代、對比或設問時，必須回到說話情境。' },
  couplet: { type: '成就', title: '對聯魁首', image: '/public/images/ui/UI_LEVEL_BADGE_12.svg', detail: '完成對聯與文句判讀。', story: '對聯講究字數、結構、詞性與意義相對。排列字塊時，形式與內容要同時成立，才算真正讀懂。' },
  clear: { type: '成就', title: '十二關全通', image: '/public/images/ui/UI_LEVEL_BADGE_12.svg', detail: '完成十二關宮廷語文考驗。', story: '這枚徽章代表你把線索、語文知識與判斷連成一條路，從看見證物走到重新取得解釋權。' },
  '太醫盟': { type: '盟友', title: '太醫盟', image: '/public/images/characters/CH_TAIYI_PHYSICIAN_reassured.png', detail: '提供檢索與證據判讀支援。', story: '太醫院在宮廷中不只處理疾病，也累積大量記錄、藥典與分類知識。盟友的力量，來自能把零散資料整理成可查證的證據。' },
  '太后派': { type: '盟友', title: '太后派', image: '/public/images/characters/CH_CHANGCHUN_DOWAGER_blessing.png', detail: '提供禮制與宮廷情境支援。', story: '宮廷禮制透過稱謂、場合與程序維持秩序。理解禮制不是只背規則，而是看出每個用語背後的關係。' },
  '文臣派': { type: '盟友', title: '文臣派', image: '/public/images/characters/CH_WENHUA_SCHOLAR_approving.png', detail: '提供典籍與論證支援。', story: '文臣的工作包括整理典籍、撰寫文書與提出論證。文字判斷若沒有來源與理由，就很容易只剩下權威口吻。' }
};

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
  const achievementCards = features.achievements?.length ? `<div class="achievement-grid">${features.achievements.map((id) => `<article class="achievement-card"><button class="gallery-trigger" data-gallery-id="${id}" type="button"><img src="/public/images/ui/${achievementBadges[id]}" alt="${achievementNames[id] || id}"></button><strong>${achievementNames[id] || id}</strong></article>`).join('')}</div>` : '<p>尚未解鎖成就</p>';
  const allyCards = features.allies?.length ? `<div class="ally-grid">${features.allies.map((ally) => `<article class="ally-card"><button class="gallery-trigger" data-gallery-id="${ally}" type="button"><img src="/public/images/characters/${allyImages[ally]}" alt="${ally}"></button><strong>${ally}</strong></article>`).join('')}</div>` : '<p>尚未結盟</p>';
  const gallery = galleryItem ? galleryModalView() : '';
  const panel = featurePanel === 'inventory' ? `<section class="feature-panel"><h2>語文秘寶背包</h2><p>護身符：${features.amulet} 次</p><div class="inventory-grid">${features.items?.length ? features.items.map((item) => `<article class="inventory-item"><button class="gallery-trigger" data-gallery-id="${item}" type="button"><img src="/public/images/items/${item}.png" alt="${clueLabels[item] || item}"></button><strong>${clueLabels[item] || item}</strong><small>${level().item === item ? level().objective : '已收集的關卡證物'}</small></article>`).join('') : '<p>尚未收集證物</p>'}</div><button data-close-feature>關閉</button></section>` : featurePanel === 'achievements' ? `<section class="feature-panel"><h2>成就與盟友</h2><p>徽章：${features.achievements.length}/${4}</p>${achievementCards}<p>盟友：${features.allies.length ? '' : '尚未結盟'}</p>${allyCards}<button data-close-feature>關閉</button></section>` : '';
  return `${audioControls()}<section class="map-screen"><div class="map-title"><div class="eyebrow">紫禁深宮｜語文策</div><h1>宮城風雲圖</h1><p>沿著宮廷動線前進，收集證物，將語文知識變成破局的方法。</p><div class="map-tools"><button data-feature="inventory">查看背包</button><button data-feature="achievements">查看成就與盟友</button></div></div><div class="map-grid">${levels.map((item, i) => { const unlocked = i === 0 || completedLevels.has(i - 1); return `<button class="map-node" data-map="${i}" ${unlocked ? '' : 'disabled'}>第 ${String(i + 1).padStart(2, '0')} 關<br><strong>${item.title}</strong><small>${unlocked ? (completedLevels.has(i) ? '已完成｜可重玩' : '可進入') : '完成前一關後解鎖'}</small></button>`; }).join('')}</div>${panel}</section>${gallery}`;
}

function galleryModalView() {
  const item = galleryStories[galleryItem];
  if (!item) return '';
  return `<div class="gallery-modal" data-gallery-backdrop role="dialog" aria-modal="true" aria-label="${item.title}"><article class="gallery-dialog"><button class="gallery-close" data-gallery-close type="button" aria-label="關閉">×</button><div class="eyebrow">${item.type}圖鑑</div><img class="gallery-image" src="${item.image}" alt="${item.title}"><h2>${item.title}</h2><p class="gallery-detail">${item.detail}</p><div class="gallery-story"><strong>文化小故事</strong><p>${item.story}</p></div></article></div>`;
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
  app.querySelectorAll('[data-gallery-id]').forEach((b) => b.addEventListener('click', () => { galleryItem = b.dataset.galleryId; render(); }));
  app.querySelector('[data-gallery-close]')?.addEventListener('click', () => { galleryItem = null; render(); });
  app.querySelector('[data-gallery-backdrop]')?.addEventListener('click', (event) => { if (event.target === event.currentTarget) { galleryItem = null; render(); } });
  if (galleryItem) document.addEventListener('keydown', closeGalleryOnEscape, { once: true });
  app.querySelectorAll('[data-map]').forEach((b) => b.addEventListener('click', () => { audio.stopAll(); levelIndex = Number(b.dataset.map); playSound('map-enter'); playLevelBgm(); phase = 'cutscene'; reset(); }));
  app.querySelector('[data-cutscene-next]')?.addEventListener('click', () => { if (cutsceneStep === 0) playSound('level-enter'); if (cutsceneStep < 2) cutsceneStep += 1; else phase = 'puzzle'; render(); });
  app.querySelectorAll('[data-puzzle-option]').forEach((b) => b.addEventListener('click', () => { playSound('clue-click'); const puzzle = puzzles[level().id]; const value = b.dataset.puzzleOption; if (puzzle.type === 'sequence') { if (!clueOrder.includes(value)) clueOrder.push(value); } else puzzleSelection = value; render(); }));
  app.querySelectorAll('[data-dial]').forEach((dial) => dial.addEventListener('change', () => {
    const puzzle = puzzles[level().id];
    const values = puzzle.type === 'age'
      ? ['志學→弱冠→知命', '弱冠→知命→志學', '知命→志學→弱冠']
      : ['干支／時辰／節慶', '干支＝節慶', '節慶＝書信格式'];
    puzzleSelection = values[Number(dial.value)];
    render();
  }));
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

function closeGalleryOnEscape(event) {
  if (event.key === 'Escape' && galleryItem) { galleryItem = null; render(); }
}

app.className = 'immersive-shell';
render();
