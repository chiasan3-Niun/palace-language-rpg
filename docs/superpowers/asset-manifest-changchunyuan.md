# 暢春園第八關資產清單

製作與檢查日期：2026-10-27。

依據 `code_artifact.md` 第八關「應用文：柬帖規範與便條」及 `ai.md` 暢春園佛堂美術規格製作。角色採用原創年長宮廷長輩，不沿用影視人物姓名或演員外貌。本批完成 2 張背景、3 張角色表情、4 件柬帖與禮佛道具及 1 枚徽章。玩家立繪與通用 UI 沿用第一關。

## 檔案清單

路徑相對於專案根目錄。

| 路徑 | 實際尺寸 | 用途 |
|---|---:|---|
| `public/images/backgrounds/BG_08_CHANGCHUNYUAN.png` | 1672×941 | 暢春園佛堂整體場景、開場與角色對話 |
| `public/images/backgrounds/BG_08_CHANGCHUNYUAN_INVITATION.png` | 1672×941 | 柬帖校驗案桌、請帖排版與互動 |
| `public/images/characters/CH_CHANGCHUN_DOWAGER_neutral.png` | 1086×1448 | 原創宮廷長輩，中性審視 |
| `public/images/characters/CH_CHANGCHUN_DOWAGER_blessing.png` | 1086×1448 | 原創宮廷長輩，認可合宜柬帖並賜福 |
| `public/images/characters/CH_CHANGCHUN_DOWAGER_disapproving.png` | 1086×1448 | 原創宮廷長輩，對格式失禮表示不許 |
| `public/images/items/ITEM_08_INVITATION_CARD.png` | 1254×1254 | 空白皇家祈福柬帖，疊加教材文字 |
| `public/images/items/ITEM_08_FORMAT_STRIPS.png` | 1254×1254 | 八條格式排版條與四張紅色標籤的展示底圖 |
| `public/images/items/ITEM_08_PRAYER_SCROLL.png` | 1254×1254 | 空白祈福卷軸與禮佛場景道具 |
| `public/images/items/ITEM_08_INVITATION_ENVELOPE.png` | 1254×1254 | 請帖封套、封印與金色流蘇 |
| `public/images/ui/UI_LEVEL_BADGE_08.svg` | viewBox 512×512 | 柬帖校驗徽章 |

## 製作方式與提示詞紀錄

9 張 PNG 使用內建影像生成工具；兩張角色表情變體以 `neutral` 圖為編輯參考，保留同一人物、服裝、髮冠、玉石念珠與透明背景。徽章使用既有關卡徽章系統製作為可編輯 SVG。9 張原始 PNG 在 `public/images/_source/` 保留同名備份，雜湊與交付檔一致。

共通提示詞：photorealistic cinematic Qing-inspired educational dialogue RPG; dark zitan wood, gilded bronze, saffron silk, vermilion paper, aged ivory, jade and warm lamp light; no readable text, no modern objects, no watermark, no signature。

各項提示詞重點：

- 佛堂整體：landscape 16:9, gilded Buddhist statue, butter lamps, sandalwood incense, yellow silk prayer cushions, open right side for dialogue, serene authoritative mood。
- 柬帖案桌：landscape 16:9, blank red invitation cards and cream scroll weighted left, shrine depth in background, open right side for character overlay。
- 角色基準：original woman about 65, slate-blue and muted gold brocade robe, jade-and-gold Qing headdress, green jade prayer beads, half-body 3:4, transparent alpha, no actor likeness。
- 賜福表情：preserve exact identity and costume; softened eyes, compassionate smile, hands slightly lifting the jade beads。
- 不許表情：preserve exact identity and costume; lowered brows, steady severe eyes, lips pressed, beads held close and still。
- 皇家柬帖：blank vermilion folding invitation, gold lotus and cloud border, blank cream inner panel, golden tassel。
- 格式排版條：eight blank ivory strips and four red paper tabs, decorative borders only, centers reserved for editable text。
- 祈福卷軸：blank vertical cream scroll, lotus-and-cloud border, wood rollers, jade paperweight and beads。
- 請帖封套：vermillion silk-paper envelope, blank cream seal panel, plain cinnabar wax and golden tassel, no official mark。

## 已執行的驗證

- 9 張 PNG 全數可解碼且大於零位元組。
- 兩張背景實際為 1672×941，接近 16:9，並非 4K。
- 三張角色立繪尺寸一致，精確 3:4；抽樣檢查均應檢出透明背景及接近不透明的主體像素。
- 四張道具圖為精確 1:1，背景不透明。
- 徽章 SVG 可解析，根節點為 `svg`。
- 已檢視生成結果：佛堂具備威嚴與安定的光線；柬帖案桌留有右側角色空間；長輩三種表情可區分；道具中央留白可疊加教材文字。
- 原圖備份與交付 PNG 雜湊一致。

## 整合備註

- 請柬專用語「謹訂、桃觴、彌月、席設、恕道」等教材內容應以遊戲文字層實作，並由課程來源核對；圖片不承擔正式題庫內容。
- `ITEM_08_FORMAT_STRIPS.png` 是排版展示底圖，拖曳、排序、格式判斷與錯誤提示需另以 HTML 元件實作。
- 佛堂與禮佛物件只呈現場景氛圍，不預設任何宗教儀式細節或未核對的文化解釋。
- 通用 UI 沿用 `UI_HP_BAR.svg`、`UI_MP_BAR.svg`、`UI_DIALOGUE_FRAME.svg`、`UI_CHOICE_BUTTON.svg`、`UI_HINT_BUTTON.svg`。
- 本批完成生成、保存、視覺檢視與檔案檢查；遊戲畫面中的遮擋、文字對比、互動狀態及手機裁切尚待整合測試。
