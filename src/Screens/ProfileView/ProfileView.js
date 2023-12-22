import React, { useEffect } from 'react'
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { DescriptionText } from './ProfileElements/DescriptionText'
import InformationMenu from './ProfileElements/InformationMenu'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import CustomLoader from '../../Components/CustomLoader'
import { useNavigation } from '@react-navigation/native'
import { comeBackToCompleteUserData } from '../../Redux/Slices/userAuthSlice'
import ProgressBar from './ProfileElements/ProgressBar'
import { Image } from 'expo-image'

const { width } = Dimensions.get('window')

export default function ProfileView () {
  const navigation = useNavigation()
  const { userData, userToken, percentageOfUserDataCompletion, isUserDataComplete } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(LogOutUser())
  // })

  if (!userData) {
    return <CustomLoader />
  } else {
    return (
      <>
        <StatusBar style="dark" />
        <ScrollView>
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'column',
              flex: 1
            }}
          >
            <View style={styles.horizontalTopContainer}>
              <Image
                source={require('../../../assets/Icons/profileIcon.png')}
                style={styles.profilePic}
              />
            </View>
            <View style={styles.mainInfoContainer}>
              <Text style={styles.nameText}>
                {userData.nombre} {userData.apellido}
              </Text>
              { (userData.brief !== null)
                ? (
                  <DescriptionText initialText={ userData.brief }
                />)
                : (<Text style={{ fontFamily: 'MontserratLight', fontSize: 14 }}>
                    Aún no tienes una presentación personal.
                </Text>)
              }
            </View>
            <View style={styles.profileButtons}>
          { (percentageOfUserDataCompletion !== 100)
            ? (
              <TouchableOpacity
                style={[styles.biggestButton, styles.profileButton]}
                onPress={() => {
                  dispatch(comeBackToCompleteUserData())
                }}
              >
                <Text style={styles.editProfileButtonText}>
                  Completar el formulario
                </Text>
              </TouchableOpacity>
              )
            : (
            <TouchableOpacity style={[styles.biggestButton, styles.profileButton]} onPress={() =>
              navigation.push('ModifyPersonalInformation')
            }>
                  <Text style={styles.editProfileButtonText}>
                    Editar información personal
                  </Text>
                </TouchableOpacity>
              )
            }
        <TouchableOpacity
          style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}
          onPress={() => navigation.push('AccountConfiguration')}
        >
          <Ionicons name={'settings-sharp'} size={25} color={'#5A5A5A'}
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 25,
              textAlign: 'center',
              padding: '1%',
              borderWidth: 1,
              borderColor: 'black',
              overflow: 'hidden'
            }} />
        </TouchableOpacity>
      </View>

        { !isUserDataComplete
          ? (<>
            <View style={styles.horizontalLine}></View>
            <View style={styles.mainContentContainer}>
              <TouchableOpacity onPress={() => { dispatch(comeBackToCompleteUserData()) }}>
                <Text style={styles.nameText}>
                  Formulario
                </Text>
                <Text style={[styles.headlineText, styles.pressHereToCompleteProfileText]}>
                  Presiona acá para rellenar el formulario y completar tu perfil en WoT.
                </Text>
                <Text style={[styles.contactText, styles.fillingTimeText]}>
                  Te demorarás menos de {Math.round(7 * (1 - percentageOfUserDataCompletion / 100), 0) + 1 } minutos.
                </Text>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                  <ProgressBar progress={percentageOfUserDataCompletion} />
                </View>
              </TouchableOpacity>
            </View>
            </>
            )
          : (
              null
            )
        }

    <View style={styles.horizontalLine}/>
    <View style={styles.multipleMenuTitleContainer}>
      <Text style={styles.nameText}>
        Mi información
      </Text>
    </View>
    <InformationMenu information={ userData }/>
    <View style={styles.horizontalLine}></View>
    </View>
    </ScrollView>
    </>
    )
  }
}

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 6,
    width: '100%',
    marginVertical: 10
  },
  horizontalTopContainer: {
    borderBottomColor: '#EE4296',
    borderBottomWidth: 1,
    width: '100%',
    zIndex: 1,
    backgroundColor: '#F5F5F5',
    height: 123,
    marginBottom: 20
  },
  mainInfoContainer: {
    marginTop: 20,
    marginLeft: 17
  },
  nameText: {
    fontFamily: 'MontserratBold',
    fontSize: 20,
    color: '#5A5A5A'
  },
  contactText: {
    color: '#EE4296',
    fontFamily: 'MontserratLight',
    fontWeight: '400',
    fontSize: 14
  },
  fillingTimeText: {
    paddingBottom: 10
  },
  headlineText: {
    paddingTop: 10,
    fontSize: 16
  },
  pressHereToCompleteProfileText: {
    marginBottom: 10
  },
  mainContentContainer: {
    marginHorizontal: 20,
    marginVertical: 5
  },
  profileButtons: {
    flexDirection: 'row',
    marginHorizontal: 17,
    marginTop: 10
  },
  biggestButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#EE4296',
    flex: 1,
    width: 146,
    alignItems: 'center',
    paddingVertical: 5,
    marginRight: 8
  },
  profileButton: {
    backgroundColor: '#EE4296'
  },
  profileButtonText: {
    fontFamily: 'MontserratLight',
    color: '#FFFFFF'
  },
  editProfileButtonText: {
    fontFamily: 'MontserratLight',
    color: '#FFFFFF'
  },
  multipleMenuTitleContainer: {
    marginTop: 5,
    marginLeft: 17,
    marginBottom: 10
  },
  profilePic: {
    borderColor: '#EE4296',
    borderStyle: 'solid',
    borderWidth: 1,
    marginLeft: 17,
    position: 'absolute',
    bottom: -34,
    zIndex: 2,
    width: (width * 96 / 398),
    height: (width * 96 / 398),
    borderRadius: 45
  }
})
