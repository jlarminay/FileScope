<script setup lang="ts">
import { useScanDataStore } from '@/stores/scanData.store';
import dayjs from 'dayjs';
import { formatSize, formatDuration } from '@/lib/functions';
import { SummaryField, FilesTable, SystemVersion, SpecificResults } from './components';

const scanDataStore = useScanDataStore();
</script>

<template>
  <div class="tw_min-h-screen tw_bg-gray-200 tw_p-4">
    <div class="tw_flex tw_justify-between tw_items-center">
      <q-btn flat outline to="/" class="tw_mb-4 tw_text-gray-900">
        <q-icon name="sym_o_arrow_back" size="20px" class="tw_mr-1 tw_mb-0.5" />
        Run Another Scan
      </q-btn>
      <q-btn flat outline disable class="tw_mb-4 tw_text-gray-900">
        <q-icon name="sym_o_save" size="20px" class="tw_mr-1 tw_mb-0.5" />
        Save Results
      </q-btn>
    </div>

    <!-- Summary -->
    <div class="tw_flex tw_gap-4 tw_mb-4">
      <SummaryField
        title="Total Files"
        :value="scanDataStore.results.files.total.toString()"
        icon="sym_o_inventory_2"
        iconColor="tw_text-blue-500"
        class="tw_w-1/4"
      />
      <SummaryField
        title="Total Memory"
        :value="formatSize(scanDataStore.results.total.size)"
        icon="sym_o_sd_card"
        iconColor="tw_text-red-500"
        class="tw_w-1/4"
      />
      <SummaryField
        title="Different Extensions"
        :value="Object.keys(scanDataStore.results.files.extensions).length.toString()"
        icon="sym_o_imagesmode"
        iconColor="tw_text-orange-500"
        class="tw_w-1/4"
      />
      <SummaryField
        title="Skipped Files"
        :value="scanDataStore.results.files.skipped.toString()"
        icon="sym_o_fast_forward"
        iconColor="tw_text-green-500"
        class="tw_w-1/4"
      />
    </div>

    <!-- Highlights and extensions -->
    <div class="tw_flex tw_gap-4 tw_mb-4">
      <div class="tw_bg-white tw_rounded-lg tw_p-6 tw_w-3/5">
        <div class="tw_flex tw_flex-col tw_gap-6">
          <!-- Largest File -->
          <div
            v-for="(entry, i) in [
              {
                label: 'Largest File',
                value: scanDataStore.results.files.largest.path.replace(
                  `${scanDataStore.target.path}\\`,
                  '',
                ),
                mini: formatSize(scanDataStore.results.files.largest.size),
              },
              {
                label: 'First File Created',
                value: scanDataStore.results.files.first.path.replace(
                  `${scanDataStore.target.path}\\`,
                  '',
                ),
                mini: dayjs.unix(scanDataStore.results.files.first.date).format('MMM D, YYYY'),
              },
              {
                label: 'Latest File Created',
                value: scanDataStore.results.files.last.path.replace(
                  `${scanDataStore.target.path}\\`,
                  '',
                ),
                mini: dayjs.unix(scanDataStore.results.files.last.date).format('MMM D, YYYY'),
              },
            ]"
            :key="i"
          >
            <p class="tw_text-sm tw_leading-tight tw_text-gray-500">{{ entry.label }}</p>
            <p class="tw_text-base tw_font-bold tw_leading-tight">
              {{ entry.value }}
              <span class="tw_font-light tw_text-gray-400 tw_text-xs tw_ml-1">
                ({{ entry.mini }})
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="tw_bg-white tw_rounded-lg tw_p-6 tw_w-2/5">
        <pre>{{ scanDataStore.results.files.types }}</pre>
      </div>
    </div>

    <div class="tw_flex tw_gap-4 tw_mb-4">
      <div class="tw_bg-white tw_rounded-lg tw_p-6 tw_w-full">
        <SpecificResults :typeData="scanDataStore.results.files.specifics" />
      </div>
    </div>

    <!-- Raw Data -->
    <div class="tw_flex tw_gap-4 tw_mb-4">
      <div class="tw_bg-white tw_rounded-lg tw_p-6 tw_w-full">
        <FilesTable :rowData="scanDataStore.results.rawData" :baseUrl="scanDataStore.target.path" />
      </div>
    </div>

    <!-- Metadata -->
    <div class="tw_flex tw_flex-grow tw_gap-4 tw_mb-4">
      <div class="tw_bg-white tw_rounded-lg tw_p-4 tw_w-2/5">
        <p class="tw_text-sm">
          Scan Started:
          <b>{{ dayjs(scanDataStore.results.scan.start).format('YYYY-MM-DD HH:mm:ss') }}</b>
        </p>
      </div>
      <div class="tw_bg-white tw_rounded-lg tw_p-4 tw_w-2/5">
        <p class="tw_text-sm">
          Scan Duration:
          <b>{{
            formatDuration(
              scanDataStore.results.scan.end - scanDataStore.results.scan.start,
              'string',
            )
          }}</b>
        </p>
      </div>
      <div class="tw_bg-white tw_rounded-lg tw_p-4 tw_w-1/5">
        <p class="tw_text-sm">Version: <SystemVersion class="tw_font-bold" /></p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
