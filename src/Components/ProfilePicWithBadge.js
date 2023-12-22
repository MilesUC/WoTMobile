import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Image } from 'expo-image'

export const ProfilePicWithBadge = ({ badge }) => {
  return (
    <View style={ styles.avatarWrapper }>
      <Image
        source={require('../../assets/Icons/profileIcon.png')}
        style={ styles.avatar }
      />
      { badge
        ? (
        <View style={ styles.badge }/>
          )
        : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  avatarWrapper: {
    position: 'relative',
    width: 40,
    height: 40,
    marginRight: 10
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#EE4296',
    borderWidth: 1
  },
  badge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EE4296',
    position: 'absolute',
    right: -3,
    bottom: -2
  }
})
