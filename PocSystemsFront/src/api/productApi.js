import axios from "axios"
import { saveTokenToStorage } from "../localStorage/localStorageUtils"
import * as consts from "../consts/consts";

export const userLogin = async (username, password) => {
  const data = JSON.stringify({
    username,
    password,
  })

  const url = 'http://10.100.102.16:8000/user/'

  try {
    const res = await axios.post(url, data)
    if (res.status === consts.SUCCESS) {
      await saveTokenToStorage(res.data.token)
    }
    return res.data.token
  } catch (error) {
    return error.message
  }
}


export const fetchProducts = async () => {
  try {
    const res = await axios.get('http://10.100.102.16:8000/get_products/')
    return res.data
  } catch (error) {
    return error.message
  }
}

export const updateProducts = async ( id, favorite) => {
  try {
    const res = await axios.put('http://10.100.102.16:8000/update_product/', {
      id:id,
      favorite:favorite
    })
    return res.status
  } catch (error) {
    return error.message
  }
}

export const deleteProduct = async (id) => {
  console.log('id', id)

  try {
    const res = await axios.delete(`http://10.100.102.16:8000/delete_product/${id}`)
    return res.status
  } catch (error) {
    return error.message
  }
}
