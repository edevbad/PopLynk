import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated : false,
  user : {},
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate : (state,user)=>{
        state.isAuthenticated = true
        state.user = user
    },
    logout : (state)=>{
      state.isAuthenticated = false
        state.user = null
    }
  },
})
// Action creators are generated for each case reducer function
export const { authenticate,logout} = authSlice.actions

export default authSlice.reducer