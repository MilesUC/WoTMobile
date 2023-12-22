/* eslint-disable multiline-ternary */
import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import TextInProfileData from '../TextInProfileData'
import AddInformationAboutYou from './AddInformationAboutYou'

export default function WorkInformation () {
  const { userData, userToken } = useSelector((state) => state.auth)
  const hasData = userData.cargo || userData.empresa_actual || userData.industria || userData.aditionalCargo || userData.empresa_adicional || userData.aditionalIndustria

  return (
    <>
    {(hasData)
      ? (
      <View>
        { (userData.cargo) ? <TextInProfileData title={'Cargo principal'} subtitle={userData.cargo.cargo} fieldName={'id_cargo'} userToken={userToken} menuToEdit={'EditWorkInformation'}/> : null }
        { (userData.empresa_actual) ? <TextInProfileData title={'Empresa'} subtitle={userData.empresa_actual} fieldName={'empresa_actual'} userToken={userToken} menuToEdit={'EditWorkInformation'}/> : null }
        { (userData.industria) ? <TextInProfileData title={'Industria'} subtitle={ userData.industria.nombre_industria } fieldName={'id_industria_actual'} userToken={userToken} menuToEdit={'EditWorkInformation'}/> : null }
        { (userData.aditionalCargo) ? <TextInProfileData title={'Cargo secundario'} subtitle={ userData.aditionalCargo.cargo } fieldName={'id_cargo_adicional'} userToken={userToken} menuToEdit={'EditWorkInformation'}/> : null }
        { (userData.empresa_adicional) ? <TextInProfileData title={'Empresa del cargo secundario'} subtitle={ userData.empresa_adicional } fieldName={'empresa_adicional'} userToken={userToken} menuToEdit={'EditWorkInformation'}/> : null }
        { (userData.aditionalIndustria) ? <TextInProfileData title={'Industria del cargo secundario'} subtitle={ userData.aditionalIndustria.nombre_industria } fieldName={'industria_adicional'} userToken={userToken} menuToEdit={'EditWorkInformation'}/> : null }
      </View>
        ) : (
        <AddInformationAboutYou nextScreen={'EditWorkInformation'}/>
        )
    }
    </>
  )
}
/* eslint-enable multiline-ternary */
