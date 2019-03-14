import { ScoringType } from "../const/scoring";
import { AxisSegmentsShapeTypes } from "./constants/axisSegmentsShapeTypes";

const shapesAreEqual = (shape1, shape2) => {
  if (shape1.type !== shape2.type) {
    return false;
  }

  switch (shape1.type) {
    case AxisSegmentsShapeTypes.POINT:
    case AxisSegmentsShapeTypes.RAY_LEFT_DIRECTION:
    case AxisSegmentsShapeTypes.RAY_RIGHT_DIRECTION:
    case AxisSegmentsShapeTypes.RAY_LEFT_DIRECTION_RIGHT_HOLLOW:
    case AxisSegmentsShapeTypes.RAY_RIGHT_DIRECTION_LEFT_HOLLOW:
      return shape1.point1 === shape2.point1;
    case AxisSegmentsShapeTypes.SEGMENT:
    case AxisSegmentsShapeTypes.SEGMENT_LEFT_POINT_HOLLOW:
    case AxisSegmentsShapeTypes.SEGMENT_RIGHT_POINT_HOLLOW:
    case AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_HOLLOW:
      return shape1.point1 === shape2.point1 && shape1.point2 === shape2.point2;
    default:
      return false;
  }
};

const checkAnswer = (answer, userResponse) => {
  const result = [];

  const trueAnswerValue = answer.value;

  userResponse.forEach(testShape => {
    const resultForShape = {
      shape: testShape,
      result: false
    };

    if (trueAnswerValue.findIndex(item => shapesAreEqual(item, testShape)) > -1) {
      resultForShape.result = true;
    }

    result.push(resultForShape);
  });

  return result;
};

const exactMatchEvaluator = (userResponse, answers) => {
  let score = 0;
  let maxScore = 1;

  const evaluation = {};

  answers.forEach((answer, index) => {
    const answerResult = {
      result: false,
      details: checkAnswer(answer, userResponse),
      score: 0
    };

    const trueShapesCount = answerResult.details.filter(item => item.result).length;
    const allIsTrue = trueShapesCount === answerResult.details.length;
    answerResult.result = answer.value.length === userResponse.length && allIsTrue;

    if (answerResult.result) {
      answerResult.score = answer.score;
      score = Math.max(answerResult.score, score);
    }

    maxScore = Math.max(answer.score, maxScore);
    evaluation[index] = answerResult;
  });

  return {
    score,
    maxScore,
    evaluation
  };
};

const partialMatchPerResponseEvaluator = (userResponse, answers) => {
  let score = 0;
  let maxScore = 1;

  const evaluation = {};

  answers.forEach((answer, index) => {
    const answerResult = {
      result: false,
      details: checkAnswer(answer, userResponse),
      score: 0
    };

    const trueShapesCount = answerResult.details.filter(item => item.result).length;
    const allIsTrue = trueShapesCount === answerResult.details.length;
    answerResult.result = answer.value.length === userResponse.length && allIsTrue;

    answerResult.score = answer.score * trueShapesCount;

    score = Math.max(answerResult.score, score);
    maxScore = Math.max(answer.score * answer.value.length, maxScore);
    evaluation[index] = answerResult;
  });

  return {
    score,
    maxScore,
    evaluation
  };
};

const partialMatchEvaluator = (userResponse, answers, roundingIsNone) => {
  let score = 0;
  let maxScore = 1;

  const evaluation = {};

  answers.forEach((answer, index) => {
    const answerResult = {
      result: false,
      details: checkAnswer(answer, userResponse),
      score: 0
    };

    const trueShapesCount = answerResult.details.filter(item => item.result).length;
    const allIsTrue = trueShapesCount === answerResult.details.length;
    answerResult.result = answer.value.length === userResponse.length && allIsTrue;

    const pointsPerOneShape = answer.value.length ? answer.score / answer.value.length : 0;
    answerResult.score = roundingIsNone
      ? pointsPerOneShape * trueShapesCount
      : Math.floor(pointsPerOneShape * trueShapesCount);

    score = Math.max(answerResult.score, score);
    maxScore = Math.max(answer.score, maxScore);
    evaluation[index] = answerResult;
  });

  return {
    score,
    maxScore,
    evaluation
  };
};

const evaluator = ({ userResponse, validation }) => {
  const { valid_response, alt_responses, scoring_type, rounding } = validation;

  let answers = [valid_response];
  if (alt_responses) {
    answers = answers.concat([...alt_responses]);
  }

  const roundingIsNone = rounding && rounding === "none";

  switch (scoring_type) {
    case ScoringType.PARTIAL_MATCH:
      return partialMatchPerResponseEvaluator(userResponse, answers);
    case ScoringType.PARTIAL_MATCH_V2:
      return partialMatchEvaluator(userResponse, answers, roundingIsNone);
    case ScoringType.EXACT_MATCH:
    default:
      return exactMatchEvaluator(userResponse, answers);
  }
};

export default evaluator;
