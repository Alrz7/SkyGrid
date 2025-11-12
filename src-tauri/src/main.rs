// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::env;

fn main() {
    // Force disable problematic WebKit GPU features for Wayland
    env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");
    env::set_var("WEBKIT_DISABLE_COMPOSITING_MODE", "1");
    skygrid_lib::run()
}
