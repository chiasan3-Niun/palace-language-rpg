# 《紫禁深宮·語文策》關卡場景視覺資產與 AI 繪圖規格表
**——適用於 Imagen / Midjourney / Stable Diffusion 之素材生成手冊**

---

## 一、 美術總體風格規範（Art Direction & Global Prompts）

為保證全遊戲素材風格統一、沉浸感純正，所有圖片生成必須嚴格遵循以下全域美學標準：

- **藝術風格（Style）**：清裝宮廷歷史寫實主義，融匯影視級構圖（Cinematic Lighting）與細膩國風工筆設色質感。
- **色彩基調（Palette）**：紫禁城朱紅牆（Cinnabar Red）、金琉璃瓦黃（Imperial Ochre）、沉香木深褐、以及冷寂的雪景青灰（Muted Slate & Cyan）。
- **光影特質（Lighting）**：高反差戲劇光、微塵丁達爾光效、燭火與雪光交織的冷暖對比。
- **通用負面提示詞（Global Negative Prompts）**：
  `modern clothes, modern architecture, western features, anime, cartoon, 3d render plastic, low resolution, bad anatomy, deformed hands, missing fingers, blurry, watermark, signature.`

---

## 二、 關卡場景背景素材清單（12 大地標 + 2 大結局）

場景尺寸規範：橫幅 16:9 比例，解析度不低於 3840×2160。

### 1. 【第 01 關】神武門（初選入宮）
- **資產編號**：`BG_01_SHENWUMEN`
- **遊戲用途**：遊戲開場、秀女初入宮、六書造字審核背景。
- **中文描述**：雄偉巍峨的神武門城樓，紅牆灰磚，漢白玉基座，晨光穿透薄霧，數列著清裝旗袍的年輕秀女低眉肅立，氣氛森嚴肅穆。
- **AI 繪圖英文 Prompt**：
  ```text
  The majestic Shenwu Gate of the Forbidden City, early morning mist, towering vermilion palace walls, imperial yellow glazed roof tiles, white marble balustrades. A neat queue of young Qing dynasty court maidens in subtle silk Manchu dresses standing solemnly in the courtyard. Volumetric morning sunlight, cinematic perspective, highly detailed architectural textures, photorealistic historical Chinese drama aesthetic, 8k resolution, wide-angle lens --ar 16:9 --style raw
  ```

### 2. 【第 02 關】碎玉軒（斷句破案）
- **資產編號**：`BG_02_SUIYUXUAN`
- **遊戲用途**：冷清偏僻的庭院，古樹下埋麝香盒，解開斷句血書。
- **中文描述**：幽僻淒清的碎玉軒庭院，一株蒼老盛開的桂花樹立在庭中，石階長有青苔，樹下泥土有剛被挖掘的痕跡，雨後殘積的水窪倒映著昏暗殿宇。
- **AI 繪圖英文 Prompt**：
  ```text
  A secluded and quiet courtyard of a modest palace pavilion in the Forbidden City, an ancient blossoming sweet osmanthus tree in the center, wet stone pathway covered with patches of moss, freshly disturbed dark soil beneath the tree roots, subtle melancholy mood. Soft overcast post-rain lighting, puddles reflecting gloomy red walls, traditional wooden carved lattice windows, hyper-detailed, atmospheric, cinematic, 8k --ar 16:9
  ```

### 3. 【第 03 關】御花園·倚梅園（修辭機鋒）
- **資產編號**：`BG_03_YIMEIYUAN`
- **遊戲用途**：雪夜對詩、邂逅皇上、修辭連擊博弈。
- **中文描述**：大雪紛飛的夜晚，繁茂盛開的紅梅樹枝頭壓滿白雪，昏黃的六角宮燈散發微弱暖光，雪地上留有一行孤獨腳印，極具浪漫與危機感。
- **AI 繪圖英文 Prompt**：
  ```text
  The Imperial Garden in the Forbidden City at heavy snowy night, vibrant red plum blossoms heavily laden with pure white snow, traditional glowing hexagonal palace lanterns casting warm amber glow on the snow. Deep shadows, solitary footprints in the fresh snow, ancient gnarled cypress trees, ethereal falling snowflakes, mystical and poetic Chinese historical atmosphere, 8k, cinematic depth of field --ar 16:9
  ```

