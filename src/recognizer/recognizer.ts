import {NativeModules} from 'react-native';
import {Stroke} from '../drawing/stroke';

type RecognitionResult = {
  text: string;
  score: number;
}[];

class Recognizer {
  async recognize(strokes: Stroke[]): Promise<RecognitionResult> {
    try {
      const result = await NativeModules.PathRecognizer.recognize(
        strokes.map(s => s.getPoints()),
      );
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
    return [];
  }
}

export default new Recognizer();
