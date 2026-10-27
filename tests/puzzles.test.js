import assert from 'node:assert/strict';
import { puzzles } from '../src/data/puzzles.js';
import { solvePuzzle, reorderParts } from '../src/puzzles.js';

assert.equal(Object.keys(puzzles).length, 12);
for (const [levelId, puzzle] of Object.entries(puzzles)) {
  assert.ok(puzzle.type, `${levelId} needs a puzzle type`);
  assert.ok(puzzle.title, `${levelId} needs a puzzle title`);
  assert.ok(puzzle.instruction, `${levelId} needs an instruction`);
  assert.equal(solvePuzzle(puzzle, puzzle.answer).ok, true, `${levelId} answer should solve`);
  assert.equal(solvePuzzle(puzzle, '__wrong__').ok, false, `${levelId} wrong answer should fail`);
}

assert.deepEqual(reorderParts(['印章', '名冊', '字形構件卡'], 0, 1), ['名冊', '印章', '字形構件卡']);
console.log('puzzle data tests passed');
