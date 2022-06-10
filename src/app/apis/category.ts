import axios from 'axios'
import { getCookie } from 'src/utils/cookies';
import { toQueryString } from 'src/utils/common';

const controllerName = 'categories'
const baseUrl = `${process.env.REACT_APP_API_URL}/${controllerName}`
const authorization = `Bearer ${process.env.REACT_APP_BEAR_TOKEN}`

const getAll = async (listFilter: any) => {
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
  } catch (error: any) {
    console.error(error?.response)
    return null
  }
}
export const categoryApi = {
  getAll,
}
