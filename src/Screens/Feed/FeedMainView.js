import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native'
import SingularPost from '../Posts/SingularPost'
import { Image } from 'expo-image'
import Images from '../../Utils/Images'
import { useSelector } from 'react-redux'
import axios from 'axios'
import CustomLoader from '../../Components/CustomLoader'
import { ProfilePicWithBadge } from '../../Components/ProfilePicWithBadge'
import { useNavigation } from '@react-navigation/native'
import FeedSearchBar from './FeedSearchBar'
import { AntDesign, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import BlockScreen from '../BlockScreen/BlockScreen'
const { EXPO_PUBLIC_API_URL } = require('../../Utils/constants')

export default function FeedMainView () {
  const navigation = useNavigation()
  const { userToken, percentageOfUserDataCompletion } = useSelector((state) => state.auth)
  const [data, setData] = useState([])
  const [dataPresent, setDataPresent] = useState(false)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [isLastPage, setIsLastPage] = useState(false)
  const [communities, setJoinedCommunities] = useState([])

  const getData = async () => {
    if (loading || isLastPage) { return }
    setLoading(true)

    try {
      console.log('Entró al try de feedMainView')
      const response2 = await axios.get(
        `${EXPO_PUBLIC_API_URL}/communities/memberships`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      setJoinedCommunities(response2.data.otherCommunities)

      const response = await axios.post(
        `${EXPO_PUBLIC_API_URL}/posts/get_feed_posts`,
        {
          mode: 'createdAt',
          scrollLevel: page
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      const newData = await response.data || []

      const { cargosArray = [], posts = [], postMultimediaArray = [] } = newData || {}
      if (Array.isArray(posts)) {
        const combinedPostsData = posts.map((post, index) => {
          const cargoIndex = index % cargosArray.length
          const cargoName = cargosArray[cargoIndex]
          const multimedia = postMultimediaArray[index] || []
          return {
            ...post,
            cargoName,
            multimedia
          }
        })
        setData(prevData => [...prevData, ...combinedPostsData])
        setPage(prevPage => prevPage + 1)
      }
      setDataPresent(true)
      if (response.data.posts.length < 15) {
        setIsLastPage(true)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (percentageOfUserDataCompletion === 100) {
      getData()
    }
  }, [page])

  if (percentageOfUserDataCompletion !== 100) {
    return (
      <BlockScreen message={'ver las publicaciones de tus comunidades'}/>
    )
  } else if (!dataPresent) {
    return <CustomLoader />
  } else {
    return (
      <>
        <StatusBar style="dark" />
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'column',
            flex: 1,
            paddingTop: 10
          }}
        >
          <View style={styles.headerContainer}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 5,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '7%'
              }}
            >
              <Image
                source={Images.LOGO}
                style={{ width: 54, height: 29, marginLeft: 5 }}
              />
              <FeedSearchBar message={'Buscar publicaciones...'}/>
            </View>
          </View>
          <View style={styles.horizontalLine2} />
          <View style={styles.mainInfoContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginTop: '0%'
              }}
            >
              <ProfilePicWithBadge
                badge={true}
              />
              <TouchableOpacity
                style={{
                  width: '65%',
                  backgroundColor: '#F5F5F5',
                  marginLeft: '5%',
                  height: '80%',
                  verticalAlign: 'middle',
                  textAlignVertical: 'center'
                }}
                onPress={() => navigation.push('MyCommunitiesToPost')}
              >
                <Text
                  style={{
                    marginTop: '3%',
                    marginLeft: '5%',
                    color: '#5A5A5A',
                    fontSize: 14,
                    width: '90%',
                    paddingRight: '20%',
                    textAlignVertical: 'center',
                    fontFamily: 'MontserratLight'
                  }}
                >
                  Crear Publicación
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '5%',
                marginBottom: '3%',
                width: '80%',
                justifyContent: 'space-evenly',
                marginLeft: '10%'
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'space-between' }}
              >
                <Ionicons
                  name="images"
                  color={'#D4D4D4'}
                  size={15}
                  marginRight={5}
                />
                <Text style={{ fontFamily: 'MontserratLight' }}>
                  Adjunta foto
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <AntDesign
                  name="calendar"
                  size={15}
                  color="#D4D4D4"
                  marginRight={5}
                />
                <Text style={{ fontFamily: 'MontserratLight' }}>Evento</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <FontAwesome5
                  name="newspaper"
                  size={15}
                  color="#D4D4D4"
                  marginRight={5}
                />
                <Text style={{ fontFamily: 'MontserratLight' }}>Noticia</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={data}
            renderItem={({ item }) => <SingularPost post={item} userToken={userToken} communities={communities}/>}
            keyExtractor={item => item.id}
            onEndReached={isLastPage ? null : getData}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            ListFooterComponent={
              loading && !isLastPage
                ? (
                <ActivityIndicator size="large" color="#EE4296" />
                  )
                : null
            }
            style={{
              marginHorizontal: '2%'
            }}
          />
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginHorizontal: 10
  },
  headlineText: {
    paddingTop: 10,
    fontSize: 24,
    fontFamily: 'MontserratBold',
    color: '#5A5A5A',
    marginHorizontal: 10
  },
  avatarWrapper: {
    position: 'relative'
  },
  badge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EE4296',
    position: 'absolute',
    right: -5,
    bottom: -5
  },
  horizontalLine: {
    borderBottomColor: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 8,
    width: '100%',
    marginVertical: 25
  },
  horizontalLine2: {
    borderBottomColor: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 2,
    width: '100%',
    marginTop: 10
  },
  horizontalTopContainer: {
    borderBottomColor: '#EE4296',
    borderBottomWidth: 1,
    width: '100%',
    zIndex: 1,
    backgroundColor: '#F5F5F5',
    height: 123,
    marginBottom: 20
  },
  mainInfoContainer: {
    marginTop: '4%',
    marginLeft: 17
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
    marginTop: 10
  },
  biggestButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#EE4296',
    flex: 1,
    width: 146,
    alignItems: 'center',
    paddingVertical: 5,
    marginRight: 8
  },
  profileButton: {
    backgroundColor: '#EE4296'
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
  }
})
