import type { numberValueProps } from '@/utils/typings'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface AwardingCompanyInterface {
  category: string
  created_at: string
  id: string
  is_active: boolean
  name: string
  updated_at: string
}

export const useTransactionData = defineStore('tnxData', () => {
  //states
  const awardingCompanyState = ref({} as AwardingCompanyInterface)
  const numberOfPreviousContract = ref({} as numberValueProps)
  const currency = ref({} as numberValueProps)
  const contractAmount = ref(0)
  const incotermsValue = ref({} as numberValueProps)
  const numberOfExecutionDays = ref(0)
  const paymentTerms = ref({} as numberValueProps)
  const paymentAfterInvoice = ref(0)
  const purchaseOrderFile = ref<File[]>([])
  const previousInvoiceFile = ref({})
  const bankStatementFile = ref({})
  const allAwardingCompanies = ref([])
  const supplierChoice = ref({} as numberValueProps)
  const country = ref({} as numberValueProps)
  const continent = ref({} as numberValueProps)
  const procurementType = ref({} as numberValueProps)
  const transactionType = ref('')
  const deliveryTime = ref(0)
  const costOfItemCurrency = ref({} as numberValueProps)
  const logisticsCurrency = ref({} as numberValueProps)
  const othersCurrency = ref({} as numberValueProps)
  const fundingRequestCurrency = ref({} as numberValueProps)
  const costOfItemAmount = ref(0)
  const logisticsAmount = ref(0)
  const othersAmount = ref(0)
  const fundingRequestAmount = ref(0)
  const proFormaFile = ref({})

  //actions
  const setAwardingCompanyState = (payload: any) => {
    awardingCompanyState.value = payload
  }

  const setNumberOfPreviousContract = (payload: any) => {
    numberOfPreviousContract.value = payload
  }
  const setCurrency = (payload: any) => {
    currency.value = payload
  }
  const setContractAmount = (payload: any) => {
    contractAmount.value = payload
  }
  const setPaymentTerms = (payload: any) => {
    paymentTerms.value = payload
  }
  const setIncotermsValue = (payload: any) => {
    incotermsValue.value = payload
  }
  const setNumberOfExecutionDays = (payload: any) => {
    numberOfExecutionDays.value = payload
  }
  const setPaymentAfterInvoice = (payload: any) => {
    paymentAfterInvoice.value = payload
  }
  const setPurchaseOrderFile = (payload: any) => {
    purchaseOrderFile.value = payload
  }
  const setPreviousInvoiceFile = (payload: any) => {
    previousInvoiceFile.value = payload
  }
  const setBankStatementFile = (payload: any) => {
    bankStatementFile.value = payload
  }
  const setAllAwardingCompanies = (payload: any) => {
    allAwardingCompanies.value = payload
  }
  const setSupplierChoice = (payload: any) => {
    supplierChoice.value = payload
  }
  const setCountry = (payload: any) => {
    country.value = payload
  }
  const setContinent = (payload: any) => {
    continent.value = payload
  }
  const setProcurementType = (payload: any) => {
    procurementType.value = payload
  }
  const setDeliveryTime = (payload: any) => {
    deliveryTime.value = payload
  }
  const setCostOfItemCurrency = (payload: any) => {
    costOfItemCurrency.value = payload
  }
  const setLogisticsCurrency = (payload: any) => {
    logisticsCurrency.value = payload
  }
  const setOthersCurrency = (payload: any) => {
    othersCurrency.value = payload
  }
  const setFundingRequestCurrency = (payload: any) => {
    fundingRequestCurrency.value = payload
  }
  const setCostOfItemAmount = (payload: any) => {
    costOfItemAmount.value = payload
  }
  const setLogisticsAmount = (payload: any) => {
    logisticsAmount.value = payload
  }
  const setOthersAmount = (payload: any) => {
    othersAmount.value = payload
  }
  const setFundingRequestAmount = (payload: any) => {
    fundingRequestAmount.value = payload
  }
  const setProFormaFile = (payload: any) => {
    proFormaFile.value = payload
  }
  const setTransactionType = (payload: any) => {
    transactionType.value = payload
  }

  return {
    awardingCompanyState,
    numberOfPreviousContract,
    currency,
    contractAmount,
    incotermsValue,
    numberOfExecutionDays,
    paymentTerms,
    paymentAfterInvoice,
    purchaseOrderFile,
    previousInvoiceFile,
    bankStatementFile,
    allAwardingCompanies,
    supplierChoice,
    country,
    continent,
    deliveryTime,
    costOfItemAmount,
    logisticsAmount,
    othersAmount,
    fundingRequestAmount,
    costOfItemCurrency,
    logisticsCurrency,
    othersCurrency,
    fundingRequestCurrency,
    procurementType,
    proFormaFile,
    transactionType,
    setTransactionType,
    setAllAwardingCompanies,
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
    setSupplierChoice,
    setCountry,
    setContinent,
    setDeliveryTime,
    setProcurementType,
    setCostOfItemCurrency,
    setLogisticsCurrency,
    setOthersCurrency,
    setFundingRequestCurrency,
    setCostOfItemAmount,
    setLogisticsAmount,
    setOthersAmount,
    setFundingRequestAmount,
    setProFormaFile,
  }
})
