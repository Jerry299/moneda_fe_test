<script setup lang="ts">
import { defineProps } from 'vue'
import NotificationIcon from './svgs/NotificationIcon.vue'
import Avatar from './svgs/Avatar.vue'

const props = defineProps({
  headerName: String,
})
</script>

<template>
  <div class="h-[66px] flex items-center justify-end pr-5 border-b">
    <div class="flex justify-between w-[10%]">
      <span><NotificationIcon /></span>
      <span><Avatar /></span>
      <span>{{ headerName }}</span>
    </div>
  </div>
</template>
