"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("@edulastic/constants");

var _mainEvaluator = _interopRequireDefault(require("./mainEvaluator"));

var evaluator = (0, _mainEvaluator.default)(_constants.evaluatorTypes.INNER_DIFFERENCE);
var _default = evaluator;
exports.default = _default;
