import http from './api'

export const savePayment = (payment) =>
  new Promise((resolve, reject) => {
    http
      .post('accounts', payment)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
