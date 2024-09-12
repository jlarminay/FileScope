<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useScanDataStore } from '@/stores/scanData.store';
import { flattenDir, getFileMetadata } from '@/lib/functions';
import { useRouter } from 'vue-router';

import { readDir, exists, readTextFile } from '@tauri-apps/api/fs';

const router = useRouter();
const scanDataStore = useScanDataStore();

const preparing = ref(true);
const currentCount = ref(0);
const currentFile = ref('');

onMounted(async () => {
  const finalCounts = scanDataStore.results;
  finalCounts.scan.start = Date.now();

  let ignoreFile = '';
  if (scanDataStore.target.gitignore && (await exists(scanDataStore.target.path + '/.gitignore'))) {
    ignoreFile = await readTextFile(scanDataStore.target.path + '/.gitignore');
  }

  // get total files count
  const dir = await readDir(scanDataStore.target.path, { recursive: true });
  const flatDir = flattenDir(dir, ignoreFile, scanDataStore.target.path);
  scanDataStore.results.total.files = flatDir.length;

  // stop preparing
  preparing.value = false;

  // start scanning
  for (const file of flatDir) {
    currentFile.value = file.path.replace(scanDataStore.target.path, '');

    // if folder
    if (!file.file) {
      // do stuff for folder
      finalCounts.folders.total++;

      if (!file.children || file.children === 0) {
        finalCounts.folders.empty++;
      }
    }

    // if file
    if (file.file) {
      /*
      What do i want to know?
      - when was the file created
      - when was the file last modified
      - how big is the file
      - what is the file extension
      - check specific file types
        - images
          - what is the resolution
        - videos
          - what is the resolution
          - what is the length
        - audio
          - what is the length
        - text (txt, md, vue, js, ts, etc)
          - how many lines
          - how many words
      */
      const results = await getFileMetadata(file.path);

      finalCounts.rawData.push(results);

      finalCounts.total.size += results.size;
      finalCounts.files.total++;
      finalCounts.files.extensions[results.extension as string] = finalCounts.files.extensions[
        results.extension as string
      ]
        ? finalCounts.files.extensions[results.extension as string] + 1
        : 1;

      // check for first and last file
      if (results.created < finalCounts.files.first.date) {
        finalCounts.files.first.date = results.created;
        finalCounts.files.first.path = results.path;
      }
      if (results.created > finalCounts.files.last.date) {
        finalCounts.files.last.date = results.created;
        finalCounts.files.last.path = results.path;
      }

      // check for largest file
      if (results.size > finalCounts.files.largest.size) {
        finalCounts.files.largest.size = results.size;
        finalCounts.files.largest.path = results.path;
      }
    }

    if (scanDataStore.results.total.files < 100) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    currentCount.value++;
  }

  finalCounts.scan.end = Date.now();

  // finished analyzing
  await new Promise((resolve) => setTimeout(resolve, 500));
  currentCount.value = 0;
  currentFile.value = '';
  router.push('/results');
});

const currentPercentage = computed(() => {
  if (!scanDataStore.results.total.files || scanDataStore.results.total.files === 0) return 0;
  return currentCount.value / scanDataStore.results.total.files;
});
</script>

<template>
  <div class="tw_min-h-screen tw_bg-gray-200 tw_p-4 tw_flex tw_justify-center tw_items-center">
    <div class="tw_border tw_rounded-lg tw_px-8 tw_py-8 tw_text-center tw_w-[600px] tw_bg-white">
      <div>
        <h1 class="tw_text-2xl">
          Scanning
          <span class="tw_animate-bounce tw_inline-block" style="animation-delay: 000ms">.</span>
          <span class="tw_animate-bounce tw_inline-block" style="animation-delay: 150ms">.</span>
          <span class="tw_animate-bounce tw_inline-block" style="animation-delay: 300ms">.</span>
        </h1>
        <q-linear-progress
          stripe
          size="20px"
          animation-speed="250"
          class="tw_rounded tw_mt-4"
          :value="currentPercentage"
        />
        <div class="tw_flex tw_gap-4 tw_px-1 tw_justify-between tw_items-center">
          <p class="tw_mt-2 tw_text-sm tw_text-gray-500 tw_truncate">
            {{ currentFile }}
          </p>
          <p class="tw_mt-2 tw_text-xs tw_text-gray-500 tw_whitespace-nowrap">
            {{ currentCount }} / {{ scanDataStore.results.total.files }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
