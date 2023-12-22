import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const { EXPO_PUBLIC_API_URL } = require('../../Utils/constants')

export const signUpUser = createAsyncThunk('auth/signUpUser', async (userData, thunkAPI) => {
  try {
    delete userData.passwordConfirmation
    console.log(`Signing up with ${JSON.stringify(userData)}`)
    const response = await axios.post(`${EXPO_PUBLIC_API_URL}/auth/signup`, userData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    console.log(response.data)
    const profileResponse = await axios.get(`${EXPO_PUBLIC_API_URL}/users/get_profile`, {
      headers: { Authorization: `Bearer ${response.data.access_token}` }
    })

    const userProfileData = profileResponse.data
    console.log(userProfileData)
    return {
      access_token: response.data.access_token,
      userData: userProfileData
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: error.message })
  }
})
