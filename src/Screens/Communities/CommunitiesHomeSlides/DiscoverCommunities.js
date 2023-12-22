import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  LogBox
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import CustomLoader from '../../../Components/CustomLoader'
import { updateRecommendedCommunities } from '../../../Redux/Slices/userAuthSlice'
const { EXPO_PUBLIC_API_URL, EXPO_AI_API_URL } = require('../../../Utils/constants')

LogBox.ignoreLogs(['VirtualizedLists should never be nested'])

export default function DiscoverCommunities ({ data }) {
  const [dataPresent, setDataPresent] = useState(false)
  const [visibleCommunities, setVisibleCommunities] = useState([])
  const { recommendedCommunities, userToken } = useSelector((state) => state.auth)
  const [recommendedCommunitiesToShow, setRecommendedCommunitiesToShow] = useState([])
  const [temporalCommunitiesToShow, setTemporalCommunitiesToShow] = useState([])
  const dispatch = useDispatch()

  const handleCardDismiss = (communityId) => {
    const updatedVisibleCommunities = visibleCommunities.filter(
      (community) => community.id !== communityId
    )
    setVisibleCommunities(updatedVisibleCommunities)
  }

  const handleRecommendedCommunityDismiss = (communityId) => {
    const updatedRecommendedCommunities = recommendedCommunitiesToShow.filter(
      (community) => community.id !== communityId
    )
    setRecommendedCommunitiesToShow(updatedRecommendedCommunities)
  }

  const getData = async () => {
    try {
      const response = await axios.get(`${EXPO_AI_API_URL}/default/wotrecommendercommunities`, {
        headers: { Authorization: `Bearer ${userToken}` }
      })
      if (response.data && Array.isArray(response.data)) {
        dispatch(updateRecommendedCommunities(response.data))
        setTemporalCommunitiesToShow(response.data)
      } else {
        console.error('Fetched data is not in the expected format:', response.data)
      }
    } catch (error) {
      console.error('Error fetching recommended communities:', error)
    }
  }

  useEffect(() => {
    if (recommendedCommunities.length === 0) {
      getData()
    } else {
      setTemporalCommunitiesToShow(recommendedCommunities)
    }
  }, [recommendedCommunities])

  useEffect(() => {
    const filteredRecommendedCommunities = temporalCommunitiesToShow.filter(recommendedCommunity =>
      data.some(dataCommunity => dataCommunity.id === recommendedCommunity.id)
    )
    setRecommendedCommunitiesToShow(filteredRecommendedCommunities)

    const updatedVisibleCommunities = data.filter(community =>
      !filteredRecommendedCommunities.some(recommendedCommunity => recommendedCommunity.id === community.id)
    )

    setVisibleCommunities([...updatedVisibleCommunities, ...filteredRecommendedCommunities])

    setDataPresent(data.length !== 0)
  }, [temporalCommunitiesToShow, data])

  const communityGroups = groupCommunities(visibleCommunities)
  const recommendedCommunitiesGroups = groupCommunities(recommendedCommunitiesToShow)

  if (!dataPresent) {
    return (<CustomLoader/>)
  }
  return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.header}>Comunidades recomendadas</Text>
        {recommendedCommunitiesGroups.map((group, rowIndex) => (
          <View key={rowIndex} style={styles.suggestionRow}>
            {group.map((community) => (
              <SuggestionCard
                key={community.id}
                community={community}
                onDismiss={() => handleRecommendedCommunityDismiss(community.id)}
              />
            ))}
          </View>
        ))}
        <Text style={styles.header}>Todas las comunidades</Text>
        {communityGroups.map((group, rowIndex) => (
          <View key={rowIndex} style={styles.suggestionRow}>
            {group.map((community) => (
              <SuggestionCard
                key={community.id}
                community={community}
                onDismiss={() => handleCardDismiss(community.id)}
              />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

function groupCommunities (communities) {
  const grouped = []
  for (let i = 0; i < communities.length; i += 2) {
    const group = []
    group.push(communities[i])
    if (communities[i + 1]) {
      group.push(communities[i + 1])
    }
    grouped.push(group)
  }
  return grouped
}

function SuggestionCard ({ community, onDismiss }) {
  const { userData, userToken } = useSelector((state) => state.auth)
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
    navigation.push('Community', {
      communityId: community.id
    })
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
        <Ionicons size={24} color={'#5A5A5A'} name={'close-circle-sharp'} />
      </TouchableOpacity>
      <View style={styles.cardContent}>
        <View style={styles.cardIcon} />
        <Text style={styles.cardText}>{community.name}</Text>
          { (community.followers === 1)
            ? (
                <Text style={styles.cardSubText}>1 miembro</Text>
              )
            : (
            <Text style={styles.cardSubText}>
              {community.followers} miembros
            </Text>
              )
        }
      </View>
      <TouchableOpacity
        style={styles.joinButton}
        onPress={() => handleJoinCommunity(userData.id, community.id)}
      >
        <Text style={styles.buttonText}>Unirse</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 30
  },
  header: {
    fontSize: 20,
    fontFamily: 'MontserratBold',
    marginBottom: 20,
    color: '#5A5A5A'
  },
  suggestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'stretch'
  },
  card: {
    width: '48%',
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
  dismissButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
    zIndex: 1
  }
})
