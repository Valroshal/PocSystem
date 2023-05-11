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
    borderColor: '#000',
    borderWidth: 1,
    width: '90%'
  },
  text: {
    fontSize: 22,
    color: '#000'
  }
})

const ListButton = ({ onPressButton, name }) => {

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPressButton}
    >
      <Text style={styles.text}>
        {name}
      </Text>
    </TouchableOpacity>
  )
}

export default ListButton
