<script setup lang="ts">
import { ref, onMounted, defineProps, inject } from 'vue'
import { Form, FormField } from '@primevue/forms'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import FileUpload from 'primevue/fileupload'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import UploadIcon from '../svgs/UploadIcon.vue'
import { getAwardingCompaniesList } from '@/services/httpServices'
import AppButton from '../AppButton.vue'
import { validateFileType } from '@/utils/validateFileType'
import { useTransactionData } from '@/stores/transactionData'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

import {
  acceptedFileTypes,
  CURRENCIES,
  INCOTERMS,
  PAYMENT_TYPES,
  PREVIOUSCONTRACTS,
} from '@/utils/constants'
import CustomDialog from '../Dialog/CustomDialog.vue'

const toast = useToast()
const numberOfPreviousContracts = PREVIOUSCONTRACTS
const {
  setAwardingCompanyState,
  setNumberOfPreviousContract,
  setCurrency,
  setContractAmount,
  setIncotermsValue,
  setNumberOfExecutionDays,
  setPaymentTerms,
  setPaymentAfterInvoice,
  setPurchaseOrderFile,
  setPreviousInvoiceFile,
  setBankStatementFile,
  setAllAwardingCompanies,
  previousInvoiceFile,
  purchaseOrderFile,
  bankStatementFile,
} = useTransactionData()

type actionTypes =
  | 'setAwardingCompanyState'
  | 'setIncotermsValue'
  | 'setContractAmount'
  | 'setCurrency'
  | 'setNumberOfPreviousContract'
  | 'setNumberOfExecutionDays'
  | 'setPaymentTerms'
  | 'setPaymentAfterInvoice'
  | 'setPurchaseOrderFile'
  | 'setPreviousInvoiceFile'
  | 'setBankStatementFile'

const props = defineProps<{
  tabIndex: number
}>()

const awardingCompanies = ref([])

const isDialogVisible = ref(true)

function handleDialogVisibilityUpdate(newVisible: boolean) {
  isDialogVisible.value = newVisible
}

const fetchCompanies = async () => {
  const res = await getAwardingCompaniesList()
  if (res.status === 200) {
    return res.data.data
  }
  return []
}

const handleFileUpload = (evt: any, actionName: actionTypes) => {
  const LIMIT_SIZE = 2000000
  const file = evt.files[0]
  const isValidFileType = validateFileType(acceptedFileTypes, file)
  if (!isValidFileType) {
    toast.add({
      severity: 'error',
      summary: 'Invalid File Type',
      detail: `Please upload a valid file type`,
      life: 3000,
    })
    return
  }

  if (file.size > LIMIT_SIZE) {
    toast.add({
      severity: 'error',
      summary: 'File Size Exceeded',
      detail: `The file is greater than 2MB`,
      life: 3000,
    })
    return
  }

  if (actionName === 'setPreviousInvoiceFile') {
    setPreviousInvoiceFile(file)
  }
  if (actionName === 'setPurchaseOrderFile') {
    setPurchaseOrderFile(file)
  }
  if (actionName === 'setBankStatementFile') {
    setBankStatementFile(file)
  }
}

const handleSelect = (evt: any, actionName: actionTypes) => {
  if (actionName === 'setAwardingCompanyState') {
    setAwardingCompanyState(evt.value)
  }
  if (actionName === 'setNumberOfPreviousContract') {
    setNumberOfPreviousContract(evt.value)
  }
  if (actionName === 'setCurrency') {
    setCurrency(evt.value)
  }
  if (actionName === 'setContractAmount') {
    setContractAmount(evt)
  }
  if (actionName === 'setPaymentTerms') {
    setPaymentTerms(evt.value)
  }
  if (actionName === 'setIncotermsValue') {
    setIncotermsValue(evt.value)
  }
  if (actionName === 'setNumberOfExecutionDays') {
    setNumberOfExecutionDays(evt)
  }
  if (actionName === 'setPaymentAfterInvoice') {
    setPaymentAfterInvoice(evt)
  }
}

onMounted(async () => {
  const companies = await fetchCompanies()
  awardingCompanies.value = companies
  setAllAwardingCompanies(companies)
})

const dropdownObjectSchema = z.object({}).refine((val) => val !== null && val !== undefined, {
  message: 'Please select an option',
})

const schema = z.object({
  awardingCompany: dropdownObjectSchema,
  numberOfPreviousContract: dropdownObjectSchema,
  currency: dropdownObjectSchema,
  paymentTerms: dropdownObjectSchema,
  incotermsValue: dropdownObjectSchema,
  contractAmount: z.number().min(1, { message: 'Amount should be greater than 1' }),
  executionDays: z.number().min(1, { message: 'Amount should be greater than 1' }),
  paymentAfterInvoice: z.number().min(1, { message: 'Amount should be greater than 1' }),
})

const initialValues = ref({
  awardingCompany: null,
  numberOfPreviousContract: null,
  currency: null,
  contractAmount: 0,
  paymentTerms: null,
  incotermsValue: null,
  purchaseOrderFile: [],
  previousInvoiceFile: [],
  bankStatementFile: [],
})

const resolver = ref(zodResolver(schema))

const enableTab: any = inject('enableTab')

