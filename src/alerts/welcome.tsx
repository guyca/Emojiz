import {action} from 'mobx';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Game} from '../game/game';
import {Alert} from './alert';

const TITLE = 'Welcome to Emojiz!';
const DESCRIPTION =
  "Emojiz is a memory game. Each round an emoji will appear briefly on the screen. Draw it from your memory.\n\nIf your drawing was accurate you'll advance to the next round.";
const CTA = 'Get Started!';
interface Props {
  game: Game;
}

export const Welcome = observer(({game}: Props) => {
  return game.showWelcome ? (
    <Alert
      title={TITLE}
      description={DESCRIPTION}
      ctaText={CTA}
      cta={action(() => game.startNextRound())}
    />
  ) : null;
});
