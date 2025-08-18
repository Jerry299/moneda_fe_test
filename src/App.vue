<script setup lang="ts">
import AppNav from './components/AppNav.vue'
import { reactive } from 'vue'
import getUsableAdminLinks from './router/navlinks'
const { links, keys } = getUsableAdminLinks()
console.log(' the links are :: ', links)
console.log(' the keys are ::: ', keys)
</script>

<template>
  <div class="flex h-screen w-screen">
    <aside class="bg-[#000000] w-[298px]">
      <AppNav :links="links" :navLinks="keys" />
    </aside>
    <main class="w-full">
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
