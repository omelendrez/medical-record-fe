import http from './api'

const getData = async (url, pagination) => {
  const { filter, limit, curPage: page } = pagination
  const response = await http.get(url, { params: { page, filter, limit } })
  return response.data
}

export const getAppointments = async (pagination) => {
  const data = await getData('appointments', pagination)
  return data.appointments
}
