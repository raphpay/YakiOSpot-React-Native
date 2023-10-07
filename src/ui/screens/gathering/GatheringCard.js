import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import FirestoreService from "../../../business-logic/firestoreService";
import AuthService from "../../../business-logic/authService";
import Utils from "../../../business-logic/utils";

import PillView from "../../components/PillView";
import Label from "../../components/Label";
import ProfilePictures from "../../components/ProfilePictures";

import Colors from "../../assets/colors/Colors";

function GatheringCard(props) {

  const { gathering, navigation } = props;

  const [ownerName, setOwnerName] = useState("");
  const [currentUserID, setCurrentUserID] = useState("");
  const [showParticipationButton, setShowParticipationButton] = useState(false);

  async function convertOwnerIDToName(ownerID) {
    const user = await FirestoreService.shared().retrieveUserFromUID(ownerID);
    setOwnerName(user.pseudo);
  }

  function compareOwnerIDToCurrentUser() {
    const currentUser = AuthService.shared().currentUser();
    setCurrentUserID(currentUser.uid);
    setShowParticipationButton(currentUserID !== gathering.ownerID);
  }

  function goToDetails() {
    const dateAsString = gathering.date.toISOString();
    const serializableGathering = {
      ...gathering,
      date: dateAsString,
    }
    navigation.navigate('GatheringDetails', {
      gathering: serializableGathering,
    });
  }

  async function participate() {
    await FirestoreService.shared().addParticipantToGathering(gathering.id, currentUserID);
  }

  useEffect(() => {
    async function init() {
      await convertOwnerIDToName(gathering.ownerID);
      compareOwnerIDToCurrentUser();
    }
    init();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={goToDetails}>
      <View style={{...styles.container, backgroundColor: Colors.blueish }}>
        <View style={styles.textsContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{gathering.name}</Text>
            <PillView text={ownerName} backgroundColor={Colors.greenish}/>
          </View>
          <View style={styles.timeContainer}>
            <Label icon={require('../../assets/icons/clock.badge.png')} text={Utils.formatDate(gathering.date)}/>
            <Label icon={require('../../assets/icons/calendar.png')} text={Utils.formatTime(gathering.date)}/>
            <ProfilePictures />
          </View>
        </View>
        { showParticipationButton && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{...styles.button, backgroundColor: Colors.brownish}}
              onPress={participate}
            >
              <Text style={styles.buttonText}>I'm in</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  textsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleContainer: {
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    paddingBottom: 10,
    paddingLeft: 5,
  },
  owner: {
    fontSize: 14,
  },
  profilePictures: {
    paddingRight: 10,
  },
  buttonContainer: {
    alignItems: "center",
    paddingTop: 15,
  },
  timeContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingTop: 10,
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

export default GatheringCard;