### 4. 【第 04 關】翊坤宮（語法格擋）
- **資產編號**：`BG_04_YIKUNGONG`
- **遊戲用途**：華妃接見、氣勢壓迫、詞性句型防禦。
- **中文描述**：極度奢華富麗的翊坤宮正殿，金絲楠木立柱，滿雕孔雀穿牡丹圖案的紫檀屏風，地上鋪設昂貴的花斑石，銅胎掐絲琺瑯香爐青煙繚繞，壓迫感強烈。
- **AI 繪圖英文 Prompt**：
  ```text
  Opulent and luxurious grand hall of Yikun Palace, rich imperial gold and deep crimson interior, carved red sandalwood partition screen with intricate peacock motifs, polished dark floor tiles reflecting candlelight. Heavy ornate cloisonne bronze incense burner releasing spiraling white smoke, majestic imperial concubine throne, dramatic indoor rim lighting, imposing aura, hyper-realistic, 8k --ar 16:9
  ```

### 5. 【第 05 關】景仁宮（題辭博弈）
- **資產編號**：`BG_05_JINGRENGONG`
- **遊戲用途**：皇后千秋賀壽、各宮晨昏定省、題辭匾額分配。
- **中文描述**：端莊大氣的景仁宮主殿，正上方懸掛「正大光明」風格的匾額，左右陳設紫檀如意宮椅，眾嬪妃座位依品階分列，氣氛表面祥和、暗藏刀光劍影。
- **AI 繪圖英文 Prompt**：
  ```text
  The solemn and stately interior of Jingren Palace, palace of the Empress, symmetry composition, dark zitan wood throne with carved phoenix and cloud patterns, rows of official chairs for imperial concubines, antique porcelain vases, silk embroidered cushions. Elegant palace interior lighting, subtle tense psychological atmosphere, photorealistic historical drama style, 8k --ar 16:9
  ```

### 6. 【第 06 關】太醫院（字典檢索）
- **資產編號**：`BG_06_TAIYIYUAN`
- **遊戲用途**：限時部首查字典、辨別毒物、溫太醫盟友解鎖。
- **中文描述**：太醫院內廷藥房，整面牆都是貼滿紅紙藥名標籤的百子抽屜藥櫃，案桌上散落著《本草綱目》線裝古籍、研缽、黃銅小秤與幾包未封口的草藥。
- **AI 繪圖英文 Prompt**：
  ```text
  Ancient imperial pharmacy interior in the Qing dynasty, wall-to-wall tall apothecary medicine cabinets with thousands of tiny drawers labeled in Chinese calligraphy, wooden desk cluttered with antique thread-bound medical books, bronze herb scales, stone pestle and mortar, dried medicinal herbs. Warm candle and window light, dust particles floating in light shafts, authentic museum quality, 8k --ar 16:9
  ```

### 7. 【第 07 關】儲秀宮（書信審查）
- **資產編號**：`BG_07_CHUXIUGONG`
- **遊戲用途**：祺貴人搜宮發難、滴血驗親前夕、破解偽證家書。
- **中文描述**：儲秀宮側殿內室，錦帳半卷，雕花梳妝台上散落著被抄家翻亂的宣紙信箋、打翻的珠翠首飾，窗櫺透入慘白的午後冷光，充滿劍拔弩張的搜查痕跡。
- **AI 繪圖英文 Prompt**：
  ```text
  A ransacked luxurious imperial bedchamber in Chuxiu Palace, carved wooden dressing table with scattered silk letter envelopes and spilled pearl hairpins, overturned porcelain cups, silk curtains partially torn down. Harsh cold afternoon light streaming through carved lattice window, chaotic and tense atmosphere of an imperial search, authentic Qing period details, 8k --ar 16:9
  ```

### 8. 【第 08 關】暢春園·佛堂（柬帖校驗）
- **資產編號**：`BG_08_CHANGCHUNYUAN`
- **遊戲用途**：太后禮佛、安撫內闈、皇家壽宴請帖排版。
- **中文描述**：幽暗靜謐的皇家佛堂，鎏金佛像低眉慈悲，數盞酥油長明燈火光搖曳，佛前供奉香花素果，檀香沉鬱，蒲團上經卷整齊，給人寧靜而深邃的威嚴感。
- **AI 繪圖英文 Prompt**：
  ```text
  Quiet and holy imperial Buddhist shrine hall inside Changchun Garden, towering gilded bronze Buddha statue, dozens of glowing butter lamps casting soft flickering light, smoldering sandalwood incense. Yellow silk prayer cushions, antique wooden sutra tables with gold-ink prayer scrolls, serene yet intensely authoritative sanctuary atmosphere, 8k, cinematic masterpiece --ar 16:9
  ```

