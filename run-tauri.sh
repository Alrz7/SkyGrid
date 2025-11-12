#!/bin/bash
# Fix blurry / low-DPI rendering on Linux Wayland
export WEBKIT_DISABLE_DMABUF_RENDERER=1
export WEBKIT_DISABLE_COMPOSITING_MODE=1

# Dev
if [ "$1" = "dev" ]; then
    npm run tauri dev
# Build
elif [ "$1" = "build" ]; then
    npm run tauri build
else
    echo "Usage: ./run-tauri.sh [dev|build]"
fi
