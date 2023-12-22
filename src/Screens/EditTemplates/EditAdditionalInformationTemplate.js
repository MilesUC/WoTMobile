import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Linking } from 'react-native'
import { Formik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import CustomLoader from '../../Components/CustomLoader'
import SimplePickerInput from '../../Components/Fields/SimplePickerInput'
import { fetchPickFields } from '../../Redux/Slices/pickFieldsSlice'
import { updateUserProfile } from '../../Utils/updateUserProfile.js'
import { Dots } from '../../Components/Dots'
import TextFieldInput from '../../Components/Fields/TextFieldInput'
import Checkbox from '../../Components/Fields/CheckBox'

export default function EditAdditionalInformationTemplate ({ showDeleteButton, nextView, showDots }) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { userData, userToken } = useSelector((state) => state.auth)
  const pickFieldsData = useSelector((state) => state.pickFields.data)
  const lastFetched = useSelector((state) => state.pickFields.lastFetched)
  const [isChecked, setIsChecked] = useState(false)
  const [idiomas, setIdiomas] = useState([])
  const [regiones, setRegiones] = useState([])
  const [personalidadPosibilidades, setPersonalidadPosibilidades] = useState([])
  const [conocioWotPosibilidades, setConocioWotPosibilidades] = useState([])
  const [idiomasSeleccionados, setIdiomasSeleccionados] = useState('')
  const [personalidadSeleccionada, setPersonalidadSeleccionada] = useState('')
  const [wotSeleccionado, setWotSeleccionado] = useState('')
  const [regionesSeleccionadas, setRegionesSeleccionadas] = useState('')
  const [dataPresent, setDataPresent] = useState(false)
  // eslint-disable-next-line no-unused-vars

  useEffect(() => {
    const timeLimit = 24 * 60 * 60 * 1000
    const fetchEndpoints = ['languages', 'personalityTestResults', 'wayOfKnowingWot', 'regions']

    fetchEndpoints.forEach((endpointIdentifier) => {
      const currentData = pickFieldsData[endpointIdentifier]
      const lastFetchedTime = lastFetched[endpointIdentifier]

      if (!currentData || (lastFetchedTime && Date.now() - lastFetchedTime > timeLimit)) {
        dispatch(fetchPickFields(endpointIdentifier))
      }
    })
  }, [dispatch, pickFieldsData, lastFetched])

  useEffect(() => {
    if (pickFieldsData.languages) {
      const transformedFirstSetOfData = pickFieldsData.languages.map(item => ({
        value: item.id,
        label: item.nombre
      }))
      setIdiomas(transformedFirstSetOfData)
    }

    if (pickFieldsData.regions) {
      const transformedSecondSetOfData = pickFieldsData.regions.map(item => ({
        value: item.id,
        label: item.nombre
      }))
      setRegiones(transformedSecondSetOfData)
    }

    if (pickFieldsData.personalityTestResults) {
      const transformedThirdSetOfData = pickFieldsData.personalityTestResults.map(item => ({
        value: item.id,
        label: item.personalidad
      }))
      setPersonalidadPosibilidades(transformedThirdSetOfData)
    }

    if (pickFieldsData.wayOfKnowingWot) {
      const transformedFourthSetOfData = pickFieldsData.wayOfKnowingWot.map(item => ({
        value: item.id,
        label: item.conocio
      }))
      setConocioWotPosibilidades(transformedFourthSetOfData)
    }

    if (pickFieldsData.languages && pickFieldsData.regions &&
        pickFieldsData.personalityTestResults && pickFieldsData.wayOfKnowingWot) {
      setDataPresent(true)
    }
  }, [pickFieldsData])

  const editValidationSchema = yup.object().shape({
    idiomas: yup.string(),
    id_region_con_compromiso: yup.string(),
    id_conocio_wot: yup.number(),
    id_personalidad: yup.number().required('Debes responder este campo.'),
    factor: yup.string(),
    nombrePuebloOriginario: yup.string(),
    redesSociales: yup.string(),
    declaracion: yup
      .bool()
      .oneOf([true], 'Debes asegurar que la información ingresada es verídica para continuar.')
  })

  const toggleCheckbox = () => {
    setIsChecked(!isChecked)
  }

  const handleSubmit = async (formData) => {
    console.log(`Los datos iniciales son estos ${formData}`)
    if (formData.idiomas !== '') { formData.idiomas = [formData.idiomas] }
    console.log(formData)
    const nonEmptyDataToSend = Object.keys(formData)
      .filter(key => {
        const value = formData[key]
        return !(value === '' || (Array.isArray(value) && value.length === 0))
      })
      .reduce((result, key) => {
        result[key] = formData[key]
        return result
      }, {})
    console.log(nonEmptyDataToSend)
    try {
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
                  idiomas: (userData.idiomas && userData.idiomas[0]) ? userData.idiomas[0].id : 0,
                  id_region_con_compromiso: userData.regionCompromiso ? userData.regionCompromiso.id : 0,
                  id_conocio_wot: userData.conocioWOT ? userData.conocioWOT.id : 0,
                  id_personalidad: userData.personalidad ? userData.personalidad.id : 0,
                  factor: userData.factor || '',
                  nombrePuebloOriginario: userData.nombrePuebloOriginario || '',
                  redesSociales: userData.redesSociales || '',
                  declaracion: userData.declaracion || false
                }}
                onSubmit={values => handleSubmit(values)}
                validationSchema={editValidationSchema}
            >
            {({
              values, handleChange, errors, setFieldTouched, touched,
              isValid, handleSubmit, setFieldValue
            }) => (
                <>
                {console.log(values)}
                <SimplePickerInput
                  fieldName="Idioma"
                  explanation="¿En qué idioma tienes dominio medio-avanzado?"
                  alternatives={idiomas}
                  selectedAlternative={parseInt(values.idiomas)}
                  onAlternativeChange={handleChange('idiomas')}
                  error={touched.idiomas && errors.idiomas}
                />
                <TextFieldInput
                    labelName={'¿Tiene un factor de inclusión laboral?'}
                    labelDescription={'Si no tiene solo escriba \'No\'.'}
                    onChangeText={handleChange('factor')}
                    onBlur={() => setFieldTouched('factor')}
                    placeholder={userData.factor || ''}
                    error={touched.factor && errors.factor}
                />
                <SimplePickerInput
                  fieldName="¿Tiene relación o compromiso con alguna región del país?"
                  alternatives={regiones}
                  selectedAlternative={parseInt(values.id_region_con_compromiso)}
                  onAlternativeChange={handleChange('id_region_con_compromiso')}
                  error={touched.id_region_con_compromiso && errors.id_region_con_compromiso}
                />
                <TextFieldInput
                    labelName={'¿Se identifica con un pueblo originario?'}
                    labelDescription={'Escriba el nombre del pueblo acá. Si no tiene, solo escriba \'No\'.'}
                    onChangeText={handleChange('nombrePuebloOriginario')}
                    onBlur={() => setFieldTouched('nombrePuebloOriginario')}
                    placeholder={userData.nombrePuebloOriginario || ''}
                    error={touched.nombrePuebloOriginario && errors.nombrePuebloOriginario}
                />
                <SimplePickerInput
                  fieldName="¿Cómo conoció Wot?"
                  alternatives={conocioWotPosibilidades}
                  selectedAlternative={parseInt(values.id_conocio_wot)}
                  onAlternativeChange={handleChange('id_conocio_wot')}
                  error={touched.id_conocio_wot && errors.id_conocio_wot}
                />
                <TextFieldInput
                    labelName={'Perfil de redes sociales'}
                    labelDescription={'Escribe el nombre de usuario de alguna cuenta que quieras compartir.'}
                    onChangeText={handleChange('redesSociales')}
                    onBlur={() => setFieldTouched('redesSociales')}
                    placeholder={userData.redesSociales || ''}
                    error={touched.redesSociales && errors.redesSociales}
                />
                <SimplePickerInput
                  fieldName="Indica tu resultado del formulario de personalidad"
                  explanation="Lo puedes realizar en https://www.humanmetrics.com/personalidad/test"
                  alternatives={personalidadPosibilidades}
                  selectedAlternative={parseInt(values.id_personalidad)}
                  onAlternativeChange={handleChange('id_personalidad')}
                  error={touched.id_personalidad && errors.id_personalidad}
                />
                <Checkbox
                  label="La información entregada es verídica."
                  isChecked={values.declaracion}
                  onCheckChange={() => setFieldValue('declaracion', !values.declaracion)}
                  error={touched.declaracion && errors.declaracion}
                />
                {
                  showDots
                    ? <Dots total={7} selectedIndex={5}/>
                    : null
                }
                <TouchableOpacity
                    className="w-4/5 p-3 rounded-xl mb-10 mt-5"
                    style={{
                      backgroundColor: values.declaracion ? '#EE4296' : '#5A5A5A',
                      width: '100%'
                    }}
                    onPress={() => {
                      handleSubmit()
                    }}
                    disabled={!values.declaracion}
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
}
