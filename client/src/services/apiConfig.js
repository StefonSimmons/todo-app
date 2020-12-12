import axios from 'axios'

const expressAPI = process.env.NODE_ENV === "development" ? 'http://localhost:3000' : 'https://will-do-express.herokuapp.com/'

// Creating a new instance of axios that will set the baseURL for requests/responses to be PORT 3000
export const api = axios.create({
  baseURL: expressAPI
})
