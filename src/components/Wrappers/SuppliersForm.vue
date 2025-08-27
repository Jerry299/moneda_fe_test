<script setup lang="ts">
import { Form } from '@primevue/forms'
import InputNumber from 'primevue/inputnumber'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import Select from 'primevue/select'
import FileUpload from 'primevue/fileupload'
import UploadIcon from '../svgs/UploadIcon.vue'
import AppButton from '../AppButton.vue'
import { useTransactionData } from '@/stores/transactionData'
import { ref } from 'vue'
import {
  acceptedFileTypes,
  BASIS_OF_SELECTION,
  CONTINENTS,
  COUNTRIES,
  CURRENCIES,
  INCOTERMS,
  PAYMENT_TYPES,
  PREVIOUSCONTRACTS,
  PROCUREMENT_TYPE,
} from '@/utils/constants'
import type { numberValueProps } from '@/utils/typings'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { validateFileType } from '@/utils/validateFileType'
import { createTransactionService } from '@/services/httpServices'
import { useRouter } from 'vue-router'

const toast = useToast()
const store = useTransactionData()
const allAwardingCompanies = ref(store.allAwardingCompanies)

const selectedCompany: numberValueProps = allAwardingCompanies.value.filter(
  (company: any) => company.id === store.awardingCompanyState?.id,
)[0]
const prevContracts = ref(store.numberOfPreviousContract.name)
const router = useRouter()
const selectedIncotermValue = ref(store.incotermsValue.name)

const theSelectedCompany = ref(selectedCompany.name)
const selectedPaymentTerms = ref(store.paymentTerms.name)
const isLoading = ref(false)

// handle select change
type actionTypes =
  | 'setSupplierChoice'
  | 'setContinent'
  | 'setCountry'
  | 'setDeliveryTime'
  | 'setProcurementType'
  | 'setCostOfItemCurrency'
  | 'setLogisticsCurrency'
  | 'setOthersCurrency'
  | 'setOthersCurrency'
  | 'setFundingRequestCurrency'
  | 'setCostOfItemAmount'
  | 'setLogisticsAmount'
  | 'setOthersAmount'
  | 'setFundingRequestAmount'
  | 'setProFormaFile'

const handleSelect = (evt: any, actionName: actionTypes) => {
  if (actionName === 'setSupplierChoice') {
    store.setSupplierChoice(evt.value)
  }
  if (actionName === 'setProcurementType') {
    store.setProcurementType(evt.value)
  }
  if (actionName === 'setDeliveryTime') {
    store.setDeliveryTime(evt)
  }
  if (actionName === 'setCountry') {
    store.setCountry(evt.value)
  }
  if (actionName === 'setContinent') {
    store.setContinent(evt.value)
  }
  if (actionName === 'setCostOfItemCurrency') {
    store.setCostOfItemCurrency(evt.value)
  }
  if (actionName === 'setLogisticsCurrency') {
    store.setLogisticsCurrency(evt.value)
  }
  if (actionName === 'setOthersCurrency') {
    store.setOthersCurrency(evt.value)
  }
  if (actionName === 'setFundingRequestCurrency') {
    store.setFundingRequestCurrency(evt.value)
  }
  if (actionName === 'setCostOfItemAmount') {
    store.setCostOfItemAmount(evt)
  }
  if (actionName === 'setLogisticsAmount') {
    store.setLogisticsAmount(evt)
  }
  if (actionName === 'setOthersAmount') {
    store.setOthersAmount(evt)
  }
  if (actionName === 'setFundingRequestAmount') {
    store.setFundingRequestAmount(evt)
  }
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

  if (actionName === 'setProFormaFile') {
    store.setProFormaFile(file)
  }
}

const dropdownObjectSchema = z.object({}).refine((val) => val !== null && val !== undefined, {
  message: 'Please select an option',
})

const schema = z.object({
  basisOfSupplier: dropdownObjectSchema,
  country: dropdownObjectSchema,
  continent: dropdownObjectSchema,
  deliveryTime: z.number().min(1, { message: 'Amount should be greater than 1' }),
  procurementType: dropdownObjectSchema,
  fundingRequestCurrency: dropdownObjectSchema,
  othersCurrency: dropdownObjectSchema,
  itemsCostCurrency: dropdownObjectSchema,
  logisticsCurrency: dropdownObjectSchema,
  itemsCostAmount: z.number().min(1, { message: 'Amount should be greater than 1' }),
  logisticsAmount: z.number().min(1, { message: 'Amount should be greater than 1' }),
  othersAmount: z.number().min(1, { message: 'Amount should be greater than 1' }),
  fundingRequestAmount: z.number().min(1, { message: 'Amount should be greater than 1' }),
})

