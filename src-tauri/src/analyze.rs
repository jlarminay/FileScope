use std::fs;
use std::path::Path;
use serde::Serialize;
use std::time::{SystemTime, UNIX_EPOCH};

// Define a struct for the metadata response
#[derive(Serialize)]
pub struct FileMetadata {
    created: Option<u64>,
    modified: Option<u64>,
    size: Option<u64>,
    extension: Option<String>,
}

#[tauri::command]
pub fn get_file_metadata(file_path: String) -> Result<FileMetadata, String> {
    let path = Path::new(&file_path);

    // Check if the file exists
    if !path.exists() {
        return Err(format!("File does not exist: {}", file_path));
    }

    // Get the file metadata
    match fs::metadata(&path) {
        Ok(metadata) => {
            let created = metadata.created()
                .ok()
                .and_then(|time| system_time_to_number(time).ok());
                
            let modified = metadata.modified()
                .ok()
                .and_then(|time| system_time_to_number(time).ok());
            
            let size = Some(metadata.len());
            let extension = path.extension().and_then(|ext| ext.to_str()).map(|s| s.to_string());

            Ok(FileMetadata {
                created,
                modified,
                size,
                extension,
            })
        }
        Err(err) => Err(format!("Error retrieving metadata: {}", err)),
    }
}

// Helper function to convert SystemTime to Number
fn system_time_to_number(system_time: SystemTime) -> Result<u64, String> {
    system_time.duration_since(UNIX_EPOCH)
        .map(|duration| duration.as_secs())
        .map_err(|err| format!("Error converting system time: {:?}", err))
}
