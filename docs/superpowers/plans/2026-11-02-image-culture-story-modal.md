# 圖片文化故事彈窗 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 讓背包、成就徽章與盟友圖片可點擊放大，並在彈窗中顯示對應的文化小故事。

**Architecture:** 在 `src/app-immersive.js` 增加集中式圖鑑資料與彈窗視圖，圖片以 `data-gallery-*` 傳遞資料，事件由既有 `bind()` 綁定。彈窗樣式放在 `src/immersive.css`，不新增套件或圖片檔。

**Tech Stack:** 原生 JavaScript、HTML template string、CSS、Node test scripts。

**Spec:** 本次使用者確認的「點擊圖片彈窗放大並提供文化小故事」方案。

## Global Constraints

- 使用現有 `public/images/items`、`public/images/ui` 與 `public/images/characters` 素材。
- 不改變關卡數值、存檔、解鎖與音效邏輯。
- 彈窗必須可由關閉按鈕、背景點擊與 Escape 關閉。
- 手機畫面不得讓放大圖片超出視窗。

## Review Focus

- 已收集物品點擊後顯示正確名稱、用途與故事。
- 成就與盟友圖片點擊後顯示正確故事。
- 圖片載入失敗時仍保留文字故事與關閉操作。
- 重複開關彈窗不會重複綁定或卡住頁面。
- 手機與鍵盤操作可關閉彈窗。

### Task 1: 建立圖鑑資料與彈窗視圖

**Files:**
- Modify: `src/app-immersive.js`

- [ ] 建立物品、成就、盟友的名稱、圖片路徑、用途與文化故事資料。
- [ ] 建立 `galleryModalView()`，輸出圖片、標題、說明、故事與關閉按鈕。
- [ ] 在背包、成就與盟友圖片加入 `data-gallery-type` 與 `data-gallery-id`。

### Task 2: 接上彈窗事件

**Files:**
- Modify: `src/app-immersive.js`

- [ ] 在 `bind()` 綁定圖片點擊，依資料開啟彈窗。
- [ ] 綁定關閉按鈕、背景點擊與 Escape。
- [ ] 確認彈窗開啟不會改變 progression、features 或 runStats。

### Task 3: 完成放大視覺與手機版樣式

**Files:**
- Modify: `src/immersive.css`

- [ ] 建立遮罩、彈窗、圖片最大尺寸與文字區樣式。
- [ ] 以 `max-width: min(88vw, 720px)` 與 `max-height: 56vh` 限制圖片。
- [ ] 加入手機版與 `prefers-reduced-motion` 規則。

### Task 4: 驗證

- [ ] 執行 `node --check src/app-immersive.js`。
- [ ] 執行 `node tests/features.test.js`、`node tests/asset-paths.test.js`。
- [ ] 執行 `git diff --check`，確認沒有新增格式錯誤。
- [ ] 手動確認背包、成就與盟友三類圖片都能開啟與關閉彈窗。

