# 下一階段遊戲系統 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 依原始計畫補齊 12 關獨立解密、知識整理卡、養心殿三階段決戰、品階與背包、猜忌值及限時事件。

**Architecture:** 保留目前多檔案 SPA 架構。將每關解密定義為資料化 puzzle，使用一個通用解密渲染器依 puzzle type 呈現不同互動；知識卡、品階、背包與猜忌值沿用 localStorage 的前端狀態，不新增後端。

**Tech Stack:** 原生 JavaScript ES modules、HTML、CSS、Node 內建 assert 測試。

**Spec:** `code_artifact.md`, `docs/PROJECT_SPEC.md`

## Global Constraints

- 每關必須保留劇情任務、核心語文知識、解謎、正錯回饋與可帶走知識卡。
- 第一版不加入登入、雲端存檔與後端。
- 題目來源未完成教師審查前，介面保留「待教師審查」標記。
- 保留目前 12 首背景音樂、原有音效與關卡解鎖流程。

## Review Focus

- 不同關卡不得共用第一關的解密素材或文字。
- 解密完成前不得進入對話與題目階段。
- 第 12 關必須以三階段流程結算，而非一般單題流程。
- 重新整理後不得遺失已解鎖關卡、品階、背包與知識卡。
- 倒數結束必須導向失敗或重試，不得讓玩家繼續提交。

---

### Task 1: 12 關資料化解密玩法

**Files:**
- Create: `src/data/puzzles.js`
- Create: `src/puzzles.js`
- Create: `tests/puzzles.test.js`
- Modify: `src/app-immersive.js`

**Interfaces:**
- `puzzles[levelId]` produces `{ type, title, instruction, parts, answer, successText }`.
- `solvePuzzle(puzzle, input)` returns `{ ok, feedback }`.

- [ ] Write failing tests for all 12 puzzle types and incorrect input rejection.
- [ ] Run `node tests/puzzles.test.js` and confirm failure because the module is missing.
- [ ] Implement one data entry per level and the minimal solver.
- [ ] Replace hard-coded first-level puzzle rendering with the data-driven renderer.
- [ ] Run puzzle tests and the existing game/audio tests.

### Task 2: 每關知識整理卡

**Files:**
- Modify: `src/data/question-bank.js`
- Modify: `src/app-immersive.js`
- Create: `tests/knowledge-cards.test.js`

- [ ] Test that all 12 levels expose a non-empty knowledge card.
- [ ] Render the card on successful completion and allow reopening it from the result view.
- [ ] Persist unlocked cards in localStorage.

### Task 3: 養心殿三階段決戰

**Files:**
- Create: `src/data/final-battle.js`
- Modify: `src/app-immersive.js`
- Modify: `src/game.js`
- Create: `tests/final-battle.test.js`

- [ ] Test stage order, damage values, retry, and final victory.
- [ ] Add 皇權執念值 1000 and the three stages: 偽詔、對聯、四庫史學。
- [ ] Keep the existing question bank as the content source for non-final levels.

### Task 4: 品階、背包與猜忌值

**Files:**
- Modify: `src/game.js`
- Modify: `src/app-immersive.js`
- Modify: `src/ui/status.js`
- Create: `tests/progression.test.js`

- [ ] Test level completion promotion, item collection, and suspicion thresholds.
- [ ] Add a compact progression panel to map and result screens.

### Task 5: 限時事件與第三層鷹架

**Files:**
- Modify: `src/app-immersive.js`
- Modify: `src/game.js`
- Modify: `src/immersive.css`
- Create: `tests/timed-events.test.js`

- [ ] Test timer expiry for levels 4 and 6.
- [ ] Add the 25-talent 微課錦囊 without changing existing hint costs.
- [ ] Verify all tests and browser flow after integration.
