import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const MultipleOptionsPicker = ({ fieldName, explanation, alternatives, maximumAmountOfElements, selectedAlternative, onAlternativeChange, errors }) => {
  const [modalVisible, setModalVisible] = useState(false)

  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }

  const officialAlternatives = [
    {
      name: fieldName,
      value: fieldName,
      children: alternatives.map(alt => ({ label: alt.label, id: alt.value }))
    }
  ]
  return (
    <View style={{ marginVertical: 15 }}>
      <TouchableOpacity onPress={toggleModal} style={{ marginLeft: '0%' }}>
        <Text
          style={{
            fontFamily: 'MontserratBold',
            fontSize: 16,
            color: '#5A5A5A'
          }
        }>
          {fieldName}
        </Text>
        <Text
          style={{
            fontFamily: 'MontserratLight',
            fontSize: 14,
            color: '#5A5A5A'
          }
        }>
          {explanation}
        </Text>
      </TouchableOpacity>
        <View>
          <SectionedMultiSelect
            items={officialAlternatives}
            IconRenderer={Icon}
            iconProps={{ size: 20 }}
            uniqueKey="id"
            subKey="children"
            displayKey='label'
            selectText="Opciones"
            showDropDowns={true}
            readOnlyHeadings={true}
            confirmText='Guardar'
            selectedText='seleccionados'
            onSelectedItemsChange={onAlternativeChange}
            selectedItems={selectedAlternative}
            colors={{
              success: '#5A5A5A',
              primary: '#EE4296'
            }}
            searchPlaceholderText='Busca opciones'
            styles={{
              itemText: {
                fontFamily: 'MontserratLight'
              },
              selectedItemText: {
                fontFamily: 'MontserratLight'
              },
              subItemText: {
                fontFamily: 'MontserratLight'
              },
              searchText: {
                fontFamily: 'MontserratLight'
              },
              searchTextInput: {
                fontFamily: 'MontserratLight'
              }
            }}
          />
        </View>
    </View>
  )
}

export default MultipleOptionsPicker
