/* eslint-disable multiline-ternary */
import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import TextInProfileData from '../TextInProfileData'
import AddInformationAboutYou from './AddInformationAboutYou'

export default function EducationalInformation () {
  const { userData, userToken } = useSelector((state) => state.auth)
  const hasData = userData.profesion[0]?.length > 0 || userData.universidad || userData.postgrado || userData.profesion[1]?.length > 0

  return (
    <>
      {(hasData)
        ? (
          <View>
            { (userData.profesion && userData.profesion[0]) ? <TextInProfileData title={'Profesión principal'} subtitle={userData.profesion[0].nombre} fieldName={'profesiones'} userToken={userToken} menuToEdit={'EditEducationalInformation'}/> : null }
            { (userData.universidad) ? <TextInProfileData title={'Universidad'} subtitle={userData.universidad} fieldName={'universidad'} userToken={userToken} menuToEdit={'EditEducationalInformation'}/> : null }
            { (userData.profesion && userData.profesion[1]) ? <TextInProfileData title={'Profesión secundaria'} subtitle={ userData.profesion[1].nombre } fieldName={'profesiones'} userToken={userToken} menuToEdit={'EditEducationalInformation'}/> : null }
            { (userData.postgrado) ? <TextInProfileData title={'Postgrado'} subtitle={ userData.postgrado } fieldName={'postgrado'} userToken={userToken} menuToEdit={'EditEducationalInformation'}/> : null }
          </View>
          ) : (
            <AddInformationAboutYou nextScreen={'EditEducationalInformation'}/>
          )
      }
    </>
  )
}
/* eslint-enable multiline-ternary */
