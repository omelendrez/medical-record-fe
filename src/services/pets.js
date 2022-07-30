import http from './api'
import { getUser } from '../helpers'

export const getPets = async (pagination) => {
  const { filter, limit, curPage } = pagination
  const response = await http.get(
    `pets?filter=${filter}&page=${curPage}&limit=${limit}`
  )
  return response.data.pets
}

export const getInactivePets = async (pagination) => {
  const { filter, limit, curPage } = pagination
  const response = await http.get(
    `pets/inactive?filter=${filter}&page=${curPage}&limit=${limit}`
  )
  return response.data.pets
}

export const getPet = async (id) => {
  const response = await http.get(`pets/${id}`)
  return response.data.pet
}

export const savePet = (pet) => {
  const userId = getUser().id
  return new Promise((resolve, reject) => {
    http
      .post('pets', { ...pet, userId })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
}

export const deletePet = (pet) =>
  new Promise((resolve, reject) => {
    const { id } = pet
    http
      .put(`pets/${id}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const restorePet = (pet) =>
  new Promise((resolve, reject) => {
    const { id } = pet
    http
      .put(`pets/${id}/restore`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const destroyPet = (pet) =>
  new Promise((resolve, reject) => {
    const { id } = pet
    http
      .delete(`pets/${id}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
