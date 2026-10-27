# 《紫禁深宮·語文策》音效資產

本目錄只收錄已在 OpenGameArt 個別素材頁明示為 CC0 的檔案。下載日期：2026-10-27。專案保留作者與來源頁，方便追溯；CC0 不要求署名。

## 資產清單

| 檔案 | 用途 | 來源頁 | 直接下載 URL | 作者 | 授權 | 署名需求 |
|---|---|---|---|---|---|---|
| `bgm/final-debate.ogg` | 第 12 關進入時的低音量論辯背景 | [Fast fight / battle music](https://opengameart.org/content/fast-fight-battle-music) | `https://opengameart.org/sites/default/files/fight.ogg` | Ville Nousiainen / Xythe / mutkanto | CC0 | 不需；來源頁建議可署名作者 |
| `ambient/palace-wind.wav` | 地圖或過場進入後的低音量風聲循環 | [wind1](https://opengameart.org/content/wind1) | `https://opengameart.org/sites/default/files/wind1.wav` | Luke.RUSTLTD | CC0 | 不需 |
| `ui/correct-bell.wav` | 答題正確 | [Correct Bell](https://opengameart.org/content/correct-bell) | `https://opengameart.org/sites/default/files/bell.wav` | Fupi | CC0 | 不需 |
| `ui/choice-click.wav` | 題目選項與提示按鈕的輕點擊 | [Chiptune SFX Pack](https://opengameart.org/content/chiptune-sfx-pack) | `https://opengameart.org/sites/default/files/click_2.wav` | FrogPog | CC0 | 不需 |
| `dialogue/choice-confirm.mp3` | 對話選擇確認 | [Completion sound.](https://opengameart.org/content/completion-sound) | `https://opengameart.org/sites/default/files/completetask_0.mp3` | Brandon Morris；HaelDB 提交 | CC0 選項明示 | 不需；保留作者與提交者作來源記錄 |
| `puzzle/clue-click.wav` | 解密線索點擊 | [Chiptune SFX Pack](https://opengameart.org/content/chiptune-sfx-pack) | `https://opengameart.org/sites/default/files/click_2_0.wav` | FrogPog | CC0 | 不需 |
| `puzzle/puzzle-complete.wav` | 三個解密線索完成 | [Chiptune SFX Pack](https://opengameart.org/content/chiptune-sfx-pack) | `https://opengameart.org/sites/default/files/level_passed.wav` | FrogPog | CC0 | 不需 |
| `success-failure/answer-wrong.wav` | 答題錯誤 | [Chiptune SFX Pack](https://opengameart.org/content/chiptune-sfx-pack) | `https://opengameart.org/sites/default/files/fail.wav` | FrogPog | CC0 | 不需 |
| `success-failure/level-complete.wav` | 關卡完成 | [Win sound effect](https://opengameart.org/content/win-sound-effect) | `https://opengameart.org/sites/default/files/Win%20sound.wav` | Listener | CC0／公共領域 | 不需；作者希望收到使用通知，但不是授權條件 |
| `success-failure/game-over.wav` | 容止值歸零的失敗結果 | [Chiptune SFX Pack](https://opengameart.org/content/chiptune-sfx-pack) | `https://opengameart.org/sites/default/files/game_over_0.wav` | FrogPog | CC0 | 不需 |
| `levels/door.ogg` | 總地圖進入 | [Rpg Sound Effect Pack](https://opengameart.org/content/rpg-sound-effect-pack) | `https://opengameart.org/sites/default/files/door_1.ogg` | Delta12 Studio | CC0 | 不需 |
| `levels/palace-bell.wav` | 關卡進入過場 | [Pleasing Bell Sound Effect](https://opengameart.org/content/pleasing-bell-sound-effect) | `https://opengameart.org/sites/default/files/pleasing-bell.wav` | Spring Spring／Julie Damsgaard | CC0 | 不需；頁面另列製作來源 Spring Enterprises |

## 使用規則

- `src/audio.js` 是唯一的音效索引；本機預覽與靜態部署使用 `/public/audio/...` 路徑對應本表檔案。
- 播放只由玩家點擊事件觸發；初次載入不播放任何音效。
- 音效開關狀態保存在瀏覽器的 `localStorage`；瀏覽器拒絕播放時只顯示提示，遊戲流程仍可繼續。
- 本批未使用報告中的 CC BY 素材，因此不新增 CC BY 署名義務。
