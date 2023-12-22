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
import { useNavigation } from '@react-navigation/native'
import CustomLoader from '../../../Components/CustomLoader'
LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
export default function YourCommunities ({ data }) {
  const [dataPresent, setDataPresent] = useState(false)
  const [visibleCommunities, setVisibleCommunities] = useState(null)
  const communityGroups = groupCommunities(data || [])

  const handleCardDismiss = (communityId) => {
    const updatedVisibleCommunities = visibleCommunities.filter(
      (community) => community.id !== communityId
    )
    setVisibleCommunities(updatedVisibleCommunities)
  }

  useEffect(() => {
    setVisibleCommunities(data)
    if (Array.isArray(visibleCommunities)) {
      setDataPresent(true)
    }
  }, [data])

  if (!dataPresent) {
    return (<CustomLoader/>)
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Tus comunidades ({data.length})</Text>
        {data.length === 0 ? (<Text style={{ fontFamily: 'MontserratLight' }}> Aún no eres parte de una comunidad.</Text>) : (null)}
        {communityGroups.map((group, rowIndex) => (
          <View key={rowIndex} style={styles.suggestionRow}>
            {group.map((community) => (
              <SuggestionCard
                key={community.id}
                community={community}
                onDismiss={() => handleCardDismiss(community.id)}
                suggestedCommunities={visibleCommunities}
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

function SuggestionCard ({ community, onDismiss, suggestedCommunities }) {
  const navigation = useNavigation()
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardIcon} />
        <Text style={styles.cardText} numberOfLines={2} ellipsizeMode="tail">
          {community.name}
        </Text>
        <Text style={styles.cardSubText}>Última visita: hace 15 semanas. </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            style={styles.joinButton}
            onPress={() =>
              navigation.push('Community', {
                communityId: community.id,
                suggestedCommunities
              })
            }
          >
            <Text style={styles.buttonText}>Ver comunidad</Text>
          </TouchableOpacity>
          <Ionicons
            size={24}
            color={'#5A5A5A'}
            name={'ellipsis-horizontal-circle-sharp'}
          />
        </View>
      </View>
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
    // height: 200,
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
    marginBottom: 10,
    marginTop: '1%'
  },
  cardText: {
    fontFamily: 'MontserratLight',
    fontSize: 16,
    marginBottom: 5,
    height: 50,
    lineHeight: 25,
    textAlign: 'center'
  },
  cardSubText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10
  },
  joinButton: {
    borderRadius: 11,
    backgroundColor: '#EE4296',
    alignItems: 'center',
    width: '80%',
    borderWidth: 1,
    borderColor: '#EE4296',
    marginRight: 5,
    marginBottom: '5%'
  },
  buttonText: {
    color: 'white',
    fontFamily: 'MontserratBold',
    textAlign: 'center'
  },
  dismissButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
    zIndex: 1
  }
})
