import {Skia, TouchInfo} from '@shopify/react-native-skia';
import {action, makeObservable, observable} from 'mobx';
import {Stroke} from './stroke';

export class Canvas {
  pathToDraw = Skia.Path.Make();
  strokes: Stroke[] = [];
  currentStroke = new Stroke();

  constructor() {
    makeObservable(this, {
      strokes: observable,
      currentStroke: observable,
      onDrawingStart: action,
      onDrawingActive: action,
      onDrawingFinished: action,
      clear: action,
    });
  }

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
    this.strokes.push(this.currentStroke);
    this.currentStroke = new Stroke();
  }

  clear() {
    this.pathToDraw = Skia.Path.Make();
    this.strokes = [];
    this.currentStroke = new Stroke();
  }
}
