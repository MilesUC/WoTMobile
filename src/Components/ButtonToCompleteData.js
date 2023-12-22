import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { comeBackToCompleteUserData } from '../Redux/Slices/userAuthSlice'

export const ButtonToCompleteData = () => {
  const dispatch = useDispatch()
  return (
    <TouchableOpacity
      style={[styles.biggestButton, styles.profileButton]}
      onPress={() => {
        dispatch(comeBackToCompleteUserData())
      }}
    >
      <Text style={styles.editProfileButtonText}>
        Completar datos de mi perfil
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  biggestButton: {
    borderRadius: 5,
    borderWidth: 0,
    backgroundColor: '#EE4296',
    width: '80%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    marginRight: 8
  },
  editProfileButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'MontserratBold',
    color: '#FFFFFF'
  }
})
