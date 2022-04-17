import {observer} from 'mobx-react-lite';
import React from 'react';
import {Game} from '../game/game';
import {Alert} from '../views/alert';

interface Props {
  game: Game;
}

export const Welcome = observer(({game}: Props) => {
  return game.showWelcome ? (
    <Alert
      title="Welcome to Emojiz!"
      description="Emojiz is a memory game. Each round an emoji will appear briefly on the screen. Draw it from your memory.\n\nIf your drawing was accurate you'll advance to the next round."
      ctaText="Get Started!"
      cta={game.startNextRound}
    />
  ) : null;
});
