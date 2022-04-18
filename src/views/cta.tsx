import {Props} from '@types';
import {action} from 'mobx';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

export const Cta = observer(({game}: Props) => {
  const renderButton = (text: string, cta: () => void) => {
    return (
      <View style={styles.cta}>
        <Button title={text} onPress={cta} />
      </View>
    );
  };
  return game.showDoneButton
    ? renderButton(
        'Done',
        action(() => game.recognize()),
      )
    : game.showPlayNextRoundButton
    ? renderButton(
        'Play Next Round',
        action(() => game.startNextRound()),
      )
    : null;
});

const styles = StyleSheet.create({
  cta: {
    alignItems: 'center',
    paddingBottom: 16,
  },
});
