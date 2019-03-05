import { isEqual } from "lodash";
import { ScoringType } from "./const/scoring";
import partialMatchTemplate from "./helpers/partialMatchTemplate";
import exactMatchTemplate from "./helpers/exactMatchTemplate";
import { BY_COUNT_METHOD } from "../../../src/client/assessment/constants/constantsForQuestions";

const exactCompareFunction = ({ answers, userResponse = [] }) => {
  let score = 0;
  let maxScore = 0;

  let rightIndex = 0;

  answers.forEach(({ value: { method, value: answer }, score: totalScore }, ind) => {
    if (!answer || !answer.length) {
      return;
    }

    let currentScore = 0;
    let matches = 0;
    const totalMatches = method === BY_COUNT_METHOD ? answer[0] : answer.length;

    if (method === BY_COUNT_METHOD) {
      matches = userResponse.length;
    } else {
      userResponse.forEach(col => {
        if (answer.some(ans => isEqual(ans, col))) {
          matches++;
        }
      });
    }
    currentScore = userResponse.length === answer.length && matches === totalMatches ? totalScore : 0;

    score = Math.max(score, currentScore);
    maxScore = Math.max(maxScore, totalScore);

    if (currentScore === score && score !== 0) {
      rightIndex = ind;
    }
  });

  let evaluation = [];
  let currentIndex = 0;
  if (answers[rightIndex].value.method === BY_COUNT_METHOD) {
    if (answers[rightIndex].value.value[0] === userResponse.length) {
      evaluation = Array.from({ length: userResponse.length }).fill(true);
    } else {
      evaluation = Array.from({ length: userResponse.length }).fill(false);
    }
  } else {
    userResponse.forEach(col => {
      evaluation[currentIndex] = answers[rightIndex].value.value.some(ans => isEqual(ans, col));

      currentIndex++;
    });
  }

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

  answers.forEach(({ value: { method, value: answer }, score: totalScore }, ind) => {
    if (!answer || !answer.length) {
      return;
    }

    let currentScore = 0;
    let matches = 0;

    const totalMatches = method === BY_COUNT_METHOD ? answer[0] : answer.length;

    const scorePerAnswer = totalScore / totalMatches;

    if (method === BY_COUNT_METHOD) {
      matches = userResponse.length;
    } else {
      userResponse.forEach(col => {
        if (answer.some(ans => isEqual(ans, col))) {
          matches++;
        }
      });
    }

    currentScore = scorePerAnswer * matches;

    score = Math.max(score, currentScore);
    maxScore = Math.max(maxScore, totalScore);

    if (currentScore === score && score !== 0) {
      rightIndex = ind;
    }
  });

  let evaluation = [];
  let currentIndex = 0;
  if (answers[rightIndex].value.method === BY_COUNT_METHOD) {
    if (answers[rightIndex].value.value[0] === userResponse.length) {
      evaluation = Array.from({ length: userResponse.length }).fill(true);
    } else if (answers[rightIndex].value.value[0] < userResponse.length) {
      evaluation = Array.from({ length: answers[rightIndex].value.value[0] })
        .fill(true)
        .concat(Array.from({ length: userResponse.length - answers[rightIndex].value.value[0] }).fill(false));
    } else {
      evaluation = Array.from({ length: userResponse.length }).fill(true);
    }
  } else {
    userResponse.forEach(col => {
      evaluation[currentIndex] = answers[rightIndex].value.value.some(ans => isEqual(ans, col));

      currentIndex++;
    });
  }

  const rightLen =
    answers[rightIndex].value.method === BY_COUNT_METHOD
      ? answers[rightIndex].value.value[0]
      : answers[rightIndex].value.value.length;

  return {
    score: score > maxScore ? maxScore : score,
    maxScore,
    evaluation,
    rightLen
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
