import {Observable, MediatorObservable} from 'react-obsidian';
import {Round} from './round';

export const EMOJIS = ['😶', '😆', '😂', '🙃', '😍', '😛', '😎', '💩', '🦄'];
export type Status = 'SUCCESS' | 'FAIL' | 'IN_PROGRESS';
export const ROUNDS = EMOJIS.length;
const LIVES = 3;

export class GameState {
  public readonly round = new Round();

  public get isGameOver(): boolean {
    return this.failedAttempts.value === LIVES - 1 || this.round.isFinalRound;
  }

  public readonly failedAttempts = new Observable(0);

  public readonly lives = new MediatorObservable('❤️❤️❤️').addSource(
    this.failedAttempts,
    failedAttempts => {
      this.lives.value = '❤️'.repeat(LIVES - failedAttempts);
    },
  );
}
