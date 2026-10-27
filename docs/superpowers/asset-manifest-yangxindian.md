# 養心殿第十二關素材清單

製作日期：2026-10-27。依據 `code_artifact.md` 第十二關「終極殿試」與 `ai.md` 養心殿西暖閣規格製作。本批包含 2 張場景背景、3 張原創皇帝表情、4 項決戰道具及 1 枚徽章。玩家立繪與通用 UI 沿用前關素材。

## 檔案

| 路徑 | 用途 |
|---|---|
| `public/images/backgrounds/BG_12_YANGXINDIAN.png` | 1672×941 | 養心殿西暖閣決戰主場景 |
| `public/images/backgrounds/BG_12_YANGXINDIAN_DUEL.png` | 1672×941 | 近景殿前辯論場景 |
| `public/images/characters/CH_YANGXIN_EMPEROR_neutral.png` | 1024×1536 | 原創皇帝中性威嚴狀態 |
| `public/images/characters/CH_YANGXIN_EMPEROR_angry.png` | 1024×1536 | 皇帝遭駁斥時的克制怒意 |
| `public/images/characters/CH_YANGXIN_EMPEROR_defeated.png` | 1024×1536 | 皇帝醒悟後的低落神情 |
| `public/images/items/ITEM_12_JADE_SEAL.png` | 1374×1145 | 白玉龍鈕玉璽 |
| `public/images/items/ITEM_12_COUPLET_SCROLLS.png` | 1305×1205 | 留白對聯卷軸，供遊戲文字層呈現題目 |
| `public/images/items/ITEM_12_IMPERIAL_EDICT.png` | 1024×1536 | 空白御批底圖，供遊戲文字層呈現內容 |
| `public/images/items/ITEM_12_PROSODY_TILES.png` | 1536×1024 | 平仄節奏判讀牌組 |
| `public/images/ui/UI_LEVEL_BADGE_12.svg` | 殿試決戰徽章，viewBox 512×512 |

## 提示詞紀錄

9 張 PNG 使用內建影像生成工具。兩種皇帝表情變體以中性立繪作參考，保持同一角色與服飾。背景為清代宮廷寫實場景；對聯及御批保留文字空間。

- 主場景：historical-scene, West Warm Chamber of Yangxin Hall, carved dragon throne, nine-dragon screen, yellow-silk desk, dramatic candlelight, open foreground, no people or readable text。
- 決戰近景：same imperial chamber, closer throne view, stronger red-gold light, empty desk center, blank scrolls at sides, no people or readable text。
- 皇帝中性：original Chinese emperor in late 50s, imperial yellow dragon robe, black Qing court hat, full-length transparent portrait。
- 怒意：preserve identity and costume; controlled anger and disbelief, no caricature。
- 受挫：preserve identity and costume; shaken realization, lowered reflective gaze。
- 玉璽：white jade square seal with carved dragon handle, no engraving or pseudo-writing。
- 對聯：two blank vertical cream scrolls with restrained gold border。
- 御批：blank cream imperial edict panel with cinnabar border。
- 平仄牌：eight ivory and vermilion tiles with abstract dot and line motifs only。

## 驗證紀錄

- 9 張 PNG 全數可解碼；兩張背景為 1672×941，三張角色為 1024×1536，道具尺寸見上表。
- 每隔 24 像素抽樣檢查，角色及道具均包含透明像素與近乎不透明主體像素；背景抽樣均不透明。
- 9 張 PNG 已建立同名來源備份，SHA-256 逐一相符；徽章 SVG 可解析，viewBox 為 512×512。
- 已檢視生成預覽：西暖閣全景和辯論近景可區分；皇帝三種神情可辨；玉璽、對聯、御批與平仄牌可供遊戲文字層和互動使用。
- 遊戲內文字對比、版面、遮擋、裁切及互動尚未驗證。

## 整合備註

- 對聯、古文論辯、偽詔判讀的正式題目與答案由遊戲文字層提供，並依課程內容校對。
- 玉璽為劇情道具圖；勝敗分支、平仄判斷與結局流程仍需遊戲程式實作。
- 通用 UI 沿用第一關素材。
