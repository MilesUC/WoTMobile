import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import * as yup from 'yup'
import * as DocumentPicker from 'expo-document-picker'
import { Formik } from 'formik'
import { fetchPickFields } from '../../Redux/Slices/pickFieldsSlice'
import TextFieldInput from '../../Components/Fields/TextFieldInput'
import CustomLoader from '../../Components/CustomLoader'
import CountryAndRegionInput from '../../Components/Fields/CountryAndRegionInput'
import { Dots } from '../../Components/Dots'
import ToastManager, { Toast } from 'toastify-react-native'
import ExtendingTextInput from '../../Components/Fields/ExtendingTextInput'
import { updateUserProfile } from '../../Utils/updateUserProfile'
import axios from 'axios'
const { EXPO_PUBLIC_API_URL } = require('../../Utils/constants')

export default function EditPersonalInformationTemplate ({ showDeleteButton, nextView, showDots }) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const formStep = useSelector(state => state.auth.formStep)
  const { userData, userToken } = useSelector((state) => state.auth)
  const pickFieldsData = useSelector((state) => state.pickFields.data)
  const lastFetched = useSelector((state) => state.pickFields.lastFetched)
  const [dataPresent, setDataPresent] = useState(false)
  const [regions, setRegions] = useState([])
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(userData.paisDomicilio ? `${userData.paisDomicilio.id}` : null)
  const [region, setRegion] = useState(userData.regionActualDomicilio ? userData.regionActualDomicilio.id : null)

  useEffect(() => {
    const fetchEndpoints = ['countries', 'regions']

    fetchEndpoints.forEach((endpointIdentifier) => {
      const currentData = pickFieldsData[endpointIdentifier]
      const lastFetchedTime = lastFetched[endpointIdentifier]

      if (!currentData || (lastFetchedTime && Date.now() - lastFetchedTime > 24 * 60 * 60 * 1000)) {
        dispatch(fetchPickFields(endpointIdentifier))
      }
    })
  }, [dispatch, pickFieldsData, lastFetched])

  useEffect(() => {
    console.log(userData)
    if (pickFieldsData.regions) {
      const transformedRegions = pickFieldsData.regions.map(item => ({
        value: item.id,
        label: item.nombre
      }))
      setRegions(transformedRegions)
    }

    if (pickFieldsData.countries) {
      const transformedCountries = pickFieldsData.countries.map(item => ({
        value: item.id,
        label: item.pais
      }))
      setCountries(transformedCountries)
    }

    if (pickFieldsData.regions && pickFieldsData.countries) {
      setDataPresent(true)
    }
  }, [pickFieldsData])

  const continueButtonStyle = {
    backgroundColor: '#EE4296',
    left: '10%'
  }

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
      .max(500, 'Tu presentación no puede superar los 500 caracteres.'),
    intereses: yup
      .string()
      .required('Completa tus intereses.')
      .matches(/^([a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+(?:,\s*[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+){0,2})?$/,
        'Máximo tres palabras separadas por coma.'),
    id_pais_domicilio: yup
      .number()
      .required('Selecciona un país.'),
    region_domicilio: yup
      .string()
      .test(
        'conditional-region-check',
        'Selecciona una región.',
        function (value) {
          const { id_pais_domicilio } = this.parent // eslint-disable-line camelcase
          return id_pais_domicilio !== 1 || (id_pais_domicilio === 1 && !!value) // eslint-disable-line camelcase
        }
      )
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
    console.log(formStep)
    console.log(formData)
    const parts = formData.intereses.split(',')
    const trimmedParts = parts.map(part => part.trim())
    formData.intereses = trimmedParts.join(',')
    formData.id_pais_domicilio = parseInt(country)
    formData.region_domicilio = region
    const nonEmptyDataToSend = Object.keys(formData)
      .filter(key => !!formData[key])
      .reduce((result, key) => {
        result[key] = formData[key]
        return result
      }, {})
    console.log(`Se va a enviar ${nonEmptyDataToSend}`)
    try {
      console.log('Entró al try arriba de updateUserProfile')
      updateUserProfile(nonEmptyDataToSend, userToken, dispatch)
      navigation.navigate(nextView)
    } catch (err) {
      console.log(err)
    }
  }

  if (!dataPresent) {
    return (
      <CustomLoader/>
    )
  } else {
    return (
      <View>
        <Formik
          initialValues={{
            name: userData.nombre || '',
            lastName: userData.apellido || '',
            rut: userData.rut || '',
            celular: userData.celular || '',
            id_pais_domicilio: (userData.paisDomicilio && userData.paisDomicilio.id) ? userData.paisDomicilio.id : 0,
            region_domicilio: userData.regionActualDomicilio ? userData.regionActualDomicilio.id : 0,
            brief: userData.brief || '',
            intereses: userData.intereses || ''
          }}
          onSubmit={(values) => {
            values.id_pais_domicilio = country
            values.region_domicilio = region
            handleSubmit(values)
          }}
            validationSchema={editPersonalInformationValidationSchema}
          >
          {({
            values, handleChange, errors, setFieldTouched, touched,
            isValid, handleSubmit
          }) => (
            <>
                  <TextFieldInput
                    labelName={'Nombre'}
                    labelDescription={'Ej: Josefina'}
                    onChangeText={handleChange('name')}
                    onBlur={() => setFieldTouched('name')}
                    error={touched.name && errors.name}
                    value={values.name}
                  />
                  <TextFieldInput
                    labelName={'Apellido'}
                    labelDescription={'Ej: Lagos'}
                    onChangeText={handleChange('lastName')}
                    onBlur={() => setFieldTouched('lastName')}
                    error={touched.lastName && errors.lastName}
                    value={values.lastName}
                  />
                  <TextFieldInput
                    labelName={'RUT'}
                    labelDescription={'Ej: 19.453.305-5'}
                    onChangeText={handleChange('rut')}
                    onBlur={() => setFieldTouched('rut')}
                    error={touched.rut && errors.rut}
                    value={values.rut}
                  />
                  <TextFieldInput
                    labelName={'Celular'}
                    labelDescription={'Ej: +569 88902311'}
                    onChangeText={handleChange('celular')}
                    onBlur={() => setFieldTouched('celular')}
                    error={touched.celular && errors.celular}
                    value={values.celular}
                  />
                  <CountryAndRegionInput
                    countries={countries}
                    regions={regions}
                    selectedCountry={country}
                    onCountryChange={(itemValue) => {
                      setCountry(itemValue)
                    }}
                    selectedRegion={region}
                    onRegionChange={(itemValue) => {
                      setRegion(itemValue)
                    }}
                    countryError={touched.id_pais_domicilio && errors.id_pais_domicilio}
                    regionError={touched.region_domicilio && errors.region_domicilio}
                  />
                  <Text style={{ fontFamily: 'MontserratBold', color: '#5A5A5A', marginBottom: 10 }}>
                    Escribe una presentación para tu perfil (máximo 500 caracteres)
                  </Text>
                  <ExtendingTextInput
                    value={values.brief}
                    onChangeText={handleChange('brief')}
                    onBlur={() => setFieldTouched('brief')}
                    error={touched.brief && errors.brief}
                    placeholder={values.brief}
                  />
                  <TextFieldInput
                    labelName={'Intereses'}
                    labelDescription={'Señala tus principales intereses personales o profesionales. Escribe máximo 3 palabras separadas por una coma.'}
                    onChangeText={handleChange('intereses')}
                    onBlur={() => setFieldTouched('intereses')}
                    error={touched.intereses && errors.intereses}
                    value={values.intereses}
                  />
                  <ToastManager/>
                  <TouchableOpacity
                    onPress={() => uploadCV()}
                    style={styles.uploadButton}
                  >
                    <Text style={styles.uploadButtonText}> Subir CV </Text>
                  </TouchableOpacity>
                  {
                    showDots
                      ? <Dots total={7} selectedIndex={0}/>
                      : null
                  }
                  <TouchableOpacity
                    className='w-4/5 p-3 rounded-xl mb-10 mt-5'
                    style={continueButtonStyle}
                    onPress={handleSubmit}
                  >
                    <Text className='text-xl font-bold text-white text-center'>
                      Guardar
                    </Text>
                  </TouchableOpacity>
                </>
          )}
        </Formik>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  uploadButton: {
    width: '100%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EE4296',
    borderRadius: 20,
    marginTop: 10
  },
  uploadButtonText: {
    fontFamily: 'MontserratBold',
    color: '#EE4296',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 10
  }
})
