import assert from 'node:assert/strict';
import { levels } from '../src/data/levels-all.js';
import { puzzles } from '../src/data/puzzles.js';
import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
for (const level of levels) {
  assert.ok(fs.existsSync(path.join(root, 'public', 'images', 'items', `${level.item}.png`)), `${level.id} item image missing`);
  assert.ok(puzzles[level.id], `${level.id} puzzle missing`);
}
console.log('asset path tests passed');
