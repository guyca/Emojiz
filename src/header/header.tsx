import React from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import {DependenciesOf, injectComponent, useObserver} from 'react-obsidian';
import {ApplicationGraph} from '../di/ApplicationGraph';

type Injected = DependenciesOf<ApplicationGraph, 'state' | 'canvas' | 'appearance'>;

export const Header = injectComponent(({state, canvas, appearance}: Injected) => {
  const [lives] = useObserver(state.lives);

  const renderLives = () => {
    return <Text style={styles.lives}>{lives}</Text>;
  };

  const renderClearButton = () => {
    return <Button title="Clear" onPress={() => canvas.clear()} />;
  };

  return (
    <View style={[styles.header, {backgroundColor: appearance.backgroundColor}]}>
      {renderLives()}
      {renderClearButton()}
    </View>
  );
}, ApplicationGraph);

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    width: '100%',
    height: 56,
    paddingHorizontal: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 3},
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  lives: {
    flexGrow: 1,
    color: 'black',
    fontSize: 24,
  },
});
