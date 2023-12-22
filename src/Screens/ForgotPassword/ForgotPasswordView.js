import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import ToastManager, { Toast } from 'toastify-react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ForgotPasswordUser } from '../../Redux/Reducers/ForgotPasswordUser'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const ForgotPasswordView = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector(
    (state) => state.auth)
  const [formData, setFormData] = useState({ mail: '' })
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  const handleSubmit = async () => {
    const modifiedFormData = {
      ...formData,
      mail: formData.mail.toLowerCase()
    }
    await dispatch(ForgotPasswordUser(modifiedFormData))
    await new Promise(sleep => setTimeout(sleep, 1200))
    if (error) {
      Toast.error('Email no válido')
    } else {
      Toast.success('Email enviado')
      navigation.push('ResetPassword', { mail: formData.mail })
    }
  }

  return (
    <>
    <ToastManager />
    <View className='bg-white h-full w-full'>
    <ScrollView style={{ marginHorizontal: '3%' }}>
    <StatusBar style='dark' />

    <View className='w-full flex justify-center pt-80 pb-10 flex items-center space-y-4'>
      <View className='flex items-center'>
        <Animated.Text style={styles.textForgotPassword} entering={FadeInUp.duration(200).springify()}>¿Olvidaste tu contraseña?</Animated.Text>
      </View>
      <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className='justify-center'>
        <Text style={styles.textInstructions}>Ingresa tu correo para recuperar tu contraseña</Text>
      </Animated.View>
      <Animated.View style={styles.input} entering={FadeInDown.delay(600).duration(1000).springify()}>
        <TextInput style={styles.text} onChangeText={(text) => handleChange('mail', text)} value={formData.mail} placeholder='Correo electrónico' placeholderTextColor={'gray'} />
      </Animated.View>
      <Animated.View style={styles.button} entering={FadeInDown.delay(800).duration(1000).springify()} className='w-full'>
        <TouchableOpacity onPress={() => handleSubmit()}>
          <Text style={styles.textButton}>Enviar</Text>
        </TouchableOpacity>
      </Animated.View>
      </View>
      </ScrollView>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  textForgotPassword: {
    fontFamily: 'MontserratBold',
    fontSize: 30,
    color: '#5A5A5A'
  },
  text: {
    fontFamily: 'MontserratLight',
    fontSize: 16,
    color: '#5A5A5A'
  },
  textInstructions: {
    fontFamily: 'MontserratLight',
    fontSize: 17,
    color: '#5A5A5A',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 7,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'left',
    paddingLeft: 20,
    paddingRight: 20
  },
  button: {
    top: 20,
    width: '100%',
    height: 50,
    borderRadius: 7,
    backgroundColor: '#EE4296',
    alignItems: 'center'
  },
  textButton: {
    fontFamily: 'MontserratLight',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    paddingTop: 15
  }
})

export default ForgotPasswordView
