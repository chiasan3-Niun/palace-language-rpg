# 神武門第一關視覺素材包 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 生成並整理「神武門」第一關可直接放入遊戲原型的完整視覺素材包。

**Architecture:** 先生成背景建立場景基準，再生成角色與表情，最後生成道具與 UI。所有生成素材先保留高解析度來源，再建立遊戲使用版本並放入 `public/images/` 的分類目錄。

**Tech Stack:** Codex built-in image generation、PNG、WebP、PowerShell 檔案檢查。

**Spec:** `docs/superpowers/specs/2026-10-26-shenwumen-visual-assets-design.md`

## Global Constraints

- 使用原創角色，不直接重現《甄嬛傳》角色名稱或肖像。
- 玩家角色固定為女性秀女。
- 採清代宮廷歷史寫實風，非動漫、非卡通、非塑膠 3D 風格。
- 重要遊戲文字由遊戲介面疊加，不依賴 AI 生成文字。
- 背景採 16:9；角色採 3:4 透明背景；道具採 1:1；UI 不含固定文字。
- 最終素材必須放入專案資料夾，不能只留在生成工具暫存路徑。

## Review Focus

- 背景是否保留對話框與選項空間：由背景檢查步驟驗證。
- 同一角色不同表情是否維持服裝與髮型：由角色批次視覺檢查驗證。
- 透明立繪是否真的保留透明通道：由 PNG 通道檢查驗證。
- 道具與 UI 是否含錯誤或不可修改的文字：由圖像檢查與檔案檢查驗證。
- 素材編號、格式與目錄是否一致：由 PowerShell 清單檢查驗證。

### Task 1: 建立資產目錄與生成基準

**Files:**
- Create: `public/images/backgrounds/`
- Create: `public/images/characters/`
- Create: `public/images/items/`
- Create: `public/images/ui/`
- Create: `public/images/_source/`

- [ ] **Step 1: 建立目錄**

建立上述五個目錄，不修改既有 Markdown 或原始素材文件。

- [ ] **Step 2: 固定共通提示規格**

所有後續提示詞沿用設計文件的清代宮廷寫實風、朱紅／帝王黃／沉香木褐／雪景青灰色系與負面條件。

- [ ] **Step 3: 檢查目錄**

Run: `Get-ChildItem -Recurse -Directory public/images`

Expected: 五個目錄都存在。

### Task 2: 生成神武門背景

**Files:**
- Create: `public/images/backgrounds/BG_01_SHENWUMEN.webp`
- Create: `public/images/backgrounds/BG_01_SHENWUMEN_COURT.webp`
- Preserve: `public/images/_source/BG_01_SHENWUMEN.png`
- Preserve: `public/images/_source/BG_01_SHENWUMEN_COURT.png`

- [ ] **Step 1: 生成開場背景**

生成清晨薄霧中的神武門、紅牆黃瓦、白玉基座與整齊入宮隊伍；構圖保留一側與下方的低資訊區，供對話框與狀態列使用；不生成可讀文字。

- [ ] **Step 2: 生成驗籍互動背景**

生成神武門內側的驗籍區、木案、名冊與官印位置；畫面焦點集中在驗籍桌，另一側保留角色與對話空間；不生成可讀文字。

- [ ] **Step 3: 視覺檢查**

確認兩張背景沒有現代物件、浮水印、明顯錯誤文字，並能放置遊戲 UI。

### Task 3: 生成三名角色與表情變體

**Files:**
- Create: `public/images/characters/CH_PROTAGONIST_01_{neutral,cautious,relieved}.png`
- Create: `public/images/characters/CH_GATE_OFFICER_{neutral,suspicious,approving}.png`
- Create: `public/images/characters/CH_COURT_MAID_{neutral,urgent,disapproving}.png`

- [ ] **Step 1: 生成玩家秀女基準立繪**

生成女性清代秀女半身透明立繪，湖水藍素面旗裝、簡約兩把頭、白玉蘭簪；先固定服裝、髮型與臉部特徵。

- [ ] **Step 2: 生成玩家三種表情**

只改變表情與手勢，不改變服裝、髮型、年齡感與畫風。

- [ ] **Step 3: 生成驗籍官與女官**

使用原創職務設定，不引用影視角色外貌；各生成三種表情，保持同一角色內部一致。

- [ ] **Step 4: 透明通道檢查**

確認 9 張 PNG 都有透明背景，沒有大面積白底或黑底；檢查手部、髮飾與衣料邊緣。

### Task 4: 生成第一關道具

**Files:**
- Create: `public/images/items/ITEM_01_SCROLL.webp`
- Create: `public/images/items/ITEM_01_SEAL.webp`
- Create: `public/images/items/ITEM_01_CHARACTER_CARD.webp`
- Create: `public/images/items/ITEM_01_WRONG_MARK.webp`

- [ ] **Step 1: 生成宗族名冊**

製作黃紙、墨字、硃砂印的古代名冊特寫；可有書法質感，但不要求圖片中的字可作為遊戲答案。

- [ ] **Step 2: 生成驗籍官印**

製作朱紅印泥與古代官印特寫，不放現代標誌。

- [ ] **Step 3: 生成字形辨識卡與疑點標記**

以可被 UI 疊加的空白或低文字表面為主，避免生成錯字。

- [ ] **Step 4: 檢查辨識度**

確認四件道具在深色木桌與淺色介面中都能辨識，主體沒有被背景吃掉。

### Task 5: 生成第一關 UI 素材

**Files:**
- Create: `public/images/ui/UI_HP_BAR.png`
- Create: `public/images/ui/UI_MP_BAR.png`
- Create: `public/images/ui/UI_DIALOGUE_FRAME.png`
- Create: `public/images/ui/UI_CHOICE_BUTTON.png`
- Create: `public/images/ui/UI_HINT_BUTTON.png`
- Create: `public/images/ui/UI_LEVEL_BADGE_01.png`

- [ ] **Step 1: 生成狀態條與框體**

製作白玉如意／紅瑪瑙容止值條、碧玉竹節才情值條與可拉伸的對話框；不放數字與固定文字。

- [ ] **Step 2: 生成互動元件**

製作可重複使用的選項按鈕、提示按鈕與六書通達徽章；不放不可修改的中文字。

- [ ] **Step 3: UI 可讀性檢查**

確認 UI 元件與朱紅、深褐、雪景背景都有足夠對比，且不會搶過角色與題目。

### Task 6: 整理、轉檔與最終驗證

**Files:**
- Modify/Create: `public/images/**`
- Create: `docs/superpowers/asset-manifest-shenwumen.md`

- [ ] **Step 1: 建立資產清單**

在 `asset-manifest-shenwumen.md` 記錄每個資產編號、檔名、用途、尺寸、格式與檢查狀態。

- [ ] **Step 2: 檢查檔案**

Run: `Get-ChildItem -Recurse -File public/images | Select-Object FullName,Length`

Expected: 2 張背景、9 張角色、4 件道具與 6 組 UI 都存在，且檔案大小大於 0。

- [ ] **Step 3: 檢查透明圖**

確認 9 張角色 PNG 的透明通道存在，並抽查 UI PNG 是否沒有意外底色。

- [ ] **Step 4: 交付前視覺複核**

逐項檢查命名、風格一致性、錯誤文字、浮水印、現代物件、構圖留白與遊戲可用性。

