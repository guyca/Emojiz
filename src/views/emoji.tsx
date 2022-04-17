import {Props} from '@types';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';

export const Emoji = observer(({game}: Props) => {
  const fadeAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (game.emojiToRecognize) {
      fadeAnimation.setValue(1);
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }
  }, [game.emojiToRecognize, fadeAnimation]);

  return game.recognizedEmoji ? (
    <View style={styles.emojiContainer}>
      <Text style={styles.emojiView}>{game.recognizedEmoji}</Text>
    </View>
  ) : (
    <Animated.View style={[styles.emojiContainer, {opacity: fadeAnimation}]}>
      <Text style={styles.emojiView}>{game.emojiToRecognize}</Text>
    </Animated.View>
  );
});

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
