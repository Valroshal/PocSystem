import * as React from 'react'
import { StyleSheet, View, Text } from "react-native";
import ProductItem from "../../details/ProductItem";
import { useCallback } from "react";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    gap: 10,
    backgroundColor: '#fff',
    width: '100%',
  },
  itemContainer: {
    backgroundColor: '#fff',
    width: '100%',
  },
})
const List = ({ products }) => {

  //console.log('products', products);
  const handleDelete = useCallback(() => {
    console.log('delete')
  }, [])

  const handleFavorite = useCallback(() => {

  }, [])

  if (!products) {
    return(
      <View>
        <Text>
          Product List is Empty
        </Text>
      </View>
    )
  }

  return(
    <View style={styles.container}>
      {products && products.map((item, index) => (
        <View style={styles.itemContainer} key={item.id}>
          <ProductItem
            product={item}
            onDelete={handleDelete}
            onFavorite={handleFavorite}
          />
        </View>
      ))}
    </View>
  )
}

export default List
