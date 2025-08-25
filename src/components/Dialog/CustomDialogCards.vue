<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  title: string
  description: string | number
  icon: any
  value: string
  selected: boolean
}>()
const emit = defineEmits(['select'])

function onClick() {
  emit('select', props.value)
}
</script>

<template>
  <div
    :class="[
      'flex flex-col border-[1px] border-[#E6E6E6] h-[300px] w-[100%] rounded-[18px] justify-center items-center p-5 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200',
      selected
        ? 'border-4 border-black-100 scale-[1.02] shadow-lg'
        : 'border-[1px] border-[#E6E6E6]',
    ]"
    @click="onClick"
  >
    <div>
      <component :is="icon" />
    </div>
    <div class="w-[50%]">
      <p class="text-[#665E59] font-medium text-[18px] text-center pt-3 pb-4">{{ title }}</p>
      <p class="text-[#A6A6A6] font-medium text-[14px] text-center">{{ description }}</p>
    </div>
  </div>
</template>
