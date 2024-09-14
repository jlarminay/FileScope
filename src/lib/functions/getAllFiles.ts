import { invoke } from '@tauri-apps/api/tauri';

export default async (folderPath: string, gitignore: boolean = false): Promise<string[]> => {
  const results = (await invoke('get_files', { folderPath, applyGitignore: gitignore })) as any;

  return results;
};
