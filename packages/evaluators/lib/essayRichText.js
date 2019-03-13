"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var exactMatchEvaluator = function exactMatchEvaluator(_ref) {
  var min_score_if_attempted = _ref.min_score_if_attempted,
    max_score = _ref.max_score;
  return {
    score: min_score_if_attempted || 0,
    maxScore: max_score || 1,
    evaluation: {}
  };
};

var evaluator = function evaluator(_ref2) {
  var _ref2$validation = _ref2.validation,
    validation = _ref2$validation === void 0 ? {} : _ref2$validation;
  return exactMatchEvaluator(validation);
};

var _default = evaluator;
exports.default = _default;
