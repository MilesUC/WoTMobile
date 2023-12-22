import { createAsyncThunk } from '@reduxjs/toolkit'

export const LogOutUser = createAsyncThunk('auth/LogOutUser', async (userData, thunkAPI) => {
  try {
    console.log('Logging out')
    /* const response = await axios.post(`${BASE_URL}/auth/logout`, userData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return response.data */
    return 'Logout'
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: error.message })
  }
})
