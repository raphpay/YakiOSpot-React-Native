import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfilePicture = (image) => {

  return (
    <View
      key={index}
      style={[
        styles.circle,
        { backgroundColor: 'gray' },
        { right: index * 20 },
      ]}
    >
      {/* You can use an Image component here for profile pictures */}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ProfilePicture;
