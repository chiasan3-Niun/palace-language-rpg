# 《紫禁深宮·語文策》開源／免版稅音效素材研究

檢索日期：2026-10-27  
研究範圍：宮廷環境、腳步、開門、紙張／卷軸、印章、解密成功／失敗、按鈕、提示、對話確認、過場轉場、戰鬥／論辯、勝利／失敗，以及十二關的特色音效。  
專案對照：`ai.md`、`code_artifact.md`、`docs/AGENT_INDEX.md`、`docs/PROJECT_SPEC.md`、`docs/ROADMAP.md`。

## 先給主 Agent 的結論

1. 第一批優先採用 OpenGameArt 的單一素材頁與音效包，因為頁面直接標出作者、授權與可下載格式；其中 CC0 素材不要求署名，CC BY 素材則要把作者與來源頁放入遊戲的 credits。
2. 宮廷感不應靠「古風」標籤硬猜。建議以風、雨、鳥、木門、紙張、印章、鈴聲等真實聲音組成底層，再用 UI 確認／錯誤音與短轉場音做互動回饋。
3. 本報告只列授權已在來源頁明示為 CC0、CC BY，或明確寫出可用於商業／遊戲的項目。沒有把授權不明的 Freesound 搜尋結果列入可用清單。
4. 專案規格建議音效放在 `public/audio/`；以下建議檔名採用 `public/audio/` 下的相對路徑，但本次沒有建立目錄、下載檔案或修改遊戲程式。

## A. 優先採用：CC0／公共領域音效

CC0 一般不要求署名。若頁面另寫「credit appreciated」或指定作者，仍建議在 `CREDITS.md` 或遊戲說明頁保留來源，方便日後追溯。

