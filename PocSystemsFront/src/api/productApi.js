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
    const url = consts.MY_IP + '/get_products/'
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    return error.message
  }
}

export const updateProducts = async ( id, favorite) => {
  try {
    const url = consts.MY_IP + '/update_product/'
    const res = await axios.put(url, {
      id:id,
      favorite:favorite
    })
    return res.status
  } catch (error) {
    return error.message
  }
}

export const deleteProduct = async (id) => {
  const url = consts.MY_IP + `/delete_product/${id}`
  try {
    const res = await axios.delete(url)
    return res.status
  } catch (error) {
    return error.message
  }
}
