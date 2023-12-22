/* eslint-disable multiline-ternary */
import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import TextInProfileData from '../TextInProfileData'
import AddInformationAboutYou from './AddInformationAboutYou'

export default function AdditionalInformation () {
  const { userData, userToken } = useSelector((state) => state.auth)
  const hasData = (userData.idiomas && userData.idiomas[0]?.nombre) ||
                  (userData.regionCompromiso && userData.regionCompromiso.nombre) ||
                  userData.personalidad ||
                  userData.factor ||
                  userData.nombrePuebloOriginario ||
                  userData.redesSociales ||
                  userData.conocioWot

  return (
    <>
    {(hasData)
      ? (
    <View>
        { (userData.idiomas && userData.idiomas[0]?.nombre) ? <TextInProfileData title={'Idioma que maneja con nivel medio-avanzado'} subtitle={userData.idiomas[0].nombre} fieldName={'idiomas'} userToken={userToken} menuToEdit={'EditAdditionalInformation'}/> : null }
        { (userData.regionCompromiso && userData.regionCompromiso.nombre) ? <TextInProfileData title={'Región en la que tiene compromiso'} subtitle={userData.regionCompromiso.nombre} fieldName={'id_region_con_compromiso'} userToken={userToken} menuToEdit={'EditAdditionalInformation'}/> : null }
        { (userData.personalidad) ? <TextInProfileData title={'Resultado del test de personalidad'} subtitle={userData.personalidad.personalidad} fieldName={'id_personalidad'} userToken={userToken} menuToEdit={'EditAdditionalInformation'}/> : null }
        { (userData.factor) ? <TextInProfileData title={'Factor de inclusión'} subtitle={userData.factor} fieldName={'factor'} userToken={userToken} menuToEdit={'EditAdditionalInformation'}/> : null }
        { (userData.nombrePuebloOriginario) ? <TextInProfileData title={'Pueblo originario con el que se identifica'} subtitle={userData.nombrePuebloOriginario} fieldName={'nombrePuebloOriginario'} userToken={userToken} menuToEdit={'EditAdditionalInformation'}/> : null }
        { (userData.redesSociales) ? <TextInProfileData title={'Red social que comparte'} subtitle={userData.redesSociales} fieldName={'redesSociales'} userToken={userToken} menuToEdit={'EditAdditionalInformation'}/> : null }
        { (userData.conocioWot) ? <TextInProfileData title={'¿Cómo conoció Wot?'} subtitle={userData.conocioWot.conocio} fieldName={'id_conocio_wot'} userToken={userToken} menuToEdit={'EditAdditionalInformation'}/> : null }
    </View>
        ) : (
          <AddInformationAboutYou nextScreen={'EditAdditionalInformation'}/>
        )
    }
    </>
  )
}
/* eslint-enable multiline-ternary */
