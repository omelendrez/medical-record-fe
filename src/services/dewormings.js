import http from './api'
import { getUser } from '../helpers'

export const getDewormings = async (pagination) => {
  const { filter, limit, curPage } = pagination
  const response = await http.get(
    `dewormings?filter=${filter}&page=${curPage}&limit=${limit}`
  )
  return response.data.dewormings
}

export const getInactiveDewormings = async (pagination) => {
  const { filter, limit, curPage } = pagination
  const response = await http.get(
    `dewormings/inactive?filter=${filter}&page=${curPage}&limit=${limit}`
  )
  return response.data.dewormings
}

export const getProgrammedVisits = async () => {
  const response = await http.get('dewormings/programmed-visits')
  return response.data.dewormings
}

export const getProgrammedVisitsByPeriod = async (startDate, endDate) => {
  const response = await http.get(
    `dewormings/programmed-visits-by-period?startDate=${startDate}&endDate=${endDate}`
  )
  return response.data.dewormings
}

export const getDewormingsByPet = async (id) => {
  const response = await http.get(`dewormings/by-pet/${id}`)
  return response.data.dewormings
}

export const saveDeworming = (deworming) => {
  const userId = getUser().id
  const url = deworming.id ? `dewormings/${deworming.id}` : 'dewormings'
  const payload = { ...deworming, userId, id: undefined }
  return new Promise((resolve, reject) => {
    http
      .post(url, payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
}

export const getDeworming = async (id) => {
  const response = await http.get(`dewormings/${id}`)
  return response.data.deworming
}

export const deleteDeworming = (deworming) =>
  new Promise((resolve, reject) => {
    const { id } = deworming
    http
      .put(`dewormings/${id}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const restoreDeworming = (deworming) =>
  new Promise((resolve, reject) => {
    const { id } = deworming
    http
      .put(`dewormings/${id}/restore`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const destroyDeworming = (deworming) =>
  new Promise((resolve, reject) => {
    const { id } = deworming
    http
      .delete(`dewormings/${id}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
