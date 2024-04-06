import http from './api'

export const login = (user) =>
  new Promise((resolve, reject) => {
    http
      .post('users/login', user)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getUsers = async () => {
  const response = await http.get('users')
  return response.data
}
