import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import AllNotifications from './AllNotifications'
import MyPostNotifications from './MyPostNotifications'
import BlockScreen from '../BlockScreen/BlockScreen'
import { useSelector } from 'react-redux'

export default function NotificationsMainFeed () {
  const [selectedOption, setSelectedOption] = useState('Todo')
  const { percentageOfUserDataCompletion } = useSelector((state) => state.auth)

  const handleOptionClick = (option) => {
    setSelectedOption(option)
  }

  if (percentageOfUserDataCompletion !== 100) {
    return (<BlockScreen message={'ver tus notificaciones'}/>)
  } else {
    return (
      <>
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => handleOptionClick('Todo')}
              style={[
                styles.option,
                selectedOption === 'Todo' && styles.selectedOption
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption === 'Todo' && styles.selectedOptionText
                ]}
              >
                Todo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOptionClick('Mis publicaciones')}
              style={[
                styles.option,
                selectedOption === 'Mis publicaciones' && styles.selectedOption
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption === 'Mis publicaciones' &&
                    styles.selectedOptionText
                ]}
              >
                Mis publicaciones
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {selectedOption === 'Todo'
              ? (
              <AllNotifications optionSelected={'Todo'}/>
                )
              : null}
            {selectedOption === 'Mis publicaciones'
              ? (
              <MyPostNotifications optionSelected={'Mis publicaciones'} />
                )
              : null}
          </View>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    marginTop: '5%'
  },
  option: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    justifyContent: 'center'
  },
  optionText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'MontserratLight',
    alignItems: 'center',
    textAlign: 'center'
  },
  selectedOption: {
    borderBottomColor: '#EE4296'
  },
  mainContentContainer: {
    marginHorizontal: 20,
    marginVertical: 5
  },
  selectedOptionText: {
    color: '#EE4296',
    fontFamily: 'MontserratBold',
    fontSize: 16
  },
  horizontalLine: {
    borderBottomColor: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 6,
    width: '100%',
    marginVertical: 10
  }
})
