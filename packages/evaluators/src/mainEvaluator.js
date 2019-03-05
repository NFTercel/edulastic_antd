import { ScoringType } from "./const/scoring";
import countPartialMatchScores from "./helpers/countPartialMatchScores";
import partialMatchTemplate from "./helpers/partialMatchTemplate";
import exactMatchTemplate from "./helpers/exactMatchTemplate";
import countExactMatchScores from "./helpers/countExactMatchScores";

const evaluator = evaluatorType => ({ userResponse = [], validation }) => {
  const { valid_response, alt_responses, scoring_type } = validation;
  const answers = [valid_response, ...alt_responses];

  switch (scoring_type) {
    case ScoringType.EXACT_MATCH:
      return exactMatchTemplate(countExactMatchScores(evaluatorType), {
        userResponse,
        answers,
        validation
      });
    case ScoringType.PARTIAL_MATCH:
    case ScoringType.PARTIAL_MATCH_V2:
    default:
      return partialMatchTemplate(countPartialMatchScores(evaluatorType), {
        userResponse,
        answers,
        validation
      });
  }
};

export default evaluator;
