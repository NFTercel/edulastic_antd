"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _fractionDigits = require("./constants/fractionDigits");

var HyperbolaFunction =
  /*#__PURE__*/
  (function() {
    function HyperbolaFunction(points) {
      (0, _classCallCheck2.default)(this, HyperbolaFunction);
      this.focusPoint1X = +points.focusPoint1X;
      this.focusPoint1Y = +points.focusPoint1Y;
      this.focusPoint2X = +points.focusPoint2X;
      this.focusPoint2Y = +points.focusPoint2Y;
      this.linePointX = +points.linePointX;
      this.linePointY = +points.linePointY;
    }

    (0, _createClass2.default)(HyperbolaFunction, [
      {
        key: "getR1R2Diff",
        value: function getR1R2Diff() {
          var r1 = Math.sqrt(
            (this.focusPoint1X - this.linePointX) * (this.focusPoint1X - this.linePointX) +
              (this.focusPoint1Y - this.linePointY) * (this.focusPoint1Y - this.linePointY)
          );
          var r2 = Math.sqrt(
            (this.focusPoint2X - this.linePointX) * (this.focusPoint2X - this.linePointX) +
              (this.focusPoint2Y - this.linePointY) * (this.focusPoint2Y - this.linePointY)
          );
          return Math.abs(r1 - r2).toFixed(_fractionDigits.FractionDigits);
        }
      }
    ]);
    return HyperbolaFunction;
  })();

var _default = HyperbolaFunction;
exports.default = _default;
