import React, { useEffect } from 'react'
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setFormStep } from '../../Redux/Slices/userAuthSlice'
import HeaderComponent from './Components/HeaderComponent'
import SectionTitle from './Components/SectionTitle'
import EditAvailabilityInformationTemplate from '../EditTemplates/EditAvailabilityInformationTemplate'

export default function FillOutAvailabilityInformation () {
  const dispatch = useDispatch()
  const formStep = useSelector(state => state.auth.formStep)

  useEffect(() => {
    dispatch(setFormStep(5))
    console.log(formStep)
  }, [])

  return (
    <View style={styles.mainContainer}>
      <HeaderComponent onBack={'CompleteDirectoryInformation'}/>
      <ScrollView style={styles.formContainer}>
        <SectionTitle number={5} title={'Disponibilidad'}/>
        <EditAvailabilityInformationTemplate showDeleteButton={false} nextView={'CompleteAdditionalInformation'} showDots={true}/>
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
