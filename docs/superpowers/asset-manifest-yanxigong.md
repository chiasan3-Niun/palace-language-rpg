# 延禧宮第九關資產清單

製作與檢查日期：2026-10-27。

依據 `code_artifact.md` 第九關「年齡稱謂與代詞文化」及 `ai.md` 延禧宮偏殿美術規格製作。角色採用原創年輕宮廷貴女，不沿用影視人物姓名或演員外貌。本批完成 2 張背景、3 張角色表情、4 件算籌與香房道具及 1 枚徽章。玩家立繪與通用 UI 沿用第一關。

## 檔案清單

路徑相對於專案根目錄。

| 路徑 | 實際尺寸 | 用途 |
|---|---:|---|
| `public/images/backgrounds/BG_09_YANXIGONG.png` | 1672×941 | 延禧宮偏殿琴房、開場與角色對話 |
| `public/images/backgrounds/BG_09_YANXIGONG_CIPHER.png` | 1672×941 | 生辰算籌案桌、鎖盒與輪盤互動 |
| `public/images/characters/CH_YANXI_CONCUBINE_neutral.png` | 1086×1448 | 原創宮廷貴女，中性觀察 |
| `public/images/characters/CH_YANXI_CONCUBINE_intriguing.png` | 1086×1448 | 原創宮廷貴女，含蓄試探 |
| `public/images/characters/CH_YANXI_CONCUBINE_cornered.png` | 1086×1448 | 原創宮廷貴女，密碼被解開後動搖 |
| `public/images/items/ITEM_09_AGE_DIAL.png` | 1254×1254 | 生辰年齡與時序輪盤 |
| `public/images/items/ITEM_09_AGE_CARDS.png` | 1254×1254 | 八張空白年齡稱謂卡的展示底圖 |
| `public/images/items/ITEM_09_BIRTHDATE_LOCKBOX.png` | 1254×1254 | 生辰密碼鎖盒與算籌 |
| `public/images/items/ITEM_09_INCENSE_SET.png` | 1254×1254 | 空白香具、花瓣與琴房證物 |
| `public/images/ui/UI_LEVEL_BADGE_09.svg` | viewBox 512×512 | 年齡密碼徽章 |

## 製作方式與提示詞紀錄

9 張 PNG 使用內建影像生成工具；兩張角色表情變體以 `neutral` 圖為編輯參考，保留同一人物、服裝、髮冠、香囊、摺扇與透明背景。徽章使用既有關卡徽章系統製作為可編輯 SVG。9 張原始 PNG 在 `public/images/_source/` 保留同名備份，雜湊與交付檔一致。

共通提示詞：photorealistic cinematic Qing-inspired educational dialogue RPG; deep plum, dark walnut, muted lilac, aged ivory, tarnished silver, jade and blue moonlight; no readable text, no modern objects, no watermark, no signature。

各項提示詞重點：

- 琴房偏殿：landscape 16:9, antique Guqin, ceramic perfume jars, harmless incense haze, calculation chips, moonlit window, open right side for dialogue。
- 密碼案桌：landscape 16:9, cipher table weighted left with blank dial, lockbox, counting chips and jars, open right side for character overlay。
- 角色基準：original woman about 28, pale lilac and muted plum blossom-embroidered robe, silver-lilac headdress, closed perfume sachet and folded fan, half-body 3:4, transparent alpha, no actor likeness。
- 試探表情：preserve exact identity and costume; small knowing smile, lifted eyebrow, fan opened toward the cipher box。
- 動搖表情：preserve exact identity and costume; worried eyes, raised inner brows, fan lowered, sachet drawn close to chest。
- 生辰輪盤：antique bronze concentric dial with abstract marks, ivory center, jade pointer and wooden chips, no readable numerals or calendar text。
- 年齡卡：eight blank ivory cards with varied borders, no readable words or numerals, centers reserved for editable text。
- 生辰鎖盒：black-and-plum lacquer box, gold floral inlay, blank circular dial, wooden chips, no readable numbers。
- 香具組：blank ceramic jars, bronze warmer, plain sachet and generic dried petals, no named plant or preparation instruction。

## 已執行的驗證

- 9 張 PNG 全數可解碼且大於零位元組。
- 兩張背景實際為 1672×941，接近 16:9，並非 4K。
- 三張角色立繪尺寸一致，精確 3:4；抽樣檢查均應檢出透明背景及接近不透明的主體像素。
- 四張道具圖為精確 1:1，背景不透明。
- 徽章 SVG 可解析，根節點為 `svg`。
- 已檢視生成結果：琴房與月光建立懸疑氣氛；密碼案桌保留右側對話空間；角色三種表情可區分；輪盤、卡片與鎖盒可供後續互動層使用。
- 原圖備份與交付 PNG 雜湊一致。

## 整合備註

- 年齡稱謂、代詞與干支換算內容應以遊戲文字層實作，並由課程來源核對；圖片不承擔正式題庫內容。
- `ITEM_09_AGE_CARDS.png` 與 `ITEM_09_AGE_DIAL.png` 是展示底圖，輪盤旋轉、卡片排序與密碼判斷需另以 HTML 元件實作。
- 香具只呈現懸疑場景氛圍，不提供現實香料、迷香、毒物或製作方法。
- 通用 UI 沿用 `UI_HP_BAR.svg`、`UI_MP_BAR.svg`、`UI_DIALOGUE_FRAME.svg`、`UI_CHOICE_BUTTON.svg`、`UI_HINT_BUTTON.svg`。
- 本批完成生成、保存、視覺檢視與檔案檢查；遊戲畫面中的遮擋、文字對比、互動狀態及手機裁切尚待整合測試。
