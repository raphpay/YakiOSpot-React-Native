import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Label = ({ icon, text }) => {

  return (
    <View style={styles.container}>
      <Image source={icon} resizeMode={'contain'}/>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 5,
  },
  text: {
    paddingLeft: 5,
    fontSize: 14,
  },
});

export default Label;
