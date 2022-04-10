import {Stroke} from '../drawing/stroke';
import recognizer from '../recognizer/recognizer';
import {Cta} from './cta';
import {RecognitionResult} from './RecognitionResult';

const EMOJIS = ['😶', '😆', '😁', '😂', '🙃', '😍', '😛', '😎', '💩', '🦄'];
const ROUNDS = 3;

export enum GameState {
  WELCOME,
  DRAWING,
  SUCCESS,
  FAIL,
}

class GameManager {
  private level = 0;
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
    return [GameState.SUCCESS, GameState.FAIL].includes(this.state);
  }

  get lives(): string {
    return new Array(ROUNDS - this.failedAttempts).fill('❤️').join('');
  }

  get emojiForCurrentLevel(): string {
    return EMOJIS[this.level];
  }

  startGame() {
    this.state = GameState.DRAWING;
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
    };
  }

  startNextRound() {
    this.state = GameState.DRAWING;
    this.level++;
  }
}

export default new GameManager();
