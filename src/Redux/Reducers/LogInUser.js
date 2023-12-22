import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { DetermineIfUserDataIsComplete } from '../../Utils/isUserDataComplete'
const { EXPO_PUBLIC_API_URL, EXPO_AI_API_URL } = require('../../Utils/constants')

export const LogInUser = createAsyncThunk('auth/LogInUser', async (userData, thunkAPI) => {
  try {
    console.log(`Logging in with ${JSON.stringify(userData)}`)
    const response = await axios.post(`${EXPO_PUBLIC_API_URL}/auth/login`, userData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    const userToken = response.data.access_token
    if (!userToken) {
      throw new Error('Token not found')
    }

    const profileResponse = await axios.get(`${EXPO_PUBLIC_API_URL}/users/get_profile`, {
      headers: { Authorization: `Bearer ${response.data.access_token}` }
    })

    const recommendedCommunities = await axios.get(`${EXPO_AI_API_URL}/default/wotrecommendercommunities`, {
      headers: { Authorization: `Bearer ${response.data.access_token}` }
    })

    const userProfileData = profileResponse.data
    const { isUserDataComplete, percentageOfUserDataCompletion } = DetermineIfUserDataIsComplete(userProfileData)
    console.log(userProfileData)
    // console.log(`Las comunidades recomendadas son las siguientes ${JSON.stringify(recommendedCommunities)}`)
    return {
      access_token: userToken,
      userData: userProfileData,
      isUserDataComplete,
      percentageOfUserDataCompletion,
      recommendedCommunities: recommendedCommunities.data
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: error.message })
  }
})
