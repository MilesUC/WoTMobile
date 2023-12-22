/* eslint-disable multiline-ternary */
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
  ScrollView,
  Modal,
  TextInput,
  Alert
} from 'react-native'
import ToastManager, { Toast } from 'toastify-react-native'
import { Image } from 'expo-image'
import React, { useEffect, useState, useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Styles from '../../Utils/Styles'
import { ProfilePicWithBadge } from '../../Components/ProfilePicWithBadge'
import { useNavigation } from '@react-navigation/native'
import canEditThePost from '../../Utils/canEditThePost'
import axios from 'axios'
import { useSelector } from 'react-redux'
import CustomLoader from '../../Components/CustomLoader'
const { EXPO_PUBLIC_API_URL } = require('../../Utils/constants')

const communitiesInAlphabeticOrder = async (response) => {
  await response.sort(function (a, b) {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })
}

function formatDateTime (dateStr) {
  const date = new Date(dateStr)
  const padTo2Digits = num => num.toString().padStart(2, '0')
  const day = padTo2Digits(date.getDate())
  const month = padTo2Digits(date.getMonth() + 1)
  const year = padTo2Digits(date.getFullYear() - 2000)
  const hours = padTo2Digits(date.getHours())
  const minutes = padTo2Digits(date.getMinutes())
  return `${day}/${month}/${year} ${hours}:${minutes}`
}

const SelectedMarker = () => (
  <View style={{
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#EE4296', // or any color to indicate selection
    marginRight: 10
  }}/>
)

const UnselectedMarker = () => (
  <View style={{
    height: 10,
    width: 10,
    borderRadius: 5,
    borderColor: '#5A5A5A',
    borderWidth: 1,
    backgroundColor: 'white', // or any color to indicate non-selection
    marginRight: 10
  }}/>
)

export default function ShowSinglePost (props) {
  const navigation = useNavigation()
  const [comment, setComment] = useState('')
  const [communities, setCommunities] = useState([])
  const [post, setPost] = useState([])
  const postId = props.route.params.post
  const [data, setDataPresent] = useState(false)
  const [contentPresent, setContentPresent] = useState(false)
  const [comments, setComments] = useState([])
  const { userData, userToken } = useSelector((state) => state.auth)
  const [heartReaction, setHeartReaction] = useState(false)
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const buttonRef = useRef(null)
  const modalWidth = 200
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
  const [isShareModalOpen, setShareModalOpen] = useState(false)
  const [selectedCommunityId, setSelectedCommunityId] = useState(null)
  const [inputText, setInputText] = useState('')
  const [message, setMessage] = useState('')
  const shareButtonRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`The postId is ${postId}`)
        const response = await fetch(`${EXPO_PUBLIC_API_URL}/posts/${postId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        })
        const communitiesIBelongTo = await fetch(`${EXPO_PUBLIC_API_URL}/communities/memberships`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        })
        if (response.status === 200 && communitiesIBelongTo.status === 200) {
          const data = await response.json()
          console.log(`THIS IS THE POST ${data.post}`)
          setPost(data.post)
          const communities = await communitiesIBelongTo.json()
          setCommunities(communities.otherCommunities)
          setContentPresent(true)
          // if (post.length !== 0) {
          //   setContentPresent(true)
          // }
        } else if (response.status === 404) {
          setMessage('El post no existe o ha sido eliminado.')
          setContentPresent(true)
          setDataPresent(true)
        }
      } catch (error) {
        console.error('Error fetching CV data:', error)
      }
    }

    fetchData()
  }, [postId])

  useEffect(() => {
    if (!isDropdownOpen) {
      // Add code here to close the modal
      closeModal() // Call your closeModal function or add the logic to close the modal directly here
    }
  }, [isDropdownOpen])

  const handleShowComments = async () => {
    const response = await axios.get(
      `${EXPO_PUBLIC_API_URL}/posts/${postId}/comments`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    )
    setComments(response.data.comments.reverse())
    setDataPresent(true)
  }

  const handleDeleteComment = async (commentId) => {
    console.log(commentId)
    const response = await axios.delete(
      `${EXPO_PUBLIC_API_URL}/posts/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    )
    if (response.status === 204) {
      Toast.success('Comentario eliminado con éxito.')
      console.log('Comentario eliminado exitosamente.')
      navigation.push('SinglePostView', { post: postId })
    }
  }

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
      `${EXPO_PUBLIC_API_URL}/posts/${postId}/comment`,
      {
        content: comment
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
      )
      console.log(response.status)
      if (response.status === 201) {
        console.log('Éxito al agregar el comentario')
        navigation.push('SinglePostView', { post: postId })
      }
    } catch {
      Toast.error('Ocurrió un error al publicar un comentario.')
    }
  }

  useEffect(() => {
    if (!isShareModalOpen) {
      closeModal()
    }
  }, [isShareModalOpen])

  const handleShareButtonPress = () => {
    console.log('Se selecciona el botón para compartir!')
    setShareModalOpen(true)
    console.log('Abierto el modal para compartir')
  }

  const closeShareModal = () => {
    setShareModalOpen(false)
  }

  const handleLikePost = async () => {
    try {
      const response = await fetch(`${EXPO_PUBLIC_API_URL}/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      })
      if (!response.ok) {
        console.log('Failed to like publication')
      }
      return response
    } catch (error) {
      console.error(error)
    }
  }

  const handleButtonPress = () => {
    console.log('Se selecciona el botón!')
    buttonRef.current.measure((fx, fy, width, height, px, py) => {
      const calculatedLeft = px - modalWidth
      setModalPosition({ top: py, left: calculatedLeft })
      setDropdownOpen(true)
    })
  }

  const closeModal = () => {
    setDropdownOpen(false)
  }

  useEffect(() => {
    handleShowComments()
  }, [])

  const handleRepost = async () => {
    if (selectedCommunityId === null || inputText === '') {
      Alert.alert('Error', 'Debes agregar texto para acompañar la publicación y seleccionar una comunidad.')
    } else {
      try {
        console.log('Entra al reposteoo')
        const response = await axios.post(
          `${EXPO_PUBLIC_API_URL}/posts/repost`,
          {
            newCommunityId: selectedCommunityId,
            originalPostId: post.id,
            repostContent: inputText
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          }
        )
        console.log(response.status)
        if (response.status === 201) {
          console.log('Éxito al repostear')
          closeShareModal()
          Toast.success('Publicación compartida.')
          navigation.reset({
            index: 0,
            routes: [
              { name: 'Comunidades', params: { screen: 'Community', params: { communityId: selectedCommunityId } } }
            ]
          })
        }
      } catch {
        Toast.error('Ocurrió un error al publicar un comentario.')
      }
    }
  }

  if (!data || !contentPresent) {
    return (
      <CustomLoader/>
    )
  }

  if (post.length === 0) {
    return (
      <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'column' }}>
        <Text style={{ fontFamily: 'MontserratLight', fontSize: 16 }}>
          {message}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: '#EE4296',
            borderRadius: 10,
            marginTop: 10
          }}>
          <Text
            style={{
              fontFamily: 'MontserratBold',
              color: 'white',
              fontSize: 16,
              padding: 10
            }}>
            Volver
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <ScrollView style={{ flexDirection: 'column', backgroundColor: 'white', marginTop: '2%' }}>
      {console.log(`El post es este: ${post}`)}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '2%', marginVertical: '3%' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'left' }}>
          <ToastManager/>
          <View>
            <ProfilePicWithBadge
              badge={true}
            />
          </View>
          <View>
            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'MontserratBold' }}>{post.cargo?.cargo} </Text>
            <Text style={{ fontSize: 11, fontFamily: 'MontserratLight' }}>{post.date} a las {post.time}</Text>
          </View>
        </View>
        <ToastManager/>
        { (post.userId === userData.id) ?
        <View>
          <TouchableOpacity
            ref={buttonRef}
            onPress={() => handleButtonPress()}
          >
            <Ionicons name="ellipsis-horizontal" size={30} />
          </TouchableOpacity>
          {isDropdownOpen && (
          <Modal
            transparent={true}
            visible={isDropdownOpen}
            onRequestClose={closeModal} // For handling hardware back button on Android
          >
          <TouchableOpacity
            style={styles.fullScreenOverlay}
            activeOpacity={1}
            onPress={closeModal}
          >
          <View style={[styles.dropdownContainer, { top: modalPosition.top, left: modalPosition.left }]}>
            { canEditThePost(post.updatedAt, post.edited) ? (
            <TouchableOpacity
              onPress={() => {
                console.log('Va a navegar ahora')
                navigation.navigate('EditPostScreen', {
                  postId,
                  communityId: post.communityId,
                  originalContent: post.content
                })
                console.log('Ya navegó')
              }}
              style={styles.dropdownItem}
            >
              <Text style={{ textAlign: 'center', fontFamily: 'MontserratLight', paddingVertical: '8%' }}>Editar publicación</Text>
            </TouchableOpacity>
            ) : (null)
            }
            { canEditThePost(post.updatedAt, post.edited) && (
              <View style={styles.divider} />
            )}
            <TouchableOpacity
              style={styles.dropdownItem}
              activeOpacity={1}
              onPressOut={() => {
                setDropdownOpen(false)
              }}
            >
              <Text style={{ textAlign: 'center', fontFamily: 'MontserratLight', paddingVertical: '8%' }}>Eliminar publicación</Text>
            </TouchableOpacity>
          </View>
          </TouchableOpacity>
        </Modal>)}
        </View>
          : (null)}
      </View>
      <View style={{ marginVertical: '2%' }}>
        {post.content ? (
          <Text
            style={{
              paddingHorizontal: 16,
              color: 'black',
              marginVertical: 10,
              textAlign: 'justify',
              fontFamily: 'MontserratLight'
            }}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
          {post.content}
        </Text>
        ) : (
          <View style={{ marginTop: 10 }} />
        )}
      </View>
      {(post.is_repost) ? (
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            borderWidth: 1,
            alignContent: 'center',
            justifyContent: 'center',
            width: '90%',
            alignItems: 'center',
            borderColor: '#EE4296',
            marginHorizontal: '5%'
          }}
        >
          <Text
            style={{
              paddingHorizontal: 16,
              color: 'black',
              marginVertical: 5,
              // textAlign: 'justify',
              justifyContent: 'center',
              alignContent: 'center',
              fontFamily: 'MontserratLight'
            }}
            numberOfLines={3}
            ellipsizeMode="tail"
            onPress={() => navigation.navigate('SinglePostView', { post: post.repostedPost?.originalPostId })}
          >
            Ir a la publicación
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={{ marginTop: 10 }} />
      )}
      <View>
        {post.imageLinks?.length > 0 ? (
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
          {post.imageLinks.map((imageUri, index) => (
            <Image
              key={index}
              source={{ uri: imageUri }}
              style={{ height: 300, width: Dimensions.get('window').width }}
            />
          ))}
          </ScrollView>
        ) : (null)}
      </View>
      <View
        style={[
          Styles.flexCenter,
          {
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingTop: 5,
            marginVertical: '2%'
          }
        ]}
        >
          <View style={Styles.flexCenter}>
            <TouchableOpacity
              style={{ flexDirection: 'row', aligndatas: 'center' }}
              onPress={() => {
                setHeartReaction(!heartReaction)
                handleLikePost()
              }}
            >
              {(heartReaction || post.liked) ? (
                <Ionicons name="heart" size={20} />
              ) : (
                <Ionicons name="heart-outline" size={20} />
              )}
              <Text style={{ fontFamily: 'MontserratLight', marginLeft: 5 }}>
                Me gusta
              </Text>
            </TouchableOpacity>
          </View>
          {comments?.length !== 1 ? (
            <Text style={{ fontFamily: 'MontserratLight', marginLeft: 5 }}>
              {comments?.length} comentarios
            </Text>
          ) : (<Text style={{ fontFamily: 'MontserratLight', marginLeft: 5 }}>
              {comments?.length} comentario
              </Text>)}
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            ref={shareButtonRef}
            onPress={() => handleShareButtonPress()}
          >
            <Ionicons name="send-outline" size={20} />
            <Text style={{ fontFamily: 'MontserratLight', marginLeft: 5 }}>
              Compartir
            </Text>
          </TouchableOpacity>
      </View>
      { (isShareModalOpen) && (
      <Modal
        visible={isShareModalOpen}
        transparent={true}
        style={{
          marginHorizontal: '10%',
          marginVertical: '2%'
        }}
        onRequestClose={closeShareModal}
      >
        <TouchableOpacity
          style={styles.shareScreenOverlay}
          activeOpacity={1}
          onPress={closeShareModal}
        >
          <TextInput
                value={inputText}
                onChangeText={text => setInputText(text)}
                style={styles.repostInput}
                multiline={true}
                placeholder="Escribe algo para acompañar el post..."
              />
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                width: '90%',
                height: '20%',
                marginHorizontal: '2%',
                marginVertical: '1%'
              }}>
            <Text
              style={{
                fontFamily: 'MontserratLight',
                textAlign: 'center',
                color: '#5A5A5A',
                marginBottom: '2%'
              }}>
              ¿Con qué comunidad quieres compartirlo?
            </Text>
            <FlatList
              data={communities}
              renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedCommunityId(item.id)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: '4%', marginTop: '3%' }}>
                {selectedCommunityId === item.id ? <SelectedMarker /> : <UnselectedMarker />}
                <Text
                  style={{
                    fontFamily: 'MontserratLight',
                    fontSize: 14,
                    marginVertical: '1%',
                    marginHorizontal: '2%',
                    color: '#5A5A5A'
                  }}
                >
                  {item.name}
                </Text>
              </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
            </View>
            <TouchableOpacity
              onPress={handleRepost}
              style={{
                backgroundColor: '#EE4296',
                width: '60%',
                marginVertical: '3%',
                borderRadius: 5
              }}
            >
            <Text
              style={{
                paddingVertical: '3%',
                fontFamily: 'MontserratBold',
                fontSize: 14,
                color: 'white',
                textAlign: 'center'
              }}
            >
              Compartir
            </Text>
            </TouchableOpacity>
        </TouchableOpacity>
      </Modal>)
      }
      <View>
        {comments?.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            marginHorizontal='2%'
          >
          {comments.map((comment, index) => (
            <>
            <View style={styles.horizontalLine}/>
            <View style={{ flexDirection: 'column' }}>
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: '2%' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                <ProfilePicWithBadge badge={false} />
                <View style={{ marginLeft: 10, marginRight: 20 }}>
                  <Text style={{ fontSize: 16, color: 'black', fontFamily: 'MontserratBold' }}>{comment.usuaria.cargo?.cargo}</Text>
                  <Text style={{ fontSize: 12, fontFamily: 'MontserratLight' }}>{formatDateTime(comment.updatedAt)}</Text>
                </View>
                <View>
                  { comment.userId === userData.id ? (
                    <View>
                      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end' }} onPress={() => handleDeleteComment(comment.id)}>
                        <Ionicons name="trash-outline" size={15} />
                        <Text style={{ fontFamily: 'MontserratLight', fontSize: 12, color: '#5A5A5A' }}>
                          Eliminar
                        </Text>
                      </TouchableOpacity>
                    </View>)
                    : (null)}
                </View>
              </View>
            </View>
            <View style={{ paddingVertical: '5%', backgroundColor: 'white', alignContent: 'center', justifyContent: 'center', alignItems: 'left' }}>
              <Text style={{ fontFamily: 'MontserratLight', fontSize: 14, marginVertical: '2%', marginHorizontal: '2%' }}>
                  { comment.content }
                </Text>
              </View>
            </View>
            </>
          ))}
          </ScrollView>
        ) : (<Text style={{ fontFamily: 'MontserratLight', fontSize: 12, textAlign: 'center' }}> 
              Sé la primera en comentar la publicación.
            </Text>)
            }
      </View>
      <View style={styles.horizontalLine}/>
      <View style={{ flexDirection: 'row', marginHorizontal: '2%', marginVertical: '3%' }}>
            <TextInput
              placeholder="Escribe un comentario..."
              style={styles.commentInput}
              multiline
              value={comment}
              onChangeText={(text) => setComment(text)}
              onSubmitEditing={handleAddComment}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#EE4296',
                paddingHorizontal: '3%',
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={handleAddComment}
            >
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'MontserratBold',
                  fontSize: 17,
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                Comentar
              </Text>
            </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  image: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 20,
    marginRight: 10
  },
  commentInput: {
    fontFamily: 'MontserratLight',
    color: '#5A5A5A',
    marginLeft: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
    flex: 1,
    marginRight: 8
  },
  modalOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Semi-transparent
  },
  dropdownContainer: {
    position: 'absolute',
    backgroundColor: 'white', // Opaque background for dropdown
    elevation: 5, // Shadow for Android
    shadowOpacity: 0.25, // Shadow for iOS
    shadowRadius: 5,
    borderRadius: 20,
    justifyContent: 'center',
    zIndex: 1000 // Ensure it's above everything
  },
  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Semi-transparent
  },
  dropdownItem: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  divider: {
    height: 1,
    backgroundColor: '#5A5A5A',
    width: '100%'
  },
  horizontalLine: {
    borderBottomColor: '#9D9D9D',
    backgroundColor: '#9D9D9D',
    borderBottomWidth: 1,
    width: '100%',
    marginVertical: '1%'
  },
  repostInput: {
    backgroundColor: 'white',
    fontFamily: 'MontserratLight',
    color: '#5A5A5A',
    marginHorizontal: '2%',
    padding: '5%',
    fontSize: 14,
    width: '90%',
    borderRadius: 20,
    flex: 1,
    marginTop: '40%',
    marginBottom: '3%',
    maxHeight: '25%'
  },
  shareScreenOverlay: {
    position: 'absolute',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Semi-transparent
  }
})
