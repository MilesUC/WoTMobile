import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import * as yup from 'yup'
import { Formik } from 'formik'
import TextFieldInput from '../../Components/Fields/TextFieldInput'
import { Dots } from '../../Components/Dots'
import CustomLoader from '../../Components/CustomLoader'
import SimplePickerInput from '../../Components/Fields/SimplePickerInput'
import { fetchPickFields } from '../../Redux/Slices/pickFieldsSlice'
import { updateUserProfile } from '../../Utils/updateUserProfile'

export default function EditEducationalInformationTemplate ({ showDeleteButton, nextView, showDots }) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const pickFieldsData = useSelector((state) => state.pickFields.data)
  const lastFetched = useSelector((state) => state.pickFields.lastFetched)
  const [professions, setProfessions] = useState([])
  const [universities, setUniversities] = useState([])
  const [profesion, setProfesion] = useState('')
  const [profesion2, setProfesion2] = useState('')
  const [universidad, setUniversidad] = useState('')
  const [otraUniversidad, setOtraUniversidad] = useState('')
  const { userData, userToken } = useSelector((state) => state.auth)
  const [dataPresent, setDataPresent] = useState(false)

  useEffect(() => {
    console.log(userData)
    const timeLimit = 24 * 60 * 60 * 1000
    const fetchEndpoints = ['professions', 'universities']
    fetchEndpoints.forEach((endpointIdentifier) => {
      const currentData = pickFieldsData[endpointIdentifier]
      const lastFetchedTime = lastFetched[endpointIdentifier]

      if (!currentData || (lastFetchedTime && Date.now() - lastFetchedTime > timeLimit)) {
        dispatch(fetchPickFields(endpointIdentifier))
      }
    })
  }, [dispatch, pickFieldsData, lastFetched])

  useEffect(() => {
    if (pickFieldsData.professions) {
      const transformedFirstSetOfData = pickFieldsData.professions.map(item => ({
        value: item.id,
        label: item.nombre
      }))
      setProfessions(transformedFirstSetOfData)
    }

    if (pickFieldsData.universities) {
      const transformedSecondSetOfData = pickFieldsData.universities.map(item => ({
        value: item.nombre,
        label: item.nombre
      }))
      setUniversities(transformedSecondSetOfData)
    }

    if (pickFieldsData.professions && pickFieldsData.universities) {
      setDataPresent(true)
    }
  }, [pickFieldsData])

  const continueButtonStyle = {
    backgroundColor: '#EE4296',
    left: '10%'
  }

  const editValidationSchema = yup.object().shape({
    profesion: yup
      .string()
      .required('Este campo es obligatorio.'),

    universidad: yup
      .string()
      .required('Este campo es obligatorio.'),

    otraUniversidad: yup
      .string(),

    profesion2: yup
      .string(),

    postgrado: yup
      .string()
      .min(2, 'Tu respuesta debe tener al menos dos caracteres.')
      .max(50, 'Tu respuesta no puede superar los 50 caracteres.')
      .required('Este campo es obligatorio.')
  })

  const handleSubmit = async (formData) => {
    console.log(formData)
    // if (formData.universidad !== '') { formData.universidad = universidad }
    if (formData.universidad === 'Otra') { formData.universidad = formData.otraUniversidad }

    if (formData.profesion !== '' && formData.profesion2 !== '') {
      formData.profesiones = [formData.profesion.toString(), formData.profesion2.toString()]
    } else if (formData.profesion !== '') {
      formData.profesiones = [formData.profesion.toString()]
    } else if (formData.profesion2 !== '') {
      formData.profesiones = [formData.profesion2.toString()]
    }

    delete formData.profesion
    delete formData.profesion2
    delete formData.otraUniversidad

    const nonEmptyDataToSend = Object.keys(formData)
      .filter(key => !!formData[key])
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
                  profesion: (userData.profesion && userData.profesion[0]) ? String(userData.profesion[0].id) : '',
                  profesion2: (userData.profesion && userData.profesion[1]) ? String(userData.profesion[1].id) : '',
                  universidad: userData.universidad || '',
                  otraUniversidad: userData.universidad || '',
                  postgrado: userData.postgrado || ''
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
                  fieldName="Profesión primaria"
                  explanation="Elige la profesión que más se acerque a la tuya."
                  alternatives={professions}
                  selectedAlternative={parseInt(values.profesion)}
                  onAlternativeChange={handleChange('profesion')}
                  error={touched.profesion && errors.profesion}
                />
                <SimplePickerInput
                  fieldName="Institución educativa"
                  alternatives={universities}
                  selectedAlternative={values.universidad}
                  onAlternativeChange={handleChange('universidad')}
                  error={touched.universidad && errors.universidad}
                />
                { (values.universidad === 'Otra')
                  ? (
                    <>
                    <Text style={{ fontFamily: 'MontserratLight' }}> Casa de estudios </Text>
                    <TextInput
                      value={values.otraUniversidad}
                      onChangeText={(value) => setOtraUniversidad(value)}
                    />
                    </>
                    )
                  : (null)
                }
                <SimplePickerInput
                  fieldName="Profesión secundaria"
                  explanation="Solo si tienes una profesión secundaria."
                  alternatives={professions}
                  selectedAlternative={parseInt(values.profesion2)}
                  onAlternativeChange={handleChange('profesion2')}
                  error={touched.profesion2 && errors.profesion2}
                />
                <TextFieldInput
                    labelName={'Postgrado'}
                    labelDescription={'Si no tienes solo escribe \'No\'.'}
                    onChangeText={handleChange('postgrado')}
                    onBlur={() => setFieldTouched('postgrado')}
                    placeholder={userData.postgrado || ''}
                    error={touched.postgrado && errors.postgrado}
                  />
                  {
                    showDots
                      ? <Dots total={7} selectedIndex={1}/>
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
