import React, { useEffect, useState } from 'react'
import { FlatList, ActivityIndicator } from 'react-native'
import CustomLoader from '../../../Components/CustomLoader'
import { useSelector } from 'react-redux'
import axios from 'axios'
import SingularPost from '../../Posts/SingularPost'
const { EXPO_PUBLIC_API_URL } = require('../../../Utils/constants')

export default function YourFeed ({ optionSelected }) {
  const { userToken } = useSelector((state) => state.auth)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [dataPresent, setDataPresent] = useState(false)
  const [communities, setCommunities] = useState([])
  const [loading, setLoading] = useState(false)
  const [isLastPage, setIsLastPage] = useState(false)

  const getData = async () => {
    if (loading || isLastPage) { return }
    setLoading(true)

    try {
      const response = await axios.get(
        `${EXPO_PUBLIC_API_URL}/communities/memberships`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      setCommunities(response.data.otherCommunities)
      const { data } = await axios.post(
        `${EXPO_PUBLIC_API_URL}/posts/get_feed_posts`,
        {
          mode: 'createdAt',
          scrollLevel: page
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      console.log(`Aquí van los posts: ${data}`)

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
        setData(prevData => [...prevData, ...combinedPostsData])
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

  useEffect(() => {
    if (optionSelected === 'YourFeed') {
      getData()
    }
    console.log('New page')
  }, [optionSelected, page])

  if (!dataPresent) {
    return <CustomLoader />
  }
  return (
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
      marginHorizontal: '2%',
      marginBottom: '3%'
    }}
  />
  )
}
