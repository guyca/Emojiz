import {Point} from './point';
import {PixelRatio} from 'react-native';

export class Stroke {
  private points: Point[] = [];

  addPoint(x: number, y: number, timestamp: number) {
    this.points.push({
      x: PixelRatio.getPixelSizeForLayoutSize(x),
      y: PixelRatio.getPixelSizeForLayoutSize(y),
      timestamp: timestamp * 1000,
    });
  }

  getPoints(): Point[] {
    return this.points;
  }
}
