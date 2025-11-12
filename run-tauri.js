#!/usr/bin/env node

// 🔹 Purpose: Fix blurry or low-DPI rendering issues in Tauri apps on Linux running Wayland
//
// 🔹 Background: On Wayland with WebKitGTK (used by Tauri on Linux), transparent
//   or blurred windows can render at lower resolution or appear slightly zoomed/blurry
//   due to DMABUF and compositing issues. This does NOT affect Windows or macOS as they
//   use WebView2 and WKWebView, respectively.
//
// 🔹 Solution: Setting the following environment variables before running Tauri ensures
//   the WebKit renderer uses standard rasterization instead of DMABUF GPU-based compositing:
//     WEBKIT_DISABLE_DMABUF_RENDERER=1
//     WEBKIT_DISABLE_COMPOSITING_MODE=1
//
// 🔹 Scope: This change only affects Linux/Wayland, making dev and build consistent.
//   On other OSes, the variables are ignored harmlessly.
//
// 🔹 Note: Without these variables, users on Wayland may experience blurry text, icons,
//   and low-resolution rendering, especially when using fractional scaling.

const { spawn } = require("child_process");

const mode = process.argv[2] || "dev";

if (!["dev", "build"].includes(mode)) {
  console.error("Usage: node run-tauri.js [dev|build]");
  process.exit(1);
}

const env = { ...process.env };
env.WEBKIT_DISABLE_DMABUF_RENDERER = "1";
env.WEBKIT_DISABLE_COMPOSITING_MODE = "1";

const command = mode === "dev" ? "npm" : "npm";
const args =
  mode === "dev" ? ["run", "tauri", "dev"] : ["run", "tauri", "build"];

const child = spawn(command, args, { stdio: "inherit", env });

child.on("close", (code) => process.exit(code));
