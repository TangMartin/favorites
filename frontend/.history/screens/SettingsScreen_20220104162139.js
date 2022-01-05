import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SettingsScreen = () => {
    const user = auth().currentUser;

    const handlesignout = () => {
        auth()
            .signOut()

            .catch(error => alert(error.message))
    }

    return (
        <View style={loginStyles.buttonContainer}>
            <Text>Welcome {user.email} </Text> 
            <TouchableOpacity
                style={[loginStyles.button, loginStyles.buttonOutline]}
                onPress = {handlesignout}>
                <Text style={loginStyles.buttonText}> Sign Out </Text>
            </TouchableOpacity>
        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({})
