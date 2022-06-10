import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: '',
  userProfile: null,
}

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    logOut: (state: any) => {
      state.accessToken = ''
      state.userProfile = null
    },
    setAccessToken: (state: any, action: any) => {
      state.accessToken = action.payload
    },
    setUserProfile: (state: any, action: any) => {
      state.userProfile = action.payload
    }
  },
})

export const { logOut, setAccessToken, setUserProfile } = globalSlice.actions
