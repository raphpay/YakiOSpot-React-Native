import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";

import auth from "@react-native-firebase/auth";

function Main() {

  function logOut() {
      auth()
        .signOut()
        .then(() => console.log('User signed out!'));
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