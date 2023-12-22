import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'expo-image'

/* eslint-disable camelcase */
export default function AddInformationAboutYou ({ nextScreen }) {
  const navigate = useNavigation()

  return (
    <ScrollView style={{
      marginTop: '10%',
      flexDirection: 'column',
      width: '100%',
      height: '100%'
    }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
          height: 100,
          width: 100,
          alignSelf: 'center'
        }}>
        <Image
            source={require('../../../../../assets/Images/Puzzle.png')}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%'
            }}
        />
      </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '5%'
          }}>
          <Text
              style={{
                fontFamily: 'MontserratBold',
                fontSize: 14,
                color: '#5A5A5A',
                alignContent: 'center',
                justifyContent: 'center'
              }}>
              Un nuevo comienzo
          </Text>
          <TouchableOpacity
            onPress={() => navigate.push(nextScreen)}>
              <Text
                  style={{
                    marginTop: '3%',
                    fontFamily: 'MontserratBold',
                    fontSize: 14,
                    color: '#EE4296'
                  }}>
                  Agregar información
              </Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  )
}
/* eslint-enable camelcase */
