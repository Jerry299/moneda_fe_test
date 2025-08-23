<script setup lang="ts">
import { Form } from '@primevue/forms'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import FileUpload from 'primevue/fileupload'
import UploadIcon from '../svgs/UploadIcon.vue'
import { getAwardingCompaniesList } from '@/services/httpServices'
import { onMounted, ref, defineProps, inject, registerRuntimeCompiler } from 'vue'
import AppButton from '../AppButton.vue'
import { validateFileType } from '@/utils/validateFileType'
import { useTransactionData } from '@/stores/transactionData'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
const toast = useToast()

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
const acceptedFileTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]

const awardingCompanies = ref([])
const numberOfPreviousContracts = [
  { name: 1, value: 1 },
  { name: 2, value: 2 },
  { name: 3, value: 3 },
  { name: 4, value: 4 },
]

const currency = [
  { name: 'USD', value: 'usd' },
  { name: 'NGN', value: 'ngn' },
  { name: 'GBP', value: 'gbp' },
  { name: 'EUR', value: 'eur' },
]

const paymentTerms = [
  { name: 'Milestone Payment', value: 'milestone_payment' },
  { name: 'Bullet Payment', value: 'bullet_payment' },
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

const fetchCompanies = async () => {
  const res = await getAwardingCompaniesList()
  //console.log(res, ' the response')
  if (res.status === 200) {
    //console.log(res?.data?.data)
    return res?.data?.data
  } else {
    return []
  }
}

const handleFileUpload = (evt: any, actionName: actionTypes) => {
  const LIMIT_SIZE = 2000000
  // console.log(evt.files[0])
  //validate that the uploaded file is really the specified file type
  const isValidFileType = validateFileType(acceptedFileTypes, evt.files[0])
  if (isValidFileType) {
    // check the file size
    if (evt.files[0].size > LIMIT_SIZE) {
      toast.add({
        severity: 'error',
        summary: 'File Size Exceeded',
        detail: `The file is greater than 2MB`,
        life: 3000,
      })
      return
    } else {
      //save to state
      if (actionName === 'setPreviousInvoiceFile') {
        setPreviousInvoiceFile(evt.files[0])
      }
      if (actionName === 'setPurchaseOrderFile') {
        setPurchaseOrderFile(evt.files[0])
      }
      if (actionName === 'setBankStatementFile') {
        setBankStatementFile(evt.files[0])
      }
    }
  } else {
    return
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
})

const enableTab: any = inject('enableTab')
</script>
<template>
  <div class="shadow p-4 fade-in">
    <Toast />
    <Form>
      <div class="flex gap-2 justify-between mb-8 mt-2">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Awarding Company</label>
          <Select
            :placeholder="'Select An Awarding Company'"
            :options="awardingCompanies"
            option-label="name"
            @change="(evt) => handleSelect(evt, 'setAwardingCompanyState')"
          />
        </div>
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">No. of previous contracts</label>
          <Select
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
            <span class="w-[40%]"
              ><Select
                :placeholder="'USD'"
                :options="currency"
                option-label="name"
                @change="(evt) => handleSelect(evt, 'setCurrency')"
            /></span>
            <InputNumber
              :placeholder="'Enter amount'"
              @value-change="(evt) => handleSelect(evt, 'setContractAmount')"
            />
          </div>
        </div>
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Payment Terms</label>
          <Select
            :options="paymentTerms"
            option-label="name"
            :placeholder="'Select a payment terms type'"
            @change="(evt) => handleSelect(evt, 'setPaymentTerms')"
          />
        </div>
      </div>

      <div class="flex gap-2 justify-between mb-8">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Incoterms</label>
          <div class="flex gap-2">
            <Select
              :placeholder="'Select a incoterms type'"
              :options="incoterms"
              option-label="name"
              @change="(evt) => handleSelect(evt, 'setIncotermsValue')"
            />
          </div>
        </div>
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Execution Time (days)</label>
          <InputNumber
            :placeholder="'Enter execution time in days'"
            @value-change="(evt) => handleSelect(evt, 'setNumberOfExecutionDays')"
          />
        </div>
      </div>

      <div class="flex gap-2 justify-between mb-8">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Payment after Invoice (days)</label>
          <InputNumber
            :placeholder="'Enter payment after invoice is issued in days'"
            @value-change="(evt) => handleSelect(evt, 'setPaymentAfterInvoice')"
          />
        </div>
      </div>

      <div class="flex gap-2 justify-between mb-8">
        <div class="flex flex-col">
          <label class="mb-2 font-medium text-sm"
            >Purchase Order<span class="text-[#CC5500]">*</span></label
          >
          <FileUpload
            mode="basic"
            name="file"
            accept=".pdf,.docx,.xlsx"
            :choose-label="'Upload file'"
            @select="(event) => handleFileUpload(event, 'setPurchaseOrderFile')"
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

      <p class="font-medium text-[#665E59] mb-6">Previous Contracts Information</p>
      <div class="flex gap-2 justify-between mb-8">
        <div class="flex flex-col">
          <label class="mb-2 font-medium text-sm"
            >Previous Invoice <span class="text-[#CC5500]">*</span></label
          >
          <FileUpload
            mode="basic"
            name="file"
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
            name="file"
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
          :loading="false"
          class="mr-2"
          variant="secondary"
          size="large"
          :disabled="true"
        />
        <AppButton
          text="Next"
          :loading="false"
          class="ml-2"
          variant="orange"
          size="large"
          :handle-click="() => enableTab('1')"
        />
      </div>
    </Form>
  </div>
</template>

<style scoped>
.shadow {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
}
</style>
