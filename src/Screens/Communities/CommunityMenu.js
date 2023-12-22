import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Conversation from './CommunityMenuElements/Conversation'
import Highlights from './CommunityMenuElements/Highlights'
import Members from './CommunityMenuElements/Members'

export default function CommunityMenu (props) {
  const [selectedOption, setSelectedOption] = useState('Conversación')

  const handleOptionClick = (option) => {
    setSelectedOption(option)
  }

  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => handleOptionClick('Conversación')}
          style={[
            styles.option,
            selectedOption === 'Conversación' && styles.selectedOption
          ]}
        >
          <Text
            style={[
              styles.optionText,
              selectedOption === 'Conversación' && styles.selectedOptionText
            ]}
          >
            Conversación
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOptionClick('Destacados')}
          style={[
            styles.option,
            selectedOption === 'Destacados' && styles.selectedOption
          ]}
        >
          <Text
            style={[
              styles.optionText,
              selectedOption === 'Destacados' && styles.selectedOptionText
            ]}
          >
            Destacados
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOptionClick('Personas')}
          style={[
            styles.option,
            selectedOption === 'Personas' && styles.selectedOption
          ]}
        >
          <Text
            style={[
              styles.optionText,
              selectedOption === 'Personas' && styles.selectedOptionText
            ]}
          >
            Personas
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {selectedOption === 'Conversación' ? <Conversation data={props.data} /> : null}
        {selectedOption === 'Destacados' ? <Highlights data={props.data}/> : null}
        {selectedOption === 'Personas' ? <Members data={props.data}/> : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10
  },
  option: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },
  optionText: {
    color: '#5A5A5A',
    fontSize: 16,
    fontFamily: 'MontserratBold'
  },
  selectedOption: {
    borderBottomColor: '#EE4296',
    fontFamily: 'MontserratLight'
  },
  selectedOptionText: {
    color: '#EE4296',
    fontFamily: 'MontserratBold'
  }
})
