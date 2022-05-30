import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  accessToken: '',
  userProfile: null,
}

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    logOut: (state, action) => {
      state = initialState
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload
    }
  },
})

export const { logOut, setAccessToken, setUserProfile } = globalSlice.actions
