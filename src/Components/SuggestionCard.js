import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

function SuggestionCard({ community, onDismiss }) {
  const navigation = useNavigation()

  return (
    <View style={styles.card}>
      <View style={styles.cardIcon}></View>
      <Text style={styles.cardText}>{community.name}</Text>
      <Text style={styles.cardSubText}>Última visita: hace 15 semanas. </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={() =>
            navigation.push('Community', { communityId: community.id })
          }
        >
          <Text style={styles.buttonText}>Ver grupo</Text>
        </TouchableOpacity>
        <Ionicons
          size={24}
          color={'#5A5A5A'}
          name={'ellipsis-horizontal-circle-sharp'}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  suggestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  card: {
    width: '45%',
    padding: 15,
    borderRadius: 10,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    alignItems: 'center'
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    marginBottom: 10
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5
  },
  cardSubText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10
  },
  joinButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#f06292',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})
