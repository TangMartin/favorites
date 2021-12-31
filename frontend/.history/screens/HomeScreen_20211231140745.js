import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth';

import loginStyles from '../styles/loginStyles'

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
