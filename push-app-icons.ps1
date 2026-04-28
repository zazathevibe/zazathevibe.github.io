# Run from repo root: .\push-app-icons.ps1
# Opens Explorer if PNGs missing or wrongly named.

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$RepoRoot = $PSScriptRoot
Set-Location $RepoRoot

$IconDir = Join-Path $RepoRoot "_ASSETS\app-icons"

$needed = @(
  "daily-affirmations.png",
  "dream-decoder.png",
  "impulse.png",
  "memory-recall.png",
  "tarot.png",
  "wordseek.png"
)

if (-not (Test-Path $IconDir)) {
  throw "Missing folder: $IconDir"
}

$png = @(Get-ChildItem -LiteralPath $IconDir -Filter "*.png" -File)

if (-not $png.Count) {
  Write-Host ""
  Write-Host "No PNG files in:" -ForegroundColor Yellow
  Write-Host "  $IconDir"
  Write-Host ""
  Write-Host "Add these filenames:" -ForegroundColor Cyan
  $needed | ForEach-Object { Write-Host ('  ' + $_) }
  Write-Host ""
  Write-Host "Opening folder in Explorer..."
  Start-Process explorer.exe $IconDir
  exit 1
}

$names = @($png | ForEach-Object { $_.Name })
$missing = $needed | Where-Object { $_ -notin $names }

if (@($missing).Count -gt 0) {
  Write-Host ""
  Write-Host "Naming must match exactly. Missing files:" -ForegroundColor Yellow
  $missing | ForEach-Object { Write-Host ('  ' + $_) }
  Write-Host ""
  Start-Process explorer.exe $IconDir
  exit 1
}

Write-Host "Staging PNG icons..."
git add -- '_ASSETS/app-icons/*.png'

$staged = @(git diff --cached --name-only)
$hasIcons = ($staged | Where-Object { $_ -like '*_ASSETS/app-icons/*.png' })

if (@($hasIcons).Count -eq 0) {
  Write-Host "Nothing staged. Abort." -ForegroundColor Red
  exit 1
}

git commit -m "Add app icon PNGs for landing pages"

Write-Host ""
Write-Host "Pushing to GitHub..."
git push origin main

Write-Host ""
Write-Host "Done. Verify in browser:"
Write-Host ('  https://zazathevibe.github.io/_ASSETS/app-icons/tarot.png')
