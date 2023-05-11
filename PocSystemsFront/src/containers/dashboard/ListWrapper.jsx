import * as React from 'react'
import { StyleSheet, Text, View } from "react-native";
import List from "./components/List";
import ListButton from "./components/ListButton";
import { useCallback, useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import { useNavigation } from "@react-navigation/native";
import { fetchProducts } from "../../api/productApi";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    padding: 20,
    flex: 1,
  },
})

const products1 = [
  {
    id: 1,
    name: 'broccoli',
    description: 'food',
    price: 10.99, //decimal ?
    quantity: 5,
    favorite: true
  },
  {
    id: 2,
    name: 'milk',
    description: 'food',
    price: 10.99, //decimal ?
    quantity: 5,
    favorite: true
  },
  {
    id: 3,
    name: 'materna',
    description: 'baby',
    price: 10.99, //decimal ?
    quantity: 5,
    favorite: false
  },
  ]
const ListWrapper = () => {

  // const  navigation  = useNavigation()
  const [filteredProducts, setFilteredProducts] = useState(products1)


  useEffect(() => {
    console.log('in list wrapper')
    const pr = fetchProducts().then()
    //console.log('pr', pr);
    //setFilteredProducts(pr)
  }, [])

  const handleAddButton = useCallback(() => {
    console.log('add item')
  }, [])

  const handleSearch = useCallback((text) => {
    let products = products1.filter(item => {
      return item.name.includes(text)
    })
    setFilteredProducts(products)
  }, [setFilteredProducts])

  if (filteredProducts.length < 1) {

  }

  return(
    <View style={styles.container}>
      <SearchBar onSearch={(text) => handleSearch(text)}/>
      <List products={products1}/>
    </View>
  )
}

export default ListWrapper
