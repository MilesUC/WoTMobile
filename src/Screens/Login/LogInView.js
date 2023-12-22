import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import { Image } from 'expo-image'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { LogInUser } from '../../Redux/Reducers/LogInUser'
import { signUpUser } from '../../Redux/Reducers/signUpUser'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { deviceHeight } from '../../Components/Dimensions'
import ToastManager, { Toast } from 'toastify-react-native'
import { Ionicons } from '@expo/vector-icons'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import { cancelLoading } from '../../Redux/Slices/userAuthSlice'

export default function LogInView () {
  const navigation = useNavigation()
  const { loading, error, isLoggedIn } = useSelector(
    (state) => state.auth)
  const [isEmailFocused, setEmailFocused] = useState(false)
  const [isPasswordFocused, setPasswordFocused] = useState(false)
  const [formData, setFormData] = useState({ mail: '', password: '' })
  const dispatch = useDispatch()
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  // useEffect(() => {
  //   dispatch(cancelLoading())
  // }, [])

  const handleGoogleLogin = async () => {
    const androidClientId = '709246120344-kpi7772negiuvr58hrf6ptu8tm76oesf.apps.googleusercontent.com'
    const iosClientId = '709246120344-7767enpi1a21hfpept92p24bggg3jaeo.apps.googleusercontent.com'
    GoogleSignin.configure({ androidClientId, iosClientId })
    GoogleSignin.hasPlayServices().then((hasPlayService) => {
      if (hasPlayService) {
        GoogleSignin.signIn().then((userInfo) => {
          manageGoogleLogin(userInfo)
        }).catch((e) => {
          console.log('Error en Google SignIn: ' + JSON.stringify(e))
        })
      }
    }).catch((e) => {
      console.log('Error en Google PlayService: ' + JSON.stringify(e))
    })
  }

  const manageGoogleLogin = async (userInfo) => {
    Toast.success('Iniciando sesión con Google...')
    const loginData = {
      mail: userInfo.user.email,
      password: userInfo.user.id + 'Wot_'
    }
    dispatch(LogInUser(loginData))
    if (!isLoggedIn) {
      const signUpData = {
        mail: userInfo.user.email,
        password: userInfo.user.id + 'Wot_',
        name: userInfo.user.givenName,
        lastName: userInfo.user.familyName
      }
      dispatch(signUpUser(signUpData))
    }
  }

  const handleSubmit = async () => {
    const modifiedFormData = {
      ...formData,
      mail: formData.mail.toLowerCase()
    }
    await dispatch(LogInUser(modifiedFormData))
    if (error) {
      Toast.error('Datos inválidos')
    } else {
      Toast.success('Iniciando sesión...')
    }
  }

  const [isPasswordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible)
  }

  return (
    <View style={styles.container}>
      <ToastManager />
      <ScrollView>

      <StatusBar style='dark' />

      <Animated.View entering={FadeInDown.duration(1000).springify()} className='flex-row justify-around w-full absolute'>
        <Image style={styles.image} source={require('../../../assets/Images/logo.png')} />
      </Animated.View>

      <View className='w-full flex justify-center pt-80 pb-10'>
        <View className='flex items-center'>
          <Animated.Text style={styles.textWelcome} entering={FadeInUp.duration(1000).springify()}>Bienvenido a Wot</Animated.Text>
        </View>
        <Animated.Text
          style={{ fontFamily: 'MontserratLight', textAlign: 'center', fontSize: 16, marginTop: 5 }}
          entering={FadeInUp.duration(1000).springify()}
        >
          Entrar con
        </Animated.Text>
      </View>
      <Animated.View
        entering={FadeInDown.delay(100).duration(1000).springify()}
        className="flex-row justify-center"
      >
        <TouchableOpacity onPress={handleGoogleLogin} className="flex flex-row items-center justify-center w-2/5 rounded-lg bg-neutral-50 shadow p-3 mb-3 mr-4 border-0.5 border-slate-950">
          <Ionicons size={19} color={'#5A5A5A'} name={'logo-google'} className="mr-2" />
          <Text style={{ fontFamily: 'MontserratLight', marginLeft: 5 }} className="text-xl text-black text-center">Google</Text>
        </TouchableOpacity>
      </Animated.View>
      <View className='flex items-center mx-5 space-y-4 my-5'>
        <Animated.View
          style={[styles.input, isEmailFocused ? styles.focusedInput : {}]}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          entering={FadeInDown.duration(1000).springify()}
        >
          <TextInput
            style={styles.text}
            onChangeText={(text) => handleChange('mail', text)}
            value={formData.mail}
            placeholder='Email'
            placeholderTextColor={'gray'}
          />
        </Animated.View>
        <Animated.View
          style={[styles.input, isPasswordFocused ? styles.focusedInput : {}]}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          entering={FadeInDown.delay(200).duration(1000).springify()}
        >
          <TextInput
            style={styles.text}
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry={!isPasswordVisible}
            placeholder='Contraseña'
            placeholderTextColor={'gray'}
            value={formData.password}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={{ position: 'absolute', right: 10, top: 15 }}>
            <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={20} color={isPasswordFocused ? '#EE4296' : 'gray'} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={styles.button} entering={FadeInDown.delay(400).duration(1000).springify()} className='w-full'>
          <TouchableOpacity onPress={() => handleSubmit()} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.textButton}>Entrar</Text>
          </TouchableOpacity>
        </Animated.View>
        {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EE4296" />
        </View>
        )}
        <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className='justify-center'>
          <Text style={{ ...styles.text, fontSize: 17 } }>¿No tienes cuenta?</Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className='justify-center'>
          <TouchableOpacity onPress={() => navigation.push('SignUp')}>
            <Text style={{ ...styles.text, fontSize: 17, color: '#EE4296', bottom: 10 }}>Crea aquí</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{
          ...styles.button,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: '#D9D9D9',
          shadowColor: '#D9D9D9',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 4
        }} entering={FadeInDown.delay(1000).duration(1000).springify()} className='w-full'>
          <TouchableOpacity onPress={() => navigation.push('ForgotPassword')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ ...styles.textButton, color: '#5A5A5A' }}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 100,
    top: deviceHeight * 0.225,
    contentFit: 'contain'
  },
  textWelcome: {
    fontFamily: 'MontserratBold',
    fontSize: 30,
    fontWeight: 900,
    color: '#5A5A5A'
  },
  text: {
    fontFamily: 'MontserratLight',
    fontSize: 18,
    color: '#9D9D9D'
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 7,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'left',
    paddingLeft: 20
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 7,
    backgroundColor: '#5A5A5A'
  },
  textButton: {
    fontFamily: 'MontserratLight',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  focusedInput: {
    borderColor: '#EE4296',
    borderWidth: 1
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  container: {
    backgroundColor: 'white'
  }
})
