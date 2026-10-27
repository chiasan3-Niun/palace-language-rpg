import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SOUND_ASSETS } from '../src/audio.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const appSource = fs.readFileSync(path.join(root, 'src', 'app-immersive.js'), 'utf8');

for (const soundName of [
  'map-enter',
  'level-enter',
  'dialogue-choice',
  'clue-click',
  'puzzle-complete',
  'answer-correct',
  'answer-wrong',
  'level-complete',
  'level-failure'
]) {
  assert.match(appSource, new RegExp(`playSound\\(['"]${soundName}['"]`), `missing event sound: ${soundName}`);
}

assert.match(appSource, /data-audio-toggle/);
assert.match(appSource, /audio-status/);
const renderStart = appSource.indexOf('function render()');
const resetStart = appSource.indexOf('function reset()');
assert.equal(appSource.slice(renderStart, resetStart).includes('playSound('), false, 'render must not autoplay');

for (const [name, assetPath] of Object.entries(SOUND_ASSETS)) {
  const localPath = path.join(root, assetPath.replace(/^\//, '').replaceAll('/', path.sep));
  assert.ok(fs.existsSync(localPath), `${name} asset is missing: ${localPath}`);
  assert.ok(fs.statSync(localPath).size > 0, `${name} asset is empty: ${localPath}`);
}

console.log('audio integration checks passed');
