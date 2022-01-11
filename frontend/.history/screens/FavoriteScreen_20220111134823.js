import React, { useState, Component, useEffect} from 'react'
import { useNavigation } from '@react-navigation/core'
import {  KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ShadowPropTypesIOS, Button} from 'react-native'
import { Icon, Container, Header, Content, Left } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native';

import { NavigationEvents } from "react-navigation";

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';



const FavoriteScreen = () => {

        const [data, SetData] = useState({})

        const user = auth().currentUser;
        
        const markers = [];
            firestore().collection('favoritelist').doc(user.uid).collection(user.uid).get()
              .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                markers.push(doc.data());
              });});
              SetData({markers});
              
              //console.log(this.state.markers)
              //console.log(this.state.markers[0].lat) 

    return (
        <View>
            <Text>Hello</Text>
        </View>
    )
}

export default FavoriteScreen

const styles = StyleSheet.create({})
