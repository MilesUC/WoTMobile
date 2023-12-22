import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import PersonalInformation from './ProfileInformationBlocks/PersonalInformation'
import EducationalInformation from './ProfileInformationBlocks/EducationalInformation'
import WorkInformation from './ProfileInformationBlocks/WorkInformation'
import DirectoryInformation from './ProfileInformationBlocks/DirectoryInformation'
import AvailabilityInformation from './ProfileInformationBlocks/AvailabilityInformation'
import AdditionalInformation from './ProfileInformationBlocks/AdditionalInformation'
import ReferenceContactsInformation from './ProfileInformationBlocks/ReferenceContactsInformation'
import { ProfileInformationMenuButton } from './ProfileInformationMenuButton'

const InformationMenu = props => {
  const [selectedOption, setSelectedOption] = useState('Información personal')

  const handleOptionClick = (option) => {
    setSelectedOption(option)
  }

  return (
    <View style={{ flexDirection: 'column' }}>
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
      <ProfileInformationMenuButton
        title="Información personal"
        selectedOption={selectedOption}
        handleOptionClick={handleOptionClick}
      />
      <ProfileInformationMenuButton
        title="Educación"
        selectedOption={selectedOption}
        handleOptionClick={handleOptionClick}
      />
      <ProfileInformationMenuButton
        title="Experiencia laboral"
        selectedOption={selectedOption}
        handleOptionClick={handleOptionClick}
      />
      <ProfileInformationMenuButton
        title="Directorios"
        selectedOption={selectedOption}
        handleOptionClick={handleOptionClick}
      />
      <ProfileInformationMenuButton
        title="Disponibilidad"
        selectedOption={selectedOption}
        handleOptionClick={handleOptionClick}
      />
      <ProfileInformationMenuButton
        title="Información adicional"
        selectedOption={selectedOption}
        handleOptionClick={handleOptionClick}
      />
      <ProfileInformationMenuButton
        title="Contactos de referencia"
        selectedOption={selectedOption}
        handleOptionClick={handleOptionClick}
      />
      </ScrollView>
    </View>
    <View>
        {selectedOption === 'Información personal' ? (<PersonalInformation/>) : (null)}
        {selectedOption === 'Educación' ? (<EducationalInformation/>) : (null)}
        {selectedOption === 'Experiencia laboral' ? (<WorkInformation/>) : (null)}
        {selectedOption === 'Directorios' ? (<DirectoryInformation/>) : (null)}
        {selectedOption === 'Disponibilidad' ? (<AvailabilityInformation/>) : (null)}
        {selectedOption === 'Información adicional' ? (<AdditionalInformation/>) : (null)}
        {selectedOption === 'Contactos de referencia' ? (<ReferenceContactsInformation/>) : (null)}
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10
  },
  option: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },
  optionText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal'
  },
  selectedOption: {
    borderBottomColor: '#EE4296'
  },
  selectedOptionText: {
    color: '#EE4296',
    fontWeight: 'bold'
  }
})

export default InformationMenu
