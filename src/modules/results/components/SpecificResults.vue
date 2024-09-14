<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  typeData?: any;
}>();
const selectedType = ref<string>('Images');
</script>

<template>
  <div class="tw_flex tw_gap-6">
    <div class="tw_w-1/5 tw_min-w-[20%] tw_flex tw_flex-col tw_gap-2">
      <div
        v-for="(type, i) in [
          typeData.text.count > 0 ? { label: 'Text', icon: 'sym_o_edit_note' } : null,
          typeData.images.count > 0 ? { label: 'Images', icon: 'sym_o_image' } : null,
          typeData.videos.count > 0 ? { label: 'Videos', icon: 'sym_o_live_tv' } : null,
          typeData.audio.count > 0 ? { label: 'Audio', icon: 'sym_o_headphones' } : null,
        ]"
        :key="i"
        :class="{ tw_hidden: !type }"
      >
        <q-btn
          v-if="type"
          flat
          no-caps
          align="left"
          class="tw_text-gray-400 tw_w-full"
          :class="{ '!tw_text-gray-700 tw_bg-gray-200': selectedType === type.label }"
          @click="selectedType = type.label"
        >
          <q-icon :name="type.icon" size="20px" class="tw_mr-2" />
          {{ type.label }}
        </q-btn>
      </div>
    </div>
    <div class="w-4/5 tw_p-2">
      <div v-if="selectedType === 'Text'" class="tw_flex tw_gap-6 tw_flex-wrap">
        <pre>{{ typeData.text }}</pre>
        <div
          v-for="(entry, i) in [
            {
              label: 'File Count',
              value: 0,
            },
            {
              label: 'Total Line Count',
              value: 0,
            },
            {
              label: 'Total Character Count',
              value: 0,
            },
          ]"
          :key="i"
          class="tw_w-[30%]"
        >
          <p class="tw_text-sm tw_leading-tight tw_text-gray-500">{{ entry.label }}</p>
          <p class="tw_text-base tw_font-bold tw_leading-tight">{{ entry.value }}</p>
        </div>
      </div>
      <div v-if="selectedType === 'Images'" class="tw_flex tw_gap-6 tw_flex-wrap">
        <pre>{{ typeData.images }}</pre>
      </div>
      <div v-if="selectedType === 'Videos'" class="tw_flex tw_gap-6 tw_flex-wrap">
        <pre>{{ typeData.videos }}</pre>
      </div>
      <div v-if="selectedType === 'Audio'" class="tw_flex tw_gap-6 tw_flex-wrap">
        <pre>{{ typeData.audio }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
