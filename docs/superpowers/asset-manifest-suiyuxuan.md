# 碎玉軒第二關資產清單

驗收日期：2026-10-26

## 驗收結果

- 背景：2／2，1672×941，約 16:9，不透明。
- NPC 立繪：3／3，1024×1536，透明通道抽樣檢查通過。
- 解謎道具：4／4，1254×1254，1:1，不透明。
- 第二關徽章：1／1，SVG XML 解析通過。
- 第一關玩家角色、通用 UI 與狀態條沿用已驗收素材，不重複複製。

## 背景

| 編號 | 檔案 | 狀態 |
|---|---|---|
| BG_02_SUIYUXUAN | `public/images/backgrounds/BG_02_SUIYUXUAN.png` | 通過 |
| BG_02_SUIYUXUAN_COURT | `public/images/backgrounds/BG_02_SUIYUXUAN_COURT.png` | 通過 |

## 角色

| 編號 | 表情 | 狀態 |
|---|---|---|
| CH_SUIYUXUAN_ATTENDANT | neutral、urgent、guarded | 通過；均有透明通道 |

## 道具

| 編號 | 檔案 | 用途 |
|---|---|---|
| ITEM_02_BOX | `public/images/items/ITEM_02_BOX.png` | 麝香金盒 |
| ITEM_02_BLOOD_SCROLL | `public/images/items/ITEM_02_BLOOD_SCROLL.png` | 斷句血書 |
| ITEM_02_LANTERN | `public/images/items/ITEM_02_LANTERN.png` | 雨夜追查線索 |
| ITEM_02_CLUE_FRAGMENT | `public/images/items/ITEM_02_CLUE_FRAGMENT.png` | 玉簪、花瓣與線索碎片 |

## UI

- `public/images/ui/UI_LEVEL_BADGE_02.svg`：已通過 XML 解析。
- 第一關通用 UI：沿用 `UI_HP_BAR.svg`、`UI_MP_BAR.svg`、`UI_DIALOGUE_FRAME.svg`、`UI_CHOICE_BUTTON.svg`、`UI_HINT_BUTTON.svg`。

## 備註

第二關素材的檔案層級驗收已完成。與第一關相同，真正放入遊戲頁面後仍需做瀏覽器畫面測試，確認對話框與立繪不遮住關鍵證物。

