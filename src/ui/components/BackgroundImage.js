import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

function BackgroundImage(props) {
  const { image, content } = props;

  return (
    <View style={styles.backgroundContainer}>
      <Image 
        source={image ?? require('../assets/images/background/login-background.png')}
        resizeMode={'cover'}
        style={styles.backgroundImage}
      />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
    opacity: 0.45,
  }
});

export default BackgroundImage;