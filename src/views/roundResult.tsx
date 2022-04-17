import {Props} from '@types';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

export const RoundResult = observer(({game}: Props) => {
  return game.showRoundResult ? (
    <Text style={[styles.roundResult, {color: game.roundResult.color}]}>
      {game.roundResult.text}
    </Text>
  ) : null;
});

const styles = StyleSheet.create({
  roundResult: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 16,
  },
});
