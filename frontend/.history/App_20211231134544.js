import React, {useState, useEffect, useRef, useMemo} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import auth from '@react-native-firebase/auth';
import { firebase } from './firebase'

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';



const Onboard = createNativeStackNavigator();
const Main = createNativeStackNavigator(); 

export default function App() {
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
          <Onboard.Navigator>
            <Onboard.Screen options={{ headerShown: false }}name="Login" component={LoginScreen} />
            <Onboard.Screen name="Home" component={HomeScreen} />
          </Onboard.Navigator>
        </NavigationContainer>
      );
    }
  
    return (
      <NavigationContainer>
          <Main.Navigator>
            <Main.Screen options={{ headerShown: false }}name="Home" component={HomeScreen} />
          </Main.Navigator>
      </NavigationContainer>
    );
}
