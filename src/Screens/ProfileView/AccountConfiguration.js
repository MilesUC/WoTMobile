import React from 'react'
import { StyleSheet, StatusBar, Text, ScrollView, View, TouchableOpacity, Modal, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar } from '@rneui/themed'
import { LogOutUser } from '../../Redux/Reducers/LogOutUser'
import HelpButton from './HelpButton'
import { deviceWidth, deviceHeight } from '../../Components/Dimensions'

export default function AccountConfigurationView () {
  const navigation = useNavigation()

  const dispatch = useDispatch()

  const handleSubmit = () => {
    Alert.alert(
      'Vas a cerrar sesión',
      '¿Estás segura?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Sí',
          onPress: () => dispatch(LogOutUser())
        }
      ]
    )
  }

  return (
    <>
    <StatusBar style='dark' />
    <View style={styles.mainContainer}>
      <View style={{ flex: 1, width: '100%' }}>
        <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.push('ProfileScreen')}>
          <Ionicons size={19} color={'#EE4296'} name={'chevron-back-outline'}/>
          <Text style={styles.backButtonText}>
            Perfil
          </Text>
        </TouchableOpacity>
        <View style={styles.horizontalTopLine}/>
      </View>
      <View style={{ flex: 1, width: '100%' }}>
        <View style={styles.profilePicContainer}>
          <Avatar
            size={40}
            rounded
            source={require('../../../assets/Icons/profileIcon.png')}
            containerStyle={{ borderColor: '#EE4296', borderStyle: 'solid', borderWidth: 1, marginLeft: 17 }}
            avatarStyle={styles.avatar}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}> Configuración </Text>
          </View>
        </View>
      </View>
      <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'center', marginTop: 40, flex: 1 }}>
        <TouchableOpacity style={styles.accountConfigButton} onPress={() => navigation.push('AccountPreferences')}>
          <Ionicons size={19} color={'#FF69B4'} name={'person'} />
          <Text style={styles.accountConfigButtonText}> Preferencias de la cuenta </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountConfigButton} onPress={() => navigation.push('ChangePassword')}>
          <Ionicons size={19} color={'#FF69B4'} name={'lock-closed'} />
          <Text style={styles.accountConfigButtonText}> Seguridad </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountConfigButton} onPress={() => navigation.push('NotificationsPreferences')}>
          <Ionicons size={19} color={'#FF69B4'} name={'notifications'} />
          <Text style={styles.accountConfigButtonText}> Notificaciones </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'center', flex: 3 }}>
        <HelpButton buttonStyle={styles.helpButton} textStyle={styles.helpButtonText}/>
        <TouchableOpacity style={styles.helpButton} onPress={() => handleSubmit()}>
          <Text style={styles.helpButtonText}> Cerrar sesión </Text>
        </TouchableOpacity>
      </View>
    </View>
  </>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    height: '100%',
    width: '100%'
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  titleText: {
    fontFamily: 'MontserratBold',
    fontSize: 30
  },
  backButtonContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    width: '50%',
    alignItems: 'left',
    marginHorizontal: 10,
    height: 0.06 * deviceHeight
  },
  backButtonText: {
    fontFamily: 'MontserratLight',
    fontSize: 14
  },
  profilePicContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
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
  },
  accountConfigButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    marginVertical: 10,
    width: '80%'
  },
  accountConfigButtonText: {
    fontFamily: 'MontserratLight',
    fontSize: 16,
    marginLeft: 10
  },
  helpButton: {
    borderColor: '#EE4296',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'left',
    paddingVertical: 10,
    marginTop: 30,
    width: 0.8 * deviceWidth
  },
  helpButtonText: {
    fontFamily: 'MontserratLight',
    fontSize: 16
  }
})
