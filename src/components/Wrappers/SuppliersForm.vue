<script setup lang="ts">
import { Form } from '@primevue/forms'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import FileUpload from 'primevue/fileupload'
import UploadIcon from '../svgs/UploadIcon.vue'
import AppButton from '../AppButton.vue'

const currency = [
  { name: 'USD', value: 'usd' },
  { name: 'NGN', value: 'ngn' },
  { name: 'GBP', value: 'gbp' },
  { name: 'EUR', value: 'eur' },
]

const paymentTypes = [
  { name: 'Milestone Payment', value: 'milestone_payment' },
  { name: 'Upfront Payment', value: 'upfront_payment' },
  { name: 'Deferred Payment', value: 'deferred_payment' },
]

const basisOfSelection = [
  { name: "Contractor's Choice", value: "Contractor's Choice" },
  { name: 'Awarding Company’s Choice', value: 'Awarding Company’s Choice' },
]
const countries = [
  { name: 'Nigeria', value: 'Nigeria' },
  { name: 'Ghana', value: 'Ghana' },
  { name: 'South Africa', value: 'South_africa' },
  { name: 'Chile', value: 'Chile' },
  { name: 'Finland', value: 'Finland' },
  { name: 'Iran', value: 'Iran' },
]

const continents = [
  { name: 'Africa', value: 'Africa' },
  { name: 'Asia', value: 'Asia' },
  { name: 'Europe', value: 'Europe' },
]
const incoterms = [
  { name: 'Ex-works', value: 'ex-works' },
  { name: 'FCA', value: 'fca' },
  { name: 'CPT', value: 'cpt' },
  { name: 'DAT', value: 'dat' },
  { name: 'FAS', value: 'fas' },
  { name: 'FOB', value: 'fob' },
  { name: 'CFR', value: 'cfr' },
  { name: 'CIP', value: 'cip' },
  { name: 'CIF', value: 'cif' },
  { name: 'DAP', value: 'dap' },
  { name: 'DDP', value: 'ddp' },
]

const procurementType = [
  { name: 'Off-the-shelf', value: 'off_the_shelf' },
  { name: 'Bespoke', value: 'bespoke' },
]
</script>

<template>
  <div class="shadow p-4 fade-in">
    <Form>
      <div class="flex gap-2 justify-between mb-8 mt-2">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Name of Supplier [1]</label>
          <Select :placeholder="'Select An Awarding Company'" option-label="name" />
        </div>
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">No. of previous purchases</label>
          <Select :placeholder="'Select Previous Contract'" option-label="name" />
        </div>
      </div>

      <div class="flex gap-2 justify-between mb-8 mt-9">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Payment Terms</label>
          <Select
            :placeholder="'Select a payment terms'"
            option-label="name"
            :options="paymentTypes"
          />
        </div>
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Basis of selection of supplier (Choice)</label>
          <Select
            :placeholder="'Who selects the basis of the supplier'"
            option-label="name"
            :options="basisOfSelection"
          />
        </div>
      </div>

      <div class="flex gap-2 justify-between mb-8 mt-9">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Country</label>
          <Select :placeholder="'Select a country'" option-label="name" :options="countries" />
        </div>
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Continent</label>
          <Select :placeholder="'Select a continent'" option-label="name" :options="continents" />
        </div>
      </div>

      <div class="flex gap-2 justify-between mb-8 mt-9">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Supplier's Incoterms</label>
          <Select
            :placeholder="'Select suppliers incoterms'"
            option-label="name"
            :options="incoterms"
          />
        </div>
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Procurement Type</label>
          <Select
            :placeholder="'Select procurement type'"
            option-label="name"
            :options="procurementType"
          />
        </div>
      </div>

      <div class="flex gap-2 justify-between mb-8">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Delivery Time</label>
          <InputNumber :placeholder="'Enter delivery time'" />
        </div>
      </div>

      <p class="font-medium text-[#A6A6A6] mb-6 text-lg">Cost</p>

      <div class="flex gap-2 justify-between mb-8">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Cost of items</label>
          <div class="flex gap-2">
            <span class="w-[30%]"
              ><Select :placeholder="'USD'" :options="currency" option-label="name"
            /></span>
            <InputNumber :placeholder="'Enter amount'" class="w-full" />
          </div>
        </div>
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Logistics cost</label>
          <div class="flex gap-2">
            <span class="w-[30%]"
              ><Select :placeholder="'USD'" :options="currency" option-label="name"
            /></span>
            <InputNumber :placeholder="'Enter amount'" class="w-full" />
          </div>
        </div>
      </div>

      <div class="flex gap-2 justify-between mb-8">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Others</label>
          <div class="flex gap-2">
            <span class="w-[30%]"
              ><Select :placeholder="'USD'" :options="currency" option-label="name"
            /></span>
            <InputNumber :placeholder="'Enter amount'" class="w-full" />
          </div>
        </div>
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Funding Request</label>
          <div class="flex gap-2">
            <span class="w-[30%]"
              ><Select :placeholder="'USD'" :options="currency" option-label="name"
            /></span>
            <InputNumber :placeholder="'Enter amount'" class="w-full" />
          </div>
        </div>
      </div>

      <p class="font-semibold text-[#140800] mb-6 text-lg">Pro-Forma Invoice</p>
      <div class="flex gap-2 justify-between mb-8">
        <div class="flex flex-col">
          <!-- <label class="mb-2 font-medium text-sm"
            >Previous Invoice <span class="text-[#CC5500]">*</span></label
          > -->
          <FileUpload
            mode="basic"
            name="file"
            accept="image/*,.pdf,.docx,.xlsx"
            :choose-label="'Upload file'"
          >
            <template #chooseicon>
              <UploadIcon />
            </template>
          </FileUpload>
          <span class="text-[11px] font-normal text-[#140800]"
            >Max file size 2MB (pdf, docx, pptx, xlsx)</span
          >
        </div>
      </div>

      <div class="flex justify-center items-center">
        <AppButton text="Save" :loading="false" class="mr-2" variant="secondary" size="large" />
        <AppButton text="Next" :loading="false" class="ml-2" variant="orange" size="large" />
      </div>
    </Form>
  </div>
</template>

<style scoped>
.shadow {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
}
</style>
