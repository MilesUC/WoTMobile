import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from './src/Redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import Routes from './src/Routes'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App () {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Routes/>
          </NavigationContainer>
        </GestureHandlerRootView>
      </PersistGate>
    </ReduxProvider>
  )
}
