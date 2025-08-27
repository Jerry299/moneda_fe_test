<script setup lang="ts">
import AppButton from '../AppButton.vue'
import DataCardGrid from '../Cards/DataCardGrid.vue'
import TopSuppliersCard from '../Cards/TopSuppliersCard.vue'
import AddIcon from '../svgs/AddIcon.vue'
import { VueSpinnerBall } from 'vue3-spinners'

import { onMounted, reactive } from 'vue'
import type { DashboardDataProps, SupplierProps } from '@/utils/typings'
import { getDashBoardData } from '@/services/httpServices'
import DoughnutChart from '../Charts/DoughnutChart.vue'
import Blocks from '../Cards/Blocks.vue'

const state = reactive<{
  data: DashboardDataProps
  isLoading: boolean
  error: string
  soc_data: any
  chartLabel: any
  chartCount: any
  awardingCompany: any[]
}>({
  data: {
    total_transaction: '0',
    transaction_value: '0',
    transaction_cost: '0',
    avg_completed_date: '0',
    total_disbursement: '0',
    gross_profitability: '0',
    avg_execution_time: '0',
  },
  isLoading: false,
  error: '',
  soc_data: null,
  chartLabel: null,
  chartCount: null,
  awardingCompany: [],
})

const fetchData = async () => {
  state.isLoading = true
  try {
    const response = await getDashBoardData()
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const result = response?.data?.data
    const { transaction_type_summary, awarding_company_summary, soc_summary, ...otherProps } =
      result

    state.data = otherProps
    state.soc_data = soc_summary
    const formattedChartLabel = transaction_type_summary.map((item: any) => {
      return item?.transaction_type
    })
    const formattedChartValue = transaction_type_summary.map((item: any) => {
      return item?.count
    })
    state.chartLabel = formattedChartLabel
    state.chartCount = formattedChartValue
    state.awardingCompany = awarding_company_summary
  } catch (err: any) {
    state.error = err
    console.error('Fetch error:', err)
  } finally {
    state.isLoading = false
  }
}

onMounted(async () => {
  await fetchData()
})
</script>
<template>
  <div class="border-t-1 border-gray-300 pr-[4.5rem] pl-[4.5rem] pt-[3.5rem] fade-in">
    <div class="w-full flex justify-between mb-12">
      <div class="text-[32px] font-semibold">Dashboard</div>
      <div class="pr-[1.2rem]">
        <RouterLink to="/admin/transactions">
          <AppButton
            text="New Transaction"
            size="transactions"
            variant="orange"
            width="full"
            :loading="false"
          >
            <template #icon-left>
              <AddIcon />
            </template>
          </AppButton>
        </RouterLink>
      </div>
    </div>
    <VueSpinnerBall v-if="state.isLoading" size="40" class="flex justify-center" />
    <div v-if="!state.isLoading" class="flex gap-12 mb-12">
      <TopSuppliersCard v-if="state.data" :data="state.soc_data" />
      <DataCardGrid :info="state.data" />
    </div>

    <div v-if="!state.isLoading" class="flex gap-7 pb-10">
      <DoughnutChart :label="state.chartLabel" :value="state.chartCount" />
      <div class="w-[73%] flex flex-col gap-7">
        <p class="text-lg font-medium text-left">Transaction By Awarding Companies</p>
        <Blocks
          v-for="block in state.awardingCompany"
          :text="block.awarding_company"
          :classes="
            block.count < 3
              ? 'bg-[#B9A0FF]'
              : block.count > 4 && block.count < 10
                ? 'bg-[#FF777C]'
                : 'bg-[#760080]'
          "
        />
      </div>
    </div>
  </div>
</template>
