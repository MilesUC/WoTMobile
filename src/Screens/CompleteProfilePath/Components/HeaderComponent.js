import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { completeSignUp } from '../../../Redux/Slices/userAuthSlice'

const HeaderComponent = ({ onBack }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {
        navigation.navigate(onBack)
      }}
        style={styles.button}
      >
        <Ionicons size={24} color={'#FFF'} name={'chevron-back-outline'} />
      </TouchableOpacity>
      <Text style={styles.title}>Formulario</Text>
      <TouchableOpacity onPress={() => {
        dispatch(completeSignUp())
      }}
        style={styles.button}
      >
        <Ionicons size={24} color={'#FFF'} name={'close-outline'} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  title: {
    fontSize: 20,
    fontFamily: 'MontserratBold',
    color: '#FFF'
  },
  button: {
    padding: 5
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default HeaderComponent
