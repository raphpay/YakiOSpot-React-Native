import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import FirestoreService from "../../../business-logic/firestoreService";

import BackgroundImage from "../../components/BackgroundImage";
import TopBarNav from "../../components/TopBarNav";
import ImageButton from "../../components/ImageButton";

import Colors from "../../assets/colors/Colors";
import GatheringCard from "../gathering/GatheringCard";

function Main(props) {

  const { navigation } = props;

  const { gatherings } = useSelector(state => state.event);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  function goToAddGathering() {
    navigation.navigate('AddGathering');
  }

  function goToProfile() {
    navigation.navigate('Profile');
  }

  async function onRefresh() {
    setRefreshing(true);
    await readGatherings();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

  async function readGatherings() {
    const firestoreGatherings = await FirestoreService.shared().readGatherings();
    dispatch({type: 'event/setGatherings', payload: firestoreGatherings});
  }

  useEffect(() => {
    navigation.addListener('focus', async () => {
      await readGatherings();
    });
  }, [navigation]);
  
  const isNoEvents = gatherings.length === 0;

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
          onPress={goToProfile}
        />
      </View>
    )
  }

  const noEventContent = () => {
    return (
      <Text style={styles.noEventText}>
        No events registered yet
      </Text>
    );
  }

  const eventList = () => {
    return (
      <View>
        {gatherings.map((gathering, index) => {
          return (
            <GatheringCard 
              key={index}
              index={index}
              navigation={navigation}
            />
          )
        })}
      </View>
    );
  }

  const mainContent = () => {
    return (
      <SafeAreaView style={styles.container}>
        <TopBarNav 
          leftComponent={searchButton()}
          rightComponent={profileButton()}
        />
        <ScrollView
          contentContainerStyle={isNoEvents ? styles.emptyScrollView : styles.scrollViewContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {isNoEvents ? noEventContent() : eventList()}
        </ScrollView>
        <View style={styles.addButtonContainer}>
          <View style={{...styles.plusCircle, backgroundColor: Colors.brownish}}>
            <ImageButton 
              source={require('../../assets/icons/plus-white.png')}
              size={25}
              onPress={goToAddGathering}
            />
          </View>
        </View>
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
  },
  plusCircle: {
    borderRadius: 50,
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  emptyScrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContainer: {
    flex: 1,
  },
  noEventText: {
    fontWeight: '700',
    fontSize: 20,
  },
  addButtonContainer: {
    width: '100%',
    alignItems: 'flex-end',
  }
});

export default Main;