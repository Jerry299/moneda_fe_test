<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  title: string
  figure: string | number
  icon: any
}>()
</script>

<template>
  <div
    class="flex border-[6px] border-[#E6E6E6] h-[145px] w-[350px] rounded-[18px] justify-center items-center gap-5 pr-6"
  >
    <div>
      <component :is="icon" />
    </div>
    <div>
      <p class="text-[#665E59] font-medium text-[16px]">{{ title }}</p>
      <p class="text-[#140800] font-medium text-[32px]">{{ figure }}</p>
    </div>
  </div>
</template>
