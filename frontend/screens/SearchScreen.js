import React, {useCallback, useMemo, useRef, useState} from 'react'
import { StyleSheet, Text, View, FlatList, Image, Button} from 'react-native'
import { SafeAreaView,  KeyboardAwareScrollView } from 'react-native-safe-area-context'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import BottomSheet from '@gorhom/bottom-sheet';
import searchStyles from '../styles/searchStyles'

import {
    BottomSheetModal,
    BottomSheetModalProvider,
  } from '@gorhom/bottom-sheet';
import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod';


const SearchScreen = () => {

    // ref
    const bottomSheetRef = useRef(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const [LocData,setLocData] = useState({})
    const [page, setPage] = useState('None')

    const handleClosePress = () => bottomSheetRef.current.snapTo(1);

    function datapage() {
        return (
            <View style={searchStyles.mainContainer}>
                <Image
                    source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${LocData.photos[0].photo_reference}&key=AIzaSyAoqlQ1Mipy61k3DhUoX6B5AikDWmS-3lI`}}
                    resizeMode="cover"
                    borderRadius={20}
                    style={searchStyles.headerimage}/>
                <Text style={searchStyles.headertitle}> {LocData.name} </Text>
                <View style={searchStyles.typeandreview}> 
                    <Text> {LocData.types[0]} & {LocData.types[1]} </Text>
                    <Text> {LocData.rating} </Text>
                </View>
            </View>
        );
    }

    function nonepage() {
        return (
            <View>
                <Text>
                    None        
                </Text>
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
                    snapPoints={['15%', '54%']}
                    index = {1}
                    onChange={handleSheetChanges}
                >
                    {page === 'None' && nonepage()} 
                    {page === 'Data' && datapage()}
                </BottomSheet>
            </SafeAreaView>
    )
}

export default SearchScreen
