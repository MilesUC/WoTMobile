import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const NumberCircle = ({ number }) => {
  return (
    <View style={styles.circle}>
      <Text style={styles.numberText}>{number}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  circle: {
    width: 33,
    height: 33,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#EE4296',
    justifyContent: 'center',
    alignItems: 'center'
  },
  numberText: {
    fontFamily: 'MontserratBold',
    fontSize: 20,
    color: '#5A5A5A'
  }
})

export default NumberCircle
