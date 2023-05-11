import * as React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    borderRadius: 8,
    backgroundColor: '#FFDEA8',
    minWidth: 100,
    padding: 12
  },
  text: {
    fontSize: 16
  }
})

const ItemButton = ({ onPressButton, name = '', color = '#000', disabled = false }) => {

  return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPressButton}
        disabled={disabled}
      >
        <Text style={[styles.text, {color: color}]}>
          {name}
        </Text>
      </TouchableOpacity>
  )
}

export default ItemButton


