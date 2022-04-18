import {Point} from './point';

export class Stroke {
  private points: Point[] = [];

  addPoint(x: number, y: number, timestamp: number) {
    this.points.push({
      x,
      y,
      timestamp: timestamp * 1000,
    });
  }

  getPoints(): Point[] {
    return this.points;
  }
}
