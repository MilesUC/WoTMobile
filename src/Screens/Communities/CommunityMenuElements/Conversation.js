import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  LogBox
} from 'react-native'
import { ProfilePicWithBadge } from '../../../Components/ProfilePicWithBadge'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import axios from 'axios'
import SingularPost from '../../Posts/SingularPost'
import CustomLoader from '../../../Components/CustomLoader'
const { EXPO_PUBLIC_API_URL } = require('../../../Utils/constants')

export default function Conversation (props) {
  LogBox.ignoreAllLogs()
  const navigation = useNavigation()
  const [combinedPostsData, setCombinedPostsData] = useState([])
  const { userData, userToken } = useSelector((state) => state.auth)
  const [communities, setCommunities] = useState([])
  console.log(JSON.stringify(props))
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [isLastPage, setIsLastPage] = useState(false)
  const [dataPresent, setDataPresent] = useState(false)
  const [datos, setDatos] = useState([])

  useEffect(() => {
    getData()
  }, [page])

  const getData = async () => {
    if (loading || isLastPage) { return }
    setLoading(true)

    try {
      const response2 = await axios.get(
        `${EXPO_PUBLIC_API_URL}/communities/memberships`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      setCommunities(response2.data.otherCommunities)
      const { data } = await axios.post(
        `${EXPO_PUBLIC_API_URL}/posts/get_community_posts`,
        {
          communityId: props.data.id,
          mode: 'createdAt',
          scrollLevel: page
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )

      console.log(`Aquí van los posts: ${JSON.stringify(datos)}`)
      const newData = await data || []
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
        setDatos(prevData => [...prevData, ...combinedPostsData])
        setPage(prevPage => prevPage + 1)
      }
      setDataPresent(true)
      if (data.posts.length < 15) {
        setIsLastPage(true)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!dataPresent) {
    return (<CustomLoader/>)
  }
  return (
    <View style={{ marginHorizontal: 20 }}>
      <View style={{ width: '100%' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NewPostScreen', { communityData: props.data })}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: '3%'
          }}
        >
          <ProfilePicWithBadge badge={true}/>
          <Text
            style={{
              color: 'gray',
              fontFamily: 'MontserratLight',
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: '25%',
              paddingVertical: '3%',
              borderColor: '#9D9D9D'
            }}
          >
            Escribe algo....
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <TouchableOpacity style={styles.kindOfPostButton}>
          <Text style={styles.kindOfPostText}>Publicación anónima</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.kindOfPostButton}>
          <Text style={styles.kindOfPostText}>Foto/video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.kindOfPostButton}>
          <Text style={styles.kindOfPostText}>Encuesta</Text>
        </TouchableOpacity>
      </View>
      <View>
      {
        datos.length > 0
          ? (
              <FlatList
              data={datos}
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
            )
          : (<Text
            style={{
              fontFamily: 'MontserratLight',
              fontSize: 14,
              textAlign: 'center',
              textAlignVertical: 'center'
            }}>
              Aún no hay publicaciones.
          </Text>
            )
      }
      </View>
      </View>
  )
}

const styles = StyleSheet.create({
  kindOfPostButton: {
    paddingVertical: 10
  },
  kindOfPostText: {
    fontFamily: 'MontserratLight',
    fontWeight: '400'
  }
})
