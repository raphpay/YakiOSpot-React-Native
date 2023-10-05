import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

function TopBarNav(props) {

  const { leftComponent, rightComponent } = props;

  return (
    <View style={styles.container}>
      {leftComponent}
      <Image 
        source={require('../assets/images/logo/Horizontal-Logo.png')}
        resizeMode={'contain'}
        style={styles.logo}
      />
      {rightComponent}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
  },
  logo: {
    height: 54,
    width: 200,
  },
})

export default TopBarNav;