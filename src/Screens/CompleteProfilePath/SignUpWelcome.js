import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { completeSignUp } from '../../Redux/Slices/userAuthSlice'

const completeProfilePathSlide = {
  1: 'CompletePersonalInformation',
  2: 'CompleteEducationalInformation',
  3: 'CompleteWorkInformation',
  4: 'CompleteDirectoryInformation',
  5: 'CompleteAvailabilityInformation',
  6: 'CompleteAdditionalInformation',
  7: 'CompleteReferenceContactsInformation'
}

export default function SignUpWelcome () {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const formStep = useSelector(state => state.auth.formStep)
  const completeButtonStyle = {
    backgroundColor: '#EE4296',
    left: '10%'
  }
  console.log('está en esta vista')

  const skipButtonStyle = {
    backgroundColor: '#5A5A5A',
    left: '10%'
  }

  const navigateToForm = () => {
    if (formStep >= 1 && formStep <= 7) {
      const nextScreen = completeProfilePathSlide[formStep]
      navigation.navigate(nextScreen)
    }
  }

  useEffect(() => {
    // console.log(formStep)
    navigateToForm()
  }, [formStep])

  return (
      <View className="bg-white h-full w-full">
        <ScrollView>
          <View className="w-full flex justify-center pt-40 pb-4">
            <Image
              source={require('../../../assets/Icons/profileIcon.png')}
              style={{
                width: 200,
                height: 200,
                borderRadius: 400 / 2,
                left: '25%'
              }}
            />
            <View className="flex justify-center pt-10 pb-4">
              <View className="flex items-center">
                <Animated.Text
                  style={styles.textWelcome}
                  entering={FadeInUp.duration(1000).springify()}
                >
                  ¡Felicitaciones!
                </Animated.Text>
                <Animated.Text entering={FadeInUp.duration(1000).springify()} style={ styles.textWelcome2 }>
                  Ya eres parte de Wot. Solo te falta completar tu perfil.
                </Animated.Text>
              </View>
            </View>
            <Animated.View
              entering={FadeInDown.duration(1000).springify()}
              className="w-full "
            >
              <TouchableOpacity
                className="w-4/5 p-3 rounded-xl mb-3 mt-10"
                style={completeButtonStyle}
                onPress={() => {
                  navigation.navigate('CompletePersonalInformation')
                }}
              >
                <Text className="text-xl font-bold text-white text-center">
                  Completar
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.duration(1000).springify()}
              className="w-full "
            >
              <TouchableOpacity
                className="w-4/5 p-3 rounded-xl mb-10 mt-5"
                style={skipButtonStyle}
                onPress={() => {
                  dispatch(completeSignUp())
                }
              }
              >
                <Text className="text-xl font-bold text-white text-center">
                  Saltar
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
      </View>
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
    color: 'black',
    marginHorizontal: 30,
    textAlign: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
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
  }
})
