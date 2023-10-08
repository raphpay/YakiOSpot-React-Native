import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AuthService from "../../../business-logic/authService";
import FirestoreService from "../../../business-logic/firestoreService";

import Colors from "../../assets/colors/Colors";

function GatheringParticipationButton(props) {

  const { gathering } = props;

  const [isUserParticipating, setIsUserParticipating] = useState(false);

  async function participate() {
    const currentUser = AuthService.shared().currentUser().uid;
    if (isUserParticipating) {
      await FirestoreService.shared().addParticipantToGathering(gathering.id, currentUser);
      setIsUserParticipating(true);
    } else {
      await FirestoreService.shared().removeParticipantFromGathering(gathering.id, currentUser);
      setIsUserParticipating(false);
    }
  }

  useEffect(() => {
    const currentUser = AuthService.shared().currentUser().uid;
    const isUserIn = gathering.peopleUIDs.includes(currentUser);
    setIsUserParticipating(isUserIn);
  }, [gathering]);

  return (
    <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={participate}
          style={{...styles.button, backgroundColor: isUserParticipating ? 'red' : Colors.brownish}}
        >
          <Text style={styles.buttonText}>
            {isUserParticipating ? "I can't make it" : "I'm in !"}
          </Text>
        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    width: '80%',
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.6,
    shadowRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  }
});

export default GatheringParticipationButton;