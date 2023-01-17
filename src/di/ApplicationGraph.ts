import {Graph, ObjectGraph, Provides, Singleton} from 'react-obsidian';
import {AlertFactory} from '../alerts/alertFactory';
import {AlertPresenter as AlertPresenter} from '../alerts/alertPresenter';
import {Canvas} from '../drawing/canvas';
import {StartGameUseCase} from '../game/startGameUseCase';
import {GameState} from '../game/gameState';
import {Appearance} from '../services/Appearance';

@Singleton()
@Graph()
export class ApplicationGraph extends ObjectGraph {
  @Provides()
  startGameUseCase(state: GameState, alertPresenter: AlertPresenter): StartGameUseCase {
    return new StartGameUseCase(state, alertPresenter);
  }

  @Provides()
  state(): GameState {
    return new GameState();
  }

  @Provides()
  canvas(): Canvas {
    return new Canvas();
  }

  @Provides()
  alertPresenter(): AlertPresenter {
    return new AlertPresenter(new AlertFactory());
  }

  @Provides()
  appearance(): Appearance {
    return new Appearance();
  }
}
