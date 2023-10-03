import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";

import AuthService from "../../../business-logic/authService";

function Main() {

  function logOut() {
    AuthService.shared()
        .logout()
        .then(() => console.log('User signed out!'))
        .catch(errorMessage => {
          Alert.alert('Error during logout', errorMessage, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        });
  }

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={logOut}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Main;