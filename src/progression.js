const ranks = ['官女子', '答應', '常在', '貴人', '嬪', '妃', '貴妃', '皇貴妃', '聖母皇太后'];
export function getRank(completedCount) { return { name: ranks[Math.min(ranks.length - 1, completedCount)], index: Math.min(ranks.length - 1, completedCount) }; }
export function createProgression() { return { completed: [], items: [], suspicion: 0 }; }
export function completeLevel(progress, levelIndex, item, correct = true) {
  return { completed: progress.completed.includes(levelIndex) ? progress.completed : [...progress.completed, levelIndex].sort((a, b) => a - b), items: progress.items.includes(item) ? progress.items : [...progress.items, item], suspicion: Math.min(100, progress.suspicion + (correct ? 0 : 5)) };
}
