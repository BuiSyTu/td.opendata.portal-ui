import axios from 'axios'
import { notification } from 'antd';

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

const add = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'TDAuthorization': getCookie('token'),
      },
      url: baseUrl,
      data,
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

const update = async (id, data) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${baseUrl}/${id}`,
      headers: {
        'Authorization': authorization,
        'TDAuthorization': getCookie('token'),
      },
      data,
      timeout: 15000,
    })

    return res?.data
  } catch (error) {
    const { status } = error.response

    if (status === 406) {
      notification.warning({
        message: 'Thất bại!',
        description: 'Không có thông tin nào thay đổi',
      })
    } else {
      notification.error({
        message: 'Thất bại!',
        description: 'Xảy ra lỗi trong quá trình thực hiện!',
      })
    }

    return null
  }
}

const _delete = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
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

const statsByCategory = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${baseUrl}/stats-by-category`,
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

const statsByOrganization = async () => {
  try {

    const res = await axios({
      method: 'GET',
      url: `${baseUrl}/stats-by-organization`,
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
  add,
  getById,
  getData,
  update,
  delete: _delete,
  statsByCategory,
  statsByOrganization,
}
