import React from "react";
import { SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity } from "react-native";

import AuthService from "../../../business-logic/authService";

function Profile() {

  function logOut() {
    AuthService.shared().logout();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>
        Profile
      </Text>
      <TouchableOpacity onPress={logOut}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
});

export default Profile;