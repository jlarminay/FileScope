use std::fs;
use std::path::{Path, PathBuf};
use std::io;

#[tauri::command]
pub fn get_files(folder_path: &str) -> Result<Vec<String>, String> {
    let folder_path = Path::new(folder_path);
    let mut files = Vec::new();

    // Collect all file paths recursively
    collect_files(folder_path, &mut files)
        .map_err(|e| format!("Error collecting files: {}", e))?;

    // Return a Vec<String> of file paths with forward slashes
    let file_paths: Vec<String> = files
        .into_iter()
        .map(|path| path.to_string_lossy().replace("\\", "/"))  // Convert backslashes to forward slashes
        .collect();

    Ok(file_paths)
}

// Helper function to recursively collect all file paths
fn collect_files(folder_path: &Path, files: &mut Vec<PathBuf>) -> io::Result<()> {
    for entry in fs::read_dir(folder_path)? {
        let entry = entry?;
        let path = entry.path();
        
        if path.is_dir() {
            collect_files(&path, files)?;
        } else {
            files.push(path);
        }
    }
    Ok(())
}
