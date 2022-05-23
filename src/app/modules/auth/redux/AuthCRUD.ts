import axios from 'axios'
import store from '../../../../setup/redux/Store'

// const API_URL = process.env.REACT_APP_API_URL || 'api'
const API_URL = 'https://apiai.tandan.com.vn:8081/api'

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/identity/user-infor`
export const LOGIN_URL = `${API_URL}/identity/token`
export const REGISTER_URL = `${API_URL}/identity/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/identity/forgot-password`
export const CHANGE_PASSWORD_URL = `${API_URL}/identity/reset-forgot-password`

// Server should return AuthModel
export function login(userName: string, password: string) {
  return axios.post(LOGIN_URL, {userName, password})
}

// Server should return AuthModel
export const register = (
  email: string,
  firstName: string,
  dateOfBirth: string,
  userName: string,
  phoneNumber: string,
  password: string,
  confirmPassword: string
) => {
  return axios.post<any>(REGISTER_URL, {
    email,
    firstName,
    userName,
    password,
    confirmPassword,
    dateOfBirth,
    phoneNumber,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {email})
}
export function changePassword(
  email: string,
  password: string,
  confirmPassword: string,
  token: string
) {
  return axios.post<{result: boolean}>(CHANGE_PASSWORD_URL, {
    email,
    password,
    confirmPassword,
    token,
  })
}
export const getUserByToken = () => {
  const {
    auth: {accessToken},
  } = store.getState()
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    url: GET_USER_BY_ACCESSTOKEN_URL,
  })
}
