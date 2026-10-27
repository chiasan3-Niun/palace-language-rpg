export const finalBattle = [
  { id: 'edict', title: '第一階段｜辨駁偽詔', prompt: '詔書中的句法與斷句破綻在哪裡？', options: ['找出主賓顛倒與斷句錯誤', '只服從皇上語氣', '刪去不利文字'], answer: 0, damage: 300, feedback: '你以句法與斷句拆穿偽詔。' },
  { id: 'couplet', title: '第二階段｜平仄律聯', prompt: '從候選字塊中組織下聯，再判斷需要檢查的條件。', tiles: ['一曲離歌', '千秋青史', '付微軀'], options: ['字數、詞性、對仗與平仄', '只看最後一字', '只看墨色'], answer: 0, damage: 400, feedback: '對仗與聲律形成反制皇權的第二擊。' },
  { id: 'history', title: '第三階段｜四庫定案', prompt: '引用史書反駁天命時，最可靠的做法是什麼？', options: ['以內容、體例與民本證據逐段論證', '直接奪取玉璽', '重複皇上語句'], answer: 0, damage: 300, feedback: '你以史學與文本證據完成最後論辯。' }
];

export function createBattleState() {
  return { stage: 0, resolve: 1000, won: false, failed: false };
}

export function applyBattleAnswer(state, answerIndex) {
  if (state.won || state.failed) return state;
  const stage = finalBattle[state.stage];
  if (answerIndex !== stage.answer) return { ...state, failed: true };
  const resolve = Math.max(0, state.resolve - stage.damage);
  return { ...state, resolve, stage: state.stage + 1, won: resolve === 0 };
}
