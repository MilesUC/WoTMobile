import React from 'react'
import { View, StyleSheet } from 'react-native'

export const Dot = (props) => {
  return (<View style={[styles.dot, props.isSelected ? styles.selectedDot : {}]} />)
}

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 5
  },
  selectedDot: {
    backgroundColor: '#EE4296'
  }
})
