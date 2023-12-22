import React from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import { ProfilePicWithBadge } from './ProfilePicWithBadge'

export const WriteSomething = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ alignItems: 'center', flexDirection: 'row', flex: 1 }}
      >
        <ProfilePicWithBadge
          style={styles.image}
          badge={true}
        />
        <TextInput
          placeholder="Escribe algo..."
          style={styles.commentInput}
          multiline
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  image: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 20,
    marginRight: 10
  },
  commentInput: {
    fontFamily: 'MontserratLight',
    color: '#5A5A5A',
    marginLeft: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
    flex: 1,
    marginRight: 8
  }
})