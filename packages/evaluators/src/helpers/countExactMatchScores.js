import { cloneDeep } from "lodash";
import getEvaluation from "./getEvaluation";
import getMatches from "./getMatches";

const countExactMatchScores = compareFunction => ({ answers, userResponse = [] }) => {
  let existingResponse = cloneDeep(userResponse);
  if (!Array.isArray(userResponse)) {
    existingResponse = cloneDeep(userResponse.value);
  }

  let score = 0;
  let maxScore = 1;

  let rightLen = 0;
  let rightIndex = 0;

  answers.forEach(({ value: answer, score: totalScore }, index) => {
    if (!answer || !answer.length) {
      return;
    }

    const matches = getMatches(existingResponse, answer, compareFunction) === answer.length;

    const currentScore = matches && existingResponse.length === answer.length ? totalScore : 0;

    score = Math.max(score, currentScore);
    maxScore = Math.max(maxScore, totalScore);

    if ((currentScore === score && score !== 0) || (maxScore === totalScore && currentScore === score)) {
      rightLen = answer.length;
      rightIndex = index;
    }
  });

  const evaluation = getEvaluation(existingResponse, answers, rightIndex, compareFunction);

  return {
    score,
    maxScore,
    rightLen,
    evaluation
  };
};

export default countExactMatchScores;
