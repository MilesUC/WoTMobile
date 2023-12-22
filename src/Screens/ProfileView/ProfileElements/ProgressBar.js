import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ProgressBar = ({ progress }) => {
  const validProgress = Math.round(Math.min(Math.max(progress, 0), 100), 0)

  return (
    <View style={styles.mainContainer}>
        <View style={styles.container}>
            <View style={{ ...styles.progressBar, width: `${validProgress}%` }}/>
        </View>
        <Text style={styles.percentageText}>{`${validProgress}%`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    height: '100%',
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center'
  },
  container: {
    height: '50%',
    width: '100%',
    backgroundColor: '#9D9D9D',
    borderRadius: 5,
    justifyContent: 'center'
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#EE4296',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  percentageText: {
    marginLeft: 5,
    color: '#5A5A5A',
    fontSize: 12,
    fontFamily: 'MontserratBold'
  }
})

export default ProgressBar
