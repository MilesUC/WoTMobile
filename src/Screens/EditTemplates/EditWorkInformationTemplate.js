import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import CustomLoader from '../../Components/CustomLoader'
import { Formik } from 'formik'
import * as yup from 'yup'
import { fetchPickFields } from '../../Redux/Slices/pickFieldsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import SimplePickerInput from '../../Components/Fields/SimplePickerInput'
import { Dots } from '../../Components/Dots'
import TextFieldInput from '../../Components/Fields/TextFieldInput'
import { updateUserProfile } from '../../Utils/updateUserProfile'

export default function EditWorkInformationTemplate ({ showDeleteButton, nextView, showDots }) {
  const navigation = useNavigation()
  const [dataPresent, setDataPresent] = useState(false)
  const dispatch = useDispatch()
  const { userData, userToken } = useSelector((state) => state.auth)
  const pickFieldsData = useSelector((state) => state.pickFields.data)
  const lastFetched = useSelector((state) => state.pickFields.lastFetched)
  const [cargos, setCargos] = useState([])
  const [industrias, setIndustrias] = useState([])
  const [cargo, setCargo] = useState(0)
  const [industriaActual, setIndustriaActual] = useState(0)
  const [industriaAdicional, setIndustriaAdicional] = useState(0)
  const [nombreRol, setRol] = useState(0)

  const editValidationSchema = yup.object().shape({
    id_cargo: yup.number()
      .min(1, 'Por favor selecciona un cargo.')
      .required('Este campo es obligatorio.'),
    empresa_actual: yup.string()
      .max(25, 'El nombre de la empresa no puede superar los 25 caracteres.')
      .required('Este campo es obligatorio.'),
    id_industria_actual: yup.number()
      .min(1, 'Por favor selecciona una industria.')
      .required('Este campo es obligatorio.'),
    id_cargo_adicional: yup.number()
      .min(1, 'Por favor selecciona un cargo adicional.'),
    empresa_adicional: yup.string()
      .max(25, 'El nombre de la empresa no puede separar los 25 caracteres.'),
    id_industria_adicional: yup.number()
      .min(1, 'Por favor selecciona una industria adicional.')
  })

  useEffect(() => {
    const fetchEndpoints = ['roles', 'industries']

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
    if (pickFieldsData.roles) {
      const transformedRoles = pickFieldsData.roles.map(item => ({
        value: item.id,
        label: item.cargo
      }))
      setCargos(transformedRoles)
    }

    if (pickFieldsData.industries) {
      const transformedIndustries = pickFieldsData.industries.map(item => ({
        value: item.id,
        label: item.nombre_industria
      }))
      setIndustrias(transformedIndustries)
    }

    if (pickFieldsData.roles && pickFieldsData.industries) {
      setDataPresent(true)
    }
  }, [pickFieldsData])

  const continueButtonStyle = {
    backgroundColor: '#EE4296',
    left: '10%'
  }

  const handleSubmit = async (formData) => {
    const nonEmptyDataToSend = Object.keys(formData)
      .filter(key => !!formData[key])
      .reduce((result, key) => {
        result[key] = formData[key]
        return result
      }, {})
    console.log('Data about to be sent => ' + JSON.stringify(nonEmptyDataToSend))
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
                  id_cargo: userData.cargo ? userData.cargo.id.toString() : '',
                  empresa_actual: userData.empresa_actual || '',
                  id_industria_actual: userData.industria ? userData.industria.id.toString() : '',
                  id_cargo_adicional: userData.aditionalCargo ? userData.aditionalCargo.id.toString() : '',
                  id_industria_adicional: userData.aditionalIndustria ? userData.aditionalIndustria.id.toString() : '',
                  empresa_adicional: userData.empresa_adicional || ''
                }}
                onSubmit={values => handleSubmit(values)}
                validationSchema={editValidationSchema}
            >
            {({
              values, handleChange, errors, setFieldTouched, touched,
              isValid, handleSubmit
            }) => (
                <>
                <SimplePickerInput
                  fieldName="Cargo actual"
                  explanation="Elige la opción que más se acomode a tu cargo. Si no tienes cargo o rol en alguna empresa (puede ser tuya), selecciona el último que tuviste."
                  alternatives={cargos}
                  selectedAlternative={parseInt(values.id_cargo)}
                  onAlternativeChange={handleChange('id_cargo')}
                  error={touched.id_cargo && errors.id_cargo}
                />
                <TextFieldInput
                  labelName={'Empresa en la que trabajas'}
                  onChangeText={handleChange('empresa_actual')}
                  onBlur={() => setFieldTouched('empresa_actual')}
                  error={touched.empresa_actual && errors.empresa_actual}
                  values={userData.empresa_actual || ''}
                  value={values.empresa_actual}
                />
                <SimplePickerInput
                  fieldName="Industria actual"
                  explanation="Selecciona el área de la economía en la que tu empresa u organización se desempeña."
                  alternatives={industrias}
                  selectedAlternative={parseInt(values.id_industria_actual)}
                  onAlternativeChange={handleChange('id_industria_actual')}
                  error={touched.id_industria_actual && errors.id_industria_actual}
                />
                <SimplePickerInput
                  fieldName="Cargo complementario"
                  explanation="Si tienes un cargo o rol adicional puedes agregarlo."
                  alternatives={cargos}
                  selectedAlternative={parseInt(values.id_cargo_adicional)}
                  onAlternativeChange={handleChange('id_cargo_adicional')}
                  error={touched.id_cargo_adicional && errors.id_cargo_adicional}
                />
                <TextFieldInput
                  labelName={'Empresa del cargo complementario'}
                  labelDescription={'Si no tienes, deja este campo vacío.'}
                  onChangeText={handleChange('empresa_adicional')}
                  onBlur={() => setFieldTouched('empresa_adicional')}
                  error={touched.empresa_adicional && errors.empresa_adicional}
                  values={values.empresa_adicional}
                  value={values.empresa_adicional}
                />
                <SimplePickerInput
                  fieldName="Industria del cargo complementario"
                  explanation="Si no tienes cargo complementario puedes dejarlo en blanco."
                  alternatives={industrias}
                  selectedAlternative={parseInt(values.id_industria_adicional)}
                  onAlternativeChange={handleChange('id_industria_adicional')}
                  error={touched.id_industria_adicional && errors.id_industria_adicional}
                />
                {
                    showDots
                      ? <Dots total={7} selectedIndex={2}/>
                      : null
                  }
                <TouchableOpacity
                    className="w-4/5 p-3 rounded-xl mb-10 mt-5"
                    style={continueButtonStyle}
                    onPress={handleSubmit}
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
