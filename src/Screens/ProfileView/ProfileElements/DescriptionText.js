import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const DescriptionText = props => {
  return (
    <View>
      <Text style={descriptionStyle.aboutText}>
        Sobre mí
      </Text>
      <View style={descriptionStyle.descriptionContainer}>
        <Text style={descriptionStyle.textInDescription}>
          {props.initialText}
        </Text>
      </View>
    </View>
  )
}

const descriptionStyle = StyleSheet.create({
  aboutText: {
    marginVertical: '2%',
    fontFamily: 'MontserratLight',
    color: '#5A5A5A',
    fontSize: 14
  },
  descriptionContainer: {
    alignItems: 'left',
    justifyContent: 'center',
    paddingHorizontal: '1%',
    width: '100%'
  },
  textInDescription: {
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'MontserratLight',
    color: '#5A5A5A',
    paddingVertical: '2%'
  }
})
