const AUDIO_STATE_KEY = 'palace-audio-enabled';

export const SOUND_ASSETS = Object.freeze({
  'map-enter': '/public/audio/levels/door.ogg',
  'level-enter': '/public/audio/levels/palace-bell.wav',
  'ambient-wind': '/public/audio/ambient/palace-wind.wav',
  'battle-bgm': '/public/audio/bgm/final-debate.ogg',
  'level-bgm-01': '/public/audio/bgm/level-01-shenwumen.mp3.mp3',
  'level-bgm-02': '/public/audio/bgm/level-02-suiyuxuan.mp3.mp3',
  'level-bgm-03': '/public/audio/bgm/level-03-yimeiyuan.mp3.mp3',
  'level-bgm-04': '/public/audio/bgm/level-04-yikungong.mp3.mp3',
  'level-bgm-05': '/public/audio/bgm/level-05-jingrengong.mp3.mp3',
  'level-bgm-06': '/public/audio/bgm/level-06-taiyiyuan.mp3.mp3',
  'level-bgm-07': '/public/audio/bgm/level-07-chuxiugong.mp3.mp3',
  'level-bgm-08': '/public/audio/bgm/level-08-changchunyuan.mp3.mp3',
  'level-bgm-09': '/public/audio/bgm/level-09-yanxigong.mp3.mp3',
  'level-bgm-10': '/public/audio/bgm/level-10-wenhuadian.mp3.mp3',
  'level-bgm-11': '/public/audio/bgm/level-11-wenyuange.mp3.mp3',
  'level-bgm-12': '/public/audio/bgm/level-12-yangxindian.mp3.mp3',
  'dialogue-choice': '/public/audio/dialogue/choice-confirm.mp3',
  'clue-click': '/public/audio/puzzle/clue-click.wav',
  'puzzle-complete': '/public/audio/puzzle/puzzle-complete.wav',
  'answer-correct': '/public/audio/ui/correct-bell.wav',
  'answer-wrong': '/public/audio/success-failure/answer-wrong.wav',
  'level-complete': '/public/audio/success-failure/level-complete.wav',
  'level-failure': '/public/audio/success-failure/game-over.wav',
  'ui-click': '/public/audio/ui/choice-click.wav'
});

function readEnabled(storage) {
  try {
    return storage?.getItem(AUDIO_STATE_KEY) !== 'false';
  } catch {
    return true;
  }
}

export function createAudioController({
  AudioCtor = globalThis.Audio,
  storage = globalThis.localStorage,
  onError = () => {}
} = {}) {
  let enabled = readEnabled(storage);
  const active = new Set();

  function reportError(error) {
    onError(error);
  }

  function play(name, { loop = false, volume = 1 } = {}) {
    if (!enabled || !SOUND_ASSETS[name] || typeof AudioCtor !== 'function') return false;

    try {
      const audio = new AudioCtor(SOUND_ASSETS[name]);
      audio.loop = loop;
      audio.volume = volume;
      active.add(audio);
      audio.addEventListener?.('ended', () => active.delete(audio), { once: true });
      const result = audio.play();
      result?.catch((error) => {
        active.delete(audio);
        reportError(error);
      });
      return true;
    } catch (error) {
      reportError(error);
      return false;
    }
  }

  function stopAll() {
    active.forEach((audio) => {
      audio.pause();
      try { audio.currentTime = 0; } catch { /* Some test doubles omit currentTime. */ }
    });
    active.clear();
  }

  function setEnabled(value) {
    enabled = Boolean(value);
    try { storage?.setItem(AUDIO_STATE_KEY, String(enabled)); } catch { /* Storage may be unavailable. */ }
    if (!enabled) stopAll();
    return enabled;
  }

  return {
    play,
    stopAll,
    setEnabled,
    isEnabled: () => enabled,
    toggle: () => setEnabled(!enabled)
  };
}
