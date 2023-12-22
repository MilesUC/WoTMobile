/* eslint-disable multiline-ternary */
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  Modal,
  ScrollView,
  FlatList,
  Alert
} from 'react-native'
import { Image } from 'expo-image'
import React, { useState, useRef, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Styles from '../../Utils/Styles'
import { ProfilePicWithBadge } from '../../Components/ProfilePicWithBadge'
import canEditThePost from '../../Utils/canEditThePost'
import calculatePostAntiquity from '../../Utils/calculatePostAntiquity'
import axios from 'axios'
import ToastManager, { Toast } from 'toastify-react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
const { EXPO_PUBLIC_API_URL } = require('../../Utils/constants')

const useToastWithTimeout = () => {
  const showToastWithTimeout = (message, duration) => {
    const toastId = Toast.show(message)
    setTimeout(() => {
      Toast.hide(toastId)
    }, duration)
  }
  return showToastWithTimeout
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

export default function SingularPost ({ post, communityId, communities }) {
  const { userData, userToken } = useSelector((state) => state.auth)
  const [comment, setComment] = useState()
  const [heartReaction, setHeartReaction] = useState(false)
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const navigation = useNavigation()
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
  const buttonRef = useRef(null)
  const shareButtonRef = useRef(null)
  const modalWidth = 200
  const showToast = useToastWithTimeout()
  const [isShareModalOpen, setShareModalOpen] = useState(false)
  const [selectedCommunityId, setSelectedCommunityId] = useState(null)
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    if (!isDropdownOpen) {
      closeModal()
    }
  }, [isDropdownOpen])

  useEffect(() => {
    if (!isShareModalOpen) {
      closeShareModal()
    }
  }, [isShareModalOpen])

  const handleButtonPress = () => {
    console.log('Se selecciona el botón!')
    buttonRef.current.measure((fx, fy, width, height, px, py) => {
      const calculatedLeft = px - modalWidth
      setModalPosition({ top: py, left: calculatedLeft })
      setDropdownOpen(true)
    })
  }

  const handleShareButtonPress = () => {
    console.log('Se selecciona el botón para compartir!')
    setShareModalOpen(true)
    console.log('Abierto el modal para compartir')
  }

  const closeModal = () => {
    setDropdownOpen(false)
  }

  const closeShareModal = () => {
    setShareModalOpen(false)
  }

  const handleDeletePost = async () => {
    console.log('intento de eliminar un post')
    try {
      console.log('ahora entra al axios.delete')
      const response = await axios.delete(`${EXPO_PUBLIC_API_URL}/posts/${post.id}`, {
        headers: { Authorization: `Bearer ${userToken}` }
      })
      console.log(response)
      if (response.status === 200) {
        Toast.success('Publicación eliminada correctamente.')
        navigation.navigate('Comunidades', { screen: 'Community', params: { communityId: post.communityId } })
      } else {
        showToast('Ocurrió un error al eliminar la publicación.', 5000)
      }
    } catch {
      Toast.error('Ocurrió un error al eliminar la publicación. Inténtalo más tarde.')
    }
  }

  const handleLikePost = async () => {
    try {
      const response = await fetch(`${EXPO_PUBLIC_API_URL}/posts/${post.id}/like`, {
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

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
      `${EXPO_PUBLIC_API_URL}/posts/${post.id}/comment`,
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
        Toast.success('Comentario agregado correctamente.')
        navigation.navigate('SinglePostView', { post: post.id })
      }
    } catch {
      Toast.error('Ocurrió un error al publicar un comentario.')
    }
  }

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
          // navigation.navigate('Comunidades', { screen: 'Community', params: { communityId: selectedCommunityId } })
        }
      } catch {
        Toast.error('Ocurrió un error al publicar un comentario.')
      }
    }
  }

  return (
    <View style={{ flexDirection: 'column', marginVertical: '2%' }}>
      <View style={styles.horizontalLine}/>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'left' }}>
          <View>
            <ProfilePicWithBadge
              badge={true}
            />
          </View>
          <View>
            <Text
              style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}
            >
              {post.cargoName}
            </Text>
            <Text style={{ fontSize: 11, fontFamily: 'MontserratLight' }}>{calculatePostAntiquity(post.updatedAt)}</Text>
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
                  postId: post.id,
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
                handleDeletePost()
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
      <View
        style={{
          backgroundColor: 'white',
          marginVertical: 5,
          paddingVertical: 10
        }}
      >
      <TouchableOpacity
        onPress={() =>
          navigation.push('SinglePostView', {
            post: post.id
          })
        }
      >

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
      {(post.is_repost) ? (
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            borderWidth: 1,
            alignContent: 'center',
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
            borderColor: '#EE4296'
          }}
        >
          <Text
            style={{
              paddingHorizontal: 16,
              color: 'black',
              marginVertical: 5,
              justifyContent: 'center',
              alignContent: 'center',
              fontFamily: 'MontserratLight'
            }}
            numberOfLines={3}
            ellipsizeMode="tail"
            onPress={() => navigation.navigate('SinglePostView', { post: post.repostedPost.originalPostId })}
          >
            Ir a la publicación
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={{ marginTop: 10 }} />
      )}
      {post.multimedia.length > 0 ? (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
        {post.multimedia.map((imageUri, index) => (
          <Image
            key={index}
            source={{ uri: imageUri }}
            style={{ height: 300, width: Dimensions.get('window').width }}
          />
        ))}
        </ScrollView>
      ) : (null)}
    </TouchableOpacity>
    </View>
      <View
        style={[
          Styles.flexCenter,
          {
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingTop: 5
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
      <View
        style={{
          borderTopColor: 'lightgray',
          borderTopWidth: 1,
          margin: 10
        }}
      />
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
              marginHorizontal: '2%',
              marginVertical: '1%',
              height: '20%'
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

      <View style={styles.container}>
        <TouchableOpacity
          style={{ aligndatas: 'center', flexDirection: 'row', flex: 1 }}
        >
          <View style={styles.container}>
            <TextInput
              placeholder="Escribe algo..."
              style={styles.commentInput}
              multiline
              value={comment}
              onChangeText={(text) => setComment(text)}
              onSubmitEditing={handleAddComment} // This function will be called when Enter key is pressed
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#EE4296',
                paddingVertical: '1%',
                paddingHorizontal: '3%',
                borderRadius: 15,
                alignItems: 'center'
              }}
              onPress={handleAddComment}
            >
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'MontserratBold',
                  fontSize: 17,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                Comentar
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
  horizontalLine: {
    borderBottomColor: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 6,
    width: '100%',
    marginVertical: 10
  },
  modalOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%%',
    justifyContent: 'center',
    alignItems: 'center',
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
  }
})
