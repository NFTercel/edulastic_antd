"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// eslint-disable-next-line max-len
var getCalculateScores = function getCalculateScores(score, maxScore, _ref) {
  var min_score_if_attempted = _ref.min_score_if_attempted,
    automarkable = _ref.automarkable,
    max_score = _ref.max_score;
  var newScore = score;
  var newMaxScore = maxScore;

  if (automarkable) {
    if (min_score_if_attempted) {
      newMaxScore = Math.max(maxScore, min_score_if_attempted);
      newScore = Math.max(min_score_if_attempted, score);
    }
  } else if (max_score) {
    newMaxScore = Math.max(max_score, maxScore);
  }

  return {
    newScore: newScore,
    newMaxScore: newMaxScore
  };
};

var _default = getCalculateScores;
exports.default = _default;
