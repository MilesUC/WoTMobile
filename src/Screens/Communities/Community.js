import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  StatusBar,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { Avatar } from '@rneui/themed'
import { useSelector } from 'react-redux'
import axios from 'axios'
import CustomLoader from '../../Components/CustomLoader'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import CommunityMenu from './CommunityMenu'
import { CommunityIcon } from '../../Components/CommunityIcon'
import ToastManager, { Toast } from 'toastify-react-native'
const { height, width } = Dimensions.get('window')
const { EXPO_PUBLIC_API_URL } = require('../../Utils/constants')

export default function Community ({ route }) {
  console.log(route.params.communityId)
  const navigation = useNavigation()
  const [suggestedCommunities, setSuggestedCommunities] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { communityId } = route.params
  const { userData, userToken } = useSelector((state) => state.auth)
  const [communityData, setCommunityData] = useState(false)
  const [dataPresent, setDataPresent] = useState(false)

  const getData = async () => {
    const response = await axios.get(
      `${EXPO_PUBLIC_API_URL}/communities/${communityId}`,
      { headers: { Authorization: `Bearer ${userToken}` } }
    )
    const response2 = await axios.get(
      `${EXPO_PUBLIC_API_URL}/communities/joinable_communities`,
      { headers: { Authorization: `Bearer ${userToken}` } }
    )
    setCommunityData(response.data)
    setSuggestedCommunities(response2.data)
    console.log(communityData)
    setDataPresent(true)
  }

  useEffect(() => {
    getData()
  }, [communityData.id])

  const handleJoinCommunity = async (communityData) => {
    console.log(communityData)
    const response = await axios.post(
      `${EXPO_PUBLIC_API_URL}/communities/join`,
      {
        communityId: communityData
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    )
    navigation.push('Community', {
      communityId: communityData
    })
  }

  const handleLeaveCommunity = async () => {
    const response = await axios.post(
      `${EXPO_PUBLIC_API_URL}/communities/leave/${communityData.id}`,
      {
        userId: userData.id,
        communityId: communityData.id
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    )
    if (response.status === 204) {
      Toast.success('Abandonaste la comunidad', { duration: '3000', position: 'top' })
      navigation.push('CommunitiesHome')
    } else {
      Toast.error('Hubo un error. Inténtalo más tarde.')
    }
  }

  if (!dataPresent) {
    return <CustomLoader />
  } else {
    return (
      <ScrollView style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <ToastManager/>
          <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.push('CommunitiesHome')}>
            <Ionicons size={19} color={'#EE4296'} name={'chevron-back-outline'}/>
            <Text style={styles.backButtonText}>
              Comunidades
            </Text>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'column',
              flex: 1
            }}
          >
            <View style={styles.horizontalTopContainer}>
              <CommunityIcon/>
            </View>
            <View style={styles.mainInfoContainer}>
              <Text style={styles.nameText}>{communityData.name}</Text>
              <Text style={styles.headlineText}>
                {communityData.description.length > 0
                  ? communityData.description
                  : ''}
              </Text>
              <Text style={styles.contactText}>
                {communityData.followers} miembros
              </Text>
            </View>
            <View style={styles.profileButtons}>
              <View style={{ alignItems: 'center' }}>
                {communityData.userBelongs ? (
                  <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                      style={styles.biggestButton}
                      onPress={() =>
                        handleLeaveCommunity(userData.id, communityData.id)
                      }
                    >
                      <Text style={styles.profileButtonText}>
                        {' '}
                        Salir de la comunidad{' '}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                      style={styles.biggestButton}
                      onPress={() => handleJoinCommunity(communityData.id)}
                    >
                      <Text style={styles.profileButtonText}>
                        Unirte a la comunidad
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: '#EE4296',
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: width * 0.15,
                    paddingVertical: 5
                  }}
                  onPress={() => setShowSuggestions(!showSuggestions)}
                >
                  {showSuggestions ? (
                    <Ionicons name="chevron-up-outline" size={20} />
                    ) : (
                      <Ionicons name="chevron-down-outline" size={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginHorizontal: 10 }}>
              {showSuggestions && (
                <>
                  <View style={styles.horizontalLine}></View>
                  <Text
                    style={{
                      marginBottom: 5,
                      fontFamily: 'MontserratBold',
                      color: '#5A5A5A',
                      fontSize: 14
                    }}
                  >
                    {' '}
                    Grupos relacionados{' '}
                  </Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {suggestedCommunities.map((community, index) => (
                      <View key={index} style={{ width: 200 }}>
                        <SuggestionCard
                          key={community.id}
                          community={community}
                        />
                      </View>
                    ))}
                  </ScrollView>
                </>
              )}
            </View>
            <View style={styles.horizontalLine}></View>
            <CommunityMenu data={communityData}/>
          </View>
      </ScrollView>
    )
  }
}

