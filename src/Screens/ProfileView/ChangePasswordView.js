import React, { useState } from 'react'
import { StyleSheet, StatusBar, Text, ScrollView, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RoundedTextInputPassword from '../../Components/Fields/RoundedTextInputPassword'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { Formik } from 'formik'
import axios from 'axios'
import ToastManager, { Toast } from 'toastify-react-native'
const { EXPO_PUBLIC_API_URL } = require('../../Utils/constants')

export default function ChangePasswordView () {
  const navigation = useNavigation()
  const { userData, userToken } = useSelector((state) => state.auth)
  const editPasswordValidationSchema = yup.object().shape({
    oldPassword: yup
      .string()
      .min(8, 'Tu contraseña actual tiene como mínimo 8 caracteres.'),
    newPassword: yup
      .string()
      .min(8, 'Tu contraseña debe contener como mínimo 8 caracteres.'),
    newPasswordConfirmation: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Las contraseñas deben coincidir.')
  })

  const handleSubmit = async (formData) => {
    try {
      delete formData.newPasswordConfirmation
      const response = await axios.post(`${EXPO_PUBLIC_API_URL}/users/change_password`,
        formData,
        { headers: { Authorization: `Bearer ${userToken}` } })
      console.log(response)
      if (response.status === 200) {
        Toast.success('Clave cambiada exitosamente', 5000)
        navigation.navigate('ProfileScreen')
      } else {
        Toast.error('Error al cambiar la contraseña. Inténtalo de nuevo.')
      }
      navigation.push('ProfileScreen')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    <StatusBar style='dark' />
    <SafeAreaView>
      <ScrollView>
        <ToastManager/>
        <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.push('ProfileScreen')}>
          <Ionicons size={19} color={'#EE4296'} name={'chevron-back-outline'}/>
          <Text style={styles.backButtonText}>
            Perfil
          </Text>
        </TouchableOpacity>
        <View style={styles.horizontalTopLine}/>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}> Cambiar contraseña </Text>
        </View>
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
            <Formik
                initialValues={{
                  oldPassword: '',
                  newPassword: '',
                  newPasswordConfirmation: ''
                }}
                onSubmit={values => handleSubmit(values)}
                validationSchema={editPasswordValidationSchema}
            >
            {({
              values, handleChange, errors, setFieldTouched, touched,
              isValid, handleSubmit
            }) => (
                <>
                <RoundedTextInputPassword
                    fieldName="Contraseña actual"
                    value={values.oldPassword}
                    onChangeText={handleChange('oldPassword')}
                    onBlur={() => setFieldTouched('oldPassword')}
                    error={touched.oldPassword && errors.oldPassword}
                />
                <RoundedTextInputPassword
                  fieldName="Nueva contraseña"
                  value={values.newPassword}
                  onChangeText={handleChange('newPassword')}
                  onBlur={() => setFieldTouched('newPassword')}
                  error={touched.newPassword && errors.newPassword}
                />
                <RoundedTextInputPassword
                  fieldName="Confirma la nueva contraseña"
                  value={values.newPasswordConfirmation}
                  onChangeText={handleChange('newPasswordConfirmation')}
                  onBlur={() => setFieldTouched('newPasswordConfirmation')}
                  error={touched.newPasswordConfirmation && errors.newPasswordConfirmation}
                />
                <TouchableOpacity title="Submit" onPress={handleSubmit}
                    style={styles.submitButton}>
                    <Text style={styles.submitButtonText}> Cambiar contraseña </Text>
                </TouchableOpacity>
                </>)}
            </Formik>
            </View>
      </ScrollView>
    </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    textAlign: 'center'
  },
  mainContainer: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 20
  },
  titleText: {
    fontFamily: 'MontserratBold',
    textAlign: 'center',
    fontSize: 28,
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
  submitButton: {
    marginVertical: 15,
    paddingVertical: 10,
    borderColor: '#EE4296',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    alignItems: 'center'
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'MontserratLight',
    color: '#EE4296'
  },
  horizontalTopLine: {
    borderBottomColor: '#EE4296',
    borderBottomWidth: 1,
    width: '100%'
  }
})
