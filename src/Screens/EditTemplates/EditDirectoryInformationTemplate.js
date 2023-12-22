import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { fetchPickFields } from '../../Redux/Slices/pickFieldsSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import SimplePickerInput from '../../Components/Fields/SimplePickerInput'
import { updateUserProfile } from '../../Utils/updateUserProfile'
import MultipleOptionsPicker from '../../Components/Fields/MultipleOptionsPicker'
import CustomLoader from '../../Components/CustomLoader'
import { Dots } from '../../Components/Dots'
import BinaryPickerInput from '../../Components/Fields/BinaryPickerInput'

export default function EditDirectoryInformationTemplate ({ showDeleteButton, nextView, showDots }) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { userData, userToken } = useSelector((state) => state.auth)
  const pickFieldsData = useSelector((state) => state.pickFields.data)
  const lastFetched = useSelector((state) => state.pickFields.lastFetched)
  const [añosE, setAñosE] = useState([])
  const [areas, setAreas] = useState([])
  const [industrias, setIndustrias] = useState([])
  const [competencias, setCompetencias] = useState([])
  const [anos, setAños] = useState('')
  const [experienciaDirectorios, setExperienciaDirectorios] = useState('')
  const [formacion, setFormacion] = useState('')
  const [area, setArea] = useState([])
  const [competencia, setCompetencia] = useState([])
  const [industria, setIndustria] = useState([])
  const [dataPresent, setDataPresent] = useState(false)

  const onSelectedAreasChange = (selectedAreas, setFieldValue) => {
    if (selectedAreas.length <= 5) {
      setFieldValue('areasExperiencia', selectedAreas)
      setArea(selectedAreas)
    } else {
      showAlert(5)
    }
  }

  const onSelectedIndustriesChange = (selectedIndustries, setFieldValue) => {
    if (selectedIndustries.length <= 5) {
      setFieldValue('industriasExperiencia', selectedIndustries)
      setArea(selectedIndustries)
    } else {
      showAlert(5)
    }
  }

  const onSelectedAbilitiesChange = (selectedAbilities, setFieldValue) => {
    console.log(selectedAbilities)
    if (selectedAbilities.length <= 5) {
      setFieldValue('competencias', selectedAbilities)
    } else {
      showAlert(5)
    }
  }

  const showAlert = (maximumAmountOfElements) =>
    Alert.alert(
      'Límite alcanzado',
    `Puedes seleccionar un máximo de ${maximumAmountOfElements} elementos.`,
    [{ text: 'Cerrar', style: 'cancel' }],
    { cancelable: true })

  const directoryExperience = [
    { value: true, label: 'Sí.' },
    { value: false, label: 'No.' }
  ]
  const altaDireccionAlternatives = [
    { value: true, label: 'Sí.' },
    { value: false, label: 'No.' }
  ]

  useEffect(() => {
    const timeLimit = 24 * 60 * 60 * 1000
    const fetchEndpoints = ['years_of_experience', 'areas', 'industries', 'competencies']

    fetchEndpoints.forEach((endpointIdentifier) => {
      const currentData = pickFieldsData[endpointIdentifier]
      const lastFetchedTime = lastFetched[endpointIdentifier]

      if (!currentData || (lastFetchedTime && Date.now() - lastFetchedTime > timeLimit)) {
        dispatch(fetchPickFields(endpointIdentifier))
      }
    })
  }, [dispatch, pickFieldsData, lastFetched])

  useEffect(() => {
    if (pickFieldsData.years_of_experience) {
      const transformedFirstSetOfData = pickFieldsData.years_of_experience.map(item => ({
        value: item.id,
        label: (item.rango_experiencia_desde + '-' + item.rango_experiencia_hasta)
      }))
      setAñosE(transformedFirstSetOfData)
    }

    if (pickFieldsData.industries) {
      const transformedSecondSetOfData = pickFieldsData.industries.map(item => ({
        value: item.id,
        label: item.nombre_industria
      }))
      setIndustrias(transformedSecondSetOfData)
    }

    if (pickFieldsData.areas) {
      const transformedThirdSetOfData = pickFieldsData.areas.map(item => ({
        value: item.id,
        label: item.nombre
      }))
      setAreas(transformedThirdSetOfData)
    }

    if (pickFieldsData.competencies) {
      const transformedFourthSetOfData = pickFieldsData.competencies.map(item => ({
        value: item.id,
        label: item.competencia
      }))
      setCompetencias(transformedFourthSetOfData)
    }

    if (pickFieldsData.years_of_experience && pickFieldsData.areas &&
        pickFieldsData.competencies && pickFieldsData.industries) {
      setDataPresent(true)
    }
  }, [pickFieldsData])

  const formValidationSchema = yup.object().shape({
    id_anios_experiencia: yup.string().required('Años de experiencia es requerido'),
    experienciaDirectorios: yup.boolean().required('Se requiere tu respuesta'),
    altaDireccion: yup.boolean().required('Se requiere tu respuesta'),
    industriasExperiencia: yup.array().required('Sector o industria es requerido').min(1, 'Debes seleccionar al menos una industria'),
    areasExperiencia: yup.array().required('Áreas de experiencia es requerido').min(1, 'Debes seleccionar al menos un área'),
    competencias: yup.array().required('Competencias profesionales es requerido').min(1, 'Debes seleccionar al menos una competencia')
  })

  const handleSubmit = async (formData) => {
    console.log('Hola')
    console.log(`Al handleSubmit llega ${JSON.stringify(formData)}`)
    if (area.length > 0) { formData.areasExperiencia = area }
    if (industria.length > 0) { formData.industriasExperiencia = industria }
    if (competencia.length > 0) { formData.competencias = competencia }
    // const nonEmptyDataToSend = Object.keys(formData)
    //   .filter(key => !!formData[key])
    //   .reduce((result, key) => {
    //     result[key] = formData[key]
    //     return result
    //   }, {})
    console.log(formData)
    try {
      updateUserProfile(formData, userToken, dispatch)
      navigation.navigate(nextView)
    } catch (err) {
      console.log(err)
    }
  }

  const continueButtonStyle = {
    backgroundColor: '#EE4296',
    width: '100%'
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
              id_anios_experiencia: userData.aniosExperiencia ? userData.aniosExperiencia.id.toString() : '',
              experienciaDirectorios: userData.experienciaDirectorios !== null ? userData.experienciaDirectorios : false,
              altaDireccion: userData.altaDireccion !== null ? userData.altaDireccion : false,
              industriasExperiencia: userData.industrias ? userData.industrias.map(item => item.id) : [],
              areasExperiencia: userData.areas ? userData.areas.map(item => item.id) : [],
              competencias: userData.competencia ? userData.competencia.map(item => item.id) : []
            }}
            validationSchema={formValidationSchema}
            onSubmit={values => handleSubmit(values)}
        >
        {({
          values, handleChange, errors, setFieldTouched, touched,
          isValid, handleSubmit, setFieldValue
        }) => (
            <>
            {console.log(values)}
            <SimplePickerInput
              fieldName='Años de experiencia'
              alternatives={añosE}
              selectedAlternative={parseInt(values.id_anios_experiencia)}
              onAlternativeChange={handleChange('id_anios_experiencia')}
              error={touched.id_anios_experiencia && errors.id_anios_experiencia}
            />
            <BinaryPickerInput
              fieldName='Experiencia en directorios'
              explanation='¿Has ejercido el rol de directora?'
              alternatives={directoryExperience}
              selectedAlternative={values.experienciaDirectorios}
              onAlternativeChange={(value) => setFieldValue('experienciaDirectorios', value)}
              error={touched.experienciaDirectorios && errors.experienciaDirectorios}
            />
            <BinaryPickerInput
              fieldName='Formación en alta dirección'
              alternatives={altaDireccionAlternatives}
              selectedAlternative={values.altaDireccion}
              onAlternativeChange={(value) => setFieldValue('altaDireccion', value)}
              error={touched.altaDireccion && errors.altaDireccion}
            />
            <MultipleOptionsPicker
              fieldName='Áreas de experiencia'
              explanation={'Puedes seleccionar como máximo 5 áreas. \nPresiona aquí para seleccionarlas.'}
              alternatives={areas}
              maximumAmountOfElements={5}
              selectedAlternative={values.areasExperiencia}
              onAlternativeChange={(selectedItems) => onSelectedAreasChange(selectedItems, setFieldValue)}
              error={errors.areasExperiencia}
            />
            <MultipleOptionsPicker
              fieldName='Sector o industria en la que tienes experiencia'
              explanation={'Puedes seleccionar como máximo 5 sectores. \nPresiona aquí para seleccionarlos.'}
              alternatives={industrias}
              maximumAmountOfElements={5}
              selectedAlternative={values.industriasExperiencia}
              onAlternativeChange={(selectedItems) => onSelectedIndustriesChange(selectedItems, setFieldValue)}
              error={errors.industriasExperiencia}
            />
            <MultipleOptionsPicker
              fieldName='Competencias profesionales'
              explanation={'Puedes seleccionar como máximo 5 competencias. \nPrioriza las que más te representan.'}
              alternatives={competencias}
              maximumAmountOfElements={5}
              selectedAlternative={values.competencias}
              onAlternativeChange={(selectedItems) => onSelectedAbilitiesChange(selectedItems, setFieldValue)}
              error={errors.competencias}
            />
            {
              showDots
                ? <Dots total={7} selectedIndex={3}/>
                : null
            }
            <TouchableOpacity
                className="w-4/5 p-3 rounded-xl mb-10 mt-5"
                style={continueButtonStyle}
                onPress={() => {
                  console.log('Botón presionado')
                  handleSubmit()
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
}
