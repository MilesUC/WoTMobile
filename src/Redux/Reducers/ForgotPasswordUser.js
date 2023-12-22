import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const { EXPO_PUBLIC_API_URL } = require('../../Utils/constants')

export const ForgotPasswordUser = createAsyncThunk('auth/ForgotPasswordUser', async (userData, thunkAPI) => {
  try {
    console.log(`Forgot Password with ${JSON.stringify(userData)}`)
    const response = await axios.post(`${EXPO_PUBLIC_API_URL}/auth/forgot_password`, userData, {
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
