import * as requestFromServer from './Crud'
import {globalSlice, callTypes} from './Slice'

const {actions} = globalSlice

export const GetUserInfo = (accessToken) => (dispatch) => {
  dispatch(actions.setAccessToken(accessToken))
}

export const setListApp = (data) => (dispatch) => {
  dispatch(actions.setListApp(data))
}

export const setItemApp = (data) => (dispatch) => {
  dispatch(actions.setItemApp(data))
}

export const changeApp = (data) => (dispatch) => {
  dispatch(actions.changeApp(data))
}

export const setAutoScroll = (data) => (dispatch) => {
  dispatch(actions.setAutoScroll(data))
}

export const setLevel = (data) => (dispatch) => {
  dispatch(actions.setLevel(data))
}