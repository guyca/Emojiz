import {AlertPresenter} from '../alerts/alertPresenter';
import {GameState} from './gameState';

export class StartGameUseCase {
  constructor(private state: GameState, private alertPresenter: AlertPresenter) {}

  public start() {
    this.alertPresenter.showWelcomeAlert(() => {
      this.state.round.startNextRound();
      this.alertPresenter.dismiss();
    });
  }
}
