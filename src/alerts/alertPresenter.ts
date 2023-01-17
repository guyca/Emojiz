import {Observable} from 'react-obsidian';
import {AlertFactory, AlertType} from './alertFactory';
import {Alert} from './typings';

export class AlertPresenter {
  private _alert = new Observable<Alert | undefined>(undefined);

  constructor(private alertFactory: AlertFactory) {}

  public get alert(): Observable<Alert | undefined> {
    return this._alert;
  }

  public dismiss() {
    this._alert.value = undefined;
  }

  public showWelcomeAlert(onStartPressed: () => void) {
    this._alert.value = this.alertFactory.create(AlertType.Welcome, onStartPressed);
  }

  public showGameWonAlert() {
    this._alert.value = this.alertFactory.create(AlertType.GameWon);
  }

  public showGameLostAlert() {
    this._alert.value = this.alertFactory.create(AlertType.GameLost);
  }
}
