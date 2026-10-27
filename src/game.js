const MAX_COMPOSURE = 100;
const MAX_TALENT = 100;

export function createInitialState() {
  return {
    composure: MAX_COMPOSURE,
    talent: 0,
    phase: 'dialogue',
    hints: { semantic: false, eliminate: false }
  };
}

export function applyDialogueChoice(state, choice) {
  return {
    ...state,
    composure: choice === 'careless' ? Math.max(0, state.composure - 10) : state.composure,
    phase: 'question'
  };
}

export function applyAnswer(state, isCorrect) {
  if (isCorrect) {
    return {
      ...state,
      talent: Math.min(MAX_TALENT, state.talent + 10),
      phase: 'success'
    };
  }

  const composure = Math.max(0, state.composure - 15);
  return { ...state, composure, suspicion: Math.min(100, (state.suspicion || 0) + 5), phase: composure === 0 ? 'failure' : 'retry' };
}

export function useHint(state, hintType) {
  if (state.hints[hintType]) return state;
  if (hintType === 'eliminate' && state.talent < 10) return state;
  if (hintType === 'micro' && state.talent < 25) return state;

  return {
    ...state,
    talent: hintType === 'eliminate' ? state.talent - 10 : hintType === 'micro' ? state.talent - 25 : state.talent,
    hints: { ...state.hints, [hintType]: true }
  };
}

export function rewardPuzzle(state) {
  return { ...state, talent: Math.min(MAX_TALENT, state.talent + 5) };
}

export function addSuspicion(state, amount = 5) {
  return { ...state, suspicion: Math.min(100, (state.suspicion || 0) + amount) };
}
