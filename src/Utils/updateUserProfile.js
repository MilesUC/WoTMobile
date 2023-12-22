import { handleUserDataUpdate } from './handleUserDataUpdate'
import axios from 'axios'
const { EXPO_PUBLIC_API_URL } = require('./constants')

export async function updateUserProfile (data, userToken, dispatch) {
  console.log(`Entró al updateUserProfile con ${JSON.stringify(data)}`)
  const response = await axios.patch(
      `${EXPO_PUBLIC_API_URL}/users/edit_profile`,
      data,
      { headers: { Authorization: `Bearer ${userToken}` } }
  )
  console.log(response.data)
  if (response.status === 200) {
    await handleUserDataUpdate(userToken, dispatch)
    return response
  } else {
    console.log('Error updateUserProfile')
    return response
  }
}
