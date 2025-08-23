<script setup lang="ts">
const props = defineProps<{
  text: string
  classes?: string
}>()
</script>

<template>
  <div :class="classes" class="w-full h-[50%] rounded-md flex justify-center">
    <p class="text-white font-semibold pt-6">{{ text }}</p>
  </div>
</template>
