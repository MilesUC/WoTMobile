import { Alert } from 'react-native'
import { updateUserProfile } from '../../Utils/updateUserProfile'

const callDeleteEndpoint = async (field, userToken, navigation, dispatch) => {
  try {
    Alert.alert(
      'Vas a eliminar este campo',
      '¿Estás seguro?',
      [
        {
          text: 'Volver',
          onPress: () => Alert.alert('Acción cancelada'),
          style: 'cancel'
        },
        {
          text: 'Eliminar',
          onPress: () => handleDeleteField(field, userToken, navigation, dispatch),
          style: 'default'
        }
      ],
      {
        cancelable: true,
        onDismiss: () => Alert.alert('Acción cancelada.')
      }
    )
  } catch (error) {
    console.error('API Error:', error)
    Alert.alert('Error al eliminar el campo. Inténtalo de nuevo.')
  }
}

const handleDeleteField = async (field, userToken, navigation, dispatch) => {
  try {
    console.log(`${field} ${userToken} ${navigation} ${dispatch}`)
    const value = Array.isArray(field) ? [] : ''
    const newData = { [field]: value }
    console.log(newData)
    await updateUserProfile(newData, userToken, dispatch)
    await navigation.reset({
      index: 0,
      routes: [
        { name: 'Perfil', params: { screen: 'ProfileScreen' } }
      ]
    })
  } catch (err) {
    console.log(err)
  }
}

export { callDeleteEndpoint }
