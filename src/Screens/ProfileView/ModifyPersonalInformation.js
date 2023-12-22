import React, { useEffect, useState } from 'react'
import { StyleSheet, StatusBar, Text, ScrollView, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Avatar } from '@rneui/themed'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ModifyPersonalDataInProfile from './ModifyPersonalDataInProfile'

export default function ModifyPersonalInformation () {
  const navigation = useNavigation()

  return (
    <>
    <StatusBar style='dark' />
      <ScrollView style={{ backgroundColor: '#F5F5F5' }}>
        <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.push('ProfileScreen')}>
          <Ionicons size={19} color={'#EE4296'} name={'chevron-back-outline'}/>
          <Text style={styles.backButtonText}>
            Perfil
          </Text>
        </TouchableOpacity>
        <View style={styles.horizontalTopLine}/>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}> Editar cuenta </Text>
        </View>
        <View style={styles.profilePicContainer}>
          <Avatar
            size={96}
            rounded
            source={require('../../../assets/Icons/profileIcon.png')}
            containerStyle={{ borderColor: '#EE4296', borderStyle: 'solid', borderWidth: 1, marginLeft: 17 }}
            avatarStyle={styles.avatar}
          />
        </View>
        <View style={styles.mainContainer}>
          <ModifyPersonalDataInProfile/>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20
  },
  titleText: {
    fontFamily: 'MontserratBold',
    fontSize: 32,
    color: '#5A5A5A'
  },
  backButtonContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    width: 80,
    alignItems: 'left',
    marginHorizontal: 10,
    height: 40
  },
  backButtonText: {
    fontFamily: 'MontserratLight',
    fontSize: 14
  },
  profilePicContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: '3%'
  },
  profilePicText: {
    fontFamily: 'MontserratLight',
    fontSize: 14,
    color: '#EE4296',
    textAlign: 'center',
    marginVertical: 5
  },
  horizontalTopLine: {
    borderBottomColor: '#EE4296',
    borderBottomWidth: 1,
    width: '100%'
  }
})

// import React from 'react'
// import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native'
// import { Ionicons } from '@expo/vector-icons'
// import EditPersonalInformationTemplate from '../EditTemplates/EditAvailabilityInformationTemplate'
// import { useNavigation } from '@react-navigation/native'

// export default function ModifyPersonalInformation () {
//   const navigation = useNavigation()
//   return (
//     <View style={styles.mainContainer}>
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
//         <Ionicons size={24} color={'#FFF'} name={'chevron-back-outline'} />
//       </TouchableOpacity>
//       <Text style={styles.title}>Configuración de la cuenta</Text>
//       <View style={styles.spacer} />
//     </View>
//       <ScrollView style={styles.formContainer}>
//         <View style={styles.container}>
//         <Text style={styles.title}>
//             Edita tu cuenta
//         </Text>
//         </View>
//         <EditPersonalInformationTemplate showDeleteButton={false} nextView={'ProfileScreen'} showDots={false}/>
//       </ScrollView>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     paddingTop: '3%',
//     backgroundColor: '#EE4296'
//   },
//   formContainer: {
//     flex: 1,
//     width: '100%',
//     backgroundColor: '#FFF',
//     paddingHorizontal: 20
//   },
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 10
//   },
//   title: {
//     fontSize: 20,
//     fontFamily: 'MontserratBold',
//     color: '#FFF'
//   },
//   button: {
//     padding: 5
//   },
//   spacer: {
//     width: 24
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 10
//   },
//   titleText: {
//     marginLeft: 10,
//     fontSize: 18,
//     fontFamily: 'MontserratBold',
//     color: '#5A5A5A',
//     alignContent: 'center',
//     justifyContent: 'center'
//   }
// })
