import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FirestoreService from "../../../business-logic/firestoreService";

function GatheringCard(props) {

  const { gathering } = props;

  const [ownerName, setOwnerName] = useState("");

  function convertOwnerIDToName(ownerID) {
    FirestoreService.shared().retrieveUserFromUID(ownerID)
    .then((user) => {
      console.log(user);
      setOwnerName(user.pseudo);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    convertOwnerIDToName(gathering.ownerID);
  }, []);

  return (
    <View>
      <Text>{gathering.name}</Text>
      <Text>{gathering.date.toString()}</Text>
      <Text>{ownerName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
});

export default GatheringCard;