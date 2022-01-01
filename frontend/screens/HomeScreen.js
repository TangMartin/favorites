import React, { useState} from 'react'
import { useNavigation } from '@react-navigation/core'
import {  KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


import globalStyles from '../styles/globalStyles'
import loginStyles from '../styles/loginStyles'
import homeStyles from '../styles/homeStyles'

import auth from '@react-native-firebase/auth' 
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"


export default function HomeScreen ({navigation}) {

    const user = auth().currentUser;

    const handlesignout = () => {
        auth()
            .signOut()

            .catch(error => alert(error.message))
    }

    return (
        <SafeAreaView>
            <View style={globalStyles.headercontainer}>
                <TouchableOpacity 
                    style ={{
                        marginLeft: "6%",
                    }}>
                    <Image
                        source={require('../assets/images/more.png')}
                        style={{
                            height: 25,
                            width: 25,
                            resizeMode: 'contain',
                        }}
                    />
                </TouchableOpacity>
                <Text> Favorite </Text>
                <TouchableOpacity
                    style ={{
                        marginRight: "6%",
                    }}>
                    <Image
                        source={require('../assets/images/search.png')}
                        style={{
                            height: 28,
                            width: 28,
                            resizeMode: 'contain',
                        }}
                    />
                </TouchableOpacity>
            </View> 
            <View>
                <MapView style={{flex: 1}} provider={PROVIDER_GOOGLE} />
            </View>
        </SafeAreaView>
    )
}
