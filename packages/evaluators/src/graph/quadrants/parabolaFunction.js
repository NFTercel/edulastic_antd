import { FractionDigits } from './constants/fractionDigits';

class ParabolaFunction {
  constructor(points) {
    this.startX = +points.startX;
    this.startY = +points.startY;
    this.endX = +points.endX;
    this.endY = +points.endY;
  }

  getKoefA() {
    return ((this.endY - this.startY) / ((this.endX - this.startX) * (this.endX - this.startX)))
      .toFixed(FractionDigits);
  }
}

export default ParabolaFunction;
