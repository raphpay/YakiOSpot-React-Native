import React, { useEffect, useState } from "react";
import { 
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { useSelector } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';

import AuthService from "../../../business-logic/authService";

import BackgroundImage from "../../components/BackgroundImage";
import TopBarNav from "../../components/TopBarNav";
import ImageButton from "../../components/ImageButton";
import GatheringParticipationButton from "./GatheringParticipationButton";

function AddGathering(props) {

  const { gatherings } = useSelector(state => state.event);

  const { navigation, route } = props;
  const { index } = route.params;

  const [showParticipationButton, setShowParticipationButton] = useState(false);

  function compareOwnerIDToCurrentUser() {
    const currentUser = AuthService.shared().currentUser();
    setShowParticipationButton(currentUser.uid !== gatherings[index]?.ownerID);
  }

  useEffect(() => {
    compareOwnerIDToCurrentUser();
  }, []);

  const backButton = () => {
    return (
      <ImageButton 
        source={require('../../assets/icons/arrow.left.circle.png')}
        size={30}
        onPress={() => navigation.goBack()}
      />
    )
  }

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
                    {gatherings[index]?.name}
                  </Text>
                  <Text>{gatherings[index]?.description}</Text>
                  <DateTimePicker
                    value={new Date(gatherings[index]?.date)}
                    mode={'date'}
                    is24Hour={true}
                    accentColor="black"
                    disabled={true}
                  />
                 
                  <DateTimePicker
                    value={new Date(gatherings[index]?.date)}
                    mode={'time'}
                    is24Hour={true}
                    disabled={true}
                  />
                </View>
              </View>
              { showParticipationButton && (
                <GatheringParticipationButton index={index} />
              )}
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