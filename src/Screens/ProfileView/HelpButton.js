import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, Button } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Help({ buttonStyle, textStyle }) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <View>
      <TouchableOpacity style={buttonStyle} onPress={toggleModal}>
        <Text style={textStyle}> Ayuda </Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
      <View style={{
            marginHorizontal: 20,
            borderColor: 'black',
            borderWidth: 2,
            borderRadius: 10,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F5F5F5',
            height: 'auto',
            marginTop: 50
        }}>
        <Ionicons name="information-circle-outline" size={20} color="black"/>
        <Text style={{ fontFamily: 'MontserratLight', color: 'black', fontSize: 14, marginBottom: 10 }}>
          Si necesitas asistencia con la aplicación, escribe al correo help@womantalent.cl.
        </Text>
        <TouchableOpacity onPress={toggleModal} style={{ backgroundColor: 'white', padding: 5, 
          borderRadius: 5, width: 100, borderWidth: 1, borderColor: '#EE4296', alignItems: 'center'}}>
          <Text style={{ fontFamily: 'MontserratLight', fontSize: 14, color: '#EE4296' }}>
            Cerrar
          </Text>
        </TouchableOpacity>
      </View>
      </Modal>
    </View>
  )
}
