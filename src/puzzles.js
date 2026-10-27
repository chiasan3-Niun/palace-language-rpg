export function solvePuzzle(puzzle, input) {
  const ok = input === puzzle.answer;
  return { ok, feedback: ok ? puzzle.successText : '證物關係尚未對上，請回到題目的語文線索。' };
}

export function reorderParts(parts, fromIndex, toIndex) {
  const next = [...parts];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}
