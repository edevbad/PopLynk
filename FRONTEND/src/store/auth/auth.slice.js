import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  isAuthenticated : false,
  user : null,
  isLoading : false
}

export const checkAuth = createAsyncThunk('/auth/authorize',
  async (_,{rejectWithValue}) => {
    try {
      const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/auth/authorize",
          { withCredentials: true });          
      return response.data; 
    } catch (error) {      
      return rejectWithValue(error.response?.data || { message: "Something went wrong" });
    }
  })

  export const loginUser = createAsyncThunk('/auth/login',
  async (formData,{rejectWithValue}) => {    
    try {
     const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL+"/auth/login",
        formData,
        { withCredentials: true }
      );
      
      return response.data; // ✅ send data to fulfilled
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong" });
    }
  }
)

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
    },
  },
    extraReducers : (builder)=> {
       builder.addCase(checkAuth.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {          
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.isLoading = false;
        })
        .addCase(checkAuth.rejected, (state) => {
          state.isAuthenticated = false;
          state.user = null;
          state.isLoading = false;
        }).addCase(loginUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.isLoading = false;
        })
        .addCase(loginUser.rejected, (state) => {
          state.isAuthenticated = false;
          state.user = null;
          state.isLoading = false;
        })
    }
})
// Action creators are generated for each case reducer function
export const { authenticate,logout} = authSlice.actions

export default authSlice.reducer