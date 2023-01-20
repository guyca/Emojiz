import {Graph, LifecycleBound, ObjectGraph, Provides} from 'react-obsidian';
import {AlertPresenter} from '../../alerts/alertPresenter';
import {ApplicationGraph} from '../../di/ApplicationGraph';
import {Canvas} from '../../drawing/canvas';
import {GameState} from '../../game/gameState';
import {RecognizeEmojiUseCase} from '../../recognition/recognizeEmojiUseCase';
import {Recognizer} from '../../recognition/recognizer';
import {OnCtaPressListener} from './onCtaPressListener';

@LifecycleBound()
@Graph({subgraphs: [ApplicationGraph]})
export class CtaGraph extends ObjectGraph {
  @Provides()
  onPressListener(
    state: GameState,
    canvas: Canvas,
    alertPresenter: AlertPresenter,
  ): OnCtaPressListener {
    return new OnCtaPressListener(
      state,
      canvas,
      new RecognizeEmojiUseCase(state, canvas, new Recognizer(), alertPresenter),
    );
  }
}
