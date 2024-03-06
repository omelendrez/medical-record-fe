import axios from 'axios'

export default axios.create({
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  baseURL: process.env.REACT_APP_DOCUMENTS_URL
})
