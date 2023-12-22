import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, Switch, View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import CustomLoader from '../../Components/CustomLoader'
const { EXPO_PUBLIC_API_URL } = require('../../Utils/constants')

export default function NotificationsPreferences () {
  const [isLoading, setIsLoading] = useState(true)
  const [initialPreferences, setInitialPreferences] = useState({
    busquedaEmpresas: true,
    publicaciones: true,
    conectarComunidades: true,
    actividadComunidades: true,
    actualizacionesPerfil: true
  })
  const { userToken } = useSelector((state) => state.auth)

  const getPreferences = async () => {
    const { data } = await axios.get(
      `${EXPO_PUBLIC_API_URL}/notifications/get_notification_preferences`,
      { headers: { Authorization: `Bearer ${userToken}` } }
    )
    setInitialPreferences(data.notificationPreferences)
    setIsLoading(false)
  }

  useEffect(() => {
    getPreferences()
  }, [])

  const getLabel = (key) => {
    const labels = {
      busquedaEmpresas: 'Apariciones en búsquedas',
      publicaciones: 'Mis publicaciones',
      conectarComunidades: 'Recomendación de comunidades',
      actividadComunidades: 'Actividad en comunidades',
      actualizacionesPerfil: 'Actualizaciones de perfil'
    }
    return labels[key] || key
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${EXPO_PUBLIC_API_URL}/notifications/edit_notification_preferences`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify(initialPreferences)
      })

      if (!response.ok) {
        throw new Error('Error updating notification preferences')
      }
      Alert.alert('Éxito', 'Preferencias actualizadas correctamente.')
    } catch (error) {
      console.error('Error sending notification preferences:', error)
      Alert.alert('Error', 'Error al actualizar preferencias. Inténtalo más tarde.')
    }
    setIsLoading(false)
  }

  const handleToggleSwitch = (notificationType) => {
    setInitialPreferences({ ...initialPreferences, [notificationType]: !initialPreferences[notificationType] })
  }

  if (isLoading) {
    return (<CustomLoader/>)
  } else {
    return (
        <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Ajustes de notificaciones</Text>
        </View>
        <View style={styles.horizontalLine}/>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>Activa las notificaciones de acuerdo a tus intereses.</Text>
        </View>
        {Object.keys(initialPreferences).map((key) => (
          <View key={key} style={styles.option}>
            <Text style={styles.label}>{getLabel(key)}</Text>
            <Switch
              trackColor={{ false: '#5A5A5A', true: '#9D9D9D' }}
              thumbColor={initialPreferences[key] ? '#EE4296' : 'white'}
              onValueChange={() => handleToggleSwitch(key)}
              value={initialPreferences[key]}
            />
          </View>
        ))}
        <TouchableOpacity title="Submit" onPress={handleSave} style={styles.submitButton}>
            <Text style={styles.submitButtonText}> Guardar preferencias </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '5%'
  },
  submitButton: {
    marginVertical: 15,
    paddingVertical: 10,
    borderColor: '#EE4296',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    alignItems: 'center'
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  label: {
    fontSize: 14,
    fontFamily: 'MontserratLight',
    color: '#5A5A5A'
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'MontserratBold',
    color: '#EE4296'
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%'
  },
  titleText: {
    fontFamily: 'MontserratBold',
    fontSize: 22,
    color: '#5A5A5A'
  },
  subtitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '6%'
  },
  subtitleText: {
    fontFamily: 'MontserratLight',
    fontSize: 16,
    color: '#5A5A5A',
    textAlign: 'center'
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10
  }
})
