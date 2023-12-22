import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import CustomLoader from '../../Components/CustomLoader'
import SimplePickerInput from '../../Components/Fields/SimplePickerInput'
import { fetchPickFields } from '../../Redux/Slices/pickFieldsSlice'
import BinaryPickerInput from '../../Components/Fields/BinaryPickerInput'
import { Dots } from '../../Components/Dots'
import { updateUserProfile } from '../../Utils/updateUserProfile'

export default function EditAvailabilityInformationTemplate ({ showDeleteButton, nextView, showDots }) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { userData, userToken } = useSelector((state) => state.auth)
  const pickFieldsData = useSelector((state) => state.pickFields.data)
  const lastFetched = useSelector((state) => state.pickFields.lastFetched)
  const [disponibilidades, setDisponibilidades] = useState([])
  const [jornadas, setJornadas] = useState([])
  const [modalidades, setModalidades] = useState([])
  const [disponibilidadSeleccionada, setDisponibilidadSeleccionada] = useState('')
  const [jornadaSeleccionada, setJornadaSeleccionada] = useState('')
  const [modalidadSeleccionada, setModalidadSeleccionada] = useState('')
  const [viaje, setViaje] = useState('')
  const [cambio, setCambio] = useState('')
  const [dataPresent, setDataPresent] = useState(false)

  const moveAvailability = [
    { value: 1, label: 'Sí.' },
    { value: 2, label: 'No.' }
  ]
  const travelAvailability = [
    { value: true, label: 'Sí.' },
    { value: false, label: 'No.' }
  ]

  useEffect(() => {
    const timeLimit = 24 * 60 * 60 * 1000
    const fetchEndpoints = ['availabilities', 'workdays', 'modalities']

    fetchEndpoints.forEach((endpointIdentifier) => {
      const currentData = pickFieldsData[endpointIdentifier]
      const lastFetchedTime = lastFetched[endpointIdentifier]

      if (!currentData || (lastFetchedTime && Date.now() - lastFetchedTime > timeLimit)) {
        dispatch(fetchPickFields(endpointIdentifier))
      }
    })
  }, [dispatch, pickFieldsData, lastFetched])

  useEffect(() => {
    if (pickFieldsData.availabilities) {
      const transformedFirstSetOfData = pickFieldsData.availabilities.map(item => ({
        value: item.id,
        label: item.disponibilidad
      }))
      setDisponibilidades(transformedFirstSetOfData)
    }

    if (pickFieldsData.workdays) {
      const transformedSecondSetOfData = pickFieldsData.workdays.map(item => ({
        value: item.id,
        label: item.tipoJornada
      }))
      setJornadas(transformedSecondSetOfData)
    }

    if (pickFieldsData.modalities) {
      const transformedThirdSetOfData = pickFieldsData.modalities.map(item => ({
        value: item.id,
        label: item.tipoModalidad
      }))
      setModalidades(transformedThirdSetOfData)
    }

    if (pickFieldsData.modalities && pickFieldsData.workdays &&
        pickFieldsData.availabilities) {
      setDataPresent(true)
    }
  }, [pickFieldsData])

  const continueButtonStyle = {
    backgroundColor: '#EE4296',
    width: '100%'
  }

  const editValidationSchema = yup.object().shape({
    id_jornada: yup.string().required('Debes responder este campo.'),
    id_modalidad: yup.string().required('Debes responder este campo.'),
    id_posibilidad_cambiarse_region: yup.boolean().required('Debes responder este campo'),
    disposicion_viajar: yup.boolean().required('Debes responder este campo'),
    disponibilidad: yup.array().required('Debes responder este campo').min(1, 'Debes escoger una de las opciones'),
  })

  const handleSubmit = async (formData) => {
    formData.disponibilidad = Array.isArray(formData.disponibilidad) ? (formData.disponibilidad) : ([formData.disponibilidad])
    // if (cambio >= 1 && cambio <= 2) { formData.id_posibilidad_cambiarse_region = cambio } else { formData.posibilidadCambiarseRegion = '' }
    // if (modalidadSeleccionada !== '') { formData.id_modalidad = modalidadSeleccionada } else { formData.tipoModalidad = '' }
    // if (jornadaSeleccionada !== '') { formData.id_jornada = jornadaSeleccionada } else { formData.tipoJornada = '' }
    // // const nonEmptyDataToSend = Object.keys(formData)
    //   .filter(key => {
    //     const value = formData[key]
    //     return !(value === '' || (Array.isArray(value) && value.length === 0))
    //   })
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

  if (!dataPresent) {
    return (
      <CustomLoader/>
    )
  } else {
    return (
            <View>
            <Formik
                initialValues={{
                  id_jornada: userData.tipoJornada ? userData.tipoJornada.id.toString() : '',
                  id_modalidad: userData.tipoModalidad ? userData.tipoModalidad.id.toString() : '',
                  id_posibilidad_cambiarse_region: userData.posibilidadCambiarseRegion ? userData.posibilidadCambiarseRegion.id : '',
                  disposicion_viajar: userData.disposicion_viajar !== null ? userData.disposicion_viajar : false,
                  disponibilidad: userData.disponibilidad ? userData.disponibilidad.map(item => item.id.toString()) : []
                }}
                validateSchema={editValidationSchema}
                onSubmit={values => handleSubmit(values)}
            >
            {({
              values, handleChange, errors, setFieldTouched, touched,
              isValid, handleSubmit, setFieldValue
            }) => (
                <>
                {console.log(values)}
                <SimplePickerInput
                  fieldName="Disponibilidad"
                  explanation="Modalidad en la que estarías dispuesta a aceptar un nuevo rol."
                  alternatives={disponibilidades}
                  selectedAlternative={parseInt(values.disponibilidad[0])}
                  onAlternativeChange={handleChange('disponibilidad')}
                  error={touched.disponibilidad && errors.disponibilidad}
                />
                <SimplePickerInput
                  fieldName="Disponibilidad de jornada"
                  alternatives={jornadas}
                  selectedAlternative={parseInt(values.id_jornada)}
                  onAlternativeChange={handleChange('id_jornada')}
                  error={touched.id_jornada && errors.id_jornada}
                />
                <SimplePickerInput
                  fieldName="Modalidad de preferencia"
                  alternatives={modalidades}
                  selectedAlternative={parseInt(values.id_modalidad)}
                  onAlternativeChange={handleChange('id_modalidad')}
                  error={touched.id_modalidad && errors.id_modalidad}
                />
                <SimplePickerInput
                  fieldName="¿Tienes la posibilidad de mudarte a otra región?"
                  alternatives={moveAvailability}
                  selectedAlternative={parseInt(values.id_posibilidad_cambiarse_region)}
                  onAlternativeChange={(value) => setFieldValue('id_posibilidad_cambiarse_region', value)}
                  error={errors.id_posibilidad_cambiarse_region}
                />
                <BinaryPickerInput
                  fieldName='¿Tienes la posibilidad de viajar?'
                  alternatives={travelAvailability}
                  selectedAlternative={values.disposicion_viajar}
                  onAlternativeChange={(value) => setFieldValue('disposicion_viajar', value)}
                  error={errors.disposicion_viajar}
                />
                {
                  showDots
                    ? <Dots total={7} selectedIndex={4}/>
                    : null
                }
                <TouchableOpacity
                    className="w-4/5 p-3 rounded-xl mb-10 mt-5"
                    style={continueButtonStyle}
                    onPress={() => {
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
