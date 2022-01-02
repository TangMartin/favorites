import React, { useState} from 'react'
import { useNavigation } from '@react-navigation/core'
import {  KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image,} from 'react-native'
import { Icon, Button, Container, Header, Content, Left } from 'native-base'
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
        <MapView style={{flex: 1}} provider={PROVIDER_GOOGLE} />
    )
}
