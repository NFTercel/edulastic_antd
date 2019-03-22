import { FractionDigits } from "./constants/fractionDigits";

class EllipseFunction {
  constructor(points) {
    this.focusPoint1X = +points.focusPoint1X;
    this.focusPoint1Y = +points.focusPoint1Y;
    this.focusPoint2X = +points.focusPoint2X;
    this.focusPoint2Y = +points.focusPoint2Y;
    this.linePointX = +points.linePointX;
    this.linePointY = +points.linePointY;
  }

  getR1R2Sum() {
    const r1 = Math.sqrt(
      (this.focusPoint1X - this.linePointX) * (this.focusPoint1X - this.linePointX) +
        (this.focusPoint1Y - this.linePointY) * (this.focusPoint1Y - this.linePointY)
    );
    const r2 = Math.sqrt(
      (this.focusPoint2X - this.linePointX) * (this.focusPoint2X - this.linePointX) +
        (this.focusPoint2Y - this.linePointY) * (this.focusPoint2Y - this.linePointY)
    );

    return (r1 + r2).toFixed(FractionDigits);
  }
}

export default EllipseFunction;
