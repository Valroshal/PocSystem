import * as React from 'react'
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Search from '../../../assets/images/search.png'
import { useState } from "react";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingLeft: 10,
    width: '90%',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000'
  },
  input: {
    flex: 1,
    paddingVertical: 8,
  },
  button: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
});

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('')

  const handleSearch = () => {
    console.log('handle search', typeof searchText)
    onSearch(searchText)
  }

  return(
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by product name..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Image source={Search} style={{width: 24, height: 24}}/>
      </TouchableOpacity>
    </View>
  )
}
export default SearchBar
