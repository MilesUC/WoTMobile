import React from 'react'
import { View, Animated, StyleSheet } from 'react-native'

const CustomLoader = () => {
  const animationValue = new Animated.Value(0)

  Animated.loop(
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false
    })
  ).start()

  const barWidth = animationValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['20%', '50%', '20%'],
  })

  return (
    <View style={styles.loaderBigContainer}>
        <View style={styles.loaderContainer}>
            <Animated.View style={[styles.loaderBar, { width: barWidth }]} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  loaderBar: {
    height: 10,
    backgroundColor: '#EE4296', // Customize the color of the loader bars
  },
  loaderBigContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default CustomLoader