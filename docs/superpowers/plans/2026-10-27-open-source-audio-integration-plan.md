# Open-Source Audio Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a small, traceable CC0 audio set and connect it to the immersive game interactions without autoplay or external audio dependencies.

**Architecture:** Keep audio behavior in a focused `src/audio.js` controller. `src/app-immersive.js` calls that controller only from existing player click handlers and renders a visible toggle/status control. Audio files stay under the requested category folders, with one README record per file.

**Tech Stack:** Browser `Audio`, native ES modules, Node built-in assertions, PowerShell download/check commands.

**Spec:** User request plus `docs/SOUND_ASSET_RESEARCH.md`; no question-bank changes and no deployment.

## Global Constraints

- Use only source pages that explicitly identify CC0 or an explicit game-compatible CC BY license; this implementation uses CC0 files only.
- Do not autoplay: every playback call must originate from an existing player click handler.
- Keep audio under `public/audio/{bgm,ambient,ui,dialogue,puzzle,success-failure,levels}`.
- Do not modify `src/data/question-bank.js` or publish the site.
- Browser playback errors must not stop the game.

## Review Focus

- Missing or unsupported audio: controller catches constructor and `play()` failures and reports a non-blocking status.
- User mute choice: toggle disables playback, stops active audio, persists locally, and remains visible.
- Event coverage: map entry, level cutscene entry, dialogue choice, clue click, puzzle completion, correct/wrong answer, and level completion each call a named asset.
- Asset traceability: every referenced file exists and has a README row with source URL, author, license, attribution, and purpose.
- Autoplay regression: `app-immersive.js` contains no audio call during initial render or module initialization.

### Task 1: Audio controller and failing tests

**Files:**
- Create: `src/audio.js`
- Create: `tests/audio.test.js`

**Interfaces:**
- Produces `SOUND_ASSETS` and `createAudioController({ AudioCtor, onError, storage })`.
- Controller provides `play(name, options)`, `stopAll()`, `setEnabled(enabled)`, `isEnabled()`, and `toggle()`.

- [ ] Write tests for asset keys, enabled playback, disabled playback, and rejected `play()` handling; run `node tests/audio.test.js` and observe the expected failures.
- [ ] Implement the minimal controller and rerun `node tests/audio.test.js` until green.

### Task 2: Download and inventory the licensed assets

**Files:**
- Create: `public/audio/bgm/final-debate.ogg`
- Create: `public/audio/ambient/palace-wind.wav`
- Create: `public/audio/ui/correct-bell.wav`
- Create: `public/audio/ui/choice-click.wav`
- Create: `public/audio/dialogue/choice-confirm.mp3`
- Create: `public/audio/puzzle/clue-click.wav`
- Create: `public/audio/puzzle/puzzle-complete.wav`
- Create: `public/audio/success-failure/answer-wrong.wav`
- Create: `public/audio/success-failure/level-complete.wav`
- Create: `public/audio/success-failure/game-over.wav`
- Create: `public/audio/levels/door.ogg`
- Create: `public/audio/levels/palace-bell.wav`
- Create: `public/audio/README.md`

**Interfaces:** `SOUND_ASSETS` paths must resolve to these files.

- [ ] Download only the exact direct files recorded in the README source table.
- [ ] Check every file exists and has a non-zero size; record the actual inventory in the README.

### Task 3: Wire player events and the visible control

**Files:**
- Modify: `src/app-immersive.js`
- Modify: `src/immersive.css`
- Create: `tests/audio-integration.test.js`

**Interfaces:** `app-immersive.js` imports `createAudioController`, renders a visible toggle, and invokes named sounds only inside click handlers.

- [ ] Write a source-level integration test that asserts the eight required event mappings and visible toggle markup; run it and observe failure.
- [ ] Add the controller, toggle/status view, event calls, and non-blocking error status with minimal changes to the existing state flow.
- [ ] Add focused CSS for the control/status without changing the question content.
- [ ] Run the integration test and the existing game test.

### Task 4: Final structural verification

- [ ] Run Node syntax checks on changed JS files.
- [ ] Run the full available test set.
- [ ] Verify every `SOUND_ASSETS` path exists, every README row points to an existing file, and no question-bank diff exists.
- [ ] Inspect the final diff and report actual downloaded files, modified files, and verification output.
