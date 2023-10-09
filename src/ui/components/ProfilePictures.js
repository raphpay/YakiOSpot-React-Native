import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import ProfilePicture from './ProfilePicture';

const ProfilePictures = (props) => {

  const { gatherings } = useSelector(state => state.event);

  const { index } = props;

  // const profiles = [
  //   { name: '1', profilePic: 'image1.jpg' },
  //   { name: '2', profilePic: 'image2.jpg' },
  //   { name: '3', profilePic: 'image3.jpg' },
  //   { name: '4', profilePic: 'image3.jpg' },
  //   { name: '5', profilePic: 'image3.jpg' },
  // ];

  // // Calculate the number of people not displayed
  // const remainingPeople = Math.abs(4 - profiles.length);

  // const profilePic = (profile, index) => {
  //   return (
  //     <View
  //       key={index}
  //       style={[
  //         styles.circle,
  //         { backgroundColor: 'gray' },
  //         { left: -index * 1.8 },
  //         { zIndex: -index }
  //       ]}
  //     >
  //       {remainingPeople > 0 && index >= 4 ? (
  //         <Text style={styles.text}>+{remainingPeople}</Text>
  //        ) : (
  //         <View/>
  //       )}
  //     </View>
  //   )
  // }

  // return (
  //   <View style={styles.container}>
  //     {profiles.reverse().map((profile, index) => (
  //       profilePic(profile, index)
  //     ))}
  //   </View>
  // );
  return (
    <View/>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingRight: 10,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfilePictures;
