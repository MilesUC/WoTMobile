import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React from 'react'

export const ProfileInformationMenuButton = ({ title, selectedOption, handleOptionClick }) => (
    <TouchableOpacity
      onPress={() => handleOptionClick(title)}
      style={[
        styles.option,
        selectedOption === title && styles.selectedOption
      ]}
    >
      <Text
        style={[
          styles.optionText,
          selectedOption === title && styles.selectedOptionText
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
  option: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
    // marginHorizontal: '5%'
  },
  optionText: {
    color: '#5A5A5A',
    fontSize: 14,
    fontFamily: 'MontserratBold',
    paddingHorizontal: 17
  },
  selectedOption: {
    borderBottomColor: '#EE4296'
  },
  selectedOptionText: {
    color: '#EE4296',
    fontFamily: 'MontserratBold',
    fontSize: 14
  }
})
