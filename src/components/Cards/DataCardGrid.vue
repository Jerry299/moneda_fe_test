<script setup lang="ts">
import TotalTnxsIcon from '../svgs/TotalTnxsIcon.vue'
import TnxValueIcon from '../svgs/TnxValueIcon.vue'
import TnxsCostIcon from '../svgs/TnxsCostIcon.vue'
import DisbursementIcon from '../svgs/DisbursementIcon.vue'
import GrossProbabilityIcon from '../svgs/GrossProbabilityIcon.vue'
import AvgExecIcon from '../svgs/AvgExecIcon.vue'
import DataCard from './DataCard.vue'
import type { DashboardDataProps } from '@/utils/typings'
import { formatMoney, formatNumber } from '@/utils/formatMoney'
import { watch, ref } from 'vue'

const props = defineProps<{
  info: DashboardDataProps
}>()

interface StateProps {
  id: number
  title: string
  figure: string
  icon: any
}

const state = ref<StateProps[]>([])

function updateState(info: DashboardDataProps) {
  state.value = [
    {
      id: 1,
      title: 'Total Transactions',
      figure: info.total_transaction,
      icon: TotalTnxsIcon,
    },
    {
      id: 2,
      title: 'Transactions value',
      figure: formatMoney(parseFloat(info.transaction_value)),
      icon: TnxValueIcon,
    },
    {
      id: 3,
      title: 'Transactions costs',
      figure: formatMoney(parseFloat(info.transaction_cost)),
      icon: TnxsCostIcon,
    },
    {
      id: 4,
      title: 'Disburstments',
      figure: formatMoney(parseFloat(info.total_disbursement)),
      icon: DisbursementIcon,
    },
    {
      id: 5,
      title: 'Gross profitability',
      figure: info.gross_profitability,
      icon: GrossProbabilityIcon,
    },
    {
      id: 6,
      title: 'Avg. Execution time',
      figure: formatNumber(parseFloat(info.avg_execution_time)),
      icon: AvgExecIcon,
    },
  ]
}

updateState(props.info)

watch(
  () => props.info,
  (newInfo) => {
    updateState(newInfo)
  },
  { immediate: true },
)
</script>

<template>
  <div class="grid grid-cols-3 gap-x-[45px] gap-y-[15px]">
    <DataCard
      v-for="item in state"
      :title="item.title"
      :key="item.id"
      :figure="item.figure"
      :icon="item.icon"
    />
  </div>
</template>
