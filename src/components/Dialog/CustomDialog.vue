<script setup lang="ts">
import Dialog from 'primevue/dialog'
import { defineProps, ref, watch } from 'vue'
import CommoditiesCard from '../svgs/CommoditiesCard.vue'
import ProcurementIcon from '../svgs/ProcurementIcon.vue'
import ServicesIcon from '../svgs/ServicesIcon.vue'
import CustomDialogCards from './CustomDialogCards.vue'
import AppButton from '../AppButton.vue'
import { useTransactionData } from '@/stores/transactionData'

const store = useTransactionData()
const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['update:visible'])

const cardList = [
  {
    title: 'Commodities',
    description: 'Support to traders of essential commodities in the energy industry.',
    icon: CommoditiesCard,
    value: 'commodities',
  },
  {
    title: 'Procurement',
    description: 'Supply of equipments with funding and execution capacity.',
    icon: ProcurementIcon,
    value: 'procurement',
  },
  {
    title: 'Services',
    description: 'Support operation, installation and maintenance contracts.',
    icon: ServicesIcon,
    value: 'services',
  },
]

const selectedCard = ref<string | null>(null)

function selectCard(value: string) {
  selectedCard.value = value
  store.setTransactionType(value)
}

function onNextClick() {
  emit('update:visible', false)
}
watch(
  () => props.visible,
  (newVal) => {
    if (!newVal) {
      selectedCard.value = null
    }
  },
)
</script>

<template>
  <Dialog :visible="visible" modal header="" :style="{ width: '70rem', height: 'auto' }">
    <template #header>
      <div></div>
    </template>
    <div class="flex justify-center items-center flex-col p-9">
      <p class="text-2xl font-medium w-[50%] text-center mb-7">
        Our products were made just for you, select an option below to get started.
      </p>
      <div class="flex gap-6 pt-7">
        <CustomDialogCards
          v-for="cardData in cardList"
          :title="cardData.title"
          :description="cardData.description"
          :icon="cardData.icon"
          :value="cardData.value"
          :key="cardData.value"
          :selected="cardData.value === selectedCard"
          @select="selectCard"
        />
      </div>
      <div class="pt-8">
        <AppButton
          text="Next"
          :loading="false"
          variant="orange"
          size="large"
          :disabled="!selectedCard"
          @click="onNextClick"
        />
      </div>
    </div>
  </Dialog>
</template>
