import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Image } from 'expo-image'
import CustomLoader from '../../../Components/CustomLoader'
import { ProfilePicWithBadge } from '../../../Components/ProfilePicWithBadge'
const { EXPO_PUBLIC_API_URL } = require('../../../Utils/constants')

export default function Members (props) {
  const { userData, userToken } = useSelector((state) => state.auth)
  const [membersData, setMembersData] = useState([])
  const [dataPresent, setDataPresent] = useState(false)
  const getMembersOfCommunity = async () => {
    try {
      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/communities/get_usuarias_cargos_industrias/${props.data.id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setMembersData(data.usuarias)
        setDataPresent(true)
      } else {
        throw new Error(`HTTP Error: ${response.status}`)
      }
    } catch (error) {
      console.error('Error fetching members data:', error)
    }
  }

  useEffect(() => {
    getMembersOfCommunity()
    console.log(`membersData es ${JSON.stringify(membersData)}`)
  }, [props.data])

  if (!dataPresent) {
    return <CustomLoader/>
  }
  if (membersData.length > 0) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.titleText}> Usuarias de la comunidad </Text>
        {membersData.map((user, index) => (
          (((user.cargo && user.cargo.cargo) || (user.industria && user.industria.nombre_industria))
            ? (
                <View key={index} style={styles.item}>
                  <ProfilePicWithBadge badge={false}/>
                  <View style={styles.text}>
                    { user.cargo && user.cargo.cargo ? <Text style={styles.title}> {user.cargo.cargo}</Text> : null }
                    { user.industria && user.industria.nombre_industria ? <Text style={styles.subtitle}> Sector: {user.industria.nombre_industria}</Text> : null }
                  </View>
                </View>
              )
            : (null)
          )
        ))
        }
      </ScrollView>
    )
  } else {
    return (
      <Text style={styles.titleText}> No hay usuarias en la comunidad. </Text>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingBottom: 20
  },
  titleText: {
    fontFamily: 'MontserratBold',
    fontSize: 15,
    color: '#5A5A5A',
    textAlign: 'center',
    marginVertical: '3%'
  },
  item: {
    padding: 20,
    flexDirection: 'row',
    borderTopColor: '#EE4296',
    borderTopWidth: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontFamily: 'MontserratBold',
    color: '#5A5A5A',
    marginBottom: '2%'
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'MontserratLight',
    color: '#5A5A5A'
  },
  text: {
    marginLeft: '3%'
  }
})