### 9. 【第 09 關】延禧宮·偏殿（年齡密碼）
- **資產編號**：`BG_09_YANXIGONG`
- **遊戲用途**：安嬪私下製香、搜查生辰密碼盒、迷情暗語破解。
- **中文描述**：狹小而精緻的延禧宮偏殿，擺設有古琴、銀絲炭盆與多個精緻的泥金調香暖爐，桌几上擺滿小瓷瓶與生辰八字算籌，空氣中似有若無漂浮著詭異紫煙。
- **AI 繪圖英文 Prompt**：
  ```text
  The dimly lit private chamber of Yanxi Palace, an antique Guqin (Chinese zither) on a stand, ornate silver charcoal brazier, delicate ceramic perfume jars, miniature incense burner emitting faint wisps of purple-tinted smoke. Wooden calculation chips and abacus on the table, mysterious and conspiratorial vibe, moody low-key cinematic lighting, 8k --ar 16:9
  ```

### 10. 【第 10 關】文華殿（干支歲時）
- **資產編號**：`BG_10_WENHUADIAN`
- **遊戲用途**：經筵日講、文官考評、干支節慶對應。
- **中文描述**：皇家講學大殿，高大開闊，殿外露台立有巨型漢白玉日晷與嘉量，殿內書案整齊擺放著四書五經講義，陽光灑滿金磚地面，顯得端方剛正。
- **AI 繪圖英文 Prompt**：
  ```text
  Wenhua Hall, the imperial lecture hall of the Forbidden City, expansive stone courtyard featuring a giant carved white marble sundial, warm midday sunlight casting sharp time shadows. Inside the hall visible through open doors are rows of scholarly mahogany desks with open lecture scrolls, academic and political solemnity, crisp focus, 8k --ar 16:9
  ```

### 11. 【第 11 關】文淵閣（四庫實錄）
- **資產編號**：`BG_11_WENYUANGE`
- **遊戲用途**：夜探皇家書庫、經史子集歸卷、尋覓先帝密詔。
- **中文描述**：文淵閣黑綠色琉璃瓦藏書樓內部，挑高三層的巨型楠木書架林立，數萬冊《四庫全書》金絲楠木書匣整齊陳列，夜間提著一盞防風紙燈籠，神秘浩瀚。
- **AI 繪圖英文 Prompt**：
  ```text
  Inside the immense imperial library Wenyuan Pavilion, soaring three-story tall nanmu wood bookshelves filled with tens of thousands of antique book boxes containing the Siku Quanshu, traditional wooden rolling ladders. A solitary paper lantern on a desk illuminating aged manuscripts, deep shadows in the high ceiling, vast and mysterious treasury of knowledge, 8k, photorealistic --ar 16:9
  ```

### 12. 【第 12 關】養心殿·西暖閣（終極決戰）
- **資產編號**：`BG_12_YANGXINDIAN`
- **遊戲用途**：終極決戰「打倒皇上」、平仄對聯博弈、奪取玉璽。
- **中文描述**：至高無上的養心殿西暖閣，正中是覆蓋明黃色錦緞的雕龍御案，案上整齊擺放著硃砂禦批毛筆、傳國玉璽錦盒與如意，帝王御座背後是九龍金漆屏風，殺機與威嚴並存。
- **AI 繪圖英文 Prompt**：
  ```text
  The West Warm Chamber of Yangxin Hall, imperial study and power center of the Emperor, magnificent carved golden dragon throne backed by a nine-dragon gilded lacquer folding screen. Grand imperial mahogany desk draped in imperial yellow silk, jade imperial seal box, vermilion ink brushes, tall golden candles casting dramatic high-contrast lighting, climactic showdown tension, ultra-detailed 8k --ar 16:9
  ```

### 13. 【結局 A】太和殿前·登基改制（勝利獲勝）
- **資產編號**：`BG_END_VICTORY`
- **遊戲用途**：打倒皇上後，玩家身著鳳袍登上最高權力巔峰。
- **中文描述**：萬里無雲的清晨，太和殿三層漢白玉丹陛之上，玩家身披華貴太后朝袍，俯瞰下方空闊廣場，文武百官三跪九叩，象徵打破桎梏、掌控乾坤。
- **AI 繪圖英文 Prompt**：
  ```text
  Triumphant panoramic view from the top terrace of the Hall of Supreme Harmony, looking down over the vast marble plaza of the Forbidden City. Early morning golden hour light casting long dramatic shadows, a solitary powerful empress figure in elaborate imperial golden dragon robe seen from behind overlooking the empire, grand cinematic coronation climax, 8k --ar 16:9
  ```
