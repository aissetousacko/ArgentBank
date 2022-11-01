//reducer and initial state file
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

//* createAsyncThunk : permet d'avoir des fonctions synchronisées et mettre à jour le state

//* For access protected route, we need to get a token with JWT
//* We gonna save the token in the localStorage
//* Get user from localStorage
const userToken = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null

const initialState = {
  userToken,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//*Login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      return await authService.login({ email, password })
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

//*Logout
/* export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
}) */

//Pour gérer les changements d'état
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //logout
    logout: (state) => {
      localStorage.removeItem('userToken')
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    },
  },
  //remember me
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userToken = action.payload.body.token
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
