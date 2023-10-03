import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import ImageButton from './ImageButton';

function BackgroundImage(props) {
  const {image, content, navigation, showBackButton} = props;

  return (
    <View style={styles.backgroundContainer}>
      <Image 
        source={image ?? require('../assets/images/background/login-background.png')}
        resizeMode={'cover'}
        style={styles.backgroundImage}
      />
      {
        showBackButton ? (
          <View style={styles.logoContainer}>
            <ImageButton
              onPress={() => navigation.goBack()}
              source={require('../assets/icons/arrow.left.circle.png')}
              navigation={navigation}
            />
            <Image
              source={require('../assets/images/logo/Horizontal-Logo.png')}
              resizeMode={'cover'}
              style={styles.logo}
            />
            <View style={styles.emptyView}/>
          </View>
        ) : (
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/logo/Horizontal-Logo.png')}
              resizeMode={'cover'}
              style={styles.logo}
            />
          </View>
        )
      }
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
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 50,
    flexDirection: "row",
  },
  logo: {
    height: 54,
    width: 200,
  },
  backButton: {
    flex: 0.33,
  },
  emptyView: {
    flex: 0.33,
  },
});

export default BackgroundImage;