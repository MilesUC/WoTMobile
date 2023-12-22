import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// Custom Checkbox Component
const Checkbox = ({ label, isChecked, onCheckChange }) => {
  const iconName = isChecked ? 'ios-checkbox' : 'ios-square-outline' // Ionicons names for checked/unchecked

  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onCheckChange}>
      <Ionicons name={iconName} size={24} color={isChecked ? '#EE4296' : 'grey'} />
      {label && <Text style={styles.checkboxLabel}>{label}</Text>}
    </TouchableOpacity>
  )
}

// Styles
const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'center',
    marginVertical: '3%'
  },
  checkboxLabel: {
    marginLeft: 8
  }
})

export default Checkbox
