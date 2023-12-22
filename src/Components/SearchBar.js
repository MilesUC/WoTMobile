import React, { useState } from 'react'
import {
  TextInput,
  View,
  StyleSheet
} from 'react-native'
import filter from 'lodash.filter'
import { Ionicons } from '@expo/vector-icons'

export default function SearchBar ({ label, fullData, data, setData, setFullData }) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query) => {
    setSearchQuery(query)
    const formattedQuery = query.toLowerCase().replace(/ +/g, '')
    // console.log(formattedQuery)
    const filteredData = filter(fullData, (data) => {
      return contains(data, formattedQuery)
    })
    setData(filteredData)
  }
  const contains = (data, query) => {
    const name = data.name.toLowerCase()
    if (name.includes(query)) {
      return true
    }
    return false
  }
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.search} pointerEvents="none">
          <Ionicons name="search" size={20} />
        </View>
        <TextInput
          placeholder={label ? label : 'Buscar comunidades...'}
          style={styles.field}
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  inner: {
    flexDirection: 'row'
  },
  search: {
    position: 'absolute',
    top: 18,
    left: 10,
    zIndex: 1
  },
  field: {
    fontFamily: 'MontserratLight',
    color: '#9D9D9D',
    backgroundColor: '#fff',
    paddingLeft: 48,
    paddingRight: 18,
    paddingVertical: 10,
    borderRadius: 16,
    height: 54,
    flex: 1,
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  filter: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1
  }
})
