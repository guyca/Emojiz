import {Stroke} from '../drawing/stroke';
import recognizer from '../recognizer/recognizer';
import {makeAutoObservable, runInAction} from 'mobx';
import {RoundResult} from './roundResult';

const EMOJIS = ['😶', '😆', '😂', '🙃', '😍', '😛', '😎', '💩', '🦄'];
const ROUNDS = EMOJIS.length;
const LIVES = 3;

export enum State {
  WELCOME,
  DRAWING,
  SUCCESS,
  FAIL,
}

export class Game {
  round = 0;
  failedAttempts = 0;
  state = State.WELCOME;
  recognizedEmoji: string | undefined;

  constructor() {
    makeAutoObservable(this, {}, {autoBind: true});
  }

  get roundResult(): RoundResult {
    return {
      text: this.state === State.SUCCESS ? 'Correct!' : 'Better Luck Next Time',
      color: this.state === State.SUCCESS ? 'green' : 'red',
    };
  }

  get showWelcome(): boolean {
    return this.state === State.WELCOME;
  }

  get showConfetti(): boolean {
    return this.state === State.SUCCESS;
  }

  get showDoneButton(): boolean {
    return this.state === State.DRAWING && !this.isGameOver;
  }

  get showPlayNextRoundButton(): boolean {
    return this.isRoundOver && !this.isGameOver;
  }

  get showRoundResult(): boolean {
    return this.isRoundOver && !this.isGameOver;
  }

  get isRoundOver(): boolean {
    return [State.SUCCESS, State.FAIL].includes(this.state);
  }

  get lives(): string {
    return new Array(LIVES - this.failedAttempts).fill('❤️').join('');
  }

  get emojiToRecognize(): string {
    return EMOJIS[this.round - 1];
  }

  get isGameWon(): boolean {
    return this.isGameOver && this.failedAttempts < LIVES;
  }

  get isGameLost(): boolean {
    return this.failedAttempts >= LIVES;
  }

  get isGameOver(): boolean {
    return (this.round === ROUNDS && this.isRoundOver) || this.failedAttempts >= LIVES;
  }

  async recognize(strokes: Stroke[], clear: () => void) {
    clear();
    const candidates = await recognizer.recognize(strokes);
    const success = this.emojiToRecognize === candidates[0].text;
    runInAction(() => {
      if (success) {
        this.state = State.SUCCESS;
      } else {
        this.failedAttempts++;
        this.state = State.FAIL;
      }
      this.recognizedEmoji = candidates[0].text;
    });
  }

  public startNextRound() {
    this.state = State.DRAWING;
    this.round = this.round + 1;
    this.recognizedEmoji = undefined;
  }
}
