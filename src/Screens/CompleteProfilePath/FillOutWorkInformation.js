import React, { useEffect } from 'react'
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setFormStep } from '../../Redux/Slices/userAuthSlice'
import HeaderComponent from './Components/HeaderComponent'
import SectionTitle from './Components/SectionTitle'
import EditWorkInformationTemplate from '../EditTemplates/EditWorkInformationTemplate'

export default function FillOutEducationalInformation () {
  const dispatch = useDispatch()
  const formStep = useSelector(state => state.auth.formStep)

  useEffect(() => {
    dispatch(setFormStep(3))
    console.log(formStep)
  }, [])

  return (
      <View style={styles.mainContainer}>
        <HeaderComponent onBack={'CompleteEducationalInformation'}/>
        <ScrollView style={styles.formContainer}>
          <SectionTitle number={3} title={'Experiencia laboral'}/>
          <EditWorkInformationTemplate nextView={'CompleteDirectoryInformation'} showDots={true}/>
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
  section: {
    marginVertical: 15
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5
  }
})
