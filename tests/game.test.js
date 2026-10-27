import assert from 'node:assert/strict';
import { createInitialState, applyDialogueChoice, applyAnswer, useHint } from '../src/game.js';

const initial = createInitialState();
assert.equal(initial.composure, 100);
assert.equal(initial.talent, 0);
assert.equal(initial.phase, 'dialogue');

const respectful = applyDialogueChoice(initial, 'respectful');
assert.equal(respectful.composure, 100);
assert.equal(respectful.phase, 'question');

const careless = applyDialogueChoice(initial, 'careless');
assert.equal(careless.composure, 90);
assert.equal(careless.phase, 'question');

const correct = applyAnswer(respectful, true);
assert.equal(correct.composure, 100);
assert.equal(correct.talent, 10);
assert.equal(correct.phase, 'success');

const wrong = applyAnswer(respectful, false);
assert.equal(wrong.composure, 85);
assert.equal(wrong.phase, 'retry');

const pointed = useHint(respectful, 'semantic');
assert.equal(pointed.talent, 0);
assert.equal(pointed.hints.semantic, true);

const eliminated = useHint(correct, 'eliminate');
assert.equal(eliminated.talent, 0);
assert.equal(eliminated.hints.eliminate, true);

const insufficient = useHint(createInitialState(), 'eliminate');
assert.equal(insufficient.hints.eliminate, false);

console.log('game state tests passed');
