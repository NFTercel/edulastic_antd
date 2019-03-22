import { ShapeTypes } from "./constants/shapeTypes";
import { FractionDigits } from "./constants/fractionDigits";
import LineFunction from "./lineFunction";
import ParabolaFunction from "./parabolaFunction";
import EllipseFunction from "./ellipseFunction";
import HyperbolaFunction from "./hyperbolaFunction";

class CompareShapes {
  constructor(trueAnswerValue, testAnswer) {
    this.trueAnswerValue = trueAnswerValue;
    this.testAnswer = testAnswer;
  }

  compare(testId, trueId) {
    const testShape = this.testAnswer.find(item => item.id === testId);
    const trueShape = this.trueAnswerValue.find(item => item.id === trueId);

    if (!testShape || !trueShape || testShape.type !== trueShape.type) {
      return {
        id: testId,
        result: false
      };
    }

    switch (testShape.type) {
      case ShapeTypes.POINT:
        return CompareShapes.comparePoints(testShape, trueShape);
      case ShapeTypes.LINE:
        return this.compareLines(testShape, trueShape);
      case ShapeTypes.RAY:
        return this.compareRays(testShape, trueShape);
      case ShapeTypes.SEGMENT:
        return this.compareSegments(testShape, trueShape);
      case ShapeTypes.VECTOR:
        return this.compareVectors(testShape, trueShape);
      case ShapeTypes.CIRCLE:
        return this.compareCircles(testShape, trueShape);
      case ShapeTypes.PARABOLA:
        return this.compareParabolas(testShape, trueShape);
      case ShapeTypes.SINE:
        return this.compareSines(testShape, trueShape);
      case ShapeTypes.POLYGON:
        return this.comparePolygons(testShape, trueShape);
      case ShapeTypes.ELLIPSE:
        return this.compareEllipses(testShape, trueShape);
      case ShapeTypes.HYPERBOLA:
        return this.compareHyperbolas(testShape, trueShape);
      default:
        return {
          id: testId,
          result: false
        };
    }
  }

  static comparePoints(testPoint, truePoint) {
    if (testPoint.x === truePoint.x && testPoint.y === truePoint.y) {
      return {
        id: testPoint.id,
        relatedId: truePoint.id,
        result: true
      };
    }

    return {
      id: testPoint.id,
      result: false
    };
  }

  compareLines(testLine, trueLine) {
    const testLinePoints = {
      x1: +this.testAnswer.find(item => item.id === testLine.subElementsIds.startPoint).x,
      y1: +this.testAnswer.find(item => item.id === testLine.subElementsIds.startPoint).y,
      x2: +this.testAnswer.find(item => item.id === testLine.subElementsIds.endPoint).x,
      y2: +this.testAnswer.find(item => item.id === testLine.subElementsIds.endPoint).y
    };

    const trueLinePoints = {
      x1: +this.trueAnswerValue.find(item => item.id === trueLine.subElementsIds.startPoint).x,
      y1: +this.trueAnswerValue.find(item => item.id === trueLine.subElementsIds.startPoint).y,
      x2: +this.trueAnswerValue.find(item => item.id === trueLine.subElementsIds.endPoint).x,
      y2: +this.trueAnswerValue.find(item => item.id === trueLine.subElementsIds.endPoint).y
    };

    const testLineFunc = new LineFunction(testLinePoints);
    const trueLineFunc = new LineFunction(trueLinePoints);

    if (testLineFunc.getKoefA() === trueLineFunc.getKoefA() && testLineFunc.getKoefB() === trueLineFunc.getKoefB()) {
      return {
        id: testLine.id,
        relatedId: trueLine.id,
        result: true
      };
    }

    return {
      id: testLine.id,
      result: false
    };
  }

