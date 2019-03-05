"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _fractionDigits = require("./constants/fractionDigits");

var LineFunction =
/*#__PURE__*/
function () {
  function LineFunction(points) {
    (0, _classCallCheck2.default)(this, LineFunction);
    this.x1 = +points.x1;
    this.y1 = +points.y1;
    this.x2 = +points.x2;
    this.y2 = +points.y2;
  }

  (0, _createClass2.default)(LineFunction, [{
    key: "getKoefA",
    value: function getKoefA() {
      if (this.x1 === this.x2) {
        return 'NaN';
      }

      var koefA = (this.y2 - this.y1) / (this.x2 - this.x1);
      return koefA.toFixed(_fractionDigits.FractionDigits);
    }
  }, {
    key: "getKoefB",
    value: function getKoefB() {
      if (this.x1 === this.x2) {
        return 'NaN';
      }

      var koefB = (this.y2 * this.x1 - this.y1 * this.x2) / (this.x1 - this.x2);
      return koefB.toFixed(_fractionDigits.FractionDigits);
    }
  }]);
  return LineFunction;
}();

var _default = LineFunction;
exports.default = _default;