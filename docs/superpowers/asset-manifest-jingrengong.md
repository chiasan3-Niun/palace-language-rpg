# 景仁宮第五關資產清單

製作與檢查日期：2026-10-26。

依據 `code_artifact.md` 第五關「題辭與匾額應用」及 `ai.md` 景仁宮美術規格製作，沿用已確認的原創人物與宮廷寫實方向。本批完成 2 張背景、3 張皇后表情、4 件道具與 1 枚徽章。玩家立繪與通用 UI 沿用第一關。

## 檔案清單

路徑相對於專案根目錄。

| 路徑 | 實際尺寸 | 用途 |
|---|---|---|
| `public/images/backgrounds/BG_05_JINGRENGONG.png` | 1672×941 | 皇后千秋主殿、開場與正式接見 |
| `public/images/backgrounds/BG_05_JINGRENGONG_GIFTS.png` | 1672×941 | 進獻區、賀表與題辭互動 |
| `public/images/characters/CH_JINGREN_EMPRESS_neutral.png` | 1086×1448 | 原創皇后，正式接見 |
| `public/images/characters/CH_JINGREN_EMPRESS_scrutinizing.png` | 1086×1448 | 審視不合宜的題辭 |
| `public/images/characters/CH_JINGREN_EMPRESS_approving.png` | 1086×1448 | 認可合宜用語 |
| `public/images/items/ITEM_05_PLAQUE.png` | 1254×1254 | 空白金漆賀壽匾，中央疊加題辭 |
| `public/images/items/ITEM_05_CONGRATULATORY_SCROLL.png` | 1254×1254 | 空白賀表，疊加正文與用語判斷 |
| `public/images/items/ITEM_05_INSCRIPTION_CARDS.png` | 1254×1254 | 六張空白題辭卡的展示底圖 |
| `public/images/items/ITEM_05_GIFT_BOX.png` | 1254×1254 | 如意禮盒與空白禮籤，進獻及獎勵展示 |
| `public/images/ui/UI_LEVEL_BADGE_05.svg` | viewBox 512×512 | 題辭得宜徽章 |

## 製作方式與提示詞紀錄

9 張 PNG 使用內建影像生成工具；兩張表情變體以 neutral 圖為編輯參考。徽章沿既有視覺風格製作為可編輯 SVG。9 張原始 PNG 在 `public/images/_source/` 保留同名備份，雜湊與交付檔一致。

共通提示詞：photorealistic cinematic Qing-inspired educational dialogue RPG; dark zitan, ivory silk, deep navy, antique gold, cinnabar accents; no readable text, no watermark, no modern objects。

各項提示詞重點：

- 主殿：landscape 16:9, dignified empress birthday hall, orderly symmetry, phoenix-and-cloud throne, empty consort chairs, porcelain vases, blank plaque above throne, soft warm daylight, open foreground for dialogue。
- 進獻區：landscape 16:9, presentation table on left with blank black plaque, brocade gifts and blank cream scroll, phoenix screen, right half quiet floor and wall, empty room。
- 皇后基準：original empress aged about 45, mature oval face, gentle formal smile, thoughtful watchful eyes, no actress likeness, navy and pale gold phoenix Manchu gown, gold phoenix ruby pearl headdress, white jade ruyi held with two hands, half-body 3:4, transparent alpha。
- 審視表情：preserve exact identity, costume, ruyi and light; narrowed eyes, raised inner brow, smile gone, lips pressed, formal disapproval of inappropriate inscription, transparent background。
- 認可表情：preserve exact identity, costume, ruyi and light; softened eyes, gentle smile, slight respectful nod after apt birthday inscription, transparent background。
- 賀匾：square, miniature horizontal black lacquer plaque on zitan stand, gold phoenix and cloud frame, broad blank center, ivory and navy brocade, frontal slightly elevated view。
- 賀表：square top-down, cream scroll with navy and gold phoenix border, brush, vermilion ink dish and jade paperweight outside center, large blank surface for editable vertical Chinese text。
- 題辭卡：square top-down, six blank horizontal ivory cards, 2-column by 3-row grid, thin navy and gold cloud borders, nonoverlapping centers, paperweight and brush outside grid。
- 禮盒：square, open navy brocade box with ivory lining and pale jade ruyi, cream presentation ribbon, blank gift tag, entire box visible, restrained gold phoenix details。

## 已執行的驗證

- 9 張 PNG 全數可解碼且大於零位元組。
- 背景為接近 16:9，實際 1672×941，並非 4K。
- 三張皇后立繪尺寸一致，精確 3:4。以 20 像素間隔抽樣，各圖均檢出完全透明背景及 alpha ≥250 的主體。此項為通道檢查，不等同逐像素邊緣複核。
- 4 張道具圖為精確 1:1，背景不透明。
- 徽章 SVG 可解析，根節點為 svg；尚未做瀏覽器渲染測試。
- 已檢視生成結果：服裝與髮飾一致、道具中央留白可辨識。皇后 neutral 與 approving 都屬細微表情，整合時應配合台詞呈現差別。髮飾接近畫面上緣，容器應保留外部間距。
- 原圖備份與交付 PNG 雜湊一致。

## 整合備註

- 題辭、賀表正文及答案須以遊戲文字層實作，並由教材來源核對；本批圖像不包含正式題庫。
- 六張卡的圖片為整體展示底圖，互動拖曳卡片需另以 HTML 元件實作。
- 進獻區背景中的匾牌是場景陳設；實際解題使用 `ITEM_05_PLAQUE.png` 橫匾特寫。
- 通用 UI 沿用 `UI_HP_BAR.svg`、`UI_MP_BAR.svg`、`UI_DIALOGUE_FRAME.svg`、`UI_CHOICE_BUTTON.svg`、`UI_HINT_BUTTON.svg`。
- 本批完成生成、保存、視覺檢視與檔案檢查；遊戲畫面中的遮擋、字體對比及手機裁切尚待整合測試。
