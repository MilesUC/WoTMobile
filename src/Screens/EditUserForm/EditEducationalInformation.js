import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import HeaderComponent from './Components/HeaderComponent'
import SectionTitle from './Components/SectionTitle'
import EditEducationalInformationTemplate from '../EditTemplates/EditEducationalInformationTemplate'

export default function EditEducationalInformation () {
  return (
    <View style={styles.mainContainer}>
      <HeaderComponent onBack={'ProfileScreen'}/>
      <ScrollView style={styles.formContainer}>
        <SectionTitle title={'Educación'}/>
        <EditEducationalInformationTemplate showDeleteButton={false} nextView={'ProfileScreen'} showDots={false}/>
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
    // height: Dimensions.get('window').height - 20,
    width: '100%',
    backgroundColor: '#FFF',
    paddingHorizontal: 20
  }
})
