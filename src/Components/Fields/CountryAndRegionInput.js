import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const CountryAndRegionInput = ({
  countries,
  regions,
  selectedCountry,
  onCountryChange,
  selectedRegion,
  onRegionChange,
  countryError,
  regionError
}) => {
  return (
    <View style={styles.container}>
      <Text
        style={
          {
            fontFamily: 'MontserratBold',
            color: '#5A5A5A',
            fontSize: 16,
            marginBottom: '5%'
          }}>
            País de domicilio
        </Text>
      <View style={styles.fieldContainer}>
        <Picker
          selectedValue={selectedCountry}
          onValueChange={onCountryChange}
          style={styles.picker}
        >
          <Picker.Item key={'0'} label="Elige una opción" value="" style={{ fontFamily: 'MontserratLight', fontSize: 14 }}/>
          {countries.map((country) => (
            <Picker.Item
              key={country.value}
              label={country.label}
              value={country.value.toString()}
              style={{ fontFamily: 'MontserratLight' }}
            />
          ))}
        </Picker>
      </View>
      {countryError && <Text style={styles.errorText}>{countryError}</Text>}

      {selectedCountry === '1' && (
        <>
        <Text style={styles.fieldName}>Región de domicilio</Text>
        <View style={styles.fieldContainer}>
          <Picker
            selectedValue={selectedRegion}
            onValueChange={onRegionChange}
            style={styles.picker}
          >
            <Picker.Item key={'0'} label="Elige una opción" value="" style={{ fontFamily: 'MontserratLight' }}/>
            {regions.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>
        {regionError && <Text style={styles.errorText}>{regionError}</Text>}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: '10%',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10
  },
  fieldName: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    color: '#5A5A5A',
    marginBottom: '5%'
  },
  picker: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: '2%',
    fontFamily: 'MontserratLight',
    fontWeight: '400',
    fontSize: 14,
    color: '#5A5A5A'
  },
  errorText: {
    fontFamily: 'MontserratLight',
    fontSize: 12,
    fontWeight: '400',
    color: 'red',
    marginBottom: '5%'
  }
})

export default CountryAndRegionInput
