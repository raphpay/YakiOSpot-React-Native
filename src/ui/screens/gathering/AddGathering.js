import React, { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

import AuthService from "../../../business-logic/authService";
import FirestoreService from "../../../business-logic/firestoreService";

import BackgroundImage from "../../components/BackgroundImage";
import TopBarNav from "../../components/TopBarNav";
import ImageButton from "../../components/ImageButton";
import Colors from "../../assets/colors/Colors";

function AddGathering(props) {

  const { navigation } = props;

  const [name, onChangeName] = useState("");
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    console.log(currentDate);
  };

  function saveGathering() {
    if (name !== "") {
      const user = AuthService.shared().currentUser();
      FirestoreService.shared()
        .createGathering(user.uid, name, date)
        .then(() => {
          console.log("Gathering created");
          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert("Please enter a name for the gathering");
    }
  }

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
                    Create a new event:
                  </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeName}
                    value={name}
                    placeholder='Event Name'
                    autoCapitalize='none'
                    autoCorrect={false}
                  />
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    onChange={onChange}
                    accentColor="black"
                    minimumDate={new Date()}
                  />
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'time'}
                    is24Hour={true}
                    onChange={onChange}
                    minimumDate={new Date()}
                  />
                </View>
                <TouchableOpacity
                  style={{...styles.saveButton, backgroundColor: isFormValid ? Colors.brownish : 'gray' }}
                  onPress={saveGathering}
                >
                  <Text style={styles.saveButtonTitle}>
                    Save Gathering
                  </Text>
                </TouchableOpacity>
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