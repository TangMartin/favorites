import React, {useCallback, useMemo, useRef } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { SafeAreaView, Flatlist, KeyboardAwareScrollView } from 'react-native-safe-area-context'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import BottomSheet from '@gorhom/bottom-sheet';
import searchStyles from '../styles/searchStyles'

import {
    BottomSheetModal,
    BottomSheetModalProvider,
  } from '@gorhom/bottom-sheet';

const SearchScreen = () => {

    // ref
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '45%'], ['75%']);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

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
                        // 'details' is provided when fetchDetails = true
                        console.log(details);
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
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                >
                    <View>
                        <Text>Awesome 🎉</Text>
                    </View>
                </BottomSheet>
            </SafeAreaView>
    )
}

export default SearchScreen
