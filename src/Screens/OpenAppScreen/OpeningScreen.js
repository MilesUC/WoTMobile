import React from 'react'
import { Image } from 'expo-image'
import { View, StyleSheet } from 'react-native'
import { deviceHeight } from '../../Components/Dimensions'
import Animated, { FadeInDown } from 'react-native-reanimated'

export default function OpeningScreen () {
  return (
    <View>
      <Animated.View
        entering={FadeInDown.duration(1000).springify()}
        className="flex-row justify-around w-full absolute"
      >
        <Image
          style={styles.image}
          source={require('../../../assets/Images/logo.png')}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 100,
    top: deviceHeight * 0.5,
    contentFit: 'contain'
  }
})
