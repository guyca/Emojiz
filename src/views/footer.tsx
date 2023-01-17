import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Cta} from './cta/cta';
import {RoundResult} from './roundResult';

export const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <RoundResult />
      <Cta />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
});
