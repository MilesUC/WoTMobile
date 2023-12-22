import React from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'

const RoundedTextInput = ({ fieldName, placeholder, value, onChangeText, onBlur, error }) => {
  return (
      <View style={ styles.generalContainer }>
      <View style={styles.container}>
        <View style={styles.fieldNameContainer}>
          <Text style={styles.fieldName}>{fieldName}</Text>
        </View>
        <TextInput
          style={[
            styles.textInput,
            error && styles.errorTextInput
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
  )
}

const styles = StyleSheet.create({
  generalContainer: {
    marginVertical: 5,
    width: '100%'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  fieldNameContainer: {
    flex: 1,
    paddingRight: 10
  },
  fieldName: {
    fontFamily: 'MontserratLight',
    fontWeight: '400',
    fontSize: 14,
    color: '#5A5A5A'
  },
  textInput: {
    fontFamily: 'MontserratLight',
    fontWeight: '400',
    flex: 2,
    padding: 5,
    fontSize: 14,
    color: '#5A5A5A'
  },
  errorText: {
    fontFamily: 'MontserratLight',
    fontSize: 12,
    fontWeight: '400',
    color: 'red'
  }
})

export default RoundedTextInput
