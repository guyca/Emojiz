import {Point} from './point';

export class Stroke {
  private points: Point[] = [];

  addPoint(x: number, y: number) {
    this.points.push({x, y, time: Date.now()});
  }

  getPoints(): Point[] {
    return this.points;
  }
}
