import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const BinaryPickerInput = ({
  fieldName,
  explanation,
  alternatives,
  selectedAlternative,
  onAlternativeChange,
  error
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.fieldName}> {fieldName} </Text>
      {
        explanation
          ? (
            <Text
              style={{
                fontFamily: 'MontserratLight',
                fontSize: 14,
                color: '#5A5A5A',
                marginBottom: 5
              }}
            >
              {explanation}
            </Text>
            )
          : null
      }
      <View style={styles.fieldContainer}>
        <Picker
          selectedValue={selectedAlternative}
          onValueChange={(itemValue) =>
            onAlternativeChange(itemValue)}
          style={styles.picker}
        >
          <Picker.Item key={'0'} label="Elige una opción" value=""
            style={{
              fontFamily: 'MontserratLight',
              fontSize: 14
            }}/>
          {alternatives.map((alternative) => (
            <Picker.Item
              key={alternative.value}
              label={alternative.label}
              value={alternative.value}
              style={{ fontFamily: 'MontserratLight', fontSize: 14 }}
            />
          ))}
        </Picker>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10
  },
  fieldName: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    color: '#5A5A5A',
    marginVertical: 5
  },
  picker: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontFamily: 'MontserratLight',
    fontSize: 14,
    color: '#5A5A5A'
  },
  errorText: {
    fontFamily: 'MontserratLight',
    fontSize: 12,
    color: 'red'
  }
})

export default BinaryPickerInput
