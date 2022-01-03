import React, {useState, useEffect, useRef, useMemo} from 'react';
import { View, Text, Button, Image, TouchableOpacity, DrawerActions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { navigationRef } from './RootNavigation';

import auth from '@react-native-firebase/auth';
import { firebase } from './firebase'


import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import RestaurantsScreen from './screens/RestaurantsScreen'
import { DrawerContent } from './screens/DrawerContent';

import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import Icon from 'react-native-ionicons';



const SettingStack = createNativeStackNavigator();
function SettingScreens() {
  return (
    <SettingStack.Navigator
      initialRouteName="Setting"
      screenOptions={{
        headerShown: false,
      }}>
      <SettingStack.Screen name="Setting" component={Setting} />
    </SettingStack.Navigator>
  );
}

const FavouriteStack = createNativeStackNavigator();
function FavouriteScreens() {
  return (
    <FavouriteStack.Navigator
      initialRouteName="Favourite"
      screenOptions={{
        headerShown: false,
      }}>
      <FavouriteStack.Screen name="Favourite" component={Favourite} />
    </FavouriteStack.Navigator>
  );
}

const SearchStack = createNativeStackNavigator();
function SearchScreens() {
  return (
    <SearchStack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: false,
      }}>
      <SearchStack.Screen name="Search" 
        options={({ navigation }) => ({
                    headerStyle: {
                      backgroundColor: '#FFFFFF',
                    },
                    headerLeft: () => (
                      <TouchableOpacity 
                        style ={{
                            marginLeft: "14%",}}
                        onPress={() => {navigation.pop()}}>
                        <Image
                            source={require('./assets/images/more.png')}
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                            }}
                        />
                      </TouchableOpacity>
                    ),
                    headerTitle: () => ( <Text style = {{fontSize: 18}}> Favorites </Text> ),
                    })
                }
                component={SearchScreen} />
    </SearchStack.Navigator>
  );
}

const Drawer = createDrawerNavigator();
const OnboardStack = createNativeStackNavigator();

const MainStack = createDrawerNavigator();
const MainStackScreen = () => (
  <MainStack.Navigator
    initialRouteName="Home">
    <MainStack.Screen name="Home" options={{headerShown: false,
    
  
      drawerIcon: () => (
        <Image
            source={require('./assets/images/more.png')}
            style={{
              height: 22,
              width: 22,
              resizeMode: 'contain',
            }}
        />
      ),}} component={HomeScreen}/>
    <MainStack.Screen name="Setting" component = {SettingScreens}/>
    <MainStack.Screen name="Favourites" component = {FavouriteScreens}/>
  </MainStack.Navigator>
)

export default function App ({ navigation }) {

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;
  
    if (!user) {
      return (
        <NavigationContainer>
          <OnboardStack.Navigator
              initialRouteName="Login"
              options={{ headerShown: false 
              }}>
              <OnboardStack.Screen name="Login" component = {LoginScreen}/>
          </OnboardStack.Navigator>
        </NavigationContainer>
      );
    }
      
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Main">
              <Drawer.Screen name="Main"  
                options={({ navigation }) => ({
                    headerStyle: {
                      backgroundColor: '#FFFFFF',
                    },
                    headerLeft: () => (
                      <TouchableOpacity 
                        style ={{
                            marginLeft: "14%",}}
                        onPress={() => {navigation.toggleDrawer()}}>
                        <Image
                            source={require('./assets/images/more.png')}
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                            }}
                        />
                      </TouchableOpacity>
                    ),
                    headerTitle: () => ( <Text style = {{fontSize: 18}}> Favorites </Text> ),
                    headerRight: () => (
                      <TouchableOpacity
                        style ={{
                            marginRight: "14%",
                        }}
                        onPress={() => {navigation.navigate('Search')}}>
                        <Image
                            source={require('./assets/images/search.png')}
                            style={{
                                height: 22,
                                width: 22,
                                resizeMode: 'contain',
                            }}
                        />
                      </TouchableOpacity>
                    ),
                  })}
                component={MainStackScreen} />
              <Drawer.Screen name="Search" component = {SearchScreens} />
            </Drawer.Navigator>
        </NavigationContainer>

    );

}