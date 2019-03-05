"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var checkAnswer = function checkAnswer(answer, userResponse) {
  var result = {
    commonResult: false,
    details: []
  };
  var trueAnswerValue = answer.value;
  userResponse.forEach(function (testItem) {
    var resultForItem = {
      point: testItem.point,
      result: false
    };

    if (trueAnswerValue.findIndex(function (item) {
      return item.point === testItem.point && item.position === testItem.position;
    }) > -1) {
      resultForItem.result = true;
    }

    result.details.push(resultForItem);
  });
  var allIsTrue = result.details.filter(function (item) {
    return item.result;
  }).length === result.details.length;
  result.commonResult = trueAnswerValue.length === userResponse.length && allIsTrue;
  return result;
};

var evaluator = function evaluator(_ref) {
  var userResponse = _ref.userResponse,
      validation = _ref.validation;
  var valid_response = validation.valid_response,
      alt_responses = validation.alt_responses;
  var score = 0;
  var maxScore = 0;
  var evaluation = {};
  var answers = [valid_response];

  if (alt_responses) {
    answers = answers.concat((0, _toConsumableArray2.default)(alt_responses));
  }

  var result = {};
  answers.forEach(function (answer, index) {
    result = checkAnswer(answer, userResponse);

    if (result.commonResult) {
      score = Math.max(answer.score, score);
    }

    maxScore = Math.max(answer.score, maxScore);
    evaluation[index] = result;
  });
  return {
    score: score,
    maxScore: maxScore,
    evaluation: evaluation
  };
};

var _default = evaluator;
exports.default = _default;