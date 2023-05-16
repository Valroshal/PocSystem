import * as React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import ItemButton from "./components/ItemButton";
import Star from '../../assets/images/star.png'
import { useCallback, useState } from "react";
import ProductScreen from "./ProductScreen";
import { deleteProduct, fetchProducts, updateProducts } from "../../api/productApi";
import * as consts from "../../consts/consts";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    color: '#000',
  },
  description: {
    fontSize: 22,
    color: '#808080'
  },
  image: {
    height: 24,
    width: 24,
    marginLeft: 5
  },
})

const ProductItem = ({ product, onDelete, onFavorite }) => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleFavorite = useCallback(async () => {
    const favorite = !product.favorite
    updateProducts(product.id, favorite).then(res => {
      if (res === consts.SUCCESS) {
        onFavorite()
      }
    })
  }, [onFavorite, product.favorite, product.id])

  const handleDelete = useCallback(async () => {
    deleteProduct(product.id).then(res => {
      if (res === consts.SUCCESS) {
        onDelete()
      }
    })
  }, [onDelete, product.id])

  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }

  return(
    <TouchableOpacity
      style={styles.container}
      key={product?.id}
      onPress={toggleModal}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{product?.name}</Text>
        {product?.favorite ?
          <Image source={Star} style={styles.image} />
          : null
        }
      </View>
      <Text style={styles.description}>{product?.description}</Text>
      <ItemButton
        name={'Delete Item'}
        color={'red'}
        onPressButton={handleDelete}
      />
      <ProductScreen
        product={product}
        isOpen={modalVisible}
        onDelete={onDelete}
        onFavorite={handleFavorite}
        onClose={toggleModal}
      />
    </TouchableOpacity>
  )
}

export default ProductItem
