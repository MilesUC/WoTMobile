/* eslint-disable multiline-ternary */
import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import TextInProfileData from '../TextInProfileData'
import AddInformationAboutYou from './AddInformationAboutYou'

export default function AvailabilityInformation () {
  const { userData, userToken } = useSelector((state) => state.auth)
  const hasData = (userData.tipoJornada && userData.tipoJornada.tipoJornada) ||
                  (userData.tipoModalidad && userData.tipoModalidad.tipoModalidad) ||
                  userData.posibilidadCambiarseRegion ||
                  userData.disposicion_viajar !== false ||
                  (userData.disponibilidad && userData.disponibilidad[0] && userData.disponibilidad[0].disponibilidad)

  return (
    <>
    {(hasData)
      ? (
        <View>
          { (userData.tipoJornada && userData.tipoJornada.tipoJornada) ? <TextInProfileData title={'Jornada'} subtitle={userData.tipoJornada.tipoJornada} fieldName={'id_jornada'} userToken={userToken} menuToEdit={'EditAvailabilityInformation'}/> : null }
          { (userData.tipoModalidad && userData.tipoModalidad.tipoModalidad) ? <TextInProfileData title={'Modalidad'} subtitle={userData.tipoModalidad.tipoModalidad} fieldName={'id_modalidad'} userToken={userToken} menuToEdit={'EditAvailabilityInformation'}/> : null }
          { (userData.posibilidadCambiarseRegion) ? <TextInProfileData title={userData.posibilidadCambiarseRegion.posibilidad === 'Si ' ? 'Tiene la posibilidad de cambiar de región.' : 'No es posible un cambio de región.'} subtitle={''} fieldName={'id_posibilidad_cambiarse_region'} userToken={userToken} menuToEdit={'EditAvailabilityInformation'}/> : null }
          { (userData.disposicion_viajar !== null) ? <TextInProfileData title={ userData.disposicion_viajar ? 'Tiene la disposición de viajar para asistir a un nuevo cargo.' : 'No puede viajar para asistir a un nuevo cargo.'} subtitle={''} fieldName={'disposicion_viajar'} userToken={userToken} menuToEdit={'EditAvailabilityInformation'}/> : null }
          { (userData.disponibilidad && userData.disponibilidad[0] && userData.disponibilidad[0].disponibilidad) ? <TextInProfileData title={'Disponibilidad'} subtitle={userData.disponibilidad[0].disponibilidad} fieldName={'disponibilidad'} userToken={userToken} menuToEdit={'EditAvailabilityInformation'}/> : null }
        </View>
        ) : (
          <AddInformationAboutYou nextScreen={'EditAvailabilityInformation'}/>
        )
    }
    </>
  )
}
/* eslint-enable multiline-ternary */
