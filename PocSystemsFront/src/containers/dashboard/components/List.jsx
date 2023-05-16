import * as React from 'react'
import { StyleSheet, View, Text, ScrollView } from "react-native"
import ProductItem from "../../details/ProductItem"

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
const List = ({ products, onFavorite, onDelete }) => {

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
        <ScrollView contentContainerStyle={{flex: 1}}>
          {products && products.map((item, index) => (
            <View style={styles.itemContainer} key={item.id}>
              <ProductItem
                product={item}
                onDelete={onDelete}
                onFavorite={onFavorite}
              />
            </View>
          ))}
        </ScrollView>
      </View>

  )
}

export default List
