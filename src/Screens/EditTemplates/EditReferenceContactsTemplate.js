import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import * as yup from 'yup'
import { Formik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import RoundedTextInput from '../../Components/Fields/RoundedTextInput'
import { updateUserProfile } from '../../Utils/updateUserProfile'
import { Dots } from '../../Components/Dots'
import { completeSignUp } from '../../Redux/Slices/userAuthSlice'

const continueButtonStyle = {
  backgroundColor: '#EE4296',
  width: '100%'
}

export default function EditReferenceContactsInformationTemplate ({ showDeleteButton, nextView, showDots }) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { userData, userToken } = useSelector((state) => state.auth)

  const editValidationSchema = yup.object().shape({
    firstContactName: yup
      .string()
      .min(2, 'Tu nombre debe tener al menos 2 caracteres.'),
    secondContactName: yup
      .string()
      .min(2, 'Tu nombre debe tener al menos 2 caracteres.'),
    thirdContactName: yup
      .string()
      .min(2, 'Tu nombre debe tener al menos 2 caracteres.'),
    firstContactMail: yup.string()
      .email('El email es inválido'),
    secondContactMail: yup.string()
      .email('El email es inválido'),
    thirdContactMail: yup.string()
      .email('El email es inválido'),
    firstContactPhone: yup
      .string()
      .min(6, 'El número debe tener al menos 6 caracteres.')
      .max(20, ({ max }) => `El número puede tener como máximo ${max} caracteres.`)
      .matches(/^\+\s*\d(?:[\d\s]*\d)?$/, 'El número de teléfono debe comenzar con un signo + seguido de dígitos.'),
    secondContactPhone: yup
      .string()
      .min(6, 'El número debe tener al menos 6 caracteres.')
      .max(20, ({ max }) => `El número puede tener como máximo ${max} caracteres.`)
      .matches(/^\+\s*\d(?:[\d\s]*\d)?$/, 'El número de teléfono debe comenzar con un signo + seguido de dígitos.'),
    thirdContactPhone: yup
      .string()
      .min(6, 'El número debe tener al menos 6 caracteres.')
      .max(20, ({ max }) => `El número puede tener como máximo ${max} caracteres.`)
      .matches(/^\+\s*\d(?:[\d\s]*\d)?$/, 'El número de teléfono debe comenzar con un signo + seguido de dígitos.'),
  })

  const handleSubmit = async (formData) => {
    console.log(formData)
    const contactsData = {
      contactos: [
        [
          formData.firstContactName,
          formData.firstContactMail,
          formData.firstContactPhone
        ],
        [
          formData.secondContactName,
          formData.secondContactMail,
          formData.secondContactPhone
        ],
        [
          formData.thirdContactName,
          formData.thirdContactMail,
          formData.thirdContactPhone
        ]
      ]
    }
    const nonEmptyDataToSend = Object.keys(contactsData)
      .filter(key => !!formData[key])
      .reduce((result, key) => {
        result[key] = formData[key]
        return result
      }, {})
    console.log([nonEmptyDataToSend])
    try {
      updateUserProfile(contactsData, userToken, dispatch)
      navigation.navigate(nextView)
    } catch (err) {
      console.log(err)
    }
  }

  return (
            <View>
            <Text style={{ fontFamily: 'MontserratLight', fontSize: 13 }}>Si tienes contactos que puedan validar la información, escribe sus datos en este formulario. </Text>
            <Formik
                initialValues={{
                  firstContactName: userData.contactos_verificacion && userData.contactos_verificacion[0] ? userData.contactos_verificacion[0].nombre : '',
                  firstContactPhone: userData.contactos_verificacion && userData.contactos_verificacion[0] ? userData.contactos_verificacion[0].telefono : '',
                  firstContactMail: userData.contactos_verificacion && userData.contactos_verificacion[0] ? userData.contactos_verificacion[0].email : '',
                  secondContactName: userData.contactos_verificacion && userData.contactos_verificacion[1] ? userData.contactos_verificacion[1].nombre : '',
                  secondContactPhone: userData.contactos_verificacion && userData.contactos_verificacion[1] ? userData.contactos_verificacion[1].telefono : '',
                  secondContactMail: userData.contactos_verificacion && userData.contactos_verificacion[1] ? userData.contactos_verificacion[1].email : '',
                  thirdContactName: userData.contactos_verificacion && userData.contactos_verificacion[2] ? userData.contactos_verificacion[2].nombre : '',
                  thirdContactPhone: userData.contactos_verificacion && userData.contactos_verificacion[2] ? userData.contactos_verificacion[2].telefono : '',
                  thirdContactMail: userData.contactos_verificacion && userData.contactos_verificacion[2] ? userData.contactos_verificacion[2].email : ''
                }}
                onSubmit={values => handleSubmit(values)}
                validationSchema={editValidationSchema}
            >
            {({
              values, handleChange, errors, setFieldTouched, touched,
              isValid, handleSubmit
            }) => (
                <>
                <Text style={styles.contactTitle}>
                  Primer contacto
                </Text>
                <RoundedTextInput
                    fieldName="Nombre"
                    value={values.firstContactName}
                    onChangeText={handleChange('firstContactName')}
                    onBlur={() => setFieldTouched('firstContactName')}
                    error={touched.firstContactName && errors.firstContactName}
                />
                <RoundedTextInput
                  fieldName="Teléfono"
                  value={values.firstContactPhone}
                  onChangeText={handleChange('firstContactPhone')}
                  onBlur={() => setFieldTouched('firstContactPhone')}
                  error={touched.firstContactPhone && errors.firstContactPhone}
                />
                <RoundedTextInput
                  fieldName="Correo"
                  value={values.firstContactMail}
                  onChangeText={handleChange('firstContactMail')}
                  onBlur={() => setFieldTouched('firstContactMail')}
                  error={touched.firstContactMail && errors.firstContactMail}
                />
                <Text style={styles.contactTitle}>
                  Segundo contacto
                </Text>
                <RoundedTextInput
                    fieldName="Nombre"
                    value={values.secondContactName}
                    onChangeText={handleChange('secondContactName')}
                    onBlur={() => setFieldTouched('secondContactName')}
                    error={touched.secondContactName && errors.secondContactName}
                />
                <RoundedTextInput
                  fieldName="Teléfono"
                  value={values.secondContactPhone}
                  onChangeText={handleChange('secondContactPhone')}
                  onBlur={() => setFieldTouched('secondContactPhone')}
                  error={touched.secondContactPhone && errors.secondContactPhone}
                />
                <RoundedTextInput
                  fieldName="Correo"
                  value={values.secondContactMail}
                  onChangeText={handleChange('secondContactMail')}
                  onBlur={() => setFieldTouched('secondContactMail')}
                  error={touched.secondContactMail && errors.secondContactMail}
                />
                <Text style={styles.contactTitle}>
                  Tercer contacto
                </Text>
                <RoundedTextInput
                    fieldName="Nombre"
                    value={values.thirdContactName}
                    onChangeText={handleChange('thirdContactName')}
                    onBlur={() => setFieldTouched('thirdContactName')}
                    error={touched.thirdContactName && errors.thirdContactName}
                />
                <RoundedTextInput
                  fieldName="Teléfono"
                  value={values.thirdContactPhone}
                  onChangeText={handleChange('thirdContactPhone')}
                  onBlur={() => setFieldTouched('thirdContactPhone')}
                  error={touched.thirdContactPhone && errors.thirdContactPhone}
                />
                <RoundedTextInput
                  fieldName="Correo"
                  value={values.thirdContactMail}
                  onChangeText={handleChange('thirdContactMail')}
                  onBlur={() => setFieldTouched('thirdContactMail')}
                  error={touched.thirdContactMail && errors.thirdContactMail}
                />
                {
                  showDots
                    ? <Dots total={7} selectedIndex={6}/>
                    : null
                }
                <TouchableOpacity
                    className="w-4/5 p-3 rounded-xl mb-10 mt-5"
                    style={continueButtonStyle}
                    onPress={() => {
                      handleSubmit()
                      dispatch(completeSignUp())
                    }}
                  >
                  <Text className="text-xl font-bold text-white text-center">
                    Guardar
                  </Text>
                </TouchableOpacity>
                </>)}
            </Formik>
            </View>
  )
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
  contactTitle: {
    fontFamily: 'MontserratBold',
    fontSize: 14,
    color: '#5A5A5A',
    marginTop: '3%'
  }
})
