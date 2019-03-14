"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cloneDeep2 = _interopRequireDefault(require("lodash/cloneDeep"));

var _getMatches = _interopRequireDefault(require("./getMatches"));

var _getEvaluation = _interopRequireDefault(require("./getEvaluation"));

var countPartialMatchScores = function countPartialMatchScores(compareFunction) {
  return function(_ref) {
    var answers = _ref.answers,
      _ref$userResponse = _ref.userResponse,
      userResponse = _ref$userResponse === void 0 ? [] : _ref$userResponse;
    var existingResponse = (0, _cloneDeep2.default)(userResponse);

    if (!Array.isArray(userResponse)) {
      existingResponse = (0, _cloneDeep2.default)(userResponse.value);
    }

    var score = 0;
    var maxScore = 1;
    var rightLen = 0;
    var rightIndex = 0;
    answers.forEach(function(_ref2, ind) {
      var answer = _ref2.value,
        totalScore = _ref2.score;

      if (!answer || !answer.length) {
        return;
      }

      var scorePerAnswer = totalScore / answer.length;
      var matches = (0, _getMatches.default)(existingResponse, answer, compareFunction);
      var currentScore = matches * scorePerAnswer;
      score = Math.max(score, currentScore);
      maxScore = Math.max(maxScore, totalScore);

      if (currentScore === score) {
        rightLen = answer.length;
        rightIndex = ind;
      }
    });
    var evaluation = (0, _getEvaluation.default)(existingResponse, answers, rightIndex, compareFunction);
    return {
      score: score,
      maxScore: maxScore,
      rightLen: rightLen,
      evaluation: evaluation
    };
  };
};

var _default = countPartialMatchScores;
exports.default = _default;
