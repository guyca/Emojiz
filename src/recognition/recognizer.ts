import {NativeModules} from 'react-native';
import {Stroke} from '../drawing/stroke';

export class Recognizer {
  private readonly pathRecognizer = NativeModules.PathRecognizer;

  public async recognize(strokes: Stroke[]): Promise<RecognitionResult> {
    try {
      const result = await this.pathRecognizer.recognize(strokes.map(s => s.getPoints()));
      // console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
    return [];
  }
}

type RecognitionResult = {
  text: string;
  score: number;
}[];
