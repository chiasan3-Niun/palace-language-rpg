# 翊坤宮第四關資產清單

製作與驗證日期：2026-10-26。

本批交付 2 張背景、1 名原創權妃的 3 張表情立繪、4 件道具、1 枚 SVG 徽章。玩家與通用對話框、按鈕、狀態條沿用第一關素材。

## 資產與實際尺寸

下列路徑皆相對於專案根目錄。

| 檔案 | 尺寸 | 用途 |
|---|---|---|
| `public/images/backgrounds/BG_04_YIKUNGONG.png` | 1672×941 | 正殿開場，孔雀屏風與香爐 |
| `public/images/backgrounds/BG_04_YIKUNGONG_AUDIENCE.png` | 1672×941 | 接見與語法應答，右側預留角色區 |
| `public/images/characters/CH_YIKUN_CONSORT_neutral.png` | 1086×1448 | 原創權妃，平靜威嚴 |
| `public/images/characters/CH_YIKUN_CONSORT_stern.png` | 1086×1448 | 嚴厲質問 |
| `public/images/characters/CH_YIKUN_CONSORT_surprised.png` | 1086×1448 | 破綻被指出後的驚訝 |
| `public/images/items/ITEM_04_TOKEN.png` | 1254×1254 | 空白紅漆令牌，威脅與情境提示 |
| `public/images/items/ITEM_04_EDICT_SCROLL.png` | 1254×1254 | 空白訓詞卷，疊加句型辨識題 |
| `public/images/items/ITEM_04_GRAMMAR_CARDS.png` | 1254×1254 | 四張空白詞性／句型卡的展示底圖 |
| `public/images/items/ITEM_04_INCENSE_TIMER.png` | 1254×1254 | 限時應答的燃香意象 |
| `public/images/ui/UI_LEVEL_BADGE_04.svg` | viewBox 512×512 | 語法格擋完成徽章 |

## 製作方式與提示詞

9 張 PNG 使用內建影像生成工具製作；表情變體以 neutral 圖為編輯參考。徽章依既有 SVG 風格手工製作，可編輯。所有 PNG 原檔另備份於 `public/images/_source/`，檔名相同。

共通提示：photorealistic cinematic Qing-inspired educational dialogue RPG; crimson, purple silk, rosewood, muted gold; no readable text, watermark or modern objects。

各素材提示重點如下，可作為重製基準：

- 正殿：landscape 16:9, opulent Yikun Palace hall, nanmu pillars, rosewood peacock and peony screen on left, polished dark stone floor, cloisonne incense burner, warm candles and cool window rim light, no people, right and bottom calm for UI。
- 接見區：close audience chamber, low dark wood table on left with blank ivory paper and red token, peacock screen behind, right half uncluttered floor and muted wall, empty room。
- 權妃基準：original powerful consort aged 35, no actress likeness, rose-magenta Manchu robe with gold peacocks, filigree peacock hair ornaments with rubies, closed ivory fan at waist, neutral authority, half-body 3:4, transparent alpha。
- stern：preserve exact identity, costume and lighting; furrowed brows, questioning eyes, slightly parted lips, closed fan raised at chest, transparent background。
- surprised：preserve exact identity, costume and lighting; widened eyes, lifted brows, surprised and grudgingly impressed, fan lowered to waist, transparent background。
- 令牌：square, red lacquer disciplinary token, gilded peacock edge, central surface blank, red tassel, purple brocade, no blood or lettering。
- 訓詞卷：square top-down, unrolled cream scroll, purple silk runner, brush and seal paste at side, broad blank center for editable text, gold peacock end caps。
- 詞性卡：square top-down, four blank ivory cards in 2×2 grid, thin purple and gold borders, jade paperweights at corners, no overlap in centers, no writing。
- 燃香：square, bronze incense tray, single short glowing incense stick, pale ash, fine smoke, purple silk and red curtain, symbolic countdown only, no numerals。

## 已執行的檢查

- 9 張 PNG 均可由影像解碼器讀取，檔案大小大於零。
- 2 張背景為接近 16:9（1672×941），並非 4K。
- 3 張角色均為精確 3:4，同尺寸，20 像素間隔抽樣檢出完全透明的背景與近不透明的主體；主體常見 alpha 為 252–254。這不是逐像素去背品質保證。
- 4 件道具均為精確 1:1，不透明。
- 徽章 SVG 可解析，根節點為 svg。
- 已檢視生成圖：背景留白、三種表情、服裝與道具空白面可辨識；角色髮飾接近畫面頂邊，整合時應額外留出外部間距。

## 遊戲整合時的使用方式

- 訓詞、選項與答案需由 HTML 文字疊加；詞性卡圖片是展示底圖，不包含可拖曳卡片的互動邏輯。
- 燃香只表示時間壓力；15 秒倒數由程式管理。
- 角色使用 contain 等比縮放，保留髮飾與衣袖；背景可視容器裁切。
- 原創權妃僅以職稱與 ID 表示，沒有新增正式姓名。

本批素材的生成、保存與檔案檢查已完成。實際遊戲頁面的文字對比、遮擋、SVG 渲染與手機裁切尚未測試，不列為已通過項目。
