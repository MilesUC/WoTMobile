import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { ProfilePicWithBadge } from '../../Components/ProfilePicWithBadge'
import { Ionicons } from '@expo/vector-icons'
import DropDownPicker from 'react-native-dropdown-picker'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import ToastManager, { Toast } from 'toastify-react-native'
import CustomLoader from '../../Components/CustomLoader'
import { Image } from 'expo-image'
const { EXPO_PUBLIC_API_URL } = require('../../Utils/constants')

export default function EditPost ({ route }) {
  const { postId, communityId, originalContent } = route.params
  console.log(postId + ' ' + communityId + ' ' + originalContent)
  const navigation = useNavigation()
  const [textInputValue, setTextInputValue] = useState(originalContent || '')
  const handleInputChange = (text) => {
    setTextInputValue(text)
  }
  const [isOpen, setIsOpen] = useState(false)
  const { userData, userToken } = useSelector((state) => state.auth)
  const handlePost = async () => {
    if (textInputValue.trim().length < 4) {
      Alert.alert('Error', 'El contenido debe tener al menos cuatro caracteres.')
      return
    }
    console.log(postId + ' ' + communityId + ' ' + originalContent)
    console.log('Va a intentar hacer un patch con ' + textInputValue)
    try {
      const response = await axios.patch(
        `${EXPO_PUBLIC_API_URL}/posts/${postId}`,
        { content: textInputValue },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      console.log(response)
      if (response.status === 200) {
        Toast.success('Publicación editada correctamente.')
        navigation.navigate('Comunidades', { screen: 'Community', params: { communityId } })
      } else {
        console.log(response)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
      <>
        <ToastManager />
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <View
            style={{
              marginTop: '15%',
              height: 270,
              flex: 1
            }}
          >
            <View
              style={{ flexDirection: 'row', height: 40, alignItems: 'center' }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  zIndex: 100,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginLeft: '5%',
                  marginRight: '5%'
                }}
              >
                <ProfilePicWithBadge
                  badge={true}
                />
                <Text style={{fontFamily: 'MontserratLight', fontSize: 16 }}> Edita tu publicación </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#EE4296',
                    paddingVertical: '1%',
                    paddingHorizontal: '3%',
                    borderRadius: 8,
                    zIndex: -1
                  }}
                  onPress={() => handlePost()}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'MontserratBold',
                      fontSize: 17,
                      zIndex: -1
                    }}
                  >
                    Guardar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.horizontalLine2} />
            <ScrollView
              zIndex={-4}
              onS={() => {
                Keyboard.dismiss()
              }}
            >
              <TextInput
                keyboardType="default"
                multiline={true}
                style={{
                  marginLeft: '10%',
                  marginRight: '10%',
                  color: '#5A5A5A',
                  fontSize: 18,
                  paddingTop: 40,
                  fontFamily: 'MontserratLight',
                  zIndex: -5
                }}
                value={textInputValue}
                // placeholder={`Vas a publicar en: ${props.route.params.community.description}`}
                placeholderTextColor={'gray'}
                onChangeText={handleInputChange}
              />
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              elevation: 1,
              paddingVertical: 20,
              justifyContent: 'flex-start'
            }}
          >
          </View>
        </View>
      </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  attachButton: {
    paddingHorizontal: 10,
    marginHorizontal: 10
  },
  horizontalLine2: {
    borderBottomColor: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 2,
    width: '100%',
    marginTop: 10,
    zIndex: -2
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)' // This is a semi-transparent background
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#5A5A5A',
    borderRadius: 10
  },
  buttonText: {
    fontFamily: 'MontserratLight',
    fontSize: 16,
    color: '#333'
  },
  text: {
    fontFamily: 'MontserratLight'
  },
  imageContainer: {
    flexDirection: 'row', // Align children (images) in a row
    justifyContent: 'space-around', // Distribute space evenly around children
    alignItems: 'center', // Align children vertically in the center
    marginTop: 10
  }
})
