import { StatusBar } from 'expo-status-bar'
import React, { useRef, useState } from 'react'
import {
  View, StyleSheet, Text,
  TextInput, TouchableOpacity,
  ActivityIndicator, ScrollView,
  Platform
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { signUpUser } from '../../Redux/Reducers/signUpUser.js'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Swiper from 'react-native-swiper'
import { Image } from 'expo-image'
import ToastManager, { Toast } from 'toastify-react-native'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
// import { cancelLoading } from '../../Redux/Slices/userAuthSlice.js'

const singUpSchemaFirstFields = Yup.object().shape({
  mail: Yup.string()
    .label('Email')
    .email('Email Inválido')
    .required('Por favor, ingresa un mail válido.'),
  name: Yup.string().label('Name').required('Por favor, ingresa un nombre.'),
  lastName: Yup.string()
    .label('LastName')
    .required('Por favor, ingresa tu apellido.')
})

const handleGoogleSignUp = async () => {
  const androidClientId = '709246120344-kpi7772negiuvr58hrf6ptu8tm76oesf.apps.googleusercontent.com'
  const iosClientId = '709246120344-7767enpi1a21hfpept92p24bggg3jaeo.apps.googleusercontent.com'
  GoogleSignin.configure({ androidClientId, iosClientId })
  GoogleSignin.hasPlayServices().then((hasPlayService) => {
    if (hasPlayService) {
      GoogleSignin.signIn().then((userInfo) => {
        manageGoogleSignUp(userInfo)
      }).catch((e) => {
        console.log('Error en Google SignIn: ' + JSON.stringify(e))
      })
    }
  }).catch((e) => {
    console.log('Error en Google PlayService: ' + JSON.stringify(e))
  })
}

const manageGoogleSignUp = async (userInfo) => {
  const dispatch = useDispatch()
  Toast.success('Registro con Google en proceso...')
  const signUpData = {
    mail: userInfo.user.email,
    password: userInfo.user.id + 'Wot_',
    name: userInfo.user.givenName,
    lastName: userInfo.user.familyName
  }
  dispatch(signUpUser(signUpData))
}

function SignUpFirstComponent ({ onNextPressed }) {
  const navigation = useNavigation()
  const handleSubmitForm = async (formData) => {
    onNextPressed(formData, 0)
  }
  return (
    <Formik
      initialValues={{ mail: '', name: '', lastName: '' }}
      validationSchema={singUpSchemaFirstFields}
      onSubmit={(values) => handleSubmitForm(values)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        handleSubmit
      }) => (
        <View className="bg-white h-full w-full">
          <ScrollView>
            <ToastManager/>
            <StatusBar style="dark" />

            <View className="w-full flex justify-center pt-60 pb-4">
              <View className="flex items-center">
                <Animated.Text
                  style={styles.textWelcome}
                  entering={FadeInUp.duration(1000).springify()}
                >
                  Regístrate
                </Animated.Text>
                <Animated.Text
                  style={{ fontFamily: 'MontserratLight' }}
                  entering={FadeInUp.duration(1000).springify()}
                >
                  Entrar con
                </Animated.Text>
              </View>
            </View>
            <Animated.View
              entering={FadeInDown.delay(100).duration(1000).springify()}
              className="flex-row justify-center"
            >
              <TouchableOpacity onPress={handleGoogleSignUp} className="flex flex-row items-center justify-center w-2/5 rounded-lg bg-neutral-50 shadow p-3 mb-3 mr-4 border-0.5 border-slate-950">
                <Ionicons size={19} color={'#5A5A5A'} name={'logo-google'} className="mr-2" />
                <Text style={{ fontFamily: 'MontserratLight', marginLeft: 5 }} className="text-xl text-black text-center">Google</Text>
              </TouchableOpacity>
            </Animated.View>
            <View className="flex items-center mx-5 space-y-3 my-5">
              <Animated.View
                entering={FadeInDown.delay(200).duration(1000).springify()}
                className="bg-black/5 p-5 rounded-xl w-full"
              >
                <TextInput
                  value={values.name}
                  placeholder="Nombre"
                  onChangeText={handleChange('name')}
                  onBlur={() => setFieldTouched('name')}
                  placeholderTextColor={'gray'}
                />
              </Animated.View>
              {touched.name && errors.name && (
                <Text style={styles.errorTxt}>{errors.name}</Text>
              )}
              <Animated.View
                entering={FadeInDown.delay(400).duration(1000).springify()}
                className="bg-black/5 p-5 rounded-xl w-full"
              >
                <TextInput
                  value={values.lastName}
                  placeholder="Apellido"
                  onChangeText={handleChange('lastName')}
                  onBlur={() => setFieldTouched('lastName')}
                  placeholderTextColor={'gray'}
                />
              </Animated.View>
              {touched.lastName && errors.lastName && (
                <Text style={styles.errorTxt}>{errors.lastName}</Text>
              )}
              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
                className="bg-black/5 p-5 rounded-xl w-full"
              >
                <TextInput
                  value={values.mail}
                  onChangeText={handleChange('mail')}
                  onBlur={() => setFieldTouched('mail')}
                  placeholder="Correo electrónico"
                  placeholderTextColor={'gray'}
                />
              </Animated.View>
              {touched.mail && errors.mail && (
                <Text style={styles.errorTxt}>{errors.mail}</Text>
              )}
              <Animated.View
                entering={FadeInDown.delay(800).duration(1000).springify()}
                className="w-full"
              >
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="w-full bg-zinc-600 p-3 rounded-xl mb-3"
                >
                  <Text className="text-xl text-white text-center">
                    Continuar
                  </Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View
                entering={FadeInDown.delay(800).duration(1000).springify()}
                className="flex-column justify-center align-center"
              >
                <Text style={{ fontFamily: 'MontserratLight', textAlign: 'center' }}>¿Ya tienes cuenta?</Text>
                <TouchableOpacity onPress={() => navigation.push('LogIn')}>
                  <Text style={{ fontFamily: 'MontserratLight', textAlign: 'center' }} className="text-sky-600">Iniciar sesión</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </ScrollView>
        </View>
      )}
    </Formik>
  )
}

