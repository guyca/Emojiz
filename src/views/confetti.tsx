import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {DependenciesOf, injectComponent, useObserver} from 'react-obsidian';
import {ApplicationGraph} from '../di/ApplicationGraph';

export const Confetti = injectComponent(({state}: DependenciesOf<ApplicationGraph, 'state'>) => {
  const [status] = useObserver(state.round.status);

  return status === 'SUCCESS' ? (
    <AnimatedLottieView
      style={styles.confetti}
      source={require('../res/confetti.json')}
      autoPlay
      loop={false}
    />
  ) : null;
}, ApplicationGraph);

const styles = StyleSheet.create({
  confetti: {
    position: 'absolute',
    height: '100%',
  },
});
