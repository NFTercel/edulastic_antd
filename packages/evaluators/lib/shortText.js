"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _scoring = require("./const/scoring");

// exact-match evaluator
var exactMatchEvaluator = function exactMatchEvaluator() {
  var userResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var validAnswer = arguments.length > 1 ? arguments[1] : undefined;
  var altAnswers = arguments.length > 2 ? arguments[2] : undefined;

  var _ref = arguments.length > 3 ? arguments[3] : undefined,
      automarkable = _ref.automarkable,
      min_score_if_attempted = _ref.min_score_if_attempted,
      max_score = _ref.max_score;

  var score = 0;
  var text = userResponse;
  var validValue = validAnswer.value,
      validScore = validAnswer.score,
      matching_rule = validAnswer.matching_rule;
  var maxScore = validScore;
  var evaluation = false;

  if (validValue === text) {
    evaluation = true;
    score = validScore;
  }

  if (matching_rule === _scoring.ScoringType.CONTAINS && text && text.toLowerCase().includes(validValue.toLowerCase())) {
    evaluation = true;

    if (score === 0) {
      score = validScore;
    }
  }

  altAnswers.forEach(function (ite) {
    var altValue = ite.value,
        altScore = ite.score,
        altMatch = ite.matching_rule;

    if (altValue === text) {
      evaluation = true;

      if (score === 0) {
        score = altScore;
      }
    }

    if (altMatch === _scoring.ScoringType.CONTAINS && text && text.toLowerCase().includes(altValue.toLowerCase())) {
      evaluation = true;

      if (score === 0) {
        score = altScore;
      }
    }

    maxScore = Math.max(maxScore, altScore);
  });

  if (automarkable) {
    if (min_score_if_attempted) {
      maxScore = Math.max(maxScore, min_score_if_attempted);
      score = Math.max(min_score_if_attempted, score);
    }
  } else if (max_score) {
    maxScore = Math.max(max_score, maxScore);
  }

  return {
    score: score,
    maxScore: maxScore,
    evaluation: evaluation
  };
};

var evaluator = function evaluator(_ref2) {
  var userResponse = _ref2.userResponse,
      validation = _ref2.validation;
  var valid_response = validation.valid_response,
      alt_responses = validation.alt_responses,
      scoring_type = validation.scoring_type;

  switch (scoring_type) {
    case _scoring.ScoringType.EXACT_MATCH:
    default:
      return exactMatchEvaluator(userResponse, valid_response, alt_responses, validation);
  }
};

var _default = evaluator;
exports.default = _default;