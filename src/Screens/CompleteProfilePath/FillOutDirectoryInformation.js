import React, { useEffect } from 'react'
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import HeaderComponent from './Components/HeaderComponent'
import SectionTitle from './Components/SectionTitle'
import EditDirectoryInformationTemplate from '../EditTemplates/EditDirectoryInformationTemplate'
import { setFormStep } from '../../Redux/Slices/userAuthSlice'

export default function FillOutDirectoryInformation () {
  const dispatch = useDispatch()
  const formStep = useSelector(state => state.auth.formStep)

  useEffect(() => {
    dispatch(setFormStep(4))
    console.log(formStep)
  }, [])

  return (
    <View style={styles.mainContainer}>
        <HeaderComponent onBack={'CompleteWorkInformation'}/>
        <ScrollView style={styles.formContainer}>
          <SectionTitle number={4} title={'Experiencia en directorios'}/>
          <EditDirectoryInformationTemplate nextView={'CompleteAvailabilityInformation'} showDots={true}/>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EE4296'
  },
  formContainer: {
    flex: 1,
    height: Dimensions.get('window').height - 20,
    width: '100%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
    paddingHorizontal: 20
  },
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
  }
})
