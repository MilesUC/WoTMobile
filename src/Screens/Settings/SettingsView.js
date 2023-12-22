import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { LogOutUser } from '../../Redux/Reducers/LogOutUser'
const { EXPO_PUBLIC_API_URL } = require('../../Utils/constants')

export default function Settings () {
  const navigation = useNavigation()
  const [responseData, setResponseData] = useState(null)
  const { userData, isLoading, userToken } = useSelector(
    (state) => state.auth)
  const callApiEndpoint = async () => {
    try {
      Alert.alert(
        'Vas a eliminar tu cuenta',
        '¿Estás seguro? No podrás recuperar tus datos.',
        [
          {
            text: 'Volver',
            onPress: () => Alert.alert('Acción cancelada'),
            style: 'cancel'
          },
          {
            text: 'Eliminar mi cuenta',
            onPress: () => deleteUser(),
            style: 'default'
          }
        ],
        {
          cancelable: true,
          onDismiss: () =>
            Alert.alert(
              'Acción cancelada.'
            )
        }
      )
    } catch (error) {
      console.error('API Error:', error)
      Alert.alert('API Call Error', 'An error occurred while fetching data from the API.')
    }
  }

  const url = `${EXPO_PUBLIC_API_URL}/users/delete_account`

  const deleteUser = async () => {
    try {
      const result = await axios.delete(
        url, {
          headers: { Authorization: `Bearer ${userToken}` }
        })
      console.log(result)
      handleSubmit()
    } catch (error) {
      console.log(error)
    }
  }

  const dispatch = useDispatch()
  const handleSubmit = async () => {
    dispatch(LogOutUser())
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={callApiEndpoint} className="items-center" style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: '#EE4296',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10
      }}>
        <Text style={{
          color: '#5A5A5A',
          fontFamily: 'MontserratBold',
          fontSize: 16
        }}>
          Eliminar cuenta
        </Text>
      </TouchableOpacity>
      <View style={{
        marginHorizontal: 20,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center'
      }}>
      <Ionicons name="information-circle-outline" size={20} color="black"/>
        <Text style={{ color: 'black', fontSize: 14 }}>
          Si necesitas asistencia con la aplicación, escribe un correo a help@womantalent.cl.
        </Text>
      </View>
    </View>
  )
}
