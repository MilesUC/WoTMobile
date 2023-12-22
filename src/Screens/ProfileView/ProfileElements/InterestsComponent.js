import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from 'toastify-react-native/components/styles'

export const InterestsComponent = props => {
  const displayInterests = props.interests?.split(',').map((interest, index) => {
    return (
        <View key={index} style={{ flexDirection: 'row', 
            alignItems: 'center', marginRight: 10, alignContent: 'center' }}>
            <Ionicons size={19} color={'#EE4296'} name={'pricetag-outline'}/>
            <Text style={{ marginLeft: 5,
                fontFamily: 'MontserratLight', fontSize: 14, fontWeight: '400' }}> 
                {interest}
            </Text>
        </View>
    )
  })

  if (props.interests === null) {
    <View style={{ flexDirection: 'column' }}>
      <Text style={descriptionStyle.aboutText}>
        Intereses
      </Text>
    </View>
  }

  else {
    return (
      <View style={{ flexDirection: 'column' }}>
        <Text style={descriptionStyle.aboutText}>
          Intereses
        </Text>
        <View style={styles.descriptionContainer}>
          { displayInterests }
        </View>
      </View>
    )
  }
}

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
