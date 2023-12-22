const { EXPO_PUBLIC_API_URL } = require('./constants')

export const ENDPOINTS = {
  countries: `${EXPO_PUBLIC_API_URL}/obtener_listas/paises`,
  regions: `${EXPO_PUBLIC_API_URL}/obtener_listas/regiones`,
  professions: `${EXPO_PUBLIC_API_URL}/obtener_listas/profesiones`,
  universities: `${EXPO_PUBLIC_API_URL}/obtener_listas/universidades`,
  roles: `${EXPO_PUBLIC_API_URL}/obtener_listas/cargos`,
  industries: `${EXPO_PUBLIC_API_URL}/obtener_listas/industrias`,
  competencies: `${EXPO_PUBLIC_API_URL}/obtener_listas/competencias`,
  areas: `${EXPO_PUBLIC_API_URL}/obtener_listas/areas`,
  years_of_experience: `${EXPO_PUBLIC_API_URL}/obtener_listas/anios_experiencia`,
  availabilities: `${EXPO_PUBLIC_API_URL}/obtener_listas/disponibilidades`,
  workdays: `${EXPO_PUBLIC_API_URL}/obtener_listas/jornadas`,
  modalities: `${EXPO_PUBLIC_API_URL}/obtener_listas/modalidades`,
  languages: `${EXPO_PUBLIC_API_URL}/obtener_listas/idiomas`,
  personalityTestResults: `${EXPO_PUBLIC_API_URL}/obtener_listas/formularios`,
  wayOfKnowingWot: `${EXPO_PUBLIC_API_URL}/obtener_listas/conocio_wot`
}
