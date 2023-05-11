import * as axios from 'axios'

export const fetchProducts = async () => {
  try {
    const res = await axios.get('http://127.0.0.1:8000/get_products/')
    return res.data
  } catch (error) {
    return error.message
  }
}

export const updateProducts = async ( id, favorite) => {
  try {
    const res = await axios.put('http://127.0.0.1:8000/get_products/', {
      id:id,
      favorite:favorite
    })
    return res.data
  } catch (error) {
    return error.message
  }
}

export const userLogin = async (email, password) => {
  try {
    const res = await axios.post('http://127.0.0.1:8000/user/', {
      email: email,
      password: password
    })
    return res.data
  } catch (error) {
    return error.message
  }
}
