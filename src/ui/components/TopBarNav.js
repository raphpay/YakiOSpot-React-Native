import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

function TopBarNav(props) {

  const { leftComponent, rightComponent } = props;

  return (
    <View style={styles.container}>
      {leftComponent ?? <View style={styles.emptyView} />}
      <Image 
        source={require('../assets/images/logo/Horizontal-Logo.png')}
        resizeMode={'contain'}
        style={styles.logo}
      />
      {rightComponent ?? <View style={styles.emptyView}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 54,
  },
  logo: {
    height: 54,
    width: 200,
  },
  emptyView: {
    flex: 0.33
  }
})

export default TopBarNav;