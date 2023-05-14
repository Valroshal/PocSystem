import axios from 'axios'
import fetch from 'isomorphic-fetch';

export const userLogin = async (username, password) => {
  const data = JSON.stringify({
    username,
    password,
  })

  const url = 'http://127.0.0.1:8000/user/'
  const mockUrl = 'http://localhost:8000/get_products/'
  return await fetch(mockUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      //body: data,
    }
  )
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
};

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

// export const userLogin = async (username, password) => {
//   try {
//     console.log(typeof axios)
//     const res = await axios.post('http://127.0.0.1:8000/user/',
//       {
//         username: username,
//         password: password
//       },
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     )
//
//     return res.data
//   } catch (error) {
//     return error.message
//   }
// }