const singUpSchemaSecondFields = Yup.object().shape({
  password: Yup.string()
    .label('Contraseña')
    .required('Ingresa una contraseña.')
    .min(8, 'La contraseña debe contener al menos 8 caracteres.')
    .matches(/(?=.*[0-9])/, 'La contraseña debe contener al menos un número.')
    .matches(/(?=.*[A-Z])/, 'La contraseña debe contener al menos una letra mayúscula.'),
  passwordConfirmation: Yup.string()
    .label('Confirmación de contraseña')
    .required('Confirma tu contraseña.')
    .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir.')
})

function SignUpSecondComponent ({ onNextPressed, values }) {
  const handleSubmitForm = async (formData) => {
    formData.mail = values.mail.toLowerCase()
    formData.name = values.name
    formData.lastName = values.lastName
    onNextPressed(formData, 1)
  }
  return (
    <Formik
      initialValues={{ password: '', passwordConfirmation: '' }}
      validationSchema={singUpSchemaSecondFields}
      onSubmit={(values) => handleSubmitForm(values)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        handleSubmit
      }) => (
        <View className="bg-white h-full w-full">
          <ScrollView>
            <StatusBar style="dark" />

            <View className="w-full flex justify-center pt-60 pb-4">
              <View className="flex items-center">
                <Animated.Text
                  style={styles.textWelcome}
                  entering={FadeInUp.duration(1000).springify()}
                >
                  Ingresa tu clave
                </Animated.Text>
                <Animated.Text
                  style={styles.text}
                  entering={FadeInUp.duration(1000).springify()}
                >
                  La clave debe tener como mínimo 8 caracteres, una mayúscula y un número
                </Animated.Text>
              </View>
            </View>
            <View className="flex items-center mx-5 space-y-3 my-5">
              <Animated.View
                entering={FadeInDown.delay(200).duration(1000).springify()}
                className="bg-black/5 p-5 rounded-xl w-full"
              >
                <TextInput
                  placeholder="Nueva contraseña"
                  secureTextEntry
                  value={values.password}
                  blurOnSubmit={false}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  placeholderTextColor={'gray'}
                />
              </Animated.View>
              {touched.password && errors.password && (
                <Text style={styles.errorTxt}>{errors.password}</Text>
              )}
              <Animated.View
                entering={FadeInDown.delay(400).duration(1000).springify()}
                className="bg-black/5 p-5 rounded-xl w-full"
              >
                <TextInput
                  placeholder="Confirmar contraseña"
                  onChangeText={handleChange('passwordConfirmation')}
                  secureTextEntry
                  value={values.passwordConfirmation}
                  onBlur={() => setFieldTouched('passwordConfirmation')}
                  placeholderTextColor={'gray'}
                />
              </Animated.View>
              {touched.passwordConfirmation && errors.passwordConfirmation && (
                <Text style={styles.errorTxt}>
                  {errors.passwordConfirmation}
                </Text>
              )}
              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
                className="w-full "
              >
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="w-full bg-zinc-600 p-3 rounded-xl mb-3 "
                >
                  <Text className="text-xl font-bold text-white text-center">
                    Continuar
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </ScrollView>
        </View>
      )}
    </Formik>
  )
}