const initialValues = ref({
  awardingCompany: null,
  country: null,
  continent: null,
  deliveryTime: 0,
  procurementType: null,
  fundingRequestCurrency: null,
  othersCurrency: null,
  itemsCostCurrency: null,
  logisticsCurrency: null,
  itemsCostAmount: 0,
  logisticsAmount: 0,
  othersAmount: 0,
  fundingRequestAmount: 0,
  purchaseOrderFile: [],
  previousInvoiceFile: [],
  bankStatementFile: [],
})

const resolver = ref(zodResolver(schema))
async function onSubmit(data: any) {
  if (Object.keys(data.errors).length > 0) {
    toast.add({
      severity: 'error',
      summary: 'Form field empty',
      detail: `You have to fill every field to continue`,
      life: 3000,
    })
    return
  }

  isLoading.value = true
  const supplier_oem_subcontractors = [
    {
      soc_name: store.awardingCompanyState.name,
      country: store.country.value,
      continent: store.continent.value,
      basis_of_selection: store.supplierChoice.value,
      incoterms: store.incotermsValue.value,
      previous_purchase: store.numberOfPreviousContract.value,
      delivery_time: store.deliveryTime,
      procurement_type: store.procurementType.value,
      payment_terms: store.paymentTerms.value,
      item_cost_currency: store.costOfItemCurrency.value,
      item_cost: store.costOfItemAmount,
      logistics_cost_currency: store.logisticsCurrency.value,
      logistics_cost: store.logisticsAmount,
      other_cost_currency: store.othersCurrency.value,
      other_cost: store.othersAmount,
      funding_request_currency: store.fundingRequestCurrency.value,
      funding_request: store.fundingRequestAmount,
    },
  ]
  const tnxformData = new FormData()
  tnxformData.append('transaction_type', store.transactionType)
  tnxformData.append('awarding_company_id', store.awardingCompanyState.id)
  tnxformData.append('duration', store.deliveryTime.toString())
  tnxformData.append('payment_after_invoice', store.paymentAfterInvoice.toString())
  tnxformData.append('incoterms', store.incotermsValue.value.toString().toUpperCase())
  tnxformData.append('estimated_value_currency', store.currency.value.toString())
  tnxformData.append('estimated_value', store.contractAmount.toString())
  tnxformData.append('previous_transaction', store.numberOfPreviousContract.value.toString())
  tnxformData.append('supplier_oem_subcontractors', JSON.stringify(supplier_oem_subcontractors))
  //@ts-ignore
  tnxformData.append('purchase_order', store.purchaseOrderFile)
  //@ts-ignore
  tnxformData.append('previous_contracts_information', store.previousInvoiceFile)
  //@ts-ignore
  tnxformData.append('previous_invoice', store.previousInvoiceFile)
  //@ts-ignore
  tnxformData.append('bank_statement', store.bankStatementFile)
  //@ts-ignore
  tnxformData.append(store.awardingCompanyState.name, store.proFormaFile)

  try {
    const res = await createTransactionService(tnxformData)
    isLoading.value = false

    toast.add({
      severity: 'success',
      summary: 'Form submitted successfully',
      detail: res?.data?.message,
      life: 3000,
    })
    setTimeout(() => {
      router.push('/admin/dasboard')
    }, 1500)
  } catch (error: any) {
    console.log(error?.message, ' the error from creating tnxs')

    isLoading.value = false
    toast.add({
      severity: 'error',
      summary: 'Error on submitting form',
      detail: error?.message || 'Try Again Later.',
      life: 3000,
    })
  }
}
</script>

