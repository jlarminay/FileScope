<script setup lang="ts">
import { ref, computed } from 'vue';
import { formatSize } from '@/lib/functions';
import dayjs from 'dayjs';

const props = defineProps<{
  rowData: any[];
  baseUrl: string;
}>();

const search = ref('');

const cleanedRows = computed(() => {
  return props.rowData
    .map((row) => {
      return {
        ...row,
        path: row.path.replace(`${props.baseUrl}\\`, ''),
      };
    })
    .filter((row) => {
      return row.path.toLowerCase().includes(search.value.toLowerCase());
    });
});
</script>

<template>
  <div class="tw_relative">
    <div class="tw_flex tw_justify-between tw_mb-2">
      <p class="tw_text-sm tw_leading-tight tw_text-gray-500">All Files</p>
      <q-input outlined dense v-model="search" placeholder="Search..." />
    </div>
    <q-table
      flat
      virtual-scroll
      :rows="cleanedRows"
      :columns="[
        { name: 'path', label: 'Path', align: 'left', field: 'path', sortable: true },
        { name: 'size', label: 'Size', align: 'left', field: 'size', sortable: true },
        { name: 'created', label: 'Created', align: 'left', field: 'created', sortable: true },
        {
          name: 'extension',
          label: 'Extension',
          align: 'left',
          field: 'extension',
          sortable: true,
        },
      ]"
      :rows-per-page-options="[0]"
      class="tw_h-[80vh]"
    >
      <template #body-cell-path="props">
        <q-td :props="props">
          {{ props.row.path }}
        </q-td>
      </template>
      <template #body-cell-size="props">
        <q-td :props="props">
          {{ formatSize(props.row.size) }}
        </q-td>
      </template>
      <template #body-cell-created="props">
        <q-td :props="props">
          {{ dayjs.unix(props.row.created).format('MMM D, YYYY') }}
        </q-td>
      </template>
      <template #body-cell-extension="props">
        <q-td :props="props">
          {{ props.row.extension || '-' }}
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style scoped lang="postcss">
:deep(.q-table) {
  thead {
    @apply tw_sticky tw_top-0 tw_bg-white tw_z-10;

    th {
      @apply tw_font-bold;
    }
  }
}

:deep(.q-input) {
  .q-field__control,
  .q-field__append {
    @apply !tw_h-[32px] !tw_min-h-[32px];
  }

  .q-field__control::before {
    @apply tw_border-gray-300 hover:tw_border-gray-500;
  }

  .q-field__native {
    @apply !tw_h-[32px] !tw_min-h-[32px] tw_text-xs tw_text-gray-500;
  }
}
</style>
