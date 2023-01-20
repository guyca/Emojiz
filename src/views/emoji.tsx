import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {DependenciesOf, injectComponent, useObserver} from 'react-obsidian';
import {ApplicationGraph} from '../di/ApplicationGraph';

const FADE_DURATION = 1000;

export const Emoji = injectComponent(({state}: DependenciesOf<ApplicationGraph, 'state'>) => {
  const [emojiToRecognize] = useObserver(state.round.emojiToRecognize);
  const [recognizedEmoji] = useObserver(state.round.recognizedEmoji);
  const fadeAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (emojiToRecognize) {
      fadeAnimation.setValue(1);
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: FADE_DURATION,
        useNativeDriver: true,
      }).start();
    }
  }, [emojiToRecognize, fadeAnimation]);

  return recognizedEmoji ? (
    <View style={styles.emojiContainer}>
      <Text style={styles.emojiView}>{recognizedEmoji}</Text>
    </View>
  ) : (
    <Animated.View style={[styles.emojiContainer, {opacity: fadeAnimation}]}>
      <Text style={styles.emojiView}>{emojiToRecognize}</Text>
    </Animated.View>
  );
}, ApplicationGraph);

const styles = StyleSheet.create({
  emojiContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiView: {
    fontSize: 300,
  },
});
