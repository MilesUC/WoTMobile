import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const TextFieldInput = ({ labelName, labelDescription, value, onChangeText, onBlur, error, placeholder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelName}>{labelName}</Text>
      { labelDescription && <Text style={styles.labelDescription}>{labelDescription}</Text> }
      <TextInput
        style={[styles.textInput,
          error && styles.errorTextInput]}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%'
  },
  labelName: {
    fontFamily: 'MontserratBold',
    color: '#5A5A5A',
    marginBottom: 5,
    fontSize: 16
  },
  labelDescription: {
    fontFamily: 'MontserratLight',
    color: '#5A5A5A',
    marginBottom: 5,
    fontSize: 14
  },
  textInput: {
    height: 45,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 7,
    fontSize: 16,
    fontFamily: 'MontserratLight'
  },
  errorText: {
    fontFamily: 'MontserratLight',
    fontSize: 12,
    fontWeight: '400',
    color: 'red'
  }
})

export default TextFieldInput
