import React, { useState, Component } from 'react'
import { useNavigation } from '@react-navigation/core'
import {  KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image,} from 'react-native'
import { Icon, Button, Container, Header, Content, Left } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import globalStyles from '../styles/globalStyles'
import loginStyles from '../styles/loginStyles'
import homeStyles from '../styles/homeStyles'

import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import mapStyle from '../components/mapStyle.json'
import Geolocation from '@react-native-community/geolocation';
import GetLocation from 'react-native-get-location'


export default class HomeScreen extends Component {

    state = {
        regionSet: false,
      }

      willFocus = this.props.navigation.addListener(
        'willFocus',
        payload => {
          this.forceUpdate();
        }
      );
      
      componentDidMount() {
        Geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            const region = {
              ...this.state.region,
              latitude,
              longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }
            this.setState({ region, regionSet: true })
          })
      }
      
      onRegionChange = (region) => {
        if (!this.state.regionSet) return;
        this.setState({
          region
        });
      }

    render() {

     const user = auth().currentUser;

      firestore()
        .collection('favoritelist')
        .doc(user.uid)
        .collection(user.uid)
        .get()
        .then(querySnapshot => {
          console.log('Total users: ', querySnapshot.size);

          querySnapshot.forEach(documentSnapshot => {
            console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
          });
        });

        return (
            <MapView
                style={{flex: 1}} 
                provider={PROVIDER_GOOGLE} 
                customMapStyle={mapStyle}
                zoomEnabled={true}
                showsUserLocation
                followsUserLocation={true}
                showsMyLocationButton={true}
                initialRegion={this.state.region}
            >

            </MapView>
        )
        
    }
    
}