  compareRays(testRay, trueRay) {
    const testRayPoints = {
      x1: +this.testAnswer.find(item => item.id === testRay.subElementsIds.startPoint).x,
      y1: +this.testAnswer.find(item => item.id === testRay.subElementsIds.startPoint).y,
      x2: +this.testAnswer.find(item => item.id === testRay.subElementsIds.endPoint).x,
      y2: +this.testAnswer.find(item => item.id === testRay.subElementsIds.endPoint).y
    };

    const trueRayPoints = {
      x1: +this.trueAnswerValue.find(item => item.id === trueRay.subElementsIds.startPoint).x,
      y1: +this.trueAnswerValue.find(item => item.id === trueRay.subElementsIds.startPoint).y,
      x2: +this.trueAnswerValue.find(item => item.id === trueRay.subElementsIds.endPoint).x,
      y2: +this.trueAnswerValue.find(item => item.id === trueRay.subElementsIds.endPoint).y
    };

    const testRayParams = {
      deltaX: testRayPoints.x2 - testRayPoints.x1,
      deltaY: testRayPoints.y2 - testRayPoints.y1
    };
    testRayParams.koef =
      testRayParams.deltaX === 0 ? "NaN" : (testRayParams.deltaY / testRayParams.deltaX).toFixed(FractionDigits);

    const trueRayParams = {
      deltaX: trueRayPoints.x2 - trueRayPoints.x1,
      deltaY: trueRayPoints.y2 - trueRayPoints.y1
    };
    trueRayParams.koef =
      trueRayParams.deltaX === 0 ? "NaN" : (trueRayParams.deltaY / trueRayParams.deltaX).toFixed(FractionDigits);

    if (
      testRayPoints.x1 === trueRayPoints.x1 &&
      testRayPoints.y1 === trueRayPoints.y1 &&
      testRayParams.koef === trueRayParams.koef &&
      Math.sign(testRayParams.deltaX) === Math.sign(trueRayParams.deltaX) &&
      Math.sign(testRayParams.deltaY) === Math.sign(trueRayParams.deltaY)
    ) {
      return {
        id: testRay.id,
        relatedId: trueRay.id,
        result: true
      };
    }

    return {
      id: testRay.id,
      result: false
    };
  }

  compareSegments(testSegment, trueSegment) {
    const testSegmentPoints = {
      x1: +this.testAnswer.find(item => item.id === testSegment.subElementsIds.startPoint).x,
      y1: +this.testAnswer.find(item => item.id === testSegment.subElementsIds.startPoint).y,
      x2: +this.testAnswer.find(item => item.id === testSegment.subElementsIds.endPoint).x,
      y2: +this.testAnswer.find(item => item.id === testSegment.subElementsIds.endPoint).y
    };

    const trueSegmentPoints = {
      x1: +this.trueAnswerValue.find(item => item.id === trueSegment.subElementsIds.startPoint).x,
      y1: +this.trueAnswerValue.find(item => item.id === trueSegment.subElementsIds.startPoint).y,
      x2: +this.trueAnswerValue.find(item => item.id === trueSegment.subElementsIds.endPoint).x,
      y2: +this.trueAnswerValue.find(item => item.id === trueSegment.subElementsIds.endPoint).y
    };

    if (
      (testSegmentPoints.x1 === trueSegmentPoints.x1 &&
        testSegmentPoints.y1 === trueSegmentPoints.y1 &&
        testSegmentPoints.x2 === trueSegmentPoints.x2 &&
        testSegmentPoints.y2 === trueSegmentPoints.y2) ||
      (testSegmentPoints.x1 === trueSegmentPoints.x2 &&
        testSegmentPoints.y1 === trueSegmentPoints.y2 &&
        testSegmentPoints.x2 === trueSegmentPoints.x1 &&
        testSegmentPoints.y2 === trueSegmentPoints.y1)
    ) {
      return {
        id: testSegment.id,
        relatedId: trueSegment.id,
        result: true
      };
    }

    return {
      id: testSegment.id,
      result: false
    };
  }

