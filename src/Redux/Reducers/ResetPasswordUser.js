import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const { EXPO_PUBLIC_API_URL } = require('../../Utils/constants')

export const ResetPasswordUser = createAsyncThunk('auth/ResetPasswordUser', async (userData, thunkAPI) => {
  try {
    console.log(`Reset Password with ${JSON.stringify(userData)}`)
    const response = await axios.post(`${EXPO_PUBLIC_API_URL}/auth/reset_password`, userData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: error.message })
  }
})
