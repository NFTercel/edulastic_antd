"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _scoring = require("./const/scoring");

var _partialMatchTemplate = _interopRequireDefault(require("./helpers/partialMatchTemplate"));

var _exactMatchTemplate = _interopRequireDefault(require("./helpers/exactMatchTemplate"));

var exactCompareFunction = function exactCompareFunction(_ref) {
  var answers = _ref.answers,
    _ref$userResponse = _ref.userResponse,
    userResponse = _ref$userResponse === void 0 ? [] : _ref$userResponse;
  var score = 0;
  var maxScore = 1;
  var rightIndex = 0;
  answers.forEach(function(_ref2, ind) {
    var answer = _ref2.value,
      totalScore = _ref2.score;

    if (!answer || !answer.length) {
      return;
    }

    var matches = 0;
    var totalMatches = (0, _reduce2.default)(
      answer,
      function(acc, array) {
        var sum = 0;
        array.forEach(function() {
          sum++;
        });
        return acc + sum;
      },
      0
    );
    userResponse.forEach(function(col, colIndex) {
      col.forEach(function(ans) {
        if ((0, _includes2.default)(answer[colIndex], ans)) {
          matches++;
        }
      });
    });
    var currentScore = matches === totalMatches ? totalScore : 0;
    score = Math.max(score, currentScore);
    maxScore = Math.max(maxScore, totalScore);

    if (currentScore === score && score !== 0) {
      rightIndex = ind;
    }
  });
  var evaluation = [];
  var currentIndex = 0;
  userResponse.forEach(function(col, colIndex) {
    col.forEach(function(ans) {
      evaluation[currentIndex] = answers[rightIndex].value[colIndex].includes(ans);
      currentIndex++;
    });
  });
  return {
    score: score,
    maxScore: maxScore,
    evaluation: evaluation
  };
};

var partialCompareFunction = function partialCompareFunction(_ref3) {
  var answers = _ref3.answers,
    _ref3$userResponse = _ref3.userResponse,
    userResponse = _ref3$userResponse === void 0 ? [] : _ref3$userResponse;
  var score = 0;
  var maxScore = 1;
  var rightIndex = 0;
  answers.forEach(function(_ref4, ind) {
    var answer = _ref4.value,
      totalScore = _ref4.score;

    if (!answer || !answer.length) {
      return;
    }

    var matches = 0;
    var totalMatches = 0;
    userResponse.forEach(function(col, colIndex) {
      col.forEach(function(ans) {
        totalMatches++;

        if ((0, _includes2.default)(answer[colIndex], ans)) {
          matches++;
        }
      });
    });
    var scorePerAnswer = totalScore / totalMatches;
    var currentScore = matches * scorePerAnswer;
    score = Math.max(score, currentScore);
    maxScore = Math.max(maxScore, totalScore);

    if (currentScore === score) {
      rightIndex = ind;
    }
  });
  var evaluation = [];
  var currentIndex = 0;
  userResponse.forEach(function(col, colIndex) {
    col.forEach(function(ans) {
      evaluation[currentIndex] = answers[rightIndex].value[colIndex].includes(ans);
      currentIndex++;
    });
  });
  return {
    score: score,
    maxScore: maxScore,
    evaluation: evaluation
  };
};

var evaluator = function evaluator(_ref5) {
  var _ref5$userResponse = _ref5.userResponse,
    userResponse = _ref5$userResponse === void 0 ? [] : _ref5$userResponse,
    validation = _ref5.validation;
  var valid_response = validation.valid_response,
    alt_responses = validation.alt_responses,
    scoring_type = validation.scoring_type;
  var answers = [valid_response].concat((0, _toConsumableArray2.default)(alt_responses));

  switch (scoring_type) {
    case _scoring.ScoringType.EXACT_MATCH:
      return (0, _exactMatchTemplate.default)(exactCompareFunction, {
        userResponse: userResponse,
        answers: answers,
        validation: validation
      });

    case _scoring.ScoringType.PARTIAL_MATCH:
    case _scoring.ScoringType.PARTIAL_MATCH_V2:
    default:
      return (0, _partialMatchTemplate.default)(partialCompareFunction, {
        userResponse: userResponse,
        answers: answers,
        validation: validation
      });
  }
};

var _default = evaluator;
exports.default = _default;
