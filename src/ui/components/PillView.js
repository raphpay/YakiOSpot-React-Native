import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PillView = ({ text, backgroundColor }) => {
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    // Calculate the text width
    if (text && text.length > 0) {
      const fontSize = 14; // Adjust the font size as needed
      const padding = 20; // Adjust the total padding as needed
      const estimatedTextWidth = text.length * (fontSize * 0.6); // Estimated text width based on font size
      const finalWidth = Math.max(estimatedTextWidth + padding, 50); // Minimum width for the pill
      setTextWidth(finalWidth);
    }
  }, [text]);

  return (
    <View style={[styles.pill, { backgroundColor, width: textWidth }]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
  },
});

export default PillView;
