import React, {useCallback, useMemo, useRef, useState} from 'react'
import { StyleSheet, Text, View, FlatList, Image, Button, Linking, TouchableOpacity} from 'react-native'
import { SafeAreaView,  KeyboardAwareScrollView } from 'react-native-safe-area-context'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { ScrollView } from 'react-native-gesture-handler'

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import searchStyles from '../styles/searchStyles'

import StarRating from 'react-native-star-rating'

import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod';


const SearchScreen = () => {

    const user = auth().currentUser;
    // ref
    const bottomSheetRef = useRef(null);

    const [image, setImage] = useState()

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const [LocData,setLocData] = useState({})
    const [page, setPage] = useState('None')

    const handleClosePress = () => bottomSheetRef.current.snapTo(1);

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const d = new Date();

    function Capitalize(str){
        str = str.charAt(0).toUpperCase() + str.slice(1);
        str = str.replaceAll('_', ' ');
        var str = str.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());

        return str;
    }

    function datapage() {
        return (
            <ScrollView style={searchStyles.mainContainer}>
                <Image
                    source={ 
                    typeof(LocData.photos) !== "undefined"
                    ? {uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${LocData.photos[0].photo_reference}&key=AIzaSyAoqlQ1Mipy61k3DhUoX6B5AikDWmS-3lI`}
                    : require('../assets/images/placeholder.png')
                    }
                    resizeMode="cover"
                    borderRadius={20}
                    style={searchStyles.headerimage}
                />
                <Text style={searchStyles.headertitle}>{LocData.name}</Text>
                <View style={searchStyles.typeandreview}> 
                    <Text style={searchStyles.type}>{Capitalize(LocData.types[0])}</Text>
                        <View style={{flexDirection: 'row', paddingTop: 2, paddingLeft:5,}}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={LocData.rating}
                                starSize={16}
                                starStyle={{
                                    paddingHorizontal: 1,
                                }}
                            />
                            <Text style={{marginLeft: 5,}}> {LocData.rating}</Text>
                        </View>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 20, width: '90%'}}>
                    <Image
                        source={require('../assets/images/location.png')}
                        style={{
                            marginRight:10,
                            height: 20,
                            width: 20,
                            resizeMode: 'contain',
                        }}
                    />
                    <Text>{LocData?.formatted_address}</Text>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 15}}>
                    <Image
                        source={require('../assets/images/hours.png')}
                        style={{
                            marginRight:10,
                            height: 20,
                            width: 20,
                            resizeMode: 'contain',
                        }}
                    />
                    <Text>{typeof(LocData.opening_hours) !== "undefined" ? LocData?.opening_hours.weekday_text[d.getDay() - 1] :'No Hours'}</Text>
                </View>
                <View style={{flexDirection: 'row-reverse', paddingTop: 20, paddingLeft: 5, paddingRight: 10, alignItems:'flex-end'}}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#989898',
                            width: '180%',
                            alignSelf: 'center',
                            height: 50,
                            width: 50,
                            borderRadius: 45,
                            justifyContent: 'center',
                            marginLeft: 20,}}
                        onPress={ () => {
                            console.log('button works')
                        }}>
                        <Image
                            source={require('../assets/images/googlemaps.png')}
                            style= {{
                                height: 20,
                                width: 20,
                                alignSelf: 'center',
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{
                            backgroundColor: '#989898',
                            width: '44%',
                            alignSelf: 'center',
                            height: 50,
                            borderRadius: 29,
                            justifyContent: 'center',}}
                        onPress={ () => {
                            if(LocData.photos != "undefined")
                            {
                                setImage(LocData.photos[0].photo_reference)
                            }
                            else
                            {   
                                setImage('nothing')
                            }
                            firestore()
                                .collection('favoritelist')
                                .doc(user.uid)
                                .collection(user.uid)
                                .add({
                                    locationid: LocData.reference,
                                    locationname: LocData.name,
                                    lat: LocData.geometry.location['lat'],
                                    lng: LocData.geometry.location['lng'],
                                    testcoordinate: "lattitude:" + LocData.geometry.location['lat'] + ", longtitude:" + LocData.geometry.location['lng'],
                                    image: image,
                                    types: LocData.types,
                                    createdAt: firestore.FieldValue.serverTimestamp(),
                                })
                                .then(() => {
                                    console.log('User added!');
                                });
                        }}
                    >
                        <Text
                            style={{
                            color: 'white',
                            alignSelf: 'center',
                            fontSize: 16,
                            fontWeight: '700',
                            }}>
                            Add to Favorites
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    function nonepage() {
        return (
            <View>
                <Text>Nothing</Text>
            </View>
            
        )
    }

    return (
            <SafeAreaView style={{flex: 1}}>
                <GooglePlacesAutocomplete
                    styles={searchStyles}
                    placeholder='Restaurants, Landmarks, Parks'
                    minLength={2}
                    currentLocation={true}
                    currentLocationLabel="Current Location"
                    fetchDetails={true}
                    enableHighAccuracyLocation={true}
                    onPress={(data, details = null) => {
                        setLocData(details);
                        setPage('Data');
                        console.log(LocData)
                    }}
                    query={{
                        key: 'AIzaSyAoqlQ1Mipy61k3DhUoX6B5AikDWmS-3lI',
                        language: 'en',
                    }}
                    GooglePlacesDetailsQuery={{
                        rankby: 'distance'}}
                />
                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={['60%', '80%']}
                    index = {0}
                    onChange={handleSheetChanges}
                >
                    {page === 'None' && nonepage()} 
                    {page === 'Data' && datapage()}
                </BottomSheet>
            </SafeAreaView>
    )
}

export default SearchScreen
