import axios from 'axios'

export const loginAPI = async (token) => {
  const res = await axios.post(
    'https://secondhandvinhome.herokuapp.com/api/auth/login',
    { token: 'Bearer ' + token },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return res.data
}