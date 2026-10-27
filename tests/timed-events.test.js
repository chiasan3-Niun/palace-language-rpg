import assert from 'node:assert/strict';
import { timedLevels, isTimeExpired } from '../src/timed-events.js';
assert.equal(timedLevels['level-04'], 15);
assert.equal(timedLevels['level-06'], 60);
assert.equal(isTimeExpired(0), true);
assert.equal(isTimeExpired(1), false);
console.log('timed event tests passed');
