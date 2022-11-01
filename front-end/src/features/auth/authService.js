//* HTTP requests file
import axios from 'axios'

const API_URL = 'http://localhost:3001/api/v1/user/'

//*Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  console.log(response.data)
  return response.data
}

/* //*Logout user
const logout = () => {
  localStorage.removeItem('user')
} */

const authService = {
  login,
  // logout,
}

export default authService
