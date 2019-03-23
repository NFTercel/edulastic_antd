"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _shapeTypes = require("./constants/shapeTypes");

var _fractionDigits = require("./constants/fractionDigits");

var _lineFunction = _interopRequireDefault(require("./lineFunction"));

var _parabolaFunction = _interopRequireDefault(require("./parabolaFunction"));

var _ellipseFunction = _interopRequireDefault(require("./ellipseFunction"));

var _hyperbolaFunction = _interopRequireDefault(require("./hyperbolaFunction"));

var CompareShapes =
  /*#__PURE__*/
  (function() {
    function CompareShapes(trueAnswerValue, testAnswer) {
      (0, _classCallCheck2.default)(this, CompareShapes);
      this.trueAnswerValue = trueAnswerValue;
      this.testAnswer = testAnswer;
    }

    (0, _createClass2.default)(
      CompareShapes,
      [
        {
          key: "compare",
          value: function compare(testId, trueId) {
            var testShape = this.testAnswer.find(function(item) {
              return item.id === testId;
            });
            var trueShape = this.trueAnswerValue.find(function(item) {
              return item.id === trueId;
            });

            if (!testShape || !trueShape || testShape.type !== trueShape.type) {
              return {
                id: testId,
                result: false
              };
            }

            switch (testShape.type) {
              case _shapeTypes.ShapeTypes.POINT:
                return CompareShapes.comparePoints(testShape, trueShape);

              case _shapeTypes.ShapeTypes.LINE:
                return this.compareLines(testShape, trueShape);

              case _shapeTypes.ShapeTypes.RAY:
                return this.compareRays(testShape, trueShape);

              case _shapeTypes.ShapeTypes.SEGMENT:
                return this.compareSegments(testShape, trueShape);

              case _shapeTypes.ShapeTypes.VECTOR:
                return this.compareVectors(testShape, trueShape);

              case _shapeTypes.ShapeTypes.CIRCLE:
                return this.compareCircles(testShape, trueShape);

              case _shapeTypes.ShapeTypes.PARABOLA:
                return this.compareParabolas(testShape, trueShape);

              case _shapeTypes.ShapeTypes.SINE:
              case _shapeTypes.ShapeTypes.TANGENT:
              case _shapeTypes.ShapeTypes.SECANT:
                return this.compareSines(testShape, trueShape);

              case _shapeTypes.ShapeTypes.POLYGON:
                return this.comparePolygons(testShape, trueShape);

              case _shapeTypes.ShapeTypes.ELLIPSE:
                return this.compareEllipses(testShape, trueShape);

              case _shapeTypes.ShapeTypes.HYPERBOLA:
                return this.compareHyperbolas(testShape, trueShape);

              default:
                return {
                  id: testId,
                  result: false
                };
            }
          }
        },
        {
          key: "compareLines",
          value: function compareLines(testLine, trueLine) {
            var testLinePoints = {
              x1: +this.testAnswer.find(function(item) {
                return item.id === testLine.subElementsIds.startPoint;
              }).x,
              y1: +this.testAnswer.find(function(item) {
                return item.id === testLine.subElementsIds.startPoint;
              }).y,
              x2: +this.testAnswer.find(function(item) {
                return item.id === testLine.subElementsIds.endPoint;
              }).x,
              y2: +this.testAnswer.find(function(item) {
                return item.id === testLine.subElementsIds.endPoint;
              }).y
            };
            var trueLinePoints = {
              x1: +this.trueAnswerValue.find(function(item) {
                return item.id === trueLine.subElementsIds.startPoint;
              }).x,
              y1: +this.trueAnswerValue.find(function(item) {
                return item.id === trueLine.subElementsIds.startPoint;
              }).y,
              x2: +this.trueAnswerValue.find(function(item) {
                return item.id === trueLine.subElementsIds.endPoint;
              }).x,
              y2: +this.trueAnswerValue.find(function(item) {
                return item.id === trueLine.subElementsIds.endPoint;
              }).y
            };
            var testLineFunc = new _lineFunction.default(testLinePoints);
            var trueLineFunc = new _lineFunction.default(trueLinePoints);

            if (
              testLineFunc.getKoefA() === trueLineFunc.getKoefA() &&
              testLineFunc.getKoefB() === trueLineFunc.getKoefB()
            ) {
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
        },
        {
          key: "compareRays",
          value: function compareRays(testRay, trueRay) {
            var testRayPoints = {
              x1: +this.testAnswer.find(function(item) {
                return item.id === testRay.subElementsIds.startPoint;
              }).x,
              y1: +this.testAnswer.find(function(item) {
                return item.id === testRay.subElementsIds.startPoint;
              }).y,
              x2: +this.testAnswer.find(function(item) {
                return item.id === testRay.subElementsIds.endPoint;
              }).x,
              y2: +this.testAnswer.find(function(item) {
                return item.id === testRay.subElementsIds.endPoint;
              }).y
            };
            var trueRayPoints = {
              x1: +this.trueAnswerValue.find(function(item) {
                return item.id === trueRay.subElementsIds.startPoint;
              }).x,
              y1: +this.trueAnswerValue.find(function(item) {
                return item.id === trueRay.subElementsIds.startPoint;
              }).y,
              x2: +this.trueAnswerValue.find(function(item) {
                return item.id === trueRay.subElementsIds.endPoint;
              }).x,
              y2: +this.trueAnswerValue.find(function(item) {
                return item.id === trueRay.subElementsIds.endPoint;
              }).y
            };
            var testRayParams = {
              deltaX: testRayPoints.x2 - testRayPoints.x1,
              deltaY: testRayPoints.y2 - testRayPoints.y1
            };
            testRayParams.koef =
              testRayParams.deltaX === 0
                ? "NaN"
                : (testRayParams.deltaY / testRayParams.deltaX).toFixed(_fractionDigits.FractionDigits);
            var trueRayParams = {
              deltaX: trueRayPoints.x2 - trueRayPoints.x1,
              deltaY: trueRayPoints.y2 - trueRayPoints.y1
            };
            trueRayParams.koef =
              trueRayParams.deltaX === 0
                ? "NaN"
                : (trueRayParams.deltaY / trueRayParams.deltaX).toFixed(_fractionDigits.FractionDigits);

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
        },
        {
          key: "compareSegments",
          value: function compareSegments(testSegment, trueSegment) {
            var testSegmentPoints = {
              x1: +this.testAnswer.find(function(item) {
                return item.id === testSegment.subElementsIds.startPoint;
              }).x,
              y1: +this.testAnswer.find(function(item) {
                return item.id === testSegment.subElementsIds.startPoint;
              }).y,
              x2: +this.testAnswer.find(function(item) {
                return item.id === testSegment.subElementsIds.endPoint;
              }).x,
              y2: +this.testAnswer.find(function(item) {
                return item.id === testSegment.subElementsIds.endPoint;
              }).y
            };
            var trueSegmentPoints = {
              x1: +this.trueAnswerValue.find(function(item) {
                return item.id === trueSegment.subElementsIds.startPoint;
              }).x,
              y1: +this.trueAnswerValue.find(function(item) {
                return item.id === trueSegment.subElementsIds.startPoint;
              }).y,
              x2: +this.trueAnswerValue.find(function(item) {
                return item.id === trueSegment.subElementsIds.endPoint;
              }).x,
              y2: +this.trueAnswerValue.find(function(item) {
                return item.id === trueSegment.subElementsIds.endPoint;
              }).y
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
        },
        {
          key: "compareVectors",
          value: function compareVectors(testVector, trueVector) {
            var testVectorPoints = {
              x1: +this.testAnswer.find(function(item) {
                return item.id === testVector.subElementsIds.startPoint;
              }).x,
              y1: +this.testAnswer.find(function(item) {
                return item.id === testVector.subElementsIds.startPoint;
              }).y,
              x2: +this.testAnswer.find(function(item) {
                return item.id === testVector.subElementsIds.endPoint;
              }).x,
              y2: +this.testAnswer.find(function(item) {
                return item.id === testVector.subElementsIds.endPoint;
              }).y
            };
            var trueVectorPoints = {
              x1: +this.trueAnswerValue.find(function(item) {
                return item.id === trueVector.subElementsIds.startPoint;
              }).x,
              y1: +this.trueAnswerValue.find(function(item) {
                return item.id === trueVector.subElementsIds.startPoint;
              }).y,
              x2: +this.trueAnswerValue.find(function(item) {
                return item.id === trueVector.subElementsIds.endPoint;
              }).x,
              y2: +this.trueAnswerValue.find(function(item) {
                return item.id === trueVector.subElementsIds.endPoint;
              }).y
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
        },
        {
          key: "compareCircles",
          value: function compareCircles(testCircle, trueCircle) {
            var testCirclePoints = {
              startX: +this.testAnswer.find(function(item) {
                return item.id === testCircle.subElementsIds.startPoint;
              }).x,
              startY: +this.testAnswer.find(function(item) {
                return item.id === testCircle.subElementsIds.startPoint;
              }).y,
              endX: +this.testAnswer.find(function(item) {
                return item.id === testCircle.subElementsIds.endPoint;
              }).x,
              endY: +this.testAnswer.find(function(item) {
                return item.id === testCircle.subElementsIds.endPoint;
              }).y
            };
            var trueCirclePoints = {
              startX: +this.trueAnswerValue.find(function(item) {
                return item.id === trueCircle.subElementsIds.startPoint;
              }).x,
              startY: +this.trueAnswerValue.find(function(item) {
                return item.id === trueCircle.subElementsIds.startPoint;
              }).y,
              endX: +this.trueAnswerValue.find(function(item) {
                return item.id === trueCircle.subElementsIds.endPoint;
              }).x,
              endY: +this.trueAnswerValue.find(function(item) {
                return item.id === trueCircle.subElementsIds.endPoint;
              }).y
            };
            var deltaX = testCirclePoints.startX - testCirclePoints.endX;
            var deltaY = testCirclePoints.startY - testCirclePoints.endY;
            var testCircleRadius = Math.sqrt(deltaX * deltaX + deltaY * deltaY).toFixed(_fractionDigits.FractionDigits);
            deltaX = trueCirclePoints.startX - trueCirclePoints.endX;
            deltaY = trueCirclePoints.startY - trueCirclePoints.endY;
            var trueCircleRadius = Math.sqrt(deltaX * deltaX + deltaY * deltaY).toFixed(_fractionDigits.FractionDigits);

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
        },
        {
          key: "compareParabolas",
          value: function compareParabolas(testParabola, trueParabola) {
            var testParabolaPoints = {
              startX: +this.testAnswer.find(function(item) {
                return item.id === testParabola.subElementsIds.startPoint;
              }).x,
              startY: +this.testAnswer.find(function(item) {
                return item.id === testParabola.subElementsIds.startPoint;
              }).y,
              endX: +this.testAnswer.find(function(item) {
                return item.id === testParabola.subElementsIds.endPoint;
              }).x,
              endY: +this.testAnswer.find(function(item) {
                return item.id === testParabola.subElementsIds.endPoint;
              }).y
            };
            var trueParabolaPoints = {
              startX: +this.trueAnswerValue.find(function(item) {
                return item.id === trueParabola.subElementsIds.startPoint;
              }).x,
              startY: +this.trueAnswerValue.find(function(item) {
                return item.id === trueParabola.subElementsIds.startPoint;
              }).y,
              endX: +this.trueAnswerValue.find(function(item) {
                return item.id === trueParabola.subElementsIds.endPoint;
              }).x,
              endY: +this.trueAnswerValue.find(function(item) {
                return item.id === trueParabola.subElementsIds.endPoint;
              }).y
            };
            var testFunc = new _parabolaFunction.default(testParabolaPoints);
            var trueFunc = new _parabolaFunction.default(trueParabolaPoints);

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
        },
        {
          key: "compareSines",
          value: function compareSines(testSine, trueSine) {
            var testSinePoints = {
              startX: +this.testAnswer.find(function(item) {
                return item.id === testSine.subElementsIds.startPoint;
              }).x,
              startY: +this.testAnswer.find(function(item) {
                return item.id === testSine.subElementsIds.startPoint;
              }).y,
              endX: +this.testAnswer.find(function(item) {
                return item.id === testSine.subElementsIds.endPoint;
              }).x,
              endY: +this.testAnswer.find(function(item) {
                return item.id === testSine.subElementsIds.endPoint;
              }).y
            };
            var trueSinePoints = {
              startX: +this.trueAnswerValue.find(function(item) {
                return item.id === trueSine.subElementsIds.startPoint;
              }).x,
              startY: +this.trueAnswerValue.find(function(item) {
                return item.id === trueSine.subElementsIds.startPoint;
              }).y,
              endX: +this.trueAnswerValue.find(function(item) {
                return item.id === trueSine.subElementsIds.endPoint;
              }).x,
              endY: +this.trueAnswerValue.find(function(item) {
                return item.id === trueSine.subElementsIds.endPoint;
              }).y
            }; // amplitudes

            var testAmpl = Math.abs(testSinePoints.endY - testSinePoints.startY);
            var trueAmpl = Math.abs(trueSinePoints.endY - trueSinePoints.startY); // center lines

            var testCenterLine = testSinePoints.startY;
            var trueCenterLine = trueSinePoints.startY; // periods

            var testPeriod = (testSinePoints.endX - testSinePoints.startX) * 4;
            var truePeriod = (trueSinePoints.endX - trueSinePoints.startX) * 4; // offsets

            var testNormalX =
              testSinePoints.endY < testSinePoints.startY
                ? testSinePoints.startX + testPeriod / 2
                : testSinePoints.startX;
            var trueNormalX =
              trueSinePoints.endY < trueSinePoints.startY
                ? trueSinePoints.startX + truePeriod / 2
                : trueSinePoints.startX;
            var testOffset = testNormalX % testPeriod;

            if (testOffset < 0) {
              testOffset += testPeriod;
            }

            var trueOffset = trueNormalX % truePeriod;

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
        },
        {
          key: "comparePolygons",
          value: function comparePolygons(testPolygon, truePolygon) {
            var _this = this;

            var negativeResult = {
              id: testPolygon.id,
              result: false
            };
            var positiveResult = {
              id: testPolygon.id,
              relatedId: truePolygon.id,
              result: true
            };
            var testPolygonPoints = [];
            Object.getOwnPropertyNames(testPolygon.subElementsIds).forEach(function(value) {
              var pointId = testPolygon.subElementsIds[value];

              var point = _this.testAnswer.find(function(item) {
                return item.id === pointId;
              });

              testPolygonPoints.push({
                x: point.x,
                y: point.y
              });
            });
            testPolygonPoints.pop();
            var truePolygonPoints = [];
            Object.getOwnPropertyNames(truePolygon.subElementsIds).forEach(function(value) {
              var pointId = truePolygon.subElementsIds[value];

              var point = _this.trueAnswerValue.find(function(item) {
                return item.id === pointId;
              });

              truePolygonPoints.push({
                x: point.x,
                y: point.y
              });
            });
            truePolygonPoints.pop();

            if (testPolygonPoints.length !== truePolygonPoints.length) {
              return negativeResult;
            } // find first equal point

            var startIndex = -1;

            for (var i = 0; i < testPolygonPoints.length; i++) {
              if (
                testPolygonPoints[i].x === truePolygonPoints[0].x &&
                testPolygonPoints[i].y === truePolygonPoints[0].y
              ) {
                startIndex = i;
                break;
              }
            }

            if (startIndex === -1) {
              return negativeResult;
            } // set start point to array beginning

            var removed = testPolygonPoints.splice(0, startIndex);
            testPolygonPoints = testPolygonPoints.concat(removed); // check direct order

            var equalCount = 0;

            for (var _i = 0; _i < testPolygonPoints.length; _i++) {
              if (
                testPolygonPoints[_i].x === truePolygonPoints[_i].x &&
                testPolygonPoints[_i].y === truePolygonPoints[_i].y
              ) {
                equalCount++;
              }
            }

            if (equalCount === truePolygonPoints.length) {
              return positiveResult;
            } // check reverse order

            testPolygonPoints.reverse();
            var last = testPolygonPoints.splice(testPolygonPoints.length - 1, 1);
            testPolygonPoints.unshift(last[0]);
            equalCount = 0;

            for (var _i2 = 0; _i2 < testPolygonPoints.length; _i2++) {
              if (
                testPolygonPoints[_i2].x === truePolygonPoints[_i2].x &&
                testPolygonPoints[_i2].y === truePolygonPoints[_i2].y
              ) {
                equalCount++;
              }
            }

            if (equalCount === truePolygonPoints.length) {
              return positiveResult;
            }

            return negativeResult;
          }
        },
        {
          key: "compareEllipses",
          value: function compareEllipses(testEllipse, trueEllipse) {
            var testEllipsePoints = {
              focusPoint1X: +this.testAnswer.find(function(item) {
                return item.id === testEllipse.subElementsIds[0];
              }).x,
              focusPoint1Y: +this.testAnswer.find(function(item) {
                return item.id === testEllipse.subElementsIds[0];
              }).y,
              focusPoint2X: +this.testAnswer.find(function(item) {
                return item.id === testEllipse.subElementsIds[1];
              }).x,
              focusPoint2Y: +this.testAnswer.find(function(item) {
                return item.id === testEllipse.subElementsIds[1];
              }).y,
              linePointX: +this.testAnswer.find(function(item) {
                return item.id === testEllipse.subElementsIds[2];
              }).x,
              linePointY: +this.testAnswer.find(function(item) {
                return item.id === testEllipse.subElementsIds[2];
              }).y
            };
            var trueEllipsePoints = {
              focusPoint1X: +this.trueAnswerValue.find(function(item) {
                return item.id === trueEllipse.subElementsIds[0];
              }).x,
              focusPoint1Y: +this.trueAnswerValue.find(function(item) {
                return item.id === trueEllipse.subElementsIds[0];
              }).y,
              focusPoint2X: +this.trueAnswerValue.find(function(item) {
                return item.id === trueEllipse.subElementsIds[1];
              }).x,
              focusPoint2Y: +this.trueAnswerValue.find(function(item) {
                return item.id === trueEllipse.subElementsIds[1];
              }).y,
              linePointX: +this.trueAnswerValue.find(function(item) {
                return item.id === trueEllipse.subElementsIds[2];
              }).x,
              linePointY: +this.trueAnswerValue.find(function(item) {
                return item.id === trueEllipse.subElementsIds[2];
              }).y
            };
            var testFunc = new _ellipseFunction.default(testEllipsePoints);
            var trueFunc = new _ellipseFunction.default(trueEllipsePoints);
            var focusPointsAreMatched =
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
        },
        {
          key: "compareHyperbolas",
          value: function compareHyperbolas(testHyperbola, trueHyperbola) {
            var testHyperbolaPoints = {
              focusPoint1X: +this.testAnswer.find(function(item) {
                return item.id === testHyperbola.subElementsIds[0];
              }).x,
              focusPoint1Y: +this.testAnswer.find(function(item) {
                return item.id === testHyperbola.subElementsIds[0];
              }).y,
              focusPoint2X: +this.testAnswer.find(function(item) {
                return item.id === testHyperbola.subElementsIds[1];
              }).x,
              focusPoint2Y: +this.testAnswer.find(function(item) {
                return item.id === testHyperbola.subElementsIds[1];
              }).y,
              linePointX: +this.testAnswer.find(function(item) {
                return item.id === testHyperbola.subElementsIds[2];
              }).x,
              linePointY: +this.testAnswer.find(function(item) {
                return item.id === testHyperbola.subElementsIds[2];
              }).y
            };
            var trueHyperbolaPoints = {
              focusPoint1X: +this.trueAnswerValue.find(function(item) {
                return item.id === trueHyperbola.subElementsIds[0];
              }).x,
              focusPoint1Y: +this.trueAnswerValue.find(function(item) {
                return item.id === trueHyperbola.subElementsIds[0];
              }).y,
              focusPoint2X: +this.trueAnswerValue.find(function(item) {
                return item.id === trueHyperbola.subElementsIds[1];
              }).x,
              focusPoint2Y: +this.trueAnswerValue.find(function(item) {
                return item.id === trueHyperbola.subElementsIds[1];
              }).y,
              linePointX: +this.trueAnswerValue.find(function(item) {
                return item.id === trueHyperbola.subElementsIds[2];
              }).x,
              linePointY: +this.trueAnswerValue.find(function(item) {
                return item.id === trueHyperbola.subElementsIds[2];
              }).y
            };
            var testFunc = new _hyperbolaFunction.default(testHyperbolaPoints);
            var trueFunc = new _hyperbolaFunction.default(trueHyperbolaPoints);
            var focusPointsAreMatched =
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
      ],
      [
        {
          key: "comparePoints",
          value: function comparePoints(testPoint, truePoint) {
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
        }
      ]
    );
    return CompareShapes;
  })();

var _default = CompareShapes;
exports.default = _default;
