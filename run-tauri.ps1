# Fix blurry / low-DPI rendering on Linux Wayland
$env:WEBKIT_DISABLE_DMABUF_RENDERER="1"
$env:WEBKIT_DISABLE_COMPOSITING_MODE="1"

param([string]$mode="dev")

if ($mode -eq "dev") {
    npm run tauri dev
} elseif ($mode -eq "build") {
    npm run tauri build
} else {
    Write-Host "Usage: .\run-tauri.ps1 [dev|build]"
}
