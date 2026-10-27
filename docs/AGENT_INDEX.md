# 主 Agent 專案索引

## 先讀文件

1. `AGENTS.md`（若存在）
2. `C:\Users\user\Documents\課程大綱\md\humanize.md`
3. `code_artifact.md`：原始十二關遊戲計劃
4. `ai.md`：背景、角色、道具與 UI 素材規格
5. `docs/PROJECT_SPEC.md`：核心循環與資料模型
6. `docs/QUESTION_BANK.md`：十二關 36 題題庫索引

## 程式入口

- `src/index.html`：入口
- `src/app-immersive.js`：目前沉浸式十二關主流程
- `src/app-all.js`：十二關共用選題骨架，保留作為比較參考
- `src/data/levels-all.js`：十二關關卡資料
- `src/data/question-bank.js`：十二關完整題庫，36 題
- `src/game.js`：容止值、才情值、提示與答題狀態
- `src/features.js`：徽章、盟友、突發事件與護身符
- `src/progression.js`：品階、證物與猜忌值保存資料
- `src/timed-events.js`：限時關卡設定
- `src/immersive.css`：總地圖、過場與解密介面樣式

## 目前實作狀態

- 十二關資料：已建立
- 十二關題庫：已建立，每關 3 題
- 神武門沉浸式垂直切片：已建立
- 十二關解密模組：已建立第一版資料化玩法
- 品階、證物背包、徽章、盟友與護身符：已建立第一版
- 第 4、6 關限時事件與第三層微課錦囊：已建立
- 最終結局與音效 credits：已建立第一版
- 題目教材審查：尚未完成
- 題目正式來源與頁碼：尚未補齊

## 後續調度順序

1. 審查 `src/data/question-bank.js` 的 36 題並補教材頁碼。
2. 以實際拖曳、輪盤與字塊互動取代目前的第一版選項式解密。
3. 逐關完成手機版、素材遮擋與觸控整合測試。
4. 補齊音效與生成音樂的正式授權／來源紀錄。

## 索引規則

- 題目 ID 格式：`L<關卡兩位數>-Q<題號兩位數>`。
- 關卡 ID 格式：`level-01` 至 `level-12`。
- 未完成教材審查前，保留 `pending-review`，不可改成正式答案。
- 素材檔名只作程式索引；玩家介面必須顯示中文證物名稱與用途。
