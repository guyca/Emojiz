import AnimatedLottieView from 'lottie-react-native';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Game} from '../game/game';

interface Props {
  game: Game;
}

export const Confetti = observer(({game}: Props) => {
  return game.showConfetti ? (
    <AnimatedLottieView
      style={styles.confetti}
      source={require('../res/confetti.json')}
      autoPlay
      loop={false}
    />
  ) : null;
});

const styles = StyleSheet.create({
  confetti: {
    position: 'absolute',
    height: '100%',
  },
});
