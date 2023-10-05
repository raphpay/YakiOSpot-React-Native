import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AuthService from "../../../business-logic/authService";
import FirestoreService from "../../../business-logic/firestoreService";
import BackgroundImage from "../../components/BackgroundImage";
import TopBarNav from "../../components/TopBarNav";
import ImageButton from "../../components/ImageButton";

import Colors from "../../assets/colors/Colors";

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

  useEffect(() => {
    FirestoreService.shared().readGatherings();
  }, []);

  const searchButton = () => {
    return (
      <View style={{...styles.circle, backgroundColor: Colors.brownish}}>
        <ImageButton 
          source={require('../../assets/icons/magnifyingglass-white.png')}
          size={20}
        />
      </View>
    )
  }

  const profileButton = () => {
    return (
      <View style={{...styles.circle, backgroundColor: Colors.brownish}}>
        <ImageButton 
          source={require('../../assets/icons/person.fill-white.png')}
          size={20}
        />
      </View>
    )
  }

  const mainContent = () => {
    return (
      <SafeAreaView style={styles.container}>
        <TopBarNav 
          leftComponent={searchButton()}
          rightComponent={profileButton()}
        />
        <ScrollView>
          <Text>Hello</Text>
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <BackgroundImage
      image={require('../../assets/images/background/main-background.png')}
      content={mainContent()}
    />
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    marginHorizontal: 16,
  },
  circle: {
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.6,
    shadowRadius: 5,
  }
});

export default Main;