- **檔案位置**：`public/images/backgrounds/BG_END_VICTORY.png`

### 14. 【結局 B】冷宮·荒煙蔓草（失敗淘汰）
- **資產編號**：`BG_END_DEFEAT`
- **遊戲用途**：容止值歸零、被皇上識破賜死或打入冷宮。
- **中文描述**：殘破凋零的冷宮廢墟，斑駁脫落的紅漆大門緊閉，窗紙破碎，院落荒草叢生，枯枝寒鴉，一片淒風苦雨的絕望悲涼景象。
- **AI 繪圖英文 Prompt**：
  ```text
  The bleak and desolate Cold Palace in the Forbidden City, peeling red paint on locked rotting wooden doors, shattered paper lattice windows, overgrown weeds pushing through cracked stone paving. Bare dead willow branches, crows perching, gloomy foggy twilight, cold blue and decayed gray tones, tragedy and abandonment, 8k --ar 16:9
  ```
- **檔案位置**：`public/images/backgrounds/BG_END_DEFEAT.png`

---

## 三、 核心角色立繪素材清單（Character Sprites）

立繪規格：半身像（Half-body Portrait），透明背景（PNG）或中性純色底，便於去背整合。

| 角色編號 | 角色名 / 身份 | 表情與姿態 | 專屬服裝配飾特徵 | Imagen 繪圖 Prompt |
| :---: | :---: | :---: | :---: | :--- |
| `CH_PROTAGONIST_01` | **玩家（初期·秀女）** | 眉宇清秀，略帶謹慎與聰慧，雙手交疊腹前行萬福禮。 | 湖水藍素面緞子旗裝，簡約兩把頭，僅插一朵白玉蘭簪與點翠小花。 | `Half-body portrait of a young intelligent Qing dynasty maiden, 18 years old, dignified yet cautious expression. Wearing modest pastel cyan silk Manchu robe with delicate edge embroidery, traditional Liangbatou headdress decorated with a simple white jade magnolia hairpin, clean neutral background, cinematic studio lighting, 8k --ar 3:4` |
| `CH_PROTAGONIST_02` | **玩家（後期·貴妃）** | 眼神冷峻霸氣，嘴角含笑，透著掌控全域的深沉智謀。 | 明黃色金絲刺繡鳳凰吉服，滿頭點翠嵌金東珠鈿子，戴玳瑁鎏金護甲。 | `Half-body portrait of a powerful Qing dynasty Imperial Noble Consort, calculating and dominant expression, cold piercing eyes. Wearing elaborate imperial golden silk robe embroidered with dragons and peonies, luxurious Tian-tsui kingfisher feather and pearl tiara headdress, golden nail guards, studio lighting, masterpiece, 8k --ar 3:4`；已生成為 `public/images/characters/CH_PROTAGONIST_02.png`，以初期玩家立繪為身份參考。 |
| `CH_EMPEROR` | **皇上（雍正/終極Boss）** | 生性多疑，眉頭深鎖，神情威嚴莫測，手持沉香木佛珠。 | 明黃色金龍常服袍，腰系石青色朝帶，佩翡翠荷包與白玉板指。 | `Half-body portrait of a middle-aged Qing dynasty Emperor, austere, deeply suspicious and authoritarian gaze, holding dark agarwood prayer beads. Wearing imperial bright yellow dragon-patterned silk robe, green jade archer ring on thumb, highly realistic cinematic face details, dramatic chiaroscuro lighting, 8k --ar 3:4` |
| `CH_HUA_FEI` | **華妃（年世蘭）** | 嬌艷跋扈，眼神凌厲蔑視，微微揚起下巴，語帶嘲弄。 | 玫瑰紫百褶旗袍，滿插金累絲孔雀步搖，赤金嵌寶石手鐲。 | `Half-body portrait of an arrogant and stunningly beautiful imperial consort, disdainful smirk, piercing haughty eyes. Wearing vivid magenta silk robe embroidered with golden peacocks, lavish gold filigree tassels swinging from tall headdress, jewel rings, dramatic studio lighting, 8k --ar 3:4` |
| `CH_EMPRESS` | **皇后（宜修）** | 面容和藹慈祥，但笑意不及眼底，藏著極深的城府與偽善。 | 明黃色團壽雲錦旗袍，通景紫金鈿子，神態莊敬端肅。 | `Half-body portrait of an elegant Qing dynasty Empress, composed gentle maternal smile hiding cold ruthless scheming eyes. Wearing traditional imperial yellow and navy blue formal court gown with longevity roundels, exquisite gold and ruby phoenix headdress, 8k --ar 3:4` |
| `CH_WEN_TAIYI` | **溫太醫（溫實初）** | 溫文爾雅，目光關切忠誠，右手微抬做按脈診斷狀。 | 內務府太醫院七品官服，青色團花袍，佩藥箱背帶與補子。 | `Half-body portrait of a gentle and loyal Qing dynasty imperial physician, scholarly handsome face, compassionate eyes. Wearing official dark green Qing court robe with embroidered bird badge (Buzi), leather medical satchel strap over shoulder, 8k --ar 3:4` |
| `CH_AN_PIN` | **安嬪（安陵容）** | 眼神憂鬱且帶嫉恨，低眉順眼，雙手緊攥繡花帕子。 | 淺丁香色繡梅花旗裝，銀鍍金燒藍小扁方，身形纖弱。 | `Half-body portrait of a delicate yet secretly bitter Qing court concubine, fragile melancholic expression concealing jealousy, clutching an embroidered silk handkerchief. Wearing pale lilac silk dress, slender silver hairpins, soft dramatic lighting, 8k --ar 3:4` |
| `CH_QI_GUIREN` | **祺貴人（瓜爾佳氏）** | 年輕氣盛，滿臉譏誚與急功近利，眼神充滿惡意指控。 | 鮮紅緞地繡折枝花旗裝，滿綴珍珠珊瑚，顯露外戚囂張。 | `Half-body portrait of a spiteful young Qing noble lady, sneering aggressive expression, accusing posture. Wearing vibrant scarlet red embroidered robe, headdress packed with coral and seed pearls, dramatic lighting, 8k --ar 3:4` |
| `CH_EMPRESS_DOWAGER`| **太后（烏雅氏）** | 飽經滄桑，威嚴沉穆，神態安詳中透著洞悉一切的睿智。 | 石青色萬字不到頭織錦袍，戴翡翠十八子手串，面露佛性威嚴。 | `Half-body portrait of a venerable Qing Empress Dowager, wise wrinkled face, calm yet utterly commanding presence. Wearing deep slate blue silk brocade robe, holding a string of green jadeite beads, soft warm temple-like lighting, 8k --ar 3:4` |

