import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
      authenticated: false,
  },
  reducers: {
    login: (state) => { 
      state.authenticated = true
    },
    logout: (state) => {
      state.authenticated = false
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer