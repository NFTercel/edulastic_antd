"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _scoring = require("../const/scoring");

var _axisSegmentsShapeTypes = require("./constants/axisSegmentsShapeTypes");

var shapesAreEqual = function shapesAreEqual(shape1, shape2) {
  if (shape1.type !== shape2.type) {
    return false;
  }

  switch (shape1.type) {
    case _axisSegmentsShapeTypes.AxisSegmentsShapeTypes.POINT:
    case _axisSegmentsShapeTypes.AxisSegmentsShapeTypes.RAY_LEFT_DIRECTION:
    case _axisSegmentsShapeTypes.AxisSegmentsShapeTypes.RAY_RIGHT_DIRECTION:
    case _axisSegmentsShapeTypes.AxisSegmentsShapeTypes.RAY_LEFT_DIRECTION_RIGHT_HOLLOW:
    case _axisSegmentsShapeTypes.AxisSegmentsShapeTypes.RAY_RIGHT_DIRECTION_LEFT_HOLLOW:
      return shape1.point1 === shape2.point1;

    case _axisSegmentsShapeTypes.AxisSegmentsShapeTypes.SEGMENT:
    case _axisSegmentsShapeTypes.AxisSegmentsShapeTypes.SEGMENT_LEFT_POINT_HOLLOW:
    case _axisSegmentsShapeTypes.AxisSegmentsShapeTypes.SEGMENT_RIGHT_POINT_HOLLOW:
    case _axisSegmentsShapeTypes.AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_HOLLOW:
      return shape1.point1 === shape2.point1 && shape1.point2 === shape2.point2;

    default:
      return false;
  }
};

var checkAnswer = function checkAnswer(answer, userResponse) {
  var result = [];
  var trueAnswerValue = answer.value;
  userResponse.forEach(function(testShape) {
    var resultForShape = {
      shape: testShape,
      result: false
    };

    if (
      trueAnswerValue.findIndex(function(item) {
        return shapesAreEqual(item, testShape);
      }) > -1
    ) {
      resultForShape.result = true;
    }

    result.push(resultForShape);
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
    var trueShapesCount = answerResult.details.filter(function(item) {
      return item.result;
    }).length;
    var allIsTrue = trueShapesCount === answerResult.details.length;
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
    var trueShapesCount = answerResult.details.filter(function(item) {
      return item.result;
    }).length;
    var allIsTrue = trueShapesCount === answerResult.details.length;
    answerResult.result = answer.value.length === userResponse.length && allIsTrue;
    answerResult.score = answer.score * trueShapesCount;
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
    var trueShapesCount = answerResult.details.filter(function(item) {
      return item.result;
    }).length;
    var allIsTrue = trueShapesCount === answerResult.details.length;
    answerResult.result = answer.value.length === userResponse.length && allIsTrue;
    var pointsPerOneShape = answer.value.length ? answer.score / answer.value.length : 0;
    answerResult.score = roundingIsNone
      ? pointsPerOneShape * trueShapesCount
      : Math.floor(pointsPerOneShape * trueShapesCount);
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
      return partialMatchPerResponseEvaluator(userResponse, answers);

    case _scoring.ScoringType.PARTIAL_MATCH_V2:
      return partialMatchEvaluator(userResponse, answers, roundingIsNone);

    case _scoring.ScoringType.EXACT_MATCH:
    default:
      return exactMatchEvaluator(userResponse, answers);
  }
};

var _default = evaluator;
exports.default = _default;
