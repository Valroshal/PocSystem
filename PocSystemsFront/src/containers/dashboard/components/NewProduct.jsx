// import * as React from 'react'
// import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
// import { useState } from "react"
//
// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: '#fff',
//     height: '100%',
//     flex: 1,
//     padding: 10,
//     gap: 20
//   },
//   input: {
//     flex: 1,
//     paddingVertical: 8,
//     borderColor: '#000',
//     borderWidth: 1,
//     borderRadius: 8
//   },
//   button: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     height: 48,
//     borderRadius: 8,
//     backgroundColor: '#FFDEA8',
//     minWidth: 100
//   },
//   buttonContainer: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     gap: 10,
//     paddingVertical: 10
//   },
//   subHeader: {
//     fontSize: 20,
//     color: '#000',
//   }
// });
//
// const NewProduct = () => {
//   const [name, setName] = useState('')
//   const [description, setDescription] = useState('')
//   const [price, setPrice] = useState('')
//   const [quantity, setQuantity] = useState('')
//
//   const handleAddItem = () => {
//     const item = {
//       name: name,
//       description: description,
//       price: price,
//       quantity: quantity,
//       favorite: false
//     }
//     //onAdd(item)
//   }
//
//   const handleCancel = () => {
//     // navigation.goBack()
//   }
//
//   return(
//     <View style={styles.container}>
//       <Text style={{fontSize: 32, color: '#000'}}>Add Product</Text>
//       <View>
//         <Text style={styles.subHeader}>Add the name of the product here</Text>
//         <TextInput
//           style={styles.input}
//           placeholder='name'
//           value={name}
//           onChangeText={setName}
//         />
//       </View>
//       <View>
//         <Text style={styles.subHeader}>Add the description of the product here</Text>
//         <TextInput
//           multiline = {true}
//           numberOfLines = {4}
//           style={styles.input}
//           placeholder='description'
//           value={description}
//           onChangeText={setDescription}
//         />
//       </View>
//       <View>
//         <Text style={styles.subHeader}>Add the price of the product here</Text>
//         <TextInput
//           style={styles.input}
//           placeholder='price'
//           value={price}
//           onChangeText={setPrice}
//         />
//       </View>
//       <View>
//         <Text style={styles.subHeader}>Add the quantity of the product here</Text>
//         <TextInput
//           style={styles.input}
//           placeholder='quantity'
//           value={quantity}
//           onChangeText={setQuantity}
//         />
//       </View>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={handleAddItem}>
//           <Text>Add</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={handleCancel}>
//           <Text>Cancel</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }
//
// export default NewProduct
