# 儲秀宮第七關資產清單

製作與檢查日期：2026-10-26。

依據 `code_artifact.md` 第七關「應用文：書信格式與稱謂」及 `ai.md` 儲秀宮美術規格製作。角色採用原創年輕宮廷貴女，不沿用影視人物姓名或演員外貌。本批完成 2 張背景、3 張角色表情、4 件書信審查道具及 1 枚徽章。玩家立繪與通用 UI 沿用第一關。

## 檔案清單

路徑相對於專案根目錄。

| 路徑 | 實際尺寸 | 用途 |
|---|---:|---|
| `public/images/backgrounds/BG_07_CHUXIUGONG.png` | 1672×941 | 儲秀宮搜查後的側殿、開場與角色對話 |
| `public/images/backgrounds/BG_07_CHUXIUGONG_EVIDENCE.png` | 1672×941 | 書信查驗案桌、封蠟與證物互動 |
| `public/images/characters/CH_CHUXIU_NOBLE_LADY_neutral.png` | 1086×1448 | 原創宮廷貴女，中性防備 |
| `public/images/characters/CH_CHUXIU_NOBLE_LADY_accusatory.png` | 1086×1448 | 原創宮廷貴女，提出指控 |
| `public/images/characters/CH_CHUXIU_NOBLE_LADY_shaken.png` | 1086×1448 | 原創宮廷貴女，證據被質疑後動搖 |
| `public/images/items/ITEM_07_SEIZED_LETTER.png` | 1254×1254 | 搜繳家書與空白信封，疊加書信文字 |
| `public/images/items/ITEM_07_HONORIFIC_CARDS.png` | 1254×1254 | 六張稱謂與書信格式卡的展示底圖 |
| `public/images/items/ITEM_07_BROKEN_SEAL.png` | 1254×1254 | 破損封蠟與印章比對證物 |
| `public/images/items/ITEM_07_LETTER_FRAGMENTS.png` | 1254×1254 | 信件碎片、絲線與缺口封蠟的偽證線索 |
| `public/images/ui/UI_LEVEL_BADGE_07.svg` | viewBox 512×512 | 書信辨偽徽章 |

## 製作方式與提示詞紀錄

9 張 PNG 使用內建影像生成工具；兩張角色表情變體以 `neutral` 圖為編輯參考，保留同一人物、服裝、髮冠、手帕與透明背景。徽章使用既有關卡徽章系統製作為可編輯 SVG。9 張原始 PNG 在 `public/images/_source/` 保留同名備份，雜湊與交付檔一致。

共通提示詞：photorealistic cinematic Qing-inspired educational dialogue RPG; dark zitan wood, muted crimson and plum silk, aged ivory paper, cinnabar and antique bronze; no readable text, no modern objects, no watermark, no signature。

各項提示詞重點：

- 搜查側殿：landscape 16:9, displaced silk bed curtains, scattered blank papers and envelopes, toppled porcelain, pearl hairpins, cold afternoon light, open right side for dialogue。
- 證物案桌：landscape 16:9, evidence desk weighted left, blank letters, envelope, seal wax and inkstone, open right side for character overlay。
- 角色基準：original young woman about 23, muted crimson and plum embroidered Manchu robe, coral-and-pearl headdress, folded embroidered handkerchief, half-body 3:4, transparent alpha, no actor likeness。
- 指控表情：preserve exact identity and costume; raised chin, firm brows, narrowed eyes, hand extending the handkerchief as evidence。
- 動搖表情：preserve exact identity and costume; worried eyes, raised inner brows, lips parted, both hands drawing the handkerchief toward the chest。
- 搜繳家書：blank lined Xuan paper letter, silk envelope, plain cinnabar seal, jade paperweight and inkstone, no readable names or writing。
- 稱謂卡：six blank ivory cards with different borders and seal placements, centers reserved for editable text overlay。
- 破損封蠟：broken cinnabar wax, abstract bronze stamp, silk cord and plain envelope edge, no recognizable official mark。
- 信件碎片：torn blank paper fragments, loose rose silk thread, pearl, paper knife and missing seal impression, no blood and no readable text。

## 已執行的驗證

- 9 張 PNG 全數可解碼且大於零位元組。
- 兩張背景實際為 1672×941，接近 16:9，並非 4K。
- 三張角色立繪尺寸一致，精確 3:4；抽樣檢查均應檢出透明背景及接近不透明的主體像素。
- 四張道具圖為精確 1:1，背景不透明。
- 徽章 SVG 可解析，根節點為 `svg`。
- 已檢視生成結果：搜查背景具備左側證物區與右側對話空間；角色三種表情可區分；道具保留文字層與互動元件的整合空間。
- 原圖備份與交付 PNG 雜湊一致。

## 整合備註

- 書信提稱語、啟封詞、緘封詞、自稱謙詞與尊稱應以遊戲文字層實作，並由課程來源核對；圖片不承擔正式題庫內容。
- `ITEM_07_HONORIFIC_CARDS.png` 是卡片展示底圖，卡片拖曳、排序、判斷與錯誤提示需另以 HTML 元件實作。
- 破損封蠟與信件碎片只呈現偽證調查氛圍，不預設任何未經核對的歷史判定。
- 通用 UI 沿用 `UI_HP_BAR.svg`、`UI_MP_BAR.svg`、`UI_DIALOGUE_FRAME.svg`、`UI_CHOICE_BUTTON.svg`、`UI_HINT_BUTTON.svg`。
- 本批完成生成、保存、視覺檢視與檔案檢查；遊戲畫面中的遮擋、文字對比、互動狀態及手機裁切尚待整合測試。
