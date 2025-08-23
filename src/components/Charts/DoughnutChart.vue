<script setup lang="ts">
import { ref, defineProps, watch } from 'vue'
import Chart from 'primevue/chart'

const props = defineProps<{
  label: any
  value: any
}>()

const chartData = ref({
  labels: props.label,
  datasets: [
    {
      data: props.value,
      backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
      hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D'],
    },
  ],
})

const chartOptions = ref({
  cutout: '60%',
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
})

watch(
  () => [props.label, props.value],
  ([newLabels, newValues]) => {
    chartData.value.labels = newLabels
    chartData.value.datasets[0].data = newValues
  },
)
</script>

<template>
  <div class="flex flex-col pl-3 w-[27%] border border-[#D1D1D1] rounded-lg pt-5 pb-5 items-center">
    <p class="text-lg font-medium text-left">Transaction by product</p>
    <Chart type="doughnut" :data="chartData" :options="chartOptions" class="h-[300px] pt-7" />
  </div>
</template>
