import recognizer from '../recognizer/recognizer';
import {makeAutoObservable, runInAction} from 'mobx';
import {RoundResult} from './roundResult';
import {Canvas} from '../drawing/canvas';

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
  recognizedEmoji = '';

  constructor(private canvas: Canvas) {
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

  get showGameWon(): boolean {
    return this.isGameOver && this.failedAttempts < LIVES;
  }

  get showGameLost(): boolean {
    return this.failedAttempts >= LIVES;
  }

  get isGameOver(): boolean {
    return (this.round === ROUNDS && this.isRoundOver) || this.failedAttempts >= LIVES;
  }

  async recognize() {
    const candidates = await recognizer.recognize(this.canvas.strokes);
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
    this.canvas.clear();
    this.state = State.DRAWING;
    this.round++;
    this.recognizedEmoji = '';
  }
}
