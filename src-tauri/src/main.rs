// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod analyze;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![analyze::get_file_metadata])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
