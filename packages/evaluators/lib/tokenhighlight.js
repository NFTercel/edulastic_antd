"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _intersection2 = _interopRequireDefault(require("lodash/intersection"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _scoring = require("./const/scoring");

var _exactMatchTemplate = _interopRequireDefault(require("./helpers/exactMatchTemplate"));

var _partialMatchTemplate = _interopRequireDefault(require("./helpers/partialMatchTemplate"));

// exact-match evaluator
var exactMatchEvaluator = function exactMatchEvaluator(_ref) {
  var _ref$userResponse = _ref.userResponse,
    userResponse = _ref$userResponse === void 0 ? [] : _ref$userResponse,
    answers = _ref.answers;
  var score = 0;
  var maxScore = 1;
  var evaluation = [];
  var userAnswer = userResponse
    .filter(function(ans) {
      return ans.selected;
    })
    .map(function(ans) {
      return ans.index;
    });
  answers.forEach(function(_ref2) {
    var totalScore = _ref2.score,
      answer = _ref2.value;
    var currentAnswer = answer
      .filter(function(ans) {
        return ans.selected;
      })
      .map(function(ans) {
        return ans.index;
      });

    if ((0, _isEqual2.default)(currentAnswer, userAnswer)) {
      score = Math.max(score, totalScore);
    }

    maxScore = Math.max(maxScore, totalScore);
  });

  if (score !== 0) {
    evaluation = Array.from({
      length: userAnswer.length
    }).fill(true);
  } else {
    evaluation = Array.from({
      length: userAnswer.length
    }).fill(false);
  }

  return {
    score: score,
    maxScore: maxScore,
    evaluation: evaluation
  };
};

var partialMatchEvaluator = function partialMatchEvaluator(_ref3) {
  var _ref3$userResponse = _ref3.userResponse,
    userResponse = _ref3$userResponse === void 0 ? [] : _ref3$userResponse,
    answers = _ref3.answers;
  var score = 0;
  var maxScore = 1;
  var rightLen = 0;
  var evaluation = [];
  var userAnswer = userResponse
    .filter(function(ans) {
      return ans.selected;
    })
    .map(function(ans) {
      return ans.index;
    });
  var validAnswer = [];
  answers.forEach(function(_ref4) {
    var totalScore = _ref4.score,
      answer = _ref4.value;
    var currentAnswer = answer
      .filter(function(ans) {
        return ans.selected;
      })
      .map(function(ans) {
        return ans.index;
      });
    var scorePerResponse = totalScore / currentAnswer.length;
    var currentScore = scorePerResponse * (0, _intersection2.default)(userAnswer, currentAnswer).length;
    score = Math.max(currentScore, score);
    maxScore = Math.max(maxScore, totalScore);

    if (currentScore === score && score !== 0) {
      rightLen = currentAnswer.length;
      validAnswer = currentAnswer;
    }
  });
  evaluation = userAnswer.map(function(ans) {
    return validAnswer.includes(ans);
  });
  return {
    score: score,
    maxScore: maxScore,
    rightLen: rightLen,
    evaluation: evaluation
  };
};

var evaluator = function evaluator(_ref5) {
  var userResponse = _ref5.userResponse,
    validation = _ref5.validation;
  var valid_response = validation.valid_response,
    alt_responses = validation.alt_responses,
    scoring_type = validation.scoring_type;
  var answers = [valid_response].concat((0, _toConsumableArray2.default)(alt_responses));

  switch (scoring_type) {
    case _scoring.ScoringType.EXACT_MATCH:
      return (0, _exactMatchTemplate.default)(exactMatchEvaluator, {
        userResponse: userResponse,
        answers: answers,
        validation: validation
      });

    case _scoring.ScoringType.PARTIAL_MATCH:
    case _scoring.ScoringType.PARTIAL_MATCH_V2:
    default:
      return (0, _partialMatchTemplate.default)(partialMatchEvaluator, {
        userResponse: userResponse,
        answers: answers,
        validation: validation
      });
  }
};

var _default = evaluator;
exports.default = _default;
