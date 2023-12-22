import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import CustomLoader from '../../Components/CustomLoader'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
const { EXPO_PUBLIC_API_URL } = require('../../Utils/constants')

const ShowMyCommunitiesToPost = () => {
  const navigation = useNavigation()
  const [myCommunities, setMyCommunities] = useState(false)

  const { userToken } = useSelector((state) => state.auth)

  const getData = async () => {
    const response = await axios.get(
      `${EXPO_PUBLIC_API_URL}/communities/memberships`,
      { headers: { Authorization: `Bearer ${userToken}` } }
    )
    setMyCommunities(response.data.otherCommunities)
  }
  useEffect(() => {
    getData()
  }, [])
  if (!myCommunities) {
    return <CustomLoader />
  }
  const handleCommunityPress = (community) => {
    const communityData = community
    navigation.navigate('NewPostScreen', { communityData })
  }

  return (
    <View style={{ flex: 1, marginTop: '20%', marginBottom: '10%' }}>
      <Text
        style={{
          marginHorizontal: '5%',
          paddingTop: 10,
          fontSize: 24,
          fontFamily: 'MontserratBold',
          color: '#5A5A5A',
          marginBottom: '10%',
          textAlign: 'center'
        }}
      >
        ¿En qué comunidad quieres publicar?
      </Text>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingHorizontal: 20,
          marginHorizontal: '10%',
          borderWidth: 1,
          borderRadius: 20,
          borderColor: '#EE4296'
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <ScrollView>
            {myCommunities.map((community, index) => (
              <TouchableOpacity key={index} onPress={() => handleCommunityPress(community)}>
                <View
                  style={{
                    padding: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: '#5A5A5A',
                    marginBottom: '1%'
                  }}
                >
                  <Text style={{ alignSelf: 'center', textAlign: 'center' }}>{community.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}
export default ShowMyCommunitiesToPost
