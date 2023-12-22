import React, { useEffect } from 'react'
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setFormStep } from '../../Redux/Slices/userAuthSlice'
import HeaderComponent from './Components/HeaderComponent'
import SectionTitle from './Components/SectionTitle'
import EditPersonalInformationTemplate from '../EditTemplates/EditPersonalInformationTemplate'

export default function FillOutPersonalInformation () {
  const dispatch = useDispatch()
  const formStep = useSelector(state => state.auth.formStep)

  useEffect(() => {
    dispatch(setFormStep(1))
    console.log(formStep)
  }, [])

  return (
    <View style={styles.mainContainer}>
      <HeaderComponent onBack={'SignUpWelcome'}/>
      <ScrollView style={styles.formContainer}>
        <SectionTitle number={1} title={'Información personal'}/>
        <EditPersonalInformationTemplate showDeleteButton={false} nextView={'CompleteEducationalInformation'} showDots={true}/>
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
  }
})
