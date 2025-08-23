import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTransactionData = defineStore('tnxData', () => {
  //states
  const awardingCompanyState = ref({})
  const numberOfPreviousContract = ref({})
  const currency = ref({})
  const contractAmount = ref(0)
  const incotermsValue = ref({})
  const numberOfExecutionDays = ref(0)
  const paymentTerms = ref({})
  const paymentAfterInvoice = ref(0)
  const purchaseOrderFile = ref({})
  const previousInvoiceFile = ref({})
  const bankStatementFile = ref({})

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
  }
})
