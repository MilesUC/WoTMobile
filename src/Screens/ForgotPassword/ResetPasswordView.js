import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import ToastManager, { Toast } from 'toastify-react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ResetPasswordUser } from '../../Redux/Reducers/ResetPasswordUser'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'

const ResetPasswordView = () => {
  const navigation = useNavigation()
  const { isLoading, error } = useSelector(
    (state) => state.auth)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ code: '', newPassword: '' })
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  const route = useRoute()
  const mail = route.params.mail

  const handleSubmit = async () => {
    const modifiedFormData = {
      ...formData,
      mail: mail.toLowerCase()
    }
    await dispatch(ResetPasswordUser(modifiedFormData))
    if (error) {
      Toast.error('Código o contraseña inválidos')
    } else {
      Toast.success('Contraseña cambiada exitosamente')
      navigation.push('LogIn')
    }
  }

  const [isCodeVisible, setCodeVisible] = useState(false) // Estado para controlar la visibilidad de la contraseña Estado para almacenar la contraseña

  const toggleCodeVisibility = () => {
    setCodeVisible(!isCodeVisible) // Cambia el estado para mostrar/ocultar la contraseña
  }

  const [isPasswordVisible, setPasswordVisible] = useState(false) // Estado para controlar la visibilidad de la contraseña Estado para almacenar la contraseña

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible) // Cambia el estado para mostrar/ocultar la contraseña
  }

  return (
    <>
    <ToastManager />
    <View className='bg-white h-full w-full'>
    <ScrollView style={{ marginHorizontal: '2%' }}>
    <StatusBar style='dark' />

    <View className='w-full flex justify-center pt-80 pb-10 flex items-center space-y-4'>
      <View className='flex items-center'>
        <Animated.Text style={styles.textForgotPassword} entering={FadeInUp.duration(200).springify()}>¿Olvidaste tu contraseña?</Animated.Text>
      </View>
      <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className='justify-center'>
        <Text style={ styles.textInstructions }>Ingresa el código que enviamos a tu correo y tu nueva contraseña</Text>
      </Animated.View>
      <Animated.View style={styles.input} entering={FadeInDown.delay(800).duration(1000).springify()}>
          <TextInput
            style={styles.text}
            onChangeText={(text) => handleChange('code', text)}
            secureTextEntry={!isCodeVisible}
            placeholder='Código de verificación'
            placeholderTextColor={'gray'}
            value={formData.code}
          />
          <TouchableOpacity onPress={toggleCodeVisibility} style={{ position: 'absolute', right: 10, top: 15 }}>
            <Icon name={isCodeVisible ? 'eye-slash' : 'eye'} size={20} color="gray" />
          </TouchableOpacity>
        </Animated.View>
      <Animated.View style={styles.input} entering={FadeInDown.delay(1000).duration(1000).springify()}>
          <TextInput
            style={styles.text}
            onChangeText={(text) => handleChange('newPassword', text)}
            secureTextEntry={!isPasswordVisible}
            placeholder='Contraseña'
            placeholderTextColor={'gray'}
            value={formData.newPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={{ position: 'absolute', right: 10, top: 15 }}>
            <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="gray" />
          </TouchableOpacity>
        </Animated.View>
      <Animated.View style={styles.button} entering={FadeInDown.delay(1200).duration(1000).springify()} className='w-full'>
        <TouchableOpacity onPress={() => handleSubmit()}>
          <Text style={styles.textButton}>Confirmar</Text>
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
    fontSize: 15,
    color: '#5A5A5A',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 7,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'left',
    paddingLeft: 20
  },
  button: {
    top: 20,
    width: 323,
    height: 50,
    borderRadius: 7,
    backgroundColor: '#EE4296'
  },
  textButton: {
    fontFamily: 'MontserratLight',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    paddingTop: 15
  }
})

export default ResetPasswordView
