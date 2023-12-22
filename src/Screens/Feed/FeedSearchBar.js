import React, { useEffect, useState } from 'react'
import { ActivityIndicator, TextInput, View, Text, FlatList, StyleSheet } from 'react-native'
import filter from 'lodash.filter'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons'

const API_ENDPOINT = 'https://randomuser.me/api/?results=30'

export default function SearchBar () {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [fullData, setFullData] = useState([])
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setIsLoading(true)
    fetchData(API_ENDPOINT)
  }, [])

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url)
      setData(response.data.results)
      setFullData(response.data.results)
      setIsLoading(false)
    } catch (err) {
      setError(err)
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    const formattedQuery = query.toLowerCase().replace(/ +/g, '')
    console.log(formattedQuery)
    const filteredData = filter(fullData, (user) => {
      return contains(user, formattedQuery)
    })
    setData(filteredData)
  }
  const contains = ({ name, email }, query) => {
    const { first, last } = name
    if (first.includes(query) || last.includes(query) || email.includes(query) || (first + last).toLowerCase().includes(query)) {
      return true
    }
    return false
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color="#5500dc" />
      </View>)
  }
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error fetching data...</Text>
      </View>)
  }
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <TextInput
          placeholder='Buscar'
          style={styles.field}
          clearButtonMode='always'
          autoCapitalize='none'
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 5,
    flex: 1
  },
  inner: {
    marginLeft: '5%',
    marginTop: '1%',
    width: '90%',
    flexDirection: 'row',
    flex: 1
  },
  search: {

    // position: 'absolute',
    // top: 18,
    left: 10,
    zIndex: 1
  },
  field: {
    fontFamily: 'MontserratLight',
    color: '#9D9D9D',
    backgroundColor: '#F5F5F5',
    paddingLeft: 18,
    paddingRight: 18,
    borderRadius: 8,
    height: 24,
    flex: 1
  },
  filter: {
    // position: 'absolute',
    // top: 10,
    right: 10,
    zIndex: 1
  }
})