  compareVectors(testVector, trueVector) {
    const testVectorPoints = {
      x1: +this.testAnswer.find(item => item.id === testVector.subElementsIds.startPoint).x,
      y1: +this.testAnswer.find(item => item.id === testVector.subElementsIds.startPoint).y,
      x2: +this.testAnswer.find(item => item.id === testVector.subElementsIds.endPoint).x,
      y2: +this.testAnswer.find(item => item.id === testVector.subElementsIds.endPoint).y
    };

    const trueVectorPoints = {
      x1: +this.trueAnswerValue.find(item => item.id === trueVector.subElementsIds.startPoint).x,
      y1: +this.trueAnswerValue.find(item => item.id === trueVector.subElementsIds.startPoint).y,
      x2: +this.trueAnswerValue.find(item => item.id === trueVector.subElementsIds.endPoint).x,
      y2: +this.trueAnswerValue.find(item => item.id === trueVector.subElementsIds.endPoint).y
    };

    if (
      testVectorPoints.x1 === trueVectorPoints.x1 &&
      testVectorPoints.y1 === trueVectorPoints.y1 &&
      testVectorPoints.x2 === trueVectorPoints.x2 &&
      testVectorPoints.y2 === trueVectorPoints.y2
    ) {
      return {
        id: testVector.id,
        relatedId: trueVector.id,
        result: true
      };
    }

    return {
      id: testVector.id,
      result: false
    };
  }

  compareCircles(testCircle, trueCircle) {
    const testCirclePoints = {
      startX: +this.testAnswer.find(item => item.id === testCircle.subElementsIds.startPoint).x,
      startY: +this.testAnswer.find(item => item.id === testCircle.subElementsIds.startPoint).y,
      endX: +this.testAnswer.find(item => item.id === testCircle.subElementsIds.endPoint).x,
      endY: +this.testAnswer.find(item => item.id === testCircle.subElementsIds.endPoint).y
    };

    const trueCirclePoints = {
      startX: +this.trueAnswerValue.find(item => item.id === trueCircle.subElementsIds.startPoint).x,
      startY: +this.trueAnswerValue.find(item => item.id === trueCircle.subElementsIds.startPoint).y,
      endX: +this.trueAnswerValue.find(item => item.id === trueCircle.subElementsIds.endPoint).x,
      endY: +this.trueAnswerValue.find(item => item.id === trueCircle.subElementsIds.endPoint).y
    };

    let deltaX = testCirclePoints.startX - testCirclePoints.endX;
    let deltaY = testCirclePoints.startY - testCirclePoints.endY;
    const testCircleRadius = Math.sqrt(deltaX * deltaX + deltaY * deltaY).toFixed(FractionDigits);

    deltaX = trueCirclePoints.startX - trueCirclePoints.endX;
    deltaY = trueCirclePoints.startY - trueCirclePoints.endY;
    const trueCircleRadius = Math.sqrt(deltaX * deltaX + deltaY * deltaY).toFixed(FractionDigits);

    if (
      testCirclePoints.startX === trueCirclePoints.startX &&
      testCirclePoints.startY === trueCirclePoints.startY &&
      testCircleRadius === trueCircleRadius
    ) {
      return {
        id: testCircle.id,
        relatedId: trueCircle.id,
        result: true
      };
    }

    return {
      id: testCircle.id,
      result: false
    };
  }

