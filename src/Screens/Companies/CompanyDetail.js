/* eslint-disable multiline-ternary */
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Image } from 'expo-image'

const CompanyDetail = () => {
  const [selectedOption, setSelectedOption] = useState(null)

  const handleOptionClick = (option) => {
    setSelectedOption(option)
  }

  const route = useRoute()
  const company = route.params.item
  return (
    <View
      style={{
        backgroundColor: 'white',
        flexDirection: 'column',
        flex: 1
      }}
    >
      <View style={styles.horizontalTopContainer}>
        <Image
          source={require('../../../assets/Images/office-building.png')}
          style={{
            width: 100,
            height: 100,
            position: 'absolute',
            borderRadius: 50,
            borderColor: '#EE4296',
            borderWidth: 1,
            top: 60,
            left: 20
          }}
        />
      </View>
      <View style={styles.mainInfoContainer}>
        <Text style={styles.nameText}>{company.name}</Text>
        <Text style={styles.headlineText}>{company.description}</Text>
      </View>
      <View style={styles.profileButtons}>
        <View style={{ alignItems: 'center' }}>
          {company.isFollowing ? (
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity style={styles.biggestButton}>
                <Text style={styles.profileButtonText}>
                  {' '}
                  Dejar de seguir a la empresa{' '}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity style={styles.biggestButton}>
                <Text style={styles.profileButtonText}> Seguir </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      {/* <View
        style={{
          borderBottomColor: '#F5F5F5',
          backgroundColor: '#F5F5F5',
          borderBottomWidth: 2,
          width: '100%',
          marginTop: '3%'
        }}
      /> */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 30,
        marginBottom: 10
      }}>
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.menuButton}>
            <Text style={{ fontFamily: 'MontserratBold', color: '#5A5A5A' }}>Publicaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={{ fontFamily: 'MontserratBold', color: '#5A5A5A' }}>Seguidores</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={{ fontFamily: 'MontserratBold', color: '#5A5A5A' }}>Menciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={{ fontFamily: 'MontserratBold', color: '#5A5A5A' }}>Fotos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={{ fontFamily: 'MontserratBold', color: '#5A5A5A' }}>Videos</Text>
          </TouchableOpacity>
        </ScrollView>
        <View
          style={{
            borderBottomColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            borderBottomWidth: 20,
            width: '100%',
            marginTop: '3%'
          }}
        />
      </View>
    </View>
  )
}

export default CompanyDetail

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 10,
    flex: 1
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
    marginHorizontal: 17
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
  headlineText: {
    paddingTop: 10,
    fontSize: 14,
    fontFamily: 'MontserratLight'
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
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#EE4296',
    paddingVertical: 10
    // width: width * 0.7
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
  },
  menuButton: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  }
})
