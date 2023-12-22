import React, { useEffect } from 'react'
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setFormStep } from '../../Redux/Slices/userAuthSlice'
import HeaderComponent from './Components/HeaderComponent'
import SectionTitle from './Components/SectionTitle'
import EditReferenceContactsInformationTemplate from '../EditTemplates/EditReferenceContactsTemplate'

export default function FillOutReferenceContactsInformation () {
  const dispatch = useDispatch()
  const formStep = useSelector(state => state.auth.formStep)

  useEffect(() => {
    dispatch(setFormStep(7))
    console.log(formStep)
  }, [])

  return (
    <View style={styles.mainContainer}>
      <HeaderComponent onBack={'CompleteAdditionalInformation'}/>
      <ScrollView style={styles.formContainer}>
        <SectionTitle number={7} title={'Información adicional'}/>
        <EditReferenceContactsInformationTemplate showDeleteButton={false} nextView={'CompleteReferenceContactsInformation'} showDots={true}/>
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
