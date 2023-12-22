import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { companies } from '../../Data/Companies'
import SearchBar from '../../Components/SearchBar'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import BlockScreen from '../BlockScreen/BlockScreen'

const ShowAllCompanies = () => {
  const { userToken, percentageOfUserDataCompletion } = useSelector((state) => state.auth)
  const navigation = useNavigation()
  const [allCompanies, setAllCompanies] = useState(companies)
  const [data, setData] = useState([])
  const getCompanies = async () => {
    // const { data } = await axios.post(
    //   `${EXPO_PUBLIC_API_URL}/companies/get_by_nombre`,
    //   { headers: { Authorization: `Bearer ${userToken}` } }
    // )
    // setAllCompanies(data)
  }
  const handleFollowCompany = () => {}
  useEffect(() => {
    getCompanies()
  }, [])

  const renderItem = ({ item }) => (
    <>
      <TouchableOpacity
        onPress={() => navigation.push('CompanyDetail', { item })}
      >
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            padding: 18,
            flexDirection: 'row',
            justifyContent: 'space-between'
            // gap: 20
          }}
        >
          <View>
            <Image
              source={
                require('../../../assets/Images/office-building.png')
              }
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                borderColor: '#EE4296',
                borderWidth: 1
              }}
            />
          </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: '3%',
                flexShrink: 1
                // gap: 40
              }}
            >
            <View
              style={{
                flexDirection: 'column',
                flexShrink: 1
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'MontserratBold',
                  marginBottom: '5%'
                }}
              >
                {item.name}
              </Text>
              <Text style={{ fontSize: 12, fontFamily: 'MontserratLight' }}>
                {item.description}
              </Text>
            </View>
            </View>
            <View style={{
              flex: 1,
              marginRight: '2%'
            }}>
              <TouchableOpacity
                style={{
                  backgroundColor: item.isFollowing ? '#EE4296' : 'gray',
                  borderRadius: 10,
                  width: '100%',
                  paddingHorizontal: '1%',
                  paddingVertical: '3%',
                  justifyContent: 'center'
                }}
                onPress={handleFollowCompany}
              >
                <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'MontserratLight' }}>
                  {item.isFollowing ? 'Siguiendo' : 'Seguir'}
                </Text>
              </TouchableOpacity>
            </View>
            </View>
        <View
          style={{
            borderBottomColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            borderBottomWidth: 4,
            width: '80%',
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center'
          }}
        />
      </TouchableOpacity>
    </>
  )

  if (percentageOfUserDataCompletion !== 100) {
    return (<BlockScreen message={'buscar empresas de tu interés'}/>)
  }
  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <View style={{ marginHorizontal: '10%' }}>
        <SearchBar label='Buscar Empresas...' fullData={allCompanies} setFullData={setAllCompanies} data={data} setData={setData}/>
      </View>
      <Text
        style={{
          fontSize: 25,
          fontFamily: 'MontserratBold',
          color: '#5A5A5A',
          marginLeft: '5%',
          marginTop: '5%'
        }}
      >
        Empresas
      </Text>
      <FlatList
        data={data.length > 0 ? data : allCompanies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  )
}

export default ShowAllCompanies
