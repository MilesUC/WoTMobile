import React from 'react'
import { Image, View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import Images from '../Utils/Images'
import ProfileView from '../Screens/ProfileView/ProfileView'
import Settings from '../Screens/Settings/SettingsView'
import CommunitiesHome from '../Screens/Communities/CommunitiesHome'
import Community from '../Screens/Communities/Community'
import SignUpWelcome from '../Screens/CompleteProfilePath/SignUpWelcome'
import FillOutPersonalInformation from '../Screens/CompleteProfilePath/FillOutPersonalInformation'
import FillOutEducationalInformation from '../Screens/CompleteProfilePath/FillOutEducationalInformation'
import FillOutWorkInformation from '../Screens/CompleteProfilePath/FillOutWorkInformation'
import FillOutDirectoryInformation from '../Screens/CompleteProfilePath/FillOutDirectoryInformation'
import FillOutAvailabilityInformation from '../Screens/CompleteProfilePath/FillOutAvailabilityInformation'
import FillOutAdditionalInformation from '../Screens/CompleteProfilePath/FillOutAdditionalInformation'
import FillOutReferenceContactsInformation from '../Screens/CompleteProfilePath/FillOutReferenceContactsInformation'
import EditPersonalInformation from '../Screens/EditUserForm/EditPersonalInformation'
import EditEducationalInformation from '../Screens/EditUserForm/EditEducationalInformation'
import EditWorkInformation from '../Screens/EditUserForm/EditWorkInformation'
import EditDirectoryInformation from '../Screens/EditUserForm/EditDirectoryInformation'
import EditAvailabilityInformation from '../Screens/EditUserForm/EditAvailabilityInformation'
import EditAdditionalInformation from '../Screens/EditUserForm/EditAdditionalInformation'
import EditReferenceContactsInformation from '../Screens/EditUserForm/EditReferenceContactsInformation'
import ModifyPersonalInformation from '../Screens/ProfileView/ModifyPersonalInformation'
import NewPost from '../Screens/NewPost/NewPost'
import EditPost from '../Screens/NewPost/EditPost'
import NotificationsMainScreen from '../Screens/Notifications/NotificationsMainScreen'
import CompanyScreens from './NavigationScreens/CompaniesNavigator'
import AccountConfigurationView from '../Screens/ProfileView/AccountConfiguration'
import ChangePasswordView from '../Screens/ProfileView/ChangePasswordView'
import FeedMainView from '../Screens/Feed/FeedMainView'
import ShowMyCommunitiesToPost from '../Screens/Feed/ShowMyCommunities'
// import ShowPosts from '../Screens/Posts/ShowPosts'
import ShowSinglePost from '../Screens/Posts/ShowSinglePost'
import BlockScreen from '../Screens/BlockScreen/BlockScreen'
import NotificationsPreferences from '../Screens/ProfileView/NotificationsPreferences'

const FeedStack = createNativeStackNavigator()
const NotificationsStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()
const CommunitiesHomeStack = createNativeStackNavigator()
const CompleteProfilePathStack = createNativeStackNavigator()
const RootStack = createStackNavigator()
// const CompaniesStack = createStackNavigator()

const ComingSoon = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: 30, fontFamily: 'MontserratLight', marginBottom: 10 }}>Coming soon</Text>
    <Ionicons name={'construct-outline'} size={50}/>
  </View>
)

const FeedPath = () => (
  <FeedStack.Navigator>
    <FeedStack.Screen
      name={'FeedInitialScreen'}
      options={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#EC4899' },
        headerShown: false,
        headerLeft: () => (
          <Image
            source={Images.LOGO}
            style={{ width: 50, height: 25, marginLeft: 5 }}
          />
        )
      }}
    >
      {() => <FeedMainView />}
    </FeedStack.Screen>
    <FeedStack.Screen
      name={'NewPostScreen'}
      options={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#EC4899' },
        headerShown: false
      }}
      component={NewPost}
    />
    <FeedStack.Screen
      name={'EditPostScreen'}
      options={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#EC4899' },
        headerShown: false
      }}
      component={EditPost}
    />
    <FeedStack.Screen
      name={'SinglePostView'}
      options={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#EC4899' },
        headerShown: false
      }}
      component={ShowSinglePost}
    />
    {/* <FeedStack.Screen name="Posts" options={{ headerShown: false }}>
      {() => <ShowPosts />}
    </FeedStack.Screen> */}
    <FeedStack.Screen
      name="MyCommunitiesToPost"
      options={{ headerShown: false }}
    >
      {() => <ShowMyCommunitiesToPost />}
    </FeedStack.Screen>
  </FeedStack.Navigator>
)

const CompleteProfilePath = () => {
  return (
    <CompleteProfilePathStack.Navigator>
      <CompleteProfilePathStack.Screen
        name={'SignUpWelcome'}
        options={{
          headerShown: false
        }}
        component={SignUpWelcome}
      />
      <CompleteProfilePathStack.Screen
        name={'CompletePersonalInformation'}
        options={{
          headerShown: false
        }}
        component={FillOutPersonalInformation}
      />
      <CompleteProfilePathStack.Screen
        name={'CompleteEducationalInformation'}
        options={{
          headerShown: false
        }}
        component={FillOutEducationalInformation}
      />
      <CompleteProfilePathStack.Screen
        name={'CompleteWorkInformation'}
        options={{
          headerShown: false
        }}
        component={FillOutWorkInformation}
      />
      <CompleteProfilePathStack.Screen
        name={'CompleteDirectoryInformation'}
        options={{
          headerShown: false
        }}
        component={FillOutDirectoryInformation}
      />
      <CompleteProfilePathStack.Screen
        name={'CompleteAvailabilityInformation'}
        options={{
          headerShown: false
        }}
        component={FillOutAvailabilityInformation}
      />
      <CompleteProfilePathStack.Screen
        name={'CompleteAdditionalInformation'}
        options={{
          headerShown: false
        }}
        component={FillOutAdditionalInformation}
      />
      <CompleteProfilePathStack.Screen
        name={'CompleteReferenceContactsInformation'}
        options={{
          headerShown: false
        }}
        component={FillOutReferenceContactsInformation}
      />
    </CompleteProfilePathStack.Navigator>
  )
}

