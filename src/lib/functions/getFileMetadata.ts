import { invoke } from '@tauri-apps/api/tauri';

type FileMetadata = {
  size: number;
  created: number;
  modified: number;
  extension: string;
  path: string;
  name: string;
  type: string;
};

export default async (filePath: string, folderPath: string): Promise<FileMetadata> => {
  const results = (await invoke('get_file_metadata', { filePath })) as any;

  if (
    !results.extension ||
    results.extension === null ||
    results.extension === undefined ||
    results.extension === 'undefined'
  ) {
    results.extension = '';
  }

  // find the type of the file
  results.type = findFileType(results.extension);

  return {
    ...results,
    path: filePath.replace(folderPath, ''),
    name: filePath.split('/').pop() || '',
  };
};

function findFileType(extension: string): string {
  const images = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico'];
  const videos = ['mp4', 'webm', 'ogg', 'avi', 'mov', 'flv', 'mkv'];
  const audios = ['mp3', 'wav', 'ogg', 'flac', 'aac', 'wma'];
  const documents = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
  const archives = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'];
  const executables = ['exe', 'msi', 'deb', 'rpm', 'sh', 'bat', 'ps1'];
  const code = [
    'html',
    'css',
    'js',
    'ts',
    'jsx',
    'tsx',
    'php',
    'py',
    'java',
    'c',
    'cpp',
    'h',
    'cs',
    'go',
    'rs',
  ];
  const text = ['txt', 'md', 'csv', 'json', 'yml', 'yaml', 'xml', 'log'];

  switch (true) {
    case images.includes(extension):
      return 'image';
    case videos.includes(extension):
      return 'video';
    case audios.includes(extension):
      return 'audio';
    case documents.includes(extension):
      return 'document';
    case archives.includes(extension):
      return 'archive';
    case executables.includes(extension):
      return 'executable';
    case code.includes(extension):
      return 'code';
    case text.includes(extension):
      return 'text';
    case extension === '':
      return 'none';
    default:
      return 'other';
  }
}
