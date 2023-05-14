import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity } from "react-native"

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    borderRadius: 8,
    backgroundColor: '#FFDEA8',
    minWidth: 100
  },
  disabled: {

  },
  text: {
    fontSize: 28,
    color: '#000'
  }
})
const LoginButton = ({onPressButton, isDisabled}) => {

  return(
    <TouchableOpacity
      disabled={isDisabled}
      style={isDisabled ?[styles.container, { backgroundColor: '#D9D9D9' }] : styles.container}
      onPress={onPressButton}
    >
      <Text style={[styles.text]}>
        Login
      </Text>
    </TouchableOpacity>
  )
}

export default LoginButton
