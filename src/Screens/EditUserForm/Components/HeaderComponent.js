import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const HeaderComponent = ({ onBack }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate(onBack)} style={styles.button}>
        <Ionicons size={24} color={'#FFF'} name={'chevron-back-outline'} />
      </TouchableOpacity>
      <Text style={styles.title}>Edita tus datos</Text>
      <View style={styles.spacer} />
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
  spacer: {
    width: 24
  }
})

export default HeaderComponent
