import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

function ImageButton(props) {

  const { source, size, onPress,  } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={source}
        resizeMode={'cover'}
        style={[styles.image, {height: size, width: size}]}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
image: {
    height: 30,
    width: 30,
  },
})

export default ImageButton;