function onSubmit(data: any) {
  if (Object.keys(data.errors).length > 0) {
    toast.add({
      severity: 'error',
      summary: 'Form field empty',
      detail: `You have to fill every field to continue`,
      life: 3000,
    })
    return
  }
  if (
    purchaseOrderFile.length === 0 ||
    previousInvoiceFile.length === 0 ||
    bankStatementFile.length === 0
  ) {
    toast.add({
      severity: 'error',
      summary: 'Missing Files',
      detail: 'Please upload all required files before proceeding.',
      life: 3000,
    })
    return
  }

  enableTab('1')
}
</script>

<template>
  <div class="shadow p-4 fade-in">
    <Toast />
    <CustomDialog
      v-model:visible="isDialogVisible"
      @update:visible="handleDialogVisibilityUpdate"
    />
    <Form v-slot="$form" :initialValues="initialValues" :resolver="resolver" @submit="onSubmit">
      <div class="flex gap-2 justify-between mb-8 mt-2">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Awarding Company</label>
          <Select
            name="awardingCompany"
            :placeholder="'Select An Awarding Company'"
            :options="awardingCompanies"
            option-label="name"
            @change="(evt) => handleSelect(evt, 'setAwardingCompanyState')"
          />
        </div>
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">No. of previous contracts</label>
          <Select
            name="numberOfPreviousContract"
            :placeholder="'Select Previous Contract'"
            :options="numberOfPreviousContracts"
            option-label="name"
            @change="(evt) => handleSelect(evt, 'setNumberOfPreviousContract')"
          />
        </div>
      </div>

      <div class="flex gap-2 justify-between mb-8">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Value of contract</label>
          <div class="flex gap-2">
            <span class="w-[40%]">
              <Select
                name="currency"
                :placeholder="'USD'"
                :options="CURRENCIES"
                option-label="name"
                @change="(evt) => handleSelect(evt, 'setCurrency')"
              />
            </span>
            <InputNumber
              :placeholder="'Enter amount'"
              @value-change="(evt) => handleSelect(evt, 'setContractAmount')"
              name="contractAmount"
            />
          </div>
        </div>
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Payment Terms</label>
          <Select
            name="paymentTerms"
            :options="PAYMENT_TYPES"
            option-label="name"
            :placeholder="'Select a payment terms type'"
            @change="(evt) => handleSelect(evt, 'setPaymentTerms')"
          />
        </div>
      </div>

      <div class="flex gap-2 justify-between mb-8">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Incoterms</label>
          <Select
            name="incotermsValue"
            :placeholder="'Select a incoterms type'"
            :options="INCOTERMS"
            option-label="name"
            @change="(evt) => handleSelect(evt, 'setIncotermsValue')"
          />
        </div>
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Execution Time (days)</label>
          <InputNumber
            :placeholder="'Enter execution time in days'"
            @value-change="(evt) => handleSelect(evt, 'setNumberOfExecutionDays')"
            name="executionDays"
          />
        </div>
      </div>

      <div class="flex gap-2 justify-between mb-8">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Payment after Invoice (days)</label>
          <InputNumber
            :placeholder="'Enter payment after invoice is issued in days'"
            @value-change="(evt) => handleSelect(evt, 'setPaymentAfterInvoice')"
            name="paymentAfterInvoice"
          />
        </div>
      </div>

      <div class="flex gap-2 justify-between mb-8">
        <div class="flex flex-col">
          <label class="mb-2 font-medium text-sm"
            >Purchase Order<span class="text-[#CC5500]">*</span></label
          >
          <FileUpload
            name="purchaseOrderFile"
            mode="basic"
            accept=".pdf,.docx,.xlsx"
            :choose-label="'Upload file'"
            @select="(event) => handleFileUpload(event, 'setPurchaseOrderFile')"
            :max-file-size="2000000"
          >
            <template #chooseicon>
              <UploadIcon />
            </template>
          </FileUpload>

          <span class="text-[11px] font-normal text-[#140800]">
            Max file size 2MB (pdf, docx, pptx, xlsx)
          </span>
        </div>
      </div>

      <p class="font-medium text-[#665E59] mb-6">Previous Contracts Information</p>
      <div class="flex gap-2 justify-between mb-8">
        <div class="flex flex-col">
          <label class="mb-2 font-medium text-sm"
            >Previous Invoice <span class="text-[#CC5500]">*</span></label
          >
          <FileUpload
            mode="basic"
            name="prevContractFile"
            accept=".pdf,.docx,.xlsx"
            :choose-label="'Upload file'"
            @select="(event) => handleFileUpload(event, 'setPreviousInvoiceFile')"
            :max-file-size="2000000"
          >
            <template #chooseicon>
              <UploadIcon />
            </template>
          </FileUpload>
          <span class="text-[11px] font-normal text-[#140800]"
            >Max file size 2MB (pdf, docx, pptx, xlsx)</span
          >
        </div>
        <div class="flex flex-col">
          <label class="mb-2 font-medium text-sm"
            >Bank Statement<span class="text-[#CC5500]">*</span></label
          >
          <FileUpload
            mode="basic"
            name="bankStatementFile"
            accept=".pdf,.docx,.xlsx"
            @select="(event) => handleFileUpload(event, 'setBankStatementFile')"
            :choose-label="'Upload file'"
            :max-file-size="2000000"
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
        <AppButton
          text="Save"
          variant="secondary"
          size="large"
          class="mr-2"
          :disabled="true"
          :loading="false"
        />
        <AppButton
          text="Next"
          variant="orange"
          size="large"
          class="ml-2"
          :loading="false"
          :handle-click="$form.submit"
        />
      </div>
    </Form>
  </div>
</template>

<style scoped>
.shadow {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
}
.text-red-600 {
  color: #dc2626;
}
</style>
