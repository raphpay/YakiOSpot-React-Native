import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import Login from '../screens/authentication/Login';
import SignUp from '../screens/authentication/SignUp';

import Main from '../screens/main/MainScreen';
import AddGathering from '../screens/gathering/AddGathering';

const Stack = createNativeStackNavigator();

function Navigation() {
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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          user ? (
            <>
              <Stack.Screen
                name="Main"
                component={Main}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddGathering"
                component={AddGathering}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
              />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
