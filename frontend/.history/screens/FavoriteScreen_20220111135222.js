import React, { useState, Component, useEffect} from 'react'
import { useNavigation } from '@react-navigation/core'
import {  KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ShadowPropTypesIOS, Button} from 'react-native'
import { Icon, Container, Header, Content, Left } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native';

import { NavigationEvents } from "react-navigation";

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';




export default function FavoriteScreen () {

    state = {

    }

    userData = async () => {
        const user = auth().currentUser;
        var userRef = firestore().collection('favoritelist').doc(user.uid).collection(user.uid);
        
        const markers = [];
            await firestore().collection('favoritelist').doc(user.uid).collection(user.uid).get()
              .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                markers.push(doc.data());
              });});
              this.setState({markers});
              
              //console.log(this.state.markers)
              //console.log(this.state.markers[0].lat) 
              
    };
              
              //console.log(this.state.markers)
              //console.log(this.state.markers[0].lat) 
    
    return (
        <View>
            <Text></Text>
        </View>
    )
}