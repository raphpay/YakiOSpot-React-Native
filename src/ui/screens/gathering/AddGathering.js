import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

import AuthService from "../../../business-logic/authService";
import FirestoreService from "../../../business-logic/firestoreService";

function AddGathering() {

  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));

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
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert("Please enter a name for the gathering");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Gathering name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={'datetime'}
        is24Hour={true}
        onChange={onChange}
      />
      <TouchableOpacity onPress={saveGathering}>
        <Text>Save Gathering</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    marginHorizontal: 16,
  },
  input: {
    height: 44,
    width: "90%",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default AddGathering;