# 神武門第一關資產清單

驗收日期：2026-10-26

## 驗收結果

- 背景：2／2，PNG 尺寸約 16:9，已檢查為不透明背景。
- 角色：9／9，PNG 尺寸為 3:4 左右，抽樣像素檢查確認有透明通道。
- 道具：4／4，PNG 為 1:1，適合作為正方形特寫素材。
- UI：6／6，SVG XML 可正常解析，文字可由遊戲介面另外疊加。
- 零位元素材：無。

## 背景

| 編號 | 檔案 | 尺寸 | 狀態 |
|---|---|---:|---|
| BG_01_SHENWUMEN | `public/images/backgrounds/BG_01_SHENWUMEN.png` | 1672×941 | 通過；16:9、無透明通道 |
| BG_01_SHENWUMEN_COURT | `public/images/backgrounds/BG_01_SHENWUMEN_COURT.png` | 1672×941 | 通過；16:9、無透明通道 |

## 角色

| 角色 | 狀態檔案 | 狀態 |
|---|---|---|
| CH_PROTAGONIST_01 | `neutral`、`cautious`、`relieved` | 通過；均有透明通道 |
| CH_GATE_OFFICER | `neutral`、`suspicious`、`approving` | 通過；均有透明通道 |
| CH_COURT_MAID | `neutral`、`urgent`、`disapproving` | 通過；均有透明通道 |

## 道具

| 編號 | 檔案 | 尺寸 | 狀態 |
|---|---|---:|---|
| ITEM_01_SCROLL | `public/images/items/ITEM_01_SCROLL.png` | 1254×1254 | 通過；1:1、不透明 |
| ITEM_01_SEAL | `public/images/items/ITEM_01_SEAL.png` | 1254×1254 | 通過；1:1、不透明 |
| ITEM_01_CHARACTER_CARD | `public/images/items/ITEM_01_CHARACTER_CARD.png` | 1254×1254 | 通過；1:1、不透明 |
| ITEM_01_WRONG_MARK | `public/images/items/ITEM_01_WRONG_MARK.png` | 1254×1254 | 通過；1:1、不透明 |

## UI

以下 SVG 均已通過 XML 解析檢查：

- `UI_HP_BAR.svg`
- `UI_MP_BAR.svg`
- `UI_DIALOGUE_FRAME.svg`
- `UI_CHOICE_BUTTON.svg`
- `UI_HINT_BUTTON.svg`
- `UI_LEVEL_BADGE_01.svg`

## 尚未完成的整合項目

素材檔案驗收已完成，但尚未放入實際遊戲頁面做瀏覽器畫面測試；目前專案尚未建立 `src/index.html` 與遊戲 UI。下一步製作遊戲畫面時，需確認背景、角色、對話框與選項沒有互相遮擋。

