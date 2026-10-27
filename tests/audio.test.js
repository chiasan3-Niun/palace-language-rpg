import assert from 'node:assert/strict';
import { SOUND_ASSETS, createAudioController } from '../src/audio.js';

const expectedNames = [
  'map-enter',
  'level-enter',
  'ambient-wind',
  'battle-bgm',
  'level-bgm-01',
  'level-bgm-02',
  'level-bgm-03',
  'level-bgm-04',
  'level-bgm-05',
  'level-bgm-06',
  'level-bgm-07',
  'level-bgm-08',
  'level-bgm-09',
  'level-bgm-10',
  'level-bgm-11',
  'level-bgm-12',
  'dialogue-choice',
  'clue-click',
  'puzzle-complete',
  'answer-correct',
  'answer-wrong',
  'level-complete',
  'level-failure',
  'ui-click'
];

assert.deepEqual(Object.keys(SOUND_ASSETS).sort(), expectedNames.sort());

class FakeAudio {
  static instances = [];

  constructor(src) {
    this.src = src;
    this.loop = false;
    this.volume = 1;
    this.paused = true;
    FakeAudio.instances.push(this);
  }

  play() {
    this.paused = false;
    return Promise.resolve();
  }

  pause() {
    this.paused = true;
  }
}

const storage = {
  values: new Map(),
  getItem(key) { return this.values.get(key) ?? null; },
  setItem(key, value) { this.values.set(key, value); }
};

const controller = createAudioController({ AudioCtor: FakeAudio, storage });
assert.equal(controller.isEnabled(), true);
assert.equal(controller.play('map-enter'), true);
assert.equal(FakeAudio.instances.at(-1).src, SOUND_ASSETS['map-enter']);
assert.equal(FakeAudio.instances.at(-1).paused, false);

controller.setEnabled(false);
assert.equal(controller.isEnabled(), false);
assert.equal(controller.play('map-enter'), false);
assert.equal(FakeAudio.instances.length, 1);
assert.equal(controller.toggle(), true);
assert.equal(storage.getItem('palace-audio-enabled'), 'true');

class RejectingAudio extends FakeAudio {
  play() {
    return Promise.reject(new Error('blocked'));
  }
}

const errors = [];
const rejectingController = createAudioController({
  AudioCtor: RejectingAudio,
  storage,
  onError: (error) => errors.push(error)
});
assert.equal(rejectingController.play('answer-correct'), true);
await new Promise((resolve) => setImmediate(resolve));
assert.equal(errors.length, 1);

console.log('audio controller tests passed');
