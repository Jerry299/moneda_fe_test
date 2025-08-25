import axios from 'axios'
import { createTransactionUrl, getAwardingCompaniesUrl, getDashboardDataUrl } from './urls'
const token = '1uuueuue23'

// we can add any axios config here as well.

export const getDashBoardData = () => {
  return axios({
    method: 'GET',
    url: getDashboardDataUrl,
  })
}

export const getAwardingCompaniesList = () => {
  return axios({
    method: 'GET',
    url: getAwardingCompaniesUrl,
  })
}

export const createTransactionService = <T>(formData: T) => {
  return axios({
    method: 'POST',
    url: createTransactionUrl,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
