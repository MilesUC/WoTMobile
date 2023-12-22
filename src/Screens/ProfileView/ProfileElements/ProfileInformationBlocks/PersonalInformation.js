/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { useSelector } from 'react-redux'
import TextInProfileData from '../TextInProfileData'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons'
import AddInformationAboutYou from './AddInformationAboutYou'
const { EXPO_PUBLIC_API_URL } = require('../../../../Utils/constants')

const interestsFormatter = (interests) => interests.split(',').map(s => s.trim()).join(', ')

export default function PersonalInformation () {
  const { userData, userToken } = useSelector((state) => state.auth)
  const [CVLink, setCVLink] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${EXPO_PUBLIC_API_URL}/users/files/getcv`, {
          headers: { Authorization: `Bearer ${userToken}` }
        })
        if (response.data.cvlink) {
          setCVLink(response.data.cvlink)
        }
      } catch (error) {
        console.error('Error fetching CV data:', error)
      }
    }

    fetchData()
  }, [userToken])

  const handleDownloadCV = async () => {
    console.log('Presionaste el botón')
    if (CVLink) {
      await WebBrowser.openBrowserAsync(CVLink)
    }
  }

  const hasData = userData.rut || userData.celular || userData.paisDomicilio?.pais || userData.regionActualDomicilio?.nombre || userData.intereses

  return (
    <>
      { hasData
        ? (
          <View>
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Correo electrónico</Text>
              <Text style={styles.subtitle}>{userData.mail}</Text>
            </View>
          </View>
          {userData.rut && <TextInProfileData title={'RUT'} subtitle={userData.rut} fieldName={'rut'} userToken={userToken} menuToEdit={'EditPersonalInformation'}/>}
          {userData.celular && <TextInProfileData title={'Número de teléfono'} subtitle={userData.celular} fieldName={'celular'} userToken={userToken} menuToEdit={'EditPersonalInformation'}/>}
          {userData.paisDomicilio?.pais && <TextInProfileData title={'País de domicilio'} subtitle={userData.paisDomicilio.pais} fieldName={'id_pais_domicilio'} userToken={userToken} menuToEdit={'EditPersonalInformation'}/>}
          {userData.regionActualDomicilio?.nombre && <TextInProfileData title={'Región de domicilio'} subtitle={userData.regionActualDomicilio.nombre} fieldName={'region_domicilio'} userToken={userToken} menuToEdit={'EditPersonalInformation'}/>}
          {userData.intereses && <TextInProfileData title={'Intereses'} subtitle={interestsFormatter(userData.intereses)} fieldName={'intereses'} userToken={userToken} menuToEdit={'EditPersonalInformation'}/>}
          {CVLink && (
            <TouchableOpacity style={{ marginVertical: '3%', marginHorizontal: '2%', flexDirection: 'row' }} onPress={handleDownloadCV}>
              <Text style={{ fontFamily: 'MontserratBold', fontSize: 14, color: '#5A5A5A', marginRight: '2%' }}>
                Descargar currículum
              </Text>
              <Ionicons name='download-outline' size={20} color={'#5A5A5A'}/>
            </TouchableOpacity>
          )}
        </View>
          ) : (
        <View>
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Correo electrónico</Text>
              <Text style={styles.subtitle}>{userData.mail}</Text>
            </View>
          </View>
        <AddInformationAboutYou nextScreen={'EditPersonalInformation'}/>
        </View>
          )}
    </>
  )
}
/* eslint-enable multiline-ternary */

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    marginBottom: 10
  },
  textContainer: {
    flex: 1
  },
  title: {
    fontSize: 14,
    color: '#5A5A5A',
    fontFamily: 'MontserratBold'
  },
  subtitle: {
    fontSize: 14,
    color: '#5A5A5A',
    marginTop: 5,
    fontFamily: 'MontserratLight'
  }
})
