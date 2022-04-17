import React from 'react';
import {StyleSheet, View} from 'react-native';

export const Footer: React.FC = ({children}) => {
  return <View style={styles.footer}>{children}</View>;
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
});
