import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const SearchScreen = () => {
    return (
        <GooglePlacesAutocomplete
        placeholder='Search'
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: 'AIzaSyAoqlQ1Mipy61k3DhUoX6B5AikDWmS-3lI',
          language: 'en',
        }}
      />
    )
}

export default SearchScreen

const styles = StyleSheet.create({})
