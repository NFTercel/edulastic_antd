import { ScoringType } from './const/scoring';

// exact-match evaluator
const exactMatchEvaluator = (
  userResponse = [],
  validAnswer,
  altAnswers,
  { automarkable, min_score_if_attempted, max_score }
) => {
  let score = 0;

  const text = userResponse;

  const { value: validValue, score: validScore, matching_rule } = validAnswer;

  let maxScore = validScore;

  let evaluation = false;

  if (validValue === text) {
    evaluation = true;
    score = validScore;
  }

  if (
    matching_rule === ScoringType.CONTAINS &&
    text &&
    text.toLowerCase().includes(validValue.toLowerCase())
  ) {
    evaluation = true;
    if (score === 0) {
      score = validScore;
    }
  }

  altAnswers.forEach((ite) => {
    const { value: altValue, score: altScore, matching_rule: altMatch } = ite;

    if (altValue === text) {
      evaluation = true;
      if (score === 0) {
        score = altScore;
      }
    }

    if (
      altMatch === ScoringType.CONTAINS &&
      text &&
      text.toLowerCase().includes(altValue.toLowerCase())
    ) {
      evaluation = true;
      if (score === 0) {
        score = altScore;
      }
    }

    maxScore = Math.max(maxScore, altScore);
  });

  if (automarkable) {
    if (min_score_if_attempted) {
      maxScore = Math.max(maxScore, min_score_if_attempted);
      score = Math.max(min_score_if_attempted, score);
    }
  } else if (max_score) {
    maxScore = Math.max(max_score, maxScore);
  }

  return {
    score,
    maxScore,
    evaluation
  };
};

const evaluator = ({ userResponse, validation }) => {
  const { valid_response, alt_responses, scoring_type } = validation;

  switch (scoring_type) {
    case ScoringType.EXACT_MATCH:
    default:
      return exactMatchEvaluator(userResponse, valid_response, alt_responses, validation);
  }
};

export default evaluator;
