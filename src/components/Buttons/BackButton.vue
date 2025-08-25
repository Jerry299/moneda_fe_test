<script setup lang="ts">
import BackArrow from '../svgs/BackArrow.vue'
</script>

<template>
  <div>
    <RouterLink
      to="/admin/dasboard"
      class="flex cursor-pointer justify-between items-center w-[4%]"
    >
      <BackArrow />
      <span class="text-[#CC5500] text-sm font-medium">BACK</span>
    </RouterLink>
  </div>
</template>
