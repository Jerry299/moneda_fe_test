<script setup lang="ts">
import AppNav from './components/AppNav.vue'
import getUsableAdminLinks from './router/navlinks'
const { links, keys } = getUsableAdminLinks()
</script>

<template>
  <div
    class="block md:hidden fixed inset-0 bg-white flex flex-col justify-center items-center p-4 z-50"
  >
    <h1 class="text-xl font-bold mb-2 text-center">
      This page is not available on mobile devices.
    </h1>
    <p class="text-center text-gray-600 max-w-xs">
      Please visit this page from a laptop or desktop device for full functionality.
    </p>
  </div>
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
