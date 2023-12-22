import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import axios from 'axios'
import DiscoverCommunities from './DiscoverCommunities'
import YourCommunities from './YourCommunities'
import YourFeed from './YourFeed'
import CustomLoader from '../../../Components/CustomLoader'
import { useSelector } from 'react-redux'
import SearchBar from '../../../Components/SearchBar'
const { EXPO_PUBLIC_API_URL } = require('../../../Utils/constants')

const CommunitiesSlides = () => {
  const [selectedOption, setSelectedOption] = useState('Tus comunidades')
  const [joinedCommunities, setJoinedCommunities] = useState([])
  const [nonJoinedCommunities, setNonJoinedCommunities] = useState([])
  const [allData, setAllData] = useState([])
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [dataPresent, setDataPresent] = useState(false)
  const { userToken, recommendedCommunities } = useSelector((state) => state.auth)

  const getData = async () => {
    if (selectedOption === 'Descubrir') {
      getNonJoinedCommunities()
    } else if (selectedOption === 'Tus comunidades') {
      getJoinedCommunities()
    }
    setDataPresent(true)
  }

  useEffect(() => {
    getData()
  }, [selectedOption])

  const getJoinedCommunities = async () => {
    try {
      const response = await axios.get(
        `${EXPO_PUBLIC_API_URL}/communities/memberships`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      console.log(response.data.otherCommunities)
      const sortedResponse = communitiesInAlphabeticOrder(response.data.otherCommunities)
      console.log(sortedResponse)
      setJoinedCommunities(response.data.otherCommunities)
    } catch {
      console.log('Hubo un error al intentar obtener las comunidades a las que pertenece.')
    }
  }

  const getNonJoinedCommunities = async () => {
    try {
      const response = await axios.get(
        `${EXPO_PUBLIC_API_URL}/communities/joinable_communities`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      const sortedResponse = communitiesInAlphabeticOrder(response.data)
      console.log(sortedResponse)
      setNonJoinedCommunities(response.data)
    } catch {
      console.log('Hubo un error al intentar obtener las comunidades a las que pertenece.')
    }
  }

  const communitiesInAlphabeticOrder = async (response) => {
    await response.sort(function (a, b) {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
  }

  const handleOptionClick = (option) => {
    if (option === 'Descubrir') {
      setAllData(nonJoinedCommunities)
      setData(nonJoinedCommunities)
    }
    // else if (option === 'Tus comunidades') {
    //   setAllData(joinedCommunities)
    //   setData(joinedCommunities)
    // }
    setSelectedOption(option)
  }

  if (!dataPresent) {
    return <CustomLoader />
  } else {
    return (
      <>
      {console.log(`Las comunidades en communitiesSlides son ${recommendedCommunities}`)}
        <View style={styles.horizontalLine}></View>
        <View style={styles.mainContentContainer}>
          <SearchBar fullData={selectedOption === 'Descubrir' ? allData : joinedCommunities.otherCommunities} data={selectedOption === 'Descubrir' ? data : data2} setData={selectedOption === 'Descubrir' ? setData : setData2} setFullData={selectedOption === 'Descubrir' ? setAllData : setJoinedCommunities}/>
        </View>
        <View style={styles.horizontalLine} />
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => handleOptionClick('Tu feed')}
              style={[
                styles.option,
                selectedOption === 'Tu feed' && styles.selectedOption
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption === 'Tu feed' && styles.selectedOptionText
                ]}
              >
                Tu feed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOptionClick('Descubrir')}
              style={[
                styles.option,
                selectedOption === 'Descubrir' && styles.selectedOption
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption === 'Descubrir' && styles.selectedOptionText
                ]}
              >
                Descubrir
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOptionClick('Tus comunidades')}
              style={[
                styles.option,
                selectedOption === 'Tus comunidades' && styles.selectedOption
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption === 'Tus comunidades' &&
                    styles.selectedOptionText
                ]}
              >
                Tus comunidades
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {selectedOption === 'Tu feed'
              ? (
              <YourFeed optionSelected={'YourFeed'}/>
                )
              : null}
            {selectedOption === 'Descubrir'
              ? (
                  <DiscoverCommunities
                    optionSelected={'DiscoverCommunities'}
                    data={data.length > 0 ? data : allData}
                  />
                )
              : null}
            {selectedOption === 'Tus comunidades'
              ? (
                <YourCommunities
                  optionSelected={'YourCommunities'}
                  data={data2.length > 0 ? data2 : joinedCommunities}
                />
                )
              : null}
          </View>
        </View>
      </>
    )
  }
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
    borderBottomColor: 'transparent',
    justifyContent: 'center'
  },
  optionText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'MontserratLight',
    alignItems: 'center',
    textAlign: 'center'
  },
  selectedOption: {
    borderBottomColor: '#EE4296'
  },
  mainContentContainer: {
    marginHorizontal: 20,
    marginVertical: 5
  },
  selectedOptionText: {
    color: '#EE4296',
    fontFamily: 'MontserratBold',
    fontSize: 16
  },
  horizontalLine: {
    borderBottomColor: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 6,
    width: '100%',
    marginVertical: 10
  }
})

export default CommunitiesSlides