function SuggestionCard ({ community, onDismiss }) {
  const { userToken } = useSelector((state) => state.auth)
  const navigation = useNavigation()
  const handleJoinCommunity = async () => {
    const response = await axios.post(
      `${EXPO_PUBLIC_API_URL}/communities/join`,
      {
        communityId: community.id
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    )
    console.log(response)
    navigation.push('Community', {
      communityId: community.id
    })
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardIcon} />
        <Text style={styles.cardText} numberOfLines={2} ellipsizeMode="tail">
          {community.name}
        </Text>
        {community.followers === 1 ? (
            <Text style={styles.cardSubText}>1 miembro</Text>
          ) : (
          <Text style={styles.cardSubText}>
            {community.followers} miembros. 10+ publicaciones al día.
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.joinButton}
        onPress={() => handleJoinCommunity(community.id)}
      >
        <Text style={styles.buttonText}>Unirse</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 10
  },
  horizontalLine: {
    borderBottomColor: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 6,
    width: '100%',
    marginVertical: 10
  },
  horizontalTopContainer: {
    borderBottomColor: '#EE4296',
    borderBottomWidth: 1,
    width: '100%',
    zIndex: 1,
    backgroundColor: '#F5F5F5',
    position: 'relative', // Ensure this is relative
    height: 123, // Adjust height as needed
    marginBottom: 20
  },
  mainInfoContainer: {
    marginTop: 20,
    marginHorizontal: 17
  },
  nameText: {
    fontFamily: 'MontserratBold',
    fontSize: 20,
    color: '#5A5A5A'
  },
  contactText: {
    color: '#EE4296',
    fontFamily: 'MontserratLight',
    fontWeight: '400',
    fontSize: 14
  },
  fillingTimeText: {
    paddingBottom: 10
  },
  headlineText: {
    paddingTop: 10,
    fontSize: 14,
    fontFamily: 'MontserratLight'
  },
  pressHereToCompleteProfileText: {
    marginBottom: 10
  },
  mainContentContainer: {
    marginHorizontal: 20,
    marginVertical: 5
  },
  profileButtons: {
    flexDirection: 'row',
    marginHorizontal: 17,
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  biggestButton: {
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#EE4296',
    paddingVertical: 10,
    width: width * 0.7
  },
  profileButtonText: {
    fontFamily: 'MontserratLight',
    color: '#FFFFFF'
  },
  editProfileButtonText: {
    fontFamily: 'MontserratLight',
    color: '#EE4296'
  },
  tripleMenuTitleContainer: {
    marginTop: 5,
    marginLeft: 17,
    marginBottom: 10
  },
  card: {
    marginRight: 4,
    height: 250,
    padding: 15,
    borderRadius: 10,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    marginBottom: 10
  },
  cardText: {
    fontFamily: 'MontserratLight',
    height: 50,
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center'
  },
  cardSubText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10
  },
  joinButton: {
    padding: 10,
    borderRadius: 11,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#EE4296'
  },
  buttonText: {
    color: '#EE4296',
    fontFamily: 'MontserratLight',
    fontWeight: 'bold'
  },
  backButtonContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'left',
    backgroundColor: 'white'
  },
  backButtonText: {
    fontFamily: 'MontserratLight',
    fontSize: 14
  }
})