  compareParabolas(testParabola, trueParabola) {
    const testParabolaPoints = {
      startX: +this.testAnswer.find(item => item.id === testParabola.subElementsIds.startPoint).x,
      startY: +this.testAnswer.find(item => item.id === testParabola.subElementsIds.startPoint).y,
      endX: +this.testAnswer.find(item => item.id === testParabola.subElementsIds.endPoint).x,
      endY: +this.testAnswer.find(item => item.id === testParabola.subElementsIds.endPoint).y
    };

    const trueParabolaPoints = {
      startX: +this.trueAnswerValue.find(item => item.id === trueParabola.subElementsIds.startPoint).x,
      startY: +this.trueAnswerValue.find(item => item.id === trueParabola.subElementsIds.startPoint).y,
      endX: +this.trueAnswerValue.find(item => item.id === trueParabola.subElementsIds.endPoint).x,
      endY: +this.trueAnswerValue.find(item => item.id === trueParabola.subElementsIds.endPoint).y
    };

    const testFunc = new ParabolaFunction(testParabolaPoints);
    const trueFunc = new ParabolaFunction(trueParabolaPoints);

    if (
      testParabolaPoints.startX === trueParabolaPoints.startX &&
      testParabolaPoints.startY === trueParabolaPoints.startY &&
      testFunc.getKoefA() === trueFunc.getKoefA()
    ) {
      return {
        id: testParabola.id,
        relatedId: trueParabola.id,
        result: true
      };
    }

    return {
      id: testParabola.id,
      result: false
    };
  }

  compareSines(testSine, trueSine) {
    const testSinePoints = {
      startX: +this.testAnswer.find(item => item.id === testSine.subElementsIds.startPoint).x,
      startY: +this.testAnswer.find(item => item.id === testSine.subElementsIds.startPoint).y,
      endX: +this.testAnswer.find(item => item.id === testSine.subElementsIds.endPoint).x,
      endY: +this.testAnswer.find(item => item.id === testSine.subElementsIds.endPoint).y
    };

    const trueSinePoints = {
      startX: +this.trueAnswerValue.find(item => item.id === trueSine.subElementsIds.startPoint).x,
      startY: +this.trueAnswerValue.find(item => item.id === trueSine.subElementsIds.startPoint).y,
      endX: +this.trueAnswerValue.find(item => item.id === trueSine.subElementsIds.endPoint).x,
      endY: +this.trueAnswerValue.find(item => item.id === trueSine.subElementsIds.endPoint).y
    };

    // amplitudes
    const testAmpl = Math.abs(testSinePoints.endY - testSinePoints.startY);
    const trueAmpl = Math.abs(trueSinePoints.endY - trueSinePoints.startY);
    // center lines
    const testCenterLine = testSinePoints.startY;
    const trueCenterLine = trueSinePoints.startY;
    // periods
    const testPeriod = (testSinePoints.endX - testSinePoints.startX) * 4;
    const truePeriod = (trueSinePoints.endX - trueSinePoints.startX) * 4;
    // offsets
    const testNormalX =
      testSinePoints.endY < testSinePoints.startY ? testSinePoints.startX + testPeriod / 2 : testSinePoints.startX;
    const trueNormalX =
      trueSinePoints.endY < trueSinePoints.startY ? trueSinePoints.startX + truePeriod / 2 : trueSinePoints.startX;
    let testOffset = testNormalX % testPeriod;
    if (testOffset < 0) {
      testOffset += testPeriod;
    }
    let trueOffset = trueNormalX % truePeriod;
    if (trueOffset < 0) {
      trueOffset += truePeriod;
    }

    if (
      testAmpl === trueAmpl &&
      testCenterLine === trueCenterLine &&
      testPeriod === truePeriod &&
      testOffset === trueOffset
    ) {
      return {
        id: testSine.id,
        relatedId: trueSine.id,
        result: true
      };
    }

    return {
      id: testSine.id,
      result: false
    };
  }

