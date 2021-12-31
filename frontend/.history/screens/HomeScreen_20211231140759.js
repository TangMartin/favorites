import React, { useState} from 'react'
import {  KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import loginStyles from '../styles/loginStyles'
import auth from '@react-native-firebase/auth' 


    const signout = () => 
    {
        
    }

const HomeScreen = () => {
    return (
        <View style={loginStyles.buttonContainer}>
            <Text>Welcome {auth.currentUser?.email} </Text> 
            <TouchableOpacity
                style={[loginStyles.button, loginStyles.buttonOutline]}
                onPress = {handlesignup} >
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
