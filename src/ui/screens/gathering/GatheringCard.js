import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import FirestoreService from "../../../business-logic/firestoreService";
import AuthService from "../../../business-logic/authService";
import Utils from "../../../business-logic/utils";

import PillView from "../../components/PillView";
import Label from "../../components/Label";
import ProfilePictures from "../../components/ProfilePictures";

import Colors from "../../assets/colors/Colors";
import GatheringParticipationButton from "./GatheringParticipationButton";

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
          <GatheringParticipationButton gathering={gathering}/>
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
  timeContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingTop: 10,
  },
});

export default GatheringCard;