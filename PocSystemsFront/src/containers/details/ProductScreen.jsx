import * as React from 'react'
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import Star from "../../assets/images/star.png";
import ItemButton from "./components/ItemButton";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    //justifyContent: "flex-start",
    //alignItems: "flex-start",
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    gap: 20,
    position: "relative"
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 52,
    color: '#000',
  },
  description: {
    fontSize: 40,
    color: '#808080'
  },
  price: {
    fontSize: 22,
    color: '#0E86D4',
  },
  quantity: {
    fontSize: 22,
    color: '#808080',
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 10
  },
  image: {
    height: 24,
    width: 24,
    marginLeft: 5
  },
  deleteBtn: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 25
  },
})
const ProductScreen = ({product, isOpen, onFavorite, onClose, onDelete}) => {

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isOpen}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{product?.name}</Text>
          {product?.favorite === true ?
            <Image source={Star} style={styles.image} />
            : null
          }
        </View>
        <Text style={styles.description}>{product?.description}</Text>
        <Text style={styles.price}>Price: {product?.price}</Text>
        <Text style={styles.quantity}>In stock: {product?.quantity} items</Text>
        <View style={styles.buttonContainer}>
          <ItemButton
            name={ product?.favorite ? 'Remove Favorite' : 'Add Favorite' }
            onPressButton={onFavorite}
          />
          <ItemButton
            name={'Close'}
            onPressButton={onClose}
          />
        </View>
        <View style={styles.deleteBtn}>
          <ItemButton
            name={'Delete'}
            color={'red'}
            onPressButton={onDelete}
          />
        </View>
      </View>
    </Modal>
  )
}

export default ProductScreen
