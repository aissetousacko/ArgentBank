//reducer and initial state file
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

//* createAsyncThunk : permet d'avoir des fonctions synchronisées et mettre à jour le state

//* For access protected route, we need to get a token with JWT
//* We gonna save the token in the localStorage
const userToken = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null

const initialState = {
  userToken,
  firstName: '',
  lastName: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  rememberMe: false,
}

//*Login
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//*User profile
export const profile = createAsyncThunk(
  'auth/profile',
  async (userData, { getState, thunkAPI }) => {
    try {
      //Get the token from store and use it to get the user data
      const token = getState().auth.userToken
      //console.log('getState: ', token)
      return await authService.profile(userData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//*Update data
export const updateData = createAsyncThunk(
  'auth/updateData',
  async (newData, thunkAPI) => {
    try {
      //Get the token from store and use it to get the user data
      const token = thunkAPI.getState().auth.userToken
      //console.log('getState: ', token)
      return await authService.updateData(newData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Pour gérer les changements d'état
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //logout
    logout: (state) => {
      localStorage.removeItem('token')
      localStorage.clear()
      state.userToken = null
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
      state.rememberMe = false
    },
    //remember me
    isRemember: (state, action) => {
      state.rememberMe = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      //login
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.isError = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userToken = action.payload.body.token
        state.isError = null
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      //profile
      .addCase(profile.pending, (state) => {
        state.isLoading = true
        state.isError = null
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.firstName = action.payload.firstName
        state.lastName = action.payload.lastName
        state.isError = false
      })
      .addCase(profile.rejected, (state) => {
        state.isLoading = false
      })
      //update
      .addCase(updateData.pending, (state) => {
        state.isLoading = true
        state.firstName = ''
        state.lastName = ''
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.firstName = action.payload.firstName
        state.lastName = action.payload.lastName
        state.isError = false
      })
      .addCase(updateData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { logout, isRemember } = authSlice.actions
export default authSlice.reducer
