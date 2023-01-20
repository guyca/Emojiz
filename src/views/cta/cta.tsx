import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {DependenciesOf, injectComponent, useObserver} from 'react-obsidian';
import {ApplicationGraph} from '../../di/ApplicationGraph';
import {CtaGraph} from './di';

type Injected = DependenciesOf<[CtaGraph, ApplicationGraph], 'state' | 'onPressListener'>;

export const Cta = injectComponent(({onPressListener, state}: Injected) => {
  const [cta] = useObserver(state.round.cta);

  return cta ? (
    <View style={styles.cta}>
      <Button title={cta} onPress={() => onPressListener.onPress()} />
    </View>
  ) : null;
}, CtaGraph);

const styles = StyleSheet.create({
  cta: {
    alignItems: 'center',
    paddingBottom: 16,
  },
});
