export function DetermineIfUserDataIsComplete (userData) {
  const exceptions = [
    'postgrado',
    'empresa_adicional',
    'aditionalCargo',
    'aditionalIndustria',
    'nombrePuebloOriginario',
    'regionCompromiso',
    'factor',
    'idiomas',
    'contactos_verificacion',
    'regionActualDomicilio'
  ]
  let completedFields = 0
  const totalFields = Object.keys(userData)
    .filter(key => !exceptions.includes(key))
    .reduce((total, key) => {
      total += 1
      if (userData[key] !== null && userData[key] !== '' && !(Array.isArray(userData[key]) && userData[key].length === 0)) {
        completedFields += 1
      }
      return total
    }, 0)

  const percentage = (completedFields / totalFields) * 100
  console.log(`El porcentaje es ${percentage}`)
  const response = { percentageOfUserDataCompletion: percentage }

  if (percentage === 100) {
    response.isUserDataComplete = true
    return response
  } else {
    response.isUserDataComplete = false
    return response
  }
}
