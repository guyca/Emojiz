import {RoundResult} from '../game/roundResult';

export interface RecognitionResult {
  recognizedEmoji: string;
  lives: string;
  roundResult: RoundResult;
}
