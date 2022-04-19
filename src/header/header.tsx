import {action} from 'mobx';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import {Canvas} from '../drawing/canvas';
import {Game} from '../game/game';

interface Props {
  game: Game;
  canvas: Canvas;
}

export const Header = observer(({game, canvas}: Props) => {
  const renderLives = () => {
    return <Text style={styles.lives}>{game.lives}</Text>;
  };

  const renderClearButton = () => {
    return <Button title="Clear" onPress={action(() => canvas.clear())} />;
  };

  return (
    <View style={styles.header}>
      {renderLives()}
      {renderClearButton()}
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    width: '100%',
    height: 56,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
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
