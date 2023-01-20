import {Observable, MediatorObservable} from 'react-obsidian';
import {RoundResult} from './roundResult';
import {Status, EMOJIS, ROUNDS} from './gameState';

export class Round {
  public readonly status = new Observable<Status>('IN_PROGRESS');
  public readonly result = new MediatorObservable<RoundResult | undefined>().addSource(
    this.status,
    status => {
      if (status === 'IN_PROGRESS') {
        this.result.value = undefined;
      } else {
        this.result.value = {
          text: status === 'SUCCESS' ? 'Correct!' : 'Better Luck Next Time',
          color: status === 'SUCCESS' ? 'green' : 'red',
        };
      }
    },
  );
  public readonly cta = new MediatorObservable<string | undefined>('Done').addSource(
    this.status,
    status => {
      switch (status) {
        case 'IN_PROGRESS':
          this.cta.value = 'Done';
          break;
        case 'SUCCESS':
        case 'FAIL':
          this.cta.value = 'Next';
          break;
      }
    },
  );

  public readonly number = new Observable(0);
  public readonly emojiToRecognize = new MediatorObservable<string>().addSource(
    this.number,
    number => {
      this.emojiToRecognize.value = EMOJIS[number];
    },
  );
  public readonly recognizedEmoji = new Observable<string | undefined>();

  public get isFinalRound(): boolean {
    return this.number.value === ROUNDS - 1;
  }

  startNextRound() {
    this.number.value += 1;
    this.recognizedEmoji.value = undefined;
    this.status.value = 'IN_PROGRESS';
  }
}
