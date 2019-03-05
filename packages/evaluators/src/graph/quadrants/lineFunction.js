import { FractionDigits } from './constants/fractionDigits';

class LineFunction {
  constructor(points) {
    this.x1 = +points.x1;
    this.y1 = +points.y1;
    this.x2 = +points.x2;
    this.y2 = +points.y2;
  }

  getKoefA() {
    if (this.x1 === this.x2) {
      return 'NaN';
    }

    const koefA = (this.y2 - this.y1) / (this.x2 - this.x1);
    return koefA.toFixed(FractionDigits);
  }

  getKoefB() {
    if (this.x1 === this.x2) {
      return 'NaN';
    }

    const koefB = (this.y2 * this.x1 - this.y1 * this.x2) / (this.x1 - this.x2);
    return koefB.toFixed(FractionDigits);
  }
}

export default LineFunction;
