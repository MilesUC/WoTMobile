import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const WritePostButton = () => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.push('NewPostScreen')}
    >
      <Ionicons name={'create-outline'} size={24} color="black" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#EE4296',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 15,
    bottom: 70
  }
})

export default WritePostButton