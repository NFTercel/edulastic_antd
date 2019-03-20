"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _scoring = require("../const/scoring");

var checkAnswer = function checkAnswer(answer, userResponse) {
  var result = [];
  var trueAnswerValue = answer.value;
  userResponse.forEach(function(testLabel) {
    var resultForLabel = {
      label: testLabel,
      result: false
    };

    if (
      trueAnswerValue.findIndex(function(item) {
        return item.point === testLabel.point && item.position === testLabel.position;
      }) > -1
    ) {
      resultForLabel.result = true;
    }

    result.push(resultForLabel);
  });
  return result;
};

var exactMatchEvaluator = function exactMatchEvaluator(userResponse, answers) {
  var score = 0;
  var maxScore = 1;
  var evaluation = {};
  answers.forEach(function(answer, index) {
    var answerResult = {
      result: false,
      details: checkAnswer(answer, userResponse),
      score: 0
    };
    var trueLabelsCount = answerResult.details.filter(function(item) {
      return item.result;
    }).length;
    var allIsTrue = trueLabelsCount === answerResult.details.length;
    answerResult.result = answer.value.length === userResponse.length && allIsTrue;

    if (answerResult.result) {
      answerResult.score = answer.score;
      score = Math.max(answerResult.score, score);
    }

    maxScore = Math.max(answer.score, maxScore);
    evaluation[index] = answerResult;
  });
  return {
    score: score,
    maxScore: maxScore,
    evaluation: evaluation
  };
};

var partialMatchPerResponseEvaluator = function partialMatchPerResponseEvaluator(userResponse, answers) {
  var score = 0;
  var maxScore = 1;
  var evaluation = {};
  answers.forEach(function(answer, index) {
    var answerResult = {
      result: false,
      details: checkAnswer(answer, userResponse),
      score: 0
    };
    var trueLabelsCount = answerResult.details.filter(function(item) {
      return item.result;
    }).length;
    var allIsTrue = trueLabelsCount === answerResult.details.length;
    answerResult.result = answer.value.length === userResponse.length && allIsTrue;
    answerResult.score = answer.score * trueLabelsCount;
    score = Math.max(answerResult.score, score);
    maxScore = Math.max(answer.score * answer.value.length, maxScore);
    evaluation[index] = answerResult;
  });
  return {
    score: score,
    maxScore: maxScore,
    evaluation: evaluation
  };
};

var partialMatchEvaluator = function partialMatchEvaluator(userResponse, answers, roundingIsNone) {
  var score = 0;
  var maxScore = 1;
  var evaluation = {};
  answers.forEach(function(answer, index) {
    var answerResult = {
      result: false,
      details: checkAnswer(answer, userResponse),
      score: 0
    };
    var trueLabelsCount = answerResult.details.filter(function(item) {
      return item.result;
    }).length;
    var allIsTrue = trueLabelsCount === answerResult.details.length;
    answerResult.result = answer.value.length === userResponse.length && allIsTrue;
    var pointsPerOneLabel = answer.value.length ? answer.score / answer.value.length : 0;
    answerResult.score = roundingIsNone
      ? pointsPerOneLabel * trueLabelsCount
      : Math.floor(pointsPerOneLabel * trueLabelsCount);
    score = Math.max(answerResult.score, score);
    maxScore = Math.max(answer.score, maxScore);
    evaluation[index] = answerResult;
  });
  return {
    score: score,
    maxScore: maxScore,
    evaluation: evaluation
  };
};

var evaluator = function evaluator(_ref) {
  var userResponse = _ref.userResponse,
    validation = _ref.validation;
  var valid_response = validation.valid_response,
    alt_responses = validation.alt_responses,
    scoring_type = validation.scoring_type,
    rounding = validation.rounding;
  var answers = [valid_response];

  if (alt_responses) {
    answers = answers.concat((0, _toConsumableArray2.default)(alt_responses));
  }

  var roundingIsNone = rounding && rounding === "none";

  switch (scoring_type) {
    case _scoring.ScoringType.PARTIAL_MATCH:
      return partialMatchEvaluator(userResponse, answers, roundingIsNone);

    case _scoring.ScoringType.PARTIAL_MATCH_V2:
      return partialMatchPerResponseEvaluator(userResponse, answers);

    case _scoring.ScoringType.EXACT_MATCH:
    default:
      return exactMatchEvaluator(userResponse, answers);
  }
};

var _default = evaluator;
exports.default = _default;
