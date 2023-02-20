import {Observable} from 'react-obsidian';
import {GameState} from '../game/gameState';
import {AlertFactory, AlertType} from './alertFactory';
import {Alert} from './typings';

export class AlertPresenter {
  private _alert = new Observable<Alert | undefined>(undefined);

  constructor(private state: GameState, private alertFactory: AlertFactory) {}

  public get alert(): Observable<Alert | undefined> {
    return this._alert;
  }

  public dismiss() {
    this._alert.value = undefined;
  }

  public showWelcomeAlert(onStartPressed: () => void) {
    this._alert.value = this.alertFactory.create(AlertType.Welcome, onStartPressed);
  }

  public showGameOverAlert() {
    if (this.state.livesLeft > 0) {
      this._alert.value = this.alertFactory.create(AlertType.GameWon);
    } else {
      this._alert.value = this.alertFactory.create(AlertType.GameLost);
    }
  }
}
