import { useEffect, useCallback } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

function useCustomFont () {
  const [fontsLoaded] = useFonts({
    Montserrat: require('../../assets/fonts/Montserrat-VariableFont_wght.ttf'),
    MontserratItalic: require('../../assets/fonts/Montserrat-Italic-VariableFont_wght.ttf'),
    MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
    MontserratLight: require('../../assets/fonts/Montserrat-Light.ttf')
  })

  useEffect(() => {
    async function prepare () {
      await SplashScreen.preventAutoHideAsync()
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  return { fontsLoaded, onLayoutRootView }
}

export default useCustomFont
