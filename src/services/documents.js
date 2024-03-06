import docs from './docs-api'
import api from './api'
import { getUser } from '../helpers'

export const uploadDocument = (formData) =>
  docs.post('additional-tests', formData)

export const deleteFile = (document) =>
  docs.delete(`additional-tests/${document}`)

export const getDocuments = async (pagination) => {
  const { filter, limit, curPage } = pagination
  const response = await api.get(
    `documents?filter=${filter}&page=${curPage}&limit=${limit}`
  )
  return response.data.documents
}

export const saveDocument = (pet) => {
  const user = getUser()
  const userId = user.id
  const url = pet.id ? `documents/${pet.id}` : 'documents'
  const payload = { ...pet, userId, id: undefined }
  return new Promise((resolve, reject) => {
    api
      .post(url, payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
}

export const getDocument = async (id) => {
  const response = await api.get(`documents/${id}`)
  return response.data.document
}

export const getDocumentsByPet = async (id) => {
  const response = await api.get(`documents/by-pet/${id}`)
  return response.data.documents
}

export const deleteDocument = (document) =>
  new Promise((resolve, reject) => {
    const { id } = document
    api
      .delete(`documents/${id}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