function SignUpThirdComponent ({ values, dispatchSignUp }) {
  const dispatch = useDispatch()

  const buttonStyle = {
    backgroundColor: '#FF1695',
    left: '10%'
  }
  const buttonText = 'Ingresar'
  const text1 = '¡Felicitaciones!'
  const text2 = 'Tu cuenta está lista'

  const handleSubmit = async () => {
    dispatchSignUp()
  }

  return (
    <View className="bg-white h-full w-full">
      <ScrollView>
        <View className="w-full flex justify-center pt-60 pb-4">
            <Image
              source={require('../../../assets/Icons/profileIcon.png')}
              style={{
                width: 200,
                height: 200,
                borderRadius: 400 / 2,
                left: '25%',
                borderColor: '#EE4296',
                borderWidth: 1
              }}
            />
          <View className="flex justify-center pt-10 pb-4">
            <View className="flex items-center">
              <Animated.Text
                style={styles.textWelcome}
                entering={FadeInUp.duration(1000).springify()}
              >
                {text1}
              </Animated.Text>
              <Animated.Text entering={FadeInUp.duration(1000).springify()} style={ styles.textWelcome2 }>
                {text2}
              </Animated.Text>
            </View>
          </View>
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="w-full "
          >
            <TouchableOpacity
              onPress={handleSubmit}
              className="w-4/5 p-3 rounded-xl mb-3 mt-24"
              style={buttonStyle}
            >
              <Text className="text-xl font-bold text-white text-center">
                {buttonText}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  )
}

export default function SignUpView () {
  const swiperRef = useRef(null)
  const navigation = useNavigation()
  const [formData, setFormData] = useState({})

  const nextSwipe = (values, id) => {
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!swiperRef) {
      if ((Platform.OS === 'android' && (id === 0 || id === 1)) ||
          (Platform.OS === 'ios' && id !== 1)) {
        swiperRef.current.scrollBy(1, true)
      } else {
        swiperRef.current.scrollBy(2)
      }
      setFormData(values)
    }
  }

  const { error, loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const dispatchSignUp = async () => {
    dispatch(signUpUser(formData))
    console.log(error, loading)
    if (!error && !loading) {
      console.log('¡Registro exitoso!')
    }
  }

  if (loading) {
    // dispatch(cancelLoading())
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color="#ee4296" />
      </View>
    )
  }
  return (
    <Swiper
      ref={swiperRef}
      bounces={true}
      scrollEnabled={false}
      activeDotColor="#F81894"
    >
      <SignUpFirstComponent onNextPressed={nextSwipe} />
      <SignUpSecondComponent
        values={formData}
        swiperRef={swiperRef}
        onNextPressed={nextSwipe}
      />
      <SignUpThirdComponent
        values={formData}
        navigation={navigation}
        dispatchSignUp={dispatchSignUp}
      />
    </Swiper>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 100,
    top: 150
  },
  errorTxt: {
    color: '#FF0D10',
    alignSelf: 'flex-start'
  },
  textWelcome: {
    fontFamily: 'MontserratBold',
    fontSize: 24,
    color: '#5A5A5A',
    marginBottom: 10
  },
  textWelcome2: {
    fontFamily: 'MontserratLight',
    fontSize: 14,
    color: 'black'
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
    fontFamily: 'MontserratLight',
    marginHorizontal: '2%'
  }
})
