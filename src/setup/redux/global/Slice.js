import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  accessToken: null,
  error: null,
}

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    logOut: (state, action) => {
      state = initialState
    },
    setAccessToken: (state, action) => {
      const payload = action.payload
      state.accessToken = payload
    },
  },
})
