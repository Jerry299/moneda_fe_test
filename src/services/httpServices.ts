import axios from 'axios'
import { getAwardingCompaniesUrl, getDashboardDataUrl } from './urls'

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
