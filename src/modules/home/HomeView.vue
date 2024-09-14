<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useScanDataStore } from '@/stores/scanData.store';

import { open } from '@tauri-apps/api/dialog';
import { exists } from '@tauri-apps/api/fs';

const scanDataStore = useScanDataStore();
const router = useRouter();
const form = ref<any>();
const showError = ref(false);

onMounted(async () => {
  scanDataStore.resetTarget();
  scanDataStore.resetResults();
  if (form.value) form.value.resetValidation();
});

async function folderSelect() {
  const result = await open({
    multiple: false,
    directory: true,
  });

  if (result) {
    showError.value = false;
    if (Array.isArray(result)) {
      scanDataStore.target.path = result[0].replace(/\\/g, '/');
    } else {
      scanDataStore.target.path = result.replace(/\\/g, '/');
    }
  }
}
async function startScan() {
  // check if path is empty
  if (!scanDataStore.target.path) {
    showError.value = true;
    return;
  }

  // check if path exists
  if (!(await exists(scanDataStore.target.path))) {
    showError.value = true;
    return;
  }

  router.push(`/scanning`);
}
</script>

<template>
  <div class="tw_min-h-screen tw_bg-gray-200 tw_p-4 tw_flex tw_justify-center tw_items-center">
    <div class="tw_border tw_rounded-lg tw_px-8 tw_py-8 tw_text-center tw_w-[600px] tw_bg-white">
      <h1 class="tw_text-2xl tw_mb-6">Start New Scan</h1>
      <q-form ref="form" class="tw_flex tw_flex-col tw_gap-0">
        <q-input
          v-model="scanDataStore.target.path"
          label="Folder Path To Scan"
          outlined
          :error="showError"
          :error-message="showError ? 'Required' : ''"
          no-error-icon
          @keyup="showError = false"
        >
          <template #append>
            <q-btn round icon="sym_o_folder" flat @click="folderSelect" />
          </template>
        </q-input>
        <div class="tw_flex tw_gap-8">
          <q-checkbox v-model="scanDataStore.target.gitignore" dense label="Use .gitignore" />
          <q-checkbox v-model="scanDataStore.target.skipGit" dense label="Skip .git folder" />
        </div>

        <q-btn label="Scan Folder" unelevated color="primary" class="tw_mt-8" @click="startScan" />
      </q-form>
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
