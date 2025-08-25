<script setup lang="ts">
import BackButton from '@/components/Buttons/BackButton.vue'
import CustomTabs from '@/components/CustomTabs/CustomTabs.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
import AwardingCompany from '@/components/Wrappers/AwardingCompany.vue'
import SuppliersForm from '@/components/Wrappers/SuppliersForm.vue'

const dataFromTab = [
  {
    title: 'Awarding Company',
    content: AwardingCompany,
    value: '0',
    disabled: false,
  },
  {
    title: 'Suppliers',
    content: SuppliersForm,
    value: '1',
    disabled: true,
  },
]
</script>

<template>
  <div>
    <DashboardHeader headerName="Planets Oil" />
    <div class="border-t-1 border-gray-300 pr-[4.5rem] pl-[4.5rem] pt-[3.5rem] fade-in">
      <BackButton />
      <p class="font-semibold text-4xl pt-8">New Procurement Transaction</p>
      <div class="w-full flex justify-center pt-12">
        <CustomTabs :tabData="dataFromTab" />
      </div>
    </div>
  </div>
</template>
