"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getPenaltyScore = _interopRequireDefault(require("./getPenaltyScore"));

var _rounding = require("../const/rounding");

var _getCalculateScores2 = _interopRequireDefault(require("./getCalculateScores"));

var partialMatchTemplate = function partialMatchTemplate(mainFunction, mainArguments) {
  var _mainArguments$valida = mainArguments.validation,
    penalty = _mainArguments$valida.penalty,
    rounding = _mainArguments$valida.rounding;
  var isRound = rounding === _rounding.rounding.ROUND_DOWN; // eslint-disable-next-line prefer-const

  var _mainFunction = mainFunction(mainArguments),
    score = _mainFunction.score,
    maxScore = _mainFunction.maxScore,
    evaluation = _mainFunction.evaluation,
    rightLen = _mainFunction.rightLen;

  score = (0, _getPenaltyScore.default)({
    score: score,
    penalty: penalty,
    evaluation: evaluation,
    rightLen: rightLen
  });

  var _getCalculateScores = (0, _getCalculateScores2.default)(score, maxScore, mainArguments.validation),
    newScore = _getCalculateScores.newScore,
    newMaxScore = _getCalculateScores.newMaxScore;

  return {
    score: isRound ? Math.floor(newScore) : +newScore.toFixed(4),
    maxScore: newMaxScore,
    evaluation: evaluation
  };
};

var _default = partialMatchTemplate;
exports.default = _default;
