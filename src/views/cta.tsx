import {Props as BaseProps} from '@types';
import {action} from 'mobx';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Canvas} from 'src/drawing/canvas';

interface Props extends BaseProps {
  canvas: Canvas;
}

export const Cta = observer(({game, canvas}: Props) => {
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
        action(() => game.recognize(canvas.strokes)),
      )
    : game.showPlayNextRoundButton
    ? renderButton('Play Next Round', game.startNextRound)
    : null;
});

const styles = StyleSheet.create({
  cta: {
    alignItems: 'center',
    paddingBottom: 16,
  },
});
