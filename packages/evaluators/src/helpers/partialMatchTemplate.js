import getPenaltyScore from "./getPenaltyScore";
import { rounding as myRounding } from "../const/rounding";
import getCalculateScores from "./getCalculateScores";

const partialMatchTemplate = (mainFunction, mainArguments) => {
  const {
    validation: { penalty, rounding }
  } = mainArguments;

  const isRound = rounding === myRounding.ROUND_DOWN;

  // eslint-disable-next-line prefer-const
  let { score, maxScore, evaluation, rightLen } = mainFunction(mainArguments);

  score = getPenaltyScore({ score, penalty, evaluation, rightLen });

  const { newScore, newMaxScore } = getCalculateScores(score, maxScore, mainArguments.validation);

  return {
    score: isRound ? Math.floor(newScore) : +newScore.toFixed(4),
    maxScore: newMaxScore,
    evaluation
  };
};

export default partialMatchTemplate;
