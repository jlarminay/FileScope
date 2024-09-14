<script setup lang="ts">
defineProps<{
  title: string;
  value: string;
  icon: string;
  iconColor: string;
}>();
</script>

<template>
  <div
    class="tw_bg-white tw_px-8 tw_py-6 tw_rounded-lg tw_flex tw_flex-col tw_justify-center tw_relative tw_overflow-hidden"
  >
    <p class="tw_text-sm tw_leading-tight tw_text-gray-500 tw_z-10 tw_relative">{{ title }}</p>
    <p class="tw_text-2xl tw_font-bold tw_leading-tight tw_z-10 tw_relative">{{ value }}</p>
    <q-icon
      :name="icon"
      class="tw_absolute tw_right-[-10%] tw_top-0 tw_pointer-events-none tw_z-0 tw_opacity-20"
      :class="iconColor"
      size="120px"
    />
  </div>
</template>

<style scoped lang="postcss"></style>
