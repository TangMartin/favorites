import React, { useState} from 'react'
import { useNavigation } from '@react-navigation/core'
import {  KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import loginStyles from '../styles/loginStyles'
import auth from '@react-native-firebase/auth' 


const HomeScreen = () => {

    const navigation = useNavigation()

    const handlesignout = () => {
        auth()
            .signOut()
            .then (() => {
                navigation.navigate("Login")
            })
            .catch(error => alert(error.message))
    }

    return (
        <View style={loginStyles.buttonContainer}>
            <Text>Welcome {auth.currentUser?.email} </Text> 
            <TouchableOpacity
                style={[loginStyles.button, loginStyles.buttonOutline]}
                onPress = {handlesignout} >
                <Text style={loginStyles.buttonText}> Sign Out </Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({

    Text: {
        textAlign: 'center',

    }
})
