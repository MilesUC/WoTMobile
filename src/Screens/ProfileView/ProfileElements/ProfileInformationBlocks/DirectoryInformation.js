/* eslint-disable multiline-ternary */
import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import TextInProfileData from '../TextInProfileData'
import AddInformationAboutYou from './AddInformationAboutYou'

const industryNames = (industries) => industries.map(industria => industria.nombre_industria).join(', ')
const areaNames = (areas) => areas.map(area => area.nombre).join(', ')
const proficiencyNames = (proficiency) => proficiency.map(proficiency => proficiency.competencia).join(', ')

export default function DirectoryInformation () {
  const { userData, userToken } = useSelector((state) => state.auth)
  const hasData = userData.aniosExperiencia || userData.experienciaDirectorios !== null || userData.altaDireccion !== null || userData.areas.length > 0 || userData.industrias.length > 0 || userData.competencia.length > 0

  return (
    <>
    {(hasData)
      ? (
        <View>
        { (userData.aniosExperiencia && userData.aniosExperiencia.id) ? <TextInProfileData title={'Años de experiencia'} subtitle={`Entre ${userData.aniosExperiencia.rango_experiencia_desde} y ${userData.aniosExperiencia.rango_experiencia_hasta} años`} fieldName={'id_anios_experiencia'} userToken={userToken} menuToEdit={'EditDirectoryInformation'}/> : null }
        { (userData.experienciaDirectorios !== null) ? <TextInProfileData title={ userData.experienciaDirectorios ? 'Sí tiene experiencia en directorios.' : 'No tiene experiencia en directorios.'} subtitle={''} fieldName={'experienciaDirectorios'} userToken={userToken} menuToEdit={'EditDirectoryInformation'}/> : null }
        { (userData.altaDireccion !== null) ? <TextInProfileData title={ userData.altaDireccion ? 'Tiene formación en alta dirección.' : 'No tiene formación en alta dirección.'} subtitle={''} fieldName={'altaDireccion'} userToken={userToken} menuToEdit={'EditDirectoryInformation'}/> : null }
        { (userData.areas.length > 0) ? <TextInProfileData title={'Áreas en las que tiene experiencia'} subtitle={ areaNames(userData.areas) } fieldName={'areasExperiencia'} userToken={userToken} menuToEdit={'EditDirectoryInformation'}/> : null }
        { (userData.industrias.length > 0) ? <TextInProfileData title={'Industrias en las que tiene experiencia'} subtitle={ industryNames(userData.industrias) } fieldName={'industriasExperiencia'} userToken={userToken} menuToEdit={'EditDirectoryInformation'}/> : null }
        { (userData.competencia.length > 0) ? <TextInProfileData title={'Competencias'} subtitle={ proficiencyNames(userData.competencia) } fieldName={'competencias'} userToken={userToken} menuToEdit={'EditDirectoryInformation'}/> : null }
        </View>
        ) : (
          <AddInformationAboutYou nextScreen={'EditDirectoryInformation'}/>
        )
      }
    </>
  )
}
/* eslint-enable multiline-ternary */
