import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import NumberCircle from './NumberCircle'

const SectionTitle = ({ number, title }) => {
  return (
    <View style={styles.container}>
      <NumberCircle number={number}/>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'MontserratBold',
    color: '#5A5A5A'
  }
})

export default SectionTitle
