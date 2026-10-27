# 太醫院第六關資產清單

製作與檢查日期：2026-10-26。

依據 `code_artifact.md` 第六關「工具書檢索與字典查閱」及 `ai.md` 太醫院美術規格製作。角色採用原創太醫，不沿用影視人物姓名或演員外貌。本批完成 2 張背景、3 張太醫表情、4 件檢索與查證道具及 1 枚徽章。玩家立繪與通用 UI 沿用第一關。

## 檔案清單

路徑相對於專案根目錄。

| 路徑 | 實際尺寸 | 用途 |
|---|---:|---|
| `public/images/backgrounds/BG_06_TAIYIYUAN.png` | 1672×941 | 太醫院整體藥房、開場與角色對話 |
| `public/images/backgrounds/BG_06_TAIYIYUAN_DESK.png` | 1672×941 | 檢索案桌、道具互動與限時查證 |
| `public/images/characters/CH_TAIYI_PHYSICIAN_neutral.png` | 1086×1448 | 原創太醫，中性協助 |
| `public/images/characters/CH_TAIYI_PHYSICIAN_urgent.png` | 1086×1448 | 原創太醫，提醒毒發倒數或檢索時限 |
| `public/images/characters/CH_TAIYI_PHYSICIAN_reassured.png` | 1086×1448 | 原創太醫，查證後安心 |
| `public/images/items/ITEM_06_MEDICAL_BOOK.png` | 1254×1254 | 脈案百草譜，提供檢索場景視覺焦點 |
| `public/images/items/ITEM_06_LOOKUP_CARDS.png` | 1254×1254 | 部首、筆劃與檢索步驟卡的展示底圖 |
| `public/images/items/ITEM_06_HERB_PACKETS.png` | 1254×1254 | 封存藥包與草藥證物 |
| `public/images/items/ITEM_06_DIAGNOSTIC_RECORD.png` | 1254×1254 | 空白診脈記錄與查證線索 |
| `public/images/ui/UI_LEVEL_BADGE_06.svg` | viewBox 512×512 | 太醫院字典檢索徽章 |

## 製作方式與提示詞紀錄

9 張 PNG 使用內建影像生成工具；兩張太醫表情變體以 `neutral` 圖為編輯參考，保留同一人物、服裝、髮冠、醫箱與透明背景。徽章使用既有關卡徽章系統製作為可編輯 SVG。9 張原始 PNG 在 `public/images/_source/` 保留同名備份，雜湊與交付檔一致。

共通提示詞：photorealistic cinematic Qing-inspired educational dialogue RPG; dark nanmu and zitan wood, aged ivory paper, muted teal and bronze, warm candlelight with cool window shafts; no readable text, no watermark, no signature。

各項提示詞重點：

- 整體藥房：landscape 16:9, tall apothecary cabinets, dried herbs, bronze scales, mortar and pestle, open foreground and right-side dialogue space, warm and cool mixed lighting。
- 檢索案桌：landscape 16:9, investigation desk weighted left, blank reference book, scale, mortar, bowls and packets, right side kept open for the physician sprite。
- 太醫基準：original male physician about 35, dark teal and muted green robe, simple black court cap, bamboo medical case, leather satchel, half-body 3:4, transparent alpha, no actor likeness。
- 急切表情：preserve exact identity and costume; raised and tightened brows, focused eyes, one index finger raised as a caution gesture。
- 安心表情：preserve exact identity and costume; softened eyes, small sincere smile, hand resting toward the medical case after a correct lookup。
- 脈案百草譜：open thread-bound medical book, botanical drawings and generic dried specimens, no readable writing or medical instructions。
- 檢索卡：six paper lookup cards with abstract brush-stroke marks and guide lines, arranged for later interactive overlay, no readable characters。
- 封存藥包：three tied handmade-paper packets, generic dried herbs, jade seals and bronze scoop, no named toxic plant or preparation instruction。
- 診脈記錄：blank folded record with faint non-readable lines, jade paperweight, bronze bowl and tally sticks, no patient data or diagnosis。

## 已執行的驗證

- 9 張 PNG 全數可解碼且大於零位元組。
- 兩張背景實際為 1672×941，接近 16:9，並非 4K。
- 三張太醫立繪尺寸一致，精確 3:4；抽樣檢查均應檢出透明背景及接近不透明的主體像素。
- 四張道具圖為精確 1:1，背景不透明。
- 徽章 SVG 可解析，根節點為 `svg`。
- 已檢視生成結果：藥房背景具備藥櫃、案桌與左右分區；太醫三種表情可區分；四件道具保留可由文字層疊加教材內容的空間。
- 原圖備份與交付 PNG 雜湊一致。

## 整合備註

- 第六關的部首、筆劃、辭典體例與教材答案應以遊戲文字層實作，並由課程來源核對；圖片不承擔正式題庫內容。
- `ITEM_06_LOOKUP_CARDS.png` 是卡片展示底圖，卡片點選、排序與限時查詢需另以 HTML 元件實作。
- 道具只呈現查證與藥房氛圍，不提供現實醫療建議、毒物辨識或製備方法。
- 通用 UI 沿用 `UI_HP_BAR.svg`、`UI_MP_BAR.svg`、`UI_DIALOGUE_FRAME.svg`、`UI_CHOICE_BUTTON.svg`、`UI_HINT_BUTTON.svg`。
- 本批完成生成、保存、視覺檢視與檔案檢查；遊戲畫面中的遮擋、文字對比、限時互動及手機裁切尚待整合測試。
