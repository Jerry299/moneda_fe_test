<script setup>
import { defineProps } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  links: {
    type: Object,
    required: true,
    // Each link: { to: String, text: String, icon: Component }
  },
  navLinks: {
    type: Array,
    required: true,
  },
})

const logo = `<svg width="48" height="39" viewBox="0 0 48 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.797 8.12482L23.8647 12.5396L18.8571 17.7693L18.5188 24.1537L20.0075 17.7693L42 1.46875L39.9699 8.12482L23.3233 20.8257L38.0752 10.7737L36.6541 15.9355L23.1203 25.2404L34.6241 18.1089L32.9323 22.4557L22.9173 29.2477L21.6316 36.7188L15.5414 27.8214C15.8346 24.0632 16.4075 16.5468 16.3534 16.5468C15.8662 16.4924 14.797 15.4827 14.3233 14.9846V17.226L11.4135 19.3315L11.2105 21.369C10.615 21.3147 9.8797 21.935 9.58647 22.252L7.28571 19.8069C7.69173 19.2635 7.89474 15.528 7.7594 13.6942C7.65113 12.2271 7.71429 11.4981 7.7594 11.317L6 9.55112L9.92481 10.2303L14.797 8.12482Z" fill="white"/>
</svg>
`
</script>

<template>
  <nav class="flex flex-col justify-center items-center bg-[#000000] w-[298px]">
    <div v-html="logo" class="mt-[4.5rem] mb-[5rem]"></div>
    <ul>
      <li v-for="(key, index) in navLinks" :key="index" class="w-[216px] mb-3">
        <router-link
          :to="key"
          class="flex pt-3 pb-3 pl-[24px] text-[#a1a1aa]"
          active-class="active-class"
        >
          <span class="mr-5" v-html="links[key].icon"> </span>
          <span class="text-[14px]">{{ links[key].title }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.active-class {
  color: #ffffff;
  background-color: #cc5500;
  border-radius: 5px;
}
</style>
