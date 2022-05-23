import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  accessToken: null,
  listLoading: false,
  actionsLoading: false,
  error: null,

  listApp: null,
  itemApp: null,
  autoScroll: false,
  level: 1
}
export const callTypes = {
  list: 'list',
  action: 'action',
}

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false
      } else {
        state.actionsLoading = false
      }
    },
    startCall: (state, action) => {
      state.error = null
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true
      } else {
        state.actionsLoading = true
      }
    },

    logOut: (state, action) => {
      state = initialState
    },

    setAccessToken: (state, action) => {
      const payload = action.payload
      state.accessToken = payload
    },
    setListApp: (state, action) => {
      const payload = action.payload
      state.listApp = payload
    },
    setItemApp: (state, action) => {
      const payload = action.payload
      state.itemApp = payload
    },
    changeApp: (state, action) => {
      const payload = action.payload
      const _listApp = [...state.listApp]
      _listApp.forEach((i) => {
        if(i.id === payload.id){
          i.enable = payload.enable
        }
      })
      state.listApp = _listApp
    },
    setAutoScroll: (state, action) => {
      const payload = action.payload
      state.autoScroll = payload
    },
    setLevel: (state, action) => {
      const payload = action.payload
      state.level = payload
    },
  },
})
