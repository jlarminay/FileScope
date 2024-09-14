// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod files;
mod file;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
          files::get_files, 
          file::get_file_metadata, 
          file::get_image_info
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