| 編號 | 直接素材頁／作者 | 授權與下載格式 | 建議檔名 | 適用事件／關卡 | 是否需署名 |
|---|---|---|---|---|---|
| `SFX-01` | [Door Open, Door Close Set](https://lpc.opengameart.org/content/door-open-door-close-set)／qubodup | CC0；`7z` 封裝，內部檔案格式與檔名下載前核對 | `sfx_door_wood_open_close` | 宮門、殿門、搜宮開門：L01、L04、L07、L12；轉場 | 不需；頁面指定可署名 `qubodup`，建議保留 |
| `SFX-02` | [100 CC0 SFX](https://opengameart.org/content/100-cc0-sfx)／rubberduck | CC0；`ZIP`；頁面列出 bell、gong、door、paper、slam、wood 等類型 | `sfx_wood_gong_paper_bundle` | 印章落紙的木質重擊代理音、玉璽／證物取得、殿門、提示：L01、L05、L08、L12 | 不需；可署名 rubberduck |
| `SFX-03` | [Sound Effects Pack](https://opengameart.org/content/sound-effects-pack)／OwlishMedia | CC0；`ZIP`；頁面標示 WAV，包含 ambient、footsteps、paper、UI、impact | `sfx_foley_footstep_paper_ui` | 通用宮廷 Foley、腳步、紙張、UI 及環境底音：全關卡 | 不需 |
| `SFX-04` | [202 More Sound Effects](https://opengameart.org/content/202-more-sound-effects)／OwlishMedia | CC0；`ZIP`；包含開門／關門、鎖、紙張、剪刀、布料等；內部格式下載前核對 | `sfx_letter_lock_door_paper` | 家書、柬帖、解鎖與搜查：L02、L05、L07、L08、L09 | 不需 |
| `SFX-05` | [Book Flip Sounds](https://opengameart.org/content/book-flip-sounds)／Voltiment555 | CC0；`ZIP`，頁面明示 13 個 WAV 書頁翻動音 | `sfx_book_pages_flip` | 名冊、血書、脈案、經史子集、密詔翻閱：L01、L02、L06、L11 | 不需 |
| `SFX-06` | [Footsteps](https://opengameart.org/content/footsteps-0)／GboxMikeFozzy | CC0；6 個獨立 `OGG` 腳步檔 | `sfx_footsteps_stone_01` 至 `06` | 宮磚、石階、夜探書庫、雪地步行：L01、L02、L03、L11、L12 | 不需 |
| `SFX-07` | [Rain (loopable)](https://opengameart.org/content/rain-loopable)／Ylmir | CC0；`MP3` 或 `OGG`，4 個 25–45 秒可循環雨聲 | `amb_rain_loop_01` 至 `04` | 碎玉軒雨後、冷宮失敗、陰冷搜查氛圍：L02、結局 B | 不需 |
| `SFX-08` | [Ambient Bird Sounds](https://opengameart.org/content/ambient-bird-sounds)／isaiah658 | CC0；`OGG` | `amb_court_birds` | 御花園、宮苑遠景、太和殿勝利結局的稀疏鳥鳴：L03、L05、結局 A | 不需；頁面說可署名但非必要 |
| `SFX-09` | [wind1](https://opengameart.org/content/wind1)／Luke.RUSTLTD | CC0；5 個 `WAV`，每個約 1 分鐘，頁面標示可循環 | `amb_palace_wind_01` 至 `05` | 宮牆、雪夜、佛堂、冷宮與過場底音：L01、L03、L08、結局 B | 不需 |
| `SFX-10` | [7 Assorted Sound Effects (Menu, Level Up)](https://opengameart.org/content/7-assorted-sound-effects-menu-level-up)／Joth | CC0；`ZIP`；頁面明示 Level Up、Transition、Menu Confirm、Menu Navigate、Menu Error／Denied | `ui_confirm_transition_denied` | 對話確認、提示、過場、選項錯誤：全關卡 | 不需；頁面建議署名 Joth，但明示非必要 |
| `SFX-11` | [UI Sound Effects (Button Clicks, User Feedback, Notifications)](https://opengameart.org/content/ui-sound-effects-button-clicks-user-feedback-notifications)／Robin Lamb | CC0；`ZIP`，提供 `OGG` 與 `WAV`；按鈕、選取、通知、勝負回饋 | `ui_button_click_select_notify` | 選項、提示按鈕、對話確認、題目提交：全關卡 | 不需 |
| `SFX-12` | [Correct Bell](https://opengameart.org/content/correct-bell)／Fupi | CC0；單一 `WAV` `bell.wav` | `ui_answer_correct_bell` | 解密答對、題辭選對、字典查對：L01、L05、L06、L08、L10、L11 | 不需 |
| `SFX-13` | [Win sound effect](https://opengameart.org/content/win-sound-effect)／Listener | CC0；頁面明示 `WAV` 與 `MP3` | `stinger_win_short` | 小關成功、取得關鍵證物、十二關通關 | 不需；作者希望收到使用通知，但不是授權條件 |
| `SFX-14` | [Chiptune SFX Pack](https://opengameart.org/content/chiptune-sfx-pack)／FrogPog | CC0；多個獨立 `WAV`，包含 `click`、`level_up`、`level_passed`、`fail`、`game_over` | `ui_fail`、`ui_level_passed`、`stinger_game_over` | 解密失敗、容止值下降、過關與遊戲結束：全關卡、結局 B | 不需 |
| `SFX-15` | [Game Over](https://opengameart.org/content/game-over-8)／Umplix | CC0；`WAV` | `stinger_defeat_cold_palace` | 容止值歸零、賜死／冷宮失敗結局 | 不需；頁面說可在 credits 稱 Umplix |
| `SFX-16` | [3 Melee sounds](https://opengameart.org/content/3-melee-sounds)／remaxim | CC0；`ZIP`；一般近戰、劍擊、動物近戰三類 | `sfx_debate_strike_01` 至 `03` | 論辯「攻防」的抽象化擊打、華妃施壓、終局攻防：L04、L12 | 不需 |
| `SFX-17` | [20 Sword Sound Effects (Attacks and Clashes)](https://opengameart.org/content/20-sword-sound-effects-attacks-and-clashes)／StarNinjas | CC0；`ZIP`，10 個 attack 與 10 個 clash／block | `sfx_rhetoric_clash_01` 至 `20` | 不建議當真實刀劍戰；可低音量作為「論辯交鋒／防守成功」：L03、L04、L12 | 不需；作者說署名 appreciated |
| `SFX-18` | [Fast fight / battle music](https://opengameart.org/content/fast-fight-battle-music)／Ville Nousiainen／Xythe／mutkanto | CC0；`WAV` 與 `OGG` | `music_final_debate_battle` | 養心殿三階段論辯、倒數壓力：L12 | 不需；頁面建議可署名作者 |
| `SFX-19` | [Level up, power up, Coin get (13 Sounds)](https://opengameart.org/content/level-up-power-up-coin-get-13-sounds)／wobbleboxx | CC0；`ZIP`；level up、power up、get、check、click、ding 等 13 音 | `ui_clue_get_levelup` | 線索取得、品階提升、獎勵與學習卡解鎖：全關卡 | 不需；可署名 `WobbleBoxx Workshop` |
| `SFX-20` | [Completion sound.](https://opengameart.org/content/completion-sound)／Brandon Morris（頁面由 HaelDB 提交） | CC0 選項明示；`MP3` 與 `WAV` | `ui_dialogue_continue` | 對話繼續、確認文字、解謎完成：全關卡 | CC0 不需；建議保留 Brandon Morris／HaelDB 來源 |
| `SFX-21` | [traditional stamp.wav](https://freesound.org/people/I.fekry/sounds/470710/?page=7)／I.fekry | Creative Commons 0；`WAV`，44.1 kHz、16-bit、立體聲 | `sfx_royal_seal_stamp` | 硃印落紙、玉璽蓋印、名冊驗籍、偽詔判定：L01、L05、L07、L12 | 不需；Freesound 頁面可產生 attribution text，建議保留作者頁 |
| `SFX-22` | [Rpg Sound Effect Pack](https://opengameart.org/content/rpg-sound-effect-pack)／Delta12 Studio | CC0；多個獨立 `OGG`，包含 `door.ogg`、`steps.ogg`、`cancel.ogg`、`item.ogg`、`punch.ogg` | `sfx_rpg_door_steps_cancel_item` | 輕量備用 UI、門、腳步、取消與物件取得：全關卡 | 不需 |
| `SFX-23` | [Mechanical Sounds](https://opengameart.org/content/mechanical-sounds)／BMacZero | CC0；多個 `WAV`；頁面列出 clank、rattle、squeak、mechanical | `sfx_lock_latch_rattle` | 密碼盒、書庫機關、日晷／算籌轉動：L06、L09、L10、L11 | 不需；可署名 Brian MacIntosh |
| `SFX-24` | [Pleasing Bell Sound Effect](https://opengameart.org/content/pleasing-bell-sound-effect)／Spring Spring／Julie Damsgaard | CC0；`WAV` | `ui_palace_bell_soft` | 佛堂、太后懿旨、對話確認與安定提示：L08、L10 | 不需；頁面提供作者與製作單位，建議列入 credits |
| `SFX-25` | [Swish - bamboo stick weapon swhoshes](https://opengameart.org/content/swish-bamboo-stick-weapon-swhoshes)／qubodup | CC0；`7z`，內部格式下載前核對 | `sfx_debate_swish_01` 至 `n` | 論辯出招、修辭連擊、偽詔反制的抽象轉身／揮袖感：L03、L04、L12 | 不需；頁面標示署名可選 |

## B. 可採用但必須署名：CC BY

以下素材的授權頁面允許改作與商業使用，但不能省略署名。若遊戲將音檔重新剪輯、混音或轉檔，仍應保留原作者與授權連結。

| 編號 | 直接素材頁／作者 | 授權與下載格式 | 建議檔名 | 適用事件／關卡 | 署名做法 |
|---|---|---|---|---|---|
| `SFX-BY-01` | [Nature Sounds Pack](https://opengameart.org/content/nature-sounds-pack)／Antoinemax | CC BY 4.0；`7z`；5 ambient、6 foliage、9 footsteps、3 stream | `amb_palace_garden_nature` | 御花園、碎玉軒、佛堂與宮苑環境：L02、L03、L08、L10 | `Nature Sounds Pack — Antoinemax, CC BY 4.0, https://opengameart.org/content/nature-sounds-pack` |
| `SFX-BY-02` | [Spell Scroll](https://lpc.opengameart.org/content/spell-scroll)／spookymodem | CC BY 3.0；`WAV` `Unrolling Parchment.wav` | `sfx_scroll_unroll_parchment` | 卷軸展開、血書、密詔與古籍證物：L02、L06、L11、L12 | `Spell Scroll — spookymodem, CC BY 3.0, https://lpc.opengameart.org/content/spell-scroll` |
| `SFX-BY-03` | [Page Turning Sfx Sound Effect](https://opengameart.org/content/page-turning-sfx-sound-effect)／Nicole Marie T | CC BY 4.0；`WAV` `Page Turning Sfx.wav` | `sfx_page_turn_nicole` | 需要比 Book Flip 更乾淨的單頁翻動時：L01、L06、L07、L11 | `Page Turning Sfx — Nicole Marie T, CC BY 4.0, https://opengameart.org/content/page-turning-sfx-sound-effect` |
| `SFX-BY-04` | [Bell Sounds](https://opengameart.org/content/bell-sounds)／marcelofg55 | CC BY 3.0；`MP3` | `sfx_palace_bell_ccby` | 宮門報時、佛堂儀式、勝利結局的遠鐘：L01、L08、結局 A | `Bell Sounds — Marcelo Fernandez, CC BY 3.0, https://opengameart.org/content/bell-sounds` |

## C. 十二關與結局配置建議

這一表是「事件到素材」的第一版配對，不代表每關要同時播放所有音效。每個事件建議只保留一個主音，環境音另以低音量循環層處理。

| 關卡／結局 | 特色音效建議 | 主要來源編號 | 備註 |
|---|---|---|---|
| L01 神武門／初選入宮 | 宮門開啟、石磚腳步、名冊翻頁、驗籍印章、答對鈴 | `SFX-01`、`SFX-05`、`SFX-06`、`SFX-21`、`SFX-12` | 開場不要先放戰鬥音；用門軸＋遠風建立威嚴感 |
| L02 碎玉軒／斷句破案 | 雨循環、桂樹／葉聲、挖掘木土重擊、血書翻頁、解密失敗 | `SFX-07`、`SFX-BY-01`、`SFX-02`、`SFX-05`、`SFX-14` | 雨聲應低於文字閱讀音，避免遮住題目 |
| L03 倚梅園／修辭機鋒 | 雪夜風、稀疏鳥／庭園底音、修辭連擊揮袖、確認鈴 | `SFX-09`、`SFX-08`、`SFX-25`、`SFX-11` | `SFX-25` 只作抽象語勢，不要讓場景變成武打戲 |
| L04 翊坤宮／語法格擋 | 宮殿門、低沉攻防、錯誤否定、正確格擋 | `SFX-01`、`SFX-16`、`SFX-10`、`SFX-17` | 錯誤音需短，不要使用誇張爆炸音 |
| L05 景仁宮／題辭博弈 | 大殿遠鐘、匾額／木件輕放、印章、對話確認 | `SFX-BY-04`、`SFX-02`、`SFX-21`、`SFX-20` | CC BY 遠鐘要進 credits；匾額「落位」可用木質輕擊取代金屬音 |
| L06 太醫院／字典檢索 | 抽屜／鎖扣、藥櫃紙張、急促倒數、查對提示 | `SFX-23`、`SFX-05`、`SFX-10`、`SFX-12` | 不建議加入醫療或玻璃破裂音，以免誤導場景 |
| L07 儲秀宮／書信審查 | 搜查開門、信紙／信封、印章／證物、失敗提示 | `SFX-01`、`SFX-04`、`SFX-21`、`SFX-14` | 以紙張與鎖扣表達搜查壓力，保持適齡尺度 |
| L08 暢春園佛堂／柬帖校驗 | 佛堂遠鐘、風／鳥、柬帖翻頁、安定確認 | `SFX-24`、`SFX-09`、`SFX-BY-01`、`SFX-05`、`SFX-20` | 低頻與混響不要過重，避免把教育提示做成恐怖音效 |
| L09 延禧宮偏殿／年齡密碼 | 香盒／機關輕響、紙卡、密碼錯誤、解鎖成功 | `SFX-23`、`SFX-04`、`SFX-14`、`SFX-19` | 可將 `sfx_lock_latch_rattle` 剪成短起音使用 |
| L10 文華殿／干支歲時 | 日晷／機械轉動、報時鐘、紙頁、校正成功 | `SFX-23`、`SFX-BY-04`、`SFX-05`、`SFX-12` | 先試聽機械音，過於現代的齒輪聲列為不採用 |
| L11 文淵閣／四庫實錄 | 書庫風、腳步、書匣／紙張、卷軸展開、密詔取得 | `SFX-09`、`SFX-06`、`SFX-05`、`SFX-BY-02`、`SFX-19` | 以腳步與紙張承擔探索感，不需加入怪物或武器音 |
| L12 養心殿／終極論辯 | 三段式戰鬥底音、揮袖／交鋒、偽詔卷軸、玉璽印章、勝利／失敗 | `SFX-18`、`SFX-25`、`SFX-BY-02`、`SFX-21`、`SFX-13`／`SFX-15` | 這裡才使用較明顯的 battle layer；文字與選項仍應優先 |
| 結局 A／太和殿前勝利 | 勝利短音、遠鐘、鳥鳴、低量風聲 | `SFX-13`、`SFX-BY-04`、`SFX-08`、`SFX-09` | 勝利音短於 3 秒較不打斷結局文字 |
| 結局 B／冷宮失敗 | 遊戲結束、雨、風、低量門聲 | `SFX-15`、`SFX-07`、`SFX-09`、`SFX-01` | 失敗音不要與容止值歸零提示同時重疊 |

## D. 建議的檔案與授權管理方式

可在素材真正獲准整合後使用以下結構；本次只提出命名，不建立檔案：

```text
public/audio/
  ambience/
    amb_palace_wind_01.wav
    amb_rain_loop_01.ogg
    amb_court_birds.ogg
  sfx/
    sfx_door_wood_open_close_01.ogg
    sfx_royal_seal_stamp.wav
    sfx_scroll_unroll_parchment.wav
    sfx_debate_swish_01.ogg
  ui/
    ui_button_click_01.wav
    ui_answer_correct_bell.wav
    ui_fail.wav
    ui_dialogue_continue.wav
  stingers/
    stinger_win_short.wav
    stinger_defeat_cold_palace.wav
```

建議另建一份 `public/audio/CREDITS.md`，每一筆至少保存：素材檔名、原始頁面 URL、作者、授權、下載日期、是否經過剪輯／混音。CC BY 素材不可只寫「OpenGameArt」而不寫作者；CC0 素材也建議保留來源，方便未來換檔或重新打包。

## E. 待核實與排除規則

以下不是「已核准可用」，而是整合前必做的最後檢查：

- OpenGameArt 的大型 `ZIP`／`7z` 包，頁面有時只顯示封裝格式；實際採用前要確認壓縮檔內的檔名、單檔格式、聲道、取樣率，以及是否和頁面列出的素材類型一致。
- [Kenney Interface Sounds](https://kenney.nl/assets/interface-sounds) 頁面明示 Creative Commons CC0 且有 100 個檔案，但本次未把它列入 A 表，因為沒有下載，尚未核對封裝內檔名與格式。若要使用，先作為「待核實候選」，不要直接寫入正式 credits。
- OpenGameArt 的「CC0 Sound Effects」等 collection 頁面是收集頁，不等於其中每個子素材都具有同一授權。必須點進子素材頁逐筆確認，不能只引用 collection 頁面。
- Freesound 只有在單一音效頁面清楚顯示作者、Creative Commons 授權與格式時，才可進入候選；搜尋結果頁、作者首頁或只有「free」字樣的素材不列入。
- `SFX-BY-01` 至 `SFX-BY-04` 雖然授權清楚，但整合前仍要把署名文字與原始 URL 一起保存；若專案只想維持零署名流程，改用 A 表的 CC0 替代項目。
- 本清單沒有把任何 AI 生成音效、影視原聲、YouTube 下載音訊或授權條件不完整的「免費音效庫」列為可用來源。

## F. 下一步驗證順序

1. 主 Agent 先挑每類一個最小候選：`SFX-01`、`SFX-05`、`SFX-06`、`SFX-10`、`SFX-12`、`SFX-21`、`SFX-13`、`SFX-15`。
2. 由人工下載後檢查實際檔名、格式與音質；本研究階段沒有代為下載。
3. 先在 L01 神武門垂直切片試聽：開門 → 腳步 → 翻頁 → 印章 → 答對／失敗 → 對話確認。
4. 試聽確認後才建立 `public/audio/` 與 `CREDITS.md`，再把音效索引接到各關卡資料；不要在未完成授權紀錄前把來源檔名寫死在遊戲程式裡。
