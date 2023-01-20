import {Skia, TouchInfo} from '@shopify/react-native-skia';
import {Observable} from 'react-obsidian';
import {Stroke} from './stroke';

export class Canvas {
  pathToDraw = Skia.Path.Make();
  strokes = new Observable<Stroke[]>([]);
  currentStroke = new Stroke();

  onDrawingStart({x, y, timestamp}: TouchInfo) {
    this.currentStroke.addPoint(x, y, timestamp);
    this.pathToDraw.moveTo(x, y);
  }

  onDrawingActive({x, y, timestamp}: TouchInfo) {
    this.currentStroke.addPoint(x, y, timestamp);
    this.pathToDraw.lineTo(x, y);
  }

  onDrawingFinished({x, y, timestamp}: TouchInfo) {
    this.pathToDraw.lineTo(x, y);
    this.currentStroke.addPoint(x, y, timestamp);
    this.strokes.value.push(this.currentStroke);
    this.currentStroke = new Stroke();
  }

  clear() {
    this.pathToDraw = Skia.Path.Make();
    this.strokes.value = [];
    this.currentStroke = new Stroke();
  }
}
