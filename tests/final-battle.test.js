import assert from 'node:assert/strict';
import { finalBattle, createBattleState, applyBattleAnswer } from '../src/data/final-battle.js';

assert.equal(finalBattle.length, 3);
assert.deepEqual(finalBattle.map((stage) => stage.id), ['edict', 'couplet', 'history']);
let state = createBattleState();
assert.equal(state.resolve, 1000);
state = applyBattleAnswer(state, 0);
assert.equal(state.resolve, 700);
assert.equal(state.stage, 1);
state = applyBattleAnswer(state, 0);
assert.equal(state.resolve, 300);
state = applyBattleAnswer(state, 0);
assert.equal(state.resolve, 0);
assert.equal(state.won, true);
assert.equal(applyBattleAnswer(createBattleState(), 1).resolve, 1000);
console.log('final battle tests passed');
