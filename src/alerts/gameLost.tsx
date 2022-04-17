import React from 'react';
import {observer} from 'mobx-react-lite';
import {Alert} from './alert';
import {Props} from '@types';

export const GameLost = observer(({game}: Props) => {
  return game.showGameLost ? (
    <Alert
      title={'Game Over'}
      image={{
        source: require('../res/crying.json'),
      }}
    />
  ) : null;
});
