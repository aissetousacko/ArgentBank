//* HTTP requests file
import axios from 'axios'

const API_URL = 'http://localhost:3001/api/v1/user/'

//*Login user
const login = async (userData) => {
  //we're getting the email and the password
  const response = await axios.post(API_URL + 'login', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  console.log(response.data)
  return response.data
}

//*User data
const profile = async (userData, token) => {
  // configure authorization header with user's token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL + 'profile', userData, config)

  console.log(response.data.body)
  return response.data.body
}

//*Update user's data
const updateData = async (newData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return await axios
    .put(API_URL + 'profile', newData, config)
    .then((res) => {
      //return new firstnam and lastname
      console.log(res.data.body)
      return res.data.body
    })
    .catch((error) => console.log(error))
}

const authService = {
  login,
  profile,
  updateData,
}

export default authService
