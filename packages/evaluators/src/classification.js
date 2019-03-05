import { includes } from "lodash";
import { ScoringType } from "./const/scoring";
import partialMatchTemplate from "./helpers/partialMatchTemplate";
import exactMatchTemplate from "./helpers/exactMatchTemplate";

const exactCompareFunction = ({ answers, userResponse = [] }) => {
  let score = 0;
  let maxScore = 0;

  let rightIndex = 0;

  answers.forEach(({ value: answer, score: totalScore }, ind) => {
    if (!answer || !answer.length) {
      return;
    }

    let matches = 0;
    let totalMatches = 0;

    userResponse.forEach((col, colIndex) => {
      col.forEach(ans => {
        totalMatches++;
        if (includes(answer[colIndex], ans)) {
          matches++;
        }
      });
    });

    const currentScore = matches === totalMatches ? totalScore : 0;

    score = Math.max(score, currentScore);
    maxScore = Math.max(maxScore, totalScore);

    if (currentScore === score && score !== 0) {
      rightIndex = ind;
    }
  });

  const evaluation = [];
  let currentIndex = 0;

  userResponse.forEach((col, colIndex) => {
    col.forEach(ans => {
      evaluation[currentIndex] = answers[rightIndex].value[colIndex].includes(ans);

      currentIndex++;
    });
  });

  return {
    score,
    maxScore,
    evaluation
  };
};

const partialCompareFunction = ({ answers, userResponse = [] }) => {
  let score = 0;
  let maxScore = 0;

  let rightIndex = 0;

  answers.forEach(({ value: answer, score: totalScore }, ind) => {
    if (!answer || !answer.length) {
      return;
    }

    let matches = 0;
    let totalMatches = 0;

    userResponse.forEach((col, colIndex) => {
      col.forEach(ans => {
        totalMatches++;
        if (includes(answer[colIndex], ans)) {
          matches++;
        }
      });
    });

    const scorePerAnswer = totalScore / totalMatches;

    const currentScore = matches * scorePerAnswer;

    score = Math.max(score, currentScore);
    maxScore = Math.max(maxScore, totalScore);

    if (currentScore === score) {
      rightIndex = ind;
    }
  });

  const evaluation = [];
  let currentIndex = 0;

  userResponse.forEach((col, colIndex) => {
    col.forEach(ans => {
      evaluation[currentIndex] = answers[rightIndex].value[colIndex].includes(ans);

      currentIndex++;
    });
  });

  return {
    score,
    maxScore,
    evaluation
  };
};

const evaluator = ({ userResponse = [], validation }) => {
  const { valid_response, alt_responses, scoring_type } = validation;
  const answers = [valid_response, ...alt_responses];

  switch (scoring_type) {
    case ScoringType.EXACT_MATCH:
      return exactMatchTemplate(exactCompareFunction, {
        userResponse,
        answers,
        validation
      });
    case ScoringType.PARTIAL_MATCH:
    case ScoringType.PARTIAL_MATCH_V2:
    default:
      return partialMatchTemplate(partialCompareFunction, {
        userResponse,
        answers,
        validation
      });
  }
};

export default evaluator;
