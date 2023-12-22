import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Images from '../../Utils/Images'
import { Image } from 'react-native'
import ShowAllCompanies from '../../Screens/Companies/ShowAllCompanies'
import CompanyDetail from '../../Screens/Companies/CompanyDetail'

const CompanyStack = createNativeStackNavigator()

const CompanyScreens = () => (
  <CompanyStack.Navigator>
    <CompanyStack.Screen
      name={'MainCompanies'}
      options={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: 'white' },
        headerShown: true,
        headerLeft: () => (
          <Image
            source={Images.LOGO}
            style={{ width: 50, height: 25, marginLeft: 5 }}
          />
        )
      }}
    >
      {() => <ShowAllCompanies />}
    </CompanyStack.Screen>
    <CompanyStack.Screen
      name={'CompanyDetail'}
      options={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: 'white' },
        headerShown: false
      }}
    >
      {() => <CompanyDetail />}
    </CompanyStack.Screen>
  </CompanyStack.Navigator>
)

export default CompanyScreens
