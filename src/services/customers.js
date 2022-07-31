import http from './api'
import { getUser } from '../helpers'

const getData = async (url, pagination) => {
  const { filter, limit, curPage: page } = pagination
  const response = await http.get(url, { params: { page, filter, limit } })
  return response.data
}

export const getCustomers = async (pagination) => {
  const data = await getData('customers', pagination)
  return data.customers
}

export const getInactiveCustomers = async (pagination) => {
  const data = await getData('customers/inactive', pagination)
  return data.customers
}

export const getDebtors = async (pagination) => {
  const data = await getData('customers/debtors', pagination)
  return data.debtors
}

export const getCustomer = async (id) => {
  const response = await http.get(`customers/${id}`)
  return response.data.customer
}

export const getDebt = async (id) => {
  const response = await http.get(`customers/debtors/${id}`)
  return response.data.debt
}

export const saveCustomer = (customer) => {
  const userId = getUser().id
  const url = customer.id ? `customers/${customer.id}` : 'customers'
  const payload = { ...customer, userId, id: undefined }
  return new Promise((resolve, reject) => {
    http
      .post(url, payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
}

export const deleteCustomer = (customer) =>
  new Promise((resolve, reject) => {
    const { id } = customer
    http
      .put(`customers/${id}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const restoreCustomer = (customer) =>
  new Promise((resolve, reject) => {
    const { id } = customer
    http
      .put(`customers/${id}/restore`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const destroyCustomer = (customer) =>
  new Promise((resolve, reject) => {
    const { id } = customer
    http
      .delete(`customers/${id}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
