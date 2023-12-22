import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Modal,
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
import * as ImagePicker from 'expo-image-picker'
const { EXPO_PUBLIC_API_URL } = require('../../Utils/constants')

const showAlert = () =>
  Alert.alert(
    'Límite de imágenes',
    'Solamente puedes subir hasta dos imágenes',
    [
      {
        text: 'Ok',
        style: 'cancel'
      }
    ],
    {
      cancelable: true
    }
  )

export default function NewPost (props) {
  const navigation = useNavigation()
  console.log(`props route params: ${JSON.stringify(props.route.params)}`)
  const [textInputValue, setTextInputValue] = useState('')
  const [images, setImages] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const handleInputChange = (text) => {
    setTextInputValue(text)
  }
  const [selectedValue, setSelectedValue] = useState('Categorías')
  const [isOpen, setIsOpen] = useState(false)
  const { userData, userToken } = useSelector((state) => state.auth)
  console.log(`En new post, este es el objeto props: ${JSON.stringify(props)}`)
  const showOptions = () => {
    if (images.length >= 2) {
      showAlert()
    } else {
      setModalVisible(true)
    }
  }
  const SelectFromGallery = async () => {
    setModalVisible(false)

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3]
    })
    if (!result.canceled) {
      const selectedImg = result.assets[0].uri
      setImages([...images, selectedImg])
    }
  }

  const TakePicture = async () => {
    setModalVisible(false)
    if (images.length >= 2) {
      alert('Solo puedes subir un máximo de dos imágenes.')
      return
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3]
    })
    if (!result.canceled) {
      const selectedImg = result.assets[0].uri
      setImages([...images, selectedImg])
    }
  }

  useEffect(() => {
    console.log('Updated images state:', images)
  }, [images])

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
  }

  const handlePost = async () => {
    const formData = new FormData()
    formData.append('communityId', props.route.params.communityData.id)
    formData.append('content', textInputValue)
    images.forEach((image, index) => {
      console.log(image)
      formData.append('multimedia', {
        uri: image,
        type: 'image/jpeg',
        name: `image${index + 1}.jpg`
      })
    })
    const response = await axios.post(
      `${EXPO_PUBLIC_API_URL}/posts/create`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    console.log(response)
    if (response.status === 201) {
      navigation.navigate('Comunidades', { screen: 'Community', params: { communityId: props.route.params.communityData.id } })
    } else if (response.status === 400) {
      console.log(response)
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
              <View style={{ width: '50%', zIndex: 1000 }}>
                <DropDownPicker
                  items={[
                    { label: 'Dancing', value: 'dancing' },
                    { label: 'Singing', value: 'Singing' },
                    { label: 'Swimming', value: 'Swimming' }
                  ]}
                  open={isOpen}
                  setOpen={() => setIsOpen(!isOpen)}
                  value={selectedValue}
                  setValue={(val) => setSelectedValue(val)}
                  placeholder="Categorías"
                  autoScroll
                  showTickIcon={true}
                  theme="LIGHT"
                />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#EE4296',
                  paddingVertical: '1%',
                  paddingHorizontal: '3%',
                  borderRadius: 8,
                  zIndex: -1
                }}
                onPress={handlePost}
              >
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'MontserratBold',
                    fontSize: 17,
                    zIndex: -1
                  }}
                >
                  Publicar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false)
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={{ fontFamily: 'MontserratBold', fontSize: 20, marginBottom: 10 }}>
                    Agrega un máximo de dos imágenes a tu publicación
                  </Text>
                  <TouchableOpacity style={styles.button} onPress={SelectFromGallery}>
                    <Text style={styles.buttonText}>Seleccionar de la galería</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={TakePicture}>
                    <Text style={styles.buttonText}>Tomar una fotografía</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </Modal>
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
              placeholder={
                // props.route.params.isediting
                  // ? 'Estás editando un post...'
                  // :
                  `Publica en la comunidad ${props.route.params.communityData.name}`
              }
              // placeholder={`Vas a publicar en: ${props.route.params.community.description}`}
              placeholderTextColor={'gray'}
              onChangeText={handleInputChange}
            />
          </ScrollView>
        </View>
        <View style={styles.imageContainer}>
        {images.map((img, index) => (
          <View key={index}>
            <Image source={{ uri: img }} style={{ width: 100, height: 100 }} />
            <TouchableOpacity onPress={() => removeImage(index)}>
              <Text style={{ fontFamily: 'MontserratLight' }}>Eliminar imagen</Text>
            </TouchableOpacity>
          </View>
        ))}
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
          <TouchableOpacity style={styles.attachButton}
          onPress={showOptions}>
            <Ionicons name="images" color={'#5A5A5A'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" color={'#5A5A5A'} size={20} />
          </TouchableOpacity>
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
