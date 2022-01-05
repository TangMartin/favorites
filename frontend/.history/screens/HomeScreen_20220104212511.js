import React, { useState, Component, useEffect} from 'react'
import { useNavigation } from '@react-navigation/core'
import {  KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ShadowPropTypesIOS,} from 'react-native'
import { Icon, Button, Container, Header, Content, Left } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native';

import { NavigationEvents } from "react-navigation";

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import globalStyles from '../styles/globalStyles'
import loginStyles from '../styles/loginStyles'
import homeStyles from '../styles/homeStyles'

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
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

      constructor(props) {
        super(props);
        this.state = {
        };
      }

    render() {

      const user = auth().currentUser;

      const mapRegion = {latitude: 	37.782822, longitude: -122.4067605}

      const userData = async () => {
        const user = auth().currentUser;
        var userRef = firestore().collection('users').doc(user.uid).collection(user.uid);
        
          try {
            var doc = await userRef.get();
            if (doc.exists) {
              console.log(doc.data()); // Prints Perfectly
              return doc.data();
            } else {
              console.log('No such document!');
            }
          } catch (error) {
            console.log('Error getting document:', error);
          }
        };

        const data = userData()

        return (
          <View>
            <Text>
                Hello
            </Text>
          </View>
          /*
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
              <Marker coordinate={mapRegion} title='Marker' />
            </MapView>
          */
            
        )
        
    }
    
}