  comparePolygons(testPolygon, truePolygon) {
    const negativeResult = {
      id: testPolygon.id,
      result: false
    };

    const positiveResult = {
      id: testPolygon.id,
      relatedId: truePolygon.id,
      result: true
    };

    let testPolygonPoints = [];
    Object.getOwnPropertyNames(testPolygon.subElementsIds).forEach(value => {
      const pointId = testPolygon.subElementsIds[value];
      const point = this.testAnswer.find(item => item.id === pointId);
      testPolygonPoints.push({ x: point.x, y: point.y });
    });
    testPolygonPoints.pop();

    const truePolygonPoints = [];
    Object.getOwnPropertyNames(truePolygon.subElementsIds).forEach(value => {
      const pointId = truePolygon.subElementsIds[value];
      const point = this.trueAnswerValue.find(item => item.id === pointId);
      truePolygonPoints.push({ x: point.x, y: point.y });
    });
    truePolygonPoints.pop();

    if (testPolygonPoints.length !== truePolygonPoints.length) {
      return negativeResult;
    }

    // find first equal point
    let startIndex = -1;
    for (let i = 0; i < testPolygonPoints.length; i++) {
      if (testPolygonPoints[i].x === truePolygonPoints[0].x && testPolygonPoints[i].y === truePolygonPoints[0].y) {
        startIndex = i;
        break;
      }
    }

    if (startIndex === -1) {
      return negativeResult;
    }

    // set start point to array beginning
    const removed = testPolygonPoints.splice(0, startIndex);
    testPolygonPoints = testPolygonPoints.concat(removed);

    // check direct order
    let equalCount = 0;
    for (let i = 0; i < testPolygonPoints.length; i++) {
      if (testPolygonPoints[i].x === truePolygonPoints[i].x && testPolygonPoints[i].y === truePolygonPoints[i].y) {
        equalCount++;
      }
    }
    if (equalCount === truePolygonPoints.length) {
      return positiveResult;
    }

    // check reverse order
    testPolygonPoints.reverse();
    const last = testPolygonPoints.splice(testPolygonPoints.length - 1, 1);
    testPolygonPoints.unshift(last[0]);

    equalCount = 0;
    for (let i = 0; i < testPolygonPoints.length; i++) {
      if (testPolygonPoints[i].x === truePolygonPoints[i].x && testPolygonPoints[i].y === truePolygonPoints[i].y) {
        equalCount++;
      }
    }
    if (equalCount === truePolygonPoints.length) {
      return positiveResult;
    }

    return negativeResult;
  }

  compareEllipses(testEllipse, trueEllipse) {
    const testEllipsePoints = {
      focusPoint1X: +this.testAnswer.find(item => item.id === testEllipse.subElementsIds[0]).x,
      focusPoint1Y: +this.testAnswer.find(item => item.id === testEllipse.subElementsIds[0]).y,
      focusPoint2X: +this.testAnswer.find(item => item.id === testEllipse.subElementsIds[1]).x,
      focusPoint2Y: +this.testAnswer.find(item => item.id === testEllipse.subElementsIds[1]).y,
      linePointX: +this.testAnswer.find(item => item.id === testEllipse.subElementsIds[2]).x,
      linePointY: +this.testAnswer.find(item => item.id === testEllipse.subElementsIds[2]).y
    };

    const trueEllipsePoints = {
      focusPoint1X: +this.trueAnswerValue.find(item => item.id === trueEllipse.subElementsIds[0]).x,
      focusPoint1Y: +this.trueAnswerValue.find(item => item.id === trueEllipse.subElementsIds[0]).y,
      focusPoint2X: +this.trueAnswerValue.find(item => item.id === trueEllipse.subElementsIds[1]).x,
      focusPoint2Y: +this.trueAnswerValue.find(item => item.id === trueEllipse.subElementsIds[1]).y,
      linePointX: +this.trueAnswerValue.find(item => item.id === trueEllipse.subElementsIds[2]).x,
      linePointY: +this.trueAnswerValue.find(item => item.id === trueEllipse.subElementsIds[2]).y
    };

    const testFunc = new EllipseFunction(testEllipsePoints);
    const trueFunc = new EllipseFunction(trueEllipsePoints);

    const focusPointsAreMatched =
      (testEllipsePoints.focusPoint1X === trueEllipsePoints.focusPoint1X &&
        testEllipsePoints.focusPoint1Y === trueEllipsePoints.focusPoint1Y &&
        testEllipsePoints.focusPoint2X === trueEllipsePoints.focusPoint2X &&
        testEllipsePoints.focusPoint2Y === trueEllipsePoints.focusPoint2Y) ||
      (testEllipsePoints.focusPoint1X === trueEllipsePoints.focusPoint2X &&
        testEllipsePoints.focusPoint1Y === trueEllipsePoints.focusPoint2Y &&
        testEllipsePoints.focusPoint2X === trueEllipsePoints.focusPoint1X &&
        testEllipsePoints.focusPoint2Y === trueEllipsePoints.focusPoint1Y);

    if (focusPointsAreMatched && testFunc.getR1R2Sum() === trueFunc.getR1R2Sum()) {
      return {
        id: testEllipse.id,
        relatedId: trueEllipse.id,
        result: true
      };
    }

    return {
      id: testEllipse.id,
      result: false
    };
  }

