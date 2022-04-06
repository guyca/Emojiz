import {NativeModules} from 'react-native';
import {Stroke} from '../drawing/stroke';

class Recognizer {
  async recognize(strokes: Stroke[]) {
    const result = await NativeModules.PathRecognizer.recognize(
      strokes.map(s => s.getPoints()),
    );
    console.log(result);
  }
}

export default new Recognizer();
