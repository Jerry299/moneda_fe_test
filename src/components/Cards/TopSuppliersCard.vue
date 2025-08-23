<script setup lang="ts">
import { reactive, defineProps } from 'vue'
import SupplierDataCard from './SupplierDataCard.vue'
import type { SupplierProps } from '@/utils/typings'

interface CardProps {
  data: SupplierProps[]
}
const props = defineProps<CardProps>()
console.log(props.data, ' data props here ')

// const suppliers = reactive([
//   { id: 1, itemName: 'Sahara', itemAmount: 100000 },
//   { id: 2, itemName: 'Halliburton', itemAmount: 60000 },
//   { id: 3, itemName: 'Baker Hughes', itemAmount: 7000 },
// ])
</script>

<template>
  <div
    class="bg-[linear-gradient(to_bottom,_#140800,_#7A3100)] w-[280px] h-full rounded-xl pt-7 pl-9 pr-9 pb-3 fade-in"
  >
    <div>
      <p class="text-lg font-semibold text-white mb-5">Top OEMs/Suppliers</p>
    </div>
    <SupplierDataCard
      v-for="supplier in props.data"
      :name="supplier.name"
      :value_usd="supplier.value_usd"
    />
  </div>
</template>