---

## 四、 關鍵解謎道具與線索物件清單（Item & Clue Assets）

道具尺寸規範：正方形（1:1 比例）特寫微距，深色木紋或紅漆桌面背景，焦點清晰。

| 道具編號 | 道具名稱 | 出現關卡 | 遊戲用途說明 | AI 繪圖英文 Prompt |
| :---: | :---: | :---: | :---: | :--- |
| `ITEM_01_SCROLL` | **秀女宗族名冊** | 第 01 關 | 六書造字考驗，找出偽造姓氏偏旁。 | `Macro top-down shot of an ancient Chinese imperial census scroll, yellow mulberry paper with exquisite black calligraphy characters, cinnabar red official square seals stamped on paper, dark lacquered table background, studio lighting, museum relic quality, 8k --ar 1:1` |
| `ITEM_02_BOX` | **深埋麝香金盒** | 第 02 關 | 碎玉軒泥中掘出，內藏斷句血書。 | `Macro shot of an antique Qing dynasty carved gilt bronze round cosmetic box dug out of damp earth, dirt clinging to crevices, partially open revealing a dried cloth with faded crimson calligraphy inside, dramatic moody lighting, 8k --ar 1:1` |
| `ITEM_03_PORTRAIT`| **倚梅園剪紙小像** | 第 03 關 | 觸發與皇上修辭問答的信物。 | `Close-up shot of an intricate red paper-cutting portrait of a young girl's silhouette, delicate cutouts hanging on a snow-dusted gnarled plum tree branch, soft golden lantern light bokeh in the background, 8k --ar 1:1` |
| `ITEM_04_TOKEN` | **一丈紅行刑令牌** | 第 04 關 | 翊坤宮答錯時的威脅動畫。 | `Macro still life of a Qing dynasty carved red lacquer disciplinary token (Lingpai) with gold incised Chinese warning characters, resting on imperial purple silk brocade, ominous dramatic lighting, 8k --ar 1:1` |
| `ITEM_05_PLAQUE` | **金漆千秋賀壽匾** | 第 05 關 | 題辭歸位，配對「母儀天下」等四字。 | `Close-up of a miniature Qing imperial horizontal wooden plaque, black lacquer board with raised 3D gold leaf Chinese calligraphy characters, surrounded by carved golden five-clawed dragon border, museum lighting, 8k --ar 1:1` |
| `ITEM_06_BOOK` | **太醫脈案百草譜** | 第 06 關 | 部首查字法，檢索夾竹桃毒性。 | `Macro photo of an open classical Chinese medical encyclopedia with woodblock printed medicinal plant drawings, dried botanical herb samples laid next to open pages, spectacles and brass magnifying glass, 8k --ar 1:1` |
| `ITEM_07_LETTER` | **搜繳家書密信** | 第 07 關 | 書信稱謂糾錯，破解祺貴人偽證。 | `Top-down macro shot of an unfolded antique Xuan paper letter, elegant Chinese brush calligraphy showing mismatched honorific titles, folded silk envelope with cinnabar wax seal beside it, dramatic detective desk light, 8k --ar 1:1` |
| `ITEM_08_INVITE` | **皇家祈福柬帖** | 第 08 關 | 請帖格式排版，挑出用詞失禮處。 | `Close-up shot of a luxurious royal folding invitation card (Jiantie), bright red dragon-patterned paper with gold dust speckles, formal vertical Chinese script, tied with a golden silk tassel, 8k --ar 1:1` |
| `ITEM_09_DIAL` | **生辰干支算籌盤** | 第 09/10 關 | 年齡與干支時辰換算解鎖機構。 | `Macro shot of an antique circular bronze astrology mechanism, rotating concentric rings carved with the Twelve Earthly Branches and Ten Heavenly Stems, aged patina, studio lighting, Da Vinci code aesthetic, 8k --ar 1:1` |
| `ITEM_11_ROYAL_CHRONICLE` | **文淵閣先帝起居注** | 第 11 關 | 掌握史書體例，揭露宮廷秘史。 | `Macro shot of a thick thread-bound royal historical record manuscript, blue silk brocade cover with gold embroidered dragon label, laid on dark rosewood lectern, glowing dust motes, historical mystery atmosphere, 8k --ar 1:1` |
| `ITEM_12_JADE_SEAL` | **傳國奉天玉璽** | 第 12 關 | 擊敗皇上後的通關戰利品。 | `Macro shot of the legendary Imperial Jade Seal of China, carved from luminous Hetian white jade with intertwined coiling dragon handle, sitting atop a yellow silk cushion with cinnabar ink residue on the base, majestic divine lighting, 8k --ar 1:1` |

