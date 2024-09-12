import { invoke } from '@tauri-apps/api/tauri';

type FileMetadata = {
  size: number;
  created: number;
  modified: number;
  extension: string;
  path: string;
  name: string;
};

export default async (filePath: string): Promise<FileMetadata> => {
  const results = (await invoke('get_file_metadata', { filePath })) as any;

  if (
    !results.extension ||
    results.extension === null ||
    results.extension === undefined ||
    results.extension === 'undefined'
  ) {
    results.extension = '';
  }

  return {
    ...results,
    path: filePath,
    name: filePath.split('\\').pop() || '',
  };
};
