import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import CommunitiesSlides from './CommunitiesHomeSlides/CommunitiesSlides'
import { useSelector } from 'react-redux'
import axios from 'axios'
import CustomLoader from '../../Components/CustomLoader'
import { ProfilePicWithBadge } from '../../Components/ProfilePicWithBadge'
import BlockScreen from '../BlockScreen/BlockScreen'

export default function CommunitiesHome () {
  const { percentageOfUserDataCompletion } = useSelector((state) => state.auth)

  if (percentageOfUserDataCompletion !== 100) {
    return (
      <BlockScreen message={'participar en comunidades'}/>
    )
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
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <ProfilePicWithBadge/>
              <Text style={styles.headlineText}> Comunidades </Text>
            </View>
            <View>
              <Ionicons
                size={30}
                color={'#5A5A5A'}
                name={'ellipsis-horizontal-outline'}
              />
            </View>
          </View>
          <View style={styles.mainInfoContainer}></View>
          <CommunitiesSlides/>
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
    alignContent: 'center',
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
    borderBottomWidth: 6,
    width: '100%',
    marginVertical: 10
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
    marginTop: 20,
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
