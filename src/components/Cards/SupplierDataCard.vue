<script setup lang="ts">
import { formatMoney } from '@/utils/formatMoney'
import { defineProps } from 'vue'
const props = defineProps<{
  name: string
  value_usd: string
}>()
</script>

<template>
  <div class="rounded-[27px] bg-white pt-2 pb-2 pl-2 mb-4 flex justify-between items-center pr-2">
    <span class="text-xs font-medium text-[#494949]">{{ name }}</span>
    <span class="text-base font-medium text-[#CC5500]">{{
      formatMoney(parseFloat(value_usd))
    }}</span>
  </div>
</template>
