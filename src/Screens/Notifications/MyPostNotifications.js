import React, { useEffect, useState } from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import calculateTimeAgo from '../../Utils/calculateTimeAgo.js'
import CustomLoader from '../../Components/CustomLoader.js'
const { EXPO_PUBLIC_API_URL } = require('../../Utils/constants.js')

export default function MyPostNotifications ({ optionSelected }) {
  const { userToken } = useSelector((state) => state.auth)
  const [dataPresent, setDataPresent] = useState(false)
  const [notifications, setNotifications] = useState([])
  const navigation = useNavigation()

  const getMyPostsNotifications = async () => {
    const { data } = await axios.get(`${EXPO_PUBLIC_API_URL}/notifications`, {
      headers: { Authorization: `Bearer ${userToken}` }
    })
    const filteredNotifications = data.notifications.filter(notification => notification.section === 'Mis publicaciones')
    setNotifications(filteredNotifications)
    setDataPresent(true)
  }
  console.log(notifications)

  useEffect(() => {
    console.log('Entra a buscar los datos')
    if (optionSelected === 'Mis publicaciones') {
      getMyPostsNotifications()
    }
  }, [optionSelected])

  const handleClick = (e, item) => {
    if (e === 'profilecheck') {
      navigation.push('ProfileScreen')
    } else if (e === 'summary') {
      navigation.navigate('Inicio', { screen: 'SinglePostView', params: { post: item.postId } })
    }
  }

  const renderItem = ({ item }) => (
    <>
      <TouchableOpacity onPress={() => handleClick(item.type, item)}>
        <View
          style={{
            backgroundColor: item.seen ? 'white' : '#FFD7D7',
            flex: 1,
            width: '100%',
            paddingVertical: '3%',
            paddingHorizontal: '2%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
        <Ionicons name={'business-outline'} size={30} color={'#5A5A5A'}
          style={{ borderRadius: 30, borderWidth: 1, borderColor: '#5A5A5A', padding: '3%'}}/>
            <Text
              style={{
                marginHorizontal: '2%',
                fontSize: 15,
                fontFamily: 'MontserratBold',
                marginBottom: '5%',
                flexShrink: 1
              }}
            >
              {item.content}
            </Text>
            <Text>
              {calculateTimeAgo(item.createdAt)}
            </Text>
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

  if (!dataPresent) {
    return <CustomLoader/>
  }
  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  )
}
