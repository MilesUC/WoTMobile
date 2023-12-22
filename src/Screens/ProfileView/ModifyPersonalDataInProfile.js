import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import axios from 'axios'
import * as yup from 'yup'
import * as DocumentPicker from 'expo-document-picker'
import { Formik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import RoundedTextInput from '../../Components/Fields/RoundedTextInput'
import ExtendingTextInput from '../../Components/Fields/ExtendingTextInput'
import CustomLoader from '../../Components/CustomLoader'
import { updateUserProfile } from '../../Utils/updateUserProfile'
import ToastManager, { Toast } from 'toastify-react-native'
const { EXPO_PUBLIC_API_URL } = require('../../Utils/constants')

export default function ModifyPersonalDataInProfile () {
  const navigation = useNavigation()
  const { userData, userToken } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const editPersonalInformationValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Ingresa tu nombre.')
      .min(2, ({ min }) => `Tu nombre debe tener al menos ${min} caracteres.`),
    lastName: yup
      .string()
      .required('Ingresa tu apellido.')
      .min(2, ({ min }) => `Tu nombre debe tener al menos ${min} caracteres.`),
    rut: yup
      .string()
      .required('Debes ingresar tu RUT.')
      .matches(/^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$/, 'El RUT debe ser chileno, contener punto, guion y dígito verificador.'),
    celular: yup
      .string()
      .required('Debes ingresar tu número de teléfono.')
      .min(6, ({ min }) => `El número debe tener al menos ${min} caracteres.`)
      .max(20, ({ max }) => `El número puede tener como máximo ${max} caracteres.`)
      .matches(/^\+\s*\d(?:[\d\s]*\d)?$/, 'El número de teléfono debe comenzar con un signo + seguido de dígitos.'),
    brief: yup
      .string()
      .required('Ingresa una breve presentación personal.')
      .max(500, 'Tu presentación no puede superar los 500 caracteres.')
  })

  const uploadCV = async () => {
    console.log('User has to pick a document')
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true
      })
      if (!result.canceled && result.assets && result.assets[0] && result.assets[0].uri) {
        console.log('Success')
        uploadFile(result.assets[0].uri)
      } else {
        console.log('There was an error')
      }
    } catch (error) {
      console.error('Error picking document:', error)
    }
  }

  const uploadFile = async (uri) => {
    console.log(uri)
    const formData = new FormData()
    await formData.append('pdf', {
      uri,
      name: 'curriculumfile.pdf',
      type: 'application/pdf'
    })
    try {
      const response = await axios.patch(`${EXPO_PUBLIC_API_URL}/users/updatecv`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      if (response.status === 200) {
        console.log(response.status)
        Toast.success('Currículum subido.')
      } else {
        Toast.error('Error en la carga del currículum.')
      }
    } catch (error) {
      console.error('Axios error:', error)
      if (error.response) {
        console.error('Server responded with:', error.response.data)
        console.error('Status code:', error.response.status)
        console.error('Headers:', error.response.headers)
      }
    }
  }

  const handleSubmit = async (formData) => {
    console.log(`Entra a updateUserProfile con ${formData}`)
    const nonEmptyDataToSend = Object.keys(formData)
      .filter(key => !!formData[key])
      .reduce((result, key) => {
        result[key] = formData[key]
        return result
      }, {})
    console.log(nonEmptyDataToSend)
    try {
      const response = await updateUserProfile(nonEmptyDataToSend, userToken, dispatch)
      console.log(response)
      if (response.status === 200) {
        navigation.push('ProfileScreen')
      } else {
        console.error('Request failed with status code', response.status)
      }
    } catch (err) {
      console.log(err)
    }
  }

  if (!userData) {
    return (
      <CustomLoader/>
    )
  } else {
    return (
        <View style={{ backgroundColor: '#F5F5F5' }}>
          <Text style={styles.areaTitleText}> Información personal </Text>
            <View>
            <Formik
                initialValues={{
                  name: userData.nombre || '',
                  lastName: userData.apellido || '',
                  rut: userData.rut || '',
                  celular: userData.celular || '',
                  brief: userData.brief || ''
                }}
                onSubmit={values => handleSubmit(values)}
                validationSchema={editPersonalInformationValidationSchema}
            >
            {({
              values, handleChange, errors, setFieldTouched, touched,
              isValid, handleSubmit
            }) => (
                <>
                <RoundedTextInput
                    fieldName="Nombre"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={() => setFieldTouched('name')}
                    error={touched.name && errors.name}
                />
                <RoundedTextInput
                  fieldName="Apellido"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={() => setFieldTouched('lastName')}
                  error={touched.lastName && errors.lastName}
                />
                <RoundedTextInput
                  fieldName="RUT"
                  value={values.rut}
                  onChangeText={handleChange('rut')}
                  onBlur={() => setFieldTouched('rut')}
                  error={touched.rut && errors.rut}
                />
                <RoundedTextInput
                  fieldName="Teléfono"
                  value={values.celular}
                  onChangeText={handleChange('celular')}
                  onBlur={() => setFieldTouched('celular')}
                  error={touched.celular && errors.celular}
                />
                <Text style={{ fontFamily: 'MontserratLight', color: '#5A5A5A', marginBottom: 10}}>
                  Escribe una presentación de tu perfil en máximo 500 caracteres.
                </Text>
                <ExtendingTextInput
                  value={values.brief}
                  onChangeText={handleChange('brief')}
                  onBlur={() => setFieldTouched('brief')}
                  error={touched.brief && errors.brief}
                />
                <ToastManager/>
                  <TouchableOpacity
                    onPress={() => uploadCV()}
                    style={styles.uploadButton}
                  >
                    <Text style={styles.uploadButtonText}> Subir CV </Text>
                  </TouchableOpacity>
                <TouchableOpacity title="Submit" onPress={handleSubmit}
                    style={styles.submitButton}>
                    <Text style={styles.submitButtonText}> Guardar datos </Text>
                </TouchableOpacity>
                </>)}
            </Formik>
            <TouchableOpacity onPress={() => navigation.push('ChangePassword')}
              style={styles.submitButton}>
              <Text style={styles.submitButtonText}> Cambiar contraseña </Text>
            </TouchableOpacity>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  inputField: {
    marginBottom: 10
  },
  briefInputField: {
    marginBottom: 30
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
  areaTitleText: {
    fontFamily: 'MontserratLight',
    fontWeight: '400',
    fontSize: 16,
    marginVertical: 10
  },
  text: {
    fontFamily: 'MontserratLight',
    fontSize: 14,
    fontWeight: 'bold'
  },
  textInput: {
    fontFamily: 'MontserratLight',
    fontWeight: '400',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    height: 30,
    paddingBottom: 3
  },
  uploadButton: {
    width: '100%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EE4296',
    borderRadius: 5,
    marginTop: 10
  },
  uploadButtonText: {
    fontFamily: 'MontserratLight',
    color: '#EE4296',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 10
  }
})
