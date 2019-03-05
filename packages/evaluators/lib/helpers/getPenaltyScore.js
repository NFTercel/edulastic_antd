"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var getPenaltyScore = function getPenaltyScore(_ref) {
  var score = _ref.score,
    evaluation = _ref.evaluation,
    penalty = _ref.penalty,
    rightLen = _ref.rightLen;

  if (penalty <= 0) {
    return score;
  }

  var count = rightLen || Object.keys(evaluation).length;
  var wrongCount = Object.values(evaluation).reduce(function(acc, val) {
    if (!val) {
      acc += 1;
    }

    return acc;
  }, 0);
  var result = score - (penalty / count) * wrongCount;
  return result < 0 ? 0 : result;
};

var _default = getPenaltyScore;
exports.default = _default;
