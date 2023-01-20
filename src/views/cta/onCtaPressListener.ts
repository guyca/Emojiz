import {Canvas} from '../../drawing/canvas';
import {GameState} from '../../game/gameState';
import {RecognizeEmojiUseCase} from '../../recognition/recognizeEmojiUseCase';

export class OnCtaPressListener {
  constructor(
    private state: GameState,
    private canvas: Canvas,
    private recognizeEmojiUseCase: RecognizeEmojiUseCase,
  ) {}
  public onPress() {
    switch (this.state.round.status.value) {
      case 'IN_PROGRESS':
        this.recognizeEmojiUseCase.recognize();
        break;
      case 'SUCCESS':
      case 'FAIL':
        this.canvas.clear();
        this.state.round.startNextRound();
        break;
    }
  }
}
