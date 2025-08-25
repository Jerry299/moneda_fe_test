<script setup lang="ts">
import { Tab, TabList, Tabs, TabPanels, TabPanel } from 'primevue'
import { onMounted, provide, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
const toast = useToast()

interface TablistItems {
  title: string
  content: any
  value: string
  disabled: boolean
  toogleDisabled?: () => void
}
const styles = {
  tablist: 'custom-p-tablist-tab-list',
}
const props = defineProps<{
  tabData: TablistItems[]
}>()
const currentTabIndex = ref('0')

const enableTab = (tabIndex: string) => {
  const targetTab = props.tabData.find((tab) => tab.value === tabIndex)
  if (targetTab) {
    targetTab.disabled = false
  }
  currentTabIndex.value = tabIndex
}

provide('enableTab', enableTab)

onMounted(() => {
  toast.add({
    severity: 'warn',
    summary: 'Warning',
    detail:
      'The Supplier Tab Is Disabled, Until The Awarding Company form Has Been Filled And The Next Button Is Clicked',
    life: 100000,
  })
})
</script>
<template>
  <div class="flex justify-center w-[70%]">
    <Toast />
    <Tabs :value="currentTabIndex" :lazy="true">
      <TabList>
        <Tab v-for="tab in tabData" :key="tab.title" :value="tab.value" :disabled="tab.disabled">{{
          tab.title
        }}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel v-for="(tab, index) in tabData" :key="tab.title" :value="tab.value">
          <component :is="tab.content" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<style scoped>
.custom-p-tablist-tab-list {
  height: 72px;
  width: 840px;
}
</style>
