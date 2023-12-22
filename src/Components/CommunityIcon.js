import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Image } from 'expo-image'

export const CommunityIcon = () => {
  return (
    <View style={ styles.avatarWrapper }>
      <Image
        source={require('../../assets/Icons/communityIcon.png')}
        style={ styles.avatar }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  avatarWrapper: {
    position: 'absolute',
    bottom: '-20%',
    zIndex: 10
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 90,
    borderColor: '#EE4296',
    borderWidth: 1,
    left: '30%'
  }
})
