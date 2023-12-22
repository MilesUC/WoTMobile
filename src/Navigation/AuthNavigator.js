import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LogInView from '../Screens/Login/LogInView'
import SignUpView from '../Screens/SignUp/SignUpView'
import ForgotPasswordView from '../Screens/ForgotPassword/ForgotPasswordView'
import ResetPasswordView from '../Screens/ForgotPassword/ResetPasswordView'

const AuthStack = createNativeStackNavigator()

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
          name={'LogIn'}
          options={{ title: 'Inicia sesión' }}>
        {() => <LogInView/>}
      </AuthStack.Screen>
      <AuthStack.Screen
          name={'SignUp'}
          options={{ title: 'Regístrate' }}>
        {() => <SignUpView/>}
      </AuthStack.Screen>
      <AuthStack.Screen
          name={'ForgotPassword'}
          options={{ title: 'Olvidaste tu contraseña' }}>
        {() => <ForgotPasswordView/>}
      </AuthStack.Screen>
      <AuthStack.Screen
          name={'ResetPassword'}
          options={{ title: 'Cambia tu contraseña' }}>
        {() => <ResetPasswordView/>}
      </AuthStack.Screen>
  </AuthStack.Navigator>
)

export default AuthNavigator
