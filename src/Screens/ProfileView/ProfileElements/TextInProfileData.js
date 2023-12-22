import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { callDeleteEndpoint } from '../../../Components/Fields/DeleteTextFieldComponent'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

const TextInProfileData = ({ fieldName, title, subtitle, menuToEdit, userToken }) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const navigate = useNavigation()
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name='ellipsis-horizontal-circle-sharp' size={34} color={'#EE4296'}/>
      </TouchableOpacity>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible)
        }}
      >
        <View style={styles.overlay}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setModalVisible(false)} />
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.button} onPress={() => {
              navigate.navigate(menuToEdit)
            }}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
              callDeleteEndpoint(fieldName, userToken, navigate, dispatch)
              setModalVisible(!isModalVisible)
            }}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    marginBottom: 10
  },
  textContainer: {
    flex: 1
  },
  title: {
    fontSize: 14,
    color: '#5A5A5A',
    fontFamily: 'MontserratBold'
  },
  subtitle: {
    fontSize: 14,
    color: '#5A5A5A',
    marginTop: 5,
    fontFamily: 'MontserratLight'
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 10
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'stretch',
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
    padding: '5%',
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'MontserratLight'
  }
})

export default TextInProfileData
