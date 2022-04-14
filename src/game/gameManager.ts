import {Stroke} from '../drawing/stroke';
import recognizer from '../recognizer/recognizer';
import {Cta} from './cta';
import {RecognitionResult} from './RecognitionResult';

// When a user is not correct and loses a life - animate the heart. tranaltion y + alpha
const EMOJIS = ['😶', '😆', '😂', '🙃', '😍', '😛', '😎', '💩', '🦄'];
const ROUNDS = EMOJIS.length;
const LIVES = 3;

export enum GameState {
  WELCOME,
  DRAWING,
  SUCCESS,
  FAIL,
}

class GameManager {
  private round = 0;
  private failedAttempts = 0;
  private state = GameState.WELCOME;

  get shouldShowWelcome(): boolean {
    return this.state === GameState.WELCOME;
  }

  get shouldShowConfetti(): boolean {
    return this.state === GameState.SUCCESS;
  }

  get shouldShowDoneButton(): boolean {
    return this.state === GameState.DRAWING;
  }

  get shouldShowPlayNextRoundButton(): boolean {
    return this.isRoundOver && !this.isGameOver;
  }

  get shouldShowRoundResult(): boolean {
    return this.isRoundOver && !this.isGameOver;
  }

  get isRoundOver(): boolean {
    return [GameState.SUCCESS, GameState.FAIL].includes(this.state);
  }

  get lives(): string {
    return new Array(LIVES - this.failedAttempts).fill('❤️').join('');
  }

  get emojiForCurrentLevel(): string {
    return EMOJIS[this.round - 1];
  }

  get isGameWon(): boolean {
    return this.isGameOver && this.failedAttempts < LIVES;
  }

  get isGameLost(): boolean {
    return this.isGameOver && this.failedAttempts >= LIVES;
  }

  get isGameOver(): boolean {
    return this.round === ROUNDS && this.isRoundOver;
  }

  get isWinner(): boolean {
    return this.round === ROUNDS && this.state !== GameState.DRAWING && this.failedAttempts < LIVES;
  }

  getCta(): Cta {
    if (this.state === GameState.DRAWING) {
      return {
        text: 'Done!',
        visible: true,
      };
    }
    if ([GameState.SUCCESS, GameState.FAIL].includes(this.state)) {
      return {
        text: 'Play Next Round',
        visible: true,
      };
    }
    return {visible: false} as Cta;
  }

  async recognize(strokes: Stroke[]): Promise<RecognitionResult> {
    const candidates = await recognizer.recognize(strokes);
    const success = this.emojiForCurrentLevel === candidates[0].text;
    if (success) {
      this.state = GameState.SUCCESS;
    } else {
      this.failedAttempts++;
      this.state = GameState.FAIL;
    }
    return {
      lives: this.lives,
      recognizedEmoji: candidates[0].text,
      roundResult: {
        text: this.state === GameState.SUCCESS ? 'Correct!' : 'Better Luck Next Time',
        color: this.state === GameState.SUCCESS ? 'green' : 'red',
      },
    };
  }

  startNextRound() {
    this.state = GameState.DRAWING;
    this.round++;
  }
}

export default new GameManager();
