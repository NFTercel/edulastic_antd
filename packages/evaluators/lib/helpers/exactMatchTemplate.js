"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getCalculateScores2 = _interopRequireDefault(require("./getCalculateScores"));

var exactMatchTemplate = function exactMatchTemplate(mainFunction, mainArguments) {
  // eslint-disable-next-line prefer-const
  var _mainFunction = mainFunction(mainArguments),
    score = _mainFunction.score,
    maxScore = _mainFunction.maxScore,
    evaluation = _mainFunction.evaluation;

  var _getCalculateScores = (0, _getCalculateScores2.default)(score, maxScore, mainArguments.validation),
    newScore = _getCalculateScores.newScore,
    newMaxScore = _getCalculateScores.newMaxScore;

  return {
    score: newScore,
    maxScore: newMaxScore,
    evaluation: evaluation
  };
};

var _default = exactMatchTemplate;
exports.default = _default;
