# 文淵閣第十一關素材清單

製作日期：2026-10-27。依據 `code_artifact.md` 第十一關及 `ai.md` 文淵閣規格。本批為夜探皇家書庫、經史子集歸卷與尋覓先帝密詔；包含 2 張背景、3 張原創檔案官表情、4 件道具及 1 枚徽章。玩家立繪與通用 UI 沿用前關素材。

## 檔案

| 路徑 | 用途 |
|---|---|
| `public/images/backgrounds/BG_11_WENYUANGE.png` | 1672×941 | 文淵閣夜間主書庫 |
| `public/images/backgrounds/BG_11_WENYUANGE_SECRET_ARCHIVE.png` | 1672×941 | 隱藏檔案密室 |
| `public/images/characters/CH_WENYUANGE_ARCHIVIST_neutral.png` | 1024×1536 | 原創檔案官中性狀態 |
| `public/images/characters/CH_WENYUANGE_ARCHIVIST_concerned.png` | 1024×1536 | 發現疑點時的警覺表情 |
| `public/images/characters/CH_WENYUANGE_ARCHIVIST_resolved.png` | 1024×1536 | 找到線索後的沉著表情 |
| `public/images/items/ITEM_11_FOUR_BOOKS.png` | 1374×1145 | 經史子集分類典籍堆疊，書脊留白 |
| `public/images/items/ITEM_11_ROYAL_CHRONICLE.png` | 1312×1199 | 先帝實錄展示底圖，標題牌留白 |
| `public/images/items/ITEM_11_SECRET_DECREE.png` | 1983×793 | 密詔卷軸底圖，文字由遊戲層呈現 |
| `public/images/items/ITEM_11_FOUR_CATEGORIES.png` | 1536×1024 | 四部分類牌，留白供遊戲加標籤 |
| `public/images/ui/UI_LEVEL_BADGE_11.svg` | 經史子集典籍徽章，viewBox 512×512 |

## 提示詞紀錄

9 張 PNG 使用內建影像生成工具；角色兩種表情以中性立繪作參考，保留人物、官服與姿勢。背景採寫實清代宮廷書庫、無人物與可讀文字。典籍、實錄、密詔、分類牌均預留文字層空間。

- 主書庫：historical-scene, immense Qing imperial library, multi-level nanmu shelves, book boxes, ladders, single warm paper lantern, deep shadows, no people or text。
- 密室：hidden records alcove behind shifted bookcase, archive boxes, empty lectern, lantern-lit night, open foreground, no readable text。
- 檔案官：original male Chinese archivist in late 40s, forest-green Qing official robe, black winged hat, full-length transparent portrait。
- 警覺表情：preserve identity, concerned alert expression, otherwise unchanged。
- 沉著表情：preserve identity, quiet recognition and resolve, otherwise unchanged。
- 四類典籍：four antique thread-bound books, distinct muted cloth covers, blank spine labels。
- 皇家實錄：blue silk chronicle on rosewood lectern, blank title cartouche。
- 密詔：ivory scroll with cinnabar border and blank central field。
- 分類牌：four blank archival sorting panels with distinct nonverbal borders。

## 驗證紀錄

- 9 張 PNG 全數可解碼；兩張背景為 1672×941，三張角色為 1024×1536，道具尺寸見上表。
- 每隔 24 像素抽樣檢查，角色與道具均包含透明像素及近乎不透明主體像素；背景抽樣均不透明。
- 9 張 PNG 已建立同名來源備份，SHA-256 逐一相符；徽章 SVG 可解析，viewBox 為 512×512。
- 已檢視生成預覽：主書庫與密室場景可區分；檔案官表情有變化；典籍、分類牌及卷軸保留文字區。
- 遊戲內版面、文字對比、遮擋、裁切與互動尚未驗證。

## 整合備註

- 經史子集、史書體例及史書代表作的正式文字與答案需由遊戲文字層提供並校對。
- 書籍分類拖放、秘密記錄解鎖及答案判定仍需遊戲程式實作。
- 通用 UI 沿用第一關素材。遊戲內文字對比、遮擋、裁切和互動尚待整合測試。
