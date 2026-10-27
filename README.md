# 《紫禁深宮·語文策》神武門原型

## 在瀏覽器預覽

請在專案根目錄執行 `start-preview.ps1`，再開啟：

```text
http://localhost:8000/src/index.html
```

或手動執行：

```text
& 'C:\Users\user\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m http.server 8000 --bind 127.0.0.1
```

PowerShell 指令：

```powershell
.\start-preview.ps1
```

不要直接用 `file://` 開啟，因為瀏覽器會限制 ES module 與圖片資源的載入。

## 測試

```text
node tests/game.test.js
```

第一關題目目前標記為「專案自編，待教師審查」，不代表已完成教材核定。
