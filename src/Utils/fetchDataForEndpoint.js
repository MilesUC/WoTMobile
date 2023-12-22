import { ENDPOINTS } from './endpointsConfig'

export const fetchDataForEndpoint = async (endpoint, transformFunction) => {
  return await fetch(ENDPOINTS[endpoint])
    .then(response => response.json())
    .then(data => transformFunction(data))
    .catch(error => {
      console.log(error.message)
      throw error
    })
}
