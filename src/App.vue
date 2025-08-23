<script setup lang="ts">
import AppNav from './components/AppNav.vue'
import getUsableAdminLinks from './router/navlinks'
const { links, keys } = getUsableAdminLinks()
</script>

<template>
  <div class="flex h-screen w-screen">
    <aside class="bg-[#000000] w-[298px] fixed top-0 left-0 h-screen">
      <AppNav :links="links" :navLinks="keys" />
    </aside>
    <main class="ml-[298px] overflow-y-auto flex-1">
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
