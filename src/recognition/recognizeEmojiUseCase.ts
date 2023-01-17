import {Canvas} from '../drawing/canvas';
import {Recognizer} from './recognizer';
import {GameState} from '../game/gameState';
import {AlertPresenter} from '../alerts/alertPresenter';

export class RecognizeEmojiUseCase {
  constructor(
    private state: GameState,
    private canvas: Canvas,
    private recognizer: Recognizer,
    private alertPresenter: AlertPresenter,
  ) {}

  public async recognize() {
    const candidates = await this.recognizer.recognize(this.canvas.strokes.value);
    if (this.state.isGameOver) {
      this.showGameOverAlert(candidates);
    } else {
      this.handleRecognitionResult(candidates);
    }
  }

  private handleRecognitionResult(candidates: {text: string; score: number}[]) {
    if (this.isCorrect(candidates)) {
      this.state.round.status.value = 'SUCCESS';
    } else {
      this.state.round.status.value = 'FAIL';
      this.state.failedAttempts.value += 1;
    }
    this.state.round.recognizedEmoji.value = candidates[0].text;
  }

  private showGameOverAlert(candidates: {text: string; score: number}[]) {
    this.canvas.clear();
    if (this.isCorrect(candidates)) {
      this.alertPresenter.showGameWonAlert();
    } else {
      this.alertPresenter.showGameLostAlert();
      this.state.failedAttempts.value += 1;
    }
  }

  private isCorrect(candidates: {text: string; score: number}[]) {
    return this.state.round.emojiToRecognize.value === candidates[0].text;
  }
}
