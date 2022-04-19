import React from 'react';
import {observer} from 'mobx-react-lite';
import {Alert} from './alert';
import {Props} from '../../types';

export const GameWon = observer(({game}: Props) => {
  return game.showGameWon ? (
    <Alert
      title={'Game Won!'}
      image={{
        source: require('../res/gameWon.json'),
        speed: 0.7,
        loop: false,
      }}
    />
  ) : null;
});
