import {NativeModules} from 'react-native';
import {Stroke} from '../drawing/stroke';

class Recognizer {
  async recognize(strokes: Stroke[]) {
    try {
      const result = await NativeModules.PathRecognizer.recognize(
        strokes.map(s => s.getPoints()),
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new Recognizer();
