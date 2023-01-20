import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {DependenciesOf, injectComponent, useObserver} from 'react-obsidian';
import {ApplicationGraph} from '../di/ApplicationGraph';

export const RoundResult = injectComponent(({state}: DependenciesOf<ApplicationGraph, 'state'>) => {
  const [result] = useObserver(state.round.result);

  return result ? (
    <Text style={[styles.roundResult, {color: result.color}]}>{result.text}</Text>
  ) : null;
}, ApplicationGraph);

const styles = StyleSheet.create({
  roundResult: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 16,
  },
});
