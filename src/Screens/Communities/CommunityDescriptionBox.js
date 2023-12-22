import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export const CommunityDescriptionBox = (props) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const maxCharacters = 160
  const maxLines = 4

  const toggleText = () => {
    setIsExpanded(!isExpanded)
  }

  const shouldShowReadMore = props.initialText.length > maxCharacters

  return (
    <View alignItems="center">
      <Text style={descriptionStyle.aboutText}>
        Descripción de la comunidad
      </Text>
      <View style={descriptionStyle.descriptionContainer}>
        <Text
          style={descriptionStyle.textInDescription}
          numberOfLines={isExpanded ? undefined : maxLines}
        >
          {props.initialText}
        </Text>
        {shouldShowReadMore ? (
          <TouchableOpacity onPress={toggleText}>
            <Text style={{ color: 'blue' }}>
              {isExpanded ? 'Ver menos' : 'Ver más'}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
}

const descriptionStyle = StyleSheet.create({
  aboutText: {
    alignItems: 'center',
    marginBottom: 5,
    fontFamily: 'MontserratBold',
    fontSize: 14
  },
  descriptionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: '90%'
  },
  textInDescription: {
    fontSize: 14,
    fontFamily: 'MontserratLight',
    textAlign: 'justify',
    color: 'black',
    paddingHorizontal: 10,
    paddingVertical: 10
  }
})
