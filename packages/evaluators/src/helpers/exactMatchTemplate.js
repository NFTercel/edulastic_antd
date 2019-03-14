import getCalculateScores from "./getCalculateScores";

const exactMatchTemplate = (mainFunction, mainArguments) => {
  // eslint-disable-next-line prefer-const
  let { score, maxScore, evaluation } = mainFunction(mainArguments);

  const { newScore, newMaxScore } = getCalculateScores(score, maxScore, mainArguments.validation);

  return {
    score: newScore,
    maxScore: newMaxScore > 0 ? newMaxScore : 1,
    evaluation
  };
};

export default exactMatchTemplate;
