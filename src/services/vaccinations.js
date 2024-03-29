import http from './api'
import { getUser } from '../helpers'

export const getVaccinations = async (pagination) => {
  const { filter, limit, curPage } = pagination
  const response = await http.get(
    `vaccinations?filter=${filter}&page=${curPage}&limit=${limit}`
  )
  return response.data.vaccinations
}

export const getInactiveVaccinations = async (pagination) => {
  const { filter, limit, curPage } = pagination
  const response = await http.get(
    `vaccinations/inactive?filter=${filter}&page=${curPage}&limit=${limit}`
  )
  return response.data.vaccinations
}

export const getProgrammedVisits = async () => {
  const response = await http.get('vaccinations/programmed-visits')
  return response.data.vaccinations
}

export const getProgrammedVisitsByPeriod = async (startDate, endDate) => {
  const response = await http.get(
    `vaccinations/programmed-visits-by-period?startDate=${startDate}&endDate=${endDate}`
  )
  return response.data.vaccinations
}

export const getVaccinationsByPet = async (id) => {
  const response = await http.get(`vaccinations/by-pet/${id}`)
  return response.data.vaccinations
}

export const saveVaccination = (vaccination) => {
  const userId = getUser().id
  const url = vaccination.id ? `vaccinations/${vaccination.id}` : 'vaccinations'
  const payload = { ...vaccination, userId, id: undefined }
  return new Promise((resolve, reject) => {
    http
      .post(url, payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
}

export const getVaccination = async (id) => {
  const response = await http.get(`vaccinations/${id}`)
  return response.data.vaccination
}

export const deleteVaccination = (vaccination) =>
  new Promise((resolve, reject) => {
    const { id } = vaccination
    http
      .put(`vaccinations/${id}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const restoreVaccination = (vaccination) =>
  new Promise((resolve, reject) => {
    const { id } = vaccination
    http
      .put(`vaccinations/${id}/restore`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const destroyVaccination = (vaccination) =>
  new Promise((resolve, reject) => {
    const { id } = vaccination
    http
      .delete(`vaccinations/${id}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
