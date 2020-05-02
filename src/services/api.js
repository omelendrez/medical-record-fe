import axios from 'axios'

export default axios.create({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  baseURL: 'https://vmr.herokuapp.com/api'
})