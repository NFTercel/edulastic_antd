import { isEqual, intersection } from "lodash";
import { ScoringType } from "./const/scoring";
import exactMatchTemplate from "./helpers/exactMatchTemplate";
import partialMatchTemplate from "./helpers/partialMatchTemplate";

// exact-match evaluator
const exactMatchEvaluator = ({ userResponse = [], answers }) => {
  let score = 0;
  let maxScore = 0;

  let evaluation = [];

  const userAnswer = userResponse.filter(ans => ans.selected).map(ans => ans.index);

  answers.forEach(({ score: totalScore, value: answer }) => {
    const currentAnswer = answer.filter(ans => ans.selected).map(ans => ans.index);
    if (isEqual(currentAnswer, userAnswer)) {
      score = Math.max(score, totalScore);
    }

    maxScore = Math.max(maxScore, totalScore);
  });

  if (score !== 0) {
    evaluation = Array.from({ length: userAnswer.length }).fill(true);
  } else {
    evaluation = Array.from({ length: userAnswer.length }).fill(false);
  }

  return {
    score,
    maxScore,
    evaluation
  };
};

const partialMatchEvaluator = ({ userResponse = [], answers }) => {
  let score = 0;
  let maxScore = 0;

  let rightLen = 0;
  let evaluation = [];

  const userAnswer = userResponse.filter(ans => ans.selected).map(ans => ans.index);

  let validAnswer = [];

  answers.forEach(({ score: totalScore, value: answer }) => {
    const currentAnswer = answer.filter(ans => ans.selected).map(ans => ans.index);

    const scorePerResponse = totalScore / currentAnswer.length;

    const currentScore = scorePerResponse * intersection(userAnswer, currentAnswer).length;

    score = Math.max(currentScore, score);
    maxScore = Math.max(maxScore, totalScore);

    if (currentScore === score && score !== 0) {
      rightLen = currentAnswer.length;
      validAnswer = currentAnswer;
    }
  });

  evaluation = userAnswer.map(ans => validAnswer.includes(ans));

  return {
    score,
    maxScore,
    rightLen,
    evaluation
  };
};

const evaluator = ({ userResponse, validation }) => {
  const { valid_response, alt_responses, scoring_type } = validation;

  const answers = [valid_response, ...alt_responses];

  switch (scoring_type) {
    case ScoringType.EXACT_MATCH:
      return exactMatchTemplate(exactMatchEvaluator, {
        userResponse,
        answers,
        validation
      });
    case ScoringType.PARTIAL_MATCH:
    case ScoringType.PARTIAL_MATCH_V2:
    default:
      return partialMatchTemplate(partialMatchEvaluator, {
        userResponse,
        answers,
        validation
      });
  }
};

export default evaluator;
