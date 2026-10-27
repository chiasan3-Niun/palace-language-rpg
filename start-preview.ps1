$python = 'C:\Users\user\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

if (-not (Test-Path -LiteralPath $python)) {
  Write-Error "找不到 Codex 內建 Python：$python"
  exit 1
}

Set-Location -LiteralPath $root
Write-Host '預覽伺服器已啟動：http://127.0.0.1:8000/src/index.html'
Write-Host '按 Ctrl+C 可停止伺服器。'
& $python -m http.server 8000 --bind 127.0.0.1
