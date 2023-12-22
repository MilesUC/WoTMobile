import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const SectionTitle = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'MontserratBold',
    color: '#5A5A5A',
    alignContent: 'center',
    justifyContent: 'center'
  }
})

export default SectionTitle
