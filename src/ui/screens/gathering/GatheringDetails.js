import React, { useEffect, useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

import AuthService from "../../../business-logic/authService";
import FirestoreService from "../../../business-logic/firestoreService";

import BackgroundImage from "../../components/BackgroundImage";
import TopBarNav from "../../components/TopBarNav";
import ImageButton from "../../components/ImageButton";
import Colors from "../../assets/colors/Colors";

function AddGathering(props) {

  const { navigation, route } = props;
  const { gathering } = route.params;

  const [name, onChangeName] = useState("");
  const [description, onChangeDescription] = useState("");
  const [date, setDate] = useState(new Date(gathering.date));

  useEffect(() => {
    console.log(gathering);
  }, [gathering]);

  const backButton = () => {
    return (
      <ImageButton 
        source={require('../../assets/icons/arrow.left.circle.png')}
        size={30}
        onPress={() => navigation.goBack()}
      />
    )
  }

  const isFormValid = name !== "";

  const mainContent = () => {
    return (
      <SafeAreaView style={styles.upTopContainer}>
        <KeyboardAvoidingView style={styles.upTopContainer}>
          <TouchableWithoutFeedback style={styles.upTopContainer} onPress={Keyboard.dismiss}>
            <View style={styles.upTopContainer}>
              <TopBarNav 
                leftComponent={backButton()}
              />
              <View style={styles.container}>
                <View style={styles.inputContainer}>
                  <Text style={styles.title}>
                    {gathering.name}
                  </Text>
                  <Text>{gathering.description}</Text>
                  <DateTimePicker
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    accentColor="black"
                    disabled={true}
                  />
                  <DateTimePicker
                    value={date}
                    mode={'time'}
                    is24Hour={true}
                    disabled={true}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }

  return (
    <BackgroundImage
      x={require("../../assets/images/background/add-gathering-background.png")}
      content={mainContent()}
    />
  )
}

const styles = StyleSheet.create({
  upTopContainer: {
    flex: 1,
  },
  container : {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  inputContainer: {},
  input: {
    height: 44,
    width: "100%",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: 10,
  },
  saveButton: {
    height: 46,
    width: "100%",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonTitle: {
    fontWeight: '500',
    fontSize: 16,
    color: 'white',
  }
});

export default AddGathering;