import { invoke } from '@tauri-apps/api/tauri';
import getFileMetadata from './getFileMetadata';

export default async (folderPath: string, finalArray: any, filePath: string): Promise<void> => {
  const results = await getFileMetadata(filePath, folderPath);

  finalArray.rawData.push(results);

  finalArray.total.size += results.size;
  finalArray.files.total++;

  // update file extensions
  finalArray.files.extensions[results.extension] = finalArray.files.extensions[results.extension]
    ? finalArray.files.extensions[results.extension] + 1
    : 1;

  // update file types
  finalArray.files.types[results.type] = finalArray.files.types[results.type]
    ? finalArray.files.types[results.type] + 1
    : 1;

  // check for first and last file
  if (results.created < finalArray.files.first.date) {
    finalArray.files.first.date = results.created;
    finalArray.files.first.path = results.path;
  }
  if (results.created > finalArray.files.last.date) {
    finalArray.files.last.date = results.created;
    finalArray.files.last.path = results.path;
  }

  // check for largest file
  if (results.size > finalArray.files.largest.size) {
    finalArray.files.largest.size = results.size;
    finalArray.files.largest.path = results.path;
  }

  // // // check for specific file types
  // images
  if (results.type === 'image') {
    finalArray.files.specifics.images.count++;

    const resolution = (await invoke('get_image_info', { imagePath: filePath })) as any;
    console.log(resolution);

    // check for largest image
    if (
      resolution[0] * resolution[1] >
      finalArray.files.specifics.images.largest.resolution[0] *
        finalArray.files.specifics.images.largest.resolution[1]
    ) {
      finalArray.files.specifics.images.largest.resolution = resolution;
      finalArray.files.specifics.images.largest.path = results.path;
    }

    // check for smallest image
    if (
      resolution[0] * resolution[1] <
      finalArray.files.specifics.images.smallest.resolution[0] *
        finalArray.files.specifics.images.smallest.resolution[1]
    ) {
      finalArray.files.specifics.images.smallest.resolution = resolution;
      finalArray.files.specifics.images.smallest.path = results.path;
    }
  }

  // videos
  if (results.type === 'video') {
    finalArray.files.specifics.videos.count++;
  }

  // audio
  if (results.type === 'audio') {
    finalArray.files.specifics.audio.count++;
  }

  // text
  if (results.type === 'text') {
    finalArray.files.specifics.text.count++;
  }

  // code
  if (results.type === 'code') {
    finalArray.files.specifics.code.count++;
  }

  return;
};
