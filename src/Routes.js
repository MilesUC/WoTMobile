import React, { useState, useEffect } from 'react'
import { StatusBar, View } from 'react-native'
import { useSelector } from 'react-redux'
import AppNavigator from './Navigation/AppNavigator'
import AuthNavigator from './Navigation/AuthNavigator'
import useCustomFont from './hooks/useCustomFont'
import OpeningScreen from './Screens/OpenAppScreen/OpeningScreen'

export default function Routes () {
  const { isLoggedIn } = useSelector(state => state.auth)
  const { fontsLoaded, onLayoutRootView } = useCustomFont()
  const [showOpeningScreen, setShowOpeningScreen] = useState(true)

  useEffect(() => {
    if (fontsLoaded) {
      const timeoutId = setTimeout(() => {
        setShowOpeningScreen(false)
      }, 2000)

      return () => clearTimeout(timeoutId)
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#EE4296' }}/>
    )
  } else {
    onLayoutRootView()
  }

  if (showOpeningScreen) {
    return <OpeningScreen />
  }

  return (
    <>
      <StatusBar barStyle={'dark-content'}/>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </>
  )
}
