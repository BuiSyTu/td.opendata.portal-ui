import axios from 'axios'
import { getCookie } from 'src/utils/cookies';
import { toQueryString } from 'src/utils/common';

const controllerName = 'datasets'
const baseUrl = `${process.env.REACT_APP_API_URL}/${controllerName}`
const authorization = `Bearer ${process.env.REACT_APP_BEAR_TOKEN}`

const getAll = async (listFilter) => {
  try {    
    const params = toQueryString(listFilter)
    const res = await axios({
      method: 'GET',
      url: `${baseUrl}?${params}`,
      headers: {
        'Authorization': authorization,
        'TDAuthorization': getCookie('token'),
      },
      timeout: 15000,
    })

    return res?.data
  } catch (error) {
    console.error(error.response)
    return null
  }
}

const getById = async (id) => {
  try {    
    const res = await axios({
      method: 'GET',
      url: `${baseUrl}/${id}`,
      headers: {
        'Authorization': authorization,
        'TDAuthorization': getCookie('token'),
      },
      timeout: 15000,
    })

    return res?.data
  } catch (error) {
    console.error(error.response)
    return null
  }
}

const getData = async (id, listFilter) => {
  try {
    const params = toQueryString(listFilter)

    const res = await axios({
      method: 'GET',
      url: `${baseUrl}/${id}/data?${params}`,
      headers: {
        'Authorization': authorization,
        'TDAuthorization': getCookie('token'),
      },
      timeout: 15000,
    })

    return res?.data
  } catch (error) {
    console.error(error.response)
    return null
  }
}

export const datasetApi = {
  getAll,
  getById,
  getData,
}