const NotificationsScreen = () => (
  <NotificationsStack.Navigator>
    <NotificationsStack.Screen
      name={'NotificationsScreen'}
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
      {() => <NotificationsMainScreen />}
    </NotificationsStack.Screen>
  </NotificationsStack.Navigator>
)

const ProfileScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name={'ProfileScreen'}
      options={{ headerShown: false }}
    >
      {() => <ProfileView />}
    </ProfileStack.Screen>
    <ProfileStack.Screen
      name={'AccountConfiguration'}
      options={{ headerShown: false }}
    >
      {() => <AccountConfigurationView />}
    </ProfileStack.Screen>
    <ProfileStack.Screen
      name={'AccountPreferences'}
      options={{ headerShown: false }}
    >
      {() => <Settings />}
    </ProfileStack.Screen>
    <ProfileStack.Screen
      name={'ChangePassword'}
      options={{ headerShown: false }}
    >
      {() => <ChangePasswordView />}
    </ProfileStack.Screen>
    <ProfileStack.Screen
      name={'NotificationsPreferences'}
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
      {() => <NotificationsPreferences />}
    </ProfileStack.Screen>
    <ProfileStack.Screen
      name={'EditPersonalInformation'}
      options={{ headerShown: false }}
    >
      {() => <EditPersonalInformation />}
    </ProfileStack.Screen>
    <ProfileStack.Screen
      name={'EditEducationalInformation'}
      options={{ headerShown: false }}
    >
      {() => <EditEducationalInformation />}
    </ProfileStack.Screen>
    <ProfileStack.Screen
      name={'EditWorkInformation'}
      options={{ headerShown: false }}
    >
      {() => <EditWorkInformation />}
    </ProfileStack.Screen>
    <ProfileStack.Screen
      name={'EditDirectoryInformation'}
      options={{ headerShown: false }}
    >
      {() => <EditDirectoryInformation />}
    </ProfileStack.Screen>
    <ProfileStack.Screen
      name={'EditAvailabilityInformation'}
      options={{ headerShown: false }}
    >
      {() => <EditAvailabilityInformation />}
    </ProfileStack.Screen>
    <ProfileStack.Screen
      name={'EditAdditionalInformation'}
      options={{ headerShown: false }}
    >
      {() => <EditAdditionalInformation />}
    </ProfileStack.Screen>
    <ProfileStack.Screen
      name={'EditReferenceContactsInformation'}
      options={{ headerShown: false }}
    >
      {() => <EditReferenceContactsInformation />}
    </ProfileStack.Screen>
    <ProfileStack.Screen
      name={'ModifyPersonalInformation'}
      options={{ headerShown: false }}
    >
      {() => <ModifyPersonalInformation/>}
    </ProfileStack.Screen>
  </ProfileStack.Navigator>
)

const Communities = () => {
  return (
    <CommunitiesHomeStack.Navigator headerMode="none">
      <CommunitiesHomeStack.Screen
        name="CommunitiesHome"
        component={CommunitiesHome}
        options={{ headerShown: false }}
      />
      <CommunitiesHomeStack.Screen
        name="Community"
        component={Community}
        options={{ headerShown: false }}
      />
      <CommunitiesHomeStack.Screen
        name={'NewPostScreen'}
        options={{
          headerShown: false
        }}
        component={NewPost}
      />
      <CommunitiesHomeStack.Screen
      name={'SinglePostView'}
      options={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#EC4899' },
        headerShown: false
      }}
      component={ShowSinglePost}
    />
    </CommunitiesHomeStack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#EE4296',
      tabBarInactiveTintColor: '#5A5A5A',
      tabBarActiveBackgroundColor: '#FFFFFF',
      tabBarInactiveBackgroundColor: '#FFFFFF',
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#EC4899'
      }
    }}
  >
    <Tab.Screen
      name="Inicio"
      component={FeedPath}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        )
      }}
    />
    <Tab.Screen
      name="Comunidades"
      component={Communities}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="people-circle-outline" color={color} size={size} />
        )
      }}
    />
    <Tab.Screen
      name="Empresas"
      component={CompanyScreens}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="business" color={color} size={size} />
        )
      }}
    />
    <Tab.Screen
      name="Notificaciones"
      component={NotificationsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="notifications" color={color} size={size} />
        )
      }}
    />
    <Tab.Screen
      name="Perfil"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="people" color={color} size={size} />
        )
      }}
    />
  </Tab.Navigator>
)

const AppNavigator = () => {
  const { isCompletingTheirData } = useSelector((state) => state.auth)
  return (
    <RootStack.Navigator>
      {isCompletingTheirData
        ? (
            <RootStack.Screen
              name="CompleteProfilePath"
              component={CompleteProfilePath}
              options={{ headerShown: false }}
            />
          )
        : (
        <>
          <RootStack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </>
          )
      }
    </RootStack.Navigator>
  )
}

export default AppNavigator