<template>
  <div class="shadow p-4 fade-in">
    <Toast />
    <Form v-slot="$form" :initialValues="initialValues" :resolver="resolver" @submit="onSubmit">
      <div class="flex gap-2 justify-between mb-8 mt-2">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Name of Supplier [1]</label>
          <Select
            :placeholder="'Select An Awarding Company'"
            optionLabel="name"
            optionValue="name"
            :options="allAwardingCompanies"
            v-model="theSelectedCompany"
            :disabled="true"
          />
          <!-- <InputText v-model="theSelectedCompany" /> -->
        </div>
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">No. of previous purchases</label>
          <Select
            :placeholder="'Select Previous Contract'"
            option-label="name"
            v-model="prevContracts"
            :options="PREVIOUSCONTRACTS"
            optionValue="name"
            :disabled="true"
          />
        </div>
      </div>

      <div class="flex gap-2 justify-between mb-8 mt-9">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Payment Terms</label>
          <Select
            :placeholder="'Select a payment terms'"
            option-label="name"
            :options="PAYMENT_TYPES"
            v-model="selectedPaymentTerms"
            optionValue="name"
            :disabled="true"
          />
        </div>
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Basis of selection of supplier (Choice)</label>
          <Select
            :placeholder="'Who selects the basis of the supplier'"
            option-label="name"
            :options="BASIS_OF_SELECTION"
            @change="(event) => handleSelect(event, 'setSupplierChoice')"
            name="basisOfSupplier"
          />
        </div>
      </div>

      <div class="flex gap-2 justify-between mb-8 mt-9">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Country</label>
          <Select
            :placeholder="'Select a country'"
            option-label="name"
            :options="COUNTRIES"
            @change="(event) => handleSelect(event, 'setCountry')"
            name="country"
          />
        </div>
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Continent</label>
          <Select
            :placeholder="'Select a continent'"
            option-label="name"
            :options="CONTINENTS"
            @change="(event) => handleSelect(event, 'setContinent')"
            name="continent"
          />
        </div>
      </div>

      <div class="flex gap-2 justify-between mb-8 mt-9">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Supplier's Incoterms</label>
          <Select
            :placeholder="'Select suppliers incoterms'"
            option-label="name"
            :options="INCOTERMS"
            v-model="selectedIncotermValue"
            optionValue="name"
            :disabled="true"
          />
        </div>
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Procurement Type</label>
          <Select
            :placeholder="'Select procurement type'"
            option-label="name"
            :options="PROCUREMENT_TYPE"
            @change="(event) => handleSelect(event, 'setProcurementType')"
            name="procurementType"
          />
        </div>
      </div>

      <div class="flex gap-2 justify-between mb-8">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Delivery Time</label>
          <InputNumber
            :placeholder="'Enter delivery time'"
            @value-change="(event) => handleSelect(event, 'setDeliveryTime')"
            name="deliveryTime"
          />
        </div>
      </div>

      <p class="font-medium text-[#A6A6A6] mb-6 text-lg">Cost</p>

      <div class="flex gap-2 justify-between mb-8">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Cost of items</label>
          <div class="flex gap-2">
            <span class="w-[30%]"
              ><Select
                @change="(evt) => handleSelect(evt, 'setCostOfItemCurrency')"
                :placeholder="'USD'"
                :options="CURRENCIES"
                option-label="name"
                name="itemsCostCurrency"
            /></span>
            <InputNumber
              @value-change="(evt) => handleSelect(evt, 'setCostOfItemAmount')"
              :placeholder="'Enter amount'"
              class="w-full"
              name="itemsCostAmount"
            />
          </div>
        </div>
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Logistics cost</label>
          <div class="flex gap-2">
            <span class="w-[30%]"
              ><Select
                @change="(evt) => handleSelect(evt, 'setLogisticsCurrency')"
                :placeholder="'USD'"
                :options="CURRENCIES"
                option-label="name"
                name="logisticsCurrency"
            /></span>
            <InputNumber
              @value-change="(evt) => handleSelect(evt, 'setLogisticsAmount')"
              :placeholder="'Enter amount'"
              class="w-full"
              name="logisticsAmount"
            />
          </div>
        </div>
      </div>

      <div class="flex gap-2 justify-between mb-8">
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Others</label>
          <div class="flex gap-2">
            <span class="w-[30%]"
              ><Select
                @change="(evt) => handleSelect(evt, 'setOthersCurrency')"
                :placeholder="'USD'"
                :options="CURRENCIES"
                option-label="name"
                name="othersCurrency"
            /></span>
            <InputNumber
              @value-change="(evt) => handleSelect(evt, 'setOthersAmount')"
              :placeholder="'Enter amount'"
              class="w-full"
              name="othersAmount"
            />
          </div>
        </div>
        <div class="flex flex-col w-[48%]">
          <label class="mb-2 font-medium text-xs">Funding Request</label>
          <div class="flex gap-2">
            <span class="w-[30%]"
              ><Select
                @change="(evt) => handleSelect(evt, 'setFundingRequestCurrency')"
                :placeholder="'USD'"
                :options="CURRENCIES"
                option-label="name"
                name="fundingRequestCurrency"
            /></span>
            <InputNumber
              @value-change="(evt) => handleSelect(evt, 'setFundingRequestAmount')"
              :placeholder="'Enter amount'"
              class="w-full"
              name="fundingRequestAmount"
            />
          </div>
        </div>
      </div>

      <p class="font-semibold text-[#140800] mb-6 text-lg">Pro-Forma Invoice</p>
      <div class="flex gap-2 justify-between mb-8">
        <div class="flex flex-col">
          <FileUpload
            mode="basic"
            name="proFormaFile"
            accept=".pdf,.docx,.xlsx"
            :choose-label="'Upload file'"
            :max-file-size="2000000"
            @select="(event) => handleFileUpload(event, 'setProFormaFile')"
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
          :loading="isLoading"
          class="ml-2"
          variant="orange"
          size="large"
          :disabled="isLoading"
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
