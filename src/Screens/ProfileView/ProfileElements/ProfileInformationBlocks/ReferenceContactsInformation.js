import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import TextInProfileData from '../TextInProfileData'
import AddInformationAboutYou from './AddInformationAboutYou'

/* eslint-disable camelcase */
export default function ReferenceContactsInformation () {
  const { userData, userToken } = useSelector((state) => state.auth)
  console.log(`Contactos: ${JSON.stringify(userData.contactos_verificacion)}`)
  return (
    <>
      { (userData.contactos_verificacion.length > 0)
        ? (
          <View>
            { (userData.contactos_verificacion[0]?.nombre) ? <TextInProfileData title={'Nombre del primer contacto'} subtitle={userData.contactos_verificacion[0].nombre} fieldName={'contactos_verificacion'} userToken={userToken} menuToEdit={'EditReferenceContactsInformation'}/> : null }
            { (userData.contactos_verificacion[0]?.email) ? <TextInProfileData title={'Correo electrónico del primer contacto'} subtitle={userData.contactos_verificacion[0].email} fieldName={'contactos_verificacion'} userToken={userToken} menuToEdit={'EditReferenceContactsInformation'}/> : null }
            { (userData.contactos_verificacion[0]?.telefono) ? <TextInProfileData title={'Número de teléfono del primer contacto'} subtitle={userData.contactos_verificacion[0].telefono} fieldName={'contactos_verificacion'} userToken={userToken} menuToEdit={'EditReferenceContactsInformation'}/> : null }
            { (userData.contactos_verificacion[1]?.nombre) ? <TextInProfileData title={'Nombre del segundo contacto'} subtitle={userData.contactos_verificacion[1].nombre} fieldName={'contactos_verificacion'} userToken={userToken} menuToEdit={'EditReferenceContactsInformation'}/> : null }
            { (userData.contactos_verificacion[1]?.email) ? <TextInProfileData title={'Correo electrónico del segundo contacto'} subtitle={userData.contactos_verificacion[1].email} fieldName={'contactos_verificacion'} userToken={userToken} menuToEdit={'EditReferenceContactsInformation'}/> : null }
            { (userData.contactos_verificacion[1]?.telefono) ? <TextInProfileData title={'Número de teléfono del segundo contacto'} subtitle={userData.contactos_verificacion[1].telefono} fieldName={'contactos_verificacion'} userToken={userToken} menuToEdit={'EditReferenceContactsInformation'}/> : null }
            { (userData.contactos_verificacion[2]?.nombre) ? <TextInProfileData title={'Nombre del tercer contacto'} subtitle={userData.contactos_verificacion[2].nombre} fieldName={'contactos_verificacion'} userToken={userToken} menuToEdit={'EditReferenceContactsInformation'}/> : null }
            { (userData.contactos_verificacion[2]?.email) ? <TextInProfileData title={'Correo electrónico del tercer contacto'} subtitle={userData.contactos_verificacion[2].email} fieldName={'contactos_verificacion'} userToken={userToken} menuToEdit={'EditReferenceContactsInformation'}/> : null }
            { (userData.contactos_verificacion[2]?.telefono) ? <TextInProfileData title={'Número de teléfono del tercer contacto'} subtitle={userData.contactos_verificacion[2].telefono} fieldName={'contactos_verificacion'} userToken={userToken} menuToEdit={'EditReferenceContactsInformation'}/> : null }
          </View>
          )
        : (
          <AddInformationAboutYou nextScreen={'EditReferenceContactsInformation'}/>
          )
      }
      </>
  )
}
/* eslint-enable camelcase */
