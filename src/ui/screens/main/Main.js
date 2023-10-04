import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

import AuthService from "../../../business-logic/authService";

function Main(props) {

  const { navigation } = props;

  function goToAddGathering() {
    navigation.navigate('AddGathering');
  }

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
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={goToAddGathering}>
        <Text>Add Gathering</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logOut}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    marginHorizontal: 16,
  }
});

export default Main;