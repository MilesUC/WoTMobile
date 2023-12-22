import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import HeaderComponent from './Components/HeaderComponent'
import SectionTitle from './Components/SectionTitle'
import EditAdditionalInformationTemplate from '../EditTemplates/EditAdditionalInformationTemplate'

export default function EditAdditionalInformation () {
  return (
    <View style={styles.mainContainer}>
      <HeaderComponent onBack={'ProfileScreen'}/>
      <ScrollView style={styles.formContainer}>
        <SectionTitle title={'Información adicional'}/>
        <EditAdditionalInformationTemplate showDeleteButton={false} nextView={'ProfileScreen'} showDots={false}/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: '3%',
    backgroundColor: '#EE4296'
  },
  formContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF',
    paddingHorizontal: 20
  }
})
