<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useScanDataStore } from '@/stores/scanData.store';
import { getAllFiles, analyzeFile } from '@/lib/functions';
import { useRouter } from 'vue-router';
import ignore from 'ignore';

import { exists, readTextFile } from '@tauri-apps/api/fs';

const router = useRouter();
const scanDataStore = useScanDataStore();

const currentCount = ref(0);
const currentFile = ref('');

onMounted(async () => {
  const finalCounts = scanDataStore.results;
  finalCounts.scan.start = Date.now();

  const allFiles = await getAllFiles(scanDataStore.target.path);
  scanDataStore.results.total.files = allFiles.length;

  // set ignore rules
  const ig = ignore();
  if (scanDataStore.target.gitignore) {
    // check if gitignore exists
    if (await exists(`${scanDataStore.target.path}/.gitignore`)) {
      const gitignore = await readTextFile(`${scanDataStore.target.path}/.gitignore`);
      ig.add(gitignore.toString());
    }
  }
  if (scanDataStore.target.skipGit) {
    ig.add('.git');
  }

  // start scanning
  for (const file of allFiles) {
    currentFile.value = file.replace(scanDataStore.target.path, '');

    // check if file should be skipped
    if (ig.ignores(file)) {
      finalCounts.files.skipped++;
      currentCount.value++;
      continue;
    }

    // analyze file
    await analyzeFile(scanDataStore.target.path, finalCounts, file);

    currentCount.value++;
  }

  finalCounts.scan.end = Date.now();

  // finished analyzing
  await new Promise((resolve) => setTimeout(resolve, 1000));
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
          animation-speed="100"
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