  compareHyperbolas(testHyperbola, trueHyperbola) {
    const testHyperbolaPoints = {
      focusPoint1X: +this.testAnswer.find(item => item.id === testHyperbola.subElementsIds[0]).x,
      focusPoint1Y: +this.testAnswer.find(item => item.id === testHyperbola.subElementsIds[0]).y,
      focusPoint2X: +this.testAnswer.find(item => item.id === testHyperbola.subElementsIds[1]).x,
      focusPoint2Y: +this.testAnswer.find(item => item.id === testHyperbola.subElementsIds[1]).y,
      linePointX: +this.testAnswer.find(item => item.id === testHyperbola.subElementsIds[2]).x,
      linePointY: +this.testAnswer.find(item => item.id === testHyperbola.subElementsIds[2]).y
    };

    const trueHyperbolaPoints = {
      focusPoint1X: +this.trueAnswerValue.find(item => item.id === trueHyperbola.subElementsIds[0]).x,
      focusPoint1Y: +this.trueAnswerValue.find(item => item.id === trueHyperbola.subElementsIds[0]).y,
      focusPoint2X: +this.trueAnswerValue.find(item => item.id === trueHyperbola.subElementsIds[1]).x,
      focusPoint2Y: +this.trueAnswerValue.find(item => item.id === trueHyperbola.subElementsIds[1]).y,
      linePointX: +this.trueAnswerValue.find(item => item.id === trueHyperbola.subElementsIds[2]).x,
      linePointY: +this.trueAnswerValue.find(item => item.id === trueHyperbola.subElementsIds[2]).y
    };

    const testFunc = new HyperbolaFunction(testHyperbolaPoints);
    const trueFunc = new HyperbolaFunction(trueHyperbolaPoints);

    const focusPointsAreMatched =
      (testHyperbolaPoints.focusPoint1X === trueHyperbolaPoints.focusPoint1X &&
        testHyperbolaPoints.focusPoint1Y === trueHyperbolaPoints.focusPoint1Y &&
        testHyperbolaPoints.focusPoint2X === trueHyperbolaPoints.focusPoint2X &&
        testHyperbolaPoints.focusPoint2Y === trueHyperbolaPoints.focusPoint2Y) ||
      (testHyperbolaPoints.focusPoint1X === trueHyperbolaPoints.focusPoint2X &&
        testHyperbolaPoints.focusPoint1Y === trueHyperbolaPoints.focusPoint2Y &&
        testHyperbolaPoints.focusPoint2X === trueHyperbolaPoints.focusPoint1X &&
        testHyperbolaPoints.focusPoint2Y === trueHyperbolaPoints.focusPoint1Y);

    if (focusPointsAreMatched && testFunc.getR1R2Diff() === trueFunc.getR1R2Diff()) {
      return {
        id: testHyperbola.id,
        relatedId: trueHyperbola.id,
        result: true
      };
    }

    return {
      id: testHyperbola.id,
      result: false
    };
  }
}

export default CompareShapes;
