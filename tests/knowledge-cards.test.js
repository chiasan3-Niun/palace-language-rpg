import assert from 'node:assert/strict';
import { knowledgeCards } from '../src/data/knowledge-cards.js';

assert.equal(Object.keys(knowledgeCards).length, 12);
for (const [levelId, card] of Object.entries(knowledgeCards)) {
  assert.ok(card.title, `${levelId} needs a card title`);
  assert.ok(card.summary, `${levelId} needs a summary`);
  assert.ok(card.keyPoints.length >= 2, `${levelId} needs at least two key points`);
}
console.log('knowledge card tests passed');
