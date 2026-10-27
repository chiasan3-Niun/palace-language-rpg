# 文華殿第十關素材清單

製作與檢查日期：2026-10-27。

依據 `code_artifact.md` 第十關「朝會經筵四時考評」與天干地支、傳統節慶、歲時日晷校正設計。本批包含 2 張背景、3 張原創儒臣表情、4 項教學道具及 1 枚徽章。玩家立繪與通用 UI 沿用前關素材。

## 檔案清單

路徑相對於專案根目錄。

| 路徑 | 預期尺寸 | 用途 |
|---|---:|---|
| `public/images/backgrounds/BG_10_WENHUADIAN.png` | 1672×941 | 文華殿經筵主場景 |
| `public/images/backgrounds/BG_10_WENHUADIAN_SUNDIAL.png` | 1672×941 | 文華殿外日晷庭院與歲時校正場景 |
| `public/images/characters/CH_WENHUA_SCHOLAR_neutral.png` | 1024×1536 | 原創儒臣，中性審視 |
| `public/images/characters/CH_WENHUA_SCHOLAR_questioning.png` | 1024×1536 | 原創儒臣，提問與考校 |
| `public/images/characters/CH_WENHUA_SCHOLAR_approving.png` | 1024×1536 | 原創儒臣，認可答案 |
| `public/images/items/ITEM_10_GANZHI_DIAL.png` | 1254×1254 | 天干地支教學輪盤底圖；文字由遊戲疊加 |
| `public/images/items/ITEM_10_SUNDIAL.png` | 1329×1183 | 日晷教學道具 |
| `public/images/items/ITEM_10_FESTIVAL_CARDS.png` | 1536×1024 | 傳統節慶詩文卡底圖；詩文由遊戲疊加 |
| `public/images/items/ITEM_10_CALENDAR_SCROLL.png` | 1774×887 | 歲時卷軸底圖；日曆文字由遊戲疊加 |
| `public/images/ui/UI_LEVEL_BADGE_10.svg` | viewBox 512×512 | 歲時日晷關卡徽章 |

## 提示詞紀錄

9 張 PNG 使用內建影像生成工具。兩張背景採清代宮廷寫實電影感、無人物、無可讀文字；角色為原創五十歲上下漢族男性儒臣，深靛色官服與黑色官帽，表情變體以中性立繪作參考；道具圖為透明背景，教材文字保留給遊戲文字層。

- 主背景：historical-scene, photorealistic cinematic Qing imperial lecture hall, vermilion columns, orderly scholarly desks and blank scrolls, open aisle, warm midday light, no people or readable text。
- 日晷庭院：historical-scene, Qing palace courtyard, marble terrace, bronze-and-marble sundial, autumn daylight, open game composition, no people or readable text。
- 儒臣中性立繪：original male scholar-official in his early 50s, dark indigo court robe with crane rank badge, black winged hat, full-length, transparent background。
- 提問表情：preserve identity, costume and pose; attentive focused eyes, slightly raised brows。
- 認可表情：preserve identity, costume and pose; softened eyes, restrained approving smile。
- 干支輪盤：dark rosewood and aged brass concentric rotatable rings, abstract geometric marks, no readable characters or numerals。
- 日晷：bronze-and-pale-marble Chinese tabletop sundial, gnomon, unmarked dial, no writing。
- 節慶卡：five ivory cards with seasonal nonverbal motifs for lantern, willow, dragon boat, magpie and chrysanthemum; blank text areas。
- 歲時卷軸：unfurled cream scroll with blank central parchment, restrained gold border, no writing。

## 驗證紀錄

- 9 張 PNG 全數可解碼且大於零位元組；兩張背景為 1672×941，三張角色同為 1024×1536，四項道具尺寸如上表。
- 每張角色及道具以每隔 24 像素抽樣，均檢出透明像素與近乎不透明像素；兩張背景抽樣均不透明。
- 9 張 PNG 已在 `public/images/_source/` 建立同名副本，逐一比對 SHA-256 均相同。
- 徽章 SVG 根節點解析為 `svg`，viewBox 為 512×512。
- 已檢視生成預覽：背景場景清楚，學士的提問與認可表情可辨；輪盤、日晷、節慶卡及卷軸保留可作遊戲疊字的區域。
- 遊戲畫面中的版面、文字對比、遮擋、裁切及互動尚未驗證。

## 整合備註

- 干支、節慶詩文、節令與答案應由遊戲文字層呈現，並依課程內容校對；生成圖片不承載正式題庫。
- 天干地支輪盤與日晷目前是視覺道具，旋轉、選擇與答案判定仍需遊戲程式實作。
- 通用 UI 沿用 `UI_HP_BAR.svg`、`UI_MP_BAR.svg`、`UI_DIALOGUE_FRAME.svg`、`UI_CHOICE_BUTTON.svg`、`UI_HINT_BUTTON.svg`。
