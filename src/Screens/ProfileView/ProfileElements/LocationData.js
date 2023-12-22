import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export const LocationData = props => {
  return (
    <>
    {(props.information.paisDomicilio?.pais) ? (
    <View style={{ flexDirection: 'column' }}>
    <Text style={descriptionStyle.aboutText}>
      País de domicilio
    </Text>
    <View style={styles.descriptionContainer}>
    <View style={{ flexDirection: 'row', 
        alignItems: 'center', marginRight: 10, alignContent: 'center' }}>
        <Ionicons size={19} color={'#EE4296'} name={'location-outline'}/>
        <Text style={{ marginLeft: 5,
            fontFamily: 'MontserratLight', fontSize: 14, fontWeight: '400' }}> 
             { props.information.paisDomicilio.pais }
        </Text>
    </View>
    </View>
    </View>) : (
      null
    )}
  </>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    alignItems: 'flex-start',
    marginBottom: 10
  },
  dataText: {
    fontSize: 14,
    marginRight: 8,
    backgroundColor: 'transparent',
    color: 'black'
  },
  aboutText: {
    alignItems: 'flex-start',
    marginBottom: 5,
    fontFamily: 'MontserratBold',
    color: '#5A5A5A',
    fontSize: 14,
    marginBottom: 10
  },
  descriptionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textInDescription: {
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'MontserratLight',
    color: 'black',
    paddingHorizontal: 10,
    paddingVertical: 10
  }
})

const descriptionStyle = StyleSheet.create({
  aboutText: {
    alignItems: 'flex-start',
    marginBottom: 5,
    fontFamily: 'MontserratBold',
    color: '#5A5A5A',
    fontSize: 14,
    marginBottom: 10
  },
  descriptionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textInDescription: {
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'MontserratLight',
    color: 'black',
    paddingHorizontal: 10,
    paddingVertical: 10
  }
})
