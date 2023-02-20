import {Observable, MediatorObservable} from 'react-obsidian';
import {Round} from './round';

export const EMOJIS = ['😶', '😆', '😂', '🙃', '😍', '😛', '😎', '💩', '🦄'];
export const ROUNDS = EMOJIS.length;
const LIVES = 3;

export class GameState {
  public readonly round = new Round();

  public get isGameOver(): boolean {
    return this.livesLeft <= 0 || this.round.isFinalRound;
  }

  public get livesLeft(): number {
    return LIVES - this.failedAttempts.value;
  }

  public readonly failedAttempts = new Observable(0);

  public readonly lives = new MediatorObservable('❤️❤️❤️').addSource(
    this.failedAttempts,
    failedAttempts => {
      this.lives.value = '❤️'.repeat(LIVES - failedAttempts);
    },
  );
}
