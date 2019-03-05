"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _scoring = require("./const/scoring");

var _countPartialMatchScores = _interopRequireDefault(require("./helpers/countPartialMatchScores"));

var _partialMatchTemplate = _interopRequireDefault(require("./helpers/partialMatchTemplate"));

var _exactMatchTemplate = _interopRequireDefault(require("./helpers/exactMatchTemplate"));

var _countExactMatchScores = _interopRequireDefault(require("./helpers/countExactMatchScores"));

var evaluator = function evaluator(evaluatorType) {
  return function(_ref) {
    var _ref$userResponse = _ref.userResponse,
      userResponse = _ref$userResponse === void 0 ? [] : _ref$userResponse,
      validation = _ref.validation;
    var valid_response = validation.valid_response,
      alt_responses = validation.alt_responses,
      scoring_type = validation.scoring_type;
    var answers = [valid_response].concat((0, _toConsumableArray2.default)(alt_responses));

    switch (scoring_type) {
      case _scoring.ScoringType.EXACT_MATCH:
        return (0, _exactMatchTemplate.default)((0, _countExactMatchScores.default)(evaluatorType), {
          userResponse: userResponse,
          answers: answers,
          validation: validation
        });

      case _scoring.ScoringType.PARTIAL_MATCH:
      case _scoring.ScoringType.PARTIAL_MATCH_V2:
      default:
        return (0, _partialMatchTemplate.default)((0, _countPartialMatchScores.default)(evaluatorType), {
          userResponse: userResponse,
          answers: answers,
          validation: validation
        });
    }
  };
};

var _default = evaluator;
exports.default = _default;
