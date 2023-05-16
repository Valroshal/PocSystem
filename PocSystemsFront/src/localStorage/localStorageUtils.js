import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios"
import * as consts from "../consts/consts";
export const saveTokenToStorage = async (token) => {
  try {
    await AsyncStorage.setItem('token', token)
    console.log('Token saved to local storage')
  } catch (error) {
    console.log('Failed to save token to local storage:', error)
  }
}

export const retrieveTokenFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      const isValid = await checkTokenValidity(token)
      if (isValid === consts.SUCCESS) {
        console.log('Token retrieved from local storage:', token)
        return isValid
      } else {
        console.log('Token not valid')
        return null
      }
    } else {
      console.log('No token found in local storage')
      return null
    }
  } catch (error) {
    console.log('Failed to retrieve token from local storage:', error)
    return null
  }
}

const checkTokenValidity = async (token) => {
  try {
    const response = await axios.get('http://10.100.102.16:8000/validate_token/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status
  } catch (error) {
    throw error
  }
}