---

## 五、 UI 介面與技能圖章素材（UI Badges & Icons）

徽章採 SVG，viewBox 為 512×512；通用 UI 元件為 SVG，文字由遊戲介面疊加。

| 圖示編號 | 元素名稱 | 視覺特徵說明 | AI 繪圖 Prompt 關鍵詞 |
| :---: | :---: | :---: | :--- |
| `UI_HP_BAR` | **容止值條（HP）** | 白玉如意鑲嵌紅瑪瑙進度條，端頭雕刻鳳凰銜珠。 | `Ancient Chinese GUI element, ornate white jade Ruyi scepter framed health bar with glowing ruby inlay, mobile game asset, UI vector style, isolated on black background --ar 1:1` |
| `UI_MP_BAR` | **才情值條（MP）** | 碧玉竹節造型能量條，蓄滿時散發金色流光。 | `Ancient Chinese UI mana bar, carved green jade bamboo segment shape, glowing golden ink aura, clean video game UI asset, transparent background --ar 1:1` |
| `UI_BADGE_01` | **六書通達徽章** | 甲骨文「文」字與金石篆刻結合的古銅印章圖標。 | `Game achievement badge, circular antique bronze seal with ancient Oracle Bone script engraving, glowing edges, game icon design, isolated --ar 1:1` |
| `UI_BADGE_02` | **巧舌修辭徽章** | 白孔雀羽毛扇與金色毛筆交錯的榮譽圖章。 | `Game achievement badge, white peacock feather fan crossed with a golden Chinese calligraphy brush, imperial game skill icon, isolated --ar 1:1` |
| `UI_BADGE_03` | **對聯魁首徽章** | 紅色對聯紙卷軸展開，中央環繞金色太極平仄符號。 | `Game achievement badge, unrolled miniature red couplet scrolls with golden Yin-Yang rhythm symbols, Qing dynasty style game button icon --ar 1:1` |
