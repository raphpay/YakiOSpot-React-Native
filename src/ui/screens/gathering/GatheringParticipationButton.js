import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import AuthService from "../../../business-logic/authService";
import FirestoreService from "../../../business-logic/firestoreService";

import Colors from "../../assets/colors/Colors";

function GatheringParticipationButton(props) {

  const { gatherings } = useSelector(state => state.event);
  const dispatch = useDispatch();

  const { index } = props;

  const [isUserParticipating, setIsUserParticipating] = useState(false);

  async function participate() {
    const currentUser = AuthService.shared().currentUser().uid;
    const gathering = gatherings[index];
    const isOwner = currentUser === gathering.ownerID;
    var newPeopleUIDs = [];
    if (isUserParticipating && !isOwner) {
      await FirestoreService.shared().addParticipantToGathering(gathering.id, currentUser);
      setIsUserParticipating(true);
      newPeopleUIDs = [...gathering.peopleUIDs, currentUser];
    } else {
      await FirestoreService.shared().removeParticipantFromGathering(gathering.id, currentUser);
      setIsUserParticipating(false);
      newPeopleUIDs = gathering.peopleUIDs.filter(uid => uid !== currentUser);
    }
    const newGathering = {
      ...gathering,
      peopleUIDs: newPeopleUIDs,
    }
    dispatch({type: 'event/modifyGatheringAtIndex', payload: {index, newGathering}});
  }

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