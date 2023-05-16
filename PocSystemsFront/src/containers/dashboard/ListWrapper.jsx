import * as React from 'react'
import { ScrollView, StyleSheet, View } from "react-native";
import List from "./components/List";
import { useCallback, useEffect, useState } from "react"
import SearchBar from "./components/SearchBar"
import { fetchProducts } from "../../api/productApi"

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

const ListWrapper = () => {
  const [initialProducts, setInitialProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])


  useEffect( () => {
    handleFetchProducts().then()
  }, [])

  const handleFetchProducts = async () => {
    const pr = await fetchProducts()
    setInitialProducts(pr)
    setFilteredProducts(pr)
  }

  const handleFavorite = useCallback(() => {
    handleFetchProducts().then()
  }, [])

  const handleSearch = useCallback((text) => {
    if (text === '') {
      setFilteredProducts(initialProducts)
    }
    let products = filteredProducts.filter(item => {
      return item.name.includes(text)
    })
    setFilteredProducts(products)
  }, [filteredProducts, initialProducts])

  const handleDelete = useCallback(() => {
    handleFetchProducts().then()
  }, [])


  if (filteredProducts.length < 1) { //TODO return text empty list
    return null
  }

  return(
    <View style={styles.container}>
      <SearchBar onSearch={(text) => handleSearch(text)}/>
      <List products={filteredProducts} onFavorite={handleFavorite} onDelete={handleDelete}/>
    </View>
  )
}

export default ListWrapper
