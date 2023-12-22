import axios from 'axios'
import { updateUserData } from '../Redux/Slices/userAuthSlice'
import { DetermineIfUserDataIsComplete } from './isUserDataComplete'
const { EXPO_PUBLIC_API_URL } = require('./constants')

async function retrieveUserProfile (userToken) {
  const response = await axios.get(`${EXPO_PUBLIC_API_URL}/users/get_profile`,
    { headers: { Authorization: `Bearer ${userToken}` } })
  const userData = response.data
  console.log(`Los nuevos datos del usuario, luego de retrieveUserProfile, son ${JSON.stringify(userData)}`)
  return userData
}

export async function handleUserDataUpdate (userToken, dispatch) {
  const userData = await retrieveUserProfile(userToken)
  console.log(`userData in handleUserDataUpdate is this: ${JSON.stringify(userData)}`)
  const { isUserDataComplete, percentageOfUserDataCompletion } = DetermineIfUserDataIsComplete(userData)
  console.log(`In handleUserDataUpdate, the % is: ${percentageOfUserDataCompletion}`)
  if (percentageOfUserDataCompletion !== undefined) {
    dispatch(updateUserData({
      userData,
      isUserDataComplete,
      percentageOfUserDataCompletion
    }))
  } else {
    console.log('Percentage of user data completion is undefined')
  }
}
