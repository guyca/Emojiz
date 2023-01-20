import {Alert} from './typings';

export enum AlertType {
  Welcome,
  GameWon,
  GameLost,
}

export class AlertFactory {
  public create(type: AlertType, onPress?: () => void): Alert {
    switch (type) {
      case AlertType.Welcome:
        const alert = {...alerts.Welcome} as Alert;
        alert.cta!.onPress = onPress;
        return alert;
      case AlertType.GameWon:
        return alerts.GameWon;
      case AlertType.GameLost:
        return alerts.GameLost;
      default:
        throw new Error('Unknown alert type');
    }
  }
}

const alerts: Record<string, Alert> = {
  GameWon: {
    title: 'Game Won!',
    image: {
      source: require('../res/gameWon.json'),
      speed: 0.7,
      loop: false,
    },
  },
  GameLost: {
    title: 'Game Lost!',
    image: {
      source: require('../res/crying.json'),
    },
  },
  Welcome: {
    title: 'Welcome to Emojiz!',
    description:
      "Emojiz is a memory game. Each round an emoji will appear briefly on the screen. Draw it from your memory.\n\nIf your drawing was accurate you'll advance to the next round.",
    cta: {
      text: 'Start Game',
    },
  },
};
