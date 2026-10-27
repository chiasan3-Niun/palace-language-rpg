export const ACHIEVEMENTS = Object.freeze([
  { id: 'six-books', name: '六書宗師', requirement: 0 },
  { id: 'rhetoric', name: '修辭巧舌', requirement: 2 },
  { id: 'couplet', name: '對聯魁首', requirement: 11 },
  { id: 'clear', name: '十二關全通', requirement: 12 }
]);

export const FACTIONS = Object.freeze(['太后派', '太醫盟', '文臣派']);
export const EVENTS = Object.freeze([
  { id: 'spy', title: '各宮眼線探聽', text: '有人正在打聽你的答題表現。保持容止，避免猜忌上升。' },
  { id: 'recitation', title: '御前突擊考校', text: '臨時考校即將開始，下一題答錯會增加猜忌值。' },
  { id: 'banquet', title: '夜宴抽查', text: '夜宴席間有人要求你立刻辨析題辭。' }
]);

export function createFeatures() { return { achievements: [], allies: [], amulet: 1, seenEvents: [] }; }
export function updateFeatures(features, completed, levelIndex) {
  const achievements = ACHIEVEMENTS.filter((item) => completed >= item.requirement && !features.achievements.includes(item.id)).map((item) => item.id);
  const ally = levelIndex === 5 ? '太醫盟' : levelIndex === 7 ? '太后派' : levelIndex === 10 ? '文臣派' : null;
  return { ...features, achievements: [...features.achievements, ...achievements], allies: ally && !features.allies.includes(ally) ? [...features.allies, ally] : features.allies };
}
export function useAmulet(features) { return features.amulet > 0 ? { ...features, amulet: features.amulet - 1 } : features; }
